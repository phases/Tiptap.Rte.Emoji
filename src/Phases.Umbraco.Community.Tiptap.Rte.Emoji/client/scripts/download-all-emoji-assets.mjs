/**
 * Downloads Twemoji 72x72 PNGs for every emoji in @emoji-mart/data sets/15/all.json
 * into tiptapemoji/emoji-assets/. All emojis then load from the package (no CDN).
 * Run once: npm run build:emoji-assets
 * Requires Node 18+ (fetch). First run can take several minutes (~3k+ PNGs).
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '../emoji-assets');
const TWEMOJI_PNG_BASE = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72';
const VARIATION_SELECTOR = 0xfe0f;

/** Convert native emoji string to Twemoji codepoint filename (e.g. "1f600" or "1f1fa-1f1f8"). */
function nativeToCodepoint(native) {
    if (!native || typeof native !== 'string') return null;
    const codepoints = [];
    let i = 0;
    while (i < native.length) {
        const cp = native.codePointAt(i);
        if (cp !== VARIATION_SELECTOR) codepoints.push(cp.toString(16));
        i += cp >= 0x10000 ? 2 : 1;
    }
    return codepoints.length ? codepoints.join('-') : null;
}

async function main() {
    const dataPath = join(__dirname, '../node_modules/@emoji-mart/data/sets/15/all.json');
    if (!existsSync(dataPath)) {
        console.error('Not found:', dataPath);
        console.error('Run npm install in tiptapemoji/ first.');
        process.exit(1);
    }

    console.log('Reading @emoji-mart/data sets/15/all.json...');
    const raw = JSON.parse(readFileSync(dataPath, 'utf8'));
    const codepoints = new Set();

    for (const emoji of Object.values(raw.emojis || {})) {
        const skins = emoji.skins || [];
        for (const skin of skins) {
            const native = skin?.native;
            const cp = nativeToCodepoint(native);
            if (cp) codepoints.add(cp);
        }
    }

    const list = [...codepoints].sort();
    const total = list.length;
    console.log(`Found ${total} unique emoji codepoints. Downloading to ${OUT_DIR}...`);

    mkdirSync(OUT_DIR, { recursive: true });

    let done = 0;
    let failed = 0;
    for (const codepoint of list) {
        const url = `${TWEMOJI_PNG_BASE}/${codepoint}.png`;
        try {
            const res = await fetch(url, { redirect: 'follow' });
            if (res.ok) {
                const buf = await res.arrayBuffer();
                writeFileSync(join(OUT_DIR, `${codepoint}.png`), Buffer.from(buf));
            } else {
                failed++;
            }
        } catch (e) {
            failed++;
            if (failed <= 3) console.warn(`Skip ${codepoint}: ${e.message}`);
        }
        done++;
        if (done % 200 === 0) console.log(`${done}/${total}...`);
    }

    const count = readdirSync(OUT_DIR).filter((f) => f.endsWith('.png')).length;
    console.log(`Done. ${count} PNGs in ${OUT_DIR} (${failed} skipped).`);
    console.log('Commit this folder and run npm run build so the package serves all emojis locally.');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
