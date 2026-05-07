"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, MapPin, Users, Calendar, Clock, ArrowRight } from "lucide-react";

type VehicleType = "Sedan" | "Ertiga + MUV" | "Innova" | "Innova Crysta" | "Innova Hycross" | "Tempo Traveller" | "Luxury Tempo" | "Urbania" | "Coach";
type RideType = "Airport Pickup" | "Local Rides" | "Outstation";

const vehicles: VehicleType[] = ["Sedan", "Ertiga + MUV", "Innova", "Innova Crysta", "Innova Hycross", "Tempo Traveller", "Luxury Tempo", "Urbania", "Coach"];
const rideTypes: RideType[] = ["Airport Pickup", "Local Rides", "Outstation"];

export default function FareCalculator() {
  const [distance, setDistance] = useState<number>(10);
  const [vehicle, setVehicle] = useState<VehicleType>("Sedan");
  const [rideType, setRideType] = useState<RideType>("Airport Pickup");
  const [passengers, setPassengers] = useState<number>(2);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  
  const [fareBreakdown, setFareBreakdown] = useState<{ label: string; amount: number }[]>([]);
  const [totalFare, setTotalFare] = useState(0);

  // Vehicle multipliers
  const vehicleMultipliers: Record<VehicleType, number> = {
    "Sedan": 1,
    "Ertiga + MUV": 1.2,
    "Innova": 1.4,
    "Innova Crysta": 1.6,
    "Innova Hycross": 1.8,
    "Tempo Traveller": 2.2,
    "Luxury Tempo": 2.5,
    "Urbania": 3.0,
    "Coach": 4.5,
  };

  useEffect(() => {
    calculateFare();
  }, [distance, vehicle]);

  const calculateFare = () => {
    let currentDistance = distance;
    let base = 100; // First 5 KM
    let remainingDistance = Math.max(0, currentDistance - 5);
    
    let breakdown = [
      { label: "Base Fare (First 5 KM)", amount: base }
    ];
    let total = base;

    let currentSlabStart = 6;
    let currentSlabEnd = 20;
    let currentRate = 10;

    while (remainingDistance > 0) {
      let slabDistance = Math.min(remainingDistance, currentSlabEnd - currentSlabStart + 1);
      let slabCost = slabDistance * currentRate;
      
      breakdown.push({
        label: `Slab ${currentSlabStart}-${currentSlabStart + slabDistance - 1} KM (@ ₹${currentRate}/km)`,
        amount: slabCost
      });
      
      total += slabCost;
      remainingDistance -= slabDistance;
      
      currentSlabStart = currentSlabEnd + 1;
      currentSlabEnd += 20;
      currentRate += 5;
    }

    // Apply vehicle multiplier
    const multiplier = vehicleMultipliers[vehicle];
    if (multiplier !== 1) {
      const vehicleExtra = total * (multiplier - 1);
      breakdown.push({
        label: `${vehicle} Premium`,
        amount: Math.round(vehicleExtra)
      });
      total += vehicleExtra;
    }

    setFareBreakdown(breakdown);
    setTotalFare(Math.round(total));
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `
*New Booking Request - Sezo Cabz*
-------------------------------
*Name:* ${pickup} (Assumed for now)
*Pickup:* ${pickup}
*Destination:* ${destination}
*Distance:* ${distance} KM
*Date & Time:* ${date} at ${time}
*Vehicle:* ${vehicle}
*Ride Type:* ${rideType}
*Passengers:* ${passengers}
*Estimated Fare:* ₹${totalFare}
*Notes:* ${notes}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919400380868?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 border border-gray-100 relative overflow-hidden" id="calculator">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Input Section */}
        <div className="flex-1 space-y-6">
          <div>
            <h3 className="text-2xl font-bold font-heading mb-2">Book Your Ride</h3>
            <p className="text-gray-500 text-sm">Get an instant estimate and book via WhatsApp.</p>
          </div>
          
          <form onSubmit={handleBooking} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Pickup Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    required
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all" 
                    placeholder="Enter pickup point"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                  <input 
                    type="text" 
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all" 
                    placeholder="Enter destination"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Estimated Distance (KM)</label>
                <input 
                  type="number" 
                  min="1"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Ride Type</label>
                <select 
                  value={rideType}
                  onChange={(e) => setRideType(e.target.value as RideType)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all"
                >
                  {rideTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Vehicle Type</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {vehicles.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVehicle(v)}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-2
                      ${vehicle === v ? "border-gold bg-gold/10 text-gold shadow-sm" : "border-gray-200 bg-white text-gray-600 hover:border-gold/50"}`}
                  >
                    <Car className="w-4 h-4" />
                    {v}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all text-sm" 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="time" 
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all text-sm" 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Passengers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="number" 
                    min="1"
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all text-sm" 
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 group">
              Confirm & Book via WhatsApp
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Fare Estimation Panel */}
        <div className="lg:w-1/3 bg-black rounded-2xl p-8 text-white relative flex flex-col justify-between">
          <div>
            <h4 className="text-gold font-medium mb-6">Fare Estimation</h4>
            
            <div className="space-y-4 mb-8">
              <AnimatePresence mode="popLayout">
                {fareBreakdown.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-gray-400">{item.label}</span>
                    <span className="font-medium">₹{item.amount}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6 mt-6">
            <div className="flex justify-between items-end mb-2">
              <span className="text-gray-300">Estimated Total</span>
              <motion.span 
                key={totalFare}
                initial={{ scale: 1.1, color: "#d4af37" }}
                animate={{ scale: 1, color: "#ffffff" }}
                className="text-4xl font-bold font-heading"
              >
                ₹{totalFare}
              </motion.span>
            </div>
            <p className="text-xs text-gray-500 text-right">*Actual fare may vary based on tolls and taxes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
