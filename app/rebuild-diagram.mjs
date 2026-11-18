// Ré-extraction complète de DynamicSVGDiagram depuis legacy/index.html + ajout des schémas v2
import fs from 'fs';

const html = fs.readFileSync('legacy/index.html', 'utf8');
const dsIdx = html.indexOf('const DynamicSVGDiagram =');
const qsIdx = html.indexOf('const QcmSection');
let comp = html.slice(dsIdx, qsIdx).replace('const DynamicSVGDiagram', 'export const DynamicSVGDiagram');

// Injecter les schémas v2 avant le premier if (type ===
const V2 = `
            // ===== Schémas "v2" : illustrations professionnelles en français, harmonisées au thème =====
            if (type === 'osi-fr-v2') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : le modèle OSI — à quoi ça sert, où on le croise</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> chaque couche a UN métier. En bas, le transport des bits ; en haut, ce que voit l'utilisateur. Le diagnostic réseau consiste à retrouver LA couche fautive — chaque outil listé à droite teste une couche précise.</p>
                        <svg viewBox="0 0 620 290" role="img" aria-label="Modèle OSI : couches, exemples réels et outils de diagnostic" className="w-full h-auto">
                            <rect x="10" y="14" width="330" height="26" rx="5" fill="#d97706" />
                            <text x="20" y="32" fill="white" fontWeight="bold" fontSize="12">7 · Application — ce que voit l'utilisateur</text>
                            <rect x="10" y="46" width="330" height="26" rx="5" fill="#ea580c" />
                            <text x="20" y="64" fill="white" fontWeight="bold" fontSize="12">6 · Présentation — format, chiffrement (TLS)</text>
                            <rect x="10" y="78" width="330" height="26" rx="5" fill="#0284c7" />
                            <text x="20" y="96" fill="white" fontWeight="bold" fontSize="12">5 · Session — ouvrir/fermer les échanges</text>
                            <rect x="10" y="110" width="330" height="26" rx="5" fill="#059669" />
                            <text x="20" y="128" fill="white" fontWeight="bold" fontSize="12">4 · Transport — ports, fiabilité (TCP/UDP)</text>
                            <rect x="10" y="142" width="330" height="26" rx="5" fill="#6366f1" />
                            <text x="20" y="160" fill="white" fontWeight="bold" fontSize="12">3 · Réseau — adresse IP, routage inter-réseaux</text>
                            <rect x="10" y="174" width="330" height="26" rx="5" fill="#7c3aed" />
                            <text x="20" y="192" fill="white" fontWeight="bold" fontSize="12">2 · Liaison — trames, MAC, VLAN, switch</text>
                            <rect x="10" y="206" width="330" height="26" rx="5" fill="#475569" />
                            <text x="20" y="224" fill="white" fontWeight="bold" fontSize="12">1 · Physique — câbles, signaux, 100 m max</text>
                            <line x1="345" y1="219" x2="345" y2="27" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <text x="352" y="24" fill="#fbbf24" fontSize="11">Ordre de diagnostic : 1 → 7</text>
                            <rect x="352" y="46" width="255" height="186" rx="8" fill="#0f172a" stroke="#334155" />
                            <text x="362" y="66" fill="#93c5fd" fontWeight="bold" fontSize="11">Exemples réels · Outil de test</text>
                            <text x="362" y="88" fill="#e2e8f0" fontSize="10">HTTP · DNS · SSH · Outlook</text>
                            <text x="362" y="103" fill="#94a3b8" fontSize="9">→ nslookup, ping d'un nom</text>
                            <text x="362" y="122" fill="#e2e8f0" fontSize="10">TCP (fiable) · UDP (rapide)</text>
                            <text x="362" y="137" fill="#94a3b8" fontSize="9">→ Test-NetConnection -Port</text>
                            <text x="362" y="156" fill="#e2e8f0" fontSize="10">IP · ICMP · routeur</text>
                            <text x="362" y="171" fill="#94a3b8" fontSize="9">→ ping passerelle, traceroute</text>
                            <text x="362" y="190" fill="#e2e8f0" fontSize="10">MAC · switch · VLAN</text>
                            <text x="362" y="205" fill="#94a3b8" fontSize="9">→ show interfaces, show vlan</text>
                            <text x="362" y="224" fill="#e2e8f0" fontSize="10">Câble · fibre · connecteur</text>
                            <text x="362" y="239" fill="#94a3b8" fontSize="9">→ voyants, show interfaces status</text>
                            <text x="10" y="258" fill="#fbbf24" fontSize="11">Pourquoi c'est important :</text>
                            <text x="130" y="258" fill="#e2e8f0" fontSize="10">chaque couche élimine la moitié des hypothèses restantes.</text>
                            <text x="10" y="278" fill="#94a3b8" fontSize="10">Où on le croise : câble (1), switch (2), passerelle (3), pare-feu applicatif (7).</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'dns-fr-v2') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : le DNS en entreprise — la chaîne complète avec ses caches</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> l'étudiant tape intranet.exemple.fr : quatre caches sont consultés avant d'aller chercher la réponse loin. Si un seul maillon casse, « le site ne s'ouvre pas » — alors que le serveur web tourne parfaitement.</p>
                        <svg viewBox="0 0 620 280" role="img" aria-label="Chaîne de résolution DNS avec caches et contexte entreprise" className="w-full h-auto">
                            <rect x="15" y="20" width="140" height="60" rx="10" fill="#0284c7" />
                            <text x="30" y="42" fill="white" fontWeight="bold" fontSize="11">Poste de l'étudiant</text>
                            <text x="28" y="60" fill="#bae6fd" fontSize="9">1. cache du navigateur,</text>
                            <text x="28" y="73" fill="#bae6fd" fontSize="9">puis cache de l'OS</text>
                            <rect x="195" y="20" width="150" height="60" rx="10" fill="#059669" />
                            <text x="215" y="42" fill="white" fontWeight="bold" fontSize="11">DNS du domaine</text>
                            <text x="205" y="60" fill="#a7f3d0" fontSize="9">2. SRV-DC01 connaît</text>
                            <text x="205" y="73" fill="#a7f3d0" fontSize="9">tous les noms internes</text>
                            <rect x="385" y="20" width="150" height="60" rx="10" fill="#7c3aed" />
                            <text x="405" y="42" fill="white" fontWeight="bold" fontSize="11">Résolveur du FAI</text>
                            <text x="400" y="60" fill="#ddd6fe" fontSize="9">3. cache partagé de</text>
                            <text x="400" y="73" fill="#ddd6fe" fontSize="9">millions de clients</text>
                            <rect x="215" y="130" width="150" height="55" rx="10" fill="#dc2626" />
                            <text x="238" y="152" fill="white" fontWeight="bold" fontSize="11">Racine « . »</text>
                            <text x="230" y="170" fill="#fecaca" fontSize="9">« adresse-toi au .fr »</text>
                            <rect x="420" y="130" width="150" height="55" rx="10" fill="#b45309" />
                            <text x="445" y="152" fill="white" fontWeight="bold" fontSize="11">TLD « .fr »</text>
                            <text x="432" y="170" fill="#fde68a" fontSize="9">« adresse-toi au serveur</text>
                            <text x="432" y="183" fill="#fde68a" fontSize="9">de exemple.fr »</text>
                            <rect x="420" y="205" width="150" height="50" rx="10" fill="#1e293b" stroke="#f59e0b" />
                            <text x="437" y="226" fill="white" fontWeight="bold" fontSize="11">Serveur autoritaire</text>
                            <text x="430" y="244" fill="#fde68a" fontSize="9">4. détient l'enregistrement</text>
                            <line x1="155" y1="50" x2="195" y2="50" stroke="#22c55e" strokeWidth="3" markerEnd="url(#ar)" />
                            <line x1="345" y1="50" x2="385" y2="50" stroke="#22c55e" strokeWidth="3" markerEnd="url(#ar)" />
                            <line x1="460" y1="80" x2="290" y2="130" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="365" y1="130" x2="420" y2="130" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="495" y1="205" x2="545" y2="180" stroke="#22c55e" strokeWidth="3" markerEnd="url(#ar)" />
                            <text x="360" y="205" fill="#22c55e" fontSize="10">5. réponse : 192.0.2.10 —</text>
                            <text x="360" y="219" fill="#22c55e" fontSize="10">mise en cache selon TTL</text>
                            <rect x="15" y="130" width="160" height="60" rx="10" fill="#1e293b" stroke="#38bdf8" />
                            <text x="30" y="152" fill="#93c5fd" fontWeight="bold" fontSize="11">Où c'est utilisé :</text>
                            <text x="27" y="170" fill="#cbd5e1" fontSize="9">chaque accès : intranet, AD,</text>
                            <text x="27" y="183" fill="#cbd5e1" fontSize="9">imprimante, outlook, Internet</text>
                            <rect x="15" y="205" width="160" height="50" rx="10" fill="#450a0a" stroke="#ef4444" />
                            <text x="27" y="227" fill="#fca5a5" fontWeight="bold" fontSize="11">Pourquoi c'est vital :</text>
                            <text x="24" y="244" fill="#fecaca" fontSize="9">DNS mort = « plus rien ne marche »</text>
                            <text x="15" y="272" fill="#94a3b8" fontSize="10">Vérif express : ping IP réussi + nom KO = DNS. ipconfig /all : serveur DNS du poste ? nslookup : qui répond ?</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'kerberos-fr-v2') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : Kerberos dans Active Directory — le guichet à tickets</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> le DC fait office de guichet (KDC). À l'ouverture de session, l'utilisateur reçoit un TGT « billet d'entrée » valable ~10 h ; chaque service exige ensuite son propre ticket (TGS). Le mot de passe ne circule JAMAIS vers les services.</p>
                        <svg viewBox="0 0 620 260" role="img" aria-label="Kerberos dans Active Directory : TGT, TGS et contexte entreprise" className="w-full h-auto">
                            <rect x="20" y="80" width="150" height="70" rx="10" fill="#0284c7" />
                            <text x="45" y="105" fill="white" fontWeight="bold" fontSize="12">Utilisateur</text>
                            <text x="32" y="125" fill="#bae6fd" fontSize="10">claire.martin (RH)</text>
                            <text x="32" y="140" fill="#bae6fd" fontSize="10">PC-RH-01 joint au domaine</text>
                            <rect x="235" y="60" width="150" height="90" rx="10" fill="#059669" />
                            <text x="262" y="85" fill="white" fontWeight="bold" fontSize="12">DC — KDC</text>
                            <text x="248" y="105" fill="#a7f3d0" fontSize="10">1. AS : vérifie le mdp,</text>
                            <text x="248" y="120" fill="#a7f3d0" fontSize="10">délivre le TGT (10 h)</text>
                            <text x="248" y="138" fill="#a7f3d0" fontSize="10">2. TGS : ticket service</text>
                            <rect x="460" y="20" width="140" height="55" rx="10" fill="#7c3aed" />
                            <text x="482" y="42" fill="white" fontWeight="bold" fontSize="11">SRV-FILE01</text>
                            <text x="477" y="60" fill="#ddd6fe" fontSize="9">partage \\\\RH\\Documents</text>
                            <rect x="460" y="105" width="140" height="55" rx="10" fill="#7c3aed" />
                            <text x="480" y="127" fill="white" fontWeight="bold" fontSize="11">SRV-MAIL01</text>
                            <text x="484" y="145" fill="#ddd6fe" fontSize="9">Outlook / Exchange</text>
                            <line x1="170" y1="95" x2="235" y2="95" stroke="#22c55e" strokeWidth="3" markerEnd="url(#ar)" />
                            <text x="172" y="87" fill="#22c55e" fontSize="10">1. ouverture de session</text>
                            <line x1="235" y1="130" x2="170" y2="130" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#ar)" />
                            <text x="176" y="150" fill="#fbbf24" fontSize="10">← TGT (badge du site)</text>
                            <line x1="385" y1="95" x2="460" y2="48" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#ar)" />
                            <text x="388" y="75" fill="#fbbf24" fontSize="10">TGS →</text>
                            <line x1="385" y1="130" x2="460" y2="130" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#ar)" />
                            <text x="388" y="125" fill="#fbbf24" fontSize="10">TGS →</text>
                            <rect x="20" y="170" width="290" height="60" rx="10" fill="#1e293b" stroke="#ef4444" />
                            <text x="35" y="192" fill="#fca5a5" fontWeight="bold" fontSize="11">Pourquoi c'est vital + où ça casse :</text>
                            <text x="30" y="210" fill="#fecaca" fontSize="10">horloge décalée &gt; 5 min = rejet Kerberos</text>
                            <text x="30" y="225" fill="#fecaca" fontSize="10">« Le nom principal cible est incorrect » : SPN/DNS</text>
                            <rect x="330" y="170" width="270" height="60" rx="10" fill="#1e293b" stroke="#38bdf8" />
                            <text x="345" y="192" fill="#93c5fd" fontWeight="bold" fontSize="11">Vérifier côté poste :</text>
                            <text x="345" y="210" fill="#93c5fd" fontSize="10">klist → voir les tickets · klist purge → purger</text>
                            <text x="345" y="225" fill="#93c5fd" fontSize="10">w32tm /resync → réaligner l'horloge</text>
                            <text x="20" y="252" fill="#94a3b8" fontSize="10">Où on le croise : chaque ouverture de session, chaque partage, chaque Outlook — et chaque ticket « expiré » du matin où l'heure du DC a dérivé.</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'nat-fr-v2') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : NAT en entreprise — un FAI, des dizaines de postes</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> le FAI ne fournit qu'UNE adresse publique. Le NAT réécrit les ports pour partager cette adresse entre tous les postes — et bloque naturellement les connexions entrantes non publiées.</p>
                        <svg viewBox="0 0 620 260" role="img" aria-label="NAT en contexte entreprise" className="w-full h-auto">
                            <rect x="15" y="30" width="130" height="45" rx="8" fill="#0284c7" />
                            <text x="30" y="50" fill="white" fontWeight="bold" fontSize="11">PC direction</text>
                            <text x="25" y="67" fill="#bae6fd" fontSize="10">10.1.1.10:1025</text>
                            <rect x="15" y="95" width="130" height="45" rx="8" fill="#0284c7" />
                            <text x="30" y="115" fill="white" fontWeight="bold" fontSize="11">PC compta</text>
                            <text x="25" y="132" fill="#bae6fd" fontSize="10">10.1.1.11:1044</text>
                            <rect x="15" y="160" width="130" height="45" rx="8" fill="#0284c7" />
                            <text x="30" y="180" fill="white" fontWeight="bold" fontSize="11">PC RH</text>
                            <text x="25" y="197" fill="#bae6fd" fontSize="10">10.1.1.12:1080</text>
                            <rect x="215" y="60" width="150" height="110" rx="10" fill="#059669" />
                            <text x="238" y="84" fill="white" fontWeight="bold" fontSize="12">Routeur NAT</text>
                            <text x="230" y="104" fill="#a7f3d0" fontSize="10">table de traduction :</text>
                            <text x="230" y="120" fill="#a7f3d0" fontSize="10">:1025 → 49152</text>
                            <text x="230" y="136" fill="#a7f3d0" fontSize="10">:1044 → 49153</text>
                            <text x="230" y="152" fill="#a7f3d0" fontSize="10">:1080 → 49154</text>
                            <rect x="430" y="60" width="130" height="45" rx="8" fill="#7c3aed" />
                            <text x="447" y="80" fill="white" fontWeight="bold" fontSize="11">Internet / FAI</text>
                            <text x="442" y="97" fill="#ddd6fe" fontSize="10">203.0.113.5 (1 seule !)</text>
                            <line x1="145" y1="52" x2="215" y2="85" stroke="#22c55e" strokeWidth="3" markerEnd="url(#ar)" />
                            <line x1="145" y1="117" x2="215" y2="110" stroke="#22c55e" strokeWidth="3" markerEnd="url(#ar)" />
                            <line x1="145" y1="182" x2="215" y2="135" stroke="#22c55e" strokeWidth="3" markerEnd="url(#ar)" />
                            <line x1="365" y1="95" x2="430" y2="85" stroke="#22c55e" strokeWidth="3" markerEnd="url(#ar)" />
                            <text x="368" y="75" fill="#22c55e" fontSize="10">203.0.113.5:4915x →</text>
                            <rect x="15" y="225" width="590" height="28" rx="6" fill="#450a0a" stroke="#ef4444" />
                            <text x="27" y="244" fill="#fecaca" fontSize="10">Pourquoi c'est important : un paquet ENTRANT sans entrée dans la table est détruit — les serveurs internes ne sont joignables que si on les publie (NAT statique).</text>
                            <text x="15" y="20" fill="#94a3b8" fontSize="10">Où on le croise : chaque box, chaque routeur d'agence. Le même mécanisme rend « inaccessible » un serveur interne depuis Internet.</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'topologies-fr-v2') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : topologies réseau — la bonne pour le bon usage</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> la topologie conditionne la résilience (que se passe-t-il si un câble casse ?) et le coût. L'étoile autour d'un switch central est le standard des bureaux ; le maillé est réservé aux liaisons critiques.</p>
                        <svg viewBox="0 0 620 270" role="img" aria-label="Topologies réseau avec avantages et limites" className="w-full h-auto">
                            <rect x="10" y="10" width="285" height="120" rx="10" fill="#1e293b" stroke="#22c55e" />
                            <text x="80" y="32" fill="#86efac" fontWeight="bold" fontSize="12">Étoile — standard bureautique</text>
                            <circle cx="70" cy="85" r="14" fill="#0284c7" />
                            <text x="60" y="89" fill="white" fontSize="9">SW</text>
                            <line x1="70" y1="85" x2="25" y2="45" stroke="#94a3b8" strokeWidth="2" /><rect x="18" y="38" width="14" height="14" rx="2" fill="#475569" />
                            <line x1="70" y1="85" x2="115" y2="45" stroke="#94a3b8" strokeWidth="2" /><rect x="108" y="38" width="14" height="14" rx="2" fill="#475569" />
                            <line x1="70" y1="85" x2="25" y2="125" stroke="#94a3b8" strokeWidth="2" /><rect x="18" y="118" width="14" height="14" rx="2" fill="#475569" />
                            <line x1="70" y1="85" x2="115" y2="125" stroke="#94a3b8" strokeWidth="2" /><rect x="108" y="118" width="14" height="14" rx="2" fill="#475569" />
                            <line x1="70" y1="85" x2="70" y2="135" stroke="#94a3b8" strokeWidth="2" /><rect x="63" y="128" width="14" height="14" rx="2" fill="#475569" />
                            <text x="135" y="70" fill="#e2e8f0" fontSize="10">✔ une panne de câble = un seul poste</text>
                            <text x="135" y="88" fill="#e2e8f0" fontSize="10">✔ facile à câbler et dépanner</text>
                            <text x="135" y="106" fill="#fca5a5" fontSize="10">✕ le switch central est un point unique</text>
                            <text x="135" y="121" fill="#94a3b8" fontSize="9">→ d'où les switches empilés en production</text>
                            <rect x="315" y="10" width="285" height="120" rx="10" fill="#1e293b" stroke="#38bdf8" />
                            <text x="395" y="32" fill="#7dd3fc" fontWeight="bold" fontSize="12">Maillé — liaisons critiques</text>
                            <circle cx="370" cy="60" r="9" fill="#059669" /><circle cx="450" cy="60" r="9" fill="#059669" />
                            <circle cx="370" cy="115" r="9" fill="#059669" /><circle cx="450" cy="115" r="9" fill="#059669" />
                            <line x1="370" y1="60" x2="450" y2="60" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="370" y1="60" x2="370" y2="115" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="450" y1="60" x2="450" y2="115" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="370" y1="115" x2="450" y2="115" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="370" y1="60" x2="450" y2="115" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="450" y1="60" x2="370" y2="115" stroke="#94a3b8" strokeWidth="2" />
                            <text x="478" y="70" fill="#e2e8f0" fontSize="10">✔ plusieurs chemins</text>
                            <text x="478" y="88" fill="#e2e8f0" fontSize="10">✔ sites cœur / datacenter</text>
                            <text x="478" y="106" fill="#fca5a5" fontSize="10">✕ coût × n, complexité</text>
                            <text x="478" y="121" fill="#94a3b8" fontSize="9">→ exige STP ou routage dynamique</text>
                            <rect x="10" y="145" width="285" height="115" rx="10" fill="#1e293b" stroke="#f59e0b" />
                            <text x="60" y="167" fill="#fcd34d" fontWeight="bold" fontSize="12">Bus et anneau — héritage</text>
                            <line x1="35" y1="200" x2="250" y2="200" stroke="#94a3b8" strokeWidth="2" />
                            <rect x="45" y="193" width="16" height="14" rx="2" fill="#475569" /><rect x="93" y="193" width="16" height="14" rx="2" fill="#475569" />
                            <rect x="141" y="193" width="16" height="14" rx="2" fill="#475569" /><rect x="189" y="193" width="16" height="14" rx="2" fill="#475569" />
                            <rect x="237" y="193" width="16" height="14" rx="2" fill="#475569" />
                            <text x="35" y="228" fill="#fca5a5" fontSize="10">✕ une coupure = tout le segment</text>
                            <text x="35" y="246" fill="#94a3b8" fontSize="9">→ legacy industriel (RS-485, automates)</text>
                            <rect x="315" y="145" width="285" height="115" rx="10" fill="#1e293b" stroke="#a855f7" />
                            <text x="345" y="167" fill="#d8b4fe" fontWeight="bold" fontSize="12">Arbre — multi-étages</text>
                            <rect x="430" y="180" width="50" height="18" rx="3" fill="#7c3aed" /><text x="436" y="193" fill="white" fontSize="9">cœur</text>
                            <rect x="340" y="225" width="50" height="18" rx="3" fill="#0284c7" /><rect x="420" y="225" width="50" height="18" rx="3" fill="#0284c7" /><rect x="500" y="225" width="50" height="18" rx="3" fill="#0284c7" />
                            <line x1="455" y1="198" x2="365" y2="225" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="455" y1="198" x2="445" y2="225" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="455" y1="198" x2="525" y2="225" stroke="#94a3b8" strokeWidth="2" />
                            <text x="560" y="200" fill="#e2e8f0" fontSize="10">✔ étages par bâtiment</text>
                            <text x="560" y="218" fill="#e2e8f0" fontSize="10">✔ hiérarchie cœur/distribution</text>
                            <text x="560" y="236" fill="#94a3b8" fontSize="9">→ le design réel de toute PME</text>
                            <text x="10" y="266" fill="#94a3b8" fontSize="10">Où on le croise : bureau = étoile · entre bâtiments = arbre sur fibre · entre sites = maillé partiel (2 liens redondants).</text>
                        </svg>
                    </div>
                );
            }

`;
const firstIf = comp.indexOf("            if (type === '");
comp = comp.slice(0, firstIf) + V2 + comp.slice(firstIf);
fs.writeFileSync('app/src/components/DynamicSVGDiagram.jsx', comp, 'utf8');
console.log('DynamicSVGDiagram.jsx :', (comp.length / 1024).toFixed(0), 'Ko');
