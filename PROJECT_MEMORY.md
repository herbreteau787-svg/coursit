# PROJECT_MEMORY.md

## Objectif
Plateforme de révision + apprentissage TSSR (CP1-CP9), AIS (CP1-CP10) et CCNA 200-301 (parcours unique) : cours approfondis, QCM, labos guidés, commandes, scripts, centre de dépannage, glossaire, vocabulaire. Contenu pédagogique > fonctionnalités (interdiction de nouveaux widgets/onglets sauf demande explicite).

## Architecture
- **Site principal : Vite + React dans `app/`** (migration 2026-11-18). Source legacy mono-fichier conservée à la racine (`index.html`, React CDN+Babel — historique). Build : `cd app && npm run build` → `app/dist`. Base '/coursit/'. Déploiement : workflow `.github/workflows/deploy.yml` (build + actions/deploy-pages) — nécessite Settings→Pages→Source=GitHub Actions (à activer une fois). Ancien serveur local : `python -m http.server 8741` (racine legacy) ; preview Vite : `npx vite preview` (app/).
- **Structure app/src** : `App.jsx` (nav + onglets + état global) ; `components/DynamicSVGDiagram.jsx` ; `data/*.js` (19 modules : courses-ccna/tssr/ais, qcm, prep-qcm, labs, depannage, scripts-lib, ports, essentials-commands, private-ranges, http-codes, tools, tips-ps, tips-linux, glossary, english-vocab, cheatsheets, prep-domains) ; `assets/` (robynne.jpg 389 Ko = fond, alexander.jpg 307 Ko = bannière, logo.png) ; `public/` (logo, og-cover, robots, sitemap).
- **Illustrations pédagogiques Wikimedia** (dossier `Images/` + `app/public/images/`, référencees dans les leçons via `img:` + `imgCaption` — support dans LessonCourseView, base URL-relative `import.meta.env.BASE_URL`) : osi-model.jpg (PD), wifi-channels.svg (CC BY-SA, rendu en français par le navigateur), nat.png (CC BY-SA 4.0), dns-real-world.svg (PD), kerberos.svg (CC BY-SA 3.0), raid-types.jpg (composite des 4 diagrammes RAID, CC BY-SA). Cloud-computing.png : téléchargement bloqué (429 Wikimedia) → SVG cloud-modeles conservé. Téléchargements via Special:FilePath + retry patient (rate-limit 429), ou webfetch (texte) pour les SVG.
- Scripts de migration : `app/migrate.mjs` (extraction index.html→modules) + `app/fix-app.mjs` (correctifs post-migration). Tailwind compilé (fin du CDN JIT).
- Simulateurs (onglet Les Indispensables → 🧮 Simulateurs) : CIDR (masque/wildcard/plage/classe), VLSM (`subVlsmResult` useMemo : allocation du +grand au +petit, alignement, espace restant), IPv6 (développée/abrégée RFC5952, type ff/fe80/fc00/2000::/3, EUI-64 depuis MAC). États `subCidr/subVlsm/subV6`.
- SEO : meta description/keywords/OG/Twitter/canonical, JSON-LD WebSite, sitemap.xml + robots.txt (URLs herbreteau787-svg.github.io/coursit). Lighthouse : SEO 1.0, Best Practices 1.0, Accessibilité 0.94.
- ⚠️ Ne JAMAIS éditer les fichiers du projet avec Get-Content/Set-Content PowerShell (lecture ANSI = corruption UTF-8) — utiliser l'outil edit/write ou Node.
- Onglets : Dashboard (« Les indispensables du jour » : commande/port/PS tip/Linux tip/question réseau, indexés sur le jour de l'année), Cours & Fiches, **Les Indispensables** (`essentiels` : ports 36 entrées + quiz + favoris localStorage `ess_port_favs`, commandes 90 Windows/Linux/Cisco × 6 cats, adresses privées, CIDR /8-/32 calculé, codes HTTP, 15 outils), Banque QCM (180 — incl. 119 questions réinjectées de l'ancien Prépa Examen via conversion PREP_QCM→QCM_DATA ids 300+), Labos, Commandes, Scripts (29 scripts SCRIPTS_LIB Windows 15/Linux 14 par fréquence), Dépannage, Glossaire, Vocabulaire. Logo → Dashboard. Onglet « Prépa Examen » SUPPRIMÉ (PREP_QCM conservé pour la conversion, PREP_FICHES supprimé).
- Fond visuel : fond global `Images/robynne-o-HOrhCnQsxnQ-unsplash.jpg` (`body::before` opacity 0.16 + overlay sombre `body::after`), bannière Dashboard `Images/alexander-korte-5eIKzXXMMZw-unsplash.jpg`. Fixé, masqué en print. Animations `.fade-up/-2/-3`. Autres candidats dans `Images/` (travail uniquement).
- **Dashboard refondu** (`renderDashboard`) : 1. Parcours de formation (3 cartes TSSR/AIS/CCNA avec icônes SVG inline ParcoursIcon, % progression par parcours, bouton Accéder) ; 2. Banner `assets/images/dashboard-banner-network.jpg` + slogans ; 3. Indispensables du jour (cmd Windows + cmd Linux + port + astuce PS + question réseau, bouton Actualiser via `dashSeed`, animations fade-up) ; 4. PARCOURS CONSEILLÉ (6 étapes cliquables). Supprimés : session recommandée, Mon suivi, export/import/effacer, guide générique. `dashboardFollowUp` supprimé ; footer mentions légales ajusté.
- Sources locales (git-ignorées, non publiées) : PrepaExamTSSR-main, Knowledge-base-main, Labs-playground-main, PrepaCertifs-main, Scripts-main, Cheatsheets-main, Anki-Cards-main, cours_IT-main, Cours_TSSR-main, CCNA1.pdf.

## Conventions
- Chaque cours peut avoir 2 formats ; le routeur (`selectedCourse.lessons ?`) bascule :
  - Format **leçon** (rendu par `LessonCourseView`) : `lessons[{title, parts[{h,t,schema?}], schema?, table?}]` (schema = type DynamicSVGDiagram, table = tableau [[cellules]]) ; `guiSteps[{title,action,observation,mockup?,cli?}]`, `deepDive[{t,p[],cmd?,box,boxText}]` (box: remember/warn/admin/case), `exercices[{enonce,correction}]`, `resume`, `suite`, `evaluation[{q,options,answer,exp}]`.
- Moteur SVG `DynamicSVGDiagram` (~26 types) : schemas de fond (osi-tcpip, decoupage-subnet-v4, eui64, plan-canaux-wifi, dora, active-directory, network-topology, dhcp-exchange, troubleshooting-tree, duplex-mismatch, vm-conteneur, decision-client) + pédagogiques 2026 (vlan-segmentation, stp-election, etherchannel-lacp, ospf-zones, nat-flow, acl-evaluation, ipv6-slaac, arp-resolution, dns-resolution, gpo-lsdou, kerberos-flow, raid-niveaux, cloud-modeles, pra-pca-321, supervision-architecture) + 6 mockups GUI. Marqueur flèche `#ar` défini globalement (html). Schemas câblés dans CCNA 1.1/1.4/2.1/2.2/3.1/4.1/4.2 et TSSR CP2? (Kerberos/LSDOU via L1255/1259), CP4 (DHCP/DNS), CP5 (cloud), CP8 (RAID/PRA), AIS CP7 (supervision).
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
- `DEPANNAGE_DATA` : 30 fiches, 6 cats. `SCRIPTS_LIB` : 29 scripts (os win/lin, type PowerShell/Batch/Bash, freq ordre, description/usage/code/sortie/niveau). Ancien `SCRIPTS_DATA` supprimé.
- **Les Indispensables** : `PORTS_DATA` 36, `ESSENTIALS_COMMANDS` (os/cat/items{c,d}), `PRIVATE_RANGES`, `HTTP_CODES` 12, `TOOLS_DATA` 15, `PS_TIPS`/`LIN_TIPS` 10 chacun. États : essTab/essPortSearch/essPortProto/essPortFavs/essOs/essCat/portQuiz/scriptsOs/scriptsSearch.
- **Onglet Images** (`images`) : `IMG_POOL` = 5 noms de fichiers du dossier Images/ (hardcodés — rescan manuel si ajout). Test instantané via CSS var `--site-bg-image` ; bannière via état `imgBanner` (localStorage `site_banner_img`, `site_bg_img`) ; notation localStorage `img_ratings` (critères IMG_CRITERIA, helper `critsAvg`) ; recommandation calculée par `recommendation(meta)` (luminance canvas + ratio). Méta chargées en useEffect au démarrage (imgMeta).
- Labs : `LABS_DATA` (~23), CCNA labs lab-ccna-01..N. QCM : `QCM_DATA` (180 : 61 historiques + 25 CCNA 2.1-4.2 ids 141-165 + 119 réinjectées ids 300+, cp = nom de domaine D1-D14). Glossaire 177, vocab 321, commandes 223.

## Dépendances critiques
- CDN : React 18, ReactDOM, Babel standalone, Tailwind (chunks). Aucun build tooling.
- localStorage : progression modules, checklist labos, `ess_port_favs`, `site_bg_img`/`site_banner_img` (obsolètes, ignorés), `img_ratings` (obsolète).
- Mobile : liste des modules repliée par défaut sous lg (état `modsOpen`, bouton bascule `lg:hidden`, ordre grid `order-1/2/3` = toggle → sidebar → contenu ; sélection d'un module referme la liste). Desktop ≥ lg inchangé (sidebar sticky). Nav header déjà scrollable (`overflow-x-auto`) ; nav rapide mobile fixe en bas existe.

## Réalisées / historique récent (synthèse)
- Logo cliquable Dashboard ; blocs « Renvois utiles » retirés ; Examen Blanc supprimé ; sidebar sticky.
- CCNA unifié v1/v2 → parcours unique `CCNA` ; CCNA1.pdf et SpyKeeR exclus du dépôt.
- CP2 enrichi (AD, AGDLP, Kerberos, FSMO) ; CP1/CP3 enrichis ; 6 maquettes SVG GUI (ADUC, Server Manager, GPMC, terminal Linux, Cisco CLI, Hyper-V).
- Onglet Scripts (9 scripts pédagogiques). Dépannage refondu (30 fiches + dropdown). 10 cours CCNA complets rédigés depuis PrepaCertifs/ENCOR (checkpoints + modules 20-21).
- `.gitignore` à jour (sources + build).

## Prochaines tâches
1. Étendre `PREP_QCM`/QCM vers 200-300 questions. Ajouter des cours CCNA complets « OSI/TCP-IP + ARP » (1.8) et « Services réseau » (1.9).
2. QCM PrepaExamTSSR (30-40Q/CP) à importer dans `QCM_DATA`.
3. Labos : enrichir contexte entreprise + dépannage + validation depuis Labs-playground-main.
3. Convertir fiches CCNA restantes 1.2, 1.6 en format leçon.
4. Exploiter ENCOR Notes Modules 1-5 (170 Ko) pour approfondir 1.1/2.1/2.2/3.1.
5. Glossaire/commands : extension depuis Cheatsheets-main.
