import { cn } from "@/lib/utils";
import { remark } from 'remark';
import html from 'remark-html';
import { useEffect, useState } from "react";

interface MarkdownRendererProps {
  content: string; // Expects raw Markdown string
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const [processedContent, setProcessedContent] = useState('');

  useEffect(() => {
    async function processMarkdown() {
      const result = await remark().use(html).process(content);
      setProcessedContent(result.toString());
    }
    processMarkdown();
  }, [content]);

  if (!processedContent) {
    // You might want to return a loading state or null
    return <div className={cn("prose dark:prose-invert max-w-none markdown-content animate-pulse", className)}><p>Loading content...</p></div>;
  }

  return (
    <div
      className={cn("prose dark:prose-invert max-w-none markdown-content", className)}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}
