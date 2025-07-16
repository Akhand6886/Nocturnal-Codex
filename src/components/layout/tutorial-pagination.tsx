
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { TutorialPost } from 'contentlayer/generated';

interface TutorialPaginationProps {
  prev: TutorialPost | null;
  next: TutorialPost | null;
}

export function TutorialPagination({ prev, next }: TutorialPaginationProps) {
  return (
    <div className="flex justify-between items-center py-4">
      <div>
        {prev ? (
          <Button asChild variant="outline">
            <Link href={prev.url}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Link>
          </Button>
        ) : (
          <Button variant="outline" disabled>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
        )}
      </div>
      
      <Button variant="outline">Quiz</Button>

      <div>
        {next ? (
          <Button asChild className="bg-green-600 hover:bg-green-700 text-white">
            <Link href={next.url}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button disabled className="bg-green-600 hover:bg-green-700 text-white">
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
