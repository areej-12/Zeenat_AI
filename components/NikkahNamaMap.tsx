
import React, { useState } from 'react';
import { NIKKAH_COLUMNS } from '../constants';

interface NikkahNamaMapProps {
  onHotspotClick: (id: number) => void;
}

const NikkahNamaMap: React.FC<NikkahNamaMapProps> = ({ onHotspotClick }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const page1Hotspots = [
    { id: 1, top: '15%', left: '50%' },
    { id: 2, top: '23%', left: '50%' },
    { id: 3, top: '31%', left: '50%' },
    { id: 4, top: '39%', left: '50%' },
    { id: 5, top: '47%', left: '50%' },
    { id: 6, top: '55%', left: '50%' },
    { id: 13, top: '63%', left: '50%' },
    { id: 14, top: '71%', left: '50%' },
    { id: 15, top: '79%', left: '50%' },
  ];

  const page2Hotspots = [
    { id: 16, top: '15%', left: '50%' },
    { id: 17, top: '23%', left: '50%', priority: true }, // Column 17 Highlight
    { id: 18, top: '31%', left: '50%' },
    { id: 19, top: '39%', left: '50%' },
    { id: 20, top: '47%', left: '50%' },
    { id: 21, top: '55%', left: '50%' },
    { id: 22, top: '63%', left: '50%' },
    { id: 24, top: '71%', left: '50%' },
    { id: 25, top: '79%', left: '50%' },
  ];

  const renderHotspots = (spots: { id: number; top: string; left: string; priority?: boolean }[]) => {
    return spots.map((spot) => (
      <div 
        key={spot.id}
        className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2"
        style={{ top: spot.top, left: spot.left }}
      >
        <div 
          className="relative flex items-center justify-center cursor-pointer group"
          onMouseEnter={() => setHovered(spot.id)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onHotspotClick(spot.id)}
        >
          {/* Visual Priority Pulse for Column 17 */}
          {spot.priority && (
            <div className="absolute w-12 h-12 rounded-full bg-[#b2935b]/30 animate-ping opacity-75"></div>
          )}
          
          <div className={`absolute w-8 h-8 rounded-full transition-all duration-300 opacity-0 ${
            hovered === spot.id ? 'bg-[#b2935b]/20 scale-150 opacity-100' : ''
          }`}></div>
          
          <button className={`w-6 h-6 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 relative z-10 border ${
            spot.priority ? 'border-[#b2935b] border-2 shadow-[#b2935b]/30 shadow-lg' : 'border-white/50'
          } ${
            hovered === spot.id 
              ? 'bg-[#b2935b] scale-110 shadow-md' 
              : spot.priority ? 'bg-[#b2935b]' : 'bg-[#064e3b]'
          }`}>
            <span className="text-white text-[9px] font-bold">{spot.id}</span>
          </button>
          
          {hovered === spot.id && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white p-4 rounded-[1.5rem] shadow-2xl border border-slate-50 w-56 z-50 animate-in fade-in zoom-in slide-in-from-bottom-2 duration-200">
              <div className="flex flex-col gap-1">
                 <div className="flex items-center justify-between border-b border-slate-50 pb-1 mb-1">
                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Col {spot.id}</span>
                    {spot.priority && <span className="text-[7px] font-black text-[#b2935b] uppercase tracking-tighter bg-[#b2935b]/10 px-2 py-0.5 rounded-full">Zeenat Priority</span>}
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 ${spot.priority ? 'bg-[#b2935b]' : 'bg-[#064e3b]'} text-white`}>{spot.id}</span>
                 </div>
                 <h4 className="urdu-text text-base font-bold text-[#064e3b] leading-tight">
                   {NIKKAH_COLUMNS[spot.id]?.urdu}
                 </h4>
                 <p className="text-[9px] text-slate-500 leading-tight line-clamp-2">
                   {NIKKAH_COLUMNS[spot.id]?.label}
                 </p>
                 <div className="mt-2">
                    <div className={`${spot.priority ? 'bg-[#b2935b]' : 'bg-[#064e3b]'} text-white text-center py-1 rounded-lg text-[7px] font-black uppercase tracking-widest`}>
                      Tap to Audit
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    ));
  };

  const renderBackgroundLines = () => (
    <div className="relative z-10 w-full px-5 mt-6 space-y-2.5">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="flex gap-2.5">
          <div className="w-1/6 h-3 bg-slate-50 rounded-sm"></div>
          <div className="w-5/6 h-3 bg-slate-50 rounded-sm"></div>
        </div>
      ))}
      <div className="pt-3 space-y-2.5">
          <div className="w-full h-3 bg-slate-50 rounded-sm"></div>
          <div className="w-full h-3 bg-slate-50 rounded-sm"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50/30 p-4 md:p-8 rounded-[2.5rem] shadow-inner overflow-x-auto scrollbar-hide">
      <div className="flex flex-row gap-6 min-w-[650px] justify-center items-start">
        <div className="relative w-[300px] shrink-0">
          <div className="bg-white rounded-[2rem] shadow-lg overflow-hidden aspect-[1/1.4] relative p-6 border border-slate-100">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-[#064e3b]/5"></div>
            <div className="text-center mb-4 border-b border-slate-50 pb-2">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Page 1: 1-15</h4>
            </div>
            {renderBackgroundLines()}
            <div className="absolute inset-0 z-20">{renderHotspots(page1Hotspots)}</div>
          </div>
        </div>

        <div className="relative w-[300px] shrink-0">
          <div className="bg-white rounded-[2rem] shadow-lg overflow-hidden aspect-[1/1.4] relative p-6 border border-slate-100">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-[#b2935b]/10"></div>
            <div className="text-center mb-4 border-b border-slate-50 pb-2">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Page 2: 16-25</h4>
            </div>
            {renderBackgroundLines()}
            <div className="absolute inset-0 z-20">{renderHotspots(page2Hotspots)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NikkahNamaMap;
