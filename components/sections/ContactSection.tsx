import Link from 'next/link';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import SectionShell from '@/components/ui/SectionShell';
import { getContent, profile, Language } from '@/data/portfolioData';
import ContactForm from '@/components/ContactForm';

type ContactSectionProps = {
  lang: Language;
};

export default function ContactSection({ lang }: ContactSectionProps) {
  const content = getContent(lang).contact;

  return (
    <SectionShell
      id="contact"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      index={5}
    >
      <div className="surface-card premium-card reveal-card grid gap-4 p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-sm text-[#6d476b]">{content.summary}</p>
          <p className="mt-4 text-sm text-[#5d3f62]">
            Email :{' '}
            <a href={`mailto:${profile.email}`} className="text-accent-2 underline underline-offset-4">
              {profile.email}
            </a>
          </p>
          <div className="mt-6">
            <ContactForm ctaContact={content.ctaContact} lang={lang} />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-accent-2/35 bg-accent-1/10 px-4 py-2 text-sm text-[#5d3f62] transition hover:border-accent-2 hover:text-accent-2 hover:-translate-y-1"
            >
              <Send size={16} />
              {lang === 'fr' ? 'Voir mes projets' : 'See my projects'}
            </Link>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-accent-2/35 bg-accent-1/10 px-4 py-2 text-sm text-[#5d3f62] transition hover:border-accent-2 hover:text-accent-2 hover:-translate-y-1"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-accent-2/35 bg-accent-1/10 px-4 py-2 text-sm text-[#5d3f62] transition hover:border-accent-2 hover:text-accent-2 hover:-translate-y-1"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>
        </div>
        <aside className="surface-panel premium-card p-5">
          <p className="text-sm text-[#69436a]">{content.quickTitle}</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-[#4f2d57] transition hover:text-accent-2"
              >
                <Mail size={16} className="flex-shrink-0 text-accent-3" />
                <span className="break-all">{profile.email}</span>
              </a>
            </li>
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#4f2d57] transition hover:text-accent-2"
              >
                <Github size={16} className="flex-shrink-0 text-accent-3" />
                <span className="break-all">{profile.github}</span>
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#4f2d57] transition hover:text-accent-2"
              >
                <Linkedin size={16} className="flex-shrink-0 text-accent-3" />
                <span className="break-all">{profile.linkedin}</span>
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </SectionShell>
  );
}
