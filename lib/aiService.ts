import { GoogleGenAI } from "@google/genai";
import { AnalysisMetrics } from "../types";
import { IELTS_QUESTIONS } from "../constants";

export class LinguisticCoachService {
  public getAI() {
    const env = (import.meta as any)["env"] || {};
    const key = env.VITE_GEMINI_API_KEY || (process.env as any).VITE_GEMINI_API_KEY;
    
    if (!key) throw new Error("Missing API Key");
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
    
    // 重點：在舊版 SDK 中，必須先獲取 model 實例
    // 如果 getGenerativeModel 報錯，請嘗試 ai.models.get("gemini-1.5-flash")
    const model = (ai as any).getGenerativeModel ? 
                  (ai as any).getGenerativeModel({ model: "gemini-1.5-flash" }) : 
                  (ai as any).models.get({ model: "gemini-1.5-flash" });

    const userPrompt = `AUDIT REQUEST: Duration: ${config.duration}s, Context: ${config.context}`;

    // 呼叫方法必須在 model 實例上
    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [
          { text: userPrompt },
          { inlineData: { mimeType, data: base64Audio } }
        ]
      }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const response = await result.response;
    const text = response.text();
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
    const model = (ai as any).getGenerativeModel ? 
                  (ai as any).getGenerativeModel({ model: "gemini-1.5-flash" }) : 
                  (ai as any).models.get({ model: "gemini-1.5-flash" });

    const prompt = `OFFICIAL AUDIT: Part ${config.part}, Question: "${config.question}"`;

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [
          { text: prompt },
          { inlineData: { mimeType, data: base64Audio } }
        ]
      }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const response = await result.response;
    return JSON.parse(response.text());
  }
}

export const coachService = new LinguisticCoachService();
