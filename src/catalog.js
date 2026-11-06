/** Package-owned CC0 assets; callers select IDs, never file paths. */
import { readFileSync } from 'node:fs';

const catalog = JSON.parse(readFileSync(new URL('../assets/catalog.json', import.meta.url), 'utf8'));
export const FURNITURE = Object.freeze(catalog.furniture);
