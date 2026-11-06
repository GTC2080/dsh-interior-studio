# SPDX-License-Identifier: GPL-3.0-or-later
"""Read-only surface-contact screening for selected imported assemblies.

Run with the bundled Blender, --disable-autoexec and --python-exit-code 17.
No surface path is an unresolved connection, not proof of structural failure:
embedded parts, hidden fixings and attachments outside the selected model need
separate review. Never edits or saves the inspected blend.
"""
import argparse
import json
import math
import sys
from pathlib import Path

import bpy


sys.path.insert(0, str(Path(__file__).resolve().parents[3] / 'worker'))
from quality import surface_graph


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--blend', required=True)
    parser.add_argument('--scene', required=True)
    parser.add_argument('--keys', required=True, help='Comma separated stable scene keys; at most 32')
    parser.add_argument('--output', required=True)
    args = parser.parse_args(sys.argv[sys.argv.index('--') + 1:])
    blend, scene_path, output = (Path(path).resolve() for path in (args.blend, args.scene, args.output))
    if output in (blend, scene_path):
        raise ValueError('The report cannot overwrite an input file')
    scene = json.loads(scene_path.read_text())
    if scene.get('unit') != 'm':
        raise ValueError('Expected a saved metre-based studio scene')
    keys = args.keys.split(',')
    if not 1 <= len(keys) <= 32 or len(set(keys)) != len(keys):
        raise ValueError('Expected 1 to 32 distinct stable keys')
    bpy.ops.wm.open_mainfile(filepath=str(blend), load_ui=False, use_scripts=False)
    reports = []
    for key in keys:
        items = [item for item in scene['objects'] if item.get('origin', {}).get('key') == key]
        if len(items) != 1:
            raise ValueError('Missing or ambiguous scene key: ' + key)
        roots = [obj for obj in bpy.data.objects if obj.get('studio_id') == items[0]['id']]
        if len(roots) != 1:
            raise ValueError('Missing or ambiguous Blender stable ID: ' + key)
        meshes = [obj for obj in [roots[0], *roots[0].children_recursive] if obj.type == 'MESH']
        reports.append({'key': key, **surface_graph(meshes)})
    report = {'scope': 'selected assembly triangle surfaces; lowest surface is an inspection anchor, not ground',
              'limitations': ['No load, fastener, stability or full-scene support certification',
                              'Embedded parts and mounts outside the assembly require separate review',
                              'Finite surface samples can miss small coplanar contact regions',
                              'Surface intersections may be deliberate joints or unwanted penetration'],
              'assemblies': reports}
    output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'assemblies': len(reports), 'unresolved': [r['key'] for r in reports
                                                               if r['status'] == 'connection_unresolved']}))


if __name__ == '__main__':
    main()
