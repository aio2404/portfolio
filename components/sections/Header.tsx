'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';
import { getContent, profile, Language } from '@/data/portfolioData';

type HeaderProps = {
  lang: Language;
  onLanguageChange: () => void;
};

export default function Header({ lang, onLanguageChange }: HeaderProps) {
  const content = getContent(lang);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-accent-3/50 bg-bg-0/85 shadow-[0_10px_40px_rgba(196,148,177,0.22)] backdrop-blur-xl">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="#home"
          className="text-sm font-semibold tracking-[0.16em] text-[#4f245d] drop-shadow-sm"
        >
          {profile.name}
        </Link>

        {/* Nav desktop */}
        <nav aria-label="Navigation principale" className="hidden flex-1 justify-center gap-6 lg:flex">
          {content.navItems.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="text-sm text-[#66446b] transition-colors hover:text-accent-1"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2">
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full border border-accent-1/55 bg-accent-2/25 px-4 py-2 text-sm font-semibold text-[#4f245d] transition-colors hover:border-accent-1 hover:text-[#2f0f33] sm:inline-flex"
          >
            {content.header.contactButton}
            <ArrowRight size={16} />
          </a>
          <button
            type="button"
            aria-label="Change language"
            onClick={onLanguageChange}
            className="inline-flex items-center rounded-full border border-accent-1/35 bg-accent-3/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#4f245d] transition-colors hover:border-accent-2 hover:text-accent-2"
          >
            {content.header.languageSwitcher}
          </button>
          {/* Hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-full border border-accent-1/35 bg-accent-3/20 p-2 text-[#4f245d] transition-colors hover:border-accent-2 lg:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          aria-label="Navigation mobile"
          className="border-t border-accent-3/30 bg-bg-0/95 px-4 py-4 backdrop-blur-xl lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {content.navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-[#66446b] transition-colors hover:bg-accent-1/10 hover:text-accent-1"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 pt-2 border-t border-accent-3/30">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-full border border-accent-1/55 bg-accent-2/25 px-4 py-2.5 text-sm font-semibold text-[#4f245d]"
              >
                {content.header.contactButton}
                <ArrowRight size={16} />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
