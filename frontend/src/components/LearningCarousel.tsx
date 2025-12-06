'use client';

import React from 'react';
// --- LOCAL SETUP: Uncomment these imports after running 'npm install swiper' ---
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

import { BookOpen, ChevronRight, PlayCircle } from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  category: string;
  duration: string;
  color: string;
}

const MOCK_TOPICS: Topic[] = [
  { id: '1', title: 'Vector Embeddings 101', category: 'Concept', duration: '15 min', color: 'bg-blue-50 text-blue-700' },
  { id: '2', title: 'Transformer Architecture', category: 'Deep Dive', duration: '45 min', color: 'bg-purple-50 text-purple-700' },
  { id: '3', title: 'RAG Pipelines Setup', category: 'Practical', duration: '30 min', color: 'bg-emerald-50 text-emerald-700' },
  { id: '4', title: 'Python Async/Await', category: 'Coding', duration: '20 min', color: 'bg-orange-50 text-orange-700' },
];

export default function LearningCarousel() {
  // --- MOCK SWIPER FOR PREVIEW (Replace this return with the commented code below locally) ---
  return (
    <div className="w-full overflow-hidden">
      <h3 className="font-bold text-slate-800 mb-4 px-1">Recommended for You</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
        {MOCK_TOPICS.map((topic) => (
          <div key={topic.id} className="snap-center shrink-0 w-64 p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer">
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-3 ${topic.color}`}>
              {topic.category}
            </div>
            <h4 className="font-bold text-slate-900 mb-2">{topic.title}</h4>
            <div className="flex items-center justify-between text-sm text-slate-500 mt-4">
              <span className="flex items-center gap-1"><PlayCircle className="w-4 h-4" /> {topic.duration}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* --- UNCOMMENT THIS LOCALLY FOR REAL SWIPER ---
  return (
    <div className="w-full">
      <h3 className="font-bold text-slate-800 mb-4 px-1">Recommended for You</h3>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
        }}
        navigation
        pagination={{ clickable: true }}
      >
        {MOCK_TOPICS.map((topic) => (
          <SwiperSlide key={topic.id}>
            <div className="h-full p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer group">
              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-3 ${topic.color}`}>
                {topic.category}
              </div>
              <h4 className="font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition">{topic.title}</h4>
              <div className="flex items-center justify-between text-sm text-slate-500 mt-4">
                <span className="flex items-center gap-1"><PlayCircle className="w-4 h-4" /> {topic.duration}</span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition">
                    <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
  */
}