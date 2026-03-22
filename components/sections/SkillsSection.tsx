import { Cloud, Code2, Bot, Database } from 'lucide-react';
import SectionShell from '@/components/ui/SectionShell';
import { getContent, Language } from '@/data/portfolioData';

const iconByIndex = [Cloud, Code2, Bot, Database] as const;

type SkillsSectionProps = {
  lang: Language;
};

export default function SkillsSection({ lang }: SkillsSectionProps) {
  const content = getContent(lang).skills;
  return (
    <SectionShell
      id="skills"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      index={2}
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {content.categories.map((section, index) => {
          const Icon = iconByIndex[index % iconByIndex.length];
          return (
            <article
              key={section.title}
              className="group surface-card premium-card reveal-card p-5 transition duration-300 hover:-translate-y-1 hover:border-accent-1/65 hover:bg-accent-1/8"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent-2/40 bg-accent-1/12">
                <Icon size={20} className="text-accent-3" />
              </div>
              <h3 className="text-lg font-semibold text-[#5f3e61]">{section.title}</h3>
              <p className="mt-2 text-sm text-[#785a77]">{section.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-[#5f3e61]">
                {section.items.map((item) => (
                  <li key={item} className="border-b border-accent-3/15 pb-2">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
