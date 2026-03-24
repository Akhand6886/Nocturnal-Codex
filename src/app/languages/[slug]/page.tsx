
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllLanguages, getLanguageBySlug } from '@/lib/languages';
import { SimpleIcon } from '@/components/common/simple-icon';
import { MarkdownRenderer } from '@/components/content/markdown-renderer';
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/breadcrumbs";

export const revalidate = 3600; // Revalidate every hour

// Generate static pages for all languages at build time
export async function generateStaticParams() {
  const languages = getAllLanguages();
  return languages.map((lang) => ({
    slug: lang.slug,
  }));
}

interface LanguagePageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for each language page
export async function generateMetadata({ params }: LanguagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const lang = getLanguageBySlug(slug);
  
  if (!lang) {
    return {
      title: 'Language Not Found',
    };
  }
  return {
    title: `${lang.name} | Languages`,
    description: lang.description,
  };
}

// The main page component
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

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10 md:py-12">
      <Breadcrumbs items={breadcrumbItems} />
      <header className="pb-8 border-b border-border flex items-center gap-6">
        <SimpleIcon iconName={lang.iconName} className="w-16 h-16 text-primary" />
        <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-3">
            {lang.name}
            </h1>
            <p className="text-lg text-muted-foreground">
            {lang.description}
            </p>
        </div>
      </header>
      
      <div className="pt-8">
        <MarkdownRenderer content={lang.content} />
      </div>
    </div>
  );
}
