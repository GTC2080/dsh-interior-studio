/** Current-scene component schedule; envelope dimensions are never cutting or hardware specifications. */
import {solidBounds,assetSolid,wallSolids} from './solids.js';
import {modelPrism} from './refinement.js';
const csv=value=>{
  let text=String(value??'');if(/^[=+@\-\t\r]/.test(text))text="'"+text;
  return '"'+text.replaceAll('"','""')+'"';
};
export function componentSchedule(scene,{name,revision,materials}) {
  const rows=[['工程',name,'版本',revision,'单位','mm','用途','设计构件清单，非下料/采购清单'],
    ['名称','类别','组合','数量','X占用','Y占用','Z占用','材质','饰面来源','尺寸口径']];
  for(const o of scene.objects) {
    const prisms=o.type==='solid'?[o]:o.type==='model'?[modelPrism(o)]:o.type==='asset'?[assetSolid(o)]:o.type==='wall'?wallSolids(o):[];
    const boxes=prisms.map(solidBounds);
    const low=boxes.length?[0,1,2].map(i=>Math.min(...boxes.map(b=>b[0][i]))):[0,0,0];
    const high=boxes.length?[0,1,2].map(i=>Math.max(...boxes.map(b=>b[1][i]))):[o.width,o.depth,0];
    const finish=o.type==='wall'?Object.values(o.materials):[o.material];
    rows.push([o.label,o.type,o.assembly??'',1,...high.map((v,i)=>Number(((v-low[i])*1000).toFixed(3))),
      [...new Set(finish.filter(Boolean).map(m=>materials[m]?.label??m))].join(' / '),o.surface?.source??(o.type==='model'?'模型内材质，未拆分用量':''),
      o.type==='model'||o.type==='asset'?'世界外包近似；非净尺寸':'世界轴占用；非下料尺寸']);
  }
  return '\uFEFF'+rows.map(row=>row.map(csv).join(',')).join('\r\n')+'\r\n';
}
