
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center px-4 text-center">
      <AlertTriangle className="mb-4 h-16 w-16 text-destructive" />
      <h1 className="mb-2 text-6xl font-extrabold text-foreground">404</h1>
      <h2 className="mb-6 text-2xl font-semibold text-muted-foreground">
        Page Not Found
      </h2>
      <p className="max-w-md text-foreground/80 mb-8">
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </p>
      <Button asChild>
        <Link href="/">Return to Homepage</Link>
      </Button>
    </div>
  );
}
