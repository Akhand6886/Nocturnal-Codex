import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllMathDomains, getMathDomainBySlug, getMathTopic } from '@/lib/mathematics';
import { Calculator, BookOpen } from "lucide-react";
import { MarkdownRenderer } from '@/components/content/markdown-renderer';
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { TopicSidebar } from "@/components/content/topic-sidebar";
import { TopicPagination } from "@/components/content/topic-pagination";
import { TableOfContents } from "@/components/content/table-of-contents";

export const revalidate = 3600;

export async function generateStaticParams() {
  const domains = getAllMathDomains();
  const params: { slug: string; topicSlug: string }[] = [];

  for (const domain of domains) {
    if (domain.topics) {
      for (const section of domain.topics) {
        for (const item of section.items) {
          if (item.slug && !item.link) {
            params.push({ slug: domain.slug, topicSlug: item.slug });
          }
        }
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; topicSlug: string }> }): Promise<Metadata> {
  const { slug, topicSlug } = await params;
  const domain = getMathDomainBySlug(slug);
  if (!domain) return { title: 'Not Found' };

  const topic = getMathTopic(slug, topicSlug);
  if (!topic) return { title: 'Topic Not Found' };

  return {
    title: `${topic.title} in ${domain.title} — Nocturnal Codex`,
    description: topic.description || `Learn about ${topic.title} in ${domain.title}`,
  };
}

export default async function MathTopicDetailPage({ params }: { params: Promise<{ slug: string; topicSlug: string }> }) {
  const { slug, topicSlug } = await params;
  const domain = getMathDomainBySlug(slug);
  if (!domain) notFound();

  const topic = getMathTopic(slug, topicSlug);
  if (!topic) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Mathematics', href: '/mathematics' },
        { label: domain.title, href: `/mathematics/${domain.slug}` },
        { label: topic.title }
      ]} />

      <div className="grid gap-8 lg:grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_240px] mt-6">
        {/* Left: Curriculum Nav */}
        <aside className="hidden lg:block">
          {domain.topics && (
            <TopicSidebar topics={domain.topics} langSlug={domain.slug} activeTopicSlug={topicSlug} isMath />
          )}
        </aside>

        {/* Center: Main Content */}
        <main className="min-w-0 pb-16">
          <header className="mb-8 pb-6 border-b border-border/50">
            <div className="flex items-center gap-3 text-muted-foreground mb-3">
               <Calculator className="w-5 h-5 text-primary" />
               <span className="text-sm font-medium">{domain.title} Module</span>
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

          <article>
            <MarkdownRenderer content={topic.content} />
          </article>

          {/* Next & Previous Pagination */}
          {domain.topics && (
            <TopicPagination topics={domain.topics} langSlug={domain.slug} activeTopicSlug={topicSlug} isMath />
          )}
        </main>

        {/* Right: Local Table of Contents */}
        <aside className="hidden xl:block">
          <TableOfContents content={topic.content} />
        </aside>
      </div>
    </div>
  );
}
