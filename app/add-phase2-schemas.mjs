// Ajoute support-cycle-v2 et cyber-defense-v2 après le dernier schéma v2
import fs from 'fs';
const f = 'app/src/components/DynamicSVGDiagram.jsx';
let c = fs.readFileSync(f, 'utf8');
if (c.includes('support-cycle-v2')) { console.log('déjà présent'); }
else {
  const EXTRA = `
            // ===== Schémas phase 2 : support/cybersécurité =====
            if (type === 'support-cycle-v2') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : le cycle de vie d'un ticket — qui fait quoi</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> le ticket suit un chemin précis de la gauche vers la droite. En cas de blocage, on escalade d'un niveau.</p>
                        <svg viewBox="0 0 620 240" role="img" aria-label="Cycle de vie d'un ticket avec acteurs et délais" className="w-full h-auto">
                            <rect x="15" y="60" width="115" height="50" rx="8" fill="#0284c7" /><text x="30" y="80" fill="white" fontWeight="bold" fontSize="10">Ouverture</text><text x="25" y="97" fill="#bae6fd" fontSize="9">utilisateur appelle</text>
                            <rect x="155" y="60" width="115" height="50" rx="8" fill="#059669" /><text x="172" y="80" fill="white" fontWeight="bold" fontSize="10">Qualification</text><text x="162" y="97" fill="#a7f3d0" fontSize="9">catégorie + criticité</text>
                            <rect x="295" y="60" width="115" height="50" rx="8" fill="#d97706" /><text x="315" y="80" fill="white" fontWeight="bold" fontSize="10">Priorisation</text><text x="300" y="97" fill="#fde68a" fontSize="9">P1→P4 · SLA</text>
                            <rect x="435" y="30" width="115" height="50" rx="8" fill="#6366f1" /><text x="452" y="50" fill="white" fontWeight="bold" fontSize="10">Diagnostic</text><text x="440" y="67" fill="#c7d2fe" fontSize="9">reproduire + logs</text>
                            <rect x="435" y="110" width="115" height="50" rx="8" fill="#059669" /><text x="450" y="130" fill="white" fontWeight="bold" fontSize="10">Résolution</text><text x="440" y="147" fill="#a7f3d0" fontSize="9">appliquer + tester</text>
                            <rect x="435" y="190" width="115" height="50" rx="8" fill="#16a34a" /><text x="455" y="210" fill="white" fontWeight="bold" fontSize="10">Clôture</text><text x="440" y="227" fill="#bbf7d0" fontSize="9">validation utilisateur</text>
                            <line x1="130" y1="85" x2="155" y2="85" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#ar)" /><line x1="270" y1="85" x2="295" y2="85" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#ar)" /><line x1="410" y1="85" x2="435" y2="55" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#ar)" /><line x1="490" y1="80" x2="490" y2="110" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#ar)" /><line x1="490" y1="160" x2="490" y2="190" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#ar)" />
                            <rect x="15" y="140" width="230" height="90" rx="10" fill="#1e293b" stroke="#ef4444" />
                            <text x="30" y="162" fill="#fca5a5" fontWeight="bold" fontSize="11">Escalade si échec :</text><text x="30" y="180" fill="#fecaca" fontSize="10">N1 (support) → N2 (technicien IT)</text><text x="30" y="197" fill="#fecaca" fontSize="10">→ N3 (expert / fournisseur)</text><text x="30" y="214" fill="#fecaca" fontSize="10">chaque escalade : nouveau délai SLA</text>
                            <rect x="255" y="140" width="150" height="90" rx="10" fill="#1e293b" stroke="#38bdf8" />
                            <text x="270" y="162" fill="#93c5fd" fontWeight="bold" fontSize="11">Priorités :</text><text x="270" y="180" fill="#93c5fd" fontSize="10">P1 : 4h · 50+ users</text><text x="270" y="197" fill="#93c5fd" fontSize="10">P2 : 8h · fonction KO</text><text x="270" y="214" fill="#93c5fd" fontSize="10">P3 : 24h · gêne partielle</text><text x="270" y="226" fill="#93c5fd" fontSize="10">P4 : 72h · confort</text>
                            <text x="15" y="185" fill="#94a3b8" fontSize="10">Où on le croise : chaque appel, chaque GLPI, chaque ServiceNow.</text>
                            <text x="15" y="205" fill="#94a3b8" fontSize="10">Pourquoi : sans cycle, les demandes se perdent, les SLA explosent.</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'cyber-defense-v2') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : défense en profondeur — chaque couche ralentit l'attaquant</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> l'attaquant vient de l'extérieur. Chaque anneau le ralentit et le détecte plus tôt. Un seul anneau ne suffit jamais — la sécurité est un empilement de barrières indépendantes.</p>
                        <svg viewBox="0 0 620 260" role="img" aria-label="Défense en profondeur : anneaux de sécurité" className="w-full h-auto">
                            <circle cx="155" cy="130" r="110" fill="#dc2626" opacity="0.25" stroke="#dc2626" strokeWidth="1.5" />
                            <circle cx="155" cy="130" r="92" fill="#ea580c" opacity="0.25" stroke="#ea580c" strokeWidth="1.5" />
                            <circle cx="155" cy="130" r="74" fill="#d97706" opacity="0.25" stroke="#d97706" strokeWidth="1.5" />
                            <circle cx="155" cy="130" r="56" fill="#059669" opacity="0.25" stroke="#059669" strokeWidth="1.5" />
                            <circle cx="155" cy="130" r="38" fill="#0284c7" opacity="0.25" stroke="#0284c7" strokeWidth="1.5" />
                            <circle cx="155" cy="130" r="20" fill="#6366f1" opacity="0.25" stroke="#6366f1" strokeWidth="1.5" />
                            <text x="125" y="130" fill="white" fontWeight="bold" fontSize="11">Données</text>
                            <text x="115" y="145" fill="#94a3b8" fontSize="9">à protéger</text>
                            <rect x="290" y="20" width="200" height="200" rx="8" fill="#0f172a" stroke="#334155" />
                            <text x="305" y="42" fill="#fbbf24" fontWeight="bold" fontSize="11">Anneau → Outil → Exemple</text>
                            <text x="305" y="64" fill="#e2e8f0" fontSize="10">6 · Comptes → MFA, AD durci</text>
                            <text x="305" y="82" fill="#e2e8f0" fontSize="10">5 · Postes → Antivirus, WDAC</text>
                            <text x="305" y="100" fill="#e2e8f0" fontSize="10">4 · App → ACL, zone DMZ</text>
                            <text x="305" y="118" fill="#e2e8f0" fontSize="10">3 · Réseau → VLAN, firewall</text>
                            <text x="305" y="136" fill="#e2e8f0" fontSize="10">2 · Périmètre → FireWall, IPS</text>
                            <text x="305" y="154" fill="#e2e8f0" fontSize="10">1 · Physique → badge, salle</text>
                            <text x="305" y="176" fill="#22c55e" fontSize="10">Détection : SIEM, Zabbix, syslog</text>
                            <text x="305" y="194" fill="#22c55e" fontSize="10">Réponse : plan de crise, PRA</text>
                            <rect x="15" y="245" width="590" height="12" rx="3" fill="#0f172a" />
                            <text x="25" y="255" fill="#94a3b8" fontSize="9">Où on le croise : chaque serveur, chaque poste, chaque pare-feu — et chaque ticket « j'ai cliqué sur un mail louche »</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'mockup-aduc') {`;
  // insérer avant le mockup-aduc existant
  const anchor = "            if (type === 'mockup-aduc') {";
  c = c.replace(anchor, EXTRA);
  fs.writeFileSync(f, c, 'utf8');
  console.log('support-cycle-v2 + cyber-defense-v2 ajoutés. Taille :', (c.length / 1024).toFixed(0), 'Ko');
}
