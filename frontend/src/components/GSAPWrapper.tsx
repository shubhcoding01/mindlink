'use client';

import React, { useRef } from 'react';
// --- UNCOMMENT THESE LOCALLY AFTER INSTALLING GSAP ---
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function GSAPWrapper({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // --- UNCOMMENT THIS BLOCK LOCALLY ---
  
  useGSAP(() => {
    // Global initial fade-in animation for the whole app
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    );
  }, { scope: wrapperRef });
  
  // ------------------------------------

  return (
    // Locally, you might want to start with 'opacity-0' so GSAP can fade it in.
    // For this preview, we leave it visible.
    <div ref={wrapperRef} className="w-full h-full"> 
      {children}
    </div>
  );
}