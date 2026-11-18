// Correctifs post-migration (encodage sûr via Node)
import fs from 'fs';

const F = 'app/src/App.jsx';
let code = fs.readFileSync(F, 'utf8');

// 1. Fragment React -> <>
code = code.replace(/<React\.Fragment>/g, '<>').replace(/<\/React\.Fragment>/g, '</>');

// 2. essTabs : ajouter les simulateurs
code = code.replace(
  "{ id: 'ports', label: '🔌 Ports réseau' },",
  "{ id: 'ports', label: '🔌 Ports réseau' },\n                    { id: 'simulateurs', label: '🧮 Simulateurs' },"
);

// 3. États des simulateurs après modsOpen
code = code.replace(
  "const [modsOpen, setModsOpen] = useState(false); // liste des modules repliée sur mobile",
  `const [modsOpen, setModsOpen] = useState(false); // liste des modules repliée sur mobile
            const [subCidr, setSubCidr] = useState({ ip: '192.168.10.70', pfx: 26 });
            const [subVlsm, setSubVlsm] = useState({ base: '192.168.20.0/24', hosts: '60, 25, 10, 2, 2' });
            const [subV6, setSubV6] = useState({ addr: '2001:db8:1::a1:0:0:1', mac: '00:1A:2B:3C:4D:5E' });
            const subVlsmResult = useMemo(() => {
                const base = subVlsm.base.trim();
                const bm = base.match(/^(\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})\\/(\\d{1,2})$/);
                if (!bm) return { error: 'Base invalide (format x.x.x.x/préfixe)' };
                const bIp = bm[1].split('.').map(Number);
                const bPfx = Number(bm[2]);
                if (bPfx < 8 || bPfx > 30) return { error: 'Préfixe de base entre /8 et /30' };
                const bSize = Math.pow(2, 32 - bPfx);
                const bInt = ((bIp[0] << 24) >>> 0) + (bIp[1] << 16) + (bIp[2] << 8) + bIp[3];
                const bNet = Math.floor(bInt / bSize) * bSize;
                const toIp = (n) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
                const hosts = subVlsm.hosts.split(/[;,]+/).map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0);
                if (hosts.length === 0) return { error: 'Aucun besoin valide (séparer par des virgules)' };
                const sorted = [...hosts].sort((a, b) => b - a);
                let cur = bNet;
                const rows = sorted.map(h => {
                    const need = h + 2; let pfx = 32;
                    while (pfx > 0 && Math.pow(2, 32 - pfx) < need) pfx--;
                    const size = Math.pow(2, 32 - pfx);
                    const start = Math.ceil(cur / size) * size;
                    const row = { h, pfx, network: toIp(start), first: toIp(start + 1), last: toIp(start + size - 2), broadcast: toIp(start + size - 1) };
                    cur = start + size;
                    return row;
                });
                return { rows, remaining: bSize - (cur - bNet), nextFree: toIp(cur) };
            }, [subVlsm]);`
);

// 4. Section simulateurs insérée après la section OUTILS
const oi = code.indexOf(`essTab === 'outils'`);
if (oi === -1) throw new Error('ancre outils introuvable');
// fin de la section outils : la prochaine fermeture ')}' au niveau 28 espaces
const closeIdx = code.indexOf('\n                            )}', oi);
if (closeIdx === -1) throw new Error('fermeture outils introuvable');
const insertAt = closeIdx + '\n                            )}'.length;
const SIM = fs.readFileSync('app/sim-section.txt', 'utf8');
code = code.slice(0, insertAt) + '\n' + SIM.trimEnd() + '\n' + code.slice(insertAt);

// 5. Assets : imports + références base-safe
code = code.replace(
  "import { useState, useEffect, useMemo } from 'react';",
  "import { useState, useEffect, useMemo } from 'react';\nimport bannerImg from './assets/alexander.jpg';\nimport bgHint from './assets/robynne.jpg';\nimport logoUrl from './assets/logo.png';"
);
code = code.replace(/src="Images\/alexander-korte-5eIKzXXMMZw-unsplash\.jpg"/g, 'src={bannerImg}');
code = code.replace(/src="Images\/pexels-marek-piwnicki-3907296-12489187\.jpg"/g, 'src={bgHint}');
code = code.replace(/src="logo\.png"/g, 'src={logoUrl}');
code = code.replace(/src="assets\/images\/dashboard-banner-network\.jpg"/g, 'src={bannerImg}');

fs.writeFileSync(F, code, 'utf8');
console.log('App.jsx corrigé :', code.length, 'caractères');
console.log('refs Images restantes :', (code.match(/src="Images/g) || []).length);
console.log('refs logo.png restantes :', (code.match(/src="logo\.png"/g) || []).length);
