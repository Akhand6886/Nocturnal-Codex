
import { Skeleton } from "@/components/ui/skeleton";

export default function TopicsExplorerLoading() {
  return (
    <div className="space-y-12">
      <header className="pb-6 border-b border-border">
        <Skeleton className="h-10 w-1/3 mb-3" />
        <Skeleton className="h-6 w-full" />
      </header>
      
      {[1, 2].map(categoryKey => (
        <section key={categoryKey} className="space-y-6">
          <Skeleton className="h-8 w-1/4 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-full overflow-hidden shadow-lg bg-card border border-border/50 rounded-xl">
                <Skeleton className="h-44 w-full rounded-t-xl" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-5 w-20 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
