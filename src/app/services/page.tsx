import Image from "next/image";

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-gold font-semibold uppercase tracking-wider text-sm mb-4 block">
            Premium Mobility
          </span>
          <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6">
            Luxury Travel Solutions
          </h1>
          <p className="text-gray-600 text-lg">
            Whether you need a reliable airport transfer, a corporate ride, or a curated tour across Kerala, we provide an uncompromising luxury experience.
          </p>
        </div>



        {/* Detailed Services */}
        <div className="space-y-32">
          {/* Service 1 */}
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/images/airport_pickup.png" alt="Airport Pickup" fill className="object-cover" />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-bold font-heading mb-6">Airport Transfers</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Start and end your journey with absolute comfort. Our chauffeurs monitor your flight status to ensure prompt pickups at Kochi, Trivandrum, and Calicut airports. We offer meet-and-greet services and assist with your luggage, providing a seamless transition to your destination.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-gold rounded-full" /> Flight tracking</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-gold rounded-full" /> Meet & Greet service</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-gold rounded-full" /> Premium luggage assistance</li>
              </ul>
            </div>
          </div>

          {/* Service 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16">
            <div className="w-full md:w-1/2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src="/images/kerala_houseboat.png" alt="Kerala Tour Packages" fill className="object-cover" />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-bold font-heading mb-6">Kerala Tour Packages</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Experience the magic of God's Own Country with our curated tour packages. From the misty hills of Munnar to the tranquil backwaters of Alleppey, travel in ultimate luxury. Our knowledgeable chauffeurs double as local guides, ensuring an immersive experience.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-gold rounded-full" /> Custom itineraries</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-gold rounded-full" /> Local expert chauffeurs</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-gold rounded-full" /> Handpicked luxury stays</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
