export const products = [
  // === NATIONAL TEAMS ===
  {
    id: "bel-home-2024",
    category: "national",
    country: "Belgium",
    flag: "🇧🇪",
    type: "home",
    name: { nl: "België Thuisshirt 2024", fr: "Maillot Domicile Belgique 2024", en: "Belgium Home Shirt 2024" },
    description: {
      nl: "Het officiële thuisshirt van de Rode Duivels.",
      fr: "Le maillot officiel à domicile des Diables Rouges.",
      en: "The official home shirt of the Red Devils."
    },
    price: 89.99,
    colors: ["#CC0000", "#000000"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400&h=500&fit=crop",
    badge: "bestseller",
    stock: 42
  },
  {
    id: "bel-away-2024",
    category: "national",
    country: "Belgium",
    flag: "🇧🇪",
    type: "away",
    name: { nl: "België Uitshirt 2024", fr: "Maillot Extérieur Belgique 2024", en: "Belgium Away Shirt 2024" },
    description: {
      nl: "Het officiële uitshirt van de Rode Duivels.",
      fr: "Le maillot officiel à l'extérieur des Diables Rouges.",
      en: "The official away shirt of the Red Devils."
    },
    price: 84.99,
    colors: ["#000000", "#CC0000"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=500&fit=crop",
    badge: null,
    stock: 28
  },
  {
    id: "fra-home-2024",
    category: "national",
    country: "France",
    flag: "🇫🇷",
    type: "home",
    name: { nl: "Frankrijk Thuisshirt 2024", fr: "Maillot Domicile France 2024", en: "France Home Shirt 2024" },
    description: {
      nl: "Het iconische blauwe shirt van Les Bleus.",
      fr: "Le mythique maillot bleu des Bleus.",
      en: "The iconic blue shirt of Les Bleus."
    },
    price: 94.99,
    colors: ["#002395", "#FFFFFF"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=500&fit=crop",
    badge: "new",
    stock: 55
  },
  {
    id: "ned-home-2024",
    category: "national",
    country: "Netherlands",
    flag: "🇳🇱",
    type: "home",
    name: { nl: "Nederland Thuisshirt 2024", fr: "Maillot Domicile Pays-Bas 2024", en: "Netherlands Home Shirt 2024" },
    description: {
      nl: "Het oranje thuisshirt van het Nederlands elftal.",
      fr: "Le mythique maillot orange des Pays-Bas.",
      en: "The iconic orange home shirt of the Netherlands."
    },
    price: 89.99,
    colors: ["#FF6600", "#FFFFFF"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&h=500&fit=crop",
    badge: null,
    stock: 37
  },
  {
    id: "ger-home-2024",
    category: "national",
    country: "Germany",
    flag: "🇩🇪",
    type: "home",
    name: { nl: "Duitsland Thuisshirt 2024", fr: "Maillot Domicile Allemagne 2024", en: "Germany Home Shirt 2024" },
    description: {
      nl: "Het klassieke witte shirt van Die Mannschaft.",
      fr: "Le classique maillot blanc de Die Mannschaft.",
      en: "The classic white shirt of Die Mannschaft."
    },
    price: 89.99,
    colors: ["#FFFFFF", "#000000"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=500&fit=crop",
    badge: null,
    stock: 44
  },
  {
    id: "esp-home-2024",
    category: "national",
    country: "Spain",
    flag: "🇪🇸",
    type: "home",
    name: { nl: "Spanje Thuisshirt 2024", fr: "Maillot Domicile Espagne 2024", en: "Spain Home Shirt 2024" },
    description: {
      nl: "Het rode thuisshirt van La Roja.",
      fr: "Le maillot rouge de La Roja.",
      en: "The red home shirt of La Roja."
    },
    price: 92.99,
    colors: ["#AA151B", "#F1BF00"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=500&fit=crop",
    badge: "champion",
    stock: 60
  },
  {
    id: "eng-home-2024",
    category: "national",
    country: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    type: "home",
    name: { nl: "Engeland Thuisshirt 2024", fr: "Maillot Domicile Angleterre 2024", en: "England Home Shirt 2024" },
    description: {
      nl: "Het klassieke witte shirt van de Three Lions.",
      fr: "Le classique maillot blanc des Three Lions.",
      en: "The classic white shirt of the Three Lions."
    },
    price: 91.99,
    colors: ["#FFFFFF", "#CC0000"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=400&h=500&fit=crop",
    badge: null,
    stock: 50
  },
  {
    id: "por-home-2024",
    category: "national",
    country: "Portugal",
    flag: "🇵🇹",
    type: "home",
    name: { nl: "Portugal Thuisshirt 2024", fr: "Maillot Domicile Portugal 2024", en: "Portugal Home Shirt 2024" },
    description: {
      nl: "Het rode thuisshirt van Portugal.",
      fr: "Le maillot rouge du Portugal.",
      en: "The red home shirt of Portugal."
    },
    price: 87.99,
    colors: ["#CC0000", "#006600"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=500&fit=crop",
    badge: null,
    stock: 38
  },
  {
    id: "ita-home-2024",
    category: "national",
    country: "Italy",
    flag: "🇮🇹",
    type: "home",
    name: { nl: "Italië Thuisshirt 2024", fr: "Maillot Domicile Italie 2024", en: "Italy Home Shirt 2024" },
    description: {
      nl: "Het iconische blauwe shirt van Gli Azzurri.",
      fr: "L'iconique maillot bleu des Azzurri.",
      en: "The iconic blue shirt of Gli Azzurri."
    },
    price: 88.99,
    colors: ["#003399", "#FFFFFF"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=400&h=500&fit=crop",
    badge: null,
    stock: 32
  },
  // === CLUBS ===
  {
    id: "rma-home-2024",
    category: "club",
    country: "Spain",
    flag: "🇪🇸",
    club: "Real Madrid",
    type: "home",
    name: { nl: "Real Madrid Thuisshirt 2024/25", fr: "Maillot Domicile Real Madrid 2024/25", en: "Real Madrid Home Shirt 2024/25" },
    description: {
      nl: "Het witte thuisshirt van de Koninklijke.",
      fr: "Le maillot blanc du Real Madrid.",
      en: "The iconic white home shirt of Los Blancos."
    },
    price: 99.99,
    colors: ["#FFFFFF", "#FFD700"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=500&fit=crop",
    badge: "bestseller",
    stock: 75
  },
  {
    id: "fcb-home-2024",
    category: "club",
    country: "Spain",
    flag: "🇪🇸",
    club: "FC Barcelona",
    type: "home",
    name: { nl: "FC Barcelona Thuisshirt 2024/25", fr: "Maillot Domicile FC Barcelone 2024/25", en: "FC Barcelona Home Shirt 2024/25" },
    description: {
      nl: "Het blaugrana thuisshirt van Barça.",
      fr: "Le maillot blaugrana du Barça.",
      en: "The iconic blaugrana home shirt of Barça."
    },
    price: 99.99,
    colors: ["#A50044", "#004D98"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=500&fit=crop",
    badge: null,
    stock: 65
  },
  {
    id: "mci-home-2024",
    category: "club",
    country: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    club: "Manchester City",
    type: "home",
    name: { nl: "Manchester City Thuisshirt 2024/25", fr: "Maillot Domicile Manchester City 2024/25", en: "Manchester City Home Shirt 2024/25" },
    description: {
      nl: "Het lichtblauwe thuisshirt van The Citizens.",
      fr: "Le maillot bleu ciel de Manchester City.",
      en: "The sky blue home shirt of The Citizens."
    },
    price: 97.99,
    colors: ["#6CABDD", "#FFFFFF"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=500&fit=crop",
    badge: null,
    stock: 48
  },
  {
    id: "bmu-home-2024",
    category: "club",
    country: "Germany",
    flag: "🇩🇪",
    club: "Bayern München",
    type: "home",
    name: { nl: "Bayern München Thuisshirt 2024/25", fr: "Maillot Domicile Bayern Munich 2024/25", en: "Bayern München Home Shirt 2024/25" },
    description: {
      nl: "Het rode thuisshirt van Bayern München.",
      fr: "Le maillot rouge du Bayern Munich.",
      en: "The classic red home shirt of Bayern München."
    },
    price: 95.99,
    colors: ["#DC052D", "#FFFFFF"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=400&h=500&fit=crop",
    badge: "new",
    stock: 53
  },
  {
    id: "jve-home-2024",
    category: "club",
    country: "Italy",
    flag: "🇮🇹",
    club: "Juventus",
    type: "home",
    name: { nl: "Juventus Thuisshirt 2024/25", fr: "Maillot Domicile Juventus 2024/25", en: "Juventus Home Shirt 2024/25" },
    description: {
      nl: "Het zwart-witte thuisshirt van La Vecchia Signora.",
      fr: "Le maillot noir et blanc de la Vieille Dame.",
      en: "The iconic black and white shirt of La Vecchia Signora."
    },
    price: 93.99,
    colors: ["#000000", "#FFFFFF"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1552318965-6e6be7484ada?w=400&h=500&fit=crop",
    badge: null,
    stock: 40
  },
  {
    id: "psg-home-2024",
    category: "club",
    country: "France",
    flag: "🇫🇷",
    club: "Paris Saint-Germain",
    type: "home",
    name: { nl: "PSG Thuisshirt 2024/25", fr: "Maillot Domicile PSG 2024/25", en: "PSG Home Shirt 2024/25" },
    description: {
      nl: "Het donkerblauwe thuisshirt van Paris Saint-Germain.",
      fr: "Le maillot bleu marine du Paris Saint-Germain.",
      en: "The dark blue home shirt of Paris Saint-Germain."
    },
    price: 98.99,
    colors: ["#004170", "#DA291C"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=500&fit=crop",
    badge: null,
    stock: 58
  },
  {
    id: "and-home-2024",
    category: "club",
    country: "Belgium",
    flag: "🇧🇪",
    club: "RSC Anderlecht",
    type: "home",
    name: { nl: "Anderlecht Thuisshirt 2024/25", fr: "Maillot Domicile Anderlecht 2024/25", en: "Anderlecht Home Shirt 2024/25" },
    description: {
      nl: "Het paars-witte thuisshirt van de Mauves.",
      fr: "Le maillot mauve et blanc des Mauves.",
      en: "The purple and white home shirt of the Mauves."
    },
    price: 79.99,
    colors: ["#6C1F7E", "#FFFFFF"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=500&fit=crop",
    badge: null,
    stock: 30
  }
];

export const categories = [
  { id: "all", label: { nl: "Alles", fr: "Tout", en: "All" } },
  { id: "national", label: { nl: "Nationale Teams", fr: "Équipes Nationales", en: "National Teams" } },
  { id: "club", label: { nl: "Clubs", fr: "Clubs", en: "Clubs" } }
];

export const countries = [
  { id: "Belgium", label: "🇧🇪 België / Belgique" },
  { id: "France", label: "🇫🇷 France" },
  { id: "Netherlands", label: "🇳🇱 Nederland" },
  { id: "Germany", label: "🇩🇪 Deutschland" },
  { id: "Spain", label: "🇪🇸 España" },
  { id: "England", label: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England" },
  { id: "Portugal", label: "🇵🇹 Portugal" },
  { id: "Italy", label: "🇮🇹 Italia" }
];
