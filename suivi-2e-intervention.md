# Suivi de la 2e intervention — vocabulaire / commandes / labos (2026-11-10)

## Sauvegarde avant modifications

- `sauvegarde_plateforme_2026-11-10_avant-vocab-labos.html` (copie du site avant cette série de changements)
- Sauvegarde antérieure du 09/11 toujours en place : `sauvegarde_plateforme_2026-11-09.html`

## 1. Onglet Vocabulaire Anglais

- Colonne « Typologie » **supprimée** du tableau (desktop et mobile) ; la catégorie reste disponible via un filtre.
- Tableau : Terme anglais | Français | Définition | Exemple (EN/FR) ; affichage responsive (tableau masqué sur mobile, cartes à la place).
- Recherche instantanée maintenue (casse et accents ignorés) + filtre par catégorie (13 catégories de référence : Réseau, Cisco, Windows Server, Linux, Active Directory, Virtualisation, Cybersécurité, Cloud, Sauvegarde, Supervision, DevOps, ITIL, Base de données, plus Documentation/Interface/Support pour le vocabulaire de communication).
- Entrées : 186 → **305 termes** (+119 avec définition + exemple). Les entrées plus anciennes (186) n'ont pas encore toutes leur colonne « Définition » renseignée (affichée « — ») : travail restant identifié.

## 2. Onglet Commandes

- Regroupement clair en sections : **A. Cisco IOS** / **B. Windows / PowerShell** / **C. Linux** / D. Autres (Docker).
- Chaque commande : nom, description, exemple, cas d'utilisation (champ `case` ajouté), risque (consultation / modification / destructif) et prérequis conservés.
- Moteur de recherche (nom + usage + cas) et filtre par système (boutons Tous / A / B / C / D).
- Favoris : bouton étoile par commande, persistance localStorage `tssr_cmd_favorites`.
- Copie rapide : bouton ⧉ copie la commande (Clipboard API avec repli execCommand), retour visuel « ✓ » 1,6 s.
- Comptes actuels : **219 commandes** (Cisco 52 · Windows/PS 48 · Linux 109 · Autres 10). Objectifs 150/200/200 non atteints dans cette session : ~330 commandes restent à ajouter (liste de priorités dans le rapport).

## 3. Onglet Labos Guidés

- Nouvelle bibliothèque : cartes de labos (badges parcours + niveau + durée), filtres parcours (TSSR/AIS/CCNA) et niveau (Débutant/Intermédiaire/Avancé), recherche instantanée.
- Bouton « Commencer le labo » / « Continuer le labo » ouvrant la vue détaillée ; progression par étape (cases à cocher + barre), marquage « labo terminé » persistés (localStorage `tssr_lab_checklist` / `tssr_lab_done`).
- Chaque labo contient : objectif, contexte métier, prérequis, topologie, étapes CLI avec points de contrôle, pièges fréquents, vérifications attendues, diagnostic OSI et correction complète masquée (FONC-08).
- Comptes actuels : **23 labos** (CCNA 11 · TSSR 8 · AIS 4) sur l'objectif 20/20/20 (60). Le labo d'origine (inter-VLAN) est devenu `lab-ccna-01` enrichi (contexte, topologie, pièges, vérifications).

## 4. Cours (fiches TSSR / AIS / CCNA)

- Bloc « Renvois » de fin de cours allégé : une seule ligne compacte de liens texte (QCM, Labo, Commandes, Glossaire, Vocabulaire) remplace les trois gros boutons, pour laisser la place au contenu.
- La profondeur pédagogique complète (30-60 min de lecture par CP, encadrés « À retenir / Erreur fréquente / Conseil d'administrateur ») reste le **gros lot suivant** : elle exige une réécriture des 19 cours à leçons à partir de `cours_IT-main`, `Cours_TSSR-main` et `CCNA1.pdf` (curriculum CCNA v7 Introduction to Networks, 15 Mo, lu partiellement — trop volumineux pour un traitement intégral en session).

## 5. Tests exécutés (Chromium, http://localhost:8741)

- 0 erreur console JavaScript après stabilisation du fichier (plusieurs syntaxes invalides introduites puis corrigées : guillemets imbriqués, virgules manquantes entre labos, bloc mal placé dans le tableau vocabulaire — tous corrigés et revalidés).
- Vocabulaire : 305 termes, filtre catégorie (Linux → 39), recherche par exemple fonctionnelle, pas de colonne Typologie.
- Commandes : 4 sections visibles avec compteurs (52/48/109/10), favoris actifs (1 test puis nettoyé), copie validée (retour ✓).
- Labos : 23 cartes, filtre TSSR → 8, case étape → « Progression : 1/3 étapes (33 %) », « Marquer le labo terminé » → badge « ✓ Terminé » ; données de test nettoyées après vérification.
- Recherche globale, navigation cours (précédent/suivant), renvoi compact : OK.
- Pas de débordement horizontal (scrollWidth = clientWidth).

## 6. Restes à traiter (ordre proposé)

1. Labos : +37 (12 CCNA, 12 TSSR, 13 AIS) pour atteindre 20/20/20 — format et modèle de données déjà en place.
2. Commandes : +331 (Cisco ~100, Windows/PS ~150, Linux ~90) pour atteindre 150/200/200.
3. Vocabulaire : renseigner la définition des 186 anciennes entrées (aujourd'hui « — »).
4. Cours : réécriture profonde des 19 modules (30-60 min de lecture chacun) avec encadrés pédagogiques, à partir des sources + CCNA1.pdf.
