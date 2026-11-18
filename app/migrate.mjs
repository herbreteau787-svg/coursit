// Migration script : extrait les données et le code de index.html vers app/src
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'legacy', 'index.html');
const APP = path.join(ROOT, 'app', 'src');

const html = fs.readFileSync(SRC, 'utf8');
const start = html.indexOf('<script type="text/babel">');
const endScript = html.indexOf('</script>', start);
let body = html.slice(start + '<script type="text/babel">'.length, endScript);

const DATA = {
  COURSES_DATA: 'courses-ccna.js',
  TSSR_COURSES: 'courses-tssr.js',
  AIS_COURSES: 'courses-ais.js',
  QCM_DATA: 'qcm.js',
  PREP_DOMAINS: 'prep-domains.js',
  PREP_QCM: 'prep-qcm.js',
  PORTS_DATA: 'ports.js',
  ESSENTIALS_COMMANDS: 'essentials-commands.js',
  PRIVATE_RANGES: 'private-ranges.js',
  HTTP_CODES: 'http-codes.js',
  TOOLS_DATA: 'tools.js',
  PS_TIPS: 'tips-powershell.js',
  LIN_TIPS: 'tips-linux.js',
  LABS_DATA: 'labs.js',
  GLOSSARY_DATA: 'glossary.js',
  CHEAT_SHEETS: 'cheatsheets.js',
  ENGLISH_VOCAB: 'english-vocab.js',
  DEPANNAGE_DATA: 'depannage.js',
  SCRIPTS_LIB: 'scripts-lib.js'
};

const imports = [];
const lines = body.split('\n');
const keep = [];
let i = 0;
while (i < lines.length) {
  const line = lines[i];
  const m = line.match(/^\s*const ([A-Za-z_$][\w$]*) = (\[|\{)/);
  const name = m ? m[1] : null;
  if (name && DATA[name]) {
    // trouver la fin par profondeur d'accolades/crochets
    let depth = 0, started = false, j = i;
    for (; j < lines.length; j++) {
      for (const ch of lines[j]) {
        if (ch === '[' || ch === '{') { depth++; started = true; }
        else if (ch === ']' || ch === '}') { depth--; }
      }
      if (started && depth === 0) break;
    }
    const block = lines.slice(i, j + 1).join('\n');
    const file = path.join(APP, 'data', DATA[name]);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, block.replace(new RegExp(`^\\s*const ${name} =`), `export const ${name} =`) + '\n', 'utf8');
    imports.push(`import { ${name} } from './data/${DATA[name].replace('.js', '')}.js';`);
    i = j + 1;
    continue;
  }
  keep.push(line);
  i++;
}
body = keep.join('\n');

// Extraire DynamicSVGDiagram vers components/ (borne suivante : const QcmSection)
const dsIdx = body.indexOf('const DynamicSVGDiagram =');
const qsIdx = body.indexOf('const QcmSection');
if (dsIdx !== -1 && qsIdx !== -1 && qsIdx > dsIdx) {
  const comp = body.slice(dsIdx, qsIdx).replace('const DynamicSVGDiagram', 'export const DynamicSVGDiagram');
  body = body.slice(0, dsIdx) + '/* DynamicSVGDiagram : voir components/DynamicSVGDiagram.jsx */\n\n' + body.slice(qsIdx);
  fs.mkdirSync(path.join(APP, 'components'), { recursive: true });
  fs.writeFileSync(path.join(APP, 'components', 'DynamicSVGDiagram.jsx'), comp.trimEnd() + '\n', 'utf8');
  imports.unshift("import { DynamicSVGDiagram } from './components/DynamicSVGDiagram.jsx';");
}

// Hooks React -> import
body = body.replace(/const \{ useState, useEffect, useMemo \} = React;\s*\n?/, '');
imports.unshift("import { useState, useEffect, useMemo } from 'react';");

// Retirer le bloc de rendu ReactDOM final
const rIdx = body.indexOf("ReactDOM.createRoot");
if (rIdx !== -1) {
  const rEnd = body.indexOf(';', body.indexOf(')', body.indexOf('render(')));
  body = body.slice(0, rIdx) + body.slice(rEnd + 1);
}

body = imports.join('\n') + '\n\n' + body;
// Export du composant App
if (/function App\s*\(/.test(body) || /const App = \(/.test(body)) body += '\n\nexport default App;\n';
fs.writeFileSync(path.join(APP, 'App.jsx'), body, 'utf8');
console.log('App.jsx écrit :', body.length, 'caractères');
console.log('Fichiers données :', imports.length);
