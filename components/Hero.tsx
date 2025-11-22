"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Smartphone } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingIcons = [
    { Icon: Code2, delay: 0, position: "top-1/4 left-10" },
    { Icon: Cpu, delay: 0.5, position: "top-1/3 right-10" },
    { Icon: Smartphone, delay: 1, position: "bottom-1/3 left-1/4" },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, position }, index) => (
        <motion.div
          key={index}
          className={`absolute ${position} hidden lg:block`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{
            delay,
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 2,
          }}
        >
          <Icon size={80} className="text-blue-500" />
        </motion.div>
      ))}

      <motion.div
        className="max-w-5xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <motion.span
            className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20"
            whileHover={{ scale: 1.05 }}
          >
            👋 Welcome to my portfolio
          </motion.span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          variants={itemVariants}
        >
          <span className="text-white">Hi, I'm </span>
          <span className="gradient-text-blue">Rohin Patel</span>
        </motion.h1>

        <motion.div
          className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-3xl mx-auto h-10"
          variants={itemVariants}
        >
          <TypeAnimation
            sequence={[
              "iOS Engineer & AI Developer",
              3000,
              "Building at WHOOP 💪",
              3000,
              "SwiftUI • PyTorch • YOLO",
              3000,
              "95% Accuracy. 15% Improvement.",
              3000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="gradient-text-blue"
          />
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Northeastern CS student specializing in{" "}
          <span className="text-blue-400 font-semibold">AI</span> and{" "}
          <span className="text-purple-400 font-semibold">iOS Development</span>.
          Currently building health tech at{" "}
          <span className="text-cyan-400 font-semibold">WHOOP</span>.
          From real-time ML systems to SwiftUI apps that improve lives.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          variants={itemVariants}
        >
          <Link href="/projects">
            <motion.div
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold text-lg shadow-lg shadow-blue-500/50 cursor-pointer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.div>
          </Link>

          <Link href="/contact">
            <motion.div
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-lg border border-white/20 cursor-pointer"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

