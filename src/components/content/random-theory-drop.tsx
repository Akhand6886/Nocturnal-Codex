
'use client';

import { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STATIC_THEORY_FACTS = [
  {
    topic: "COMPUTATIONAL COMPLEXITY",
    axiom: "P vs NP asks whether every problem whose solution can be quickly verified by a deterministic computer can also be quickly solved by one.",
  },
  {
    topic: "DECIDABILITY & TURING COMPUTATION",
    axiom: "The Halting Problem proves that no general algorithm can determine whether an arbitrary computer program will terminate or run forever.",
  },
  {
    topic: "INFORMATION THEORY",
    axiom: "Shannon's Source Coding Theorem establishes the mathematical limit to lossless data compression, defining entropy as fundamental uncertainty.",
  },
  {
    topic: "MATHEMATICAL LOGIC",
    axiom: "Gödel's Incompleteness Theorems establish that in any consistent formal system containing basic arithmetic, there are true statements that cannot be proven within the system.",
  },
  {
    topic: "FORMAL COMPUTATION",
    axiom: "Church's Lambda Calculus demonstrates that function abstraction and variable binding suffice to simulate any arbitrary Turing machine.",
  },
];

export function RandomTheoryDrop() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * STATIC_THEORY_FACTS.length));
  }, []);

  const nextAxiom = () => {
    setIndex((prev) => (prev + 1) % STATIC_THEORY_FACTS.length);
  };

  const item = STATIC_THEORY_FACTS[index];

  return (
    <div className="rounded-lg border border-border bg-[#181818] p-5 sm:p-6 transition-all duration-300">
      <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#272727]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold">
            CODEX AXIOM // {item.topic}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-muted-foreground">
            {String(index + 1).padStart(2, '0')} / {String(STATIC_THEORY_FACTS.length).padStart(2, '0')}
          </span>
          <button
            onClick={nextAxiom}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-[#272727]"
            aria-label="Next Axiom"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="pt-4">
        <p className="text-sm md:text-base text-foreground/90 leading-relaxed font-sans font-normal">
          &ldquo;{item.axiom}&rdquo;
        </p>
      </div>
    </div>
  );
}
