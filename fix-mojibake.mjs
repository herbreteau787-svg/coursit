// Fix mojibake complet : détecte et corrige TOUS les caractères corrompus
// Approche : map chaque séquence de corruption à son caractère correct
import fs from 'fs';

// Table de correspondance mojibake → caractère correct (dérivée de Windows-1252/Latin-1 double-encoding)
const FIX_MAP = {
  // Em/en dash et tirets
  '\u00d4\u00c7\u2014': '\u2014', // ÔÇ— → —
  '\u00d4\u00c7\u00b4': '\u2014', // ÔÇ´ → —
  '\u00d4\u00c3\u00a2': '\u2014', // ÔÃ¢ → —
  '\u00e2\u20ac\u201d': '\u2014', // â€" → —
  '\u00e2\u20ac\u201c': '\u2013', // â€" → –
  '\u00d4\u00c7\u00b4': '\u2013',
  // Flèches
  '\u00d4\u00c3\u00a5\u00c3\u0086': '\u2192', // ÔåÆ → →
  '\u00e2\u0086\u0092': '\u2192', // â†' → →
  '\u00e2\u20ac\u00ba': '\u2192', // â€º → →
  '\u00e2\u20ac\u0091': '\u2192',
  // Guillemets
  '\u00e2\u20ac\u02dc': '\u2018', // â€˜ → '
  '\u00e2\u20ac\u2122': '\u2019', // â€™ → '
  '\u00e2\u20ac\u0153': '\u201c', // â€œ → "
  '\u00e2\u20ac\u009d': '\u201d', // â€ → "
  '\u00e2\u20ac\u0093': '\u2013', // â€" → –
  '\u00e2\u20ac\u00a6': '\u2026', // â€¦ → …
  // Accents français mojibake (UTF-8 lu comme Latin-1)
  '\u00c3\u00a9': '\u00e9', // Ã© → é
  '\u00c3\u00a8': '\u00e8', // Ã¨ → è
  '\u00c3\u00a0': '\u00e0', // Ã  → à
  '\u00c3\u00a7': '\u00e7', // Ã§ → ç
  '\u00c3\u00b4': '\u00f4', // Ã´ → ô
  '\u00c3\u00bb': '\u00fb', // Ã» → û
  '\u00c3\u00ae': '\u00ee', // Ã® → î
  '\u00c3\u00af': '\u00ef', // Ã¯ → ï
  '\u00c3\u00b9': '\u00f9', // Ã¹ → ù
  '\u00c3\u0089': '\u00c9', // Ã‰ → É
  '\u00c3\u0088': '\u00c8', // Ãˆ → È
  '\u00c3\u0080': '\u00c0', // Ã€ → À
  '\u00c3\u0087': '\u00c7', // Ã‡ → Ç
  '\u00c3\u0082': '\u00c2', // ÃÂ → Â
  // Symboles
  '\u00e2\u20ac\u00a2': '\u2022', // â€¢ → •
  '\u00e2\u20ac\u00b9': '\u2039',
  '\u00e2\u20ac\u00ba': '\u203a',
  '\u00e2\u02c6\u00c2': '\u02c6',
  '\u00c2\u00ab': '\u00ab', // Â« → «
  '\u00c2\u00bb': '\u00bb', // Â» → »
  '\u00c2\u00b0': '\u00b0', // Â° → °
  '\u00c2\u00b7': '\u00b7', // Â· → ·
  '\u00c2\u00a0': '\u00a0', // Â  → espace insécable
  '\u00c2\u00bd': '\u00bd', // Â½ → ½
  '\u00c2\u00bf': '\u00bf',
  '\u00c2\u00ac': '\u00ac',
  // Mojibake from the git show pipeline (Ã + continuation byte = 2 chars decoded as 2)
  // Ces patterns utilisent les caractères box-drawing produits par l'encodage
  '\u00e2\u0095\u0091': '\u00a6', // ║ → ¦
  '\u00e2\u0094\u0080': '\u2500', // ─ → ─
  // Patterns spécifiques observés dans DynamicSVGDiagram.jsx
  '\u00d4\u00c3\u0087\u00c2\u00aa': '\u2192',
  // Double-encoding des flèches et symboles
  '\u00d4\u00c3\u0087\u00c2\u00a2': '\u2192',
  // Séquences Â suivies d'un caractère
  '\u00c2\u00a1': '\u00a1',
  '\u00c2\u00a3': '\u00a3',
  '\u00c2\u00a4': '\u00a4',
  '\u00c2\u00a6': '\u00a6',
  '\u00c2\u00a7': '\u00a7',
  '\u00c2\u00a8': '\u00a8',
  '\u00c2\u00a9': '\u00a9',
  '\u00c2\u00aa': '\u00aa',
  '\u00c2\u00ac': '\u00ac',
  '\u00c2\u00ae': '\u00ae',
  '\u00c2\u00b1': '\u00b1',
  '\u00c2\u00b2': '\u00b2',
  '\u00c2\u00b3': '\u00b3',
  '\u00c2\u00b5': '\u00b5',
  '\u00c2\u00b6': '\u00b6',
  '\u00c2\u00b8': '\u00b8',
  '\u00c2\u00ba': '\u00ba',
  '\u00c2\u00bc': '\u00bc',
  '\u00c2\u00be': '\u00be',
};

// Approche générique : décoder le mojibake en re-interprétant les bytes
function fixMojibake(str) {
  // Pass 1 : remplacer les patterns connus
  for (const [bad, good] of Object.entries(FIX_MAP)) {
    str = str.split(bad).join(good);
  }

  // Pass 2 : approche générique — décoder le mojibake standard
  // Si on trouve des caractères Ã (U+00C3) suivis de caractères 80-BF,
  // c'est du UTF-8 double-encodé : reconstituer les bytes et re-décoder
  let prev = '';
  let attempts = 0;
  while (prev !== str && attempts < 3) {
    prev = str;
    const bytes = [];
    let ok = true;
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      if (code < 256) {
        bytes.push(code);
      } else if (code < 0x10000) {
        // Caractère multi-byte : encoder en UTF-8 puis prendre les bytes
        const utf8 = unescape(encodeURIComponent(str[i]));
        for (const b of utf8) bytes.push(b.charCodeAt(0));
      } else {
        ok = false;
        break;
      }
    }
    if (!ok) break;
    try {
      const decoded = new TextDecoder('utf-8').decode(new Uint8Array(bytes));
      // Si le décodage change le texte ET n'introduit pas de U+FFFD, on l'accepte
      if (decoded !== str && !decoded.includes('\uFFFD')) {
        str = decoded;
      }
    } catch (e) { /* décodage impossible, on garde */ }
    attempts++;
  }

  // Pass 3 : remplacer les patterns box-drawing spécifiques restants
  // (issus de l'encodage CP437 des caractères de bordure)
  const boxFix = {
    '\u00e2\u0094\u0080': '\u2500',
    '\u00e2\u0094\u0082': '\u2502',
    '\u00e2\u0094\u009c': '\u251c',
    '\u00e2\u0094\u00a4': '\u2524',
    '\u00e2\u0094\u0090': '\u2510',
    '\u00e2\u0094\u0098': '\u2518',
    '\u00e2\u0094\u008c': '\u250c',
    '\u00e2\u0094\u0094': '\u2514',
    '\u00e2\u0095\u0091': '\u2551',
    '\u00e2\u0095\u0090': '\u2550',
  };
  for (const [bad, good] of Object.entries(boxFix)) {
    str = str.split(bad).join(good);
  }

  return str;
}

// Traiter les fichiers
const targets = [
  'app/src/components/DynamicSVGDiagram.jsx',
  'app/src/data/courses-ccna.js',
  'app/src/data/courses-tssr.js',
  'app/src/data/courses-ais.js',
  'app/src/App.jsx',
];

for (const f of targets) {
  let s = fs.readFileSync(f, 'utf8');
  const before = s;
  s = fixMojibake(s);
  const changed = s !== before;
  fs.writeFileSync(f, s, 'utf8');

  // compter les corrections
  const count = (before.match(/[\u00d4\u00c3][\u00c3-\u00ff]/g) || []).length;
  console.log(f.split('/').pop(), changed ? `CORRIGÉ (${count} séquences)` : 'propre');
}

// Vérification finale
let totalIssues = 0;
for (const f of targets) {
  const s = fs.readFileSync(f, 'utf8');
  const issues = [];
  // chercher les caractères suspects restants
  for (const ch of s) {
    const code = ch.charCodeAt(0);
    // caractères de continuation UTF-8 isolés (0x80-0xBF) dans un fichier texte
    // ou caractères C0-C1 (invalid en UTF-8)
    if (code >= 0x80 && code <= 0x9F && code !== 0x9B && code !== 0x99 && code !== 0x9C) {
      // exclure les caractères légitimes comme € (U+20AC)
    }
  }
  // vérifier spécifiquement Ô et ├
  const ohCount = (s.match(/\u00d4/g) || []).length;
  const boxCount = (s.match(/\u251c/g) || []).length; // ├
  const boxCount2 = (s.match(/\u252c/g) || []).length; // ┬
  if (ohCount > 0) { issues.push(`Ô ×${ohCount}`); }
  if (boxCount > 3) { issues.push(`├ ×${boxCount}`); }
  if (boxCount2 > 3) { issues.push(`┬ ×${boxCount2}`); }
  if (issues.length > 0) { console.log('RESTE:', f.split('/').pop(), issues.join(', ')); totalIssues++; }
  else console.log('✓', f.split('/').pop());
}
console.log('\nFichiers avec problèmes restants:', totalIssues);
