import { BookOpenText, Calculator } from 'lucide-react';
import type { Metadata } from 'next';
import { getAllMathDomains } from '@/lib/mathematics';
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { SimpleIcon } from '@/components/common/simple-icon';

export const metadata: Metadata = {
  title: 'Mathematics for Computer Science',
  description: 'Explore the mathematical foundations of computer science, including discrete math, linear algebra, and calculus.',
};

export default function MathematicsPage() {
  const allDomains = getAllMathDomains();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-8 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-primary uppercase">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
              THEORETICAL ARCHIVE // INDEX 03
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.15]">
              Mathematical Foundations
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Discrete mathematics, linear algebra, graph theory, abstract algebra, and probability theory formalizing the core computational substrate.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground border border-border bg-card px-4 py-2 rounded-lg shadow-xs">
            <span><strong className="text-foreground">{allDomains.length}</strong> domains</span>
            <span className="text-muted-foreground/40">|</span>
            <span><strong className="text-foreground">Formal Proofs</strong></span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allDomains.map((domain) => (
            <Link href={domain.url} key={domain.slug} className="group block h-full">
              <Card className="h-full flex flex-col bg-card border border-border hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
                <CardContent className="p-6 flex-grow flex flex-col items-start">
                  <div className="p-2.5 bg-primary/10 border border-primary/20 rounded-lg mb-4 text-primary group-hover:scale-105 transition-transform">
                    <BookOpenText className="w-5 h-5" />
                  </div>
                  <h2 className="text-base font-semibold mb-2 text-foreground group-hover:text-primary transition-colors leading-snug">
                    {domain.title}
                  </h2>
                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                    {domain.description}
                  </p>
                  <div className="mt-auto pt-3 border-t border-border/60 w-full flex items-center justify-between text-[11px] font-mono text-muted-foreground group-hover:text-primary transition-colors">
                    <span>EXPLORE DOMAIN</span>
                    <span>→</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
