"""Blender regression checks for the on-demand mesh-contact skill helper."""
import importlib.util
import unittest
from pathlib import Path

import bpy

source = Path(__file__).resolve().parents[1] / 'skills/studio-space-review/scripts/mesh_contacts.py'
spec = importlib.util.spec_from_file_location('mesh_contacts', source)
helper = importlib.util.module_from_spec(spec)
spec.loader.exec_module(helper)


def box(position, dimensions):
    bpy.ops.mesh.primitive_cube_add(size=1, location=position)
    obj = bpy.context.object
    obj.scale = dimensions
    bpy.context.view_layer.update()
    return obj


class ContactChecks(unittest.TestCase):
    def setUp(self):
        bpy.ops.wm.read_factory_settings(use_empty=True)

    def test_board_gap_behind_connected_stand_is_not_hidden_by_whole_envelope(self):
        base = box((0, 0, .02), (.5, .3, .04))
        post = box((0, .05, .4), (.03, .03, .78))
        board = box((0, 0, .6), (.4, .02, .4))
        result = helper.surface_graph([base, post, board])
        self.assertEqual(result['status'], 'connection_unresolved')
        self.assertEqual(len(result['unresolvedBounds']), 1)

    def test_touching_support_and_board_have_a_surface_path(self):
        base = box((0, 0, .02), (.5, .3, .04))
        post = box((0, .025, .4), (.03, .03, .78))
        board = box((0, 0, .6), (.4, .02, .4))
        self.assertEqual(helper.surface_graph([base, post, board])['status'], 'surface_path_observed')

    def test_small_floating_detail_is_reported_without_images(self):
        planter = box((0, 0, .15), (.4, .3, .3))
        flower = box((0, 0, .325), (.05, .05, .012))
        result = helper.surface_graph([planter, flower])
        self.assertEqual(result['status'], 'connection_unresolved')
        self.assertAlmostEqual(result['unresolvedBounds'][0][0][2], .319, places=6)

    def test_gap_exceeding_the_fixed_tolerance_is_not_accepted(self):
        base = box((0, 0, .5), (1, 1, 1))
        top = box((0, 0, 1.502), (1, 1, 1))
        self.assertEqual(helper.surface_graph([base, top])['status'], 'connection_unresolved')

    def test_rotated_geometry_uses_world_vertices(self):
        stem = box((0, 0, .4), (.1, .1, .8))
        crown = box((0, 0, 1.0), (.4, .4, .02))
        crown.rotation_euler[0] = 1.5707963267948966
        bpy.context.view_layer.update()
        result = helper.surface_graph([stem, crown])
        self.assertEqual(result['status'], 'surface_path_observed')

    def test_containment_is_unresolved_rather_than_a_claim_of_missing_support(self):
        outer = box((0, 0, .5), (1, 1, 1))
        inner = box((0, 0, .5), (.2, .2, .2))
        self.assertEqual(helper.surface_graph([outer, inner])['status'], 'connection_unresolved')


if __name__ == '__main__':
    unittest.main(argv=['mesh-contacts'])
