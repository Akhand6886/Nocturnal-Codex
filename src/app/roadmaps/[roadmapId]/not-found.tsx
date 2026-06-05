import Link from 'next/link';
import { ArrowLeft, MapPinOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-6">
        <MapPinOff className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Roadmap Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        The roadmap you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Button asChild variant="outline" className="rounded-lg">
        <Link href="/roadmaps" className="inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to all roadmaps
        </Link>
      </Button>
    </div>
  );
}
