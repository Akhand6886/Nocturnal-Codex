
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SimpleIcon } from '@/components/common/simple-icon';

// Faked types since contentlayer is gone
interface TutorialPost {
    slug: string;
    url: string;
    title: string;
    category?: string;
    order: number;
}
interface LanguagePost {
    slug: string;
    iconName?: string;
    name: string;
}

interface TutorialSidebarProps {
  tutorials: TutorialPost[];
  currentLanguage: string;
}

// Faked data since contentlayer is gone
const allLanguagePosts: LanguagePost[] = [];

export function TutorialSidebar({ tutorials, currentLanguage }: TutorialSidebarProps) {
  const pathname = usePathname();
  const language = allLanguagePosts.find(lang => lang.slug === currentLanguage);

  const groupedTutorials = tutorials.reduce((acc, tutorial) => {
    const category = tutorial.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tutorial);
    return acc;
  }, {} as Record<string, TutorialPost[]>);

  // Sort tutorials within each category by their order property
  for (const category in groupedTutorials) {
    groupedTutorials[category].sort((a, b) => a.order - b.order);
  }

  // Sort the categories based on the minimum order of tutorials within them
  const sortedCategories = Object.keys(groupedTutorials).sort((a, b) => {
    const getMinOrder = (categoryName: string): number => {
      const tutorialsInCategory = groupedTutorials[categoryName];
      if (!tutorialsInCategory || tutorialsInCategory.length === 0) {
        return Infinity;
      }
      return tutorialsInCategory.reduce((min, t) => Math.min(min, t.order), Infinity);
    };

    const orderA = getMinOrder(a);
    const orderB = getMinOrder(b);
    
    if (orderA !== Infinity && orderB !== Infinity) {
      return orderA - orderB;
    }
    // Fallback to localeCompare if orders are not available
    return a.localeCompare(b);
  });

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-5rem)] w-64 flex-shrink-0 md:block">
      <ScrollArea className="h-full pr-4">
        <div className="mb-6 flex items-center gap-3">
            {language && <SimpleIcon iconName={language.iconName || 'code'} className="w-8 h-8 text-primary" />}
            <h3 className="text-lg font-semibold text-foreground">{language?.name || currentLanguage} Tutorials</h3>
        </div>
        <div className="space-y-6">
          {sortedCategories.map((category) => (
            <div key={category}>
              <h4 className="mb-2 text-sm font-semibold text-muted-foreground">{category}</h4>
              <ul className="space-y-1">
                {groupedTutorials[category].map((tutorial) => (
                  <li key={tutorial.slug}>
                    <Link
                      href={tutorial.url}
                      className={cn(
                        'block rounded-md px-3 py-1.5 text-sm transition-colors',
                        pathname === tutorial.url
                          ? 'bg-primary/10 font-semibold text-primary'
                          : 'text-foreground/80 hover:bg-muted/50 hover:text-foreground'
                      )}
                    >
                      {tutorial.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
