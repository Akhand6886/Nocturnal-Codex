"use client";

// Cyberpunk gradient animation for hero text
export function HeroTextGradientStyle() {
  return (
    <style jsx global>{`
      @keyframes text-gradient-flow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .animate-text-gradient-flow {
        background-size: 200% 200%;
        animation: text-gradient-flow 8s ease infinite;
      }
      @keyframes hero-glow {
        0%, 100% { 
          text-shadow: 0 0 20px hsl(262 83% 58% / 0.3), 0 0 60px hsl(185 100% 50% / 0.1);
        }
        50% { 
          text-shadow: 0 0 30px hsl(262 83% 58% / 0.5), 0 0 80px hsl(185 100% 50% / 0.2);
        }
      }
      .animate-hero-glow {
        animation: hero-glow 4s ease-in-out infinite;
      }
    `}</style>
  );
}
