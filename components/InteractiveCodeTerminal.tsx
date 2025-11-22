"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import { Terminal, Play } from "lucide-react";

export default function InteractiveCodeTerminal() {
  const [isRunning, setIsRunning] = useState(false);

  const codeSnippets = [
    { language: "Python", code: "model.train(epochs=100)\naccuracy = 0.95 # 95% accuracy!" },
    { language: "Swift", code: "BLEManager.connect()\nheartRate.stream() // Real-time!" },
    { language: "TypeScript", code: "const impact = await deploy()\n// 15% improvement 🚀" },
  ];

  const [currentSnippet, setCurrentSnippet] = useState(0);

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-500/20"
        >
          {/* Terminal Header */}
          <div className="bg-gray-800/50 backdrop-blur-sm px-4 py-3 flex items-center gap-2 border-b border-cyan-500/30">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Terminal size={16} className="text-cyan-400" />
              <span className="text-cyan-400 text-sm font-mono">
                rohin@whoop:~/projects
              </span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-sm">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-green-400">$</span>
              <TypeAnimation
                sequence={[
                  "Building production-ready iOS apps...",
                  2000,
                  "Training ML models with PyTorch...",
                  2000,
                  "Deploying edge AI systems...",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                className="text-gray-300"
                repeat={Infinity}
              />
            </div>

            {/* Code Output */}
            <motion.div
              className="bg-black/50 rounded-lg p-4 border border-cyan-500/20"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-cyan-400">
                  {codeSnippets[currentSnippet].language}
                </span>
                <motion.button
                  className="flex items-center gap-1 px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs hover:bg-cyan-500/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsRunning(true);
                    setTimeout(() => {
                      setIsRunning(false);
                      setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
                    }, 1500);
                  }}
                >
                  <Play size={12} />
                  Run
                </motion.button>
              </div>
              <pre className="text-green-400 text-xs">
                {codeSnippets[currentSnippet].code}
              </pre>
              {isRunning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-xs text-yellow-400"
                >
                  ✓ Execution successful
                </motion.div>
              )}
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { label: "Projects", value: "6+", color: "blue" },
                { label: "Co-ops", value: "3", color: "purple" },
                { label: "Impact", value: "95%+", color: "cyan" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className={`text-2xl font-bold text-${stat.color}-400`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

