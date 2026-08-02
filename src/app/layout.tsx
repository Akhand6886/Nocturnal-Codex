
import type { Metadata } from 'next';
import { Quicksand, Inconsolata, Balsamiq_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react"

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
});

const inconsolata = Inconsolata({
  variable: '--font-inconsolata',
  subsets: ['latin'],
});

const balsamiqSans = Balsamiq_Sans({
  weight: ['400', '700'],
  variable: '--font-balsamiq',
  subsets: ['latin'],
});

const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  subsets: ['latin'],
});

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.NEXT_PUBLIC_VERCEL_URL) return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

const siteUrl = getBaseUrl();
const defaultOgImage = `${siteUrl}/images/og-default.png`; // You should create this image

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Nocturnal Codex',
    template: '%s | Nocturnal Codex',
  },
  description: 'For Hackers, Theorists, Builders, Learners. A curated sanctuary for deep dives into computer science, mathematics, and theoretical domains.',
  openGraph: {
    title: 'Nocturnal Codex',
    description: 'For Hackers, Theorists, Builders, Learners.',
    url: siteUrl,
    siteName: 'Nocturnal Codex',
    images: [
      {
        url: defaultOgImage, // Replace with your actual default OG image URL
        width: 1200,
        height: 630,
        alt: 'Nocturnal Codex',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nocturnal Codex',
    description: 'For Hackers, Theorists, Builders, Learners.',
    images: [defaultOgImage], // Replace with your actual default Twitter image URL
    // site: '@yourtwitterhandle', // Optional: Add your Twitter handle
    // creator: '@yourtwitterhandle', // Optional: Add your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // alternates: { // Already handled by sitemap.ts for the most part
  //   canonical: '/', 
  // },
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nocturnal Codex",
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.png`,
    "sameAs": [
      "https://github.com/Akhand6886/Nocturnal-Codex"
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nocturnal Codex",
    "url": siteUrl,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${quicksand.variable} ${inconsolata.variable} ${balsamiqSans.variable} ${playfairDisplay.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <ThemeProvider>
          <div className="flex-grow">
            <Navbar />
            {children}
          </div>
          <Footer />
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
