// src/app/tutorial/[language]/[slug]/page.tsx
import { allTutorialPosts } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { MarkdownRenderer } from '@/components/content/markdown-renderer';
import { TutorialPagination } from '@/components/layout/tutorial-pagination';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateStaticParams() {
  return allTutorialPosts.map((post) => ({
    language: post.language,
    slug: post.slug,
  }));
}

interface TutorialPageProps {
  params: {
    language: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: TutorialPageProps): Promise<Metadata> {
    const post = allTutorialPosts.find(p => p.language === params.language && p.slug === params.slug);
    if (!post) {
        return { title: 'Tutorial Not Found' };
    }
    return {
        title: `${post.title} | Nocturnal Codex`,
        description: post.description,
    };
}


export default function TutorialPage({ params }: TutorialPageProps) {
  const tutorialsForLanguage = allTutorialPosts
    .filter((p) => p.language === params.language)
    .sort((a, b) => a.order - b.order);
  
  const postIndex = tutorialsForLanguage.findIndex((p) => p.slug === params.slug);

  if (postIndex === -1) {
    notFound();
  }

  const post = tutorialsForLanguage[postIndex];
  const prevPost = postIndex > 0 ? tutorialsForLanguage[postIndex - 1] : null;
  const nextPost = postIndex < tutorialsForLanguage.length - 1 ? tutorialsForLanguage[postIndex + 1] : null;

  // Placeholder for read time calculation
  const readTimeMinutes = Math.ceil(post.body.raw.split(/\s+/).length / 200);

  return (
    <article className="py-8 prose dark:prose-invert max-w-none">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{post.title}</h1>
        <p className="text-sm text-muted-foreground mt-2">
            {/* Placeholder date and read time */}
            4 Apr 2025 | {readTimeMinutes} min read
        </p>
      </header>
      
      <MarkdownRenderer content={post.body.raw} />

      <hr className="my-12" />
      
      <TutorialPagination prev={prevPost} next={nextPost} />
    </article>
  );
}
