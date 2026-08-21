import React, { useState, useEffect } from 'react';
import { Menu, X, Settings } from 'lucide-react';
import type { Tour } from '../types';

interface TourHeaderProps {
  tour: Tour;
  onOpenAdmin: () => void;
  onNavigateTo: (sectionId: string) => void;
}

export const TourHeader: React.FC<TourHeaderProps> = ({ tour, onOpenAdmin, onNavigateTo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Imóvel', id: 'overview' },
    { label: 'Ambientes', id: 'rooms' },
    { label: 'Planta', id: 'floorplan' },
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
          ? 'bg-[#08080a]/95 backdrop-blur-md py-4 border-b border-white/10 shadow-2xl'
          : 'bg-gradient-to-b from-[#08080a]/90 via-[#08080a]/40 to-transparent py-6 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleItemClick('overview')}>
          <img
            src="/assets/logo-cardoso.png"
            alt="Cardoso Imob"
            className="h-9 sm:h-11 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col border-l border-white/15 pl-4">
            <span className="text-white text-xs font-serif tracking-[0.2em] uppercase font-medium">CARDOSO IMOB</span>
            <span className="text-amber-400/90 text-[10px] tracking-[0.25em] font-light uppercase">TOUR EXCLUSIVE</span>
          </div>
        </div>

        {/* Center: Discrete Property Indicator (Desktop) */}
        <div className="hidden lg:flex items-center gap-2.5 text-xs text-zinc-400 font-light">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-white font-serif tracking-wide">{tour.propertyName}</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">{tour.location}</span>
        </div>

        {/* Right: Clean Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
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
        <div className="flex md:hidden items-center gap-4">
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
        <div className="md:hidden bg-[#08080a]/98 border-b border-white/10 px-8 py-8 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-6">
            <div className="pb-4 border-b border-white/10">
              <div className="text-amber-400 text-[10px] uppercase tracking-[0.25em]">Apresentação Privativa</div>
              <div className="text-white font-serif text-2xl mt-1">{tour.propertyName}</div>
              <div className="text-zinc-400 text-xs mt-1">{tour.location} • {tour.price}</div>
            </div>

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
