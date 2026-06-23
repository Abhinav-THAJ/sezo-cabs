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
    id: "kerala-tour",
    title: "Classic Kerala Tour",
    duration: "4 Days / 3 Nights",
    destinations: ["Kochi", "Munnar", "Alappuzha"],
    tagline: "Experience the misty mountains and tranquil backwaters",
    description: "Discover the perfect essence of Kerala in 4 days. Witness the cascading waterfalls, walk through lush tea gardens in Munnar, and cruise along the pristine backwaters of Alleppey.",
    image: "/images/pkg_munnar_alappuzha.png",
    heroImage: "/images/pkg_munnar_alappuzha.png",
    includes: [
      "3 Nights Accommodation",
      "Cab for transfers & sightseeing",
      "Driver Bata",
      "Fuel Charges",
      "Toll & Parking",
    ],
    highlights: ["Eravikulam National Park", "Mattupetty Dam", "Alleppey Houseboat Cruise", "Fort Kochi Sightseeing"],
    itinerary: [
      {
        day: "Day 1",
        title: "Kochi to Munnar",
        details: "Pickup from Kochi Airport / Railway Station / Hotel and proceed to Munnar. En route, enjoy sightseeing at Cheeyappara Waterfalls, Valara Waterfalls, Tea Plantation View Point, and a Spice Garden. Check-in at Munnar Hotel for overnight stay."
      },
      {
        day: "Day 2",
        title: "Munnar Sightseeing",
        details: "After breakfast, enjoy full day Munnar sightseeing including Eravikulam National Park, Rose Garden, Photo Point, Mattupetty Dam, Echo Point, Kundala Lake, and Tea Museum. Return to hotel for overnight stay."
      },
      {
        day: "Day 3",
        title: "Munnar to Alleppey",
        details: "After breakfast, checkout and proceed to Alleppey. Check-in to your Houseboat or Hotel. Experience Alleppey backwater sightseeing: Houseboat Cruise, Village Views, Paddy Fields, and Backwater Canals. Overnight stay in Alleppey."
      },
      {
        day: "Day 4",
        title: "Alleppey to Kochi",
        details: "After breakfast checkout and proceed to Kochi. Visit Fort Kochi, Chinese Fishing Nets, Marine Drive, and St. Francis Church. Drop at Kochi Airport / Railway Station / Hotel."
      }
    ],
    gallery: ["/images/pkg_munnar_alappuzha.png", "/images/kerala_houseboat.png", "/images/hero_kerala.png"],
  },
  {
    id: "munnar-alappuzha",
    title: "Munnar Getaway",
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
      { day: "Day 2", title: "Munnar Site Seeing", details: "Eravikulam Park, Attukal Falls, drive down to Alleppey, houseboat boarding, backwater cruise." },
      { day: "Day 3", title: "Munnar → Kochi Departure", details: "Sunrise on the backwaters, disembark, drop to Kochi airport." },
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
  {
    id: "north-kerala",
    title: "North Kerala Explorer",
    duration: "5 Days / 4 Nights",
    destinations: ["Kozhikode", "Wayanad", "Kannur", "Bekal", "Kasaragod"],
    tagline: "Unveil the historic fortresses, drive-in beaches, and misty peaks",
    description:
      "Discover the untouched beauty of North Kerala — from Kozhikode's coastal charm to the misty peaks of Wayanad, historical Kannur, and the grand seaside fortress of Bekal.",
    image: "https://images.openai.com/static-rsc-4/KxAnFpjY0LWejglvFiEklqLc_em8lzpXm20GFwDEq-Wuv3Q0pZhQLgZ87hmt_v4NjCg566k4CDBGxRcfQnRbzzsU__6XrWOtQaM8tcBvjH6Dr0nYdLLiOQcuB1PwF6HbKgMZ2QGeNDmi63Jx4q97IAwbXFkMd0O86GG3WazlOCq6odeC8UxuDNrQMJl2sSiB?purpose=fullsize",
    heroImage: "https://images.openai.com/static-rsc-4/KxAnFpjY0LWejglvFiEklqLc_em8lzpXm20GFwDEq-Wuv3Q0pZhQLgZ87hmt_v4NjCg566k4CDBGxRcfQnRbzzsU__6XrWOtQaM8tcBvjH6Dr0nYdLLiOQcuB1PwF6HbKgMZ2QGeNDmi63Jx4q97IAwbXFkMd0O86GG3WazlOCq6odeC8UxuDNrQMJl2sSiB?purpose=fullsize",
    includes: [
      "Accommodation for 4 Nights",
      "Daily Breakfast",
      "Pickup & Drop",
      "All sightseeing transfers",
      "Driver bata, toll, parking",
      "Private cab",
    ],
    highlights: ["Muzhappilangad Beach", "Bekal Fort", "Edakkal Caves", "Soochipara Waterfalls"],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival at Kozhikode & Transfer to Wayanad",
        details: "Pickup from Kozhikode Airport / Railway Station and proceed to beautiful Wayanad. En route, visit Lakkidi View Point, Pookode Lake, and Chain Tree. Check-in at hotel/resort, overnight stay at Wayanad."
      },
      {
        day: "Day 2",
        title: "Wayanad Sightseeing",
        details: "After breakfast, enjoy full day sightseeing. Visit Edakkal Caves, Soochipara Waterfalls, Tea Plantation, and Karapuzha Dam. Campfire is optional. Overnight stay at Wayanad."
      },
      {
        day: "Day 3",
        title: "Wayanad to Kannur",
        details: "After breakfast, proceed to Kannur. Visit Muzhappilangad Drive-in Beach, St. Angelo Fort, and Payyambalam Beach. Spend the evening at leisure. Overnight stay at Kannur."
      },
      {
        day: "Day 4",
        title: "Kannur to Bekal & Kasaragod",
        details: "After breakfast, proceed to Bekal. Visit Bekal Fort, Bekal Beach, and Chandragiri Fort. Houseboat / Backwater visit is optional. Overnight stay at Bekal / Kasaragod."
      },
      {
        day: "Day 5",
        title: "Departure",
        details: "After breakfast check-out. Enjoy local shopping or optional sightseeing. Drop at Kasaragod / Kannur / Kozhikode Airport or Railway Station as per your schedule. Tour ends with beautiful memories."
      }
    ],
    gallery: [
      "https://images.openai.com/static-rsc-4/JLaqy0-QNPhYjyZPuR3B7tzBo4pCeMEvlbhBtWXf2dFPj0OVg5yyr-8rwWu6MH8VtNRaSUrvOPeGKNrDAKfu1bjPM7lTo9KqCGc9Tq2_1SqcTMMC5YtlXlgsxjliLz_x0Wybprm7dnsbJu5pvFL_BqhoI_XBiTxJeex3dzvabuyTk_fxiU-ht65nPbvp8ed_?purpose=fullsize",
      "https://images.openai.com/static-rsc-4/RUiE-6Jhl44YWXuMXRLJ6CV69Lsst61BdSfUuv15AGP5i8VpvGAALhoWSDT3vNTfaMjiL0KgxVZb50IwJTDgNeDXGo1wJ9QYpcND8wopdHY1h6lEHkApGdG58fECZMlF0TSp3zoADx72-AkTdSEgzpIECckCwbI5XvdNucis0_QOyC5Qp5mATsehIqkg8dok?purpose=fullsize",
      "https://images.openai.com/static-rsc-4/pMkze3KY7AVboXv8v78D46FfUE3w2ZtDnwustx1j0VEikYSvWc47OAU-Be_MfkYwoSJ-Cjtxiq_VQSxLp2U-MXgggEZG3cHWCSdcYat8SkyWbTwOJj-Ef5he1zdwIXJ_NhrDxr6IU-l67wa0hGCU4BVUO8Y3BQK9kLtjHlpaIopZJXxHtWd0mk_6zirMERa4?purpose=fullsize"
    ]
  },
  {
    id: "honeymoon",
    title: "Honeymoon Package 💕",
    duration: "5 Days / 4 Nights",
    destinations: ["Munnar", "Alappuzha", "Kochi"],
    tagline: "Romance among the mist",
    badge: "Most Popular",
    description:
      "Drift through misty tea gardens and float on serene backwaters. An intimate escape crafted for two — where every sunrise feels personal and every evening candlelit.",
    image: "/images/pkg_honeymoon.png",
    heroImage: "/images/pkg_honeymoon.png",
    includes: [
      "3 Nights stay in Munnar",
      "1 Night private houseboat stay",
      "Kolukkumalai Sunrise Jeep Safari",
      "Pickup & drop from Kochi",
      "All meals included on houseboat",
      "Private cab with driver",
    ],
    highlights: ["Kolukkumalai Sunrise", "Munnar Tea Gardens", "Alleppey Houseboat", "Waterfalls Tour"],
    itinerary: [
      { day: "Day 1", title: "Kochi to Munnar", details: "Arrival at Kochi and proceed to beautiful Munnar. Enjoy the scenic hill drive with waterfalls, tea plantations, and viewpoints on the way. Overnight stay at Munnar." },
      { day: "Day 2", title: "Munnar Sightseeing", details: "Full day sightseeing in Munnar including tea gardens, photo points, dams, waterfalls, and other tourist attractions. Overnight stay at Munnar." },
      { day: "Day 3", title: "Kolukkumalai Jeep Safari & Sunrise", details: "Early morning jeep safari to Kolukkumalai to enjoy the breathtaking sunrise and mountain views. Return to hotel and relax. Overnight stay at Munnar." },
      { day: "Day 4", title: "Munnar to Alleppey | Private Houseboat Stay", details: "Proceed to Alappuzha and check in to a private houseboat. Enjoy cruising through the backwaters with delicious meals and peaceful village views. Overnight stay in private houseboat." },
      { day: "Day 5", title: "Alleppey Houseboat Check-out & Drop", details: "Enjoy a morning cruise, check out from the houseboat, and proceed to Kochi for your departure drop with sweet memories." },
    ],
    gallery: ["/images/pkg_honeymoon.png", "/images/kerala_houseboat.png", "/images/hero_kerala.png"],
  },
];

