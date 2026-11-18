// réparation de la ligne topologies de courses-ais.js
import fs from 'fs';
const f = 'app/src/data/courses-ais.js';
const lines = fs.readFileSync(f, 'utf8').split('\n');
const i = 281;
lines[i] = "                        { h: \"D'abord la logique, ensuite le physique\", t: \"Le cahier des charges décrit les services, les flux et les volumes AVANT de parler matériel. Une topologie se dessine après le besoin : étoile au bureau, arbre entre bâtiments, maillé entre sites critiques.\", schema: 'topologies-fr-v2' },";
fs.writeFileSync(f, lines.join('\n'), 'utf8');
console.log('ligne 282 réparée :', lines[i].slice(0, 80));
