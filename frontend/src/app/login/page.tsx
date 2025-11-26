// "use client";

// import Link from "next/link";
// import { useState } from "react";

// export default function LoginPage() {
//   const [loading, setLoading] = useState(false);

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     setTimeout(() => {
//       window.location.href = "/dashboard";
//     }, 1000);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <form
//         onSubmit={handleLogin}
//         className="card w-full max-w-md space-y-5"
//       >
//         <h1 className="text-2xl font-bold text-center">Login</h1>

//         <input type="email" placeholder="Email" className="input" required />
//         <input
//           type="password"
//           placeholder="Password"
//           className="input"
//           required
//         />

//         <button type="submit" className="btn-primary">
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p className="text-center text-sm">
//           Don't have an account?{" "}
//           <Link href="/register" className="text-blue-600 font-medium">
//             Register
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// 'use client';

// import React, { useState } from 'react';
// // In your local Next.js app, uncomment the line below and use <Link> instead of <a>
// // import Link from 'next/link';
// import { Brain } from 'lucide-react';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       setLoading(false);
//       // For this preview we use window.location, in Next.js use router.push('/dashboard')
//       console.log("Navigating to dashboard...");
//       alert("Login successful! (Simulated)");
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
//       <a href="/" className="flex items-center gap-2 mb-8">
//         <Brain className="w-10 h-10 text-indigo-600" />
//         <span className="text-2xl font-bold text-slate-900">MindLink</span>
//       </a>

//       <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md">
//         <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h1>
//         <p className="text-slate-500 mb-6">Enter your details to access your workspace.</p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
//             <input 
//               type="email" 
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
//               placeholder="alex@example.com"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
//             <input 
//               type="password" 
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
//               placeholder="••••••••"
//             />
//           </div>

//           <button 
//             type="submit" 
//             disabled={loading}
//             className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
//           >
//             {loading ? 'Signing in...' : 'Sign In'}
//           </button>
//         </form>

//         <div className="mt-6 text-center text-sm text-slate-500">
//           Don't have an account?{' '}
//           <a href="/register" className="text-indigo-600 font-medium hover:underline">
//             Sign up
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Brain } from 'lucide-react';
import api from '@/lib/axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Brain className="w-10 h-10 text-indigo-600" />
        <span className="text-2xl font-bold text-slate-900">MindLink</span>
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h1>
        <p className="text-slate-500 mb-6">Enter your details to access your workspace.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Don't have an account? <Link href="/register" className="text-indigo-600 hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}