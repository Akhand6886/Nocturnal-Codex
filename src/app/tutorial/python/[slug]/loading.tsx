
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";

export default function PythonTutorialLoading() {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-pulse">
      {/* Breadcrumbs Skeleton */}
      <div className="flex items-center space-x-2 mb-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-36" />
      </div>
      <article className="space-y-8">
        <header className="space-y-3 border-b border-border pb-6">
          <div className="flex items-start">
            <BookOpen className="mr-3 mt-1 h-8 w-8 text-muted-foreground flex-shrink-0" />
            <Skeleton className="h-10 md:h-12 w-full" />
          </div>
          <Skeleton className="h-6 w-3/4" />
        </header>

        <div className="space-y-4 mt-8">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-full" />
          <br />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </article>

      <div className="mt-12 p-6 bg-card rounded-lg shadow-md">
        <Skeleton className="h-6 w-1/3 mb-4" />
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Skeleton className="h-10 w-full sm:w-48" />
          <Skeleton className="h-10 w-full sm:w-48" />
        </div>
      </div>
    </div>
  );
}
