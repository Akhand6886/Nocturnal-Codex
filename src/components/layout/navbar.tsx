"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Aperture, ChevronDown, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, MOCK_TOPICS } from "@/lib/data"; // Assuming MOCK_TOPICS is for dropdown
import { useState, useEffect } from "react";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export function Navbar() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [dynamicNavItems, setDynamicNavItems] = useState<NavItem[]>(NAV_ITEMS);

  useEffect(() => {
    // Simulating dynamic topic loading for dropdown
    const topicsNavItems = MOCK_TOPICS.map(topic => ({ label: topic.name, href: `/topics/${topic.slug}` }));
    const updatedNavItems = NAV_ITEMS.map(item => 
      item.label === "Topics" ? { ...item, children: topicsNavItems } : item
    );
    setDynamicNavItems(updatedNavItems);
  }, []);


  const renderNavItem = (item: NavItem, isMobile = false) => {
    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

    if (item.children && item.children.length > 0) {
      return (
        <DropdownMenu key={item.label}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive ? "text-primary" : "text-foreground/80",
                isMobile ? "w-full justify-start px-4 py-2" : "px-3 py-2"
              )}
            >
              {item.label}
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isMobile ? "start" : "center"} className="bg-background border-border shadow-lg">
            {item.children.map((child) => (
              <DropdownMenuItem key={child.label} asChild>
                <Link
                  href={child.href}
                  className={cn(
                    "block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                     pathname === child.href ? "bg-accent text-accent-foreground" : "text-foreground/90"
                  )}
                  onClick={() => isMobile && setIsSheetOpen(false)}
                >
                  {child.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Link
        key={item.label}
        href={item.href}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-foreground/80",
          isMobile ? "block px-4 py-2" : "px-3 py-2"
        )}
        onClick={() => isMobile && setIsSheetOpen(false)}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Aperture className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block text-foreground">
            Nocturnal Codex
          </span>
        </Link>
        
        <nav className="hidden md:flex flex-1 items-center space-x-2">
          {dynamicNavItems.map((item) => renderNavItem(item))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2 md:flex-none">
          <ThemeToggle />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] bg-background p-0">
              <div className="flex flex-col p-6">
                <Link href="/" className="mb-6 flex items-center space-x-2" onClick={() => setIsSheetOpen(false)}>
                  <Aperture className="h-6 w-6 text-primary" />
                  <span className="font-bold">Nocturnal Codex</span>
                </Link>
                <nav className="flex flex-col space-y-1">
                  {dynamicNavItems.map((item) => renderNavItem(item, true))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
