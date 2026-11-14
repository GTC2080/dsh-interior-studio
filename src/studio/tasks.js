/** Background Blender work: building the 3D model and rendering images of a confirmed CAD. */
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile, readFile, rename, stat, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { hash } from '../store.js';
import { MATERIALS, check } from '../scene.js';
import { reviewDesign } from '../design-review.js';
import { requireConstraintsReady } from '../design-constraints.js';
import {
  modelFingerprint,
  cadFingerprint,
  viewFingerprint,
  meshScopeFingerprint,
} from '../design-fingerprints.js';
import { requireRenderAcceptance } from '../acceptance-scope.js';
import { DRAWING_LABELS, recommendedRenderViews, renderViewLabels } from '../design-views.js';
import { drawingSheets } from './drawings.js';
import { acceptedBrief } from './design.js';

/** Whether a task's CAD drawing set is complete and belongs to the given scene. */
export const validCadAudit = (detail, sceneHash) =>
  detail.cadAudit?.passed === true &&
  detail.cadAudit.sceneHash === sceneHash &&
  Array.isArray(detail.cadAudit.views) &&
  detail.cadAudit.views.length === 5 &&
  new Set(detail.cadAudit.views).size === 5 &&
  detail.cadAudit.views.every((v) => Object.hasOwn(DRAWING_LABELS, v)) &&
  /^[a-f0-9]{64}$/.test(detail.cadAudit.sha256) &&
  detail.files?.['plan.dxf']?.sha256 === detail.cadAudit.sha256;

/** Checks Blender already made for exactly this geometry and these views, so a review can reuse them. */
export function acceptanceEvidence(studio, id, scene) {
  const evidence = { views: [], supports: [] },
    seen = { views: new Set(), supports: new Set() };
  const modelHash = modelFingerprint(scene, MATERIALS),
    meshScopeHash = meshScopeFingerprint(scene),
    runtime = studio.runtime;
  for (const task of studio.store.db
    .prepare(
      "SELECT detail FROM tasks WHERE project=? AND state IN ('complete','failed') ORDER BY rowid DESC",
    )
    .iterate(id)) {
    const detail = JSON.parse(task.detail);
    if (detail.modelHash !== modelHash || detail.runtime !== runtime) continue;
    const append = (group, row) => {
      if (!seen[group].has(row.id)) {
        seen[group].add(row.id);
        evidence[group].push(row);
      }
    };
    if (detail.meshScopeHash === meshScopeHash)
      for (const row of detail.meshContactReview?.declaredSupports ?? []) append('supports', row);
    for (const view of detail.preflight?.views ?? [])
      if (
        detail.viewFingerprints?.[view.id] === viewFingerprint(scene, view.id, MATERIALS, runtime)
      )
        for (const row of view.fixedChecks ?? []) append('views', row);
  }
  return evidence;
}

/** The newest built model usable for a revision: built for it, or for identical geometry. */
export function readyModel(studio, id, revision, sceneHash) {
  const scene = studio.store.read(id, revision),
    fingerprint = modelFingerprint(scene, MATERIALS);
  for (const task of studio.store.db
    .prepare(
      "SELECT * FROM tasks WHERE project=? AND state='complete' AND json_type(detail,'$.files.\"scene.glb\"') IS NOT NULL ORDER BY rowid DESC",
    )
    .iterate(id)) {
    const detail = JSON.parse(task.detail);
    if (!detail.files?.['scene.glb'] || !detail.files?.['scene.blend'] || !detail.meshAudit?.passed)
      continue;
    const same = task.revision === revision && validCadAudit(detail, sceneHash);
    const reused =
      detail.modelHash === fingerprint &&
      detail.runtime === studio.runtime &&
      validCadAudit(detail, detail.cadAudit?.sceneHash);
    if (same || reused) return { ...task, detail };
  }
  return null;
}

/** Fails when the CAD the task froze is no longer the project's confirmed CAD. */
export function assertCurrentCad(studio, id, revision, sceneHash) {
  check(
    studio.store.project(id).revision === revision &&
      hash(JSON.stringify(studio.store.read(id, revision))) === sceneHash,
    'CAD 版本已变化，请重新生成三维',
  );
  const draft = studio.store.pending(id);
  check(
    draft?.type !== 'drawing' || draft.baseRevision !== revision,
    '当前 CAD 草案尚未确认，请先核对方案再建模或出图',
  );
}

/**
 * Builds the 3D model of the confirmed CAD, or renders images of a model that is already built.
 * Returns as soon as the task is queued. Blender then runs in the background, and the task row
 * records each phase and the final outcome.
 */
export function startBuild(studio, session, input, operation, render = false, execution) {
  const jobs = typeof studio.jobs === 'function' ? studio.jobs() : studio.jobs;
  check(!execution?.agent || jobs, '原生后台任务服务未加载，无法启动设计任务');
  const plan = planTask(studio, session, input, render);
  const receipt = queueTask(studio, session, operation, input, plan);
  const row = taskRow(studio, receipt.taskId);
  // A repeated request for a task that has already started only reports it.
  if (studio.running.has(receipt.taskId) || row.state !== 'queued')
    return { ...receipt, ...(row.detail.jobId ? { jobId: row.detail.jobId } : {}) };

  const task = {
    ...plan,
    taskId: receipt.taskId,
    quality: input.quality,
    resolution: renderResolution(render, input.quality),
    controller: new AbortController(),
    staging: studio.store.dir(plan.id, 'staging', receipt.taskId),
    output: studio.store.dir(plan.id, plan.folder, receipt.taskId),
    job: undefined, // The native DSH job, when a model tool started this task.
  };
  task.record = (state, detail) => {
    if (task.job && detail.phase) task.job.updateProgress(detail.phase);
    const saved = { ...detail, ...(task.job ? { jobId: task.job.id } : {}) };
    studio.store.db
      .prepare('UPDATE tasks SET state=?,detail=? WHERE id=?')
      .run(state, JSON.stringify(saved), task.taskId);
  };
  const start = () => {
    const done = runTask(studio, task);
    studio.running.set(task.taskId, { controller: task.controller, done, render });
    return done;
  };

  if (!jobs || !execution?.agent) {
    start();
    return receipt;
  }
  try {
    const jobId = jobs.start({
      kind: 'studio',
      owner: session,
      label: render ? '生成设计效果图' : '生成设计三维模型',
      outputLimitBytes: 4096,
      toolCall: { callId: execution.callId, rootCallId: execution.rootCallId ?? execution.callId },
      run: (handle) => {
        task.job = handle;
        return {
          cancel: () => task.controller.abort(),
          done: start().then(() => jobOutcome(studio, task)),
        };
      },
    });
    return { ...receipt, jobId };
  } catch (error) {
    task.record('failed', { render, message: '后台任务未启动：' + error.message });
    throw error;
  }
}

/** Checks that the confirmed CAD may be built or rendered now, and freezes what the task works on. */
function planTask(studio, session, input, render) {
  const id = studio.store.bound(session);
  check(id, '没有活动工程');
  const p = studio.store.project(id);
  check(input.projectId === undefined || input.projectId === id, '活动工程已变化，请重新操作');
  check(p.revision > 0 && p.revision === input.expectedRevision, '场景版本已变化');
  const draft = studio.store.pending(id);
  check(
    draft?.type !== 'drawing' || draft.baseRevision !== p.revision,
    '当前 CAD 草案尚未确认，请先核对方案再建模或出图',
  );
  const scene = studio.store.read(id, p.revision);
  const viewLabels = renderViewLabels(scene);
  const brief = acceptedBrief(studio, id);
  check(
    !brief || scene.design?.briefId === brief.briefId,
    '需求卡已更新，请先按最新需求修改并确认CAD，再建模或出图',
  );
  check(draft?.type !== 'brief', '需求卡尚未确认，请先处理当前需求');
  const views = render ? (input.views ?? recommendedRenderViews(scene)) : [];
  requireConstraintsReady(reviewDesign(scene, {}), render ? 'render' : 'cad');
  check(
    Array.isArray(views) &&
      (!render || views.length >= 1) &&
      views.length <= 12 &&
      new Set(views).size === views.length &&
      views.every((v) => Object.hasOwn(viewLabels, v)),
    '请选择1–12个不同的有效渲染视角',
  );
  const sceneHash = hash(JSON.stringify(scene));
  // A render starts from a model already built for this CAD.
  const builtModel = render ? readyModel(studio, id, p.revision, sceneHash) : null;
  if (render)
    check(builtModel, '请先生成当前版本的三维模型并核对（须先完成 CAD 图纸），再开始渲染');
  const folder = render ? 'renders' : 'builds';
  return { id, p, scene, sceneHash, views, viewLabels, builtModel, render, folder };
}

/** Records the task once per operation ID, so a repeated request cannot start a second one. */
function queueTask(studio, session, operation, input, { id, p, views, render }) {
  return studio.store.once(session, operation, { id, ...input, render }, () => {
    check(
      !render || ![...studio.running.values()].some((t) => t.render),
      '已有高清渲染任务，请完成或取消后重试',
    );
    const taskId = randomUUID();
    studio.store.db
      .prepare('INSERT INTO tasks VALUES(?,?,?,?,?)')
      .run(taskId, id, p.revision, 'queued', JSON.stringify({ render, requestedViews: views }));
    return { taskId, projectId: id, revision: p.revision, state: 'queued' };
  });
}

function taskRow(studio, taskId) {
  const row = studio.store.db.prepare('SELECT state,detail FROM tasks WHERE id=?').get(taskId);
  return { state: row.state, detail: JSON.parse(row.detail) };
}

const renderResolution = (render, quality) =>
  !render || quality === 'preview' ? [960, 720] : quality === '4k' ? [3840, 2160] : [1920, 1080];

/**
 * The background work of one task: CAD sheets, Blender, checks, then publishing the files.
 * Files appear in the project only after all of them exist and passed the checks.
 * It never throws; the outcome is recorded on the task.
 */
async function runTask(studio, task) {
  const { id, p, scene, sceneHash, views, render, controller, staging, output } = task;
  const request = { render, requestedViews: views };
  let published = false;
  try {
    task.record('running', {
      ...request,
      phase: render ? '核对 CAD 与三维版本' : '更新 CAD 图纸',
      started: new Date().toISOString(),
    });
    await mkdir(staging, { recursive: true, mode: 0o700 });
    const cad = await prepareCad(studio, task);
    controller.signal.throwIfAborted();
    assertCurrentCad(studio, id, p.revision, sceneHash); // Do not start Blender for an outdated CAD.

    task.record('running', {
      ...request,
      cadAudit: cad.audit,
      phase: render ? '渲染效果图' : '生成三维模型',
    });
    const result = await runBlender(studio, task, cad);
    rejectFailedChecks(task, result);
    controller.signal.throwIfAborted();

    const files = await collectFiles(studio, task, result, cad);
    await writeFile(
      join(staging, 'manifest.json'),
      JSON.stringify({ ...result, files, cadAudit: cad.audit, sceneHash }, null, 2),
      { flag: 'wx', mode: 0o600 },
    );
    await mkdir(studio.store.dir(id, task.folder), { recursive: true, mode: 0o700 });
    controller.signal.throwIfAborted();
    assertCurrentCad(studio, id, p.revision, sceneHash); // Do not publish a result for an outdated CAD.
    await rename(staging, output);
    published = true;
    task.record('complete', completedDetail(studio, task, result, cad, files));
  } catch (error) {
    const state = controller.signal.aborted ? 'cancelled' : 'failed';
    try {
      await rm(published ? output : staging, { recursive: true, force: true });
    } catch (cleanupError) {
      const message = error.message + '；未完成产物清理失败：' + cleanupError.message;
      task.record('failed', { render, message });
      return;
    }
    task.record(state, {
      ...request,
      message: error.message,
      ...outputIdentity(studio, scene),
      viewFingerprints: viewFingerprints(studio, scene, views),
      ...(error.preflight ? { preflight: error.preflight } : {}),
      ...(error.meshContactReview ? { meshContactReview: error.meshContactReview } : {}),
    });
  } finally {
    studio.running.delete(task.taskId);
  }
}

/** The CAD drawing set the model must match: the built model's own set if still valid, else drawn now. */
async function prepareCad(studio, task) {
  const { id, p, scene, sceneHash, render, builtModel, controller, staging } = task;
  const reusable =
    render &&
    (builtModel.detail.cadFingerprint === cadFingerprint(scene) ||
      validCadAudit(builtModel.detail, sceneHash));
  if (reusable)
    return {
      audit: builtModel.detail.cadAudit,
      path: studio.store.dir(id, builtModel.detail.relativePath, 'plan.dxf'),
      drawnNow: false,
    };
  const sheets = await drawingSheets(studio, { id, p, scene }, false, controller.signal);
  await studio.engine.request(
    { action: 'drawing-sheets', scene, sheets, output: staging },
    controller.signal,
  );
  const path = join(staging, 'plan.dxf');
  await rename(join(staging, 'drawings.dxf'), path);
  const bytes = await readFile(path);
  check(bytes.length > 0 && bytes.length <= 20 * 1024 * 1024, 'CAD 图册为空或超过预算');
  const audit = {
    passed: true,
    sceneHash,
    views: Object.keys(DRAWING_LABELS),
    sha256: hash(bytes),
    sheetsHash: hash(JSON.stringify(sheets)),
  };
  return { audit, path, drawnNow: true };
}

/** Builds the model, or renders the requested views from the built model's blend file. */
function runBlender(studio, task, cad) {
  const { id, p, scene, views, render, builtModel } = task;
  const source = render
    ? {
        blendPath: studio.store.dir(id, builtModel.detail.relativePath, 'scene.blend'),
        blendHash: builtModel.detail.files['scene.blend'].sha256,
      }
    : {};
  return studio.engine.request(
    {
      action: render ? 'render-existing' : 'build',
      scene,
      materials: MATERIALS,
      revision: p.revision,
      ...source,
      output: task.staging,
      cadPath: cad.path,
      cadHash: cad.audit.sha256,
      resourceRoot: studio.store.dir(id, 'resources'),
      render,
      views,
      resolution: task.resolution,
      samples: render && task.quality === '4k' ? 96 : 48,
    },
    task.controller.signal,
    render,
    (phase) =>
      task.record('running', { render, requestedViews: views, cadAudit: cad.audit, phase }),
  );
}

/** Blender finished, but its own checks may show that the result must not be published. */
function rejectFailedChecks({ scene, views, render }, result) {
  if (render) requireRenderAcceptance(scene, result, views);
  const contacts = result.meshContactReview;
  const failedContacts = (contacts?.declaredContacts ?? []).filter((r) => r.status === 'fail');
  if (failedContacts.length || contacts?.duplicateGeometry?.length) {
    const error = new Error(
      '实际网格存在未满足的指定接触或重复实体，请先修正CAD/模型：' +
        failedContacts.map((r) => r.id).join('、'),
    );
    error.meshContactReview = contacts;
    throw error;
  }
  if (result.preflight?.status === 'fail') {
    const failedViews = result.preflight.views.filter((v) => v.status === 'fail');
    const error = new Error(
      '出图前检查未通过：' + failedViews.map((v) => v.id + ' ' + v.failures.join('/')).join('；'),
    );
    error.preflight = result.preflight;
    throw error;
  }
}

/** Size and hash of every file the task must have produced. */
async function collectFiles(studio, task, result, cad) {
  const { id, views, render, taskId } = task;
  const images = views.map((view, i) => ({
    id: view,
    file: i === 0 ? 'render.png' : `render-${view}.png`,
  }));
  check(
    !render ||
      (Array.isArray(result.views) &&
        result.views.length === images.length &&
        images.every((v, i) => result.views[i].id === v.id && result.views[i].file === v.file)),
    '引擎未返回完整的视角集合',
  );
  const modelFiles = render
    ? cad.drawnNow
      ? ['plan.dxf']
      : []
    : ['plan.dxf', 'scene.blend', 'scene.glb'];
  const files = {};
  for (const filename of [...modelFiles, ...images.map((v) => v.file)]) {
    const path = studio.store.dir(id, 'staging', taskId, filename);
    const file = await stat(path);
    check(file.isFile() && file.size > 0, '引擎产物不完整');
    files[filename] = { bytes: file.size, sha256: hash(await readFile(path)) };
  }
  check(
    !files['plan.dxf'] || files['plan.dxf'].sha256 === cad.audit.sha256,
    'CAD 图册与建模记录不一致，未发布产物',
  );
  return files;
}

/** What identifies the geometry an output belongs to, so later reviews can reuse or reject it. */
const outputIdentity = (studio, scene) => ({
  modelHash: modelFingerprint(scene, MATERIALS),
  meshScopeHash: meshScopeFingerprint(scene),
  runtime: studio.runtime,
});

const viewFingerprints = (studio, scene, views) =>
  Object.fromEntries(
    views.map((view) => [view, viewFingerprint(scene, view, MATERIALS, studio.runtime)]),
  );

/** The record of a published task: its files, what they were made from, and Blender's checks. */
function completedDetail(studio, task, result, cad, files) {
  const { scene, sceneHash, views, viewLabels, render, builtModel, taskId } = task;
  const renderSource = render
    ? {
        sourceModelTask: builtModel.id,
        sourceModelRevision: builtModel.revision,
        cadSourceTask: cad.drawnNow ? taskId : builtModel.id,
        viewFingerprints: viewFingerprints(studio, scene, views),
      }
    : {};
  return {
    render,
    requestedViews: views,
    views: result.views?.map((v) => ({ ...v, label: viewLabels[v.id] })),
    files,
    relativePath: `${task.folder}/${taskId}`,
    resolution: task.resolution,
    cadAudit: cad.audit,
    backend: result.backend,
    presentation: result.presentation,
    preflight: result.preflight,
    meshContactReview: result.meshContactReview ?? builtModel?.detail.meshContactReview,
    sceneHash,
    ...outputIdentity(studio, scene),
    cadFingerprint: cadFingerprint(scene),
    ...renderSource,
    meshAudit: meshAudit(scene, result),
    completed: new Date().toISOString(),
  };
}

/** Summary of Blender's check that every object's mesh sits where the CAD places it. */
function meshAudit(scene, result) {
  const { poseAudit, componentAudit, importedAudit } = result;
  if (!poseAudit) return undefined;
  const hasImportedModels = scene.objects.some((o) => o.type === 'model');
  const componentsChecked = componentAudit?.objects.length ?? 0;
  const importedChecked = importedAudit?.objects.length ?? 0;
  return {
    basis: poseAudit.basis,
    passed:
      poseAudit.passed &&
      (componentAudit?.passed ?? true) &&
      (importedAudit?.passed ?? !hasImportedModels),
    checked: poseAudit.objects.length + componentsChecked + importedChecked,
    assetsChecked: poseAudit.objects.length,
    componentsChecked,
    importedChecked,
  };
}

/** What the native DSH job reports to the model when the task ends. */
function jobOutcome(studio, task) {
  const { state, detail } = taskRow(studio, task.taskId);
  return {
    status: state === 'complete' ? 'completed' : state === 'cancelled' ? 'killed' : 'failed',
    detail: detail.message,
    result: JSON.stringify({
      taskId: task.taskId,
      revision: task.p.revision,
      state,
      views: detail.views?.map((v) => ({ id: v.id, file: v.file })),
      message: detail.message,
      instruction: '生成状态不等于质量验收；读取相关检查和实际图片，修复后再交付。',
    }),
  };
}

/** One published file of a completed task, for download or display. */
export async function artifact(studio, session, input) {
  const id = studio.store.bound(session);
  check(id, '没有活动工程');
  const task = studio.store.db
    .prepare('SELECT * FROM tasks WHERE id=? AND project=?')
    .get(input.taskId, id);
  check(
    !['cleaning', 'removed'].includes(task?.state),
    '该派生文件已清理或正在清理；可编辑源版本仍保留，可重新生成',
  );
  check(task?.state === 'complete', '任务尚未完成');
  const detail = JSON.parse(task.detail);
  check(
    typeof input.file === 'string' &&
      /^(plan\.dxf|scene\.(glb|blend|json)|manifest\.json|render(?:-[A-Za-z][A-Za-z0-9_-]{0,49})?\.png)$/.test(
        input.file,
      ),
    '不支持的工程输出',
  );
  check(
    ['manifest.json', 'scene.json'].includes(input.file) ||
      Object.hasOwn(detail.files ?? {}, input.file),
    '该任务没有此视角或文件',
  );
  if (input.file === 'scene.json')
    return Buffer.from(JSON.stringify(studio.store.read(id, task.revision), null, 2));
  return readFile(studio.store.dir(id, detail.relativePath, input.file));
}
