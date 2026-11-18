// Fix mojibake v2 : approche simple — remplacer les patterns observés
import fs from 'fs';

const targets = [
  'app/src/components/DynamicSVGDiagram.jsx',
  'app/src/data/courses-ccna.js',
  'app/src/data/courses-tssr.js',
  'app/src/data/courses-ais.js',
  'app/src/App.jsx',
];

// Patterns de mojibake observés et leurs corrections
const FIXES = [
  // Em dash : ÔÇ— (3 chars) → —
  ['\u00d4\u00c7\u2014', '\u2014'],
  // En dash : ÔÇ– → –
  ['\u00d4\u00c7\u2013', '\u2013'],
  // Arrow : ÔåÆ (3 chars) → →
  ['\u00d4\u00c3\u00a5\u00c3\u0086', '\u2192'],
  // Arrow right : ÔÇä → ⇄
  ['\u00d4\u00c3\u00a7\u00c3\u00a4', '\u21c4'],
  // Checkmark : Ô£ö → ✓
  ['\u00d4\u00c2\u00a3\u00c2\u00b6', '\u2713'],
  // Ellipsis : ÔÇª → …
  ['\u00d4\u00c7\u00aa', '\u2026'],
  // Box chars mojibake
  ['\u00e2\u0094\u0080', '\u2500'], // ─
  ['\u00e2\u0094\u0082', '\u2502'], // │
  ['\u00e2\u0094\u009c', '\u251c'], // ├
  ['\u00e2\u0094\u00a4', '\u2524'], // ┤
  ['\u00e2\u0094\u0090', '\u2510'], // ┐
  ['\u00e2\u0094\u0098', '\u2518'], // └
  ['\u00e2\u0094\u008c', '\u250c'], // ┌
  ['\u00e2\u0094\u0094', '\u2514'], // └
  ['\u00e2\u0094\u0093', '\u250f'], // ┏
  ['\u00e2\u0094\u009b', '\u2517'], // ┗
  ['\u00e2\u0094\u00ab', '\u252b'], // ┫
  ['\u00e2\u0094\u00a3', '\u2523'], // ┣
  ['\u00e2\u0094\u0081', '\u2501'], // ━
  ['\u00e2\u0094\u0083', '\u2503'], // ┃
  ['\u00e2\u0095\u0091', '\u2551'], // ║
  ['\u00e2\u0095\u0090', '\u2550'], // ═
  ['\u00e2\u0094\u00ac', '\u252c'], // ┬
  ['\u00e2\u0094\u00b4', '\u2534'], // ┴
  ['\u00e2\u0094\u00bc', '\u253c'], // ┼
  ['\u00e2\u0094\u008a', '\u250a'], // ┊
  ['\u00e2\u0086\u0092', '\u2192'], // →
  ['\u00e2\u0086\u0090', '\u2190'], // ←
  ['\u00e2\u20ac\u00a2', '\u2022'], // •
  // Accents (mojibake standard)
  ['\u00c3\u00a9', '\u00e9'], // Ã© → é
  ['\u00c3\u00a8', '\u00e8'], // Ã¨ → è
  ['\u00c3\u00a0', '\u00e0'], // Ã  → à
  ['\u00c3\u00a7', '\u00e7'], // Ã§ → ç
  ['\u00c3\u00b4', '\u00f4'], // Ã´ → ô
  ['\u00c3\u00bb', '\u00fb'], // Ã» → û
  ['\u00c3\u00ae', '\u00ee'], // Ã® → î
  ['\u00c3\u00af', '\u00ef'], // Ã¯ → ï
  ['\u00c3\u00b9', '\u00f9'], // Ã¹ → ù
  ['\u00c3\u0089', '\u00c9'], // Ã‰ → É
  ['\u00c3\u0088', '\u00c8'], // Ãˆ → È
  ['\u00c3\u0080', '\u00c0'], // Ã€ → À
  ['\u00c3\u0087', '\u00c7'], // Ã‡ → Ç
  ['\u00c3\u008a', '\u00ca'], // ÃŠ → Ê
  ['\u00c3\u0099', '\u00d9'], // Ã™ → Ù
  ['\u00c3\u00b2', '\u00f2'], // Ã² → ò
  ['\u00c3\u00ab', '\u00eb'], // Ã« → ë
  ['\u00c3\u00bc', '\u00fc'], // Ã¼ → ü
  ['\u00c3\u00b3', '\u00f3'], // Ã³ → ó
  ['\u00c3\u00ba', '\u00fa'], // Ãº → ú
  ['\u00c3\u00b1', '\u00f1'], // Ã± → ñ
  // Guillemets et apostrophes
  ['\u00e2\u20ac\u02dc', '\u2018'], // â€˜ → '
  ['\u00e2\u20ac\u2122', '\u2019'], // â€™ → '
  ['\u00e2\u20ac\u0153', '\u201c'], // â€œ → "
  ['\u00e2\u20ac\u009d', '\u201d'], // â€ → "
  // Symboles divers
  ['\u00c2\u00ab', '\u00ab'], // Â« → «
  ['\u00c2\u00bb', '\u00bb'], // Â» → »
  ['\u00c2\u00b0', '\u00b0'], // Â° → °
  ['\u00c2\u00b7', '\u00b7'], // Â· → ·
  ['\u00c2\u00a0', '\u00a0'], // Â   → espace insécable
  ['\u00c2\u00bd', '\u00bd'], // Â½ → ½
  ['\u00c2\u00bf', '\u00bf'], // Â¿ → ¿
  ['\u00c2\u00ac', '\u00ac'], // Â¬ → ¬
  ['\u00c2\u00a9', '\u00a9'], // Â© → ©
  ['\u00c2\u00ae', '\u00ae'], // Â® → ®
  ['\u00c2\u00aa', '\u00aa'], // Âª → ª
  ['\u00c2\u00ba', '\u00ba'], // Âº → º
  ['\u00c2\u00b2', '\u00b2'], // Â² → ²
  ['\u00c2\u00b3', '\u00b3'], // Â³ → ³
  ['\u00c2\u00b1', '\u00b1'], // Â± → ±
  ['\u00c2\u00b6', '\u00b6'], // Â¶ → ¶
  ['\u00c2\u00b8', '\u00b8'], // Â¸ → ¸
  ['\u00c2\u00bc', '\u00bc'], // Â¼ → ¼
  ['\u00c2\u00be', '\u00be'], // Â¾ → ¾
  ['\u00c2\u00a6', '\u00a6'], // Â¦ → ¦
  ['\u00c2\u00a7', '\u00a7'], // Â§ → §
  ['\u00c2\u00a8', '\u00a8'], // Â¨ → ¨
  ['\u00c2\u00a3', '\u00a3'], // Â£ → £
  ['\u00c2\u00a4', '\u00a4'], // Â¤ → ¤
  ['\u00c2\u00b5', '\u00b5'], // Âµ → µ
  ['\u00c2\u00a1', '\u00a1'], // Â¡ → ¡
  ['\u00c3\u00a2', '\u00e2'], // Ã¢ → â
  ['\u00c3\u00aa', '\u00ea'], // Ãª → ê
  ['\u00c3\u00b6', '\u00f6'], // Ã¶ → ö
  ['\u00c3\u009c', '\u00dc'], // Ãœ → Ü
  ['\u00c3\u0091', '\u00d1'], // Ã' → Ñ
];

let totalFixed = 0;
for (const f of targets) {
  let s = fs.readFileSync(f, 'utf8');
  let fixed = 0;
  for (const [bad, good] of FIXES) {
    const re = s.split(bad);
    if (re.length > 1) {
      fixed += re.length - 1;
      s = re.join(good);
    }
  }
  fs.writeFileSync(f, s, 'utf8');
  totalFixed += fixed;
  console.log(f.split('/').pop(), ':', fixed, 'corrections');
}
console.log('Total :', totalFixed, 'corrections');

// Vérification
let remaining = 0;
for (const f of targets) {
  const s = fs.readFileSync(f, 'utf8');
  const oh = (s.match(/\u00d4\u00c3/g) || []).length;
  const box = (s.match(/\u00e2\u0094/g) || []).length;
  const moji = (s.match(/\u00c3[\u0080-\u00bf]/g) || []).length;
  if (oh > 0 || box > 3 || moji > 0) {
    console.log('RESTE:', f.split('/').pop(), 'Ô:', oh, 'â■:', box, 'Ã+x:', moji);
    remaining++;
  }
}
console.log('Fichiers restants:', remaining);
