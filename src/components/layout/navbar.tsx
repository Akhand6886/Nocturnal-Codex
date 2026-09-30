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
                "text-sm font-semibold relative",
                isMobile
                  ? "w-full justify-start px-4 py-2.5 text-base"
                  : "px-3 py-2 rounded-lg",
                isActive
                  ? isMobile
                    ? "text-primary font-bold"
                    : "text-primary font-bold"
                  : isMobile
                    ? "text-foreground/70 hover:text-foreground"
                    : "text-foreground/70 hover:text-foreground hover:bg-primary/5"
              )}
            >
              {item.label}
              <ChevronDown className={cn(
                "ml-1.5 h-4 w-4 transition-transform duration-200",
                isActive && !isMobile ? "text-primary" : ""
              )} />
              {/* Active neon underline */}
              {isActive && !isMobile && (
                <span className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align={isMobile ? "start" : "center"}
            className="glass-strong border-border/30 shadow-xl w-60 md:w-auto rounded-xl neon-glow-sm"
            sideOffset={isMobile ? 10 : 12}
          >
            {item.children.map((child) => (
              <DropdownMenuItem key={child.label} asChild className="py-2.5 px-3 rounded-lg">
                <Link
                  href={child.href}
                  className={cn(
                    "block text-sm hover:bg-primary/10 hover:text-primary",
                    pathname === child.href ? "bg-primary/10 text-primary font-medium" : "text-popover-foreground"
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
          "text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-primary/50 rounded-lg relative",
          isMobile
            ? "block px-4 py-2.5 text-base"
            : "px-3 py-2",
          isActive
            ? isMobile
              ? "text-primary font-bold"
              : "text-primary font-bold"
            : isMobile
              ? "text-foreground/70 hover:text-foreground"
              : "text-foreground/70 hover:text-foreground hover:bg-primary/5"
        )}
        onClick={() => isMobile && setIsSheetOpen(false)}
      >
        {item.label}
        {/* Active neon underline */}
        {isActive && !isMobile && (
          <span className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
        )}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top accent gradient bar */}
      <div className="accent-bar" />
      <div className="glass-strong border-b border-border/20">
        <div className="container flex h-16 max-w-screen-2xl items-center px-4">
          {/* Logo and Site Name */}
          <Link href="/" className="mr-6 flex items-center space-x-2.5 group">
            <div className="relative">
              <Eye className="h-7 w-7 text-primary group-hover:text-accent transition-colors duration-300" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-bold text-lg gradient-text-primary group-hover:neon-text transition-all duration-300">
              Nocturnal Codex
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 md:ml-6">
            {NAV_ITEMS.map((item) => renderNavItem(item))}
          </nav>

          {/* Spacer */}
          <div className="hidden md:block flex-1"></div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2 ml-auto md:ml-0">
            <ThemeToggle />

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Toggle Menu" className="hover:bg-primary/10">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] glass-strong p-0 pt-8 shadow-2xl border-r-border/20">
                  <Link
                    href="/"
                    className="mb-8 flex items-center space-x-2.5 px-6 group"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <Eye className="h-7 w-7 text-primary" />
                    <span className="font-bold text-lg gradient-text-primary">Nocturnal Codex</span>
                  </Link>
                  <nav className="flex flex-col space-y-1.5 px-4">
                    {NAV_ITEMS.map((item) => renderNavItem(item, true))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}