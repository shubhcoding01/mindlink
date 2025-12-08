// 'use client';

// import React, { useRef } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// interface Skiper40Props {
//   children: React.ReactNode;
//   className?: string;
// }

// export function Skiper40({ children, className = '' }: Skiper40Props) {
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: 'left' | 'right') => {
//     if (scrollRef.current) {
//       const { current } = scrollRef;
//       const scrollAmount = direction === 'left' ? -300 : 300;
//       current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className={`relative group ${className}`}>
//       {/* Left Navigation Button */}
//       <button
//         onClick={() => scroll('left')}
//         className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 hover:bg-slate-50"
//         aria-label="Skip Left"
//       >
//         <ChevronLeft className="w-5 h-5 text-slate-700" />
//       </button>

//       {/* Scroll Container */}
//       <div
//         ref={scrollRef}
//         className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
//         style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//       >
//         {children}
//       </div>

//       {/* Right Navigation Button */}
//       <button
//         onClick={() => scroll('right')}
//         className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-50"
//         aria-label="Skip Right"
//       >
//         <ChevronRight className="w-5 h-5 text-slate-700" />
//       </button>
//     </div>
//   );
// }

// export function SkiperItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
//   return (
//     <div className={`snap-center shrink-0 ${className}`}>
//       {children}
//     </div>
//   );
// }

'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Skiper40Props {
  children: React.ReactNode;
  className?: string;
}

export function Skiper40({ children, className = '' }: Skiper40Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -320 : 320;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Left Navigation Button - Dark Mode */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 p-2.5 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-800 hover:border-indigo-500/50 hover:text-white text-slate-400 disabled:opacity-0"
        aria-label="Skip Left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>

      {/* Right Navigation Button - Dark Mode */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 p-2.5 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-800 hover:border-indigo-500/50 hover:text-white text-slate-400"
        aria-label="Skip Right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

export function SkiperItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`snap-center shrink-0 ${className}`}>
      {children}
    </div>
  );
}