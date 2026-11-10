# CoursIT — Plateforme d'apprentissage TSSR · AIS · CCNA

CoursIT est une plateforme d'apprentissage destinée aux étudiants et professionnels de l'informatique. Elle accompagne la préparation des titres professionnels **TSSR (TP-01351)** et **AIS (TP-01352)** ainsi que la certification **Cisco CCNA 200-301**, du niveau débutant jusqu'aux compétences d'administration réseau et systèmes.

![logo](logo.png)

## Parcours disponibles

| Parcours | Contenu |
|---|---|
| **TSSR** | CP1 centre de services · CP2 Windows / Active Directory · CP3 serveurs Linux · CP4 réseau IP · CP5 virtualisation · CP6 scripting · CP7 interconnexion & sécurité · CP8 sauvegarde · CP9 déploiement |
| **AIS** | Durcissement des systèmes, supervision, sécurité réseau, PRA/PCA, Cloud & Microsoft 365 |
| **CCNA 200-301** | Sujets 1.1 à 1.7 du domaine 1 (Network Fundamentals), alignés sur le curriculum Cisco (*CCNA 1 — Introduction to Networks*) |

Les notions communes aux trois parcours sont mutualisées : une même notion n'est expliquée qu'une fois, les fiches se renvoient mutuellement.

## Fonctionnalités

- **Cours interactifs** : théorie, procédures pas à pas CLI et GUI, schémas SVG pédagogiques, points de vigilance.
- **QCM** : banque filtrable, trois modes (Entraînement, Chronométré, Révision des erreurs), explications par question, score par CP.
- **Laboratoires guidés** : bibliothèque filtrable (parcours / niveau), contexte métier, étapes avec points de contrôle, pièges fréquents, correction complète masquée, progression par étape et marquage terminé.
- **Commandes** : classées par fréquence d'usage (TOP indispensables ★★★★★ → ★ avancée), filtre par système (Cisco IOS / Windows-PowerShell / Linux), favoris, copie rapide, distinction consultation / modification / destructif.
- **Glossaire** : définitions bilingues avec contexte et exemple concret, filtre par certification.
- **Vocabulaire anglais** : termes avec définition, traduction et phrase d'exemple, filtre par catégorie.
- **Suivi de progression** : dashboard (CP acquis, prochaine étape suggérée, scores QCM par CP), export / import / effacement JSON.
- **Confort** : thème clair/sombre, réglage de taille de police, recherche globale plein texte, recherche insensible à la casse et aux accents dans chaque rubrique, navigation mobile, mentions légales RGPD, signalement d'erreur.

## Installation

Aucune installation n'est requise : le site est un **fichier unique** (`index.html`) qui utilise des CDN (React 18, Babel, Tailwind) et le `localStorage` du navigateur.

```bash
git clone https://github.com/<votre-compte>/coursit.git
cd coursit
```

Il suffit ensuite d'ouvrir `index.html` dans un navigateur, ou de servir le dossier (recommandé, voir ci-dessous).

## Lancement

```bash
# Option 1 — Python (recommandé)
python -m http.server 8741
# puis ouvrir http://localhost:8741/index.html

# Option 2 — Node
npx serve .

# Option 3 — PHP
php -S localhost:8741
```

> L'URL directe du fichier : `http://localhost:8741/index.html`. Cliquer sur le titre **CoursIT** en haut à gauche ramène au Dashboard depuis n'importe quel onglet.

## Technologies utilisées

| Technologie | Rôle |
|---|---|
| React 18 (CDN, sans build) | Interface utilisateur |
| Babel standalone (CDN) | JSX transpilé dans le navigateur |
| Tailwind CSS (CDN) | Mise en forme, thème clair/sombre |
| SVG inline | Schémas pédagogiques générés |
| localStorage | Progression, scores QCM, erreurs, favoris, checklist de labos, préférences |
| Python `http.server` / `npx serve` | Serveur statique de développement |

Aucune dépendance npm, aucun build : tout tient dans un fichier HTML de ~660 Ko.

## Captures

Les captures d'écran du site (Dashboard, Banque QCM, Labos guidés, Commandes, Glossaire, Vocabulaire) sont à déposer dans le dossier [`captures/`](captures/). Voir [`captures/LISEZMOI.md`](captures/LISEZMOI.md) pour la liste recommandée.

## Structure du dépôt

```
index.html          Le site complet (données pédagogiques + interface)
logo.png            Logo
docs/               Suivi pédagogique et technique (audit des sources, journal des ajouts)
captures/           Emplacement des captures d'écran
.nojekyll           Désactive le traitement Jekyll de GitHub Pages
```

Les dossiers de cours sources (`cours_IT-main`, `Cours_TSSR-main`) et le PDF du curriculum ne sont pas inclus dans le dépôt : ils servent de référence locale et sont couverts par des droits tiers.

## Publier sur GitHub Pages

Le site étant 100 % statique avec des chemins relatifs, GitHub Pages le sert sans configuration :

1. Pousser le dépôt sur GitHub (voir procédure dans l'historique Git ou : `git remote add origin https://github.com/<compte>/coursit.git && git push -u origin master`).
2. Sur GitHub : **Settings → Pages → Source : `master` / racine (`/`)**.
3. Le site est alors servi à l'adresse : `https://<compte>.github.io/coursit/` (le fichier `index.html` est détecté automatiquement, `.nojekyll` évite tout traitement Jekyll).

## Périmètre des données & confidentialité

Toute la progression utilisateur reste **dans le navigateur** (localStorage) : aucune donnée n'est transmise à un serveur. Export/import JSON disponible depuis le Dashboard.

Les mots de passe présents dans les laboratoires (`P@ssw0rd`, `Azerty1*`…) sont des **exemples pédagogiques fictifs** destinés aux VM de formation — jamais des identifiants réels.

## Contribuer

Le projet est volontairement un fichier unique (déploiement pédagogique simplifié). Pour enrichir le contenu, éditer les tableaux de données en tête de `index.html` :

- `COURSES_DATA` — cours et fiches
- `LABS_DATA` — laboratoires guidés
- `QCM_DATA` — banque de questions
- `CHEAT_SHEETS` — commandes (champ `freq` = fréquence d'usage 1-5)
- `GLOSSARY_DATA` — glossaire
- `ENGLISH_VOCAB` — vocabulaire anglais

## Avertissement

Les QCM et examens blancs n'ont **aucune valeur de certification officielle**. Les référentiels (TP-01351, TP-01352, blueprint Cisco 200-301) sont cités à titre de cadrage, jamais recopiés.
