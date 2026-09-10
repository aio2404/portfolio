'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import LiveDemosSection from '@/components/sections/LiveDemosSection';
import MethodSection from '@/components/sections/MethodSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import ChatbotSection from '@/components/ChatbotSection';
import dynamic from 'next/dynamic';
import { Language } from '@/data/portfolioData';

const VoiceAgent = dynamic(() => import('@/components/VoiceAgent'), { ssr: false });

export default function PortfolioClient() {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const queryLang = new URLSearchParams(window.location.search).get('lang');
    const stored = localStorage.getItem('portfolio-language');
    if (queryLang === 'fr' || queryLang === 'en') {
      setLang(queryLang);
    } else if (stored === 'fr' || stored === 'en') {
      setLang(stored);
    } else {
      const browserLang = navigator.language.toLowerCase();
      setLang(browserLang.startsWith('fr') ? 'fr' : 'en');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-language', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => setLang((prev) => (prev === 'en' ? 'fr' : 'en'));

  return (
    <div className="portfolio-page min-h-screen">
      <a className="skip-link" href="#main-content">
        {lang === 'fr' ? 'Aller au contenu' : 'Skip to content'}
      </a>
      <Header lang={lang} onLanguageChange={toggleLanguage} />
      <main id="main-content">
        <HeroSection lang={lang} />
        <AboutSection lang={lang} />
        <SkillsSection lang={lang} />
        <ProjectsSection lang={lang} />
        <LiveDemosSection lang={lang} />
        <MethodSection lang={lang} />
        <ContactSection lang={lang} />
      </main>
      <Footer lang={lang} />
      <ChatbotSection lang={lang} />
      <VoiceAgent lang={lang} />
    </div>
  );
}
