
import React from 'react';
import { Language } from '../types';

interface HeaderProps {
  currentLang: Language;
  onLangChange: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ currentLang, onLangChange }) => {
  return (
    <header className="h-24 flex items-center transition-all duration-500">
      <div className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 bg-[#064e3b] text-white flex items-center justify-center font-black text-2xl rounded-2xl shadow-xl transition-transform group-hover:rotate-12">Z</div>
          <span className="font-black tracking-[0.3em] text-slate-800 text-sm uppercase">Zeenat</span>
        </div>
        
        <div className="flex bg-white/40 backdrop-blur-xl p-1 rounded-full border border-slate-100 shadow-xl">
          {[
            { id: Language.UR, label: 'اردو' },
            { id: Language.EN, label: 'EN' }
          ].map(lang => (
            <button 
              key={lang.id}
              onClick={() => onLangChange(lang.id)}
              className={`px-6 py-2 rounded-full text-[10px] font-black transition-all tracking-widest ${currentLang === lang.id ? 'bg-[#064e3b] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
