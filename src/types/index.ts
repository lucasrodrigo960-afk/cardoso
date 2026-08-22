export interface Hotspot3D {
  id: string;
  label: string;
  targetRoomId: string;
  xPercent: number; // 0 to 100
  yPercent: number; // 0 to 100
  type?: 'arrow' | 'door' | 'info';
}

export interface Room {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  areaM2: number;
  coverImage: string;
  photos: string[];
  videoUrl?: string;
  characteristics: string[];
  order: number;
  hotspots3D?: Hotspot3D[];
}

export interface FloorPlanSpot {
  roomId: string;
  label: string;
  x: number;
  y: number;
}

export interface RegionMarker {
  id: string;
  title: string;
  timeText: string;
  category: 'estate' | 'beach' | 'shopping' | 'supermarket' | 'school' | 'other';
  x: number;
  y: number;
}

export interface PropertyDetails {
  builtAreaM2: number;
  landAreaM2: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpaces: number;
  condoFee?: string;
  iptu?: string;
  propertyType: string;
  furnishedStatus: string;
  constructionYear?: string;
  features: string[];
}

export interface ThemeConfig {
  accentColor: string; // hex or tailwind name, e.g. '#d4af37'
  backgroundColor: string; // hex, e.g. '#0b0c0e'
  surfaceColor: string; // hex, e.g. '#121316'
  textColor: string; // hex, e.g. '#f4f4f5'
  titleFontFamily: 'serif-playfair' | 'serif-cinzel' | 'sans-jakarta' | 'sans-inter' | 'mono';
  bodyFontFamily: 'sans-jakarta' | 'sans-inter' | 'serif-playfair' | 'mono';
  logoUrl?: string;
  secondaryLogoUrl?: string;
}

export interface Tour {
  id: string;
  slug: string;
  accessCode?: string;
  active: boolean;
  propertyName: string;
  location: string;
  neighborhood: string;
  cityState: string;
  price: string;
  rawPriceNumber: number;
  isExactLocation: boolean;
  address?: string;
  heroImage: string;
  heroVideo?: string;
  tagline?: string;
  tour3DUrl: string; // Native or embedded tour URL
  description: string;
  details: PropertyDetails;
  rooms: Room[];
  galleryPhotos: string[];
  floorPlanImage?: string;
  floorPlanHotspots: FloorPlanSpot[];
  regionMapPrint: string;
  regionMarkers: RegionMarker[];
  consultantName: string;
  consultantTitle: string;
  consultantImage: string;
  consultantPhone: string;
  createdAt: string;
  themeConfig?: ThemeConfig;
  sectionOrder?: string[]; // Array of section IDs in desired render order
}
