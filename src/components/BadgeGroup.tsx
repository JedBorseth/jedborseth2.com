import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BadgeProps {
  text: string;
}

const pastelColors = [
  "#FFCDD2", // Light red
  "#F8BBD0", // Light pink
  "#E1BEE7", // Light purple
  "#D1C4E9", // Light lavender
  "#C5CAE9", // Light blue
  "#BBDEFB", // Light sky blue
  "#B3E5FC", // Light cyan
  "#B2EBF2", // Light teal
  "#C8E6C9", // Light green
  "#DCEDC8", // Light lime green
  "#FFF9C4", // Light yellow
  "#FFECB3", // Light amber
  "#FFE0B2", // Light orange
];

const getRandomPastelColor = () =>
  pastelColors[Math.floor(Math.random() * pastelColors.length)];

const Badge = ({ text }: BadgeProps) => {
  const [bgColor, setBgColor] = useState<string>("");

  useEffect(() => {
    setBgColor(getRandomPastelColor());
  }, []);

  return (
    <div
      className="w-min rounded-base border-2 border-black px-3 py-1.5 text-sm font-base"
      style={{ backgroundColor: bgColor }}
    >
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
