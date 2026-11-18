export const DynamicSVGDiagram = ({ type }) => {
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
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Description textuelle :</strong> à gauche, une pile « machines virtuelles » : chaque VM embarque ses applications, ses bibliothèques et un système invité complet, posé sur l'hyperviseur de type 1, lui-même posé sur le matériel. À droite, l'équivalent « conteneurs » : chaque conteneur ne porte que l'application et ses bibliothèques et partage le noyau de l'hôte.</p>
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
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Description textuelle :</strong> quatre boîtes enchaînées de gauche à droite : 1. Lien physique OK ?, 2. IP valide (pas 169.x.x.x) ?, 3. Ping passerelle ?, 4. Ping DNS ?. Sous chaque étape, une annotation rouge indique le chemin en cas d'échec : rebrancher ou associer le Wi-Fi ; échec DHCP (vérifier le relais) ; problème de routage ou de VLAN ; serveur DNS hors service.</p>
                        <svg viewBox="0 0 550 150" role="img" aria-label="Arbre de dépannage d'un client : câble et interface, puis adressage, puis service applicatif" className="w-full h-auto text-xs">
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
                                <text x="20" y="215" fill="white">1. Physique (Câblage, RJ45)</text>
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
                            <text x="205" y="160" fill="#94a3b8" fontSize="10">2 × 1 Gbps = 2 Gbps · LACP active ⇄ active · mêmes VLAN autorisés obligatoires</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'ospf-zones') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : OSPF multi-zones — le backbone 0 est obligatoire</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> chaque zone a sa LSDB (carte locale) ; les zones se raccordent à la zone 0 via un ABR. Sur un segment Ethernet, un DR et un BDR sont élus : les autres routeurs restent en 2-Way avec eux.</p>
                        <svg viewBox="0 0 560 200" role="img" aria-label="Domaine OSPF multi-zones avec ABR et DR" className="w-full h-auto text-xs">
                            <rect x="180" y="30" width="200" height="60" rx="10" fill="#059669" opacity="0.9" />
                            <text x="230" y="55" fill="white" fontWeight="bold">Zone 0 (backbone)</text>
                            <text x="225" y="75" fill="#a7f3d0" fontSize="10">R1 ⇄ R2 · DR élu sur le segment</text>
                            <rect x="40" y="120" width="170" height="50" rx="10" fill="#0284c7" />
                            <text x="80" y="142" fill="white" fontWeight="bold">Zone 1 (site Lyon)</text>
                            <text x="60" y="160" fill="#bae6fd" fontSize="10">LSDB locale de la zone 1</text>
                            <rect x="350" y="120" width="170" height="50" rx="10" fill="#7c3aed" />
                            <text x="385" y="142" fill="white" fontWeight="bold">Zone 2 (site Lille)</text>
                            <text x="370" y="160" fill="#ddd6fe" fontSize="10">LSDB locale de la zone 2</text>
                            <line x1="230" y1="90" x2="125" y2="120" stroke="#94a3b8" strokeWidth="3" />
                            <line x1="330" y1="90" x2="435" y2="120" stroke="#94a3b8" strokeWidth="3" />
                            <rect x="108" y="92" width="34" height="22" rx="4" fill="#f59e0b" />
                            <text x="112" y="107" fill="white" fontSize="9">ABR</text>
                            <rect x="418" y="92" width="34" height="22" rx="4" fill="#f59e0b" />
                            <text x="422" y="107" fill="white" fontSize="9">ABR</text>
                            <text x="120" y="195" fill="#94a3b8" fontSize="10">Les LSA ne franchissent pas les zones : une panne locale ne recalcule pas tout le domaine (SPF par zone).</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'nat-flow') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : un paquet à travers le NAT (PAT)</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> à l'aller le routeur réécrit la source (10.1.1.10:1025 → 203.0.113.5:49213) et note la correspondance ; au retour il restaure la destination. L'IP publique est partagée par TOUS les postes, différenciés par les ports.</p>
                        <svg viewBox="0 0 560 190" role="img" aria-label="Traduction NAT aller et retour" className="w-full h-auto text-xs">
                            <rect x="20" y="60" width="130" height="60" rx="10" fill="#0284c7" />
                            <text x="40" y="85" fill="white" fontWeight="bold">PC interne</text>
                            <text x="35" y="105" fill="#bae6fd" fontSize="10">10.1.1.10:1025</text>
                            <rect x="215" y="45" width="130" height="90" rx="10" fill="#059669" />
                            <text x="235" y="70" fill="white" fontWeight="bold">Routeur NAT</text>
                            <text x="228" y="90" fill="#a7f3d0" fontSize="10">table de traduction :</text>
                            <text x="228" y="106" fill="#a7f3d0" fontSize="10">10.1.1.10:1025 ⇄</text>
                            <text x="228" y="122" fill="#a7f3d0" fontSize="10">203.0.113.5:49213</text>
                            <rect x="410" y="60" width="130" height="60" rx="10" fill="#7c3aed" />
                            <text x="435" y="85" fill="white" fontWeight="bold">Serveur Internet</text>
                            <text x="430" y="105" fill="#ddd6fe" fontSize="10">198.51.100.80:443</text>
                            <line x1="150" y1="80" x2="215" y2="80" stroke="#22c55e" strokeWidth="3" markerEnd="url(#ar)" />
                            <line x1="345" y1="80" x2="410" y2="80" stroke="#22c55e" strokeWidth="3" markerEnd="url(#ar)" />
                            <text x="170" y="70" fill="#22c55e" fontSize="10">source réécrite →</text>
                            <text x="352" y="70" fill="#22c55e" fontSize="10">203.0.113.5:49213 →</text>
                            <line x1="410" y1="120" x2="345" y2="120" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#ar)" />
                            <line x1="215" y1="120" x2="150" y2="120" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#ar)" />
                            <text x="250" y="140" fill="#f59e0b" fontSize="10">retour : destination restaurée via la table</text>
                            <text x="140" y="170" fill="#94a3b8" fontSize="10">Un paquet ENTRANT sans entrée dans la table est détruit — d'où l'isolation naturelle du réseau interne.</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'acl-evaluation') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : une ACL se lit de haut en bas — premier match gagnant</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> chaque paquet descend la liste ; la première ligne qui matche tranche (permit ou deny) et le reste est ignoré. Si rien ne matche : le deny any IMPLICITE rejette tout — une ACL « permit seulement » coupe donc tout le reste.</p>
                        <svg viewBox="0 0 560 200" role="img" aria-label="Évaluation séquentielle d'une ACL" className="w-full h-auto text-xs">
                            <rect x="20" y="85" width="90" height="34" rx="8" fill="#0284c7" />
                            <text x="35" y="107" fill="white" fontWeight="bold">Paquet</text>
                            <rect x="170" y="15" width="230" height="28" rx="5" fill="#059669" />
                            <text x="180" y="34" fill="white">1. permit tcp … eq 443 → ✔ passe</text>
                            <rect x="170" y="55" width="230" height="28" rx="5" fill="#dc2626" />
                            <text x="180" y="74" fill="white">2. deny ip … → ✕ rejeté</text>
                            <rect x="170" y="95" width="230" height="28" rx="5" fill="#475569" />
                            <text x="180" y="114" fill="white">3. permit ip any → ✔ passe</text>
                            <rect x="170" y="140" width="230" height="28" rx="5" fill="#1e293b" stroke="#ef4444" />
                            <text x="180" y="159" fill="#fca5a5">implicite : deny any → ✕ rejeté</text>
                            <line x1="110" y1="102" x2="165" y2="29" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="110" y1="102" x2="165" y2="69" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="110" y1="102" x2="165" y2="109" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="110" y1="102" x2="165" y2="154" stroke="#94a3b8" strokeWidth="2" />
                            <text x="410" y="34" fill="#94a3b8" fontSize="10">stop au 1er match</text>
                            <text x="410" y="54" fill="#94a3b8" fontSize="10">l'ordre est une</text>
                            <text x="410" y="68" fill="#94a3b8" fontSize="10">décision d'archi :</text>
                            <text x="410" y="82" fill="#94a3b8" fontSize="10">une ligne large</text>
                            <text x="410" y="96" fill="#94a3b8" fontSize="10">en tête masque</text>
                            <text x="410" y="110" fill="#94a3b8" fontSize="10">tout ce qui suit.</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'ipv6-slaac') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : SLAAC — l'hôte construit son adresse IPv6 seul</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> le routeur diffuse le préfixe (RA multicast ff02::1) ; l'hôte colle son identifiant EUI-64 (dérivé de la MAC) puis vérifie l'unicité (DAD) avant d'utiliser l'adresse. Sans Router Advertisement : aucune adresse globale.</p>
                        <svg viewBox="0 0 560 190" role="img" aria-label="Séquence SLAAC : RA, EUI-64, DAD" className="w-full h-auto text-xs">
                            <rect x="20" y="70" width="130" height="56" rx="10" fill="#059669" />
                            <text x="40" y="92" fill="white" fontWeight="bold">Routeur</text>
                            <text x="32" y="112" fill="#a7f3d0" fontSize="10">RA : 2001:db8:1::/64</text>
                            <rect x="410" y="70" width="130" height="56" rx="10" fill="#0284c7" />
                            <text x="430" y="92" fill="white" fontWeight="bold">Hôte</text>
                            <text x="425" y="112" fill="#bae6fd" fontSize="10">MAC 00:1A:2B:3C:4D:5E</text>
                            <line x1="150" y1="85" x2="410" y2="85" stroke="#22c55e" strokeWidth="3" markerEnd="url(#ar)" />
                            <text x="200" y="78" fill="#22c55e" fontSize="10">1. RA (multicast ff02::1) — préfixe /64</text>
                            <rect x="180" y="105" width="200" height="52" rx="8" fill="#1e293b" stroke="#f59e0b" />
                            <text x="192" y="122" fill="#fbbf24" fontSize="10">2. EUI-64 : insère FFFE + bit inversé</text>
                            <text x="192" y="140" fill="#fbbf24" fontSize="10">→ 2001:db8:1::021A:2BFF:FE3C:4D:5E</text>
                            <rect x="180" y="165" width="200" height="22" rx="5" fill="#7c3aed" />
                            <text x="192" y="181" fill="white" fontSize="10">3. DAD : Neighbor Solicitation → adresse unique ?</text>
                            <line x1="410" y1="120" x2="382" y2="140" stroke="#94a3b8" strokeWidth="2" />
                        </svg>
                    </div>
                );
            }

            if (type === 'arp-resolution') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : ARP — de l'adresse IP à l'adresse MAC</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> la requête ARP est une DIFFUSION : tout le segment la traite ; seul le propriétaire de l'IP répond (unicast) ; le demandeur met la réponse en cache. Le routeur ne transmet jamais l'ARP au-delà du segment.</p>
                        <svg viewBox="0 0 560 200" role="img" aria-label="Résolution ARP : diffusion puis réponse" className="w-full h-auto text-xs">
                            <rect x="20" y="40" width="110" height="44" rx="8" fill="#0284c7" />
                            <text x="35" y="60" fill="white" fontWeight="bold">PC-A</text>
                            <text x="30" y="76" fill="#bae6fd" fontSize="10">10.1.1.20</text>
                            <rect x="180" y="40" width="110" height="44" rx="8" fill="#475569" />
                            <text x="195" y="60" fill="white" fontWeight="bold">PC-B</text>
                            <text x="190" y="76" fill="#cbd5e1" fontSize="10">10.1.1.21</text>
                            <rect x="340" y="40" width="110" height="44" rx="8" fill="#dc2626" />
                            <text x="355" y="60" fill="white" fontWeight="bold">PC-C</text>
                            <text x="350" y="76" fill="#fecaca" fontSize="10">10.1.1.30 ← cible</text>
                            <line x1="130" y1="55" x2="340" y2="55" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#ar)" />
                            <text x="155" y="45" fill="#f59e0b" fontSize="10">1. « Qui a 10.1.1.30 ? » — diffusion : TOUS écoutent</text>
                            <line x1="340" y1="75" x2="135" y2="75" stroke="#22c55e" strokeWidth="2" markerEnd="url(#ar)" />
                            <text x="170" y="95" fill="#22c55e" fontSize="10">2. réponse unicast : 10.1.1.30 = MAC 00-1C-…-C3</text>
                            <rect x="130" y="115" width="290" height="40" rx="8" fill="#1e293b" stroke="#38bdf8" />
                            <text x="145" y="135" fill="#93c5fd" fontSize="10">3. cache ARP de PC-A (arp -a) :</text>
                            <text x="145" y="151" fill="#93c5fd" fontSize="10">10.1.1.30 → 00-1C-xx-xx-C3 (dynamique)</text>
                            <text x="90" y="180" fill="#94a3b8" fontSize="10">Sans réponse : pas de MAC → pas de trame → « destination unreachable » au niveau local.</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'dns-resolution') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : résolution DNS — la chaîne complète</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> le client interroge son résolveur ; si le nom n'est pas en cache, le résolveur descend la hiérarchie (racine → .fr → autoritaire) et met la réponse en cache. Ping IP OK + nom KO = problème dans CETTE chaîne.</p>
                        <svg viewBox="0 0 560 190" role="img" aria-label="Chaîne de résolution DNS" className="w-full h-auto text-xs">
                            <rect x="15" y="70" width="105" height="50" rx="8" fill="#0284c7" />
                            <text x="30" y="92" fill="white" fontWeight="bold">Client</text>
                            <text x="25" y="110" fill="#bae6fd" fontSize="10">www.entreprise.fr</text>
                            <rect x="150" y="70" width="105" height="50" rx="8" fill="#059669" />
                            <text x="162" y="92" fill="white" fontWeight="bold">Résolveur</text>
                            <text x="158" y="110" fill="#a7f3d0" fontSize="10">cache ? → sinon</text>
                            <rect x="285" y="25" width="120" height="36" rx="8" fill="#7c3aed" />
                            <text x="305" y="47" fill="white" fontSize="10">Racine « . » → .fr ?</text>
                            <rect x="285" y="77" width="120" height="36" rx="8" fill="#7c3aed" />
                            <text x="303" y="99" fill="white" fontSize="10">TLD .fr → NS autoritaire ?</text>
                            <rect x="440" y="77" width="105" height="36" rx="8" fill="#dc2626" />
                            <text x="452" y="99" fill="white" fontSize="10">Autoritaire zone</text>
                            <line x1="120" y1="95" x2="150" y2="95" stroke="#22c55e" strokeWidth="3" markerEnd="url(#ar)" />
                            <line x1="255" y1="85" x2="285" y2="48" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="255" y1="95" x2="285" y2="95" stroke="#94a3b8" strokeWidth="2" />
                            <line x1="405" y1="95" x2="440" y2="95" stroke="#94a3b8" strokeWidth="2" />
                            <text x="200" y="145" fill="#fbbf24" fontSize="10">4. réponse : A 192.0.2.10 — mise en cache pour le TTL</text>
                            <text x="120" y="172" fill="#94a3b8" fontSize="10">En interne, c'est le serveur DNS du domaine qui joue le résolveur : enregistrements A, AAAA, MX, NS, CNAME.</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'gpo-lsdou') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : ordre d'application des GPO (LSDOU) — la dernière gagne</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> les stratégies s'appliquent du général au spécifique ; en cas de conflit, la plus proche de l'utilisateur (l'OU) écrase les précédentes. gpupdate /force applique, gpresult /R vérifie.</p>
                        <svg viewBox="0 0 560 200" role="img" aria-label="Ordre LSDOU des GPO" className="w-full h-auto text-xs">
                            <rect x="40" y="15" width="250" height="30" rx="6" fill="#475569" />
                            <text x="55" y="35" fill="white">L — Local (stratégie de la machine)</text>
                            <rect x="40" y="60" width="250" height="30" rx="6" fill="#7c3aed" />
                            <text x="55" y="80" fill="white">S — Site (AD Sites and Services)</text>
                            <rect x="40" y="105" width="250" height="30" rx="6" fill="#0284c7" />
                            <text x="55" y="125" fill="white">D — Domaine (entreprise.local)</text>
                            <rect x="40" y="150" width="250" height="30" rx="6" fill="#059669" />
                            <text x="55" y="170" fill="white">OU — ex : OU=RH → la plus spécifique</text>
                            <line x1="290" y1="30" x2="290" y2="165" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#ar)" />
                            <text x="305" y="80" fill="#fbbf24" fontSize="10">ordre d'application ↓</text>
                            <text x="305" y="130" fill="#fbbf24" fontSize="10">conflit : l'OU gagne</text>
                            <rect x="330" y="55" width="200" height="100" rx="10" fill="#1e293b" stroke="#38bdf8" />
                            <text x="345" y="80" fill="#93c5fd" fontSize="10">Vérifier côté poste :</text>
                            <text x="345" y="100" fill="#93c5fd" fontSize="10">gpupdate /force → applique</text>
                            <text x="345" y="120" fill="#93c5fd" fontSize="10">gpresult /R → liste les GPO</text>
                            <text x="345" y="140" fill="#93c5fd" fontSize="10">appliquées ET filtrées</text>
                            <text x="100" y="196" fill="#94a3b8" fontSize="10">Héritage bloqué / Enforced / filtrage WMI modifient ce flux — gpresult montre la raison.</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'kerberos-flow') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : Kerberos — des tickets, pas des mots de passe</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> à l'ouverture de session, le KDC (DC) délivre un TGT ; ensuite chaque service reçoit un ticket de service (TGS) du TGT. Le mot de passe ne circule JAMAIS vers les services — une horloge décalée casse tout (tolérance 5 min).</p>
                        <svg viewBox="0 0 560 190" role="img" aria-label="Flux Kerberos : TGT puis TGS" className="w-full h-auto text-xs">
                            <rect x="20" y="70" width="120" height="50" rx="10" fill="#0284c7" />
                            <text x="40" y="92" fill="white" fontWeight="bold">Client</text>
                            <text x="35" y="112" fill="#bae6fd" fontSize="10">claire.martin</text>
                            <rect x="230" y="60" width="130" height="70" rx="10" fill="#059669" />
                            <text x="250" y="85" fill="white" fontWeight="bold">KDC (DC)</text>
                            <text x="243" y="105" fill="#a7f3d0" fontSize="10">1. AS : délivre TGT</text>
                            <text x="243" y="122" fill="#a7f3d0" fontSize="10">2. TGS : ticket service</text>
                            <rect x="430" y="70" width="110" height="50" rx="10" fill="#7c3aed" />
                            <text x="445" y="92" fill="white" fontWeight="bold">Service</text>
                            <text x="442" y="112" fill="#ddd6fe" fontSize="10">SRV-FILE01</text>
                            <line x1="140" y1="85" x2="230" y2="85" stroke="#22c55e" strokeWidth="3" markerEnd="url(#ar)" />
                            <text x="150" y="78" fill="#22c55e" fontSize="10">1. ouverture de session</text>
                            <line x1="230" y1="115" x2="140" y2="115" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#ar)" />
                            <text x="140" y="135" fill="#fbbf24" fontSize="10">← TGT (valable ~10 h)</text>
                            <line x1="360" y1="95" x2="430" y2="95" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#ar)" />
                            <text x="360" y="85" fill="#fbbf24" fontSize="10">TGS →</text>
                            <text x="130" y="170" fill="#94a3b8" fontSize="10">klist : voir les tickets · klist purge : les effacer · erreur « horloge » = écart &gt; 5 min client/DC.</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'raid-niveaux') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : RAID 0 / 1 / 5 / 10 — les quatre architectures à connaître</h4>
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
                            <text x="40" y="130" fill="#fbbf24" fontSize="10">À retenir : le RAID n'est PAS une sauvegarde — il protège de la panne disque, pas de la suppression ni du ransomware.</text>
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
                            <text x="30" y="62" fill="#ddd6fe" fontSize="10">reprise APRÈS sinistre : site de secours,</text>
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
                            <text x="305" y="142" fill="white" fontSize="10">RTO : combien de temps d'arrêt accepté ?</text>
                            <text x="305" y="160" fill="white" fontSize="10">RPO : combien de données perdues (bail</text>
                            <text x="305" y="176" fill="white" fontSize="10">de sauvegarde) accepté ?</text>
                        </svg>
                    </div>
                );
            }

            if (type === 'supervision-architecture') {
                return (
                    <div className="w-full bg-slate-900 text-white p-4 rounded-lg overflow-x-auto">
                        <h4 className="text-xs uppercase font-bold text-sky-400 mb-2">SVG : architecture de supervision (Zabbix/PRTG)</h4>
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Lecture :</strong> le serveur de supervision collecte (SNMP, agents, ICMP) depuis toute l'infrastructure, stocke les métriques, déclenche des seuils → alertes (mail, SMS, ticket GLPI). SNMP trap = alerte spontanée, SNMP poll = interrogation régulière.</p>
                        <svg viewBox="0 0 560 190" role="img" aria-label="Architecture de supervision" className="w-full h-auto text-xs">
                            <rect x="215" y="55" width="140" height="70" rx="10" fill="#059669" />
                            <text x="245" y="80" fill="white" fontWeight="bold">Serveur de</text>
                            <text x="245" y="98" fill="white" fontWeight="bold">supervision</text>
                            <text x="228" y="116" fill="#a7f3d0" fontSize="10">seuils → alertes → tickets</text>
                            <rect x="20" y="20" width="130" height="40" rx="8" fill="#1e293b" stroke="#38bdf8" />
                            <text x="35" y="45" fill="#93c5fd" fontSize="10">Switchs / routeurs (SNMP)</text>
                            <rect x="20" y="80" width="130" height="40" rx="8" fill="#1e293b" stroke="#38bdf8" />
                            <text x="40" y="100" fill="#93c5fd" fontSize="10">Serveurs (agents)</text>
                            <rect x="20" y="140" width="130" height="40" rx="8" fill="#1e293b" stroke="#38bdf8" />
                            <text x="42" y="160" fill="#93c5fd" fontSize="10">Postes (ping/service)</text>
                            <rect x="410" y="20" width="130" height="40" rx="8" fill="#1e293b" stroke="#fbbf24" />
                            <text x="428" y="45" fill="#fcd34d" fontSize="10">Email / SMS / GLPI</text>
                            <rect x="410" y="140" width="130" height="40" rx="8" fill="#1e293b" stroke="#fbbf24" />
                            <text x="425" y="160" fill="#fcd34d" fontSize="10">Tableaux de bord / NOC</text>
                            <line x1="150" y1="40" x2="215" y2="70" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#ar)" />
                            <line x1="150" y1="100" x2="215" y2="90" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#ar)" />
                            <line x1="150" y1="160" x2="215" y2="110" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#ar)" />
                            <line x1="355" y1="70" x2="410" y2="40" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#ar)" />
                            <line x1="355" y1="110" x2="410" y2="160" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#ar)" />
                            <text x="160" y="185" fill="#94a3b8" fontSize="10">collecte : SNMP poll (161) · trap (162) · agents · ICMP ping · WMI/WinRM</text>
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
                            <text x="8" y="68" fill="#e0a020" fontSize="10" fontWeight="bold">▸ lab.lan</text>
                            <text x="24" y="84" fill="#60c060" fontSize="10">📁 Builtin</text>
                            <text x="24" y="100" fill="#60c060" fontSize="10">📁 Computers</text>
                            <rect x="18" y="106" width="210" height="16" fill="#2a4a6e" rx="2" />
                            <text x="24" y="118" fill="#60c060" fontSize="10">📁 Domain Controllers</text>
                            <text x="24" y="136" fill="#60c060" fontSize="10">📁 Users</text>
                            <text x="24" y="152" fill="#60c060" fontSize="10">📁 Compta ◄ UO créée par vous</text>
                            <text x="24" y="168" fill="#60c060" fontSize="10">📁 Direction</text>
                            <text x="24" y="184" fill="#60c060" fontSize="10">📁 Informatique</text>
                            <rect x="240" y="52" width="400" height="268" fill="#0d0d1a" stroke="#333" />
                            <text x="250" y="70" fill="#a0c0e0" fontSize="10" fontWeight="bold">Objets dans Compta :</text>
                            <text x="250" y="88" fill="#c0d0e0" fontSize="10">👤 claire.martin        Utilisateur</text>
                            <text x="250" y="104" fill="#c0d0e0" fontSize="10">👤 jean.dupont         Utilisateur</text>
                            <text x="250" y="120" fill="#c0d0e0" fontSize="10">👥 GG-Compta           Groupe de sécurité</text>
                            <text x="250" y="136" fill="#c0d0e0" fontSize="10">👤 SRV-PAIE$           Ordinateur</text>
                            <text x="250" y="160" fill="#8090a0" fontSize="9">Double-cliquez sur un objet pour voir ses propriétés</text>
                            <text x="250" y="176" fill="#8090a0" fontSize="9">(onglets : Général, Compte, Membre de, ...)</text>
                            <rect x="250" y="220" width="380" height="80" fill="#1a2a1e" stroke="#2a5a3e" rx="4" />
                            <text x="260" y="238" fill="#60e080" fontSize="10" fontWeight="bold">💡 Ce qu'il faut observer :</text>
                            <text x="260" y="254" fill="#b0d0b0" fontSize="10">- L'arborescence reflète votre organisation (par service)</text>
                            <text x="260" y="268" fill="#b0d0b0" fontSize="10">- Les icônes : 👤 utilisateur, 👥 groupe, 📁 UO, 🖥️ ordinateur</text>
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
                            <text x="190" y="144" fill="#60e060" fontSize="10">✓ Active Directory Domain Services</text>
                            <text x="190" y="160" fill="#60e060" fontSize="10">✓ DNS Server</text>
                            <text x="190" y="176" fill="#8090a0" fontSize="10">+ Add roles and features (pour installer DHCP, Hyper-V...)</text>
                            <rect x="180" y="198" width="460" height="60" fill="#1a2a1e" stroke="#2a5a3e" rx="4" />
                            <text x="190" y="216" fill="#60e080" fontSize="10" fontWeight="bold">💡 Ce qu'il faut observer :</text>
                            <text x="190" y="232" fill="#b0d0b0" fontSize="10">- Le nom du serveur et le domaine en haut (vous confirmez que vous êtes sur le bon serveur)</text>
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
                            <text x="8" y="48" fill="#e0a020" fontSize="10" fontWeight="bold">▸ Forest: lab.lan</text>
                            <text x="20" y="64" fill="#a0c0e0" fontSize="10">▸ Domains</text>
                            <text x="32" y="80" fill="#a0c0e0" fontSize="10">▸ lab.lan</text>
                            <rect x="36" y="86" width="230" height="16" fill="#2a4a6e" rx="2" />
                            <text x="42" y="98" fill="#c0d0e0" fontSize="10">Default Domain Policy (lié au domaine)</text>
                            <text x="32" y="116" fill="#60c060" fontSize="10">📁 Compta</text>
                            <text x="44" y="132" fill="#8090a0" fontSize="9">— No GPO linked yet</text>
                            <text x="32" y="150" fill="#60c060" fontSize="10">📁 Informatique</text>
                            <text x="44" y="166" fill="#80c0e0" fontSize="9">— COMPUTER-WSUS-Config</text>
                            <rect x="280" y="28" width="360" height="272" fill="#0d0d1a" stroke="#333" />
                            <text x="290" y="48" fill="#e0a020" fontSize="10" fontWeight="bold">Linked Group Policy Objects</text>
                            <text x="290" y="66" fill="#c0d0e0" fontSize="10">Default Domain Policy    Enforced: No</text>
                            <text x="290" y="84" fill="#c0d0e0" fontSize="10">Link Order: 1</text>
                            <rect x="290" y="100" width="340" height="70" fill="#1a2a1e" stroke="#2a5a3e" rx="4" />
                            <text x="300" y="118" fill="#60e080" fontSize="10" fontWeight="bold">💡 Ce qu'il faut observer :</text>
                            <text x="300" y="134" fill="#b0d0b0" fontSize="10">- Les GPO liées à chaque UO apparaissent ici</text>
                            <text x="300" y="150" fill="#b0d0b0" fontSize="10">- Clic droit sur une UO → "Create a GPO in this domain"</text>
                            <text x="300" y="164" fill="#b0d0b0" fontSize="10">- Clic droit sur la GPO → "Edit" ouvre l'éditeur de stratégies</text>
                            <rect x="290" y="180" width="340" height="80" fill="#1a1a3e" stroke="#333" rx="4" />
                            <text x="300" y="198" fill="#8090e0" fontSize="10" fontWeight="bold">⚠️ Ordre d'application (LSDOU) :</text>
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
                        <p className="text-[11px] text-slate-300 mb-2"><strong className="text-amber-300">Ce que vous voyez :</strong> le prompt <code>admin@SRV-LNX01:~$</code> signifie que vous êtes connecté avec le compte <code>admin</code> sur le serveur <code>SRV-LNX01</code>. Le symbole <code>~</code> indique votre répertoire personnel (<code>/home/admin</code>). Le curseur clignote après le <code>$</code>.</p>
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
                            <text x="10" y="300" fill="#8090a0" fontSize="10">💡 Ce qu'il faut observer :</text>
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
                            <text x="8" y="66" fill="#a0c0e0" fontSize="10">▸ SRV-HV (host)</text>
                            <text x="20" y="82" fill="#a0c0e0" fontSize="10">VMs</text>
                            <text x="20" y="98" fill="#a0c0e0" fontSize="10">Checkpoints</text>
                            <text x="20" y="114" fill="#a0c0e0" fontSize="10">Virtual Switches</text>
                            <rect x="160" y="28" width="280" height="272" fill="#0d0d1a" stroke="#333" />
                            <text x="170" y="48" fill="#e0a020" fontSize="10" fontWeight="bold">Virtual Machines</text>
                            <text x="170" y="68" fill="#60e060" fontSize="10">▶ VM-CLI01        Running</text>
                            <text x="170" y="84" fill="#8090a0" fontSize="10">○ VM-TEST         Off</text>
                            <text x="170" y="100" fill="#8090a0" fontSize="10">○ VM-SRV-DNS      Off</text>
                            <text x="170" y="124" fill="#a0c0e0" fontSize="10">CPU: 2 vCPU  Memory: 4 GB</text>
                            <text x="170" y="140" fill="#a0c0e0" fontSize="10">Disk: D:\VHD\VM-CLI01.vhdx (60 GB dynamic)</text>
                            <text x="170" y="156" fill="#a0c0e0" fontSize="10">Switch: LAN-EXT (External)</text>
                            <rect x="440" y="28" width="200" height="272" fill="#1a1a2e" stroke="#333" />
                            <text x="450" y="48" fill="#e0a020" fontSize="10" fontWeight="bold">Actions</text>
                            <text x="450" y="68" fill="#80c0e0" fontSize="10">New → Virtual Machine...</text>
                            <text x="450" y="86" fill="#80c0e0" fontSize="10">▶ Start</text>
                            <text x="450" y="104" fill="#80c0e0" fontSize="10">⏹ Turn Off</text>
                            <text x="450" y="122" fill="#80c0e0" fontSize="10">🔗 Connect...</text>
                            <text x="450" y="140" fill="#80c0e0" fontSize="10">📸 Checkpoint</text>
                            <rect x="160" y="200" width="280" height="80" fill="#1a2a1e" stroke="#2a5a3e" rx="4" />
                            <text x="170" y="218" fill="#60e080" fontSize="10" fontWeight="bold">💡 Ce qu'il faut observer :</text>
                            <text x="170" y="234" fill="#b0d0b0" fontSize="10">- L'état Running = la VM est démarrée et utilisable</text>
                            <text x="170" y="250" fill="#b0d0b0" fontSize="10">- Le panneau Actions propose Start, Connect, Checkpoint</text>
                            <text x="170" y="266" fill="#b0d0b0" fontSize="10">- "Connect" ouvre la console graphique de la VM</text>
                        </svg>
                    </div>
                );
            }

            return null;
        };

        // --- COMPOSANT DE BANQUE DE QCM (Mode Entraînement) ---
