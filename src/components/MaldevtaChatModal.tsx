'use client';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MaldevtaChatModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 flex flex-col" style={{ height: '90vh' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0">
          <h2 className="font-semibold text-gray-900 text-sm">Tanya AI Assistant (Maldevta)</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat Embed — fills remaining space */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src="https://maldevta.com/embed?projectId=prj_1771551361146_poxgbm562&embedToken=prj_1771551361146_poxgbm562"
            width="100%"
            height="100%"
            allow="microphone"
            style={{ border: 'none', display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
}
