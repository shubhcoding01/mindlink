import React from 'react';
import Link from 'next/link';
import { Brain, Upload, BarChart3 } from 'lucide-react';
// If you have a Navbar component, you can import it. 
// For now, I have included the header inline to match your selected code exactly.

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-indigo-600" />
          <span className="text-xl font-bold tracking-tight">MindLink</span>
        </div>
        <Link 
          href="/login"
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          Sign In
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-12 mb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 max-w-4xl leading-tight">
          Your AI-Powered <span className="text-indigo-600">Personalized</span> Learning Companion
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
          Upload your notes, get custom study plans, and master any topic with an AI tutor that adapts to your learning style.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/register"
            className="px-8 py-4 bg-indigo-600 text-white text-lg rounded-xl hover:bg-indigo-700 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 font-semibold flex items-center justify-center"
          >
            Get Started for Free
          </Link>
          <Link 
            href="/dashboard"
            className="px-8 py-4 bg-white text-slate-700 text-lg rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition font-semibold flex items-center justify-center"
          >
            View Demo
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl text-left">
          {[
            { icon: Upload, title: "Knowledge Base", desc: "Upload PDFs and notes. We organize them into your personal vector brain." },
            { icon: Brain, title: "Adaptive AI", desc: "Our RAG engine generates explanations tailored to your visual or textual preference." },
            { icon: BarChart3, title: "Smart Analytics", desc: "Track weak spots and get automated spaced-repetition schedules." }
          ].map((feature, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <feature.icon className="w-10 h-10 text-indigo-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}