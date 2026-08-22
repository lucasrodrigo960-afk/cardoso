import { useState } from 'react';
import type { Tour, Room } from './types';
import { ALL_PROPERTIES, DEMO_TOUR } from './data/demoData';
import { SplashScreen } from './components/SplashScreen';
import { TourHeader } from './components/TourHeader';
import { HeroOverview } from './components/HeroOverview';
import { PropertyOverview } from './components/PropertyOverview';
import { VirtualTour3D } from './components/VirtualTour3D';
import { RoomGrid } from './components/RoomGrid';
import { EditorialGallery } from './components/EditorialGallery';
import { InteractiveFloorPlan } from './components/InteractiveFloorPlan';
import { LocationSection } from './components/LocationSection';
import { FactualDetails } from './components/FactualDetails';
import { CommercialPrice } from './components/CommercialPrice';
import { ScheduleVisitSection } from './components/ScheduleVisitSection';
import { Footer } from './components/Footer';
import { RoomModalViewer } from './components/RoomModalViewer';
import { ScheduleModal } from './components/ScheduleModal';
import { AdminPanel } from './components/AdminPanel';

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
  const [showScheduleModal, setShowScheduleModal] = useState(false);
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

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-zinc-300 font-sans selection:bg-amber-500/20 selection:text-amber-100">
      {/* 1. Splash Entrance Screen */}
      {showSplash && (
        <SplashScreen tour={currentTour} onEnter={handleEnterTour} />
      )}

      {/* Main Single/Selected Property View */}
      <div className={`${showSplash ? 'hidden' : 'block'} transition-opacity duration-700`}>
        {/* Navigation Header */}
        <TourHeader
          currentTour={currentTour}
          allTours={allTours}
          onSelectTour={(t) => setCurrentTour(t)}
          onOpenAdmin={() => setShowAdminModal(true)}
          onNavigateTo={scrollToSection}
        />

        {/* Hero Section */}
        <HeroOverview
          tour={currentTour}
          onStartExplore={() => scrollToSection('overview-details')}
          onSelectRoom={(room) => setSelectedRoom(room)}
        />

        {/* "CONHEÇA O IMÓVEL" — Description & Big Thin Numbers with 1px Lines */}
        <PropertyOverview tour={currentTour} />

        {/* "EXPLORE ANTES DE VISITAR" — 3D Virtual Tour Feature */}
        <VirtualTour3D tour={currentTour} />

        {/* Room Grid Explorer */}
        <RoomGrid
          rooms={currentTour.rooms}
          onSelectRoom={(room) => setSelectedRoom(room)}
        />

        {/* Editorial Photo Gallery */}
        <EditorialGallery tour={currentTour} />

        {/* Interactive Floor Plan */}
        <InteractiveFloorPlan
          floorPlanImage={currentTour.floorPlanImage}
          hotspots={currentTour.floorPlanHotspots}
          rooms={currentTour.rooms}
          onSelectRoom={(room) => setSelectedRoom(room)}
        />

        {/* Location & Region Map ("ONDE ESTÁ O IMÓVEL") */}
        <LocationSection tour={currentTour} />

        {/* Factual Technical Sheet ("SOBRE O IMÓVEL" & "O QUE VOCÊ VAI ENCONTRAR") */}
        <FactualDetails tour={currentTour} />

        {/* Commercial Pricing Block ("VALOR DO IMÓVEL") */}
        <CommercialPrice
          tour={currentTour}
          onInterest={() => setShowScheduleModal(true)}
        />

        {/* Schedule & Contact Section ("GOSTOU DO QUE VIU?" + Douglas Cardoso CEO Card) */}
        <ScheduleVisitSection
          tour={currentTour}
          onBackToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onScheduleVisit={() => setShowScheduleModal(true)}
        />

        {/* Minimalist Footer */}
        <Footer />
      </div>

      {/* Interactive Room Experience Modal */}
      {selectedRoom && (
        <RoomModalViewer
          room={selectedRoom}
          allRooms={currentTour.rooms}
          onClose={() => setSelectedRoom(null)}
          onNavigateRoom={(nextRoom) => setSelectedRoom(nextRoom)}
        />
      )}

      {/* Schedule Visit Modal */}
      {showScheduleModal && (
        <ScheduleModal
          tour={currentTour}
          onClose={() => setShowScheduleModal(false)}
        />
      )}

      {/* Admin Panel Modal */}
      {showAdminModal && (
        <AdminPanel
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
