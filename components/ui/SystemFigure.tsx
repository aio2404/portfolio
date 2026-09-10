type SystemFigureProps = {
  lang: 'en' | 'fr';
  title: string;
};

export default function SystemFigure({ lang, title }: SystemFigureProps) {
  const labels = lang === 'fr'
    ? ['CONTEXTE', 'SYSTÈME', 'CONTRÔLES', 'SIGNAUX']
    : ['CONTEXT', 'SYSTEM', 'CHECKS', 'SIGNALS'];
  const description = lang === 'fr'
    ? `Carte de lecture de l’étude de cas ${title} : le contexte mène au système, puis aux contrôles et aux signaux de résultat.`
    : `Reading map for the ${title} case study: context leads to the system, then checks and outcome signals.`;

  return (
    <figure className="m-0 border border-line-interactive p-6">
      <figcaption className="spec-caption mb-6">FIG. 01 — CASE STUDY EVIDENCE MAP</figcaption>
      <svg viewBox="0 0 760 220" role="img" aria-label={description} className="h-auto w-full">
        <defs>
          <marker id="system-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0 0L8 4L0 8z" fill="#1F4E4A" />
          </marker>
        </defs>
        <g fill="none" stroke="#1F4E4A" strokeWidth="1.5" markerEnd="url(#system-arrow)">
          <path d="M174 110h48" />
          <path d="M354 110h48" />
          <path d="M534 110h48" />
        </g>
        {labels.map((label, index) => {
          const x = 42 + index * 180;
          return (
            <g key={label}>
              <rect x={x} y="74" width="132" height="72" rx="2" fill="#EAF0EF" stroke="#868280" strokeWidth="1.5" />
              <text x={x + 66} y="115" textAnchor="middle" fill="#1F4E4A" fontFamily="monospace" fontSize="11" letterSpacing="1.1">
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
