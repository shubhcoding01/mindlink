'use client';

import React, { useState } from 'react';
import { Upload, FileText, Plus, Clock, CheckCircle, Loader2 } from 'lucide-react';
// import api from '@/lib/axios'; // Uncomment when backend is ready

// Define a simple structure for an uploaded file
interface Document {
    name: string;
    status: 'pending' | 'processing' | 'ready' | 'error';
    id: string;
}

export default function DocumentUploader() {
  const [files, setFiles] = useState<Document[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Simulates file selection/drop
  const handleFileSelect = (file: File | null = null) => {
    if (uploading) return;

    // Simulate file input dialog (or use file drop data)
    const newFile: Document = {
      id: Math.random().toString(36).substring(2, 9),
      name: file ? file.name : `Uploaded_Note_${files.length + 1}.pdf`,
      status: 'pending',
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
        }, 1500);

    }, 500);
  };
  
  // Handlers for drag-and-drop visual feedback
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // In a real app, you would loop through files. We simulate with the first one.
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };


  const getStatusDisplay = (status: Document['status']) => {
    switch (status) {
      case 'pending': return { icon: Clock, color: 'text-yellow-600 bg-yellow-100', text: 'Waiting' };
      case 'processing': return { icon: Loader2, color: 'text-indigo-600 bg-indigo-100 animate-spin', text: 'Processing' };
      case 'ready': return { icon: CheckCircle, color: 'text-green-600 bg-green-100', text: 'Ready' };
      case 'error': return { icon: Upload, color: 'text-red-600 bg-red-100', text: 'Failed' };
      default: return { icon: Upload, color: 'text-slate-500 bg-slate-100', text: '' };
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Upload className="w-5 h-5 text-indigo-600" />
        Add Knowledge Base Files
      </h3>
      
      {/* Drop Zone / Upload Button */}
      <div 
        onClick={() => handleFileSelect()} // Trigger simulation on click
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
          isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400'
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            {uploading ? <Clock className="animate-spin" /> : <Plus />}
          </div>
          <p className="text-slate-700 font-medium">
            {uploading ? "File Received. Ingesting..." : "Click or drag PDFs/Notes here"}
          </p>
          <p className="text-xs text-slate-500">Supports PDF, TXT, MD (Max 10MB)</p>
        </div>
      </div>

      {/* Library List */}
      {files.length > 0 && (
        <div className="mt-6 space-y-2">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Your Library</h4>
          {files.map((file) => {
            const status = getStatusDisplay(file.status);
            return (
              <div key={file.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-sm">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-700 truncate">{file.name}</span>
                </div>
                <div className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1.5 ${status.color}`}>
                  <status.icon className={`w-3 h-3 ${file.status === 'processing' ? 'animate-spin' : ''}`} />
                  {status.text}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}