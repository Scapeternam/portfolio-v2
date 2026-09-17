# WireFrames — Case Study

## Problème résolu
Produire un site par prospect à la main ne passe pas à l'échelle : restylage manuel, dérives entre dossiers, risque de casser les apps existantes et licence des composants non maîtrisée.

## Solution
Factory CSV → app : chaîne de production qui génère des applications prospects indépendantes et déployables, avec offres par paliers, identité par secteur et moteur commercial local (panier, commande, contact).

## Architecture
- **Boilerplate**: Nuxt/Vue/TypeScript, Lucide, GSAP
- **Génération**: factory CSV → app par prospect, tier et secteur séparés de l'identité
- **Apps générées**: indépendantes, install/build propres, template préservé
- **Pipeline**: n8n → Supabase self-hosted pour l'ingestion prospects
- **Moteur local**: panier, simulation de commande, activité gérant

## Décisions techniques
- Factory CSV plutôt que restylage manuel des dossiers (clarification 2026-09-08)
- Templates immuables : les pilotes ne sont jamais écrasés par les nouvelles générations
- GSAP uniquement pour l'interaction concernée, désactivé en reduced motion
- Gate de licence avant toute redistribution du boilerplate comme template

## Résultats
- 3 apps pilotes générées, 323 tests et 54 E2E verts
- 611 hashes source vérifiés inchangés sur 61 dossiers legacy
- Référence Restaurant Signature livrée en local (10 tests + 12 cas navigateur)
