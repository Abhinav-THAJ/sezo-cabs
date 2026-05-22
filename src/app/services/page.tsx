import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Sezo Cabz's premium services: airport transfers at Kochi, Trivandrum & Calicut, local city rides, Kerala tour packages, outstation travel, corporate & medical transport.",
  alternates: { canonical: "https://www.sezocabz.com/services" },
  openGraph: {
    title: "Premium Cab Services in Kerala | Sezo Cabz",
    description: "Airport transfers, local rides, Kerala tour packages, outstation & corporate travel — all with professional chauffeurs.",
    url: "https://www.sezocabz.com/services",
    images: [{ url: "/images/airport_pickup.png", width: 1200, height: 630, alt: "Sezo Cabz Services" }],
  },
};

const services = [
  {
    title: "Airport Transfers",
    description: "Start and end your journey with absolute comfort. Our chauffeurs monitor your flight status to ensure prompt pickups at Kochi, Trivandrum, and Calicut airports. We offer meet-and-greet services and assist with your luggage, providing a seamless transition to your destination.",
    image: "/images/airport_pickup.png",
    features: ["Flight tracking & delay management", "Meet & Greet at arrivals", "Premium luggage assistance", "Available 24/7 at all major airports"],
    reverse: false
  },
  {
    title: "Local City Rides",
    description: "Navigate through the city in style and comfort. Whether it's a quick business meeting, a shopping spree, or an evening out, our local ride service ensures you arrive refreshed and on time. Experience the city with a professional chauffeur who knows the best routes.",
    image: "/images/local_city_ride.png",
    features: ["Hourly & full-day rentals", "Knowledgeable local chauffeurs", "GPS-tracked premium fleet", "Flexible scheduling"],
    reverse: true
  },
  {
    title: "Kerala Tour Packages",
    description: "Experience the magic of God's Own Country with our curated tour packages. From the misty hills of Munnar to the tranquil backwaters of Alleppey, travel in ultimate luxury. Our knowledgeable chauffeurs double as local guides, ensuring an immersive and educational experience.",
    image: "/images/kerala_houseboat.png",
    features: ["Custom-tailored itineraries", "Expert local guide chauffeurs", "Luxury stays and experiences", "Multi-day sightseeing tours"],
    reverse: false
  },
  {
    title: "Outstation Travel",
    description: "Planning a trip outside the city? Our outstation service offers a safe and luxurious way to travel long distances across South India. Enjoy the landscape through large windows while we handle the driving. Ideal for family vacations or religious pilgrimages.",
    image: "/images/hero_kerala.png",
    features: ["Transparent inter-state billing", "Experienced long-distance drivers", "Comfortable for long durations", "Round-the-clock availability"],
    reverse: true
  },
  {
    title: "Corporate Travel",
    description: "Elevate your business image with our dedicated corporate mobility solutions. We provide reliable and professional transportation for executives, clients, and partners. With streamlined billing and priority support, we manage your corporate fleet so you can focus on business.",
    image: "/images/corporate_car.png",
    features: ["Priority booking & 24/7 support", "Executive-class vehicles", "Detailed monthly reporting", "Corporate account management"],
    reverse: false
  },
  {
    title: "Medical Tourism",
    description: "Travel with peace of mind for your healthcare needs. We offer comfortable, sanitized, and spacious vehicles for patients and their families. Our compassionate chauffeurs are trained to ensure a smooth, stress-free journey to and from medical facilities.",
    image: "/images/medical_tourism.png",
    features: ["Sanitized, spacious vehicles", "Compassionate, trained chauffeurs", "Wheelchair accessible options", "Punctual hospital transfers"],
    reverse: true
  }
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Sezo Cabz Services",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    description: s.description,
  })),
};

export default function ServicesPage() {
  return (
    <>
    <Script id="services-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    <div className="pt-32 pb-24 min-h-screen bg-cream">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <span className="text-gold font-semibold uppercase tracking-wider text-sm mb-4 block">
            Our Expertise
          </span>
          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-8 text-black leading-tight">
            Premium Mobility <br className="hidden md:block" /> For Every Occasion
          </h1>
          <p className="text-gray-600 text-xl leading-relaxed">
            At Sezo Cabz, we don't just provide a ride; we offer a refined travel experience. 
            Discover our comprehensive range of services tailored to meet your unique needs in Kerala.
          </p>
        </div>

        {/* Detailed Services */}
        <div className="space-y-32 md:space-y-48 mb-32">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${service.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 md:gap-24`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 relative group">
                <div className="relative h-[400px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                {/* Decorative element */}
                <div className={`absolute -bottom-6 ${service.reverse ? '-left-6' : '-right-6'} w-32 h-32 bg-gold/10 rounded-full blur-3xl -z-10`} />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2">
                <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8 text-black">
                  {service.title}
                </h2>
                <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold mt-1 shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/book" 
                  className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gold transition-all group"
                >
                  Book this Service
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-black text-white rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold font-heading mb-8 leading-tight">
              Ready for an Unforgettable <br className="hidden md:block" /> Journey?
            </h2>
            <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
              Whether you're planning a trip or need an immediate ride, our team is ready to serve you 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/book" className="bg-gold text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all">
                Book a Cab Now
              </Link>
              <Link href="/contact" className="border border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                Contact Concierge
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}
