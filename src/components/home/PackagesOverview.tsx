"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const packages = [
  {
    id: "munnar",
    title: "Munnar Tea Gardens",
    duration: "3 Days / 2 Nights",
    price: "From ₹8,500",
    image: "/images/hero_kerala.png",
  },
  {
    id: "alleppey",
    title: "Alleppey Houseboat",
    duration: "2 Days / 1 Night",
    price: "From ₹6,500",
    image: "/images/kerala_houseboat.png",
  },
];

export default function PackagesOverview() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="py-32 bg-white relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold font-semibold uppercase tracking-wider text-sm mb-4 block"
          >
            Curated Experiences
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold font-heading mb-6"
          >
            Discover Kerala With Our Premium Packages
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            Immerse yourself in the breathtaking landscapes of God's Own Country with our handcrafted, luxury travel packages.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative rounded-3xl overflow-hidden h-[400px] shadow-lg"
            >
              <Image
                src={pkg.image}
                alt={pkg.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 p-8">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-gold/90 text-sm font-medium mb-2 block">{pkg.duration}</span>
                    <h3 className="text-3xl font-bold text-white font-heading">{pkg.title}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-white/80 text-sm block mb-1">Starting from</span>
                    <span className="text-xl font-bold text-white">{pkg.price}</span>
                  </div>
                </div>
                
                <div className="mt-6 overflow-hidden">
                  <Link 
                    href="/services" 
                    className="inline-block bg-white text-black px-6 py-3 rounded-full text-sm font-semibold transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    View Itinerary
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
