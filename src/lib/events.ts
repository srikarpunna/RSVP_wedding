export type CeremonyEvent = {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  vibe: string;
  dressCode: string;
  palette: string[];
  visualPrompt: string;
  image: string;
};

export const ceremonies: CeremonyEvent[] = [
  {
    id: "sangeet",
    name: "Sangeet",
    date: "Thursday, May 7, 2026",
    time: "6:00 PM",
    location: "Argyle, TX",
    description: "An evening of music, dance, and celebration to kick off the wedding festivities.",
    vibe: "Performance-night energy, jewel tones, stage lights, festive family performances.",
    dressCode: "Festive Lehengas, Sarees, Kurtas, or Indo-western Partywear.",
    palette: ["#4a0e4e", "#8b1c31", "#eab308"], // deep plum, maroon, marigold gold
    visualPrompt: "Elegant modern South Indian Telugu wedding Sangeet background, jewel-tone dance floor, marigold accents, soft stage lights, no people, luxury invitation style.",
    image: "/sangeet-bg.png",
  },
  {
    id: "haldi",
    name: "Haldi Ceremony",
    date: "Friday, May 8, 2026",
    time: "10:30 AM",
    location: "Argyle, TX",
    description: "A joyful and playful ritual where turmeric paste is applied to bless the couple.",
    vibe: "Bright turmeric yellow palette, marigolds, playful candid energy, sunny daytime.",
    dressCode: "Lightweight Yellow/Orange/Green Outfits. Floral jewelry recommended.",
    palette: ["#fef08a", "#fbbf24", "#f97316"], // sunny yellow, marigold, orange
    visualPrompt: "Bright Haldi ceremony background, turmeric yellow and marigold flowers, South Indian wedding decor, sunny, playful, elegant, no people.",
    image: "/haldi-bg.png",
  },
  {
    id: "bride_ceremony",
    name: "Bride Ceremony (Pellikuthuru)",
    date: "Friday, May 8, 2026",
    time: "5:00 PM",
    location: "Little Elm, TX",
    description: "An intimate Telugu tradition of adorning the bride with turmeric, oil, bangles, and blessings.",
    vibe: "Intimate bridal-prep feeling, turmeric/oil blessings, bangles, silk saree cues, soft gold, jasmine.",
    dressCode: "Traditional Sarees, Kurta Pajamas. Pastel or warm festive colors.",
    palette: ["#fefce8", "#d97706", "#22c55e"], // cream, golden amber, fresh jasmine green
    visualPrompt: "Telugu Pellikuthuru bride ceremony background, jasmine flowers, bangles, turmeric, silk fabric, soft gold, intimate family blessing mood, no people.",
    image: "/bride-ceremony-bg.png",
  },
  {
    id: "mehndi",
    name: "Mehndi Ceremony",
    date: "Saturday, May 9, 2026",
    time: "10:00 AM",
    location: "Little Elm, TX",
    description: "Relaxing afternoon applying intricate henna designs in a lounge-style festive setting.",
    vibe: "Henna green palette, relaxed lounge seating, floral backdrops, cushions, jhoola/swing inspiration.",
    dressCode: "Breathable festive outfits, Shararas, Sarees, Kurtas in shades of green or teal.",
    palette: ["#166534", "#15803d", "#fde047"], // deep henna green, vibrant leaf green, yellow accent
    visualPrompt: "Mehndi ceremony background, henna green, floral jhoola, cushions, fairy lights, South Indian festive decor, elegant, no people.",
    image: "/mehndi-bg.png",
  },
  {
    id: "wedding",
    name: "The Wedding (Sumuhurtham)",
    date: "Sunday, May 10, 2026",
    time: "9:30 AM",
    location: "Aubrey, TX",
    description: "The sacred traditional wedding ceremony marking our union.",
    vibe: "Sacred mandapam mood, temple-inspired gold and red, Kanjeevaram silk cues, mango leaves, flowers.",
    dressCode: "Traditional Formal. Kanjeevaram Sarees, Dhotis, Kurtas, or elegant formal wear.",
    palette: ["#991b1b", "#b45309", "#1e40af"], // temple red, antique gold, deep silk blue
    visualPrompt: "Telugu Sumuhurtham wedding mandapam background, temple-inspired red and gold, mango leaves, fresh flowers, sacred warm light, elegant, no people.",
    image: "/wedding-bg.png",
  },
];