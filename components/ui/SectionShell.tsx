'use client';

import { ReactNode, useEffect, useId, useRef, useState } from 'react';

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  index?: number;
  label?: string;
  tone?: 'ground' | 'subtle';
};

export default function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  index = 0,
  label,
  tone = 'ground',
}: SectionShellProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingId = useId();
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setReady(true);
      setVisible(true);
      return;
    }

    setReady(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const sectionCode = `SYS.${String(index).padStart(2, '0')}`;

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={headingId}
      className={`section-shell section-reveal ${tone === 'subtle' ? 'section-shell--subtle' : ''} ${ready ? 'reveal-ready' : ''} ${visible ? 'is-visible' : ''}`}
    >
      <div className="spec-container section-layout">
        <div className="section-rail spec-label" aria-hidden="true">
          {sectionCode}
          <br />
          {label ?? eyebrow}
        </div>
        <div className="section-content">
          <div className="section-intro">
            <div>
              <p className="spec-label">{eyebrow}</p>
              <h2 id={headingId} className="section-title mt-3">
                {title}
              </h2>
            </div>
            {description ? <p className="body-copy">{description}</p> : null}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
