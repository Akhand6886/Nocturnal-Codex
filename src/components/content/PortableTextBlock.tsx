
import type { PortableTextReactComponents } from '@portabletext/react';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity'; // Assuming your Sanity client and urlFor are here
import { CodeSnippet, type CodeLanguage } from './code-snippet'; // Your existing CodeSnippet component
import { cn } from '@/lib/utils';

interface PortableTextBlockProps {
  value: any[]; // The Portable Text array from Sanity
  className?: string;
}

const customComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      const imageUrl = urlFor(value)?.width(800).auto('format').url();
      const imagePlaceholder = urlFor(value)?.width(50).blur(10).url(); // Low-res placeholder
      const altText = value.alt || 'Blog post image';
      const dataAiHint = value.dataAiHint || 'decorative';

      return (
        <figure className="my-6">
          <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={altText}
                fill
                style={{ objectFit: 'cover' }}
                placeholder={imagePlaceholder ? 'blur' : 'empty'}
                blurDataURL={imagePlaceholder}
                className="transition-opacity duration-300"
                data-ai-hint={dataAiHint}
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">
                Image not available
              </div>
            )}
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-sm text-center text-muted-foreground italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => {
      const { language, code, filename } = value;
      if (!code) return null;
      return (
        <CodeSnippet
          code={code}
          language={language as CodeLanguage || 'text'}
          title={filename}
          className="my-6"
        />
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;
      return (
        <Link href={value.href} rel={rel} target={target} className="text-primary hover:underline underline-offset-2">
          {children}
        </Link>
      );
    },
    code: ({ children }) => <code className="bg-muted/50 text-accent px-1 py-0.5 rounded-sm font-mono text-[0.9em]">{children}</code>,
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-8 mb-4 text-foreground">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-7 mb-3.5 text-foreground">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-3 text-foreground">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg md:text-xl font-semibold mt-5 mb-2.5 text-foreground">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="my-5 border-l-4 border-primary pl-4 pr-2 py-3 bg-muted/30 text-muted-foreground italic shadow-sm rounded-r-md">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="mb-5 leading-relaxed text-foreground/90">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-5 ml-6 list-disc space-y-1 text-foreground/90">{children}</ul>,
    number: ({ children }) => <ol className="mb-5 ml-6 list-decimal space-y-1 text-foreground/90">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};

export function PortableTextBlock({ value, className }: PortableTextBlockProps) {
  if (!value || value.length === 0) {
    return <div className={cn("prose dark:prose-invert max-w-none markdown-content", className)}>No content available.</div>;
  }
  return (
    <div className={cn("prose dark:prose-invert max-w-none markdown-content", className)}>
      <PortableText value={value} components={customComponents} />
    </div>
  );
}
