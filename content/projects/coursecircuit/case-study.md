# CourseCircuit — Case Study

## Probleme resolu
Les producteurs locaux n'ont pas d'infrastructure pour vendre en circuit court. Restaurants et consommateurs galerent a trouver des produits frais locaux.

## Solution
Marketplace phygitale connectant producteurs, restaurants, relais et consommateurs avec carte interactive, paiement integre et logistique.

## Architecture
- **Frontend**: Nuxt 4 avec SSR, Vue 3 Composition API
- **Backend**: Supabase (PostgreSQL + RLS + Edge Functions)
- **Cartographie**: MapLibre GL pour la geolocalisation
- **Paiement**: Stripe Checkout + Stripe Connect

## Decisions techniques
- RLS obligatoire sur toutes les tables (security-first)
- Tests E2E systematiques avec Stripe en mode test
- Approche MVP en 6 phases iteratives
- Composants Vue 3 dedies par domaine fonctionnel

## Resultats
- 34 tests passes (unitaires + integration)
- Flux de paiement valide de bout en bout
- MVP pret pour beta testeurs
