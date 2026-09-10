'use client';

import { FormEvent, useId, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Language } from '@/data/portfolioData';

type ContactFormProps = { ctaContact: string; lang: Language };
type SubmissionState = { status: 'idle' | 'sending' | 'success' | 'error'; message: string };

const copy = {
  en: {
    name: 'Full name',
    email: 'Email address',
    message: 'Project or message',
    sending: 'Sending…',
    success: 'Thank you, your message has been sent.',
    error: 'Error sending message.',
  },
  fr: {
    name: 'Nom complet',
    email: 'Adresse email',
    message: 'Projet ou message',
    sending: 'Envoi…',
    success: 'Merci, votre message a bien été envoyé.',
    error: 'Erreur d’envoi du message.',
  },
};

export default function ContactForm({ ctaContact, lang }: ContactFormProps) {
  const t = copy[lang];
  const fieldId = useId();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = useState<SubmissionState>({ status: 'idle', message: '' });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ status: 'sending', message: '' });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ type: 'contact', name, email, message, source: 'portfolio', language: lang }),
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message || payload?.error || t.error);
      }
      setState({ status: 'success', message: t.success });
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setState({ status: 'error', message: error instanceof Error ? error.message : t.error });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
      <div>
        <label htmlFor={`${fieldId}-name`} className="spec-label mb-2 block">{t.name}</label>
        <input id={`${fieldId}-name`} name="name" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} className="field" />
      </div>
      <div>
        <label htmlFor={`${fieldId}-email`} className="spec-label mb-2 block">{t.email}</label>
        <input id={`${fieldId}-email`} name="email" autoComplete="email" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="field" />
      </div>
      <div className="md:col-span-2">
        <label htmlFor={`${fieldId}-message`} className="spec-label mb-2 block">{t.message}</label>
        <textarea id={`${fieldId}-message`} name="message" required rows={5} value={message} onChange={(event) => setMessage(event.target.value)} className="field resize-y" />
      </div>
      <button type="submit" disabled={state.status === 'sending'} className="button-primary w-fit disabled:cursor-not-allowed disabled:opacity-60">
        {state.status === 'sending' ? t.sending : ctaContact}
        <ArrowRight size={16} aria-hidden="true" />
      </button>
      <p aria-live="polite" className={`mb-0 min-h-6 text-sm md:col-span-2 ${state.status === 'error' ? 'text-[#8B2C24]' : 'text-signal'}`}>
        {state.message}
      </p>
    </form>
  );
}
