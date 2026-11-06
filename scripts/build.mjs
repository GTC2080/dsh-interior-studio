import { build } from 'esbuild';
import { mkdir, readFile } from 'node:fs/promises';
const manifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url)));
await mkdir(new URL('../lib/', import.meta.url), { recursive: true });
await build({stdin:{contents:"export {inflatePathsD,JoinType,EndType} from 'clipper2-ts';",resolveDir:process.cwd()},
  bundle:true,platform:'neutral',format:'esm',target:['es2022'],outfile:'lib/geometry-kernel.js',minify:true,
  banner:{js:'/* Clipper2 TypeScript port, BSL-1.0. See legal/geometry-kernel/ for license and pinned source. */'}});
await build({ entryPoints: ['src/client.jsx'], bundle: true, platform: 'browser', format: 'cjs',
  target: ['chrome120', 'safari17'], external: ['react', 'react/jsx-runtime', '@deepseek-ai/dsh-client-ui-primitives'],
  define: { 'process.env.NODE_ENV': '"production"' }, loader: { '.css': 'text' }, outfile: 'lib/client.js', minify: true,
  banner: { js: `window.__ModuleLoader__.load({id:${JSON.stringify(manifest.name)},factory:(require)=>{var module={exports:{}};var exports=module.exports;` },
  footer: { js: 'return module.exports;}});' },
});
console.log('Client bundle built');
