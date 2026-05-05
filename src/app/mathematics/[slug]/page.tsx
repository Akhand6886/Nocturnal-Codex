import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllMathDomains, getMathDomainBySlug } from '@/lib/mathematics';
import { MarkdownRenderer } from '@/components/content/markdown-renderer';
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Calculator } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const domains = getAllMathDomains();
  return domains.map((domain) => ({ slug: domain.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const domain = getMathDomainBySlug(slug);
  if (!domain) return { title: 'Math Domain Not Found' };
  return {
    title: `${domain.title} — Mathematics`,
    description: domain.description,
  };
}

export default async function MathematicsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const domain = getMathDomainBySlug(slug);
  if (!domain) notFound();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Mathematics', href: '/mathematics' },
        { label: domain.title }
      ]} />

      {/* Header */}
      <header className="mt-6 mb-10 pb-6 border-b border-border/50 flex flex-col gap-4">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
            <Calculator className="w-10 h-10 text-primary" />
            </div>
            <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">{domain.title}</h1>
            <p className="text-muted-foreground mt-2 text-lg leading-relaxed">{domain.description}</p>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-w-0">
        <div className="prose prose-invert max-w-none mb-10
          prose-headings:text-foreground prose-headings:font-semibold
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border/30
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-lg
          prose-li:text-muted-foreground prose-li:text-lg
          prose-strong:text-foreground
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
          prose-pre:bg-card prose-pre:border prose-pre:border-border/50 prose-pre:rounded-lg">
          <MarkdownRenderer content={domain.content} />
        </div>
      </main>
    </div>
  );
}
