
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { allPythonTutorials } from 'contentlayer/generated';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ListOrdered, PanelLeft } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export function TutorialLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const sortedTutorials = [...allPythonTutorials].sort((a, b) => a.order - b.order);

  const SidebarContent = () => (
    <nav className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold flex items-center text-primary">
          <ListOrdered className="mr-2 h-5 w-5" />
          Python Tutorials
        </h3>
      </div>
      <ScrollArea className="flex-grow p-4">
        <ul className="space-y-1">
          {sortedTutorials.map((tutorial) => {
            const isActive = pathname === tutorial.url;
            return (
              <li key={tutorial.slug}>
                <Link
                  href={tutorial.url}
                  onClick={() => isSheetOpen && setIsSheetOpen(false)}
                  className={cn(
                    "flex items-center p-2 text-sm font-medium rounded-md transition-colors",
                    isActive ? "bg-accent text-accent-foreground" : "text-foreground/80 hover:bg-muted"
                  )}
                >
                  <span className={cn(
                      "mr-3 text-xs w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0",
                      isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                    {tutorial.order}
                  </span>
                  <span className="truncate">{tutorial.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </nav>
  );

  return (
    <div className="flex flex-col md:flex-row w-full">
      <aside className="w-72 lg:w-80 flex-shrink-0 hidden md:flex flex-col h-screen sticky top-0 border-r border-border bg-card">
        <SidebarContent />
      </aside>
      
      <div className="flex-grow flex flex-col min-w-0">
        <header className="md:hidden p-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-10 flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline">
                <PanelLeft className="h-5 w-5" />
                <span className="ml-2">Tutorial Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 bg-card">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-grow p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
