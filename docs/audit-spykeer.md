# Audit des dépôts SpyKeeR — cartographie et plan d'intégration

Date : 2026-11-10. 7 dépôts analysés, 2 246 fichiers.

## Cartographie

| Dépôt | Fichiers | Valeur pédagogique | Intégration CoursIT |
|---|---|---|---|
| **Cheatsheets-main** | 74 MD | ⭐⭐⭐⭐⭐ Très élevée — Cisco IOS (4 fichiers : Essentials, Switching, Routing, Security avec ~300 commandes), Windows Server, Active Directory, Virtualisation, Sécurité, Linux, Backup | **Intégrer les commandes** dans CHEAT_SHEETS (priorité 1). Les notions vont enrichir les deepDive. |
| **Knowledge-base-main** | 1156 MD | ⭐⭐⭐⭐⭐ Très élevée — cours structurés ASR M01 (Windows/AD 4 chapitres), M02 (Linux 11 chapitres), KodeKloud (Linux), et bien plus | **Enrichir les CP** : les chapitres AD (M01) enrichissent TSSR CP2, les chapitres Linux (M02) enrichissent TSSR CP3, le reste alimente les deepDive AIS. |
| **Labs-playground-main** | 597 fichiers | ⭐⭐⭐⭐ Élevée — Jeremy IT CCNA labs (.md + .pkt), OpenClassRooms Cisco labs, Packet Tracer | **Intégrer les descriptions** (.md) dans les fiches CCNA et les labos. Les .pkt ne sont pas intégrables directement mais référencés. |
| **PrepaExamTSSR-main** | 74 MD | ⭐⭐⭐⭐⭐ Très élevée — fiches de révision CCP1-C7, QCM avec corrections (30-40Q), questions ouvertes, MSP | **Intégrer les fiches** dans les CP correspondants (CCP1→CP1, CCP2→CP2, etc.). Les QCM enrichissent la banque. |
| **PrepaCertifs-main** | 194 fichiers | ⭐⭐⭐ Moyenne — CCNP ENCOR (niveau avancé), CCNA Cybersecurity | **Extraction ciblée** : les chapitres ENCOR apportent du contenu avancé pour AIS. Le CCNA Cybersecurity enrichit la sécurité. |
| **Scripts-main** | 103 fichiers | ⭐⭐⭐ Moyenne — scripts PowerShell AD, batch GPO, procédures | **Intégrer les scripts** pertinents dans les guiSteps des CP (PowerShell AD, GPO shutdown, sauvegarde). |
| **Anki-Cards-main** | 138 fichiers | ⭐ Non exploitable — format .apkg (Anki) et .rar | **Exclu** — format propriétaire non lisible sans Anki. |

## Plan d'intégration prioritaire

| Priorité | Source | Cible CoursIT | Actions |
|---|---|---|---|
| **P1** | Cheatsheets IOS (4 fichiers) | CHEAT_SHEETS | Extraire ~50 nouvelles commandes Cisco IOS |
| **P2** | Cheatsheets Windows/AD | CP2 deepDive | Enrichir avec les concepts AD manquants |
| **P3** | Cheatsheets Sécurité | AIS CP8-10 | Enrichir avec les concepts de sécurité |
| **P4** | PrepaExamTSSR fiches | CP1-CP7 deepDive | Intégrer le contenu de révision |
| **P5** | Jeremy IT .md labs | CCNA fiches | Enrichir avec les procédures détaillées |
| **P6** | Knowledge-base ASR | CP2, CP3 | Enrichir avec les chapitres structurés |

## Ce qui MANQUE dans CoursIT (identifié par l'audit)

- **Cisco IOS** : ~50 commandes absentes (switching avancé, routing avancé, security hardening)
- **Windows AD** : délégations, fine-grained password policy, AGDLP détaillé, transfert FSMO
- **Sécurité** : zero trust détaillé, MITRE ATT&CK, SOC/SIEM/SOAR, posture management
- **Virtualisation** : vSwitch types, stockage partagé, PRA détaillé, Veeam procédures
- **Supervision** : Zabbix agent/proxy/trigger détaillé, dashboards, escalade
- **Backup** : Veeam procédures complètes, test de restauration, 3-2-1-1-0

## Ce qui EXISTE DÉJÀ dans CoursIT (ne pas dupliquer)

- Architecture AD, GPO LSDOU, Kerberos, DHCP DORA, DNS zones, VLAN/trunk, STP, NAT/PAT, OSPF, SSH, hardening, sauvegarde 3-2-1
- Commandes de base Cisco IOS, Windows PowerShell, Linux bash
- Labos Hyper-V, WDS, AD, Linux, Zabbix, Snort
