// 'use client';

// import React, { useRef, useState } from 'react';
// import Link from 'next/link';
// // LOCAL SETUP: ensure Navbar import matches your path
// import Navbar from '@/components/Navbar'; 
// import { 
//   Upload, Brain, BarChart3, ArrowRight, Zap, 
//   Layers, ShieldCheck, Cpu, Network, Activity, Lock 
// } from 'lucide-react';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // Register ScrollTrigger safely
// if (typeof window !== 'undefined') {
//   gsap.registerPlugin(ScrollTrigger);
// }

// // --- 3D HERO INTERFACE COMPONENT ---
// const HeroInterface = () => {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const glowRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!cardRef.current || !glowRef.current || !contentRef.current) return;
    
//     const rect = cardRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const centerX = rect.width / 2;
//     const centerY = rect.height / 2;
    
//     // 1. Calculate Rotation (Max 15 degrees)
//     const rotateX = ((y - centerY) / centerY) * -10;
//     const rotateY = ((x - centerX) / centerX) * 10;

//     // 2. Animate Card Rotation
//     gsap.to(cardRef.current, {
//       rotateX: rotateX,
//       rotateY: rotateY,
//       duration: 0.5,
//       ease: "power2.out",
//       transformPerspective: 1000,
//     });

//     // 3. Move Glare/Glow effect
//     gsap.to(glowRef.current, {
//       x: x - rect.width / 2,
//       y: y - rect.height / 2,
//       opacity: 0.6,
//       duration: 0.4,
//       ease: "power2.out"
//     });

//     // 4. Parallax Effect for Inner Content (Moves slightly opposite to tilt)
//     gsap.to(contentRef.current, {
//       x: (x - centerX) / 30,
//       y: (y - centerY) / 30,
//       duration: 0.5,
//       ease: "power2.out"
//     });
//   };

//   const handleMouseLeave = () => {
//     if (!cardRef.current || !glowRef.current || !contentRef.current) return;
    
//     // Reset all positions
//     gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 1, ease: "elastic.out(1, 0.5)" });
//     gsap.to(glowRef.current, { opacity: 0, duration: 0.5 });
//     gsap.to(contentRef.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.5)" });
//   };

//   return (
//     <div className="relative w-full max-w-5xl mx-auto perspective-1000 py-10" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
       
//        {/* 3D Container */}
//        <div 
//          ref={cardRef}
//          className="floating-ui relative rounded-2xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-xl shadow-2xl overflow-hidden aspect-video md:aspect-[21/9] group"
//          style={{ transformStyle: 'preserve-3d' }}
//        >
//           {/* Dynamic Glare Overlay */}
//           <div 
//             ref={glowRef}
//             className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 z-20 mix-blend-overlay"
//           />

//           {/* Top Scanning Line Animation */}
//           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50 animate-scan z-30" />

//           {/* --- Mock Browser Header --- */}
//           <div className="h-12 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between px-4 z-10 relative">
//              <div className="flex gap-2">
//                 <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm" />
//                 <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm" />
//                 <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm" />
//              </div>
//              <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-full">
//                 <Lock className="w-3 h-3 text-slate-500" />
//                 <span className="text-[10px] font-mono text-slate-500">mindlink.ai/neural-core</span>
//              </div>
//              <div className="w-16" /> {/* Spacer */}
//           </div>

//           {/* --- Main Dashboard Content (Parallax Layer) --- */}
//           <div ref={contentRef} className="p-8 grid grid-cols-12 gap-6 h-full relative z-10">
             
//              {/* Sidebar Mock */}
//              <div className="col-span-3 space-y-4 border-r border-slate-800/50 pr-6 hidden md:block">
//                 <div className="h-8 w-3/4 bg-slate-800/50 rounded-lg animate-pulse" />
//                 {[1, 2, 3].map(i => (
//                   <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 border border-white/5">
//                     <div className="w-8 h-8 rounded bg-indigo-500/20" />
//                     <div className="h-2 w-12 bg-slate-700 rounded" />
//                   </div>
//                 ))}
//                 <div className="h-32 w-full bg-indigo-900/10 border border-indigo-500/20 rounded-xl mt-8 relative overflow-hidden">
//                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent" />
//                    <Activity className="absolute bottom-4 left-4 w-6 h-6 text-indigo-400" />
//                 </div>
//              </div>

//              {/* Main Area */}
//              <div className="col-span-12 md:col-span-9 flex flex-col gap-6">
                
//                 {/* Header Stats */}
//                 <div className="flex gap-4">
//                    <div className="flex-1 h-24 bg-slate-800/30 rounded-xl border border-slate-700/50 p-4 relative overflow-hidden group/stat">
//                       <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 translate-x-[-100%] group-hover/stat:translate-x-[100%] transition-transform duration-1000" />
//                       <div className="h-2 w-12 bg-slate-700 rounded mb-2" />
//                       <div className="h-6 w-24 bg-slate-600 rounded" />
//                    </div>
//                    <div className="flex-1 h-24 bg-slate-800/30 rounded-xl border border-slate-700/50 p-4 relative overflow-hidden group/stat">
//                       <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 translate-x-[-100%] group-hover/stat:translate-x-[100%] transition-transform duration-1000" />
//                       <div className="h-2 w-12 bg-slate-700 rounded mb-2" />
//                       <div className="h-6 w-24 bg-slate-600 rounded" />
//                    </div>
//                    <div className="flex-1 h-24 bg-slate-800/30 rounded-xl border border-slate-700/50 p-4 hidden sm:block" />
//                 </div>

//                 {/* Chat / Data Viz Area */}
//                 <div className="flex-1 bg-slate-900/50 rounded-xl border border-slate-800/50 p-6 relative overflow-hidden">
//                    {/* Background Grid inside UI */}
//                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                   
//                    <div className="flex items-start gap-4 mb-6">
//                       <div className="w-10 h-10 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center border border-white/10 shadow-lg shadow-indigo-500/20">
//                          <Brain className="w-5 h-5 text-white" />
//                       </div>
//                       <div className="space-y-2 w-full max-w-lg">
//                          <div className="h-4 w-1/4 bg-slate-700/50 rounded" />
//                          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 text-xs text-slate-400 font-mono">
//                             Analyzing vector embeddings... <br/>
//                             <span className="text-emerald-400">Context retrieved: 98.4% match</span>
//                          </div>
//                       </div>
//                    </div>

//                    <div className="flex items-start gap-4 flex-row-reverse">
//                       <div className="w-10 h-10 rounded-full bg-emerald-600 flex-shrink-0 flex items-center justify-center border border-white/10">
//                          <div className="w-2 h-2 bg-white rounded-full animate-ping" />
//                       </div>
//                       <div className="space-y-2 w-full max-w-lg flex flex-col items-end">
//                          <div className="h-4 w-1/4 bg-slate-700/50 rounded" />
//                          <div className="h-16 w-3/4 bg-emerald-900/10 rounded-lg border border-emerald-500/20 relative overflow-hidden">
//                             <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent animate-shimmer" />
//                          </div>
//                       </div>
//                    </div>
//                 </div>

//              </div>
//           </div>
//        </div>
       
//        {/* Ambient Glow Behind Card */}
//        <div className="absolute -inset-4 bg-indigo-500/20 blur-[100px] -z-10 rounded-[3rem] opacity-50" />
//     </div>
//   );
// };


// export default function LandingPage() {
//   const container = useRef<HTMLDivElement>(null);

//   useGSAP(() => {
//     const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

//     // Initial Setup
//     gsap.set(".fade-in-up", { y: 30, opacity: 0 });
//     gsap.set(".bento-item", { scale: 0.9, opacity: 0 });

//     // Header Animation
//     tl.to(".fade-in-up", {
//       y: 0,
//       opacity: 1,
//       duration: 1.2,
//       stagger: 0.15,
//     });

//     // Feature Grid Animation
//     gsap.utils.toArray('.feature-section').forEach((section: any) => {
//       gsap.to(section.querySelectorAll('.feature-card'), {
//         scrollTrigger: {
//           trigger: section,
//           start: "top 80%",
//           toggleActions: "play none none reverse",
//         },
//         y: 0,
//         opacity: 1,
//         duration: 0.8,
//         stagger: 0.1,
//       });
//     });

//     // Bento Grid Animation
//     gsap.to(".bento-item", {
//       scrollTrigger: {
//         trigger: ".bento-grid",
//         start: "top 75%",
//       },
//       scale: 1,
//       opacity: 1,
//       duration: 0.6,
//       stagger: 0.1,
//       ease: "back.out(1.5)"
//     });

//   }, { scope: container });

//   return (
//     <div ref={container} className="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-indigo-500/30 overflow-x-hidden">
      
//       {/* Global Background Ambience */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
//          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen" />
//       </div>

//       <div className="relative z-10">
//         <Navbar />

//         {/* --- HERO SECTION --- */}
//         <section className="relative pt-32 pb-20 px-6 lg:px-8 flex flex-col items-center text-center">
          
//           <div className="fade-in-up mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-md text-indigo-400 text-xs font-bold tracking-wide uppercase shadow-xl hover:border-indigo-500/50 transition-colors cursor-default">
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
//             </span>
//             Vibe Code 2025 • Gemini 3 Pro Integration
//           </div>

//           <h1 className="fade-in-up text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 max-w-5xl leading-[1.1]">
//             Unlock Your <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 animate-gradient-x">
//               Cognitive Potential
//             </span>
//           </h1>
          
//           <p className="fade-in-up text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-light">
//             MindLink fuses <strong className="text-slate-200">Retrieval-Augmented Generation</strong> with your personal data to create an adaptive, hyper-personalized learning companion.
//           </p>
          
//           <div className="fade-in-up flex flex-col sm:flex-row gap-4 w-full justify-center">
//             <Link 
//               href="/register"
//               className="group relative px-8 py-4 bg-indigo-600 text-white text-lg rounded-2xl overflow-hidden shadow-2xl shadow-indigo-900/40 transition-all hover:scale-105 hover:shadow-indigo-600/50"
//             >
//               <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
//               <span className="relative flex items-center justify-center gap-2 font-semibold">
//                 Initialize System <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </span>
//             </Link>
            
//             <Link 
//               href="/dashboard"
//               className="px-8 py-4 bg-slate-900 text-slate-300 text-lg rounded-2xl border border-slate-800 hover:bg-slate-800 hover:text-white transition-all font-medium flex items-center justify-center gap-2 backdrop-blur-sm"
//             >
//               <Zap className="w-5 h-5 text-yellow-500" /> Live Demo
//             </Link>
//           </div>

//           {/* --- NEW INTERACTIVE HERO UI --- */}
//           <div className="fade-in-up w-full mt-12">
//              <HeroInterface />
//           </div>

//         </section>

//         {/* --- BENTO GRID FEATURES --- */}
//         <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 mb-4">
//               Architected for Intelligence
//             </h2>
//             <p className="text-slate-400 text-lg">Powered by Vector Embeddings and Large Language Models.</p>
//           </div>

//           <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
//              {/* Feature cards (Same as previous, omitted for brevity but included in render) */}
//              <div className="bento-item md:col-span-2 row-span-1 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
//                 <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-indigo-600/10 to-transparent" />
//                 <Upload className="w-12 h-12 text-indigo-400 mb-6" />
//                 <h3 className="text-2xl font-bold text-white mb-2">Universal Ingestion Engine</h3>
//                 <p className="text-slate-400 max-w-md">
//                    Drag and drop PDFs, MD, or TXT files. Our pipeline chunks, embeds, and indexes your knowledge instantly into a vector database.
//                 </p>
//                 <div className="absolute bottom-6 right-6 opacity-50 group-hover:opacity-100 transition-opacity">
//                    <div className="flex gap-2">
//                       {['PDF', 'DOCX', 'MD', 'TXT'].map(ext => (
//                         <span key={ext} className="px-3 py-1 bg-slate-800 rounded text-xs font-mono text-slate-300 border border-slate-700">{ext}</span>
//                       ))}
//                    </div>
//                 </div>
//              </div>
             
//              <div className="bento-item md:col-span-1 row-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
//                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/0 to-transparent" />
//                 <Brain className="w-12 h-12 text-purple-400 mb-6" />
//                 <h3 className="text-2xl font-bold text-white mb-4">Recursive Reasoning</h3>
//                 <p className="text-slate-400 mb-8">
//                    Unlike simple chatbots, MindLink maintains context across your entire library, connecting dots between disparate documents.
//                 </p>
//                 <div className="w-full h-48 bg-slate-800/50 rounded-xl border border-slate-700/50 relative">
//                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
//                       <Network className="w-32 h-32 text-purple-500/20 animate-pulse" />
//                    </div>
//                 </div>
//              </div>

//              <div className="bento-item bg-slate-900/50 border border-slate-800 rounded-3xl p-8 group hover:border-blue-500/50 transition-colors">
//                 <BarChart3 className="w-10 h-10 text-blue-400 mb-4" />
//                 <h3 className="text-xl font-bold text-white mb-2">Adaptive Analytics</h3>
//                 <p className="text-slate-400 text-sm">Real-time heatmaps of your knowledge gaps based on quiz performance.</p>
//              </div>

//              <div className="bento-item bg-slate-900/50 border border-slate-800 rounded-3xl p-8 group hover:border-green-500/50 transition-colors">
//                 <Cpu className="w-10 h-10 text-green-400 mb-4" />
//                 <h3 className="text-xl font-bold text-white mb-2">Gemini 3 Pro Core</h3>
//                 <p className="text-slate-400 text-sm">Leveraging the latest multimodal models for nuanced explanations.</p>
//              </div>
//           </div>
//         </section>

//         {/* --- FOOTER --- */}
//         <footer className="py-12 border-t border-slate-900 bg-slate-950 text-center">
//            <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
//               <Brain className="w-6 h-6" />
//               <span className="font-bold text-xl">MindLink</span>
//            </div>
//            <p className="text-slate-600 text-sm">
//               Built for the Google DeepMind Vibe Coding Hackathon 2025.
//            </p>
//         </footer>

//       </div>
//     </div>
//   );
// }

'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
// LOCAL SETUP: ensure Navbar import matches your path
import Navbar from '@/components/Navbar'; 
import { 
  Upload, Brain, BarChart3, ArrowRight, Zap, 
  Layers, ShieldCheck, Cpu, Network, Activity, Lock, Code, Terminal, Database, Search, GitBranch, Command
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// --- 3D HERO INTERFACE COMPONENT (ADVANCED) ---
const HeroInterface = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !glowRef.current || !contentRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // 1. Calculate Rotation (Max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    // 2. Animate Card Rotation
    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });

    // 3. Move Glare/Glow effect
    gsap.to(glowRef.current, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
      opacity: 0.6,
      duration: 0.4,
      ease: "power2.out"
    });

    // 4. Parallax Effect for Inner Content
    gsap.to(contentRef.current, {
      x: (x - centerX) / 40,
      y: (y - centerY) / 40,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glowRef.current || !contentRef.current) return;
    
    // Reset all positions
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 1, ease: "elastic.out(1, 0.5)" });
    gsap.to(glowRef.current, { opacity: 0, duration: 0.5 });
    gsap.to(contentRef.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto perspective-1000 py-10 z-20" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
       
       {/* 3D Container */}
       <div 
         ref={cardRef}
         className="floating-ui relative rounded-2xl border border-slate-700/50 bg-slate-950/80 backdrop-blur-2xl shadow-[0_0_80px_rgba(79,70,229,0.15)] overflow-hidden aspect-16/10 md:aspect-21/9 group transform-style-3d"
         style={{ transformStyle: 'preserve-3d' }}
       >
          {/* Dynamic Glare Overlay */}
          <div 
            ref={glowRef}
            className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 z-50 mix-blend-overlay"
          />

          {/* Top Scanning Line Animation */}
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-50 animate-scan z-40" />

          {/* --- Mock Browser Header --- */}
          <div className="h-10 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between px-4 z-30 relative">
             <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
             </div>
             <div className="flex items-center gap-2 px-3 py-1 bg-black/40 border border-slate-800 rounded-md">
                <Lock className="w-2.5 h-2.5 text-emerald-500" />
                <span className="text-[10px] font-mono text-slate-400 tracking-wider">mindlink.ai/workspace/neural-core</span>
             </div>
             <div className="flex gap-3 text-slate-600">
                <Activity className="w-3.5 h-3.5 animate-pulse text-indigo-500" />
             </div>
          </div>

          {/* --- Main Dashboard Content (Parallax Layer) --- */}
          <div ref={contentRef} className="grid grid-cols-12 h-full bg-slate-950 text-left relative z-10">
             
             {/* 1. Sidebar (Navigation) */}
             <div className="col-span-2 md:col-span-1 border-r border-slate-800 bg-slate-900/30 flex flex-col items-center py-4 gap-4">
                <div className="h-8 w-8 bg-indigo-600/20 border border-indigo-500/30 rounded-lg flex items-center justify-center mb-2">
                  <Brain className="w-4 h-4 text-indigo-400" />
                </div>
                {[Layers, Search, Database, Terminal, ShieldCheck].map((Icon, i) => (
                   <div key={i} className={`p-2 rounded-lg cursor-pointer transition-all duration-200 ${i===2 ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}`}>
                      <Icon className="w-4 h-4" />
                   </div>
                ))}
                <div className="mt-auto h-8 w-8 rounded-full bg-linear-to-tr from-purple-900 to-slate-800 border border-slate-700" />
             </div>

             {/* 2. File Explorer / Context List */}
             <div className="hidden md:flex col-span-3 lg:col-span-2 border-r border-slate-800 bg-slate-950/50 flex-col">
                <div className="h-10 border-b border-slate-800 flex items-center px-4 text-xs font-semibold text-slate-400 gap-2">
                   <GitBranch className="w-3 h-3" /> KNOWLEDGE GRAPH
                </div>
                <div className="p-3 space-y-2">
                   {['vector_index_v4', 'rag_pipeline_config', 'embeddings_cache'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-800/50 text-[10px] text-slate-400 cursor-pointer font-mono">
                         <div className={`w-1.5 h-1.5 rounded-full ${i===0 ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                         {item}
                      </div>
                   ))}
                   <div className="mt-4 text-[9px] font-bold text-slate-600 px-2 uppercase tracking-widest">Active Sources</div>
                   {[
                      { name: 'Lecture_Notes.pdf', size: '2.4MB', color: 'text-indigo-400' },
                      { name: 'Attention_Paper.pdf', size: '1.1MB', color: 'text-purple-400' },
                      { name: 'CUDA_Guide.md', size: '45KB', color: 'text-emerald-400' }
                   ].map((file, i) => (
                      <div key={i} className="flex items-center justify-between px-2 py-1.5 rounded bg-slate-900 border border-slate-800/50">
                         <div className="flex items-center gap-2">
                            <Code className={`w-3 h-3 ${file.color}`} />
                            <span className="text-[10px] text-slate-300">{file.name}</span>
                         </div>
                         <span className="text-[9px] text-slate-600">{file.size}</span>
                      </div>
                   ))}
                </div>
             </div>

             {/* 3. Main Work Area (Chat + Viz) */}
             <div className="col-span-10 md:col-span-8 lg:col-span-9 flex flex-col bg-slate-950 relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none" />
                
                {/* Header */}
                <div className="h-12 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/10 backdrop-blur-sm z-10">
                   <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                         <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" /> 
                         Gemini 3 Pro Context
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/5 text-emerald-400 text-[9px] border border-emerald-500/10">Live Connection</span>
                   </div>
                   <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                      <span>Latency: 12ms</span>
                      <span>Tokens: 4,021</span>
                   </div>
                </div>

                {/* Content Split: Chat vs Viz */}
                <div className="flex-1 grid grid-cols-2 gap-px bg-slate-800 overflow-hidden relative z-10">
                   
                   {/* Left: Chat Stream */}
                   <div className="bg-slate-950 p-6 space-y-6 flex flex-col justify-end">
                      <div className="space-y-4">
                          {/* User Msg */}
                          <div className="flex gap-3 flex-row-reverse opacity-60">
                             <div className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center shrink-0">
                                <div className="w-3 h-3 bg-slate-400 rounded-sm" />
                             </div>
                             <div className="p-2.5 bg-slate-800 border border-slate-700 rounded-lg rounded-tr-none text-[11px] text-slate-300 font-mono">
                                Explain the attention mechanism scaling factor.
                             </div>
                          </div>
                          
                          {/* AI Msg */}
                          <div className="flex gap-3">
                             <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
                                <Brain className="w-3 h-3 text-white" />
                             </div>
                             <div className="space-y-2 w-full">
                                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl rounded-tl-none text-[11px] text-slate-400 leading-relaxed font-mono relative overflow-hidden">
                                   <div className="absolute left-0 top-0 w-1 h-full bg-indigo-500/50" />
                                   <span className="text-indigo-300">Retrieving context...</span> Found 2 sources.<br/>
                                   The scaling factor <span className="text-emerald-400">1/√d_k</span> is applied to the dot products to prevent gradients from vanishing in the softmax function for large values of d_k.
                                </div>
                                <div className="flex gap-2">
                                   <div className="h-1.5 w-16 bg-slate-800 rounded-full animate-pulse" />
                                   <div className="h-1.5 w-8 bg-slate-800 rounded-full animate-pulse delay-75" />
                                </div>
                             </div>
                          </div>
                      </div>
                      
                      {/* Input Area */}
                      <div className="mt-2 relative">
                         <input type="text" disabled className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-500" value="Generating response..." />
                         <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
                         </div>
                      </div>
                   </div>

                   {/* Right: Data Visualization */}
                   <div className="bg-slate-950 p-6 flex flex-col relative overflow-hidden">
                       <div className="absolute inset-0 bg-indigo-900/5" />
                       <div className="flex justify-between items-center mb-6 z-10">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Attention Weights</span>
                          <Command className="w-3 h-3 text-slate-600" />
                       </div>

                       {/* Mock Graph */}
                       <div className="flex-1 flex items-end gap-1 pb-4 border-b border-slate-800 z-10">
                          {[40, 65, 30, 85, 50, 20, 95, 60, 45, 70, 35, 55, 80, 25, 60].map((h, i) => (
                             <div key={i} className="flex-1 bg-indigo-500/20 hover:bg-indigo-500/40 transition-colors rounded-t-sm relative group" style={{ height: `${h}%` }}>
                                <div className="absolute top-0 left-0 w-full h-px bg-indigo-400/50" />
                             </div>
                          ))}
                       </div>

                       {/* Context Nodes */}
                       <div className="mt-4 grid grid-cols-2 gap-3 z-10">
                          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-[10px] text-slate-300">Self-Attention</span>
                             </div>
                             <span className="text-[10px] font-mono text-emerald-500">98%</span>
                          </div>
                          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <span className="text-[10px] text-slate-300">Feed-Forward</span>
                             </div>
                             <span className="text-[10px] font-mono text-blue-500">45%</span>
                          </div>
                       </div>
                   </div>

                </div>
             </div>

          </div>
       </div>
    </div>
  );
};


export default function LandingPage() {
  const container = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null); // Ref for the floating UI container

  // Register ScrollTrigger safely
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. Initial Entrance (Hero Content)
    gsap.set(".fade-in-up", { y: 30, opacity: 0 });
    
    tl.to(".fade-in-up", { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 })
      .fromTo(".floating-ui", 
        { y: 100, opacity: 0, rotateX: 20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.5, ease: "elastic.out(1, 0.75)" }, 
        "-=0.8"
      );

    // 2. 3D Scroll-Away Effect (The Z-Index Move)
    if (uiRef.current && heroRef.current) {
        gsap.to(uiRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "center top", // Start when hero center hits top of screen
            end: "bottom top",   
            scrub: 1,            // Smoothly scrub the animation
          },
          rotateX: 45,       // Tilt backward
          scale: 0.85,       // Shrink slightly to look further away
          y: 150,            // Push down
          opacity: 0,        // Fade out
          transformOrigin: "center top",
          ease: "power1.inOut"
        });
    }

    // 3. Bento Grid Animation
    gsap.utils.toArray('.feature-section-animate').forEach((section: any) => {
        gsap.fromTo(section.querySelectorAll('.feature-card, .bento-item'), 
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
    });

  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Global Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* --- HERO SECTION --- */}
        <section ref={heroRef} className="relative pt-32 pb-20 px-6 lg:px-8 flex flex-col items-center text-center perspective-1000 min-h-screen">
          
          <div className="fade-in-up mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-md text-indigo-400 text-xs font-bold tracking-wide uppercase shadow-xl hover:border-indigo-500/50 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Gemini 3 Pro • Cognitive Engine Online
          </div>

          <h1 className="fade-in-up text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 max-w-5xl leading-[1.1]">
            Code at the Speed of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 animate-gradient-x">
              Thought
            </span>
          </h1>
          
          <p className="fade-in-up text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-light">
            MindLink is the first **RAG-native IDE** for personalized learning. We map your documents into a neural knowledge graph for instant, context-aware answers.
          </p>
          
          <div className="fade-in-up flex flex-col sm:flex-row gap-4 w-full justify-center mb-16">
            <Link 
              href="/register"
              className="group relative px-8 py-4 bg-indigo-600 text-white text-lg rounded-2xl overflow-hidden shadow-2xl shadow-indigo-900/40 transition-all hover:scale-105 hover:shadow-indigo-600/50"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative flex items-center justify-center gap-2 font-semibold">
                Initialize System <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link 
              href="/dashboard"
              className="px-8 py-4 bg-slate-900 text-slate-300 text-lg rounded-2xl border border-slate-800 hover:bg-slate-800 hover:text-white transition-all font-medium flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Zap className="w-5 h-5 text-yellow-500" /> Live Demo
            </Link>
          </div>

          {/* --- INSERT THE 3D INTERFACE COMPONENT HERE --- */}
          {/* Note: We use a ref on the WRAPPER div to target it with GSAP scroll trigger */}
          <div ref={uiRef} className="w-full">
              <HeroInterface />
          </div>

        </section>

        {/* --- BENTO GRID FEATURES --- */}
        <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto feature-section-animate">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 mb-4">
              Architected for Intelligence
            </h2>
            <p className="text-slate-400 text-lg">Powered by Vector Embeddings and Large Language Models.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
             
             {/* Card 1: Large Span */}
             <div className="md:col-span-2 row-span-1 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group hover:border-indigo-500/50 transition-colors feature-card">
                <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-indigo-600/10 to-transparent" />
                <Upload className="w-12 h-12 text-indigo-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">Universal Ingestion Engine</h3>
                <p className="text-slate-400 max-w-md">
                   Drag and drop PDFs, MD, or TXT files. Our pipeline chunks, embeds, and indexes your knowledge instantly into a vector database.
                </p>
                <div className="absolute bottom-6 right-6 opacity-50 group-hover:opacity-100 transition-opacity">
                   <div className="flex gap-2">
                      {['PDF', 'DOCX', 'MD', 'TXT'].map(ext => (
                        <span key={ext} className="px-3 py-1 bg-slate-800 rounded text-xs font-mono text-slate-300 border border-slate-700">{ext}</span>
                      ))}
                   </div>
                </div>
             </div>

             {/* Card 2: Vertical */}
             <div className="md:col-span-1 row-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group hover:border-purple-500/50 transition-colors feature-card">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/0 to-transparent" />
                <Brain className="w-12 h-12 text-purple-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Recursive Reasoning</h3>
                <p className="text-slate-400 mb-8">
                   Unlike simple chatbots, MindLink maintains context across your entire library, connecting dots between disparate documents.
                </p>
                <div className="w-full h-48 bg-slate-800/50 rounded-xl border border-slate-700/50 relative">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                      <Network className="w-32 h-32 text-purple-500/20 animate-pulse" />
                   </div>
                </div>
             </div>

             {/* Card 3: Small */}
             <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 group hover:border-blue-500/50 transition-colors feature-card">
                <BarChart3 className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Adaptive Analytics</h3>
                <p className="text-slate-400 text-sm">Real-time heatmaps of your knowledge gaps based on quiz performance.</p>
             </div>

             {/* Card 4: Small */}
             <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 group hover:border-green-500/50 transition-colors feature-card">
                <Cpu className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Gemini 3 Pro Core</h3>
                <p className="text-slate-400 text-sm">Leveraging the latest multimodal models for nuanced explanations.</p>
             </div>

          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="py-12 border-t border-slate-900 bg-slate-950 text-center">
           <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
              <Brain className="w-6 h-6" />
              <span className="font-bold text-xl">MindLink</span>
           </div>
           <p className="text-slate-600 text-sm">
              Built for the Google DeepMind Vibe Coding Hackathon 2025.
           </p>
        </footer>

      </div>
    </div>
  );
}