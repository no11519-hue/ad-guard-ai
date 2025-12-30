// components/AdAnalysisResult.tsx

import React from 'react';
import { AdAnalysisResultType, RiskyExpression, RiskLevel } from '../types';

interface AdAnalysisResultProps {
  result: AdAnalysisResultType | null;
  error: string | null;
}

/**
 * Determines the Tailwind CSS classes for styling the risk level indicator.
 * @param riskLevel The risk level ('안전', '주의', '위험').
 * @returns Tailwind CSS class string.
 */
const getRiskLevelClass = (riskLevel: RiskLevel) => {
  switch (riskLevel) {
    case '안전':
      return 'text-green-800 bg-green-100 border-green-200';
    case '주의':
      return 'text-yellow-800 bg-yellow-100 border-yellow-200';
    case '위험':
      return 'text-red-800 bg-red-100 border-red-200';
    default:
      return 'text-gray-800 bg-gray-100 border-gray-200';
  }
};

/**
 * AdAnalysisResult component displays the detailed analysis of the ad copy.
 * It shows the risk summary, AI-generated labels, problematic phrases with alternatives,
 * platform-specific copy variations, and a checklist.
 * It also handles error display and provides an API key selection button.
 */
const AdAnalysisResult: React.FC<AdAnalysisResultProps> = ({ result, error }) => {
  // Display error message if an error occurred during analysis
  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg shadow-xl border border-red-300 text-red-800 mb-8">
        <h3 className="text-2xl font-bold mb-3">오류 발생!</h3>
        <p className="text-lg leading-relaxed">{error}</p>
        {error.includes("API Key might be invalid") && (
            <p className="mt-4 text-base">
                API 키가 유효하지 않거나 선택되지 않았을 수 있습니다.
                오른쪽 하단의 "Select API Key" 버튼을 눌러 유료 GCP 프로젝트의 API 키를 선택해 주세요.
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline ml-2 font-medium">
                    [청구 문서 바로가기]
                </a>
            </p>
        )}
        <ApiKeySelectionButton /> {/* Keep the API key selection button visible */}
      </div>
    );
  }

  // If no result and no error, render nothing (e.g., before first analysis)
  if (!result) {
    return <ApiKeySelectionButton />; // Show only the button if no content yet.
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-indigo-200 pb-4">
        광고 문구 분석 결과
      </h2>

      {/* 1) 결과 요약 */}
      <section className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">1) 결과 요약</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <p className="text-lg">
            <span className="font-semibold text-gray-700">위험도:</span>{' '}
            <span className={`px-4 py-1.5 rounded-full text-base font-bold inline-flex items-center justify-center border ${getRiskLevelClass(result.summary.riskLevel)}`}>
              {result.summary.riskLevel}
            </span>
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-700">한 줄 코멘트:</span> {result.summary.comment}
          </p>
        </div>
      </section>

      {/* 2) AI 광고 표기(라벨) 문구 2종 */}
      <section className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">2) AI 광고 표기(라벨) 문구 2종</h3>
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-lg">
            <span className="font-semibold text-gray-700">짧은 버전 (15자 내외):</span> {result.aiLabels.shortVersion}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-gray-700">긴 버전 (1~2문장):</span> {result.aiLabels.longVersion}
          </p>
        </div>
      </section>

      {/* 3) 위험 표현 & 대체 문장 */}
      <section className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          3) 위험 표현 {result.riskyExpressions.length}개 & 대체 문장
        </h3>
        {result.riskyExpressions.length > 0 ? (
          <ul className="space-y-5">
            {result.riskyExpressions.map((item: RiskyExpression, index: number) => (
              <li key={index} className="border-l-4 border-red-500 pl-4 py-3 bg-red-50 rounded-r-lg shadow-sm">
                <p className="text-lg mb-1"><span className="font-bold text-red-700">문제 문구:</span> {item.problematicPhrase}</p>
                <p className="text-base text-gray-700 mb-1"><span className="font-semibold">왜 위험 (1줄):</span> {item.reason}</p>
                <p className="text-lg"><span className="font-bold text-green-700">대체 문장 (1줄):</span> {item.alternativePhrase}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-600 p-4 bg-green-50 rounded-lg border border-green-200">
            ✅ 현재 문구에서 명확한 위험 표현이 감지되지 않았습니다.
          </p>
        )}
      </section>

      {/* 4) 플랫폼용 문구 변환 (3종) */}
      <section className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">4) 플랫폼용 문구 변환 (3종)</h3>
        <ul className="space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <li className="p-3 bg-purple-100 rounded-md">
            <p className="text-lg"><span className="font-semibold text-purple-800">인스타/쇼츠용 (짧게):</span> {result.platformSpecific.instagramShorts}</p>
          </li>
          <li className="p-3 bg-purple-100 rounded-md">
            <p className="text-lg"><span className="font-semibold text-purple-800">네이버/블로그용 (설명형):</span> {result.platformSpecific.naverBlog}</p>
          </li>
          <li className="p-3 bg-purple-100 rounded-md">
            <p className="text-lg"><span className="font-semibold text-purple-800">카톡/문자용 (친근):</span> {result.platformSpecific.kakaoTalkText}</p>
          </li>
        </ul>
      </section>

      {/* 5) 바로 적용 체크리스트 (5개) */}
      <section className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">5) 바로 적용 체크리스트 (5개)</h3>
        <ul className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          {result.checklist.map((item: string, index: number) => (
            <li key={index} className="text-lg flex items-start">
              <span className="text-blue-600 mr-2 mt-0.5">✔️</span> {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Disclaimer */}
      <p className="mt-8 text-sm text-gray-500 border-t border-gray-200 pt-4 text-center">
        {result.disclaimer}
      </p>

      {/* API Key Selection Button - Fixed position for easy access */}
      <ApiKeySelectionButton />
    </div>
  );
};

/**
 * Helper component for API Key selection, making it persistent on the screen.
 */
const ApiKeySelectionButton: React.FC = () => {
    const handleSelectApiKey = async () => {
        // Check if window.aistudio and its openSelectKey method exist globally
        if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
            await window.aistudio.openSelectKey();
            // Assuming success after triggering the dialog.
            // No need to wait for hasSelectedApiKey() immediately due to race condition.
        } else {
            alert("API Key 선택 기능이 이 환경에서 지원되지 않습니다.");
        }
    };

    return (
        <button
            onClick={handleSelectApiKey}
            className="fixed bottom-4 right-4 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-xl transition duration-300 ease-in-out z-50 text-base"
        >
            Select API Key
        </button>
    );
};

export default AdAnalysisResult;