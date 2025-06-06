
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { allPythonTutorials } from 'contentlayer/generated';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ListOrdered, ChevronRight, PanelLeft } from 'lucide-react'; // Added PanelLeft for trigger
import type { PropsWithChildren } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarTrigger, // Import SidebarTrigger
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'; // Import necessary sidebar components

export function TutorialLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const sortedTutorials = [...allPythonTutorials].sort((a, b) => a.order - b.order);

  return (
    <SidebarProvider defaultOpen={true}> {/* Ensures sidebar is open by default on desktop */}
      <div className="flex flex-col md:flex-row"> {/* Ensure main container uses flex */}
        <Sidebar side="left" collapsible="none" className="border-r border-sidebar-border md:w-72 lg:w-80 flex-shrink-0 hidden md:flex flex-col"> {/* collapsible="none" for always visible desktop, hidden on mobile by default, md:flex to show on medium screens up */}
          <SidebarHeader className="p-4 border-b border-sidebar-border">
            <h3 className="text-lg font-semibold flex items-center text-sidebar-primary">
              <ListOrdered className="mr-2 h-5 w-5" />
              Python Tutorials
            </h3>
          </SidebarHeader>
          <SidebarContent className="p-0"> {/* Remove padding from SidebarContent if ScrollArea handles it */}
            <ScrollArea className="h-full p-4"> {/* Add padding to ScrollArea content */}
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

        {/* This is for the mobile sheet version of the sidebar */}
        <div className="md:hidden"> {/* This ensures the sheet version of Sidebar is only for mobile logic from ui/sidebar */}
           <Sidebar side="left" collapsible="offcanvas" className="border-r border-sidebar-border w-[280px]">
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
                            onClick={() => {
                                // Assuming useSidebar() hook provides setOpenMobile if this were inside SidebarProvider context directly for mobile sheet
                                // For now, this click is for navigation. The sheet closure is handled by SheetContent in ui/sidebar.
                            }}
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


        <SidebarInset className="flex-grow min-w-0"> {/* Ensures main content takes remaining space */}
          <div className="p-4 md:hidden"> {/* Mobile trigger - only show on small screens */}
            <SidebarTrigger className="border border-border">
              <PanelLeft className="h-5 w-5" />
              <span className="ml-2">Tutorial Menu</span>
            </SidebarTrigger>
          </div>
          <div className="p-0 md:p-6"> {/* Adjust padding for main content area */}
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
