import { useId } from 'react';

/* Icônes 3D style emoji : dégradés saturés, ombres portées et reflets. */
const PALETTE = {
    house: ['#06b6d4', '#3b82f6', '#67e8f9', '#60a5fa'],
    'book-open': ['#f59e0b', '#f97316', '#fbbf24', '#fb923c'],
    star: ['#eab308', '#f59e0b', '#fde047', '#fbbf24'],
    'help-circle': ['#06b6d4', '#3b82f6', '#22d3ee', '#60a5fa'],
    flask: ['#10b981', '#059669', '#34d399', '#6ee7b7'],
    settings: ['#8b5cf6', '#6d28d9', '#a78bfa', '#7c3aed'],
    'file-text': ['#0ea5e9', '#2563eb', '#38bdf8', '#60a5fa'],
    wrench: ['#ec4899', '#be185d', '#f472b6', '#db2777'],
    book: ['#f97316', '#ea580c', '#fb923c', '#fdba74'],
    globe: ['#06b6d4', '#4f46e5', '#22d3ee', '#6366f1'],
    'alert-triangle': ['#f59e0b', '#ea580c', '#fbbf24', '#f97316'],
    pencil: ['#a855f7', '#7e22ce', '#c084fc', '#9333ea'],
    search: ['#0ea5e9', '#0369a1', '#38bdf8', '#0284c7'],
    servers: ['#6366f1', '#4338ca', '#818cf8', '#4f46e5'],
    shield: ['#10b981', '#047857', '#34d399', '#059669'],
    network: ['#a855f7', '#6b21a8', '#c084fc', '#9333ea'],
};

const ALIASES = { '✍️': 'pencil', '📚': 'book-open', '🛠️': 'wrench', '🧪': 'flask', '🎓': 'book', '🔎': 'search' };

const GLYPHS = {
    house: (g, a, s) => (
        <>
            <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="3.4" fill={`url(#${g})`} filter={`url(#${s})`} />
            <rect x="5" y="5" width="6.2" height="6.2" rx="1.3" fill="#fff" fillOpacity=".92" />
            <rect x="12.8" y="5" width="6.2" height="6.2" rx="1.3" fill="#fff" fillOpacity=".7" />
            <rect x="5" y="12.8" width="6.2" height="6.2" rx="1.3" fill="#fff" fillOpacity=".7" />
            <rect x="12.8" y="12.8" width="6.2" height="6.2" rx="1.3" fill="#fff" fillOpacity=".92" />
            <path d="M6.6 9.2h3M6.6 17h3" stroke={`url(#${g})`} strokeOpacity=".5" strokeWidth=".9" strokeLinecap="round" />
            <path d="m14.2 16.8 1.5-1.8 1.4 1 .9-1.4" fill="none" stroke={`url(#${g})`} strokeOpacity=".65" strokeWidth=".9" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.6 6.2a3 3 0 0 1 3-3" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth=".9" strokeLinecap="round" />
        </>
    ),
    'book-open': (g, a, s) => (
        <>
            <path d="M12 6.4C9.8 4.7 6.9 4.1 3.5 4.5v12.8c3.4-.4 6.3.2 8.5 1.9 2.2-1.7 5.1-2.3 8.5-1.9V4.5c-3.4-.4-6.3.2-8.5 1.9Z" fill={`url(#${g})`} filter={`url(#${s})`} />
            <path d="M12 6.4v12.8" stroke="#fff" strokeOpacity=".65" strokeWidth="1" />
            <path d="M6 8.8h4.4M6 11.6h4.4M13.6 8.8H18M13.6 11.6H18" stroke="#fff" strokeOpacity=".55" strokeWidth="1" strokeLinecap="round" />
            <path d="M4.2 5.4c2.9-.2 5.2.4 7 1.7" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth=".8" strokeLinecap="round" />
            <path d="M3.5 17.3c3.4-.4 6.3.2 8.5 1.9Z" fill={`url(#${a})`} />
        </>
    ),
    star: (g, a, s) => (
        <>
            <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.4 1.1 6.2L12 17.2l-5.6 2.8 1.1-6.2-4.6-4.4 6.3-.9L12 2.8Z" fill={`url(#${g})`} filter={`url(#${s})`} />
            <path d="m12 2.8 2.8 5.7-2.8 2.4-2.8-2.4L12 2.8Z" fill="#fff" fillOpacity=".45" />
            <path d="m6.4 9.4 5.6 4.8 5.6-4.8" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth=".9" />
            <circle cx="12" cy="11.6" r="1.4" fill={`url(#${a})`} />
        </>
    ),
    'help-circle': (g, a, s) => (
        <>
            <circle cx="12" cy="12" r="9" fill={`url(#${g})`} filter={`url(#${s})`} />
            <circle cx="12" cy="12" r="7" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="1" />
            <path d="M9.5 9.3a2.6 2.6 0 0 1 5.1.8c0 1.8-2.6 2.2-2.6 4.1" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="17.4" r="1.1" fill="#fff" />
            <path d="M6.6 7.2a7.6 7.6 0 0 1 3.2-2" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.2" strokeLinecap="round" />
        </>
    ),
    flask: (g, a, s) => (
        <>
            <path d="M9.2 3h5.6M10 3v6.2L4.8 18a2 2 0 0 0 1.8 3h10.8a2 2 0 0 0 1.8-3L14 9.2V3Z" fill={`url(#${g})`} filter={`url(#${s})`} />
            <path d="M7.1 15.5h9.8l1 2.2a1.7 1.7 0 0 1-1.5 2.5H7.6a1.7 1.7 0 0 1-1.5-2.5l1-2.2Z" fill={`url(#${a})`} />
            <circle cx="10" cy="18.2" r=".8" fill="#fff" fillOpacity=".8" />
            <circle cx="13.4" cy="17.4" r=".6" fill="#fff" fillOpacity=".6" />
            <path d="M9.2 3h5.6" stroke="#fff" strokeOpacity=".6" strokeWidth="1.2" strokeLinecap="round" />
        </>
    ),
    settings: (g, a, s) => (
        <>
            <path d="m12 2.4 1.4 2.4 2.7-.6.6 2.7 2.4 1.4-1.2 2.5 1.8 2-1.8 2 1.2 2.5-2.4 1.4-.6 2.7-2.7-.6L12 21.6l-1.4-2.4-2.7.6-.6-2.7-2.4-1.4 1.2-2.5-1.8-2 1.8-2L5.9 8.3 8.3 6.9l.6-2.7 2.7.6L12 2.4Z" fill={`url(#${g})`} filter={`url(#${s})`} />
            <circle cx="12" cy="12" r="4" fill={`url(#${a})`} />
            <circle cx="12" cy="12" r="1.7" fill="#fff" fillOpacity=".85" />
            <path d="M12 4.4v2.2M19.6 12h-2.2M12 19.6v-2.2M4.4 12h2.2" stroke="#fff" strokeOpacity=".45" strokeWidth=".9" strokeLinecap="round" />
        </>
    ),
    'file-text': (g, a, s) => (
        <>
            <path d="M13.5 3H6.8a1.8 1.8 0 0 0-1.8 1.8v14.4A1.8 1.8 0 0 0 6.8 21h10.4a1.8 1.8 0 0 0 1.8-1.8V8.5L13.5 3Z" fill={`url(#${g})`} filter={`url(#${s})`} />
            <path d="M13.5 3v5.5H19" fill={`url(#${a})`} />
            <path d="M8.4 12h7.2M8.4 15h7.2M8.4 18h4.8" stroke="#fff" strokeOpacity=".75" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M6.8 5.2h5" stroke="#fff" strokeOpacity=".5" strokeWidth=".9" strokeLinecap="round" />
        </>
    ),
    wrench: (g, a, s) => (
        <>
            <path d="M20.4 4.8a5.4 5.4 0 0 1-7 6.9l-6.4 6.4a2.1 2.1 0 0 1-3-3l6.4-6.4a5.4 5.4 0 0 1 6.9-7l-3 3 .7 2.3 2.3.7 3-2.9Z" fill={`url(#${g})`} filter={`url(#${s})`} />
            <circle cx="7.1" cy="16.9" r="1.6" fill={`url(#${a})`} />
            <path d="M15.7 5.6a3 3 0 0 0-1.2 1.6" fill="none" stroke="#fff" strokeOpacity=".65" strokeWidth="1" strokeLinecap="round" />
            <path d="m16.8 7.5 2.2.7" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth=".9" strokeLinecap="round" />
        </>
    ),
    book: (g, a, s) => (
        <>
            <path d="M5.2 4.4A2 2 0 0 1 7.2 2.4h11.4v18.2H7.2a2 2 0 0 1-2-2V4.4Z" fill={`url(#${g})`} filter={`url(#${s})`} />
            <path d="M14.2 2.4v6.4l2.1-1.7 2.1 1.7V2.4Z" fill={`url(#${a})`} />
            <path d="M9.8 7.4h5.8M9.8 10.6h5.8" stroke="#fff" strokeOpacity=".7" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M7.2 3.4h9.8" stroke="#fff" strokeOpacity=".45" strokeWidth=".9" strokeLinecap="round" />
        </>
    ),
    globe: (g, a, s) => (
        <>
            <circle cx="12" cy="12" r="9" fill={`url(#${g})`} filter={`url(#${s})`} />
            <path d="M3.2 12h17.6" stroke="#fff" strokeOpacity=".6" strokeWidth="1.1" />
            <ellipse cx="12" cy="12" rx="4.2" ry="9" fill="none" stroke="#fff" strokeOpacity=".65" strokeWidth="1.1" />
            <path d="M5.2 7.4c1.9 1 4.2 1.5 6.8 1.5s4.9-.5 6.8-1.5M5.2 16.6c1.9-1 4.2-1.5 6.8-1.5s4.9.5 6.8 1.5" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1" />
            <circle cx="12" cy="12" r="7.5" fill={`url(#${a})`} fillOpacity=".25" />
        </>
    ),
    'alert-triangle': (g, a, s) => (
        <>
            <path d="M12 3.2 2.7 19.2a1.7 1.7 0 0 0 1.5 2.5h15.6a1.7 1.7 0 0 0 1.5-2.5L12 3.2Z" fill={`url(#${g})`} filter={`url(#${s})`} />
            <path d="M12 3.2 5.2 15h13.6L12 3.2Z" fill="#fff" fillOpacity=".3" />
            <rect x="11" y="9" width="2" height="5.4" rx="1" fill="#fff" />
            <circle cx="12" cy="17.6" r="1.1" fill="#fff" />
        </>
    ),
    pencil: (g, a, s) => (
        <>
            <path d="m4.4 19.6 1-4.4L16 4.6a1.7 1.7 0 0 1 2.4 0l1 1a1.7 1.7 0 0 1 0 2.4L8.8 18.6l-4.4 1Z" fill={`url(#${g})`} filter={`url(#${s})`} />
            <path d="m16 4.6 3.4 3.4-2.3 2.3-3.4-3.4L16 4.6Z" fill={`url(#${a})`} />
            <path d="m5.4 15.2 3.4 3.4" stroke="#fff" strokeOpacity=".6" strokeWidth="1" strokeLinecap="round" />
        </>
    ),
    search: (g, a, s) => (
        <>
            <circle cx="10.7" cy="10.7" r="6.6" fill={`url(#${g})`} filter={`url(#${s})`} />
            <path d="m15.7 15.7 4.7 4.7" stroke={`url(#${a})`} strokeWidth="3.4" strokeLinecap="round" />
            <path d="M7.2 7.2a5 5 0 0 1 3-1.4" fill="none" stroke="#fff" strokeOpacity=".75" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="10.7" cy="10.7" r="3.4" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="1" />
        </>
    ),
    servers: (g, a, s) => (
        <>
            <rect x="3" y="3" width="18" height="7.4" rx="1.8" fill={`url(#${g})`} filter={`url(#${s})`} />
            <rect x="3" y="13.6" width="18" height="7.4" rx="1.8" fill={`url(#${g})`} filter={`url(#${s})`} />
            <circle cx="6.8" cy="6.7" r="1" fill="#fff" fillOpacity=".85" />
            <circle cx="6.8" cy="17.3" r="1" fill="#fff" fillOpacity=".85" />
            <path d="M10.4 6.7h6M10.4 17.3h6" stroke="#fff" strokeOpacity=".7" strokeWidth="1.2" strokeLinecap="round" />
        </>
    ),
    shield: (g, a, s) => (
        <>
            <path d="M12 2.8 19 6v5.5c0 4.6-3 8-7 9.4-4-1.4-7-4.8-7-9.4V6l7-3.2Z" fill={`url(#${g})`} filter={`url(#${s})`} />
            <path d="M12 2.8 5.4 5.8h13.2L12 2.8Z" fill="#fff" fillOpacity=".3" />
            <path d="m8.8 12 2.4 2.4 4.2-4.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </>
    ),
    network: (g, a, s) => (
        <>
            <path d="M7.7 7.3 10.6 16M16.3 7.3 13.4 16M8 6.1h8" stroke={`url(#${a})`} strokeWidth="2.6" strokeLinecap="round" />
            <circle cx="5.6" cy="6.1" r="2.7" fill={`url(#${g})`} filter={`url(#${s})`} />
            <circle cx="18.4" cy="6.1" r="2.7" fill={`url(#${g})`} filter={`url(#${s})`} />
            <circle cx="12" cy="18.2" r="2.7" fill={`url(#${g})`} filter={`url(#${s})`} />
            <circle cx="4.9" cy="5.3" r=".7" fill="#fff" fillOpacity=".8" />
            <circle cx="17.7" cy="5.3" r=".7" fill="#fff" fillOpacity=".8" />
            <circle cx="11.3" cy="17.4" r=".7" fill="#fff" fillOpacity=".8" />
        </>
    ),
};

export const Icon = ({ name, className = '', strokeWidth = 1.5, ...props }) => {
    const uid = useId().replace(/[^a-zA-Z0-9-]/g, '');
    const key = ALIASES[name] || name;
    const glyph = GLYPHS[key];
    if (!glyph) return null;

    const [c1, c2, c3, c4] = PALETTE[key];
    const grad = `icon-g-${uid}`;
    const accent = `icon-a-${uid}`;
    const shadow = `icon-s-${uid}`;

    return (
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" {...props}>
            <defs>
                <linearGradient id={grad} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={c1} />
                    <stop offset="100%" stopColor={c2} />
                </linearGradient>
                <linearGradient id={accent} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={c3} />
                    <stop offset="100%" stopColor={c4} />
                </linearGradient>
                <filter id={shadow} x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="2" stdDeviation="1" floodColor="#0f172a" floodOpacity="0.3" />
                </filter>
            </defs>
            {glyph(grad, accent, shadow)}
        </svg>
    );
};

export default Icon;
