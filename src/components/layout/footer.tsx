import { Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#000000] mt-24 py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Column 1: Colophon Info (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-2.5">
              <span className="w-6 h-6 rounded bg-[#181818] border border-[#272727] flex items-center justify-center text-[11px] font-mono font-bold text-primary">
                NC
              </span>
              <span className="font-semibold text-sm tracking-tight text-foreground">
                Nocturnal Codex
              </span>
            </div>
            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
              A curated digital sanctuary and technical knowledge archive for computer science, mathematics, low-level systems, and foundational engineering theory.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[10px] font-mono text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
              <span>INDEXED ARCHIVE // 100% STATIC & PRIVATE</span>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Column 2: Curricula & Paths (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-4 font-semibold">Curricula & Pathways</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/roadmaps" className="text-foreground/80 hover:text-primary transition-colors">Developer Roadmaps</Link></li>
              <li><Link href="/languages" className="text-foreground/80 hover:text-primary transition-colors">Language Curricula (22+)</Link></li>
              <li><Link href="/mathematics" className="text-foreground/80 hover:text-primary transition-colors">Mathematical Foundations</Link></li>
              <li><Link href="/projects" className="text-foreground/80 hover:text-primary transition-colors">Open Source Directory</Link></li>
              <li><Link href="/categories" className="text-foreground/80 hover:text-primary transition-colors">Domain Categories</Link></li>
            </ul>
          </div>

          {/* Column 3: Archive Papers & Info (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-4 font-semibold">Publications & Meta</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/blog" className="text-foreground/80 hover:text-primary transition-colors">Technical Blog</Link></li>
              <li><Link href="/think-tank" className="text-foreground/80 hover:text-primary transition-colors">Think Tank Whitepapers</Link></li>
              <li><Link href="/tags" className="text-foreground/80 hover:text-primary transition-colors">Taxonomy Index</Link></li>
              <li><Link href="/about" className="text-foreground/80 hover:text-primary transition-colors">Codex Manifesto</Link></li>
              <li><Link href="/contact" className="text-foreground/80 hover:text-primary transition-colors">Inquiries & Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p className="font-mono text-[11px]">
            &copy; {new Date().getFullYear()} Nocturnal Codex. Built for hackers, theorists, and builders.
          </p>
          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/Akhand6886/Nocturnal-Codex"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repository"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 font-mono text-[11px]"
            >
              <Github className="h-4 w-4" />
              <span>SOURCE</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}