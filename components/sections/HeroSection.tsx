'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Send, Sparkles } from 'lucide-react';
import { getContent, Language, profile } from '@/data/portfolioData';

type HeroSectionProps = {
  lang: Language;
};

function useTypewriter(words: string[], speed = 60, pause = 2400) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let delay = deleting ? speed / 2 : speed;
    if (!deleting && charIdx === current.length) delay = pause;
    if (deleting && charIdx === 0) delay = 400;

    const t = setTimeout(() => {
      if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting && charIdx === 0) {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % words.length);
      } else {
        setCharIdx((i) => i + (deleting ? -1 : 1));
        setDisplay(current.slice(0, charIdx + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

const rolesEn = ['AI Automation Engineer', 'DevOps & Cloud Architect', 'n8n Workflow Builder', 'Voice AI Developer', 'Full-Stack Developer'];
const rolesFr = ["Ingénieure automatisation IA", 'Architecte DevOps & Cloud', 'Créatrice de workflows n8n', 'Développeuse Voice AI', 'Développeuse Full-Stack'];

const copy = {
  en: {
    inputPlaceholder: 'Describe your project or need...',
    inputLabel: 'Ask the AI — does my profile fit your project?',
    send: 'Ask',
    thinking: 'Thinking...',
    suggestions: ['I need to automate my social media', 'I need a DevOps engineer', 'I want to build an AI agent'],
    error: 'No answer. Try again.',
    fallback: 'I can only answer about this profile, skills and projects.',
  },
  fr: {
    inputPlaceholder: 'Décris ton projet ou ton besoin...',
    inputLabel: "Demande à l'IA — mon profil correspond-il à ton projet ?",
    send: 'Envoyer',
    thinking: 'Réflexion...',
    suggestions: ["J'ai besoin d'automatiser mes réseaux sociaux", "Je cherche un ingénieur DevOps", "Je veux créer un agent IA"],
    error: 'Pas de réponse. Réessaie.',
    fallback: 'Je réponds uniquement sur ce profil, les compétences et les projets.',
  },
};

type AiState = 'idle' | 'loading' | 'done' | 'error';

function HeroAiInput({ lang }: { lang: Language }) {
  const t = copy[lang];
  const [input, setInput] = useState('');
  const [state, setState] = useState<AiState>('idle');
  const [answer, setAnswer] = useState('');
  const answerRef = useRef<HTMLDivElement>(null);

  const submit = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || state === 'loading') return;
    setState('loading');
    setAnswer('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ language: lang, message: trimmed, source: 'hero' }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) throw new Error();
      const raw = data.answer || data.response || data.message || t.fallback;
      setAnswer(typeof raw === 'string' ? raw : JSON.stringify(raw));
      setState('done');
      setTimeout(() => answerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    } catch {
      setState('error');
      setAnswer(t.error);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit(input);
  };

  return (
    <div className="mt-10 w-full max-w-2xl">
      {/* Label */}
      <div className="mb-3 flex items-center gap-2">
        <Sparkles size={14} className="text-accent-2" />
        <span className="text-sm font-medium text-[#7c547b]">{t.inputLabel}</span>
      </div>

      {/* Input */}
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.inputPlaceholder}
          disabled={state === 'loading'}
          className="min-h-12 flex-1 rounded-2xl border border-[#d8b4e4] bg-white/70 px-5 text-sm text-[#3f1e47] shadow-sm outline-none placeholder:text-[#9d77a1] focus:border-accent-2 focus:ring-1 focus:ring-accent-2/30 backdrop-blur-sm disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={state === 'loading' || !input.trim()}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-accent-1 to-accent-3 px-5 py-3 text-sm font-semibold text-[#37112f] shadow-premium transition hover:scale-[1.02] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={15} />
          {state === 'loading' ? t.thinking : t.send}
        </button>
      </form>

      {/* Suggestion pills */}
      {state === 'idle' && (
        <div className="mt-3 flex flex-wrap gap-2">
          {t.suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => { setInput(s); submit(s); }}
              className="rounded-full border border-accent-2/30 bg-white/50 px-3 py-1.5 text-xs text-[#5f3565] backdrop-blur transition hover:border-accent-2 hover:bg-accent-1/10"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* AI answer */}
      {state === 'loading' && (
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-accent-2/25 bg-white/60 px-5 py-4 backdrop-blur-sm">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#8f5b8b]">AlexOps AI</span>
          <div className="ml-2 flex items-center gap-1">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </div>
        </div>
      )}

      {(state === 'done' || state === 'error') && (
        <div ref={answerRef} className="mt-4 rounded-2xl border border-accent-2/30 bg-white/70 px-5 py-4 shadow-sm backdrop-blur-sm">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#8f5b8b]">AlexOps AI</p>
          <p className="text-sm leading-relaxed text-[#3f1e47]">{answer}</p>
          <button
            type="button"
            onClick={() => { setState('idle'); setInput(''); setAnswer(''); }}
            className="mt-3 text-xs text-accent-2/70 underline-offset-2 hover:underline"
          >
            {lang === 'fr' ? 'Poser une autre question' : 'Ask another question'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const content = getContent(lang).hero;
  const roles = lang === 'fr' ? rolesFr : rolesEn;
  const role = useTypewriter(roles, 55, 2400);

  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute -top-28 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-accent-1/20 blur-[110px] -z-10 animate-sheen" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-14 h-72 w-72 rounded-full bg-accent-3/15 blur-[90px] -z-10 animate-float-glow" />

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        <p className="mb-5 inline-flex animate-fade-up items-center rounded-full border border-accent-2/45 bg-accent-1/12 px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent-2/90">
          {content.badge}
        </p>
        <h1 className="animate-fade-up max-w-4xl text-4xl font-semibold leading-tight text-[#4a2358] sm:text-6xl">
          {profile.name}
        </h1>
        <div className="mt-2 h-10 sm:h-12">
          <span className="animate-fade-up text-2xl font-semibold text-accent-2 sm:text-3xl">
            {role}
            <span className="ml-0.5 inline-block h-6 w-0.5 animate-pulse bg-accent-2 align-middle sm:h-8" />
          </span>
        </div>
        <p className="animate-fade-up mt-5 max-w-2xl text-lg leading-relaxed text-[#69456b] sm:text-xl">
          {content.headline}
        </p>

        {/* AI Input — la vedette */}
        <HeroAiInput lang={lang} />

        {/* Secondary CTAs */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="#projects"
            className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-[#d89fbf] bg-bg-0/70 px-5 py-2.5 text-sm font-semibold text-[#5d355f] backdrop-blur transition hover:-translate-y-1 hover:border-accent-3 hover:text-accent-1"
          >
            {content.ctaProjects} <ArrowRight size={15} />
          </Link>
          <Link
            href="#contact"
            className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-[#d89fbf] bg-bg-0/70 px-5 py-2.5 text-sm font-semibold text-[#5d355f] backdrop-blur transition hover:-translate-y-1 hover:border-accent-3 hover:text-accent-1"
          >
            {content.ctaContact} <Send size={15} />
          </Link>
        </div>

        {/* Stat cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {content.cards.map((card, index) => (
            <div key={card.title} className="surface-card premium-card reveal-card px-5 py-4" style={{ animationDelay: `${index * 90}ms` }}>
              <p className="text-xs uppercase tracking-[0.2em] text-accent-2/90">{card.title}</p>
              <p className="mt-2 text-sm text-[#5d3f62]">{card.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
