"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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

const OUTSTATION_RATES: Record<string, { title: string, subtitle: string, rates: { days: string, km: number, rate: number }[] }> = {
  "Sedan": {
    title: "SEDAN TAXI RATES IN KERALA",
    subtitle: "Swift Dzire, Toyota Etios Similar",
    rates: [
      { days: "1 night - 2 days", km: 160, rate: 4200 },
      { days: "2 nights - 3 days", km: 300, rate: 6300 },
      { days: "3 nights - 4 days", km: 400, rate: 8400 },
      { days: "4 nights - 5 days", km: 500, rate: 10500 },
      { days: "5 nights - 6 days", km: 600, rate: 12600 },
      { days: "6 nights - 7 days", km: 700, rate: 14700 },
      { days: "7 nights - 8 days", km: 800, rate: 16800 },
      { days: "8 nights - 9 days", km: 900, rate: 18900 },
      { days: "9 nights - 10 days", km: 1000, rate: 21000 },
    ]
  },
  "Ertiga + MUV": {
    title: "SUZUKI ERTIGA TAXI RATES IN KERALA",
    subtitle: "Ertiga, XL6, Carens Similar",
    rates: [
      { days: "1 night - 2 days", km: 160, rate: 5000 },
      { days: "2 nights - 3 days", km: 300, rate: 7500 },
      { days: "3 nights - 4 days", km: 400, rate: 10000 },
      { days: "4 nights - 5 days", km: 500, rate: 12500 },
      { days: "5 nights - 6 days", km: 600, rate: 15000 },
      { days: "6 nights - 7 days", km: 700, rate: 17500 },
      { days: "7 nights - 8 days", km: 800, rate: 20000 },
      { days: "8 nights - 9 days", km: 900, rate: 22500 },
      { days: "9 nights - 10 days", km: 1000, rate: 25000 },
    ]
  },
  "Innova": {
    title: "TOYOTA INNOVA TAXI RATES IN KERALA",
    subtitle: "Toyota Innova Similar",
    rates: [
      { days: "1 night - 2 days", km: 160, rate: 5600 },
      { days: "2 nights - 3 days", km: 300, rate: 8400 },
      { days: "3 nights - 4 days", km: 400, rate: 11200 },
      { days: "4 nights - 5 days", km: 500, rate: 14000 },
      { days: "5 nights - 6 days", km: 600, rate: 16800 },
      { days: "6 nights - 7 days", km: 700, rate: 19600 },
      { days: "7 nights - 8 days", km: 800, rate: 22400 },
      { days: "8 nights - 9 days", km: 900, rate: 25200 },
      { days: "9 nights - 10 days", km: 1000, rate: 28000 },
    ]
  },
  "Innova Crysta": {
    title: "TOYOTA INNOVA CRYSTA TAXI RATES IN KERALA",
    subtitle: "Toyota Innova Crysta",
    rates: [
      { days: "1 night - 2 days", km: 160, rate: 6600 },
      { days: "2 nights - 3 days", km: 300, rate: 9900 },
      { days: "3 nights - 4 days", km: 400, rate: 13200 },
      { days: "4 nights - 5 days", km: 500, rate: 16500 },
      { days: "5 nights - 6 days", km: 600, rate: 19800 },
      { days: "6 nights - 7 days", km: 700, rate: 23100 },
      { days: "7 nights - 8 days", km: 800, rate: 26400 },
      { days: "8 nights - 9 days", km: 900, rate: 29700 },
      { days: "9 nights - 10 days", km: 1000, rate: 33000 },
    ]
  },
  "Innova Hycross": {
    title: "TOYOTA INNOVA HYCROSS PACKAGE RATES",
    subtitle: "Extra KM: ₹24/KM",
    rates: [
      { days: "1 Day", km: 100, rate: 4000 },
      { days: "2 Days", km: 200, rate: 8000 },
      { days: "3 Days", km: 300, rate: 12000 },
      { days: "4 Days", km: 400, rate: 16000 },
      { days: "5 Days", km: 500, rate: 20000 },
      { days: "6 Days", km: 600, rate: 24000 },
      { days: "7 Days", km: 700, rate: 28000 },
      { days: "8 Days", km: 800, rate: 32000 },
      { days: "9 Days", km: 900, rate: 36000 },
      { days: "10 Days", km: 1000, rate: 40000 },
    ]
  },
  "Urbania": {
    title: "FORCE URBANIA (12 SEATER) PACKAGE RATES",
    subtitle: "Extra KM: ₹32/KM",
    rates: [
      { days: "1 night - 2 days", km: 160, rate: 15000 },
      { days: "2 nights - 3 days", km: 300, rate: 22500 },
      { days: "3 nights - 4 days", km: 400, rate: 30000 },
      { days: "4 nights - 5 days", km: 500, rate: 37500 },
      { days: "5 nights - 6 days", km: 600, rate: 45000 },
      { days: "6 nights - 7 days", km: 700, rate: 52500 },
      { days: "7 nights - 8 days", km: 800, rate: 60000 },
      { days: "8 nights - 9 days", km: 900, rate: 67500 },
      { days: "9 nights - 10 days", km: 1000, rate: 75000 },
    ]
  },
  "Tempo Traveller": {
    title: "TEMPO TRAVELLER (12 SEATER) PACKAGE RATES",
    subtitle: "Extra KM: ₹23/KM",
    rates: [
      { days: "1 night - 2 days", km: 160, rate: 7800 },
      { days: "2 nights - 3 days", km: 300, rate: 11700 },
      { days: "3 nights - 4 days", km: 400, rate: 15600 },
      { days: "4 nights - 5 days", km: 500, rate: 19500 },
      { days: "5 nights - 6 days", km: 600, rate: 23400 },
      { days: "6 nights - 7 days", km: 700, rate: 27300 },
      { days: "7 nights - 8 days", km: 800, rate: 31200 },
      { days: "8 nights - 9 days", km: 900, rate: 35100 },
      { days: "9 nights - 10 days", km: 1000, rate: 39000 },
    ]
  },
  "Luxury Tempo": {
    title: "LUXURY TEMPO (17 SEATER) PACKAGE RATES",
    subtitle: "Extra KM: ₹25/KM",
    rates: [
      { days: "1 night - 2 days", km: 160, rate: 8600 },
      { days: "2 nights - 3 days", km: 300, rate: 12900 },
      { days: "3 nights - 4 days", km: 400, rate: 17200 },
      { days: "4 nights - 5 days", km: 500, rate: 21500 },
      { days: "5 nights - 6 days", km: 600, rate: 25800 },
      { days: "6 nights - 7 days", km: 700, rate: 30100 },
      { days: "7 nights - 8 days", km: 800, rate: 34400 },
      { days: "8 nights - 9 days", km: 900, rate: 38700 },
      { days: "9 nights - 10 days", km: 1000, rate: 43000 },
    ]
  },
  "Coach": {
    title: "COACH (49 SEATER) PACKAGE RATES",
    subtitle: "Extra KM: ₹52/KM",
    rates: [
      { days: "1 night - 2 days", km: 160, rate: 26000 },
      { days: "2 nights - 3 days", km: 300, rate: 39000 },
      { days: "3 nights - 4 days", km: 400, rate: 52000 },
      { days: "4 nights - 5 days", km: 500, rate: 65000 },
      { days: "5 nights - 6 days", km: 600, rate: 78000 },
      { days: "6 nights - 7 days", km: 700, rate: 91000 },
      { days: "7 nights - 8 days", km: 800, rate: 104000 },
      { days: "8 nights - 9 days", km: 900, rate: 117000 },
      { days: "9 nights - 10 days", km: 1000, rate: 130000 },
    ]
  }
};

export default function BookingClient() {
  const searchParams = useSearchParams();
  const initialRideType = searchParams.get("service") as RideType | null;

  const [rideType, setRideType] = useState<RideType>(
    initialRideType && RIDE_TYPES.includes(initialRideType) ? initialRideType : "Airport Pickup"
  );

  useEffect(() => {
    if (initialRideType && RIDE_TYPES.includes(initialRideType)) {
      setRideType(initialRideType);
    }
  }, [initialRideType]);
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
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Outstation Rates Table */}
              <AnimatePresence>
                {rideType === "Outstation" && OUTSTATION_RATES[vehicle] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    className="bg-[#1a1a1a] text-white rounded-2xl shadow-xl overflow-hidden"
                  >
                    <div className="p-6 md:p-8">
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-bold font-heading text-white tracking-wide">{OUTSTATION_RATES[vehicle].title}</h3>
                        <p className="text-xs text-[#d4af37] uppercase tracking-widest mt-1">{OUTSTATION_RATES[vehicle].subtitle}</p>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse min-w-[300px]">
                          <thead className="text-gray-400 font-semibold border-b border-gray-700 uppercase text-[10px] tracking-wider">
                            <tr>
                              <th className="pb-3 px-2 font-medium">Number of days</th>
                              <th className="pb-3 px-2 font-medium text-center">Km</th>
                              <th className="pb-3 px-2 font-medium text-right">AC Rate</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-800">
                            {OUTSTATION_RATES[vehicle].rates.map((rate, i) => (
                              <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="py-3 px-2 text-gray-200">{rate.days}</td>
                                <td className="py-3 px-2 text-gray-400 text-center">{rate.km}</td>
                                <td className="py-3 px-2 text-[#d4af37] font-semibold text-right">₹{rate.rate}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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
