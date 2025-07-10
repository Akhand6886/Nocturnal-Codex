import { allTutorialPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import { MarkdownRenderer } from "@/components/content/markdown-renderer";
import { MOCK_PROGRAMMING_LANGUAGES } from "@/lib/data";

export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateStaticParams() {
    return allTutorialPosts.map((post) => ({
      languageSlug: post.language,
      slug: post.slug,
    }));
}

interface LanguageTutorialPageProps {
  params: { 
    languageSlug: string;
    slug: string;
  };
}

async function getTutorial(params: LanguageTutorialPageProps['params']) {
    return allTutorialPosts.find(p => p.language === params.languageSlug && p.slug === params.slug);
}

export async function generateMetadata({ params }: LanguageTutorialPageProps): Promise<Metadata> {
  const tutorial = await getTutorial(params);
  const language = MOCK_PROGRAMMING_LANGUAGES.find(lang => lang.slug === params.languageSlug);

  if (!tutorial || !language) {
    return {
      title: "Tutorial Not Found",
      description: "The tutorial you are looking for could not be found."
    };
  }
  
  const pageTitle = tutorial.title;
  const description = tutorial.description || `An interactive tutorial on ${language.name}. Learn about ${tutorial.title}.`;
  const url = `${siteUrl}/languages/${params.languageSlug}/${params.slug}`;
  
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

export default async function LanguageTutorialPage({ params }: LanguageTutorialPageProps) {
  const tutorial = await getTutorial(params);

  if (!tutorial) {
    notFound();
  }

  return (
    <div className="space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{tutorial.title}</h1>
        {tutorial.description && <p className="text-lg text-muted-foreground">{tutorial.description}</p>}
        
        <div className="my-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-600 dark:text-yellow-200 rounded-r-md">
            <p className="font-semibold m-0 italic">This Python tutorial is based on the latest Python 3.13 version.</p>
        </div>

        <article className="prose dark:prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: tutorial.body.html }}
            />
        </article>
    </div>
  );
}