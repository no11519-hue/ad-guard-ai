
import React from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOpenKeySelector = async () => {
    try {
      if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
        await window.aistudio.openSelectKey();
        onClose();
        // 실제 연동 시 키 선택 후 페이지가 갱신되거나 환경변수가 즉시 반영됩니다.
      } else {
        alert("이 환경에서는 자동 키 선택 기능을 사용할 수 없습니다. 환경 변수를 확인해주세요.");
      }
    } catch (error) {
      console.error("Key selection failed", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-gear text-xl"></i>
            <h3 className="text-xl font-bold">서비스 설정</h3>
          </div>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>
        
        <div className="p-8 space-y-6">
          <section>
            <h4 className="text-slate-900 font-bold mb-2 flex items-center">
              <i className="fa-solid fa-key text-blue-500 mr-2"></i>
              Google Gemini API 키
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              AD-Guard AI는 Google의 최신 Gemini 모델을 사용하여 분석을 수행합니다. 
              서비스를 이용하시려면 본인의 API 키 등록이 필요합니다.
            </p>
            
            <button
              onClick={handleOpenKeySelector}
              className="w-full py-4 bg-blue-50 hover:bg-blue-100 border-2 border-dashed border-blue-300 rounded-2xl text-blue-700 font-bold transition-all flex items-center justify-center space-x-2 active:scale-[0.98]"
            >
              <i className="fa-solid fa-square-plus text-lg"></i>
              <span>API 키 설정/변경하기</span>
            </button>
          </section>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div className="text-xs text-slate-500 space-y-2">
              <div className="flex items-start">
                <i className="fa-solid fa-circle-info mt-0.5 mr-2 text-blue-400"></i>
                <span>
                  API 키가 없으신가요? <br/>
                  <a 
                    href="https://aistudio.google.com/app/apikey" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 font-bold underline hover:text-blue-800"
                  >
                    Google AI Studio에서 무료로 발급받기
                  </a>
                </span>
              </div>
              <div className="flex items-start">
                <i className="fa-solid fa-credit-card mt-0.5 mr-2 text-indigo-400"></i>
                <span>
                  <a 
                    href="https://ai.google.dev/gemini-api/docs/billing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 font-bold underline hover:text-indigo-800"
                  >
                    결제 및 프로젝트 설정 가이드 (Billing Info)
                  </a>
                  <br/>
                  * 유료 등급 API 키(Paid project)가 권장됩니다.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 pb-8">
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
          >
            설정 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
