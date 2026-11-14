/** Drawing sheets, the draft preview and exports. Nothing here changes the project. */
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { hash } from '../store.js';
import { MATERIALS, check } from '../scene.js';
import { cadFingerprint } from '../design-fingerprints.js';
import { resolveScope, reviewScopeDeclarations } from '../acceptance-scope.js';
import { componentSchedule } from '../component-schedule.js';
import { sheetSvg } from '../drafting.js';
import { DRAFT_PREVIEW_VIEWS, DRAWING_LABELS, ALL_DRAWING_LABELS } from '../design-views.js';
import { drawingSheet, lineStyle, meshDrawingGeometry, needsMeshElevation } from '../drafting.js';
import { setImmediate as yieldToLoop } from 'node:timers/promises';
import { key } from '../refinement.js';
import { modelAllowed, disclose } from './access.js';
import { context } from './overview.js';
import { readyModel, validCadAudit } from './tasks.js';

export function drawingSource(studio, session, input) {
  const id = studio.store.bound(session);
  check(id, '请先打开工程');
  const p = studio.store.project(id);
  check(input.expectedRevision === p.revision, '工程版本已变化，请刷新图纸后重试');
  let scene;
  if (input.drawingId !== undefined) {
    const draft = studio.store.pending(id);
    check(
      draft?.type === 'drawing' &&
        draft.drawingId === input.drawingId &&
        draft.baseRevision === p.revision,
      'CAD 草案已变化，请刷新后重试',
    );
    scene = draft.scene;
  } else scene = studio.store.read(id);
  check(scene, '没有可导出的图纸');
  return { id, p, scene };
}

export function draftPreview(studio, session, input, signal, model = false) {
  return studio.trackCad(prepareDraftPreview(studio, session, input, signal, model));
}

/**
 * Has Blender build the draft's real meshes and reports where the chosen objects are and whether
 * their declared contacts hold. The panel also gets a picture; the model gets only the numbers.
 */
export async function prepareDraftPreview(studio, session, input, signal, model) {
  signal?.throwIfAborted();
  check(typeof input.drawingId === 'string', '请提供当前 CAD 草案编号');
  const { id, p, scene } = drawingSource(studio, session, input);
  const route = studio.routes.get(session);
  if (model) check(modelAllowed(studio, session, id), '请先授权当前模型读取工程摘要');
  const { scope, view, selected } = previewTarget(scene, input);
  const { context, supports, relations } = declarationsAbout(scene, selected);
  check(!studio.previewing, '正在生成另一份草案预览，请稍后重试');
  const output = model ? undefined : studio.store.dir(id, 'staging', 'preview-' + randomUUID());
  const deadline = AbortSignal.timeout(30_000),
    workSignal = signal ? AbortSignal.any([signal, deadline]) : deadline;
  studio.previewing = true;
  try {
    if (output) await mkdir(output, { recursive: true, mode: 0o700 });
    const result = await studio.engine.request(
      {
        action: 'draft-preview',
        scene,
        materials: MATERIALS,
        resourceRoot: studio.store.dir(id, 'resources'),
        selected: [...selected],
        context: [...context],
        view,
        supports,
        relations,
        ...(output ? { output } : {}),
      },
      workSignal,
    );
    const bytes = output ? await readFile(join(output, 'preview.png')) : null;
    workSignal.throwIfAborted();
    if (model) {
      check(
        studio.routes.get(session) === route && modelAllowed(studio, session, id),
        '模型或授权已变化，请重新核对后再读取',
      );
      disclose(studio, session, id);
    }
    return {
      ...result,
      projectId: id,
      revision: p.revision,
      drawingId: input.drawingId,
      view,
      selectedCount: selected.size,
      contextCount: context.size - selected.size,
      scope,
      ...(bytes ? { base64: bytes.toString('base64') } : {}),
    };
  } catch (error) {
    if (deadline.aborted && !signal?.aborted)
      throw new Error('草案预览超时，请选择更小的范围后重试');
    throw error;
  } finally {
    try {
      if (output) await rm(output, { recursive: true, force: true });
    } finally {
      studio.previewing = false;
    }
  }
}

/** Which objects to preview (some keys, one assembly, or everything) and from which view. */
function previewTarget(scene, input) {
  check(input.keys === undefined || input.assembly === undefined, '请只选对象或组合中的一种');
  check(
    input.keys === undefined || (Array.isArray(input.keys) && input.keys.length <= 32),
    '单次最多预览32个指定对象',
  );
  const scope =
    input.assembly !== undefined
      ? { scope: 'assembly', assembly: input.assembly }
      : input.keys !== undefined
        ? { keys: input.keys }
        : { scope: 'scene' };
  const { objects, missing } = resolveScope(scene, scope);
  check(objects.length && !missing.length, '草案中的预览对象或组合不存在');
  const view = input.view ?? 'overview',
    camera = scene.presentation?.cameras.find((c) => c.key === view);
  check(
    typeof view === 'string' && (Object.hasOwn(DRAFT_PREVIEW_VIEWS, view) || camera),
    '请选择草案的有效预览视角',
  );
  return { scope, view, selected: new Set(objects.map((o) => o.id)) };
}

/**
 * The saved contact and support requirements that involve the selected objects, and `context`:
 * the selection plus every other object those requirements name, which Blender must build too.
 */
function declarationsAbout(scene, selected) {
  const context = new Set(selected);
  const fixed = scene.design?.constraints ?? {};
  const supportIds = new Set();
  for (const row of reviewScopeDeclarations(scene, fixed).supports) {
    const involved = [...row.resolvedIds, ...row.anchorIds, ...row.viaIds];
    if (involved.some((key) => selected.has(key))) {
      supportIds.add(row.id);
      for (const key of involved) context.add(key);
    }
  }
  const byKey = new Map(
    scene.objects.flatMap((o) => [[o.id, o.id], ...(o.origin?.key ? [[o.origin.key, o.id]] : [])]),
  );
  const relations = (fixed.relations ?? []).filter((row) => {
    const involved = [byKey.get(row.a), byKey.get(row.b)].filter(Boolean);
    if (!involved.some((key) => selected.has(key))) return false;
    for (const key of involved) context.add(key);
    return true;
  });
  const supports = (fixed.supports ?? []).filter((row) => supportIds.has(row.id));
  return { context, supports, relations };
}

export async function makeDrawingSheet(studio, { id, p, scene }, view, draft, signal, cutAt) {
  check(Object.hasOwn(ALL_DRAWING_LABELS, view), '未知图纸视图');
  signal?.throwIfAborted();
  const geometry = needsMeshElevation(scene, view)
    ? meshDrawingGeometry(
        await studio.engine.request(
          {
            action: 'drawing-elevation',
            scene,
            materials: MATERIALS,
            resourceRoot: studio.store.dir(id, 'resources'),
            view,
            cutAt,
          },
          signal,
        ),
        scene,
        view,
      )
    : undefined;
  signal?.throwIfAborted();
  return drawingSheet(scene, view, { name: p.name, revision: p.revision, draft, geometry });
}

export async function drawingPage(studio, session, input, signal) {
  const source = drawingSource(studio, session, input);
  const { geometry, ...sheet } = await makeDrawingSheet(
    studio,
    source,
    input.view,
    !!input.drawingId,
    signal,
    input.cutAt,
  );
  return {
    sheet,
    revision: source.p.revision,
    ...(input.drawingId ? { drawingId: input.drawingId } : {}),
    geometryBasis: geometry.basis,
  };
}

export async function drawingSheets(studio, source, draft, signal, includeSections = false) {
  const sheets = [];
  for (const view of Object.keys(includeSections ? ALL_DRAWING_LABELS : DRAWING_LABELS)) {
    signal?.throwIfAborted();
    const { geometry, ...sheet } = await makeDrawingSheet(studio, source, view, draft, signal);
    sheet.styles = Object.fromEntries(
      [...new Set(sheet.lines.map((l) => l.kind).concat(sheet.paths.map((l) => l.kind)))].map(
        (kind) => [kind, lineStyle(kind)],
      ),
    );
    sheets.push(sheet);
    await yieldToLoop();
  }
  return sheets;
}

export async function drawingSet(studio, session, input, signal) {
  const source = drawingSource(studio, session, input),
    { id, p, scene } = source;
  const output = studio.store.dir(id, 'staging', 'drawing-set-' + randomUUID());
  try {
    const sheets = await drawingSheets(
      studio,
      source,
      !!input.drawingId,
      signal,
      input.includeSections === true,
    );
    await mkdir(output, { recursive: true, mode: 0o700 });
    await studio.engine.request({ action: 'drawing-sheets', scene, sheets, output }, signal);
    signal?.throwIfAborted();
    const bytes = await readFile(join(output, 'drawings.dxf'));
    check(bytes.length > 0 && bytes.length <= 20 * 1024 * 1024, '图纸图册为空或超过 20 MiB');
    return {
      base64: bytes.toString('base64'),
      filename: `${p.name}-v${p.revision}${input.drawingId ? '-草案' : ''}-图纸图册.dxf`,
      revision: p.revision,
      views: sheets.map((s) => s.view),
      sceneHash: hash(JSON.stringify(scene)),
    };
  } finally {
    await rm(output, { recursive: true, force: true });
  }
}

export async function exportDesign(studio, session, input, signal, model = false) {
  if (model) {
    const id = studio.store.bound(session);
    check(id, '请先打开工程');
    check(modelAllowed(studio, session, id), '工程未授权当前模型读取');
    disclose(studio, session, id);
  }
  const source = drawingSource(studio, session, input),
    { id, p, scene } = source;
  const metadata = {
    projectId: id,
    revision: p.revision,
    sceneHash: hash(JSON.stringify(scene)),
    draft: !!input.drawingId,
  };
  if (input.format === 'schedule')
    return {
      ...metadata,
      csv: componentSchedule(scene, { name: p.name, revision: p.revision, materials: MATERIALS }),
      filename: `${p.name}-v${p.revision}-设计构件清单.csv`,
    };
  if (input.format === 'svg') {
    const { geometry, ...sheet } = await makeDrawingSheet(
      studio,
      source,
      input.view ?? 'plan',
      !!input.drawingId,
      signal,
      input.cutAt,
    );
    return {
      ...metadata,
      view: sheet.view,
      svg: sheetSvg(sheet),
      geometryBasis: geometry.basis,
      filename: `${p.name}-v${p.revision}-${sheet.label}.svg`,
    };
  }
  check(
    input.format === 'dxf' && !input.drawingId,
    'DXF路径导出仅适用于已确认当前工程；草案使用SVG核对',
  );
  const ready = readyModel(studio, id, p.revision, metadata.sceneHash);
  check(
    ready &&
      (ready.detail.cadFingerprint === cadFingerprint(scene) ||
        validCadAudit(ready.detail, metadata.sceneHash)),
    '请先完成当前CAD图册，再导出正式DXF',
  );
  return {
    ...metadata,
    path: studio.store.dir(id, ready.detail.relativePath, 'plan.dxf'),
    sha256: ready.detail.files['plan.dxf'].sha256,
    generatedRevision: ready.revision,
    applicableRevision: p.revision,
    instruction: '引用真实文件与来源版本，不把工作区的早期SVG或独立草稿当作当前图纸。',
  };
}
