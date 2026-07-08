import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Negoti8 — AI Negotiation Practice',
  description: 'Practice negotiations against AI. Get coached. Build muscle memory.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#000', color: '#fff', fontFamily: 'system-ui' }}>
        {children}
      </body>
    </html>
  );
}
