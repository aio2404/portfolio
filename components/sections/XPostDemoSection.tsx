'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import SectionShell from '@/components/ui/SectionShell';
import { Language } from '@/data/portfolioData';

const MAX_CHARS = 280;

const copy = {
  en: {
    eyebrow: 'Live workflow demo',
    title: 'Watch an n8n workflow run in real time',
    description:
      'Type a post below and hit Send — an n8n workflow receives it, checks it with AI, and publishes it to X. Every step visible live.',
    placeholder: 'Write something to post on X (Twitter)...',
    sendLabel: 'Post to X via n8n',
    sending: 'Workflow running...',
    disclaimer: 'This posts for real on X. Keep it professional.',
    remaining: 'characters left',
    steps: [
      { id: 'webhook', label: 'Webhook received by n8n' },
      { id: 'ai', label: 'Content checked by AI' },
      { id: 'format', label: 'Post formatted for X' },
      { id: 'post', label: 'Published to X' },
    ],
    successLabel: 'Posted! View on X →',
    errorLabel: 'Workflow error — try again.',
    n8nLabel: 'Self-hosted n8n',
    n8nSub: 'Workflow running on my own n8n instance',
    notConfigured: 'Demo not configured yet — come back soon.',
  },
  fr: {
    eyebrow: 'Démo workflow live',
    title: 'Regardez un workflow n8n tourner en temps réel',
    description:
      "Tapez un message et cliquez sur Envoyer — un workflow n8n le reçoit, le vérifie avec l'IA et le publie sur X. Chaque étape visible en direct.",
    placeholder: 'Écrivez quelque chose à publier sur X (Twitter)...',
    sendLabel: 'Publier sur X via n8n',
    sending: 'Workflow en cours...',
    disclaimer: 'Ceci publie vraiment sur X. Restez professionnel.',
    remaining: 'caractères restants',
    steps: [
      { id: 'webhook', label: 'Webhook reçu par n8n' },
      { id: 'ai', label: "Contenu vérifié par l'IA" },
      { id: 'format', label: 'Post formaté pour X' },
      { id: 'post', label: 'Publié sur X' },
    ],
    successLabel: 'Publié ! Voir sur X →',
    errorLabel: 'Erreur workflow — réessayez.',
    n8nLabel: 'n8n auto-hébergé',
    n8nSub: 'Workflow exécuté sur mon instance n8n',
    notConfigured: 'Démo pas encore configurée — revenez bientôt.',
  },
};

type StepStatus = 'idle' | 'active' | 'done' | 'error';
type DemoStatus = 'idle' | 'running' | 'success' | 'error' | 'unconfigured';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function XPostDemoSection({ lang }: { lang: Language }) {
  const t = copy[lang];
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<DemoStatus>('idle');
  const [steps, setSteps] = useState<Record<string, StepStatus>>({
    webhook: 'idle',
    ai: 'idle',
    format: 'idle',
    post: 'idle',
  });
  const [tweetUrl, setTweetUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const setStep = (id: string, s: StepStatus) =>
    setSteps((prev) => ({ ...prev, [id]: s }));

  const runDemo = async () => {
    if (!content.trim() || status === 'running') return;

    setStatus('running');
    setSteps({ webhook: 'idle', ai: 'idle', format: 'idle', post: 'idle' });
    setTweetUrl('');
    setErrorMsg('');

    // Fire API call immediately, animate steps in parallel
    const apiPromise = fetch('/api/demo-post', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ content, language: lang }),
    })
      .then((r) => r.json())
      .catch(() => ({ error: 'Network error' }));

    // Animate steps
    setStep('webhook', 'active');
    await sleep(700);
    setStep('webhook', 'done');
    setStep('ai', 'active');
    await sleep(1300);
    setStep('ai', 'done');
    setStep('format', 'active');
    await sleep(700);
    setStep('format', 'done');
    setStep('post', 'active');

    const result = await apiPromise;
    await sleep(400);

    if (result.unconfigured) {
      setSteps({ webhook: 'idle', ai: 'idle', format: 'idle', post: 'idle' });
      setStatus('unconfigured');
    } else if (result.error) {
      setStep('post', 'error');
      setErrorMsg(result.error);
      setStatus('error');
    } else {
      setStep('post', 'done');
      setTweetUrl(result.url || '');
      setStatus('success');
    }
  };

  const remaining = MAX_CHARS - content.length;

  return (
    <SectionShell
      id="x-demo"
      eyebrow={t.eyebrow}
      title={t.title}
      description={t.description}
      index={5}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">

        {/* ── Left: input + button ── */}
        <div className="surface-card flex flex-col gap-4 p-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, MAX_CHARS))}
            placeholder={t.placeholder}
            rows={5}
            disabled={status === 'running'}
            className="w-full resize-none rounded-xl border border-[#e7c9e4] bg-white/70 p-4 text-sm text-[#4a2b4f] outline-none placeholder:text-[#9d77a1] focus:border-accent-2 disabled:opacity-60"
          />

          <div className="flex items-center justify-between text-xs">
            <span className="italic text-[#b099b0]">{t.disclaimer}</span>
            <span className={remaining < 30 ? 'font-semibold text-red-400' : 'text-[#b099b0]'}>
              {remaining} {t.remaining}
            </span>
          </div>

          <button
            type="button"
            onClick={runDemo}
            disabled={!content.trim() || status === 'running' || remaining < 0}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-1 to-accent-3 px-6 py-3 text-sm font-semibold text-[#391531] shadow-lg shadow-accent-2/25 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === 'running' ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                {t.sending}
              </>
            ) : (
              <>
                <Send size={15} />
                {t.sendLabel}
              </>
            )}
          </button>

          {/* Result feedback */}
          {status === 'success' && (
            <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              <CheckCircle2 size={15} />
              {tweetUrl ? (
                <a href={tweetUrl} target="_blank" rel="noopener noreferrer" className="underline">
                  {t.successLabel}
                </a>
              ) : (
                t.successLabel.replace(' →', '')
              )}
            </div>
          )}
          {(status === 'error') && (
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle size={15} />
              {errorMsg || t.errorLabel}
            </div>
          )}
          {status === 'unconfigured' && (
            <div className="flex items-center gap-2 rounded-xl border border-accent-1/30 bg-accent-1/8 px-4 py-3 text-sm text-[#7a4f7a]">
              <AlertCircle size={15} />
              {t.notConfigured}
            </div>
          )}
        </div>

        {/* ── Right: workflow visualization ── */}
        <div className="surface-card flex flex-col gap-5 p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-accent-2/80">
            {lang === 'fr' ? 'Workflow n8n en direct' : 'Live n8n workflow'}
          </p>

          <div className="flex flex-col gap-1">
            {t.steps.map((step, i) => {
              const s = steps[step.id];
              return (
                <div key={step.id} className="relative flex items-center gap-3 py-2">
                  {/* vertical connector */}
                  {i < t.steps.length - 1 && (
                    <div
                      className={`absolute left-[11px] top-8 h-[calc(100%-4px)] w-0.5 transition-colors duration-500 ${
                        s === 'done' ? 'bg-accent-2/60' : 'bg-accent-1/20'
                      }`}
                    />
                  )}

                  {/* circle */}
                  <div
                    className={`relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                      s === 'done'
                        ? 'border-accent-2 bg-accent-2/15'
                        : s === 'active'
                        ? 'border-accent-2 bg-white'
                        : s === 'error'
                        ? 'border-red-400 bg-red-50'
                        : 'border-accent-1/30 bg-white'
                    }`}
                  >
                    {s === 'done' && <CheckCircle2 size={12} className="text-accent-2" />}
                    {s === 'active' && (
                      <span className="h-2 w-2 animate-ping rounded-full bg-accent-2" />
                    )}
                    {s === 'error' && <AlertCircle size={12} className="text-red-400" />}
                    {s === 'idle' && (
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-1/25" />
                    )}
                  </div>

                  {/* label */}
                  <span
                    className={`text-sm transition-colors duration-300 ${
                      s === 'done'
                        ? 'font-medium text-[#4f245d]'
                        : s === 'active'
                        ? 'font-semibold text-accent-2'
                        : s === 'error'
                        ? 'text-red-500'
                        : 'text-[#b099b0]'
                    }`}
                  >
                    {step.label}
                  </span>

                  <span className="ml-auto text-[10px] tabular-nums text-[#d4b8d4]">
                    0{i + 1}
                  </span>
                </div>
              );
            })}
          </div>

          {/* n8n badge */}
          <div className="mt-auto flex items-center gap-3 rounded-xl border border-accent-1/20 bg-accent-1/5 p-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#ea4b71]/10">
              <span className="text-xs font-bold text-[#ea4b71]">n8n</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#4f245d]">{t.n8nLabel}</p>
              <p className="text-[10px] text-[#b099b0]">{t.n8nSub}</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              <span className="text-[10px] text-green-600">online</span>
            </div>
          </div>
        </div>

      </div>
    </SectionShell>
  );
}
