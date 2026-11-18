export const LIN_TIPS = [
            "journalctl -u <service> -f : suivre les logs d'un service en direct pendant que vous reproduisez le problème.",
            "ss -tulpn : qui écoute sur quel port — la première commande quand « le service ne répond pas ».",
            "df -h && du -h --max-depth=1 /var : le duo pour trancher entre disque plein et fichiers fantômes (lsof +L1 pour les fantômes).",
            "systemctl list-units --failed : la liste des services cassés — souvent le vrai diagnostic derrière « le serveur est lent ».",
            "nginx -t / sshd -t / apachectl configtest : valider la config AVANT le restart — le réflexe qui évite 2 h de panne nocturne.",
            "namei -l /chemin/fichier : déroule les permissions de CHAQUE niveau du chemin — le « permission denied » mystérieux se résout ici.",
            "systemctl enable --now <service> : activer ET démarrer en une commande (--now = start immédiat).",
            "rsync -av --delete -n source/ dest/ : le -n (dry-run) montre ce qui serait supprimé — à tester avant tout --delete.",
            "crontab -l : vérifier les tâches planifiées de l'utilisateur courant (root ≠ votre utilisateur).",
            "tail -f /var/log/auth.log : surveiller les connexions SSH en direct pendant un test d'accès."
        ];
