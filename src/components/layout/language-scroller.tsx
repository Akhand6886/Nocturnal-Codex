
"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ProgrammingLanguage } from '@/lib/data';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface LanguageScrollerProps {
  languages: ProgrammingLanguage[];
  activeLanguage?: string;
}

export function LanguageScroller({ languages, activeLanguage }: LanguageScrollerProps) {
  return (
    <div className="w-full border-b bg-muted/30">
      <ScrollArea className="max-w-7xl mx-auto whitespace-nowrap">
        <nav className="flex items-center space-x-1 px-4 h-11">
          {languages.map(lang => (
            <Link 
              key={lang.id} 
              href={`/tutorial/${lang.slug}`} // Assuming all languages will have a tutorial section
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                lang.slug === activeLanguage 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:bg-background/70 hover:text-foreground"
              )}
            >
              {lang.name}
            </Link>
          ))}
        </nav>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}
