/** CAD drafts: drawn or refined by the model, then confirmed by the user before they replace the scene. */
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile, readFile, rename, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { hash } from '../store.js';
import { validateScene, placementConflicts, MATERIALS, check } from '../scene.js';
import { FURNITURE, HAS_LOCAL_ASSETS } from '../catalog.js';
import { drawingScene } from '../drawing.js';
import { reviewFurniture } from '../furniture-review.js';
import { reviewSolids } from '../solids.js';
import { reviewDesign } from '../design-review.js';
import {
  mergeConstraints,
  constraintChanges,
  requireConstraintsReady,
} from '../design-constraints.js';
import { modelFingerprint, cadFingerprint, viewFingerprint } from '../design-fingerprints.js';
import { cleanSupersededDraft } from '../derivative-cleanup.js';
import { mkdirSync, writeFileSync, unlinkSync } from 'node:fs';
import { readResource, resourceHash, validateGlb } from '../resources.js';
import {
  key,
  label,
  vector,
  finite,
  resourceName,
  validateSurface,
  presentationFromInput,
  sceneResources,
} from '../refinement.js';
import { modelAllowed } from './access.js';
import { acceptedBrief } from './design.js';

/** A CAD draft drawn from the model's (or the panel's) description. The user confirms it later. */
export function draw(studio, ...args) {
  return studio.trackCad(prepareDrawing(studio, ...args));
}

/**
 * Turns a scene description into a pending CAD draft: Blender draws it, the reviews run, and the
 * draft replaces any earlier one. `refinement` is set when the scene comes from prepareRefinement.
 */
export async function prepareDrawing(
  studio,
  session,
  input,
  operation,
  signal,
  model = false,
  refinement,
) {
  signal?.throwIfAborted();
  const draft = refinement?.scene ?? drawingScene(input);
  requireInstalledAssets(draft);
  let id = studio.store.bound(session);
  if (!id) id = studio.store.create(session, input.name, input.kind, operation + ':create').id;
  const request = refinement?.request ?? { id, ...input };
  const done = studio.store.replay(session, operation, request);
  if (done !== undefined) return done;

  const project = studio.store.assertWriter(session, id, input.expectedRevision);
  check(project.kind === input.kind, '设计类型与当前工程不同，请新建对应类型的工程');
  if (model && project.revision > 0)
    check(modelAllowed(studio, session, id), '请先授权当前模型读取已有工程，再调整设计');
  const previous = studio.store.pendingData(id),
    prior = previous ? JSON.parse(previous) : null;
  const brief = acceptedBrief(studio, id);
  check(prior?.type !== 'brief', '需求卡尚未确认，请先由用户核对');
  if (model && project.revision === 0)
    check(brief, '新设计请先用studio_brief保存需求卡，并由用户在右侧确认');
  if (refinement) check(previous === refinement.previous, '待确认方案已变化，请回读后重新细化');
  const proposed = input.constraints ?? refinement?.scene.design?.constraints;
  adoptRequirements(studio, id, project, draft, brief, prior, proposed);
  if (refinement) validateScene(draft);
  reviewDesign(draft, {}); // Validate the saved list before any worker or CAD file is created.

  const drawingId = randomUUID();
  draft.design.drawingId = drawingId;
  const staging = studio.store.dir(id, 'staging', 'drawing-' + drawingId),
    relativePath = 'drafts/' + drawingId;
  const output = studio.store.dir(id, relativePath);
  let saved = false;
  const createdResources = [];
  try {
    await mkdir(staging, { recursive: true, mode: 0o700 });
    const prepared = await studio.engine.request(
      { action: refinement ? 'refine' : 'draw', scene: draft, drawingId, output: staging },
      signal,
    );
    signal?.throwIfAborted();
    const scene = prepared.scene;
    validateScene(scene);
    requireFreePlacements(scene);
    scene.design.componentReview = reviewSolids(scene);
    const requirementReview = reviewDesign(scene, {});
    scene.design.quality = requirementReview.quality;
    const bytes = await readFile(join(staging, 'plan.dxf'));
    check(bytes.length > 0 && bytes.length <= 20 * 1024 * 1024, 'CAD 草案文件无效');
    scene.design.draftCadHash = hash(bytes);

    const summary = draftSummary(input, scene, requirementReview);
    const draftSource = JSON.stringify(scene),
      draftSourceHash = hash(draftSource);
    const pending = {
      type: 'drawing',
      drawingId,
      baseRevision: project.revision,
      relativePath,
      sha256: hash(bytes),
      draftSourceHash,
      scene,
      summary,
    };
    await writeFile(join(staging, 'scene.json'), draftSource, { flag: 'wx', mode: 0o600 });
    await mkdir(studio.store.dir(id, 'drafts'), { recursive: true, mode: 0o700 });
    await rename(staging, output);
    const result = studio.store.once(session, operation, request, () => {
      studio.store.assertWriter(session, id, project.revision);
      check(studio.store.bound(session) === id, '活动工程已变化，请重新提交设计');
      check(studio.store.pendingData(id) === previous, '待确认方案已变化，请重新绘制');
      storeResources(studio, id, refinement?.resources ?? [], createdResources);
      studio.store.setPending(id, pending);
      return {
        projectId: id,
        drawingId,
        draftSourceHash,
        state: 'awaiting_user_confirmation',
        summary,
        instruction:
          'CAD 草案已在右侧显示，可下载 DXF。只按 measurements 引用实算尺寸，不要自行估算净面积。检查 measurements.issues 与 furnitureReview.issues；朝向建议须重新通过碰撞校核，特殊摆放须说明。优先修正并重新绘图，不能修正时说明待核对项。请用户核对并确认；尚未替换当前三维模型，尚未渲染。',
      };
    });
    saved = result.drawingId === drawingId;
    if (saved) retireSupersededDraft(studio, id, prior, scene, result);
    return result;
  } catch (error) {
    for (const path of createdResources) unlinkSync(path);
    throw error;
  } finally {
    await rm(staging, { recursive: true, force: true });
    if (!saved) await rm(output, { recursive: true, force: true });
  }
}

/** Without the optional asset library, a draft may not use its furniture or textures. */
function requireInstalledAssets(draft) {
  if (HAS_LOCAL_ASSETS) return;
  const usesLibrary = (object) =>
    (object.type === 'asset' && Object.hasOwn(FURNITURE, object.asset)) ||
    [object.material, ...Object.values(object.materials ?? {})].some(
      (id) => MATERIALS[id]?.texture,
    );
  check(
    !draft.objects.some(usesLibrary),
    '此方案使用了未安装的家具或贴图，请改用通用构件、导入模型或基础材质',
  );
}

/** Carries the saved requirements into the draft and notes which of them this draft changes. */
function adoptRequirements(studio, id, project, draft, brief, prior, proposed) {
  const current = studio.store.read(id);
  // Requirements confirmed after the current CAD was drawn take its place as the baseline.
  const baseline =
    brief && current?.design?.briefId !== brief.briefId
      ? brief.constraints
      : (current?.design?.constraints ?? brief?.constraints);
  const continuesDraft = prior?.type === 'drawing' && prior.baseRevision === project.revision;
  if (brief) draft.design.briefId = brief.briefId;
  draft.design.constraints = mergeConstraints(
    proposed,
    continuesDraft ? prior.scene.design?.constraints : baseline,
  );
  draft.design.constraintChanges = constraintChanges(baseline, draft.design.constraints);
  draft.schemaVersion = Math.max(7, draft.schemaVersion);
}

/** Catalogue furniture must not overlap walls, door swings or other objects. */
function requireFreePlacements(scene) {
  for (const item of scene.objects.filter((o) => o.type === 'asset')) {
    const conflicts = placementConflicts(scene, item);
    check(
      !conflicts.length,
      `${item.label} (${item.origin.key ?? item.id}，中心 ${item.position.join(',')}) 与以下对象/空间重叠：${conflicts.join('；')}。请调整布置，保留门扇开启范围和门前 0.45 m 空位。`,
    );
  }
}

/** What the model and the confirmation dialog are told about a draft. */
function draftSummary(input, scene, requirementReview) {
  const ofType = (type) => scene.objects.filter((o) => o.type === type);
  const openings = scene.objects.flatMap((o) => o.openings ?? []);
  return {
    name: input.name,
    width: input.width,
    depth: input.depth,
    height: input.height,
    rooms: ofType('floor').map((o) => ({
      name: o.label,
      area: o.area,
      areaBasis: o.origin.areaBasis,
    })),
    doors: openings.filter((o) => o.kind === 'door').length,
    windows: openings.filter((o) => o.kind === 'window').length,
    furniture: ofType('asset').length,
    components: ofType('solid').length,
    importedModels: ofType('model').length,
    assumptions: scene.design.assumptions,
    measurements: scene.design.review,
    furnitureReview: reviewFurniture(scene),
    componentReview: scene.design.componentReview,
    constraints: scene.design.constraints,
    constraintChanges: scene.design.constraintChanges,
    quality: requirementReview.quality,
    fixedChecks: requirementReview.fixedChecks,
  };
}

/** Saves imported models and images under their content hash. `created` lists the new files. */
function storeResources(studio, id, resources, created) {
  for (const resource of resources) {
    const name = resourceName(resourceHash(resource.bytes), resource.extension);
    const path = studio.store.dir(id, 'resources', name);
    mkdirSync(studio.store.dir(id, 'resources'), { recursive: true, mode: 0o700 });
    try {
      writeFileSync(path, resource.bytes, { flag: 'wx', mode: 0o600 });
      created.push(path);
    } catch (error) {
      if (error.code !== 'EEXIST') throw error; // Content-addressed: already stored.
    }
  }
}

/** Removes the files of the draft that the new one replaced. Failures only add a warning. */
function retireSupersededDraft(studio, id, prior, scene, result) {
  if (prior?.type !== 'drawing' || !/^drafts\/[a-f0-9-]{36}$/.test(prior.relativePath)) return;
  try {
    cleanSupersededDraft(studio.store, id, prior);
  } catch (error) {
    result.warning = '新草案已保存，旧草案临时文件未能清理：' + error.message;
    return;
  }
  if (studio.drawings.size > 1) return; // Another draft is being prepared and may use the resources.
  try {
    const retained = new Set(sceneResources(scene));
    const revisions = studio.store.db
      .prepare('SELECT revision FROM revisions WHERE project=?')
      .all(id);
    for (const row of revisions)
      for (const file of sceneResources(studio.store.read(id, row.revision))) retained.add(file);
    for (const file of new Set(sceneResources(prior.scene)))
      if (!retained.has(file)) unlinkSync(studio.store.dir(id, 'resources', file));
  } catch (error) {
    result.warning = (result.warning ?? '') + '；未引用的旧草案资源清理未完成：' + error.message;
  }
}

/** Changes to a confirmed design: imported models, image surfaces, lights, cameras, requirements. */
export function refine(studio, session, input, operation, signal, model = false) {
  return studio.trackCad(prepareRefinement(studio, session, input, operation, signal, model));
}

/**
 * Applies a refinement to a copy of the scene and hands it to prepareDrawing as a new CAD draft.
 * A change of cameras alone needs no draft: it is saved directly as a new revision.
 */
export async function prepareRefinement(studio, session, input, operation, signal, model) {
  signal?.throwIfAborted();
  const id = studio.store.bound(session);
  check(id, '请先绘制并确认一个设计工程');
  const p = studio.store.assertWriter(session, id, input.expectedRevision);
  check(p.revision > 0, '请先确认 CAD 尺寸，再细化模型');
  if (model) check(modelAllowed(studio, session, id), '请先授权当前模型读取已有工程');
  const request = { id, ...input };
  const done = studio.store.replay(session, operation, request);
  if (done !== undefined) return done;
  const pendingData = studio.store.pendingData(id),
    prior = pendingData ? JSON.parse(pendingData) : null;
  check(
    !prior || (input.drawingId === prior.drawingId && prior.baseRevision === p.revision),
    '已有待确认草案，请带最新 drawingId 继续细化或由用户处理',
  );
  const scene = structuredClone(prior?.scene ?? studio.store.read(id));
  check(scene, '没有可细化的场景');
  scene.schemaVersion = Math.max(5, scene.schemaVersion);
  scene.design ??= {
    name: p.name,
    dimensionBasis: scene.kind === 'booth' ? 'site' : 'centerline',
    assumptions: [],
    roomLabels: [],
  };
  const models = input.models ?? [],
    surfaces = input.surfaces ?? [],
    remove = input.removeKeys ?? [];
  check(
    models.length <= 8 && surfaces.length <= 30 && remove.length <= 100,
    '单次最多8个模型、30个饰面和100个移除对象',
  );
  check(
    models.length || surfaces.length || remove.length || input.presentation || input.constraints,
    '请提供本轮细化内容',
  );
  // Looked up before removal, so a removed object that is re-imported keeps its ID and assembly.
  const previousByKey = new Map(scene.objects.map((o) => [o.origin?.key, o]));
  for (const name of new Set(remove)) {
    const object = findObject(scene, name);
    check(['model', 'solid', 'asset'].includes(object.type), '不能通过细化工具删除墙体或地面');
    scene.objects = scene.objects.filter((o) => o.id !== object.id);
  }

  const staging = studio.store.dir(id, 'staging', 'refinement-' + randomUUID()),
    resources = [];
  let totalBytes = 0;
  const read = async (path, kind) => {
    const r = await readResource(path, kind, signal);
    totalBytes += r.bytes.length;
    check(totalBytes <= 64 * 1024 * 1024, '本轮导入累计超过64 MiB');
    return r;
  };
  try {
    await mkdir(staging, { recursive: true, mode: 0o700 });
    const touched = new Set();
    for (const row of models) {
      key(row.key);
      check(!touched.has(row.key), '本轮模型编号重复');
      touched.add(row.key);
      const previous = previousByKey.get(row.key);
      const actor = model ? 'model_tool' : 'local_user';
      const imported = await importModel(studio, row, { staging, read, signal, previous, actor });
      scene.objects = scene.objects.filter((o) => o.id !== imported.item.id);
      scene.objects.push(imported.item);
      resources.push(imported.resource);
    }
    for (const row of surfaces) resources.push(await applySurface(scene, row, read));
    if (input.presentation)
      scene.presentation = presentationFromInput(input.presentation, scene.presentation);
    signal?.throwIfAborted();

    const onlyCameras =
      !input.constraints &&
      !models.length &&
      !surfaces.length &&
      !remove.length &&
      input.presentation &&
      Object.keys(input.presentation).every((k) => k === 'cameras');
    if (onlyCameras && !prior) return saveCameras(studio, session, operation, request, p, scene);

    const summaryInput = {
      ...input,
      name: scene.design.name,
      kind: scene.kind,
      width: scene.bounds[0],
      depth: scene.bounds[1],
      height: scene.parameters.height,
    };
    // Preserve the public request for idempotence, including local source paths only in its hash.
    return await prepareDrawing(studio, session, summaryInput, operation, signal, model, {
      scene,
      resources,
      request,
      previous: pendingData,
    });
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
}

function findObject(scene, name) {
  const rows = scene.objects.filter((o) => o.origin?.key === name || o.id === name);
  check(rows.length === 1, '对象不存在或编号不唯一：' + name);
  return rows[0];
}

/** Has Blender normalise a local GLB, and describes it as a scene object awaiting confirmation. */
async function importModel(studio, row, { staging, read, signal, previous, actor }) {
  label(row.source, 500);
  const position = vector(row.position, '模型底面中心'),
    rotationEuler = vector(row.rotation ?? [0, 0, 0], '模型角度').map(
      (n) => (finite(n, '模型角度', -360, 360) * Math.PI) / 180,
    );
  const source = await read(row.path, 'model'),
    folder = join(staging, row.key);
  await mkdir(folder, { mode: 0o700 });
  const path = join(folder, 'input.glb');
  await writeFile(path, source.bytes, { flag: 'wx', mode: 0o600 });
  const scale = finite(row.scale ?? 1, '单位换算', 0.001, 1000);
  const imported = await studio.engine.request(
    { action: 'import-model', path, output: folder, scale },
    signal,
  );
  const bytes = await readFile(join(folder, 'model.glb'));
  check(bytes.length > 0 && bytes.length <= 20 * 1024 * 1024, '标准化模型超过20 MiB');
  const audit = validateGlb(bytes);
  check(
    !previous || ['model', 'solid', 'asset'].includes(previous.type),
    '不能用模型替换墙体或地面',
  );
  const item = {
    id: previous?.id ?? randomUUID(),
    type: 'model',
    label: label(row.label ?? row.key),
    resource: resourceHash(bytes),
    size: imported.size,
    position,
    rotationEuler,
    source: row.source,
    audit,
    ...(previous?.assembly ? { assembly: previous.assembly } : {}),
    origin: {
      category: 'design_proposal',
      actor,
      status: 'awaiting_user_confirmation',
      key: row.key,
    },
  };
  return { item, resource: { bytes, extension: 'glb' } };
}

/** Puts a local image on the named solids or floors. Returns the image to store with the project. */
async function applySurface(scene, row, read) {
  check(row.keys.length > 0 && row.keys.length <= 100, '饰面需指定1–100个对象编号');
  label(row.source, 500);
  const resource = await read(row.path, 'surface');
  const surface = {
    resource: resourceHash(resource.bytes),
    extension: resource.extension,
    source: row.source,
    face: row.face ?? 'all',
    repeat: row.repeat,
    rotation: (finite(row.rotation ?? 0, '纹理角度', -360, 360) * Math.PI) / 180,
    roughness: row.roughness ?? 0.6,
    emission: row.emission ?? 0,
  };
  validateSurface(surface);
  for (const name of row.keys) {
    const item = findObject(scene, name);
    check(
      ['solid', 'floor'].includes(item.type),
      '图像饰面需应用于参数构件或地面；精细模型请保留源GLB材质',
    );
    item.surface = structuredClone(surface);
  }
  return resource;
}

/** Saves a change of cameras as a new revision. The geometry is confirmed already and must not differ. */
function saveCameras(studio, session, operation, request, p, scene) {
  const id = p.id;
  validateScene(scene);
  requireConstraintsReady(reviewDesign(scene, {}));
  const before = studio.store.read(id);
  check(
    modelFingerprint(before, MATERIALS) === modelFingerprint(scene, MATERIALS) &&
      cadFingerprint(before) === cadFingerprint(scene),
    '机位更新包含几何或外观变化，请走CAD草案',
  );
  const cameras = [...(before.presentation?.cameras ?? []), ...(scene.presentation?.cameras ?? [])];
  const changedViews = [...new Set(cameras.map((c) => c.key))].filter(
    (view) =>
      viewFingerprint(before, view, MATERIALS, '') !== viewFingerprint(scene, view, MATERIALS, ''),
  );
  return studio.store.once(session, operation, request, () => {
    studio.store.assertWriter(session, id, p.revision);
    check(
      studio.store.bound(session) === id && !studio.store.pendingData(id),
      '工程或CAD草案已变化，请重新读取',
    );
    const result = studio.store.commit(session, id, p.revision, scene, operation);
    return {
      ...result,
      state: 'presentation_saved',
      changedViews,
      geometryChanged: false,
      cadGeometryExported: false,
      instruction:
        '机位已版本化保存，已确认几何未变；无需再次确认CAD或重建模型。只渲染changedViews中仍存在的视图，其他有效图片保留真实来源。',
    };
  });
}
