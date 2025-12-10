'use client';

import React from 'react';
import { ChevronRight, PlayCircle, Star, Sparkles } from 'lucide-react';
import { Skiper40, SkiperItem } from '@/components/ui/skiper40';

interface Topic {
  id: string;
  title: string;
  category: string;
  duration: string;
  color: string;
  rating?: number;
}

const MOCK_TOPICS: Topic[] = [
  { id: '1', title: 'Vector Embeddings 101', category: 'Concept', duration: '15 min', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20', rating: 4.8 },
  { id: '2', title: 'Transformer Architecture', category: 'Deep Dive', duration: '45 min', color: 'text-purple-400 bg-purple-400/10 border-purple-400/20', rating: 4.9 },
  { id: '3', title: 'RAG Pipelines Setup', category: 'Practical', duration: '30 min', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', rating: 4.7 },
  { id: '4', title: 'Python Async/Await', category: 'Coding', duration: '20 min', color: 'text-orange-400 bg-orange-400/10 border-orange-400/20', rating: 4.6 },
  { id: '5', title: 'Prompt Engineering', category: 'Skill', duration: '25 min', color: 'text-pink-400 bg-pink-400/10 border-pink-400/20', rating: 4.9 },
];

export default function LearningCarousel() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-6 px-1">
        <div>
           <h3 className="font-bold text-white text-xl flex items-center gap-2">
             <Sparkles className="w-5 h-5 text-indigo-400" />
             Recommended for You
           </h3>
           <p className="text-slate-400 text-sm mt-1">AI-curated modules based on your gaps.</p>
        </div>
        <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">View All</button>
      </div>
      
      {/* Skiper40 Component 
        Ensures smooth horizontal scrolling without scrollbars 
      */}
      <Skiper40>
        {MOCK_TOPICS.map((topic) => (
          <SkiperItem key={topic.id} className="w-72">
            <div className="h-full p-5 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between relative overflow-hidden">
              
              {/* Subtle Gradient Glow on Hover */}
              <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${topic.color}`}>
                    {topic.category}
                  </span>
                  {topic.rating && (
                    <span className="flex items-center text-xs text-slate-400 font-medium bg-slate-800/50 px-2 py-1 rounded-lg">
                      <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
                      {topic.rating}
                    </span>
                  )}
                </div>
                
                <h4 className="font-bold text-slate-200 mb-2 text-lg leading-snug group-hover:text-white transition-colors">
                  {topic.title}
                </h4>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-500 mt-6 pt-4 border-t border-slate-800">
                <span className="flex items-center gap-1.5 font-medium group-hover:text-slate-400 transition-colors">
                  <PlayCircle className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" /> 
                  {topic.duration}
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-md">
                    <ChevronRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          </SkiperItem>
        ))}
      </Skiper40>
    </div>
  );
}