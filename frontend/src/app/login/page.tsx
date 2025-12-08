'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Brain, ArrowRight, Loader2, Lock, Mail } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import api from '@/lib/axios'; // Uncomment when backend is connected

export default function LoginPage() {
  const container = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Entrance Animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.from(".login-card", { y: 30, opacity: 0, duration: 0.8 })
      .from(".logo-anim", { y: -20, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(".form-element", { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.4");
      
  }, { scope: container });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Real API Call:
      // const { data } = await api.post('/auth/login', { email, password });
      // localStorage.setItem('access_token', data.access_token);
      
      // Simulation:
      setTimeout(() => {
        setLoading(false);
        router.push('/dashboard');
      }, 1000);
    } catch (error) {
      console.error("Login failed", error);
      setLoading(false);
    }
  };

  return (
    <div ref={container} className="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-indigo-500/30 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Logo Header */}
        <Link href="/" className="logo-anim flex items-center justify-center gap-3 mb-8 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
             <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">MindLink</span>
        </Link>

        {/* Login Card */}
        <div className="login-card bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Top Highlight */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-slate-400 text-sm">Enter your credentials to access the neural network.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="form-element group">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-indigo-400 transition-colors">Email Address</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-inner"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="form-element group">
              <div className="flex justify-between items-center mb-2">
                 <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider group-focus-within:text-indigo-400 transition-colors">Password</label>
                 <Link href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Forgot?</Link>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-inner"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="form-element w-full py-3 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-900/20 hover:shadow-indigo-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="form-element mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account?{' '}
              <Link href="/register" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors hover:underline">
                Initialize System
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}