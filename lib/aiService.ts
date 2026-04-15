
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisMetrics } from "../types";
import { IELTS_QUESTIONS } from "../constants";

/**
 * LinguisticCoachService: The primary engine for professional IELTS Audit & Diagnostic System.
 * Consolidates all Gemini API interactions for client-side execution.
 */
export class LinguisticCoachService {
  /**
   * Internal helper to get a fresh AI instance.
   */
  public getAI() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables.");
    }
    return new GoogleGenAI({ apiKey });
  }

  private getTopicPoints(topicTitle: string): string[] {
    // Search in Part 2 questions
    const part2 = IELTS_QUESTIONS.part2 as Record<string, Array<{ topic: string; points: string[] }>>;
    for (const category in part2) {
      const questions = part2[category];
      const found = questions.find((q) => q.topic === topicTitle);
      if (found) return found.points;
    }
    return [];
  }

  async analyzeSpeech(
    base64Audio: string, 
    mimeType: string, 
    config: {
      language: string;
      context: string;
      duration: number;
      eyeContact: number;
      smile: number;
      sampleArticle?: string | null;
    }
  ): Promise<Partial<AnalysisMetrics>> {
    const ai = this.getAI();
    const topicPoints = config.sampleArticle ? this.getTopicPoints(config.sampleArticle) : [];

    const systemInstruction = `You are a professional IELTS Diagnostic Auditor. 
      Your tone is strictly clinical, analytical, and objective. 
      Perform a professional audit of the user's speech based on standardized linguistic criteria.
      
      SCORING LOGIC:
      - If language is English: Use IELTS 0-9 criteria for all scores.
      - If language is NOT English: Use a 0-100 scale for primary scores (score_100, subscores_100), but still provide an approximate IELTS 0-9 equivalent for the 'ielts_score' field.
      
      Dimensions: Fluency, Lexical Resource, Grammatical Range, and Rhetorical Effectiveness.
      Output MUST be valid JSON.`;

    const userPrompt = `DIAGNOSTIC AUDIT REQUEST:
    Duration: ${config.duration}s
    Language: ${config.language}
    Context: ${config.context}
    Biometrics: Eye Contact ${config.eyeContact.toFixed(1)}%, Smile ${config.smile.toFixed(1)}%
    ${config.sampleArticle ? `Target Topic: "${config.sampleArticle}"` : "Spontaneous Speech"}
    ${topicPoints.length > 0 ? `Required Points: ${topicPoints.join(", ")}` : ""}
    
    TASK:
    1. Transcribe the audio precisely.
    2. Calculate WPM and linguistic metrics.
    3. Score for: Fluency, Lexical, Grammar, Rhetorical.
    4. Audit covered and missing points.
    5. Provide technical feedback tips (clinical tone).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: [{
        role: 'user',
        parts: [
          { text: userPrompt },
          { inlineData: { mimeType, data: base64Audio } }
        ]
      }],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            transcription: { type: Type.STRING },
            wpm: { type: Type.NUMBER },
            ielts_score: { type: Type.NUMBER },
            score_100: { type: Type.NUMBER },
            ielts_subscores: {
              type: Type.OBJECT,
              properties: {
                fluency: { type: Type.NUMBER },
                lexical: { type: Type.NUMBER },
                grammar: { type: Type.NUMBER },
                rhetorical: { type: Type.NUMBER }
              }
            },
            subscores_100: {
              type: Type.OBJECT,
              properties: {
                fluency: { type: Type.NUMBER },
                lexical: { type: Type.NUMBER },
                grammar: { type: Type.NUMBER },
                rhetorical: { type: Type.NUMBER }
              }
            },
            cefr_level: { type: Type.STRING },
            audit_report: {
              type: Type.OBJECT,
              properties: {
                points_covered: { type: Type.ARRAY, items: { type: Type.STRING } },
                points_missing: { type: Type.ARRAY, items: { type: Type.STRING } },
                technical_accuracy: { type: Type.NUMBER },
                coherence_score: { type: Type.NUMBER }
              }
            },
            feedback_tips: { type: Type.ARRAY, items: { type: Type.STRING } },
            emotion: { type: Type.STRING },
            emotion_confidence: { type: Type.NUMBER },
            emotion_explanation: { type: Type.STRING },
            vocal_energy: { type: Type.NUMBER },
            pitch_range: { type: Type.NUMBER },
            emotional_stability: { type: Type.NUMBER }
          },
          required: ["transcription", "wpm", "ielts_score", "ielts_subscores", "cefr_level", "audit_report", "feedback_tips", "emotion", "emotion_confidence", "emotion_explanation", "vocal_energy", "pitch_range", "emotional_stability"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Audit failed: Empty response from AI.");
    return JSON.parse(text);
  }

  async analyzeIELTS(
    base64Audio: string,
    mimeType: string,
    config: {
      part: number;
      question: string;
      duration: number;
      language?: string;
    }
  ): Promise<Partial<AnalysisMetrics>> {
    const ai = this.getAI();
    const lang = config.language || 'en';
    const systemInstruction = `You are a professional IELTS Senior Diagnostic Auditor. 
      Strictly adhere to IELTS Band Descriptors. Your tone is cold, clinical, and objective.
      
      SCORING LOGIC:
      - If language is English: Use IELTS 0-9 criteria.
      - If language is NOT English: Use a 0-100 scale.
      
      Output MUST be valid JSON.`;

    const prompt = `PROFESSIONAL AUDIT: Part ${config.part}
    Language: ${lang}
    Question: "${config.question}"
    Evaluate: Fluency, Lexical Resource, Grammatical Range, and Rhetorical Effectiveness.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: [{
        role: 'user',
        parts: [
          { text: prompt },
          { inlineData: { mimeType, data: base64Audio } }
        ]
      }],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            transcription: { type: Type.STRING },
            wpm: { type: Type.NUMBER },
            ielts_score: { type: Type.NUMBER },
            score_100: { type: Type.NUMBER },
            ielts_subscores: {
              type: Type.OBJECT,
              properties: {
                fluency: { type: Type.NUMBER },
                lexical: { type: Type.NUMBER },
                grammar: { type: Type.NUMBER },
                rhetorical: { type: Type.NUMBER }
              }
            },
            subscores_100: {
              type: Type.OBJECT,
              properties: {
                fluency: { type: Type.NUMBER },
                lexical: { type: Type.NUMBER },
                grammar: { type: Type.NUMBER },
                rhetorical: { type: Type.NUMBER }
              }
            },
            cefr_level: { type: Type.STRING },
            audit_report: {
              type: Type.OBJECT,
              properties: {
                points_covered: { type: Type.ARRAY, items: { type: Type.STRING } },
                points_missing: { type: Type.ARRAY, items: { type: Type.STRING } },
                technical_accuracy: { type: Type.NUMBER },
                coherence_score: { type: Type.NUMBER }
              }
            },
            feedback_tips: { type: Type.ARRAY, items: { type: Type.STRING } },
            emotion: { type: Type.STRING },
            emotion_confidence: { type: Type.NUMBER },
            emotion_explanation: { type: Type.STRING },
            vocal_energy: { type: Type.NUMBER },
            pitch_range: { type: Type.NUMBER },
            emotional_stability: { type: Type.NUMBER }
          },
          required: ["transcription", "wpm", "ielts_score", "ielts_subscores", "cefr_level", "audit_report", "feedback_tips", "emotion", "emotion_confidence", "emotion_explanation", "vocal_energy", "pitch_range", "emotional_stability"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Audit failed: Empty response from AI.");
    return JSON.parse(text);
  }
}

export const coachService = new LinguisticCoachService();
