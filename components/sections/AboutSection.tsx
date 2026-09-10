import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionShell from '@/components/ui/SectionShell';
import { getContent, profile, Language } from '@/data/portfolioData';

type AboutSectionProps = { lang: Language };

export default function AboutSection({ lang }: AboutSectionProps) {
  const content = getContent(lang).about;

  return (
    <SectionShell
      id="about"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.positioning}
      index={1}
      label={lang === 'fr' ? 'Profil' : 'Profile'}
    >
      <div className="grid gap-[var(--layout-gap)] xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
        <article>
          <p className="body-copy max-w-[62ch]">{content.intro}</p>
          <blockquote className="my-8 max-w-[62ch] border-l-2 border-signal pl-5 text-lg font-medium leading-relaxed text-ink">
            {content.missionStatement}
          </blockquote>
          <Link href="#method" className="button-secondary">
            {content.ctaMethod}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </article>

        <aside aria-labelledby="value-title" className="surface-panel h-full bg-ground-subtle p-6 lg:p-8">
          <p className="spec-label">CAPABILITIES / 05</p>
          <h3 id="value-title" className="subsection-title mt-3">
            {content.valueTitle}
          </h3>
          <p className="small-copy mt-3">{content.valueLead}</p>
          <ol className="mt-6 list-none p-0">
            {content.valueProps.map((item, index) => (
              <li key={item} className="grid grid-cols-[36px_1fr] gap-3 border-t border-line py-4 text-sm text-ink-secondary">
                <span className="font-mono text-[11px] text-signal">{String(index + 1).padStart(2, '0')}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <p className="small-copy mt-5">
            {content.emailLabel}{' '}
            <a className="font-medium text-signal underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </p>
        </aside>
      </div>
    </SectionShell>
  );
}
