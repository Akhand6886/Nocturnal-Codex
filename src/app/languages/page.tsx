
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Code2 } from 'lucide-react';
import { allLanguagePosts } from 'contentlayer/generated';
import { SimpleIcon } from '@/components/common/simple-icon';

export default function LanguagesPage() {
  const languages = allLanguagePosts.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="container mx-auto px-4 py-10 md:py-12">
      <header className="pb-6 border-b border-border">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center text-foreground">
          <Code2 className="mr-4 h-10 w-10 text-primary" />
          Programming Languages
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Choose a language to start your learning journey.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {languages.map((lang) => (
          <Link href={lang.url} key={lang.id} className="group block">
            <Card className="h-full overflow-hidden shadow-md hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card border border-border/50 hover:border-primary/60 rounded-lg">
              <CardHeader className="flex flex-row items-center gap-4">
                <SimpleIcon iconName={lang.iconName || 'code'} className="w-8 h-8 text-primary" />
                <div>
                    <CardTitle className="text-lg font-semibold group-hover:text-primary">{lang.name}</CardTitle>
                    <CardDescription className="text-sm mt-1">{lang.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
