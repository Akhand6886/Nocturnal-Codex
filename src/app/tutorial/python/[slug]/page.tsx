
import { allTutorialPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";

export const revalidate = 60; // Revalidate every 60 seconds

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateStaticParams() {
  return allTutorialPosts
    .filter(p => p.language === 'python')
    .map((tutorial) => ({
      slug: tutorial.slug,
    }));
}

interface PythonTutorialPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PythonTutorialPageProps): Promise<Metadata> {
  const tutorial = allTutorialPosts.find((p) => p.language === 'python' && p.slug === params.slug);

  if (!tutorial) {
    return {
      title: "Tutorial Not Found",
      description: "The tutorial you are looking for could not be found."
    };
  }

  return {
    title: `${tutorial.title} | Python Tutorial`,
    description: tutorial.description || `Python tutorial on ${tutorial.title}.`,
    alternates: {
      canonical: `/tutorial/python/${tutorial.slug}`,
    },
    openGraph: {
      title: `${tutorial.title} | Python Tutorial`,
      description: tutorial.description || `Learn ${tutorial.title} in Python.`,
      url: `${siteUrl}/tutorial/python/${tutorial.slug}`,
      type: 'article',
    },
  };
}

export default async function PythonTutorialPage({ params }: PythonTutorialPageProps) {
  const tutorial = allTutorialPosts.find((p) => p.slug === params.slug && p.language === 'python');

  if (!tutorial) {
    notFound();
  }

  return (
    <div>
        <h1 className="text-3xl font-bold text-foreground mb-4">{tutorial.title}</h1>
        <div className="flex flex-wrap gap-2 mb-6 border-b pb-4 border-border">
            <Button variant="outline" size="sm" className="bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300">Job Search</Button>
            <Button variant="outline" size="sm" className="bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300">PDF Version</Button>
            <Button variant="outline" size="sm" className="bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300">Quick Guide</Button>
            <Button variant="outline" size="sm" className="bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300">Resources</Button>
            <Button variant="outline" size="sm" className="bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300">Discussion</Button>
        </div>

        <article className="prose dark:prose-invert max-w-none">
            <p className="lead">
                Today, Python is one of the most popular programming languages. Although it is a general-purpose language, it is used in various areas of applications such as Machine Learning, Artificial Intelligence, web development, IoT, and more.
            </p>
            <p>
                This Python tutorial has been written for the beginners to help them understand the basic to advanced concepts of Python Programming Language. After completing this tutorial, you will find yourself at a great level of expertise in Python, from where you can take yourself to the next levels to become a world class Software Engineer.
            </p>
            
            <div className="my-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-600 dark:text-yellow-200 rounded-r-md not-prose">
                <p className="font-semibold m-0">This Python tutorial is based on the latest Python 3.13 version.</p>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: tutorial.body.html }}
            />
        </article>
    </div>
  );
}
