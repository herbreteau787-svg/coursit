export const TSSR_COURSES = [
            {
                id: 'tssr-cp1', parcours: 'TSSR', code: 'CP1',
                title: 'Support utilisateur en centre de services',
                niveau: 'Débutant',
                prerequis: "Aucun : ce CP est le point d'entrée du parcours TSSR.",
                objectifs: [
                    "Distinguer un incident d'une demande de service",
                    "Rédiger un ticket clair et exploitable (qui, quoi, quand, urgence, impact)",
                    "Prioriser des demandes avec une matrice impact × urgence",
                    "Expliquer les niveaux d'escalade et le rôle de la base de connaissances"
                ],
                lessons: [
                    { title: "Leçon 1 — Le rôle du centre de services", parts: [
                        { h: "Qu'est-ce qu'un centre de services ?", t: "Le centre de services (ou service desk) est le point d'entrée unique entre les utilisateurs et l'équipe informatique. Toute demande y passe : panne, question, nouvelle installation. L'intérêt : rien ne se perd, tout est tracé et mesurable." },
                        { h: "Incident ou demande de service ?", t: "Un incident est un arrêt ou une dégradation d'un service (« je ne peux plus imprimer »). Une demande de service est une action planifiée (« installer un logiciel », « créer un accès »). La distinction compte : un incident appelle une reprise d'activité, une demande passe par un circuit de validation." },
                        { h: "Exemple concret", t: "Un utilisateur ne reçoit plus ses mails : incident. Le même utilisateur demande une boîte mail partagée pour son équipe : demande de service. Même outil (le ticket), mais circuits et priorités différents." }
                    ]},
                    { title: "Leçon 2 — Le cycle de vie d'un ticket", parts: [
                        { h: "Enregistrement", t: "À la prise du ticket, notez : qui appelle, sur quel équipement, depuis quand, le message d'erreur exact, ce qui a déjà été tenté, et l'impact métier (une personne bloquée ? un service entier ?). Sans ces éléments, la qualification sera approximative.", schema: 'support-cycle-v2', imgCaption: 'Management du cycle de vie ITIL — Wikimedia Commons, CC BY-SA 3.0 (HBEL). https://commons.wikimedia.org/wiki/File:Management_du_cycle_de_vie_d%27ITIL.jpg' },
                        { h: "Qualification et priorité", t: "La priorité croise l'impact (combien d'utilisateurs touchés, criticité du service) et l'urgence (délai acceptable). Un atelier entier bloqué passe avant la souris d'un directeur : c'est l'impact sur l'activité qui décide, pas le grade." },
                        { h: "Traitement, escalade et clôture", t: "Le niveau 1 traite les cas courants (câble, mot de passe, compte). En cas d'échec, le ticket passe au niveau 2 (spécialistes) puis au niveau 3 (concepteurs, éditeurs). On clôture seulement après confirmation de l'utilisateur, avec une synthèse courte de la cause et de la solution." }
                    ]},
                    { title: "Leçon 3 — Les outils du technicien", parts: [
                        { h: "L'outil de ticketing", t: "Un outil de ticketing centralise les demandes et l'historique (GLPI, ServiceNow ou Jira Service Management sont parmi les plus répandus). Le ticket est la mémoire du service : bien le remplir aujourd'hui aide un collègue demain." },
                        { h: "La base de connaissances", t: "Chaque problème récurrent devient une fiche pas à pas (réinitialisation de mot de passe, réglage d'imprimante). On applique alors une procédure claire, plus vite et de façon homogène." },
                        { h: "Le cadre de référence ITIL", t: "ITIL est un ensemble de bonnes pratiques de gestion des services informatiques, très utilisé dans les entreprises : notions d'incident, de demande, de changement… Ce cours reprend sa logique générale, sans prétendre remplacer la documentation complète." }
                    ]}
                ],
                guiSteps: [
                    { title: "Ouvrir GLPI et creer un ticket", action: "Ouvrez le navigateur, tapez l'URL de votre serveur GLPI (ex : http://srv-glpi/glpi). Connectez-vous avec votre compte technicien. Cliquez sur l'onglet Assistance, puis le bouton + Tickets - Create a ticket.", observation: "Un formulaire s'ouvre : titre, description, categorie, priorite, demandeur. Ce formulaire est le point d'entree de tout incident." },
                    { title: "Remplir un ticket proprement", action: "Titre : resume en 1 ligne (ex : Poste CLIENT-04 - plus d'acces Internet). Description : contexte (qui, quand, quoi), symptomes precis, actions deja essayees. Categorie : Reseau. Priorite : Moyenne. Demandeur : chercher l'utilisateur dans l'annuaire GLPI.", observation: "Le ticket est cree avec un numero unique (ex : #2026-0042). Ce numero est la reference pour toute l'intervention." },
                    { title: "Suivre un ticket de la prise en charge a la resolution", action: "Ouvrez le ticket, changez le statut : Nouveau - En cours (accepte) - En attente - Resolu. Ajoutez un commentaire a chaque action. Quand c'est resolu, cliquez Resolu et remplissez le resume.", observation: "L'utilisateur recoit une notification a chaque changement de statut. Le delai de traitement est trace." },
                    { title: "Exporter l'inventaire et documenter", action: "Dans GLPI, cliquez sur Gestion - Parc - Ordinateurs pour voir l'inventaire. Ajoutez un nouvel equipement si necessaire. Documentez la solution dans la base de connaissances (Accueil - Base de connaissances - Ajouter).", observation: "L'inventaire liste chaque poste avec son OS, son IP, son utilisateur. La base de connaissances est le memoire technique de l'equipe." }
                ],
                deepDive: [
                    { t: "Methodologie - l'escalade par niveaux", p: [
                        "Niveau 1 (centre de services) : accueil, qualification, resolution des incidents simples (mot de passe oublie, peripherique, applications bureautiques).",
                        "Niveau 2 (technicien IT) : incidents techniques plus complexes (reseau, systeme, materiel). Le technicien peut se deplacer ou prendre la main a distance.",
                        "Niveau 3 (expert/fournisseur) : problemes requirent une expertise approfondie ou l'intervention du constructeur."
                    ],
                    cmd: [
                        "# Verifier la disponibilite d'un poste distant (PowerShell Remoting)",
                        "Invoke-Command -ComputerName CLIENT-04 -ScriptBlock { Get-Service Spooler }",
                        "# Prendre la main a distance (RDP)",
                        "mstsc /v:CLIENT-04"
                    ],
                    box: 'remember', boxText: "A retenir : un ticket = une seule demande. Le delai de premiere reponse compte autant que le delai de resolution. Documenter chaque etape dans le ticket est une obligation professionnelle, pas une option." },
                    { t: "Erreurs frequentes en centre de services", p: [
                        "Ne pas qualifier le ticket : un ticket sans description precise devient impossible a reprendre par un autre technicien.",
                        "Oublier de changer le statut : l'utilisateur ne sait pas si son probleme est pris en compte.",
                        "Fermer sans verifier : tester la solution AVEC l'utilisateur avant de resoudre le ticket."
                    ],
                    box: 'warn', boxText: "Erreur frequente : repondre par email hors du ticket. L'historique se perd. Toute communication doit passer par le systeme de ticketing pour garder la tracabilite." },
                    { t: "Cas d'entreprise - le lundi matin qui part en vrille", p: [
                        "Situation : 15 appels entre 8h30 et 9h30, tous pour le meme probleme (imprimante reseau injoignable). Le centre de services est sature.",
                        "Bonne pratique : qualifier rapidement (meme symptome ?), creer un ticket Pere et lier les 15 tickets enfants, corriger une seule fois, repondre a tous en meme temps.",
                        "Lecon : quand plusieurs utilisateurs signalent le meme symptome, c'est un probleme d'infrastructure, pas un probleme utilisateur individuel."
                    ],
                    box: 'case', boxText: "Ce cas illustre la difference entre incident individuel et incident de masse. La bonne reponse est de categoriser, consolider et corriger globalement, pas de traiter 15 tickets individuellement." }
                ],
                exercices: [
                    { enonce: "Un utilisateur appelle, très énervé : « rien ne marche, votre informatique est nulle ! ». Listez les informations minimales à collecter avant d'écrire un ticket de qualité.", correction: "Le ticket doit contenir au minimum : identité et localisation de l'utilisateur, équipement concerné, heure de début du problème, description factuelle (« je peux ouvrir Word mais pas Internet »), message d'erreur exact, impact (une personne ? un service entier ?) et actions déjà tentées. Sur l'appel, ramenez l'émotion vers les faits : « je comprends votre agacement, décrivons précisément ce qui ne fonctionne plus ». Si c'est possible, proposez un contournement temporaire (autre poste) en gardant le ticket ouvert." },
                    { enonce: "Hiérarchisez : A) La comptabilité ne peut plus lancer le logiciel de facturation (18 personnes). B) L'écran du directeur a une ligne de pixels morte. C) Un stagiaire n'arrive pas à se connecter en Wi-Fi. Donnez un ordre et justifiez.", correction: "A en premier : beaucoup de personnes bloquées et un service métier critique — impact et urgence élevés. Ensuite C : un seul utilisateur, cause fréquente et contournable (câble réseau, reconnexion Wi-Fi), typiquement traité au niveau 1. Enfin B : gêne réelle mais sans blocage métier, priorité faible. L'ordre suit l'impact sur l'activité, pas le grade des personnes." }
                ],
                resume: "Le centre de services transforme un appel stressant en un ticket exploitable : qualifier (incident ou demande), prioriser (impact × urgence), traiter ou escalader, puis clôturer avec l'accord de l'utilisateur. La base de connaissances fait gagner du temps à toute l'équipe.",
                suite: "CP2 — Windows et Active Directory : vous passerez du ticket à l'action sur les comptes.",
            },
            {
                id: 'tssr-cp2', parcours: 'TSSR', code: 'CP2',
                title: 'Windows et Active Directory',
                niveau: 'Débutant',
                prerequis: "Le CP1 suffit. Une machine Windows de test est un plus pour suivre les manipulations des exemples.",
                objectifs: [
                    "Expliquer le rôle d'Active Directory et d'un contrôleur de domaine",
                    "Créer et ranger comptes et groupes dans des unités d'organisation",
                    "Décrire comment une GPO est appliquée (ordre local → site → domaine → OU)",
                    "Utiliser quelques commandes PowerShell de base du module ActiveDirectory"
                ],
                lessons: [
                    { title: "Leçon 1 — Comprendre l'annuaire Active Directory", parts: [
                        { h: "Un annuaire centralisé", t: "Active Directory (AD) est la base de données centralisée de Microsoft qui stocke les comptes utilisateurs, ordinateurs, groupes et leurs droits. Elle est hébergée et mise à jour par un contrôleur de domaine. Analogie : un annuaire téléphonique couplé à un registre des permissions — un seul endroit à mettre à jour." },
                        { h: "Domaine, forêt et unités d'organisation", t: "Le domaine est la frontière d'administration (par exemple entreprise.local). Plusieurs domaines reliés forment une forêt. À l'intérieur, les unités d'organisation (OU) servent de dossiers pour ranger les objets et déléguer l'administration par service ou par site." },
                        { h: "Les groupes de sécurité", t: "Un groupe permet d'attribuer des droits une seule fois à plusieurs comptes. On distingue le groupe de sécurité (porte des droits) du groupe de distribution (recueille des adresses mails). Bonne habitude : jamais de droits accordés compte par compte, toujours via les groupes." }
                    ]},
                    { title: "Leçon 2 — Comptes, mots de passe et authentification", parts: [
                        { h: "Créer un compte proprement", t: "Un compte suit une convention de nommage cohérente (par exemple prenom.nom pour claire.martin), est rangé dans la bonne OU, intègre les bons groupes, et son mot de passe initial est à changer à la première connexion (option standard « l'utilisateur doit changer le mot de passe à la prochaine ouverture de session »)." },
                        { h: "La politique de mots de passe", t: "Longueur minimale, complexité, historique, verrouillage après échecs répétés… Ces réglages font partie des stratégies appliquées par l'annuaire. Les valeurs exactes se règlent selon votre organisation : ce sont des choix de politique internes, pas des constantes universelles." },
                        { h: "Kerberos, le ticket d'entrée", t: "AD authentifie les utilisateurs grâce au protocole Kerberos : après l'ouverture de session, l'utilisateur reçoit des tickets (comme des billets de cinéma) qu'il présente aux services, sans transmettre son mot de passe à chacun d'eux."  , schema: 'kerberos-fr-v2', imgCaption: 'Négociations Kerberos (Wikimedia Commons, CC BY-SA 3.0 — Daniel Sonck) : le client obtient un TGT auprès du KDC puis un ticket de service pour chaque ressource.' }
                    ]},
                    { title: "Leçon 3 — GPO et PowerShell du quotidien", parts: [
                        { h: "Une GPO, c'est quoi ?", t: "Une stratégie de groupe (GPO) est un paquet de réglages appliqué aux ordinateurs et aux utilisateurs : sécurité, lecteurs mappés, fond d'écran… On la « lie » à un site, au domaine ou à une OU, et tous les objets situés dessous en héritent." },
                        { h: "L'ordre d'application (LSDOU)", t: "Les stratégies s'appliquent dans l'ordre : Local, puis Site, puis Domaine, puis OU. La dernière appliquée (la plus spécifique, l'OU) gagne en cas de conflit. Pour forcer l'actualisation : gpupdate /force ; pour vérifier ce qui a été appliqué : gpresult." , schema: 'gpo-lsdou' },
                        { h: "PowerShell pour aller vite", t: "Une fois le module ActiveDirectory installé (via les outils RSAT), Get-ADUser claire.martin lit un compte, New-ADUser le crée, Set-ADUser le modifie. La console graphique reste très bien pour apprendre ; PowerShell démultiplie quand il y a des dizaines de comptes (renvoi au CP6 pour les scripts)." }
                    ]}
                ],
                guiSteps: [
                    { title: "Ouvrir Active Directory Users and Computers (ADUC)", action: "Cliquez sur Demarrer - Outils d'administration Windows - Active Directory Users and Computers. Ou tapez dsa.msc dans la recherche.", observation: "Une fenetre s'ouvre avec un arbre a gauche (lab.lan) et un panneau vide a droite. Si le DC n'est pas promu, l'outil sera absent - terminez d'abord le labo TSSR 01.", mockup: 'mockup-aduc' },
                    { title: "Creer une unite d'organisation (OU)", action: "Clic droit sur lab.lan - New - Organizational Unit. Tapez Compta dans Name, laissez Protect container coche, cliquez OK.", observation: "La nouvelle UO Compta apparait dans l'arborescence sous lab.lan avec une icone de dossier.", mockup: 'mockup-aduc' },
                    { title: "Creer un utilisateur dans l'OU Compta", action: "Clic droit sur Compta - New - User. First Name = Claire, Last Name = Martin, User logon name = claire.martin. Next. Mot de passe : Azerty1*, cochez User must change password at next logon. Next, Finish.", observation: "Le compte claire.martin apparait dans le panneau droit de l'OU Compta avec une icone utilisateur.", mockup: 'mockup-aduc' },
                    { title: "Creer un groupe de securite et ajouter le compte", action: "Clic droit sur Compta - New - Group. Name = GG-Compta, Scope = Global, Type = Security. OK. Double-cliquez sur GG-Compta - Members - Add - claire.martin - Check Names - OK - Apply.", observation: "Le compte claire.martin apparait dans la liste des membres de GG-Compta." },
                    { title: "Verifier en PowerShell (methode 2)", action: "Ouvrez PowerShell en admin et executez les commandes ci-dessous. Comparez avec ce que vous voyez dans ADUC.", observation: "Get-ADUser retourne le compte cree, Get-ADGroupMember liste les membres du groupe - les memes donnees que la console graphique.", cli: [
                        "Import-Module ActiveDirectory",
                        "Get-ADUser claire.martin | Select Name, SamAccountName, Enabled",
                        "Get-ADGroupMember GG-Compta | Select Name, ObjectClass",
                        "Get-ADOrganizationalUnit -Filter {Name -eq 'Compta'} | Select DistinguishedName"
                    ] },
                    { title: "Ouvrir la GPMC et creer une GPO", action: "Demarrer - tapez gpmc.msc - validez. Dans Forest - Domains - lab.lan, clic droit - Create a GPO in this domain, and Link it here... Nommez-la USER-MotDePasse-Politique. OK.", observation: "La GPO apparait liee au domaine lab.lan. C'est un conteneur de reglages, encore vide.", mockup: 'mockup-gpmc' },
                    { title: "Editer la GPO et configurer un parametre", action: "Clic droit sur la GPO - Edit. Computer Configuration - Policies - Windows Settings - Security Settings - Account Policies - Password Policy. Double-cliquez Minimum password length, tapez 12, OK. Fermez.", observation: "Le parametre est enregistre dans la GPO. Sur les postes cibles, il s'appliquera apres gpupdate /force." },
                    { title: "Verifier l'application avec gpresult", action: "Sur un poste client, tapez : gpupdate /force puis gpresult /R. Cherchez USER-MotDePasse-Politique dans les Applied Group Policy Objects.", observation: "gpresult /R liste les GPO appliquees. Si la GPO est absente, verifiez le lien, le Security Filtering et l'OU du poste.", cli: [
                        "gpupdate /force",
                        "gpresult /R | findstr /i MotDePasse"
                    ] }
                ],
                deepDive: [
                    { t: "Architecture AD complète — ce que le formateur explique au tableau", p: [
                        "Active Directory s'organise en hiérarchie : une FORÊT (le cadre global) contient un ou plusieurs DOMAINES (la frontière d'administration). Chaque domaine contient des UO (l'outil de rangement) qui hébergent les objets : utilisateurs, ordinateurs, groupes, imprimantes.",
                        "Les 4 conteneurs par défaut (Built-in, Computers, System, Users) sont créés automatiquement à la promotion du DC. Ils ne doivent JAMAIS être utilisés pour l'organisation : pas de liaison GPO directe sur les conteneurs, pas de délégation granulaire.",
                        "Les UO sont des « dossiers virtuels » : elles permettent de classer logiquement (par service, par site, par type), de déléguer l'administration (un technicien helpdesk ne peut gérer que l'OU Helpdesk) et de lier des GPO ciblées. Un objet ne peut être que dans UNE seule UO à la fois."
                    ],
                    box: 'admin', boxText: "Conseil d'administrateur : créez votre structure d'UO DÈS LE DÉBUT, même simple. Exemple : OU_Services (avec des sous-UO par service), OU_Ordinateurs (Postes, Serveurs), OU_Groupes. Une structure bien pensée dans les 5 premières minutes évite des mois de réorganisation plus tard." },
                    { t: "AGDLP — la méthode Microsoft, expliquée pas à pas", p: [
                        "AGDLP est une méthode d'organisation des groupes qui garantit un contrôle d'accès clair et évolutif.",
                        "A (Accounts) : les utilisateurs sont placés dans des groupes GLOBAUX (GG). Un GG regroupe des comptes du MÊME domaine (ex : GG_Comptabilite).",
                        "G (Groupes Globaux) : les GG sont ajoutés aux groupes de DOMAINE LOCAL (DL). Un DL sert à ACCORDER des droits sur une RESSOURCE du domaine (ex : DL_Compta_Share_L).",
                        "D (Domaine Local) : les DL sont utilisés pour les permissions NTFS et les autorisations de partage. Un DL peut contenir des GG et des comptes.",
                        "P (Permissions) : les permissions sont appliquées aux DL sur les ressources (NTFS, partage, imprimante). JAMAIS directement sur les comptes."
                    ],
                    cmd: [
                        "# Créer la chaîne AGDLP complète en PowerShell",
                        "# 1. Créer le groupe global",
                        "New-ADGroup -Name 'GG_Comptabilite' -GroupScope Global -GroupCategory Security",
                        "# 2. Créer le groupe de domaine local",
                        "New-ADGroup -Name 'DL_Compta_Share_L' -GroupScope DomainLocal -GroupCategory Security",
                        "# 3. Ajouter le GG dans le DL",
                        "Add-ADGroupMember -Identity 'DL_Compta_Share_L' -Members 'GG_Comptabilite'",
                        "# 4. Ajouter l'utilisateur dans le GG",
                        "Add-ADGroupMember -Identity 'GG_Comptabilite' -Members claire.martin",
                        "# 5. Appliquer les permissions NTFS sur la ressource",
                        "icacls 'D:\\Ressources\\Compta' /grant 'LAB\\DL_Compta_Share_L:(OI)(CI)M'"
                    ],
                    box: 'remember', boxText: "À retenir : AGDLP = Accounts → Global → Domain Local → Permissions. Comptes dans GG, GG dans DL, DL porte les droits sur la ressource. Pourquoi ? Pour changer les droits d'un service en modifiant UN SEUL groupe, sans toucher aux permissions NTFS." },
                    { t: "Kerberos, LDAP, FSMO — les protocoles et rôles AD", p: [
                        "KERBEROS est le protocole d'authentification : l'utilisateur s'authentifie une fois auprès du DC, reçoit un TGT (Ticket Granting Ticket), puis présente ce TGT à chaque service. Le mot de passe ne circule JAMAIS sur le réseau.",
                        "LDAP est le protocole d'accès à l'annuaire : les applications interrogent AD pour lire/écrire les objets (ex : un CRM qui cherche le nom d'un client dans l'annuaire).",
                        "FSMO sont les 5 rôles qui garantissent la cohérence AD : le PDC Emulator (synchronisation horaire, gestion des mots de passe), le RID Master (attribue les identifiants), le Master d'infrastructure (réplique les références croisées), le Master de nommage (gère les domaines de la forêt), le Master de schéma (définit les objets possibles)."
                    ],
                    box: 'admin', boxText: "Conseil d'administrateur : les 5 rôles FSMO sont par défaut sur le premier DC. Bonne pratique : les ventiler entre plusieurs DC et VÉRIFIER avec netdom query fsmo ou Get-ADDomain | Select InfrastructureMaster, RidMaster, PdcEmulator." },
                    { t: "CAS D'ENTREPRISE — migration d'un AD mal structuré", p: [
                        "Situation : une PME a installé AD il y a 5 ans sans structurer les UO. Tous les utilisateurs sont dans le conteneur Users par défaut, les postes dans Computers. Aucune GPO ciblée n'est possible.",
                        "Démarche : 1) Créer la structure d'UO cible (par service). 2) Créer les groupes GG/DL selon AGDLP. 3) Migrer les objets avec MOVER ou Get-ADUser | Move-ADObject. 4) Lier les GPO aux nouvelles UO. 5) Tester gpresult /R sur des postes pilotes.",
                        "Leçon : la réorganisation d'AD est un APRÈS-VENTE. Il faut documenter, planifier, tester et communiquer. Un objet déplacé hérite PAREILLEMENT des GPO de sa nouvelle UO."
                    ],
                    box: 'case', boxText: "Ce cas illustre la dette technique créée par un AD mal structuré : les conteneurs par défaut, l'absence de GPO ciblée, l'impossibilité de déléguer. La sortie de crise exige un projet structuré avec planification et tests." }
                ],
                exercices: [
                    { enonce: "Une nouvelle collaboratrice, Claire Martin, rejoint le service Compta. Décrivez les étapes de son intégration côté Active Directory.", correction: "1) Identifier (ou créer) l'OU Compta. 2) Créer le compte claire.martin dans cette OU avec mot de passe à changer à la première connexion. 3) L'ajouter aux groupes de son service et au groupe de base des utilisateurs. 4) Vérifier le compte (affichage de la console ou Get-ADUser claire.martin). 5) Remettre les identifiants et la charte informatique à la collaboratrice. La logique : ranger, nommer, grouper, puis vérifier." },
                    { enonce: "Au niveau du domaine, une GPO interdit les clés USB. Sur l'OU « Postes_Atelier », une GPO les autorise. Un poste de cette OU peut-il utiliser une clé USB ?", correction: "Oui, en principe : la GPO de l'OU est plus spécifique et appliquée en dernier (ordre LSDOU), donc en cas de conflit elle l'emporte sur celle du domaine. Limites à vérifier : blocage de l'héritage sur l'OU, GPO de domaine marquée « forcer » ou réglages différents sur l'ordinateur et l'utilisateur. En pratique on teste : gpupdate /force puis gpresult pour voir ce qui a réellement été appliqué." }
                ],
                resume: "Active Directory centralise comptes et droits ; les OU rangent, les groupes délèguent les droits, les GPO uniformisent la configuration selon l'ordre Local → Site → Domaine → OU. Le module PowerShell (RSAT) fait gagner beaucoup de temps dès qu'on gère plus d'une poignée de comptes.",
                suite: "CP3 — Serveurs Linux : le même métier, un autre système.",
            },
            {
                id: 'tssr-cp3', parcours: 'TSSR', code: 'CP3',
                title: 'Serveurs Linux',
                niveau: 'Débutant',
                prerequis: "Aucun prérequis Linux. Un accès à une machine Linux (VM, VPS ou machine de TP) permet de suivre les exemples pas à pas.",
                objectifs: [
                    "Se repérer dans l'arborescence Linux et utiliser les commandes de base",
                    "Comprendre et modifier les droits (rwx) sur fichiers et dossiers",
                    "Installer des paquets et gérer un service avec systemctl",
                    "Se connecter à distance avec SSH et lire les journaux"
                ],
                lessons: [
                    { title: "Leçon 1 — Se repérer dans Linux", parts: [
                        { h: "Le shell, votre poste de pilotage", t: "Le shell est le programme qui exécute les commandes tapées au clavier. Sur un serveur Linux, tout peut se faire en ligne de commande : c'est l'outil normal du métier, pas un auxiliaire compliqué. Tapez, corrigez, relisez : la précision vient avec la pratique." , schema: 'linux-architecture' },
                        { h: "L'arborescence standard", t: "Tout part de la racine / : /etc regroupe les fichiers de configuration, /var les données variables (dont /var/log pour les journaux), /home les dossiers personnels, /usr les programmes installés. On se déplace avec cd, on liste avec ls, on lit avec less ou cat, et man commande donne le manuel de la commande." },
                        { h: "Exemple concret", t: "Pour lire le journal système sur une Debian/Ubuntu : less /var/log/syslog. Pour comprendre les droits : man chmod. Prendre l'habitude de consulter le manuel est le réflexe le plus rentable de l'administrateur débutant." }
                    ]},
                    { title: "Leçon 2 — Utilisateurs, droits et paquets", parts: [
                        { h: "root, sudo et comptes", t: "Le compte root est tout-puissant. La pratique standard : travailler avec votre compte personnel et préfixer ponctuellement avec sudo commande. On limite ainsi les commandes destructives et on garde la trace de qui a fait quoi." },
                        { h: "Les droits rwx", t: "Chaque fichier porte des droits pour le propriétaire, le groupe et les autres : r lire (4), w écrire (2), x exécuter (1), que l'on additionne. Exemples courants : 755 (propriétaire tout, groupe et autres lecture+exécution — typique pour les scripts et dossiers publics), 640 (propriétaire lecture+écriture, groupe lecture, rien pour les autres — typique pour des données sensibles). chmod change les droits, chown change le propriétaire ou le groupe." },
                        { h: "Installer des logiciels", t: "Chaque famille de distribution a un gestionnaire de paquets : apt côté Debian/Ubuntu, dnf côté Fedora/RHEL et dérivées. Squelette habituel : apt update (rafraîchir la liste des paquets) puis apt install openssh-server (installer). Le gestionnaire gère aussi les dépendances — d'où l'intérêt de passer par lui plutôt que d'installer à la main." }
                    ]},
                    { title: "Leçon 3 — Services, SSH et journaux", parts: [
                        { h: "Gérer un service", t: "systemctl status ssh vérifie l'état, systemctl start ssh le démarre, systemctl enable ssh active le démarrage automatique au redémarrage. Selon la distribution, le service SSH s'appelle ssh ou sshd : si une commande ne répond pas, demandez à votre système la bonne écriture." },
                        { h: "Se connecter à distance avec SSH", t: "ssh alice@10.0.0.5 ouvre une session chiffrée sur le serveur. Au-delà du mot de passe, l'usage professionnel repose sur une paire de clés : la clé publique est posée sur le serveur, la clé privée reste sur votre machine, gardée secrète. Plus pratique à l'usage et plus solide face aux tentatives d'attaque par mot de passe." },
                        { h: "Lire les journaux", t: "journalctl -u ssh affiche les messages du service SSH (ajoutez -f pour suivre en direct) ; les applications écrivent très souvent dans /var/log. Les journaux sont le premier réflexe du diagnostic : ils disent ce qui s'est réellement passé, quand et pourquoi." }
                    ]}
                ],
                guiSteps: [
                    { title: "Ouvrir un terminal Linux et se reperer", action: "Connectez-vous en SSH (ou ouvrez un terminal sur votre VM). Le prompt admin@SRV-LNX01:~$ indique votre identite et votre emplacement.", observation: "Le prompt vert confirme votre compte (admin) et le serveur (SRV-LNX01). Le tilde (~) = votre dossier personnel /home/admin.", mockup: 'mockup-linux-terminal' },
                    { title: "Explorer l'arborescence", action: "Tapez les commandes ci-dessous pour vous deplacer et lire le contenu des repertoires systeme. Chaque commande a un role precis : pwd indique ou vous etes, ls liste le contenu, cd se deplace.", observation: "/etc contient les fichiers de configuration, /var les donnees variables (journaux), /home les dossiers utilisateurs.", cli: [
                        "pwd",
                        "ls -la /etc/ | head -n 10",
                        "ls /var/log/",
                        "cd /home/admin && pwd"
                    ] },
                    { title: "Verifier l'etat du systeme", action: "Tapez ces commandes pour evaluer le disque, la memoire et les services. C'est le premier reflexe de tout administrateur Linux.", observation: "df -h montre l'espace disque par partition. systemctl --failed liste les services en echec (idealement : 0).", cli: [
                        "df -h | grep -v tmpfs",
                        "free -h",
                        "systemctl --failed"
                    ], mockup: 'mockup-linux-terminal' },
                    { title: "Gerer un service avec systemctl", action: "Installez et demarrez le serveur SSH. Chaque sous-commande a un role : status = etat, enable = au demarrage, start = maintenant.", observation: "systemctl status ssh affiche active (running) en vert si le service tourne correctement.", cli: [
                        "sudo apt update && sudo apt install openssh-server -y",
                        "sudo systemctl enable --now ssh",
                        "sudo systemctl status ssh"
                    ] },
                    { title: "Lire les journaux avec journalctl", action: "journalctl est le journal centralise de systemd. L'option -u filtre par service, -n limite le nombre de lignes, -f suit en temps reel (comme tail -f).", observation: "Les messages du service SSH apparaissent, avec date, heure, niveau de gravite.", cli: [
                        "journalctl -u ssh -n 10 --no-pager",
                        "journalctl --since today --no-pager | tail -n 15"
                    ] },
                    { title: "Verifier les ports en ecoute", action: "ss -tulpn liste les ports ouverts par les services. C'est le premier outil d'audit reseau sous Linux : t=tcp, u=udp, l=listen, p=process, n=numeric.", observation: "ssh ecoute sur le port 22, postgresql sur 5432, etc. Si un port attendu est absent, le service correspondant ne tourne pas.", cli: [
                        "ss -tulpn"
                    ] },
                    { title: "Creer un fichier et modifier les droits", action: "Creer un script et lui donner les droits d'execution (chmod +x). La commande ls -l affiche les droits sous forme rwxrwxrwx.", observation: "ls -l script.sh montre -rwxr--r-- (755) apres chmod 755. Le x indique que le fichier est executable.", cli: [
                        "echo '#!/bin/bash' > script.sh",
                        "echo 'echo Bonjour' >> script.sh",
                        "chmod 755 script.sh",
                        "ls -l script.sh && ./script.sh"
                    ] }
                ],
                deepDive: [
                    { t: "Méthodologie terrain — prendre la main sur un serveur et diagnostiquer", p: [
                        "Sur un serveur Linux de production, l'administrateur travaille presque toujours en SSH. Les trois premières commandes d'une session de diagnostic sont toujours les mêmes : qui suis-je / où suis-je / quel est l'état du système.",
                        "La logique est la même que côté Windows : état → journaux → configuration → relance. On ne redémarre JAMAIS un service avant d'avoir lu le dernier message d'erreur du journal."
                    ],
                    cmd: [
                        "# Carte d'identité de la session",
                        "whoami && hostname && uname -a",
                        "# Espace disque : première cause de panne de service",
                        "df -h | grep -v tmpfs",
                        "# État des services et ports en écoute",
                        "systemctl --failed",
                        "ss -tulpn | head -n 15",
                        "# Journal du service SSH (exemple)",
                        "journalctl -u ssh -n 20 --no-pager"
                    ],
                    box: 'admin', boxText: "Conseil d'administrateur : surveillez d'abord le disque (df -h). Un /var/log plein empêche les services d'écrire leurs journaux, bloque les bases de données et fait échouer les mises à jour — et le diagnostic devient impossible. Mettez en place logrotate dès l'installation du serveur." },
                    { t: "Erreurs fréquentes côté Linux", p: [
                        "Éditer un fichier de configuration avec les droits root et commettre une faute de frappe : le service ne redémarre plus. Réflexe : cp fichier fichier.bak avant modification, et test de syntaxe quand il existe (sshd -t, nginx -t, named-checkconf).",
                        "Chmod 777 « pour que ça marche » : le fichier devient modifiable par tous. Sur un dossier de script exposé, c'est une faille. La bonne réponse est de poser les droits sur le groupe propriétaire (chgrp + chmod g+rwx).",
                        "Utiliser kill -9 en premier : il empêche le service de fermer proprement ses fichiers et ses connexions. Toujours kill -15 (SIGTERM) d'abord, kill -9 seulement si le processus ignore le SIGTERM."
                    ],
                    box: 'warn', boxText: "Erreur fréquente : modifier /etc/fstab sans tester. Une erreur de syntaxe empêche le démarrage. Réflexe : mount -a pour valider sans redémarrer, et vérifier que mount | grep le point de montage avant de redémarrer la machine." },
                    { t: "Cas d'entreprise — le serveur de fichiers saturé un vendredi soir", p: [
                        "Situation : les utilisateurs signalent des copies de fichiers qui échouent. df -h révèle /srv/partage à 100 %. Personne ne sait ce qui a grossi.",
                        "Résolution : du -h --max-depth=1 /srv/partage | sort -h localise le répertoire « SAV » : 400 Go de copies de sauvegarde oubliées par un script de test. Suppression des copies anciennes, extension temporaire via LVM (lvextend + resize2fs), puis mise en place d'un quota et d'une alerte Zabbix à 85 %.",
                        "Leçon : une alerte disque à 85 % évite la panne à 100 %. Le ticket du vendredi soir coûte 3 heures ; l'alerte proactive coûte 10 minutes de configuration."
                    ],
                    box: 'case', boxText: "Ce cas illustre la chaîne complète : diagnostic (du), correction immédiate (suppression + extension LVM), prévention (quota + supervision). C'est exactement la triade diagnostic → correction → prévention attendue en entreprise." },
                    { t: "Pour l'examen — réflexes du correcteur", p: [
                        "Savoir décoder 755 et 640 sans calculatrice (r=4, w=2, x=1) et choisir chmod ou chown selon la demande.",
                        "Citer la différence apt/dnf et la logique update (rafraîchir les listes) → upgrade (appliquer).",
                        "Expliquer SSH : clé publique sur le serveur, clé privée sur le client, et pourquoi PasswordAuthentication no durcit le service."
                    ],
                    box: 'remember', boxText: "À retenir : /etc = configuration, /var = données variables, /home = utilisateurs. Droits 755 = scripts/public, 640 = données sensibles, 700 = privé. systemctl status → journalctl -u → config → relance : l'ordre du diagnostic, toujours." }
                ],
                exercices: [
                    { enonce: "Un script doit être exécutable par son propriétaire seul, sans aucun droit pour les autres. Quels droits posez-vous et avec quelle commande ?", correction: "Droits 700 : lecture + écriture + exécution pour le propriétaire, rien pour le groupe ni les autres (7 = r+w+x, 0 = aucun). Commande : chmod 700 script.sh. Vérification : ls -l doit afficher -rwx------. On aurait pu écrire chmod u+rwx,go-rwx script.sh, même résultat." },
                    { enonce: "Le service SSH ne démarre plus après une mise à jour. Ordonnez votre démarche de diagnostic.", correction: "1) systemctl status ssh : état du service et dernier message d'erreur. 2) journalctl -u ssh : détails historisés des échecs. 3) Vérification de la configuration du serveur SSH - sur OpenSSH, la commande sshd -t, lancée en admin, valide la syntaxe du fichier de configuration sans démarrer le service. 4) systemctl restart ssh pour tester. 5) Si tout échoue, comparer avec la sauvegarde de configuration précédente. L'ordre suit la logique : état → journaux → config → relance." }
                ],
                resume: "Sur Linux, la ligne de commande est l'interface normale d'administration : arborescence standard, droits 755/640, gestionnaire de paquets (apt/dnf), services pilotés par systemctl, connexion à distance par SSH et diagnostic par les journaux (journalctl, /var/log).",
                suite: "CP4 — Réseau IP : ces serveurs ne restent utiles que s'ils communiquent.",
            },
            {
                id: 'tssr-cp4', parcours: 'TSSR', code: 'CP4',
                title: 'Réseau IP',
                niveau: 'Débutant à intermédiaire',
                prerequis: "Aucun. Affinité utile : les fiches CCNA 1.3 (sous-réseaux), 1.6 et 1.7 (diagnostic, DHCP) approfondissent exactement les mêmes notions.",
                objectifs: [
                    "Expliquer la structure d'une adresse IPv4 et le rôle du masque",
                    "Distinguer adresses privées (RFC 1918) et publiques",
                    "Comprendre le rôle de DHCP, DNS et passerelle",
                    "Suivre une méthode de diagnostic ordonnée avec ping, tracert et nslookup"
                ],
                lessons: [
                    { title: "Leçon 1 — L'adresse IP, mode d'emploi", parts: [
                        { h: "Deux parties dans une adresse", t: "Une adresse IPv4 se découpe en partie réseau et partie hôte, séparées par le masque (ex. 192.168.10.70/26). Le calcul pas à pas est déjà traité dans la fiche CCNA 1.3 : ici, retenez l'usage — le masque définit qui peut parler directement à qui." },
                        { h: "Privé ou public", t: "Les blocs privés (RFC 1918) sont 10.0.0.0/8, 172.16.0.0/12 et 192.168.0.0/16 : utilisables librement à l'intérieur mais non routables sur Internet. Sortir vers Internet exige une traduction d'adresses (NAT), traitée au CP7." },
                        { h: "Trois adresses à connaître", t: "L'adresse réseau (tous les bits d'hôte à 0) désigne le bloc, l'adresse de diffusion (tous à 1) parle à tout le bloc, et la passerelle est la porte menant aux autres réseaux. Configurer un poste sans passerelle le confine à son sous-réseau." }
                    ]},
                    { title: "Leçon 2 — Les services qui font marcher le réseau", parts: [
                        { h: "DHCP", t: "Le serveur DHCP distribue automatiquement adresse + masque + passerelle + serveurs DNS. S'il ne répond pas, le poste garde une adresse de repli 169.254.x.x. La séquence d'attribution (Discover, Offer, Request, Acknowledge) est détaillée dans la fiche CCNA 1.7.", schema: 'sequence-dora-dhcp' },
                        { h: "DNS", t: "Le DNS traduit les noms (intranet.exemple.fr) en adresses IP. Symptôme classique : un poste peut joindre une IP mais pas un nom - le réseau va bien, c'est la résolution qui cloche.", schema: 'dns-fr-v2', imgCaption: 'Le DNS « dans le monde réel » (domaine public, Wikimedia Commons — Lion Kimbro) : cache navigateur → résolveur OS → résolveur FAI → recherche récursive. Chaque étage a son cache.' },
                        { h: "Relire une configuration en dix secondes", t: "ipconfig /all (Windows) et ip a (Linux) affichent adresse, masque, passerelle et DNS. Ce réflexe d'affichage précède toute modification : on regarde, puis on conclut." }
                    ]},
                    { title: "Leçon 3 — Équipements et méthode de diagnostic", parts: [
                        { h: "Qui fait quoi", t: "Le switch relie les machines dans un même réseau (couche 2), le routeur relie les réseaux entre eux (couche 3), et le VLAN découpe logiquement un switch (voir la fiche CCNA sur les VLANs et le labo guidé pour la pratique)." },
                        { h: "L'ordre de diagnostic", t: "Lien physique (câble, voyant) → adresse IP (pas de 169.254.x.x) → ping passerelle → ping IP publique → nom. Même escalade couches par couches que la fiche CCNA 1.6 : on ne corrige jamais une couche haute avant d'avoir validé la couche basse." },
                        { h: "Trois outils à la main", t: "ping teste la joignabilité d'une cible, tracert (Windows) ou traceroute (Linux) montre le chemin emprunté, nslookup interroge le DNS. Trois commandes, trois questions : ça va ? par où ? qui traduit le nom ?" }
                    ]}
                ],
                guiSteps: [
                    { title: "Configurer une adresse IP statique sur Windows", action: "Ouvrez Parametres - Reseau - Ethernet - Modifier les options d'adaptateur. Clic droit sur Ethernet - Proprietes - Protocole Internet version 4 (TCP/IPv4) - Proprietes. Cochez Utiliser l'adresse IP suivante et saisissez : IP 192.168.1.10, masque 255.255.255.0, passerelle 192.168.1.254, DNS 192.168.1.1. Validez par OK.", observation: "Le reseau est configure avec une IP fixe. Verifiez avec ipconfig /all que toutes les valeurs sont correctes." },
                    { title: "Verifier la connectivite couche par couche", action: "Ouvrez une invite de commandes et testez dans l'ordre : 1) ipconfig /all (affichage), 2) ping 192.168.1.254 (passerelle), 3) ping 8.8.8.8 (Internet), 4) nslookup www.google.fr (DNS).", observation: "Chaque etape valide une couche. Si le ping passerelle echoue, le probleme est local (cable, VLAN). Si le ping Internet echoue mais la passerelle repond, c'est le routage ou le NAT.", cli: [
                        "ipconfig /all",
                        "ping 192.168.1.254",
                        "ping 8.8.8.8",
                        "nslookup www.google.fr"
                    ] },
                    { title: "Configurer une adresse IP sous Linux", action: "Ouvrez un terminal et tapez les commandes ci-dessous. ip a affiche les interfaces, ip route montre la table de routage, nmcli configure une interface via NetworkManager.", observation: "ip a montre l'adresse IP et le masque sur chaque interface. ip route montre la route par defaut (via la passerelle).", cli: [
                        "ip a",
                        "ip route",
                        "sudo ip addr add 192.168.1.20/24 dev ens33",
                        "sudo ip route add default via 192.168.1.254"
                    ] },
                    { title: "Decouper un reseau - methode pratique", action: "Prenez une feuille et calculez : le reseau 192.168.1.0/24 doit etre decoupe en 4 sous-reseaux egaux. Empruntez 2 bits au champ hote (2^2 = 4 sous-reseaux). Le nouveau masque est /26 (255.255.255.192). L'increment est 64.", observation: "Les 4 sous-reseaux sont : .0-.63, .64-.127, .128-.191, .192-.255. Chaque bloc a 62 hotes utilisables (64 - 2).", cli: [
                        "# Verification avec un outil en ligne ou PowerShell",
                        "# L'increment est toujours 256 - valeur du dernier octet du masque = 256 - 192 = 64"
                    ] }
                ],
                deepDive: [
                    { t: "Méthodologie terrain — diagnostiquer un poste sans écran (à distance)", p: [
                        "En support niveau 1/2, 70 % des incidents se résolvent avec trois réflexes : afficher la configuration, tester la joignabilité, lire les journaux. L'ordre des couches (physique → IP → nom) s'applique aussi à distance.",
                        "Sur une machine Windows jointe au domaine, le service d'assistance utilise PowerShell à distance (WinRM) pour exécuter ces vérifications sans se déplacer."
                    ],
                    cmd: [
                        "# Étape 1 : que voit le poste ?",
                        "Get-NetIPConfiguration | Select InterfaceAlias, IPv4Address, IPv4DefaultGateway",
                        "Get-DnsClientServerAddress -AddressFamily IPv4",
                        "# Étape 2 : tester la chaîne complète (lien → passerelle → Internet → nom)",
                        "Test-NetConnection -ComputerName SRV-DC01.lab.lan -Port 445",
                        "# Étape 3 : journaux applicatifs récents",
                        "Get-EventLog -LogName System -Newest 15 | Where-Object { $_.EntryType -eq 'Error' } | Select TimeGenerated, EventID, Source"
                    ],
                    box: 'admin', boxText: "Conseil d'administrateur : documentez vos diagostics dans le ticket au fur et à mesure (commande exécutée + résultat). Un ticket qui raconte l'escalade couche par couche est une preuve de travail et un support de formation pour le suivant." },
                    { t: "Erreurs fréquentes en support", p: [
                        "Redémarrer avant de diagnostiquer : le symptôme disparaît, la cause reste. Le poste qui « refait la panne » trois jours plus tard coûte trois tickets au lieu d'un.",
                        "Changer le DNS « pour voir » sans noter la valeur d'origine : dans un domaine AD, le DNS doit pointer vers le contrôleur de domaine, pas vers 8.8.8.8 — sinon Kerberos cesse de fonctionner et la session prend 10 minutes.",
                        "Confondre l'adresse 169.254.x.x (échec DHCP) et une erreur de câble : la première est un symptôme de service, la seconde un symptôme de couche 1. Le voyant du port du switch tranche."
                    ],
                    box: 'warn', boxText: "Erreur fréquente : tester uniquement avec ping. Un pare-feu peut bloquer l'ICMP sur un serveur parfaitement fonctionnel. Testez le port réel du service (Test-NetConnection -Port 445 pour SMB, -Port 443 pour HTTPS) avant de conclure à une panne." },
                    { t: "Cas d'entreprise — la paie bloquée à 9 h le jour des salaires", p: [
                        "Situation : le 25 du mois, le service comptable appelle — « plus personne ne peut ouvrir le logiciel de paie ». L'application est sur un serveur, les postes sont sur le même LAN.",
                        "Résolution type : vérifier d'abord si le SERVEUR est joignable (ping + port applicatif), puis si c'est un problème de nom (le poste résout srv-paie via le DNS AD), puis les journaux du serveur (service applicatif arrêté dans la nuit par une mise à jour Windows auto-redémarrée).",
                        "Leçon retenue par la PME : exclure le serveur applicatif des redémarrages automatiques via GPO, et ajouter un test de supervision synthétique (ouverture de session) toutes les 5 minutes, qui aurait alerté à 3 h du matin."
                    ],
                    box: 'case', boxText: "Ce cas illustre l'escalade par couches appliquée à un service : le réseau allait bien (ping serveur OK), le nom résolvait bien (DNS AD OK), c'était le service applicatif éteint par un reboot planifié. Trois tickets évités si la supervision avait alerté la nuit." },
                    { t: "Pour l'examen — réflexes du correcteur", p: [
                        "Connnaître les plages privées RFC 1918 par cœur (10/8, 172.16/12, 192.168/16) et l'adresse de repli APIPA 169.254.x.x.",
                        "Savoir réciter l'escalade : couche 1 (câble) → adresse IP → passerelle → routage → DNS. Chaque échec localise la couche fautive.",
                        "Savoir expliquer DORA (DHCP) en une phrase et citer deux types d'enregistrements DNS (A, CNAME) et leur rôle."
                    ],
                    box: 'remember', boxText: "À retenir : IP + masque définissent le réseau ; DHCP distribue ; DNS traduit ; la passerelle sort du réseau. Le diagnostic s'escalade du câble vers le nom, jamais dans le désordre. ping / tracert / nslookup = trois questions : ça va ? par où ? qui traduit ?" }
                ],
                exercices: [
                    { enonce: "Découpez le réseau 192.168.1.0/24 en quatre sous-réseaux /26. Donnez plage, adresse réseau et adresse de diffusion de chacun.", correction: "Un /24 découpé en /26 donne quatre blocs de 64 adresses : 192.168.1.0-192.168.1.63 (réseau .0, diffusion .63), .64-.127 (réseau .64, diffusion .127), .128-.191 (réseau .128, diffusion .191), .192-.255 (réseau .192, diffusion .255). Chaque bloc fournit 62 adresses utilisables (64 moins l'adresse réseau et l'adresse de diffusion). Méthode : incrément = 256 - 192 = 64." },
                    { enonce: "Un collègue dit : « Internet ne marche pas ». Ordonnez vos vérifications et nommez la cause ciblée à chaque étape.", correction: "1) Lien : voyant, câble, Wi-Fi associé (couche 1). 2) IP : ipconfig /all - une adresse 169.254.x.x pointe un échec DHCP. 3) ping passerelle : échec = problème local/VLAN ; réussite = on continue. 4) ping sur une IP publique connue (par ex. 8.8.8.8, DNS public de Google) : échec = routage/NAT vers Internet. 5) nom de domaine : échec seulement à cette étape = DNS. Chaque étape élimine une couche, on ne « règle » jamais dans le désordre." }
                ],
                resume: "Une adresse IP + un masque définissent ce qui est directement joignable ; DHCP distribue la configuration, DNS traduit les noms, la passerelle sort des sous-réseaux. Le diagnostic s'escalade du câble vers le nom, une couche à la fois.",
                suite: "CP5 — Serveurs virtualisés : héberger ces services proprement.",
            },
            {
                id: 'tssr-cp5', parcours: 'TSSR', code: 'CP5',
                title: 'Serveurs virtualisés',
                niveau: 'Débutant',
                prerequis: "Le CP3 (serveurs Linux) aide à comprendre ce qu'on héberge. Une machine avec un hyperviseur de type 2 installé (VirtualBox par exemple) suffit pour pratiquer.",
                objectifs: [
                    "Distinguer hyperviseur de type 1 et de type 2 avec des exemples produits",
                    "Créer une VM correctement dimensionnée (CPU, RAM, disque, réseau)",
                    "Expliquer la différence entre snapshot et sauvegarde",
                    "Comprendre ce qu'apportent les modèles et la migration à chaud"
                ],
                lessons: [
                    { title: "Leçon 1 — Pourquoi et comment virtualiser", parts: [
                        { h: "Le principe", t: "La virtualisation fait tourner plusieurs systèmes isolés (VM) sur une même machine physique grâce à l'hyperviseur. Bénéfices : consolidation (moins de serveurs sous-utilisés), isolement des pannes, création et duplication rapides — le serveur devient un fichier que l'on copie, sauvegarde… et teste." , schema: 'hyper-v-architecture' },
                        { h: "Deux familles d'hyperviseurs", t: "Type 1 (bare metal) : l'hyperviseur est installé directement sur la machine — Hyper-V de Microsoft, ESXi de VMware, Proxmox VE. Type 2 (hébergé) : il s'installe comme une application au-dessus d'un OS — par exemple VirtualBox ou VMware Workstation. En production, on reste sur du type 1."   },
                        { h: "Les bonnes questions avant de créer", t: "Combien de RAM et de CPU donner (garder de la marge pour l'hyperviseur) ? Quels disques et quel réseau ? Ces choix se font avec la supervision à l'appui — on ajuste à l'usage plutôt qu'on suralloue d'emblée." }
                    ]},
                    { title: "Leçon 2 — Créer une VM, étape par étape", parts: [
                        { h: "Les quatre allocations", t: "vCPU (nombre de processeurs logiques), RAM, disque virtuel et carte réseau. Le disque est souvent provisionné à la demande (thin provisioning) : la taille annoncée est réservée mais l'espace ne se consomme qu'au fil du remplissage. Élégant, mais il faut surveiller l'espace réel de l'hôte." },
                        { h: "Le réseau de la VM", t: "En mode NAT, la VM passe par l'hyperviseur qui la translate vers l'extérieur ; en mode bridge (pont), la VM est directement sur le même réseau que l'hôte, comme une machine à part entière avec sa propre IP." },
                        { h: "Snapshot ≠ sauvegarde", t: "Le snapshot fige l'état de la VM à un instant T et n'enregistre ensuite que les différences : parfait avant une modification risquée (mise à jour, changement de config), restaurable en un clic. Mais s'il vit sur le même disque que la VM, la panne d'hôte l'emporte aussi. Une sauvegarde, elle, est une copie sortie de la VM, sur un autre support (voir CP8)." }
                    ]},
                    { title: "Leçon 3 — Exploiter des VM au quotidien", parts: [
                        { h: "Les modèles (templates)", t: "Une VM de référence correctement installée (mises à jour, configuration de base) devient un modèle : chaque nouveau serveur part d'une copie propre et homogène, comme la golden image du CP9 côté postes." },
                        { h: "La migration à chaud", t: "Les plateformes de type 1 proposent la migration à chaud (live migration) : déplacer une VM allumée d'un hôte à l'autre, sans coupure visible. Indispensable pour intervenir sur un hôte sans arrêter les services." },
                        { h: "Ne pas tromper la RAM", t: "\"Sur-engagement\" de RAM : allouer aux VM plus de RAM que n'en a réellement l'hôte fonctionne tant que tout le monde ne consomme pas en même temps. Prévoyez la marge, mesurez avec la supervision (voir AIS CP7), et restez prudents sur les machines critiques." }
                    ]}
                ],
                guiSteps: [
                    { title: "Ouvrir Hyper-V Manager et creer un commutateur virtuel", action: "Ouvrez Hyper-V Manager (Demarrer - Outils d'administration). Dans le panneau Actions a droite, cliquez Virtual Switch Manager. Choisissez External, cliquez Create Virtual Switch. Nommez-le LAN-EXT, selectionnez la carte physique, validez.", observation: "Le commutateur virtuel LAN-EXT apparait dans la liste. Il connecte les VM au reseau physique via la carte Ethernet de l'hote.", mockup: 'mockup-hyperv' },
                    { title: "Creer une VM avec l'assistant", action: "Dans le panneau Actions, cliquez New - Virtual Machine. Suivez l'assistant : Name = VM-CLI01, Generation = 2, Memory = 4096 MB (decochez Dynamic Memory pour l'instant), Virtual Switch = LAN-EXT, Virtual Hard Disk = 60 GB (dynamique), Installation options = ISO image (pointez vers votre fichier .iso). Cliquez Finish.", observation: "La VM apparait dans la liste avec l'etat Off. Son disque virtuel (VHDX) est cree dans le dossier par defaut.", mockup: 'mockup-hyperv' },
                    { title: "Demarrer la VM et installer l'OS", action: "Selectionnez la VM dans la liste, cliquez Start dans le panneau Actions, puis Connect pour ouvrir la console graphique. Suivez l'installation de Windows (ou Linux) comme sur une machine physique.", observation: "La console s'ouvre dans une fenetre. Vous voyez le boot de la VM puis l'installeur de l'OS. Une fois installe, la VM se comporte comme un serveur physique." },
                    { title: "Creer un checkpoint (snapshot)", action: "Selectionnez la VM, dans le panneau Actions cliquez Checkpoint. Nommez-le avant-modification. Apres avoir applique un changement, vous pouvez revenir en arriere avec Revert.", observation: "Le checkpoint apparait dans l'onglet Checkpoints de la VM. Un retour en arriere restaure l'etat exact de la VM au moment du checkpoint.", cli: [
                        "Checkpoint-VM -VMName VM-CLI01 -SnapshotName avant-modification",
                        "Get-VMSnapshot -VMName VM-CLI01",
                        "Restore-VMSnapshot -VMName VM-CLI01 -Name avant-modification -Confirm:$false"
                    ] },
                    { title: "Verifier avec PowerShell (methode 2)", action: "Ouvrez PowerShell et tapez les commandes ci-dessous pour verifier l'etat des VM et du commutateur sans ouvrir la console graphique.", observation: "Get-VM liste toutes les VM avec leur etat, Get-VMSwitch montre les commutateurs, Get-VMSnapshot liste les checkpoints.", cli: [
                        "Get-VM",
                        "Get-VMSwitch",
                        "Get-VMSnapshot -VMName VM-CLI01"
                    ] }
                ],
                deepDive: [
                    { t: "Type 1 vs Type 2 - ce que ca change vraiment", p: [
                        "Type 1 (Hyper-V, ESXi, Proxmox) : l'hyperviseur est le seul OS sur la machine. Il alloue directement les ressources materielles. Plus performant, plus stable, mais necessite une machine dediee.",
                        "Type 2 (VirtualBox, VMware Workstation) : s'installe comme une application sur votre poste. Parfait pour apprendre et tester, mais partage les ressources avec votre OS hote.",
                        "En entreprise, on ne trouve que du type 1 en production. Le type 2 sert au developpement et a la formation."
                    ],
                    box: 'remember', boxText: "A retenir : snapshot = retour arriere a un instant T (pour tester un changement), sauvegarde = copie complete et persistante (pour restaurer apres une panne). Un snapshot n'est PAS une sauvegarde - si le datastore est perdu, les snapshots sont perdus aussi." },
                    { t: "Erreurs frequentes en virtualisation", p: [
                        "Surdimensionner les VM : allouer 16 Go de RAM a chaque VM quand 4 Go suffisent sature l'hote. Regle : allouez ce dont la VM a besoin, pas ce que l'hote a de disponible.",
                        "Accumuler les snapshots sans les supprimer : chaque snapshot creuse un differentiel qui grandit. Supprimez les checkpoints apres validation du changement.",
                        "Oublier d'activer le commutateur externe : la VM creee avec un commutateur Internal ne peut pas joindre le reseau physique. Verifiez le type de commutateur (External, Internal, Private)."
                    ],
                    box: 'warn', boxText: "Erreur frequente : creer une VM avec Dynamic Memory (Hyper-V) sans definir de limites. La VM peut absorber toute la RAM de l'hote et affamer les autres VM. Definissez toujours un minimum et un maximum." },
                    { t: "Cas d'entreprise - migration d'un serveur physique vers une VM (P2V)", p: [
                        "Situation : un serveur physique de 8 ans (Windows Server 2012) heberge une application critique. Le materiel arrive en fin de vie.",
                        "Approche : creer une VM neuve avec un OS supporte, installer l'application, migrer les donnees, tester, puis basculer le DNS pour rediriger les utilisateurs. Le serveur physique est garde en secours pendant 2 semaines.",
                        "Lecon : la migration P2V n'est pas une copie - c'est une reconstruction propre sur une infrastructure moderne. Le P2V direct (avec un outil automatique) est possible mais rarement recommande."
                    ],
                    box: 'case', boxText: "Ce cas illustre la transition du physique vers le virtuel : reconstruire proprement est preferable a cloner l'ancien. La VM recoit un OS a jour, les pilotes sont virtualises, et le serveur devient un fichier que l'on sauvegarde et duplique." }
                ],
                exercices: [
                    { enonce: "Dimensionnez une VM pour un serveur web interne (visiteurs modérés, haute disponibilité attendue). Proposez vCPU, RAM, disque, type de provisionnement, et justifiez.", correction: "Point de départ raisonnable : 2 vCPU, 4 Go de RAM, disque de 40 Go provisionné à la demande pour un site web interne peu chargé. Justification : un serveur web interne modéré sollicite peu le CPU mais il vaut mieux de la RAM pour les traitements ; le thin provisioning est acceptable si l'espace de l'hôte est supervisé. Ce sont des hypothèses de départ, pas une norme : on vérifie ensuite par la supervision (AIS CP7) et on ajuste." },
                    { enonce: "Un collègue veut « sauvegarder » une VM avec un snapshot avant de rester en prod toute l'année. Qu'en dit-on ?", correction: "Le snapshot convient pour un instant T à court terme (avant une opération risquée), pas comme sauvegarde permanente : il grandit avec le temps, dégrade les performances et meurt avec le disque de la VM. La bonne réponse : sauvegarde dédiée et externalisée du support (CP8), snapshot temporaire avant chaque intervention, supprimé après validation." }
                ],
                resume: "La virtualisation transforme le serveur en objet manipulable : allocations maîtrisées (vCPU, RAM, disque, réseau), snapshot pour l'instant T, sauvegarde pour la survivabilité, modèles pour la cohérence et migration à chaud pour l'entretien sans coupure.",
                suite: "CP6 — Scripts : automatiser ces tâches répétitives.",
            },
            {
                id: 'tssr-cp6', parcours: 'TSSR', code: 'CP6',
                title: 'Scripts',
                niveau: 'Débutant à intermédiaire',
                prerequis: "Le CP2 (Windows/PowerShell) et le CP3 (Linux/bash) facilitent la compréhension ; aucun prérequis de programmation.",
                objectifs: [
                    "Expliquer pourquoi automatiser et identifier les tâches candidates",
                    "Lire et écrire une commande PowerShell avec pipeline et filtre",
                    "Écrire un mini-script bash avec paramètre et exécuter proprement",
                    "Respecter la sécurité : comprendre un script avant de l'exécuter"
                ],
                lessons: [
                    { title: "Leçon 1 — Pourquoi scripter", parts: [
                        { h: "L'automatisation réduit les erreurs", t: "Créer 30 comptes à la main donne 30 occasions de se tromper ; une boucle les crée identiquement et relit la source de données. Le script fait exactement ce qui est écrit, chaque fois de la même façon : fiabilité avant tout." , schema: 'automatisation-scripts' },
                        { h: "Deux mondes, deux langages", t: "Windows : PowerShell (pilotable sur tout l'écosystème Microsoft, y compris AD — voir le module du CP2). Linux : bash, présent partout. Un bon technicien sait au moins lire les deux." },
                        { h: "La règle d'or", t: "Jamais de copier-coller un script trouvé en ligne sans le comprendre : un script malveillant peut tout détruire ou exfiltrer. On lit, on teste sur une machine de labo, puis seulement en production." }
                    ]},
                    { title: "Leçon 2 — PowerShell en pratique", parts: [
                        { h: "Découvrir avant de retenir", t: "Get-Command liste les commandes, Get-Help nom_commande affiche le manuel. Les noms suivent le motif Verbe-Nom : Get-Service (lire), Stop-Service (arrêter). Deux commandes à connaître en permanence, et vous savez toujours retrouver le reste." },
                        { h: "Variables et pipeline", t: "$nom = 'valeur' stocke une variable. Le pipeline envoie le résultat d'une commande vers la suivante : Get-Service | Where-Object { $_.Status -eq 'Running' } liste les services démarrés. $_ désigne l'élément courant du pipeline." },
                        { h: "Exécuter un script .ps1", t: "On enregistre les commandes dans un fichier .ps1. La stratégie d'exécution (execution policy) détermine si les scripts peuvent tourner — protection contre l'exécution de scripts non maîtrisés ; l'administrateur la règle en connaissance de cause, jamais pour masquer un script douteux." }
                    ]},
                    { title: "Leçon 3 — bash, l'équivalent Linux", parts: [
                        { h: "La structure minimale", t: "Un script bash commence souvent par la ligne #!/bin/bash (le shebang indique l'interpréteur), les commentaires s'écrivent après # et une variable s'affecte sans espace : var=valeur. Rien de sorcier, la rigueur compte plus que la quantité." },
                        { h: "Paramètres et codes de retour", t: "$1 désigne le premier paramètre passé au script, echo affiche du texte, et le code de sortie ($? dans le shell appelant) dit si la dernière commande a réussi (0) ou échoué. C'est ce code que les planificateurs et la supervision surveillent." },
                        { h: "Exécuter proprement", t: "chmod +x script.sh rend le script exécutable, puis ./script.sh le lance. Ne donnez jamais +x à un script que vous n'avez pas tapé vous-même — retour à la règle d'or." }
                    ]}
                ],
                guiSteps: [
                    { title: "Ecrire et executer son premier script PowerShell", action: "Ouvrez PowerShell ISE (ou Visual Studio Code avec l'extension PowerShell). Tapez les commandes ci-dessous et sauvegardez le fichier en .ps1. Pour executer : clic droit - Run with PowerShell, ou dans un terminal : .\\monscript.ps1.", observation: "Le script s'execute ligne par ligne. Si une erreur survient, PowerShell affiche le numero de ligne et le message.", cli: [
                        "# monscript.ps1",
                        "Write-Host 'Bienvenue dans mon premier script' -ForegroundColor Green",
                        "$hostname = hostname",
                        "Write-Host 'Nom du poste : $hostname'",
                        "Get-Service | Where-Object Status -eq Running | Select-Object -First 5"
                    ] },
                    { title: "Utiliser le pipeline et le filtre", action: "Le pipeline envoie le resultat d'une cmdlet vers la suivante. Where-Object filtre, Sort-Object trie, Select-Object choisit les colonnes. C'est la base de tout script PowerShell.", observation: "Le pipeline transforme une liste brute en rapport lisible. Chaque etape ajoute une transformation.", cli: [
                        "# Services arretes, tries par nom, affiches en liste",
                        "Get-Service | Where-Object Status -eq Stopped | Sort-Object Name | Format-Table Name, DisplayName",
                        "# Espace disque des lecteurs de plus de 10 Go",
                        "Get-Volume | Where-Object SizeRemaining -gt 10GB | Sort-Object SizeRemaining"
                    ] },
                    { title: "Ecrire un script bash avec parametre", action: "Ouvrez un terminal Linux. Creez un fichier script.sh avec un shebang en premiere ligne, rendez-le executable, puis executez-le avec des parametres. Le parametre $1 est le premier argument passe au script.", observation: "Le script prend le parametre (un nom de fichier) et affiche son contenu. $1 = premier argument, $@ = tous les arguments.", cli: [
                        "cat > lire.sh << 'EOF'",
                        "#!/bin/bash",
                        "echo 'Lecture du fichier : $1'",
                        "wc -l $1",
                        "echo 'Dernieres lignes :'",
                        "tail -n 3 $1",
                        "EOF",
                        "chmod +x lire.sh",
                        "./lire.sh /etc/hostname"
                    ] },
                    { title: "Securite : comprendre avant d'executer", action: "Ne JAMAIS executer un script trouve sur Internet sans le lire. Cherchez : les commandes destructives (Remove-Item, rm, format), les connexions reseau (Invoke-WebRequest, curl), et les modifications de securite (Set-ExecutionPolicy, usermod).", observation: "Le niveau d'execution par defaut de PowerShell (Restricted) bloque les scripts non signes. Set-ExecutionPolicy RemoteSigned autorise les scripts locaux tout en exigeant une signature pour les scripts distants." }
                ],
                deepDive: [
                    { t: "Quand automatiser et quand ne pas le faire", p: [
                        "Automatisez quand la tache est repetee, previsible et sensible aux erreurs humaines (creation de comptes, deploiement de configuration, sauvegarde).",
                        "N'automatisez pas une tache que vous ne savez pas faire a la main : l'automatisation d'un processus mal maitrise amplifie les erreurs."
                    ],
                    cmd: [
                        "# Exemple : creer 10 utilisateurs depuis un CSV",
                        "Import-Csv C:\\Scripts\\users.csv | ForEach-Object {",
                        "    New-ADUser -Name $_.Nom -SamAccountName $_.Login -Path $_.OU -AccountPassword (ConvertTo-SecureString $_.Pass -AsPlainText -Force) -Enabled $true",
                        "}",
                        "# Bash : verifier les services sur plusieurs serveurs",
                        "for srv in srv1 srv2 srv3; do echo '== $srv ==' && ssh $srv systemctl is-active sshd; done"
                    ],
                    box: 'remember', boxText: "A retenir : un script = une tache repetable + des parametres + une verification du resultat. Le shebang (#!) indique l'interpreteur en bash. Le pipeline en PowerShell transmet des objets (pas du texte), d'ou la puissance de Where-Object et Select-Object." },
                    { t: "Erreurs frequentes en scripting", p: [
                        "Oublier le -WhatIf sur une commande destructive : PowerShell permet de simuler avec -WhatIf avant d'executer reellement.",
                        "Hardcoder un mot de passe dans un script : utilisez ConvertTo-SecureString et stockez dans un fichier securise, ou utilisez un gestionnaire de secrets.",
                        "Ne pas gerer les erreurs : un script sans try/catch s'arrete brutalement au premier probleme."
                    ],
                    box: 'warn', boxText: "Erreur frequente : Set-ExecutionPolicy Unrestricted sur un poste de production. Cela autorise l'execution de n'importe quel script. Utilisez RemoteSigned (scripts locaux autorises, scripts distants dovent etre signes)." }
                ],
                exercices: [
                    { enonce: "Écrivez une commande PowerShell qui compte les fichiers .log d'un dossier.", correction: "Deux écritures possibles : Get-ChildItem -Filter *.log | Measure-Object (affiche un résumé dont le champ Count), ou (Get-ChildItem -Filter *.log).Count pour n'avoir que le nombre. Get-ChildItem énumère, Measure-Object compte — le pipeline fait le pont." },
                    { enonce: "Écrivez un script bash qui salue la personne passée en paramètre, et montrez comment l'exécuter.", correction: "Contenu : #!/bin/bash puis echo \"Bonjour $1\". Exécution : chmod +x saluer.sh (une fois), puis ./saluer.sh Alice affiche « Bonjour Alice ». Pensez aussi à tester : sans paramètre, $1 est vide ; on peut le détecter avec [ -z \"$1\" ] et afficher une aide, mais ce n'est pas obligatoire pour l'exercice." }
                ],
                resume: "Scripter = moins d'erreurs et de temps perdu. PowerShell (Verbe-Nom, pipeline, .ps1) et bash (shebang, paramètres, chmod +x) suffisent pour automatiser le quotidien. Règle d'or intangible : comprendre avant d'exécuter.",
                suite: "CP7 — Accès Internet et interconnexions : donner à tout ce monde l'accès au monde extérieur.",
            },
            {
                id: 'tssr-cp7', parcours: 'TSSR', code: 'CP7',
                title: 'Accès Internet et interconnexions',
                niveau: 'Intermédiaire',
                prerequis: "Le CP4 est indispensable (adressage, passerelle, DNS). Aucune connaissance de routage avancé exigée.",
                objectifs: [
                    "Expliquer le rôle de la passerelle et du NAT pour sortir sur Internet",
                    "Maîtriser les adresses publiques : fixe ou dynamique, résolution DNS interne/externe",
                    "Décrire un VPN site-à-site et un lien de secours Internet",
                    "Diagnostiquer une perte d'accès Internet avec une méthode ordonnée"
                ],
                lessons: [
                    { title: "Leçon 1 — Sortir du réseau local", parts: [
                        { h: "La passerelle, porte du réseau", t: "Tout trafic destiné à l'extérieur passe par la passerelle (le routeur du réseau local). Sans elle, un poste reste confiné dans son sous-réseau : ce n'est pas une panne, c'est une configuration absente." , schema: 'vpn-tunnel' },
                        { h: "NAT : beaucoup d'adresses privées, une adresse publique", t: "Le NAT (address translation) transforme les adresses privées du LAN en l'adresse publique du routeur en sortie. Le poste de l'utilisateur et le serveur partagent cette identité publique vers Internet. C'est le mécanisme général des PME et des foyers." },
                        { h: "IP publique : fixe ou dynamique", t: "Votre adresse publique vient du fournisseur d'accès et peut être fixe ou changer périodiquement selon l'offre. Pour faire pointer un service de l'extérieur, il faut le savoir : demandez à votre FAI ou consultez votre contrat — ne l'improvisez pas." }
                    ]},
                    { title: "Leçon 2 — Filtrer et résoudre", parts: [
                        { h: "DNS interne contre DNS externe", t: "Deux mondes : le DNS interne (serveur de l'entreprise, connaît l'intranet) et les résolveurs publics très connus (par ex. 8.8.8.8 chez Google ou 9.9.9.9 chez Cloudflare). Les postes utilisent généralement le DNS interne en priorité pour tout, les résolveurs publics en approche externe ou en secours." },
                        { h: "Contrôler la sortie", t: "Un filtrage web (par liste de catégories ou par serveur proxy) permet de limiter l'accès de sortie. Objectifs réels : sécurité (bloquer les sites à contenu dangereux), conformité, productivité. De nos jours, la tendance est au filtrage en ligne via des services cloud, mais le principe reste le même : maîtriser qui sort vers quoi." },
                        { h: "La règle d'exposition", t: "N'exposez vers Internet que ce qui doit être visible (un serveur web publié, un portail VPN). Tout le reste reste caché derrière le pare-feu. Principes répandus : moindre exposition et documentation de chaque ouverture." }
                    ]},
                    { title: "Leçon 3 — Relier les sites et tenir la panne", parts: [
                        { h: "VPN site-à-site", t: "Un tunnel chiffré établi entre deux routeurs, à travers Internet, relie deux sites distants : leurs réseaux locaux se voient comme s'ils étaient dans le même bureau, en privé. C'est la brique normale d'un réseau multi-sites." },
                        { h: "Lien de secours Internet", t: "Un deuxième accès (parfois via une autre technologie que la fibre) apporte la continuité. La bascule doit être préparée au niveau du routeur et TESTÉE : une redondance jamais activée en test hypothétiquement ne protège rien." },
                        { h: "Diagnostic de sortie Internet", t: "Ordre simple : ping passerelle (local OK ?) → ping sur une IP publique (8.8.8.8) : routage et sortie NAT OK ? → nom de domaine (DNS OK ?). Remontez pas à pas et vous trouverez la couche fautive sans raturer la configuration entière." }
                    ]}
                ],
                guiSteps: [
                    { title: "Configurer NAT sur un routeur Cisco pour sortir sur Internet", action: "Dans le CLI Cisco, configurez les interfaces inside (LAN) et outside (WAN), puis creez une regle NAT dynamique avec overload (PAT). Le mot-cle overload active le PAT : plusieurs adresses privees partagent une seule IP publique.", observation: "Apres configuration, un ping depuis le LAN vers 8.8.8.8 reussit. La commande show ip nat translations affiche les traductions actives.", cli: [
                        "interface Gi0/0",
                        " ip nat inside",
                        "interface Gi0/1",
                        " ip nat outside",
                        "access-list 1 permit 192.168.1.0 0.0.0.255",
                        "ip nat inside source list 1 interface Gi0/1 overload"
                    ] },
                    { title: "Configurer la passerelle par defaut sur un poste client", action: "Sur le poste client, ouvrez Parametres - Reseau - Modifier les options - TCP/IPv4 - Proprietes. Verifiez que la passerelle pointe vers le routeur (ex : 192.168.1.254). Le DNS doit pointer vers le serveur interne (ex : 172.16.10.10).", observation: "ipconfig /all montre la passerelle et le DNS. Un ping vers 8.8.8.8 confirme la sortie Internet, nslookup confirme la resolution de nom." },
                    { title: "Verifier les traductions NAT en cours", action: "Sur le routeur, tapez show ip nat translations pour voir les traductions actives, et show ip nat statistics pour les compteurs. Chaque flux sortant crée une entree dans la table NAT.", observation: "Les traductions montrent l'IP locale, le port source, l'IP publique et le port traduit. C'est le PAT qui permet a plusieurs postes de partager une seule IP publique.", cli: [
                        "show ip nat translations",
                        "show ip nat statistics"
                    ] }
                ],
                deepDive: [
                    { t: "NAT, PAT et le principe de la passerelle", p: [
                        "NAT (Network Address Translation) remplace l'adresse IP source privee par l'adresse IP publique du routeur. PAT (Port Address Translation) ajoute aussi la traduction du port pour distinguer les flux.",
                        "La passerelle par defaut est l'adresse du routeur vers laquelle le poste envoie tout trafic destine a un autre reseau. Sans passerelle configuree, le poste ne sort jamais de son sous-reseau."
                    ],
                    cmd: [
                        "# Verifier la table NAT en temps reel",
                        "show ip nat translations",
                        "# Purger les traductions (apres modification de config)",
                        "clear ip nat translation *"
                    ],
                    box: 'remember', boxText: "A retenir : NAT/PAT = le routeur remplace IP et port pour sortir sur Internet. La passerelle par defaut = l'adresse du routeur. Sans passerelle configuree, pas de sortie possible, meme si le reseau local fonctionne." },
                    { t: "Erreurs frequentes", p: [
                        "Oublier le mot-cle overload : sans lui, le NAT echoue car chaque adresse privee exigerait une IP publique dediee.",
                        "Configurer NAT sans marquer les interfaces inside/outside : le routeur ne sait pas dans quel sens traduire.",
                        "Confondre DNS interne (le DC du domaine) et DNS externe (le FAI ou 8.8.8.8) : le poste doit utiliser le DNS interne pour resoudre les noms AD, et le DNS interne redirige vers l'exterieur."
                    ],
                    box: 'warn', boxText: "Erreur frequente : oublier l'interface outside. Sans 'ip nat outside' sur l'interface WAN, le routeur ne traduit jamais les paquets sortants, et le ping 8.8.8.8 depuis le LAN echoue." }
                ],
                exercices: [
                    { enonce: "Le chef vient de vous dire que tout le monde a perdu Internet. Écrivez votre méthode de diagnostic en cinq étapes numérotées.", correction: "1) Un seul poste ou tous ? (un seul = problème client, voir CP4). 2) Passerelle atteignable en ping ? (échec = réseau local, câble/VLAN/du routeur). 3) IP publique pingable (8.8.8.8) ? (échec = chaîne routeur/FAI ou NAT). 4) Un nom de domaine résout-il ? (adresse IP ok mais nom échoué = DNS). 5) Vérifier les journaux du routeur et l'état des liens (ligne, fibre). Toujours de la couche la plus proche vers l'extérieur, jamais l'ordre inverse." },
                    { enonce: "On vous demande de publier un serveur web interne sur Internet. Quelles conditions réunir avant de l'accorder ?", correction: "Liste non exhaustive : une IP publique fixe (ou un service de mise à jour DNS dynamique), une règle NAT de translation de port vers le serveur uniquement, HTTPS avec un certificat valide (certificat émis par une autorité — Let's Encrypt délivre gratuitement des certificats reconnus, par exemple), serveur et CMS à jour, journalisation et supervision de l'exposition, et évalutation si un accès VPN ou un portail sécurisé ne serait pas preferable à une exposition directe. Chaque ouverture est un choix documenté, pas un geste machinal." }
                ],
                resume: "Sortir sur Internet, c'est une chaîne : passerelle → NAT vers l'adresse publique → filtrage de sortie contrôlé → DNS externe. Préparez et testez le VPN site-à-site et le lien de secours ; le diagnostic suit la chaîne dans l'ordre, du poste vers l'extérieur.",
                suite: "CP8 — Sauvegardes et restaurations : préserver ce que l'on vient de relier.",
            },
            {
                id: 'tssr-cp8', parcours: 'TSSR', code: 'CP8',
                title: 'Sauvegardes et restaurations',
                niveau: 'Débutant à intermédiaire',
                prerequis: "Le CP5 (virtualisation) aide à saisir la différence entre snapshot et sauvegarde. Aucune base de données ni réseau spécifique requis.",
                objectifs: [
                    "Employer le vocabulaire : RPO, RTO, complète/incrémentielle/différentielle",
                    "Expliquer la règle 3-2-1 et pourquoi on teste une restauration",
                    "Calculer une restauration incrémentielle ou différentielle",
                    "Repérer un système de sauvegarde fragile à partir d'indices"
                ],
                lessons: [
                    { title: "Leçon 1 — Le vocabulaire pour ne rien mélanger", parts: [
                        { h: "Sauvegarde ou réplique ?", t: "Une sauvegarde est une copie volontairement conservée, à un instant donné, restaurable. Une réplique (miroir RAID, cluster) protège uniquement la panne d'un matériel : si vous effacez un fichier par erreur, la réplique efface le même fichier en même temps. La réplique protège la disponibilité, la sauvegarde protège la mémoire."  , schema: 'raid-niveaux', imgCaption: 'Les quatre architectures RAID (composé d\'après Wikimedia Commons, CC BY-SA) : striping (0), miroir (1), parité répartie (5), miroirs en bande (10). Le RAID protège de la panne disque, jamais de la suppression ni du ransomware.' },
                        { h: "RPO et RTO", t: "Le RPO (Recovery Point Objective) exprime la perte de données acceptable : avec une sauvegarde chaque nuit, le RPO est au maximum une nuit de travail. Le RTO (Recovery Time Objective) est le délai maximum pour remettre le service. On détermine ces deux chiffres AVEC le métier, avant d'acheter quoi que ce soit." , schema: 'pra-pca-321', imgCaption: 'Règle de sauvegarde 3-2-1 — Wikimedia Commons, CC BY-SA 4.0 (Olaf Pichler). https://commons.wikimedia.org/wiki/File:3-2-1_backup_01.png' },
                        { h: "Trois types de sauvegarde", t: "Complète : tout, toujours. Incrémentielle : ce qui a changé depuis la dernière sauvegarde, quel qu'en soit le type. Différentielle : tout depuis la dernière complète. Restaurer une différentielle est simple (la complète + la différentielle concernée). Restaurer une incrémentielle impose de suivre toute la chaîne depuis la dernière complète." }
                    ]},
                    { title: "Leçon 2 — La stratégie 3-2-1", parts: [
                        { h: "3 copies, 2 supports différents, 1 hors site", t: "La règle 3-2-1 (très répandue dans la profession) : conserver au moins 3 copies des données, sur 2 supports différents, dont 1 en dehors du site. Pourquoi : panne matérielle, feu/inondation, suppression accidentelle — une seule copie est aussi fragile que l'original." },
                        { h: "Verrouiller les copies", t: "Les solutions récentes de sauvegarde proposent des copies inaltérables (immutabilité) ou une copie déconnectée pour se prémunir contre les rançongiciels, et le chiffrement des supports amovibles protège la confidentialité en cas de perte. Il faut aussi noter l'importance de préciser la durée de rétention (combien de temps garder chaque copie). Vos protections précises dépendent de votre organisation." },
                        { h: "Sabotages possibles", t: "Si un rançongiciel compromet le compte admin de sauvegarde, il peut détruire les copies accessibles. D'où l'importance d'un compte dédié non utilisé pour l'administration quotidienne, de copies protégées en écriture et si possible de vérifier les permissions. Chaque changement de contexte est une occasion de réviser." }
                    ]},
                    { title: "Leçon 3 — Restaurer, le vrai métier", parts: [
                        { h: "Un test régulier de restauration", t: "La sauvegarde n'existe que si l'on a déjà restauré au moins une fois. Planifiez des tests réguliers : restaurer un fichier, une base de données, une VM entière — et chronométrer ; c'est votre RTO réel." },
                        { h: "Le registre des sauvegardes", t: "Documentez : quoi (serveurs, bases, partages), quand (fréquence), où (support, hors site ?), combien de temps (rétention), et comment (procédure pas à pas). En préparation, le registre garantit qu'en cas de crise, un collègue absent ne bloque pas la restauration." },
                        { h: "Le piège n°1", t: "La sauvegarde « verte » qui réussit chaque nuit depuis trois ans mais n'a jamais été testée, stockée sur le même disque que les données, sans rétention définie : quand la panne arrive, rien ne restaure. Chaque indice de fragilité (sauvegarde sur le même support, rétention floue, pas de test) doit déclencher un signal." }
                    ]}
                ],
                guiSteps: [
                    { title: "Configurer une sauvegarde Windows Server (Windows Server Backup)", action: "Ouvrez Server Manager - Tools - Windows Server Backup. Cliquez Local Backup dans le menu de gauche, puis Backup Schedule. Choisissez les fichiers a sauvegarder, l'horaire (ex : 23h), et la destination (disque dedie ou partage reseau).", observation: "L'assistant configure une sauvegarde planifiee. Vous pouvez verifier le statut dans le panneau Backup Schedule." },
                    { title: "Lancer une sauvegarde manuelle avec Veeam (VM)", action: "Ouvrez la console Veeam Backup and Replication. Cliquez Home - Backup Job - Virtual Machine. Nommez le job, selectionnez les VM, choisissez le repository (destination), configurez la retentions (ex : 14 points), planifiez la sauvegarde.", observation: "Le job apparait dans la liste avec son statut. Apres execution, vous pouvez voir les points de restauration dans Backups - Disk." },
                    { title: "Tester une restauration", action: "Dans Veeam, cliquez sur un point de restauration, puis Restore - Entire VM. Choisissez la destination (meme hote, autre hote, ou nouveau nom). Suivez l'assistant et verifiez que la VM restauree demarre.", observation: "La restauration cree une VM identique a l'etat du backup. C'est le SEUL test qui prouve que votre sauvegarde fonctionne.", cli: [
                        "# Windows Server Backup en ligne de commande",
                        "wbadmin start backup -backupTarget:E: -include:C: -allCritical -quiet",
                        "# Verifier les versions disponibles",
                        "wbadmin get versions"
                    ] }
                ],
                deepDive: [
                    { t: "La regle 3-2-1 expliquee simplement", p: [
                        "3 copies des donnees (l'originale + 2 sauvegardes). 2 supports differents (ex : disque local + NAS). 1 copie hors site (ex : cloud ou bande transportee).",
                        "Pourquoi : si le serveur brule (incident local), les 2 autres copies survivent. Si le NAS est chiffre par un ransomware (incident reseau), la copie hors site survient.",
                        "La variante 3-2-1-1-0 ajoute 1 copie immuable (non modifiable) et 0 erreur de restauration verifiee."
                    ],
                    box: 'remember', boxText: "A retenir : complete = tout, differentielle = depuis la derniere complete, incrementale = depuis la derniere sauvegarde. Restauration differentielle = complete + derniere differentielle. Restauration incrementale = complete + TOUTES les incrementales." },
                    { t: "Snapshot vs sauvegarde - ne confondez plus jamais", p: [
                        "Un snapshot (checkpoint) fige l'etat d'une VM a un instant T pour permettre un retour arriere. Il depend du datastore de l'hyperviseur. Si le datastore est perdu, le snapshot est perdu.",
                        "Une sauvegarde est une copie complete et independante, stockee sur un support different (disque, NAS, bande, cloud). Elle survit a la perte du datastore.",
                        "En resume : le snapshot sert a TESTER un changement, la sauvegarde sert a SURVIVRE a une panne."
                    ],
                    box: 'warn', boxText: "Erreur frequente : confondre snapshot et sauvegarde. Un snapshot n'est PAS une sauvegarde. Si l'hyperviseur ou le datastore est compromis (ransomware), les snapshots sont chiffres aussi." }
                ],
                exercices: [
                    { enonce: "Votre sauvegarde complète tourne le dimanche, les incrémentielles chaque soir en semaine. Le serveur tombe mercredi soir. Quelles sauvegardes restaurez-vous ? Et si c'était des différentielles ?", correction: "Version incrémentielle : la complète de dimanche + les incrémentielles de lundi et mardi (les données du mercredi n'ont pas eu le temps d'être sauvegardées : c'est votre RPO subi). Version différentielle : la complète de dimanche + la différentielle de mardi (qui contient tout depuis dimanche). La différentielle exige un seul jeu en plus de la complète ; l'incrémentielle exige la chaîne depuis le début." },
                    { enonce: "Citez au moins quatre indices d'un système de sauvegarde fragile.", correction: "1) Une seule copie, stockée sur le même disque (ou même baie) que les données. 2) Aucune copie hors site. 3) Aucun test de restauration jamais réalisé. 4) Rétention floue ou absente (on ne sait pas ce qu'on garde ni combien de temps). 5) Le compte administrateur de sauvegarde sert aussi à l'usage quotidien. Chaque point correspond à un volet de la règle 3-2-1 et du CP." }
                ],
                resume: "Définissez d'abord RPO et RTO avec le métier, choisissez vos types de sauvegarde (complète, incrémentielle, différentielle), appliquez la règle 3-2-1 avec des copies protégées, et surtout testez la restauration : c'est elle, pas la sauvegarde, qui est la preuve de votre sécurité.",
                suite: "CP9 — Déploiement de postes : bâtir et mettre à disposition du matériel, avec image et automatisation.",
            },
            {
                id: 'tssr-cp9', parcours: 'TSSR', code: 'CP9',
                title: 'Déploiement de postes',
                niveau: 'Intermédiaire',
                prerequis: "Le CP2 (Active Directory/GPO) est utile pour la partie intégration au domaine ; le CP6 aide pour l'automatisation.",
                objectifs: [
                    "Expliquer l'intérêt d'une image standard (golden image)",
                    "Décrire le déploiement réseau PXE côté Microsoft (WDS, MDT) et le fichier de réponse",
                    "Organiser les étapes post-installation (domaine, GPO, logiciels, inventaire)",
                    "Maîtriser le cycle de vie complet du poste, jusqu'au retrait sécurisé"
                ],
                lessons: [
                    { title: "Leçon 1 — Pourquoi standardiser les postes", parts: [
                        { h: "Cohérence = temps et fiabilité", t: "Installer 30 postes un à un consomme des journées et produit 30 postes hétérogènes (oublis variés). L'image standard (golden image) — un poste de référence installé à la main, correctement configuré, puis capturé — rend chaque nouveau poste identique au précédent." , schema: 'deploiement-postes' },
                        { h: "La sécurité par la répétition", t: "Avec une image mise à jour régulièrement, chaque poste part avec les correctifs du moment, les réglages de sécurité et les logiciels validés : pas d'installation « comme j'ai pu ». L'image devient l'outil principal de la conformité du parc — comme le modèle du CP5 pour les serveurs." },
                        { h: "Une image, ça vieillit", t: "L'image doit rester à jour : une image vieillissante livre des postes périmés dès l'installation. On la réactualise périodiquement (correctifs, nouveaux logiciels) — un rendez-vous de maintenance planifié." }
                    ]},
                    { title: "Leçon 2 — Installer depuis le réseau", parts: [
                        { h: "PXE, le démarrage réseau", t: "Un poste neuf (ou réinitialisé) peut démarrer sur la carte réseau (PXE) et se faire servir une installation : plus besoin de clé USB. Côté Microsoft, le rôle WDS (Windows Deployment Services) est le service de déploiement qui répond au PXE et sert les images d'installation Windows." },
                        { h: "MDT, l'orchestration", t: "Le Microsoft Deployment Toolkit (MDT) vient s'ajouter à WDS pour construire de vrais scénarios : séquences de tâches qui enchaînent partitionnement, image, pilotes, intégration au domaine, logiciels — le tout pilotable depuis une console, avec variantes par modèle ou par site." },
                        { h: "Le fichier de réponse", t: "Les questions de l'installateur (langue, partitionnement, compte de licence...) se pré-remplissent dans un fichier de réponse (unattend.xml côté Windows). Le résultat : une installation non interactive — l'utilisateur lance le poste ET l'installation se déroule seule." }
                    ]},
                    { title: "Leçon 3 — Le poste vit : cycle de vie", parts: [
                        { h: "Après l'installation", t: "Le poste rejoint le domaine (CP2), les GPO s'appliquent (sécurité, lecteurs réseau), les logiciels se déploient par paquets. On vérifie l'inventaire (numéro de série, affectation, emplacement) : un poste sans traçage est un poste perdu." },
                        { h: "Réinstaller et remplacer", t: "Poste défectueux ? On réinstalle l'image, l'utilisateur retrouve son environnement (GPO + réassociation de ses données). Remplacer un poste = décharger son profil/données (sauvegarde ou transfert), réimager le matériel sortant, et suivre tout cela dans l'inventaire." },
                        { h: "Retirer proprement", t: "Un poste sorti du parc ne part pas avec ses données : effacement des disques avec des outils dédiés AVANT toute cession ou revente ; désactivation et réaffectation du compte AD ; mise à jour de l'inventaire. Le retrait se conduit comme le déploiement, avec autant de rigueur." }
                    ]}
                ],
                guiSteps: [
                    { title: "Creer une image de reference (sysprep)", action: "Installez Windows sur une VM propre (sans domaine), installez les mises a jour et les logiciels de base, puis executez sysprep : C:\\Windows\\System32\\sysprep\\sysprep.exe /oobe /generalize /shutdown.", observation: "La VM s'eteint. Son disque virtuel (VHDX) est maintenant une image generique prete a etre capturee et deployee." },
                    { title: "Capturer l'image avec WDS", action: "Ouvrez la console WDS (Windows Deployment Services). Dans Install Images, clic droit - Add Install Image. Selectionnez le fichier boot.wim de l'image sysprep, donnez-lui un nom (ex : Win11-Golden-2026).", observation: "L'image apparait dans la console WDS et est disponible pour le deploiement PXE." },
                    { title: "Deployer via PXE", action: "Sur un poste client, configurez le boot reseau dans le BIOS (PXE Boot). Demarrez le poste : il recoit une adresse DHCP, charge boot.wim via TFTP, et l'installateur Windows propose les images disponibles.", observation: "Le poste boot reseau affiche l'assistant d'installation avec l'image Win11-Golden-2026. Apres installation, le poste est integre au domaine automatiquement (fichier de reponse unattend.xml)." }
                ],
                deepDive: [
                    { t: "Golden image : pourquoi et comment", p: [
                        "Une golden image est une installation standardisee : OS a jour, logiciels de base pre-installes, configuration de securite appliquee. Elle evite d'installer chaque poste a la main.",
                        "Le cycle : installer une fois proprement, sysprep pour generaliser, capturer, deployer en masse, integrer au domaine via GPO."
                    ],
                    box: 'remember', boxText: "A retenir : sysprep /generalize efface les identifiants uniques (SID, nom d'ordinateur) pour rendre l'image deployable plusieurs fois. Sans sysprep, chaque poste aurait le meme SID - conflits garanties." },
                    { t: "Erreurs frequentes en deploiement", p: [
                        "Oublier sysprep : tous les postes deployes partagent le meme SID, les GPO ne s'appliquent pas correctement.",
                        "Ne pas preparer le fichier unattend.xml : l'installateur demande l'interaction humaine a chaque deploiement.",
                        "Oublier de mettre a jour l'image : les correctifs de securite manquants creent des vulnerabilites des le premier demarrage."
                    ],
                    box: 'warn', boxText: "Erreur frequente : capturer une image sans avoir desinstalle les logiciels specifiques (imprimantes, VPN personnel). L'image doit contenir UNIQUEMENT ce qui est commun a tous les postes." }
                ],
                exercices: [
                    { enonce: "Vous devez déployer 30 postes identiques dans 2 salles en une semaine. Décrivez la méthode en étapes, de l'image à la livraison.", correction: "1) Préparer et tester l'image de référence (OS, correctifs, logiciels standard, configuration réseau). 2) Préparer WDS/MDT opérationnel avec séquence de tâche incluant le fichier de réponse. 3) Déploiement PXE salle par salle (10 à 15 postes par session, pas tous en même temps pour ne pas saturer le réseau). 4) Vérifications : intégration au domaine, GPO appliquées (gpresult), logiciels présents, inventaire complété. 5) Livraison : remise utilisateur, signature de prise en charge, clôture du projet. La chronologie évite le bouchon réseau et les oublis d'inventaire." },
                    { enonce: "Un poste rendu doit être revendu. Quelles actions de retrait réalisez-vous dans l'ordre ?", correction: "1) Extraction et conservation des données de l'utilisateur, si nécessaire et avec son accord, vers son nouveau matériel. 2) Retrait du poste du domaine et désactivation de son compte AD. 3) Effacement des disques avec un outil dédié avant la cession ou la revente. 4) Mise à jour de l'inventaire (sortie du parc, destinateur, date). Ne revendez jamais un disque non effacé." }
                ],
                resume: "Choisir une image standard régulièrement mise à jour, automatiser son déploiement (PXE/WDS + fichier de réponse, séquences MDT), intégrer proprement au domaine avec GPO et inventaire — et retirer les postes sortants avec le même soin (effacement des données, mise à jour du parc).",
                suite: "Vous avez terminé les 9 CP du TSSR. Le parcours AIS (CP1) vous attend pour monter d'un niveau.",
            }
        ];
