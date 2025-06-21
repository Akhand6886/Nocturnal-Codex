
import { cn } from "@/lib/utils";
import { remark } from 'remark';
import html from 'remark-html';

interface MarkdownRendererProps {
  content: string; // Expects raw markdown string
  className?: string;
}

export async function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  // If content is not yet available (e.g., during static generation fallback or client-side error)
  if (!content) {
    return <div className={cn("prose dark:prose-invert max-w-none markdown-content animate-pulse", className)}><p>Loading content...</p></div>;
  }

  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return (
    <div
      className={cn("prose dark:prose-invert max-w-none markdown-content", className)}
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
