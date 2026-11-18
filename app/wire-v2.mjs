// Remplace les illustrations Wikimedia anglaises/datées par les schémas v2 français harmonisés
import fs from 'fs';

const BASE = 'app/src/data/';

const swap = (file, anchorH, newType, imgToDrop) => {
  const path = BASE + file;
  const lines = fs.readFileSync(path, 'utf8').split('\n');
  const idx = lines.findIndex(l => l.includes(`h: "${anchorH}"`));
  if (idx === -1) { console.error(`ANCRE INTROUVABLE [${file}] h: "${anchorH}"`); process.exitCode = 1; return; }
  let line = lines[idx];
  if (!line.includes(`img: '${imgToDrop}'`)) { console.error(`IMG ATTENDUE INTROUVABLE [${file}] ${imgToDrop}`); process.exitCode = 1; return; }
  line = line.replace(`img: '${imgToDrop}'`, `schema: '${newType}'`);
  line = line.replace(/, imgCaption: '[^']*'/, '');
  lines[idx] = line;
  fs.writeFileSync(path, lines.join('\n'), 'utf8');
  console.log(`[OK] ${file} → ${anchorH.slice(0, 40)} : schema ${newType}`);
};

swap('courses-ccna.js', 'Sept couches, un ordre de lecture', 'osi-fr-v2', 'images/osi-model.jpg');
swap('courses-ccna.js', 'Suivre un paquet', 'nat-fr-v2', 'images/nat.png');
swap('courses-tssr.js', 'Kerberos, le ticket d\'entrée', 'kerberos-fr-v2', 'images/kerberos.svg');
swap('courses-tssr.js', 'DNS', 'dns-fr-v2', 'images/dns-real-world.svg');
swap('courses-ais.js', 'D\'abord la logique, ensuite le physique', 'topologies-fr-v2', 'images/network-topologies.svg');

console.log('Swaps v2 terminés.');
