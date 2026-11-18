export const PS_TIPS = [
            "Test-NetConnection <hôte> -Port 445 : la commande la plus utile pour vérifier un service TCP — elle remplace telnet et arnaque moins que le ping.",
            "Get-ADUser <login> -Properties LockedOut,PasswordExpired : trois états qui orientent trois fiches de dépannage différentes.",
            "gpresult /H rapport.html : le rapport HTML liste les GPO non appliquées AVEC la raison — plus rapide que deviner.",
            "Get-ChildItem -Recurse | Sort-Object Length -Descending | Select -First 10 : trouver ce qui sature un disque en une ligne.",
            "$env:COMPUTERNAME et $env:USERNAME : les variables d'environnement évitent de coder en dur noms de machine/utilisateur dans vos scripts.",
            "Remove-Item C:\\Windows\\System32\\spool\\PRINTERS\\* -Force (spooler arrêté) : déblocage d'imprimante en 10 secondes.",
            "Set-ADAccountPassword -Identity x -Reset : toujours avec -ChangePasswordAtLogon $true derrière, sinon l'utilisateur garde le mot de passe temporaire.",
            "Get-WinEvent -FilterHashtable @{LogName='Security';Id=4740} : la SOURCE exacte des verrouillages de comptes (nom de machine appelante).",
            "Restart-NetAdapter : réparer 80 % des « plus de réseau » d'un poste sans le redémarrer.",
            "Measure-Command { commande } : chronométrer une commande — indispensable pour prouver qu'un script « est lent » avant de l'accuser."
        ];
