import SectionShell from '@/components/ui/SectionShell';
import { getContent, Language } from '@/data/portfolioData';

type SkillsSectionProps = { lang: Language };

export default function SkillsSection({ lang }: SkillsSectionProps) {
  const content = getContent(lang).skills;

  return (
    <SectionShell
      id="skills"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      index={2}
      label={lang === 'fr' ? 'Capacités' : 'Capabilities'}
      tone="subtle"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {content.categories.map((category, index) => (
          <article key={category.title} className="capability-card">
            <p className="spec-label">CAP.{String(index + 1).padStart(2, '0')}</p>
            <h3 className="subsection-title mt-3">{category.title}</h3>
            <p className="small-copy mt-3">{category.description}</p>
            <ul className="mt-auto flex list-none flex-wrap gap-x-4 gap-y-2 border-y border-line py-4 pl-0 pt-6 font-mono text-[12px] leading-6 text-ink-secondary">
              {category.items.map((item) => (
                <li key={item} className="before:mr-2 before:text-signal before:content-['/']">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
