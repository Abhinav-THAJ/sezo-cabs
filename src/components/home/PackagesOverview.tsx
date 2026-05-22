"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Clock, ChevronRight, Heart, Leaf, Mountain, Compass, Globe, Sun, Palmtree } from "lucide-react";
import { tourPackages, type TourPackage } from "./tourData";
import PackageDetailModal from "./PackageDetailModal";

const icons = [Heart, Leaf, Mountain, Compass, Globe, Sun, Palmtree];

export default function PackagesOverview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPkg, setSelectedPkg] = useState<TourPackage | null>(null);

  return (
    <>
      <section className="py-28 bg-white relative overflow-hidden" ref={containerRef}>
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #b8960c 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto px-4 md:px-8 relative">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block font-bold uppercase tracking-widest text-xs mb-4"
              style={{ color: "#b8960c" }}
            >
              ✦ Curated Kerala Experiences
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-5 leading-tight"
            >
              Discover Kerala With Our <br className="hidden md:block" />
              <span style={{ color: "#b8960c" }}>Premium Packages</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="text-gray-500 text-lg leading-relaxed"
            >
              Handcrafted journeys through God's Own Country — from misty hill stations
              to serene backwaters and golden beaches.
            </motion.p>
          </div>

          {/* Unified Cards Grid — 2*3 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {tourPackages.map((pkg, i) => {
              const Icon = icons[i % icons.length] || Globe;
              return (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  icon={<Icon className="w-4 h-4" />}
                  index={i}
                  onClick={() => setSelectedPkg(pkg)}
                />
              );
            })}
          </div>
        </div>
      </section>

      <PackageDetailModal pkg={selectedPkg} onClose={() => setSelectedPkg(null)} />
    </>
  );
}

// ─── Single Card ────────────────────────────────────────────────────────────

function PackageCard({
  pkg,
  icon,
  index,
  onClick,
}: {
  pkg: TourPackage;
  icon: React.ReactNode;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col rounded-[24px] overflow-hidden cursor-pointer bg-white"
      style={{
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        border: "1px solid #ede9df",
      }}
      whileHover={{
        y: -5,
        boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
        transition: { duration: 0.3 },
      }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover transition-transform duration-900 group-hover:scale-107"
          style={{ transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        {/* Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
          }}
        />
        {/* Duration pill */}
        <div
          className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white font-medium"
          style={{ background: "rgba(0,0,0,0.52)", backdropFilter: "blur(6px)" }}
        >
          <Clock className="w-3 h-3" />
          {pkg.duration}
        </div>
        {/* Badge */}
        {pkg.badge && (
          <div
            className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
            style={{ background: "linear-gradient(135deg,#d4af37,#f3e5ab)", color: "#4a3800" }}
          >
            {pkg.badge}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Destinations */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {pkg.destinations.slice(0, 3).map((d) => (
            <span
              key={d}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ background: "#fdf7e6", color: "#9a7400", border: "1px solid #f0d97a" }}
            >
              <MapPin className="w-2.5 h-2.5" />
              {d}
            </span>
          ))}
        </div>

        {/* Title & tagline */}
        <h3 className="text-lg font-bold text-gray-900 font-heading mb-1 leading-snug">
          {pkg.title}
        </h3>
        <p className="text-xs text-gray-400 italic mb-3">{pkg.tagline}</p>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1 line-clamp-2">
          {pkg.description}
        </p>

        {/* Card footer */}
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid #f0ece4" }}
        >
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "#fdf7e6", color: "#b8960c" }}
            >
              {icon}
            </span>
            <span className="font-medium text-gray-500">{pkg.duration}</span>
          </div>
          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 group-hover:gap-2.5"
            style={{ background: "linear-gradient(135deg,#d4af37,#b8960c)", color: "#fff" }}
          >
            Explore
            <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
