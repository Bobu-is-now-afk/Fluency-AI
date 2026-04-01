import { GoogleGenAI } from "@google/genai";
import { AnalysisMetrics } from "../types";
import { IELTS_QUESTIONS } from "../constants";

/**
 * LinguisticCoachService: 兼容舊版 SDK 的評核引擎。
 */
export class LinguisticCoachService {
  public getAI() {
    // 優先嘗試從 Vite 標準路徑讀取，失敗則嘗試從 process.env 讀取（針對某些 Node 構建環境）
    const key = (import.meta as any).env?.VITE_GEMINI_API_KEY || 
                (process.env as any).VITE_GEMINI_API_KEY;

    if (!key) {
      // 這行日誌會幫你在瀏覽器 Console 確定到底是誰沒抓到
      console.error("Critical: VITE_GEMINI_API_KEY is not defined in any environment source.");
      throw new Error("Missing API Key");
    }
    
    return new GoogleGenAI({ apiKey: key });
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
