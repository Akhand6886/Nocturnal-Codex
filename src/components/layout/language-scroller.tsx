// src/components/layout/language-scroller.tsx
'use client';
import Link from 'next/link';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { allLanguagePosts } from 'contentlayer/generated';

interface LanguageScrollerProps {
    activeLanguage: string;
}

export function LanguageScroller({ activeLanguage }: LanguageScrollerProps) {
  const languages = allLanguagePosts.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ScrollArea className="w-full whitespace-nowrap border-b border-border">
      <div className="flex w-max space-x-4 pb-3">
        {languages.map((lang) => (
          <Link
            href={lang.url}
            key={lang.name}
            className={cn(
              'inline-block px-3 py-1.5 text-sm font-medium transition-colors rounded-md',
              activeLanguage === lang.slug
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            )}
          >
            {lang.name}
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
