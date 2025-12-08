// 'use client';

// import React, { useState } from 'react';
// import { Upload, FileText, Plus, Clock, CheckCircle, Loader2 } from 'lucide-react';
// // import api from '@/lib/axios'; // Uncomment when backend is ready

// // Define a simple structure for an uploaded file
// interface Document {
//     name: string;
//     status: 'pending' | 'processing' | 'ready' | 'error';
//     id: string;
// }

// export default function DocumentUploader() {
//   const [files, setFiles] = useState<Document[]>([]);
//   const [isDragging, setIsDragging] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   // Simulates file selection/drop
//   const handleFileSelect = (file: File | null = null) => {
//     if (uploading) return;

//     // Simulate file input dialog (or use file drop data)
//     const newFile: Document = {
//       id: Math.random().toString(36).substring(2, 9),
//       name: file ? file.name : `Uploaded_Note_${files.length + 1}.pdf`,
//       status: 'pending',
//     };

//     setFiles(prev => [...prev, newFile]);
//     setUploading(true);
    
//     // Start processing simulation
//     setTimeout(() => {
//         // Step 1: Change status to processing
//         setFiles(prev => prev.map(f => f.id === newFile.id ? { ...f, status: 'processing' } : f));

//         // Step 2: Simulate API call for ingestion/embedding (1.5 seconds)
//         setTimeout(() => {
//             // Step 3: Change status to ready
//             setFiles(prev => prev.map(f => f.id === newFile.id ? { ...f, status: 'ready' } : f));
//             setUploading(false);
//         }, 1500);

//     }, 500);
//   };
  
//   // Handlers for drag-and-drop visual feedback
//   const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
//   const handleDragLeave = () => setIsDragging(false);
//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       // In a real app, you would loop through files. We simulate with the first one.
//       handleFileSelect(e.dataTransfer.files[0]);
//     }
//   };


//   const getStatusDisplay = (status: Document['status']) => {
//     switch (status) {
//       case 'pending': return { icon: Clock, color: 'text-yellow-600 bg-yellow-100', text: 'Waiting' };
//       case 'processing': return { icon: Loader2, color: 'text-indigo-600 bg-indigo-100 animate-spin', text: 'Processing' };
//       case 'ready': return { icon: CheckCircle, color: 'text-green-600 bg-green-100', text: 'Ready' };
//       case 'error': return { icon: Upload, color: 'text-red-600 bg-red-100', text: 'Failed' };
//       default: return { icon: Upload, color: 'text-slate-500 bg-slate-100', text: '' };
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
//       <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
//         <Upload className="w-5 h-5 text-indigo-600" />
//         Add Knowledge Base Files
//       </h3>
      
//       {/* Drop Zone / Upload Button */}
//       <div 
//         onClick={() => handleFileSelect()} // Trigger simulation on click
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
//           isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400'
//         }`}
//       >
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
//             {uploading ? <Clock className="animate-spin" /> : <Plus />}
//           </div>
//           <p className="text-slate-700 font-medium">
//             {uploading ? "File Received. Ingesting..." : "Click or drag PDFs/Notes here"}
//           </p>
//           <p className="text-xs text-slate-500">Supports PDF, TXT, MD (Max 10MB)</p>
//         </div>
//       </div>

//       {/* Library List */}
//       {files.length > 0 && (
//         <div className="mt-6 space-y-2">
//           <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Your Library</h4>
//           {files.map((file) => {
//             const status = getStatusDisplay(file.status);
//             return (
//               <div key={file.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-sm">
//                 <div className="flex items-center gap-2 truncate">
//                   <FileText className="w-4 h-4 text-slate-400" />
//                   <span className="text-slate-700 truncate">{file.name}</span>
//                 </div>
//                 <div className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1.5 ${status.color}`}>
//                   <status.icon className={`w-3 h-3 ${file.status === 'processing' ? 'animate-spin' : ''}`} />
//                   {status.text}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Plus, Clock, CheckCircle, Loader2, X, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Define a simple structure for an uploaded file
interface Document {
    name: string;
    status: 'pending' | 'processing' | 'ready' | 'error';
    id: string;
    size: string;
}

export default function DocumentUploader() {
  const [files, setFiles] = useState<Document[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Entrance Animation
  useGSAP(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, { scope: containerRef });

  // Animate new files when added
  useEffect(() => {
    if (listRef.current && files.length > 0) {
      const lastChild = listRef.current.lastElementChild;
      if (lastChild) {
        gsap.fromTo(lastChild,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.2)" }
        );
      }
    }
  }, [files.length]);

  // Simulates file selection/drop
  const handleFileSelect = (file: File | null = null) => {
    if (uploading) return;

    // Simulate file input dialog (or use file drop data)
    const newFile: Document = {
      id: Math.random().toString(36).substring(2, 9),
      name: file ? file.name : `Neural_Dataset_${files.length + 1}.pdf`,
      status: 'pending',
      size: file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : '2.4 MB'
    };

    setFiles(prev => [...prev, newFile]);
    setUploading(true);
    
    // Start processing simulation
    setTimeout(() => {
        // Step 1: Change status to processing
        setFiles(prev => prev.map(f => f.id === newFile.id ? { ...f, status: 'processing' } : f));

        // Step 2: Simulate API call for ingestion/embedding (1.5 seconds)
        setTimeout(() => {
            // Step 3: Change status to ready
            setFiles(prev => prev.map(f => f.id === newFile.id ? { ...f, status: 'ready' } : f));
            setUploading(false);
        }, 2000);

    }, 800);
  };
  
  // Handlers for drag-and-drop visual feedback
  const handleDragOver = (e: React.DragEvent) => { 
    e.preventDefault(); 
    setIsDragging(true); 
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const removeFile = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const getStatusDisplay = (status: Document['status']) => {
    switch (status) {
      case 'pending': return { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', text: 'Queued' };
      case 'processing': return { icon: Loader2, color: 'text-indigo-400 animate-spin', bg: 'bg-indigo-500/10 border-indigo-500/20', text: 'Vectorizing...' };
      case 'ready': return { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'Indexed' };
      case 'error': return { icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20', text: 'Failed' };
      default: return { icon: Upload, color: 'text-slate-400', bg: 'bg-slate-800 border-slate-700', text: 'Unknown' };
    }
  };

  return (
    <div ref={containerRef} className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Upload className="w-5 h-5 text-indigo-500" />
          Ingestion Engine
        </h3>
        <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
            {files.length} / 10 Active
        </span>
      </div>
      
      {/* Drop Zone */}
      <div 
        onClick={() => handleFileSelect()} 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`group relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer overflow-hidden ${
          isDragging 
            ? 'border-indigo-500 bg-indigo-500/10 scale-[1.02]' 
            : 'border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800/30'
        }`}
      >
        {/* Animated Glow Background on Hover */}
        <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isDragging ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white'
          }`}>
            {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Plus className="w-6 h-6" />}
          </div>
          <div>
            <p className="text-slate-200 font-medium text-lg">
              {uploading ? "Ingesting Data..." : "Drop Knowledge Assets"}
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Supports PDF, MD, TXT (Max 50MB)
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      <div className="mt-6 flex-1 overflow-y-auto pr-2 custom-scrollbar" ref={listRef}>
        {files.length === 0 ? (
           <div className="text-center py-8 opacity-50">
              <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-slate-500">No documents indexed yet.</p>
           </div>
        ) : (
          <div className="space-y-3">
            {files.map((file) => {
              const status = getStatusDisplay(file.status);
              const StatusIcon = status.icon;
              return (
                <div 
                  key={file.id} 
                  className="group relative flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-700 text-slate-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-200 truncate pr-4">{file.name}</p>
                      <p className="text-xs text-slate-500 font-mono">{file.size}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${status.bg} ${status.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      <span className="hidden sm:inline">{status.text}</span>
                    </div>
                    
                    <button 
                      onClick={(e) => removeFile(e, file.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}