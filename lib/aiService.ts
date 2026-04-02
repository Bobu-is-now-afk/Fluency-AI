import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnalysisMetrics } from "../types";
import { IELTS_QUESTIONS } from "../constants";

export class LinguisticCoachService {
  /**
   * 獲取 AI 實例
   */
  public getAI() {
      // 移除 process.env，只保留 Vite 的標準讀取方式
      const env = (import.meta as any).env;
      const key = env?.VITE_GEMINI_API_KEY;
      
      if (!key) throw new Error("VITE_GEMINI_API_KEY is missing");
      return new GoogleGenerativeAI(key);
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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 設定 Prompt
    const prompt = `You are a professional linguistic auditor. 
    Analyze the following audio for fluency, grammar, and pronunciation.
    Return the result ONLY as a JSON object.
    
    Context: ${config.context}
    Language: ${config.language}`;

    // 使用官方推薦的 generateContent 結構
    const result = await model.generateContent([
      { text: prompt },
      { inlineData: { mimeType, data: base64Audio } }
    ]);

    const response = await result.response;
    const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
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

    const prompt = `OFFICIAL IELTS AUDIT: Part ${config.part}, Question: "${config.question}"`;

    const result = await model.generateContent([
      { text: prompt },
      { inlineData: { mimeType, data: base64Audio } }
    ]);

    const response = await result.response;
    const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(text);
  }
}

export const coachService = new LinguisticCoachService();
