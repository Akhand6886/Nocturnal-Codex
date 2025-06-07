
import { Skeleton } from "@/components/ui/skeleton";

export default function ThinkTankLoading() {
  return (
    <div className="space-y-10">
      <header className="pb-6 border-b border-border">
        <Skeleton className="h-10 w-1/3 mb-3" />
        <Skeleton className="h-6 w-full" />
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {[1, 2].map((i) => (
          <div key={i} className="flex flex-col overflow-hidden shadow-lg bg-card group rounded-xl border">
            <Skeleton className="h-60 w-full rounded-t-xl" />
            <div className="p-5 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="p-5 mt-auto">
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
