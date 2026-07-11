# PickUp — Case Study

## Problème résolu
Les services urbains à la demande (livraison, conciergerie, missions terrain) manquent d'une plateforme unifiée pour connecter clients et prestataires.

## Solution
Marketplace P2P avec parcours multi-pages : recherche, réservation, paiement, suivi et évaluation.

## Architecture
- **Frontend**: React 18 avec Vite et TypeScript strict
- **Backend**: Supabase (auth, DB, realtime, storage)
- **Paiement**: Stripe Connect pour les paiements entre particuliers
- **Notifications**: Twilio SMS

## Décisions techniques
- React pour rester dans l'écosystème JavaScript avec Supabase
- Stripe Connect dès le départ (pas de migration depuis Stripe Checkout)
- Composants atomiques réutilisables (design system maison)

## Résultats
- 19 pages React codées avec état fonctionnel
- Flux complet : inscription, création d'annonce, réservation, paiement
- Jamais lancé en production (projet en réserve)
