import { Vector3 } from 'three';

/** Fit world bounds around the existing orbit target without changing its direction. */
export function fitView(camera, target, bounds, aspect) {
  camera.aspect = aspect;
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld(true);
  const forward = camera.getWorldDirection(new Vector3());
  const right = new Vector3().setFromMatrixColumn(camera.matrixWorld, 0).normalize();
  const up = new Vector3().setFromMatrixColumn(camera.matrixWorld, 1).normalize();
  const tangent = Math.tan(camera.fov * Math.PI / 360) / camera.zoom;
  let distance = camera.near * 2;
  for (const x of [bounds.min.x, bounds.max.x]) {
    for (const y of [bounds.min.y, bounds.max.y]) {
      for (const z of [bounds.min.z, bounds.max.z]) {
        const corner = new Vector3(x, y, z).sub(target);
        const depth = corner.dot(forward);
        distance = Math.max(distance,
          Math.abs(corner.dot(right)) * 1.15 / (tangent * aspect) - depth,
          Math.abs(corner.dot(up)) * 1.15 / tangent - depth,
          camera.near * 2 - depth);
      }
    }
  }
  const eye = target.clone().addScaledVector(forward, -distance);
  camera.position.copy(camera.parent ? camera.parent.worldToLocal(eye) : eye);
  camera.updateMatrixWorld(true);
}

/** Reset an orbit to a standard GLB/Y-up view, then fit all actual model corners. */
export function setStandardView(camera,target,bounds,aspect,name) {
  const directions={overview:[.8,2.2,1.1],front:[0,0,1],back:[0,0,-1],left:[-1,0,0],right:[1,0,0],top:[0,1,.001]};
  if(!Object.hasOwn(directions,name))throw Error('未知三维视角');
  const center=bounds.getCenter(new Vector3()),size=Math.max(bounds.getSize(new Vector3()).length(),1);
  const eye=center.clone().addScaledVector(new Vector3(...directions[name]).normalize(),size);
  target.copy(center);camera.up.set(0,1,0);camera.position.copy(camera.parent?camera.parent.worldToLocal(eye):eye);camera.lookAt(center);
  fitView(camera,target,bounds,aspect);
}
