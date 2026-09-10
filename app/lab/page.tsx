import type { Metadata } from 'next';
import VisualLabClient from '@/components/VisualLabClient';

export const metadata: Metadata = {
  title: 'Visual Lab — AlexOps',
  description: 'Interactive workflow and systems experiments by AlexOps.',
};

export default function VisualLabPage() {
  return <VisualLabClient />;
}
