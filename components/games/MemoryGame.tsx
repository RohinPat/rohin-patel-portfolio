"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Trophy, Clock } from "lucide-react";

const emojis = ["🔷", "🐍", "⚛️", "🤖", "📱", "🐳", "☁️", "🔥"];

type Card = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [gameWon, setGameWon] = useState(false);

  const initializeGame = () => {
    const duplicatedEmojis = [...emojis, ...emojis];
    const shuffled = duplicatedEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setTime(0);
    setIsPlaying(true);
    setGameWon(false);
  };

  useEffect(() => {
    if (!isPlaying || gameWon) return;

    const timer = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, gameWon]);

  useEffect(() => {
    if (matches === emojis.length && isPlaying) {
      setGameWon(true);
      setIsPlaying(false);
      if (bestTime === null || time < bestTime) {
        setBestTime(time);
      }
    }
  }, [matches, isPlaying, time, bestTime]);

  const handleCardClick = (id: number) => {
    if (!isPlaying || flippedCards.length === 2 || cards[id].isMatched || flippedCards.includes(id)) {
      return;
    }

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );

    if (newFlippedCards.length === 2) {
      setMoves((m) => m + 1);
      const [firstId, secondId] = newFlippedCards;

      if (cards[firstId].emoji === cards[secondId].emoji) {
        // Match found
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isMatched: true }
                : card
            )
          );
          setMatches((m) => m + 1);
          setFlippedCards([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center">
          <div className="flex items-center gap-2 text-cyan-400 mb-1 justify-center">
            <Clock size={16} />
            <p className="text-xs">Time</p>
          </div>
          <p className="text-2xl font-bold text-white">{formatTime(time)}</p>
        </div>
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center">
          <p className="text-xs text-purple-400 mb-1">Moves</p>
          <p className="text-2xl font-bold text-white">{moves}</p>
        </div>
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center">
          <div className="flex items-center gap-2 text-yellow-400 mb-1 justify-center">
            <Trophy size={16} />
            <p className="text-xs">Best</p>
          </div>
          <p className="text-xl font-bold text-white">
            {bestTime !== null ? formatTime(bestTime) : "--"}
          </p>
        </div>
      </div>

      {/* Game Board */}
      {!isPlaying && !gameWon ? (
        <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-lg p-12 flex flex-col items-center gap-4">
          <p className="text-2xl font-bold text-cyan-400">🧠 Memory Game</p>
          <p className="text-gray-400 text-center">Match all the pairs!</p>
          <motion.button
            onClick={initializeGame}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Game
          </motion.button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3 w-full">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className="aspect-square cursor-pointer"
              onClick={() => handleCardClick(card.id)}
              whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
              whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
            >
              <motion.div
                className={`w-full h-full rounded-lg flex items-center justify-center text-4xl ${
                  card.isMatched
                    ? "bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-2 border-green-500/50"
                    : card.isFlipped
                    ? "bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border-2 border-cyan-500/50"
                    : "bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 hover:border-cyan-500/50"
                }`}
                animate={{
                  rotateY: card.isFlipped || card.isMatched ? 0 : 180,
                }}
                transition={{ duration: 0.3 }}
              >
                {card.isFlipped || card.isMatched ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15 }}
                  >
                    {card.emoji}
                  </motion.span>
                ) : (
                  <span className="text-cyan-400 text-2xl">?</span>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Win Screen */}
      {gameWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-lg p-8 text-center"
        >
          <p className="text-3xl font-bold text-green-400 mb-2">🎉 You Won!</p>
          <p className="text-gray-300 mb-1">Time: {formatTime(time)}</p>
          <p className="text-gray-300 mb-4">Moves: {moves}</p>
          <motion.button
            onClick={initializeGame}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={20} />
            Play Again
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}


