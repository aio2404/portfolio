import SectionShell from '@/components/ui/SectionShell';
import { getContent, Language } from '@/data/portfolioData';

type MethodSectionProps = { lang: Language };

export default function MethodSection({ lang }: MethodSectionProps) {
  const content = getContent(lang).method;

  return (
    <SectionShell
      id="method"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      index={5}
      label={lang === 'fr' ? 'Processus' : 'Process'}
    >
      <ol className="grid list-none border-l border-t border-line-interactive p-0 md:grid-cols-2 xl:grid-cols-5">
        {content.steps.map((step, index) => (
          <li key={step.title} className="flex min-h-[240px] flex-col border-b border-r border-line p-6">
            <span className="font-mono text-[12px] text-signal">STEP {String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-8 text-lg font-medium leading-6 text-ink">{step.title}</h3>
            <p className="small-copy mb-0 mt-auto pt-8">{step.description}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
