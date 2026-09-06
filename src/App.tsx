import { useState } from 'react';
import type { Property, Room } from './types';
import { ALL_PROPERTIES, DEMO_TOUR } from './data/demoData';
import { TourHeader } from './components/TourHeader';
import { HeroOverview } from './components/HeroOverview';
import { PropertyOverview } from './components/PropertyOverview';
import { GuidedTourBar } from './components/GuidedTourBar';
import { PropertyVisualIndexMap } from './components/PropertyVisualIndexMap';
import { RoomGrid } from './components/RoomGrid';
import { EditorialGallery } from './components/EditorialGallery';
import { LocationSection } from './components/LocationSection';
import { FactualDetails } from './components/FactualDetails';
import { CommercialPrice } from './components/CommercialPrice';
import { ScheduleVisitSection } from './components/ScheduleVisitSection';
import { Footer } from './components/Footer';
import { RoomPresenterModal } from './components/RoomPresenterModal';
import { AdminPanelManager } from './components/AdminPanelManager';

export function App() {
  const [allTours, setAllTours] = useState<Property[]>(() => {
    const saved = localStorage.getItem('cardoso_imoveis_tours');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return ALL_PROPERTIES;
      }
    }
    return ALL_PROPERTIES;
  });

  const [currentTour, setCurrentTour] = useState<Property>(() => allTours[0] || DEMO_TOUR);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const handleSaveTour = (updatedTour: Property) => {
    setCurrentTour(updatedTour);
    const updatedList = allTours.map((t) => (t.id === updatedTour.id ? updatedTour : t));
    setAllTours(updatedList);
    localStorage.setItem('cardoso_imoveis_tours', JSON.stringify(updatedList));
  };

  const handleResetDemo = () => {
    setCurrentTour(ALL_PROPERTIES[0]);
    setAllTours(ALL_PROPERTIES);
    localStorage.removeItem('cardoso_imoveis_tours');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Section Order Mapping (Definitive photographic presentation layout)
  const sectionOrder = currentTour.sectionOrder || [
    'overview',
    'property-overview',
    'tour3d',
    'rooms',
    'gallery',
    'location',
    'details',
    'commercial',
    'contact'
  ];

  const renderSection = (secId: string) => {
    switch (secId) {
      case 'overview':
        return (
          <HeroOverview
            key="overview"
            tour={currentTour}
            onStartExplore={() => scrollToSection('tour3d')}
          />
        );

      case 'property-overview':
        return <PropertyOverview key="property-overview" tour={currentTour} />;

      case 'tour3d':
        return (
          <div key="tour3d" className="w-full">
            {/* Guided Tour Bar Controls */}
            <GuidedTourBar
              tour={currentTour}
              onSelectRoom={(room) => setSelectedRoom(room)}
            />
            {/* Architectural Visual Index Map */}
            <PropertyVisualIndexMap
              tour={currentTour}
              onSelectRoom={(room) => setSelectedRoom(room)}
            />
          </div>
        );

      case 'rooms':
        return (
          <RoomGrid
            key="rooms"
            rooms={currentTour.rooms}
            onSelectRoom={(room) => setSelectedRoom(room)}
          />
        );

      case 'gallery':
        return <EditorialGallery key="gallery" tour={currentTour} />;

      case 'location':
        return <LocationSection key="location" tour={currentTour} />;

      case 'details':
        return <FactualDetails key="details" tour={currentTour} />;

      case 'commercial':
        return (
          <CommercialPrice
            key="commercial"
            tour={currentTour}
            onInterest={() => {
              const whatsappUrl = `https://wa.me/${currentTour.consultantPhone}?text=${encodeURIComponent(
                `Olá, gostaria de saber mais informações sobre o imóvel "${currentTour.propertyName}".`
              )}`;
              window.open(whatsappUrl, '_blank');
            }}
          />
        );

      case 'contact':
        return (
          <ScheduleVisitSection
            key="contact"
            tour={currentTour}
            onBackToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen text-[#111827] font-sans selection:bg-[#C5A880]/30 selection:text-[#9C7D54] transition-colors duration-500 bg-[#FBFBFC]"
    >
      {/* Navigation Header */}
      <TourHeader
        currentTour={currentTour}
        allTours={allTours}
        onSelectTour={(t) => setCurrentTour(t)}
        onOpenAdmin={() => setShowAdminModal(true)}
        onNavigateTo={scrollToSection}
      />

      {/* Dynamic Reorderable Sections Presentation */}
      {sectionOrder.map((secId) => renderSection(secId))}

      {/* Minimalist Footer */}
      <Footer />

      {/* Room Photographic Presentation Modal */}
      {selectedRoom && (
        <RoomPresenterModal
          room={selectedRoom}
          allRooms={currentTour.rooms}
          onClose={() => setSelectedRoom(null)}
          onNavigateRoom={(nextRoom) => setSelectedRoom(nextRoom)}
        />
      )}

      {/* Admin Panel Manager */}
      {showAdminModal && (
        <AdminPanelManager
          currentTour={currentTour}
          onSaveTour={handleSaveTour}
          onResetDemo={handleResetDemo}
          onClose={() => setShowAdminModal(false)}
        />
      )}
    </div>
  );
}

export default App;
