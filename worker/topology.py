# SPDX-License-Identifier: GPL-3.0-or-later
"""Bounded, planar CAD geometry. Measurements stay in drawing coordinates."""
import math


def arc_points(arc, scale=1):
    radius, sweep = arc['radius'], arc['sweep']
    tolerance = max(.001/scale, radius*1e-5)
    step = min(math.pi/36, 2*math.acos(max(-1, 1-tolerance/radius)))
    count = max(2, math.ceil(sweep/max(step, 1e-6)))
    if count > 2048:
        raise ValueError('Curve exceeds the 2048-segment budget')
    cx, cy = arc['center']
    return [[cx+radius*math.cos(arc['start']+sweep*i/count),
             cy+radius*math.sin(arc['start']+sweep*i/count)] for i in range(count+1)]


def wall_points(wall):
    return wall.get('path') or [wall['a'], wall['b']]


def lengths(points):
    result = [0.0]
    for a, b in zip(points, points[1:]):
        result.append(result[-1]+math.dist(a, b))
    return result


def project(point, wall):
    """Return distance, along-wall distance, and projected point."""
    if 'arc' in wall:
        arc = wall['arc']; cx, cy = arc['center']; radius = arc['radius']
        angle = (math.atan2(point[1]-cy, point[0]-cx)-arc['start']) % math.tau
        candidates = [angle, angle-math.tau]
        angle = min(candidates, key=lambda a: abs(a-min(arc['sweep'], max(0, a))))
        angle = min(arc['sweep'], max(0, angle))
        at = [cx+radius*math.cos(arc['start']+angle), cy+radius*math.sin(arc['start']+angle)]
        return math.dist(point, at), angle*radius, at
    points = wall_points(wall); distances = lengths(points); choices = []
    for i, (a, b) in enumerate(zip(points, points[1:])):
        dx, dy = b[0]-a[0], b[1]-a[1]; size = distances[i+1]-distances[i]
        if size <= 1e-9:
            continue
        t = min(1, max(0, ((point[0]-a[0])*dx+(point[1]-a[1])*dy)/size**2))
        at = [a[0]+t*dx, a[1]+t*dy]
        choices.append((math.dist(point, at), distances[i]+t*size, at))
    return min(choices, key=lambda p: p[0])


def point_at(wall, distance):
    if 'arc' in wall:
        arc = wall['arc']; angle = arc['start']+distance/arc['radius']
        return [arc['center'][0]+arc['radius']*math.cos(angle), arc['center'][1]+arc['radius']*math.sin(angle)]
    points = wall_points(wall); along = lengths(points)
    for i, (a, b) in enumerate(zip(points, points[1:])):
        if distance <= along[i+1]+1e-8:
            t = max(0, distance-along[i])/(along[i+1]-along[i])
            return [a[0]+t*(b[0]-a[0]), a[1]+t*(b[1]-a[1])]
    return points[-1]


def wall_length(wall):
    return wall['arc']['radius']*wall['arc']['sweep'] if 'arc' in wall else lengths(wall_points(wall))[-1]


def paired_arcs(arcs, scale, maximum):
    """Pair concentric circular faces by overlapping angular intervals."""
    if len(arcs) > 512:
        raise ValueError('Paired-curve analysis is limited to 512 arcs')
    candidates = []; used = [[] for _ in arcs]
    for i, first in enumerate(arcs):
        a = first['arc']
        for j in range(i+1, len(arcs)):
            b = arcs[j]['arc']; gap = abs(a['radius']-b['radius'])
            if math.dist(a['center'], b['center'])*scale > .001 or not .04 <= gap*scale <= maximum:
                continue
            for offset in (-math.tau, 0, math.tau):
                lo, hi = max(a['start'], b['start']+offset), min(a['start']+a['sweep'], b['start']+b['sweep']+offset)
                if (hi-lo)*min(a['radius'], b['radius'])*scale >= .04:
                    candidates.append((gap, i, j, lo, hi, offset))
    walls = []
    for gap, i, j, lo, hi, offset in sorted(candidates):
        intervals = [(lo, hi)]
        occupied = used[i]+[(a+offset, b+offset) for a, b in used[j]]
        for start, end in sorted(occupied):
            intervals = [(a, b) for x, y in intervals for a, b in
                         [(x, min(y, start)), (max(x, end), y)] if b-a > 1e-8]
        for start, end in intervals:
            arc = dict(arcs[i]['arc'], radius=(arcs[i]['arc']['radius']+arcs[j]['arc']['radius'])/2,
                       start=start, sweep=end-start)
            if wall_length({'arc':arc})*scale < .04:
                continue
            path = arc_points(arc, scale)
            walls.append(dict(a=path[0], b=path[-1], path=path, arc=arc, thickness=gap,
                              source=dict(arcs[i]['source'], pairSources=[arcs[i]['source'], arcs[j]['source']])))
            used[i].append((start, end)); used[j].append((start-offset, end-offset))
    unmatched = sum(sum(b-a for a, b in spans) < arcs[i]['arc']['sweep']-1e-7 for i, spans in enumerate(used))
    return walls, unmatched


def recognize_openings(walls, symbols, scale, default_thickness):
    """Associate symbols with walls; bridge a gap only with matching wall ends."""
    if len(symbols) > 2000:
        raise ValueError('Opening analysis is limited to 2000 primitives; select fewer layers')
    tolerance = .025/scale
    swing_arcs = [s for s in symbols if s['kind'] in ('door', 'opening') and 'arc' in s
                  and math.pi/6 <= s['arc']['sweep'] <= math.pi+1e-7
                  and .2 <= s['arc']['radius']*scale <= 3]
    candidates = []
    for symbol in symbols:
        if symbol in swing_arcs:
            arc = symbol['arc']
            candidates.append((symbol, [dict(a=arc['center'], b=p, source=symbol['source'], kind='door')
                                        for p in (symbol['a'], symbol['b'])]))
        elif symbol['kind'] == 'door' and any(
                min(math.dist(symbol['a'], arc['arc']['center']), math.dist(symbol['b'], arc['arc']['center'])) < tolerance
                and abs(math.dist(symbol['a'], symbol['b'])-arc['arc']['radius']) < tolerance for arc in swing_arcs):
            continue  # A swing's leaf stroke is not a second opening.
        else:
            candidates.append((symbol, [symbol]))
    # Two leaves which close against one another share one structural opening.
    if len(swing_arcs) <= 256:
        for i, first in enumerate(swing_arcs):
            for second in swing_arcs[i+1:]:
                a, b = first['arc']['center'], second['arc']['center']
                if abs(math.dist(a, b)-first['arc']['radius']-second['arc']['radius']) > tolerance:
                    continue
                if min(math.dist(p, q) for p in (first['a'], first['b']) for q in (second['a'], second['b'])) > tolerance:
                    continue
                symbol = dict(a=a, b=b, kind='door', source=dict(first['source'], pairSources=[first['source'], second['source']]))
                candidates.append((symbol, [symbol]))

    def bridge(symbol):
        nonlocal work_budget
        choices = []
        for first_index, first in enumerate(walls):
            work_budget += 1
            if work_budget > 4000000: raise ValueError('Opening association budget exceeded; select fewer layers')
            for first_end in (0, -1):
                a = wall_points(first)[first_end]
                if math.dist(a, symbol['a']) > first.get('thickness', default_thickness)/2+tolerance:
                    continue
                for second_index, second in enumerate(walls):
                    work_budget += 1
                    if work_budget > 4000000: raise ValueError('Opening association budget exceeded; select fewer layers')
                    if first_index == second_index:
                        continue
                    for second_end in (0, -1):
                        b = wall_points(second)[second_end]
                        thick = first.get('thickness', default_thickness)
                        if math.dist(b, symbol['b']) > second.get('thickness', default_thickness)/2+tolerance or abs(thick-second.get('thickness', default_thickness))*scale > .02:
                            continue
                        span = math.dist(a, b)
                        if not .1 <= span*scale <= 8:
                            continue
                        item = dict(a=a, b=b, thickness=thick, openingBridge=True,
                                    source=dict(symbol['source'], wallSources=[first['source'], second['source']]))
                        if 'arc' in first and 'arc' in second:
                            arc, other = first['arc'], second['arc']
                            if math.dist(arc['center'], other['center'])*scale > .001 or abs(arc['radius']-other['radius'])*scale > .001:
                                continue
                            start = math.atan2(a[1]-arc['center'][1], a[0]-arc['center'][0]) % math.tau
                            end = math.atan2(b[1]-arc['center'][1], b[0]-arc['center'][0]) % math.tau
                            sweep = (end-start) % math.tau
                            # End-to-start follows CCW; start-to-end follows the opposite gap.
                            if first_end == 0 and second_end == -1:
                                start, sweep = end, math.tau-sweep
                            elif first_end != -1 or second_end != 0:
                                continue
                            if sweep > math.pi or sweep <= 1e-8:
                                continue
                            item['arc'] = dict(arc, start=start, sweep=sweep)
                            item['path'] = arc_points(item['arc'], scale)
                            item['a'], item['b'] = item['path'][0], item['path'][-1]
                        elif 'path' not in first and 'path' not in second:
                            dx, dy = (b[0]-a[0])/span, (b[1]-a[1])/span
                            valid = True
                            for parent, at, endpoint in ((first, a, first_end), (second, b, second_end)):
                                away = wall_points(parent)[1 if endpoint == 0 else -2]
                                size = math.dist(at, away)
                                if abs(dx*(away[1]-at[1])-dy*(away[0]-at[0]))/size > 1e-6:
                                    valid = False
                                if endpoint == first_end and parent is first and (away[0]-a[0])*dx+(away[1]-a[1])*dy > 0:
                                    valid = False
                                if parent is second and (away[0]-b[0])*dx+(away[1]-b[1])*dy < 0:
                                    valid = False
                            if not valid:
                                continue
                        else:
                            continue
                        error = math.dist(a, symbol['a'])+math.dist(b, symbol['b'])
                        choices.append((error, item))
        return choices

    matched, unresolved = [], []
    work_budget = 0
    for original, variants in candidates:
        choices = []
        for symbol in variants:
            if not .1 <= math.dist(symbol['a'], symbol['b'])*scale <= 8:
                continue
            for index, wall in enumerate(walls):
                work_budget += len(wall_points(wall))
                if work_budget > 4000000:
                    raise ValueError('Opening projection budget exceeded; select fewer layers')
                a, b = project(symbol['a'], wall), project(symbol['b'], wall)
                allowed = wall.get('thickness', default_thickness)/2+tolerance
                if max(a[0], b[0]) > allowed or abs(b[1]-a[1])*scale < .1:
                    continue
                outside = False
                for p, projection in ((symbol['a'], a), (symbol['b'], b)):
                    if min(projection[1], abs(wall_length(wall)-projection[1])) > 1e-7: continue
                    if 'arc' in wall:
                        angle = wall['arc']['start']+projection[1]/wall['arc']['radius']
                        tangent = (-math.sin(angle), math.cos(angle))
                    else:
                        path = wall_points(wall); v, w = (path[0], path[1]) if projection[1] < 1e-7 else (path[-2], path[-1])
                        distance = math.dist(v, w); tangent = ((w[0]-v[0])/distance, (w[1]-v[1])/distance)
                    beyond = sum((p[k]-projection[2][k])*tangent[k] for k in (0, 1))
                    outside = outside or (projection[1]<1e-7 and beyond < -tolerance) or (projection[1]>wall_length(wall)-1e-7 and beyond > tolerance)
                if outside: continue
                samples = wall_points(symbol) if 'path' in symbol else [symbol['a'], [(symbol['a'][k]+symbol['b'][k])/2 for k in (0, 1)], symbol['b']]
                if any(project(p, wall)[0] > allowed for p in samples[::max(1, len(samples)//8)]):
                    continue
                start, width = min(a[1], b[1]), abs(b[1]-a[1])
                if wall.get('arc', {}).get('sweep', 0) >= math.tau-1e-7 and width > wall_length(wall)/2:
                    start, width = max(a[1], b[1]), wall_length(wall)-width
                if width*scale <= 8:
                    choices.append((a[0]+b[0], index, start, width, symbol, None))
            for error, item in bridge(symbol):
                choices.append((error, None, 0, wall_length(item), symbol, item))
        if not choices:
            if original in swing_arcs:
                unresolved.append(dict(source=original['source'], reason='No unambiguous supporting wall for door swing'))
            continue
        choices.sort(key=lambda c: c[0])
        best = choices[0]
        if len(choices) > 1 and abs(choices[1][0]-best[0])*scale < .001:
            other = choices[1]
            same = best[1] == other[1] and best[1] is not None and abs(best[2]-other[2])*scale < .01 and abs(best[3]-other[3])*scale < .01
            if not same:
                unresolved.append(dict(source=original['source'], reason='Symbol matches more than one wall or gap'))
                continue
        matched.append(best)
    # Longer outlines suppress their contained glazing/frame strokes.
    openings = []
    def intervals(start, width, length):
        return [(start, min(length, start+width))]+([(0, start+width-length)] if start+width > length+1e-8 else [])
    for _, index, start, width, symbol, gap in sorted(matched, key=lambda c: (-c[3], c[4]['kind']=='opening', c[0])):
        if gap:
            index = next((i for i, w in enumerate(walls) if w.get('openingBridge') and
                          math.dist(w['a'], gap['a']) < tolerance and math.dist(w['b'], gap['b']) < tolerance), None)
            if index is None:
                index = len(walls); walls.append(gap)
        wall = walls[index]; span = intervals(start, width, wall_length(wall))
        overlap = [o for o in openings if o['wallIndex'] == index and any(min(b, d)-max(a, c) > tolerance
                   for a, b in span for c, d in intervals(o['start'], o['width'], wall_length(wall)))]
        if overlap:
            if any(all(any(a >= c-tolerance and b <= d+tolerance for c, d in intervals(o['start'], o['width'], wall_length(wall))) for a, b in span) for o in overlap):
                continue
            unresolved.append(dict(source=symbol['source'], reason='Overlapping opening outlines require review'))
            continue
        item = dict(kind=symbol['kind'], wallIndex=index, start=start, width=width,
                    a=point_at(wall, start), b=point_at(wall, start+width), source=symbol['source'])
        if start+width > wall_length(wall)+1e-7: item['wrap'] = True
        if 'path' in wall:
            count = max(2, math.ceil(width/wall_length(wall)*(len(wall['path'])-1)))
            item['path'] = [point_at(wall, start+width*i/count) for i in range(count+1)]
        openings.append(item)
    def source_keys(source):
        return {(source.get('handle'), source.get('segment'), repr(source.get('blockPath')))}.union(
            *(source_keys(s) for s in source.get('pairSources', [])))
    recognized = set().union(*(source_keys(o['source']) for o in openings))
    unresolved = [item for item in unresolved if not (item['reason'].startswith('No unambiguous') and source_keys(item['source']) <= recognized)]
    return openings, unresolved


def signed_area(points):
    origin = points[0]
    return sum((a[0]-origin[0])*(b[1]-origin[1])-(b[0]-origin[0])*(a[1]-origin[1])
               for a, b in zip(points, points[1:]+points[:1]))/2


def recognize_rooms(walls, scale):
    """Split intersections, walk bounded faces, and retain nested holes."""
    from ezdxf.math import Vec2, is_point_in_polygon_2d
    from ezdxf.math.triangulation import mapbox_earcut_2d
    segments = []
    for index, wall in enumerate(walls):
        points = wall_points(wall)
        for n, (a, b) in enumerate(zip(points, points[1:])):
            size = math.dist(a, b)
            if size*scale < .0001:
                continue
            allowance = wall.get('thickness', .12/scale)/2+.002/scale
            segments.append((a, b, index, allowance/size if n == 0 else 0,
                             allowance/size if n == len(points)-2 else 0))
    if len(segments) > 4000:
        return [], {'status':'budget_exceeded', 'segments':len(segments)}
    cuts = [{0., 1.} for _ in segments]; epsilon = .002/scale; intersections = 0
    def cross(a, b): return a[0]*b[1]-a[1]*b[0]
    for i, (a, b, _, before, after) in enumerate(segments):
        r = (b[0]-a[0], b[1]-a[1])
        for j in range(i+1, len(segments)):
            c, d, _, before2, after2 = segments[j]
            if max(a[0], b[0])+epsilon < min(c[0], d[0])-epsilon and not before and not after:
                continue
            s = (d[0]-c[0], d[1]-c[1]); q = (c[0]-a[0], c[1]-a[1]); denominator = cross(r, s)
            if abs(denominator) > 1e-10*math.hypot(*r)*math.hypot(*s):
                t, u = cross(q, s)/denominator, cross(q, r)/denominator
                if -before <= t <= 1+after and -before2 <= u <= 1+after2:
                    cuts[i].add(t); cuts[j].add(u)
                    intersections += 1
                    if intersections > 20000:
                        return [], {'status':'budget_exceeded', 'segments':len(segments)}
            elif abs(cross(q, r))/math.hypot(*r) <= epsilon:
                for p in (c, d):
                    t = ((p[0]-a[0])*r[0]+(p[1]-a[1])*r[1])/(r[0]**2+r[1]**2)
                    if 0 <= t <= 1: cuts[i].add(t)
                for p in (a, b):
                    t = ((p[0]-c[0])*s[0]+(p[1]-c[1])*s[1])/(s[0]**2+s[1]**2)
                    if 0 <= t <= 1: cuts[j].add(t)
    points, buckets, edges = [], {}, {}
    def vertex(p):
        key = (math.floor(p[0]/epsilon), math.floor(p[1]/epsilon))
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                for index in buckets.get((key[0]+dx, key[1]+dy), []):
                    if math.dist(points[index], p) <= epsilon: return index
        index = len(points); points.append(p); buckets.setdefault(key, []).append(index); return index
    for (a, b, wall, _, _), values in zip(segments, cuts):
        positions = [vertex([a[0]+t*(b[0]-a[0]), a[1]+t*(b[1]-a[1])]) for t in sorted(values)]
        for start, end in zip(positions, positions[1:]):
            if start != end: edges.setdefault(tuple(sorted((start, end))), set()).add(wall)
    adjacency = {i:set() for i in range(len(points))}
    for a, b in edges: adjacency[a].add(b); adjacency[b].add(a)
    dangling = [a for a in adjacency if len(adjacency[a]) == 1]
    while dangling:
        a = dangling.pop()
        if len(adjacency[a]) != 1: continue
        b = adjacency[a].pop(); adjacency[b].discard(a)
        if len(adjacency[b]) == 1: dangling.append(b)
    ordered = {a:sorted(neighbors, key=lambda b: math.atan2(points[b][1]-points[a][1], points[b][0]-points[a][0]))
               for a, neighbors in adjacency.items()}
    visited, loops = set(), {}
    for start in adjacency:
        for end in ordered[start]:
            if (start, end) in visited: continue
            walk = []; a, b = start, end
            while (a, b) not in visited:
                visited.add((a, b)); walk.append(a)
                options = ordered[b]; a, b = b, options[(options.index(a)-1) % len(options)]
            if (a, b) != (start, end): continue
            # A bridge between contours occurs twice in a face walk; separate its rings.
            stack = []; positions = {}
            for v in walk+[walk[0]]:
                if v in positions:
                    ring = stack[positions[v]:]
                    for old in ring: positions.pop(old, None)
                    stack = stack[:len(stack)-len(ring)]
                    polygon = [points[i] for i in ring]
                    if len(ring) >= 3 and signed_area(polygon)*scale**2 >= .1:
                        key = tuple(sorted(tuple(sorted(pair)) for pair in zip(ring, ring[1:]+ring[:1])))
                        boundary = sorted(set().union(*(edges[tuple(sorted(pair))] for pair in zip(ring, ring[1:]+ring[:1]))))
                        loops[key] = dict(polygon=polygon, boundaryWalls=boundary, area=signed_area(polygon))
                positions[v] = len(stack); stack.append(v)
    rooms = list(loops.values()); parents = {}
    for i, room in enumerate(rooms):
        choices = []
        for j, outer in enumerate(rooms):
            if outer['area'] <= room['area'] or i == j: continue
            contain = [is_point_in_polygon_2d(Vec2(p), Vec2.list(outer['polygon']), abs_tol=epsilon/10) for p in room['polygon']]
            if min(contain) >= 0 and max(contain) > 0: choices.append(j)
        if choices: parents[i] = min(choices, key=lambda j: rooms[j]['area'])
    gross_areas = [room['area'] for room in rooms]
    for i, room in enumerate(rooms):
        children = [rooms[j] for j, parent in parents.items() if parent == i]
        room['holes'] = [r['polygon'] for r in children]
        room['area'] = gross_areas[i]-sum(gross_areas[j] for j, parent in parents.items() if parent == i)
        room['boundaryWalls'] = sorted(set(room['boundaryWalls']).union(*(r['boundaryWalls'] for r in children)))
        triangles = mapbox_earcut_2d(room['polygon'], room['holes'])
        actual = sum(abs(signed_area([list(p) for p in tri])) for tri in triangles)
        if not triangles or abs(actual-room['area'])*scale**2 > max(.0001, room['area']*scale**2*1e-6):
            return [], {'status':'invalid_polygon', 'segments':len(segments)}
        triangle = max(triangles, key=lambda tri: abs(signed_area([list(p) for p in tri])))
        room['labelPoint'] = [sum(p[k] for p in triangle)/3 for k in (0, 1)]
        room['areaBasis'] = 'wall_centerlines'
    rooms.sort(key=lambda r: (min(p[1] for p in r['polygon']), min(p[0] for p in r['polygon'])))
    return rooms, {'status':'closed_faces' if rooms else 'no_closed_faces', 'segments':len(segments), 'rooms':len(rooms)}


def wall_ends(wall, objects):
    """Miter equal-thickness corners and butt T-junctions without overlapping top faces."""
    a,b=wall['a'],wall['b']
    length=math.dist(a,b)
    direction=((b[0]-a[0])/length,(b[1]-a[1])/length)
    normal=(-direction[1],direction[0])
    output=[]
    for endpoint,end_index in [(a,0),(b,1)]:
        base=0 if end_index==0 else length
        outward=direction if end_index==0 else (-direction[0],-direction[1])
        candidates=[]
        for other in objects:
            if other['type']!='wall' or other['id']==wall['id']:continue
            c,d=other['a'],other['b']
            other_length=math.dist(c,d)
            for at,away in [(c,d),(d,c)]:
                if math.dist(at,endpoint)<1e-6:
                    vector=((away[0]-at[0])/other_length,(away[1]-at[1])/other_length)
                    candidates.append((vector,other))
            along=((endpoint[0]-c[0])*(d[0]-c[0])+(endpoint[1]-c[1])*(d[1]-c[1]))/other_length
            perpendicular=abs((endpoint[0]-c[0])*(d[1]-c[1])-(endpoint[1]-c[1])*(d[0]-c[0]))/other_length
            cross=abs(outward[0]*(d[1]-c[1])/other_length-outward[1]*(d[0]-c[0])/other_length)
            if perpendicular<1e-6 and 1e-6<along<other_length-1e-6 and cross>1e-6:
                shift=other['thickness']/2/cross
                base += shift if end_index==0 else -shift
        ends=(base,base)
        if len(candidates)==1:
            vector,other=candidates[0]
            if abs(wall['thickness']-other['thickness'])<1e-6:
                bisector=(outward[0]+vector[0],outward[1]+vector[1])
                denom=direction[0]*bisector[1]-direction[1]*bisector[0]
                if abs(denom)>1e-6:
                    offsets=[]
                    for sign in [-1,1]:
                        q=(normal[0]*sign*wall['thickness']/2,normal[1]*sign*wall['thickness']/2)
                        along=-(q[0]*bisector[1]-q[1]*bisector[0])/denom
                        offsets.append(base+along)
                    ends=tuple(offsets)
        output.append(ends)
    return output
