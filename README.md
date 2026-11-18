# CoursIT — Plateforme de révision TSSR · AIS · CCNA 200-301

Plateforme de révision pour les certifications IT : cours TSSR (TP-01351), AIS (TP-01352), parcours CCNA 200-301, QCM expliqués, labos guidés Packet Tracer, bibliothèque de scripts, centre de dépannage, simulateurs CIDR/VLSM/IPv6.

## Architecture (Vite + React modulaire)

```
app/
├── index.html                  # entrée Vite + SEO (meta, Open Graph, JSON-LD)
├── vite.config.js              # base '/coursit/' pour GitHub Pages
├── tailwind.config.js          # thème brand + dark mode 'class'
├── src/
│   ├── main.jsx                # point d'entrée React
│   ├── App.jsx                 # application (navigation, onglets, état global)
│   ├── index.css               # Tailwind + styles du site (fond photo, animations)
│   ├── components/
│   │   └── DynamicSVGDiagram.jsx   # moteur de ~26 schémas SVG pédagogiques
│   ├── data/                   # contenu pédagogique découpé par thème
│   │   ├── courses-ccna.js / courses-tssr.js / courses-ais.js
│   │   ├── qcm.js / prep-qcm.js
│   │   ├── labs.js / depannage.js / scripts-lib.js
│   │   ├── ports.js / essentials-commands.js / private-ranges.js
│   │   ├── http-codes.js / tools.js / tips-powershell.js / tips-linux.js
│   │   ├── glossary.js / english-vocab.js / cheatsheets.js
│   ├── assets/                 # images optimisées (fond, bannière, logo)
└── public/                     # logo, favicon, robots.txt, sitemap.xml, og-cover
```

## Développement

```bash
cd app
npm install
npm run dev        # serveur de dev (http://localhost:5173/coursit/)
npm run build      # build de production dans app/dist
npm run preview    # prévisualisation du build
```

## Déploiement GitHub Pages

Le workflow `.github/workflows/deploy.yml` construit `app/dist` et le déploie automatiquement à chaque push sur `master` (dossier `app/**` modifié).

**Une seule action manuelle à faire une fois** : dans GitHub → Settings → Pages → Source : **GitHub Actions**.

Le site est alors publié sur `https://herbreteau787-svg.github.io/coursit/`.

## La version historique mono-fichier est archivée dans **`legacy/index.html`** (React CDN + Babel — source de l'extraction modulaire). Le `index.html` à la racine est désormais un simple **chargeur** : il redirige automatiquement vers `app/dist/index.html` (le build Vite local) ou vers la version en ligne — aucune logique métier.

## Contenu pédagogique

- **27 cours** au format leçons + schémas SVG + procédures pas-à-pas + exercices corrigés + quiz
- **180 QCM** expliqués (dont banque d'entraînement Cisco-style)
- **23 labos guidés** (Packet Tracer, Windows, Linux)
- **30 fiches de dépannage** par fréquence réelle (symptôme → diagnostic → cause → résolution → cas d'entreprise)
- **29 scripts opérationnels** Windows/Linux commentés avec sorties réelles
- **Les Indispensables** : 36 ports + quiz, 90 commandes, CIDR /8-/32, codes HTTP, 15 outils, **simulateurs CIDR / VLSM / IPv6**
- **22 schémas SVG** pédagogiques intégrés aux leçons
