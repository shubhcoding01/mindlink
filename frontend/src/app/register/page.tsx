// "use client";

// import Link from "next/link";
// import { useState } from "react";

// export default function RegisterPage() {
//   const [loading, setLoading] = useState(false);

//   const handleRegister = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     setTimeout(() => {
//       window.location.href = "/dashboard";
//     }, 1000);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <form
//         onSubmit={handleRegister}
//         className="card w-full max-w-md space-y-5"
//       >
//         <h1 className="text-2xl font-bold text-center">Create Account</h1>

//         <input type="text" placeholder="Full Name" className="input" required />
//         <input type="email" placeholder="Email" className="input" required />
//         <input
//           type="password"
//           placeholder="Password"
//           className="input"
//           required
//         />

//         <button type="submit" className="btn-primary">
//           {loading ? "Creating..." : "Create Account"}
//         </button>

//         <p className="text-center text-sm">
//           Already have an account?{" "}
//           <Link href="/login" className="text-blue-600 font-medium">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Brain } from 'lucide-react';
import api from '@/lib/axios';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Real API Call:
      // await api.post('/auth/register', { name, email, password });
      
      // Simulation:
      setTimeout(() => {
        setLoading(false);
        router.push('/dashboard');
      }, 1000);
    } catch (error) {
      console.error("Registration failed", error);
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
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h1>
        <p className="text-slate-500 mb-6">Start your personalized learning journey.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-indigo-500"
              required
            />
          </div>
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
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <Link href="/login" className="text-indigo-600 hover:underline">Log in</Link>
        </div>
      </div>
    </div>
  );
}