import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import SectionShell from '@/components/ui/SectionShell';
import { getContent, profile, Language } from '@/data/portfolioData';

type AboutSectionProps = {
  lang: Language;
};

export default function AboutSection({ lang }: AboutSectionProps) {
  const content = getContent(lang).about;

  return (
    <SectionShell
      id="about"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.positioning}
      index={1}
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <article className="surface-panel premium-card reveal-card p-6 sm:p-8">
          <p className="text-[#5f3d60]">{content.intro}</p>
          <p className="mt-5 text-sm text-[#76567b]">{content.missionStatement}</p>
          <Link
            href="#method"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent-2/55 bg-accent-1/10 px-4 py-2 text-sm font-medium text-accent-2 transition-all duration-300 hover:border-accent-2 hover:bg-accent-2/15 hover:translate-y-[-2px]"
          >
            {content.ctaMethod}
          </Link>
        </article>

        <div className="surface-card premium-card reveal-card p-6 sm:p-8">
          <h3 className="text-lg font-medium text-[#5f3e61]">{content.valueTitle}</h3>
          <p className="mt-3 text-sm text-[#786579]">{content.valueLead}</p>
          <ul className="mt-5 space-y-3">
            {content.valueProps.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-[#5f3e61] reveal-card" style={{ animationDelay: '120ms' }}>
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent-2" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-[#6a4e6d]">
            {content.emailLabel}{' '}
            <a className="text-accent-2 underline underline-offset-4" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
