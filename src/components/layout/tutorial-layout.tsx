
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import type { TutorialPost } from 'contentlayer/generated';
import type { ProgrammingLanguage } from '@/lib/data';

interface TutorialLayoutProps extends PropsWithChildren {
    language: ProgrammingLanguage;
    tutorials: TutorialPost[];
}

export function TutorialLayout({ children, language, tutorials }: TutorialLayoutProps) {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      <header className="p-4 border-b border-slate-200 dark:border-slate-800">
        <Link href={`/languages/${language.slug}`} className="flex items-center gap-3">
          <Image src={language.iconUrl} alt={language.name} width={40} height={40} data-ai-hint={language.dataAiHint} />
          <div>
            <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">{language.name}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Programming Language</p>
          </div>
        </Link>
      </header>
      <ScrollArea className="flex-grow">
        <nav className="p-2">
          <ul>
            <li>
              <Link
                href={`/tutorial/${language.slug}`}
                className="flex items-center justify-between p-2 text-sm font-semibold rounded-md bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 mb-1"
                onClick={() => isSheetOpen && setIsSheetOpen(false)}
              >
                {language.name} - Home
                <span>&rarr;</span>
              </Link>
            </li>
            {tutorials.map((tutorial) => {
              const isActive = pathname === tutorial.url;
              return (
                <li key={tutorial.slug}>
                  <Link
                    href={tutorial.url}
                    onClick={() => isSheetOpen && setIsSheetOpen(false)}
                    className={cn(
                      "block p-2 text-sm rounded-md transition-colors w-full text-left",
                      isActive
                        ? "text-slate-900 bg-slate-200 dark:text-slate-50 dark:bg-slate-700 font-medium"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                  >
                    {tutorial.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </ScrollArea>
    </div>
  );

  return (
    <div className="flex-1 w-full bg-background">
        <div className="lg:hidden sticky top-16 bg-background/95 py-2 z-10 border-b">
          <div className="container mx-auto px-4">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" aria-label="Open Menu">
                    <Menu className="h-5 w-5" />
                    <span className="ml-2">Tutorial Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] p-0">
                    <SidebarContent />
                </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_300px] gap-8">
            <aside className="hidden lg:block h-[calc(100vh-4rem)] sticky top-16">
              <SidebarContent />
            </aside>
            <main className="min-w-0 py-8">
              {children}
            </main>
            <aside className="hidden xl:block h-[calc(100vh-4rem)] sticky top-16 py-8">
              <div className="h-full space-y-6">
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 h-auto flex items-center justify-center">
                      <Image src="https://placehold.co/300x250.png" width={250} height={210} alt="Ad Placeholder" data-ai-hint="advertisement banner" className="rounded-md" />
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 h-auto flex items-center justify-center">
                      <Image src="https://placehold.co/300x250.png" width={250} height={210} alt="Ad Placeholder" data-ai-hint="advertisement banner" className="rounded-md" />
                  </div>
              </div>
            </aside>
          </div>
      </div>
    </div>
  );
}
