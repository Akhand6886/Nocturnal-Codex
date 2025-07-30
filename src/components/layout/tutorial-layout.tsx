
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Menu, ChevronUp } from 'lucide-react';
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

  // Group tutorials by category
  const groupedTutorials = tutorials.reduce((acc, tutorial) => {
    const category = tutorial.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tutorial);
    return acc;
  }, {} as Record<string, TutorialPost[]>);

  const sidebarContent = (
    <div className="flex h-full flex-col bg-muted/20 dark:bg-card/40">
      <ScrollArea className="flex-grow">
        <nav className="p-2">
            <Accordion type="multiple" defaultValue={Object.keys(groupedTutorials)} className="w-full">
            {Object.entries(groupedTutorials).map(([category, posts]) => (
                <AccordionItem key={category} value={category} className="border-b-0">
                    <AccordionTrigger className="py-2 px-2 text-sm font-semibold text-foreground/80 hover:no-underline hover:bg-muted rounded-md [&[data-state=open]>svg]:text-primary">
                        <span className="flex-1 text-left">{category}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-1 pl-2">
                        <ul className="space-y-1">
                        {posts.map((tutorial) => {
                            const isActive = pathname === tutorial.url;
                            return (
                                <li key={tutorial.slug}>
                                    <Link
                                        href={tutorial.url}
                                        onClick={() => isSheetOpen && setIsSheetOpen(false)}
                                        className={cn(
                                            "block p-2 text-sm rounded-md transition-colors w-full text-left",
                                            isActive
                                            ? "text-primary-foreground bg-primary font-semibold"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        )}
                                    >
                                        {tutorial.title}
                                    </Link>
                                </li>
                            )
                        })}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
        </nav>
      </ScrollArea>
    </div>
  );

  return (
    <div className="w-full bg-background">
      <div className="container mx-auto px-0 md:px-4">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
          
          <aside className="hidden lg:block h-[calc(100vh-8rem)] sticky top-28 border-r">
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
        </div>
      </div>
    </div>
  );
}
