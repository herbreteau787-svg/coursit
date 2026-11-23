export const DynamicSVGDiagram = ({ type }) => {

            // ===== Schémas "v2" : illustrations professionnelles en français, harmonisées au thème =====
            if (type === 'osi-fr-v2') {
                return (
                    <div className="w-full bg-slate-900 text-white p-5 rounded-xl border border-slate-700 shadow-xl overflow-x-auto">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs uppercase font-extrabold tracking-wider text-sky-400">Architecture Réseau & Diagnostic · Modèle OSI</h4>
                            <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">Standard ISO 7498</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-3 leading-relaxed"><strong className="text-amber-300">Lecture :</strong> chaque couche résout un problème précis. Le diagnostic s'effectue systématiquement de bas en haut (de la couche physique 1 vers l'application 7) en éliminant les hypothèses une par une.</p>
                        <svg viewBox="0 0 640 310" role="img" aria-label="Modele OSI : couches, exemples réels et outils de diagnostic" className="w-full h-auto font-sans">
                            <defs>
                                <marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
                                </marker>
                            </defs>
                            {/* Couches OSI */}
                            <g transform="translate(10, 10)">
                                <rect x="0" y="0" width="340" height="30" rx="6" fill="#b45309" />
                                <text x="12" y="20" fill="white" fontWeight="bold" fontSize="11">7 · Application — ce que voit l'utilisateur</text>

                                <rect x="0" y="34" width="340" height="30" rx="6" fill="#c2410c" />
                                <text x="12" y="54" fill="white" fontWeight="bold" fontSize="11">6 · Présentation — format, chiffrement (TLS)</text>

                                <rect x="0" y="68" width="340" height="30" rx="6" fill="#0369a1" />
                                <text x="12" y="88" fill="white" fontWeight="bold" fontSize="11">5 · Session — ouvrir/fermer les échanges</text>

                                <rect x="0" y="102" width="340" height="30" rx="6" fill="#047857" />
                                <text x="12" y="122" fill="white" fontWeight="bold" fontSize="11">4 · Transport — ports, fiabilité (TCP/UDP)</text>

                                <rect x="0" y="136" width="340" height="30" rx="6" fill="#4338ca" />
                                <text x="12" y="156" fill="white" fontWeight="bold" fontSize="11">3 · Réseau — IP, routage inter-réseaux</text>

                                <rect x="0" y="170" width="340" height="30" rx="6" fill="#6d28d9" />
                                <text x="12" y="190" fill="white" fontWeight="bold" fontSize="11">2 · Liaison — trames, MAC, switch, VLAN</text>

                                <rect x="0" y="204" width="340" height="30" rx="6" fill="#334155" />
                                <text x="12" y="224" fill="white" fontWeight="bold" fontSize="11">1 · Physique — câbles, signaux, 100m max</text>
                            </g>

                            {/* Flèche de diagnostic */}
                            <line x1="365" y1="225" x2="365" y2="20" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#ar)" />
                            <text x="375" y="125" fill="#fbbf24" fontSize="11" fontWeight="bold" transform="rotate(270, 375, 125)">Diagnostic 1 → 7</text>

                            {/* Panneau de droite : Exemples et Outils */}
                            <rect x="395" y="10" width="235" height="224" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                            <text x="408" y="32" fill="#93c5fd" fontWeight="bold" fontSize="11">Exemples &amp; Outils de test</text>
                            <text x="408" y="55" fill="#f8fafc" fontSize="10">HTTP · DNS · SSH · Outlook</text>
                            <text x="408" y="70" fill="#94a3b8" fontSize="9">→ nslookup, test port distant</text>

                            <text x="408" y="92" fill="#f8fafc" fontSize="10">TCP (fiable) · UDP (rapide)</text>
                            <text x="408" y="107" fill="#94a3b8" fontSize="9">→ Test-NetConnection -Port</text>

                            <text x="408" y="129" fill="#f8fafc" fontSize="10">IP · ICMP · Routeur</text>
                            <text x="408" y="144" fill="#94a3b8" fontSize="9">→ ping passerelle, traceroute</text>

                            <text x="408" y="166" fill="#f8fafc" fontSize="10">MAC · Switch · VLAN</text>
                            <text x="408" y="181" fill="#94a3b8" fontSize="9">→ show interface status</text>

                            <text x="408" y="203" fill="#f8fafc" fontSize="10">Câble cuivre / fibre</text>
                            <text x="408" y="218" fill="#94a3b8" fontSize="9">→ voyants RJ45, testeur</text>

                            {/* Notes de bas de page */}
                            <rect x="10" y="246" width="620" height="52" rx="6" fill="#1e293b" stroke="#475569" />
                            <text x="22" y="266" fill="#fbbf24" fontWeight="bold" fontSize="10">Méthode TSSR / CCNA :</text>
                            <text x="145" y="266" fill="#e2e8f0" fontSize="10">Chaque couche isolée élimine 50% des causes de panne potentielles.</text>
                            <text x="22" y="286" fill="#94a3b8" fontSize="10">Contexte pro : du câblage physique (bureau) au pare-feu applicatif (DMZ), la maîtrise de l'OSI est indispensable.</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'dns-fr-v2') {
                return (
                    <div className="w-full bg-slate-900 text-white p-5 rounded-xl border border-slate-700 shadow-xl overflow-x-auto">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs uppercase font-extrabold tracking-wider text-sky-400">Architecture Réseau &amp; Entreprise · Résolution DNS &amp; Caches</h4>
                            <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">RFC 1034 / 1035</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-3 leading-relaxed"><strong className="text-amber-300">Lecture :</strong> l'utilisateur tape un nom de domaine. Quatre niveaux de cache sont interrogés avant d'initier une requête récursive complète. Un incident DNS se traduit immédiatement par un « site inaccessible » alors que les serveurs web fonctionnent.</p>
                        <svg viewBox="0 0 640 300" role="img" aria-label="Chaîne de résolution DNS avec caches et contexte entreprise" className="w-full h-auto font-sans">
                            <defs>
                                <marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#22c55e" />
                                </marker>
                            </defs>
                            {/* Blocs de la chaîne */}
                            <rect x="20" y="25" width="160" height="65" rx="8" fill="#0284c7" />
                            <text x="35" y="48" fill="white" fontWeight="bold" fontSize="11">Poste Client</text>
                            <text x="33" y="65" fill="#bae6fd" fontSize="10">1. Cache navigateur</text>
                            <text x="33" y="80" fill="#bae6fd" fontSize="10">puis cache OS (ipconfig /displaydns)</text>

                            <rect x="215" y="25" width="160" height="65" rx="8" fill="#059669" />
                            <text x="230" y="48" fill="white" fontWeight="bold" fontSize="11">DNS Entreprise (DC)</text>
                            <text x="228" y="65" fill="#a7f3d0" fontSize="10">2. SRV-DC01</text>
                            <text x="228" y="80" fill="#a7f3d0" fontSize="10">Zone interne (.lan / .local)</text>

                            <rect x="410" y="25" width="210" height="65" rx="8" fill="#7c3aed" />
                            <text x="425" y="48" fill="white" fontWeight="bold" fontSize="11">Résolveur FAI / Public</text>
                            <text x="423" y="65" fill="#ddd6fe" fontSize="10">3. Cache partagé (ex: 1.1.1.1)</text>
                            <text x="423" y="80" fill="#ddd6fe" fontSize="10">Transmet la requête récursive si miss</text>

                            {/* Étage hiérarchie Internet */}
                            <rect x="215" y="125" width="180" height="55" rx="8" fill="#b91c1c" />
                            <text x="230" y="148" fill="white" fontWeight="bold" fontSize="11">Racine « . »</text>
                            <text x="228" y="165" fill="#fecaca" fontSize="9">Oriente vers le serveur TLD (.fr, .com)</text>

                            <rect x="430" y="125" width="190" height="55" rx="8" fill="#d97706" />
                            <text x="445" y="148" fill="white" fontWeight="bold" fontSize="11">Serveur TLD (« .fr »)</text>
                            <text x="443" y="165" fill="#fde68a" fontSize="9">Oriente vers le serveur autoritaire du domaine</text>

                            <rect x="430" y="200" width="190" height="55" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                            <text x="445" y="222" fill="white" fontWeight="bold" fontSize="11">Serveur Autoritaire</text>
                            <text x="443" y="240" fill="#fde68a" fontSize="9">4. Détient l'enregistrement (A / CNAME)</text>

                            {/* Lignes de flux */}
                            <line x1="180" y1="57" x2="215" y2="57" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <line x1="375" y1="57" x2="410" y2="57" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#ar)" />

                            {/* Boîte d'aide / diagnostic */}
                            <rect x="20" y="125" width="175" height="130" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="32" y="148" fill="#93c5fd" fontWeight="bold" fontSize="11">Méthode de Diagnostic :</text>
                            <text x="30" y="168" fill="#cbd5e1" fontSize="10">1. ipconfig /all (quel DNS ?)</text>
                            <text x="30" y="186" fill="#cbd5e1" fontSize="10">2. nslookup (qui répond ?)</text>
                            <text x="30" y="204" fill="#cbd5e1" fontSize="10">3. ipconfig /flushdns</text>
                            <text x="30" y="224" fill="#fbbf24" fontSize="10">Ping IP OK + Nom KO</text>
                            <text x="30" y="240" fill="#f87171" fontSize="10">= Panne DNS avérée.</text>

                            <text x="215" y="278" fill="#94a3b8" fontSize="10">Où on le croise : intégration Active Directory, accès Internet, résolution des partages réseau et messagerie Exchange/Office 365.</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'kerberos-fr-v2') {
                return (
                    <div className="w-full bg-slate-900 text-white p-5 rounded-xl border border-slate-700 shadow-xl overflow-x-auto">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs uppercase font-extrabold tracking-wider text-sky-400">Authentification Windows · Protocole Kerberos &amp; Active Directory</h4>
                            <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">RFC 4120 / KDC</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-3 leading-relaxed"><strong className="text-amber-300">Lecture :</strong> le DC fait office de guichet (KDC). À l'ouverture de session, le poste obtient un TGT (badge d'accès valable 10 h), puis demande un TGS (ticket de service) pour chaque ressource (partage, messagerie). Le mot de passe ne transite jamais.</p>
                        <svg viewBox="0 0 640 290" role="img" aria-label="Kerberos dans Active Directory : flux TGT et TGS" className="w-full h-auto font-sans">
                            <defs>
                                <marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                                </marker>
                            </defs>
                            {/* Acteurs */}
                            <rect x="20" y="80" width="150" height="75" rx="8" fill="#0284c7" />
                            <text x="35" y="105" fill="white" fontWeight="bold" fontSize="11">Poste Client (Utilisateur)</text>
                            <text x="33" y="125" fill="#bae6fd" fontSize="10">claire.martin (RH)</text>
                            <text x="33" y="142" fill="#bae6fd" fontSize="10">PC joint au domaine</text>

                            <rect x="245" y="60" width="160" height="110" rx="8" fill="#059669" />
                            <text x="265" y="85" fill="white" fontWeight="bold" fontSize="11">Contrôleur de Domaine</text>
                            <text x="258" y="105" fill="#a7f3d0" fontSize="10">1. AS : valide le mot de passe,</text>
                            <text x="258" y="122" fill="#a7f3d0" fontSize="10">délivre le TGT (valide 10h)</text>
                            <text x="258" y="145" fill="#a7f3d0" fontSize="10">2. TGS : délivre le ticket service</text>

                            <rect x="460" y="25" width="160" height="60" rx="8" fill="#7c3aed" />
                            <text x="475" y="48" fill="white" fontWeight="bold" fontSize="11">SRV-FILE01 (Partage)</text>
                            <text x="473" y="66" fill="#ddd6fe" fontSize="9">Accès \\RH\Documents</text>

                            <rect x="460" y="110" width="160" height="60" rx="8" fill="#7c3aed" />
                            <text x="475" y="133" fill="white" fontWeight="bold" fontSize="11">SRV-MAIL01 (Exchange)</text>
                            <text x="473" y="151" fill="#ddd6fe" fontSize="9">Accès Outlook</text>

                            {/* Lignes de flux */}
                            <line x1="170" y1="100" x2="245" y2="100" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <text x="175" y="90" fill="#22c55e" fontSize="9">1. Demande TGT</text>

                            <line x1="245" y1="130" x2="170" y2="130" stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <text x="175" y="150" fill="#fbbf24" fontSize="9">← Taus TGT</text>

                            <line x1="405" y1="90" x2="460" y2="55" stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <text x="410" y="80" fill="#fbbf24" fontSize="9">TGS →</text>

                            <line x1="405" y1="130" x2="460" y2="135" stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <text x="410" y="148" fill="#fbbf24" fontSize="9">TGS →</text>

                            {/* Boîtes de dépannage / pièges */}
                            <rect x="20" y="180" width="290" height="85" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
                            <text x="32" y="202" fill="#fca5a5" fontWeight="bold" fontSize="11">Pièges &amp; Incidents courants :</text>
                            <text x="30" y="222" fill="#fecaca" fontSize="10">• Horloge décalée &gt; 5 min = rejet Kerberos</text>
                            <text x="30" y="240" fill="#fecaca" fontSize="10">• « Nom principal cible incorrect » (SPN / DNS)</text>

                            <rect x="330" y="180" width="290" height="85" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="342" y="202" fill="#93c5fd" fontWeight="bold" fontSize="11">Commandes de diagnostic :</text>
                            <text x="340" y="222" fill="#93c5fd" fontSize="10">• klist (voir les tickets actifs en cache)</text>
                            <text x="340" y="240" fill="#93c5fd" fontSize="10">• w32tm /resync (réaligner l'heure du poste)</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'nat-fr-v2') {
                return (
                    <div className="w-full bg-slate-900 text-white p-5 rounded-xl border border-slate-700 shadow-xl overflow-x-auto">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs uppercase font-extrabold tracking-wider text-sky-400">Réseaux &amp; Internet · NAT (Network Address Translation)</h4>
                            <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">RFC 3022</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-3 leading-relaxed"><strong className="text-amber-300">Lecture :</strong> le FAI ne fournit qu'une seule adresse publique. Le routeur NAT réécrit les ports pour partager cette adresse entre tous les postes de l'entreprise, tout en bloquant naturellement les connexions entrantes non sollicitées.</p>
                        <svg viewBox="0 0 640 280" role="img" aria-label="Fonctionnement du NAT : plusieurs postes internes partagent une IP publique unique" className="w-full h-auto font-sans">
                            <defs>
                                <marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#22c55e" />
                                </marker>
                            </defs>
                            {/* Postes internes */}
                            <rect x="20" y="30" width="135" height="45" rx="6" fill="#0284c7" />
                            <text x="32" y="50" fill="white" fontWeight="bold" fontSize="11">PC Direction</text>
                            <text x="30" y="68" fill="#bae6fd" fontSize="10">10.1.1.10:1025</text>

                            <rect x="20" y="95" width="135" height="45" rx="6" fill="#0284c7" />
                            <text x="32" y="115" fill="white" fontWeight="bold" fontSize="11">PC Compta</text>
                            <text x="30" y="133" fill="#bae6fd" fontSize="10">10.1.1.11:1044</text>

                            <rect x="20" y="160" width="135" height="45" rx="6" fill="#0284c7" />
                            <text x="32" y="180" fill="white" fontWeight="bold" fontSize="11">PC RH</text>
                            <text x="30" y="198" fill="#bae6fd" fontSize="10">10.1.1.12:1080</text>

                            {/* Routeur NAT */}
                            <rect x="210" y="60" width="180" height="115" rx="8" fill="#059669" />
                            <text x="232" y="85" fill="white" fontWeight="bold" fontSize="12">Routeur NAT (PAT)</text>
                            <text x="225" y="108" fill="#a7f3d0" fontSize="10">Table de traduction :</text>
                            <text x="225" y="126" fill="#a7f3d0" fontSize="10">:1025 → 49152</text>
                            <text x="225" y="144" fill="#a7f3d0" fontSize="10">:1044 → 49153</text>
                            <text x="225" y="162" fill="#a7f3d0" fontSize="10">:1080 → 49154</text>

                            {/* Internet */}
                            <rect x="445" y="60" width="175" height="45" rx="6" fill="#7c3aed" />
                            <text x="460" y="80" fill="white" fontWeight="bold" fontSize="11">Internet / FAI</text>
                            <text x="458" y="98" fill="#ddd6fe" fontSize="10">203.0.113.5 (1 seule IP !)</text>

                            {/* Flux */}
                            <line x1="155" y1="52" x2="210" y2="85" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <line x1="155" y1="117" x2="210" y2="110" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <line x1="155" y1="182" x2="210" y2="135" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <line x1="390" y1="95" x2="445" y2="85" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <text x="395" y="75" fill="#22c55e" fontSize="10">203.0.113.5:4915x →</text>

                            {/* Note de bas */}
                            <rect x="20" y="230" width="600" height="38" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                            <text x="32" y="250" fill="#fecaca" fontWeight="bold" fontSize="10">Règle de sécurité :</text>
                            <text x="150" y="250" fill="#fecaca" fontSize="10">Un paquet entrant sans entrée dans la table est détruit. Les serveurs internes ne sont accessibles que si on les publie (NAT statique / port forwarding).</text>
                            <text x="20" y="215" fill="#94a3b8" fontSize="10">Contexte pro : chaque box, chaque routeur d'agence. Le même mécanisme rend « inaccessible » un serveur interne depuis Internet.</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'topologies-fr-v2') {
                return (
                    <div className="w-full bg-slate-900 text-white p-5 rounded-xl border border-slate-700 shadow-xl overflow-x-auto">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs uppercase font-extrabold tracking-wider text-sky-400">Réseaux &amp; Architecture · Topologies Réseau</h4>
                            <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">IEEE 802 / Cisco</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-3 leading-relaxed"><strong className="text-amber-300">Lecture :</strong> la topologie conditionne la résilience (que se passe-t-il si un câble casse ?) et le coût. L'étoile autour d'un switch central est le standard des bureaux ; le maillé est réservé aux liaisons critiques.</p>
                        <svg viewBox="0 0 640 290" role="img" aria-label="Topologies réseau avec avantages et limites" className="w-full h-auto font-sans">
                            <defs>
                                <marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                                </marker>
                            </defs>
                            {/* Étoile */}
                            <rect x="15" y="15" width="300" height="120" rx="8" fill="#0f172a" stroke="#22c55e" strokeWidth="1.5" />
                            <text x="85" y="35" fill="#86efac" fontWeight="bold" fontSize="11">Étoile — standard bureautique</text>
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
                            <text x="135" y="121" fill="#94a3b8" fontSize="9">→ d'où les switches empilés en prod</text>

                            {/* Maillé */}
                            <rect x="330" y="15" width="295" height="120" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="410" y="35" fill="#7dd3fc" fontWeight="bold" fontSize="11">Maillé — liaisons critiques</text>
                            <circle cx="385" cy="60" r="9" fill="#059669" /><circle cx="465" cy="60" r="9" fill="#059669" />
                            <circle cx="385" cy="115" r="9" fill="#059669" /><circle cx="465" cy="115" r="9" fill="#059669" />
                            <line x1="385" y1="60" x2="465" y2="60" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="385" y1="60" x2="385" y2="115" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="465" y1="60" x2="465" y2="115" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="385" y1="115" x2="465" y2="115" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="385" y1="60" x2="465" y2="115" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="465" y1="60" x2="385" y2="115" stroke="#94a3b8" strokeWidth="2" />
                            <text x="488" y="70" fill="#e2e8f0" fontSize="10">✔ plusieurs chemins</text>
                            <text x="488" y="88" fill="#e2e8f0" fontSize="10">✔ sites cœur / datacenter</text>
                            <text x="488" y="106" fill="#fca5a5" fontSize="10">✕ coût × n, complexité</text>
                            <text x="488" y="121" fill="#94a3b8" fontSize="9">→ exige STP / routage dynamique</text>

                            {/* Bus & Anneau */}
                            <rect x="15" y="150" width="300" height="120" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                            <text x="60" y="172" fill="#fcd34d" fontWeight="bold" fontSize="11">Bus et anneau — héritage</text>
                            <line x1="35" y1="205" x2="250" y2="205" stroke="#94a3b8" strokeWidth="2" />
                            <rect x="45" y="198" width="16" height="14" rx="2" fill="#475569" /><rect x="93" y="198" width="16" height="14" rx="2" fill="#475569" />
                            <rect x="141" y="198" width="16" height="14" rx="2" fill="#475569" /><rect x="189" y="198" width="16" height="14" rx="2" fill="#475569" />
                            <rect x="237" y="198" width="16" height="14" rx="2" fill="#475569" />
                            <text x="35" y="233" fill="#fca5a5" fontSize="10">✕ une coupure = tout le segment</text>
                            <text x="35" y="251" fill="#94a3b8" fontSize="9">→ legacy industriel (RS-485, automates)</text>

                            {/* Arbre */}
                            <rect x="330" y="150" width="295" height="120" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
                            <text x="360" y="172" fill="#d8b4fe" fontWeight="bold" fontSize="11">Arbre — multi-étages</text>
                            <rect x="440" y="185" width="50" height="18" rx="3" fill="#7c3aed" /><text x="446" y="198" fill="white" fontSize="9">cœur</text>
                            <rect x="350" y="230" width="50" height="18" rx="3" fill="#0284c7" /><rect x="430" y="230" width="50" height="18" rx="3" fill="#0284c7" /><rect x="510" y="230" width="50" height="18" rx="3" fill="#0284c7" />
                            <line x1="465" y1="203" x2="375" y2="230" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="465" y1="203" x2="455" y2="230" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="465" y1="203" x2="535" y2="230" stroke="#94a3b8" strokeWidth="2" />
                            <text x="570" y="205" fill="#e2e8f0" fontSize="10">✔ étages par bâtiment</text>
                            <text x="570" y="223" fill="#e2e8f0" fontSize="10">✔ hiérarchie cœur/distri</text>
                            <text x="570" y="241" fill="#94a3b8" fontSize="9">→ design réel de toute PME</text>

                            <text x="15" y="285" fill="#94a3b8" fontSize="10">Contexte pro : bureau = étoile · entre bâtiments = arbre sur fibre · entre sites = maillé partiel (2 liens redondants).</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'topologie-duplex-mismatch') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">Génération SVG : Topologie Duplex Mismatch (Sujet 1.1)</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Description textuelle :</strong> un premier commutateur S1 (encadré bleu, réglé en full-duplex à 1 Gbit/s) est relié à un second commutateur S2 (encadré bleu, réglé en half-duplex à 1 Gbit/s). Le lien en faute est dessiné par un trait pointillé rouge ; la pastille rouge « CRC » marque les erreurs CRC et les collisions tardives générées sur ce lien.</p>
                        <svg viewBox="0 0 550 140" role="img" aria-label="Topologie duplex mismatch : S1 en full-duplex relié à S2 en half-duplex, erreurs CRC et collisions tardives sur le lien" className="w-full h-auto text-xs">
                            <rect x="40" y="40" width="120" height="40" rx="6" fill="#0284c7" />
                            <text x="55" y="64" fill="white" fontWeight="bold">Switch S1</text>
                            <text x="55" y="76" fill="#fbbf24" fontSize="10">Full-Duplex / 1Gbps</text>

                            <line x1="160" y1="60" x2="380" y2="60" stroke="#f43f5e" strokeWidth="3" strokeDasharray="6,6" />
                            <circle cx="270" cy="60" r="16" fill="#f43f5e" />
                            <text x="260" y="64" fill="white" fontWeight="bold" fontSize="11">CRC</text>
                            <text x="200" y="30" fill="#f43f5e" fontStyle="italic" fontSize="10">Mismatch : Erreurs CRC & Late Collisions</text>

                            <rect x="380" y="40" width="120" height="40" rx="6" fill="#0284c7" />
                            <text x="395" y="64" fill="white" fontWeight="bold">Switch S2</text>
                            <text x="395" y="76" fill="#fbbf24" fontSize="10">Half-Duplex / 1Gbps</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'comparaison-vm-conteneur') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">Génération SVG : Machine Virtuelle vs Conteneur (Sujet 1.2)</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Description textuelle :</strong> à gauche, une pile « machines virtuelles » : chaque VM embarque ses applications, ses bibliothèques et un système invité complet, posé sur l'hyperviseur de type 1, lui-mûme posé sur le matériel. Ç droite, l'équivalent « conteneurs » : chaque conteneur ne porte que l'application et ses bibliothèques et partage le noyau de l'hôte.</p>
                        <svg viewBox="0 0 550 180" role="img" aria-label="Comparaison machine virtuelle et conteneur : la VM embarque un système invité complet, le conteneur partage le noyau de l'hôte" className="w-full h-auto text-xs">
                            {/* Pile VM */}
                            <rect x="20" y="140" width="240" height="25" rx="3" fill="#334155" />
                            <text x="100" y="157" fill="white">Matériel (Bare Metal)</text>
                            <rect x="20" y="110" width="240" height="25" rx="3" fill="#0284c7" />
                            <text x="80" y="127" fill="white">Hyperviseur (Type 1)</text>
                            <rect x="25" y="40" width="65" height="65" rx="3" fill="#1e293b" stroke="#38bdf8" />
                            <text x="35" y="60" fill="#38bdf8" fontSize="10">App / Libs</text>
                            <text x="35" y="85" fill="#94a3b8" fontSize="10">OS Invité</text>
                            <rect x="105" y="40" width="65" height="65" rx="3" fill="#1e293b" stroke="#38bdf8" />
                            <text x="115" y="60" fill="#38bdf8" fontSize="10">App / Libs</text>
                            <text x="115" y="85" fill="#94a3b8" fontSize="10">OS Invité</text>
                            <rect x="185" y="40" width="65" height="65" rx="3" fill="#1e293b" stroke="#38bdf8" />
                            <text x="195" y="60" fill="#38bdf8" fontSize="10">App / Libs</text>
                            <text x="195" y="85" fill="#94a3b8" fontSize="10">OS Invité</text>
                            <text x="80" y="25" fill="#38bdf8" fontWeight="bold">Machines Virtuelles</text>

                            {/* Pile Conteneurs */}
                            <rect x="290" y="140" width="240" height="25" rx="3" fill="#334155" />
                            <text x="370" y="157" fill="white">Matériel</text>
                            <rect x="290" y="110" width="240" height="25" rx="3" fill="#475569" />
                            <text x="350" y="127" fill="white">OS Hôte (Noyau partagé)</text>
                            <rect x="290" y="80" width="240" height="25" rx="3" fill="#059669" />
                            <text x="340" y="97" fill="white">Moteur de Conteneurs</text>
                            <rect x="295" y="40" width="65" height="35" rx="3" fill="#064e3b" stroke="#34d399" />
                            <text x="305" y="62" fill="#34d399" fontSize="10">App / Libs</text>
                            <rect x="375" y="40" width="65" height="35" rx="3" fill="#064e3b" stroke="#34d399" />
                            <text x="385" y="62" fill="#34d399" fontSize="10">App / Libs</text>
                            <rect x="455" y="40" width="65" height="35" rx="3" fill="#064e3b" stroke="#34d399" />
                            <text x="465" y="62" fill="#34d399" fontSize="10">App / Libs</text>
                            <text x="360" y="25" fill="#34d399" fontWeight="bold">Conteneurs</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'decoupage-subnet-v4') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">Génération SVG : Découpage Sous-Réseau /26 (Sujet 1.3)</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Description textuelle :</strong> la barre du haut représente le réseau d'origine 192.168.10.0/24 (de .0 à .255). En dessous, quatre encadrés bleus représentent les sous-réseaux /26 découpés à partir de ce bloc : sous-réseau 1 de .0 à .63 (62 hôtes), sous-réseau 2 de .64 à .127 (62 hôtes), sous-réseau 3 de .128 à .191 (62 hôtes) et sous-réseau 4 de .192 à .255 (62 hôtes).</p>
                        <svg viewBox="0 0 550 140" role="img" aria-label="Découpage d'un /24 en sous-réseaux /26 avec plages d'adresses" className="w-full h-auto text-xs">
                            <rect x="20" y="20" width="510" height="30" rx="4" fill="#1e293b" stroke="#475569" />
                            <text x="180" y="40" fill="white" fontWeight="bold">Réseau d'Origine /24 : 192.168.10.0 à 192.168.10.255</text>

                            <rect x="20" y="65" width="120" height="50" rx="4" fill="#0369a1" />
                            <text x="30" y="85" fill="white" fontWeight="bold">Sous-réseau 1 (/26)</text>
                            <text x="30" y="102" fill="#93c5fd" fontSize="10">.0 à .63 (62 hôtes)</text>

                            <rect x="150" y="65" width="120" height="50" rx="4" fill="#0284c7" />
                            <text x="160" y="85" fill="white" fontWeight="bold">Sous-réseau 2 (/26)</text>
                            <text x="160" y="102" fill="#93c5fd" fontSize="10">.64 à .127 (62 hôtes)</text>

                            <rect x="280" y="65" width="120" height="50" rx="4" fill="#0369a1" />
                            <text x="290" y="85" fill="white" fontWeight="bold">Sous-réseau 3 (/26)</text>
                            <text x="290" y="102" fill="#93c5fd" fontSize="10">.128 à .191 (62 hôtes)</text>

                            <rect x="410" y="65" width="120" height="50" rx="4" fill="#0284c7" />
                            <text x="420" y="85" fill="white" fontWeight="bold">Sous-réseau 4 (/26)</text>
                            <text x="420" y="102" fill="#93c5fd" fontSize="10">.192 à .255 (62 hôtes)</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'transformation-eui64') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">Génération SVG : Dérivation EUI-64 IPv6 (Sujet 1.4)</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Description textuelle :</strong> à gauche, l'adresse MAC d'origine (encadré gris : 00:1A:2B:3C:4D:5E) ; une flèche bleue mène à l'encadré bleu où la valeur FF:FE est insérée au milieu des 48 bits (001A:2BFF:FE3C:4D5E) ; en dessous, l'encadré vert indique la dernière étape : l'inversion du 7e bit (U/L), qui donne l'identifiant final 021A:2BFF:FE3C:4D5E.</p>
                        <svg viewBox="0 0 550 140" role="img" aria-label="Étapes de calcul EUI-64 pour dériver une adresse IPv6 d'une adresse MAC" className="w-full h-auto text-xs">
                            <rect x="20" y="20" width="220" height="35" rx="4" fill="#334155" />
                            <text x="30" y="42" fill="white" className="font-mono">MAC: 00:1A:2B : 3C:4D:5E</text>

                            <path d="M 240 37 L 300 37" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

                            <rect x="310" y="20" width="220" height="35" rx="4" fill="#0369a1" />
                            <text x="320" y="42" fill="#fbbf24" className="font-mono font-bold">001A:2B FF:FE 3C:4D5E</text>

                            <rect x="150" y="80" width="260" height="40" rx="4" fill="#059669" />
                            <text x="160" y="98" fill="white" className="font-mono font-bold">Inversion du 7e bit (U/L) → 021A:2BFF:FE3C:4D5E</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'plan-canaux-wifi') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">Génération SVG : Plan de Canaux Wi-Fi 2,4 GHz (Sujet 1.5)</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Description textuelle :</strong> trois cercles colorés et voisins représentent trois bornes : AP 1 sur le canal 1 (bleu), AP 2 sur le canal 6 (vert) et AP 3 sur le canal 11 (violet). La légende en bas précise que ce sont trois canaux sans superposition en 2,4 GHz.</p>
                        <svg viewBox="0 0 550 140" role="img" aria-label="Plan de canaux Wi-Fi 2,4 GHz : canaux 1, 6 et 11 non superposés" className="w-full h-auto text-xs">
                            <circle cx="100" cy="70" r="50" fill="#0284c7" fillOpacity="0.4" stroke="#0284c7" strokeWidth="2" />
                            <text x="80" y="70" fill="white" fontWeight="bold">AP 1 (Canal 1)</text>

                            <circle cx="270" cy="70" r="50" fill="#059669" fillOpacity="0.4" stroke="#059669" strokeWidth="2" />
                            <text x="250" y="70" fill="white" fontWeight="bold">AP 2 (Canal 6)</text>

                            <circle cx="440" cy="70" r="50" fill="#7c3aed" fillOpacity="0.4" stroke="#7c3aed" strokeWidth="2" />
                            <text x="415" y="70" fill="white" fontWeight="bold">AP 3 (Canal 11)</text>

                            <text x="130" y="130" fill="#f59e0b" fontSize="10">Trois canaux sans superposition en 2,4 GHz</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'diagramme-decision-client') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">Génération SVG : Arbre de Dépannage Client (Sujet 1.6)</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Description textuelle :</strong> quatre boëtes enchaënées de gauche à droite : 1. Lien physique OK ?, 2. IP valide (pas 169.x.x.x) ?, 3. Ping passerelle ?, 4. Ping DNS ?. Sous chaque étape, une annotation rouge indique le chemin en cas d'échec : rebrancher ou associer le Wi-Fi ; échec DHCP (vérifier le relais) ; problème de routage ou de VLAN ; serveur DNS hors service.</p>
                        <svg viewBox="0 0 550 150" role="img" aria-label="Arbre de dépannage d'un client : côble et interface, puis adressage, puis service applicatif" className="w-full h-auto text-xs">
                            <rect x="20" y="20" width="110" height="35" rx="4" fill="#334155" />
                            <text x="30" y="42" fill="white">1. Lien Physique OK ?</text>

                            <line x1="130" y1="37" x2="160" y2="37" stroke="#38bdf8" strokeWidth="2" />
                            <rect x="160" y="20" width="110" height="35" rx="4" fill="#334155" />
                            <text x="170" y="42" fill="white">2. IP Valide (Pas 169..) ?</text>

                            <line x1="270" y1="37" x2="300" y2="37" stroke="#38bdf8" strokeWidth="2" />
                            <rect x="300" y="20" width="110" height="35" rx="4" fill="#334155" />
                            <text x="310" y="42" fill="white">3. Ping Passerelle ?</text>

                            <line x1="410" y1="37" x2="440" y2="37" stroke="#38bdf8" strokeWidth="2" />
                            <rect x="440" y="20" width="90" height="35" rx="4" fill="#334155" />
                            <text x="450" y="42" fill="white">4. Ping DNS ?</text>

                            <text x="20" y="85" fill="#f43f5e" fontSize="10">Non → Rebrancher / Associer Wi-Fi</text>
                            <text x="160" y="85" fill="#f43f5e" fontSize="10">Non → Échec DHCP (Vérifier relais)</text>
                            <text x="300" y="85" fill="#f43f5e" fontSize="10">Non → Problème Routage / VLAN</text>
                            <text x="440" y="85" fill="#f43f5e" fontSize="10">Non → Serveur DNS hors service</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'sequence-dora-dhcp') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-amber-400 mb-2">Génération SVG : Négociation DHCP D.O.R.A (Sujet 1.7)</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Description textuelle :</strong> dans l'ordre vertical : la demande Discover du client (message en diffusion), l'Offer du serveur, le Request du client et enfin l'Acknowledge du serveur ; le client obtient son bail après le quatrième message.</p>
                        <svg viewBox="0 0 500 180" role="img" aria-label="Échange DHCP en quatre messages : Discover, Offer, Request, Acknowledge (DORA)" className="w-full h-auto text-xs">
                            <line x1="100" y1="20" x2="100" y2="170" stroke="#475569" strokeWidth="2" />
                            <line x1="400" y1="20" x2="400" y2="170" stroke="#475569" strokeWidth="2" />
                            <text x="60" y="15" fill="#38bdf8" fontWeight="bold">Client DHCP</text>
                            <text x="360" y="15" fill="#4ade80" fontWeight="bold">Serveur / Relais DHCP</text>
                            <line x1="100" y1="40" x2="400" y2="65" stroke="#fbbf24" strokeWidth="2" />
                            <text x="170" y="50" fill="#fbbf24">1. DISCOVER (Broadcast)</text>
                            <line x1="400" y1="75" x2="100" y2="100" stroke="#38bdf8" strokeWidth="2" />
                            <text x="180" y="85" fill="#38bdf8">2. OFFER (Unicast)</text>
                            <line x1="100" y1="110" x2="400" y2="135" stroke="#fbbf24" strokeWidth="2" />
                            <text x="170" y="120" fill="#fbbf24">3. REQUEST (Broadcast)</text>
                            <line x1="400" y1="145" x2="100" y2="170" stroke="#4ade80" strokeWidth="2" />
                            <text x="180" y="155" fill="#4ade80">4. ACK (Unicast)</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'osi-tcpip') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-xs uppercase font-bold text-sky-400">Génération SVG : Modèle OSI vs TCP/IP</h4>
                            <span className="text-[10px] text-slate-400 font-mono">Figure 6.1</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Description textuelle :</strong> le schéma juxtapose à gauche le modèle OSI à 7 couches, à droite le modèle TCP/IP à 4 couches ; chaque couche TCP/IP couvre une ou plusieurs couches OSI ; les protocoles de chaque niveau sont listés à côté des cases.</p>
                        <svg viewBox="0 0 600 240" role="img" aria-label="Correspondance entre les 7 couches du modèle OSI et les 4 couches du modèle TCP/IP" className="w-full h-auto text-xs">
                            <g>
                                <text x="10" y="20" fill="#38bdf8" fontWeight="bold">Modèle OSI (7 Couches)</text>
                                <rect x="10" y="30" width="260" height="25" rx="4" fill="#0369a1" />
                                <text x="20" y="47" fill="white">7. Application (HTTP, DNS, SSH)</text>
                                <rect x="10" y="58" width="260" height="25" rx="4" fill="#0284c7" />
                                <text x="20" y="75" fill="white">6. Présentation (TLS, JPEG)</text>
                                <rect x="10" y="86" width="260" height="25" rx="4" fill="#38bdf8" />
                                <text x="20" y="103" fill="slate-900" fontWeight="bold">5. Session (NetBIOS, RPC)</text>
                                <rect x="10" y="114" width="260" height="25" rx="4" fill="#475569" />
                                <text x="20" y="131" fill="white">4. Transport (TCP, UDP)</text>
                                <rect x="10" y="142" width="260" height="25" rx="4" fill="#334155" />
                                <text x="20" y="159" fill="white">3. Réseau (IP, ICMP, ARP)</text>
                                <rect x="10" y="170" width="260" height="25" rx="4" fill="#1e293b" stroke="#475569" />
                                <text x="20" y="187" fill="white">2. Liaison (Ethernet, 802.1Q)</text>
                                <rect x="10" y="198" width="260" height="25" rx="4" fill="#0f172a" stroke="#334155" />
                                <text x="20" y="215" fill="white">1. Physique (Côblage, RJ45)</text>
                            </g>
                            <g>
                                <text x="330" y="20" fill="#f59e0b" fontWeight="bold">Modèle TCP/IP (4 Couches)</text>
                                <rect x="330" y="30" width="250" height="80" rx="4" fill="#d97706" />
                                <text x="340" y="75" fill="white" fontWeight="bold">1. Application (HTTP, DNS, SSH)</text>
                                <rect x="330" y="114" width="250" height="25" rx="4" fill="#475569" />
                                <text x="340" y="131" fill="white" fontWeight="bold">2. Transport (TCP, UDP)</text>
                                <rect x="330" y="142" width="250" height="25" rx="4" fill="#334155" />
                                <text x="340" y="159" fill="white" fontWeight="bold">3. Internet (IP, ICMP)</text>
                                <rect x="330" y="170" width="250" height="53" rx="4" fill="#1e293b" stroke="#f59e0b" />
                                <text x="340" y="200" fill="white" fontWeight="bold">4. Accès Réseau (Ethernet, Wi-Fi)</text>
                            </g>
                        </svg>
                    </div>
                );
            }

            if (type === 'active-directory') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-emerald-400 mb-2">Génération SVG : Structure Domaine & UO Active Directory</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Description textuelle :</strong> un encadré « domaine » regroupe des unités d'organisation (UO), chacune contenant des objets (utilisateurs, ordinateurs, groupes) ; ce découpage hiérarchique sert à organiser et déléguer l'administration du domaine.</p>
                        <svg viewBox="0 0 500 180" role="img" aria-label="Arborescence Active Directory : un domaine contenant des unités d'organisation et des objets" className="w-full h-auto text-xs">
                            <rect x="180" y="10" width="140" height="30" rx="6" fill="#059669" />
                            <text x="195" y="30" fill="white" fontWeight="bold">Domaine : corp.local</text>
                            <line x1="250" y1="40" x2="100" y2="70" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="250" y1="40" x2="250" y2="70" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="250" y1="40" x2="400" y2="70" stroke="#94a3b8" strokeWidth="2" />
                            <rect x="40" y="70" width="120" height="30" rx="4" fill="#0284c7" />
                            <text x="50" y="90" fill="white">OU_Utilisateurs</text>
                            <rect x="190" y="70" width="120" height="30" rx="4" fill="#0284c7" />
                            <text x="205" y="90" fill="white">OU_Ordinateurs</text>
                            <rect x="340" y="70" width="120" height="30" rx="4" fill="#0284c7" />
                            <text x="365" y="90" fill="white">OU_Serveurs</text>
                            <rect x="40" y="120" width="120" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" />
                            <text x="48" y="138" fill="#38bdf8">User: jdupont</text>
                            <text x="48" y="152" fill="#94a3b8" fontSize="10">GPO: SecuPostes</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'network-topology') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-purple-400 mb-2">Génération SVG : Topologie Inter-VLAN (Router-on-a-Stick)</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Description textuelle :</strong> deux commutateurs, chacun relié à des machines d'un VLAN différent (VLAN 10 et VLAN 20) ; un trunk unique (liaison transportant les deux VLAN) remonte vers une sous-interface du routeur qui route le trafic entre les VLAN.</p>
                        <svg viewBox="0 0 550 180" role="img" aria-label="Router-on-a-Stick : deux VLAN reliés au routeur par un trunk, sous-interfaces par VLAN" className="w-full h-auto text-xs">
                            <rect x="220" y="10" width="110" height="30" rx="6" fill="#7c3aed" />
                            <text x="235" y="30" fill="white" fontWeight="bold">Routeur R1</text>
                            <line x1="275" y1="40" x2="275" y2="80" stroke="#f59e0b" strokeWidth="3" />
                            <text x="285" y="65" fill="#f59e0b" fontWeight="bold">Trunk 802.1Q</text>
                            <rect x="220" y="80" width="110" height="30" rx="6" fill="#2563eb" />
                            <text x="240" y="100" fill="white" fontWeight="bold">Switch S1</text>
                            <line x1="240" y1="110" x2="120" y2="140" stroke="#38bdf8" strokeWidth="2" />
                            <line x1="310" y1="110" x2="430" y2="140" stroke="#4ade80" strokeWidth="2" />
                            <rect x="60" y="135" width="120" height="35" rx="4" fill="#0f172a" stroke="#38bdf8" />
                            <text x="70" y="152" fill="#38bdf8" fontWeight="bold">PC1 (VLAN 10)</text>
                            <rect x="370" y="135" width="120" height="35" rx="4" fill="#0f172a" stroke="#4ade80" />
                            <text x="380" y="152" fill="#4ade80" fontWeight="bold">PC2 (VLAN 20)</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'dhcp-exchange') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-amber-400 mb-2">Génération SVG : Négociation DHCP D.O.R.A</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Description textuelle :</strong> échange vertical entre le client (à gauche) et le serveur DHCP (à droite) : Discover en diffusion, Offer du serveur, Request du client, Acknowledge final qui attribue le bail et sa durée.</p>
                        <svg viewBox="0 0 500 180" role="img" aria-label="Chronologie DHCP : Discover, Offer, Request, Acknowledge entre client et serveur" className="w-full h-auto text-xs">
                            <line x1="100" y1="20" x2="100" y2="170" stroke="#475569" strokeWidth="2" />
                            <line x1="400" y1="20" x2="400" y2="170" stroke="#475569" strokeWidth="2" />
                            <text x="60" y="15" fill="#38bdf8" fontWeight="bold">Client DHCP</text>
                            <text x="360" y="15" fill="#4ade80" fontWeight="bold">Serveur DHCP</text>
                            <line x1="100" y1="40" x2="400" y2="65" stroke="#fbbf24" strokeWidth="2" />
                            <text x="170" y="50" fill="#fbbf24">1. DISCOVER (Broadcast)</text>
                            <line x1="400" y1="75" x2="100" y2="100" stroke="#38bdf8" strokeWidth="2" />
                            <text x="180" y="85" fill="#38bdf8">2. OFFER (Unicast)</text>
                            <line x1="100" y1="110" x2="400" y2="135" stroke="#fbbf24" strokeWidth="2" />
                            <text x="170" y="120" fill="#fbbf24">3. REQUEST (Broadcast)</text>
                            <line x1="400" y1="145" x2="100" y2="170" stroke="#4ade80" strokeWidth="2" />
                            <text x="180" y="155" fill="#4ade80">4. ACK (Unicast)</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'troubleshooting-tree') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">Génération SVG : Démarche de Diagnostic par Couches</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Description textuelle :</strong> une pyramide de couches, de la couche physique en bas à la couche application en haut, avec à chaque étage la question à se poser et le test associé ; la démarche consiste à remonter étage par étage jusqu'à trouver la couche en faute.</p>
                        <svg viewBox="0 0 500 140" role="img" aria-label="Pyramide de diagnostic couche par couche : de la couche physique (bas) vers la couche application (haut)" className="w-full h-auto text-xs">
                            <rect x="20" y="20" width="130" height="30" rx="4" fill="#334155" />
                            <text x="30" y="40" fill="white">1. Tester C1 (Physique)</text>
                            <line x1="150" y1="35" x2="180" y2="35" stroke="#38bdf8" strokeWidth="2" />
                            <rect x="180" y="20" width="140" height="30" rx="4" fill="#334155" />
                            <text x="190" y="40" fill="white">2. Tester C2 (Ping local/ARP)</text>
                            <line x1="320" y1="35" x2="350" y2="35" stroke="#38bdf8" strokeWidth="2" />
                            <rect x="350" y="20" width="130" height="30" rx="4" fill="#334155" />
                            <text x="360" y="40" fill="white">3. Tester C3 (Passerelle)</text>
                        </svg>
                    </div>
                );
            }

            // --- MAQUETTES D'INTERFACES PROFESSIONNELLES (réorientation pédagogique : GUI d'abord) ---
            if (type === 'vlan-segmentation') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : VLAN = domaines de diffusion séparés</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> SW1 porte deux VLAN ; un broadcast du VLAN 10 (flèches rouges) atteint uniquement les ports du VLAN 10. Le trunk 802.1Q transporte les deux VLAN tagués ; les trames du VLAN 20 (flèches bleues) n'atteignent jamais les PC du VLAN 10 sans passer par le routeur.</p>
                        <svg viewBox="0 0 560 220" role="img" aria-label="Deux VLAN isolés sur un switch avec trunk" className="w-full h-auto text-xs">
                            <rect x="40" y="60" width="120" height="110" rx="8" fill="#1e293b" stroke="#38bdf8" />
                            <text x="70" y="80" fill="#38bdf8" fontWeight="bold">SW1</text>
                            <rect x="60" y="95" width="80" height="22" rx="3" fill="#dc2626" />
                            <text x="66" y="110" fill="white" fontSize="10">Fa0/1 · VLAN 10</text>
                            <rect x="60" y="125" width="80" height="22" rx="3" fill="#2563eb" />
                            <text x="66" y="140" fill="white" fontSize="10">Fa0/2 · VLAN 20</text>
                            <rect x="52" y="160" width="96" height="4" fill="#f59e0b" />
                            <text x="62" y="180" fill="#f59e0b" fontSize="9">trunk Gi0/1</text>
                            <rect x="260" y="60" width="120" height="110" rx="8" fill="#1e293b" stroke="#38bdf8" />
                            <text x="290" y="80" fill="#38bdf8" fontWeight="bold">SW2</text>
                            <rect x="280" y="95" width="80" height="22" rx="3" fill="#dc2626" />
                            <text x="286" y="110" fill="white" fontSize="10">Fa0/1 · VLAN 10</text>
                            <rect x="380" y="95" width="90" height="22" rx="3" fill="#64748b" />
                            <text x="386" y="110" fill="white" fontSize="10">Gi0/1 · trunk</text>
                            <line x1="148" y1="162" x2="380" y2="106" stroke="#f59e0b" strokeWidth="3" />
                            <text x="205" y="150" fill="#f59e0b" fontSize="9">tag 802.1Q</text>
                            <rect x="30" y="200" width="20" height="14" rx="2" fill="#dc2626" />
                            <text x="55" y="212" fill="white" fontSize="10">PC-RH (VLAN 10)</text>
                            <rect x="170" y="200" width="20" height="14" rx="2" fill="#2563eb" />
                            <text x="195" y="212" fill="white" fontSize="10">PC-IT (VLAN 20)</text>
                            <path d="M65 105 Q100 40 70 95" stroke="#dc2626" strokeWidth="2" fill="none" markerEnd="url(#ar)" />
                            <text x="120" y="45" fill="#dc2626" fontSize="10">broadcast VLAN 10 : reste dans VLAN 10</text>
                            <path d="M100 135 Q140 185 105 140" stroke="#2563eb" strokeWidth="2" fill="none" />
                            <text x="150" y="185" fill="#93c5fd" fontSize="10">broadcast VLAN 20 : jamais vu du VLAN 10</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'stp-election') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : élection STP et rôles de ports</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> SW1 (priorité 24576) est pont racine ; ses ports sont tous designated. SW3 a deux chemins vers la racine : coût 4 direct (root port) et coût 8 via SW2 (port bloqué/alternatif). Le triangle reste sans boucle.</p>
                        <svg viewBox="0 0 520 200" role="img" aria-label="Triangle STP avec pont racine et port bloqué" className="w-full h-auto text-xs">
                            <rect x="200" y="20" width="120" height="46" rx="8" fill="#059669" />
                            <text x="220" y="40" fill="white" fontWeight="bold">SW1 — RACINE</text>
                            <text x="228" y="58" fill="#a7f3d0" fontSize="10">priorité 24576 · ports : FWD</text>
                            <rect x="30" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#38bdf8" />
                            <text x="52" y="150" fill="white" fontWeight="bold">SW2</text>
                            <text x="40" y="168" fill="#93c5fd" fontSize="10">root port → SW1</text>
                            <rect x="380" y="130" width="110" height="46" rx="8" fill="#1e293b" stroke="#38bdf8" />
                            <text x="402" y="150" fill="white" fontWeight="bold">SW3</text>
                            <text x="390" y="168" fill="#93c5fd" fontSize="10">root port → SW1</text>
                            <line x1="230" y1="66" x2="85" y2="130" stroke="#22c55e" strokeWidth="3" />
                            <text x="100" y="95" fill="#22c55e" fontSize="10">coût 4 (1 Gbps)</text>
                            <line x1="290" y1="66" x2="435" y2="130" stroke="#22c55e" strokeWidth="3" />
                            <text x="360" y="95" fill="#22c55e" fontSize="10">coût 4 (1 Gbps)</text>
                            <line x1="140" y1="153" x2="380" y2="153" stroke="#ef4444" strokeWidth="3" strokeDasharray="8 6" />
                            <text x="185" y="141" fill="#ef4444" fontSize="10">secours : port blocking (ALTN) sur SW3</text>
                            <text x="150" y="196" fill="#94a3b8" fontSize="10">Élection : priorité la plus BASSE gagne, puis MAC la plus basse · root port = meilleur coût vers la racine</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'etherchannel-lacp') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : EtherChannel LACP — deux liens, un canal logique</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> Gi0/1 et Gi0/2 négocient via LACP (mode active des deux côtés) et forment l'interface logique Po1. STP ne voit qu'un seul lien de 2 Gbps : plus de port bloqué, la charge se répartit par flux.</p>
                        <svg viewBox="0 0 520 180" role="img" aria-label="EtherChannel agrégant deux liens entre deux commutateurs" className="w-full h-auto text-xs">
                            <rect x="30" y="50" width="120" height="80" rx="8" fill="#1e293b" stroke="#38bdf8" />
                            <text x="60" y="95" fill="#38bdf8" fontWeight="bold">SW1</text>
                            <rect x="370" y="50" width="120" height="80" rx="8" fill="#1e293b" stroke="#38bdf8" />
                            <text x="400" y="95" fill="#38bdf8" fontWeight="bold">SW2</text>
                            <line x1="150" y1="70" x2="370" y2="70" stroke="#22c55e" strokeWidth="3" />
                            <line x1="150" y1="110" x2="370" y2="110" stroke="#22c55e" strokeWidth="3" />
                            <rect x="210" y="40" width="100" height="100" rx="10" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 4" />
                            <text x="222" y="36" fill="#f59e0b" fontWeight="bold">Port-Channel Po1</text>
                            <text x="205" y="160" fill="#94a3b8" fontSize="10">2 × 1 Gbps = 2 Gbps · LACP active ⇄ active · mûmes VLAN autorisés obligatoires</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'ospf-zones') {
                return (
                    <div className="w-full bg-slate-900 text-white p-5 rounded-xl border border-slate-700 shadow-xl overflow-x-auto">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs uppercase font-extrabold tracking-wider text-sky-400">Réseaux &amp; Routage · OSPF Multi-zones</h4>
                            <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">RFC 2328</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-3 leading-relaxed"><strong className="text-amber-300">Lecture :</strong> chaque zone a sa LSDB (carte locale) ; les zones se raccordent à la zone 0 via un ABR. Sur un segment Ethernet, un DR et un BDR sont élus : les autres routeurs restent en 2-Way avec eux.</p>
                        <svg viewBox="0 0 640 260" role="img" aria-label="Domaine OSPF multi-zones avec ABR et DR" className="w-full h-auto font-sans">
                            <defs>
                                <marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                                </marker>
                            </defs>
                            {/* Zone 0 (backbone) */}
                            <rect x="180" y="30" width="280" height="60" rx="8" fill="#059669" opacity="0.9" />
                            <text x="230" y="55" fill="white" fontWeight="bold" fontSize="12">Zone 0 (backbone)</text>
                            <text x="225" y="75" fill="#a7f3d0" fontSize="10">R1 ⇄ R2 · DR élu sur le segment</text>

                            {/* Zone 1 */}
                            <rect x="40" y="120" width="190" height="55" rx="8" fill="#0284c7" />
                            <text x="80" y="145" fill="white" fontWeight="bold" fontSize="11">Zone 1 (site Lyon)</text>
                            <text x="60" y="165" fill="#bae6fd" fontSize="10">LSDB locale de la zone 1</text>

                            {/* Zone 2 */}
                            <rect x="410" y="120" width="190" height="55" rx="8" fill="#7c3aed" />
                            <text x="445" y="145" fill="white" fontWeight="bold" fontSize="11">Zone 2 (site Lille)</text>
                            <text x="430" y="165" fill="#ddd6fe" fontSize="10">LSDB locale de la zone 2</text>

                            {/* Liens */}
                            <line x1="250" y1="90" x2="135" y2="120" stroke="#94a3b8" strokeWidth="2.5" />
                            <line x1="390" y1="90" x2="505" y2="120" stroke="#94a3b8" strokeWidth="2.5" />

                            {/* ABR */}
                            <rect x="120" y="92" width="40" height="25" rx="4" fill="#f59e0b" />
                            <text x="125" y="109" fill="white" fontSize="10" fontWeight="bold">ABR</text>
                            <rect x="480" y="92" width="40" height="25" rx="4" fill="#f59e0b" />
                            <text x="485" y="109" fill="white" fontSize="10" fontWeight="bold">ABR</text>

                            {/* Note de bas */}
                            <rect x="20" y="200" width="600" height="45" rx="6" fill="#1e293b" stroke="#475569" />
                            <text x="32" y="220" fill="#94a3b8" fontSize="10">Les LSA ne franchissent pas les zones : une panne locale ne recalcule pas tout le domaine (SPF par zone).</text>
                            <text x="32" y="238" fill="#94a3b8" fontSize="10">Contexte pro : OSPF est le protocole de routage interne standard. La zone 0 est obligatoire dans tout design OSPF.</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'nat-flow') {
                return (
                    <div className="w-full bg-slate-900 text-white p-5 rounded-xl border border-slate-700 shadow-xl overflow-x-auto">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs uppercase font-extrabold tracking-wider text-sky-400">Réseaux &amp; Internet · Flux NAT (PAT)</h4>
                            <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">RFC 3022</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-3 leading-relaxed"><strong className="text-amber-300">Lecture :</strong> à l'aller le routeur réécrit la source (10.1.1.10:1025 → 203.0.113.5:49213) et note la correspondance ; au retour il restaure la destination. L'IP publique est partagée par TOUS les postes, différenciés par les ports.</p>
                        <svg viewBox="0 0 640 260" role="img" aria-label="Traduction NAT aller et retour" className="w-full h-auto font-sans">
                            <defs>
                                <marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#22c55e" />
                                </marker>
                            </defs>
                            {/* PC interne */}
                            <rect x="20" y="60" width="140" height="60" rx="6" fill="#0284c7" />
                            <text x="40" y="85" fill="white" fontWeight="bold" fontSize="11">PC interne</text>
                            <text x="35" y="105" fill="#bae6fd" fontSize="10">10.1.1.10:1025</text>

                            {/* Routeur NAT */}
                            <rect x="230" y="45" width="180" height="90" rx="8" fill="#059669" />
                            <text x="250" y="70" fill="white" fontWeight="bold" fontSize="11">Routeur NAT</text>
                            <text x="243" y="90" fill="#a7f3d0" fontSize="10">table de traduction :</text>
                            <text x="243" y="106" fill="#a7f3d0" fontSize="10">10.1.1.10:1025 ⇄</text>
                            <text x="243" y="122" fill="#a7f3d0" fontSize="10">203.0.113.5:49213</text>

                            {/* Serveur Internet */}
                            <rect x="480" y="60" width="140" height="60" rx="6" fill="#7c3aed" />
                            <text x="505" y="85" fill="white" fontWeight="bold" fontSize="11">Serveur Internet</text>
                            <text x="500" y="105" fill="#ddd6fe" fontSize="10">198.51.100.80:443</text>

                            {/* Aller */}
                            <line x1="160" y1="80" x2="230" y2="80" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <line x1="410" y1="80" x2="480" y2="80" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <text x="170" y="70" fill="#22c55e" fontSize="10" fontWeight="bold">source réécrite →</text>
                            <text x="415" y="70" fill="#22c55e" fontSize="10" fontWeight="bold">203.0.113.5:49213 →</text>

                            {/* Retour */}
                            <line x1="480" y1="120" x2="410" y2="120" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <line x1="230" y1="120" x2="160" y2="120" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <text x="250" y="140" fill="#f59e0b" fontSize="10" fontWeight="bold">retour : destination restaurée via la table</text>

                            {/* Note de bas */}
                            <rect x="20" y="180" width="600" height="60" rx="6" fill="#1e293b" stroke="#475569" />
                            <text x="32" y="200" fill="#94a3b8" fontSize="10">Un paquet ENTRANT sans entrée dans la table est détruit — d'où l'isolation naturelle du réseau interne.</text>
                            <text x="32" y="218" fill="#94a3b8" fontSize="10">Contexte pro : le NAT masque l'architecture interne et permet de partager une seule IP publique entre tous les postes.</text>
                            <text x="32" y="236" fill="#94a3b8" fontSize="10">Vérification : show ip nat translations · show ip nat statistics · clear ip nat translation * (pour vider la table).</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'acl-evaluation') {
                return (
                    <div className="w-full bg-slate-900 text-white p-5 rounded-xl border border-slate-700 shadow-xl overflow-x-auto">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs uppercase font-extrabold tracking-wider text-sky-400">Réseaux &amp; Sécurité · Évaluation d'une ACL</h4>
                            <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">Cisco IOS</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-3 leading-relaxed"><strong className="text-amber-300">Lecture :</strong> chaque paquet descend la liste ; la première ligne qui matche tranche (permit ou deny) et le reste est ignoré. Si rien ne matche : le deny any IMPLICITE rejette tout.</p>
                        <svg viewBox="0 0 640 260" role="img" aria-label="Évaluation séquentielle d'une ACL" className="w-full h-auto font-sans">
                            <defs>
                                <marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#94a3b8" />
                                </marker>
                            </defs>
                            {/* Paquet */}
                            <rect x="20" y="100" width="100" height="40" rx="6" fill="#0284c7" />
                            <text x="35" y="125" fill="white" fontWeight="bold" fontSize="11">Paquet</text>

                            {/* Règles ACL */}
                            <rect x="170" y="20" width="260" height="30" rx="5" fill="#059669" />
                            <text x="180" y="40" fill="white" fontSize="10">1. permit tcp … eq 443 → ✓ passe</text>

                            <rect x="170" y="60" width="260" height="30" rx="5" fill="#dc2626" />
                            <text x="180" y="80" fill="white" fontSize="10">2. deny ip … → ✕ rejeté</text>

                            <rect x="170" y="100" width="260" height="30" rx="5" fill="#475569" />
                            <text x="180" y="120" fill="white" fontSize="10">3. permit ip any → ✓ passe</text>

                            <rect x="170" y="140" width="260" height="30" rx="5" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
                            <text x="180" y="160" fill="#fca5a5" fontSize="10">implicite : deny any → ✕ rejeté</text>

                            {/* Liens */}
                            <line x1="120" y1="120" x2="165" y2="35" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="120" y1="120" x2="165" y2="75" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="120" y1="120" x2="165" y2="115" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="120" y1="120" x2="165" y2="155" stroke="#94a3b8" strokeWidth="2" />

                            {/* Note de droite */}
                            <rect x="460" y="40" width="160" height="160" rx="6" fill="#1e293b" stroke="#475569" />
                            <text x="472" y="62" fill="#94a3b8" fontSize="10" fontWeight="bold">Règles d'or :</text>
                            <text x="472" y="84" fill="#94a3b8" fontSize="10">• stop au 1er match</text>
                            <text x="472" y="104" fill="#94a3b8" fontSize="10">• l'ordre est une</text>
                            <text x="472" y="118" fill="#94a3b8" fontSize="10">  décision d'archi</text>
                            <text x="472" y="138" fill="#94a3b8" fontSize="10">• une ligne large</text>
                            <text x="472" y="152" fill="#94a3b8" fontSize="10">  en tête masque</text>
                            <text x="472" y="166" fill="#94a3b8" fontSize="10">  tout ce qui suit</text>

                            {/* Note de bas */}
                            <rect x="20" y="200" width="600" height="45" rx="6" fill="#1e293b" stroke="#475569" />
                            <text x="32" y="220" fill="#94a3b8" fontSize="10">Contexte pro : une ACL « permit seulement » coupe tout le reste. Toujours ajouter un deny explicite pour la lisibilité (show access-lists).</text>
                            <text x="32" y="238" fill="#94a3b8" fontSize="10">Vérification : show ip access-lists · debug ip packet (à éviter en prod) · show ip interface (quelle ACL appliquée ?).</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'ipv6-slaac') {
                return (
                    <div className="w-full bg-slate-900 text-white p-5 rounded-xl border border-slate-700 shadow-xl overflow-x-auto">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs uppercase font-extrabold tracking-wider text-sky-400">Réseaux &amp; IPv6 · SLAAC (Autoconfiguration)</h4>
                            <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">RFC 4862</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-3 leading-relaxed"><strong className="text-amber-300">Lecture :</strong> le routeur diffuse le préfixe (RA multicast ff02::1) ; l'hôte colle son identifiant EUI-64 (dérivé de la MAC) puis vérifie l'unicité (DAD) avant d'utiliser l'adresse. Sans Router Advertisement : aucune adresse globale.</p>
                        <svg viewBox="0 0 640 260" role="img" aria-label="Séquence SLAAC : RA, EUI-64, DAD" className="w-full h-auto font-sans">
                            <defs>
                                <marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#22c55e" />
                                </marker>
                            </defs>
                            {/* Routeur */}
                            <rect x="20" y="70" width="150" height="60" rx="8" fill="#059669" />
                            <text x="40" y="95" fill="white" fontWeight="bold" fontSize="11">Routeur</text>
                            <text x="32" y="115" fill="#a7f3d0" fontSize="10">RA : 2001:db8:1::/64</text>

                            {/* Hôte */}
                            <rect x="470" y="70" width="150" height="60" rx="8" fill="#0284c7" />
                            <text x="490" y="95" fill="white" fontWeight="bold" fontSize="11">Hôte</text>
                            <text x="485" y="115" fill="#bae6fd" fontSize="10">MAC 00:1A:2B:3C:4D:5E</text>

                            {/* Flux 1 : RA */}
                            <line x1="170" y1="85" x2="470" y2="85" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <text x="220" y="78" fill="#22c55e" fontSize="10" fontWeight="bold">1. RA (multicast ff02::1) — préfixe /64</text>

                            {/* Étape 2 : EUI-64 */}
                            <rect x="180" y="105" width="280" height="55" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                            <text x="192" y="125" fill="#fbbf24" fontSize="10" fontWeight="bold">2. EUI-64 : insère FFFE + bit inversé</text>
                            <text x="192" y="143" fill="#fbbf24" fontSize="10">→ 2001:db8:1::021A:2BFF:FE3C:4D5E</text>

                            {/* Étape 3 : DAD */}
                            <rect x="180" y="175" width="280" height="30" rx="5" fill="#7c3aed" />
                            <text x="192" y="194" fill="white" fontSize="10" fontWeight="bold">3. DAD : Neighbor Solicitation → adresse unique ?</text>

                            {/* Note de bas */}
                            <rect x="20" y="225" width="600" height="25" rx="6" fill="#1e293b" stroke="#475569" />
                            <text x="32" y="242" fill="#94a3b8" fontSize="10">Sans Router Advertisement : aucune adresse globale. Contexte pro : SLAAC est le mode par défaut d'Internet IPv6.</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'arp-resolution') {
                return (
                    <div className="w-full bg-slate-900 text-white p-5 rounded-xl border border-slate-700 shadow-xl overflow-x-auto">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs uppercase font-extrabold tracking-wider text-sky-400">Réseaux &amp; Protocoles · Résolution ARP</h4>
                            <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">RFC 826</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-3 leading-relaxed"><strong className="text-amber-300">Lecture :</strong> la requête ARP est une DIFFUSION : tout le segment la traite ; seul le propriétaire de l'IP répond (unicast) ; le demandeur met la réponse en cache. Le routeur ne transmet jamais l'ARP au-delà du segment.</p>
                        <svg viewBox="0 0 640 260" role="img" aria-label="Résolution ARP : diffusion puis réponse" className="w-full h-auto font-sans">
                            <defs>
                                <marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
                                </marker>
                            </defs>
                            {/* Postes */}
                            <rect x="20" y="40" width="130" height="45" rx="6" fill="#0284c7" />
                            <text x="35" y="60" fill="white" fontWeight="bold" fontSize="11">PC-A</text>
                            <text x="30" y="78" fill="#bae6fd" fontSize="10">10.1.1.20</text>

                            <rect x="180" y="40" width="130" height="45" rx="6" fill="#475569" />
                            <text x="195" y="60" fill="white" fontWeight="bold" fontSize="11">PC-B</text>
                            <text x="190" y="78" fill="#cbd5e1" fontSize="10">10.1.1.21</text>

                            <rect x="340" y="40" width="130" height="45" rx="6" fill="#dc2626" />
                            <text x="355" y="60" fill="white" fontWeight="bold" fontSize="11">PC-C (cible)</text>
                            <text x="350" y="78" fill="#fecaca" fontSize="10">10.1.1.30</text>

                            {/* Diffusion */}
                            <line x1="150" y1="55" x2="340" y2="55" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <text x="160" y="45" fill="#f59e0b" fontSize="10" fontWeight="bold">1. « Qui a 10.1.1.30 ? » — DIFFUSION (broadcast)</text>

                            {/* Réponse unicast */}
                            <line x1="340" y1="75" x2="155" y2="75" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <text x="170" y="95" fill="#22c55e" fontSize="10" fontWeight="bold">2. Réponse unicast : 10.1.1.30 = MAC 00-1C-…-C3</text>

                            {/* Cache ARP */}
                            <rect x="130" y="115" width="320" height="45" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="145" y="137" fill="#93c5fd" fontSize="10" fontWeight="bold">3. Cache ARP de PC-A (arp -a) :</text>
                            <text x="145" y="153" fill="#93c5fd" fontSize="10">10.1.1.30 → 00-1C-xx-xx-C3 (dynamique)</text>

                            {/* Note de bas */}
                            <rect x="20" y="185" width="600" height="55" rx="6" fill="#1e293b" stroke="#475569" />
                            <text x="32" y="207" fill="#94a3b8" fontSize="10">Sans réponse : pas de MAC → pas de trame → « destination unreachable » au niveau local.</text>
                            <text x="32" y="227" fill="#94a3b8" fontSize="10">Contexte pro : le routeur ne transmet jamais l'ARP au-delà du segment. Chaque VLAN a son propre domaine de diffusion.</text>
                            <text x="32" y="247" fill="#94a3b8" fontSize="10">Commande : arp -a (Windows) / ip neigh (Linux) pour vider le cache : arp -d * (Windows) / ip neigh flush all (Linux).</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'dns-resolution') {
                return (
                    <div className="w-full bg-slate-900 text-white p-5 rounded-xl border border-slate-700 shadow-xl overflow-x-auto">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs uppercase font-extrabold tracking-wider text-sky-400">Réseaux &amp; DNS · Résolution DNS Complète</h4>
                            <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">RFC 1034/1035</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-3 leading-relaxed"><strong className="text-amber-300">Lecture :</strong> le client interroge son résolveur ; si le nom n'est pas en cache, le résolveur descend la hiérarchie (racine → .fr → autoritaire) et met la réponse en cache. Ping IP OK + nom KO = problème dans CETTE chaîne.</p>
                        <svg viewBox="0 0 640 260" role="img" aria-label="Chaîne de résolution DNS" className="w-full h-auto font-sans">
                            <defs>
                                <marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#22c55e" />
                                </marker>
                            </defs>
                            {/* Client */}
                            <rect x="20" y="70" width="120" height="50" rx="6" fill="#0284c7" />
                            <text x="35" y="92" fill="white" fontWeight="bold" fontSize="11">Client</text>
                            <text x="30" y="110" fill="#bae6fd" fontSize="10">www.entreprise.fr</text>

                            {/* Résolveur */}
                            <rect x="180" y="70" width="120" height="50" rx="6" fill="#059669" />
                            <text x="192" y="92" fill="white" fontWeight="bold" fontSize="11">Résolveur</text>
                            <text x="188" y="110" fill="#a7f3d0" fontSize="10">cache ? → sinon</text>

                            {/* Racine */}
                            <rect x="340" y="20" width="130" height="40" rx="6" fill="#7c3aed" />
                            <text x="360" y="45" fill="white" fontSize="10" fontWeight="bold">Racine « . »</text>

                            {/* TLD */}
                            <rect x="340" y="75" width="130" height="40" rx="6" fill="#7c3aed" />
                            <text x="358" y="100" fill="white" fontSize="10" fontWeight="bold">TLD .fr</text>

                            {/* Autoritaire */}
                            <rect x="500" y="75" width="120" height="40" rx="6" fill="#dc2626" />
                            <text x="512" y="100" fill="white" fontSize="10" fontWeight="bold">Autoritaire</text>

                            {/* Liens */}
                            <line x1="140" y1="95" x2="180" y2="95" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <line x1="300" y1="85" x2="340" y2="40" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="300" y1="95" x2="340" y2="95" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="470" y1="95" x2="500" y2="95" stroke="#94a3b8" strokeWidth="2" />

                            {/* Réponse */}
                            <text x="200" y="145" fill="#fbbf24" fontSize="10" fontWeight="bold">4. réponse : A 192.0.2.10 — mise en cache pour le TTL</text>

                            {/* Note de bas */}
                            <rect x="20" y="180" width="600" height="60" rx="6" fill="#1e293b" stroke="#475569" />
                            <text x="32" y="200" fill="#94a3b8" fontSize="10">En interne, c'est le serveur DNS du domaine qui joue le résolveur : enregistrements A, AAAA, MX, NS, CNAME.</text>
                            <text x="32" y="218" fill="#94a3b8" fontSize="10">Contexte pro : chaque accès (intranet, AD, imprimante, Outlook, Internet) passe par le DNS. DNS mort = « plus rien ne marche ».</text>
                            <text x="32" y="236" fill="#94a3b8" fontSize="10">Vérification : nslookup, dig, ipconfig /all, ipconfig /flushdns, ipconfig /displaydns.</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'gpo-lsdou') {
                return (
                    <div className="w-full bg-slate-900 text-white p-5 rounded-xl border border-slate-700 shadow-xl overflow-x-auto">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs uppercase font-extrabold tracking-wider text-sky-400">Active Directory · GPO &amp; Stratégies d'Application</h4>
                            <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">LSDOU</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-3 leading-relaxed"><strong className="text-amber-300">Lecture :</strong> les stratégies s'appliquent du général au spécifique. En cas de conflit, la plus proche de l'utilisateur (l'OU) écrase les précédentes. La dernière appliquée gagne toujours.</p>
                        <svg viewBox="0 0 640 280" role="img" aria-label="Ordre LSDOU des GPO" className="w-full h-auto font-sans">
                            <defs>
                                <marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
                                </marker>
                            </defs>
                            {/* Étages LSDOU */}
                            <rect x="20" y="20" width="280" height="38" rx="6" fill="#475569" />
                            <text x="35" y="44" fill="white" fontWeight="bold" fontSize="11">L — Local (stratégie de la machine)</text>

                            <rect x="20" y="65" width="280" height="38" rx="6" fill="#7c3aed" />
                            <text x="35" y="89" fill="white" fontWeight="bold" fontSize="11">S — Site (AD Sites and Services)</text>

                            <rect x="20" y="110" width="280" height="38" rx="6" fill="#0284c7" />
                            <text x="35" y="134" fill="white" fontWeight="bold" fontSize="11">D — Domaine (entreprise.local)</text>

                            <rect x="20" y="155" width="280" height="38" rx="6" fill="#059669" />
                            <text x="35" y="179" fill="white" fontWeight="bold" fontSize="11">OU — ex : OU=RH (la plus spécifique)</text>

                            <line x1="300" y1="39" x2="300" y2="174" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#ar)" />
                            <text x="312" y="80" fill="#fbbf24" fontSize="10" fontWeight="bold">Ordre d'application ↓</text>
                            <text x="312" y="130" fill="#fbbf24" fontSize="10" fontWeight="bold">Conflit : l'OU gagne</text>

                            {/* Panneau de droite : commandes */}
                            <rect x="360" y="40" width="260" height="110" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="375" y="65" fill="#93c5fd" fontWeight="bold" fontSize="11">Vérifier côté poste :</text>
                            <text x="375" y="88" fill="#93c5fd" fontSize="10">gpupdate /force → applique</text>
                            <text x="375" y="108" fill="#93c5fd" fontSize="10">gpresult /R → liste les GPO</text>
                            <text x="375" y="128" fill="#93c5fd" fontSize="10">appliquées ET filtrées</text>

                            {/* Note de bas */}
                            <rect x="20" y="210" width="600" height="55" rx="6" fill="#1e293b" stroke="#475569" />
                            <text x="32" y="232" fill="#94a3b8" fontSize="10">Exceptions : héritage bloqué, Enforced, filtrage WMI modifient ce flux — gpresult montre la raison exacte.</text>
                            <text x="32" y="252" fill="#94a3b8" fontSize="10">Contexte pro : chaque paramètre de sécurité (pare-feu, mot de passe, cartes réseau) passe par GPO. LSDOU = la règle d'or.</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'kerberos-flow') {
                return (
                    <div className="w-full bg-slate-900 text-white p-5 rounded-xl border border-slate-700 shadow-xl overflow-x-auto">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs uppercase font-extrabold tracking-wider text-sky-400">Active Directory · Flux Kerberos (TGT / TGS)</h4>
                            <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">RFC 4120</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-3 leading-relaxed"><strong className="text-amber-300">Lecture :</strong> à l'ouverture de session, le KDC (DC) délivre un TGT ; ensuite chaque service reçoit un ticket de service (TGS) du TGT. Le mot de passe ne circule JAMAIS vers les services.</p>
                        <svg viewBox="0 0 640 260" role="img" aria-label="Flux Kerberos : TGT puis TGS" className="w-full h-auto font-sans">
                            <defs>
                                <marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                                </marker>
                            </defs>
                            {/* Client */}
                            <rect x="20" y="70" width="140" height="55" rx="6" fill="#0284c7" />
                            <text x="40" y="92" fill="white" fontWeight="bold" fontSize="11">Client</text>
                            <text x="35" y="112" fill="#bae6fd" fontSize="10">claire.martin</text>

                            {/* KDC */}
                            <rect x="240" y="60" width="160" height="75" rx="8" fill="#059669" />
                            <text x="260" y="85" fill="white" fontWeight="bold" fontSize="11">KDC (DC)</text>
                            <text x="253" y="105" fill="#a7f3d0" fontSize="10">1. AS : délivre TGT</text>
                            <text x="253" y="122" fill="#a7f3d0" fontSize="10">2. TGS : ticket service</text>

                            {/* Service */}
                            <rect x="480" y="70" width="140" height="55" rx="6" fill="#7c3aed" />
                            <text x="500" y="92" fill="white" fontWeight="bold" fontSize="11">Service</text>
                            <text x="497" y="112" fill="#ddd6fe" fontSize="10">SRV-FILE01</text>

                            {/* Flux */}
                            <line x1="160" y1="85" x2="240" y2="85" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <text x="170" y="78" fill="#22c55e" fontSize="10" fontWeight="bold">1. ouverture de session</text>

                            <line x1="240" y1="115" x2="160" y2="115" stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <text x="150" y="135" fill="#fbbf24" fontSize="10" fontWeight="bold">← TGT (valable ~10 h)</text>

                            <line x1="400" y1="95" x2="480" y2="95" stroke="#fbbf24" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <text x="405" y="85" fill="#fbbf24" fontSize="10" fontWeight="bold">TGS →</text>

                            {/* Note de bas */}
                            <rect x="20" y="180" width="600" height="60" rx="6" fill="#1e293b" stroke="#475569" />
                            <text x="32" y="200" fill="#94a3b8" fontSize="10">klist : voir les tickets · klist purge : les effacer · erreur « horloge » = écart &gt; 5 min client/DC.</text>
                            <text x="32" y="218" fill="#94a3b8" fontSize="10">Contexte pro : chaque ouverture de session, chaque partage, chaque Outlook passe par Kerberos. Un ticket expiré = rejet.</text>
                            <text x="32" y="236" fill="#94a3b8" fontSize="10">Vérification : klist, w32tm /resync (réaligner l'heure), gpresult /R (voir les GPO appliquées).</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'raid-niveaux') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : RAID 0 / 1 / 5 / 10 — les quatre architectures à connaëtre</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> chaque mini-graphe montre comment les données se répartissent sur les disques. RAID 0 = vitesse sans redondance ; RAID 1 = miroir ; RAID 5 = parité répartie (tolère 1 panne) ; RAID 10 = miroirs en bande (vitesse + tolérance).</p>
                        <svg viewBox="0 0 560 210" role="img" aria-label="Quatre niveaux de RAID" className="w-full h-auto text-xs">
                            <rect x="15" y="15" width="125" height="90" rx="6" fill="#1e293b" stroke="#dc2626" />
                            <text x="25" y="35" fill="#fca5a5" fontWeight="bold">RAID 0 — striping</text>
                            <rect x="25" y="45" width="50" height="40" rx="3" fill="#334155" /><text x="35" y="60" fill="white" fontSize="9">A</text><text x="35" y="75" fill="white" fontSize="9">C</text>
                            <rect x="80" y="45" width="50" height="40" rx="3" fill="#334155" /><text x="90" y="60" fill="white" fontSize="9">B</text><text x="90" y="75" fill="white" fontSize="9">D</text>
                            <text x="22" y="100" fill="#94a3b8" fontSize="9">rapide · 0 disque mort = tout perdu</text>
                            <rect x="150" y="15" width="125" height="90" rx="6" fill="#1e293b" stroke="#22c55e" />
                            <text x="160" y="35" fill="#86efac" fontWeight="bold">RAID 1 — miroir</text>
                            <rect x="160" y="45" width="50" height="40" rx="3" fill="#334155" /><text x="170" y="60" fill="white" fontSize="9">A</text><text x="170" y="75" fill="white" fontSize="9">B</text>
                            <rect x="215" y="45" width="50" height="40" rx="3" fill="#334155" /><text x="225" y="60" fill="white" fontSize="9">A</text><text x="225" y="75" fill="white" fontSize="9">B</text>
                            <text x="157" y="100" fill="#94a3b8" fontSize="9">2 disques · tolère 1 panne</text>
                            <rect x="285" y="15" width="135" height="90" rx="6" fill="#1e293b" stroke="#f59e0b" />
                            <text x="295" y="35" fill="#fcd34d" fontWeight="bold">RAID 5 — parité</text>
                            <rect x="295" y="45" width="38" height="40" rx="3" fill="#334155" /><text x="303" y="60" fill="white" fontSize="9">A</text><text x="303" y="75" fill="white" fontSize="9">P</text>
                            <rect x="336" y="45" width="38" height="40" rx="3" fill="#334155" /><text x="344" y="60" fill="white" fontSize="9">B</text><text x="344" y="75" fill="white" fontSize="9">C</text>
                            <rect x="377" y="45" width="38" height="40" rx="3" fill="#334155" /><text x="385" y="60" fill="white" fontSize="9">D</text><text x="385" y="75" fill="white" fontSize="9">P</text>
                            <text x="292" y="100" fill="#94a3b8" fontSize="9">n-1 utiles · tolère 1 panne · reconstr. lente</text>
                            <rect x="430" y="15" width="125" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" />
                            <text x="440" y="35" fill="#7dd3fc" fontWeight="bold">RAID 10 — 1+0</text>
                            <rect x="440" y="45" width="55" height="20" rx="3" fill="#334155" /><text x="460" y="60" fill="white" fontSize="9">miroir 1</text>
                            <rect x="500" y="45" width="55" height="20" rx="3" fill="#334155" /><text x="520" y="60" fill="white" fontSize="9">miroir 2</text>
                            <rect x="440" y="70" width="115" height="16" rx="3" fill="#0f172a" /><text x="455" y="82" fill="white" fontSize="9">striping entre les paires</text>
                            <text x="437" y="100" fill="#94a3b8" fontSize="9">vitesse + tolérance · 4 disques min</text>
                            <text x="40" y="130" fill="#fbbf24" fontSize="10">Ç retenir : le RAID n'est PAS une sauvegarde — il protège de la panne disque, pas de la suppression ni du ransomware.</text>
                            <text x="40" y="152" fill="#94a3b8" fontSize="10">Hot spare : disque de réserve qui remplace automatiquement un membre défaillant, puis reconstruction.</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'cloud-modeles') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : IaaS / PaaS / SaaS — qui gère quoi ?</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> plus on monte vers le SaaS, moins le client gère. La barre orange = responsabilité du CLIENT ; la barre bleue = géré par le fournisseur.</p>
                        <svg viewBox="0 0 560 210" role="img" aria-label="Répartition des responsabilités IaaS PaaS SaaS" className="w-full h-auto text-xs">
                            <text x="10" y="18" fill="#94a3b8" fontSize="10">Couches : Applications · Données · Runtime · OS · Virtualisation · Serveurs · Stockage · Réseau</text>
                            <rect x="10" y="28" width="170" height="150" rx="8" fill="#1e293b" stroke="#0284c7" />
                            <text x="55" y="48" fill="#38bdf8" fontWeight="bold">IaaS (EC2, VM Azure)</text>
                            <rect x="20" y="58" width="150" height="14" rx="2" fill="#f59e0b" />
                            <rect x="20" y="75" width="150" height="14" rx="2" fill="#f59e0b" />
                            <rect x="20" y="92" width="150" height="14" rx="2" fill="#f59e0b" />
                            <rect x="20" y="109" width="150" height="14" rx="2" fill="#f59e0b" />
                            <rect x="20" y="126" width="150" height="14" rx="2" fill="#0ea5e9" />
                            <rect x="20" y="143" width="150" height="30" rx="2" fill="#0ea5e9" />
                            <text x="24" y="186" fill="#94a3b8" fontSize="9">client gère : apps, données, runtime, OS</text>
                            <rect x="195" y="28" width="170" height="150" rx="8" fill="#1e293b" stroke="#059669" />
                            <text x="240" y="48" fill="#34d399" fontWeight="bold">PaaS (App Service)</text>
                            <rect x="205" y="58" width="150" height="14" rx="2" fill="#f59e0b" />
                            <rect x="205" y="75" width="150" height="14" rx="2" fill="#f59e0b" />
                            <rect x="205" y="92" width="150" height="66" rx="2" fill="#0ea5e9" />
                            <text x="209" y="186" fill="#94a3b8" fontSize="9">client gère : applications et données</text>
                            <rect x="380" y="28" width="170" height="150" rx="8" fill="#1e293b" stroke="#7c3aed" />
                            <text x="425" y="48" fill="#c4b5fd" fontWeight="bold">SaaS (M365, Salesforce)</text>
                            <rect x="390" y="58" width="150" height="100" rx="2" fill="#f59e0b" />
                            <text x="400" y="112" fill="white" fontSize="10">client : ses données + comptes</text>
                            <rect x="390" y="163" width="150" height="14" rx="2" fill="#0ea5e9" />
                            <text x="384" y="186" fill="#94a3b8" fontSize="9">fournisseur gère TOUT le reste</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'pra-pca-321') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : PRA / PCA — règle 3-2-1 et objectifs RTO / RPO</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> PRA = reprendre l'activité après sinistre (site de secours) ; PCA = continuer pendant l'incident (redondance). La sauvegarde respecte la règle 3-2-1 et vise des RTO/RPO définis avec le métier.</p>
                        <svg viewBox="0 0 560 200" role="img" aria-label="PRA PCA et règle 3-2-1" className="w-full h-auto text-xs">
                            <rect x="15" y="20" width="255" height="60" rx="8" fill="#7c3aed" />
                            <text x="30" y="42" fill="white" fontWeight="bold">PRA — Plan de Reprise</text>
                            <text x="30" y="62" fill="#ddd6fe" fontSize="10">reprise APRÊS sinistre : site de secours,</text>
                            <text x="30" y="76" fill="#ddd6fe" fontSize="10">restauration, délai accepté = RTO</text>
                            <rect x="290" y="20" width="255" height="60" rx="8" fill="#0284c7" />
                            <text x="305" y="42" fill="white" fontWeight="bold">PCA — Plan de Continuité</text>
                            <text x="305" y="62" fill="#bae6fd" fontSize="10">continuer PENDANT : redondance matérielle,</text>
                            <text x="305" y="76" fill="#bae6fd" fontSize="10">cluster, second FAI, génératrice</text>
                            <rect x="15" y="100" width="255" height="80" rx="8" fill="#1e293b" stroke="#22c55e" />
                            <text x="30" y="122" fill="#86efac" fontWeight="bold">Règle 3-2-1 de sauvegarde</text>
                            <text x="30" y="142" fill="white" fontSize="10">3 copies · 2 supports différents</text>
                            <text x="30" y="160" fill="white" fontSize="10">1 copie HORS SITE (le ransomware</text>
                            <text x="30" y="176" fill="white" fontSize="10">chiffre aussi les sauvegardes connectées)</text>
                            <rect x="290" y="100" width="255" height="80" rx="8" fill="#1e293b" stroke="#f59e0b" />
                            <text x="305" y="122" fill="#fcd34d" fontWeight="bold">Deux objectifs à négocier avec le métier</text>
                            <text x="305" y="142" fill="white" fontSize="10">RTO : combien de temps d'arrût accepté ?</text>
                            <text x="305" y="160" fill="white" fontSize="10">RPO : combien de données perdues (bail</text>
                            <text x="305" y="176" fill="white" fontSize="10">de sauvegarde) accepté ?</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'supervision-architecture') {
                return (
                    <div className="w-full bg-slate-900 text-white p-5 rounded-xl border border-slate-700 shadow-xl overflow-x-auto">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs uppercase font-extrabold tracking-wider text-sky-400">Infrastructure &amp; Supervision · Architecture de Monitoring</h4>
                            <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">Zabbix / PRTG / Nagios</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-3 leading-relaxed"><strong className="text-amber-300">Lecture :</strong> le serveur de supervision collecte (SNMP, agents, ICMP) depuis toute l'infrastructure, stocke les métriques, déclenche des seuils → alertes (mail, SMS, ticket GLPI). SNMP trap = alerte spontanée, SNMP poll = interrogation régulière.</p>
                        <svg viewBox="0 0 640 280" role="img" aria-label="Architecture de supervision" className="w-full h-auto font-sans">
                            <defs>
                                <marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                                </marker>
                            </defs>
                            {/* Serveur de supervision (centre) */}
                            <rect x="230" y="90" width="180" height="80" rx="8" fill="#059669" />
                            <text x="255" y="118" fill="white" fontWeight="bold" fontSize="12">Serveur de Supervision</text>
                            <text x="245" y="138" fill="#a7f3d0" fontSize="10">Zabbix / PRTG / Nagios</text>
                            <text x="245" y="155" fill="#a7f3d0" fontSize="10">Seuils → alertes → tickets</text>

                            {/* Sources de données (gauche) */}
                            <rect x="20" y="30" width="160" height="40" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="35" y="55" fill="#93c5fd" fontSize="10">Switchs / Routeurs (SNMP)</text>

                            <rect x="20" y="90" width="160" height="40" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="45" y="115" fill="#93c5fd" fontSize="10">Serveurs (Agents)</text>

                            <rect x="20" y="150" width="160" height="40" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="45" y="175" fill="#93c5fd" fontSize="10">Postes (Ping/Service)</text>

                            {/* Destinations (droite) */}
                            <rect x="460" y="30" width="160" height="40" rx="6" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.5" />
                            <text x="478" y="55" fill="#fcd34d" fontSize="10">Email / SMS / GLPI</text>

                            <rect x="460" y="150" width="160" height="40" rx="6" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.5" />
                            <text x="475" y="175" fill="#fcd34d" fontSize="10">Tableaux de bord / NOC</text>

                            {/* Lignes de flux */}
                            <line x1="180" y1="50" x2="230" y2="105" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#ar)" />
                            <line x1="180" y1="110" x2="230" y2="120" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#ar)" />
                            <line x1="180" y1="170" x2="230" y2="145" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#ar)" />
                            <line x1="410" y1="105" x2="460" y2="50" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#ar)" />
                            <line x1="410" y1="145" x2="460" y2="170" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#ar)" />

                            {/* Méthodes de collecte */}
                            <rect x="20" y="215" width="600" height="45" rx="6" fill="#1e293b" stroke="#475569" />
                            <text x="32" y="235" fill="#94a3b8" fontSize="10">Collecte : SNMP poll (port 161) · SNMP trap (port 162) · Agents logiciels · ICMP ping · WMI / WinRM.</text>
                            <text x="32" y="252" fill="#94a3b8" fontSize="10">Contexte pro : supervision = détection proactive des pannes avant que les utilisateurs ne s'en plaignent.</text>
                        </svg>
                    </div>
                );
            }


            // ===== Schémas phase 2 : support/cybersécurité =====
            if (type === 'support-cycle-v2') {
                return (
                    <div className="w-full bg-slate-900 text-white p-5 rounded-xl border border-slate-700 shadow-xl overflow-x-auto">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs uppercase font-extrabold tracking-wider text-sky-400">Support IT &amp; ITIL · Cycle de Vie d'un Ticket</h4>
                            <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">ITIL v4</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-3 leading-relaxed"><strong className="text-amber-300">Lecture :</strong> le ticket suit un chemin précis de la gauche vers la droite. En cas de blocage, on escalade d'un niveau. Chaque étape a son acteur et son délai SLA.</p>
                        <svg viewBox="0 0 640 280" role="img" aria-label="Cycle de vie d'un ticket avec acteurs et délais" className="w-full h-auto font-sans">
                            <defs>
                                <marker id="ar" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
                                </marker>
                            </defs>
                            {/* Étapes du cycle */}
                            <rect x="20" y="60" width="100" height="50" rx="6" fill="#0284c7" />
                            <text x="35" y="82" fill="white" fontWeight="bold" fontSize="10">Ouverture</text>
                            <text x="28" y="98" fill="#bae6fd" fontSize="9">utilisateur appelle</text>

                            <rect x="140" y="60" width="100" height="50" rx="6" fill="#059669" />
                            <text x="155" y="82" fill="white" fontWeight="bold" fontSize="10">Qualification</text>
                            <text x="148" y="98" fill="#a7f3d0" fontSize="9">catégorie + criticité</text>

                            <rect x="260" y="60" width="100" height="50" rx="6" fill="#d97706" />
                            <text x="275" y="82" fill="white" fontWeight="bold" fontSize="10">Priorisation</text>
                            <text x="268" y="98" fill="#fde68a" fontSize="9">P1→P4 · SLA</text>

                            <rect x="380" y="30" width="100" height="50" rx="6" fill="#6366f1" />
                            <text x="398" y="52" fill="white" fontWeight="bold" fontSize="10">Diagnostic</text>
                            <text x="388" y="68" fill="#c7d2fe" fontSize="9">reproduire + logs</text>

                            <rect x="380" y="110" width="100" height="50" rx="6" fill="#059669" />
                            <text x="395" y="132" fill="white" fontWeight="bold" fontSize="10">Résolution</text>
                            <text x="388" y="148" fill="#a7f3d0" fontSize="9">appliquer + tester</text>

                            <rect x="380" y="190" width="100" height="50" rx="6" fill="#16a34a" />
                            <text x="400" y="212" fill="white" fontWeight="bold" fontSize="10">Clôture</text>
                            <text x="388" y="228" fill="#bbf7d0" fontSize="9">validation utilisateur</text>

                            {/* Flèches */}
                            <line x1="120" y1="85" x2="140" y2="85" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <line x1="240" y1="85" x2="260" y2="85" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <line x1="360" y1="85" x2="380" y2="55" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <line x1="430" y1="80" x2="430" y2="110" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#ar)" />
                            <line x1="430" y1="160" x2="430" y2="190" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#ar)" />

                            {/* Escalade */}
                            <rect x="20" y="140" width="240" height="100" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
                            <text x="32" y="162" fill="#fca5a5" fontWeight="bold" fontSize="11">Escalade si échec :</text>
                            <text x="30" y="182" fill="#fecaca" fontSize="10">N1 (support) → N2 (technicien IT)</text>
                            <text x="30" y="200" fill="#fecaca" fontSize="10">→ N3 (expert / fournisseur)</text>
                            <text x="30" y="218" fill="#fecaca" fontSize="10">chaque escalade = nouveau délai SLA</text>

                            {/* Priorités */}
                            <rect x="280" y="140" width="160" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="295" y="162" fill="#93c5fd" fontWeight="bold" fontSize="11">Priorités :</text>
                            <text x="295" y="182" fill="#93c5fd" fontSize="10">P1 : 4h · 50+ users</text>
                            <text x="295" y="200" fill="#93c5fd" fontSize="10">P2 : 8h · fonction KO</text>
                            <text x="295" y="218" fill="#93c5fd" fontSize="10">P3 : 24h · gêne partielle</text>
                            <text x="295" y="232" fill="#93c5fd" fontSize="10">P4 : 72h · confort</text>

                            {/* Note de bas */}
                            <rect x="460" y="60" width="160" height="180" rx="6" fill="#1e293b" stroke="#475569" />
                            <text x="472" y="82" fill="#94a3b8" fontSize="9">Où on le croise :</text>
                            <text x="472" y="100" fill="#94a3b8" fontSize="9">chaque appel, GLPI,</text>
                            <text x="472" y="116" fill="#94a3b8" fontSize="9">ServiceNow.</text>
                            <text x="472" y="140" fill="#94a3b8" fontSize="9">Pourquoi :</text>
                            <text x="472" y="158" fill="#94a3b8" fontSize="9">sans cycle, les demandes</text>
                            <text x="472" y="174" fill="#94a3b8" fontSize="9">se perdent, les SLA</text>
                            <text x="472" y="190" fill="#94a3b8" fontSize="9">explosent.</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'cyber-defense-v2') {
                return (
                    <div className="w-full bg-slate-900 text-white p-5 rounded-xl border border-slate-700 shadow-xl overflow-x-auto">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs uppercase font-extrabold tracking-wider text-sky-400">Cybersécurité · Modèle de Défense en Profondeur</h4>
                            <span className="text-[10px] bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">ISO 27001 / ANSSI</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mb-3 leading-relaxed"><strong className="text-amber-300">Lecture :</strong> la sécurité périmétrique seule ne suffit plus. Chaque anneau (du physique aux données) ralentit, détecte et isole l'attaquant. Si une barrière cède, les suivantes prennent le relais.</p>
                        <svg viewBox="0 0 640 280" role="img" aria-label="Défense en profondeur : anneaux de sécurité concentriques et correspondance technique" className="w-full h-auto font-sans">
                            {/* Cercles concentriques de défense */}
                            <g transform="translate(140, 130)">
                                <circle cx="0" cy="0" r="115" fill="#dc2626" opacity="0.2" stroke="#dc2626" strokeWidth="1.5" />
                                <circle cx="0" cy="0" r="95" fill="#ea580c" opacity="0.2" stroke="#ea580c" strokeWidth="1.5" />
                                <circle cx="0" cy="0" r="75" fill="#d97706" opacity="0.2" stroke="#d97706" strokeWidth="1.5" />
                                <circle cx="0" cy="0" r="55" fill="#059669" opacity="0.2" stroke="#059669" strokeWidth="1.5" />
                                <circle cx="0" cy="0" r="35" fill="#0284c7" opacity="0.2" stroke="#0284c7" strokeWidth="1.5" />
                                <circle cx="0" cy="0" r="18" fill="#6366f1" opacity="0.4" stroke="#6366f1" strokeWidth="1.5" />
                                <text x="-24" y="4" fill="white" fontWeight="bold" fontSize="10">Données</text>
                            </g>

                            {/* Tableau explicatif à droite */}
                            <rect x="280" y="15" width="345" height="210" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                            <text x="295" y="38" fill="#fbbf24" fontWeight="bold" fontSize="11">Anneau de défense &amp; Outils associés :</text>
                            
                            <text x="295" y="62" fill="#f8fafc" fontSize="10"><tspan fontWeight="bold" fill="#93c5fd">6 · Comptes / Identité :</tspan> MFA, stratégie de mots de passe, AD durci</text>
                            <text x="295" y="85" fill="#f8fafc" fontSize="10"><tspan fontWeight="bold" fill="#93c5fd">5 · Postes &amp; Terminaux :</tspan> EDR / Antivirus, durcissement OS (GPO)</text>
                            <text x="295" y="108" fill="#f8fafc" fontSize="10"><tspan fontWeight="bold" fill="#93c5fd">4 · Applications :</tspan> Pare-feu applicatif (WAF), cloisonnement</text>
                            <text x="295" y="131" fill="#f8fafc" fontSize="10"><tspan fontWeight="bold" fill="#93c5fd">3 · Réseau interne :</tspan> Segmentation VLAN, ACL, Zero Trust</text>
                            <text x="295" y="154" fill="#f8fafc" fontSize="10"><tspan fontWeight="bold" fill="#93c5fd">2 · Périmètre externe :</tspan> Firewall NG, IPS, VPN chiffré</text>
                            <text x="295" y="177" fill="#f8fafc" fontSize="10"><tspan fontWeight="bold" fill="#93c5fd">1 · Physique :</tspan> Badges, vidéosurveillance, salle serveurs</text>

                            <rect x="295" y="190" width="315" height="25" rx="4" fill="#1e293b" />
                            <text x="305" y="206" fill="#34d399" fontWeight="bold" fontSize="10">Surveillance continue : SIEM, Syslog, Zabbix</text>

                            {/* Bas de page */}
                            <rect x="15" y="240" width="610" height="28" rx="6" fill="#1e293b" stroke="#475569" />
                            <text x="25" y="258" fill="#94a3b8" fontSize="10">Règle d'or TSSR : « Aucune mesure de sécurité n'est infaillible seule ; c'est le cumul des barrières qui protège l'entreprise. »</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'mockup-aduc') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-1">Figure : Active Directory Users and Computers (ADUC)</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Ce que vous voyez :</strong> à gauche l'arborescence du domaine (dossiers = unités d'organisation), à droite les objets contenus dans l'élément sélectionné. Ouvrez-la via <em>Démarrer → Outils d'administration → Active Directory Users and Computers</em> ou <code>dsa.msc</code>.</p>
                        <svg viewBox="0 0 640 320" role="img" aria-label="Maquette ADUC : arborescence à gauche avec Domaine, UO, Users ; détails à droite" className="w-full h-auto text-xs rounded border border-slate-700">
                            <rect x="0" y="0" width="640" height="28" fill="#1e3a5f" />
                            <text x="8" y="18" fill="white" fontSize="11" fontWeight="bold">Active Directory Users and Computers</text>
                            <rect x="0" y="28" width="640" height="24" fill="#2d4a6f" />
                            <text x="8" y="44" fill="#a0c0e0" fontSize="10">Fichier  Action  Affichage  Aide</text>
                            <rect x="0" y="52" width="240" height="268" fill="#1a1a2e" stroke="#333" />
                            <text x="8" y="68" fill="#e0a020" fontSize="10" fontWeight="bold">■ lab.lan</text>
                            <text x="24" y="84" fill="#60c060" fontSize="10"> Builtin</text>
                            <text x="24" y="100" fill="#60c060" fontSize="10"> Computers</text>
                            <rect x="18" y="106" width="210" height="16" fill="#2a4a6e" rx="2" />
                            <text x="24" y="118" fill="#60c060" fontSize="10"> Domain Controllers</text>
                            <text x="24" y="136" fill="#60c060" fontSize="10"> Users</text>
                            <text x="24" y="152" fill="#60c060" fontSize="10"> Compta ◄ UO créée par vous</text>
                            <text x="24" y="168" fill="#60c060" fontSize="10"> Direction</text>
                            <text x="24" y="184" fill="#60c060" fontSize="10"> Informatique</text>
                            <rect x="240" y="52" width="400" height="268" fill="#0d0d1a" stroke="#333" />
                            <text x="250" y="70" fill="#a0c0e0" fontSize="10" fontWeight="bold">Objets dans Compta :</text>
                            <text x="250" y="88" fill="#c0d0e0" fontSize="10"> claire.martin        Utilisateur</text>
                            <text x="250" y="104" fill="#c0d0e0" fontSize="10"> jean.dupont         Utilisateur</text>
                            <text x="250" y="120" fill="#c0d0e0" fontSize="10"> GG-Compta           Groupe de sécurité</text>
                            <text x="250" y="136" fill="#c0d0e0" fontSize="10"> SRV-PAIE$           Ordinateur</text>
                            <text x="250" y="160" fill="#8090a0" fontSize="9">Double-cliquez sur un objet pour voir ses propriétés</text>
                            <text x="250" y="176" fill="#8090a0" fontSize="9">(onglets : Général, Compte, Membre de, ...)</text>
                            <rect x="250" y="220" width="380" height="80" fill="#1a2a1e" stroke="#2a5a3e" rx="4" />
                            <text x="260" y="238" fill="#60e080" fontSize="10" fontWeight="bold"> Ce qu'il faut observer :</text>
                            <text x="260" y="254" fill="#b0d0b0" fontSize="10">- L'arborescence reflète votre organisation (par service)</text>
                            <text x="260" y="268" fill="#b0d0b0" fontSize="10">- Les icônes :  utilisateur,  groupe,  UO, Å ordinateur</text>
                            <text x="260" y="282" fill="#b0d0b0" fontSize="10">- Clic droit sur une UO → New → User pour créer un compte</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'mockup-servermanager') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-1">Figure : Server Manager (Gestionnaire de serveur)</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Ce que vous voyez :</strong> le point d'entrée de Windows Server pour installer des rôles (AD DS, DHCP, DNS, Hyper-V...), gérer les services et voir l'état du serveur. Ouvrez-le via <em>Démarrer → Gestionnaire de serveur</em> (il s'ouvre automatiquement au démarrage).</p>
                        <svg viewBox="0 0 640 300" role="img" aria-label="Maquette Server Manager : tableau de bord avec vignettes rôles et fonctionnalités" className="w-full h-auto text-xs rounded border border-slate-700">
                            <rect x="0" y="0" width="640" height="28" fill="#1e3a5f" />
                            <text x="8" y="18" fill="white" fontSize="11" fontWeight="bold">Server Manager — Gestionnaire de serveur</text>
                            <rect x="0" y="28" width="180" height="272" fill="#1a1a2e" stroke="#333" />
                            <text x="8" y="48" fill="#e0a020" fontSize="10" fontWeight="bold">Tableau de bord</text>
                            <text x="8" y="64" fill="#a0c0e0" fontSize="10">Serveur local (2)</text>
                            <text x="8" y="80" fill="#a0c0e0" fontSize="10">Tous les serveurs</text>
                            <text x="8" y="96" fill="#a0c0e0" fontSize="10">File and Storage</text>
                            <text x="8" y="112" fill="#a0c0e0" fontSize="10">DNS</text>
                            <text x="8" y="128" fill="#a0c0e0" fontSize="10">Active Directory (1)</text>
                            <text x="8" y="152" fill="#e08030" fontSize="10" fontWeight="bold">Configure this server:</text>
                            <text x="8" y="168" fill="#c0d0e0" fontSize="10">Add roles and features</text>
                            <rect x="180" y="28" width="460" height="80" fill="#0d0d1a" stroke="#333" />
                            <text x="190" y="48" fill="#e0a020" fontSize="10" fontWeight="bold">PROPERTIES</text>
                            <text x="190" y="64" fill="#c0d0e0" fontSize="10">Computer Name: SRV-DC01    Domain: lab.lan</text>
                            <text x="190" y="80" fill="#c0d0e0" fontSize="10">Workgroup: Workgroup     NIC: Ethernet (172.16.10.10)</text>
                            <rect x="180" y="108" width="460" height="90" fill="#0d0d1a" stroke="#333" />
                            <text x="190" y="128" fill="#e0a020" fontSize="10" fontWeight="bold">ROLES AND FEATURES</text>
                            <text x="190" y="144" fill="#60e060" fontSize="10">✔ Active Directory Domain Services</text>
                            <text x="190" y="160" fill="#60e060" fontSize="10">✔ DNS Server</text>
                            <text x="190" y="176" fill="#8090a0" fontSize="10">+ Add roles and features (pour installer DHCP, Hyper-V...)</text>
                            <rect x="180" y="198" width="460" height="60" fill="#1a2a1e" stroke="#2a5a3e" rx="4" />
                            <text x="190" y="216" fill="#60e080" fontSize="10" fontWeight="bold"> Ce qu'il faut observer :</text>
                            <text x="190" y="232" fill="#b0d0b0" fontSize="10">- Le nom du serveur et le domaine en haut (vous confirmez que vous ûtes sur le bon serveur)</text>
                            <text x="190" y="248" fill="#b0d0b0" fontSize="10">- "Add roles and features" est l'assistant qui installe AD DS, DHCP, Hyper-V...</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'mockup-gpmc') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-1">Figure : Group Policy Management Console (GPMC)</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Ce que vous voyez :</strong> l'arborescence du domaine avec les UO, et les GPO liées à chaque niveau. Ouvrez-la via <code>gpmc.msc</code>. Pour éditer une GPO : clic droit → Edit, ce qui ouvre l'éditeur de stratégies.</p>
                        <svg viewBox="0 0 640 300" role="img" aria-label="Maquette GPMC : arborescence du domaine, UO avec GPO liées, éditeur" className="w-full h-auto text-xs rounded border border-slate-700">
                            <rect x="0" y="0" width="640" height="28" fill="#1e3a5f" />
                            <text x="8" y="18" fill="white" fontSize="11" fontWeight="bold">Group Policy Management</text>
                            <rect x="0" y="28" width="280" height="272" fill="#1a1a2e" stroke="#333" />
                            <text x="8" y="48" fill="#e0a020" fontSize="10" fontWeight="bold">■ Forest: lab.lan</text>
                            <text x="20" y="64" fill="#a0c0e0" fontSize="10">■ Domains</text>
                            <text x="32" y="80" fill="#a0c0e0" fontSize="10">■ lab.lan</text>
                            <rect x="36" y="86" width="230" height="16" fill="#2a4a6e" rx="2" />
                            <text x="42" y="98" fill="#c0d0e0" fontSize="10">Default Domain Policy (lié au domaine)</text>
                            <text x="32" y="116" fill="#60c060" fontSize="10"> Compta</text>
                            <text x="44" y="132" fill="#8090a0" fontSize="9">— No GPO linked yet</text>
                            <text x="32" y="150" fill="#60c060" fontSize="10"> Informatique</text>
                            <text x="44" y="166" fill="#80c0e0" fontSize="9">— COMPUTER-WSUS-Config</text>
                            <rect x="280" y="28" width="360" height="272" fill="#0d0d1a" stroke="#333" />
                            <text x="290" y="48" fill="#e0a020" fontSize="10" fontWeight="bold">Linked Group Policy Objects</text>
                            <text x="290" y="66" fill="#c0d0e0" fontSize="10">Default Domain Policy    Enforced: No</text>
                            <text x="290" y="84" fill="#c0d0e0" fontSize="10">Link Order: 1</text>
                            <rect x="290" y="100" width="340" height="70" fill="#1a2a1e" stroke="#2a5a3e" rx="4" />
                            <text x="300" y="118" fill="#60e080" fontSize="10" fontWeight="bold"> Ce qu'il faut observer :</text>
                            <text x="300" y="134" fill="#b0d0b0" fontSize="10">- Les GPO liées à chaque UO apparaissent ici</text>
                            <text x="300" y="150" fill="#b0d0b0" fontSize="10">- Clic droit sur une UO → "Create a GPO in this domain"</text>
                            <text x="300" y="164" fill="#b0d0b0" fontSize="10">- Clic droit sur la GPO → "Edit" ouvre l'éditeur de stratégies</text>
                            <rect x="290" y="180" width="340" height="80" fill="#1a1a3e" stroke="#333" rx="4" />
                            <text x="300" y="198" fill="#8090e0" fontSize="10" fontWeight="bold">⚠️Å Ordre d'application (LSDOU) :</text>
                            <text x="300" y="214" fill="#b0b0d0" fontSize="10">1. Local (poste)  2. Site  3. Domaine  4. OU</text>
                            <text x="300" y="230" fill="#b0b0d0" fontSize="10">La plus spécifique (OU) l'emporte en cas de conflit.</text>
                            <text x="300" y="246" fill="#b0b0d0" fontSize="10">gpupdate /force applique immédiatement.</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'mockup-linux-terminal') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-1">Figure : Terminal Linux — première session de diagnostic</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Ce que vous voyez :</strong> le prompt <code>admin@SRV-LNX01:~$</code> signifie que vous ûtes connecté avec le compte <code>admin</code> sur le serveur <code>SRV-LNX01</code>. Le symbole <code>~</code> indique votre répertoire personnel (<code>/home/admin</code>). Le curseur clignote après le <code>$</code>.</p>
                        <svg viewBox="0 0 640 340" role="img" aria-label="Maquette terminal Linux : prompt, commandes, résultat" className="w-full h-auto text-xs rounded border border-slate-700">
                            <rect x="0" y="0" width="640" height="340" fill="#0a0a0a" stroke="#333" />
                            <rect x="0" y="0" width="640" height="24" fill="#2d2d2d" />
                            <circle cx="14" cy="12" r="5" fill="#ff6060" /><circle cx="30" cy="12" r="5" fill="#ffc040" /><circle cx="46" cy="12" r="5" fill="#40e040" />
                            <text x="60" y="16" fill="#a0a0a0" fontSize="10">admin@SRV-LNX01: ~ — Terminal</text>
                            <text x="10" y="44" fill="#40e040" fontSize="11" fontFamily="monospace">admin@SRV-LNX01:~$ whoami</text>
                            <text x="10" y="60" fill="#e0e0e0" fontSize="11" fontFamily="monospace">admin</text>
                            <text x="10" y="84" fill="#40e040" fontSize="11" fontFamily="monospace">admin@SRV-LNX01:~$ hostname</text>
                            <text x="10" y="100" fill="#e0e0e0" fontSize="11" fontFamily="monospace">SRV-LNX01</text>
                            <text x="10" y="124" fill="#40e040" fontSize="11" fontFamily="monospace">admin@SRV-LNX01:~$ df -h | grep -v tmpfs</text>
                            <text x="10" y="140" fill="#e0e0e0" fontSize="11" fontFamily="monospace">Filesystem      Size  Used Avail Use% Mounted on</text>
                            <text x="10" y="156" fill="#e0e0e0" fontSize="11" fontFamily="monospace">/dev/sda1         30G   12G   18G  40% /</text>
                            <text x="10" y="180" fill="#40e040" fontSize="11" fontFamily="monospace">admin@SRV-LNX01:~$ systemctl --failed</text>
                            <text x="10" y="196" fill="#e0e0e0" fontSize="11" fontFamily="monospace">0 loaded units listed. ← aucun service en échec</text>
                            <text x="10" y="220" fill="#40e040" fontSize="11" fontFamily="monospace">admin@SRV-LNX01:~$ ss -tulpn | head -5</text>
                            <text x="10" y="236" fill="#e0e0e0" fontSize="11" fontFamily="monospace">Netid State  Local Address:Port  Process</text>
                            <text x="10" y="252" fill="#e0e0e0" fontSize="11" fontFamily="monospace">tcp   LISTEN 0.0.0.0:22            sshd</text>
                            <text x="10" y="268" fill="#e0e0e0" fontSize="11" fontFamily="monospace">tcp   LISTEN 127.0.0.1:5432       postgres</text>
                            <text x="10" y="300" fill="#8090a0" fontSize="10"> Ce qu'il faut observer :</text>
                            <text x="10" y="316" fill="#b0c0b0" fontSize="10">- Le prompt vert confirme votre identité (admin) et le serveur (SRV-LNX01)</text>
                            <text x="10" y="330" fill="#b0c0b0" fontSize="10">- df -h montre l'espace disque (40% utilisé = tout va bien)</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'mockup-cisco-cli') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-1">Figure : Cisco IOS CLI — configuration d'un VLAN</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Ce que vous voyez :</strong> le prompt change selon le mode. <code>Switch&gt;</code> = mode utilisateur, <code>Switch#</code> = mode privilégié (après <code>enable</code>), <code>Switch(config)#</code> = mode configuration (après <code>configure terminal</code>). C'est la hiérarchie de modes qui déroute les débutants.</p>
                        <svg viewBox="0 0 640 340" role="img" aria-label="Maquette Cisco CLI : modes utilisateur, privilégié, configuration" className="w-full h-auto text-xs rounded border border-slate-700">
                            <rect x="0" y="0" width="640" height="340" fill="#0a0a0a" stroke="#333" />
                            <rect x="0" y="0" width="640" height="24" fill="#2d2d2d" />
                            <circle cx="14" cy="12" r="5" fill="#ff6060" /><circle cx="30" cy="12" r="5" fill="#ffc040" /><circle cx="46" cy="12" r="5" fill="#40e040" />
                            <text x="60" y="16" fill="#a0a0a0" fontSize="10">Switch — Console</text>
                            <text x="10" y="48" fill="#c0c0c0" fontSize="11" fontFamily="monospace">Switch&gt; enable</text>
                            <text x="10" y="60" fill="#8090a0" fontSize="9" fontStyle="italic">← on passe du mode utilisateur au mode privilégié (prompt devient #)</text>
                            <text x="10" y="76" fill="#c0c0c0" fontSize="11" fontFamily="monospace">Switch# configure terminal</text>
                            <text x="10" y="88" fill="#8090a0" fontSize="9" fontStyle="italic">← on entre en mode configuration (prompt devient (config)#)</text>
                            <text x="10" y="104" fill="#c0c0c0" fontSize="11" fontFamily="monospace">Switch(config)# hostname SW-ACC1</text>
                            <text x="10" y="116" fill="#8090a0" fontSize="9" fontStyle="italic">← on renomme l'équipement (le prompt change immédiatement)</text>
                            <text x="10" y="132" fill="#c0c0c0" fontSize="11" fontFamily="monospace">SW-ACC1(config)# vlan 10</text>
                            <text x="10" y="144" fill="#8090a0" fontSize="9" fontStyle="italic">← on crée le VLAN 10</text>
                            <text x="10" y="160" fill="#c0c0c0" fontSize="11" fontFamily="monospace">SW-ACC1(config-vlan)# name COMPTA</text>
                            <text x="10" y="172" fill="#8090a0" fontSize="9" fontStyle="italic">← on lui donne un nom (meilleure lisibilité)</text>
                            <text x="10" y="188" fill="#c0c0c0" fontSize="11" fontFamily="monospace">SW-ACC1(config-vlan)# exit</text>
                            <text x="10" y="200" fill="#8090a0" fontSize="9" fontStyle="italic">← on revient au niveau précédent</text>
                            <text x="10" y="216" fill="#c0c0c0" fontSize="11" fontFamily="monospace">SW-ACC1(config)# interface fa0/1</text>
                            <text x="10" y="228" fill="#8090a0" fontSize="9" fontStyle="italic">← on sélectionne le port à configurer</text>
                            <text x="10" y="244" fill="#c0c0c0" fontSize="11" fontFamily="monospace">SW-ACC1(config-if)# switchport mode access</text>
                            <text x="10" y="256" fill="#c0c0c0" fontSize="11" fontFamily="monospace">SW-ACC1(config-if)# switchport access vlan 10</text>
                            <text x="10" y="268" fill="#8090a0" fontSize="9" fontStyle="italic">← on affecte le port au VLAN 10</text>
                            <text x="10" y="284" fill="#c0c0c0" fontSize="11" fontFamily="monospace">SW-ACC1(config-if)# end</text>
                            <text x="10" y="296" fill="#c0c0c0" fontSize="11" fontFamily="monospace">SW-ACC1# show vlan brief</text>
                            <text x="10" y="308" fill="#e0e0e0" fontSize="11" fontFamily="monospace">VLAN Name         Status    Ports</text>
                            <text x="10" y="320" fill="#e0e0e0" fontSize="11" fontFamily="monospace">10   COMPTA       active    Fa0/1</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'mockup-hyperv') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-1">Figure : Hyper-V Manager — interface de gestion des VM</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Ce que vous voyez :</strong> à gauche les serveurs Hyper-V, au centre les VM (avec leur état Running/Off), à droite le panneau d'actions (Start, Connect, Checkpoint...). Ouvrez-le via <code>HV Manager</code> ou <em>Outils d'administration → Hyper-V Manager</em>.</p>
                        <svg viewBox="0 0 640 300" role="img" aria-label="Maquette Hyper-V Manager : serveurs, VM, actions" className="w-full h-auto text-xs rounded border border-slate-700">
                            <rect x="0" y="0" width="640" height="28" fill="#1e3a5f" />
                            <text x="8" y="18" fill="white" fontSize="11" fontWeight="bold">Hyper-V Manager</text>
                            <rect x="0" y="28" width="160" height="272" fill="#1a1a2e" stroke="#333" />
                            <text x="8" y="48" fill="#e0a020" fontSize="10" fontWeight="bold">Hyper-V Manager</text>
                            <text x="8" y="66" fill="#a0c0e0" fontSize="10">■ SRV-HV (host)</text>
                            <text x="20" y="82" fill="#a0c0e0" fontSize="10">VMs</text>
                            <text x="20" y="98" fill="#a0c0e0" fontSize="10">Checkpoints</text>
                            <text x="20" y="114" fill="#a0c0e0" fontSize="10">Virtual Switches</text>
                            <rect x="160" y="28" width="280" height="272" fill="#0d0d1a" stroke="#333" />
                            <text x="170" y="48" fill="#e0a020" fontSize="10" fontWeight="bold">Virtual Machines</text>
                            <text x="170" y="68" fill="#60e060" fontSize="10">■ VM-CLI01        Running</text>
                            <text x="170" y="84" fill="#8090a0" fontSize="10">○ VM-TEST         Off</text>
                            <text x="170" y="100" fill="#8090a0" fontSize="10">○ VM-SRV-DNS      Off</text>
                            <text x="170" y="124" fill="#a0c0e0" fontSize="10">CPU: 2 vCPU  Memory: 4 GB</text>
                            <text x="170" y="140" fill="#a0c0e0" fontSize="10">Disk: D:\VHD\VM-CLI01.vhdx (60 GB dynamic)</text>
                            <text x="170" y="156" fill="#a0c0e0" fontSize="10">Switch: LAN-EXT (External)</text>
                            <rect x="440" y="28" width="200" height="272" fill="#1a1a2e" stroke="#333" />
                            <text x="450" y="48" fill="#e0a020" fontSize="10" fontWeight="bold">Actions</text>
                            <text x="450" y="68" fill="#80c0e0" fontSize="10">New → Virtual Machine...</text>
                            <text x="450" y="86" fill="#80c0e0" fontSize="10">■ Start</text>
                            <text x="450" y="104" fill="#80c0e0" fontSize="10">⏹ Turn Off</text>
                            <text x="450" y="122" fill="#80c0e0" fontSize="10">­öù Connect...</text>
                            <text x="450" y="140" fill="#80c0e0" fontSize="10">­ô© Checkpoint</text>
                            <rect x="160" y="200" width="280" height="80" fill="#1a2a1e" stroke="#2a5a3e" rx="4" />
                            <text x="170" y="218" fill="#60e080" fontSize="10" fontWeight="bold"> Ce qu'il faut observer :</text>
                            <text x="170" y="234" fill="#b0d0b0" fontSize="10">- L'état Running = la VM est démarrée et utilisable</text>
                            <text x="170" y="250" fill="#b0d0b0" fontSize="10">- Le panneau Actions propose Start, Connect, Checkpoint</text>
                            <text x="170" y="266" fill="#b0d0b0" fontSize="10">- "Connect" ouvre la console graphique de la VM</text>
                        </svg>
                    </div>
                );
            }

            return null;
        };

        // --- COMPOSANT DE BANQUE DE QCM (Mode Entraënement) ---
        