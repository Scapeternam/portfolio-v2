---
type: prd
domain: frontend
author: Teach
created: 2026-07-09
updated: 2026-07-09
tags: [bmad, prd, portfolio, nextjs]
---

# PRD — Portfolio v2 (Tidjan Tokpa)

## Contexte
Portfolio personnel de Tidjan Tokpa, développeur fullstack Epitech WAC Promo 2027. Le site sert de vitrine pour sa recherche d'alternance, présente ses projets et son agence IT.

## Objectifs
- [ ] Présenter les projets SaaS, IA, Web3 et Epitech
- [ ] Permettre le téléchargement du CV
- [ ] Offrir un formulaire de contact fonctionnel
- [ ] Démontrer les compétences techniques (Next.js 16, WebGL, TypeScript)
- [ ] Être conforme RGPD (pages légales, pas de tracking abusif)

## Spécifications Fonctionnelles

### FR-001 : Page d'Accueil
- **Description** : Hero section avec nom, rôle, disponibilité alternance. Liste des projets, section contact.
- **Critères d'Acceptation** :
  - [ ] Affiche le nom "Tidjan Tokpa" et le rôle "Développeur fullstack — Epitech WAC Promo 2027"
  - [ ] Affiche la disponibilité "Recherche une alternance de 14 mois"
  - [ ] Liste les projets avec lien vers la page détail
  - [ ] Affiche la section contact (email, téléphone, localisation)

### FR-002 : Page Projets
- **Description** : Liste des projets avec filtres. Page détail par projet avec stack, impact, points clés.
- **Critères d'Acceptation** :
  - [ ] Affiche tous les projets (agence, CourseCircuit, FrontalierPro, PickUp, Homelab)
  - [ ] Chaque projet a une page détail avec stack technique, impact, highlights
  - [ ] Navigation retour vers la liste des projets

### FR-003 : Page CV
- **Description** : CV interactif avec sélection des projets affichés, style personnalisable.
- **Critères d'Acceptation** :
  - [ ] Affiche les projets sélectionnés (configurable via admin)
  - [ ] Affiche l'expérience, la formation, les compétences
  - [ ] Export PDF possible

### FR-004 : Page Admin
- **Description** : Interface protégée par mot de passe pour configurer l'affichage du CV.
- **Critères d'Acceptation** :
  - [ ] Authentification par mot de passe (`bento`)
  - [ ] Sélection des projets à afficher sur le CV
  - [ ] Choix du style (monochrome/couleurs), densité, nombre de points clés

### FR-005 : Contact
- **Description** : Section contact avec email, téléphone, localisation, et formulaire (optionnel).
- **Critères d'Acceptation** :
  - [ ] Affiche l'email `tidjan.tokpa@epitech.eu`
  - [ ] Affiche le téléphone et la localisation
  - [ ] Formulaire fonctionnel (si activé)

## Spécifications Non Fonctionnelles
- **Performance** : Score Lighthouse > 90 (performance, accessibilité, SEO)
- **Sécurité** : CSP activé, rate limiting sur les endpoints sensibles
- **RGPD** : Pages légales présentes, pas de cookies tiers, formulaire conforme
- **Disponibilité** : Déployé sur Vercel (99.9% SLA)

## Personas
| Persona | Description | Besoins |
|---------|-------------|---------|
| Recruteur tech | CTO/lead dev cherchant un alternant | Voir les projets, compétences, télécharger le CV |
| Client PME | Prospect pour l'agence IT | Comprendre l'offre, contacter facilement |
| Pair Epitech | Autre étudiant | Voir les réalisations, s'inspirer |

## User Stories
- [ ] En tant que recruteur, je veux voir les projets réalisés pour évaluer les compétences.
- [ ] En tant que recruteur, je veux télécharger le CV pour le partager en interne.
- [ ] En tant que client, je veux contacter Tidjan pour un devis.
- [ ] En tant que visiteur, je veux que le site soit rapide et accessible sur mobile.

## Priorisation
| ID | User Story | Priorité | Complexité |
|----|------------|----------|------------|
| US-001 | Page d'accueil avec projets | High | Low |
| US-002 | Page détail projet | High | Low |
| US-003 | Téléchargement CV | High | Low |
| US-004 | Formulaire contact | Medium | Medium |
| US-005 | Page admin protégée | Medium | Medium |
