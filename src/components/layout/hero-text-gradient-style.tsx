
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
          background-position: 75% 100%; /* Adjusted for smoother flow */
        }
        50% {
          background-position: 100% 50%;
        }
        75% {
            background-position: 25% 0%; /* Adjusted for smoother flow */
        }
        100% {
          background-position: 0% 50%;
        }
      }
      .animate-text-gradient-flow-alt {
        background-size: 250% 250%; /* Slightly reduced size for sharper gradient edges */
        animation: text-gradient-flow-alt 10s ease infinite; /* Slower, smoother animation */
      }
    `}</style>
  );
}
