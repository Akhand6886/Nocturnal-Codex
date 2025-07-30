
import { allTutorialPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import { MOCK_PROGRAMMING_LANGUAGES } from "@/lib/data";
import { TutorialPagination } from "@/components/layout/tutorial-pagination";
import { format } from 'date-fns';

export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateStaticParams() {
    return allTutorialPosts
        .filter(p => p.language === 'javascript')
        .map((post) => ({
            slug: post.slug,
        }));
}

interface LanguageTutorialPageProps {
  params: { 
    slug: string;
  };
}

async function getTutorialAndNeighbors(slug: string) {
    const sortedTutorials = allTutorialPosts
        .filter(p => p.language === 'javascript')
        .sort((a, b) => a.order - b.order);

    const tutorialIndex = sortedTutorials.findIndex(p => p.slug === slug);
    
    if (tutorialIndex === -1) {
        return { tutorial: null, prev: null, next: null };
    }

    const tutorial = sortedTutorials[tutorialIndex];
    const prev = tutorialIndex > 0 ? sortedTutorials[tutorialIndex - 1] : null;
    const next = tutorialIndex < sortedTutorials.length - 1 ? sortedTutorials[tutorialIndex + 1] : null;

    return { tutorial, prev, next };
}

export async function generateMetadata({ params }: LanguageTutorialPageProps): Promise<Metadata> {
  const { tutorial } = await getTutorialAndNeighbors(params.slug);
  const language = MOCK_PROGRAMMING_LANGUAGES.find(lang => lang.slug === 'javascript');

  if (!tutorial || !language) {
    return {
      title: "Tutorial Not Found",
      description: "The tutorial you are looking for could not be found."
    };
  }
  
  const pageTitle = tutorial.title;
  const description = tutorial.description || `An interactive tutorial on ${language.name}. Learn about ${tutorial.title}.`;
  const url = `${siteUrl}${tutorial.url}`;
  
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

export default async function JavascriptTutorialPage({ params }: LanguageTutorialPageProps) {
  const { tutorial, prev, next } = await getTutorialAndNeighbors(params.slug);

  if (!tutorial) {
    notFound();
  }

  return (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground pb-2">{tutorial.title}</h1>
        <p className="text-sm text-muted-foreground">{format(new Date(), "dd MMM yyyy")} | 4 min read</p>
        
        <article className="prose dark:prose-invert max-w-none markdown-content">
            <div
              dangerouslySetInnerHTML={{ __html: tutorial.body.html }}
            />
        </article>

        <TutorialPagination prev={prev} next={next} />
    </div>
  );
}
