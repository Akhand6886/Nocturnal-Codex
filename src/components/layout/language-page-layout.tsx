
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { List, PanelLeft } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import type { ProgrammingLanguage } from '@/lib/data';
import type { TutorialPost } from 'contentlayer/generated';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';

interface LanguagePageLayoutProps extends PropsWithChildren {
  language: ProgrammingLanguage;
  tutorials: TutorialPost[];
}

export function LanguagePageLayout({ children, language, tutorials }: LanguagePageLayoutProps) {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const sidebarNavigation = (
    <nav className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 border-r border-border">
       <header className="p-4 border-b border-border">
        <Link href={`/languages/${language.slug}`} className="flex items-center gap-3 group">
          <Image src={language.iconUrl} alt={language.name} width={40} height={40} data-ai-hint={language.dataAiHint} />
          <div>
            <h2 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{language.name}</h2>
            <p className="text-xs text-muted-foreground">Language Overview</p>
          </div>
        </Link>
      </header>
      <ScrollArea className="flex-grow p-2">
         {tutorials.length > 0 && (
          <ul>
            <li className="px-2 py-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tutorial Series</p>
            </li>
            <li>
              <Link
                href={`/tutorial/${language.slug}`}
                className={cn(
                    "block p-2 text-sm rounded-md transition-colors w-full text-left font-medium",
                    pathname === `/tutorial/${language.slug}`
                     ? "text-primary bg-primary/10"
                     : "text-foreground/80 hover:bg-accent/50"
                )}
                onClick={() => isSheetOpen && setIsSheetOpen(false)}
              >
                Series Home
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
                        ? "text-primary bg-primary/10 font-medium"
                        : "text-foreground/70 hover:bg-accent/50"
                    )}
                  >
                    {tutorial.title}
                  </Link>
                </li>
              );
            })}
          </ul>
         )}
      </ScrollArea>
    </nav>
  );

  return (
    <div className="flex-1 md:grid md:grid-cols-[280px_1fr]">
      <aside className="h-[calc(100vh-4rem)] hidden md:flex md:flex-col sticky top-16">
        {sidebarNavigation}
      </aside>

      <div className="flex-grow flex flex-col min-w-0">
        <header className="md:hidden p-4 border-b border-border sticky top-16 bg-background/80 backdrop-blur-sm z-10 flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline">
                <PanelLeft className="h-5 w-5" />
                <span className="ml-2">{language.name} Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 bg-card">
              {sidebarNavigation}
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
}
