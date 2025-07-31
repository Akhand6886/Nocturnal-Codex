// src/components/layout/language-scroller.tsx
'use client';
import Link from 'next/link';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const languages = [
    { name: 'Python', href: '/tutorial/python/introduction-to-python' },
    { name: 'JavaScript', href: '/tutorial/javascript/features-of-javascript' },
    { name: 'Java', href: '/tutorial/java/introduction-to-java' },
    { name: 'C++', href: '/tutorial/cplusplus/introduction-to-cplusplus' },
    { name: 'C#', href: '/tutorial/csharp/introduction-to-csharp' },
    { name: 'TypeScript', href: '/tutorial/typescript/introduction-to-typescript' },
    { name: 'C', href: '/tutorial/c/introduction-to-c' },
    { name: 'SQL', href: '/tutorial/sql/introduction-to-sql' },
    { name: 'PHP', href: '/tutorial/php/introduction-to-php' },
    { name: 'HTML', href: '/tutorial/html/introduction-to-html' },
    { name: 'CSS', href: '/tutorial/css/introduction-to-css' },
];

interface LanguageScrollerProps {
    activeLanguage: string;
}

export function LanguageScroller({ activeLanguage }: LanguageScrollerProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap border-b border-border">
      <div className="flex w-max space-x-4 pb-3">
        {languages.map((lang) => (
          <Link
            href={lang.href}
            key={lang.name}
            className={cn(
              'inline-block px-3 py-1.5 text-sm font-medium transition-colors rounded-md',
              activeLanguage === lang.name.toLowerCase()
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
