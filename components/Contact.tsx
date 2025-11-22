"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen py-20 px-4 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text-blue">Let's Connect</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Interested in collaborating or have a question? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              
              <div className="space-y-4">
                <motion.a
                  href="mailto:patel.rohin@northeastern.edu"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white group-hover:text-blue-400 transition-colors">
                      patel.rohin@northeastern.edu
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/rohinpat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg">
                    <Linkedin className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">LinkedIn</p>
                    <p className="text-white group-hover:text-blue-400 transition-colors">
                      /in/rohinpat
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://github.com/RohinPat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <Github className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">GitHub</p>
                    <p className="text-white group-hover:text-blue-400 transition-colors">
                      @RohinPat
                    </p>
                  </div>
                </motion.a>
              </div>
            </div>

            <motion.div
              className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl border border-white/10 p-6"
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="text-lg font-semibold text-white mb-2">Currently Open To</h4>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  Full-time opportunities (May 2026+)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  Summer 2026 internships
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  iOS/Mobile engineering roles
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  AI/ML engineering opportunities
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Quick Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/50"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={20} />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm"
        >
          <p>© 2025 Rohin Patel. Built with Next.js, TypeScript, and Framer Motion.</p>
        </motion.div>
      </div>
    </section>
  );
}

