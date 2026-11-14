/** The design service: everything the side panel and the model tools can ask of a project. */
import { readFile } from 'node:fs/promises';
import { ProjectStore } from './store.js';
import { check } from './scene.js';
import { AVAILABLE_FURNITURE } from './catalog.js';
import * as access from './studio/access.js';
import * as overview from './studio/overview.js';
import * as projects from './studio/projects.js';
import * as design from './studio/design.js';
import * as drafts from './studio/drafts.js';
import * as drawings from './studio/drawings.js';
import * as cadImport from './studio/cad-import.js';
import * as tasks from './studio/tasks.js';

export class Studio {
  constructor(root, engine, isSessionRunning = () => false, jobs = null) {
    this.store = new ProjectStore(root);
    this.engine = engine;
    this.running = new Map();
    this.routes = new Map();
    this.drawings = new Set();
    this.isSessionRunning = isSessionRunning;
    this.jobs = jobs;
  }
  /** Blender version that produced an output; outputs of another version are not reused. */
  get runtime() {
    return this.engine.manifest?.blenderVersion ?? 'test';
  }
  async dispose() {
    for (const task of this.running.values()) task.controller.abort();
    await Promise.allSettled([...this.running.values()].map((task) => task.done));
    // A worker that cannot be confirmed stopped must not keep the Host lock: the same process could never reload.
    try {
      await this.engine.dispose();
    } finally {
      await Promise.allSettled([...this.drawings]);
      this.store.close();
    }
  }
  trackCad(work) {
    this.drawings.add(work);
    return work.finally(() => this.drawings.delete(work));
  }

  // Model access
  beforeModelRequest(options) {
    return access.beforeModelRequest(this, options);
  }
  modelAllowed(session, id) {
    return access.modelAllowed(this, session, id);
  }
  requireModelAccess(session) {
    return access.requireModelAccess(this, session);
  }

  // What the panel and the model see
  snapshot(session, id) {
    return overview.snapshot(this, session, id);
  }
  gallery(id, revision) {
    return overview.currentGallery(this, id, revision);
  }
  context(session, input) {
    return overview.context(this, session, input);
  }
  review(session, input, model) {
    return overview.review(this, session, input, model);
  }

  // Project list
  manage(action, input, operation) {
    return projects.manage(this, action, input, operation);
  }
  cleanupPlan(session, input) {
    return projects.cleanupPlan(this, session, input);
  }
  cleanup(session, input, operation) {
    return projects.cleanup(this, session, input, operation);
  }

  // Requirements, confirmation and direct edits
  acceptedBrief(id) {
    return design.acceptedBrief(this, id);
  }
  brief(session, input, operation, model) {
    return design.saveBrief(this, session, input, operation, model);
  }
  propose(session, input, operation, model) {
    return design.propose(this, session, input, operation, model);
  }
  furnish(session, input, operation, model) {
    return design.furnish(this, session, input, operation, model);
  }
  confirm(session, input, operation) {
    return design.confirm(this, session, input, operation);
  }
  edit(session, input, operation, model) {
    return design.edit(this, session, input, operation, model);
  }

  // CAD drafts
  draw(...args) {
    return drafts.draw(this, ...args);
  }
  refine(session, input, operation, signal, model) {
    return drafts.refine(this, session, input, operation, signal, model);
  }

  // Drawings and exports
  draftPreview(session, input, signal, model) {
    return drawings.draftPreview(this, session, input, signal, model);
  }
  drawingPage(session, input, signal) {
    return drawings.drawingPage(this, session, input, signal);
  }
  drawingSet(session, input, signal) {
    return drawings.drawingSet(this, session, input, signal);
  }
  exportDesign(session, input, signal, model) {
    return drawings.exportDesign(this, session, input, signal, model);
  }

  // DXF import
  importCad(session, input, operation, signal) {
    return cadImport.importCad(this, session, input, operation, signal);
  }
  analyzeCad(session, input, operation, signal) {
    return cadImport.analyzeCad(this, session, input, operation, signal);
  }

  // 3D model and renders
  startBuild(session, input, operation, render, execution) {
    return tasks.startBuild(this, session, input, operation, render, execution);
  }
  artifact(session, input) {
    return tasks.artifact(this, session, input);
  }

  /** Requests from the side panel. */
  async ui(session, action, input, operation, signal) {
    switch (action) {
      case 'snapshot':
        return overview.polledSnapshot(this, session, input.known);
      case 'cleanup-preview':
        return this.cleanupPlan(session, input);
      case 'cleanup':
        return this.cleanup(session, input, operation);
      case 'create':
        check(!this.isSessionRunning(session), '聊天正在运行，请结束后再新建工程');
        return this.store.create(session, input.name, input.kind, operation);
      case 'open':
        return this.store.once(session, operation, input, () => {
          check(
            this.store.bound(session) === input.projectId || !this.isSessionRunning(session),
            '聊天正在运行，请结束后再切换工程',
          );
          if (input.takeOver === true)
            this.store.confirmation(input.projectId, {
              action: 'writer_takeover',
              previousWriter: this.store.project(input.projectId).writer,
              nextWriter: session,
            });
          return this.store.bind(session, input.projectId, input.takeOver === true);
        });
      case 'propose':
        return this.propose(session, input, operation);
      case 'draw':
        return this.draw(session, input, operation, signal);
      case 'brief':
        return this.brief(session, input, operation);
      case 'refine':
        return this.refine(session, input, operation, signal);
      case 'review':
        return this.review(session, input);
      case 'draft-preview':
        return this.draftPreview(session, input, signal);
      case 'drawing-sheet':
        return this.trackCad(this.drawingPage(session, input, signal));
      case 'drawing-set':
        return this.trackCad(this.drawingSet(session, input, signal));
      case 'export-design':
        return this.trackCad(this.exportDesign(session, input, signal));
      case 'drawing-artifact': {
        const id = this.store.bound(session);
        check(id, '没有活动工程');
        const draft = this.store.pending(id);
        check(draft?.type === 'drawing' && draft.drawingId === input.drawingId, 'CAD 草案已变化');
        const bytes = await readFile(this.store.dir(id, draft.relativePath, 'plan.dxf'));
        return { base64: bytes.toString('base64') };
      }
      case 'import':
        return this.trackCad(this.importCad(session, input, operation, signal));
      case 'analyze':
        return this.trackCad(this.analyzeCad(session, input, operation, signal));
      case 'furnish':
        return this.furnish(session, input, operation);
      case 'catalog-preview': {
        check(Object.hasOwn(AVAILABLE_FURNITURE, input.asset), '家具未安装或不可用');
        const path = new URL(
          '../assets/' + AVAILABLE_FURNITURE[input.asset].preview,
          import.meta.url,
        );
        return { base64: (await readFile(path)).toString('base64') };
      }
      case 'confirm':
        return this.confirm(session, input, operation);
      case 'select':
        return this.store.select(
          session,
          this.store.bound(session),
          input.expectedRevision,
          input.objectId,
          input.surfaceId,
        );
      case 'consent':
        return access.setConsent(this, session, input);
      case 'edit':
        return this.edit(session, input, operation);
      case 'undo':
      case 'redo':
        return this.store.history(
          session,
          this.store.bound(session),
          input.expectedRevision,
          action,
          operation,
        );
      case 'build':
        return this.startBuild(session, input, operation);
      case 'render':
        return this.startBuild(session, input, operation, true);
      case 'cancel': {
        const task = this.store.db
          .prepare('SELECT project FROM tasks WHERE id=?')
          .get(input.taskId);
        check(task?.project === this.store.bound(session), '任务不属于活动工程');
        this.running.get(input.taskId)?.controller.abort();
        return { cancelling: input.taskId };
      }
      case 'artifact':
        return { base64: (await this.artifact(session, input)).toString('base64') };
      default:
        throw new Error('未支持的本地操作');
    }
  }
}
