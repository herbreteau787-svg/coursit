# CURRENT_TASK.md

## Tâche terminée (2026-11-18)
1. **Mojibake définitif corrigé** : 603 séquences corrompues corrigées dans DynamicSVGDiagram.jsx (├®→é, ├¿→è, ÔÇö→—, ÔåÆ→→, ┬À→·, ■, etc.). 0 caractère suspect dans les sources ET le bundle déployé (vérifié en ligne : 1113 Ko, 0 mojibake, accents français parfaits).
2. **Remplacement SVG→images (mission en cours)** : 9 schémas SVG remplacés par de vraies illustrations img:.
3. `.gitignore` : `Scripts-main/` ajouté (bruit git, ne plus commit).

## Prochaine tâche
Continuer le remplacement SVG→images pour les 9 schémas restants :
- CCNA : `arp-resolution`, `ipv6-slaac`, `etherchannel-lacp`, `ospf-zones`, `acl-evaluation`
- TSSR : `support-cycle-v2`, `gpo-lsdou`, `pra-pca-321`
- AIS : `supervision-architecture`
⚠️ Wikimedia rate-limit 429 intermittent (cycles) : PowerShell Invoke-WebRequest fonctionne par vagues, espacer les requêtes ~1s, chercher les bons noms de fichiers via l'API `list=search` (srnamespace=6). webfetch (page HTML) marche aussi pour vérifier licence/auteur.
Candidats confirmés : `Defense In Depth - Onion Model.svg` (fait), `VLAN Concept.svg` (fait), `Spanning tree topology.png` (fait). Chercher : OSPF (`OSPF backbone area extension.svg` 404, chercher variantes), EtherChannel, ACL, GPO LSDOU, backup 3-2-1 (rien trouvé via search — essayer `File:3-2-1 rule.svg` / catégorie "Backup").

## État des remplacements
| Schema | Image | Licence |
|---|---|---|
| osi-fr-v2 | osi-model.jpg | domaine public |
| nat-fr-v2 | nat.png | CC BY-SA 4.0 (Francisco Miamoto) |
| dns-fr-v2 | dns-real-world.svg | domaine public (Lion Kimbro) |
| kerberos-fr-v2 | kerberos.svg | CC BY-SA 3.0 (Daniel Sonck) |
| topologies-fr-v2 | network-topologies.svg | domaine public |
| vlan-segmentation | vlan-concept.svg | CC BY-SA 4.0 |
| stp-election | stp-topology.png | Wikimedia (lic. à noter) |
| cyber-defense-v2 | defense-depth.svg | CC BY-SA 3.0 (Kbolino) |
| cloud-modeles | cloud-computing-types.svg | CC BY-SA 3.0 (Sam Johnston) |
| arp-resolution | arp-resolution.svg | CC BY-SA 3.0 (0x55534C) |
| etherchannel-lacp | etherchannel-lacp.jpg | CC BY-SA 3.0 (Iria.novoa) |
| ospf-zones | ospf-zones.svg | CC BY-SA 4.0 (Luca Ghio) |
| acl-evaluation | acl-evaluation.png | CC BY-SA 4.0 (Cbarille) |
| support-cycle-v2 | support-cycle-v2.jpg | CC BY-SA 3.0 (HBEL) |
| pra-pca-321 | pra-pca-321.png | CC BY-SA 4.0 (Olaf Pichler) |
Restants (3) : `ipv6-slaac` (aucun candidat Commons acceptable — reste en SVG), `gpo-lsdou`, `supervision-architecture`. Wireshark-3.6.png copié dans public/images (AIS CP7, à câbler si pas déjà fait).

## Règles
- Vérifier build + site déployé + rendu après chaque modif. UTF-8 sans BOM, jamais PowerShell pour lire/éditer du texte.
- Captions : mention auteur + licence Wikimedia dans imgCaption.
