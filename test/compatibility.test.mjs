import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const readJSON = path => JSON.parse(readFileSync(new URL(path, root), 'utf8'));
const manifest = readJSON('package.json');
const supportedDsh = '0.2.2-rc.1';
const gate = new URL('../../source/packages/boot/app-boot/lib/types/plugin-compatibility.js', root);

test('manifest, DSH peers, lockfile and preset provenance target the same supported host', () => {
  const lock = readJSON('package-lock.json');
  const baseline = readJSON('legal/dsh-ptc-baseline.json');
  assert.equal(manifest.engines.dsh, supportedDsh);
  const peers = Object.entries(manifest.peerDependencies).filter(([name]) => name.startsWith('@deepseek-ai/dsh-'));
  assert.ok(peers.length > 0);
  for (const [name, version] of peers) assert.equal(version, supportedDsh, name);
  assert.equal(lock.version, manifest.version);
  assert.equal(lock.packages[''].version, manifest.version);
  assert.deepEqual(lock.packages[''].engines, manifest.engines);
  assert.deepEqual(lock.packages[''].peerDependencies, manifest.peerDependencies);
  assert.equal(baseline.dshVersion, supportedDsh);
});

test('real DSH compatibility gate accepts the plugin without an exemption', { skip: !existsSync(gate) }, async () => {
  const { evaluatePluginCompatibility } = await import(gate.href);
  const host = readJSON('../../source/packages/boot/app-boot/package.json');
  assert.equal(host.version, supportedDsh, 'review host API changes before updating the supported version');
  const rootHost = readJSON('../../source/package.json');
  assert.equal(manifest.engines.node, rootHost.engines.node);
  for (const name of ['cordis', 'schemastery']) {
    assert.equal(manifest.peerDependencies['@deepseek-ai/' + name], readJSON('../../source/vendor/' + name + '/package.json').version);
  }
  const evaluate = manifest => evaluatePluginCompatibility(manifest, {}, host.version);
  assert.equal(evaluate(manifest), undefined);
  const previous = { ...manifest, engines: { ...manifest.engines, dsh: '0.2.1-rc.3' } };
  const refused = evaluate(previous);
  assert.deepEqual(refused.requirements, { 'engines.dsh': '0.2.1-rc.3' });
  assert.equal(refused.exempted, false);
  const peersOnly = { ...manifest, engines: { node: manifest.engines.node } };
  assert.equal(evaluate(peersOnly), undefined);
  for (const version of ['0.2.2-alpha.3', '0.2.2-rc.2']) {
    const mismatch = evaluatePluginCompatibility(manifest, {}, version);
    assert.deepEqual(mismatch.requirements, { 'engines.dsh': supportedDsh });
    assert.equal(mismatch.exempted, false, 'untested hosts must not be silently admitted');
  }
});
