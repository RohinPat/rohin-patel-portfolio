"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const rafRef = useRef<number>();

  useEffect(() => {
    // Set initial dimensions
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }

    let lastUpdate = 0;
    const throttleMs = 30;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      
      if (now - lastUpdate >= throttleMs) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
          lastUpdate = now;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {techStack.map((tech, index) => {
        // Calculate icon's actual position
        const iconX = (parseFloat(tech.x) / 100) * dimensions.width;
        const iconY = (parseFloat(tech.y) / 100) * dimensions.height;
        
        // 1. PARALLAX EFFECT (subtle movement based on mouse position across screen)
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;
        const parallaxFactor = 0.015; // Subtle parallax
        const parallaxX = (mousePos.x - centerX) * parallaxFactor * (index % 2 === 0 ? 1 : -1);
        const parallaxY = (mousePos.y - centerY) * parallaxFactor * (index % 2 === 0 ? 1 : -1);
        
        // 2. CHASE EFFECT (icons run away when mouse gets close)
        const deltaX = mousePos.x - iconX;
        const deltaY = mousePos.y - iconY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        const chaseRadius = 200;
        let chaseX = 0;
        let chaseY = 0;
        
        if (distance < chaseRadius && distance > 0) {
          // Icon runs away!
          const force = (chaseRadius - distance) / chaseRadius;
          const pushDistance = 120 * force; // Max 120px push
          
          chaseX = -(deltaX / distance) * pushDistance;
          chaseY = -(deltaY / distance) * pushDistance;
        }
        
        // COMBINE both effects
        const totalX = parallaxX + chaseX;
        const totalY = parallaxY + chaseY;

        return (
          <motion.div
            key={tech.name}
            className="absolute text-4xl opacity-20 hover:opacity-50 will-change-transform transition-opacity duration-300"
            style={{
              left: tech.x,
              top: tech.y,
            }}
            animate={{
              x: totalX,
              y: totalY,
            }}
            transition={{
              type: "spring",
              stiffness: distance < chaseRadius ? 200 : 80, // Faster when fleeing
              damping: distance < chaseRadius ? 12 : 20,    // Snappier when fleeing
              mass: 0.3,
            }}
          >
            {tech.emoji}
          </motion.div>
        );
      })}
    </div>
  );
}
