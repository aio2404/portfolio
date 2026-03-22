'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import LiveDemosSection from '@/components/sections/LiveDemosSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import MethodSection from '@/components/sections/MethodSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import ChatbotSection from '@/components/ChatbotSection';
import dynamic from 'next/dynamic';

const VoiceAgent = dynamic(() => import('@/components/VoiceAgent'), { ssr: false });
import { Language } from '@/data/portfolioData';

export default function PortfolioClient() {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const stored = localStorage.getItem('portfolio-language');
    if (stored === 'fr' || stored === 'en') {
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

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  return (
    <div className="relative min-h-screen">
      <Header lang={lang} onLanguageChange={toggleLanguage} />
      <HeroSection lang={lang} />
      <AboutSection lang={lang} />
      <SkillsSection lang={lang} />
      <ProjectsSection lang={lang} />
      <LiveDemosSection lang={lang} />
      <TestimonialsSection lang={lang} />
      <MethodSection lang={lang} />
      <ContactSection lang={lang} />
      <Footer lang={lang} />
      <ChatbotSection lang={lang} />
      <VoiceAgent lang={lang} />
    </div>
  );
}
