
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Nocturnal Codex',
  description: 'The page you are looking for could not be found.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-6 bg-background">
      <AlertTriangle className="w-20 h-20 text-destructive mb-6" />
      <h1 className="text-5xl font-extrabold text-foreground mb-3">404</h1>
      <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
        <Link href="/">
          <Home className="mr-2 h-5 w-5" />
          Return to Homepage
        </Link>
      </Button>
    </div>
  );
}
