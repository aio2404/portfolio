'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { getContent, profile, Language } from '@/data/portfolioData';

type HeaderProps = {
  lang: Language;
  onLanguageChange: () => void;
};

const visibleIds = ['projects', 'about', 'contact'] as const;

export default function Header({ lang, onLanguageChange }: HeaderProps) {
  const content = getContent(lang);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const navItems = visibleIds.map((id) => ({
    id,
    label: content.navItems.find((item) => item.id === id)?.label ?? id,
  }));

  useEffect(() => {
    const sections = visibleIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current?.target.id) setActiveId(current.target.id);
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 0.1, 0.4] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 h-12 border-b border-line bg-ground">
      <div className="spec-container flex h-full items-center">
        <Link
          href="#home"
          className="inline-flex min-h-11 items-center font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-ink no-underline"
        >
          {profile.name}
        </Link>

        <nav aria-label={lang === 'fr' ? 'Navigation principale' : 'Main navigation'} className="ml-auto hidden h-full items-center md:flex">
          {navItems.map((item) => {
            const active = activeId === item.id;
            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                aria-current={active ? 'location' : undefined}
                className={`relative inline-flex h-full min-w-[88px] items-center justify-center px-4 text-sm text-ink-secondary no-underline transition-colors duration-[80ms] hover:text-signal ${
                  active ? 'text-signal after:absolute after:inset-x-4 after:bottom-0 after:h-0.5 after:bg-signal' : ''
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={lang === 'fr' ? 'Passer en anglais' : 'Switch to French'}
          onClick={onLanguageChange}
          className="ml-auto inline-flex min-h-11 min-w-11 items-center justify-center border-x border-line px-3 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-secondary transition-colors duration-[80ms] hover:bg-signal-subtle hover:text-signal md:ml-0"
        >
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>

        <button
          type="button"
          aria-label={lang === 'fr' ? 'Menu' : 'Menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex min-h-11 min-w-11 items-center justify-center border-r border-line text-ink md:hidden"
        >
          {mobileOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </div>

      {mobileOpen ? (
        <nav
          id="mobile-navigation"
          aria-label={lang === 'fr' ? 'Navigation mobile' : 'Mobile navigation'}
          className="absolute inset-x-0 top-12 border-b border-line bg-ground md:hidden"
        >
          <ul className="spec-container grid list-none py-3">
            {navItems.map((item) => (
              <li key={item.id} className="border-b border-line last:border-b-0">
                <Link
                  href={`#${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-11 items-center px-1 text-sm text-ink-secondary no-underline hover:text-signal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
