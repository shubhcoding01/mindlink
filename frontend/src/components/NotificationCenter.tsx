// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Bell, FileText, CheckCircle, Clock, X, Loader2, Zap } from 'lucide-react';

// interface Notification {
//     id: number;
//     title: string;
//     message: string;
//     type: 'success' | 'info' | 'warning';
//     read: boolean;
//     timestamp: number;
// }

// const MOCK_NOTIFICATIONS: Notification[] = [
//     { id: 1, title: "Document Ingestion Complete", message: "Your 'Transformer Models' notes are ready for RAG querying.", type: 'success', read: false, timestamp: Date.now() - 60000 },
//     { id: 2, title: "Review Due Soon", message: "The 'Vector Embeddings' quiz is due for spaced repetition tomorrow.", type: 'info', read: false, timestamp: Date.now() - 3600000 },
//     { id: 3, title: "API Endpoint Offline", message: "The recommendation engine is currently experiencing issues.", type: 'warning', read: true, timestamp: Date.now() - 86400000 },
// ];

// export default function NotificationCenter() {
//   const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
//   const [isOpen, setIsOpen] = useState(false);
//   const unreadCount = notifications.filter(n => !n.read).length;

//   // Simple function to mark all unread notifications as read
//   const markAllAsRead = () => {
//     setNotifications(prev => prev.map(n => ({ ...n, read: true })));
//   };

//   const removeNotification = (id: number) => {
//     setNotifications(prev => prev.filter(n => n.id !== id));
//   };

//   const getIconAndColor = (type: Notification['type']) => {
//     switch (type) {
//       case 'success':
//         return { icon: CheckCircle, color: 'text-green-500' };
//       case 'info':
//         return { icon: Clock, color: 'text-indigo-500' };
//       case 'warning':
//         return { icon: Zap, color: 'text-red-500' };
//       default:
//         return { icon: FileText, color: 'text-slate-500' };
//     }
//   };

//   return (
//     <div className="relative">
//       {/* Notification Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="relative p-2 rounded-full text-slate-500 hover:text-slate-700 bg-white hover:bg-slate-100 transition"
//       >
//         <Bell className="w-6 h-6" />
//         {unreadCount > 0 && (
//           <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
//             {unreadCount}
//           </span>
//         )}
//       </button>

//       {/* Notification Dropdown Panel */}
//       {isOpen && (
//         <div className="absolute right-0 mt-3 w-80 max-h-96 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 transform translate-x-1/2 md:translate-x-0">
//           <div className="p-4 flex justify-between items-center border-b border-slate-100">
//             <h3 className="font-semibold text-slate-800">Notifications ({unreadCount} Unread)</h3>
//             {unreadCount > 0 && (
//               <button onClick={markAllAsRead} className="text-xs text-indigo-600 hover:underline">
//                 Mark All Read
//               </button>
//             )}
//           </div>
          
//           <div className="overflow-y-auto p-2 space-y-2">
//             {notifications.length === 0 ? (
//               <p className="text-center text-sm text-slate-500 p-4">You're all caught up!</p>
//             ) : (
//               notifications.map(n => {
//                 const { icon: Icon, color } = getIconAndColor(n.type);
//                 return (
//                   <div 
//                     key={n.id} 
//                     className={`flex items-start p-3 rounded-lg transition duration-150 ${n.read ? 'bg-white' : 'bg-indigo-50 hover:bg-indigo-100'}`}
//                   >
//                     <Icon className={`w-5 h-5 mr-3 shrink-0 mt-1 ${color}`} />
//                     <div className="flex-1 min-w-0">
//                       <p className={`text-sm font-medium ${n.read ? 'text-slate-700' : 'text-slate-900'}`}>{n.title}</p>
//                       <p className="text-xs text-slate-500 truncate">{n.message}</p>
//                       <p className="text-[10px] text-slate-400 mt-1">{new Date(n.timestamp).toLocaleTimeString()}</p>
//                     </div>
//                     <button onClick={() => removeNotification(n.id)} className="ml-2 text-slate-400 hover:text-red-500 shrink-0 p-1 rounded">
//                       <X className="w-3 h-3" />
//                     </button>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, FileText, CheckCircle, Clock, X, Zap, Activity } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface Notification {
    id: number;
    title: string;
    message: string;
    type: 'success' | 'info' | 'warning';
    read: boolean;
    timestamp: number;
}

const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 1, title: "Document Ingestion Complete", message: "Your 'Transformer Models' notes are ready for RAG querying.", type: 'success', read: false, timestamp: Date.now() - 60000 },
    { id: 2, title: "Review Due Soon", message: "The 'Vector Embeddings' quiz is due for spaced repetition tomorrow.", type: 'info', read: false, timestamp: Date.now() - 3600000 },
    { id: 3, title: "API Endpoint Offline", message: "The recommendation engine is currently experiencing issues.", type: 'warning', read: true, timestamp: Date.now() - 86400000 },
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  // Toggle Dropdown Animation
  useGSAP(() => {
    if (isOpen && dropdownRef.current) {
      gsap.fromTo(dropdownRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.2)" }
      );
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIconAndColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' };
      case 'info':
        return { icon: Clock, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' };
      case 'warning':
        return { icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' };
      default:
        return { icon: FileText, color: 'text-slate-400', bg: 'bg-slate-800 border-slate-700' };
    }
  };

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2.5 rounded-xl transition-all duration-300 border ${
            isOpen 
            ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' 
            : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-600'
        }`}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold leading-none text-white bg-rose-500 rounded-full shadow-lg shadow-rose-500/40 border border-slate-950 animate-bounce">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown Panel */}
      {isOpen && (
        <div 
            ref={dropdownRef}
            className="absolute right-0 mt-4 w-80 sm:w-96 max-h-128 bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden z-50 origin-top-right"
        >
          {/* Header */}
          <div className="p-4 flex justify-between items-center border-b border-slate-800 bg-slate-950/30">
            <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                <h3 className="font-semibold text-slate-200 text-sm">System Events</h3>
                <span className="bg-slate-800 text-slate-400 text-xs px-2 py-0.5 rounded-full border border-slate-700">{unreadCount} New</span>
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                Mark All Read
              </button>
            )}
          </div>
          
          {/* List */}
          <div className="overflow-y-auto p-2 space-y-2 max-h-96 custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="text-center py-12 px-6">
                 <div className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Bell className="w-5 h-5 text-slate-600" />
                 </div>
                 <p className="text-sm text-slate-400">All systems operational.</p>
                 <p className="text-xs text-slate-600 mt-1">No new notifications.</p>
              </div>
            ) : (
              notifications.map(n => {
                const { icon: Icon, color, bg } = getIconAndColor(n.type);
                return (
                  <div 
                    key={n.id} 
                    className={`relative group flex items-start p-3 rounded-xl border transition-all duration-200 ${
                        n.read 
                        ? 'bg-transparent border-transparent hover:bg-slate-800/50' 
                        : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600'
                    }`}
                  >
                    {/* Icon Box */}
                    <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center border mt-0.5 ${bg} ${color}`}>
                        <Icon className="w-4 h-4" />
                    </div>

                    {/* Content */}
                    <div className="ml-3 flex-1 min-w-0 mr-6">
                      <div className="flex justify-between items-start">
                          <p className={`text-sm font-medium ${n.read ? 'text-slate-400' : 'text-slate-200'}`}>
                              {n.title}
                          </p>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-2">
                          {n.message}
                      </p>
                      <p className="text-[10px] text-slate-600 mt-2 font-mono">
                          {new Date(n.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>

                    {/* Close Button (Hover only) */}
                    <button 
                        onClick={(e) => { e.stopPropagation(); removeNotification(n.id); }}
                        className="absolute top-2 right-2 p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    
                    {/* Unread Dot */}
                    {!n.read && (
                        <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)] animate-pulse" />
                    )}
                  </div>
                );
              })
            )}
          </div>
          
          {/* Footer */}
          <div className="p-2 border-t border-slate-800 bg-slate-950/30 text-center">
             <button className="w-full py-2 text-xs text-slate-500 hover:text-slate-300 transition-colors">
                View History
             </button>
          </div>
        </div>
      )}
    </div>
  );
}