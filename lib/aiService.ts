
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisMetrics } from "../types";
import { IELTS_QUESTIONS } from "../constants";

/**
 * LinguisticCoachService: The primary engine for professional fluency assessment.
 * Consolidates all Gemini API interactions for client-side execution.
 */
export class LinguisticCoachService {
  /**
   * Internal helper to get a fresh AI instance.
   */
  public getAI() {
    return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
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

    const isEnglish = config.language.toLowerCase() === 'en' || config.language.toLowerCase() === 'english';

    const systemInstruction = `You are a high-precision linguistic auditor for a professional fluency assessment platform. 
    Your tone is cold, clinical, and strictly analytical. Avoid all encouraging or subjective language.
    Perform a medical-grade audit of the user's speech.
    
    SCORING LOGIC:
    - If language is English: Use IELTS 0-9 criteria for all scores.
    - If language is NOT English: Use a 0-100 scale for primary scores (score_100, subscores_100), but still provide an approximate IELTS 0-9 equivalent for the 'ielts_score' field.
    
    Focus on four dimensions: Fluency, Lexical Resource, Grammatical Range and Accuracy, and Rhetorical Effectiveness.
    Output MUST be valid JSON conforming to the diagnostic dashboard schema.`;

    const userPrompt = `AUDIT REQUEST:
    Duration: ${config.duration}s
    Language: ${config.language} (Primary Scoring Scale: ${isEnglish ? "IELTS 0-9" : "0-100"})
    Context: ${config.context}
    Biometrics: Eye Contact ${config.eyeContact.toFixed(1)}%, Smile ${config.smile.toFixed(1)}%
    ${config.sampleArticle ? `Target Topic: "${config.sampleArticle}"` : "Spontaneous Speech"}
    ${topicPoints.length > 0 ? `Required Points to Cover: ${topicPoints.join(", ")}` : ""}
    
    TASK:
    1. Transcribe the audio precisely.
    2. Calculate WPM and linguistic metrics.
    3. Score for: Fluency, Lexical, Grammar, Rhetorical.
    4. Identify covered and missing points from the required list.
    5. Provide technical feedback tips (no encouragement).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: {
        parts: [
          { text: userPrompt },
          { inlineData: { mimeType, data: base64Audio } }
        ]
      },
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            transcription: { type: Type.STRING },
            wpm: { type: Type.NUMBER },
            ielts_score: { type: Type.NUMBER, description: "IELTS 0-9 equivalent (even for non-English)" },
            score_100: { type: Type.NUMBER, description: "0-100 scale score (required if non-English)" },
            ielts_subscores: {
              type: Type.OBJECT,
              properties: {
                fluency: { type: Type.NUMBER },
                lexical: { type: Type.NUMBER },
                grammar: { type: Type.NUMBER },
                rhetorical: { type: Type.NUMBER }
              },
              required: ["fluency", "lexical", "grammar", "rhetorical"]
            },
            subscores_100: {
              type: Type.OBJECT,
              properties: {
                fluency: { type: Type.NUMBER },
                lexical: { type: Type.NUMBER },
                grammar: { type: Type.NUMBER },
                rhetorical: { type: Type.NUMBER }
              },
              required: ["fluency", "lexical", "grammar", "rhetorical"]
            },
            cefr_level: { type: Type.STRING },
            audit_report: {
              type: Type.OBJECT,
              properties: {
                points_covered: { type: Type.ARRAY, items: { type: Type.STRING } },
                points_missing: { type: Type.ARRAY, items: { type: Type.STRING } },
                technical_accuracy: { type: Type.NUMBER },
                coherence_score: { type: Type.NUMBER }
              },
              required: ["points_covered", "points_missing", "technical_accuracy", "coherence_score"]
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
      language?: string; // Optional language override
    }
  ): Promise<Partial<AnalysisMetrics>> {
    const ai = this.getAI();
    const lang = config.language || 'en';
    const isEnglish = lang.toLowerCase() === 'en' || lang.toLowerCase() === 'english';

    const systemInstruction = `You are an official IELTS Senior Examiner performing a cold, precise audit. 
    Strictly adhere to IELTS Band Descriptors for English. 
    
    SCORING LOGIC:
    - If language is English: Use IELTS 0-9 criteria for all scores.
    - If language is NOT English: Use a 0-100 scale for primary scores (score_100, subscores_100), but still provide an approximate IELTS 0-9 equivalent for the 'ielts_score' field.
    
    Output MUST be valid JSON.`;

    const prompt = `OFFICIAL AUDIT: Part ${config.part}
    Language: ${lang} (Primary Scoring Scale: ${isEnglish ? "IELTS 0-9" : "0-100"})
    Question: "${config.question}"
    Evaluate: Fluency, Lexical Resource, Grammatical Range, and Rhetorical Effectiveness.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: {
        parts: [
          { text: prompt },
          { inlineData: { mimeType, data: base64Audio } }
        ]
      },
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            transcription: { type: Type.STRING },
            wpm: { type: Type.NUMBER },
            ielts_score: { type: Type.NUMBER, description: "IELTS 0-9 equivalent" },
            score_100: { type: Type.NUMBER, description: "0-100 scale score" },
            ielts_subscores: {
              type: Type.OBJECT,
              properties: {
                fluency: { type: Type.NUMBER },
                lexical: { type: Type.NUMBER },
                grammar: { type: Type.NUMBER },
                rhetorical: { type: Type.NUMBER }
              },
              required: ["fluency", "lexical", "grammar", "rhetorical"]
            },
            subscores_100: {
              type: Type.OBJECT,
              properties: {
                fluency: { type: Type.NUMBER },
                lexical: { type: Type.NUMBER },
                grammar: { type: Type.NUMBER },
                rhetorical: { type: Type.NUMBER }
              },
              required: ["fluency", "lexical", "grammar", "rhetorical"]
            },
            cefr_level: { type: Type.STRING },
            audit_report: {
              type: Type.OBJECT,
              properties: {
                points_covered: { type: Type.ARRAY, items: { type: Type.STRING } },
                points_missing: { type: Type.ARRAY, items: { type: Type.STRING } },
                technical_accuracy: { type: Type.NUMBER },
                coherence_score: { type: Type.NUMBER }
              },
              required: ["points_covered", "points_missing", "technical_accuracy", "coherence_score"]
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
