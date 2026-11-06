# SPDX-License-Identifier: GPL-3.0-or-later
"""Bounded checks on actual published meshes and render cameras."""
import math
import hashlib
import bpy
from mathutils import Vector, Euler
from mathutils.bvhtree import BVHTree


def surface_graph(meshes, tolerance=0.001, anchor_ids=None, target_ids=None, owners=None):
    vertices, faces, welded, vertex_owners = [], [], {}, []
    if sum(len(o.data.vertices) for o in meshes)>300000 or sum(len(o.data.polygons) for o in meshes)>200000:
        raise ValueError('Selected meshes exceed the contact geometry budget')
    for obj in meshes:
        obj.data.calc_loop_triangles()
        mapping = {}
        for vertex in obj.data.vertices:
            point = obj.matrix_world @ vertex.co
            key = tuple(round(value, 6) for value in point)
            if key not in welded:
                welded[key] = len(vertices)
                vertices.append(point)
                vertex_owners.append(set())
            vertex_owners[welded[key]].add((owners or {}).get(obj, obj.get('studio_id', obj.name)))
            mapping[vertex.index] = welded[key]
        faces.extend(tuple(mapping[i] for i in tri.vertices) for tri in obj.data.loop_triangles)
    if not faces or len(vertices) > 300000 or len(faces) > 200000:
        raise ValueError('Assembly has no triangles or exceeds the import geometry budget')
    parent = list(range(len(vertices)))

    def find(index):
        while parent[index] != index:
            parent[index] = parent[parent[index]]
            index = parent[index]
        return index

    for face in faces:
        for index in face[1:]:
            parent[find(index)] = find(face[0])
    groups = {}
    for face in faces:
        groups.setdefault(find(face[0]), []).append(face)
    if len(groups) > 8192:
        raise ValueError('Contact graph exceeds 8192 mesh islands; inspect smaller declared ranges')
    islands = []
    for triangles in groups.values():
        ids = sorted({i for face in triangles for i in face})
        bounds = [[min(vertices[i][axis] for i in ids) for axis in range(3)],
                  [max(vertices[i][axis] for i in ids) for axis in range(3)]]
        edges = {tuple(sorted((face[i], face[(i + 1) % 3]))) for face in triangles for i in range(3)}
        local = {index: i for i, index in enumerate(ids)}
        islands.append({'ids': ids, 'edges': edges, 'bounds': bounds, 'owners':set().union(*(vertex_owners[i] for i in ids)),
                        'bvh': BVHTree.FromPolygons([vertices[i] for i in ids], [tuple(local[i] for i in t) for t in triangles], all_triangles=True,
                                                   epsilon=tolerance / 2)})

    def samples(island):
        for index in island['ids']:
            yield vertices[index]
        # Coplanar crossing faces can touch without either face's vertices
        # lying inside the other. Edge midpoints cover that common case.
        for a, b in island['edges']:
            yield (vertices[a] + vertices[b]) / 2

    edges = [set() for _ in islands]
    # Sweep broad-phase candidates; glyph islands need not all compare with each other.
    active = []; pairs = queries = 0
    for i in sorted(range(len(islands)), key=lambda index: islands[index]['bounds'][0][0]):
        first = islands[i]
        active = [j for j in active if islands[j]['bounds'][1][0] + tolerance >= first['bounds'][0][0]]
        for j in active:
            second = islands[j]
            gap = math.sqrt(sum(max(0, first['bounds'][0][axis] - second['bounds'][1][axis],
                                    second['bounds'][0][axis] - first['bounds'][1][axis]) ** 2
                                for axis in range(3)))
            if gap > tolerance:
                continue
            pairs += 1
            if pairs > 65536:
                raise ValueError('Contact graph exceeds 65536 candidate pairs; inspect smaller declared ranges')
            touches = bool(first['bvh'].overlap(second['bvh']))
            if not touches:
                for source, target in ((first, second), (second, first)):
                    for point in samples(source):
                        queries += 1
                        if queries > 1000000:
                            raise ValueError('Contact graph exceeds 1000000 surface samples; inspect smaller declared ranges')
                        hit = target['bvh'].find_nearest(point)
                        if hit[0] is not None and hit[3] <= tolerance:
                            touches = True
                            break
                    if touches:
                        break
            if touches:
                edges[i].add(j)
                edges[j].add(i)
        active.append(i)
    base = min(island['bounds'][0][2] for island in islands)
    reached = {i for i, island in enumerate(islands) if (bool(island['owners'] & set(anchor_ids)) if anchor_ids is not None else island['bounds'][0][2] <= base + tolerance)}
    required = {i for i, island in enumerate(islands) if target_ids is None or island['owners'] & set(target_ids)}
    pending = list(reached)
    while pending:
        for index in edges[pending.pop()] - reached:
            reached.add(index)
            pending.append(index)
    return {'status': 'surface_path_observed' if required <= reached else 'connection_unresolved',
            'targetMeshIslands': len(required), 'connectedToAnchors': len(required & reached) if anchor_ids is not None else None,
            'unresolvedObjects': sorted(set().union(*(islands[i]['owners'] for i in required-reached))) if required-reached else [],
            'toleranceMetres': tolerance, 'baseZ': base, 'meshIslands': len(islands),
            'candidatePairs': pairs, 'surfaceSamples': queries,
            'connectedToLowestSurface': len(reached),
            'unresolvedBounds': [island['bounds'] for i, island in enumerate(islands) if i in required-reached],
            'unresolvedParts': [{'owners': sorted(island['owners']), 'bounds': island['bounds']}
                                for i, island in enumerate(islands) if i in required-reached]}


def scene_meshes(root):
    """Associate imported child meshes with their stable project root."""
    result = []
    for obj in root.objects:
        if obj.type != 'MESH' or obj.get('studio_presentation'):
            continue
        owner = obj
        while owner and not owner.get('studio_id'):
            owner = owner.parent
        if owner:
            result.append((obj, owner['studio_id']))
    return result


def scope_objects(scene, row):
    """Resolve persisted whole assemblies without borrowing mutable camera subjects."""
    scope = row.get('scope', 'keys')
    if scope == 'scene':
        return scene['objects'], [] if scene['objects'] else ['scene']
    if scope == 'assembly':
        objects = [o for o in scene['objects'] if o.get('assembly') == row.get('assembly')]
        return objects, [] if objects else [row.get('assembly')]
    if scope != 'keys':
        raise ValueError('Invalid acceptance scope')
    return scope_keys(scene, row.get('keys', []))


def scope_keys(scene, keys):
    if not isinstance(keys, list) or len(keys) > 500 or len(set(keys)) != len(keys):
        raise ValueError('Acceptance keys exceed their budget or repeat')
    result, missing = [], []
    for key in keys:
        found = [o for o in scene['objects'] if o['id'] == key or o.get('origin', {}).get('key') == key]
        if len(found) != 1:
            missing.append(key)
        else:
            result.append(found[0])
    if len({o['id'] for o in result}) != len(result):
        raise ValueError('Acceptance keys repeat one object through aliases')
    return result, missing


def review_support_ranges(scene, meshes, rows=None):
    """Trace target mesh islands through allowed assemblies to declared reference objects."""
    results = []
    if rows is None:
        rows = scene.get('design', {}).get('constraints', {}).get('supports', [])
    if not isinstance(rows, list) or len(rows) > 32:
        raise ValueError('Too many cross-assembly support ranges')
    for row in rows:
        record = dict(id=row['id'],source=row.get('source'),status='not_evaluated',scope='sampled mesh contact path to declared anchors; not fastening or load certification')
        try:
            targets, missing = scope_objects(scene, row)
            anchors, anchor_missing = scope_keys(scene, row.get('anchorKeys', []))
            via, via_missing = scope_keys(scene, row.get('viaKeys', []))
            for assembly in row.get('viaAssemblies', []):
                objects = [o for o in scene['objects'] if o.get('assembly') == assembly]
                if not objects:
                    via_missing.append(assembly)
                via.extend(objects)
            ids = {o['id'] for o in targets + anchors + via}
            record.update(resolvedIds=[o['id'] for o in targets],anchorIds=[o['id'] for o in anchors],viaIds=sorted({o['id'] for o in via}))
            missing += anchor_missing + via_missing + sorted(ids - {owner for _,owner in meshes})
            if missing or not targets or not anchors:
                record.update(status='fail',reason='missing_scope_objects_or_mesh',missing=missing)
            else:
                selected = [(o,owner) for o,owner in meshes if owner in ids]
                graph = surface_graph([o for o,_ in selected],anchor_ids=record['anchorIds'],
                                      target_ids=record['resolvedIds'],owners=dict(selected))
                by_id = {o['id']: o.get('origin', {}).get('key', o['id']) for o in scene['objects']}
                graph['unresolvedKeys'] = [by_id.get(identity, identity) for identity in graph['unresolvedObjects']]
                for part in graph['unresolvedParts']:
                    part['keys'] = [by_id.get(identity, identity) for identity in part['owners']]
                record.update(graph=graph,status='pass' if graph['status']=='surface_path_observed' else 'fail',
                              reason='surface_path_observed' if graph['status']=='surface_path_observed' else 'connection_to_anchor_unresolved')
        except ValueError as error:
            record.update(status='not_evaluated',reason=str(error))
        results.append(record)
    return results


def review_contact_points(scene, meshes, rows):
    by_key={item.get('origin',{}).get('key',item['id']):item['id'] for item in scene['objects']}
    trees={}
    def surfaces(key):
        owner=by_key.get(key,key)
        if owner not in trees:
            trees[owner]=[]
            for obj,identity in meshes:
                if identity!=owner:
                    continue
                obj.data.calc_loop_triangles()
                points=[obj.matrix_world@v.co for v in obj.data.vertices]
                triangles=[tuple(t.vertices) for t in obj.data.loop_triangles]
                if triangles:
                    trees[owner].append(BVHTree.FromPolygons(points,triangles,all_triangles=True))
        return trees[owner]
    contacts=[]
    for row in rows:
        point=Vector(row['point']);distances=[];normals=[]
        for key in (row['a'],row['b']):
            hits=[hit for tree in surfaces(key) if (hit:=tree.find_nearest(point))[0] is not None]
            hit=min(hits,key=lambda h:h[3]) if hits else None
            distances.append(hit[3] if hit else None);normals.append(hit[1].z if hit else None)
        tolerance=row.get('tolerance',.001)
        status='not_evaluated' if any(d is None for d in distances) else 'pass' if all(d<=tolerance for d in distances) else 'fail'
        if status=='pass' and row['kind']=='support' and not (normals[0]<-.5 and normals[1]>.5):
            status='not_evaluated'
        contacts.append(dict(id=row['id'],status=status,distancesMetres=distances,
                             scope='declared actual mesh surface point; normal screen for vertical support; no global penetration, fastener or load proof'))
    return contacts


def connection_review(root, scene):
    groups = {}
    meshes = scene_meshes(root)
    for item in scene['objects']:
        name = item.get('assembly') or (item.get('origin', {}).get('key', item['id']) if item['type'] == 'model' else None)
        if name:
            groups.setdefault(name, []).extend(obj for obj, owner in meshes if owner == item['id'])
    reports = []
    for name, objects in list(groups.items())[:32]:
        try:
            reports.append(dict(key=name, **surface_graph(objects)))
        except ValueError as error:
            reports.append(dict(key=name, status='not_evaluated', reason=str(error)))
    contacts=review_contact_points(scene,meshes,scene.get('design',{}).get('constraints',{}).get('relations',[]))
    duplicates=[];fingerprints={};triangle_budget=0
    for obj,owner in meshes:
        if not obj.get('studio_type') in ('solid','model') and not obj.parent:
            continue
        obj.data.calc_loop_triangles();triangle_budget+=len(obj.data.loop_triangles)
        if triangle_budget>1000000:
            break
        points=[tuple(round(n,6) for n in obj.matrix_world@v.co) for v in obj.data.vertices]
        triangles=sorted(tuple(sorted(points[i] for i in t.vertices)) for t in obj.data.loop_triangles)
        digest=hashlib.sha256(repr(triangles).encode()).digest()
        if digest in fingerprints:
            duplicates.append([fingerprints[digest],owner])
        else:
            fingerprints[digest]=owner
    declared_supports=review_support_ranges(scene,meshes)
    return dict(declaredSupports=declared_supports,coverage=dict(groupCount=len(groups),checkedGroups=len(reports),
                unassessedGroups=[r['key'] for r in reports if r['status']=='not_evaluated']+list(groups)[32:],
                requiredSupports=len(declared_supports),unassessedSupports=[r['id'] for r in declared_supports if r['status']=='not_evaluated']),
                scope='sampled actual mesh paths within declared assemblies, anchored at their lowest surface; not ground, fastening or load certification',
                groups=reports,declaredContacts=contacts,duplicateGeometry=duplicates[:32],
                duplicateScreenTruncated=triangle_budget>1000000 or len(duplicates)>32,truncated=len(groups) > 32)


def camera_review(root, scene, row=None):
    """Check solid containment and declared subject visibility; an absent subject is unassessed."""
    from bpy_extras.object_utils import world_to_camera_view
    camera = root.camera
    meshes = scene_meshes(root)
    if sum(len(obj.data.polygons) for obj, _ in meshes) > 1000000:
        return dict(status='not_evaluated', reason='camera mesh budget exceeded')
    automatic = row is None
    targets = sorted({owner for _,owner in meshes}) if automatic else row.get('subjects', [])
    items = {item.get('origin', {}).get('key', item['id']): item['id'] for item in scene['objects']}
    ids = {items.get(key, key) for key in targets}
    records = []
    surface_points = {}
    for obj, owner in meshes:
        points = [obj.matrix_world @ vertex.co for vertex in obj.data.vertices]
        if not points:
            continue
        obj.data.calc_loop_triangles()
        opaque = []
        for mat in obj.data.materials:
            shader = mat.node_tree.nodes.get('Principled BSDF') if mat and mat.use_nodes else None
            alpha = shader.inputs.get('Alpha') if shader else None
            transmission = shader.inputs.get('Transmission Weight') if shader else None
            opaque.append(not shader or (alpha and not alpha.is_linked and alpha.default_value >= .99 and
                                           transmission and not transmission.is_linked and transmission.default_value <= .01))
        triangles = [tuple(tri.vertices) for tri in obj.data.loop_triangles
                     if not opaque or opaque[min(obj.data.polygons[tri.polygon_index].material_index,len(opaque)-1)]]
        tree = BVHTree.FromPolygons(points, triangles, all_triangles=True) if triangles else None
        surface_points.setdefault(owner, []).extend(sum((points[i] for i in tri), Vector()) / 3
            for tri in triangles[::max(1, math.ceil(len(triangles)/64))])
        low = Vector(tuple(min(p[i] for p in points) for i in range(3)))
        high = Vector(tuple(max(p[i] for p in points) for i in range(3)))
        edge_counts = {}
        for poly in obj.data.polygons:
            for edge in poly.edge_keys:
                edge_counts[edge] = edge_counts.get(edge, 0) + 1
        records.append((owner, points, tree, low, high, len(triangles)==len(obj.data.loop_triangles) and bool(edge_counts) and all(n == 2 for n in edge_counts.values())))
    inside = []
    eye = camera.matrix_world.translation
    direction = Vector((.91731, .33117, .22019)).normalized()
    for owner, points, tree, low, high, closed in records:
        if not tree or not closed or not all(low[i] < eye[i] < high[i] for i in range(3)):
            continue
        cursor = eye.copy()
        crossings = 0
        while crossings < 2048:
            location, _, _, _ = tree.ray_cast(cursor, direction)
            if location is None:
                break
            cursor = location + direction * .000001
            crossings += 1
        if crossings % 2:
            inside.append(owner)
    missing = [key for key in targets if not any(owner == items.get(key, key) for owner, *_ in records)]
    selected = [(owner, points) for owner, points, *_ in records if owner in ids]
    projected = [world_to_camera_view(root, camera, p) for _, points in selected for p in points]
    bounds = ([min(p.x for p in projected), min(p.y for p in projected), max(p.x for p in projected), max(p.y for p in projected)] if projected else None)
    full = (row or {}).get('purpose', 'overview') == 'overview'
    fits = bool(projected) and all(p.z > camera.data.clip_start and .02 <= p.x <= .98 and .02 <= p.y <= .98 for p in projected)

    def visible(point, expected_owner=None):
        screen = world_to_camera_view(root,camera,point)
        if screen.z <= camera.data.clip_start or not 0 <= screen.x <= 1 or not 0 <= screen.y <= 1:
            return False
        delta = point - eye
        distance = delta.length
        if distance < .001:
            return False
        ray = delta / distance
        hits = [(hit[3], owner) for owner, _, tree, *_ in records if tree and (hit := tree.ray_cast(eye, ray, distance + .001))[0] is not None]
        if not hits:
            return False
        nearest = min(hit_distance for hit_distance,_ in hits)
        return abs(nearest-distance)<=.001 and any(owner in ids and (expected_owner is None or owner==expected_owner) and hit_distance<=nearest+.001 for hit_distance,owner in hits)

    samples = []
    per_subject = []
    for owner, points in selected:
        candidates = surface_points.get(owner) or points
        samples.extend(candidates[::max(1, math.ceil(len(candidates) / max(1, 256 // max(1, len(selected)))))])
    visible_ids = set((row or {}).get('visibilitySubjects', ids))
    for identity in visible_ids:
        subject_points=[p for owner,points in selected if owner==identity for p in points]
        candidates=surface_points.get(identity) or subject_points
        subject_samples=candidates[::max(1,math.ceil(len(candidates)/64))]
        per_subject.append(dict(id=identity,visibleSamples=sum(visible(p,identity) for p in subject_samples),sampledPoints=len(subject_samples)))
    visible_count = sum(visible(p) for p in samples)
    focus = [Vector(p) for p in (row or {}).get('focusPoints', [])]
    focus_visible = [visible(p) for p in focus]
    opaque_subject = any(owner in ids and tree for owner,_,tree,*_ in records)
    ratio = visible_count / len(samples) if samples and opaque_subject else None
    visibility_basis = 'subject triangle-center samples; vertices only when no opaque triangles exist'
    if not full and targets:
        aspect=root.render.resolution_x/root.render.resolution_y
        tangent=camera.data.sensor_width/(2*camera.data.lens)
        visible_count=0
        detail_hits={identity:0 for identity in ids}
        for x in (-.8,-.4,0,.4,.8):
            for y in (-.8,-.4,0,.4,.8):
                ray=(camera.matrix_world.to_3x3()@Vector((x*tangent,y*tangent/aspect,-1))).normalized()
                hits=[(hit[3],owner) for owner,_,tree,*_ in records if tree and (hit:=tree.ray_cast(eye,ray,camera.data.clip_end))[0] is not None]
                if hits:
                    nearest=min(distance for distance,_ in hits)
                    visible_owners={owner for distance,owner in hits if owner in ids and distance<=nearest+.001}
                    visible_count+=bool(visible_owners)
                    for owner in visible_owners:detail_hits[owner]+=1
        samples=[None]*25
        ratio=visible_count/25 if opaque_subject else None
        per_subject=[dict(id=row['id'],visibleSamples=row['visibleSamples']+detail_hits[row['id']],sampledPoints=row['sampledPoints']+25,
                          vertexVisibleSamples=row['visibleSamples'],imageRayVisibleSamples=detail_hits[row['id']]) for row in per_subject]
        visibility_basis='5 by 5 image-plane rays for a deliberately cropped detail'
    failures = []
    text_checks = []
    visible_counts = {item['id']: item['visibleSamples'] for item in per_subject}
    for item in scene['objects']:
        if item.get('shape') != 'text' or item['id'] not in visible_ids or not visible_counts.get(item['id']):
            continue
        normal = Vector({'xy': (0,0,1), 'xz': (0,-1,0), 'yz': (1,0,0)}[item['plane']])
        normal = Euler(item['rotationEuler'], 'XYZ').to_matrix() @ normal
        center = sum((point for owner,points in selected if owner==item['id'] for point in points), Vector())
        count = sum(len(points) for owner,points in selected if owner==item['id'])
        facing = normal.dot((eye-center/max(count,1)).normalized())
        text_checks.append(dict(id=item['id'],key=item.get('origin',{}).get('key'),facingDot=facing,status='pass' if facing>0 else 'fail'))
    if not automatic and any(item['status']=='fail' for item in text_checks):
        failures.append('required_text_reversed')
    if inside:
        failures.append('camera_inside_opaque_solid')
    if missing:
        failures.append('missing_subject')
    if projected and full and not fits:
        failures.append('subject_clipped_or_behind_camera')
    # Standard exterior projections legitimately hide back/internal faces.
    # Declared custom targets are checked individually so one visible object
    # cannot conceal a completely hidden required subject.
    if ratio is not None and visible_count==0:
        failures.append('subject_occluded')
    if not automatic and any(s['sampledPoints'] and not s['visibleSamples'] for s in per_subject):
        failures.append('required_subject_invisible')
    if focus and not all(focus_visible):
        failures.append('required_focus_occluded')
    return dict(status='fail' if failures else 'pass' if projected and opaque_subject else 'not_evaluated',
                subjectKeys=[] if automatic else targets,subjectCount=len(ids),automaticWholeScene=automatic, missingSubjects=missing, cameraInsideSolid=sorted(set(inside)),
                projectedBounds=bounds, completeSubjectWithMargin=fits if projected else None,
                subjectWidthFraction=bounds[2]-bounds[0] if bounds else None,
                visibleSamples=visible_count, sampledPoints=len(samples), visibleFraction=ratio,visibilityBasis=visibility_basis,
                focusVisible=focus_visible, perSubject=per_subject, textReading=text_checks, failures=failures,
                warnings=['low_sample_coverage_is_not_occlusion'] if ratio is not None and 0<ratio<.5 else [],
                scope='actual vertex projection and finite visibility samples; required focus points must lie on visible subject surfaces within 1mm; no subject means not evaluated; not an aesthetic verdict')


def camera_review_for_view(root, scene, view, camera=None):
    """Keep saved framing and required visibility independent of editable camera metadata."""
    result = camera_review(root, scene, camera)
    checks = []
    for row in scene.get('design', {}).get('constraints', {}).get('views', []):
        if row['view'] != view:
            continue
        objects, missing = scope_objects(scene, row)
        visible, missing_visible = scope_keys(scene, row.get('visibleKeys', []))
        ids = [o['id'] for o in objects]
        inspection = camera_review(root, scene, dict(subjects=ids,visibilitySubjects=[o['id'] for o in visible],
            purpose='overview' if row.get('framing', 'complete')=='complete' else 'detail',focusPoints=row.get('focusPoints', [])))
        if missing or missing_visible or not objects:
            inspection.update(status='fail',missingSubjects=missing+missing_visible,failures=['missing_fixed_scope'])
        checks.append(dict(**inspection,id=row['id'],source=row.get('source'),view=view,framing=row.get('framing','complete'),resolvedIds=ids))
    failures = list(result.get('failures', []))
    if any(r['status']=='fail' for r in checks):
        failures.append('fixed_view_requirement_failed')
    if any(r['status']=='not_evaluated' for r in checks):
        failures.append('fixed_view_requirement_unassessed')
    complete = [r.get('completeSubjectWithMargin') for r in checks if r['framing']=='complete']
    return dict(result,fixedChecks=checks,failures=failures,
                completeSubjectWithMargin=(all(complete) if all(v is not None for v in complete) else None) if complete else result.get('completeSubjectWithMargin'),
                status='fail' if failures else 'pass' if checks else result['status'])


def image_review(path):
    """Statistics name the original PNG resolution; black pixels are a clue, not a diagnosis."""
    import numpy as np
    image = bpy.data.images.load(str(path), check_existing=False)
    try:
        width, height = image.size
        values = np.empty(width * height * 4, dtype=np.float32)
        image.pixels.foreach_get(values)
        rgb = values.reshape((-1, 4))[:, :3]
        black = int(np.count_nonzero(np.all(rgb == 0, axis=1)))
        return dict(width=width, height=height, pixels=width*height, exactBlackPixels=black,
                    basis='original PNG decoded RGB; no resize; no unique geometry or lighting diagnosis',
                    warning='near_all_black' if black > width*height*.98 else None)
    finally:
        bpy.data.images.remove(image)


