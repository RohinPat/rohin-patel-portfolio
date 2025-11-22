"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    company: "WHOOP",
    role: "iOS Engineer Co-op",
    period: "Jul 2025 - Present",
    description: [
      "Improved onboarding completion by 15% with live heart rate BLE streaming in SwiftUI",
      "Boosted Daily Active Members by 10% through interactive onboarding visuals and haptic feedback",
      "Increased engineering throughput by 25% PRs/release by building DInject mock generator for 20+ iOS engineers",
    ],
    tech: ["SwiftUI", "BLE", "iOS", "Dependency Injection", "Developer Tools"],
    color: "purple",
  },
  {
    company: "SiPhox Health",
    role: "Software Developer Co-op",
    period: "Jul 2024 - Dec 2024",
    description: [
      "Launched first iOS app in SwiftUI generating 3D body models with ±3.9% median error vs. clinical benchmarks",
      "Automated blood test parsing via AWS Lambda with 95% accuracy using OpenAI, Textract, and Comprehend",
      "Shipped bug fixes across CMS, backend services, and web portal improving data quality and reliability",
    ],
    tech: ["SwiftUI", "Python", "AWS Lambda", "OpenAI", "Textract", "Comprehend"],
    color: "blue",
  },
  {
    company: "Varidx",
    role: "Software Engineering Intern",
    period: "May 2024 - Jul 2024",
    description: [
      "Built edge traffic analytics with YOLO achieving 95% accuracy monitoring 50k+ vehicles/day",
      "Developed real-time collision alert system detecting vehicles in adjacent lanes",
      "Integrated IoT devices with Azure databases powering analytics dashboards for city planning",
    ],
    tech: ["Python", "YOLO", "OpenCV", "Azure", "IoT", "Edge Computing"],
    color: "cyan",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-blue">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg">
            My professional journey in tech
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative mb-12 ${
                index % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-auto"
              }`}
            >
              <div className="flex items-start gap-4 md:gap-0">
                {/* Timeline dot */}
              <motion.div
                className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-4 border-black -ml-2 md:-ml-2`}
                whileHover={{ scale: 1.8 }}
                animate={{
                  boxShadow: [
                    `0 0 0 0 ${exp.color === 'blue' ? 'rgba(59, 130, 246, 0.7)' : exp.color === 'purple' ? 'rgba(168, 85, 247, 0.7)' : 'rgba(6, 182, 212, 0.7)'}`,
                    `0 0 0 10px ${exp.color === 'blue' ? 'rgba(59, 130, 246, 0)' : exp.color === 'purple' ? 'rgba(168, 85, 247, 0)' : 'rgba(6, 182, 212, 0)'}`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                style={{ backgroundColor: exp.color === 'blue' ? '#3b82f6' : exp.color === 'purple' ? '#a855f7' : '#06b6d4' }}
              />

                {/* Content card */}
                <motion.div
                  className={`ml-16 md:ml-0 ${index % 2 === 0 ? "md:mr-12" : "md:ml-12"} w-full md:w-auto`}
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-md rounded-xl border border-white/20 p-6 hover:border-cyan-500/50 transition-all group overflow-hidden">
                    {/* Glowing orb on hover */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-500/30 transition-all duration-500" />
                    {/* Company & Role */}
                    <div className="relative flex items-start gap-3 mb-3">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Briefcase className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{exp.role}</h3>
                        <p className="text-blue-400 font-semibold group-hover:text-cyan-400 transition-colors">{exp.company}</p>
                      </div>
                    </div>

                    {/* Period */}
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>

                    {/* Description */}
                    <ul className="space-y-2 mb-4 text-gray-300 text-sm">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack */}
                    <div className="relative flex flex-wrap gap-2">
                      {exp.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: techIndex * 0.05 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-3 py-1 text-xs font-medium bg-white/10 text-gray-300 rounded-full border border-white/20 hover:border-cyan-400/50 hover:text-cyan-300 transition-all cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

