import SectionShell from '@/components/ui/SectionShell';
import { CheckCircle2 } from 'lucide-react';
import { getContent, Language } from '@/data/portfolioData';

type MethodSectionProps = {
  lang: Language;
};

export default function MethodSection({ lang }: MethodSectionProps) {
  const content = getContent(lang).method;

  return (
    <SectionShell
      id="method"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      index={4}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {content.steps.map((step, index) => (
          <article
            key={step.title}
            className="surface-card premium-card reveal-card p-5 transition duration-300 hover:border-accent-2/50"
            style={{ animationDelay: `${index * 110}ms` }}
          >
            <div className="mb-3 inline-flex items-center gap-3 text-accent-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-accent-3/45 bg-accent-2/15 text-sm font-semibold">
                {index + 1}
              </span>
              <CheckCircle2 size={18} />
            </div>
            <h3 className="text-lg font-semibold text-[#5f3e61]">{step.title}</h3>
            <p className="mt-3 text-sm text-[#78567b]">{step.description}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
