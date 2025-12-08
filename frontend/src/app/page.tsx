// 'use client';

// import React, { useRef } from 'react';
// import Link from 'next/link';
// import Navbar from '@/components/Navbar';
// import { Upload, Brain, BarChart3, ArrowRight } from 'lucide-react';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';

// export default function LandingPage() {
//   const container = useRef<HTMLDivElement>(null);

//   useGSAP(() => {
//     // 1. Initial State: Hide elements before animation starts to prevent flash
//     gsap.set(".hero-element", { y: 50, opacity: 0 });
//     gsap.set(".feature-card", { y: 30, opacity: 0 });

//     // 2. Timeline for Hero Section
//     const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

//     tl.to(".hero-element", {
//       y: 0,
//       opacity: 1,
//       duration: 1,
//       stagger: 0.2, // Animate title, text, buttons one after another
//     })
//     .to(".feature-card", {
//       y: 0,
//       opacity: 1,
//       duration: 0.8,
//       stagger: 0.15, // Stagger the cards quickly
//     }, "-=0.5"); // Start card animation 0.5s before hero finishes

//   }, { scope: container });

//   return (
//     <div ref={container} className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
//       <Navbar />

//       <main className="flex flex-col items-center justify-center text-center px-4 mt-20 mb-20">
        
//         {/* Badge */}
//         <div className="hero-element inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-6 border border-indigo-100">
//           <span className="relative flex h-2 w-2">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
//           </span>
//           v1.0 Public Beta
//         </div>

//         {/* Hero Title */}
//         <h1 className="hero-element text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 max-w-5xl leading-tight tracking-tight">
//           Your Second Brain, <br />
//           <span className="text-indigo-600">Powered by AI.</span>
//         </h1>
        
//         {/* Subtitle */}
//         <p className="hero-element text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
//           MindLink connects your workflows, documents, and learning goals into one intelligent system. Stop searching, start knowing.
//         </p>
        
//         {/* CTA Buttons */}
//         <div className="hero-element flex flex-col sm:flex-row gap-4 mt-2">
//           <Link 
//             href="/register"
//             className="px-8 py-4 bg-indigo-600 text-white text-lg rounded-xl hover:bg-indigo-700 hover:scale-105 transition-all transform shadow-lg font-semibold flex items-center justify-center gap-2"
//           >
//             Get Started <ArrowRight className="w-5 h-5" />
//           </Link>
//           <Link 
//             href="/dashboard"
//             className="px-8 py-4 bg-white text-slate-700 text-lg rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition font-semibold flex items-center justify-center"
//           >
//             View Demo
//           </Link>
//         </div>

//         {/* Feature Grid */}
//         <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl text-left w-full px-4">
//           {[
//             { 
//               icon: Upload, 
//               title: "Vector Memory", 
//               desc: "Upload PDFs, Notion docs, and notes. We embed them for instant semantic retrieval." 
//             },
//             { 
//               icon: Brain, 
//               title: "Active Reasoning", 
//               desc: "Our AI doesn't just chat; it reasons through complex workflows and automates tasks." 
//             },
//             { 
//               icon: BarChart3, 
//               title: "Knowledge Graphs", 
//               desc: "Visualize how your ideas connect. Spot gaps in your understanding automatically." 
//             }
//           ].map((feature, idx) => (
//             <div 
//               key={idx} 
//               className="feature-card p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all group"
//             >
//               <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-100 transition">
//                 <feature.icon className="w-6 h-6 text-indigo-600" />
//               </div>
//               <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
//               <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }

'use client';

import React, { useRef } from 'react';
// --- LOCAL SETUP: Uncomment these lines in your local VS Code ---
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// FIXED: Use relative path for preview compatibility. 
import Navbar from '../components/Navbar';
import { 
  Upload, Brain, BarChart3, ArrowRight, Zap, 
  Layers, ShieldCheck, Cpu, Network 
} from 'lucide-react';

export default function LandingPage() {
  const container = useRef<HTMLDivElement>(null);

  // --- LOCAL SETUP: Uncomment this hook locally to enable animations ---
  
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. Initial Setup
    gsap.set(".hero-char", { y: 100, opacity: 0 });
    gsap.set(".fade-in-up", { y: 30, opacity: 0 });
    gsap.set(".feature-card", { y: 50, opacity: 0 });
    gsap.set(".bento-item", { scale: 0.9, opacity: 0 });

    // 2. Hero Text Animation
    tl.to(".fade-in-up", {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
    })
    
    // 3. Floating UI Elements Entrance
    .fromTo(".floating-ui", 
      { y: 100, opacity: 0, rotationX: 20 },
      { y: 0, opacity: 1, rotationX: 0, duration: 1.5, ease: "elastic.out(1, 0.75)" }, 
      "-=0.8"
    );

    // 4. Scroll-triggered animations for Feature Grid
    gsap.utils.toArray('.feature-section').forEach((section: any) => {
      gsap.to(section.querySelectorAll('.feature-card'), {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
      });
    });

    // 5. Bento Grid Animation
    gsap.to(".bento-item", {
      scrollTrigger: {
        trigger: ".bento-grid",
        start: "top 75%",
      },
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.5)"
    });

  }, { scope: container });
  
  // -------------------------------------------------------------------

  return (
    // Switching to a dark theme base for that "Deep Tech" vibe
    <div ref={container} className="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen" />
         <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 rounded-full blur-[130px] mix-blend-screen" />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-20 px-6 lg:px-8 flex flex-col items-center text-center">
          
          {/* Badge */}
          <div className="fade-in-up mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-md text-indigo-400 text-xs font-bold tracking-wide uppercase shadow-xl hover:border-indigo-500/50 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Vibe Code 2025 • Gemini 3 Pro Integration
          </div>

          {/* Main Title */}
          <h1 className="fade-in-up text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 max-w-5xl leading-[1.1]">
            Unlock Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 animate-gradient-x">
              Cognitive Potential
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="fade-in-up text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-light">
            MindLink fuses <strong className="text-slate-200">Retrieval-Augmented Generation</strong> with your personal data to create an adaptive, hyper-personalized learning companion.
          </p>
          
          {/* CTA Buttons */}
          <div className="fade-in-up flex flex-col sm:flex-row gap-4 w-full justify-center">
            {/* LOCALLY: Change <a> to <Link href="/register"> */}
            <a 
              href="/register"
              className="group relative px-8 py-4 bg-indigo-600 text-white text-lg rounded-2xl overflow-hidden shadow-2xl shadow-indigo-900/40 transition-all hover:scale-105 hover:shadow-indigo-600/50"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative flex items-center justify-center gap-2 font-semibold">
                Initialize System <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            {/* LOCALLY: Change <a> to <Link href="/dashboard"> */}
            <a 
              href="/dashboard"
              className="px-8 py-4 bg-slate-900 text-slate-300 text-lg rounded-2xl border border-slate-800 hover:bg-slate-800 hover:text-white transition-all font-medium flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Zap className="w-5 h-5 text-yellow-500" /> Live Demo
            </a>
          </div>

          {/* Floating UI Mockup */}
          <div className="floating-ui mt-20 relative w-full max-w-5xl mx-auto perspective-1000">
             <div className="relative rounded-xl border border-slate-800 bg-slate-950/50 backdrop-blur-xl shadow-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
                {/* Mock UI Header */}
                <div className="h-12 border-b border-slate-800 bg-slate-900/50 flex items-center px-4 gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500/80" />
                   <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                   <div className="w-3 h-3 rounded-full bg-green-500/80" />
                   <div className="ml-4 h-6 w-64 rounded-full bg-slate-800/50" />
                </div>
                {/* Mock UI Body */}
                <div className="p-8 grid grid-cols-3 gap-6 h-full">
                   <div className="col-span-1 space-y-4">
                      <div className="h-8 w-3/4 bg-slate-800/50 rounded-lg animate-pulse" />
                      <div className="h-4 w-full bg-slate-800/30 rounded-lg" />
                      <div className="h-4 w-5/6 bg-slate-800/30 rounded-lg" />
                      <div className="h-32 w-full bg-indigo-900/10 border border-indigo-500/20 rounded-xl mt-8" />
                   </div>
                   <div className="col-span-2 bg-slate-900/30 rounded-xl border border-slate-800/50 p-6 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-transparent" />
                      <div className="flex items-start gap-4 mb-6">
                         <div className="w-10 h-10 rounded-full bg-indigo-600 flex-shrink-0" />
                         <div className="space-y-2 w-full">
                            <div className="h-4 w-1/4 bg-slate-700 rounded" />
                            <div className="h-16 w-full bg-slate-800/50 rounded-lg border border-slate-700/50" />
                         </div>
                      </div>
                      <div className="flex items-start gap-4 flex-row-reverse">
                         <div className="w-10 h-10 rounded-full bg-emerald-600 flex-shrink-0" />
                         <div className="space-y-2 w-full flex flex-col items-end">
                            <div className="h-4 w-1/4 bg-slate-700 rounded" />
                            <div className="h-24 w-3/4 bg-emerald-900/20 rounded-lg border border-emerald-500/20" />
                         </div>
                      </div>
                   </div>
                </div>
             </div>
             {/* Glow behind the UI */}
             <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl -z-10 rounded-[3rem]" />
          </div>
        </section>

        {/* --- BENTO GRID FEATURES --- */}
        <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500 mb-4">
              Architected for Intelligence
            </h2>
            <p className="text-slate-400 text-lg">Powered by Vector Embeddings and Large Language Models.</p>
          </div>

          <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
             
             {/* Card 1: Large Span */}
             <div className="bento-item md:col-span-2 row-span-1 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
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
             <div className="bento-item md:col-span-1 row-span-2 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/0 to-transparent" />
                <Brain className="w-12 h-12 text-purple-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Recursive Reasoning</h3>
                <p className="text-slate-400 mb-8">
                   Unlike simple chatbots, MindLink maintains context across your entire library, connecting dots between disparate documents.
                </p>
                <div className="w-full h-48 bg-slate-800/50 rounded-xl border border-slate-700/50 relative">
                   {/* Abstract node graph visualization */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                      <Network className="w-32 h-32 text-purple-500/20 animate-pulse" />
                   </div>
                </div>
             </div>

             {/* Card 3: Small */}
             <div className="bento-item bg-slate-900/50 border border-slate-800 rounded-3xl p-8 group hover:border-blue-500/50 transition-colors">
                <BarChart3 className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Adaptive Analytics</h3>
                <p className="text-slate-400 text-sm">Real-time heatmaps of your knowledge gaps based on quiz performance.</p>
             </div>

             {/* Card 4: Small */}
             <div className="bento-item bg-slate-900/50 border border-slate-800 rounded-3xl p-8 group hover:border-green-500/50 transition-colors">
                <Cpu className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Gemini 3 Pro Core</h3>
                <p className="text-slate-400 text-sm">Leveraging the latest multimodal models for nuanced explanations.</p>
             </div>

          </div>
        </section>

        {/* --- HOW IT WORKS / PIPELINE --- */}
        <section className="feature-section py-20 border-t border-slate-800 bg-slate-950/80">
           <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">The Neural Architecture</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                 {[
                    { step: "01", title: "Ingest", desc: "Documents are parsed & cleaned", icon: Layers },
                    { step: "02", title: "Embed", desc: "Text converted to 1536-d vectors", icon: Network },
                    { step: "03", title: "Store", desc: "Indexed in ChromaDB", icon: ShieldCheck },
                    { step: "04", title: "Retrieve", desc: "Semantic search via LLM", icon: Zap },
                 ].map((item, i) => (
                    <div key={i} className="feature-card relative p-6 rounded-2xl bg-slate-900 border border-slate-800/50 hover:bg-slate-800 transition-colors group">
                       <div className="absolute -top-4 -left-4 text-6xl font-black text-slate-800/50 z-0 select-none group-hover:text-indigo-900/20 transition-colors">
                          {item.step}
                       </div>
                       <div className="relative z-10">
                          <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
                             <item.icon className="w-6 h-6 text-indigo-400 group-hover:text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-slate-400">{item.desc}</p>
                       </div>
                    </div>
                 ))}
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
              Built for the Google DeepMind Hackathon 2025. <br />
              Pushing the boundaries of Personalized AI Education.
           </p>
        </footer>

      </div>
    </div>
  );
}