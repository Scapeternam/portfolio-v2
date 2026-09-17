# Job Aggregator — Case Study

## Problème résolu
Les offres d'emploi dev sont dispersées entre multiples sources. Les projets Epitech imposent aussi une contrainte forte : pas d'API vers un modèle non contrôlé, donc l'IA doit tourner en local.

## Solution
Plateforme type LinkedIn spécialisée offres emploi/stage dev : collecte multi-sources, normalisation, scoring 0-100 en règles pondérées locales, recherche géolocalisée et suivi de candidatures.

## Architecture
- **Frontend**: React responsive (auth, espace user, recherche, détail d'offre)
- **Backend**: PocketBase (API + auth + SQLite), collections `offers` et `user_offers`
- **Collecte**: n8n (fetch + normalize + score en Code nodes)
- **IA**: scoring règles pondérées locales, zéro appel externe
- **Infra**: Docker Compose (3 conteneurs : web / pocketbase / n8n)

## Décisions techniques
- Option A : tout dans n8n, le workflow JSON exporté = le code reviewable
- Dedup hash sha256(source|source_id|title|company) pour éviter les doublons
- Feature Data : géo-mapping (lat/lng propres dans les 2 sources)
- Score = somme pondérée (keywords 35%, contrat 25%, localisation 20%, prestige 10%, récence 10%) avec reasons traçables

## Résultats
- Collecte opérationnelle France Travail + Adzuna
- Scoring local conforme à l'interdit modèle non contrôlé
- Rendu Epitech honoré le 2026-08-03
- Base réutilisée comme couche visualisation du pipeline alternance Jarvis
