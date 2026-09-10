'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SystemsManifold from '@/components/visual/SystemsManifold';
import XPostDemoSection from '@/components/sections/XPostDemoSection';
import TerminalSection from '@/components/sections/TerminalSection';
import Footer from '@/components/sections/Footer';
import { Language, profile } from '@/data/portfolioData';

const labCopy = {
  en: {
    back: 'Back to portfolio',
    label: 'LAB.00 / EXPERIENCE SURFACE',
    title: 'Systems, observed in motion.',
    description: 'A lightweight test surface for interactive workflows and interface states. Experiments remain explicit about what is live, local or unavailable.',
    figure: 'FIG. 01 — Systems Manifold / live study',
  },
  fr: {
    back: 'Retour au portfolio',
    label: 'LAB.00 / SURFACE EXPÉRIENTIELLE',
    title: 'Des systèmes observés en mouvement.',
    description: 'Une surface d’essai légère pour les workflows interactifs et les états d’interface. Chaque expérience précise ce qui est live, local ou indisponible.',
    figure: 'FIG. 01 — Systems Manifold / étude live',
  },
};

export default function VisualLabClient() {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const queryLang = new URLSearchParams(window.location.search).get('lang');
    const stored = localStorage.getItem('portfolio-language');
    if (queryLang === 'fr' || queryLang === 'en') setLang(queryLang);
    else if (stored === 'fr' || stored === 'en') setLang(stored);
    else setLang(navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en');
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-language', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = labCopy[lang];

  return (
    <div className="min-h-screen">
      <a className="skip-link" href="#lab-content">{lang === 'fr' ? 'Aller au contenu' : 'Skip to content'}</a>
      <header className="sticky top-0 z-50 h-12 border-b border-line bg-ground">
        <div className="spec-container flex h-full items-center justify-between">
          <Link href={`/?lang=${lang}`} className="inline-flex min-h-11 items-center font-mono text-[12px] uppercase tracking-[0.08em] no-underline">
            {profile.name} / LAB
          </Link>
          <nav aria-label={lang === 'fr' ? 'Navigation du laboratoire' : 'Lab navigation'} className="flex h-full items-center">
            <Link href={`/?lang=${lang}`} aria-label={t.back} className="inline-flex min-h-11 items-center gap-2 px-3 text-sm text-ink-secondary no-underline hover:text-signal">
              <ArrowLeft size={15} aria-hidden="true" /><span className="hidden sm:inline">{t.back}</span>
            </Link>
            <button type="button" onClick={() => setLang((current) => current === 'en' ? 'fr' : 'en')} aria-label={lang === 'fr' ? 'Passer en anglais' : 'Switch to French'} className="inline-flex min-h-11 min-w-11 items-center justify-center border-x border-line px-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-secondary hover:bg-signal-subtle hover:text-signal">
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
          </nav>
        </div>
      </header>

      <main id="lab-content">
        <section className="lab-hero py-12 sm:py-16 lg:py-20">
          <div className="spec-container">
            <p className="spec-label">{t.label}</p>
            <div className="mt-8 grid items-center gap-12 xl:grid-cols-[minmax(0,0.82fr)_minmax(520px,1.18fr)] xl:gap-[clamp(40px,5vw,96px)]">
              <div className="min-w-0">
                <h1 className="display-title">{t.title}</h1>
                <p className="body-copy mt-6 max-w-[62ch] text-lg">{t.description}</p>
              </div>
              <figure className="m-0 min-w-0">
                <figcaption className="spec-caption mb-3">{t.figure}</figcaption>
                <SystemsManifold />
              </figure>
            </div>
          </div>
        </section>
        <XPostDemoSection lang={lang} />
        <TerminalSection lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
