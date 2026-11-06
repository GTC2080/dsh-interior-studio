# SPDX-License-Identifier: GPL-3.0-or-later
"""Static GLB geometry, local image finishes and persisted lights/cameras."""
import hashlib
import math
from pathlib import Path
import bpy
from mathutils import Matrix, Vector, Euler


def resource_path(root, digest, extension, private_path):
    if len(digest) != 64 or any(c not in '0123456789abcdef' for c in digest) or extension not in ('glb', 'png', 'jpg'):
        raise ValueError('Invalid project resource')
    path = private_path(str(Path(root) / (digest + '.' + extension)), True)
    if hashlib.sha256(path.read_bytes()).hexdigest() != digest:
        raise ValueError('工程资源校验失败，未发布模型')
    return path


def load_static_mesh(path):
    before = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=str(path))
    imported = set(bpy.data.objects) - before
    meshes = [o for o in imported if o.type == 'MESH']
    non_mesh_names = [o.name for o in imported if o.type != 'MESH']
    transforms = {o: o.matrix_world.copy() for o in meshes}
    if not meshes or len(imported) > 512:
        raise ValueError('GLB 未包含有效静态网格或超过对象预算')
    bpy.ops.object.select_all(action='DESELECT')
    for obj in meshes:
        matrix = transforms[obj]
        obj.parent = None
        obj.data = obj.data.copy()
        obj.data.transform(matrix)
        obj.matrix_world = Matrix.Identity(4)
        for k in list(obj.keys()):
            del obj[k]
        obj.select_set(True)
    bpy.context.view_layer.objects.active = meshes[0]
    bpy.ops.object.join()
    obj = bpy.context.view_layer.objects.active
    for name in non_mesh_names:
        if name in bpy.data.objects:
            bpy.data.objects.remove(bpy.data.objects[name], do_unlink=True)
    obj.data.calc_loop_triangles()
    if not 0 < len(obj.data.vertices) <= 300000 or not 0 < len(obj.data.loop_triangles) <= 200000:
        raise ValueError('实际网格超过30万顶点或20万三角面预算')
    if any(not math.isfinite(n) for v in obj.data.vertices for n in v.co):
        raise ValueError('模型含非有限顶点')
    return obj


def mesh_bounds(obj):
    return [[fn(v.co[i] for v in obj.data.vertices) for i in range(3)] for fn in (min, max)]


def import_model(command, private_path):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    obj = load_static_mesh(private_path(command['path'], True))
    scale = command.get('scale', 1)
    if not isinstance(scale, (int, float)) or not math.isfinite(scale) or not .001 <= scale <= 1000:
        raise ValueError('模型单位换算比例无效')
    lo, hi = mesh_bounds(obj)
    center = Vector(((lo[0]+hi[0])/2, (lo[1]+hi[1])/2, lo[2]))
    for v in obj.data.vertices:
        v.co = (v.co-center)*scale
    lo, hi = mesh_bounds(obj)
    size = [hi[i]-lo[i] for i in range(3)]
    if any(not .00001 <= n <= 100 for n in size):
        raise ValueError('模型米制尺寸不在0.01毫米至100米范围，请检查单位')
    obj.name = 'ImportedGeometry'
    bpy.ops.file.pack_all()
    output = private_path(command['output'])
    output.mkdir(parents=True, exist_ok=True)
    bpy.ops.export_scene.gltf(filepath=str(output/'model.glb'), export_format='GLB', use_selection=True,
                              export_yup=True, export_cameras=False, export_lights=False, export_extras=False)
    return dict(size=size, vertices=len(obj.data.vertices), triangles=len(obj.data.loop_triangles),
                materials=len(obj.data.materials), origin='bottom_center', unit='m')


def project_model(item, root, private_path):
    obj = load_static_mesh(resource_path(root, item['resource'], 'glb', private_path))
    lo, hi = mesh_bounds(obj)
    expected_lo = [-item['size'][0]/2, -item['size'][1]/2, 0]
    expected_hi = [item['size'][0]/2, item['size'][1]/2, item['size'][2]]
    if max(abs(v-e) for points, expected in ((lo, expected_lo), (hi, expected_hi)) for v, e in zip(points, expected)) > .0001:
        raise ValueError('精细模型尺寸与已确认的资源不一致')
    obj.name = item['id']
    obj.location = item['position']
    obj.rotation_mode = 'XYZ'
    obj.rotation_euler = item['rotationEuler']
    obj['studio_resource'] = item['resource']
    return obj


def model_audit(scene):
    bpy.context.view_layer.update()
    rows = []
    for item in scene.get('objects', []):
        if item['type'] != 'model':
            continue
        obj = next((o for o in bpy.data.objects if o.get('studio_id') == item['id']), None)
        if obj is None or obj.type != 'MESH':
            rows.append(dict(id=item['id'], passed=False, reason='missing_mesh'))
            continue
        points = [obj.matrix_world @ v.co for v in obj.data.vertices]
        expected = Matrix.Translation(Vector(item['position'])) @ Euler(item['rotationEuler'], 'XYZ').to_matrix().to_4x4()
        inverse = expected.inverted()
        local = [inverse @ p for p in points]
        lo = [-item['size'][0]/2, -item['size'][1]/2, 0]
        hi = [item['size'][0]/2, item['size'][1]/2, item['size'][2]]
        error = max(abs(fn(p[i] for p in local)-edge[i]) for fn, edge in ((min, lo), (max, hi)) for i in range(3))
        obj.data.calc_loop_triangles()
        rows.append(dict(id=item['id'], passed=error < .0001 and obj.get('studio_resource') == item['resource'],
                         envelopeErrorMetres=error, vertices=len(obj.data.vertices), triangles=len(obj.data.loop_triangles),
                         worldBounds=[[fn(p[i] for p in points) for i in range(3)] for fn in (min, max)]))
    return dict(basis='imported_static_mesh_vertices_and_transform; no exact_contact_or_load_certification',
                passed=all(r['passed'] for r in rows), objects=rows)


def apply_surface(obj, surface, root, private_path):
    path = resource_path(root, surface['resource'], surface['extension'], private_path)
    mat = bpy.data.materials.new(obj.name+'__surface')
    mat.use_nodes = True
    nodes, links = mat.node_tree.nodes, mat.node_tree.links
    shader = nodes.get('Principled BSDF')
    shader.inputs['Roughness'].default_value = surface['roughness']
    face = surface['face']
    axis = 'xyz'.index(face[0]) if face != 'all' else None
    axes = (0, 1) if axis in (None, 2) else (0, 2) if axis == 1 else (1, 2)
    origin = [min(v.co[i] for v in obj.data.vertices) for i in axes]
    original = obj.data.uv_layers.active
    layer = obj.data.uv_layers.new(name='SurfaceUV')
    for i, entry in enumerate(layer.data):
        entry.uv = (original.data[i].uv[0]-origin[0], original.data[i].uv[1]-origin[1])
    uv = nodes.new('ShaderNodeUVMap')
    uv.uv_map = layer.name
    mapping = nodes.new('ShaderNodeMapping')
    mapping.inputs['Scale'].default_value = (1/surface['repeat'][0], 1/surface['repeat'][1], 1)
    mapping.inputs['Rotation'].default_value[2] = surface['rotation']
    image = nodes.new('ShaderNodeTexImage')
    image.image = bpy.data.images.load(str(path), check_existing=True)
    image.image.colorspace_settings.name = 'sRGB'
    links.new(uv.outputs['UV'], mapping.inputs['Vector'])
    links.new(mapping.outputs['Vector'], image.inputs['Vector'])
    links.new(image.outputs['Color'], shader.inputs['Base Color'])
    if surface['emission']:
        links.new(image.outputs['Color'], shader.inputs['Emission Color'])
        shader.inputs['Emission Strength'].default_value = surface['emission']
    index = len(obj.data.materials)
    obj.data.materials.append(mat)
    sign = 1 if face.endswith('+') else -1
    for polygon in obj.data.polygons:
        if axis is None or polygon.normal[axis]*sign > .99:
            polygon.material_index = index


def configure_lights(presentation, root):
    if presentation.get('mode') == 'custom':
        for obj in list(root.objects):
            if obj.type == 'LIGHT':
                bpy.data.objects.remove(obj, do_unlink=True)
    root.world.node_tree.nodes['Background'].inputs[1].default_value = presentation['worldStrength']
    for row in presentation['lights']:
        light = bpy.data.lights.new(row['key'], row['type'].upper())
        light.energy, light.color = row['power'], row['color']
        if row['type'] == 'area':
            light.shape = 'DISK'
            light.size = row['size']
        else:
            light.shadow_soft_size = row['size']/2
        if row['type'] == 'spot':
            light.spot_size = math.radians(row['spotDegrees'])
            light.spot_blend = .4
        obj = bpy.data.objects.new(row['key'], light)
        root.collection.objects.link(obj)
        obj.location = row['position']
        obj.rotation_euler = (Vector(row['target'])-obj.location).to_track_quat('-Z', 'Y').to_euler()
        obj['studio_light'] = row['key']


def select_camera(root, row):
    camera = root.camera
    camera.location = row['position']
    camera.data.lens = row['lens']
    camera.data.clip_start = .01
    camera.data.clip_end = 5000
    camera.rotation_euler = (Vector(row['target'])-camera.location).to_track_quat('-Z', 'Y').to_euler()
    x, y, z = row['target']
    camera['studio_target'] = [x, z, -y]
    bpy.context.view_layer.update()
    return dict(cameraPosition=list(camera.location), target=row['target'], lens=row['lens'], custom=True)
