export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-12 animate-pulse">
      {/* Header */}
      <div className="pb-6 border-b border-border mb-10">
        <div className="h-8 w-64 bg-muted rounded-lg mb-3" />
        <div className="h-5 w-96 bg-muted/70 rounded-md" />
      </div>

      {/* Article content skeleton */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="h-6 w-full bg-muted rounded-md" />
        <div className="h-6 w-5/6 bg-muted/70 rounded-md" />
        <div className="h-6 w-full bg-muted rounded-md" />
        <div className="h-40 w-full bg-muted/50 rounded-xl mt-4" />
        <div className="h-6 w-4/5 bg-muted rounded-md" />
        <div className="h-6 w-full bg-muted/70 rounded-md" />
        <div className="h-6 w-3/4 bg-muted rounded-md" />
      </div>
    </div>
  );
}
