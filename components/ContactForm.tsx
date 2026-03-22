"use client";

import { FormEvent, useState } from 'react';
import { Language } from '@/data/portfolioData';

type ContactFormProps = {
  ctaContact: string;
  lang: Language;
};

type SubmissionState = {
  status: 'idle' | 'sending' | 'success' | 'error';
  message: string;
};

const copy = {
  en: {
    namePlaceholder: 'Full name',
    emailPlaceholder: 'Email address',
    messagePlaceholder: 'Your message',
    sending: 'Sending...',
    success: 'Thank you, your message has been sent.',
    error: 'Error sending message.',
  },
  fr: {
    namePlaceholder: 'Nom complet',
    emailPlaceholder: 'Adresse email',
    messagePlaceholder: 'Votre message',
    sending: 'Envoi...',
    success: 'Merci, votre message a bien été envoyé.',
    error: 'Erreur d\u2019envoi du message.',
  },
};

export default function ContactForm({ ctaContact, lang }: ContactFormProps) {
  const t = copy[lang];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = useState<SubmissionState>({ status: 'idle', message: '' });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ status: 'sending', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          name,
          email,
          message,
          source: 'portfolio',
          language: lang,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const errorMessage =
          (data && (data.message || data.error)) || t.error;
        throw new Error(errorMessage);
      }

      setState({ status: 'success', message: t.success });
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setState({
        status: 'error',
        message: error instanceof Error ? error.message : t.error,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <input
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder={t.namePlaceholder}
        className="rounded-lg border border-[#e3b8d3] bg-white/65 px-4 py-2 text-sm text-[#4f2e53] outline-none transition focus:border-accent-2"
      />
      <input
        required
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={t.emailPlaceholder}
        className="rounded-lg border border-[#e3b8d3] bg-white/65 px-4 py-2 text-sm text-[#4f2e53] outline-none transition focus:border-accent-2"
      />
      <textarea
        required
        rows={4}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder={t.messagePlaceholder}
        className="rounded-lg border border-[#e3b8d3] bg-white/65 px-4 py-2 text-sm text-[#4f2e53] outline-none transition focus:border-accent-2"
      />
      <button
        type="submit"
        disabled={state.status === 'sending'}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-accent-2/45 bg-gradient-to-r from-accent-1 to-accent-3 px-5 py-2 text-sm font-semibold text-[#37112f] transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.status === 'sending' ? t.sending : ctaContact}
      </button>

      {state.message ? (
        <p
          className={`text-sm ${
            state.status === 'success' ? 'text-[#2f6f46]' : 'text-[#7d2f43]'
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
