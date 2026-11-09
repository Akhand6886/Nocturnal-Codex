
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
    <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full p-8 rounded-lg bg-card border border-border text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-wider">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
          TELEMETRY // ERR_FOLIO_NOT_FOUND
        </div>
        <h1 className="text-5xl font-mono font-bold text-foreground">404</h1>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The requested archival coordinates do not resolve to an active node or folio in the repository.
        </p>
        <div className="pt-2">
          <Button asChild size="sm" className="font-mono font-medium rounded-lg text-xs">
            <Link href="/">Return to Archive Index</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
