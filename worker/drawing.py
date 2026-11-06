# SPDX-License-Identifier: GPL-3.0-or-later
"""A single reviewed design drives editable DXF and Blender geometry."""
import copy
import math
import uuid
import ezdxf
from ezdxf.math import Vec2, is_point_in_polygon_2d, offset_vertices_2d
from topology import wall_points, wall_length, lengths, point_at, recognize_rooms
from design_review import review_design
from solids import extrusion_data


def opening_intervals(wall):
    length = wall_length(wall); intervals = []
    for opening in wall['openings']:
        start, end = opening['start'], opening['start']+opening['width']
        intervals.append((start, min(length, end)))
        if opening.get('wrap'): intervals.append((0, end-length))
    return sorted(intervals)


def path_between(wall, start, end):
    path = wall_points(wall); along = lengths(path)
    return [point_at(wall, start)]+[p for p, d in zip(path, along) if start+1e-8 < d < end-1e-8]+[point_at(wall, end)]


def write_dxf(scene, path):
    doc = ezdxf.new('R2010'); doc.units = 6
    doc.appids.new('DSH')
    for name, color in [('A-WALL',7),('CENTERLINE',8),('A-DOOR',30),('A-WINDOW',4),('A-PASSAGE',6),('ROOMS',3),('FURNITURE',8),('COMPONENTS',2),('DIMENSIONS',8)]:
        doc.layers.new(name,dxfattribs={'color':color})
    space = doc.modelspace()
    for item in scene['objects']:
        if item['type'] == 'wall':
            size, thickness = wall_length(item), item['thickness']
            centerline = space.add_lwpolyline(wall_points(item),dxfattribs={'layer':'CENTERLINE'})
            centerline.set_xdata('DSH',[(1000,'wall'),(1000,item['id']),(1040,item['height']),(1040,thickness)])
            cursor = 0; solids = []
            for start, end in opening_intervals(item):
                if start > cursor+1e-8: solids.append((cursor,start))
                cursor = max(cursor,end)
            if cursor < size-1e-8: solids.append((cursor,size))
            for start, end in solids:
                if 'arc' in item:
                    arc = item['arc']; begin = arc['start']+start/arc['radius']; finish = arc['start']+end/arc['radius']
                    for radius in (arc['radius']-thickness/2,arc['radius']+thickness/2):
                        if finish-begin >= math.tau-1e-7: space.add_circle(arc['center'],radius,dxfattribs={'layer':'A-WALL'})
                        else: space.add_arc(arc['center'],radius,math.degrees(begin)%360,math.degrees(finish)%360,dxfattribs={'layer':'A-WALL'})
                    if finish-begin < math.tau-1e-7:
                        for angle in (begin,finish):
                            points=[[arc['center'][0]+r*math.cos(angle),arc['center'][1]+r*math.sin(angle)] for r in (arc['radius']-thickness/2,arc['radius']+thickness/2)]
                            space.add_line(*points,dxfattribs={'layer':'A-WALL'})
                else:
                    points=path_between(item,start,end)
                    left=list(offset_vertices_2d(points,thickness/2));right=list(offset_vertices_2d(points,-thickness/2))
                    space.add_lwpolyline([tuple(p) for p in left+list(reversed(right))],close=True,dxfattribs={'layer':'A-WALL'})
            for opening in item['openings']:
                a=point_at(item,opening['start']);b=point_at(item,opening['start']+opening['width'])
                layer={'door':'A-DOOR','window':'A-WINDOW','passage':'A-PASSAGE'}[opening['kind']]
                if opening['kind']=='window' and 'arc' in item:
                    arc=item['arc'];begin=arc['start']+opening['start']/arc['radius'];end=begin+opening['width']/arc['radius']
                    marker=space.add_arc(arc['center'],arc['radius'],math.degrees(begin)%360,math.degrees(end)%360,dxfattribs={'layer':layer})
                else: marker=space.add_line(a,b,dxfattribs={'layer':layer})
                marker.set_xdata('DSH',[(1000,opening['kind']),(1000,item['id']),(1040,opening['start']),
                                      (1040,opening['width']),(1040,opening['sill']),(1040,opening['top'])])
                if opening['kind']=='door':
                    radius=math.dist(a,b);angle=math.atan2(b[1]-a[1],b[0]-a[0]);turn=math.pi/2*(1 if opening.get('swing','left')=='left' else -1)
                    leaf=[a[0]+radius*math.cos(angle+turn),a[1]+radius*math.sin(angle+turn)]
                    space.add_line(a,leaf,dxfattribs={'layer':layer})
                    begin,end=(angle,angle+turn) if turn>0 else (angle+turn,angle)
                    space.add_arc(a,radius,math.degrees(begin)%360,math.degrees(end)%360,dxfattribs={'layer':layer})
                elif opening['kind']=='window' and 'arc' in item:
                    arc=item['arc'];begin=arc['start']+opening['start']/arc['radius'];end=begin+opening['width']/arc['radius']
                    for radius in (arc['radius']-thickness/3,arc['radius']+thickness/3):
                        space.add_arc(arc['center'],radius,math.degrees(begin)%360,math.degrees(end)%360,dxfattribs={'layer':layer})
                elif opening['kind']=='window':
                    points=path_between(item,opening['start'],opening['start']+opening['width'])
                    for offset in (-thickness/3,thickness/3):
                        space.add_lwpolyline([tuple(p) for p in offset_vertices_2d(points,offset)],dxfattribs={'layer':layer})
        elif item['type']=='floor':
            polygon=item.get('polygon') or [[0,0],[item['width'],0],[item['width'],item['depth']],[0,item['depth']]]
            for ring in [polygon]+item.get('holes',[]):space.add_lwpolyline(ring,close=True,dxfattribs={'layer':'ROOMS'})
            if item.get('labelPoint'):
                measured=next((r for r in scene.get('design',{}).get('review',{}).get('rooms',[]) if r['id']==item['id']),None)
                area_text=f"Net area: {measured['clear']['area']:.2f} m²" if measured and measured.get('clear') else f"Centerline area: {item['area']:.2f} m²"
                if item.get('origin',{}).get('areaBasis')=='declared_site':area_text=f"Site area: {item['area']:.2f} m²"
                space.add_mtext(item['label']+'\\P'+area_text,dxfattribs={'layer':'ROOMS','char_height':.18,'insert':item['labelPoint']})
        elif item['type']=='asset':
            x,y=item['position'][:2];width,depth=item['size'][:2];angle=item.get('rotation',0)
            points=[[x+a*math.cos(angle)-b*math.sin(angle),y+a*math.sin(angle)+b*math.cos(angle)]
                    for a,b in [(-width/2,-depth/2),(width/2,-depth/2),(width/2,depth/2),(-width/2,depth/2)]]
            outline=space.add_lwpolyline(points,close=True,dxfattribs={'layer':'FURNITURE'})
            outline.set_xdata('DSH',[(1000,item['id']),(1000,item['asset']),(1040,item['size'][2])])
        elif item['type']=='solid':
            vertices,faces=extrusion_data(item,world=True)
            for face in faces:
                # 3DFACE retains profile holes, exact elevations and editable vertices.
                for i in range(1,len(face)-1):
                    entity=space.add_3dface([vertices[face[0]],vertices[face[i]],vertices[face[i+1]]],dxfattribs={'layer':'COMPONENTS'})
                    entity.set_xdata('DSH',[(1000,item['id']),(1000,item['origin']['key']),(1000,item['shape'])])
            if item['shape']=='text':
                space.add_mtext(item['text'],dxfattribs={'layer':'COMPONENTS','insert':item['position'],'char_height':max(p[1] for p in item['outline'])})
        elif item['type']=='model':
            w,d,h=item['size']
            prism=dict(plane='xy',outline=[[-w/2,-d/2],[w/2,-d/2],[w/2,d/2],[-w/2,d/2]],holes=[],depth=h,
                       position=item['position'],rotationEuler=item['rotationEuler'])
            vertices,faces=extrusion_data(prism,world=True)
            for face in faces:
                for i in range(1,len(face)-1):
                    entity=space.add_3dface([vertices[face[0]],vertices[face[i]],vertices[face[i+1]]],dxfattribs={'layer':'COMPONENTS'})
                    entity.set_xdata('DSH',[(1000,item['id']),(1000,item['origin']['key']),(1000,'IMPORTED_MODEL_ENVELOPE')])
    width,depth=scene['bounds'];review=scene.get('design',{}).get('review',{})
    x0,y0,x1,y1=review.get('referenceExtents') or [0,0,width,depth]
    for a,b in [((x0,y0),(x1,y0)),((x0,y1),(x0,y0))]:
        space.add_aligned_dim(a,b,distance=-.6,dimstyle='Standard',override={'dimtxt':.18,'dimasz':.12,'dimdec':2,'dimtad':1},dxfattribs={'layer':'DIMENSIONS'}).render()
    for room in review.get('rooms',[]):
        if not room.get('clear'):continue
        a,b,c,d=room['clear']['extents']
        for start,end in [((a,b),(c,b)),((a,d),(a,b))]:
            space.add_aligned_dim(start,end,distance=.25,text='<> net',dimstyle='Standard',override={'dimtxt':.12,'dimasz':.08,'dimdec':3,'dimtad':1},dxfattribs={'layer':'DIMENSIONS'}).render()
    basis={'outside':'outside faces','centerline':'wall centerlines','site':'site'}.get(review.get('dimensionBasis'),'declared extent; verify reference')
    space.add_mtext('Dimensions: '+basis+' · metres\\PNet room dimensions exclude wall thickness. Heights are stored as DSH XDATA.',
                    dxfattribs={'layer':'DIMENSIONS','char_height':.15,'insert':(0,depth+.6)})
    doc.saveas(path)
    if path.stat().st_size > 20*1024*1024: raise ValueError('Generated CAD exceeds the 20 MiB limit')


def write_drawing_set(scene, sheets, path):
    """Same read-only paper primitives as the Client; Modelspace retains metre geometry."""
    required={'plan', 'front', 'back', 'left', 'right'}
    views={s['view'] for s in sheets}
    if not (len(sheets)==5 and views==required or len(sheets)==7 and views==required|{'section_x','section_y'}):
        raise ValueError('Drawing set must contain five orthographic sheets, optionally both X/Y sections')
    write_dxf(scene, path)
    doc = ezdxf.readfile(path)
    doc.styles.new('DSH-Notes', dxfattribs={'font': 'Arial Unicode.ttf'})
    doc.linetypes.new('DSH_HIDDEN', dxfattribs={'description': 'Overhead 2mm/1mm', 'pattern': [3, 2, -1]})
    weights = [0, 5, 9, 13, 15, 18, 20, 25, 30, 35, 40, 50, 53, 60, 70, 80, 90, 100, 106, 120, 140, 158, 200, 211]
    color = lambda value: int(value.lstrip('#'), 16)
    for index, sheet in enumerate(sheets):
        if sheet['width'] != 420 or sheet['height'] != 297 or len(sheet['lines']) > 50000 or len(sheet['texts']) > 1000:
            raise ValueError('Drawing sheet exceeds the A3 output budget')
        layout = doc.layouts.new(f"A-{101+index} {sheet['label']}")
        layout.page_setup(size=(420, 297), margins=(0, 0, 0, 0), units='mm', scale=(1, 1), name='A3')
        xy = lambda point: (point[0], 297-point[1])
        for kind, style in sheet['styles'].items():
            name = 'P-'+kind.upper()
            if name not in doc.layers:
                weight = min(weights, key=lambda value: abs(value-style['width']*100))
                doc.layers.new(name, dxfattribs={'color': 7, 'true_color': color(style['color']), 'lineweight': weight})
        for item in sheet['paths']:
            attrs = {'layer': 'P-'+item['kind'].upper()}
            if item.get('fill'):
                hatch = layout.add_hatch(dxfattribs={**attrs, 'true_color': color(item['fill'])})
                for ring in item['rings']:
                    nesting = sum(is_point_in_polygon_2d(Vec2(ring[0]), Vec2.list(other)) > 0 for other in item['rings'] if other is not ring)
                    hatch.paths.add_polyline_path([xy(p) for p in ring], is_closed=True, flags=1 if nesting % 2 == 0 else 0)
            for ring in item['rings']:
                layout.add_lwpolyline([xy(p) for p in ring], close=True, dxfattribs=attrs)
        for item in sheet['lines']:
            if item['kind'] in {'dimension', 'extension'}: continue
            attrs = {'layer': 'P-'+item['kind'].upper()}
            if item.get('dash'): attrs['linetype'] = 'DSH_HIDDEN'
            layout.add_line(xy(item['a']), xy(item['b']), dxfattribs=attrs)
        for item in sheet['texts']:
            if item['kind'] == 'dimension': continue
            # MTEXT formatting is escaped so literal labels cannot become CAD field/style directives.
            value = item['value'].replace('\\', '\\\\').replace('{', '\\{').replace('}', '\\}')
            attrs = {'layer': 'P-FRAME', 'style': 'DSH-Notes', 'char_height': item['size'], 'insert': xy(item['p']),
                     'attachment_point': {'start': 7, 'middle': 8, 'end': 9}.get(item.get('anchor', 'start'), 7),
                     'rotation': -item.get('rotation', 0), 'true_color': 0x20252A}
            if item.get('mask'): attrs.update(bg_fill=1, bg_fill_true_color=0xFFFFFF, box_fill_scale=1.1)
            layout.add_mtext(value, dxfattribs=attrs)
        for dimension in sheet['dimensions']:
            a, b = dimension['paperA'], dimension['paperB']
            base = (a[0], dimension['offset']) if dimension['axis'] == 'x' else (dimension['offset'], a[1])
            layout.add_linear_dim(base=xy(base), p1=xy(a), p2=xy(b), angle=0 if dimension['axis'] == 'x' else 90,
                                  dimstyle='Standard', override={'dimlfac': sheet['scale'], 'dimtxt': dimension['textSize'],
                                  'dimasz': 1.1, 'dimdec': 0, 'dimtad': 1, 'dimblk': 'ARCHTICK'},
                                  dxfattribs={'layer': 'P-DIMENSION'}).render()
    if 'Layout1' in doc.layouts: doc.layouts.delete('Layout1')
    doc.saveas(path)
    if path.stat().st_size > 20*1024*1024: raise ValueError('Drawing set exceeds the 20 MiB limit')
    audit = doc.audit()
    if audit.errors or audit.fixes: raise ValueError('Drawing set failed DXF audit')
    return {'sheets': len(sheets), 'unit': 'mm', 'modelUnit': 'm'}


def prepare_drawing(scene, drawing_id, output):
    scene=copy.deepcopy(scene);walls=[o for o in scene['objects'] if o['type']=='wall']
    width,depth=scene['bounds']
    rooms,topology=recognize_rooms(walls,1)
    if scene['kind']=='booth':
        rooms=[dict(polygon=[[0,0],[width,0],[width,depth],[0,depth]],holes=[],area=width*depth,
                    labelPoint=[width/2,depth/2],boundaryWalls=list(range(len(walls))),areaBasis='declared_site')]
    elif not rooms: raise ValueError('设计尚未形成闭合房间，请补齐外轮廓或修正墙体交点后重试')
    if scene['kind']=='interior':
        def enclosed(point):
            return any(is_point_in_polygon_2d(Vec2(point),Vec2.list(room['polygon']),abs_tol=.003)>=0
                       and all(is_point_in_polygon_2d(Vec2(point),Vec2.list(hole),abs_tol=.003)<=0 for hole in room['holes']) for room in rooms)
        for wall in walls:
            points=wall_points(wall)
            samples=points+[[(a[k]+b[k])/2 for k in (0,1)] for a,b in zip(points,points[1:])]
            if not all(enclosed(p) for p in samples):
                raise ValueError('部分墙体未围合成闭合房间，请补齐室内外轮廓；开放展台请选择 booth')
    labels={}
    for label in scene['design']['roomLabels']:
        matches=[i for i,room in enumerate(rooms) if is_point_in_polygon_2d(Vec2(label['point']),Vec2.list(room['polygon']))>0
                 and all(is_point_in_polygon_2d(Vec2(label['point']),Vec2.list(hole))<0 for hole in room['holes'])]
        if len(matches)!=1: raise ValueError('房间标记 '+label['name']+' 不在唯一的闭合房间内，请修正布置')
        index=matches[0]
        if index in labels: raise ValueError('多个房间名称位于同一空间，请补充分隔墙或合并名称')
        labels[index]=label
    for i,room in enumerate(rooms):
        label=labels.get(i,{}).get('name','展台' if scene['kind']=='booth' else f'房间 {i+1}')
        room['label']=label
        scene['objects'].append(dict(id=str(uuid.uuid4()),type='floor',label=label,polygon=room['polygon'],holes=room['holes'],
            width=width,depth=depth,area=room['area'],labelPoint=room['labelPoint'],material=labels.get(i,{}).get('material',scene['parameters']['floorMaterial']),boundaryWallIds=[walls[j]['id'] for j in room['boundaryWalls']],
            origin=dict(category='design_proposal',actor='model_tool',status='awaiting_user_confirmation',areaBasis=room['areaBasis'])))
    scene['design']['review']=review_design(scene)
    output.mkdir(parents=True,exist_ok=True)
    write_dxf(scene,output/'plan.dxf')
    return dict(scene=scene)
