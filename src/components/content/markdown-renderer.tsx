
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string; // Expects pre-rendered HTML string
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  // If content is not yet available (e.g., during static generation fallback or client-side error)
  if (!content) {
    return <div className={cn("prose dark:prose-invert max-w-none markdown-content animate-pulse", className)}><p>Loading content...</p></div>;
  }

  return (
    <div
      className={cn("prose dark:prose-invert max-w-none markdown-content", className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
