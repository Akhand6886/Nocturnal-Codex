
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { allPythonTutorials, type PythonTutorial } from 'contentlayer/generated';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ListOrdered, ChevronRight, GraduationCap } from 'lucide-react';
import type { PropsWithChildren } from 'react';

export function TutorialLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const sortedTutorials = [...allPythonTutorials].sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
      <aside className="w-full md:w-72 lg:w-80 flex-shrink-0 md:sticky md:top-20 md:max-h-[calc(100vh-5rem)]">
        <div className="p-5 rounded-xl shadow-lg bg-card border border-border/60">
          <h3 className="text-lg font-semibold mb-4 pb-3 border-b border-border/80 flex items-center text-primary">
            <ListOrdered className="mr-2 h-5 w-5" />
            Python Tutorials
          </h3>
          <ScrollArea className="h-auto md:h-[calc(100vh-12rem)] pr-3"> {/* Adjust height as needed */}
            <nav>
              <ul>
                {sortedTutorials.map((tutorial) => {
                  const isActive = pathname === tutorial.url;
                  return (
                    <li key={tutorial.slug} className="mb-1.5 last:mb-0">
                      <Link
                        href={tutorial.url}
                        className={cn(
                          'group flex items-center justify-between p-2.5 rounded-md text-sm transition-all duration-200 ease-in-out',
                          isActive
                            ? 'bg-primary/15 text-primary font-medium shadow-sm border border-primary/30'
                            : 'text-foreground/80 hover:bg-accent/10 hover:text-primary hover:border-accent/50 border border-transparent'
                        )}
                      >
                        <div className="flex items-center">
                           <span className={cn("mr-2.5 text-xs w-5 h-5 flex items-center justify-center rounded-full", isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary")}>
                            {tutorial.order}
                          </span>
                          <span className="flex-1">{tutorial.title}</span>
                        </div>
                        {isActive && <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />}
                        {!isActive && <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-70 transition-opacity duration-200 flex-shrink-0" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </ScrollArea>
        </div>
      </aside>
      <main className="flex-grow min-w-0"> 
        {children}
      </main>
    </div>
  );
}
