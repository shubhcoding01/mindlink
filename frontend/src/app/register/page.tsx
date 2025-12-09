// 'use client';

// import React, { useState, useRef } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Brain, ArrowRight, Loader2, Lock, Mail, User } from 'lucide-react';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
// import api from '@/lib/axios'; // Uncomment when backend is ready

// export default function RegisterPage() {
//   const container = useRef<HTMLDivElement>(null);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   // Entrance Animation
//   useGSAP(() => {
//     const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
//     tl.from(".register-card", { y: 30, opacity: 0, duration: 0.8 })
//       .from(".logo-anim", { y: -20, opacity: 0, duration: 0.6 }, "-=0.4")
//       .from(".form-element", { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.4");
      
//   }, { scope: container });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Real API Call:
//       // await api.post('/auth/register', { name, email, password });
      
//       // Simulation:
//       setTimeout(() => {
//         setLoading(false);
//         router.push('/dashboard');
//       }, 1000);
//     } catch (error) {
//       console.error("Registration failed", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div ref={container} className="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-indigo-500/30 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
//       {/* Background Ambience */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
//          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen" />
//       </div>

//       <div className="relative z-10 w-full max-w-md">
        
//         {/* Logo Header */}
//         <Link href="/" className="logo-anim flex items-center justify-center gap-3 mb-8 hover:opacity-80 transition-opacity">
//           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
//              <Brain className="w-6 h-6 text-white" />
//           </div>
//           <span className="text-2xl font-bold tracking-tight text-white">MindLink</span>
//         </Link>

//         {/* Register Card */}
//         <div className="register-card bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          
//           {/* Top Highlight */}
//           <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

//           <div className="text-center mb-8">
//             <h1 className="text-2xl font-bold text-white mb-2">Initialize System</h1>
//             <p className="text-slate-400 text-sm">Create your neural profile to begin adaptive learning.</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
            
//             <div className="form-element group">
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-indigo-400 transition-colors">Full Name</label>
//               <div className="relative">
//                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
//                   <User className="w-5 h-5" />
//                 </div>
//                 <input 
//                   type="text" 
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-inner"
//                   placeholder="Alex Chen"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="form-element group">
//               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-indigo-400 transition-colors">Email Address</label>
//               <div className="relative">
//                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
//                   <Mail className="w-5 h-5" />
//                 </div>
//                 <input 
//                   type="email" 
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-inner"
//                   placeholder="name@example.com"
//                   required
//                 />
//               </div>
//             </div>
            
//             <div className="form-element group">
//                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-indigo-400 transition-colors">Set Password</label>
//               <div className="relative">
//                 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
//                   <Lock className="w-5 h-5" />
//                 </div>
//                 <input 
//                   type="password" 
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-inner"
//                   placeholder="••••••••"
//                   required
//                 />
//               </div>
//             </div>

//             <button 
//               type="submit" 
//               disabled={loading}
//               className="form-element w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-900/20 hover:shadow-indigo-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                   Creating Account...
//                 </>
//               ) : (
//                 <>
//                   Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </>
//               )}
//             </button>
//           </form>

//           <div className="form-element mt-8 text-center">
//             <p className="text-slate-500 text-sm">
//               Already have an account?{' '}
//               <Link href="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors hover:underline">
//                 Log in
//               </Link>
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Brain, ArrowRight, Loader2, Lock, Mail, User } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import api from '@/lib/axios';

export default function RegisterPage() {
  const container = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Simplified Entrance Animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Animate the main card only
    tl.fromTo(".register-card", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    );
    
    // Animate inputs stagger
    tl.fromTo(".form-input-group", 
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.4 },
      "-=0.2"
    );
      
  }, { scope: container });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Real API Call
      const response = await api.post('/auth/register', { name, email, password });
      
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
      }
      
      alert("Registration successful!");
      router.push('/dashboard');

    } catch (error: any) {
      console.error("Registration failed", error);
      alert(error.response?.data?.detail || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={container} className="min-h-screen bg-slate-950 font-sans text-slate-50 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        <Link href="/" className="flex items-center justify-center gap-3 mb-8 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
             <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">MindLink</span>
        </Link>

        <div className="register-card bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Initialize System</h1>
            <p className="text-slate-400 text-sm">Create your neural profile.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="form-input-group">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <User className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="Alex Chen"
                  required
                />
              </div>
            </div>

            <div className="form-input-group">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="form-input-group">
               <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* BUTTON: Ensure high contrast and z-index */}
            <div className="form-input-group pt-2">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 relative z-20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    Create Account <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

          <div className="mt-8 text-center form-input-group">
            <p className="text-slate-500 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors hover:underline">
                Log in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}