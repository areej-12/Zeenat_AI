
import React, { useState } from 'react';
import Header from './components/Header';
import VoiceInput from './components/VoiceInput';
import NikkahNamaMap from './components/NikkahNamaMap';
import NikkahForm from './components/NikkahForm';
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
  const [textInput, setTextInput] = useState('');

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
      const data = await runGuardianAnalysis(profile, input, language);
      setResult(data);
      setView('result');
    } catch (err) {
      alert(language === Language.UR ? "نظام مصروف ہے۔ براہ کرم دوبارہ کوشش کریں۔" : "System busy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isUrdu = language === Language.UR;

  const LandingView = () => (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 fade-in">
      <h1 className="urdu-title text-9xl md:text-[12rem] text-[#064e3b] font-bold mb-4 drop-shadow-sm select-none">
        {TRANSLATIONS.landing.title}
      </h1>
      <h2 className={`urdu-text text-3xl md:text-4xl text-[#b2935b] font-medium tracking-[0.2em] mb-12 opacity-80 ${!isUrdu ? 'font-sans italic tracking-normal' : ''}`}>
        {isUrdu ? TRANSLATIONS.landing.subheading : "Digital Guardian • Right • Justice"}
      </h2>
      <p className={`text-xl text-slate-500 max-w-xl mx-auto mb-16 leading-relaxed ${isUrdu ? 'urdu-text' : ''}`}>
        {isUrdu ? TRANSLATIONS.landing.description : "A complete empowerment system for Pakistani women. Create your identity and get a full audit of your rights."}
      </p>
      
      <button 
        onClick={() => setView('profile')}
        className={`bg-[#064e3b] hover:bg-[#053d2e] text-white px-16 py-6 rounded-full font-bold text-xl shadow-2xl transition-all hover:scale-105 ${isUrdu ? 'urdu-text' : ''}`}
      >
        {isUrdu ? TRANSLATIONS.landing.primaryCTA : "Create Your Profile"}
      </button>
    </div>
  );

  const ProfileView = () => (
    <div className="max-w-xl mx-auto px-6 py-20 fade-in">
      <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-slate-50">
        <h3 className={`text-3xl font-bold text-[#064e3b] mb-8 ${isUrdu ? 'urdu-text text-right' : ''}`}>
          {isUrdu ? "آپ کی شناخت (Digital Profile)" : "Your Digital Identity"}
        </h3>
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
            {isUrdu ? "محفوظ کریں اور آگے بڑھیں" : "Save & Enter Guardian Mode"}
          </button>
        </form>
      </div>
    </div>
  );

  const GuardianView = () => (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-20 fade-in">
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-10">
          <div className="bg-white p-10 rounded-[4rem] shadow-sm border border-slate-50">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-[#064e3b]/10 text-[#064e3b] rounded-xl flex items-center justify-center font-bold text-lg">01</div>
              <h3 className="text-xs font-black text-[#b2935b] uppercase tracking-[0.3em]">POI Analysis</h3>
            </div>
            <h2 className="text-4xl font-bold text-[#064e3b] tracking-tight mb-6">
              {isUrdu ? "انٹرایکٹو نکاح نامہ" : "Interactive Nikkah Nama"}
            </h2>
            <p className={`text-slate-500 mb-10 leading-relaxed text-lg ${isUrdu ? 'urdu-text text-right' : ''}`}>
              {isUrdu ? "دستاویز پر موجود کسی بھی کالم کو منتخب کریں تاکہ اس کے قانونی اثرات کا جائزہ لیا جا سکے۔ کالم 17 کو خاص طور پر چیک کریں۔" : "Select any column on the document to audit its legal implications. Pay special attention to Column 17."}
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
            <h3 className="text-2xl font-bold text-[#064e3b] mb-6">
              {isUrdu ? "صوتی / تحریری انکوائری" : "Voice / Text Inquiry"}
            </h3>
            <p className={`text-sm text-slate-400 mb-8 ${isUrdu ? 'urdu-text text-right' : ''}`}>
              {isUrdu ? "اپنا مسئلہ یہاں لکھیں یا بولیں تاکہ ہمارے ایجنٹس اس کا جائزہ لیں۔" : "Describe your issue here or speak to have our agents analyze it."}
            </p>
            <div className="relative">
              <textarea 
                placeholder={isUrdu ? "اپنی صورتحال بیان کریں..." : "Describe your situation..."}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className={`w-full bg-slate-50 border-none rounded-[2rem] p-8 min-h-[180px] text-lg focus:ring-2 focus:ring-[#064e3b]/10 transition-all placeholder:text-slate-300 ${isUrdu ? 'text-right' : ''}`}
                onKeyDown={(e) => {
                  if(e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    startAnalysis(textInput);
                  }
                }}
              />
              <div className="absolute bottom-6 right-6 flex gap-4">
                <VoiceInput 
                  onTranscript={(t) => setTextInput(prev => prev ? prev + ' ' + t : t)} 
                  language={language}
                />
              </div>
            </div>
            <div className="mt-8 flex items-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              {ICONS.info} <span>Guardian Engine Online</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto pb-20">
         <div className="flex items-center gap-4 mb-10 justify-center">
            <div className="w-12 h-12 bg-[#064e3b] text-white rounded-2xl flex items-center justify-center font-bold text-xl">03</div>
            <h3 className="text-xl font-black text-[#064e3b] uppercase tracking-[0.3em]">
              {isUrdu ? "مکمل معاہدہ آڈٹ" : "Full Contract Audit"}
            </h3>
         </div>
         <NikkahForm onAnalyze={(data) => startAnalysis(data)} language={language} />
      </section>
    </div>
  );

  const ResultView = () => (
    <div className="max-w-6xl mx-auto px-6 py-20 fade-in space-y-16">
      <div className="flex items-center justify-between border-b border-slate-100 pb-12">
        <div className={isUrdu ? 'text-right w-full' : ''}>
          <div className={`flex items-center gap-3 mb-2 ${isUrdu ? 'justify-end' : ''}`}>
            <span className="text-[10px] font-black bg-[#064e3b]/10 text-[#064e3b] px-3 py-1 rounded-full uppercase tracking-tighter">
              {isUrdu ? "تصدیق شدہ تجزیہ" : "Verified Analysis"}
            </span>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Guardian Report</span>
          </div>
          <h2 className={`text-5xl font-bold text-[#064e3b] tracking-tighter ${isUrdu ? 'urdu-text' : ''}`}>
            {isUrdu ? "آپ کی حفاظت کا راستہ" : "Your Roadmap to Safety"}
          </h2>
        </div>
        <button onClick={() => setView('guardian')} className="bg-[#064e3b] text-white px-10 py-4 rounded-full font-bold text-xs shadow-xl transition-all hover:scale-105 shrink-0 ml-4">
          {isUrdu ? "نیا تجزیہ" : "New Analysis"}
        </button>
      </div>

      {/* ACTIONABLE OUTPUT: DRAFTED DOCUMENT */}
      {result?.draftedDocument && (
        <section className="bg-emerald-900 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-[100%]"></div>
          <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
            <div className="shrink-0 w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center text-4xl">
              {ICONS.file}
            </div>
            <div className="flex-1 space-y-6">
              <h3 className={`text-3xl font-black tracking-tight ${isUrdu ? 'urdu-text text-right' : ''}`}>
                {result.draftedDocument.title}
              </h3>
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 font-mono text-sm leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
                {result.draftedDocument.content}
              </div>
              <div className="flex gap-4">
                <button className="bg-white text-emerald-900 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all">
                  {ICONS.download} {isUrdu ? "ڈاؤن لوڈ کریں" : "Download Draft"}
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(result.draftedDocument!.content);
                    alert(isUrdu ? "کاپی ہو گیا" : "Copied to clipboard");
                  }}
                  className="bg-emerald-800 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest border border-white/20 hover:bg-emerald-700 transition-all">
                  {isUrdu ? "کاپی کریں" : "Copy Text"}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-12 ${isUrdu ? 'lg:flex-row-reverse' : ''}`}>
        <div className="lg:col-span-2 space-y-12">
          {/* Empowerment Corner: Education & Work Rights */}
          {result?.empowermentAudit && (
            <section className={`bg-white p-12 rounded-[4rem] shadow-xl border-4 border-[#b2935b]/10 relative overflow-hidden ${isUrdu ? 'text-right' : ''}`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#b2935b]/5 rounded-bl-full"></div>
              <h4 className={`text-3xl font-bold text-[#b2935b] mb-8 flex items-center gap-4 ${isUrdu ? 'justify-end' : ''}`}>
                {isUrdu ? `تعلیم اور ملازمت کا حق ` : 'Empowerment Corner '} {ICONS.shield}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Education Status</h5>
                  <p className={`text-sm text-slate-800 ${isUrdu ? 'urdu-text' : ''}`}>{result.empowermentAudit.educationRightStatus}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Work Status</h5>
                  <p className={`text-sm text-slate-800 ${isUrdu ? 'urdu-text' : ''}`}>{result.empowermentAudit.workRightStatus}</p>
                </div>
              </div>
              <div className="bg-[#064e3b]/5 p-8 rounded-3xl border border-[#064e3b]/10">
                <h5 className={`text-xs font-black text-[#064e3b] uppercase tracking-widest mb-3 ${isUrdu ? 'text-right' : ''}`}>
                  {isUrdu ? "حق کے حصول کے لیے مشورہ" : "Guidance to Reclaim Right"}
                </h5>
                <p className={`text-sm text-[#064e3b] leading-relaxed italic ${isUrdu ? 'urdu-text' : ''}`}>"{result.empowermentAudit.remedialAction}"</p>
              </div>
            </section>
          )}

          {/* Advocate Report */}
          <section className={`bg-white p-12 rounded-[4rem] shadow-sm border border-slate-50 relative overflow-hidden ${isUrdu ? 'text-right' : ''}`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#b2935b]/5 rounded-bl-[4rem]"></div>
            <h4 className={`text-3xl font-bold text-[#064e3b] mb-10 flex items-center gap-4 ${isUrdu ? 'justify-end' : ''}`}>
               {isUrdu ? `وکیل کی رائے (Advocate Brief) ` : 'The Advocate\'s Brief '} {ICONS.advocate}
            </h4>
            <p className={`text-xl text-slate-700 leading-relaxed mb-10 ${isUrdu ? 'urdu-text' : ''}`}>{result?.advocate.analysis}</p>
            
            <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 mb-10">
               <h5 className={`text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ${isUrdu ? 'text-right' : ''}`}>
                 {isUrdu ? `ضلعی بصیرت: ${profile.district}` : `District Insight: ${profile.district}`}
               </h5>
               <p className={`text-sm text-slate-600 italic leading-relaxed ${isUrdu ? 'text-right urdu-text' : ''}`}>"{result?.advocate.stats}"</p>
            </div>

            <div className="space-y-4">
               <h5 className={`text-xs font-black text-[#b2935b] uppercase tracking-widest ${isUrdu ? 'text-right' : ''}`}>
                 {isUrdu ? "قانونی کارروائی کا منصوبہ" : "Legal Action Plan"}
               </h5>
               {result?.advocate.legalRoadmap.map((step, i) => (
                 <div key={i} className={`flex gap-4 p-5 bg-white border border-slate-50 rounded-2xl shadow-sm transition-all hover:translate-x-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                   <div className="w-8 h-8 rounded-full bg-[#064e3b] text-white flex items-center justify-center font-bold text-xs shrink-0">{i+1}</div>
                   <p className={`text-sm text-slate-800 w-full ${isUrdu ? 'text-right urdu-text' : ''}`}>{step}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* Sharia Expert */}
          <section className={`bg-white p-12 rounded-[4rem] shadow-sm border border-slate-50 ${isUrdu ? 'text-right' : ''}`}>
            <h4 className={`text-3xl font-bold text-[#064e3b] mb-10 flex items-center gap-4 ${isUrdu ? 'justify-end' : ''}`}>
               {isUrdu ? `شرعی تناظر (Sharia Context) ` : 'Sharia Context '} {ICONS.sharia}
            </h4>
            <p className={`text-lg text-slate-600 leading-loose mb-10 ${isUrdu ? 'urdu-text' : ''}`}>{result?.shariaExpert.context}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {result?.shariaExpert.principles.map((p, i) => (
                 <div key={i} className={`p-6 bg-emerald-50/30 rounded-3xl border border-emerald-50 text-emerald-900 text-sm font-medium ${isUrdu ? 'urdu-text text-right' : ''}`}>
                   {p}
                 </div>
               ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-12">
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
               {result?.advocate.riskLevel} {isUrdu ? "خطرہ" : "Risk"}
             </p>
          </div>

          <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border-4 border-[#b2935b]/20 animate-in zoom-in duration-500 delay-300">
             <div className={`flex gap-4 items-center mb-8 ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
               <div className="w-12 h-12 bg-[#b2935b]/10 text-[#b2935b] rounded-2xl flex items-center justify-center text-xl">{ICONS.ngo}</div>
               <div>
                 <h5 className="text-[10px] font-black text-[#b2935b] uppercase tracking-widest">NGO Referral Bridge</h5>
               </div>
             </div>
             <div className="space-y-6">
                <div className={`bg-slate-50 p-6 rounded-3xl ${isUrdu ? 'text-right' : ''}`}>
                   <h6 className="font-black text-slate-800 text-sm mb-1">{result?.ngoBridge.recommendedNgo.name}</h6>
                   <p className="text-[10px] text-[#064e3b] font-bold mb-4">{result?.ngoBridge.recommendedNgo.contact}</p>
                   <p className={`text-xs text-slate-500 leading-relaxed italic ${isUrdu ? 'urdu-text' : ''}`}>"{result?.ngoBridge.recommendedNgo.reason}"</p>
                </div>
                <button className="w-full py-5 rounded-2xl bg-[#b2935b] text-white font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-[1.03] active:scale-95 transition-all">
                  {isUrdu ? "ابھی رابطہ کریں" : "Contact Counselor Now"}
                </button>
             </div>
          </div>
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
           <p className="urdu-text text-4xl text-[#064e3b] font-black leading-loose">
             {isUrdu ? "زینت آپ کے حقوق کا جائزہ لے رہی ہے..." : "Zeenat is auditing your rights..."}
           </p>
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
               {isUrdu ? TRANSLATIONS.disclaimer : "LEGAL NOTE: This is an informational system, not professional legal advice."}
             </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
