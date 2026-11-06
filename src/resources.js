/** Read and bound local GLB/image bytes before invoking Blender. */
import {createHash} from 'node:crypto';
import {open,realpath} from 'node:fs/promises';
import {constants} from 'node:fs';
import {isAbsolute,extname} from 'node:path';
const check=(ok,message)=>{if(!ok)throw Error(message);};
export const resourceHash=bytes=>createHash('sha256').update(bytes).digest('hex');

export function imageInfo(bytes) {
  let width,height,extension;
  if(bytes.length>=24&&bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))&&bytes.toString('ascii',12,16)==='IHDR') {
    width=bytes.readUInt32BE(16);height=bytes.readUInt32BE(20);extension='png';
  } else if(bytes[0]===255&&bytes[1]===216) {
    let at=2;
    while(at+4<=bytes.length) {
      check(bytes[at]===255,'JPEG 标记无效');
      while(bytes[at]===255)at++;
      const marker=bytes[at++];if(marker===217||marker===218)break;
      if(marker===1||marker>=208&&marker<=215)continue;
      const size=bytes.readUInt16BE(at);check(size>=2&&at+size<=bytes.length,'JPEG 数据不完整');
      if([192,193,194].includes(marker)){check(size>=8,'JPEG 尺寸无效');height=bytes.readUInt16BE(at+3);width=bytes.readUInt16BE(at+5);extension='jpg';break;}
      at+=size;
    }
  }
  check(extension&&width>0&&height>0&&width<=8192&&height<=8192&&width*height<=16_777_216,'仅支持尺寸受限的 PNG/JPEG 图片（最多 16 MP）');
  return {width,height,extension};
}

export function validateGlb(bytes) {
  check(bytes.length>=28&&bytes.toString('ascii',0,4)==='glTF'&&bytes.readUInt32LE(4)===2&&bytes.readUInt32LE(8)===bytes.length,'需要完整的 glTF 2.0 GLB 文件');
  let at=12,document,bin;
  while(at+8<=bytes.length) {
    const size=bytes.readUInt32LE(at),type=bytes.readUInt32LE(at+4);at+=8;
    check(size%4===0&&at+size<=bytes.length,'GLB 块长度无效');
    if(type===0x4e4f534a){check(!document&&at===20&&size<=4*1024*1024,'GLB JSON 超出预算或顺序无效');document=JSON.parse(bytes.toString('utf8',at,at+size));}
    else if(type===0x004e4942){check(document&&!bin,'GLB 二进制块重复或顺序无效');bin=bytes.subarray(at,at+size);}
    else throw Error('不支持的 GLB 数据块');
    at+=size;
  }
  check(at===bytes.length&&document?.asset?.version==='2.0'&&bin,'GLB 缺少静态模型数据');
  check(Array.isArray(document.buffers)&&document.buffers.length===1&&!document.buffers[0].uri&&Number.isInteger(document.buffers[0].byteLength)&&document.buffers[0].byteLength>0&&document.buffers[0].byteLength<=bin.length,'GLB 必须内嵌全部数据');
  check(!document.animations?.length&&!document.skins?.length,'工程导入仅支持静态模型，请先烘焙动画和骨骼');
  check(!document.extensionsUsed?.some(e=>['KHR_draco_mesh_compression','EXT_meshopt_compression','KHR_texture_basisu','EXT_texture_webp','MSFT_lod','EXT_mesh_gpu_instancing'].includes(e)),'请导出未压缩、无实例扩展的静态 GLB');
  const views=document.bufferViews??[],accessors=document.accessors??[],nodes=document.nodes??[],meshes=document.meshes??[];
  check(views.length<=4096&&accessors.length<=4096&&nodes.length<=512&&meshes.length<=256&&(document.materials?.length??0)<=128,'GLB 对象或材质超过导入预算');
  for(const view of views)check((view.buffer??0)===0&&Number.isInteger(view.byteLength)&&view.byteLength>0&&Number.isInteger(view.byteOffset??0)&&(view.byteOffset??0)>=0&&(view.byteOffset??0)+view.byteLength<=document.buffers[0].byteLength,'GLB 缓冲区越界');
  const accessor=i=>{const a=accessors[i];check(a&&Number.isInteger(a.count)&&a.count>0&&a.count<=300000&&!a.sparse&&views[a.bufferView],'GLB 顶点数据无效或超过预算');return a;};
  let vertices=0,triangles=0;
  for(const mesh of meshes)for(const p of mesh.primitives??[]) {
    check((p.mode??4)===4&&!p.targets?.length,'仅支持无变形的三角形网格');
    const a=accessor(p.attributes?.POSITION);check(a.type==='VEC3'&&a.componentType===5126,'GLB 顶点必须为三维浮点坐标');
    vertices+=a.count;triangles+=(p.indices===undefined?a.count:accessor(p.indices).count)/3;
  }
  check(vertices>0&&vertices<=300000&&Number.isInteger(triangles)&&triangles<=200000,'GLB 最多 30 万顶点、20 万三角面');
  let pixels=0;check((document.images?.length??0)<=16,'GLB 图片最多16张');
  for(const image of document.images??[]) {
    check(!image.uri&&['image/png','image/jpeg'].includes(image.mimeType),'GLB 图片必须内嵌 PNG/JPEG，不支持外部 URI');
    const view=views[image.bufferView];check(view,'GLB 图片引用无效');
    const info=imageInfo(bin.subarray(view.byteOffset??0,(view.byteOffset??0)+view.byteLength));pixels+=info.width*info.height;
  }
  check(pixels<=33_554_432,'GLB 累计图片像素超过 32 MP');
  return {vertices,triangles,images:document.images?.length??0,pixels};
}

export async function readResource(path,kind,signal) {
  signal?.throwIfAborted();
  check(typeof path==='string'&&isAbsolute(path),'素材路径必须是绝对路径');
  const resolved=await realpath(path),file=await open(resolved,constants.O_RDONLY|constants.O_NOFOLLOW|constants.O_NONBLOCK);
  try {
    const stat=await file.stat();check(stat.isFile()&&stat.size>0&&stat.size<=20*1024*1024,'素材必须是普通文件，大小不超过20 MiB');
    const buffer=Buffer.alloc(stat.size+1);let length=0;
    while(length<buffer.length){signal?.throwIfAborted();const {bytesRead}=await file.read(buffer,length,buffer.length-length,length);if(!bytesRead)break;length+=bytesRead;}
    const after=await file.stat();check(length===stat.size&&after.size===stat.size&&after.mtimeMs===stat.mtimeMs,'读取素材时文件已变化，请重试');
    const bytes=buffer.subarray(0,length);
    if(kind==='model'){check(extname(resolved).toLowerCase()==='.glb','精细模型请导出 GLB；不直接载入可执行的 blend');return {bytes,extension:'glb',info:validateGlb(bytes)};}
    const info=imageInfo(bytes);return {bytes,extension:info.extension,info};
  } finally {await file.close();}
}

