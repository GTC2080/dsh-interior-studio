/** Development packaging tool. Runtime execution never downloads components. */
import { readdir, lstat, readFile, writeFile, readlink, realpath } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';
const root = process.cwd(), entries = [];
async function walk(directory) {
  for (const name of (await readdir(directory)).sort()) {
    if(directory.startsWith(join(root,'assets')) && name==='.DS_Store')continue;
    const path = join(directory, name), stat = await lstat(path);
    const item = { path: relative(root, path).replaceAll('\\', '/') };
    if (stat.isSymbolicLink()) {
      const resolved = relative(join(root, 'runtime'), await realpath(path));
      if (resolved.startsWith('..')) throw new Error('Runtime link escapes payload: ' + path);
      entries.push({ ...item, link: await readlink(path) });
    } else if (stat.isDirectory()) await walk(path);
    else if (stat.isFile()) entries.push({ ...item, bytes: stat.size, executable: Boolean(stat.mode & 0o111),
      sha256: createHash('sha256').update(await readFile(path)).digest('hex') });
    else throw new Error('Special runtime entry: ' + path);
  }
}
await walk(join(root, 'runtime/Blender.app'));
await walk(join(root, 'runtime/vendor'));
await walk(join(root, 'assets'));
const manifest = { formatVersion: 1, platform: 'darwin', arch: 'arm64', blenderVersion: '4.5.15',
  executable: 'runtime/Blender.app/Contents/MacOS/Blender',
  source: 'https://download.blender.org/release/Blender4.5/blender-4.5.15-macos-arm64.dmg',
  upstreamSha256: 'bfbc0bda099d1ab7aef0992a584f872f58bed9bb491210ad45f9ca071aa2e688',
  distribution: 'development-only; DWG, final carrier signing and corresponding source gate not satisfied',
  bytes: entries.reduce((sum, e) => sum + (e.bytes ?? 0), 0), entries };
await writeFile('runtime/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify({ files: entries.length, bytes: manifest.bytes }));
