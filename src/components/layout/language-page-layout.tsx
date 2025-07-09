
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { List, PanelLeft, FileText, Star, Workflow, BookOpen, Code2, GraduationCap, Users, Lightbulb } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import type { ProgrammingLanguage } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LanguagePageLayoutProps extends PropsWithChildren {
  language: ProgrammingLanguage;
  hasTutorialSeries?: boolean;
}

export function LanguagePageLayout({ children, language, hasTutorialSeries = false }: LanguagePageLayoutProps) {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const sidebarNavigation = (
    <nav className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold flex items-center text-primary">
          <List className="mr-2 h-5 w-5" />
          {language.name} Sections
        </h3>
      </div>
      
    </nav>
  );

  return (
    <div className="flex-1 md:grid md:grid-cols-[280px_1fr]">
      <aside className="h-full hidden md:flex md:flex-col sticky top-0 border-r border-border bg-card">
        {sidebarNavigation}
      </aside>

      <div className="flex-grow flex flex-col min-w-0">
        <header className="md:hidden p-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-10 flex items-center">
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
