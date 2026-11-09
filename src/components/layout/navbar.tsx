"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Eye, Menu } from "lucide-react";
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
import { NAV_ITEMS } from "@/lib/data";
import { useState } from "react";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export function Navbar() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const renderNavItem = (item: NavItem, isMobile = false) => {
    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

    if (item.children && item.children.length > 0) {
      return (
        <DropdownMenu key={item.label}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "text-xs font-medium tracking-wide transition-all duration-150 rounded-md",
                isMobile
                  ? "w-full justify-start px-3 py-2 text-sm" 
                  : "px-2.5 py-1.5 h-8", 
                isActive
                  ? (isMobile ? "text-primary font-semibold bg-[#181818]" : "text-foreground font-semibold bg-[#181818] border border-[#272727]")
                  : (isMobile ? "text-muted-foreground" : "text-muted-foreground hover:text-foreground hover:bg-[#181818]/80") 
              )}
            >
              {item.label}
              <ChevronDown className={cn(
                  "ml-1 h-3.5 w-3.5 opacity-60 transition-transform duration-200",
                  isActive && !isMobile ? "text-primary opacity-100" : ""
                )} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align={isMobile ? "start" : "center"}
            className="bg-[#181818] border-[#272727] shadow-2xl w-56 rounded-md p-1"
            sideOffset={isMobile ? 8 : 10} 
          >
            {item.children.map((child) => (
              <DropdownMenuItem key={child.label} asChild className="py-1.5 px-2.5 rounded text-xs">
                <Link
                  href={child.href}
                  className={cn(
                    "block hover:bg-[#272727] hover:text-foreground transition-colors",
                     pathname === child.href ? "bg-[#272727] text-foreground font-medium" : "text-muted-foreground"
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
          "text-xs font-medium tracking-wide transition-all duration-150 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/60",
          isMobile
            ? "block px-3 py-2 text-sm" 
            : "px-2.5 py-1.5 h-8 inline-flex items-center", 
          isActive
            ? (isMobile ? "text-primary font-semibold bg-[#181818]" : "text-foreground font-semibold bg-[#181818] border border-[#272727]")
            : (isMobile ? "text-muted-foreground" : "text-muted-foreground hover:text-foreground hover:bg-[#181818]/80") 
        )}
        onClick={() => isMobile && setIsSheetOpen(false)}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 sm:px-6">
        {/* Logo and Site Name */}
        <Link href="/" className="mr-6 flex items-center space-x-2.5 group">
          <span className="w-6 h-6 rounded bg-[#181818] border border-[#272727] flex items-center justify-center text-[11px] font-mono font-bold text-primary group-hover:border-primary/50 transition-colors">
            NC
          </span>
          <span className="font-semibold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors">
            Nocturnal Codex
          </span>
          <span className="hidden lg:inline-block text-[9px] font-mono text-muted-foreground border border-border px-1.5 py-0.5 rounded tracking-wider">
            ARCHIVE
          </span>
        </Link>
        
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {NAV_ITEMS.map((item) => renderNavItem(item))}
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
                <Button variant="ghost" size="icon" aria-label="Toggle Menu" className="h-8 w-8 hover:bg-[#181818]">
                  <Menu className="h-4 w-4 text-foreground" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] bg-background border-r border-border p-0 pt-6 shadow-2xl">
                <Link
                  href="/"
                  className="mb-6 flex items-center space-x-2.5 px-5 group"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <span className="w-6 h-6 rounded bg-[#181818] border border-[#272727] flex items-center justify-center text-[11px] font-mono font-bold text-primary">
                    NC
                  </span>
                  <span className="font-semibold text-sm text-foreground">Nocturnal Codex</span>
                </Link>
                <nav className="flex flex-col space-y-1 px-3">
                  {NAV_ITEMS.map((item) => renderNavItem(item, true))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}