# PickUp — Case Study

## Probleme resolu
Les services urbains a la demande (livraison, conciergerie, missions terrain) manquent d'une plateforme unifiee pour connecter clients et prestataires.

## Solution
Marketplace P2P avec parcours multi-pages : recherche, reservation, paiement, suivi et evaluation.

## Architecture
- **Frontend**: React 18 avec Vite et TypeScript strict
- **Backend**: Supabase (auth, DB, realtime, storage)
- **Paiement**: Stripe Connect pour les paiements entre particuliers
- **Notifications**: Twilio SMS

## Decisions techniques
- React pour rester dans l'ecosysteme JavaScript avec Supabase
- Stripe Connect des le depart (pas de migration depuis Stripe Checkout)
- Composants atomiques reutilisables (design system maison)

## Resultats
- 19 pages React codees avec etat fonctionnel
- Flux complet : inscription, creation d'annonce, reservation, paiement
- Jamais lance en production (projet en reserve)
