'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
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
    title: 'Ask my AI assistant',
    subtitle: 'Ask questions about my profile, projects, stack, or delivery approach.',
    placeholder: "Ask me about my background, skills, or how I build automation.",
    bubbleLabel: 'AI Assistant',
    send: 'Ask',
    loading: 'Thinking...',
    error: "No answer returned for now. Try again in a moment.",
    fallback: "I can answer only about the profile, skills, projects, process and services.",
    empty: 'Type a question to get started.',
  },
  fr: {
    title: 'Posez une question à mon assistant IA',
    subtitle: 'Posez des questions sur mon profil, mes projets, ma stack ou ma méthode.',
    placeholder: 'Parlez-moi de mon parcours, de mes compétences ou de mon approche.',
    bubbleLabel: 'Assistant IA',
    send: 'Envoyer',
    loading: 'Réflexion en cours...',
    error: "Aucune réponse pour le moment. Réessayez dans un instant.",
    fallback: "Je peux répondre uniquement sur le profil, les compétences, les projets, la méthode et les prestations.",
    empty: 'Écrivez une question pour commencer.',
  },
};

const starterQuestions = {
  en: [
    'What type of projects do you specialize in?',
    'How do you structure a CI/CD migration?',
    'What automation workflows do you build with n8n?',
  ],
  fr: [
    'Sur quel type de projets vous spécialisez-vous ?',
    'Comment structurez-vous une migration CI/CD ?',
    "Quels automatisations réalises-tu avec n8n ?",
  ],
};

export default function ChatbotSection({ lang }: ChatbotSectionProps) {
  const t = copyByLang[lang];
  const starters = useMemo(() => starterQuestions[lang], [lang]);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: `${Date.now()}-system`, role: 'assistant', content: t.subtitle },
  ]);

  useEffect(() => {
    setMessages([{ id: `${Date.now()}-system`, role: 'assistant', content: t.subtitle }]);
  }, [lang, t.subtitle]);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInput = question.trim();
    if (!userInput || isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: userInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion('');
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          language: lang,
          message: userInput,
          source: 'portfolio',
        }),
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload) {
        throw new Error(payload?.error || t.error);
      }

      const answer =
        payload.answer ||
        payload.response ||
        payload.message ||
        payload.raw ||
        t.fallback;

      const botMessage: ChatMessage = {
        id: `${Date.now()}-assistant`,
        role: 'assistant',
        content: typeof answer === 'string' ? answer : JSON.stringify(answer),
      };

      setMessages((prev) => [...prev, botMessage]);
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
    setIsOpen((value) => !value);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[999] flex flex-col items-end gap-3">
      {isOpen ? (
        <section className="w-[92vw] max-w-[24rem] rounded-2xl border border-accent-2/30 bg-white/65 p-4 shadow-xl shadow-accent-2/20 backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between gap-2 text-[#4a2b4f]">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} />
              <h3 className="font-display text-lg font-semibold text-[#3a1f3c]">{t.title}</h3>
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
          <p className="text-sm text-[#6e4570]">{t.subtitle}</p>

          <div className="mt-3 max-h-[46vh] space-y-2 overflow-y-auto rounded-xl bg-white/70 p-3 text-sm">
            {messages.length === 0 ? <p className="text-[#7d5980]">{t.empty}</p> : null}
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
                  {message.role === 'assistant' ? 'ALexOps' : lang === 'fr' ? 'Vous' : 'You'}
                </p>
                <p className="mt-1 text-[#4b2f58]">{message.content}</p>
              </div>
            ))}
            {isLoading && (
              <div className="rounded-xl border border-accent-2/25 bg-accent-1/20 px-3 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#8f5b8b]">ALexOps</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
          </div>

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

          <form onSubmit={onSubmit} className="mt-3">
            <label htmlFor="chat-message" className="sr-only">
              {t.placeholder}
            </label>
            <div className="flex gap-2">
              <input
                id="chat-message"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
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

          {error ? <p className="mt-2 text-sm text-[#92334d]">{error}</p> : null}
        </section>
      ) : null}

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
      </button>
    </div>
  );
}
