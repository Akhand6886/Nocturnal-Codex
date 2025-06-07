
import { Skeleton } from "@/components/ui/skeleton";

export default function WikiIndexLoading() {
  return (
    <div className="space-y-10">
      <header className="pb-6 border-b border-border">
        <Skeleton className="h-10 w-1/3 mb-3" />
        <Skeleton className="h-6 w-full" />
      </header>
      
      {[1, 2, 3].map(groupKey => (
        <section key={groupKey} className="mb-8">
          <Skeleton className="h-8 w-1/4 mb-4" />
          <div className="bg-card shadow-md p-2 space-y-1 rounded-lg">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3.5 rounded-lg hover:bg-muted/10">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-5 w-48" />
                </div>
                <Skeleton className="h-5 w-5" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
