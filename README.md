# Portfolio DevOps / AI Automation (Next.js + Tailwind CSS)

## Aperçu

Ce template Next.js App Router fournit un portfolio moderne, sobre et responsive pour un profil hybride :

- DevOps
- Développement
- IA / automatisation
- Intégration d’outils et workflows
- Projets techniques orientés résultats

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (icônes)

## Langues

- Anglais par défaut
- Bascule vers le français via le bouton `Français` / `English` dans le header
- Persistance du choix langue via le navigateur (`localStorage`)

## Lancement rapide

```bash
npm install
npm run dev
```

Ouvre ensuite `http://localhost:3000`.

## Commandes utiles

- `npm run build` — build de production
- `npm run start` — démarrage en mode production
- `npm run lint` — vérification lint

## Fichiers principaux

- `app/page.tsx` : page principale avec toutes les sections
- `app/layout.tsx` : metadata SEO + polices + structure globale
- `app/globals.css` : styles globaux et animations
- `data/portfolioData.ts` : **données mockées facilement modifiables**
- `components/sections/*` : composants réutilisables par section
- `components/ui/SectionShell.tsx` : conteneur réutilisable de section

## Personnalisation

Edite `data/portfolioData.ts` pour changer rapidement :

- Nom / titre
- Email / GitHub / LinkedIn
- Texte des sections
- Compétences et stack projets
- Étapes de méthode

## SEO minimal

Les champs `title`, `description` et `openGraph` sont déjà configurés dans `app/layout.tsx`.
