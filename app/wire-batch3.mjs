// Câblage illustrations batch 3 (déjà téléchargées)
import fs from 'fs';

const BASE = 'app/src/data/';

const wire = (file, anchorH, img, caption, { dropSchema = false } = {}) => {
  const path = BASE + file;
  const lines = fs.readFileSync(path, 'utf8').split('\n');
  const idx = lines.findIndex(l => l.includes(`h: "${anchorH}"`));
  if (idx === -1) { console.error(`ANCRE INTROUVABLE [${file}] h: "${anchorH}"`); process.exitCode = 1; return; }
  let line = lines[idx];
  if (line.includes(`img: '${img}'`)) { console.log(`déjà présent [${file}] ${anchorH}`); return; }
  if (dropSchema) line = line.replace(/, schema: '[^']+'/, '');
  const inject = `, img: '${img}', imgCaption: '${caption.replace(/'/g, "\\'")}'`;
  if (line.trimEnd().endsWith('},')) line = line.trimEnd().replace(/\},$/, inject + ' },');
  else if (line.trimEnd().endsWith('}')) line = line.trimEnd().replace(/\}$/, inject + ' }');
  else { console.error(`FIN DE LIGNE IMPRÉVUE [${file}] ${line.slice(-40)}`); process.exitCode = 1; return; }
  lines[idx] = line;
  fs.writeFileSync(path, lines.join('\n'), 'utf8');
  console.log(`[OK] ${file} → ${anchorH.slice(0, 40)}`);
};

// CCNA 1.1 : structure de la trame Ethernet (domaine public, Wikimedia)
wire('courses-ccna.js', 'Encapsulation : l\'emboîtement russe', 'images/ethernet-frame.svg',
  "Structure de la trame Ethernet (domaine public, Wikimedia Commons) : préambule, SFD, MAC destination puis source, EtherType (0x0800 = IPv4, 0x86DD = IPv6), payload, FCS. Le FCS est le contrôle d'intégrité qui alimente les compteurs CRC.");

// AIS CP5 : topologies réseau (domaine public, Wikimedia)
wire('courses-ais.js', 'D\'abord la logique, ensuite le physique', 'images/network-topologies.svg',
  "Les topologies réseau classiques (domaine public, Wikimedia Commons) : bus, anneau, étoile, maillé, arbre. L'étoile autour d'un commutateur central est le standard moderne — la topologie conditionne la résilience et le câblage.");

console.log('Câblage batch 3 (partiel) terminé.');
