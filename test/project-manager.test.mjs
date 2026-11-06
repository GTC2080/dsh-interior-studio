import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync, readFileSync, existsSync, symlinkSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { Studio } from '../src/studio.js';
import { sceneFromProposal } from '../src/scene.js';

function setup(t, running = () => false) {
  const root = mkdtempSync(join(tmpdir(), 'dsh-project-manager-'));
  const studio = new Studio(root, { dispose: async () => {} }, running);
  const p = studio.store.create('writer', '原始工程', 'interior', 'create');
  const scene = sceneFromProposal({ kind: 'interior', width: 6, depth: 4, height: 2.8, thickness: .12 }, 'confirmed');
  studio.store.once('writer', 'initial', {}, () => studio.store.commit('writer', p.id, 0, scene, 'initial'));
  t.after(async () => { await studio.dispose(); rmSync(root, { recursive: true, force: true }); });
  return { studio, store: studio.store, p, root, scene, input: { projectId: p.id, expectedRevision: 1, confirmName: p.name } };
}

test('rename preserves immutable geometry, rejects stale names/versions and replays safely', t => {
  const { studio, store, p, scene } = setup(t);
  const input = { projectId: p.id, expectedRevision: 1, expectedName: p.name, name: '新名称' };
  const result = studio.manage('rename', input, 'rename');
  assert.deepEqual(studio.manage('rename', input, 'rename'), result);
  assert.equal(store.project(p.id).name, '新名称'); assert.deepEqual(store.read(p.id), scene);
  assert.throws(() => studio.manage('rename', { ...input, name: '覆盖' }, 'another'), /已变化/);
  assert.throws(() => studio.manage('rename', { ...input, name: '\n' }, 'invalid'), /名称/);
  assert.throws(() => studio.manage('delete', { projectId: p.id, expectedRevision: 0, confirmName: '新名称' }, 'stale-delete'), /变化/);
  assert.equal(studio.manage('list', {}, 'read').projects[0].name, '新名称');
});

test('delete removes only its own local artifacts, bindings and detailed records', t => {
  const { studio, store, p, root, input } = setup(t);
  const other = store.create('other', '保留工程', 'booth', 'other');
  const outside = join(root, 'outside.txt'); writeFileSync(outside, 'keep');
  symlinkSync(outside, store.dir(p.id, 'external-link'));
  store.bind('reader', p.id);
  store.db.prepare('INSERT INTO tasks VALUES(?,?,?,?,?)').run('task', p.id, 1, 'complete', '{}');
  store.db.prepare('INSERT INTO imports VALUES(?,?,?)').run('import', p.id, '{}');
  store.db.prepare('INSERT INTO proposals VALUES(?,?)').run(p.id, '{}');
  store.confirmation(p.id, { action: 'test' });
  assert.deepEqual(studio.manage('delete', input, 'delete'), { projectId: p.id, deleted: true });
  assert.deepEqual(studio.manage('delete', input, 'delete'), { projectId: p.id, deleted: true });
  assert.equal(existsSync(join(root, p.id)), false);
  assert.equal(readFileSync(outside, 'utf8'), 'keep'); assert.equal(store.project(other.id).name, '保留工程');
  assert.equal(store.bound('writer'), undefined); assert.equal(store.bound('reader'), undefined);
  assert.equal(studio.snapshot('writer').project, null);
  assert.throws(() => store.project(p.id), /已删除/);
  for (const table of ['revisions', 'tasks', 'imports', 'proposals', 'confirmations', 'selections'])
    assert.equal(store.db.prepare(`SELECT count(*) AS n FROM ${table} WHERE project=?`).get(p.id).n, 0);
  assert.deepEqual(store.create('writer', p.name, 'interior', 'create'), { projectId: p.id, deleted: true });
  assert.equal(existsSync(join(root, p.id)), false);
});

test('an interrupted cleanup stays visible and can finish without an intact descriptor', t => {
  const { studio, store, p, root, input } = setup(t);
  store.db.prepare('UPDATE projects SET deleted=1 WHERE id=?').run(p.id);
  store.db.prepare('DELETE FROM bindings WHERE project=?').run(p.id);
  rmSync(join(root, p.id, 'project.json'));
  assert.equal(store.list().length, 0);
  assert.equal(studio.manage('list', {}, 'read').projects[0].deleted, 1);
  studio.manage('delete', input, 'retry');
  assert.equal(existsSync(join(root, p.id)), false);
  assert.equal(studio.manage('list', {}, 'read-again').projects.length, 0);
});

test('delete rejects foreign directories, linked roots and wrong confirmation before touching files', t => {
  const { studio, store, p, root, input } = setup(t);
  assert.throws(() => studio.manage('delete', { ...input, confirmName: 'wrong' }, 'wrong'), /名称/);
  writeFileSync(join(root, p.id, 'project.json'), JSON.stringify({ id: 'foreign' }));
  assert.throws(() => studio.manage('delete', input, 'foreign'), /身份/);
  assert.equal(store.project(p.id).deleted, 0);
  rmSync(join(root, p.id), { recursive: true });
  const other = store.create('other', '保留', 'interior', 'other');
  symlinkSync(join(root, other.id), join(root, p.id));
  assert.throws(() => studio.manage('delete', input, 'linked'), /符号链接/);
  assert.equal(existsSync(join(root, other.id, 'project.json')), true);
  assert.throws(() => studio.manage('delete', { ...input, projectId: '../outside' }, 'traversal'), /ID/);
});

test('live model turns, CAD work and queued/running builds block management mutations', async t => {
  let running = true;
  const { studio, store, p, input } = setup(t, session => running && session === 'writer');
  const remove = () => studio.manage('delete', input, 'delete');
  assert.match(studio.manage('list', {}, 'read').projects[0].activity, /聊天/);
  assert.throws(remove, /正在使用/);
  const other = store.create('other', 'other', 'interior', 'other');
  await assert.rejects(() => studio.ui('writer', 'open', { projectId: other.id }, 'switch'), /聊天正在运行/);
  await assert.rejects(() => studio.ui('writer', 'create', { name: 'new', kind: 'interior' }, 'new'), /聊天正在运行/);
  running = false;
  let finish;
  const cad = studio.trackCad(new Promise(resolve => { finish = resolve; }));
  assert.throws(remove, /正在使用/); finish(); await cad;
  store.db.prepare('INSERT INTO tasks VALUES(?,?,?,?,?)').run('task', p.id, 1, 'queued', '{}');
  assert.throws(remove, /正在使用/);
  store.db.prepare("UPDATE tasks SET state='complete'").run();
  assert.equal(remove().deleted, true);
});

test('deleting local files does not bypass or break authorization of retained chat history', async t => {
  const { studio, store, p, input } = setup(t);
  const route = { sessionId: 'writer', provider: 'deepseek', model: 'flash' };
  studio.beforeModelRequest(route);
  await studio.ui('writer', 'consent', { expectedRevision: 1, allow: true }, 'grant');
  studio.context('writer');
  studio.manage('delete', input, 'delete');
  assert.doesNotThrow(() => studio.beforeModelRequest(route));
  assert.throws(() => studio.beforeModelRequest({ ...route, provider: 'another' }), /授权已变化/);
  assert.equal(store.db.prepare('SELECT count(*) AS n FROM disclosures WHERE project=?').get(p.id).n, 1);
  assert.equal(studio.context('writer').project, null);
});
