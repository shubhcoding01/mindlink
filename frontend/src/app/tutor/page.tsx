'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Users, Search, BookOpen, Clock, Zap, MessageSquare, 
  Calendar, User, Star, Filter, ArrowLeft 
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// --- MOCK DATA ---

interface Tutor {
    id: number;
    name: string;
    role: string;
    expertise: string[];
    rating: number;
    rate: number; // hourly rate
    status: 'Available' | 'Busy' | 'Offline';
    avatarUrl: string;
}

const MOCK_TUTORS: Tutor[] = [
    {
        id: 1,
        name: 'Jane Cooper',
        role: 'AI Systems Architect',
        expertise: ['RAG Architectures', 'Python/FastAPI', 'Vector DBs'],
        rating: 4.9,
        rate: 50,
        status: 'Available',
        avatarUrl: 'https://placehold.co/100x100/6366f1/ffffff?text=JC',
    },
    {
        id: 2,
        name: 'Kyle Reese',
        role: 'Data Scientist',
        expertise: ['Machine Learning', 'Data Science', 'Statistics'],
        rating: 4.7,
        rate: 45,
        status: 'Busy',
        avatarUrl: 'https://placehold.co/100x100/ec4899/ffffff?text=KR',
    },
    {
        id: 3,
        name: 'Sarah Connor',
        role: 'Full Stack Engineer',
        expertise: ['Next.js', 'Tailwind CSS', 'UX Design'],
        rating: 4.9,
        rate: 60,
        status: 'Available',
        avatarUrl: 'https://placehold.co/100x100/10b981/ffffff?text=SC',
    },
    {
        id: 4,
        name: 'John Smith',
        role: 'DevOps Engineer',
        expertise: ['Docker', 'Kubernetes', 'CI/CD Pipelines'],
        rating: 4.6,
        rate: 55,
        status: 'Offline',
        avatarUrl: 'https://placehold.co/100x100/f59e0b/ffffff?text=JS',
    },
    {
        id: 5,
        name: 'Emily Chen',
        role: 'NLP Researcher',
        expertise: ['LLMs', 'Prompt Engineering', 'LangChain'],
        rating: 5.0,
        rate: 80,
        status: 'Available',
        avatarUrl: 'https://placehold.co/100x100/8b5cf6/ffffff?text=EC',
    },
];

// --- MAIN PAGE COMPONENT ---

export default function TutorPage() {
    const container = useRef<HTMLDivElement>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

    // GSAP Entrance Animation
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        tl.from(".page-header", { y: -20, opacity: 0, duration: 0.6 })
          .from(".filter-bar", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
          .from(".tutor-card", { 
              y: 50, 
              opacity: 0, 
              stagger: 0.1, 
              duration: 0.6,
              clearProps: "all" 
          }, "-=0.3");

    }, { scope: container });

    const filteredTutors = MOCK_TUTORS.filter(tutor => 
        tutor.expertise.join(' ').toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusStyles = (status: Tutor['status']) => {
        switch (status) {
            case 'Available': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Busy': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'Offline': return 'bg-slate-800 text-slate-500 border-slate-700';
        }
    };

    const handleBookSession = (tutor: Tutor) => {
        alert(`Simulating booking session with ${tutor.name}.`);
        setSelectedTutor(tutor);
    };

    return (
        <div ref={container} className="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-indigo-500/30 p-8 lg:p-12 overflow-hidden relative">
            
            {/* Background Gradient */}
            <div className="fixed inset-0 z-0 pointer-events-none">
               <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen" />
               <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Header */}
                <header className="page-header mb-10">
                    <Link 
                        href="/dashboard" 
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Dashboard
                    </Link>
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3 tracking-tight">
                                <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
                                    <Users className="w-8 h-8" />
                                </div>
                                Neural Network
                            </h1>
                            <p className="text-slate-400 mt-2 text-lg">
                                Connect with expert nodes to accelerate your learning velocity.
                            </p>
                        </div>
                        
                        <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-900/50 hover:bg-indigo-500 transition flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            My Sessions
                        </button>
                    </div>
                </header>

                {/* Search & Filters */}
                <div className="filter-bar flex flex-col md:flex-row gap-4 mb-10">
                    <div className="relative flex-1 group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name, role, or expertise (e.g., RAG, Python)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-4 bg-slate-900/50 border border-slate-700/50 rounded-xl leading-5 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-inner backdrop-blur-sm"
                        />
                    </div>
                    <button className="px-6 py-4 bg-slate-900/50 border border-slate-700/50 rounded-xl text-slate-300 hover:text-white hover:border-slate-600 transition flex items-center gap-2 font-medium backdrop-blur-sm">
                        <Filter className="w-5 h-5" />
                        Filters
                    </button>
                </div>

                {/* Tutor Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTutors.map((tutor) => (
                        <div 
                            key={tutor.id} 
                            className="tutor-card group relative bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 overflow-hidden"
                        >
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img 
                                                src={tutor.avatarUrl} 
                                                alt={tutor.name} 
                                                className="w-14 h-14 rounded-full object-cover border-2 border-slate-700 group-hover:border-indigo-500/50 transition-colors" 
                                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/1e293b/ffffff?text=User'; }}
                                            />
                                            {/* Status Dot */}
                                            <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
                                                tutor.status === 'Available' ? 'bg-emerald-500' : 
                                                tutor.status === 'Busy' ? 'bg-amber-500' : 'bg-slate-500'
                                            }`} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors">{tutor.name}</h3>
                                            <p className="text-sm text-slate-400">{tutor.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/20 px-2 py-1 rounded-lg">
                                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                        <span className="text-xs font-bold text-yellow-500">{tutor.rating.toFixed(1)}</span>
                                    </div>
                                </div>

                                {/* Expertise Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {tutor.expertise.map((exp, index) => (
                                        <span key={index} className="px-2.5 py-1 text-xs font-medium bg-slate-800 text-slate-300 rounded-md border border-slate-700/50 group-hover:border-indigo-500/30 transition-colors">
                                            {exp}
                                        </span>
                                    ))}
                                </div>

                                {/* Footer Info */}
                                <div className="mt-auto pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Rate</p>
                                        <p className="text-lg font-bold text-white">${tutor.rate}<span className="text-sm text-slate-500 font-normal">/hr</span></p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            className="p-2.5 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 hover:text-white transition shadow-sm"
                                            title="Message"
                                        >
                                            <MessageSquare className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleBookSession(tutor)}
                                            disabled={tutor.status === 'Busy' || tutor.status === 'Offline'}
                                            className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition shadow-lg ${
                                                tutor.status === 'Available' 
                                                ? 'bg-linear-to-r from-indigo-600 to-violet-600 text-white hover:shadow-indigo-500/25 hover:scale-105' 
                                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                            }`}
                                        >
                                            <Zap className="w-4 h-4" />
                                            {tutor.status === 'Available' ? 'Book' : 'Busy'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredTutors.length === 0 && (
                    <div className="mt-12 text-center p-16 bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl backdrop-blur-sm">
                        <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
                            <User className="w-8 h-8" />
                        </div>
                        <p className="text-xl font-bold text-slate-300">No Experts Found</p>
                        <p className="text-slate-500 mt-2">Try adjusting your search criteria or broadening your expertise filters.</p>
                        <button 
                            onClick={() => setSearchTerm('')}
                            className="mt-6 text-indigo-400 hover:text-indigo-300 font-medium hover:underline transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}