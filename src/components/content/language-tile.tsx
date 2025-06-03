
import type { ProgrammingLanguage } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface LanguageTileProps {
  language: ProgrammingLanguage;
}

export function LanguageTile({ language }: LanguageTileProps) {
  // For now, all language tiles link to /topics as a placeholder
  const languagePageUrl = `/topics`; 

  return (
    <Link href={languagePageUrl} className="group block">
      <Card className="h-full overflow-hidden shadow-md hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card border border-border/40 hover:border-primary/50 rounded-lg">
        <CardHeader className="flex-row items-center space-x-4 pt-5 pb-3">
          <div className="relative h-12 w-12 flex-shrink-0 rounded-md overflow-hidden">
            <Image
              src={language.iconUrl}
              alt={`${language.name} logo`}
              width={64}
              height={64}
              className="transition-transform duration-300 group-hover:scale-110 ease-in-out"
              data-ai-hint={language.dataAiHint}
            />
          </div>
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors duration-200 ease-in-out">
            {language.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-5 pt-0">
          <CardDescription className="text-sm text-muted-foreground mb-3 min-h-[2.5em] line-clamp-2">
            {language.description}
          </CardDescription>
          <div className="flex items-center text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out font-medium">
            Learn More <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

    