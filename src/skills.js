/** Reuse the Host's native filesystem provider and native skill loader. */
import * as filesystem from '@deepseek-ai/dsh-skill-filesystem';
import {fileURLToPath} from 'node:url';

export const inject=['skills'];
export function apply(ctx) {
  ctx.plugin(filesystem,{
    providerName:'interior-studio-bundled',includeDefaultRoots:false,watch:false,
    customSkillDirs:[fileURLToPath(new URL('../skills/',import.meta.url))],
  });
}
