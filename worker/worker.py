# SPDX-License-Identifier: GPL-3.0-or-later
"""Fixed Blender commands on its main thread. No user-supplied Python is evaluated."""
import sys
sys.dont_write_bytecode = True
import os
import json
import math
import hashlib
import traceback
from pathlib import Path

args = sys.argv[sys.argv.index('--') + 1:]
workspace = Path(args[args.index('--workspace') + 1]).resolve()
vendor = Path(args[args.index('--vendor') + 1]).resolve()
sys.path.insert(0, str(vendor))
sys.path.insert(0, str(Path(__file__).resolve().parent))
os.environ['EZDXF_DISABLE_C_EXT'] = '1'
import bpy
from mathutils import Vector, Matrix
from cad import parse_file
from topology import wall_points, wall_length, point_at, wall_ends, arc_points
from drawing import prepare_drawing, write_dxf, write_drawing_set, path_between
from design_review import review_design
from solids import extrusion_data, expected_bounds, signed_area
from refinement import import_model, project_model, model_audit, apply_surface, configure_lights, select_camera
from elevation import project_elevation
from quality import scene_meshes, connection_review, camera_review_for_view, image_review, review_support_ranges, review_contact_points

plugin_root = Path(__file__).resolve().parents[1]
asset_root = plugin_root / 'assets'
asset_catalog = json.loads((plugin_root / 'src/catalog.json').read_text())


def asset_path(relative):
    if not asset_root.is_dir():
        raise ValueError('当前工程使用了未安装的本地家具或贴图库；请恢复素材库，或改用基础材质和通用构件')
    path = asset_root / relative
    if not path.resolve().is_relative_to(asset_root) or not path.is_file():
        raise ValueError('Unknown packaged asset')
    for item in [path, *path.parents]:
        if item.is_symlink():
            raise ValueError('Asset symlinks are not allowed')
        if item == asset_root:
            break
    return path


def private_path(value, must_exist=False):
    path = Path(value)
    if not path.is_absolute() or not path.resolve().is_relative_to(workspace):
        raise ValueError('Path is outside the project workspace')
    for item in [path, *path.parents]:
        if item.is_symlink():
            raise ValueError('Project symlinks are not allowed')
        if item == workspace:
            break
    if must_exist and not path.is_file():
        raise ValueError('Input file does not exist')
    return path


def parse_dxf(command):
    return parse_file(private_path(command['path'], True), command)


def material(name, spec, finish=None):
    result = bpy.data.materials.new(name)
    result.diffuse_color = (*spec['color'], 1)
    result.use_nodes = True
    shader = result.node_tree.nodes.get('Principled BSDF')
    shader.inputs['Base Color'].default_value = (*spec['color'], 1)
    shader.inputs['Roughness'].default_value = spec['roughness']
    shader.inputs['Metallic'].default_value = spec.get('metallic',0)
    if spec.get('emission',0):
        shader.inputs['Emission Color'].default_value=(*spec['color'],1)
        shader.inputs['Emission Strength'].default_value=spec['emission']
    if spec.get('texture'):
        texture = asset_catalog['textures'][spec['texture']]
        uv = result.node_tree.nodes.new('ShaderNodeTexCoord')
        mapping = result.node_tree.nodes.new('ShaderNodeMapping')
        mapping.inputs['Scale'].default_value = (1/texture['metresPerRepeat'],)*3
        links = result.node_tree.links
        links.new(uv.outputs['UV'], mapping.inputs['Vector'])
        for field, channel in [('color', 'Base Color'), ('roughness', 'Roughness'), ('normal', None)]:
            if field == 'roughness' and finish and 'roughness' in finish:
                continue
            image = bpy.data.images.load(str(asset_path(texture[field])), check_existing=True)
            image.colorspace_settings.name = 'sRGB' if field == 'color' else 'Non-Color'
            node = result.node_tree.nodes.new('ShaderNodeTexImage')
            node.image = image
            links.new(mapping.outputs['Vector'], node.inputs['Vector'])
            if field == 'color' and finish and 'color' in finish:
                tint = result.node_tree.nodes.new('ShaderNodeMixRGB')
                tint.blend_type = 'MULTIPLY'
                tint.inputs[0].default_value = 1
                tint.inputs[2].default_value = (*finish['color'], 1)
                links.new(node.outputs['Color'], tint.inputs[1])
                links.new(tint.outputs['Color'], shader.inputs['Base Color'])
            elif channel:
                links.new(node.outputs['Color'], shader.inputs[channel])
            else:
                normal = result.node_tree.nodes.new('ShaderNodeNormalMap')
                normal.inputs['Strength'].default_value = .6
                links.new(node.outputs['Color'], normal.inputs['Color'])
                links.new(normal.outputs['Normal'], shader.inputs['Normal'])
    # A procedural grain ships with the worker; no texture or network dependency.
    if name.endswith('__oak'):
        noise = result.node_tree.nodes.new('ShaderNodeTexNoise')
        noise.inputs['Scale'].default_value = 7
        bump = result.node_tree.nodes.new('ShaderNodeBump')
        bump.inputs['Strength'].default_value = 0.12
        result.node_tree.links.new(noise.outputs['Fac'], bump.inputs['Height'])
        result.node_tree.links.new(bump.outputs['Normal'], shader.inputs['Normal'])
    return result


def physical_uv(mesh):
    """Project mesh-local metres so texture density survives export and reopening."""
    layer = mesh.uv_layers.active or mesh.uv_layers.new(name='UVMap')
    for polygon in mesh.polygons:
        axis = max(range(3), key=lambda i: abs(polygon.normal[i]))
        indices = (0, 1) if axis == 2 else (0, 2) if axis == 1 else (1, 2)
        for index in polygon.loop_indices:
            vertex = mesh.vertices[mesh.loops[index].vertex_index].co
            layer.data[index].uv = (vertex[indices[0]], vertex[indices[1]])


def furniture_mesh(item, materials):
    spec = asset_catalog['furniture'][item['asset']]
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=str(asset_path(spec['file'])))
    imported = [o for o in bpy.data.objects if o not in before]
    meshes = [o for o in imported if o.type == 'MESH']
    others = [o for o in imported if o.type != 'MESH']
    if not meshes:
        raise ValueError('Furniture model contains no mesh')
    bpy.context.view_layer.update()
    bpy.ops.object.select_all(action='DESELECT')
    for obj in meshes:
        transform = obj.matrix_world.copy()
        obj.parent = None
        obj.matrix_world = transform
        obj.select_set(True)
    bpy.context.view_layer.objects.active = meshes[0]
    bpy.ops.object.join()
    obj = bpy.context.view_layer.objects.active
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    for other in others:
        bpy.data.objects.remove(other, do_unlink=True)
    coordinates = [v.co.copy() for v in obj.data.vertices]
    lo = Vector(tuple(min(p[i] for p in coordinates) for i in range(3)))
    hi = Vector(tuple(max(p[i] for p in coordinates) for i in range(3)))
    if any(hi[i]-lo[i] < 1e-6 for i in range(3)):
        raise ValueError('Furniture model has a degenerate bound')
    middle = (lo+hi)/2
    for vertex in obj.data.vertices:
        vertex.co = tuple((vertex.co[i]-middle[i])*item['size'][i]/(hi[i]-lo[i]) for i in range(3))
    obj.data.update()
    obj.name = item['id']
    obj.location = item['position']
    obj.rotation_mode = 'XYZ'
    obj.rotation_euler = (0, 0, item.get('rotation', 0))
    if item.get('material'):
        key = item['material']
        obj.data.materials.clear()
        obj.data.materials.append(material(item['id']+'__object__'+key, materials[key]))
        for polygon in obj.data.polygons:
            polygon.material_index = 0
        physical_uv(obj.data)
    else:
        for index, original in enumerate(obj.data.materials):
            copy = original.copy()
            copy.name = item['id']+'__object__'+original.name
            obj.data.materials[index] = copy
    return obj


def furniture_pose_audit(scene):
    """Measure effective world transforms and vertices, not stored Euler fields."""
    bpy.context.view_layer.update();rows=[]
    for item in scene.get('objects',[]):
        if item['type']!='asset':continue
        obj=next((o for o in bpy.data.objects if o.get('studio_id')==item['id']),None)
        if obj is None or obj.type!='MESH':
            rows.append(dict(id=item['id'],asset=item['asset'],passed=False,error='Furniture mesh missing'));continue
        angle=item.get('rotation',0);expected=Matrix.Translation(Vector(item['position']))@Matrix.Rotation(angle,4,'Z')
        error=max(abs(obj.matrix_world[i][j]-expected[i][j]) for i in range(4) for j in range(4))
        inverse=expected.inverted();world=[obj.matrix_world@v.co for v in obj.data.vertices];local=[inverse@p for p in world]
        size_error=max(abs(extreme(p[i] for p in local)-sign*item['size'][i]/2)
                       for i in range(3) for extreme,sign in [(min,-1),(max,1)])
        orientation=asset_catalog['furniture'].get(item['asset'],{}).get('orientation')
        front=list(obj.matrix_world.to_3x3()@Vector((*orientation['front'],0))) if orientation else None
        rows.append(dict(id=item['id'],asset=item['asset'],passed=error<1e-5 and size_error<1e-4,
            declaredDegrees=math.degrees(angle),effectiveDegrees=math.degrees(obj.matrix_world.to_euler('XYZ').z),
            transformError=error,envelopeErrorMetres=size_error,
            worldBounds=[[min(p[i] for p in world) for i in range(3)],[max(p[i] for p in world) for i in range(3)]],frontWorld=front))
    return dict(basis='actual_mesh_world_transform_and_vertices',passed=all(r['passed'] for r in rows),objects=rows)


def box_data(parts, ends=None, length=None):
    vertices, faces, slots = [], [], []
    for x0, x1, y0, y1, z0, z1 in parts:
        start = len(vertices)
        lo0,lo1,hi0,hi1=x0,x1,x0,x1
        if ends:
            if x0 == 0:lo0,hi0=ends[0]
            if x1 == length:lo1,hi1=ends[1]
        vertices.extend([(lo0,y0,z0),(lo1,y0,z0),(hi1,y1,z0),(hi0,y1,z0),
                         (lo0,y0,z1),(lo1,y0,z1),(hi1,y1,z1),(hi0,y1,z1)])
        faces.extend([tuple(start+i for i in face) for face in
                      [(0,3,2,1),(4,5,6,7),(0,1,5,4),(3,7,6,2),(1,2,6,5),(0,4,7,3)]])
        slots.extend([2,2,0,1,2,2])
    return vertices, faces, slots


def mesh_data(vertices, faces, slots):
    mesh = bpy.data.meshes.new('geometry')
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    for polygon, slot in zip(mesh.polygons, slots):
        polygon.material_index = slot
    physical_uv(mesh)
    return mesh


def box_mesh(parts, ends=None, length=None):
    return mesh_data(*box_data(parts, ends, length))


def wall_parts(length, openings, height, thickness, offset=0, ratio=1):
    parts, cursor = [], 0
    for opening in sorted(openings, key=lambda p: p['start']):
        start = max(0, (opening['start']-offset)*ratio)
        end = min(length, (opening['start']+opening['width']-offset)*ratio)
        if end-start <= 1e-8:
            continue
        if start > cursor:
            parts.append((cursor, start, -thickness/2, thickness/2, 0, height))
        if opening['sill'] > 0:
            parts.append((start, end, -thickness/2, thickness/2, 0, opening['sill']))
        if opening['top'] < height:
            parts.append((start, end, -thickness/2, thickness/2, opening['top'], height))
        cursor = end
    if cursor < length-1e-8:
        parts.append((cursor, length, -thickness/2, thickness/2, 0, height))
    return parts


def curved_wall_mesh(item, all_segments):
    points = item['path']; vertices, faces, slots = [], [], []; offset = 0
    openings = [part for p in item['openings'] for part in ([p, dict(p, start=p['start']-wall_length(item))] if p.get('wrap') else [p])]
    for i, (a, b) in enumerate(zip(points, points[1:])):
        length = math.dist(a, b)
        along = wall_length(item)/(len(points)-1) if 'arc' in item else length
        segment = dict(item, id=item['id']+':'+str(i), a=a, b=b)
        parts = wall_parts(length, openings, item['height'], item['thickness'], offset, length/along)
        local, polygons, surfaces = box_data(parts, wall_ends(segment, all_segments), length)
        dx, dy = (b[0]-a[0])/length, (b[1]-a[1])/length
        base = len(vertices)
        vertices.extend((a[0]+x*dx-y*dy, a[1]+x*dy+y*dx, z) for x, y, z in local)
        faces.extend(tuple(base+n for n in face) for face in polygons); slots.extend(surfaces)
        offset += along
    return mesh_data(vertices, faces, slots)


def room_floor_mesh(item):
    from ezdxf.math.triangulation import mapbox_earcut_2d
    from topology import signed_area
    polygon, holes = item['polygon'], item['holes']
    triangles = mapbox_earcut_2d(polygon, holes)
    area = sum(abs(signed_area([list(p) for p in triangle])) for triangle in triangles)
    if not triangles or abs(area-item['area']) > max(.0001, item['area']*1e-6):
        raise ValueError('Room floor triangulation did not preserve the reviewed area')
    vertices, faces, indices = [], [], {}
    def vertex(p, z):
        key = (p[0], p[1], z)
        if key not in indices:
            indices[key] = len(vertices); vertices.append(key)
        return indices[key]
    for triangle in triangles:
        if signed_area([list(p) for p in triangle]) < 0: triangle = list(reversed(triangle))
        faces.append(tuple(vertex(p, 0) for p in triangle))
        faces.append(tuple(vertex(p, -.08) for p in reversed(triangle)))
    for i, ring in enumerate([polygon]+holes):
        if (signed_area(ring) > 0) != (i == 0): ring = list(reversed(ring))
        for a, b in zip(ring, ring[1:]+ring[:1]):
            faces.append((vertex(a, -.08), vertex(b, -.08), vertex(b, 0), vertex(a, 0)))
    return mesh_data(vertices, faces, [0]*len(faces))


def opening_details(wall, parent, materials):
    """Derived jambs, glazing and open leaves retain the structural wall as owner."""
    for opening in wall['openings']:
        if opening['kind']=='passage':continue
        width=opening['width'];height=opening['top']-opening['sill'];bar=min(.045,width/6,height/6)
        path=path_between(wall,opening['start'],opening['start']+width)
        part=dict(id=opening['id'],type='wall',a=path[0],b=path[-1],height=height,thickness=min(.09,wall['thickness']),
                  openings=[dict(start=bar,width=width-2*bar,sill=bar if opening['kind']=='window' else 0,top=height-bar)])
        if wall.get('arc'):
            part['arc']=dict(wall['arc'],start=wall['arc']['start']+opening['start']/wall['arc']['radius'],sweep=width/wall['arc']['radius'])
            part['path']=arc_points(part['arc'])
        elif len(path)>2:part['path']=path
        def add_piece(name, item, z, mat):
            if item.get('path'):
                mesh=curved_wall_mesh(item,[dict(item,id=item['id']+':'+str(i),a=a,b=b) for i,(a,b) in enumerate(zip(item['path'],item['path'][1:]))])
                obj=bpy.data.objects.new(name,mesh);obj.location.z=z
            else:
                length=math.dist(item['a'],item['b']);obj=bpy.data.objects.new(name,box_mesh(wall_parts(length,item['openings'],item['height'],item['thickness'])))
                obj.location=(*item['a'],z);obj.rotation_euler.z=math.atan2(item['b'][1]-item['a'][1],item['b'][0]-item['a'][0])
            bpy.context.scene.collection.objects.link(obj)
            for _ in range(3):obj.data.materials.append(mat)
            obj.parent=parent;obj.matrix_parent_inverse=parent.matrix_world.inverted();obj['studio_detail']=opening['kind']
            return obj
        frame_material=material(opening['id']+'__frame',dict(color=[.18,.20,.19] if opening['kind']=='window' else [.75,.73,.68],roughness=.35))
        add_piece(opening['id']+'__frame',part,opening['sill'],frame_material)
        if opening['kind']=='window':
            glass=material(opening['id']+'__glass',dict(color=[.92,.97,1],roughness=.06));shader=glass.node_tree.nodes.get('Principled BSDF')
            shader.inputs['Transmission Weight'].default_value=1;shader.inputs['IOR'].default_value=1.45
            add_piece(opening['id']+'__glass',dict(part,thickness=.008,openings=[]),opening['sill'],glass)
        elif not wall.get('arc') and len(path)==2 and opening.get('swing') in ('left','right'):
            angle=math.atan2(path[1][1]-path[0][1],path[1][0]-path[0][0]);turn=math.radians(75)*(1 if opening.get('swing','left')=='left' else -1)
            hinge=[path[0][0]+bar*math.cos(angle),path[0][1]+bar*math.sin(angle)]
            end=[hinge[0]+(width-2*bar)*math.cos(angle+turn),hinge[1]+(width-2*bar)*math.sin(angle+turn)]
            add_piece(opening['id']+'__leaf',dict(part,a=hinge,b=end,height=height-bar-.01,thickness=.035,openings=[]),opening['sill']+.01,
                      material(opening['id']+'__oak',materials['oak']))


def fit_presentation_camera(root, camera, corners, target, direction, resolution):
    camera.rotation_euler=(-direction).to_track_quat('-Z','Y').to_euler()
    rotation=camera.rotation_euler.to_matrix();right=rotation@Vector((1,0,0));up=rotation@Vector((0,1,0))
    tangent=camera.data.sensor_width/(2*camera.data.lens);aspect=resolution[0]/resolution[1]
    distance=max(max(abs((p-target).dot(right))*1.14/tangent,abs((p-target).dot(up))*1.14*aspect/tangent)+(p-target).dot(direction) for p in corners)
    camera.location=target+direction*distance;camera.data.clip_end=max(100,distance*4)
    camera['studio_target']=[target.x,target.z,-target.y]
    bpy.context.view_layer.update()
    from bpy_extras.object_utils import world_to_camera_view
    projected=[world_to_camera_view(root,camera,p) for p in corners]
    return dict(cameraFitMargin=1.14,viewDirection=list(direction),cameraPosition=list(camera.location),target=list(target),
                projectedBounds=[min(p.x for p in projected),min(p.y for p in projected),max(p.x for p in projected),max(p.y for p in projected)])


def select_render_view(root, view, overview, resolution, saved_cameras=None):
    custom=next((c for c in saved_cameras or [] if c['key']==view),None)
    if custom:return select_camera(root,custom)
    root.camera.data.lens=50
    directions=dict(overview=overview,front=(0,-1,.85),back=(0,1,.85),left=(-1,0,.85),right=(1,0,.85),top=(0,-.001,1))
    corners=[o.matrix_world@Vector(p) for o,_owner in scene_meshes(root) for p in o.bound_box]
    lo=Vector([min(p[i] for p in corners) for i in range(3)]);hi=Vector([max(p[i] for p in corners) for i in range(3)])
    return fit_presentation_camera(root,root.camera,corners,(lo+hi)/2,Vector(directions[view]).normalized(),resolution)


def draft_preview(root, scene, command, cameras):
    """Inspect actual draft meshes, optionally rendering one disposable Workbench frame."""
    bpy.context.view_layer.update()
    meshes=scene_meshes(root)
    selected=set(command['selected'])
    lo,hi=[math.inf]*3,[-math.inf]*3
    for obj,owner in meshes:
        if owner not in selected:
            continue
        transform=obj.matrix_world
        for vertex in obj.data.vertices:
            point=transform@vertex.co
            for i in range(3):
                lo[i]=min(lo[i],point[i]);hi[i]=max(hi[i],point[i])
    if not math.isfinite(lo[0]):
        raise ValueError('所选草案对象没有可预览的网格')
    bounds=[lo,hi]
    supports=[]
    for row in review_support_ranges(scene,meshes,command['supports']):
        graph=row.get('graph',{})
        unresolved=graph.get('unresolvedKeys',[])
        supports.append(dict(id=row['id'],source=row['source'],status=row['status'],reason=row.get('reason'),
                             missing=row.get('missing',[])[:16],unresolvedKeys=unresolved[:16],unresolvedCount=len(unresolved),
                             unresolvedParts=[dict(keys=part['keys'][:8],bounds=part['bounds']) for part in graph.get('unresolvedParts',[])[:8]]))
    relations=[dict(result,source=row['source'],a=row['a'],b=row['b'])
               for row,result in zip(command['relations'],review_contact_points(scene,meshes,command['relations']))]
    result=dict(boundsMetres=bounds,connections=dict(supports=supports,relations=relations))
    if not command.get('output'):
        return result
    lo,hi=Vector(lo),Vector(hi)
    corners=[Vector((x,y,z)) for x in (lo.x,hi.x) for y in (lo.y,hi.y) for z in (lo.z,hi.z)]
    resolution=(640,360)
    camera=bpy.data.objects.new('Draft Preview',bpy.data.cameras.new('Draft Preview'))
    root.collection.objects.link(camera);root.camera=camera
    root.render.resolution_x,root.render.resolution_y=resolution
    root.render.resolution_percentage=100
    view=command['view']
    saved=next((c for c in cameras if c['key']==view),None)
    if saved:
        select_camera(root,saved)
    else:
        direction=Vector({'front':(0,-1,0),'top':(0,0,1),'overview':(1,-1,.8)}[view]).normalized()
        target=(lo+hi)/2
        camera.location=target+direction*max(1,(hi-lo).length*2)
        if view!='top':
            camera.rotation_euler=(-direction).to_track_quat('-Z','Y').to_euler()
        rotation=camera.rotation_euler.to_matrix()
        right=rotation@Vector((1,0,0));up=rotation@Vector((0,1,0))
        aspect=resolution[0]/resolution[1]
        camera.data.type='ORTHO'
        camera.data.ortho_scale=max(.1,2.28*max(max(abs((p-target).dot(right)),aspect*abs((p-target).dot(up))) for p in corners))
        camera.data.clip_end=max(100,(hi-lo).length*6)
    visible=set(command['context'])
    for obj,owner in meshes:
        obj.hide_render=owner not in visible
    root.render.engine='BLENDER_WORKBENCH'
    root.display.shading.color_type='MATERIAL'
    root.display.shading.show_cavity=True
    root.display.shading.show_shadows=False
    root.render.film_transparent=False
    root.render.image_settings.file_format='PNG'
    root.render.filepath=str(private_path(Path(command['output'])/'preview.png'))
    bpy.ops.render.render(write_still=True)
    result.update(resolution=list(resolution),camera=dict(projection=camera.data.type,position=list(camera.location),
                  rotation=list(camera.rotation_euler),**(dict(orthoScale=camera.data.ortho_scale) if not saved else dict(lens=camera.data.lens))))
    return result


def compose_presentation(scene, root, resolution):
    """Fit actual bounds; favor views where furniture is not hidden by walls."""
    bpy.context.view_layer.update()
    meshes=[o for o in root.objects if o.type=='MESH']
    corners=[o.matrix_world@Vector(p) for o in meshes for p in o.bound_box]
    lo=Vector([min(p[i] for p in corners) for i in range(3)]);hi=Vector([max(p[i] for p in corners) for i in range(3)]);target=(lo+hi)/2
    maximum=max(hi-lo);wall_objects=[bpy.data.objects[o['id']] for o in scene['objects'] if o['type'] in ('wall','solid','model')]
    assets=[o for o in scene['objects'] if o['type']=='asset']
    aims=[Vector((o['position'][0],o['position'][1],o['position'][2]+o['size'][2]/2-.01)) for o in assets]
    def visibility(direction, eye=None):
        if eye is None:eye=target+direction*max(20,maximum*4)
        visible=0
        for point in aims:
            delta=point-eye;distance=delta.length;direction_to=delta.normalized()
            if not any(w.ray_cast(w.matrix_world.inverted()@eye,w.matrix_world.inverted().to_3x3()@direction_to,distance=distance-.02)[0] for w in wall_objects):visible+=1
        return visible
    directions=[Vector((x,y,2.2)).normalized() for x,y in [(.8,-1.1),(-.8,-1.1),(.8,1.1),(-.8,1.1)]]
    direction=max(directions,key=visibility)
    camera=bpy.data.objects.new('StudioCamera',bpy.data.cameras.new('StudioCamera'));root.collection.objects.link(camera)
    camera.data.lens=50;camera.data.sensor_fit='HORIZONTAL';root.camera=camera
    frame=fit_presentation_camera(root,camera,corners,target,direction,resolution)
    width,depth=scene['bounds'];power=max(maximum,2)**2
    for name,offset,energy,size,color in [
        ('Key',(-.6,-.7,1.6),32,.85,(1,.92,.82)),
        ('Fill',(1,.5,1.1),12,.75,(.82,.9,1)),
        ('Rim',(-.2,1.2,1.5),24,.6,(1,1,1)),
    ]:
        light=bpy.data.lights.new(name,'AREA');light.energy=power*energy;light.shape='DISK';light.size=maximum*size;light.color=color
        ob=bpy.data.objects.new(name,light);root.collection.objects.link(ob);ob.location=Vector((width/2,depth/2,0))+Vector(offset)*maximum
        ob.rotation_euler=(target-ob.location).to_track_quat('-Z','Y').to_euler()
    world=bpy.data.worlds.new('StudioWorld');world.use_nodes=True;world.node_tree.nodes['Background'].inputs[0].default_value=(.8,.85,.92,1)
    world.node_tree.nodes['Background'].inputs[1].default_value=.35;root.world=world
    bpy.context.view_layer.update()
    return dict(frame,visibleFurniture=visibility(direction,camera.location),furnitureTotal=len(assets))


def component_mesh(item, materials):
    if item['shape']=='text':
        curve=bpy.data.curves.new(item['id']+'__text','FONT');curve.body=item['text'];curve.extrude=item['depth']/2;curve.resolution_u=8
        font=None
        if any(ord(c)>127 for c in item['text']):
            font_path=next((p for p in map(Path,('/System/Library/Fonts/PingFang.ttc','/System/Library/Fonts/STHeiti Medium.ttc','/System/Library/Fonts/Supplemental/Arial Unicode.ttf')) if p.is_file()),None)
            if font_path is None:raise ValueError('当前系统缺少中文字体，不能把缺字方框当作文字成果')
            font=bpy.data.fonts.load(str(font_path),check_existing=True);curve.font=font
        obj=bpy.data.objects.new(item['id'],curve);bpy.context.scene.collection.objects.link(obj)
        bpy.ops.object.select_all(action='DESELECT');obj.select_set(True);bpy.context.view_layer.objects.active=obj;bpy.ops.object.convert(target='MESH')
        obj=bpy.context.view_layer.objects.active;coords=[list(v.co) for v in obj.data.vertices]
        if not coords:raise ValueError('文字未产生有效网格：'+item['label'])
        low=[min(v[i] for v in coords) for i in range(3)];high=[max(v[i] for v in coords) for i in range(3)]
        target=[max(p[0] for p in item['outline']),max(p[1] for p in item['outline']),item['depth']]
        if min(high[i]-low[i] for i in range(3))<1e-8:raise ValueError('文字网格退化：'+item['label'])
        for vertex in obj.data.vertices:
            p=[(vertex.co[i]-low[i])/(high[i]-low[i])*target[i] for i in range(3)]
            vertex.co=p if item['plane']=='xy' else [p[0],p[2],p[1]] if item['plane']=='xz' else [p[2],p[0],p[1]]
        if curve.users==0:bpy.data.curves.remove(curve)
        if font and font.users==0:bpy.data.fonts.remove(font)
        import bmesh
        bm=bmesh.new();bm.from_mesh(obj.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(obj.data);bm.free()
        physical_uv(obj.data)
    else:
        vertices,faces=extrusion_data(item);obj=bpy.data.objects.new(item['id'],mesh_data(vertices,faces,[0]*len(faces)))
    obj.location=item['position'];obj.rotation_mode='XYZ';obj.rotation_euler=item['rotationEuler']
    spec={**materials[item['material']],**item.get('finish',{})}
    obj.data.materials.append(material(item['id']+'__object__'+item['material'],spec,item.get('finish')))
    return obj


def component_mesh_audit(scene):
    bpy.context.view_layer.update();items=[]
    for item in scene.get('objects',[]):
        if item['type']!='solid':continue
        obj=next((o for o in bpy.data.objects if o.get('studio_id')==item['id']),None)
        if obj is None or obj.type!='MESH':items.append(dict(id=item['id'],passed=False,error='missing mesh'));continue
        points=[obj.matrix_world@v.co for v in obj.data.vertices];actual=[[fn(p[i] for p in points) for i in range(3)] for fn in (min,max)]
        expected=expected_bounds(item);error=max(abs(a-b) for aa,bb in zip(actual,expected) for a,b in zip(aa,bb))
        # Curved glyphs need not occupy their rectangular envelope after arbitrary rotation.
        envelope_only=item['shape']=='text'
        containment=all(actual[0][i]>=expected[0][i]-.0001 and actual[1][i]<=expected[1][i]+.0001 for i in range(3))
        import bmesh
        bm=bmesh.new();bm.from_mesh(obj.data)
        # GLB splits vertices at UV/normal seams. Weld only this audit copy.
        bmesh.ops.remove_doubles(bm,verts=list(bm.verts),dist=1e-6)
        closed=all(e.is_manifold for e in bm.edges);volume=bm.calc_volume(signed=True);bm.free()
        expected_volume=(abs(signed_area(item['outline']))-sum(abs(signed_area(h)) for h in item['holes']))*item['depth']
        volume_ok=closed and volume>0 and abs(volume-expected_volume)<max(1e-8,expected_volume*1e-4)
        items.append(dict(id=item['id'],key=item['origin']['key'],shape=item['shape'],passed=containment if envelope_only else error<.0001 and volume_ok,
            bounds=actual,expectedBounds=expected,envelopeErrorMetres=error,closed=closed,volume=volume,expectedVolume=None if envelope_only else expected_volume,
            check='text_envelope' if envelope_only else 'closed_profile_bounds_and_volume'))
    return dict(basis='actual_mesh_world_vertices',passed=all(i['passed'] for i in items),objects=items)


def build_scene(command):
    scene = command['scene']
    if scene.get('schemaVersion') not in (1, 2, 3, 4, 5, 6, 7, 8) or scene.get('unit') != 'm' or len(scene['objects']) > 5000:
        raise ValueError('Unsupported scene')
    cad_hash = command.get('cadHash')
    if cad_hash is not None:
        if not isinstance(cad_hash,str) or len(cad_hash)!=64 or any(c not in '0123456789abcdef' for c in cad_hash):
            raise ValueError('Invalid CAD stage receipt')
        cad_path=private_path(str(Path(command['output'])/'plan.dxf'),True)
        if hashlib.sha256(cad_path.read_bytes()).hexdigest()!=cad_hash:
            raise ValueError('CAD drawing set changed; model/render was not started')
    views=command.get('views',['overview']) if command.get('render') else []
    saved=scene.get('presentation',{});cameras=saved.get('cameras',[])
    allowed=['overview','front','back','left','right','top']+[c['key'] for c in cameras]
    if not isinstance(views,list) or len(views)>12 or command.get('render') and not views or any(v not in allowed for v in views) or len(set(views))!=len(views):
        raise ValueError('Invalid render views')
    bpy.ops.wm.read_factory_settings(use_empty=True)
    root = bpy.context.scene
    root.unit_settings.system = 'METRIC'
    root.unit_settings.scale_length = 1
    if scene.get('design') and command.get('action')!='draft-preview':scene['design']['review']=review_design(scene)
    root.render.resolution_x,root.render.resolution_y=command.get('resolution',[960,720]);root.render.resolution_percentage=100
    materials = command['materials']
    wall_segments = []
    for item in scene['objects']:
        if item['type'] != 'wall': continue
        if item.get('path'):
            wall_segments.extend(dict(item, id=item['id']+':'+str(i), a=a, b=b)
                                 for i, (a, b) in enumerate(zip(item['path'], item['path'][1:])))
        else: wall_segments.append(item)
    if len(wall_segments) > 12000:
        raise ValueError('Wall mesh segment budget exceeded')
    for item in scene['objects']:
        kind = item['type']
        if kind == 'wall':
            a, b = item['a'], item['b']
            length = math.dist(a, b)
            h, t = item['height'], item['thickness']
            if item.get('path'):
                obj = bpy.data.objects.new(item['id'], curved_wall_mesh(item, wall_segments))
            else:
                parts = wall_parts(length, item['openings'], h, t)
                obj = bpy.data.objects.new(item['id'], box_mesh(parts,wall_ends(item,wall_segments),length))
                obj.location = (a[0], a[1], 0)
                obj.rotation_euler.z = math.atan2(b[1]-a[1], b[0]-a[0])
            for surface in ['side-a', 'side-b', 'edge']:
                key = item['materials'][surface]
                obj.data.materials.append(material(item['id']+'__'+surface+'__'+key, materials[key]))
        elif kind == 'floor' and item.get('polygon'):
            obj = bpy.data.objects.new(item['id'], room_floor_mesh(item))
            key = item['material']
            obj.data.materials.append(material(item['id']+'__object__'+key, materials[key]))
            obj['studio_room_area'] = item['area']
        elif kind == 'asset' and item['asset'] in asset_catalog['furniture']:
            obj = furniture_mesh(item, materials)
        elif kind == 'solid':
            obj = component_mesh(item, materials)
        elif kind == 'model':
            obj = project_model(item,command['resourceRoot'],private_path)
        else:
            if kind == 'floor':
                size, position = [item['width'], item['depth'], 0.08], [item['width']/2,item['depth']/2,-0.04]
            elif kind == 'asset':
                size, position = item['size'], item['position']
            else:
                raise ValueError('Unknown scene object')
            obj = bpy.data.objects.new(item['id'], box_mesh([(-size[0]/2,size[0]/2,-size[1]/2,size[1]/2,-size[2]/2,size[2]/2)]))
            obj.location = position
            obj.rotation_euler.z = item.get('rotation', 0)
            key = item['material']
            mat = material(item['id']+'__object__'+key, materials[key])
            for _ in range(3):
                obj.data.materials.append(mat)
        if not obj.users_collection:
            root.collection.objects.link(obj)
        obj['studio_id'], obj['studio_type'] = item['id'], kind
        obj['studio_label'] = item['label']
        if item.get('surface'):apply_surface(obj,item['surface'],command['resourceRoot'],private_path)
    pose_audit=furniture_pose_audit(scene)
    if not pose_audit['passed']:
        failed=next(r for r in pose_audit['objects'] if not r['passed'])
        raise ValueError('实际家具网格与方案变换不一致：'+failed['asset']+'；未发布三维或效果图')
    component_audit=component_mesh_audit(scene)
    if not component_audit['passed']:raise ValueError('实际构件网格与轮廓或标高不一致，未发布三维或效果图')
    imported_audit=model_audit(scene)
    if not imported_audit['passed']:raise ValueError('精细模型实际网格与导入资源或变换不一致，未发布三维或效果图')
    bpy.context.view_layer.update()
    for item in scene['objects']:
        if item['type']=='wall':opening_details(item,bpy.data.objects[item['id']],materials)
    if command.get('action')=='draft-preview':
        return draft_preview(root,scene,command,cameras)
    if command.get('drawingView'):
        return project_elevation(root, scene, command['drawingView'], command.get('cutAt'))
    resolution=command.get('resolution',[960,720]);presentation=compose_presentation(scene,root,resolution)
    if saved:configure_lights(saved,root)
    presentation['saved']=saved
    overview=presentation['viewDirection'];frames=[]
    for index,view in enumerate(views):
        frames.append(dict(id=view,label=next((c['label'] for c in cameras if c['key']==view),view),file='render.png' if index==0 else 'render-'+view+'.png',presentation=select_render_view(root,view,overview,resolution,cameras)))
    if frames:
        first=select_render_view(root,views[0],overview,resolution,cameras);presentation.update(first)
    root.render.engine = 'CYCLES'
    root.cycles.device = 'CPU'
    root.cycles.samples = command.get('samples', 48)
    root.cycles.use_denoising = True
    root.cycles.seed = 37
    root.render.resolution_x, root.render.resolution_y = command.get('resolution', [960, 720])
    root.render.resolution_percentage = 100
    root.render.image_settings.file_format = 'PNG'
    root.view_settings.view_transform = 'AgX'
    root['studio_revision'] = command['revision']
    output = private_path(command['output'])
    output.mkdir(parents=True, exist_ok=True)
    if cad_hash is None:
        write_dxf(scene, output/'plan.dxf')
    bpy.ops.export_scene.gltf(filepath=str(output/'scene.glb'), export_format='GLB', export_extras=True,
                              export_yup=True, export_cameras=True, export_lights=False)
    # Presentation-only ground and edge highlights do not alter editable CAD or GLB.
    for obj in list(root.objects):
        if obj.get('studio_type') in ('wall','floor','solid') and min(obj.dimensions)>=.005:
            bevel=obj.modifiers.new('Render edge highlight','BEVEL');bevel.width=min(.004,min(obj.dimensions)*.1);bevel.segments=3;bevel.limit_method='ANGLE';bevel.use_clamp_overlap=True;bevel.harden_normals=True;bevel.show_viewport=False
    width,depth=scene['bounds'];maximum=max(width,depth)
    stage=bpy.data.objects.new('PresentationGround',box_mesh([(-maximum*2,maximum*2,-maximum*2,maximum*2,-.04,0)]));stage.location=(width/2,depth/2,-.085)
    root.collection.objects.link(stage);stage.data.materials.append(material('PresentationGround',dict(color=[.55,.54,.51],roughness=.9)));stage['studio_presentation']=True
    # Converted glyphs are meshes; unused CJK fonts can otherwise pack tens of MB per copy.
    for curve in list(bpy.data.curves):
        if curve.type == 'FONT' and curve.users == 0:
            bpy.data.curves.remove(curve)
    referenced_fonts = {getattr(obj.data, slot) for obj in root.objects if obj.type == 'FONT'
                        for slot in ('font','font_bold','font_italic','font_bold_italic')}
    for font in list(bpy.data.fonts):
        if font not in referenced_fonts:
            bpy.data.fonts.remove(font,do_unlink=True)
    bpy.ops.file.pack_all()
    root['studio_presentation']=json.dumps(presentation);bpy.ops.wm.save_as_mainfile(filepath=str(output/'scene.blend'),compress=True)
    for frame in frames:
        print('@interior '+json.dumps(dict(id=command.get('id'),progress='渲染视角 '+str(views.index(frame['id'])+1)+'/'+str(len(views))+' · '+frame['id'])),flush=True)
        select_render_view(root,frame['id'],overview,resolution,cameras)
        root.render.filepath = str(output/frame['file'])
        bpy.ops.render.render(write_still=True)
    return dict(revision=command['revision'], objectIds=[o['id'] for o in scene['objects']],
                objects=len(scene['objects']), blender=bpy.app.version_string,
                resolution=[root.render.resolution_x, root.render.resolution_y], backend='CPU',
                presentation=presentation,views=frames,poseAudit=pose_audit,componentAudit=component_audit,importedAudit=imported_audit,
                meshContactReview=connection_review(root,scene),files=[p.name for p in output.iterdir() if p.is_file()])


def render_existing(command):
    """Render the checked immutable model without rebuilding or resaving its geometry."""
    source = private_path(command['blendPath'], True)
    cad = private_path(command['cadPath'], True)
    if hashlib.sha256(source.read_bytes()).hexdigest() != command['blendHash'] or hashlib.sha256(cad.read_bytes()).hexdigest() != command['cadHash']:
        raise ValueError('Checked model or CAD source changed')
    bpy.ops.wm.open_mainfile(filepath=str(source), load_ui=False, use_scripts=False)
    root = bpy.context.scene
    scene = command['scene']
    cameras = scene.get('presentation', {}).get('cameras', [])
    allowed = ['overview','front','back','left','right','top'] + [c['key'] for c in cameras]
    views = command['views']
    if not isinstance(views,list) or not 1 <= len(views) <= 12 or len(views) != len(set(views)) or any(v not in allowed for v in views):
        raise ValueError('Invalid render views')
    saved = json.loads(root.get('studio_presentation', '{}'))
    overview = saved.get('viewDirection', [.4,-.5,.8])
    resolution = command['resolution']
    root.render.resolution_x, root.render.resolution_y = resolution
    root.render.resolution_percentage = 100
    root.render.engine = 'CYCLES'
    root.cycles.samples = command.get('samples',48)
    output = private_path(command['output'])
    frames = []
    pose_audit = furniture_pose_audit(scene)
    component_audit = component_mesh_audit(scene)
    imported_audit = model_audit(scene)
    contacts=connection_review(root,scene)
    if contacts['duplicateGeometry'] or any(row['status']=='fail' for row in contacts['declaredContacts']) or any(row['status']!='pass' for row in contacts['declaredSupports']):
        return dict(views=[],meshContactReview=contacts,rendered=False)
    if not all(audit['passed'] for audit in (pose_audit,component_audit,imported_audit)):
        raise ValueError('Loaded model no longer matches the checked design')
    for i, view in enumerate(views):
        frame = select_render_view(root,view,overview,resolution,cameras)
        row = next((c for c in cameras if c['key']==view),None)
        inspection = camera_review_for_view(root,scene,view,row)
        frames.append(dict(id=view,file='render.png' if i==0 else 'render-'+view+'.png',presentation=frame,cameraReview=inspection))
    preflight = dict(status='fail' if any(f['cameraReview']['status']=='fail' for f in frames) else 'checked',
                     views=[dict(id=f['id'],**f['cameraReview']) for f in frames])
    if preflight['status']=='fail':
        return dict(views=[],preflight=preflight,rendered=False,meshContactReview=contacts)
    for frame in frames:
        print('@interior '+json.dumps(dict(id=command.get('id'),progress='渲染视角 '+str(views.index(frame['id'])+1)+'/'+str(len(views))+' · '+frame['id'])),flush=True)
        select_render_view(root,frame['id'],overview,resolution,cameras)
        root.render.filepath = str(output/frame['file'])
        bpy.ops.render.render(write_still=True)
        frame['imageReview'] = image_review(output/frame['file'])
    return dict(revision=command['revision'],views=frames,preflight=preflight,rendered=True,presentation=saved,backend='CPU',
                poseAudit=pose_audit,componentAudit=component_audit,importedAudit=imported_audit,
                meshContactReview=contacts,
                reusedModel=True,geometryRebuilt=False)


def run(command):
    action = command.get('action')
    if action == 'hello':
        import ezdxf
        import numpy
        return dict(blender=bpy.app.version_string, python=sys.version, executable=sys.executable,
                    ezdxf=ezdxf.__version__, modules=dict(ezdxf=ezdxf.__file__, numpy=numpy.__file__),
                    userScripts=bpy.utils.user_resource('SCRIPTS'), bytecodeWritingDisabled=sys.dont_write_bytecode,
                    pathEntries=len(sys.path))
    if action == 'parse':
        return parse_dxf(command)
    if action == 'draw':
        return prepare_drawing(command['scene'], command['drawingId'], private_path(command['output']))
    if action == 'refine':
        scene=command['scene'];scene['design']['review']=review_design(scene)
        output=private_path(command['output']);output.mkdir(parents=True,exist_ok=True)
        write_dxf(scene,output/'plan.dxf')
        return dict(scene=scene)
    if action == 'import-model':
        return import_model(command,private_path)
    if action == 'drawing-sheets':
        output = private_path(command['output'])
        output.mkdir(parents=True, exist_ok=True)
        return write_drawing_set(command['scene'], command['sheets'], output/'drawings.dxf')
    if action == 'drawing-elevation':
        return build_scene({**command, 'render': False, 'drawingView': command['view']})
    if action in ('build','draft-preview'):
        return build_scene(command)
    if action == 'render-existing':
        return render_existing(command)
    if action == 'inspect':
        path = private_path(command['path'], True)
        if path.suffix=='.glb':
            bpy.ops.wm.read_factory_settings(use_empty=True)
            bpy.ops.import_scene.gltf(filepath=str(path))
        else:bpy.ops.wm.open_mainfile(filepath=str(path), load_ui=False, use_scripts=False)
        checks = []
        for item in command.get('scene', {}).get('objects', []):
            obj = next((o for o in bpy.data.objects if o.get('studio_id') == item['id']), None)
            if obj is None or obj.type != 'MESH': continue
            inverse = obj.matrix_world.inverted()
            def hit(origin, direction, distance):
                return obj.ray_cast(inverse@Vector(origin), inverse.to_3x3()@Vector(direction), distance=distance)[0]
            if item['type'] == 'wall':
                for opening in item['openings']:
                    along = (opening['start']+opening['width']/2) % wall_length(item)
                    at = point_at(item, along)
                    if 'arc' in item:
                        angle = item['arc']['start']+along/item['arc']['radius']
                        tangent = (-math.sin(angle), math.cos(angle))
                    else:
                        a = point_at(item, max(0, along-.001)); b = point_at(item, min(wall_length(item), along+.001))
                        size = math.dist(a, b); tangent = ((b[0]-a[0])/size, (b[1]-a[1])/size)
                    normal = (-tangent[1], tangent[0]); distance = item['thickness']+.1
                    def wall_hit(z):
                        return hit((at[0]+normal[0]*distance, at[1]+normal[1]*distance, z), (-normal[0], -normal[1], 0), 2*distance)
                    checks.append(dict(kind='opening', id=opening['id'], clear=not wall_hit((opening['sill']+opening['top'])/2),
                        lintelSolid=wall_hit((opening['top']+item['height'])/2) if opening['top']<item['height'] else None,
                        sillSolid=wall_hit(opening['sill']/2) if opening['sill']>0 else None))
            elif item['type'] == 'floor' and item.get('polygon'):
                from ezdxf.math.triangulation import mapbox_earcut_2d
                holes_clear = []
                for hole in item['holes']:
                    triangle = mapbox_earcut_2d(hole)[0]
                    x, y = (sum(p[i] for p in triangle)/3 for i in (0, 1))
                    holes_clear.append(not hit((x, y, 1), (0, 0, -1), 2))
                checks.append(dict(kind='room', id=item['id'], area=sum(p.area for p in obj.data.polygons if p.normal.z>.99),
                                   expectedArea=item['area'], holesClear=holes_clear))
        return dict(objects=[dict(id=o.get('studio_id'), name=o.name, dimensions=list(o.dimensions),
                                  vertices=len(o.data.vertices) if o.type == 'MESH' else 0)
                             for o in bpy.data.objects if o.get('studio_id')],
                    revision=bpy.context.scene.get('studio_revision'),
                    presentation=json.loads(bpy.context.scene.get('studio_presentation','{}')),
                    openingDetails=[dict(kind=o['studio_detail'],owner=o.parent.get('studio_id') if o.parent else None) for o in bpy.data.objects if o.get('studio_detail')],
                    geometryChecks=checks,
                    poseAudit=furniture_pose_audit(command.get('scene',{})),
                    componentAudit=component_mesh_audit(command.get('scene',{})),
                    importedAudit=model_audit(command.get('scene',{})),
                    externalImages=[i.filepath for i in bpy.data.images if i.source == 'FILE' and not i.packed_file])
    raise ValueError('Unknown fixed worker command')


print('@interior ' + json.dumps(dict(ready=True, blender=bpy.app.version_string)), flush=True)
for line in sys.stdin:
    if len(line) > 8 * 1024 * 1024:
        raise ValueError('Worker message budget exceeded')
    try:
        request = json.loads(line)
        result = dict(id=request['id'], ok=True, value=run(request))
    except Exception as error:
        result = dict(id=request.get('id') if 'request' in locals() else None, ok=False,
                      error=type(error).__name__ + ': ' + str(error))
    print('@interior ' + json.dumps(result, allow_nan=False), flush=True)
