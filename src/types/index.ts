export interface Hotspot3D {
  id: string;
  label: string;
  targetRoomId: string;
  xPercent: number; // 0 to 100
  yPercent: number; // 0 to 100
  type?: 'arrow' | 'door' | 'info';
}

export interface PropertyMedia {
  id: string;
  type: 'image' | 'panorama' | 'video';
  url: string;
  title?: string;
}

export interface RoomCategory {
  id: string;
  name: string; // Ex: 'ÁREA SOCIAL', 'ÁREA ÍNTIMA', 'ÁREA EXTERNA'
  order: number;
}

export interface Room {
  id: string;
  categoryId: string; // Ex: 'area-social', 'area-intima', 'area-externa'
  parentId?: string; // ID do ambiente pai (Ex: ID da Suíte 01)
  number: string;
  name: string; // Ex: 'Suíte Master', 'Quarto', 'Banheiro', 'Closet'
  type?: 'category_root' | 'room' | 'subroom' | 'suite' | 'external';
  subtitle?: string;
  areaM2?: number;
  coverImage: string;
  media: PropertyMedia[]; // Suporte a fotos, 360 e vídeo
  photos?: string[]; // Backward compatibility array
  characteristics: string[];
  order: number;
  nextRoomId?: string; // Próximo ambiente na sequência
  previousRoomId?: string; // Ambiente anterior na sequência
  hotspots3D?: Hotspot3D[];
}

export interface FloorPlanSpot {
  roomId: string;
  label: string;
  x: number;
  y: number;
}

export interface NearbyPlace {
  id: string;
  title: string;
  timeText: string;
  category: 'beach' | 'shopping' | 'supermarket' | 'school' | 'other';
}

export interface LocationData {
  city: string;
  neighborhood: string;
  address?: string;
  isExactLocation: boolean;
  regionMapPrint: string;
  nearbyPlaces: NearbyPlace[];
}

export interface PropertyDetails {
  builtAreaM2?: number;
  landAreaM2?: number;
  bedrooms?: number;
  suites?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  condoFee?: string;
  iptu?: string;
  propertyType: string;
  furnishedStatus?: string;
  constructionYear?: string;
  hasPool?: boolean;
  hasGourmetArea?: boolean;
  hasElevator?: boolean;
  features: string[]; // Apenas diferenciais existentes
}

export interface ThemeConfig {
  accentColor: string; // hex, e.g. '#d4af37'
  backgroundColor: string; // hex, e.g. '#08090A'
  surfaceColor: string; // hex, e.g. '#121316'
  textColor: string; // hex, e.g. '#f4f4f5'
  titleFontFamily: 'serif-playfair' | 'serif-cinzel' | 'sans-jakarta' | 'sans-inter' | 'mono';
  bodyFontFamily: 'sans-jakarta' | 'sans-inter' | 'serif-playfair' | 'mono';
  logoUrl?: string;
  secondaryLogoUrl?: string;
}

export interface Property {
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
  heroImage: string;
  heroVideo?: string;
  tagline?: string;
  tour3DUrl?: string;
  description: string;
  details: PropertyDetails;
  locationData: LocationData;
  categories: RoomCategory[];
  rooms: Room[];
  galleryPhotos: string[];
  floorPlanImage?: string;
  floorPlanHotspots?: FloorPlanSpot[];
  consultantName: string;
  consultantTitle: string;
  consultantImage: string;
  consultantPhone: string;
  createdAt: string;
  themeConfig?: ThemeConfig;
  sectionOrder?: string[];
}

// Type alias for backward compatibility
export type Tour = Property;
