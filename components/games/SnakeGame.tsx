"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Trophy } from "lucide-react";

type Position = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION: Direction = "RIGHT";
const SPEED = 150;

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
    generateFood();
  };

  const moveSnake = useCallback(() => {
    if (gameOver || !isPlaying) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      let newHead: Position;

      switch (direction) {
        case "UP":
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case "DOWN":
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case "LEFT":
          newHead = { x: head.x - 1, y: head.y };
          break;
        case "RIGHT":
          newHead = { x: head.x + 1, y: head.y };
          break;
      }

      // Check wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setGameOver(true);
        setIsPlaying(false);
        if (score > highScore) setHighScore(score);
        return prevSnake;
      }

      // Check self collision
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        setIsPlaying(false);
        if (score > highScore) setHighScore(score);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 10);
        generateFood();
        return newSnake;
      }

      newSnake.pop();
      return newSnake;
    });
  }, [direction, food, gameOver, isPlaying, score, highScore, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;

      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, isPlaying]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, SPEED);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Score Display */}
      <div className="flex gap-8 mb-2">
        <div className="text-center">
          <p className="text-gray-400 text-sm">Score</p>
          <p className="text-3xl font-bold text-cyan-400">{score}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center gap-2 justify-center">
            <Trophy className="text-yellow-400" size={16} />
            <p className="text-gray-400 text-sm">High Score</p>
          </div>
          <p className="text-2xl font-bold text-yellow-400">{highScore}</p>
        </div>
      </div>

      {/* Game Board */}
      <div
        className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-lg"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: GRID_SIZE }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full border-t border-cyan-500"
              style={{ top: i * CELL_SIZE }}
            />
          ))}
          {Array.from({ length: GRID_SIZE }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full border-l border-cyan-500"
              style={{ left: i * CELL_SIZE }}
            />
          ))}
        </div>

        {/* Snake */}
        {snake.map((segment, index) => (
          <motion.div
            key={`${segment.x}-${segment.y}-${index}`}
            className={`absolute ${
              index === 0
                ? "bg-gradient-to-br from-cyan-400 to-blue-500"
                : "bg-gradient-to-br from-cyan-500 to-blue-600"
            } rounded-sm`}
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.1 }}
          />
        ))}

        {/* Food */}
        <motion.div
          className="absolute bg-gradient-to-br from-pink-500 to-red-500 rounded-full"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
          }}
        />

        {/* Game Over Overlay */}
        {gameOver && (
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-3xl font-bold text-red-400">Game Over!</p>
            <p className="text-xl text-gray-300">Score: {score}</p>
            <motion.button
              onClick={resetGame}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw size={20} />
              Play Again
            </motion.button>
          </motion.div>
        )}

        {/* Start Screen */}
        {!isPlaying && !gameOver && (
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-2xl font-bold text-cyan-400">🐍 Snake Game</p>
            <p className="text-gray-300 text-center px-4">
              Use arrow keys to control
            </p>
            <motion.button
              onClick={resetGame}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Game
            </motion.button>
          </motion.div>
        )}
      </div>

      <p className="text-gray-500 text-sm">Use arrow keys to play</p>
    </div>
  );
}


