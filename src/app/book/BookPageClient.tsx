"use client";

import { motion } from "framer-motion";
import { Suspense } from "react";
import BookingClient from "./BookingClient";

export default function BookPageClient() {
  return (
    <div className="min-h-screen bg-[#f9f7f4] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-xs font-semibold uppercase tracking-widest mb-4">
            Sezo Cabz
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4">
            Book Your Ride
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Fill in your trip details and confirm instantly via WhatsApp.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Suspense fallback={<div className="text-center py-20">Loading booking form...</div>}>
            <BookingClient />
          </Suspense>
        </motion.div>

      </div>
    </div>
  );
}
