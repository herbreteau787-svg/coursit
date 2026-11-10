# Audit des contenus — plateforme TSSR / AIS / CCNA (2026-11-09)

Suivi de l'intervention « enrichissement du contenu » : sources, manques, modifications, tests, restes.

## 1. Fichiers du projet

- Plateforme unique : `plateforme_de_r_vision_tssr_ais_ccna.html`
- Sauvegarde AVANT modifications : `sauvegarde_plateforme_2026-11-09.html`
- Serveur de test : `python -m http.server 8741 --directory "C:\Users\<user>\Documents\Site-Cours IT"`
- Adresse : http://localhost:8741/plateforme_de_r_vision_tssr_ais_ccna.html
- Les deux dossiers sources n'ont pas été modifiés ; aucune seconde plateforme créée.

## 2. Sources lisibles (texte lu intégralement)

- `cours_IT-main/Cours_Linux` : commandes (commandes.md, commandesV2.md), arborescence, bash, utilisateurs/groupes, permissions (umask, bits spéciaux, ACL), systemd/journalctl, cron, paquets (apt, dnf), LVM et stockage, réseau Linux (ip, nmcli, resolv, sysctl), SSH/scp.
- `cours_IT-main/Cours_réseau` : trame Ethernet + 802.1Q, TCP/IP binaire et masque (ET logique, trait de découpe, 2n−2), CIDR, DORA/APIPA, distances administratives (statique 1, OSPF 110, RIP 120), ports usuels, DMZ, IDS/IPS/EDR/XDR/MDR, ZTNA, bastion, VPN/IPSec/WireGuard/OpenVPN, PKI (CSR, CA, X.509, CRL), LDAP, DoH.
- `cours_IT-main/Cours_réseau/Cisco` : modes IOS, enable/hostname/bannière, SSH (crypto key RSA), VLAN access/trunk/voice, SVI + ip routing, router-on-a-stick (dot1q), RIP v2, NAT/PAT + clears, ACL standard/nommées + effets de bord, port-security, login block-for, ip helper-address.
- `cours_IT-main/Cours_windows` : AD (FSMO, forêt, RODC, AGDLP, groupes, catalogue global, Kerberos/TGT, NTDS/SYSVOL, repadmin), SAM, winrs/WinRM, RSAT, Windows Admin Center, DNS Windows (zones, SOA/NS/A/AAAA/CNAME/MX/SRV/PTR, redirections), DHCP Windows (PS), GPO (ordres, gpupdate/gpresult), partages NTFS + ABE, Diskpart (RAID 5/miroir), MBR/GPT, robocopy, RDS/RDP (broker, gateway, RemoteApp), WDS/MDT (PXE, WIM, TS), sysprep, M365/Entra ID (tenant, RBAC, groupes dynamiques, Start-ADSyncSyncCycle), messagerie MUA/MSA/MTA/MDA, SID/LAPS, PowerShell (Get-Command/Member, Where, Format, Import-Csv, Get-CimInstance, Get-NetIPAddress).
- `cours_IT-main/Docker` : images/couches, conteneurs, Dockerfile, volumes/bind mount/tmpfs, réseaux bridge/host/none, Docker Compose, tag/push, registre, prune.
- `cours_IT-main/Sauvegarde_restauration` : 3-2-1(-1), RTO, VSS, rotation GFS, bit d'archive, complet/différentielle/incrémentale, inline/online/near-line/offline, NAS/SAN/LUN/DAS, DAT/DLT/LTO, RAID 0/1/5/6/10, Veeam (job, backup copy, réplication, failover).
- `cours_IT-main/Virtualisation` : hyperviseurs type 1/2, VT-x/AMD-V, EPT/NPT, ESXi/vSphere (vCenter, vMotion, VMkernel, datastore, iSCSI/HBA/LUN/IQN, OVF/OVA/vmtx), Proxmox (qemu agent, LXC, Node/Storage).
- `cours_IT-main/Zabbix`, `Python`, `GIT`, `Ansible`, `ITIL/GLPI`, `Procédures` : métriques et scripts ; SLA/SLR/OLA/UC ; GLPI (tickets et parc) ; procédures Linux/Windows (RAID 5 mdadm, /var LVM, rescue, CIFS, lecteur réseau net use, RDP, GPO locale, stratégie MDP, imprimante TCP/IP fictive, historique de fichiers).
- `Cours_TSSR-main/Ateliers` : s01 file system (fdisk/cfdisk, mkfs.xfs/ext4/swap, fstab, mount utilisateur), s13 LVM avancé (pv/vg/lvcreate, lvextend -l +100 %FREE, snapshot, e2fsck avant resize2fs), s16 WSUS (installation du rôle, puis GPO avec client-side targeting), s17 FreePBX (extensions SIP, FollowMe, Ring Groups).
- `Cours_TSSR-main/Cheat_Sheets` : OSI/TCP-IP + mnémonique, CIDR /0→/32 complet, ports 0-49151 détaillés, ports + couches OSI, commandes Linux users/groups.
- `Cours_TSSR-main/Scripts` + `PDT/Scripts Powershell` + `PDT/README` + `README` : scripts PowerShell AD/CSV et sommaires de programme.

## 3. Sources non lisibles (signalement)

Environ 40 fichiers de `Cours_TSSR-main` ne contiennent que des liens de captures d'écran (les diapositives sont hébergées sur GitHub et ne sont pas présentes sur le disque) : les cours Bash (3), Cybersécurité (1), IT Management (9), Méthodes (2), OS (6), Passage de titre (1), Réseaux (8), SysAdmin (10), Sécurité réseau (7), TSSR (5), Windows PowerShell (3), Virtualisation-Conteneurs (2) et les 5 zips `Challenge`. Le texte des diapositives n'est donc pas extractible localement ; les thèmes correspondants ont été couverts via `cours_IT-main`, qui traite les mêmes notions.

## 4. État initial

| Rubrique | Avant |
|---|---|
| Glossaire (`GLOSSARY_DATA`) | 6 entrées ; schéma term/en/def/certif ; ni catégorie ni exemple |
| Commandes (`CHEAT_SHEETS`) | 2 fiches, 10 commandes ; colonnes minimales (cmd/desc), sans env/certif ni risque ni exemple |
| Vocabulaire (`ENGLISH_VOCAB`) | 36 entrées ; type/en/fr ; aucun exemple en phrase |

## 5. Travaux réalisés dans le site

- Helper commun `normText` : recherche insensible à la casse et aux accents, appliquée aux trois rubriques et à la recherche globale.
- Compteur de résultats sous chaque champ ; messages « aucun résultat » conservés.
- Schémas étendus rétrocompatibles :
  - Glossaire : plus `cat` (thème) et `util` (utilité / exemple), affichés en badge et encadré.
  - Commandes : plus `env`/`certif` par fiche, et par commande `risk` (consultation / modification / destructif), `ex`, `mode` (prérequis/précaution) ; commandes destructives signalées en rouge.
  - Vocabulaire : plus `exEn`/`exFr` ; nouvelle colonne « Exemple (EN / FR) ».
- Recherche globale en haut de page : couvre désormais titres, codes, descriptions, sommaires, mots-clés et contenus de leçons ; un bandeau d'état sous la barre affiche le nombre de cours correspondants et, à résultat nul, indique les autres rubriques qui contiennent le terme (ex. « ACL » : 0 cours, mais Glossaire 5 / Commandes 8). Avant cette modification, aucune indication n'était affichée, ce qui induisait la confusion constatée dans les captures d'audit.

### Chiffres avant / après

| Rubrique | Avant | Après |
|---|---|---|
| Glossaire | 6 | 160 entrées uniques (thème + utilité + recherche accents) |
| Commandes | 2 fiches / 10 commandes | 15 fiches / 158 commandes |
| Vocabulaire | 36 | 186 entrées (dont 5 doublons supprimés par script) |

Contenu du glossaire par thèmes : fondements réseau, adressage/CIDR, services DNS/DHCP, commutation et Cisco, routage (statique/RIP/OSPF), administration Linux (systemd, journaux, LVM, fstab, permissions), Windows Server / AD, sécurité (PKI, VPN, IDS/IPS, DMZ, proxy, bastion, MFA), stockage/sauvegarde (3-2-1, RTO/RPO, VSS, GFS), virtualisation/conteneurs, supervision/ITIL/automatisation, cloud/Entra ID.
Contenu des commandes par environnements : Cisco IOS (3 fiches), Linux (8), Windows/PowerShell (4).
Vocabulaire organisé par contexte d'usage : documentation et consignes de labo, erreurs/pannes/journaux, réseau, système/Windows/Linux/conteneurs, sécurité, ticket/support, interface.

## 6. Fiabilité et traçabilité

- Toutes les entrées s'appuient sur les sources citées en section 2 ; aucune version de référentiel ni correspondance de certification n'est inventée.
- Les imprécisions repérées dans les sources ont été corrigées (`msfinfo32` → msinfo32) ; les notes douteuses n'ont pas été reprises telles quelles et restent signalées « à vérifier » quand elles subsistent.
- Aucune mention « contenu vérifié » automatique : les badges de vérification déjà présents n'ont pas été modifiés.
- QCM, examens blancs et évaluations de fin de CP : non touchés (hors périmètre de cette intervention, consigne initiale).

## 7. Tests réellement exécutés (Chromium, serveur local 8741)

- Chargement du site : OK, 0 erreur console JavaScript sur toutes les manipulations, H1 visible.
- Comptes réels des constantes chargées : Glossaire 160, Commandes 15/158, Vocabulaire 186, Cours 27.
- Absence de doublons : glossaire 0 doublon de `term` (script) ; vocabulaire 5 doublons trouvés puis supprimés ; Cours : ids `ccna-v2-1-x` distincts.
- Recherche : Glossaire « ACL » → 5, « reseau » (sans accent) → 61 ; Commandes « dns » → 2 fiches, « permissions » → 1 ; Vocabulaire « collision » → 4 (la recherche couvre aussi les phrases d'exemple).
- Combinaison recherche + filtre certification (glossaire) : CCNA + « dhcp » → 4 cartes (DHCP, DHCP Snooping, DORA, UDP) ; options du filtre [Tous, CCNA, AIS, TSSR].
- Message « aucun résultat » et compteur : OK sous chaque champ.
- Recherche globale : bandeau d'état visible, avec rattachement vers les autres rubriques si le terme est absent des cours.
- Affichage des colonnes du vocabulaire (Typologie / Anglais / Français / Exemple EN-FR) : OK.
- Débordement horizontal à la résolution actuelle : absent (scrollWidth = clientWidth).
- Non testé : impression A4 réelle (aucun pilotage d'imprimante disponible) ; vue 320 px (pas de redimensionnement de viewport possible) — l'audit anti-débordement reste positif, mais un contrôle sur mobile réel reste recommandé.
- Rendu final : onglet navigateur ouvert et focalisé sur http://localhost:8741/plateforme_de_r_vision_tssr_ais_ccna.html (vérification par inspection DOM ; la capture d'écran n'est pas réalisable : fenêtre de bureau non visible).

## 8. Restes à traiter (lot suivant)

1. Bloc « Renvois » dans chaque cours à leçons (liens vers glossaire / commandes / vocabulaire) + insertion des rubriques manquantes du plan 4.2 (Schéma, GUI/CLI par manipulation, Vérification, Pièges, Vocabulaire) dans les 19 cours à leçons.
2. Extraction du texte des ~40 fichiers-diapositives de `Cours_TSSR-main` (nécessite téléchargement des images ou accès aux PDF source).
3. Banque QCM ≥ 30/CP et examens blancs : hors périmètre demandé pour cette intervention (restent à trancher).
4. Test réel d'impression A4 (à faire sur une imprimante locale ou aperçu d'impression).
