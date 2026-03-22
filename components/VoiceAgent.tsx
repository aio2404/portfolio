'use client';

import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, PhoneOff } from 'lucide-react';
import Vapi from '@vapi-ai/web';
import { Language } from '@/data/portfolioData';

type VoiceAgentProps = {
  lang: Language;
};

type CallStatus = 'idle' | 'connecting' | 'active';

const copy = {
  en: {
    bubbleLabel: 'Voice AI',
    connecting: 'Connecting...',
    active: 'Listening...',
    mute: 'Mute',
    unmute: 'Unmute',
    end: 'End',
    ariaStart: 'Start voice conversation',
    ariaEnd: 'End voice call',
  },
  fr: {
    bubbleLabel: 'Voix IA',
    connecting: 'Connexion...',
    active: 'En écoute...',
    mute: 'Couper',
    unmute: 'Activer',
    end: 'Terminer',
    ariaStart: 'Démarrer la conversation vocale',
    ariaEnd: 'Terminer l\'appel vocal',
  },
};

export default function VoiceAgent({ lang }: VoiceAgentProps) {
  const vapiRef = useRef<InstanceType<typeof Vapi> | null>(null);
  const t = copy[lang];
  const [status, setStatus] = useState<CallStatus>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    setIsConfigured(!!publicKey);
    if (!publicKey) return;

    vapiRef.current = new Vapi(publicKey);
    const vapi = vapiRef.current;

    vapi.on('call-start', () => setStatus('active'));
    vapi.on('call-end', () => { setStatus('idle'); setIsMuted(false); setVolumeLevel(0); });
    vapi.on('error', () => { setStatus('idle'); setIsMuted(false); });
    vapi.on('volume-level', (level: number) => setVolumeLevel(level));

    return () => { vapi.stop(); };
  }, []);

  const startCall = () => {
    if (!vapiRef.current) return;
    setStatus('connecting');
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
    if (!assistantId) return;

    const overrides = {
      transcriber: {
        provider: 'deepgram' as const,
        model: 'nova-2',
        language: (lang === 'fr' ? 'fr' : 'en-US') as 'fr' | 'en-US',
      },
      model: {
        provider: 'openai' as const,
        model: 'gpt-4o-mini' as const,
        messages: [
          {
            role: 'system' as const,
            content: lang === 'fr'
              ? `Tu es ALexOps, l'assistant vocal IA d'un portfolio DevOps et automatisation IA. Réponds en français, de façon concise — 2 à 3 phrases max, c'est une conversation vocale. Réponds uniquement sur : DevOps, CI/CD, automatisation IA, n8n, Kubernetes, Azure, Terraform, Python, TypeScript, projets et prestations. Si la question sort du sujet, redirige poliment.`
              : `You are ALexOps, a voice AI assistant for a DevOps and AI automation portfolio. Keep answers short — 2 to 3 sentences max, this is a voice conversation. Only answer about: DevOps, CI/CD, AI automation, n8n, Kubernetes, Azure, Terraform, Python, TypeScript, projects and services. If asked something unrelated, politely redirect to the profile.`,
          },
        ],
      },
      firstMessage: lang === 'fr'
        ? 'Bonjour, je suis ALexOps. Posez-moi vos questions sur le profil, les projets ou la stack.'
        : "Hi, I'm ALexOps. Ask me anything about the profile, projects or stack.",
    };

    vapiRef.current.start(assistantId, overrides);
  };

  const endCall = () => {
    vapiRef.current?.stop();
    setStatus('idle');
  };

  const toggleMute = () => {
    if (!vapiRef.current) return;
    const next = !isMuted;
    vapiRef.current.setMuted(next);
    setIsMuted(next);
  };

  if (!isConfigured) return null;

  return (
    <div className="fixed bottom-5 left-5 z-[999] flex flex-col items-start gap-2">

      {/* Controls panel — visible only during call */}
      {status === 'active' && (
        <div className="flex items-center gap-2 rounded-full border border-accent-2/30 bg-white/80 px-3 py-2 shadow-lg shadow-accent-2/15 backdrop-blur-xl">
          <button
            type="button"
            onClick={toggleMute}
            className="inline-flex items-center gap-1.5 rounded-full border border-accent-2/30 px-3 py-1.5 text-xs text-[#5d3f62] transition hover:border-accent-2"
            aria-label={isMuted ? t.unmute : t.mute}
          >
            {isMuted ? <MicOff size={13} /> : <Mic size={13} />}
            {isMuted ? t.unmute : t.mute}
          </button>
          <button
            type="button"
            onClick={endCall}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#7d2f43]/10 border border-[#7d2f43]/25 px-3 py-1.5 text-xs text-[#7d2f43] transition hover:bg-[#7d2f43]/20"
            aria-label={t.ariaEnd}
          >
            <PhoneOff size={13} />
            {t.end}
          </button>
        </div>
      )}

      {/* Connecting label */}
      {status === 'connecting' && (
        <div className="flex items-center gap-2 rounded-full border border-accent-2/25 bg-white/80 px-4 py-2 text-xs text-[#5f3565] shadow-md backdrop-blur-xl">
          <div className="flex items-center gap-1">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </div>
          {t.connecting}
        </div>
      )}

      {/* Main bubble */}
      <button
        type="button"
        onClick={status === 'idle' ? startCall : undefined}
        disabled={status === 'connecting'}
        className="group relative inline-flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-accent-2/55 bg-gradient-to-r from-accent-1 to-accent-3 text-[#3c193f] shadow-2xl shadow-accent-2/35 transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-2/80 disabled:cursor-not-allowed disabled:opacity-70"
        aria-label={status === 'idle' ? t.ariaStart : t.ariaEnd}
      >
        {/* Volume ring when active */}
        {status === 'active' && (
          <span
            className="absolute inset-0 rounded-full border-2 border-green-400/60 transition-all"
            style={{ transform: `scale(${1 + volumeLevel * 0.25})`, opacity: 0.4 + volumeLevel * 0.6 }}
          />
        )}

        <Mic size={33} className={status === 'active' ? 'text-green-700' : ''} />

        <span className="pointer-events-none absolute -top-2 -left-2 rounded-full bg-[#4f2f57] px-2 py-0.5 text-[10px] font-semibold text-white shadow-lg">
          {t.bubbleLabel}
        </span>
      </button>
    </div>
  );
}
