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
//   ChevronRight
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

// export default function DashboardPage() {
//   // Tabs: study (default view), chat (AI Tutor), files (Document Uploader)
//   const [activeTab, setActiveTab] = useState<'study' | 'chat' | 'files'>('study');

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
//           <button onClick={() => setActiveTab('study')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'study' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
//             <BookOpen className="w-5 h-5" /> <span className="hidden lg:block font-medium">Study Plan</span>
//           </button>
//           <button onClick={() => setActiveTab('chat')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'chat' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
//             <MessageSquare className="w-5 h-5" /> <span className="hidden lg:block font-medium">AI Tutor</span>
//           </button>
//           <button onClick={() => setActiveTab('files')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'files' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
//             <FileText className="w-5 h-5" /> <span className="hidden lg:block font-medium">Documents</span>
//           </button>
//           {/* Example for the Analytics tab from your previous lists */}
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
//             {activeTab === 'study' && "Today's Study Plan"}
//             {activeTab === 'chat' && "AI Tutor Session"}
//             {activeTab === 'files' && "Document Library"}
//           </h2>
//           <div className="flex items-center gap-4">
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
//           {activeTab === 'study' && (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2 space-y-4">
//                 <h3 className="text-lg font-semibold text-slate-700 mb-3">Next Steps:</h3>
//                 {MOCK_PLAN.map((item) => (
//                   <div key={item.id} className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                       <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                         item.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'
//                       }`}>
//                         {item.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
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
//                       <button className="px-4 py-2 bg-slate-900 text-white text-sm rounded-lg group-hover:bg-indigo-600 transition">
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
//                      {['Linear Algebra', 'Python Basics', 'Advanced RAG'].map(topic => (
//                        <div key={topic} className="flex items-center justify-between text-sm text-slate-600 hover:text-indigo-600 cursor-pointer transition">
//                          <span>{topic}</span>
//                          <ChevronRight className="w-4 h-4 text-slate-400" />
//                        </div>
//                      ))}
//                    </div>
//                  </div>
//               </div>
//             </div>
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
//         </div>
//       </main>
//     </div>
//   );
// }

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  MessageSquare, 
  BarChart3, 
  Brain, 
  FileText,
  LogOut,
  Settings,
  Clock,
  CheckCircle,
  ChevronRight,
  Zap // Imported Zap icon for Workflows
} from 'lucide-react';

// Assuming these components are in src/components/
import ChatInterface from '@/components/ChatInterface';
import DocumentUploader from '@/components/DocumentUploader';

// --- MOCK DATA ---
interface UserProfile {
  name: string;
  learningStyle: 'Visual' | 'Textual' | 'Auditory';
  streak: number;
}
interface StudyPlanItem {
  id: string;
  topic: string;
  type: 'Quiz' | 'Reading' | 'Video';
  duration: string;
  status: 'pending' | 'completed';
}

const MOCK_USER: UserProfile = {
  name: "Alex",
  learningStyle: "Visual",
  streak: 12
};

const MOCK_PLAN: StudyPlanItem[] = [
  { id: '1', topic: 'Intro to RAG Pipelines', type: 'Reading', duration: '15 min', status: 'completed' },
  { id: '2', topic: 'Vector Embedding Basics Quiz', type: 'Quiz', duration: '10 min', status: 'pending' },
  { id: '3', topic: 'Review: Transformer Models', type: 'Video', duration: '5 min', status: 'pending' },
];

export default function DashboardPage() {
  // Tabs: study (default view), chat (AI Tutor), files (Document Uploader)
  const [activeTab, setActiveTab] = useState<'study' | 'chat' | 'files' | 'workflows'>('study');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      {/* Sidebar Navigation (Fixed) */}
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10 transition-all">
        <div className="p-6 flex items-center gap-3">
          <Brain className="w-8 h-8 text-indigo-600" />
          <span className="text-xl font-bold hidden lg:block">MindLink</span>
        </div>
        
        {/* Navigation Items */}
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button onClick={() => setActiveTab('study')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'study' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <BookOpen className="w-5 h-5" /> <span className="hidden lg:block font-medium">Study Plan</span>
          </button>
          <button onClick={() => setActiveTab('chat')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'chat' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <MessageSquare className="w-5 h-5" /> <span className="hidden lg:block font-medium">AI Tutor</span>
          </button>
          <button onClick={() => setActiveTab('files')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'files' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <FileText className="w-5 h-5" /> <span className="hidden lg:block font-medium">Documents</span>
          </button>

          {/* NEW: Workflow Link */}
          <Link href="/workflow" className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'workflows' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            onClick={() => setActiveTab('workflows')} // Note: This is now a Link, but setting activeTab for visual feedback
          >
            <Zap className="w-5 h-5" /> <span className="hidden lg:block font-medium">Workflows</span>
          </Link>
          
          {/* Analytics (Previously soon/disabled, kept for structure) */}
          <button onClick={() => setActiveTab('study')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition text-slate-400 cursor-not-allowed`}>
            <BarChart3 className="w-5 h-5" /> <span className="hidden lg:block font-medium">Analytics (Soon)</span>
          </button>
        </nav>

        {/* User Profile / Logout */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              {MOCK_USER.name[0]}
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold">{MOCK_USER.name}</p>
              <p className="text-xs text-slate-500">{MOCK_USER.learningStyle} Learner</p>
            </div>
          </div>
          <Link href="/login" className="w-full flex items-center gap-3 p-2 text-red-500 hover:bg-red-50 rounded-lg transition text-sm">
            <LogOut className="w-4 h-4" /> <span className="hidden lg:block">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area (Offset by Sidebar) */}
      <main className="flex-1 ml-20 lg:ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            {activeTab === 'study' && "Today's Study Plan"}
            {activeTab === 'chat' && "AI Tutor Session"}
            {activeTab === 'files' && "Document Library"}
            {activeTab === 'workflows' && "Workflows"}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" /> Streak: {MOCK_USER.streak} days
            </span>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="max-w-5xl">
          {/* Study Plan Content */}
          {activeTab === 'study' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 mb-3">Next Steps:</h3>
                {MOCK_PLAN.map((item) => (
                  <div key={item.id} className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        {item.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{item.topic}</h4>
                        <p className="text-sm text-slate-500 flex items-center gap-2">
                          <span className="capitalize">{item.type}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          {item.duration}
                        </p>
                      </div>
                    </div>
                    {item.status !== 'completed' && (
                      <button className="px-4 py-2 bg-slate-900 text-white text-sm rounded-lg group-hover:bg-indigo-600 transition">
                        Start
                      </button>
                    )}
                    {item.status === 'completed' && (
                       <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                ))}
              </div>

              {/* Study Plan Sidebar */}
              <div className="space-y-6">
                 <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg">
                    <h3 className="font-bold text-lg mb-2">Weekly Goal Progress</h3>
                    <div className="w-full bg-white/20 h-2 rounded-full mb-2">
                      <div className="w-[75%] bg-white h-full rounded-full" />
                    </div>
                    <p className="text-sm opacity-90">75% Complete</p>
                 </div>
                 
                 <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                   <h3 className="font-bold text-slate-800 mb-4">Quick Review Topics</h3>
                   <div className="space-y-3">
                     {['Linear Algebra', 'Python Basics', 'Advanced RAG'].map(topic => (
                       <div key={topic} className="flex items-center justify-between text-sm text-slate-600 hover:text-indigo-600 cursor-pointer transition">
                         <span>{topic}</span>
                         <ChevronRight className="w-4 h-4 text-slate-400" />
                       </div>
                     ))}
                   </div>
                 </div>
              </div>
            </div>
          )}

          {/* AI Tutor Content */}
          {activeTab === 'chat' && <ChatInterface />}
          
          {/* Document Library Content */}
          {activeTab === 'files' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DocumentUploader />
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4">Processing Queue</h3>
                <p className="text-slate-500 text-sm">Uploaded documents are processed by the vector engine here, ready to become part of your personal knowledge base.</p>
              </div>
            </div>
          )}
          
          {/* Workflows Content - Link to the dedicated page */}
          {activeTab === 'workflows' && (
            <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
               <Zap className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
               <h3 className="text-xl font-medium text-slate-900">AI Workflow Builder</h3>
               <p className="text-slate-500 mt-2">Design custom AI automation chains to process your documents and goals.</p>
               <Link 
                 href="/workflow"
                 className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
               >
                 Go to Builder →
               </Link>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}