
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import * as React from 'react';

// Static facts to cycle through (client-side only)
const STATIC_THEORY_FACTS = [
  "P vs NP is one of the most important unsolved problems in computer science. It asks whether every problem whose solution can be quickly verified by a computer can also be quickly solved by a computer.",
  "The Halting Problem, proven by Alan Turing, demonstrates that it's impossible to write a general algorithm that can determine whether any given program will finish running or continue to run forever.",
  "Shannon's source coding theorem establishes the limits to possible data compression and the operational meaning of entropy.",
  "Gödel's incompleteness theorems show that in any consistent formal system powerful enough to describe basic arithmetic, there are true statements that cannot be proven within the system itself.",
  "Lambda calculus, developed by Alonzo Church, is a foundational system for functional programming and theoretical computer science."
];

export function RandomTheoryDrop() {
  const [fact, setFact] = React.useState("Loading theory...");

  React.useEffect(() => {
    const randomIndex = Math.floor(Math.random() * STATIC_THEORY_FACTS.length);
    setFact(STATIC_THEORY_FACTS[randomIndex]);
  }, []);


  return (
    <Card className="bg-card shadow-lg border-border/60">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-primary">
          Static Theory Drop
        </CardTitle>
        <Lightbulb className="h-5 w-5 text-accent" />
      </CardHeader>
      <CardContent>
        <p className="text-base text-foreground/90 italic">"{fact}"</p>
      </CardContent>
    </Card>
  );
}
