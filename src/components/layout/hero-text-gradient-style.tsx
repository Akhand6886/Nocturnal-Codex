"use client";

// This component encapsulates the styled-jsx for the hero text gradient animation,
// allowing it to be used in Server Components without causing errors.
export function HeroTextGradientStyle() {
  return (
    <style jsx global>{`
      @keyframes text-gradient-flow {
        from {
          background-position: 200% center;
        }
        to {
          background-position: 0% center;
        }
      }
      .animate-text-gradient-flow-alt {
        background-size: 200% 200%;
        animation: text-gradient-flow 15s linear infinite;
      }
    `}</style>
  );
}
