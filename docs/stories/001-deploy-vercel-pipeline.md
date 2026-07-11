---
type: story
domain: devops
author: Teach
status: in_progress
priority: high
created: 2026-07-09
tags: [bmad, story, deploy, vercel, pipeline]
---

# 001 — Déploiement Vercel + Pipeline CI/CD

## Mission
Déployer le portfolio sur Vercel avec le domaine `scapeternam.dev` et un pipeline CI/CD intégrant les 4 gates (BMAD, RGPD, Sécurité, Qualité).

## Contexte Embarqué
- [[Brief — Portfolio v2]]
- [[PRD — Portfolio v2]]
- [[Architecture — Portfolio v2]]

## Critères d'Acceptation
- [ ] Le site est accessible sur `scapeternam.dev` (ou preview Vercel)
- [ ] Le pipeline CI/CD passe les 4 gates sur un push `main`
- [ ] La notification Discord est envoyée en cas de succès ou d'échec
- [ ] Les GitHub Secrets sont configurés (DISCORD_WEBHOOK_URL)
- [ ] Le domaine est vérifié dans Vercel

## Rendu Attendu
- Fichier `.github/workflows/ci-cd.yml` créé et fonctionnel
- Projet connecté à Vercel
- Domaine `scapeternam.dev` configuré (ou preview URL Vercel)

## Ne fais PAS
- Ne pas commiter de secrets en clair (utiliser GitHub Secrets + Vaultwarden)
- Ne pas déployer d'autres projets en même temps
- Ne pas modifier la configuration Next.js existante sauf si nécessaire

## Ressources
- [[🚀 Template - Pipeline CI-CD BMAD + RGPD.md]]
- [[2026-07-09-pipeline-ci-cd-standard.md]]
