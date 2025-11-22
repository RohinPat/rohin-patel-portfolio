"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Trophy, Mountain } from "lucide-react";
import { saveScore, getLeaderboard } from "@/lib/supabase";

type Gate = {
  id: number;
  x: number;
  y: number;
  passed: boolean;
};

const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const SKIER_SIZE = 30;
const GATE_WIDTH = 120;
const SPEED = 3;

export default function SkiingGame() {
  const [skierX, setSkierX] = useState(GAME_WIDTH / 2);
  const [scrollY, setScrollY] = useState(0);
  const [gates, setGates] = useState<Gate[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(SPEED);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateGate = useCallback((y: number) => {
    const x = Math.random() * (GAME_WIDTH - GATE_WIDTH - 40) + 20;
    return {
      id: Date.now() + Math.random(),
      x,
      y,
      passed: false,
    };
  }, []);

  const startGame = () => {
    setSkierX(GAME_WIDTH / 2);
    setScrollY(0);
    setGates([
      generateGate(-100),
      generateGate(-300),
      generateGate(-500),
    ]);
    setScore(0);
    setSpeed(SPEED);
    setGameOver(false);
    setIsPlaying(true);
    setLeaderboard(getLeaderboard('skiing'));
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isPlaying) return;
    
    const moveAmount = 15;
    if (e.key === "ArrowLeft") {
      setSkierX((x) => Math.max(20, x - moveAmount));
    } else if (e.key === "ArrowRight") {
      setSkierX((x) => Math.min(GAME_WIDTH - 20, x + moveAmount));
    }
  }, [isPlaying]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!isPlaying) return;

    gameLoopRef.current = setInterval(() => {
      setScrollY((y) => y + speed);

      setGates((prevGates) => {
        let newGates = prevGates.map((gate) => ({
          ...gate,
          y: gate.y + speed,
        }));

        // Check for passing gates
        newGates = newGates.map((gate) => {
          if (!gate.passed && gate.y > GAME_HEIGHT - 100 && gate.y < GAME_HEIGHT - 50) {
            const skierCenter = skierX;
            const gateLeft = gate.x;
            const gateRight = gate.x + GATE_WIDTH;
            
            if (skierCenter >= gateLeft && skierCenter <= gateRight) {
              setScore((s) => s + 10);
              setSpeed((s) => Math.min(s + 0.1, 8));
              return { ...gate, passed: true };
            } else {
              // Missed gate - game over
              setGameOver(true);
              setIsPlaying(false);
              const newLeaderboard = saveScore('skiing', score, 'You');
              setLeaderboard(newLeaderboard);
            }
          }
          return gate;
        });

        // Remove gates that are off screen and add new ones
        if (newGates.some((gate) => gate.y > GAME_HEIGHT + 50)) {
          newGates = newGates.filter((gate) => gate.y <= GAME_HEIGHT + 50);
          newGates.push(generateGate(-100));
        }

        return newGates;
      });
    }, 1000 / 60);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, speed, skierX, score, generateGate]);

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
      {/* Game Area */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Score</p>
            <p className="text-3xl font-bold text-cyan-400">{score}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Speed</p>
            <p className="text-2xl font-bold text-orange-400">{speed.toFixed(1)}x</p>
          </div>
        </div>

        <div
          className="relative bg-gradient-to-b from-white/10 via-blue-400/20 to-blue-600/30 border-2 border-cyan-500/30 rounded-lg overflow-hidden"
          style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        >
          {/* Mountain background */}
          <div className="absolute inset-0 opacity-20">
            <Mountain className="absolute top-10 left-10 text-white" size={60} />
            <Mountain className="absolute top-20 right-20 text-white" size={80} />
            <Mountain className="absolute bottom-40 left-1/3 text-white" size={50} />
          </div>

          {/* Snow pattern */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${(scrollY + i * 30) % GAME_HEIGHT}px`,
                }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>

          {/* Gates (ski slalom poles) */}
          {gates.map((gate) => (
            <div key={gate.id} className="absolute" style={{ top: gate.y, left: gate.x }}>
              {/* Left pole */}
              <div className="absolute w-3 h-24 bg-gradient-to-b from-red-500 to-red-700 rounded-full shadow-lg" />
              {/* Right pole */}
              <div
                className="absolute w-3 h-24 bg-gradient-to-b from-red-500 to-red-700 rounded-full shadow-lg"
                style={{ left: GATE_WIDTH - 12 }}
              />
              {/* Flag connecting poles */}
              <div
                className="absolute top-4 h-1 bg-red-400/50"
                style={{ left: 12, width: GATE_WIDTH - 24 }}
              />
            </div>
          ))}

          {/* Skier */}
          <motion.div
            className="absolute"
            style={{
              left: skierX - SKIER_SIZE / 2,
              top: GAME_HEIGHT - 100,
              width: SKIER_SIZE,
              height: SKIER_SIZE,
            }}
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          >
            <div className="text-4xl">⛷️</div>
          </motion.div>

          {/* Start Screen */}
          {!isPlaying && !gameOver && (
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-3xl font-bold text-cyan-400">⛷️ Ski Slalom</p>
              <p className="text-gray-300 text-center px-8">
                Navigate through the gates using arrow keys!<br />
                Miss a gate and you're out.
              </p>
              <motion.button
                onClick={startGame}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hit the Slopes! 🎿
              </motion.button>
            </motion.div>
          )}

          {/* Game Over */}
          {gameOver && (
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-3xl font-bold text-red-400">Missed a Gate!</p>
              <p className="text-xl text-gray-300">Score: {score}</p>
              <motion.button
                onClick={startGame}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw size={20} />
                Try Again
              </motion.button>
            </motion.div>
          )}
        </div>

        <p className="text-gray-500 text-sm">← → Arrow keys to steer</p>
      </div>

      {/* Leaderboard */}
      {leaderboard.length > 0 && (
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/20 p-6 w-64">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="text-yellow-400" size={20} />
            <h3 className="text-xl font-bold text-white">Top Runs</h3>
          </div>
          <div className="space-y-2">
            {leaderboard.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white/5 rounded-lg p-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🎿'}</span>
                  <span className="text-gray-300 text-sm">{entry.name}</span>
                </div>
                <span className="text-cyan-400 font-bold">{entry.score}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

