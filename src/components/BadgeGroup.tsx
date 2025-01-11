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
  const [triggerShuffle, setTriggerShuffle] = useState(false);

  // Initial shuffle
  useEffect(() => {
    setShuffledBadges(shuffleArray(badges));
  }, []);

  // Second shuffle after a delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShuffledBadges(shuffleArray(badges));
      setTriggerShuffle(true);
    }, 150); // Adjust delay as needed
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div className="md:flex gap-2 flex-wrap md:p-5 mt-2 relative" layout>
      {shuffledBadges.map((badge) => (
        <motion.div
          key={badge}
          className="w-max"
          layout
          transition={{
            layout: {
              duration: 0.75,
              ease: "easeInOut",
            },
          }}
        >
          <Badge text={badge} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default App;
