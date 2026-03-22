import { ArrowRight, Zap } from 'lucide-react';
import SectionShell from '@/components/ui/SectionShell';
import { getContent, Language } from '@/data/portfolioData';

type LiveDemosSectionProps = {
  lang: Language;
};

export default function LiveDemosSection({ lang }: LiveDemosSectionProps) {
  const content = getContent(lang).liveDemos;

  return (
    <SectionShell
      id="demos"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      index={4}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {content.items.map((demo, index) => (
          <a
            key={demo.title}
            href={demo.url}
            target={demo.external ? '_blank' : '_self'}
            rel={demo.external ? 'noopener noreferrer' : undefined}
            className="surface-card reveal-card group flex flex-col gap-3 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent-2/55 hover:bg-accent-1/8"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-accent-2/35 bg-accent-1/12">
                <Zap size={18} className="text-accent-2" />
              </div>
              <span className="rounded-full border border-accent-2/25 bg-accent-2/8 px-2.5 py-1 text-[10px] font-semibold text-[#5f3565]">
                {demo.badge}
              </span>
            </div>
            <h3 className="text-base font-semibold text-[#5f3e61]">{demo.title}</h3>
            <p className="flex-1 text-sm text-[#715676]">{demo.description}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-2 transition group-hover:gap-2.5">
              {content.tryLabel}
              <ArrowRight size={13} />
            </div>
          </a>
        ))}
      </div>
    </SectionShell>
  );
}
