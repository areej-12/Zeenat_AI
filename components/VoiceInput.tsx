
import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';

interface VoiceInputProps {
  onTranscript?: (text: string) => void;
  language?: Language;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, language = Language.UR }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === Language.UR ? 'ur-PK' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (onTranscript) onTranscript(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [onTranscript, language]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      try {
        // Update language just before starting to ensure sync
        recognitionRef.current.lang = language === Language.UR ? 'ur-PK' : 'en-US';
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error("Could not start recognition", e);
      }
    }
  };

  const isUrdu = language === Language.UR;

  return (
    <div className="relative group">
      <button 
        onClick={toggleListening}
        title={isUrdu ? "بولیے (Speak)" : "Speak"}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 border-4 border-white ${
          isListening ? 'bg-red-500 scale-110 animate-pulse' : 'bg-[#064e3b] hover:bg-[#053d2e]'
        }`}
      >
        <i className={`fas ${isListening ? 'fa-stop' : 'fa-microphone'} text-white text-xl`}></i>
      </button>
      
      {isListening && (
        <div className="absolute bottom-20 right-0 bg-white p-4 rounded-3xl shadow-2xl border border-slate-50 w-64 animate-in fade-in slide-in-from-bottom-4 duration-300 z-50">
          <div className="flex gap-1 mb-3">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex-1 h-8 bg-emerald-100 rounded-full animate-bounce" style={{animationDelay: `${i*0.1}s`}}></div>
            ))}
          </div>
          <p className={`text-xs font-bold text-emerald-800 text-center ${isUrdu ? 'urdu-text' : ''}`}>
            {isUrdu ? "بولنا شروع کریں..." : "Start speaking..."}
          </p>
          <p className="text-[8px] text-slate-400 text-center mt-2 uppercase tracking-widest font-black">
            {isUrdu ? "Listening for Urdu" : "Listening for English"}
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceInput;
