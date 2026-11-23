export const AIS_COURSES = [
            {
                id: 'ais-cp1', parcours: 'AIS', code: 'CP1',
                title: "Bonnes pratiques d'administration",
                niveau: 'Intermédiaire',
                prerequis: "Une expérience technique de base (voir TSSR CP1 à CP4) aide à suivre les exemples ; aucune notion d'administration d'infrastructure n'est exigée.",
                objectifs: [
                    "Appliquer le moindre privilège et séparer comptes ordinaires et comptes d'administration",
                    "Expliquer ce qu'apporte la double authentification (MFA)",
                    "Gérer un changement sans casser la production (annonce, test, retour arrière)",
                    "Documenter l'exploitation et tracer les actions sensibles"
                ],
                lessons: [
                    { title: "Leçon 1 — L'hygiène de l'administrateur", parts: [
                        { h: "Des comptes bien séparés", t: "On travaille au quotidien avec un compte utilisateur ordinaire, et on réserve le compte d'administration aux opérations sensibles. Si le compte de tous les jours est compromis (mail piégé, site usurpé), l'attaquant n'obtient pas les clés de tout le système." , schema: 'admin-it-bonnes-pratiques' },
                        { h: "Le moindre privilège", t: "Chaque personne (et chaque service logiciel) ne reçoit que les droits strictement nécessaires. Les droits passent par des groupes révisés périodiquement, jamais par des accumulations au fil de l'eau. Un compte qui quitte l'entreprise perd ses droits le jour même." },
                        { h: "La double authentification (MFA)", t: "Le MFA demande un second facteur : code temporaire, application d'authentification, clé physique. Un mot de passe volé ne suffit plus à l'attaquant. Priorité d'application : les accès distants et tous les comptes d'administration." }
                    ]},
                    { title: "Leçon 2 — Gérer les changements sans casser", parts: [
                        { h: "Un changement est annoncé", t: "Toute modification sérieuse est décrite avant : ce qui change, pourquoi, sur quels équipements, pendant quelle fenêtre horaire, et quels utilisateurs sont touchés. On choisit une fenêtre à faible utilisation (souvent le soir ou le week-end), pas l'heure des pointes." },
                        { h: "Toujours un plan de retour arrière", t: "Avant le changement, notez l'état initial (copie de configuration, sauvegarde, instantané) et écrivez comment revenir en arrière et qui décide de revenir. Un changement sans retour arrière possible est une prise de risque déclarée." },
                        { h: "Tester d'abord", t: "Idéalement, le changement est répété sur une pré-production ou une machine de test. Si c'est impossible, on limite la portée : un service pilote d'abord, le reste ensuite. Jamais un changement à large impact sans aucun test." }
                    ]},
                    { title: "Leçon 3 — Documenter et tracer", parts: [
                        { h: "La documentation d'exploitation", t: "Procédures pas à pas, schéma d'architecture, registre des équipements, contacts. L'épreuve de vérité : un collègue absent ne doit jamais bloquer une urgence. On écrit pour être relu, pas pour briller." },
                        { h: "Les journaux centralisés", t: "Les événements importants (connexions, changements, erreurs de services) sont collectés au même endroit plutôt que dispersés sur chaque machine. C'est la matière première de la supervision (AIS CP7) et de l'analyse après incident (AIS CP10)." },
                        { h: "La revue périodique", t: "À intervalles fixes : qui a encore accès à quoi ? quels comptes sont obsolètes ? quels comptes de service existent et sont-ils toujours nécessaires ? Cette revue régulière empêche les droits de s'accumuler silencieusement." }
                    ]}
                ],
                guiSteps: [
                    { title: "Appliquer le moindre privilege - separer les comptes", action: "Dans ADUC, creez un compte admin separe (ex : adm.jdupont) pour l'administration quotidienne. Le compte ordinaire (jdupont) sert pour la bureautique. Dans lusrmgr.msc, verifiez que le compte ordinaire n'est PAS dans le groupe Administrateurs.", observation: "Deux comptes distincts : un pour le quotidien, un pour l'administration. En cas de compromission du compte ordinaire, l'attaquant n'a pas les droits admin." },
                    { title: "Activer la MFA (authentification multifacteur)", action: "Dans Entra ID (ex-Azure AD), naviguez vers Users - Per-user MFA. Selectionnez les comptes admin, cliquez Enable. L'utilisateur devra configurer Microsoft Authenticator a sa prochaine connexion.", observation: "La MFA ajoute un second facteur (code dans l'app mobile). Meme si le mot de passe est vole, l'attaquant ne peut pas se connecter sans le telephone." },
                    { title: "Documenter un changement (gestion du changement)", action: "Avant toute modification d'infrastructure, remplissez une fiche de changement : quoi, quand, qui, impact, plan de retour arriere. Testez dans un environnement de test avant la production.", observation: "La documentation du changement cree une tracabilite : qui a fait quoi, quand, et pourquoi. En cas de panne, le retour arriere est possible." }
                ],
                deepDive: [
                    { t: "Le moindre privilege explique simplement", p: [
                        "Chaque compte, chaque service, chaque processus ne doit avoir que les droits STRICTEMENT necessaires. Pas plus.",
                        "En pratique : un technicien helpdesk n'a pas besoin d'etre admin du domaine. Il a besoin du droit de reinitialiser les mots de passe, rien de plus.",
                        "En AD, cela se traduit par des delegations ciblees (clic droit sur une OU - Delegate Control) plutot que l'ajout au groupe Domain Admins."
                    ],
                    box: 'remember', boxText: "A retenir : moindre privilege = chaque compte a SEULEMENT les droits necessaires. Separation des comptes (bureautique vs admin), delegations ciblees par OU, et MFA sur les comptes sensibles." },
                    { t: "Erreurs frequentes en securite", p: [
                        "Utiliser le compte Domain Admin pour la bureautique : si le poste est compromis (phishing), le domaine entier est compromis.",
                        "Donner les droits admin du domaine au service informatique entier : utiliser les delegations d'OU et les groupes cible a la place.",
                        "Oublier de desactiver les comptes des ex-employes : un compte actif sans proprietaire actif est une porte d'entree."
                    ],
                    box: 'warn', boxText: "Erreur frequente : ajouter des utilisateurs au groupe Domain Admins pour resoudre un probleme d'acces. Ce groupe donne le controle TOTAL du domaine. Utilisez les delegations d'OU a la place." }
                ],
                exercices: [
                    { enonce: "Vous reprenez la main sur l'infrastructure d'un nouveau client. Citez cinq actions de première prise en main qui sécurisent le plus la situation.", correction: "1) Faire l'inventaire des comptes à privilèges et s'assurer qu'ils sont nominatifs (supprimer les comptes génériques ou partagés). 2) Vérifier que la MFA protège les accès distants et les comptes admin. 3) Vérifier les sauvegardes : existence, emplacement, et au moins un test de restauration. 4) Constituer une documentation minimale (schéma, accès, contacts, procédures d'urgence). 5) Instaurer la règle : tout changement passe par une annonce et un plan de retour arrière. L'ordre va du contrôle des accès vers la capacité de réagir." },
                    { enonce: "Un manager exige « le mot de passe administrateur pour dépanner son équipe ». Comment répondez-vous ?", correction: "On ne partage pas de comptes : la traçabilité (qui a fait quoi) devient impossible et le moindre privilège est annulé. La bonne réponse : écouter le besoin réel, y répondre avec un accès proportionné (compte standard, délégation sur le service concerné, ou intervention de l'équipe IT), et expliquer pourquoi le partage de compte est refusé. La demande, la réponse et l'accord obtenu sont documentés." }
                ],
                resume: "L'administration saine repose sur quatre habitudes : comptes séparés et moindre privilège, MFA sur les accès sensibles, changements annoncés avec plan de retour arrière, et documentation + centralisation des journaux. Ce socle est réutilisé dans tous les autres CP de l'AIS.",
                suite: "AIS CP2 — Infrastructures réseaux : appliquer ces principes à la construction du réseau.",
            },
            {
                id: 'ais-cp2', parcours: 'AIS', code: 'CP2',
                title: 'Infrastructures réseaux',
                niveau: 'Intermédiaire',
                prerequis: "Le TSSR CP4 (adressage, DNS, DHCP) fournit tout ce qui est réutilisé ici. Des bases de commutation (VLAN) sont un plus.",
                objectifs: [
                    "Justifier une segmentation du réseau en zones par usage",
                    "Décrire le contrôle des flux entre zones et le principe « refusé par défaut »",
                    "Nommer les mécanismes de résilience d'un réseau switché (redondance, boucles, STP)",
                    "Comprendre le rôle de la documentation du réseau vivante"
                ],
                lessons: [
                    { title: "Leçon 1 — Segmenter pour maîtriser", parts: [
                        { h: "Des zones par usage", t: "Un réseau maîtrisé se découpe en zones cohérentes : postes utilisateurs, serveurs, Wi-Fi invités, administration. Chaque zone a ses règles, son niveau de confiance, ses utilisateurs. Un réseau à plat (tout dans un seul bloc) rend impossible une politique ciblée." , schema: "topologies-fr-v2" },
                        { h: "Le VLAN comme outil", t: "Techniquement, la zone est souvent un VLAN : une découpe logique du switch, détaillée dans le TSSR CP4 et le labo CCNA. Ce qui compte ici : chaque zone a une raison d'être documentée, pas un découpage par réflexe." },
                        { h: "Les bénéfices attendus", t: "Trois gagnants : la diffusion reste locale (performance), les flux inter-zones deviennent contrôlables (sécurité), et un attaquant qui a percé la zone invités ne circule pas librement jusqu'aux serveurs (on limite le déplacement latéral)." }
                    ]},
                    { title: "Leçon 2 — Contrôler les flux entre zones", parts: [
                        { h: "Qui parle à qui, explicitement", t: "Le passage d'une zone à une autre s'effectue via un routeur ou un pare-feu : c'est là qu'on écrit les règles. Chaque règle répond à un besoin documenté : « les postes joignent le serveur de fichiers », « les invités ne joignent que Internet ».", schema: "vlan-segmentation" },
                        { h: "Refusé par défaut", t: "Le principe sain : tout ce qui n'est pas explicitement autorisé est refusé. On part de presque rien (ou rien) et on ouvre au besoin, chaque ouverture restant justifiée (rappel AIS CP1 : moindre exposition et documentation). L'inverse (tout ouvert, puis on ferme après incident) vient toujours trop tard." },
                        { h: "Documenter les flux", t: "Schéma + tableau des flux : zone source, zone cible, service, justification. Sans cette base, aucune maintenance ne saura pourquoi une règle existe, et tout le monde finira par « tout ouvrir pour dépanner »." }
                    ]},
                    { title: "Leçon 3 — Rendre le réseau disponible", parts: [
                        { h: "La redondance a un prix : les boucles", t: "Relier les switches deux fois apporte de la survabilité mais crée des boucles (les trames tournent indéfiniment). Le protocole STP (Spanning Tree, standard du secteur) désactive automatiquement un chemin pour couper la boucle, avec réactivation si le lien principal tombe.", schema: "stp-election" },
                        { h: "Tester la bascule", t: "Une redondance jamais testée est un doute, pas une sécurité : couper le lien principal en fenêtre contrôlée et vérifier que le second prend le relais, avec une durée de coupure mesurée. On apprend aussi à quel point la bascule est rapide (ou non) quand on la voit tourner." },
                        { h: "Faire vivre le schéma", t: "Le réseau change : nouveau site, nouveau switch, remplacement. Le schéma et le tableau des flux sont révisés à chaque changement, pas à la fin du projet. Un schéma à jour est le premier outil du diagnostic ; un schéma périmé est un piège." }
                    ]}
                ],
                guiSteps: [
                    { title: "Verifier la topologie reseau avec des outils de base", action: "Sur un poste Windows, ouvrez une invite de commandes et tapez les commandes de diagnostic reseau dans l'ordre. Chaque commande repond a une question precise.", observation: "ipconfig /all montre l'adressage, ping teste la joignabilite, tracert montre le chemin, arp -a montre le cache MAC.", cli: [
                        "ipconfig /all",
                        "ping 192.168.1.254",
                        "tracert 8.8.8.8",
                        "arp -a"
                    ] },
                    { title: "Configurer un switch Cisco : VLAN et trunk", action: "Connectez-vous au switch (console ou SSH), entrez en mode configuration, creez les VLANs et affectez les ports. Un port en mode access appartient a UN VLAN, un port en mode trunk transporte PLUSIEURS VLANs.", observation: "show vlan brief liste les VLANs et leurs ports. show interfaces trunk montre les liens d'agregation.", cli: [
                        "enable",
                        "configure terminal",
                        "vlan 10",
                        " name PROD",
                        "vlan 20",
                        " name VOIP",
                        "interface fa0/1",
                        " switchport mode access",
                        " switchport access vlan 10"
                    ] },
                    { title: "Analyser une trame avec Wireshark", action: "Ouvrez Wireshark, selectionnez l'interface reseau, demarrez la capture. Generez du trafic (ping, navigation web). Arretez la capture et analysez une trame : Ethernet (MAC) + IP + TCP/UDP + donnees.", observation: "Chaque couche du modele OSI est visible dans une trame : MAC (couche 2), IP (couche 3), TCP/UDP (couche 4), HTTP/DNS (couche 7). Wireshark colorie les protocoles pour faciliter la lecture." }
                ],
                deepDive: [
                    { t: "La couche 2 en pratique : switch, MAC, VLAN", p: [
                        "Le switch apprend les adresses MAC en lisant la MAC source de chaque trame. Il construit sa table CAM (Content Addressable Memory). Quand il recoit une trame, il regarde la MAC destination et envoie sur le port correspondant.",
                        "Un VLAN isole les domaines de diffusion. Deux postes dans des VLANs differents ne peuvent pas communiquer sans un routeur (ou un switch de couche 3)."
                    ],
                    cmd: [
                        "show mac address-table",
                        "show vlan brief",
                        "show interfaces trunk"
                    ],
                    box: 'remember', boxText: "A retenir : la table CAM associe MAC a port. Un VLAN = un domaine de diffusion. Le trunk transporte plusieurs VLANs avec des tags 802.1Q. Le VLAN natif circule non bague." },
                    { t: "La couche 3 en pratique : routage", p: [
                        "Le routeur lit l'IP destination de chaque paquet et consulte sa table de routage. La route la plus precise gagne (le plus long prefixe). Si aucune route ne correspond, le paquet est supprime.",
                        "Les distances administratives departagent les sources : statique = 1, OSPF = 110, RIP = 120. La plus fiable gagne."
                    ],
                    box: 'remember', boxText: "A retenir : le routeur relie les reseaux. La table de routage dit OU envoyer. Les distances admin disent QUELLE source croire. IP destination + masque = recherche dans la table." }
                ],
                exercices: [
                    { enonce: "Une PME de 150 employés : proposez un découpage en zones (avec VLAN) et deux règles de flux exemplaires.", correction: "Exemple valable : VLAN 10 Postes, VLAN 20 Serveurs, VLAN 30 Wi-Fi invités, VLAN 40 Administration. Règles attendues : Postes → Serveurs sur les services utiles uniquement (fichiers, imprimante, ERP), autorisé ; Invités → tout le reste, refusé sauf Internet ; Administration → joignable seulement depuis les postes admins, jamais depuis Invités. Toute autre variation cohérente est acceptable : l'essentiel est le refus par défaut et la justification par flux." },
                    { enonce: "On vient d'installer un lien de secours entre deux switches. Pourquoi le STP devient-il votre allié, et que faut-il tester ?", correction: "Deux chemins entre les mêmes switches = boucle possible ; STP coupe automatiquement l'un des chemins et le réactive si l'autre tombe. À tester : débrancher le lien principal et mesurer la durée pendant laquelle le réseau est affecté, vérifier que le secours prend effectivement le relais, et refaire l'inverse. Le test est documenté (date, résultat, pertes), et le schéma est mis à jour." }
                ],
                resume: "Un réseau maîtrisé se segmente par usage (VLAN), contrôle explicitement les flux entre zones avec un refus par défaut, se prémunit des boucles avec le STP et se documente en continu (schéma + tableau des flux). La redondance se teste, jamais supposée.",
                suite: "AIS CP3 — Infrastructures systèmes : même logique, côté serveurs.",
            },
            {
                id: 'ais-cp3', parcours: 'AIS', code: 'CP3',
                title: 'Infrastructures systèmes',
                niveau: 'Intermédiaire',
                prerequis: "Les TSSR CP2 (Windows/AD), CP3 (Linux) et CP5 (virtualisation) : ce CP en réassemble les acquis en vue de production.",
                objectifs: [
                    "Identifier les rôles classiques d'un serveur Windows et l'intérêt de les séparer",
                    "Sécuriser un serveur Linux avec un ensemble de réglages de base vérifiables",
                    "Administrer à distance selon les pratiques de sécurité (RDP/SSH via VPN, MFA, traçabilité)"
                ],
                lessons: [
                    { title: "Leçon 1 — Windows Server et ses rôles", parts: [
                        { h: "Les rôles courants", t: "AD DS (l'annuaire du TSSR CP2), DNS, DHCP, serveur de fichiers… Chaque rôle répond à un service rendu aux utilisateurs ou au réseau. Un environnement « Windows » sobre tient souvent avec cet ensemble côté serveur." , schema: 'linux-architecture' },
                        { h: "Pourquoi séparer", t: "Mettre tout sur un seul serveur simplifie la gestion et crée un point de défaillance unique : une mise à jour ratée ou un incident touche l'annuaire, le DHCP et les fichiers en même temps. Les rôles critiques se séparent, surtout l'annuaire." },
                        { h: "Quand regrouper", t: "Une PME peut regrouper plusieurs rôles sur une même machine virtualisée (rappel TSSR CP5) quand le volume le permet. La séparation est un curseur à justifier, pas un dogme non plus : les rôles critiques (AD DS, fichiers sensibles) vont en priorité à leur propre machine." }
                    ]},
                    { title: "Leçon 2 — Sécuriser un serveur Linux", parts: [
                        { h: "Les mises à jour maîtrisées", t: "Les correctifs de sécurité passent par le gestionnaire de paquets (TSSR CP3). En production, on choisit un rythme, on teste un serveur d'abord (pré-prod ou pilote), puis on propage. L'inverse — jamais mettre à jour — transforme chaque correctif manquant en faille potentielle." },
                        { h: "SSH en clés", t: "Comme au TSSR CP3 : authentification par paire de clés plutôt que mot de passe, et on limite qui peut se connecter (comptes nominatifs). L'administration à distance reste possible, à l'abri du bruit des attaques par mot de passe." },
                        { h: "Réduire la surface", t: "On liste les services présents (systemctl list-units --type=service) et on coupe ce qui ne sert pas : moins de services actifs, moins d'éventuelles failles. La surface se resserre aussi au niveau du pare-feu local quand l'usage le permet." }
                    ]},
                    { title: "Leçon 3 — Administrer à distance, en sécurité", parts: [
                        { h: "Pas d'administration exposée", t: "RDP et SSH ne se publient pas directement sur Internet : l'accès passe par le VPN (TSSR CP7) ou un portail d'accès protégé. C'est le complément du principe : tout ce qui n'est pas destiné à Internet reste caché." },
                        { h: "MFA et traçabilité", t: "Les comptes admin qui se connectent à distance portent une MFA (AIS CP1), et les sessions sont journalisées : qui, depuis où, quand et quoi, centralisés au même endroit (rappel AIS CP1 : journaux centralisés)." },
                        { h: "Le compte de service, une entité limitée", t: "Un compte de service (utilisé par une application) a un mot de passe robuste, des droits minimaux sur ce service précisément, et un mot de passe distinct de tous vos comptes personnels. Il n'est jamais un compte admin « polyvalent »." }
                    ]}
                ],
                guiSteps: [
                    { title: "Durcir un serveur Windows Server", action: "Ouvrez Parametres - Systeme - A propos - Parametres systeme avances - Performances - Parametres - Avance - Memoire virtuelle. Verifiez que le fichier de page n'est pas sur C:. Ouvrez secpol.msc (Strategie de securite locale) et configurez : verrouillage apres 5 echecs, duree de verrouillage 15 min, mot de passe minimum 12 caracteres.", observation: "La strategie de securite locale applique des regles que tous les comptes doivent respecter. Les changements sont visibles dans gpresult." },
                    { title: "Durcir un serveur Linux (SSH, permissions)", action: "Editez /etc/ssh/sshd_config : PermitRootLogin no, PasswordAuthentication no (apres avoir installe une cle), MaxAuthTries 3. Redemarrez ssh. Verifiez les permissions critiques : /etc/shadow en 600, /etc/passwd en 644.", observation: "Le serveur SSH refuse la connexion root et n'accepte que les cles. Un audit avec ssh-audit (outil open source) note la securite de la configuration.", cli: [
                        "sudo nano /etc/ssh/sshd_config",
                        "sudo sshd -t",
                        "sudo systemctl restart sshd",
                        "sudo chmod 600 /etc/shadow",
                        "sudo ls -la /etc/shadow /etc/passwd"
                    ] },
                    { title: "Verifier les comptes et les privileges", action: "Sur Windows : net user liste les comptes locaux, net localgroup Administrateurs liste les admins. Sur Linux : cat /etc/passwd liste les comptes, sudo -l montre les privileges sudo de l'utilisateur courant.", observation: "Toute compte admin inattendu (ex : un compte de test oublie) est une vulnerabilite. Documentez chaque compte et son role.", cli: [
                        "net user",
                        "net localgroup Administrateurs"
                    ] }
                ],
                deepDive: [
                    { t: "Le hardening en 5 domaines", p: [
                        "1. Comptes : moindre privilege, suppression des comptes inactifs, MFA sur les comptes sensibles.",
                        "2. Reseau : pare-feu actif (regles restrictives), ports inutiles fermes, chiffrement des flux (TLS, SSH).",
                        "3. Journaux : logs actifs, centralises (syslog/SIEM), retention definie.",
                        "4. Mises a jour : patch management automatique, test avant production.",
                        "5. Sauvegarde : regle 3-2-1, test de restauration regulier."
                    ],
                    box: 'remember', boxText: "A retenir : le hardening reduit la surface d'attaque. Chaque service desactive est une porte fermee. Chaque regle de pare-feu est une contrainte pour l'attaquant. Chaque journal actif est une trace pour l'investigation." },
                    { t: "Erreurs frequentes en securite systeme", p: [
                        "Laisser le compte root/admin actif en SSH/RDP : c'est la premiere cible des attaques par force brute.",
                        "Installer des services inutiles (FTP, Telnet) qui creent des portes d'entree supplementaires.",
                        "Oublier de mettre a jour le systeme pendant des mois : les vulnerabilites connues (CVE) sont publiquement documentees et exploitees."
                    ],
                    box: 'warn', boxText: "Erreur frequente : penser que le pare-feu perimeter suffit. Un attaquant qui a compromis un poste interne peut se deplacer lateralement (lateral movement) si les serveurs internes ne sont pas durcis." }
                ],
                exercices: [
                    { enonce: "Rédigez une check-list de prise en charge d'un nouveau serveur Linux de production (au moins six points).", correction: "Exemple de base attendu : 1) mises à jour installées avec un rythme planifié ; 2) SSH en authentification par clés, comptes nominatifs ; 3) services inutiles identifiés et désactivés ; 4) sauvegarde définie pour les données de ce serveur et test de restauration planifié ; 5) journaux centralisés vers le système de collecte ; 6) documentation créée (rôle, IP, procédure de restauration) ; 7) accès d'administration uniquement via le VPN. Toute check-list couvrant accès, mise à jour, sauvegarde et traçabilité est valable." },
                    { enonce: "On vous propose de regrouper annuaire (AD DS), DHCP et serveur de fichiers sur une seule VM. Quels arguments posez-vous ?", correction: "Arguments pour la séparation d'AD DS en priorité : l'annuaire est le service dont dépendent tous les autres (authentification), une panne combinée = tout fonctionne en même temps sur le même point de fragilité. La complexité de reconstituer le service un jour dépasse l'économie de gestion réalisée. Compromis réaliste : séparer AD DS, éventuellement regrouper DHCP + fichiers, et tout se joue aussi sur les contraintes du client (budget, matériel). Documentez la décision et ses compromis." }
                ],
                resume: "Un système en production se construit avec des rôles clairs et séparés quand ils sont critiques, une surface minimale (services utiles seuls, SSH en clés), des mises à jour maîtrisées, et une administration à distance percée par VPN avec MFA et journalisation.",
                suite: "AIS CP4 — Infrastructures virtualisées : héberger ces serveurs proprement.",
            },
            {
                id: 'ais-cp4', parcours: 'AIS', code: 'CP4',
                title: 'Infrastructures virtualisées',
                niveau: 'Intermédiaire',
                prerequis: "Le TSSR CP5 (hyperviseurs, VM, snapshot) est le socle direct de ce CP.",
                objectifs: [
                    "Expliquer ce qu'apporte un cluster d'hyperviseurs par rapport à un serveur unique",
                    "Établir une politique de sauvegarde des VM cohérente avec la règle 3-2-1",
                    "Sécuriser la plateforme de virtualisation elle-même (gestion, mises à jour, ressources)"
                ],
                lessons: [
                    { title: "Leçon 1 — Le cluster d'hyperviseurs", parts: [
                        { h: "Plusieurs hôtes, un même parc de VM", t: "Un cluster regroupe plusieurs serveurs physiques (hôtes) qui hébergent collectivement les VM. Si un hôte tombe, les services re-démarrent sur les autres : c'est le mécanisme de haute disponibilité des solutions du marché (Hyper-V, VMware, Proxmox). Coût : plus d'équipement et un stockage partagé." , schema: 'hyper-v-architecture'},
                        { h: "Le stockage partagé", t: "Les VM résident sur un espace de stockage commun (baie dédiée ou solution de stockage distribué), accessible par tous les hôtes. Sans repère partagé, la migration et la bascule ne peuvent pas fonctionner. Ce stockage devient lui-même critique : redondance obligatoire." },
                        { h: "La limite logique", t: "La haute disponibilité protège de la panne matérielle, pas des erreurs : supprimer une VM n'épargne pas le cluster. Cela reste l'affaire des sauvegardes et des habitudes opératoires (jamais supprimer sans réfléchir : mettre à l'arrêt, renommer « à supprimer », attendre quelques jours)." }
                    ]},
                    { title: "Leçon 2 — Protéger les VM", parts: [
                        { h: "Snapshot et sauvegarde, rôles distincts", t: "Rappel du TSSR CP5 : le snapshot sert l'instant T avant opération risquée, la sauvegarde est une copie externalisée capable de survivre à la perte de la VM. Un usage permanent est possible avec nombre de solutions de sauvegarde du marché (Veeam, Proxmox Backup Server, etc.), avec test de restauration en VM entière." },
                        { h: "La cohérence des données", t: "Sauvegarder une VM en marche demande un dispositif d'aide à la cohérence (agent dans la VM, ou mécanisme de snapshot assisté) sinon les fichiers en cours d'écriture risquent d'être incohérents à la restauration. On suit la documentation de sa solution : c'est un piège classique." },
                        { h: "La 3-2-1 appliquée aux VM", t: "Rappel du TSSR CP8 : copies sur un support différent de l'hyperviseur, dont une hors du site, une copie protégée en écriture si possible, et régulièrement des restaurations testées à chaud, chronométrées (RTO)." }
                    ]},
                    { title: "Leçon 3 — Sécuriser la plateforme", parts: [
                        { h: "L'interface de gestion sous clé", t: "La console d'administration de l'hyperviseur est le clavier de tout le système : elle est accessible seulement depuis le réseau d'administration (VLAN dédié, AIS CP2), avec des comptes nominatifs et MFA (AIS CP1). Jamais exposée sur la zone utilisateur, jamais sur Internet." },
                        { h: "Un compte admin de plateforme dédié", t: "Les comptes d'administration de l'hyperviseur ne servent qu'à cela — comme pour les sauvegardes (TSSR CP8), la séparation limite ce qu'un compromis peut atteindre. On révoque périodiquement les accès des personnes parties ou des prestataires terminés." },
                        { h: "Gouverner les ressources", t: "Mises à jour de l'hyperviseur suivies (fenêtre planifiée, test d'abord), limites de ressources pour qu'une VM gourmande ne fasse pas tout tomber, et surveillance de la plateforme avec la supervision (AIS CP7). Un cluster est un système, pas un ensemble de boîtes indépendantes." }
                    ]}
                ],
                guiSteps: [
                    { title: "Creer un cluster Hyper-V", action: "Sur les deux serveurs Hyper-V, installez la fonctionnalite Failover Clustering (Server Manager - Add Roles and Features - Failover Clustering). Ouvrez le Failover Cluster Manager, cliquez Validate Configuration, selectionnez les deux serveurs, lancez les tests. Puis Create Cluster.", observation: "Le cluster apparait avec les deux noeuds. Le stockage partagé (SMB, SAN ou Storage Spaces Direct) est requis pour les disques des VM." },
                    { title: "Migrer une VM a chaud (Live Migration)", action: "Dans Hyper-V Manager, clic droit sur une VM - Move - Move the virtual machine. Choisissez l'autre noeud du cluster. La VM continue de fonctionner pendant le transfert.", observation: "Aucune interruption de service visible pour l'utilisateur. La VM change d'hote en quelques secondes." },
                    { title: "Verifier la haute disponibilite", action: "Eteignez brutalement le noeud actif (shutdown). Le cluster detecte la panne et redemarre la VM sur l'autre noeud automatiquement. Le temps d'interruption est de 30 secondes environ.", observation: "La VM apparait maintenant sur l'autre noeud, en etat Running. L'utilisateur n'a perdu que quelques secondes de connexion." }
                ],
                deepDive: [
                    { t: "La haute disponibilite expliquee simplement", p: [
                        "La haute disponibilite (HA) signifie qu'un service continue de fonctionner meme si un composant tombe en panne. Pour une VM, cela se fait par un cluster d'hyperviseurs avec stockage partage.",
                        "Le PRA (Plan de Reprise d'Activite) va plus loin : il permet de redemarrer l'informatique dans un AUTRE SITE en cas de sinistre du site principal."
                    ],
                    box: 'remember', boxText: "A retenir : HA = survivre a la panne d'un composant (cluster). PRA = survivre a la perte du site (replication inter-site). PCA = continuer a travailler PENDANT l'incident. RTO = delai de reprise. RPO = perte de donnees maximale." },
                    { t: "Erreurs frequentes en virtualisation avancee", p: [
                        "Oublier le stockage partage : sans stockage accessible par les deux noeuds, la VM ne peut pas migrer.",
                        "Ne pas tester le basculement : un cluster non teste n'est pas un cluster. Il faut SIMULER la panne regulierement.",
                        "Oublier les reseaux VMkernel/vMotion dedies : la migration a chaud a besoin d'un reseau dedie avec suffisamment de bande passante."
                    ],
                    box: 'warn', boxText: "Erreur frequente : creer un cluster sans tester le basculement. Le jour de la vraie panne, le cluster peut ne pas basculer correctement (quotum perdu, stockage inaccessible)." }
                ],
                exercices: [
                    { enonce: "Un serveur de facturation critique tourne sur le cluster. Rédigez son plan de protection complet.", correction: "Attendu : sauvegarde quotidienne externalisée et hors site (règle 3-2-1, TSSR CP8), test de restauration périodique de la VM entière ; VM hébergée sur le cluster avec bascule automatique en cas de panne d'hôte ; snapshot temporaire avant chaque changement, supprimé après validation ; interface d'administration de la VM et du cluster restreinte au VLAN admin avec MFA ; supervision des ressources (CPU, RAM, disque) avec alertes. La sauvegarde reste le filet ultime, la haute disponibilité protège de la panne matérielle instantanée seulement." },
                    { enonce: "Un technicien propose de garder un snapshot de 6 mois comme « sauvegarde », car « c'est plus rapide ». Répondez techniquement.", correction: "Non : un snapshot vit sur le stockage de la production et grandit avec le temps (différences accumulées), dégrade progressivement les performances et ne survit pas à une perte du stockage — exactement ce que la sauvegarde doit couvrir. Il sert à un retour arrière court terme avant une opération risquée, puis se supprime. La protection persistante passe par la sauvegarde externalisée (support différent, hors site, testée). La rapidité apparente ne vaut pas la perte d'un serveur un jour." }
                ],
                resume: "Le cluster apporte la continuité face à la panne d'hôte, le stockage partagé en est la condition, la sauvegarde externe (3-2-1) la mémoire, et la plateforme d'administration (interface, comptes, mises à jour) se verrouille comme un joyau : réseau dédié, MFA, revues périodiques.",
                suite: "AIS CP5 — Concevoir une solution : passer de l'exploitation à la construction.",
            },
            {
                id: 'ais-cp5', parcours: 'AIS', code: 'CP5',
                title: 'Concevoir une solution',
                niveau: 'Avancé',
                prerequis: "Les AIS CP1 à CP4 : concevoir, c'est réutiliser tout l'acquis exploit avec un regard projet. Aucune compétence en management exigée.",
                objectifs: [
                    "Recueillir un besoin et le formaliser (cahier des charges simple)",
                    "Distinguer architecture logique et architecture physique",
                    "Écrire les hypothèses et les limites d'une proposition",
                    "Intégrer l'analyse des risques dans la conception (repère : EBIOS RM)"
                ],
                lessons: [
                    { title: "Leçon 1 — Partir du besoin, pas du catalogue", parts: [
                        { h: "Écouter et faire préciser", t: "« On a besoin d'un serveur » cache toujours des questions : combien d'utilisateurs ? quels volumes de données ? quelle disponibilité attendue ? quel délai ? quelle contrainte budgétaire ? L'interview du métier précède tout choix de matériel — le catalogue vient après." },
                        { h: "Le cahier des charges simple", t: "Un document d'une ou deux pages : ce qui est attendu (besoins, volumes, disponibilité), ce qui n'est pas attendu (périmètre exclu), les contraintes (budget, délais, normes internes). Il évite le « ce n'est pas ce que je voulais » final et sert de contrat de référence." },
                        { h: "Les questions à jamais oublier", t: "Que se passe-t-il en cas de panne (disponibilité attendue) ? Comment sont gérées les sauvegardes ? Qui administre après la livraison ? Ces trois questions structurent la plupart des débats." }
                    ]},
                    { title: "Leçon 2 — Architecturer", parts: [
                        { h: "D'abord la logique, ensuite le physique", t: "Le cahier des charges décrit les services, les flux et les volumes AVANT de parler matériel. Une topologie se dessine après le besoin : étoile au bureau, arbre entre bâtiments, maillé entre sites critiques.", schema: 'topologies-fr-v2', imgCaption: 'Schéma des topologies réseau classiques : bus, anneau, étoile, maillé, arbre. L\'étoile est le standard moderne.' },
                        { h: "Intégrer les risques", t: "En France, la méthode de référence pour l'analyse des risques est EBIOS RM (publiée par l'ANSSI, l'agence nationale de la sécurité des systèmes d'information) : elle identifie les scénarios redoutés et guide les mesures. Au minimum, on liste pour chaque bloc : que se passe-t-il si ce bloc tombe ou est compromis ?" },
                        { h: "Les hypothèses écrites", t: "« Cette solution est dimensionnée pour 150 utilisateurs avec une croissance estimée de 10 % par an, sur la base de 2 Go de données par utilisateur. » Chaque hypothèse écrite est une limite assumée et une base de discussion honnête. L'hypothèse tacite devient un litige." }
                    ]},
                    { title: "Leçon 3 — Dimensionner, documenter, proposer", parts: [
                        { h: "Le dimensionnement avec marge", t: "RAM, CPU, espace disque : calculés à partir du besoin mesuré ou estimé, avec une marge raisonnable (ni goulot d'étranglement au premier pic, ni surdimension systématique). Les hypothèses de départ se vérifient ensuite par la supervision une fois en service (AIS CP7)." },
                        { h: "La redondance là où ça compte", t: "On met en redondance ce dont dépend le service critique : alimentation, liens, sauvegardes, selon le niveau de disponibilité exprimé par le métier. Tout redonder coûte cher ; rien ne redonder coûte la panne. La discussion porte sur les niveaux attendus." },
                        { h: "La proposition documentée", t: "Schéma logique + physique, plan d'adressage et de zones, justificatifs, prix en ordre de grandeur, hypothèses et limites, plan de sauvegarde intégré. C'est ce document que le client signe, et que vous relirez quand viendra la mise en production (AIS CP6)." }
                    ]}
                ],
                guiSteps: [
                    { title: "Concevoir une solution de A a Z", action: "Avant d'installer quoi que ce soit, remplissez un document de conception qui repond a ces questions : Quel besoin metier ? Quelle architecture (physique, virtuel, cloud) ? Quel dimensionnement (CPU, RAM, disque, reseau) ? Quelle haute disponibilite ? Quelle securite ? Quelle supervision ? Quelle sauvegarde ?", observation: "Le document de conception est le contrat entre le besoin metier et la solution technique. Il evite les surcouts et les oublis." },
                    { title: "Dessiner l'architecture", action: "Utilisez un outil de schema (draw.io, Visio) pour representer : les serveurs, les reseaux (VLANs, pare-feux), les flux (qui parle a qui sur quel port), les points de stockage et les chemins de sauvegarde.", observation: "Le schema permet de valider l'architecture avec le metier et de detecter les points de defaillance unique (SPOF)." },
                    { title: "Dimensionner correctement", action: "Pour chaque serveur : CPU (nombre de coeurs necessaires selon la charge), RAM (application + OS + marge), disque (taille des donnees + croissance + sauvegardes), reseau (bande passante + redondance). Documentez les hypotheses.", observation: "Un serveur sous-dimensionne plante en production. Un serveur sur-dimensionne gaspille. Le dimensionnement est un equilibre base sur des donnees." }
                ],
                deepDive: [
                    { t: "Concevoir une architecture en pratique", p: [
                        "Partez du besoin metier (ex : heberger un ERP pour 50 utilisateurs), identifiez les composants (serveur applicatif, base de donnees, sauvegarde, reseau), choisissez les technologies (Hyper-V, Windows Server, SQL Server), et dessinez l'architecture.",
                        "Verifiez chaque point de defaillance unique (SPOF) : un seul DC ? ajoutez un second. Un seul switch ? ajoutez un second en stack. Un seul lien Internet ? ajoutez un lien de secours 4G."
                    ],
                    box: 'remember', boxText: "A retenir : le schema reseau, la matrice de flux et le plan de sauvegarde sont les trois documents indispensables de toute conception d'infrastructure." }
                ],
                deepDive: [
                    { t: "La methode de conception en 6 etapes", p: [
                        "1. Cadrer le besoin metier (que veut-on faire ?). 2. Choisir l'architecture (technos, taille, disponibilite). 3. Dimensionner (CPU, RAM, disque, reseau). 4. Securiser (pare-feu, comptes, chiffrement). 5. Documenter (schema, procedures, contacts). 6. Tester (Poc, recette, mise en production)."
                    ],
                    box: 'remember', boxText: "A retenir : une solution bien concue est documentee AVANT l'installation. Le schema reseau, la matrice de flux et le plan de sauvegarde sont les trois documents indispensables." },
                    { t: "Les points de defaillance unique (SPOF)", p: [
                        "Un SPOF est un composant dont la panne interrompt TOUT le service. Exemples : un seul switch, un seul serveur, un seul chemin de stockage, un seul DC, un seul lien Internet.",
                        "Pour chaque SPOF identifie, proposez une solution : redondance (deux switchs), cluster (deux DC), lien de secours (4G), replication (deux sites)."
                    ],
                    box: 'warn', boxText: "Erreur frequente : concevoir une solution sans identifier les SPOF. Un seul DC, un seul lien Internet ou un seul switch d'acces sont des SPOF critiques." }
                ],
                exercices: [
                    { enonce: "Un client veut « un espace de stockage partagé fiable pour 150 utilisateurs, avec sauvegardes ». Proposez une architecture en cinq blocs maximum, avec justifications courtes.", correction: "Exemple valable : 1) un serveur de fichiers avec disques en configuration redondante (miroir RAID 1 si petit espace, ou RAID 5 pour un plus grand espace — le choix dépend du volume et du budget) ; 2) une sauvegarde vers un second support local (règle 3-2-1) ; 3) une copie hors site (par exemple dans un coffre numérique distant ou le cloud) pour un sinistre total ; 4) un VLAN réseau dédié pour le trafic de stockage/sauvegarde (AIS CP2) ; 5) une supervision de l'espace disque et du service (AIS CP7). Hypothèses écrites indispensables : volumes par utilisateur estimés, croissance, fenêtre de sauvegarde nocturne." },
                    { enonce: "Votre client vous demande « la même solution en moins cher ». Comment répondez-vous sans rompre ?", correction: "On repose la discussion sur le cahier des charges : quels sont les éléments dits indispensables (disponibilité, sauvegarde, sécurité) et lesquels sont négociables (taille, redondance, matériel plus standard). On propose une variante moins cher avec ses limites écrites (« cette variante accepte une interruption de X heures en cas de panne de disque ») et on laisse le client décider de la réelle tension budget/risque. Jamais de coupe silencieuse sur la sauvegarde ou la sécurité." }
                ],
                resume: "Concevoir = écouter le besoin, le formaliser (cahier des charges), dessiner la logique avant le physique, intégrer les risques (repère : EBIOS RM de l'ANSSI), écrire chaque hypothèse, dimensionner avec marge et documenter la proposition. La conception honnête évite les mises en production douloureuses.",
                suite: "AIS CP6 — Mettre en production : transformer le dossier de conception en service réel.",
            },
            {
                id: 'ais-cp6', parcours: 'AIS', code: 'CP6',
                title: 'Mettre en production',
                niveau: 'Avancé',
                prerequis: "L'AIS CP5 (la conception livrée) et les réflexes du CP1 (changement, retour arrière).",
                objectifs: [
                    "Organiser la recette d'une solution avant bascule",
                    "Écrire et exécuter un plan de bascule avec critères de succès et rollback",
                    "Assurer la communication aux utilisateurs pendant l'opération",
                    "Clôturer avec contrôles, documentation mise à jour et retour d'expérience"
                ],
                lessons: [
                    { title: "Leçon 1 — Préparer la bascule", parts: [
                        { h: "La recette, c'est-à-dire vérifier le besoin", t: "La recette vérifie que la solution répond réellement au cahier des charges (AIS CP5) : temps de réponse, volumes, sauvegardes, fonction précise que le métier attendait. Tester « ça marche » ne suffit pas : on teste que ça répond au contrat." , schema: 'deploiement-postes' , schema: 'deploiement-postes'},
                        { h: "Le plan de bascule écrit", t: "Un document daté : étapes numérotées avec horaire prévu et responsable, critères de succès de chaque étape, points de contrôle, et surtout le plan de retour arrière (rollback) : quand on le déclenche, qui le décide, combien de temps on accepte d'avancer avant de renoncer." },
                        { h: "La fenêtre et l'annonce", t: "Fenêtre creuse choisie de préférence (soirée, week-end...), utilisateurs prévenus avec les impacts réels (indisponibilité de quoi pendant combien de temps, qui appeler en cas de problème le lendemain). Le support (TSSR CP1) doit aussi connaître l'opération pour traiter les appels de la matinée suivante." }
                    ]},
                    { title: "Leçon 2 — Exécuter la bascule", parts: [
                        { h: "Le Go / No-Go", t: "Avant de commencer : tous les prérequis sont-ils réunis (sauvegardes à jour, équipe présente, plan affiché) ? Un point formel Go / No-Go honore la discipline : chacun dit oui, non ou « j'ai un doute » avant que quoi que ce soit bouge." },
                        { h: "Étape par étape, et pas plus vite", t: "On suit le plan : chaque étape est réalisée, vérifiée contre son critère de succès, et horodatée. Si une étape manque de son critère au-delà du temps budgété, on déclenche le rollback — pas « on verra un peu plus tard » : le temps de marge est compté dès le départ." },
                        { h: "Ne jamais improviser", t: "Un imprévu arrive ? On tient le journal (heure, action, résultat), et tout écart majeur par rapport au plan appelle une décision explicite, pas une correction à l'aveugle. La bascule est la partie la moins créative et la plus exigeante de l'administration." }
                    ]},
                    { title: "Leçon 3 — Clôturer proprement", parts: [
                        { h: "Les contrôles post-bascule", t: "Services accessibles, données cohérentes, premiers utilisateurs réels (pas seulement des tests), sauvegarde de la nouvelle configuration effectuée. On pourrait penser que c'est fini au premier « ça marche » ; non : on surveille de près quelques jours (AIS CP7)." },
                        { h: "La documentation mise à jour", t: "Le schéma, l'inventaire, les procédures d'exploitation reflétent la nouvelle réalité — sinon le prochain intervenant part sur des hypothèses fausses. MIS À JOUR AU FUR ET À MESURE de la bascule, pas la semaine suivante." },
                        { h: "Le retour d'expérience (REX)", t: "Une heure de débriefing : ce qui s'est bien passé, ce qui a surpris, ce qu'on changera au prochain changement projet planifié. Le REX honnête est ce qui rend l'équipe meilleure plus vite que n'importe quel cours." }
                    ]}
                ],
                deepDive: [
                    { t: "Mettre en production sans casse", p: [
                        "La mise en production suit un plan : preparation (test en environnement de recette), announcement (informer les utilisateurs), execution (jour et heure choisis hors production), verification (tests fonctionnels), retour arriere (si echec).",
                        "Le rollback est la garantie : si la mise en production echoue, on restaure l'etat precedent en moins de 15 minutes."
                    ],
                    box: 'remember', boxText: "A retenir : une mise en production reussie = preparation + communication + execution + verification + plan de retour arriere. Le rollback doit etre teste AVANT la mise en production." }
                ],
                exercices: [
                    { enonce: "Rédigez un plan de bascule simplifié pour remplacer le pare-feu d'un site le vendredi soir.", correction: "Attendu : fenêtre 22 h – 00 h ; prérequis : configuration du nouveau pare-feu testée en labo, sauvegarde de la configuration actuelle exportée, équipe de deux présents. Étapes : 1) export et archivage de la config actuelle (22 h) ; 2) bascule physique et reconfiguration (22h15) ; 3) tests (23 h) : Internet sortant, VPN site-à-site, flux inter-VLAN, accès admin ; 4) rollback si un test critique échoue avant 23h40 (réinstallation de l'ancien pare-feu) ; 5) observation rapprochée le samedi. Communication : annonce aux utilisateurs la veille, contact d'urgence affiché. Toute réponse avec rollback horodaté et critères de test est valable." },
                    { enonce: "À mi-bascule, un test d'accès distant échoue. L'équipe propose « on finit et on verra demain ». Que répondez-vous ?", correction: "Le plan contient un critère de succès et un temps de marge. Si l'accès distant est un point critique et que l'échéance du rollback approche, on déclenche le retour arrière comme prévu ; on repart sur un plan de diagnostic en fenêtre non critique. Continuer en production non confirmée transforme un échec anodin en utilisateurs bloqués lundi matin. La décision est documentée dans le journal de bascule." }
                ],
                resume: "La recette vérifie le besoin (pas seulement « ça allume »), le plan de bascule formalise étapes, critères et rollback, le Go/No-Go protège la décision, les contrôles post-bascule et le REX ferment correctement le dossier. La documentation se met à jour pendant l'opération, pas après.",
                suite: "AIS CP7 — Supervision : garder l'œil ouvert sur ce qu'on vient de mettre en service.",
            },
            {
                id: 'ais-cp7', parcours: 'AIS', code: 'CP7',
                title: 'Supervision',
                niveau: 'Intermédiaire',
                prerequis: "Les bases des TSSR CP3 (journaux Linux) et CP5 (systèmes à surveiller) ; le CP1 AIS pour la gestion des comptes de collecte.",
                objectifs: [
                    "Expliquer pourquoi on supervise et identifier les métriques de base",
                    "Établir des seuils d'alerte utiles et éviter le bruit",
                    "Découvrir les outils standards du marché (Zabbix, Centreon, Grafana) et le vocabulaire (SNMP, syslog)"
                ],
                lessons: [
                    { title: "Leçon 1 — Surveiller pour anticiper", parts: [
                        { h: "Avant le téléphone de l'utilisateur", t: "L'objectif de la supervision : détecter une dégradation avant qu'elle devienne panne — un disque qui se remplit, une RAM qui sature, un service étouffé. L'appel utilisateur flatte le technicien réactif ; l'alerte anticipée vient de la supervision." },
                        { h: "Les métriques de base", t: "Sur chaque machine : CPU, RAM, espace disque (%), disponibilité services (répond-il ?), journaux d'erreurs. Sur le réseau : atteignabilité (ping), latence. Ces indicateurs couvrent la plupart des dérives quotidiennes. Les métriques avancées viennent après la base." },
                        { h: "Une alerte, une action", t: "Toute alerte doit être actionnable : « disque de S1 > 95 % → voilà la procédure ». Une alerte sans réponse possible est un bruit qui enseigne à ignorer — le poison de la supervision." }
                    ]},
                    { title: "Leçon 2 — Collecter sans se noyer", parts: [
                        { h: "Comment les informations remontent", t: "Trois canaux standards : les agents logiciels installés sur les machines, SNMP (protocole standard d'interrogation des équipements réseau) et syslog (protocole standard d'envoi des journaux). Les trois cohabitent dans la plupart des environnements." , schema: 'supervision-architecture' },
                        { h: "La hiérarchie des alertes", t: "Deux niveaux suffisent pour débuter : avertissement (à investiguer dans la journée) et critique (à traiter immédiatement). On regroupe les alertes dépendantes (toutes les machines d'un même site hors service = probablement le lien, pas 30 pannes indépendantes)." },
                        { h: "Faire taire le bruit", t: "Seuils trop bas = mille alertes inutiles ; trop hauts = la vraie panne n'apparaît plus. La règle : on teste d'abord chaque alerte sur une machine réelle, puis on affine. On supprime tout ce qui a été ignoré trois fois de suite — soit faux, soit mal rédigé." }
                    ]},
                    { title: "Leçon 3 — Industrialiser la supervision", parts: [
                        { h: "Les outils du marché", t: "Zabbix, Centreon et Grafana sont parmi les plateformes les plus répandues du marché (et certaines ont des versions libres) : collecte, tableaux de bord, alertes. Le produit intervient après la méthode : définir quoi surveiller et qui réagit." },
                        { h: "Tableaux de bord et répartition", t: "Un tableau de bord partagé donne la vue d'ensemble (état des services critiques). La répartition est claire : qui reçoit les alertes critiques hors heures (astreinte), qui suit les avertissements, et où est consigné ce qui a été fait." },
                        { h: "Tester la chaîne d'alerte", t: "Un dispositif d'alerte se teste comme un extincteur : arrêter un service de test, vérifier que l'alerte arrive, au bon destinataire, avec la bonne info. Cette vérification périodique évite le scénario trop fréquent : découvrir trois mois plus tard que « la supervision ne marchait pas »." }
                    ]}
                ],
                guiSteps: [
                    { title: "Installer et configurer Zabbix (vue d'ensemble)", action: "Zabbix se compose d'un serveur (collecte les metriques), d'une base de donnees (stocke), et d'un frontend web (affiche). Les agents s'installent sur les machines surveillees. L'interface web est accessible sur http://serveur-zabbix/zabbix.", observation: "L'interface web affiche : Dashboards (vue d'ensemble), Monitoring (donnees en temps reel), Data collection (hosts, templates, items), Alerts (triggers, actions)." },
                    { title: "Ajouter un hote et associer un template", action: "Dans Data collection - Hosts - Create host. Nom = SRV-LNX01, Groups = Linux servers, Interface = Agent (IP de la cible, port 10050). Dans l'onglet Templates, recherchez et liez 'Linux by Zabbix agent'. Cliquez Add.", observation: "L'host apparait dans la liste avec l'icne de disponibilite de l'agent (vert = OK). Le template apporte automatiquement des items (CPU, RAM, disque) et des triggers." },
                    { title: "Creer un trigger et tester l'alerte", action: "Dans Data collection - Hosts, cliquez sur votre hote - Triggers - Create trigger. Name = 'CPU > 90% sur {HOST.NAME}', Expression = last(/SRV-LNX01/system.cpu.util)>90. Ajoutez une action (email, webhook) dans Alerts - Actions.", observation: "Quand le CPU depasse 90%, le trigger passe en PROBLEM et l'action declenche une notification. Quand le CPU redescend, le trigger passe en RESOLVED." }
                ],
                deepDive: [
                    { t: "Les 4 niveaux de la supervision", p: [
                        "Niveau 1 : disponibilite (le service repond-il ? ping, port, HTTP). Niveau 2 : performance (CPU, RAM, disque, reseau). Niveau 3 : applicatif (le service fonctionne-t-il correctement ? test de connexion a la base). Niveau 4 : metier (les utilisateurs peuvent-ils travailler ?).",
                        "Un bon systeme de supervision couvre les 4 niveaux et hiérarchise les alertes par severite (info, warning, average, high, disaster)."
                    ],
                    box: 'remember', boxText: "A retenir : supervision = collecte (agents, SNMP) + stockage (base) + affichage (dashboards) + alertes (triggers + actions). L'agent actif envoie, l'agent passif repond. Un template apporte des items pre-configures." },
                    { t: "Erreurs frequentes en supervision", p: [
                        "Trop d'alertes : si vous recevez 50 emails par jour, vous les ignorez. Calibrez les seuils sur l'historique reel.",
                        "Superviser uniquement les serveurs : le reseau (switchs, routeurs, liens WAN) et les applications sont tout aussi critiques.",
                        "Oublier les actions : un trigger sans action (email, webhook) ne previent personne."
                    ],
                    box: 'warn', boxText: "Erreur frequente : installer Zabbix, ajouter les hosts, et ne JAMAIS revenir. La supervision n'est utile que si quelqu'un lit les alertes et agit. Configurez les notifications et les escalades." }
                ],
                exercices: [
                    { enonce: "Définissez trois alertes utiles pour un serveur de fichiers, avec niveaux et actions, puis une alerte à supprimer.", correction: "Exemple attendu : 1) espace disque > 85 % = avertissement (planifier l'arbitrage), > 95 % = critique (agir ce jour) ; 2) service de partage arrêté = critique (relancer selon la procédure) ; 3) échec de sauvegarde nocturne = critique le matin (vérifier puis relancer). À supprimer : une alerte CPU > 10 % — inutile car un CPU peu chargé n'est pas un problème, et un seuil faible crée du bruit permanent. Chaque alerte citée porte condition, niveau et action attendue." },
                    { enonce: "Une nuit, 25 alertes « serveur injoignable » arrivent en même temps pour 25 serveurs du même site. Interprétez.", correction: "Vraisemblablement un problème commun : le lien réseau du site ou l'équipement en tête (switch/routeur/pare-feu), pas 25 pannes indépendantes. On regroupe (fonction de corrélation de la plupart des outils) et on déclenche l'investigation sur l'élément commun. C'est exactement pourquoi on ne paramètre pas la supervision liste serveur par serveur, sans penser « sites et dépendances »." }
                ],
                resume: "La supervision consiste à choisir des métriques de base (CPU, RAM, disque, services), à écrire des seuils en deux niveaux avec une action attendue pour chaque alerte, à regrouper les alertes dépendantes, et à tester la chaîne d'alerte. Les produits (Zabbix, Centreon, Grafana) servent la méthode, ils ne la remplacent pas.",
                suite: "AIS CP8 — Mesure du niveau de sécurité : élargir la question des métriques du sécuritaire.",
            },
            {
                id: 'ais-cp8', parcours: 'AIS', code: 'CP8',
                title: 'Mesure du niveau de sécurité',
                niveau: 'Avancé',
                prerequis: "Les AIS CP1 (accès), CP2 (zones/flux) et CP7 (supervision) : on ne sait mesurer que ce qu'on surveille et connaît.",
                objectifs: [
                    "Employer le vocabulaire exact : vulnérabilité, menace, risque",
                    "Comprendre le rôle des bases publiques (CVE) et des scanners",
                    "Prioriser des corrections (exposés d'abord, admins ensuite)",
                    "Connaître les formes de tests d'intrusion et l'importance d'un mandat écrit"
                ],
                lessons: [
                    { title: "Leçon 1 — Inventorier, puis qualifier", parts: [
                        { h: "On ne mesure que ce que l'on connaît", t: "Premier exercice de la mesure : l'inventaire des actifs (serveurs, équipements, comptes à privilèges, données sensibles). Ce qui n'est pas listé n'est ni surveillé ni protégé — et c'est toujours par là que passe le problème." , schema: 'cyber-defense-v2' },
                        { h: "Trois mots bien employés", t: "La vulnérabilité est une faiblesse d'un système (logiciel non à jour, port ouvert). La menace est ce qui peut l'exploiter (un attaquant, un malware). Le risque croise les deux avec l'impact. Parler de « risque » seul ne dit rien : citez toujours ce qui rend le risque acceptable ou pas." },
                        { h: "La mesure n'est pas un score magique", t: "Aucun chiffre seul (score, note d'éditeur) ne résume la sécurité. La mesure utilise une série d'indicateurs suivis dans le temps — correctifs appliqués, comptes obsolètes, incidents traités — contre les objectifs internes de l'organisation." }
                    ]},
                    { title: "Leçon 2 — Trouver les vulnérabilités", parts: [
                        { h: "Les scanners", t: "Des outils de scan de vulnérabilités (Nessus, OpenVAS/GVM parmi les technologies connues) sondent les systèmes et listent les faiblesses détectées. Un scan est un diagnostic à instant T — un inventaire de défauts à classer, pas une garantie de tout." },
                        { h: "Les bases publiques (CVE)", t: "Les vulnérabilités référencées portent un identifiant CVE dans des bases publiques (la NVD — National Vulnerability Database — en est une référence majeure). Chaque bulletin rapproche le défaut de votre parc : « sur nos serveurs, lesquels sont exposés à ce CVE ? »" },
                        { h: "Prioriser les correctifs", t: "Ordre pragmatique : d'abord ce qui est exposé (Internet), ensuite les comptes et services sensibles (admin, annuaire), enfin le reste — en fenêtres planifiées (AIS CP1 : gestion des changements). Un score de sévérité (CVSS) aide à trier mais le contexte décide : une faille moyenne sur un serveur public influence plus qu'une faille haute sur une machine dédiée à rien." }
                    ]},
                    { title: "Leçon 3 — Tester et suivre", parts: [
                        { h: "Les tests d'intrusion (pentest)", t: "Un pentest est une attaque contrôlée, réalisée par un prestataire (ou une équipe interne spécialisée), avec un mandat écrit précisant périmètre, durée, méthodes et consignes d'urgence. On distingue externe (depuis Internet) et interne (depuis le réseau), boîte noire (peu d'informations) et boîte blanche (avec documentation) : chaque format cherche une réponse différente." },
                        { h: "Les indicateurs qui servent", t: "Suivis réellement utiles : proportion de correctifs appliqués dans le délai cible, nombre de comptes à privilèges actifs et revendus, délai de détection et de traitement des incidents. Ces indicateurs se suivent entre deux périodes pour mesurer la progression, pas pour afficher une couleur." },
                        { h: "La clôture du cycle", t: "Trouver ne sert à rien sans corriger ni vérifier : après la correction, on re-scanne pour confirmer, et l'on documente (décision, justification, preuve). La mesure de sécurité est un cycle permanent, pas un événement annuel ponctuel." }
                    ]}
                ],
                guiSteps: [
                    { title: "Mesurer le niveau de securite avec un audit simple", action: "Utilisez des outils open source pour evaluer la securite : Lynis (Linux) et Microsoft Security Baseline (Windows). Sur Linux, executez 'sudo lynis audit system' et lisez le rapport (hardening index, warnings, suggestions).", observation: "Lynis affiche un hardening index (0-100) et des recommandations classees par gravite. Chaque suggestion est un point a ameliorer." },
                    { title: "Scanner les vulnerabilites reseau avec nmap", action: "Depuis une machine de test, scannez le reseau : 'nmap -sn 172.16.10.0/24' (decouverte des hotes), puis 'nmap -sV 172.16.10.10' (versions des services sur le DC). Comparez avec la liste des services attendus.", observation: "Nmap liste les ports ouverts et les versions des services. Tout service inattendu est une surface d'attaque supplementaire." },
                    { title: "Evaluer avec EBIOS RM (methode ANSSI)", action: "EBIOS RM structure l'analyse de risque en 5 ateliers : 1) cadrage et societe cible, 2) evenements redoutes, 3) scenarios de menace, 4) risques, 5) traitement. Pour chaque risque : probabilite x impact = niveau de risque.", observation: "Le registre des risques liste chaque risque avec sa cotation et son traitement (accepte, reduit, transfere, elie)." }
                ],
                deepDive: [
                    { t: "Les outils de mesure de securite", p: [
                        "Scan de vulnerabilites : Nessus, OpenVAS, Qualys. Audit de configuration : Lynis, CIS-CAT, Microsoft Security Compliance Toolkit. Pentest : Nmap, Metasploit, Burp Suite. Detection : SIEM (Wazuh, Splunk), EDR (Defender, CrowdStrike).",
                        "Chaque outil repond a une question differente : 'quelles sont mes failles ?' (scan), 'ma config est-elle securisee ?' (audit), 'puis-je etre attaque ?' (pentest), 'suis-je attaque ?' (detection)."
                    ],
                    box: 'remember', boxText: "A retenir : la securite se mesure avec des outils (scan, audit, pentest) et des processus (EBIOS RM, ISO 27001). Les CVE sont les vulnerabilites publiees, le CVSS est leur score de gravite (0-10)." },
                    { t: "Erreurs frequentes en mesure de securite", p: [
                        "Scanner en production sans prevenir : un scan de vulnerabilites peut faire planter des services sensibles (imprimantes, applicatifs anciens).",
                        "Confondre scan de vulnerabilites et pentest : le scan identifie des failles connues (CVE), le pentest simule une attaque reelle avec de la creativite.",
                        "Ne pas corriger apres le scan : un rapport de vulnerabilites qui reste dans un tiroir ne protege personne."
                    ],
                    box: 'warn', boxText: "Erreur frequente : croire qu'un scan vierge = systeme securise. Le scan ne detecte que les failles CONNUES. Un zero-day, une mauvaise pratique organisationnelle ou une ingenierie sociale ne sont pas detectes par un scan." }
                ],
                exercices: [
                    { enonce: "Un scan révèle une faille critique sur le serveur web exposé à Internet et vingt failles mineures internes. Ordre de traitement et justification ?", correction: "1) Le serveur exposé d'abord : c'est la surface publiquement attaquable, son risque d'exploitation est le plus immédiat ; correction en urgence (fenêtre courte annoncée si service impacté). 2) Les failles internes : classement par criticité réelle (systèmes à privilèges, annuaire, serveurs exposés internes), puis plans de correction en fenêtres planifiées (AIS CP1). 3) Re-scan de confirmation et documentation. Le nombre (20 vs 1) ne décide pas : la criticité de l'exposition oui." },
                    { enonce: "Un prestataire vous propose un « pentest surprise de votre réseau, sans prévenir, pour être plus réaliste ». Réagissez.", correction: "Un test d'intrusion sans mandat écrit et sans fenêtre connue de l'équipe interne est une prise de risque : les équipes de garde peuvent déclencher des mesures d'urgence contre un « attaquant » réel, un service peut tomber sans personne en capacité de reconnaître le test. On exige : mandat écrit (périmètre, méthodes, dates, contacts), fenêtre annoncée aux personnes qui doivent le savoir (pas à tous les utilisateurs), et procédure d'arrêt d'urgence partagée. La surprise est un argument de marketing, pas de méthode." }
                ],
                resume: "Mesurer la sécurité, c'est inventorier, qualifier correctement (vulnérabilité, menace, risque), scanner à l'aide des bases publiques (CVE/NVD), corriger en priorisant l'exposition, suivre des indicateurs dans le temps — et se faire tester avec mandat écrit. Le tout est un cycle, pas un anniversaire annuel.",
                suite: "AIS CP9 — Politique de sécurité : donner un cadre d'équipe à ces pratiques.",
            },
            {
                id: 'ais-cp9', parcours: 'AIS', code: 'CP9',
                title: 'Politique de sécurité',
                niveau: 'Intermédiaire',
                prerequis: "L'AIS CP1 (bonnes pratiques) : la politique formalise et généralise ces pratiques à toute l'organisation.",
                objectifs: [
                    "Expliquer le rôle d'une politique de sécurité (PSSI) et de repères comme ISO/IEC 27001",
                    "Rédiger des règles utilisateur claires (charte informatique, mots de passe)",
                    "Situer le RGPD pour les données personnelles",
                    "Mettre en œuvre la sensibilisation continue des utilisateurs"
                ],
                lessons: [
                    { title: "Leçon 1 — Cadrer par la politique", parts: [
                        { h: "La PSSI, la loi du jeu", schema: 'cyber-defense-v2', imgCaption: 'Schéma de défense en profondeur : couches de sécurité concentriques, de la périphérie aux données.', t: "La PSSI (politique de sécurité des systèmes d'information) énonce les règles, les responsabilités et les engagements de l'organisation en matière de sécurité. Courte et signée par la direction, elle décline en règles par domaine (accès, postes, réseaux, données). Sans engagement de la direction, une PSSI est un texte d'étagère." },
                        { h: "Le repère ISO/IEC 27001", t: "ISO/IEC 27001 est le standard international du management de la sécurité de l'information (SMSI) ; il est certifiable — une organisation peut faire auditer et certifier son SMSI. Beaucoup d'entreprises s'en inspirent sans chercher la certification : la structure est déjà valable." },
                        { h: "La déclinaison en procédures", t: "La PSSI dit le « pourquoi et le quoi » ; les procédures disent le « comment pas à pas » (ouvrir un accès, traiter un incident...). Une politique sans procédures ne s'applique pas ; des procédures sans politique n'ont pas de cap." }
                    ]},
                    { title: "Leçon 2 — Des règles claires pour les utilisateurs", parts: [
                        { h: "La charte informatique", t: "Document remis et signé à l'arrivée : usage du matériel (propre à l'entreprise), mots de passe, transport des données, usage d'Internet, ce qui est interdit. Court, lisible, sans jargon juridique : une charte que personne ne lit ne protège personne." },
                        { h: "Les mots de passe sans gymnastique", t: "Les recommandations modernes (largement partagées, dont le NIST) privilégient la longueur et l'unicité : une phrase de passe longue et mémorisable, un gestionnaire de mots de passe pour le reste, et la MFA (AIS CP1) dès que possible — bien plus efficace que l'obligation de caractères spéciaux à 8 caractères se renouvelant chaque mois." },
                        { h: "Les données personnelles (RGPD)", t: "Le RGPD est le règlement européen sur la protection des données personnelles : finalité déclarée, minimisation (ne collecter que le nécessaire), information des personnes, durées de conservation définies. Le technicien y contribue concrètement : qui a accès, où sont stockées les données, comment les supprimer à la fin de la conservation." }
                    ]},
                    { title: "Leçon 3 — Faire vivre la politique", parts: [
                        { h: "Sensibiliser plutôt que publier", t: "Un document affiché ne change pas un comportement. La sensibilisation continue passe par des formats courts et réels : mails d'information, sessions courtes, exercices anti-hameçonnage (phishing simulé) avec pédagogie non punitive. L'objectif est l'habitude, pas la culpabilité." },
                        { h: "Mesurer l'application", t: "La politique se suit comme un projet : taux de signature de la charte, taux de clic aux exercices anti-hameçonnage, comptes conformes aux règles de mots de passe... Ces indicateurs nourrissent les revues périodiques (AIS CP1)." },
                        { h: "Revoir périodiquement", t: "La PSSI se relit au moins annuellement et à chaque changement majeur (nouveau service, incident, réorganisation). Une politique qui n'a pas bougé depuis la fin de la dernière décennie protège un SI qui n'existe plus." }
                    ]}
                ],
                guiSteps: [
                    { title: "Definir une politique de securite documentee", action: "Redigez un document qui formalise : les regles d'utilisation du systeme informatique (mot de passe, Internet, USB), les responsabilites (qui administre quoi), les procedures (acces, depart, incident), et les mesures techniques (pare-feu, MFA, chiffrement).", observation: "La politique de securite est le document de reference. Elle doit etre valiee par la direction et communiquee a tous les employes." },
                    { title: "Implementer une politique de mot de passe par GPO", action: "Dans GPMC, editez la Default Domain Policy. Computer Configuration - Policies - Windows Settings - Security Settings - Account Policies - Password Policy. Configurez : longueur minimale 12, complexite active, historique 24, duree maximale 90 jours.", observation: "La politique s'applique a tous les comptes du domaine. Les utilisateurs sont forces a utiliser des mots de passe conformes." },
                    { title: "Restreindre l'acces USB par GPO", action: "Dans une GPO dediee, naviguez vers Computer Configuration - Administrative Templates - System - Removable Storage Access. Activez 'Removable Disks: Deny read access' et 'Deny write access'. Liez la GPO a l'OU cible.", observation: "Les cles USB sont bloquees sur les postes cibles. L'utilisateur recoit un message d'acces refuse." }
                ],
                deepDive: [
                    { t: "La politique de securite en 3 couches", p: [
                        "1. Politique generale (direction) : principes, responsabilites, sanctions. 2. Politiques specifiques (DSI) : mot de passe, acces distant, BYOD, sauvegarde. 3. Procedures operationnelles (techniciens) : comment faire concretement.",
                        "Chaque couche doit etre coherente avec les autres. La politique generale dit QUOI, les procedures disent COMMENT."
                    ],
                    box: 'remember', boxText: "A retenir : la securite n'est pas qu'une affaire de technique. Une politique de securite documentee et communiquee est aussi importante que le pare-feu. La conformite RGPD exige une politique documentee." },
                    { t: "Erreurs frequentes en politique de securite", p: [
                        "Ecrire une politique de 200 pages que personne ne lit : faites court, clair et actionnable.",
                        "Appliquer la meme politique a tout le monde : un developpeur, un commercial et un comptable n'ont pas les memes besoins.",
                        "Ne jamais mettre a jour : la politique doit evoluer avec les menaces et les changements d'organisation."
                    ],
                    box: 'warn', boxText: "Erreur frequente : une politique de securite qui n'est pas appliquee (ou pas verifiable) est pire que pas de politique du tout, car elle cree un faux sentiment de securite." }
                ],
                exercices: [
                    { enonce: "Rédigez cinq règles de charte informatique, formulées pour être comprises par un nouvel embauché non technique.", correction: "Exemple valable : 1) « Votre mot de passe est personnel : ne le partagez jamais, même avec un collègue ou l'équipe informatique. » 2) « Utilisez une phrase de passe longue (au moins 4 mots), unique par service utilisé. » 3) « Ne cliquez pas sur les liens des mails que vous n'attendez pas ; en cas de doute, questionnez l'équipe IT. » 4) « Ni clé USB personnelle, ni installation de logiciels sans accord. » 5) « Ne stockez jamais les données du client sur un support personnel ou un cloud personnel. » Forme attendue : phrases simples, aucune menace, un réflexe par règle." },
                    { enonce: "Un collègue vous demande de sauvegarder sur son poste les CV de 200 candidats « au cas où ». Y a-t-il un sujet RGPD et quoi faire ?", correction: "Oui : les CV sont des données personnelles (parcours professionnel identifiant une personne). Le RGPD demande une finalité et une durée de conservation définie : « au cas où » n'en est pas une. Réponse attendue : vérifier où ces CV sont censés être conservés (processus de recrutement), définir la durée (souvent au-delà d'un concours), et ne pas dupliquer sans finalité. C'est un bon exemple du rôle du technicien : ne pas jouer aux archives, mais alerter dès qu'une copie non encadrée circule." }
                ],
                resume: "La PSSI fixe le cap avec l'engagement de la direction (repère : ISO/IEC 27001 pour le SMSI), les règles utilisateur se rédigent claires et courtes (charte, mots de passe longs, RGPD appliqué aux données personnelles), et la sensibilisation continue est ce qui fait vivre le papier chaque jour.",
                suite: "AIS CP10 — Incidents de sécurité : ce que fait une équipe le jour où, malgré tout, une règle est contournée.",
            },
            {
                id: 'ais-cp10', parcours: 'AIS', code: 'CP10',
                title: 'Incidents de sécurité',
                niveau: 'Avancé',
                prerequis: "Les AIS CP1 à CP9, notamment CP8 (vulnérabilités) et le CP1 (traces, journaux) — ce CP met tout en action sous pression.",
                objectifs: [
                    "Détecter et qualifier un incident de sécurité (gravité, surface touchée)",
                    "Connaître les premières actions chronométrées (isoler, préserver, alerter)",
                    "Conduire la remédiation et analyser l'incident après coup (REX)"
                ],
                lessons: [
                    { title: "Leçon 1 — Détecter et qualifier", parts: [
                        { h: "Par où l'incident arrive", t: "Sources typiques d'alertes : antivirus/EDR, alertes de supervision inhabituelles (trafic anormal, authentifications bizarres), signalement utilisateur (« ce mail est bizarre »). En pratique, la qualité de la détection vient directement de la supervision (AIS CP7) et des journaux centralisés (AIS CP1)." , schema: 'gestion-incidents' },
                        { h: "Qualifier avant d'agir", t: "Un incident de sécurité est un évènement qui compromet ou menace l'intégrité, la confidentialité ou la disponibilité du système d'information. On qualifie rapidement : quel équipement, quelle ampleur (un poste ? un serveur ? le domaine ?), quelle nature (vol de compte, malware, rançongiciel ?). La qualification décide de la réponse." },
                        { h: "L'équipe et la chaîne de décision", t: "Chaque organisation devrait connaître à l'avance : qui décide (DSI, direction selon la gravité), qui exécute, qui communique (en interne, vers les utilisateurs, les clients...), et quelles coordonnées d'urgence reconnues. En France, le CERT-FR (centre gouvernemental de veille, d'alerte et de réponse aux attaques informatiques) est un référent pour les alertes et conseils de sécurité." }
                    ]},
                    { title: "Leçon 2 — La première réponse, sans aggraver", parts: [
                        { h: "Isoler, pas d'extinction réflexe", t: "Premier geste : déconnecter du réseau l'équipement touché (débrancher le câble, couper le Wi-Fi). L'extinction immédiate est débatable : la mémoire vive et les journaux encore en mémoire peuvent porter des indices de compréhension ; l'isolation réseau stoppe la propagation sans détruire les traces." },
                        { h: "Préserver et horodater", t: "Chaque action est horodatée et consignée dans un journal de gestion d'incident (heure, action, auteur). On ne nettoie pas « pour remettre vite » — on effacerait ses propres indices. Copies des journaux pertinents prises avant toute modification, dans la mesure du possible et de la compétence de l'équipe." },
                        { h: "Communiquer sans décider à la place de", t: "Informer le décideur avec les faits plutôt que les suppositions (ce qui est avéré, ce qui est en investigation). La communication externe (clients, autorités) est l'affaire du décideur, pas du technicien de garde — sauf obligation réglementaire précise connue de l'organisation." }
                    ]},
                    { title: "Leçon 3 — Enrayer, rétablir, apprendre", parts: [
                        { h: "La remédiation guidée", t: "Nettoyage selon le vecteur (quarantaine, réinstallation propre), mises à jour urgentes, réactivation contrôlée dès vérification de l'assainissement. On remet en service progressivement : d'abord les utilisateurs critiques, puis les autres, tout en surveillant (AIS CP7) de près." },
                        { h: "Restaurer intelligent", t: "Avec un rançongiciel, on restaure depuis les sauvegardes (TSSR CP8) après s'être assuré que la faille d'entrée est fermée, sinon le rançongiciel revient sur des données fraîchement restaurées. La restauration suit l'ordre des services critiques défini à l'avance (plan de continuité)." },
                        { h: "Le REX sans blâme", t: "Analyse après-coup : comment est-on entré, combien de temps l'incident a-t-il vécu sans être détecté, quels contrôles ont marché ou pas ? Trois questions valent mieux qu'un rapport décoratif. Les actions en sortent : durcir, former, surveiller (bouclage avec AIS CP8 et CP9)." }
                    ]}
                ],
                guiSteps: [
                    { title: "Detecter et repondre a un incident de securite", action: "Un incident de securite suit un cycle defini : detection (SIEM, alerte, signalement utilisateur), qualification (est-ce une vraie attaque ?), confinement (isoler le poste, bloquer le compte), eradication (supprimer le malware, corriger la faille), recuperation (restaurer les donnees), retour d'experience.", observation: "Chaque etape est documentee dans le ticket ou le rapport d'incident. La chaine de traitement est tracable de bout en bout." },
                    { title: "Reagir a une suspicion de ransomware", action: "1. ISOLER immediatement le poste affecte (debrancher le reseau ou desactiver la carte via ncpa.cpl). 2. NE PAS redemarrer (le ransomware peut se reactiver). 3. Identifier la souche (fichier note.txt, extension des fichiers chiffres). 4. Verifier l'etendue (d'autres postes touches ?). 5. Restaurer depuis les sauvegardes (hors ligne). 6. Identifier la porte d'entree (email, RDP, faille non patchee).", observation: "La reaction aux ransomwares suit un protocole precis. L'isolation du poste est la PREMIERE action : elle empeche la propagation." }
                ],
                deepDive: [
                    { t: "Le cycle de reponse a incident (NIST)", p: [
                        "1. Preparation (playbooks, outils, formation). 2. Detection et analyse (SIEM, alertes, signalements). 3. Confinement (isoler, bloquer). 4. Eradication (supprimer la menace). 5. Recuperation (restaurer, verifier). 6. Retour d'experience (ameliorer le processus).",
                        "Chaque phase a des actions concretes et des responsables definis dans le playbook d'incident."
                    ],
                    box: 'remember', boxText: "A retenir : incident = evenement non planifie qui affecte la securite. Le cycle NIST est : Preparation, Detection, Confinement, Eradication, Recuperation, Retour d'experience. L'isolation du poste affecte est TOUJOURS la premiere action." },
                    { t: "Erreurs frequentes en reponse a incident", p: [
                        "Redemarrer le poste compromis : le malware peut se reactiver au demarrage ou effacer ses traces.",
                        "Payer la rancon d'un ransomware : cela encourage les attaquants et ne garantit pas la restauration.",
                        "Ne pas informer la CNIL : en cas de violation de donnees personnelles, la RGPD impose une notification sous 72 heures."
                    ],
                    box: 'warn', boxText: "Erreur frequente : traiter l'incident sans chercher la porte d'entree. Si vous supprimez le malware sans corriger la faille, l'attaquant revient par la meme porte." }
                ],
                exercices: [
                    { enonce: "Un poste affiche un écran de rançon ; les fichiers réseau deviennent inaccessibles. Écrivez vos cinq premières actions dans l'ordre.", correction: "1) Isoler le poste du réseau (câble/Wi-Fi) sans l'éteindre. 2) Mesurer l'ampleur : autres postes touchés ? serveurs ? vérifier les partages réseau. 3) Alerter le décideur et déclencher la procédure d'incident (personne qui décide identifiée). 4) Préserver les traces : horodatage des actions, copies de journaux, capture(s) d'écran — sans « nettoyer » de votre initiative. 5) Étendre l'isolation si d'autres machines sont suspectes, et préparer la restauration depuis les sauvegardes testées une fois la faille d'entrée identifiée et fermée. Le paiement de rançon est une décision de direction, jamais d'un technicien de garde." },
                    { enonce: "Pourquoi isole-t-on une machine compromise sans l'éteindre immédiatement ?", correction: "Parce que des indices se situent en mémoire vive et dans les journaux encore en écriture : une extinction brute efface des informations efface des informations qui peuvent expliquer l'entrée de l'attaque (processus actifs, connexions établies). L'isolation réseau stoppe la propagation, ce qui est l'urgence ; l'analyse peut ensuite se faire avec la machine intacte — quand l'équipe le décide et selon ses compétences (au-delà, on confie à des spécialistes)." }
                ],
                resume: "Face à un incident : qualifier vite (ce qui est touché et où), isoler sans éteindre (préserver les indices), horodater chaque action, alerter la bonne chaîne de décision, remettre en service progressivement, et toujours conduire un REX sans blâme qui transforme l'incident en renforcement durable.",
                suite: "Vous avez terminé les 10 CP du parcours AIS. Bravo ! Revenez aux fiches CCNA pour préparer la certification.",
            }
        ];
