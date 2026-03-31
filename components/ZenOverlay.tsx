import React, { useMemo } from 'react';
import { User, AlertCircle, Sparkles, Target, Zap, Heart, Eye } from 'lucide-react';
import { FaceMetrics } from '../types';

interface ZenOverlayProps {
  metrics: FaceMetrics;
}

export const ZenOverlay: React.FC<ZenOverlayProps> = ({ metrics }) => {
  const { hasEyeContact, isSmiling, smileIntensity, yaw, pitch } = metrics;

  // Dynamic Theme Logic: Granular state-based styling
  const theme = useMemo(() => {
    // eye contact and smile combinations
    if (hasEyeContact) {
      return {
        vignette: isSmiling 
          ? 'shadow-[inset_0_0_200px_rgba(236,72,153,0.15),inset_0_0_150px_rgba(16,185,129,0.2)]' 
          : 'shadow-[inset_0_0_200px_rgba(16,185,129,0.2)]',
        accent: isSmiling ? 'border-pink-500/40' : 'border-emerald-500/50',
        glow: isSmiling ? 'bg-pink-400' : 'bg-emerald-400',
        panel: isSmiling 
          ? 'bg-pink-500/10 border-pink-500/30 text-pink-300' 
          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        label: isSmiling ? 'Warm Engagement' : 'Focus Locked',
        subLabel: 'Biometric Link Active',
        icon: isSmiling ? <Heart size={20} className="animate-pulse" /> : <Target size={20} className="animate-[spin_6s_linear_infinite]" />
      };
    }
    
    return {
      vignette: 'shadow-[inset_0_0_250px_rgba(245,158,11,0.35)]',
      accent: 'border-amber-500/40 animate-pulse scale-105',
      glow: 'bg-amber-400',
      panel: 'bg-amber-500/15 border-amber-500/30 text-amber-200',
      label: 'Signal Drift',
      subLabel: 'Re-align Sensor',
      icon: <AlertCircle size={20} className="animate-bounce" />
    };
  }, [hasEyeContact, isSmiling]);

  // HUD Parallax calculation for depth effect
  const parallaxStyle = useMemo(() => ({
    transform: `translate(${yaw * -50}px, ${pitch * -50}px)`,
    transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
  }), [yaw, pitch]);

  // CSS Particle emitter for "Positivity Sparks"
  const particles = useMemo(() => {
    if (!isSmiling) return [];
    const count = Math.floor(smileIntensity * 8) + 4;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${(i * 13) % 80 + 10}%`,
      delay: `${(i * 0.5) % 2}s`,
      size: (i * 2) % 6 + 2,
      duration: `${1.5 + (i * 0.7) % 2}s`
    }));
  }, [isSmiling, smileIntensity]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Dynamic Atmospheric Layers */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ease-in-out z-0 ${theme.vignette}`}
      />
      
      {/* 2. Scanning Beam Layer */}
      <div className={`absolute inset-0 z-10 transition-opacity duration-1000 ${hasEyeContact ? 'opacity-20' : 'opacity-10'}`}>
        <div className={`absolute top-0 bottom-0 w-[2px] transition-colors duration-1000 animate-scanner shadow-[0_0_15px_rgba(255,255,255,0.5)] ${
          hasEyeContact ? 'bg-emerald-400' : 'bg-amber-400'
        }`} />
      </div>

      {/* 3. Geometric HUD Brackets */}
      <div className="absolute inset-0 p-8 z-20">
        <div className={`absolute top-8 left-8 w-20 h-20 border-t-[1.5px] border-l-[1.5px] transition-all duration-700 ${theme.accent}`} />
        <div className={`absolute top-8 right-8 w-20 h-20 border-t-[1.5px] border-r-[1.5px] transition-all duration-700 ${theme.accent}`} />
        <div className={`absolute bottom-8 left-8 w-20 h-20 border-b-[1.5px] border-l-[1.5px] transition-all duration-700 ${theme.accent}`} />
        <div className={`absolute bottom-8 right-8 w-20 h-20 border-b-[1.5px] border-r-[1.5px] transition-all duration-700 ${theme.accent}`} />
      </div>

      {/* 4. Reactive HUD Content */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-between py-16 px-16" style={parallaxStyle}>
        
        {/* Top Header Panel */}
        <div className="w-full flex justify-between items-start animate-in slide-in-from-top-8 duration-1000">
          <div className={`flex items-center gap-4 px-6 py-4 rounded-[2rem] border backdrop-blur-3xl transition-all duration-700 shadow-2xl ${theme.panel}`}>
            <div className="relative">
              {theme.icon}
              {hasEyeContact && (
                <div className={`absolute inset-0 blur-xl opacity-40 animate-pulse ${isSmiling ? 'bg-pink-400' : 'bg-emerald-400'}`} />
              )}
            </div>
            <div className="flex flex-col border-l border-white/10 pl-4">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] leading-none mb-1.5 whitespace-nowrap">
                {theme.label}
              </span>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${hasEyeContact ? (isSmiling ? 'bg-pink-400 animate-bounce' : 'bg-emerald-400 animate-pulse') : 'bg-amber-400'}`} />
                <span className="text-[9px] font-bold opacity-50 uppercase tracking-widest whitespace-nowrap">
                  {theme.subLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Eye Contact Stats Badge */}
          <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-950/40 border border-slate-800 transition-all duration-700 ${hasEyeContact ? 'opacity-100' : 'opacity-0 translate-x-4'}`}>
            <Eye size={14} className="text-indigo-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Lock: <span className="text-white">Active</span></span>
          </div>
        </div>

        {/* Drift Warning HUD */}
        {!hasEyeContact && (
          <div className="flex flex-col items-center gap-8 animate-in zoom-in-90 fade-in duration-500">
             <div className="relative scale-110">
                <div className="absolute inset-0 blur-3xl bg-amber-500/20 animate-pulse" />
                <div className="w-28 h-28 rounded-full border-[1.5px] border-dashed border-amber-500/30 flex items-center justify-center animate-[spin_12s_linear_infinite]">
                  <Zap size={32} className="text-amber-500/20" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <User size={48} className="text-amber-500 animate-pulse" />
                </div>
             </div>
             <div className="text-center">
                <h2 className="text-amber-500 font-black uppercase tracking-[0.5em] text-xs mb-2">Biometric Drift Detected</h2>
                <p className="text-amber-200/40 text-[9px] font-bold uppercase tracking-[0.2em] max-w-[200px] leading-relaxed">System requires gaze alignment for proficiency auditing</p>
             </div>
          </div>
        )}

        {/* Bottom Biometric Dashboard */}
        <div className="w-full flex justify-between items-end">
          
          {/* Sentiment Gauge */}
          <div className="flex flex-col gap-4">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-xl backdrop-blur-xl border transition-all duration-700 ${
              isSmiling ? 'bg-pink-500/20 border-pink-500/30' : 'bg-slate-950/40 border-slate-800'
            }`}>
              <Sparkles size={14} className={isSmiling ? 'text-pink-400 animate-pulse' : 'text-slate-600'} />
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Sentiment</span>
                <span className={`text-[10px] font-bold uppercase ${isSmiling ? 'text-pink-300' : 'text-slate-400'}`}>
                  {isSmiling ? 'Positive Affect' : 'Neutral Phase'}
                </span>
              </div>
            </div>

            <div className="w-48 h-1.5 bg-slate-950/60 rounded-full overflow-hidden border border-white/5">
              <div 
                className={`h-full transition-all duration-1000 ease-out ${isSmiling ? 'bg-gradient-to-r from-pink-500 to-rose-400 shadow-[0_0_10px_rgba(236,72,153,0.5)]' : 'bg-indigo-500/40'}`}
                style={{ width: `${Math.max(10, smileIntensity * 100)}%` }}
              />
            </div>
          </div>

          {/* Spatial Rotation Display */}
          <div className="flex flex-col items-end gap-2 font-mono">
            <div className="flex items-center gap-3 text-slate-500/40 text-[8px] font-black uppercase tracking-widest">
               <span>Yaw: {(yaw * 100).toFixed(1)}°</span>
               <div className="w-1 h-1 rounded-full bg-slate-800" />
               <span>Pitch: {(pitch * 100).toFixed(1)}°</span>
            </div>
            <div className={`px-4 py-1.5 rounded-lg border text-[10px] font-bold uppercase transition-all duration-700 ${
              hasEyeContact ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
            }`}>
              Orientation: {hasEyeContact ? 'Centered' : 'Drifting'}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Particle Emission System (Positive Affect Sparks) */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute bottom-0 animate-sparkle pointer-events-none z-40 text-pink-400/40"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration
          }}
        >
          <Sparkles size={p.size} />
        </div>
      ))}
    </div>
  );
};
