"use client";

import { useState, useEffect } from "react";
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

interface SlabRow { label: string; km: number; rate: number; amount: number; }

function calculateFare(distanceKm: number, vehicle: VehicleType, rideType: RideType) {
  if (rideType === "Outstation") return null; // Outstation is custom quoted

  const BASE_FARE = 100;
  const BASE_KM = 5;
  let remaining = Math.max(0, distanceKm - BASE_KM);
  const slabs: SlabRow[] = [];
  let distanceCharge = 0;
  let slabIndex = 0;
  let slabStart = BASE_KM + 1;

  while (remaining > 0) {
    const rate = 10 + slabIndex * 5;
    const slabKm = Math.min(remaining, 20);
    const amount = slabKm * rate;
    slabs.push({ label: `${slabStart}–${slabStart + slabKm - 1} KM`, km: slabKm, rate, amount });
    distanceCharge += amount;
    remaining -= slabKm;
    slabStart += slabKm;
    slabIndex++;
  }

  const multiplier = VEHICLES.find((v) => v.name === vehicle)?.multiplier ?? 1;
  const vehicleExtra = Math.round(distanceCharge * (multiplier - 1));
  const total = BASE_FARE + distanceCharge + vehicleExtra;
  return { baseFare: BASE_FARE, slabs, vehicleExtra, total };
}

export default function BookingClient() {
  const [rideType, setRideType] = useState<RideType>("Airport Pickup");
  const [vehicle, setVehicle] = useState<VehicleType>("Sedan");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [distance, setDistance] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [fare, setFare] = useState<ReturnType<typeof calculateFare>>(null);

  const distanceNum = parseFloat(distance) || 0;

  useEffect(() => {
    if (distanceNum > 0) {
      setFare(calculateFare(distanceNum, vehicle, rideType));
    } else {
      setFare(null);
    }
  }, [distanceNum, vehicle, rideType]);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const fareText = fare
      ? `\n*Fare Breakdown:*\n  Base Fare: ₹${fare.baseFare}\n${fare.slabs.map(s => `  ${s.label}: ${s.km}km × ₹${s.rate} = ₹${s.amount}`).join("\n")}${fare.vehicleExtra > 0 ? `\n  Vehicle Premium: ₹${fare.vehicleExtra}` : ""}\n*Estimated Total: ₹${fare.total}*`
      : "\n*Fare: Custom quote (Outstation)*";

    const msg = `*New Cab Booking — Sezo Cabz* 🚖\n──────────────────────────────\n*Name:* ${name}\n*Phone:* ${phone}\n*Ride Type:* ${rideType}\n*Pickup:* ${pickup || "—"}\n*Destination:* ${destination || "—"}\n*Distance:* ${distance ? distance + " KM" : "—"}\n*Vehicle:* ${vehicle}\n*Passengers:* ${passengers}\n*Date & Time:* ${date || "—"} at ${time || "—"}\n*Notes:* ${notes || "None"}${fareText}`.trim();

    window.open(`https://wa.me/919400380868?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <form onSubmit={handleBook}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* ── Left: Form ── */}
            <div className="lg:col-span-3 space-y-6">

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

                {(rideType === "Airport Pickup" || rideType === "Local Rides") && (
                  <div className="relative">
                    <input type="number" min="1" step="0.5" placeholder="Estimated distance (KM)"
                      value={distance} onChange={e => setDistance(e.target.value)}
                      className="w-full pr-14 pl-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37] text-sm transition-all" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">KM</span>
                  </div>
                )}
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
            </div>

            {/* ── Right: Fare Panel ── */}
            <div className="lg:col-span-2">
              <div className="sticky top-28">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                  className="bg-black text-white rounded-2xl overflow-hidden">
                  <div className="p-8">
                    <p className="text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-6">Fare Estimation</p>

                    <AnimatePresence mode="wait">
                      {!fare ? (
                        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="space-y-3 mb-8">
                          {rideType === "Outstation" ? (
                            <p className="text-white/50 text-sm leading-relaxed">
                              Outstation fares are custom quoted based on your route. Submit the form and we'll share a competitive quote instantly on WhatsApp.
                            </p>
                          ) : (
                            <>
                              <p className="text-white/50 text-sm mb-4">Enter distance to see live fare breakdown.</p>
                              <div className="space-y-2 bg-white/5 rounded-xl p-4">
                                {[["First 5 KM","₹100 fixed"],["6–20 KM","₹10 / km"],["21–40 KM","₹15 / km"],["41–60 KM","₹20 / km"],["61–80 KM","₹25 / km"]].map(([l,r]) => (
                                  <div key={l} className="flex justify-between text-xs">
                                    <span className="text-white/40">{l}</span>
                                    <span className="text-white/70 font-medium">{r}</span>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div key="fare" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 mb-8">
                          <div className="flex justify-between py-2 border-b border-white/10 text-sm">
                            <div><span className="text-white/70">Base Fare</span><p className="text-xs text-white/40">First 5 KM</p></div>
                            <span className="font-semibold">₹{fare.baseFare}</span>
                          </div>
                          {fare.slabs.map((s, i) => (
                            <motion.div key={s.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                              className="flex justify-between py-2 border-b border-white/10 text-sm">
                              <div><span className="text-white/70">{s.label}</span><p className="text-xs text-white/40">{s.km} km × ₹{s.rate}</p></div>
                              <span className="font-semibold">₹{s.amount}</span>
                            </motion.div>
                          ))}
                          {fare.vehicleExtra > 0 && (
                            <div className="flex justify-between py-2 border-b border-white/10 text-sm">
                              <div><span className="text-white/70">Vehicle Premium</span><p className="text-xs text-white/40">{vehicle}</p></div>
                              <span className="font-semibold">₹{fare.vehicleExtra}</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Total */}
                    <div className="border-t border-white/20 pt-5">
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-white/50 text-sm">Estimated Total</span>
                        <AnimatePresence mode="wait">
                          {fare ? (
                            <motion.span key={fare.total} initial={{ scale: 1.2, color: "#d4af37" }} animate={{ scale: 1, color: "#ffffff" }}
                              className="text-4xl font-bold font-heading">₹{fare.total}</motion.span>
                          ) : (
                            <span className="text-3xl font-bold text-white/20">—</span>
                          )}
                        </AnimatePresence>
                      </div>
                      <p className="text-right text-xs text-white/25 mb-6">*Excludes tolls & waiting charges</p>

                      <button type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-[#d4af37] text-black py-4 rounded-xl font-bold text-sm hover:bg-[#c9a82f] active:scale-[0.98] transition-all group shadow-lg">
                        <Phone className="w-4 h-4" />
                        Confirm & Book via WhatsApp
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* Trust badges */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {["24/7 Support","Safe & Verified","Instant Confirm"].map((b) => (
                    <div key={b} className="bg-white rounded-xl border border-gray-100 p-3 text-center shadow-sm">
                      <CheckCircle className="w-4 h-4 text-[#d4af37] mx-auto mb-1" />
                      <span className="text-xs text-gray-500 font-medium">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </form>
  );
}
