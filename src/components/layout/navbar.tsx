
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Eye, Menu } from "lucide-react"; // Changed Aperture to Eye
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
import { NAV_ITEMS, MOCK_TOPICS } from "@/lib/data"; 
import { useState, useMemo } from "react"; // Changed useEffect to useMemo

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export function Navbar() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const dynamicNavItems = useMemo(() => {
    const topicsNavItems = MOCK_TOPICS.map(topic => ({ label: topic.name, href: `/topics/${topic.slug}` }));
    return NAV_ITEMS.map(item => 
      item.label === "Topics" ? { ...item, children: topicsNavItems } : item
    );
  }, []); // Dependencies MOCK_TOPICS and NAV_ITEMS are constant, so empty array is appropriate.


  const renderNavItem = (item: NavItem, isMobile = false) => {
    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

    if (item.children && item.children.length > 0) {
      return (
        <DropdownMenu key={item.label}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary focus:text-primary",
                isActive ? "text-primary font-semibold" : "text-foreground/80",
                isMobile ? "w-full justify-start px-4 py-2.5 text-base" : "px-3 py-2" 
              )}
            >
              {item.label}
              <ChevronDown className={cn("ml-1.5 h-4 w-4 transition-transform duration-200", {"rotate-180": isActive /* conceptual for open state */})} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align={isMobile ? "start" : "center"} 
            className="bg-popover border-border/70 shadow-xl w-60 md:w-auto rounded-lg"
            sideOffset={isMobile ? 10 : 8} 
          >
            {item.children.map((child) => (
              <DropdownMenuItem key={child.label} asChild className="py-2 px-3 rounded-md">
                <Link
                  href={child.href}
                  className={cn(
                    "block text-sm hover:bg-accent/80 hover:text-accent-foreground",
                     pathname === child.href ? "bg-accent text-accent-foreground font-medium" : "text-popover-foreground"
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
          "text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none focus:ring-1 focus:ring-primary/50 rounded-md",
          isActive ? "text-primary font-semibold" : "text-foreground/80",
          isMobile ? "block px-4 py-2.5 text-base" : "px-3 py-2"
        )}
        onClick={() => isMobile && setIsSheetOpen(false)}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-lg supports-[backdrop-filter]:bg-background/75">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Logo and Site Name */}
        <Link href="/" className="mr-6 flex items-center space-x-2.5 group">
          <Eye className="h-7 w-7 text-primary group-hover:animate-spin-slow transition-transform duration-300" /> {/* Reverted to Eye */}
          <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-200">
            Nocturnal Codex
          </span>
        </Link>
        
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1.5 ml-auto md:ml-6">
          {dynamicNavItems.map((item) => renderNavItem(item))}
        </nav>

        {/* Spacer to push controls to the right on desktop */}
        <div className="hidden md:block flex-1"></div>

        {/* Right side controls (Theme Toggle and Mobile Menu) */}
        <div className="flex items-center space-x-2 ml-auto md:ml-0">
          <ThemeToggle />
          
          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle Menu" className="hover:bg-accent/20">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-background p-0 pt-8 shadow-2xl border-r-border/70">
                <Link 
                  href="/" 
                  className="mb-8 flex items-center space-x-2.5 px-6 group" 
                  onClick={() => setIsSheetOpen(false)}
                >
                  <Eye className="h-7 w-7 text-primary group-hover:animate-spin-slow" /> {/* Reverted to Eye */}
                  <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">Nocturnal Codex</span>
                </Link>
                <nav className="flex flex-col space-y-1.5 px-4">
                  {dynamicNavItems.map((item) => renderNavItem(item, true))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
