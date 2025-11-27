'use client';

import React from 'react';

// Define the props for the Input component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, errorMessage, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {/* Label for accessibility and clarity */}
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
          {label}
        </label>
        
        {/* Input field */}
        <input
          id={id}
          ref={ref}
          className={`
            w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500/50 outline-none transition duration-150
            ${errorMessage 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-slate-300 focus:border-indigo-500'}
            ${className}
          `}
          {...props}
        />
        
        {/* Error Message display */}
        {errorMessage && (
          <p className="mt-1 text-xs text-red-600">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;