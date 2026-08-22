import type { Tour } from '../types';

export const PROPERTY_01: Tour = {
  id: 'tour-casa-reserva',
  slug: 'casa-reserva-da-mare',
  accessCode: 'CARDOSO2026',
  active: true,
  propertyName: 'CASA RESERVA DA MARÉ',
  location: 'Ponta Verde — Maceió/AL',
  neighborhood: 'Ponta Verde',
  cityState: 'Maceió — AL',
  price: 'R$ 1.850.000',
  rawPriceNumber: 1850000,
  isExactLocation: false,
  address: 'Condomínio Reserva da Maré, Ponta Verde, Maceió/AL',
  heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
  heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-modern-luxury-house-exterior-41584-large.mp4',
  tagline: 'Conheça todos os detalhes deste imóvel antes de agendar sua visita.',
  tour3DUrl: 'https://my.matterport.com/show/?m=sample_3d_tour',
  description: 'Excelente residência de 2 pavimentos localizada em condomínio fechado na Ponta Verde. O imóvel oferece ambientes integrados, excelente iluminação natural, espaço gourmet privativo com piscina e acabamentos em alto padrão de conservação.',
  details: {
    builtAreaM2: 320,
    landAreaM2: 450,
    bedrooms: 4,
    suites: 3,
    bathrooms: 5,
    parkingSpaces: 3,
    condoFee: 'R$ 1.250 / mês',
    iptu: 'R$ 3.800 / ano',
    propertyType: 'Casa Residencial em Condomínio',
    furnishedStatus: 'Armários Planejados Inclusos',
    constructionYear: '2022',
    features: [
      'Piscina Privativa com Aquecimento',
      'Espaço Gourmet Integrado com Churrasqueira',
      'Pé-Direito Duplo na Sala Principal',
      'Armários Planejados na Cozinha e Dormitórios',
      'Sistema de Energia Solar Fotovoltaica',
      'Suíte Master com Varanda e Closet',
      'Portaria 24h e Segurança Armada no Condomínio',
      'Garagem Coberta para 3 Veículos'
    ]
  },
  themeConfig: {
    accentColor: '#d4af37',
    backgroundColor: '#0b0c0e',
    surfaceColor: '#121316',
    textColor: '#f4f4f5',
    titleFontFamily: 'serif-playfair',
    bodyFontFamily: 'sans-jakarta',
    logoUrl: '/assets/logo-cardoso.png'
  },
  sectionOrder: [
    'overview',
    'property-overview',
    'tour3d',
    'rooms',
    'gallery',
    'floorplan',
    'location',
    'details',
    'commercial',
    'contact'
  ],
  rooms: [
    {
      id: 'r1',
      number: '01',
      name: 'FACHADA & ENTRADA',
      subtitle: 'Entrada imponente com paisagismo integrado e acesso privativo.',
      areaM2: 24,
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      photos: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80'
      ],
      characteristics: ['Porta Pivotal de Madeira', 'Iluminação em LED', 'Jardim Frontal'],
      order: 1,
      hotspots3D: [
        {
          id: 'hs1',
          label: 'ENTRAR NA SALA DE ESTAR',
          targetRoomId: 'r2',
          xPercent: 50,
          yPercent: 65,
          type: 'arrow'
        }
      ]
    },
    {
      id: 'r2',
      number: '02',
      name: 'SALA DE ESTAR & JANTAR',
      subtitle: 'Living amplo com pé-direito duplo e integração total com o jardim.',
      areaM2: 45,
      coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      photos: [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80'
      ],
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-living-room-with-large-windows-and-modern-decor-41585-large.mp4',
      characteristics: ['Pé-direito Duplo (6m)', 'Piso Porcelanato 120x120cm', 'Integração Externa'],
      order: 2,
      hotspots3D: [
        {
          id: 'hs2_1',
          label: 'IR PARA A COZINHA',
          targetRoomId: 'r3',
          xPercent: 78,
          yPercent: 55,
          type: 'door'
        },
        {
          id: 'hs2_2',
          label: 'ACESSAR PISCINA & GOURMET',
          targetRoomId: 'r5',
          xPercent: 25,
          yPercent: 60,
          type: 'arrow'
        },
        {
          id: 'hs2_3',
          label: 'VOLTAR PARA ENTRADA',
          targetRoomId: 'r1',
          xPercent: 48,
          yPercent: 82,
          type: 'arrow'
        }
      ]
    },
    {
      id: 'r3',
      number: '03',
      name: 'COZINHA PLANEJADA',
      subtitle: 'Cozinha moderna com ilha em granito e móveis sob medida inclusos.',
      areaM2: 26,
      coverImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      photos: [
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80'
      ],
      characteristics: ['Ilha Central em Granito', 'Armários Embutidos Evviva', 'Bancada de Lanche'],
      order: 3,
      hotspots3D: [
        {
          id: 'hs3_1',
          label: 'VOLTAR PARA A SALA',
          targetRoomId: 'r2',
          xPercent: 30,
          yPercent: 65,
          type: 'arrow'
        }
      ]
    },
    {
      id: 'r4',
      number: '04',
      name: 'SUÍTE MASTER',
      subtitle: 'Dormitório principal aconchegante com closet e varanda privativa.',
      areaM2: 34,
      coverImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      photos: [
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80'
      ],
      characteristics: ['Closet Integrado', 'Varanda Privativa', 'Ar-Condicionado Inverter'],
      order: 4,
      hotspots3D: [
        {
          id: 'hs4_1',
          label: 'VOLTAR PARA SALA PRINCIPAL',
          targetRoomId: 'r2',
          xPercent: 50,
          yPercent: 75,
          type: 'arrow'
        }
      ]
    },
    {
      id: 'r5',
      number: '05',
      name: 'ÁREA EXTERNA & PISCINA',
      subtitle: 'Varanda gourmet completa com churrasqueira e piscina privativa.',
      areaM2: 55,
      coverImage: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
      photos: [
        'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=80'
      ],
      characteristics: ['Piscina Aquecida', 'Deck de Madeira', 'Churrasqueira em Inox'],
      order: 5,
      hotspots3D: [
        {
          id: 'hs5_1',
          label: 'ENTRAR NA SALA DE ESTAR',
          targetRoomId: 'r2',
          xPercent: 70,
          yPercent: 50,
          type: 'arrow'
        }
      ]
    }
  ],
  galleryPhotos: [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=80'
  ],
  floorPlanImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
  floorPlanHotspots: [
    { roomId: 'r1', label: 'ENTRADA', x: 20, y: 75 },
    { roomId: 'r2', label: 'SALA', x: 45, y: 55 },
    { roomId: 'r3', label: 'COZINHA', x: 75, y: 68 },
    { roomId: 'r4', label: 'SUÍTE MASTER', x: 35, y: 25 },
    { roomId: 'r5', label: 'PISCINA', x: 50, y: 88 }
  ],
  regionMapPrint: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80',
  regionMarkers: [
    { id: 'm1', title: 'IMÓVEL', timeText: '📍 LOCALIZAÇÃO', category: 'estate', x: 50, y: 45 },
    { id: 'm2', title: 'Praia da Ponta Verde', timeText: '03 min', category: 'beach', x: 28, y: 28 },
    { id: 'm3', title: 'Parque Shopping Maceió', timeText: '05 min', category: 'shopping', x: 75, y: 35 },
    { id: 'm4', title: 'Supermercado Premium', timeText: '04 min', category: 'supermarket', x: 62, y: 68 }
  ],
  consultantName: 'Douglas Cardoso',
  consultantTitle: 'CEO - CRECI 73.567',
  consultantImage: '/assets/ceo-card.png',
  consultantPhone: '5582999999999',
  createdAt: '2026-08-22'
};

export const PROPERTY_02: Tour = {
  id: 'tour-apt-jatiuca',
  slug: 'apartamento-edificio-mare',
  accessCode: 'CARDOSO2026',
  active: true,
  propertyName: 'APARTAMENTO EDIFÍCIO MARE',
  location: 'Jatiúca — Maceió/AL',
  neighborhood: 'Jatiúca',
  cityState: 'Maceió — AL',
  price: 'R$ 850.000',
  rawPriceNumber: 850000,
  isExactLocation: true,
  address: 'Rua José Luiz Calazans, Edifício Mare, Jatiúca - Maceió/AL',
  heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85',
  tagline: 'Conheça todos os detalhes deste apartamento em localização privilegiada.',
  tour3DUrl: 'https://my.matterport.com/show/?m=sample_3d_tour_2',
  description: 'Excelente apartamento de 3 dormitórios (2 suítes) a poucas quadras da praia da Jatiúca. Imóvel nascente, andar alto, altamente ventilado, com varanda gourmet, móveis planejados em todos os cômodos e 2 vagas de garagem livres.',
  details: {
    builtAreaM2: 140,
    landAreaM2: 140,
    bedrooms: 3,
    suites: 2,
    bathrooms: 3,
    parkingSpaces: 2,
    condoFee: 'R$ 780 / mês',
    iptu: 'R$ 2.100 / ano',
    propertyType: 'Apartamento Residencial',
    furnishedStatus: 'Móveis Planejados Inclusos',
    constructionYear: '2021',
    features: [
      'Andar Alto e Posição Nascente (Muito Ventilado)',
      'Varanda Gourmet com Cortina de Vidro',
      'Móveis Planejados em Todos os Cômodos',
      '2 Vagas de Garagem Soltas e Cobertas',
      'Área de Lazer Completa no Prédio (Piscina e Salão de Festas)',
      'A 300 Metros da Praia da Jatiúca',
      'Portaria 24h com Controle de Acesso Biométrico'
    ]
  },
  themeConfig: {
    accentColor: '#d4af37',
    backgroundColor: '#0b0c0e',
    surfaceColor: '#121316',
    textColor: '#f4f4f5',
    titleFontFamily: 'serif-playfair',
    bodyFontFamily: 'sans-jakarta',
    logoUrl: '/assets/logo-cardoso.png'
  },
  rooms: [
    {
      id: 'apt-r1',
      number: '01',
      name: 'SALA & VARANDA GOURMET',
      subtitle: 'Living para 2 ambientes integrado à varanda com fechamento em vidro.',
      areaM2: 38,
      coverImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      photos: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80'
      ],
      characteristics: ['Piso Porcelanato Polido', 'Integração Varanda', 'Projeto Luminotécnico'],
      order: 1,
      hotspots3D: [
        {
          id: 'apt_hs1',
          label: 'IR PARA A SUÍTE PRINCIPAL',
          targetRoomId: 'apt-r2',
          xPercent: 70,
          yPercent: 55,
          type: 'door'
        }
      ]
    },
    {
      id: 'apt-r2',
      number: '02',
      name: 'SUÍTE PRINCIPAL',
      subtitle: 'Dormitório amplo com roupeiro sob medida e bancada de trabalho.',
      areaM2: 22,
      coverImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      photos: [
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80'
      ],
      characteristics: ['Armários Embutidos', 'Ar-Condicionado Inverter', 'Banheiro com Nicho'],
      order: 2,
      hotspots3D: [
        {
          id: 'apt_hs2',
          label: 'VOLTAR PARA A SALA',
          targetRoomId: 'apt-r1',
          xPercent: 30,
          yPercent: 70,
          type: 'arrow'
        }
      ]
    }
  ],
  galleryPhotos: [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80'
  ],
  floorPlanImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
  floorPlanHotspots: [
    { roomId: 'apt-r1', label: 'SALA', x: 40, y: 50 },
    { roomId: 'apt-r2', label: 'SUÍTE', x: 70, y: 30 }
  ],
  regionMapPrint: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80',
  regionMarkers: [
    { id: 'm1', title: 'EDIFÍCIO MARE', timeText: '📍 LOCALIZAÇÃO', category: 'estate', x: 50, y: 45 }
  ],
  consultantName: 'Douglas Cardoso',
  consultantTitle: 'CEO - CRECI 73.567',
  consultantImage: '/assets/ceo-card.png',
  consultantPhone: '5582999999999',
  createdAt: '2026-08-22'
};

export const ALL_PROPERTIES: Tour[] = [PROPERTY_01, PROPERTY_02];
export const DEMO_TOUR: Tour = PROPERTY_01;
