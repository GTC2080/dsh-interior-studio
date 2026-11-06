"""Run with the bundled Python; public data never becomes executable instructions."""
import sys
sys.dont_write_bytecode = True
from pathlib import Path
import tempfile
import unittest
import hashlib

root = Path(__file__).resolve().parents[1]
sys.path[:0] = [str(root/'runtime/vendor'), str(root/'worker')]
import os
os.environ['EZDXF_DISABLE_C_EXT'] = '1'
import ezdxf
from cad import parse_file, paired_walls, metadata_repair
from cad_cases import create_cases


class CadTests(unittest.TestCase):
    def parse(self, file, options=None):
        return parse_file(file, dict(importId='test', fileHash=hashlib.sha256(file.read_bytes()).hexdigest(), options=options or {}))

    def test_public_wall_pairs_preserve_gaps_and_original_files(self):
        for name, count in [('floorplanner-L1.dxf', 11), ('floorplanner-L2.dxf', 10)]:
            file=root/'fixtures/public'/name
            before=file.read_bytes()
            report=self.parse(file, dict(wallMode='paired',unit='inch',wallLayers=['FP-WALLS'],maxWallThickness=.6))
            self.assertEqual(report['pairing']['wallSegments'],count)
            self.assertEqual(report['pairing']['unmatchedEdges'],0)
            self.assertFalse(report['blocking'])
            self.assertEqual(len(report['openings']),3)
            self.assertEqual(len(report['rooms']),2)
            self.assertAlmostEqual(sum(r['area'] for r in report['rooms'])*.0254**2,27.870912,places=5)
            self.assertEqual(file.read_bytes(),before)
            self.assertEqual({round(w['thickness']*.0254,4) for w in report['walls']},{.1143,.1524})
            if name.endswith('L1.dxf'):
                right=[w for w in report['walls'] if not w.get('openingBridge') and abs(w['a'][0]-240)<1e-6 and abs(w['b'][0]-240)<1e-6]
                self.assertTrue(all(not (min(w['a'][1],w['b'][1]) < -90 < max(w['a'][1],w['b'][1])) for w in right))

    def test_reference_curves_do_not_block_selected_straight_walls(self):
        with tempfile.TemporaryDirectory(prefix='dsh-cad-reference-') as directory:
            file=Path(directory)/'reference.dxf';doc=ezdxf.new();doc.layers.new('WALL');doc.layers.new('FURNITURE')
            doc.modelspace().add_line((0,0),(5,0),dxfattribs={'layer':'WALL'})
            doc.modelspace().add_circle((2,2),1,dxfattribs={'layer':'FURNITURE'});doc.saveas(file)
            report=self.parse(file);self.assertFalse(report['blocking']);self.assertEqual(len(report['walls']),1)
            self.assertGreater(len(report['references']),4)

    def test_classic_and_mirrored_polylines_use_world_coordinates(self):
        with tempfile.TemporaryDirectory(prefix='dsh-cad-ocs-') as directory:
            file=Path(directory)/'mirrored.dxf';doc=ezdxf.new();doc.layers.new('WALL')
            doc.modelspace().add_polyline2d([(0,0),(5,0)],dxfattribs={'layer':'WALL'})
            doc.modelspace().add_lwpolyline([(1,2),(4,2)],dxfattribs={'layer':'WALL','extrusion':(0,0,-1)})
            doc.saveas(file);report=self.parse(file)
            self.assertFalse(report['blocking']);self.assertEqual(len(report['walls']),2)
            self.assertEqual(report['extents'][0],-4)

    def test_invalid_mapping_and_pair_budget_fail_loudly(self):
        file=root/'fixtures/public/floorplanner-L1.dxf'
        with self.assertRaises(ValueError):self.parse(file,{'wallLayers':['missing']})
        with self.assertRaises(ValueError):self.parse(file,{'wallLayers':['FP-WALLS'],'doorLayers':['FP-WALLS']})
        with self.assertRaises(ValueError):paired_walls([None]*2001,1,.6)

    def test_complex_public_sample_distinguishes_metadata_repairs_and_partial_geometry(self):
        file=root/'fixtures/public/floorplan.dxf'
        if not file.is_file():
            self.skipTest('optional CAD fixture is not redistributed; see fixtures/public/sources.json')
        report=self.parse(file,{'wallLayers':['xref-Bishop-Overland-08$0$A-WALL'],'wallMode':'paired','unit':'inch'})
        self.assertFalse(report['blocking']);self.assertTrue(report['requiresPartialConfirmation'])
        self.assertEqual(report['repairs'],29);self.assertEqual(report['pairing']['wallSegments'],66)
        self.assertGreater(len(report['openings']),10)
        self.assertTrue(any(o['kind']=='opening' for o in report['openings']))

    def test_curved_room_door_swing_and_curved_window_keep_measured_geometry(self):
        import math
        with tempfile.TemporaryDirectory(prefix='dsh-cad-topology-') as directory:
            cases=create_cases(Path(directory));r=self.parse(cases['curved-room.dxf'])
            self.assertFalse(r['blocking']);self.assertFalse(r['unresolvedOpenings'])
            self.assertEqual(len(r['rooms']),2);self.assertEqual(len(r['openings']),3)
            self.assertEqual(sum('arc' in w for w in r['walls']),1)
            self.assertAlmostEqual(sum(p['area'] for p in r['rooms']),36+math.pi*4.5,delta=.01)
            window=next(o for o in r['openings'] if o['kind']=='window')
            self.assertAlmostEqual(window['width'],math.pi,places=6)
            self.assertNotIn('Untrusted drawing annotation',str(r))

    def test_concentric_arcs_and_symbol_supported_gaps_create_one_closed_room(self):
        import math
        with tempfile.TemporaryDirectory(prefix='dsh-cad-topology-') as directory:
            cases=create_cases(Path(directory));r=self.parse(cases['paired-curved-gap.dxf'],{'wallMode':'paired'})
            self.assertFalse(r['blocking']);self.assertFalse(r['unresolvedOpenings'])
            self.assertEqual(r['pairing']['unmatchedEdges'],0)
            self.assertEqual(len(r['openings']),2);self.assertEqual(len(r['rooms']),1)
            self.assertEqual(sum(w.get('openingBridge',False) for w in r['walls']),2)
            self.assertAlmostEqual(r['rooms'][0]['area'],36+math.pi*4.5,delta=.01)
            self.assertTrue(any('arc' in r['walls'][o['wallIndex']] for o in r['openings']))

    def test_concave_nested_and_open_contours_do_not_become_bounding_rectangles(self):
        with tempfile.TemporaryDirectory(prefix='dsh-cad-topology-') as directory:
            cases=create_cases(Path(directory))
            r=self.parse(cases['concave-room.dxf']);self.assertEqual(len(r['rooms']),1);self.assertAlmostEqual(r['rooms'][0]['area'],20)
            r=self.parse(cases['nested-courtyard.dxf']);self.assertEqual(sorted(p['area'] for p in r['rooms']),[6,74])
            self.assertEqual(sum(len(p['holes']) for p in r['rooms']),1)
            r=self.parse(cases['unexplained-gap.dxf']);self.assertEqual(r['rooms'],[]);self.assertEqual(r['openings'],[])

    def test_mirrored_bulge_and_ellipse_are_planar_curved_walls(self):
        import math
        with tempfile.TemporaryDirectory(prefix='dsh-cad-topology-') as directory:
            cases=create_cases(Path(directory))
            r=self.parse(cases['mirrored-bulge.dxf']);self.assertFalse(r['blocking']);self.assertEqual(len(r['rooms']),1)
            self.assertAlmostEqual(r['rooms'][0]['area'],36+4.5*math.pi,delta=.01)
            self.assertAlmostEqual(r['extents'][0],11,delta=.002)
            r=self.parse(cases['ellipse-room.dxf']);self.assertFalse(r['blocking']);self.assertEqual(len(r['rooms']),1)
            self.assertAlmostEqual(r['rooms'][0]['area'],4.5*math.pi,delta=.02)

    def test_shared_opening_layer_keeps_kind_unknown_for_user_review(self):
        with tempfile.TemporaryDirectory(prefix='dsh-cad-topology-') as directory:
            cases=create_cases(Path(directory));r=self.parse(cases['shared-opening-layer.dxf'])
            self.assertEqual(len(r['openings']),1);self.assertEqual(r['openings'][0]['kind'],'opening')

    def test_geometric_or_unclassified_audit_repairs_are_not_accepted_as_metadata(self):
        from ezdxf.audit import ErrorEntry
        self.assertTrue(metadata_repair(ErrorEntry(202,'Deleted IDBUFFER(#1F0B) entity with invalid owner handle #0.')))
        self.assertFalse(metadata_repair(ErrorEntry(202,'Deleted LINE(#1F0B) entity with invalid owner handle #0.')))
        self.assertFalse(metadata_repair(ErrorEntry(202,'unknown repair')))
        self.assertFalse(metadata_repair(ErrorEntry(203,'Deleted IDBUFFER(#1F0B) entity with invalid owner handle #0.')))


if __name__ == '__main__':
    unittest.main()
