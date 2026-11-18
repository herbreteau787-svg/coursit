export const DEPANNAGE_DATA = [
            // ==================== POSTE CLIENT ====================
            {
                id: 'dep-mdp-oublie', freq: 5, cat: 'Poste client', parcours: 'TSSR', titre: 'Mot de passe oublié',
                symptome: "L'utilisateur appelle : « je ne me souviens plus de mon mot de passe » ou « mon mot de passe ne marche plus ». Il ne peut plus ouvrir sa session.",
                contexte: "Demande la plus fréquente du centre de services. Le risque n'est pas technique mais humain : réinitialiser le mot de passe de la mauvre personne, c'est donner l'accès à un compte qui ne lui appartient pas.",
                verifications: [
                    "Vérifier l'IDENTITÉ avant toute action : badge, rappel du manager, question convenue — jamais sur simple appel téléphonique.",
                    "Vérifier le message exact : « mot de passe incorrect » (erreur de frappe/caps lock) ou « compte verrouillé » (voir fiche dédiée) ?",
                    "Vérifier si l'utilisateur est sur le bon champ : login domaine vs compte Microsoft 365 (les deux s'expirent séparément)."
                ],
                outils: "ADUC ou PowerShell (module ActiveDirectory), canal séparé pour transmettre le mot de passe (SMS, téléphone).",
                commandes: [
                    "Set-ADAccountPassword -Identity jdupont -Reset -NewPassword (Read-Host -AsSecureString)",
                    "Set-ADUser -Identity jdupont -ChangePasswordAtLogon $true",
                    "Get-ADUser jdupont -Properties LockedOut, PasswordExpired, Enabled"
                ],
                diagnostic: [
                    "1. Get-ADUser -Properties : le compte est-il Enabled ? PasswordExpired ? LockedOut ? Ces trois états orientent trois fiches différentes.",
                    "2. Si PasswordExpired : simple réinitialisation + changement obligatoire à la prochaine ouverture de session.",
                    "3. Si l'utilisateur tape le mot de passe sur un clavier AZERTY/QWERTY inversé (poste en anglais) : tester avant de conclure."
                ],
                causes: [
                    "Mot de passe réellement oublié ou expiré (politique de durée 90 jours).",
                    "Erreur de frappe : CAPS LOCK activé, clavier QWERTY, espace final collé.",
                    "Changement récent pas encore propagé à tous les DC (réplication)."
                ],
                resolution: [
                    "Réinitialiser avec un mot de passe temporaire fort, transmettre par un CANAL SÉPARÉ (jamais le même que la demande : email ≠ téléphone).",
                    "Forcer ChangePasswordAtLogon : l'utilisateur choisit son mot de passe définitif lui-même.",
                    "Pour les comptes Microsoft 365 couplés : réinitialiser aussi côté cloud si la synchronisation n'est pas immédiate."
                ],
                prevention: "Portail SSPR (self-service password reset) pour les utilisateurs : réduit de 30 à 40 % les tickets mot de passe. Formation au gestionnaire de mots de passe (KeePass, Bitwarden).",
                casEntreprise: "Un fraudeur appelle le centre de services en se faisant passer pour un directeur en déplacement. Sans vérification d'identité (rappel du manager), le technicien réinitialise le mot de passe : l'imposteur accède à toute la messagerie. La vérification d'identé systématique n'est pas de la méfiance, c'est la procédure."
            },
            {
                id: 'dep-compte-verrouille', freq: 5, cat: 'Poste client', parcours: 'TSSR', titre: 'Compte verrouillé',
                symptome: "« Votre compte est verrouillé » à l'ouverture de session. L'utilisateur jure n'avoir rien fait de spécial.",
                contexte: "Le verrouillage automatique (5 échecs par défaut) protège contre les attaques par dictionnaire. Un compte qui se reverrouille sans cesse cache presque toujours un service qui retente l'ancien mot de passe en tâche de fond.",
                verifications: [
                    "Get-ADUser -Properties LockedOut : confirmé verrouillé ?",
                    "Sur quel DC le verrouillage apparaît (réplication) : chercher l'événement 4740 dans les journaux Sécurité du DC.",
                    "L'utilisateur a-t-il changé son mot de passe récemment ? (indice n°1 du service en tâche de fond)"
                ],
                outils: "ADUC (compteur de verrouillage), journal Sécurité du DC (événement 4740 : source de l'échec avec le nom de la machine cliente), PowerShell.",
                commandes: [
                    "Unlock-ADAccount -Identity jdupont",
                    "Get-WinEvent -FilterHashtable @{LogName='Security';Id=4740} -MaxEvents 5",
                    "Search-ADAccount -LockedOut"
                ],
                diagnostic: [
                    "1. Déverrouiller une première fois et demander à l'utilisateur de se connecter immédiatement.",
                    "2. Si le compte se reverrouille : chercher la SOURCE de l'échec dans l'événement 4740 (nom de la machine appelante).",
                    "3. Sur cette machine : session RDP orpheline, tâche planifiée, service Windows stockant l'ancien mot de passe, application de messagerie sur téléphone (mot de passe non mis à jour)."
                ],
                causes: [
                    "Ancien mot de passe mémorisé par un service/tâche planifiée après un changement (cause n°1 des verrouillages récurrents).",
                    "Téléphone avec le compte mail configuré et mot de passe non renouvelé.",
                    "Vraie tentative d'attaque par dictionnaire (coupler avec les échecs 4625 sur les DC)."
                ],
                resolution: [
                    "Unlock-ADAccount, puis corriger la source : mettre à jour le mot de passe du service, fermer la session RDP orpheline (quser/quser logoff), resynchroniser le téléphone.",
                    "Vérifier les échecs d'authentification restants dans les journaux pour confirmer que la cause est traitée.",
                    "Si attaque réelle : traiter comme incident de sécurité (poste en quarantaine, compte sous surveillance, GPO de verrouillage ajustée)."
                ],
                prevention: "Journaliser et alerter sur les événements 4740 en série (plusieurs comptes = attaque en cours). Sensibiliser : changer son mot de passe implique de le changer partout où il est mémorisé (téléphone, tablette, services).",
                casEntreprise: "Le compte d'une comptable se verrouille toutes les 30 minutes depuis lundi. L'événement 4740 pointe vers son ancien poste au service RH : une session RDP oupheline y retente l'ancien mot de passe en boucle. Fermeture de session (logoff), fin des verrouillements. Leçon : chercher la SOURCE avant de déverrouiller en boucle."
            },
            {
                id: 'dep-imprimante-hors-ligne', freq: 5, cat: 'Poste client', parcours: 'TSSR', titre: 'Imprimante hors ligne',
                symptome: "« Impossible de joindre l'imprimante » ou l'imprimante affichée « Hors ligne » dans la file d'attente ; rien ne sort, aucun message d'erreur du périphérique.",
                contexte: "Panne du top 3 des centres de services. Souvent le poste n'y est pour rien : file d'attente bloquée sur le serveur d'impression, ou spooler planté côté poste.",
                verifications: [
                    "Un seul utilisateur ou tout le service ? (un seul = poste ; tous = serveur d'impression ou imprimante).",
                    "L'imprimante répond-elle à un ping depuis le poste et depuis le serveur d'impression ?",
                    "Voyants de l'imprimante : papier, bourrage, toner, écran d'erreur physique."
                ],
                outils: "File d'attente Windows, services.msc (Spooler), gestion du serveur d'impression, page web de l'imprimante (http://IP_imprimante).",
                commandes: [
                    "Get-Printer -Name 'HP-RH-01' | fl Name, PortName, PrinterStatus",
                    "Test-NetConnection 10.1.1.50 -Port 9100   # port RAW d'impression",
                    "Restart-Service Spooler -Force",
                    "Remove-Item C:\\Windows\\System32\\spool\\PRINTERS\\* -Force   # vider la file (spooler arrêté)"
                ],
                diagnostic: [
                    "1. Tester le ping : OK → le réseau n'est pas en cause, continuer. KO → VLAN/passerelle de l'imprimante, ou imprimante éteinte/restartée avec une nouvelle IP (DHCP sans réservation).",
                    "2. Si ping OK : ouvrir la file d'attente — des documents en attente bloquent tout le monde ? Un document corrompu peut bloquer la file entière.",
                    "3. Vider la file et redémarrer le spooler du poste, puis du serveur d'impression si plusieurs utilisateurs sont touchés.",
                    "4. Imprimer une page de test depuis le panneau de l'imprimante : si elle sort, le matériel est sain — le problème est logiciel."
                ],
                causes: [
                    "File d'attente bloquée par un document corrompu (un seul job plante la file entière).",
                    "Spooler planté côté poste ou serveur.",
                    "Imprimante restartée avec nouvelle IP DHCP (sans réservation) : les postes pointent vers l'ancienne IP.",
                    "Serveur d'impression saturé ou service en échec."
                ],
                resolution: [
                    "Vider la file d'attente (arrêter spooler, supprimer les .SPL dans spool\\PRINTERS, redémarrer).",
                    "Re-créer le port d'impression si l'IP a changé, puis réinstaller une réservation DHCP pour l'imprimante.",
                    "Redémarrer le spooler du serveur d'impression si plusieurs utilisateurs ; informer avant de vider (les files en attente sont perdues)."
                ],
                prevention: "Réservation DHCP systématique pour chaque imprimante (IP fixe traçable). Redémarrage planifié du spooler sur le serveur d'impression en heures creuses. Surveillance de l'état des files dans la supervision.",
                casEntreprise: "Vendredi 17h : 8 tickets en 10 minutes pour la même imprimante RH. Le technicien crée un ticket père, constate le spooler du serveur en boucle de plantage après une màj de pilote. Rollback du pilote, purge de la file, redémarrage : tout repart. Un incident de masse = un problème d'infrastructure, pas 8 problèmes individuels."
            },
            {
                id: 'dep-lecteur-reseau', freq: 4, cat: 'Poste client', parcours: 'TSSR', titre: 'Lecteur réseau disparu',
                symptome: "Le lecteur Z: (dossier partagé) n'apparaît plus dans le poste de travail, ou apparaît avec une croix rouge « non connecté ».",
                contexte: "Le mappage vient d'une GPO (préférence) ou d'un script de connexion. La disparition soudaine après une session normale signale souvent un souci d'authentification ou de réseau au moment de l'ouverture.",
                verifications: [
                    "Le partage est-il accessible manuellement ? \\\\SRV-FILE01\\Partage dans l'explorateur.",
                    "Le service Workstation et le client DNS fonctionnent-ils ? (poste joint au domaine ?)",
                    "Autres lecteurs / autres utilisateurs touchés ? (distingue GPO cassée vs partage en panne)"
                ],
                outils: "Explorateur de fichiers, gpresult, GPMC (préférences de lecteurs mappés), journaux d'ouverture de session.",
                commandes: [
                    "net use   # liste des lecteurs mappés et leur état",
                    "net use Z: \\\\SRV-FILE01\\Partage /persistent:yes",
                    "Test-NetConnection SRV-FILE01 -Port 445",
                    "gpresult /R | findstr /i \"lecteur drive\""
                ],
                diagnostic: [
                    "1. Port 445 vers le serveur de fichiers : OK = le chemin est accessible, problème de mappage ; KO = réseau/serveur.",
                    "2. net use : le lecteur existe-t-il en « indisponible » ? Le reconstruire manuellement remarche-t-il ?",
                    "3. Si mappé par GPO : gpresult /R — la GPO s'applique-t-elle ? Les préférences de lecteur appliquées au redémarrage seulement (action Remplacer vs Mettre à jour) ?",
                    "4. Vérifier le droit NTFS : l'utilisateur a été retiré du groupe qui accède au partage ? (cause fréquente après réorganisation)"
                ],
                causes: [
                    "Ouverture de session hors réseau (utilisateur pressé, Wi-Fi non connecté) : mappage non établi.",
                    "GPO en action « Remplacer » exécutée au redémarrage seulement.",
                    "Utilisateur retiré du groupe de sécurité qui donne l'accès au partage (réorganisation).",
                    "Serveur de fichiers indisponible au moment de l'ouverture (redémarrage planifié qui dérape)."
                ],
                resolution: [
                    "Re-mapper manuellement pour dépanner l'utilisateur (net use Z:), puis corriger la cause.",
                    "Passer la préférence GPO en action « Mettre à jour » + « re-mapper à l'ouverture » pour tolérer les ouvertures hors-ligne.",
                    "Restaurer l'appartenance au groupe si le droit NTFS manquait (+ gpupdate /force, fermeture/réouverture de session)."
                ],
                prevention: "Préférences GPO en « Mettre à jour » plutôt que « Remplacer », item-level targeting par groupe, et supervision des partages critiques (port 445, espace disque du serveur).",
                casEntreprise: "Après réorganisation des services, 15 utilisateurs perdent le Z: : leur nouveau service n'a plus le groupe DL-Partage-RH. Le mappage GPO reste « appliqué » mais l'accès NTFS est refusé. Correction de l'appartenance des groupes, pas de la GPO : le symptôme réseau cache un problème d'annuaire."
            },
            {
                id: 'dep-profil-temporaire', freq: 4, cat: 'Poste client', parcours: 'TSSR', titre: "Profil temporaire (session « vous êtes connecté avec un profil temporaire »)",
                symptome: "Message « Vous êtes connecté avec un profil temporaire » à l'ouverture : le bureau est vide, les documents ont disparu, tout ce qui est créé sera perdu à la fermeture.",
                contexte: "Le poste ne peut pas charger le profil utilisateur (corruption ou conflit d'entrées dans la registry ProfileList). Toute sauvegarde faite dans la session temporaire sera PERDUE — prévenir l'utilisateur immédiatement.",
                verifications: [
                    "Le message exact à l'ouverture : « profil temporaire » et non « nouveau profil » (création suite à un renommage).",
                    "Le dossier C:\\Users\\nomutilisateur existe-t-il et son contenu est-il intact ?",
                    "Registry ProfileList : existe-t-il un doublon .bak de l'entrée du profil ?"
                ],
                outils: "regedit (HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList), explorateur de fichiers, compte admin local.",
                commandes: [
                    "reg query \"HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList\" /s /v ProfileImagePath",
                    "# repérer le SID de l'utilisateur (S-1-5-21-...) et un éventuel doublon .bak",
                    "wmic useraccount where name='jdupont' get sid"
                ],
                diagnostic: [
                    "1. Ne PAS laisser l'utilisateur travailler : tout est perdu à la fermeture. Sauvegarder ses données immédiatement (montage du disque, copie du profil).",
                    "2. Sous compte admin local : parcourir ProfileList, chercher le SID utilisateur : une entrée normale + une entrée .bak est le motif classique.",
                    "3. Si un .bak existe : renommer l'entrée normale en .old, retirer le suffixe .bak de la seconde (le .bak est souvent le profil sain).",
                    "4. Si le profil est réellement corrompu : recréer un profil propre et importer les données (dossiers, favoris, signatures)."
                ],
                causes: [
                    "Arrêt brutal du poste pendant une écriture du profil.",
                    "Conflit d'entrées registry (SID + SID.bak) après restauration d'image ou jointure au domaine en double.",
                    "Antivirus/quotas disque bloquant l'écriture du profil au chargement.",
                    "Profil itinérant dont le partage central est injoignable à l'ouverture (retombe en temporaire)."
                ],
                resolution: [
                    "Sauvegarder les données du profil AVANT toute manipulation (copie vers le serveur ou un disque externe).",
                    "Correction registry (renommage .old / suppression du .bak) puis redémarrer : la session se rouvre sur le profil original.",
                    "Si corrompu définitivement : renommer C:\\Users\\jdupont en .old, rouvrir la session (profil neuf créé), importer les données sauvegardées.",
                    "Redirection de dossiers (Documents/Bureau vers le serveur) pour que la prochaine corruption ne perde rien."
                ],
                prevention: "Redirection de dossiers par GPO (données hors du poste), OneDrive/known folder move, et surveiller les événements 1511/1515 (journal Application, User Profile Service) qui annoncent les chargements en échec.",
                casEntreprise: "Un commercial travaille toute une journée en profil temporaire : son rapport du jour, non sauvegardé ailleurs, est perdu à la fermeture. Le réflexe du support : dès le message « profil temporaire », ouvrir un ticket, faire sauvegarder immédiatement les documents en cours sur le serveur, PUIS traiter la corruption."
            },
            {
                id: 'dep-outlook', freq: 4, cat: 'Poste client', parcours: 'TSSR', titre: 'Outlook ne démarre plus',
                symptome: "Outlook se ferme aussitôt ouvert, affiche « Impossible de démarrer Outlook », « le fichier de données est introuvable » ou tourne en rond sur l'écran de démarrage.",
                contexte: "Messagerie = priorité perçue maximale par l'utilisateur : « je ne peux plus travailler ». Les causes se répartissent entre profil Outlook corrompu, fichier OST trop gros, complément fautif ou session Windows cassée.",
                verifications: [
                    "Outlook démarre-t-il en mode sans échec (outlook.exe /safe) ? Si oui → complément fautif.",
                    "La messagerie fonctionne-t-elle ailleurs (OWA/webmail, téléphone) ? Si oui → serveur sain, poste en cause.",
                    "Taille du fichier OST (C:\\Users\\x\\AppData\\Local\\Microsoft\\Outlook) : > 10 Go ?"
                ],
                outils: "Panneau de configuration → Courrier (profils), mode sans échec Outlook, scanpst/scanost, Gestionnaire des tâches.",
                commandes: [
                    "outlook.exe /safe",
                    "outlook.exe /resetnavpane",
                    "Get-ChildItem \"$env:LOCALAPPDATA\\Microsoft\\Outlook\\*.ost\" | Select Name, @{n='Go';e={[math]::Round($_.Length/1GB,1)}}"
                ],
                diagnostic: [
                    "1. /safe : Outlook ouvre → désactiver les compléments un par un (Fichier → Options → Compléments) et identifier le fautif.",
                    "2. /resetnavpane : répare le volet de navigation cassé (une cause fréquente de « Impossible de démarrer »).",
                    "3. OWA fonctionne ? Le problème est local au profil : recréer le profil Outlook (Panneau de config → Courrier → Afficher les profils → Nouveau).",
                    "4. OST corrompu/géant : le renommer en .old — Outlook le reconstruit au prochain démarrage (téléchargement long selon boîte)."
                ],
                causes: [
                    "Profil Outlook corrompu (cause n°1).",
                    "Complément (add-in) antivirus/CRM incompatible après mise à jour.",
                    "Fichier OST corrompu ou dépassant les limites.",
                    "Session Windows endommagée (coupler avec les symptômes profil)."
                ],
                resolution: [
                    "Recréer le profil Outlook (le compte se reconfigure automatiquement via AutoDiscover).",
                    "Désactiver/mettre à jour le complément fautif identifié en /safe.",
                    "OST : renommer en .old pour reconstruire ; archiver les anciens mails pour contenir la taille.",
                    "Dernier recours : réparation Office en ligne (Panneau de config → Programmes → Modifier → Réparation en ligne)."
                ],
                prevention: "Archivage des boîtes lourdes, mise à jour coordonnée des compléments avec Office, et communication : sauvegarder les signatures/nouveaux éléments locaux avant recréation de profil (éléments locaux non synchronisés perdus).",
                casEntreprise: "Après une màj d'Office de nuit, aucun Outlook n'ouvre dans le service RH : le complément CRM n'est pas compatible. /safe confirme le diagnostic en 2 minutes. Contournement : désactiver le complément le temps du correctif éditeur — 30 postes réparés par GPO plutôt qu'un par un."
            },
            {
                id: 'dep-navigateur', freq: 3, cat: 'Poste client', parcours: 'TSSR', titre: "Navigateur cassé (redirections, pop-ups, moteur de recherche modifié)",
                symptome: "Le navigateur redirige vers des moteurs inconnus, ouvre des pop-ups publicitaires, la page d'accueil est remplacée, ou des extensions inconnues s'installent seules.",
                contexte: "Typique d'un adware/PUP (potentially unwanted program) installé avec un téléchargement. La gravité va de la gêne au vol de mots de passe : traiter comme une compromission potentielle du poste.",
                verifications: [
                    "Extensions installées (chrome://extensions) : des entrées inconnues non désinstallables ?",
                    "Programmes récemment installés (Programmes et fonctionnalités, triés par date).",
                    "Navigateur seulement ou poste entier ralenti ? (indice d'infection plus large)"
                ],
                outils: "Paramètres du navigateur, Programmes et fonctionnalités, analyse antivirus, éventuellement ADWCleaner/outil corporate.",
                commandes: [
                    "Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Where-Object {$_.DisplayName -match 'tool|bar|cleaner'} | Select DisplayName, InstallDate",
                    "Get-Process chrome, msedge | measure   # avant/après nettoyage"
                ],
                diagnostic: [
                    "1. Identifier l'entrée de désinstallation du logiciel fautif (Programmes et fonctionnalités trié par date).",
                    "2. Supprimer les extensions inconnues du navigateur, réinitialiser la page d'accueil et le moteur par défaut.",
                    "3. Analyse antivirus complète : si des détections réelles (pas seulement PUP) → traitement comme incident de sécurité.",
                    "4. Vérifier les proxys configurés (paramètres réseau) : certains malwares redirigent par proxy local."
                ],
                causes: [
                    "Adware installé avec un logiciel gratuit (bundle).",
                    "Extension malveillante du magasin d'extensions.",
                    "Politique de navigateur détournée (registry Chrome/Edge Policies)."
                ],
                resolution: [
                    "Désinstaller le programme fautif, nettoyer extensions et paramètres, réinitialiser le navigateur si nécessaire.",
                    "Vider les proxys indésirables, analyser en profondeur, faire changer les mots de passe utilisés depuis ce poste si suspicion de vol.",
                    "Si récidive ou détection réelle : réimagerie propre du poste (jamais négocier avec un poste douteux)."
                ],
                prevention: "Contrôle applicatif (AppLocker/WDAC ou au minimum blocage des exécutables dans %TEMP%), sensibilisation aux bundles, navigateur géré par GPO (extensions imposées).",
                casEntreprise: "Le navigateur d'une assistante redirige vers un faux moteur. La désinstallation nettoie le symptôme, mais l'analyse AV trouve un keylogger : le poste est réimagé et les mots de passe changés en masse. Un « navigateur cassé » bénin en apparence peut cacher le pire — toujours analyser, jamais seulement nettoyer."
            },
            {
                id: 'dep-win-boot', freq: 2, cat: 'Poste client', parcours: 'TSSR', titre: 'Windows — le poste ne démarre plus (boucle de réparation)',
                symptome: "Le poste affiche « Préparation de la réparation automatique » en boucle, ou un écran bleu (INACCESSIBLE_BOOT_DEVICE) après une mise à jour ou un arrêt brutal.",
                contexte: "Poste Windows 10/11 joint au domaine, utilisateur bloqué sans aucune donnée accessible. Le support doit choisir entre réparation in-place et réimagerie.",
                verifications: [
                    "Le poste démarre-t-il en mode sans échec (WinRE → Paramètres de démarrage) ? Si oui, pilote/service en cause, pas disque.",
                    "BIOS : le disque est-il détecté ? (disque mort vs logiciel)",
                    "Un déploiement ou une màj récente a-t-il précédé la panne ?"
                ],
                outils: "Environnement de récupération Windows (WinRE), live USB Linux pour la récupération de données, WDS/MDT pour la réimagerie.",
                commandes: [
                    "sfc /scannow /offbootdir=C:\\ /offwindir=C:\\Windows",
                    "chkdsk C: /f",
                    "dism /image:C:\\ /get-packages   # liste des mises à jour récentes",
                    "bcdedit /set {default} recoveryenabled no   # sortir de la boucle pour tenter un démarrage normal"
                ],
                diagnostic: [
                    "1. Démarrer sur l'environnement de récupération (F11 ou 3 échecs de démarrage) → Dépannage → Options avancées.",
                    "2. Commande prompt : sfc /scannow hors ligne pour vérifier les fichiers système.",
                    "3. chkdsk C: /f si le système de fichiers est suspect (arrêt brutal, erreurs disque dans les journaux).",
                    "4. Désactiver la dernière mise à jour : dism /image:C:\\ /get-packages puis /remove-package sur le coupable."
                ],
                causes: [
                    "Mise à jour Windows interrompue ou incompatible (premier suspect si la panne suit un patch).",
                    "Pilote de stockage incompatible.",
                    "Secteur de démarrage ou système de fichiers endommagé (arrêt brutal).",
                    "Disque en fin de vie (bruits, erreurs SMART)."
                ],
                resolution: [
                    "Si une mise à jour récente est suspectée : désinstaller le dernier correctif cumulatif depuis les options avancées.",
                    "Si le système de fichiers est cassé : chkdsk puis redémarrage ; si récurrent, image disque à des fins d'analyse puis réimagerie via WDS/MDT (l'utilisateur récupère son profil depuis le serveur).",
                    "Ne jamais réinstaller sans avoir récupéré les données : monter le disque sur une autre machine ou via un live Linux et copier le profil utilisateur."
                ],
                prevention: "Sauvegarde régulière du profil (redirection Documents vers le serveur), points de restauration avant les mises à jour, et surveillance du disque (SMART) dans la supervision.",
                casEntreprise: "Un lundi matin, 12 postes d'un service bouclent sur la réparation automatique : la màj du vendredi soir touche un pilote SATA spécifique. Désinstallation du correctif via WinRE sur chaque poste (scriptée), blocage du déploiement du patch le temps du correctif éditeur. La fenêtre de report des màj existe pour ça."
            },
            // ==================== ACTIVE DIRECTORY / GPO ====================
            {
                id: 'dep-ad-login', freq: 5, cat: 'Active Directory / GPO', parcours: 'TSSR', titre: 'AD — un utilisateur ne peut plus se connecter',
                symptome: "Un utilisateur (ou un poste) ne peut plus ouvrir de session au domaine : « nom d'utilisateur ou mot de passe incorrect », « compte verrouillé », « La relation d'approbation entre la station et le domaine a échoué ».",
                contexte: "Fiche mère des pannes d'authentification : le message exact oriente vers des sous-causes très différentes (compte, mot de passe, canal sécurisé, DNS). Un seul utilisateur touché = compte ; un poste précis = canal sécurisé ; tout le monde = infrastructure.",
                verifications: [
                    "Lire le message EXACT (compte verrouillé ≠ mot de passe incorrect ≠ approbation).",
                    "Get-ADUser : Enabled, LockedOut, PasswordExpired, AccountExpirationDate.",
                    "Un autre utilisateur arrive-t-il à ouvrir une session sur LE MÊME poste ?"
                ],
                outils: "ADUC, PowerShell (module AD), journal Sécurité des DC (4625 : échecs avec motif), nltest.",
                commandes: [
                    "Get-ADUser jdupont -Properties Enabled,LockedOut,PasswordExpired,AccountExpirationDate",
                    "Unlock-ADAccount jdupont ; Set-ADUser jdupont -Enable $true",
                    "nltest /dsgetdc:lab.lan   # le poste trouve-t-il un DC ?",
                    "Reset-ComputerMachinePassword -Credential (Get-Credential)   # répare le canal sécurisé du poste"
                ],
                diagnostic: [
                    "1. État du compte : désactivé (arrivée/départ mal traitée), expiré, verrouillé, mot de passe expiré — traiter selon l'état.",
                    "2. Si « relation d'approbation » : le canal sécurisé poste↔DC est cassé (restore d'image, changement de nom, réplication) : Reset-ComputerMachinePassword ou réintégration au domaine.",
                    "3. Événements 4625 sur le DC : ils donnent le motif précis (mot de passe, verrouillage, heure) et la source.",
                    "4. Si tout un service échoue : vérifier DNS des postes et santé des DC (un DC saturé refuse tout le monde)."
                ],
                causes: [
                    "Compte désactivé/verrouillé/expiré (gestion des arrivées-départs).",
                    "Canal sécurisé cassé (poste restauré depuis une image, redondance de nom).",
                    "Heure du poste décalée > 5 min (Kerberos refuse : événement « horloge »).",
                    "DNS du poste pointant ailleurs que vers un DC : aucune découverte de domaine possible."
                ],
                resolution: [
                    "Réactiver/déverrouiller/réinitialiser selon l'état lu, et forcer le changement à la prochaine ouverture.",
                    "Canal sécurisé : Reset-ComputerMachinePassword depuis le poste (compte admin local) ou rejointure au domaine.",
                    "Heure : w32tm /resync, vérifier la hiérarchie NTP du domaine (le DC racine référence une source externe).",
                    "DNS : repointer le poste vers les DC par GPO (Set-DnsClientServerAddress) — jamais un DNS public en prioritaire sur un poste du domaine."
                ],
                prevention: "Procédure arrivée/départ formalisée (compte désactivé à J+0, pas supprimé avant 90 jours), GPO verrouillant les DNS des postes vers les DC, supervision de l'heure (w32tm) et des échecs 4625 en masse.",
                casEntreprise: "Un service entier ne peut plus se connecter un lundi : le routeur DHCP du segment distribue le DNS public 8.8.8.8 en prioritaire depuis un test de la semaine précédente. Les postes trouvent le domaine par FTP de nom mais pas les enregistrements SRV : échec Kerberos. Repoint des DNS par GPO d'urgence : tout rentre. Le symptôme « authentification » cachait un problème DHCP."
            },
            {
                id: 'dep-win-domaine', freq: 5, cat: 'Active Directory / GPO', parcours: 'TSSR', titre: 'Windows — « Aucun accès réseau » sur un poste joint au domaine',
                symptome: "Le poste affiche « Pas d'accès réseau » ou « Non connecté », l'utilisateur ne peut pas ouvrir une session du domaine (session locale seulement).",
                contexte: "Un seul poste est touché (les autres fonctionnent) : le problème est local au poste, pas au réseau d'infrastructure.",
                verifications: [
                    "ipconfig /all : adresse 169.254.x.x = échec DHCP ; sinon passerelle et DNS corrects ?",
                    "Voyant de lien sur la carte et le port du switch : câble débranché/sectionné ?",
                    "ping vers la passerelle : échec = couche locale (câble, pilote, VLAN du port)."
                ],
                outils: "ipconfig, Test-NetConnection, nltest, vue du port dans le switch.",
                commandes: [
                    "ipconfig /all",
                    "Test-NetConnection SRV-DC01.lab.lan -Port 445",
                    "nltest /dsgetdc:lab.lan",
                    "Restart-NetAdapter -Name 'Ethernet'"
                ],
                diagnostic: [
                    "1. ipconfig /all : présence d'une adresse 169.254.x.x = échec DHCP ; sinon passerelle et DNS corrects ?",
                    "2. ping vers la passerelle : échec = couche locale (câble, pilote, VLAN du port). Réussite = continuer.",
                    "3. Test du port 445 vers le DC : Test-NetConnection SRV-DC01.lab.lan -Port 445.",
                    "4. nltest /dsgetdc:lab.lan : trouve-t-il un contrôleur de domaine ? Un échec pointe le DNS ou le canal sécurisé."
                ],
                causes: [
                    "Câble/port switch désactivé ou en err-disable.",
                    "Pilote de carte réseau planté (mise à jour Windows).",
                    "Service DHCP qui ne répond pas sur ce segment, ou serveur DNS du poste mal pointé."
                ],
                resolution: [
                    "Adresse 169.254 : vérifier le switch (port en err-disable ?) puis relancer le DHCP (« ipconfig /release » puis « /renew »).",
                    "Carte suspecte : Restart-NetAdapter ou réinstaller le pilote.",
                    "Canal sécurisé cassé (« The trust relationship failed ») : retirer et réintégrer le poste au domaine, ou Reset-ComputerMachinePassword."
                ],
                prevention: "Surveiller les ports err-disable dans la supervision, verrouiller la configuration DHCP du segment, et provisionner un compte admin local de secours (LAPS) pour l'intervention hors domaine.",
                casEntreprise: "Un poste ne joint plus le domaine après le week-end : le port du switch est passé en err-disable (port-security) après le branchement d'un mini-switch personnel par l'utilisateur. Nettoyage du branchement, shutdown/no shutdown, retour à la normale. La cause était derrière la prise murale, pas dans AD."
            },
            {
                id: 'dep-win-gpo', freq: 4, cat: 'Active Directory / GPO', parcours: 'TSSR', titre: 'AD — une GPO ne s\'applique pas',
                symptome: "Une stratégie nouvellement créée (fond d'écran, lecteur mappé, interdiction USB) n'apparaît pas sur les postes cibles après gpupdate /force.",
                contexte: "Contexte de domaine classique : la GPO est créée dans GPMC mais reste invisible dans gpresult /R côté client.",
                verifications: [
                    "gpresult /R sur un poste cible : la GPO apparaît-elle dans « appliquées » ou « filtrées » (avec la raison) ?",
                    "La GPO est-elle liée à la bonne OU, au bon niveau (User vs Computer) ?",
                    "Security Filtering : « Utilisateurs authentifiés » présent ?"
                ],
                outils: "GPMC, gpresult, Gestion de l'AD ( OU cible), RSoP (jeu de stratégie résultant).",
                commandes: [
                    "gpupdate /force",
                    "gpresult /R",
                    "gpresult /H rapport.html   # rapport HTML détaillé, section 'Non appliqués' avec raisons",
                    "repadmin /replsummary   # la GPO est-elle répliquée sur tous les DC ?"
                ],
                diagnostic: [
                    "1. Sur le poste : gpresult /R — la GPO apparaît-elle dans « Objets de stratégie appliqués » ou dans « non appliqués » (avec la raison) ?",
                    "2. Vérifier le lien : la GPO est-elle liée à la bonne OU, et au bon niveau utilisateur OU ordinateur ?",
                    "3. Vérifier le Security Filtering : « Utilisateurs authentifiés » doit être présent (sauf ciblage de groupe précis).",
                    "4. Vérifier la réplication SYSVOL : repadmin /replsummary — une GPO créée sur DC1 peut ne pas encore exister sur DC2."
                ],
                causes: [
                    "GPO liée à la mauvaise OU ou au mauvais niveau (User/Computer inversé).",
                    "Ciblage WMI qui exclut le poste, héritage bloqué sur l'OU.",
                    "Security Filtering restrictif (groupe manquant).",
                    "Réplication SYSVOL pas encore effectuée entre DC."
                ],
                resolution: [
                    "Lier la GPO à la bonne OU et vérifier l'ordre des liens (le plus bas dans l'arborescence gagne).",
                    "Désactiver la configuration inutile (User ou Computer Settings) sur les GPO qui ne s'appliquent qu'à moitié — accélère le traitement.",
                    "Forcer l'héritage si une OU parente le bloque, ou utiliser « Enforced » sur la GPO de domaine si nécessaire."
                ],
                prevention: "Convention de nommage des GPO (COMPUTER-xxx / USER-xxx), commentaires GPMC systématiques, et un environnement de test (OU Pilote) avant la production.",
                casEntreprise: "Le paramètre du pare-feu créé lundi ne s'applique à aucun poste. gpresult /H révèle : « Accès refusé » — le Security Filtering ne contenait que le groupe Admins du domaine, les Utilisateurs authentifiés ayant été retirés « pour tester ». Réajout du groupe : application à la prochaine actualisation. Toujours vérifier le Filtering AVANT de blâmer la réplication."
            },
            {
                id: 'dep-ad-groupe', freq: 3, cat: 'Active Directory / GPO', parcours: 'TSSR', titre: 'AD — groupe absent ou membres manquants',
                symptome: "Des utilisateurs perdent l'accès à une ressource (partage, application) : le groupe qui portait le droit est vide, absent, ou ne contient plus les membres attendus.",
                contexte: "Typique après une réorganisation, un script de synchronisation des groupes défaillant, ou la suppression accidentelle d'un groupe. La « disparition » de droits se diagnostique toujours du côté des groupes de sécurité.",
                verifications: [
                    "Get-ADGroup : le groupe existe-t-il toujours ? (Scope, type sécurité vs distribution)",
                    "Get-ADGroupMember : les membres attendus sont-ils là ?",
                    "Le droit NTFS/partage pointe-t-il toujours vers ce groupe ? (onglet Sécurité de la ressource)"
                ],
                outils: "ADUC, PowerShell module AD, journal de modifications AD (événements de suppression d'objets si audit activé).",
                commandes: [
                    "Get-ADGroup GG-Compta -Properties GroupScope,GroupType",
                    "Get-ADGroupMember GG-Compta | Select Name,SamAccountName",
                    "Get-ADPrincipalGroupMembership jdupont   # groupes d'un utilisateur",
                    "Get-ADUser -Filter {MemberOf -notlike '*GG-Compta*'} -SearchBase 'OU=Compta,DC=lab,DC=lan'"
                ],
                diagnostic: [
                    "1. Le groupe existe : vérifier ses membres — vides ? partiellement vidés ?",
                    "2. Le groupe n'existe plus : chercher dans la corbeille AD (si le recycle bin AD est activé) ou dans les sauvegardes système AD.",
                    "3. Croiser avec l'audit : événements 4728/4729 (ajout/retrait de membre), 4730 (suppression de groupe) sur les DC.",
                    "4. Vérifier les groupes imbriqués : le droit porté par DL-X peut venir de GG-Y ajouté/retiré à un niveau supérieur."
                ],
                causes: [
                    "Script de synchronisation (AD ↔ application RH) qui a vidé le groupe (cause fréquente).",
                    "Réorganisation : OU déplacée, ciblage des GPO/préférences suivi le mouvement.",
                    "Suppression accidentelle et restauration partielle.",
                    "Imbrication de groupes mal reconstituée après migration."
                ],
                resolution: [
                    "Restaurer depuis la corbeille AD (Restore-ADObject) si activée — sinon restaurer l'objet depuis sauvegarde système AD (autoritaire sur un DC).",
                    "Re-peupler le groupe par script depuis la source de vérité (liste service RH, fichier, application).",
                    "Vérifier les droits NTFS de la ressource : si le groupe supprimé a été recréé, le SID a changé — les ACE doivent être refaites sur le nouveau groupe."
                ],
                prevention: "Activer la corbeille AD (une fois pour toutes : elle sauve des heures), documenter les groupes critiques (rôle, propriétaire, source des membres), et auditer les modifications des groupes de sécurité.",
                casEntreprise: "Suite à une synchronisation nocturne avec l'application RH, le groupe DL-Partage-Compta se vide à chaque pleine lune : le fichier d'export contenait un filtre erroné. Le ticket « accès refusé à 20 utilisateurs tous les lundis » se résout côté script RH, pas côté serveur de fichiers. Documenter la chaîne complète des groupes."
            },
            {
                id: 'dep-ad-kerberos', freq: 3, cat: 'Active Directory / GPO', parcours: 'TSSR', titre: 'AD — ouverture de session très lente ou échecs Kerberos',
                symptome: "Les utilisateurs mettent plusieurs minutes à ouvrir leur session, ou reçoivent « L'horloge du client et du serveur diffèrent » / erreurs Kerberos (événement 4 ou 7).",
                contexte: "Plusieurs postes touchés simultanément = problème d'infrastructure (heure, DNS ou réplication) ; un seul poste = problème local.",
                verifications: [
                    "w32tm /query /status sur le poste et le DC : écart d'heure ?",
                    "nslookup _ldap._tcp.lab.lan : les enregistrements SRV du domaine répondent-ils ?",
                    "repadmin /replsummary : la réplication AD est-elle saine ?"
                ],
                outils: "w32tm, nslookup, repadmin, journal KDC/kerberos des DC.",
                commandes: [
                    "w32tm /query /status ; w32tm /query /source",
                    "nslookup -type=SRV _ldap._tcp.lab.lan",
                    "repadmin /replsummary",
                    "klist purge   # côté poste, avant re-test"
                ],
                diagnostic: [
                    "1. Vérifier l'heure du poste et du DC : w32tm /query /status — un écart supérieur à 5 minutes casse Kerberos.",
                    "2. Tester le DNS : nslookup lab.lan doit retourner le DC ; nslookup _ldap._tcp.lab.lan teste les enregistrements SRV.",
                    "3. Vérifier la réplication AD : repadmin /replsummary sur un DC.",
                    "4. Purger les tickets Kerberos du poste : klist purge puis relancer la session."
                ],
                causes: [
                    "Désynchronisation horaire (source NTP absente du DC).",
                    "Poste pointant vers un DNS externe au lieu du DC.",
                    "Réplication AD en échec entre contrôleurs (sessions servies par un DC aveugle)."
                ],
                resolution: [
                    "Heure : configurer le DC racine comme source NTP fiable (w32tm /config /syncfromflags:domhier) et resynchroniser le poste (w32tm /resync).",
                    "DNS : repointer le client vers le DC via GPO ou Set-DnsClientServerAddress.",
                    "Réplication : corriger la cause (DNS entre DC, réseau inter-sites) puis repadmin /syncall /AdeP."
                ],
                prevention: "Surveiller l'écart d'horloge et l'état de réplication dans Zabbix (compteurs repadmin), et verrouiller la configuration DNS des postes par GPO (impossible de pointer ailleurs).",
                casEntreprise: "Sessions de 3 minutes sur tout un étage : le DC du site secondaire s'est arrêté sur batterie CMHS vide, son horloge a dérivé de 40 minutes en standby. Les postes servis par lui voient Kerberos refuser leurs tickets. Remplacement de la pile, resynchronisation, retour à la normale. L'heure est un service critique à superviser."
            },
            {
                id: 'dep-ad-replication', freq: 2, cat: 'Active Directory / GPO', parcours: 'TSSR', titre: 'AD — réplication entre contrôleurs en échec',
                symptome: "repadmin /replsummary affiche des erreurs, les créations d'objets mettent du temps à apparaître sur le second DC, ou des événements KCC (1867, 1311) s'accumulent dans le journal Directory Service.",
                contexte: "Panne silencieuse : rien ne « tombe » immédiatement, mais chaque divergence prépare des sessions incohérentes et des GPO fantômes. À traiter dès la première alerte, pas quand les utilisateurs le constatent.",
                verifications: [
                    "repadmin /replsummary : quelles partitions échouent, depuis combien de temps ?",
                    "Les DC se pinguent-ils ET se résolvent-ils mutuellement par DNS (enregistrements)?",
                    "Le service KCC et les liens inter-sites : dcdiag /v sur chaque DC."
                ],
                outils: "repadmin, dcdiag, journal Directory Service des DC, DNS.",
                commandes: [
                    "repadmin /replsummary",
                    "repadmin /showrepl   # détail par partition",
                    "dcdiag /v /c   # batterie de tests complète",
                    "repadmin /syncall /AdeP   # forcer la synchro après correction"
                ],
                diagnostic: [
                    "1. repadmin /replsummary : noter les partitions et l'ancienneté du dernier succès (> 24 h = incident).",
                    "2. Cause réseau : les DC se joignent sur les ports RPC dynamiques, Kerberos, LDAP, DNS — un pare-feu inter-sites restrictif est la cause n°1.",
                    "3. Cause DNS : chaque DC doit résoudre l'autre ET s'enregistrer correctement (vérifier les enregistrements CNAME des répliques).",
                    "4. dcdiag /v : tests de connectivité, KCC, publicité des services — le verdict complet."
                ],
                causes: [
                    "Pare-feu inter-sites bloquant les ports RPC/Kerberos/LDAP (cause n°1 en multi-site).",
                    "DNS mal configuré entre DC (chaque DC doit pointer vers un partenaire, jamais lui-même seul).",
                    "Un DC éteint/restauré depuis une image (USN rollback : à traiter en urgence).",
                    "Réseau WAN dégradé entre sites."
                ],
                resolution: [
                    "Ouvrir les ports requis entre DC (RPC 49152-65535 ou restreindre avec la réplication IP statique, Kerberos 88, LDAP 389/3268, DNS 53).",
                    "Corriger les pointeurs DNS mutuels, forcer repadmin /syncall /AdeP puis vérifier /replsummary propre.",
                    "USN rollback (DC restauré depuis snapshot) : NE PAS répliquer — dé-promouvoir, nettoyer les métadonnées, re-promouvoir."
                ],
                prevention: "Supervision repadmin quotidienne (alerte à la première divergence), jamais de snapshot/restore de DC virtuel (sauvegarde système AD uniquement), revue des règles pare-feu à chaque ajout de site.",
                casEntreprise: "Après la migration du pare-feu inter-sites, la réplication échoue silencieusement pendant 9 jours : les mots de passe changés sur DC2 n'existaient pas sur DC1. Les utilisateurs « perdaient » leur mot de passe selon le DC qui les servait. Ouverture des ports RPC dynamiques, syncall, semaine de divergence résorbée. Une réplication en échec n'est pas stable : c'est une bombe à retardement."
            },
            // ==================== DNS / DHCP ====================
            {
                id: 'dep-dns-resolution', freq: 5, cat: 'DNS / DHCP', parcours: 'AIS', titre: 'DNS — résolution de nom impossible',
                symptome: "« Le nom n\'a pas pu être résolu » : les sites ne s\'ouvvent pas par nom, les partages \\\\serveur\\partage échouent, mais le ping vers une IP directe (8.8.8.8) fonctionne.",
                contexte: "Le distinguo de base : ping IP OK + ping nom KO = DNS, sans discussion. Toute la suite vise à déterminer si le problème est le poste, le serveur DNS, ou l\'enregistrement lui-même.",
                verifications: [
                    "nslookup google.com depuis le poste : quelle réponse ? (timeout = serveur injoignable ; NXDOMAIN = le serveur répond mais ne connaît pas le nom)",
                    "ipconfig /all : quels serveurs DNS le poste utilise-t-il vraiment ?",
                    "Le problème touche un seul nom (enregistrement manquant) ou tous les noms (service/serveur DNS) ?"
                ],
                outils: "nslookup, Resolve-DnsName, ipconfig /flushdns, console DNS (dnsmgmt.msc), journaux du serveur DNS.",
                commandes: [
                    "nslookup google.com",
                    "Resolve-DnsName SRV-FILE01 -Type A",
                    "Resolve-DnsName -Name lab.lan -Type SRV   # enregistrements du domaine",
                    "ipconfig /flushdns",
                    "Get-DnsClientServerAddress   # quels DNS par interface"
                ],
                diagnostic: [
                    "1. nslookup avec IP directe du serveur DNS (nslookup google.com 10.1.1.10) : si ça répond, le serveur va bien — c\'est la configuration du poste qui est fausse.",
                    "2. Si le serveur ne répond pas : service DNS du serveur (Get-Service DNS), état du serveur, règle de pare-feu entrante UDP/TCP 53.",
                    "3. Si le serveur répond mais NXDOMAIN sur un nom INTERNE : l\'enregistrement existe-t-il dans la zone ? Vérifier la zone directe et la zone de recherche inversée (PTR).",
                    "4. Un seul poste : vider son cache (ipconfig /flushdns) et vérifier qu\'il n\'a pas un DNS public configuré (cause fréquente : intervenant précédent ayant mis 8.8.8.8 « pour tester »)."
                ],
                causes: [
                    "Poste configuré avec un DNS externe (8.8.8.8) au lieu du serveur interne : les noms internes ne résolvent jamais.",
                    "Service DNS arrêté ou bloqué par pare-feu (port 53).",
                    "Enregistrement A manquant ou obsolète (serveur renommé/re_IP sans mise à jour dynamique).",
                    "Cache DNS local pourri (réponse négative mise en cache)."
                ],
                resolution: [
                    "Repointer le poste vers les serveurs DNS internes (Set-DnsClientServerAddress -ServerAddresses 10.1.1.10,10.1.1.11), par GPO pour tout le parc.",
                    "Redémarrer le service DNS du serveur si arrêté ; ouvrir le port 53 si un pare-feu bloque.",
                    "Créer/corriger l\'enregistrement manquant dans la zone (A + PTR), vérifier que la mise à jour dynamique est autorisée (Secure uniquement) sur la zone.",
                    "ipconfig /flushdns côté poste après chaque correction (les caches gardent les erreurs)."
                ],
                prevention: "GPO imposant les DNS internes sur tous les postes du domaine, supervision du service DNS (test Resolve-DnsName sur des noms internes toutes les minutes), revue trimestrielle des enregistrements statiques obsolètes.",
                casEntreprise: "« Internet marche mais pas l\'intranet » : le nouveau routeur Wi-Fi invité distribue 8.8.8.8 en DNS, et les portables qui s\'y sont connectés gardent cette config sur le réseau filaire. Les noms internes ne résolvent plus alors que google.com répond. Repoint GPO des DNS : fin de l\'incident. Un DNS public sur un poste du domaine = perte de tout l\'interne."
            },
            {
                id: 'dep-dns-enregistrement', freq: 4, cat: 'DNS / DHCP', parcours: 'AIS', titre: 'DNS — enregistrement absent ou erroné (mauvais DNS configuré)',
                symptome: "Un nom interne précis ne résout pas (ou résout vers une mauvaise IP) alors que le reste fonctionne : nslookup SRV-APP01 renvoie NXDOMAIN ou une adresse périmée.",
                contexte: "L\'enregistrement a disparu ou n\'a jamais suivi un changement (serveur ré-IPé, renommé, restauré). Les postes eux-mêmes sont bien configurés : le problème est dans la zone DNS.",
                verifications: [
                    "Resolve-DnsName du nom en cause : NXDOMAIN (absent) ou IP erronée (obsolète) ?",
                    "L\'équipement concerné est-il en DHCP avec mise à jour dynamique, ou IP fixe avec enregistrement manuel ?",
                    "La zone intégrée à l\'AD est-elle répliquée sur tous les DC (repadmin) ?"
                ],
                outils: "Console DNS (dnsmgmt.msc), Resolve-DnsName, PowerShell DnsServer module, journal DNS du serveur.",
                commandes: [
                    "Resolve-DnsName SRV-APP01 -Server 10.1.1.10",
                    "Get-DnsServerZone ; Get-DnsServerRecord -ZoneName lab.lan -RRType A | Where-Object HostName -match 'APP01'",
                    "Add-DnsServerResourceRecordA -ZoneName lab.lan -Name SRV-APP01 -IPv4Address 10.1.20.15 -CreatePtr",
                    "ipconfig /registerdns   # côté le serveur concerné : ré-enregistre son nom"
                ],
                diagnostic: [
                    "1. Vérifier l\'enregistrement dans la zone : présent ? IP correcte ? champ Timestamp (les enregistrements dynamiques avec vieillesse > vieillissement sont susceptibles d\'être nettoyés) ?",
                    "2. Vieillissement/nettoyage (aging/scavenging) : un enregistrement dynamique non rafraîchi est effacé automatiquement — c\'est sain, sauf si le serveur ne ré-enregistre pas (service client DNS, case « enregistrer les adresses » décochée).",
                    "3. Doublon : deux enregistrements A pour le même nom avec des IP différentes (round-robin) envoient la moitié des requêtes vers un serveur mort.",
                    "4. Zone de recherche inversée : le PTR manquant casse certaines applications (authentification Kerberos par reverse, logs illisibles)."
                ],
                causes: [
                    "Vieillissement DNS qui a purgé un enregistrement jamais ré-enregistré par le serveur concerné.",
                    "Serveur ré-IPé/restarté en DHCP : nouvelle IP non enregistrée (mise à jour dynamique désactivée sur la carte).",
                    "Restauration d\'un serveur avec un enregistrement périmé jamais corrigé.",
                    "Réservation DHCP sans mise à jour DNS associée."
                ],
                resolution: [
                    "Créer/recréer l\'enregistrement (A + PTR) — fixe pour un serveur, dynamique pour un client.",
                    "Côté serveur concerné : ipconfig /registerdns et vérifier « Enregistrer les adresses de cette connexion dans DNS » coché sur la carte.",
                    "Nettoyer les doublons (round-robin involontaire) : ne laisser que l\'IP active.",
                    "Pour les serveurs : préférer une réservation DHCP + enregistrement DNS dynamique sécurisé, ou IP fixe + enregistrement A/PTR manuel documenté."
                ],
                prevention: "Règle simple : tout changement d\'IP d\'un serveur = checklist DNS (A, PTR, CNAME dépendants, SPN Kerberos). Superviser les noms critiques par Resolve-DnsName périodique (alerte si NXDOMAIN ou changement d\'IP inattendu).",
                casEntreprise: "Une application interne tombe un mardi : SRV-APP01 résout vers 10.1.20.15... son IP de l\'an dernier. Le serveur a été ré-IPé en janvier, l\'ancien enregistrement restant en round-robin avec le nouveau : une requête sur deux partait dans le vide. Suppression de l\'ancien A : application restaurée. Le round-robin involontaire est une panne à 50 %."
            },
            {
                id: 'dep-net-dhcp', freq: 5, cat: 'DNS / DHCP', parcours: 'AIS', titre: 'DHCP — postes en 169.254.x.x (adresse APIPA, pas de bail)',
                symptome: "Un ou plusieurs postes affichent une adresse 169.254.x.x (APIPA) et ne joignent ni le LAN ni Internet. Windows affiche « Réseau non identifié ».",
                contexte: "L\'APIPA est l\'auto-adressage de secours du poste quand aucune réponse DHCP n\'arrive : c\'est le symptôme, pas la panne. La panne est en amont :Discover émis, personne ne répond.",
                verifications: [
                    "Un seul poste ou tout un segment ? (poste = carte/câble ; segment = serveur/relais/VLAN)",
                    "Le port du switch est-il up et dans le bon VLAN ? (show interfaces status)",
                    "Le serveur DHCP a-t-il des baux libres dans l\'étendue ? (Get-DhcpServerv4ScopeStatistics)"
                ],
                outils: "ipconfig, console DHCP Windows (dhcpmgmt.msc), vue des ports du switch, capture Wireshark (SPAN) si besoin.",
                commandes: [
                    "ipconfig /release ; ipconfig /renew",
                    "Get-DhcpServerv4ScopeStatistics   # % utilisé par étendue",
                    "Get-DhcpServerv4Lease -ScopeId 192.168.10.0 | measure",
                    "show ip dhcp binding / show ip dhcp pool   # sur routeur Cisco"
                ],
                diagnostic: [
                    "1. Autres postes du même segment touchés ? Croiser avec la supervision : un étage entier = infra, un poste = local.",
                    "2. Le port du switch est-il up et dans le bon VLAN ? Un poste branché dans le VLAN de voix (pas de pool) reste en APIPA.",
                    "3. Le serveur DHCP tourne-t-il, est-il autorisé dans l\'AD (un serveur DHCP non autorisé refuse de distribuer), l\'étendue a-t-elle des baux libres ?",
                    "4. Segment distant : le relais existe-t-il ? (ip helper-address sur l\'interface du routeur) — sans relais, les broadcasts Discover ne franchissent pas le routeur, jamais.",
                    "5. Capturer la trame Discover en SPAN si tout semble bon : le poste émet-il ? le serveur répond-il ? Une réponse Offer bloquée par un pare-feu se voit ici."
                ],
                causes: [
                    "Étendue saturée (pool épuisé : nouveaux arrivants en APIPA, anciens baux fonctionnent encore).",
                    "Serveur DHCP arrêté ou non autorisé dans l\'AD.",
                    "Relais absent sur le routeur d\'un segment distant (ip helper-address manquant).",
                    "Mauvais VLAN sur le port (le pool correspond au sous-réseau du VLAN : VLAN erroné = mauvaise étendue ou aucune).",
                    "Service/cartouche de la carte réseau : lease bloqué côté poste (ipconfig /renew suffit alors)."
                ],
                resolution: [
                    "Étendue saturée : réduire le bail (8 jours → 4 h en environnement tournant), étendre la plage, ou exclure définitivement le problème d\'adressage par élagage des baux morts.",
                    "Relais absent : ip helper-address <IP serveur> sur l\'interface du routeur du segment client.",
                    "Serveur : démarrer le service, l\'autoriser dans l\'AD (Authorize), vérifier l\'option 003 (passerelle) et 006 (DNS) de l\'étendue.",
                    "Poste seul : ipconfig /release + /renew, sinon Restart-NetAdapter ; en dernier recours réinstaller le pilote."
                ],
                prevention: "Alerte supervision à 85-90 % d\'occupation d\'étendue, durées de bail ajustées à la rotation réelle du parc, et documentation de chaque VLAN ↔ étendue ↔ relais (le plan d\'adressage est la carte du réseau).",
                casEntreprise: "Un open space de 40 postes passe en APIPA un lundi matin : l\'étendue 192.168.30.0/24 (253 baux) est saturée par les téléphones et 30 portables invités branchés pendant l\'événement de la semaine passée. Bails 8 jours = les adresses restent prises. Passage du bail à 6 h et exclusion des IP statiques : tout le monde récupère une adresse en 10 minutes."
            },
            {
                id: 'dep-dhcp-pool', freq: 3, cat: 'DNS / DHCP', parcours: 'AIS', titre: 'DHCP — bail expiré ou pool épuisé (nouveaux postes sans adresse)',
                symptome: "Les postes déjà connectés fonctionnent, mais les nouveaux arrivants (ou les retours de veille prolongée) restent en APIPA ; l\'étendue affiche 100 % d\'attribution.",
                contexte: "La panne lente : le pool s\'est rempli progressivement (durée de bail excessive, équipements oubliés, invités). Elle éclate le jour où le poste du nouveau collaborateur n\'obtient rien.",
                verifications: [
                    "Get-DhcpServerv4ScopeStatistics : pourcentage utilisé par étendue, nombre de baux libres.",
                    "Lister les baux : combien d\'adresses pour des machines inconnues/invités ? (Get-DhcpServerv4Lease)",
                    "La durée du bail est-elle adaptée ? (8 jours par défaut, adapté à un parc stable, pas à un parc tournant)"
                ],
                outils: "Console DHCP, PowerShell DHCPServer module, inventaire du parc (GLPI) pour croiser les MAC.",
                commandes: [
                    "Get-DhcpServerv4ScopeStatistics",
                    "Get-DhcpServerv4Lease -ScopeId 192.168.30.0 | Group-Object LeaseExpiryTime | sort Count -desc | select -First 5",
                    "Set-DhcpServerv4Scope -ScopeId 192.168.30.0 -LeaseDuration 6:00:00",
                    "Remove-DhcpServerv4Lease -ScopeId 192.168.30.0 -ClientId XX-XX-...   # libérer un bail fantôme"
                ],
                diagnostic: [
                    "1. Compter : baux alloués vs taille du pool — la marge restante dit si c\'est une saturation franche ou une erreur d\'exclusion (plage d\'exclusion trop large qui a mangé le pool).",
                    "2. Identifier les baux fantômes : MAC inconnues de l\'inventaire, équipements invités partis depuis longtemps, Machines virtuelles de test éteintes gardant leur bail.",
                    "3. Vérifier les exclusions : une exclusion 192.168.30.1-192.168.30.200 ne laisse que 53 adresses — erreur classique de configuration initiale.",
                    "4. Vérifier la durée du bail vs rotation réelle du parc (bail 8 jours + événements hebdomadaires = saturation garantie)."
                ],
                causes: [
                    "Durée de bail excessive au regard de la rotation du parc (invités, téléphones, VM).",
                    "Plage d\'exclusion trop large mal configurée à l\'origine.",
                    "Baux fantômes (équipements disparus jamais libérés).",
                    "Sous-réseau trop petit (/26 = 62 adresses pour un étage qui a grandi)."
                ],
                resolution: [
                    "Réduire la durée du bail pour accélérer le recyclage naturel (attention : trop court = charge DHCP accrue et coupures aux renouvellements).",
                    "Purger les baux fantômes identifiés (Remove-DhcpServerv4Lease) pour libérer immédiatement.",
                    "Corriger les exclusions, étendre la plage si le plan d\'adressage le permet, ou re-sous-réseauter le segment (/24 → /23).",
                    "Repasser les postes en échec : ipconfig /renew une fois le pool dégagé."
                ],
                prevention: "Supervision du remplissage des étendues (alerte 85 %), revue trimestrielle des baux actifs croisée avec l\'inventaire, et durée de bail définie par type de population (visiteurs : 1-2 h ; collaborateurs : 2-8 jours).",
                casEntreprise: "Le pool /26 du réseau invités (62 adresses) sature à chaque salon : les bails de 8 jours gardent les adresses des visiteurs partis. Bail à 2 h pour l\'étendue invités : saturation impossible par construction. Le dimensionnement DHCP est une décision métier, pas juste technique."
            },
            // ==================== LINUX (serveur) ====================
            {
                id: 'dep-linux-ssh', freq: 4, cat: 'Linux (serveur)', parcours: 'AIS', titre: 'Linux — SSH inaccessible (connexion refusée / timeout)',
                symptome: "ssh user@serveur échoue : « Connection refused » (le port est fermé/le service écoute ailleurs), « Connection timed out » (filtré ou réseau), ou « Permission denied » (authentification). Chaque message est un diagnostic différent.",
                contexte: "Serveur Linux distant : l\'accès physique est rare, SSH est souvent la SEULE porte. Une fausse manipulation sur sshd_config peut verrouiller le serveur — toujours garder une session ouverte en testant une nouvelle config.",
                verifications: [
                    "Le message exact : refused (port fermé) ≠ timeout (filtré/routage) ≠ permission denied (authentification).",
                    "Le serveur répond-il au ping ? (s\'il répond : réseau OK, problème sshd)",
                    "Depuis le serveur (console IPMI/VM) : systemctl status sshd ; ss -tlnp | grep :22."
                ],
                outils: "ssh -v (mode verbeux), ss/netstat, systemctl, console de secours (IPMI, VM console, cloud serial console).",
                commandes: [
                    "ssh -v user@10.1.1.20   # chaque étape du handshake s'affiche",
                    "systemctl status sshd",
                    "ss -tlnp | grep -E ':22|sshd'   # sur quel port et quelle adresse écoute-t-il ?",
                    "journalctl -u sshd -n 20 --no-pager",
                    "test de port depuis le client : Test-NetConnection 10.1.1.20 -Port 22"
                ],
                diagnostic: [
                    "1. Connection refused : le service écoute-t-il ? ss -tlnp : sshd doit écouter 0.0.0.0:22 (ou l\'IP attendue). Une config ListenAddress erronée ou un Port changé explique le refused.",
                    "2. Connection timed out : réseau/pare-feu — tracer le chemin (ping, traceroute), vérifier iptables/nftables et firewalld sur le serveur (état, zones), et le pare-feu réseau sur le chemin.",
                    "3. Permission denied : journalctl -u sshd côté serveur : PasswordAuthentication désactivé (clés uniquement) ? compte verrouillé ? AllowUsers/DenyUsers qui exclut l\'utilisateur ?",
                    "4. Après un changement de config : toujours tester avec une session active en réserve — sshd -t valide la syntaxe AVANT reload."
                ],
                causes: [
                    "sshd arrêté ou en échec après une modification de configuration (syntaxe cassée).",
                    "Pare-feu (firewalld/iptables/ufw ou réseau) qui bloque le port 22.",
                    "PasswordAuthentication no avec clé absente/expirée côté client (après un durcissement).",
                    "Serveur épuisé (disque plein, mémoire) : sshd refuse les nouvelles sessions — voir fiche disque plein.",
                    "Fail2ban qui a banni l\'IP du technicien (après plusieurs échecs)."
                ],
                resolution: [
                    "Refused : corriger Port/ListenAddress dans sshd_config, valider avec sshd -t, systemctl restart sshd (session de réserve ouverte).",
                    "Timeout : ouvrir le port dans le pare-feu adéquat (firewall-cmd --add-service=ssh --permanent ; --reload) et vérifier le pare-feu réseau.",
                    "Permission denied : réactiver temporairement PasswordAuthentication depuis la console de secours, ou déployer la clé du technicien ; vérifier fail2ban (fail2ban-client status sshd, unbanip).",
                    "Prévenir le verrouillage : garder TOUJOURS une session ouverte quand on touche sshd ou un pare-feu."
                ],
                prevention: "Deux accès indépendants avant tout changement (SSH + console IPMI/VM), validation sshd -t systématique avant reload, clés SSH avec passphrase déployées et mots de passe désactivés en connaissance de cause, fail2ban avec whitelist des IPs d\'administration.",
                casEntreprise: "Un durcissement sécurité (PasswordAuthentication no) est appliqué par Ansible sur 40 serveurs... sans que les clés soient déployées partout : 7 serveurs deviennent inaccessibles en SSH. Récupération par console VM, déploiement des clés, puis ré-application du durcissement. Toute modification d\'accès à distance se teste sur UN serveur d\'abord, avec porte de secours."
            },
            {
                id: 'dep-linux-permission', freq: 4, cat: 'Linux (serveur)', parcours: 'AIS', titre: 'Linux — « Permission denied » (permissions, propriétaire, sudo)',
                symptome: "L\'utilisateur ne peut pas lire/écrire un fichier, exécuter une commande, ou accéder à un répertoire : « Permission denied » dans le terminal ou dans l\'application.",
                contexte: "Sous Linux, chaque refus a une raison précise : le couple propriétaire:groupe, les bits rwx, le droit de traversée des répertoires parents, ou l\'absence de règle sudo. Lire la situation avant de chmod à l\'aveugle.",
                verifications: [
                    "ls -l sur le fichier : propriétaire, groupe, bits ?",
                    "Qui suis-je vraiment : id (groupes effectifs) — le groupe attendu est-il bien là ?",
                    "Le chemin parent est-il traversable ? (un droit x manque souvent sur un répertoire parent, pas sur le fichier lui-même)"
                ],
                outils: "ls -l, namei -l (déroule les permissions de tout le chemin), id, sudo -l, getfacl.",
                commandes: [
                    "ls -l /srv/app/config.yml ; id",
                    "namei -l /srv/app/config.yml   # permissions de CHAQUE niveau du chemin",
                    "sudo -l   # que l'utilisateur a-t-il le droit de faire ?",
                    "getfacl /srv/app/config.yml   # ACL étendues éventuelles",
                    "ls -Z /srv/app/   # contexte SELinux (RHEL/CentOS)"
                ],
                diagnostic: [
                    "1. ls -l : comparer propriétaire/groupe avec id de l\'utilisateur. rwx se lit : lecture=4, écriture=2, exécution=1, pour propriétaire/groupe/autres.",
                    "2. namei -l : le droit x manque-t-il sur un répertoire parent ? Sans x sur /srv/app, aucun fichier en dessous n\'est accessible quel que soit son propre chmod.",
                    "3. Sudo : la commande échoue-t-elle en sudo (règle sudoers absente) ou en direct (permissions fichier) ? sudo -l liste les droits réels.",
                    "4. Sur RHEL/CentOS avec SELinux enforcing : ls -Z et les dénis dans /var/log/audit/audit.log — un chmod correct ne suffit pas si le contexte SELinux est faux (cas typique : fichier déplacé au lieu d\'être copié)."
                ],
                causes: [
                    "Propriétaire/groupe incorrects (fichier créé par root, application attend un utilisateur service).",
                    "Bit x manquant sur un répertoire parent (traversée impossible).",
                    "Règle sudo manquante ou mal orthographiée dans sudoers (utilisateur, commande, hôte).",
                    "Contexte SELinux erroné (fichier déplacé depuis /tmp vers /var/www).",
                    "Umask restrictif à la création (application qui crée des fichiers 600 alors qu\'un autre processus doit les lire)."
                ],
                resolution: [
                    "Corriger le propriétaire et le groupe : chown appuser:appgroup /srv/app/config.yml — la cible est l\'utilisateur du SERVICE, pas le technicien.",
                    "Ajouter le x aux répertoires du chemin : chmod o+x /srv/app (minimum requis pour la traversée).",
                    "sudo : éditer avec visudo uniquement — règle du moindre privilège (commande précise, pas ALL).",
                    "SELinux : restorecon -v /var/www/html/index.html pour réappliquer le contexte attendu de la destination.",
                    "Ne JAMAIS résoudre par chmod 777 : c\'est masquer le problème en créant une faille de sécurité."
                ],
                prevention: "Convention des droits par service (utilisateur dédié par application, umask défini dans le service), revue des règles sudo (visudo -c en validation de config), et éviter chmod récursif à l\'aveugle : namei -l d\'abord, chmod ciblé ensuite.",
                casEntreprise: "Une application web ne lit plus ses fichiers après une mise à jour déployée en scp : les nouveaux fichiers appartiennent à root:root en 600. Le service (utilisateur www-data) n\'y a pas accès. Correction : chown -R www-data:www-data /var/www/app && chmod -R g+rX — l\'application repart. scp/tar en root est la première source de permissions cassées en déploiement."
            },
            {
                id: 'dep-linux-service', freq: 4, cat: 'Linux (serveur)', parcours: 'AIS', titre: 'Linux — un service ne démarre plus',
                symptome: "« systemctl status nginx » (ou tout autre service) retourne « failed » après une mise à jour ou une modification de configuration.",
                contexte: "Serveur Linux Debian/RHEL en production ; la fenêtre d\'intervention est courte, il faut restaurer le service vite mais proprement.",
                verifications: [
                    "systemctl status <service> : le DERNIER message d\'erreur (souvent explicite : file not found, permission denied, bind: address already in use).",
                    "journalctl -u <service> -n 30 : historique détaillé des échecs.",
                    "df -h et ls -l sur les fichiers référencés : disque plein ? permissions ?"
                ],
                outils: "systemctl, journalctl, testeurs de syntaxe par logiciel (nginx -t, sshd -t...), ss.",
                commandes: [
                    "systemctl status nginx --no-pager",
                    "journalctl -u nginx -n 30 --no-pager",
                    "nginx -t ; sshd -t ; named-checkconf   # valider la config avant restart",
                    "ss -tulpn | grep :80   # le port est-il déjà pris ?"
                ],
                diagnostic: [
                    "1. systemctl status : lire le dernier message — la cause est souvent écrite noir sur blanc (syntax error line X, address already in use, permission denied).",
                    "2. journalctl -u : l\'historique montre si le service échouait déjà avant (dégradation lente) ou depuis un événement précis (màj, déploiement).",
                    "3. Tester la syntaxe de la configuration si l\'outil le permet : nginx -t, sshd -t, named-checkconf, apachectl configtest.",
                    "4. Vérifier l\'espace disque et les permissions : df -h, ls -l sur les fichiers référencés (cert, log, socket)."
                ],
                causes: [
                    "Erreur de syntaxe introduite dans la configuration (première cause après un déploiement).",
                    "Port déjà occupé par un autre processus.",
                    "Permissions incorrectes sur un fichier (certificat, socket).",
                    "Disque plein qui empêche l\'écriture des logs/pid."
                ],
                resolution: [
                    "Restaurer la sauvegarde de configuration (fichier.bak) puis redémarrer : le service revient, et on corrige ensuite en testant la nouvelle conf.",
                    "Port occupé : ss -tulpn | grep <port> identifie le processus ; l\'arrêter ou changer le port.",
                    "Disque plein : purger les journaux (journalctl --vacuum-size=100M) ou les fichiers volumineux, puis relancer."
                ],
                prevention: "Toujours « cp conf conf.bak » avant modification, tester la config avant le restart, et mettre en place une alerte Zabbix sur les services critiques (systemd unit failed).",
                casEntreprise: "Après un déploiement nocturne, le serveur web ne répond plus. nginx -t répond « syntax error line 42 » : un point-virgule manquant dans le virtualhost ajouté. Correction en 30 secondes parce que l\'équipe valide TOUJOURS la config avant le restart — sans ce réflexe, même cause, mais 2 heures de diagnostic nocturne."
            },
            {
                id: 'dep-linux-disk', freq: 4, cat: 'Linux (serveur)', parcours: 'AIS', titre: 'Linux — disque plein, services en échec',
                symptome: "Plusieurs services échouent simultanément (base de données, SSH ne peut plus écrire), les journaux montrent « No space left on device ».",
                contexte: "Incident classique de fin de semaine : un fichier ou un journal a saturé une partition. Diagnostic rapide exigé.",
                verifications: [
                    "df -h : quelle partition est pleine ? (souvent /, /var ou un filesystem dédié)",
                    "du -h --max-depth=1 /var | sort -h : quel répertoire gonfle ?",
                    "lsof +L1 : fichiers supprimés mais encore ouverts (l\'espace n\'est libéré qu\'au restart du processus)"
                ],
                outils: "df, du, lsof, journalctl --vacuum, ncdu (si présent) pour l\'exploration interactive.",
                commandes: [
                    "df -h",
                    "du -h --max-depth=2 /var | sort -hr | head -15",
                    "lsof +L1",
                    "journalctl --vacuum-size=100M",
                    "lvextend -r -L +5G /dev/vg/lv   # si LVM et espace disponible"
                ],
                diagnostic: [
                    "1. df -h : identifier la partition pleine (souvent / ou /var).",
                    "2. du -h --max-depth=1 /var | sort -h : descendre jusqu\'au répertoire coupable.",
                    "3. lsof +L1 : fichiers supprimés mais encore ouverts par un processus (l\'espace n\'est libéré qu\'au restart du processus).",
                    "4. Cas piège : df montre 100 % mais du ne retrouve pas l\'espace → fichiers supprimés encore ouverts (étape 3) ou inodes épuisés (df -i)."
                ],
                causes: [
                    "Journaux sans rotation (logrotate absent/cassé).",
                    "Sauvegardes locales oubliées, dumps de base de données qui s\'accumulent.",
                    "Core dumps après crashs répétés d\'un process.",
                    "Fichiers supprimés mais encore ouverts par un service (df plein, du normal).",
                    "Inodes épuisées (df -i plein avec df -h normal : des millions de petits fichiers)."
                ],
                resolution: [
                    "Purger les journaux : journalctl --vacuum-size=100M et vérifier logrotate.",
                    "Fichier supprimé encore ouvert : systemctl restart <service> libère l\'espace.",
                    "Extension LVM si possible : lvextend -r -L +5G /dev/vg/lv — la panne ne repart pas tant que la cause n\'est pas traitée.",
                    "Inodes : identifier le répertoire aux millions de fichiers (find / -xdev -size +100k est inutile : du --inode) et le nettoyer à la racine du problème (sessions PHP anciennes, files de messages)."
                ],
                prevention: "Alerte Zabbix à 85 % d\'occupation par partition, logrotate vérifié à l\'installation, quota sur les répertoires d\'upload, et partitions séparées pour /var (un log fou ne tue pas la racine).",
                casEntreprise: "Un serveur applicatif tombe un dimanche : /var/log fait 90 Go — l\'application logue en boucle depuis un bug de vendredi. df pointe la partition, du trouve le fichier, journalctl --vacuum-time=2d dégage 85 Go. La vraie correction suit le lundi : corriger la boucle de log, pas seulement vider."
            },
            // ==================== RÉSEAU / SAUVEGARDE ====================
            {
                id: 'dep-net-lenteur', freq: 4, cat: 'Réseau / Sauvegarde', parcours: 'AIS', titre: 'Réseau — lenteur sur un lien (duplex, câble, saturation)',
                symptome: "Les transferts de fichiers sont lents sur un segment, des erreurs CRC montent sur les compteurs d'interface, les utilisateurs parlent de « réseau qui coupe ».",
                contexte: "La lenteur chronique est plus fréquente que la panne franche : elle ne déclenche pas d'alerte et dure parfois des mois.",
                verifications: [
                    "show interfaces (Cisco) : les compteurs CRC / late collisions / input errors montent-ils ?",
                    "show interfaces status : vitesse et duplex des DEUX extrémités identiques ?",
                    "show interfaces summary : le lien est-il saturé en continu (saturation ≠ panne) ?"
                ],
                outils: "Compteurs d'interface du switch, iperf3 pour mesurer le débit réel, supervision de la bande passante.",
                commandes: [
                    "show interfaces Gi0/1   # CRC, late collisions, input errors",
                    "show interfaces status   # speed/duplex par port",
                    "clear counters Gi0/1   # remettre à zéro et observer la progression",
                    "iperf3 -s   # côté serveur ; iperf3 -c <IP> côté client"
                ],
                diagnostic: [
                    "1. Compteurs d'erreurs : CRC, late collision, input errors qui montent = couche 1/2. Remettre à zéro (clear counters) puis relire : c'est la PROGRESSION qui signe la panne, pas le total historique.",
                    "2. Vitesse et duplex des deux extrémités : un côté full, l'autre half = mismatch (le côté full ne détecte pas les collisions de l'autre : erreurs CRC unilatérales).",
                    "3. Charge du lien : saturation à 100 % en continu = débit à ajouter (agrégation, 10G), pas une panne à réparer.",
                    "4. iperf3 entre deux machines du segment : isole le lien des applications — 940 Mbps attendus en 1G full."
                ],
                causes: [
                    "Câble endommagé ou trop long (> 100 m cuivre), connecteur oxydé.",
                    "Duplex mal négocié (un côté forcé, l'autre auto).",
                    "Lien saturé par un flux légitime mal planifié (sauvegarde en journée).",
                    "Carte réseau défaillante d'un côté (erreurs d'un seul port)."
                ],
                resolution: [
                    "Forcer le duplex identique des deux côtés (ou laisser Auto partout — jamais un mélange), remplacer le câble/patch cord.",
                    "Saturation : déplacer les sauvegardes la nuit, mettre en place QoS, ou passer le lien en EtherChannel/agrégation.",
                    "Mise à niveau du lien (1G → 10G) si le monitoring montre une croissance continue."
                ],
                prevention: "Superviser les erreurs CRC et la bande passante par interface dans Zabbix, et documenter le câblage à chaque intervention. Une lenteur qui dure depuis « toujours » est une panne invisible : les compteurs la révèlent en 2 minutes.",
                casEntreprise: "Un service se plaint d'un réseau lent depuis 6 mois. Le port du switch affiche 3000 CRC et des late collisions : le duplex est forcé full côté switch, laissé auto côté serveur (qui négocie half). Alignement des deux côtés : débit multiplié par 10 instantanément. La panne chronique n'existe que faute de lire les compteurs."
            },
            {
                id: 'dep-sauvegarde-veeam', freq: 3, cat: 'Réseau / Sauvegarde', parcours: 'TSSR', titre: 'Sauvegarde — job Veeam en échec toutes les nuits',
                symptome: "Le job de sauvegarde Veeam échoue avec « Processing VM Error: Failed to create snapshot » ou des erreurs de connexion à l'hyperviseur.",
                contexte: "La sauvegarde est la dernière ligne de défense : un job qui échoue trois nuits de suite doit être traité comme un incident majeur, pas comme un « avertissement ».",
                verifications: [
                    "Lire le rapport du job dans la console Veeam : quelle VM, quelle étape (snapshot ? transfert ? repository ?).",
                    "Espace du datastore (VMware) ou du volume checkpoints (Hyper-V) pour le snapshot.",
                    "Credentials : mot de passe du compte d'administration expiré après un changement ?"
                ],
                outils: "Console Veeam (rapports de job), vSphere/Hyper-V Manager (datastores, snapshots), gestionnaire de credentials.",
                commandes: [
                    "Get-VBRJob | Select Name, LastResult, LastRun   #-module Veeam",
                    "Get-VBRESession | sort EndTime -desc | select -First 5",
                    "vmware : esxcli storage filesystem list   # espace des datastores"
                ],
                diagnostic: [
                    "1. Rapport du job : l'échec est-il à l'étape snapshot, au transfert, ou à l'écriture repository ? Chacune a ses causes.",
                    "2. Snapshot impossible : espace du datastore insuffisant, VMware Tools/Integration Services obsolètes (quiescence impossible), ou VM avec disque indépendant.",
                    "3. Connexion hyperviseur : credentials expirés, réseau/pare-feu vers l'hôte, certificat vCenter changé.",
                    "4. Repository : disque plein, partage inaccessible, ou rétention qui n'a jamais purgé les anciens points."
                ],
                causes: [
                    "Manque d'espace pour le snapshot.",
                    "Credentials expirés après un changement de mot de passe.",
                    "Repository plein (rétention mal configurée).",
                    "VMware Tools/Hyper-V integration services obsolètes."
                ],
                resolution: [
                    "Snapshot impossible : libérer l'espace datastore ou déplacer la VM ; mettre à jour les tools/integration services.",
                    "Credentials : mettre à jour le compte dans Veeam (Credentials Manager) et relancer le job.",
                    "Repository plein : étendre le disque ou purger les anciens points de restauration selon la politique de rétention."
                ],
                prevention: "Alerte Zabbix sur l'échec de job (webhook Veeam → Zabbix), rapport quotidien par mail, et test de restauration trimestriel documenté (le seul test qui compte). Une sauvegarde jamais restaurée n'est pas une sauvegarde, c'est un espoir.",
                casEntreprise: "Après le renouvellement trimestriel des mots de passe admin, tous les jobs échouent la même nuit : le compte veeam-svc n'était pas dans l'exception de rotation. Mise à jour du credentials manager, relance des jobs, et ajout du compte de service à la liste d'exclusion des rotations. Les comptes de service se gèrent à part, par procédure écrite."
            },
            // ==================== CISCO (réseau) ====================
            {
                id: 'dep-cisco-interface', freq: 4, cat: 'Cisco (réseau)', parcours: 'CCNA', titre: 'Cisco — interface down (lien qui ne monte pas)',
                symptome: "show ip interface brief affiche l'interface en down/down (câble/port) ou up/down (protocole : VLAN manquant, encapsulation). Le lien ne passe pas.",
                contexte: "Le double état ligne/protocole est la première boussole : down/down = physique (couche 1), up/down = couche 2 (le plus souvent un VLAN absent sur un port access ou trunk).",
                verifications: [
                    "show ip interface brief : down/down ou up/down ? (ce seul état oriente la couche fautive)",
                    "L'interface opposée (l'autre équipement) est-elle administrativement down (shutdown) ?",
                    "Voyant du port côté switch et côté équipement."
                ],
                outils: "show interfaces, show interfaces status, testeur de câble.",
                commandes: [
                    "show ip interface brief",
                    "show interfaces Gi0/1 status",
                    "show interfaces Gi0/1 | include line|error|duplex",
                    "show run interface Gi0/1   # shutdown oublié ? VLAN configuré ?"
                ],
                diagnostic: [
                    "1. down/down : câble débranché/sectionné, port shut down administrativement (show run interface : 'shutdown'), ou équipement opposé éteint. Vérifier les deux extrémités.",
                    "2. up/down sur un port de switch : le VLAN configuré en mode access n'existe pas dans la table VLAN — « show interfaces switchport » + « show vlan brief ». Le lien physique est bon, la couche 2 est incohérente.",
                    "3. up/down sur un lien routé : encapsulation différente des deux côtés (dot1Q vs pas de tag, ou sous-interface .10 d'un côté, interface principale de l'autre).",
                    "4. Err-disabled : voir la fiche dédiée (port-security, BPDU guard)."
                ],
                causes: [
                    "Port en shutdown administratif (oubli de no shutdown après une intervention).",
                    "VLAN d'accès absent de la table VLAN du switch (up/down typique).",
                    "Câble défectueux ou trop long.",
                    "Incohérence d'encapsulation sur un lien trunk/routé."
                ],
                resolution: [
                    "down/down : vérifier le câble et les deux extrémités, no shutdown si le port est shut.",
                    "up/down par VLAN manquant : créer le VLAN (vlan X) — le lien remonte tout seul dès que le VLAN existe.",
                    "Encapsulation : aligner les deux côtés (mode trunk des deux, sous-interface dot1Q correspondantes).",
                    "Après chaque correction : clear counters puis relire les compteurs pour un départ propre."
                ],
                prevention: "Fiches de câblage à jour (port ↔ équipement ↔ VLAN), procédure de vérification post-intervention (show ip int brief), et supervision des transitions d'interfaces (trap SNMP linkDown).",
                casEntreprise: "Un nouveau serveur ne ping rien : l'interface du switch est up/down. Le port d'accès est configuré vlan 30... qui n'existe pas sur ce switch (créé sur le cœur seulement). Création du vlan 30 : le lien remonte instantanément, aucun câblage à toucher. Un up/down se diagnostique dans la table VLAN avant de descendre au placard technique."
            },
            {
                id: 'dep-cisco-trunk', freq: 3, cat: 'Cisco (réseau)', parcours: 'CCNA', titre: 'Cisco — trunk KO (le trunk ne se forme pas ou laisse passer un seul VLAN)',
                symptome: "show interfaces trunk n'affiche pas le port en trunking, ou l'affiche mais certains VLAN ne passent pas : un étage perd un VLAN précis alors que le lien est up.",
                contexte: "Entre deux commutateurs : le trunk exige un accord des deux côtés (DTP ou modes explicites) ET des listes de VLAN autorisés cohérentes. Un trunk « à moitié formé » est plus fourbe qu'un lien mort.",
                verifications: [
                    "show interfaces trunk sur LES DEUX côtés : mode, encapsulation, VLAN autorisés, VLAN actifs qui passent.",
                    "Le VLAN natif est-il identique des deux côtés ?",
                    "DTP : les modes des deux extrémités forment-ils un trunk (trunk+desirable, desirable+desirable...) ?"
                ],
                outils: "show interfaces trunk, show interfaces switchport, show dtp interface.",
                commandes: [
                    "show interfaces trunk",
                    "show interfaces Gi0/1 switchport   # mode, natif, VLAN autorisés",
                    "show dtp interface Gi0/1",
                    "show interfaces Gi0/1 pruning   # VLAN pruning VTP"
                ],
                diagnostic: [
                    "1. Le port n'apparaît pas dans show interfaces trunk : le mode des deux côtés ne négocie pas (dynamic auto + dynamic auto ne forment rien). Passer les deux côtés en switchport mode trunk + nonegotiate.",
                    "2. Le trunk est formé mais un VLAN manque : il doit apparaître dans TROIS listes — VLAN autorisés, VLAN actifs ET VLAN qui traversent. S'il est absent côté A : il n'existe pas dans la table VLAN de A, ou il est sorti de la allowed list.",
                    "3. VLAN natif différent : le trafic non tagué d'un côté est livré dans le mauvais VLAN de l'autre — pas de perte totale, mais des comportements aberrants (management injoignable, CDP/STP alarmes).",
                    "4. Encapsulation : sur les vieux liens, ISL vs dot1Q — aujourd'hui dot1Q partout, mais vérifier si un équipement tiers est dans le chemin."
                ],
                causes: [
                    "Modes DTP incompatibles (auto + auto) : le trunk ne se forme jamais silencieusement.",
                    "VLAN absent de la allowed list d'un côté (switchport trunk allowed vlan 10,20 alors que le 30 doit passer).",
                    "VLAN créé sur un switch mais pas sur l'autre : les trames taguées sont jetées sans erreur.",
                    "VLAN natif mismatch (1 par défaut d'un côté, 99 configuré de l'autre)."
                ],
                resolution: [
                    "Forcer le trunk proprement des deux côtés : switchport mode trunk, switchport trunk encapsulation dot1q (si nécessaire), switchport nonegotiate.",
                    "Aligner les allowed lists et le VLAN natif des deux côtés, créer le VLAN partout où il doit exister.",
                    "Vérifier la guérison : show interfaces trunk doit lister le VLAN dans les trois colonnes, et un poste du VLAN concerné ping sa passerelle."
                ],
                prevention: "Standard de configuration des trunks écrit (mode trunk, nonegotiate, allowed list explicite, natif 99) appliqué par modèle de config, et vérification show interfaces trunk dans la checklist post-changement.",
                casEntreprise: "Le nouveau VLAN RH (30) du bâtiment 2 ne passe pas vers le cœur. Le trunk est up, la allowed list contient 10,20 seulement — le 30 n'a jamais été ajouté au moment de la création. switchport trunk allowed vlan add 30 des deux côtés : les postes reçoivent leur bail en 30 secondes. Le piège : allowed vlan ADD, pas re-saisie complète (une re-saisie écraserait la liste et couperait les autres VLAN un instant)."
            },
            {
                id: 'dep-cisco-vlan', freq: 4, cat: 'Cisco (réseau)', parcours: 'CCNA', titre: 'Cisco — VLAN incorrect (le poste est dans le mauvais VLAN)',
                symptome: "Un poste reçoit une adresse IP d'un sous-réseau inattendu, ne joint pas ses ressources, ou est invisible du reste de son service : il est branché dans le mauvais VLAN.",
                contexte: "Le VLAN du port d'accès détermine le sous-réseau (et le pool DHCP) du poste. Un port mal étiqueté ou re-câblé dans la précipitation place l'utilisateur dans un autre monde logique.",
                verifications: [
                    "show interfaces switchport sur le port du poste : access VLAN configuré ?",
                    "show vlan brief : le port apparaît-il dans le VLAN attendu ?",
                    "L'adresse IP reçue par le poste correspond-elle au sous-réseau attendu pour ce VLAN ?"
                ],
                outils: "show interfaces switchport, show vlan brief, table de correspondance port ↔ prise murale ↔ VLAN.",
                commandes: [
                    "show interfaces fa0/12 switchport",
                    "show vlan brief | include Fa0/12",
                    "show mac address-table interface fa0/12   # qui est réellement branché ?",
                    "switchport access vlan 10   # dans le mode interface"
                ],
                diagnostic: [
                    "1. Confirmer le port réel : show mac address-table avec la MAC du poste — l'adresse physique ne ment jamais (le câblage des prises est souvent mal étiqueté).",
                    "2. Lire le VLAN d'accès du port : correspond-il au plan (VLAN 10 = IT, 20 = RH...) ?",
                    "3. Croiser l'IP obtenue avec le sous-réseau du VLAN : IP en 192.168.20.x alors que le poste devrait être en .10.x = VLAN 20 effectif.",
                    "4. Vérifier l'étiquetage de la prise murale : le câblage physique (prise ↔ port du switch) est-il conforme au registre de câblage ?"
                ],
                causes: [
                    "Port mal configuré (VLAN d'accès erroné depuis l'origine ou après réorganisation).",
                    "Câble déplacé sur un autre port lors d'une intervention (brancher « provisoirement » ailleurs).",
                    "Prise murale mal étiquetée : le technicien branche sur le port du registre, mais le câblage a été re-patché sans mise à jour.",
                    "VLAN voix/données inversés sur un port de téléphone (voice vlan vs access vlan)."
                ],
                resolution: [
                    "Corriger le VLAN d'accès du port réel (identifié par la table MAC, pas par le registre) : switchport access vlan X.",
                    "Mettre à jour le registre de câblage et l'étiquetage de la prise si le physique était en cause.",
                    "Faire relancer la carte du poste (ipconfig /renew) : le bail du mauvais sous-réseau reste sinon actif jusqu'à expiration.",
                    "Pour les ports de postes avec téléphone IP : vérifier les DEUX VLAN (access = data, voice = voix)."
                ],
                prevention: "Registre de câblage tenu à jour (prise ↔ port ↔ VLAN ↔ utilisateur), étiquetage physique des deux bouts de chaque câble, et vérification MAC avant toute correction. Un « mauvais VLAN » mal diagnostiqué déplace le problème au port voisin.",
                casEntreprise: "Un poste RH reçoit une IP en .30.x (invités) : pendant le déménagement du service, son câble a été re-patché sur un port du VLAN invité « en attendant ». La table MAC révèle le port réel, la correction du VLAN d'accès et un renew réglent tout. La cause : l'absence de registre de câblage — « en attendant » est le mot qui coûte le plus cher en réseau."
            },
            {
                id: 'dep-cisco-routage', freq: 3, cat: 'Cisco (réseau)', parcours: 'CCNA', titre: 'Cisco — routage absent (le sous-réseau n\'est pas joignable)',
                symptome: "Le ping vers un sous-réseau distant échoue alors que le LAN local et la passerelle répondent : la route manque, la route par défaut est absente, ou elle pointe dans la mauvaise direction.",
                contexte: "Un hôte joignable = sa passerelle répond + la route existe des deux côtés. Quand un seul flux précis échoue, le problème est dans une table de routage (absente, fausse ou filtrée).",
                verifications: [
                    "Le poste ping sa passerelle ? (non = problème local, pas routage)",
                    "show ip route sur le routeur : la destination recherchée a-t-elle une route (C, S, O...) ?",
                    "Le retour existe-t-il ? La route existe côté aller ne suffit pas : la réponse doit être routable aussi."
                ],
                outils: "show ip route, ping étendu (source interface), traceroute, show ip protocols.",
                commandes: [
                    "show ip route 192.168.30.0   # route précise pour cette destination",
                    "show ip route | include 0.0.0.0   # la route par défaut",
                    "ping 192.168.30.10 source GigabitEthernet0/1   # tester avec l'IP de l'interface du chemin de retour",
                    "traceroute 192.168.30.10"
                ],
                diagnostic: [
                    "1. Depuis le poste : ping passerelle. OK = le problème est au-delà. KO = fiche VLAN/APIPA, pas du routage.",
                    "2. Sur le routeur : show ip route <destination>. Pas de route = ajouter (statique ou routage dynamique). Une route via un mauvais next hop = la route existe mais ment.",
                    "3. Ping étendu avec source : un ping simple du routeur part avec l'IP de l'interface de sortie — le ping étendu source teste le chemin de RETOUR depuis le sous-réseau client.",
                    "4. traceroute depuis le poste : où les réponses s'arrêtent-elles ? Le dernier saut qui répond est le routeur qui manque de route ou qui filtre (coupler avec les ACL)."
                ],
                causes: [
                    "Route statique manquante ou erronée (next hop faux) après ajout d'un sous-réseau.",
                    "Route par défaut absente ou mal orientée (0.0.0.0/0 vers une interface qui n'est pas la sortie Internet).",
                    "Protocole dynamique non activé sur la nouvelle interface (network/interface manquante dans OSPF).",
                    "Le sous-réseau est joignable à l'aller mais la réponse n'a pas de route de retour (routage asymétrique non couvert)."
                ],
                resolution: [
                    "Ajouter la route manquante : ip route <dest> <masque> <next-hop> (ou déclarer l'interface dans OSPF : ip ospf 1 area 0).",
                    "Corriger la route par défaut et vérifier sa propagation (OSPF default-information originate si elle doit être diffusée).",
                    "Vérifier des DEUX côtés : chaque routeur du chemin doit connaître la route vers la destination ET vers la source.",
                    "Si la route existe mais ne sert pas : vérifier la distance administrative (une statique écrase l'OSPF) et les ACL sur le chemin."
                ],
                prevention: "Plan d'adressage documenté avec les next hops de référence, checklist de création d'un sous-réseau (VLAN + interface + route/OSPF + relais DHCP + ACL), et supervision des routes critiques (probe ICMP vers les passerelles distantes).",
                casEntreprise: "Le nouveau site de Lyon n\'est joignable que depuis le siège. La route Lyon existe sur le routeur central, mais le routeur de Lyon n\'a aucune route vers les sous-réseaux du siège (route par défaut oubliée à l\'installation) : les paquets arrivent, les réponses se perdent. Ajout de la route par défaut côté Lyon : le site entre en contact. Un routage cassé est souvent un aller sans retour."
            },
            {
                id: 'dep-cisco-ospf', freq: 3, cat: 'Cisco (réseau)', parcours: 'CCNA', titre: 'Cisco — voisin OSPF absent (adjacence qui ne se forme pas)',
                symptome: "show ip ospf neighbor ne liste pas le voisin attendu, ou le liste bloqué en état INIT/EXSTART/2-WAY : les routes ne se propagent pas entre deux routeurs.",
                contexte: "OSPF exige un accord strict entre voisins : zone, timers Hello/Dead, MTU, authentification, RID uniques. Un seul paramètre divergent et les Hello sont ignorés — sans message d'erreur explicite.",
                verifications: [
                    "show ip ospf neighbor : le voisin apparaît-il, et dans quel état ? (INIT = Hello unidirectionnel, EXSTART = MTU)",
                    "show ip ospf interface brief des deux côtés : même zone ? mêmes timers ?",
                    "Les deux routeurs se pinguent-ils sur leur lien ? (couche 3 avant protocole)"
                ],
                outils: "show ip ospf neighbor, show ip ospf interface, debug ip ospf hello (prudence en prod), show ip protocols.",
                commandes: [
                    "show ip ospf neighbor",
                    "show ip ospf interface GigabitEthernet0/0   # zone, timers, MTU, priorité",
                    "show ip protocols | section Router ID",
                    "debug ip ospf hello   # révélateur : les raisons de rejet des Hello s'affichent"
                ],
                diagnostic: [
                    "1. Voisin totalement absent : les Hello ne s'accordent pas — vérifier zone, timers, authentification, et que l'interface n'est pas passive (show ip ospf interface).",
                    "2. Voisin bloqué INIT : un seul côté reçoit les Hello (multicast 224.0.0.5 bloqué unilatéralement par un pare-feu, ou ACL qui filtre).",
                    "3. Voisin bloqué EXSTART/EXCHANGE : MTU différent des deux côtés (vérifier show interfaces | include MTU) — la LSDB ne se synchronise jamais.",
                    "4. DR/BDR : les deux routeurs en priorité 0 sur un segment multi-accès = aucun DR élu = pas d'adjacence Full (au moins un doit être éligible)."
                ],
                causes: [
                    "Zones différentes sur les deux extrémités (reprise de config erronée).",
                    "Timers Hello/Dead modifiés d'un seul côté (10/40 par défaut).",
                    "MTU mismatch (EXSTART : le point le plus fourbe).",
                    "Authentification activée d'un côté seulement.",
                    "Interface passive, ou priorité 0 des deux côtés sur du multi-accès."
                ],
                resolution: [
                    "Aligner les paramètres des deux côtés : zone (ip ospf 1 area X), timers (ip ospf hello-interval / dead-interval), authentification, et corriger la MTU (ip mtu) si le lien le justifie.",
                    "Passive : retirer l'interface du passif (no passive-interface) sur le lien inter-routeurs.",
                    "Priorité 0 : remonter au moins un routeur à 1 (ip ospf priority 1) pour élire un DR.",
                    "Vérifier la guérison : l'état doit passer FULL, et show ip route ospf doit recevoir les réseaux du voisin."
                ],
                prevention: "Modèle de configuration OSPF standard (timers par défaut partout, authentification systématique, router-id explicites), et supervision des adjacences (trap SNMP/sonde show ip ospf neighbor avec alerte sur perte de voisin).",
                casEntreprise: "Après une reprise de config nocturne, R2 perd son voisinage avec R1 : l'interface a été re-déclarée en area 1 au lieu de area 0. Aucun log criant — les Hello sont simplement ignorés. debug ip ospf hello affiche « area mismatch », re-déclaration en area 0, adjacence FULL en 10 secondes. OSPF échoue en silence : c'est show ip ospf neighbor qui parle."
            },
            {
                id: 'dep-cisco-port', freq: 3, cat: 'Cisco (réseau)', parcours: 'CCNA', titre: 'Cisco — port en err-disable après branchement',
                symptome: "Le port d'un switch passe en « err-disabled » dès qu'un équipement est branché : le voyant est orange et le trafic ne passe plus.",
                contexte: "Incident fréquent après l'activation de port-security, de BPDU guard ou de DHCP snooping sur les ports d'accès.",
                verifications: [
                    "show interfaces status err-disable : quels ports, et POURQUOI (cause affichée) ?",
                    "show port-security interface fa0/5 : quelle violation ?",
                    "Qu'est-ce qui est réellement branché sur ce port ? (un switch ou une VM bridge émet des BPDU — interdit sur un port protégé)"
                ],
                outils: "show interfaces status err-disabled, show port-security, logs %PORT_SECURITY / %SPANTREE.",
                commandes: [
                    "show interfaces status err-disabled",
                    "show port-security interface fa0/5",
                    "show interfaces fa0/5 status | include err",
                    "errdisable recovery cause psecure-violation   # + interval 300"
                ],
                diagnostic: [
                    "1. show interfaces status err-disable : la CAUSE est écrite (psecure-violation, bpduguard, dhcp-rate-limit, link-flap...).",
                    "2. Port-security : show port-security interface — MAC en violation ? Le port applique une politique de MAC autorisées (sticky ou statique) : un nouvel équipement déclenche.",
                    "3. BPDU guard : le port a reçu des BPDUs — quelqu'un a branché un switch (ou un poste virtualisé en bridge) sur un port d'accès.",
                    "4. Loop/dhcp-rate : des flux anormaux ont dépassé les seuils — chercher une boucle ou un poste au comportement anormal."
                ],
                causes: [
                    "Violation port-security (MAC non autorisée).",
                    "BPDU reçue sur un port protégé par BPDU guard (switch pirate ou mini-switch personnel).",
                    "Trop de requêtes DHCP (loop ou DHCP starvation en cours).",
                    "Link-flap (câble/prise défectueux qui rebondit)."
                ],
                resolution: [
                    "Corriger la cause au niveau de l'équipement branché (MAC autorisée, pas de switch caché), puis shutdown / no shutdown sur le port.",
                    "Activer la récupération automatique : errdisable recovery cause psecure-violation + errdisable recovery interval 300.",
                    "Si le besoin est légitime (IP-phone + PC), augmenter switchport port-security maximum 2.",
                    "Un poste au comportement anormal (DHCP flood) : traiter comme incident de sécurité, pas comme panne réseau."
                ],
                prevention: "BPDU guard + port-security sur tous les ports d'accès comme standard, errdisable recovery configuré avec intervalle raisonnable, supervision des logs %PORT_SECURITY, et information des utilisateurs : les mini-switchs personnels sont interdits (c'est la cause n°1 des err-disable en entreprise).",
                casEntreprise: "Tous les lundis, le même port du service comptabilité part en err-disable : un collaborateur branche son mini-switch 5 ports pour son poste et son imprimante. BPDU guard fait son travail. Solution pérenne : une prise supplémentaire câblée au bon VLAN. La sécurité a signalé un vrai besoin — corriger le besoin, pas désactiver la protection."
            }
        ];
