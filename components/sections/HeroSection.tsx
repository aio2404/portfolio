import Link from 'next/link';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import SystemsManifold from '@/components/visual/SystemsManifold';
import { getContent, Language, profile } from '@/data/portfolioData';

type HeroSectionProps = {
  lang: Language;
};

const heroCopy = {
  en: {
    title: 'Reliable systems. Measurable automation.',
    status: 'Available for selected projects',
    figure: 'FIG. 01 — Systems Manifold',
    figureNote: 'Source → route → process → output',
    index: 'SYS.00 / OVERVIEW',
  },
  fr: {
    title: 'Des systèmes fiables. Une automatisation mesurable.',
    status: 'Disponible pour de nouveaux projets',
    figure: 'FIG. 01 — Systems Manifold',
    figureNote: 'Source → routage → traitement → sortie',
    index: 'SYS.00 / VUE D’ENSEMBLE',
  },
};

export default function HeroSection({ lang }: HeroSectionProps) {
  const content = getContent(lang).hero;
  const t = heroCopy[lang];

  return (
    <section id="home" aria-labelledby="hero-title" className="hero-section py-12 sm:py-16 lg:py-20">
      <div className="spec-container">
        <p className="spec-label mb-8">{t.index}</p>
        <div className="grid grid-cols-1 items-center gap-12 xl:grid-cols-[minmax(0,1.18fr)_minmax(480px,0.82fr)] xl:gap-[clamp(40px,5vw,96px)]">
          <div className="hero-copy">
            <p className="spec-label mb-4">{profile.name} / {content.badge}</p>
            <h1 id="hero-title" className="display-title">
              {t.title}
            </h1>
            <p className="body-copy mt-6 text-lg">{content.headline}</p>
            <p className="availability-badge mt-6">{t.status}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#projects" className="button-primary">
                {content.ctaProjects}
                <ArrowDownRight size={16} aria-hidden="true" />
              </Link>
              <Link href="#contact" className="button-secondary">
                {content.ctaContact}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            <dl className="hero-metrics mt-12 grid grid-cols-1 border-y border-line sm:grid-cols-3">
              {content.cards.map((card) => (
                <div key={card.title} className="border-b border-line py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0">
                  <dt className="spec-label">{card.title}</dt>
                  <dd className="small-copy mb-0 mt-2">{card.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="m-0 min-w-0">
            <figcaption className="spec-caption mb-3 flex items-center justify-between gap-4">
              <span>{t.figure}</span>
              <span className="hidden text-right sm:inline">{t.figureNote}</span>
            </figcaption>
            <SystemsManifold />
          </figure>
        </div>
      </div>
    </section>
  );
}
