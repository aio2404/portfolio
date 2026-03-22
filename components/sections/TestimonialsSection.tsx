import { Quote } from 'lucide-react';
import SectionShell from '@/components/ui/SectionShell';
import { getContent, Language } from '@/data/portfolioData';

type TestimonialsSectionProps = {
  lang: Language;
};

export default function TestimonialsSection({ lang }: TestimonialsSectionProps) {
  const content = getContent(lang).testimonials;

  return (
    <SectionShell
      id="testimonials"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      index={5}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {content.items.map((item, index) => (
          <blockquote
            key={item.name}
            className="surface-card reveal-card flex flex-col gap-4 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent-2/55"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <Quote size={20} className="text-accent-2/50" />
            <p className="flex-1 text-sm leading-relaxed text-[#5f3565]">{item.quote}</p>
            <footer className="mt-2 border-t border-accent-1/20 pt-4">
              <div className="text-sm font-semibold text-[#4f245d]">{item.name}</div>
              <div className="mt-0.5 text-xs text-[#715676]">
                {item.role} · {item.company}
              </div>
              {item.linkedin && (
                <a
                  href={item.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs text-accent-2 hover:underline"
                >
                  LinkedIn →
                </a>
              )}
            </footer>
          </blockquote>
        ))}
      </div>
    </SectionShell>
  );
}
