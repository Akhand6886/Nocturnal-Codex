
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Code2 } from 'lucide-react';

const languages = [
  { name: 'Python', href: '/languages/python', description: 'A versatile and beginner-friendly language.' },
  { name: 'JavaScript', href: '/languages/javascript', description: 'The language of the web.' },
  { name: 'Java', href: '/languages/java', description: 'A robust, object-oriented language.' },
];

export default function LanguagesPage() {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {languages.map((lang) => (
          <Link href={lang.href} key={lang.name} className="group block">
            <Card className="h-full overflow-hidden shadow-lg hover:shadow-primary/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 bg-card border border-border/50 hover:border-primary/60 rounded-xl">
              <CardHeader>
                <CardTitle className="text-xl font-semibold group-hover:text-primary">{lang.name}</CardTitle>
                <CardDescription>{lang.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
