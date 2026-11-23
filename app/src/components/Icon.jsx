import { useId } from 'react';

/* Icônes « interface pro » : traits fins, détails, dégradé + ombre portée douce. */
const ALIASES = {
    '✍️': 'pencil',
    '📚': 'book-open',
    '🛠️': 'wrench',
    '🧪': 'flask',
    '🎓': 'book',
    '🔎': 'search',
};

const GLYPHS = {
    house: (
        <>
            <path d="M3.2 10.5 12 3.4l8.8 7.1" />
            <path d="M5.3 9.2V18.7a1.9 1.9 0 0 0 1.9 1.9h9.6a1.9 1.9 0 0 0 1.9-1.9V9.2" />
            <path d="M9.7 20.6v-5.2a2.3 2.3 0 0 1 4.6 0v5.2" />
            <path d="M7.5 12.1h2.2v2.3H7.5zM14.3 12.1h2.2v2.3h-2.2z" fill="currentColor" fillOpacity="0.18" strokeWidth="1.1" />
            <path d="M17.4 6.1V3.4h2.1v4.3" />
            <path d="M2.7 20.6h18.6" strokeOpacity="0.4" />
        </>
    ),
    'book-open': (
        <>
            <path d="M12 6.3c-2.3-1.7-5-2.3-8.3-1.9v12.9c3.3-.4 6 .2 8.3 1.9 2.3-1.7 5-2.3 8.3-1.9V4.4c-3.3-.4-6 .2-8.3 1.9Z" />
            <path d="M12 6.3v12.9" />
            <path d="M5.9 9.3c1.6-.1 3 .1 4.2.7M5.9 12.2c1.6-.1 3 .1 4.2.7M13.9 10c1.2-.6 2.6-.8 4.2-.7M13.9 12.9c1.2-.6 2.6-.8 4.2-.7" strokeOpacity="0.55" strokeWidth="1.1" />
            <path d="M3.7 4.5v12.8" strokeOpacity="0.45" />
        </>
    ),
    star: (
        <>
            <path d="m12 3.3 2.66 5.39 5.95.87-4.31 4.2 1.02 5.93L12 16.68l-5.32 2.81 1.02-5.93-4.31-4.2 5.95-.87L12 3.3Z" />
            <path d="M12 3.3v13.38M6.67 9.56 12 12.05l5.33-2.49" strokeOpacity="0.5" strokeWidth="1.1" />
            <circle cx="12" cy="12.05" r="0.8" fill="currentColor" stroke="none" fillOpacity="0.75" />
        </>
    ),
    'help-circle': (
        <>
            <circle cx="12" cy="12" r="8.6" />
            <circle cx="12" cy="12" r="6.9" strokeOpacity="0.3" strokeWidth="1" />
            <path d="M9.6 9.4a2.5 2.5 0 0 1 4.9.7c0 1.7-2.5 2.1-2.5 4" />
            <circle cx="12" cy="17" r="0.95" fill="currentColor" stroke="none" />
            <path d="M6.8 7a7.4 7.4 0 0 1 3-1.8" strokeOpacity="0.5" strokeWidth="1.1" />
        </>
    ),
    flask: (
        <>
            <path d="M9.2 3.3h5.6M10 3.3v6.1L4.9 18a2 2 0 0 0 1.7 3h10.8a2 2 0 0 0 1.7-3L14 9.4V3.3" />
            <path d="M7.2 15.7h9.6l1.1 2.2a1.6 1.6 0 0 1-1.4 2.4H7.5a1.6 1.6 0 0 1-1.4-2.4l1.1-2.2Z" fill="currentColor" fillOpacity="0.16" strokeOpacity="0.7" strokeWidth="1.1" />
            <circle cx="10" cy="18.1" r="0.7" fill="currentColor" stroke="none" />
            <circle cx="13.3" cy="17.3" r="0.5" fill="currentColor" stroke="none" fillOpacity="0.7" />
            <path d="M9.2 3.3h5.6" strokeWidth="2.1" />
        </>
    ),
    settings: (
        <>
            <path d="m12 2.7 1.32 2.2 2.52-.5.5 2.52 2.2 1.32-1.1 2.3 1.7 1.9-1.7 1.9 1.1 2.3-2.2 1.32-.5 2.52-2.52-.5L12 21.3l-1.32-2.2-2.52.5-.5-2.52-2.2-1.32 1.1-2.3-1.7-1.9 1.7-1.9-1.1-2.3 2.2-1.32.5-2.52 2.52.5L12 2.7Z" />
            <circle cx="12" cy="12" r="3.3" />
            <circle cx="12" cy="12" r="1.15" fill="currentColor" stroke="none" fillOpacity="0.8" />
        </>
    ),
    'file-text': (
        <>
            <path d="M13.6 3.3H6.8a1.8 1.8 0 0 0-1.8 1.8v13.8a1.8 1.8 0 0 0 1.8 1.8h10.4a1.8 1.8 0 0 0 1.8-1.8V8.7L13.6 3.3Z" />
            <path d="M13.6 3.3v5.4h5.4" />
            <path d="M8.5 12h7M8.5 15h7M8.5 18h4.5" strokeOpacity="0.6" strokeWidth="1.1" />
            <path d="M8.5 9h2.2" />
        </>
    ),
    wrench: (
        <>
            <path d="M20.1 5.2a5.2 5.2 0 0 1-6.7 6.7l-6.2 6.2a2 2 0 0 1-2.8-2.8l6.2-6.2a5.2 5.2 0 0 1 6.7-6.7l-2.9 2.9.6 2.2 2.2.6 2.9-2.9Z" />
            <circle cx="7.2" cy="16.8" r="0.8" fill="currentColor" stroke="none" />
            <path d="M15.6 5.6a2.6 2.6 0 0 0-1.1 1.4" strokeOpacity="0.5" strokeWidth="1.1" />
        </>
    ),
    book: (
        <>
            <path d="M5.3 4.3A1.9 1.9 0 0 1 7.2 2.4h11.4v18.2H7.2a1.9 1.9 0 0 1-1.9-1.9V4.3Z" />
            <path d="M7.2 2.4v18.2" />
            <path d="M9.9 7.2h6.1M9.9 10.4h6.1" strokeOpacity="0.5" strokeWidth="1.1" />
            <path d="M14.3 2.4v6.2l2-1.6 2 1.6V2.4" />
        </>
    ),
    globe: (
        <>
            <circle cx="12" cy="12" r="8.7" />
            <path d="M3.5 12h17" />
            <ellipse cx="12" cy="12" rx="4" ry="8.7" />
            <path d="M5.4 7.3c1.8.9 4.1 1.4 6.6 1.4s4.8-.5 6.6-1.4M5.4 16.7c1.8-.9 4.1-1.4 6.6-1.4s4.8.5 6.6 1.4" strokeOpacity="0.55" strokeWidth="1.1" />
        </>
    ),
    'alert-triangle': (
        <>
            <path d="M12 3.7 2.9 19a1.6 1.6 0 0 0 1.4 2.4h15.4a1.6 1.6 0 0 0 1.4-2.4L12 3.7Z" />
            <path d="M12 9.2v5" strokeWidth="2" />
            <circle cx="12" cy="17.6" r="0.9" fill="currentColor" stroke="none" />
            <path d="M8.4 15.6h7.2" strokeOpacity="0.35" strokeWidth="1" />
        </>
    ),
    pencil: (
        <>
            <path d="m4.6 19.4 1-4.2L16 4.8a1.6 1.6 0 0 1 2.3 0l1 1a1.6 1.6 0 0 1 0 2.3L8.9 18.5l-4.3.9Z" />
            <path d="m14.8 6.1 3.3 3.3M5.6 15.2l3.3 3.3" />
        </>
    ),
    search: (
        <>
            <circle cx="10.8" cy="10.8" r="6.4" />
            <path d="m15.6 15.6 4.6 4.6" strokeWidth="2" />
            <circle cx="10.8" cy="10.8" r="3.8" strokeOpacity="0.4" strokeWidth="1" />
        </>
    ),
    servers: (
        <>
            <rect x="3.2" y="3.4" width="17.6" height="7" rx="1.6" />
            <rect x="3.2" y="13.6" width="17.6" height="7" rx="1.6" />
            <circle cx="6.8" cy="6.9" r="0.9" fill="currentColor" stroke="none" />
            <circle cx="6.8" cy="17.1" r="0.9" fill="currentColor" stroke="none" />
            <path d="M10.4 6.9h6.2M10.4 17.1h6.2" strokeOpacity="0.6" strokeWidth="1.1" />
        </>
    ),
    shield: (
        <>
            <path d="M12 3.2 19 6.1v5.4c0 4.5-3 7.9-7 9.3-4-1.4-7-4.8-7-9.3V6.1l7-2.9Z" />
            <path d="m9 12 2.2 2.2L15.4 10" />
            <path d="M12 3.2v16.6" strokeOpacity="0.3" strokeWidth="1" />
        </>
    ),
    network: (
        <>
            <circle cx="5.6" cy="6.2" r="2.4" />
            <circle cx="18.4" cy="6.2" r="2.4" />
            <circle cx="12" cy="18.2" r="2.4" />
            <path d="m7.7 7.5 3 8.5M16.3 7.5l-3 8.5M8 6.2h8" />
            <circle cx="5.6" cy="6.2" r="0.7" fill="currentColor" stroke="none" />
            <circle cx="18.4" cy="6.2" r="0.7" fill="currentColor" stroke="none" />
        </>
    ),
};

export const Icon = ({ name, active = false, className = '', strokeWidth = 1.5, ...props }) => {
    const uid = useId().replace(/[^a-zA-Z0-9-]/g, '');
    const glyph = GLYPHS[ALIASES[name] || name];
    if (!glyph) return null;

    const gradientClass = active
        ? 'text-[#ff0080] [filter:drop-shadow(0_0_10px_rgba(255,0,128,0.85))_drop-shadow(0_0_18px_rgba(255,140,0,0.5))]'
        : 'text-[#ff8c00] opacity-60 [filter:drop-shadow(0_0_3px_rgba(255,0,128,0.25))] hover:!opacity-100 hover:[filter:drop-shadow(0_0_8px_rgba(255,0,128,0.5))]';

    const gradientId = `icon-grad-${uid}`;
    const from = '#ff0080';
    const via = '#ff8c00';
    const to = '#ffd700';

    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            className={`${gradientClass} ${className}`.trim()}
            aria-hidden="true"
            {...props}
        >
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={from} stopOpacity="0.95" />
                    <stop offset="50%" stopColor={via} stopOpacity="0.85" />
                    <stop offset="100%" stopColor={to} stopOpacity="0.65" />
                </linearGradient>
            </defs>
            <g
                stroke={`url(#${gradientId})`}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {glyph}
            </g>
        </svg>
    );
};

export default Icon;
