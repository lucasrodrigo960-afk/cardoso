import { useState } from 'react';
import type { Tour, Room } from './types';
import { DEMO_TOUR } from './data/demoData';
import { SplashScreen } from './components/SplashScreen';
import { TourHeader } from './components/TourHeader';
import { HeroOverview } from './components/HeroOverview';
import { RoomGrid } from './components/RoomGrid';
import { RoomModalViewer } from './components/RoomModalViewer';
import { InteractiveFloorPlan } from './components/InteractiveFloorPlan';
import { LocationSection } from './components/LocationSection';
import { PropertyDetails } from './components/PropertyDetails';
import { FinalCTA } from './components/FinalCTA';
import { ScheduleModal } from './components/ScheduleModal';
import { AdminPanel } from './components/AdminPanel';

export function App() {
  const [tour, setTour] = useState<Tour>(() => {
    const saved = localStorage.getItem('cardoso_imob_tour_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEMO_TOUR;
      }
    }
    return DEMO_TOUR;
  });

  const [showSplash, setShowSplash] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const handleSaveTour = (updatedTour: Tour) => {
    setTour(updatedTour);
    localStorage.setItem('cardoso_imob_tour_data', JSON.stringify(updatedTour));
  };

  const handleResetDemo = () => {
    setTour(DEMO_TOUR);
    localStorage.removeItem('cardoso_imob_tour_data');
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
    <div className="min-h-screen bg-[#09090b] text-gray-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* 1. Splash Entrance Screen */}
      {showSplash && (
        <SplashScreen tour={tour} onEnter={handleEnterTour} />
      )}

      {/* Main Tour Page Content */}
      <div className={`${showSplash ? 'hidden' : 'block'} transition-opacity duration-700`}>
        {/* Navigation Header */}
        <TourHeader
          tour={tour}
          onOpenAdmin={() => setShowAdminModal(true)}
          onNavigateTo={scrollToSection}
        />

        {/* Main Hero Overview */}
        <HeroOverview
          tour={tour}
          onStartExplore={() => scrollToSection('rooms')}
        />

        {/* Room Grid Explorer ("Explore a Propriedade") */}
        <RoomGrid
          rooms={tour.rooms}
          onSelectRoom={(room) => setSelectedRoom(room)}
        />

        {/* Interactive Floor Plan ("Explore pela Planta") */}
        <InteractiveFloorPlan
          floorPlanImage={tour.floorPlanImage}
          hotspots={tour.floorPlanHotspots}
          rooms={tour.rooms}
          onSelectRoom={(room) => setSelectedRoom(room)}
        />

        {/* Location & Region Map */}
        <LocationSection tour={tour} />

        {/* Property Technical Details */}
        <PropertyDetails tour={tour} />

        {/* Final Tour & Contact Section with CEO Douglas Cardoso Card */}
        <FinalCTA
          tour={tour}
          onBackToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onScheduleVisit={() => setShowScheduleModal(true)}
        />
      </div>

      {/* Room Modal Experience Viewer */}
      {selectedRoom && (
        <RoomModalViewer
          room={selectedRoom}
          allRooms={tour.rooms}
          onClose={() => setSelectedRoom(null)}
          onNavigateRoom={(nextRoom) => setSelectedRoom(nextRoom)}
        />
      )}

      {/* Schedule Visit Modal */}
      {showScheduleModal && (
        <ScheduleModal
          tour={tour}
          onClose={() => setShowScheduleModal(false)}
        />
      )}

      {/* Simple Admin Panel Modal */}
      {showAdminModal && (
        <AdminPanel
          currentTour={tour}
          onSaveTour={handleSaveTour}
          onResetDemo={handleResetDemo}
          onClose={() => setShowAdminModal(false)}
        />
      )}
    </div>
  );
}

export default App;
