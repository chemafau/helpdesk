'use client';

type Props = {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onLogout?: () => void;
};

export default function Header({ searchQuery, onSearchChange, onLogout }: Props) {
  return (
    <header className="h-14 flex items-center gap-4 px-4 bg-white border-b border-gray-200 flex-shrink-0 z-10">
      {/* Logo */}
      <div className="flex items-center gap-2.5 w-56 flex-shrink-0">
        <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </div>
        <span className="font-semibold text-gray-900 text-sm">Helpdesk</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari ticket, kategori, atau keyword..."
            className="w-full h-9 pl-9 pr-16 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 placeholder:text-gray-400 transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium bg-gray-100 px-1.5 py-0.5 rounded">
            ⌘ K
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 ml-auto">
        {/* Notification */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        {/* Theme toggle */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* User */}
        <div className="flex items-center gap-2.5 pl-2 pr-1 py-1.5 rounded-lg">
          <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            A
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900 leading-tight">Admin</p>
            <p className="text-xs text-gray-500 leading-tight">Helpdesk Admin</p>
          </div>
        </div>

        {/* Logout */}
        {onLogout && (
          <button
            onClick={onLogout}
            title="Keluar"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}
