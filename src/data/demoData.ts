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
  tagline: 'Uma experiência exclusiva desenvolvida para apresentar este imóvel em seus mínimos detalhes.',
  description: 'Excelente residência de 2 pavimentos localizada em condomínio fechado de altíssimo prestígio na Ponta Verde. O imóvel oferece ambientes sociais integrados com pé-direito duplo, generosa insolação natural nascente, esquadrias do chão ao teto e espaço gourmet privativo integrado a deque molhado com piscina aquecida.',
  details: {
    builtAreaM2: 320,
    landAreaM2: 430,
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
      'Piscina Aquecida em Pedra Hijau Vulcânica',
      'Energia Solar Fotovoltaica com Usina Própria',
      'Espaço Gourmet com Churrasqueira e Coifa Inox',
      'Pé-Direito Duplo de 6.20m no Living Social',
      'Segurança Armada 24h e Portaria com Biometria',
      'Suíte Master com Closet Walk-in e Varanda',
      'Automação de Iluminação, Irrigação e Ar-Condicionado',
      '3 Vagas Cobertas para Veículos'
    ]
  },
  locationData: {
    city: 'Maceió',
    neighborhood: 'Ponta Verde',
    address: 'Condomínio Reserva da Maré, Ponta Verde, Maceió/AL',
    isExactLocation: false,
    regionMapPrint: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80',
    nearbyPlaces: [
      { id: 'm1', title: 'Praia da Ponta Verde', timeText: '05 min a pé (350m)', category: 'beach' },
      { id: 'm2', title: 'Parque Shopping Maceió', timeText: '08 min de carro', category: 'shopping' },
      { id: 'm3', title: 'Empório & Palato Gourmet 24h', timeText: '03 min de carro', category: 'supermarket' }
    ]
  },
  themeConfig: {
    accentColor: '#C5A880',
    backgroundColor: '#FBFBFC',
    surfaceColor: '#FFFFFF',
    textColor: '#111827',
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
  // Sequência de Visita Guiada recomendada pela Cardoso Imóveis
  guidedTourSequence: [
    'r_entrada',
    'r_sala_estar',
    'r_cozinha',
    'r_suite_master_root',
    'r_sm_quarto',
    'r_sm_closet',
    'r_sm_banheiro',
    'r_suite_01_root',
    'r_piscina'
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
      name: 'FACHADA & ENTRADA IMPONENTE',
      subtitle: 'Entrada com fechadura biométrica, jardim vertical automatizado e acesso privativo.',
      description: 'Fachada contemporânea de 2 pavimentos com ripado de madeira nobre, paisagismo tropical integrado e iluminação cênica noturna.',
      areaM2: 24,
      type: 'room',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_e1', type: 'image', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80', title: 'Fachada Principal ao Entardecer' },
        { id: 'm_e2', type: 'image', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80', title: 'Jardim de Entrada & Garagem' }
      ],
      characteristics: ['Porta Pivotal de Madeira Cumaru', 'Iluminação Cênica em LED', 'Jardim Tropical com Irrigação'],
      order: 1,
      nextRoomId: 'r_sala_estar'
    },
    {
      id: 'r_sala_estar',
      categoryId: 'area-social',
      number: '02',
      name: 'SALA DE ESTAR & JANTAR',
      subtitle: 'Living amplo de 65m² com pé-direito duplo de 6.20m e integração total.',
      description: 'Salão social sem pilares aparentes com envidraçamento piso-teto, revestimento em porcelanato polido 120x120cm e integração direta com a varanda e o jardim.',
      areaM2: 65,
      type: 'room',
      coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_s1', type: 'image', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80', title: 'Living Social Integrado' },
        { id: 'm_s2', type: 'image', url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80', title: 'Mesa de Jantar para 8 Lugares' },
        { id: 'm_s3', type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-living-room-with-large-windows-and-modern-decor-41585-large.mp4', title: 'Vídeo do Living Social' }
      ],
      characteristics: ['Pé-direito Duplo de 6.20m', 'Porcelanato Polido 120x120cm', 'Integração com Jardim Externo'],
      order: 2,
      previousRoomId: 'r_entrada',
      nextRoomId: 'r_cozinha'
    },
    {
      id: 'r_cozinha',
      categoryId: 'area-social',
      number: '03',
      name: 'COZINHA GOURMET & ILHA',
      subtitle: 'Cozinha moderna com ilha central em pedra de quartzo e móveis sob medida.',
      description: 'Espaço gourmet funcional com bancada em ilha de quartzo branco, eletros embutidos de alta linha, coifa com exaustão externa e marcenaria premium com amortecimento.',
      areaM2: 26,
      type: 'room',
      coverImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_c1', type: 'image', url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80', title: 'Ilha Central de Quartzo' }
      ],
      characteristics: ['Bancada em Quartzo Branco', 'Marcenaria Florense sob Medida', 'Cooktop & Coifa de Inox'],
      order: 3,
      previousRoomId: 'r_sala_estar',
      nextRoomId: 'r_suite_master_root'
    },

    // --- ÁREA ÍNTIMA (Suíte Master -> Quarto, Closet, Banheiro) ---
    {
      id: 'r_suite_master_root',
      categoryId: 'area-intima',
      number: '04',
      name: 'SUÍTE MASTER',
      subtitle: 'Refúgio privativo de 48m² composto por Quarto, Closet Walk-in e Banheiro Duplo.',
      description: 'Conjunto master de alto padrão no pavimento superior com varanda privativa voltada para a brisa nascente.',
      areaM2: 48,
      type: 'suite',
      coverImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_sm_root', type: 'image', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80', title: 'Visão Geral da Suíte Master' }
      ],
      characteristics: ['Conjunto Privativo Completo', 'Closet Walk-in Duplo', 'Banheiro com Bancada Dupla'],
      order: 4,
      previousRoomId: 'r_cozinha',
      nextRoomId: 'r_sm_quarto'
    },
    {
      id: 'r_sm_quarto',
      categoryId: 'area-intima',
      parentId: 'r_suite_master_root',
      number: '04.1',
      name: 'QUARTO SUÍTE MASTER',
      subtitle: 'Dormitório amplo com varanda privativa e painel de cabeceira em madeira nobre.',
      description: 'Ambiente aconchegante com espaço para cama King Size, cabeceira estofada com marcenaria em madeira cumaru, cortinas automatizadas e porta de acesso à varanda.',
      areaM2: 24,
      type: 'subroom',
      coverImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_sm_q1', type: 'image', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80', title: 'Quarto Master com Varanda' },
        { id: 'm_sm_q2', type: 'image', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80', title: 'Perspectiva da Cama King' }
      ],
      characteristics: ['Cama King Size', 'Varanda Privativa Voltada ao Nascente', 'Ar-Condicionado Inverter Embutido'],
      order: 41,
      previousRoomId: 'r_suite_master_root',
      nextRoomId: 'r_sm_closet'
    },
    {
      id: 'r_sm_closet',
      categoryId: 'area-intima',
      parentId: 'r_suite_master_root',
      number: '04.2',
      name: 'CLOSET MASTER',
      subtitle: 'Closet walk-in com armários embutidos em L, iluminação interna em LED e espelhos.',
      description: 'Espaço funcional com nichos para calçados, gaveteiros com trava e iluminação indireta que destaca as peças.',
      areaM2: 12,
      type: 'subroom',
      coverImage: 'https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_sm_cl1', type: 'image', url: 'https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&w=1600&q=80', title: 'Closet Walk-in' }
      ],
      characteristics: ['Armários Embutidos em L', 'Espelhos de Corpo Inteiro', 'Iluminação LED Sensorizada'],
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
      subtitle: 'Banheiro privativo com bancada dupla esculpida em mármore e chuveiro de teto.',
      description: 'Acabamento requintado com cubas duplas esculpidas em mármore branco, espelhos bisotados, nicho iluminado no box e duchas de teto pressurizadas.',
      areaM2: 12,
      type: 'subroom',
      coverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_sm_b1', type: 'image', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80', title: 'Banheiro Master com Bancada Dupla' }
      ],
      characteristics: ['Bancada Dupla em Mármore Esculpido', 'Ducha de Teto Pressurizada', 'Nicho Embutido com LED'],
      order: 43,
      previousRoomId: 'r_sm_closet',
      nextRoomId: 'r_suite_01_root'
    },

    // --- SUÍTE 01 (Quarto -> Banheiro) ---
    {
      id: 'r_suite_01_root',
      categoryId: 'area-intima',
      number: '05',
      name: 'SUÍTE 01',
      subtitle: 'Suíte aconchegante para hóspedes com armários embutidos.',
      description: 'Dormitório bem iluminado no pavimento superior com persiana automatizada blackout.',
      areaM2: 28,
      type: 'suite',
      coverImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_s01_root', type: 'image', url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80', title: 'Suíte 01 Geral' }
      ],
      characteristics: ['Dormitório Privativo', 'Banheiro Exclusivo', 'Persiana Automatizada'],
      order: 5,
      previousRoomId: 'r_sm_banheiro',
      nextRoomId: 'r_piscina'
    },

    // --- ÁREA EXTERNA ---
    {
      id: 'r_piscina',
      categoryId: 'area-externa',
      number: '06',
      name: 'ÁREA EXTERNA & PISCINA',
      subtitle: 'Varanda gourmet com churrasqueira em inox e piscina aquecida em pedra Hijau.',
      description: 'Espaço de lazer privativo com deque em madeira nobre, piscina aquecida por bomba de calor revestida em pedra vulcânica verde e solarium.',
      areaM2: 55,
      type: 'external',
      coverImage: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'm_p1', type: 'image', url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=80', title: 'Piscina em Pedra Hijau com Aquecimento' },
        { id: 'm_p2', type: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-swimming-pool-in-a-luxury-house-41587-large.mp4', title: 'Vídeo da Área Externa' }
      ],
      characteristics: ['Piscina Aquecida em Pedra Hijau', 'Deck em Madeira Cumaru', 'Varanda Gourmet com Churrasqueira'],
      order: 6,
      previousRoomId: 'r_suite_01_root'
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
  tagline: 'Conheça todos os detalhes deste apartamento a poucas quadras da praia.',
  description: 'Excelente apartamento de 3 dormitórios (2 suítes) na Jatiúca. Imóvel nascente, andar alto, altamente ventilado, com varanda gourmet, móveis planejados em todos os cômodos e 2 vagas de garagem livres.',
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
    hasPool: false,
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
    accentColor: '#C5A880',
    backgroundColor: '#FBFBFC',
    surfaceColor: '#FFFFFF',
    textColor: '#111827',
    titleFontFamily: 'serif-playfair',
    bodyFontFamily: 'sans-jakarta',
    logoUrl: '/assets/logo-cardoso.png'
  },
  guidedTourSequence: [
    'apt_r1',
    'apt_r2_root',
    'apt_r2_quarto',
    'apt_r2_banheiro'
  ],
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
      description: 'Salão social bem iluminado com piso em porcelanato polido e integração total com a varanda gourmet.',
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
      description: 'Suíte silenciosa com excelente ventilação natural nascente.',
      areaM2: 22,
      type: 'suite',
      coverImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      media: [
        { id: 'apt_m2', type: 'image', url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80', title: 'Suíte Principal' }
      ],
      characteristics: ['Armários Embutidos', 'Ar-Condicionado Inverter'],
      order: 2,
      previousRoomId: 'apt_r1',
      nextRoomId: 'apt_r2_quarto'
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
      previousRoomId: 'apt_r2_root',
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
