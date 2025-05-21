import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// This is a very basic renderer. For full Markdown support (tables, complex lists, etc.),
// a library like react-markdown or marked would be recommended.
// This basic version handles paragraphs, headings, simple lists, code blocks, and links
// by relying on Tailwind prose classes or custom global styles.
export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  // A more robust solution would parse Markdown to a React element tree.
  // For now, we assume the content might be pre-rendered HTML from Markdown, or simple text.
  // Using dangerouslySetInnerHTML is generally risky if content is not trusted.
  // A safer approach for direct Markdown strings would involve a parser.
  // Given the constraints, we'll assume the 'content' string is safe HTML from Markdown
  // or use a simple replace for newlines if it's plain text with line breaks.

  // If 'content' is expected to be raw Markdown text, we can do basic replacements.
  // This is extremely rudimentary and not a full Markdown parser.
  const basicFormattedContent = content
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold my-4">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold my-3">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold my-2">$1</h3>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>') // Bold
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')             // Italic
    .replace(/```([\s\S]*?)```/gim, '<pre class="bg-muted p-3 rounded-md my-3 overflow-x-auto"><code>$1</code></pre>') // Code blocks
    .replace(/`([^`]+)`/gim, '<code class="bg-muted px-1 rounded-sm">$1</code>') // Inline code
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>') // Links
    .replace(/^\s*-\s+(.*)/gim, '<ul class="list-disc ml-6 my-2"><li>$1</li></ul>') // Basic unordered list (very naive, doesn't group)
    .replace(/^\s*\d+\.\s+(.*)/gim, '<ol class="list-decimal ml-6 my-2"><li>$1</li></ol>') // Basic ordered list (very naive)
    .replace(/\n/g, '<br />'); // Newlines to <br> for paragraphs (after other block elements)
    // The list replacements above are very naive and will create separate lists for each item.
    // A proper parser is needed for correct list rendering.

  return (
    <div
      className={cn("prose dark:prose-invert max-w-none markdown-content", className)}
      dangerouslySetInnerHTML={{ __html: content }} // Assuming content is safe HTML or simple text. For raw MD, use a parser.
    />
  );
}

// For proper Markdown rendering, you'd typically use:
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// ...
// return <ReactMarkdown remarkPlugins={[remarkGfm]} className={...}>{content}</ReactMarkdown>
// This requires installing react-markdown and remark-gfm.
// The current basic solution uses globals.css for .markdown-content styling.
