/** Plugin-owned project catalog in the native main-panel seat. */
import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Button, Menu, Modal, IconFolderOpenOutlineRegular, IconPlusOutlineRegular,
  IconEllipsisOutlineRegular, IconSearchOutlineRegular, IconRefreshOutlineRegular } from '@deepseek-ai/dsh-client-ui-primitives';

export function ProjectManager({ manage, openProject, createProject, workspaces, defaultWorkspace }) {
  const workspaceState = useSyncExternalStore(listener => workspaces.subscribe(listener), () => workspaces.getSnapshot());
  const [projects, setProjects] = useState(null), [error, setError] = useState(''), [notice, setNotice] = useState('');
  const [search, setSearch] = useState(''), [busy, setBusy] = useState(false), [menu, setMenu] = useState(null);
  const [dialog, setDialog] = useState(null), [name, setName] = useState(''), [kind, setKind] = useState('interior');
  const [workspaceId, setWorkspaceId] = useState('');
  const sequence = useRef(0), mounted = useRef(false), request = useRef(null), lock = useRef(false);
  const operation = useRef(null), heading = useRef(null);
  const refresh = async () => {
    const current = ++sequence.current;
    request.current?.abort(); request.current = new AbortController();
    try {
      const result = await manage('list', {}, undefined, request.current.signal);
      if (mounted.current && current === sequence.current) { setProjects(result.projects); setError(''); }
    } catch (e) { if (mounted.current && current === sequence.current && e.name !== 'AbortError') setError(e.message); }
  };
  useEffect(() => {
    mounted.current = true; void refresh(); heading.current?.focus();
    const timer = setInterval(() => { if (!lock.current && document.visibilityState === 'visible') void refresh(); }, 3000);
    return () => { mounted.current = false; ++sequence.current; request.current?.abort(); clearInterval(timer); };
  }, []);
  const show = (action, project) => {
    operation.current = crypto.randomUUID(); setMenu(null); setError('');
    setName(action === 'rename' ? project.name : ''); setDialog({ action, project });
    if (action === 'create') setWorkspaceId(defaultWorkspace() ?? '');
  };
  const run = async (work, success) => {
    if (lock.current) return;
    lock.current = true; setBusy(true); setError(''); setNotice('');
    try {
      await work();
      if (mounted.current) { setDialog(null); setNotice(success); await refresh(); }
    } catch (e) { if (mounted.current) { await refresh(); setError(e.message); } }
    finally { lock.current = false; if (mounted.current) setBusy(false); }
  };
  const submit = e => {
    e.preventDefault();
    const { action, project } = dialog;
    if (action === 'create') void run(() => createProject({ name: name.trim(), kind, workspaceId }, operation.current), '工程已创建');
    else void run(() => manage(action, { projectId: project.id, expectedRevision: project.revision,
      ...(action === 'rename' ? { name: name.trim(), expectedName: project.name } : { confirmName: name }) }, operation.current),
    action === 'rename' ? '名称已更新' : '工程及本地文件已删除');
  };
  const rows = (projects ?? []).filter(project => project.name.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()));
  const target = dialog?.project;
  const liveTarget = target && projects?.find(project => project.id === target.id);
  const changed = target && (!liveTarget || liveTarget.name !== target.name || liveTarget.revision !== target.revision);
  const disabled = busy || !!liveTarget?.activity || changed;
  return <section className="is-projects" aria-label="设计工程管理" data-design-projects>
    <div className="is-projects-content">
      <header className="is-projects-heading"><div><h1 ref={heading} tabIndex={-1}>设计工程</h1><p>所有本地设计，集中管理。</p></div>
        <Button variant="primary" icon={<IconPlusOutlineRegular/>} disabled={busy} onClick={() => show('create')}>新建工程</Button>
      </header>
      <div className="is-projects-toolbar"><label className="is-project-search"><IconSearchOutlineRegular size={16}/><input type="search" aria-label="搜索工程" placeholder="搜索工程" value={search} onChange={e => setSearch(e.target.value)}/></label>
        <span className="is-subtle">{projects ? `${projects.length} 个工程` : '正在加载'}</span><Button size="sm" title="刷新工程" aria-label="刷新工程" icon={<IconRefreshOutlineRegular/>} disabled={busy} onClick={() => void refresh()}/>
      </div>
      {error && <div className="is-error" role="alert">{error}<Button size="sm" onClick={() => void refresh()}>重试</Button></div>}
      {notice && <p className="is-project-notice" role="status">{notice}</p>}
      <ul className="is-project-list" aria-label="工程列表" aria-busy={projects === null}>
        {rows.map(project => <li key={project.id} data-project-id={project.id}>
          <Button className="is-project-open" disabled={busy || project.deleted === 1} onClick={() => void run(() => openProject(project), '')}>
            <span className="is-project-glyph"><IconFolderOpenOutlineRegular size={22}/></span><span className="is-project-copy"><strong title={project.name}>{project.name}</strong>
              <span>{project.kind === 'interior' ? '室内空间' : '展台'}<i>·</i>{project.revision ? `v${project.revision}` : '尚无确认版本'}<i>·</i>{new Date(project.created).toLocaleDateString('zh-CN')}</span></span>
          </Button>
          <span className={`is-project-state${project.deleted ? ' is-danger-text' : ''}`}>{project.deleted ? '待清理' : project.activity ? '使用中' : ''}</span>
          <Menu open={menu === project.id} onClose={() => setMenu(null)} portal align="end" autoFocus
            items={[{ id: 'open', label: '打开工程', disabled: project.deleted === 1 },
              { id: 'rename', label: '重命名', disabled: !!project.activity || project.deleted === 1 },
              { type: 'separator', id: 'separator' }, { id: 'delete', label: project.deleted ? '重试删除' : '删除工程', danger: true, disabled: !!project.activity }]}
            onSelect={action => { setMenu(null); if (action === 'open') void run(() => openProject(project), ''); else show(action, project); }}
            anchor={<Button size="sm" aria-label={`管理 ${project.name}`} title="管理工程" aria-haspopup="menu" aria-expanded={menu === project.id} disabled={busy} icon={<IconEllipsisOutlineRegular/>} onClick={() => setMenu(menu === project.id ? null : project.id)}/>}/>
        </li>)}
      </ul>
      {projects && !rows.length && <div className="is-projects-empty"><IconFolderOpenOutlineRegular size={32}/><h2>{search ? '没有找到工程' : '开始你的第一个设计'}</h2><p>{search ? '试试其他名称。' : '新建工程，或在聊天里拖入 CAD 图纸。'}</p></div>}
    </div>
    <Modal open={dialog !== null} title={{ create: '新建工程', rename: '重命名工程', delete: '删除工程' }[dialog?.action] ?? '设计工程'}
      closeLabel="关闭对话框" onClose={() => { if (!busy) setDialog(null); }} className="is-dialog" contentClassName="is-dialog-content">
      {dialog && <form className="is-form" onSubmit={submit}>
        {dialog.action === 'delete' ? <><p>将永久删除「{target.name}」及其本地图纸、模型、效果图和历史版本，无法撤销。</p><p className="is-subtle">已有聊天消息和图片会保留。</p><label>输入工程名称确认<input data-modal-autofocus required autoComplete="off" value={name} maxLength={100} onChange={e => setName(e.target.value)}/></label></>
          : <label>工程名称<input data-modal-autofocus required autoComplete="off" maxLength={100} value={name} onChange={e => setName(e.target.value)}/></label>}
        {dialog.action === 'create' && <><label>设计类型<select value={kind} onChange={e => setKind(e.target.value)}><option value="interior">室内空间</option><option value="booth">展台</option></select></label>
          {!!workspaceState.items.length && <label>聊天工作区<select required value={workspaceId} onChange={e => setWorkspaceId(e.target.value)}>{workspaceState.items.map(workspace => <option key={workspace.workspaceId} value={workspace.workspaceId}>{workspace.title || workspace.path}</option>)}</select></label>}
          <p className="is-subtle">将打开新的设计聊天和建模面板。</p></>}
        {changed && <p className="is-error">工程已变化，请关闭窗口后重新操作。</p>}
        {liveTarget?.activity && <p className="is-subtle">{liveTarget.activity}，完成后可继续操作。</p>}
        {error && <p className="is-error" role="alert">{error}</p>}
        <div className="is-dialog-actions"><Button disabled={busy} onClick={() => setDialog(null)}>取消</Button>
          <Button type="submit" variant={dialog.action === 'delete' ? 'outline' : 'primary'} className={dialog.action === 'delete' ? 'is-danger-text' : ''}
            disabled={disabled || !name.trim() || (dialog.action === 'delete' && name !== target.name)}>{busy ? '处理中…' : { create: '创建工程', rename: '保存名称', delete: target?.deleted ? '重试删除' : '永久删除' }[dialog.action]}</Button></div>
      </form>}
    </Modal>
  </section>;
}
