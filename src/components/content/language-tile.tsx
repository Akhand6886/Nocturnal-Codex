
import type { ProgrammingLanguage } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";

interface LanguageTileProps {
  language: ProgrammingLanguage;
}

export function LanguageTile({ language }: LanguageTileProps) {
  // For now, all language tiles link to /topics as a placeholder
  const languagePageUrl = `/topics`; 

  return (
    <Link href={languagePageUrl} className="group block">
      <Card className="overflow-hidden shadow-sm hover:shadow-md border border-border/20 hover:border-primary/30 transition-all duration-200 ease-in-out bg-card group rounded-lg flex flex-col items-center justify-center p-3 text-center h-28">
        <div className="relative h-10 w-10 mb-1.5 flex-shrink-0">
          <Image
            src={language.iconUrl}
            alt={`${language.name} logo`}
            width={36} 
            height={36}
            className="transition-transform duration-300 group-hover:scale-105 ease-in-out object-contain"
            data-ai-hint={language.dataAiHint}
          />
        </div>
        <p className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors duration-200 ease-in-out">
          {language.name}
        </p>
      </Card>
    </Link>
  );
}
