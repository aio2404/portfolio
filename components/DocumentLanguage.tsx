'use client';

import { useEffect } from 'react';
import { Language } from '@/data/portfolioData';

export default function DocumentLanguage({ lang }: { lang: Language }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
