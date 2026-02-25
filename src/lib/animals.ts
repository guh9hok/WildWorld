export interface Animal {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  description: string;
  habitat: string;
  diet: string;
  lifespan: string;
  weight: string;
  length: string;
  conservationStatus: "Least Concern" | "Near Threatened" | "Vulnerable" | "Endangered" | "Critically Endangered" | "Extinct in the Wild" | "Extinct";
  imageUrl: string;
  videoId: string; // YouTube video ID
  funFacts: string[];
  locations: {
    name: string;
    lat: number;
    lng: number;
  }[];
  mapRegion: string;
  tags: string[];
}

export const animals: Animal[] = [
  {
    id: "african-elephant",
    name: "African Elephant",
    scientificName: "Loxodonta africana",
    category: "Mammal",
    description:
      "The African elephant is the world's largest land animal. These magnificent creatures are known for their intelligence, complex social structures, and remarkable memory. They live in matriarchal herds led by the oldest female and communicate through a variety of sounds, including infrasound too low for humans to hear.",
    habitat: "Savannas, forests, deserts, and marshes across sub-Saharan Africa",
    diet: "Herbivore — grasses, leaves, bark, fruit, and roots",
    lifespan: "60–70 years",
    weight: "4,000–7,000 kg",
    length: "5–7.5 m",
    conservationStatus: "Vulnerable",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/1280px-African_Bush_Elephant.jpg",
    videoId: "5mHlVMFBMEo",
    funFacts: [
      "Elephants can recognize themselves in mirrors — a sign of self-awareness.",
      "They mourn their dead and have been observed returning to the bones of deceased relatives.",
      "An elephant's trunk has over 40,000 muscles.",
      "They can drink up to 200 litres of water per day.",
    ],
    locations: [
      { name: "Serengeti, Tanzania", lat: -2.3333, lng: 34.8333 },
      { name: "Amboseli, Kenya", lat: -2.6527, lng: 37.2606 },
      { name: "Chobe, Botswana", lat: -18.0, lng: 24.5 },
      { name: "Kruger, South Africa", lat: -23.9884, lng: 31.5547 },
    ],
    mapRegion: "Sub-Saharan Africa",
    tags: ["large", "mammal", "africa", "endangered"],
  },
  {
    id: "blue-whale",
    name: "Blue Whale",
    scientificName: "Balaenoptera musculus",
    category: "Mammal",
    description:
      "The blue whale is the largest animal ever known to have existed on Earth. These ocean giants can reach lengths of up to 30 metres and weigh as much as 200 tonnes. Despite their enormous size, they feed almost exclusively on tiny shrimp-like creatures called krill, consuming up to 4 tonnes per day during feeding season.",
    habitat: "Open oceans worldwide, preferring deep offshore waters",
    diet: "Carnivore — almost exclusively krill",
    lifespan: "80–90 years",
    weight: "100,000–200,000 kg",
    length: "24–30 m",
    conservationStatus: "Endangered",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Anim1754_-_Flickr_-_NOAA_Photo_Library.jpg/1280px-Anim1754_-_Flickr_-_NOAA_Photo_Library.jpg",
    videoId: "BDJ8xyQjyhM",
    funFacts: [
      "A blue whale's heart is the size of a small car.",
      "Their calls can reach 188 decibels — louder than a jet engine.",
      "A blue whale calf gains about 90 kg per day from its mother's milk.",
      "They can swim at speeds of up to 50 km/h when threatened.",
    ],
    locations: [
      { name: "Gulf of St. Lawrence, Canada", lat: 48.5, lng: -62.0 },
      { name: "Sri Lanka", lat: 7.8731, lng: 80.7718 },
      { name: "California Coast, USA", lat: 36.7783, lng: -119.4179 },
      { name: "Antarctic Ocean", lat: -65.0, lng: 0.0 },
    ],
    mapRegion: "Global Oceans",
    tags: ["ocean", "mammal", "largest", "endangered"],
  },
  {
    id: "snow-leopard",
    name: "Snow Leopard",
    scientificName: "Panthera uncia",
    category: "Mammal",
    description:
      "The snow leopard is one of the world's most elusive big cats, perfectly adapted to life in the cold, rugged mountains of Central Asia. Their thick, spotted fur provides camouflage and insulation, while their large paws act as natural snowshoes. They are known as the 'ghost of the mountains' due to their secretive nature.",
    habitat: "Mountain ranges of Central Asia, including the Himalayas and Tibetan Plateau",
    diet: "Carnivore — blue sheep, ibex, deer, and smaller prey",
    lifespan: "10–12 years (wild), up to 21 years (captivity)",
    weight: "22–55 kg",
    length: "0.9–1.3 m (body)",
    conservationStatus: "Vulnerable",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/SnowLeopard_wikimedia.jpg/1280px-SnowLeopard_wikimedia.jpg",
    videoId: "7Gu1GHpq9_0",
    funFacts: [
      "Snow leopards cannot roar — they make a unique sound called a 'chuff'.",
      "Their tails are nearly as long as their bodies and help with balance.",
      "They can leap up to 15 metres horizontally.",
      "Snow leopards wrap their tails around themselves like a scarf in cold weather.",
    ],
    locations: [
      { name: "Himalayas, Nepal", lat: 28.3949, lng: 84.124 },
      { name: "Tibetan Plateau, China", lat: 33.0, lng: 90.0 },
      { name: "Altai Mountains, Mongolia", lat: 49.0, lng: 89.0 },
      { name: "Hindu Kush, Afghanistan", lat: 35.0, lng: 70.0 },
    ],
    mapRegion: "Central Asia",
    tags: ["cat", "mammal", "mountain", "endangered"],
  },
  {
    id: "great-white-shark",
    name: "Great White Shark",
    scientificName: "Carcharodon carcharias",
    category: "Fish",
    description:
      "The great white shark is the ocean's apex predator and the largest predatory fish on Earth. With rows of serrated teeth and an extraordinary sense of smell capable of detecting a single drop of blood in 100 litres of water, they are perfectly evolved hunters. Despite their fearsome reputation, attacks on humans are rare.",
    habitat: "Coastal and offshore waters in temperate and tropical oceans worldwide",
    diet: "Carnivore — fish, seals, sea lions, dolphins, and whale carcasses",
    lifespan: "70+ years",
    weight: "680–1,100 kg",
    length: "4–6 m",
    conservationStatus: "Vulnerable",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/White_shark.jpg/1280px-White_shark.jpg",
    videoId: "Wr_Ev0Oe5Ck",
    funFacts: [
      "Great whites can detect electromagnetic fields produced by other animals.",
      "They are warm-blooded, unlike most fish.",
      "Their teeth are replaced continuously throughout their lives.",
      "They can breach completely out of the water when hunting seals.",
    ],
    locations: [
      { name: "Gansbaai, South Africa", lat: -34.5833, lng: 19.35 },
      { name: "Farallon Islands, USA", lat: 37.7, lng: -123.0 },
      { name: "Neptune Islands, Australia", lat: -35.3, lng: 136.1 },
      { name: "Guadalupe Island, Mexico", lat: 29.0, lng: -118.3 },
    ],
    mapRegion: "Global Oceans",
    tags: ["shark", "fish", "ocean", "predator"],
  },
  {
    id: "giant-panda",
    name: "Giant Panda",
    scientificName: "Ailuropoda melanoleuca",
    category: "Mammal",
    description:
      "The giant panda is one of the world's most beloved and recognisable animals, known for its distinctive black and white colouring. Native to the mountain forests of central China, pandas spend up to 16 hours a day eating bamboo. Conservation efforts have helped bring this species back from the brink of extinction.",
    habitat: "Temperate broadleaf and mixed forests in the mountains of central China",
    diet: "Herbivore — 99% bamboo, occasionally small animals or carrion",
    lifespan: "15–20 years (wild), up to 30 years (captivity)",
    weight: "70–125 kg",
    length: "1.2–1.9 m",
    conservationStatus: "Vulnerable",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Grosser_Panda.JPG/1280px-Grosser_Panda.JPG",
    videoId: "FRk_3ekWBqY",
    funFacts: [
      "Pandas have a 'pseudo-thumb' — an enlarged wrist bone used to grip bamboo.",
      "A newborn panda is about the size of a stick of butter.",
      "Pandas spend 10–16 hours a day eating bamboo.",
      "They are excellent tree climbers and swimmers.",
    ],
    locations: [
      { name: "Sichuan Province, China", lat: 30.6171, lng: 102.7103 },
      { name: "Shaanxi Province, China", lat: 35.1917, lng: 108.8701 },
      { name: "Gansu Province, China", lat: 35.7452, lng: 104.9902 },
    ],
    mapRegion: "Central China",
    tags: ["bear", "mammal", "china", "endangered"],
  },
  {
    id: "komodo-dragon",
    name: "Komodo Dragon",
    scientificName: "Varanus komodoensis",
    category: "Reptile",
    description:
      "The Komodo dragon is the world's largest living lizard, found only on a handful of Indonesian islands. These ancient reptiles are formidable predators with serrated teeth, powerful claws, and a venomous bite that prevents blood clotting in their prey. They can detect carrion from up to 9.5 kilometres away using their forked tongues.",
    habitat: "Tropical savanna forests and grasslands on Indonesian islands",
    diet: "Carnivore — deer, pigs, water buffalo, and carrion",
    lifespan: "30 years",
    weight: "70–90 kg",
    length: "2–3 m",
    conservationStatus: "Endangered",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Komodo_dragon_%28Varanus_komodoensis%29_-_Rinca_Island.jpg/1280px-Komodo_dragon_%28Varanus_komodoensis%29_-_Rinca_Island.jpg",
    videoId: "Wr_Ev0Oe5Ck",
    funFacts: [
      "Komodo dragons can eat up to 80% of their body weight in a single meal.",
      "Female Komodos can reproduce without a male through parthenogenesis.",
      "They can run at speeds of up to 20 km/h.",
      "Their saliva contains over 50 strains of bacteria.",
    ],
    locations: [
      { name: "Komodo Island, Indonesia", lat: -8.55, lng: 119.45 },
      { name: "Rinca Island, Indonesia", lat: -8.67, lng: 119.7 },
      { name: "Flores Island, Indonesia", lat: -8.6574, lng: 121.0794 },
    ],
    mapRegion: "Indonesia",
    tags: ["reptile", "lizard", "indonesia", "endangered"],
  },
  {
    id: "emperor-penguin",
    name: "Emperor Penguin",
    scientificName: "Aptenodytes forsteri",
    category: "Bird",
    description:
      "The emperor penguin is the tallest and heaviest of all penguin species and is endemic to Antarctica. These remarkable birds endure the harshest conditions on Earth to breed during the Antarctic winter. Males incubate eggs on their feet for two months in temperatures as low as -60°C, huddling together for warmth while females hunt at sea.",
    habitat: "Antarctic sea ice and surrounding waters",
    diet: "Carnivore — fish, squid, and krill",
    lifespan: "15–20 years",
    weight: "22–45 kg",
    length: "1.1–1.3 m",
    conservationStatus: "Near Threatened",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/South_Pole_Telescope_and_penguins.jpg/1280px-South_Pole_Telescope_and_penguins.jpg",
    videoId: "9T1vfsHYiKY",
    funFacts: [
      "Emperor penguins can dive to depths of over 500 metres.",
      "They can hold their breath for up to 22 minutes.",
      "Chicks are born with grey fluffy down feathers.",
      "They huddle in groups of thousands to conserve heat.",
    ],
    locations: [
      { name: "Ross Ice Shelf, Antarctica", lat: -78.5, lng: 163.0 },
      { name: "Weddell Sea, Antarctica", lat: -72.0, lng: -40.0 },
      { name: "Cape Washington, Antarctica", lat: -74.6, lng: 165.4 },
    ],
    mapRegion: "Antarctica",
    tags: ["bird", "penguin", "antarctica", "cold"],
  },
  {
    id: "bengal-tiger",
    name: "Bengal Tiger",
    scientificName: "Panthera tigris tigris",
    category: "Mammal",
    description:
      "The Bengal tiger is the most numerous tiger subspecies and is found primarily in India. These powerful predators are solitary hunters that use their distinctive orange and black striped coats as camouflage in tall grasses and forests. Each tiger's stripe pattern is unique, like a human fingerprint. They are critically important to the ecosystems they inhabit.",
    habitat: "Tropical and subtropical moist broadleaf forests, grasslands, and mangroves",
    diet: "Carnivore — deer, wild boar, water buffalo, and other large mammals",
    lifespan: "8–10 years (wild), up to 20 years (captivity)",
    weight: "140–300 kg",
    length: "1.8–2.8 m",
    conservationStatus: "Endangered",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Tiger_in_Ranthambhore.jpg/1280px-Tiger_in_Ranthambhore.jpg",
    videoId: "T7aNSRoDCmg",
    funFacts: [
      "Tigers are the only big cats with striped fur.",
      "They are excellent swimmers and often cool off in pools and streams.",
      "A tiger's roar can be heard from 3 kilometres away.",
      "They can leap up to 10 metres in a single bound.",
    ],
    locations: [
      { name: "Sundarbans, Bangladesh/India", lat: 21.9497, lng: 89.1833 },
      { name: "Ranthambore, India", lat: 26.0173, lng: 76.5026 },
      { name: "Jim Corbett, India", lat: 29.5300, lng: 78.7747 },
      { name: "Chitwan, Nepal", lat: 27.5291, lng: 84.3542 },
    ],
    mapRegion: "South Asia",
    tags: ["cat", "mammal", "india", "endangered"],
  },
  {
    id: "poison-dart-frog",
    name: "Poison Dart Frog",
    scientificName: "Dendrobatidae",
    category: "Amphibian",
    description:
      "Poison dart frogs are among the most brightly coloured and toxic animals on Earth. Their vivid colours — ranging from brilliant blue to fiery red and yellow — serve as a warning to predators. Indigenous peoples of Central and South America have long used their toxins to poison the tips of blowgun darts, giving these frogs their common name.",
    habitat: "Tropical rainforests of Central and South America",
    diet: "Carnivore — ants, termites, beetles, and other small invertebrates",
    lifespan: "3–15 years",
    weight: "2–7 g",
    length: "1.5–6 cm",
    conservationStatus: "Least Concern",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Dendrobates_tinctorius_-_Boulanger%2C_1882.jpg/1280px-Dendrobates_tinctorius_-_Boulanger%2C_1882.jpg",
    videoId: "sMFNMFMFMFM",
    funFacts: [
      "Their toxins come from the insects they eat — captive frogs are not toxic.",
      "Some species carry their tadpoles on their backs to water sources.",
      "The golden poison frog is the most toxic vertebrate on Earth.",
      "Their bright colours are a form of aposematism — warning colouration.",
    ],
    locations: [
      { name: "Amazon Basin, Brazil", lat: -3.4653, lng: -62.2159 },
      { name: "Costa Rica", lat: 9.7489, lng: -83.7534 },
      { name: "Panama", lat: 8.538, lng: -80.7821 },
      { name: "Colombia", lat: 4.5709, lng: -74.2973 },
    ],
    mapRegion: "Central & South America",
    tags: ["frog", "amphibian", "rainforest", "toxic"],
  },
  {
    id: "arctic-wolf",
    name: "Arctic Wolf",
    scientificName: "Canis lupus arctos",
    category: "Mammal",
    description:
      "The Arctic wolf is a subspecies of grey wolf that has adapted to survive in one of the harshest environments on Earth. Their thick white fur provides both insulation and camouflage in the snow. Unlike other wolf subspecies, Arctic wolves are not threatened by hunting or habitat loss due to their remote habitat, and they are the only subspecies of wolf that is not endangered.",
    habitat: "Arctic tundra of North America and Greenland",
    diet: "Carnivore — musk oxen, Arctic hares, caribou, and lemmings",
    lifespan: "7–10 years (wild)",
    weight: "25–80 kg",
    length: "1–1.8 m",
    conservationStatus: "Least Concern",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Arctic_wolf_1.jpg/1280px-Arctic_wolf_1.jpg",
    videoId: "Wr_Ev0Oe5Ck",
    funFacts: [
      "Arctic wolves can survive temperatures as low as -30°C.",
      "They can go weeks without food between hunts.",
      "Their paws have special adaptations to walk on ice and snow.",
      "They live in packs of 2–20 individuals.",
    ],
    locations: [
      { name: "Ellesmere Island, Canada", lat: 79.0, lng: -80.0 },
      { name: "Greenland", lat: 71.7069, lng: -42.6043 },
      { name: "Northern Alaska, USA", lat: 68.0, lng: -153.0 },
    ],
    mapRegion: "Arctic",
    tags: ["wolf", "mammal", "arctic", "cold"],
  },
  {
    id: "humpback-whale",
    name: "Humpback Whale",
    scientificName: "Megaptera novaeangliae",
    category: "Mammal",
    description:
      "Humpback whales are famous for their spectacular acrobatic displays and complex, haunting songs. These ocean giants migrate up to 25,000 kilometres each year between their feeding grounds in polar waters and their breeding grounds in tropical seas. Their songs, sung only by males, can last for hours and evolve over time as whales learn new patterns from each other.",
    habitat: "All major oceans, from polar to tropical waters",
    diet: "Carnivore — krill, small fish, and crustaceans",
    lifespan: "45–100 years",
    weight: "25,000–40,000 kg",
    length: "12–16 m",
    conservationStatus: "Least Concern",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Humpback_Whale_underwater_shot.jpg/1280px-Humpback_Whale_underwater_shot.jpg",
    videoId: "9T1vfsHYiKY",
    funFacts: [
      "Humpback whale songs can travel thousands of kilometres underwater.",
      "They use a unique hunting technique called 'bubble net feeding'.",
      "Each whale's tail fluke pattern is unique, like a fingerprint.",
      "They can leap completely out of the water in a behaviour called breaching.",
    ],
    locations: [
      { name: "Alaska, USA", lat: 64.2008, lng: -153.4937 },
      { name: "Hawaii, USA", lat: 19.8968, lng: -155.5828 },
      { name: "Tonga", lat: -21.1789, lng: -175.1982 },
      { name: "Antarctica", lat: -75.0, lng: 0.0 },
    ],
    mapRegion: "Global Oceans",
    tags: ["whale", "mammal", "ocean", "singing"],
  },
  {
    id: "golden-eagle",
    name: "Golden Eagle",
    scientificName: "Aquila chrysaetos",
    category: "Bird",
    description:
      "The golden eagle is one of the most widely distributed and revered birds of prey in the Northern Hemisphere. With a wingspan of up to 2.3 metres and eyesight 4–8 times more powerful than a human's, they are supreme aerial hunters. They have been used in falconry for thousands of years and are national symbols of several countries.",
    habitat: "Mountains, hills, cliffs, and open country across the Northern Hemisphere",
    diet: "Carnivore — rabbits, hares, ground squirrels, and occasionally larger prey",
    lifespan: "30 years",
    weight: "3–6.5 kg",
    length: "0.66–1.02 m",
    conservationStatus: "Least Concern",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Golden_Eagle_in_flight_-_5.jpg/1280px-Golden_Eagle_in_flight_-_5.jpg",
    videoId: "Wr_Ev0Oe5Ck",
    funFacts: [
      "Golden eagles can dive at speeds of over 240 km/h.",
      "They mate for life and return to the same nest year after year.",
      "Their nests, called eyries, can weigh up to a tonne.",
      "They are the national bird of Mexico, Germany, Austria, and Albania.",
    ],
    locations: [
      { name: "Scottish Highlands, UK", lat: 57.0, lng: -4.0 },
      { name: "Rocky Mountains, USA", lat: 44.0, lng: -110.0 },
      { name: "Atlas Mountains, Morocco", lat: 31.0, lng: -5.0 },
      { name: "Himalayas, India", lat: 30.0, lng: 78.0 },
    ],
    mapRegion: "Northern Hemisphere",
    tags: ["bird", "eagle", "raptor", "predator"],
  },
];

export const categories = ["All", "Mammal", "Bird", "Fish", "Reptile", "Amphibian"];

export const conservationColors: Record<Animal["conservationStatus"], string> = {
  "Least Concern": "bg-green-100 text-green-800",
  "Near Threatened": "bg-lime-100 text-lime-800",
  "Vulnerable": "bg-yellow-100 text-yellow-800",
  "Endangered": "bg-orange-100 text-orange-800",
  "Critically Endangered": "bg-red-100 text-red-800",
  "Extinct in the Wild": "bg-purple-100 text-purple-800",
  "Extinct": "bg-gray-100 text-gray-800",
};
