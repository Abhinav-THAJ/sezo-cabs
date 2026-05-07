"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, UserCog } from "lucide-react";
import BookingClient from "./BookingClient";
import DriverRegistrationForm from "@/components/DriverRegistrationForm";

export default function BookPageClient() {
  const [activeTab, setActiveTab] = useState<"book" | "driver">("book");

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
            {activeTab === "book" ? "Book Your Ride" : "Register as Driver"}
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {activeTab === "book"
              ? "Fill in your trip details and confirm instantly via WhatsApp."
              : "Join our premium fleet and start earning with Sezo Cabz."}
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm gap-2">
            <button
              onClick={() => setActiveTab("book")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === "book"
                  ? "bg-black text-white shadow-md"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <Car className="w-4 h-4" />
              Book a Cab
            </button>
            <button
              onClick={() => setActiveTab("driver")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === "driver"
                  ? "bg-black text-white shadow-md"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <UserCog className="w-4 h-4" />
              Register as Driver
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "book" ? (
            <motion.div
              key="book"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <BookingClient />
            </motion.div>
          ) : (
            <motion.div
              key="driver"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <DriverRegistrationForm />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
