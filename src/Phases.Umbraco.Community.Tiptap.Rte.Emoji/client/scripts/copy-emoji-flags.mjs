/**
 * Copies emoji PNGs to wwwroot/tiptapemoji/emoji/ so they are served from the package (no CDN).
 * Prefer emoji-assets/ (full set from build:emoji-assets); fallback to emoji-flags-assets/ (flags only).
 * Run automatically after vite build.
 */

import { readdirSync, mkdirSync, copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FULL_ASSETS = join(__dirname, '../emoji-assets');
const FLAGS_ONLY = join(__dirname, '../emoji-flags-assets');
const DEST = join(__dirname, '../../wwwroot/tiptapemoji/emoji');

const SRC = existsSync(FULL_ASSETS) ? FULL_ASSETS : existsSync(FLAGS_ONLY) ? FLAGS_ONLY : null;

if (!SRC) {
    console.warn('Neither emoji-assets nor emoji-flags-assets found. Run: npm run build:emoji-assets (or build:emoji-flags)');
    process.exit(0);
}

mkdirSync(DEST, { recursive: true });
const files = readdirSync(SRC).filter((f) => f.endsWith('.png'));
for (const f of files) {
    copyFileSync(join(SRC, f), join(DEST, f));
}
console.log(`Copied ${files.length} emoji PNGs to wwwroot/tiptapemoji/emoji/`);
