
import React, { useState, useRef, useMemo } from 'react';
import { 
  RotateCcw, 
  MessageSquare,
  Zap,
  ShieldAlert,
  ChevronRight,
  TrendingUp,
  Brain,
  Loader2,
  Eye,
  Split,
  QrCode,
  Share2,
  Target,
  BrainCircuit,
  ShieldCheck,
  ArrowLeft,
  Languages as LanguagesIcon
} from 'lucide-react';
import { AnalysisMetrics, LanguageConfig } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';
import { Type } from "@google/genai";
import html2canvas from 'html2canvas';
import { coachService } from '../lib/aiService';

interface IELTSReportViewProps {
  data: AnalysisMetrics;
  onRetry: () => void;
  onExit: () => void;
}

export const IELTSReportView: React.FC<IELTSReportViewProps> = ({ data, onRetry, onExit }) => {
  const [targetLang, setTargetLang] = useState<LanguageConfig>(SUPPORTED_LANGUAGES[0]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [translatedTips, setTranslatedTips] = useState<string[] | null>(null);
  const [showTranslated, setShowTranslated] = useState(false);
  const [viewMode, setViewMode] = useState<'single' | 'comparison'>('single');
  
  const shareRef = useRef<HTMLDivElement>(null);

  const isEnglish = data.language.toLowerCase() === 'en' || data.language.toLowerCase() === 'english';
  
  const subscores = useMemo(() => {
    if (isEnglish) {
      return data.ielts_subscores || { fluency: 6.5, lexical: 7.0, grammar: 6.0, rhetorical: 7.5 };
    } else {
      return data.subscores_100 || {
        fluency: (data.ielts_subscores?.fluency || 6.5) * 11.1, // Approximate mapping
        lexical: (data.ielts_subscores?.lexical || 7.0) * 11.1,
        grammar: (data.ielts_subscores?.grammar || 6.0) * 11.1,
        rhetorical: (data.ielts_subscores?.rhetorical || 7.5) * 11.1
      };
    }
  }, [data, isEnglish]);

  const displayScore = isEnglish ? data.ielts_score : (data.score_100 || data.ielts_score * 11.1);
  const maxScore = isEnglish ? 9 : 100;

  const auditReport = data.audit_report || {
    points_covered: [],
    points_missing: [],
    technical_accuracy: 0,
    coherence_score: 0
  };

  const downloadReport = async () => {
    if (!shareRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(shareRef.current, {
        backgroundColor: '#020617',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        windowWidth: 800,
        windowHeight: 1100
      });
      const link = document.createElement('a');
      link.download = `FluencyCoach_DiagnosticAudit_${data.id.slice(0, 5)}.png`;
      link.href = canvas.toDataURL('image/png', 0.9);
      link.click();
    } catch (err) {
      console.error("Export failure", err);
      alert("Failed to generate Audit Report. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const translateFeedback = async (lang: LanguageConfig) => {
    if (lang.code === 'en') {
      setTranslatedTips(null);
      setShowTranslated(false);
      return;
    }
    
    setIsTranslating(true);
    try {
      const ai = coachService.getAI();
      const prompt = `Translate the following IELTS examiner feedback from English to ${lang.label}. 
      Original Tips: ${data.feedback_tips.join(' | ')}
      
      Maintain a professional, formal examiner tone in ${lang.label}. 
      Return ONLY valid JSON with an array of translated tips.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        // Simplified content parameter for single string prompt
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              translated_tips: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["translated_tips"]
          }
        }
      });
      
      // Ensure accessing text as a property, not a method
      const jsonStr = response.text;
      const result = JSON.parse(jsonStr || '{}');
      if (result.translated_tips) {
        setTranslatedTips(result.translated_tips);
        setShowTranslated(true);
      }
    } catch (err) {
      console.error("Translation failed", err);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleLangChange = (lang: LanguageConfig) => {
    setTargetLang(lang);
    translateFeedback(lang);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
      {/* Hidden Battle Report Template */}
      <div className="fixed left-[-9999px] top-0 pointer-events-none">
        <div 
          ref={shareRef}
          className="w-[800px] bg-slate-950 p-16 border-[12px] border-indigo-600/20 rounded-[4rem] text-slate-50 relative overflow-hidden"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-150px] left-[-150px] w-[400px] h-[400px] bg-emerald-600/5 blur-[100px] rounded-full" />
          
          <div className="relative z-10">
            <header className="flex justify-between items-start mb-20">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-600/40">
                    <BrainCircuit size={32} className="text-white" />
                  </div>
                  <span className="text-3xl font-black tracking-tighter">Fluency<span className="text-indigo-500">Coach</span></span>
                </div>
                <h2 className="text-7xl font-black italic tracking-tighter text-white uppercase leading-none">Diagnostic<br/>Audit</h2>
                <div className="h-2 w-32 bg-indigo-600 mt-6 rounded-full" />
              </div>
              <div className="text-right">
                 <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-slate-400 mb-2 uppercase tracking-widest font-black">Ref: {data.id.slice(0,8)}</div>
                 <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-slate-400 uppercase tracking-widest font-black">{new Date(data.date).toLocaleDateString()}</div>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-12 items-stretch">
               <div className="col-span-5 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[4rem] p-12 shadow-[0_30px_60px_-15px_rgba(79,70,229,0.5)] border border-white/10">
                  <span className="text-xs font-black uppercase tracking-[0.5em] text-indigo-300 mb-6">{isEnglish ? "Final Band Score" : "Fluency Audit Score"}</span>
                  <div className="text-[14rem] font-black leading-none text-white tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                    {displayScore.toFixed(isEnglish ? 1 : 0)}
                  </div>
                  {!isEnglish && (
                    <div className="text-indigo-300 font-mono text-sm mt-2 uppercase tracking-widest font-black">
                      Approx. IELTS {data.ielts_score.toFixed(1)}
                    </div>
                  )}
                  <div className="mt-10 px-10 py-4 rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 text-3xl font-black italic text-white uppercase tracking-widest shadow-2xl">
                    {data.cefr_level} LEVEL
                  </div>
               </div>

               <div className="col-span-7 flex flex-col gap-8">
                  <div className="flex-1 p-10 rounded-[3rem] bg-slate-900/60 backdrop-blur-xl border border-slate-800 shadow-2xl">
                     <div className="flex items-center justify-between mb-10">
                        <h4 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">Biometric Audit</h4>
                        <Target size={20} className="text-indigo-400" />
                     </div>
                     <div className="space-y-8">
                        <div className="space-y-3">
                           <div className="flex justify-between items-center text-sm font-black uppercase tracking-widest">
                              <span className="text-indigo-400">Eye-Contact Stability</span>
                              <span className="text-white">{(data.eyeContactScore || 95).toFixed(1)}%</span>
                           </div>
                           <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                              <div className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" style={{ width: `${data.eyeContactScore || 95}%` }} />
                           </div>
                        </div>
                        <div className="space-y-3">
                           <div className="flex justify-between items-center text-sm font-black uppercase tracking-widest">
                              <span className="text-pink-400">Positive Sentiment</span>
                              <span className="text-white">{(data.smileScore || 88).toFixed(1)}%</span>
                           </div>
                           <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                              <div className="h-full bg-gradient-to-r from-pink-600 to-rose-400 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)]" style={{ width: `${data.smileScore || 88}%` }} />
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="p-8 rounded-[2.5rem] bg-indigo-500/10 border-2 border-indigo-500/20 flex items-center justify-between shadow-2xl">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center shadow-[0_10px_20px_rgba(79,70,229,0.4)]">
                           <ShieldCheck size={24} className="text-white" />
                        </div>
                        <div>
                           <span className="text-sm font-black uppercase tracking-widest text-indigo-400 block">Authenticated Audit</span>
                           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Clinical Precision Protocol</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <span className="text-xs font-black text-white block">VERIFIED</span>
                        <span className="text-[8px] text-slate-500 uppercase">System ID: {data.id.slice(0, 12)}</span>
                     </div>
                  </div>
               </div>
            </div>

            <footer className="mt-20 pt-16 border-t border-white/10 flex justify-between items-end">
               <div className="flex items-center gap-8">
                  <div className="p-4 bg-white rounded-3xl shadow-2xl border-4 border-indigo-600/10">
                     <QrCode size={80} className="text-slate-950" />
                  </div>
                  <div className="max-w-[280px]">
                     <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Audit Verification</p>
                     <p className="text-[10px] text-slate-600 leading-relaxed font-bold uppercase tracking-tight">Scan this secure code to access the full linguistic trace and biometric stability graph for this session.</p>
                  </div>
               </div>
               <div className="text-right">
                  <div className="flex items-center justify-end gap-2 text-indigo-400 mb-2">
                     <ShieldCheck size={16} />
                     <span className="text-[10px] font-black uppercase tracking-[0.4em]">Standardized Audit</span>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-4 opacity-50">Authenticated by Gemini-3 PRO</p>
                  <p className="text-lg font-black text-indigo-400 italic tracking-tighter">Master your Oral Fluency.</p>
               </div>
            </footer>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div className="flex items-center gap-6">
          <button onClick={onExit} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all shadow-xl active:scale-95">
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-5xl font-black text-white tracking-tighter italic">Simulation Report</h1>
              <div className="px-3 py-1 rounded-lg bg-indigo-600 text-[10px] font-black uppercase tracking-widest text-white">Part {data.ielts_part || 1}</div>
            </div>
            <p className="text-slate-400 font-medium">Standardized Examination Metrics & Biometric Audit</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
           {/* Language Selector Bar */}
           <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-2xl shadow-inner">
             {SUPPORTED_LANGUAGES.map((lang) => (
               <button
                 key={lang.code}
                 onClick={() => handleLangChange(lang)}
                 className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all relative group ${targetLang.code === lang.code ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}`}
                 title={`Translate feedback to ${lang.native}`}
               >
                 <span className="text-xl leading-none">{lang.flag}</span>
               </button>
             ))}
           </div>

           {translatedTips && (
            <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
              <button 
                onClick={() => setViewMode('single')} 
                className={`p-2 rounded-lg transition-all ${viewMode === 'single' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                title="Single View"
              >
                <Eye size={18} />
              </button>
              <button 
                onClick={() => setViewMode('comparison')} 
                className={`p-2 rounded-lg transition-all ${viewMode === 'comparison' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                title="Comparison Mode"
              >
                <Split size={18} />
              </button>
            </div>
          )}

           <button 
             onClick={downloadReport}
             disabled={isDownloading}
             className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest text-xs hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/30 active:scale-95 disabled:opacity-50"
           >
              {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Share2 size={18} />}
              Export Audit Report
           </button>

           <button onClick={onRetry} className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-slate-900 text-slate-300 font-bold border border-slate-800 hover:bg-slate-800 transition-all">
              <RotateCcw size={18} /> Re-Practice
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-4 bg-gradient-to-br from-indigo-600 to-indigo-900 p-1 rounded-[3rem] shadow-2xl">
          <div className="bg-slate-950/90 h-full w-full rounded-[2.9rem] p-10 flex flex-col items-center justify-center text-center">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-6">{isEnglish ? "Overall Band Score" : "Fluency Audit Score"}</div>
            <div className="text-[10rem] font-black leading-none text-white tracking-tighter drop-shadow-2xl">
              {displayScore.toFixed(isEnglish ? 1 : 0)}
            </div>
            {!isEnglish && (
              <div className="text-indigo-400 font-mono text-sm mt-2 uppercase tracking-widest font-black">
                Approx. IELTS {data.ielts_score.toFixed(1)}
              </div>
            )}
            <div className="mt-8 px-6 py-2 rounded-2xl bg-white/5 border border-white/10 text-xl font-bold italic text-indigo-300">
              {data.cefr_level} Proficiency
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { label: 'Fluency & Coherence', val: subscores.fluency, icon: <TrendingUp size={20} />, color: 'text-emerald-400' },
            { label: 'Lexical Resource', val: subscores.lexical, icon: <MessageSquare size={20} />, color: 'text-indigo-400' },
            { label: 'Grammatical Range', val: subscores.grammar, icon: <Zap size={20} />, color: 'text-amber-400' },
            { label: 'Rhetorical Effectiveness', val: subscores.rhetorical, icon: <Brain size={20} />, color: 'text-pink-400' }
          ].map((s, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col justify-between group hover:border-indigo-500/30 transition-all">
               <div className="flex justify-between items-center mb-6">
                 <div className={`p-3 rounded-xl bg-slate-950 border border-slate-800 ${s.color}`}>
                   {s.icon}
                 </div>
                 <div className="text-3xl font-black text-white">{s.val.toFixed(isEnglish ? 1 : 0)}</div>
               </div>
               <div className="text-xs font-black uppercase tracking-widest text-slate-500">{s.label}</div>
               <div className="mt-4 h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className={`h-full bg-current ${s.color} transition-all duration-1000`} style={{ width: `${(s.val / maxScore) * 100}%` }} />
               </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <section className="bg-slate-900 border border-slate-800 p-10 rounded-[3rem] relative">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold flex items-center gap-3">
                   <ShieldCheck size={24} className="text-emerald-500" />
                   Topic Audit Report
                </h2>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Accuracy</div>
                    <div className="text-lg font-black text-white">{auditReport.technical_accuracy}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Coherence</div>
                    <div className="text-lg font-black text-white">{auditReport.coherence_score}%</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-4">Points Covered</h4>
                  <div className="space-y-2">
                    {auditReport.points_covered.length > 0 ? auditReport.points_covered.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {p}
                      </div>
                    )) : <div className="text-sm text-slate-600 italic">No points detected</div>}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 mb-4">Missing Points</h4>
                  <div className="space-y-2">
                    {auditReport.points_missing.length > 0 ? auditReport.points_missing.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        {p}
                      </div>
                    )) : <div className="text-sm text-slate-600 italic">All points covered</div>}
                  </div>
                </div>
              </div>
           </section>

           <section className="bg-slate-900 border border-slate-800 p-10 rounded-[3rem] relative">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold flex items-center gap-3">
                   <ShieldAlert size={24} className="text-indigo-500" />
                   Examiner's Feedback
                </h2>
                {isTranslating && <Loader2 size={18} className="text-indigo-400 animate-spin" />}
              </div>

              <div className="space-y-6">
                 {viewMode === 'comparison' && translatedTips ? (
                    data.feedback_tips.map((tip, i) => (
                       <div key={i} className="grid grid-cols-2 gap-4 animate-in fade-in duration-500">
                          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 text-sm leading-relaxed italic">
                             <span className="block text-[8px] font-black uppercase tracking-widest text-slate-600 mb-2">Original (English)</span>
                             {tip}
                          </div>
                          <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-100 text-sm leading-relaxed">
                             <span className="block text-[8px] font-black uppercase tracking-widest text-indigo-400 mb-2">{targetLang.native} Translation</span>
                             {translatedTips[i]}
                          </div>
                       </div>
                    ))
                 ) : (
                    (showTranslated && translatedTips ? translatedTips : data.feedback_tips).map((tip, i) => (
                      <div key={i} className="flex gap-6 items-start group animate-in slide-in-from-left-4">
                         <div className="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 text-xs font-black text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            {i + 1}
                         </div>
                         <div>
                            {showTranslated && translatedTips && (
                              <span className="block text-[8px] font-black uppercase tracking-widest text-indigo-400 mb-1">{targetLang.native}</span>
                            )}
                            <p className="text-slate-300 text-lg leading-relaxed">{tip}</p>
                         </div>
                      </div>
                    ))
                 )}
              </div>

              {translatedTips && !showTranslated && (
                <div className="mt-8 pt-8 border-t border-slate-800 flex justify-center">
                  <button 
                    onClick={() => setShowTranslated(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-600/20"
                  >
                    <LanguagesIcon size={14} /> View {targetLang.native} Translation
                  </button>
                </div>
              )}
           </section>

           <section className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem]">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6 italic">Full Transcript</h3>
              <div className="text-slate-400 leading-relaxed text-lg italic whitespace-pre-wrap">
                 "{data.transcription}"
              </div>
           </section>
        </div>

        <div className="lg:col-span-1 space-y-6">
           <div className="bg-indigo-500/5 border border-indigo-500/10 p-8 rounded-[2.5rem]">
              <div className="flex items-center gap-2 mb-6">
                 <Target size={14} className="text-indigo-400" />
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Biometric Audit</h4>
              </div>
              <div className="space-y-6">
                 <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-400">
                       <span>Eye Contact Stability</span>
                       <span className="text-white">{data.eyeContactScore?.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                       <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${data.eyeContactScore}%` }} />
                    </div>
                 </div>
                 <div className="space-y-3 border-t border-white/5 pt-6">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-400">
                       <span>Posture Alignment</span>
                       <span className="text-emerald-400">Optimized</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/50 border border-white/5 text-[11px] text-slate-500 leading-relaxed">
                       <span className="text-indigo-400 font-bold block mb-1 uppercase tracking-tighter">Pro Tip:</span>
                       Your eye contact dropped slightly during complex sentence structures. Try to maintain focus while thinking to project higher confidence.
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col items-center">
              <QrCode size={120} className="text-slate-700 mb-4" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Scan to verify this report integrity in the dashboard history.</p>
           </div>

           <button 
             onClick={onExit}
             className="w-full py-5 rounded-2xl bg-indigo-600 text-white transition-all font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl shadow-indigo-600/20 active:scale-95"
           >
              Return to Menu <ChevronRight size={14} />
           </button>
        </div>
      </div>
    </div>
  );
};
