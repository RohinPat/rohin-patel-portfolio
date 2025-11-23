"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { TrendingUp, Zap, Target, Award } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
  {
    icon: TrendingUp,
    value: 15,
    suffix: "%",
    label: "Onboarding Improvement",
    description: "WHOOP user completion",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    value: 95,
    suffix: "%",
    label: "Detection Accuracy",
    description: "Edge AI vehicle tracking",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    value: 25,
    suffix: "%",
    label: "Team Velocity Boost",
    description: "iOS engineering throughput",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Award,
    value: 50,
    suffix: "k+",
    label: "Daily Vehicles Tracked",
    description: "Real-time traffic analytics",
    color: "from-orange-500 to-red-500",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function InteractiveStats() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-blue">Measurable Impact</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Real results from real-world projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                <motion.div
                  className="relative bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-md rounded-2xl border border-white/20 p-6 overflow-hidden group hover:border-cyan-500/50 transition-all"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  {/* Glowing background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  />
                  
                  {/* Animated orb */}
                  <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.color} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />

                  {/* Icon */}
                  <motion.div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="text-white" size={24} />
                  </motion.div>

                  {/* Stat */}
                  <div className="relative">
                    <motion.div
                      className="text-5xl font-bold bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent mb-2"
                      whileHover={{ scale: 1.1 }}
                    >
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {stat.label}
                    </h3>
                    <p className="text-sm text-gray-400">{stat.description}</p>
                  </div>

                  {/* Hover effect line */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color}`}
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


