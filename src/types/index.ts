export interface Room {
  id: string;
  number: string; // e.g. "01", "02"
  name: string;   // e.g. "SALA DE ESTAR"
  subtitle: string;
  areaM2: number;
  coverImage: string;
  photos: string[];
  videoUrl?: string;
  characteristics: string[];
  order: number;
}

export interface FloorPlanSpot {
  roomId: string;
  label: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
}

export interface RegionMarker {
  id: string;
  title: string;
  timeText: string;
  category: 'estate' | 'beach' | 'shopping' | 'supermarket' | 'school' | 'other';
  x: number; // percentage 0-100
  y: number; // percentage 0-100
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
  features: string[];
}

export interface Tour {
  id: string;
  slug: string;
  accessCode?: string;
  active: boolean;
  propertyName: string;
  location: string;
  price: string;
  isExactLocation: boolean;
  address?: string;
  heroImage: string;
  heroVideo?: string;
  tagline?: string;
  details: PropertyDetails;
  rooms: Room[];
  floorPlanImage?: string;
  floorPlanHotspots: FloorPlanSpot[];
  regionMapPrint: string;
  regionMarkers: RegionMarker[];
  consultantName: string;
  consultantTitle: string;
  consultantImage: string;
  consultantPhone: string;
  createdAt: string;
}
