'use client';

import { useMemo } from 'react';
import { Ticket } from '@/types';

type Props = {
  tickets: Ticket[];
};

const categoryColors: Record<string, string> = {
  Login: 'bg-violet-500',
  Database: 'bg-blue-500',
  Application: 'bg-indigo-500',
  Network: 'bg-cyan-500',
  Hardware: 'bg-orange-500',
  Email: 'bg-pink-500',
  Access: 'bg-green-500',
  Performance: 'bg-red-500',
};

export default function Dashboard({ tickets }: Props) {
  const stats = useMemo(() => {
    const total = tickets.length;
    const solved = tickets.filter((t) => t.status === 'Resolved' || t.status === 'Closed').length;
    const open = tickets.filter((t) => t.status === 'Open').length;
    const inProgress = tickets.filter((t) => t.status === 'In Progress').length;
    return { total, solved, open, inProgress };
  }, [tickets]);

  const categoryStats = useMemo(() => {
    const map: Record<string, number> = {};
    tickets.forEach((t) => {
      map[t.category] = (map[t.category] ?? 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [tickets]);

  const maxCount = Math.max(...categoryStats.map(([, c]) => c));

  const recentTickets = useMemo(
    () => [...tickets].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5),
    [tickets]
  );

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Tickets"
          value={stats.total}
          icon={<IconTicket />}
          bg="bg-violet-600"
        />
        <StatCard
          label="Total Solved"
          value={stats.solved}
          icon={<IconCheck />}
          bg="bg-green-500"
        />
        <StatCard
          label="Menunggu (Open)"
          value={stats.open}
          icon={<IconClock />}
          bg="bg-orange-500"
        />
        <StatCard
          label="In Progress"
          value={stats.inProgress}
          icon={<IconSpinner />}
          bg="bg-blue-500"
        />
      </div>

      {/* Chart + Info */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Bar Chart */}
        <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Ticket per Kategori</h2>
          <div className="flex items-end gap-3 h-40">
            {categoryStats.map(([cat, count]) => (
              <div key={cat} className="flex flex-col items-center gap-1.5 flex-1">
                <span className="text-xs font-semibold text-gray-600">{count}</span>
                <div
                  className={`w-full rounded-t-lg ${categoryColors[cat] ?? 'bg-gray-400'} transition-all`}
                  style={{ height: `${(count / maxCount) * 100}%`, minHeight: '8px' }}
                />
                <span className="text-[10px] text-gray-400 text-center leading-tight">{cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Team */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex-1">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">Tim Helpdesk</h2>
            <div className="flex justify-around">
              <TeamItem icon={<IconHeadset />} count={3} label="Technical Support" color="text-violet-600" />
              <TeamItem icon={<IconWrench />} count={4} label="Operation Team" color="text-blue-500" />
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Customer Feedback</h2>
            <div className="flex items-center gap-1 mb-1">
              {[1, 2, 3, 4].map((i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg className="w-5 h-5 text-yellow-200" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-xs text-gray-400">4.0 / 5.0 rata-rata rating</p>
          </div>
        </div>
      </div>

      {/* Recent Tickets Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Ticket Terbaru</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-100">
              <th className="text-xs font-semibold text-gray-400 pb-2 pr-4">ID</th>
              <th className="text-xs font-semibold text-gray-400 pb-2 pr-4">Judul</th>
              <th className="text-xs font-semibold text-gray-400 pb-2 pr-4">Kategori</th>
              <th className="text-xs font-semibold text-gray-400 pb-2 pr-4">Prioritas</th>
              <th className="text-xs font-semibold text-gray-400 pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentTickets.map((t) => (
              <tr key={t.ticket_id} className="border-b border-gray-50 last:border-0">
                <td className="py-2.5 pr-4 text-xs font-semibold text-violet-600">{t.ticket_id}</td>
                <td className="py-2.5 pr-4 text-sm text-gray-700 max-w-xs truncate">{t.title}</td>
                <td className="py-2.5 pr-4">
                  <span className="text-xs text-gray-500">{t.category}</span>
                </td>
                <td className="py-2.5 pr-4">
                  <span className={`text-xs font-medium ${priorityColor(t.priority)}`}>{t.priority}</span>
                </td>
                <td className="py-2.5">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColor(t.status)}`}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, bg }: { label: string; value: number; icon: React.ReactNode; bg: string }) {
  return (
    <div className={`${bg} rounded-2xl p-5 text-white shadow-sm`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-white/80">{label}</p>
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  );
}

function TeamItem({ icon, count, label, color }: { icon: React.ReactNode; count: number; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <p className={`text-xl font-bold ${color}`}>{count}</p>
      <p className="text-xs text-gray-400 text-center">{label}</p>
    </div>
  );
}

function priorityColor(p: string) {
  switch (p) {
    case 'Critical': return 'text-red-600';
    case 'High': return 'text-orange-500';
    case 'Medium': return 'text-yellow-500';
    default: return 'text-blue-500';
  }
}

function statusColor(s: string) {
  switch (s) {
    case 'Open': return 'bg-blue-100 text-blue-700';
    case 'In Progress': return 'bg-orange-100 text-orange-700';
    case 'Resolved': return 'bg-green-100 text-green-700';
    default: return 'bg-gray-100 text-gray-600';
  }
}

function IconTicket() {
  return (
    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconSpinner() {
  return (
    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  );
}

function IconHeadset() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
  );
}

function IconWrench() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  );
}
