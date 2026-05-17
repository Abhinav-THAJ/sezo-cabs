"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Car, Users, Calendar, Clock, Phone, ArrowRight, CheckCircle } from "lucide-react";

type VehicleType = "Sedan" | "Ertiga + MUV" | "Innova" | "Innova Crysta" | "Innova Hycross" | "Tempo Traveller" | "Luxury Tempo" | "Urbania" | "Coach";
type RideType = "Airport Pickup" | "Local Rides" | "Outstation";

const VEHICLES: { name: VehicleType; seats: number; multiplier: number }[] = [
  { name: "Sedan", seats: 4, multiplier: 1.0 },
  { name: "Ertiga + MUV", seats: 6, multiplier: 1.2 },
  { name: "Innova", seats: 7, multiplier: 1.4 },
  { name: "Innova Crysta", seats: 7, multiplier: 1.6 },
  { name: "Innova Hycross", seats: 7, multiplier: 1.8 },
  { name: "Tempo Traveller", seats: 12, multiplier: 2.2 },
  { name: "Luxury Tempo", seats: 14, multiplier: 2.5 },
  { name: "Urbania", seats: 17, multiplier: 3.0 },
  { name: "Coach", seats: 35, multiplier: 4.5 },
];

const RIDE_TYPES: RideType[] = ["Airport Pickup", "Local Rides", "Outstation"];

export default function BookingClient() {
  const [rideType, setRideType] = useState<RideType>("Airport Pickup");
  const [vehicle, setVehicle] = useState<VehicleType>("Sedan");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `*New Cab Booking — Sezo Cabz* 🚖\n──────────────────────────────\n*Name:* ${name}\n*Phone:* ${phone}\n*Ride Type:* ${rideType}\n*Pickup:* ${pickup || "—"}\n*Destination:* ${destination || "—"}\n*Vehicle:* ${vehicle}\n*Passengers:* ${passengers}\n*Date & Time:* ${date || "—"} at ${time || "—"}\n*Notes:* ${notes || "None"}`.trim();
    window.open(`https://wa.me/919400380868?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <form onSubmit={handleBook}>
      <div className="max-w-2xl mx-auto space-y-6">

              {/* Ride Type */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Ride Type</h2>
                <div className="flex flex-wrap gap-3">
                  {RIDE_TYPES.map((t) => (
                    <button key={t} type="button" onClick={() => setRideType(t)}
                      className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${rideType === t ? "bg-black text-white border-black" : "border-gray-200 text-gray-600 hover:border-gray-400"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Locations & Distance */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Trip Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
                    <input type="text" placeholder={rideType === "Airport Pickup" ? "Airport / Terminal" : "Pickup location"} value={pickup}
                      onChange={e => setPickup(e.target.value)}
                      className="w-full pl-9 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37] text-sm transition-all" />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Destination" value={destination}
                      onChange={e => setDestination(e.target.value)}
                      className="w-full pl-9 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37] text-sm transition-all" />
                  </div>
                </div>


              </motion.div>

              {/* Vehicle */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Select Vehicle</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {VEHICLES.map((v) => (
                    <button key={v.name} type="button" onClick={() => setVehicle(v.name)}
                      className={`flex flex-col items-start px-4 py-3 rounded-xl border text-left transition-all ${vehicle === v.name ? "border-[#d4af37] bg-[#d4af37]/10 shadow-sm" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                      <span className={`text-sm font-semibold ${vehicle === v.name ? "text-[#b8960c]" : "text-gray-800"}`}>{v.name}</span>
                      <span className="text-xs text-gray-400 mt-0.5">Up to {v.seats} seats</span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Date, Time, Passengers */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Schedule</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="date" required value={date} onChange={e => setDate(e.target.value)}
                      className="w-full pl-9 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37] text-sm transition-all" />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="time" required value={time} onChange={e => setTime(e.target.value)}
                      className="w-full pl-9 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37] text-sm transition-all" />
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5">
                    <Users className="w-4 h-4 text-gray-400 shrink-0" />
                    <button type="button" onClick={() => setPassengers(p => Math.max(1, p - 1))}
                      className="w-7 h-7 rounded-full bg-white border border-gray-200 font-bold text-lg flex items-center justify-center hover:bg-gray-100">−</button>
                    <span className="w-6 text-center font-semibold">{passengers}</span>
                    <button type="button" onClick={() => setPassengers(p => p + 1)}
                      className="w-7 h-7 rounded-full bg-white border border-gray-200 font-bold text-lg flex items-center justify-center hover:bg-gray-100">+</button>
                  </div>
                </div>
              </motion.div>

              {/* Personal Details */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Your Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37] text-sm transition-all" />
                  <input required type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37] text-sm transition-all" />
                </div>
                <textarea rows={3} placeholder="Additional notes (optional)" value={notes} onChange={e => setNotes(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37] text-sm transition-all resize-none" />
              </motion.div>

              {/* Trust badges */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="grid grid-cols-3 gap-3">
                {["24/7 Support","Safe & Verified","Instant Confirm"].map((b) => (
                  <div key={b} className="bg-white rounded-xl border border-gray-100 p-3 text-center shadow-sm">
                    <CheckCircle className="w-4 h-4 text-[#d4af37] mx-auto mb-1" />
                    <span className="text-xs text-gray-500 font-medium">{b}</span>
                  </div>
                ))}
              </motion.div>

              {/* Submit */}
              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full flex items-center justify-center gap-2 bg-[#d4af37] text-black py-4 rounded-xl font-bold text-sm hover:bg-[#c9a82f] active:scale-[0.98] transition-all group shadow-lg"
              >
                <Phone className="w-4 h-4" />
                Confirm & Book via WhatsApp
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

      </div>
    </form>
  );
}
