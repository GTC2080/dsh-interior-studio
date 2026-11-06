# SPDX-License-Identifier: GPL-3.0-or-later
"""Measured dimensions and bounded circulation checks, independent of model prose."""
import math
from collections import deque
from ezdxf.math import Vec2, is_point_in_polygon_2d
from topology import wall_points, wall_length, point_at, wall_ends


def segment_distance(p, a, b):
    dx, dy = b[0]-a[0], b[1]-a[1]
    t = max(0, min(1, ((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy)))
    return math.hypot(p[0]-a[0]-t*dx, p[1]-a[1]-t*dy)


def wall_segments(walls):
    return [dict(w, id=w['id']+':'+str(i), a=a, b=b) if w.get('path') else w
            for w in walls for i, (a, b) in enumerate(zip(wall_points(w), wall_points(w)[1:]))]


def envelope(walls):
    segments = wall_segments(walls); points = []
    if len(segments)>2000: raise ValueError('设计墙线超过 2000 段校核预算，请拆分方案')
    for wall in segments:
        a, b = wall['a'], wall['b']; length = math.dist(a, b)
        dx, dy = (b[0]-a[0])/length, (b[1]-a[1])/length
        for ends in wall_ends(wall, segments):
            for x, side in zip(ends, [-1, 1]):
                y = side*wall['thickness']/2
                points.append([a[0]+x*dx-y*dy, a[1]+x*dy+y*dx])
    return [min(p[0] for p in points), min(p[1] for p in points),
            max(p[0] for p in points), max(p[1] for p in points)] if points else None


def room_measurement(room, walls):
    polygon = room['polygon']; lo = [min(p[i] for p in polygon) for i in (0, 1)]; hi = [max(p[i] for p in polygon) for i in (0, 1)]
    result = dict(id=room['id'], name=room['label'], centerlineArea=room['area'], clear=None)
    # Exact net dimensions only for rectangular, constant-thickness boundaries.
    # Irregular rooms retain their measured contour area, never a bounding-box "net area".
    if room['holes'] or abs((hi[0]-lo[0])*(hi[1]-lo[1])-room['area']) > 1e-6: return result
    offsets = []
    for axis, coordinate in [(0, lo[0]), (0, hi[0]), (1, lo[1]), (1, hi[1])]:
        thicknesses = {round(w['thickness'], 8) for w in wall_segments(walls)
                       if abs(w['a'][axis]-coordinate)<1e-6 and abs(w['b'][axis]-coordinate)<1e-6
                       and min(w['a'][1-axis], w['b'][1-axis]) < hi[1-axis]-1e-6
                       and max(w['a'][1-axis], w['b'][1-axis]) > lo[1-axis]+1e-6}
        if len(thicknesses) != 1: return result
        offsets.append(thicknesses.pop()/2)
    width, depth = hi[0]-lo[0]-sum(offsets[:2]), hi[1]-lo[1]-sum(offsets[2:])
    if min(width, depth) <= 0: raise ValueError('墙厚占满了房间 '+room['label'])
    result['clear'] = dict(width=round(width, 6), depth=round(depth, 6), area=round(width*depth, 6),
                           extents=[lo[0]+offsets[0], lo[1]+offsets[2], hi[0]-offsets[1], hi[1]-offsets[3]])
    return result


def review_design(scene):
    walls = [o for o in scene['objects'] if o['type']=='wall']; floors = [o for o in scene['objects'] if o['type']=='floor' and o.get('polygon')]
    assets = [o for o in scene['objects'] if o['type']=='asset']; width, depth = scene['bounds']
    bounds = envelope(walls); basis = scene['design'].get('dimensionBasis', 'unspecified')
    points = [p for wall in walls for p in wall_points(wall)]
    centers = [min(p[0] for p in points), min(p[1] for p in points), max(p[0] for p in points), max(p[1] for p in points)] if points else None
    reference = bounds if basis=='outside' else centers if basis=='centerline' else [0, 0, width, depth]
    tolerance = .003
    if basis in ('outside', 'centerline') and (not reference or any(abs(a-b)>tolerance for a,b in zip(reference,[0,0,width,depth]))):
        actual = '无墙体' if not reference else f'{reference[2]-reference[0]:.3f} × {reference[3]-reference[1]:.3f} m，起点 ({reference[0]:.3f}, {reference[1]:.3f})'
        raise ValueError(f'尺寸不一致：声明的{"外墙外缘" if basis=="outside" else "墙中心线"}为 {width:g} × {depth:g} m，实际为 {actual}。请调整墙坐标，不能只修改文字说明。')
    report = dict(dimensionBasis=basis, referenceExtents=reference, outsideExtents=bounds,
                  rooms=[room_measurement(f, walls) for f in floors], issues=[],
                  circulation=dict(status='not_checked', suggestedClearWidth=.6))
    if scene['kind']!='interior': return report
    rings = [(Vec2.list(f['polygon']), [Vec2.list(h) for h in f['holes']]) for f in floors]
    def room_at(p):
        for i,(polygon, holes) in enumerate(rings):
            if is_point_in_polygon_2d(Vec2(p),polygon)>0 and all(is_point_in_polygon_2d(Vec2(p),h)<0 for h in holes): return i
        return -1
    graph = {i:set() for i in range(len(floors))}; entries = []; doors = []
    for wall in walls:
        for door in wall['openings']:
            if door['kind'] not in ('door','passage'): continue
            along=door['start']+door['width']/2; center=point_at(wall,along)
            a,b=point_at(wall,max(0,along-.001)),point_at(wall,min(wall_length(wall),along+.001)); size=math.dist(a,b)
            normal=[-(b[1]-a[1])/size,(b[0]-a[0])/size]; offset=wall['thickness']/2+.05
            sides=[room_at([center[k]+sign*normal[k]*offset for k in (0,1)]) for sign in (-1,1)]
            doors.append((wall,door,center,normal,sides))
            if sides[0]>=0 and sides[1]>=0 and sides[0]!=sides[1]: graph[sides[0]].add(sides[1]);graph[sides[1]].add(sides[0])
            elif (sides[0]>=0)!=(sides[1]>=0):
                index=next(i for i in sides if i>=0); sign=1 if sides[1]>=0 else -1
                entries.append((index,[center[k]+sign*normal[k]*(wall['thickness']/2+.4) for k in (0,1)]))
            else: report['issues'].append(dict(code='door_connection',message=f'{wall["label"]}的门未连接两个空间或外部，请检查位置。'))
            if door['sill']>.02: report['issues'].append(dict(code='raised_door',message=f'{wall["label"]}的门槛高 {door["sill"]:.2f} m，请核对。'))
            if door['width']<.75: report['issues'].append(dict(code='narrow_door',message=f'{wall["label"]}的门洞宽 {door["width"]:.2f} m，建议核对通行空间。'))
    reached=set(i for i,_ in entries);queue=deque(reached)
    while queue:
        for index in graph[queue.popleft()]-reached: reached.add(index);queue.append(index)
    if not entries: report['issues'].append(dict(code='no_entry',message='未找到连接外部的入口门，请补充入口或明确此图仅为局部空间。'))
    else:
        for i,floor in enumerate(floors):
            if i not in reached: report['issues'].append(dict(code='disconnected_room',message=f'{floor["label"]}没有通过门连到入口，请调整隔墙或补充门洞。'))
    # Sample a 0.60 m-wide route on a bounded grid. This is a design warning,
    # not an accessibility/fire-code check or proof of every usable circulation path.
    segments=[]
    for wall in walls:
        cursor=0;points=wall_points(wall);total=wall_length(wall)
        for a,b in zip(points,points[1:]):
            length=total/(len(points)-1) if wall.get('arc') else math.dist(a,b); intervals=[(cursor,cursor+length)]
            for door in wall['openings']:
                if door['kind'] not in ('door','passage') or door['sill']>.02:continue
                for start in ([door['start'],door['start']-total] if door.get('wrap') else [door['start']]):
                    end=start+door['width']; intervals=[part for lo,hi in intervals for part in [(lo,min(hi,start)),(max(lo,end),hi)] if part[1]-part[0]>1e-8]
            for lo,hi in intervals:
                segments.append((point_at(wall,lo),point_at(wall,hi),wall['thickness']/2))
            cursor+=length
    if not entries: return report
    if len(segments)>600 or sum(len(f['polygon'])+sum(map(len,f['holes'])) for f in floors)>2000:
        report['issues'].append(dict(code='route_not_checked',message='图形复杂，本次未进行净通道抽查，请人工检查动线。'));return report
    step=max(.15,width/120,depth/120);nx,ny=math.ceil(width/step),math.ceil(depth/step)
    cells={};asset_boxes=[(o,math.cos(o.get('rotation',0)),math.sin(o.get('rotation',0))) for o in assets]
    for y in range(ny):
        for x in range(nx):
            p=((x+.5)*width/nx,(y+.5)*depth/ny);room=room_at(p)
            if room<0 or any(segment_distance(p,a,b)<half+.3-1e-6 for a,b,half in segments):continue
            blocked=False
            for asset,c,s in asset_boxes:
                dx,dy=p[0]-asset['position'][0],p[1]-asset['position'][1]
                if math.hypot(max(0,abs(dx*c+dy*s)-asset['size'][0]/2),max(0,abs(-dx*s+dy*c)-asset['size'][1]/2))<.3:
                    blocked=True;break
            if not blocked:cells[(x,y)]=room
    starts=set()
    for index,p in entries:
        options=[key for key,room in cells.items() if room==index and math.dist(((key[0]+.5)*width/nx,(key[1]+.5)*depth/ny),p)<.75]
        if options:starts.add(min(options,key=lambda key:math.dist(((key[0]+.5)*width/nx,(key[1]+.5)*depth/ny),p)))
    visited=set(starts);queue=deque(starts)
    while queue:
        x,y=queue.popleft()
        for key in [(x-1,y),(x+1,y),(x,y-1),(x,y+1)]:
            if key in cells and key not in visited:visited.add(key);queue.append(key)
    accessible={cells[key] for key in visited}
    for i in reached-accessible:
        report['issues'].append(dict(code='blocked_route',message=f'按 0.60 m 净通道抽查，入口到{floors[i]["label"]}未连通；请检查门前家具和狭窄过道。'))
    report['circulation']=dict(status='checked',suggestedClearWidth=.6,gridStep=step,roomsReachable=len(accessible),roomsTotal=len(floors))
    return report
