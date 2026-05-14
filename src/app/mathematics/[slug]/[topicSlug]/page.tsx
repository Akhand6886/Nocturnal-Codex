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

  // Temporary scaffold
  return (
    <div className="container mx-auto px-4 py-8">
      <h1>{topic.title}</h1>
      <p>{topic.description}</p>
      <MarkdownRenderer content={topic.content} />
    </div>
  );
}
