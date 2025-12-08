// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { Brain, Send } from 'lucide-react';
// // import api from '@/lib/axios'; // Uncomment when backend is ready

// export default function ChatInterface() {
//   // Initial welcome message
//   const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
//     { role: 'ai', text: "Hello! I've analyzed your uploaded notes. Ready to review concepts or generate a quiz?" }
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   // Auto-scroll to bottom whenever messages change
//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSend = async () => {
//     if (!input.trim()) return;
    
//     // 1. Add user message immediately
//     setMessages(prev => [...prev, { role: 'user', text: input }]);
//     const currentInput = input;
//     setInput("");
//     setLoading(true);

//     try {
//       // --- REAL API CALL (Uncomment when backend is running) ---
//       // const { data } = await api.post('/ai/chat', { prompt: currentInput });
//       // setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
      
//       // --- MOCK RESPONSE (For UI testing) ---
//       setTimeout(() => {
//         setMessages(prev => [...prev, { 
//           role: 'ai', 
//           text: "That's a great question! Based on your documents, the concept of Retrieval-Augmented Generation (RAG) primarily focuses on grounding the Large Language Model's output in your personal data sources to reduce hallucination. Would you like a deeper explanation or a quick example?" 
//         }]);
//         setLoading(false);
//       }, 1200);
//     } catch (error) {
//       console.error("Chat error:", error);
//       setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I couldn't reach the AI service. Please check your backend connection." }]);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//       {/* Chat Header */}
//       <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
//         <div className="flex items-center gap-2">
//           <Brain className="w-5 h-5 text-indigo-600" />
//           <span className="font-semibold text-slate-800">AI Tutor (RAG Enabled)</span>
//         </div>
//       </div>

//       {/* Messages Area */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50" ref={scrollRef}>
//         {messages.map((msg, idx) => (
//           <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//             <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
//               msg.role === 'user' 
//                 ? 'bg-indigo-600 text-white rounded-br-none' 
//                 : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
//             }`}>
//               {msg.text}
//             </div>
//           </div>
//         ))}
//         {loading && <div className="text-xs text-slate-400 p-2 ml-2">AI is thinking...</div>}
//       </div>

//       {/* Input Area */}
//       <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//           placeholder="Ask a question about your documents..."
//           className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//         />
//         <button 
//           onClick={handleSend} 
//           disabled={loading || !input.trim()} 
//           className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
//         >
//           <Send className="w-5 h-5" />
//         </button>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send, Bot, User, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// import api from '@/lib/axios'; // Uncomment when backend is ready

export default function ChatInterface() {
  // Initial welcome message
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Neural link established. I've analyzed your uploaded notes. Ready to review concepts or generate a quiz?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Entrance Animation
  useGSAP(() => {
    gsap.fromTo(chatContainerRef.current, 
      { opacity: 0, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
    );
  }, { scope: chatContainerRef });

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // 1. Add user message immediately
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      // --- REAL API CALL (Uncomment when backend is running) ---
      // const { data } = await api.post('/ai/chat', { prompt: currentInput });
      // setMessages(prev => [...prev, { role: 'ai', text: data.response }]);
      
      // --- MOCK RESPONSE (For UI testing) ---
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: "That's a great question! Based on your documents, the concept of Retrieval-Augmented Generation (RAG) primarily focuses on grounding the Large Language Model's output in your personal data sources to reduce hallucination. Would you like a deeper explanation or a quick example?" 
        }]);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Connection interrupted. Re-establishing neural link..." }]);
      setLoading(false);
    }
  };

  return (
    <div ref={chatContainerRef} className="flex flex-col h-[600px] bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Chat Header */}
      <div className="p-5 border-b border-slate-700/50 flex justify-between items-center bg-slate-900/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 blur-md opacity-40 animate-pulse" />
            <div className="relative p-2 bg-indigo-900/30 border border-indigo-500/30 rounded-xl">
               <Brain className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-slate-100 flex items-center gap-2">
              Gemini Core 
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </h3>
            <p className="text-xs text-indigo-300/60 font-mono">RAG Pipeline: Active</p>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition" title="Reset Context">
           <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
             
             {/* Avatar */}
             <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border shadow-lg mt-1 ${
               msg.role === 'user' 
                 ? 'bg-slate-700 border-slate-600 text-slate-300' 
                 : 'bg-indigo-600 border-indigo-400 text-white'
             }`}>
               {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
             </div>

             {/* Bubble */}
             <div className={`relative max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-md ${
               msg.role === 'user' 
                 ? 'bg-slate-800 text-slate-200 rounded-tr-sm border border-slate-700' 
                 : 'bg-gradient-to-br from-indigo-900/40 to-slate-900/40 backdrop-blur-md text-indigo-100 rounded-tl-sm border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
             }`}>
               {msg.text}
               {msg.role === 'ai' && (
                 <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-indigo-500/50 blur-sm rounded-full" />
               )}
             </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex gap-4 animate-pulse">
            <div className="w-8 h-8 bg-indigo-600/20 border border-indigo-500/30 rounded-full flex items-center justify-center">
               <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="bg-slate-800/50 rounded-2xl rounded-tl-sm p-4 border border-slate-700/50 flex items-center gap-3">
               <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
               <span className="text-xs text-indigo-300">Analyzing vector context...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900/80 backdrop-blur-md border-t border-slate-800">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question about your documents..."
            className="w-full bg-slate-950/50 border border-slate-700/50 text-slate-200 placeholder:text-slate-500 rounded-xl px-4 py-3.5 pr-12 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-inner font-light"
          />
          <button 
            onClick={handleSend} 
            disabled={loading || !input.trim()} 
            className="absolute right-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-900/50 group"
          >
            <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
        <div className="text-center mt-2">
           <p className="text-[10px] text-slate-600">AI can make mistakes. Verify with original documents.</p>
        </div>
      </div>
    </div>
  );
}