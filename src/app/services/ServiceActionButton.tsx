"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TourPackagesModal from "@/components/home/TourPackagesModal";

interface ServiceActionButtonProps {
  serviceTitle: string;
}

export default function ServiceActionButton({ serviceTitle }: ServiceActionButtonProps) {
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  if (serviceTitle === "Kerala Tour Packages") {
    return (
      <>
        <button 
          onClick={() => setIsTourModalOpen(true)}
          className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gold transition-all group"
        >
          Book this Service
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <TourPackagesModal 
          isOpen={isTourModalOpen} 
          onClose={() => setIsTourModalOpen(false)} 
        />
      </>
    );
  }

  return (
    <Link 
      href="/book" 
      className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gold transition-all group"
    >
      Book this Service
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}
