'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, PhoneOff } from 'lucide-react';
import Vapi from '@vapi-ai/web';
import { Language } from '@/data/portfolioData';

type VoiceAgentProps = { lang: Language };
type CallStatus = 'idle' | 'connecting' | 'active';

const copy = {
  en: {
    bubbleLabel: 'Voice AI', connecting: 'Connecting…', active: 'Listening', mute: 'Mute', unmute: 'Unmute', end: 'End', ariaStart: 'Start voice conversation', ariaEnd: 'End voice call',
  },
  fr: {
    bubbleLabel: 'Voix IA', connecting: 'Connexion…', active: 'En écoute', mute: 'Couper', unmute: 'Activer', end: 'Terminer', ariaStart: 'Démarrer la conversation vocale', ariaEnd: 'Terminer l’appel vocal',
  },
};

export default function VoiceAgent({ lang }: VoiceAgentProps) {
  const vapiRef = useRef<InstanceType<typeof Vapi> | null>(null);
  const t = copy[lang];
  const [status, setStatus] = useState<CallStatus>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    setIsConfigured(Boolean(publicKey));
    if (!publicKey) return;
    const vapi = new Vapi(publicKey);
    vapiRef.current = vapi;
    vapi.on('call-start', () => setStatus('active'));
    vapi.on('call-end', () => { setStatus('idle'); setIsMuted(false); });
    vapi.on('error', () => { setStatus('idle'); setIsMuted(false); });
    return () => { vapi.stop(); };
  }, []);

  const startCall = () => {
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
    if (!vapiRef.current || !assistantId) return;
    setStatus('connecting');
    vapiRef.current.start(assistantId, {
      transcriber: { provider: 'deepgram' as const, model: 'nova-2', language: (lang === 'fr' ? 'fr' : 'en-US') as 'fr' | 'en-US' },
      model: {
        provider: 'openai' as const,
        model: 'gpt-4o-mini' as const,
        messages: [{
          role: 'system' as const,
          content: lang === 'fr'
            ? 'Tu es l’assistant vocal du portfolio AlexOps. Réponds en français, en 2 à 3 phrases, uniquement sur le profil, les compétences, les projets et les prestations présentés.'
            : 'You are the AlexOps portfolio voice assistant. Answer in 2 to 3 sentences, only about the profile, skills, projects and services presented.',
        }],
      },
      firstMessage: lang === 'fr' ? 'Bonjour. Posez-moi une question sur le profil ou les projets.' : 'Hi. Ask me a question about the profile or projects.',
    });
  };

  const endCall = () => { vapiRef.current?.stop(); setStatus('idle'); };
  const toggleMute = () => {
    if (!vapiRef.current) return;
    const next = !isMuted;
    vapiRef.current.setMuted(next);
    setIsMuted(next);
  };

  if (!isConfigured) return null;

  return (
    <div className="fixed bottom-3 left-3 z-[60] flex max-w-[calc(100vw-1.5rem)] flex-col items-start gap-2 sm:bottom-5 sm:left-5 sm:max-w-[calc(100vw-2.5rem)]">
      {status === 'active' ? (
        <div className="flex items-center gap-2 border border-line-interactive bg-ground p-2">
          <span className="availability-badge px-2">{t.active}</span>
          <button type="button" onClick={toggleMute} className="inline-flex min-h-11 items-center gap-2 border border-line-interactive px-3 text-xs text-ink-secondary hover:border-signal hover:text-signal" aria-label={isMuted ? t.unmute : t.mute}>
            {isMuted ? <MicOff size={14} aria-hidden="true" /> : <Mic size={14} aria-hidden="true" />}{isMuted ? t.unmute : t.mute}
          </button>
          <button type="button" onClick={endCall} className="inline-flex min-h-11 items-center gap-2 border border-[#8B2C24] px-3 text-xs text-[#8B2C24]" aria-label={t.ariaEnd}>
            <PhoneOff size={14} aria-hidden="true" />{t.end}
          </button>
        </div>
      ) : null}
      {status !== 'active' ? (
        <button type="button" onClick={startCall} disabled={status === 'connecting'} className="inline-flex min-h-12 items-center gap-2 border border-line-interactive bg-ground px-4 py-3 text-sm font-medium text-ink hover:border-signal hover:text-signal disabled:cursor-wait disabled:opacity-70" aria-label={status === 'connecting' ? t.connecting : t.ariaStart}>
          <Mic size={18} aria-hidden="true" />
          <span className="widget-label">{status === 'connecting' ? t.connecting : t.bubbleLabel}</span>
        </button>
      ) : null}
    </div>
  );
}
