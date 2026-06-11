'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { tickets as initialTickets } from '@/data/tickets';
import { comments as allComments } from '@/data/comments';
import { analyzeTicket } from '@/lib/ai-analysis';
import { getSession, logout } from '@/lib/auth';
import { Ticket, TicketStatus } from '@/types';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import DashboardView from '@/components/Dashboard';
import TicketList from '@/components/TicketList';
import TicketDetail from '@/components/TicketDetail';
import AIAssistant from '@/components/AIAssistant';
import NewTicketModal from '@/components/NewTicketModal';

type FilterTab = TicketStatus | 'all';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (!getSession()) router.replace('/login');
  }, [router]);

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>('HD-1024');
  const [activePage, setActivePage] = useState('dashboard');
  const [statusFilter, setStatusFilter] = useState<FilterTab>('all');
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingAnswer, setPendingAnswer] = useState<string | undefined>(undefined);

  const selectedTicket = tickets.find((t) => t.ticket_id === selectedTicketId) ?? null;

  const ticketComments = useMemo(
    () => allComments.filter((c) => c.ticket_id === selectedTicketId),
    [selectedTicketId]
  );

  const aiAnalysis = useMemo(
    () => (selectedTicket ? analyzeTicket(selectedTicket) : null),
    [selectedTicket]
  );

  const filteredTickets = useMemo(() => {
    let result = tickets;
    if (statusFilter !== 'all') {
      result = result.filter((t) => t.status === statusFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.ticket_id.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [tickets, statusFilter, searchQuery]);

  const stats = useMemo(
    () => ({
      open: tickets.filter((t) => t.status === 'Open').length,
      inProgress: tickets.filter((t) => t.status === 'In Progress').length,
      resolved: tickets.filter((t) => t.status === 'Resolved').length,
      closed: tickets.filter((t) => t.status === 'Closed').length,
    }),
    [tickets]
  );

  const handleStatusChange = (ticketId: string, newStatus: TicketStatus) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.ticket_id === ticketId
          ? { ...t, status: newStatus, updated_at: new Date().toISOString() }
          : t
      )
    );
  };

  const handleNewTicket = (ticket: Ticket) => {
    setTickets((prev) => [ticket, ...prev]);
    setSelectedTicketId(ticket.ticket_id);
    setShowNewTicket(false);
    setStatusFilter('all');
  };

  const handleUseAnswer = (text: string) => {
    setPendingAnswer(text);
    setTimeout(() => setPendingAnswer(undefined), 500);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} onLogout={handleLogout} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activePage={activePage} onNavigate={setActivePage} stats={stats} />

        <main className="flex flex-1 overflow-hidden">
          {activePage === 'dashboard' ? (
            <DashboardView tickets={tickets} />
          ) : (
            <>
              <TicketList
                tickets={filteredTickets}
                selectedTicketId={selectedTicketId}
                onSelect={setSelectedTicketId}
                statusFilter={statusFilter}
                onFilterChange={setStatusFilter}
                onNewTicket={() => setShowNewTicket(true)}
              />

              {selectedTicket && aiAnalysis ? (
                <>
                  <TicketDetail
                    key={selectedTicket.ticket_id}
                    ticket={selectedTicket}
                    comments={ticketComments}
                    onBack={() => setSelectedTicketId(null)}
                    onStatusChange={handleStatusChange}
                    pendingAnswer={pendingAnswer}
                  />
                  <AIAssistant
                    ticket={selectedTicket}
                    analysis={aiAnalysis}
                    allComments={allComments}
                    onUseAnswer={handleUseAnswer}
                  />
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 bg-gray-50">
                  <svg className="w-16 h-16 mb-4 text-gray-200" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  <p className="text-sm font-medium text-gray-500">Pilih ticket untuk melihat detail</p>
                  <p className="text-xs text-gray-400 mt-1">Klik ticket mana saja dari daftar di sebelah kiri</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {showNewTicket && (
        <NewTicketModal
          onClose={() => setShowNewTicket(false)}
          onSubmit={handleNewTicket}
          totalTickets={tickets.length}
        />
      )}
    </div>
  );
}
