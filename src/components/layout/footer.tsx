
import { Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/80 backdrop-blur-sm mt-12">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:h-20 md:flex-row md:py-0 px-4">
        <div className="flex flex-col items-center md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by The Nocturnist.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Nocturnal Codex. All rights reserved.
          </p>
          <Link href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub Repository">
            <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-200" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
