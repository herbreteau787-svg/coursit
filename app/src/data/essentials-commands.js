export const ESSENTIALS_COMMANDS = [
            { os: 'Windows', cat: 'Réseau', items: [
                { c: 'ipconfig /all', d: "Configuration complète : IP, masque, passerelle, DNS, bail DHCP" },
                { c: 'ipconfig /flushdns', d: "Vider le cache DNS local" },
                { c: 'ping -t <hôte>', d: "Ping continu (Ctrl+C pour arrêter)" },
                { c: 'tracert <hôte>', d: "Chemin des paquets, saut par saut" },
                { c: 'nslookup <nom>', d: "Interroger le DNS pour un nom" },
                { c: 'Test-NetConnection <hôte> -Port 443', d: "Tester un port TCP vers un hôte" }
            ]},
            { os: 'Windows', cat: 'Administration', items: [
                { c: 'Get-ADUser -Filter * -SearchBase "OU=RH,DC=lab,DC=lan"', d: "Lister les utilisateurs d'une OU" },
                { c: 'Get-Service | ? Status -eq Running', d: "Services en cours d'exécution" },
                { c: 'Restart-Computer -ComputerName PC1 -Force', d: "Redémarrer un poste à distance" },
                { c: 'Invoke-Command -ComputerName SRV1 { hostname }', d: "Exécuter une commande à distance (WinRM)" },
                { c: 'net user /domain', d: "Lister les utilisateurs du domaine (CMD)" }
            ]},
            { os: 'Windows', cat: 'Sécurité', items: [
                { c: 'whoami /groups', d: "Groupes de l'utilisateur courant" },
                { c: 'net user jdupont /domain /lockout', d: "Déverrouiller un compte domaine" },
                { c: 'klist purge', d: "Purger les tickets Kerberos" },
                { c: 'w32tm /resync', d: "Resynchroniser l'heure (Kerberos !)" },
                { c: 'Get-LocalUser | ft Name, Enabled', d: "Comptes locaux et leur état" }
            ]},
            { os: 'Windows', cat: 'Dépannage', items: [
                { c: 'sfc /scannow', d: "Réparer les fichiers système" },
                { c: 'dism /online /cleanup-image /restorehealth', d: "Réparer l'image Windows" },
                { c: 'gpupdate /force', d: "Forcer l'actualisation des GPO" },
                { c: 'gpresult /R', d: "GPO appliquées (avec les raisons des non-appliquées)" },
                { c: 'Get-WinEvent -FilterHashtable @{LogName="System";Level=2} -MaxEvents 10', d: "10 dernières erreurs système" }
            ]},
            { os: 'Windows', cat: 'Services', items: [
                { c: 'Get-Service Spooler', d: "État du service d'impression" },
                { c: 'Restart-Service Spooler -Force', d: "Redémarrer le spooler" },
                { c: 'Get-DhcpServerv4ScopeStatistics', d: "Remplissage des étendues DHCP (module DHCP)" },
                { c: 'Test-NetConnection SRV-DC01 -Port 445', d: "Vérifier SMB vers le serveur de fichiers" },
                { c: 'net stop wuauserv && net start wuauserv', d: "Redémarrer Windows Update" }
            ]},
            { os: 'Windows', cat: 'Stockage', items: [
                { c: 'Get-PSDrive -PSProvider FileSystem', d: "Espace libre par lecteur" },
                { c: 'Get-Volume', d: "Volumes et taille restante" },
                { c: 'chkdsk D: /f', d: "Vérifier/réparer un système de fichiers" },
                { c: 'Get-ChildItem C:\\Users -Recurse -File | Sort Length -Desc | Select -First 10', d: "Fichiers les plus lourds" }
            ]},
            { os: 'Linux', cat: 'Réseau', items: [
                { c: 'ip a', d: "Adresses IP des interfaces" },
                { c: 'ip route', d: "Table de routage (passerelle via x.x.x.x)" },
                { c: 'ss -tulpn', d: "Ports en écoute + processus" },
                { c: 'ping -c 4 <hôte>', d: "4 pings (Linux n'a pas de -t infini par défaut)" },
                { c: 'resolvectl status', d: "Serveurs DNS en usage" }
            ]},
            { os: 'Linux', cat: 'Administration', items: [
                { c: 'systemctl status <service>', d: "État détaillé d'un service" },
                { c: 'sudo systemctl restart <service>', d: "Redémarrer un service" },
                { c: 'useradd -m -s /bin/bash alice', d: "Créer un utilisateur avec home et bash" },
                { c: 'passwd alice', d: "Changer le mot de passe d'un utilisateur" },
                { c: 'journalctl -u <service> -n 30', d: "30 dernières lignes de log d'un service" }
            ]},
            { os: 'Linux', cat: 'Sécurité', items: [
                { c: 'sudo -l', d: "Ce que je peux faire en sudo" },
                { c: 'last', d: "Dernières connexions" },
                { c: 'id', d: "UID, GID et groupes effectifs" },
                { c: 'chmod 750 /srv/app', d: "rwxr-x--- : propriétaire complet, groupe lecture/exécution" },
                { c: 'chown -R appuser:appgroup /srv/app', d: "Rendre un dossier au service" }
            ]},
            { os: 'Linux', cat: 'Dépannage', items: [
                { c: 'df -h', d: "Espace disque par partition" },
                { c: 'du -h --max-depth=1 /var | sort -hr', d: "Quel répertoire gonfle" },
                { c: 'free -h', d: "Mémoire et swap" },
                { c: 'lsof +L1', d: "Fichiers supprimés encore ouverts (espace fantôme)" },
                { c: 'dmesg | tail -20', d: "20 derniers événements du noyau" }
            ]},
            { os: 'Linux', cat: 'Services', items: [
                { c: 'systemctl list-units --failed', d: "Services en échec" },
                { c: 'systemctl enable --now ssh', d: "Activer et démarrer SSH" },
                { c: 'nginx -t', d: "Valider la syntaxe de configuration avant restart" },
                { c: 'systemctl list-timers', d: "Tâches planifiées (timers systemd)" },
                { c: 'crontab -l', d: "Tâches cron de l'utilisateur" }
            ]},
            { os: 'Linux', cat: 'Stockage', items: [
                { c: 'lsblk', d: "Disques et partitions (arbre)" },
                { c: 'mount | column -t', d: "Systèmes de fichiers montés" },
                { c: 'lvextend -r -L +5G /dev/vg/lv', d: "Étendre un volume LVM (+fs)" },
                { c: 'tar -czf backup.tar.gz /etc', d: "Compresser un dossier" },
                { c: 'journalctl --vacuum-size=100M', d: "Purger les journaux" }
            ]},
            { os: 'Cisco', cat: 'Réseau', items: [
                { c: 'show ip interface brief', d: "État ligne/protocole et IP de chaque interface" },
                { c: 'show interfaces status', d: "VLAN, duplex, vitesse par port" },
                { c: 'show interfaces trunk', d: "Trunks actifs et VLAN qui traversent" },
                { c: 'show ip route', d: "Table de routage (C/L/S/O...)" },
                { c: 'ping <IP>', d: "Test connectivité depuis l'équipement" }
            ]},
            { os: 'Cisco', cat: 'Administration', items: [
                { c: 'show run', d: "Configuration courante (RAM)" },
                { c: 'copy run start', d: "Sauvegarder la config (RAM → NVRAM)" },
                { c: 'hostname SW1', d: "Nommer l'équipement" },
                { c: 'show version', d: "Modèle, IOS, uptime, registre de config" },
                { c: 'show running-config interface Gi0/1', d: "Config d'une interface précise" }
            ]},
            { os: 'Cisco', cat: 'Sécurité', items: [
                { c: 'enable secret <mdp>', d: "Mot de passe du mode privilégié (haché)" },
                { c: 'service password-encryption', d: "Chiffrer les mots de passe de la config" },
                { c: 'show port-security interface Fa0/5', d: "Politique et violations du port" },
                { c: 'show ip dhcp snooping binding', d: "Table de correspondances snooping" },
                { c: 'show access-lists', d: "ACL et compteurs de matches" }
            ]},
            { os: 'Cisco', cat: 'Dépannage', items: [
                { c: 'clear counters Gi0/1', d: "Remettre les compteurs à zéro avant mesure" },
                { c: 'show interfaces Gi0/1 | include CRC|collision|error', d: "Compteurs d'erreurs" },
                { c: 'show spanning-tree', d: "Racine, rôles et états des ports" },
                { c: 'show ip ospf neighbor', d: "Adjacences OSPF (état FULL attendu)" },
                { c: 'debug ip dhcp server events', d: "Trace DHCP en temps réel (undebug all pour arrêter)" }
            ]},
            { os: 'Cisco', cat: 'Services', items: [
                { c: 'ip dhcp pool LAN10', d: "Créer un pool DHCP (network, default-router, dns-server)" },
                { c: 'ip helper-address 10.1.1.50', d: "Relais DHCP sur l'interface cliente" },
                { c: 'show ip dhcp binding', d: "Baux attribués" },
                { c: 'ip default-gateway 192.168.1.1', d: "Passerelle d'un switch L2 (gestion à distance)" },
                { c: 'line vty 0 4 / transport input ssh', d: "Restreindre l'accès de gestion à SSH" }
            ]},
            { os: 'Cisco', cat: 'Stockage', items: [
                { c: 'copy running-config tftp:', d: "Sauvegarder la config vers un serveur TFTP" },
                { c: 'copy tftp: flash:', d: "Restaurer une image IOS depuis TFTP" },
                { c: 'show flash:', d: "Contenu de la mémoire flash (images)" },
                { c: 'dir nvram:', d: "Fichiers NVRAM (startup-config)" },
                { c: 'archive config', d: "Archiver une configuration" }
            ]}
        ];
