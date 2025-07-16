
import { allTutorialPosts } from "contentlayer/generated";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Python Tutorial | Nocturnal Codex",
  description: "A comprehensive Python tutorial for beginners and professionals, covering basic to advanced concepts.",
};

export default function PythonTutorialIndexPage() {
    const pythonTutorials = allTutorialPosts
        .filter(p => p.language === 'python') 
        .sort((a, b) => a.order - b.order);

    return (
        <div className="space-y-8">
            <header className="space-y-4">
                <div className="flex justify-between items-center border-b pb-4">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Python Tutorial</h1>
                    <Button variant="ghost" size="icon" className="lg:hidden"><Menu className="h-6 w-6"/></Button>
                </div>
                <div className="flex space-x-2 overflow-x-auto py-2">
                    <Button variant="outline" className="bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300">Job Search</Button>
                    <Button variant="outline" className="bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300">PDF Version</Button>
                    <Button variant="outline" className="bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300">Quick Guide</Button>
                    <Button variant="outline" className="bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300">Resources</Button>
                    <Button variant="outline" className="bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300">Discussion</Button>
                </div>
                <h2 className="text-2xl font-bold pt-4">Python Tutorial</h2>
                <p className="text-muted-foreground">
                    Today, Python is one of the most popular programming languages. Although it is a general-purpose language, it is used in various areas of applications such as Machine Learning, Artificial Intelligence, web development, IoT, and more.
                </p>
                <p className="text-muted-foreground">
                    This Python tutorial has been written for the beginners to help them understand the basic to advanced concepts of Python Programming Language. After completing this tutorial, you will find yourself at a great level of expertise in Python, from where you can take yourself to the next levels to become a world class Software Engineer.
                </p>
                <div className="my-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-600 dark:text-yellow-200 rounded-r-md">
                    <p className="font-semibold m-0 italic">This Python tutorial is based on the latest Python 3.13 version.</p>
                </div>
            </header>

             <section>
                <h2 className="text-2xl font-bold mb-4 pb-2 border-b">What is Python?</h2>
                 <p className="text-muted-foreground">
                    <strong className="text-foreground">Python</strong> is a very popular general-purpose interpreted, interactive, object-oriented, and high-level programming language. Python is dynamically-typed and garbage-collected programming language. It was created by Guido van Rossum during 1985-1990. Like Perl, Python source code is also available under the GNU General Public License (GPL).
                 </p>
            </section>
        </div>
    );
}

