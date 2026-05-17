export interface TourPackage {
  id: string;
  title: string;
  duration: string;
  destinations: string[];
  tagline: string;
  description: string;
  image: string;
  heroImage: string;
  includes: string[];
  itinerary: { day: string; title: string; details: string }[];
  gallery: string[];
  highlights: string[];
  badge?: string;
}

export const tourPackages: TourPackage[] = [
  {
    id: "honeymoon",
    title: "Honeymoon Special",
    duration: "7 Days / 5 Nights",
    destinations: ["Munnar", "Alappuzha", "Kochi"],
    tagline: "Romance among the mist",
    badge: "Most Popular",
    description:
      "Drift through misty tea gardens and float on serene backwaters. An intimate escape crafted for two — where every sunrise feels personal and every evening candlelit.",
    image: "/images/pkg_honeymoon.png",
    heroImage: "/images/pkg_honeymoon.png",
    includes: [
      "2 Nights stay in Munnar luxury resort",
      "1 Night private houseboat stay",
      "Pickup & drop from Kochi",
      "All meals included on houseboat",
      "Candlelight dinner arrangement",
      "Private cab with driver",
    ],
    highlights: ["Munnar Tea Gardens", "Alleppey Houseboat", "Kochi Fort", "Waterfalls Tour"],
    itinerary: [
      { day: "Day 1", title: "Arrive in Kochi — City of Spice", details: "Airport pickup, Fort Kochi walking tour, sunset at Marine Drive, overnight in Kochi." },
      { day: "Day 2", title: "Kochi → Munnar (130 km)", details: "Scenic drive through Periyar forests, arrival at luxury Munnar resort, evening leisure." },
      { day: "Day 3", title: "Munnar Exploration", details: "Visit Eravikulam National Park, Mattupetty Dam, photo walks through tea estates, sunset viewpoint." },
      { day: "Day 4", title: "Tea Gardens & Waterfalls", details: "Attukal Waterfalls, Tea Museum, private spa session, romantic bonfire evening." },
      { day: "Day 5", title: "Munnar → Alleppey (170 km)", details: "Drive to Alleppey, board private houseboat, cruise the backwaters, candlelight dinner on deck." },
      { day: "Day 6", title: "Backwater Morning & Kochi", details: "Morning cruise, disembark, drive back to Kochi, farewell dinner." },
      { day: "Day 7", title: "Departure", details: "Hotel breakfast, airport drop, fond farewells." },
    ],
    gallery: ["/images/pkg_honeymoon.png", "/images/kerala_houseboat.png", "/images/hero_kerala.png"],
  },
  {
    id: "north-kerala",
    title: "North Kerala Experience",
    duration: "5 Days / 4 Nights",
    destinations: ["Wayanad", "Kannur", "Kozhikode"],
    tagline: "Wild forests, pristine beaches & rich culture",
    description:
      "Explore the untouched soul of North Kerala — ancient Theyyam rituals, aromatic Kozhikode cuisine, monsoon-soaked Wayanad forests, and the calm blues of Kannur beaches.",
    image: "/images/pkg_north_kerala.png",
    heroImage: "/images/pkg_north_kerala.png",
    includes: [
      "4 Nights 3-Star hotel stay",
      "Breakfast daily",
      "Pickup & drop",
      "Full sightseeing itinerary",
      "Private cab with driver",
    ],
    highlights: ["Wayanad Wildlife", "Theyyam Performance", "Kannur Beach", "Kozhikode Food Walk"],
    itinerary: [
      { day: "Day 1", title: "Arrive in Kozhikode (Calicut)", details: "Airport pickup, Kozhikode beach walk, Mishkal Mosque visit, authentic Malabar cuisine dinner." },
      { day: "Day 2", title: "Kozhikode → Wayanad", details: "Drive through Thamarassery Churam ghat, Edakkal Caves, Banasura Sagar Dam, plantation stay." },
      { day: "Day 3", title: "Wayanad Exploration", details: "Chembra Peak trek, Meenmutty Waterfalls, wildlife sanctuary drive, bamboo forest walks." },
      { day: "Day 4", title: "Wayanad → Kannur", details: "Drive to Kannur, Payyambalam Beach, St. Angelo Fort, authentic Theyyam performance evening." },
      { day: "Day 5", title: "Kannur → Departure", details: "Loknath Temple, Kottiyoor drive, airport/station drop." },
    ],
    gallery: ["/images/pkg_north_kerala.png", "/images/outstation_travel.png"],
  },
  {
    id: "munnar-alappuzha",
    title: "Munnar & Alappuzha Getaway",
    duration: "3 Days / 2 Nights",
    destinations: ["Munnar", "Alappuzha"],
    tagline: "Hills meet the backwaters",
    description:
      "The perfect quick escape — misty mornings atop verdant tea hills, followed by drifting serenely through Kerala's legendary backwater network on a traditional houseboat.",
    image: "/images/pkg_munnar_alappuzha.png",
    heroImage: "/images/pkg_munnar_alappuzha.png",
    includes: [
      "1 Night hotel stay in Munnar",
      "1 Night houseboat stay",
      "Breakfast in hotel",
      "Pickup & drop",
      "Sightseeing covered",
      "Private cab with driver",
    ],
    highlights: ["Tea Estate Walk", "Mattupetty Dam", "Alleppey Backwaters", "Sunrise Point"],
    itinerary: [
      { day: "Day 1", title: "Arrive → Munnar", details: "Pickup from Kochi, scenic hill drive, check-in, Munnar town stroll, tea estate sunset." },
      { day: "Day 2", title: "Munnar → Alappuzha", details: "Eravikulam Park, Attukal Falls, drive down to Alleppey, houseboat boarding, backwater cruise." },
      { day: "Day 3", title: "Morning Cruise → Departure", details: "Sunrise on the backwaters, disembark, drop to Kochi airport." },
    ],
    gallery: ["/images/pkg_munnar_alappuzha.png", "/images/kerala_houseboat.png", "/images/hero_kerala.png"],
  },
  {
    id: "nature-escape",
    title: "Kerala Nature Escape",
    duration: "5 Days / 4 Nights",
    destinations: ["Munnar", "Thekkady", "Alappuzha", "Kochi"],
    tagline: "Into the wild heart of Kerala",
    description:
      "From elephant safaris in spice-scented forests to floating through emerald backwaters — this is the ultimate immersive Kerala nature circuit for the true explorer.",
    image: "/images/pkg_nature.png",
    heroImage: "/images/pkg_nature.png",
    includes: [
      "3-Star hotel stay / Houseboat stay",
      "Pickup & drop",
      "Breakfast daily",
      "Wildlife safari entry",
      "Full sightseeing",
      "Private cab with driver",
    ],
    highlights: ["Periyar Wildlife Safari", "Spice Plantation Tour", "Munnar Waterfalls", "Alappuzha Sunset"],
    itinerary: [
      { day: "Day 1", title: "Kochi → Munnar", details: "Airport pickup, Cheeyappara Waterfalls en route, Munnar check-in." },
      { day: "Day 2", title: "Munnar", details: "Eravikulam National Park, Tea Museum, Mattupetty Dam, Echo Point." },
      { day: "Day 3", title: "Munnar → Thekkady", details: "Scenic drive, Periyar Lake boat safari, spice garden tour, evening cultural show." },
      { day: "Day 4", title: "Thekkady → Alappuzha", details: "Morning jungle walk, drive to Alleppey, overnight houseboat stay." },
      { day: "Day 5", title: "Alappuzha → Kochi", details: "Morning backwater cruise, drive to Kochi, airport drop." },
    ],
    gallery: ["/images/pkg_nature.png", "/images/kerala_houseboat.png", "/images/pkg_munnar_alappuzha.png"],
  },
  {
    id: "complete-kerala",
    title: "Complete Kerala Tour",
    duration: "7 Days / 6 Nights",
    destinations: ["Munnar", "Thekkady", "Kovalam", "Alappuzha", "Kochi"],
    tagline: "The grand Kerala odyssey",
    badge: "Best Value",
    description:
      "From the misty peaks of Munnar to the golden sands of Kovalam — traverse every iconic corner of God's Own Country in one grand, unforgettable journey.",
    image: "/images/pkg_complete.png",
    heroImage: "/images/pkg_complete.png",
    includes: [
      "6 Nights hotel / houseboat stay",
      "Pickup & drop",
      "Daily breakfast",
      "All major sightseeing",
      "Private cab with driver",
      "Cultural show entry",
    ],
    highlights: ["Munnar Hills", "Thekkady Safari", "Kovalam Beach", "Alleppey Backwaters", "Kochi Heritage"],
    itinerary: [
      { day: "Day 1", title: "Arrive in Kochi", details: "Fort Kochi, Chinese Fishing Nets, Mattancherry Palace, Marine Drive evening." },
      { day: "Day 2", title: "Kochi → Munnar", details: "Scenic drive, Cheeyappara Waterfalls, check-in, tea estate walk." },
      { day: "Day 3", title: "Munnar", details: "Eravikulam Park, Mattupetty, Echo Point, Top Station viewpoint." },
      { day: "Day 4", title: "Munnar → Thekkady", details: "Drive through spice country, Periyar Lake, evening Kalaripayattu show." },
      { day: "Day 5", title: "Thekkady → Kovalam", details: "Morning jungle drive, long scenic drive to Kovalam, beach resort check-in." },
      { day: "Day 6", title: "Kovalam → Alappuzha", details: "Lighthouse Beach morning, drive north, houseboat boarding at Alleppey, sunset cruise." },
      { day: "Day 7", title: "Alappuzha → Kochi Departure", details: "Morning cruise, drive to Kochi, airport drop." },
    ],
    gallery: ["/images/pkg_complete.png", "/images/pkg_nature.png", "/images/kerala_houseboat.png", "/images/pkg_honeymoon.png"],
  },
];
