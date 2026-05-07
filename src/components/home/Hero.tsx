"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.to(textRef.current, {
      y: 200,
      opacity: 0,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_kerala.png"
          alt="Luxury travel in Kerala"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      </div>

      {/* Content */}
      <div 
        ref={textRef}
        className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center mt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
        >
          <span className="text-white text-xs font-semibold tracking-widest uppercase">
            Premium Kerala Travel
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white font-heading leading-tight mb-8"
        >
          Journey Beyond <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-white">
            The Ordinary
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl mb-12 font-light"
        >
          Experience the pinnacle of luxury mobility in Kerala. From cinematic airport transfers to curated backwater escapes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/services#calculator"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-black bg-white rounded-full overflow-hidden transition-transform hover:scale-105"
          >
            <span className="relative z-10">Book a Cab</span>
            <div className="absolute inset-0 h-full w-full bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            <span className="relative z-10 hidden group-hover:block mix-blend-difference text-white">Book a Cab</span>
          </Link>
          
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white border border-white/30 rounded-full hover:bg-white/10 backdrop-blur-sm transition-all"
          >
            Explore Services
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-16 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 64] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-gold absolute top-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
