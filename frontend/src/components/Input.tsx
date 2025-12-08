// 'use client';

// import React from 'react';

// // Define the props for the Input component
// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label: string;
//   id: string;
//   errorMessage?: string;
// }

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ label, id, errorMessage, className, ...props }, ref) => {
//     return (
//       <div className="w-full">
//         {/* Label for accessibility and clarity */}
//         <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
//           {label}
//         </label>
        
//         {/* Input field */}
//         <input
//           id={id}
//           ref={ref}
//           className={`
//             w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/50 outline-none transition duration-150
//             ${errorMessage 
//               ? 'border-red-500 focus:border-red-500' 
//               : 'border-slate-300 focus:border-indigo-500'}
//             ${className}
//           `}
//           {...props}
//         />
        
//         {/* Error Message display */}
//         {errorMessage && (
//           <p className="mt-1 text-xs text-red-600">
//             {errorMessage}
//           </p>
//         )}
//       </div>
//     );
//   }
// );

// Input.displayName = 'Input';

// export default Input;

'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

// Define the props for the Input component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  errorMessage?: string;
  // Optional: Left icon
  icon?: React.ElementType; 
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, errorMessage, className, icon: Icon, ...props }, ref) => {
    return (
      <div className="w-full group">
        {/* Label for accessibility and clarity */}
        <label 
          htmlFor={id} 
          className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 group-focus-within:text-indigo-400 transition-colors"
        >
          {label}
        </label>
        
        <div className="relative">
          {/* Optional Icon */}
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
              <Icon className="w-5 h-5" />
            </div>
          )}

          {/* Input field */}
          <input
            id={id}
            ref={ref}
            className={`
              w-full bg-slate-900/50 border rounded-xl text-slate-200 placeholder:text-slate-600 
              focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-inner
              ${Icon ? 'pl-10 pr-4' : 'px-4'} py-3
              ${errorMessage 
                ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' 
                : 'border-slate-800 focus:border-indigo-500/50'}
              ${className}
            `}
            {...props}
          />
        </div>
        
        {/* Error Message display */}
        {errorMessage && (
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400 animate-in slide-in-from-top-1 fade-in duration-200">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;