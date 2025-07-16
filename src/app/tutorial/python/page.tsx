import { allTutorialPosts } from "contentlayer/generated";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Python Tutorial | Nocturnal Codex",
  description: "A comprehensive Python tutorial for beginners and professionals, covering basic to advanced concepts.",
};

export default function PythonTutorialIndexPage() {
    const pythonTutorials = allTutorialPosts
        .filter(p => p.language === 'python' && p.order > 1) // Exclude intro post from this list
        .sort((a, b) => a.order - b.order);

    return (
        <div className="space-y-8">
            <header className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Python Tutorial</h1>
                <p className="text-lg text-muted-foreground">
                    This Python tutorial has been designed for beginners to help them understand the basic to advanced concepts of Python Programming Language.
                </p>
                <div className="my-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-600 dark:text-yellow-200 rounded-r-md">
                    <p className="font-semibold m-0 italic">This tutorial is based on the latest Python 3.13 version.</p>
                </div>
            </header>

            <section>
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b">Python Basics</h2>
                <div className="space-y-2">
                    {pythonTutorials.map((tutorial) => (
                        <Link
                            key={tutorial.slug}
                            href={tutorial.url}
                            className="group flex items-center justify-between p-3 rounded-md hover:bg-muted transition-colors"
                        >
                            <span className="font-medium text-primary">{tutorial.title}</span>
                            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
