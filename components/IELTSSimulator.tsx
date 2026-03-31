
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ShieldCheck, 
  Volume2, 
  Loader2, 
  Timer,
  BookOpen,
  ArrowLeft,
  AlertCircle,
  ChevronRight,
  Hash,
  X,
  Video
} from 'lucide-react';
import { Modality } from "@google/genai";
import { IELTS_QUESTIONS } from '../constants';
import { AnalysisMetrics } from '../types';
import { useFaceMesh } from '../hooks/useFaceMesh';
import { ZenOverlay } from './ZenOverlay';
import { processRecordingBlob, getAnonymousUserId } from '../lib/mediaEngine';
import { coachService } from '../lib/aiService';

interface IELTSSimulatorProps {
  onReport: (data: AnalysisMetrics) => void;
  onExit: () => void;
}

type SimStage = 'selection' | 'method-selection' | 'category-selection' | 'question-selection' | 'question' | 'prep' | 'recording' | 'processing';

// Audio Decoding Helpers
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const ExaminerStatusIndicator: React.FC<{ 
  state: 'speaking' | 'thinking' | 'listening' | 'idle' 
}> = ({ state }) => {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
      <div className="relative flex items-center justify-center w-12 h-12">
        {state === 'speaking' && (
          <div className="flex items-end gap-1 px-3 py-2 bg-indigo-600/20 backdrop-blur-xl border border-indigo-500/30 rounded-full">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="w-1 bg-indigo-400 rounded-full animate-wave-bar" 
                style={{ animationDelay: `${i * 0.1}s`, height: '8px' }}
              />
            ))}
          </div>
        )}

        {state === 'thinking' && (
          <div className="w-10 h-10 border-4 border-slate-800 border-t-indigo-500 rounded-full animate-thinking shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
        )}

        {state === 'listening' && (
          <div className="w-6 h-6 bg-indigo-500 rounded-full animate-breathing border-2 border-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.6)]" />
        )}

        {state === 'idle' && (
          <div className="w-6 h-6 bg-slate-800 rounded-full opacity-50 border border-slate-700" />
        )}
      </div>
    </div>
  );
};

export const IELTSSimulator: React.FC<IELTSSimulatorProps> = ({ onReport, onExit }) => {
  const [stage, setStage] = useState<SimStage>('selection');
  const [isModelReady, setIsModelReady] = useState(false);
  const [isAiLoopActive, setIsAiLoopActive] = useState(false); 
  const [hasStarted, setHasStarted] = useState(false);
  const [hardwareError, setHardwareError] = useState<string | null>(null);
  const [part, setPart] = useState<1 | 2>(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [question, setQuestion] = useState<string | { topic: string } | null>(null);
  const [showText] = useState(false);
  const [prepTime, setPrepTime] = useState(60);
  const [recordTime, setRecordTime] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isFetchingAudio, setIsFetchingAudio] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const isMountedRef = useRef<boolean>(true);
  const audioContextRef = useRef<AudioContext | null>(null);
  const startTimeRef = useRef<number>(0);
  const userId = useRef(getAnonymousUserId());

  const sessionMetricsRef = useRef({
    eyeContactSum: 0,
    smileSum: 0,
    frameCount: 0
  });

  const handleModelReady = useCallback(() => {
    setIsModelReady(true);
  }, []);

  const faceMetrics = useFaceMesh(
    videoRef, 
    canvasRef, 
    isAiLoopActive, 
    stream, 
    handleModelReady
  );

  useEffect(() => {
    if (stage === 'recording' && isAiLoopActive && isModelReady && hasStarted) {
      sessionMetricsRef.current.eyeContactSum += faceMetrics.hasEyeContact ? 1 : 0;
      sessionMetricsRef.current.smileSum += faceMetrics.smileIntensity;
      sessionMetricsRef.current.frameCount += 1;
    }
  }, [faceMetrics, stage, isAiLoopActive, isModelReady, hasStarted]);

  const stopAllHardware = useCallback(() => {
    setIsAiLoopActive(false);
    setIsModelReady(false);
    setHasStarted(false);
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        try { track.stop(); } catch { /* ignore */ }
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
    }
    setStream(null);
  }, []);

  const processAudit = useCallback(async (blob: Blob, rawMimeType: string) => {
    if (blob.size === 0) { setStage('selection'); return; }
    try {
      const sanitizedMime = rawMimeType.split(';')[0];
      const base64 = await processRecordingBlob(blob);
      const questionText = typeof question === 'string' ? question : question?.topic;

      const avgEyeContact = sessionMetricsRef.current.frameCount > 0 
        ? (sessionMetricsRef.current.eyeContactSum / sessionMetricsRef.current.frameCount) * 100 
        : 100;
      const avgSmile = sessionMetricsRef.current.frameCount > 0 
        ? (sessionMetricsRef.current.smileSum / sessionMetricsRef.current.frameCount) * 100 
        : 0;

      const duration = Math.round((Date.now() - startTimeRef.current) / 1000);

      const result = await coachService.analyzeIELTS(base64, sanitizedMime, {
        part,
        question: questionText || "IELTS Practice Session",
        duration: duration
      });
      
      onReport({
        ...(result as AnalysisMetrics),
        id: Math.random().toString(36).substring(2, 11),
        userId: userId.current,
        date: new Date().toISOString(),
        language: 'en', 
        duration: duration,
        question_text: questionText,
        ielts_part: part,
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
        filler_count: 0,
        pause_count: 0,
        eyeContactScore: avgEyeContact,
        smileScore: avgSmile
      });
    } catch (e) {
      console.error("IELTS Audit Fail:", e);
      setStage('selection');
    }
  }, [onReport, part, question]);

  const initializeHardware = useCallback(async () => {
    try {
      setHardwareError(null);
      stopAllHardware();
      await new Promise(r => setTimeout(r, 800));

      const vStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      const aStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
      });

      if (!isMountedRef.current) {
        vStream.getTracks().forEach(t => t.stop());
        aStream.getTracks().forEach(t => t.stop());
        return;
      }

      const combinedStream = new MediaStream([...vStream.getVideoTracks(), ...aStream.getAudioTracks()]);
      streamRef.current = combinedStream;
      setStream(combinedStream);

      if (videoRef.current) {
        videoRef.current.srcObject = vStream;
        await videoRef.current.play();
      }

      const mimeType = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'].find(m => MediaRecorder.isTypeSupported(m));
      const recorder = new MediaRecorder(aStream, { mimeType });
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      
      recorder.ondataavailable = (e) => { 
        if (e.data.size > 0) audioChunksRef.current.push(e.data); 
      };
      
      recorder.onstop = () => {
        const finalBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType });
        processAudit(finalBlob, recorder.mimeType);
      };

      setIsAiLoopActive(true);
    } catch (e) {
      setHardwareError((e as Error).message || "Hardware Access Denied.");
      setStage('selection'); 
    }
  }, [stopAllHardware, processAudit]);

  useEffect(() => {
    let interval: number | null = null;
    if (stage === 'prep' && prepTime > 0) {
      interval = window.setInterval(() => {
        setPrepTime(prev => {
          if (prev <= 1) {
            setStage('recording');
            initializeHardware();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [stage, prepTime, initializeHardware]);

  const handleStartSession = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
      try {
        startTimeRef.current = Date.now();
        mediaRecorderRef.current.start(1000);
        setHasStarted(true);
      } catch (e) {
        console.error("IELTS Recorder start failed", e);
      }
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    return () => { isMountedRef.current = false; stopAllHardware(); };
  }, [stopAllHardware]);

  const handleStop = () => {
    setStage('processing');
    stopAllHardware();
  };

  useEffect(() => {
    let t: number;
    if (stage === 'recording' && hasStarted) t = window.setInterval(() => setRecordTime(p => p + 1), 1000);
    return () => clearInterval(t);
  }, [stage, hasStarted]);

  const beginQuestion = async (q: string | { topic: string }) => {
    setQuestion(q);
    const qText = typeof q === 'string' ? q : q.topic;
    setStage('question');
    setIsFetchingAudio(true);
    setIsSpeaking(true);

    try {
      const ai = coachService.getAI();
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: `Speak naturally as a UK IELTS examiner: ${qText}`,
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: 'Charon' },
              },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      
      if (base64Audio) {
        if (!audioContextRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioContextRef.current = new AudioContextClass({sampleRate: 24000});
        }
        const ctx = audioContextRef.current;
        const buffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => { if (isMountedRef.current) setIsSpeaking(false); };
        setIsFetchingAudio(false);
        source.start();
      }
    } catch (err) {
      console.error("Examiner TTS Fallback:", err);
      setIsFetchingAudio(false);
      setIsSpeaking(false);
    }
  };

  const startRandomSession = () => {
    const categories = Object.keys(part === 1 ? IELTS_QUESTIONS.part1 : IELTS_QUESTIONS.part2);
    const randomCat = categories[Math.floor(Math.random() * categories.length)];
    const questions = (part === 1 ? (IELTS_QUESTIONS.part1 as Record<string, string[]>) : (IELTS_QUESTIONS.part2 as unknown as Record<string, string[]>))[randomCat];
    const randomQ = questions[Math.floor(Math.random() * questions.length)];
    
    setSelectedCategory(randomCat);
    beginQuestion(randomQ);
  };

  const getExaminerState = () => {
    if (isFetchingAudio || stage === 'processing') return 'thinking';
    if (isSpeaking) return 'speaking';
    if (stage === 'recording' || stage === 'prep') return 'listening';
    return 'idle';
  };

  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center p-6">
      <div className="absolute top-6 left-6">
        <button onClick={onExit} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-white transition-all"><X size={20} /></button>
      </div>

      {hardwareError && (
        <div className="mb-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-sm font-bold flex items-center justify-center gap-2">
          <AlertCircle size={16} /> {hardwareError}
        </div>
      )}

      {stage === 'selection' && (
        <div className="max-w-4xl w-full text-center animate-in fade-in zoom-in duration-700">
          <ShieldCheck size={48} className="text-indigo-500 mx-auto mb-6" />
          <h1 className="text-4xl font-black text-white mb-4 italic tracking-tight">IELTS Audit</h1>
          <p className="text-slate-400 mb-12">Professional English Proficiency Assessment</p>
          <div className="grid md:grid-cols-2 gap-6">
            <button onClick={() => { setPart(1); setStage('category-selection'); }} className="p-8 rounded-[2rem] bg-slate-900 border border-slate-800 hover:border-indigo-500 transition-all text-left group">
              <BookOpen className="text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Part 1: Interview</h3>
              <p className="text-sm text-slate-500">General conversation topics and warm-up questions.</p>
            </button>
            <button onClick={() => { setPart(2); setStage('category-selection'); }} className="p-8 rounded-[2rem] bg-slate-900 border border-slate-800 hover:border-indigo-500 transition-all text-left group">
              <Timer className="text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">Part 2: Long Turn</h3>
              <p className="text-sm text-slate-500">2-minute presentation on a specific card topic.</p>
            </button>
          </div>
        </div>
      )}

      {stage === 'category-selection' && (
        <div className="max-w-5xl w-full animate-in fade-in zoom-in duration-500">
          <header className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-4xl font-black text-white italic tracking-tighter mb-2">Select Topic</h2>
              <p className="text-slate-400">Choose a specific domain or simulate a random exam encounter.</p>
            </div>
            <button onClick={() => setStage('selection')} className="text-indigo-400 font-black uppercase tracking-widest text-[10px] flex items-center gap-2"><ArrowLeft size={14} /> Back</button>
          </header>

          <div className="flex flex-col gap-8 max-h-[80vh]">
            <button 
              onClick={startRandomSession}
              className="w-full p-8 rounded-[2.5rem] bg-gradient-to-r from-indigo-600 to-indigo-900 border border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all flex items-center justify-between group active:scale-[0.99] shrink-0"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                   <ShieldCheck size={32} className="text-white group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-left">
                   <h3 className="text-2xl font-black text-white italic tracking-tight">Dynamic Audit</h3>
                   <p className="text-indigo-200 text-sm">AI Examiner selects the topic for a cold diagnostic.</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-indigo-600 transition-all">
                <ChevronRight size={20} className="ml-1" />
              </div>
            </button>

            <div className="flex-1 min-h-0 flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                 <div className="h-px bg-slate-800 flex-1" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Or Select Manually</span>
                 <div className="h-px bg-slate-800 flex-1" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-y-auto custom-scrollbar pr-2 max-h-[450px]">
                {Object.keys(part === 1 ? IELTS_QUESTIONS.part1 : IELTS_QUESTIONS.part2).map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => { setSelectedCategory(cat); setStage('question-selection'); }}
                    className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800 transition-all text-left h-full"
                  >
                    <Hash size={20} className="text-indigo-500 mb-4" />
                    <span className="text-xs font-bold text-slate-300 block line-clamp-2">{cat}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {stage === 'question-selection' && (
        <div className="max-w-4xl w-full">
          <header className="flex justify-between items-center mb-10 border-b border-slate-900 pb-8">
            <h2 className="text-2xl font-bold text-white italic">{selectedCategory}</h2>
            <button onClick={() => setStage('category-selection')} className="text-indigo-400 text-[10px] flex items-center gap-2"><ArrowLeft size={14} /> Back</button>
          </header>
          <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
            {(part === 1 ? (IELTS_QUESTIONS.part1 as Record<string, string[]>) : (IELTS_QUESTIONS.part2 as unknown as Record<string, string[]>))[selectedCategory!].map((q: string, i: number) => (
              <button 
                key={i} 
                onClick={() => beginQuestion(q)}
                className="w-full p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500 transition-all text-left flex justify-between items-center"
              >
                <span className="text-slate-300 line-clamp-1 italic">{q}</span>
                <ChevronRight size={18} className="text-slate-700" />
              </button>
            ))}
          </div>
        </div>
      )}

      {stage === 'question' && (
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8 relative inline-block">
             <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
             <Volume2 size={64} className={`relative z-10 ${isSpeaking ? 'text-indigo-400 animate-pulse' : 'text-slate-700'}`} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-10 animate-in fade-in slide-in-from-bottom-4">{isSpeaking ? "Examiner is speaking..." : "Question Audio Finished"}</h2>
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 italic text-slate-400 mb-12 animate-in fade-in slide-in-from-bottom-6 delay-100">
            {showText ? `"${typeof question === 'string' ? question : question?.topic}"` : "Official prompt active..."}
          </div>
          <button 
            onClick={() => { if (part === 1) { setStage('recording'); initializeHardware(); } else { setStage('prep'); } }} 
            disabled={isSpeaking} 
            className="px-12 py-5 rounded-full bg-indigo-600 text-white font-bold transition-all disabled:opacity-30 hover:bg-indigo-500 active:scale-95 shadow-xl shadow-indigo-600/20"
          >
            {part === 1 ? "Prepare to Answer" : "Begin Preparation"}
          </button>
        </div>
      )}

      {stage === 'prep' && (
        <div className="text-center animate-in zoom-in duration-300">
           <div className="w-32 h-32 rounded-full border-4 border-slate-800 flex items-center justify-center mx-auto mb-8 bg-slate-900 relative">
             <div className="absolute inset-0 border-4 border-t-indigo-500 rounded-full animate-spin" />
             <span className="text-4xl font-black text-white">{prepTime}</span>
           </div>
           <h2 className="text-2xl font-bold text-white mb-4">Preparation Time</h2>
           <p className="text-slate-400 mb-8 max-w-md mx-auto">Take this time to write down notes about your answer. The examiner will not interrupt you.</p>
           <button onClick={() => { setStage('recording'); initializeHardware(); }} className="px-8 py-3 rounded-2xl bg-slate-800 text-slate-300 hover:text-white font-bold">
             Skip Timer & Start
           </button>
        </div>
      )}

      {stage === 'recording' && (
        <div className="w-full max-w-4xl flex flex-col items-center">
          <div className="w-full relative rounded-[3rem] overflow-hidden bg-black aspect-video border-4 border-slate-900 shadow-2xl">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
            
            {isAiLoopActive && isModelReady && !hasStarted && (
              <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex flex-col items-center justify-center z-[55] animate-in fade-in duration-300">
                <div className="p-8 rounded-[3rem] bg-slate-900 border border-slate-800 shadow-2xl text-center max-w-sm flex flex-col items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                    <Video size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Examiner Waiting</h3>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-black">Camera Synchronized</p>
                  </div>
                  <button 
                    onClick={handleStartSession}
                    className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
                  >
                    Start Recording Now
                  </button>
                </div>
              </div>
            )}

            <ExaminerStatusIndicator state={getExaminerState()} />
            {isAiLoopActive && isModelReady && hasStarted && <ZenOverlay metrics={faceMetrics} />}
            
            <div className="absolute top-8 left-8 flex items-center gap-3 bg-black/40 px-4 py-2 rounded-2xl backdrop-blur-md border border-white/5 z-20">
              <div className={`w-2.5 h-2.5 rounded-full ${hasStarted ? 'bg-rose-500 recording-pulse' : 'bg-slate-500'}`} />
              <span className="text-[10px] font-black uppercase text-white">Live: IELTS Audit</span>
            </div>

            {hasStarted && (
               <div className="absolute bottom-8 right-8 bg-black/60 px-6 py-3 rounded-2xl text-2xl font-mono text-white backdrop-blur-md border border-white/5">
                {Math.floor(recordTime/60).toString().padStart(2,'0')}:{(recordTime%60).toString().padStart(2,'0')}
              </div>
            )}
          </div>

          {hasStarted && (
            <button onClick={handleStop} className="mt-12 px-12 py-5 rounded-full bg-slate-900 border-2 border-slate-800 text-rose-400 font-bold hover:bg-rose-500/10 transition-all flex items-center gap-4 active:scale-95 shadow-xl">
               <div className="w-3 h-3 bg-rose-500 rounded-sm" /> End Task & Analyze
            </button>
          )}
        </div>
      )}

      {stage === 'processing' && (
        <div className="text-center">
          <Loader2 size={40} className="text-indigo-400 animate-spin mx-auto mb-10" />
          <h2 className="text-3xl font-black text-white italic tracking-tight">Syncing Examiner Audit...</h2>
          <p className="text-slate-500">Generating linguistic report using Gemini-3 PRO.</p>
        </div>
      )}
    </div>
  );
};
