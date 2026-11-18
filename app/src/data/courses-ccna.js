export const COURSES_DATA = [
            // --- CCNA v2.0 (Dès Fév 2027) ---
            {
                id: 'ccna-v2-1-1',
                certif: 'CCNA',
                parcours: 'CCNA',
                code: '1.1',
                title: "Ethernet, la couche physique et le dépannage d'interface",
                niveau: 'Débutant',
                prerequis: "Aucun : c'est le tout premier sujet du parcours CCNA — les couches OSI y sont introduites au fil du dépannage.",
                objectifs: [
                    "Utiliser le modèle OSI comme grille de diagnostic (couche par couche, du câble à l'application)",
                    "Expliquer ce qu'est une collision en half-duplex et pourquoi le full-duplex l'élimine",
                    "Reconnaître un duplex mismatch et un câble hors spécifications aux compteurs (CRC, late collisions)",
                    "Lire l'état d'un port (show interfaces, show interfaces status) et remettre les compteurs à zéro proprement",
                    "Connaître les limites physiques Ethernet : 100 m cuivre, catégories de câbles, fibre pour la distance"
                ],
                lessons: [
                    { title: "Leçon 1 — Le modèle OSI comme outil de diagnostic", parts: [
                        { h: "Sept couches, un ordre de lecture", t: "7 Application (HTTP, DNS vu par l'utilisateur) ; 6 Présentation ; 5 Session ; 4 Transport (TCP/UDP, ports) ; 3 Réseau (IP, routage) ; 2 Liaison (Ethernet, MAC, VLAN) ; 1 Physique (câbles, signaux). En pratique, on diagnostique en remontant : couche 1 (lien physique ?), couche 2 (VLAN, duplex, erreurs de trames ?), couche 3 (adresse, passerelle, route ?), couche 7 (service, DNS ?). Chaque couche validée élimine la moitié des hypothèses restantes."  , schema: 'osi-fr-v2' },
                        { h: "Encapsulation : l'emboîtement russe", t: "Une donnée applicative s'emballe : segment (couche 4, en-tête TCP avec ports), paquet (couche 3, en-tête IP avec adresses), trame (couche 2, en-tête Ethernet avec MAC + FCS de contrôle). Chaque couche ne lit que son en-tête : un switch lit les MAC (couche 2), un routeur les IP (couche 3). Le FCS (Frame Check Sequence) en fin de trame détecte la corruption : c'est lui qui alimente les compteurs CRC — une trame abîmée par un câble défectueux est jetée et comptée." , img: 'images/ethernet-frame.svg', imgCaption: 'Structure de la trame Ethernet (domaine public, Wikimedia Commons) : préambule, SFD, MAC destination puis source, EtherType (0x0800 = IPv4, 0x86DD = IPv6), payload, FCS. Le FCS est le contrôle d\'intégrité qui alimente les compteurs CRC.' },
                        { h: "Ethernet et MAC", t: "Ethernet (IEEE 802.3) identifie chaque interface par son adresse MAC : 48 bits (6 octets, ex : 00:1A:2B:3C:4D:5E), les 24 premiers identifiant le constructeur (OUI). Le switch apprend les MAC source des trames entrantes pour bâtir sa table (show mac address-table) — une table qui « oscille » (la même MAC vue sur plusieurs ports) signale une boucle de couche 2." , schema: 'arp-resolution' }
                    ]},
                    { title: "Leçon 2 — Collision, duplex et CSMA/CD", parts: [
                        { h: "Half-duplex et le domaine de collision", t: "En half-duplex, une interface émet OU reçoit, jamais les deux : deux émissions simultanées sur le même segment produisent une collision. Le CSMA/CD (détection de collision) gère ce partage : écouter avant d'émettre, détecter la collision, attendre un temps aléatoire (backoff) et réessayer. Le hub — aujourd'hui disparu — forçait tout le monde en half-duplex : un seul domaine de collision pour tous ses ports." },
                        { h: "Full-duplex : la fin des collisions", t: "Avec un switch (une liaison dédiée par port) et le full-duplex, chaque sens a son propre fil : émettre et recevoir simultanément devient possible, et une collision est physiquement IMPOSSIBLE — CSMA/CD se désactive. En 2026, tout lien moderne est full-duplex : si vous voyez encore des collisions dans les compteurs, c'est qu'un lien quelque part est retombé en half (mismatch) ou qu'un hub ancien survit." },
                        { h: "Le duplex mismatch, l'ennemi invisible", t: "Un côté auto-négociation, l'autre forcé en full : l'interface auto se rabat en half. Le côté full ne fait pas de CSMA/CD (il n'écoute pas avant d'émettre) : les trames du côté half se heurtent à des émissions du côté full, et les compteurs affichent des late collisions et des erreurs CRC côté half — le tout SANS lien down : lenteur chronique, pas de panne franche. Correction : full (ou auto) des DEUX côtés, jamais un mélange." }
                    ]},
                    { title: "Leçon 3 — Le câblage : cuivre, fibre et limites", parts: [
                        { h: "Le paires torsadées et les catégories", t: "Cat5e (1 Gbps, 100 m), Cat6/6a (1-10 Gbps selon longueur), Cat7/8 (data centers). Le droit et le croisé : le câble croisé (crossover) reliait deux équipements identiques à l'Auto-MDIX absent ; l'Auto-MDIX moderne rend tous les câbles droits utilisables — mais un câble croisé de réserve dépanne encore les vieux équipements. La règle absolue : 100 m maximum par segment cuivre (90 m fixe + 10 m cordons)." },
                        { h: "La fibre pour la distance et l'immunité", t: "Monomode (single-mode, laser, jaune) : dizaines de kilomètres — interconnexions de sites, Fibre Channel longue distance. Multimode (LED/VCSEL, orange/aqua) : quelques centaines de mètres — liens intra-bâtiment entre étages. La fibre ne craint ni les interférences électromagnétiques ni la foudre, et traverse les environnements industriels. Les paires cuivre SFP permettent aussi cette transition sur les équipements existants." },
                        { h: "Les symptômes du câblage défaillant", t: "Câble trop long ou écrasé/gammé : erreurs CRC croissantes, liaisons qui tombent sous la charge (une liaison qui tient au ping mais échoue en transfert massif est la signature classique). Connecteur oxydé ou mal embouti : erreurs unilatérales. Le réflectomètre (OTDR) localise la casse exacte sur les fibres longues ; un simple testeur de câble suffit en cuivre LAN." }
                    ]},
                    { title: "Leçon 4 — Lire un port comme un professionnel", parts: [
                        { h: "show interfaces status : le tableau de bord", t: "Une ligne par port : nom, état (connected/notconnect/err-disabled), VLAN, duplex (a-full = auto-négocié), speed, type. C'est la PREMIÈRE commande devant tout incident réseau : en trois secondes, elle dit si le lien est là, à quelle vitesse, dans quel VLAN — et un err-disabled y claque tout de suite." },
                        { h: "show interfaces : les compteurs qui racontent", t: "Le détail d'une interface : les compteurs d'entrée/sortie (octets, paquets) et surtout les ERREURS : CRC (trames corrompues — câble, connecteur, carte), input errors (somme des erreurs entrantes), late collisions (duplex mismatch ou segment trop long), output errors (drops de sortie — lien saturé ou QoS). Un compteur est une SOMME DEPUIS LE DERNIER CLEAR : lire son évolution, pas son total." },
                        { h: "La méthode des compteurs", t: "(1) Noter les compteurs ; (2) clear counters Gi0/1 (les remet à zéro — sans impact sur le trafic) ; (3) générer du trafic (ping continu, iperf) ; (4) relire : quelques CRC en 30 secondes = câblage à corriger maintenant ; zéro = passer à la couche 3. Cette méthode remplace l'à-peu-près par une mesure." }
                    ]}
                ],
                guiSteps: [
                    { title: "Lire l'état des ports d'un switch", action: "Sur SW1 (Packet Tracer ou réel), en mode privilégié : show interfaces status. Parcourez le tableau : repérez les ports connected, leurs VLAN et leurs duplex.", observation: "Un port en a-full/a-1000 a tout négocié ; un port full sans le 'a-' est FORCÉ — croisez sa config avec l'équipement opposé (un full forcé face à un auto = mismatch probable). Un port notconnect attend un câble ; err-disabled claque la cause (fiche dédiée au centre de dépannage)." },
                    { title: "Créer un duplex mismatch et l'observer", action: "Dans Packet Tracer : sur SW1, forcez un port : duplex full, speed 100. Sur le PC opposé (carte configurée en auto), lancez un ping -t vers la passerelle. Puis show interfaces sur le port du switch.", observation: "Le lien reste up (aucune panne franche) mais les pings deviennent irréguliers. Les compteurs du côté half (la carte du PC négociée en half) accumulent late collisions et CRC : la lenteur silencieuse du mismatch, rendue visible." },
                    { title: "Remettre à zéro et mesurer proprement", action: "Corrigez : remettez le port du switch en auto (duplex auto, speed auto). clear counters sur le port, relancez un ping -t une minute, puis show interfaces Gi0/1 | include error|collision|CRC.", observation: "Tous les compteurs restent à zéro : la mesure propre confirme la correction. La démarche (clear → trafic → relire) est celle de tout diagnostic de couche 1-2 sérieux." },
                    { title: "Tester les limites de distance en simulation", action: "Dans Packet Tracer, connectez deux switchs avec un câble cuivre, puis observez les caractéristiques du lien. Comparez avec une fibre (connectez les ports SFP si disponibles).", observation: "Le cuivre est plafonné à 100 m par spécification ; la fibre multimode porte à 550 m et la monomode à des kilomètres. Dans un bâtiment : cuivre du poste à la prise du local, fibre entre les locaux techniques — la topologie standard de tout réseau structuré." }
                ],
                deepDive: [
                    { t: "Les états d'interface et leur signification immédiate", p: [
                        "up/up : lien et protocole actifs — le port fonctionne.",
                        "administratively down : shutdown posé — no shutdown à faire (ou à vérifier qui l'a posé et pourquoi).",
                        "down/down : aucun signal — câble, équipement opposé éteint, port mort. Vérifier les DEUX extrémités.",
                        "up/down (protocole down) : le signal est là mais la couche 2 ne monte pas — VLAN d'accès absent de la table (le cas classique du switch), encapsulation incohérente sur un lien routé.",
                        "err-disabled : le port s'est protégé (port-security, BPDU guard...) — voir la fiche dédiée."
                    ],
                    cmd: [
                        "show ip interface brief        # vue de tous les ports, état ligne/protocole",
                        "show interfaces Gi0/1 status   # VLAN, duplex, vitesse",
                        "show interfaces Gi0/1 | include CRC|collision|error   # compteurs",
                        "clear counters Gi0/1           # remise a zero avant mesure"
                    ],
                    box: 'remember', boxText: "À retenir : down/down = physique (câble/extinction), up/down = couche 2 (VLAN manquant, encapsulation), err-disabled = protection déclenchée. La commande pour départager en 3 secondes : show ip interface brief." },
                    { t: "CRC, late collisions, giants : traduire les compteurs", p: [
                        "CRC croissants : trames reçues corrompues — câble endommagé/long, connecteur, interface en fin de vie. Unilatéraux = un seul côté du lien à blâmer.",
                        "Late collisions : collisions détectées APRÈS les 512 premiers bits — segment trop long ou duplex mismatch (le full ne détecte pas, le half subit).",
                        "Giants/runts : trames hors gabarit (> 1518 / < 64 octets) — souvent une carte défaillante ou du trafic exotique (VLAN tag double : vérifier la config QoS).",
                        "Output drops : le port n'a pas suivi (buffers vides) — saturation légitime (débit à ajouter) plutôt que panne."
                    ],
                    box: 'admin', boxText: "Conseil d'administrateur : surveillez les compteurs d'erreurs dans votre supervision avec un seuil sur la PROGRESSION (erreurs/minute), pas sur le total. Un total de 3000 CRC qui ne bouge plus depuis un an est un souvenir ; 20 CRC par minute sur un lien = intervention aujourd'hui." },
                    { t: "Cas d'entreprise — le serveur lent du service RH", p: [
                        "Situation : le serveur RH est 'lent' depuis son déménagement de la semaine passée. Les utilisateurs parlent de 'réseau qui rame' ; l'inventaire signale un simple déplacement de bureau.",
                        "Diagnostic : show interfaces status sur le port du serveur : speed 100, duplex full (forcés par l'ancienne config du port de l'ancien bureau... restée sur la carte du serveur en auto de son côté → half négocié). Le ping répond, mais un transfert massif échoue par paliers.",
                        "Correction : passer la carte du serveur ET le port du switch en auto (ou full des deux) : la liaison négocie 1000 full, les late collisions tombent à zéro, le débit est multiplié par vingt.",
                        "Leçon : à chaque déménagement, la checklist couche 1-2 (port, VLAN, duplex) — le 'réseau lent' est très souvent un lien dégradé, pas un réseau saturé."
                    ],
                    box: 'case', boxText: "Devant une lenteur chronique d'un équipement précis : lire ses compteurs AVANT toute hypothèse. Câble/duplex défaillants = lenteur unilatérale ; saturation = drops symétriques. Le discriminant tient dans deux commandes." }
                ],
                exercices: [
                    { enonce: "Un lien entre un switch et un serveur affiche : côté switch, full-duplex 1 Gbps configurés manuellement ; côté serveur, carte en auto-négociation. Quels symptômes attendez-vous et sur quels compteurs, et quelle est la correction ?", correction: "La carte auto, ne recevant pas de négociation cohérente, se rabat en half-duplex : le lien monte (pas de panne franche) mais le serveur (half) voit ses émissions heurtées par celles du switch (full, qui n'écoute pas) — late collisions et CRC croissants côté serveur, lenteur asymétrique (le serveur émet mal, reçoit mieux). Correction : aligner — soit auto des deux côtés (recommandé : la négociation gère vitesse ET duplex), soit full/1000 fixés des deux côtés. Puis clear counters + mesure de contrôle : les compteurs doivent rester à zéro sous charge." },
                    { enonce: "Classer chaque incident à sa couche OSI et nommer la première commande de vérification : (a) 'Je ne peux pas ouvrir google.com mais l'intranet marche' ; (b) 'Le nouveau serveur ne ping rien, le voyant du port est éteint' ; (c) 'Les postes du 2e étage échangent entre eux mais pas avec le sous-sol' ; (d) 'La liaison fibre entre bâtiments montre 4000 CRC depuis ce matin'.", correction: "(a) Couche 7/3 : résolution DNS — nslookup google.com (et vérifier le DNS du poste). (b) Couche 1 : câble/port — show interfaces status (notconnect ou administratively down : brancher, no shutdown). (c) Couche 3 (voire 2) : routage inter-VLAN ou trunk — ping de la passerelle, puis show interfaces trunk côté étage. (d) Couche 1 : la fibre est endommagée (travaux, courbure trop serrée) — lecture des compteurs, test optique (puissance en dBm avec les DOM), remplacement de la section fautive. Chaque incident a sa couche : la trouver d'abord économise l'essentiel du diagnostic." }
                ],
                resume: "OSI est une grille de diagnostic : on remonte du câble (couche 1 : CRC, collisions, 100 m) à la trame (couche 2 : duplex, VLAN) puis au paquet (couche 3 : passerelle). Full-duplex élimine les collisions ; un duplex mismatch crée late collisions et CRC sans lien down. Les compteurs d'interface racontent tout — à condition de les remettre à zéro avant de mesurer. show interfaces status + show interfaces : les deux réflexes fondateurs du dépannage réseau.",
                suite: "Le sujet 1.2 élargit au socle moderne (virtualisation et conteneurs) avant que 1.3 n'installe le calcul d'adressage IPv4.",
            },
            {
                id: 'ccna-v2-1-2',
                certif: 'CCNA',
                parcours: 'CCNA',
                code: '1.2',
                title: 'Hyperviseurs, machines virtuelles et conteneurs',
                statut: 'brouillon à relire',
                why: "Presque toute infrastructure moderne est virtualisee. Savoir distinguer une VM d'un conteneur evite de mal dimensionner ou de mal depanner un service.",
                keyIdeas: [
                    "Un hyperviseur de type 1 (bare metal) s'execute directement sur le materiel ; un type 2 s'execute sur un systeme hote.",
                    "Une machine virtuelle embarque son propre systeme d'exploitation complet.",
                    "Un conteneur partage le noyau de l'hote et n'embarque que les bibliotheques de l'application : il est plus leger.",
                    "Chaque VM est isolee par l'hyperviseur, qui repartit CPU, memoire et stockage."
                ],
                schemaType: 'comparaison-vm-conteneur',
                guiProcedure: "Dans un hyperviseur graphique, creer une VM : choisir le type d'OS, allouer CPU et memoire, attacher un disque virtuel et une carte reseau virtuelle.",
                cliProcedure: [
                    { cmd: "virsh list --all", desc: "liste les machines virtuelles d'un hyperviseur KVM/libvirt, actives ou arretees" },
                    { cmd: "docker ps", desc: "liste les conteneurs en cours d'execution sur l'hote" },
                    { cmd: "Get-VM", desc: "liste les machines virtuelles Hyper-V sous PowerShell" }
                ],
                verification: { cmd: "virsh list --all  ou  docker ps", expected: "Les VM ou conteneurs attendus apparaissent avec leur etat (running ou shut off)" },
                pitfalls: [
                    "Confondre conteneur et VM : un conteneur ne peut pas avoir un noyau different de celui de l'hote.",
                    "Oublier que l'allocation memoire excessive d'un hyperviseur peut ralentir toutes les VM."
                ],
                vocab: [
                    { en: "hypervisor", fr: "hyperviseur" },
                    { en: "virtual machine (VM)", fr: "machine virtuelle" },
                    { en: "container", fr: "conteneur" },
                    { en: "host kernel", fr: "noyau de l'hote" }
                ],
                niveau: 'Débutant',
                prerequis: "Avoir une idée très grossière de ce qu'est un système d'exploitation (Windows, Linux), rien de plus.",
                objectifs: [
                    "Distinguer un hyperviseur de type 1 (bare metal) d'un hyperviseur de type 2 (hébergé)",
                    "Expliquer avec une analogie la différence entre une VM et un conteneur",
                    "Choisir entre VM et conteneur face à une situation concrète",
                    "Lister les VM (virsh, Get-VM) et les conteneurs actifs (docker ps) sur un hôte"
                ],
                links: { qcmId: 106, labId: 'lab-1', cheatSheetCat: 'Virtualisation' }
            },
            {
                id: 'ccna-v2-1-3',
                certif: 'CCNA',
                parcours: 'CCNA',
                code: '1.3',
                title: "Adressage IPv4 et sous-réseaux : la base de tout diagnostic IP",
                niveau: 'Débutant à intermédiaire',
                prerequis: "Aucun pour la lecture : le calcul est expliqué pas à pas. Le sujet 1.1 aide à comprendre le contexte (une panne IP commence souvent par un mauvais plan d'adressage).",
                objectifs: [
                    "Lire une adresse IPv4 et son masque (décimal et CIDR) sans hésiter",
                    "Découper un réseau /24 en plusieurs sous-réseaux égaux (/26, /28...) sans table toute prête",
                    "Calculer pour chaque bloc : adresse réseau, plage utilisable, adresse de diffusion",
                    "Appliquer le VLSM pour dimensionner des sous-réseaux de tailles différentes",
                    "Reconnaître en quelques secondes une passerelle « hors sous-réseau » et vérifier une configuration IPv4"
                ],
                lessons: [
                    { title: "Leçon 1 — L'adresse IPv4 et son masque", parts: [
                        { h: "32 bits, 4 octets", t: "Une adresse IPv4 est un nombre de 32 bits écrit en 4 octets décimaux (192.168.10.70). Chaque octet va de 0 à 255. Le masque de sous-réseau délimite deux parties : les bits de réseau (identiques pour tous les hôtes d'un même sous-réseau) et les bits d'hôte (identifient chaque machine). 255.255.255.0 (/24 en CIDR) signifie : les 24 premiers bits sont la partie réseau." },
                        { h: "Le calcul clé : la puissance de deux", t: "Si N bits restent pour la partie hôte, le sous-réseau contient 2^N adresses. /26 → 6 bits d'hôte → 64 adresses, dont 62 utilisables (on retire l'adresse réseau, tous les bits hôte à 0, et l'adresse de diffusion, tous les bits hôte à 1). /30 → 4 adresses → 2 utilisables : le bloc des liens point-à-point. /31 → 2 adresses : réservé aux liens RFC 3021. /32 → 1 adresse : une machine précise (règle d'ACL)." },
                        { h: "Les masques en clair", t: "/24 = 255.255.255.0 (256 adresses) ; /25 = 255.255.255.128 (128) ; /26 = 255.255.255.192 (64) ; /27 = 255.255.255.224 (32) ; /28 = 255.255.255.240 (16) ; /29 = 255.255.255.248 (8) ; /30 = 255.255.255.252 (4). Le pas entre deux sous-réseaux consécutifs vaut toujours la taille du bloc : 64 pour un /26." },
                        { h: "Adresses publiques, privées et spéciales", t: "Privées (RFC 1918, non routables sur Internet) : 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. Loopback : 127.0.0.0/8. APIPA : 169.254.0.0/16 — l'auto-adressage qui signale un échec DHCP. 0.0.0.0 = « n'importe où » (route par défaut). 255.255.255.255 = diffusion limitée locale." }
                    ]},
                    { title: "Leçon 2 — Subnetter pas à pas (méthode des blocs)", parts: [
                        { h: "La méthode en quatre gestes", t: "Pour découper 192.168.10.0/24 en /26 : (1) taille du bloc = 2^(32-26) = 64 ; (2) le pas est 64 — les blocs démarrent à .0, .64, .128, .192 ; (3) chaque bloc : adresse réseau = départ, diffusion = départ + 63 ; (4) utilisables = les 62 entre les deux. Exemple du bloc .128 : réseau 192.168.10.128, utilisables .129 à .190, diffusion .191 — PAS .255, qui appartient au dernier bloc." },
                        { h: "Savoir situer une adresse instantanément", t: "À quelle plage appartient 192.168.10.70/26 ? Les multiples de 64 : 0, 64, 128, 192. 70 est entre 64 et 127 → réseau 192.168.10.64, diffusion .127, passerelle possible de .65 à .126. Ce réflexe de « multiple le plus proche en dessous » est le cœur du subnetting." },
                        { h: "Le nombre de sous-réseaux", t: "Emprunter B bits au masque d'origine crée 2^B sous-réseaux. /24 → /26 emprunte 2 bits → 4 sous-réseaux. /24 → /28 emprunte 4 bits → 16 sous-réseaux de 16 adresses. Le plan d'adressage est toujours un arbitrage : beaucoup de petits blocs ou peu de grands." },
                        { h: "Le masque invalide", t: "Un masque doit être CONTIGU : des 1 puis des 0 (255.255.255.192 est valide ; 255.255.63.0 ne l'est pas). C'est pour cela que seuls les masques « pleins » /1 à /32 existent — pas de masque à trous." }
                    ]},
                    { title: "Leçon 3 — VLSM : des blocs à la demande", parts: [
                        { h: "Pourquoi le VLSM", t: "Le découpage égal gaspille : un lien point-à-point n'a besoin que de 2 adresses (/30), un réseau d'utilisateurs en veut 100 (/25). Le VLSM (Variable Length Subnet Mask) taille chaque sous-réseau selon son besoin réel — indispensable dès que l'espace d'adressage se raréfie." },
                        { h: "La règle d'or : du plus grand au plus petit", t: "On alloue d'abord les blocs les plus grands, puis on descend. Sur 192.168.1.0/24 : un service de 100 hôtes prend /25 (.0-.127) ; un service de 50 prend /26 (.128-.191) ; un lien WAN prend /30 (.192-.195) ; un autre lien /30 (.196-.199) ; le reste (.200+) reste disponible pour la croissance. Allouer dans le désordre fragmente l'espace et rend les blocs suivants impossibles." },
                        { h: "Vérifier son plan", t: "Un plan VLSM correct ne chevauche jamais : chaque adresse appartient à un seul bloc. Le test : écrire tous les blocs (réseau → diffusion) et vérifier qu'ils se suivent sans trou ni recouvrement. Ce tableau devient le document de référence du réseau — l'inventaire des VLAN, pools DHCP et ACL en découle." }
                    ]},
                    { title: "Leçon 4 — Diagnostiquer une adresse IP", parts: [
                        { h: "Les symptômes d'un adressage cassé", t: "Passerelle hors sous-réseau : le poste peut pinguer son voisin mais rien au-delà (sa passerelle est dans un autre bloc, le routage démarre mal). Deux hôtes se croyant dans le même bloc alors qu'un routeur les sépare : les pings partent et se perdent. Mauvais masque (un /25 au lieu d'un /24) : le poste croit des voisins locaux être locaux (ou l'inverse) et échoue sur les adresses de bord." },
                        { h: "La séquence de diagnostic", t: "ipconfig /all (Windows) ou ip a (Linux) : lire adresse, masque, passerelle. (1) La passerelle est-elle dans le bloc de l'hôte ? (2) Le poste peut-il pinguer la passerelle ? (3) Un ping vers l'extérieur révèle-t-il un problème de route ou de DNS ? Une « mauvaise passerelle » se voit en 5 secondes avec le réflexe des multiples." },
                        { h: "Interpréter les réponses de ping", t: "« Destination host unreachable » depuis la passerelle : pas de route vers la destination. « Request timed out » : le paquet part et se perd (route asymétrique, ACL silencieuse ou hôte muet). Réponse de 169.254.x.x : le poste n'a pas de bail DHCP — voir la fiche APIPA du centre de dépannage." }
                    ]}
                ],
                guiSteps: [
                    { title: "Lire sa configuration sous Windows", action: "Ouvrez l'invite de commandes (Windows+R, cmd) et tapez ipconfig /all. Repérez pour la carte active : adresse IPv4, masque, passerelle, serveurs DNS, bail DHCP obtenu.", observation: "Comparez le masque affiché (255.255.255.192 = /26) avec le plan d'adressage. Notez la date d'obtention du bail : un bail ancien avec une IP qui a changé de plan signale un pool DHCP périmé." },
                    { title: "Situater une adresse dans son bloc", action: "Avec l'adresse 192.168.10.70/26 obtenue : calculez les multiples de 64 (0, 64, 128, 192). Le plus proche inférieur à 70 est 64 : le réseau est 192.168.10.64, la diffusion 192.168.10.127.", observation: "La plage utilisable est .65 à .126 : la passerelle doit s'y trouver. Si ipconfig affiche 192.168.10.1 en passerelle, elle est HORS de votre bloc — voilà la panne." },
                    { title: "Vérifier sous Linux", action: "Sur un poste Linux : ip a affiche les interfaces et adresses ; ip route affiche la passerelle (via x.x.x.x) ; ping -c 3 <passerelle> teste la joignabilité locale.", observation: "ip route montre la route par défaut : si la passerelle via n'est pas dans le préfixe de votre interface (ex : dev eth0 192.168.10.70/26), le noyau refuse d'envoyer — l'équivalent Linux de la mauvaise passerelle Windows." },
                    { title: "Découper un /24 complet sur papier", action: "Prenez 172.16.5.0/24 et découpez-le : un bloc /25 (100 hôtes RH), un bloc /26 (50 hôtes IT), deux blocs /30 (liens WAN), le reste en réserve. Écrivez chaque bloc : réseau, première et dernière utilisable, diffusion.", observation: "Votre tableau doit se lire d'une traite : .0-.127 (/25 RH), .128-.191 (/26 IT), .192-.195 (/30 WAN1), .196-.199 (/30 WAN2), .200+ réserve. C'est exactement le document qu'on retrouve dans le dossier réseau d'une entreprise." }
                ],
                deepDive: [
                    { t: "Le tableau des puissances de deux — à connaître par cœur", p: [
                        "2^2 = 4 (lien /30) ; 2^3 = 8 (/29) ; 2^4 = 16 (/28) ; 2^5 = 32 (/27) ; 2^6 = 64 (/26) ; 2^7 = 128 (/25) ; 2^8 = 256 (/24).",
                        "Taille du bloc = 2^(32 - préfixe). Nombre de blocs d'un /24 = 256 ÷ taille.",
                        "Utilisables = taille - 2 (sauf /31 : 2 utilisables en RFC 3021, et /32 : une seule).",
                        "Le pas entre blocs = la taille du bloc : c'est le nombre à additionner pour passer d'un réseau au suivant."
                    ],
                    box: 'remember', boxText: "À retenir pour l'examen : adresse réseau = tous les bits hôte à 0 ; diffusion = tous à 1 ; utilisables = entre les deux. Un /26 = 64 adresses : 192.168.10.128/26 diffuse en .191, jamais en .255." },
                    { t: "Agrégation (supernetting) : résumer plusieurs réseaux", p: [
                        "Quatre /24 consécutifs (192.168.8.0/24 à 192.168.11.0/24) se résument en 192.168.8.0/22 : un seul préfixe, une seule route.",
                        "Condition : les blocs doivent être alignés sur leur taille (les quatre /24 commencent à un multiple de 4 dans le troisième octet) — sinon l'agrégat capte des réseaux étrangers.",
                        "Usage : la table de routage d'un FAI annonce 1000 clients derrière une poignée d'agrégats ; côté entreprise, l'agrégation réduit les tables et stabilise le routage."
                    ],
                    cmd: [
                        "! Sur un routeur : annoncer un agrégat plutôt que 4 routes",
                        "ip route 192.168.8.0 255.255.252.0 Null0   # ancre de l'agrégat",
                        "router ospf 1",
                        " network 192.168.8.0 0.0.3.255 area 0   # masque générique correspondant au /22"
                    ],
                    box: 'admin', boxText: "Conseil d'administrateur : dessinez vos plans d'adressage par blocs alignés dès le départ (tous les /24 d'un site dans le même /22). Les agrégats futurs en découleront naturellement, sinon ils seront impossibles." },
                    { t: "Cas d'entreprise — la passerelle fantôme", p: [
                        "Situation : un poste relocalisé vers un nouveau VLAN reçoit 192.168.10.70/26 mais garde la passerelle 192.168.10.1 des anciennes configs statiques.",
                        "Diagnostic : le ping vers 192.168.10.1 timeout alors que le voisin .71 répond. La passerelle .1 n'est pas dans le bloc .64-.127 : le poste n'a aucun routeur joignable — tout le hors-local échoue.",
                        "Action : corriger la passerelle (192.168.10.65, première utilisable du bloc), ipconfig /renew pour le pool. Prévention : la passerelle est TOUJOURS la première (ou la dernière) adresse du bloc — une convention d'entreprise évite l'improvisation."
                    ],
                    box: 'case', boxText: "La convention de passerelle (toujours .1 du bloc, ou .254) fait partie du plan d'adressage. Sans convention, chaque tech place la passerelle où il veut : les configs statiques deviennent un champ de mines." }
                ],
                exercices: [
                    { enonce: "Découpez 10.1.1.0/24 en sous-réseaux /26 et donnez, pour chaque bloc : adresse réseau, plage utilisable, adresse de diffusion. Un hôte en 10.1.1.130 est-il joignable depuis un hôte en 10.1.1.75 sans routeur ?", correction: "Blocs de 64, pas de 64 : (1) 10.1.1.0 réseau, .1-.62 utilisables, .63 diffusion ; (2) 10.1.1.64, .65-.126, .127 ; (3) 10.1.1.128, .129-.190, .191 ; (4) 10.1.1.192, .193-.254, .255. L'hôte .130 est dans le bloc .128-.191 et .75 dans le bloc .64-.127 : ils sont dans deux sous-réseaux différents — sans routeur, aucun échange direct (les broadcasts non plus). Un ping entre eux échoue silencieusement tant qu'aucune couche 3 ne relie les deux blocs." },
                    { enonce: "Plan VLSM sur 192.168.20.0/24 : 60 hôtes (production), 25 hôtes (développement), 10 hôtes (direction), 2 liens WAN. Proposez le découpage en allouant du plus grand au plus petit.", correction: "60 hôtes → /26 (64 adresses) : 192.168.20.0-.63 (production, .1-.62). 25 → /27 (32) : .64-.95 (développement, .65-.94). 10 → /28 (16) : .96-.111 (direction, .97-.110). 2 → /30 : .112-.115 (WAN1) et .116-.119 (WAN2). Reste .120-.255 en réserve. En allouant du plus grand au plus petit, chaque bloc est aligné sur sa taille et l'espace restant est contigu — un découpage dans le désordre aurait fragmenté la réserve." }
                ],
                resume: "Une adresse IPv4 = 32 bits partagés entre réseau et hôte par le masque. Taille d'un bloc = 2^(32-préfixe), utilisables = taille - 2, pas entre blocs = taille. Le VLSM alloue du plus grand au plus petit pour ne rien gaspiller ; l'agrégation résume des blocs alignés. Diagnostic : la passerelle doit être dans le bloc de l'hôte — c'est le premier réflexe devant un « réseau local OK, extérieur KO ».",
                suite: "Le sujet 1.4 transpose cette logique à IPv6 : préfixes /64, EUI-64, adresses link-local.",
            },
            {
                id: 'ccna-v2-1-4',
                certif: 'CCNA',
                parcours: 'CCNA',
                code: '1.4',
                title: "Adressage IPv6 : préfixes, SLAAC, EUI-64 et dépannage",
                niveau: 'Intermédiaire',
                prerequis: "Le sujet 1.3 (logique réseau/hôte des masques) : la même intuition s'applique, en 128 bits et sans masque décimal. Aucune expérience IPv6 requise.",
                objectifs: [
                    "Lire et abréger une adresse IPv6 (hextets, règle du :: unique)",
                    "Distinguer global unicast (2001::/3), link-local (fe80::/10), ULA (fd00::/8) et multicast (ff02::)",
                    "Justifier le /64 standard des LAN et dériver un identifiant EUI-64 depuis une MAC",
                    "Expliquer SLAAC, le rôle des Router Advertisement et le recours au DHCPv6",
                    "Activer le routage IPv6 sur un routeur Cisco et vérifier avec show ipv6 interface brief"
                ],
                lessons: [
                    { title: "Leçon 1 — Pourquoi IPv6 et comment le lire", parts: [
                        { h: "128 bits contre 32", t: "IPv4 offre ~4,3 milliards d'adresses : épuisées. IPv6 en offre 2^128 (~3,4 × 10^38) — assez pour adresser chaque appareil de la planète de nombreuses fois, ce qui supprime au passage le besoin de NAT. L'adresse s'écrit en 8 groupes de 4 chiffres hexadécimaux séparés par deux points : 2001:0db8:0000:0000:0000:0000:0000:0001." },
                        { h: "Les deux règles d'abréviation", t: "(1) Les zéros non significatifs de chaque groupe se suppriment : 0db8 → db8. (2) Une seule séquence de groupes nuls (la plus longue) se remplace par :: : l'adresse devient 2001:db8::1. La règle d'or : :: ne peut apparaître QU'UNE fois par adresse — sinon on ne sait plus combien de groupes ont été omis." },
                        { h: "La notation des préfixes", t: "IPv6 n'utilise plus de masque décimal : la longueur de préfixe en CIDR suit l'adresse (2001:db8:1::/64). Un /48 est typiquement alloué à un site (entreprise, foyer), découpé en /64 pour chaque réseau : un /48 fournit 65 536 réseaux de /64. Règle absolue des LAN : toujours /64 — les mécanismes auto (SLAAC, EUI-64) l'exigent." }
                    ]},
                    { title: "Leçon 2 — Les types d'adresses", parts: [
                        { h: "Globales unicast (GUUA)", t: "Préfixe 2000::/3 (adresses commençant par 2 ou 3). L'équivalent des adresses publiques IPv4 : routables sur Internet. 2001:db8::/32 est réservé à la documentation — utilisez-le dans vos labos et vos cours sans polluer l'Internet réel." },
                        { h: "Link-local (fe80::/10)", t: "Chaque interface IPv6 active s'auto-attribue une fe80:: — valable UNIQUEMENT sur le lien local (pas de routage). Elles servent aux protocoles de voisinage : OSPFv3 monte ses adjacences sur les link-local, NDP (le remplaçant d'ARP) fonctionne avec. En dépannage : l'interface peut avoir une fe80:: valide mais aucune adresse globale — le routeur n'annonce pas de préfixe (RA absent)." },
                        { h: "ULA et multicast", t: "ULA (Unique Local Address, fd00::/8) : l'équivalent privé des plages RFC 1918, pour des réseaux internes non connectés. Multicast : ff02::1 (tous les nœuds du lien), ff02::2 (tous les routeurs), ff02::5 (tous les routeurs OSPF). IPv6 remplace le broadcast par ces multicast bien ciblés — il n'y a PLUS d'adresse de diffusion en IPv6." },
                        { h: "Anycast", t: "Une même adresse affectée à plusieurs serveurs : le paquet atteint le plus proche en métrique de routage. Usage : résolveurs DNS racine (K-root, etc.) et CDN. Un anycast se configure comme une unicast — c'est le routage qui crée l'effet." }
                    ]},
                    { title: "Leçon 3 — Attribution : SLAAC, RA et EUI-64", parts: [
                        { h: "SLAAC : l'autoconfiguration sans serveur", t: "En SLAAC (StateLess Address AutoConfiguration), l'hôte construit son adresse globale seul : il écoute les Router Advertisement (RA) que le routeur émet périodiquement (ou en réponse à un Router Solicitation). Le RA annonce le préfixe (/64) ; l'hôte y colle son identifiant d'interface — soit dérivé de sa MAC (EUI-64), soit aléatoire (privacy extensions, par défaut sur les OS modernes). Aucun serveur à gérer : c'est le mode par défaut d'Internet IPv6." , schema: 'ipv6-slaac' },
                        { h: "EUI-64 : de la MAC à l'identifiant", t: "La MAC (48 bits) se coupe en deux moitiés, FFFE s'insère au milieu (48+16 = 64 bits), et le 7e bit du premier octet (bit U/L) s'inverse. MAC 00:1A:2B:3C:4D:5E → coupe en 001A:2B et 3C:4D:5E → insère FFFE → 001A:2BFF:FE3C:4D:5E → inverse le bit → 021A:2BFF:FE3C:4D:5E. L'identifiant complète le préfixe : 2001:db8:1::021A:2BFF:FE3C:4D:5E/64." },
                        { h: "DHCPv6 : stateless ou stateful", t: "Le routeur peut signaler dans ses RA deux autres modes : M-flag → DHCPv6 stateful (le serveur attribue tout, comme DHCPv4) ; O-flag → DHCPv6 stateless (l'hôte construit son adresse en SLAAC mais récupère les options — DNS — auprès du serveur). Sur Cisco : ipv6 nd other-config-flag (stateless) ou ipv6 nd managed-config-flag (stateful)." },
                        { h: "NDP, le remplaçant d'ARP", t: "Neighbor Discovery Protocol (ICMPv6) fait tout ce qu'ARP faisait et plus : résolution MAC (Neighbor Solicitation/Advertisement), détection de routeur (RS/RA), détection d'adresses dupliquées (DAD — l'hôte vérifie son unicité avant d'utiliser l'adresse) et découverte de préfixes obsolètes." }
                    ]},
                    { title: "Leçon 4 — Configurer et dépanner IPv6", parts: [
                        { h: "Sur le routeur Cisco", t: "ipv6 unicast-routing active le routage (sinon le routeur n'émet AUCUN RA — panne classique des labos). Interface : ipv6 address 2001:db8:10::1/64 (statique) ou ipv6 address 2001:db8:10::/64 eui-64 (identifiant auto depuis la MAC). Une interface avec seulement ipv6 enable obtient une link-local sans adresse globale." },
                        { h: "Vérifier", t: "show ipv6 interface brief : adresses par interface avec leur état (up/up ou down). show ipv6 interface g0/1 détaille : link-local, globale, groupes multicast, et surtout l'état du RA. show ipv6 route affiche la table (C pour connectés). Le ping IPv6 : ping 2001:db8:10::2 sous IOS, ping -6 sous Windows, ping6 sous Linux." },
                        { h: "Les pannes typiques", t: "Hôte avec fe80:: mais pas de globale : RA absent (ipv6 unicast-routing oublié sur le routeur, ou mauvaise interface). Ping link-local OK mais globale KO : routage non activé ou préfixe différent des deux côtés. Adresse valide mais pas de DNS : en SLAAC pur, les DNS viennent des options RDNSS du RA — selon les hôtes, il faut un DHCPv6 stateless pour les distribuer." }
                    ]}
                ],
                guiSteps: [
                    { title: "Observer les adresses IPv6 de son poste", action: "Sur votre poste (Windows : ipconfig ; Linux : ip a), repérez les adresses IPv6 de votre carte : une fe80:: (link-local) et probablement une 2xxx:: globale (si votre box distribue de l'IPv6).", observation: "Notez la globale : si elle change à chaque reconnexion, votre OS utilise les privacy extensions (identifiant aléatoire rotatif) — c'est voulu, pas une panne. La fe80:: est stable, dérivée de la MAC ou d'un identifiant aléatoire d'interface." },
                    { title: "Configurer un routeur IPv6 dans Packet Tracer", action: "Sur R1 : ipv6 unicast-routing (global), puis interface G0/0 : ipv6 address 2001:db8:10::1/64, no shutdown. Sur un PC connecté : Configuration d'adresse IPv6 en automatique (SLAAC).", observation: "Le PC obtient en quelques secondes une adresse 2001:db8:10::xxxx/64 — construite à partir du RA du routeur. Sans ipv6 unicast-routing, le PC ne recevrait RIEN : testez en le retirant pour voir la panne." },
                    { title: "Vérifier l'attribution et pinguer en IPv6", action: "Sur R1 : show ipv6 interface brief — l'interface affiche sa globale et sa link-local. Depuis le PC : ping 2001:db8:10::1.", observation: "Le ping IPv6 répond : le SLAAC a fonctionné de bout en bout. Notez que le PC a aussi des adresses ff02:: (multicast) : tous les nœuds écoutent ff02::1, les routeurs ff02::2." },
                    { title: "Tester l'EUI-64 manuellement", action: "Sur R1, configurez ipv6 address 2001:db8:20::/64 eui-64 sur G0/1, puis show ipv6 interface g0/1. Relevez la MAC de l'interface (show interfaces g0/1).", observation: "L'adresse affichée se termine par l'identifiant EUI-64 dérivé de la MAC (FFFE au milieu, 7e bit inversé). Vérifiez le calcul à la main : c'est l'exercice-type de l'examen." }
                ],
                deepDive: [
                    { t: "EUI-64 calculé pas à pas", p: [
                        "MAC de départ : 00:1A:2B:3C:4D:5E (48 bits).",
                        "Coupe en deux après 24 bits : 00:1A:2B | 3C:4D:5E.",
                        "Insère FFFE au milieu : 00:1A:2B:FF:FE:3C:4D:5E (64 bits).",
                        "Inverse le 7e bit du premier octet (0x00 → 0x02) : 02:1A:2B:FF:FE:3C:4D:5E.",
                        "Collé au préfixe 2001:db8:1::/64 : 2001:db8:1::021A:2BFF:FE3C:4D:5E."
                    ],
                    box: 'remember', boxText: "À retenir : insérer FFFE entre les deux moitiés de la MAC, inverser le bit U/L (7e bit du premier octet). Un identifiant qui contient ff:fe au milieu révèle un EUI-64 ; le bit U/L inversé fait passer le premier octet de pair à impair (00→02, 0A→08)." },
                    { t: "Choisir le mode d'attribution", p: [
                        "SLAAC pur : aucun serveur, l'hôte se débrouille avec les RA — le mode standard d'Internet IPv6, mais les DNS dépendent des options RDNSS (support inégal selon les OS anciens).",
                        "SLAAC + DHCPv6 stateless (O-flag) : adresses en SLAAC, options (DNS) par DHCPv6 — le compromèse courant en entreprise.",
                        "DHCPv6 stateful (M-flag) : le serveur attribue adresses ET options — contrôle total (journaux, réservations), au prix de la dépendance au serveur.",
                        "Le choix se déclare CÔTÉ ROUTEUR dans les RA : ipv6 nd managed-config-flag ou ipv6 nd other-config-flag."
                    ],
                    cmd: [
                        "interface GigabitEthernet0/0",
                        " ipv6 nd other-config-flag    ! SLAAC + options DHCPv6",
                        "show ipv6 interface GigabitEthernet0/0 | include RA|flags"
                    ],
                    box: 'admin', boxText: "Conseil d'administrateur : en entreprise, SLAAC + DHCPv6 stateless donne le meilleur des deux mondes — autoconfiguration robuste, DNS et traçabilité centralisés. Ne forcez le stateful que si vous devez réserver des adresses à des hôtes." },
                    { t: "Cas d'entreprise — le réseau « sans adresse globale »", p: [
                        "Situation : un labo IPv6 : les PC ont des fe80:: mais aucune 2001:db8:xx:: — impossible de pinguer au-delà du lien.",
                        "Diagnostic : show ipv6 interface brief sur R1 montre la globale correcte du routeur. Le détail : ipv6 unicast-routing n'a jamais été activé — le routeur ne route pas et n'émet AUCUN Router Advertisement.",
                        "Action : ipv6 unicast-routing, quelques secondes plus tard les RA partent, les PC construisent leurs globales, les pings passent. La panne la plus fréquente des labos IPv6 tient en une ligne de config oubliée."
                    ],
                    box: 'case', boxText: "Un hôte avec link-local mais sans globale = il n'a reçu aucun préfixe par RA. Les causes dans l'ordre : ipv6 unicast-routing absent, mauvaise interface, préfixe en /non-64 qui brise le SLAAC." }
                ],
                exercices: [
                    { enonce: "Abrégez 2001:0db8:0000:0000:00a1:0000:0000:0001 et vérifiez que le résultat est unique. Puis dérivez l'identifiant EUI-64 de la MAC 00:1B:44:11:3A:B7.", correction: "Abridé : les zéros de tête tombent (0db8→db8, 00a1→a1), puis la plus longue série de groupes nuls (les positions 3-4 et 6-8 — on prend la première, la plus longue : positions 3,4 et 6,7,8 forment deux séries ; les groupes 3 et 4 (0000:0000) et les groupes 6,7,8 (0000:0000:0001 — non, le groupe 8 vaut 0001)... : les groupes nuls sont 3,4,6,7 (le 8 vaut 1) — deux séries égales de longueur 2 et 2 ; on remplace la première par :: → 2001:db8::a1:0:0:1. ATTENTION : on ne peut remplacer qu'UNE série. EUI-64 : 00:1B:44 | 11:3A:B7 → insérer FFFE → 00:1B:44:FF:FE:11:3A:B7 → inverser bit U/L (00→02) → 02:1B:44:FF:FE:11:3A:B7." }
                ],
                resume: "IPv6 adresse en 128 bits (8 hextets, :: une seule fois), avec des types tranchés : globale 2000::/3, link-local fe80::, ULA fd00::, multicast ff02:: — plus de broadcast. Le /64 est la règle des LAN ; SLAAC construit les adresses depuis les RA du routeur (ipv6 unicast-routing obligatoire), EUI-64 dérive l'identifiant de la MAC (FFFE + bit inversé), DHCPv6 stateless/stateless complète les options. Dépannage : link-local sans globale = RA absent.",
                suite: "Le sujet 1.5 plonge dans le sans fil ; le 1.6 systématise le dépannage de connectivité côté client.",
            },
            {
                id: 'ccna-v2-1-5',
                certif: 'CCNA',
                parcours: 'CCNA',
                code: '1.5',
                title: "Le réseau sans fil Wi-Fi : des ondes à la sécurité WPA3",
                niveau: 'Débutant à intermédiaire',
                prerequis: "Aucun pour les leçons 1 à 4 (ondes et canaux). Les leçons 5 à 8 (architecture, sécurité, roaming) se comprennent mieux après les bases Ethernet du 1.1, mais restent lisibles seule.",
                objectifs: [
                    "Retracer l'évolution des normes 802.11 (a, b, g, n, ac, ax) et les nommer Wi-Fi 4/5/6",
                    "Choisir une bande (2,4 / 5 / 6 GHz) et planifier des canaux non superposés",
                    "Interpréter les mesures RF : dBm, SNR, débit, score de connexion",
                    "Distinguer SSID et BSSID, et décrire les 5 états d'association d'un client",
                    "Expliquer WEP, WPA2-PSK, WPA3-SAE et 802.1x/RADIUS, puis choisir selon le contexte",
                    "Décrire l'architecture lightweight/WLC/CAPWAP et les mécanismes de roaming",
                    "Dépanner un client Wi-Fi avec une méthode structurée (signal, association, DHCP)"
                ],
                lessons: [
                    { title: "Leçon 1 — Histoire et normes IEEE 802.11", parts: [
                        { h: "1997 : la première norme", t: "L'IEEE publie 802.11, le premier standard Wi-Fi : 2 Mbps en 2,4 GHz, avec deux méthodes physiques (DSSS et FHSS). Le nom « Wi-Fi » vient de la Wi-Fi Alliance, un consortium créé en 1999 pour certifier l'interopérabilité des équipements : le logo Wi-Fi sur une carte garantit qu'elle fonctionnera avec n'importe quel point d'accès certifié." },
                        { h: "La famille 802.11 lettre par lettre", t: "Chaque amendment ajoute une lettre au standard de base : 802.11b (1999, 11 Mbps, portée généreuse), 802.11a (1999, 54 Mbps en 5 GHz avec OFDM), 802.11g (2003, 54 Mbps rétrocompatible avec b en 2,4 GHz), 802.11n (2009, jusqu'à 600 Mbps grâce au MIMO — deux à quatre antennes), 802.11ac (2013, MU-MIMO en 5 GHz, canaux de 80/160 MHz), 802.11ax (2019, OFDMA et meilleure gestion des environnements denses)." },
                        { h: "Les noms commerciaux Wi-Fi 4/5/6/7", t: "Depuis 2018, la Wi-Fi Alliance renomme les normes pour le grand public : Wi-Fi 4 = 802.11n, Wi-Fi 5 = 802.11ac, Wi-Fi 6 = 802.11ax, Wi-Fi 6E = 802.11ax étendu à la bande 6 GHz, Wi-Fi 7 = 802.11be. Un client « Wi-Fi 6 » est donc simplement un client 802.11ax : c'est le même équipement, deux étiquettes." },
                        { h: "Ce que chaque génération a apporté", t: "802.11n a introduit le MIMO (plusieurs flux spatiaux : 2×2, 3×3), 802.11ac le MU-MIMO (un AP sert plusieurs clients simultanément en liaison descendante) et les canaux larges, 802.11ax l'OFDMA : découper chaque canal en petites unités de ressources attribuées à plusieurs clients à la fois — un gain majeur dans les salles de réunion et les stades, où des dizaines de clients partagent une même cellule." }
                    ]},
                    { title: "Leçon 2 — Les bandes 2,4, 5 et 6 GHz et les canaux", parts: [
                        { h: "La bande 2,4 GHz : trois canaux utiles", t: "La bande 2,4 GHz s'étend de 2,400 à 2,4835 GHz. Elle est découpée en canaux de 22 MHz espacés de 5 MHz : les canaux se superposent donc largement. Seuls les canaux 1, 6 et 11 (en Europe, où l'on trouve aussi le 13) ne se chevauchent pas — c'est la règle d'or d'un déploiement multi-AP en 2,4 GHz. Sa longueur d'onde est d'environ 12,5 cm : elle traverse relativement bien les murs, mais la bande est encombrée (Bluetooth, micro-ondes, baby-phones)." , img: 'images/wifi-channels.svg', imgCaption: 'Canaux 2,4 GHz et leur chevauchement (Wikimedia Commons, CC BY-SA) : chaque ellipse fait 22 MHz de large — seuls les canaux 1, 6 et 11 (en gras) ne se recouvrent pas ; les canaux adjacents se brouillent mutuellement.' },
                        { h: "La bande 5 GHz : de l'espace, avec des conditions", t: "Le 5 GHz offre beaucoup plus de canaux non superposés, répartis en plusieurs sous-bandes (UNII-1 : 36-48, UNII-2 : 52-64, UNII-2 étendue : 100-144, UNII-3 : 149-161). Longueur d'onde ~6 cm : meilleure capacité mais atténuation plus forte dans les murs. Certaines sous-bandes utilisent DFS (Dynamic Frequency Selection) : l'AP détecte le radar météo ou militaire et doit changer de canal — prévoir des canaux non-DFS pour les environnements critiques." },
                        { h: "La bande 6 GHz (Wi-Fi 6E)", t: "Wi-Fi 6E ouvre 1200 MHz supplémentaires en 6 GHz : jusqu'à 59 canaux de 20 MHz non superposés, réservés aux clients 6E (donc aucun legacy). C'est la bande à privilégier pour les déploiements denses neufs, à condition que les clients le supportent." },
                        { h: "Le plan de fréquences : la vraie compétence", t: "Déployer un Wi-Fi, c'est dessiner un plan de canaux : des AP voisins sur des canaux non superposés, une puissance maîtrisée (pas trop forte, sinon la couverture déborde sur les cellules voisines), et un recouvrement de 15 à 20 % entre cellules pour le roaming. Un mauvais plan (tous les AP sur le canal 6, par exemple) crée des interférences co-canal qui ralentissent tout le monde sans aucun message d'erreur." }
                    ]},
                    { title: "Leçon 3 — Puissance, dBm, SNR et interférences", parts: [
                        { h: "Le décibel et le dBm", t: "Le décibel compare deux puissances : dB = 10 × log10(P2/P1). Doubler la puissance d'émission = +3 dB ; la multiplier par 10 = +10 dB. Le dBm exprime une puissance absolue par rapport au milliwatt : 0 dBm = 1 mW. Les valeurs Wi-Fi sont négatives : -30 dBm (excellent, signal très fort) à -100 dBm (inutilisable)." },
                        { h: "Lire un niveau de signal", t: "Repères professionnels : -30 à -50 dBm = excellent ; -50 à -70 dBm = bon, suffisant pour la plupart des usages ; -70 à -85 dBm = moyen, débit réduit possible ; -85 à -100 dBm = faible, pertes et retransmissions ; en dessous de -100 dBm = connexion invivable. Un client à -76 dBm signalera des ralentissements : c'est un client en bord de cellule, pas forcément un équipement défaillant." },
                        { h: "Le SNR", t: "Le rapport signal sur bruit (SNR) = puissance du signal − puissance du bruit de fond, en dB. Au-dessus de 25-30 dB, la connexion est propre ; sous 15-20 dB, le débit s'effondre car le client doit réémettre. Exemple : signal -65 dBm avec un bruit à -90 dBm → SNR 25 dB, correct ; le même signal avec un bruit à -75 dBm (micro-ondes voisin) → SNR 10 dB, connexion instable." },
                        { h: "Les interférences et leurs sources", t: "Trois familles : co-canal (deux AP sur le même canal se disputent le temps d'antenne), canal adjacent (chevauchement partiel, dur à diagnostiquer sans outil d'analyse RF), et non-802.11 : fours à micro-ondes (2,4 GHz), Bluetooth, caméras sans fil. Le multipath (réflexions sur les murs métalliques) dégrade aussi le signal. Un débit qui tombe à 6 Mbps sur un client donné, avec un signal correct, oriente vers les interférences plutôt que vers la distance." }
                    ]},
                    { title: "Leçon 4 — SSID, BSSID et l'association d'un client", parts: [
                        { h: "SSID et BSSID", t: "Le SSID (Service Set Identifier) est le nom logique du réseau, jusqu'à 32 caractères, diffusé dans les balises (beacons) que l'AP émet toutes les ~100 ms. Le BSSID est l'adresse MAC de la radio qui porte ce SSID. Un seul AP peut diffuser plusieurs SSID (multi-BSSID) : par exemple « CORP » et « GUEST » sur la même borne physique, chacun dans son VLAN." },
                        { h: "Le dialogue association", t: "Le client cherche activement : il émet des probe requests sur chaque canal ; les AP répondent par des probe responses qui annoncent les SSID, la bande et les capacités de sécurité. Le client choisit, s'authentifie (802.11), s'associe (Association Request/Response), puis enchaîne l'authentification de sécurité (4-way handshake, SAE ou 802.1x) avant de demander une adresse par DHCP." },
                        { h: "Les cinq états d'un client", t: "Sur un contrôleur, la machine à états d'un client se lit : Start → Association → Authentication → DHCP → Online. Un client bloqué à « Association » = mauvais canal, capacité AP pleine ; bloqué à « Authentication » = PSK erroné ou RADIUS injoignable ; bloqué à « DHCP » = serveur DHCP down, VLAN DHCP absent ou pool épuisé. Cette lecture par états remplace la devinette par une démarche." }
                    ]},
                    { title: "Leçon 5 — Architecture WLAN : AP autonomes, lightweight et WLC", parts: [
                        { h: "AP autonome (autonomous)", t: "Un AP autonome configure tout lui-même : SSID, sécurité, VLAN. Idéal pour un petit bureau de 1 à 5 AP sans infrastructure centrale. Au-delà, chaque modification doit être répétée sur chaque borne — ingérable à l'échelle d'un campus de 1000 AP." },
                        { h: "Split-MAC et AP lightweight", t: "Dans l'architecture lightweight, l'AP ne garde que les fonctions temps réel 802.11 (balises, acknowledge, chiffrement des trames) et délègue l'authentification, les politiques et le roaming au WLC (Wireless LAN Controller) : c'est le split-MAC. L'AP et le WLC communiquent par un tunnel CAPWAP, chiffré en DTLS. L'AP s'adresse au WLC par discovery DHCP option 43, DNS (cisco-capwap-controller) ou broadcast ; si la version d'image ne correspond pas, le WLC pousse la bonne image et l'AP redémarre." },
                        { h: "Mobility group et contrainte de latence", t: "Plusieurs WLC forment un mobility group : les clients y roament sans réauthentification complète. Le RTT (aller-retour) entre AP et WLC doit rester sous ~100 ms : un WLC unique au bout d'un WAN intercontinental est une erreur classique de dimensionnement." },
                        { h: "Dimensionner la couverture", t: "Ordres de grandeur : en intérieur dense, un AP couvre ~12-15 m ; espacement ~25 m en 2,4 GHz avec 20 % de recouvrement. Antennes omnidirectionnelles au plafond pour couvrir un étage ; directionnelles pour couvrir un couloir ou un bâtiment à bâtiment. Un site survey (Ekahau, AirMagnet) produit la carte de chaleur (heatmap) qui valide le plan de canaux avant l'installation." }
                    ]},
                    { title: "Leçon 6 — Sécurité : de WEP à WPA3", parts: [
                        { h: "WEP : à bannir", t: "WEP (1999) utilise RC4 avec une clé statique courte : il est cassé depuis des années (cassage en minutes avec aircrack-ng). Aucune excuse de survie : un réseau WEP est un réseau ouvert. WPA (2003) a sauvé le matériel WEP avec TKIP, mais TKIP est lui aussi déprécié." },
                        { h: "WPA2-PSK et le 4-way handshake", t: "WPA2 chiffre en CCMP (AES). En mode personnel (PSK), la pré-clé partagée devient le PMK. Le 4-way handshake dérive ensuite les clés de session : (1) l'AP envoie un ANonce aléatoire ; (2) le client répond avec son SNonce et un MIC (contrôle d'intégrité) — chacun combine PMK + les deux nonces + les deux MAC pour fabriquer le PTK ; (3) l'AP vérifie le MIC, envoie le GTK (clé du broadcast/multicast) ; (4) le client confirme et installe les clés. Un mot de passe PSK erroné = échec au message 2, boucle de tentatives." },
                        { h: "WPA3-SAE", t: "WPA3 remplace le 4-way handshake par SAE (Simultaneous Authentication of Equals), issu du protocole dragonfly : la tentative de mot de passe doit se faire « sur le fil », rendant les attaques par dictionnaire hors ligne infaisables, et chaque session obtient ses propres clés (forward secrecy : compromettre une session ne compromet pas les autres). SAE impose PMF (802.11w) qui protège contre les floods de deauthentication. Le mode transition WPA2/WPA3 fait cohabiter les deux générations le temps du renouvellement du parc." },
                        { h: "Bonnes pratiques PSK", t: "En personnel : 20 caractères minimum, pas de phrase du dictionnaire, rotation ~90 jours, PSK distinct par usage (le PSK invité n'est pas le PSK des imprimantes). En entreprise : on passe au 802.1x (leçon 7) — le PSK partagé ne donne aucune traçabilité individuelle." }
                    ]},
                    { title: "Leçon 7 — L'authentification entreprise : 802.1x, EAP et RADIUS", parts: [
                        { h: "Les trois rôles 802.1x", t: "Le supplicant est le client qui demande l'accès ; l'authenticator (le WLC) est l'intermédiaire ; l'authentication server (RADIUS, par exemple Cisco ISE) valide les identifiants et renvoie Accept/Reject avec des attributs (VLAN, QoS, ACL). Le WLC ne valide jamais lui-même les mots de passe : il relaie. RADIUS écoute en UDP 1812 (authentification) et 1813 (accounting) ; le secret partagé WLC-RADIUS doit être identique des deux côtés." },
                        { h: "EAP, un framework", t: "EAP n'est pas une méthode mais un cadre qui transporte plusieurs méthodes : EAP-TLS (certificats des deux côtés, sécurité maximale), PEAP (certificat serveur + identifiants utilisateur dans le tunnel — courant avec Active Directory), EAP-TTLS (similaire, déploiements hétérogènes), EAP-FAST. EAP-MD5 est à proscrire (aucun chiffrement). Le flux complet : EAPOL-Start → EAP-Request/Identity → Access-Request RADIUS → Access-Challenge → mot de passe dans le tunnel → Access-Accept → 4-way handshake final avec le PMK issu de la session." },
                        { h: "WebAuth pour les invités", t: "Pour les invités et le BYOD sans configuration client : pas de sécurité couche 2, le client obtient une IP dans un VLAN isolé, toute requête HTTP est redirigée vers un portail captif (captive portal) qui valide un code ou un compte auprès du RADIUS, puis le WLC applique la politique. Prévoir l'isolation client (les invités ne se voient pas entre eux) et un VLAN dédié." },
                        { h: "VLAN dynamiques", t: "Le serveur RADIUS peut renvoyer des attributs qui placent chaque utilisateur dans le bon VLAN selon son profil : le stagiaire et le DSI se connectent au même SSID mais terminent dans des VLAN différents avec des droits différents. C'est la puissance du modèle entreprise : un SSID, des politiques par utilisateur." }
                    ]},
                    { title: "Leçon 8 — Le roaming", parts: [
                        { h: "Qui décide du roaming ?", t: "C'est le client (et lui seul) qui décide de changer d'AP : il surveille la dégradation du signal reçu et sonde les meilleurs candidats. Un roaming standard non optimisé prend 1-2 s. Ne jamais chercher à « forcer » un client du côté infrastructure sans comprendre ce mécanisme." },
                        { h: "Roaming intra et inter-contrôleur", t: "Entre deux AP du même WLC, la bascule est quasi transparente : le contrôleur met à jour l'association. Entre deux WLC du même mobility group, le schéma anchor/foreign s'applique : le WLC d'origine (anchor) garde la session et le client conserve son IP via un tunnel inter-contrôleurs, même si le nouveau WLC (foreign) est dans un autre VLAN. Hors mobility group : réauthentification complète, 1-2 s de coupure." },
                        { h: "Accélérer le roaming", t: "Trois techniques standards : OKC/key caching 802.11i (le client garde jusqu'à 8 paires AP/clé), CCKM (clés pré-distribuées entre WLC, clients certifiés CCX), et 802.11r Fast BSS Transition (pré-positionnement des clés, roaming sous 100 ms — indispensable pour la voix sur Wi-Fi)." },
                        { h: "Roaming raté : le symptôme classique", t: "Un utilisateur qui marche avec son portable voit son appel VoIP couper dans les couloirs : la couverture a des trous (recouvrement < 15 %) ou le seuil de roaming du client est trop bas (il s'accroche à un AP trop lointain). La correction est un travail de couverture (ajuster puissance/placement des AP), pas un paramètre magique côté WLC." }
                    ]},
                    { title: "Leçon 9 — Dépanner un client Wi-Fi avec méthode", parts: [
                        { h: "La méthode en quatre temps", t: "(1) Collecter : qui (un client, un groupe, tout le monde ?), quand, quel SSID, quel type de panne (impossible / lent / coupures). (2) Tester la connectivité : ping passerelle, nslookup, page web. (3) Enregistrer le résultat (état exact du client, dBm, SNR, débit). (4) Approfondir si besoin : event log du client sur le WLC, capture PCAP, diagnostics AP." },
                        { h: "Lire l'état du client sur le WLC", t: "Dans Client View : l'état (Start/Association/Authentication/DHCP/Online), le dBm, le SNR, le débit réel et le score de connexion (débit réel ÷ débit max). Un score à 20 % avec un signal excellent = bridage QoS volontaire ou interférence ; un score faible avec -85 dBm = problème de couverture." },
                        { h: "Plusieurs utilisateurs = problème d'AP", t: "Si tous les clients d'une même zone se plaignent, le problème est l'AP ou la cellule : vérifier la charge CPU/client de l'AP, l'utilisation du canal (interférence), l'état de la radio, le nombre de clients (capacité pleine = ajouter des AP ou faire du band steering vers 5 GHz). Un seul client = regarder son poste : pilote sans fil, profil enregistré obsolète, mauvais canal d'association." },
                        { h: "Le poste client aussi", t: "Côté client Windows : oublier le réseau puis se réassocier (élimine un profil PSK périmé), vérifier l'heure (des tickets d'authentification échouent si l'horloge est fausse), désactiver l'économie d'énergie de la carte Wi-Fi, mettre à jour le pilote. Sur un téléphone : oublier le réseau, vérifier la bande (2,4 GHz capté de loin mais lent)." }
                    ]}
                ],
                guiSteps: [
                    { title: "Découvrir le mode sans fil dans Packet Tracer", action: "Ouvrez Packet Tracer, déposez un AccessPoint-PT et deux PC. Sur chaque PC, cliquez sur l'onglet Physical et remplacez la carte réseau cuivre par une carte Wireless (WPC300N) : éteignez le PC, retirez le module, insérez la carte sans fil, rallumez.", observation: "Le PC affiche maintenant un lien sans fil avec l'AP : la diode de la carte passe au vert. Dans l'onglet Desktop > IP Configuration, le PC peut obtenir une adresse par DHCP si l'AP distribue un pool." },
                    { title: "Observer les informations sans fil du client", action: "Sur le PC sans fil, ouvrez Desktop > IP Configuration, puis revenez sur la vue du PC : dans le panneau de la carte réseau sans fil (ou via la table ARP de l'AP), relevez le SSID diffusé, la bande et le canal utilisés par défaut.", observation: "L'AP diffuse par défaut le SSID 'default' sur un canal donné en 2,4 GHz. Notez le canal : vous allez volontairement créer une interférence à l'étape suivante." },
                    { title: "Créer une interférence co-canal et l'observer", action: "Ajoutez un second AP à côté du premier, laissez-le sur le même canal par défaut. Placez un troisième PC à cheval entre les deux cellules et lancez un ping continu (Desktop > Command Prompt > ping -t vers l'IP de la passerelle).", observation: "Le ping devient lent ou perd des paquets : deux AP sur le même canal se partagent le temps d'antenne. C'est le symptôme le plus sous-estimé du Wi-Fi lent." },
                    { title: "Corriger le plan de canaux", action: "Cliquez sur le premier AP > Config > Port 1 : réglez le canal sur 1. Sur le second AP, réglez le canal sur 6. Relancez le ping du PC intermédiaire.", observation: "Le ping redevient stable : les canaux 1 et 6 ne se superposent pas. Vous venez d'appliquer la règle 1/6/11 sur un mini-déploiement réel." },
                    { title: "Sécuriser le WLAN en WPA2-PSK puis tester un mot de passe erroné", action: "Sur l'AP > Config > Wireless > WPA2-PSK : définissez une passphrase de 20 caractères. Sur un PC, Desktop > PC Wireless > Connect : choisissez le SSID, entrez un mot de passe volontairement erroné, puis le bon.", observation: "Avec le mauvais mot de passe, l'association échoue (état bloqué à l'authentification) ; avec le bon, le client obtient son IP. C'est exactement le comportement d'un client bloqué à l'état 'Authentication' sur un WLC réel." }
                ],
                deepDive: [
                    { t: "Le 4-way handshake de WPA2, message par message", p: [
                        "Avant tout échange, client et AP partagent le même secret : le PMK (Pairwise Master Key), qui en mode PSK est directement dérivé de la passphrase.",
                        "Message 1 (AP → client) : l'AP envoie son ANonce (nombre aléatoire).",
                        "Message 2 (client → AP) : le client répond avec son SNonce et un MIC d'intégrité. Chacun peut alors calculer le PTK = fonction(PMK, ANonce, SNonce, MAC AP, MAC client).",
                        "Message 3 (AP → client) : l'AP vérifie le MIC — un mot de passe erroné échoue ici — puis envoie le GTK (clé de broadcast) chiffré.",
                        "Message 4 (client → AP) : confirmation, installation des clés : PTK pour l'unicast, GTK pour le broadcast/multicast."
                    ],
                    box: 'remember', boxText: "À retenir pour l'examen : PMK (secret de long terme) → 4 messages avec nonces → PTK (unicast) et GTK (broadcast). Un client qui boucle sur 'Authentication' sur un SSID PSK = presque toujours un mot de passe erroné ou un mode de sécurité différent (WPA3 pur sur un client WPA2)." },
                    { t: "WPA3-SAE face au 4-way handshake", p: [
                        "Le 4-way handshake de WPA2 laisse capturer le handshake et tester la passphrase hors ligne, à l'infini, sans toucher au réseau.",
                        "SAE (dragonfly) impose un échange de type égal-à-égal : chaque tentative de mot de passe nécessite un échange sur le réseau — une attaque par dictionnaire devient lente et détectable.",
                        "Forward secrecy : compromettre la clé d'une session ne permet pas de déchiffrer les sessions suivantes.",
                        "PMF (802.11w) devient obligatoire : les trames de management sont protégées, neutralisant les floods de deauthentication qui coupaient les clients à distance."
                    ],
                    box: 'admin', boxText: "Conseil d'administrateur : en 2026, tout nouveau SSID personnel se configure en WPA3-SAE (ou WPA2/WPA3 transition tant que des clients anciens subsistent). Réservez le PSK pur aux usages contraints (imprimantes anciennes) et isolez-les dans un VLAN." },
                    { t: "Déroulé complet d'une connexion 802.1x", p: [
                        "Phase 1 — EAPOL entre client et WLC : EAPOL-Start, puis EAP-Request/Identity et EAP-Response/Identity.",
                        "Phase 2 — RADIUS entre WLC et serveur : Access-Request (transportant l'EAP), Access-Challenge (demande du secret), Access-Request (réponse), puis Access-Accept avec les attributs VLAN/QoS — ou Access-Reject.",
                        "Phase 3 — sur le poste : le 4-way handshake final avec le PMK issu de la session EAP, puis DHCP.",
                        "Post-authentification : le WLC applique les attributs (VLAN dynamique, ACL, QoS) ; un CoA (Change-of-Authorization) peut réévaliser la session en cours."
                    ],
                    cmd: [
                        "# Côté WLC/IOS : vérifier les serveurs RADIUS configurés",
                        "show radius statistics",
                        "# Côté switch (authentification filaire 802.1x) : état d'un port",
                        "show authentication sessions interface GigabitEthernet0/10",
                        "# Vérifier que le client 802.1x répond bien côté poste",
                        "netsh wlan show interfaces   # sous Windows : état, SSID, BSSID, canal, authentification"
                    ],
                    box: 'warn', boxText: "Erreur fréquente en entreprise : le WLC et le serveur RADIUS ne partagent pas le même secret, ou le mot de passe de compte AD est arrivé à expiration — le client boucle alors à l'état Authentication avec des EAP timeouts dans l'event log. Vérifiez aussi l'heure des équipements : une horloge fausse fait échouer des échanges authentifiés." },
                    { t: "Cas d'entreprise — ouverture d'un service RH au 2e étage", p: [
                        "Situation : 12 collaborateurs RH s'installent à l'étage 2, sur un zone aujourd'hui couverte par un seul AP 802.11n. Ils se plaignent d'un Wi-Fi lent et d'appels coupés dès qu'ils se déplacent.",
                        "Diagnostic : l'AP supporte ~25 clients sur un canal 2,4 GHz encombré (micro-ondes du coin cuisine) ; la couverture 5 GHz ne descend pas jusque dans les bureaux du fond ; le recouvrement entre cellules est nul côté couloir.",
                        "Action : ajouter deux AP Wi-Fi 6, plan de canaux 1/6/11 en 2,4 GHz réservé aux machines legacy, 5 GHz non-DFS pour les portables, band steering activé, 802.11r sur le SSID voix, power ajustée pour ~20 % de recouvrement.",
                        "Validation : heatmap post-déploiement, score de connexion > 70 % partout, test d'appel en itinérance sur le chemin le plus long."
                    ],
                    box: 'case', boxText: "La règle d'or du dimensionnement : un AP partagé entre trop de clients dégrade tout le monde, même avec un signal parfait. En environnement dense, multiplier les cellules à puissance réduite bat toujours un seul AP à pleine puissance." }
                ],
                exercices: [
                    { enonce: "Dans un open space, quatre AP couvrent le même plateau. Un audit révèle que tous sont sur le canal 6 en 2,4 GHz, et que les utilisateurs se plaignent de lenteur en milieu de journée. Expliquez le lien entre les deux faits et proposez un plan de canaux.", correction: "Quatre AP sur le même canal se partagent le même temps d'antenne : chacun ne peut émettre que lorsque les autres écoutent (CSMA/CA). En milieu de journée, avec tous les clients connectés, chaque cellule attend son tour — d'où la lenteur générale sans perte de signal. Plan correct : répartir les AP sur les canaux 1, 6 et 11 en 2,4 GHz (par exemple 1 / 6 / 11 / 1 si les cellules 1 et 4 ne se touchent pas), et pousser les portables en 5 GHz (band steering) où les canaux non superposés sont nombreux. Ajouter si besoin un cinquième AP à puissance réduite plutôt que de monter la puissance des quatre existants." },
                    { enonce: "Un utilisateur ne peut plus se connecter au SSID CORP depuis son portable, alors que ses collègues y arrivent. Le technicien voit dans l'event log du WLC : échecs répétés à l'état Authentication, erreur 'EAP timeout'. Décrivez votre diagnostic.", correction: "Ses collègues se connectent : le WLAN, le WLC et le RADIUS fonctionnent. Le problème est côté poste ou compte : (1) profil Wi-Fi stocké avec une méthode EAP obsolète ou un certificat expiré ; (2) horloge du poste fausse (échec de validation du certificat serveur) ; (3) compte AD verrouillé ou mot de passe expiré — vérifier côté RADIUS/ISE les rejets ; (4) pilote Wi-Fi trop ancien pour PEAP-MSCHAPv2 avec le protocole imposé. Démarche : oublier le réseau, ressynchroniser l'horloge (w32tm /resync), retenter en vérifiant les logs ISE ; si Access-Reject avec raison 'wrong password', traiter comme un ticket mot de passe ; sinon mettre à jour le pilote et le profil EAP." }
                ],
                resume: "Le Wi-Fi est une affaire de radio autant que de réseau : bandes et canaux non superposés, puissance maîtrisée, SNR suffisant. L'architecture moderne (AP lightweight + WLC via CAPWAP) centralise les politiques et le roaming ; la sécurité va de WEP (interdit) à WPA3-SAE et 802.1x/RADIUS en entreprise ; le dépannage suit les cinq états du client — Association, Authentication, DHCP, Online — et la règle : plusieurs utilisateurs touchés = problème d'infrastructure.",
                suite: "Le sujet 1.6 applique cette méthode de dépannage aux clients filaires et sans fil, et le domaine 4.0 traite la sécurité de niveau 2 en profondeur (DHCP snooping, DAI).",
            },
            {
                id: 'ccna-v2-1-6',
                certif: 'CCNA',
                parcours: 'CCNA',
                code: '1.6',
                title: 'Depanner la connectivite des clients filaires et sans fil',
                statut: 'brouillon à relire',
                why: "Quand un poste ne se connecte pas, il faut suivre un ordre logique : physique, adresse IP, passerelle, DNS, puis service. Sans methode, on change tout au hasard.",
                keyIdeas: [
                    "Verifier d'abord le lien physique (voyant, cable, association Wi-Fi).",
                    "Un poste avec une adresse 169.254.x.x n'a pas obtenu d'adresse par DHCP.",
                    "Un ping vers la passerelle isole le probleme local ; un ping vers un nom teste le DNS.",
                    "Le mot de passe Wi-Fi ou le type de securite errone empeche l'association."
                ],
                schemaType: 'diagramme-decision-client',
                guiProcedure: "Sous Windows, ouvrir les parametres reseau, afficher les proprietes de la connexion et verifier l'adresse, la passerelle et le DNS.",
                cliProcedure: [
                    { cmd: "ipconfig /all", desc: "affiche l'adresse, la passerelle, le DNS et le bail DHCP" },
                    { cmd: "ipconfig /release  puis  ipconfig /renew", desc: "demande une nouvelle adresse au serveur DHCP" },
                    { cmd: "ping <passerelle>", desc: "teste la connectivite locale" },
                    { cmd: "nslookup www.example.com", desc: "teste la resolution DNS" }
                ],
                verification: { cmd: "ping <passerelle>", expected: "Reponses regulieres ; sinon controler le cable ou le VLAN du port" },
                pitfalls: [
                    "Corriger le DNS alors que la passerelle est injoignable.",
                    "Oublier que l'heure systeme incorrecte peut bloquer certains services."
                ],
                vocab: [
                    { en: "link", fr: "lien" },
                    { en: "default gateway", fr: "passerelle par defaut" },
                    { en: "DHCP lease", fr: "bail DHCP" },
                    { en: "name resolution", fr: "resolution de noms" }
                ],
                niveau: 'Débutant à intermédiaire',
                prerequis: "Les sujets 1.1 et 1.3 : on y réutilise le duplex, l'adresse IP et la notion de passerelle.",
                objectifs: [
                    "Suivre une méthode de dépannage croissant dans les couches (physique → IP → passerelle → DNS)",
                    "Reconnaître une adresse 169.254.x.x et nommer sa cause (échec DHCP)",
                    "Tests guidés : ping passerelle, ipconfig /renew, nslookup",
                    "Expliquer pourquoi on ne corrige pas le DNS avant d'avoir vérifié la couche 1"
                ],
                links: { qcmId: 126, labId: 'lab-1', cheatSheetCat: 'Diagnostic réseau' }
            },
            {
                id: 'ccna-v2-1-7',
                certif: 'CCNA',
                parcours: 'CCNA',
                code: '1.7',
                title: "DHCPv4 : le bail, le relais et le pool — fonctionnement complet",
                niveau: 'Intermédiaire',
                prerequis: "Le sujet 1.3 (sous-réseaux, passerelle) est indispensable : un pool DHCP correspond toujours à un sous-réseau précis. Le 1.6 aide à reconnaître l'échec DHCP (adresse APIPA).",
                objectifs: [
                    "Dérouler la séquence DORA (Discover, Offer, Request, Acknowledge) trame par trame",
                    "Configurer un pool IOS complet : exclusions, passerelle, DNS, domaine, bail",
                    "Expliquer le relais DHCP (ip helper-address) et pourquoi les broadcasts ne franchissent pas un routeur",
                    "Choisir une durée de bail selon la population du réseau (visiteurs vs postes fixes)",
                    "Diagnostiquer : APIPA, pool épuisé, relais absent, conflit d'adresses, serveur non autorisé"
                ],
                lessons: [
                    { title: "Leçon 1 — DORA : le bail pas à pas", parts: [
                        { h: "Pourquoi DHCP", t: "Configurer chaque poste à la main (IP, masque, passerelle, DNS) est ingérable à l'échelle d'un parc. DHCP automatise l'attribution avec un bail (lease) : une adresse prêtée pour une durée définie, renouvelée à mi-vie (T1, 50 %) et rebindée à 87,5 % (T2). À l'expiration sans renouvellement, l'adresse retourne au pool." },
                        { h: "Les quatre messages", t: "Discover : le client émet en broadcast (src 0.0.0.0, dst 255.255.255.255) — « y a-t-il un serveur DHCP ? ». Offer : le(s) serveur(s) proposent une adresse (réservée brièvement). Request : le client BROADCAST son choix — il remercie publiquement le serveur retenu (et informe les autres serveurs qui avaient offert). Acknowledge : le serveur confirme avec les options (masque, passerelle, DNS, bail). Le broadcast du Request est une subtilité d'examen : le client n'a pas encore d'IP confirmée, il ne peut pas unicast." },
                        { h: "DHCPDISCOVER et le flag broadcast", t: "Certains clients ne peuvent pas recevoir d'unicast avant d'être configurés (pare-feu local) : le flag broadcast de DHCP force le serveur à répondre en 255.255.255.255. En capture Wireshark (bootp/dhcp), la séquence DORA se lit directement — un diagnostic DHCP se fait en 30 secondes de capture : Discover sans Offer = serveur/relais absent ; Offer sans Ack = conflit d'adresse détecté." }
                    ]},
                    { title: "Leçon 2 — Le pool sur un routeur Cisco", parts: [
                        { h: "La configuration type", t: "ip dhcp excluded-address 192.168.10.1 192.168.10.10 réserve les premières adresses aux équipements d'infrastructure. ip dhcp pool LAN10 crée le pool : network 192.168.10.0 255.255.255.0, default-router 192.168.10.1, dns-server 10.1.1.10 10.1.1.11, domain-name lab.lan, lease 8. Un pool = un sous-réseau : les options (passerelle, DNS) ne doivent jamais mélanger des adresses d'un autre bloc." },
                        { h: "Les exclusions, une discipline", t: "Toute adresse statique du sous-réseau (serveurs, imprimantes, passerelles, équipements réseau) doit être exclue du pool — sinon le serveur peut la prêter et créer un conflit d'adresse (deux MAC, une IP : connexions qui tombent aléatoirement). Le réflexe : à chaque réservation statique, on l'ajoute aux exclusions dans la foulée." },
                        { h: "Le bail, une décision de dimensionnement", t: "Bail court (1-6 h) : parfaits pour les visiteurs et les réseaux denses à forte rotation — le pool se recycle vite. Bail long (2-8 jours) : postes fixes d'entreprise — moins de trafic de renouvellement. L'erreur classique : bail de 8 jours sur un réseau d'invités : le pool se sature avec les adresses des visiteurs partis (voir la fiche « pool épuisé » du centre de dépannage)." }
                    ]},
                    { title: "Leçon 3 — Le relais : franchir le routeur", parts: [
                        { h: "Le problème du broadcast", t: "Le Discover est un broadcast : par définition, un routeur ne le transmet PAS. Un serveur DHCP centralisé derrière un routeur ne voit donc jamais les clients des autres sous-réseaux — sauf si l'interface du routeur relaie : ip helper-address 10.1.1.10 sur l'interface du réseau client. Le routeur transforme le broadcast en unicast vers le serveur (source : lui-même), et relaie la réponse." },
                        { h: "La magie du giaddr", t: "Dans le Discover relayé, le routeur inscrit son adresse d'interface (giaddr, gateway IP address) : le serveur DHCP lit ce champ pour choisir le BON pool. Sans giaddr, le serveur ne saurait pas quel sous-réseau servir. C'est aussi pour cela qu'un serveur unique sert des dizaines de sous-réseaux : un pool par giaddr possible." },
                        { h: "Helper et autres protocoles", t: "ip helper-address relaie DHCP mais aussi par défaut quelques autres UDP : TFTP, DNS, NetBIOS, NTP... La liste se restreint avec no ip forward-protocol udp <port>. En pratique, un helper par interface cliente vers le serveur DHCP (et éventuellement le serveur TFTP pour le provisioning téléphonique)." }
                    ]},
                    { title: "Leçon 4 — Vérifier et dépanner", parts: [
                        { h: "Les commandes de vérité", t: "show ip dhcp binding : les baux attribués (adresse, MAC, expiration). show ip dhcp pool : l'état du pool (utilisé, libre, le prochain à attribuer). show ip dhcp conflict : les conflits détectés (ping de vérification par le serveur). debug ip dhcp server events trace les allocations en temps réel." },
                        { h: "L'APIPA raconte l'échec", t: "Un client en 169.254.x.x a émis Discover et n'a rien reçu : soit le serveur est down/saturé, soit le relais manque, soit le port est dans le mauvais VLAN. La démarche complète est fiche « DHCP — postes en 169.254.x.x » du centre de dépannage : segment seul ou étage entier ? port/VLAN ? serveur ? relais ?" },
                        { h: "Serveur Windows : l'autorisation", t: "Un serveur DHCP Windows refuse de distribuer s'il n'est pas autorisé dans l'AD (protection contre les serveurs pirates qui casseraient un réseau). Symptôme : le service tourne, aucun bail n'est émis. Vérification : console DHCP, flèche rouge sur le serveur = non autorisé → Autoriser avec les droits d'admin du domaine." }
                    ]}
                ],
                guiSteps: [
                    { title: "Configurer le pool sur un routeur IOS", action: "Sur R1 : ip dhcp excluded-address 192.168.10.1 192.168.10.10, puis ip dhcp pool LAN10 ; network 192.168.10.0 255.255.255.0 ; default-router 192.168.10.1 ; dns-server 10.1.1.10 ; lease 8.", observation: "show ip dhcp pool affiche le pool LAN10, sa plage, 0 baux utilisés. La ligne 'Next address to allocate' montre la première adresse distribuée — après l'exclusion, elle doit démarrer à .11." },
                    { title: "Observer DORA en direct", action: "Dans Packet Tracer, passez en mode Simulation (filtre DHCP/BOOTP). Sur PC1 en IP automatique, cliquez renouveler/obtenir.", observation: "La chronologie affiche Discover (broadcast) → Offer (serveur → client) → Request (broadcast du client) → ACK. Le broadcast des messages 1 et 3 se voit dans la colonne destination : 255.255.255.255. C'est DORA rendu visible." },
                    { title: "Relayer vers un serveur distant", action: "Déplacez le serveur DHCP sur un autre sous-réseau (10.1.1.0/24). Sur R1, interface G0/0 du réseau client : ip helper-address 10.1.1.50. Le PC reprend une IP.", observation: "Sans helper, le PC reste en APIPA (Discover mort au niveau du routeur). Avec le helper, le Discover devient unicast vers 10.1.1.50, le giaddr (10.1.1.1 ou l'IP de l'interface) indique au serveur quel pool servir. Enlevez le helper pour voir revenir l'APIPA : la panne et sa cause en un geste." },
                    { title: "Vérifier les baux et tester un conflit", action: "Sur R1 : show ip dhcp binding (les baux avec MAC et expiration), show ip dhcp conflict. Configurez ensuite une IP statique .11 sur un poste alors que le pool la distribue.", observation: "Le conflit apparaît dans show ip dhcp conflict après la détection (ping du serveur) : le serveur marque l'adresse et en distribue une autre. C'est la démonstration de pourquoi les adresses statiques doivent être exclues du pool." }
                ],
                deepDive: [
                    { t: "DORA trame par trame (vue Wireshark)", p: [
                        "Discover : src 0.0.0.0:68 → dst 255.255.255.255:67 (UDP). Le client n'a encore AUCUNE adresse.",
                        "Offer : serveur → client (unicast ou broadcast selon le flag) : adresse proposée, options, temps de bail.",
                        "Request : le client renvoie en BROADCAST son choix — il remercie le serveur élu et désiste les autres offres simultanées.",
                        "Ack : confirmation finale avec toutes les options. Le client configure son IP ; l'entrée passe en bail actif (show ip dhcp binding).",
                        "En capture : deux Offers (deux serveurs) puis un seul Ack signent un environnement multi-serveurs — fréquent en entreprise pour la redondance."
                    ],
                    cmd: [
                        "show ip dhcp binding",
                        "show ip dhcp pool",
                        "show ip dhcp conflict",
                        "debug ip dhcp server events   # desactiver ensuite : undebug all"
                    ],
                    box: 'remember', boxText: "À retenir : Discover et Request sont en broadcast ; l'Offer réserve l'adresse ; le renouvellement se fait à 50 % du bail (T1) en unicast direct au serveur ; à 87,5 % (T2), le client rebind en broadcast vers n'importe quel serveur." },
                    { t: "Dimensionner pools et exclusions : la checklist", p: [
                        "Inventaire des statiques du sous-réseau (passerelles, serveurs, imprimantes, équipements réseau) → plage d'exclusion dédiée, ex : .1 à .20.",
                        "Population réelle + croissance : un /24 (253 utiles) pour 180 postes n'a plus de marge — prévoir dès 70 % d'occupation.",
                        "Durée de bail par population : visiteurs 2-6 h, collaborateurs 2-8 jours, téléphones 1-3 jours (rotation en cas de remplacement).",
                        "Redondance : deux serveurs avec des plages disjointes (ex : serveur A = .21-.140, serveur B = .141-.250) — aucun des deux ne peut prêter l'adresse de l'autre."
                    ],
                    box: 'admin', boxText: "Conseil d'administrateur : documentez chaque étendue comme un tableau à quatre colonnes (sous-réseau, plage du pool, exclusions, bail). Le jour où 'plus personne n'a d'adresse', ce tableau tranche en 2 minutes entre saturation, exclusion accidentelle et relais cassé." },
                    { t: "Cas d'entreprise — la lenteur de 9h un lundi", p: [
                        "Situation : lundi 9h, 40 tickets 'lent' à la connexion. Les postes finissent par obtenir une adresse mais après 30-60 s d'attente, et le Wi-Fi en est le plus affecté.",
                        "Diagnostic : l'attente se produit sur les postes qui changent de segment (Wi-Fi ↔ filaire) : leur bail du réseau précédent est encore vivant côté serveur, le Discover parcourt, le serveur répond, mais le client refuse les offres hors de son sous-réseau d'origine (phase de rebind) avant d'accepter. La capture montre plusieurs Discover/Offer avant le Request.",
                        "Action : raccourcir le bail des populations mobiles (8 jours → 4 h) et activer le 'release on logout' du client si pertinent. Lundi suivant : plus rien.",
                        "Leçon : le bail n'est pas un paramètre par défaut à laisser : c'est un choix de conception qui conditionne l'expérience des populations nomades."
                    ],
                    box: 'case', boxText: "Une connexion lente du lundi matin sur les postes mobiles est souvent un problème de BAIL, pas de bande passante : le client s'accroche à son ancien bail avant d'accepter le nouveau. Raccourcir les baux des nomades règle en général la moitié des tickets 'Wi-Fi lent'." }
                ],
                exercices: [
                    { enonce: "Un client émet des Discover qu'un sniffer placé sur son segment voit, mais aucune réponse n'arrive. Le serveur DHCP (Windows, 10.1.1.50) est sur un autre sous-réseau, up et jouable au ping depuis le routeur client. Diagnostic et correction.", correction: "Le Discover est un broadcast : le routeur ne l'a pas transmis (pas de relais configuré), donc le serveur ne l'a jamais vu — le ping du serveur depuis le routeur ne prouve rien pour DHCP. Correction : sur l'interface du routeur côté client, ip helper-address 10.1.1.50. Le routeur relaie alors le Discover en unicast avec son giaddr (l'IP de l'interface cliente) : le serveur choisit le pool du sous-réseau client et la réponse revient relayée. Vérification : le client obtient son bail, show ip dhcp binding côté serveur liste l'entrée." },
                    { enonce: "Un réseau invités /24 a 253 adresses, bail 8 jours. Chaque salon hebdomadaire amène 60 visiteurs avec 2 appareils connectés (téléphone + PC). Après quelques semaines, les nouveaux arrivants restent en APIPA. Expliquez et proposez deux corrections, l'une immédiate, l'autre structurelle.", correction: "Chaque semaine, 120 bails de 8 jours s'empilent : au bout de 2-3 semaines, les 253 adresses sont toutes 'prises' par des visiteurs partis depuis longtemps — le serveur n'a plus rien à offrir, nouveaux arrivants en APIPA. Immédiate : purger les baux actifs à l'issue du salon (Remove-DhcpServerv4Lease / clear des baux sur l'étendue invités). Structurelle : réduire le bail de l'étendue invités à 2-4 h — les adresses se recyclent naturellement dans la journée ; 253 adresses avec rotation rapide suffisent largement à 120 visiteurs simultanés." }
                ],
                resume: "DHCP attribue des baux par DORA : Discover et Request en broadcast, Offer et Ack par le serveur. Un pool = un sous-réseau, avec exclusions de toutes les adresses statiques et un bail dimensionné à la population. Le relais (ip helper-address + giaddr) transporte les broadcasts vers un serveur centralisé. Vérités : show ip dhcp binding/pool/conflict ; l'APIPA signale un Discover resté sans réponse.",
                suite: "Les fiches suivantes (2.1 et suivantes) appliquent ces bases aux VLAN et à la commutation.",
            },
            {
                id: 'ccna-v2-2-1',
                certif: 'CCNA',
                parcours: 'CCNA',
                code: '2.1',
                title: "VLAN et trunks 802.1Q : segmenter un commuté",
                niveau: 'Débutant à intermédiaire',
                prerequis: "Les sujets 1.1 (commutation) et 1.3 (sous-réseaux) : un VLAN se comprend bien comme un sous-réseau logique posé sur l'infrastructure physique.",
                objectifs: [
                    "Expliquer ce qu'apporte un VLAN : cloisonnement couche 2, domaines de diffusion réduits, sécurité",
                    "Créer des VLAN, affecter des ports d'accès nommés, vérifier avec show vlan brief",
                    "Configurer un trunk 802.1Q, comprendre le tag, le VLAN natif et la liste autorisée",
                    "Reconnaître les pannes classiques : trunk d'un seul côté, VLAN natif différent, VLAN manquant",
                    "Décrire le routage inter-VLAN (router-on-a-stick et SVI de switch couche 3)"
                ],
                lessons: [
                    { title: "Leçon 1 — Pourquoi segmenter en VLAN", parts: [
                        { h: "Le problème du réseau à plat", t: "Un commutateur relie tout le monde au niveau 2 : une trame de diffusion (broadcast) envoyée par un poste atteint les 400 autres postes du plateau. ARP, DHCP, les annonces Windows s'accumulent : c'est la tempête silencieuse qui ralentit tout le monde. Le VLAN (Virtual LAN) découpe logiquement ce commutateur en îlots : un broadcast VLAN 10 ne sort jamais du VLAN 10." , schema: 'vlan-segmentation' },
                        { h: "Un VLAN = un domaine de diffusion = (souvent) un sous-réseau", t: "La règle d'architecture : un VLAN correspond à un sous-réseau IP (VLAN 10 = 192.168.10.0/24, VLAN 20 = 192.168.20.0/24). Deux postes de VLAN différents peuvent être branchés sur le même switch : ils ne communiqueront jamais directement — il faut un routeur ou un switch couche 3 pour passer de l'un à l'autre." },
                        { h: "Ce que ça apporte en entreprise", t: "Sécurité : la comptabilité et les invités ne partagent plus le même espace broadcast — impossible d'écouter le trafic de l'autre VLAN. Performance : moins de broadcast, moins de charge CPU sur les postes. Organisation : l'affectation se fait par port, par adresse MAC ou par 802.1x, indépendamment de la prise murale où branche l'utilisateur." },
                        { h: "Les plages de VLAN", t: "VLAN 1 : par défaut, tous les ports y vivent à la sortie d'usine — on ne l'utilise pas en production. VLANs normaux : 2-1001. VLANs étendus : 1006-4094 (réservés en interne aux protocoles, utilisables avec VTP v3 ou en mode transparent). Les VLAN 1002-1005 sont historiquement réservés (Token Ring, FDDI)." }
                    ]},
                    { title: "Leçon 2 — Créer des VLAN et affecter des ports d'accès", parts: [
                        { h: "Créer le VLAN et le nommer", t: "Sur IOS : vlan 10 puis name RH créent le VLAN avec un nom explicite. Un VLAN créé mais non affecté à un port reste inutilisé. Le nommage compte : dans trois ans, 'show vlan brief' doit se lire comme un plan d'adressage, pas comme une devinette." },
                        { h: "Le port d'accès", t: "switchport mode access fixe le port dans un seul VLAN ; switchport access vlan 10 l'y range. C'est le mode des ports vers les postes, imprimantes, caméras. Un poste connecté à un port d'accès VLAN 10 reçoit une IP du sous-réseau du VLAN 10 — vérifiez que le serveur DHCP a bien un pool (ou un relais) pour ce sous-réseau." },
                        { h: "Vérifier", t: "show vlan brief affiche la table VLAN/port : chaque VLAN, son nom, son état (active) et les ports membres. show interfaces switchport détaille un port : mode access, VLAN d'accès, VLAN voix. C'est la première commande à lancer avant toute accusation de 'panne réseau'." },
                        { h: "Le VLAN voix", t: "Sur un port de poste, switchport voice vlan 50 attribue un second VLAN dédié à un téléphone IP : le PC et le téléphone partagent le même port mais vivent dans deux VLAN — la voix est isolée des données et priorisée en amont." }
                    ]},
                    { title: "Leçon 3 — Le trunk 802.1Q et le tag", parts: [
                        { h: "Pourquoi un trunk", t: "Entre deux commutateurs, il faudrait sinon un câble par VLAN. Le trunk multiplexe tous les VLAN sur un seul lien : chaque trame part avec une étiquette de 4 octets (le tag 802.1Q) qui porte le VLAN d'origine, et le commutateur en face retire l'étiquette avant de délivrer la trame sur les ports d'accès du bon VLAN." },
                        { h: "Le VLAN natif", t: "Sur un trunk 802.1Q, une trame du VLAN natif circule non étiquetée. Par défaut c'est le VLAN 1 — mauvaise idée : on le change des deux côtés (switchport trunk native vlan 99) vers un VLAN dédié, inutilisé par le trafic utile. Un mismatch de VLAN natif entre deux extrémités fait circuler des trames d'un VLAN vers un autre sans erreur visible : c'est un trou de sécurité silencieux (attaque du VLAN hopping par double tag)." },
                        { h: "La liste des VLAN autorisés", t: "switchport trunk allowed vlan 10,20,30 limite le trunk aux seuls VLAN utiles. Par défaut, un trunk accepte tous les VLAN 1-4094 : un VLAN de test créé sur un switch se propage partout. En production on restreint explicitement, et on ajoute au besoin : switchport trunk allowed vlan add 40." },
                        { h: "DTP, la négociation automatique", t: "Dynamic Trunking Protocol négocie le mode trunk automatiquement (dynamic auto / dynamic desirable). Les combinaisons trunk + desirable et desirable + desirable forment un trunk ; auto + auto ne fait rien. En production : switchport nonegotiate et modes explicits des deux côtés — on veut du déterminisme, pas de la déduction." }
                    ]},
                    { title: "Leçon 4 — Le routage inter-VLAN", parts: [
                        { h: "Router-on-a-stick", t: "Un seul lien routeur-switch, configuré en trunk côté switch, avec une sous-interface par VLAN côté routeur : interface G0/0.10, encapsulation dot1Q 10, ip address 192.168.10.1 255.255.255.0. Le routeur route entre les sous-réseaux ; tout le trafic inter-VLAN passe par ce lien unique — simple à comprendre, gourmand en débit sur ce lien." },
                        { h: "Le switch couche 3 et les SVI", t: "Sur un switch multicoche (Catalyst 3650/3850), une interface vlan 10 avec une IP joue la passerelle du VLAN 10 : c'est une SVI (Switch Virtual Interface). Le routage inter-VLAN se fait dans le switch, sans routeur externe, à la vitesse du backplane. ip routing active la fonction. C'est le design standard des réseaux d'entreprise modernes." },
                        { h: "Vérifier le chemin complet", t: "Le poste doit pinguer sa passerelle SVI, puis la passerelle du VLAN distant. show ip route sur le switch L3 doit montrer les réseaux connectés (C) de chaque VLAN. Un ping inter-VLAN qui échoue alors que les deux passerelles répondent = chercher une ACL entre les deux." }
                    ]}
                ],
                guiSteps: [
                    { title: "Créer les VLAN dans Packet Tracer", action: "Ouvrez SW1 (switch 2960) > onglet Config > VLAN Database : cliquez Add et créez le VLAN 10 nommé RH, puis le VLAN 20 nommé IT. En bas, la ligne de commande équivalente s'affiche au fur et à mesure.", observation: "La table VLAN se remplit : VLAN 1 (default), 10 RH, 20 IT. Comparez avec 'show vlan brief' dans l'onglet CLI : même information, deux vues." },
                    { title: "Affecter les ports d'accès", action: "Toujours dans Config > FastEthernet0/1 (connecté à PC-RH) : mettez le port Access et sélectionnez le VLAN 10. Répétez pour Fa0/2 vers PC-IT en VLAN 20.", observation: "PC-RH reçoit maintenant une IP du pool du VLAN 10 s'il y a un serveur DHCP ; sinon configurez des IP statiques 192.168.10.2/24 et 192.168.20.2/24. Le ping entre les deux PC échoue : les VLAN s'isolent, normal." },
                    { title: "Monter le trunk vers SW2", action: "Sur le lien Gi0/1 entre SW1 et SW2 : Config > GigabitEthernet0/1 > mode Trunk. Vérifiez sur SW2 que le port opposé est aussi en trunk.", observation: "'show interfaces trunk' sur les deux switchs : le port est en trunking, les VLAN 10 et 20 listés comme autorisés et actifs. Un trunk configuré d'un seul côté est la panne classique (l'autre côté reste en dynamic auto)." },
                    { title: "Router entre les VLAN avec un routeur sur bâton", action: "Sur R1 : interface G0/0.10, encapsulation dot1Q 10, ip address 192.168.10.1 255.255.255.0 ; interface G0/0.20, encapsulation dot1Q 20, ip address 192.168.20.1 255.255.255.0 ; no shutdown sur G0/0. Donnez aux PC les passerelles .1 de leurs VLAN.", observation: "PC-RH ping 192.168.20.2 : la trame monte le trunk taguée VLAN 10, le routeur dé-tague, route, re-tague en VLAN 20, redescend. 'show ip route' sur R1 affiche les deux réseaux en C (connectés)." }
                ],
                deepDive: [
                    { t: "VTP : le protocole de propagation des VLAN — et pourquoi le désactiver", p: [
                        "VLAN Trunking Protocol propage les créations/suppressions de VLAN sur tous les switches d'un domaine VTP : mode server (crée/modifie), client (reçoit), transparent (ignore et relaie).",
                        "Le danger : chaque modification incrémente le numéro de révision. Un switch de test branché en mode server avec une révision supérieure écrase la base VLAN de tout le domaine — les ports se retrouvent dans des VLAN inexistants, tout tombe.",
                        "Le réflexe moderne : vtp mode transparent partout (les VLANs sont configurés manuellement sur chaque switch), ou VTP v3 (mot de passe, révision protégée) dans les grands parcs."
                    ],
                    cmd: [
                        "vtp mode transparent",
                        "show vtp status",
                        "! vérifier les VLAN réellement présents, indépendamment de VTP",
                        "show vlan brief"
                    ],
                    box: 'warn', boxText: "Panne légendaire : un switch reconditionné branché sur le réseau de prod en mode VTP server vide la table VLAN du domaine entier (révision plus haute = écrasement). Toujours vérifier 'show vtp status' (mode et révision) avant de brancher un switch d'occasion, et préférer le mode transparent." },
                    { t: "Diagnostic pas à pas d'un 'ça ne passe plus entre les étages'", p: [
                        "Couche 1 : show interfaces status — le lien entre SW1/SW2 est-il up/up ?",
                        "Couche 2 VLAN : show vlan brief des deux côtés — le VLAN 20 existe-t-il sur SW2 ? (S'il a été créé sur SW1 uniquement, les trames taguées sont simplement jetées côté SW2.)",
                        "Trunk : show interfaces trunk des deux côtés — mode trunk, VLAN autorisés identiques, VLAN natif identique.",
                        "Couche 3 : les deux PC pinguent-ils leur passerelle respective ? Si oui, le problème est au routage ou dans une ACL, pas dans les VLAN."
                    ],
                    cmd: [
                        "show interfaces gi0/1 status",
                        "show interfaces trunk",
                        "show vlan brief",
                        "ping 192.168.10.1   ! depuis PC-RH : teste le VLAN 10 et la passerelle"
                    ],
                    box: 'remember', boxText: "À retenir : un VLAN absent d'un des deux commutateurs ne produit AUCUN message d'erreur — les trames taguées arrivent sur un trunk qui ne porte pas ce VLAN et sont discrètement perdues. 'show interfaces trunk' le révèle : le VLAN doit apparaître dans la colonne des VLAN autorisés ET actifs." },
                    { t: "Cas d'entreprise — le nouveau service RH", p: [
                        "Situation : l'entreprise ouvre un service RH au 2e étage (30 postes). Le plan : VLAN 30, sous-réseau 192.168.30.0/24, passerelle .1 sur le switch couche 3 du bâtiment.",
                        "Déploiement : créer le VLAN 30 sur SW-ETAGE2 (vlan 30 / name RH), affecter les 30 ports d'accès, autoriser le VLAN 30 sur les trunks montants vers le cœur, créer l'interface vlan 30 avec 192.168.30.1/24, prévoir le relais DHCP vers le serveur central (ip helper-address).",
                        "Vérification : un poste du service RH obtient une IP en 192.168.30.x, ping sa passerelle, ping le serveur RH (retour au réseau existant via routage). 'show interfaces trunk' confirme le VLAN 30 actif sur tout le chemin."
                    ],
                    box: 'case', boxText: "Un VLAN qui traverse N commutateurs doit exister ET être autorisé sur CHAQUE trunk du chemin. La checklist : VLAN créé partout ? autorisé sur chaque trunk ? sous-interface ou SVI configurée pour la passerelle ? relais DHCP en place ?" }
                ],
                exercices: [
                    { enonce: "Un technicien a configuré un trunk entre SW1 et SW2 : côté SW1 en 'switchport mode trunk', côté SW2 laissé par défaut (dynamic auto). Le VLAN 10 passe, le VLAN 20 ne passe pas. Expliquez et corrigez.", correction: "Avec SW1 en trunk et SW2 en dynamic auto, DTP négocie un trunk : les VLAN déjà connus de SW2 passent. Le VLAN 20 n'existe pas sur SW2 : les trames taguées VLAN 20 arrivent sur un trunk qui ne liste pas ce VLAN et sont perdues silencieusement. Correction : créer le VLAN 20 sur SW2 (vlan 20 / name ...), vérifier 'show interfaces trunk' côté SW2 (le VLAN 20 doit être autorisé et actif), et pour aller au bout : forcer le trunk des deux côtés et limiter les VLAN autorisés (switchport trunk allowed vlan 10,20 avec le même VLAN natif des deux côtés)." },
                    { enonce: "Pourquoi un ping entre PC-RH (VLAN 10) et PC-IT (VLAN 20) échoue-t-il sans routeur, alors que les deux postes sont branchés sur le même commutateur physique ?", correction: "Le commutateur de niveau 2 ne route pas : il fait suivre les trames entre ports du MÊME VLAN uniquement. Un VLAN délimite un domaine de diffusion distinct ; les trames du VLAN 10 ne franchissent jamais la frontière vers le VLAN 20 sans équipement de niveau 3. Il faut une passerelle par VLAN : un routeur sur bâton (sous-interfaces dot1Q) ou une SVI sur un switch couche 3. Ce cloisonnement est justement la fonction sécurité du VLAN : isolation couche 2." }
                ],
                resume: "Le VLAN segmente le réseau au niveau 2 : un VLAN = un domaine de diffusion = un sous-réseau. Les ports d'accès rangent les hôtes ; le trunk 802.1Q transporte tous les VLAN avec un tag entre commutateurs ; le VLAN natif doit être identique des deux côtés et ne doit pas être le VLAN 1 ; le routage inter-VLAN exige une passerelle par VLAN (sous-interfaces routeur ou SVI). Vérification systématique : show vlan brief, show interfaces trunk des deux côtés.",
                suite: "Le sujet 2.2 traite la redondance de niveau 2 (STP, Rapid-PVST+, EtherChannel) : sans STP, les liaisons redondantes entre commutateurs créent des boucles.",
            },
            {
                id: 'ccna-v2-2-2',
                certif: 'CCNA',
                parcours: 'CCNA',
                code: '2.2',
                title: "STP, redondance et EtherChannel : des boucles aux agrégations",
                niveau: 'Intermédiaire',
                prerequis: "Le sujet 2.1 (VLAN et trunks) : STP s'exécute par VLAN en mode PVST+/rapid PVST, et les boucles naissent des liaisons trunk redondantes.",
                objectifs: [
                    "Expliquer pourquoi une boucle de niveau 2 est catastrophique (broadcast storm, table MAC instable, trames dupliquées)",
                    "Décrire l'élection du pont racine (priorité la plus basse, puis MAC la plus basse) et les rôles root/designated/blocked",
                    "Suivre les états de port STP et la convergence 802.1D (30-50 s) contre RSTP (quelques secondes)",
                    "Sécuriser STP : PortFast, BPDU Guard, Root Guard, et comprendre leur usage respectif",
                    "Configurer un EtherChannel LACP et savoir pourquoi il ne se forme pas quand les liens diffèrent"
                ],
                lessons: [
                    { title: "Leçon 1 — La boucle de niveau 2, l'ennemi silencieux", parts: [
                        { h: "Trois symptômes d'une boucle", t: "Une boucle L2 (deux chemins entre deux commutateurs) produit : (1) des tempêtes de broadcast — une trame de diffusion tourne en boucle et sature tous les liens ; (2) l'instabilité de la table MAC — le commutateur voit la même MAC apparaître sur plusieurs ports ; (3) des trames dupliquées — les hôtes reçoivent tout en double. Le réseau ralentit puis meurt, souvent sans un seul message d'erreur dans les logs." },
                        { h: "Pourquoi le TTL ne sauve pas", t: "Les trames Ethernet de niveau 2 n'ont pas de TTL (contrairement aux paquets IP) : une trame de broadcast boucle indéfiniment. C'est tout le problème que STP vient résoudre : couper préventivement les chemins redondants au niveau 2 tout en gardant la redondance physique pour la panne." },
                        { h: "Le mécanisme de STP", t: "Spanning Tree Protocol (IEEE 802.1D) élit un pont racine (root bridge), puis chaque commutateur calcule son meilleur chemin vers la racine. Les ports sur le meilleur chemin deviennent root port (un par switch) ou designated port (un par segment) et forwarded ; les autres passent en blocking : la topologie logique devient un arbre — sans boucle — en gardant les liens bloqués en réserve." , schema: 'stp-election' }
                    ]},
                    { title: "Leçon 2 — L'élection du pont racine", parts: [
                        { h: "Qui devient racine", t: "Chaque commutateur envoie des BPDU (Bridge Protocol Data Units, toutes les 2 s par défaut — Hello Time) qui portent son Bridge ID = priorité + MAC. Est élu racine le Bridge ID le plus bas : priorité d'abord (32768 par défaut, multiple de 4096, moins = mieux placé), puis MAC la plus basse en cas d'égalité." },
                        { h: "Imposer sa racine", t: "spanning-tree vlan 10 root primary abaisse automatiquement la priorité (24576, ou 4096 sous la priorité courante) pour que le commutateur cœur gagne l'élection ; root secondary (28672) prépare le secours. On choisit comme racine le commutateur le plus central : tous les chemins de l'arbre en découlent, et une racine mal placée concentre le trafic au mauvais endroit." },
                        { h: "Les rôles de ports après élection", t: "Root port : le port qui mène à la racine au moindre coût (coût cumulé des liens : 4 pour 1 Gbps, 19 pour 100 Mbps). Designated port : sur chaque segment, le port côté qui envoie la meilleure BPDU — les ports de la racine sont tous designated. Les autres ports deviennent non-designated (blocking) : c'est la réserve de secours." },
                        { h: "Un STP par VLAN", t: "PVST+ et Rapid PVST+ exécutent une instance STP par VLAN : le VLAN 10 peut avoir SW1 comme racine et le VLAN 20 SW2 — le trafic se répartit. Coût : autant d'instances que de VLAN (CPU, BPDU). MSTP (802.1s) regroupe les VLAN en quelques instances pour alléger les très grands parcs." }
                    ]},
                    { title: "Leçon 3 — De 802.1D à RSTP : la convergence", parts: [
                        { h: "Les états de port 802.1D", t: "Blocking (n'accepte que les BPDU) → Listening (participe à l'élection, ~15 s) → Learning (remplit sa table MAC, ~15 s) → Forwarding. Total au démarrage : 30-50 s. Un poste qui se branche attend ce délai complet avant de passer du lien au trafic : un DHCP timeout en résulte parfois." },
                        { h: "Rapid STP (802.1w)", t: "RSTP fusionne blocking/listening en discarding, ajoute les rôles alternate (chemin de secours vers la racine) et backup (secours sur un segment partagé), et surtout propose/accorde entre voisins : la convergence tombe à quelques secondes, voire quasi immédiate sur les ports edge. Sur tout parc moderne : spanning-tree mode rapid-pvst." },
                        { h: "Les protections", t: "PortFast (spanning-tree portfast) : passe un port d'accès immédiatement en forwarding — réservé aux ports vers des hôtes. BPDU Guard (spanning-tree bpduguard enable) : err-disable le port si une BPDU y arrive (quelqu'un a branché un switch !). Root Guard (spanning-tree guard root) : rejette toute annonce d'un meilleur pont racine — protège les ports descendant vers d'autres switches. Loop Guard : détecte la perte unidirectionnelle de BPDUs (lien à demi-mort)." },
                        { h: "UplinkFast/BackboneFast", t: "Améliorations Cisco héritées de l'époque 802.1D : UplinkFast accélère la bascule quand un lien vers la racine tombe ; BackboneFast détecte indirectement les changements de topologie en amont. Avec RSTP, elles sont intégrées de fait — plus besoin de les configurer." }
                    ]},
                    { title: "Leçon 4 — EtherChannel : agréger les liens", parts: [
                        { h: "Le principe", t: "Un EtherChannel groupe 2 à 8 liens physiques entre deux commutateurs en un seul canal logique (interface Port-Channel). Les protocoles STP ne voient qu'un lien : plus de blocage par redondance, et la charge se répartit (src-dst-mac, src-dst-ip...). Pour la STP, le coût du canal correspond à un seul lien de cette vitesse." , schema: 'etherchannel-lacp' },
                        { h: "PAgP et LACP", t: "Deux protocoles de négociation : PAgP (propriétaire Cisco : modes desirable/auto) et LACP (standard IEEE 802.3ad : modes active/passive). LACP active initie la négociation, passive attend. Pour qu'un canal se forme : active+active, active+passive ou passive+passive ne marche pas (côté LACP). Le réflexe : LACP active des deux côtés." },
                        { h: "La règle d'homogénéité", t: "Tous les liens du canal doivent être identiques : même vitesse, même duplex, même mode access/trunk, mêmes VLAN autorisés. Une seule différence et le canal ne se forme pas (les liens restent individuels, avec risque de boucle côté STP). Vérification : show etherchannel summary — la lettre P (ports bundled) doit apparaître sur chaque membre ; I/S = inutilisé/suspendu." },
                        { h: "Le load-balancing", t: "port-channel load-balance src-dst-ip répartit les flux selon les IP source/destination — adapté au trafic routé ; src-dst-mac au trafic commuté. Attention : la répartition est par flux, pas par paquet — un unique gros transfert n'exploitera qu'un seul lien du canal." }
                    ]}
                ],
                guiSteps: [
                    { title: "Observer l'élection racine par défaut", action: "Dans Packet Tracer, montez un triangle SW1-SW2-SW3 (trunks 802.1Q entre chaque paire). Sur SW2, ouvrez le CLI : show spanning-tree. Relevez le Root ID et comparez-le aux Bridge ID des trois commutateurs (show spanning-tree bridge).", observation: "À priorité égale (32768), c'est la MAC la plus basse qui gagne : souvent SW1 par chance. Un port de SW3 apparaît en ALTN/BKN : c'est le chemin sacrifié par STP pour casser la boucle." },
                    { title: "Imposer SW1 comme racine et passer en rapid-pvst", action: "Sur SW1 : spanning-tree vlan 1 root primary. Sur les trois commutateurs : spanning-tree mode rapid-pvst. Revenez sur SW2 : show spanning-tree.", observation: "Root ID = Bridge ID de SW1, tous les ports de SW1 sont designated (FWD). Sur SW3, le port alternatif garde la boucle coupée. En cas de coupure du lien SW1-SW3 (shutdown), le port alternatif passe FWD en quelques secondes : testez." },
                    { title: "Protéger les ports d'accès", action: "Sur un port vers un PC : spanning-tree portfast puis spanning-tree bpduguard enable. Branchez ensuite un switch illégal sur ce port et observez.", observation: "Le port passe err-disabled dès la première BPDU reçue : le switch pirate est neutralisé. PortFast sans BPDU Guard aurait laissé le port en forwarding immédiat — et la boucle possible le temps que STP réagisse." },
                    { title: "Monter un EtherChannel LACP", action: "Ajoutez deux liens Gigabit entre SW1 et SW2. Sur chaque commutateur : interface range gi0/1-2 puis channel-group 1 mode active et switchport mode trunk. Vérifiez avec show etherchannel 1 summary.", observation: "Les deux ports affichent la lettre P (in the bundle) et l'interface Po1 apparaît en trunk. Coupez un lien : le trafic continue sur l'autre, sans recalcul STP — la redondance devient transparente." }
                ],
                deepDive: [
                    { t: "Coûts de chemin STP : le calcul complet", p: [
                        "Chaque vitesse de lien a un coût STP : 100 Mbps = 19, 1 Gbps = 4, 10 Gbps = 2 (nouvelles valeurs 802.1t : 100 000 / 20 000 / 2 000).",
                        "Le root port est le port dont le coût cumulé vers la racine est le plus bas : SW3 voit la racine à coût 4 via SW1 et à coût 8 via SW2 → le port vers SW1 devient root port.",
                        "En cas d'égalité de coût : le plus faible Bridge ID du voisin gagne, puis le plus faible port ID (numéro de port). Ces critères secondaires départagent les topologies symétriques."
                    ],
                    cmd: [
                        "show spanning-tree           ! Root ID, Bridge ID, rôles et états des ports",
                        "show spanning-tree detail    ! coûts cumulés, timers, compteur de TOPCHANGE",
                        "show spanning-tree summary   ! mode actif (rapid pvst), PortFast/Guard par défaut"
                    ],
                    box: 'remember', boxText: "À retenir : root port = meilleur chemin vers la racine (un par switch) ; designated port = un par segment, côté racine ; les autres bloquent. Coût 1 Gbps = 4, 100 Mbps = 19. Racine : priorité la plus basse, puis MAC la plus basse." },
                    { t: "Diagnostiquer une tempête de broadcast", p: [
                        "Symptômes : LED de trafic clignotant en sync sur tous les ports, latence qui grimpe, table MAC instable (show mac address-table : la même MAC saute de port en port), CPU commutateur à 100%.",
                        "Réflexe : identifier le(s) port(s) bloqués normalement par STP. show spanning-tree : un port censé être ALTN est-il passé FWD ? Un switch récent branché avec une priorité plus basse a déplacé la racine.",
                        "Cause fréquente : PortFast + BPDU Guard absent sur un port où un mini-switch a été branché — STP n'a pas eu le temps de réagir à la boucle physique créée par l'utilisateur."
                    ],
                    cmd: [
                        "show processes cpu | include CPU   ! charge du switch",
                        "show mac address-table             ! instabilité = MAC qui migre",
                        "show spanning-tree                 ! ports ALTN manquants ?",
                        "show spanning-tree detail | include ieee|occur|From"
                    ],
                    box: 'warn', boxText: "Panne classique : l'utilisateur branche son mini-switch sous son bureau (deux câbles vers deux prises murales) et crée une boucle. La prévention : PortFast + BPDU Guard sur tous les ports d'accès, et errdisable recovery pour réactiver après correction." },
                    { t: "Cas d'entreprise — l'agrégation cœur-distribution", p: [
                        "Situation : le lien cœur-distribution (1 Gbps) sature en fin de journée. Deux liens supplémentaires existent physiquement mais STP en bloque deux sur trois (redondance sans agrégation).",
                        "Action : agréger les trois liens en un EtherChannel LACP (channel-group 1 mode active des deux côtés, vérification show etherchannel summary : tous les ports en P).",
                        "Résultat : ~3 Gbps cumulés, répartition par flux (src-dst-ip), et la panne d'un lien membre ne déclenche plus de recalcul STP complet : le trafic bascule sur les liens restants."
                    ],
                    box: 'case', boxText: "Trois liens sans EtherChannel = 1 seul lien utilisé (STP bloque les autres). Trois liens avec EtherChannel = 3 liens utilisés. La redondance seule ne donne pas la performance ; l'agrégation donne les deux." }
                ],
                exercices: [
                    { enonce: "Quatre commutateurs forment un carré (SW-A racine en haut, SW-D en bas). Les liens sont tous en 1 Gbps. SW-C voit la racine à coût 8 via SW-B et à coût 4 via SW-A. Quel port SW-C met-il en root port et pourquoi l'autre chemin est-il bloqué ?", correction: "Le port vers SW-A devient root port : coût cumulé 4 (un seul saut 1 Gbps) contre 8 par SW-B. Sur le segment SW-C/SW-B, le port designated est celui côté du meilleur chemin vers la racine (SW-B, coût 4 total) ; le port de SW-C sur ce segment devient non-designated (blocking). STP obtient un arbre : aucun chemin dupliqué vers la racine, mais le lien bloqué reprendra le service si le lien SW-C/SW-A tombe — c'est la redondance logique." },
                    { enonce: "Un administrateur constate que son EtherChannel ne se forme pas : show etherchannel summary montre les deux ports en 'I' (independent). Il a configuré Gi0/1 en trunk avec VLANs autorisés 10,20 et Gi0/2 en trunk avec VLANs autorisés 10,20,30. Expliquez et corrigez.", correction: "Un EtherChannel exige des membres strictement homogènes : même vitesse, duplex, mode trunk et liste de VLAN autorisés. Le VLAN 30 en plus sur Gi0/2 rompt l'homogénéité : le canal refuse de se former et les ports restent indépendants — avec en prime un risque de boucle car STP voit deux liens parallèles. Correction : aligner les listes (switchport trunk allowed vlan 10,20 sur les deux interfaces de la range), puis re-vérifier : les ports doivent passer de 'I' à 'P' (bundled) dans show etherchannel summary." }
                ],
                resume: "STP transforme une topologie redondante en arbre logique sans boucle : un pont racine élu (priorité puis MAC), des root/designated ports forwarded, le reste en blocking. RSTP accélère la convergence à quelques secondes ; PortFast, BPDU Guard et Root Guard sécurisent les bords. L'EtherChannel (LACP, liens homogènes) agrège plusieurs liens en un canal que STP voit comme un seul : redondance ET performance.",
                suite: "Le sujet 3.1 monte au niveau 3 avec le routage IP et OSPF : quand la destination n'est plus dans le réseau local.",
            },
            {
                id: 'ccna-v2-3-1',
                certif: 'CCNA',
                parcours: 'CCNA',
                code: '3.1',
                title: "Routage IP et OSPF : trouver le meilleur chemin",
                niveau: 'Intermédiaire',
                prerequis: "Le sujet 1.3 (sous-réseaux) est indispensable ; le 2.1 (VLAN, passerelles) aide à comprendre pourquoi un paquet doit être routé.",
                objectifs: [
                    "Distinguer routage statique et dynamique, et lire une table de routage (show ip route)",
                    "Expliquer la logique link-state d'OSPF : LSDB commune, algorithme SPF de Dijkstra, métrique = coût",
                    "Décrire la formation d'une adjacence : Hello, paramètres qui doivent correspondre, états Down/Init/2-Way/Full",
                    "Comprendre le rôle du DR/BDR sur un segment multi-accès et l'élection",
                    "Configurer OSPF multi-zones (areas), les interfaces passives et vérifier les voisins",
                    "Diagnostiquer : voisin absent, route manquante, mauvaise zone"
                ],
                lessons: [
                    { title: "Leçon 1 — La table de routage et le choix des routes", parts: [
                        { h: "Que fait un routeur", t: "Un routeur reçoit un paquet, lit l'IP destination, la cherche dans sa table de routage et transmet par l'interface de sortie indiquée (next hop). S'il ne trouve rien et qu'aucune route par défaut n'existe : le paquet est détruit et un ICMP 'destination unreachable' peut être renvoyé." },
                        { h: "Lire show ip route", t: "Chaque ligne commence par une lettre : C (connecté — le réseau est sur une interface locale), L (local — l'IP de l'interface), S (statique), O (OSPF), D (EIGRP), R (RIP), B (BGP). Une route ressemble à O 192.168.20.0/24 [110/65] via 10.0.12.2 — les crochets contiennent la distance administrative (110 pour OSPF) et la métrique (65) : c'est la hiérarchie de confiance et la préférence du chemin." },
                        { h: "Distance administrative : qui croire ?", t: "Quand deux protocoles annoncent la même destination, le routeur choisit la distance administrative la plus basse : connecté 0, statique 1, eBGP 20, EIGRP 90, OSPF 110, RIP 120. C'est pour cela qu'une route statique écrase une route OSPF apprise pour la même destination — piège classique quand on teste un chemin parallèle." },
                        { h: "La route statique et la route par défaut", t: "ip route 192.168.30.0 255.255.255.0 10.0.12.2 envoie ce réseau vers un next hop ; ip route 0.0.0.0 0.0.0.0 203.0.113.1 est la route par défaut (0.0.0.0/0) — le filet de sécurité vers Internet. Les routes statiques sont simples et prévisibles mais ne s'adaptent pas aux pannes : dès que le réseau grandit, on passe au routage dynamique." }
                    ]},
                    { title: "Leçon 2 — OSPF : la logique link-state", parts: [
                        { h: "Chaque routeur connaît la carte complète", t: "OSPF est un protocole link-state : chaque routeur décrit ses liens (réseaux connectés, coûts) dans des LSA (Link-State Advertisements), inondés à tous les routeurs de la zone. Résultat : chaque routeur construit la même LSDB (Link-State Database) — une carte identique de la zone — et exécute l'algorithme SPF (Dijkstra) pour calculer ses propres meilleurs chemins. Contrairement à RIP (distance-vector : 'je connais une route à 3 sauts'), OSPF ne propage pas des rumeurs mais une topologie." },
                        { h: "La métrique : le coût du lien", t: "La métrique OSPF est le coût, proportionnel à la bande passante (référence 100 Mbps : coût = 100 Mb / bande passante du lien ; 100 Mbps = 1, 1 Gbps = 1 après auto-reference, 10 Mbps = 10). Un chemin cumule les coûts ; SPF choisit le total le plus faible. On peut le modifier : ip ospf cost 10 sur une interface pour orienter le trafic." },
                        { h: "Les zones (areas)", t: "OSPF découpe le domaine en zones numériques : la zone 0 (backbone) est obligatoire et centrale ; les autres zones s'y raccordent via un routeur ABR (Area Border Router). L'intérêt : les LSA ne débordent pas d'une zone — la zone 10 peut changer sans reconstruire la table SPF de la zone 20. Le dimensionnement usuel : 50 routeurs par zone maximum." , schema: 'ospf-zones' },
                        { h: "Les paquets et les adresses", t: "OSPF s'encapsule directement en IP (protocole 89) et parle en multicast : 224.0.0.5 (tous les routeurs OSPF) pour les Hello et les mises à jour générales, 224.0.0.6 (DR/BDR) pour les remontées des non-DR. Un routeur s'identifie par son Router ID (RID), une IPv4 32 bits : choisie en priorité configurée (router-id 1.1.1.1), sinon la plus haute IP de loopback, sinon la plus haute IP d'interface physique active." }
                    ]},
                    { title: "Leçon 3 — Voisins, adjacences et DR/BDR", parts: [
                        { h: "Le Hello : le handshake", t: "Chaque interface OSPF envoie un Hello toutes les 10 s (broadcast/point-to-point ; 30 s en NBMA) avec son RID, sa zone, ses timers, son masque et son authentification. Deux routeurs deviennent voisins si les Hello s'accordent. Le Dead Interval (40 s = 4 × Hello) déclare un voisin mort sans nouvelles : accélérer les Hello accélère la détection de panne." },
                        { h: "Ce qui doit correspondre", t: "Pour former une adjacence complète (état Full) : même zone, mêmes Hello/Dead timers, même type d'interface et MTU, mêmes options d'authentification, RID uniques. La bande passante, elle, n'a pas besoin de correspondre. Un voisin bloqué en ExStart/Exchange = différences de MTU — la panne la plus fourbe du lot." },
                        { h: "Les états d'adjacence", t: "Down (pas de voisin) → Init (Hello reçu, unidirectionnel) → 2-Way (Hello mutuel — élection DR/BDR ici) → ExStart/Exchange/Loading (synchronisation des LSDB) → Full (adjacence complète, tables identiques). Sur un lien point-to-point : Full directement entre les deux. Sur Ethernet multi-accès : Full avec le DR et le BDR seulement ; les autres voisins restent en 2-Way." },
                        { h: "DR et BDR", t: "Sur un segment Ethernet à n routeurs, n(n-1)/2 adjacences plein maillage seraient nécessaires. OSPF élit un Designated Router (représentant du segment) et un BDR (secours) : chacun s'adjoint au DR/BDR, les LSA transitent par eux. Élection : priorité d'interface la plus haute (ip ospf priority 0-255 ; 0 = jamais DR), puis RID le plus élevé. La priorité 0 sert à écarter un routeur peu dimensionné de l'élection." }
                    ]},
                    { title: "Leçon 4 — Configurer et vérifier OSPF", parts: [
                        { h: "La configuration moderne", t: "router ospf 1 (numéro de processus, local), puis l'approche interface : interface G0/1 ; ip ospf 1 area 0 — chaque interface est déclarée dans sa zone. L'ancienne syntaxe network (network 192.168.10.0 0.0.0.255 area 0) fonctionne encore : elle active OSPF sur les interfaces correspondantes, mais l'approche interface est plus lisible et évite les surprises de masque générique." },
                        { h: "Les interfaces passives", t: "On ne veut pas de Hello vers les réseaux d'utilisateurs : passive-interface G0/2 (ou passive-interface default puis no passive-interface entre routeurs). Sans cela, des voisins fantômes apparaissent, et surtout les réseaux d'accès polluent les tables de routage des voisins." },
                        { h: "Vérifier en trois commandes", t: "show ip ospf neighbor : la santé des adjacences (état Full attendu, avec le rôle DR/BDR/DROTHER en fin de ligne). show ip route ospf : les routes apprises ([110/coût]). show ip ospf interface brief : zones, coûts, réseau (broadcast), DR/BDR par interface. Ces trois commandes résolvent 90% des pannes OSPF." },
                        { h: "OSPFv3 en deux mots", t: "Pour IPv6, OSPFv3 reprend la logique (zones, SPF, DR/BDR) avec une LSDB séparée et une configuration par interface : ipv6 ospf 1 area 0 — le numéro de processus IPv6. Les voisins se découvrent via les adresses link-local fe80::, ce qui rend l'adressage interface plus simple et l'analyse plus piégeuse." }
                    ]}
                ],
                guiSteps: [
                    { title: "Configurer OSPF entre deux routeurs", action: "Dans Packet Tracer, reliez R1 et R2 (GigabitEthernet0/0 des deux côtés, réseau 10.0.12.0/30). Sur R1 : router ospf 1 ; router-id 1.1.1.1 ; puis interface G0/0 : ip ospf 1 area 0. Répliquez sur R2 avec router-id 2.2.2.2.", observation: "show ip ospf neighbor sur R1 : une ligne avec RID 2.2.2.2, état FULL, et le rôle (DR ou BDR sur ce segment Ethernet). L'adjacence est établie en quelques secondes." },
                    { title: "Publier les réseaux d'utilisateurs", action: "Sur R1, ajoutez une interface loopback 1 avec 192.168.10.1/24 et déclarez-la : interface lo1 ; ip ospf 1 area 0. Sur R2, vérifiez la table de routage.", observation: "show ip route ospf sur R2 : une ligne O 192.168.10.0/24 [110/x] via 10.0.12.1 — le réseau est appris dynamiquement, sans route statique." },
                    { title: "Casser l'adjacence pour comprendre les états", action: "Sur R2, changez le timer d'un côté : interface G0/0 ; ip ospf hello-interval 5 (R1 reste à 10). Attendez 40 s et observez.", observation: "show ip ospf neighbor ne liste plus le voisin : les Hello se rejettent (timers différents). show ip ospf interface G0/0 révèle le mismatch. Remettez 10 des deux côtés : l'adjacence revient en FULL — leçon : zone, timers et MTU doivent correspondre." },
                    { title: "Multi-zones et ABR", action: "Ajoutez R3 : R2-R3 sur le réseau 10.0.23.0/30 en area 1 (interface G0/1 de R2 : ip ospf 1 area 1 ; R3 pareil). Ajoutez une loopback sur R3 en area 1 et vérifiez les routes sur R1.", observation: "show ip route ospf sur R1 affiche les réseaux de la zone 1 (via R2, l'ABR qui résume les zones). show ip ospf border-routers sur R3 liste l'ABR : la zone 0 est le pivot obligatoire." }
                ],
                deepDive: [
                    { t: "Anatomie d'un voisin OSPF absent", p: [
                        "Couche 1/3 : les interfaces sont-elles up/up avec des IP de même sous-réseau ? (ping entre routeurs)",
                        "Zone : show ip ospf interface brief — les deux côtés déclarent-ils la même zone ?",
                        "Timers/MTU/auth : hello/dead identiques ? MTU identique (un voisin bloqué en ExStart est presque toujours un MTU) ? authentification symétrique ?",
                        "Passive : l'interface n'est-elle pas passive sur l'un des côtés ? (show ip ospf interface)"
                    ],
                    cmd: [
                        "show ip ospf neighbor",
                        "show ip ospf interface brief",
                        "show ip ospf interface GigabitEthernet0/0   ! timers, MTU, DR/BDR, file d attente",
                        "show ip protocols | section Router ID"
                    ],
                    box: 'remember', boxText: "À retenir pour l'examen et la prod : un voisin bloqué en EXSTART/EXCHANGE = différence de MTU ; voisins qui apparaissent puis disparaissent = timers Hello/Dead ; aucune adjacence sur Ethernet alors que tout semble bon = vérifier que les deux côtés annoncent bien la même zone." },
                    { t: "Coût, référence de bande passante et chemins asymétriques", p: [
                        "La métrique OSPF vient de la bande passante : coût = bande passante de référence (100 Mbps par défaut) ÷ bande passante du lien. Les liens 10 Gbps coûtent donc 0,01 — arrondi à 0 : d'où le réglage auto-cost reference-bandwidth 100000 (en Mb) pour rendre les liens rapides discriminants.",
                        "Deux chemins à coût égal = répartition de charge (ECMP) ; à coût inégal, OSPF ne prend que le meilleur — pas de partage inégal comme EIGRP.",
                        "Le coût se lit au plus près : show ip ospf interface GigabitEthernet0/0 affiche 'Cost: 1' ; ip ospf cost 50 force un chemin à être délaissé sans toucher à la topologie."
                    ],
                    cmd: [
                        "router ospf 1",
                        " auto-cost reference-bandwidth 100000",
                        "interface GigabitEthernet0/1",
                        " ip ospf cost 50",
                        "show ip ospf interface brief   ! coût par interface"
                    ],
                    box: 'admin', boxText: "Conseil d'administrateur : réglez la reference-bandwidth à 100000 Mb sur TOUS les routeurs du domaine dès la mise en place — sinon les coûts des liens rapides sont écrasés à 1 et SPF ne distingue plus un 10 Gbps d'un 100 Mbps." },
                    { t: "Cas d'entreprise — le site distant qui perd ses routes", p: [
                        "Situation : le site de Lyon (R3, zone 1) ne joignait plus le siège ce matin à 9h. Le ticket dit 'plus d'accès aux applications'.",
                        "Diagnostic : show ip ospf neighbor sur R3 : aucun voisin vers R2. show ip ospf interface G0/1 : la zone annonce 0 au lieu de 1 (reprise de config nocturne mal reportée). La zone mismatch rejette les Hello silencieusement.",
                        "Action : re-déclarer l'interface en area 1 (ip ospf 1 area 1), l'adjacence repasse FULL en ~10 s ; les routes O reviennent dans show ip route. Documenter le plan de zones dans la base de connaissances pour éviter la reprise erronée."
                    ],
                    box: 'case', boxText: "Un mismatch de zone ne génère AUCUN log criant : les Hello sont simplement ignorés. Devant un 'voisin absent', la séparation zone/priorité 0/passive évite de blâmer la couche 1 en premier." }
                ],
                exercices: [
                    { enonce: "Cinq routeurs sont sur le même segment Ethernet en zone 0. Combien d'adjacences FULL sans DR/BDR, et quel est l'apport du DR ?", correction: "Sans DR/BDR, le plein maillage exige n(n-1)/2 = 5×4/2 = 10 adjacences FULL, chacune synchronisant une LSDB complète — beaucoup de trafic de contrôle. Avec un DR et un BDR : chaque routeur devient FULL uniquement avec le DR et le BDR (2 adjacences par routeur ordinaire, DROTHER), les autres paires restent en 2-Way. Le DR centralise les LSA du segment : de 10 adjacences on tomne à 2 par routeur — le flooding est divisé d'autant." },
                    { enonce: "Sur R1 : show ip route montre 'O 192.168.20.0/24 [110/65] via 10.0.12.2'. Expliquez chaque élément de cette ligne, puis dites ce qui se passerait si une route statique 'ip route 192.168.20.0 255.255.255.0 10.0.13.3' était ajoutée.", correction: "O : route apprise par OSPF ; 192.168.20.0/24 : destination ; [110/65] : distance administrative 110 (OSPF) et métrique 65 (coût cumulé du chemin) ; via 10.0.12.2 : next hop. Avec la route statique ajoutée : distance administrative 1 < 110, la table de routage remplace la route OSPF par la statique via 10.0.13.3 pour cette destination — le trafic change de chemin sans que OSPF soit 'en panne' : show ip route afficherait S. Pour un test temporaire propre : distance administrative ajustable (ip route ... 120) ou ip sla-track. C'est le piège classique des migrations où coexistent statiques et dynamiques." }
                ],
                resume: "Le routeur choisit chaque destination dans sa table de routage : connecté (0), statique (1), puis les protocoles dynamiques par distance administrative — OSPF (110). OSPF partage une carte identique de la zone (LSDB) et calcule par Dijkstra le chemin au moindre coût ; ses adjacences exigent zone, timers et MTU identiques ; DR/BDR allègent les segments Ethernet ; les zones découpent le domaine autour du backbone 0. Vérifications clés : show ip ospf neighbor, show ip route, show ip ospf interface brief.",
                suite: "Le sujet 4.1 (NAT) montrera comment ces paquets routés sortent vers Internet avec des adresses traduites.",
            },
            {
                id: 'ccna-v2-4-1',
                certif: 'CCNA',
                parcours: 'CCNA',
                code: '4.1',
                title: "NAT et PAT : traduire les adresses vers Internet",
                niveau: 'Intermédiaire',
                prerequis: "Le sujet 1.3 (adressage IPv4, adresses privées/publiques RFC 1918) et une idée du routage (3.1).",
                objectifs: [
                    "Expliquer pourquoi NAT existe : épuisement IPv4, RFC 1918, économie d'adresses publiques",
                    "Distinguer NAT statique, NAT dynamique et PAT (overload) et choisir selon le cas",
                    "Définir inside local / inside global / outside et suivre la traduction d'un paquet",
                    "Configurer PAT sur un routeur de sortie vers Internet et vérifier la table de traduction",
                    "Diagnostiquer : traduction absente, pool épuisé, ACL de match manquante"
                ],
                lessons: [
                    { title: "Leçon 1 — Pourquoi traduire les adresses", parts: [
                        { h: "Le problème historique", t: "IPv4 offre ~4,3 milliards d'adresses, très insuffisant pour l'Internet mondial. En entreprise, les réseaux internes utilisent donc des plages privées (RFC 1918 : 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) — non routables sur Internet. NAT (Network Address Translation) traduit à la sortie ces adresses privées en une ou quelques adresses publiques : le routeur de bord réécrit l'IP source des paquets sortants et note la correspondance pour traduire les réponses en sens inverse." },
                        { h: "Ce que NAT apporte (et ce qu'il ne fait pas)", t: "NAT économise les adresses publiques et masque la topologie interne — il n'est PAS une sécurité : il ne filtre rien, il réécrit. La frontière de sécurité reste le pare-feu et les ACL. ATTENDU aussi : NAT complique le fonctionnement des protocoles qui portent des IP dans la charge utile (FTP actif, SIP...) qui nécessitent des helpers ALG." },
                        { h: "Les trois saveurs de NAT", t: "NAT statique : une correspondance 1-pour-1 permanente (un serveur interne publié sous une IP publique fixe). NAT dynamique : un pool d'adresses publiques attribuées à la volée aux flux sortants, première libre gagne. PAT (Port Address Translation), alias NAT overload : TOUS les flux internes sortent avec la même IP publique, différenciés par ports source différents — c'est le mode de la box Internet et du routeur d'entreprise." }
                    ]},
                    { title: "Leçon 2 — Le vocabulaire inside/outside", parts: [
                        { h: "Les quatre termes", t: "Inside local : l'adresse privée du poste vu de l'intérieur (10.1.1.10). Inside global : l'adresse publique que prend ce même flux à la sortie (203.0.113.5). Outside local : l'adresse du serveur externe telle que vue de l'intérieur. Outside global : l'adresse réelle du serveur externe. En PAT simple, outside local = outside global (203.0.113.20 d'un site web) : seule la partie inside est traduite." },
                        { h: "Suivre un paquet", t: "Le poste 10.1.1.10 ouvre une connexion vers 198.51.100.80:443. À la sortie : source devient 203.0.113.5:49152 (IP publique + port source choisi). Le routeur note la translation dans sa table. La réponse 198.51.100.80:443 → 203.0.113.5:49152 revient : le routeur lit sa table et restaure la destination 10.1.1.10:xxxx. Sans entrée dans la table, le paquet entrant est détruit — c'est aussi ce qui bloque les connexions entrantes non publiées."  , schema: 'nat-fr-v2' },
                        { h: "Timeout et cycle de vie", t: "Chaque entrée PAT vit le temps du flux (défaut 86400 s pour les simples translations, quelques minutes pour les flux TCP fin de session). Un pool dynamique épuisé = plus aucune nouvelle sortie : les postes restent connectés en interne mais n'atteignent plus Internet — symptôme diagnostiqué avec show ip nat translations (table pleine) et debug ip nat." }
                    ]},
                    { title: "Leçon 3 — Configurer PAT sur un routeur de sortie", parts: [
                        { h: "Les trois blocs de config", t: "(1) Définir qui sort : une ACL standard (access-list 10 permit 192.168.0.0 0.0.255.255). (2) Nommer l'interface publique comme source de traduction : interface G0/0 (côté Internet), ip nat outside ; les interfaces internes : ip nat inside. (3) Lier : ip nat inside source list 10 interface G0/0 overload — le mot-clé overload active le PAT (réutilisation de la même IP avec des ports)." },
                        { h: "Variantes utiles", t: "Avec un pool : ip nat inside source list 10 pool PUBLIC overload (pool PUBLIC avec une plage d'IP publiques). Publier un serveur interne : ip nat inside source static tcp 10.1.1.100 443 203.0.113.5 443 — le serveur devient joignable depuis Internet sur ce port précis. La redirection de port d'une box est exactement ce NAT statique." },
                        { h: "Vérifier et purger", t: "show ip nat translations liste les correspondances (inside local/global, outside, ports) ; show ip nat statistics donne les hits et l'usage du pool ; clear ip nat translation * purge la table après un changement de configuration (obligatoire sinon les anciennes entrées parasitent les tests)." }
                    ]},
                    { title: "Leçon 4 — Diagnostiquer NAT et IPv6 en toile de fond", parts: [
                        { h: "La méthode de diagnostic", t: "Symptôme 'pas d'Internet mais réseau interne OK' : (1) la route par défaut existe-t-elle (show ip route 0.0.0.0) ? (2) l'ACL de NAT matche-t-elle le sous-réseau du poste (show access-lists — compteurs de hits qui montent) ? (3) la table de traduction s'emplie-t-elle (show ip nat translations verbose) ? (4) interfaces inside/outside bien déclarées (show ip nat statistics) ? Cette séquence localise la panne en deux minutes." },
                        { h: "NAT et les protocoles qui portent des adresses", t: "FTP actif, SIP/VoIP, certains jeux P2P échouent à travers un NAT simple car l'IP interne voyage dans la charge utile. Solutions : ALG (application layer gateway) sur le routeur, ou passer en mode passif (FTP), ou SIP fixe/ALG sur l'équipement de bord. Reconnaître ce motif évite des heures de dépannage réseau pur." },
                        { h: "IPv6 supprime le besoin de NAT", t: "IPv6 offre un espace d'adressage tel que chaque appareil peut avoir une adresse globale : la traduction d'adresses devient inutile (NAT66 reste possible mais non recommandé). À la place, NPTv6 ou simplement un firewalling adapté. Le réflexe futur : l'IPv6 rend la sortie directe, le filtrage en gère la sécurité." }
                    ]}
                ],
                guiSteps: [
                    { title: "Simuler une sortie Internet dans Packet Tracer", action: "Montez : PC1 (192.168.1.10/24) — R1 (G0/1 inside 192.168.1.1, G0/0 outside 203.0.113.2) — un serveur simulant Internet (198.51.100.80). Config PAT sur R1 : access-list 10 permit 192.168.1.0 0.0.0.255 ; interface G0/1 : ip nat inside ; interface G0/0 : ip nat outside ; ip nat inside source list 10 interface G0/0 overload.", observation: "Depuis PC1, ping 198.51.100.80 répond. Sur R1 : show ip nat translations affiche 'inside local 192.168.1.10 → inside global 203.0.113.2' avec les ports ICMP — la preuve de la traduction." },
                    { title: "Observer la table de traduction en temps réel", action: "Sur R1, lancez debug ip nat (mode privilégié), puis depuis PC1 lancez une navigation web vers le serveur.", observation: "La console trace 'NAT: s=192.168.1.10->203.0.113.2, d=198.51.100.80 [xxxx]' à chaque paquet sortant puis la traduction inverse au retour — le mécanisme devient visuel. Désactivez debug ip nat ensuite (undebug all)." },
                    { title: "Publier un serveur interne (NAT statique)", action: "Ajoutez un serveur web interne 192.168.1.100. Sur R1 : ip nat inside source static tcp 192.168.1.100 80 203.0.113.2 8080. Depuis le serveur Internet (198.51.100.80), ouvrez le navigateur vers http://203.0.113.2:8080.", observation: "La connexion entrante est traduite vers 192.168.1.100:80 : le serveur interne est publié sous le port externe 8080. C'est exactement la 'redirection de port' d'une box." },
                    { title: "Casser volontairement l'ACL et diagnostiquer", action: "Modifiez l'ACL pour matcher un mauvais sous-réseau (access-list 10 permit 172.16.0.0 0.0.255.255). Depuis PC1, retentez le ping.", observation: "Le ping échoue alors que la route par défaut existe. show access-lists : les hits ne montent pas sur la ligne 10 — l'ACL ne matche pas le trafic : le NAT ne s'applique jamais. C'est la panne NAT la plus fréquente en examen et en prod." }
                ],
                deepDive: [
                    { t: "Le paquet NAT pas à pas (PAT complet)", p: [
                        "PC 192.168.1.10:1025 → 198.51.100.80:443 arrive sur le routeur (interface inside).",
                        "Le routeur consulte l'ACL (match 192.168.1.0/24 ? oui) : NAT s'applique.",
                        "Réécriture : source → 203.0.113.2:49213 (IP publique de G0/0, port source unique attribué).",
                        "L'entrée est notée : inside local 192.168.1.10:1025 ↔ inside global 203.0.113.2:49213, protocole TCP, timeout démarré.",
                        "La réponse 198.51.100.80:443 → 203.0.113.2:49213 revient sur outside : la table restaure la destination 192.168.1.10:1025 et délivre en inside."
                    ],
                    cmd: [
                        "show ip nat translations        ! la table des correspondances",
                        "show ip nat statistics           ! hits, misses, pool",
                        "clear ip nat translation *       ! purge avant re-test",
                        "debug ip nat                     ! trace en temps reel (desactiver ensuite)"
                    ],
                    box: 'remember', boxText: "À retenir : PAT = même IP publique pour tous, différenciés par ports source ; un paquet entrant sans entrée dans la table est détruit ; la ligne de config qui lie tout est 'ip nat inside source list <ACL> interface <publique> overload'." },
                    { t: "Choisir le bon NAT selon le scénario", p: [
                        "Box familiale / routeur PME : PAT — une seule IP publique pour des dizaines de postes.",
                        "Publier un serveur web interne : NAT statique (1-pour-1) ou redirection de port sur une IP PAT partagée.",
                        "Une plage publique louée et plusieurs services sortants : NAT dynamique avec pool — attention à l'épuisement du pool en pointe.",
                        "Interconnexion de deux réseaux qui utilisent la même plage 192.168.1.0/24 des deux côtés : NAT statique de translation croisée (rare, douloureux — à traiter par renumérotation)."
                    ],
                    box: 'admin', boxText: "Conseil d'administrateur : documentez chaque NAT statique dans un tableau (IP interne, IP/port externe, service, responsable). Un NAT oublié est un trou d'accès oublié — l'audit des traductions fait partie de l'inventaire de sécurité." },
                    { t: "Cas d'entreprise — samedi 18h : plus personne ne peut sortir", p: [
                        "Situation : à 18h02, les premiers tickets arrivent : 'Internet inaccessible'. Le réseau interne fonctionne (partages, impression OK).",
                        "Diagnostic en 4 temps : show ip route → la route par défaut existe ; show ip nat statistics → 'Total active translations: 64512' et un pool de 64 IP publiques saturé (misses qui grimpent) ; show ip nat translations → des milliers d'entrées temporaires vers une même destination douteuse.",
                        "Cause : un poste infecté ouvrait des milliers de connexions (scanner sortant), épuisant le pool dynamique. Action : bloquer le poste en amont, clear ip nat translation *, passer l'accès en PAT sur l'IP de l'interface (overload) pendant l'investigation, puis traiter le poste (mis en quarantaine VLAN isolation).",
                        "Prévention : plafonner le nombre de translations par hôte (le cas échéant via zone-based firewall), surveiller show ip nat statistics en supervision."
                    ],
                    box: 'case', boxText: "Quand 'tout le monde' perd Internet mais que l'interne fonctionne, la table NAT et son pool sont les premiers suspects : compteurs de hits, d'entrées actives et de misses racontent la panne en trois lignes." }
                ],
                exercices: [
                    { enonce: "Une PMe dispose d'une seule adresse publique et de 40 postes. Quel type de NAT déployez-vous et pourquoi ? Décrivez la ligne de configuration IOS essentielle.", correction: "PAT (NAT overload) : une seule IP publique ne peut nourrir un NAT dynamique par flux 1-pour-1 (une IP par poste sortant simultané). PAT multiplexe sur les ports source : l'IP publique est partagée par tous, chaque flux recevant un port unique. Configuration : access-list 10 permit 192.168.0.0 0.0.255.255 (les réseaux internes), interfaces marquées ip nat inside / ip nat outside, puis ip nat inside source list 10 interface GigabitEthernet0/0 overload. Vérification : show ip nat translations doit montrer des lignes où toutes les inside global valent l'IP de G0/0 avec des ports distincts." },
                    { enonce: "Un serveur web interne 10.1.1.100 doit être joignable depuis Internet sur l'adresse publique 203.0.113.5, port 443 seulement. Donnez la configuration et expliquez pourquoi un ping entrant depuis Internet ne fonctionne pas pour autant.", correction: "NAT statique de port : ip nat inside source static tcp 10.1.1.100 443 203.0.113.5 443. Le paquet entrant à destination de 203.0.113.5:443 est traduit vers 10.1.1.100:443. Le ping (ICMP) entrant échoue car aucune translation n'existe pour ICMP vers cette adresse : le routeur détruit les paquets entrants sans entrée de table NAT — et c'est souhaité : on publie exactement le service voulu, pas le serveur entier. Pour diagnostiquer l'accès : show ip nat translations | include 443 et compter les hits sur l'entrée statique." }
                ],
                resume: "NAT traduit les adresses privées RFC 1918 en adresses publiques à la sortie : statique (1-pour-1, publication de serveur), dynamique (pool), PAT/overload (une IP pour tous via les ports). Les paquets entrants sans entrée de table sont détruits. Vérifications : show ip nat translations/statistics, l'ACL de match, les interfaces inside/outside. IPv6 rend le NAT inutile : filtrage et adressage global.",
                suite: "Le sujet 4.2 (ACL) complète la sortie Internet : filtrer précisément qui peut aller où.",
            },
            {
                id: 'ccna-v2-4-2',
                certif: 'CCNA',
                parcours: 'CCNA',
                code: '4.2',
                title: "ACL : filtrer le trafic avec précision",
                niveau: 'Intermédiaire',
                prerequis: "Le sujet 1.3 (sous-réseaux, wildcard masks proches des masques inverses) et le 3.1 (routage) : une ACL se pose sur le chemin des paquets d'un routeur.",
                objectifs: [
                    "Expliquer ce qu'une ACL fait et ne fait pas : filtrer, pas sécuriser à elle seule",
                    "Distinguer ACL standard et étendue, et choisir leur emplacement (près de la source vs près de la destination)",
                    "Écrire des ACL avec wildcard masks et lire l'ordre implicite deny any",
                    "Appliquer une ACL sur une interface/direction et vérifier les compteurs de hits",
                    "Diagnostiquer : trafic bloqué par une ligne oubliée, ACL inversée, direction erronée"
                ],
                lessons: [
                    { title: "Leçon 1 — Le rôle d'une ACL", parts: [
                        { h: "Une liste de règles lues de haut en bas", t: "Une ACL (Access Control List) est une suite de lignes de permit/deny évaluées dans l'ordre : la première ligne qui matche le paquet décide, et le reste de la liste est ignoré. À la fin de toute ACL s'ajoute un deny any implicite : si aucune ligne ne matche, le paquet est rejeté. Conséquence directe : l'ordre des lignes est une décision d'architecture — une ligne large en tête masque toutes les suivantes." , schema: 'acl-evaluation' },
                        { h: "Standard ou étendue", t: "ACL standard (1-99, 1300-1999) : ne regarde que l'IP source — 'je bloque tout ce qui vient de 10.1.2.0/24'. ACL étendue (100-199, 2000-2699) : source ET destination, protocole et ports — 'j'interdis le telnet du bureau A vers le serveur B, mais j'autorise le HTTPS'. La règle de placement : standard près de la destination (elle ne sait pas viser), étendue près de la source (précise, elle économise le réseau en bloquant tôt)." },
                        { h: "Le masque générique (wildcard)", t: "Le wildcard inverse le masque de sous-réseau : 0.0.0.255 sur une IP 192.168.1.0 signifie 'les trois premiers octets doivent correspondre, le dernier est libre' (= tout le /24). 0.0.0.0 = l'hôte exact (host), 255.255.255.255 = n'importe quelle adresse (any). Se familiariser avec ce masque est le prérequis numéro un pour écrire des ACL qui matchent ce qu'on vise vraiment." },
                        { h: "Ce qu'une ACL n'est pas", t: "Une ACL filtre : elle ne chiffre pas, ne détecte pas d'attaque, ne remplace pas un pare-feu à états (elle est sans état : chaque paquet est jugé seul, sans mémoire de la connexion). Elle sert aussi d'outil de sélection pour NAT, le routage par politique, ou les files QoS — dans ces cas, elle ne bloque rien du tout, elle trie." }
                    ]},
                    { title: "Leçon 2 — Écrire et appliquer une ACL", parts: [
                        { h: "La syntaxe étendue, ligne par ligne", t: "access-list 100 permit tcp 192.168.10.0 0.0.0.255 host 10.1.1.100 eq 443 se lit : 'autorise TCP, venant du réseau 192.168.10.0/24, vers l'hôte précis 10.1.1.100, port destination 443'. eq = égal ; gt/lt = supérieur/inférieur ; range pour une plage. Le protocole (tcp, udp, icmp, ip) précise la couche ; ip englobe tout." },
                        { h: "Named ACL : la bonne pratique", t: "ip access-list extended BLOQUER-TELNET crée une ACL nommée — lisible, modifiable ligne par ligne (insertion par numéro de séquence : 30 deny tcp...). Les ACL numérotées historiques se rééditent entièrement : la version nommée évite de tout retaper et documente l'intention dans le nom." },
                        { h: "L'application", t: "ip access-group BLOQUER-TELNET in (ou out) sur l'interface. Direction : in = le paquet est jugé en entrant dans l'interface (avant le routage) ; out = en sortant (après le routage). Une ACL par direction et par interface. La plupart des erreurs de prod sont des directions inversées : toujours redessiner le chemin du paquet avant d'écrire la règle." },
                        { h: "Vérifier : les compteurs", t: "show access-lists affiche chaque ligne suivie de (x matches) : les hits montent quand une ligne matche. Une ACL qui ne matche nulle part est soit mal placée, soit mal orientée, soit masquée par une ligne au-dessus. show ip interface G0/1 confirme quelle ACL est attachée dans quelle direction." }
                    ]},
                    { title: "Leçon 3 — La méthode en cinq étapes et le VTY", parts: [
                        { h: "La méthode d'écriture", t: "(1) Définir l'intention en une phrase métier ('le VLAN invité ne doit atteindre que la passerelle Internet et le proxy'). (2) La traduire en flux : sources, destinations, protocoles, ports. (3) Choisir standard/étendue et l'emplacement. (4) Écrire les lignes permit d'abord, en terminant par un deny explicite lisible (deny any / log). (5) Tester et surveiller les compteurs. Ce protocole évite 80% des ACLs 'bizarres' héritées." },
                        { h: "Protéger l'accès de gestion", t: "access-class 5 in sur les lignes VTY (line vty 0 4) limite QUI peut ouvrir une session SSH/Telnet au routeur : access-list 5 permit host 10.1.1.50 (le poste d'admin). Sans cela, tout sous-réseau routé peut tenter la gestion du routeur. C'est le réflexe de durcissement le plus rentable qui existe." },
                        { h: "Le log en fin de règle", t: "Ajouter log à une ligne deny fait générer un message à chaque match (IP source, destination, compteur). Indispensable pour comprendre ce qu'une ACL historique bloque réellement — à utiliser avec parcimonie (volume de logs) et jamais en pleine charge sans filtre." }
                    ]}
                ],
                guiSteps: [
                    { title: "Écrire une ACL nommée étendue", action: "Sur R1 dans Packet Tracer : ip access-list extended WEB-SEUL ; permit tcp 192.168.10.0 0.0.0.255 host 10.1.1.100 eq 80 ; deny ip 192.168.10.0 0.0.0.255 host 10.1.1.100 ; permit ip any any. Vérifiez avec show access-lists.", observation: "La liste affiche les trois lignes avec leurs numéros de séquence (10, 20, 30) et des compteurs (x matches) à zéro. La dernière ligne permit ip any any évite le deny any implicite de tout bloquer." },
                    { title: "L'appliquer et observer les compteurs", action: "Appliquez sur l'interface côté VLAN 10 : interface G0/1 ; ip access-group WEB-SEUL in. Depuis un PC du VLAN 10, ouvrez http://10.1.1.100 puis tentez un ping 10.1.1.100.", observation: "Le HTTP passe (ligne 10 : matches qui montent), le ping est refusé (ligne 20). Le trafic vers les autres destinations matche la ligne 30. Les compteurs racontent précisément le destin de chaque type de flux." },
                    { title: "Casser l'ordre des lignes pour comprendre", t: "Déplacez la ligne permit ip any any en tête (ip access-list re-sequence ou re-création : permit ip any any d'abord). Re-testez le ping vers 10.1.1.100.", observation: "Le ping PASSE maintenant : la première ligne large (permit any any) masque tout ce qui suit. Une ACL se lit de haut en bas et s'arrête au premier match — l'ordre est aussi important que le contenu." },
                    { title: "Protéger le SSH du routeur", action: "Créez access-list standard 5 : permit host 192.168.10.50 (poste admin). Sur line vty 0 4 : access-class 5 in, transport input ssh. Testez depuis le poste autorisé puis depuis un autre.", observation: "Le poste non autorisé reçoit un refus immédiat (la session ne s'ouvre pas) ; le poste autorisé se connecte. La gestion du routeur n'est plus exposée à tout le réseau routé." }
                ],
                deepDive: [
                    { t: "Le wildcard mask, calculé juste", p: [
                        "Autoriser tout un /24 : 192.168.10.0 0.0.0.255 (les 24 premiers bits fixés).",
                        "Autoriser une plage paire d'adresses (masque non contigu) : 0.0.0.254 fixe le dernier bit à 0 — les adresses paires seulement (usage rare, principalement pédagogique et QoS).",
                        "Retenir les trois classiques : 0.0.0.0 = host exact ; 255.255.255.255 = any ; 0.0.0.255 = le /24 complet.",
                        "La conversion masque→wildcard : soustraire chaque octet du masque à 255. (255.255.255.192 → 0.0.0.63)."
                    ],
                    cmd: [
                        "! Exemples de wildcards courants",
                        "access-list 10 permit 192.168.10.0 0.0.0.255   ! tout le /24",
                        "access-list 10 permit host 10.1.1.50           ! un seul hote",
                        "access-list 10 permit any                       ! toutes adresses"
                    ],
                    box: 'remember', boxText: "À retenir : wildcard = 255 - masque (octet par octet). host = 0.0.0.0, any = 255.255.255.255. L'ACL standard se juge sur la source seule ; l'étendue sur source, destination, protocole et ports." },
                    { t: "Diagnostic d'un 'ça ne passe plus' après ACL", p: [
                        "Lire show access-lists : quelle ligne matche ? Le deny any implicite ne se voit pas — ajouter deny ip any any log pour le révéler.",
                        "Vérifier le point d'attache : show ip interface G0/1 — ACL entrante ou sortante ?",
                        "Rejouer le paquet mentalement : de quelle interface il entre, avec quelle source/destination réelles à CE point du chemin (attention au NAT : avant/après traduction, l'IP source n'est pas la même).",
                        "Rappel : une ACL out sur une interface ne filtre pas le trafic ORIGINÉ par le routeur lui-même (OSPF, SSH du routeur) — il faut alors la placer sur le trafic transiting."
                    ],
                    cmd: [
                        "show access-lists WEB-SEUL     ! compteurs par ligne",
                        "show ip interface G0/1          ! quelle ACL, quelle direction",
                        "show running-config | section access-list"
                    ],
                    box: 'warn', boxText: "Erreur d'examen fréquente : oublier le deny any implicite. Une ACL avec uniquement des lignes permit pour un flux précis bloque TOUT le reste de l'interface. Terminer par permit ip any any (si l'intention est 'bloquer seulement X') ou assumer le deny final." },
                    { t: "Cas d'entreprise — le VLAN invité", p: [
                        "Situation : le SSID invité (VLAN 60) doit atteindre Internet et rien d'autre — ni les serveurs internes, ni les autres VLAN.",
                        "ACL étendue sur l'interface VLAN 60 du routeur, en in : permit udp 192.168.60.0 0.0.0.255 host 192.168.60.1 eq 67 (DHCP vers la passerelle), deny ip 192.168.60.0 0.0.0.255 10.0.0.0 0.255.255.255 (tout l'interne), permit ip any any (sortie Internet).",
                        "Résultat : DHCP OK, Internet OK, accès interne bloqué ; les compteurs de la ligne deny montent à chaque tentative — une sonde de monitoring externe qui scanne est immédiatement visible dans les hits."
                    ],
                    box: 'case', boxText: "Le réflexe professionnel : l'intention d'abord ('qui a le droit d'aller où'), la traduction en flux ensuite, l'ACL nommée en dernier — puis la vérification par compteurs. Une ACL non documentée devient une bombe à retardement pour le prochain technicien." }
                ],
                exercices: [
                    { enonce: "Écrivez une ACL nommée qui : autorise le VLAN Compta (192.168.20.0/24) à joindre le serveur RH (10.1.1.100) en HTTPS uniquement ; refuse tout le reste du VLAN Compta vers 10.1.1.100 ; laisse passer tout le reste du trafic sans restriction. Précisez où l'appliquer.", correction: "ip access-list extended COMPTA-RH : permit tcp 192.168.20.0 0.0.0.255 host 10.1.1.100 eq 443 ; deny ip 192.168.20.0 0.0.0.255 host 10.1.1.100 ; permit ip any any. Placement : près de la source (étendue = bloquer tôt), sur l'interface G0/2 côté VLAN Compta, direction in. Vérification : show access-lists — les matches de la ligne 1 montent lors d'un HTTPS, ceux de la ligne 2 lors d'un ping refusé. La ligne 3 évite que le deny any implicite ne coupe le reste du réseau." },
                    { enonce: "Un technicien applique 'access-class 15 in' sur line vty mais a défini l'ACL 15 avec 'permit ip any any'. Quel est l'effet et quelles sont les deux erreurs ?", correction: "L'effet : tout le monde peut encore ouvrir une session au routeur — l'ACL ne filtre rien. Erreur 1 : sur les VTY on utilise une ACL standard qui matche des hôtes sources (access-list 15 permit host x.x.x.x), pas un permit any ; la ligne 'permit ip any any' est une syntaxe d'ACL étendue, invalide ou inutile ici selon l'IOS. Erreur 2 : l'objectif était de restreindre la gestion aux postes admin : il faut lister les hôtes autorisés et rien d'autre (le deny implicite fera le reste). Correction : access-list 15 permit host 192.168.10.50 puis access-class 15 in sur line vty 0 4, avec transport input ssh." }
                ],
                resume: "Une ACL est une liste ordonnée de permit/deny, lue de haut en bas, close par un deny any implicite. Standard = source seule, près de la destination ; étendue = source/destination/protocole/ports, près de la source. Les wildcard masks ciblent les plages ; les compteurs de show access-lists vérifient le destin des paquets. Une ACL ne remplace pas un pare-feu à états mais sélectionne aussi NAT, QoS et VTY.",
                suite: "La fiche domaine 4.0 (sécurité des services) complète le tableau : DHCP snooping, DAI et AAA protègent la couche 2 et les accès.",
            },
            {
                id: 'ccna-v2-dom4',
                certif: 'CCNA',
                parcours: 'CCNA',
                code: '4.0',
                title: 'Network Services and Security',
                why: "Le CCNA v2.0 met l'accent sur le durcissement du niveau 2 (DHCP Snooping, DAI) et les frameworks AAA pour contrer les attaques de spoofing et d'usurpation.",
                keyIdeas: [
                    "DHCP Snooping : Intercepte les messages DHCP non autorises pour empecher l'injection de fausses passerelles.",
                    "Dynamic ARP Inspection (DAI) : Inspecte les paquets ARP en les comparant a la table DHCP Snooping pour parer l'ARP Poisoning.",
                    "AAA (Authentication, Authorization, Accounting) : Centralise le controle des acces reseau via RADIUS ou TACACS+."
                ],
                schemaType: 'dhcp-exchange',
                guiProcedure: "Sur Cisco Catalyst Center (DNA Center) : Naviguer dans 'Provision' -> 'Network Devices' -> Selectionner le Switch -> 'Security Policies' -> Activer 'DHCP Snooping & DAI' -> Cliquer sur 'Deploy'.",
                cliProcedure: [
                    { cmd: "ip dhcp snooping\nip dhcp snooping vlan 10,20", desc: "Active la fonction DHCP Snooping au niveau global et sur les VLANs 10 et 20." },
                    { cmd: "interface GigabitEthernet0/1\n ip dhcp snooping trust", desc: "Declare le port relie au serveur DHCP legitime comme port de confiance (Trust)." },
                    { cmd: "ip arp inspection vlan 10", desc: "Active l'inspection dynamique des paquets ARP sur le VLAN 10." }
                ],
                verification: { cmd: "show ip dhcp snooping binding", expected: "Affiche la table de correspondance MAC/IP/Port/VLAN validee par le switch." },
                pitfalls: [
                    "Oublier d'activer la confiance ('trust') sur les ports d'inter-switchs, ce qui bloque la distribution des adresses IP.",
                    "Ne pas synchroniser le temps des equipements via NTP, rendant inexploitables les logs d'audit et les jetons AAA.",
                    "Confondre TACACS+ (Chiffre tout le paquet, Cisco) et RADIUS (Chiffre uniquement le mot de passe, Open)."
                ],
                vocab: [
                    { en: "DHCP Snooping", fr: "Surveillance et filtrage DHCP" },
                    { en: "Man-in-the-Middle (MitM)", fr: "Attaque de l'homme du milieu" },
                    { en: "Port Security", fr: "Securite des ports" }
                ],
                statut: 'brouillon à relire',
                niveau: 'Intermédiaire (fiche d\u2019illustration)',
                prerequis: "Les notions de commutation des sujets 1.1 à 1.7 ; cette fiche illustre le domaine 2.0 (sécurité réseau) et sera complétée.",
                objectifs: [
                    "Expliquer en quoi DHCP Snooping protège le réseau contre de faux serveurs DHCP",
                    "Décrire le rôle de Dynamic ARP Inspection contre l'usurpation ARP",
                    "Nommer les composants AAA et distinguer RADIUS de TACACS+",
                    "Retenir le piège classique des ports trust sur les liaisons inter-switchs"
                ],
                links: { qcmId: 3, labId: 'lab-1', cheatSheetCat: 'Cisco' }
            }
        ];
