import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, Code2 } from 'lucide-react';
import { portfolioContent, getProjectBySlug, Language } from '@/data/portfolioData';

type Params = { slug: string };
type SearchParams = { lang?: string };

export async function generateStaticParams() {
  const slugs = portfolioContent.en.projects.items.map((p) => ({ slug: p.slug }));
  return slugs;
}

export default function ProjectPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const lang: Language = searchParams.lang === 'fr' ? 'fr' : 'en';
  const project = getProjectBySlug(params.slug, lang);

  if (!project) notFound();

  const content = portfolioContent[lang];

  return (
    <div className="min-h-screen bg-bg-0 font-sans text-[#3f2347] antialiased">
      {/* Back link */}
      <div className="mx-auto max-w-4xl px-4 pb-0 pt-10 sm:px-6 lg:px-8">
        <Link
          href={`/?lang=${lang}#projects`}
          className="inline-flex items-center gap-2 text-sm text-[#715676] transition hover:text-accent-2"
        >
          <ArrowLeft size={15} />
          {lang === 'fr' ? 'Retour aux projets' : 'Back to projects'}
        </Link>
      </div>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 border-b border-accent-1/20 pb-10">
          <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent-2/35 bg-accent-1/12">
            <Code2 size={22} className="text-accent-3" />
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-[#532f57] sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#6d476b]">
            {project.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-accent-1/40 bg-accent-1/10 px-3 py-1 text-xs text-[#4f2e53]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-5 text-sm uppercase tracking-[0.18em] text-accent-2/80">
              {lang === 'fr' ? 'Résultats clés' : 'Key results'}
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="surface-card flex flex-col items-center justify-center gap-1 p-5 text-center"
                >
                  <span className="text-2xl font-bold text-[#4f245d]">{m.value}</span>
                  <span className="text-xs text-[#715676]">{m.label}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-5 text-sm uppercase tracking-[0.18em] text-accent-2/80">
              {lang === 'fr' ? 'Points clés' : 'Highlights'}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-[#5f3565]">
                  <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-accent-2" />
                  {h}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Links */}
        <div className="flex flex-wrap gap-3 border-t border-accent-1/20 pt-8">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-accent-1/40 bg-accent-1/10 px-5 py-2.5 text-sm text-[#5d3f62] hover:border-accent-1 hover:text-accent-1"
            >
              {content.projects.githubLabel}
              <ArrowRight size={14} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-accent-3/45 px-5 py-2.5 text-sm text-[#5d3f62] hover:border-accent-3 hover:text-accent-3"
            >
              {content.projects.demoLabel}
              <ArrowRight size={14} />
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
