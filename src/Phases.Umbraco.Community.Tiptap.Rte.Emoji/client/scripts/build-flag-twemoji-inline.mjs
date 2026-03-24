/**
 * One-time script: fetches Twemoji SVG assets for all flags, outputs a TS file
 * with codepoint -> data URL (image/svg+xml;base64) so flags load from JS with no CDN.
 * Run: node scripts/build-flag-twemoji-inline.mjs
 * Requires Node 18+ (fetch).
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, '../src/emoji/emoji-flags-inline.ts');

const TWEMOJI_SVG_BASE = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg';

// ISO 3166-1 alpha-2 (plus common regional) – lowercase for Twemoji filenames
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

/** Two-letter code to Twemoji codepoint e.g. "in" -> "1f1ee-1f1f3" */
function codeToCodepoint(code) {
    if (code.length !== 2) return null;
    const a = 0x1f1e6 + (code.charCodeAt(0) - 97);
    const b = 0x1f1e6 + (code.charCodeAt(1) - 97);
    return `${a.toString(16)}-${b.toString(16)}`;
}

async function fetchAsSvgDataUrl(url) {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const b64 = Buffer.from(buf).toString('base64');
    return `data:image/svg+xml;base64,${b64}`;
}

async function main() {
    const map = {};
    let done = 0;
    const total = FLAG_CODES.length;

    for (const code of FLAG_CODES) {
        const codepoint = codeToCodepoint(code);
        if (!codepoint) continue;
        const url = `${TWEMOJI_SVG_BASE}/${codepoint}.svg`;
        try {
            const dataUrl = await fetchAsSvgDataUrl(url);
            if (dataUrl) {
                map[codepoint] = dataUrl;
            } else if (done <= 2) {
                console.warn(`Skip ${code} (${codepoint}): fetch returned non-ok or empty`);
            }
        } catch (e) {
            if (done <= 2) console.warn(`Skip ${code} (${codepoint}): ${e.message}`);
        }
        done++;
        if (done % 50 === 0) console.log(`${done}/${total}...`);
    }

    const keys = Object.keys(map).sort();
    const lines = [
        '/** Auto-generated: Twemoji flag SVGs as base64 data URLs. Do not edit. */',
        'export const FLAG_TWEMOJI_DATA_URLS: Record<string, string> = {',
        ...keys.map((k) => {
            const v = map[k].replace(/\\/g, '\\\\').replace(/"/g, '\\"');
            return `  "${k}": "${v}",`;
        }),
        '};',
    ];
    writeFileSync(OUT_PATH, lines.join('\n'), 'utf8');
    console.log(`Wrote ${keys.length} flags to ${OUT_PATH}`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
