# Memecoin Intelligence — Case Study

## Problème résolu
L'analyse de memecoins Solana repose sur des outils opaques qui mélangent signaux, rumeurs et promesses de performance. Rien ne distingue une preuve datée d'une affirmation.

## Solution
Console de recherche locale qui relie coins, wallets publics, développeurs et événements par preuves datées, avec provenance visible. Outil d'analyse uniquement : aucun ordre signé ni exécuté, aucune dépense.

## Architecture
- **Runtime**: Node 26 + TypeScript, API HTTP loopback
- **UI**: Vue 3 + Vite, interface française
- **Stockage**: SQLite local, watchlist et preuves persistantes
- **Collecteurs**: DEX Screener, RPC public Solana, BBC World RSS, preuve manuelle
- **Évolution**: migration planifiée vers un moteur Rust (collecte/analyse)

## Décisions techniques
- SQLite local plutôt que PostgreSQL provisionné : pas d'abonnement, boundary stable
- Mode démo explicitement isolé du mode public, jamais de substitution silencieuse
- Replay déterministe (règles transparentes) au lieu d'un moteur de trading opaque
- Preuves et provenance conservées ; une source en échec reste visible

## Résultats
- MVP local livré et testé : 62 tests + 4 E2E, typecheck et build verts
- Collecte réelle vérifiée (79 entités, 181 observations) avec audit de provenance
- Skill GMGN et plan de migration Rust cadrés, sans dépense ni déploiement public
