// 'use client';

// import React, { useState } from 'react';
// import { PlusCircle, Zap, FileText, MessageSquare, Save, ChevronRight, Settings } from 'lucide-react';
// import Link from 'next/link';

// interface WorkflowStep {
//   id: number;
//   type: 'Input' | 'AI_Action' | 'Output';
//   name: string;
//   config: string;
// }

// const INITIAL_WORKFLOW: WorkflowStep[] = [
//   { id: 1, type: 'Input', name: 'Document Upload', config: 'Source: File (PDF/TXT)' },
//   { id: 2, type: 'AI_Action', name: 'Summarize Content', config: 'Length: 500 words' },
//   { id: 3, type: 'AI_Action', name: 'Generate Quiz Questions', config: 'Format: Multiple Choice, 10 Qs' },
//   { id: 4, type: 'Output', name: 'Save to Study Plan', config: 'Destination: Dashboard' },
// ];

// export default function WorkflowBuilderPage() {
//   const [workflow, setWorkflow] = useState<WorkflowStep[]>(INITIAL_WORKFLOW);
//   const [workflowName, setWorkflowName] = useState('New Personalized Study Flow');
//   const [isSaving, setIsSaving] = useState(false);

//   // Function to simulate adding a new step (e.g., a new AI Action)
//   const addStep = (type: 'AI_Action', name: string, config: string) => {
//     const newStep: WorkflowStep = {
//       id: workflow.length + 1,
//       type,
//       name,
//       config,
//     };
//     // Insert the new step before the final 'Output' step
//     setWorkflow(prev => {
//       const lastStep = prev.pop()!;
//       return [...prev, newStep, lastStep];
//     });
//   };

//   const handleSave = () => {
//     setIsSaving(true);
//     // Simulate API call to save the workflow structure
//     setTimeout(() => {
//       setIsSaving(false);
//       alert(`Workflow "${workflowName}" saved successfully!`);
//     }, 1000);
//   };

//   const getStepIcon = (type: WorkflowStep['type']) => {
//     switch (type) {
//       case 'Input':
//         return <FileText className="w-5 h-5 text-green-600" />;
//       case 'AI_Action':
//         return <Zap className="w-5 h-5 text-indigo-600" />;
//       case 'Output':
//         return <Save className="w-5 h-5 text-blue-600" />;
//       default:
//         return <Settings className="w-5 h-5 text-slate-500" />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 p-8">
//       <header className="flex justify-between items-start mb-8 border-b border-slate-200 pb-4">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
//             <PlusCircle className="w-8 h-8 text-indigo-600" />
//             AI Workflow Builder
//           </h1>
//           <input
//             type="text"
//             value={workflowName}
//             onChange={(e) => setWorkflowName(e.target.value)}
//             className="text-xl font-medium text-slate-700 mt-2 bg-transparent border-none focus:outline-none focus:ring-0"
//             aria-label="Workflow Name"
//           />
//         </div>
        
//         <button
//           onClick={handleSave}
//           disabled={isSaving}
//           className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 flex items-center gap-2"
//         >
//           {isSaving ? 'Saving...' : 'Save Workflow'}
//         </button>
//       </header>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
//         {/* Workflow Canvas (Main Area) */}
//         <div className="lg:col-span-8 bg-white p-6 rounded-xl shadow-lg border border-slate-200">
//           <h2 className="text-xl font-semibold text-slate-900 mb-6">Workflow Chain</h2>
          
//           <div className="flex flex-col items-start space-y-4">
//             {workflow.map((step, index) => (
//               <React.Fragment key={step.id}>
//                 {/* Step Card */}
//                 <div 
//                   className={`w-full p-4 rounded-xl border-2 transition-all ${
//                     step.type === 'Input' ? 'border-green-300 bg-green-50' :
//                     step.type === 'Output' ? 'border-blue-300 bg-blue-50' :
//                     'border-indigo-300 bg-indigo-50 hover:border-indigo-500 cursor-pointer'
//                   } flex items-center justify-between`}
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="p-2 rounded-full bg-white shadow-sm">
//                       {getStepIcon(step.type)}
//                     </div>
//                     <div>
//                       <p className="font-bold text-slate-800">{step.name}</p>
//                       <p className="text-sm text-slate-600">{step.config}</p>
//                     </div>
//                   </div>
//                   {step.type !== 'Input' && step.type !== 'Output' && (
//                     <Settings className="w-4 h-4 text-indigo-600 hover:text-indigo-800" />
//                   )}
//                 </div>
                
//                 {/* Connector Arrow */}
//                 {index < workflow.length - 1 && (
//                   <div className="ml-5">
//                     <ChevronRight className="w-8 h-8 text-slate-400 rotate-90" />
//                   </div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>

//         {/* Action Toolbox (Sidebar) */}
//         <div className="lg:col-span-4 space-y-6">
//           <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
//             <h2 className="text-xl font-semibold text-slate-900 mb-4">Add AI Action</h2>
            
//             <div className="space-y-4">
//               <button 
//                 onClick={() => addStep('AI_Action', 'Generate Visual Concept Map', 'Format: SVG')}
//                 className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between hover:bg-slate-100 transition"
//               >
//                 <div className="flex items-center gap-3">
//                   <Zap className="w-5 h-5 text-indigo-500" />
//                   <span>Generate Concept Map</span>
//                 </div>
//               </button>
              
//               <button 
//                 onClick={() => addStep('AI_Action', 'Micro-Summary (5 bullet points)', 'Source: Previous step output')}
//                 className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between hover:bg-slate-100 transition"
//               >
//                 <div className="flex items-center gap-3">
//                   <MessageSquare className="w-5 h-5 text-indigo-500" />
//                   <span>Summarize (Short)</span>
//                 </div>
//               </button>
              
//               <Link
//                  href="/products/add"
//                  className="w-full p-4 bg-white border-2 border-dashed border-indigo-400 rounded-lg flex items-center justify-center gap-2 text-indigo-600 hover:bg-indigo-50 transition"
//               >
//                  <PlusCircle className="w-5 h-5" />
//                  Explore more actions (Products)
//               </Link>
//             </div>
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState, useRef } from 'react';
import { PlusCircle, Zap, FileText, MessageSquare, Save, ChevronRight, Settings, ArrowLeft, Play } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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
  const container = useRef<HTMLDivElement>(null);
  const [workflow, setWorkflow] = useState<WorkflowStep[]>(INITIAL_WORKFLOW);
  const [workflowName, setWorkflowName] = useState('New Personalized Study Flow');
  const [isSaving, setIsSaving] = useState(false);

  // GSAP Entrance Animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".page-header", { y: -20, opacity: 0, duration: 0.6 })
      .from(".workflow-canvas", { x: -20, opacity: 0, duration: 0.6 }, "-=0.3")
      .from(".workflow-node", { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.2")
      .from(".toolbox", { x: 20, opacity: 0, duration: 0.6 }, "-=0.4");
      
  }, { scope: container });

  const addStep = (type: 'AI_Action', name: string, config: string) => {
    const newStep: WorkflowStep = {
      id: workflow.length + 1,
      type,
      name,
      config,
    };
    // Insert before the last step (Output)
    setWorkflow(prev => {
      const lastStep = prev.pop()!;
      return [...prev, newStep, lastStep];
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert(`Workflow "${workflowName}" saved successfully!`);
    }, 1000);
  };

  const getStepStyles = (type: WorkflowStep['type']) => {
    switch (type) {
      case 'Input':
        return { 
          container: 'border-emerald-500/30 bg-emerald-900/10', 
          iconBg: 'bg-emerald-500/20 text-emerald-400' 
        };
      case 'AI_Action':
        return { 
          container: 'border-indigo-500/30 bg-indigo-900/10', 
          iconBg: 'bg-indigo-500/20 text-indigo-400' 
        };
      case 'Output':
        return { 
          container: 'border-blue-500/30 bg-blue-900/10', 
          iconBg: 'bg-blue-500/20 text-blue-400' 
        };
      default:
        return { 
          container: 'border-slate-700 bg-slate-800/50', 
          iconBg: 'bg-slate-700 text-slate-400' 
        };
    }
  };

  const getStepIcon = (type: WorkflowStep['type']) => {
    switch (type) {
      case 'Input': return <FileText className="w-5 h-5" />;
      case 'AI_Action': return <Zap className="w-5 h-5" />;
      case 'Output': return <Save className="w-5 h-5" />;
      default: return <Settings className="w-5 h-5" />;
    }
  };

  return (
    <div ref={container} className="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-indigo-500/30 p-6 lg:p-8 overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 h-full flex flex-col">
        
        {/* Header */}
        <header className="page-header mb-8 border-b border-slate-800 pb-6">
           <Link 
              href="/dashboard" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors group text-sm"
          >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
                  <Zap className="w-6 h-6" />
                </div>
                <input
                  type="text"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  className="text-2xl font-bold text-white bg-transparent border-b border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-0 transition-colors w-full md:w-96"
                  aria-label="Workflow Name"
                />
              </div>
              <p className="text-slate-400 mt-2 text-sm ml-1">Design your automation pipeline by connecting nodes.</p>
            </div>
            
            <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-slate-900/50 border border-slate-700 text-slate-300 rounded-xl font-medium hover:bg-slate-800 hover:text-white transition flex items-center gap-2 text-sm">
                 <Play className="w-4 h-4" /> Test Run
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-5 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-900/40 hover:shadow-indigo-600/20 hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-2 text-sm"
              >
                {isSaving ? 'Saving...' : 'Save Workflow'}
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          
          {/* Main Canvas */}
          <div className="workflow-canvas lg:col-span-8 bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-y-auto min-h-[600px]">
            {/* Grid Background inside canvas */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center mask-[linear-gradient(180deg,white,rgba(255,255,255,0))]" style={{ opacity: 0.05, pointerEvents: 'none' }}></div>
            
            <h2 className="text-lg font-semibold text-slate-300 mb-6 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 
               Active Pipeline
            </h2>
            
            <div className="flex flex-col items-center space-y-2 relative z-10 w-full max-w-2xl mx-auto">
              {workflow.map((step, index) => {
                const styles = getStepStyles(step.type);
                return (
                  <React.Fragment key={step.id}>
                    {/* Node Card */}
                    <div 
                      className={`workflow-node w-full p-5 rounded-2xl border ${styles.container} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-opacity-50 cursor-pointer group relative`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${styles.iconBg} shadow-inner`}>
                            {getStepIcon(step.type)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-100 group-hover:text-white transition-colors">{step.name}</p>
                            <p className="text-xs text-slate-400 font-mono mt-1 opacity-80">{step.config}</p>
                          </div>
                        </div>
                        {step.type !== 'Input' && step.type !== 'Output' && (
                          <button className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition">
                            <Settings className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      {/* Node Connection Points */}
                      {index !== 0 && <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-600 rounded-full" />}
                      {index !== workflow.length - 1 && <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-600 rounded-full" />}
                    </div>
                    
                    {/* Connector Line */}
                    {index < workflow.length - 1 && (
                      <div className="h-8 w-px bg-slate-700/50 flex items-center justify-center">
                         <ChevronRight className="w-4 h-4 text-slate-600 rotate-90" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
              
              {/* Add Node Placeholder at bottom */}
              <div className="h-8 w-px bg-slate-700/50" />
              <button className="w-10 h-10 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-600 hover:text-indigo-400 hover:border-indigo-400 hover:bg-indigo-500/10 transition-all">
                  <PlusCircle className="w-5 h-5" />
              </button>

            </div>
          </div>

          {/* Sidebar Toolbox */}
          <div className="toolbox lg:col-span-4 space-y-6">
            <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-xl sticky top-6">
              <h2 className="text-lg font-semibold text-white mb-4">Toolbox</h2>
              <p className="text-slate-400 text-sm mb-6">Drag and drop actions to your pipeline.</p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => addStep('AI_Action', 'Generate Concept Map', 'Format: SVG Node Graph')}
                  className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-between hover:bg-slate-800 hover:border-indigo-500/30 transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                       <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-slate-200 text-sm font-medium group-hover:text-white">Concept Map</span>
                      <span className="text-xs text-slate-500">Visualizes key entities</span>
                    </div>
                  </div>
                  <PlusCircle className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                </button>
                
                <button 
                  onClick={() => addStep('AI_Action', 'Summarize (Bullet Points)', 'Source: Previous Output')}
                  className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-between hover:bg-slate-800 hover:border-indigo-500/30 transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg group-hover:bg-purple-500 group-hover:text-white transition-colors">
                       <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-slate-200 text-sm font-medium group-hover:text-white">Auto-Summarize</span>
                      <span className="text-xs text-slate-500">Condenses text content</span>
                    </div>
                  </div>
                  <PlusCircle className="w-4 h-4 text-slate-600 group-hover:text-purple-400 transition-colors" />
                </button>
                
                <div className="pt-4 mt-4 border-t border-slate-800/50">
                    <Link
                       href="/products/add"
                       className="w-full p-4 bg-transparent border border-dashed border-slate-600 rounded-xl flex items-center justify-center gap-2 text-slate-400 hover:text-white hover:border-indigo-400 hover:bg-indigo-500/5 transition-all text-sm font-medium"
                    >
                       <PlusCircle className="w-4 h-4" />
                       Create Custom Action
                    </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-900/20 border border-indigo-500/20 p-6 rounded-3xl">
               <h3 className="text-indigo-300 font-bold mb-2">Pro Tip</h3>
               <p className="text-indigo-200/60 text-sm">
                 Use the "Generate Concept Map" action after a summary to create visual study aids automatically.
               </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}