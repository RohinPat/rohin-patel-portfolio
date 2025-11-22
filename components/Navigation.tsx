"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Playground", href: "/playground" },
    { name: "Experience", href: "/experience" },
    { name: "Skills", href: "/skills" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/RohinPat", label: "GitHub", external: true },
    { icon: Linkedin, href: "https://www.linkedin.com/in/rohinpat/", label: "LinkedIn", external: true },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="text-2xl font-bold gradient-text-blue cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              RP
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  className={`cursor-pointer transition-colors ${
                    pathname === item.href ? "text-cyan-400 font-semibold" : "text-gray-300 hover:text-white"
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.label}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </div>

          {/* Mobile menu button - Animated Hamburger */}
          <motion.button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              {/* Top bar */}
              <motion.span
                className="w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 8 : 0,
                  scaleX: isOpen ? 1 : 1,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              
              {/* Middle bar */}
              <motion.span
                className="w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                animate={{
                  opacity: isOpen ? 0 : 1,
                  scaleX: isOpen ? 0 : 1,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              
              {/* Bottom bar */}
              <motion.span
                className="w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -8 : 0,
                  scaleX: isOpen ? 1 : 1,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
            
            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl"
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ opacity: 1, scale: 1.5 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="md:hidden bg-gradient-to-b from-black/98 to-gray-900/98 backdrop-blur-xl border-t border-cyan-500/30 shadow-lg shadow-cyan-500/10"
        >
          <div className="px-4 py-6 space-y-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className={`block transition-all py-3 px-4 rounded-lg ${
                    pathname === item.href 
                      ? "text-cyan-400 font-semibold bg-cyan-500/10 border-l-2 border-cyan-400" 
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.05 + 0.1, duration: 0.3 }}
              className="flex items-center justify-center space-x-6 pt-6 mt-4 border-t border-cyan-500/20"
            >
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="p-3 bg-white/5 rounded-full text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all border border-white/10 hover:border-cyan-500/50"
                    aria-label={link.label}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

