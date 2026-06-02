export function getRelativeTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date('2026-08-01T12:00:00'); // fixed "now" for dummy data
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 60) return `${mins} menit lalu`;
  if (hours < 24) {
    const h = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    return h;
  }
  if (days === 1) return 'Kemarin';
  if (days < 7) return `${days} hari lalu`;
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}

export function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

export function formatDateTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' ' + date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

const avatarColors = [
  'bg-violet-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500',
  'bg-pink-500', 'bg-teal-500', 'bg-red-500', 'bg-indigo-500',
  'bg-amber-500', 'bg-cyan-500', 'bg-emerald-500', 'bg-rose-500',
];

export function getAvatarColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Open': return 'bg-blue-100 text-blue-700';
    case 'In Progress': return 'bg-orange-100 text-orange-700';
    case 'Resolved': return 'bg-green-100 text-green-700';
    case 'Closed': return 'bg-gray-100 text-gray-600';
    default: return 'bg-gray-100 text-gray-600';
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'Critical': return 'bg-red-100 text-red-700';
    case 'High': return 'bg-red-50 text-red-600';
    case 'Medium': return 'bg-orange-100 text-orange-600';
    case 'Low': return 'bg-blue-100 text-blue-600';
    default: return 'bg-gray-100 text-gray-600';
  }
}

export function getPriorityDotColor(priority: string): string {
  switch (priority) {
    case 'Critical': return 'bg-red-600';
    case 'High': return 'bg-red-500';
    case 'Medium': return 'bg-orange-400';
    case 'Low': return 'bg-blue-400';
    default: return 'bg-gray-400';
  }
}

export function generateTicketId(total: number): string {
  return `HD-${1025 + total}`;
}
