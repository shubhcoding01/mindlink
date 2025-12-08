'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Loader2, Sparkles, Save, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import api from '@/lib/axios'; // Uncomment when connected to backend

// Define the content type options relevant to MindLink/learning
const CONTENT_TYPES = [
  { value: 'course', label: 'Course/Curriculum' },
  { value: 'quiz_pack', label: 'Quiz Pack' },
  { value: 'document', label: 'Document/Note Set' },
];

// Define difficulty levels
const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

interface ProductFormState {
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const container = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<ProductFormState>({
    title: '',
    description: '',
    category: 'course',
    duration: '',
    difficulty: 'Beginner',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // GSAP Entrance Animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".page-header", { y: -20, opacity: 0, duration: 0.6 })
      .from(".form-container", { y: 30, opacity: 0, scale: 0.98, duration: 0.6 }, "-=0.3")
      .from(".form-element", { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.4");
      
  }, { scope: container });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!formData.title || !formData.description) {
      setError("Title and Description are required.");
      setLoading(false);
      return;
    }

    try {
      // --- REAL API CALL (Uncomment when backend is running) ---
      // const response = await api.post('/products', formData);
      
      // --- MOCK SUBMISSION ---
      console.log("Submitting new product:", formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      // Simulate success
      router.push('/products/list');
      
    } catch (err) {
      console.error("Product submission failed:", err);
      setError("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ id, label, type = "text", value, onChange, placeholder }: any) => (
    <div className="form-element group">
      <label htmlFor={id} className="block text-sm font-medium text-slate-400 mb-1 group-focus-within:text-indigo-400 transition-colors">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-inner"
          required
        />
        {/* Subtle glow effect on focus can be handled via CSS or just the ring above */}
      </div>
    </div>
  );

  return (
    <div ref={container} className="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-indigo-500/30 flex justify-center p-6 lg:p-12 overflow-hidden relative">
      
      {/* Background Gradient - Matching Layout */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] mix-blend-screen" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="w-full max-w-3xl relative z-10">
        
        {/* Header */}
        <header className="page-header mb-8 text-center md:text-left">
          <button 
            onClick={() => router.back()} 
            className="text-slate-500 hover:text-white transition mb-4 flex items-center gap-2 text-sm font-medium"
          >
             <X className="w-4 h-4" /> Cancel & Go Back
          </button>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white flex items-center justify-center md:justify-start gap-3 tracking-tight">
            <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
               <PlusCircle className="w-8 h-8" />
            </div>
            Create Resource
          </h1>
          <p className="text-slate-400 mt-2 text-lg">Initialize a new learning module for the neural network.</p>
        </header>

        {/* Form Card */}
        <div className="form-container bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Decorative top highlight */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-50" />

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Title */}
            <InputField
              id="title"
              label="Resource Title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Fundamentals of Vector Embeddings"
            />

            {/* Description */}
            <div className="form-element group">
              <label htmlFor="description" className="block text-sm font-medium text-slate-400 mb-1 group-focus-within:text-indigo-400 transition-colors">
                Description & Context
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Provide a detailed summary or instructions for the AI to process..."
                className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-inner resize-none"
                required
              />
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Category */}
              <div className="form-element group">
                <label htmlFor="category" className="block text-sm font-medium text-slate-400 mb-1 group-focus-within:text-indigo-400 transition-colors">
                  Content Type
                </label>
                <div className="relative">
                  <select
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700/50 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
                    required
                  >
                    {CONTENT_TYPES.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Duration */}
              <InputField
                id="duration"
                label="Duration (Est.)"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 45 min"
              />

              {/* Difficulty */}
              <div className="form-element group">
                <label htmlFor="difficulty" className="block text-sm font-medium text-slate-400 mb-1 group-focus-within:text-indigo-400 transition-colors">
                  Complexity
                </label>
                <div className="relative">
                  <select
                    id="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700/50 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all appearance-none cursor-pointer"
                    required
                  >
                    {DIFFICULTY_LEVELS.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="form-element p-4 bg-red-900/20 border border-red-500/30 text-red-300 rounded-xl text-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="form-element pt-4 flex items-center justify-end gap-4">
               <button 
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 text-slate-400 hover:text-white font-medium transition-colors"
               >
                 Cancel
               </button>
               <button 
                  type="submit" 
                  disabled={loading}
                  className="relative group px-8 py-3 bg-linear-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-900/20 hover:shadow-indigo-600/40 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 overflow-hidden"
               >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Resource
                    </>
                  )}
               </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}