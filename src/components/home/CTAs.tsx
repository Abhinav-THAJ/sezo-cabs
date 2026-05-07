"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export default function CTAs() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Driver Registration CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black text-white rounded-3xl p-10 md:p-14 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <span className="text-gold font-semibold uppercase tracking-wider text-sm mb-4 block">Careers</span>
              <h3 className="text-3xl md:text-4xl font-bold font-heading mb-4">Drive with Sezo Cabz</h3>
              <p className="text-gray-400 mb-8 max-w-sm">Join our premium fleet of professional chauffeurs and elevate your career in luxury mobility.</p>
              
              <Link href="/driver-registration" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gold hover:text-white transition-colors">
                Register Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-cream rounded-3xl p-10 md:p-14 relative overflow-hidden group border border-gray-100"
          >
            <div className="relative z-10">
              <span className="text-gold font-semibold uppercase tracking-wider text-sm mb-4 block">24/7 Support</span>
              <h3 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-black">Need Assistance?</h3>
              <p className="text-gray-600 mb-8 max-w-sm">Our concierge team is available round the clock to assist you with your travel needs.</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://wa.me/919400380868" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-900 transition-colors">
                  WhatsApp Us
                </a>
                <a href="tel:+919400380868" className="inline-flex items-center justify-center gap-2 border border-black/20 text-black px-6 py-3 rounded-full font-medium hover:bg-black/5 transition-colors">
                  <Phone className="w-4 h-4" /> Call Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
