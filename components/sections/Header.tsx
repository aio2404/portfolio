import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getContent, profile, Language } from '@/data/portfolioData';

type HeaderProps = {
  lang: Language;
  onLanguageChange: () => void;
};

export default function Header({ lang, onLanguageChange }: HeaderProps) {
  const content = getContent(lang);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-accent-3/50 bg-bg-0/85 shadow-[0_10px_40px_rgba(196,148,177,0.22)] backdrop-blur-xl">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        {/* Logo — vraiment dans le coin gauche */}
        <Link
          href="#home"
          className="text-sm font-semibold tracking-[0.16em] text-[#4f245d] drop-shadow-sm"
        >
          {profile.name}
        </Link>

        {/* Nav — centrée dans l'espace restant */}
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

        {/* Actions — coin droit */}
        <div className="ml-auto flex items-center gap-2">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-accent-1/55 bg-accent-2/25 px-4 py-2 text-sm font-semibold text-[#4f245d] transition-colors hover:border-accent-1 hover:text-[#2f0f33]"
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
        </div>
      </div>
    </header>
  );
}
