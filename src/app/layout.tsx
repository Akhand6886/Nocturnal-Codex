
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google'; 
import './globals.css';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ 
  variable: '--font-inter', 
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({ 
  variable: '--font-roboto-mono', 
  subsets: ['latin'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const defaultOgImage = `${siteUrl}/images/og-default.png`; 

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
        url: defaultOgImage, 
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
    images: [defaultOgImage], 
    // site: '@yourtwitterhandle', 
    // creator: '@yourtwitterhandle', 
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
  // Favicon example (ensure you have these files in /public)
  icons: { 
     icon: '/favicon.ico', // Standard favicon
     shortcut: '/favicon-16x16.png', // For older browsers, can be same as favicon.ico
     apple: '/apple-touch-icon.png', // For Apple devices
    // other: [ // You can add more specific icons if needed
    //   { rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32' },
    // ],
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
    "logo": `${siteUrl}/images/logo.png`, // Ensure logo.png is in /public/images
    "sameAs": [ 
      // "https://twitter.com/yourtwitterhandle",
      // "https://github.com/yourgithubhandle"
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nocturnal Codex",
    "url": siteUrl,
    "potentialAction": { 
      "@type": "SearchAction",
      "target": `${siteUrl}/search?q={search_term_string}`, // Example search URL
      "query-input": "required name=search_term_string"
    },
    "publisher": { // Added publisher to WebSite schema as well
        "@type": "Organization",
        "name": "Nocturnal Codex",
        "logo": {
            "@type": "ImageObject",
            "url": `${siteUrl}/images/logo.png`
        }
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
          <main className="flex-grow container mx-auto px-4 py-10 md:py-12"> 
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
