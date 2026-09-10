'use client';

import { useState } from 'react';
import { AlertCircle, Check, CheckCircle2, Circle, Loader2, Send } from 'lucide-react';
import SectionShell from '@/components/ui/SectionShell';
import { Language } from '@/data/portfolioData';

const MAX_CHARS = 280;

const copy = {
  en: {
    eyebrow: 'Live workflow demo',
    title: 'Watch an n8n workflow run in real time',
    description: 'Type a post below and send it through the configured n8n workflow. Every processing step is reflected in the interface.',
    placeholder: 'Write something to post on X…',
    inputLabel: 'Post content',
    sendLabel: 'Post to X via n8n',
    sending: 'Workflow running…',
    disclaimer: 'This action can publish a real post on X. Review the text before sending.',
    remaining: 'characters left',
    steps: [
      { id: 'webhook', label: 'Webhook received by n8n' },
      { id: 'ai', label: 'Content checked by AI' },
      { id: 'format', label: 'Post formatted for X' },
      { id: 'post', label: 'Publication response received' },
    ],
    successLabel: 'Posted. View on X',
    errorLabel: 'Workflow error — try again.',
    n8nLabel: 'n8n workflow',
    n8nSub: 'Execution status is shown above as it changes',
    notConfigured: 'The publishing workflow is not configured.',
    workflow: 'Workflow execution',
  },
  fr: {
    eyebrow: 'Démo workflow live',
    title: 'Observez un workflow n8n en temps réel',
    description: 'Rédigez un post et envoyez-le au workflow n8n configuré. Chaque étape de traitement est reflétée dans l’interface.',
    placeholder: 'Écrivez quelque chose à publier sur X…',
    inputLabel: 'Contenu du post',
    sendLabel: 'Publier sur X via n8n',
    sending: 'Workflow en cours…',
    disclaimer: 'Cette action peut publier un vrai post sur X. Relisez le texte avant l’envoi.',
    remaining: 'caractères restants',
    steps: [
      { id: 'webhook', label: 'Webhook reçu par n8n' },
      { id: 'ai', label: 'Contenu vérifié par l’IA' },
      { id: 'format', label: 'Post formaté pour X' },
      { id: 'post', label: 'Réponse de publication reçue' },
    ],
    successLabel: 'Publié. Voir sur X',
    errorLabel: 'Erreur du workflow — réessayez.',
    n8nLabel: 'Workflow n8n',
    n8nSub: 'L’état d’exécution est affiché ci-dessus',
    notConfigured: 'Le workflow de publication n’est pas configuré.',
    workflow: 'Exécution du workflow',
  },
};

type StepStatus = 'idle' | 'active' | 'done' | 'error';
type DemoStatus = 'idle' | 'running' | 'success' | 'error' | 'unconfigured';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function XPostDemoSection({ lang }: { lang: Language }) {
  const t = copy[lang];
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<DemoStatus>('idle');
  const [steps, setSteps] = useState<Record<string, StepStatus>>({ webhook: 'idle', ai: 'idle', format: 'idle', post: 'idle' });
  const [tweetUrl, setTweetUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const setStep = (id: string, nextStatus: StepStatus) => {
    setSteps((previous) => ({ ...previous, [id]: nextStatus }));
  };

  const runDemo = async () => {
    if (!content.trim() || status === 'running') return;
    setStatus('running');
    setSteps({ webhook: 'idle', ai: 'idle', format: 'idle', post: 'idle' });
    setTweetUrl('');
    setErrorMsg('');

    const apiPromise = fetch('/api/demo-post', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ content, language: lang }),
    }).then((response) => response.json()).catch(() => ({ error: 'Network error' }));

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
    <SectionShell id="x-demo" eyebrow={t.eyebrow} title={t.title} description={t.description} index={1} label="n8n / X API" tone="subtle">
      <div className="grid gap-6 xl:grid-cols-[minmax(320px,0.78fr)_minmax(520px,1.22fr)]">
        <div className="system-card flex flex-col gap-4 p-6">
          <label htmlFor="x-post-content" className="spec-label">{t.inputLabel}</label>
          <textarea
            id="x-post-content"
            value={content}
            onChange={(event) => setContent(event.target.value.slice(0, MAX_CHARS))}
            placeholder={t.placeholder}
            rows={6}
            disabled={status === 'running'}
            className="field resize-none disabled:opacity-60"
          />
          <div className="grid gap-2 text-xs text-ink-tertiary sm:grid-cols-[1fr_auto]">
            <span className="flex items-start gap-2"><AlertCircle size={14} className="mt-0.5 shrink-0" aria-hidden="true" />{t.disclaimer}</span>
            <span className={remaining < 30 ? 'font-medium text-[#8B2C24]' : ''}>{remaining} {t.remaining}</span>
          </div>
          <button type="button" onClick={runDemo} disabled={!content.trim() || status === 'running' || remaining < 0} className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-50">
            {status === 'running' ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Send size={16} aria-hidden="true" />}
            {status === 'running' ? t.sending : t.sendLabel}
          </button>
          <div aria-live="polite" className="min-h-12">
            {status === 'success' ? (
              <p className="mb-0 flex items-center gap-2 border border-signal bg-signal-subtle px-3 py-2 text-sm text-signal">
                <CheckCircle2 size={16} aria-hidden="true" />
                {tweetUrl ? <a href={tweetUrl} target="_blank" rel="noopener noreferrer" className="underline">{t.successLabel}</a> : t.successLabel}
              </p>
            ) : null}
            {status === 'error' || status === 'unconfigured' ? (
              <p className="mb-0 flex items-center gap-2 border border-line-interactive px-3 py-2 text-sm text-[#8B2C24]">
                <AlertCircle size={16} aria-hidden="true" />
                {status === 'unconfigured' ? t.notConfigured : errorMsg || t.errorLabel}
              </p>
            ) : null}
          </div>
        </div>

        <div className="system-card flex flex-col p-6">
          <p className="spec-label">{t.workflow}</p>
          <ol className="mt-5 list-none border-t border-line-interactive p-0">
            {t.steps.map((step, index) => {
              const stepStatus = steps[step.id];
              return (
                <li key={step.id} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 border-b border-line py-4">
                  <span className="font-mono text-[11px] text-signal">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-sm text-ink-secondary">{step.label}</span>
                  <span className="inline-flex min-w-[76px] items-center justify-end gap-2 font-mono text-[10px] uppercase text-ink-tertiary">
                    {stepStatus === 'done' ? <Check size={14} aria-hidden="true" /> : stepStatus === 'active' ? <Loader2 size={14} className="animate-spin" aria-hidden="true" /> : stepStatus === 'error' ? <AlertCircle size={14} aria-hidden="true" /> : <Circle size={12} aria-hidden="true" />}
                    {stepStatus}
                  </span>
                </li>
              );
            })}
          </ol>
          <div className="mt-auto border-t border-line pt-4">
            <p className="mb-0 text-sm font-medium">{t.n8nLabel}</p>
            <p className="mb-0 mt-1 text-xs text-ink-tertiary">{t.n8nSub}</p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
