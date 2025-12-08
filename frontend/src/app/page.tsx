'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Upload, Brain, BarChart3, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function LandingPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Initial State: Hide elements before animation starts to prevent flash
    gsap.set(".hero-element", { y: 50, opacity: 0 });
    gsap.set(".feature-card", { y: 30, opacity: 0 });

    // 2. Timeline for Hero Section
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(".hero-element", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2, // Animate title, text, buttons one after another
    })
    .to(".feature-card", {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15, // Stagger the cards quickly
    }, "-=0.5"); // Start card animation 0.5s before hero finishes

  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      <Navbar />

      <main className="flex flex-col items-center justify-center text-center px-4 mt-20 mb-20">
        
        {/* Badge */}
        <div className="hero-element inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-6 border border-indigo-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          v1.0 Public Beta
        </div>

        {/* Hero Title */}
        <h1 className="hero-element text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 max-w-5xl leading-tight tracking-tight">
          Your Second Brain, <br />
          <span className="text-indigo-600">Powered by AI.</span>
        </h1>
        
        {/* Subtitle */}
        <p className="hero-element text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
          MindLink connects your workflows, documents, and learning goals into one intelligent system. Stop searching, start knowing.
        </p>
        
        {/* CTA Buttons */}
        <div className="hero-element flex flex-col sm:flex-row gap-4 mt-2">
          <Link 
            href="/register"
            className="px-8 py-4 bg-indigo-600 text-white text-lg rounded-xl hover:bg-indigo-700 hover:scale-105 transition-all transform shadow-lg font-semibold flex items-center justify-center gap-2"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/dashboard"
            className="px-8 py-4 bg-white text-slate-700 text-lg rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition font-semibold flex items-center justify-center"
          >
            View Demo
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl text-left w-full px-4">
          {[
            { 
              icon: Upload, 
              title: "Vector Memory", 
              desc: "Upload PDFs, Notion docs, and notes. We embed them for instant semantic retrieval." 
            },
            { 
              icon: Brain, 
              title: "Active Reasoning", 
              desc: "Our AI doesn't just chat; it reasons through complex workflows and automates tasks." 
            },
            { 
              icon: BarChart3, 
              title: "Knowledge Graphs", 
              desc: "Visualize how your ideas connect. Spot gaps in your understanding automatically." 
            }
          ].map((feature, idx) => (
            <div 
              key={idx} 
              className="feature-card p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition">
                <feature.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}