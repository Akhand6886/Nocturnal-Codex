import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";
import {
  SiC, SiCplusplus, SiCsharp, SiCss3, SiDart, SiElixir, SiGo, SiHaskell, SiHtml5, SiJava, SiJavascript, SiKotlin, SiPython, SiR, SiRuby, SiRust, SiScala, SiSwift, SiTypescript, SiZig, SiPhp, SiPerl, SiSolidity, SiGnubash, SiMysql, SiApple
} from 'react-icons/si';

interface SimpleIconProps extends React.SVGProps<SVGSVGElement> {
  iconName: string;
}

const iconMap: Record<string, React.ElementType> = {
  "c": SiC,
  "c++": SiCplusplus,
  "cplusplus": SiCplusplus,
  "c#": SiCsharp,
  "csharp": SiCsharp,
  "css": SiCss3,
  "dart": SiDart,
  "elixir": SiElixir,
  "go": SiGo,
  "haskell": SiHaskell,
  "html": SiHtml5,
  "java": SiJava,
  "javascript": SiJavascript,
  "kotlin": SiKotlin,
  "python": SiPython,
  "r": SiR,
  "ruby": SiRuby,
  "rust": SiRust,
  "scala": SiScala,
  "swift": SiSwift,
  "typescript": SiTypescript,
  "zig": SiZig,
  "php": SiPhp,
  "perl": SiPerl,
  "solidity": SiSolidity,
  "sql": SiMysql,
  "shell": SiGnubash,
  "bash": SiGnubash,
  "objective-c": SiApple,
};

export function SimpleIcon({ iconName, className, ...props }: SimpleIconProps) {
  const normalizedName = iconName.toLowerCase().trim();
  const IconComponent = iconMap[normalizedName] || Terminal;

  return (
    <IconComponent 
      className={cn("w-6 h-6", className)} 
      {...props} 
    />
  );
}
