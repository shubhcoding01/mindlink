'use client';

import React from 'react';
import { BookOpen, BarChart3, Clock, ArrowRight } from 'lucide-react';
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
  const difficultyColor = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-orange-100 text-orange-700',
    Advanced: 'bg-red-100 text-red-700',
  };

  const Icon = category === 'Course' ? BookOpen : category === 'Quiz Pack' ? BarChart3 : BookOpen;

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-slate-100 flex flex-col h-full"
    >
      <div className="p-6 flex-1">
        {/* Category & Difficulty */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            {category}
          </span>
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${difficultyColor[difficulty]}`}>
            {difficulty}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-slate-900 mb-2 truncate" title={title}>
          {title}
        </h2>

        {/* Description */}
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        
        {/* Metadata */}
        {(duration && category !== 'Document') && (
          <div className="flex items-center text-sm text-slate-500 mt-2">
            <Clock className="w-4 h-4 mr-2" />
            <span className="font-medium">{duration}</span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="p-6 border-t border-slate-100">
        <Link 
          href={link} 
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
        >
          View Resource <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;