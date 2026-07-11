import type { Metadata } from 'next';
import '@/index.css';

export const metadata: Metadata = {
  title: 'Negoti8 — AI Negotiation Practice',
  description: 'Practice negotiations against AI. Get coached. Build muscle memory.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
