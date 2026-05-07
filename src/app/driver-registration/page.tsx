"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, ArrowRight, CheckCircle2 } from "lucide-react";

export default function DriverRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    experience: "",
    vehicleDetails: "",
  });

  const [files, setFiles] = useState({
    license: null as File | null,
    rcBook: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'license' | 'rcBook') => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [type]: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, files would be uploaded to a server first.
    // For WhatsApp, we inform the admin to expect documents from this user.
    const message = `
*New Driver Registration*
-----------------------
*Name:* ${formData.fullName}
*Phone:* ${formData.phone}
*Email:* ${formData.email || 'N/A'}
*Address:* ${formData.address}
*Experience:* ${formData.experience} Years
*Vehicle:* ${formData.vehicleDetails}

*Note:* License and RC Book photos will be sent in the chat.
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919400380868?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-cream">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold font-semibold uppercase tracking-wider text-sm mb-4 block">Join Our Fleet</span>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Drive with Sezo Cabz</h1>
            <p className="text-gray-600 text-lg">Partner with Kerala's most premium luxury mobility platform and earn on your terms.</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 md:p-12 border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name *</label>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address (Optional)</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Driving Experience (Years) *</label>
                  <input type="number" name="experience" required min="1" value={formData.experience} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Address *</label>
                <textarea name="address" required rows={3} value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none resize-none" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Vehicle Details (Make, Model, Year) *</label>
                <input type="text" name="vehicleDetails" required value={formData.vehicleDetails} onChange={handleInputChange} placeholder="e.g., Toyota Innova Crysta, 2022" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Upload Driving License *</label>
                  <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-colors text-center cursor-pointer overflow-hidden group">
                    <input type="file" required accept="image/*" onChange={(e) => handleFileChange(e, 'license')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    {files.license ? (
                      <div className="flex flex-col items-center gap-2 text-green-600">
                        <CheckCircle2 className="w-8 h-8" />
                        <span className="text-sm font-medium truncate w-full">{files.license.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-gold transition-colors">
                        <Upload className="w-8 h-8" />
                        <span className="text-sm font-medium">Click to upload photo</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Upload RC Book *</label>
                  <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-colors text-center cursor-pointer overflow-hidden group">
                    <input type="file" required accept="image/*" onChange={(e) => handleFileChange(e, 'rcBook')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    {files.rcBook ? (
                      <div className="flex flex-col items-center gap-2 text-green-600">
                        <CheckCircle2 className="w-8 h-8" />
                        <span className="text-sm font-medium truncate w-full">{files.rcBook.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-gold transition-colors">
                        <Upload className="w-8 h-8" />
                        <span className="text-sm font-medium">Click to upload photo</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 group shadow-xl shadow-black/10">
                  Submit Registration
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-xs text-center text-gray-500 mt-4">
                  By submitting, you agree to our terms and conditions. Your details will be sent securely via WhatsApp.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
