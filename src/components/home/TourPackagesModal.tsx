"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Clock, ChevronRight, Sparkles } from "lucide-react";
import { tourPackages, type TourPackage } from "./tourData";
import PackageDetailModal from "./PackageDetailModal";

interface TourPackagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function TourPackagesModal({ isOpen, onClose }: TourPackagesModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedPkg, setSelectedPkg] = useState<TourPackage | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
      scrollRef.current?.scrollTo({ top: 0 });
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => { document.body.classList.remove("modal-open"); };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ background: "#f8f7f3" }}
          >
            {/* Subtle ambient top bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
              style={{ background: "linear-gradient(to right, #d4af37, #b8960c, #d4af37)" }}
            />

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="relative flex items-center justify-between px-6 md:px-12 py-5 flex-shrink-0 bg-white"
              style={{ borderBottom: "1px solid #e8e4d9", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}
            >
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: "#b8960c" }} />
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#b8960c" }}>
                    Kerala Tour Packages
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-heading">
                  Choose Your Perfect Journey
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-100 hover:scale-110"
                style={{ border: "1.5px solid #e0ddd5", background: "#fff" }}
              >
                <X className="w-4.5 h-4.5 text-gray-600" style={{ width: 18, height: 18 }} />
              </button>
            </motion.div>

            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="px-6 md:px-12 pt-7 pb-2 flex-shrink-0"
            >
              <p className="text-gray-500 text-sm">
                Handcrafted itineraries across God's Own Country — click any package to explore the full details.
              </p>
            </motion.div>

            {/* Scrollable Grid */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-6 md:px-12 py-6 pb-12"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#d4af37 #f0ece2", overflowY: "scroll", overscrollBehavior: "contain" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {tourPackages.map((pkg, i) => (
                  <motion.div
                    key={pkg.id}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="group relative rounded-[24px] overflow-hidden cursor-pointer bg-white"
                    style={{
                      boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                      border: "1px solid #ede9df",
                      transition: "box-shadow 0.3s ease, transform 0.35s ease",
                    }}
                    onClick={() => setSelectedPkg(pkg)}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 16px 48px rgba(0,0,0,0.16)",
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        loading="lazy"
                      />
                      {/* Gradient on image */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
                        }}
                      />
                      {/* Badge */}
                      {pkg.badge && (
                        <div
                          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
                          style={{ background: "linear-gradient(135deg, #d4af37, #f3e5ab)", color: "#4a3800" }}
                        >
                          {pkg.badge}
                        </div>
                      )}
                      {/* Duration pill on image */}
                      <div
                        className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white font-medium"
                        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
                      >
                        <Clock className="w-3 h-3" />
                        {pkg.duration}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      {/* Destinations */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {pkg.destinations.slice(0, 3).map((d) => (
                          <span
                            key={d}
                            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
                            style={{
                              background: "#fdf7e6",
                              color: "#9a7400",
                              border: "1px solid #f0d97a",
                            }}
                          >
                            <MapPin className="w-2.5 h-2.5" />
                            {d}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 font-heading mb-1 leading-snug">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-gray-400 italic mb-3">{pkg.tagline}</p>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
                        {pkg.description}
                      </p>

                      {/* Footer */}
                      <div
                        className="flex items-center justify-between pt-4"
                        style={{ borderTop: "1px solid #f0ece4" }}
                      >
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                          View Details
                        </span>
                        <div
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 group-hover:gap-2.5"
                          style={{
                            background: "linear-gradient(135deg, #d4af37, #b8960c)",
                            color: "#fff",
                          }}
                        >
                          Explore
                          <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <PackageDetailModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />
    </>
  );
}
