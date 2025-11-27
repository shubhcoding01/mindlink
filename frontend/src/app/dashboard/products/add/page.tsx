'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Loader2 } from 'lucide-react';
// import api from '@/lib/axios'; // Uncomment when connected to backend
// import Input from '@/components/Input'; // Assuming you have a reusable Input component

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
  const [formData, setFormData] = useState<ProductFormState>({
    title: '',
    description: '',
    category: 'course',
    duration: '',
    difficulty: 'Beginner',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      
      alert(`Successfully added "${formData.title}"! (Simulated)`);
      router.push('/products/list');
      
    } catch (err) {
      console.error("Product submission failed:", err);
      setError("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ id, label, type = "text", value, onChange, placeholder }: any) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
        required
      />
    </div>
  );


  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <PlusCircle className="w-8 h-8 text-indigo-600" />
          Add New Learning Resource
        </h1>
        <p className="text-slate-500 mt-1">Define the properties for a new course, quiz pack, or document set.</p>
      </header>

      <div className="max-w-4xl bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <InputField
            id="title"
            label="Resource Title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Fundamentals of Vector Embeddings"
          />

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="A detailed summary of what this resource covers."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">
                Content Type
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white"
                required
              >
                {CONTENT_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <InputField
              id="duration"
              label="Estimated Duration (e.g., 2h 30m)"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 45 min"
            />

            {/* Difficulty */}
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-slate-700 mb-1">
                Difficulty Level
              </label>
              <select
                id="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white"
                required
              >
                {DIFFICULTY_LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 mt-6 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating Resource...
              </>
            ) : (
              'Create Resource'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}