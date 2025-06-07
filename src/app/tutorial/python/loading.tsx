
import { Skeleton } from "@/components/ui/skeleton";

export default function PythonTutorialsIndexLoading() {
  return (
    <div className="space-y-10 animate-pulse">
      {/* Breadcrumbs Skeleton */}
      <div className="flex items-center space-x-2 mb-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>
      <header className="pb-6 border-b border-border">
        <Skeleton className="h-10 w-1/3 mb-3" />
        <Skeleton className="h-6 w-full" />
      </header>

      <div className="bg-card shadow-lg border-border/50 p-6 rounded-lg">
        <Skeleton className="h-7 w-1/4 mb-4" />
        <ul className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <li key={i}>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border/30">
                <div className="flex items-center">
                  <Skeleton className="h-6 w-6 mr-3 rounded-full" />
                  <Skeleton className="h-6 w-48" />
                </div>
                <Skeleton className="h-5 w-5" />
              </div>
              <Skeleton className="h-4 w-3/4 mt-1 ml-9" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
