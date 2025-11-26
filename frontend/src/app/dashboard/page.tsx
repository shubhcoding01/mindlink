'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  MessageSquare, 
  BarChart3, 
  Brain, 
  CheckCircle, 
  ChevronRight, 
  Settings,
  LogOut,
  FileText
} from 'lucide-react';

// Import components
import ChatInterface from '@/components/ChatInterface';
import DocumentUploader from '@/components/DocumentUploader';

// --- MOCK DATA ---
interface UserProfile {
  name: string;
  learningStyle: 'Visual' | 'Textual' | 'Auditory';
  streak: number;
}

interface StudyPlanItem {
  id: string;
  topic: string;
  type: 'Quiz' | 'Reading' | 'Video';
  duration: string;
  status: 'pending' | 'completed';
}

const MOCK_USER: UserProfile = {
  name: "Alex",
  learningStyle: "Visual",
  streak: 12
};

const MOCK_PLAN: StudyPlanItem[] = [
  { id: '1', topic: 'Intro to Neural Networks', type: 'Reading', duration: '15 min', status: 'completed' },
  { id: '2', topic: 'Backpropagation Basics', type: 'Video', duration: '10 min', status: 'pending' },
  { id: '3', topic: 'Quiz: Activation Functions', type: 'Quiz', duration: '5 min', status: 'pending' },
];
// ----------------

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'study' | 'chat' | 'files' | 'stats'>('study');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      {/* Sidebar Navigation */}
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10 transition-all duration-300">
        <div className="p-6 flex items-center gap-3">
          <Brain className="w-8 h-8 text-indigo-600" />
          <span className="text-xl font-bold hidden lg:block">MindLink</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {[
            { id: 'study', icon: BookOpen, label: 'Study Plan' },
            { id: 'chat', icon: MessageSquare, label: 'AI Tutor' },
            { id: 'files', icon: FileText, label: 'Documents' },
            { id: 'stats', icon: BarChart3, label: 'Analytics' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                activeTab === item.id 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="hidden lg:block font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              {MOCK_USER.name[0]}
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold">{MOCK_USER.name}</p>
              <p className="text-xs text-slate-500">{MOCK_USER.learningStyle} Learner</p>
            </div>
          </div>
          <Link 
            href="/"
            className="w-full flex items-center gap-3 p-2 text-red-500 hover:bg-red-50 rounded-lg transition text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden lg:block">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-20 lg:ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {activeTab === 'study' && "Today's Study Plan"}
              {activeTab === 'chat' && "AI Tutor Session"}
              {activeTab === 'files' && "Document Library"}
              {activeTab === 'stats' && "Performance Analytics"}
            </h2>
            <p className="text-slate-500">
              {activeTab === 'study' && "You're on a 12-day streak! Keep it up."}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-full text-sm font-medium border border-orange-100">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Streak: {MOCK_USER.streak} days
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Dynamic Content Views */}
        <div className="max-w-5xl">
          {activeTab === 'study' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main List */}
              <div className="lg:col-span-2 space-y-4">
                {MOCK_PLAN.map((item) => (
                  <div key={item.id} className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        {item.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{item.topic}</h4>
                        <p className="text-sm text-slate-500 flex items-center gap-2">
                          <span className="capitalize">{item.type}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          {item.duration}
                        </p>
                      </div>
                    </div>
                    {item.status !== 'completed' && (
                      <button className="px-4 py-2 bg-slate-900 text-white text-sm rounded-lg group-hover:bg-indigo-600 transition">
                        Start
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Sidebar Widgets */}
              <div className="space-y-6">
                 <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg">
                    <h3 className="font-bold text-lg mb-2">Weekly Goal</h3>
                    <div className="w-full bg-white/20 h-2 rounded-full mb-2">
                      <div className="w-[75%] bg-white h-full rounded-full" />
                    </div>
                    <p className="text-sm opacity-90">12/16 topics mastered</p>
                 </div>
                 
                 <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                   <h3 className="font-bold text-slate-800 mb-4">Recommended Review</h3>
                   <div className="space-y-3">
                     {['Linear Algebra', 'Python Basics'].map(topic => (
                       <div key={topic} className="flex items-center justify-between text-sm">
                         <span className="text-slate-600">{topic}</span>
                         <ChevronRight className="w-4 h-4 text-slate-400" />
                       </div>
                     ))}
                   </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'chat' && <ChatInterface />}
          
          {activeTab === 'files' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DocumentUploader />
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4">Processing Status</h3>
                <p className="text-slate-500 text-sm">Upload documents to see their processing status here. Once processed, they become available to the AI Tutor.</p>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
             <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
                <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900">Analytics Coming Soon</h3>
                <p className="text-slate-500">Track your progress and quiz scores here in the next update.</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}