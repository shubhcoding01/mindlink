'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ListChecks, Plus, Loader2 } from 'lucide-react';
import ProductCard from '@/components/ProductCard'; // Import the component we defined earlier
// import api from '@/lib/axios'; // Uncomment when connected to backend

// Define the type for the resource data (matching ProductCard props)
interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'Course' | 'Quiz Pack' | 'Document';
  duration?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  link: string;
}

// Mock Data to display while the backend is not connected
const MOCK_RESOURCES: Resource[] = [
  {
    id: 'res-1',
    title: 'Introduction to RAG Pipelines',
    description: 'Learn the foundational concepts of Retrieval-Augmented Generation using vector databases and LLMs.',
    category: 'Course',
    duration: '1h 45m',
    difficulty: 'Intermediate',
    link: '/products/res-1',
  },
  {
    id: 'res-2',
    title: 'Python for Data Science Basics',
    description: 'A quick refresher on Pandas, NumPy, and basic data manipulation techniques.',
    category: 'Quiz Pack',
    duration: '30 min',
    difficulty: 'Beginner',
    link: '/products/res-2',
  },
  {
    id: 'res-3',
    title: 'Advanced Transformer Architectures',
    description: 'Deep dive into attention mechanisms, positional encoding, and models like BERT and GPT.',
    category: 'Document',
    difficulty: 'Advanced',
    link: '/products/res-3',
  },
];


export default function ProductListPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      setError(null);
      try {
        // --- REAL API CALL (Uncomment when backend is running) ---
        // const { data } = await api.get('/products');
        // setResources(data);

        // --- MOCK DATA SIMULATION ---
        await new Promise(resolve => setTimeout(resolve, 500)); 
        setResources(MOCK_RESOURCES);

      } catch (err) {
        console.error("Failed to fetch resources:", err);
        setError("Could not load resources. Please check the API connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <ListChecks className="w-8 h-8 text-indigo-600" />
          Learning Resource Library
        </h1>
        <Link 
          href="/products/add"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Resource
        </Link>
      </header>

      {/* Loading State */}
      {loading && (
        <div className="text-center p-12 bg-white rounded-xl shadow-sm border border-slate-200">
          <Loader2 className="w-8 h-8 text-indigo-500 mx-auto mb-4 animate-spin" />
          <p className="text-slate-600">Loading personalized resources...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && resources.length === 0 && !error && (
        <div className="text-center p-12 bg-white rounded-xl shadow-sm border border-slate-200">
          <p className="text-xl font-semibold text-slate-700">No Resources Found</p>
          <p className="text-slate-500 mt-2">Start by adding a new learning resource to your library.</p>
          <Link 
            href="/products/add"
            className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Create Your First Resource →
          </Link>
        </div>
      )}

      {/* Resource Grid */}
      {!loading && resources.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {resources.map((resource) => (
            <ProductCard 
              key={resource.id}
              id={resource.id}
              title={resource.title}
              description={resource.description}
              category={resource.category}
              duration={resource.duration}
              difficulty={resource.difficulty}
              link={resource.link}
            />
          ))}
        </div>
      )}
    </div>
  );
}