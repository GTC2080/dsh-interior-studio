/** Import of an existing DXF plan as the starting point of a project. */
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { hash } from '../store.js';
import { check } from '../scene.js';
import { key } from '../refinement.js';

export async function importCad(studio, session, input, operation, signal) {
  check(
    typeof input.name === 'string' && /^[^/\\\x00-\x1f]{1,180}\.(dxf|dwg)$/i.test(input.name),
    '请选择 DWG 或 DXF 文件',
  );
  if (/\.dwg$/i.test(input.name))
    throw new Error(
      'DWG_NOT_LICENSED：当前开发包尚无获商业分发授权的 DWG 引擎，直接 DWG 导入未通过。可验证 DXF 受限流程；不会在线转换或静默改名。',
    );
  check(
    typeof input.base64 === 'string' &&
      input.base64.length <= 28 * 1024 * 1024 &&
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(input.base64),
    'CAD 数据无效或超过 20 MiB',
  );
  const bytes = Buffer.from(input.base64, 'base64');
  check(bytes.length > 0 && bytes.length <= 20 * 1024 * 1024, 'CAD 为空或超过 20 MiB');
  let id = studio.store.bound(session);
  if (!id)
    id = studio.store.create(
      session,
      input.name.replace(/\.[^.]+$/, ''),
      'interior',
      operation + ':project',
    ).id;
  studio.store.assertWriter(session, id, studio.store.project(id).revision);
  check(studio.store.project(id).revision === 0, '请为新的 CAD 新建工程，避免替换已有设计');
  const fileHash = hash(bytes),
    importId = randomUUID();
  const request = { id, name: input.name, fileHash };
  const done = studio.store.replay(session, operation, request);
  if (done !== undefined) return done;
  const sourceDir = studio.store.dir(id, 'source', 'original');
  await mkdir(sourceDir, { recursive: true, mode: 0o700 });
  const source = studio.store.dir(id, 'source', 'original', `${fileHash}.dxf`);
  await writeFile(source, bytes, { flag: 'wx', mode: 0o400 }).catch((error) => {
    if (error.code !== 'EEXIST') throw error; // Content-addressed: already stored.
  });
  const report = await studio.engine.request(
    { action: 'parse', path: source, fileHash, importId },
    signal,
  );
  report.displayName = input.name;
  const importDir = studio.store.dir(id, 'imports');
  await mkdir(importDir, { recursive: true, mode: 0o700 });
  await writeFile(
    studio.store.dir(id, 'imports', `${importId}.json`),
    JSON.stringify(report, null, 2),
    { flag: 'wx', mode: 0o600 },
  );
  return studio.store.once(session, operation, request, () => {
    studio.store.assertWriter(session, id, 0);
    studio.store.db
      .prepare('INSERT INTO imports VALUES(?,?,?)')
      .run(importId, id, JSON.stringify(report));
    return { projectId: id, importId, state: 'awaiting_user_confirmation' };
  });
}

export async function analyzeCad(studio, session, input, operation, signal) {
  const id = studio.store.bound(session);
  check(id, '没有活动工程');
  studio.store.assertWriter(session, id, 0);
  const row = studio.store.db
    .prepare('SELECT report FROM imports WHERE id=? AND project=?')
    .get(input.importId, id);
  check(row, '导入报告不属于当前工程');
  const original = JSON.parse(row.report);
  check(/^[a-f0-9]{64}$/.test(original.fileHash), '原件摘要无效');
  const options = {};
  for (const key of [
    'wallLayers',
    'doorLayers',
    'windowLayers',
    'openingLayers',
    'wallMode',
    'unit',
    'maxWallThickness',
  ]) {
    if (input[key] !== undefined) options[key] = input[key];
  }
  const request = { id, importId: input.importId, options };
  const done = studio.store.replay(session, operation, request);
  if (done !== undefined) return done;
  const source = studio.store.dir(id, 'source', 'original', original.fileHash + '.dxf');
  const importId = randomUUID();
  const report = await studio.engine.request(
    { action: 'parse', path: source, fileHash: original.fileHash, importId, options },
    signal,
  );
  report.displayName = original.displayName;
  await writeFile(
    studio.store.dir(id, 'imports', importId + '.json'),
    JSON.stringify(report, null, 2),
    { flag: 'wx', mode: 0o600 },
  );
  return studio.store.once(session, operation, request, () => {
    studio.store.assertWriter(session, id, 0);
    studio.store.db
      .prepare('INSERT INTO imports VALUES(?,?,?)')
      .run(importId, id, JSON.stringify(report));
    return { projectId: id, importId, state: 'awaiting_user_confirmation' };
  });
}
