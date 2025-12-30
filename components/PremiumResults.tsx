import React from 'react';
// Removed .ts extension to fix module resolution and adhere to TS best practices
import { PremiumContent } from '../types';

interface PremiumResultsProps {
  premium: PremiumContent;
}

const PremiumResults: React.FC<PremiumResultsProps> = ({ premium }) => {
  return (
    <div className="mt-10 pt-10 border-t-2 border-dashed border-indigo-200 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center space-x-2 mb-6">
        <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Premium</span>
        <h2 className="text-xl font-bold text-slate-800">플랫폼별 맞춤 확장 콘텐츠</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <i className="fa-brands fa-instagram text-6xl text-pink-600"></i>
          </div>
          <h4 className="font-bold text-slate-800 mb-3 flex items-center">
            <i className="fa-brands fa-instagram text-pink-600 mr-2"></i> 인스타그램
          </h4>
          <div className="text-sm text-slate-600 whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-100 min-h-[120px]">
            {premium.instagram}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <i className="fa-brands fa-youtube text-6xl text-red-600"></i>
          </div>
          <h4 className="font-bold text-slate-800 mb-3 flex items-center">
            <i className="fa-brands fa-youtube text-red-600 mr-2"></i> 유튜브 후킹 자막
          </h4>
          <div className="text-sm text-slate-600 whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-100 min-h-[120px]">
            {premium.youtube}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm md:col-span-2 overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-newspaper text-6xl text-emerald-600"></i>
          </div>
          <h4 className="font-bold text-slate-800 mb-3 flex items-center">
            <i className="fa-solid fa-newspaper text-emerald-600 mr-2"></i> 네이버 블로그 (정보성 장문)
          </h4>
          <div className="text-sm text-slate-600 whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-100">
            {premium.naverBlog}
          </div>
        </div>

        <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-6 shadow-sm md:col-span-2">
          <h4 className="font-bold text-indigo-900 mb-4 flex items-center">
            <i className="fa-solid fa-mouse-pointer mr-2"></i> 랜딩 페이지 CTA 버튼 문구
          </h4>
          <div className="flex flex-wrap gap-4">
            {premium.landingPage.map((cta, i) => (
              <button key={i} className="bg-white border-2 border-indigo-200 px-6 py-3 rounded-full text-indigo-700 font-bold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm">
                {cta}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumResults;