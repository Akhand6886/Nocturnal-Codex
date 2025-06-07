
import { Skeleton } from "@/components/ui/skeleton";
import { Users, CalendarDays, Tag, FileText } from "lucide-react";

export default function ThinkTankArticleLoading() {
  return (
    <div className="max-w-4xl mx-auto py-8 animate-pulse">
      <article className="space-y-8">
        {/* Breadcrumbs Skeleton */}
        <div className="flex items-center space-x-2 mb-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-40" />
        </div>
        
        <header className="space-y-4 border-b border-border pb-6">
          <Skeleton className="h-10 md:h-12 w-full" />
          <Skeleton className="h-8 w-3/4" />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center space-x-1.5">
              <Users className="h-4 w-4 text-muted-foreground" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex items-center space-x-1.5">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
           <div className="flex flex-wrap items-center gap-2 pt-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
        </header>

        <Skeleton className="relative w-full aspect-[16/7] rounded-lg" />
        
        <div className="bg-card shadow-md p-6 rounded-lg">
          <div className="flex items-center text-xl mb-2">
            <FileText className="mr-2 h-5 w-5 text-muted-foreground"/>
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mt-2" />
        </div>

        <div className="space-y-4 mt-8">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-11/12" />
          <Skeleton className="h-6 w-full" />
          <br />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
        </div>
      </article>
    </div>
  );
}
