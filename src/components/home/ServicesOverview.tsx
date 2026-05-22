"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Plane, Map, Car, Compass } from "lucide-react";
import TourPackagesModal from "./TourPackagesModal";

const services = [
  {
    id: "airport",
    title: "Airport Transfers",
    description: "Punctual, luxurious, and hassle-free airport pickups and drops across all major Kerala airports.",
    icon: <Plane className="w-6 h-6" />,
    image: "/images/airport_pickup.png",
  },
  {
    id: "outstation",
    title: "Outstation Travel",
    description: "Explore the scenic beauty of South India with our premium outstation cabs and professional chauffeurs.",
    icon: <Map className="w-6 h-6" />,
    image: "/images/outstation_travel.png",
  },
  {
    id: "local",
    title: "Local Rides",
    description: "Navigate the city in style. Perfect for business meetings, shopping, or local sightseeing.",
    icon: <Car className="w-6 h-6" />,
    image: "/images/local_rides.png",
  },
  {
    id: "packages",
    title: "Tour Packages",
    description: "Curated travel experiences covering Munnar, Alleppey, Wayanad, and more breathtaking destinations.",
    icon: <Compass className="w-6 h-6" />,
    image: "/images/tour_packages.png",
  },
];

export default function ServicesOverview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [toursOpen, setToursOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <>
      <section ref={containerRef} className="py-32 bg-cream relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-8">
            <div className="max-w-2xl">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-gold font-semibold uppercase tracking-wider text-sm mb-4 block"
              >
                Our Expertise
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold font-heading"
              >
                Premium Services <br className="hidden md:block" /> For Every Journey
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/services" className="group flex items-center gap-3 text-lg font-medium hover:text-gold transition-colors">
                View All Services
                <span className="w-10 h-10 rounded-full border border-black group-hover:border-gold flex items-center justify-center transition-colors">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Base overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500" />

                {/* Hover overlay tint */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)" }} />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3 font-heading transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 max-w-md">
                    {service.description}
                  </p>

                  {/* "View More" only for Tour Packages */}
                  {service.id === "packages" && (
                    <div className="mt-5 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                      <button
                        onClick={() => setToursOpen(true)}
                        className="view-more-btn group/btn relative inline-flex items-center gap-2 text-sm font-semibold"
                        aria-label="View all tour packages"
                      >
                        {/* Glow background */}
                        <span
                          className="absolute inset-0 rounded-full opacity-0 group-hover/btn:opacity-100 blur-md transition-opacity duration-400 pointer-events-none"
                          style={{ background: "rgba(212,175,55,0.35)" }}
                        />
                        <span
                          className="relative flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300"
                          style={{
                            background: "rgba(212,175,55,0.12)",
                            border: "1px solid rgba(212,175,55,0.5)",
                            color: "#d4af37",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          View More
                          {/* Animated arrow */}
                          <span className="relative overflow-hidden inline-flex w-4">
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-4 absolute" />
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 -translate-x-4 group-hover/btn:translate-x-0" />
                          </span>
                        </span>
                        {/* Underline */}
                        <span
                          className="absolute bottom-0 left-5 right-5 h-px origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300"
                          style={{ background: "linear-gradient(to right, #d4af37, transparent)" }}
                        />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TourPackagesModal isOpen={toursOpen} onClose={() => setToursOpen(false)} />
    </>
  );
}
