// inventaire visuel des cours
import fs from 'fs';

const files = { 'courses-ccna.js': 'CCNA', 'courses-tssr.js': 'TSSR', 'courses-ais.js': 'AIS' };
for (const [f, parc] of Object.entries(files)) {
  const c = fs.readFileSync('app/src/data/' + f, 'utf8');
  const imgs = (c.match(/img: '/g) || []).length;
  const schemas = (c.match(/schema: '/g) || []).length;
  const lessons = (c.match(/title: "Le/g) || []).length;
  console.log(`${parc} : leçons=${lessons} · img=${imgs} · schema=${schemas}`);
}
