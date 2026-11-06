/** Private Blender lifetime and bounded NDJSON protocol over DSH subprocess pipes. */
import { createHash, randomUUID } from 'node:crypto';
import { readFile, lstat, realpath, readlink, readdir, mkdir, rm } from 'node:fs/promises';
import { StringDecoder } from 'node:string_decoder';
import { join, resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { check } from './scene.js';
import { localPath } from './store.js';

export const PACKAGE_ROOT = fileURLToPath(new URL('../', import.meta.url));

export async function verifyRuntime(root = PACKAGE_ROOT) {
  const manifest = JSON.parse(await readFile(join(root, 'runtime/manifest.json'), 'utf8'));
  check(manifest.formatVersion===1 && Array.isArray(manifest.entries), '运行时清单格式无效');
  check(manifest.platform === process.platform && manifest.arch === process.arch, '插件包架构不匹配；不会下载或借用系统 Blender');
  const declared=new Set(manifest.entries.map(e=>e.path));
  const inventory=async directory=>{
    for(const entry of await readdir(join(root,directory),{withFileTypes:true})) {
      const path=directory+'/'+entry.name;
      if(directory.startsWith('assets') && entry.name==='.DS_Store')continue;
      if(entry.isDirectory())await inventory(path);
      else check(declared.has(path),`运行载荷含未登记文件：${path}`);
    }
  };
  await inventory('runtime/Blender.app');await inventory('runtime/vendor');
  const assets=await lstat(join(root,'assets')).catch(error=>{if(error.code!=='ENOENT')throw error;return null;});
  if(assets) {
    check(assets.isDirectory(),'本地素材库必须是实际目录');
    await inventory('assets');
  }
  for (const entry of manifest.entries) {
    check(!isAbsolute(entry.path) && !entry.path.split('/').includes('..'), '运行时清单路径无效');
    if(!assets && entry.path.startsWith('assets/'))continue;
    const path = join(root, entry.path);
    const stat = await lstat(path);
    if (entry.link !== undefined) {
      check(stat.isSymbolicLink(), '运行时符号链接损坏');
      check(await readlink(path) === entry.link, '运行时链接目标已变化');
      const resolved = await realpath(path);
      const rel = relative(join(root, 'runtime'), resolved);
      check(!isAbsolute(rel) && rel !== '..' && !rel.startsWith('../'), '运行时链接越出私有载荷');
    } else {
      check(stat.isFile() && stat.size === entry.bytes, `运行时文件损坏：${entry.path}`);
      const actual = createHash('sha256').update(await readFile(path)).digest('hex');
      check(actual === entry.sha256, `运行时校验失败：${entry.path}`);
      if (entry.executable && process.platform !== 'win32') check((stat.mode & 0o111) !== 0, '运行时可执行权限丢失');
    }
  }
  check(manifest.entries.some(e => e.path === manifest.executable), '清单未包含 Blender 主程序');
  return manifest;
}

class Worker {
  constructor(subprocess, manifest, workspace, cache, timeoutMs) {
    this.pending = new Map(); this.buffer = ''; this.closed = false;
    const decoder = new StringDecoder('utf8');
    let readyResolve, readyReject;
    this.ready = new Promise((res, rej) => { readyResolve = res; readyReject = rej; });
    this.handle = subprocess.spawn({
      argv: [join(PACKAGE_ROOT, manifest.executable), '--background', '--factory-startup', '--disable-autoexec',
        '--python-exit-code', '17', '--python', join(PACKAGE_ROOT, 'worker/worker.py'), '--',
        '--workspace', workspace, '--vendor', join(PACKAGE_ROOT, 'runtime/vendor')],
      cwd: cache, stdio: { stdin: 'pipe', stdout: 'pipe', stderr: { maxBytes: 65536 } }, graceMs: 2000,
      env: { PYTHONPATH: undefined, PYTHONHOME: undefined, PYTHONSTARTUP: undefined,
        PYTHONNOUSERSITE: '1', PYTHONDONTWRITEBYTECODE: '1',
        BLENDER_USER_CONFIG: join(cache, 'config'), BLENDER_USER_SCRIPTS: join(cache, 'scripts'),
        BLENDER_USER_EXTENSIONS: join(cache, 'extensions'), XDG_CACHE_HOME: join(cache, 'cache'), },
    });
    this.handle.stdout.on('data', chunk => {
      this.buffer += decoder.write(chunk);
      if (this.buffer.length > 8 * 1024 * 1024) {
        this.closed = true; this.fail(new Error('引擎输出超过预算')); this.handle.terminate(); return;
      }
      let at;
      while ((at = this.buffer.indexOf('\n')) !== -1) {
        const line = this.buffer.slice(0, at); this.buffer = this.buffer.slice(at + 1);
        if (!line.startsWith('@interior ')) continue;
        try {
          const frame = JSON.parse(line.slice(10));
          if (frame.ready) readyResolve(frame);
          else {
            const job = this.pending.get(frame.id);
            if (job) {
              if(typeof frame.progress==='string'&&frame.progress.length<=200)job.onProgress?.(frame.progress);
              else {this.pending.delete(frame.id);frame.ok?job.resolve(frame.value):job.reject(new Error(frame.error));}
            }
          }
        } catch (error) { this.fail(error); this.handle.terminate(); }
      }
    });
    const readyTimer = setTimeout(() => { readyReject(new Error('Blender 启动超时')); this.handle.terminate(); }, timeoutMs);
    this.ready.then(() => clearTimeout(readyTimer), () => clearTimeout(readyTimer));
    this.exit = this.handle.done.then(result => {
      const tail = this.handle.collected.stderr?.readFrom(0).text.slice(-1000) ?? '';
      const error = new Error(`Blender 已退出 (${result.exitCode ?? result.signal}) ${tail}`);
      readyReject(error); this.fail(error); this.closed = true;
    }, error => { readyReject(error); this.fail(error); this.closed = true; });
  }
  fail(error) { for (const p of this.pending.values()) p.reject(error); this.pending.clear(); }
  async request(command, signal, timeoutMs, onProgress) {
    await this.ready;
    check(!this.closed, 'Blender Worker 已关闭');
    signal?.throwIfAborted();
    const id = randomUUID();
    const bytes = JSON.stringify({ ...command, id }) + '\n';
    check(Buffer.byteLength(bytes) <= 8 * 1024 * 1024, '场景超过 Worker 消息预算');
    const wait = new Promise((resolve, reject) => this.pending.set(id, { resolve, reject, onProgress }));
    const abort = () => {
      const job = this.pending.get(id);
      if (job) { this.pending.delete(id); job.reject(new Error('操作已取消或超时，已保存版本保留')); }
      this.closed = true; this.handle.terminate();
    };
    const timer = setTimeout(abort, timeoutMs);
    signal?.addEventListener('abort', abort, { once: true });
    try {
      this.handle.stdin.write(bytes);
      return await wait;
    } finally {
      clearTimeout(timer); signal?.removeEventListener('abort', abort);
      if (!this.pending.has(id) && (signal?.aborted || this.closed)) await this.stop();
    }
  }
  async stop() {
    this.handle.terminate();
    await this.exit;
    check(await this.handle.waitForExit(AbortSignal.timeout(10000)), '无法确认 Blender 子进程已停止');
    this.closed = true;
    if(this.cache)await rm(this.cache,{recursive:true,force:true});
  }
}

export class Engine {
  constructor(subprocess, manifest, workspace, options) {
    this.subprocess = subprocess; this.manifest = manifest; this.workspace = workspace;
    this.options = options; this.workers = new Set(); this.queue = Promise.resolve(); this.disposed = false;
  }
  async newWorker(signal) {
    check(!this.disposed, '引擎已卸载');
    signal?.throwIfAborted();
    const cache = localPath(this.workspace, '.engine', this.manifest.blenderVersion, randomUUID());
    await mkdir(cache, { recursive: true, mode: 0o700 });
    await Promise.all(['config','scripts','extensions','cache'].map(name=>mkdir(join(cache,name),{mode:0o700})));
    check(!this.disposed, '引擎已卸载');
    const worker = new Worker(this.subprocess, this.manifest, this.workspace, cache, this.options.startupTimeoutMs);
    worker.cache=cache;
    this.workers.add(worker);
    const abort = () => { worker.closed = true; worker.handle.terminate(); };
    signal?.addEventListener('abort', abort, { once: true });
    try { if (signal?.aborted) abort(); await worker.ready; signal?.throwIfAborted(); }
    catch (error) { await worker.stop(); this.workers.delete(worker); throw error; }
    finally { signal?.removeEventListener('abort', abort); }
    return worker;
  }
  /** One serialized editor; frozen renders get an independent process. */
  request(command, signal, render = false, onProgress) {
    const execute = async () => {
      check(!this.disposed, '引擎已卸载');
      const worker = render ? await this.newWorker(signal)
        : this.editor && !this.editor.closed ? this.editor : (this.editor = await this.newWorker(signal));
      try { return await worker.request(command, signal, render ? this.options.renderTimeoutMs : this.options.commandTimeoutMs,onProgress); }
      finally { if (render || worker.closed) { await worker.stop(); this.workers.delete(worker);if(this.editor===worker)this.editor=undefined; } }
    };
    if (render) return execute();
    const job = this.queue.then(execute);
    this.queue = job.catch(() => {}); // Queue continuity; the requesting caller receives the failure.
    return job;
  }
  async dispose() {
    this.disposed = true;
    const results = await Promise.allSettled([...this.workers].map(worker => worker.stop()));
    const failed = results.find(r => r.status === 'rejected');
    if (failed) throw failed.reason;
    this.workers.clear();
  }
}
