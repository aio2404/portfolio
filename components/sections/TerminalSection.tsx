'use client';

import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { getContent, profile, Language } from '@/data/portfolioData';

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
      { text: '' },
      { text: '  Engineering degree · 5+ years experience · 8+ clients', type: 'muted' },
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
      { text: '  Automation    n8n · Make · Zapier · Webhooks', type: 'normal' },
      { text: '  AI/ML         OpenAI · Vapi · LangChain · Agents', type: 'normal' },
      { text: '  Cloud         AWS · GCP · OVH · Azure', type: 'normal' },
      { text: '  IaC           Terraform · Helm · Ansible', type: 'normal' },
      { text: '  Containers    Docker · Kubernetes · ECS', type: 'normal' },
      { text: '  CI/CD         GitHub Actions · Jenkins · GitLab CI', type: 'normal' },
      { text: '  Dev           Next.js · TypeScript · Python · Node.js', type: 'normal' },
      { text: '  Monitoring    Prometheus · Grafana · Datadog', type: 'normal' },
    ],

    'ping n8n': () => [
      { text: 'PING n8n.srv1233751.hstgr.cloud', type: 'normal' },
      { text: '' },
      { text: '  64 bytes: icmp_seq=1 ttl=64 time=12ms', type: 'green' },
      { text: '  64 bytes: icmp_seq=2 ttl=64 time=9ms', type: 'green' },
      { text: '  64 bytes: icmp_seq=3 ttl=64 time=11ms', type: 'green' },
      { text: '' },
      { text: '  n8n automation engine: ONLINE ✓', type: 'green', bold: true },
    ],

    uptime: () => {
      const start = new Date('2024-01-01');
      const now = new Date();
      const days = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return [
        { text: `  System up ${days} days`, type: 'green' },
        { text: '  Load avg: automation, creativity, precision', type: 'normal' },
        { text: '  Status: available for new projects ✓', type: 'green', bold: true },
      ];
    },

    './contact.sh': () => {
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
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
  green:  'text-emerald-400',
  yellow: 'text-yellow-300',
  cyan:   'text-cyan-400',
  red:    'text-red-400',
  muted:  'text-slate-500',
  white:  'text-white',
  normal: 'text-slate-300',
  prompt: 'text-purple-400',
};

type TerminalSectionProps = { lang: Language };

export default function TerminalSection({ lang }: TerminalSectionProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { command: '', output: WELCOME },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const commands = buildCommands(lang);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    <section id="terminal" className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-2/70">
            {lang === 'fr' ? 'Explorez' : 'Explore'}
          </p>
          <h2 className="font-display text-3xl font-bold text-[#3c1042] sm:text-4xl">
            {lang === 'fr' ? 'Terminal interactif' : 'Interactive Terminal'}
          </h2>
          <p className="mt-3 text-sm text-[#715676]">
            {lang === 'fr'
              ? "Explorez le profil comme un vrai dev. Tapez 'help' pour commencer."
              : "Explore the profile like a real dev. Type 'help' to get started."}
          </p>
        </div>

        {/* Terminal window */}
        <div
          className="overflow-hidden rounded-xl border border-slate-700/60 bg-[#0d0d14] shadow-2xl shadow-purple-900/20"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-slate-700/50 bg-[#1a1a2e] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-slate-500">alexops@portfolio: ~</span>
          </div>

          {/* Output */}
          <div className="h-80 overflow-y-auto px-4 py-3 font-mono text-sm sm:h-96">
            {history.map((entry, i) => (
              <div key={i}>
                {entry.command && (
                  <div className="flex items-center gap-2 text-purple-400">
                    <span className="select-none">{PROMPT}</span>
                    <span className="text-white">{entry.command}</span>
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
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-slate-700/50 bg-[#0d0d14] px-4 py-3 font-mono text-sm">
            <span className="select-none text-purple-400 whitespace-nowrap">{PROMPT}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className="flex-1 bg-transparent text-white caret-purple-400 outline-none placeholder:text-slate-600"
              placeholder={lang === 'fr' ? "tapez une commande..." : "type a command..."}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
