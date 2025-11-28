'use client';

import React, { useState, useEffect } from 'react';
import { Bell, FileText, CheckCircle, Clock, X, Loader2, Zap } from 'lucide-react';

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
  const unreadCount = notifications.filter(n => !n.read).length;

  // Simple function to mark all unread notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIconAndColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return { icon: CheckCircle, color: 'text-green-500' };
      case 'info':
        return { icon: Clock, color: 'text-indigo-500' };
      case 'warning':
        return { icon: Zap, color: 'text-red-500' };
      default:
        return { icon: FileText, color: 'text-slate-500' };
    }
  };

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full text-slate-500 hover:text-slate-700 bg-white hover:bg-slate-100 transition"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 max-h-96 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 transform translate-x-1/2 md:translate-x-0">
          <div className="p-4 flex justify-between items-center border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Notifications ({unreadCount} Unread)</h3>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="text-xs text-indigo-600 hover:underline">
                Mark All Read
              </button>
            )}
          </div>
          
          <div className="overflow-y-auto p-2 space-y-2">
            {notifications.length === 0 ? (
              <p className="text-center text-sm text-slate-500 p-4">You're all caught up!</p>
            ) : (
              notifications.map(n => {
                const { icon: Icon, color } = getIconAndColor(n.type);
                return (
                  <div 
                    key={n.id} 
                    className={`flex items-start p-3 rounded-lg transition duration-150 ${n.read ? 'bg-white' : 'bg-indigo-50 hover:bg-indigo-100'}`}
                  >
                    <Icon className={`w-5 h-5 mr-3 shrink-0 mt-1 ${color}`} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${n.read ? 'text-slate-700' : 'text-slate-900'}`}>{n.title}</p>
                      <p className="text-xs text-slate-500 truncate">{n.message}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{new Date(n.timestamp).toLocaleTimeString()}</p>
                    </div>
                    <button onClick={() => removeNotification(n.id)} className="ml-2 text-slate-400 hover:text-red-500 shrink-0 p-1 rounded">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}