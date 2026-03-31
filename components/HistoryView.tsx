
import React, { useEffect, useState } from 'react';
import { 
  Clock, 
  ArrowLeft, 
  Trash2,
  MessageSquare,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { AnalysisMetrics } from '../types';
import { StorageService } from '../services/storage';
import { useAuth } from '../hooks/useAuth';

interface HistoryViewProps {
  onBack: () => void;
  onSelectSession: (session: AnalysisMetrics) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onBack, onSelectSession }) => {
  const { user } = useAuth();
  const [history, setHistory] = useState<AnalysisMetrics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      setLoading(true);
      const data = await StorageService.getHistory(user.uid);
      setHistory(data);
      setLoading(false);
    };
    fetchHistory();
  }, [user]);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!window.confirm("Permanently delete this report from local storage?")) return;
    await StorageService.deleteSession(id);
    setHistory(prev => prev.filter(s => s.id !== id));
  };

  const filteredHistory = history;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans p-6 md:p-12 animate-in fade-in duration-700">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></button>
            <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">User history</h1>
          </div>
          <div className="flex items-center gap-4">
            {history.length > 0 && (
              <button 
                onClick={async () => {
                  if (user && window.confirm("Are you sure you want to clear ALL session history? This cannot be undone.")) {
                    await StorageService.clearHistory(user.uid);
                    setHistory([]);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-sm font-bold text-rose-400 hover:bg-rose-500/20 transition-all"
              >
                <Trash2 size={16} /> Clear All
              </button>
            )}
            <div className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-2xl flex items-center gap-4">
               <div className="text-left">
                  <span className="text-[10px] block font-black text-slate-500 uppercase tracking-widest">Active User</span>
                  <span className="text-sm font-bold text-white">{user?.displayName}</span>
               </div>
            </div>
          </div>
        </header>

        <div className="mb-10 p-5 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex items-start gap-4 shadow-xl">
           <AlertTriangle className="text-emerald-500 shrink-0 mt-0.5" size={20} />
           <div>
              <h4 className="text-xs font-black uppercase text-emerald-500 mb-1">Local Identity Protection Active</h4>
              <p className="text-sm text-slate-400">Reports are stored securely in your browser's IndexedDB. No linguistic data is stored in the cloud.</p>
           </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 size={40} className="text-indigo-400 animate-spin mb-4" />
            <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Accessing Private Cluster...</p>
          </div>
        ) : filteredHistory.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredHistory.map((session) => (
              <div key={session.id} onClick={() => onSelectSession(session)} className="bg-slate-900/40 border border-slate-800 hover:border-indigo-500 p-8 rounded-[2.5rem] transition-all cursor-pointer group relative overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <div className="px-3 py-1 rounded-full bg-slate-950 text-[10px] font-black uppercase text-slate-400 flex items-center gap-2">
                        <Clock size={12} className="text-indigo-400" /> {new Date(session.date).toLocaleDateString()}
                      </div>
                      <div className="px-3 py-1 rounded-full bg-indigo-500/10 text-[10px] font-black uppercase text-indigo-400">{session.emotion}</div>
                    </div>
                    <h3 className="text-slate-200 text-lg md:text-xl font-medium line-clamp-1 italic mb-6">"{session.transcription}"</h3>
                    <div className="flex gap-8">
                       <div>
                          <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Band Score</span>
                          <span className="text-2xl font-black text-white">{session.ielts_score.toFixed(1)}</span>
                       </div>
                       <div>
                          <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">WPM</span>
                          <span className="text-2xl font-black text-white">{session.wpm}</span>
                       </div>
                    </div>
                  </div>
                  <button onClick={(e) => handleDelete(e, session.id)} className="p-3 rounded-2xl text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 transition-all absolute top-0 right-0"><Trash2 size={20} /></button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-slate-900/20 border border-slate-800 border-dashed rounded-[3rem]">
            <MessageSquare size={40} className="text-slate-700 mb-6" />
            <h2 className="text-2xl font-bold text-slate-400 mb-2">User history is Empty</h2>
            <p className="text-slate-500 text-sm mb-6">Complete a practice session to start building your linguistic history.</p>
            <button onClick={onBack} className="px-8 py-3 rounded-2xl bg-indigo-600 text-white font-bold mt-4 shadow-xl shadow-indigo-600/20 active:scale-95">Record First Session</button>
          </div>
        )}
      </div>
    </div>
  );
};
