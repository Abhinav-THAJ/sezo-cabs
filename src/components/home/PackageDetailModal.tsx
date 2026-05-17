"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Clock,
  CheckCircle2,
  Star,
  Phone,
  MessageCircle,
  ChevronRight,
  Camera,
} from "lucide-react";
import type { TourPackage } from "./tourData";

interface PackageDetailModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "919876543210";

export default function PackageDetailModal({ pkg, onClose }: PackageDetailModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pkg) {
      document.body.classList.add("modal-open");
      scrollRef.current?.scrollTo({ top: 0 });
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => { document.body.classList.remove("modal-open"); };
  }, [pkg]);

  if (!pkg) return null;

  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in the "${pkg.title}" package (${pkg.duration}). Please share more details.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`;

  return (
    <AnimatePresence>
      {pkg && (
        <motion.div
          key="detail-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            key="detail-panel"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            ref={scrollRef}
            className="relative w-full max-w-4xl rounded-[28px] bg-white"
            style={{
              maxHeight: "90vh",
              overflowY: "scroll",
              overscrollBehavior: "contain",
              boxShadow: "0 40px 100px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.06)",
            }}
          >
            {/* Gold top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-[28px] pointer-events-none z-10"
              style={{ background: "linear-gradient(to right, #d4af37, #b8960c, #d4af37)" }}
            />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-100 hover:scale-110"
              style={{ background: "rgba(255,255,255,0.9)", border: "1.5px solid #e0ddd5" }}
              aria-label="Close"
            >
              <X className="w-4.5 h-4.5 text-gray-600" style={{ width: 18, height: 18 }} />
            </button>

            {/* Hero Banner */}
            <div className="relative h-64 md:h-80 w-full rounded-t-[28px] overflow-hidden">
              <Image
                src={pkg.heroImage}
                alt={pkg.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
                }}
              />
              {pkg.badge && (
                <div
                  className="absolute top-6 left-6 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
                  style={{ background: "linear-gradient(135deg,#d4af37,#f3e5ab)", color: "#4a3800" }}
                >
                  {pkg.badge}
                </div>
              )}
            </div>

            {/* Title area */}
            <div className="px-6 md:px-10 pt-2 pb-6" style={{ borderBottom: "1px solid #f0ece4" }}>
              <div className="flex flex-wrap gap-2 mb-3">
                {pkg.destinations.map((d) => (
                  <span
                    key={d}
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full"
                    style={{ background: "#fdf7e6", color: "#9a7400", border: "1px solid #f0d97a" }}
                  >
                    <MapPin className="w-3 h-3" /> {d}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 font-heading mb-2">{pkg.title}</h2>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>{pkg.duration}</span>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 md:px-10 pt-7 pb-28">
              {/* Description */}
              <p className="text-gray-600 text-base leading-relaxed mb-9">{pkg.description}</p>

              {/* Highlights */}
              <section className="mb-9">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#b8960c" }}>
                  Destination Highlights
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {pkg.highlights.map((h) => (
                    <span
                      key={h}
                      className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm text-gray-700 font-medium"
                      style={{ background: "#f9f6ef", border: "1px solid #ede9df" }}
                    >
                      <Star className="w-3.5 h-3.5" style={{ color: "#d4af37" }} />
                      {h}
                    </span>
                  ))}
                </div>
              </section>

              {/* Itinerary */}
              <section className="mb-9">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "#b8960c" }}>
                  Day-by-Day Itinerary
                </h3>
                <div>
                  {pkg.itinerary.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-4"
                    >
                      {/* Timeline */}
                      <div className="flex flex-col items-center">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-white"
                          style={{ background: "linear-gradient(135deg,#d4af37,#b8960c)" }}
                        >
                          {i + 1}
                        </div>
                        {i < pkg.itinerary.length - 1 && (
                          <div className="w-px flex-1 my-1 bg-amber-100" />
                        )}
                      </div>
                      {/* Content */}
                      <div className="pb-6 flex-1">
                        <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: "#d4af37" }}>
                          {item.day}
                        </p>
                        <h4 className="text-gray-900 font-semibold text-sm mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.details}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Includes */}
              <section className="mb-9">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#b8960c" }}>
                  Package Includes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.includes.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 px-4 py-3 rounded-2xl"
                      style={{ background: "#f9f6ef", border: "1px solid #ede9df" }}
                    >
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#d4af37" }} />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Gallery */}
              <section className="mb-9">
                <div className="flex items-center gap-2 mb-4">
                  <Camera className="w-4 h-4" style={{ color: "#b8960c" }} />
                  <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#b8960c" }}>
                    Gallery
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {pkg.gallery.map((src, i) => (
                    <div key={i} className="relative h-40 rounded-2xl overflow-hidden group">
                      <Image
                        src={src}
                        alt={`Gallery ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, 200px"
                      />
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* Sticky Footer CTAs */}
            <div
              className="sticky bottom-0 left-0 right-0 px-6 md:px-10 py-4 flex flex-col sm:flex-row gap-3 bg-white"
              style={{ borderTop: "1px solid #f0ece4", boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                style={{ background: "#25D366", color: "#fff" }}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
              <a
                href="/book"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg,#d4af37,#b8960c)", color: "#fff" }}
              >
                <Phone className="w-4 h-4" />
                Book Now
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
