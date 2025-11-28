'use client';

import React, { useState } from 'react';
import { PlusCircle, Zap, FileText, MessageSquare, Save, ChevronRight, Settings } from 'lucide-react';
import Link from 'next/link';

interface WorkflowStep {
  id: number;
  type: 'Input' | 'AI_Action' | 'Output';
  name: string;
  config: string;
}

const INITIAL_WORKFLOW: WorkflowStep[] = [
  { id: 1, type: 'Input', name: 'Document Upload', config: 'Source: File (PDF/TXT)' },
  { id: 2, type: 'AI_Action', name: 'Summarize Content', config: 'Length: 500 words' },
  { id: 3, type: 'AI_Action', name: 'Generate Quiz Questions', config: 'Format: Multiple Choice, 10 Qs' },
  { id: 4, type: 'Output', name: 'Save to Study Plan', config: 'Destination: Dashboard' },
];

export default function WorkflowBuilderPage() {
  const [workflow, setWorkflow] = useState<WorkflowStep[]>(INITIAL_WORKFLOW);
  const [workflowName, setWorkflowName] = useState('New Personalized Study Flow');
  const [isSaving, setIsSaving] = useState(false);

  // Function to simulate adding a new step (e.g., a new AI Action)
  const addStep = (type: 'AI_Action', name: string, config: string) => {
    const newStep: WorkflowStep = {
      id: workflow.length + 1,
      type,
      name,
      config,
    };
    // Insert the new step before the final 'Output' step
    setWorkflow(prev => {
      const lastStep = prev.pop()!;
      return [...prev, newStep, lastStep];
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call to save the workflow structure
    setTimeout(() => {
      setIsSaving(false);
      alert(`Workflow "${workflowName}" saved successfully!`);
    }, 1000);
  };

  const getStepIcon = (type: WorkflowStep['type']) => {
    switch (type) {
      case 'Input':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'AI_Action':
        return <Zap className="w-5 h-5 text-indigo-600" />;
      case 'Output':
        return <Save className="w-5 h-5 text-blue-600" />;
      default:
        return <Settings className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="flex justify-between items-start mb-8 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <PlusCircle className="w-8 h-8 text-indigo-600" />
            AI Workflow Builder
          </h1>
          <input
            type="text"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="text-xl font-medium text-slate-700 mt-2 bg-transparent border-none focus:outline-none focus:ring-0"
            aria-label="Workflow Name"
          />
        </div>
        
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 flex items-center gap-2"
        >
          {isSaving ? 'Saving...' : 'Save Workflow'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Workflow Canvas (Main Area) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Workflow Chain</h2>
          
          <div className="flex flex-col items-start space-y-4">
            {workflow.map((step, index) => (
              <React.Fragment key={step.id}>
                {/* Step Card */}
                <div 
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    step.type === 'Input' ? 'border-green-300 bg-green-50' :
                    step.type === 'Output' ? 'border-blue-300 bg-blue-50' :
                    'border-indigo-300 bg-indigo-50 hover:border-indigo-500 cursor-pointer'
                  } flex items-center justify-between`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-white shadow-sm">
                      {getStepIcon(step.type)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{step.name}</p>
                      <p className="text-sm text-slate-600">{step.config}</p>
                    </div>
                  </div>
                  {step.type !== 'Input' && step.type !== 'Output' && (
                    <Settings className="w-4 h-4 text-indigo-600 hover:text-indigo-800" />
                  )}
                </div>
                
                {/* Connector Arrow */}
                {index < workflow.length - 1 && (
                  <div className="ml-5">
                    <ChevronRight className="w-8 h-8 text-slate-400 rotate-90" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Action Toolbox (Sidebar) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Add AI Action</h2>
            
            <div className="space-y-4">
              <button 
                onClick={() => addStep('AI_Action', 'Generate Visual Concept Map', 'Format: SVG')}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-indigo-500" />
                  <span>Generate Concept Map</span>
                </div>
              </button>
              
              <button 
                onClick={() => addStep('AI_Action', 'Micro-Summary (5 bullet points)', 'Source: Previous step output')}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-indigo-500" />
                  <span>Summarize (Short)</span>
                </div>
              </button>
              
              <Link
                 href="/products/add"
                 className="w-full p-4 bg-white border-2 border-dashed border-indigo-400 rounded-lg flex items-center justify-center gap-2 text-indigo-600 hover:bg-indigo-50 transition"
              >
                 <PlusCircle className="w-5 h-5" />
                 Explore more actions (Products)
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}