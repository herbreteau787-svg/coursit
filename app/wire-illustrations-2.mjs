// Câblage des illustrations restantes (Kerberos, RAID, Cloud) — à lancer après téléchargement
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

// TSSR CP2 : Kerberos (CC BY-SA 3.0, Daniel Sonck — Wikimedia) — remplace le schéma SVG
wire('courses-tssr.js', 'Kerberos, le ticket d\'entrée', 'images/kerberos.svg',
  "Négociations Kerberos (Wikimedia Commons, CC BY-SA 3.0 — Daniel Sonck) : le client obtient un TGT auprès du KDC puis un ticket de service pour chaque ressource — le mot de passe ne circule jamais vers les services.",
  { dropSchema: true });

// TSSR CP8 : RAID (composition des 4 diagrammes — Wikimedia Commons, CC BY-SA / domaine public)
wire('courses-tssr.js', 'Sauvegarde ou réplique ?', 'images/raid-types.png',
  "Les quatre architectures RAID (composé d'après Wikimedia Commons, CC BY-SA) : striping (0), miroir (1), parité répartie (5), miroirs en bande (10). Le RAID protège de la panne disque, jamais de la suppression ni du ransomware.",
  { dropSchema: true });

// TSSR CP5 : Cloud (CC BY 3.0, Wikimedia — schéma français) — remplace le schéma SVG
wire('courses-tssr.js', 'Deux familles d\'hyperviseurs', 'images/cloud-computing.png',
  "Le cloud computing vu en français (Wikimedia Commons, CC BY 3.0) : les trois modèles de service empilés (IaaS → PaaS → SaaS) et le partage des responsabilités entre fournisseur et client.",
  { dropSchema: true });

console.log('Câblage des illustrations restantes terminé.');
