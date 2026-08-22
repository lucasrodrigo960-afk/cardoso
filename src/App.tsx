import { useState } from 'react';
import type { Tour, Room } from './types';
import { ALL_PROPERTIES, DEMO_TOUR } from './data/demoData';
import { SplashScreen } from './components/SplashScreen';
import { TourHeader } from './components/TourHeader';
import { HeroOverview } from './components/HeroOverview';
import { PropertyOverview } from './components/PropertyOverview';
import { NativeTour3DViewer } from './components/NativeTour3DViewer';
import { RoomGrid } from './components/RoomGrid';
import { EditorialGallery } from './components/EditorialGallery';
import { InteractiveFloorPlan } from './components/InteractiveFloorPlan';
import { LocationSection } from './components/LocationSection';
import { FactualDetails } from './components/FactualDetails';
import { CommercialPrice } from './components/CommercialPrice';
import { ScheduleVisitSection } from './components/ScheduleVisitSection';
import { Footer } from './components/Footer';
import { RoomModalViewer } from './components/RoomModalViewer';
import { AdminPanelManager } from './components/AdminPanelManager';

export function App() {
  const [allTours, setAllTours] = useState<Tour[]>(() => {
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

  const [currentTour, setCurrentTour] = useState<Tour>(() => allTours[0] || DEMO_TOUR);
  const [showSplash, setShowSplash] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const handleSaveTour = (updatedTour: Tour) => {
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

  const handleEnterTour = () => {
    setShowSplash(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Section Order Mapping
  const sectionOrder = currentTour.sectionOrder || [
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
  ];

  const renderSection = (secId: string) => {
    switch (secId) {
      case 'overview':
        return (
          <HeroOverview
            key="overview"
            tour={currentTour}
            onStartExplore={() => scrollToSection('property-overview')}
          />
        );

      case 'property-overview':
        return <PropertyOverview key="property-overview" tour={currentTour} />;

      case 'tour3d':
        return <NativeTour3DViewer key="tour3d" tour={currentTour} />;

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

      case 'floorplan':
        return (
          <InteractiveFloorPlan
            key="floorplan"
            floorPlanImage={currentTour.floorPlanImage}
            hotspots={currentTour.floorPlanHotspots}
            rooms={currentTour.rooms}
            onSelectRoom={(room) => setSelectedRoom(room)}
          />
        );

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
            onScheduleVisit={() => {
              const whatsappUrl = `https://wa.me/${currentTour.consultantPhone}?text=${encodeURIComponent(
                `Olá, gostaria de agendar uma visita presencial para o imóvel "${currentTour.propertyName}".`
              )}`;
              window.open(whatsappUrl, '_blank');
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen text-zinc-300 font-sans selection:bg-amber-500/20 selection:text-amber-100 transition-colors duration-500"
      style={{
        backgroundColor: currentTour.themeConfig?.backgroundColor || '#0b0c0e',
      }}
    >
      {/* 1. Splash Entrance Screen */}
      {showSplash && (
        <SplashScreen tour={currentTour} onEnter={handleEnterTour} />
      )}

      {/* Main Pure Expository Public Site */}
      <div className={`${showSplash ? 'hidden' : 'block'} transition-opacity duration-700`}>
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
      </div>

      {/* Interactive Room Passage Modal */}
      {selectedRoom && (
        <RoomModalViewer
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
