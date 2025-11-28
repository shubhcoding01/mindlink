'use client';

import React, { useState } from 'react';
import { Users, Search, BookOpen, Clock, Zap, MessageSquare, Calendar, User } from 'lucide-react';

// --- MOCK DATA ---

interface Tutor {
    id: number;
    name: string;
    expertise: string[];
    rating: number;
    rate: number; // hourly rate (mock)
    status: 'Available' | 'Busy' | 'Offline';
    avatarUrl: string;
}

const MOCK_TUTORS: Tutor[] = [
    {
        id: 1,
        name: 'Jane Cooper',
        expertise: ['RAG Architectures', 'Python/FastAPI', 'Vector Databases'],
        rating: 4.8,
        rate: 50,
        status: 'Available',
        avatarUrl: 'https://placehold.co/100x100/F97316/ffffff?text=JC',
    },
    {
        id: 2,
        name: 'Kyle Reese',
        expertise: ['Machine Learning', 'Data Science', 'Statistics'],
        rating: 4.5,
        rate: 45,
        status: 'Busy',
        avatarUrl: 'https://placehold.co/100x100/3B82F6/ffffff?text=KR',
    },
    {
        id: 3,
        name: 'Sarah Connor',
        expertise: ['Next.js/React', 'Tailwind CSS', 'UX Design'],
        rating: 4.9,
        rate: 60,
        status: 'Available',
        avatarUrl: 'https://placehold.co/100x100/10B981/ffffff?text=SC',
    },
];

// --- MAIN PAGE COMPONENT ---

export default function TutorPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

    const filteredTutors = MOCK_TUTORS.filter(tutor => 
        tutor.expertise.join(' ').toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusClass = (status: Tutor['status']) => {
        switch (status) {
            case 'Available': return 'bg-green-100 text-green-700 border-green-300';
            case 'Busy': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'Offline': return 'bg-slate-100 text-slate-500 border-slate-300';
        }
    };

    const handleBookSession = (tutor: Tutor) => {
        alert(`Simulating booking session with ${tutor.name}.`);
        // In a real app, this would open a booking modal/form
        setSelectedTutor(tutor);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <header className="mb-8 border-b border-slate-200 pb-4">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <Users className="w-8 h-8 text-indigo-600" />
                    Peer Tutoring & Collaboration
                </h1>
                <p className="text-slate-500 mt-1">Connect with expert tutors or study partners to accelerate your learning.</p>
            </header>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search for expertise (e.g., RAG, Next.js, FastAPI)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                </div>
                <button className="px-5 py-3 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    My Sessions
                </button>
            </div>

            {/* Tutor List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTutors.map((tutor) => (
                    <div 
                        key={tutor.id} 
                        className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 flex flex-col justify-between transition-all hover:shadow-xl"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <img 
                                src={tutor.avatarUrl} 
                                alt={tutor.name} 
                                className="w-16 h-16 rounded-full object-cover" 
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/94A3B8/ffffff?text=User'; }}
                            />
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">{tutor.name}</h3>
                                <p className="text-sm text-yellow-500 flex items-center gap-1 mt-1">
                                    ⭐ {tutor.rating.toFixed(1)} Rating
                                </p>
                            </div>
                        </div>

                        {/* Expertise Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {tutor.expertise.map((exp, index) => (
                                <span key={index} className="px-3 py-1 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-full">
                                    {exp}
                                </span>
                            ))}
                        </div>

                        {/* Status and Rate */}
                        <div className="flex items-center justify-between border-t border-b border-slate-100 py-3 mb-4">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusClass(tutor.status)}`}>
                                {tutor.status}
                            </span>
                            <span className="text-lg font-bold text-green-600">${tutor.rate}/hr</span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleBookSession(tutor)}
                                disabled={tutor.status === 'Busy'}
                                className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:bg-slate-400 flex items-center justify-center gap-2 text-sm"
                            >
                                <Zap className="w-4 h-4" />
                                {tutor.status === 'Available' ? 'Book Session' : 'Unavailable'}
                            </button>
                            <button
                                className="py-2 px-4 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition text-sm flex items-center gap-2"
                            >
                                <MessageSquare className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Empty State / Not Found */}
                {filteredTutors.length === 0 && (
                    <div className="md:col-span-2 lg:col-span-3 text-center p-12 bg-white rounded-xl shadow-sm border border-slate-200">
                        <User className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-xl font-semibold text-slate-700">No Tutors Found</p>
                        <p className="text-slate-500 mt-2">Try adjusting your search filters or check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
}