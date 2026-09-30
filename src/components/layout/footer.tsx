import { Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t border-border/20 mt-16">
      {/* Subtle gradient glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="glass-subtle py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Column 1: Site Name & Brief */}
            <div>
              <h3 className="text-lg font-bold gradient-text-primary mb-3">Nocturnal Codex</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                For Hackers, Theorists, Builders, Learners. A curated sanctuary for deep dives into computer science and mathematics.
              </p>
            </div>

            {/* Column 2: Explore Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/60 mb-4">Explore</h4>
              <ul className="space-y-2.5">
                <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Home</Link></li>
                <li><Link href="/roadmaps" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Roadmaps</Link></li>
                <li><Link href="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Projects</Link></li>
                <li><Link href="/languages" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Languages</Link></li>
                <li><Link href="/mathematics" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Mathematics</Link></li>
                <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Blog</Link></li>
              </ul>
            </div>

            {/* Column 3: Reference Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/60 mb-4">Reference</h4>
              <ul className="space-y-2.5">
                <li><Link href="/think-tank" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Think Tank</Link></li>
                <li><Link href="/categories" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Categories</Link></li>
                <li><Link href="/tags" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Tags</Link></li>
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">About</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground/70 text-center md:text-left font-mono tracking-wide">
              &copy; {new Date().getFullYear()} NOCTURNAL_CODEX // BUILT BY THE NOCTURNIST
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href="https://github.com/Akhand6886/Nocturnal-Codex"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
                className="text-muted-foreground/50 hover:text-primary transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}