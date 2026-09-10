'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { Language } from '@/data/portfolioData';

type ChatMessage = { id: string; role: 'user' | 'assistant'; content: string };
type ChatbotSectionProps = { lang: Language };

const copyByLang = {
  en: {
    title: 'AI assistant',
    placeholder: 'Tell me about your project…',
    bubbleLabel: 'Ask AlexOps AI',
    newLabel: 'New',
    send: 'Send',
    loading: 'Thinking…',
    error: 'No answer returned. Try again in a moment.',
    fallback: 'I can answer only about the profile, skills, projects, process and services.',
    welcome: "Hi. Tell me about your project or need, and I’ll explain where this profile may fit.",
    close: 'Close AI assistant',
    you: 'You',
  },
  fr: {
    title: 'Assistant IA',
    placeholder: 'Décrivez votre projet…',
    bubbleLabel: 'Demander à AlexOps IA',
    newLabel: 'Nouveau',
    send: 'Envoyer',
    loading: 'Réflexion…',
    error: 'Aucune réponse pour le moment. Réessayez dans un instant.',
    fallback: 'Je peux répondre uniquement sur le profil, les compétences, les projets, la méthode et les prestations.',
    welcome: 'Bonjour. Décrivez votre besoin ou votre projet, et je vous expliquerai où ce profil peut intervenir.',
    close: 'Fermer l’assistant IA',
    you: 'Vous',
  },
};

const starterQuestions = {
  en: ['What type of projects do you do?', 'Can you build n8n automations?', 'Are you available for freelance?'],
  fr: ['Quel type de projets faites-vous ?', 'Vous créez des automatisations n8n ?', 'Êtes-vous disponible en freelance ?'],
};

export default function ChatbotSection({ lang }: ChatbotSectionProps) {
  const t = copyByLang[lang];
  const starters = useMemo(() => starterQuestions[lang], [lang]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (localStorage.getItem('portfolio-chat-welcomed')) return;
    const timer = setTimeout(() => setHasNotification(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: 'welcome', role: 'assistant', content: t.welcome }]);
    }
  }, [isOpen, messages.length, t.welcome]);

  useEffect(() => setMessages([]), [lang]);

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    bottomRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [messages, isLoading]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInput = question.trim();
    if (!userInput || isLoading) return;
    setMessages((previous) => [...previous, { id: `${Date.now()}-user`, role: 'user', content: userInput }]);
    setQuestion('');
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ language: lang, message: userInput, source: 'portfolio' }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload) throw new Error(payload?.error || t.error);
      const answer = payload.answer || payload.response || payload.message || payload.raw || t.fallback;
      setMessages((previous) => [...previous, { id: `${Date.now()}-assistant`, role: 'assistant', content: typeof answer === 'string' ? answer : JSON.stringify(answer) }]);
    } catch (chatError) {
      setError(chatError instanceof Error ? chatError.message : t.error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWidget = () => {
    setIsOpen((open) => !open);
    setHasNotification(false);
    localStorage.setItem('portfolio-chat-welcomed', '1');
  };

  const closeWidget = () => {
    setIsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <div className="fixed bottom-3 right-3 z-[60] flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-3 sm:bottom-5 sm:right-5 sm:max-w-[calc(100vw-2.5rem)]">
      {isOpen ? (
        <section id="ai-assistant-panel" role="dialog" aria-label={t.title} className="w-[min(24rem,calc(100vw-1.5rem))] border border-line-interactive bg-ground p-4 sm:w-[min(24rem,calc(100vw-2.5rem))]">
          <div className="mb-3 flex items-center justify-between gap-2 border-b border-line pb-3">
            <div className="flex items-center gap-2">
              <MessageCircle size={18} aria-hidden="true" />
              <h2 className="mb-0 text-base font-medium">{t.title}</h2>
            </div>
            <button ref={closeButtonRef} type="button" onClick={closeWidget} className="inline-flex min-h-11 min-w-11 items-center justify-center border border-line text-ink-secondary hover:border-signal hover:text-signal" aria-label={t.close}>
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          <div className="max-h-[44vh] space-y-2 overflow-y-auto border border-line bg-ground-subtle p-3 text-sm" role="log" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`border px-3 py-2 ${message.role === 'assistant' ? 'border-signal bg-signal-subtle' : 'border-line-interactive bg-ground'}`}>
                <p className="spec-label mb-1 text-signal">{message.role === 'assistant' ? 'AlexOps' : t.you}</p>
                <p className="mb-0 text-sm leading-relaxed text-ink-secondary">{message.content}</p>
              </div>
            ))}
            {isLoading ? (
              <div className="border border-signal bg-signal-subtle px-3 py-3">
                <p className="spec-label mb-2 text-signal">AlexOps / {t.loading}</p>
                <div className="flex items-center gap-1.5"><span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" /></div>
              </div>
            ) : null}
            <div ref={bottomRef} />
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {starters.map((value) => (
              <button key={value} type="button" onClick={() => setQuestion(value)} className="min-h-11 border border-line-interactive px-3 py-2 text-left text-xs text-ink-secondary hover:border-signal hover:text-signal">
                {value}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="mt-3 flex gap-2">
            <label htmlFor="assistant-question" className="sr-only">{t.placeholder}</label>
            <input id="assistant-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={t.placeholder} className="field min-w-0 flex-1" />
            <button type="submit" disabled={isLoading || !question.trim()} className="button-primary px-3 disabled:cursor-not-allowed disabled:opacity-60" aria-label={t.send}>
              <Send size={16} aria-hidden="true" />
              <span className="sr-only">{isLoading ? t.loading : t.send}</span>
            </button>
          </form>
          {error ? <p className="mb-0 mt-2 text-sm text-[#8B2C24]" role="alert">{error}</p> : null}
        </section>
      ) : null}

      <button ref={triggerRef} type="button" onClick={toggleWidget} className="relative inline-flex min-h-12 items-center gap-2 border border-signal bg-signal px-4 py-3 text-sm font-medium text-white hover:bg-signal-hover" aria-label={t.bubbleLabel} aria-expanded={isOpen} aria-controls="ai-assistant-panel" aria-haspopup="dialog">
        <MessageCircle size={18} aria-hidden="true" />
        <span className="widget-label">{t.bubbleLabel}</span>
        {hasNotification ? <span className="absolute -top-3 right-0 border border-signal bg-ground px-1.5 font-mono text-[9px] uppercase text-signal">{t.newLabel}</span> : null}
      </button>
    </div>
  );
}
