// Câblage phase 2 : ajouter schemas aux cours sans visuels
import fs from 'fs';

// 1. TSSR CP1 (support) — schema 'support-cycle-v2' à Leçon 2 part 1 "Enregistrement"
let tssr = fs.readFileSync('app/src/data/courses-tssr.js', 'utf8');
const anchor1 = "l'impact métier (une personne bloquée ? un service entier ?). Sans ces éléments, la qualification sera approximative.\" },";
if (tssr.includes(anchor1) && !tssr.includes('support-cycle-v2')) {
  tssr = tssr.replace(
    anchor1,
    "l'impact métier (une personne bloquée ? un service entier ?). Sans ces éléments, la qualification sera approximative.\", schema: 'support-cycle-v2' },"
  );
  console.log('[OK] TSSR CP1 → support-cycle-v2');
} else if (tssr.includes('support-cycle-v2')) { console.log('déjà présent'); }
else { console.error('ancre TSSR CP1 introuvable'); }

fs.writeFileSync('app/src/data/courses-tssr.js', tssr, 'utf8');

// 2. AIS CP9 (sécurité) — schema 'cyber-defense-v2' à "La PSSI, la loi du jeu"
let ais = fs.readFileSync('app/src/data/courses-ais.js', 'utf8');
const anchor2 = '{ h: "La PSSI, la loi du jeu", t:';
if (ais.includes(anchor2) && !ais.includes('cyber-defense-v2')) {
  ais = ais.replace(
    anchor2,
    "{ h: \"La PSSI, la loi du jeu\", schema: 'cyber-defense-v2', t:"
  );
  console.log('[OK] AIS CP9 → cyber-defense-v2');
} else if (ais.includes('cyber-defense-v2')) { console.log('déjà présent'); }
else { console.error('ancre AIS CP9 introuvable'); }

fs.writeFileSync('app/src/data/courses-ais.js', ais, 'utf8');
