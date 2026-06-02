'use client';

import { useState } from 'react';
import { Ticket, Comment, TicketStatus } from '@/types';
import { getStatusColor, getPriorityColor, getAvatarColor, formatDateTime, formatDate } from '@/lib/utils';

type Tab = 'detail' | 'comments' | 'history' | 'related' | 'attachments';

type Props = {
  ticket: Ticket;
  comments: Comment[];
  onBack: () => void;
  onStatusChange: (ticketId: string, status: TicketStatus) => void;
  onUseAnswer?: (text: string) => void;
  pendingAnswer?: string;
};

const statuses: TicketStatus[] = ['Open', 'In Progress', 'Resolved', 'Closed'];

export default function TicketDetail({ ticket, comments, onBack, onStatusChange, pendingAnswer }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('detail');
  const [commentText, setCommentText] = useState(pendingAnswer ?? '');
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // Sync comment text when pendingAnswer changes
  if (pendingAnswer !== undefined && pendingAnswer !== commentText && activeTab !== 'comments') {
    // Will switch tab and set text when user clicks "Gunakan Jawaban"
  }

  const handleSendComment = () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: Date.now(),
      ticket_id: ticket.ticket_id,
      sender: 'IT Support',
      sender_type: 'Agent',
      message: commentText.trim(),
      timestamp: new Date().toISOString(),
    };
    setLocalComments((prev) => [...prev, newComment]);
    setCommentText('');
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'detail', label: 'Detail' },
    { key: 'comments', label: `Comments (${localComments.length})` },
    { key: 'history', label: 'History' },
    { key: 'related', label: 'Related Tickets' },
    { key: 'attachments', label: 'Attachments' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white border-r border-gray-200 overflow-hidden min-w-0">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Kembali
        </button>

        <div className="flex items-center gap-2">
          {/* Status dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowStatusDropdown((v) => !v)}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors"
            >
              Ubah Status
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {showStatusDropdown && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      onStatusChange(ticket.ticket_id, s);
                      setShowStatusDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                      ticket.status === s ? 'text-violet-700 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Ticket header */}
      <div className="px-5 pt-4 pb-3 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-bold text-gray-700">{ticket.ticket_id}</span>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getStatusColor(ticket.status)}`}>
            {ticket.status}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority}
          </span>
        </div>
        <h1 className="text-lg font-bold text-gray-900 leading-snug mb-3">{ticket.title}</h1>

        {/* Metadata row */}
        <div className="flex items-center gap-4 flex-wrap">
          <MetaItem
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            }
            label={ticket.user_name}
            sub="User"
          />
          <MetaItem
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            }
            label={formatDate(ticket.created_at)}
            sub={new Date(ticket.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
          />
          <MetaItem
            icon={
              <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
              </svg>
            }
            label={ticket.priority}
            sub="Priority"
          />
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 px-5 flex-shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`text-sm font-medium px-1 py-3 mr-5 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? 'border-violet-600 text-violet-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {activeTab === 'detail' && (
          <DetailTab ticket={ticket} />
        )}
        {activeTab === 'comments' && (
          <CommentsTab
            comments={localComments}
            commentText={commentText}
            onCommentChange={setCommentText}
            onSend={handleSendComment}
          />
        )}
        {activeTab === 'history' && (
          <HistoryTab ticket={ticket} />
        )}
        {activeTab === 'related' && (
          <div className="text-sm text-gray-400 text-center py-8">Tidak ada ticket terkait</div>
        )}
        {activeTab === 'attachments' && (
          <div className="text-sm text-gray-400 text-center py-8">Tidak ada attachment</div>
        )}
      </div>

      {/* Comment input (always visible) */}
      {activeTab === 'comments' && (
        <div className="px-5 py-3 border-t border-gray-100 flex-shrink-0">
          <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Tulis komentar..."
              rows={1}
              className="flex-1 bg-transparent text-sm resize-none outline-none text-gray-700 placeholder:text-gray-400 max-h-32"
              style={{ minHeight: '24px' }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = 'auto';
                el.style.height = Math.min(el.scrollHeight, 128) + 'px';
              }}
            />
            <div className="flex items-center gap-1 mb-0.5">
              <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                </svg>
              </button>
              <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
              </button>
              <button
                onClick={handleSendComment}
                className="bg-violet-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-violet-700 transition-colors ml-1"
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MetaItem({ icon, label, sub }: { icon: React.ReactNode; label: string; sub: string }) {
  return (
    <div className="flex items-center gap-1.5 text-gray-600">
      <span className="text-gray-400">{icon}</span>
      <div>
        <span className="text-sm font-medium">{label}</span>
        {sub && <span className="text-xs text-gray-400 ml-1">{sub}</span>}
      </div>
    </div>
  );
}

function DetailTab({ ticket }: { ticket: Ticket }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Deskripsi</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{ticket.description}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Kategori</p>
          <span className="text-xs font-semibold bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
            {ticket.category}
          </span>
        </div>
        {ticket.application && (
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Aplikasi</p>
            <p className="text-sm font-medium text-gray-700">{ticket.application}</p>
          </div>
        )}
        {ticket.environment && (
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">Environment</p>
            <p className="text-sm font-medium text-gray-700">{ticket.environment}</p>
          </div>
        )}
      </div>

      {ticket.agent_name && (
        <div className="bg-blue-50 rounded-xl p-3">
          <p className="text-[11px] font-semibold text-blue-400 uppercase tracking-wide mb-1">Ditangani oleh</p>
          <p className="text-sm font-medium text-blue-700">{ticket.agent_name}</p>
        </div>
      )}

      {ticket.resolution && (
        <div className="bg-green-50 rounded-xl p-3">
          <p className="text-[11px] font-semibold text-green-500 uppercase tracking-wide mb-1">Resolusi</p>
          <p className="text-sm text-green-700">{ticket.resolution}</p>
        </div>
      )}
    </div>
  );
}

function CommentsTab({
  comments,
  commentText,
  onCommentChange,
  onSend,
}: {
  comments: Comment[];
  commentText: string;
  onCommentChange: (v: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Conversation ({comments.length})</h3>
        <button className="text-xs font-semibold text-violet-600 border border-violet-200 px-3 py-1.5 rounded-lg hover:bg-violet-50 transition-colors">
          Tulis Balasan
        </button>
      </div>

      {comments.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">Belum ada komentar</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${
                c.sender_type === 'Agent' ? 'bg-indigo-500' : getAvatarColor(c.sender.slice(0, 2).toUpperCase())
              }`}>
                {c.sender_type === 'Agent' ? 'IT' : c.sender.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-800">
                    {c.sender}
                    <span className="text-xs font-normal text-gray-400 ml-1">({c.sender_type})</span>
                  </span>
                  <span className="text-xs text-gray-400">{formatDateTime(c.timestamp)}</span>
                </div>
                <div className="bg-gray-50 rounded-xl px-3 py-2.5">
                  <p className="text-sm text-gray-700 leading-relaxed">{c.message}</p>
                  {c.attachment && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-violet-600 bg-violet-50 border border-violet-100 rounded-lg px-2.5 py-1.5 w-fit">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                      </svg>
                      {c.attachment}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function HistoryTab({ ticket }: { ticket: Ticket }) {
  const events = [
    { label: 'Ticket dibuat', time: ticket.created_at, by: ticket.user_name },
    ...(ticket.agent_name ? [{ label: 'Ditugaskan ke ' + ticket.agent_name, time: ticket.updated_at, by: 'System' }] : []),
    ...(ticket.status !== 'Open' ? [{ label: 'Status diubah ke ' + ticket.status, time: ticket.updated_at, by: ticket.agent_name ?? 'IT Support' }] : []),
  ];

  return (
    <div className="space-y-3">
      {events.map((e, i) => (
        <div key={i} className="flex gap-3 items-start">
          <div className="w-2 h-2 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-700">{e.label}</p>
            <p className="text-xs text-gray-400">{formatDateTime(e.time)} — {e.by}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
