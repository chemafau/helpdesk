'use client';

import { useState } from 'react';
import { Ticket, AIAnalysis } from '@/types';
import { getStatusColor } from '@/lib/utils';

type Props = {
  ticket: Ticket;
  analysis: AIAnalysis;
  onUseAnswer?: (text: string) => void;
};

export default function AIAssistant({ ticket, analysis, onUseAnswer }: Props) {
  const [copied, setCopied] = useState(false);
  const [showFullAnswer, setShowFullAnswer] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(analysis.recommendedAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUseAnswer = () => {
    onUseAnswer?.(analysis.recommendedAnswer);
  };

  const answerLines = analysis.recommendedAnswer.split('\n');
  const previewLines = answerLines.slice(0, 4);
  const hasMore = answerLines.length > 4;

  return (
    <div className="w-80 xl:w-96 flex-shrink-0 bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 text-white">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
          </svg>
          <span className="text-sm font-semibold">AI Assistant (Maldevta)</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="text-white/80 hover:text-white text-xs font-medium bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition-colors">
            New Ask
          </button>
          <button className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Ask button */}
        <div className="px-4 pt-4 pb-3">
          <button className="w-full flex items-center justify-center gap-2 bg-violet-600 text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-violet-700 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Tanyakan ke AI
          </button>
        </div>

        {/* AI Summary */}
        <Section title="Ringkasan AI">
          <p className="text-xs text-gray-500 leading-relaxed">
            AI menganalisis ticket <span className="font-semibold text-gray-700">{ticket.ticket_id}</span> ini berdasarkan histori ticket serupa dan aturan (SOP) yang tersedia.
          </p>
        </Section>

        {/* Possible Causes */}
        <Section title="Kemungkinan Penyebab">
          <ul className="space-y-1.5">
            {analysis.possibleCauses.map((cause, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                {cause}
              </li>
            ))}
          </ul>
        </Section>

        {/* Recommended Answer */}
        <Section title="Rekomendasi Jawaban untuk User">
          <div className="bg-violet-50 border border-violet-100 rounded-xl p-3 mb-3">
            <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
              {showFullAnswer
                ? analysis.recommendedAnswer
                : previewLines.join('\n') + (hasMore ? '...' : '')}
            </p>
            {hasMore && (
              <button
                onClick={() => setShowFullAnswer((v) => !v)}
                className="text-xs text-violet-600 font-medium mt-1.5 hover:underline"
              >
                {showFullAnswer ? 'Tampilkan lebih sedikit' : 'Tampilkan selengkapnya'}
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-gray-600 border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Tersalin!
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                  Salin Jawaban
                </>
              )}
            </button>
            <button
              onClick={handleUseAnswer}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-violet-600 py-2 rounded-lg hover:bg-violet-700 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
              Gunakan Jawaban
            </button>
          </div>
        </Section>

        {/* Similar Tickets */}
        {analysis.similarTickets.length > 0 && (
          <Section
            title="Ticket Serupa"
            action={<button className="text-xs text-violet-600 font-medium hover:underline">Lihat semua</button>}
          >
            <div className="space-y-2">
              {analysis.similarTickets.map((t) => (
                <div key={t.ticket_id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-semibold text-gray-500 flex-shrink-0">{t.ticket_id}</span>
                    <span className="text-xs text-gray-600 truncate">{t.title}</span>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${getStatusColor(t.status)}`}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Related SOPs */}
        {analysis.relatedSOPs.length > 0 && (
          <Section
            title="SOP / Rules Terkait"
            action={<button className="text-xs text-violet-600 font-medium hover:underline">Lihat semua</button>}
          >
            <div className="space-y-2">
              {analysis.relatedSOPs.map((sop) => (
                <div key={sop.id} className="flex items-start gap-2">
                  <span className="text-[10px] font-semibold text-violet-500 bg-violet-50 px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">
                    SOP-{String(sop.id).padStart(3, '0')}
                  </span>
                  <span className="text-xs text-gray-600">{sop.title}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        <div className="h-4" />
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="px-4 py-3 border-t border-gray-100">
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="text-xs font-semibold text-gray-700">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}
