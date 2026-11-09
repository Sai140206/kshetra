import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AudioReadButton = ({ text, id, label, className = '' }) => {
  const { isSpeaking, speakingId, speak, stopSpeaking, language, t } = useLanguage();
  const isActive = isSpeaking && speakingId === id;

  const handleClick = (e) => {
    e.stopPropagation();
    if (isActive) {
      stopSpeaking();
    } else {
      speak(text, id);
    }
  };

  const activeText = 
    language === 'mr' ? 'ऐकणे सुरू' : language === 'hi' ? 'बोल रहे हैं' : 'Playing';

  return (
    <button
      onClick={handleClick}
      type="button"
      title={isActive ? (language === 'mr' ? 'आवाज थांबवा' : language === 'hi' ? 'आवाज रोकें' : 'Stop audio') : (label || t.listen)}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl font-medium text-xs sm:text-sm transition-all shadow-sm ${
        isActive
          ? 'bg-amber-500 text-white shadow-amber-200 animate-pulse'
          : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300'
      } ${className}`}
      aria-label={label || t.readAloud}
    >
      {isActive ? (
        <>
          <VolumeX className="w-4 h-4 text-white" />
          <div className="flex items-end gap-0.5 h-3">
            <span className="w-1 bg-white rounded-full wave-bar-1" />
            <span className="w-1 bg-white rounded-full wave-bar-2" />
            <span className="w-1 bg-white rounded-full wave-bar-3" />
          </div>
          <span className="font-semibold text-xs">{activeText}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-emerald-800" />
          {label && <span className="font-semibold">{label}</span>}
        </>
      )}
    </button>
  );
};
