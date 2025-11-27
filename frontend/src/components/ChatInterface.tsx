'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send } from 'lucide-react';
// import api from '@/lib/axios'; // Uncomment when backend is ready

export default function ChatInterface() {
  // Initial welcome message
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Hello! I've analyzed your uploaded notes. Ready to review concepts or generate a quiz?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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
      }, 1200);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I couldn't reach the AI service. Please check your backend connection." }]);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-600" />
          <span className="font-semibold text-slate-800">AI Tutor (RAG Enabled)</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-none' 
                : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-xs text-slate-400 p-2 ml-2">AI is thinking...</div>}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question about your documents..."
          className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button 
          onClick={handleSend} 
          disabled={loading || !input.trim()} 
          className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}