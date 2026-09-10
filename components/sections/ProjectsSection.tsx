import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import SectionShell from '@/components/ui/SectionShell';
import { getContent, Language } from '@/data/portfolioData';

type ProjectsSectionProps = { lang: Language };

const categories: Record<string, { en: string; fr: string }> = {
  'n8n-social-media-automation': { en: 'Automation system', fr: 'Système d’automatisation' },
  'ai-report-generation': { en: 'Operational reporting', fr: 'Reporting opérationnel' },
  'voice-ai-call-agent': { en: 'Conversational AI', fr: 'IA conversationnelle' },
  'domaine-berger-des-vignes': { en: 'Production web platform', fr: 'Plateforme web en production' },
  'client-devops-missions': { en: 'Platform engineering', fr: 'Ingénierie plateforme' },
  'this-portfolio': { en: 'Interactive system', fr: 'Système interactif' },
};

export default function ProjectsSection({ lang }: ProjectsSectionProps) {
  const content = getContent(lang).projects;

  return (
    <SectionShell
      id="projects"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      index={3}
      label={lang === 'fr' ? 'Systèmes livrés' : 'Shipped systems'}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {content.items.map((project) => {
          const metric = project.metrics?.[0];
          return (
            <article key={project.slug}>
              <Link href={`/projects/${project.slug}?lang=${lang}`} className="project-card group">
                <div className="flex items-start justify-between gap-6">
                  <p className="spec-label text-signal">{categories[project.slug]?.[lang] ?? (lang === 'fr' ? 'Système' : 'System')}</p>
                  <ArrowUpRight size={18} className="project-arrow shrink-0" aria-hidden="true" />
                </div>
                <h3 className="subsection-title mt-5">{project.title}</h3>
                <p className="small-copy mt-4 flex-1">{project.description}</p>
                {metric ? (
                  <p className="mt-8 border-t border-line pt-4 font-mono text-[12px] text-ink-secondary">
                    <span className="mr-3 text-signal">{metric.value}</span>
                    {metric.label}
                  </p>
                ) : null}
              </Link>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
