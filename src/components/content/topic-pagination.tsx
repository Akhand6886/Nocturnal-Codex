import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { TopicSection } from "@/lib/languages";

interface TopicPaginationProps {
  topics: TopicSection[];
  langSlug: string;
  activeTopicSlug: string;
}

export function TopicPagination({ topics, langSlug, activeTopicSlug }: TopicPaginationProps) {
  // Flatten topics to find previous and next easily
  const flatTopics = topics.flatMap((section) => section.items);
  
  const currentIndex = flatTopics.findIndex((item) => item.slug === activeTopicSlug);
  
  if (currentIndex === -1) return null;

  const prevTopic = currentIndex > 0 ? flatTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < flatTopics.length - 1 ? flatTopics[currentIndex + 1] : null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 pt-8 border-t border-border/40">
      <div className="w-full sm:w-1/2">
        {prevTopic && prevTopic.slug && (
          <Link
            href={`/languages/${langSlug}/${prevTopic.slug}`}
            className="group flex flex-col items-start p-4 rounded-xl border border-border/50 bg-card/30 hover:bg-card/80 transition-all duration-200"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-1.5 group-hover:text-foreground transition-colors">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              Previous
            </span>
            <span className="text-sm font-medium text-foreground">{prevTopic.title}</span>
          </Link>
        )}
      </div>

      <div className="w-full sm:w-1/2 flex justify-end">
        {nextTopic && nextTopic.slug && (
          <Link
            href={`/languages/${langSlug}/${nextTopic.slug}`}
            className="group flex flex-col items-end text-right p-4 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all duration-200"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-1.5">
              Next
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-sm font-medium text-foreground">{nextTopic.title}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
