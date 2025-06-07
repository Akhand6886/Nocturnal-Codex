
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LanguagePageLoading() {
  return (
    <div className="py-2 px-2 md:py-6 md:px-6 animate-pulse">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 mb-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>
      
      <header className="pb-6 border-b border-border flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mt-6">
        <Skeleton className="rounded-lg shadow-md border border-border p-2 w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0" />
        <div>
            <Skeleton className="h-10 sm:h-12 w-48 md:w-72 mb-2" />
            <Skeleton className="h-6 w-full max-w-md" />
        </div>
      </header>

      {/* Tabs Skeleton */}
      <div className="w-full mt-8">
        <div className="flex flex-wrap justify-start sm:justify-center gap-1 sm:gap-2 mb-6 bg-muted/60 p-1 rounded-lg">
          <Skeleton className="h-10 w-28 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>

        {/* Tab Content Skeleton (Example for one tab) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Skeleton className="h-6 w-6 mr-2 rounded-full" />
              <Skeleton className="h-7 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
