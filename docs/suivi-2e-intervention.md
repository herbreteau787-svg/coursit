# Suivi phase finale — professionnelisation (2026-11-10, session 2)

## Sauvegardes

- `sauvegarde_plateforme_2026-11-10_avant-vocab-labos.html` (état avant les deux dernières sessions)
- Dépôt Git initialisé : commit `10ea1d0` « Initial commit »

## Livré dans cette phase

### Cours
- Blocs « Renvois » (QCM / Labo / Commandes / Glossaire) **supprimés** du contenu des fiches : ces accès restent dans la navigation principale. L'espace récupéré profite au contenu.
- Refonte profonde des 19 CP : non faite dans cette session (voir restes).

### Navigation
- Le logo/titre **« CoursIT »** est désormais cliquable partout : retour immédiat au Dashboard (scroll en haut), avec libellé explicite.

### Commandes
- Classement **par fréquence d'usage** (champ `freq` 1-5 ajouté aux 208 commandes) :
  - **TOP COMMANDES INDISPENSABLES** ★★★★★ (34, quotidienne)
  - ★★★★ fréquente (37) · ★★★ régulière (114) · ★★ occasionnelle (16) · ★ avancée (7)
- Filtre par système (Tous / Cisco / Windows / Linux / Autres), recherche par nom + usage + cas, favoris (localStorage `tssr_cmd_favorites`), copie rapide (Clipboard + repli).
- Total : **208 commandes** (Cisco 52 · Windows 48 · Linux 109 · Autres 10) — objectifs 150/200/200 non atteints, restent ~330 commandes.

### Vocabulaire anglais
- **321 termes** (+16 : LLC, MAC address, CSMA/CD, CSMA/CA, broadcast, unicast, FHRP, load balancing, bastion, jump server, SIEM, SOC, PRA, PCA, RPO, RTO).
- Colonne Typologie supprimée ; filtre par catégorie ; recherche sur définitions et exemples.

### Glossaire
- **177 entrées** (+17 : LLC, CSMA/CD, CSMA/CA, CAM, EtherChannel, RSTP, BPDU, EIGRP, DFS, PRA, PCA, EBIOS RM, MITRE ATT&CK, Zero Trust, SOAR, CVSS + enrichissement des 6 d'origine) — chacune avec définition, contexte et exemple concret.

### GitHub
- `README.md` (présentation, fonctionnalités, parcours, installation, lancement).
- `.gitignore` (exclut les sources de cours tierces, `CCNA1.pdf` sous copyright Cisco, et les sauvegardes).
- Dépôt Git initialisé, commit initial `10ea1d0`.

### Dashboard
- Vérifié : progression et cartes présentes, aucune erreur console, aucune donnée de test résiduelle (localStorage nettoyé après tests).

## Tests exécutés (navigateur réel)

- Chargement + **0 erreur console** sur les 8 onglets.
- Dashboard : progression + cartes OK ; logo → retour Dashboard OK.
- QCM : banque affichée ✓ ; Examen blanc : 3 cartes ✓.
- Labos : 23 cartes ✓ ; filtre TSSR ✓ ; case d'étape + progression 33 % ✓ ; marquage terminé ✓ (données de test nettoyées ensuite).
- Commandes : groupes d'étoiles affichés avec compteurs ✓ ; favoris + copie ✓.
- Glossaire : 177 ✓ ; filtre CCNA ✓ ; vocabulaire : 321 lignes ✓ ; filtre catégorie Linux → 39 ✓.
- Cours : fiche TSSR CP1 ouverte, leçons rendues, renvois supprimés ✓ ; navigation précédent/suivant ✓.
- Aucun débordement horizontal (1281 px).

## Incident corrigé pendant la session

Un script de remplacement a corrompu le fichier (plage d'indices négative) : restauration immédiate depuis la sauvegarde du 10/11 puis **rejeu complet** des ajouts de contenu à partir des fichiers de travail conservés (vocab_b1-6, gloss_b1, lab_c/t/a, cmd_growth, freq) — vérifié ensuite par le navigateur (23 labos, 321 vocab, 177 gloss, 208 cmd, 0 erreur). Aucune perte de donnée utilisateur (localStorage intact).

## Restes à traiter (priorisés)

1. **Refonte profonde des 19 CP** (30-60 min de lecture chacun, encadrés « À retenir / Erreur fréquente / Conseil d'administrateur », études de cas) — la priorité pédagogique du cahier des charges.
2. **Commandes** : +331 pour 150/200/200 (Cisco +98, Windows +152, Linux +91).
3. **Labos** : +37 pour 20/20/20 (TSSR +12, AIS +16, CCNA +9).
4. **Vocabulaire** : définitions manquantes sur ~186 anciens termes.
5. Captures d'écran réelles (Gestionnaire de serveur, ADUC, GPMC…) : impossible sans environnement Windows/Cisco capturé — à fournir par l'utilisateur ou via maquettes SVG supplémentaires.
