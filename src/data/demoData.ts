import type { Tour } from '../types';

export const DEMO_TOUR: Tour = {
  id: 'tour-vista-mar-01',
  slug: 'casa-vista-mar',
  accessCode: 'VIP2026',
  active: true,
  propertyName: 'CASA VISTA MAR',
  location: 'Maceió — AL',
  price: 'R$ 1.850.000',
  isExactLocation: false,
  address: 'Condomínio Reserva da Maré, Lote 42 - Ponta Verde, Maceió/AL',
  heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
  heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-modern-luxury-house-exterior-41584-large.mp4',
  tagline: 'Entre. Explore. Conheça cada detalhe.',
  details: {
    builtAreaM2: 320,
    landAreaM2: 450,
    bedrooms: 4,
    suites: 3,
    bathrooms: 5,
    parkingSpaces: 3,
    condoFee: 'R$ 1.250 / mês',
    iptu: 'R$ 3.800 / ano',
    features: [
      'Vista Panorâmica do Mar',
      'Piscina Infinita com Aquecimento',
      'Espaço Gourmet Integrado',
      'Automação Residencial Completa',
      'Pé-Direito Duplo de 6 Metros',
      'Sistema de Energia Solar FV',
      'Suíte Master com Closet Master',
      'Acabamento em Mármore Calacatta'
    ]
  },
  rooms: [
    {
      id: 'room-01',
      number: '01',
      name: 'ENTRADA',
      subtitle: 'Hall de entrada imponente com porta pivotal de madeira nobre e projeto luminotécnico assinado.',
      areaM2: 18,
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      photos: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80'
      ],
      characteristics: [
        'Porta Pivotal 3.5m',
        'Piso Mármore Calacatta',
        'Iluminação de LED Embutida',
        'Fechadura Biométrica Intelbras'
      ],
      order: 1
    },
    {
      id: 'room-02',
      number: '02',
      name: 'SALA',
      subtitle: 'Ambiente amplo e iluminado, integrado à área externa e ao jardim de inverno.',
      areaM2: 42,
      coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      photos: [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600566753086-30f13f0b5efd?auto=format&fit=crop&w=1600&q=80'
      ],
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-living-room-with-large-windows-and-modern-decor-41585-large.mp4',
      characteristics: [
        'Pé-direito duplo (6.0m)',
        'Iluminação natural abundante',
        'Porcelanato 120x120cm',
        'Integração total com jardim'
      ],
      order: 2
    },
    {
      id: 'room-03',
      number: '03',
      name: 'COZINHA',
      subtitle: 'Cozinha conceitual minimalista com ilha central em quartzito e eletros embutidos de alta linha.',
      areaM2: 28,
      coverImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      photos: [
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1600&q=80'
      ],
      characteristics: [
        'Ilha Central 3.2m',
        'Armários Planejados Evviva',
        'Torneiras Deca Gold',
        'Despensa Oculta'
      ],
      order: 3
    },
    {
      id: 'room-04',
      number: '04',
      name: 'SUÍTE MASTER',
      subtitle: 'Refúgio de luxo com varanda privativa, vista mar indevassável e walk-in closet senhor e senhora.',
      areaM2: 36,
      coverImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      photos: [
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1600&q=80'
      ],
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-bedroom-with-a-king-size-bed-41586-large.mp4',
      characteristics: [
        'Varanda Privativa com Vista Mar',
        'Piso de Madeira Cumaru',
        'Closet com Vidro Reflexa',
        'Sistema Som Embutido JBL'
      ],
      order: 4
    },
    {
      id: 'room-05',
      number: '05',
      name: 'QUARTO 02',
      subtitle: 'Suíte espaçosa com bancada de estudos integrados e excelente ventilação cruzada.',
      areaM2: 22,
      coverImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      photos: [
        'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80'
      ],
      characteristics: [
        'Suíte com Armário Embutido',
        'Persianas Automatizadas',
        'Ar-Condicionado Inverter'
      ],
      order: 5
    },
    {
      id: 'room-06',
      number: '06',
      name: 'BANHEIRO MASTER',
      subtitle: 'Sala de banho equipada com banheira de imersão, duas cubas e chuveiros duplos de teto.',
      areaM2: 16,
      coverImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      photos: [
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1600&q=80'
      ],
      characteristics: [
        'Banheira de Imersão Jacuzzi',
        'Cubas Duplas Esculpidas',
        'Chuveiros de Teto Axor',
        'Nicho Iluminado'
      ],
      order: 6
    },
    {
      id: 'room-07',
      number: '07',
      name: 'ÁREA GOURMET',
      subtitle: 'Espaço gourmet premium com churrasqueira a gás, chopeira e balcão em granito escovado.',
      areaM2: 35,
      coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      photos: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80'
      ],
      characteristics: [
        'Churrasqueira Inox com Exaustão',
        'Bancada Gourmet Integrada',
        'Fechamento em Cortina de Vidro'
      ],
      order: 7
    },
    {
      id: 'room-08',
      number: '08',
      name: 'PISCINA',
      subtitle: 'Piscina aquecida com borda infinita, hidromassagem e iluminação RGB em LED.',
      areaM2: 45,
      coverImage: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
      photos: [
        'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1600&q=80'
      ],
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-swimming-pool-in-a-luxury-house-41587-large.mp4',
      characteristics: [
        'Borda Infinita para o Mar',
        'Deck de Madeira Ecológica',
        'Hidromassagem Integrada',
        'Aquecimento Solar Dedicado'
      ],
      order: 8
    },
    {
      id: 'room-09',
      number: '09',
      name: 'JARDIM',
      subtitle: 'Projeto paisagístico tropical assinado com espécies maduras, irrigação automática e fire pit.',
      areaM2: 80,
      coverImage: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=1200&q=80',
      photos: [
        'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=1600&q=80'
      ],
      characteristics: [
        'Paisagismo Tropical Adulto',
        'Espaço Fire Pit com Sofás',
        'Sistema de Irrigação Automatizado'
      ],
      order: 9
    },
    {
      id: 'room-10',
      number: '10',
      name: 'GARAGEM',
      subtitle: 'Garagem coberta para 3 veículos de grande porte com ponto de recarga rápida para carros elétricos.',
      areaM2: 50,
      coverImage: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80',
      photos: [
        'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1600&q=80'
      ],
      characteristics: [
        '3 Vagas Cobertas Lado a Lado',
        'Carregador Wallbox 22kW',
        'Depósito Privativo Oculto'
      ],
      order: 10
    }
  ],
  floorPlanImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
  floorPlanHotspots: [
    { roomId: 'room-01', label: 'ENTRADA', x: 18, y: 78 },
    { roomId: 'room-02', label: 'SALA', x: 42, y: 55 },
    { roomId: 'room-03', label: 'COZINHA', x: 75, y: 70 },
    { roomId: 'room-04', label: 'SUÍTE MASTER', x: 30, y: 25 },
    { roomId: 'room-05', label: 'QUARTO 02', x: 68, y: 25 },
    { roomId: 'room-06', label: 'BANHEIRO', x: 48, y: 25 },
    { roomId: 'room-07', label: 'ÁREA GOURMET', x: 75, y: 48 },
    { roomId: 'room-08', label: 'PISCINA', x: 50, y: 88 }
  ],
  regionMapPrint: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80',
  regionMarkers: [
    { id: 'm1', title: 'IMÓVEL EXCLUSIVO', timeText: '📍 LOCALIZAÇÃO', category: 'estate', x: 50, y: 45 },
    { id: 'm2', title: 'PRAIA DA PONTA VERDE', timeText: '3 min', category: 'beach', x: 28, y: 28 },
    { id: 'm3', title: 'PARQUE SHOPPING MACEIÓ', timeText: '5 min', category: 'shopping', x: 75, y: 35 },
    { id: 'm4', title: 'SUPERMERCADO PREMIUM', timeText: '4 min', category: 'supermarket', x: 62, y: 68 },
    { id: 'm5', title: 'ESCOLA INTERNACIONAL', timeText: '7 min', category: 'school', x: 22, y: 75 }
  ],
  consultantName: 'Douglas Cardoso',
  consultantTitle: 'CEO - CRECI 73.567',
  consultantImage: '/assets/ceo-card.png',
  consultantPhone: '5582999999999',
  createdAt: '2026-08-21'
};
