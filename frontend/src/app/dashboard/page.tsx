// 'use client';

// import React, { useState, useRef } from 'react';
// import Link from 'next/link';
// import { 
//   BookOpen, MessageSquare, BarChart3, Brain, FileText, LogOut, 
//   Settings, Clock, CheckCircle, ChevronRight, Zap, Home, 
//   TrendingUp, Activity, Target
// } from 'lucide-react';
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';

// // Assuming these components exist in your project from previous steps
// import ChatInterface from '@/components/ChatInterface';
// import DocumentUploader from '@/components/DocumentUploader';
// import LearningCarousel from '@/components/LearningCarousel';

// // --- MOCK DATA ---
// const MOCK_USER = {
//   name: "Alex",
//   learningStyle: "Visual",
//   streak: 12,
//   xp: 1250,
//   level: 5
// };

// const MOCK_PLAN = [
//   { id: '1', topic: 'Intro to RAG Pipelines', type: 'Reading', duration: '15 min', status: 'completed', difficulty: 'Easy' },
//   { id: '2', topic: 'Vector Embedding Basics Quiz', type: 'Quiz', duration: '10 min', status: 'pending', difficulty: 'Medium' },
//   { id: '3', topic: 'Review: Transformer Models', type: 'Video', duration: '5 min', status: 'pending', difficulty: 'Hard' },
// ];

// // --- 3D TILT CARD COMPONENT ---
// // Adds a subtle 3D parallax effect on hover
// const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
//   const cardRef = useRef<HTMLDivElement>(null);

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!cardRef.current) return;
//     const { left, top, width, height } = cardRef.current.getBoundingClientRect();
//     const x = (e.clientX - left - width / 2) / 25; // Sensitivity
//     const y = (e.clientY - top - height / 2) / 25;
    
//     gsap.to(cardRef.current, {
//       rotateY: x,
//       rotateX: -y,
//       transformPerspective: 1000,
//       duration: 0.5,
//       ease: "power2.out"
//     });
//   };

//   const handleMouseLeave = () => {
//     if (!cardRef.current) return;
//     gsap.to(cardRef.current, {
//       rotateY: 0,
//       rotateX: 0,
//       duration: 0.5,
//       ease: "power2.out"
//     });
//   };

//   return (
//     <div 
//       ref={cardRef}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       className={`transform-gpu transition-shadow hover:shadow-2xl hover:z-10 ${className}`}
//     >
//       {children}
//     </div>
//   );
// };

// // --- ADVANCED QUIZ PLAYER ---
// const QuizPlayer = ({ topic, onFinish }: { topic: string, onFinish: () => void }) => {
//   const [currentQuestion, setCurrentQuestion] = useState(1);
//   const [score, setScore] = useState(0);
//   const containerRef = useRef(null);
//   const totalQuestions = 3;

//   useGSAP(() => {
//     // Entrance animation
//     gsap.fromTo(containerRef.current, 
//       { y: 50, opacity: 0, scale: 0.95 },
//       { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.2)" }
//     );
//   }, []);

//   const handleAnswer = (isCorrect: boolean) => {
//     if (isCorrect) setScore(s => s + 1);
    
//     const nextQ = currentQuestion + 1;
    
//     // Animate out current question
//     gsap.to(".question-card", {
//       x: -50, opacity: 0, duration: 0.3, ease: "power2.in",
//       onComplete: () => {
//         if (nextQ > totalQuestions) {
//           setTimeout(onFinish, 1500); // Wait before finishing
//         } else {
//           setCurrentQuestion(nextQ);
//           // Animate in next question
//           gsap.fromTo(".question-card", 
//             { x: 50, opacity: 0 }, 
//             { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
//           );
//         }
//       }
//     });
//   };

//   if (currentQuestion > totalQuestions) {
//     return (
//       <div className="flex flex-col items-center justify-center h-96 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8 text-center animate-in fade-in zoom-in">
//         <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
//           <CheckCircle className="w-12 h-12 text-green-600" />
//         </div>
//         <h3 className="text-3xl font-bold text-slate-800 mb-2">Quiz Complete!</h3>
//         <p className="text-slate-500 text-lg mb-8">You mastered <span className="text-indigo-600 font-bold">{score}/{totalQuestions}</span> concepts.</p>
//         <button onClick={onFinish} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 hover:scale-105 transition-all shadow-lg">
//           Back to Study Plan
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div ref={containerRef} className="w-full max-w-3xl mx-auto">
//       {/* Progress Bar */}
//       <div className="mb-6 flex items-center gap-4">
//         <span className="text-sm font-bold text-slate-400">Q{currentQuestion}</span>
//         <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
//           <div 
//             className="h-full bg-indigo-600 transition-all duration-500 ease-out rounded-full"
//             style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
//           />
//         </div>
//         <span className="text-sm font-bold text-slate-400">Q{totalQuestions}</span>
//       </div>

//       <div className="question-card bg-white p-10 rounded-3xl shadow-xl border border-slate-100/50">
//         <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
//           {topic}
//         </span>
//         <h3 className="text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
//           What is the primary function of a vector embedding in the RAG process?
//         </h3>
//         <div className="space-y-4">
//           {['To store data as plain text', 'To convert text into dense numeric vectors', 'To render visual diagrams'].map((answer, index) => (
//             <button 
//               key={index}
//               onClick={() => handleAnswer(index === 1)} 
//               className="w-full text-left p-5 border-2 border-slate-100 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50/50 transition-all duration-200 group flex items-center justify-between"
//             >
//               <span className="font-medium text-slate-700 group-hover:text-indigo-900">{answer}</span>
//               <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-indigo-500 flex items-center justify-center">
//                 <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- MAIN DASHBOARD PAGE ---
// export default function DashboardPage() {
//   const [activeTab, setActiveTab] = useState<'study' | 'chat' | 'files' | 'workflows'>('study');
//   const [studyActivity, setStudyActivity] = useState<{type: 'list' | 'quiz', topic: string}>({ type: 'list', topic: '' });
  
//   const dashboardRef = useRef(null);

//   // GSAP Entrance Animation
//   useGSAP(() => {
//     const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

//     // Sidebar
//     tl.from(".sidebar-item", { x: -30, opacity: 0, stagger: 0.05, duration: 0.5 });
    
//     // Main Content
//     tl.from(".dashboard-header", { y: -20, opacity: 0, duration: 0.5 }, "-=0.2")
//       .from(".stat-card", { scale: 0.8, opacity: 0, stagger: 0.1, duration: 0.4 }, "-=0.3")
//       .from(".content-section", { y: 30, opacity: 0, duration: 0.6 }, "-=0.2");
      
//   }, { scope: dashboardRef });

//   const startQuiz = (topic: string) => setStudyActivity({ type: 'quiz', topic });
//   const returnToStudyList = () => setStudyActivity({ type: 'list', topic: '' });

//   return (
//     <div ref={dashboardRef} className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex overflow-hidden selection:bg-indigo-100">
      
//       {/* --- GLASSMOPHISM SIDEBAR --- */}
//       <aside className="w-20 lg:w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 flex flex-col fixed h-full z-20 transition-all duration-300">
//         <div className="p-8 flex items-center gap-3">
//           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
//             <Brain className="w-6 h-6 text-white" />
//           </div>
//           <span className="text-2xl font-extrabold tracking-tight hidden lg:block bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-violet-600">
//             MindLink
//           </span>
//         </div>
        
//         <nav className="flex-1 px-4 space-y-2 mt-2">
//           {[
//             { id: 'study', icon: BookOpen, label: 'Study Plan' },
//             { id: 'chat', icon: MessageSquare, label: 'AI Tutor' },
//             { id: 'files', icon: FileText, label: 'Documents' },
//             { id: 'workflows', icon: Zap, label: 'Workflows', link: '/workflow' },
//           ].map((item) => (
//              item.link ? (
//                <Link 
//                 key={item.id} 
//                 href={item.link}
//                 onClick={() => setActiveTab(item.id as any)}
//                 className={`sidebar-item w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 group ${
//                   activeTab === item.id 
//                     ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm' 
//                     : 'text-slate-500 hover:bg-white hover:text-slate-800 hover:shadow-sm'
//                 }`}
//                >
//                  <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-500'}`} />
//                  <span className="hidden lg:block">{item.label}</span>
//                  {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50 hidden lg:block" />}
//                </Link>
//              ) : (
//               <button 
//                 key={item.id}
//                 onClick={() => { setActiveTab(item.id as any); if(item.id === 'study') returnToStudyList(); }} 
//                 className={`sidebar-item w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 group ${
//                   activeTab === item.id 
//                     ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm' 
//                     : 'text-slate-500 hover:bg-white hover:text-slate-800 hover:shadow-sm'
//                 }`}
//               >
//                 <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-500'}`} />
//                 <span className="hidden lg:block">{item.label}</span>
//                 {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50 hidden lg:block" />}
//               </button>
//              )
//           ))}
//         </nav>

//         <div className="p-6 border-t border-slate-100 bg-linear-to-b from-transparent to-slate-50/50">
//           <div className="sidebar-item flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm mb-3">
//             <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
//               {MOCK_USER.name[0]}
//             </div>
//             <div className="hidden lg:block overflow-hidden">
//               <p className="text-sm font-bold text-slate-800 truncate">{MOCK_USER.name}</p>
//               <p className="text-xs text-slate-500 truncate">Lvl {MOCK_USER.level} Scholar</p>
//             </div>
//           </div>
//           <Link href="/login" className="sidebar-item w-full flex items-center justify-center gap-2 p-3 text-red-500 hover:bg-red-50 rounded-xl transition text-sm font-medium">
//             <LogOut className="w-4 h-4" /> <span className="hidden lg:block">Sign Out</span>
//           </Link>
//         </div>
//       </aside>

//       {/* --- MAIN CONTENT AREA --- */}
//       <main className="flex-1 ml-20 lg:ml-72 p-8 lg:p-12 overflow-y-auto h-screen relative">
//         {/* Background Decoration */}
//         <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-indigo-50/50 to-transparent -z-10 pointer-events-none" />

//         {/* Header */}
//         <header className="dashboard-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
//           <div>
//             <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
//               {activeTab === 'study' && (studyActivity.type === 'quiz' ? 'Focus Mode' : 'Learning Dashboard')}
//               {activeTab === 'chat' && "AI Tutor Session"}
//               {activeTab === 'files' && "Knowledge Base"}
//               {activeTab === 'workflows' && "Automation Workflows"}
//             </h1>
//             <p className="text-slate-500 mt-1 font-medium">Welcome back, {MOCK_USER.name}. You're on a roll!</p>
//           </div>
          
//           <div className="flex items-center gap-3">
//              {studyActivity.type === 'quiz' && (
//               <button onClick={returnToStudyList} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition shadow-sm flex items-center gap-2">
//                 <Home className='w-4 h-4' /> Exit Quiz
//               </button>
//             )}
//             <div className="px-4 py-2 bg-white/80 backdrop-blur border border-slate-200 rounded-xl shadow-sm flex items-center gap-3">
//               <div className="flex items-center gap-1.5 text-orange-600 font-bold">
//                 <Zap className="w-5 h-5 fill-orange-500" /> {MOCK_USER.streak}
//               </div>
//               <div className="w-px h-6 bg-slate-200" />
//               <div className="flex items-center gap-1.5 text-indigo-600 font-bold">
//                 <Target className="w-5 h-5" /> {MOCK_USER.xp} XP
//               </div>
//             </div>
//             <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition shadow-sm">
//               <Settings className="w-5 h-5" />
//             </button>
//           </div>
//         </header>

//         <div className="max-w-6xl mx-auto">
//           {activeTab === 'study' && studyActivity.type === 'list' && (
//             <div className="space-y-10 content-section">
              
//               {/* --- 1. Quick Stats Row --- */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="stat-card p-6 bg-linear-to-br from-indigo-500 to-violet-600 rounded-3xl text-white shadow-xl shadow-indigo-200 relative overflow-hidden group">
//                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
//                     <Activity className="w-24 h-24" />
//                   </div>
//                   <h3 className="text-indigo-100 font-medium mb-1">Weekly Goal</h3>
//                   <div className="text-4xl font-extrabold mb-4">75%</div>
//                   <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
//                     <div className="w-[75%] bg-white h-full rounded-full" />
//                   </div>
//                   <p className="text-sm mt-3 text-indigo-100 font-medium">12/16 topics mastered</p>
//                 </div>

//                 <div className="stat-card p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-indigo-100 transition-colors">
//                   <div className="flex justify-between items-start">
//                      <div>
//                        <h3 className="text-slate-500 font-medium mb-1">Time Spent</h3>
//                        <div className="text-3xl font-extrabold text-slate-900">4.5h</div>
//                      </div>
//                      <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
//                        <Clock className="w-6 h-6" />
//                      </div>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-green-600 font-semibold bg-green-50 w-fit px-2 py-1 rounded-lg mt-4">
//                     <TrendingUp className="w-4 h-4" /> +12% vs last week
//                   </div>
//                 </div>

//                  <div className="stat-card p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-orange-100 transition-colors">
//                   <div className="flex justify-between items-start">
//                      <div>
//                        <h3 className="text-slate-500 font-medium mb-1">Documents Processed</h3>
//                        <div className="text-3xl font-extrabold text-slate-900">24</div>
//                      </div>
//                      <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl group-hover:scale-110 transition-transform">
//                        <FileText className="w-6 h-6" />
//                      </div>
//                   </div>
//                    <p className="text-sm text-slate-400 mt-4">All vectors indexed and ready.</p>
//                 </div>
//               </div>

//               {/* --- 2. Carousel Section --- */}
//               <div className="content-section">
//                 <LearningCarousel />
//               </div>

//               {/* --- 3. Interactive Study Plan --- */}
//               <div className="content-section">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl font-bold text-slate-800">Your Personalized Plan</h3>
//                   <button className="text-indigo-600 font-semibold text-sm hover:underline">View Full Schedule</button>
//                 </div>
                
//                 <div className="space-y-4">
//                   {MOCK_PLAN.map((item) => (
//                     <TiltCard key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group cursor-pointer relative overflow-hidden">
//                       {/* Hover gradient overlay */}
//                       <div className="absolute inset-0 bg-linear-to-r from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
//                       <div className="flex items-center gap-6 relative z-10">
//                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-sm transition-transform group-hover:scale-110 duration-300 ${
//                           item.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-600 group-hover:text-white'
//                         }`}>
//                            {item.status === 'completed' ? <CheckCircle /> : (item.type === 'Quiz' ? <Zap /> : <BookOpen />)}
//                         </div>
                        
//                         <div>
//                           <h4 className="font-bold text-slate-800 text-lg group-hover:text-indigo-700 transition-colors">{item.topic}</h4>
//                           <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
//                             <span className="font-medium bg-slate-100 px-2 py-0.5 rounded text-xs uppercase tracking-wide">{item.type}</span>
//                             <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.duration}</span>
//                             <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
//                               item.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
//                               item.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
//                             }`}>{item.difficulty}</span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="relative z-10">
//                         {item.status !== 'completed' ? (
//                           <button 
//                             onClick={(e) => { e.stopPropagation(); item.type === 'Quiz' ? startQuiz(item.topic) : alert(`Starting ${item.topic}`); }}
//                             className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-medium shadow-md hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
//                           >
//                             Start
//                           </button>
//                         ) : (
//                           <span className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-4 py-2 rounded-xl">
//                             Done <CheckCircle className="w-5 h-5" />
//                           </span>
//                         )}
//                       </div>
//                     </TiltCard>
//                   ))}
//                 </div>
//               </div>

//             </div>
//           )}
          
//           {/* --- ACTIVE QUIZ VIEW --- */}
//           {activeTab === 'study' && studyActivity.type === 'quiz' && (
//              <div className="content-section">
//                 <QuizPlayer topic={studyActivity.topic} onFinish={returnToStudyList} />
//              </div>
//           )}

//           {/* --- OTHER TABS --- */}
//           {activeTab === 'chat' && <div className="content-section"><ChatInterface /></div>}
          
//           {activeTab === 'files' && (
//             <div className="content-section grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
//                  <DocumentUploader />
//               </div>
//               <div className="bg-linear-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-xl text-white flex flex-col justify-center">
//                 <h3 className="font-bold text-2xl mb-4">Vector Database Status</h3>
//                 <div className="space-y-4">
//                   <div className="flex justify-between border-b border-white/10 pb-2">
//                     <span className="text-slate-400">Total Chunks</span>
//                     <span className="font-mono text-green-400">14,205</span>
//                   </div>
//                   <div className="flex justify-between border-b border-white/10 pb-2">
//                     <span className="text-slate-400">Embedding Model</span>
//                     <span className="font-mono text-blue-300">all-MiniLM-L6-v2</span>
//                   </div>
//                   <div className="flex justify-between border-b border-white/10 pb-2">
//                     <span className="text-slate-400">Last Sync</span>
//                     <span className="font-mono text-slate-300">Just now</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'workflows' && (
//             <div className="content-section flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm border-dashed">
//                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
//                  <Zap className="w-10 h-10 text-indigo-500" />
//                </div>
//                <h3 className="text-3xl font-bold text-slate-900 mb-2">AI Workflow Builder</h3>
//                <p className="text-slate-500 max-w-md text-center mb-8">
//                  Drag and drop AI agents to create custom automation chains for your documents.
//                </p>
//                <Link 
//                  href="/workflow"
//                  className="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-300"
//                >
//                  Launch Builder Studio
//                </Link>
//             </div>
//           )}

//         </div>
//       </main>
//     </div>
//   );
// }

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, MessageSquare, BarChart3, Brain, FileText, LogOut, 
  Settings, Clock, CheckCircle, ChevronRight, Zap, Home, 
  TrendingUp, Activity, Target
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Assuming these components exist and handle their own internal styles correctly,
// but for a full dark mode conversion, you might need to update them too.
// For now, we wrap them in containers that fit the theme.
import ChatInterface from '@/components/ChatInterface';
import DocumentUploader from '@/components/DocumentUploader';
import LearningCarousel from '@/components/LearningCarousel';

// --- MOCK DATA ---
const MOCK_USER = {
  name: "Alex",
  learningStyle: "Visual",
  streak: 12,
  xp: 1250,
  level: 5
};

const MOCK_PLAN = [
  { id: '1', topic: 'Intro to RAG Pipelines', type: 'Reading', duration: '15 min', status: 'completed', difficulty: 'Easy' },
  { id: '2', topic: 'Vector Embedding Basics Quiz', type: 'Quiz', duration: '10 min', status: 'pending', difficulty: 'Medium' },
  { id: '3', topic: 'Review: Transformer Models', type: 'Video', duration: '5 min', status: 'pending', difficulty: 'Hard' },
];

// --- 3D TILT CARD COMPONENT ---
const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25; 
    const y = (e.clientY - top - height / 2) / 25;
    
    gsap.to(cardRef.current, {
      rotateY: x,
      rotateX: -y,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transform-gpu transition-all duration-300 hover:z-10 ${className}`}
    >
      {children}
    </div>
  );
};

// --- ADVANCED QUIZ PLAYER ---
const QuizPlayer = ({ topic, onFinish }: { topic: string, onFinish: () => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const containerRef = useRef(null);
  const totalQuestions = 3;

  useGSAP(() => {
    gsap.fromTo(containerRef.current, 
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.2)" }
    );
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(s => s + 1);
    
    const nextQ = currentQuestion + 1;
    
    gsap.to(".question-card", {
      x: -50, opacity: 0, duration: 0.3, ease: "power2.in",
      onComplete: () => {
        if (nextQ > totalQuestions) {
          setTimeout(onFinish, 1500); 
        } else {
          setCurrentQuestion(nextQ);
          gsap.fromTo(".question-card", 
            { x: 50, opacity: 0 }, 
            { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
          );
        }
      }
    });
  };

  if (currentQuestion > totalQuestions) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-8 text-center animate-in fade-in zoom-in">
        <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <CheckCircle className="w-12 h-12 text-emerald-400" />
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h3>
        <p className="text-slate-400 text-lg mb-8">You mastered <span className="text-indigo-400 font-bold">{score}/{totalQuestions}</span> concepts.</p>
        <button onClick={onFinish} className="px-8 py-3 bg-white text-slate-950 rounded-xl font-bold hover:bg-indigo-50 hover:scale-105 transition-all shadow-lg">
          Back to Study Plan
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-sm font-bold text-slate-500">Q{currentQuestion}</span>
        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <div 
            className="h-full bg-linear-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold text-slate-500">Q{totalQuestions}</span>
      </div>

      <div className="question-card bg-slate-900/50 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-slate-800">
        <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
          {topic}
        </span>
        <h3 className="text-2xl font-bold text-slate-100 mb-8 leading-relaxed">
          What is the primary function of a vector embedding in the RAG process?
        </h3>
        <div className="space-y-4">
          {['To store data as plain text', 'To convert text into dense numeric vectors', 'To render visual diagrams'].map((answer, index) => (
            <button 
              key={index}
              onClick={() => handleAnswer(index === 1)} 
              className="w-full text-left p-5 border border-slate-700/50 bg-slate-800/30 rounded-2xl hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-200 group flex items-center justify-between"
            >
              <span className="font-medium text-slate-300 group-hover:text-indigo-200">{answer}</span>
              <div className="w-6 h-6 rounded-full border-2 border-slate-600 group-hover:border-indigo-500 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD PAGE ---
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'study' | 'chat' | 'files' | 'workflows'>('study');
  const [studyActivity, setStudyActivity] = useState<{type: 'list' | 'quiz', topic: string}>({ type: 'list', topic: '' });
  
  const dashboardRef = useRef(null);

  // GSAP Entrance Animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Sidebar
    tl.from(".sidebar-item", { x: -30, opacity: 0, stagger: 0.05, duration: 0.5 });
    
    // Main Content
    tl.from(".dashboard-header", { y: -20, opacity: 0, duration: 0.5 }, "-=0.2")
      .from(".stat-card", { scale: 0.8, opacity: 0, stagger: 0.1, duration: 0.4 }, "-=0.3")
      .from(".content-section", { y: 30, opacity: 0, duration: 0.6 }, "-=0.2");
      
  }, { scope: dashboardRef });

  const startQuiz = (topic: string) => setStudyActivity({ type: 'quiz', topic });
  const returnToStudyList = () => setStudyActivity({ type: 'list', topic: '' });

  return (
    <div ref={dashboardRef} className="min-h-screen bg-slate-950 font-sans text-slate-50 flex overflow-hidden selection:bg-indigo-500/30">
      
      {/* --- GLASSMOPHISM SIDEBAR --- */}
      <aside className="w-20 lg:w-72 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 flex flex-col fixed h-full z-20 transition-all duration-300">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight hidden lg:block bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400">
            MindLink
          </span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-2">
          {[
            { id: 'study', icon: BookOpen, label: 'Study Plan' },
            { id: 'chat', icon: MessageSquare, label: 'AI Tutor' },
            { id: 'files', icon: FileText, label: 'Documents' },
            { id: 'workflows', icon: Zap, label: 'Workflows', link: '/workflow' },
          ].map((item) => (
             item.link ? (
               <Link 
                key={item.id} 
                href={item.link}
                onClick={() => setActiveTab(item.id as any)}
                className={`sidebar-item w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 group ${
                  activeTab === item.id 
                    ? 'bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
               >
                 <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-400 transition-colors'}`} />
                 <span className="hidden lg:block">{item.label}</span>
                 {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50 hidden lg:block" />}
               </Link>
             ) : (
              <button 
                key={item.id}
                onClick={() => { setActiveTab(item.id as any); if(item.id === 'study') returnToStudyList(); }} 
                className={`sidebar-item w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 group ${
                  activeTab === item.id 
                    ? 'bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-400 transition-colors'}`} />
                <span className="hidden lg:block">{item.label}</span>
                {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50 hidden lg:block" />}
              </button>
             )
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800 bg-linear-to-b from-transparent to-slate-900/50">
          <div className="sidebar-item flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700/50 rounded-2xl mb-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-slate-800">
              {MOCK_USER.name[0]}
            </div>
            <div className="hidden lg:block overflow-hidden">
              <p className="text-sm font-bold text-slate-200 truncate">{MOCK_USER.name}</p>
              <p className="text-xs text-slate-500 truncate">Lvl {MOCK_USER.level} Scholar</p>
            </div>
          </div>
          <Link href="/login" className="sidebar-item w-full flex items-center justify-center gap-2 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition text-sm font-medium">
            <LogOut className="w-4 h-4" /> <span className="hidden lg:block">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 ml-20 lg:ml-72 p-8 lg:p-12 overflow-y-auto h-screen relative scrollbar-hide">
        {/* Background Decoration */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
           <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] mix-blend-screen" />
           <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen" />
        </div>

        {/* Header */}
        <header className="dashboard-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {activeTab === 'study' && (studyActivity.type === 'quiz' ? 'Focus Mode' : 'Learning Dashboard')}
              {activeTab === 'chat' && "AI Tutor Session"}
              {activeTab === 'files' && "Knowledge Base"}
              {activeTab === 'workflows' && "Automation Workflows"}
            </h1>
            <p className="text-slate-400 mt-1 font-medium">Welcome back, {MOCK_USER.name}. System ready.</p>
          </div>
          
          <div className="flex items-center gap-3">
             {studyActivity.type === 'quiz' && (
              <button onClick={returnToStudyList} className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl font-medium hover:bg-slate-700 transition shadow-sm flex items-center gap-2">
                <Home className='w-4 h-4' /> Exit
              </button>
            )}
            <div className="px-4 py-2 bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl shadow-lg flex items-center gap-4">
              <div className="flex items-center gap-2 text-orange-400 font-bold">
                <Zap className="w-5 h-5 fill-orange-500/20" /> {MOCK_USER.streak}
              </div>
              <div className="w-px h-6 bg-slate-700" />
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <Target className="w-5 h-5" /> {MOCK_USER.xp} XP
              </div>
            </div>
            <button className="p-2.5 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-400 hover:text-white hover:border-slate-600 transition shadow-lg">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          {activeTab === 'study' && studyActivity.type === 'list' && (
            <div className="space-y-10 content-section">
              
              {/* --- 1. Quick Stats Row --- */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stat-card p-6 bg-linear-to-br from-indigo-600 to-violet-700 rounded-3xl text-white shadow-lg shadow-indigo-900/30 relative overflow-hidden group border border-indigo-500/30">
                  <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
                    <Activity className="w-24 h-24" />
                  </div>
                  <h3 className="text-indigo-100 font-medium mb-1">Weekly Goal</h3>
                  <div className="text-4xl font-extrabold mb-4">75%</div>
                  <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden backdrop-blur-sm">
                    <div className="w-[75%] bg-white h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  </div>
                  <p className="text-sm mt-3 text-indigo-100 font-medium">12/16 topics mastered</p>
                </div>

                <div className="stat-card p-6 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between group hover:border-slate-700 transition-colors">
                  <div className="flex justify-between items-start">
                     <div>
                       <h3 className="text-slate-400 font-medium mb-1">Time Spent</h3>
                       <div className="text-3xl font-extrabold text-white">4.5h</div>
                     </div>
                     <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl group-hover:scale-110 transition-transform border border-blue-500/20">
                       <Clock className="w-6 h-6" />
                     </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-emerald-400 font-semibold bg-emerald-500/10 w-fit px-2 py-1 rounded-lg mt-4 border border-emerald-500/20">
                    <TrendingUp className="w-4 h-4" /> +12% vs last week
                  </div>
                </div>

                 <div className="stat-card p-6 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between group hover:border-slate-700 transition-colors">
                  <div className="flex justify-between items-start">
                     <div>
                       <h3 className="text-slate-400 font-medium mb-1">Documents Processed</h3>
                       <div className="text-3xl font-extrabold text-white">24</div>
                     </div>
                     <div className="p-3 bg-orange-500/10 text-orange-400 rounded-2xl group-hover:scale-110 transition-transform border border-orange-500/20">
                       <FileText className="w-6 h-6" />
                     </div>
                  </div>
                   <p className="text-sm text-slate-500 mt-4">All vectors indexed and ready.</p>
                </div>
              </div>

              {/* --- 2. Carousel Section --- */}
              <div className="content-section">
                <LearningCarousel />
              </div>

              {/* --- 3. Interactive Study Plan --- */}
              <div className="content-section">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Your Personalized Plan</h3>
                  <button className="text-indigo-400 font-semibold text-sm hover:text-indigo-300 transition-colors">View Full Schedule</button>
                </div>
                
                <div className="space-y-4">
                  {MOCK_PLAN.map((item) => (
                    <TiltCard key={item.id} className="bg-slate-900/60 backdrop-blur border border-slate-800 p-6 rounded-2xl shadow-lg flex items-center justify-between group cursor-pointer relative overflow-hidden hover:border-slate-700 transition-colors">
                      {/* Hover gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      <div className="flex items-center gap-6 relative z-10">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-inner transition-transform group-hover:scale-110 duration-300 ${
                          item.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700 group-hover:border-indigo-500/50 group-hover:text-indigo-400'
                        }`}>
                           {item.status === 'completed' ? <CheckCircle /> : (item.type === 'Quiz' ? <Zap /> : <BookOpen />)}
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-slate-200 text-lg group-hover:text-white transition-colors">{item.topic}</h4>
                          <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                            <span className="font-medium bg-slate-800 px-2 py-0.5 rounded text-xs uppercase tracking-wide border border-slate-700">{item.type}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.duration}</span>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                              item.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                              item.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            }`}>{item.difficulty}</span>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10">
                        {item.status !== 'completed' ? (
                          <button 
                            onClick={(e) => { e.stopPropagation(); item.type === 'Quiz' ? startQuiz(item.topic) : alert(`Starting ${item.topic}`); }}
                            className="px-6 py-2.5 bg-white text-slate-900 rounded-xl font-bold shadow-lg hover:bg-indigo-50 hover:scale-105 transition-all duration-300"
                          >
                            Start
                          </button>
                        ) : (
                          <span className="flex items-center gap-2 text-emerald-400 font-bold bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
                            Done <CheckCircle className="w-5 h-5" />
                          </span>
                        )}
                      </div>
                    </TiltCard>
                  ))}
                </div>
              </div>

            </div>
          )}
          
          {/* --- ACTIVE QUIZ VIEW --- */}
          {activeTab === 'study' && studyActivity.type === 'quiz' && (
             <div className="content-section">
                <QuizPlayer topic={studyActivity.topic} onFinish={returnToStudyList} />
             </div>
          )}

          {/* --- OTHER TABS --- */}
          {activeTab === 'chat' && <div className="content-section"><ChatInterface /></div>}
          
          {activeTab === 'files' && (
            <div className="content-section grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-900/50 backdrop-blur p-6 rounded-3xl border border-slate-800 shadow-xl">
                 <DocumentUploader />
              </div>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-xl text-white flex flex-col justify-center border border-slate-700">
                <h3 className="font-bold text-2xl mb-4">Vector Database Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Total Chunks</span>
                    <span className="font-mono text-emerald-400">14,205</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Embedding Model</span>
                    <span className="font-mono text-blue-400">all-MiniLM-L6-v2</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Last Sync</span>
                    <span className="font-mono text-slate-300">Just now</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workflows' && (
            <div className="content-section flex flex-col items-center justify-center py-24 bg-slate-900/30 rounded-3xl border border-dashed border-slate-700">
               <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse border border-indigo-500/20">
                 <Zap className="w-10 h-10 text-indigo-400" />
               </div>
               <h3 className="text-3xl font-bold text-white mb-2">AI Workflow Builder</h3>
               <p className="text-slate-400 max-w-md text-center mb-8">
                 Drag and drop AI agents to create custom automation chains for your documents.
               </p>
               <Link 
                 href="/workflow"
                 className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold shadow-lg hover:bg-indigo-50 hover:scale-105 transition-all duration-300"
               >
                 Launch Builder Studio
               </Link>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}