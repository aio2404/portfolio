import type { Metadata, Viewport } from 'next';
import { Manrope, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'AlexOps — DevOps Engineer | AI Automation | Developer',
  description:
    'Professional portfolio of AlexOps, DevOps Engineer, AI automation specialist, CI/CD, cloud, APIs, and no-code/low-code integrations.',
  keywords: [
    'DevOps',
    'AI Automation',
    'n8n',
    'CI/CD',
    'Terraform',
    'Docker',
    'OpenAI',
    'Portfolio',
  ],
  openGraph: {
    title: 'AlexOps — DevOps Engineer | AI Automation | Developer',
    description:
      'Hybrid profile in DevOps, development, AI automation, and platform engineering with a premium, reliable, results-oriented approach.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-bg-0 font-sans text-[#3f2347] antialiased">{children}</body>
    </html>
  );
}
