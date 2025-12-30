// components/LoadingSpinner.tsx
import React from 'react';

/**
 * A simple loading spinner component with an accompanying text.
 */
const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-4 my-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      <p className="ml-3 text-lg font-medium text-indigo-700">분석 중...</p>
    </div>
  );
};

export default LoadingSpinner;