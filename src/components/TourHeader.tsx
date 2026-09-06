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
          ? 'bg-[#FFFFFF]/95 backdrop-blur-xl py-3.5 border-b border-[#E5E7EB] shadow-sm'
          : 'bg-[#FFFFFF]/85 backdrop-blur-xl py-4 border-b border-[#E5E7EB]/60'
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
              className="h-8 w-auto object-contain filter drop-shadow-[0_2px_4px_rgba(197,168,128,0.2)]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg text-[#111827] tracking-tight font-light">
                Cardoso <span className="text-[#9C7D54] italic">Imóveis</span>
              </span>
            </div>
          </div>

          {/* Property Selector Dropdown */}
          {allTours.length > 1 && (
            <div className="relative hidden lg:block border-l border-[#E5E7EB] pl-4 ml-2">
              <button
                onClick={() => setPropertyDropdownOpen(!propertyDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F8F9FA] hover:bg-[#F3F4F6] border border-[#E5E7EB] text-xs text-[#4B5563] hover:text-[#111827] transition-all cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5 text-[#9C7D54]" />
                <span className="font-serif truncate max-w-[150px] text-[#111827] font-medium">{currentTour.propertyName}</span>
                <ChevronDown className="w-3 h-3 text-[#6B7280]" />
              </button>

              {propertyDropdownOpen && (
                <div className="absolute top-full left-4 mt-2 w-70 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl shadow-xl py-2 z-50 animate-in fade-in duration-200">
                  <div className="px-3.5 py-1.5 text-[10px] font-mono text-[#9C7D54] uppercase tracking-widest border-b border-[#E5E7EB] mb-1 font-semibold">
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
                          ? 'bg-[#F4EBE1] text-[#9C7D54] font-semibold border-l-2 border-[#9C7D54]'
                          : 'text-[#4B5563] hover:bg-[#F8F9FA] hover:text-[#111827]'
                      }`}
                    >
                      <span className="font-serif text-[#111827]">{item.propertyName}</span>
                      <span className="text-[10px] text-[#6B7280] font-light">{item.location} • {item.price}</span>
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
              className="text-[11px] font-mono uppercase tracking-[0.14em] font-medium text-[#4B5563] hover:text-[#9C7D54] transition-colors duration-200 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: Direct Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleItemClick('contact')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg btn-gold-warm text-xs tracking-wider uppercase cursor-pointer text-white font-semibold shadow-sm"
          >
            Agendar Visita
          </button>

          <button
            onClick={onOpenAdmin}
            title="Painel Administrativo"
            className="text-[#6B7280] hover:text-[#9C7D54] transition-colors cursor-pointer p-1.5 rounded-lg border border-[#E5E7EB] bg-[#F8F9FA]"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden text-[#111827] p-1.5"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FFFFFF]/98 border-b border-[#E5E7EB] px-8 py-6 animate-in slide-in-from-top duration-300 shadow-lg">
          <div className="flex flex-col gap-4">
            {/* Property Selector for Mobile */}
            {allTours.length > 1 && (
              <div className="pb-4 border-b border-[#E5E7EB]">
                <div className="text-[#9C7D54] text-[10px] font-mono uppercase tracking-[0.16em] mb-2 font-semibold">Alternar Imóvel Selecionado</div>
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
                          ? 'border-[#9C7D54] bg-[#F4EBE1] text-[#9C7D54] font-semibold'
                          : 'border-[#E5E7EB] text-[#4B5563] bg-[#F8F9FA]'
                      }`}
                    >
                      <span className="font-serif text-[#111827]">{t.propertyName}</span>
                      <span className="text-[10px] text-[#6B7280]">{t.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="text-left text-xs font-mono uppercase tracking-[0.16em] font-medium text-[#4B5563] hover:text-[#9C7D54] transition-colors"
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
