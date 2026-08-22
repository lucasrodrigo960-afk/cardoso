import React, { useState } from 'react';
import { Play, Compass } from 'lucide-react';
import type { Tour } from '../types';

interface VirtualTour3DProps {
  tour: Tour;
  onOpenFullscreen?: () => void;
}

export const VirtualTour3D: React.FC<VirtualTour3DProps> = ({ tour }) => {
  const [isPlaying3D, setIsPlaying3D] = useState(false);

  return (
    <section id="tour3d" className="py-24 md:py-32 px-6 sm:px-12 max-w-7xl mx-auto bg-[#0b0c0e]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-amber-400 font-mono text-xs tracking-[0.25em] uppercase mb-3">
          Experiência Virtual Imersiva
        </div>
        <h2 className="text-4xl sm:text-6xl font-extralight text-white font-serif tracking-tight mb-4">
          EXPLORE ANTES DE VISITAR
        </h2>
        <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
          Conheça os ambientes do imóvel através do nosso tour virtual em 360 graus. Navegue pela arquitetura e sinta a sensação de estar dentro da propriedade.
        </p>
      </div>

      {/* Giant 3D Tour Viewer Box */}
      <div className="relative w-full h-[450px] sm:h-[600px] md:h-[700px] bg-[#121316] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        {!isPlaying3D ? (
          /* Cover Backdrop Preview before loading interactive 3D tour */
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
            <img
              src={tour.heroImage}
              alt={tour.propertyName}
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.45] contrast-[1.1]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-transparent to-black/50" />

            <div className="relative z-20 max-w-lg flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.6)] mb-6 hover:scale-110 transition-transform cursor-pointer" onClick={() => setIsPlaying3D(true)}>
                <Play className="w-8 h-8 fill-slate-950 ml-1" />
              </div>

              <div className="text-xs font-mono text-amber-300 uppercase tracking-[0.25em] mb-2">
                Tour Virtual 3D · Interativo
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif font-light text-white mb-3">
                {tour.propertyName}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-light mb-8 max-w-md">
                Clique abaixo para carregar a navegação tridimensional interativa por todos os ambientes do imóvel.
              </p>

              <button
                onClick={() => setIsPlaying3D(true)}
                className="btn-gold-warm px-8 py-4 rounded-2xl text-xs uppercase tracking-[0.25em] flex items-center gap-3 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>INICIAR TOUR 3D</span>
              </button>
            </div>
          </div>
        ) : (
          /* Embedded Interactive 3D Viewer Container */
          <div className="relative w-full h-full bg-black">
            {tour.tour3DUrl.includes('matterport') ? (
              <iframe
                src={tour.tour3DUrl}
                className="w-full h-full border-0"
                allow="fullscreen; accelerator; copilot; encrypted-media; gyroscope; picture-in-picture"
                title="Tour Virtual 3D Matterport"
              />
            ) : (
              /* Fallback Interactive Virtual Tour 360 Experience */
              <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#08080a]">
                <img
                  src={tour.rooms[0]?.coverImage || tour.heroImage}
                  alt="3D Tour"
                  className="absolute inset-0 w-full h-full object-cover opacity-70 filter brightness-[0.7]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                <div className="relative z-20 max-w-md text-center">
                  <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
                    Visualização Virtual em 360°
                  </div>
                  <h4 className="text-xl font-serif text-white mb-4">Navegação Tridimensional Ativa</h4>
                  <p className="text-xs text-zinc-300 font-light mb-6">
                    Você pode alterar os cômodos ou visualizar fotos em alta definição diretamente no menu de ambientes abaixo.
                  </p>

                  <button
                    onClick={() => setIsPlaying3D(false)}
                    className="px-6 py-2.5 rounded-full bg-white/10 text-white text-xs font-light tracking-widest uppercase hover:bg-white/20"
                  >
                    Sair do Modo 3D
                  </button>
                </div>
              </div>
            )}

            {/* Top Control Bar inside 3D viewer */}
            <div className="absolute top-4 right-4 z-30 flex items-center gap-3">
              <button
                onClick={() => setIsPlaying3D(false)}
                className="px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono text-white hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                FECHAR 3D
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
