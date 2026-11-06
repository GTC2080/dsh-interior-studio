import test from 'node:test';
import assert from 'node:assert/strict';
import { Box3, PerspectiveCamera, Vector3 } from 'three';
import { fitView } from '../src/view-fit.js';

test('panel resizing keeps all model corners visible and preserves the orbit direction', () => {
  const target = new Vector3(3, .7, -2);
  const bounds = new Box3(new Vector3(0, -.08, -4), new Vector3(6, 3, 0));
  const camera = new PerspectiveCamera(38, 2, .01, 5000);
  camera.position.set(10, 10, 10);
  camera.lookAt(target);
  const direction = camera.getWorldDirection(new Vector3());
  camera.aspect = .45;
  camera.updateProjectionMatrix();camera.updateMatrixWorld(true);
  assert.ok(new Vector3(6, 3, -4).project(camera).x > 1, 'old aspect-only resizing clips this model');
  for (const aspect of [.45, .9, 2]) {
    fitView(camera, target, bounds, aspect);
    for (const x of [bounds.min.x, bounds.max.x]) for (const y of [bounds.min.y, bounds.max.y]) for (const z of [bounds.min.z, bounds.max.z]) {
      const point = new Vector3(x, y, z).project(camera);
      assert.ok(Math.abs(point.x) < 1 && Math.abs(point.y) < 1 && point.z > -1 && point.z < 1);
    }
    assert.ok(camera.getWorldDirection(new Vector3()).distanceTo(direction) < 1e-12);
  }
});
