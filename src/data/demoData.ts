import type { Property } from '../types';

export const PROPERTY_01: Property = {
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
  heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
  heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-modern-luxury-house-exterior-41584-large.mp4',
  tagline: 'Conheça todos os detalhes deste imóvel antes de agendar sua visita.',
  tour3DUrl: 'https://my.matterport.com/show/?m=sample_3d_tour',
  description: 'Excelente residência de 2 pavimentos localizada em condomínio fechado na Ponta Verde. O imóvel oferece ambientes integrados, excelente iluminação natural, espaço gourmet privativo com piscina e acabamentos de ótimo padrão de conservação.',
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
    hasPool: true,
    hasGourmetArea: true,
    features: [
      'Piscina Privativa com Aquecimento',
      'Espaço Gourmet Integrado com Churrasqueira',
      'Pé-Direito Duplo na Sala Principal',
      'Armários Planejados na Cozinha e Dormitórios',
      'Sistema de Energia Solar Fotovoltaica',
      'Suíte Master com Varanda e Closet',
      'Portaria 24h no Condomínio',
      'Garagem Coberta para 3 Veículos'
    ]
  },
  locationData: {
    city: 'Maceió',
    neighborhood: 'Ponta Verde',
    address: 'Condomínio Reserva da Maré, Ponta Verde, Maceió/AL',
    isExactLocation: false,
    regionMapPrint: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80',
    nearbyPlaces: [
      { id: 'm1', title: 'Praia da Ponta Verde', timeText: '03 min', category: 'beach' },
      { id: 'm2', title: 'Parque Shopping Maceió', timeText: '05 min', category: 'shopping' },
      { id: 'm3', title: 'Supermercado Premium', timeText: '04 min', category: 'supermarket' }
    ]
  },
  themeConfig: {
    accentColor: '#d4af37',
    backgroundColor: '#08090A',
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
    'location',
    'details',
    'commercial',
    'contact'
  ],
  categories: [
    { id: 'area-social', name: 'ÁREA SOCIAL', order: 1 },
    { id: 'area-intima', name: 'ÁREA ÍNTIMA', order: 2 },
    { id: 'area-externa', name: 'ÁREA EXTERNA', order: 3 }
  ],
  rooms: [
    // --- ÁREA SOCIAL ---
    {
      id: 'r_entrada',
      categoryId: 'area-social',
      number: '01',
      name: 'FACHADA & ENTRADA',
      subtitle: 'Entrada imponente com paisagismo integrado e acesso privativo.',
      areaM2: 24,
      type: 'room',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_e1', type: 'image', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80', title: 'Fachada Principal' },
        { id: 'm_e2', type: 'image', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80', title: 'Jardim de Entrada' }
      ],
      characteristics: ['Porta Pivotal de Madeira', 'Iluminação em LED', 'Jardim Frontal'],
      order: 1,
      nextRoomId: 'r_sala_estar',
      hotspots3D: [
        { id: 'hs1', label: 'ENTRAR NA SALA DE ESTAR', targetRoomId: 'r_sala_estar', xPercent: 50, yPercent: 65, type: 'arrow' }
      ]
    },
    {
      id: 'r_sala_estar',
      categoryId: 'area-social',
      number: '02',
      name: 'SALA DE ESTAR & JANTAR',
      subtitle: 'Living amplo com pé-direito duplo e integração com o jardim.',
      areaM2: 45,
      type: 'room',
      coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_s1', type: 'panorama', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80', title: 'Navegação 360° Sala de Estar' },
        { id: 'm_s2', type: 'image', url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80', title: 'Mesa de Jantar 8 Lugares' },
        { id: 'm_s3', type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-living-room-with-large-windows-and-modern-decor-41585-large.mp4', title: 'Vídeo do Living' }
      ],
      characteristics: ['Pé-direito Duplo (6m)', 'Piso Porcelanato 120x120cm', 'Integração Externa'],
      order: 2,
      previousRoomId: 'r_entrada',
      nextRoomId: 'r_cozinha',
      hotspots3D: [
        { id: 'hs2_1', label: 'IR PARA A COZINHA', targetRoomId: 'r_cozinha', xPercent: 78, yPercent: 55, type: 'door' },
        { id: 'hs2_2', label: 'ACESSAR PISCINA', targetRoomId: 'r_piscina', xPercent: 25, yPercent: 60, type: 'arrow' }
      ]
    },
    {
      id: 'r_cozinha',
      categoryId: 'area-social',
      number: '03',
      name: 'COZINHA PLANEJADA',
      subtitle: 'Cozinha moderna com ilha em granito e móveis sob medida.',
      areaM2: 26,
      type: 'room',
      coverImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_c1', type: 'image', url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80', title: 'Ilha em Granito' }
      ],
      characteristics: ['Ilha Central em Granito', 'Armários Embutidos Evviva', 'Bancada de Lanche'],
      order: 3,
      previousRoomId: 'r_sala_estar',
      nextRoomId: 'r_suite_master_root',
      hotspots3D: [
        { id: 'hs3_1', label: 'VOLTAR PARA A SALA', targetRoomId: 'r_sala_estar', xPercent: 30, yPercent: 65, type: 'arrow' }
      ]
    },

    // --- ÁREA ÍNTIMA (Com Hierarquia Pai/Filho: Suíte Master -> Quarto, Closet, Banheiro) ---
    {
      id: 'r_suite_master_root',
      categoryId: 'area-intima',
      number: '04',
      name: 'SUÍTE MASTER',
      subtitle: 'Conjunto privativo master composto por Quarto, Closet e Banheiro.',
      areaM2: 48,
      type: 'suite',
      coverImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_sm_root', type: 'image', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80', title: 'Suíte Master Geral' }
      ],
      characteristics: ['Ambiente Privativo Completo', 'Closet Embutido', 'Banheiro Duplo'],
      order: 4,
      previousRoomId: 'r_cozinha',
      nextRoomId: 'r_suite_01_root'
    },
    {
      id: 'r_sm_quarto',
      categoryId: 'area-intima',
      parentId: 'r_suite_master_root',
      number: '04.1',
      name: 'QUARTO SUÍTE MASTER',
      subtitle: 'Dormitório amplo com varanda privativa e ar-condicionado inverter.',
      areaM2: 24,
      type: 'subroom',
      coverImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_sm_q1', type: 'panorama', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80', title: '360° Quarto Master' },
        { id: 'm_sm_q2', type: 'image', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80', title: 'Cama King & Varanda' }
      ],
      characteristics: ['Cama King Size', 'Varanda Privativa', 'Ar-Condicionado Inverter'],
      order: 41,
      nextRoomId: 'r_sm_closet'
    },
    {
      id: 'r_sm_closet',
      categoryId: 'area-intima',
      parentId: 'r_suite_master_root',
      number: '04.2',
      name: 'CLOSET MASTER',
      subtitle: 'Espaço reservado para vestuário com iluminação interna e espelhos.',
      areaM2: 12,
      type: 'subroom',
      coverImage: 'https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_sm_cl1', type: 'image', url: 'https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1600&q=80', title: 'Closet Embutido' }
      ],
      characteristics: ['Armários Embutidos em L', 'Espelhos de Corpo Inteiro', 'Iluminação em LED'],
      order: 42,
      previousRoomId: 'r_sm_quarto',
      nextRoomId: 'r_sm_banheiro'
    },
    {
      id: 'r_sm_banheiro',
      categoryId: 'area-intima',
      parentId: 'r_suite_master_root',
      number: '04.3',
      name: 'BANHEIRO MASTER',
      subtitle: 'Banheiro privativo com bancada dupla e chuveiro de teto.',
      areaM2: 12,
      type: 'subroom',
      coverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_sm_b1', type: 'image', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80', title: 'Banheiro Master' }
      ],
      characteristics: ['Bancada Dupla em Mármore', 'Chuveiro de Teto', 'Nicho Embutido'],
      order: 43,
      previousRoomId: 'r_sm_closet'
    },

    // --- SUÍTE 01 (Hierarquia Pai/Filho: Quarto -> Banheiro) ---
    {
      id: 'r_suite_01_root',
      categoryId: 'area-intima',
      number: '05',
      name: 'SUÍTE 01',
      subtitle: 'Suíte aconchegante para hóspedes ou família.',
      areaM2: 28,
      type: 'suite',
      coverImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_s01_root', type: 'image', url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80', title: 'Suíte 01 Geral' }
      ],
      characteristics: ['Dormitório Privativo', 'Banheiro Exclusivo'],
      order: 5,
      previousRoomId: 'r_suite_master_root',
      nextRoomId: 'r_piscina'
    },
    {
      id: 'r_s01_quarto',
      categoryId: 'area-intima',
      parentId: 'r_suite_01_root',
      number: '05.1',
      name: 'QUARTO SUÍTE 01',
      subtitle: 'Quarto bem ventilado com armários sob medida.',
      areaM2: 20,
      type: 'subroom',
      coverImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_s01_q1', type: 'image', url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80', title: 'Quarto Suíte 01' }
      ],
      characteristics: ['Janela de Alumínio Anodizado', 'Armários Evviva'],
      order: 51,
      nextRoomId: 'r_s01_banheiro'
    },
    {
      id: 'r_s01_banheiro',
      categoryId: 'area-intima',
      parentId: 'r_suite_01_root',
      number: '05.2',
      name: 'BANHEIRO SUÍTE 01',
      subtitle: 'Banheiro privativo da Suíte 01.',
      areaM2: 8,
      type: 'subroom',
      coverImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_s01_b1', type: 'image', url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80', title: 'Banheiro Suíte 01' }
      ],
      characteristics: ['Box Blindex', 'Bancada em Granito'],
      order: 52,
      previousRoomId: 'r_s01_quarto'
    },

    // --- ÁREA EXTERNA ---
    {
      id: 'r_piscina',
      categoryId: 'area-externa',
      number: '06',
      name: 'ÁREA EXTERNA & PISCINA',
      subtitle: 'Varanda gourmet completa com churrasqueira e piscina privativa.',
      areaM2: 55,
      type: 'external',
      coverImage: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_p1', type: 'panorama', url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=80', title: '360° Piscina & Deck' },
        { id: 'm_p2', type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-swimming-pool-in-a-luxury-house-41587-large.mp4', title: 'Vídeo da Piscina' }
      ],
      characteristics: ['Piscina Aquecida', 'Deck de Madeira', 'Churrasqueira em Inox'],
      order: 6,
      previousRoomId: 'r_suite_01_root',
      hotspots3D: [
        { id: 'hs5_1', label: 'ENTRAR NA SALA DE ESTAR', targetRoomId: 'r_sala_estar', xPercent: 70, yPercent: 50, type: 'arrow' }
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
  consultantName: 'Douglas Cardoso',
  consultantTitle: 'CEO - CRECI 73.567',
  consultantImage: '/assets/ceo-card.png',
  consultantPhone: '5582999999999',
  createdAt: '2026-09-06'
};

export const PROPERTY_02: Property = {
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
  heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85',
  tagline: 'Conheça todos os detalhes deste apartamento em localização privilegiada.',
  description: 'Excelente apartamento de 3 dormitórios (2 suítes) a poucas quadras da praia da Jatiúca. Imóvel nascente, andar alto, altamente ventilado, com varanda gourmet, móveis planejados em todos os cômodos e 2 vagas de garagem livres.',
  details: {
    builtAreaM2: 140,
    bedrooms: 3,
    suites: 2,
    bathrooms: 3,
    parkingSpaces: 2,
    condoFee: 'R$ 780 / mês',
    iptu: 'R$ 2.100 / ano',
    propertyType: 'Apartamento Residencial',
    furnishedStatus: 'Móveis Planejados Inclusos',
    constructionYear: '2021',
    hasPool: false, // NOTE: NO PRIVATE POOL HERE!
    hasGourmetArea: true,
    features: [
      'Andar Alto e Posição Nascente (Muito Ventilado)',
      'Varanda Gourmet com Cortina de Vidro',
      'Móveis Planejados em Todos os Cômodos',
      '2 Vagas de Garagem Soltas e Cobertas',
      'A 300 Metros da Praia da Jatiúca',
      'Portaria 24h com Controle de Acesso Biométrico'
    ]
  },
  locationData: {
    city: 'Maceió',
    neighborhood: 'Jatiúca',
    address: 'Rua José Luiz Calazans, Edifício Mare, Jatiúca - Maceió/AL',
    isExactLocation: true,
    regionMapPrint: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80',
    nearbyPlaces: [
      { id: 'm1', title: 'Orla da Jatiúca', timeText: '04 min a pé', category: 'beach' },
      { id: 'm2', title: 'Supermercado Unicompra', timeText: '02 min a pé', category: 'supermarket' }
    ]
  },
  themeConfig: {
    accentColor: '#d4af37',
    backgroundColor: '#08090A',
    surfaceColor: '#121316',
    textColor: '#f4f4f5',
    titleFontFamily: 'serif-playfair',
    bodyFontFamily: 'sans-jakarta',
    logoUrl: '/assets/logo-cardoso.png'
  },
  categories: [
    { id: 'area-social', name: 'ÁREA SOCIAL', order: 1 },
    { id: 'area-intima', name: 'ÁREA ÍNTIMA', order: 2 }
  ],
  rooms: [
    {
      id: 'apt_r1',
      categoryId: 'area-social',
      number: '01',
      name: 'SALA & VARANDA GOURMET',
      subtitle: 'Living para 2 ambientes integrado à varanda com fechamento em vidro.',
      areaM2: 38,
      type: 'room',
      coverImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'apt_m1', type: 'image', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80', title: 'Sala de Estar & Jantar' }
      ],
      characteristics: ['Piso Porcelanato Polido', 'Integração Varanda', 'Projeto Luminotécnico'],
      order: 1,
      nextRoomId: 'apt_r2_root'
    },
    {
      id: 'apt_r2_root',
      categoryId: 'area-intima',
      number: '02',
      name: 'SUÍTE PRINCIPAL',
      subtitle: 'Dormitório amplo com roupeiro sob medida.',
      areaM2: 22,
      type: 'suite',
      coverImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'apt_m2', type: 'image', url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80', title: 'Suíte Principal' }
      ],
      characteristics: ['Armários Embutidos', 'Ar-Condicionado Inverter'],
      order: 2,
      previousRoomId: 'apt_r1'
    },
    {
      id: 'apt_r2_quarto',
      categoryId: 'area-intima',
      parentId: 'apt_r2_root',
      number: '02.1',
      name: 'QUARTO SUÍTE PRINCIPAL',
      subtitle: 'Quarto com painel de TV e armários.',
      areaM2: 16,
      type: 'subroom',
      coverImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'apt_m2_q', type: 'image', url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80', title: 'Quarto' }
      ],
      characteristics: ['Cama de Casal', 'Painel de Madeira'],
      order: 21,
      nextRoomId: 'apt_r2_banheiro'
    },
    {
      id: 'apt_r2_banheiro',
      categoryId: 'area-intima',
      parentId: 'apt_r2_root',
      number: '02.2',
      name: 'BANHEIRO SUÍTE PRINCIPAL',
      subtitle: 'Banheiro privativo com box blindex.',
      areaM2: 6,
      type: 'subroom',
      coverImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'apt_m2_b', type: 'image', url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80', title: 'Banheiro' }
      ],
      characteristics: ['Box Blindex', 'Bancada em Granito'],
      order: 22,
      previousRoomId: 'apt_r2_quarto'
    }
  ],
  galleryPhotos: [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80'
  ],
  consultantName: 'Douglas Cardoso',
  consultantTitle: 'CEO - CRECI 73.567',
  consultantImage: '/assets/ceo-card.png',
  consultantPhone: '5582999999999',
  createdAt: '2026-09-06'
};

export const ALL_PROPERTIES: Property[] = [PROPERTY_01, PROPERTY_02];
export const DEMO_TOUR: Property = PROPERTY_01;
