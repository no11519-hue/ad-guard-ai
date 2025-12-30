
import React, { useState } from 'react';

interface AnalysisInputProps {
  onAnalyze: (copy: string) => void;
  isLoading: boolean;
}

const AnalysisInput: React.FC<AnalysisInputProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onAnalyze(text);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center">
            <i className="fa-solid fa-pen-nib mr-2 text-blue-600"></i>
            광고 문구 입력
          </label>
          <span className="text-xs text-slate-400">
            팁: <code className="bg-slate-100 px-1 rounded text-blue-600">/premium</code>을 포함하면 플랫폼별 대안이 추가됩니다.
          </span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="여기에 광고 문구를 입력하세요. (예: 전 세계 1위 관절 영양제, 즉시 통증 완화!)"
          className="w-full h-40 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-slate-800"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center space-x-2 ${
            isLoading 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg shadow-blue-200 active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
              <span>규제 분석 중...</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-shield-halved"></i>
              <span>컴플라이언스 검사 및 AI 라벨 생성</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AnalysisInput;
