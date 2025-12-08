// 'use client';

// import React, { useRef } from 'react';
// import { BarChart3, TrendingUp, TrendingDown, BookOpen, Brain, Zap, Clock } from 'lucide-react';

// // --- LOCAL SETUP: Uncomment these lines in your local VS Code ---
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';

// // --- MOCK DATA ---

// interface TopicScore {
//     topic: string;
//     score: number; // Percentage score (0-100)
//     lastReview: string;
// }

// const MOCK_SCORES: TopicScore[] = [
//     { topic: 'Vector Embeddings', score: 85, lastReview: '3 days ago' },
//     { topic: 'Transformer Models', score: 62, lastReview: '1 day ago' },
//     { topic: 'FastAPI Structure', score: 95, lastReview: '5 days ago' },
//     { topic: 'Asynchronous Programming', score: 40, lastReview: '1 week ago' },
// ];

// const OVERVIEW_STATS = {
//     masteredTopics: 12,
//     activeQuizzes: 4,
//     averageScore: 78.5,
//     sessionsThisWeek: 6,
// };

// // --- HELPER COMPONENT: Skill Bar ---
// const SkillBar: React.FC<TopicScore> = ({ topic, score, lastReview }) => {
//     const isWeak = score < 65;
//     const colorClass = isWeak ? 'bg-red-500' : (score > 80 ? 'bg-green-500' : 'bg-yellow-500');
    
//     return (
//         <div className="skill-bar-item mb-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
//             <div className="flex justify-between items-center mb-1">
//                 <span className="font-medium text-slate-700">{topic}</span>
//                 <span className={`text-sm font-bold ${isWeak ? 'text-red-600' : 'text-slate-800'}`}>{score}%</span>
//             </div>
            
//             <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
//                 <div 
//                     className={`h-2.5 rounded-full ${colorClass} transition-all duration-1000 ease-out`} 
//                     style={{ width: `${score}%` }}
//                 />
//             </div>
            
//             <div className="flex justify-between text-xs text-slate-500 mt-2">
//                 <span>{isWeak ? 'Weak Spot' : 'Mastering'}</span>
//                 <span>Reviewed: {lastReview}</span>
//             </div>
//         </div>
//     );
// };

// // --- HELPER COMPONENT: Stat Card ---
// const StatCard = ({ title, value, icon: Icon, color, trend }: { title: string, value: string, icon: React.ElementType, color: 'green' | 'indigo' | 'red' | 'yellow', trend: string }) => {
//     const colorMap = {
//         green: 'bg-green-500',
//         indigo: 'bg-indigo-500',
//         red: 'bg-red-500',
//         yellow: 'bg-yellow-500',
//     };
//     const bgClass = colorMap[color];

//     return (
//         <div className="stat-card bg-white p-6 rounded-xl shadow-lg border border-slate-200 hover:-translate-y-1 transition-transform duration-300">
//             <div className="flex items-center justify-between">
//                 <p className="text-sm font-medium text-slate-500">{title}</p>
//                 <div className={`p-2 rounded-full text-white ${bgClass}`}>
//                     <Icon className="w-5 h-5" />
//                 </div>
//             </div>
//             <p className="text-3xl font-extrabold text-slate-900 mt-3">{value}</p>
//             <p className="text-xs text-slate-400 mt-2">{trend}</p>
//         </div>
//     );
// };

// // --- MAIN PAGE COMPONENT ---
// export default function AnalyticsPage() {
//     const container = useRef<HTMLDivElement>(null);

//     // --- LOCAL SETUP: Uncomment this hook to enable GSAP animations ---
    
//     useGSAP(() => {
//         const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

//         // 1. Animate Header
//         tl.from(".page-header", { y: -20, opacity: 0, duration: 0.6 });

//         // 2. Animate Stat Cards (Staggered)
//         tl.from(".stat-card", { 
//             y: 30, 
//             opacity: 0, 
//             duration: 0.6, 
//             stagger: 0.1 
//         }, "-=0.3");

//         // 3. Animate Section Panels
//         tl.from(".section-panel", { 
//             x: -20, 
//             opacity: 0, 
//             duration: 0.6, 
//             stagger: 0.2 
//         }, "-=0.2");
        
//         // 4. Animate individual skill bars inside the panels
//         tl.from(".skill-bar-item", {
//             width: 0, 
//             opacity: 0, 
//             duration: 0.5, 
//             stagger: 0.05
//         }, "-=0.4");

//     }, { scope: container });
    
//     // -------------------------------------------------------------------

//     // Separate weak spots for easy display
//     const weakSpots = MOCK_SCORES.filter(s => s.score < 65).sort((a, b) => a.score - b.score);
//     const strongTopics = MOCK_SCORES.filter(s => s.score >= 80).sort((a, b) => b.score - a.score);

//     return (
//         <div ref={container} className="min-h-screen bg-slate-50 p-8">
//             <header className="page-header mb-8 border-b border-slate-200 pb-4">
//                 <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
//                     <BarChart3 className="w-8 h-8 text-indigo-600" />
//                     Personalized Learning Analytics
//                 </h1>
//                 <p className="text-slate-500 mt-1">Detailed breakdown of your strengths, weaknesses, and activity.</p>
//             </header>

//             {/* 1. Overview Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
//                 <StatCard 
//                     title="Average Quiz Score" 
//                     value={`${OVERVIEW_STATS.averageScore.toFixed(1)}%`}
//                     icon={TrendingUp}
//                     color="green"
//                     trend="+4.5% last week"
//                 />
//                 <StatCard 
//                     title="Mastered Topics" 
//                     value={OVERVIEW_STATS.masteredTopics.toString()}
//                     icon={BookOpen}
//                     color="indigo"
//                     trend="Ready for Advanced Content"
//                 />
//                 <StatCard 
//                     title="Active Quizzes Due" 
//                     value={OVERVIEW_STATS.activeQuizzes.toString()}
//                     icon={Zap}
//                     color="red"
//                     trend="Focus on Spaced Repetition"
//                 />
//                 <StatCard 
//                     title="Study Sessions" 
//                     value={OVERVIEW_STATS.sessionsThisWeek.toString()}
//                     icon={Clock}
//                     color="yellow"
//                     trend="6 Sessions this week"
//                 />
//             </div>

//             {/* 2. Strength and Weakness Heatmaps */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
//                 {/* Weak Spots (Priority Review) */}
//                 <div className="section-panel bg-white p-6 rounded-xl shadow-lg border border-slate-200">
//                     <h2 className="text-xl font-bold text-red-600 flex items-center gap-2 mb-4">
//                         <TrendingDown className="w-6 h-6" /> Weak Spots (Priority Review)
//                     </h2>
//                     <p className="text-sm text-slate-500 mb-6">These topics require immediate review according to your recent quiz results.</p>
                    
//                     <div className="space-y-4">
//                         {weakSpots.length > 0 ? (
//                             weakSpots.map(score => <SkillBar key={score.topic} {...score} />)
//                         ) : (
//                             <div className="p-4 bg-green-50 text-green-700 rounded-lg">No critical weak spots detected!</div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Strong Topics (Solid Mastery) */}
//                 <div className="section-panel bg-white p-6 rounded-xl shadow-lg border border-slate-200">
//                     <h2 className="text-xl font-bold text-green-600 flex items-center gap-2 mb-4">
//                         <TrendingUp className="w-6 h-6" /> Strong Topics (Solid Mastery)
//                     </h2>
//                     <p className="text-sm text-slate-500 mb-6">You've demonstrated solid understanding here. Ready for application.</p>
                    
//                     <div className="space-y-4">
//                         {strongTopics.map(score => <SkillBar key={score.topic} {...score} />)}
//                     </div>
//                 </div>
//             </div>

//             {/* 3. Global Skill List */}
//              <div className="section-panel mt-8 bg-white p-6 rounded-xl shadow-lg border border-slate-200">
//                 <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
//                     <Brain className="w-6 h-6 text-purple-600" /> All Topic Scores
//                 </h2>
//                 <div className="space-y-2 pt-2">
//                     {MOCK_SCORES.sort((a, b) => b.score - a.score).map(score => (
//                         <SkillBar key={`all-${score.topic}`} {...score} />
//                     ))}
//                 </div>
//             </div>

//         </div>
//     );
// }

'use client';

import React, { useRef, useEffect, useState } from 'react';
import { 
  BarChart3, TrendingUp, TrendingDown, BookOpen, Brain, 
  Zap, Clock, Target, Activity, Share2 
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// --- MOCK DATA ---
interface TopicScore {
    topic: string;
    score: number;
    lastReview: string;
    category: 'Core' | 'Advanced' | 'Auxiliary';
}

const MOCK_SCORES: TopicScore[] = [
    { topic: 'Vector Embeddings', score: 85, lastReview: '3 days ago', category: 'Core' },
    { topic: 'Transformer Models', score: 62, lastReview: '1 day ago', category: 'Advanced' },
    { topic: 'FastAPI Structure', score: 95, lastReview: '5 days ago', category: 'Auxiliary' },
    { topic: 'Asynchronous Prog.', score: 40, lastReview: '1 week ago', category: 'Core' },
    { topic: 'Prompt Engineering', score: 78, lastReview: '2 days ago', category: 'Advanced' },
];

const OVERVIEW_STATS = {
    masteredTopics: 12,
    activeQuizzes: 4,
    averageScore: 78.5,
    sessionsThisWeek: 6,
};

// --- 3D TILT WRAPPER ---
const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;
    
    gsap.to(cardRef.current, {
      rotateY: x,
      rotateX: -y,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "power2.out" });
  };

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={`transform-gpu ${className}`}>
      {children}
    </div>
  );
};

// --- ANIMATED STAT CARD ---
const StatCard = ({ title, value, icon: Icon, color, trend }: any) => {
  const valueRef = useRef<HTMLParagraphElement>(null);
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const isPercentage = value.includes('%');

  useGSAP(() => {
    // Count up animation
    if(valueRef.current) {
        gsap.fromTo(valueRef.current, 
            { innerText: 0 }, 
            { 
                innerText: numericValue, 
                duration: 2, 
                ease: "power3.out",
                snap: { innerText: isPercentage ? 0.1 : 1 },
                onUpdate: function() {
                    if (valueRef.current) {
                        valueRef.current.innerText = Math.round(this.targets()[0].innerText * 10) / 10 + (isPercentage ? '%' : '');
                    }
                }
            }
        );
    }
  }, []);

  // UPDATED: Dark mode color map with glows
  const colorMap: any = {
      green: 'bg-emerald-900/20 text-emerald-400 border-emerald-500/30 hover:shadow-emerald-500/10',
      indigo: 'bg-indigo-900/20 text-indigo-400 border-indigo-500/30 hover:shadow-indigo-500/10',
      red: 'bg-rose-900/20 text-rose-400 border-rose-500/30 hover:shadow-rose-500/10',
      yellow: 'bg-amber-900/20 text-amber-400 border-amber-500/30 hover:shadow-amber-500/10',
  };

  return (
      <TiltCard className={`stat-card relative p-6 rounded-2xl border backdrop-blur-md transition-shadow duration-300 ${colorMap[color]}`}>
          <div className="flex justify-between items-start mb-4">
              <div>
                  <p className="text-sm font-semibold opacity-70 uppercase tracking-wide">{title}</p>
                  <p ref={valueRef} className="text-3xl font-black mt-1 text-white">{0}</p>
              </div>
              <div className={`p-3 rounded-xl bg-white/5`}>
                  <Icon className="w-6 h-6" />
              </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium opacity-80">
             <TrendingUp className="w-3 h-3" /> {trend}
          </div>
      </TiltCard>
  );
};

// --- SKILL BAR COMPONENT ---
const SkillBar = ({ topic, score, lastReview }: TopicScore) => {
    const isWeak = score < 65;
    const barRef = useRef<HTMLDivElement>(null);
    const colorClass = isWeak ? 'bg-gradient-to-r from-rose-500 to-orange-500' : 'bg-gradient-to-r from-emerald-500 to-teal-400';
    
    useGSAP(() => {
        gsap.fromTo(barRef.current, { width: "0%" }, { width: `${score}%`, duration: 1.5, ease: "power2.out", delay: 0.2 });
    }, []);

    return (
        <div className="skill-item group cursor-pointer">
            <div className="flex justify-between items-end mb-2">
                <div>
                    <h4 className="font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{topic}</h4>
                    <p className="text-xs text-slate-500">Reviewed {lastReview}</p>
                </div>
                <span className={`text-sm font-black ${isWeak ? 'text-rose-400' : 'text-emerald-400'}`}>{score}%</span>
            </div>
            {/* UPDATED: Darker track background */}
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner border border-slate-700/50">
                <div ref={barRef} className={`h-full rounded-full shadow-lg ${colorClass}`} />
            </div>
        </div>
    );
};

// --- MOCK RADAR CHART (Visual Only) ---
const RadarChart = () => {
    // Simple SVG representation of a skill web
    return (
        <div className="relative w-full h-64 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
                {/* Grid - UPDATED Stroke Colors */}
                <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="#334155" strokeWidth="0.5" />
                <polygon points="50,25 75,37.5 75,62.5 50,75 25,62.5 25,37.5" fill="none" stroke="#334155" strokeWidth="0.5" />
                
                {/* Data Shape */}
                <polygon 
                    points="50,15 85,35 70,65 50,80 20,60 15,35" 
                    fill="rgba(99, 102, 241, 0.15)" 
                    stroke="#818cf8" 
                    strokeWidth="2"
                    className="animate-pulse"
                />
                
                {/* Nodes - UPDATED Colors */}
                <circle cx="50" cy="15" r="2" fill="#818cf8" />
                <circle cx="85" cy="35" r="2" fill="#818cf8" />
                <circle cx="70" cy="65" r="2" fill="#818cf8" />
                <circle cx="50" cy="80" r="2" fill="#818cf8" />
                <circle cx="20" cy="60" r="2" fill="#818cf8" />
                <circle cx="15" cy="35" r="2" fill="#818cf8" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-300 shadow-lg border border-indigo-500/30">
                    Skill Web
                </div>
            </div>
        </div>
    )
}

// --- MAIN PAGE ---
export default function AnalyticsPage() {
    const container = useRef<HTMLDivElement>(null);

    // Initial Staggered Entrance
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        tl.from(".page-header", { y: -30, opacity: 0, duration: 0.8 })
          .from(".stat-card", { y: 50, opacity: 0, stagger: 0.1, duration: 0.6 }, "-=0.4")
          .from(".content-panel", { y: 30, opacity: 0, stagger: 0.2, duration: 0.8 }, "-=0.2");
          
    }, { scope: container });

    const weakSpots = MOCK_SCORES.filter(s => s.score < 65);
    const strongTopics = MOCK_SCORES.filter(s => s.score >= 80);

    return (
        // UPDATED: Main background set to slate-950 to match Landing Page
        <div ref={container} className="min-h-screen bg-slate-950 p-8 lg:p-12 overflow-hidden font-sans text-slate-50 selection:bg-indigo-500/30">
            {/* Background Gradient */}
            <div className="fixed top-0 left-0 w-full h-[500px] bg-linear-to-b from-indigo-900/20 to-transparent -z-10 pointer-events-none" />

            <header className="page-header mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-600/20 border border-indigo-500/30 rounded-lg shadow-lg shadow-indigo-900/20 text-indigo-400">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">Neural Analytics</h1>
                    </div>
                    <p className="text-slate-400 font-medium">Real-time cognitive mapping of your learning progress.</p>
                </div>
                
                <div className="flex gap-2">
                     <button className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-800 hover:text-white hover:border-slate-600 transition shadow-sm flex items-center gap-2 text-slate-300">
                        <Share2 className="w-4 h-4" /> Export Report
                     </button>
                     <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-900/50 hover:bg-indigo-500 transition">
                        Full Analysis
                     </button>
                </div>
            </header>

            {/* 1. KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard 
                    title="Knowledge Retention" 
                    value={`${OVERVIEW_STATS.averageScore}%`} 
                    icon={Brain} color="indigo" trend="+2.4% vs last week" 
                />
                <StatCard 
                    title="Concepts Mastered" 
                    value={OVERVIEW_STATS.masteredTopics.toString()} 
                    icon={Target} color="green" trend="Top 10% of users" 
                />
                <StatCard 
                    title="Critical Gaps" 
                    value={weakSpots.length.toString()} 
                    icon={Activity} color="red" trend="Requires attention" 
                />
                <StatCard 
                    title="Study Velocity" 
                    value={`${OVERVIEW_STATS.sessionsThisWeek}h`} 
                    icon={Zap} color="yellow" trend="Maintaining streak" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 2. Main Analysis Column */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Weakness Map */}
                    {/* UPDATED: Dark card styling */}
                    <div className="content-panel bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-800/60">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-rose-900/30 text-rose-400 rounded-lg border border-rose-500/20">
                                <TrendingDown className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-100">Priority Focus Areas</h2>
                        </div>
                        <div className="space-y-6">
                             {weakSpots.map(score => <SkillBar key={score.topic} {...score} />)}
                             {weakSpots.length === 0 && <p className="text-emerald-400 font-medium">All systems nominal. Great job!</p>}
                        </div>
                    </div>

                    {/* Mastery Map */}
                    <div className="content-panel bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-800/60">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-emerald-900/30 text-emerald-400 rounded-lg border border-emerald-500/20">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-100">Mastered Concepts</h2>
                        </div>
                        <div className="space-y-6">
                             {strongTopics.map(score => <SkillBar key={score.topic} {...score} />)}
                        </div>
                    </div>
                </div>

                {/* 3. Sidebar / Radar */}
                <div className="space-y-8">
                    <div className="content-panel bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden border border-slate-800">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-indigo-400" /> Skill Topology
                        </h2>
                        
                        <RadarChart />
                        
                        <div className="mt-8 space-y-4">
                            <div className="flex justify-between text-sm border-b border-slate-700/50 pb-2">
                                <span className="text-slate-400">Total XP</span>
                                <span className="font-mono text-indigo-300">14,250</span>
                            </div>
                            <div className="flex justify-between text-sm border-b border-slate-700/50 pb-2">
                                <span className="text-slate-400">Global Rank</span>
                                <span className="font-mono text-emerald-300">#42</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="content-panel bg-linear-to-br from-indigo-900 to-violet-900 p-8 rounded-3xl shadow-xl text-white border border-indigo-500/20">
                        <h3 className="font-bold text-xl mb-2 text-white">Weekly Insight</h3>
                        <p className="text-indigo-200 text-sm mb-6 leading-relaxed">
                            Your retention rate for "FastAPI" topics is 30% higher than average. Consider increasing difficulty.
                        </p>
                        <button className="w-full py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition text-white">
                            Adjust Difficulty
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}