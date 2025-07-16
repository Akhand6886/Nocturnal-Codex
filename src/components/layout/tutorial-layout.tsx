
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface TutorialLayoutProps extends PropsWithChildren {
    language: ProgrammingLanguage;
    tutorials: TutorialPost[];
}

export function TutorialLayout({ children, language, tutorials }: TutorialLayoutProps) {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const introductionPost = tutorials.find(t => t.order === 1);
  const basicTutorials = tutorials.filter(t => t.order > 1);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 border-r border-border">
      <header className="p-4 border-b border-border">
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
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                      : "text-foreground/80 hover:bg-muted"
                  )}
                  onClick={() => isSheetOpen && setIsSheetOpen(false)}
              >
                  Python - Home
                  {pathname === `/tutorial/python` && <ArrowRight className="h-4 w-4 text-green-500"/>}
              </Link>
            </li>
            {introductionPost && (
                 <li>
                    <Link
                        href={introductionPost.url}
                        className={cn(
                            "flex items-center justify-between p-2 text-sm rounded-md transition-colors w-full text-left font-semibold mb-1",
                            pathname === introductionPost.url
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            : "text-foreground/80 hover:bg-muted"
                        )}
                        onClick={() => isSheetOpen && setIsSheetOpen(false)}
                    >
                        {introductionPost.title}
                        {pathname === introductionPost.url && <ArrowRight className="h-4 w-4 text-green-500"/>}
                    </Link>
                </li>
            )}
          </ul>
          <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
            <AccordionItem value="item-1" className="border-b-0">
              <AccordionTrigger className="text-sm font-semibold text-foreground/80 hover:no-underline hover:text-primary p-2">
                Python Basics
              </AccordionTrigger>
              <AccordionContent className="pl-4">
                <ul>
                  {basicTutorials.map((tutorial) => {
                    const isActive = pathname === tutorial.url;
                    return (
                      <li key={tutorial.slug}>
                        <Link
                          href={tutorial.url}
                          onClick={() => isSheetOpen && setIsSheetOpen(false)}
                          className={cn(
                            "flex items-center justify-between p-2 text-sm rounded-md transition-colors w-full text-left",
                            isActive
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {tutorial.title}
                          {isActive && <ArrowRight className="h-4 w-4 text-green-500"/>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>
      </ScrollArea>
    </div>
  );

  return (
    <div className="w-full bg-background">
      <div className="container mx-auto px-0 md:px-4">
        <div className="lg:grid lg:grid-cols-[250px_1fr] lg:gap-8">
          
          <aside className="hidden lg:block h-[calc(100vh-4rem)] sticky top-16">
            <SidebarContent />
          </aside>
          
          <div className="flex-grow flex flex-col min-w-0 bg-card md:shadow-md md:rounded-lg md:border md:my-4">
             <header className="lg:hidden p-4 border-b border-border sticky top-16 bg-background/95 backdrop-blur-sm z-10 flex items-center">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                    <Button variant="outline" aria-label="Open Tutorial Menu">
                        <Menu className="h-5 w-5" />
                        <span className="ml-2">Tutorial Menu</span>
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] p-0 bg-card border-r">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </header>
            <main className="flex-grow p-4 md:p-8">
              {children}
            </main>
          </div>

        </div>
      </div>
    </div>
  );
}
