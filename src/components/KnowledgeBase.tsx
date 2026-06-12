'use client';

import { useState, useMemo } from 'react';
import { knowledgeBase } from '@/data/knowledge-base';
import { TicketCategory } from '@/types';

const CATEGORIES: (TicketCategory | 'Semua')[] = [
  'Semua', 'Login', 'Database', 'Application', 'Network', 'Hardware', 'Email', 'Access', 'Performance',
];

const CATEGORY_COLORS: Record<string, string> = {
  Login: 'bg-blue-50 text-blue-700 border-blue-100',
  Database: 'bg-orange-50 text-orange-700 border-orange-100',
  Application: 'bg-violet-50 text-violet-700 border-violet-100',
  Network: 'bg-cyan-50 text-cyan-700 border-cyan-100',
  Hardware: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  Email: 'bg-pink-50 text-pink-700 border-pink-100',
  Access: 'bg-red-50 text-red-700 border-red-100',
  Performance: 'bg-green-50 text-green-700 border-green-100',
};

export default function KnowledgeBase() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<TicketCategory | 'Semua'>('Semua');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return knowledgeBase.filter((kb) => {
      const matchCat = activeCategory === 'Semua' || kb.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        kb.title.toLowerCase().includes(q) ||
        kb.content.toLowerCase().includes(q) ||
        kb.tags.some((t) => t.includes(q));
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Knowledge Base</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Panduan dan SOP penanganan tiket — digunakan AI sebagai referensi utama
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1.5 rounded-lg">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            <span className="font-medium">AI Maldevta membaca panduan ini</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari panduan, SOP, atau keyword..."
            className="w-full h-9 pl-9 pr-4 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                activeCategory === cat
                  ? 'bg-violet-600 text-white border-violet-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-xs text-gray-400 mb-4">
          {filtered.length} panduan ditemukan
        </p>

        {/* Articles */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <svg className="w-10 h-10 mx-auto mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-sm">Tidak ada panduan ditemukan</p>
            </div>
          ) : (
            filtered.map((kb) => {
              const isExpanded = expandedId === kb.id;
              return (
                <div
                  key={kb.id}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors"
                >
                  {/* Article header */}
                  <button
                    className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => setExpandedId(isExpanded ? null : kb.id)}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="text-xs font-bold text-gray-400 mt-0.5 flex-shrink-0 w-14">
                        SOP-{String(kb.id).padStart(3, '0')}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{kb.title}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[kb.category] || 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                            {kb.category}
                          </span>
                          {kb.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <svg
                      className={`w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {/* Article content */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
                      <pre className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">
                        {kb.content}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
