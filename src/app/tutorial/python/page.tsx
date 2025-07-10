
import { allTutorialPosts } from "contentlayer/generated";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { MOCK_PROGRAMMING_LANGUAGES } from "@/lib/data";
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import { notFound } from "next/navigation";

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
    const pythonLanguage = MOCK_PROGRAMMING_LANGUAGES.find(lang => lang.slug === 'python');

    if (!pythonLanguage || !pythonLanguage.mainContent) {
        notFound();
    }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Python Tutorial</h1>
        <div className="my-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-600 dark:text-yellow-200 rounded-r-md">
            <p className="font-semibold m-0 italic">This Python tutorial is based on the latest Python 3.13 version.</p>
        </div>
        <article className="prose dark:prose-invert max-w-none">
            <MarkdownRenderer content={pythonLanguage.mainContent} />
        </article>
    </div>
  );
}
