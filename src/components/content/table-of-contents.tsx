import React from 'react';
import { ListTree } from 'lucide-react';

interface TableOfContentsProps {
  content: string;
}

interface Heading {
  level: number;
  text: string;
  slug: string;
}

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export function TableOfContents({ content }: TableOfContentsProps) {
  // Parse markdown content to extract h2 and h3 headings
  const headings: Heading[] = [];
  const lines = content.split('\n');
  
  // Basic regex to match lines like "## Heading" or "### Subheading"
  const headingRegex = /^(#{2,3})\s+(.+)$/;

  for (const line of lines) {
    const match = line.match(headingRegex);
    if (match) {
      const level = match[1].length; // 2 or 3
      const text = match[2];
      // strip markdown links from text if present (e.g., [text](url))
      const cleanText = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
      headings.push({
        level,
        text: cleanText,
        slug: generateSlug(cleanText)
      });
    }
  }

  if (headings.length === 0) {
    return null; // Don't render if no headings found
  }

  return (
    <nav className="sticky top-24 w-full p-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
        <ListTree className="h-3.5 w-3.5" />
        On This Page
      </h3>
      <ul className="space-y-2.5 text-sm border-l border-border/30 pl-3">
        {headings.map((heading, idx) => (
          <li 
            key={idx} 
            className={`transition-all duration-200 hover:translate-x-0.5 ${
              heading.level === 3 ? "ml-3 text-muted-foreground/70" : "font-medium text-muted-foreground"
            }`}
          >
            <a 
              href={`#${heading.slug}`}
              className="hover:text-primary block py-0.5"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
