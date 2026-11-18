export const PRIVATE_RANGES = [
            { cidr: '10.0.0.0/8', plages: "10.0.0.0 → 10.255.255.255", adr: 16777216, usage: "Grands réseaux d'entreprise : chaque site ou VLAN dans un 10.x.y.0/24, tout tient dans un seul plan." },
            { cidr: '172.16.0.0/12', plages: "172.16.0.0 → 172.31.255.255", adr: 1048576, usage: "Attention au piège : ce n'est PAS 172.x.x.x en général — seuls 172.16 à 172.31 sont privés. Souvent utilisé pour les liens inter-sites et les infrastructures (Docker : 172.17.x.x)." },
            { cidr: '192.168.0.0/16', plages: "192.168.0.0 → 192.168.255.255", adr: 65536, usage: "PME et réseaux domestiques : un 192.168.y.0/24 par VLAN ou segment. Le plus fréquent en entreprise petite et moyenne." }
        ];
