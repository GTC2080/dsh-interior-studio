/** Requirements, user confirmation and direct edits of the confirmed scene. */
import { randomUUID } from 'node:crypto';
import {
  proposal,
  sceneFromProposal,
  sceneFromCad,
  editScene,
  furnishScene,
  check,
} from '../scene.js';
import { HAS_LOCAL_ASSETS } from '../catalog.js';
import { reviewDesign } from '../design-review.js';
import { mergeConstraints, requireConstraintsReady } from '../design-constraints.js';
import { cleanConfirmedDraft } from '../derivative-cleanup.js';
import { modelAllowed } from './access.js';

export function acceptedBrief(studio, id) {
  const row = studio.store.db
    .prepare(
      "SELECT id,data FROM confirmations WHERE project=? AND json_extract(data,'$.action')='design_brief' ORDER BY rowid DESC LIMIT 1",
    )
    .get(id);
  return row ? { ...JSON.parse(row.data), confirmationId: row.id } : null;
}

export function saveBrief(studio, session, input, operation, model = false) {
  check(
    typeof input.name === 'string' && input.name.trim() && input.name.length <= 100,
    '请提供工程名称',
  );
  let id = studio.store.bound(session);
  if (!id) id = studio.store.create(session, input.name, input.kind, operation + ':create').id;
  const project = studio.store.assertWriter(session, id, input.expectedRevision);
  check(project.kind === input.kind, '工程类型已变化');
  if (model && project.revision > 0)
    check(modelAllowed(studio, session, id), '请先授权当前模型读取已有工程');
  const constraints = mergeConstraints(
    input.constraints,
    acceptedBrief(studio, id)?.constraints ?? studio.store.read(id)?.design?.constraints,
  );
  // Validate declarations without pretending geometry exists yet.
  reviewDesign({ objects: [], bounds: [1, 1], kind: input.kind, design: { constraints } });
  const assumptions = input.assumptions ?? [];
  check(
    Array.isArray(assumptions) &&
      assumptions.length <= 12 &&
      assumptions.every(
        (s) => typeof s === 'string' && s.length > 0 && s.length <= 200 && !/[\x00-\x1f]/.test(s),
      ),
    '请将暂拟条件单独列出，每项不超过200字',
  );
  return studio.store.once(session, operation, { id, ...input }, () => {
    const prior = studio.store.pending(id);
    check(!prior || prior.type === 'brief', '请先处理已有CAD草案，不能用需求核对覆盖图纸');
    const pending = {
      type: 'brief',
      briefId: randomUUID(),
      baseRevision: project.revision,
      name: input.name,
      constraints,
      assumptions,
    };
    studio.store.setPending(id, pending);
    return {
      projectId: id,
      ...pending,
      state: 'awaiting_user_confirmation',
      instruction:
        '需求卡已显示在右侧。请用户核对原要求、验收数值与暂拟条件；这一步不生成CAD，也没有替用户确认。确认后再绘图，已确认要求会独立保留。',
    };
  });
}

export async function propose(studio, session, input, operation, model = false) {
  const plan = proposal(input);
  let id = studio.store.bound(session);
  if (!id)
    id = studio.store.create(
      session,
      input.name ?? '新设计方案',
      plan.kind,
      operation + ':create',
    ).id;
  const p = studio.store.project(id);
  if (model) check(acceptedBrief(studio, id), '新设计请先用studio_brief确认需求卡，再提出空间方案');
  check(studio.store.pending(id)?.type !== 'drawing', '已有 CAD 草案，请用绘图工具调整');
  studio.store.once(session, operation, { id, plan }, () => {
    studio.store.assertWriter(session, id, p.revision);
    check(p.revision === 0, '当前工程已有场景，请新建工程后提出新方案');
    studio.store.setPending(id, plan);
    return { projectId: id, state: 'awaiting_user_confirmation' };
  });
  return {
    projectId: id,
    state: 'awaiting_user_confirmation',
    instruction: '请在右侧核对并接受方案。尚未生成或确认几何。',
  };
}

export function furnish(studio, session, input, operation, model = false) {
  const id = studio.store.bound(session);
  check(id, '没有活动工程');
  if (model) check(modelAllowed(studio, session, id), '项目数据未获当前模型外发授权');
  check(HAS_LOCAL_ASSETS, '当前未安装可选家具库，请使用通用构件或导入模型');
  return studio.store.once(session, operation, { id, ...input }, () => {
    const p = studio.store.assertWriter(session, id, input.expectedRevision);
    check(p.revision > 0, '请先确认空间尺寸并建模');
    const scene = studio.store.read(id),
      result = furnishScene(scene, input, scene.parameters?.confirmationId);
    result.scene.objects.find((o) => o.id === result.objectId).origin.actor = model
      ? 'model_tool'
      : 'local_user';
    const saved = studio.store.commit(session, id, p.revision, result.scene, operation);
    studio.store.select(session, id, saved.revision, result.objectId);
    return { ...saved, objectId: result.objectId, changedIds: result.changedIds };
  });
}

/**
 * The user's confirmation of what is pending: the requirements, a CAD draft, an imported plan or
 * a first proposal. Only the side panel calls this; the model has no tool for it.
 */
export function confirm(studio, session, input, operation) {
  const id = studio.store.bound(session);
  check(id, '请先建立工程');
  const accepted = studio.store.once(session, operation, { id, ...input }, () => {
    const p = studio.store.assertWriter(session, id, input.expectedRevision);
    if (input.briefId !== undefined) return confirmBrief(studio, id, p, input);
    const confirmationId = studio.store.confirmation(id, input);
    const scene = input.drawingId
      ? confirmedDraft(studio, id, p, input, confirmationId)
      : firstScene(studio, id, p, input, confirmationId);
    const result = studio.store.commit(
      session,
      id,
      input.expectedRevision,
      scene,
      operation,
      confirmationId,
    );
    studio.store.clearPending(id);
    return result;
  });
  if (input.drawingId)
    try {
      cleanConfirmedDraft(studio.store, id, input.drawingId);
    } catch (error) {
      accepted.warning = '已保存源版本；临时CAD副本清理未完成：' + error.message;
    }
  return accepted;
}

/** Requirements become binding; they do not change the scene, so no revision is made. */
function confirmBrief(studio, id, p, input) {
  const brief = studio.store.pending(id);
  check(
    brief?.type === 'brief' && brief.briefId === input.briefId && brief.baseRevision === p.revision,
    '需求卡已变化，请重新核对',
  );
  check(input.acceptBrief === true, '请先核对需求卡中的原要求与暂拟条件');
  const confirmationId = studio.store.confirmation(id, { ...brief, action: 'design_brief' });
  studio.store.clearPending(id);
  return {
    projectId: id,
    revision: p.revision,
    briefId: brief.briefId,
    confirmationId,
    state: 'requirements_confirmed',
  };
}

/** The pending CAD draft as the next scene, with every object marked as accepted by the user. */
function confirmedDraft(studio, id, p, input, confirmationId) {
  const draft = studio.store.pending(id);
  check(
    draft?.type === 'drawing' &&
      draft.drawingId === input.drawingId &&
      draft.baseRevision === p.revision,
    'CAD 草案已变化，请重新查看并确认',
  );
  check(input.acceptDrawing === true, '请核对 CAD 方案和尺寸后确认');
  check(
    !draft.scene.design.constraintChanges?.length || input.acceptConstraintChanges === true,
    '项目要求有变更，请在确认窗口逐项核对并接受',
  );
  requireConstraintsReady(reviewDesign(draft.scene, {}));
  const scene = structuredClone(draft.scene);
  const accepted = (origin) => ({
    ...origin,
    status: 'user_confirmed',
    confirmationId,
    acceptedBy: 'user',
  });
  scene.parameters = { ...scene.parameters, status: 'user_confirmed', confirmationId };
  scene.design.confirmationId = confirmationId;
  if (scene.design.constraints) scene.design.constraints.confirmationId = confirmationId;
  for (const object of scene.objects) {
    object.origin = accepted(object.origin);
    for (const opening of object.openings ?? []) opening.origin = accepted(opening.origin);
  }
  return scene;
}

/** A project's first scene, from an imported plan or a proposed room, bound to the requirements. */
function firstScene(studio, id, p, input, confirmationId) {
  check(p.revision === 0, '工程已有确认场景');
  let scene;
  if (input.importId) {
    const row = studio.store.db
      .prepare('SELECT report FROM imports WHERE id=? AND project=?')
      .get(input.importId, id);
    check(row, '导入报告不属于当前工程');
    check(input.acceptCenterlines === true, '请确认当前墙中心线识别范围');
    scene = sceneFromCad(JSON.parse(row.report), input, confirmationId);
  } else {
    const proposed = studio.store.pending(id);
    check(proposed, '没有待确认的方案');
    scene = sceneFromProposal(proposed, confirmationId);
  }
  const brief = acceptedBrief(studio, id);
  if (brief) {
    scene.schemaVersion = Math.max(7, scene.schemaVersion);
    scene.design ??= {
      name: p.name,
      dimensionBasis: p.kind === 'booth' ? 'site' : 'centerline',
      assumptions: brief.assumptions,
      roomLabels: [],
    };
    scene.design.briefId = brief.briefId;
    scene.design.constraints = mergeConstraints(undefined, brief.constraints);
    requireConstraintsReady(reviewDesign(scene, {}));
  }
  return scene;
}

export function edit(studio, session, input, operation, model = false) {
  const id = studio.store.bound(session);
  check(id, '没有活动工程');
  if (model) check(modelAllowed(studio, session, id), '项目数据未获当前模型外发授权');
  return studio.store.once(session, operation, { id, ...input }, () => {
    const p = studio.store.assertWriter(session, id, input.expectedRevision);
    const selection = studio.store.selection(session, id, p.revision, input.selectionToken);
    check(selection, '请先点选对象或墙面');
    const result = editScene(studio.store.read(id), selection, input);
    const saved = studio.store.commit(session, id, p.revision, result.scene, operation);
    if (result.scene.objects.some((o) => o.id === selection.objectId))
      studio.store.select(session, id, saved.revision, selection.objectId, selection.surfaceId);
    return { ...saved, changedIds: result.changedIds, selectionSnapshot: selection };
  });
}
