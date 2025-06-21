
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google'; // Changed from Geist_Sans, Geist_Mono
import './globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ // Changed from Geist_Sans
  variable: '--font-inter', // Changed variable name
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({ // Changed from Geist_Mono
  variable: '--font-roboto-mono', // Changed variable name
  subsets: ['latin'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
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
  icons: { // Add if you have favicons
    // icon: '/favicon.ico',
    // apple: '/apple-touch-icon.png',
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
    "logo": `${siteUrl}/images/logo.png`, // Replace with your actual logo URL
    "sameAs": [ // Optional: Add social media links
      // "https://twitter.com/yourtwitterhandle",
      // "https://github.com/yourgithubhandle"
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nocturnal Codex",
    "url": siteUrl,
    "potentialAction": { // Optional: if you have site search
      "@type": "SearchAction",
      "target": `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
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
      <body className={`${inter.variable} ${robotoMono.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
