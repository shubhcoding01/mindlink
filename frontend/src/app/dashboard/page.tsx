// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { 
//   BookOpen, 
//   MessageSquare, 
//   BarChart3, 
//   Brain, 
//   FileText,
//   LogOut,
//   Settings,
//   Clock,
//   CheckCircle,
//   ChevronRight,
//   Zap, // Imported Zap icon for Workflows
//   Home
// } from 'lucide-react';

// // Assuming these components are in src/components/
// import ChatInterface from '@/components/ChatInterface';
// import DocumentUploader from '@/components/DocumentUploader';

// // --- MOCK DATA ---
// interface UserProfile {
//   name: string;
//   learningStyle: 'Visual' | 'Textual' | 'Auditory';
//   streak: number;
// }
// interface StudyPlanItem {
//   id: string;
//   topic: string;
//   type: 'Quiz' | 'Reading' | 'Video';
//   duration: string;
//   status: 'pending' | 'completed';
// }

// const MOCK_USER: UserProfile = {
//   name: "Alex",
//   learningStyle: "Visual",
//   streak: 12
// };

// const MOCK_PLAN: StudyPlanItem[] = [
//   { id: '1', topic: 'Intro to RAG Pipelines', type: 'Reading', duration: '15 min', status: 'completed' },
//   { id: '2', topic: 'Vector Embedding Basics Quiz', type: 'Quiz', duration: '10 min', status: 'pending' },
//   { id: '3', topic: 'Review: Transformer Models', type: 'Video', duration: '5 min', status: 'pending' },
// ];

// // --- NEW COMPONENT: SIMULATED QUIZ PLAYER ---
// const QuizPlayer = ({ topic, onFinish }: { topic: string, onFinish: () => void }) => {
//   const [currentQuestion, setCurrentQuestion] = useState(1);
//   const [score, setScore] = useState(0);
//   const totalQuestions = 3;

//   const handleAnswer = (isCorrect: boolean) => {
//     if (isCorrect) {
//       setScore(s => s + 1);
//     }
//     if (currentQuestion < totalQuestions) {
//       setCurrentQuestion(q => q + 1);
//     } else {
//       setTimeout(onFinish, 1500); // Simulate quiz completion delay
//     }
//   };

//   if (currentQuestion > totalQuestions) {
//     return (
//       <div className="p-12 text-center bg-white rounded-xl shadow-lg border border-slate-200">
//         <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//         <h3 className="text-2xl font-bold">Quiz Complete!</h3>
//         <p className="text-xl text-slate-700 mt-2">You scored {score} out of {totalQuestions}.</p>
//         <button 
//           onClick={onFinish}
//           className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
//         >
//           Return to Study Plan
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 max-w-2xl mx-auto">
//       <div className="text-sm font-semibold text-indigo-600 mb-2">Quiz: {topic}</div>
//       <div className="text-xs text-slate-500 mb-6">Question {currentQuestion} of {totalQuestions}</div>
      
//       <h3 className="text-lg font-bold text-slate-900 mb-6">
//         What is the primary function of a vector embedding in the RAG process?
//       </h3>
      
//       <div className="space-y-4">
//         {['To store data as plain text', 'To convert text into dense numeric vectors', 'To render visual diagrams'].map((answer, index) => (
//           <button 
//             key={index}
//             onClick={() => handleAnswer(index === 1)} // Mocking index 1 as correct
//             className="w-full text-left p-4 border border-slate-200 rounded-lg hover:bg-indigo-50 transition duration-150"
//           >
//             {index + 1}. {answer}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };
// // --- END NEW COMPONENT ---


// export default function DashboardPage() {
//   // Tabs: study (default view), chat (AI Tutor), files (Document Uploader)
//   const [activeTab, setActiveTab] = useState<'study' | 'chat' | 'files' | 'workflows'>('study');
  
//   // State to handle the current running activity within the 'study' tab
//   const [studyActivity, setStudyActivity] = useState<{type: 'list' | 'quiz', topic: string}>({ type: 'list', topic: '' });

//   const startQuiz = (topic: string) => {
//       setStudyActivity({ type: 'quiz', topic });
//   }
//   const returnToStudyList = () => {
//       setStudyActivity({ type: 'list', topic: '' });
//       // In a real app, you would also mark the corresponding quiz in MOCK_PLAN as 'completed'
//   }


//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
//       {/* Sidebar Navigation (Fixed) */}
//       <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10 transition-all">
//         <div className="p-6 flex items-center gap-3">
//           <Brain className="w-8 h-8 text-indigo-600" />
//           <span className="text-xl font-bold hidden lg:block">MindLink</span>
//         </div>
        
//         {/* Navigation Items */}
//         <nav className="flex-1 px-4 space-y-2 mt-4">
//           <button onClick={() => { setActiveTab('study'); returnToStudyList(); }} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'study' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
//             <BookOpen className="w-5 h-5" /> <span className="hidden lg:block font-medium">Study Plan</span>
//           </button>
//           <button onClick={() => setActiveTab('chat')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'chat' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
//             <MessageSquare className="w-5 h-5" /> <span className="hidden lg:block font-medium">AI Tutor</span>
//           </button>
//           <button onClick={() => setActiveTab('files')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'files' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
//             <FileText className="w-5 h-5" /> <span className="hidden lg:block font-medium">Documents</span>
//           </button>

//           {/* NEW: Workflow Link */}
//           <Link href="/workflow" className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'workflows' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
//             onClick={() => setActiveTab('workflows')} 
//           >
//             <Zap className="w-5 h-5" /> <span className="hidden lg:block font-medium">Workflows</span>
//           </Link>
          
//           {/* Analytics (Previously soon/disabled, kept for structure) */}
//           <button onClick={() => setActiveTab('study')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition text-slate-400 cursor-not-allowed`}>
//             <BarChart3 className="w-5 h-5" /> <span className="hidden lg:block font-medium">Analytics (Soon)</span>
//           </button>
//         </nav>

//         {/* User Profile / Logout */}
//         <div className="p-4 border-t border-slate-100">
//           <div className="flex items-center gap-3 p-2 mb-2">
//             <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
//               {MOCK_USER.name[0]}
//             </div>
//             <div className="hidden lg:block">
//               <p className="text-sm font-semibold">{MOCK_USER.name}</p>
//               <p className="text-xs text-slate-500">{MOCK_USER.learningStyle} Learner</p>
//             </div>
//           </div>
//           <Link href="/login" className="w-full flex items-center gap-3 p-2 text-red-500 hover:bg-red-50 rounded-lg transition text-sm">
//             <LogOut className="w-4 h-4" /> <span className="hidden lg:block">Sign Out</span>
//           </Link>
//         </div>
//       </aside>

//       {/* Main Content Area (Offset by Sidebar) */}
//       <main className="flex-1 ml-20 lg:ml-64 p-8">
//         <header className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-bold text-slate-900">
//             {activeTab === 'study' && (studyActivity.type === 'quiz' ? `Active Quiz: ${studyActivity.topic}` : "Today's Study Plan")}
//             {activeTab === 'chat' && "AI Tutor Session"}
//             {activeTab === 'files' && "Document Library"}
//             {activeTab === 'workflows' && "Workflows"}
//           </h2>
//           <div className="flex items-center gap-4">
//             {studyActivity.type === 'quiz' && (
//               <button 
//                 onClick={returnToStudyList} 
//                 className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition text-sm flex items-center gap-1"
//               >
//                 <Home className='w-4 h-4' /> Back to Plan
//               </button>
//             )}
//             <span className="text-sm bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full font-medium flex items-center gap-2">
//               <Clock className="w-4 h-4" /> Streak: {MOCK_USER.streak} days
//             </span>
//             <button className="p-2 text-slate-400 hover:text-slate-600 transition">
//               <Settings className="w-5 h-5" />
//             </button>
//           </div>
//         </header>

//         <div className="max-w-5xl">
//           {/* Study Plan Content */}
//           {activeTab === 'study' && studyActivity.type === 'list' && (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2 space-y-4">
//                 <h3 className="text-lg font-semibold text-slate-700 mb-3">Next Steps:</h3>
//                 {MOCK_PLAN.map((item) => (
//                   <div key={item.id} className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                       <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                         item.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'
//                       }`}>
//                         {item.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : (item.type === 'Quiz' ? <Zap className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />)}
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-slate-800">{item.topic}</h4>
//                         <p className="text-sm text-slate-500 flex items-center gap-2">
//                           <span className="capitalize">{item.type}</span>
//                           <span className="w-1 h-1 rounded-full bg-slate-300" />
//                           {item.duration}
//                         </p>
//                       </div>
//                     </div>
//                     {item.status !== 'completed' && (
//                       <button 
//                         onClick={() => item.type === 'Quiz' ? startQuiz(item.topic) : alert(`Starting ${item.type}: ${item.topic}`)}
//                         className="px-4 py-2 bg-slate-900 text-white text-sm rounded-lg group-hover:bg-indigo-600 transition"
//                       >
//                         Start
//                       </button>
//                     )}
//                     {item.status === 'completed' && (
//                        <CheckCircle className="w-5 h-5 text-green-500" />
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Study Plan Sidebar */}
//               <div className="space-y-6">
//                  <div className="bg-linear-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg">
//                     <h3 className="font-bold text-lg mb-2">Weekly Goal Progress</h3>
//                     <div className="w-full bg-white/20 h-2 rounded-full mb-2">
//                       <div className="w-[75%] bg-white h-full rounded-full" />
//                     </div>
//                     <p className="text-sm opacity-90">75% Complete</p>
//                  </div>
                 
//                  <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
//                    <h3 className="font-bold text-slate-800 mb-4">Quick Review Topics</h3>
//                    <div className="space-y-3">
//                      {/* Made these clickable to simulate starting a Quiz/Review */}
//                      {['Linear Algebra', 'Python Basics', 'Advanced RAG'].map(topic => (
//                        <div 
//                          key={topic} 
//                          onClick={() => startQuiz(`Quick Review: ${topic}`)}
//                          className="flex items-center justify-between text-sm text-slate-600 hover:text-indigo-600 cursor-pointer transition"
//                        >
//                          <span>{topic}</span>
//                          <ChevronRight className="w-4 h-4 text-slate-400" />
//                        </div>
//                      ))}
//                    </div>
//                  </div>
//               </div>
//             </div>
//           )}
          
//           {/* Active Quiz View */}
//           {activeTab === 'study' && studyActivity.type === 'quiz' && (
//              <QuizPlayer topic={studyActivity.topic} onFinish={returnToStudyList} />
//           )}

//           {/* AI Tutor Content */}
//           {activeTab === 'chat' && <ChatInterface />}
          
//           {/* Document Library Content */}
//           {activeTab === 'files' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <DocumentUploader />
//               <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
//                 <h3 className="font-bold text-slate-800 mb-4">Processing Queue</h3>
//                 <p className="text-slate-500 text-sm">Uploaded documents are processed by the vector engine here, ready to become part of your personal knowledge base.</p>
//               </div>
//             </div>
//           )}
          
//           {/* Workflows Content - Link to the dedicated page */}
//           {activeTab === 'workflows' && (
//             <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
//                <Zap className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
//                <h3 className="text-xl font-medium text-slate-900">AI Workflow Builder</h3>
//                <p className="text-slate-500 mt-2">Design custom AI automation chains to process your documents and goals.</p>
//                <Link 
//                  href="/workflow"
//                  className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
//                >
//                  Go to Builder →
//                </Link>
//             </div>
//           )}

//         </div>
//       </main>
//     </div>
//   );
// }
'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  BookOpen, MessageSquare, BarChart3, Brain, FileText, LogOut, 
  Settings, Clock, CheckCircle, ChevronRight, Zap, Home, 
  TrendingUp, Activity, Target
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Assuming these components exist in your project from previous steps
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
// Adds a subtle 3D parallax effect on hover
const TiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25; // Sensitivity
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
      className={`transform-gpu transition-shadow hover:shadow-2xl hover:z-10 ${className}`}
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
    // Entrance animation
    gsap.fromTo(containerRef.current, 
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.2)" }
    );
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(s => s + 1);
    
    const nextQ = currentQuestion + 1;
    
    // Animate out current question
    gsap.to(".question-card", {
      x: -50, opacity: 0, duration: 0.3, ease: "power2.in",
      onComplete: () => {
        if (nextQ > totalQuestions) {
          setTimeout(onFinish, 1500); // Wait before finishing
        } else {
          setCurrentQuestion(nextQ);
          // Animate in next question
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
      <div className="flex flex-col items-center justify-center h-96 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8 text-center animate-in fade-in zoom-in">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h3 className="text-3xl font-bold text-slate-800 mb-2">Quiz Complete!</h3>
        <p className="text-slate-500 text-lg mb-8">You mastered <span className="text-indigo-600 font-bold">{score}/{totalQuestions}</span> concepts.</p>
        <button onClick={onFinish} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 hover:scale-105 transition-all shadow-lg">
          Back to Study Plan
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-sm font-bold text-slate-400">Q{currentQuestion}</span>
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          />
        </div>
        <span className="text-sm font-bold text-slate-400">Q{totalQuestions}</span>
      </div>

      <div className="question-card bg-white p-10 rounded-3xl shadow-xl border border-slate-100/50">
        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
          {topic}
        </span>
        <h3 className="text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
          What is the primary function of a vector embedding in the RAG process?
        </h3>
        <div className="space-y-4">
          {['To store data as plain text', 'To convert text into dense numeric vectors', 'To render visual diagrams'].map((answer, index) => (
            <button 
              key={index}
              onClick={() => handleAnswer(index === 1)} 
              className="w-full text-left p-5 border-2 border-slate-100 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50/50 transition-all duration-200 group flex items-center justify-between"
            >
              <span className="font-medium text-slate-700 group-hover:text-indigo-900">{answer}</span>
              <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-indigo-500 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
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
    <div ref={dashboardRef} className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex overflow-hidden selection:bg-indigo-100">
      
      {/* --- GLASSMOPHISM SIDEBAR --- */}
      <aside className="w-20 lg:w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 flex flex-col fixed h-full z-20 transition-all duration-300">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight hidden lg:block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
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
                    ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm' 
                    : 'text-slate-500 hover:bg-white hover:text-slate-800 hover:shadow-sm'
                }`}
               >
                 <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-500'}`} />
                 <span className="hidden lg:block">{item.label}</span>
                 {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50 hidden lg:block" />}
               </Link>
             ) : (
              <button 
                key={item.id}
                onClick={() => { setActiveTab(item.id as any); if(item.id === 'study') returnToStudyList(); }} 
                className={`sidebar-item w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 group ${
                  activeTab === item.id 
                    ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm' 
                    : 'text-slate-500 hover:bg-white hover:text-slate-800 hover:shadow-sm'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-500'}`} />
                <span className="hidden lg:block">{item.label}</span>
                {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50 hidden lg:block" />}
              </button>
             )
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100 bg-gradient-to-b from-transparent to-slate-50/50">
          <div className="sidebar-item flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
              {MOCK_USER.name[0]}
            </div>
            <div className="hidden lg:block overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">{MOCK_USER.name}</p>
              <p className="text-xs text-slate-500 truncate">Lvl {MOCK_USER.level} Scholar</p>
            </div>
          </div>
          <Link href="/login" className="sidebar-item w-full flex items-center justify-center gap-2 p-3 text-red-500 hover:bg-red-50 rounded-xl transition text-sm font-medium">
            <LogOut className="w-4 h-4" /> <span className="hidden lg:block">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 ml-20 lg:ml-72 p-8 lg:p-12 overflow-y-auto h-screen relative">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-50/50 to-transparent -z-10 pointer-events-none" />

        {/* Header */}
        <header className="dashboard-header flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {activeTab === 'study' && (studyActivity.type === 'quiz' ? 'Focus Mode' : 'Learning Dashboard')}
              {activeTab === 'chat' && "AI Tutor Session"}
              {activeTab === 'files' && "Knowledge Base"}
              {activeTab === 'workflows' && "Automation Workflows"}
            </h1>
            <p className="text-slate-500 mt-1 font-medium">Welcome back, {MOCK_USER.name}. You're on a roll!</p>
          </div>
          
          <div className="flex items-center gap-3">
             {studyActivity.type === 'quiz' && (
              <button onClick={returnToStudyList} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition shadow-sm flex items-center gap-2">
                <Home className='w-4 h-4' /> Exit Quiz
              </button>
            )}
            <div className="px-4 py-2 bg-white/80 backdrop-blur border border-slate-200 rounded-xl shadow-sm flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-orange-600 font-bold">
                <Zap className="w-5 h-5 fill-orange-500" /> {MOCK_USER.streak}
              </div>
              <div className="w-px h-6 bg-slate-200" />
              <div className="flex items-center gap-1.5 text-indigo-600 font-bold">
                <Target className="w-5 h-5" /> {MOCK_USER.xp} XP
              </div>
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition shadow-sm">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="max-w-6xl mx-auto">
          {activeTab === 'study' && studyActivity.type === 'list' && (
            <div className="space-y-10 content-section">
              
              {/* --- 1. Quick Stats Row --- */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stat-card p-6 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-3xl text-white shadow-xl shadow-indigo-200 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <Activity className="w-24 h-24" />
                  </div>
                  <h3 className="text-indigo-100 font-medium mb-1">Weekly Goal</h3>
                  <div className="text-4xl font-extrabold mb-4">75%</div>
                  <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                    <div className="w-[75%] bg-white h-full rounded-full" />
                  </div>
                  <p className="text-sm mt-3 text-indigo-100 font-medium">12/16 topics mastered</p>
                </div>

                <div className="stat-card p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-indigo-100 transition-colors">
                  <div className="flex justify-between items-start">
                     <div>
                       <h3 className="text-slate-500 font-medium mb-1">Time Spent</h3>
                       <div className="text-3xl font-extrabold text-slate-900">4.5h</div>
                     </div>
                     <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform">
                       <Clock className="w-6 h-6" />
                     </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600 font-semibold bg-green-50 w-fit px-2 py-1 rounded-lg mt-4">
                    <TrendingUp className="w-4 h-4" /> +12% vs last week
                  </div>
                </div>

                 <div className="stat-card p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-orange-100 transition-colors">
                  <div className="flex justify-between items-start">
                     <div>
                       <h3 className="text-slate-500 font-medium mb-1">Documents Processed</h3>
                       <div className="text-3xl font-extrabold text-slate-900">24</div>
                     </div>
                     <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl group-hover:scale-110 transition-transform">
                       <FileText className="w-6 h-6" />
                     </div>
                  </div>
                   <p className="text-sm text-slate-400 mt-4">All vectors indexed and ready.</p>
                </div>
              </div>

              {/* --- 2. Carousel Section --- */}
              <div className="content-section">
                <LearningCarousel />
              </div>

              {/* --- 3. Interactive Study Plan --- */}
              <div className="content-section">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-800">Your Personalized Plan</h3>
                  <button className="text-indigo-600 font-semibold text-sm hover:underline">View Full Schedule</button>
                </div>
                
                <div className="space-y-4">
                  {MOCK_PLAN.map((item) => (
                    <TiltCard key={item.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group cursor-pointer relative overflow-hidden">
                      {/* Hover gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      <div className="flex items-center gap-6 relative z-10">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-sm transition-transform group-hover:scale-110 duration-300 ${
                          item.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-600 group-hover:text-white'
                        }`}>
                           {item.status === 'completed' ? <CheckCircle /> : (item.type === 'Quiz' ? <Zap /> : <BookOpen />)}
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-slate-800 text-lg group-hover:text-indigo-700 transition-colors">{item.topic}</h4>
                          <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                            <span className="font-medium bg-slate-100 px-2 py-0.5 rounded text-xs uppercase tracking-wide">{item.type}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.duration}</span>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                              item.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
                              item.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                            }`}>{item.difficulty}</span>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10">
                        {item.status !== 'completed' ? (
                          <button 
                            onClick={(e) => { e.stopPropagation(); item.type === 'Quiz' ? startQuiz(item.topic) : alert(`Starting ${item.topic}`); }}
                            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-medium shadow-md hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                          >
                            Start
                          </button>
                        ) : (
                          <span className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-4 py-2 rounded-xl">
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
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                 <DocumentUploader />
              </div>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-xl text-white flex flex-col justify-center">
                <h3 className="font-bold text-2xl mb-4">Vector Database Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Total Chunks</span>
                    <span className="font-mono text-green-400">14,205</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Embedding Model</span>
                    <span className="font-mono text-blue-300">all-MiniLM-L6-v2</span>
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
            <div className="content-section flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm border-dashed">
               <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                 <Zap className="w-10 h-10 text-indigo-500" />
               </div>
               <h3 className="text-3xl font-bold text-slate-900 mb-2">AI Workflow Builder</h3>
               <p className="text-slate-500 max-w-md text-center mb-8">
                 Drag and drop AI agents to create custom automation chains for your documents.
               </p>
               <Link 
                 href="/workflow"
                 className="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-300"
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