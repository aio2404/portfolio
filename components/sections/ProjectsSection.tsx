import { Code2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import SectionShell from '@/components/ui/SectionShell';
import { getContent, Language } from '@/data/portfolioData';

type ProjectsSectionProps = {
  lang: Language;
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
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {content.items.map((project, index) => (
          <article
            key={project.title}
            className="surface-card p-6 premium-card reveal-card transition duration-300 hover:-translate-y-1 hover:border-accent-2/55 hover:bg-accent-1/8"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-accent-2/35 bg-accent-1/12">
              <Code2 size={18} className="text-accent-3" />
            </div>
            <h3 className="text-xl font-semibold text-[#5f3e61]">{project.title}</h3>
            <p className="mt-3 text-sm text-[#715676]">{project.description}</p>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex flex-col rounded-lg border border-accent-2/20 bg-accent-1/8 px-3 py-2 text-center"
                  >
                    <span className="text-sm font-bold text-[#4f245d]">{m.value}</span>
                    <span className="text-[10px] text-[#715676]">{m.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={`${project.title}-${item}`}
                  className="rounded-full border border-accent-1/40 bg-accent-1/10 px-3 py-1 text-xs text-[#4f2e53]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/projects/${project.slug}?lang=${lang}`}
                className="inline-flex items-center gap-2 rounded-full border border-accent-2/35 bg-accent-1/10 px-4 py-2 text-sm text-[#5d3f62] hover:border-accent-2 hover:text-accent-2"
              >
                {content.detailsLabel}
                <ArrowRight size={14} />
              </Link>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-accent-1/30 px-4 py-2 text-sm text-[#5d3f62] hover:border-accent-1 hover:text-accent-1"
                >
                  {content.githubLabel}
                  <ArrowRight size={14} />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-accent-3/45 px-4 py-2 text-sm text-[#5d3f62] hover:border-accent-3 hover:text-accent-3"
                >
                  {content.demoLabel}
                  <ArrowRight size={14} />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
