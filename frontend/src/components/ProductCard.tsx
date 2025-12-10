'use client';

import React from 'react';
import { BookOpen, BarChart3, Clock, ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';

// Define a general interface for a learning resource/product
interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  category: 'Course' | 'Quiz Pack' | 'Document';
  duration?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  link: string; // The link to the product/resource detail page
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  category,
  duration,
  difficulty,
  link,
}) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Intermediate': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Advanced': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Course': return <BookOpen className="w-5 h-5 text-indigo-400" />;
      case 'Quiz Pack': return <BarChart3 className="w-5 h-5 text-purple-400" />;
      default: return <FileText className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div 
      className="group relative bg-slate-900/60 backdrop-blur-sm border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-900/20 hover:-translate-y-1 overflow-hidden flex flex-col h-full resource-card"
    >
      {/* Hover Gradient Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex-1">
        {/* Header: Icon + Difficulty */}
        <div className="flex justify-between items-start mb-5">
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/50 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-colors">
             {getCategoryIcon(category)}
          </div>
          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getDifficultyColor(difficulty)}`}>
             {difficulty}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-slate-100 mb-3 line-clamp-2 group-hover:text-white transition-colors">
          {title}
        </h2>

        {/* Description */}
        <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed group-hover:text-slate-300 transition-colors">
          {description}
        </p>
      </div>
      
      {/* Footer: Metadata + Action */}
      <div className="relative z-10 pt-4 border-t border-slate-800 flex items-center justify-between mt-auto">
        {(duration && category !== 'Document') ? (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium group-hover:text-slate-400 transition-colors">
            <Clock className="w-3.5 h-3.5" />
            <span>{duration}</span>
          </div>
        ) : (
           <span /> // Spacer if no duration
        )}

        <Link 
          href={link} 
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors group/link"
        >
          View Resource <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;