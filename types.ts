// types.ts

import { Type } from "@google/genai"; // Import Type enum for responseSchema

/**
 * Represents the risk level of the ad copy.
 */
export type RiskLevel = '안전' | '주의' | '위험';

/**
 * Interface for a problematic phrase identified in the ad copy,
 * including the reason for its risk and a suggested alternative.
 */
export interface RiskyExpression {
  problematicPhrase: string;
  reason: string;
  alternativePhrase: string;
}

/**
 * The complete structure of the ad copy analysis result returned by the AI.
 */
export interface AdAnalysisResultType {
  summary: {
    riskLevel: RiskLevel;
    comment: string;
  };
  aiLabels: {
    shortVersion: string;
    longVersion: string;
  };
  riskyExpressions: RiskyExpression[];
  platformSpecific: {
    instagramShorts: string;
    naverBlog: string;
    kakaoTalkText: string;
  };
  checklist: string[];
  disclaimer: string;
}

/**
 * Defines the strict JSON schema expected from the Gemini API for the ad analysis result.
 * This ensures the AI generates output in a predictable and parseable format.
 */
export interface GeminiResponseSchema {
  type: Type.OBJECT;
  properties: {
    summary: {
      type: Type.OBJECT;
      properties: {
        riskLevel: {
          type: Type.STRING;
          enum: RiskLevel[];
          description: '광고 문구의 위험도: 안전, 주의, 위험 중 하나입니다.';
        };
        comment: {
          type: Type.STRING;
          description: '광고 문구에 대한 한 줄 코멘트입니다.';
        };
      };
      required: ['riskLevel', 'comment'];
      propertyOrdering: ['riskLevel', 'comment'];
    };
    aiLabels: {
      type: Type.OBJECT;
      properties: {
        shortVersion: {
          type: Type.STRING;
          description: '15자 내외의 짧은 AI 광고 표기 문구입니다.';
        };
        longVersion: {
          type: Type.STRING;
          description: '1~2문장 길이의 긴 AI 광고 표기 문구입니다.';
        };
      };
      required: ['shortVersion', 'longVersion'];
      propertyOrdering: ['shortVersion', 'longVersion'];
    };
    riskyExpressions: {
      type: Type.ARRAY;
      items: {
        type: Type.OBJECT;
        properties: {
          problematicPhrase: {
            type: Type.STRING;
            description: '위험하다고 판단된 문구입니다.';
          };
          reason: {
            type: Type.STRING;
            description: '왜 위험한지 1줄로 설명합니다.';
          };
          alternativePhrase: {
            type: Type.STRING;
            description: '문제 문구를 대체할 1줄 문장입니다.';
          };
        };
        required: ['problematicPhrase', 'reason', 'alternativePhrase'];
        propertyOrdering: ['problematicPhrase', 'reason', 'alternativePhrase'];
      };
      description: '위험 표현 3개와 대체 문장 목록입니다. 최대 3개까지 생성됩니다.';
    };
    platformSpecific: {
      type: Type.OBJECT;
      properties: {
        instagramShorts: {
          type: Type.STRING;
          description: '인스타/쇼츠에 적합한 짧은 문구입니다.';
        };
        naverBlog: {
          type: Type.STRING;
          description: '네이버/블로그에 적합한 설명형 문구입니다.';
        };
        kakaoTalkText: {
          type: Type.STRING;
          description: '카톡/문자에 적합한 친근한 문구입니다.';
        };
      };
      required: ['instagramShorts', 'naverBlog', 'kakaoTalkText'];
      propertyOrdering: ['instagramShorts', 'naverBlog', 'kakaoTalkText'];
    };
    checklist: {
      type: Type.ARRAY;
      items: {
        type: Type.STRING;
        description: '바로 적용할 수 있는 5가지 체크리스트 항목입니다.';
      };
      description: '바로 적용 체크리스트 5개 항목입니다.';
    };
    disclaimer: {
      type: Type.STRING;
      description: '고정된 법률 자문 고지 문구입니다.';
    };
  };
  required: ['summary', 'aiLabels', 'riskyExpressions', 'platformSpecific', 'checklist', 'disclaimer'];
  propertyOrdering: ['summary', 'aiLabels', 'riskyExpressions', 'platformSpecific', 'checklist', 'disclaimer'];
}