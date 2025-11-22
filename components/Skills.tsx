"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Smartphone, Database, Cloud, Cpu } from "lucide-react";

const skillCategories = [
  {
    title: "Mobile Development",
    icon: Smartphone,
    skills: ["SwiftUI", "iOS", "BLE", "React Native", "Mobile UI/UX", "Haptic Feedback"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "AI & Machine Learning",
    icon: Brain,
    skills: ["PyTorch", "TensorFlow", "YOLO", "OpenCV", "NLP", "Computer Vision", "Scikit-Learn"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Programming Languages",
    icon: Code2,
    skills: ["Python", "Swift", "JavaScript", "TypeScript", "Java", "Go", "C++", "C", "SQL"],
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS (Lambda, S3, Textract)", "Azure", "Docker", "Kubernetes", "CI/CD", "Redis"],
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Web & Backend",
    icon: Code2,
    skills: ["React", "Next.js", "Node.js", "FastAPI", "Flask", "gRPC", "REST APIs"],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Data & Databases",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Supabase", "Pandas", "NumPy"],
    gradient: "from-indigo-500 to-purple-500",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-blue">Skills & Technologies</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit built through academic projects and professional experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="h-full bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/[0.07] transition-all"
                  whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                >
                  {/* Icon */}
                  <motion.div
                    className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${category.gradient} mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="text-white" size={24} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                        className="px-3 py-1.5 text-sm font-medium bg-white/5 text-gray-300 rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Fun Facts / Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl border border-white/10 p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Beyond Coding</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              When I'm not building iOS apps or training ML models, you'll find me on the slopes skiing ⛷️, 
              building custom mechanical keyboards ⌨️, playing video games 🎮, hiking 🥾, or practicing French horn and flute 🎺
            </p>
            <div className="mt-4 text-gray-400 text-sm">
              Also studied Chinese for 6 years 🇨🇳 | Northeastern AI Club | Downhill Skiers | Phi Gamma Delta
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

