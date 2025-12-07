// 'use client';

// import React from 'react';
// import { BarChart3, TrendingUp, TrendingDown, BookOpen, Brain, Zap, Clock } from 'lucide-react';

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
//         <div className="mb-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
//             <div className="flex justify-between items-center mb-1">
//                 <span className="font-medium text-slate-700">{topic}</span>
//                 <span className={`text-sm font-bold ${isWeak ? 'text-red-600' : 'text-slate-800'}`}>{score}%</span>
//             </div>
            
//             <div className="w-full bg-slate-200 rounded-full h-2.5">
//                 <div 
//                     className={`h-2.5 rounded-full ${colorClass} transition-all duration-700`} 
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

// // --- MAIN PAGE COMPONENT ---
// export default function AnalyticsPage() {
//     // Separate weak spots for easy display
//     const weakSpots = MOCK_SCORES.filter(s => s.score < 65).sort((a, b) => a.score - b.score);
//     const strongTopics = MOCK_SCORES.filter(s => s.score >= 80).sort((a, b) => b.score - a.score);

//     return (
//         <div className="min-h-screen bg-slate-50 p-8">
//             <header className="mb-8 border-b border-slate-200 pb-4">
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
//                 <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
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
//                 <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
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
//              <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-slate-200">
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
//         <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
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

'use client';

import React, { useRef } from 'react';
import { BarChart3, TrendingUp, TrendingDown, BookOpen, Brain, Zap, Clock } from 'lucide-react';

// --- LOCAL SETUP: Uncomment these lines in your local VS Code ---
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// --- MOCK DATA ---

interface TopicScore {
    topic: string;
    score: number; // Percentage score (0-100)
    lastReview: string;
}

const MOCK_SCORES: TopicScore[] = [
    { topic: 'Vector Embeddings', score: 85, lastReview: '3 days ago' },
    { topic: 'Transformer Models', score: 62, lastReview: '1 day ago' },
    { topic: 'FastAPI Structure', score: 95, lastReview: '5 days ago' },
    { topic: 'Asynchronous Programming', score: 40, lastReview: '1 week ago' },
];

const OVERVIEW_STATS = {
    masteredTopics: 12,
    activeQuizzes: 4,
    averageScore: 78.5,
    sessionsThisWeek: 6,
};

// --- HELPER COMPONENT: Skill Bar ---
const SkillBar: React.FC<TopicScore> = ({ topic, score, lastReview }) => {
    const isWeak = score < 65;
    const colorClass = isWeak ? 'bg-red-500' : (score > 80 ? 'bg-green-500' : 'bg-yellow-500');
    
    return (
        <div className="skill-bar-item mb-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-slate-700">{topic}</span>
                <span className={`text-sm font-bold ${isWeak ? 'text-red-600' : 'text-slate-800'}`}>{score}%</span>
            </div>
            
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div 
                    className={`h-2.5 rounded-full ${colorClass} transition-all duration-1000 ease-out`} 
                    style={{ width: `${score}%` }}
                />
            </div>
            
            <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>{isWeak ? 'Weak Spot' : 'Mastering'}</span>
                <span>Reviewed: {lastReview}</span>
            </div>
        </div>
    );
};

// --- HELPER COMPONENT: Stat Card ---
const StatCard = ({ title, value, icon: Icon, color, trend }: { title: string, value: string, icon: React.ElementType, color: 'green' | 'indigo' | 'red' | 'yellow', trend: string }) => {
    const colorMap = {
        green: 'bg-green-500',
        indigo: 'bg-indigo-500',
        red: 'bg-red-500',
        yellow: 'bg-yellow-500',
    };
    const bgClass = colorMap[color];

    return (
        <div className="stat-card bg-white p-6 rounded-xl shadow-lg border border-slate-200 hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <div className={`p-2 rounded-full text-white ${bgClass}`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900 mt-3">{value}</p>
            <p className="text-xs text-slate-400 mt-2">{trend}</p>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
export default function AnalyticsPage() {
    const container = useRef<HTMLDivElement>(null);

    // --- LOCAL SETUP: Uncomment this hook to enable GSAP animations ---
    
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        // 1. Animate Header
        tl.from(".page-header", { y: -20, opacity: 0, duration: 0.6 });

        // 2. Animate Stat Cards (Staggered)
        tl.from(".stat-card", { 
            y: 30, 
            opacity: 0, 
            duration: 0.6, 
            stagger: 0.1 
        }, "-=0.3");

        // 3. Animate Section Panels
        tl.from(".section-panel", { 
            x: -20, 
            opacity: 0, 
            duration: 0.6, 
            stagger: 0.2 
        }, "-=0.2");
        
        // 4. Animate individual skill bars inside the panels
        tl.from(".skill-bar-item", {
            width: 0, 
            opacity: 0, 
            duration: 0.5, 
            stagger: 0.05
        }, "-=0.4");

    }, { scope: container });
    
    // -------------------------------------------------------------------

    // Separate weak spots for easy display
    const weakSpots = MOCK_SCORES.filter(s => s.score < 65).sort((a, b) => a.score - b.score);
    const strongTopics = MOCK_SCORES.filter(s => s.score >= 80).sort((a, b) => b.score - a.score);

    return (
        <div ref={container} className="min-h-screen bg-slate-50 p-8">
            <header className="page-header mb-8 border-b border-slate-200 pb-4">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <BarChart3 className="w-8 h-8 text-indigo-600" />
                    Personalized Learning Analytics
                </h1>
                <p className="text-slate-500 mt-1">Detailed breakdown of your strengths, weaknesses, and activity.</p>
            </header>

            {/* 1. Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <StatCard 
                    title="Average Quiz Score" 
                    value={`${OVERVIEW_STATS.averageScore.toFixed(1)}%`}
                    icon={TrendingUp}
                    color="green"
                    trend="+4.5% last week"
                />
                <StatCard 
                    title="Mastered Topics" 
                    value={OVERVIEW_STATS.masteredTopics.toString()}
                    icon={BookOpen}
                    color="indigo"
                    trend="Ready for Advanced Content"
                />
                <StatCard 
                    title="Active Quizzes Due" 
                    value={OVERVIEW_STATS.activeQuizzes.toString()}
                    icon={Zap}
                    color="red"
                    trend="Focus on Spaced Repetition"
                />
                <StatCard 
                    title="Study Sessions" 
                    value={OVERVIEW_STATS.sessionsThisWeek.toString()}
                    icon={Clock}
                    color="yellow"
                    trend="6 Sessions this week"
                />
            </div>

            {/* 2. Strength and Weakness Heatmaps */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Weak Spots (Priority Review) */}
                <div className="section-panel bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                    <h2 className="text-xl font-bold text-red-600 flex items-center gap-2 mb-4">
                        <TrendingDown className="w-6 h-6" /> Weak Spots (Priority Review)
                    </h2>
                    <p className="text-sm text-slate-500 mb-6">These topics require immediate review according to your recent quiz results.</p>
                    
                    <div className="space-y-4">
                        {weakSpots.length > 0 ? (
                            weakSpots.map(score => <SkillBar key={score.topic} {...score} />)
                        ) : (
                            <div className="p-4 bg-green-50 text-green-700 rounded-lg">No critical weak spots detected!</div>
                        )}
                    </div>
                </div>

                {/* Strong Topics (Solid Mastery) */}
                <div className="section-panel bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                    <h2 className="text-xl font-bold text-green-600 flex items-center gap-2 mb-4">
                        <TrendingUp className="w-6 h-6" /> Strong Topics (Solid Mastery)
                    </h2>
                    <p className="text-sm text-slate-500 mb-6">You've demonstrated solid understanding here. Ready for application.</p>
                    
                    <div className="space-y-4">
                        {strongTopics.map(score => <SkillBar key={score.topic} {...score} />)}
                    </div>
                </div>
            </div>

            {/* 3. Global Skill List */}
             <div className="section-panel mt-8 bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <Brain className="w-6 h-6 text-purple-600" /> All Topic Scores
                </h2>
                <div className="space-y-2 pt-2">
                    {MOCK_SCORES.sort((a, b) => b.score - a.score).map(score => (
                        <SkillBar key={`all-${score.topic}`} {...score} />
                    ))}
                </div>
            </div>

        </div>
    );
}