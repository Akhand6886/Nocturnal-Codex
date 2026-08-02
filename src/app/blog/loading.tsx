export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-12">
      <div className="space-y-10">
        {/* Header skeleton */}
        <header className="pb-6 border-b border-border animate-pulse">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-10 w-10 rounded-md bg-muted" />
            <div className="h-8 w-32 bg-muted rounded-lg" />
          </div>
          <div className="h-5 w-80 bg-muted/70 rounded-md mt-3" />
        </header>

        {/* Post cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border/30 bg-card overflow-hidden animate-pulse"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="h-44 bg-muted" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 bg-muted rounded-md" />
                <div className="h-4 w-full bg-muted/60 rounded-md" />
                <div className="h-4 w-2/3 bg-muted/60 rounded-md" />
                <div className="flex gap-2 pt-2">
                  <div className="h-5 w-16 bg-muted rounded-full" />
                  <div className="h-5 w-20 bg-muted rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
