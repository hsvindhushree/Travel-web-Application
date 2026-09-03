export const DESTINATIONS = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    continent: "Europe",
    category: "Cultural",
    tagline: "The City of Light, Romance, and Culinary Mastery",
    description: "Paris enchants with its tree-lined boulevards, world-renowned art museums, iconic iron architecture, and pavement cafe culture. From fashion trends to grand Gothic cathedrals, every corner tells a historic story.",
    lat: 48.8566,
    lon: 2.3522,
    rating: 4.9,
    reviewsCount: 3420,
    priceLevel: "$$$",
    bestTimeToVisit: "April to October",
    currency: "EUR (€)",
    language: "French",
    avgCostPerDay: "$180 - $350",
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=1200&q=80"
    ],
    famousPlaces: [
      {
        id: "eiffel-tower",
        name: "Eiffel Tower",
        category: "Iconic Landmark",
        image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80",
        description: "The global symbol of France, standing 330 meters tall over the Champ de Mars with panoramic city vistas.",
        visitTime: "2-3 Hours",
        cost: "€18 - €28",
        highlights: ["Summit champagne bar", "Sparkling night illumination", "Glass floor view on level 1"],
        rating: 4.9
      },
      {
        id: "louvre-museum",
        name: "The Louvre Museum",
        category: "Art & Museum",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80",
        description: "The world's largest art museum housing Leonardo da Vinci's Mona Lisa and Venus de Milo in a former royal palace.",
        visitTime: "3-5 Hours",
        cost: "€22",
        highlights: ["Mona Lisa", "Winged Victory of Samothrace", "Glass Pyramid courtyard"],
        rating: 4.8
      },
      {
        id: "montmartre",
        name: "Montmartre & Sacré-Cœur",
        category: "Historic Neighborhood",
        image: "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?auto=format&fit=crop&w=800&q=80",
        description: "A hilltop bohemian artist quarter topped by the dome of Sacré-Cœur Basilica with sweeping Paris views.",
        visitTime: "3 Hours",
        cost: "Free (Basilica)",
        highlights: ["Place du Tertre painters", "Sacré-Cœur steps sunset", "Charming cobblestone alleyways"],
        rating: 4.7
      },
      {
        id: "seine-river-cruise",
        name: "Seine River Cruise",
        category: "Experience & Sightseeing",
        image: "https://images.unsplash.com/photo-1509299349698-ab22323ae696?auto=format&fit=crop&w=800&q=80",
        description: "Glide past illuminated bridges, Notre-Dame Cathedral, and historic riverside quays aboard Bateaux Parisiens.",
        visitTime: "1-2 Hours",
        cost: "€16 - €60",
        highlights: ["Sunset boat tour", "Historic bridges underpass", "Dinner cruise options"],
        rating: 4.8
      }
    ]
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    continent: "Asia",
    category: "City",
    tagline: "Where Ultra-Modern Metropolis Meets Ancient Tradition",
    description: "Tokyo seamlessly weaves neon-lit skyscrapers, bustling arcade districts, and robot pop culture with quiet Shinto shrines, cherry blossom gardens, and serene tea houses.",
    lat: 35.6762,
    lon: 139.6503,
    rating: 4.95,
    reviewsCount: 4890,
    priceLevel: "$$$",
    bestTimeToVisit: "March to May & Sept to Nov",
    currency: "JPY (¥)",
    language: "Japanese",
    avgCostPerDay: "$150 - $300",
    coverImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80"
    ],
    famousPlaces: [
      {
        id: "sensoji-temple",
        name: "Senso-ji Temple & Asakusa",
        category: "Historic Temple",
        image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=800&q=80",
        description: "Tokyo's oldest Buddhist temple founded in 645 AD, entered through the striking Kaminarimon Gate with giant red lantern.",
        visitTime: "2 Hours",
        cost: "Free",
        highlights: ["Nakamise shopping street", "Five-story pagoda", "Incense burning ritual"],
        rating: 4.8
      },
      {
        id: "shibuya-crossing",
        name: "Shibuya Crossing & Sky",
        category: "City Landmark",
        image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80",
        description: "The world's busiest pedestrian scramble, surrounded by giant video billboards and rooftop observation decks.",
        visitTime: "1-2 Hours",
        cost: "Free (Shibuya Sky ¥2000)",
        highlights: ["Hachiko statue", "Shibuya Sky 360 view", "Neon night spectacle"],
        rating: 4.9
      },
      {
        id: "teamlab-planets",
        name: "teamLab Planets TOKYO",
        category: "Digital Art & Immersion",
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
        description: "A body-immersive digital art museum where visitors walk bare-foot through water and infinite mirror room installations.",
        visitTime: "2-3 Hours",
        cost: "¥3800",
        highlights: ["Infinite crystal room", "Floating flower garden", "Koi fish water projection"],
        rating: 4.9
      },
      {
        id: "shinjuku-gyoen",
        name: "Shinjuku Gyoen National Garden",
        category: "Nature & Park",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
        description: "A tranquil 144-acre oasis blending Japanese traditional, French formal, and English landscape gardens.",
        visitTime: "2 Hours",
        cost: "¥500",
        highlights: ["Spring cherry blossoms", "Traditional tea house", "Tropical greenhouse"],
        rating: 4.7
      }
    ]
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    continent: "Asia",
    category: "Beach",
    tagline: "Island of the Gods, Emerald Terraces, and Sacred Temples",
    description: "Bali captivates travelers with lush volcanic mountains, iconic rice paddies, serene surf beaches, vibrant coral reefs, and a deeply rooted spiritual Hindu culture.",
    lat: -8.4095,
    lon: 115.1889,
    rating: 4.88,
    reviewsCount: 2950,
    priceLevel: "$$",
    bestTimeToVisit: "April to October",
    currency: "IDR (Rp)",
    language: "Indonesian / Balinese",
    avgCostPerDay: "$60 - $180",
    coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80"
    ],
    famousPlaces: [
      {
        id: "tegallalang-rice-terraces",
        name: "Tegallalang Rice Terraces",
        category: "Nature & Landscape",
        image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80",
        description: "Emerald green terraced hillsides applying ancient Subak irrigation systems, offering iconic jungle swings.",
        visitTime: "2-3 Hours",
        cost: "IDR 50,000",
        highlights: ["Bali jungle swings", "Subak irrigation walking path", "Sunrise morning mist"],
        rating: 4.8
      },
      {
        id: "tanah-lot-temple",
        name: "Tanah Lot Sea Temple",
        category: "Sacred Temple",
        image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
        description: "An ancient Hindu shrine perched atop an offshore rock formation carved by ocean tides.",
        visitTime: "2 Hours",
        cost: "IDR 60,000",
        highlights: ["Spectacular ocean sunset", "Holy water cave blessing", "Traditional Kecak fire dance"],
        rating: 4.9
      },
      {
        id: "ubud-monkey-forest",
        name: "Sacred Monkey Forest Sanctuary",
        category: "Wildlife & Nature",
        image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
        description: "A natural forest sanctuary home to over 1,000 playful Balinese long-tailed macaques and moss-covered temples.",
        visitTime: "2 Hours",
        cost: "IDR 80,000",
        highlights: ["Ancient mossy dragon bridges", "Playful monkey sightings", "Banyan tree canopy walking"],
        rating: 4.7
      },
      {
        id: "nusa-penida",
        name: "Nusa Penida & Kelingking Beach",
        category: "Adventure & Island",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
        description: "A rugged island trip famed for the cliff shaped like a T-Rex overlooking turquoise coastal waters.",
        visitTime: "Full Day",
        cost: "IDR 250,000 (Speedboat)",
        highlights: ["T-Rex shaped cliff top view", "Angel's Billabong pool", "Manta ray snorkeling"],
        rating: 4.9
      }
    ]
  },
  {
    id: "new-york",
    name: "New York City",
    country: "United States",
    continent: "North America",
    category: "City",
    tagline: "The City That Never Sleeps: Culture, Skyscrapers & Energy",
    description: "NYC is a global epicenter of art, finance, theater, dining, and architectural marvels. From Central Park's serene lawns to Broadway's glittering stages, experience unmatched energy.",
    lat: 40.7128,
    lon: -74.0060,
    rating: 4.91,
    reviewsCount: 5120,
    priceLevel: "$$$$",
    bestTimeToVisit: "September to November & April to June",
    currency: "USD ($)",
    language: "English",
    avgCostPerDay: "$250 - $500",
    coverImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1485871981521-5b1017957861?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1200&q=80"
    ],
    famousPlaces: [
      {
        id: "central-park",
        name: "Central Park",
        category: "Urban Oasis",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
        description: "An 843-acre green sanctuary in the heart of Manhattan featuring Bethesda Fountain, rowboats, and tree-lined pathways.",
        visitTime: "2-4 Hours",
        cost: "Free",
        highlights: ["Bow Bridge rowboats", "Bethesda Terrace", "Strawberry Fields memorial"],
        rating: 4.9
      },
      {
        id: "statue-of-liberty",
        name: "Statue of Liberty & Ellis Island",
        category: "Historic Monument",
        image: "https://images.unsplash.com/photo-1485871981521-5b1017957861?auto=format&fit=crop&w=800&q=80",
        description: "The colossal gift of friendship from France representing freedom and democracy in New York Harbor.",
        visitTime: "3-4 Hours",
        cost: "$24",
        highlights: ["Ferry ride with skyline views", "Pedestal museum", "Ellis Island immigration records"],
        rating: 4.8
      },
      {
        id: "empire-state-building",
        name: "Empire State Building",
        category: "Skyscraper Observatory",
        image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=800&q=80",
        description: "The legendary Art Deco tower offering 360-degree open-air views of Manhattan from its 86th & 102nd floors.",
        visitTime: "2 Hours",
        cost: "$44 - $79",
        highlights: ["86th floor open observatory", "Sunset view", "Interactive historical exhibits"],
        rating: 4.8
      },
      {
        id: "times-square",
        name: "Times Square & Broadway",
        category: "Entertainment",
        image: "https://images.unsplash.com/photo-1508997449629-303059a039c0?auto=format&fit=crop&w=800&q=80",
        description: "The pulsating illuminated heart of the theater district lined with digital billboards and musical shows.",
        visitTime: "1-2 Hours",
        cost: "Free (Shows vary)",
        highlights: ["Red TKTS bleacher stairs", "Broadway theater shows", "Midnight moment video installations"],
        rating: 4.7
      }
    ]
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    continent: "Europe",
    category: "Historic",
    tagline: "The Eternal City of Gladiators, Emperors, and Gelato",
    description: "Step into an open-air museum of nearly 3,000 years of globally influential art, architecture, and culture. Marvel at Roman ruins alongside lively plazas and trattorias.",
    lat: 41.9028,
    lon: 12.4964,
    rating: 4.89,
    reviewsCount: 3870,
    priceLevel: "$$$",
    bestTimeToVisit: "April to May & Sept to Oct",
    currency: "EUR (€)",
    language: "Italian",
    avgCostPerDay: "$140 - $280",
    coverImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=80"
    ],
    famousPlaces: [
      {
        id: "colosseum",
        name: "The Colosseum & Roman Forum",
        category: "Ancient Architecture",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
        description: "The largest amphitheater ever built, host to gladiatorial contests and ancient Roman public spectacles.",
        visitTime: "3 Hours",
        cost: "€16",
        highlights: ["Arena floor access", "Underground hypogeum", "Palatine Hill imperial palaces"],
        rating: 4.9
      },
      {
        id: "trevi-fountain",
        name: "Trevi Fountain",
        category: "Baroque Monument",
        image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=800&q=80",
        description: "The world-famous Baroque masterpiece where travelers toss coins to ensure their return to the Eternal City.",
        visitTime: "1 Hour",
        cost: "Free",
        highlights: ["Coin toss tradition", "Oceanus statue details", "Evening illuminated fountain"],
        rating: 4.8
      },
      {
        id: "vatican-museums",
        name: "Vatican City & Sistine Chapel",
        category: "Art & Religion",
        image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80",
        description: "An independent city-state housing Michelangelo's Sistine Chapel ceiling and St. Peter's Basilica.",
        visitTime: "4 Hours",
        cost: "€17",
        highlights: ["Sistine Chapel ceiling frescoes", "St. Peter's dome climb view", "Raphael Rooms"],
        rating: 4.9
      },
      {
        id: "pantheon",
        name: "The Pantheon",
        category: "Ancient Temple",
        image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=800&q=80",
        description: "A remarkably preserved Roman temple with a soaring unreinforced concrete dome and open central oculus.",
        visitTime: "1 Hour",
        cost: "€5",
        highlights: ["Sunlight beam through oculus", "Raphael's tomb", "Original marble columns"],
        rating: 4.9
      }
    ]
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    continent: "Europe",
    category: "Beach",
    tagline: "Whitewashed Cliffside Villages and Aegean Sunsets",
    description: "Formed by a dramatic volcanic eruption, Santorini is famous for its whitewashed cave houses, blue-domed churches, dramatic volcanic cliffs, and legendary sunsets over the caldera.",
    lat: 36.3932,
    lon: 25.4615,
    rating: 4.93,
    reviewsCount: 2640,
    priceLevel: "$$$$",
    bestTimeToVisit: "May to October",
    currency: "EUR (€)",
    language: "Greek",
    avgCostPerDay: "$200 - $450",
    coverImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    ],
    famousPlaces: [
      {
        id: "oia-village",
        name: "Oia Village Sunset Spot",
        category: "Scenic Village",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
        description: "The iconic postcard village famed for blue-domed churches, narrow marble pathways, and world-class sunsets.",
        visitTime: "3-4 Hours",
        cost: "Free",
        highlights: ["Oia Castle sunset spot", "Blue-domed churches", "Windmills of Oia"],
        rating: 4.95
      },
      {
        id: "red-beach",
        name: "Red Beach (Akrotiri)",
        category: "Unique Beach",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
        description: "A dramatic volcanic beach backed by soaring crimson red lava rock cliffs and dark snorkeling waters.",
        visitTime: "2 Hours",
        cost: "Free",
        highlights: ["Vibrant red cliff backdrop", "Snorkeling around volcanic rocks", "Catamaran boat access"],
        rating: 4.6
      },
      {
        id: "fira-to-oia-hike",
        name: "Fira to Oia Caldera Trail",
        category: "Hiking & Views",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        description: "A scenic 10km walking ridge trail offering uninterrupted Aegean Sea and caldera cliffside vistas.",
        visitTime: "3 Hours",
        cost: "Free",
        highlights: ["Panagia Ekklisia chapel stops", "Uninterrupted caldera edge panoramas", "Imerovigli rock formation"],
        rating: 4.9
      }
    ]
  },
  {
    id: "banff",
    name: "Banff & Lake Louise",
    country: "Canada",
    continent: "North America",
    category: "Nature",
    tagline: "Glacial Turquoise Lakes and Majestic Rocky Mountain Peaks",
    description: "Nestled inside Banff National Park, Canada's premier mountain paradise features turquoise alpine lakes fed by glaciers, towering Rocky Mountain crags, abundant wildlife, and crisp mountain air.",
    lat: 51.1784,
    lon: -115.5708,
    rating: 4.94,
    reviewsCount: 2310,
    priceLevel: "$$$",
    bestTimeToVisit: "June to September & Dec to March (Ski)",
    currency: "CAD ($)",
    language: "English / French",
    avgCostPerDay: "$180 - $320",
    coverImage: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80"
    ],
    famousPlaces: [
      {
        id: "lake-louise",
        name: "Lake Louise & Victoria Glacier",
        category: "Alpine Lake",
        image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
        description: "A world-famous turquoise glacial lake framed by Victoria Glacier and the grand Fairmont Chateau.",
        visitTime: "3 Hours",
        cost: "Free (Parking CAD 21)",
        highlights: ["Red canoe paddling", "Agnes Lake Tea House hike", "Winter ice skating on lake"],
        rating: 4.95
      },
      {
        id: "moraine-lake",
        name: "Moraine Lake & Valley of Ten Peaks",
        category: "Alpine Lake",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        description: "An intensely blue lake set in the Valley of the Ten Peaks, widely regarded as one of Canada's most breathtaking spots.",
        visitTime: "2-3 Hours",
        cost: "Shuttle booking",
        highlights: ["Rockpile viewpoint", "Ten Peaks mirror reflection", "Golden larch valley trail"],
        rating: 4.98
      },
      {
        id: "banff-gondola",
        name: "Banff Gondola & Sulphur Mountain",
        category: "Mountain Ridge",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
        description: "A scenic 8-minute cable car ride ascending Sulphur Mountain for 360-degree views of six mountain ranges.",
        visitTime: "2 Hours",
        cost: "CAD 60",
        highlights: ["360 degree boardwalk", "Rooftop observation deck", "Sky Bistro dining"],
        rating: 4.8
      }
    ]
  },
  {
    id: "reykjavik",
    name: "Reykjavik & Golden Circle",
    country: "Iceland",
    continent: "Europe",
    category: "Nature",
    tagline: "Land of Fire and Ice: Waterfalls, Geysers and Northern Lights",
    description: "Iceland's capital serves as the gateway to cascading roaring waterfalls, active geothermal geysers, black sand beaches, volcanic craters, and ethereal Aurora Borealis night skies.",
    lat: 64.1466,
    lon: -21.9426,
    rating: 4.92,
    reviewsCount: 1980,
    priceLevel: "$$$$",
    bestTimeToVisit: "Sept to March (Aurora) & June to Aug (Midnight Sun)",
    currency: "ISK (kr)",
    language: "Icelandic / English",
    avgCostPerDay: "$220 - $400",
    coverImage: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1489447068241-b3490214e879?auto=format&fit=crop&w=1200&q=80"
    ],
    famousPlaces: [
      {
        id: "blue-lagoon",
        name: "Blue Lagoon Geothermal Spa",
        category: "Hot Spring & Wellness",
        image: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=800&q=80",
        description: "Milky-blue mineral-rich geothermal waters set in a volcanic black lava field near Reykjavik.",
        visitTime: "3 Hours",
        cost: "ISK 9,900",
        highlights: ["Silica mud face mask", "In-water bar", "Geothermal steam bath"],
        rating: 4.8
      },
      {
        id: "gullfoss-waterfall",
        name: "Gullfoss & Geysir Geothermal Park",
        category: "Waterfall & Geyser",
        image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80",
        description: "The roaring Golden Falls cascading into a rugged canyon alongside the Strokkur erupting hot spring geyser.",
        visitTime: "2-3 Hours",
        cost: "Free",
        highlights: ["Strokkur geyser eruption every 8 mins", "Double-step waterfall drop", "Canyon mist rainbows"],
        rating: 4.9
      }
    ]
  }
];

export const CATEGORIES = ["All", "City", "Beach", "Cultural", "Historic", "Nature"];
