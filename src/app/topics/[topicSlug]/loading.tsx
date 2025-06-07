
import { Skeleton } from "@/components/ui/skeleton";

export default function TopicPageLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Breadcrumbs Skeleton */}
      <div className="flex items-center space-x-2 mb-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>
      
      <header className="pb-6 border-b border-border">
        <Skeleton className="relative w-full h-64 md:h-80 rounded-lg mb-6" />
        <Skeleton className="h-8 w-3/4 mt-2" />
      </header>

      {/* Tabs Skeleton */}
      <div className="w-full">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>

        {/* Tab Content Skeleton (Example for Overview) */}
        <div className="bg-card p-6 rounded-lg shadow-md">
          <Skeleton className="h-7 w-1/3 mb-4" />
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="p-3 rounded-md border border-border/30">
                <Skeleton className="h-6 w-1/2 mb-1" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
