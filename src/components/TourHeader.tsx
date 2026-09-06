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
    { label: 'Imóvel', id: 'overview' },
    { label: 'Tour 3D', id: 'tour3d' },
    { label: 'Fotos', id: 'gallery' },
    { label: 'Localização', id: 'location' },
    { label: 'Detalhes', id: 'details' },
    { label: 'Contato', id: 'contact' },
  ];

  const handleItemClick = (id: string) => {
    onNavigateTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#08090A]/95 backdrop-blur-md py-4 border-b border-white/10 shadow-2xl'
          : 'bg-gradient-to-b from-[#08090A]/90 via-[#08090A]/40 to-transparent py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Left: Brand Logo & Property Switcher */}
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleItemClick('overview')}
          >
            <img
              src="/assets/logo-cardoso.png"
              alt="Cardoso Imóveis"
              className="h-8 sm:h-10 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex flex-col border-l border-white/15 pl-3">
              <span className="text-white text-xs font-serif tracking-[0.2em] uppercase font-medium">CARDOSO IMÓVEIS</span>
              <span className="text-amber-400/90 text-[10px] tracking-[0.2em] font-light uppercase">APRESENTAÇÃO EXCLUSIVA</span>
            </div>
          </div>

          {/* Property Selector Dropdown */}
          {allTours.length > 1 && (
            <div className="relative hidden sm:block border-l border-white/15 pl-4 ml-2">
              <button
                onClick={() => setPropertyDropdownOpen(!propertyDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 transition-all cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-serif truncate max-w-[140px]">{currentTour.propertyName}</span>
                <ChevronDown className="w-3 h-3 text-zinc-400" />
              </button>

              {propertyDropdownOpen && (
                <div className="absolute top-full left-4 mt-2 w-64 bg-[#121316] border border-white/15 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in duration-200">
                  <div className="px-3 py-1.5 text-[10px] font-mono text-amber-400 uppercase tracking-widest border-b border-white/10 mb-1">
                    Imóveis Selecionados ({allTours.length})
                  </div>
                  {allTours.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTour(item);
                        setPropertyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs flex flex-col transition-colors ${
                        item.id === currentTour.id
                          ? 'bg-amber-400/10 text-amber-300 font-semibold border-l-2 border-amber-400'
                          : 'text-zinc-300 hover:bg-white/5'
                      }`}
                    >
                      <span className="font-serif text-white">{item.propertyName}</span>
                      <span className="text-[10px] text-zinc-400 font-light">{item.location} • {item.price}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Clean Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="text-xs uppercase tracking-[0.2em] font-light text-zinc-300 hover:text-amber-300 transition-colors duration-300 cursor-pointer"
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={onOpenAdmin}
            title="Painel Administrativo"
            className="text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer p-1"
          >
            <Settings className="w-4 h-4" />
          </button>
        </nav>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onOpenAdmin}
            title="Admin"
            className="text-zinc-400 hover:text-amber-400 p-1"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-1"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#08090A]/98 border-b border-white/10 px-8 py-8 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-5">
            {/* Property Selector for Mobile */}
            {allTours.length > 1 && (
              <div className="pb-4 border-b border-white/10">
                <div className="text-amber-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-2">Alternar Imóvel Selecionado</div>
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
                          ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                          : 'border-white/10 text-zinc-300 bg-white/5'
                      }`}
                    >
                      <span className="font-serif">{t.propertyName}</span>
                      <span className="text-[10px] text-zinc-400">{t.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="text-left text-sm uppercase tracking-[0.2em] font-light text-zinc-200 hover:text-amber-400 transition-colors"
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
