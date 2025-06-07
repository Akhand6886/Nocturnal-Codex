
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, UserCircle, Tag } from "lucide-react";

export default function BlogPostLoading() {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-pulse">
      <article className="space-y-8">
        {/* Breadcrumbs Skeleton */}
        <div className="flex items-center space-x-2 mb-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>
        
        <header className="space-y-4">
          <Skeleton className="h-10 md:h-12 w-full" />
          <Skeleton className="h-8 w-3/4" />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center space-x-1.5">
              <UserCircle className="h-4 w-4 text-muted-foreground" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center space-x-1.5">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </header>

        <Skeleton className="relative w-full aspect-video rounded-lg" />
        
        <div className="space-y-4 mt-8">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-4/6" />
          <br/>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </article>
    </div>
  );
}
