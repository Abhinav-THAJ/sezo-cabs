"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle2, ArrowRight, Phone, User, Car } from "lucide-react";

export default function DriverRegistrationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [experience, setExperience] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [rcFile, setRcFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    "w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#d4af37]/40 focus:border-[#d4af37] text-sm transition-all";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseFile || !rcFile) {
      alert("Please upload both your Driving License and RC Book photos.");
      return;
    }

    const msg = [
      `*New Driver Registration — Sezo Cabz* 🚗`,
      `──────────────────────────────`,
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      `*Age:* ${age}`,
      `*Address:* ${address}`,
      `*Driving Experience:* ${experience} year(s)`,
      `*Vehicle:* ${carModel} (${carYear})`,
      ``,
      `📎 License & RC Book photos will be sent separately in this chat.`,
    ].join("\n");

    window.open(`https://wa.me/917306338989?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-3xl font-bold font-heading mb-3">Registration Sent!</h3>
        <p className="text-gray-500 max-w-md mb-8">
          Your details have been sent to our team via WhatsApp. Please send your <strong>Driving License</strong> and <strong>RC Book</strong> photos in the same WhatsApp chat.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
        >
          Register Another Driver
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
      {/* Personal Details */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <User className="w-4 h-4 text-[#d4af37]" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Personal Information</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required type="text" placeholder="Full Name *" value={name} onChange={e => setName(e.target.value)} className={inputClass} />
          <input required type="tel" placeholder="Phone Number *" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} />
          <input required type="number" placeholder="Age *" min="18" max="70" value={age} onChange={e => setAge(e.target.value)} className={inputClass} />
          <input required type="number" placeholder="Driving Experience (Years) *" min="1" value={experience} onChange={e => setExperience(e.target.value)} className={inputClass} />
        </div>
        <textarea required rows={2} placeholder="Full Address *" value={address} onChange={e => setAddress(e.target.value)} className={`${inputClass} resize-none`} />
      </div>

      {/* Vehicle Details */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Car className="w-4 h-4 text-[#d4af37]" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Vehicle Information</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required type="text" placeholder="Car Make & Model * (e.g. Toyota Innova Crysta)" value={carModel} onChange={e => setCarModel(e.target.value)} className={inputClass} />
          <input required type="number" placeholder="Year of Manufacture *" min="2000" max={new Date().getFullYear()} value={carYear} onChange={e => setCarYear(e.target.value)} className={inputClass} />
        </div>
      </div>

      {/* Document Upload */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="w-4 h-4 text-[#d4af37]" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Required Documents</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* License Upload */}
          <label className={`relative flex flex-col items-center justify-center h-36 rounded-xl border-2 border-dashed cursor-pointer transition-all ${licenseFile ? "border-green-400 bg-green-50" : "border-gray-200 bg-gray-50 hover:border-[#d4af37] hover:bg-[#d4af37]/5"}`}>
            <input type="file" accept="image/*,application/pdf" className="sr-only" onChange={e => setLicenseFile(e.target.files?.[0] ?? null)} />
            {licenseFile ? (
              <>
                <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                <span className="text-sm font-semibold text-green-700">License Uploaded</span>
                <span className="text-xs text-green-500 mt-1 px-3 text-center truncate w-full text-center">{licenseFile.name}</span>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-semibold text-gray-700">Driving License *</span>
                <span className="text-xs text-gray-400 mt-1">Click to upload photo / PDF</span>
              </>
            )}
          </label>

          {/* RC Book Upload */}
          <label className={`relative flex flex-col items-center justify-center h-36 rounded-xl border-2 border-dashed cursor-pointer transition-all ${rcFile ? "border-green-400 bg-green-50" : "border-gray-200 bg-gray-50 hover:border-[#d4af37] hover:bg-[#d4af37]/5"}`}>
            <input type="file" accept="image/*,application/pdf" className="sr-only" onChange={e => setRcFile(e.target.files?.[0] ?? null)} />
            {rcFile ? (
              <>
                <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                <span className="text-sm font-semibold text-green-700">RC Book Uploaded</span>
                <span className="text-xs text-green-500 mt-1 px-3 text-center truncate w-full text-center">{rcFile.name}</span>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-semibold text-gray-700">RC Book *</span>
                <span className="text-xs text-gray-400 mt-1">Click to upload photo / PDF</span>
              </>
            )}
          </label>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          * After submitting, please send the actual document images in the WhatsApp chat that opens.
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-xl font-bold text-base hover:bg-gray-900 active:scale-[0.98] transition-all group shadow-lg shadow-black/10"
      >
        <Phone className="w-5 h-5" />
        Submit Registration via WhatsApp
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}
