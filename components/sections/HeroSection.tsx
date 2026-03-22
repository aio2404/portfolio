import Link from 'next/link';
import { ArrowRight, Send } from 'lucide-react';
import { getContent, Language, profile } from '@/data/portfolioData';

type HeroSectionProps = {
  lang: Language;
};

export default function HeroSection({ lang }: HeroSectionProps) {
  const content = getContent(lang).hero;

  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-accent-1/20 blur-[110px] -z-10 animate-sheen parallax-orb"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-14 h-72 w-72 rounded-full bg-accent-3/15 blur-[90px] -z-10 animate-float-glow"
      />
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        <p className="mb-5 inline-flex animate-fade-up items-center rounded-full border border-accent-2/45 bg-accent-1/12 px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent-2/90">
          {content.badge}
        </p>
        <h1 className="animate-fade-up max-w-4xl text-4xl sm:text-6xl font-semibold leading-tight text-[#4a2358]">
          {profile.name ? `${profile.name} — ` : ''}
          {content.role}
        </h1>
        <p className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-[#69456b] sm:text-xl">
          {content.headline}
        </p>
        <p className="animate-fade-up mt-3 max-w-2xl text-sm text-[#7c547b]" style={{ animationDelay: '80ms' }}>
          {content.availability}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="#projects"
            className="inline-flex animate-fade-up items-center gap-2 rounded-full bg-gradient-to-r from-accent-1 to-accent-3 px-6 py-3 text-sm font-semibold text-[#37112f] shadow-premium transition-all duration-300 hover:scale-[1.02] hover:brightness-105"
            style={{ animationDelay: '120ms' }}
          >
            {content.ctaProjects}
            <ArrowRight size={16} />
          </Link>
          <Link
            href="#contact"
            className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-[#d89fbf] bg-bg-0/70 px-6 py-3 text-sm font-semibold text-[#5d355f] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent-3 hover:text-accent-1"
            style={{ animationDelay: '170ms' }}
          >
            {content.ctaContact}
            <Send size={16} />
          </Link>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {content.cards.map((card, index) => (
            <StatCard key={card.title} title={card.title} detail={card.detail} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ title, detail, index }: { title: string; detail: string; index: number }) {
  return (
    <div
      className="surface-card premium-card reveal-card px-5 py-4"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-accent-2/90">{title}</p>
      <p className="mt-2 text-sm text-[#5d3f62]">{detail}</p>
    </div>
  );
}
