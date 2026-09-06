import React, { useState, useEffect } from 'react';
import { Menu, X, Settings, ChevronDown, Building2 } from 'lucide-react';
import type { Property } from '../types';

interface TourHeaderProps {
  currentTour: Property;
  allTours: Property[];
  onSelectTour: (tour: Property) => void;
  onOpenAdmin: () => void;
  onNavigateTo: (sectionId: string) => void;
}

export const TourHeader: React.FC<TourHeaderProps> = ({
  currentTour,
  allTours,
  onSelectTour,
  onOpenAdmin,
  onNavigateTo,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [propertyDropdownOpen, setPropertyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Conheça o Imóvel', id: 'overview' },
    { label: 'Tour Virtual 3D', id: 'tour3d' },
    { label: 'Ambientes', id: 'rooms' },
    { label: 'Galeria', id: 'gallery' },
    { label: 'Localização', id: 'location' },
    { label: 'Ficha Técnica', id: 'details' },
  ];

  const handleItemClick = (id: string) => {
    onNavigateTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#14171D]/90 backdrop-blur-xl py-3.5 border-b border-[#252A34] shadow-[0_1px_12px_rgba(0,0,0,0.3)]'
          : 'bg-[#14171D]/75 backdrop-blur-xl py-4 border-b border-[#252A34]/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Property Switcher */}
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleItemClick('overview')}
          >
            <img
              src="/assets/logo-cardoso.png"
              alt="Cardoso Imóveis"
              className="h-8 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(197,168,128,0.3)]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg text-[#F8F9FA] tracking-tight font-light">
                Cardoso <span className="text-[#C5A880] italic">Imóveis</span>
              </span>
            </div>
          </div>

          {/* Property Selector Dropdown */}
          {allTours.length > 1 && (
            <div className="relative hidden lg:block border-l border-[#252A34] pl-4 ml-2">
              <button
                onClick={() => setPropertyDropdownOpen(!propertyDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1A1F27] hover:bg-[#252A34] border border-[#252A34] text-xs text-[#A6ACB8] hover:text-[#F8F9FA] transition-all cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="font-serif truncate max-w-[150px] text-[#F8F9FA]">{currentTour.propertyName}</span>
                <ChevronDown className="w-3 h-3 text-[#687082]" />
              </button>

              {propertyDropdownOpen && (
                <div className="absolute top-full left-4 mt-2 w-70 bg-[#14171D] border border-[#252A34] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in duration-200">
                  <div className="px-3.5 py-1.5 text-[10px] font-mono text-[#C5A880] uppercase tracking-widest border-b border-[#252A34] mb-1">
                    Imóveis Selecionados ({allTours.length})
                  </div>
                  {allTours.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTour(item);
                        setPropertyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs flex flex-col transition-colors ${
                        item.id === currentTour.id
                          ? 'bg-[#C5A880]/10 text-[#C5A880] font-semibold border-l-2 border-[#C5A880]'
                          : 'text-[#A6ACB8] hover:bg-[#1A1F27] hover:text-[#F8F9FA]'
                      }`}
                    >
                      <span className="font-serif text-[#F8F9FA]">{item.propertyName}</span>
                      <span className="text-[10px] text-[#687082] font-light">{item.location} • {item.price}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Center: Editorial Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="text-[11px] font-mono uppercase tracking-[0.14em] font-medium text-[#A6ACB8] hover:text-[#F8F9FA] transition-colors duration-200 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Direct Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleItemClick('contact')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg btn-gold-warm text-xs tracking-wider uppercase cursor-pointer"
          >
            Agendar Visita
          </button>

          <button
            onClick={onOpenAdmin}
            title="Painel Administrativo"
            className="text-[#687082] hover:text-[#C5A880] transition-colors cursor-pointer p-1.5 rounded-lg border border-[#252A34] bg-[#14171D]"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden text-[#F8F9FA] p-1.5"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0D0F12]/98 border-b border-[#252A34] px-8 py-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {/* Property Selector for Mobile */}
            {allTours.length > 1 && (
              <div className="pb-4 border-b border-[#252A34]">
                <div className="text-[#C5A880] text-[10px] font-mono uppercase tracking-[0.16em] mb-2">Alternar Imóvel Selecionado</div>
                <div className="flex flex-col gap-2">
                  {allTours.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        onSelectTour(t);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-left p-2.5 rounded-lg border text-xs flex justify-between items-center ${
                        t.id === currentTour.id
                          ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#C5A880]'
                          : 'border-[#252A34] text-[#A6ACB8] bg-[#14171D]'
                      }`}
                    >
                      <span className="font-serif text-[#F8F9FA]">{t.propertyName}</span>
                      <span className="text-[10px] text-[#687082]">{t.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="text-left text-xs font-mono uppercase tracking-[0.16em] font-medium text-[#A6ACB8] hover:text-[#C5A880] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
