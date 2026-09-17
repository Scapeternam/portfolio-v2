# LEONIDA — Case Study

## Problème résolu
Monter un jeu 3D dans le navigateur implique souvent des assets lourds, des chargements interminables et une architecture couplée au rendu impossible à tester sans GPU.

## Solution
Mini-GTA 3D à la troisième personne entièrement procédural : ville générée, conduite arcade à dérapage, trafic IA, piétons, police 5 étoiles, missions et cycle jour/nuit. Zéro asset externe, une seule dépendance (three.js).

## Architecture
- **Simulation**: TypeScript pur, aucun import three/DOM, testable dans Node
- **Rendu**: three.js + HUD canvas 2D, un InstancedMesh par type d'entité
- **Build**: Vite, pas fixe 120 Hz avec accumulateur + watchdog
- **Règle d'or**: la simulation vit sur un plan (x, y) et le rendu mappe (x, y) → (x, hauteur, y)

## Décisions techniques
- Simulation découplée du rendu pour tester le gameplay sans GPU
- Ville en Uint8Array et hash déterministe par position
- Feux tricolores calculés comme fonction pure du temps : zéro désync simulation/rendu
- Profils qualité low/medium/high avec adaptation runtime du pixel ratio

## Résultats
- Prototype jouable avec 54 tests
- 7 draw calls pour toute la ville (budget ≤ 140 en conduite)
- Attract mode autonome, sauvegarde, radio synthwave et minimap
