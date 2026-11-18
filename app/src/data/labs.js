export const LABS_DATA = [            {
                id: 'lab-1',
                title: 'Lab 1 : Interconnexion et Sécurisation Inter-VLAN',
                certif: 'TSSR / AIS / CCNA',
                duration: '30 min',
                objective: "Mettre en œuvre deux VLANs sur un switch Cisco, configurer un Trunk 802.1Q vers un routeur (Router-on-a-Stick) avec adresses RFC 5737 et valider la connectivité.",
                prereqs: "Notions de commutation N2, adressage IPv4 et masques de sous-réseau.",
                addressPlan: "RFC 5737 (Plage de documentation) : VLAN 10 (192.0.2.0/24), VLAN 20 (198.51.100.0/24)",
                steps: [
                    {
                        num: 1,
                        title: "Configuration des VLANs sur le Commutateur S1",
                        instructions: "Créez le VLAN 10 (COMPTA) et le VLAN 20 (PROD). Assignez le port Fa0/1 au VLAN 10 et Fa0/2 au VLAN 20.",
                        cli: "S1# configure terminal\nS1(config)# vlan 10\nS1(config-vlan)# name COMPTA\nS1(config-vlan)# vlan 20\nS1(config-vlan)# name PROD\nS1(config-vlan)# interface FastEthernet0/1\nS1(config-if)# switchport mode access\nS1(config-if)# switchport access vlan 10\nS1(config-if)# interface FastEthernet0/2\nS1(config-if)# switchport mode access\nS1(config-if)# switchport access vlan 20",
                        checkpoint: "Tapez 'show vlan brief'. Les VLANs 10 et 20 doivent être affichés avec l'état 'active'."
                    },
                    {
                        num: 2,
                        title: "Configuration de la liaison Trunk 802.1Q",
                        instructions: "Configurez l'interface GigabitEthernet0/1 de S1 reliant le routeur R1 en mode Trunk.",
                        cli: "S1(config)# interface GigabitEthernet0/1\nS1(config-if)# switchport mode trunk\nS1(config-if)# switchport trunk allowed vlan 10,20",
                        checkpoint: "Executez 'show interfaces trunk'. Le port Gi0/1 doit apparaître en mode 'trunking'."
                    },
                    {
                        num: 3,
                        title: "Configuration du Routeur R1 (Router-on-a-Stick)",
                        instructions: "Créez les sous-interfaces Gi0/0.10 et Gi0/0.20 sur R1 et appliquez l'encapsulation 802.1Q.",
                        cli: "R1# configure terminal\nR1(config)# interface GigabitEthernet0/0\nR1(config-if)# no shutdown\nR1(config-if)# interface GigabitEthernet0/0.10\nR1(config-subif)# encapsulation dot1Q 10\nR1(config-subif)# ip address 192.0.2.254 255.255.255.0\nR1(config-subif)# interface GigabitEthernet0/0.20\nR1(config-subif)# encapsulation dot1Q 20\nR1(config-subif)# ip address 198.51.100.254 255.255.255.0",
                        checkpoint: "Depuis le PC1 (192.0.2.1), exécutez 'ping 198.51.100.1' (PC2 sur VLAN 20)."
                    }
                ],
                troubleshooting: [
                    "Couche 1 (Physique) : Contrôler l'état du câble et des interfaces ('show interfaces status').",
                    "Couche 2 (Liaison) : Vérifier que l'ID d'encapsulation 'dot1Q <ID>' sur le routeur correspond à l'ID exact du VLAN.",
                    "Couche 3 (Réseau) : S'assurer que chaque hôte dispose de la bonne passerelle par défaut (l'adresse IP de la sous-interface R1)."
                ],
                solution: "Exécuter 'show ip route' sur R1. Les deux sous-réseaux 192.0.2.0/24 et 198.51.100.0/24 doivent être marqués avec la lettre 'C' (directement connecté)."
},
            {
                id: 'lab-ccna-02',
                title: 'CCNA 02 — VLANs access et trunk entre deux commutateurs',
                parcours: 'CCNA',
                level: 'Débutant',
                duration: '30-40 min',
                objective: "Créer deux VLAN sur deux commutateurs liés par un trunk 802.1Q, attribuer les ports d'accès par VLAN et vérifier la propagation du tag 802.1Q.",
                context: "Deux étages d'un bâtiment sont servis par SW1 et SW2 chaînés. Les équipes IT (VLAN 10) et RH (VLAN 20) doivent rester isolées au niveau 2 ; la communication ne passe que par le routeur de sortie.",
                prereqs: "2 switches managés Cisco (ou Packet Tracer), 2 PC, notions de VLAN, mode access et mode trunk.",
                topology: "PC-A1 (VLAN 10) — Fa0/1 SW1 — Gi0/1 (trunk) — Gi0/1 SW2 — Fa0/2 PC-B1 (VLAN 20)",
                steps: [
                    { num: 1, title: "Créer les VLAN 10 et 20", instructions: "Depuis la configuration globale, créez les deux VLAN avec un nommage explicite sur les deux switchs.", cli: "SW1# conf t\nSW1(config)# vlan 10\nSW1(config-vlan)# name IT\nSW1(config-vlan)# vlan 20\nSW1(config-vlan)# name RH", checkpoint: "'show vlan brief' liste les VLAN 10 et 20 sur SW1 et SW2, état 'active'." },
                    { num: 2, title: "Affecter les ports d'accès", instructions: "Placez Fa0/1 en VLAN 10 côté SW1 et Fa0/2 en VLAN 20 côté SW2.", cli: "SW1(config)# interface fa0/1\nSW1(config-if)# switchport mode access\nSW1(config-if)# switchport access vlan 10\nSW2(config)# interface fa0/2\nSW2(config-if)# switchport mode access\nSW2(config-if)# switchport access vlan 20", checkpoint: "'show vlan brief' montre Fa0/1 (VLAN 10) sur SW1 et Fa0/2 (VLAN 20) sur SW2." },
                    { num: 3, title: "Configurer le trunk entre les deux switchs", instructions: "Sur l'interconnexion Gi0/1 des deux côtés, forcez le mode trunk et autorisez explicitement les VLAN 10 et 20.", cli: "SW1(config)# interface gi0/1\nSW1(config-if)# switchport mode trunk\nSW1(config-if)# switchport trunk allowed vlan 10,20\nSW2(config)# interface gi0/1\nSW2(config-if)# switchport mode trunk\nSW2(config-if)# switchport trunk allowed vlan 10,20", checkpoint: "'show interfaces trunk' affiche Gi0/1 en trunking avec VLAN 10,20 autorisés des deux côtés." },
                    { num: 4, title: "Tester intra et inter-VLAN", instructions: "Attribuez 192.168.10.x/24 aux PC du VLAN 10 et 192.168.20.x/24 au PC du VLAN 20. Aucune couche 3 dans ce labo.", cli: "PC-A1> ping 192.168.10.2  (réussit : même VLAN)\nPC-A1> ping 192.168.20.2  (échoue : routage inter-VLAN absent)", checkpoint: "Même VLAN = communication ; VLAN différents = isolation tant que la couche 3 n'existe pas." }
                ],
                pitfalls: [
                    "Trunk forcé d'un seul côté : l'autre port y reste access (via DTP) et payable un mismatch VLAN natif ; forcez le trunk des deux extrémités.",
                    "VLAN natif différent de part et d'autre du trunk : le trafic du VLAN natif circule non balisé et se mélange entre VLAN.",
                    "Ajouter un lien matériel en parallèle avant d'avoir STP actif : tempête de broadcast garantie si le STP est coupé sur ce lien."
                ],
                expectedResults: [
                    "'show vlan brief' liste les deux VLAN avec leur nom.",
                    "'show interfaces trunk' au bon mode trunking des deux côtés.",
                    "Le ping intra-VLAN réussit, le ping inter-VLAN échoue (aucune couche 3 configurée dans ce labo)."
                ],
                troubleshooting: [
                    "Couche 1 : vérifier les statuts des interfaces ('show interfaces status').",
                    "Couche 2 : un extremity trunk d'un côté et pas de l'autre (DTP).",
                    "Couche 3 : un routage inter-VLAN est impossible sans router, le trunk seul n'est pas une indication que ça marchera."
                ],
                solution: "Sur chaque switch, configurer 'switchport mode trunk' et 'switchport trunk allowed vlan 10,20' sur Gi0/1, vérifier 'show interfaces trunk' des deux côtés, puis fixer explicitement le VLAN natif (switchport trunk native vlan 1) pour supprimer tout mismatch."
            },
            {
                id: 'lab-ccna-03',
                title: 'CCNA 03 — STP : imposer le pont racine et contrôler la convergence',
                parcours: 'CCNA',
                level: 'Intermédiaire',
                duration: '30-45 min',
                objective: "Mettre en place un anneau redondant de trois commutateurs, imposer SW1 comme racine (rapid-pvst) et observer le comportement des ports bloqués puis la bascule lors d'une panne de lien.",
                context: "Une PME a câblé un anneau de 3 switchs pour tolérer la panne d'un lien d'agrégation. Sans maîtrise de STP, cette redondance devient une boucle physique ; le labo montre quoi observer et comment verrouiller le pont racine.",
                prereqs: "3 switches interconnectés (ou Packet Tracer). Connaître les états STP et la notion de priorité de pont.",
                topology: "SW1–SW2 (Gi0/1), SW2–SW3 (Gi0/1), SW3–SW1 (Gi0/2) en triangle.",
                steps: [
                    { num: 1, title: "Observer l'élection spontanée du pont racine", instructions: "Avec la configuration par défaut, observez qui est élu racine (la priorité étant égale, c'est l'adresse MAC la plus basse qui gagne) et quels ports sont bloqués.", cli: "SW2# show spanning-tree\nSW3# show spanning-tree", checkpoint: "Le Root ID retenu correspond à un des trois switchs ; un port de SW3 (ou SW2) joue en état BLK/ALTN : STP a bien bloqué une boucle." },
                    { num: 2, title: "Aligner rapid-pvst sur les trois switchs", instructions: "Passez le mode spanning-tree en rapid-pvst partout pour une convergence rapide de tous les VLAN.", cli: "SW1(config)# spanning-tree mode rapid-pvst\nSW2(config)# spanning-tree mode rapid-pvst\nSW3(config)# spanning-tree mode rapid-pvst", checkpoint: "'show spanning-tree summary' renvoie 'rapid pvst' comme mode actif." },
                    { num: 3, title: "Imposer SW1 racine", instructions: "Définissez SW1 comme racine principale pour les VLAN standards (priorité abaissée automatiquement).", cli: "SW1(config)# spanning-tree vlan 1-1005 root primary", checkpoint: "Sur SW1, 'show spanning-tree' affiche Root ID = Bridge ID de SW1 et tous les ports en état FWD." },
                    { num: 4, title: "Tester le basculement après panne de lien", instructions: "Coupez le lien SW1-SW3 et observez la bascule du trafic vers SW2/SW1 (via Gi0/1) et la remontée du port bloqué.", cli: "SW3(config)# interface gi0/2\nSW3(config-if)# shutdown", checkpoint: "Le port alterné Gi0/1 de SW3 passe en FWD en quelques secondes ; le trafic avec SW1 est restauré via SW2. Relancez le lien ensuite (no shutdown)." }
                ],
                pitfalls: [
                    "Laisser la priorité par défaut : un nouveau switch introduit plus tard peut devenir racine et déplacer tout le trafic ; verrouillez toujours le root principal (et secours avec root secondary).",
                    "Port-fast configuré sur un lien vers un autre switch : le protocole interdit les boucles et peut créer un temporaire de boucle au branchement — réservez port-fast aux ports d'accès vers des hôtes.",
                    "Coupure du mauvais lien pendant le test : si vous coupez l'unique lien descendant d'un switch, la topologie s'isole au lieu de basculer."
                ],
                expectedResults: [
                    "SW1 est pont racine (priorité abaissée), ses ports tous forwarding.",
                    "Un port alternatif est bien en état bloqué sur SW3, pas de tempêtes de broadcast.",
                    "Après coupure et remontée de lien, la convergence rapide (rapporté sous 10 s) sans chute permanente de la connectivité."
                ],
                troubleshooting: [
                    "Couche 1 : statut des interfaces du triangle ('show interfaces status').",
                    "Couche 2 : contrôle VLAN par VLAN avec 'show spanning-tree vlan 10' (racine, ports racine/alternatif).",
                    "Compteur de changements de topologie : 'show spanning-tree detail' signale des TOPCHANGE répétés, signe d'un lien chancelant."
                ],
                solution: "Sur SW3, 'show spanning-tree' doit montrer Gi0/1 en root FWD vers SW2 après la coupure, puis Gi0/2 repassé FWD après le 'no shutdown'. En cas d'instabilité (TOPCHANGE répétés), suspectez un lien chancelant ou un équipement qui réémet des BPDU racine : protégez les ports d'accès avec 'spanning-tree guard root'."
            },
            {
                id: 'lab-ccna-04',
                title: 'CCNA 04 - EtherChannel LACP sur l\'interconnexion SW1-SW2',
                parcours: 'CCNA',
                level: 'Intermédiaire',
                duration: '30-40 min',
                objective: "Agréger deux liens entre SW1 et SW2 en un EtherChannel LACP, vérifier le bundle et valider la tolérance à la panne d'un membre.",
                context: "L'interconnexion SW1-SW2 sature à 1 Gb/s. Un second lien n'ajoute rien sans agrégation : STP bloquerait un des deux liens. L'EtherChannel présente les deux liens comme une seule interface logique de 2 Gb/s.",
                prereqs: "2 switchs avec 2 liens physiques entre eux (Fa0/23 et Fa0/24). Base du labo CCNA 02.",
                topology: "SW1 Fa0/23-SW2 Fa0/23 et SW1 Fa0/24-SW2 Fa0/24 ; un PC en VLAN 10 de chaque côté.",
                steps: [
                    {
                        num: 1,
                        title: "Créer le canal Po1 côté SW1 (LACP active)",
                        instructions: "Coupez les deux liens avant la configuration pour éviter une re-convergence STP, créez le channel-group LACP en mode active, puis laissez le port-channel hériter du mode trunk.",
                        cli: "SW1(config)# interface range fa0/23 - 24\nSW1(config-if-range)# shutdown\nSW1(config-if-range)# channel-group 1 mode active\nSW1(config-if-range)# no shutdown\nSW1(config)# interface port-channel 1\nSW1(config-if)# switchport mode trunk\nSW1(config-if)# switchport trunk allowed vlan 10,20",
                        checkpoint: "'show etherchannel summary' retourne Po1(SU) avec Fa0/23(P) et Fa0/24(P)."
                    },
                    {
                        num: 2,
                        title: "Répliquer sur SW2 (LACP passive)",
                        instructions: "Le mode passive répond aux paquets LACP de SW1 : le canal se monte des deux côtés.",
                        cli: "SW2(config)# interface range fa0/23 - 24\nSW2(config-if-range)# channel-group 1 mode passive\nSW2(config)# interface port-channel 1\nSW2(config-if)# switchport mode trunk\nSW2(config-if)# switchport trunk allowed vlan 10,20",
                        checkpoint: "'show etherchannel summary' affiche Po1(SU) et les deux membres P ; le ping des PC du VLAN 10 transite par le canal."
                    },
                    {
                        num: 3,
                        title: "Contrôles du bundle",
                        instructions: "Vérifiez le bundle, la configuration héritée du port-channel et l'absence de port membre bloqué par STP.",
                        cli: "SW1# show etherchannel summary\nSW1# show interfaces port-channel 1\nSW1# show spanning-tree",
                        checkpoint: "Po1 apparait comme une unique interface dans spanning-tree, en trunk, VLAN 10 et 20 autorisés."
                    },
                    {
                        num: 4,
                        title: "Panne contrôlée d'un membre",
                        instructions: "Coupez Fa0/24 côté SW2 et vérification la latence et l'indépendance du canal.",
                        cli: "SW2(config)# interface fa0/24\nSW2(config-if)# shutdown",
                        checkpoint: "Le canal Po1 reste UP ; Fa0/24 passe en 'D' (down) ; le trafic bascule via Fa0/23."
                    }
                ],
                pitfalls: [
                    "Modes LACP incompatibles : 'active' ne se marie qu'avec 'passive' ou 'active'. PAgP (desirable/auto) est un autre protocole, ne les mélangez pas.",
                    "Configurer le trunk sur un lien physique au lieu du port-channel : le mode et les VLAN autorisés doivent être cohérités du canal, sinon le trunk diverge.",
                    "Omettre le shutdown des liens avant agrégation : le canal monte puis se démonte le temps que STP re-découvre la topologie ; un 'shutdown / no shutdown' des membres l'évite."
                ],
                expectedResults: [
                    "'show etherchannel summary' affiche Po1(SU) avec les deux membres en P.",
                    "STP voit Po1 comme un seul port ; aucun membre ne reste bloqué.",
                    "Après coupure de Fa0/24, le canal reste opérationnel via Fa0/23 sans perte de ping."
                ],
                troubleshooting: [
                    "Couche 1 : vitesse et duplex identiques sur les deux membres des deux côtés.",
                    "Couche 2 : le plan du trunk doit être cohérent SW1-SW2 sur le port-channel (mode, natif, allowed).",
                    "Diagnostic LACP : 'debug lacp packets' puis 'undebug all' dès la fin."
                ],
                solution: "Le canal Po1 (LACP active/passive) est UP : 'show etherchannel summary' affiche Po1(SU), deux membres P ; le shutdown de Fa0/24 est sans impact, le trafic passe par Fa0/23. En cas de désagrégation, supprimez le channel-group ('no channel-group 1') puis reconstruisez-le."
            },
            {
                id: 'lab-ccna-05',
                title: 'CCNA 05 - Routage statique et statique flottante (distance administrative)',
                parcours: 'CCNA',
                level: 'Intermédiaire',
                duration: '30-40 min',
                objective: "Configurer des routes statiques entre trois routeurs, puis une statique flottante de secours avec une distance administrative supérieure, et vérifier le basculement.",
                context: "R1-R3 sont reliés par une liaison principale et une liaison de secours plus lente. La sauvegarde ne doit prendre la main que si le lien principal tombe.",
                prereqs: "3 routeurs chaînés (ou Packet Tracer). Comprendre la distance administrative et les IP du plan d'adressage.",
                topology: "R1 - R2 - R3 en série sur le lien principal ; un lien de secours R1 - R3 sur une interface séparée.",
                addressPlan: "Lien principal : 10.1.12.0/30 (R1-R2), 10.1.23.0/30 (R2-R3) ; secours : 10.9.13.0/30 (R1-R3) ; LAN R3 : 10.3.3.0/24.",
                steps: [
                    { num: 1, title: "Adressage des interfaces", instructions: "Configurez les interfaces du lien principal et de secours, activation no shutdown incluse.", cli: "R1(config)# interface g0/0\nR1(config-if)# ip address 10.1.12.1 255.255.255.252\nR1(config-if)# no shutdown\nR1(config-if)# interface g1/0\nR1(config-if)# ip address 10.9.13.1 255.255.255.252\nR1(config-if)# no shutdown", checkpoint: "'show ip interface brief' : les interfaces sont up/up avec les bonnes IP." },
                    { num: 2, title: "Routes statiques principales", instructions: "R1 apprend 10.3.3.0/24 via R2 ; R3 fait l'équivalent vers le LAN de R1 ; R2 connaît les deux LANs.", cli: "R1(config)# ip route 10.3.3.0 255.255.255.0 10.1.12.2\nR3(config)# ip route 10.1.1.0 255.255.255.0 10.1.23.2\nR2(config)# ip route 10.1.1.0 255.255.255.0 10.1.12.1\nR2(config)# ip route 10.3.3.0 255.255.255.0 10.1.23.3", checkpoint: "'show ip route' : les réseaux distants apparaissent avec le code 'S'." },
                    { num: 3, title: "Route flottante de secours", instructions: "Ajoutez la même destination via le lien de secours avec une AD 100 (moins fiable que 1).", cli: "R1(config)# ip route 10.3.3.0 255.255.255.0 10.9.13.2 100", checkpoint: "'show ip route 10.3.3.0' : seule la route AD 1 est installée ; la flottante reste dans le 'show running-config'." },
                    { num: 4, title: "Vérifier le basculement", instructions: "Coupez le lien principal côté R1 et constatez l'installation de la route AD 100 dans la table.", cli: "R1(config)# interface g0/0\nR1(config-if)# shutdown\nR1# show ip route 10.3.3.0", checkpoint: "Le next-hop 10.9.13.2 prend la place, code S avec [100/0]. Remettez le lien : la route AD 1 revient automatiquement." }
                ],
                pitfalls: [
                    "Oublier le no shutdown sur l'interface de secours : la route flottante ne s'installe jamais car le next-hop est injoignable.",
                    "Utiliser une AD inférieure à la route principale : la sauvegarde prend la main tout de suite au lieu de patienter.",
                    "Routes statiques asymétriques sans retour : le ping passe à l'aller mais échoue au retour si R3 n'a pas la route de retour."
                ],
                expectedResults: [
                    "'show ip route' contient les routes S du plan d'adressage vers les LANs distants.",
                    "Le trafic passe par le lien principal tant qu'il est UP.",
                    "Après coupure du principal, la route AD 100 s'installe et le ping survit ; il retourne au principal dès le lien restauré."
                ],
                troubleshooting: [
                    "Couche 1 : vérifier les interfaces up/up des deux liens.",
                    "Couche 3 : 'show ip route <dest>' pour voir quelle route est active et son AD.",
                    "Le ping avec 'source' force l'IP de la sortie si l'aller-retour asymétrique est suspect."
                ],
                solution: "La configuration complète se relit dans 'show running-config | section ip route' : route principale AD 1 par le lien 10.1, flottante AD 100 par le lien 10.9. Le basculement se prouve avec 'show ip route 10.3.3.0' après shutdown/recovery."
            },
            {
                id: 'lab-ccna-06',
                title: 'CCNA 06 - OSPF single-area sur trois routeurs',
                parcours: 'CCNA',
                level: 'Intermédiaire',
                duration: '35-45 min',
                objective: "Activer OSPF en zone 0 sur trois routeurs, vérifier les adjacences et la table de routage dynamique, puis ajuster un coût d'interface.",
                context: "Trois sites d'une PME en série : le routage doit converger automatiquement sans route statique à maintenir. OSPF zone 0 est retenu (métrique basée sur la bande passante).",
                prereqs: "3 routeurs chaînés (réutilisation du plan du labo CCNA 05, sans les routes statiques). Notions de router-id et de coût OSPF.",
                topology: "R1 - R2 - R3 ; un LAN par site : 10.1.1.0/24, 10.2.2.0/24, 10.3.3.0/24.",
                addressPlan: "Liens /30 : 10.1.12.0, 10.1.23.0 ; loopbacks 1.1.1.1, 2.2.2.2, 3.3.3.3 pour les router-id.",
                steps: [
                    {
                        num: 1,
                        title: "Activer OSPF zone 0 sur R1",
                        instructions: "Déclarez le process 10, laissez le router-id dériver du loopback (1.1.1.1) et publiez les réseaux actifs en zone 0. Marquez l'interface LAN en passive.",
                        cli: "R1(config)# router ospf 10\nR1(config-router)# network 10.1.12.0 0.0.0.3 area 0\nR1(config-router)# network 10.1.1.0 0.0.0.255 area 0\nR1(config-router)# passive-interface g0/1",
                        checkpoint: "'show ip ospf neighbor' : adjacence FULL avec R2."
                    },
                    {
                        num: 2,
                        title: "OSPF sur R2 et R3",
                        instructions: "Même process 10, chaque interface réseau déclarée en zone 0, interfaces LAN en passive.",
                        cli: "R2(config)# router ospf 10\nR2(config-router)# network 10.1.12.0 0.0.0.3 area 0\nR2(config-router)# network 10.1.23.0 0.0.0.3 area 0\nR3(config)# router ospf 10\nR3(config-router)# network 10.1.23.0 0.0.0.3 area 0\nR3(config-router)# network 10.3.3.0 0.0.0.255 area 0",
                        checkpoint: "Les adjacences FULL R1-R2 puis R2-R3 apparaissent dans 'show ip ospf neighbor'."
                    },
                    {
                        num: 3,
                        title: "Vérifier la table et les coûts",
                        instructions: "Regardez la table de routage (routes O) et les coûts des interfaces (référence 100 Mb/s par défaut).",
                        cli: "R1# show ip route\nR1# show ip ospf interface brief",
                        checkpoint: "Les LAN distants apparaissent en 'O' ; le coût d'un FastEthernet vaut 1 (la référence par défaut est 100 Mb/s)."
                    },
                    {
                        num: 4,
                        title: "Ajuster le coût d'un lien et observer",
                        instructions: "Abaissez volontairement un coût pour orienter le flux et regardez la métrique OSPF recalculée.",
                        cli: "R1(config)# interface g1/0\nR1(config-if)# ip ospf cost 20\nR1# show ip route 10.3.3.0",
                        checkpoint: "La métrique OSPF de la route vers 10.3.3.0 s'ajuste du nouveau coût."
                    }
                ],
                pitfalls: [
                    "Router-id dupliqué : deux routeurs OSPF avec le même router-id ne maintiennent jamais d'adjacence stable.",
                    "Masque wildcard inversé : pour un /30, le wildcard est 0.0.0.3, pas le masque 255.255.255.252.",
                    "Passive-interface oubliée sur les LAN : les HELLO OSPF partent vers des machines de production par pure pollution."
                ],
                expectedResults: [
                    "'show ip ospf neighbor' : adjacences FULL entre R1-R2 et R2-R3.",
                    "'show ip route' contient les trois LAN en 'O' avec des métriques cohérentes.",
                    "Un traceroute depuis R1 suit le chemin au coût le plus bas."
                ],
                troubleshooting: [
                    "Adjacence absente : vérifier le 'network OSPF' déclaré côté pair et l'area identique.",
                    "Vérifier qu'une ACL ne filtre pas le multicast 224.0.0.5/6 sur le lien.",
                    "Router-id réel : 'show ip ospf' l'affiche en entête (issu du loopback)."
                ],
                solution: "La configuration se relit dans 'show running-config | section router ospf' : network, zone, router-id — puis 'clear ip ospf process' (answer yes) pour reconstruire les adjacences, contrôlées ensuite avec 'show ip ospf neighbor'."
            },
            {
                id: 'lab-ccna-07',
                title: 'CCNA 07 - Durcissement de l\'accès de gestion : SSH v2 et comptes',
                parcours: 'CCNA',
                level: 'Intermédiaire',
                duration: '30 min',
                objective: "Sécuriser l'administration d'un switch : compte d'administration, SSH v2 uniquement, bannière d'avertissement, déconnexion automatique et blocage anti force brute.",
                prereqs: "1 switch (ou routeur). Mots de passe enable et console déjà configurés.",
                topology: "Un PC admin sur le LAN, accès console + SSH vers S1.",
                steps: [
                    { num: 1, title: "Prérequis SSH (hostname et domaine)", instructions: "SSH exige un nom d'hôte et un nom de domaine pour générer les clés RSA.", cli: "S1# conf t\nS1(config)# hostname SW-ACC1\nSW-ACC1(config)# ip domain-name lab.lan", checkpoint: "Le prompt affiche le nouveau hostname." },
                    { num: 2, title: "Compte administrateur + secrets", instructions: "Créez un utilisateur local, un secret enable hashé et le chiffrement des mots de passe.", cli: "SW-ACC1(config)# username admin secret P@ssw0rd\nSW-ACC1(config)# enable secret S3cr3t!\nSW-ACC1(config)# service password-encryption", checkpoint: "'show run | include username' : le secret apparaît chiffré." },
                    { num: 3, title: "Clés RSA + SSH v2 sur les vty", instructions: "Générez les clés RSA 2048 bits, forcez SSH v2, authentification locale et SSH seul sur les vty.", cli: "SW-ACC1(config)# crypto key generate rsa general-keys modulus 2048\nSW-ACC1(config)# ip ssh version 2\nSW-ACC1(config)# line vty 0 15\nSW-ACC1(config-line)# transport input ssh\nSW-ACC1(config-line)# login local\nSW-ACC1(config-line)# exec-timeout 5 0", checkpoint: "'show ssh' et 'show ip ssh' confirment SSH 2.0 activé." },
                    { num: 4, title: "Bannière et blocage anti force brute", instructions: "Ajoutez une bannière motd adaptée et bloquez 60 s après 3 échecs en 60 s, pour limiter le brute force.", cli: "SW-ACC1(config)# banner motd *Acces reserve - toute intervention est journalisee*\nSW-ACC1(config)# login block-for 60 attempts 3 within 60", checkpoint: "Après 3 mauvais mots de passe successifs, une tentative est rejetée avec délai de 60 s." }
                ],
                pitfalls: [
                    "Utiliser 'password' au lieu de 'secret' : le mot de passe est stocké en clair faiblement obfusqué.",
                    "Restreindre vty à 'transport input telnet' par habitude : le telnet circule en clair, interdiction du sujet d'examen.",
                    "Pas de 'login local' : le vty exige un mot de passe de ligne et non le compte utilisateur créé."
                ],
                expectedResults: [
                    "Aucune session Telnet possible ('transport input ssh' refuse).",
                    "'show ip ssh' : version 2, authentification SSH activée sur la clé 2048 bits.",
                    "Déconnexion automatique après 5 minutes d'inactivité."
                ],
                troubleshooting: [
                    "Refus de connexion SSH : vérifier les clés ('show crypto key mypubkey rsa') et le domaine ('show run | include domain').",
                    "Echec de vty : 'login local' et 'transport input ssh' sous line vty."
                ],
                solution: "La configuration complète s'examine dans 'show run | section line vty' + 'show ip ssh'. Pour repartir proprement : 'crypto key zeroize rsa', régénérer, et retester la session en 'ssh -l admin <ip>'."
            },
            {
                id: 'lab-ccna-08',
                title: 'CCNA 08 - ACL étendue : filtrer les flux vers un serveur web interne',
                parcours: 'CCNA',
                level: 'Intermédiaire',
                duration: '30-40 min',
                objective: "Filtrer une ACL étendue sur une interface : autoriser HTTP/HTTPS au serveur web 172.16.20.10 depuis le LAN, refuser Telnet, tout refuser du reste et contrôler les matchs.",
                prereqs: "Routeur inter-VLAN basique (labo CCNA 01). Serveur web et clients de test.",
                topology: "LAN 172.16.10.0/24 (clients) — R1 g0/0 ; LAN serveurs 172.16.20.0/24 — R1 g0/1 ; serveur web 172.16.20.10 (80/443) et 172.16.20.99 (cible interdite).",
                steps: [
                    { num: 1, title: "Créer l'ACL nommée étendue WEB-IN", instructions: "Entrées ordonnées : autoriser HTTP/HTTPS vers le serveur, refuser tout autre flux vers le LAN serveurs, autoriser le reste (réponse au retour, ICMP de suivi).", cli: "R1(config)# ip access-list extended WEB-IN\nR1(config-ext-nacl)# 10 permit tcp 172.16.10.0 0.0.0.255 host 172.16.20.10 eq 80\nR1(config-ext-nacl)# 20 permit tcp 172.16.10.0 0.0.0.255 host 172.16.20.10 eq 443\nR1(config-ext-nacl)# 30 deny ip 172.16.10.0 0.0.0.255 172.16.20.0 0.0.0.255\nR1(config-ext-nacl)# 40 permit ip any any", checkpoint: "'show access-lists WEB-IN' liste les 4 ACE numérotées." },
                    { num: 2, title: "Appliquer l'ACL en sortie d'interface", instructions: "Appliquez WEB-IN en 'out' sur l'interface vers le LAN serveurs (g0/1), car le filtre porte sur la destination.", cli: "R1(config)# interface g0/1\nR1(config-if)# ip access-group WEB-IN out", checkpoint: "Le compteur de la ligne deny s'incrémente à chaque flux interdit ('show access-lists')." },
                    { num: 3, title: "Tests autorisés / refusés", instructions: "Depuis un client LAN : test HTTP OK vers 172.16.20.10, ping vers 172.16.20.99 KO (deny imprévu dans la règle 30), telnet au serveur KO.", cli: "C:\\> curl -I http://172.16.20.10  (OK - HTTP/1.x)\nC:\\> ping 172.16.20.99   (KO - request timed out)\nC:\\> telnet 172.16.20.10 80 (KO si TCP 80 uniquement résolu par un HTTP brut)", checkpoint: "Le flux HTTP est autorisé, tout autre flux vers le LAN serveurs est refusé avec ICMP unreachable côté routeur." },
                    { num: 4, title: "Retirer proprement une ACE et retester", instructions: "Supprimez la règle 40 temporairement pour observer le 'deny any' implicite qui bloque TOUT le reste du trafic, la restaurez.", cli: "R1(config-ext-nacl)# no 40\nR1(config-ext-nacl)# 40 permit ip any any", checkpoint: "Sans la ligne 40, les pings vers Internet échouent (implicit deny) ; avec la ligne 40, tout redevient normal." }
                ],
                pitfalls: [
                    "Ordre des ACE : une 'permit ip any any' placée trop tôt rend les règles de deny inutiles et le flux non filtré passe.",
                    "Appliquer l'ACL sur la mauvaise interface ou dans le mauvais sens (in/out) : le trafic est filtré distinctement selon l'interface et le sens.",
                    "ACL étendue allant de 100 à 199 versus standard (1-99) : l'ACL standard ne filtre que sur la source, pas les protocoles ou les destinations."
                ],
                expectedResults: [
                    "Les flux HTTP/HTTPS vers le serveur sont autorisés (matchés sur les lignes 10 et 20).",
                    "Tout autre flux du LAN vers le LAN serveurs est refusé (match ligne 30).",
                    "Le compteur de match se met à jour à chaque test matché ; 'clear access-list counters' le réinitialise."
                ],
                troubleshooting: [
                    "Tester l'ACE en appliquant l'ACL au 'debug ip packet' sur une session de test (avec précaution).",
                    "Vérifier si la ligne 40 fait anomalie : la ACL 'no 40' / 'permit ip any any' retranscrit comme démonstration du deny implicite."
                ],
                solution: "Le filtrage est conforme aux règles : 'show access-lists WEB-IN' sous применomers ACE 10/20/30/40, compteurs de match cohérents avec les tests. Le deny implicite bloque tout le reste du flux si la ligne 40 est retirée temporairement."
            },
            {
                id: 'lab-ccna-09',
                title: 'CCNA 09 - NAT overload (PAT) et NAT statique',
                parcours: 'CCNA',
                level: 'Intermédiaire',
                duration: '35-45 min',
                objective: "Configurer un NAT dynamique (PAT) avec pool overload, un NAT statique pour un serveur exposé, et valider les traductions avec show ip nat.",
                prereqs: "Un routeur avec une interface extérieure (Gi1 vers Internet) et une interface intérieure (Gi0 LAN). Plan d'adressage : 203.0.113.0/24 en sortie, 10.1.1.0/24 côté LAN.",
                topology: "LAN 10.1.1.0/24 — R1 g0/0 ; Interface Gi1 connecté au cloud / réseau WAN 203.0.113.0/24 ; serveur interne 10.1.1.5 exposé en 203.0.113.10.",
                steps: [
                    { num: 1, title: "Marquer les interfaces inside/outside", instructions: "Interfaces LAN = inside, interface WAN = outside ; base indispensable pour toute traduction.", cli: "R1(config)# interface g0/0\nR1(config-if)# ip nat inside\nR1(config-if)# interface g1\nR1(config-if)# ip nat outside", checkpoint: "'show ip nat interface' liste Gi0/0 inside et Gi1 outside." },
                    { num: 2, title: "ACL du trafic à traduire + NAT dynamique overload", instructions: "ACL pour les IP locales sortantes, puis NAT dynamique 'interface overload' pour utiliser l'IP publique de sortie.", cli: "R1(config)# access-list 1 permit 10.1.1.0 0.0.0.255\nR1(config)# ip nat inside source list 1 interface Gi1 overload", checkpoint: "Un ping du LAN à Internet, puis 'show ip nat translations' : une traduction avec le port-source unique par flux." },
                    { num: 3, title: "NAT statique pour un serveur exposed", instructions: "Publication du serveur 10.1.1.5 : port 80 externe vers le serveur 80 interne.", cli: "R1(config)# ip nat inside source static tcp 10.1.1.5 80 203.0.113.10 80", checkpoint: "Depuis l'extérieur, un 'curl http://203.0.113.10' atteint bien le serveur interne." },
                    { num: 4, title: "Purger les translations", instructions: "Après modification de la config NAT, purgez le cache de translations pour revalider.", cli: "R1# clear ip nat translation *\nR1# show ip nat statistics", checkpoint: "Les compteurs mués à zéro, les nouvelles traductions se ré-apprennent avec la nouvelle policy." }
                ],
                pitfalls: [
                    "Oublier 'ip nat inside/outside' sur une interface : les flux ne sont jamais traduits, le NAT est muet.",
                    "ACL erronée (mauvais wildcard) : aucun flux n'est traduit, la table vide hélas confirme le dysfonctionnement.",
                    "Port déjà utilisé : un NAT statique dépendant port 80 sur l'IP publique déjà prise en passe par une autre règle produit une erreur en console."
                ],
                expectedResults: [
                    "Le LAN accède à Internet via le PAT (plusieurs clients, un port-source public chacun).",
                    "L'extérieur atteint le serveur exposé via 203.0.113.10:80.",
                    "'show ip nat statistics' dénombre les traductions dynamiques et la règle statique, hits/misses en expansion."
                ],
                troubleshooting: [
                    "Couche 3 : les flux vont bien vers l'extérieur ; vérifier le next-hop et le retour (route vers l'IP publique).",
                    "Table de traduction : tenez compte du fait que les travaux de mise à place NAT resteront jusqu'au timeout ou clear.",
                    "ACL : 'show access-lists 1' doit matcher les flux sortants du LAN et non ceux de l'infini."
                ],
                solution: "Configuration complète : 'show run | include ip nat' (interfaces, liste, statique). Une table de traductions présente les flux récents ; en cas de doute purgez 'clear ip nat translation *' puis relance la session de test."
            },
            {
                id: 'lab-ccna-10',
                title: 'CCNA 10 - serveur DHCP Cisco, exclusions et agent relais',
                parcours: 'CCNA',
                level: 'Intermédiaire',
                duration: '35-45 min',
                objective: "Configurer le DHCP sur un routeur Cisco pour deux VLAN, réserver les premières adresses, puis déployer un agent relais (helper-address) quand le serveur DHCP est centralisé.",
                prereqs: "Routeur CCNA 01 (inter-VLAN) ou deux VLAN touchés ; PC DHCP activés.",
                topology: "R1 routeur inter-VLAN ; VLAN 10 (192.0.2.0/24) client local, VLAN 20 (198.51.100.0/24) derrière un switch distant avec le serveur DHCP sur R1.",
                addressPlan: "VLAN 10 : plage .10-.100 (réserved .1-.9) ; VLAN 20 : plage .20-.120 ; passerelles .254.",
                steps: [
                    { num: 1, title: "Créer deux pools DHCP sur R1", instructions: "Pools DHCP distincts par VLAN, avec exclusions en début de plage (réservations équipés fixes).", cli: "R1(config)# ip dhcp excluded-address 192.0.2.1 192.0.2.9\nR1(config)# ip dhcp pool VLAN10\nR1(dhcp-config)# network 192.0.2.0 255.255.255.0\nR1(dhcp-config)# default-router 192.0.2.254\nR1(dhcp-config)# dns-server 192.0.2.53\nR1(dhcp-config)# domain-name lab.lan\nR1(dhcp-config)# lease 1", checkpoint: "'show ip dhcp pool' affiche les deux pools et l'ordre des subnets." },
                    { num: 2, title: "Vérifier une concession DHCP", instructions: "Un client VLAN 10 obtient une adresse dans la plage, default-router et DNS corrects.", cli: "R1# show ip dhcp binding\nR1# show ip dhcp conflict", checkpoint: "Un bail est actif, aucun conflit : la plage utilisable va de .10 à .100." },
                    { num: 3, title: "Agent relais pour le VLAN 20", instructions: "Sur la SVI du VLAN 20, configurez l'helper vers R1 si le serveur DHCP était centralisé ; en Cisco-style, R1 héberge les deux pools et sert les deux VLAN ; le helper est présent pour le cas où un serveur DHCP centralisé seul.", cli: "R1(config)# interface vlan 20\nR1(config-if)# ip helper-address 192.0.2.1", checkpoint: "'debug ip dhcp server packet' (à désactiver ensuite) montre la requête relais vers la destination 192.0.2.1." },
                    { num: 4, title: "Test du rejeu et duree", instructions: "Testez un redémarrage client DHCP et vérifiez la couverture du plage exclue.et les MAC.", cli: "PC> ipconfig /release\nPC> ipconfig /renew", checkpoint: "Une nouvelle IP est attribuée dans la plage non excluded, défaut passerelle et DNS à jour." }
                ],
                pitfalls: [
                    "Ne pas exclure la passerelle et les équipements d'infrastructure : le serveur DHCP distribue la passerelle à un client.",
                    "Deux pool pour un même subnet avec le même interface : le routeur sélectionne le pool selon le réseau reçu sur l'interface.",
                    "Oublier le 'ip helper-address' bien côté SVI et non sur la présence : le relais DHCP risque plusieurs serveurs..."
                ],
                expectedResults: [
                    "PC1 (VLAN 10) distribué automatiquement entre 192.0.2.10 et 192.0.2.100, passerelle 192.0.2.254.",
                    "'show ip dhcp binding' liste les baux actifs avec les MAC des clients.",
                    "Aucune adresse excluée (.1-.9) est distribuée par le réseau."
                ],
                troubleshooting: [
                    "Aucun bail : vérifier 'show ip dhcp pool', les exclusions et l'interface du LAN client.",
                    "Conflit : 'show ip ip dhcp conflict' révèle les IP déjà prises par des équipement fixes ; 'clear ip dhcp conflict *' après correction.",
                    "Relais : helper sur la SVI, port-relais sans risque pour des flux déjà labellisés."
                ],
                solution: "Le DHCP interne du routeur sertles deux VLAN : les pools distincts ciblent le réseau reçu sur l'interface du VLAN ; les exclusions réservent la base de plage, les baux séparés en trials de 1 jour, le helper sur la SVI VLAN 20 garantit le relais vers un serveur centralisé à l'étape suivante."
            },
            {
                id: 'lab-ccna-11',
                title: 'CCNA 11 - Port-security sur les ports d\'accès',
                parcours: 'CCNA',
                level: 'Intermédiaire',
                duration: '25-35 min',
                objective: "Activer port-security sur les ports d'accès d'un switch : modes par défaut, violation protect/restrict/shutdown, récupération après violation et ageing.",
                prereqs: "1 switch + PCs (ou Packet Tracer). Base VLAN du labo CCNA 02.",
                topology: "SW1 Fa0/1 → PC1 (MAC authentique), Fa0/2 → port de test où on branchera une MAC non autorisée.",
                steps: [
                    { num: 1, title: "Activer port-security en sticky", instructions: "Port-security exige d'abord un port mode access ; activez le mode sticky pour apprendre automatiquement les MAC autorisées.", cli: "SW1(config)# interface fa0/1\nSW1(config-if)# switchport mode access\nSW1(config-if)# switchport port-security\nSW1(config-if)# switchport port-security maximum 1\nSW1(config-if)# switchport port-security mac-address sticky\nSW1(config-if)# switchport port-security violation shutdown", checkpoint: "'show port-security' : Enabled sur Fa0/1, mode Sticky, violation Shutdown." },
                    { num: 2, title: "Vos MAC autorisées pour apprendreал", instructions: "L'adresse MAC de PC1 est apprise automatiquement en sticky ; vérifiez-la avec 'show port-security address'.", cli: "SW1# show port-security address", checkpoint: "L'adresse MAC de PC1 apparaît en type SecureSticky sur Fa0/1." },
                    { num: 3, title: "Test de violation (changement MAC)", instructions: "Changer l'adresse MAC du PC connecté à Fa0/2 (avec port-security au préalable) pour provoquer une violation shutdown.", cli: "SW1(config)# interface fa0/2\nSW1(config-if)# switchport mode access\nSW1(config-if)# switchport port-security\nSW1(config-if)# switchport port-security mac-address aaaa.bbbb.0001\nPC> échec après branchement d'un autre device", checkpoint: "Le port passe err-disable et le PC perd sa connectivité." },
                    { num: 4, title: "Réhabiliter et configurer la récupération", instructions: "Sortez de err-disable (shutdown/no shutdown) puis activez la récupération automatique toutes les 60 secondes.", cli: "SW1(config)# interface fa0/2\nSW1(config-if)# shutdown\nSW1(config-if)# no shutdown\nSW1(config)# errdisable recovery cause psecure-violation\nSW1(config)# errdisable recovery interval 60", checkpoint: "Après une violation, le port se réactive automatiquement dans moins de 60 s."
                    }
                ],
                pitfalls: [
                    "Port-security sur une interface trunk : n'a pas d'effet valide : port-security exige un port access.",
                    "Maximum à 1 mais plusieurs MAC sur le même port (host derrière un IP-phone) : les paquets couvrent un champ maximum à augmenter à 2-3 ou activer voice vlan.",
                    "Rémanence sticky après remplacement d'un PC : l'ancienne MAC reste inscrite — nettoyez-la avant de brancher le nouvel équipement."
                ],
                expectedResults: [
                    "'show port-security' montre les ports actifs avec le compteur de violations avec compteurs de violating.",
                    "Le port Fa0/2 passe err-disable quand une MAC non déclarée se branche.",
                    "'errdisable recovery cause psecure-violation' récupère le port automatiquement dans 60 s."
                ],
                troubleshooting: [
                    "'show port-security interface fa0/2' donne le compteur de violations et dernier état.",
                    "Vérifier la MAC : 'show port-security address' met à jour la table des MAC autorisées.",
                    "Ports err-disable : 'show interfaces status err-disabled' liste les ports concernés."
                ],
                solution: "Port-security est OK quand 'show port-security' montre les ports en 'Secure-up', un compteur dans les violations, et la récupération automatique (interval 60 s) est opérationnelle. Sans#' sticky, la aussi configurer 'switchport port-security mac-address <MAC>' à la place."
            },
            {
                id: 'lab-tssr-01',
                title: 'TSSR 01 - Installation d\'Active Directory et promotion du premier DC',
                parcours: 'TSSR',
                level: 'Débutant',
                duration: '45-60 min',
                objective: "Installer le rôle AD DS sur Windows Server 2022, promouvoir le premier contrôleur du domaine lab.lan et valider l'annuaire.",
                context: "Un serveur vierge doit devenir l'épine dorsale du réseau : DC et DNS inclus. Le processus de promotion détermine tout le reste de l'infra.",
                prereqs: "VM Windows Server 2022 à jour, IP fixe 172.16.10.10/24, compte Administrateur local.",
                topology: "SRV-AD01 (DC) + CLIENT-01 (Windows 10) sur le même réseau interne 172.16.10.0/24.",
                steps: [
                    { num: 1, title: "Installer le rôle AD DS", instructions: "Ajoutez le rôle Active Directory Domain Services via Server Manager ou PowerShell (sans services de rôle enfichables).", cli: "Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools", checkpoint: "L'installation se termine sans redémarrage, l'étape de promotion reste à faire." },
                    { num: 2, title: "Promouvoir en DC (nouvelle forêt)", instructions: "Créez la forêt lab.lan (niveau fonctionnel 2016+), DB SYSVOL sur D: séparé si possible.", cli: "Install-ADDSForest -DomainName \"lab.lan\" -DomainNetbiosName LAB -SafeModeAdministratorPassword (ConvertTo-SecureString 'Azerty1*' -AsPlainText -Force) -InstallDns:$true", checkpoint: "Redémarrage automatique après la promotion ; la session repart comme administrateur du domaine." },
                    { num: 3, title: "Vérifier l'annuaire et la base SYSVOL", instructions: "Contrôlez les services NTDS, DNS et la réplication du SYSVOL après redémarrage.", cli: "Get-Service NTDS,DNS\nnet share\nrepadmin /showrepl", checkpoint: "Les partages netlogon et SYSVOL existent, NTDS fonctionne, repadmin n'affiche pas d'erreur." },
                    { num: 4, title: "Créer une première UO et un compte test", instructions: "Créez l'UO Utilisateurs puis un compte de test pour vérifier l'annuaire quelques minutes après promotion.", cli: "New-ADOrganizationalUnit -Name Utilisateurs -Path \"DC=lab,DC=lan\"\nNew-ADUser -Name Test1 -Path \"OU=Utilisateurs,DC=lab,DC=lan\" -Enabled $true -AccountPassword (ConvertTo-SecureString 'Azerty1*' -AsPlainText -Force)", checkpoint: "'Get-ADUser Test1' retourne bien l'utilisateur placé dans l'UO." }
                ],
                pitfalls: [
                    "IP non statique avant la promotion : le DNS peut pointer vers l'extérieur, gardez le serveur interne comme premier résolveur.",
                    "Mot de passe DSRM oublié : il est externe au mot de passe admin et sera demandé pour la restauration AD.",
                    "DNS local sur le même serveur : attendez que le service DNS soit actif avant de tester le FQDN du DC."
                ],
                expectedResults: [
                    "Le serveur est contrôleur de domaine lab.lan, services NTDS/SYSVOL/DNS actifs.",
                    "Le domaine résout bien le DNS interne du lab.",
                    "Un compte créé sous l'UO Test1 est visible via Get-ADUser."
                ],
                troubleshooting: [
                    "Promotion bloquée : vérifier IP statique, complexité du mot de passe et disponibilité du DNS.",
                    "repadmin /replsummary doit être propre juste après la promotion."
                ],
                solution: "Retirer le rôle puis re-promouvoir corrige la plupart des échecs ; notez le mot de passe DSRM, clé de la restauration AD."
            },
            {
                id: 'lab-tssr-02',
                title: 'TSSR 02 - Serveur DHCP Windows : étendue, exclusions et réservations',
                parcours: 'TSSR',
                level: 'Débutant',
                duration: '35-45 min',
                objective: "Installer le rôle DHCP sur le serveur, créer une étendue 172.16.10.0/24 avec exclusions, réservations et options.",
                prereqs: "Labo TSSR 01 terminé (DC opérationnel) ; serveur membre du domaine lab.lan ; autorisation DHCP validée dans l'AD.",
                topology: "SRV-DHCP (172.16.10.11) ; clients sur le LAN 172.16.10.0/24 ; routeur (172.16.10.254) au-delà du segment.",
                steps: [
                    { num: 1, title: "Installer le rôle DHCP", instructions: "Ajoutez le rôle DHCP avec la console Server Manager (autoriser à la fin de l'assistant).", cli: "Install-WindowsFeature -Name DHCP -IncludeManagementTools\nAdd-DhcpServerInDC -DnsName SRV-DHCP.lab.lan", checkpoint: "'Get-DhcpServerInDC' liste le serveur autorisé dans l'AD." },
                    { num: 2, title: "Créer l'étendue et les exclusions", instructions: "Étendue pleine de la plage, exclusions pour le réseau d'infra (30 premières adresses selon labo).", cli: "Add-DhcpServerv4Scope -Name LAN01 -StartRange 172.16.10.1 -EndRange 172.16.10.254 -SubnetMask 255.255.255.0\nAdd-DhcpServerv4ExclusionRange -ScopeId 172.16.10.0 -StartRange 172.16.10.1 -EndRange 172.16.10.30", checkpoint: "'Get-DhcpServerv4Scope' montre le scope Activé." },
                    { num: 3, title: "Options : passerelle, DNS, bail", instructions: "Définissez l'option 3 (routeur), 006 (DNS), durée du bail (8 h standard préfére).", cli: "Set-DhcpServerv4OptionValue -ScopeId 172.16.10.0 -Router 172.16.10.254 -DnsServer 172.16.10.10 -DnsDomain lab.lan", checkpoint: "'Get-DhcpServerv4OptionValue -ScopeId 172.16.10.0' retourne les options." },
                    { num: 4, title: "Réservation pour un imprimante réseau", instructions: "Réservez 172.16.10.50 pour l'imprimante NET-PRINTER (MAC imprimante, DHCP priemire).", cli: "Add-DhcpServerv4Reservation -ScopeId 172.16.10.0 -IPAddress 172.16.10.50 -ClientId aa-bb-cc-11-22-33 -Name NET-PRINTER", checkpoint: "'Get-DhcpServerv4Reservation 172.16.10.0' liste la réservation." }
                ],
                pitfalls: [
                    "Oublier l'autorisation DHCP dans l'AD : le serveur reste rouge 'Non autorisé' et ne sert pas de baux.",
                    "Étendue trop courte : elle sature une donnée du mois de marche réseau au-delà du subnet d'exactement demain les 2-3 jours.",
                    "Réservation basée sur la MAC : une machine virtuelle peut changer d'interface (réservation à recréer)."
                ],
                expectedResults: [
                    "Un client abonnement : IP du plan, routeur et DNS visibles via ipconfig /all.",
                    "'Get-DhcpServerv4Reservation' retourne la réservation de l'imprimante."
                    ],
                troubleshooting: [
                    "Rien ne s'alloue : vérifier l'autorisation DHCP dans l'AD et la connectivité.",
                    "Un client reste en APIPA (169.254) : vérifier la disponibilité du serveur et l'activation de l'étendue."
                ],
                solution: "Le serveur DHCP est autorisé, l'étendue activée, les exclusions et options correctes ; ajustez ensuite les réservations."
            },
            {
                id: 'lab-tssr-03',
                title: 'TSSR 03 - DNS Windows : zones directe et inverse, redirection conditionnelle',
                parcours: 'TSSR',
                level: 'Intermédiaire',
                duration: '35-45 min',
                objective: "Gérer les zones DNS Windows, créer la zone inverse, ajouter des enregistrements A/PTR/CNAME et configurer un redirecteur conditionnel.",
                prereqs: "DC promu avec DNS intégré (labo TSSR 01).",
                topology: "SRV-DC01 héberge la zone intégrée lab.lan ; un second serveur SRV-APP02 (frontal web) à déclarer en A + PTR.",
                steps: [
                    { num: 1, title: "Contrôler la zone directe intégrée", instructions: "La promotion AD a créé la zone lab.lan stockée dans AD (mise à jour dynamique sécurisée). Vérifiez SOA et NS.", cli: "Get-DnsServerZone\nGet-DnsServerResourceRecord -ZoneName lab.lan -RRType NS", checkpoint: "Zones présentes, NS pointant vers SRV-DC01, dynamic update sécurisé." },
                    { num: 2, title: "Créer une zone inverse et des enregistrements", instructions: "Ajouter la zone inverse 172.16.10.in-addr.arpa et un enregistrement A avec PTR automatique pour SRV-APP02.", cli: "Add-DnsServerPrimaryZone -NetworkId 172.16.10.0/24 -ReplicationScope Domain\nAdd-DnsServerResourceRecordA -ZoneName lab.lan -Name APP02 -IPv4Address 172.16.10.32 -CreatePtr", checkpoint: "'Resolve-DnsName APP02.lab.lan' et 'Resolve-DnsName 172.16.10.32' fonctionnent (A et PTR)." },
                    { num: 3, title: "Alias CNAME vers l'appli", instructions: "Créer intranet.lab.lan en CNAME vers APP02 pour un accès plus lisible à l'intranet).", cli: "Add-DnsServerResourceRecordCName -ZoneName lab.lan -Name intranet -HostName APP02.lab.lan", checkpoint: "'Resolve-DnsName intranet.lab.lan' retourne l'alias A d'APP02." },
                    { num: 4, title: "Redirecteur conditionnel vers le partenaire", instructions: "Redirigez la zone partenaire.part vers DNS du partenaire pour les flux M&A, sans passer par Internet.", cli: "Add-DnsServerConditionalForwarderZone -Name partenaire.corp -MasterServers 192.168.42.10", checkpoint: "'Resolve-DnsName srv.partenaire.corp' résout via le serveur du partenaire." }
                ],
                pitfalls: [
                    "Pas de zone inverse : beaucoup d'applications (mail, auth) exigent le PTR — créer la zone avant les enregistrements PTR.",
                    "Redirecteur conditionnel créé après zone racine : le serveur fera autorité et court-circuitera le redirecteur conditionnel.",
                    "Cache client : 'ipconfig /flushdns' avant chaque test, cause classique de résultats périmés."
                ],
                expectedResults: [
                    "'Resolve-DnsName APP02.lab.lan' retourne A .32, symétrique PTR .32 retourne le nom.",
                    "'Resolve-DnsName intranet.lab.lan' fonctionne via l'alias CNAME.",
                    "Le domaine partenaire.corp se résout via le redirecteur conditionnel, sans toucher à la zone racine."
                ],
                troubleshooting: [
                    "Vérifier le cache : 'Clear-DnsServerCache' et 'ipconfig /flushdns' avant chaque test.",
                    "Nslookup interactif pour tester les enregistrements (server x.x.x.x pour changer de résolveur).",
                    "En cas de doute, relier le résultat au ParentMatch de la zone via 'Get-DnsServerZone'."
                ],
                solution: "Les quatre tests 'Resolve-DnsName' (A, PTR, CNAME, redirecteur) doivent aboutir ; en cas d'écart, vérifiez les zones ('Get-DnsServerZone'), les serveurs DNS du client et videz les caches."
            },
            {
                id: 'lab-tssr-04',
                title: 'TSSR 04 - GPO : stratégie de mot de passe et lecteur réseau mappé',
                parcours: 'TSSR',
                level: 'Intermédiaire',
                duration: '40-50 min',
                objective: "Créer deux GPO : une politique de mot de passe au niveau domaine et un lecteur réseau mappé (préférences), valider l'application avec gpresult.",
                prereqs: "AD opérationnel (labo TSSR 01), UO créées, un poste client joint au domaine, un partage de test sur le DC.",
                topology: "DC SRV-AD01 hébergeant \\SRV-DC01\Partage ; CLIENT-01 rangé dans l'UO Postes.",
                steps: [
                    { num: 1, title: "GPO politique de mot de passe", instructions: "Modifiez la Default Domain Policy (complexité, longueur 12, verrouillage après 5 échecs) puis vérifiez son existence.", cli: "New-GPO -Name 'PWD-POLICY'\nGet-GPO -Name 'Default Domain Policy'", checkpoint: "'Get-GPO' liste les deux objets de stratégie liés au domaine." },
                    { num: 2, title: "GPO préférences mappage Z:", instructions: "Préférence User Configuration : lecteur Z mappé \\SRV-DC01\Partage, action Update (interprétable sans écraser un mapping présent).", cli: "Interface : User Configuration > Preferences > Windows Settings > Drive Maps > New > Mapped Drive (Z, Update)", checkpoint: "la préférence est créée et l'action affichée Update." },
                    { num: 3, title: "Lier les GPO aux UO adéquates", instructions: "PWD-POLICY reste au domaine (valide toute la stratégie), DRIVE-GPO sur l'UO Utilisateurs ; notez que le Drive-map se fait en User Configuration.", cli: "New-GPLink -Name 'DRIVE-GPO' -Target 'OU=Utilisateurs,DC=lab,DC=lan' -LinkEnabled Yes", checkpoint: "'Get-GPLink' montre les liens là où elle doit être (domaine et UO Utilisateurs)." },
                    { num: 4, title: "Vérifier l'application client", instructions: "Sur CLIENT-01 : gpupdate /force pour forcer l'application puis gpresult /R pour confirmer.", cli: "CLIENT-01> gpupdate /force\nCLIENT-01> gpresult /R", checkpoint: "gpresult /R liste PWD-POLICY et DRIVE-GPO ; Z est mappé (net use confirme)." }
                ],
                pitfalls: [
                    "La politique de mot de passe ne se lie qu'au niveau domaine (une seule stratégie par niveau) : une GPO de pwd sur UO ne marche pas sans fine-grained password policy (PSO).",
                    "Drive mappé en Replace : la lettre se recrée à chaque logon et écrase l'existant — préférez Update.",
                    "Omettre le gpupdate /force sur le poste : les GPO s'appliquent au refresh périodique (90 min) sinon reboot."
                ],
                expectedResults: [
                    "gpresult /R confirme les deux GPO appliquées sur le poste.",
                    "Le lecteur Z est mappé pour les utilisateurs de l'UO cible.",
                    "Une nouvelle contrainte de mot de passe se vérifie immédiatement sur le prochain changement."
                ],
                troubleshooting: [
                    "GPO non appliquée : vérifier le lien du domaine/UO, le Security filtering (Utilisateurs authentifiés) et le statut AD (délégation).",
                    "Vue détaillée : gpresult /H report.html liste les GPO appliquées et les éventuelles erreurs."
                ],
                solution: "Gpresult /H confirme DRIVE-GPO, net use confirme le mappage Z. Si la préférence reste muette, bootez le poste et re-vérifiez l'ordre des préférences (Drive Maps)."
            },
            {
                id: 'lab-tssr-05',
                title: 'TSSR 05 - Partages de fichiers avec droits NTFS et AGDLP',
                parcours: 'TSSR',
                level: 'Intermédiaire',
                duration: '40-50 min',
                objective: "Construire un partage de fichiers structuré : AGDLP pour les droits NTFS, permissions de partage à Utilisateurs authentifiés, et validation par tests croisés.",
                prereqs: "AD opérationnel, groupes GG/DL créés (labo AGDLP), serveur membre avec dossiers D:\\Ressources.",
                topology: "SRV-FICHIER (membre du domaine, 172.16.10.12) ; partage D:\\Ressources\\Compta et D:\\Ressources\\Public ; DC pour les groupes.",
                steps: [
                    { num: 1, title: "Créer les groupes (modèle AGDLP)", instructions: "Une GG par service + 4 DL par ressource (Lecture / Modification / Contrôle total / Refus).", cli: "New-ADGroup -Name 'GG-Compta' -GroupScope Global -GroupCategory Security\nNew-ADGroup -Name 'DL-Compta-Modif' -GroupScope DomainLocal -GroupCategory Security", checkpoint: "'Get-ADGroup -Filter {Name -like GG-*}' liste les groupes." },
                    { num: 2, title: "Imbriquer GG dans DL", instructions: "Les DL portant les droits peuvent inclure des GG du même domaine (racine du modèle).", cli: "Add-ADGroupMember -Identity 'DL-Compta-Modif' -Members 'GG-Compta'", checkpoint: "'Get-ADGroupMember DL-Compta-Modif' inclut la GG." },
                    { num: 3, title: "Permissions NTFS sur les dossiers", instructions: "Sur D:\\Ressources\\Compta : retirer Tout le monde, accorder DL-Compta-Modif en modification ; le partage doit rester 'Utilisateurs authentifiés' en contrôle total.", cli: "icacls \"D:\\Ressources\\Compta\" /inheritance:r\nicacls \"D:\\Ressources\\Compta\" /grant 'LAB\\DL-Compta-Modif:(OI)(CI)M'", checkpoint: "icacls D:\\Ressources\\Compta liste l'ACL héritée uniquement." },
                    { num: 4, title: "Connexion test et ABE", instructions: "Activez ABE (Access-Based Enumeration) ; testez deux comptes (un membre, un hors groupe).", cli: "Set-SmbShare -Name Ressources -EncryptData $true\nSet-ABE -ShareName Ressources", checkpoint: "L'utilisateur hors groupe ne voit pas Compta (ABE) ; le membre écrit sans souci." }
                ],
                pitfalls: [
                    "Donner les droits NTFS aux utilisateurs directement : AGDLP garde la configuration maintenable : seuls les DL portent les droits.",
                    "Partage et NTFS contraires : le partage doit rester permissif (Utilisateurs authentifiés / Contrôle total) et laisser les NTFS trancher.",
                    "Désactiver d'abord l'héritage NTFS, puis poser les ACL propres."
                ],
                expectedResults: [
                    "Le partage Garde assignments visibles D:\\Ressources.",
                    "La DL-Compta-Modif porte les droits de modification NTFS sur Compta (icacls le confirme).",
                    "ABE actif, le hors-groupe ne voit pas le dossier Compta dans l'explorateur."
                ],
                troubleshooting: [
                    "Tester croisément : un membre GG et un non-membre sur le même partage pour valider l'ordre des droits.",
                    "Vérifier côté serveur : Get-SmbShare montre le partage et l'activation de l'énumération basée sur l'accès."
                ],
                solution: "Fichiers correctement appliqués : DL en NTFS (Modification), Tout le monde retiré, GG imbriqués dans DL, ABE actif : les tests croisés confirment accès et invisibilité."
            },
            {
                id: 'lab-tssr-06',
                title: 'TSSR 06 - WSUS : héberger et distribuer les mises à jour',
                parcours: 'TSSR',
                level: 'Intermédiaire',
                duration: '45-60 min',
                objective: "Installer WSUS avec un stockage dédié, configurer les langues/produits, lier les clients par GPO (client-side targeting) et approuver des mises à jour.",
                prereqs: "Serveur 2022 joint au domaine avec 20 Go libres ; DC lab.lan ; 2 clients Windows 10 joints.",
                topology: "SRV-WSUS (172.16.10.13) sur le LAN ; postesClients appartenant au domaine ; Internet sortant ouvert 8530.",
                steps: [
                    { num: 1, title: "Installer le rôle WSUS", instructions: "Ajoutez le rôle WSUS avec WID et WSUS Services, dans D:\\WSUS pour le stockage.", cli: "Install-WindowsFeature -Name UpdateServices -IncludeManagementTools\nInstall-WindowsFeature -Name UpdateServices-Services,UpdateServices-WID -IncludeManagementTools", checkpoint: "'Get-WindowsFeature UpdateServices*' : Installed." },
                    { num: 2, title: "Configuration post-déploiement", instructions: "Exécutez la tâche Post Deployment Configuration, lancez l'assistant : langues EN/FR, produits Windows 10/Server, sync 4 fois par jour.", cli: "Console WSUS > Options > Update Source and Proxy > Synchronize from Microsoft Update", checkpoint: "'Get-WSUSServer | select Name' et la synchronisation initiale finis." },
                    { num: 3, title: "GPO automatisée (ciblage côté client)", instructions: "Créez une GPO liée aux UO : Specify intranet location sur FQDN:8530, client-side targeting activé, install tous les jours 9 h.", cli: "PowerShell : New-GPO -Name 'WSUS-Policy' ; Set-GPRegistryValue -Name 'WSUS-Policy' -Key 'HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate' -Value WUServer -Type String -Value 'http://SRV-WSUS.lab.lan:8530'", checkpoint: "Registre WUServer visible via 'gpresult /H' ou Get-ItemProperty sur le client." },
                    { num: 4, title: "Approuver et vérifier côté client", instructions: "Dans WSUS > Updates, créez les groupes CIBLE (par nom), approuvez les Security Updates ; sur le client : gpupdate puis détection dans la console.", cli: "WSUS GUI: Options > Computers > Use Group Policy ; sous Updates: approuvers avec Add Computer Group > CIBLES", checkpoint: "Le client apparaît sous le groupe CIBLE ; la mise à jour arrive au moment planifié." }
                ],
                pitfalls: [
                    "Mauvais FQDN ou port dans la GPO (oubliez le :8530) : le client ignore le WSUS et va chercher sur Microsoft Update.",
                    "Proxy proxy mis dans le WSUS Options : si un proxy est requis mais absent, la sync échoue avec erreur 0x800706BA.",
                    "Blocage par le firewall local : autoriser le trafic 8530 TCP entre LAN et SRV-WSUS, sinon le contenu ne se télécharge pas."
                ],
                expectedResults: [
                    "Synchronisation WSUS avec Microsoft Update complète (SE, Language, Product).",
                    "Le client joint le groupe cible et visible dans la console.",
                    "Deux groupes de clients (et CIBLE) apparaissent dans la console."
                ],
                troubleshooting: [
                    "Client invisible : lancez 'gpupdate /force' sur le client puis 'winrm quickconfig'.",
                    "Sync morte : vérifier les flux Internet sortants (HTTP 80 / HTTPS 443) et le proxy WSUS (Options > Proxy)."
                ],
                solution: "Le WSUS fonctionne quand la première Sync est complète (première synchronisation dans la console), les groupes apparaissent et les Mises jour se désapprouvent/approuvent via le menu Update contextuel, avec reporting 'Get-WSUSUpdate' côté serveur si nécessaire."
            },
            {
                id: 'lab-tssr-07',
                title: 'TSSR 07 - Restauration AD : corbeille AD et objet supprimé',
                parcours: 'TSSR',
                level: 'Avancé',
                duration: '40-50 min',
                objective: "Activer la corbeille Active Directory, supprimer une UO, la restaurer intacte avec ses objets, et documenter la procédure PRA.",
                prereqs: "DC lab.lan (labo TSSR 01), niveau forêt 2008 R2 minimum, sauvegarde System State recommandée.",
                topology: "DC unique SRV-AD01 ; poste admin avec RSAT ; l'exercice se fait en PowerShell sur le DC.",
                steps: [
                    { num: 1, title: "Activer la corbeille AD", instructions: "Activez la corbeille au niveau forêt (définitif, ne se désactive plus).", cli: "Enable-ADOptionalFeature 'Recycle Bin Feature' -Scope ForestOrConfigurationSet -Target 'lab.lan'", checkpoint: "'Get-ADOptionalFeature' retourne Scope = ForestOrConfigurationSet, Enabled = True." },
                    { num: 2, title: "Créer puis supprimer une UO de test", instructions: "Créez l'UO Suppr-Test avec un utilisateur enfant, supprimez-la, constatez la suppression.", cli: "New-ADOrganizationalUnit -Name Suppr-Test -Path 'DC=lab,DC=lan'\nNew-ADUser -Name test-del -Path 'OU=Suppr-Test,DC=lab,DC=lan'\nGet-ADOrganizationalUnit -Filter \"Name -eq 'Suppr-Test'\" | Remove-ADObject -Recursive -Confirm:$false", checkpoint: "Get-ADOrganizationalUnit ne la trouve plus ; seule une recherche withDeleted la retrouve." },
                    { num: 3, title: "Restaurer depuis la corbeille", instructions: "Retrouvez l'objet supprimé et restaurez-le avec son parent (le user enfant suit).", cli: "Get-ADObject -Filter \"Name -eq 'Suppr-Test'\" -IncludeDeletedObjects | Restore-ADObject", checkpoint: "L'UO et son utilisateur réapparaissent actifs ('Get-ADUser test-del' donne Enabled=True)." },
                    { num: 4, title: "Contrôle final + sauvegarde préventive", instructions: "Vérifiez l'objet restauré, notez la procédure dans la doc interne et lancez une sauvegarde System State pour sécuriser le lot PRA.", cli: "wbadmin get versions\nStart-Backup (via la console Sauvegarde Windows Server si wbadmin n'est pas configuré)", checkpoint: "Restauration réussie et backup System State disponible sur un disque dédié." }
                ],
                pitfalls: [
                    "Corbeille non activée : il faut une restauration autoritaire via ntdsutil/sauvegarde, bien plus lourde et risquée.",
                    "Restaurer un enfant sans son parent : l'objet reste orphelin ; restaurez la branche UO (Restore-ADObject parent).",
                    "Plusieurs objets du même nom supprimés : filter-IncludeDeletedObjects retourne petits objets ; valider via lastKnownParent et WhenChanged."
                ],
                expectedResults: [
                    "'Get-ADOptionalFeature' montre la corbeille activée au niveau forêt.",
                    "L'UO et l'utilisateur supprimés reviennent actifs après la restauration.",
                    "La sauvegarde System State (post-restore) est présente pour un futur plan PRA."
                ],
                troubleshooting: [
                    " Restauration motivée donc l'objet est encore 'deleted' depuis peu : vérifier le tombstone TTL (180 jours).",
                    "Un DC sans corbeille activée exige une restauration autoritaire via ntdsutil : hors périmètre de ce labo (le PRA complet est couvert par un labo dédié).",
                    "La base NTDS ne se redémarre pas en ligne : les restaurations complètes passent par le DSRM."
                ],
                solution: "La corbeille AD couvre les suppressions occasionnelles sans sauvegarde ; pour une restauration complète du DC (PRA), la restauration autoritaire s'appuie sur la sauvegarde System State et le mot de passe DSRM."
            },
            {
                id: 'lab-tssr-08',
                title: 'TSSR 08 - Hyper-V : créer une VM et un switch virtuel',
                parcours: 'TSSR',
                level: 'Débutant',
                duration: '30-40 min',
                objective: "Installer le rôle Hyper-V, créer un switch virtuel externe, déployer une VM depuis une ISO et prendre un cliché (checkpoint).",
                prereqs: "Hôte Windows Server 2022 avec virtualisation activée dans le BIOS (VT-x/AMD-V), une ISO Windows 10 disponible.",
                topology: "SRV-HV (hôte) ; un vSwitch externe vers la carte LAN ; VM-CLI01 (2 vCPU, 4 Go).",
                steps: [
                    { num: 1, title: "Installer le rôle Hyper-V", instructions: "Installez le rôle avec les outils de gestion, reboot obligatoire.", cli: "Install-WindowsFeature -Name Hyper-V -IncludeManagementTools -IncludeAllSubFeature -Restart", checkpoint: "'Get-WindowsFeature Hyper-V' : Installed ; Hyper-V Manager tourne." },
                    { num: 2, title: "Créer un switch virtuel externe", instructions: "Bindez le vSwitch sur la carte LAN de l'hôte pour que la VM sort sur le réseau réel.", cli: "New-VMSwitch -Name LAN-EXT -NetAdapterName 'Ethernet' -AllowManagementOS $true", checkpoint: "'Get-VMSwitch' affiche LAN-EXT en External, ManagementOS True." },
                    { num: 3, title: "Créer la VM depuis une ISO", instructions: "VM pas de génération 2, disque dynamique 60 Go, DVD monté sur l'ISO, boot depuis le DVD.", cli: "New-VM -Name VM-CLI01 -MemoryStartupBytes 4GB -Generation 2 -NewVHDPath 'D:\\VHD\\VM-CLI01.vhdx' -NewVHDSizeBytes 60GB -SwitchName LAN-EXT\nAdd-VMDvdDrive -VMName VM-CLI01 -Path 'D:\\ISO\\Win10.iso'", checkpoint: "Get-VM VM-CLI01 : Running après Start-VM et installation de Windows 10 lancée." },
                    { num: 4, title: "Checkpoint et exploitation", instructions: "Prenez un Checkpoint (snapshot) avant d'appliquer une mise à jour de test, vérifiez le retour arrière.", cli: "Checkpoint-VM -VMName VM-CLI01 -SnapshotName 'avant-update'\nGet-VMSnapshot -VMName VM-CLI01", checkpoint: "Le snapshot apparaît ; Restore-VMSnapshot démontre le retour à l'état antérieur." }
                ],
                pitfalls: [
                    "Un External vSwitch sur la carte iSCSI : le management OS partage le trafic et la latence explose — réservez un adaptateur dédié.",
                    "Génération 2 avec SecureBoot actif : une ISO non signée refuse de booter — désactivez SecureBoot ou montez une ISO signée.",
                    "Omettre Intermediate Storage (expandable) : un disque fixe (fixed) consomme l'espace d'un coup (thick provisioning)."
                ],
                expectedResults: [
                    "Get-VM montre la VM à l'état Running, réseau externe fonctionnel.",
                    "Un checkpoint de test renomé 'avant-update' listé via Get-VMSnapshot.",
                    "La VM installe Windows 10 depuis l'ISO montée (DVD boot secondaire)."
                ],
                troubleshooting: [
                    "VM qui ne boote pas : passez SecureBoot à off (Set-VMFirmware) si votre ISO est non signée.",
                    "Réseau VM down : vérifier le vSwitch (Get-VMSwitch) et l'adaptateur physique de l'hôte (Get-VMNetworkAdapter)."
                ],
                solution: "Le rôle, le vSwitch externe, la VM et le Checkpoint sont validés. Prochaine étape : ajouter une VM via Quick Create et la brancher sur le même switch."
            },
            {
                id: 'lab-ais-01',
                title: 'AIS 01 - Durcissement Linux : comptes, sudo et permissions',
                parcours: 'AIS',
                level: 'Intermédiaire',
                duration: '40-50 min',
                objective: "Durcir un serveur Debian : comptes expirables, sudo restreint, umask strict, permissions critiques et fichiers ~ de root.",
                prereqs: "Serveur Debian 12 accessible en SSH ayant déjà accès root. Tests sur VM uniquement.",
                topology: "Un serveur unique SRV-LNX01, sessions SSH locales pour les tests (aucune commande sur la machine hôte).",
                steps: [
                    { num: 1, title: "Comptes : mot de passe et expiration", instructions: "Forcez une expiration à 90 jours avec un rappel 7 jours avant, puis verrouillez les comptes dormants.", cli: "passwd -x 90 -w 7 utilisateur\nusermod -L compte_dormant", checkpoint: "'chage -l utilisateur' reflète une expiration à 90 jours et un rappel à 7 jours." },
                    { num: 2, title: "sudo restreint via visudo", instructions: "Délégué précisément : un utilisateur n'exécute que deux commandes root autorisées (apt update et upgrade).", cli: "sudo visudo -f /etc/sudoers.d/durcissement\nutilisateurs ALL=(root) /usr/bin/apt update, /usr/bin/apt upgrade", checkpoint: "L'utilisateur exécute apt update/upgrade et rien d'autre (sudo -l le prouve)." },
                    { num: 3, title: "umask strict et répertoires sensibles", instructions: "umask 027 pour tous ; permissions restrictives sur /etc/sudoers, /etc/crontab, /etc/ssh.", cli: "echo 'umask 027' >> /etc/profile\n", checkpoint: "Les nouveaux fichiers créés prennent 640/750 après reconnexion." },
                    { num: 4, title: "Vérification : audit des comptes et fichiers à risque", instructions: "Listez les fichiers 0777 et les comptes UID 0.", cli: "find / -type f -perm 0777 2>/dev/null | head -n 5\ngetent passwd | awk -F':' '($3==0){print}'", checkpoint: "Seul root a UID 0, aucun fichier 777 hors ceux listés." }
                ],
                pitfalls: [
                    "Des fichiers 0777 sur une partition montée non contrôlée laissent la porte ouverte à un intrus.",
                    "Éditez /etc/sudoers.d uniquement via visudo -f (jamais à la main).",
                    "Ne pas écrit un mod sudoers générique : un fichier par délégation."
                ],
                expectedResults: [
                    "chage -l utilisateur montre 90 jours d'expiration et un rappel à 7 jours.",
                    "'sudo -l' indique les commandes autorisées.",
                    "Aucun fichier 0777 inattendu dans l'arborescence."
                ],
                troubleshooting: [
                    "Si 'sudo -l' ne reflète pas sudoers.d, valider la syntaxe : visudo -c.",
                    "L'umask doit s'appliquer après une nouvelle session (source /etc/profile de la session)."
                ],
                solution: "Le serveur présente des comptes durcis (expiration 90/7), la délégation sudo minimale (visudo), et un umask 027 actif. Prochaine étape : désactivation des services inutilisés, journalisation locales."
            },
            {
                id: 'lab-ais-02',
                title: 'AIS 02 - SSH durci : clés, port dédié, restriction root',
                parcours: 'AIS',
                level: 'Intermédiaire',
                duration: '30-40 min',
                objective: "Sécuriser l'accès SSH d'un serveur Linux : clé ed25519 obligatoire, root interdit, port dédié et ban automatique des tentatives (fail2ban).",
                prereqs: "Serveur Debian 12 en SSH pour administrer, poste client de test. VM uniquement.",
                topology: "SRV-LNX01 (sshd) ; POSTE-ADMIN (client SSH), pas d'exposition Internet dans ce labo (réseau interne).",
                steps: [
                    { num: 1, title: "Générer et distribuer la clé du client", instructions: "Clé ed25519 côté administrateur, copie via ssh-copy-id vers le serveur.", cli: "ssh-keygen -t ed25519 -a 100 -f ~/.ssh/id_ed25519_srv\nssh-copy-id -i ~/.ssh/id_ed25519_srv.pub admin@172.16.10.20", checkpoint: "Connexion SSH sans mot de passe réussie avec la clé." },
                    { num: 2, title: "Durcir sshd_config", instructions: "Prohibe root, authentification par clé seule (PermitRootLogin no, PasswordAuthentication no), et change le port 22 de 2022 par exemple.", cli: " sudo sed -i 's/#PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config\n sudo sed -i 's/#PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config\n sudo sed -i 's/^#Port.*/Port 2222/' /etc/ssh/sshd_config\n sudo sshd -t", checkpoint: "'sudo ssh -t' (ou sshd -t) affine sans erreur de syntaxe. Redémarrer ensuite : systemctl restart ssh." },
                    { num: 3, title: "Autoriser la connexion en test", instructions: "Se connecter en SSH sur le port dédié depuis le poste admin avec la clé (le firewall/fail2ban est ensuite ajouté).", cli: " ssh -i ~/.ssh/id_ed25519_srv -p 2222 admin@172.16.10.20", checkpoint: "Session OK ; le root est refusé désormais via une authentification par mot de passe." },
                    { num: 4, title: "Fail2ban sur les échecs SSH", instructions: "Installez un ban automatique sur Déni d'authentification répétée (fail2ban + filter sshd).", cli: " sudo apt install fail2ban -y\n sudo systemctl enable --now fail2ban", checkpoint: "'sudo fail2ban-client status sshd' affiche déjà un ou plusieurs Banned." }
                ],
                pitfalls: [
                    "Perdre la session de test en cours : tester avant de changer le port depuis une session active (sinon lock-out).",
                    "Saisir une sshd_config incorrecte, redémarrer : un sshd mort ferme l'accès, se prémunir par un test du mode sshd -t.",
                    "PasswordAuthentication no sans clé installée : l'accès est définitivement coupé (gardez une console VM comme plan B)."
                ],
                expectedResults: [
                    "Connexion SSH uniquement par clé, root refusé.",
                    "Tentatives par mot de passe abaissées et rejetées côté serveur, port dédié (2222).",
                    "Fail2ban active et ban validé sur les échecs répétés."
                ],
                troubleshooting: [
                    "Test de la config avant le restart : sshd -t et systemctl status ssh.",
                    "Consultez journal -u ssh pour les raisons de refus, 'Fail2ban-client status sshd' pour les bans."
                ],
                solution: "La connexion SSH est désormais clés uniquement, root exclu, port dédié, fail2ban actif. Test final : une attaque par force brute 'Mot de passe' doit refuser et bannir l'émetteur après plusieurs tentatives."
            },
            {
                id: 'lab-ais-03',
                title: 'AIS 03 - Supervision Zabbix : agent Linux, template et alerte e-mail',
                parcours: 'AIS',
                level: 'Intermédiaire',
                duration: '45-60 min',
                objective: "Installer Zabbix (serveur + front web), déployer un agent sur un serveur Linux, associer un template OS et tester une alerte par franchissement de seuil.",
                prereqs: "Deux VM Linux : SRV-ZABBIX (172.16.10.30) et SRV-CIBLE (172.16.10.20, agent). MySQL/mariadb ou PostgreSQL pour le backend.",
                topology: "SRV-ZABBIX (serveur + web) héberge l'historique ; l'agent SRV-CIBLE pousse ses métriques (agent actif) ; mail relay de lab pour les notifications.",
                steps: [
                    { num: 1, title: "Installer le serveur Zabbix", instructions: "Paquets Zabbix (server + frontend + agent), base de données locale créée via l'assistant web.", cli: "SRV-ZX> apt install zabbix-server-mysql zabbix-frontend-php zabbix-apache-conf zabbix-sql-scripts zabbix-agent -y\nSRV-ZX> mysql -u root -p -e 'create database zabbix character set utf8mb4 collate utf8mb4_bin;'", checkpoint: "L'assistant http://SRV-ZX/zabbix finalise la base et valide les prérequis PHP." },
                    { num: 2, title: "Déployer l'agent sur la cible", instructions: "Installez zabbix-agent, pointez-le vers le serveur (Server= et ServerActive) et renomme l'host.", cli: "SRV-CIBLE> apt install zabbix-agent -y\nSRV-CIBLE> nano /etc/zabbix/zabbix_agentd.conf  (Server=172.16.10.30, ServerActive=172.16.10.30, Hostname=SRV-CIBLE)\nSRV-CIBLE> systemctl enable --now zabbix-agent", checkpoint: "'systemctl status zabbix-agent' actif ; côté serveur, disponibilité de l'agent au vert dans la console." },
                    { num: 3, title: "Ajouter l'hôte + template OS Linux", instructions: "Console additive : hôte SRV-CIBLE, interface agent 172.16.10.20:10050, template 'Linux by Zabbix agent'.", cli: "UI : Data collection > Hosts > Create host (groups Linux servers ; templates : Linux by Zabbix agent)", checkpoint: "Dernier items du template (CPU, memory, disk) se collectent ('Latest data' visible)." },
                    { num: 4, title: "Trigger + notification e-mail de test", instructions: "Créez un trigger custom CPU > 90 % pendant 2 min, configurez un media type Email et simulez la charge.", cli: "SRV-CIBLE> stress-ng --cpu 4 --timeout 180s   (alternative: while :; do :; done)", checkpoint: "L'alerte se déclenche, la notification e-mail part et l'action passe en 'OK' après la fin de charge." }
                ],
                pitfalls: [
                    "Hostname de l'agent différent de l'hôte déclaré dans l'UI : l'agent reste indéfiniment non collecté — aligner les deux noms.",
                    "Media Email mal configuré : les alertes restent sans notification — tester le média depuis le profil utilisateur.",
                    "Templates verbeux sur un petit parc : désactiver les triggers peu utiles pour éviter les faux positifs."
                ],
                expectedResults: [
                    "Le frontend Zabbix est accroché et exploite le backend MySQL initialisé.",
                    "L'hôte SRV-CIBLE collecte (dispo agent vert) et répond aux items du template Linux.",
                    "Le trigger CPU 90 % porte l'alerte et l'e-mail est parti (Actions & Media logs)."
                ],
                troubleshooting: [
                    "Agent never up : vérifier les ports 10050/10051 (ss -ant) et Server/ServerActive, puis redémarrer zabbix-agent.",
                    "Frontend muet : vérifier zabbix-server et la connexion DB dans /var/log/zabbix/zabbix_server.log."
                ],
                solution: "La chaîne complète est validée : serveur Zabbix, agent collecté, template Linux appliqué et alerte e-mail déclenchée par un stress CPU simulé (stress-ng)."
            },
            {
                id: 'lab-ais-04',
                title: 'AIS 04 - IDS Snort : détecter des scans et des pings malveillants',
                parcours: 'AIS',
                level: 'Intermédiaire',
                duration: '40-50 min',
                objective: "Installer Snort sur une sonde Linux, charger des règles personnalisées (ICMP/SSH) et valider la détection depuis une machine attaquante de labo.",
                prereqs: "Deux VM Ubuntu : SRV-SNORT (10.10.1.10/24) et BADGUY (10.10.1.20/24, attaque simulée). Mode promiscuité activé sur la carte d'analyse.",
                topology: "BADGUY -- Switch -- SRV-SNORT (carte en promiscuity, HOME_NET = 10.10.1.0/24) ; aucune attaque réelle hors labo.",
                steps: [
                    { num: 1, title: "Installer Snort (paquets Debian)", instructions: "Via apt, indiquez le range HOME_NET lors de l'installation, activez le service et testez la config.", cli: "SRV-SNORT> sudo apt install snort -y\nSRV-SNORT> sudo snort -T -c /etc/snort/snort.conf", checkpoint: "Config test (-T) : 0 erreurs, les preprocessors (stream5, http_inspect) se chargent." },
                    "local.rules complété; le test -T valide la syntaxe.",
                    "La console d'alerte suit les lignes PERSO dès les tests depuis BADGUY.",
                    "Les alertes PERSO apparaissent en direct, horodatées, de BADGUY vers HOME_NET."
                ],
                pitfalls: [
                    "HOME_NET non défini : les règles alertent sur tout le trafic et la masse déborde — fixez HOME_NET dans snort.conf.",
                    "Ignorer le gros paquet (MTU) : un offloading (GRO/LRO) tronque les paquets en mode promiscuité — désactiver via ethtool -K <if> gro off lro off.",
                    "Interfaces en mode promiscuité : la carte d'analyse doit être en promisc (ip link set <if> promisc on)."
                ],
                expectedResults: [
                    "Snort démarre sans erreur et charge les deux règles personnalisées.",
                    "Les alertes PERSO se déclenchent sur les pings et scans ciblés depuis BADGUY."
                ],
                troubleshooting: [
                    "No alerts : vérifier HOME_NET dans snort.conf, l'inclusion de local.rules et le service Snort.",
                    "Alertes massives : ajuster le seuil (limit rate) des règles pour calibrer le flux."
                ],
                solution: "Snort est opérationnel : les règles personnalisées alertent sur les pings et scans SSH de BADGUY, alertes horodatées dans /var/log/snort/."
            },
        ];
