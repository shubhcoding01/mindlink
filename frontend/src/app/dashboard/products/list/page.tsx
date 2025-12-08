// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { ListChecks, Plus, Loader2 } from 'lucide-react';
// import ProductCard from '@/components/ProductCard'; // Import the component we defined earlier
// // import api from '@/lib/axios'; // Uncomment when connected to backend

// // Define the type for the resource data (matching ProductCard props)
// interface Resource {
//   id: string;
//   title: string;
//   description: string;
//   category: 'Course' | 'Quiz Pack' | 'Document';
//   duration?: string;
//   difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
//   link: string;
// }

// // Mock Data to display while the backend is not connected
// const MOCK_RESOURCES: Resource[] = [
//   {
//     id: 'res-1',
//     title: 'Introduction to RAG Pipelines',
//     description: 'Learn the foundational concepts of Retrieval-Augmented Generation using vector databases and LLMs.',
//     category: 'Course',
//     duration: '1h 45m',
//     difficulty: 'Intermediate',
//     link: '/products/res-1',
//   },
//   {
//     id: 'res-2',
//     title: 'Python for Data Science Basics',
//     description: 'A quick refresher on Pandas, NumPy, and basic data manipulation techniques.',
//     category: 'Quiz Pack',
//     duration: '30 min',
//     difficulty: 'Beginner',
//     link: '/products/res-2',
//   },
//   {
//     id: 'res-3',
//     title: 'Advanced Transformer Architectures',
//     description: 'Deep dive into attention mechanisms, positional encoding, and models like BERT and GPT.',
//     category: 'Document',
//     difficulty: 'Advanced',
//     link: '/products/res-3',
//   },
// ];


// export default function ProductListPage() {
//   const [resources, setResources] = useState<Resource[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchResources = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // --- REAL API CALL (Uncomment when backend is running) ---
//         // const { data } = await api.get('/products');
//         // setResources(data);

//         // --- MOCK DATA SIMULATION ---
//         await new Promise(resolve => setTimeout(resolve, 500)); 
//         setResources(MOCK_RESOURCES);

//       } catch (err) {
//         console.error("Failed to fetch resources:", err);
//         setError("Could not load resources. Please check the API connection.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResources();
//   }, []);

//   return (
//     <div className="min-h-screen bg-slate-50 p-8">
//       <header className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
//           <ListChecks className="w-8 h-8 text-indigo-600" />
//           Learning Resource Library
//         </h1>
//         <Link 
//           href="/products/add"
//           className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center gap-2 text-sm"
//         >
//           <Plus className="w-4 h-4" />
//           Add New Resource
//         </Link>
//       </header>

//       {/* Loading State */}
//       {loading && (
//         <div className="text-center p-12 bg-white rounded-xl shadow-sm border border-slate-200">
//           <Loader2 className="w-8 h-8 text-indigo-500 mx-auto mb-4 animate-spin" />
//           <p className="text-slate-600">Loading personalized resources...</p>
//         </div>
//       )}

//       {/* Error State */}
//       {error && (
//         <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//           <p>{error}</p>
//         </div>
//       )}

//       {/* Empty State */}
//       {!loading && resources.length === 0 && !error && (
//         <div className="text-center p-12 bg-white rounded-xl shadow-sm border border-slate-200">
//           <p className="text-xl font-semibold text-slate-700">No Resources Found</p>
//           <p className="text-slate-500 mt-2">Start by adding a new learning resource to your library.</p>
//           <Link 
//             href="/products/add"
//             className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium"
//           >
//             Create Your First Resource →
//           </Link>
//         </div>
//       )}

//       {/* Resource Grid */}
//       {!loading && resources.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {resources.map((resource) => (
//             <ProductCard 
//               key={resource.id}
//               id={resource.id}
//               title={resource.title}
//               description={resource.description}
//               category={resource.category}
//               duration={resource.duration}
//               difficulty={resource.difficulty}
//               link={resource.link}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ListChecks, Plus, Loader2, Search, Filter, BookOpen, BarChart3, FileText, ArrowRight, Clock } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// import api from '@/lib/axios'; // Uncomment when connected to backend

// Define the type for the resource data
interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'Course' | 'Quiz Pack' | 'Document';
  duration?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  link: string;
}

// Mock Data
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
  {
    id: 'res-4',
    title: 'Prompt Engineering Strategies',
    description: 'Master the art of crafting effective prompts for large language models.',
    category: 'Course',
    duration: '2h 15m',
    difficulty: 'Intermediate',
    link: '/products/res-4',
  },
];

export default function ProductListPage() {
  const container = useRef<HTMLDivElement>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      setError(null);
      try {
        // --- REAL API CALL ---
        // const { data } = await api.get('/products');
        // setResources(data);

        // --- MOCK DATA ---
        await new Promise(resolve => setTimeout(resolve, 800)); 
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

  // GSAP Animation for List Items
  useGSAP(() => {
    if (!loading && resources.length > 0) {
      gsap.fromTo(".resource-card", 
        { y: 50, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: "power2.out",
          clearProps: "all" // Important for hover effects to work after animation
        }
      );
    }
  }, [loading, resources]); // Re-run when loading finishes

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Course': return <BookOpen className="w-5 h-5 text-indigo-400" />;
      case 'Quiz Pack': return <BarChart3 className="w-5 h-5 text-emerald-400" />;
      default: return <FileText className="w-5 h-5 text-blue-400" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Advanced': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-800 text-slate-400';
    }
  };

  return (
    <div ref={container} className="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-indigo-500/30 p-8 lg:p-12 overflow-hidden relative">
      
      {/* Background Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-slate-800 pb-8">
          <div>
             <h1 className="text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3 tracking-tight">
              <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
                <ListChecks className="w-8 h-8" />
              </div>
              Learning Library
            </h1>
            <p className="text-slate-400 mt-2 text-lg">Curated knowledge modules and neural pathways.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search resources..." 
                  className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                />
             </div>
             <button className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-300 hover:text-white hover:border-slate-500 transition flex items-center justify-center gap-2 text-sm font-medium">
                <Filter className="w-4 h-4" /> Filter
             </button>
             <Link 
              href="/products/add"
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Resource
            </Link>
          </div>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Retrieving vector indices...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-6 bg-red-900/10 border border-red-500/20 text-red-300 rounded-2xl flex flex-col items-center text-center">
             <p className="mb-4">{error}</p>
             <button 
               onClick={() => window.location.reload()}
               className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-sm transition"
             >
               Retry Connection
             </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && resources.length === 0 && !error && (
          <div className="text-center py-24 bg-slate-900/30 border border-dashed border-slate-800 rounded-3xl">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
               <FileText className="w-8 h-8" />
            </div>
            <p className="text-xl font-bold text-slate-300">No Resources Found</p>
            <p className="text-slate-500 mt-2 max-w-md mx-auto">Your knowledge base is empty. Initialize your first learning module to begin training.</p>
            <Link 
              href="/products/add"
              className="mt-6 inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold hover:underline"
            >
              Create First Resource <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Resource Grid */}
        {!loading && resources.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {resources.map((resource) => (
              <div 
                key={resource.id}
                className="resource-card group relative bg-slate-900/60 backdrop-blur-sm border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-900/10 hover:-translate-y-1 overflow-hidden"
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                   <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
                         {getCategoryIcon(resource.category)}
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(resource.difficulty)}`}>
                         {resource.difficulty}
                      </span>
                   </div>

                   <h3 className="text-lg font-bold text-slate-200 mb-2 line-clamp-2 group-hover:text-white transition-colors">
                     {resource.title}
                   </h3>
                   
                   <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-1">
                     {resource.description}
                   </p>

                   <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-auto">
                      {resource.duration && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                           <Clock className="w-3.5 h-3.5" />
                           {resource.duration}
                        </div>
                      )}
                      
                      <Link 
                        href={resource.link}
                        className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold flex items-center gap-1 group/link"
                      >
                        Access <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}