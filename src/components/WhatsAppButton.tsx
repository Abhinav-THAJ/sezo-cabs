"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Show the tooltip after 1.5 seconds
    const showTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 1500);

    // Automatically hide the tooltip after 4 seconds of display (5.5 seconds total)
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 5500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none select-none">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="pointer-events-auto flex items-center gap-3 bg-white text-gray-800 px-4 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-100 text-sm font-semibold mr-2 max-w-xs relative"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="leading-tight">Need help? Book a cab on WhatsApp!</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-gray-600 ml-1 transition-colors focus:outline-none cursor-pointer"
              aria-label="Close tooltip"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/917306338989?text=Hello%20Sezo%20Cabs!%20I'm%20interested%20in%20booking%20a%20cab%20/%20tour%20package."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.3)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.5)] transition-shadow duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Glow Ring Behind the Button */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/25 -z-10 animate-ping" style={{ animationDuration: '2.5s' }}></span>
        
        {/* Outer subtle shadow pulse */}
        <span className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] opacity-0 hover:opacity-20 blur-md transition-opacity duration-300 -z-20"></span>
        
        <FaWhatsapp className="w-8.5 h-8.5 text-white" />
      </motion.a>
    </div>
  );
}
