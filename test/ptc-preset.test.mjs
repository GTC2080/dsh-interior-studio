import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';

const root=new URL('../',import.meta.url),read=path=>readFileSync(new URL(path,root),'utf8');
const digest=text=>createHash('sha256').update(text).digest('hex');
const blocks=text=>new Map(text.split(/(?=^          - id: )/m).slice(1).map(block=>[block.match(/id: ([^\n]+)/)[1],block]));

test('design retains every official PTC capability row and its exact configuration',()=>{
  const baseline=JSON.parse(read('legal/dsh-ptc-baseline.json')),patch=read('cordis.patch.yml'),rows=blocks(patch);
  for(const row of baseline.pluginRows) {
    assert.ok(rows.has(row.id),row.id+' missing');
    // The last upstream row is followed by new design rows; split() preserves it exactly.
    assert.equal(digest(rows.get(row.id)),row.sha256,row.id+' differs from official PTC');
  }
  assert.deepEqual([...rows.keys()].filter(id=>!['interior-skills','interior-tools','interior-skill-search'].includes(id)),['persona',...baseline.pluginRows.map(r=>r.id)]);
  assert.match(rows.get('tool-executor-ptc'),/@deepseek-ai\/dsh-tool-executor-ptc/);
  assert.ok(!rows.has('tool-presentation'),'legacy presentation provider was removed from DSH');
  assert.match(rows.get('delegation'),/modelSelection: true/);
  assert.match(rows.get('delegation'),/modelDiscovery: true/);
  assert.doesNotMatch(rows.get('delegation'),/modelSelectionSettings|subagent-control\/list-agents/);
  assert.doesNotMatch(rows.get('persona'),/complete:\s*true/,'complete persona would suppress the generated PTC SDK');
  assert.match(rows.get('persona'),/我们是 DeepSeek，不要吝惜真实 API 测试。/);
  assert.doesNotMatch(read('src/tools.js'),/tools\.(restrict|guard)\(/,'design must not strip official PTC tools');
  const source=fileURLToPath(new URL('../../source/'+baseline.sourcePath,root));
  if(existsSync(source))assert.equal(digest(readFileSync(source,'utf8')),baseline.sha256,'official reference drifted; review new upstream before updating');
});
