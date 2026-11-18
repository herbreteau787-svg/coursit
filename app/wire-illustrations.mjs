// Insertion des illustrations Wikimedia dans les leçons (encodage sûr)
// Usage : node wire-illustrations.mjs [--remove-schema]
import fs from 'fs';

const removeSchema = process.argv.includes('--remove-schema');
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

// === CCNA 1.1 : modèle OSI (domaine public, Wikimedia) — remplace le schéma SVG minimaliste ===
wire('courses-ccna.js', 'Sept couches, un ordre de lecture', 'images/osi-model.jpg',
  "Le modèle OSI en 7 couches — illustration classique du domaine public (Wikimedia Commons). La numérotation 7→1 se lit de haut en bas ; chaque couche sert un service à la couche supérieure.",
  { dropSchema: true });

// === CCNA 1.5 : chevauchement des canaux 2,4 GHz (CC BY-SA, Wikimedia) ===
wire('courses-ccna.js', 'La bande 2,4 GHz : trois canaux utiles', 'images/wifi-channels.svg',
  "Canaux 2,4 GHz et leur chevauchement (Wikimedia Commons, CC BY-SA) : chaque ellipse fait 22 MHz de large — seuls les canaux 1, 6 et 11 (en gras) ne se recouvrent pas ; les canaux adjacents se brouillent mutuellement.");

// === CCNA 4.1 : NAT (CC BY-SA 4.0, Wikimedia) — remplace le schéma SVG ===
wire('courses-ccna.js', 'Suivre un paquet', 'images/nat.png',
  "Exemple NAT complet (Wikimedia Commons, CC BY-SA 4.0 — Francisco Miamoto) : réseau privé → routeur → Internet, avec la table de traduction visible en bas.",
  { dropSchema: true });

// === TSSR CP4 : résolution DNS (domaine public, Wikimedia) — remplace le schéma SVG ===
wire('courses-tssr.js', 'DNS', 'images/dns-real-world.svg',
  "Le DNS « dans le monde réel » (domaine public, Wikimedia Commons — Lion Kimbro) : cache du navigateur → résolveur de l'OS → résolveur du FAI → recherche récursive. Chaque étage a son cache : une réponse mise en cache évite toute la chaîne.",
  { dropSchema: true });

console.log('Câblage terminé.');
