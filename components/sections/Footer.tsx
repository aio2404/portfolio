import { getContent, Language, profile } from '@/data/portfolioData';

type FooterProps = { lang: Language };

export default function Footer({ lang }: FooterProps) {
  const content = getContent(lang).footer;
  return (
    <footer className="border-t border-line py-8">
      <div className="spec-container flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <p className="mb-0 font-mono text-[12px] uppercase tracking-[0.04em] text-ink-secondary">
          {profile.name} / {content.tagline}
        </p>
        <p className="mb-0 text-xs text-ink-tertiary">© {new Date().getFullYear()} · {content.customizableText}</p>
      </div>
    </footer>
  );
}
