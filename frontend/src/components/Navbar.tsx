// import Link from "next/link";

// export default function Navbar() {
//   return (
//     <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between">
//       <Link href="/" className="text-xl font-bold">
//         MindLink
//       </Link>

//       <div className="space-x-4">
//         <Link href="/login">Login</Link>
//         <Link href="/register">Register</Link>
//       </div>
//     </nav>
//   );
// }

import React from 'react';
import Link from 'next/link';
import { Brain } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2">
        <Brain className="w-8 h-8 text-indigo-600" />
        <span className="text-xl font-bold tracking-tight text-slate-900">MindLink</span>
      </Link>
      
      <div className="flex items-center gap-4">
        <Link 
          href="/login" 
          className="text-slate-600 hover:text-slate-900 font-medium transition"
        >
          Log in
        </Link>
        <Link 
          href="/register" 
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          Sign up
        </Link>
      </div>
    </nav>
  );
}