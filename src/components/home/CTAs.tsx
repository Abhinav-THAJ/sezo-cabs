"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export default function CTAs() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Contact CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-cream rounded-3xl p-10 md:p-14 relative overflow-hidden group border border-gray-100 flex flex-col items-center text-center"
          >
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-gold font-semibold uppercase tracking-wider text-sm mb-4 block">24/7 Support</span>
              <h3 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-black">Need Assistance?</h3>
              <p className="text-gray-600 mb-8 max-w-md">Our concierge team is available round the clock to assist you with your travel needs.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                <a href="https://wa.me/919400380868" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-900 transition-colors w-full sm:w-auto">
                  WhatsApp Us
                </a>
                <a href="tel:+919400380868" className="inline-flex items-center justify-center gap-2 border border-black/20 text-black px-6 py-3 rounded-full font-medium hover:bg-black/5 transition-colors w-full sm:w-auto">
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
