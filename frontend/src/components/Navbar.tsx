'use client';

import React from 'react';
import Link from 'next/link';
import { Brain, ArrowRight } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 z-50 px-6 py-4 transition-all duration-300">
      {/* Glassmorphism Container 
        We use a floating pill-shaped nav for a more modern feel, or a full-width blur strip.
        Here we go with a sleek full-width blur to match the dashboard header style.
      */}
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md border-b border-slate-800/50" />
      
      <div className="relative max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
             <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-100 group-hover:text-white transition-colors">
            MindLink
          </span>
        </Link>
        
        {/* Navigation Actions */}
        <div className="flex items-center gap-6">
          <Link 
            href="/login" 
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Log in
          </Link>
          
          <Link 
            href="/register" 
            className="group relative px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-xl border border-slate-700 hover:border-slate-600 transition-all shadow-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative flex items-center gap-2">
              Initialize System <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
}