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
  tour3DUrl: string; // URL for 3D Matterport or Virtual Tour 360
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
}
