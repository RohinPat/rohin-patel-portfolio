"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Gamepad2, Keyboard, Brain } from "lucide-react";
import SnakeGame from "./games/SnakeGame";
import TypingTest from "./games/TypingTest";
import MemoryGame from "./games/MemoryGame";

type GameType = "snake" | "typing" | "memory" | null;

const games = [
  {
    id: "snake" as GameType,
    name: "Snake",
    icon: Gamepad2,
    description: "Classic snake game",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "typing" as GameType,
    name: "Typing Test",
    icon: Keyboard,
    description: "Test your coding speed",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "memory" as GameType,
    name: "Memory Cards",
    icon: Brain,
    description: "Match the tech emojis",
    gradient: "from-purple-500 to-pink-500",
  },
];

export default function Playground() {
  const [selectedGame, setSelectedGame] = useState<GameType>(null);

  return (
    <section id="playground" className="min-h-screen py-20 px-4">
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
                      Play Now →
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
              {selectedGame === "snake" && <SnakeGame />}
              {selectedGame === "typing" && <TypingTest />}
              {selectedGame === "memory" && <MemoryGame />}
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
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl border border-white/10 p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-3">💡 Why Games?</h3>
              <p className="text-gray-300">
                These games showcase state management, event handling, game loops, and animations—all
                fundamental skills in software development. Plus, they're fun! 🎉
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

