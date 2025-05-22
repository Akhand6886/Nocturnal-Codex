
import type { WikiArticleStub } from "@/lib/data";
import Link from "next/link";
import { BookText, ChevronRight } from "lucide-react";

interface WikiArticleLinkProps {
  article: WikiArticleStub;
}

export function WikiArticleLink({ article }: WikiArticleLinkProps) {
  return (
    <Link
      href={`/wiki/${article.slug}`}
      className="group flex items-center justify-between p-3.5 rounded-lg hover:bg-accent/10 transition-all duration-200 ease-in-out border border-transparent hover:border-accent/30"
    >
      <div className="flex items-center space-x-3">
        <BookText className="h-5 w-5 text-primary group-hover:text-accent transition-colors duration-200 ease-in-out" />
        <span className="text-foreground/90 group-hover:text-accent transition-colors duration-200 ease-in-out font-medium">{article.title}</span>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all duration-200 ease-in-out transform group-hover:translate-x-1" />
    </Link>
  );
}
