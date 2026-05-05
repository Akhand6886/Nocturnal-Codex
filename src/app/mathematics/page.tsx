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
    <div className="container mx-auto px-4 py-10 md:py-12">
      <header className="pb-6 border-b border-border">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <Calculator className="mr-4 h-10 w-10 text-primary" />
          Mathematics
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          The theoretical and mathematical foundations of computer science engineering.
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allDomains.map((domain) => (
          <Link href={domain.url} key={domain.slug} className="group block h-full">
            <Card className="h-full flex flex-col hover:border-primary/50 transition-colors bg-card/40 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 flex-grow flex flex-col items-start">
                <div className="p-2 bg-primary/10 rounded-lg mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                  <BookOpenText className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {domain.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {domain.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
