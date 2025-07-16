
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
    <div className="flex h-full flex-col bg-[#f5f5f5] dark:bg-slate-900/50">
      <header className="p-4 bg-white dark:bg-card">
        <Link href={`/languages/${language.slug}`} className="group">
            <Image 
                src="https://placehold.co/220x80.png" 
                width={220} 
                height={80} 
                alt={`${language.name} Programming Language`} 
                data-ai-hint="python logo"
                className="w-full h-auto"
            />
        </Link>
      </header>
      <ScrollArea className="flex-grow">
        <nav className="p-2">
          <ul>
            {tutorials.map((tutorial) => {
                const isActive = pathname === tutorial.url;
                return (
                    <li key={tutorial.slug}>
                        <Link
                            href={tutorial.url}
                            onClick={() => isSheetOpen && setIsSheetOpen(false)}
                            className={cn(
                                "flex items-center justify-between p-2 pl-3 text-sm rounded-md transition-colors w-full text-left",
                                isActive
                                ? "text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/40 font-semibold"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <span>{tutorial.title}</span>
                            {isActive && <ArrowRight className="h-4 w-4 text-green-600 dark:text-green-400"/>}
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
        <div className="lg:grid lg:grid-cols-[250px_1fr] lg:gap-8">
          
          <aside className="hidden lg:block h-[calc(100vh-8rem)] sticky top-28">
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
