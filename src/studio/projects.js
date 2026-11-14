/** Project list management and cleanup of regenerable files. */
import { rename } from 'node:fs/promises';
import { hash } from '../store.js';
import { check } from '../scene.js';
import { derivativePlan, cleanDerivatives } from '../derivative-cleanup.js';
import { currentGallery } from './overview.js';
import { readyModel } from './tasks.js';

export function projectActivity(studio, id) {
  // ponytail: one CAD worker; a short global lock avoids deleting any in-flight CAD input/output.
  if (studio.drawings.size) return 'CAD 正在处理，请完成后重试';
  if (
    studio.store.db
      .prepare("SELECT 1 FROM tasks WHERE project=? AND state IN ('queued','running')")
      .get(id)
  )
    return '建模或出图任务正在运行';
  const sessions = studio.store.db
    .prepare(
      'SELECT session FROM bindings WHERE project=? UNION SELECT writer AS session FROM projects WHERE id=?',
    )
    .all(id, id);
  if (sessions.some(({ session }) => studio.isSessionRunning(session))) return '关联聊天正在运行';
  return null;
}

export function manage(studio, action, input, operation) {
  if (action === 'list')
    return {
      projects: studio.store.db
        .prepare(
          'SELECT id,name,kind,revision,created,writer,deleted FROM projects WHERE deleted<2 ORDER BY created DESC',
        )
        .all()
        .map((p) => ({
          ...p,
          sessionIds: studio.store.db
            .prepare('SELECT session FROM bindings WHERE project=? ORDER BY session')
            .all(p.id)
            .map((row) => row.session),
          activity: projectActivity(studio, p.id),
        })),
    };
  check(['rename', 'delete'].includes(action), '未支持的工程管理操作');
  check(
    !projectActivity(studio, input.projectId),
    '工程正在使用，请等待关联聊天、CAD 或出图任务结束',
  );
  return action === 'rename'
    ? studio.store.rename(input, operation)
    : studio.store.delete(input, operation);
}

export function cleanupPlan(studio, session, input = {}) {
  const id = studio.store.bound(session);
  check(id, '请先打开工程');
  studio.store.assertWriter(session, id, input.expectedRevision);
  check(!projectActivity(studio, id), '工程正在使用，请完成聊天和后台任务后清理');
  const p = studio.store.project(id),
    scene = studio.store.read(id),
    ready = scene ? readyModel(studio, id, p.revision, hash(JSON.stringify(scene))) : null;
  const protectedIds = [
    ...(ready ? [ready.id] : []),
    ...currentGallery(studio, id, p.revision).map((v) => v.taskId),
  ];
  return derivativePlan(studio.store, id, protectedIds, input.includeHistory ?? false);
}

export function cleanup(studio, session, input, operation) {
  const id = studio.store.bound(session);
  check(id, '请先打开工程');
  const plan = cleanupPlan(studio, session, {
    expectedRevision: studio.store.project(id).revision,
    includeHistory: input.includeHistory,
  });
  return cleanDerivatives(studio.store, session, id, input, operation, plan);
}
