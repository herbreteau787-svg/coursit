import './GtaText.css';

export default function GtaText({ children, className = '', as: Tag = 'span', ...props }) {
    const text = typeof children === 'string' ? children : String(children ?? '');

    return (
        <Tag className={`gta-text ${className}`.trim()} data-text={text} {...props}>
            {text}
        </Tag>
    );
}
