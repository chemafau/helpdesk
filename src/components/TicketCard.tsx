'use client';

import { Ticket } from '@/types';
import { getRelativeTime, getAvatarColor, getStatusColor, getPriorityColor } from '@/lib/utils';

type Props = {
  ticket: Ticket;
  selected: boolean;
  onSelect: () => void;
  isNew?: boolean;
};

export default function TicketCard({ ticket, selected, onSelect, isNew }: Props) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-3.5 border-b border-gray-100 transition-colors flex gap-3 ${
        selected ? 'bg-violet-50 border-l-2 border-l-violet-500' : 'hover:bg-gray-50 border-l-2 border-l-transparent'
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5 ${getAvatarColor(ticket.user_avatar)}`}
      >
        {ticket.user_avatar}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Row 1: ID + time + unread dot */}
        <div className="flex items-center justify-between mb-0.5">
          <span className={`text-xs font-semibold ${selected ? 'text-violet-700' : 'text-gray-500'}`}>
            {ticket.ticket_id}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-gray-400">{getRelativeTime(ticket.created_at)}</span>
            {isNew && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
          </div>
        </div>

        {/* Row 2: Title */}
        <p className="text-sm font-medium text-gray-800 truncate leading-snug mb-1">
          {ticket.title}
        </p>

        {/* Row 3: Category + Priority + Status */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px] text-gray-400 truncate">
            <span>{ticket.category}</span>
            <span>•</span>
            <span className={`font-medium ${getPriorityTextColor(ticket.priority)}`}>
              {ticket.priority}
            </span>
          </div>
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${getStatusColor(ticket.status)}`}>
            {ticket.status}
          </span>
        </div>
      </div>
    </button>
  );
}

function getPriorityTextColor(priority: string) {
  switch (priority) {
    case 'Critical': return 'text-red-600';
    case 'High': return 'text-red-500';
    case 'Medium': return 'text-orange-500';
    case 'Low': return 'text-blue-500';
    default: return 'text-gray-500';
  }
}
