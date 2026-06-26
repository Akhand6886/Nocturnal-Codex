export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      {/* Header skeleton */}
      <div className="text-center mb-14 animate-pulse">
        <div className="h-6 w-48 bg-muted rounded-full mx-auto mb-6" />
        <div className="h-10 w-80 bg-muted rounded-lg mx-auto mb-4" />
        <div className="h-5 w-96 bg-muted/70 rounded-md mx-auto" />
      </div>

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-48 rounded-2xl bg-muted/50 border border-border/30 animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
