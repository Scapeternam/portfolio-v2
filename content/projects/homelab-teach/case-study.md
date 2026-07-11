# Homelab Teach — Case Study

## Problème résolu
Dépendance aux SaaS tiers pour l'automatisation, l'IA et le stockage. Besoin d'une infrastructure souveraine, économique et évolutive.

## Solution
Serveur personnel 24/7 (Acer Aspire A515-55) transformé en plateforme d'automatisation, IA et base de connaissance.

## Architecture
- **OS**: Ubuntu Server 24.04 LTS
- **Conteneurisation**: Docker Compose avec 6+ services
- **Automatisation**: n8n (workflows, webhooks, scraping)
- **IA locale**: Ollama avec Gemma 4 E2B
- **Vector DB**: Qdrant pour le RAG sur le vault Obsidian
- **Base de données**: PostgreSQL 16
- **Accès distant**: Cloudflare Tunnel + Access

## Décisions techniques
- 100% self-hosted pour la souveraineté des données
- Ollama > APIs cloud pour le coût zéro et la confidentialité
- Qdrant pour indexer le vault Obsidian et répondre en contexte
- Cloudflare Tunnel plutôt que port forwarding pour la sécurité

## Résultats
- Infrastructure 24/7 opérationnelle
- RAG fonctionnel sur le vault
- Pipeline Jarvis : automatisation candidatures, scraping prospects, scoring
- Coût mensuel : 0 EUR (hors électricité)
