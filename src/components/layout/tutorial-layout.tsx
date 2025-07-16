
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Menu, ArrowRight } from 'lucide-react';
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

  const sidebarContent = (
    <div className="flex h-full flex-col bg-[#f0f0f0] dark:bg-slate-900 border-r border-border">
      <header className="p-4 border-b border-border bg-white dark:bg-slate-800">
        <Link href={`/languages/${language.slug}`} className="flex items-center gap-3 group">
          <Image src={language.iconUrl} alt={language.name} width={40} height={40} data-ai-hint={language.dataAiHint} />
          <div>
            <h2 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{language.name}</h2>
            <p className="text-xs text-muted-foreground">Programming Language</p>
          </div>
        </Link>
      </header>
      <ScrollArea className="flex-grow">
        <nav className="p-2">
          <ul>
            <li>
              <Link
                  href="/tutorial/python"
                  className={cn(
                      "flex items-center justify-between p-2 text-sm rounded-md transition-colors w-full text-left font-semibold mb-1",
                      pathname === `/tutorial/python`
                      ? "bg-green-200 dark:bg-green-900/40 text-green-800 dark:text-green-300"
                      : "text-foreground/80 hover:bg-muted"
                  )}
                  onClick={() => isSheetOpen && setIsSheetOpen(false)}
              >
                  Python - Home
                  {pathname === `/tutorial/python` && <ArrowRight className="h-4 w-4 text-green-600 dark:text-green-400"/>}
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
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            {tutorial.title}
                        </Link>
                    </li>
                )
            })}
          </ul>
        </nav>
      </ScrollArea>
    </div>
  );

  return (
    <div className="w-full bg-background">
      <div className="container mx-auto px-0 md:px-4">
        <div className="lg:grid lg:grid-cols-[250px_1fr_180px] lg:gap-8">
          
          <aside className="hidden lg:block h-screen sticky top-0 pt-16">
            {sidebarContent}
          </aside>
          
          <div className="flex-grow flex flex-col min-w-0">
             <header className="lg:hidden p-4 border-b border-border sticky top-16 bg-background/95 backdrop-blur-sm z-10 flex items-center">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                    <Button variant="outline" aria-label="Open Tutorial Menu">
                        <Menu className="h-5 w-5" />
                        <span className="ml-2">Tutorial Menu</span>
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] p-0 bg-card border-r">
                        {sidebarContent}
                    </SheetContent>
                </Sheet>
            </header>
            <main className="flex-grow p-4 md:p-8">
              {children}
            </main>
          </div>

          <aside className="hidden lg:block h-screen sticky top-0 pt-16">
            <div className="flex flex-col space-y-4 p-2">
                <div className="bg-slate-200 dark:bg-slate-700 p-4 rounded-md text-center">
                    <Image src="https://placehold.co/160x200.png" width={160} height={200} alt="DevOps Ad" data-ai-hint="advertisement banner"/>
                </div>
                <div className="bg-slate-200 dark:bg-slate-700 p-4 rounded-md text-center">
                    <Image src="https://placehold.co/160x200.png" width={160} height={200} alt="DevOps Ad 2" data-ai-hint="advertisement banner"/>
                </div>
                <div className="bg-slate-200 dark:bg-slate-700 p-4 rounded-md text-center">
                    <Image src="https://placehold.co/160x200.png" width={160} height={200} alt="TutorialsPoint Ad" data-ai-hint="advertisement banner"/>
                </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
