# CourseCircuit — Case Study

## Problème résolu
Les producteurs locaux n'ont pas d'infrastructure pour vendre en circuit court. Restaurants et consommateurs galèrent à trouver des produits frais locaux.

## Solution
Marketplace phygitale connectant producteurs, restaurants, relais et consommateurs avec carte interactive, paiement intégré et logistique.

## Architecture
- **Frontend**: Nuxt 4 avec SSR, Vue 3 Composition API
- **Backend**: Supabase (PostgreSQL + RLS + Edge Functions)
- **Cartographie**: MapLibre GL pour la géolocalisation
- **Paiement**: Stripe Checkout + Stripe Connect

## Décisions techniques
- RLS obligatoire sur toutes les tables (security-first)
- Tests E2E systématiques avec Stripe en mode test
- Approche MVP en 6 phases itératives
- Composants Vue 3 dédiés par domaine fonctionnel

## Résultats
- 34 tests passés (unitaires + intégration)
- Flux de paiement validé de bout en bout
- MVP prêt pour beta testeurs
