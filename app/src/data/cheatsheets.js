export const CHEAT_SHEETS = [
            { title: "Cisco IOS - Switching avancé", env: "Cisco IOS", cat: "Réseau", certif: "CCNA / AIS", commands: [
                { cmd: "vlan 10\n name ADMIN", desc: "Crée un VLAN et lui donne un nom descriptif.", ex: "vlan 10 → name ADMIN", risk: "modification", case: "Segmenter le réseau par service ou fonction.", freq: 4 },
                { cmd: "switchport mode access\n switchport access vlan 10", desc: "Place le port en mode access sur le VLAN 10.", ex: "interface fa0/5 → switchport mode access → switchport access vlan 10", risk: "modification", case: "Connecter un PC à un VLAN spécifique.", freq: 5 },
                { cmd: "switchport mode trunk\n switchport trunk allowed vlan 10,20,30", desc: "Place le port en mode trunk et restreint les VLANs transportés.", ex: "interface gi0/1 → switchport mode trunk → switchport trunk allowed vlan 10,20,30", risk: "modification", case: "Liaison inter-switch transportant plusieurs VLANs.", freq: 4 },
                { cmd: "switchport trunk native vlan 99", desc: "Définit le VLAN natif (non balisé) du trunk.", ex: "switchport trunk native vlan 99", risk: "modification", case: "Éviter le mismatch de VLAN natif entre deux switchs.", freq: 3 },
                { cmd: "switchport voice vlan 110", desc: "Configure un VLAN voix séparé pour un combiné VoIP.", ex: "interface fa0/10 → switchport voice vlan 110", risk: "modification", case: "Brancher un téléphone IP + un PC sur le même port.", freq: 3 },
                { cmd: "spanning-tree portfast", desc: "Transition immédiate vers forwarding (sans écoute STP).", ex: "interface fa0/1 → spanning-tree portfast", risk: "modification", case: "Accélérer la connexion des postes utilisateurs.", freq: 3 },
                { cmd: "show mac address-table", desc: "Affiche la table CAM : adresses MAC apprises par port.", ex: "show mac address-table", risk: "consultation", case: "Diagnostiquer où un équipement est connecté.", freq: 5 },
                { cmd: "show spanning-tree", desc: "Affiche l'état STP (racine, ports root/alternate, priorités).", ex: "show spanning-tree", risk: "consultation", case: "Identifier le pont racine et vérifier qu'aucun port n'est bloqué inutilement.", freq: 4 }
            ]},
            { title: "Cisco IOS - Routage avancé", env: "Cisco IOS", cat: "Réseau", certif: "CCNA / AIS", commands: [
                { cmd: "ip route 0.0.0.0 0.0.0.0 <gw>", desc: "Route par défaut : tout trafic non connu part vers cette passerelle.", ex: "ip route 0.0.0.0 0.0.0.0 192.168.1.1", risk: "modification", case: "Sortir vers Internet ou vers un réseau non annoncé.", freq: 4 },
                { cmd: "ip route <net> <mask> <gw> 150", desc: "Route flottante : prend la main si la route principale (AD plus basse) tombe.", ex: "ip route 192.168.3.0 255.255.255.0 192.168.1.2 150", risk: "modification", case: "Lien de secours avec une distance administrative supérieure.", freq: 3 },
                { cmd: "router eigrp 100\n network 10.0.0.0\n no auto-summary", desc: "Configure EIGRP (protocole propriétaire Cisco, convergence rapide).", ex: "router eigrp 100 → network 10.0.0.0 → no auto-summary", risk: "modification", case: "Réseau 100% Cisco où la convergence rapide est prioritaire.", freq: 3 },
                { cmd: "show ip protocols", desc: "Affiche les protocoles de routage actifs (OSPF, EIGRP, RIP), router-id, zones.", ex: "show ip protocols", risk: "consultation", case: "Contrôler la configuration de routage à froid.", freq: 4 }
            ]},
            { title: "Cisco IOS - Sécurité avancée", env: "Cisco IOS", cat: "Sécurité", certif: "CCNA / AIS", commands: [
                { cmd: "ip ssh version 2\n ip ssh time-out 60\n ip ssh authentication-retries 3", desc: "Configure SSH v2 avec timeout et limite de tentatives.", ex: "ip ssh version 2 → ip ssh time-out 60 → ip ssh authentication-retries 3", risk: "modification", case: "Sécuriser l'accès SSH : version 2, timeout de session, limite de tentatives.", freq: 4 },
                { cmd: "username admin privilege 15 secret <pass>", desc: "Crée un compte admin local avec privilège 15 (tous les droits).", ex: "username admin privilege 15 secret AdminPass123", risk: "modification", case: "Authentification locale pour SSH sans serveur RADIUS/TACACS+.", freq: 4 },
                { cmd: "errdisable recovery cause psecure-violation\n errdisable recovery interval 300", desc: "Récupération automatique des ports err-disable après 5 minutes.", ex: "errdisable recovery cause psecure-violation → errdisable recovery interval 300", risk: "modification", case: "Éviter d'intervenir manuellement après chaque violation de port-security.", freq: 3 }
            ]},
            { title: "Consultation", env: "Cisco IOS", cat: "Réseau", certif: "CCNA / AIS (voire TSSR)", commands: [
                { cmd: "?", desc: "Liste les commandes disponibles dans le mode courant.", ex: "conf t\n?", risk: "consultation", freq: 3, mode: "entièrement interactif sur l'équipement" },
                { cmd: "show running-config", desc: "Affiche la configuration courante stockée en RAM.", ex: "sh run \| include interface", risk: "consultation", freq: 5, mode: "mode privilégié (« enable »)" },
                { cmd: "show ip interface brief", desc: "Récapitulatif condensé des interfaces avec IP et statut up/down.", ex: "sh ip int brief", risk: "consultation", freq: 5 },
                { cmd: "show vlan brief", desc: "Base de VLAN locale et affectation des ports d'accès.", ex: "sh vlan brief", risk: "consultation", freq: 5 },
                { cmd: "show interfaces trunk", desc: "Ports en mode trunk, VLAN autorisés et actif sur ce troncation.", ex: "sh interfaces trunk", risk: "consultation", freq: 3 },
                { cmd: "show ip route", desc: "Table de routage IP : routes connectées, statiques et dynamiques.", ex: "sh ip route \| include O", risk: "consultation", freq: 5 },
                { cmd: "show access-lists", desc: "Compose les ACE d'une ACL et les compteurs de match (nombre de fois où la règle s'est trouvée en position oblique).", ex: "sh access-lists BLOQUE_RESEAUX", risk: "consultation", freq: 3 },
                { cmd: "show port-security interface <intf>", desc: "État du port, MAC autorisées et possible violation sur une interface.", ex: "show port-security interface gig 0/1", risk: "consultation", freq: 3 },
                { cmd: "show version", desc: "Version IOS, uptime, modèle et image (K9 = support SSH).", ex: "show version", risk: "consultation", freq: 3 }
            ]},
            { title: "Configuration de base", env: "Cisco IOS", cat: "Réseau", certif: "CCNA / AIS", commands: [
                { cmd: "enable / configure terminal", desc: "Passe en mode privilégié puis en mode configuration globale.", ex: "en\nconf t", risk: "modification", freq: 3 },
                { cmd: "hostname <nom>", desc: "Change le nom de l'équipement.", ex: "hostname SW-ACC1", risk: "modification", freq: 5 },
                { cmd: "enable secret <mdp>", desc: "Attribue un mot de passe HASHÉ pour le mode enable (privilégié).", ex: "enable secret P@ssw0rd", risk: "modification", freq: 2 },
                { cmd: "service password-encryption", desc: "Chiffre les mots de passe en clair de la config à venir.", ex: "service password-encryption", risk: "modification", freq: 2 },
                { cmd: "line console 0 → password <mdp> → login", desc: "Exige un mot de passe pour l'accès par le port console.", ex: "line con 0\npassword P@ss\nlogin", risk: "modification", freq: 3 },
                { cmd: "line vty 0 15 → password <mdp> → login", desc: "Sécurise les accès à distance (0 à 15 = 16 sessions VTY possibles).", ex: "line vty 0 15\npassword P@ss\nlogin", risk: "modification", freq: 3 },
                { cmd: "banner motd *message*", desc: "Bannière affichée à l'accès (message important). Les apartés : expresssec vsRYPTO, mais concerne l'accès si toujours helptext!", ex: "banner motd *Accès réservé*", risk: "modification", freq: 3 },
                { cmd: "interface <if> → ip address <ip> <mask> → no shutdown", desc: "Attribue l'adresse IP et active une interface.", ex: "int g0/0\nip address 192.168.60.1 255.255.255.0\nno sh", risk: "modification", freq: 3 },
                { cmd: "shutdown / no shutdown", desc: "Éteint ou rallume une interface administrativement.", ex: "int g0/0\nshut", risk: "modification", freq: 3 },
                { cmd: "ip default-gateway <ip>", desc: "Passerelle par défaut pour administrer un switch de couche 2 à distance.", ex: "ip default-gateway 192.168.60.254", risk: "modification", freq: 3 },
                { cmd: "vlan <id> → name <nom>", desc: "Crée un VLAN nommé.", ex: "vlan 10\nname DATA", risk: "modification", freq: 3 },
                { cmd: "switchport mode access → switchport access vlan <id>", desc: "Place un port en accès sur un VLAN précis.", ex: "int range fa 0/5-6\nswitchport mode access\nswitchport access vlan 10", risk: "modification", freq: 3 },
                { cmd: "switchport mode trunk → switchport trunk allowed vlan <list> → switchport trunk native vlan <id>", desc: "Port d'agrégation 802.1Q : définit les VLAN transportés et le VLAN natif.", ex: "switchport mode trunk\nswitchport trunk allowed vlan 10,20,100\nswitchport trunk native vlan 100", risk: "modification", freq: 3 },
                { cmd: "interface vlan <id> → ip address <ip> <mask> (SVI)", desc: "Crée une SVI de VLAN : passerelle du VLAN sur switch de couche 3.", ex: "int vlan 10\nip address 172.25.10.254 255.255.255.0", risk: "modification", freq: 3 },
                { cmd: "ip routing", desc: "Active le routage inter-VLAN entre les SVI d'un switch L3.", ex: "ip routing", risk: "modification", freq: 3 }
            ]},
            { title: "Sécurité et sauvegarde", env: "Cisco IOS", cat: "Réseau", certif: "CCNA / AIS", commands: [
                { cmd: "crypto key generate rsa general-keys modulus 2048", desc: "Génère la paire de clés RSA pour SSH (prérequis : hostname, ip domain-name).", ex: "crypto key generate rsa general-keys modulus 2048", risk: "modification", freq: 3 },
                { cmd: "ip ssh version 2 → username <user> secret <mdp> → line vty → login local → transport input ssh", desc: "Configure SSH v2 avec authentification locale et interdiction Telnet.", ex: "ip ssh version 2\nusername admin secret P@ss\nline vty 0 15\nlogin local\ntransport input ssh", risk: "modification", freq: 3 },
                { cmd: "login block-for <s> attempts <n> within <s>", desc: "Bloque temporairement la connexion en cas d'échecs répétés (réduction de la force brute).", ex: "login block-for 60 attempts 2 within 60", risk: "modification", freq: 2 },
                { cmd: "access-list <1-99> permit/deny <source> <masque inversé>", desc: "ACL standard : filtre selon l'adresse source uniquement.", ex: "access-list 1 permit 192.168.0.0 0.0.0.255", risk: "modification", freq: 2 },
                { cmd: "ip access-list standard <nom> → deny/permit… → permit any", desc: "ACL nommée standard (plus lisible, ACE numérotées).", ex: "ip access-list standard BLOQUE\n10 deny 192.168.100.0 0.0.0.255\n20 permit any", risk: "modification", freq: 5 },
                { cmd: "interface <if> → ip access-group <nom/num> in|out", desc: "Applique l'ACL sur l'interface dans le sens requis.", ex: "int g0/0/0\nip access-group BLOQUE in", risk: "modification", freq: 3 },
                { cmd: "copy running-config startup-config", desc: "Sauvegarde la configuration courante dans la NVRAM (persistante).", ex: "copy run start", risk: "modification", freq: 2 },
                { cmd: "clear ip nat translation *", desc: "Purge les traductions NAT actives (utile après modification des règles).", ex: "clear ip nat translation *", risk: "modification", freq: 2, mode: "mode privilégié ; interrompt les sessions NAT en cours" },
                { cmd: "clear access-list counters", desc: "Réinitialise le compteur de match de l'ACL (test d'une nouvelle règle).", ex: "clear access-list counters", risk: "modification", freq: 3 },
                { cmd: "no access-list <nom/num> / no ip access-group", desc: "Supprime une ACL globale ou son application sur une interface (destructif si appliqué face à des ACL productives).", ex: "int g0/0\nno ip access-group BLOQUE in", risk: "destructif", freq: 1, mode: "attention : retirer une ACL appliquée révèle tout le trafic de l'interface" }
            ]},
            // --- Linux : fichiers, utilisateurs, permissions (sources : cours_IT-main/Cours_Linux ; Cours_TSSR Cheat_Sheets) ---
            { title: "Fichiers et arborescence", env: "Linux", cat: "Système", certif: "TSSR / AIS", commands: [
                { cmd: "ls -lath /home/bob", desc: "Liste (long, cachés, triés par date, tailles lisibles).", ex: "ls -lath /etc/net*", risk: "consultation", freq: 5 },
                { cmd: "pwd", desc: "Affiche le répertoire courant.", ex: "pwd", risk: "consultation", freq: 5 },
                { cmd: "mkdir -p -m 700 /opt/depot/data", desc: "Crée une arborescence récursivement avec ses droits d'origine.", ex: "mkdir -p -m 700 /opt/{data,logs}", risk: "modification", freq: 4 },
                { cmd: "cp -arp /home /mnt/home", desc: "Copie récursive préservant droits, propriétaire et dates (ar = a + r + p).", ex: "cp -arp /etc/bind /srv/backup/bind", risk: "modification", freq: 4 },
                { cmd: "mv -v /tmp/test /tmp/test2", desc: "Déplace ou renomme en mode verbeux.", ex: "mv -v ./script.sh ./archives/script_old.sh", risk: "modification", freq: 4 },
                { cmd: "rm -ri /tmp/old", desc: "Suppression récursive avec confirmation (à éviter avec -f, destructif).", ex: "rm -ri ./anciens_rapports", risk: "destructif", freq: 1, mode: "aucune capacité de récupération une fois lancé" },
                { cmd: "find . -name \"*.log\" -mtime -7", desc: "Trouve des fichiers par nom ou âge (ici : .log modifiés depuis moins de 7 jours).", ex: "find / -size 33c -user bob 2> /dev/null", risk: "consultation", freq: 4 },
                { cmd: "find . -name \"*.tmp\" -exec rm {} \\;", desc: "Applique une action à chaque résultat (ici la suppression).", ex: "find ~ -type f -name \"*.txt\" -exec cp {} {}.save \\;", risk: "destructif", freq: 4, mode: "exécuter d'abord en mode consultation avec -name puis vérifier avant d'ajouter -exec" },
                { cmd: "du -sh /var", desc: "Taille Totale du répertoire, récursif et lisible.", ex: "du -sh /var/log", risk: "consultation", freq: 3 },
                { cmd: "df -hT", desc: "Espace disque libre et occupé, avec le type de système de fichiers.", ex: "df -hT /home", risk: "consultation", freq: 5 },
                { cmd: "stat -c '%a %G %U %n' /srv/*", desc: "Droits octaux, groupe, propriétaire et nom des fichiers listés.", ex: "stat -c '%a %G %U %n' /srv/Complots/*", risk: "consultation", freq: 3 },
                { cmd: "ln -s /chemin/source /chemin/lien", desc: "Crée un lien symbolique (alias, par opposition au lien physique qui partage l'inode).", ex: "ln -s /usr/share/app/app.sh /usr/local/bin/app", risk: "modification", freq: 3 }
            ]},
            { title: "Fichiers texte et filtres", env: "Linux", cat: "Système", certif: "TSSR / AIS", commands: [
                { cmd: "cat -n fichier.txt", desc: "Affiche le contenu avec numéros de ligne.", ex: "cat -n /etc/passwd", risk: "consultation", freq: 5 },
                { cmd: "less /var/log/syslog", desc: "Visionne un long fichier avec pagination ; plus confortable que cat.", ex: "less +F /var/log/syslog", risk: "consultation", freq: 4 },
                { cmd: "head -n 20 / tail -n 5", desc: "Premières ou dernières lignes d'un fichier.", ex: "tail -n 5 /var/log/auth.log", risk: "consultation", freq: 4 },
                { cmd: "tail -f /var/log/app.log", desc: "Suit un fichier journal en temps réel (usage : tâche en cours).", ex: "tail -f /var/log/dpkg.log", risk: "consultation", freq: 4 },
                { cmd: "grep -i -n \"motif\" fichier", desc: "Recherche insensible à la casse, numéros de ligne affichés.", ex: "grep -i \"erreur\" /var/log/syslog", risk: "consultation", freq: 5 },
                { cmd: "grep -v ^# /etc/dhcp/dhcpd.conf", desc: "Extrait les lignes qui ne sont pas un commentaire.", ex: "grep -v ^# /etc/sudoers", risk: "consultation", freq: 5 },
                { cmd: "awk -F \",\" 'NR > 1 && $5 == \"France\" {print $2}'", desc: "Extraction de colonnes selon un critère : commence à ligne 2 (1 = en-tête).", ex: "awk -F \",\" 'NR > 1 {print $1}' users.csv", risk: "consultation", freq: 3 },
                { cmd: "cut -d \":\" -f 1", desc: "Extrait une colonne selon un délimiteur simple.", ex: "cut -d \":\" -f 1 /etc/passwd", risk: "consultation", freq: 3 },
                { cmd: "sort \| uniq -u", desc: "Trie puis isole les lignes uniques (sans doublons).", ex: "cut -d \":\" -f 7 /etc/passwd \| sort \| uniq -u", risk: "consultation", freq: 3 },
                { cmd: "sed -i 's/ancien/nouveau/g' fichier", desc: "Remplacement inline ; sans -i, grep du résultat en mémoire avant écriture.", ex: "sed -i 's/Port 22/Port 2222/g' sshd_config", risk: "modification", freq: 3 }
            ]},
            { title: "Utilisateurs et groupes", env: "Linux", cat: "Système", certif: "TSSR / AIS", commands: [
                { cmd: "id <user>", desc: "Affiche UID, GID principal et groupes secondaires.", ex: "id didi", risk: "consultation", freq: 3 },
                { cmd: "getent passwd / cat /etc/passwd", desc: "Liste les utilisateurs ou lit la base : login, x, UID, GID, GEcos, home, shell.", ex: "getent passwd bob", risk: "consultation", freq: 3 },
                { cmd: "getent group / cat /etc/group", desc: "Liste les groupes ; /etc/gshadow conserve les mots de passe de groupe.", ex: "getent group devops", risk: "consultation", freq: 3 },
                { cmd: "useradd -m -s /bin/bash -g <grp> -G <grps> <user>", desc: "Crée un compte avec home, shell, groupes principal et secondaires.", ex: "useradd leto -g duc -G users,adm -m -s /bin/bash", risk: "modification", freq: 4 },
                { cmd: "usermod -aG sudo <user>", desc: "Ajoute au groupe sudo ; -a (append) indispensables pour ne pas écraser les groupes existants.", ex: "usermod -aG sudo didi", risk: "modification", freq: 4, mode: "root uniquement" },
                { cmd: "userdel -r <user>", desc: "Supprime l'utilisateur et son dossier perso.", ex: "userdel -r ancien_co", risk: "destructif", freq: 3, mode: "sans -r, le /home reste et un nouveaux compte homonyme peut en hériter" },
                { cmd: "passwd <user>", desc: "Change le mot de passe ; passwd seul change le sien.", ex: "passwd didi", risk: "modification", freq: 4 },
                { cmd: "passwd -l / -u <user>", desc: "Verrouille ou déverrouille le compte.", ex: "passwd -l didi", risk: "modification", freq: 4 },
                { cmd: "chage -l <user>", desc: "Consulte la politique d'expiration du mot de passe : dernier changement, période d'inactivité, date d'échéance.", ex: "chage -l didi", risk: "consultation", freq: 3 },
                { cmd: "gpasswd -a / -d <user> <groupe>", desc: "Ajoute ou retire un compte d'un groupe (alternative à -G usermod).", ex: "gpasswd -a didi adm", risk: "modification", freq: 3 },
                { cmd: "groupadd / groupmod -n new old / groupdel", desc: "Crée, renomme ou supprime un groupe.", ex: "groupadd devops", risk: "modification", freq: 3 },
                { cmd: "sudo visudo -f /etc/sudoers.d/passwd", desc: "Ouvre l'éditeur de sudoers pour une délégation ciblée (par exemple autoriser passwd sauf sur root).", ex: "userName ALL=(root) /usr/bin/passwd, !/usr/bin/passwd root", risk: "modification", freq: 3 }
            ]},
            { title: "Permissions et propriétaire", env: "Linux", cat: "Système", certif: "TSSR / AIS", commands: [
                { cmd: "chmod 755 fichier", desc: "Droits octaux: rwx owner, r-x groupe, r-x autres (r=4,w=2,x=1).", ex: "chmod 755 /srv/app/start.sh", risk: "modification", freq: 4 },
                { cmd: "chmod ugo+rw / - / =", desc: "Modifie clairement des droits par u/g/o et motif (+=attribute, -=dialob, =remplacement).", ex: "chmod u+rw,g-r,o= test.txt", risk: "modification", freq: 4 },
                { cmd: "chmod -R g+s /srv/Complots", desc: "Active SetGID sur un dossier : les nouveaux fichiers héritent de son groupe.", ex: "chmod 2770 /srv/Complots", risk: "modification", freq: 4 },
                { cmd: "chmod 1770 Depot/", desc: "Applique le Sticky Bit : seul le propriétaire peut supprimer son contenu.", ex: "chmod 1770 /tmp/depot", risk: "modification", freq: 4 },
                { cmd: "chown nouveau:group fichier", desc: "Change simultanément propriétaire et groupe.", ex: "chown -R didi:adm /srv/analytics", risk: "modification", freq: 4, mode: "root uniquement" },
                { cmd: "umask 022", desc: "Droits par défaut des fichiers créés : 644 ; 022 donne 644 aux fichiers et 755 aux dossiers.", ex: "umask 022", risk: "modification", freq: 3 },
                { cmd: "setfacl -m group:adm:r-x dossier", desc: "Ajoute une ACL de groupe, option -d hérite aux fichiers du dossier.", ex: "setfacl -m group:adm:r-x /srv/Complots", risk: "modification", freq: 3 },
                { cmd: "getfacl dossier", desc: "Relit les ACL du dossier ; le signe + en fin de « ls -l » les signale.", ex: "getfacl /srv/Complots", risk: "consultation", freq: 3 },
                { cmd: "chgrp -R adm dossier", desc: "Change récursivement le groupe propriétaire.", ex: "chgrp -R marketing rapports/", risk: "modification", freq: 3 }
            ]},
            { title: "Services et systemd", env: "Linux", cat: "Système", certif: "TSSR / AIS", commands: [
                { cmd: "systemctl status sshd", desc: "État détaillé d'un service : actif, sous-processus, dernier log.", ex: "systemctl status sshd", risk: "consultation", freq: 5 },
                { cmd: "systemctl start/stop/restart <svc>", desc: "Actionne un service ; restart ou recharge sa config.", ex: "systemctl restart networking", risk: "modification", freq: 4 },
                { cmd: "systemctl enable [--now] <svc>", desc: "Active un service au démarrage ; --now le démarre immédiatement.", ex: "systemctl enable --now snort3-nic.service", risk: "modification", freq: 4 },
                { cmd: "systemctl cat <svc>", desc: " Affiche le fichier unit du service (FragmentPath dans le status).", ex: "systemctl cat sshd", risk: "consultation", freq: 3 },
                { cmd: "systemctl get-default / set-default multi-user.target", desc: "Affiche ou change le mode de démarrage : multi-user = serveur sans GUI, graphical = avec GUI.", ex: "systemctl set-default multi-user.target", risk: "modification", freq: 3 },
                { cmd: "systemctl isolate rescue.target", desc: "Bascule en mode secours (single-user root, sans GUI) ; utile quand le boot échoue ou sous un disque de montages.", ex: "sudo systemctl isolate rescue.target", risk: "modification", freq: 3, mode: "exige le mot de passe root ; interrompt le service courant" },
                { cmd: "journalctl -u sshd -e", desc: "Affiche les derniers logs de l'unité, option -g pour une recherche.", ex: "journalctl -u sshd --follow", risk: "consultation", freq: 5 },
                { cmd: "journalctl -g \"password:session\" -S \"2 days ago\"", desc: "Recherche dans le journal de systemd depuis une date.", ex: "journalctl -g \"session opened\"", risk: "consultation", freq: 5 },
                { cmd: "grep \"sda\" /var/log/syslog", desc: "Recherche dans un ancien fichier (rsyslog) tout évoquant un disque précis.", ex: "grep \"sda1\" /var/log/syslog", risk: "consultation", freq: 5 },
                { cmd: "systemd-analyze", desc: "Analyse le temps de démarrage et les services responsables des délais.", ex: "systemd-analyze blame", risk: "consultation", freq: 3 }
            ]},
            { title: "Réseau Linux", env: "Linux", cat: "Réseau", certif: "TSSR / AIS", commands: [
                { cmd: "ip a", desc: "Affiche les interfaces, leurs adresses et leur état (lo = interface de loopback 127.0.0.1).", ex: "ip -brief a", risk: "consultation", freq: 5 },
                { cmd: "ip a add 10.6.6.6/16 dev ens33", desc: "Ajoute une adresse IP à une interface (del pour retirer).", ex: "ip a add 192.168.1.50/24 dev enp1s0", risk: "modification", freq: 5 },
                { cmd: "ip link set ens33 down / up", desc: "Inactive ou active une interface au niveau liaison.", ex: "ip l set ens33 up", risk: "modification", freq: 2, mode: "coupe la connexion si effectuée en SSH sur cette interface" },
                { cmd: "ip route", desc: "Affiche la table de routage.", ex: "ip route \| grep default", risk: "consultation", freq: 4 },
                { cmd: "ip route add 10.56.0.0/16 via 172.16.6.253", desc: "Ajoute une route statique (del pour la retirer).", ex: "ip route add 10.56.0.0/16 via 172.16.6.253", risk: "modification", freq: 4 },
                { cmd: "sysctl -w net.ipv4.ip_forward=1", desc: "Active temporairement le routage entre cartes (rendre durable via /etc/sysctl.conf + sysctl -p).", ex: "sysctl -w net.ipv4.ip_forward=1", risk: "modification", freq: 2 },
                { cmd: "cat /etc/resolv.conf", desc: "Affiche les serveurs DNS (directive nameserver).", ex: "nameserver 1.1.1.1", risk: "consultation", freq: 3 },
                { cmd: "nmcli connection add type ethernet ifname enp1s0 …", desc: "Crée une connexion NetworkManager ; modify ipv4.addresses pour la config manuelle.", ex: "nmcli connection modify <conn> ipv4.addresses 192.168.1.50/24", risk: "modification", freq: 3, mode: "présence impérative de NetworkManager sous NetworkManagerified" },
                { cmd: "ss -antu", desc: "Liste les sockets TCP/UDP en écoute et vus.", ex: "ss -ant star end | grep :22", risk: "consultation", freq: 5 },
                { cmd: "nc -zv <ip> <port>", desc: "Teste l'ouverture d'un port distant sans envoyer de données.", ex: "nc -zv 192.168.1.10 443", risk: "consultation", freq: 3 }
            ]},
            { title: "Stockage et LVM", env: "Linux", cat: "Système", certif: "TSSR / AIS", commands: [
                { cmd: "lsblk", desc: "Vue claire des disques et partitions (/dev/sda, /dev/sdb…).", ex: "lsblk -f", risk: "consultation", freq: 3 },
                { cmd: "fdisk -l", desc: "Liste exhaustive des disques et de leurs partitions.", ex: "fdisk -l /dev/sdb", risk: "consultation", freq: 3 },
                { cmd: "blkid", desc: "UUID et types de filesystem de chaque partition (utile pour /etc/fstab).", ex: "blkid /dev/sda1", risk: "consultation", freq: 3 },
                { cmd: "pvcreate /dev/sdb", desc: "Initialise un disque ou une partition pour LVM (PV).", ex: "pvcreate /dev/sdb /dev/sdc", risk: "destructif", freq: 3, mode: "détruit la table de partitions des disques visés" },
                { cmd: "vgcreate vg_datas /dev/sdb /dev/sdc", desc: "Regroupe des PV dans un volume group.", ex: "vgcreate vg_datas /dev/sdb", risk: "modification", freq: 3 },
                { cmd: "lvcreate -L 25G -n lv_datas vg_datas", desc: "Crée un volume logique de 25 Go.", ex: "lvcreate -L 25G -n lv_datas vg_datas", risk: "modification", freq: 3 },
                { cmd: "mkfs.ext4 -L DATA /dev/vg_datas/lv_datas", desc: "Formate le LV en ext4 avec une étiquette (mkfs.xfs pour un VFS).", ex: "mkfs.ext4 -L DATA /dev/vg_datas/lv_datas", risk: "destructif", freq: 3, mode: "écrase toutes les données du volume si prisonnier au filesystem, risk -d" },
                { cmd: "lvextend -r -l +100%FREE /dev/vg_datas/lv_datas", desc: "Étend le volume logique à la place libre ; -r étend aussi le filesystem pesé.", ex: "lvextend -r -l +100%FREE /dev/vg_datas/lv_datas", risk: "modification", freq: 3 },
                { cmd: "resize2fs /dev/vg_datas/lv_datas 15G", desc: "Redimensionne le filesystem (réduction ext4 : démonter d'abord).", ex: "resize2fs /dev/vg_datas/lv_datas 15G", risk: "destructif", freq: 1, mode: "pour réduire : taille FS d'abord, puis taille LV, après un e2fsck" },
                { cmd: "mount -t ext4 /dev/sdb1 /mnt/home", desc: "Monte un filesystem sur un point ; umount pour démonter (ne pas être dedans).", ex: "mount -t ext4 /dev/sdb2 /mnt/data", risk: "modification", freq: 3 },
                { cmd: "volume edit fichier : vi /etc/fstab", desc: "Pour chaque ligne : device, point, type, options, dump (0), fsck (2 pour root, 0 pour rien).", ex: "/dev/vg_datas/lv_datas /mnt/datas ext4 defaults 0 2", risk: "modification", freq: 3 },
                { cmd: "mount -a", desc: "Applique tous les montages déclarés dans fstab sans redémarrer (test de fstab).", ex: "mount -a", risk: "modification", freq: 3, mode: "ne jamais reboot si mount -a échoue, fstab corrompu bloque le boot" }
            ]},
            { title: "Paquets et planification", env: "Linux", cat: "Système", certif: "TSSR / AIS", commands: [
                { cmd: "apt update && apt upgrade", desc: "Met à jour les listes puis les paquets Debian (install/remove pour paquets).", ex: "apt update && apt upgrade", risk: "modification", freq: 4 },
                { cmd: "apt list --upgradable", desc: "Affiche les paquets avec mises à jour en attente.", ex: "apt list --upgradable", risk: "consultation", freq: 3 },
                { cmd: "dpkg -L <paquet>", desc: "Liste les fichiers installés par un paquet (.deb).", ex: "dpkg -L bind9", risk: "consultation", freq: 3 },
                { cmd: "dnf repolist -v / dnf upgrade / dnf clean all", desc: "Gestion Red Hat : liste de dépôts, mises à jour, purge du cache.", ex: "dnf updateinfo list --sec-severity Critical", risk: "modification", freq: 4 },
                { cmd: "crontab -e / crontab -l", desc: "Édite ou liste la crontab utilisateur (5 champs horaires puis command).", ex: "0 5 * * 1 /opt/bin/backup.sh", risk: "modification", freq: 3 },
                { cmd: "chmod u+x script.sh && ./script.sh", desc: "Rend le script exécutable puis le lance en directement.", ex: "chmod u+x backup.sh && ./backup.sh", risk: "modification", freq: 4 }
            ]},
            { title: "Poste et diagnostic", env: "Windows / PowerShell", cat: "Niveau client", certif: "TSSR / AIS", commands: [
                { cmd: "Get-Command *printer*", desc: "Trouve toutes les cmdlets correspondant à un motif (Get-Command get-* pour un verbe).", ex: "Get-Command New-ADUser", risk: "consultation", freq: 3 },
                { cmd: "Get-Help New-ADUser -Examples", desc: "Aide détaillée d'une cmdlet, examples régulièrement à différencier.", ex: "Get-Help Get-Service -Examples", risk: "consultation", freq: 3 },
                { cmd: "Get-Process \| Get-Member", desc: "Affiche les propriétés et méthodes de l'objet retourné.", ex: "Get-LocalUser \| gm", risk: "consultation", freq: 5 },
                { cmd: "Get-NetIPAddress -AddressFamily IPv4", desc: "Adresses IPv4 des interfaces (on filtre on l'AdapterAlias).", ex: "Get-NetIPAddress -AddressFamily IPv4 \| Select IPAddress", risk: "consultation", freq: 5 },
                { cmd: "Get-DnsClientServerAddress -AddressFamily IPv4", desc: "Inspecte les DNS configurés par interface (Ethernet, Wi-Fi).", ex: "Get-DnsClientServerAddress -AddressFamily IPv4 -InterfaceAlias Ethernet", risk: "consultation", freq: 3 },
                { cmd: "Get-Service \| Where-Object Status -eq Stopped", desc: "Filtre des objets par propriété ($_.Status), sort par nom.", ex: "Get-Service \| Where-Object { $_.Status -eq \"Stopped\" } \| Sort Name", risk: "consultation", freq: 5 },
                { cmd: "Get-LocalUser \| Select Name, SID", desc: "Liste les comptes locaux (base SAM).", ex: "Get-LocalUser \| Select Name, SID, Description", risk: "consultation", freq: 5 },
                { cmd: "Get-CimInstance win32_computersystem", desc: "Affiche le nom d'hôte, mémoire et matériel via WMI/CIM.", ex: "Get-CimInstance win32_processor", risk: "consultation", freq: 3 },
                { cmd: "hostname / whoami /user", desc: "Nom de la machine / SID de l'utilisateur courant.", ex: "whoami /user", risk: "consultation", freq: 5 },
                { cmd: "nslookup <domaine>", desc: "Résolution DNS ; « server x.x.x.x » change de résolveur dans la session.", ex: "nslookup www.cisco.com 8.8.8.8", risk: "consultation", freq: 4 },
                { cmd: "ipconfig /all", desc: "Config IP complète : adresse, masque, passerelle, DNS, bail DHCP.", ex: "ipconfig /all", risk: "consultation", freq: 5 },
                { cmd: "route print", desc: "Affiche la table de routage.", ex: "route print 192.168.*", risk: "consultation", freq: 4 },
                { cmd: "arp -a", desc: "Cache ARP local : correspondances IP / MAC récemment résolues.", ex: "arp -a", risk: "consultation", freq: 4 },
                { cmd: "netstat -ano", desc: "Liste des connexions et ports ouverts (a = tout, n = numérique, o = PID).", ex: "netstat -ano \| findstr 445", risk: "consultation", freq: 5 }
            ]},
            { title: "Active Directory via PowerShell", env: "Windows / PowerShell", cat: "Windows Serveur", certif: "TSSR / AIS", commands: [
                { cmd: "New-ADUser -Name … -SamAccountName … -UserPrincipalName … -Path \"OU=Utilisateurs,DC=lab,DC=lan\" -AccountPassword (ConvertTo-SecureString pass -AsPlainText -Force) -Enabled $true", desc: "Crée un utilisateur AD, ConvertTo-SecureString sécurise le mot de passe.", ex: "$p = ConvertTo-SecureString 'Azerty0*' -AsPlainText -Force ; New-ADUser -Name 'Jean Dupont' -SamAccountName jdupont -UserPrincipalName jdupont@lab.lan -AccountPassword $p -Enabled $true -Path 'OU=Users,DC=lab,DC=lan'", risk: "modification", freq: 4, mode: "RSAT ou module AD installé ; droits de délégation nécessaires" },
                { cmd: "Get-ADUser -Filter {SamAccountName -like \"j*\"} -Properties department,city", desc: "Recherche d'utilisateurs AD avec attributs étendus.", ex: "Get-ADUser -Filter * | where name -like \"[af]*\"", risk: "consultation", freq: 5 },
                { cmd: "Get-ADUser -Filter {} \| New-ADUser (via Import-Csv)", desc: "Boucle de création d'utilisateurs à partir d'un CSV : gestion des doublons (Get-ADUser + Write-Warning).", ex: "$u = Import-Csv c:\\Scripts\\Utilisateurs.csv ; Foreach($x in $u){ if (-not (Get-ADUser -Filter {SamAccountName -eq $x.Login})) { New-ADUser -Name $x.Nom -SamAccountName $x.Login -AccountPassword $p -Enabled $true } }", risk: "modification", freq: 5 },
                { cmd: "New-ADGroup -Name \"DL-Informatique-R\" -GroupScope DomainLocal -GroupCategory Security", desc: "Crée un groupe de domaine local (DL) de sécurité pour la ressource.", ex: "New-ADGroup -Name 'GG-IT' -GroupScope Global -GroupCategory Security", risk: "modification", freq: 3 },
                { cmd: "Add-ADGroupMember -Identity <groupe> -Members <user>", desc: "Ajoute un compte dans un groupe AD.", ex: "Add-ADGroupMember -Identity DL-Informatique-R -Members jdupont", risk: "modification", freq: 3, mode: "distinguer_users_théorie sparateux : Django / ADF san tague" },
                { cmd: "New-ADOrganizationalUnit -Name 'Serveurs-Production' -Path 'OU=Serveurs,DC=lab,DC=lan'", desc: "Crée une unité d'organisation (OU) imbriquée.", ex: "New-ADOrganizationalUnit -Name 'Utilisateurs' -Path 'DC=lab,DC=lan'", risk: "modification", freq: 3 },
                { cmd: "(Get-ADForest).ForestMode ; Get-ADDomain \| select pdc*, *master", desc: "Inspecte les rôles FSMO du domaine et de la forêt.", ex: "Get-ADForest \| select *master", risk: "consultation", freq: 3 },
                { cmd: "Move-ADDirectoryServerOperationMasterRole", desc: "Transfère un ou plusieurs rôles FSMO.", ex: "Move-ADDirectoryServerOperationMasterRole -Identity SVC-DC -OperationMasterRole PdcEmulator", risk: "modification", freq: 3, mode: "se faire prépare avant déplacement du rôle" },
                { cmd: "repadmin /replsummary", desc: "Vue synthétique de la réplication AD (par DC et delta, options bysrc/bydest/errorsonly).", ex: "repadmin /replsummary", risk: "consultation", freq: 3 },
                { cmd: "Start-ADSyncSyncCycle -PolicyType Delta", desc: "Force une synchronisation AD vers Entra ID (souvent Delta pour incrémental).", ex: "Start-ADSyncSyncCycle -PolicyType Delta", risk: "consultation", freq: 3 }
            ]},
            { title: "Windows administration (change local)", env: "Windows CMD / PS", cat: "Windows", certif: "TSSR / AIS", commands: [
                { cmd: "New-LocalUser -Name 'bob' -NoPassword; Add-LocalGroupMember 'Utilisateurs'", desc: "Crée un compte local puis l'affecte au groupe Utilisateurs (SAM).", ex: "New-LocalUser -Name 'bob' -Password (ConvertTo-SecureString 'Azerty1*' -AsPlainText -Force)", risk: "modification", freq: 3, mode: "PS en administrateur" },
                { cmd: "net user /net localgroup", desc: "Gestion base (utilisateur/groupes locaux) : add, delete, listages, expirations.", ex: "net user bob /add", risk: "modification", freq: 3 },
                { cmd: "net use Z: \\\\SERV\\Partage", desc: "Cartographie un lecteur réseau ; /delete retire le lecteur associé.", ex: "net use Z: \\\\SERV\\Partage /persistent:yes", risk: "modification", freq: 3 },
                { cmd: "New-SmbShare -Name Partage -Path \"D:\\Partage\" -ReadAccess \"Utilisateurs\"", desc: "Crée un partage SMB ; rights by NTFS security granular restrictions gouvernent ensuite.", ex: "New-SmbShare -Name 'Test' -Path 'D:\\Test\\' -FullAccess 'Administrateurs' -ReadAccess 'Utilisateurs'", risk: "modification", freq: 3, mode: "toujours évaluer d'abord les droits NTFS (plus restrictifs que le partage)" },
                { cmd: "gpupdate /force", desc: "Force l'application immédiate des GPO.", ex: "gpupdate /force", risk: "modification", freq: 4 },
                { cmd: "gpresult /r", desc: "Liste les GPO appliquées en temps réel à l'utilisateur et à la machine.", ex: "gpresult /R /scope computer | more", risk: "consultation", freq: 3 },
                { cmd: "robocopy src dest /E /L", desc: "Copie récursive des sous-dossiers vides compris ; /L liste seulement ce qui serait fait, sans copier ; /MIR synchronise en miroir (destructif).", ex: "robocopy D:\\DATA Z:\\backup /E /L", risk: "consultation", freq: 4, mode: "/MIR est destructif : supprime en destination ce qui n'existe plus en source, tester d'abord avec /L" },
                { cmd: "diskpart → list volume → select volume X → assign letter=Y", desc: "Attribue une lettre à un volume préalablement sélectionné ; remove letter retire la lettre.", ex: "diskpart; list volume; select volume 3; assign letter=R", risk: "modification", freq: 4, mode: "si un disque reste hors ligne : online disk ; en lecture seule : attributes disk clear readonly" },
                { cmd: "winrs -r:HOST cmd", desc: "Console CMD distante via WinRM (alternativement PowerShell Remoting).", ex: "winrs -r:CLIENT-01 cmd", risk: "modification", freq: 3, mode: "sensible besoin : WinRM activé au serveur distant" }
            ]},
            { title: "Conteneurisation (Docker)", env: "Docker", cat: "DevOps", certif: "AIS / TSSR", commands: [
                { cmd: "docker ps -a", desc: "Liste tous les conteneurs, y compris arrêtés.", ex: "docker ps -a --filter name=web", risk: "consultation", freq: 3 },
                { cmd: "docker run -d --name web nginx:alpine", desc: "Crée + démarrer un conteneur nommé en arrière-plan, depuis l'image alpine.", ex: "docker run -d --name web --network mon_reseau -p 8080:80 nginx:alpine", risk: "modification", freq: 3 },
                { cmd: "docker build -t mon_app .", desc: "Construit une image depuis le Dockerfile du répertoire courant.", ex: "docker build -t mon_app:latest .", risk: "modification", freq: 3 },
                { cmd: "docker exec -it <conteneur> bash", desc: "Ouvre une session interactive dans le conteneur.", ex: "docker exec -it web sh", risk: "consultation", freq: 3 },
                { cmd: "docker logs <conteneur>", desc: "Affiche la sortie et les erreurs du processus principal.", ex: "docker logs -f web", risk: "consultation", freq: 3 },
                { cmd: "docker volume create / ls / inspect / rm", desc: "Gère le stockage persistant indépendant du cycle de vie des conteneurs.", ex: "docker volume create données-db", risk: "modification", freq: 3 },
                { cmd: "docker network create / inspect / rm", desc: "Gère les réseaux virtuels (bridge par défaut, host, none).", ex: "docker network create mon_reseau", risk: "modification", freq: 3 },
                { cmd: "docker stop / rm <conteneur>", desc: "Arrête et supprime un conteneur.", ex: "docker stop web && docker rm web", risk: "destructif", freq: 1, mode: "docker rm -v efface aussi le volume anonyme" },
                { cmd: "docker rmi <image>", desc: "Supprime une image localement (destructif).", ex: "docker rmi mon_app:latest", risk: "destructif", freq: 1 },
                { cmd: "docker system prune", desc: "Supprime tous les objets non utilisés : conteneurs arrêtés, réseaux orphelins, images pendantes.", ex: "docker system prune -a", risk: "destructif", freq: 1, mode: "prudence : un volume prune liquide les volumes non utilisés par des conteneurs ACTIFS" }
            ]},
            // --- Commandes supplémentaires (2e intervention) ---
            { title: "Cisco IOS - Routage avancé", env: "Cisco IOS", cat: "Réseau", certif: "CCNA / AIS", commands: [
                { cmd: "ip route <net> <mask> <gw> [<AD>]", desc: "Route statique, avec distance administrative optionnelle (route flottante).", ex: "ip route 10.3.3.0 255.255.255.0 10.1.12.2 100", risk: "modification", freq: 4, case: "Mise en place d'un lien de secours qui ne prend la main que si le principal tombe." },
                { cmd: "router ospf <pid>", desc: "Active le processus OSPF et entre au sous-menu de routage dynamique.", ex: "router ospf 10", risk: "modification", freq: 2, case: "Routage dynamique sur un réseau multi-sites sans route statique à maintenir." },
                { cmd: "network <net> <wildcard> area <id>", desc: "Publie une interface dans une zone OSPF précise (wildcard = inversé).", ex: "network 10.1.12.0 0.0.0.3 area 0", risk: "modification", freq: 3, case: "Déclarer le lien R1-R2 en zone 0." },
                { cmd: "passive-interface <if>", desc: "Empêche l'envoi des HELLO OSPF sur une interface (LAN client).", ex: "passive-interface g0/1", risk: "modification", freq: 2, case: "Éviter d'exposer des adjacences OSPF vers le LAN des utilisateurs." },
                { cmd: "show ip ospf neighbor", desc: "Liste les adjacences OSPF avec état (FULL / DR / BDR).", ex: "show ip ospf neighbor", risk: "consultation", freq: 5, case: "L'adjacence est-elle établie ? Quel est le DR du segment ?" },
                { cmd: "show ip ospf interface brief", desc: "Résumé des interfaces OSPF avec coût et état.", ex: "show ip ospf interface brief", risk: "consultation", freq: 3, case: "Vérifier les coûts et la zone de chaque interface." },
                { cmd: "clear ip ospf process", desc: "Force la reconstitution des adjacences OSPF (destructif).", ex: "clear ip ospf process", risk: "destructif", freq: 2, case: "À utiliser après un changement de router-id, une réinitialisation d'adjacences." },
                { cmd: "ip router ospf <pid>", desc: "Interface prioritaire (DR/BDR) — 0 = ne devient jamais DR.", ex: "ip ospf priority 200", risk: "modification", freq: 4, case: "Influencer l'élection du DR sur un segment Ethernet partagé." },
                { cmd: "show ip protocols", desc: "Affiche les protocoles de routage actifs et leurs paramètres (OSPF…), router-id, zones, distances.", ex: "show ip protocols", risk: "consultation", freq: 3, case: "Contrôler la configuration OSPF à froid ; distance administrative, router-id affiché." },
                { cmd: "ip ospf cost <x>", desc: "Force le coût OSPF d'un lien (métrique).", ex: "ip ospf cost 20", risk: "modification", freq: 3, case: "Diriger le trafic via un chemin préféré (choix administrateur)."
                },
                { cmd: "interface <if>.<n>", desc: "Sous-interface logique (dot1Q) pour router-on-a-stick.", ex: "interface Gi0/0.10 -> encapsulation dot1Q 10", risk: "modification", freq: 3, case: "Router inter-VLAN avec des sous-interfaces 802.1Q dédiées." }
            ]},
            { title: "Cisco IOS - IPv6", env: "Cisco IOS", cat: "Réseau", certif: "CCNA / AIS", commands: [
                { cmd: "ipv6 unicast-routing", desc: "Active le routage IPv6 (désactivé par défaut sur Cisco IOS).", ex: "ipv6 unicast-routing", risk: "modification", freq: 2, case: "Première étape avant toute configuration d'IPv6 sur un routeur." },
                { cmd: "ipv6 address 2001:db8:1::/64 eui-64", desc: "Configure une adresse globale via dérivation EUI-64 de la MAC.", ex: "ipv6 address 2001:db8:10::/64 eui-64", risk: "modification", freq: 2, case: "Configurer l'adresse routable global d'une interface." },
                { cmd: "ipv6 address fe80::1 link-local", desc: "Force une adresse link-local explicite.", ex: "ipv6 address fe80::1 link-local", risk: "modification", freq: 2, case: "Éviter la dérivation automatique et rappeler l'identification du routeur dans les RA." },
                { cmd: "ipv6 route <net>/<len>", desc: "Route statique IPv6, avec next-hop ou interface.", ex: "ipv6 route 2001:db8:3::/64 2001:db8:12::2", risk: "modification", freq: 2, case: "Compléter une table de routage IPv6 avec le préfixe du site relais." },
                { cmd: "show ipv6 interface brief", desc: "Résumé des adresses IPv6 et de leur état.", ex: "show ipv6 interface brief", risk: "consultation", freq: 3, case: "Voir les adresses globale, link-local et leur état (UP)." },
                { cmd: "show ipv6 route", desc: "Table de routage IPv6 avec codes (C, S, O, B...).", ex: "show ipv6 route", risk: "consultation", freq: 3, case: "Contrôler les prefixes appris et le default route IPv6 (default ::/0)."
                },
                { cmd: "ipv6 enable", desc: "Active automatiquement le link-local et prend en charge SLAAC.", ex: "ipv6 enable", risk: "modification", freq: 2, case: "Prérequis minimal pour les flux IPv6 (Router Advertisements)."
                }
            ]},
            // --- Commandes supplémentaires - Windows / PowerShell (2e intervention) ---
            { title: "Windows - Système et diagnostic", env: "Windows / PowerShell", cat: "Système", certif: "TSSR", commands: [
                { cmd: "Get-ComputerInfo", desc: "Affiche OS, matériel, uptime et réseau du poste en un appel.", ex: "Get-ComputerInfo | Select WindowsProductName, CsProcessors, OsUptime", risk: "consultation", freq: 3, case: "Inventaire express d'un poste dont on ignore la configuration." },
                { cmd: "Get-EventLog -LogName System -Newest 20", desc: "Liste les 20 derniers évènements du journal Système.", ex: "Get-EventLog -LogName System -Newest 20 | Select EventID, Source", risk: "consultation", freq: 3, case: "Retrouver un incident système récent sans ouvrir eventvwr." },
                { cmd: "sfc /scannow", desc: "Vérifie et répare les fichiers système protégés Windows.", ex: "sfc /scannow", risk: "modification", freq: 3, case: "Réparer des fichiers système suspectés corrompus après une mise à jour ratée." },
                { cmd: "chkdsk C: /scan", desc: "Analyse le disque C: en lecture seule (pas de modification sans /r).", ex: "chkdsk C: /scan", risk: "consultation", freq: 3, case: "Diagnostic du disque avant de décider entre déplacement et sauvegarde." },
                { cmd: "msconfig", desc: "Console de configuration : démarrage, services, outils.", ex: "msconfig", risk: "consultation", freq: 3, case: "Désactiver un service au démarrage pour cibler une lenteur." },
                { cmd: "wmic logicaldisk get name,size,freespace", desc: "Liste les disques logiques avec taille et espace libre.", ex: "wmic logicaldisk get name,size,freespace", risk: "consultation", freq: 3, case: "Inventaire du stockage d'un poste en ligne de commande." }
            ]},
            { title: "Windows - Réseau PowerShell", env: "Windows / PowerShell", cat: "Réseau", certif: "TSSR", commands: [
                { cmd: "Get-NetIPConfiguration", desc: "Affiche les configurations IP des interfaces (adresse, passerelle, DNS).", ex: "Get-NetIPConfiguration | Select InterfaceAlias, IPv4Address, IPv4DefaultGateway", risk: "consultation", freq: 4, case: "Diagnostic réseau en PowerShell, équivalent complet de ipconfig /all." },
                { cmd: "Set-DnsClientServerAddress", desc: "Configure les serveurs DNS d'une interface (modification).", ex: "Set-DnsClientServerAddress -InterfaceAlias 'Ethernet' -ServerAddresses 172.16.10.10", risk: "modification", freq: 3, case: "Pointer l'interface vers un serveur DNS précis sans passer par une GPO." },
                { cmd: "Get-NetAdapter | Sort-Object Name, Status", desc: "Liste les adaptateurs réseau avec leur état (Up / Disabled).", ex: "Get-NetAdapter | Sort-Object Status", risk: "consultation", freq: 3, case: "Vérifier si une carte est Disabled avant d'aller plus loin." },
                { cmd: "Test-NetConnection -ComputerName <ip> -Port <port>", desc: "Teste la connectivité TCP directe vers un port précis (au-dessus d'un ping ICMP).", ex: "Test-NetConnection SRV-FIC.lab.lan -Port 445", risk: "consultation", freq: 4, case: "Diagnostiquer si le SMB 445 est bloqué par un pare-feu." },
                { cmd: "Restart-NetAdapter -Name Ethernet", desc: "Redémarre une interface réseau (coupe les sessions actives sur cette console).", ex: "Restart-NetAdapter -Name Ethernet", risk: "destructif", freq: 1, case: "Appliquer une modification TCP/IP souhaitée ; à distance, prudence : coupez votre propre session d'administration." }
            ]},
            { title: "Windows - AD administratif", env: "Windows / PowerShell", cat: "Administratif", certif: "TSSR / AIS", commands: [
                { cmd: "Get-ADDomain | Format-List", desc: "Affiche les détails du domaine AD (niveau, FSMO, suffixes UPN).", ex: "Get-ADDomain | Format-List", risk: "consultation", freq: 3, case: "Rappeler les rôles FSMO avant leur déplacement." },
                { cmd: "Get-ADOrganizationalUnit -Filter *", desc: "Liste toutes les unités d'organisation du domaine.", ex: "Get-ADOrganizationalUnit -Filter * | Select Name", risk: "consultation", freq: 3, case: "Trouver la cible exacte d'un changement de structure AD." },
                { cmd: "Move-ADObject", desc: "Déplace un objet (utilisateur/groupe/UO) vers un nouveau conteneur.", ex: "Move-ADObject -Identity 'OU=ancienne,DC=lab,DC=lan' -TargetPath 'OU=nouvelle,DC=lab,DC=lan'", risk: "modification", freq: 3, case: "Restructurer les UO en déplaçant les objets ciblés." },
                { cmd: "Set-ADUser -Enabled $false", desc: "Désactive un compte AD sans le supprimer.", ex: "Set-ADUser jdupont -Enabled $false", risk: "modification", freq: 3, case: "Off-boarder un employé qui quitte la société : le compte reste auditable." }
            ]},
            // --- Commandes supplémentaires - Linux (2e intervention) ---
            { title: "Linux - Fichiers et texte (avancé)", env: "Linux", cat: "Système", certif: "TSSR / AIS", commands: [
                { cmd: "grep -r --include='*.conf' motif /etc", desc: "Recherche récursive dans les fichiers .conf de /etc.", ex: "grep -r --include='*.conf' ulimit /etc", risk: "consultation", freq: 5, case: "Trouver où un paramètre est déclaré dans une arborescence de confs." },
                { cmd: "awk -F: '{print $1,$7}' /etc/passwd | sort", desc: "Extraction des colonnes utilisateur et shell depuis passwd.", ex: "awk -F: '{print $1,$7}' /etc/passwd", risk: "consultation", freq: 3, case: "Faire le tour des shells utilisés par les comptes du serveur." },
                { cmd: "sed -i.bak 's/ancien/nouveau/g' conf", desc: "Remplacement inline avec copie de sauvegarde .bak.", ex: "sed -i.bak 's/Port 22/Port 2222/' /etc/ssh/sshd_config", risk: "modification", freq: 3, case: "Modifier une conf à chaud, avec le fichier d'origine sauvegardé (.bak) pour rollback rapide." },
                { cmd: "tree -L 2 /var/log", desc: "Vue arborescente jusqu'à 2 niveaux pour /var/log.", ex: "tree -L 2 /var/log", risk: "consultation", freq: 3, case: "Identifier la source d'un journal avant de creuser." },
                { cmd: "tr -s ' ' < fichier > clean.txt", desc: "Nettoie les espaces multiples d'un fichier texte.", ex: "tr -s ' ' < data.txt > clean.txt", risk: "modification", freq: 3, case: "Préparer un fichier CSV/pipe avant import." },
                { cmd: "wc -l *.log", desc: "Compte les lignes de chaque fichier .log rapide des gros journaux)", ex: "wc -l /var/log/nginx/*.log", risk: "consultation", freq: 3, case: "Mesurer l'activité avant rotation du journal." }
            ]},
            { title: "Linux - Utilisateurs et droits (suite)", env: "Linux", cat: "Système", certif: "TSSR / AIS", commands: [
                { cmd: "adduser --disabled-password --shell /sbin/nologin svc_app", desc: "Compte de service sans mot de passe et sans shell (sécurité).", ex: "adduser --disabled-password --shell /sbin/nologin svc_prometheus", risk: "modification", freq: 3, case: "Compte technique dédié à un agent de monitoring, sans login interactif." },
                { cmd: "usermod -L / -U utilisateur", desc: "Verrouille ou déverrouille un compte (login refusé).", ex: "usermod -L ancien_stage", risk: "modification", freq: 4, case: "Geler un compte stagiaire en attendant son départ définitif." },
                { cmd: "visudo -c", desc: "Valide la syntaxe des fichiers sudoers sans les modifier.", ex: "visudo -c", risk: "consultation", freq: 3, case: "Contrôle avant de mettre en place la nouvelle délégation admin." },
                { cmd: "ls -ld /home/*", desc: "Liste les droits des dossiers homedir (755 suspect si trop ouverts).", ex: "ls -ld /home/*", risk: "consultation", freq: 5, case: "Audit permissions quick (755 sur un home laisse lisible par les autres)." },
                { cmd: "chmod -R g-rwx,o-rwx /srv/appdata", desc: "Retirer tous les accès groupe/autres sur une arborescence.", ex: "chmod -R g-rwx,o-rwx /srv/appdata", risk: "destructif", freq: 4, case: "Fermer un dossier d'application exposé au groupe : à faire seulement quand c'est validé." },
                { cmd: "getfacl /srv/appdata | head -n 10", desc: "Affiche les ACL étendues d'un répertoire (même sans ACL posée, montre le résultat).", ex: "getfacl /srv/appdata", risk: "consultation", freq: 3, case: "Contrôle ACL après setfacl sur un serveur web."
                }
            ]},
            { title: "Linux - Réseau et services (suite)", env: "Linux", cat: "Réseau", certif: "TSSR", commands: [
                { cmd: "ip -br addr", desc: "Vue compacte interfaces/adresses compacte.", ex: "ip -br addr show", risk: "consultation", freq: 5, case: "Diagnostiquer une IP manquante sans lire le détail complet de `ip a`."
                },
                { cmd: "systemctl list-units --type=service --state=running", desc: "Liste les services qui tournent réellement (avec details active).", ex: "systemctl list-units --type=service --state=running", risk: "consultation", freq: 3, case: "Inventaire des services actifs devant un audit (moins verbeux que ps aux)." },
                { cmd: "journalctl --disk-usage", desc: "Taille du journal systemd sur disque (permet de dimensionner la rotation).", ex: "journalctl --disk-usage", risk: "consultation", freq: 5, case: "Journal volumineux : ajuster le logrotate ou MaxRetentionSec." },
                { cmd: "ss -tnlp | grep LISTEN", desc: "Liste les sockets TCP en écoute avec le nom du process.", ex: "ss -tnlp", risk: "consultation", freq: 5, case: "Tracer quel service écoute sur quel port inventaire audit sécurité." },
                { cmd: "curl -o /dev/null -s -w '%{http_code}\\n' http://localhost", desc: "Retourne le code HTTP de l'URL pour un test express du service web.", ex: "curl -o /dev/null -s -w '%{http_code}\\n' http://localhost/", risk: "consultation", freq: 3, case: "Surveillance express d'un service HTTP sans pollution du journal." }
            ]},
        ];
