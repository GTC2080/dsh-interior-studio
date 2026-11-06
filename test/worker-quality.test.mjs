import test from 'node:test';
import {execFileSync} from 'node:child_process';
import {readFileSync,mkdtempSync,rmSync,realpathSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
test('actual Blender camera, contact helper and section checks',()=>{
  const root=fileURLToPath(new URL('../',import.meta.url)),runtime=JSON.parse(readFileSync(join(root,'runtime/manifest.json'))),folder=realpathSync(mkdtempSync(join(tmpdir(),'dsh-worker-quality-')));
  try {
    const env={...process.env,PYTHONDONTWRITEBYTECODE:'1',PYTHONNOUSERSITE:'1',BLENDER_USER_CONFIG:join(folder,'config'),BLENDER_USER_SCRIPTS:join(folder,'scripts'),BLENDER_USER_EXTENSIONS:join(folder,'extensions'),XDG_CACHE_HOME:join(folder,'cache')};
    delete env.PYTHONPATH;delete env.PYTHONHOME;
    execFileSync(join(root,runtime.executable),['--background','--factory-startup','--disable-autoexec','--threads','2','--python-exit-code','17','--python',join(root,'test/worker-quality.py')],{cwd:folder,env,timeout:45000,maxBuffer:1024*1024});
  } finally {rmSync(folder,{recursive:true,force:true});}
});
