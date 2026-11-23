import { Icon } from '../components/Icon';

export const NAV_ITEMS = [
    { id: 'dashboard', label: <><Icon name="house" /> Dashboard</>, path: '/' },
    { id: 'courses', label: <><Icon name="book-open" /> Cours & Fiches</>, path: '/courses' },
    { id: 'essentiels', label: <><Icon name="star" /> Les Indispensables</>, path: '/essentiels' },
    { id: 'qcm', label: <><Icon name="help-circle" /> Banque QCM</>, path: '/qcm' },
    { id: 'labs', label: <><Icon name="flask" /> Labos Guidés</>, path: '/labs' },
    { id: 'commands', label: <><Icon name="settings" /> Commandes</>, path: '/commands' },
    { id: 'scripts', label: <><Icon name="file-text" /> Scripts</>, path: '/scripts' },
    { id: 'depannage', label: <><Icon name="wrench" /> Dépannage</>, path: '/depannage' },
    { id: 'glossary', label: <><Icon name="book" /> Glossaire</>, path: '/glossary' },
    { id: 'vocab', label: <><Icon name="globe" /> Vocabulaire Anglais</>, path: '/vocab' },
];

export const DASHBOARD_CARDS = [
    { n: 1, icon: 'house', titre: 'Cours & Fiches', desc: 'Lire les leçons pas à pas', go: 'courses' },
    { n: 2, icon: 'star', titre: 'Les Indispensables', desc: 'Cheat sheets et fiches', go: 'essentiels' },
    { n: 3, icon: 'help-circle', titre: 'Banque QCM', desc: 'S\'entraîner', go: 'qcm' },
    { n: 4, icon: 'flask', titre: 'Labos Guidés', desc: 'Pratiquer sur Packet Tracer / VM', go: 'labs' },
    { n: 5, icon: 'settings', titre: 'Commandes', desc: 'Référence rapide', go: 'commands' },
];

export const REPORT_ISSUE_ICON = 'alert-triangle';
