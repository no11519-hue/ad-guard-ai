import React, { useState, useCallback, useEffect } from 'react';
import AdInputForm from './components/AdInputForm';
import AdAnalysisResult from './components/AdAnalysisResult';
import LoadingSpinner from './components/LoadingSpinner';
import { AdAnalysisResultType } from './types';
import { analyzeAdCopy } from './services/geminiService';

// Declare global window properties for AI Studio API key management
// REMOVED: The window.aistudio properties are assumed to be pre-configured, valid, and accessible.
// Declaring them here can cause conflicts with existing global declarations.

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AdAnalysisResultType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles the ad copy analysis request.
   * @param adCopy The ad copy string to be analyzed.
   */
  const handleAnalyze = useCallback(async (adCopy: string) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null); // Clear previous results before new analysis
    try {
      const result = await analyzeAdCopy(adCopy);
      setAnalysisResult(result);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || '광고 문구 분석 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Effect hook to check and prompt for API key selection on initial component mount.
   * This ensures the user is guided to select a key if one isn't already chosen.
   */
  useEffect(() => {
    const checkAndPromptApiKey = async () => {
      // Check if window.aistudio and its methods exist before calling them
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey && typeof window.aistudio.openSelectKey === 'function') {
          // Only open the selection dialog if no key is selected initially.
          // This prevents the dialog from popping up on every refresh if a key is already selected.
          await window.aistudio.openSelectKey();
        }
      }
    };
    checkAndPromptApiKey();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps - Runs only once on mount

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl text-center py-8 mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-800 leading-tight">
          광고 문구 안전 점검 & AI 생성 라벨
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          사용자 맞춤형 광고 문구의 위험도를 분석하고, AI 생성 라벨 및 플랫폼별 최적화 문구를 제공합니다.
        </p>
      </header>

      <main className="w-full max-w-4xl">
        <AdInputForm onAnalyze={handleAnalyze} isLoading={isLoading} />
        {isLoading && <LoadingSpinner />}
        {(analysisResult || error) && <AdAnalysisResult result={analysisResult} error={error} />}
      </main>
    </div>
  );
};

export default App;