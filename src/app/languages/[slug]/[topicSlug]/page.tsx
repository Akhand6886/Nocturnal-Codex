import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllLanguages, getLanguageBySlug, getLanguageTopic } from '@/lib/languages';
import { SimpleIcon } from '@/components/common/simple-icon';
import { MarkdownRenderer } from '@/components/content/markdown-renderer';
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { TopicSidebar } from "@/components/content/topic-sidebar";
import { BookOpen, CalendarDays } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const languages = getAllLanguages();
  const params: { slug: string; topicSlug: string }[] = [];

  for (const lang of languages) {
    if (lang.topics) {
      for (const section of lang.topics) {
        for (const item of section.items) {
          if (item.slug && !item.link) {
            params.push({ slug: lang.slug, topicSlug: item.slug });
          }
        }
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; topicSlug: string }> }): Promise<Metadata> {
  const { slug, topicSlug } = await params;
  const lang = getLanguageBySlug(slug);
  if (!lang) return { title: 'Not Found' };

  const topic = getLanguageTopic(slug, topicSlug);
  if (!topic) return { title: 'Topic Not Found' };

  return {
    title: `${topic.title} in ${lang.name} — Nocturnal Codex`,
    description: topic.description || `Learn about ${topic.title} in ${lang.name}`,
  };
}

export default async function TopicDetailPage({ params }: { params: Promise<{ slug: string; topicSlug: string }> }) {
  const { slug, topicSlug } = await params;
  const lang = getLanguageBySlug(slug);
  if (!lang) notFound();

  const topic = getLanguageTopic(slug, topicSlug);
  if (!topic) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Languages', href: '/languages' },
        { label: lang.name, href: `/languages/${lang.slug}` },
        { label: topic.title }
      ]} />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr] mt-6">
        {/* Left: Curriculum Nav */}
        <aside className="hidden lg:block">
          {lang.topics && (
            <TopicSidebar topics={lang.topics} langSlug={lang.slug} activeTopicSlug={topicSlug} />
          )}
        </aside>

        {/* Right: Main Content */}
        <main className="min-w-0">
          <header className="mb-8 pb-6 border-b border-border/50">
            <div className="flex items-center gap-3 text-muted-foreground mb-3">
               <SimpleIcon iconName={lang.iconName || 'code'} className="w-5 h-5 text-primary" />
               <span className="text-sm font-medium">{lang.name} Tutorial</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary opacity-80" />
              {topic.title}
            </h1>
            {topic.description && (
              <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
                {topic.description}
              </p>
            )}
          </header>

          <article className="prose prose-invert max-w-none 
            prose-headings:text-foreground prose-headings:font-semibold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border/30
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-li:text-muted-foreground
            prose-strong:text-foreground
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
            prose-pre:bg-card prose-pre:border prose-pre:border-border/50 prose-pre:rounded-lg">
            <MarkdownRenderer content={topic.content} />
          </article>
        </main>
      </div>
    </div>
  );
}
