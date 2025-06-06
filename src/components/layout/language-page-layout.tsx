
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { List, ChevronRight, PanelLeft, BookOpen, Code2, GraduationCap, Lightbulb, FolderOpen } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import type { ProgrammingLanguage } from '@/lib/data';

interface LanguagePageLayoutProps extends PropsWithChildren {
  language: ProgrammingLanguage;
}

export function LanguagePageLayout({ children, language }: LanguagePageLayoutProps) {
  const pathname = usePathname();

  const sidebarNavItems = [
    ...(language.mainContent ? [{ title: 'Introduction', href: `${pathname}#introduction`, icon: BookOpen }] : []),
    ...(language.sections && language.sections.length > 0 ? [{ title: 'Core Concepts', href: `${pathname}#core-concepts`, icon: FolderOpen }] : []),
    // Individual sections as sub-items (optional future enhancement)
    // ...language.sections?.map(section => ({ title: section.title, href: `${pathname}#${section.id}`})) || [],
    ...(language.codeSnippets && language.codeSnippets.length > 0 ? [{ title: 'Examples', href: `${pathname}#examples`, icon: Code2 }] : []),
    ...(language.tutorials && language.tutorials.length > 0 ? [{ title: 'Quick Tutorials', href: `${pathname}#tutorials`, icon: GraduationCap }] : []),
    ...((language.relatedWikiArticles && language.relatedWikiArticles.length > 0) || language.officialDocumentationUrl ? [{ title: 'Resources', href: `${pathname}#resources`, icon: Lightbulb }] : []),
  ];
  
  // Add a link to the full tutorial series if it's Python (currently only Python has a dedicated tutorial section)
  const fullTutorialSeriesLink = language.slug === 'python' 
    ? { title: 'Full Python Tutorial Series', href: '/tutorial/python', icon: GraduationCap, isPrimary: true }
    : null;


  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex flex-col md:flex-row w-full">
        <Sidebar
          side="left"
          collapsible="none"
          className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:w-72 lg:w-80 flex-shrink-0 hidden md:flex flex-col"
        >
          <SidebarHeader className="p-4 border-b border-sidebar-border">
            <h3 className="text-lg font-semibold flex items-center text-sidebar-primary">
              <List className="mr-2 h-5 w-5" />
              {language.name} Topics
            </h3>
          </SidebarHeader>
          <SidebarContent className="p-0">
            <ScrollArea className="h-full p-4">
              <SidebarMenu>
                {sidebarNavItems.map((item) => {
                  const isActive = pathname + (item.href.includes('#') ? item.href.substring(item.href.indexOf('#')) : '') === item.href; // Basic active check
                  return (
                    <SidebarMenuItem key={item.title}>
                      <Link href={item.href} legacyBehavior passHref>
                        <SidebarMenuButton
                          isActive={isActive}
                          className={cn(
                            'w-full justify-start text-sm',
                            isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' : 'text-sidebar-foreground hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground'
                          )}
                        >
                          {item.icon && <item.icon className={cn("mr-2.5 h-4 w-4 flex-shrink-0", isActive ? "text-sidebar-primary" : "text-muted-foreground group-hover/menu-button:text-sidebar-primary")} />}
                          <span className="truncate">{item.title}</span>
                          {isActive && <ChevronRight className="ml-auto h-4 w-4 text-sidebar-primary flex-shrink-0" />}
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  );
                })}
                {fullTutorialSeriesLink && (
                     <SidebarMenuItem className="mt-2 pt-2 border-t border-sidebar-border/50">
                        <Link href={fullTutorialSeriesLink.href} legacyBehavior passHref>
                            <SidebarMenuButton
                            isActive={pathname.startsWith(fullTutorialSeriesLink.href)}
                            className={cn(
                                'w-full justify-start text-sm font-medium',
                                pathname.startsWith(fullTutorialSeriesLink.href) ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-primary hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground'
                            )}
                            >
                            {fullTutorialSeriesLink.icon && <fullTutorialSeriesLink.icon className="mr-2.5 h-4 w-4 flex-shrink-0" />}
                            <span className="truncate">{fullTutorialSeriesLink.title}</span>
                            <ChevronRight className="ml-auto h-4 w-4 flex-shrink-0" />
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                )}
              </SidebarMenu>
            </ScrollArea>
          </SidebarContent>
        </Sidebar>

        <div className="md:hidden">
           <Sidebar
             side="left"
             collapsible="offcanvas"
             className="border-r border-sidebar-border w-[280px]"
           >
             <SidebarHeader className="p-4 border-b border-sidebar-border">
                <h3 className="text-lg font-semibold flex items-center text-sidebar-primary">
                  <List className="mr-2 h-5 w-5" />
                  {language.name} Topics
                </h3>
            </SidebarHeader>
            <SidebarContent className="p-0">
                <ScrollArea className="h-full p-4">
                  <SidebarMenu>
                      {sidebarNavItems.map((item) => {
                      const isActive = pathname + (item.href.includes('#') ? item.href.substring(item.href.indexOf('#')) : '') === item.href;
                      return (
                          <SidebarMenuItem key={item.title}>
                            <Link href={item.href} legacyBehavior passHref>
                                <SidebarMenuButton
                                isActive={isActive}
                                className={cn(
                                    'w-full justify-start text-sm',
                                    isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' : 'text-sidebar-foreground hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground'
                                )}
                                >
                                {item.icon && <item.icon className={cn("mr-2.5 h-4 w-4 flex-shrink-0", isActive ? "text-sidebar-primary" : "text-muted-foreground group-hover/menu-button:text-sidebar-primary")} />}
                                <span className="truncate">{item.title}</span>
                                {isActive && <ChevronRight className="ml-auto h-4 w-4 text-sidebar-primary flex-shrink-0" />}
                                </SidebarMenuButton>
                            </Link>
                          </SidebarMenuItem>
                      );
                      })}
                      {fullTutorialSeriesLink && (
                        <SidebarMenuItem className="mt-2 pt-2 border-t border-sidebar-border/50">
                            <Link href={fullTutorialSeriesLink.href} legacyBehavior passHref>
                                <SidebarMenuButton
                                isActive={pathname.startsWith(fullTutorialSeriesLink.href)}
                                className={cn(
                                    'w-full justify-start text-sm font-medium',
                                    pathname.startsWith(fullTutorialSeriesLink.href) ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-primary hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground'
                                )}
                                >
                                {fullTutorialSeriesLink.icon && <fullTutorialSeriesLink.icon className="mr-2.5 h-4 w-4 flex-shrink-0" />}
                                <span className="truncate">{fullTutorialSeriesLink.title}</span>
                                <ChevronRight className="ml-auto h-4 w-4 flex-shrink-0" />
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                      )}
                  </SidebarMenu>
                </ScrollArea>
            </SidebarContent>
           </Sidebar>
        </div>

        <SidebarInset className="flex-grow min-w-0 bg-background">
          <div className="p-4 md:hidden">
            <SidebarTrigger className="border border-border bg-card hover:bg-muted">
              <PanelLeft className="h-5 w-5" />
              <span className="ml-2">{language.name} Menu</span>
            </SidebarTrigger>
          </div>
          <div className="p-1 md:p-0"> {/* Adjusted padding for content area */}
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
