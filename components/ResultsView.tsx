import React, { useState } from 'react';
// Removed .ts extension to fix module resolution and adhere to TS best practices
import { AnalysisResult } from '../types';

interface ResultsViewProps {
  result: AnalysisResult;
}

const ResultsView: React.FC<ResultsViewProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const risksText = result.risks
      .map((r, i) => `${i + 1}. ${r.word}: ${r.reason}`)
      .join('\n');

    const fullText = `
[🏷️ AI 광고 필수 표기]
${result.label}

[⚠️ 위험 요소 분석]
${risksText}

[✨ 세이프티 대체안]
${result.safetyAlternative}

---
출처: AD-Guard AI (https://no11519-hue.github.io/ad-guard-ai/)
Powered by AD-Guard AI
    `.trim();

    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-slate-800">분석 결과 리포트</h3>
        <button
          onClick={handleCopy}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
            copied 
              ? 'bg-emerald-500 text-white' 
              : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
          }`}
        >
          {copied ? (
            <>
              <i className="fa-solid fa-check"></i>
              <span>복사되었습니다!</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-copy"></i>
              <span>결과 전체 복사하기</span>
            </>
          )}
        </button>
      </div>

      <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-blue-900 font-bold mb-3 flex items-center">
          <i className="fa-solid fa-tag mr-2"></i>
          🏷️ AI 광고 필수 표기 (라벨)
        </h3>
        <div className="bg-white p-4 rounded-xl border border-blue-200 text-blue-800 font-medium">
          {result.label}
        </div>
        <p className="mt-2 text-xs text-blue-600 italic">
          * 2026년 시행 예정인 생성형 AI 콘텐츠 표기 의무 지침을 준수한 권장 문구입니다.
        </p>
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-slate-900 font-bold mb-4 flex items-center">
          <i className="fa-solid fa-triangle-exclamation text-amber-500 mr-2"></i>
          ⚠️ 위험 요소 분석 (TOP 3)
        </h3>
        <div className="space-y-3">
          {result.risks.map((risk, index) => (
            <div key={index} className="flex items-start p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                {index + 1}
              </span>
              <div>
                <span className="font-bold text-red-600 block mb-1">{risk.word}</span>
                <p className="text-sm text-slate-600 leading-relaxed">{risk.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-emerald-900 font-bold mb-3 flex items-center">
          <i className="fa-solid fa-wand-magic-sparkles mr-2 text-emerald-600"></i>
          ✨ 10초 세이프티 대체안
        </h3>
        <div className="bg-white p-5 rounded-xl border border-emerald-200 shadow-inner text-slate-800 leading-relaxed font-medium">
          {result.safetyAlternative}
        </div>
        <p className="mt-2 text-xs text-emerald-700 italic text-center">
          법적 리스크를 제거하면서도 소비자의 신뢰를 높이는 세련된 표현입니다.
        </p>
      </section>
    </div>
  );
};

export default ResultsView;