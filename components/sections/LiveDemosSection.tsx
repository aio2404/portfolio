import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import SectionShell from '@/components/ui/SectionShell';
import { getContent, Language } from '@/data/portfolioData';

type LiveDemosSectionProps = { lang: Language };

export default function LiveDemosSection({ lang }: LiveDemosSectionProps) {
  const content = getContent(lang).liveDemos;

  return (
    <SectionShell
      id="demos"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      index={4}
      label={lang === 'fr' ? 'Laboratoire' : 'Visual lab'}
      tone="subtle"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {content.items.map((demo) => {
          const href = demo.external
            ? demo.url
            : demo.url === '#x-demo'
              ? `/lab?lang=${lang}#x-demo`
              : demo.url;
          const inner = (
            <>
              <div className="flex items-start justify-between gap-4">
                <p className="spec-label text-signal">{demo.badge}</p>
                <ArrowUpRight size={18} className="project-arrow shrink-0" aria-hidden="true" />
              </div>
              <h3 className="subsection-title mt-5">{demo.title}</h3>
              <p className="small-copy mt-3 flex-1">{demo.description}</p>
              <p className="mt-6 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.04em] text-ink-tertiary">
                {demo.hint}
              </p>
            </>
          );

          return (
            <article key={demo.title}>
              {demo.external ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className="project-card group">
                  {inner}
                </a>
              ) : (
                <Link href={href} className="project-card group">
                  {inner}
                </Link>
              )}
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <Link href={`/lab?lang=${lang}`} className="button-secondary">
          {lang === 'fr' ? 'Ouvrir le laboratoire' : 'Open the visual lab'}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </SectionShell>
  );
}
