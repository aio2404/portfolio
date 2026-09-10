# AlexOps — MESURE Systems Portfolio

Portfolio bilingue DevOps et automatisation IA construit avec Next.js, TypeScript et Tailwind CSS. L'interface suit une esthétique de spécification technique : papier chaud, encre sombre, signal vert, composants rectilignes et contenu orienté preuves.

## Démarrage

Node.js 18.18 ou plus récent est requis. La version locale recommandée est définie dans `.nvmrc`.

```bash
npm install
npm run dev
```

Le site est ensuite disponible sur `http://localhost:3000`.

## Commandes

- `npm run dev` — serveur de développement
- `npm run build` — build de production
- `npm run start` — démarrage en mode production
- `npm run lint` — vérification Next.js

## Surfaces

- `/` — page d'accueil persuasive, disponible en français et en anglais
- `/projects/[slug]` — études de cas structurées comme des documents techniques
- `/lab` — expériences interactives explicitement identifiées

La langue peut être sélectionnée avec `?lang=fr` ou `?lang=en`, puis via le sélecteur de l'interface.

## Design et contenu

- `DESIGN.md` — règles de design lisibles
- `.impeccable/design-system.json` — tokens et contraintes machine-readable
- `.impeccable/surfaces/` — briefs par surface
- `data/portfolioData.ts` — contenu bilingue et données des projets
- `app/globals.css` — tokens et styles globaux
- `components/visual/` — signature Three.js et fallback SVG

Les polices Geist sont auto-hébergées par le package `geist`. La scène Three.js est chargée côté client après hydratation, plafonnée à trois draw calls et remplacée par un SVG statique si WebGL ou le mouvement ne conviennent pas à l'appareil.
