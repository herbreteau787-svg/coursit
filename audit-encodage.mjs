// Audit complet : détecte TOUS les caractères anormaux dans les sources et le bundle compilé
import fs from 'fs';

const files = [];
function scan(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = d + '/' + f.name;
    if (f.isDirectory() && !f.name.includes('node_modules')) scan(p);
    else if (/\.(js|jsx|css|html|mjs)$/.test(f.name)) files.push(p);
  }
}
scan('app/src');
files.push('app/index.html', 'index.html');

// Patterns de corruption
const patterns = [
  { name: 'Ã© (é double-encodé)', re: /Ã©/g },
  { name: 'Ã¨ (è double-encodé)', re: /Ã¨/g },
  { name: 'Ã§ (ç double-encodé)', re: /Ã§/g },
  { name: 'Ã (à double-encodé)', re: /Ã[^©¨§°´¼»€]/g },
  { name: 'â€™ (\' double-encodé)', re: /â€™/g },
  { name: 'â€œ (" double-encodé)', re: /â€œ/g },
  { name: 'â€\u009d (" double-encodé)', re: /â€\u009d/g },
  { name: 'â€" (– double-encodé)', re: /â€"/g },
  { name: 'â€" (— double-encodé)', re: /â€"/g },
  { name: 'Ô (Ô préfixe)', re: /Ô/g },
  { name: '\uFFFD (replacement char)', re: /\uFFFD/g },
  { name: 'BOM résiduel', re: /\uFEFF/g },
];

console.log('=== AUDIT ENCODAGE COMPLET ===\n');
let totalIssues = 0;
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const buf = fs.readFileSync(f);
  const hasBOM = buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF;
  const s = buf.toString('utf8');
  const issues = [];
  if (hasBOM) issues.push('BOM');
  for (const p of patterns) {
    const matches = s.match(p.re);
    if (matches) issues.push(`${p.name} ×${matches.length}`);
  }
  // Caractères non-ASCII suspects (hors français valide)
  const allChars = new Set();
  for (const ch of s) {
    const code = ch.charCodeAt(0);
    if (code > 127) allChars.add(ch);
  }
  // Afficher les caractères non-ASCII rares
  const rare = [...allChars].filter(c => {
    const code = c.charCodeAt(0);
    return (code >= 0x80 && code <= 0xBF) || // continuation bytes isolés
           (code >= 0xC0 && code <= 0xC1) || // overlong
           (code >= 0xF5 && code <= 0xFF) || // invalid
           c === '\uFFFD';
  });
  if (rare.length > 0) issues.push('rare: ' + rare.join(' '));
  // Caractères non-ASCII fréquents (pour vérification visuelle)
  const nonAscii = [...allChars].sort();
  if (issues.length > 0 || nonAscii.length > 0) {
    console.log(`📄 ${f}`);
    if (issues.length > 0) { console.log('   PROBLÈMES:', issues.join(' | ')); totalIssues++; }
    if (nonAscii.length > 0 && nonAscii.length < 30) console.log('   Non-ASCII:', nonAscii.join(' '));
  }
}

console.log('\n=== BUNDLE COMPILÉ ===');
const distFiles = fs.readdirSync('app/dist/assets').filter(f => f.endsWith('.js') || f.endsWith('.css'));
for (const df of distFiles) {
  const s = fs.readFileSync('app/dist/assets/' + df, 'utf8');
  const issues = [];
  for (const p of patterns) {
    const matches = s.match(p.re);
    if (matches) issues.push(`${p.name} ×${matches.length}`);
  }
  // Extraire les séquences non-ASCII dans les chaînes affichées
  // Chercher les caractères "suspects" entre guillemets dans le SVG/JSX
  const suspectChars = new Set();
  for (const ch of s) {
    const code = ch.charCodeAt(0);
    if (code >= 0xC0 && code <= 0xC1) suspectChars.add(ch + '(C0-C1)');
    if (code >= 0xF5 && code <= 0xFF) suspectChars.add(ch + '(F5-FF)');
    if (code >= 0x80 && code <= 0x9F && code !== 0x80) suspectChars.add(ch + '(80-9F)');
  }
  if (suspectChars.size > 0) {
    // C'est normal pour le JS minifié (accents français encodés en UTF-8)
    // Mais on cherche les séquences DOUBLES
    const doubleEnc = s.match(/Ã[c-ÿ]/g);
    if (doubleEnc && doubleEnc.length > 0) issues.push('double-encodage: ' + doubleEnc.length + ' occurrences');
  }
  console.log(df, issues.length > 0 ? 'PROBLÈMES: ' + issues.join(' | ') : 'OK');
}

console.log('\n=== RÉSUMÉ ===');
console.log('Fichiers avec problèmes:', totalIssues);
