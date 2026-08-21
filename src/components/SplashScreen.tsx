import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import type { Tour } from '../types';

interface SplashScreenProps {
  tour: Tour;
  onEnter: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ tour, onEnter }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0c0e] text-white overflow-hidden select-none">
      {/* Background Media with Dark Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {tour.heroVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50 filter brightness-[0.7] contrast-[1.1] scale-105"
            src={tour.heroVideo}
          />
        ) : (
          <img
            src={tour.heroImage}
            alt={tour.propertyName}
            className="w-full h-full object-cover opacity-45 filter brightness-[0.7] contrast-[1.1] scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c0e] via-[#0b0c0e]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-transparent to-[#0b0c0e]/80" />
      </div>

      {/* Content Container (Split UI inspired by Nexora / Reference 3 & Reference 2) */}
      <div className="relative z-10 max-w-6xl w-full px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Dramatic Architectural Welcome Text */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          <div className="flex items-center gap-3 text-amber-400 text-xs font-mono tracking-[0.25em] uppercase mb-4">
            <span className="w-1.5 h-6 bg-amber-400 rounded-full" />
            <span>ESTE IMÓVEL É EXCLUSIVO CARDOSO IMÓVEIS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight text-white font-serif tracking-tight mb-4 leading-none">
            TOUR EXCLUSIVE
          </h1>

          <p className="text-lg sm:text-2xl font-serif italic text-amber-200/90 font-light mb-6">
            "{tour.tagline || 'Entre. Explore. Conheça cada detalhe.'}"
          </p>

          <p className="text-sm text-zinc-300 font-light max-w-md leading-relaxed mb-8">
            Seja bem-vindo a uma experiência de visita digital privativa. Conheça cada detalhe desta propriedade de alto padrão em um tour imersivo.
          </p>

          <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono tracking-widest uppercase">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>CONVITE PRIVATIVO · CRECI 73.567</span>
          </div>
        </div>

        {/* Right Side: Ultra-Sleek Frosted Glass Entrance Card (Inspired by Reference 2 & 3) */}
        <div className="lg:col-span-6 glass-dark-card rounded-3xl p-8 sm:p-10 border border-white/15 flex flex-col items-center text-center shadow-2xl">
          {/* Logo 3D (mix-blend-screen eliminates black box) */}
          <div className="relative h-24 sm:h-32 mb-6 flex items-center justify-center">
            <img
              src="/assets/logo-hero-gold.jpg"
              alt="Cardoso Imob"
              className="h-full w-auto object-contain mix-blend-screen filter drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            />
          </div>

          {/* Property Card Pill */}
          <div className="w-full bg-[#141518]/90 p-4 rounded-2xl border border-white/10 flex items-center gap-4 text-left mb-8">
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-amber-400/40">
              <img src={tour.heroImage} alt={tour.propertyName} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-[10px] text-amber-400 uppercase font-mono tracking-widest">Imóvel Reservado</div>
              <div className="text-base font-serif font-light text-white">{tour.propertyName}</div>
              <div className="text-xs text-zinc-400 font-light">{tour.location} · {tour.price}</div>
            </div>
          </div>

          {/* Warm Gold Button (Inspired by Nexora Reference 3) */}
          <button
            onClick={onEnter}
            className="btn-gold-warm w-full py-4 px-8 rounded-2xl font-bold text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>ENTRAR NO TOUR</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
