
import { Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/80 backdrop-blur-sm mt-16 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Site Name & Brief */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Nocturnal Codex</h3>
            <p className="text-sm text-muted-foreground">
              For Hackers, Theorists, Builders, Learners.
            </p>
          </div>

          {/* Column 2: Explore Links */}
          <div>
            <h4 className="text-md font-semibold text-foreground mb-3">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/topics" className="text-sm text-muted-foreground hover:text-primary transition-colors">Topics</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Column 3: Reference Links */}
          <div>
            <h4 className="text-md font-semibold text-foreground mb-3">Reference</h4>
            <ul className="space-y-2">
              <li><Link href="/wiki" className="text-sm text-muted-foreground hover:text-primary transition-colors">Wiki</Link></li>
              <li><Link href="/think-tank" className="text-sm text-muted-foreground hover:text-primary transition-colors">Think Tank</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Nocturnal Codex. All rights reserved. Built by The Nocturnist.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub Repository" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            {/* Add other social icons here if needed, e.g., Twitter, LinkedIn */}
          </div>
        </div>
      </div>
    </footer>
  );
}
