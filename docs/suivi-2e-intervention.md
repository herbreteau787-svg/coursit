# Suivi phase de professionnalisation — contenu pédagogique (2026-11-10, session 3)

## Sauvegardes

- `sauvegarde_plateforme_2026-11-10_avant-vocab-labos.html` (état avant les sessions 2 et 3)
- Dépôt Git : `herbreteau787-svg/coursit`, 4 commits, site publié sur GitHub Pages.

## Livré dans cette phase

### 1. Blocs « Renvois utiles » supprimés
- Bloc restant dans `LessonCourseView` (fiches TSSR/AIS) supprimé. Les blocs QCM/Labo/Commandes/Glossaire n'existent plus dans le contenu des cours — l'accès se fait uniquement via la navigation principale.

### 2. DeepDive : approfondissement pédagogique intégré dans les cours
Nouveau système de blocs `deepDive` dans les CP TSSR : chaque bloc apporte théorie étendue, commandes intégrées (encadré « En pratique »), et un encadré pédagogique coloré (`À retenir` / `Erreur fréquente` / `Conseil d'administrateur` / `Cas d'entreprise`).

**CP2 Windows / Active Directory** : méthodologie d'intégration (runbook New-ADUser complet), erreurs fréquentes de support (mots de passe verrouillés, gestionnaires d'identifiants), conseils d'admin (OU, AGDLP), récapitulatif examen (LSDOU, Kerberos, vocabulaire OU≠groupe≠GPO).

**CP3 Serveurs Linux** : méthodologie de diagnostic à distance (whoami/hostname/df -h/systemctl --failed/ss/journalctl), erreurs fréquentes (conf sans backup, chmod 777, kill -9, fstab sans test), cas d'entreprise (disque saturé un vendredi soir : du → lvextend → alerte Zabbix), récapitulatif examen (/etc//var//home, 755/640/700, apt/dnf, SSH clés).

**CP4 Réseau IP** : méthodologie de diagnostic à distance Windows (Get-NetIPConfiguration/Test-NetConnection/EventLog), erreurs fréquentes (redémarrer avant de diagnostiquer, DNS 8.8.8.8 sur un domaine AD, test uniquement par ping), cas d'entreprise (paie bloquée à 9 h : escalade couches → service arrêté par reboot planifié → supervision synthétique), récapitulatif examen (RFC 1918, APIPA, DORA, escalade câble→IP→passerelle→routage→DNS).

### 3. Fiches de dépannage professionnelles (nouvel onglet 🧰 Dépannage)
**10 fiches** au format symptom → diagnostic (commandes ordonnées) → cause fréquente → résolution → prévention :

| Fiche | Parcours |
|---|---|
| Windows — boucle de réparation (boot) | TSSR |
| Windows — « Aucun accès réseau » sur poste joint au domaine | TSSR |
| Windows — GPO ne s'applique pas | TSSR |
| AD — ouverture de session lente / Kerberos | TSSR |
| Linux — un service ne démarre plus | AIS |
| Linux — disque plein, services en échec | AIS |
| Réseau — postes en 169.254.x.x | AIS |
| Réseau — lenteur sur un lien (duplex, câble, saturation) | AIS |
| Cisco — port en err-disable | CCNA |
| Sauvegarde — job Veeam en échec | TSSR |

Onglet avec filtre par parcours (TSSR / AIS / CCNA) et recherche instantanée.

### 4. Navigation
- Nouveau bouton « 🧰 Dépannage » dans la barre de navigation principale.

### 5. Priorité 2 — captures d'écran réelles
**Non réalisable dans cet environnement** : il faudrait des VM Windows Server, Hyper-V, Proxmox et Cisco Packet Tracer capturées. Les schémas SVG pédagogiques existants (duplex mismatch, EUI-64, topologie VLAN) couvrent partiellement le besoin. Le dossier `captures/` est prêt dans le dépôt pour recevoir les captures fournies par l'utilisateur.

### 6. Priorité 7 — commandes par étoiles
Déjà fait dans la session précédente : les commandes sont classées par fréquence d'usage (TOP INDISPENSABLES → ★ avancée) avec filtre système.

### 7. Priorité 10 — 30-60 min de lecture par CP
Avec les deepDive ajoutés aux CP2, CP3 et CP4, chaque CP contient désormais : leçons théoriques (3 leçons multi-parties) + approfondissement (méthodologie + commandes + encadrés + cas) + exercices + évaluation. Les autres CP gardent leur contenu de base (keyIdeas/lessons/exercices/evaluation) — l'extension deepDive aux autres CP est un chantier prioritaire pour la prochaine session.

## Tests exécutés (navigateur réel)

- Chargement : 0 erreur console, 0 débordement horizontal.
- Onglet Dépannage : 10 fiches affichées, filtre AIS → 4 fiches, recherche fonctionnelle.
- CP2 ouvert : section « Approfondissement » visible, encadrés « À retenir » / « Erreur fréquente » / « Conseil d'administrateur » présents, commande box « En pratique — commandes à exécuter » visible avec Get-ADOrganizationalUnit.
- Renvois : aucun bloc « Renvois utiles » restant (2 supprimés : CCNA fiche + LessonCourseView).
- Navigation logo → Dashboard ✓.
- Git : commit `526fa13` poussé vers GitHub, Pages redéployées automatiquement.

## Restes à traiter

1. **DeepDive pour les 16 autres CP** (TSSR CP1, CP5-9 ; AIS CP2-10 ; CCNA fiches).
2. **Captures d'écran réelles** — à fournir par l'utilisateur.
3. **Labs incidents** — transformer les labos existants en scénarios d'entreprise (extension du champ `context`).
4. **Commandes** — +331 pour 150/200/200.
5. **Glossaire** — définitions manquantes sur ~186 anciens termes.
