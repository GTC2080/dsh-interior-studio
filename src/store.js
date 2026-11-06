/** Local immutable revisions; SQLite owns current pointers, write ownership and receipts. */
import { DatabaseSync } from 'node:sqlite';
import { randomUUID, createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync, renameSync, lstatSync, realpathSync,
  openSync, closeSync, fsyncSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve, relative, isAbsolute, dirname } from 'node:path';
import { check, validateScene } from './scene.js';
import {reviewDesign} from './design-review.js';

export const hash = data => createHash('sha256').update(data).digest('hex');
const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
const projectName = name => {
  check(typeof name === 'string' && name.trim().length > 0 && name.length <= 100
    && !/[\u0000-\u001f\u007f]/.test(name), '工程名称须为 1–100 字符，不能含控制字符');
  return name.trim();
};

/** Reject linked path components before touching project content. */
export function localPath(root, ...parts) {
  const target = resolve(root, ...parts);
  const rel = relative(root, target);
  check(rel !== '..' && !rel.startsWith(`..${process.platform === 'win32' ? '\\' : '/'}`) && !isAbsolute(rel), '工程路径越界');
  let cursor = target;
  while (true) {
    try { check(!lstatSync(cursor).isSymbolicLink(), '工程路径不能包含符号链接'); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (cursor === root) break;
    cursor = dirname(cursor);
  }
  return target;
}

function durableFile(path, bytes) {
  const fd = openSync(path, 'wx', 0o600);
  try { writeFileSync(fd, bytes); fsyncSync(fd); } finally { closeSync(fd); }
}

export class ProjectStore {
  constructor(root) {
    check(isAbsolute(root), 'projectRoot 必须是绝对路径');
    mkdirSync(root, { recursive: true, mode: 0o700 });
    check(!lstatSync(root).isSymbolicLink(), '工程根目录不能是符号链接');
    this.root = realpathSync(root);
    localPath(this.root, 'state.sqlite');
    this.db = new DatabaseSync(join(this.root, 'state.sqlite'));
    this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA busy_timeout=5000;
      CREATE TABLE IF NOT EXISTS projects(id TEXT PRIMARY KEY, name TEXT NOT NULL, kind TEXT NOT NULL,
        writer TEXT NOT NULL, revision INTEGER NOT NULL DEFAULT 0, consent INTEGER NOT NULL DEFAULT 0,
        undo TEXT NOT NULL DEFAULT '[]', redo TEXT NOT NULL DEFAULT '[]', created TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS revisions(project TEXT, revision INTEGER, path TEXT NOT NULL, hash TEXT NOT NULL,
        operation TEXT NOT NULL, confirmation TEXT, PRIMARY KEY(project,revision));
      CREATE TABLE IF NOT EXISTS receipts(session TEXT, operation TEXT, requestHash TEXT NOT NULL, result TEXT NOT NULL,
        PRIMARY KEY(session,operation));
      CREATE TABLE IF NOT EXISTS selections(token TEXT PRIMARY KEY, project TEXT, session TEXT, revision INTEGER,
        objectId TEXT, surfaceId TEXT);
      CREATE TABLE IF NOT EXISTS tasks(id TEXT PRIMARY KEY, project TEXT, revision INTEGER, state TEXT, detail TEXT);
      CREATE TABLE IF NOT EXISTS bindings(session TEXT PRIMARY KEY, project TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS confirmations(id TEXT PRIMARY KEY, project TEXT, data TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS imports(id TEXT PRIMARY KEY, project TEXT, report TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS proposals(project TEXT PRIMARY KEY, data TEXT NOT NULL);`);
    this.db.exec(`CREATE TABLE IF NOT EXISTS route_grants(session TEXT,project TEXT,route TEXT,PRIMARY KEY(session,project,route));
      CREATE TABLE IF NOT EXISTS disclosures(session TEXT,project TEXT,PRIMARY KEY(session,project));
      CREATE TABLE IF NOT EXISTS host_owner(singleton INTEGER PRIMARY KEY CHECK(singleton=1),pid INTEGER,token TEXT);`);
    if (!this.db.prepare('PRAGMA table_info(projects)').all().some(column => column.name === 'deleted'))
      this.db.exec('ALTER TABLE projects ADD COLUMN deleted INTEGER NOT NULL DEFAULT 0');
  }
  /** A live PID is conservatively busy, including possible PID reuse; no heartbeat-based takeover. */
  claimHost() {
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const owner=this.db.prepare('SELECT * FROM host_owner WHERE singleton=1').get();
      if(owner) {
        check(Number.isInteger(owner.pid) && owner.pid>0, 'Host 锁记录无效，请保留工程并检查');
        let alive=true;
        try { process.kill(owner.pid,0); } catch(error) { if(error.code==='ESRCH') alive=false;else throw error; }
        check(!alive, '工程根目录正由另一 Host 使用；请使用独立目录，不能按心跳超时接管');
      }
      this.hostToken=randomUUID();
      this.db.prepare('INSERT OR REPLACE INTO host_owner VALUES(1,?,?)').run(process.pid,this.hostToken);
      this.db.prepare("UPDATE tasks SET state='interrupted',detail=? WHERE state IN ('queued','running')")
        .run(JSON.stringify({ message: '原 Host 已停止，请重试；已提交场景保留' }));
      this.db.exec('COMMIT');
    } catch(error) { this.db.exec('ROLLBACK');throw error; }
  }
  close() {
    if(this.hostToken) this.db.prepare('DELETE FROM host_owner WHERE singleton=1 AND token=?').run(this.hostToken);
    this.db.close();
  }
  project(id) {
    check(typeof id === 'string' && UUID.test(id), '工程 ID 无效');
    const row = this.db.prepare('SELECT * FROM projects WHERE id=?').get(id);
    check(row && row.deleted === 0, '工程不存在或已删除');
    return { ...row, consent: row.consent === 1 };
  }
  bound(session) { return this.db.prepare('SELECT project FROM bindings WHERE session=?').get(session)?.project; }
  bind(session, id, takeOver = false) {
    const p = this.project(id);
    if (takeOver) this.db.prepare('UPDATE projects SET writer=? WHERE id=?').run(session, id);
    this.db.prepare('INSERT OR REPLACE INTO bindings VALUES(?,?)').run(session, id);
    return { ...this.project(id), readOnly: p.writer !== session && !takeOver };
  }
  list() { return this.db.prepare('SELECT id,name,kind,revision,created FROM projects WHERE deleted=0 ORDER BY created DESC').all(); }
  rename(input, operation) {
    const name = projectName(input.name);
    return this.once('project-manager', operation, { action: 'rename', ...input }, () => {
      const p = this.project(input.projectId);
      check(p.revision === input.expectedRevision && p.name === input.expectedName, '工程已变化，请刷新后重试');
      this.db.prepare('UPDATE projects SET name=? WHERE id=?').run(name, p.id);
      return { projectId: p.id, name };
    });
  }
  /** Mark unavailable before removing files. Failed/interrupted cleanup remains visible for retry. */
  delete(input, operation) {
    check(typeof input.projectId === 'string' && UUID.test(input.projectId), '工程 ID 无效');
    const id = input.projectId;
    this.once('project-manager', operation, { action: 'delete', ...input }, () => {
      const p = this.db.prepare('SELECT * FROM projects WHERE id=?').get(id);
      check(p, '工程不存在');
      if (p.deleted === 2) return { projectId: id, deleted: true };
      check(p.revision === input.expectedRevision && p.name === input.confirmName, '工程已变化，请刷新并重新确认名称');
      const path = localPath(this.root, id);
      if (p.deleted === 0) {
        let exists = true;
        try { check(lstatSync(path).isDirectory(), '工程目录无效'); }
        catch (error) { if (error.code === 'ENOENT') exists = false; else throw error; }
        if (exists)
          check(JSON.parse(readFileSync(localPath(this.root, id, 'project.json'), 'utf8')).id === id, '工程目录身份不符，已停止删除');
      }
      this.db.prepare('UPDATE projects SET deleted=1 WHERE id=?').run(id);
      this.db.prepare('DELETE FROM bindings WHERE project=?').run(id);
      return { projectId: id, deleted: true };
    });
    if (this.db.prepare('SELECT deleted FROM projects WHERE id=?').get(id)?.deleted === 2) return { projectId: id, deleted: true };
    try { rmSync(localPath(this.root, id), { recursive: true, force: true }); }
    catch (error) { throw new Error('工程已停用，文件清理未完成；请在设计工程页重试删除：' + error.message); }
    this.db.exec('BEGIN IMMEDIATE');
    try {
      for (const table of ['revisions', 'selections', 'tasks', 'confirmations', 'imports', 'proposals'])
        this.db.prepare(`DELETE FROM ${table} WHERE project=?`).run(id);
      // Retain request hashes to prevent an old create/edit retry resurrecting a deleted project.
      this.db.prepare("UPDATE receipts SET result=? WHERE json_extract(result,'$.projectId')=? OR json_extract(result,'$.id')=?")
        .run(JSON.stringify({ projectId: id, deleted: true }), id, id);
      // Grants still govern project information already retained in chat history.
      this.db.prepare("UPDATE projects SET deleted=2,name='已删除工程',writer='',undo='[]',redo='[]' WHERE id=?").run(id);
      this.db.exec('COMMIT');
    } catch (error) { this.db.exec('ROLLBACK'); throw error; }
    return { projectId: id, deleted: true };
  }
  assertWriter(session, id, expected) {
    const p = this.project(id);
    check(p.writer === session, '工程由其他聊天持有写权限，请在右侧明确接管');
    check(expected === p.revision, '工程版本已变化，请刷新后重试');
    return p;
  }
  dir(id, ...parts) { this.project(id); return localPath(this.root, id, ...parts); }
  create(session, name, kind, operation) {
    name = projectName(name);
    check(['interior', 'booth'].includes(kind), '项目类型无效');
    return this.once(session, operation, { name, kind }, () => {
      const id = randomUUID();
      mkdirSync(localPath(this.root, id), { mode: 0o700 });
      durableFile(localPath(this.root, id, 'project.json'), JSON.stringify({ id, name, kind, formatVersion: 1 }));
      this.db.prepare('INSERT INTO projects(id,name,kind,writer,created) VALUES(?,?,?,?,?)')
        .run(id, name.trim(), kind, session, new Date().toISOString());
      this.db.prepare('INSERT OR REPLACE INTO bindings VALUES(?,?)').run(session, id);
      return this.project(id);
    });
  }
  /** Exactly one transaction covers a mutation and its idempotent receipt. */
  once(session, operation, input, execute) {
    check(typeof session === 'string' && session.length > 0 && session.length <= 200, '聊天身份无效');
    check(typeof operation === 'string' && operation.length > 0 && operation.length <= 200, '操作 ID 无效');
    const requestHash = hash(JSON.stringify(input));
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const old = this.db.prepare('SELECT * FROM receipts WHERE session=? AND operation=?').get(session, operation);
      if (old) {
        check(old.requestHash === requestHash, '操作 ID 已用于不同请求');
        this.db.exec('COMMIT'); return JSON.parse(old.result);
      }
      const result = execute();
      this.db.prepare('INSERT INTO receipts VALUES(?,?,?,?)').run(session, operation, requestHash, JSON.stringify(result));
      this.db.exec('COMMIT'); return result;
    } catch (error) { this.db.exec('ROLLBACK'); throw error; }
  }
  read(id, revision = this.project(id).revision) {
    if (revision === 0) return null;
    const row = this.db.prepare('SELECT * FROM revisions WHERE project=? AND revision=?').get(id, revision);
    check(row, '场景版本不存在');
    const bytes = readFileSync(this.dir(id, row.path));
    check(hash(bytes) === row.hash, '工程快照校验失败，请保留工程并从备份恢复');
    return validateScene(JSON.parse(bytes));
  }
  /** Called inside once(); a crash before pointer commit leaves an unreachable snapshot only. */
  commit(session, id, expected, scene, operation, confirmation = null, history = 'normal') {
    const p = this.assertWriter(session, id, expected);
    validateScene(scene);
    if(scene.design?.constraints)scene.design.quality=reviewDesign(scene,{}).quality;
    const revision = p.revision + 1;
    const key = `${revision}-${randomUUID()}`;
    const staging = this.dir(id, 'staging', key);
    mkdirSync(staging, { recursive: true, mode: 0o700 });
    const bytes = JSON.stringify(scene);
    durableFile(join(staging, 'scene.json'), bytes);
    mkdirSync(this.dir(id, 'revisions'), { recursive: true, mode: 0o700 });
    renameSync(staging, this.dir(id, 'revisions', key));
    if (process.platform !== 'win32') {
      const fd = openSync(this.dir(id, 'revisions'), 'r');
      try { fsyncSync(fd); } finally { closeSync(fd); }
    }
    const undo = JSON.parse(p.undo), redo = JSON.parse(p.redo);
    if (history === 'undo') { undo.pop(); redo.push(p.revision); }
    else if (history === 'redo') { redo.pop(); undo.push(p.revision); }
    else { if (p.revision > 0) undo.push(p.revision); redo.length = 0; }
    this.db.prepare('INSERT INTO revisions VALUES(?,?,?,?,?,?)').run(id, revision, `revisions/${key}/scene.json`, hash(bytes), operation, confirmation);
    this.db.prepare('UPDATE projects SET revision=?,undo=?,redo=? WHERE id=?').run(revision, JSON.stringify(undo), JSON.stringify(redo), id);
    return { projectId: id, revision, sceneHash: hash(bytes), saved: true };
  }
  history(session, id, expected, direction, operation) {
    return this.once(session, operation, { id, expected, direction }, () => {
      const p = this.assertWriter(session, id, expected);
      const stack = JSON.parse(p[direction]);
      check(stack.length, direction === 'undo' ? '没有可撤销的修改' : '没有可恢复的修改');
      return this.commit(session, id, expected, this.read(id, stack.at(-1)), operation, null, direction);
    });
  }
  select(session, id, revision, objectId, surfaceId) {
    this.assertWriter(session, id, revision);
    const scene = this.read(id);
    const o = scene?.objects.find(o => o.id === objectId);
    check(o, '对象不存在');
    check(o.type !== 'wall' || ['side-a', 'side-b'].includes(surfaceId), '请选择墙面一侧');
    const token = randomUUID();
    this.db.prepare('DELETE FROM selections WHERE session=? AND project=?').run(session, id);
    this.db.prepare('INSERT INTO selections VALUES(?,?,?,?,?,?)').run(token, id, session, revision, objectId, surfaceId ?? null);
    return this.selection(session, id, revision, token);
  }
  selection(session, id, revision, token) {
    const row = token
      ? this.db.prepare('SELECT * FROM selections WHERE token=?').get(token)
      : this.db.prepare('SELECT * FROM selections WHERE session=? AND project=? ORDER BY rowid DESC LIMIT 1').get(session, id);
    if (!token && !row) return null;
    check(row && row.session === session && row.project === id && row.revision === revision, '选择令牌已过期或不属于当前工程');
    return { token: row.token, revision, objectId: row.objectId, surfaceId: row.surfaceId };
  }
  confirmation(id, data) {
    const token = randomUUID();
    this.db.prepare('INSERT INTO confirmations VALUES(?,?,?)').run(token, id, JSON.stringify({ ...data, time: new Date().toISOString(), actor: 'local_user' }));
    return token;
  }
  /** Unknown children are retained; this is an inspection surface, never a cleanup sweep. */
  directories() { return readdirSync(this.root, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name); }
}
