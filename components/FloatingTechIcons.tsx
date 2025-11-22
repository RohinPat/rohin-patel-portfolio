"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect } from "react";

const techStack = [
  { name: "Swift", emoji: "🔷", x: "10%", y: "20%" },
  { name: "Python", emoji: "🐍", x: "80%", y: "15%" },
  { name: "React", emoji: "⚛️", x: "15%", y: "70%" },
  { name: "AI", emoji: "🤖", x: "75%", y: "65%" },
  { name: "iOS", emoji: "📱", x: "50%", y: "10%" },
  { name: "Docker", emoji: "🐳", x: "85%", y: "85%" },
  { name: "AWS", emoji: "☁️", x: "20%", y: "45%" },
  { name: "PyTorch", emoji: "🔥", x: "60%", y: "80%" },
];

export default function FloatingTechIcons() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {techStack.map((tech, index) => {
        const distance = 100;
        const offsetX = useTransform(
          mouseX,
          [0, window.innerWidth],
          [-distance, distance]
        );
        const offsetY = useTransform(
          mouseY,
          [0, window.innerHeight],
          [-distance, distance]
        );

        const springX = useSpring(offsetX, { stiffness: 50, damping: 20 });
        const springY = useSpring(offsetY, { stiffness: 50, damping: 20 });

        return (
          <motion.div
            key={tech.name}
            className="absolute text-4xl opacity-20 hover:opacity-40 transition-opacity"
            style={{
              left: tech.x,
              top: tech.y,
              x: springX,
              y: springY,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {tech.emoji}
          </motion.div>
        );
      })}
    </div>
  );
}

