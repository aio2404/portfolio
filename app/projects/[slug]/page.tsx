import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import SystemFigure from '@/components/ui/SystemFigure';
import DocumentLanguage from '@/components/DocumentLanguage';
import { portfolioContent, getProjectBySlug, profile, Language } from '@/data/portfolioData';

type Params = { slug: string };
type SearchParams = { lang?: string };

export async function generateStaticParams() {
  return portfolioContent.en.projects.items.map((project) => ({ slug: project.slug }));
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
  const alternateLang = lang === 'fr' ? 'en' : 'fr';
  const copy = lang === 'fr'
    ? {
        back: 'Retour aux projets',
        overview: 'Vue d’ensemble',
        results: 'Signaux de résultat',
        implementation: 'Points de mise en œuvre',
        technical: 'Environnement technique',
        links: 'Liens',
      }
    : {
        back: 'Back to projects',
        overview: 'Overview',
        results: 'Outcome signals',
        implementation: 'Implementation points',
        technical: 'Technical environment',
        links: 'Links',
      };

  return (
    <div className="min-h-screen">
      <DocumentLanguage lang={lang} />
      <a className="skip-link" href="#case-study">{lang === 'fr' ? 'Aller au contenu' : 'Skip to content'}</a>
      <header className="sticky top-0 z-50 h-12 border-b border-line bg-ground">
        <div className="spec-container flex h-full items-center justify-between">
          <Link href={`/?lang=${lang}#projects`} className="inline-flex min-h-11 items-center font-mono text-[12px] uppercase tracking-[0.08em] no-underline">
            {profile.name}
          </Link>
          <nav aria-label={lang === 'fr' ? 'Navigation de l’étude de cas' : 'Case study navigation'} className="flex h-full items-center">
            <Link href={`/?lang=${lang}#projects`} aria-label={copy.back} className="inline-flex min-h-11 items-center gap-2 px-3 text-sm text-ink-secondary no-underline hover:text-signal">
              <ArrowLeft size={15} aria-hidden="true" />
              <span className="hidden sm:inline">{copy.back}</span>
            </Link>
            <Link href={`/projects/${project.slug}?lang=${alternateLang}`} className="inline-flex min-h-11 min-w-11 items-center justify-center border-x border-line px-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-secondary no-underline hover:bg-signal-subtle hover:text-signal">
              {alternateLang.toUpperCase()}
            </Link>
          </nav>
        </div>
      </header>

      <main id="case-study">
        <section className="case-hero" aria-labelledby="case-title">
          <div className="spec-container w-full">
            <p className="spec-label mb-8">CASE STUDY / {project.slug.replaceAll('-', ' ')}</p>
            <div className="case-grid">
              <p className="case-rail spec-label">CS.00<br />{copy.overview}</p>
              <div className="min-w-0">
                <h1 id="case-title" className="case-heading">{project.title}</h1>
                <p className="body-copy mt-8 max-w-[62ch] text-lg">{project.description}</p>
              </div>
            </div>
          </div>
        </section>

        {project.metrics?.length ? (
          <section aria-labelledby="results-title" className="case-study-section case-study-section--subtle">
            <div className="spec-container case-grid">
              <p className="case-rail spec-label">CS.01<br />{copy.results}</p>
              <div className="min-w-0">
                <h2 id="results-title" className="section-title">{copy.results}</h2>
                <dl className="mt-10 grid border-l border-t border-line-interactive sm:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="min-h-40 border-b border-r border-line bg-ground p-6">
                      <dt className="spec-label">{metric.label}</dt>
                      <dd className="mb-0 mt-8 text-[clamp(28px,3vw,48px)] font-medium tracking-[-0.02em] text-signal">{metric.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
        ) : null}

        {project.highlights?.length ? (
          <section aria-labelledby="implementation-title" className="case-study-section">
            <div className="spec-container case-grid">
              <p className="case-rail spec-label">CS.02<br />{copy.implementation}</p>
              <div className="min-w-0">
                <h2 id="implementation-title" className="section-title">{copy.implementation}</h2>
                <ol className="mt-10 grid list-none border-l border-t border-line-interactive p-0 lg:grid-cols-2">
                  {project.highlights.map((highlight, index) => (
                    <li key={highlight} className="grid min-h-32 grid-cols-[48px_1fr] gap-4 border-b border-r border-line p-6 text-sm text-ink-secondary">
                      <span className="font-mono text-[11px] text-signal">{String(index + 1).padStart(2, '0')}</span>
                      <span className="max-w-[58ch]">{highlight}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        ) : null}

        <section aria-labelledby="technical-title" className="case-study-section case-study-section--subtle">
          <div className="spec-container case-grid">
            <p className="case-rail spec-label">CS.03<br />{copy.technical}</p>
            <div className="grid min-w-0 gap-[var(--layout-gap)] xl:grid-cols-[minmax(300px,0.68fr)_minmax(520px,1.32fr)]">
              <div>
                <h2 id="technical-title" className="section-title">{copy.technical}</h2>
                <ul className="mt-8 flex list-none flex-wrap gap-x-5 gap-y-3 border-y border-line py-5 pl-0 font-mono text-[12px] text-ink-secondary">
                  {project.stack.map((item) => (
                    <li key={item} className="before:mr-2 before:text-signal before:content-['/']">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="min-w-0">
                <SystemFigure lang={lang} title={project.title} />
              </div>
            </div>
          </div>
        </section>

        {(project.github || project.demo) ? (
          <section aria-labelledby="links-title" className="case-study-section">
            <div className="spec-container case-grid">
              <p className="case-rail spec-label">CS.04<br />{copy.links}</p>
              <div className="min-w-0">
                <h2 id="links-title" className="section-title">{copy.links}</h2>
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.github ? (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="button-secondary">
                      {content.projects.githubLabel}<ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  ) : null}
                  {project.demo ? (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="button-primary">
                      {content.projects.demoLabel}<ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
