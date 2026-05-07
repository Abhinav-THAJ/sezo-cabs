"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Navigation,
  Car,
  Plane,
  Users,
  Calculator,
  ChevronRight,
  Phone,
  CheckCircle,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type RideType = "Airport Pickup" | "Local Rides";

type VehicleType =
  | "Sedan"
  | "Ertiga / MUV"
  | "Innova"
  | "Innova Crysta"
  | "Innova Hycross"
  | "Tempo Traveller"
  | "Luxury Tempo"
  | "Urbania"
  | "Coach";

interface SlabRow {
  label: string;
  km: number;
  rate: number;
  amount: number;
}

interface FareResult {
  baseFare: number;
  slabs: SlabRow[];
  vehicleExtra: number;
  total: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const RIDE_TYPES: RideType[] = ["Airport Pickup", "Local Rides"];

const VEHICLES: { name: VehicleType; seats: number; multiplier: number }[] = [
  { name: "Sedan",           seats: 4,  multiplier: 1.0 },
  { name: "Ertiga / MUV",   seats: 6,  multiplier: 1.2 },
  { name: "Innova",          seats: 7,  multiplier: 1.4 },
  { name: "Innova Crysta",   seats: 7,  multiplier: 1.6 },
  { name: "Innova Hycross",  seats: 7,  multiplier: 1.8 },
  { name: "Tempo Traveller", seats: 12, multiplier: 2.2 },
  { name: "Luxury Tempo",    seats: 14, multiplier: 2.5 },
  { name: "Urbania",         seats: 17, multiplier: 3.0 },
  { name: "Coach",           seats: 35, multiplier: 4.5 },
];

// ─── Fare Engine (matches spec exactly) ─────────────────────────────────────
//
//  Base fare : First 5 KM = ₹100 (fixed)
//  Slab 1    :  6 – 20 KM  → ₹10 / km
//  Slab 2    : 21 – 40 KM  → ₹15 / km
//  Slab 3    : 41 – 60 KM  → ₹20 / km
//  Slab 4    : 61 – 80 KM  → ₹25 / km
//  …and so on (+₹5 every 20 km)
//
//  Vehicle multiplier applied on distance-charge portion only.

function calculateFare(
  distanceKm: number,
  vehicle: VehicleType
): FareResult {
  const BASE_FARE    = 100;
  const BASE_KM      = 5;
  const SLAB_SIZE    = 20;
  const FIRST_RATE   = 10;
  const RATE_STEP    = 5;

  let remaining = Math.max(0, distanceKm - BASE_KM);
  const slabs: SlabRow[] = [];
  let distanceCharge = 0;

  let slabIndex = 0;
  let slabStart = BASE_KM + 1; // km 6

  while (remaining > 0) {
    const rate = FIRST_RATE + slabIndex * RATE_STEP;
    const slabKm = Math.min(remaining, SLAB_SIZE);
    const amount = slabKm * rate;

    slabs.push({
      label: `${slabStart} – ${slabStart + slabKm - 1} KM`,
      km: slabKm,
      rate,
      amount,
    });

    distanceCharge += amount;
    remaining   -= slabKm;
    slabStart   += slabKm;
    slabIndex   += 1;
  }

  const multiplier = VEHICLES.find((v) => v.name === vehicle)?.multiplier ?? 1;
  const vehicleExtra = Math.round(distanceCharge * (multiplier - 1));
  const total = BASE_FARE + distanceCharge + vehicleExtra;

  return {
    baseFare: BASE_FARE,
    slabs,
    vehicleExtra,
    total,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function FareCalculatorClient() {
  const [rideType,    setRideType]    = useState<RideType>("Airport Pickup");
  const [pickup,      setPickup]      = useState("");
  const [destination, setDestination] = useState("");
  const [distance,    setDistance]    = useState<string>("");
  const [vehicle,     setVehicle]     = useState<VehicleType>("Sedan");
  const [passengers,  setPassengers]  = useState<number>(1);
  const [result,      setResult]      = useState<FareResult | null>(null);
  const [calculated,  setCalculated]  = useState(false);

  const distanceNum = parseFloat(distance) || 0;

  const handleCalculate = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (distanceNum <= 0) return;
      const fare = calculateFare(distanceNum, vehicle);
      setResult(fare);
      setCalculated(true);
    },
    [distanceNum, vehicle]
  );

  const handleBookViaWhatsApp = () => {
    if (!result) return;
    const slabText = result.slabs
      .map((s) => `  • ${s.label}: ${s.km} km × ₹${s.rate} = ₹${s.amount}`)
      .join("\n");

    const msg = `
*New Booking Request — Sezo Cabz* 🚖
──────────────────────────────
*Ride Type:*    ${rideType}
*Pickup:*       ${pickup || "—"}
*Destination:*  ${destination || "—"}
*Distance:*     ${distanceNum} KM
*Vehicle:*      ${vehicle}
*Passengers:*   ${passengers}

*Fare Breakdown:*
  Base Fare (first 5 km): ₹${result.baseFare}
${slabText}${result.vehicleExtra > 0 ? `\n  Vehicle Premium (${vehicle}): ₹${result.vehicleExtra}` : ""}

*Estimated Total: ₹${result.total}*

_(Fare excludes tolls & waiting charges)_
    `.trim();

    window.open(
      `https://wa.me/919400380868?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const resetForm = () => {
    setResult(null);
    setCalculated(false);
    setPickup("");
    setDestination("");
    setDistance("");
    setPassengers(1);
  };

  return (
    <div className="min-h-screen bg-[#f9f7f4] pt-32 pb-24">
      {/* ── Header ── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#d4af37]/10 text-[#d4af37] text-xs font-semibold uppercase tracking-widest mb-4">
            Instant Estimation
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight mb-4 text-gray-900">
            Fare Calculator
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Get a transparent, instant estimate for{" "}
            <span className="text-gray-800 font-medium">Airport Pickup</span> or{" "}
            <span className="text-gray-800 font-medium">Local Rides</span> across Kerala.
          </p>
        </motion.div>

        {/* ── Ride Type Toggle ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm gap-2">
            {RIDE_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setRideType(type);
                  setCalculated(false);
                  setResult(null);
                }}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  rideType === type
                    ? "bg-black text-white shadow-md"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {type === "Airport Pickup" ? (
                  <Plane className="w-4 h-4" />
                ) : (
                  <Car className="w-4 h-4" />
                )}
                {type}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Main Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="bg-white rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.07)] border border-gray-100 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* ── Left: Form ── */}
            <form
              onSubmit={handleCalculate}
              className="lg:col-span-3 p-8 md:p-12 space-y-8"
            >
              {/* Locations */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Locations
                </h3>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 flex items-center pointer-events-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#d4af37]" />
                  </div>
                  <input
                    type="text"
                    placeholder={
                      rideType === "Airport Pickup"
                        ? "Airport name / terminal"
                        : "Pickup location"
                    }
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37] outline-none text-sm transition-all"
                  />
                </div>

                {/* Dashed connector */}
                <div className="flex items-center gap-3 px-4">
                  <div className="w-2.5 shrink-0" />
                  <div className="flex-1 border-l-2 border-dashed border-gray-200 h-4 ml-[-1px]" />
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 flex items-center pointer-events-none">
                    <Navigation className="w-3 h-3 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37] outline-none text-sm transition-all"
                  />
                </div>
              </div>

              {/* Distance */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Distance
                </h3>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      min="1"
                      step="0.5"
                      placeholder="Enter distance"
                      value={distance}
                      onChange={(e) => {
                        setDistance(e.target.value);
                        setCalculated(false);
                        setResult(null);
                      }}
                      required
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37] outline-none text-sm transition-all pr-16"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                      KM
                    </span>
                  </div>

                  {/* Quick-select pills */}
                  <div className="flex gap-2">
                    {[10, 20, 50].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => {
                          setDistance(String(d));
                          setCalculated(false);
                          setResult(null);
                        }}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                          distance === String(d)
                            ? "bg-black text-white border-black"
                            : "border-gray-200 text-gray-500 hover:border-gray-400"
                        }`}
                      >
                        {d} km
                      </button>
                    ))}
                  </div>
                </div>

                {/* Distance slider for tactile feel */}
                {distanceNum > 0 && (
                  <input
                    type="range"
                    min="1"
                    max="200"
                    step="1"
                    value={distanceNum}
                    onChange={(e) => {
                      setDistance(e.target.value);
                      setCalculated(false);
                      setResult(null);
                    }}
                    className="w-full h-1.5 appearance-none rounded-full bg-gray-200 accent-[#d4af37] cursor-pointer"
                  />
                )}
              </div>

              {/* Vehicle */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Vehicle Type
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {VEHICLES.map((v) => (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => {
                        setVehicle(v.name);
                        setCalculated(false);
                        setResult(null);
                      }}
                      className={`flex flex-col items-start px-4 py-3 rounded-xl border text-left transition-all ${
                        vehicle === v.name
                          ? "border-[#d4af37] bg-[#d4af37]/8 shadow-sm"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <span
                        className={`text-sm font-semibold ${
                          vehicle === v.name ? "text-[#b8960c]" : "text-gray-800"
                        }`}
                      >
                        {v.name}
                      </span>
                      <span className="text-xs text-gray-400 mt-0.5">
                        Up to {v.seats} seats
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Passengers */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Passengers
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                    <Users className="w-4 h-4 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setPassengers((p) => Math.max(1, p - 1))}
                      className="w-7 h-7 rounded-full bg-white border border-gray-200 text-gray-600 font-bold text-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-semibold text-gray-800">
                      {passengers}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPassengers((p) => p + 1)}
                      className="w-7 h-7 rounded-full bg-white border border-gray-200 text-gray-600 font-bold text-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {VEHICLES.find((v) => v.name === vehicle)
                      ? `Max ${VEHICLES.find((v) => v.name === vehicle)!.seats} for ${vehicle}`
                      : ""}
                  </span>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-black text-white py-4 rounded-xl font-bold text-base hover:bg-gray-900 active:scale-[0.98] transition-all group shadow-lg shadow-black/10"
              >
                <Calculator className="w-5 h-5" />
                Calculate Fare
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* ── Right: Results Panel ── */}
            <div className="lg:col-span-2 bg-black text-white flex flex-col rounded-b-[2rem] lg:rounded-bl-none lg:rounded-r-[2rem] overflow-hidden">
              <AnimatePresence mode="wait">
                {!calculated ? (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center p-10 text-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-2">
                      <Calculator className="w-8 h-8 text-[#d4af37]" />
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                      Fill in your trip details and click{" "}
                      <span className="text-white font-medium">Calculate Fare</span>{" "}
                      to see an instant breakdown.
                    </p>

                    {/* Pricing reference table */}
                    <div className="mt-6 w-full text-left bg-white/5 rounded-2xl p-5 space-y-3">
                      <p className="text-xs font-bold uppercase tracking-widest text-[#d4af37] mb-4">
                        Pricing Slabs
                      </p>
                      {[
                        { label: "First 5 KM", rate: "₹100 fixed" },
                        { label: "6 – 20 KM", rate: "₹10 / km" },
                        { label: "21 – 40 KM", rate: "₹15 / km" },
                        { label: "41 – 60 KM", rate: "₹20 / km" },
                        { label: "61 – 80 KM", rate: "₹25 / km" },
                      ].map((s) => (
                        <div key={s.label} className="flex justify-between text-sm">
                          <span className="text-white/50">{s.label}</span>
                          <span className="text-white/80 font-medium">{s.rate}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 flex flex-col p-8 md:p-10"
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <CheckCircle className="w-5 h-5 text-[#d4af37]" />
                      <span className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                        Fare Breakdown
                      </span>
                    </div>

                    {/* Trip summary badges */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/80">
                        {rideType}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/80">
                        {distanceNum} KM
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/80">
                        {vehicle}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/80">
                        {passengers} Pax
                      </span>
                    </div>

                    {/* Breakdown rows */}
                    <div className="space-y-3 flex-1">
                      {/* Base fare */}
                      <div className="flex justify-between items-center py-2 border-b border-white/10">
                        <div>
                          <span className="text-sm text-white/70">Base Fare</span>
                          <p className="text-xs text-white/40">First 5 KM</p>
                        </div>
                        <span className="font-semibold">₹{result!.baseFare}</span>
                      </div>

                      {/* Slabs */}
                      {result!.slabs.map((slab, i) => (
                        <motion.div
                          key={slab.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className="flex justify-between items-center py-2 border-b border-white/10"
                        >
                          <div>
                            <span className="text-sm text-white/70">{slab.label}</span>
                            <p className="text-xs text-white/40">
                              {slab.km} km × ₹{slab.rate}
                            </p>
                          </div>
                          <span className="font-semibold">₹{slab.amount}</span>
                        </motion.div>
                      ))}

                      {/* Vehicle premium */}
                      {result!.vehicleExtra > 0 && (
                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                          <div>
                            <span className="text-sm text-white/70">Vehicle Premium</span>
                            <p className="text-xs text-white/40">{vehicle}</p>
                          </div>
                          <span className="font-semibold">₹{result!.vehicleExtra}</span>
                        </div>
                      )}
                    </div>

                    {/* Total */}
                    <div className="mt-6 pt-6 border-t border-white/20">
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-white/60 text-sm">Estimated Total</span>
                        <motion.span
                          key={result!.total}
                          initial={{ scale: 1.15, color: "#d4af37" }}
                          animate={{ scale: 1, color: "#ffffff" }}
                          transition={{ duration: 0.4 }}
                          className="text-4xl font-bold font-heading"
                        >
                          ₹{result!.total}
                        </motion.span>
                      </div>
                      <p className="text-right text-xs text-white/30 mb-6">
                        *Excludes tolls & waiting charges
                      </p>

                      {/* CTA Buttons */}
                      <div className="space-y-3">
                        <button
                          type="button"
                          onClick={handleBookViaWhatsApp}
                          className="w-full flex items-center justify-center gap-2 bg-[#d4af37] text-black py-3.5 rounded-xl font-bold text-sm hover:bg-[#c9a82f] active:scale-[0.98] transition-all"
                        >
                          <Phone className="w-4 h-4" />
                          Book Now via WhatsApp
                        </button>
                        <button
                          type="button"
                          onClick={resetForm}
                          className="w-full py-3 rounded-xl border border-white/20 text-white/60 text-sm hover:bg-white/5 transition-all"
                        >
                          Calculate Again
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ── Info note ── */}
        <p className="text-center text-xs text-gray-400 mt-6">
          This calculator covers <strong>Airport Pickup</strong> &amp;{" "}
          <strong>Local Rides</strong> only. For outstation &amp; tour packages, please
          contact us directly.
        </p>
      </div>
    </div>
  );
}
