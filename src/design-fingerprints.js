/** Dependency hashes exclude confirmation bookkeeping, never geometry or surface settings. */
import {createHash} from 'node:crypto';
import {CONSTRAINT_GROUPS} from './design-constraints.js';
const digest=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const objects=scene=>scene.objects.map(({origin,...o})=>o);
export const modelFingerprint=(scene,materials)=>digest({unit:scene.unit,kind:scene.kind,bounds:scene.bounds,objects:objects(scene),materials,
  lighting:{mode:scene.presentation?.mode??'studio',worldStrength:scene.presentation?.worldStrength??.35,lights:scene.presentation?.lights??[]}});
export const cadFingerprint=scene=>digest({unit:scene.unit,kind:scene.kind,bounds:scene.bounds,objects:objects(scene),
  name:scene.design?.name,dimensionBasis:scene.design?.dimensionBasis,assumptions:scene.design?.assumptions,
  constraints:scene.design?.constraints?Object.fromEntries(CONSTRAINT_GROUPS.map(k=>[k,scene.design.constraints[k]])):null});
export const meshScopeFingerprint=scene=>digest({model:scene.objects.map(o=>({id:o.id,key:o.origin?.key,assembly:o.assembly})),
  relations:scene.design?.constraints?.relations??[],supports:scene.design?.constraints?.supports??[]});
export const viewFingerprint=(scene,view,materials,runtime)=>digest({model:modelFingerprint(scene,materials),view,
  camera:scene.presentation?.cameras.find(c=>c.key===view)??null,runtime,recipe:1,
  ...((scene.design?.constraints?.views?.length||scene.design?.constraints?.supports?.length)?{
    acceptance:scene.design.constraints.views?.filter(r=>r.view===view)??[],meshScope:meshScopeFingerprint(scene)}:{})});
