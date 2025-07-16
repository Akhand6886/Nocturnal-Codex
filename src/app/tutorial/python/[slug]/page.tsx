import { allTutorialPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import { MOCK_PROGRAMMING_LANGUAGES } from "@/lib/data";

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
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{tutorial.title}</h1>
        {tutorial.description && <p className="text-lg text-muted-foreground">{tutorial.description}</p>}
        
        <article className="prose dark:prose-invert max-w-none markdown-content">
            <div
              dangerouslySetInnerHTML={{ __html: tutorial.body.html }}
            />
        </article>
    </div>
  );
}
