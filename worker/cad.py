# SPDX-License-Identifier: GPL-3.0-or-later
"""Bounded DXF inventory with reviewable curves, openings and enclosed rooms."""
import math
import re
from collections import Counter
from itertools import islice
from topology import arc_points, paired_arcs, recognize_openings, recognize_rooms

UNITS = {'mm': .001, 'cm': .01, 'm': 1, 'inch': .0254, 'foot': .3048}


def metadata_repair(fix):
    """Recognize only ezdxf 1.4.5's non-graphical ownership repairs."""
    if int(fix.code) != 202:
        return False
    if fix.entity is not None:
        return fix.entity.dxftype() in {'DICTIONARY', 'DICTIONARYWDFLT', 'XRECORD', 'IDBUFFER'}
    # The OBJECTS auditor emits these repairs without an entity reference.
    return bool(re.fullmatch(r'Removed invalid key [^\r\n]+ in DICTIONARY\(#[0-9A-Fa-f]+\)\.', fix.message)
                or re.fullmatch(r'Deleted IDBUFFER\(#[0-9A-Fa-f]+\) entity with invalid owner handle #[0-9A-Fa-f]+\.', fix.message))


def paired_walls(lines, scale, maximum):
    """Pair nearest parallel face intervals; keep every unmatched interval visible."""
    if len(lines) > 2000:
        raise ValueError('Paired-wall analysis is limited to 2000 edges; select fewer layers')
    projected = []
    for line in lines:
        a, b = line['a'], line['b']
        length = math.dist(a, b)
        dx, dy = (b[0]-a[0])/length, (b[1]-a[1])/length
        if dx < -1e-9 or (abs(dx) <= 1e-9 and dy < 0):
            dx, dy = -dx, -dy
        nx, ny = -dy, dx
        along = sorted((a[0]*dx+a[1]*dy, b[0]*dx+b[1]*dy))
        projected.append((dx, dy, nx, ny, a[0]*nx+a[1]*ny, *along))
    candidates = []
    for i, first in enumerate(projected):
        dx, dy, nx, ny, across, start, end = first
        for j in range(i+1, len(lines)):
            other = projected[j]
            if abs(dx*other[1]-dy*other[0]) > 1e-7:
                continue
            gap = abs(across-other[4])
            lo, hi = max(start, other[5]), min(end, other[6])
            if .04/scale <= gap <= maximum/scale and hi-lo >= max(.04/scale, 1.5*gap):
                candidates.append((gap, i, j, lo, hi))
    used = [[] for _ in lines]
    walls = []
    for gap, i, j, lo, hi in sorted(candidates):
        intervals = [(lo, hi)]
        for start, end in sorted(used[i]+used[j]):
            intervals = [(a, b) for x, y in intervals for a, b in
                         [(x, min(y, start)), (max(x, end), y)] if b-a > 1e-8]
        dx, dy, nx, ny, across, _, _ = projected[i]
        middle = (across+projected[j][4])/2
        for start, end in intervals:
            if (end-start)*scale < .04:
                continue
            source = dict(lines[i]['source'], pairSources=[lines[i]['source'], lines[j]['source']])
            walls.append(dict(a=[dx*start+nx*middle, dy*start+ny*middle],
                              b=[dx*end+nx*middle, dy*end+ny*middle], thickness=gap, source=source))
            used[i].append((start, end))
            used[j].append((start, end))
    unmatched = sum(not segments or sum(b-a for a, b in segments) < projected[i][6]-projected[i][5]-1e-6
                    for i, segments in enumerate(used))
    return walls, unmatched


def parse_file(path, command):
    import ezdxf
    if path.suffix.lower() != '.dxf' or path.stat().st_size > 20*1024*1024:
        raise ValueError('Only DXF up to 20 MiB is supported')
    doc = ezdxf.readfile(path)
    audit = doc.audit()
    unit = {1:'inch', 2:'foot', 4:'mm', 5:'cm', 6:'m'}.get(doc.header.get('$INSUNITS', 0))
    layers = [layer.dxf.name for layer in doc.layers]
    options = command.get('options') or {}
    mode = options.get('wallMode', 'centerlines')
    if mode not in ('centerlines', 'paired'):
        raise ValueError('Unknown wall interpretation')
    chosen_unit = options.get('unit') or unit
    if chosen_unit is not None and chosen_unit not in UNITS:
        raise ValueError('Unknown drawing unit')
    scale = UNITS.get(chosen_unit, 1)
    settings = {'wallMode': mode, **({'unit':chosen_unit} if chosen_unit else {})}
    defaults = {'wallLayers':[n for n in layers if 'WALL' in n.upper() or '墙' in n],
                'doorLayers':[n for n in layers if 'DOOR' in n.upper() or '门' in n],
                'windowLayers':[n for n in layers if 'WINDOW' in n.upper() or 'GLAZ' in n.upper() or '窗' in n],
                'openingLayers':[n for n in layers if 'OPENING' in n.upper()]}
    for key, fallback in defaults.items():
        selected = options.get(key, fallback)
        if not isinstance(selected, list) or len(selected) > 1000 or any(n not in layers for n in selected):
            raise ValueError('Selected layer does not exist')
        settings[key] = list(dict.fromkeys(selected))
    wall_set, door_set, window_set, opening_set = (set(settings[k]) for k in defaults)
    selected_sets = [wall_set, door_set, window_set, opening_set]
    if any(a & b for i, a in enumerate(selected_sets) for b in selected_sets[i+1:]):
        raise ValueError('Wall and opening layer groups must be distinct')
    report = dict(id=command['importId'], fileHash=command['fileHash'], dxfVersion=doc.dxfversion,
                  parserVersion=ezdxf.__version__, unit=unit, walls=[], openings=[], references=[], entities=[],
                  blocking=[], warnings=[], layers=layers, settings=settings, layouts=list(doc.layout_names()),
                  repairs=len(audit.fixes), scope='modelspace', requiresPartialConfirmation=False,
                  topologyVersion=1, rooms=[], unresolvedOpenings=[],
                  support='Planar lines, polyline bulges and curves; paired straight/concentric faces; reviewed openings and closed rooms')
    benign = [fix for fix in audit.fixes if metadata_repair(fix)]
    if audit.errors or len(benign) != len(audit.fixes):
        report['blocking'].append('DXF audit found structural errors or repairs; source was not modified')
    elif benign:
        report['warnings'].append('Non-geometric dictionary ownership repaired in memory; original bytes unchanged')
    seen, raw, wall_edges, wall_curves, symbols = set(), [], [], [], []
    segment_count = 0

    def entity(e, chain, depth=0, inherited_layer=None, original_source=None):
        nonlocal segment_count
        if depth > 8 or len(report['entities']) >= 20000:
            raise ValueError('DXF nesting or 20000-entity budget exceeded; split the drawing')
        kind = e.dxftype()
        layer = e.dxf.get('layer', '0')
        if layer == '0' and inherited_layer:
            layer = inherited_layer
        source = dict(fileHash=command['fileHash'], layout='Model', handle=e.dxf.get('handle') or 'virtual',
                      blockPath=chain, layer=layer)
        if original_source:
            source = original_source
        record = dict(source=source, type=kind, disposition='reference')
        report['entities'].append(record)
        structural = layer in wall_set
        opening = 'door' if layer in door_set else 'window' if layer in window_set else 'opening' if layer in opening_set else None
        if kind == 'INSERT':
            block = doc.blocks.get(e.dxf.name)
            if block.block.dxf.flags & 4:
                record['disposition'] = 'unsupported'
                report['blocking'].append('External reference requires explicit dependency handling: '+e.dxf.name)
                return
            failed = []
            instances = e.multi_insert() if e.mcount > 1 else [e]
            for n, instance in enumerate(instances):
                next_chain = chain+[dict(name=e.dxf.name, handle=e.dxf.get('handle'), instance=n,
                                         matrix=list(instance.matrix44()))]
                for child in instance.virtual_entities(skipped_entity_callback=lambda item, reason: failed.append(reason)):
                    entity(child, next_chain, depth+1, layer)
            record['disposition'] = 'expanded'
            if failed:
                (report['blocking'] if structural or layer == '0' else report['warnings']).append(
                    'Block contains untransformed entities: '+'; '.join(failed[:5]))
            return
        points = []
        curve = None
        unsupported = None
        if kind == 'LINE':
            a, b = e.dxf.start, e.dxf.end
            points = [([a.x, a.y], [b.x, b.y])]
            if abs(a.z) > 1e-6 or abs(b.z) > 1e-6:
                unsupported = 'Non-planar LINE'
        elif kind in ('LWPOLYLINE', 'POLYLINE'):
            if kind == 'POLYLINE' and not e.is_2d_polyline:
                unsupported = 'Non-planar polyline'
            else:
                record['disposition'] = 'expanded'
                for i, child in enumerate(e.virtual_entities()):
                    entity(child, chain, depth+1, layer, dict(source, segment=i))
                return
        elif kind in ('TEXT', 'MTEXT', 'DIMENSION', 'HATCH'):
            record['note'] = 'Reference only; never instructions or dimension truth'
            if kind == 'HATCH' and structural:
                report['requiresPartialConfirmation'] = True
                report['warnings'].append('Wall hatches are reference only; only selected wall lines are reconstructed')
            return
        elif kind in ('ARC', 'CIRCLE'):
            center = e.ocs().to_wcs(e.dxf.center)
            radius = abs(e.dxf.radius)
            if radius <= 1e-9 or not math.isfinite(radius):
                unsupported = 'Invalid curve radius'
            elif abs(center.z) > 1e-6 or abs(abs(e.dxf.extrusion.z)-1) > 1e-8 or abs(e.dxf.extrusion.x)+abs(e.dxf.extrusion.y)>1e-8:
                unsupported = 'Non-planar circular curve'
            else:
                start = e.start_point if kind == 'ARC' else next(e.vertices([0]))
                angle = math.atan2(start.y-center.y, start.x-center.x)
                sweep = math.radians((e.dxf.end_angle-e.dxf.start_angle) % 360) if kind == 'ARC' else math.tau
                if sweep < 1e-10: sweep = math.tau
                if e.dxf.extrusion.z < 0: angle -= sweep
                arc = dict(center=[center.x, center.y], radius=radius, start=angle % math.tau, sweep=sweep)
                path = arc_points(arc, scale)
                curve = dict(a=path[0], b=path[-1], path=path, arc=arc, source=source)
                points = list(zip(path, path[1:]))
        elif kind in ('ELLIPSE', 'SPLINE'):
            from ezdxf.path import make_path
            path = make_path(e)
            controls = list(islice(path.control_vertices(), 20001))
            if len(controls) > 20000:
                raise ValueError('Curve control-point budget exceeded')
            span = max((max(p[i] for p in controls)-min(p[i] for p in controls) for i in (0, 1)), default=0)
            vertices = list(islice(path.flattening(max(.001/scale, span*1e-5)), 2049))
            if len(vertices) > 2048:
                raise ValueError('Curve exceeds the 2048-point budget')
            if any(abs(p.z) > 1e-6 for p in vertices):
                unsupported = 'Non-planar curve'
            elif len(vertices) > 1:
                path = [[p.x, p.y] for p in vertices]
                curve = dict(a=path[0], b=path[-1], path=path, source=source)
                points = list(zip(path, path[1:]))
        else:
            unsupported = kind+' is reference-only'
        if unsupported:
            record['disposition'] = 'unsupported'
            if structural:
                report['blocking'].append(unsupported+': '+str(source['handle']))
            else:
                report['warnings'].append(kind+' retained as reference, not modelled')
            return
        segment_count += len(points)
        if segment_count > 25000:
            raise ValueError('DXF exceeds the 25000-segment geometry budget')
        if curve and structural:
            for a, b in points:
                if not all(math.isfinite(v) and abs(v) < 1e12 for v in a+b):
                    raise ValueError('Invalid DXF coordinates')
            key = tuple(tuple(round(v, 8) for v in p) for p in curve['path'])
            if key in seen:
                record['disposition'] = 'excluded_duplicate'
                return
            seen.add(key); wall_curves.append(curve); raw.extend(curve['path'])
            record['disposition'] = 'wall_candidate'
            return
        if curve and opening:
            symbols.append(dict(curve, kind=opening))
            record['disposition'] = 'opening_symbol'
        for i, (a, b) in enumerate(points):
            if not all(math.isfinite(v) and abs(v) < 1e12 for v in a+b):
                raise ValueError('Invalid DXF coordinates')
            if math.dist(a, b) <= 1e-9:
                record['disposition'] = 'excluded'
                report['warnings'].append('Zero-length entity excluded')
                continue
            entry = dict(a=a, b=b, source=dict(source, segment=i))
            if structural:
                key = tuple(sorted((tuple(a), tuple(b))))
                if key in seen:
                    record['disposition'] = 'excluded_duplicate'
                    report['warnings'].append('Exact duplicate wall edge excluded')
                    continue
                seen.add(key)
                wall_edges.append(entry)
                record['disposition'] = 'wall_candidate'
                raw.extend([a, b])
            else:
                if len(report['references']) < 10000:
                    report['references'].append(dict(a=a, b=b, layer=layer))
                else:
                    if not report.get('referencePreviewTruncated'):
                        report['referencePreviewTruncated'] = True
                        report['warnings'].append('Reference preview is limited to 10000 segments; entity inventory is retained')
                if opening and not curve:
                    symbols.append(dict(entry, kind=opening))
                    record['disposition'] = 'opening_symbol'

    for e in doc.modelspace():
        entity(e, [])
    report['walls'] = wall_edges+wall_curves
    if mode == 'paired':
        maximum = options.get('maxWallThickness', .6)
        if chosen_unit not in UNITS or not isinstance(maximum, (int, float)) or not math.isfinite(maximum) or not .04 <= maximum <= .8:
            report['walls'] = []
            report['blocking'].append('Choose a unit and maximum wall thickness before pairing wall edges')
        else:
            settings.update(unit=chosen_unit, maxWallThickness=maximum)
            report['walls'], unmatched = paired_walls(wall_edges, UNITS[chosen_unit], maximum)
            arcs = [c for c in wall_curves if 'arc' in c]
            curved_walls, curved_unmatched = paired_arcs(arcs, scale, maximum)
            report['walls'].extend(curved_walls)
            unmatched += curved_unmatched+len(wall_curves)-len(arcs)
            report['pairing'] = dict(inputEdges=len(wall_edges)+len(wall_curves), wallSegments=len(report['walls']), unmatchedEdges=unmatched)
            report['requiresPartialConfirmation'] = report['requiresPartialConfirmation'] or unmatched > 0
            if unmatched:
                report['warnings'].append(f'{unmatched} selected wall edges are not fully paired; partial reconstruction requires confirmation')
    if report['walls']:
        report['openings'], report['unresolvedOpenings'] = recognize_openings(report['walls'], symbols, scale, .12/scale)
        if report['unresolvedOpenings']:
            report['warnings'].append(f"{len(report['unresolvedOpenings'])} opening symbols require review; uncertain geometry remains reference-only")
            report['requiresPartialConfirmation'] = True
        report['rooms'], report['topology'] = recognize_rooms(report['walls'], scale)
        if report['topology']['status'] in ('budget_exceeded', 'invalid_polygon'):
            report['requiresPartialConfirmation'] = True
            report['warnings'].append('Room topology could not be safely resolved; no automatic floor will be generated')
        elif not report['rooms']:
            report['warnings'].append('No closed room contour; open gaps are not automatically filled with a rectangular floor')
        report['warnings'].append('Opening heights require user confirmation; room areas are measured to wall centerlines, not finished net areas')
    report['paperSpaceEntitiesExcluded'] = sum(len(layout) for layout in doc.layouts if layout.name != 'Model')
    if raw:
        report['extents'] = [min(p[0] for p in raw), min(p[1] for p in raw), max(p[0] for p in raw), max(p[1] for p in raw)]
    elif report['references']:
        points = [p for line in report['references'] for p in (line['a'], line['b'])]
        report['extents'] = [min(p[0] for p in points), min(p[1] for p in points), max(p[0] for p in points), max(p[1] for p in points)]
    else:
        report['extents'] = [0, 0, 0, 0]
    report['origin'] = report['extents'][:2]
    if not report['walls']:
        report['blocking'].append('No supported walls found; review layer selection and wall interpretation')
    report['counts'] = dict(Counter(e['disposition'] for e in report['entities']))
    layer_counts = Counter(e['source']['layer'] for e in report['entities'])
    report['layerInfo'] = [dict(name=n, entities=layer_counts[n]) for n in layers]
    report['warnings'] = list(dict.fromkeys(report['warnings']))
    report['blocking'] = list(dict.fromkeys(report['blocking']))
    return report
