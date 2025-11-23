"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Trophy, Car } from "lucide-react";
import { saveScore, getLeaderboard } from "@/lib/supabase";

type Vehicle = {
  id: number;
  lane: number;
  y: number;
  type: 'car' | 'truck';
  color: string;
};

const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const LANE_WIDTH = GAME_WIDTH / 3;
const PLAYER_SIZE = 40;

export default function TrafficGame() {
  const [playerLane, setPlayerLane] = useState(1);
  const [playerY, setPlayerY] = useState(GAME_HEIGHT - 100);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [score, setScore] = useState(0);
  const [vehiclesDetected, setVehiclesDetected] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(3);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const carEmojis = ['🚗', '🚙', '🚕', '🚐'];
  const truckEmojis = ['🚚', '🚛'];

  const generateVehicle = useCallback((): Vehicle => {
    const lane = Math.floor(Math.random() * 3);
    const isTruck = Math.random() > 0.7;
    return {
      id: Date.now() + Math.random(),
      lane,
      y: -60,
      type: isTruck ? 'truck' : 'car',
      color: isTruck ? '#f97316' : '#3b82f6',
    };
  }, []);

  const startGame = () => {
    setPlayerLane(1);
    setPlayerY(GAME_HEIGHT - 100);
    setVehicles([generateVehicle()]);
    setScore(0);
    setVehiclesDetected(0);
    setSpeed(3);
    setGameOver(false);
    setIsPlaying(true);
    setLeaderboard(getLeaderboard('traffic'));
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isPlaying) return;
    
    if (e.key === "ArrowLeft") {
      setPlayerLane((lane) => Math.max(0, lane - 1));
    } else if (e.key === "ArrowRight") {
      setPlayerLane((lane) => Math.min(2, lane + 1));
    }
  }, [isPlaying]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!isPlaying) return;

    gameLoopRef.current = setInterval(() => {
      setVehicles((prevVehicles) => {
        let newVehicles = prevVehicles.map((v) => ({
          ...v,
          y: v.y + speed,
        }));

        // Check collisions
        const playerX = playerLane * LANE_WIDTH + LANE_WIDTH / 2;
        const collision = newVehicles.some((v) => {
          const vX = v.lane * LANE_WIDTH + LANE_WIDTH / 2;
          const distance = Math.sqrt(
            Math.pow(playerX - vX, 2) + Math.pow(playerY - v.y, 2)
          );
          return distance < 40;
        });

        if (collision) {
          setGameOver(true);
          setIsPlaying(false);
          const newLeaderboard = saveScore('traffic', vehiclesDetected, 'You');
          setLeaderboard(newLeaderboard);
        }

        // Remove off-screen vehicles and count them
        const removedCount = newVehicles.filter((v) => v.y > GAME_HEIGHT).length;
        if (removedCount > 0) {
          setVehiclesDetected((c) => c + removedCount);
          setScore((s) => s + removedCount * 10);
          setSpeed((s) => Math.min(s + 0.05, 7));
        }

        newVehicles = newVehicles.filter((v) => v.y <= GAME_HEIGHT);

        // Add new vehicles
        if (Math.random() > 0.97) {
          newVehicles.push(generateVehicle());
        }

        return newVehicles;
      });
    }, 1000 / 60);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, speed, playerLane, playerY, vehiclesDetected, generateVehicle]);

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
      {/* Game Area */}
      <div className="flex flex-col items-center gap-4">
        {/* Stats */}
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Vehicles Tracked</p>
            <p className="text-3xl font-bold text-cyan-400">{vehiclesDetected}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Score</p>
            <p className="text-2xl font-bold text-green-400">{score}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Speed</p>
            <p className="text-xl font-bold text-orange-400">{speed.toFixed(1)}x</p>
          </div>
        </div>

        {/* Game Board */}
        <div
          className="relative bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-cyan-500/30 rounded-lg overflow-hidden"
          style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        >
          {/* Road lanes */}
          <div className="absolute inset-0">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="absolute h-full w-0.5 bg-yellow-400/50"
                style={{ left: i * LANE_WIDTH }}
              />
            ))}
            
            {/* Road dashes */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-12 bg-white/30"
                style={{
                  left: LANE_WIDTH - 2,
                  top: (i * 50) % GAME_HEIGHT,
                }}
                animate={{ y: [0, GAME_HEIGHT] }}
                transition={{
                  duration: 2 / speed,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-12 bg-white/30"
                style={{
                  left: 2 * LANE_WIDTH - 2,
                  top: (i * 50 + 25) % GAME_HEIGHT,
                }}
                animate={{ y: [0, GAME_HEIGHT] }}
                transition={{
                  duration: 2 / speed,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Other vehicles */}
          {vehicles.map((vehicle) => (
            <motion.div
              key={vehicle.id}
              className="absolute text-3xl"
              style={{
                left: vehicle.lane * LANE_WIDTH + LANE_WIDTH / 2 - 15,
                top: vehicle.y,
              }}
            >
              {vehicle.type === 'truck' 
                ? truckEmojis[Math.floor(Math.random() * truckEmojis.length)]
                : carEmojis[Math.floor(Math.random() * carEmojis.length)]
              }
            </motion.div>
          ))}

          {/* Player car */}
          <motion.div
            className="absolute text-4xl"
            animate={{
              left: playerLane * LANE_WIDTH + LANE_WIDTH / 2 - 20,
            }}
            style={{ top: playerY }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            🚙
          </motion.div>

          {/* Detection overlay (YOLO style) */}
          {isPlaying && (
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded px-3 py-2 border border-cyan-500/50">
              <p className="text-cyan-400 text-xs font-mono">
                YOLO Detection: {vehicles.length} vehicles
              </p>
              <p className="text-green-400 text-xs font-mono">
                Accuracy: 95%
              </p>
            </div>
          )}

          {/* Start Screen */}
          {!isPlaying && !gameOver && (
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Car className="text-cyan-400" size={48} />
              <p className="text-3xl font-bold text-cyan-400">Traffic Analytics</p>
              <p className="text-gray-300 text-center px-8">
                Based on my Varidx edge AI system!<br />
                Dodge traffic & track vehicles.
              </p>
              <div className="text-xs text-gray-500 font-mono bg-black/50 px-4 py-2 rounded">
                95% detection accuracy • 50k+ vehicles/day
              </div>
              <motion.button
                onClick={startGame}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Tracking 🚗
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
              <p className="text-3xl font-bold text-red-400">Collision Detected!</p>
              <p className="text-xl text-gray-300">Vehicles Tracked: {vehiclesDetected}</p>
              <p className="text-lg text-gray-400">Score: {score}</p>
              <motion.button
                onClick={startGame}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw size={20} />
                Restart System
              </motion.button>
            </motion.div>
          )}
        </div>

        <p className="text-gray-500 text-sm">← → Arrow keys to change lanes</p>
      </div>

      {/* Leaderboard */}
      {leaderboard.length > 0 && (
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/20 p-6 w-64">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="text-yellow-400" size={20} />
            <h3 className="text-xl font-bold text-white">Top Trackers</h3>
          </div>
          <div className="space-y-2">
            {leaderboard.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white/5 rounded-lg p-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🚗'}</span>
                  <span className="text-gray-300 text-sm">{entry.name}</span>
                </div>
                <span className="text-orange-400 font-bold">{entry.score}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


