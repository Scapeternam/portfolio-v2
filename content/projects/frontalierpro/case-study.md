# FrontalierPro — Case Study

## Probleme resolu
Les travailleurs frontaliers France-Suisse naviguent dans un mille-feuille administratif sans outil centralise dedie a leurs besoins.

## Solution
SaaS dedie avec abonnements, centralisant les informations, demarches et services utiles entre France et Suisse.

## Architecture
- **Backend**: NestJS avec architecture modulaire (modules/separation par domaine)
- **Frontend**: Vue 3 SPA avec etat global gere
- **Base de donnees**: PostgreSQL avec Prisma ORM, puis migration Supabase
- **Infra**: Docker Compose, Railway pour le deploiement
- **Paiement**: Stripe Billing pour les abonnements

## Decisions techniques
- Separation stricte backend/frontend pour scalabilite future
- Docker des le depart pour environnement reproductible
- Abonnements plutot que one-shot pour revenu recurrent

## Resultats
- En production avec utilisateurs reels
- Modele d'abonnement valide
- Base de donnees migree vers Supabase
