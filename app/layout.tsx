import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'AlexOps — Reliable systems & measurable automation',
  description:
    'DevOps, cloud and AI automation systems designed for reliable production operations.',
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
    title: 'AlexOps — Reliable systems & measurable automation',
    description:
      'DevOps, cloud and AI automation systems designed for reliable production operations.',
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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
