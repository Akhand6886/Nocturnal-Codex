
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllLanguages, getLanguageBySlug } from '@/lib/languages';
import { SimpleIcon } from '@/components/common/simple-icon';
import { MarkdownRenderer } from '@/components/content/markdown-renderer';
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User, ExternalLink, Layers, BarChart3, Code2, Globe } from "lucide-react";
import { LearningPath } from "@/components/content/learning-path";
import { LanguageTocSidebar } from "@/components/content/language-toc-sidebar";

export const revalidate = 3600;

export async function generateStaticParams() {
  const languages = getAllLanguages();
  return languages.map((lang) => ({ slug: lang.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lang = getLanguageBySlug(slug);
  if (!lang) return { title: 'Language Not Found' };
  return {
    title: `${lang.name} — Programming Languages`,
    description: lang.description,
  };
}

export default async function LanguageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = getLanguageBySlug(slug);
  if (!lang) notFound();

  const allLanguages = getAllLanguages();
  const relatedLanguages = allLanguages
    .filter(l => l.slug !== lang.slug && (l.category === lang.category || l.paradigm?.some(p => lang.paradigm?.includes(p))))
    .slice(0, 4);

  const hasTopics = lang.topics && lang.topics.length > 0;
  const totalTopics = hasTopics ? lang.topics!.reduce((sum, s) => sum + s.items.length, 0) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Languages', href: '/languages' },
        { label: lang.name }
      ]} />

      {/* Header */}
      <header className="mt-6 mb-8 flex items-start gap-5">
        <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
          <SimpleIcon iconName={lang.iconName || 'code'} className="w-14 h-14 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">{lang.name}</h1>
          <p className="text-muted-foreground mt-1">{lang.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {lang.paradigm?.map(p => (
              <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
            ))}
            {lang.difficulty && (
              <Badge variant="outline" className="text-xs">{lang.difficulty}</Badge>
            )}
            {lang.year && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <CalendarDays className="h-3 w-3" /> {lang.year}
              </Badge>
            )}
            {lang.creator && (
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <User className="h-3 w-3" /> {lang.creator}
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* 3-Column Layout */}
      <div className={`grid gap-8 ${hasTopics ? 'lg:grid-cols-[200px_1fr_240px]' : 'lg:grid-cols-[1fr_280px]'}`}>

        {/* LEFT: ToC Sidebar (only if topics exist) */}
        {hasTopics && (
          <aside className="hidden lg:block">
            <LanguageTocSidebar topics={lang.topics!} />
          </aside>
        )}

        {/* CENTER: Main Content */}
        <main className="min-w-0">
          {/* Overview & Markdown Content */}
          <div className="prose prose-invert max-w-none mb-10
            prose-headings:text-foreground prose-headings:font-semibold
            prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border/30
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-li:text-muted-foreground
            prose-strong:text-foreground
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
            prose-pre:bg-card prose-pre:border prose-pre:border-border/50 prose-pre:rounded-lg">
            <MarkdownRenderer content={lang.content} />
          </div>

          {/* Learning Path (flat topic lists) */}
          {hasTopics && (
            <div className="pt-8 border-t border-border/40">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-foreground">Learning Path</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {totalTopics} topics across {lang.topics!.length} sections
                </p>
              </div>
              <LearningPath topics={lang.topics!} />
            </div>
          )}
        </main>

        {/* RIGHT: Sidebar */}
        <aside className="space-y-6">
          {/* Key Facts */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                Key Facts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {lang.year && (
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Created</span>
                  <span className="ml-auto font-medium text-foreground">{lang.year}</span>
                </div>
              )}
              {lang.creator && (
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Creator</span>
                  <span className="ml-auto font-medium text-foreground text-right text-xs">{lang.creator}</span>
                </div>
              )}
              {lang.category && (
                <div className="flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Category</span>
                  <span className="ml-auto font-medium text-foreground">{lang.category}</span>
                </div>
              )}
              {lang.website && (
                <a href={lang.website} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors text-xs mt-1">
                  <Globe className="h-3.5 w-3.5" />
                  Official Website
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </CardContent>
          </Card>

          {/* Use Cases */}
          {lang.useCases && lang.useCases.length > 0 && (
            <Card className="border-border/50 bg-card/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-primary" />
                  Use Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {lang.useCases.map(uc => (
                    <Badge key={uc} variant="secondary" className="text-xs">{uc}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Related Languages */}
          {relatedLanguages.length > 0 && (
            <Card className="border-border/50 bg-card/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" />
                  Related
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {relatedLanguages.map((related) => (
                    <Link href={`/languages/${related.slug}`} key={related.slug}
                      className="group flex flex-col items-center p-3 rounded-lg bg-secondary/30 hover:bg-secondary/60 transition-all duration-200">
                      <SimpleIcon iconName={related.iconName || 'code'} className="w-7 h-7 mb-1.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">{related.name}</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
