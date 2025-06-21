
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
}

export function LanguagePageLayout({ children, language }: LanguagePageLayoutProps) {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const baseLanguagePath = `/languages/${language.slug}`;

  const navItems = [
    ...(language.mainContent ? [{ id: 'introduction', title: 'Introduction', href: `${baseLanguagePath}#introduction`, icon: FileText }] : []),
    ...(language.keyFeatures && language.keyFeatures.length > 0 ? [{ id: 'key-features', title: 'Key Features', href: `${baseLanguagePath}#key-features`, icon: Star }] : []),
    ...(language.useCases && language.useCases.length > 0 ? [{ id: 'use-cases', title: 'Use Cases', href: `${baseLanguagePath}#use-cases`, icon: Workflow }] : []),
    ...(language.sections && language.sections.length > 0 ? [{ id: 'core-concepts', title: 'Core Concepts', href: `${baseLanguagePath}#core-concepts`, icon: BookOpen }] : []),
    ...(language.codeSnippets && language.codeSnippets.length > 0 ? [{ id: 'code-examples', title: 'Code Examples', href: `${baseLanguagePath}#code-examples`, icon: Code2 }] : []),
    ...(language.tutorials && language.tutorials.length > 0 ? [{ id: 'learning-resources', title: 'Learning Resources', href: `${baseLanguagePath}#learning-resources`, icon: GraduationCap }] : []),
    ...((language.officialDocumentationUrl || (language.communityLinks && language.communityLinks.length > 0)) ? [{ id: 'documentation-community', title: 'Docs & Community', href: `${baseLanguagePath}#documentation-community`, icon: Users }] : []),
    ...(language.relatedWikiArticles && language.relatedWikiArticles.length > 0 ? [{ id: 'related-content', title: 'Related Content', href: `${baseLanguagePath}#related-content`, icon: Lightbulb }] : []),
  ];

  const fullTutorialSeriesLink = language.slug === 'python'
    ? { title: 'Full Python Tutorial Series', href: '/tutorial/python', icon: GraduationCap, id: 'full-python-tutorials' }
    : null;

  const SidebarContent = () => (
    <nav className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold flex items-center text-primary">
          <List className="mr-2 h-5 w-5" />
          {language.name} Sections
        </h3>
      </div>
      <ScrollArea className="flex-grow p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = typeof window !== 'undefined' && window.location.hash === `#${item.id}`;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => isSheetOpen && setIsSheetOpen(false)}
                  className={cn(
                    "flex items-center p-2 text-sm font-medium rounded-md transition-colors",
                    isActive ? "bg-accent text-accent-foreground" : "text-foreground/80 hover:bg-muted"
                  )}
                >
                  {item.icon && <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />}
                  <span className="truncate">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        {fullTutorialSeriesLink && (
          <>
            <div className="my-4 border-t border-border" />
            <ul>
              <li>
                <Link
                  href={fullTutorialSeriesLink.href}
                  onClick={() => isSheetOpen && setIsSheetOpen(false)}
                  className={cn(
                    "flex items-center p-2 text-sm font-medium rounded-md transition-colors text-primary bg-primary/10 hover:bg-primary/20",
                    pathname.startsWith(fullTutorialSeriesLink.href) && "font-bold ring-1 ring-primary"
                  )}
                >
                  {fullTutorialSeriesLink.icon && <fullTutorialSeriesLink.icon className="mr-3 h-4 w-4 flex-shrink-0" />}
                  <span className="truncate">{fullTutorialSeriesLink.title}</span>
                </Link>
              </li>
            </ul>
          </>
        )}
      </ScrollArea>
    </nav>
  );

  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Desktop Sidebar */}
      <aside className="w-72 lg:w-80 flex-shrink-0 hidden md:flex flex-col h-screen sticky top-0 border-r border-border bg-card">
        <SidebarContent />
      </aside>
      
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Mobile Header with Sheet Trigger */}
        <header className="md:hidden p-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-10 flex items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline">
                <PanelLeft className="h-5 w-5" />
                <span className="ml-2">{language.name} Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 bg-card">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
