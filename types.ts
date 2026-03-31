export type AppState = 'idle' | 'recording' | 'processing' | 'report' | 'history' | 'ielts-sim' | 'quick-session-prep';

export type ArticleLevel = 'beginner' | 'intermediate' | 'advanced';

export interface IELTSSubScores {
  fluency: number;
  lexical: number;
  grammar: number;
  rhetorical: number;
}

export interface SubScores100 {
  fluency: number;
  lexical: number;
  grammar: number;
  rhetorical: number;
}

/**
 * AnalysisMetrics: The core session result object.
 * Fully serializable for Firestore migration.
 */
export interface AnalysisMetrics {
  // Database Identifiers
  id: string;
  userId: string; // Support for Anonymous Auth / User ownership
  
  // Temporal Metadata
  date: string; // ISO 8601
  duration: number;
  language: string;
  context_id?: string;
  
  // Linguistic Performance
  transcription: string;
  wpm: number;
  filler_count: number;
  pause_count: number;
  proficiency_level: string; 
  cefr_level: string;
  
  // Standardized Scores
  ielts_score: number;
  score_100?: number;
  ielts_subscores?: IELTSSubScores;
  subscores_100?: SubScores100;
  ielts_part?: number;
  question_text?: string;
  
  // Audit Report Fields
  audit_report: {
    points_covered: string[];
    points_missing: string[];
    technical_accuracy: number;
    coherence_score: number;
  };
  
  // Psychological/Vocal Analytics
  emotion: string;
  emotion_confidence: number;
  emotion_explanation: string;
  vocal_energy: number; 
  pitch_range: number; 
  emotional_stability: number; 
  
  // Biometric Performance
  eyeContactScore?: number;
  smileScore?: number;
  
  // Actionable Insights
  feedback_tips: string[];
}

export interface CoachingContext {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface LanguageConfig {
  code: string;
  label: string;
  native: string;
  flag: string;
}

export interface FaceMetrics {
  isSmiling: boolean;
  hasEyeContact: boolean;
  pitch: number;
  yaw: number;
  smileIntensity: number;
}

export interface UserSession {
  email: string;
  token: string;
}