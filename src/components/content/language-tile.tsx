
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
      <Card className="
        h-32
        p-4
        flex flex-col items-center justify-center text-center
        bg-card 
        border border-border/40 group-hover:border-primary/60
        shadow-lg group-hover:shadow-primary/20
        rounded-xl
        transition-all duration-300 ease-in-out
        transform group-hover:-translate-y-1
      ">
        <div className="relative h-12 w-12 mb-2.5 flex-shrink-0">
          <Image
            src={language.iconUrl}
            alt={`${language.name} logo`}
            width={44}
            height={44}
            className="object-contain transition-transform duration-300 group-hover:scale-110 ease-in-out"
            data-ai-hint={language.dataAiHint}
          />
        </div>
        <p className="
          text-sm font-semibold
          text-foreground/80 group-hover:text-primary
          transition-colors duration-200 ease-in-out
        ">
          {language.name}
        </p>
      </Card>
    </Link>
  );
}
