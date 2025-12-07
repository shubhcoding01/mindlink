// import React from 'react';
// import Link from 'next/link';
// import { Brain, Upload, BarChart3 } from 'lucide-react';
// // If you have a Navbar component, you can import it. 
// // For now, I have included the header inline to match your selected code exactly.

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
//       {/* Header */}
//       <header className="px-6 py-4 flex justify-between items-center bg-white shadow-sm sticky top-0 z-50">
//         <div className="flex items-center gap-2">
//           <Brain className="w-8 h-8 text-indigo-600" />
//           <span className="text-xl font-bold tracking-tight">MindLink</span>
//         </div>
//         <Link 
//           href="/login"
//           className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
//         >
//           Sign In
//         </Link>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-12 mb-20">
//         <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 max-w-4xl leading-tight">
//           Your AI-Powered <span className="text-indigo-600">Personalized</span> Learning Companion
//         </h1>
//         <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
//           Upload your notes, get custom study plans, and master any topic with an AI tutor that adapts to your learning style.
//         </p>
        
//         <div className="flex flex-col sm:flex-row gap-4">
//           <Link 
//             href="/register"
//             className="px-8 py-4 bg-indigo-600 text-white text-lg rounded-xl hover:bg-indigo-700 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 font-semibold flex items-center justify-center"
//           >
//             Get Started for Free
//           </Link>
//           <Link 
//             href="/dashboard"
//             className="px-8 py-4 bg-white text-slate-700 text-lg rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition font-semibold flex items-center justify-center"
//           >
//             View Demo
//           </Link>
//         </div>

//         <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl text-left">
//           {[
//             { icon: Upload, title: "Knowledge Base", desc: "Upload PDFs and notes. We organize them into your personal vector brain." },
//             { icon: Brain, title: "Adaptive AI", desc: "Our RAG engine generates explanations tailored to your visual or textual preference." },
//             { icon: BarChart3, title: "Smart Analytics", desc: "Track weak spots and get automated spaced-repetition schedules." }
//           ].map((feature, idx) => (
//             <div key={idx} className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
//               <feature.icon className="w-10 h-10 text-indigo-500 mb-4" />
//               <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
//               <p className="text-slate-600">{feature.desc}</p>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }

'use client';

import React, { useRef } from 'react';
// --- LOCAL SETUP: Uncomment these lines in your local project ---
// import Link from 'next/link';
// import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// FIXED: Use relative path for preview compatibility
import Navbar from '../components/Navbar';
import { Upload, Brain, BarChart3, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const container = useRef<HTMLDivElement>(null);

  // --- LOCAL SETUP: Uncomment this hook to enable animations ---
  
  useGSAP(() => {
    // 1. Initial State: Hide elements before animation starts
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
      stagger: 0.15, // Stagger cards
    }, "-=0.5"); // Start card animation 0.5s before hero finishes

  }, { scope: container });
  
  // -----------------------------------------------------------

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
          {/* PREVIEW COMPATIBILITY: Using <a> instead of <Link> */}
          <a 
            href="/register"
            className="px-8 py-4 bg-indigo-600 text-white text-lg rounded-xl hover:bg-indigo-700 hover:scale-105 transition-all transform shadow-lg font-semibold flex items-center justify-center gap-2"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </a>
          <a 
            href="/dashboard"
            className="px-8 py-4 bg-white text-slate-700 text-lg rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition font-semibold flex items-center justify-center"
          >
            View Demo
          </a>
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