import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync,rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ProjectStore } from '../src/store.js';

test('another Host cannot acquire a live owner or mark its active task interrupted',()=>{
  const root=mkdtempSync(join(tmpdir(),'interior-host-owner-'));
  const first=new ProjectStore(root),second=new ProjectStore(root);
  try {
    first.claimHost();
    first.db.prepare('INSERT INTO tasks VALUES(?,?,?,?,?)').run('running-task','test',1,'running','{}');
    assert.throws(()=>second.claimHost(),/另一 Host/);
    assert.equal(first.db.prepare('SELECT state FROM tasks').get().state,'running');
    first.close();second.claimHost();
    assert.equal(second.db.prepare('SELECT state FROM tasks').get().state,'interrupted');
  } finally {second.close();rmSync(root,{recursive:true});}
});
