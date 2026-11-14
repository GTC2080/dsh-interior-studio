/** Which model a project may be shown to: the user grants each chat and model separately. */
import { check } from '../scene.js';

/** Runs before DSH sends any request, including retained project history. */
export function beforeModelRequest(studio, options) {
  if (!options.sessionId) return;
  const route = JSON.stringify({ provider: options.provider, model: options.model });
  if (!options.purpose) studio.routes.set(options.sessionId, route);
  const disclosed = studio.store.db
    .prepare('SELECT project FROM disclosures WHERE session=?')
    .all(options.sessionId);
  for (const { project } of disclosed) {
    const allowed =
      studio.store.db.prepare('SELECT consent FROM projects WHERE id=?').get(project)?.consent ===
        1 &&
      studio.store.db
        .prepare('SELECT 1 FROM route_grants WHERE session=? AND project=? AND route=?')
        .get(options.sessionId, project, route);
    check(
      allowed,
      '此聊天包含工程摘要，当前模型或授权已变化。请在右侧重新授权该接收模型，或使用新聊天；本地编辑仍可继续。',
    );
  }
}

export function modelAllowed(studio, session, id) {
  const route = studio.routes.get(session);
  return Boolean(
    route &&
    studio.store.project(id).consent &&
    studio.store.db
      .prepare('SELECT 1 FROM route_grants WHERE session=? AND project=? AND route=?')
      .get(session, id, route),
  );
}

/** Records that this chat has received project content, so later model changes are re-checked. */
export function disclose(studio, session, id) {
  studio.store.db.prepare('INSERT OR IGNORE INTO disclosures VALUES(?,?)').run(session, id);
}

/** Model tools act only on a project the user has shared with the current model. */
export function requireModelAccess(studio, session) {
  const id = studio.store.bound(session);
  check(id, '没有活动工程');
  check(modelAllowed(studio, session, id), '工程未获外发授权');
}

/** The user allows or withdraws sharing of the open project with the chat's current model. */
export function setConsent(studio, session, input) {
  const id = studio.store.bound(session);
  studio.store.assertWriter(session, id, input.expectedRevision);
  check(typeof input.allow === 'boolean', '外发授权值无效');
  const route = studio.routes.get(session);
  if (input.allow)
    check(route, '尚未确定接收模型。请先在聊天发送一条不含图纸资料的消息，再授权摘要。');
  const confirmationId = studio.store.confirmation(id, {
    categories: ['dimensions', 'scene_summary', 'selection'],
    recipient: route ? JSON.parse(route) : null,
    purpose: 'interactive design',
    allow: input.allow,
  });
  const db = studio.store.db;
  db.prepare('UPDATE projects SET consent=? WHERE id=?').run(input.allow ? 1 : 0, id);
  if (input.allow)
    db.prepare('INSERT OR IGNORE INTO route_grants VALUES(?,?,?)').run(session, id, route);
  else db.prepare('DELETE FROM route_grants WHERE project=?').run(id);
  return { allowed: input.allow, confirmationId };
}
