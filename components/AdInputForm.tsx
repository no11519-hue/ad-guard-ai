// components/AdInputForm.tsx

import React, { useState, useCallback } from 'react';

interface AdInputFormProps {
  onAnalyze: (adCopy: string) => void;
  isLoading: boolean;
}

/**
 * AdInputForm component provides a text area for users to paste their ad copy
 * and a button to initiate the analysis.
 */
const AdInputForm: React.FC<AdInputFormProps> = ({ onAnalyze, isLoading }) => {
  const [adCopy, setAdCopy] = useState<string>('');

  /**
   * Handles the form submission, triggering the analysis callback if ad copy is present.
   * Uses useCallback to prevent unnecessary re-renders.
   */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (adCopy.trim()) {
      onAnalyze(adCopy);
    }
  }, [adCopy, onAnalyze]); // Dependencies for useCallback

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-xl mb-8 border border-gray-200">
      <label htmlFor="ad-copy" className="block text-xl font-bold text-gray-800 mb-3">
        광고 문구 입력
      </label>
      <textarea
        id="ad-copy"
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 ease-in-out text-gray-700 resize-y min-h-[180px] text-base"
        rows={8}
        placeholder="분석할 광고 문구를 여기에 붙여넣으세요... (예: 100% 만족 보장! 단 7일 만에 완벽한 피부를 경험하세요!)"
        value={adCopy}
        onChange={(e) => setAdCopy(e.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        disabled={isLoading || !adCopy.trim()} // Disable if loading or no text
      >
        {isLoading ? '분석 중...' : '문구 안전 점검 및 AI 광고 생성'}
      </button>
    </form>
  );
};

export default AdInputForm;