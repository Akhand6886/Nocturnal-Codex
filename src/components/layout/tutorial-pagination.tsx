// src/components/layout/tutorial-pagination.tsx
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
    <div className="flex justify-between items-center my-6">
      {prev ? (
        <Button asChild variant="outline">
          <Link href={prev.url}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Link>
        </Button>
      ) : <div />}
      
      <Button variant="outline">Quiz</Button>

      {next ? (
        <Button asChild variant="outline">
          <Link href={next.url}>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      ) : <div />}
    </div>
  );
}
