# Terre-0 — Case Study

## Problème résolu
Le marché français de l'aquaponie domestique est fragmenté : aucune expérience unifiée ne combine pédagogie, personnalisation, esthétique et achat guidé. Le grand public perçoit l'aquaponie comme complexe et réservée aux experts.

## Solution
Marketplace de kits aquaponiques domestiques accessibles, modulaires et pédagogiques : configurateur par espace/usage/budget, documentation orientée réussite et double logique DIY ouverte ou kit prêt à monter.

## Architecture
- **Frontend**: Nuxt 4, Vue 3, Pinia, Tailwind CSS
- **Backend & auth**: Supabase
- **Paiement**: Stripe
- **Animation**: OGL (WebGL)

## Décisions techniques
- Nuxt pour le SSR et le SEO sur un produit contenu + e-commerce
- Supabase pour l'auth, la DB et le stockage sans plomberie backend
- Open source comme moteur d'acquisition organique (apprendre gratuitement, acheter prêt à monter)

## Résultats
- PRD et architecture validés
- Configurateur et parcours d'achat en construction
- Positionnement marque : cuisine, balcon, terrasse et jardin
