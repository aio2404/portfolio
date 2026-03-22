import { ReactNode } from 'react';

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  index?: number;
};

export default function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  index = 0,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24 animate-fade-up"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.22em] text-accent-2/90">{eyebrow}</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold text-[#532f57]">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#6d476b]">{description}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
