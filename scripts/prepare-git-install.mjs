/** DSH's approved Git prepare step. It needs Node and macOS tools, not system Python. */
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { createReadStream, existsSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifyRuntime } from '../src/engine.js';

const root=fileURLToPath(new URL('../',import.meta.url));
const run=(file,args,timeout)=>execFileSync(file,args,{cwd:root,timeout,stdio:'inherit'});
const checkSignature=app=>run('/usr/bin/codesign',['--verify','--deep','--strict',app],120_000);

async function prepare() {
  const manifest=JSON.parse(await readFile(join(root,'runtime/manifest.json'),'utf8'));
  if(process.platform!==manifest.platform||process.arch!==manifest.arch) {
    throw new Error('设计插件目前仅支持 Apple 芯片 Mac。');
  }
  if(existsSync(join(root,'runtime/Blender.app'))||existsSync(join(root,'runtime/vendor'))) {
    await verifyRuntime(root);
    checkSignature(join(root,'runtime/Blender.app'));
    return;
  }

  // Use the interpreter shipped in the pinned Blender image to run the existing setup.
  const python=manifest.entries.find(({path,executable})=>executable&&
    /^runtime\/Blender\.app\/Contents\/Resources\/\d+\.\d+\/python\/bin\/python3\.\d+$/.test(path));
  if(!python)throw new Error('Blender 清单缺少内置 Python。');
  const stage=await mkdtemp(join(tmpdir(),'dsh-interior-git-install-'));
  const image=join(stage,'Blender.dmg'),mount=join(stage,'mount'),app=join(mount,'Blender.app');
  let mounted=false;
  try {
    console.log(`准备设计插件自带的 Blender ${manifest.blenderVersion}…`);
    run('/usr/bin/curl',['-q','--fail','--silent','--show-error','--location',
      '--proto','=https','--proto-redir','=https','--connect-timeout','15','--max-time','360',
      '--max-filesize',String(512*1024*1024),'--output',image,manifest.source],365_000);
    const hash=createHash('sha256');
    for await(const chunk of createReadStream(image))hash.update(chunk);
    if(hash.digest('hex')!==manifest.upstreamSha256)throw new Error('Blender 下载文件的 SHA-256 校验失败。');

    await mkdir(mount,{mode:0o700});
    run('/usr/bin/hdiutil',['attach','-readonly','-nobrowse','-mountpoint',mount,image],120_000);
    mounted=true;
    checkSignature(app);
    run(join(mount,python.path.slice('runtime/'.length)),
      ['-I','-B',join(root,'scripts/prepare-runtime.py'),'--core-only','--blender-app',app],300_000);
  } finally {
    // Detach our own image before touching its temporary mount directory.
    if(mounted||existsSync(app))run('/usr/bin/hdiutil',['detach',mount],90_000);
    await rm(stage,{recursive:true,force:true});
  }
}

try {
  await prepare();
} catch(error) {
  console.error(`设计插件运行时安装失败：${error.message}`);
  process.exitCode=1;
}
