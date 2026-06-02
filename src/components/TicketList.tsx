'use client';

import { Ticket, TicketStatus } from '@/types';
import TicketCard from './TicketCard';

type FilterTab = TicketStatus | 'all';

const tabs: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'Semua' },
  { key: 'Open', label: 'Open' },
  { key: 'In Progress', label: 'In Progress' },
  { key: 'Resolved', label: 'Resolved' },
  { key: 'Closed', label: 'Closed' },
];

type Props = {
  tickets: Ticket[];
  selectedTicketId: string | null;
  onSelect: (id: string) => void;
  statusFilter: FilterTab;
  onFilterChange: (f: FilterTab) => void;
  onNewTicket: () => void;
};

export default function TicketList({
  tickets,
  selectedTicketId,
  onSelect,
  statusFilter,
  onFilterChange,
  onNewTicket,
}: Props) {
  return (
    <div className="w-80 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 pb-0 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Tickets</h2>
          <button
            onClick={onNewTicket}
            className="flex items-center gap-1.5 bg-violet-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-violet-700 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Ticket
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onFilterChange(tab.key)}
              className={`text-xs font-medium px-3 py-2 whitespace-nowrap border-b-2 transition-colors ${
                statusFilter === tab.key
                  ? 'border-violet-600 text-violet-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {tickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <svg className="w-10 h-10 mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
            <p className="text-sm">Tidak ada ticket ditemukan</p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket.ticket_id}
              ticket={ticket}
              selected={selectedTicketId === ticket.ticket_id}
              onSelect={() => onSelect(ticket.ticket_id)}
              isNew={ticket.status === 'Open'}
            />
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100 text-center">
        <button className="text-xs text-violet-600 hover:text-violet-800 font-medium">
          Lihat semua ticket →
        </button>
      </div>
    </div>
  );
}
