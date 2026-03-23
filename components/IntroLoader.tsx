'use client';

import { useEffect, useState } from 'react';

const lines = [
  { text: '> Booting AlexOps.ai...', delay: 0 },
  { text: '> Profile loaded: Alexia Berger — DevOps · AI · Cloud', delay: 500 },
  { text: '> n8n automation engine: online ✓', delay: 1050 },
  { text: '> Voice AI agent: ready ✓', delay: 1500 },
  { text: '> CI/CD pipeline: connected ✓', delay: 1900 },
  { text: '> Ready.', delay: 2300, highlight: true },
];

export default function IntroLoader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState<number[]>([]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    lines.forEach((line, i) => {
      setTimeout(() => {
        setVisible((v) => [...v, i]);
      }, line.delay);
    });

    // Start fade out
    setTimeout(() => setFading(true), 2900);
    // Unmount
    setTimeout(() => onDone(), 3500);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0010] transition-opacity duration-500 ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-900/30 blur-[100px]" />

      <div className="relative w-full max-w-xl px-6">
        {/* Terminal window */}
        <div className="overflow-hidden rounded-xl border border-slate-700/60 bg-[#0d0d14] shadow-2xl shadow-purple-900/40">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-slate-700/50 bg-[#1a1a2e] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-slate-500">alexops.ai — boot</span>
          </div>

          {/* Lines */}
          <div className="min-h-[180px] px-5 py-5 font-mono text-sm">
            {lines.map((line, i) => (
              <div
                key={i}
                className={`leading-relaxed transition-opacity duration-300 ${
                  visible.includes(i) ? 'opacity-100' : 'opacity-0'
                } ${line.highlight ? 'font-bold text-emerald-400' : 'text-slate-300'}`}
              >
                {line.text}
                {i === lines.length - 1 && visible.includes(i) && (
                  <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-emerald-400 align-middle" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Logo below */}
        <p className="mt-5 text-center font-mono text-xs tracking-[0.3em] text-slate-600">
          ALEXOPS.AI
        </p>
      </div>
    </div>
  );
}
