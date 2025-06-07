
import { Skeleton } from "@/components/ui/skeleton";

export default function GlobalLoading() {
  // A simple global loading skeleton
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-4">
      <div className="space-y-6 w-full max-w-2xl">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <div className="space-y-3 pt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="h-10 w-1/3 mx-auto mt-6" />
      </div>
    </div>
  );
}
