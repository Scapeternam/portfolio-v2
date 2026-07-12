# FrontalierPro — Case Study

## Problème résolu
Les travailleurs frontaliers France-Suisse naviguent dans un mille-feuille administratif sans outil centralisé dédié à leurs besoins.

## Solution
SaaS dédié avec abonnements, centralisant les informations, démarches et services utiles entre France et Suisse.

## Architecture
- **Backend**: NestJS avec architecture modulaire (modules/séparation par domaine)
- **Frontend**: Vue 3 SPA avec état global géré
- **Base de données**: PostgreSQL avec Prisma ORM, puis migration Supabase
- **Infra**: Docker Compose, Railway pour le déploiement
- **Paiement**: Stripe Billing pour les abonnements

## Décisions techniques
- Séparation stricte backend/frontend pour scalabilité future
- Docker dès le départ pour environnement reproductible
- Abonnements plutôt que one-shot pour revenu récurrent

## Résultats
- En production avec utilisateurs réels
- Modèle d'abonnement validé
- Base de données migrée vers Supabase
