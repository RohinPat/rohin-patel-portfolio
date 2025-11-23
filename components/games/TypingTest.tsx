"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Zap, Clock, Target } from "lucide-react";

const codeSnippets = [
  "const hello = () => console.log('Hello World');",
  "for (let i = 0; i < 10; i++) { sum += i; }",
  "function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }",
  "async function fetchData() { const res = await fetch(url); return res.json(); }",
  "const sorted = arr.sort((a, b) => a - b);",
];

export default function TypingTest() {
  const [snippet, setSnippet] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [bestWpm, setBestWpm] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const startGame = () => {
    const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    setSnippet(randomSnippet);
    setUserInput("");
    setIsPlaying(true);
    setTimeLeft(30);
    setWpm(0);
    setAccuracy(100);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    if (!isPlaying || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setIsPlaying(false);
          if (wpm > bestWpm) setBestWpm(wpm);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, wpm, bestWpm]);

  useEffect(() => {
    if (!userInput || !snippet) return;

    // Calculate WPM
    const wordsTyped = userInput.length / 5;
    const timeElapsed = (30 - timeLeft) / 60;
    const calculatedWpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
    setWpm(calculatedWpm);

    // Calculate accuracy
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === snippet[i]) correct++;
    }
    const calculatedAccuracy = Math.round((correct / userInput.length) * 100);
    setAccuracy(calculatedAccuracy || 100);

    // Check if completed
    if (userInput === snippet) {
      setIsPlaying(false);
      if (calculatedWpm > bestWpm) setBestWpm(calculatedWpm);
    }
  }, [userInput, snippet, timeLeft, bestWpm]);

  const getCharacterClass = (index: number) => {
    if (index >= userInput.length) return "text-gray-500";
    if (userInput[index] === snippet[index]) return "text-green-400";
    return "text-red-400 bg-red-500/20";
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-3xl">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <div className="flex items-center gap-2 text-cyan-400 mb-1">
            <Zap size={16} />
            <p className="text-xs">WPM</p>
          </div>
          <p className="text-2xl font-bold text-white">{wpm}</p>
        </div>
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <div className="flex items-center gap-2 text-green-400 mb-1">
            <Target size={16} />
            <p className="text-xs">Accuracy</p>
          </div>
          <p className="text-2xl font-bold text-white">{accuracy}%</p>
        </div>
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <div className="flex items-center gap-2 text-yellow-400 mb-1">
            <Clock size={16} />
            <p className="text-xs">Time</p>
          </div>
          <p className="text-2xl font-bold text-white">{timeLeft}s</p>
        </div>
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <div className="flex items-center gap-2 text-purple-400 mb-1">
            <Zap size={16} />
            <p className="text-xs">Best</p>
          </div>
          <p className="text-2xl font-bold text-white">{bestWpm}</p>
        </div>
      </div>

      {/* Typing Area */}
      <div className="w-full bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-lg p-6">
        {!isPlaying && !snippet ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <p className="text-2xl font-bold text-cyan-400">⚡ Typing Speed Test</p>
            <p className="text-gray-400 text-center">Test your typing speed with code snippets!</p>
            <motion.button
              onClick={startGame}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Test
            </motion.button>
          </div>
        ) : (
          <>
            {/* Code to type */}
            <div className="font-mono text-lg mb-4 p-4 bg-black/50 rounded border border-cyan-500/20 leading-relaxed">
              {snippet.split("").map((char, index) => (
                <span key={index} className={getCharacterClass(index)}>
                  {char}
                </span>
              ))}
            </div>

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={!isPlaying}
              className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500 disabled:opacity-50"
              placeholder={isPlaying ? "Start typing..." : "Test completed!"}
            />

            {/* Results */}
            {!isPlaying && timeLeft === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center"
              >
                <p className="text-xl text-cyan-400 mb-2">Time's up!</p>
                <motion.button
                  onClick={startGame}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold flex items-center gap-2 mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw size={16} />
                  Try Again
                </motion.button>
              </motion.div>
            )}

            {userInput === snippet && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 text-center"
              >
                <p className="text-2xl text-green-400 mb-2">🎉 Perfect!</p>
                <p className="text-gray-400 mb-4">You typed {wpm} WPM with {accuracy}% accuracy</p>
                <motion.button
                  onClick={startGame}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold flex items-center gap-2 mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw size={16} />
                  Next Challenge
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}


