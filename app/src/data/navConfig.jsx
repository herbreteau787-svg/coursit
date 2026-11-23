
export const NAV_ITEMS = [
    { id: 'dashboard', icon: 'house', label: 'Dashboard', path: '/' },
    { id: 'courses', icon: 'book-open', label: 'Cours & Fiches', path: '/courses' },
    { id: 'essentiels', icon: 'star', label: 'Les Indispensables', path: '/essentiels' },
    { id: 'qcm', icon: 'help-circle', label: 'Banque QCM', path: '/qcm' },
    { id: 'labs', icon: 'flask', label: 'Labos Guidés', path: '/labs' },
    { id: 'commands', icon: 'settings', label: 'Commandes', path: '/commands' },
    { id: 'scripts', icon: 'file-text', label: 'Scripts', path: '/scripts' },
    { id: 'depannage', icon: 'wrench', label: 'Dépannage', path: '/depannage' },
    { id: 'glossary', icon: 'book', label: 'Glossaire', path: '/glossary' },
    { id: 'vocab', icon: 'globe', label: 'Vocabulaire Anglais', path: '/vocab' },
];

export const DASHBOARD_CARDS = [
    { n: 1, icon: 'house', titre: 'Cours & Fiches', desc: 'Lire les leçons pas à pas', go: 'courses' },
    { n: 2, icon: 'star', titre: 'Les Indispensables', desc: 'Cheat sheets et fiches', go: 'essentiels' },
    { n: 3, icon: 'help-circle', titre: 'Banque QCM', desc: 'S\'entraîner', go: 'qcm' },
    { n: 4, icon: 'flask', titre: 'Labos Guidés', desc: 'Pratiquer sur Packet Tracer / VM', go: 'labs' },
    { n: 5, icon: 'settings', titre: 'Commandes', desc: 'Référence rapide', go: 'commands' },
];

export const REPORT_ISSUE_ICON = 'alert-triangle';
