import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'The System: Python Ascension Protocol',
    template: '%s | The System: Python Ascension Protocol',
  },
  description: 'A static, gamified Python learning protocol with eleven dungeon gates and an offline telemetry dashboard.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
