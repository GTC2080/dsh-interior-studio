/** Native Host entry. Every request uses DSH's authenticated Connection transport. */
import Schema from '@deepseek-ai/schemastery';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { Engine, loadRuntime } from './src/engine.js';
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
  const manifest = await loadRuntime();
  await mkdir(config.projectRoot, { recursive: true, mode: 0o700 });
  const engine = new Engine(ctx.subprocess, manifest, config.projectRoot, config);
  const studio = new Studio(
    config.projectRoot,
    engine,
    (session) => ctx.agents.get(session)?.status === 'running',
    () => ctx.get('jobs'),
  );
  let unprovide;
  try {
    studio.store.claimHost();
    engine.workspace = studio.store.root;
    await engine.clearStaleCaches().catch(() => {}); // Leftovers only cost disk space.
    unprovide = ctx.reflect.provide('interiorStudio', studio);
  } catch (error) {
    studio.store.close();
    throw error;
  } // Nothing owns the open database until the effect below exists.
  ctx.effect(() => async () => {
    try {
      await studio.dispose();
    } finally {
      unprovide();
    }
  });
  ctx.on('llm/stream', async function* (options, next) {
    studio.beforeModelRequest(options);
    yield* next();
  });
  ctx.effect(() =>
    endpoint(ctx, '/api/interior-studio', 'interior/action-failed', true, (payload, signal) =>
      studio.ui(payload.sessionId, payload.action, payload.input, payload.operationId, signal),
    ),
  );
  ctx.effect(() =>
    endpoint(
      ctx,
      '/api/interior-studio/projects',
      'interior/project-action-failed',
      false,
      (payload) => studio.manage(payload.action, payload.input, payload.operationId),
    ),
  );
}

/** A POST endpoint for the side panel. The request envelope is checked here, once, for every action. */
function endpoint(ctx, path, errorCode, needsSession, run) {
  const isId = (value) => typeof value === 'string' && value.length > 0 && value.length <= 200;
  return ctx.connection.fetch.register({
    path,
    methods: ['POST'],
    requestBody: 'buffered',
    async fetch(request) {
      let result;
      try {
        const payload = await request.json();
        const valid =
          payload &&
          isId(payload.operationId) &&
          (!needsSession || isId(payload.sessionId)) &&
          typeof payload.input === 'object' &&
          payload.input !== null &&
          !Array.isArray(payload.input);
        if (!valid) throw new Error('无效的工程请求');
        result = { ok: true, value: await run(payload, request.signal) };
      } catch (error) {
        result = { ok: false, error: { code: errorCode, message: error.message, details: {} } };
      }
      return Response.json(result, { headers: { 'cache-control': 'no-store' } });
    },
  });
}
