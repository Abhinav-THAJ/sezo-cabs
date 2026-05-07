import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Star, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-16 mb-32">
          <div className="w-full md:w-1/2">
            <span className="text-gold font-semibold uppercase tracking-wider text-sm mb-4 block">About Sezo Cabz</span>
            <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 leading-tight">
              Redefining Luxury Travel in Kerala
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Founded with a vision to transform mobility in God's Own Country, Sezo Cabz brings together a fleet of premium vehicles and professional chauffeurs to deliver an unmatched travel experience.
            </p>
            <div className="flex items-center gap-8">
              <div>
                <span className="block text-4xl font-bold text-black font-heading mb-1">10+</span>
                <span className="text-sm text-gray-500 uppercase tracking-wide">Years Experience</span>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div>
                <span className="block text-4xl font-bold text-black font-heading mb-1">50k+</span>
                <span className="text-sm text-gray-500 uppercase tracking-wide">Happy Clients</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative h-[600px] rounded-[2rem] overflow-hidden">
            <Image 
              src="/images/hero_kerala.png" 
              alt="Sezo Cabz Luxury Travel" 
              fill 
              className="object-cover"
            />
          </div>
        </div>

        {/* Mission & Values */}
        <div className="bg-black text-white rounded-[3rem] p-12 md:p-20 mb-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <div>
              <ShieldCheck className="w-12 h-12 text-gold mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4">Uncompromising Safety</h3>
              <p className="text-gray-400 leading-relaxed">
                Every vehicle in our fleet undergoes rigorous maintenance checks, and all our chauffeurs are highly trained professionals, ensuring your journey is as safe as it is luxurious.
              </p>
            </div>
            <div>
              <Star className="w-12 h-12 text-gold mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4">Premium Quality</h3>
              <p className="text-gray-400 leading-relaxed">
                From the moment you book to your final destination, experience seamless service, spotless vehicles, and exceptional attention to detail.
              </p>
            </div>
            <div>
              <Clock className="w-12 h-12 text-gold mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4">Absolute Reliability</h3>
              <p className="text-gray-400 leading-relaxed">
                Punctuality is our hallmark. We value your time immensely, ensuring prompt pickups and efficient routing for every trip.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
