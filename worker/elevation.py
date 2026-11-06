# SPDX-License-Identifier: GPL-3.0-or-later
"""Bounded vector elevations from actual meshes, without saving or rendering.

Feature vertices retain metre coordinates. Visibility is sampled at <=5mm
along edges and transitions are refined; it is not exact B-rep hidden-line CAD.
Image finishes are not traced into invented construction geometry.
"""
import math

import bmesh
from mathutils import Vector
from mathutils.bvhtree import BVHTree

AXES = {
    'front': (0, 1, -1), 'back': (0, 1, 1),
    'left': (1, 0, -1), 'right': (1, 0, 1),
    'section_x': (1, 0, -1), 'section_y': (0, 1, -1),
}
STEP = .005
MAX_RAYS = 3000000
MAX_LINES = 20000
MAX_CANDIDATE_LINES = 100000
TEXT_CHORD_TOLERANCE = .000005


def compact_text_lines(lines, tolerance=TEXT_CHORD_TOLERANCE):
    """Coalesce glyph polylines within 5 micrometres, retaining holes and junctions.

    Only the drawing copy is reduced; the saved/rendered meshes are unchanged.
    Runs never cross a gap, a branching vertex, or an XY extremum.
    """
    edges = list(dict.fromkeys(tuple(sorted((tuple(p[:2]), tuple(p[2:])))) for p in lines))
    adjacent = {}
    for index, edge in enumerate(edges):
        for point in edge:
            adjacent.setdefault(point, []).append(index)
    used, paths = set(), []

    def trace(start, index):
        points, at = [start], start
        while index not in used:
            used.add(index)
            a, b = edges[index]
            at = b if at == a else a
            points.append(at)
            if len(adjacent[at]) != 2:
                break
            remaining = [i for i in adjacent[at] if i not in used]
            if not remaining:
                break
            index = remaining[0]
        return points

    for point, indices in adjacent.items():
        if len(indices) != 2:
            for index in indices:
                if index not in used:
                    paths.append(trace(point, index))
    for index, edge in enumerate(edges):
        if index not in used:
            paths.append(trace(edge[0], index))

    def distance_squared(p, a, b):
        dx, dy = b[0]-a[0], b[1]-a[1]
        length = dx*dx+dy*dy
        t = max(0, min(1, ((p[0]-a[0])*dx+(p[1]-a[1])*dy)/length)) if length else 0
        return (p[0]-a[0]-t*dx)**2+(p[1]-a[1]-t*dy)**2

    result = []
    for points in paths:
        anchors = {0, len(points)-1}
        for axis in (0, 1):
            anchors.add(min(range(len(points)), key=lambda i: points[i][axis]))
            anchors.add(max(range(len(points)), key=lambda i: points[i][axis]))
        keep = set(anchors)
        ordered = sorted(anchors)
        pending = list(zip(ordered, ordered[1:]))
        while pending:
            start, end = pending.pop()
            if end-start <= 1:
                continue
            index = max(range(start+1, end), key=lambda i: distance_squared(points[i], points[start], points[end]))
            if distance_squared(points[index], points[start], points[end]) > tolerance*tolerance:
                keep.add(index)
                pending.extend(((start, index), (index, end)))
        reduced = [points[i] for i in sorted(keep)]
        result.extend([*a, *b] for a, b in zip(reduced, reduced[1:]) if a != b)
    return result


def project_elevation(root, scene, view, cut_at=None):
    if view not in AXES:
        raise ValueError('Unknown elevation or section')
    horizontal, depth_axis, direction = AXES[view]
    horizontal_sign = -1 if view in ('back', 'left') else 1
    section = view.startswith('section_')
    if section:
        cut_at = scene['bounds'][depth_axis]/2 if cut_at is None else cut_at
        if not isinstance(cut_at,(int,float)) or not math.isfinite(cut_at) or not 0 < cut_at < scene['bounds'][depth_axis]:
            raise ValueError('Section plane must lie inside the site bounds')
    eye = Vector((0, 0, 0))
    eye[depth_axis] = direction
    items = {item['id']: item for item in scene['objects']}
    groups, vertices, faces = {}, [], []
    for layer in root.view_layers:
        layer.update()

    def projection(point):
        return [point[horizontal] * horizontal_sign, point.z]

    for obj in root.objects:
        if obj.type != 'MESH' or obj.get('studio_presentation'):
            continue
        owner = obj
        while owner and owner.get('studio_id') not in items:
            owner = owner.parent
        if owner is None:
            continue
        item = items[owner['studio_id']]
        if item['type'] == 'floor':
            # The plan floor's arbitrary display thickness is not a site elevation.
            continue
        group = groups.setdefault(item['id'], {'item': item, 'points': [], 'edges': []})
        bm = bmesh.new()
        try:
            bm.from_mesh(obj.data)
            bmesh.ops.transform(bm, matrix=obj.matrix_world, verts=list(bm.verts))
            bmesh.ops.remove_doubles(bm, verts=list(bm.verts), dist=.000001)
            if section:
                plane_co=Vector((0,0,0));plane_co[depth_axis]=cut_at
                plane_no=Vector((0,0,0));plane_no[depth_axis]=-1
                bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),dist=.000001,
                                      plane_co=plane_co,plane_no=plane_no,clear_outer=True,clear_inner=False)
                if not bm.verts:
                    continue
            bm.normal_update()
            bm.verts.ensure_lookup_table()
            bm.verts.index_update()
            points = [vertex.co.copy() for vertex in bm.verts]
            if any(not math.isfinite(n) for point in points for n in point):
                raise ValueError('Elevation mesh contains a non-finite vertex')
            offset = len(vertices)
            vertices.extend(points)
            group['points'].extend(points)
            faces.extend(tuple(vertex.index + offset for vertex in face.verts) for face in bm.faces)
            if len(vertices) > 1000000 or len(faces) > 1000000:
                raise ValueError('Elevation mesh budget exceeded; split the design')
            for edge in bm.edges:
                adjacent = list(edge.link_faces)
                feature = len(adjacent) != 2
                if not feature:
                    first, second = adjacent
                    dots = [face.normal.dot(eye) for face in adjacent]
                    feature = first.normal.dot(second.normal) < math.cos(math.radians(25))
                    feature = feature or dots[0] * dots[1] < -1e-10
                    feature = feature or (abs(dots[0]) < 1e-8) != (abs(dots[1]) < 1e-8)
                if feature:
                    coords=tuple(vertex.co.copy() for vertex in edge.verts)
                    is_cut=section and all(abs(p[depth_axis]-cut_at)<=.000002 for p in coords)
                    group['edges'].append((*coords,is_cut))
        finally:
            bm.free()
    if not faces:
        raise ValueError('No saved design meshes for elevation')
    tree = BVHTree.FromPolygons(vertices, faces)
    distance = math.sqrt(sum((max(p[i] for p in vertices) - min(p[i] for p in vertices)) ** 2
                             for i in range(3))) + 1
    rays = 0

    def visible(point):
        nonlocal rays
        rays += 1
        if rays > MAX_RAYS:
            raise ValueError('Elevation visibility budget exceeded; split the design')
        return tree.ray_cast(point + eye * .00001, eye, distance)[0] is None

    def transition(a, b, first):
        for _ in range(9):
            middle = (a + b) / 2
            if visible(middle) == first:
                a = middle
            else:
                b = middle
        return (a + b) / 2

    result, seen, count, candidates = [], set(), 0, 0
    for group in groups.values():
        lines,cut_lines = [],[]

        def emit(a, b, cut=False):
            nonlocal candidates
            a, b = ([round(n, 6) for n in projection(p)] for p in (a, b))
            if math.dist(a, b) < .00001:
                return
            key = tuple(sorted((tuple(a), tuple(b))))
            if key in seen:
                return
            seen.add(key)
            (cut_lines if cut else lines).append([*a, *b])
            candidates += 1
            if candidates > MAX_CANDIDATE_LINES:
                raise ValueError('Elevation line budget exceeded; simplify or split the design')

        for a, b, is_cut in group['edges']:
            length = math.dist(projection(a), projection(b))
            if length < .00001:
                continue
            steps = max(1, math.ceil(length / STEP))
            if steps > 40000:
                raise ValueError('Elevation edge exceeds the sampling budget')
            previous, state, start = a, visible(a), a
            for i in range(1, steps + 1):
                point = a.lerp(b, i / steps)
                next_state = visible(point)
                if next_state != state:
                    boundary = transition(previous, point, state)
                    if state:
                        emit(start, boundary,is_cut)
                    start = boundary
                state, previous = next_state, point
            if state:
                emit(start, b,is_cut)
        if group['item'].get('shape') == 'text':
            lines = compact_text_lines(lines)
            cut_lines = compact_text_lines(cut_lines)
        count += len(lines) + len(cut_lines)
        if count > MAX_LINES:
            raise ValueError('Elevation line budget exceeded; simplify or split the design')
        points, item = group['points'], group['item']
        if not points:
            continue
        projected = [projection(p) for p in points]
        box = [[min(p[i] for p in points) for i in range(3)],
               [max(p[i] for p in points) for i in range(3)]]
        result.append({'id': item['id'], 'key': item.get('origin', {}).get('key', item['id']),
                       'label': item['label'], 'type': item['type'], 'shape': item.get('shape'),
                       'assembly': item.get('assembly'), 'worldBounds': box,
                       'bounds': [min(p[0] for p in projected), min(p[1] for p in projected),
                                  max(p[0] for p in projected), max(p[1] for p in projected)],
                       'frontDepth': max(p[depth_axis] * direction for p in points), 'lines': lines,'cutLines':cut_lines})
    all_bounds = [group['bounds'] for group in result]
    extents = [min(b[0] for b in all_bounds), min(b[1] for b in all_bounds),
               max(b[2] for b in all_bounds), max(b[3] for b in all_bounds)]
    return {'view': view, 'groups': result, 'extents': extents,
            'basis': 'actual_mesh_feature_edges; sampled_orthographic_visibility',
            'visibilityStepMetres': STEP, 'vertexWeldMetres': .000001, 'rays': rays,
            'cutAt':cut_at if section else None,'cutAxis':'xy'[depth_axis] if section else None,
            'lines': count, 'imageFinishes': 'not_traced_into_geometry'}
