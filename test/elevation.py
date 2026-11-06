"""Run with the bundled Blender; no images or project files are written."""
import importlib.util
import math
import unittest
from unittest.mock import patch
from pathlib import Path

import bpy

source = Path(__file__).resolve().parents[1] / 'worker/elevation.py'
spec = importlib.util.spec_from_file_location('elevation', source)
helper = importlib.util.module_from_spec(spec)
spec.loader.exec_module(helper)


class Elevations(unittest.TestCase):
    def setUp(self):
        bpy.ops.wm.read_factory_settings(use_empty=True)
        self.scene = {'unit': 'm', 'objects': []}

    def box(self, key, position, size, parent_key=None):
        bpy.ops.mesh.primitive_cube_add(size=1, location=position)
        obj = bpy.context.object
        obj.scale = size
        if parent_key is None:
            obj['studio_id'] = key
            self.scene['objects'].append({'id': key, 'type': 'model', 'label': key})
        else:
            obj.parent = next(o for o in bpy.data.objects if o.get('studio_id') == parent_key)
        bpy.context.view_layer.update()
        return obj

    def project(self, view='front'):
        return helper.project_elevation(bpy.context.scene, self.scene, view)

    def test_real_letter_outlines_replace_a_single_envelope(self):
        curve = bpy.data.curves.new('type', 'FONT')
        curve.body = 'CAD'
        curve.extrude = .01
        obj = bpy.data.objects.new('type', curve)
        bpy.context.scene.collection.objects.link(obj)
        obj.rotation_euler.x = math.pi / 2
        bpy.context.view_layer.objects.active = obj
        obj.select_set(True)
        bpy.ops.object.convert(target='MESH')
        obj['studio_id'] = 'type'
        self.scene['objects'].append({'id': 'type', 'type': 'model', 'label': 'CAD letters'})
        before = len(obj.data.vertices)
        result = self.project()
        self.assertGreater(result['lines'], 30)
        self.assertEqual(len(obj.data.vertices), before)

    def test_opaque_front_hides_rear_detail(self):
        self.box('front', (0, 0, 1), (2, .1, 2))
        self.box('rear', (0, 1, 1), (.5, .1, .5))
        result = self.project()
        rear = next(group for group in result['groups'] if group['id'] == 'rear')
        self.assertEqual(rear['lines'], [])

    def test_an_open_frame_does_not_occlude_the_rear_object_like_its_envelope(self):
        self.box('left', (-1, 0, 1), (.1, .1, 2))
        self.box('right', (1, 0, 1), (.1, .1, 2))
        self.box('top', (0, 0, 2), (2, .1, .1))
        self.box('rear', (0, 1, 1), (.5, .1, .5))
        result = self.project()
        rear = next(group for group in result['groups'] if group['id'] == 'rear')
        self.assertGreaterEqual(len(rear['lines']), 4)

    def test_rotations_and_reverse_axes_use_saved_world_geometry(self):
        obj = self.box('part', (3, 2, 1), (2, .2, 1))
        obj.rotation_euler.z = math.pi / 2
        front, back = self.project(), self.project('back')
        self.assertAlmostEqual(front['extents'][2] - front['extents'][0], .2, places=5)
        self.assertAlmostEqual(back['extents'][0], -front['extents'][2], places=5)
        with self.assertRaises(ValueError):
            self.project('plan')

    def test_glyph_compaction_keeps_holes_junctions_extrema_and_error_bound(self):
        lines = []
        for radius in (.003, .00125):
            ring = [(round(radius*math.cos(i*math.tau/360), 6),
                     round(radius*math.sin(i*math.tau/360), 6)) for i in range(360)]
            lines.extend([*a, *b] for a, b in zip(ring, ring[1:]+ring[:1]))
        lines.append([.003, 0, .004, 0])
        reduced = helper.compact_text_lines(lines)
        self.assertLess(len(reduced), len(lines)/2)
        self.assertIn([.003, 0, .004, 0], reduced)
        points = [tuple(p) for line in reduced for p in (line[:2], line[2:])]
        for axis in (0, 1):
            source = [p[axis] for line in lines for p in (line[:2], line[2:])]
            self.assertEqual(min(source), min(p[axis] for p in points))
            self.assertEqual(max(source), max(p[axis] for p in points))

        def distance(p, line):
            ax, ay, bx, by = line
            dx, dy = bx-ax, by-ay
            t = max(0, min(1, ((p[0]-ax)*dx+(p[1]-ay)*dy)/(dx*dx+dy*dy)))
            return math.hypot(p[0]-ax-t*dx, p[1]-ay-t*dy)

        for line in lines:
            for point in (line[:2], line[2:]):
                self.assertLessEqual(min(distance(point, target) for target in reduced),
                                     helper.TEXT_CHORD_TOLERANCE+1e-12)
        # Both independent letter contours remain; no chord bridges the hole.
        for line in reduced:
            radius = math.hypot((line[0]+line[2])/2, (line[1]+line[3])/2)
            self.assertTrue(abs(radius-.003)<.00002 or abs(radius-.00125)<.00002 or line==[.003,0,.004,0])

    def test_compaction_never_bridges_separate_visible_fragments(self):
        lines = [[0, 0, .1, 0], [.100001, 0, .2, 0]]
        self.assertEqual(helper.compact_text_lines(lines), lines)
        self.box('part', (0, 0, 1), (1, .1, 1))
        with patch.object(helper, 'MAX_LINES', 3), self.assertRaisesRegex(ValueError, 'line budget'):
            self.project()
        with patch.object(helper, 'MAX_CANDIDATE_LINES', 3), self.assertRaisesRegex(ValueError, 'line budget'):
            self.project()

    def test_dense_curved_letters_fit_the_existing_budget_without_changing_meshes(self):
        curve = bpy.data.curves.new('dense-type', 'FONT')
        curve.body, curve.size, curve.extrude, curve.resolution_u = 'O'*24, .08, .002, 128
        obj = bpy.data.objects.new('dense-type', curve)
        bpy.context.scene.collection.objects.link(obj)
        obj.rotation_euler.x = math.pi/2
        obj.select_set(True)
        bpy.context.view_layer.objects.active = obj
        bpy.ops.object.convert(target='MESH')
        obj['studio_id'] = 'letters'
        self.scene['objects'].append({'id': 'letters', 'type': 'solid', 'shape': 'text', 'label': 'Dense glyph contours'})
        before = [tuple(v.co) for v in obj.data.vertices]
        with patch.object(helper, 'compact_text_lines', side_effect=lambda lines: lines):
            with self.assertRaisesRegex(ValueError, 'line budget'):
                self.project()
        result = self.project()
        self.assertGreater(result['lines'], 100)
        self.assertLessEqual(result['lines'], helper.MAX_LINES)
        self.assertEqual([tuple(v.co) for v in obj.data.vertices], before)


if __name__ == '__main__':
    unittest.main(argv=['elevation'])
