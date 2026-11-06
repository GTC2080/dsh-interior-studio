"""Actual Blender geometry checks, without retaining screenshots or render caches."""
import sys
import unittest
import tempfile
from pathlib import Path
import bpy
from mathutils import Vector

sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'worker'))
from quality import camera_review,camera_review_for_view,image_review,connection_review
from elevation import project_elevation


def box(key,location,size):
    bpy.ops.mesh.primitive_cube_add(size=1,location=location)
    obj=bpy.context.object;obj.scale=size;obj['studio_id']=key
    bpy.context.view_layer.update()
    return dict(id=key,type='solid',label=key,origin={'key':key})


class QualityChecks(unittest.TestCase):
    def setUp(self):
        bpy.ops.wm.read_factory_settings(use_empty=True)
        self.root=bpy.context.scene
        camera=bpy.data.objects.new('Camera',bpy.data.cameras.new('Camera'));self.root.collection.objects.link(camera);self.root.camera=camera
        self.root.render.resolution_x=1920;self.root.render.resolution_y=1080
        self.scene=dict(objects=[],bounds=[6,6])

    def aim(self,position,target,lens=35):
        c=self.root.camera;c.location=position;c.data.lens=lens;c.data.clip_start=.01
        c.rotation_euler=(Vector(target)-c.location).to_track_quat('-Z','Y').to_euler();bpy.context.view_layer.update()

    def test_closed_cavity_blocks_target_even_when_camera_is_not_inside_a_solid(self):
        for key,p,s in [('front',(0,-1,1),(2,.1,2)),('back',(0,1,1),(2,.1,2)),('left',(-1,0,1),(.1,2,2)),('right',(1,0,1),(.1,2,2)),('target',(0,-3,1),(1,.2,1))]:
            self.scene['objects'].append(box(key,p,s))
        self.aim((0,0,1),(0,-3,1))
        result=camera_review(self.root,self.scene,dict(subjects=['target'],purpose='overview'))
        self.assertEqual(result['cameraInsideSolid'],[])
        self.assertIn('subject_occluded',result['failures'])
        self.assertEqual(result['status'],'fail')

    def test_missing_subject_is_not_a_success_and_cropped_subject_is_detected(self):
        self.scene['objects']=[box('cabinet',(0,0,1),(2,.5,2))]
        self.aim((0,-4,1),(0,0,1),35)
        missing=camera_review(self.root,self.scene,dict(subjects=['missing']))
        self.assertEqual(missing['status'],'fail');self.assertIsNone(missing['completeSubjectWithMargin'])
        no_subject=camera_review(self.root,self.scene,{})
        self.assertEqual(no_subject['status'],'not_evaluated');self.assertIsNone(no_subject['completeSubjectWithMargin'])
        self.aim((0,-1,1),(0,0,1),150)
        cropped=camera_review(self.root,self.scene,dict(subjects=['cabinet']))
        self.assertIn('subject_clipped_or_behind_camera',cropped['failures'])

    def test_camera_in_solid_is_detected_but_a_clear_indoor_camera_is_allowed(self):
        self.scene['objects']=[box('cabinet',(0,0,1),(2,1,2))]
        self.aim((0,0,1),(0,2,1));self.assertEqual(camera_review(self.root,self.scene)['status'],'fail')
        self.aim((0,-4,1),(0,0,1),25)
        self.assertEqual(camera_review(self.root,self.scene,dict(subjects=['cabinet']))['status'],'pass')

    def test_visible_detail_does_not_need_to_occupy_half_the_image(self):
        self.scene['objects']=[box('cabinet',(0,0,1),(1,.3,1))]
        self.aim((0,-4,1.5),(0,0,1),30)
        result=camera_review(self.root,self.scene,dict(subjects=['cabinet'],purpose='detail',focusPoints=[[0,-.15,1]]))
        self.assertGreater(result['visibleFraction'],0);self.assertLess(result['visibleFraction'],.5)
        self.assertEqual(result['status'],'pass');self.assertEqual(result['focusVisible'],[True])

    def test_one_declared_subject_cannot_hide_a_second_declared_subject(self):
        self.scene['objects']=[box('front',(0,-1,1),(2,.2,2)),box('back',(0,1,1),(1,.2,1))]
        self.aim((0,-5,1),(0,0,1),25)
        result=camera_review(self.root,self.scene,dict(subjects=['front','back'],purpose='overview'))
        self.assertEqual(result['status'],'fail');self.assertIn('required_subject_invisible',result['failures'])
        self.assertEqual(next(r for r in result['perSubject'] if r['id']=='back')['visibleSamples'],0)

    def test_focus_inside_a_subject_is_not_mistaken_for_its_visible_surface(self):
        self.scene['objects']=[box('cabinet',(0,0,1),(1,.3,1))]
        self.aim((0,-4,1.5),(0,0,1),30)
        result=camera_review(self.root,self.scene,dict(subjects=['cabinet'],purpose='detail',focusPoints=[[0,0,1]]))
        self.assertEqual(result['focusVisible'],[False]);self.assertIn('required_focus_occluded',result['failures'])

    def test_transparent_glass_is_not_treated_as_an_opaque_wall(self):
        self.scene['objects']=[box('glass',(0,-1,1),(4,.1,3)),box('cabinet',(0,1,1),(1,.3,1))]
        obj=bpy.data.objects['Cube'];mat=bpy.data.materials.new('Glass');mat.use_nodes=True
        mat.node_tree.nodes['Principled BSDF'].inputs['Transmission Weight'].default_value=1
        obj.data.materials.append(mat)
        self.aim((0,-4,1),(0,1,1),25)
        self.assertEqual(camera_review(self.root,self.scene,dict(subjects=['cabinet']))['status'],'pass')

    def test_section_clips_front_half_and_exposes_real_internal_geometry(self):
        self.scene['objects']=[box('front',(3,.1,1.5),(6,.2,3)),box('shelf',(3,4,1),(2,1,2))]
        before=len(bpy.data.objects)
        result=project_elevation(self.root,self.scene,'section_y',3)
        self.assertEqual(result['cutAt'],3);self.assertEqual(result['cutAxis'],'y');self.assertGreater(result['lines'],0)
        self.assertNotIn('front',[group['id'] for group in result['groups']])
        self.assertIn('shelf',[group['id'] for group in result['groups']]);self.assertEqual(len(bpy.data.objects),before)
        with self.assertRaises(ValueError):project_elevation(self.root,self.scene,'section_y',9)

    def test_pixel_denominator_is_original_image_size_and_black_is_only_a_warning(self):
        with tempfile.TemporaryDirectory(prefix='dsh-image-check-') as folder:
            image=bpy.data.images.new('Pixels',width=13,height=7);image.generated_color=(0,0,0,1)
            image.file_format='PNG';image.filepath_raw=str(Path(folder)/'pixels.png');image.save()
            result=image_review(Path(image.filepath_raw));bpy.data.images.remove(image)
            self.assertEqual(result['pixels'],91);self.assertEqual(result['exactBlackPixels'],91);self.assertEqual(result['warning'],'near_all_black')

    def test_actual_contact_graph_reports_a_small_gap_without_envelope_guessing(self):
        first=box('base',(0,0,.5),(1,1,1));second=box('top',(0,0,1.505808),(1,1,1))
        first['assembly']=second['assembly']='joint';self.scene['objects']=[first,second]
        self.scene['design']={'constraints':{'relations':[dict(id='contact',a='base',b='top',kind='contact',point=[0,0,1],tolerance=.001)]}}
        result=connection_review(self.root,self.scene)
        self.assertEqual(result['groups'][0]['status'],'connection_unresolved')
        self.assertEqual(result['declaredContacts'][0]['status'],'fail')

    def test_detail_points_out_of_frame_are_not_reported_visible(self):
        self.scene['objects']=[box('target',(0,0,1),(1,1,1)),box('other',(4,0,1),(1,1,1))]
        self.aim((4,-3,1),(4,0,1),50)
        report=camera_review(self.root,self.scene,dict(subjects=['target'],purpose='detail',focusPoints=[[0,-.5,1]]))
        self.assertIn('required_focus_occluded',report['failures']);self.assertIn('subject_occluded',report['failures'])

    def test_saved_full_facade_cannot_be_replaced_by_a_small_camera_subject(self):
        facade=box('facade',(0,0,1),(8,.2,2));facade['assembly']='front'
        sign=box('sign',(-3,-.2,1),(1,.1,.4));sign['assembly']='front'
        self.scene['objects']=[facade,sign]
        self.scene['design']={'constraints':{'views':[dict(id='whole',view='entry',scope='assembly',assembly='front',visibleKeys=['sign'])]}}
        self.aim((-3,-4,1),(-3,0,1),50)
        camera=dict(subjects=['sign'],purpose='overview')
        narrow=camera_review(self.root,self.scene,camera)
        self.assertEqual(narrow['status'],'pass',str(narrow))
        report=camera_review_for_view(self.root,self.scene,'entry',camera)
        self.assertEqual(report['status'],'fail');self.assertEqual(report['fixedChecks'][0]['resolvedIds'],['facade','sign'])
        self.assertIn('subject_clipped_or_behind_camera',report['fixedChecks'][0]['failures'])

    def test_full_framing_does_not_require_hidden_internal_parts_to_be_visible(self):
        self.scene['objects']=[box('front',(0,-1,1),(2,.2,2)),box('back',(0,1,1),(1,.2,1))]
        self.scene['design']={'constraints':{'views':[dict(id='whole',view='front',scope='scene',visibleKeys=['front'])]}}
        self.aim((0,-6,1),(0,0,1),25)
        report=camera_review_for_view(self.root,self.scene,'front')
        self.assertEqual(report['status'],'pass')
        self.scene['design']['constraints']['views'][0]['visibleKeys'].append('back')
        self.assertEqual(camera_review_for_view(self.root,self.scene,'front')['status'],'fail')

    def cross_support(self):
        base=box('base',(0,0,.1),(4,4,.2));base['assembly']='platform'
        frame=box('frame',(0,0,1.1),(.2,.2,1.8));frame['assembly']='case'
        shelf=box('shelf',(0,0,2.06),(1,1,.1));shelf['assembly']='contents'
        self.scene['objects']=[base,frame,shelf]
        self.scene['design']={'constraints':{'supports':[dict(id='supported',scope='assembly',assembly='contents',anchorKeys=['base'],viaAssemblies=['case'])]}}

    def test_cross_assembly_contact_uses_declared_anchors_instead_of_its_own_lowest_surface(self):
        self.cross_support()
        first=connection_review(self.root,self.scene)['declaredSupports'][0]
        self.assertEqual(first['status'],'fail');self.assertIn('shelf',first['graph']['unresolvedObjects'])
        obj=next(o for o in self.root.objects if o.get('studio_id')=='shelf');obj.location.z-=.01;bpy.context.view_layer.update()
        self.assertEqual(connection_review(self.root,self.scene)['declaredSupports'][0]['status'],'pass')
        self.scene['design']['constraints']['supports'][0]['viaAssemblies']=[]
        self.assertEqual(connection_review(self.root,self.scene)['declaredSupports'][0]['status'],'fail')

    def test_new_floating_members_of_a_saved_assembly_are_not_omitted(self):
        self.cross_support()
        obj=next(o for o in self.root.objects if o.get('studio_id')=='shelf');obj.location.z-=.01
        extra=box('extra',(0,0,3.5),(.5,.5,.2));extra['assembly']='contents';self.scene['objects'].append(extra)
        report=connection_review(self.root,self.scene)['declaredSupports'][0]
        self.assertEqual(report['status'],'fail');self.assertIn('extra',report['resolvedIds'])
        self.assertIn('extra',report['graph']['unresolvedObjects'])

    def test_omitted_default_groups_are_named_and_fixed_ranges_beyond_the_first_32_still_run(self):
        base=box('base',(0,0,.1),(40,4,.2));self.scene['objects']=[base]
        for index in range(34):
            part=box('part'+str(index),(index-17,0,.3),(.1,.1,.2));part['assembly']='group'+str(index);self.scene['objects'].append(part)
        self.scene['design']={'constraints':{'supports':[dict(id='last',keys=['part33'],anchorKeys=['base'])]}}
        report=connection_review(self.root,self.scene)
        self.assertEqual(report['coverage']['unassessedGroups'],['group32','group33'])
        self.assertEqual(report['declaredSupports'][0]['status'],'pass')

    def test_more_than_256_islands_are_checked_without_dropping_scope(self):
        parts=[]
        for index in range(257):
            box('pieces',(index*.2,0,1),(.1,.1,.1));parts.append(bpy.context.object)
        bpy.ops.object.select_all(action='DESELECT')
        for obj in parts:obj.select_set(True)
        bpy.context.view_layer.objects.active=parts[0];bpy.ops.object.join()
        self.scene['objects']=[dict(id='pieces',type='model',origin={'key':'pieces'}),box('base',(0,0,0),(1,1,.1))]
        self.scene['design']={'constraints':{'supports':[dict(id='budget',keys=['pieces'],anchorKeys=['base'])]}}
        report=connection_review(self.root,self.scene)['declaredSupports'][0]
        self.assertEqual(report['id'],'budget');self.assertEqual(report['status'],'fail')
        self.assertEqual(report['graph']['targetMeshIslands'],257)
        self.assertEqual(report['graph']['unresolvedKeys'],['pieces'])

    def test_many_glyph_islands_connect_to_the_same_declared_backing(self):
        self.scene['objects']=[box('backing',(3,0,.05),(6,1,.1))]
        for index in range(260):
            self.scene['objects'].append(box('glyph'+str(index),(.01+index*.02,0,.2),(.01,.01,.2)))
        self.scene['design']={'constraints':{'supports':[dict(id='glyphs',scope='scene',anchorKeys=['backing'])]}}
        report=connection_review(self.root,self.scene)['declaredSupports'][0]
        self.assertEqual(report['status'],'pass');self.assertEqual(report['graph']['targetMeshIslands'],261)
        self.assertLess(report['graph']['candidatePairs'],1000)
        bpy.data.objects['Cube.260'].location.z+=.005;bpy.context.view_layer.update()
        report=connection_review(self.root,self.scene)['declaredSupports'][0]
        self.assertEqual(report['status'],'fail');self.assertEqual(report['graph']['unresolvedKeys'],['glyph259'])

    def test_true_island_budget_is_unassessed_with_its_saved_identity(self):
        vertices=[];triangles=[]
        for index in range(8193):
            start=len(vertices);vertices.extend([(index*.01,0,1),(index*.01+.001,0,1),(index*.01,.001,1)]);triangles.append((start,start+1,start+2))
        mesh=bpy.data.meshes.new('many');mesh.from_pydata(vertices,[],triangles)
        obj=bpy.data.objects.new('many',mesh);self.root.collection.objects.link(obj);obj['studio_id']='pieces'
        self.scene['objects']=[dict(id='pieces',type='model'),box('base',(0,0,0),(1,1,.1))]
        self.scene['design']={'constraints':{'supports':[dict(id='budget',keys=['pieces'],anchorKeys=['base'])]}}
        report=connection_review(self.root,self.scene)['declaredSupports'][0]
        self.assertEqual(report['status'],'not_evaluated');self.assertIn('8192',report['reason'])

    def test_visible_required_text_from_its_back_is_rejected(self):
        self.scene['objects']=[dict(box('sign',(0,0,1),(1,.02,.3)),shape='text',plane='xz',rotationEuler=[0,0,0])]
        self.aim((0,-4,1),(0,0,1),35)
        self.assertEqual(camera_review(self.root,self.scene,dict(subjects=['sign']))['status'],'pass')
        self.aim((0,4,1),(0,0,1),35)
        result=camera_review(self.root,self.scene,dict(subjects=['sign']))
        self.assertIn('required_text_reversed',result['failures'])


if __name__=='__main__':
    unittest.main(argv=['worker-quality'])
