import { Spinner } from '@/components/common/spinner';

export default function Loading() {
  return (
    <div>
      {/* Header skeleton */}
      <header className="relative overflow-hidden border-b border-border">
        <div className="container mx-auto px-4 pt-8 pb-10 animate-pulse">
          <div className="h-4 w-28 bg-muted rounded-md mb-6" />
          <div className="text-center max-w-3xl mx-auto">
            <div className="h-10 w-72 bg-muted rounded-lg mx-auto mb-4" />
            <div className="h-5 w-96 bg-muted/70 rounded-md mx-auto mb-6" />
            <div className="flex justify-center gap-3">
              <div className="h-7 w-20 bg-muted rounded-lg" />
              <div className="h-7 w-24 bg-muted rounded-lg" />
              <div className="h-7 w-20 bg-muted rounded-lg" />
            </div>
          </div>
        </div>
      </header>

      {/* Canvas placeholder */}
      <div className="w-full flex items-center justify-center" style={{ height: 'calc(100vh - 300px)' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Spinner className="text-primary w-6 h-6" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Loading roadmap</p>
            <p className="text-xs text-muted-foreground mt-0.5 animate-pulse">Preparing your learning path…</p>
          </div>
        </div>
      </div>
    </div>
  );
}
