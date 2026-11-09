import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  X, 
  Sparkles, 
  ArrowRight,
  MapPin,
  Volume2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { VOICE_SUGGESTIONS } from '../data/seedData';

// Helper to play synthesized chimes using Web Audio API
const playBeep = (type = 'start') => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'start') {
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (e) {
    // AudioContext blocked before interaction
  }
};

export const VaniVoiceModal = ({ isOpen, onClose, onSelectVoiceAction }) => {
  const { language, t, speak, selectedLocation } = useLanguage();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [textInput, setTextInput] = useState('');
  const [livePrompt, setLivePrompt] = useState('');

  const isListeningRef = useRef(false);
  const transcriptRef = useRef('');
  const recognitionRef = useRef(null);
  const fallbackTimeoutRef = useRef(null);

  // Default suggested query per location
  const getLocationDefaultQuery = () => {
    const locId = selectedLocation?.id || 'shirur';
    if (language === 'mr') {
      switch (locId) {
        case 'lasalgaon': return { text: 'लासलगाव कांदा बाजारभाव व नफा तपासा', tab: 'arbitrage', filter: 'onion' };
        case 'baramati': return { text: 'सोयाबीन कापणीसाठी हार्वेस्टर शोधा', tab: 'services', filter: 'हार्वेस्टर' };
        case 'kolhapur': return { text: 'भात खाचरासाठी चिखलणी ट्रॅक्टर शोधा', tab: 'services', filter: 'कुबोटा' };
        case 'sangamner': return { text: 'डाळिंब बागेसाठी मिस्ट ब्लोअर शोधा', tab: 'services', filter: 'मिस्ट' };
        case 'akola': return { text: 'कापूस जिनिंग बाजारभाव व नफा तपासा', tab: 'arbitrage', filter: 'cotton' };
        default: return { text: 'पुणे मार्केटसाठी गाडी सामाईक वाटणी करा', tab: 'pooling', filter: 'पुणे' };
      }
    } else if (language === 'hi') {
      switch (locId) {
        case 'lasalgaon': return { text: 'लासलगांव प्याज मंडी भाव व शुद्ध मुनाफा जांचें', tab: 'arbitrage', filter: 'onion' };
        case 'baramati': return { text: 'सोयाबीन कटाई हेतु कंबाइन हार्वेस्टर खोजें', tab: 'services', filter: 'हार्वेस्टर' };
        case 'kolhapur': return { text: 'धान रोपाई हेतु ट्रैक्टर या मजदूर खोजें', tab: 'services', filter: 'कुबोटा' };
        case 'sangamner': return { text: 'अनार बाग हेतु मिस्ट ब्लोअर स्प्रे खोजें', tab: 'services', filter: 'मिस्ट' };
        case 'akola': return { text: 'कपास जिनिंग मंडी भाव व शुद्ध मुनाफा जांचें', tab: 'arbitrage', filter: 'cotton' };
        default: return { text: 'पुणे मंडी हेतु साझा वाहन ग्रुप खोजें', tab: 'pooling', filter: 'पुणे' };
      }
    } else {
      switch (locId) {
        case 'lasalgaon': return { text: 'Compare Lasalgaon onion APMC mandi net profit', tab: 'arbitrage', filter: 'onion' };
        case 'baramati': return { text: 'Find combine harvester for soybean in Baramati', tab: 'services', filter: 'harvester' };
        case 'kolhapur': return { text: 'Find 4WD paddy puddler tractor in Kolhapur', tab: 'services', filter: 'paddy' };
        case 'sangamner': return { text: 'Find orchard mist blower tractor in Sangamner', tab: 'services', filter: 'mist' };
        case 'akola': return { text: 'Check Akola cotton mandi arbitrage and profit', tab: 'arbitrage', filter: 'cotton' };
        default: return { text: 'Join Saha-Kisan transport truck pool to Pune APMC', tab: 'pooling', filter: 'pool' };
      }
    }
  };

  useEffect(() => {
    if (!isOpen) {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) {}
      }
      clearTimeout(fallbackTimeoutRef.current);
      isListeningRef.current = false;
      transcriptRef.current = '';
      setIsListening(false);
      setTranscript('');
      setTextInput('');
      setLivePrompt('');
      return;
    }

    // Set initial prompt
    setLivePrompt(t.voiceSpeakPrompt);

    // Initialize Web Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognizer = new SpeechRecognition();
        recognizer.continuous = false;
        recognizer.interimResults = true;
        recognizer.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

        recognizer.onstart = () => {
          isListeningRef.current = true;
          setIsListening(true);
          setLivePrompt(t.voiceListening);
        };

        recognizer.onresult = (event) => {
          const text = Array.from(event.results)
            .map((r) => r[0].transcript)
            .join('');
          if (text) {
            transcriptRef.current = text;
            setTranscript(text);
            setTextInput(text);
            setLivePrompt(`🗣️ "${text}"`);
          }
        };

        recognizer.onend = () => {
          isListeningRef.current = false;
          setIsListening(false);
          // If we captured something, execute it after short delay
          if (transcriptRef.current.trim()) {
            executeVoiceQuery(transcriptRef.current);
          }
        };

        recognizer.onerror = () => {
          isListeningRef.current = false;
          setIsListening(false);
          // If recognition failed, let fallback handle it
        };

        recognitionRef.current = recognizer;
      } catch (err) {
        recognitionRef.current = null;
      }
    }
  }, [isOpen, language]);

  if (!isOpen) return null;

  const startListening = () => {
    playBeep('start');
    isListeningRef.current = true;
    transcriptRef.current = '';
    setIsListening(true);
    setTranscript('');
    setTextInput('');
    setLivePrompt(t.voiceListening);

    let startedLive = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        startedLive = true;
      } catch (e) {
        // Recognition already running or blocked
      }
    }

    // Fallback: If no transcript received within 2.4s (no mic permission or silence)
    clearTimeout(fallbackTimeoutRef.current);
    fallbackTimeoutRef.current = setTimeout(() => {
      if (isListeningRef.current && !transcriptRef.current.trim()) {
        const fallback = getLocationDefaultQuery();
        transcriptRef.current = fallback.text;
        setTranscript(fallback.text);
        setTextInput(fallback.text);
        setLivePrompt(`🗣️ "${fallback.text}"`);
        isListeningRef.current = false;
        setIsListening(false);
        playBeep('success');

        executeVoiceQuery(fallback.text, fallback.tab, fallback.filter);
      }
    }, 2400);
  };

  const handleChipClick = (chip) => {
    playBeep('success');
    transcriptRef.current = chip.text;
    setTranscript(chip.text);
    setTextInput(chip.text);
    executeVoiceQuery(chip.text, chip.actionTab, chip.search);
  };

  const executeVoiceQuery = (queryText, targetTab, searchFilter) => {
    const q = (queryText || textInput || transcriptRef.current || transcript).trim();
    if (!q) return;

    playBeep('success');

    let tab = targetTab || 'services';
    let filter = searchFilter || '';
    const lower = q.toLowerCase();

    if (lower.includes('हार्वेस्टर') || lower.includes('harvester') || lower.includes('कापणी') || lower.includes('कंबाइन') || lower.includes('कटाई')) {
      tab = 'services';
      filter = 'हार्वेस्टर';
    } else if (lower.includes('नफा') || lower.includes('बाजार') || lower.includes('मंडी') || lower.includes('कांदा') || lower.includes('arbitrage') || lower.includes('मुनाफा') || lower.includes('प्याज') || lower.includes('कपास')) {
      tab = 'arbitrage';
      filter = 'onion';
    } else if (lower.includes('गाडी') || lower.includes('ट्रक') || lower.includes('pooling') || lower.includes('वाटणी') || lower.includes('साझा') || lower.includes('वाहन') || lower.includes('टेम्पो')) {
      tab = 'pooling';
    } else if (lower.includes('मेकॅनिक') || lower.includes('मिस्त्री') || lower.includes('बंद') || lower.includes('sos') || lower.includes('दुरुस्ती') || lower.includes('पंप') || lower.includes('खराब')) {
      tab = 'sos';
    } else {
      tab = 'services';
      filter = q;
    }

    const speech = t.understoodVoiceOpening.replace('{query}', q);
    speak(speech, 'vani-feedback');

    setTimeout(() => {
      if (onSelectVoiceAction) {
        onSelectVoiceAction(tab, filter);
      }
      onClose();
    }, 700);
  };

  // Curate 4 most relevant chips for current language & location
  const defaultLocItem = getLocationDefaultQuery();
  const regionalChips = [
    { text: defaultLocItem.text, actionTab: defaultLocItem.tab, search: defaultLocItem.filter },
    ...VOICE_SUGGESTIONS.filter((s) => s.lang === language && s.text !== defaultLocItem.text)
  ].slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-emerald-200 overflow-hidden flex flex-col">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-agri-950 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-gray-950 flex items-center justify-center font-black shadow-md flex-shrink-0">
              <Sparkles className="w-5 h-5 text-gray-950" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white flex items-center gap-2">
                <span>{t.vaniVoiceTitle}</span>
              </h3>
              <p className="text-[11px] text-emerald-200 font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-300" />
                <span>{selectedLocation.name[language] || selectedLocation.name.mr}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 text-center space-y-4">
          
          {/* Animated Big Microphone */}
          <div className="relative inline-block my-2">
            {isListening && (
              <>
                <span className="absolute -inset-3 rounded-full bg-amber-400/40 animate-ping" />
                <span className="absolute -inset-6 rounded-full bg-emerald-400/20 animate-pulse" />
              </>
            )}

            <button
              type="button"
              onClick={startListening}
              className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center text-white font-black shadow-xl transition-all duration-200 active:scale-95 ${
                isListening
                  ? 'bg-gradient-to-br from-amber-500 to-harvest-600 ring-8 ring-amber-400/30'
                  : 'bg-gradient-to-br from-emerald-600 to-agri-800 hover:scale-105 shadow-farmer'
              }`}
            >
              <Mic className={`w-9 h-9 sm:w-10 sm:h-10 text-white ${isListening ? 'animate-bounce' : ''}`} />
              <span className="text-[10px] uppercase font-bold tracking-wider mt-1">
                {isListening ? t.voiceListening : t.tapToSpeak}
              </span>
            </button>
          </div>

          {/* Sound waves indicator & status prompt */}
          <div className="min-h-[28px] flex items-center justify-center gap-1.5">
            {isListening ? (
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-4 bg-emerald-600 rounded-full animate-bounce" />
                <span className="w-1.5 h-6 bg-amber-500 rounded-full animate-pulse" />
                <span className="w-1.5 h-5 bg-emerald-600 rounded-full animate-bounce" />
                <span className="w-1.5 h-3 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-gray-800 ml-2">
                  {t.listeningPrompt}
                </span>
              </div>
            ) : (
              <p className="text-xs font-bold text-gray-600">
                {livePrompt}
              </p>
            )}
          </div>

          {/* Text Input & Direct Execute Bar */}
          <div className="relative">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') executeVoiceQuery(textInput);
              }}
              placeholder={t.typeOrSpeak}
              className="w-full py-3 pl-4 pr-12 bg-gray-50 border-2 border-gray-200 rounded-2xl text-xs sm:text-sm font-bold text-gray-900 focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
            />
            <button
              onClick={() => executeVoiceQuery(textInput)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center transition-colors"
              title="Search"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Voice Query Chips */}
          <div className="text-left pt-2 border-t border-gray-100">
            <span className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wider block mb-2">
              ⚡ {t.instantVoiceChips}
            </span>

            <div className="flex flex-col gap-1.5">
              {regionalChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChipClick(chip)}
                  className="p-2.5 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200 text-xs font-bold text-emerald-950 flex items-center justify-between text-left transition-colors active:scale-98"
                >
                  <span className="truncate">🗣️ "{chip.text}"</span>
                  <span className="text-[10px] text-emerald-900 font-black bg-emerald-200 px-2 py-0.5 rounded ml-2 whitespace-nowrap">
                    {t.run}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
