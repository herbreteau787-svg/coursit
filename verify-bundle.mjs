import fs from 'fs';
const distDir = 'app/dist/assets';
const jsFile = fs.readdirSync(distDir).find(f => f.endsWith('.js'));
const s = fs.readFileSync(distDir + '/' + jsFile, 'utf8');

const checks = {
  'mojibake Ã©': (s.match(/\u00c3\u00a9/g) || []).length,
  'mojibake Ã¨': (s.match(/\u00c3\u00a8/g) || []).length,
  'mojibake Ã  ': (s.match(/\u00c3\u00a0/g) || []).length,
  'mojibake Ô': (s.match(/\u00d4\u00c3/g) || []).length,
  'mojibake â■': (s.match(/\u00e2\u0094/g) || []).length,
  'mojibake â€': (s.match(/\u00e2\u20ac/g) || []).length,
  'évaluations supprimées': (s.match(/valuation de fin de CP/g) || []).length,
  'é accented': s.includes('\u00e9') ? 'présent' : 'absent',
  'è accented': s.includes('\u00e8') ? 'présent' : 'absent',
  'à accented': s.includes('\u00e0') ? 'présent' : 'absent',
  'ç accented': s.includes('\u00e7') ? 'présent' : 'absent',
  'schémas v2': ['osi-fr-v2', 'dns-fr-v2', 'kerberos-fr-v2', 'nat-fr-v2', 'topologies-fr-v2', 'support-cycle-v2', 'cyber-defense-v2'].filter(t => s.includes(t)).length + '/7',
  'SVG viewBox': (s.match(/viewBox/g) || []).length,
  'taille JS': Math.round(s.length / 1024) + ' Ko'
};

for (const [k, v] of Object.entries(checks)) console.log(k + ':', v);
