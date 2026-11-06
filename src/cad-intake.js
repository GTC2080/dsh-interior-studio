/** Claim CAD before the standard composer can turn it into an attachment. */
export const isCad = file => /\.(dxf|dwg)$/i.test(file.name);

export function installCadIntake({document,window,getSession,intake,onError}) {
  const receive=event=>{
    const files=[...(event.dataTransfer?.files??event.clipboardData?.files??event.target?.files??[])];
    if(!files.some(isCad))return;
    if(event.type==='change' && event.target?.hasAttribute?.('data-interior-file'))return;
    event.preventDefault();event.stopImmediatePropagation();
    // The stock attachment view uses dragend to release its document drop overlay.
    if(event.type==='drop')window.dispatchEvent(new Event('dragend'));
    const session=getSession();
    if(!session){onError(new Error('请先选择工作区或新建聊天，再导入 CAD。文件没有作为普通附件添加。'));return;}
    if(event.type==='change')event.target.value='';
    Promise.resolve().then(()=>intake(session,files)).catch(onError);
  };
  for(const type of ['drop','paste','change'])document.addEventListener(type,receive,true);
  return()=>{for(const type of ['drop','paste','change'])document.removeEventListener(type,receive,true);};
}
