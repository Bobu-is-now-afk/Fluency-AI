
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Play, 
  Square, 
  Sparkles, 
  BrainCircuit, 
  History, 
  ChevronDown, 
  X, 
  AlertCircle,
  Loader2,
  ShieldCheck,
  Zap,
  BookOpen,
  Signal,
  BarChart2,
  Terminal,
  Briefcase,
  Coffee,
  Mic,
  ArrowLeft,
  Video
} from 'lucide-react';
import { AppState, AnalysisMetrics, CoachingContext, LanguageConfig, ArticleLevel } from './types';
import { COACHING_CONTEXTS, SUPPORTED_LANGUAGES, UPDATE_LOG, SAMPLE_ARTICLES, LEVEL_DESCRIPTIONS } from './constants';
import { useFaceMesh } from './hooks/useFaceMesh';
import { ZenOverlay } from './components/ZenOverlay';
import { ReportView } from './components/ReportView';
import { HistoryView } from './components/HistoryView';
import { IELTSSimulator } from './components/IELTSSimulator';
import { IELTSReportView } from './components/IELTSReportView';
import { processRecordingBlob } from './lib/mediaEngine';
import { StorageService } from './services/storage';
import { useAuth } from './hooks/useAuth';
import { coachService } from './lib/aiService';

const MAX_RECORDING_SECONDS = 60;

type PrepStage = 'context' | 'level' | 'preview';

const App: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [state, setState] = useState<AppState | 'logs'>('idle');
  const [prepStage, setPrepStage] = useState<PrepStage>('context');
  const [activeStream, setActiveStream] = useState<MediaStream | null>(null);
  const [selectedContext, setSelectedContext] = useState<CoachingContext>(COACHING_CONTEXTS[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageConfig>(SUPPORTED_LANGUAGES[0]);
  const [analysisData, setAnalysisData] = useState<AnalysisMetrics | null>(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isAiLoopActive, setIsAiLoopActive] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSampleArticle, setCurrentSampleArticle] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const isMountedRef = useRef<boolean>(true);
  const streamRef = useRef<MediaStream | null>(null);
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);

  const sessionMetricsRef = useRef({
    eyeContactSum: 0,
    smileSum: 0,
    frameCount: 0
  });

  const processAudioAnalysis = useCallback(async (audioBlob: Blob, duration: number, rawMimeType: string) => {
    try {
      const sanitizedMime = rawMimeType.split(';')[0];
      const base64Audio = await processRecordingBlob(audioBlob);

      const avgEyeContact = sessionMetricsRef.current.frameCount > 0 
        ? (sessionMetricsRef.current.eyeContactSum / sessionMetricsRef.current.frameCount) * 100 
        : 100;
      const avgSmile = sessionMetricsRef.current.frameCount > 0 
        ? (sessionMetricsRef.current.smileSum / sessionMetricsRef.current.frameCount) * 100 
        : 0;

      const result = await coachService.analyzeSpeech(base64Audio, sanitizedMime, {
        language: selectedLanguage.native,
        context: selectedContext.label,
        duration,
        eyeContact: avgEyeContact,
        smile: avgSmile,
        sampleArticle: currentSampleArticle
      });

      const enrichedResult: AnalysisMetrics = {
        ...(result as AnalysisMetrics),
        userId: user?.uid || 'anonymous',
        ielts_subscores: result.ielts_subscores || {
          fluency: result.ielts_score || 5.0,
          lexical: result.ielts_score || 5.0,
          grammar: result.ielts_score || 5.0,
          rhetorical: result.ielts_score || 5.0
        },
        subscores_100: result.subscores_100,
        score_100: result.score_100,
        audit_report: result.audit_report || {
          points_covered: [],
          points_missing: [],
          technical_accuracy: 0,
          coherence_score: 0
        },
        id: Math.random().toString(36).substring(2, 11),
        date: new Date().toISOString(),
        language: selectedLanguage.code,
        duration: Math.round(duration),
        context_id: selectedContext.id,
        proficiency_level: result.cefr_level || "N/A",
        filler_count: 0,
        pause_count: 0,
        eyeContactScore: avgEyeContact,
        smileScore: avgSmile
      };

      await StorageService.saveSession(enrichedResult);
      setAnalysisData(enrichedResult);
      setState('report');
    } catch (err) {
      console.error("Analysis Error:", err);
      setErrorMessage((err as Error).message || "The AI audit pipeline encountered an error. Please check your network and API Key.");
      setState('idle');
    }
  }, [user, selectedLanguage, selectedContext, currentSampleArticle]);
  
  const handleModelReady = useCallback(() => {
    setIsModelReady(true);
  }, []);

  const faceMetrics = useFaceMesh(
    videoRef, 
    canvasRef, 
    isAiLoopActive, 
    activeStream, 
    handleModelReady
  );

  useEffect(() => {
    if (state === 'recording' && isAiLoopActive && isModelReady && hasStarted) {
      sessionMetricsRef.current.eyeContactSum += faceMetrics.hasEyeContact ? 1 : 0;
      sessionMetricsRef.current.smileSum += faceMetrics.smileIntensity;
      sessionMetricsRef.current.frameCount += 1;
    }
  }, [faceMetrics, state, isAiLoopActive, isModelReady, hasStarted]);

  const stopAllHardware = useCallback(() => {
    setIsAiLoopActive(false);
    setIsModelReady(false);
    setHasStarted(false);
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        try { 
          track.stop(); 
          track.enabled = false; 
        } catch { /* ignore */ }
      });
      streamRef.current = null;
    }

    if (mediaRecorderRef.current) {
      if (mediaRecorderRef.current.state !== 'inactive') {
        try { mediaRecorderRef.current.stop(); } catch { /* ignore */ }
      }
      mediaRecorderRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.load();
    }
    
    setActiveStream(null);
  }, []);

  const initializeHardware = useCallback(async () => {
    if (state !== 'recording') return;

    try {
      setErrorMessage(null);
      stopAllHardware();
      await new Promise(r => setTimeout(r, 1200));

      const combinedStream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } 
      });

      if (!isMountedRef.current || state !== 'recording') {
        combinedStream.getTracks().forEach(t => t.stop());
        return;
      }

      streamRef.current = combinedStream;
      setActiveStream(combinedStream);

      if (videoRef.current) {
        videoRef.current.srcObject = combinedStream;
        await videoRef.current.play().catch(console.warn);
      }

      const aStream = new MediaStream(combinedStream.getAudioTracks());

      const mime = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/aac'].find(m => MediaRecorder.isTypeSupported(m));
      const recorder = new MediaRecorder(aStream, { mimeType: mime });
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      
      recorder.ondataavailable = (e) => { 
        if (e.data.size > 0) audioChunksRef.current.push(e.data); 
      };
      
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        if (audioBlob.size > 0) {
          const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
          processAudioAnalysis(audioBlob, duration, recorder.mimeType || 'audio/webm');
        }
      };

      await new Promise(r => setTimeout(r, 1000));
      setIsAiLoopActive(true);

    } catch (err) {
      console.error("Hardware Ignite Failed:", err);
      if (isMountedRef.current) {
        setErrorMessage((err as Error).message || "Media access denied. Please check site permissions.");
        setState('idle');
      }
    }
  }, [state, stopAllHardware, processAudioAnalysis]);

  const handleStartSession = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
      try {
        startTimeRef.current = Date.now();
        mediaRecorderRef.current.start(1000);
        setHasStarted(true);
      } catch (e) {
        console.error("Recorder fail", e);
      }
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    return () => { isMountedRef.current = false; stopAllHardware(); };
  }, [stopAllHardware]);

  useEffect(() => {
    if (state === 'recording') {
      const init = async () => {
        await initializeHardware();
      };
      init();
    } else {
      // Use setTimeout to avoid cascading render error
      setTimeout(() => stopAllHardware(), 0);
    }
  }, [state, initializeHardware, stopAllHardware]);

  const handleStopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      const recordingTimeVal = Math.round((Date.now() - startTimeRef.current) / 1000);
      
      mediaRecorderRef.current.onstop = () => {
        const recorder = mediaRecorderRef.current;
        if (!recorder) return;
        
        const audioBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        if (audioBlob.size > 0) {
          processAudioAnalysis(audioBlob, recordingTimeVal, recorder.mimeType || 'audio/webm');
        }
      };

      setState('processing');
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [processAudioAnalysis]);

  useEffect(() => {
    let interval: number;
    if (state === 'recording' && isAiLoopActive && isModelReady && hasStarted) {
      interval = window.setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= MAX_RECORDING_SECONDS) {
            handleStopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state, isAiLoopActive, isModelReady, hasStarted, handleStopRecording]);

  const handleCancelSession = () => {
    if (window.confirm("Cancel this practice session? Progress will not be saved.")) {
      setState('idle');
      stopAllHardware();
    }
  };

  const handleIELTSReport = async (data: AnalysisMetrics) => {
    const report = { ...data, userId: user?.uid || 'anonymous' };
    await StorageService.saveSession(report);
    setAnalysisData(report);
    setState('report');
  };

  const getContextIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase size={32} />;
      case 'Coffee': return <Coffee size={32} />;
      case 'Mic': return <Mic size={32} />;
      default: return <Sparkles size={32} />;
    }
  };

  const handleSelectSampleArticle = useCallback((level: ArticleLevel) => {
    const langCode = selectedLanguage.code;
    const articlesByLang = SAMPLE_ARTICLES[langCode] || SAMPLE_ARTICLES['en'];
    const articlesByContext = articlesByLang[selectedContext.id] || articlesByLang['interview'];
    const articlesByLevel = articlesByContext[level] || articlesByContext['beginner'];
    const randomIndex = Math.floor(Math.random() * articlesByLevel.length);
    const randomArticle = articlesByLevel[randomIndex];
    setCurrentSampleArticle(randomArticle);
    setPrepStage('preview');
  }, [selectedLanguage, selectedContext]);

  const startQuickSession = () => {
    setPrepStage('context');
    setCurrentSampleArticle(null);
    setState('quick-session-prep');
    sessionMetricsRef.current = { eyeContactSum: 0, smileSum: 0, frameCount: 0 };
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <Loader2 className="text-indigo-500 animate-spin mb-4" size={48} />
        <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Booting Audit Engine...</p>
      </div>
    );
  }

  if (state === 'ielts-sim') return <IELTSSimulator onReport={handleIELTSReport} onExit={() => setState('idle')} />;
  if (state === 'history') return <HistoryView onBack={() => setState('idle')} onSelectSession={(s) => { setAnalysisData(s); setState('report'); }} />;
  if (state === 'report' && analysisData) {
    if (analysisData.ielts_subscores) {
      return <IELTSReportView data={analysisData} onRetry={() => setState('ielts-sim')} onExit={() => setState('idle')} />;
    }
    return <ReportView data={analysisData} onRestart={() => setState('idle')} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col font-sans">
      <nav className="p-6 border-b border-slate-900 flex justify-between items-center backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setState('idle')}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <BrainCircuit size={24} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight leading-none">IELTS<span className="text-indigo-500">Audit</span></span>
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 mt-1">Diagnostic System Active</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setState('logs')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm font-medium text-slate-500 hover:text-white transition-all">
            <Terminal size={16} /> Update History
          </button>
          <button onClick={() => setState('ielts-sim')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-sm font-bold text-indigo-400 hover:bg-indigo-600/20 transition-all">
            <ShieldCheck size={16} /> IELTS Mode
          </button>
          <button onClick={() => setState('history')} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm font-medium text-slate-300 hover:text-white transition-all">
            <History size={16} /> User history
          </button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        {state === 'idle' && (
          <div className="max-w-2xl w-full text-center animate-in fade-in zoom-in duration-700">
            <div className="flex items-center justify-center gap-2 mb-4 bg-indigo-500/10 border border-indigo-500/20 w-fit mx-auto px-3 py-1 rounded-full">
              <ShieldCheck size={12} className="text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Professional Diagnostic Platform</span>
            </div>
            <h1 className="text-6xl font-extrabold mb-6 tracking-tighter text-white">IELTS <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Diagnostic Audit.</span></h1>
            <p className="text-slate-400 text-lg mb-12 max-w-lg mx-auto">Multimodal assessment with real-time biometric tracking and clinical diagnostic reports.</p>

            {errorMessage && (
              <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-sm font-bold flex items-center justify-center gap-2">
                <AlertCircle size={16} /> {errorMessage}
              </div>
            )}

             <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
               <button onClick={startQuickSession} className="group px-10 py-5 rounded-full bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all font-bold text-lg flex items-center gap-3 shadow-2xl active:scale-95">
                 <Play size={20} fill="currentColor" /> Quick Session
               </button>
               <button onClick={() => setState('ielts-sim')} className="group px-10 py-5 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all font-bold text-lg flex items-center gap-3 shadow-2xl shadow-indigo-500/30 active:scale-95 relative overflow-hidden">
                 <ShieldCheck size={20} /> IELTS (English)
               </button>
            </div>
          </div>
        )}

        {state === 'quick-session-prep' && (
          <div className="w-full h-full flex items-center justify-center relative">
            <button onClick={() => setState('idle')} className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all z-10">
              <ArrowLeft size={16} /> Exit to Dashboard
            </button>
            
            {prepStage === 'context' && (
              <div className="max-w-4xl w-full text-center animate-in fade-in zoom-in duration-500">
                <div className="mb-10">
                  <h2 className="text-4xl font-black text-white italic tracking-tight mb-2">Configure Practice Session</h2>
                </div>
                <div className="mb-10 flex flex-col items-center">
                  <div className="relative group w-full max-w-sm">
                    <button onClick={() => setShowLangMenu(!showLangMenu)} className="w-full bg-slate-900 border border-slate-800 p-5 rounded-[2rem] flex items-center justify-between hover:border-indigo-500/30 transition-all">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{selectedLanguage.flag}</span>
                        <div className="text-left">
                          <span className="text-[10px] block font-black text-slate-500 uppercase tracking-widest">Selected Language</span>
                          <span className="text-sm font-bold text-white uppercase tracking-widest">{selectedLanguage.native}</span>
                        </div>
                      </div>
                      <ChevronDown size={18} className={`text-slate-600 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
                    </button>
                    {showLangMenu && (
                      <div className="absolute top-full left-0 w-full mt-2 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl z-[60] py-2 max-h-72 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2">
                        {SUPPORTED_LANGUAGES.map((lang) => (
                          <button key={lang.code} onClick={() => { setSelectedLanguage(lang); setShowLangMenu(false); }} className={`w-full px-6 py-3 flex items-center gap-4 hover:bg-slate-800 text-left ${selectedLanguage.code === lang.code ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-300'}`}>
                            <span className="text-xl">{lang.flag}</span>
                            <span className="text-sm font-bold">{lang.native}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {COACHING_CONTEXTS.map((ctx) => (
                    <button 
                      key={ctx.id} 
                      onClick={() => setSelectedContext(ctx)}
                      className={`p-8 rounded-[2.5rem] bg-slate-900 border-2 transition-all flex flex-col items-center group relative overflow-hidden ${selectedContext.id === ctx.id ? 'border-indigo-500 bg-indigo-500/5 shadow-2xl shadow-indigo-500/10' : 'border-slate-800 hover:border-slate-700'}`}
                    >
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${selectedContext.id === ctx.id ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-500 group-hover:text-indigo-400'}`}>
                        {getContextIcon(ctx.icon)}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{ctx.label}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed text-center px-2">{ctx.description}</p>
                    </button>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => { setState('recording'); setHasStarted(false); }} className="px-10 py-5 rounded-full bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-all font-bold text-lg flex items-center gap-3 active:scale-95"><Play size={20} fill="currentColor" /> Freestyle Audit</button>
                  <button onClick={() => setPrepStage('level')} className="px-10 py-5 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all font-bold text-lg flex items-center gap-3 active:scale-95"><BookOpen size={20} /> Scripted Audit</button>
                </div>
              </div>
            )}
            {prepStage === 'level' && (
              <div className="max-w-4xl w-full text-center animate-in slide-in-from-right-8 duration-500">
                <div className="mb-10">
                  <h2 className="text-4xl font-black text-white italic mb-2">Select Difficulty</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {(Object.entries(LEVEL_DESCRIPTIONS) as unknown as [ArticleLevel, { label: string; sub: string; words: string }][]).map(([level, desc]) => (
                    <button key={level} onClick={() => handleSelectSampleArticle(level)} className="p-8 rounded-[2.5rem] bg-slate-900 border border-slate-800 hover:border-indigo-500 transition-all flex flex-col items-center shadow-xl active:scale-95">
                      <div className="w-14 h-14 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center mb-6">
                        {level === 'beginner' && <Signal size={24} className="text-emerald-500" />}
                        {level === 'intermediate' && <BarChart2 size={24} className="text-amber-500" />}
                        {level === 'advanced' && <Zap size={24} className="text-indigo-500" />}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 uppercase">{desc.label}</h3>
                      <p className="text-[10px] text-slate-500 font-black tracking-widest mb-4">{desc.sub}</p>
                      <div className="px-4 py-1.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        {desc.words} Words
                      </div>
                    </button>
                  ))}
                </div>
                <button onClick={() => setPrepStage('context')} className="text-slate-500 font-bold uppercase tracking-widest text-xs flex items-center gap-2 mx-auto hover:text-white transition-colors"><ArrowLeft size={14} /> Back</button>
              </div>
            )}
            {prepStage === 'preview' && (
              <div className="max-w-2xl w-full text-center animate-in slide-in-from-right-8 duration-500">
                <div className="p-10 rounded-[3rem] bg-slate-900 border border-slate-800 text-left mb-10 shadow-2xl relative">
                  <p className="text-lg leading-relaxed text-slate-300 italic">"{currentSampleArticle}"</p>
                </div>
                <div className="flex gap-4 justify-center">
                  <button onClick={() => setPrepStage('level')} className="px-8 py-4 rounded-full border border-slate-800 text-slate-500">Cancel</button>
                  <button onClick={() => { setState('recording'); setHasStarted(false); }} className="px-12 py-4 rounded-full bg-indigo-600 text-white font-bold">Start Recording</button>
                </div>
              </div>
            )}
          </div>
        )}

        {state === 'recording' && (
          <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-start animate-in zoom-in duration-500 relative">
            <button onClick={handleCancelSession} className="absolute -top-12 left-0 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-rose-400 transition-colors">
              <X size={14} /> Stop and Return
            </button>
            
            {currentSampleArticle && (
              <div className="w-full lg:w-80 h-full max-h-[480px] bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 overflow-y-auto custom-scrollbar backdrop-blur-md">
                <div className="flex items-center gap-2 mb-6 text-indigo-400">
                  <BookOpen size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Script Reader</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-400 italic font-medium">{currentSampleArticle}</p>
              </div>
            )}
            <div className="flex-1 flex flex-col items-center w-full">
              <div className="w-full relative rounded-[3rem] overflow-hidden bg-black border-4 border-slate-900 aspect-video shadow-2xl">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
                
                {(!isAiLoopActive || !isModelReady) && (
                  <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center z-50">
                    <Loader2 className="text-indigo-500 animate-spin mb-4" size={40} />
                    <p className="text-white font-black tracking-widest text-[10px] uppercase">Calibrating Local Engine...</p>
                  </div>
                )}

                {isAiLoopActive && isModelReady && !hasStarted && (
                  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex flex-col items-center justify-center z-[55] animate-in fade-in duration-300">
                    <div className="p-8 rounded-[3rem] bg-slate-900 border border-slate-800 shadow-2xl text-center max-w-sm flex flex-col items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                        <Video size={32} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">Hardware Synchronized</h3>
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-black">Ready for Session Audit</p>
                      </div>
                      <button 
                        onClick={handleStartSession}
                        className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
                      >
                        Start Practice Now
                      </button>
                    </div>
                  </div>
                )}

                {isAiLoopActive && isModelReady && hasStarted && <ZenOverlay metrics={faceMetrics} />}
                
                <div className="absolute top-8 left-8 flex items-center gap-3 bg-black/40 px-4 py-2 rounded-2xl backdrop-blur-md border border-white/5 z-20">
                  <div className={`w-2.5 h-2.5 rounded-full ${hasStarted ? 'bg-rose-500 recording-pulse' : 'bg-slate-500'}`} />
                  <span className="text-[10px] font-black uppercase text-white">Live: {selectedLanguage.native}</span>
                </div>

                {hasStarted && (
                   <div className="absolute bottom-8 right-8 bg-black/60 px-6 py-3 rounded-2xl text-2xl font-mono text-white backdrop-blur-md border border-white/5">
                    {Math.floor(recordingTime/60).toString().padStart(2,'0')}:{(recordingTime%60).toString().padStart(2,'0')}
                  </div>
                )}
              </div>
              
              {hasStarted && (
                <button onClick={handleStopRecording} className="mt-12 px-12 py-5 rounded-full bg-slate-900 border-2 border-slate-800 text-rose-400 font-bold text-lg flex items-center gap-4 hover:bg-rose-500/5 transition-all active:scale-95">
                  <Square size={20} fill="currentColor" /> Finish & Analyze
                </button>
              )}
            </div>
          </div>
        )}

        {state === 'processing' && (
          <div className="text-center animate-in fade-in duration-700">
            <div className="relative w-24 h-24 mx-auto mb-10">
              <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin" />
              <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400" size={32} />
            </div>
            <h2 className="text-3xl font-extrabold mb-3 text-white italic">Audit in Progress...</h2>
            <p className="text-slate-500 max-w-sm mx-auto">Analyzing speech using Gemini-3 Pro. Data is processed locally and privately.</p>
          </div>
        )}

        {state === 'logs' && (
          <div className="max-w-3xl w-full bg-slate-900/60 border border-slate-800 rounded-[3rem] p-10 backdrop-blur-xl z-[60] animate-in fade-in zoom-in duration-500 max-h-[80vh] overflow-y-auto custom-scrollbar relative">
             <header className="flex justify-between items-center mb-10 border-b border-slate-800 pb-8">
                <h2 className="text-3xl font-black text-white italic uppercase">Audit Evolution</h2>
                <button onClick={() => setState('idle')} className="p-3 rounded-full bg-slate-800 hover:bg-indigo-600 transition-all text-white shadow-lg"><X size={20} /></button>
             </header>
             <div className="space-y-12">
                {UPDATE_LOG.map((log, i) => (
                  <div key={i} className="relative pl-8 border-l border-slate-800">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-indigo-500" />
                    <h3 className="text-xl font-bold text-white mb-4 italic tracking-tight">{log.version} - {log.title}</h3>
                    <ul className="space-y-2">
                      {log.changes.map((change, ci) => (
                        <li key={ci} className="text-slate-400 text-sm italic">▹ {change}</li>
                      ))}
                    </ul>
                  </div>
                ))}
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
