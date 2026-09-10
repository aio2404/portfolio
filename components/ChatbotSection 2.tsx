'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { Language } from '@/data/portfolioData';

type Role = 'user' | 'assistant';

type ChatMessage = {
  id: string;
  role: Role;
  content: string;
};

type ChatbotSectionProps = {
  lang: Language;
};

const copyByLang = {
  en: {
    title: 'AI Assistant',
    placeholder: 'Tell me about your project...',
    bubbleLabel: 'AI Assistant',
    send: 'Send',
    loading: 'Thinking...',
    error: 'No answer returned. Try again in a moment.',
    fallback: 'I can answer only about the profile, skills, projects, process and services.',
    welcome: "Hi 👋 Tell me about your project or need — I'll tell you right away if my profile is the right fit.",
  },
  fr: {
    title: 'Assistant IA',
    placeholder: 'Décris-moi ton projet...',
    bubbleLabel: 'Assistant IA',
    send: 'Envoyer',
    loading: 'Réflexion...',
    error: 'Aucune réponse pour le moment. Réessayez dans un instant.',
    fallback: "Je peux répondre uniquement sur le profil, les compétences, les projets, la méthode et les prestations.",
    welcome: "Bonjour 👋 Décris-moi ton besoin ou ton projet — je te dis tout de suite si mon profil correspond.",
  },
};

const starterQuestions = {
  en: [
    'What type of projects do you do?',
    'Can you build n8n automations?',
    'Are you available for freelance?',
  ],
  fr: [
    'Quel type de projets fais-tu ?',
    'Tu fais des automatisations n8n ?',
    'Tu es disponible en freelance ?',
  ],
};

export default function ChatbotSection({ lang }: ChatbotSectionProps) {
  const t = copyByLang[lang];
  const starters = useMemo(() => starterQuestions[lang], [lang]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotif, setHasNotif] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-open on first visit
  useEffect(() => {
    const key = 'portfolio-chat-welcomed';
    const already = localStorage.getItem(key);
    if (already) return;

    // Show notification dot after 2s, open after 5s
    const notifTimer = setTimeout(() => setHasNotif(true), 2000);
    const openTimer = setTimeout(() => {
      setIsOpen(true);
      setHasNotif(false);
      localStorage.setItem(key, '1');
    }, 5000);

    return () => {
      clearTimeout(notifTimer);
      clearTimeout(openTimer);
    };
  }, []);

  // Set welcome message when opened for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ id: 'welcome', role: 'assistant', content: t.welcome }]);
    }
  }, [isOpen, messages.length, t.welcome]);

  // Reset on language change
  useEffect(() => {
    setMessages([]);
  }, [lang]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInput = question.trim();
    if (!userInput || isLoading) return;

    const userMessage: ChatMessage = { id: `${Date.now()}-user`, role: 'user', content: userInput };
    setMessages((prev) => [...prev, userMessage]);
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
      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-assistant`, role: 'assistant', content: typeof answer === 'string' ? answer : JSON.stringify(answer) },
      ]);
    } catch (chatError) {
      setError(chatError instanceof Error ? chatError.message : t.error);
    } finally {
      setIsLoading(false);
    }
  };

  const onStarterClick = (value: string) => {
    setQuestion(value);
  };

  const toggleWidget = () => {
    setIsOpen((v) => !v);
    setHasNotif(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[999] flex flex-col items-end gap-3">
      {isOpen && (
        <section className="w-[92vw] max-w-[24rem] rounded-2xl border border-accent-2/30 bg-white/65 p-4 shadow-xl shadow-accent-2/20 backdrop-blur-xl">
          {/* Header */}
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[#3a1f3c]">
              <MessageCircle size={18} />
              <h3 className="font-display text-base font-semibold">{t.title}</h3>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full border border-accent-2/30 p-1 text-[#60355b] transition hover:bg-accent-1/20"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="max-h-[46vh] space-y-2 overflow-y-auto rounded-xl bg-white/70 p-3 text-sm">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-xl px-3 py-2 ${
                  message.role === 'assistant'
                    ? 'bg-accent-1/20 border border-accent-2/25'
                    : 'bg-white border border-[#e9d8ef]'
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-[#8f5b8b]">
                  {message.role === 'assistant' ? 'AlexOps' : lang === 'fr' ? 'Vous' : 'You'}
                </p>
                <p className="mt-1 text-[#4b2f58]">{message.content}</p>
              </div>
            ))}
            {isLoading && (
              <div className="rounded-xl border border-accent-2/25 bg-accent-1/20 px-3 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#8f5b8b]">AlexOps</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Starters */}
          <div className="mt-3 flex flex-wrap gap-2">
            {starters.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => onStarterClick(value)}
                className="rounded-full border border-accent-2/30 px-3 py-1.5 text-xs text-[#5f3565] transition hover:border-accent-2 hover:bg-accent-1/12"
              >
                {value}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={onSubmit} className="mt-3">
            <div className="flex gap-2">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={t.placeholder}
                className="min-h-11 flex-1 rounded-full border border-[#e7c9e4] bg-white px-4 text-sm text-[#4a2b4f] outline-none placeholder:text-[#9d77a1]"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-full bg-accent-1 px-4 text-sm font-semibold text-[#391531] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={16} />
                {isLoading ? t.loading : t.send}
              </button>
            </div>
          </form>

          {error && <p className="mt-2 text-sm text-[#92334d]">{error}</p>}
        </section>
      )}

      {/* Bubble */}
      <button
        type="button"
        onClick={toggleWidget}
        className="group relative inline-flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-accent-2/55 bg-gradient-to-r from-accent-1 to-accent-3 text-[#3c193f] shadow-2xl shadow-accent-2/35 transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-2/80"
        aria-label="Open chat assistant"
        aria-expanded={isOpen}
      >
        <MessageCircle size={33} />
        <span className="pointer-events-none absolute -top-2 -left-2 rounded-full bg-[#4f2f57] px-2 py-0.5 text-[10px] font-semibold text-white shadow-lg">
          {t.bubbleLabel}
        </span>
        {/* Notification dot */}
        {hasNotif && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-2 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-accent-2" />
          </span>
        )}
      </button>
    </div>
  );
}
