
import React, { useState } from 'react';
import Header from './components/Header';
import VoiceInput from './components/VoiceInput';
import NikkahNamaMap from './components/NikkahNamaMap';
import { runGuardianAnalysis } from './services/geminiService';
import { 
  Language, 
  UserProfile, 
  SwarmResult 
} from './types';
import { 
  PAKISTAN_DISTRICTS, 
  TRANSLATIONS, 
  ICONS,
  NIKKAH_COLUMNS,
  NGO_DATABASE 
} from './constants';

type AppView = 'landing' | 'profile' | 'guardian' | 'result';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [language, setLanguage] = useState<Language>(Language.UR);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SwarmResult | null>(null);

  const [profile, setProfile] = useState<UserProfile>({
    age: 25,
    district: 'Islamabad (ICT)',
    maritalStatus: 'Single',
    childrenCount: 0,
    isEmployed: false
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setView('guardian');
  };

  const startAnalysis = async (input: string | object) => {
    setLoading(true);
    try {
      const data = await runGuardianAnalysis(profile, input);
      setResult(data);
      setView('result');
    } catch (err) {
      alert("Guardian system busy. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const LandingView = () => (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 fade-in">
      <h1 className="urdu-title text-9xl md:text-[12rem] text-[#064e3b] font-bold mb-4 drop-shadow-sm select-none">
        {TRANSLATIONS.landing.title}
      </h1>
      <h2 className="urdu-text text-3xl md:text-4xl text-[#b2935b] font-medium tracking-[0.2em] mb-12 opacity-80">
        {TRANSLATIONS.landing.subheading}
      </h2>
      <p className="urdu-text text-xl text-slate-500 max-w-xl mx-auto mb-16 leading-relaxed">
        {TRANSLATIONS.landing.description}
      </p>
      
      <button 
        onClick={() => setView('profile')}
        className="bg-[#064e3b] hover:bg-[#053d2e] text-white px-16 py-6 rounded-full font-bold text-xl shadow-2xl transition-all hover:scale-105 urdu-text"
      >
        {TRANSLATIONS.landing.primaryCTA}
      </button>
    </div>
  );

  const ProfileView = () => (
    <div className="max-w-xl mx-auto px-6 py-20 fade-in">
      <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-slate-50">
        <h3 className="text-3xl font-bold text-[#064e3b] urdu-text mb-8">آپ کی شناخت (Digital Profile)</h3>
        <form onSubmit={handleProfileSubmit} className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Age / عمر</label>
              <input type="number" required value={profile.age} onChange={e => setProfile({...profile, age: parseInt(e.target.value)})} className="w-full bg-slate-50 border-none rounded-2xl p-5 text-lg"/>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">District / ضلع</label>
              <select value={profile.district} onChange={e => setProfile({...profile, district: e.target.value})} className="w-full bg-slate-50 border-none rounded-2xl p-5 text-lg">
                {PAKISTAN_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status / ازدواجی حیثیت</label>
            <div className="flex gap-2">
              {['Single', 'Married', 'Divorced', 'Widow'].map(s => (
                <button 
                  key={s} type="button" 
                  onClick={() => setProfile({...profile, maritalStatus: s as any})}
                  className={`flex-1 py-4 rounded-2xl text-[10px] font-bold ${profile.maritalStatus === s ? 'bg-[#064e3b] text-white' : 'bg-slate-100 text-slate-400'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button className="w-full bg-[#064e3b] text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-xl transition-all hover:scale-[1.02]">
            Save & Enter Guardian Mode
          </button>
        </form>
      </div>
    </div>
  );

  const GuardianView = () => (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-16 fade-in">
      <div className="lg:col-span-7 space-y-10">
        <div className="bg-white p-10 rounded-[4rem] shadow-sm border border-slate-50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-[#064e3b]/10 text-[#064e3b] rounded-xl flex items-center justify-center font-bold text-lg">01</div>
            <h3 className="text-xs font-black text-[#b2935b] uppercase tracking-[0.3em]">POI Analysis</h3>
          </div>
          <h2 className="text-4xl font-bold text-[#064e3b] tracking-tight mb-6">Interactive Nikkah Nama</h2>
          <p className="text-slate-500 mb-10 leading-relaxed urdu-text text-lg">
            دستاویز پر موجود کسی بھی کالم کو منتخب کریں تاکہ اس کے قانونی اثرات کا جائزہ لیا جا سکے۔
          </p>
          <NikkahNamaMap onHotspotClick={(id) => startAnalysis({ action: 'Audit Column', column: NIKKAH_COLUMNS[id] })} />
        </div>
      </div>

      <div className="lg:col-span-5 space-y-10">
        <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-[#064e3b]/10 text-[#064e3b] rounded-xl flex items-center justify-center font-bold text-lg">02</div>
            <h3 className="text-xs font-black text-[#b2935b] uppercase tracking-[0.3em]">Situational Rights</h3>
          </div>
          <h3 className="text-2xl font-bold text-[#064e3b] mb-6">Voice / Text Inquiry</h3>
          <p className="text-sm text-slate-400 mb-8 urdu-text">اپنا مسئلہ یہاں لکھیں یا بولیں تاکہ ہمارے ایجنٹس اس کا جائزہ لیں۔</p>
          <div className="relative">
            <textarea 
              placeholder="Describe your situation..."
              className="w-full bg-slate-50 border-none rounded-[2rem] p-8 min-h-[180px] text-lg focus:ring-2 focus:ring-[#064e3b]/10 transition-all placeholder:text-slate-300"
              onKeyDown={(e) => {
                if(e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  startAnalysis((e.target as HTMLTextAreaElement).value);
                }
              }}
            />
            <div className="absolute bottom-6 right-6 flex gap-4">
              <VoiceInput />
            </div>
          </div>
          <div className="mt-8 flex items-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            {ICONS.info} <span>Guardian Engine Online</span>
          </div>
        </div>

        <div className="bg-[#b2935b]/10 p-10 rounded-[4rem] border border-[#b2935b]/20 group">
          <div className="flex gap-4 items-center mb-6">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#b2935b] transition-transform group-hover:rotate-[360deg] duration-1000">{ICONS.shield}</div>
            <h4 className="font-bold text-[#b2935b] uppercase tracking-widest text-xs">Guardian Protocol 2026</h4>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            Zeenat-AI cross-references local civil acts with Sharia principles to provide a holistic protection roadmap.
          </p>
        </div>
      </div>
    </div>
  );

  const ResultView = () => (
    <div className="max-w-6xl mx-auto px-6 py-20 fade-in space-y-16">
      <div className="flex items-center justify-between border-b border-slate-100 pb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-black bg-[#064e3b]/10 text-[#064e3b] px-3 py-1 rounded-full uppercase tracking-tighter">Verified Analysis</span>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Guardian Report</span>
          </div>
          <h2 className="text-5xl font-bold text-[#064e3b] tracking-tighter">Your Roadmap to Safety</h2>
        </div>
        <button onClick={() => setView('guardian')} className="bg-[#064e3b] text-white px-10 py-4 rounded-full font-bold text-xs shadow-xl transition-all hover:scale-105">
          New Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Advocate Report */}
          <section className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#b2935b]/5 rounded-bl-[4rem]"></div>
            <h4 className="text-3xl font-bold text-[#064e3b] mb-10 flex items-center gap-4">
              {ICONS.advocate} The Advocate's Brief
            </h4>
            <p className="text-xl text-slate-700 leading-relaxed urdu-text mb-10">{result?.advocate.analysis}</p>
            
            <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 mb-10">
               <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">District Insight: {profile.district}</h5>
               <p className="text-sm text-slate-600 italic leading-relaxed">"{result?.advocate.stats}"</p>
            </div>

            <div className="space-y-4">
               <h5 className="text-xs font-black text-[#b2935b] uppercase tracking-widest">Legal Action Plan</h5>
               {result?.advocate.legalRoadmap.map((step, i) => (
                 <div key={i} className="flex gap-4 p-5 bg-white border border-slate-50 rounded-2xl shadow-sm transition-all hover:translate-x-2">
                   <div className="w-8 h-8 rounded-full bg-[#064e3b] text-white flex items-center justify-center font-bold text-xs shrink-0">{i+1}</div>
                   <p className="text-sm text-slate-800">{step}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* Sharia Expert */}
          <section className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-50">
            <h4 className="text-3xl font-bold text-[#064e3b] mb-10 flex items-center gap-4">
              {ICONS.sharia} Sharia Context
            </h4>
            <p className="text-lg text-slate-600 urdu-text leading-loose mb-10">{result?.shariaExpert.context}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {result?.shariaExpert.principles.map((p, i) => (
                 <div key={i} className="p-6 bg-emerald-50/30 rounded-3xl border border-emerald-50 text-emerald-900 text-sm font-medium urdu-text">
                   {p}
                 </div>
               ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-12">
          {/* Safety Score Card */}
          <div className="bg-[#064e3b] text-white p-12 rounded-[4rem] shadow-2xl text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
               <svg viewBox="0 0 100 100" className="w-full h-full"><circle cx="50" cy="50" r="40" stroke="currentColor" fill="none" strokeWidth="1"/></svg>
             </div>
             <h5 className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] mb-12">Protection Score</h5>
             <div className="text-7xl font-black mb-4">{result?.advocate.safetyScore}%</div>
             <p className={`text-[10px] uppercase font-black px-4 py-2 rounded-full inline-block ${
               result?.advocate.riskLevel === 'Low' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 
               result?.advocate.riskLevel === 'Medium' ? 'bg-amber-500 shadow-lg shadow-amber-500/20' : 'bg-red-500 shadow-lg shadow-red-500/20'
             }`}>
               {result?.advocate.riskLevel} Risk Detected
             </p>
             <p className="text-[10px] text-white/40 mt-10 leading-relaxed italic">
                Cross-referenced with the 2026 Protection Acts.
             </p>
          </div>

          {/* NGO Bridge - PROACTIVE INTERVENTION */}
          <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border-4 border-[#b2935b]/20 animate-in zoom-in duration-500 delay-300">
             <div className="flex gap-4 items-center mb-8">
               <div className="w-12 h-12 bg-[#b2935b]/10 text-[#b2935b] rounded-2xl flex items-center justify-center text-xl">{ICONS.ngo}</div>
               <div>
                 <h5 className="text-[10px] font-black text-[#b2935b] uppercase tracking-widest">NGO Referral Bridge</h5>
                 <p className="text-[8px] text-slate-400 uppercase tracking-tighter">Proactive Intervention</p>
               </div>
             </div>
             <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-3xl">
                   <h6 className="font-black text-slate-800 text-sm mb-1">{result?.ngoBridge.recommendedNgo.name}</h6>
                   <p className="text-[10px] text-[#064e3b] font-bold mb-4">{result?.ngoBridge.recommendedNgo.contact}</p>
                   <p className="text-xs text-slate-500 leading-relaxed italic">"{result?.ngoBridge.recommendedNgo.reason}"</p>
                </div>
                <button className="w-full py-5 rounded-2xl bg-[#b2935b] text-white font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-[1.03] active:scale-95 transition-all">
                  Contact Counselor Now
                </button>
             </div>
          </div>

          {/* Health Agent */}
          {result?.healthAgent && (
            <div className="bg-emerald-50 p-10 rounded-[3.5rem] border border-emerald-100">
               <h5 className="text-[10px] font-black text-[#064e3b] uppercase tracking-widest mb-6 flex items-center gap-2">
                 {ICONS.health} Health Optimizer
               </h5>
               <ul className="space-y-4">
                 {result.healthAgent.recommendations.map((r, i) => (
                   <li key={i} className="text-xs text-emerald-900/70 flex gap-3">
                     <span className="shrink-0">•</span> {r}
                   </li>
                 ))}
               </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] selection:bg-[#064e3b] selection:text-white">
      <Header currentLang={language} onLangChange={setLanguage} />
      
      {loading && (
        <div className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-2xl flex flex-col items-center justify-center text-center px-6">
           <div className="w-24 h-24 border-8 border-[#064e3b]/10 border-t-[#064e3b] rounded-full animate-spin mb-12"></div>
           <p className="urdu-text text-4xl text-[#064e3b] font-black leading-loose">زینت آپ کے حقوق کا جائزہ لے رہی ہے...</p>
           <p className="text-xs text-slate-400 mt-6 font-black uppercase tracking-[0.4em] animate-pulse">Consulting Swarm Experts</p>
        </div>
      )}

      <main className="pb-24">
        {view === 'landing' && <LandingView />}
        {view === 'profile' && <ProfileView />}
        {view === 'guardian' && <GuardianView />}
        {view === 'result' && <ResultView />}
      </main>

      {view !== 'landing' && (
        <footer className="py-24 border-t border-slate-100 bg-white">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 opacity-30">
             <div className="text-xs font-black tracking-widest text-[#064e3b]">ZEENAT AI | 360 GUARDIAN ENGINE</div>
             <p className="text-[9px] text-slate-400 max-w-sm text-center md:text-right italic leading-relaxed">
               {TRANSLATIONS.disclaimer}
             </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
