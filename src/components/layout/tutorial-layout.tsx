
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { allPythonTutorials } from 'contentlayer/generated';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ListOrdered, ChevronRight, PanelLeft } from 'lucide-react';
import type { PropsWithChildren } from 'react';
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

export function TutorialLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const sortedTutorials = [...allPythonTutorials].sort((a, b) => a.order - b.order);

  return (
    <SidebarProvider defaultOpen={true}> {/* defaultOpen for desktop sidebar state */}
      <div className="flex flex-col md:flex-row w-full"> {/* Ensures the layout takes full width and arranges children in a row on md+ */}
        
        {/* Desktop Sidebar: Visible on md screens and up, part of the flex row */}
        <Sidebar
          side="left"
          collapsible="none" // This variant is a simple div, relies on parent flex for positioning
          className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:w-72 lg:w-80 flex-shrink-0 hidden md:flex flex-col"
        >
          <SidebarHeader className="p-4 border-b border-sidebar-border">
            <h3 className="text-lg font-semibold flex items-center text-sidebar-primary">
              <ListOrdered className="mr-2 h-5 w-5" />
              Python Tutorials
            </h3>
          </SidebarHeader>
          <SidebarContent className="p-0">
            <ScrollArea className="h-full p-4">
              <SidebarMenu>
                {sortedTutorials.map((tutorial) => {
                  const isActive = pathname === tutorial.url;
                  return (
                    <SidebarMenuItem key={tutorial.slug}>
                      <Link href={tutorial.url} legacyBehavior passHref>
                        <SidebarMenuButton
                          isActive={isActive}
                          className={cn(
                            'w-full justify-start text-sm',
                            isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' : 'text-sidebar-foreground hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground'
                          )}
                        >
                          <span className={cn(
                            "mr-2.5 text-xs w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0",
                            isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "bg-muted text-muted-foreground group-hover/menu-button:bg-sidebar-primary/20 group-hover/menu-button:text-sidebar-primary"
                          )}>
                            {tutorial.order}
                          </span>
                          <span className="truncate">{tutorial.title}</span>
                          {isActive && <ChevronRight className="ml-auto h-4 w-4 text-sidebar-primary flex-shrink-0" />}
                        </SidebarMenuButton>
                      </Link>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </ScrollArea>
          </SidebarContent>
        </Sidebar>

        {/* Mobile Sidebar: Renders as a Sheet, hidden on md screens and up */}
        <div className="md:hidden">
           <Sidebar
             side="left" // Ensures the sheet opens from the left
             collapsible="offcanvas" // Triggers the Sheet behavior in ui/sidebar.tsx for mobile
             className="border-r border-sidebar-border w-[280px]" // Width for the Sheet
           >
             <SidebarHeader className="p-4 border-b border-sidebar-border">
                <h3 className="text-lg font-semibold flex items-center text-sidebar-primary">
                  <ListOrdered className="mr-2 h-5 w-5" />
                  Python Tutorials
                </h3>
            </SidebarHeader>
            <SidebarContent className="p-0">
                <ScrollArea className="h-full p-4">
                  <SidebarMenu>
                      {sortedTutorials.map((tutorial) => {
                      const isActive = pathname === tutorial.url;
                      return (
                          <SidebarMenuItem key={tutorial.slug}>
                            <Link href={tutorial.url} legacyBehavior passHref>
                                <SidebarMenuButton
                                isActive={isActive}
                                className={cn(
                                    'w-full justify-start text-sm',
                                    isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' : 'text-sidebar-foreground hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground'
                                )}
                                // onClick={() => {}} // Sheet closure handled by ui/sidebar's SheetContent
                                >
                                <span className={cn(
                                    "mr-2.5 text-xs w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0",
                                    isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "bg-muted text-muted-foreground group-hover/menu-button:bg-sidebar-primary/20 group-hover/menu-button:text-sidebar-primary"
                                )}>
                                    {tutorial.order}
                                </span>
                                <span className="truncate">{tutorial.title}</span>
                                {isActive && <ChevronRight className="ml-auto h-4 w-4 text-sidebar-primary flex-shrink-0" />}
                                </SidebarMenuButton>
                            </Link>
                          </SidebarMenuItem>
                      );
                      })}
                  </SidebarMenu>
                </ScrollArea>
            </SidebarContent>
           </Sidebar>
        </div>

        {/* Main Content Area */}
        <SidebarInset className="flex-grow min-w-0 bg-background"> {/* Ensures content area takes remaining space */}
          <div className="p-4 md:hidden"> {/* Mobile trigger - only show on small screens */}
            <SidebarTrigger className="border border-border bg-card hover:bg-muted">
              <PanelLeft className="h-5 w-5" />
              <span className="ml-2">Tutorial Menu</span>
            </SidebarTrigger>
          </div>
          <div className="p-1 md:p-6"> {/* Content padding */}
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
