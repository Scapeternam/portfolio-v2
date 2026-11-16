# 100 — Case Study

## Problème résolu
Un MMORPG en tour verticale demande un système de progression cohérent avant toute ligne de code moteur. Le premier design généré contenait des incohérences chiffrées (niveau contre étage, budget de compétences sans vrai choix) qui auraient bloqué l'équilibrage.

## Solution
MMORPG d'action dans une tour de 100 étages, chacun un biome avec sa faune, ses ressources et son boss. PvP et PvE simultanés sur la même carte, 5 rôles, 13 familles d'armes et 750 points de compétence à vie.

## Architecture
- **Moteur**: Unreal Engine 5, C++
- **Données joueurs**: Supabase
- **Outillage**: validateur Python des données de paliers et de progression

## Décisions techniques
- Unreal Engine 5 plutôt que Roblox pour la portée du projet
- Trois couches séparées : Combat Rating (équipement), statistiques, rang d'arbre (entraînement)
- Une seule résistance, formule de mitigation sans plafond

## Résultats
- 21 décisions de design datées, chacune avec son motif
- Spec technique et architecture Unreal Engine 5 proposées
- Prochaine étape : spec de la tranche verticale (butin, XP, pouvoirs, boss, mort)
