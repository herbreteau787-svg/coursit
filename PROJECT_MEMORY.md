# PROJECT_MEMORY.md

## Objectif
Plateforme de révision + apprentissage TSSR (CP1-CP9), AIS (CP1-CP10) et CCNA 200-301 (parcours unique) : cours approfondis, QCM, labos guidés, commandes, scripts, centre de dépannage, glossaire, vocabulaire. Contenu pédagogique > fonctionnalités (interdiction de nouveaux widgets/onglets sauf demande explicite).

## Architecture
- Site SPA single-file : `index.html` (React via Babel in-browser + Tailwind CDN). Tout est embarqué : données + rendu + logique.
- Dépôt : `github.com/herbreteau787-svg/coursit` (compte CLI `herbreteau787-svg`). Pages : `https://herbreteau787-svg.github.io/coursit/`. Branche `master`. `.nojekyll`.
- Serveur local : `python -m http.server 8741 --directory "C:\Users\Léo\Documents\Site-Cours IT"`.
- Onglets : Dashboard, Cours & Fiches, Banque QCM, Labos Guidés, Commandes, Scripts, Dépannage, Glossaire, Vocabulaire Anglais. Logo → Dashboard. Pas d'onglet Examen Blanc.
- Sources locales (git-ignorées, non publiées) : PrepaExamTSSR-main, Knowledge-base-main, Labs-playground-main, PrepaCertifs-main, Scripts-main, Cheatsheets-main, Anki-Cards-main, cours_IT-main, Cours_TSSR-main, CCNA1.pdf.

## Conventions
- Chaque cours peut avoir 2 formats ; le routeur (`selectedCourse.lessons ?`) bascule :
  - Format **leçon** (rendu par `LessonCourseView`) : `lessons[{title, parts[{h,t}]}]`, `guiSteps[{title,action,observation,mockup?,cli?}]`, `deepDive[{t,p[],cmd?,box,boxText}]` (box: remember/warn/admin/case), `exercices[{enonce,correction}]`, `resume`, `suite`, `evaluation[{q,options,answer,exp}]`.
  - Format **fiche** : `why, keyIdeas, schemaType, guiProcedure, cliProcedure, verification, pitfalls, vocab, links` (links inutilisé).
- Dépannage : `DEPANNAGE_DATA` — 30 fiches, 6 cats. `SCRIPTS_DATA` : 9 scripts.
- **Préparation Examen (onglet `prep`)** : `PREP_DOMAINS` (14), `PREP_FICHES` (14), `PREP_QCM` (119, types vf/qcm/multi/config, lvl 1-4). 4 modes : fiches / entraînement (filtre domaine+niveau) / simulateur (20 Q tirées, 30 min, score+correction) / subnetting (génération aléatoire + vérification auto). États : prepMode, prepDom, prepLvl, simQueue/simAnswers/simIdx/simDone/simTime/simRunning, subStreak. Helpers : `prepHelpers.shuffle/newSubExercise`.
- Scripts : `SCRIPTS_DATA` — `{id, cat, titre, objectif, code, explications[], resultat, risques}`.
- Navigation locale de dépannage : état `selectedDepId` (App), liste déroulante + fiche complète ou cartes groupées par freq.
- Français uniquement, apostrophes dans chaînes double-quoted. Attention aux apostrophes non échappées dans titres (source d'erreurs Babel).
- Tester après chaque modification structurante (browser tab `localhost:8741/index.html?v=publish`). Erreur console non-BABEL = blocker.

## Données clés (état actuel)
- `COURSES_DATA` (CCNA) : 13 entrées — cours complets 1.1, 1.3, 1.4, 1.5 (9 leçons), 1.7, 2.1, 2.2, 3.1, 4.1, 4.2 + fiches 1.2, 1.6, dom4.
- `TSSR_COURSES` CP1-CP9 et `AIS_COURSES` CP1-CP10 : format leçon, guiSteps/deepDive variables.
- `DEPANNAGE_DATA` : 30 fiches, 6 cats. `SCRIPTS_DATA` : 9 scripts, 3 cats.
- Labs : `LABS_DATA` (~23), CCNA labs lab-ccna-01..N. QCM : `QCM_DATA` (61 — CCNA 1.1-1.7 + 25 nouvelles pour 2.1-4.2, ids 141-165). Glossaire 177, vocab 321, commandes 223.

## Dépendances critiques
- CDN : React 18, ReactDOM, Babel standalone, Tailwind (chunks). Aucun build tooling.
- localStorage : progression modules, checklist labos.

## Réalisées / historique récent (synthèse)
- Logo cliquable Dashboard ; blocs « Renvois utiles » retirés ; Examen Blanc supprimé ; sidebar sticky.
- CCNA unifié v1/v2 → parcours unique `CCNA` ; CCNA1.pdf et SpyKeeR exclus du dépôt.
- CP2 enrichi (AD, AGDLP, Kerberos, FSMO) ; CP1/CP3 enrichis ; 6 maquettes SVG GUI (ADUC, Server Manager, GPMC, terminal Linux, Cisco CLI, Hyper-V).
- Onglet Scripts (9 scripts pédagogiques). Dépannage refondu (30 fiches + dropdown). 10 cours CCNA complets rédigés depuis PrepaCertifs/ENCOR (checkpoints + modules 20-21).
- `.gitignore` à jour (sources + build).

## Prochaines tâches
1. Étendre `PREP_QCM` vers 200-300 questions (types dépannage/subnet explicites, drag-drop non supporté nativement en HTML — simuler par options). Ajouter un cours CCNA complet « OSI/TCP-IP + ARP » (code 1.8) et « Services réseau (DNS/HTTP/FTP/TFTP/SSH) » (code 1.9).
2. QCM PrepaExamTSSR (30-40Q/CP) à importer dans `QCM_DATA` (fait partiellement : CCNA 2.1-4.2 couverts).
3. Labos : enrichir contexte entreprise + dépannage + validation depuis Labs-playground-main.
3. Convertir fiches CCNA restantes 1.2, 1.6 en format leçon.
4. Exploiter ENCOR Notes Modules 1-5 (170 Ko) pour approfondir 1.1/2.1/2.2/3.1.
5. Glossaire/commands : extension depuis Cheatsheets-main.
