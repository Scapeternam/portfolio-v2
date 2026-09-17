# Poulpi — Case Study

## Problème résolu
PME, restaurants et cabinets ont besoin de présence en ligne mais n'ont ni le temps ni les compétences pour gérer leur site, automatisation et visibilité.

## Solution
Agence IT de 8 collaborateurs Epitech structurée en 3 squads (Front, Back, SEO/Ops). Offres allant du site vitrine à 500 EUR au SaaS sur mesure à 40 000 EUR. La factory WireFrames industrialise la production d'apps prospects.

## Architecture
- **Front**: Next.js, Nuxt/Vue pour les sites clients
- **Back**: Supabase, n8n pour l'automatisation
- **Prospection**: Playwright, PagesJaunes, Google Maps, scraping
- **CRM**: Suivi prospects, qualification, cold calling
- **Factory**: WireFrames (CSV → app indépendante par prospect)

## Décisions techniques
- Monorepo pour partager les composants entre projets clients
- CMS headless (Supabase) pour que les clients puissent éditer leur contenu
- n8n pour automatiser la génération de leads et le suivi
- Factory CSV → app plutôt que restylage manuel des dossiers prospects

## Résultats
- 8 collaborateurs onboardés
- Workflow de prospection opérationnel
- Missions de 500 à 40 000 EUR structurées
- 3 apps pilotes générées par la factory (323 tests, 54 E2E)
