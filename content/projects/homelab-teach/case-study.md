# Homelab Teach — Case Study

## Probleme resolu
Dependance aux SaaS tiers pour l'automatisation, l'IA et le stockage. Besoin d'une infrastructure souveraine, economique et evolutive.

## Solution
Serveur personnel 24/7 (Acer Aspire A515-55) transforme en plateforme d'automatisation, IA et base de connaissance.

## Architecture
- **OS**: Ubuntu Server 24.04 LTS
- **Conteneurisation**: Docker Compose avec 6+ services
- **Automatisation**: n8n (workflows, webhooks, scraping)
- **IA locale**: Ollama avec Gemma 4 E2B
- **Vector DB**: Qdrant pour le RAG sur le vault Obsidian
- **Base de donnees**: PostgreSQL 16
- **Acces distant**: Cloudflare Tunnel + Access

## Decisions techniques
- 100% self-hosted pour la souverainete des donnees
- Ollama > APIs cloud pour le cout zero et la confidentialite
- Qdrant pour indexer le vault Obsidian et repondre en contexte
- Cloudflare Tunnel plutot que port forwarding pour la securite

## Resultats
- Infrastructure 24/7 operationnelle
- RAG fonctionnel sur le vault
- Pipeline Jarvis : automatisation candidatures, scraping prospects, scoring
- Cout mensuel : 0 EUR (hors electricite)
