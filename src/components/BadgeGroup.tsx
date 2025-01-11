import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BadgeProps {
  text: string;
}

const Badge = ({ text }: BadgeProps) => {
  return (
    <div className="w-min rounded-base border-2 border-black bg-main px-3 py-1.5 text-sm font-base">
      {text}
    </div>
  );
};

const badges = [
  "Typescript",
  "NextJS",
  "React",
  "MySQL",
  "PHP",
  "DrizzleORM",
  "GoLang",
  "NodeJS",
  "AWS",
  "HTMX",
  "tRPC",
];

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

const App = () => {
  const [shuffledBadges, setShuffledBadges] = useState<string[]>([]);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Detect user preference for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Initial shuffle
  useEffect(() => {
    setShuffledBadges(shuffleArray(badges));
  }, []);

  // Second shuffle after a delay
  useEffect(() => {
    if (isReducedMotion) return; // Skip animation if reduced motion is preferred

    const timeout = setTimeout(() => {
      setShuffledBadges(shuffleArray(badges));
    }, 150); // Adjust delay as needed
    return () => clearTimeout(timeout);
  }, [isReducedMotion]);

  return (
    <motion.div className="flex gap-2 flex-wrap md:p-5 mt-2 relative" layout>
      {shuffledBadges.map((badge) => (
        <motion.div
          key={badge}
          className="w-max"
          layout
          transition={
            isReducedMotion
              ? {} // Skip animation if reduced motion is preferred
              : {
                  layout: {
                    duration: 0.75,
                    ease: "easeInOut",
                  },
                }
          }
        >
          <Badge text={badge} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default App;
