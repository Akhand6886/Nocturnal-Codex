
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="space-y-10">
      <header className="pb-6 border-b border-border">
        <Skeleton className="h-10 w-1/4 mb-3" />
        <Skeleton className="h-6 w-3/4" />
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col overflow-hidden shadow-lg bg-card rounded-xl border border-border/50">
            <Skeleton className="h-52 w-full rounded-t-xl" />
            <div className="p-5 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="p-5 mt-auto">
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
