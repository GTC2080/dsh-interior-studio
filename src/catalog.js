/** Package-owned CC0 assets; callers select IDs, never file paths. */
import { existsSync, readFileSync } from 'node:fs';

const catalog = JSON.parse(readFileSync(new URL('./catalog.json', import.meta.url), 'utf8'));
export const FURNITURE = Object.freeze(catalog.furniture);
export const HAS_LOCAL_ASSETS = existsSync(new URL('../assets/', import.meta.url));
export const AVAILABLE_FURNITURE = HAS_LOCAL_ASSETS ? FURNITURE : Object.freeze({});
