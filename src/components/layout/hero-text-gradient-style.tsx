
"use client";

// This component encapsulates the styled-jsx for the hero text gradient animation,
// allowing it to be used in Server Components without causing errors.
export function HeroTextGradientStyle() {
  return (
    <style jsx global>{`
      @keyframes text-gradient-flow-alt {
        0% {
          background-position: 0% 50%;
        }
        25% {
          background-position: 50% 100%;
        }
        50% {
          background-position: 100% 50%;
        }
        75% {
            background-position: 50% 0%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
      .animate-text-gradient-flow-alt {
        background-size: 300% 300%; /* Increased size for smoother, slower flow with more color visibility */
        animation: text-gradient-flow-alt 8s ease infinite; /* Slower animation */
      }
    `}</style>
  );
}
