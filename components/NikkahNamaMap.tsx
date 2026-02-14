
import React, { useState } from 'react';
import { NIKKAH_COLUMNS, COLORS } from '../constants';

interface NikkahNamaMapProps {
  onHotspotClick: (id: number) => void;
}

const NikkahNamaMap: React.FC<NikkahNamaMapProps> = ({ onHotspotClick }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  // Grouping hotspots into two columns (simulating the two provided pages)
  const page1Hotspots = [1, 2, 3, 4, 5, 6, 13, 14, 15];
  const page2Hotspots = [16, 17, 18, 19, 20, 21, 22, 24, 25];

  const renderHotspots = (ids: number[], page: number) => {
    return ids.map((id, index) => {
      // Logic to calculate top based on row index (approximate grid alignment)
      const topOffset = 15 + (index * 8); 
      const leftOffset = page === 1 ? 40 : 40;

      return (
        <div 
          key={id}
          className="absolute z-20 group/spot"
          style={{ top: `${topOffset}%`, left: `${leftOffset}%` }}
          onMouseEnter={() => setHovered(id)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onHotspotClick(id)}
        >
          <div className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 border-2 border-white shadow-lg ${
            hovered === id 
              ? 'bg-[#b2935b] scale-150 rotate-[360deg] shadow-[#b2935b]/40' 
              : 'bg-[#064e3b] hover:bg-[#053d2e]'
          }`}>
            <span className="text-white text-[7px] font-black">{id}</span>
          </div>
          
          {hovered === id && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 w-56 z-50 animate-in fade-in zoom-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-2 mb-2">
                 <span className="w-5 h-5 bg-[#064e3b] text-white rounded-full flex items-center justify-center text-[8px] font-bold">{id}</span>
                 <h4 className="urdu-text text-[11px] font-black text-[#064e3b]">{NIKKAH_COLUMNS[id]?.urdu}</h4>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed italic mb-2 border-b border-slate-50 pb-2">{NIKKAH_COLUMNS[id]?.label}</p>
              <p className="text-[9px] text-slate-400 font-medium">{NIKKAH_COLUMNS[id]?.desc}</p>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-100 rounded-[3rem]">
        {/* PAGE 1: COLUMNS 1-15 */}
        <div className="relative aspect-[3/4] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="absolute inset-0 p-8">
            <div className="border-b-2 border-slate-200 pb-2 mb-4 text-center">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Page 1: 1-15</h4>
            </div>
            {/* Table Mockup */}
            <div className="space-y-3">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="flex border-b border-slate-100 pb-1">
                  <div className="w-8 h-4 bg-slate-50 rounded-sm"></div>
                  <div className="flex-1 h-4 bg-slate-50/50 rounded-sm ml-2"></div>
                </div>
              ))}
            </div>
          </div>
          {renderHotspots(page1Hotspots, 1)}
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
        </div>

        {/* PAGE 2: COLUMNS 16-25 */}
        <div className="relative aspect-[3/4] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="absolute inset-0 p-8">
            <div className="border-b-2 border-slate-200 pb-2 mb-4 text-center">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Page 2: 16-25</h4>
            </div>
            {/* Table Mockup */}
            <div className="space-y-3">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex border-b border-slate-100 pb-1">
                  <div className="w-8 h-4 bg-slate-50 rounded-sm"></div>
                  <div className="flex-1 h-4 bg-slate-50/50 rounded-sm ml-2"></div>
                </div>
              ))}
            </div>
            {/* Signature Block Simulation */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="h-10 border-t border-slate-300 text-[8px] text-slate-300 pt-1">Groom Signature</div>
              <div className="h-10 border-t border-slate-300 text-[8px] text-slate-300 pt-1">Bride Signature</div>
            </div>
          </div>
          {renderHotspots(page2Hotspots, 2)}
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <div className="bg-white/80 backdrop-blur-md px-8 py-3 rounded-full border border-slate-200 text-[10px] text-[#064e3b] font-black uppercase tracking-[0.2em] shadow-lg flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          360° Column Audit Mode Active
        </div>
      </div>
    </div>
  );
};

export default NikkahNamaMap;
