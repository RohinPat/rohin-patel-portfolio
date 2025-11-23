"use client";

import Skills from "@/components/Skills";
import ParticleBackground from "@/components/ParticleBackground";
import WaveBackground from "@/components/WaveBackground";
import { motion } from "framer-motion";

export default function SkillsPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      <WaveBackground />
      <ParticleBackground />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 pt-24"
      >
        <Skills />
      </motion.div>
    </main>
  );
}


