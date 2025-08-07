
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Code2 } from 'lucide-react';

const languages = [
  { name: 'Python', href: '/tutorial/python/introduction-to-python', description: 'A versatile and beginner-friendly language for web, data, and more.' },
  { name: 'JavaScript', href: '/tutorial/javascript/features-of-javascript', description: 'The language of the web, powering interactive experiences.' },
  { name: 'Java', href: '/tutorial/java/introduction-to-java', description: 'A robust, object-oriented language for enterprise applications.' },
  { name: 'C#', href: '/tutorial/csharp/introduction-to-csharp', description: 'A modern language from Microsoft for Windows and web apps.' },
  { name: 'C++', href: '/tutorial/cplusplus/introduction-to-cplusplus', description: 'High-performance object-oriented programming for systems and games.' },
  { name: 'PHP', href: '/tutorial/php/introduction-to-php', description: 'A popular server-side scripting language for web development.' },
  { name: 'Ruby', href: '/tutorial/ruby/introduction', description: 'A dynamic, open-source language with a focus on simplicity.' },
  { name: 'Swift', href: '/tutorial/swift/introduction', description: 'The modern, powerful language for Apple platforms.' },
  { name: 'R', href: '/tutorial/r/introduction', description: 'The go-to language for statistical computing and graphics.' },
  { name: 'SQL', href: '/tutorial/sql/introduction-to-sql', description: 'The standard for managing and querying relational databases.' },
  { name: 'Kotlin', href: '/tutorial/kotlin/introduction', description: 'A modern, concise language for Android and backend development.' },
  { name: 'TypeScript', href: '/tutorial/typescript/introduction-to-typescript', description: 'JavaScript with static types for safer, larger-scale codebases.' },
  { name: 'Go', href: '/tutorial/go/introduction', description: 'A fast, statically typed language from Google for backend services.' },
  { name: 'Rust', href: '/tutorial/rust/introduction', description: 'A systems language focused on safety, speed, and concurrency.' },
  { name: 'Scala', href: '/tutorial/scala/introduction', description: 'A hybrid functional/OO language that runs on the JVM.' },
  { name: 'Dart', href: '/tutorial/dart/introduction', description: 'The language for building mobile, desktop, and web apps with Flutter.' },
  { name: 'Perl', href: '/tutorial/perl/introduction', description: 'A mature language known for its powerful text processing.' },
  { name: 'MATLAB', href: '/tutorial/matlab/introduction', description: 'A high-level language for numerical computing and visualization.' },
  { name: 'VBA', href: '/tutorial/vba/introduction', description: 'Automate tasks in Microsoft Office applications.' },
  { name: 'Shell Scripting', href: '/tutorial/shell/introduction', description: 'Automate command-line tasks on Unix-like systems.' },
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {languages.map((lang) => (
          <Link href={lang.href} key={lang.name} className="group block">
            <Card className="h-full overflow-hidden shadow-md hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card border border-border/50 hover:border-primary/60 rounded-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold group-hover:text-primary">{lang.name}</CardTitle>
                <CardDescription className="text-sm">{lang.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
