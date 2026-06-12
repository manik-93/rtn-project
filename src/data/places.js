/**
 * Static tourism data for Ratnagiri, Maharashtra.
 * Used as fallback when Firestore is unavailable and for seeding.
 */
export const places = [
  {
    id: "ganpatipule-beach",
    name: "Ganpatipule Beach",
    category: "Beach",
    description:
      "A pristine white-sand beach on the Konkan coast, famous for its clear waters, swaying coconut palms, and the ancient Swayambhu Ganpati Temple nearby. Ideal for swimming, sunset views, and water sports.",
    longDescription:
      "Ganpatipule Beach is one of Maharashtra's most celebrated coastal destinations, stretching along the Arabian Sea with golden-white sand and turquoise waters. The beach is named after the 400-year-old Ganpati Temple where the idol is believed to be self-emerged (Swayambhu). Visitors enjoy camel rides, banana boat rides, and serene evening walks. The monsoon transforms the surrounding hills into lush green landscapes, while winter offers perfect weather for family getaways.",
    latitude: 17.1475,
    longitude: 73.2686,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1473496169134-64794407aa5e?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.8,
    location: "Ganpatipule, Ratnagiri District",
    timings: "Open 24 hours (best visited 6 AM – 7 PM)",
    featured: true,
    nearby: ["ratnadurg-fort", "pawas"],
  },
  {
    id: "ratnadurg-fort",
    name: "Ratnadurg Fort",
    category: "Fort",
    description:
      "A historic sea fort built during the Bahamani period, offering panoramic views of the Arabian Sea and Ratnagiri city. Known as Bhagawati Fort, it houses a Bhagawati Temple.",
    longDescription:
      "Ratnadurg Fort, also called Bhagawati Fort, stands on a rocky promontory surrounded by the sea on three sides. Built in the 16th century, the fort played a strategic role during the Maratha empire. Today, visitors explore its bastions, lighthouse views, and the Bhagawati Temple within the fort walls. The sunset views from the ramparts are spectacular.",
    latitude: 16.9953,
    longitude: 73.3097,
    image:
      "https://images.unsplash.com/photo-1590073242677-ac22a4fd8947?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590073242677-ac22a4fd8947?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.5,
    location: "Ratnagiri City",
    timings: "9:00 AM – 6:00 PM",
    featured: true,
    nearby: ["thiba-palace", "mandavi-beach"],
  },
  {
    id: "thiba-palace",
    name: "Thiba Palace",
    category: "Heritage",
    description:
      "Built in 1910–11 to house the exiled king of Burma (Myanmar), Thiba Palace is an elegant colonial-era structure with Burma teak architecture and a museum.",
    longDescription:
      "Thiba Palace was constructed for King Thibaw Min and Queen Supayalat of Burma during their exile in Ratnagiri. The palace showcases colonial architecture with ornate Burma teak woodwork, sloping roofs, and spacious verandas. The on-site museum displays artifacts from the royal family's stay, photographs, and historical documents about Indo-Burmese relations.",
    latitude: 16.9922,
    longitude: 73.3125,
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.3,
    location: "Thiba Palace Road, Ratnagiri",
    timings: "10:00 AM – 5:00 PM (Closed on Mondays)",
    featured: true,
    nearby: ["ratnadurg-fort", "bhatye-beach"],
  },
  {
    id: "jaigad-fort",
    name: "Jaigad Fort",
    category: "Fort",
    description:
      "A coastal fort at the confluence of the Shastri River and Arabian Sea. Offers stunning views of the lighthouse and the vast ocean horizon.",
    longDescription:
      "Jaigad Fort sits at the mouth of the Shastri River where it meets the Arabian Sea. The 16th-century fort is relatively well preserved and less crowded than other coastal forts. The nearby Jaigad Lighthouse and the serene creek make this a photographer's paradise. It's also close to the famous Alphonso mango orchards of the region.",
    latitude: 17.3028,
    longitude: 73.2353,
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.6,
    location: "Jaigad, Ratnagiri District",
    timings: "8:00 AM – 6:00 PM",
    featured: true,
    nearby: ["aare-ware-beach"],
  },
  {
    id: "pawas",
    name: "Pawas",
    category: "Spiritual",
    description:
      "A serene spiritual village known as the home of Swami Swaroopanand, a revered saint. Surrounded by hills and greenery, it attracts devotees year-round.",
    longDescription:
      "Pawas is a peaceful village nestled among the Sahyadri foothills, famous as the abode of Swami Swaroopanand (Ramdas). The ashram and surrounding temples create a tranquil atmosphere ideal for meditation and spiritual retreats. The village also offers scenic drives through mango groves and rural Konkan landscapes.",
    latitude: 17.0833,
    longitude: 73.3167,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.4,
    location: "Pawas, Ratnagiri District",
    timings: "6:00 AM – 8:00 PM",
    featured: false,
    nearby: ["ganpatipule-beach"],
  },
  {
    id: "aare-ware-beach",
    name: "Aare Ware Beach",
    category: "Beach",
    description:
      "Twin beaches connected by a scenic hill road, offering secluded coves, clean sand, and breathtaking coastal views away from the crowds.",
    longDescription:
      "Aare and Ware are twin beaches separated by a small hill, accessible via a winding coastal road with dramatic cliffside views. These beaches remain relatively untouched compared to Ganpatipule, making them perfect for couples and nature lovers. The clear water and rocky outcrops create picturesque settings for photography.",
    latitude: 17.35,
    longitude: 73.2833,
    image:
      "https://images.unsplash.com/photo-1473496169134-64794407aa5e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1473496169134-64794407aa5e?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.7,
    location: "Near Jaigad, Ratnagiri District",
    timings: "Open 24 hours",
    featured: true,
    nearby: ["jaigad-fort"],
  },
  {
    id: "bhatye-beach",
    name: "Bhatye Beach",
    category: "Beach",
    description:
      "A long, flat beach near Ratnagiri city popular with locals for evening walks, horse rides, and fresh seafood stalls along the shore.",
    longDescription:
      "Bhatye Beach stretches along the coast just south of Ratnagiri city. Its wide sandy shore is ideal for jogging, volleyball, and family picnics. Local vendors serve fresh coconut water and Konkani snacks. The beach is easily accessible and less touristy than Ganpatipule, offering an authentic local experience.",
    latitude: 16.9833,
    longitude: 73.3167,
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.2,
    location: "Bhatye, Ratnagiri City",
    timings: "Open 24 hours",
    featured: false,
    nearby: ["thiba-palace", "mandavi-beach"],
  },
  {
    id: "mandavi-beach",
    name: "Mandavi Beach",
    category: "Beach",
    description:
      "A black sand beach in the heart of Ratnagiri city, known for its unique volcanic sand, bustling fish market, and views of Ratnadurg Fort.",
    longDescription:
      "Mandavi Beach is distinctive for its black sand, a result of volcanic minerals. Located in the city center, it's surrounded by the fish market, colonial buildings, and views of Ratnadurg Fort across the bay. The beach comes alive in the evening with locals enjoying street food and sea breeze.",
    latitude: 16.99,
    longitude: 73.305,
    image:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1200&q=80",
    ],
    rating: 4.1,
    location: "Ratnagiri City Center",
    timings: "Open 24 hours",
    featured: false,
    nearby: ["ratnadurg-fort", "bhatye-beach"],
  },
];

export const categories = [
  { id: "all", label: "All", icon: "Compass" },
  { id: "Beach", label: "Beaches", icon: "Waves" },
  { id: "Fort", label: "Forts", icon: "Castle" },
  { id: "Heritage", label: "Heritage", icon: "Landmark" },
  { id: "Spiritual", label: "Spiritual", icon: "Church" },
];

export const testimonials = [
  {
    id: 1,
    name: "Priya Deshmukh",
    location: "Pune, Maharashtra",
    rating: 5,
    text: "Ganpatipule stole our hearts! The beach is pristine and the temple adds a spiritual touch. Explore Ratnagiri made planning so easy.",
    avatar: "PD",
  },
  {
    id: 2,
    name: "Rahul Kulkarni",
    location: "Mumbai, Maharashtra",
    rating: 5,
    text: "Jaigad Fort at sunset is unforgettable. The map feature helped us navigate all the coastal spots in one weekend trip.",
    avatar: "RK",
  },
  {
    id: 3,
    name: "Ananya Sharma",
    location: "Bangalore, Karnataka",
    rating: 4,
    text: "Loved the Alphonso mango season info and seafood recommendations. Ratnagiri is truly the king of mangoes and Konkani cuisine!",
    avatar: "AS",
  },
];

export const quickCategories = [
  {
    id: "beaches",
    title: "Beaches",
    description: "Golden sands & blue waters",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    link: "/attractions?category=Beach",
  },
  {
    id: "forts",
    title: "Forts",
    description: "Historic coastal strongholds",
    image:
      "https://images.unsplash.com/photo-1590073242677-ac22a4fd8947?auto=format&fit=crop&w=600&q=80",
    link: "/attractions?category=Fort",
  },
  {
    id: "food",
    title: "Local Food",
    description: "Konkani & seafood delights",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80",
    link: "/food",
  },
  {
    id: "hotels",
    title: "Hotels",
    description: "Comfortable coastal stays",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    link: "/hotels",
  },
];

export default places;
