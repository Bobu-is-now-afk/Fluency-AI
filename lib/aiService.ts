import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnalysisMetrics } from "../types";
import { IELTS_QUESTIONS } from "../constants";

/**
 * LinguisticCoachService: 修正後的專業評核引擎。
 * 解決了 ImportMeta 錯誤與 SDK 調用語法問題。
 */
export class LinguisticCoachService {
  /**
   * 獲取 AI 實例，解決 TS2339 錯誤。
   */
  public getAI() {
    // 使用中括號語法避開型別檢查，解決 Property 'env' does not exist 錯誤
    const key = (import.meta as any)["env"].VITE_GEMINI_API_KEY;
    if (!key) throw new Error("Missing VITE_GEMINI_API_KEY in environment");
    return new GoogleGenerativeAI(key);
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
    const genAI = this.getAI();
    const isEnglish = config.language.toLowerCase() === 'en' || config.language.toLowerCase() === 'english';

    // 1. 取得模型實例 (注意：這是一個 method，不是 get accessor)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemInstruction = `You are a high-precision linguistic auditor for a professional fluency assessment platform. 
    Your tone is cold, clinical, and strictly analytical.
    Output MUST be valid JSON.`;

    const userPrompt = `AUDIT REQUEST:
    Duration: ${config.duration}s
    Language: ${config.language} (Primary Scoring Scale: ${isEnglish ? "IELTS 0-9" : "0-100"})
    Context: ${config.context}
    Biometrics: Eye Contact ${config.eyeContact.toFixed(1)}%, Smile ${config.smile.toFixed(1)}%`;

    // 2. 使用標準的 generateContent 調用方式
    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [
          { text: userPrompt },
          { inlineData: { mimeType, data: base64Audio } }
        ]
      }],
      generationConfig: {
        responseMimeType: "application/json",
      },
      systemInstruction: {
        role: "system",
        parts: [{ text: systemInstruction }]
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
    const genAI = this.getAI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `OFFICIAL AUDIT: Part ${config.part}
    Question: "${config.question}"`;

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [
          { text: prompt },
          { inlineData: { mimeType, data: base64Audio } }
        ]
      }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const response = await result.response;
    const text = response.text();
    return JSON.parse(text);
  }
}

export const coachService = new LinguisticCoachService();
