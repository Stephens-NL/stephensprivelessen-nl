import React from "react";
import { m } from "framer-motion";

interface AnimatedItem {
  icon: string;
  rotation: number;
}

const ImprovedAnimatedBackground: React.FC = () => {
  const items: AnimatedItem[] = [
    { icon: '📚', rotation: 15 },
    { icon: '✏️', rotation: -10 },
    { icon: '🖍️', rotation: 20 },
    { icon: '🔬', rotation: -15 },
    { icon: '🧮', rotation: 25 },
    { icon: '💻', rotation: -20 },
    { icon: '🎨', rotation: 30 },
    { icon: '🔍', rotation: -25 },
    { icon: '📐', rotation: 35 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {items.map((item) => (
        <m.div
          key={`${item.icon}-${item.rotation}`}
          className="absolute text-4xl opacity-5"
          style={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
          }}
          animate={{
            x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
            y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
            rotate: [item.rotation, item.rotation + 360],
          }}
          transition={{
            duration: 60 + Math.random() * 30,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        >
          {item.icon}
        </m.div>
      ))}
    </div>
  );
};

export default ImprovedAnimatedBackground;