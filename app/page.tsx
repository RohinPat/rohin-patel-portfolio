"use client";

import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import ParticleBackground from "@/components/ParticleBackground";
import CustomCursor from "@/components/CustomCursor";
import FloatingTechIcons from "@/components/FloatingTechIcons";
import WaveBackground from "@/components/WaveBackground";
import InteractiveCodeTerminal from "@/components/InteractiveCodeTerminal";
import InteractiveStats from "@/components/InteractiveStats";
import Playground from "@/components/Playground";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Background layers */}
      <WaveBackground />
      <ParticleBackground />
      <FloatingTechIcons />
      
      {/* Custom cursor for desktop */}
      <div className="hidden lg:block">
        <CustomCursor />
      </div>
      
      <Navigation />
      
      <div className="relative z-10">
        <Hero />
        <InteractiveCodeTerminal />
        <InteractiveStats />
        <Projects />
        <Playground />
        <Experience />
        <Skills />
        <Contact />
      </div>
    </main>
  );
}


