// réparation de la ligne DNS de courses-tssr.js
import fs from 'fs';
const f = 'app/src/data/courses-tssr.js';
const lines = fs.readFileSync(f, 'utf8').split('\n');
const i = 299;
lines[i] = '                        { h: "DNS", t: "Le DNS traduit les noms (intranet.exemple.fr) en adresses IP. Symptôme classique : un poste peut joindre une IP mais pas un nom - le réseau va bien, c\'est la résolution qui cloche.", schema: \'dns-fr-v2\' },';
fs.writeFileSync(f, lines.join('\n'), 'utf8');
console.log('ligne 300 réparée :', lines[i].slice(0, 80));
