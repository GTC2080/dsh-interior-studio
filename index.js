/** Native Host entry. Every request uses DSH's authenticated Connection transport. */
import Schema from '@deepseek-ai/schemastery';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { Engine, verifyRuntime } from './src/engine.js';
import { Studio } from './src/studio.js';

export const name = 'interior-studio';
export const inject = ['connection', 'subprocess', 'llm', 'agents'];
export const Config = Schema.object({
  projectRoot: Schema.string().default(join(homedir(), 'DSH Interior Projects')),
  startupTimeoutMs: Schema.natural().min(1000).default(30000),
  commandTimeoutMs: Schema.natural().min(1000).default(120000),
  renderTimeoutMs: Schema.natural().min(1000).default(900000),
});

export async function apply(ctx, config) {
  const manifest = await verifyRuntime();
  await mkdir(config.projectRoot, { recursive: true, mode: 0o700 });
  const engine = new Engine(ctx.subprocess, manifest, config.projectRoot, config);
  const studio = new Studio(config.projectRoot, engine, session => ctx.agents.get(session)?.status === 'running',()=>ctx.get('jobs'));
  studio.store.claimHost();
  engine.workspace = studio.store.root;
  const unprovide = ctx.reflect.provide('interiorStudio', studio);
  ctx.effect(() => async () => { await studio.dispose(); unprovide(); });
  ctx.on('llm/stream', async function* (options, next) {
    studio.beforeModelRequest(options);
    yield* next();
  });
  ctx.effect(() => ctx.connection.fetch.register({ path: '/api/interior-studio', methods: ['POST'], requestBody: 'buffered', async fetch(request) {
    let result;
    try {
      const payload = await request.json();
      if (!payload || typeof payload.sessionId !== 'string' || payload.sessionId.length > 200
        || !payload.sessionId || typeof payload.operationId !== 'string' || !payload.operationId || payload.operationId.length > 200
        || typeof payload.input !== 'object' || payload.input === null || Array.isArray(payload.input)) throw new Error('无效的工程请求');
      const value = await studio.ui(payload.sessionId, payload.action, payload.input, payload.operationId, request.signal);
      result = { ok: true, value };
    } catch (error) { result = { ok: false, error: { code: 'interior/action-failed', message: error.message, details: {} } }; }
    return Response.json(result, { headers: { 'cache-control': 'no-store' } });
  } }));
  ctx.effect(() => ctx.connection.fetch.register({ path: '/api/interior-studio/projects', methods: ['POST'], requestBody: 'buffered', async fetch(request) {
    let result;
    try {
      const payload = await request.json();
      if (!payload || typeof payload.operationId !== 'string' || !payload.operationId || payload.operationId.length > 200
        || typeof payload.input !== 'object' || payload.input === null || Array.isArray(payload.input)) throw new Error('无效的工程管理请求');
      result = { ok: true, value: studio.manage(payload.action, payload.input, payload.operationId) };
    } catch (error) { result = { ok: false, error: { code: 'interior/project-action-failed', message: error.message, details: {} } }; }
    return Response.json(result, { headers: { 'cache-control': 'no-store' } });
  } }));
}
