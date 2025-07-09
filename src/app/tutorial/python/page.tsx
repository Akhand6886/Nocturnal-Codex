
import { allTutorialPosts } from "contentlayer/generated";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";

export const revalidate = 60; // Revalidate every 60 seconds

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: "Python Tutorials Index",
  description: "Browse all Python tutorials available on Nocturnal Codex, organized for easy learning.",
  alternates: {
    canonical: "/tutorial/python",
  },
  openGraph: {
    title: "Python Tutorials | Nocturnal Codex",
    description: "A comprehensive list of Python tutorials.",
    url: `${siteUrl}/tutorial/python`,
  },
};

export default async function PythonTutorialsIndexPage() {
  const sortedTutorials = allTutorialPosts
    .filter(p => p.language === 'python')
    .sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Python Tutorial</h1>
      <p className="text-lg text-muted-foreground">
        This Python tutorial has been designed for beginners to help them understand the basic to advanced concepts of Python Programming Language.
      </p>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Python Basics</h2>
        <ul className="space-y-1">
          {sortedTutorials.map((tutorial) => (
            <li key={tutorial.slug}>
              <Link
                href={tutorial.url}
                className="group flex items-center p-2 rounded-md hover:bg-accent/10 transition-colors"
              >
                <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-foreground/80 group-hover:text-foreground">
                  {tutorial.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
