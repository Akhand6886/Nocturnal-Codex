
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, CalendarDays } from "lucide-react";

export default function WikiArticleLoading() {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-pulse">
      <article className="space-y-8">
        {/* Breadcrumbs Skeleton */}
        <div className="flex items-center space-x-2 mb-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>
        
        <header className="space-y-3 border-b border-border pb-6">
          <div className="flex items-start">
            <BookOpen className="mr-3 mt-1 h-8 w-8 text-muted-foreground flex-shrink-0" />
            <Skeleton className="h-10 md:h-12 w-full" />
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <Skeleton className="h-5 w-24 rounded-full" />
            <div className="flex items-center space-x-1.5">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </header>

        <div className="space-y-4 mt-8">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-full" />
          <br/>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </article>
    </div>
  );
}
