
import React, { useState } from 'react';

const VoiceInput: React.FC = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="relative group">
      <button 
        onClick={() => setActive(!active)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 border-4 border-white ${
          active ? 'bg-red-500 scale-110 animate-pulse' : 'bg-[#064e3b] hover:bg-[#053d2e]'
        }`}
      >
        <i className={`fas ${active ? 'fa-stop' : 'fa-microphone'} text-white text-xl`}></i>
      </button>
      
      {active && (
        <div className="absolute bottom-20 right-0 bg-white p-4 rounded-3xl shadow-2xl border border-slate-50 w-64 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex gap-1 mb-3">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex-1 h-8 bg-emerald-100 rounded-full animate-bounce" style={{animationDelay: `${i*0.1}s`}}></div>
            ))}
          </div>
          <p className="text-xs font-bold text-emerald-800 text-center urdu-text">بولنا شروع کریں...</p>
        </div>
      )}
    </div>
  );
};

export default VoiceInput;
