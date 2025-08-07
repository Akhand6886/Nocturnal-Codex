
// src/components/layout/tutorial-sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import type { TutorialPost } from 'contentlayer/generated';

interface TutorialSidebarProps {
  groupedTutorials: Record<string, TutorialPost[]>;
}

export function TutorialSidebar({ groupedTutorials }: TutorialSidebarProps) {
  const pathname = usePathname();

  const sortedCategories = Object.keys(groupedTutorials).sort((a, b) => {
    // Find the minimum order number in each category to determine its position
    const minOrderA = Math.min(...groupedTutorials[a].map(p => p.order));
    const minOrderB = Math.min(...groupedTutorials[b].map(p => p.order));
    return minOrderA - minOrderB;
  });
  
  // To expand all categories by default, we pass all sorted category names to defaultValue.
  const defaultExpandedCategories = sortedCategories;

  return (
    <nav className="w-full">
      <Accordion type="multiple" defaultValue={defaultExpandedCategories} className="w-full">
          {sortedCategories.map((category) => (
              <AccordionItem value={category} key={category} className="border-b-0 mb-1">
                  <AccordionTrigger className="py-2 px-3 text-sm font-semibold text-foreground/80 hover:no-underline hover:bg-muted/50 rounded-md data-[state=open]:bg-muted/60">
                      {category}
                  </AccordionTrigger>
                  <AccordionContent className="pl-3 mt-1 space-y-1">
                      {groupedTutorials[category].map((tutorial) => (
                          <li key={tutorial.slug} className="list-none">
                          <Link
                              href={tutorial.url}
                              className={cn(
                              'block w-full py-1.5 px-3 text-sm rounded-md transition-colors',
                              pathname === tutorial.url
                                  ? 'bg-primary text-primary-foreground font-medium'
                                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                              )}
                          >
                              {tutorial.title}
                          </Link>
                          </li>
                      ))}
                  </AccordionContent>
              </AccordionItem>
          ))}
      </Accordion>
    </nav>
  );
}
