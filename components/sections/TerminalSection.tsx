'use client';

import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { getContent, profile, Language } from '@/data/portfolioData';
import SectionShell from '@/components/ui/SectionShell';

type OutputLine = {
  text: string;
  type?: 'normal' | 'green' | 'yellow' | 'cyan' | 'red' | 'muted' | 'white' | 'prompt';
  bold?: boolean;
};

type HistoryEntry = {
  command: string;
  output: OutputLine[];
};

const PROMPT = `alexops@portfolio:~$`;

const preferredScrollBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

function buildCommands(lang: Language) {
  const content = getContent(lang);
  const projects = content.projects.items;
  const skills = content.skills.categories;

  const COMMANDS: Record<string, () => OutputLine[]> = {
    help: () => [
      { text: 'Available commands:', type: 'cyan', bold: true },
      { text: '' },
      { text: '  whoami              — profile overview', type: 'normal' },
      { text: '  ls                  — list available files', type: 'normal' },
      { text: '  ls projects         — list all projects', type: 'normal' },
      { text: '  ls skills           — list skill categories', type: 'normal' },
      { text: '  cat about.md        — about & background', type: 'normal' },
      { text: '  cat contact.md      — contact information', type: 'normal' },
      { text: '  cat stack.md        — full tech stack', type: 'normal' },
      { text: '  cat projects/<name> — project details', type: 'normal' },
      { text: '  ping n8n            — check automation engine', type: 'normal' },
      { text: '  uptime              — availability status', type: 'normal' },
      { text: '  ./contact.sh        — open contact section', type: 'normal' },
      { text: '  clear               — clear terminal', type: 'normal' },
      { text: '' },
      { text: '  Tip: use ↑ ↓ to navigate command history', type: 'muted' },
    ],

    whoami: () => [
      { text: `${profile.name}`, type: 'cyan', bold: true },
      { text: '' },
      { text: '  Role      DevOps Engineer · AI Automation · Fullstack', type: 'normal' },
      { text: '  Location  France (remote worldwide)', type: 'normal' },
      { text: '  Lang      EN · FR', type: 'normal' },
      { text: `  Email     ${profile.email}`, type: 'normal' },
      { text: `  GitHub    ${profile.github}`, type: 'normal' },
      { text: `  LinkedIn  ${profile.linkedin}`, type: 'normal' },
    ],

    ls: () => [
      { text: 'about.md    contact.md    stack.md    projects/    skills/', type: 'cyan' },
    ],

    'ls projects': () => [
      { text: 'projects/', type: 'cyan', bold: true },
      { text: '' },
      ...projects.map((p, i) => ({
        text: `  [${String(i + 1).padStart(2, '0')}] ${p.slug}`,
        type: 'normal' as const,
      })),
      { text: '' },
      { text: `  → cat projects/<name> to see details`, type: 'muted' },
    ],

    'ls skills': () => [
      { text: 'skills/', type: 'cyan', bold: true },
      { text: '' },
      ...skills.flatMap((cat) => [
        { text: `  ${cat.title}`, type: 'yellow' as const, bold: true },
        { text: `    ${cat.items.join('  ·  ')}`, type: 'normal' as const },
        { text: '' },
      ]),
    ],

    'cat about.md': () => [
      { text: '# About', type: 'cyan', bold: true },
      { text: '' },
      { text: content.about.intro, type: 'normal' },
      { text: '' },
      { text: content.about.positioning, type: 'normal' },
      { text: '' },
      { text: `  "${content.about.missionStatement}"`, type: 'yellow' },
    ],

    'cat contact.md': () => [
      { text: '# Contact', type: 'cyan', bold: true },
      { text: '' },
      { text: `  Email     ${profile.email}`, type: 'normal' },
      { text: `  GitHub    ${profile.github}`, type: 'normal' },
      { text: `  LinkedIn  ${profile.linkedin}`, type: 'normal' },
      { text: '' },
      { text: `  → Run ./contact.sh to open the contact form`, type: 'muted' },
    ],

    'cat stack.md': () => [
      { text: '# Tech Stack', type: 'cyan', bold: true },
      { text: '' },
      ...skills.flatMap((category) => [
        { text: `  ${category.title.padEnd(14)}${category.items.join(' · ')}`, type: 'normal' as const },
      ]),
    ],

    'ping n8n': () => [
      { text: '  Runtime status is not probed from this browser demo.', type: 'yellow' },
      { text: '  Use the live workflow above to observe a configured execution.', type: 'muted' },
    ],

    uptime: () => [
      { text: '  No synthetic uptime is reported by this portfolio.', type: 'yellow' },
      { text: '  Availability is stated in the profile, not inferred from telemetry.', type: 'muted' },
    ],

    './contact.sh': () => {
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: preferredScrollBehavior() });
      }, 500);
      return [
        { text: '  Launching contact form...', type: 'green' },
        { text: '  Scrolling to #contact ↓', type: 'muted' },
      ];
    },

    clear: () => [],
  };

  // Dynamic cat projects/<slug>
  projects.forEach((p) => {
    COMMANDS[`cat projects/${p.slug}`] = () => {
      const lines: OutputLine[] = [
        { text: `# ${p.title}`, type: 'cyan', bold: true },
        { text: '' },
        { text: p.description, type: 'normal' },
        { text: '' },
        { text: '  Stack: ' + p.stack.join(' · '), type: 'yellow' },
      ];
      if (p.metrics && p.metrics.length > 0) {
        lines.push({ text: '' });
        lines.push({ text: '  Metrics:', type: 'white', bold: true });
        p.metrics.forEach((m) => {
          lines.push({ text: `    ${m.value.padEnd(12)} ${m.label}`, type: 'green' });
        });
      }
      if (p.highlights && p.highlights.length > 0) {
        lines.push({ text: '' });
        lines.push({ text: '  Highlights:', type: 'white', bold: true });
        p.highlights.forEach((h) => {
          lines.push({ text: `    ✓ ${h}`, type: 'normal' });
        });
      }
      if (p.github) lines.push({ text: '' }, { text: `  GitHub: ${p.github}`, type: 'muted' });
      if (p.demo) lines.push({ text: `  Demo:   ${p.demo}`, type: 'muted' });
      return lines;
    };
  });

  return COMMANDS;
}

const WELCOME: OutputLine[] = [
  { text: '╔══════════════════════════════════════════════════╗', type: 'cyan' },
  { text: '║          AlexOps — Interactive Terminal          ║', type: 'cyan' },
  { text: '╚══════════════════════════════════════════════════╝', type: 'cyan' },
  { text: '' },
  { text: "  Welcome! Type 'help' to see available commands.", type: 'muted' },
  { text: '' },
];

const colorClass: Record<string, string> = {
  green: 'text-signal',
  yellow: 'text-[#765D19]',
  cyan: 'text-signal',
  red: 'text-[#8B2C24]',
  muted: 'text-ink-tertiary',
  white: 'text-ink',
  normal: 'text-ink-secondary',
  prompt: 'text-signal',
};

type TerminalSectionProps = { lang: Language };

export default function TerminalSection({ lang }: TerminalSectionProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { command: '', output: WELCOME },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const commands = buildCommands(lang);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: preferredScrollBehavior() });
  }, [history]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setCmdHistory((h) => [cmd, ...h]);
    setHistIdx(-1);

    if (cmd === 'clear') {
      setHistory([{ command: '', output: WELCOME }]);
      setInput('');
      return;
    }

    const fn = commands[cmd];
    const output: OutputLine[] = fn
      ? fn()
      : [
          { text: `  command not found: ${cmd}`, type: 'red' },
          { text: "  Type 'help' to see available commands.", type: 'muted' },
        ];

    setHistory((h) => [...h, { command: cmd, output }]);
    setInput('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : cmdHistory[next] ?? '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = Object.keys(commands).find((k) => k.startsWith(input) && k !== input);
      if (match) setInput(match);
    }
  };

  return (
    <SectionShell
      id="terminal"
      eyebrow={lang === 'fr' ? 'Explorer' : 'Explore'}
      title={lang === 'fr' ? 'Terminal interactif' : 'Interactive terminal'}
      description={lang === 'fr' ? "Explorez les informations du portfolio. Tapez 'help' pour commencer." : "Explore the portfolio data. Type 'help' to get started."}
      index={2}
      label="LOCAL / READ ONLY"
    >
      <div className="overflow-hidden border border-line-interactive bg-ground-subtle" onClick={() => inputRef.current?.focus()}>
          <div className="flex min-h-11 items-center justify-between border-b border-line-interactive px-4 py-2 font-mono text-[11px] uppercase tracking-[0.04em] text-ink-tertiary">
            <span>alexops@portfolio: ~</span>
            <span>LOCAL / READ ONLY</span>
          </div>

          <div ref={logRef} className="h-80 overflow-y-auto px-4 py-4 font-mono text-[13px] sm:h-96" role="log" aria-live="polite">
            {history.map((entry, i) => (
              <div key={i}>
                {entry.command && (
                  <div className="flex items-center gap-2 text-signal">
                    <span className="select-none">{PROMPT}</span>
                    <span className="text-ink">{entry.command}</span>
                  </div>
                )}
                {entry.output.map((line, j) => (
                  <div
                    key={j}
                    className={`leading-relaxed ${colorClass[line.type ?? 'normal']} ${line.bold ? 'font-bold' : ''}`}
                  >
                    {line.text || '\u00A0'}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex min-h-12 items-center gap-2 border-t border-line-interactive bg-ground px-4 py-3 font-mono text-[13px]">
            <span className="select-none whitespace-nowrap text-signal">{PROMPT}</span>
            <label htmlFor="terminal-command" className="sr-only">{lang === 'fr' ? 'Commande' : 'Command'}</label>
            <input
              id="terminal-command"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent text-ink caret-signal outline-none placeholder:text-ink-tertiary"
              placeholder={lang === 'fr' ? "tapez une commande..." : "type a command..."}
            />
          </div>
      </div>
    </SectionShell>
  );
}
