import { Github, Linkedin, Mail } from 'lucide-react';
import SectionShell from '@/components/ui/SectionShell';
import ContactForm from '@/components/ContactForm';
import { getContent, profile, Language } from '@/data/portfolioData';

type ContactSectionProps = { lang: Language };

export default function ContactSection({ lang }: ContactSectionProps) {
  const content = getContent(lang).contact;
  const links = [
    { label: profile.email, href: `mailto:${profile.email}`, icon: Mail },
    { label: 'GitHub', href: profile.github, icon: Github },
    { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
  ];

  return (
    <SectionShell
      id="contact"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      index={6}
      label={lang === 'fr' ? 'Contact' : 'Contact'}
      tone="subtle"
    >
      <div className="grid gap-[var(--layout-gap)] xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.7fr)]">
        <div className="system-card p-6 lg:p-8">
          <p className="body-copy mb-8 max-w-[62ch]">{content.summary}</p>
          <ContactForm ctaContact={content.ctaContact} lang={lang} />
        </div>
        <aside className="system-card h-full p-6 lg:p-8" aria-labelledby="quick-links-title">
          <p className="spec-label">DIRECT CHANNELS / 03</p>
          <h3 id="quick-links-title" className="subsection-title mt-3">{content.quickTitle}</h3>
          <ul className="mt-6 list-none border-t border-line p-0">
            {links.map(({ label, href, icon: Icon }) => (
              <li key={href} className="border-b border-line">
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="flex min-h-14 items-center gap-3 text-sm text-ink-secondary no-underline hover:text-signal">
                  <Icon size={16} aria-hidden="true" />
                  <span className="break-all">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </SectionShell>
  );
}
