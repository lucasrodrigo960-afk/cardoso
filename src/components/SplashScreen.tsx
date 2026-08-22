import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Tour } from '../types';

interface SplashScreenProps {
  tour: Tour;
  onEnter: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ tour, onEnter }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#08090A] text-white overflow-hidden select-none p-6 md:p-12">
      {/* Background Deep Black Atmosphere with Soft Gold Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Very subtle ambient photo background with high darkness */}
        {tour.heroVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20 filter brightness-[0.4] contrast-[1.1] scale-105"
            src={tour.heroVideo}
          />
        ) : (
          <img
            src={tour.heroImage}
            alt={tour.propertyName}
            className="w-full h-full object-cover opacity-20 filter brightness-[0.4] contrast-[1.1] scale-105"
          />
        )}

        {/* Deep Black Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090A] via-[#08090A]/90 to-[#08090A]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,_rgba(212,175,55,0.08)_0%,_transparent_60%)]" />

        {/* Discrete Ambient Radial Glow behind Giant Logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full filter blur-[160px] pointer-events-none" />
      </div>

      {/* Top Header Label (Context) */}
      <div className="relative z-10 w-full flex justify-between items-center">
        <div className="text-[10px] sm:text-xs font-mono text-amber-400/90 tracking-[0.35em] uppercase font-light">
          TOUR EXCLUSIVE
        </div>

        <div className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] uppercase">
          CARDOSO IMÓVEIS · CRECI 73.567
        </div>
      </div>

      {/* Central Protagonist: GIANT CARDOSO LOGO (Monumental Presence 45%-65% Viewport) */}
      <div className="relative z-10 my-auto flex flex-col items-center text-center px-4">
        {/* Context Badge above Logo */}
        <div className="text-[11px] sm:text-xs font-mono tracking-[0.3em] text-amber-400 uppercase font-light mb-6 opacity-90 animate-in fade-in duration-700">
          EXPERIÊNCIA DIGITAL EXCLUSIVA
        </div>

        {/* GIANT LOGO ASSET (Occupies 45%-65% viewport width) */}
        <div className="relative w-full max-w-[850px] flex items-center justify-center py-2 animate-in fade-in zoom-in-95 duration-1000">
          <img
            src="/assets/logo-hero-gold.jpg"
            alt="CARDOSO IMÓVEIS"
            className="w-[80vw] sm:w-[60vw] md:w-[55vw] max-w-[750px] min-w-[280px] h-auto object-contain mix-blend-screen filter drop-shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-transform duration-700 hover:scale-[1.01]"
          />
        </div>

        {/* Context Text below Logo */}
        <p className="text-sm sm:text-lg font-serif italic text-zinc-300 font-light tracking-wide mt-6 max-w-md animate-in fade-in duration-1000 delay-300">
          "Uma experiência exclusiva desenvolvida para apresentar este imóvel em seus mínimos detalhes."
        </p>
      </div>

      {/* Floating Property Card (Positioned at Bottom Right - Desktop: ~340-380px) */}
      <div className="relative z-20 w-full flex justify-end items-end mt-auto">
        <div className="w-full sm:max-w-[360px] bg-white/[0.025] backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.05)] hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-500 group">
          {/* Card Top: Small Photo + Reservation Info */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 bg-black">
              <img
                src={tour.heroImage}
                alt={tour.propertyName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-[0.9]"
              />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono text-amber-400 tracking-widest uppercase font-semibold">
                IMÓVEL RESERVADO
              </span>
              <h4 className="text-base font-serif font-light text-white tracking-wide leading-snug line-clamp-1 group-hover:text-amber-300 transition-colors">
                {tour.propertyName}
              </h4>
              <span className="text-xs text-zinc-400 font-light truncate">
                {tour.location}
              </span>
              <span className="text-xs font-serif font-semibold text-white mt-0.5">
                {tour.price}
              </span>
            </div>
          </div>

          {/* Action Button: ENTRAR NO TOUR */}
          <button
            onClick={onEnter}
            className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all duration-300 cursor-pointer flex items-center justify-between group/btn"
          >
            <span>ENTRAR NO TOUR</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
