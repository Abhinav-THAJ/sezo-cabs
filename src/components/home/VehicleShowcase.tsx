"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function VehicleShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="py-32 bg-black text-white relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold font-semibold uppercase tracking-wider text-sm mb-4 block"
          >
            Premium Fleet
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold font-heading mb-6"
          >
            Travel in Ultimate Comfort
          </motion.h2>
        </div>

        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden relative h-[500px]"
          >
            <Image
              src="/images/luxury_cab_interior.png"
              alt="Luxury Cab Interior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
            
            <div className="absolute inset-y-0 left-0 p-8 md:p-16 flex flex-col justify-center max-w-lg">
              <h3 className="text-3xl font-bold font-heading mb-4 text-white">Uncompromising Luxury</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Our meticulously maintained fleet ranges from premium sedans like Innova Crysta to luxury coaches. Every vehicle is equipped with modern amenities to ensure your journey is as magnificent as the destination.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="block text-gold text-2xl font-bold mb-1">24/7</span>
                  <span className="text-sm text-gray-400">Available Support</span>
                </div>
                <div>
                  <span className="block text-gold text-2xl font-bold mb-1">100%</span>
                  <span className="text-sm text-gray-400">Professional Drivers</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
