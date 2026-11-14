/** Read-only views of a project for the side panel and for the model. */
import { join } from 'node:path';
import { hash } from '../store.js';
import { proposal, MATERIALS, AVAILABLE_MATERIALS, check } from '../scene.js';
import { AVAILABLE_FURNITURE, HAS_LOCAL_ASSETS } from '../catalog.js';
import { drawingReport } from '../drawing.js';
import { reviewFurniture } from '../furniture-review.js';
import { reviewDesign } from '../design-review.js';
import { viewFingerprint } from '../design-fingerprints.js';
import {
  renderViewLabels,
  renderGallery,
  recommendedRenderViews,
  galleryCoverage,
} from '../design-views.js';
import { key, label } from '../refinement.js';
import { PACKAGE_ROOT } from '../engine.js';
import { modelAllowed, disclose } from './access.js';
import { acceptedBrief } from './design.js';
import { acceptanceEvidence, readyModel } from './tasks.js';

/**
 * The panel polls every 1.5 s. When it says which version it already shows and nothing changed,
 * it gets only that answer, so it neither receives nor redraws the whole project.
 */
export function polledSnapshot(studio, session, known) {
  const value = studio.snapshot(session);
  if (known === undefined) return value;
  const version = hash(JSON.stringify(value));
  return known === version ? { unchanged: true, version } : { ...value, version };
}

/** Everything the side panel shows for a chat's open project. Also the basis of studio_context. */
export function snapshot(studio, session, id = studio.store.bound(session)) {
  const lists = {
    projects: studio.store.list(),
    materials: AVAILABLE_MATERIALS,
    furniture: AVAILABLE_FURNITURE,
  };
  if (!id) return { project: null, ...lists };
  const project = studio.store.project(id),
    scene = studio.store.read(id);
  const proposed = studio.store.pending(id);
  if (proposed?.type === 'drawing') proposed.stale = proposed.baseRevision !== project.revision;
  // The CAD draft waiting for confirmation, unless the project moved on since it was drawn.
  const draft = proposed?.type === 'drawing' && !proposed.stale ? proposed : null;
  const sceneHash = scene ? hash(JSON.stringify(scene)) : null,
    builtModel = scene ? readyModel(studio, id, project.revision, sceneHash) : null;
  // Requirements confirmed after the current CAD: the CAD and its images no longer count as current.
  const brief = acceptedBrief(studio, id),
    requirementsChanged = !!(brief && scene && scene.design?.briefId !== brief.briefId);
  const gallery = studio
    .gallery(id, project.revision)
    .map((row) => (requirementsChanged ? { ...row, current: false } : row));
  const viewRequirements = requirementsChanged
    ? { design: { constraints: brief.constraints } }
    : scene;
  const upToDate = !requirementsChanged && !draft;
  const drawing = draft ? draft.scene : scene?.design ? scene : null;
  const tasks = studio.store.db
    .prepare('SELECT * FROM tasks WHERE project=? ORDER BY rowid DESC LIMIT 12')
    .all(id)
    .map((t) => ({ ...t, detail: JSON.parse(t.detail) }));
  return {
    project: {
      id,
      name: project.name,
      kind: project.kind,
      revision: project.revision,
      consent: modelAllowed(studio, session, id),
      modelRoute: studio.routes.get(session) ? JSON.parse(studio.routes.get(session)) : null,
      readOnly: project.writer !== session,
      canUndo: JSON.parse(project.undo).length > 0,
      canRedo: JSON.parse(project.redo).length > 0,
    },
    scene,
    brief,
    proposal: proposed,
    workflow: {
      revision: project.revision,
      requirementsChanged,
      cadConfirmed: project.revision > 0 && upToDate,
      cadReady: !!builtModel && upToDate,
      modelReady: !!builtModel && upToDate,
      hasDraft: !!draft,
      modelTask: builtModel
        ? {
            id: builtModel.id,
            revision: builtModel.revision,
            state: builtModel.state,
            detail: builtModel.detail,
          }
        : null,
      quality: designQuality(studio, id, scene, draft),
    },
    report: drawing ? drawingReport(drawing) : latestImportReport(studio, id),
    tasks,
    gallery,
    galleryCoverage: galleryCoverage(viewRequirements, gallery),
    recommendedViews: recommendedRenderViews(viewRequirements),
    selection: currentSelection(studio, session, id, project.revision),
    ...lists,
  };
}

/** How well the design meets its saved requirements: of the draft if there is one, else of the scene. */
function designQuality(studio, id, scene, draft) {
  const unknown = {
    overall: 'needs_review',
    coverage: { saved: false },
    visual: { status: 'not_evaluated' },
  };
  if (draft) return draft.summary?.quality ?? unknown;
  const fixed = scene?.design?.constraints;
  // View and support requirements are judged on Blender's results, so they are reviewed afresh.
  if (fixed?.views?.length || fixed?.supports?.length)
    return reviewDesign(scene, {}, acceptanceEvidence(studio, id, scene)).quality ?? unknown;
  return scene?.design?.quality ?? unknown;
}

function latestImportReport(studio, id) {
  const row = studio.store.db
    .prepare('SELECT report FROM imports WHERE project=? ORDER BY rowid DESC LIMIT 1')
    .get(id);
  return row ? JSON.parse(row.report) : null;
}

/** The object the user last clicked, or none once the project has moved to another revision. */
function currentSelection(studio, session, id, revision) {
  try {
    return studio.store.selection(session, id, revision);
  } catch {
    return null;
  }
}

export function currentGallery(studio, id, revision) {
  const scene = studio.store.read(id, revision),
    current = new Map(),
    runtime = studio.runtime;
  if (scene)
    for (const task of studio.store.db
      .prepare("SELECT * FROM tasks WHERE project=? AND state='complete' ORDER BY rowid")
      .iterate(id)) {
      const detail = JSON.parse(task.detail);
      if (!detail.viewFingerprints) continue;
      for (const view of renderGallery([{ ...task, detail }], task.revision))
        if (
          detail.runtime === runtime &&
          detail.viewFingerprints[view.id] === viewFingerprint(scene, view.id, MATERIALS, runtime)
        )
          current.set(view.id, {
            ...view,
            applicableRevision: revision,
            current: true,
            resolution: detail.resolution,
          });
    }
  if (current.size) return [...current.values()];
  const source = studio.store.db
    .prepare(
      `SELECT revision FROM tasks WHERE project=? AND state='complete'
    AND json_type(detail,'$.files."render.png"') IS NOT NULL
    ORDER BY (revision=?) DESC,rowid DESC LIMIT 1`,
    )
    .get(id, revision);
  if (!source) return [];
  // Stream metadata so failed/repeated tasks outside the history window do not hide older views.
  const rows = studio.store.db
    .prepare(
      "SELECT id,revision,state,detail FROM tasks WHERE project=? AND revision=? AND state='complete' ORDER BY rowid",
    )
    .iterate(id, source.revision);
  function* decoded() {
    for (const row of rows) yield { ...row, detail: JSON.parse(row.detail) };
  }
  return renderGallery(decoded(), source.revision).map((v) => ({
    ...v,
    current: source.revision === revision,
    applicableRevision: source.revision === revision ? revision : null,
  }));
}

/**
 * What the model reads through studio_context. Until the user has shared the project with the
 * current model it learns only that; after that it picks one of four levels of detail.
 */
export function context(studio, session, input = {}) {
  const id = studio.store.bound(session);
  const catalog = modelCatalog(studio);
  if (!id)
    return {
      project: null,
      ...catalog,
      instruction:
        '新设计先用studio_brief整理客户硬条件与设计假设，expectedRevision=0，用户在右侧确认需求卡后用studio_draw绘制CAD。需求卡确认不等于CAD确认。',
    };
  const empty = emptyProjectContext(studio, session, id, catalog);
  if (empty) return empty;
  if (!modelAllowed(studio, session, id))
    return {
      projectId: id,
      sharing: 'disabled',
      instruction:
        '项目摘要、尺寸与选择未获外发授权。请用户在右侧勾选允许设计摘要用于当前模型对话；也可继续本地操作。',
    };
  const snap = snapshot(studio, session);
  disclose(studio, session, id);
  if (input.detail === 'index' || input.detail === 'objects') return objectsContext(snap, input);
  if (input.detail === 'summary') return summaryContext(snap, catalog);
  return fullContext(studio, id, snap, catalog);
}

/** What can be drawn at all: furniture, materials and the modelling limits. The same for every project. */
function modelCatalog(studio) {
  const blender = studio.engine.manifest
    ? { blenderExecutable: join(PACKAGE_ROOT, studio.engine.manifest.executable) }
    : {};
  return {
    furniture: Object.entries(AVAILABLE_FURNITURE).map(([id, m]) => ({
      id,
      label: m.label,
      size: m.size,
      orientation: m.orientation,
    })),
    materials: Object.entries(AVAILABLE_MATERIALS).map(([id, m]) => ({ id, ...m })),
    ...(!HAS_LOCAL_ASSETS
      ? { catalogNote: '可用基础材质、参数构件和用户导入的模型；当前未安装可选家具和贴图库。' }
      : {}),
    modeling: {
      geometryTool: 'studio_geometry',
      geometryOperations: ['fillet', 'arc', 'check_profile', 'offset', 'measure', 'orientation'],
      shapes: ['box', 'cylinder', 'extrusion', 'text'],
      planes: ['xy', 'xz', 'yz'],
      minimumComponentThickness: 0.001,
      position:
        'component origin XYZ; box/cylinder origin is base centre; extrusion origin offsets profile coordinates',
      color: 'components.color is RGB in [0,1]; optional roughness, metallic and emission',
      openingKinds: ['door', 'window', 'passage'],
      maxComponents: 500,
      maxProfileSamples: 24000,
      refinement: {
        tool: 'studio_refine',
        ...blender,
        models:
          'embedded static GLB; metre Z-up, origin=bottom centre; plan uses envelopes, elevations use actual mesh feature edges',
        surfaces: 'local PNG/JPEG on solid/floor; local-axis face and repeat in metres',
        presentation: 'saved lights and cameras; custom view key accepted by studio_render',
      },
    },
  };
}

/** A project with nothing designed yet holds nothing private, so the model needs no grant to start. */
function emptyProjectContext(studio, session, id, catalog) {
  const p = studio.store.project(id);
  if (p.revision !== 0) return null;
  const project = { id, kind: p.kind, revision: 0, readOnly: p.writer !== session };
  const pending = studio.store.pending(id);
  if (pending?.type === 'brief')
    return {
      project,
      sharing: 'no_existing_design',
      proposal: pending,
      brief: acceptedBrief(studio, id),
      instruction: '请先由用户在右侧确认需求卡；尚未生成CAD。',
    };
  const hasImport = studio.store.db.prepare('SELECT 1 FROM imports WHERE project=?').get(id);
  if (pending || hasImport) return null;
  return {
    project,
    sharing: 'no_existing_design',
    permissions: { canDrawNewDesign: p.writer === session, canReadExistingDesign: false },
    brief: acceptedBrief(studio, id),
    ...catalog,
    instruction:
      p.writer === session
        ? '空工程无需先授权读取。先用studio_brief保存并请用户确认需求卡，再用studio_draw绘制新CAD；原始要求自动保留，不能缩小范围或放宽数值。'
        : '空工程由另一聊天持有写权限，请新建工程或让用户接管编辑。',
  };
}

/** detail=index lists every object briefly; detail=objects returns the chosen ones in full. */
function objectsContext(snap, input) {
  const draft = input.target === 'draft';
  const currentDraft =
    snap.proposal?.type === 'drawing' && !snap.proposal.stale ? snap.proposal : null;
  const source = draft ? currentDraft?.scene : snap.scene;
  check(source, draft ? '没有当前版本的CAD草案' : '没有已确认的场景');
  if (draft)
    check(input.drawingId === snap.proposal.drawingId, '请提供当前drawingId，避免读取已替换草案');
  const header = {
    project: snap.project,
    target: input.target ?? 'current',
    ...(draft ? { drawingId: snap.proposal.drawingId } : {}),
    objectCount: source.objects.length,
    brief: snap.brief,
  };
  if (input.detail === 'index')
    return {
      ...header,
      objects: source.objects.map((o) => ({
        id: o.id,
        key: o.origin?.key,
        label: o.label,
        type: o.type,
        shape: o.shape,
        assembly: o.assembly,
      })),
      instruction: '按key或assembly用detail=objects取本轮需要的几何；key保存在origin.key。',
    };

  const selected = selectObjects(source, input);
  const ids = new Set(selected.flatMap((o) => [o.id, o.origin?.key])),
    groups = new Set(selected.map((o) => o.assembly).filter(Boolean));
  // A saved requirement is relevant when it names a selected object, its assembly, or the whole scene.
  const relevant = (row) =>
    row.scope === 'scene' ||
    groups.has(row.assembly) ||
    [...(row.keys ?? []), ...(row.anchorKeys ?? []), ...(row.viaKeys ?? []), row.a, row.b].some(
      (key) => ids.has(key),
    );
  return {
    ...header,
    objects: selected,
    constraints: Object.fromEntries(
      Object.entries(source.design?.constraints ?? {})
        .filter(([, rows]) => Array.isArray(rows))
        .map(([group, rows]) => [group, rows.filter(relevant)]),
    ),
    diagnostics: snap.tasks.slice(0, 3).map((t) => ({
      id: t.id,
      revision: t.revision,
      state: t.state,
      supports: t.detail.meshContactReview?.declaredSupports?.filter((r) =>
        r.resolvedIds?.some((id) => ids.has(id)),
      ),
    })),
    instruction:
      'objects是选定对象的完整参数。diagnostics保留实际任务版本；与当前几何不符时重新审查，不能沿用旧通过状态。',
  };
}

/** The objects named by key or by assembly; every name must exist and be unambiguous. */
function selectObjects(source, input) {
  const names = (values = [], label) => {
    check(
      values.length <= 32 && new Set(values).size === values.length,
      label + '最多32个不同编号',
    );
    return values;
  };
  const keys = names(input.keys, '对象'),
    assemblies = names(input.assemblies, '组合');
  check(keys.length || assemblies.length, '请提供keys或assemblies');
  for (const key of keys)
    check(
      source.objects.filter((o) => o.id === key || o.origin?.key === key).length === 1,
      '对象不存在或有歧义：' + key,
    );
  for (const assembly of assemblies)
    check(
      source.objects.some((o) => o.assembly === assembly),
      '组合不存在：' + assembly,
    );
  const selected = source.objects.filter(
    (o) => keys.includes(o.id) || keys.includes(o.origin?.key) || assemblies.includes(o.assembly),
  );
  check(selected.length <= 100, '本轮超过100个对象，请缩小组合或按对象分批读取');
  return selected;
}

/** detail=summary: the state of the project without its geometry. */
function summaryContext(snap, catalog) {
  const { modelTask } = snap.workflow;
  return {
    project: snap.project,
    sharing: 'allowed',
    selection: snap.selection,
    brief: snap.brief,
    objectCount: snap.scene?.objects.length ?? 0,
    constraints: snap.scene?.design?.constraints,
    workflow: {
      ...snap.workflow,
      modelTask: modelTask ? { id: modelTask.id, revision: modelTask.revision } : null,
    },
    proposal: snap.proposal
      ? {
          type: snap.proposal.type,
          drawingId: snap.proposal.drawingId,
          baseRevision: snap.proposal.baseRevision,
          stale: snap.proposal.stale,
          quality: snap.proposal.summary?.quality,
        }
      : null,
    tasks: snap.tasks.map((t) => ({
      id: t.id,
      revision: t.revision,
      state: t.state,
      jobId: t.detail.jobId,
      phase: t.detail.phase,
      message: t.detail.message,
      render: t.detail.render,
      views: t.detail.views?.map((v) => ({ id: v.id, file: v.file })),
    })),
    gallery: snap.gallery,
    galleryCoverage: snap.galleryCoverage,
    recommendedViews: snap.recommendedViews,
    renderViews: renderViewLabels(snap.scene),
    modeling: catalog.modeling,
    instruction: '这是摘要；需要几何、完整诊断或产物路径时用detail=full，在PTC内按对象筛选。',
  };
}

/** detail=full: the whole scene, every task's diagnostics and the paths of its files. */
function fullContext(studio, id, snap, catalog) {
  return {
    project: snap.project,
    scene: snap.scene,
    selection: snap.selection,
    furnitureReview: reviewFurniture(snap.scene),
    proposal: snap.proposal,
    workflow: snap.workflow,
    gallery: snap.gallery,
    tasks: snap.tasks.map((t) => ({
      id: t.id,
      revision: t.revision,
      state: t.state,
      render: t.detail.render,
      views: t.detail.views,
      requestedViews: t.detail.requestedViews,
      meshAudit: t.detail.meshAudit,
      cadAudit: t.detail.cadAudit,
      meshContactReview: t.detail.meshContactReview,
      preflight: t.detail.preflight,
      jobId: t.detail.jobId,
      phase: t.detail.phase,
      message: t.detail.message,
      ...artifactPaths(studio, id, t),
    })),
    renderViews: renderViewLabels(snap.scene),
    report: snap.report
      ? {
          importId: snap.report.id,
          unit: snap.report.unit,
          counts: snap.report.counts,
          blocking: snap.report.blocking,
          support: snap.report.support,
        }
      : null,
    ...catalog,
    statement: '图纸原件、图中文字与图片未发送。此结构摘要由本次工具结果记录。',
  };
}

/** Local paths of a completed task's files, so the model can open them with its file tools. */
function artifactPaths(studio, id, task) {
  const { detail } = task;
  const published =
    task.state === 'complete' &&
    detail.relativePath === `${detail.render ? 'renders' : 'builds'}/${task.id}` &&
    /^[a-f0-9-]{36}$/.test(task.id);
  if (!published) return {};
  const readable = /^(plan\.dxf|scene\.(blend|glb)|render(?:-[A-Za-z][A-Za-z0-9_-]{0,49})?\.png)$/;
  return {
    artifacts: Object.fromEntries(
      Object.keys(detail.files ?? {})
        .filter((file) => readable.test(file))
        .map((file) => [file, studio.store.dir(id, detail.relativePath, file)]),
    ),
  };
}

export function review(studio, session, input, model = false) {
  const id = studio.store.bound(session);
  check(id, '请先打开工程');
  if (model) {
    check(modelAllowed(studio, session, id), '工程未授权当前模型读取');
    disclose(studio, session, id);
  }
  const project = studio.store.project(id);
  check(input.expectedRevision === project.revision, '场景版本已变化，请重新读取');
  let scene;
  if (input.target === 'draft') {
    const draft = studio.store.pending(id);
    check(
      draft?.type === 'drawing' &&
        draft.baseRevision === project.revision &&
        input.drawingId === draft.drawingId,
      'CAD 草案不存在、已变化或版本过期',
    );
    scene = draft.scene;
  } else scene = studio.store.read(id);
  check(scene, '没有可审查的场景');
  return {
    projectId: id,
    revision: project.revision,
    target: input.target,
    ...(input.target === 'draft' ? { drawingId: input.drawingId } : {}),
    ...reviewDesign(
      scene,
      input,
      input.target === 'current' ? acceptanceEvidence(studio, id, scene) : {},
    ),
  };
}
