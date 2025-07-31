// src/components/layout/tutorial-sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import type { TutorialPost } from 'contentlayer/generated';

interface TutorialSidebarProps {
  tutorials: TutorialPost[];
  language: string;
}

export function TutorialSidebar({ tutorials, language }: TutorialSidebarProps) {
  const pathname = usePathname();

  const groupedTutorials = tutorials.reduce((acc, tutorial) => {
    const category = tutorial.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tutorial);
    return acc;
  }, {} as Record<string, typeof tutorials>);

  const sortedCategories = Object.keys(groupedTutorials).sort((a, b) => {
    // A simple sort to keep categories in a consistent order.
    // Can be replaced with a more sophisticated ordering system if needed.
    return a.localeCompare(b);
  });
  
  // Determine default open accordions based on the current path
  const defaultValues = sortedCategories.filter(category => {
    return groupedTutorials[category].some(tutorial => pathname === tutorial.url);
  });

  return (
    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
       <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-border pr-2">
        <Accordion type="multiple" defaultValue={defaultValues} className="w-full">
            {sortedCategories.map((category) => (
                <AccordionItem value={category} key={category} className="border-b-0">
                    <AccordionTrigger className="py-2 px-3 text-sm font-semibold text-foreground/80 hover:no-underline hover:bg-muted/50 rounded-md">
                        {category}
                    </AccordionTrigger>
                    <AccordionContent className="pl-4 border-l border-border/70 ml-3">
                        <ul className="space-y-1 py-1">
                        {groupedTutorials[category].map((tutorial) => (
                            <li key={tutorial.slug}>
                            <Link
                                href={tutorial.url}
                                className={cn(
                                'block w-full py-1.5 px-3 text-sm rounded-md transition-colors',
                                pathname === tutorial.url
                                    ? 'bg-primary text-primary-foreground font-semibold'
                                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                )}
                            >
                                {tutorial.title}
                            </Link>
                            </li>
                        ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </aside>
  );
}
