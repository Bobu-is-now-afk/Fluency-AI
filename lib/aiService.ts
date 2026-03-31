import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { AnalysisMetrics } from "../types";
import { IELTS_QUESTIONS } from "../constants";

/**
 * LinguisticCoachService: 專業流利度評核引擎。
 * 修正了型別定義與 API 調用邏輯。
 */
export class LinguisticCoachService {
  /**
   * 獲取 AI 實例，修正了 Vite 環境下的變數讀取與型別斷言。
   */
  public getAI() {
    const key = (import.meta as any).env.VITE_GEMINI_API_KEY;
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
    const topicPoints = config.sampleArticle ? this.getTopicPoints(config.sampleArticle) : [];
    const isEnglish = config.language.toLowerCase() === 'en' || config.language.toLowerCase() === 'english';

    const systemInstruction = `You are a high-precision linguistic auditor for a professional fluency assessment platform. 
    Your tone is cold, clinical, and strictly analytical.
    Output MUST be valid JSON conforming to the diagnostic dashboard schema.`;

    const userPrompt = `AUDIT REQUEST:
    Duration: ${config.duration}s
    Language: ${config.language} (Primary Scoring Scale: ${isEnglish ? "IELTS 0-9" : "0-100"})
    Context: ${config.context}
    Biometrics: Eye Contact ${config.eyeContact.toFixed(1)}%, Smile ${config.smile.toFixed(1)}%
    ${config.sampleArticle ? `Target Topic: "${config.sampleArticle}"` : "Spontaneous Speech"}
    ${topicPoints.length > 0 ? `Required Points to Cover: ${topicPoints.join(", ")}` : ""}`;

    // 使用 getGenerativeModel 替代 models.generateContent
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction
    });

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
      }
    });

    const response = await result.response;
    const text = response.text();
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
    const genAI = this.getAI();
    const lang = config.language || 'en';
    const isEnglish = lang.toLowerCase() === 'en' || lang.toLowerCase() === 'english';

    const systemInstruction = `You are an official IELTS Senior Examiner performing a cold, precise audit. 
    Output MUST be valid JSON.`;

    const prompt = `OFFICIAL AUDIT: Part ${config.part}
    Language: ${lang}
    Question: "${config.question}"`;

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction
    });

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
    if (!text) throw new Error("Audit failed: Empty response from AI.");
    return JSON.parse(text);
  }
}

export const coachService = new LinguisticCoachService();
