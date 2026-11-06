import React,{useEffect,useMemo,useRef,useState} from 'react';
import {Button,Menu,IconDownloadOutlineRegular,IconPlusOutlineRegular,IconFullscreenOutlineRegular} from '@deepseek-ai/dsh-client-ui-primitives';
import {drawingSheet,sheetSvg,needsMeshElevation} from './drafting.js';

const save=(bytes,name,type)=>{
  const url=URL.createObjectURL(new Blob([bytes],{type})),link=document.createElement('a');
  link.href=url;link.download=name.replace(/[<>:"/\\|?*\x00-\x1f]/g,'-');link.click();setTimeout(()=>URL.revokeObjectURL(url),5000);
};
const home={zoom:1,pan:[0,0]};

export function DrawingSheet({scene,geometryKey,view,selector,name,revision,draft,drawingId,api,sessionId}) {
  const [overhead,setOverhead]=useState(false),[pose,setPose]=useState(home),[size,setSize]=useState({width:1,height:1});
  const [menu,setMenu]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState('');
  const [meshResult,setMeshResult]=useState(null),[retry,setRetry]=useState(0);
  const host=useRef(null),drag=useRef(null),request=useRef(null);
  const [cutPosition,setCutPosition]=useState(''),[cutDraft,setCutDraft]=useState('');
  useEffect(()=>{setCutPosition('');setCutDraft('');},[view,geometryKey]);
  const section=view.startsWith('section_');
  const mesh=needsMeshElevation(scene,view),pageKey=`${geometryKey}:${view}:${section?cutPosition:''}`;
  useEffect(()=>{
    if(!mesh){setMeshResult(null);return;}
    const controller=new AbortController();setMeshResult({key:pageKey,loading:true});
    api(sessionId,'drawing-sheet',{expectedRevision:revision,view,...(section&&cutPosition!==''?{cutAt:Number(cutPosition)}:{}),...(drawingId?{drawingId}:{})},undefined,controller.signal)
      .then(value=>{if(!controller.signal.aborted)setMeshResult({key:pageKey,sheet:value.sheet});})
      .catch(error=>{if(!controller.signal.aborted)setMeshResult({key:pageKey,error:error.message});});
    return()=>controller.abort();
  },[pageKey,mesh,sessionId,revision,drawingId,api,retry]);
  const result=useMemo(()=>{
    if(mesh&&(meshResult?.key!==pageKey||meshResult.loading))return {loading:true};
    if(mesh&&meshResult.error)return {error:meshResult.error};
    try {const sheet=mesh?meshResult.sheet:drawingSheet(scene,view,{name,revision,draft,overhead});return {sheet,svg:sheetSvg(sheet)};}
    catch(error){return {error:error.message};}
  },[geometryKey,view,name,revision,draft,overhead,mesh,pageKey,meshResult]);
  const baseFactor=Math.max(.01,Math.min((size.width-32)/420,(size.height-32)/297));
  const fitDrawing=()=>{
    const b=result.sheet?.focusBounds;if(!b)return home;
    const f=Math.min((size.width-32)/(b[2]-b[0]),(size.height-32)/(b[3]-b[1]));
    const zoom=Math.min(6,Math.max(.5,f/baseFactor)),scale=baseFactor*zoom;
    return {zoom,pan:[(210-(b[0]+b[2])/2)*scale,(148.5-(b[1]+b[3])/2)*scale]};
  };
  useEffect(()=>{setPose(fitDrawing());setError('');},[geometryKey,view,size.width,size.height,result.sheet]);
  useEffect(()=>{request.current?.abort();request.current=null;setBusy(false);},[geometryKey,sessionId]);
  useEffect(()=>{
    if(!host.current)return;
    const observer=new ResizeObserver(([entry])=>setSize({width:entry.contentRect.width,height:entry.contentRect.height}));
    observer.observe(host.current);return()=>observer.disconnect();
  },[result.error,result.loading]);
  const zoom=(factor,point=[0,0])=>setPose(old=>{
    const value=Math.min(6,Math.max(.5,old.zoom*factor)),ratio=value/old.zoom;
    return {zoom:value,pan:point.map((p,i)=>p-(p-old.pan[i])*ratio)};
  });
  useEffect(()=>{
    const node=host.current;if(!node)return;
    const wheel=e=>{e.preventDefault();const rect=node.getBoundingClientRect();zoom(Math.exp(-e.deltaY*.0018),[e.clientX-rect.left-rect.width/2,e.clientY-rect.top-rect.height/2]);};
    node.addEventListener('wheel',wheel,{passive:false});return()=>node.removeEventListener('wheel',wheel);
  },[result.error,result.loading]);
  useEffect(()=>()=>request.current?.abort(),[]);
  const download=async kind=>{
    setMenu(false);setError('');
    if(kind==='svg') {save(result.svg,`${name}-${result.sheet.label}-v${revision}.svg`,'image/svg+xml');return;}
    const controller=new AbortController();request.current=controller;setBusy(true);
    try {
      const value=await api(sessionId,'drawing-set',{expectedRevision:revision,includeSections:true,...(drawingId?{drawingId}:{})},undefined,controller.signal);
      controller.signal.throwIfAborted();
      save(Uint8Array.from(atob(value.base64),c=>c.charCodeAt(0)),value.filename,'application/dxf');
    } catch(e){if(!controller.signal.aborted)setError(e.message);}
    finally{if(request.current===controller){if(!controller.signal.aborted)setBusy(false);request.current=null;}}
  };
  const factor=baseFactor*pose.zoom;
  return <div className="is-drawing-viewer">
    <div className="is-sheet-toolbar">{selector}
      <div className="is-drawing-controls">{section&&<label>剖切位置 m<input aria-label="剖切位置，米" type="number" min="0.001" step="0.1" style={{width:65}} value={cutDraft} placeholder={String(scene.bounds[view==='section_x'?0:1]/2)} onChange={e=>setCutDraft(e.target.value)} onBlur={()=>setCutPosition(cutDraft)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();setCutPosition(cutDraft);}}}/></label>}<span className="is-drawing-scale">mm · 1:{result.sheet?.scale??'—'}</span>
        <Button size="sm" aria-label="缩小图纸" title="缩小" disabled={pose.zoom<=.5} onClick={()=>zoom(1/1.25)}>−</Button>
        <span className="is-drawing-zoom" aria-label="图纸缩放比例">{Math.round(pose.zoom*100)}%</span>
        <Button size="sm" aria-label="放大图纸" title="放大" disabled={pose.zoom>=6} onClick={()=>zoom(1.25)} icon={<IconPlusOutlineRegular/>}/>
        <Button size="sm" aria-label="图纸适合窗口" title="适合图形 · 0" onClick={()=>setPose(fitDrawing())} icon={<IconFullscreenOutlineRegular/>}/>
        <Button size="sm" aria-label="查看整张图纸" title="查看图框、图签和构件索引" onClick={()=>setPose(home)}>整页</Button>
        <Menu open={menu} onClose={()=>setMenu(false)} portal align="end" autoFocus onSelect={kind=>void download(kind)}
          items={[{id:'svg',label:'当前图纸 · SVG',disabled:!!result.error||result.loading},{id:'dxf',label:busy?'正在导出图册…':'全套图纸 · DXF',disabled:busy||!!result.error||result.loading}]}
          anchor={<Button size="sm" aria-label="导出图纸" title="导出图纸" aria-haspopup="menu" aria-expanded={menu} disabled={busy} icon={<IconDownloadOutlineRegular/>} onClick={()=>setMenu(v=>!v)}/>}/>
      </div>
    </div>
    {error&&<p className="is-error" role="alert">{error}</p>}
    {result.loading?<p role="status">正在生成立面图…</p>:result.error?<p className="is-error" role="alert">图纸生成失败：{result.error} {mesh&&<Button size="sm" onClick={()=>setRetry(n=>n+1)}>重试</Button>}</p>:<div className="is-cad-canvas" ref={host} tabIndex={0}
      aria-label="CAD 图纸画布，滚轮缩放，拖动平移，按 0 适合图形" onDoubleClick={()=>setPose(fitDrawing())}
      onKeyDown={e=>{if(e.key==='0'){setPose(fitDrawing());e.preventDefault();}else if(['+','=','-'].includes(e.key)){zoom(e.key==='-'?1/1.25:1.25);e.preventDefault();}
        else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){const offsets={ArrowLeft:[24,0],ArrowRight:[-24,0],ArrowUp:[0,24],ArrowDown:[0,-24]};setPose(old=>({...old,pan:old.pan.map((n,i)=>n+offsets[e.key][i])}));e.preventDefault();}}}
      onPointerDown={e=>{if(e.button!==0)return;drag.current={x:e.clientX,y:e.clientY};e.currentTarget.setPointerCapture(e.pointerId);}}
      onPointerMove={e=>{if(!drag.current)return;const dx=e.clientX-drag.current.x,dy=e.clientY-drag.current.y;drag.current={x:e.clientX,y:e.clientY};setPose(old=>({...old,pan:[old.pan[0]+dx,old.pan[1]+dy]}));}}
      onPointerUp={()=>{drag.current=null;}} onPointerCancel={()=>{drag.current=null;}}>
      <div className="is-cad-paper" style={{width:420*factor,height:297*factor,left:`calc(50% + ${pose.pan[0]}px)`,top:`calc(50% + ${pose.pan[1]}px)`}} dangerouslySetInnerHTML={{__html:result.svg}}/>
    </div>}
    <div className="is-drawing-caption"><span>滚轮缩放 · 拖动平移 · 双击适合图形</span>
      {view==='plan'&&<label><input type="checkbox" checked={overhead} onChange={e=>setOverhead(e.target.checked)}/>显示上方构件</label>}
      <span>{draft?'待确认草案':`v${revision}`} · A3 矢量图纸</span></div>
  </div>;
}
