/**
 * Downloads Twemoji 72x72 PNGs for all flags into tiptapemoji/emoji-flags-assets/.
 * Run once: npm run build:emoji-flags
 * Then commit the emoji-flags-assets folder so the package ships with local assets (no CDN).
 * Requires Node 18+ (fetch).
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '../emoji-flags-assets');
const TWEMOJI_PNG_BASE = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72';

const FLAG_CODES = [
    'ad', 'ae', 'af', 'ag', 'al', 'am', 'ao', 'aq', 'ar', 'as', 'at', 'au', 'aw', 'ax', 'az',
    'ba', 'bb', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bl', 'bm', 'bn', 'bo', 'bq', 'br',
    'bs', 'bt', 'bw', 'by', 'bz', 'ca', 'cc', 'cd', 'cf', 'cg', 'ch', 'ci', 'ck', 'cl', 'cm',
    'cn', 'co', 'cr', 'cu', 'cv', 'cw', 'cx', 'cy', 'cz', 'de', 'dj', 'dk', 'dm', 'do', 'dz',
    'ec', 'ee', 'eg', 'eh', 'er', 'es', 'et', 'fi', 'fj', 'fk', 'fm', 'fo', 'fr', 'ga', 'gb',
    'gd', 'ge', 'gf', 'gg', 'gh', 'gi', 'gl', 'gm', 'gn', 'gp', 'gq', 'gr', 'gs', 'gt', 'gu',
    'gw', 'gy', 'hk', 'hn', 'hr', 'ht', 'hu', 'id', 'ie', 'il', 'im', 'in', 'io', 'iq', 'ir',
    'is', 'it', 'je', 'jm', 'jo', 'jp', 'ke', 'kg', 'kh', 'ki', 'km', 'kn', 'kp', 'kr', 'kw',
    'ky', 'kz', 'la', 'lb', 'lc', 'li', 'lk', 'lr', 'ls', 'lt', 'lu', 'lv', 'ly', 'ma', 'mc',
    'md', 'me', 'mf', 'mg', 'mh', 'mk', 'ml', 'mm', 'mn', 'mo', 'mp', 'mq', 'mr', 'ms', 'mt',
    'mu', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'nc', 'ne', 'nf', 'ng', 'ni', 'nl', 'no', 'np',
    'nr', 'nu', 'nz', 'om', 'pa', 'pe', 'pf', 'pg', 'ph', 'pk', 'pl', 'pm', 'pn', 'pr', 'ps',
    'pt', 'pw', 'py', 'qa', 're', 'ro', 'rs', 'ru', 'rw', 'sa', 'sb', 'sc', 'sd', 'se', 'sg',
    'sh', 'si', 'sj', 'sk', 'sl', 'sm', 'sn', 'so', 'sr', 'ss', 'st', 'sv', 'sx', 'sy', 'sz',
    'tc', 'td', 'tf', 'tg', 'th', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'tr', 'tt', 'tv', 'tw',
    'tz', 'ua', 'ug', 'um', 'un', 'us', 'uy', 'uz', 'va', 'vc', 've', 'vg', 'vi', 'vn', 'vu',
    'wf', 'ws', 'xk', 'ye', 'yt', 'za', 'zm', 'zw',
];

function codeToCodepoint(code) {
    if (code.length !== 2) return null;
    const a = 0x1f1e6 + (code.charCodeAt(0) - 97);
    const b = 0x1f1e6 + (code.charCodeAt(1) - 97);
    return `${a.toString(16)}-${b.toString(16)}`;
}

async function main() {
    mkdirSync(OUT_DIR, { recursive: true });
    let done = 0;
    const total = FLAG_CODES.length;

    for (const code of FLAG_CODES) {
        const codepoint = codeToCodepoint(code);
        if (!codepoint) continue;
        const url = `${TWEMOJI_PNG_BASE}/${codepoint}.png`;
        try {
            const res = await fetch(url, { redirect: 'follow' });
            if (res.ok) {
                const buf = await res.arrayBuffer();
                writeFileSync(join(OUT_DIR, `${codepoint}.png`), Buffer.from(buf));
            }
        } catch (e) {
            if (done <= 2) console.warn(`Skip ${code} (${codepoint}): ${e.message}`);
        }
        done++;
        if (done % 50 === 0) console.log(`${done}/${total}...`);
    }

    const { readdirSync } = await import('fs');
    const count = readdirSync(OUT_DIR).filter((f) => f.endsWith('.png')).length;
    console.log(`Downloaded ${count} flag PNGs to ${OUT_DIR}`);
    console.log('Commit this folder so the package ships with local assets (no CDN).');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
