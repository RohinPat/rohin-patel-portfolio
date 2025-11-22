"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mountain, Car, Brain } from "lucide-react";
import SkiingGame from "./games/SkiingGame";
import TrafficGame from "./games/TrafficGame";
import AIDemo from "./games/AIDemo";

type GameType = "skiing" | "traffic" | "ai" | null;

const games = [
  {
    id: "skiing" as GameType,
    name: "Ski Slalom",
    icon: Mountain,
    description: "Navigate gates down the slopes",
    gradient: "from-blue-500 to-cyan-500",
    tag: "Personal Interest"
  },
  {
    id: "traffic" as GameType,
    name: "Traffic Analytics",
    icon: Car,
    description: "Based on my Varidx project",
    gradient: "from-orange-500 to-red-500",
    tag: "Work Experience"
  },
  {
    id: "ai" as GameType,
    name: "AI Detection Demo",
    icon: Brain,
    description: "Live object detection",
    gradient: "from-purple-500 to-pink-500",
    tag: "Tech Showcase"
  },
];

export default function Playground() {
  const [selectedGame, setSelectedGame] = useState<GameType>(null);

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
            <span className="gradient-text-blue">🎮 Playground</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Take a break and play some mini-games! Built with React and TypeScript.
          </p>
        </motion.div>

        {!selectedGame ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {games.map((game, index) => {
              const Icon = game.icon;
              return (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.button
                    onClick={() => setSelectedGame(game.id)}
                    className="w-full h-full bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-md rounded-2xl border border-white/20 p-8 hover:border-cyan-500/50 transition-all group text-left"
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Glowing orb */}
                    <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${game.gradient} opacity-0 group-hover:opacity-20 rounded-full blur-3xl transition-all duration-500`} />

                    {/* Icon */}
                    <motion.div
                      className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${game.gradient} mb-4 shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="text-white" size={32} />
                    </motion.div>

                    {/* Content */}
                    {/* Tag */}
                    <div className="mb-2">
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full border border-cyan-500/30">
                        {game.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {game.name}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {game.description}
                    </p>

                    {/* Play button */}
                    <motion.div
                      className={`mt-6 px-4 py-2 bg-gradient-to-r ${game.gradient} text-white rounded-lg font-semibold inline-block`}
                      whileHover={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                    >
                      {game.id === 'ai' ? 'Try Demo →' : 'Play Now →'}
                    </motion.div>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Back Button */}
            <motion.button
              onClick={() => setSelectedGame(null)}
              className="mb-8 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg font-semibold transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back to Games
            </motion.button>

            {/* Game Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full flex justify-center"
            >
              {selectedGame === "skiing" && <SkiingGame />}
              {selectedGame === "traffic" && <TrafficGame />}
              {selectedGame === "ai" && <AIDemo />}
            </motion.div>
          </div>
        )}

        {/* Fun Facts */}
        {!selectedGame && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl border border-white/10 p-8 max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">💡 Why This Playground?</h3>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <p className="text-cyan-400 font-semibold mb-2">⛷️ Personal</p>
                  <p className="text-gray-300 text-sm">
                    Skiing is my passion. This shows I can build things I care about.
                  </p>
                </div>
                <div>
                  <p className="text-orange-400 font-semibold mb-2">🚗 Professional</p>
                  <p className="text-gray-300 text-sm">
                    Based on my real Varidx traffic system (95% accuracy, 50k+ vehicles/day).
                  </p>
                </div>
                <div>
                  <p className="text-purple-400 font-semibold mb-2">🤖 Technical</p>
                  <p className="text-gray-300 text-sm">
                    Live demo of YOLO-style object detection using PyTorch & OpenCV.
                  </p>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-6">
                Plus: localStorage-based leaderboards with Supabase integration ready!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

