import { getContent, Language, profile } from '@/data/portfolioData';

type FooterProps = {
  lang: Language;
};

export default function Footer({ lang }: FooterProps) {
  const content = getContent(lang).footer;
  return (
    <footer className="mt-12 border-t border-accent-1/20 bg-gradient-to-r from-bg-0 to-bg-2/80 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-[#6f486e]">{profile.name} · {content.tagline}</p>
        <p className="text-xs text-[#9a7392]">© {new Date().getFullYear()} · {content.customizableText}</p>
      </div>
    </footer>
  );
}
