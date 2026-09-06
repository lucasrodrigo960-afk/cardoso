import React from 'react';
import { ArrowLeft, ArrowRight, ChevronRight, Layers } from 'lucide-react';
import type { Room } from '../types';

interface ContextualTourNavigationProps {
  activeRoom: Room;
  allRooms: Room[];
  onNavigateToRoom: (room: Room) => void;
}

export const ContextualTourNavigation: React.FC<ContextualTourNavigationProps> = ({
  activeRoom,
  allRooms,
  onNavigateToRoom,
}) => {
  // 1. Resolve Parent Room (if current room is a child/subroom)
  const parentRoom = activeRoom.parentId
    ? allRooms.find((r) => r.id === activeRoom.parentId)
    : null;

  // 2. Resolve Children / Subrooms (if current room is a parent/suite)
  const directChildren = allRooms.filter((r) => r.parentId === activeRoom.id);

  // 3. Resolve Sibling Subrooms (if current room shares the same parent)
  const siblingSubrooms = activeRoom.parentId
    ? allRooms.filter((r) => r.parentId === activeRoom.parentId)
    : [];

  // Group of contextual subrooms to display
  const contextualSubrooms = parentRoom ? siblingSubrooms : directChildren;

  // 4. Resolve Next Sibling Subroom (e.g. Quarto -> Banheiro)
  let nextSiblingRoom: Room | null = null;
  if (contextualSubrooms.length > 0) {
    const currentIndex = contextualSubrooms.findIndex((r) => r.id === activeRoom.id);
    if (currentIndex >= 0 && currentIndex < contextualSubrooms.length - 1) {
      nextSiblingRoom = contextualSubrooms[currentIndex + 1];
    } else if (currentIndex === -1 && directChildren.length > 0) {
      nextSiblingRoom = directChildren[0];
    }
  }

  // 5. Resolve Explicit Next Sequential Room (if no next sibling)
  const nextSequentialRoom = activeRoom.nextRoomId
    ? allRooms.find((r) => r.id === activeRoom.nextRoomId)
    : null;

  const primaryNextTarget = nextSiblingRoom || nextSequentialRoom;

  // 6. Resolve Previous Room
  const prevSequentialRoom = activeRoom.previousRoomId
    ? allRooms.find((r) => r.id === activeRoom.previousRoomId)
    : null;

  return (
    <div className="w-full flex flex-col gap-4 py-4 border-t border-white/10 text-white select-none">
      {/* Contextual Hierarchy Path (e.g., SUÍTE 01 → QUARTO) */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-mono text-zinc-400">
          {parentRoom ? (
            <>
              <button
                onClick={() => onNavigateToRoom(parentRoom)}
                className="hover:text-amber-400 transition-colors cursor-pointer uppercase font-semibold text-amber-300"
              >
                {parentRoom.name}
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-white uppercase font-bold">{activeRoom.name}</span>
            </>
          ) : (
            <span className="text-white font-mono uppercase font-bold tracking-wider">
              {activeRoom.number} · {activeRoom.name}
            </span>
          )}
        </div>

        {/* Back to Parent Button (if in a subroom) */}
        {parentRoom && (
          <button
            onClick={() => onNavigateToRoom(parentRoom)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer border border-white/10"
          >
            <ArrowLeft className="w-3 h-3 text-amber-400" />
            <span>VOLTAR PARA {parentRoom.name}</span>
          </button>
        )}
      </div>

      {/* Contextual Sub-rooms Selector Bar (e.g., AMBIENTES DA SUÍTE 01: [QUARTO] [CLOSET] [BANHEIRO]) */}
      {contextualSubrooms.length > 0 && (
        <div className="p-3 rounded-2xl bg-[#0b0c0e]/80 border border-white/10 backdrop-blur-md flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[10px] font-mono text-amber-400 uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>
              AMBIENTES DA {parentRoom ? parentRoom.name : activeRoom.name} ({contextualSubrooms.length})
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none">
            {contextualSubrooms.map((subroom) => {
              const isActive = subroom.id === activeRoom.id;
              return (
                <button
                  key={subroom.id}
                  onClick={() => onNavigateToRoom(subroom)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all flex-shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md scale-105'
                      : 'bg-white/5 hover:bg-white/15 text-zinc-300 border border-white/10'
                  }`}
                >
                  <span>{subroom.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Sequential & Contextual Navigation Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        {/* Previous Button */}
        {prevSequentialRoom ? (
          <button
            onClick={() => onNavigateToRoom(prevSequentialRoom)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← {prevSequentialRoom.name}</span>
          </button>
        ) : (
          <div />
        )}

        {/* Next Contextual Target Button (e.g. ENTRAR NO BANHEIRO →) */}
        {primaryNextTarget && (
          <button
            onClick={() => onNavigateToRoom(primaryNextTarget)}
            className="btn-gold-warm px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-2 shadow-lg cursor-pointer ml-auto"
          >
            <span>
              {nextSiblingRoom
                ? `ENTRAR NO ${nextSiblingRoom.name.toUpperCase()} →`
                : `${primaryNextTarget.name.toUpperCase()} →`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
