import { GoogleGenAI } from "@google/genai";
import { AnalysisMetrics } from "../types";
import { IELTS_QUESTIONS } from "../constants";

/**
 * LinguisticCoachService: 兼容舊版 SDK 的評核引擎。
 */
export class LinguisticCoachService {
  public getAI() {
    // 解決 ImportMeta 報錯
    const key = (import.meta as any)["env"].VITE_GEMINI_API_KEY;
    if (!key) throw new Error("Missing VITE_GEMINI_API_KEY");
    return new GoogleGenAI({ apiKey: key });
  }

  private getTopicPoints(topicTitle: string): string[] {
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
    const isEnglish = config.language.toLowerCase() === 'en' || config.language.toLowerCase() === 'english';

    const systemInstruction = `You are a high-precision linguistic auditor. Output MUST be valid JSON.`;
    const userPrompt = `AUDIT REQUEST: Duration: ${config.duration}s, Context: ${config.context}`;

    // 修正：針對舊版 SDK 的調用方式
    // 在舊版中，generateContent 是直接在 ai.models 上執行的
    const response = await (ai as any).models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{
        role: "user",
        parts: [
          { text: userPrompt },
          { inlineData: { mimeType, data: base64Audio } }
        ]
      }],
      config: {
        systemInstruction,
        responseMimeType: "application/json"
      }
    });

    // 舊版 SDK 的 response 結構通常直接包含 text
    const text = response.text;
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
    const prompt = `OFFICIAL AUDIT: Part ${config.part}, Question: "${config.question}"`;

    const response = await (ai as any).models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{
        role: "user",
        parts: [
          { text: prompt },
          { inlineData: { mimeType, data: base64Audio } }
        ]
      }],
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    return JSON.parse(text);
  }
}

export const coachService = new LinguisticCoachService();
