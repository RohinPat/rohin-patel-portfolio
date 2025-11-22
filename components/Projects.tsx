"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Brain, Car, Gamepad2, Activity, MessageSquare, Cog, Smartphone } from "lucide-react";
import { useState } from "react";
import Tilt from "react-parallax-tilt";

const projects = [
  {
    title: "WHOOP Heart Rate Onboarding",
    description: "Built live heart rate onboarding in SwiftUI with real-time BLE streaming, improving completion by 15% and boosting Daily Active Members by 10%.",
    tech: ["SwiftUI", "BLE", "iOS", "Real-time Streaming", "UX Design"],
    icon: Activity,
    gradient: "from-purple-500 to-pink-500",
    category: "Mobile",
    github: null,
    demo: null,
  },
  {
    title: "SiPhox 3D Body Scan iOS App",
    description: "First iOS app generating 3D body models from video for body fat % analysis with ±3.9% median error vs. clinical benchmarks.",
    tech: ["SwiftUI", "Python", "3D Graphics", "Computer Vision"],
    icon: Smartphone,
    gradient: "from-blue-500 to-cyan-500",
    category: "Mobile",
    github: null,
    demo: null,
  },
  {
    title: "Edge Traffic Analytics System",
    description: "Built edge-based system with YOLO and OpenCV achieving 95% vehicle detection accuracy, monitoring 50k+ vehicles/day for city dashboards.",
    tech: ["Python", "YOLO", "OpenCV", "Azure", "IoT"],
    icon: Car,
    gradient: "from-orange-500 to-red-500",
    category: "AI/ML",
    github: null,
    demo: null,
  },
  {
    title: "AiMessage - Mental Health Messaging",
    description: "Full-stack real-time messaging platform with NLP-powered sentiment analysis, emotional state tracking, and mental health recommendations.",
    tech: ["Next.js", "React", "TypeScript", "MySQL", "Prisma", "Pusher", "NLP"],
    icon: MessageSquare,
    gradient: "from-indigo-500 to-purple-500",
    category: "Web",
    github: "https://github.com/RohinPat/ai-message",
    demo: "https://ai-message.vercel.app",
  },
  {
    title: "AI Closet Organization",
    description: "Trained PyTorch models for clothing classification with 92% accuracy across 10k+ samples. Deployed FastAPI service for real-time outfit recommendations.",
    tech: ["Python", "PyTorch", "FastAPI", "Docker", "Deep Learning"],
    icon: Brain,
    gradient: "from-green-500 to-emerald-500",
    category: "AI/ML",
    github: null,
    demo: null,
  },
  {
    title: "BlueBikes Data Visualization",
    description: "Interactive web app analyzing Boston's bike-sharing patterns with 6+ visualization types including heatmaps, geospatial maps, and temporal analysis.",
    tech: ["Python", "Flask", "Plotly", "D3.js", "Pandas", "Altair"],
    icon: Activity,
    gradient: "from-cyan-500 to-blue-500",
    category: "AI/ML",
    github: "https://github.com/RohinPat/data-visualization-bluebikes",
    demo: "https://data-visualization-bluebikes.vercel.app",
  },
];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Mobile", "AI/ML", "Web"];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-blue">Featured Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my work in AI, computer vision, robotics, and mobile development
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                filter === category
                  ? "bg-blue-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Tilt
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  glareEnable={true}
                  glareMaxOpacity={0.3}
                  glareColor="#3b82f6"
                  glarePosition="all"
                  glareBorderRadius="12px"
                  scale={1.05}
                  transitionSpeed={1000}
                  className="h-full"
                >
                  <div className="relative h-full bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-md rounded-xl border border-white/20 p-6 overflow-hidden group hover:border-cyan-500/50 transition-all duration-300">
                    {/* Animated gradient background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                    
                    {/* Glowing orb effect */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-500/30 transition-all duration-500" />
                    
                    {/* Icon with 3D effect */}
                    <motion.div
                      className={`relative inline-flex p-3 rounded-lg bg-gradient-to-br ${project.gradient} mb-4 shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="text-white" size={28} />
                    </motion.div>

                    {/* Content */}
                    <h3 className="relative text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="relative text-gray-400 mb-4 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                      {project.description}
                    </p>

                    {/* Tech Stack with animation */}
                    <div className="relative flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.05 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-3 py-1 text-xs font-medium bg-white/10 text-gray-300 rounded-full border border-white/20 backdrop-blur-sm hover:border-cyan-400/50 hover:text-cyan-300 transition-all cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Links with glow effect */}
                    <div className="relative flex gap-3">
                      {project.github ? (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-400 hover:text-cyan-300 transition-colors"
                          whileHover={{ x: 5, textShadow: "0 0 8px rgba(34, 211, 238, 0.8)" }}
                        >
                          <Github size={16} />
                          Code
                        </motion.a>
                      ) : (
                        <span className="flex items-center gap-2 text-sm text-gray-600 cursor-not-allowed">
                          <Github size={16} />
                          Private
                        </span>
                      )}
                      {project.demo ? (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-400 hover:text-cyan-300 transition-colors"
                          whileHover={{ x: 5, textShadow: "0 0 8px rgba(34, 211, 238, 0.8)" }}
                        >
                          <ExternalLink size={16} />
                          Demo
                        </motion.a>
                      ) : (
                        <span className="flex items-center gap-2 text-sm text-gray-600 cursor-not-allowed">
                          <ExternalLink size={16} />
                          NDA
                        </span>
                      )}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

