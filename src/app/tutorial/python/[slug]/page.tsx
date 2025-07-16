
import { allTutorialPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import { MOCK_PROGRAMMING_LANGUAGES } from "@/lib/data";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateStaticParams() {
    return allTutorialPosts.map((post) => ({
      slug: post.slug,
    }));
}

interface LanguageTutorialPageProps {
  params: { 
    slug: string;
  };
}

async function getTutorial(slug: string) {
    return allTutorialPosts.find(p => p.language === 'python' && p.slug === slug);
}

export async function generateMetadata({ params }: LanguageTutorialPageProps): Promise<Metadata> {
  const tutorial = await getTutorial(params.slug);
  const language = MOCK_PROGRAMMING_LANGUAGES.find(lang => lang.slug === 'python');

  if (!tutorial || !language) {
    return {
      title: "Tutorial Not Found",
      description: "The tutorial you are looking for could not be found."
    };
  }
  
  const pageTitle = tutorial.title;
  const description = tutorial.description || `An interactive tutorial on ${language.name}. Learn about ${tutorial.title}.`;
  const url = `${siteUrl}/tutorial/python/${params.slug}`;
  
  return {
    title: `${pageTitle} | ${language.name} Tutorial`,
    description: description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${pageTitle} | Nocturnal Codex`,
      description: description,
      url: url,
      type: 'article',
    },
  };
}

export default async function PythonTutorialPage({ params }: LanguageTutorialPageProps) {
  const tutorial = await getTutorial(params.slug);

  if (!tutorial) {
    notFound();
  }

  return (
    <div className="space-y-6">
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
        <div className="my-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-600 dark:text-yellow-200 rounded-r-md">
            <p className="font-semibold m-0 italic">This Python tutorial is based on the latest Python 3.13 version.</p>
        </div>
        
        <article className="prose dark:prose-invert max-w-none markdown-content">
            <div
              dangerouslySetInnerHTML={{ __html: tutorial.body.html }}
            />
        </article>
    </div>
  );
}
