
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllLanguages, getLanguageBySlug } from '@/lib/languages';
import { SimpleIcon } from '@/components/common/simple-icon';
import { MarkdownRenderer } from '@/components/content/markdown-renderer';
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User, ExternalLink, Layers, BarChart3, Code2 } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  const languages = getAllLanguages();
  return languages.map((lang) => ({
    slug: lang.slug,
  }));
}

interface LanguagePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LanguagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const lang = getLanguageBySlug(slug);
  
  if (!lang) {
    return { title: 'Language Not Found' };
  }
  return {
    title: `${lang.name} | Languages`,
    description: lang.description,
  };
}

export default async function LanguagePage({ params }: LanguagePageProps) {
  const { slug } = await params;
  const lang = getLanguageBySlug(slug);

  if (!lang) {
    notFound();
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Languages", href: "/languages" },
    { label: lang.name },
  ];

  // Find related languages (same category or shared paradigm)
  const allLanguages = getAllLanguages();
  const relatedLanguages = allLanguages
    .filter(other => 
      other.slug !== lang.slug && (
        other.category === lang.category ||
        other.paradigm?.some(p => lang.paradigm?.includes(p))
      )
    )
    .slice(0, 4);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10 md:py-12">
      <Breadcrumbs items={breadcrumbItems} />

      {/* Header */}
      <header className="pb-8 border-b border-border flex items-start gap-6">
        <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0">
          <SimpleIcon iconName={lang.iconName} className="w-14 h-14 text-primary" />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-3">
            {lang.name}
          </h1>
          <p className="text-lg text-muted-foreground">{lang.description}</p>
          {lang.paradigm && lang.paradigm.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {lang.paradigm.map((p) => (
                <Badge key={p} variant="secondary" className="text-xs">{p}</Badge>
              ))}
              {lang.difficulty && (
                <Badge variant="outline" className="text-xs">{lang.difficulty}</Badge>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
        {/* Main content — 2/3 width */}
        <div className="lg:col-span-2">
          <MarkdownRenderer content={lang.content} />
        </div>

        {/* Sidebar — 1/3 width */}
        <aside className="space-y-6">
          {/* Key Facts Card */}
          <Card className="bg-card shadow-md border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Key Facts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lang.year && (
                <div className="flex items-center gap-3 text-sm">
                  <CalendarDays className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <span className="text-muted-foreground">Created</span>
                    <p className="font-medium text-foreground">{lang.year}</p>
                  </div>
                </div>
              )}
              {lang.creator && (
                <div className="flex items-center gap-3 text-sm">
                  <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <span className="text-muted-foreground">Creator</span>
                    <p className="font-medium text-foreground">{lang.creator}</p>
                  </div>
                </div>
              )}
              {lang.category && (
                <div className="flex items-center gap-3 text-sm">
                  <Layers className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <span className="text-muted-foreground">Category</span>
                    <p className="font-medium text-foreground">{lang.category}</p>
                  </div>
                </div>
              )}
              {lang.website && (
                <a
                  href={lang.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="h-4 w-4 flex-shrink-0" />
                  <span>Official Website</span>
                </a>
              )}
            </CardContent>
          </Card>

          {/* Use Cases Card */}
          {lang.useCases && lang.useCases.length > 0 && (
            <Card className="bg-card shadow-md border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" />
                  Use Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {lang.useCases.map((uc) => (
                    <Badge key={uc} variant="outline" className="text-xs">{uc}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </aside>
      </div>

      {/* Related Languages */}
      {relatedLanguages.length > 0 && (
        <section className="mt-16 pt-8 border-t border-border">
          <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center">
            <Layers className="h-6 w-6 mr-3 text-primary" />
            Related Languages
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedLanguages.map((related) => (
              <Link href={`/languages/${related.slug}`} key={related.slug} className="group block">
                <Card className="h-full overflow-hidden shadow-sm hover:shadow-primary/15 transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card border border-border/50 hover:border-primary/40 rounded-lg">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <SimpleIcon iconName={related.iconName || 'code'} className="w-10 h-10 mb-3 text-primary" />
                    <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{related.name}</h3>
                    {related.category && (
                      <span className="text-xs text-muted-foreground mt-1">{related.category}</span>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
