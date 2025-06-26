"use client";

// This component encapsulates the styled-jsx for the hero text gradient animation,
// allowing it to be used in Server Components without causing errors.
export function HeroTextGradientStyle() {
  return (
    <style jsx global>{`
      @keyframes text-gradient-flow {
        0% {
          background-position: 0% 50%;
        }
        100% {
          background-position: 200% 50%;
        }
      }
      .animate-text-gradient-flow-alt {
        background-size: 200% 200%;
        animation: text-gradient-flow 8s linear infinite;
      }
    `}</style>
  );
}
