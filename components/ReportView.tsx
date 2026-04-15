
import React, { useState, useMemo } from 'react';
import { 
  MessageSquare, 
  Timer, 
  RefreshCw, 
  ArrowLeft,
  Quote,
  Activity,
  Award,
  Star,
  Brain,
  Info,
  Loader2,
  Zap,
  Waves,
  Heart,
  Sparkles,
  ShieldCheck,
  Split,
  Eye,
  Languages as LanguagesIcon
} from 'lucide-react';
import { AnalysisMetrics, LanguageConfig } from '../types';
import { SUPPORTED_LANGUAGES, COACHING_CONTEXTS } from '../constants';
import { GoogleGenAI, Type } from "@google/genai";
import { coachService } from '../lib/aiService';

interface ReportViewProps {
  data: AnalysisMetrics;
  onRestart: () => void;
}

interface TranslatedContent {
  tips: string[];
  explanation: string;
  emotion: string;
}

export const ReportView: React.FC<ReportViewProps> = ({ data, onRestart }) => {
  const [targetLang, setTargetLang] = useState<LanguageConfig>(
    SUPPORTED_LANGUAGES.find(l => l.code === data.language) || SUPPORTED_LANGUAGES[0]
  );
  const [isTranslating, setIsTranslating] = useState(false);
  const [translated, setTranslated] = useState<TranslatedContent | null>(null);
  const [viewMode, setViewMode] = useState<'comparison' | 'single'>('single');
  const [showTranslated, setShowTranslated] = useState(true);

  const emotionTheme = useMemo(() => {
    const norm = (data.emotion || "").toLowerCase();
    if (norm.includes('enthusiastic')) return { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', glow: 'shadow-emerald-500/10', icon: <Sparkles size={20} /> };
    if (norm.includes('confident')) return { color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', glow: 'shadow-indigo-500/10', icon: <Star size={20} /> };
    if (norm.includes('authoritative')) return { color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', glow: 'shadow-purple-500/10', icon: <Zap size={20} /> };
    if (norm.includes('hesitant') || norm.includes('cautious')) return { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', glow: 'shadow-amber-500/10', icon: <Activity size={20} /> };
    if (norm.includes('anxious')) return { color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', glow: 'shadow-rose-500/10', icon: <Heart size={20} /> };
    if (norm.includes('monotone')) return { color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20', glow: 'shadow-slate-500/10', icon: <Waves size={20} /> };
    return { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', glow: 'shadow-blue-500/10', icon: <Brain size={20} /> };
  }, [data.emotion]);

  const currentLanguage = SUPPORTED_LANGUAGES.find(l => l.code === data.language);
  const context = COACHING_CONTEXTS.find(c => c.id === data.context_id);

  const translateContent = async (lang: LanguageConfig) => {
    if (lang.code === data.language) {
      setTranslated(null);
      return;
    }
    setIsTranslating(true);
    try {
      const prompt = `Translate the following speech feedback from ${currentLanguage?.label} to ${lang.label}. 
      Maintain a professional, encouraging coaching tone.
      
      Original Emotion Category: ${data.emotion}
      Emotion Explanation: ${data.emotion_explanation}
      Actionable Tips: ${data.feedback_tips.join(' | ')}
      
      Return ONLY valid JSON.`;

      const ai = coachService.getAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{
          role: 'user',
          parts: [{ text: prompt }]
        }],
        config: {
          systemInstruction: "You are a professional IELTS Diagnostic Auditor. Translate the provided text into the target language precisely, maintaining the clinical and objective tone.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              emotion: { type: Type.STRING },
              explanation: { type: Type.STRING },
              tips: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["emotion", "explanation", "tips"]
          }
        }
      });
      
      const jsonStr = response.text?.trim();
      if (jsonStr) {
        setTranslated(JSON.parse(jsonStr));
        setShowTranslated(true);
      }
    } catch (err) {
      console.error("Translation failed", err);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleLanguageChange = (lang: LanguageConfig) => {
    setTargetLang(lang);
    translateContent(lang);
  };

  const isDifferentLang = targetLang.code !== data.language;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-4xl font-black text-white tracking-tight">Linguistic Audit</h1>
            <div className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg transition-all duration-500 ${emotionTheme.color} ${emotionTheme.bg} ${emotionTheme.border}`}>
              {emotionTheme.icon}
              {showTranslated && translated ? translated.emotion : data.emotion}
              <span className="ml-1 opacity-50 font-medium">({(data.emotion_confidence * 100).toFixed(0)}%)</span>
            </div>
          </div>
          <p className="text-slate-400">Professional benchmarking for {context?.label}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-2xl shadow-inner">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang)}
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all relative group ${targetLang.code === lang.code ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}`}
                title={`Translate to ${lang.native}`}
              >
                <span className="text-xl leading-none">{lang.flag}</span>
              </button>
            ))}
          </div>

          {translated && (
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

          <button onClick={onRestart} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 transition-all font-bold border border-slate-800 active:scale-[0.98] shadow-lg">
            <ArrowLeft size={18} /> Exit to Dashboard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] relative overflow-hidden group col-span-1 md:col-span-2 lg:col-span-1 bg-gradient-to-br from-indigo-600/10 via-slate-900 to-slate-900">
          <div className="text-indigo-400 mb-3 flex items-center gap-2">
            <ShieldCheck size={16} />
            <span className="text-[10px] uppercase tracking-[0.2em] font-black">IELTS Band Equivalent</span>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-6xl font-black mb-1 text-white tracking-tighter">{(data.ielts_score || 0).toFixed(1)}</div>
            <div className="text-xl font-bold text-slate-500">/ 9.0</div>
          </div>
          <div className="flex items-center gap-2 mt-2">
             <div className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-indigo-400">CEFR: {data.cefr_level || "N/A"}</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] group">
          <div className="text-slate-500 mb-3 flex items-center gap-2"><Timer size={16} /><span className="text-xs font-bold uppercase tracking-widest">Pace</span></div>
          <div className="text-4xl font-bold mb-1 text-white">{data.wpm}</div>
          <div className="text-sm text-slate-500 font-medium">Target: 130-150 WPM</div>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] group">
          <div className="text-slate-500 mb-3 flex items-center gap-2"><MessageSquare size={16} /><span className="text-xs font-bold uppercase tracking-widest">Filler Words</span></div>
          <div className={`text-4xl font-bold mb-1 ${data.filler_count > 4 ? 'text-rose-400' : 'text-emerald-400'}`}>{data.filler_count}</div>
          <div className="text-sm text-slate-500 font-medium">Linguistic artifacts</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] group">
          <div className="text-slate-500 mb-3 flex items-center gap-2"><RefreshCw size={16} /><span className="text-xs font-bold uppercase tracking-widest">Vocal Control</span></div>
          <div className="text-4xl font-bold mb-1 text-white">{(data.emotional_stability * 100).toFixed(0)}%</div>
          <div className="text-sm text-slate-500 font-medium">Stability Index</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <section className={`bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] relative overflow-hidden transition-all duration-300 ${isTranslating ? 'opacity-50' : 'opacity-100'}`}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <Brain size={20} className="text-pink-400" />
                Speech Analysis
              </h2>
              {isTranslating && <Loader2 size={18} className="text-indigo-400 animate-spin" />}
            </div>

            <div className="space-y-6 mb-8">
              {[
                { label: 'Energy', val: data.vocal_energy, color: 'from-pink-500 to-rose-400' },
                { label: 'Pitch Variation', val: data.pitch_range, color: 'from-indigo-500 to-blue-400' },
                { label: 'Consistency', val: data.emotional_stability, color: 'from-emerald-500 to-teal-400' }
              ].map((m, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span>{m.label}</span>
                    <span className="text-white">{(m.val * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                    <div className={`h-full bg-gradient-to-r ${m.color} transition-all duration-1000`} style={{ width: `${m.val * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Info size={16} className="text-indigo-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Contextual Insight</span>
                </div>
                {translated && isDifferentLang && (
                  <button 
                    onClick={() => setShowTranslated(!showTranslated)}
                    className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-indigo-600 text-white"
                  >
                    {showTranslated ? 'Original' : 'Translate'}
                  </button>
                )}
              </div>
              <p className="text-sm leading-relaxed text-slate-300 italic">
                {showTranslated && translated ? translated.explanation : data.emotion_explanation}
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 px-2 text-white">
              <Award size={20} className="text-indigo-400" />
              Strategic Coaching
            </h2>
            <div className="space-y-4">
              {viewMode === 'comparison' && translated ? (
                data.feedback_tips.map((tip, i) => (
                  <div key={i} className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 text-slate-400 text-xs leading-relaxed relative overflow-hidden">
                       <span className="block mb-2 text-[8px] font-black uppercase tracking-widest text-slate-600">{currentLanguage?.native} (Original)</span>
                       {tip}
                    </div>
                    <div className="p-5 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-100 text-xs leading-relaxed relative overflow-hidden">
                       <span className="block mb-2 text-[8px] font-black uppercase tracking-widest text-indigo-400">{targetLang.native} Translation</span>
                       {translated.tips[i]}
                    </div>
                  </div>
                ))
              ) : (
                (showTranslated && translated ? translated.tips : data.feedback_tips).map((tip, i) => (
                  <div key={i} className="p-5 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 text-slate-200 text-sm leading-relaxed relative overflow-hidden group">
                    <div className="absolute left-0 top-0 w-1.5 h-full bg-indigo-500/30 group-hover:bg-indigo-400 transition-all" />
                    <span className="block mb-1 text-[10px] font-black uppercase tracking-widest text-indigo-400/60">Insight #{i+1}</span>
                    {tip}
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-white">
              <Quote size={20} className="text-indigo-400" />
              Vocal Transcript
            </h2>
            <div className="p-12 rounded-[3.5rem] bg-slate-900/40 border border-slate-800 text-xl md:text-2xl leading-relaxed font-medium italic relative shadow-inner overflow-hidden min-h-[400px]">
              <div className="whitespace-pre-wrap relative z-10 text-slate-300">
                {data.transcription}
              </div>
              <div className="absolute bottom-8 right-8 text-[10px] font-black uppercase tracking-widest text-slate-600">
                Linguistic Scan Complete
              </div>
            </div>
            <div className="mt-6 p-5 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-4">
              <LanguagesIcon size={20} className="text-indigo-400 shrink-0" />
              <p className="text-xs text-indigo-300/80 font-medium leading-relaxed">
                Audited in <strong>{currentLanguage?.native}</strong>. 
                Use the target flag icons to generate real-time professional translations for all coaching insights and emotional breakdowns.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
