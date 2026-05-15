import {
  BadgeHelp,
  BedDouble,
  CalendarDays,
  Camera,
  Car,
  Coffee,
  ExternalLink,
  FerrisWheel,
  MapPinned,
  Plane,
  Soup,
  Utensils
} from "lucide-react";

export type TripDay = {
  id: string;
  date: string;
  shortDate: string;
  weekday: string;
  location: string;
  stay?: string;
  transport?: string[];
  plans: string[];
  comments?: string[];
  food?: string[];
  tags: string[];
  status?: "booked" | "needs-plan" | "travel-heavy" | "open";
};

export type Stay = {
  id: string;
  location: string;
  dates: string;
  name: string;
  url: string;
  status: "booked" | "hold" | "planned";
  note?: string;
  images: string[];
};

export type HypeMoment = {
  title: string;
  place: string;
  date: string;
  image: string;
  why: string;
  moves: string[];
  prompt: string;
};

export type MustGoSpot = {
  title: string;
  area: string;
  kind: string;
  vibe: string;
  why: string;
  bestFor: string;
  image: string;
  source?: string;
};

export type FoodQuest = {
  dish: string;
  area: string;
  why: string;
  image: string;
  target?: string;
};

export type RouteStop = {
  number: number;
  name: string;
  date: string;
  coordinates: [number, number];
  note: string;
};

export type RouteLeg = {
  from: number;
  to: number;
  mode: "drive" | "ferry";
};

export const tripDays: TripDay[] = [
  {
    id: "may-15",
    date: "May 15, 2026",
    shortDate: "5/15",
    weekday: "Fri",
    location: "Travel day",
    transport: ["OS36: JFK 21:45 -> VIE 11:55", "OS753: VIE 15:30 -> TIR 17:00"],
    plans: ["Overnight flight to Tirana via Vienna."],
    tags: ["Flight", "JFK", "Vienna"],
    status: "travel-heavy"
  },
  {
    id: "may-16",
    date: "May 16, 2026",
    shortDate: "5/16",
    weekday: "Sat",
    location: "Tirana",
    stay: "Si Hotel / Garden Boutique",
    plans: ["Dinner reserved for 8:00 PM at Artigiano Restaurant", "Grocery run"],
    comments: ["Try gliko, a sweet preserved fruit, and lakror, a savory pie."],
    food: ["Artigiano Restaurant", "Gliko", "Lakror"],
    tags: ["Arrival", "Dinner", "Supplies"],
    status: "booked"
  },
  {
    id: "may-17",
    date: "May 17, 2026",
    shortDate: "5/17",
    weekday: "Sun",
    location: "Theth",
    stay: "Thethi Hotel",
    transport: ["09:00 drive to Theth, roughly 4 hours"],
    plans: [
      "Theth Church",
      "Lock-in Tower / Reconciliation Tower",
      "14:00 hike to Grunas Waterfall, roughly 2.5 hours",
      "Theth valley viewpoint",
      "Ask the hotel about a simple home-style dinner before arrival"
    ],
    comments: [
      "Food options are limited in Theth. Plan snacks and grocery supplies before arrival.",
      "For Grunas Waterfall, start from Theth village and park near the church, central Theth, or the national park area."
    ],
    food: ["Fli"],
    tags: ["Mountain", "Hike", "Waterfall"],
    status: "travel-heavy"
  },
  {
    id: "may-18",
    date: "May 18, 2026",
    shortDate: "5/18",
    weekday: "Mon",
    location: "Berat",
    stay: "Villa Palma",
    transport: ["09:00 drive toward Shkoder, then continue to Berat"],
    plans: [
      "Rozafa Castle in Shkoder",
      "Lunch option in Shkoder: OPA Shkoder",
      "Berat Castle",
      "Explore Mangalem, old town, and Gorica Bridge at sunset",
      "Berat View Point",
      "Nightcap: Tradita e Beratit, message sent"
    ],
    comments: [
      "Shkoder lunch options: Kuzin Restaurant for pasta/pizza or OPA for Mediterranean.",
      "Berat ideas: Proper Pizza Berat and Bibo Bar."
    ],
    food: ["OPA Shkoder", "Tradita e Beratit", "Proper Pizza Berat", "Bibo Bar"],
    tags: ["Castle", "Old Town", "Sunset"],
    status: "travel-heavy"
  },
  {
    id: "may-19",
    date: "May 19, 2026",
    shortDate: "5/19",
    weekday: "Tue",
    location: "Dhermi",
    stay: "South Villas and Suites",
    transport: ["Drive to Dhermi, roughly 2.5 hours"],
    plans: [
      "Morning swim",
      "Coffee and crepes at Shtepia e Kafes Gimi",
      "Coastal drive to Dhermi",
      "Scope Drymades / Dhermi beach for the next day"
    ],
    tags: ["Coast", "Swim", "Road Trip"],
    status: "booked"
  },
  {
    id: "may-20",
    date: "May 20, 2026",
    shortDate: "5/20",
    weekday: "Wed",
    location: "Dhermi",
    stay: "South Villas and Suites",
    plans: [
      "Open beach day",
      "Shortlist: Gjipe Beach, Jale Beach, Drymades, or a Himare boat day",
      "Sunset dinner somewhere with a coast view"
    ],
    tags: ["Coast", "Open Day", "Beach"],
    status: "needs-plan"
  },
  {
    id: "may-21",
    date: "May 21, 2026",
    shortDate: "5/21",
    weekday: "Thu",
    location: "Sarande",
    stay: "Elar Hotel",
    plans: [
      "Ksamil beach time",
      "Decision route: Gjirokaster + Blue Eye, or Butrint + Ksamil",
      "Nightcap at Lekuresi Castle"
    ],
    comments: [
      "Gjirokaster food to try: oshaf, a custard dessert, and qifqi, egg rice balls.",
      "The Barrels Ms has winery views but notes say the food may not be worth it."
    ],
    food: ["Oshaf", "Qifqi", "Lekuresi Castle"],
    tags: ["Ksamil", "Castle", "Question"],
    status: "open"
  },
  {
    id: "may-22",
    date: "May 22, 2026",
    shortDate: "5/22",
    weekday: "Fri",
    location: "Sarande / Corfu",
    stay: "Elar Hotel",
    transport: ["Saranda Ferry Terminal", "Book Ionian Seaways tickets", "Blue City Bus to Corfu Old Town"],
    plans: ["Day trip to Corfu", "Liston Promenade", "Spianada Square"],
    comments: [
      "Bring passports for Corfu.",
      "Arrive at the ports one hour before departure for passport control.",
      "Corfu is one hour ahead of Albania."
    ],
    tags: ["Ferry", "Passport", "Greece"],
    status: "needs-plan"
  },
  {
    id: "may-23",
    date: "May 23, 2026",
    shortDate: "5/23",
    weekday: "Sat",
    location: "Tirana",
    stay: "Luxury Hotel By Gjyshi",
    plans: [
      "Drive up to Tirana",
      "Skanderbeg Square",
      "Grand Park of Tirana",
      "Pyramid of Tirana, consider sunset here",
      "Pazari i Ri",
      "Dajti Express",
      "My Spa Tirana, book in advance",
      "Fortress of Justinian for food and shops"
    ],
    tags: ["Capital", "Spa", "Last Night"],
    status: "needs-plan"
  },
  {
    id: "may-24",
    date: "May 24, 2026",
    shortDate: "5/24",
    weekday: "Sun",
    location: "Home",
    transport: ["LH1715: TIA 06:00 -> MUN 07:50", "LH410: MUN 12:10 -> JFK 15:00 / EWR 19:00"],
    plans: ["Fly home from Tirana."],
    tags: ["Flight", "Munich", "Home"],
    status: "travel-heavy"
  }
];

export const routeStops: RouteStop[] = [
  {
    number: 1,
    name: "Tirana",
    date: "May 16",
    coordinates: [41.3275, 19.8187],
    note: "Arrival, dinner, grocery run"
  },
  {
    number: 2,
    name: "Theth",
    date: "May 17",
    coordinates: [42.4046, 19.7681],
    note: "Church, Lock-in Tower, Grunas Waterfall"
  },
  {
    number: 3,
    name: "Berat",
    date: "May 18",
    coordinates: [40.7053, 19.9519],
    note: "Castle, Mangalem, Gorica Bridge"
  },
  {
    number: 4,
    name: "Dhermi",
    date: "May 19-20",
    coordinates: [40.151, 19.6416],
    note: "Riviera beach base"
  },
  {
    number: 5,
    name: "Sarande",
    date: "May 21-22",
    coordinates: [39.8746, 20.0071],
    note: "Ksamil, Lekuresi, Corfu ferry"
  },
  {
    number: 6,
    name: "Corfu",
    date: "May 22",
    coordinates: [39.6243, 19.9217],
    note: "Old Town day trip"
  },
  {
    number: 7,
    name: "Tirana",
    date: "May 23",
    coordinates: [41.3275, 19.8187],
    note: "Final night before flight home"
  }
];

export const routeLegs: RouteLeg[] = [
  { from: 1, to: 2, mode: "drive" },
  { from: 2, to: 3, mode: "drive" },
  { from: 3, to: 4, mode: "drive" },
  { from: 4, to: 5, mode: "drive" },
  { from: 5, to: 6, mode: "ferry" },
  { from: 5, to: 7, mode: "drive" }
];

export const stays: Stay[] = [
  {
    id: "si-hotel",
    location: "Tirana",
    dates: "Sat May 16",
    name: "SI Hotel",
    url: "https://sihotel.al/",
    status: "booked",
    note: "Arrival night in Tirana.",
    images: [
      "https://sihotel.al/wp-content/uploads/2021/06/DJI_20250714185328_0048_D.webp",
      "https://sihotel.al/wp-content/uploads/2021/06/DJI_20250714185404_0050_D-2.webp",
      "https://sihotel.al/wp-content/uploads/2021/06/050A5590-scaled.webp"
    ]
  },
  {
    id: "hotel-thethi",
    location: "Theth",
    dates: "Sun May 17",
    name: "Hotel Thethi",
    url: "https://hotelthethi.al/",
    status: "booked",
    note: "Mountain night. Confirm dinner before arrival.",
    images: [
      "https://hotelthethi.al/wp-content/uploads/2025/03/440118316.jpg",
      "https://hotelthethi.al/wp-content/uploads/2025/03/440118214.jpg",
      "https://hotelthethi.al/wp-content/uploads/2025/03/440118256.jpg"
    ]
  },
  {
    id: "villa-palma",
    location: "Berat",
    dates: "Mon May 18",
    name: "Villa Palma",
    url: "https://www.google.com.ng/travel/hotels/entity/CiUIuYKyjoGCkLiBARCH1OqW7Lfbj_kBGg0vZy8xMW45Y2J0azRqEAI",
    status: "booked",
    note: "Berat base for castle, Mangalem, and Gorica Bridge.",
    images: [
      "https://villavilapalmaberat.al-hotels.net/data/Photos/OriginalPhoto/17654/1765460/1765460082/photo-vila-palma-berat-1.JPEG",
      "https://villavilapalmaberat.al-hotels.net/data/Photos/OriginalPhoto/17654/1765460/1765460091/photo-vila-palma-berat-2.JPEG",
      "https://villavilapalmaberat.al-hotels.net/data/Photos/OriginalPhoto/17654/1765460/1765460095/photo-vila-palma-berat-3.JPEG"
    ]
  },
  {
    id: "south-villas",
    location: "Dhermi",
    dates: "Tue May 19 - Wed May 20",
    name: "South Villas and Suites",
    url: "https://www.booking.com/hotel/al/south-villas-and-suites.en-gb.html",
    status: "booked",
    note: "Riviera base near Dhermi Beach.",
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/819861814.jpg?k=3cba7478c615b4d915c490bb4b5a15c60af92a5ffb45eeaa52f5a5e20fcd7bca&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/691702051.jpg?k=33f3f81146fe69de4c4f7a8c37e93b4d01b44ce8a48b9151777e9152153b94f1&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/691578214.jpg?k=d67c12158ff6771e7fc8d2afbd3ed815bd7b50df6fedf443d652eb6c9f8e3ebd&o="
    ]
  },
  {
    id: "elar-hotel",
    location: "Sarande",
    dates: "Thu May 21 - Fri May 22",
    name: "Elar Hotel",
    url: "https://www.booking.com/hotel/al/elar.html",
    status: "booked",
    note: "Sarande base for Ksamil, Lekuresi, and Corfu ferry.",
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/694530980.jpg?k=e59c1072811dd4503dbcf8a78699aed7a1af5346c876c92b3ee80ece6f40f86c&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/694531001.jpg?k=449111a48ddce3a2fca5098cbed3b90889f318e8ebca6677ead4298f34147f1b&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/694530591.jpg?k=3cb62797d76b86bad3f3b2621bb357d33a8214b09876a40a004e100940e9c5aa&o="
    ]
  },
  {
    id: "luxury-gjyshi",
    location: "Tirana / Rinas",
    dates: "Sat May 23",
    name: "Luxury Hotel By Gjyshi",
    url: "https://www.booking.com/hotel/al/luxury-by-gjyshi-rinas-kruje-district1.html",
    status: "hold",
    note: "Booked as a cancelable airport sleep before the early flight. Two twins and a king; fine for a short night.",
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/667412716.jpg?k=432b0cde46532b10bccc34939c49b0f2c978659c6f1cbfee4bbf8de5a9fc2237&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/681417146.jpg?k=bed03be1742f6f2d0950d0acdf4029b94970e83f6f5bdae529ac1f45a7515115&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/669570204.jpg?k=4da1eff2c3e42f72e781edf662b61ef170f3c416ec62478ec54483fdcc7554bc&o="
    ]
  }
];

export const topQuestions = [
  "May 21: Butrint + Ksamil or Gjirokaster + Blue Eye?",
  "May 20: Gjipe, Jale, Drymades, or a Himare boat day?",
  "Corfu ferry: pick departure and return times.",
  "Theth: confirm dinner with Hotel Thethi.",
  "Tirana: decide final-night spa or dinner plan."
];

export const hypeMoments: HypeMoment[] = [
  {
    title: "Theth Mountain Day",
    place: "Theth",
    date: "Sun May 17",
    image: "https://images.unsplash.com/photo-1748969754689-9ec366e3538d?fm=jpg&ixlib=rb-4.1.0&q=80&w=1200",
    why: "Stone towers, mountain air, Grunas Waterfall, and the valley viewpoint after a long drive north.",
    moves: ["Pack car snacks", "Waterfall shoes", "Golden-hour viewpoint"],
    prompt: "Good day to keep the schedule simple: drive, walk, waterfall, dinner through the hotel if possible."
  },
  {
    title: "Berat Sunset",
    place: "Berat",
    date: "Mon May 18",
    image: "https://images.unsplash.com/photo-1687294086979-5165561abdf2?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200",
    why: "Castle walk, Mangalem, Gorica Bridge, and a slower old-town evening after a heavy travel day.",
    moves: ["Castle walk", "Gorica Bridge", "Wine or nightcap"],
    prompt: "Best if sunset gets priority and dinner stays nearby."
  },
  {
    title: "Riviera Beach Day",
    place: "Dhermi / Himare",
    date: "Tue-Wed May 19-20",
    image: "https://images.unsplash.com/photo-1698603616407-1355fe0054d5?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200",
    why: "Turquoise water, cliff roads, long lunches, and a real choice between Gjipe, Jale, Drymades, or Himare.",
    moves: ["Gjipe or Jale", "Beach club backup", "Sunset coast drive"],
    prompt: "This is the day to pick a group mood: adventure beach, easy beach club, or boat day."
  },
  {
    title: "Corfu Ferry Day",
    place: "Sarande to Corfu",
    date: "Fri May 22",
    image: "https://images.unsplash.com/photo-1755378023094-5b5bb385eed4?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200",
    why: "Passport day trip: ferry over, wander Corfu Old Town, eat something Greek, and track the one-hour time change.",
    moves: ["Passport check", "Port one hour early", "Old Town lunch"],
    prompt: "Needs the most logistics, but it is also the funniest story if the timing is locked in early."
  }
];

export const mustGoSpots: MustGoSpot[] = [
  {
    title: "Grunas Waterfall",
    area: "Theth",
    kind: "Hike",
    vibe: "Mountain reset",
    why: "A manageable waterfall hike that pairs well with Theth Church and the Lock-in Tower.",
    bestFor: "The first big nature payoff",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Grunas%20Waterfall%20Theth.jpg?width=1200"
  },
  {
    title: "Gorica Bridge at Golden Hour",
    area: "Berat",
    kind: "View",
    vibe: "Postcard Albania",
    why: "Forum and guide consensus keeps pointing back to the bridge, Mangalem, and sunset light as the Berat moment.",
    bestFor: "Group photos before dinner",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Gorica%20bridge%20Berat%20Albania%202018.1.jpg?width=1200"
  },
  {
    title: "Gjipe Beach",
    area: "Dhermi / Himare",
    kind: "Beach",
    vibe: "Adventure cove",
    why: "Frequently recommended as the hidden-canyon beach; expect a hike down or boat access depending on conditions.",
    bestFor: "The most memorable beach day",
    image: "https://images.unsplash.com/photo-1698603616407-1355fe0054d5?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200"
  },
  {
    title: "Jale or Drymades",
    area: "Riviera",
    kind: "Beach",
    vibe: "Social but scenic",
    why: "Good candidates if the group wants less effort than Gjipe but still wants classic Riviera water.",
    bestFor: "Easy beach club day",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Jala%20Beach%20Vlora%20Albania.jpg?width=1200"
  },
  {
    title: "Butrint",
    area: "Near Ksamil",
    kind: "UNESCO",
    vibe: "Ancient city in nature",
    why: "Official tourism calls out Greek, Roman, Byzantine, and Venetian layers in a landscape tied to Lake Butrint and the Vivari Channel.",
    bestFor: "Culture without giving up the coast",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Butrint%20theatre.jpg?width=1200"
  },
  {
    title: "Gjirokaster Old Town",
    area: "Sarande day trip",
    kind: "UNESCO",
    vibe: "Stone city",
    why: "If the group wants the stronger culture day, pair the bazaar and castle with qifqi and oshaf.",
    bestFor: "Food + history day",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Gjirokaster%20old%20town.jpg?width=1200"
  },
  {
    title: "Lekuresi Castle",
    area: "Sarande",
    kind: "Sunset",
    vibe: "Big-view nightcap",
    why: "Repeatedly recommended for Sarande views; better as a sunset drink or nightcap than the whole dinner plan.",
    bestFor: "Ending the Sarande day",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/L%C3%ABkur%C3%ABsi_Castle%2C_Saranda%2C_Albania_2015-09-25_01.jpg/1280px-L%C3%ABkur%C3%ABsi_Castle%2C_Saranda%2C_Albania_2015-09-25_01.jpg"
  },
  {
    title: "Pazari i Ri + Blloku",
    area: "Tirana",
    kind: "Food / bars",
    vibe: "Capital energy",
    why: "Tirana recommendations cluster around the New Bazaar for food and Blloku for cafes, cocktails, and late-night wandering.",
    bestFor: "Final-night city mode",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/New%20Bazaar%20(Pazari%20i%20Ri)%2C%20Tirana%2C%20Albania.jpg?width=1200"
  }
];

export const foodQuest: FoodQuest[] = [
  {
    dish: "Spinach or cheese byrek",
    area: "Tirana / road snacks",
    why: "Savory pie energy. Perfect vegetarian car snack before the long mountain and coast drives.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Byrek_me_spinaq.jpg"
  },
  {
    dish: "Fli",
    area: "Theth",
    why: "A northern-style layered pancake dish to ask for through the hotel or guesthouse.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Albainan_Pancake_Dish_20240324_092020.jpg/960px-Albainan_Pancake_Dish_20240324_092020.jpg",
    target: "Ask Thethi Hotel before arrival"
  },
  {
    dish: "Berat wine + vegetarian mezze",
    area: "Berat",
    why: "Berat is one of the best nights to slow down: castle, bridge, local wine, salads, cheese, grilled vegetables, and old-town food.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200",
    target: "Tradita e Beratit / Gorica area"
  },
  {
    dish: "Village salad + fries + cheese",
    area: "Sarande",
    why: "A reliable vegetarian coastal meal when the table wants something easy between beach time and sunset drinks.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200",
    target: "Look for non-promenade tavernas or Lekuresi views"
  },
  {
    dish: "Qifqi",
    area: "Gjirokaster",
    why: "Vegetarian rice balls associated with Gjirokaster, usually seasoned with herbs and cooked in a special pan.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200"
  },
  {
    dish: "Oshaf",
    area: "Gjirokaster",
    why: "A local vegetarian dessert made with dried figs and sheep milk. This is the food fact everyone will remember.",
    image: "https://images.unsplash.com/photo-1541781550486-81b7a2328578?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200"
  },
  {
    dish: "Raki tasting",
    area: "Tirana",
    why: "Several local threads point visitors toward relaxed bars for raki and cocktails.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Raki_me_arra.jpg",
    target: "Komiteti, Radio Bar, Hemingway, Nouvelle Vague"
  }
];

export const funFacts = [
  "Berat and Gjirokaster are paired UNESCO historic centres, both known for preserved Ottoman-era urban architecture.",
  "Butrint is both a UNESCO World Heritage Site and a national park, so the ruins sit inside a protected natural landscape.",
  "Dhermi is built above the Ionian coast on the slope of the Ceraunian Mountains; the beach area below is the polished Riviera scene.",
  "Corfu is one hour ahead of Albania, which matters for ferry tickets, lunch timing, and return plans.",
  "Theth's Lock-in Tower is tied to the Kanun, Albania's traditional customary law, and the history of mountain blood-feud protection."
];

export const sourceLinks = [
  { label: "Official Albania Tourism: Butrint", url: "https://akt.gov.al/en/site-arkeologjike/butrint/" },
  { label: "Official Albania Tourism: Riviera route", url: "https://akt.gov.al/en/itineraries/trip-to-visit-the-beautiful-Albanian-Riviera/" },
  { label: "Official Albania Tourism: Gjirokastra", url: "https://www.akt.gov.al/en/top-destinations/gjirokastra/" },
  { label: "UNESCO: Berat and Gjirokastra", url: "https://whc.unesco.org/en/list/569/" },
  { label: "Ionian Seaways timetable", url: "https://www.ferries.gr/en/ferry-companies/ionian-seaways/route/corfu-saranda/" },
  { label: "Reddit / travel forum scan", url: "https://www.reddit.com/r/travel/search/?q=Albania%20Dhermi%20Himare%20Sarande%20Ksamil" }
];

export const spotBacklog = [
  "Book Corfu ferry once the exact May 22 timetable is confirmed.",
  "Pick the May 21 route: Gjirokaster + Blue Eye, or Butrint + Ksamil.",
  "Choose the May 20 beach mode: Gjipe adventure, Jale/Drymades beach club, or Himare boat day.",
  "Message Thethi Hotel about dinner and whether fli is possible.",
  "Reserve Tirana final-night dinner or a raki/cocktail bar crawl."
];

export const statCards = [
  { label: "Trip Window", value: "May 15-24", icon: CalendarDays },
  { label: "Trip Previews", value: String(hypeMoments.length), icon: MapPinned },
  { label: "Food Targets", value: String(foodQuest.length), icon: BedDouble },
  { label: "Open Decisions", value: String(topQuestions.length), icon: BadgeHelp }
];

export const quickLinks = [
  { label: "Flights", icon: Plane },
  { label: "Drives", icon: Car },
  { label: "Food", icon: Utensils },
  { label: "Coffee", icon: Coffee },
  { label: "Views", icon: Camera },
  { label: "Ferries", icon: FerrisWheel },
  { label: "Facts", icon: Soup },
  { label: "Links", icon: ExternalLink }
];

export const heroImages = [
  {
    location: "Theth",
    url: "https://images.unsplash.com/photo-1748969754689-9ec366e3538d?fm=jpg&ixlib=rb-4.1.0&q=80&w=1600"
  },
  {
    location: "Berat",
    url: "https://images.unsplash.com/photo-1687294086979-5165561abdf2?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600"
  },
  {
    location: "Coast",
    url: "https://images.unsplash.com/photo-1698603616407-1355fe0054d5?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600"
  }
];

// Albanian phrases organized by category
export const albanianPhrases = [
  {
    category: "Essentials",
    phrases: [
      { albanian: "Tungjatjeta", english: "Hello", pronunciation: "toon-ya-tyet-uh" },
      { albanian: "Mirëmëngjes", english: "Good morning", pronunciation: "meer-meng-yes" },
      { albanian: "Mirëdita", english: "Good day", pronunciation: "meer-dee-tuh" },
      { albanian: "Faleminderit", english: "Thank you", pronunciation: "fah-leh-min-deh-reet" },
      { albanian: "Po", english: "Yes", pronunciation: "poh" },
      { albanian: "Jo", english: "No", pronunciation: "yoh" },
      { albanian: "Më falni", english: "Excuse me", pronunciation: "muh fahl-nee" }
    ]
  },
  {
    category: "For Food",
    phrases: [
      { albanian: "Një tavolinë për dy", english: "A table for two", pronunciation: "nyuh tah-vo-lee-nuh purr dee" },
      { albanian: "Dua ...", english: "I want ...", pronunciation: "doo-ah" },
      { albanian: "Sa kushton?", english: "How much?", pronunciation: "sah koosh-ton" },
      { albanian: "Ujë", english: "Water", pronunciation: "oo-yuh" },
      { albanian: "Bukë", english: "Bread", pronunciation: "book" },
      { albanian: "Kafe", english: "Coffee", pronunciation: "kah-feh" }
    ]
  },
  {
    category: "Getting Around",
    phrases: [
      { albanian: "Ku është...?", english: "Where is...?", pronunciation: "koo uh-shuh" },
      { albanian: "Majtas", english: "Turn left", pronunciation: "mah-lee-tahs" },
      { albanian: "Djathtas", english: "Turn right", pronunciation: "jaht-tahs" },
      { albanian: "Drejt", english: "Straight ahead", pronunciation: "dreht" }
    ]
  },
  {
    category: "Fun",
    phrases: [
      { albanian: "Për shëndet!", english: "Cheers! (to health)", pronunciation: "pur shuhn-det" },
      { albanian: "Shqiptarë", english: "Sons of Eagles", pronunciation: "shchip-tar-uh", note: "What Albanians call themselves!" },
      { albanian: "S'ka faj", english: "No problem", pronunciation: "skah fyah" }
    ]
  }
];

// Cultural context cards
export const culturalFacts = [
  {
    title: "Besa: Word of Honor",
    icon: "Shield",
    emoji: "🛡️",
    text: "Besa is an ancient code requiring Albanians to protect guests at all costs. During WWII, Albanians sheltered 2,000+ Jewish refugees because of this tradition.",
    context: "You'll experience this hospitality firsthand!"
  },
  {
    title: "City of 1,000 Windows",
    icon: "House",
    emoji: "🏘️",
    text: "Berat's nickname comes from its stacked Ottoman houses with hundreds of windows facing the river — one of Albania's most photographed views.",
    context: "Best viewed at golden hour (May 18!)"
  },
  {
    title: "Coffee Culture",
    icon: "Coffee",
    emoji: "☕",
    text: "Albania has one of the world's highest cafe densities. 'Shkojmë për një kafe' (let's go for coffee) means spending hours together — it's about community, not caffeine.",
    context: "Tirana has the most intense coffee culture"
  },
  {
    title: "The Bunkers",
    icon: "CircleDot",
    emoji: "🔵",
    text: "Dictator Enver Hoxha built 173,000+ concrete bunkers across Albania fearing invasion. Now they're hostels, art galleries, and pizza ovens.",
    context: "You'll spot them along every road!"
  },
  {
    title: "Pyramid of Tirana",
    icon: "Triangle",
    emoji: "🔺",
    text: "Originally built as a mausoleum for dictator Enver Hoxha, it's now a tech/arts center where kids sled down its slopes. Symbol of Albania's transformation.",
    context: "On your May 23 itinerary — climb it for sunset!"
  },
  {
    title: "Illyrian Heritage",
    icon: "BookOpen",
    emoji: "📜",
    text: "Albanians are descendants of Illyrians — one of Europe's oldest continuous cultures. Their language and traditions predate the Romans.",
    context: "You're walking paths that are 2,000+ years old"
  }
];

// Money info and typical costs
export const moneyInfo = {
  currency: {
    name: "Albanian Lek",
    code: "ALL",
    symbol: "L",
    usdRate: 0.011 // approximate: 1 LEK ≈ $0.011 USD (or 1 USD ≈ 91 LEK)
  },
  tips: [
    "Cash is king — especially in mountains (Theth) and small guesthouses",
    "Tirana and Sarande are more card-friendly",
    "Tip 10% in lek, not euro",
    "ATMs widely available in cities"
  ],
  typicalCosts: [
    { item: "Local meal (byrek + drink)", lek: 300, category: "food" },
    { item: "Restaurant dinner with drink", lek: 1500, category: "food" },
    { item: "Coffee at a cafe", lek: 150, category: "food" },
    { item: "Beer at a bar", lek: 300, category: "food" },
    { item: "Raki at tavern", lek: 250, category: "food" },
    { item: "Bottle of water", lek: 100, category: "food" },
    { item: "Furgon (bus) ride", lek: 500, category: "transport" },
    { item: "Blue Eye entrance", lek: 200, category: "activity" },
    { item: "Butrint entrance", lek: 700, category: "activity" }
  ]
};

// Travel tips and cautions
export const travelTips = [
  {
    category: "Money & Payments",
    icon: "DollarSign",
    emoji: "💰",
    tips: [
      "Exchange money at banks or authorized exchanges (avoid street offers)",
      "Keep small bills — vendors often don't have change for 5000 LEK notes",
      "ATMs accept Visa/Mastercard but can run out of cash in small towns",
      "Euro is sometimes accepted but you'll get worse rates"
    ],
    warning: false
  },
  {
    category: "Road Safety",
    icon: "Car",
    emoji: "🚗",
    tips: [
      "Mountain roads (Theth, Berat) are narrow and winding but paved",
      "Headlight use is required 24/7 while driving in Albania",
      "Watch for livestock on rural roads (goats, cows, sheep)",
      "Parking in Tirana can be chaotic — use hotel parking when available"
    ],
    warning: true
  },
  {
    category: "Cultural Etiquette",
    icon: "Users",
    emoji: "🤝",
    tips: [
      "Remove shoes when entering Albanian homes (hosts offer slippers)",
      "Dress modestly in northern mountain villages (Theth)",
      "Accept offered refreshments — it's considered rude to decline",
      "Eye contact during toasts ('Për shëndet!') is important"
    ],
    warning: false
  },
  {
    category: "Head Nodding Quirk",
    icon: "AlertCircle",
    emoji: "⚠️",
    tips: [
      "In some regions, nodding UP means NO, and DOWN means YES",
      "This is opposite of Western convention — double-check verbally!",
      "When in doubt, use 'Po' (yes) or 'Jo' (no) to avoid confusion",
      "Locals will understand if you seem confused — just be explicit"
    ],
    warning: true
  },
  {
    category: "Beach & Water Safety",
    icon: "Waves",
    emoji: "🌊",
    tips: [
      "Gjipe Beach requires a 20-30 min hike — bring water and proper shoes",
      "Sea urchins common near rocky shores — water shoes recommended",
      "Jellyfish rare but possible in late spring (May is generally safe)",
      "Lifeguards not common — swim at your own risk in most places"
    ],
    warning: false
  },
  {
    category: "Ferry Tips (Corfu)",
    icon: "Anchor",
    emoji: "⛴️",
    tips: [
      "Arrive 1 hour before departure for passport control",
      "Bring physical passports (photos not accepted)",
      "Corfu is 1 hour ahead of Albania — remember to adjust your watch!",
      "Seas can be rough — bring motion sickness pills if needed",
      "Book tickets in advance for May 22 (peak season starts)"
    ],
    warning: true
  },
  {
    category: "Health & Wellness",
    icon: "Heart",
    emoji: "⚕️",
    tips: [
      "Tap water not recommended for drinking in most areas",
      "Pharmacies widely available — basic meds inexpensive",
      "Sunscreen expensive — bring from home if needed",
      "No special vaccinations required for Albania",
      "Travel insurance recommended (standard for Europe)"
    ],
    warning: false
  },
  {
    category: "Connectivity",
    icon: "Wifi",
    emoji: "📶",
    tips: [
      "Buy local SIM (Vodafone or One) at airport for €15-20 with data",
      "WiFi common in hotels/cafes but can be slow",
      "Download offline Google Maps for mountain areas",
      "WhatsApp widely used for restaurant bookings"
    ],
    warning: false
  }
];
