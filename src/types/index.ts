export interface PropertyMedia {
  id: string;
  type: 'image' | 'video';
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
  parentId?: string; // ID do ambiente pai (Ex: ID da Suíte Master)
  number: string;
  name: string; // Ex: 'Suíte Master', 'Quarto', 'Banheiro', 'Closet'
  type?: 'category_root' | 'room' | 'subroom' | 'suite' | 'external';
  subtitle?: string;
  description?: string;
  areaM2?: number;
  coverImage: string;
  media: PropertyMedia[]; // Fotos em HD e vídeos curtos
  photos?: string[]; // Compatibilidade retroativa
  videoUrl?: string;
  characteristics: string[];
  order: number;
  nextRoomId?: string; // Próximo ambiente na sequência
  previousRoomId?: string; // Ambiente anterior na sequência
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
  features: string[]; // Diferenciais do imóvel
}

export interface ThemeConfig {
  accentColor: string; // hex, e.g. '#C5A880'
  backgroundColor: string; // hex, e.g. '#FBFBFC'
  surfaceColor: string; // hex, e.g. '#FFFFFF'
  textColor: string; // hex, e.g. '#111827'
  titleFontFamily: 'serif-playfair' | 'sans-jakarta';
  bodyFontFamily: 'sans-jakarta';
  logoUrl?: string;
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
  description: string;
  details: PropertyDetails;
  locationData: LocationData;
  categories: RoomCategory[];
  rooms: Room[];
  guidedTourSequence?: string[]; // Sequência recomendada da Visita Guiada Cardoso
  galleryPhotos: string[];
  consultantName: string;
  consultantTitle: string;
  consultantImage: string;
  consultantPhone: string;
  createdAt: string;
  themeConfig?: ThemeConfig;
  sectionOrder?: string[];
}

export type Tour = Property;
