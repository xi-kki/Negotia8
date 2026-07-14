import type { Metadata, Viewport } from 'next';
import '@/index.css';

export const metadata: Metadata = {
  title: 'Negoti8 — AI Negotiation Practice',
  description:
    'Practice negotiations against AI with emotional intelligence. Get real-time coaching, voice interaction, and detailed performance reports.',
  keywords: [
    'negotiation',
    'AI coach',
    'salary negotiation',
    'practice',
    'voice AI',
    'emotional intelligence',
  ],
  authors: [{ name: 'Isaac' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://negoti8.vercel.app',
    title: 'Negoti8 — AI Negotiation Practice',
    description:
      'Practice negotiations against AI with emotional intelligence. Get real-time coaching and detailed performance reports.',
    siteName: 'Negoti8',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Negoti8 — AI Negotiation Practice',
    description:
      'Practice negotiations against AI with emotional intelligence. Get real-time coaching and detailed performance reports.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0a0f',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  );
}
