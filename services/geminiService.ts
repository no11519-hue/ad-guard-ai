// services/geminiService.ts

import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AdAnalysisResultType } from '../types';
import { GEMINI_MODEL, GEMINI_RESPONSE_SCHEMA, FIXED_DISCLAIMER } from '../constants';

/**
 * Analyzes the provided ad copy using the Gemini API and returns structured results.
 * @param adCopy The ad copy string to be analyzed.
 * @returns A Promise that resolves to an AdAnalysisResultType object.
 * @throws An error if the API call fails or returns an invalid response.
 */
export async function analyzeAdCopy(adCopy: string): Promise<AdAnalysisResultType> {
  // CRITICAL: Create a new GoogleGenAI instance right before making an API call
  // to ensure it always uses the most up-to-date API key from the dialog.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // System instruction to define the AI's role and strict adherence to rules.
  const systemInstruction = `
    당신은 '광고 문구 안전 점검 + AI 생성 광고 표기(라벨) 문구' 전문가입니다.
    사용자가 제공한 광고 문구를 읽고, 다음 원칙을 엄격히 준수하여 빠르게 "표기 문구 + 위험표현 수정 + 플랫폼별 문구"를 제공합니다.

    중요 원칙:
    - 법률 자문이 아닌 "일반적인 안전 가이드"입니다. 마지막 줄에 반드시 고지합니다. (이 문구는 고정된 값 '${FIXED_DISCLAIMER}'을 사용해야 합니다.)
    - 근거 없는 확정/보장 표현(예: 100%, 무조건, 완치, 부작용 0%, 수익 보장 등)은 위험으로 분류하고 완화합니다.
    - 혐오/비하/폭력/성적/불법 조장 문구는 생성하지 않습니다.
    - 규정/정책은 플랫폼·시점에 따라 달라질 수 있으니 "확정적 법조문/심의 통과 보장"은 하지 않습니다.

    출력은 반드시 JSON 형식으로, 다음 스키마를 따릅니다:
    ${JSON.stringify(GEMINI_RESPONSE_SCHEMA)}
    주의: disclaimer 필드에는 오직 '${FIXED_DISCLAIMER}' 문자열만 포함되어야 합니다.
  `;

  // User prompt combining the system instruction with the actual ad copy.
  const userPrompt = `다음 광고 문구를 분석해 주세요:\n\n\`\`\`\n${adCopy}\n\`\`\`\n\n지정된 JSON 형식으로 결과를 제공해 주세요.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        // Cast to any because the Type enum might not perfectly match the library's internal SchemaType,
        // but the structure itself is compliant.
        responseSchema: GEMINI_RESPONSE_SCHEMA as any,
        temperature: 0.7, // Adjust temperature for balanced creativity and adherence to instructions
        topP: 0.95,
        topK: 64,
      },
    });

    const jsonString = response.text.trim();
    if (!jsonString) {
      throw new Error('API did not return a valid JSON string for analysis.');
    }

    // Attempt to parse the JSON response from the model.
    const result: AdAnalysisResultType = JSON.parse(jsonString);

    // Ensure the fixed disclaimer is explicitly set from constants,
    // overriding any potential variations from the AI.
    result.disclaimer = FIXED_DISCLAIMER;

    return result;

  } catch (error: any) {
    // Specific error handling for API key issues
    if (error.message.includes("Requested entity was not found.")) {
      console.error("API Key error: Requested entity was not found. Prompting user to select key.");
      // Assuming window.aistudio.openSelectKey exists globally as per guidelines.
      if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
        await window.aistudio.openSelectKey();
      } else {
        console.warn("window.aistudio.openSelectKey is not available. Cannot prompt for API key.");
      }
      // Re-throw to allow the UI to show an error and potentially trigger a re-analysis.
      throw new Error("API Key might be invalid or not selected. Please select a valid API key.");
    }
    console.error('Error analyzing ad copy:', error);
    // Generic error message for other API failures
    throw new Error(`광고 문구 분석 실패: ${error.message || '알 수 없는 오류가 발생했습니다.'}`);
  }
}