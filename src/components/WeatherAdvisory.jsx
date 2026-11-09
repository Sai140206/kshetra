import React from 'react';
import { 
  CloudRain, 
  Droplets, 
  Wind, 
  Sun, 
  AlertTriangle, 
  Calendar,
  Sparkles,
  MapPin,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LOCATION_WEATHER } from '../data/seedData';
import { AudioReadButton } from './AudioReadButton';

export const WeatherAdvisory = () => {
  const { language, t, selectedLocation } = useLanguage();

  // Get location-specific weather, fallback to shirur
  const weather = LOCATION_WEATHER[selectedLocation.id] || LOCATION_WEATHER.shirur;
  const condition = weather.condition[language] || weather.condition.mr;
  const actionTag = weather.actionTag[language] || weather.actionTag.mr;
  const advisoryText = weather.advisoryText[language] || weather.advisoryText.mr;
  const audioSummary = weather.audioSummary[language] || weather.audioSummary.mr;

  return (
    <section className="bg-gradient-to-br from-agri-900 via-emerald-950 to-teal-950 text-white rounded-3xl p-4 sm:p-5 shadow-farmer border border-emerald-700/40 relative overflow-hidden">
      
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 -mr-12 -mt-12 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Left Side: Live Temperature & Location */}
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner flex-shrink-0">
            {weather.isWarning ? (
              <CloudRain className="w-8 h-8 text-amber-300 animate-bounce" />
            ) : (
              <Sun className="w-8 h-8 text-amber-400" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-4xl font-black text-white">
                {weather.temp}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/15 text-emerald-200 border border-white/20">
                {condition}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-semibold mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>{selectedLocation.name[language] || selectedLocation.name.mr}</span>
              <span className="text-white/40">•</span>
              <span>{selectedLocation.primaryCrops[language] || selectedLocation.primaryCrops.mr}</span>
            </div>
          </div>
        </div>

        {/* Center: 4 Compact Metrics Chips */}
        <div className="grid grid-cols-4 gap-2 bg-black/20 p-2 rounded-2xl border border-white/10 text-center">
          <div className="px-2 py-1">
            <span className="block text-[10px] text-emerald-300 font-medium">{t.rainProbability}</span>
            <span className="font-extrabold text-amber-300 text-xs sm:text-sm">{weather.rainChance}</span>
          </div>
          <div className="px-2 py-1 border-l border-white/10">
            <span className="block text-[10px] text-emerald-300 font-medium">{t.humidity}</span>
            <span className="font-bold text-white text-xs sm:text-sm">{weather.humidity}</span>
          </div>
          <div className="px-2 py-1 border-l border-white/10">
            <span className="block text-[10px] text-emerald-300 font-medium">{t.windSpeed}</span>
            <span className="font-bold text-white text-xs sm:text-sm">{weather.wind}</span>
          </div>
          <div className="px-2 py-1 border-l border-white/10">
            <span className="block text-[10px] text-emerald-300 font-medium">{t.soilStatus}</span>
            <span className="font-bold text-emerald-200 text-xs sm:text-sm">{weather.soilMoisture}</span>
          </div>
        </div>

        {/* Right Side: 1-Line Actionable Advice & Audio */}
        <div className="flex items-center justify-between md:justify-end gap-3 bg-white/10 rounded-2xl p-2.5 sm:px-3 border border-white/15">
          <div className="max-w-xs">
            <span className={`inline-block text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider mb-0.5 ${
              weather.isWarning ? 'bg-amber-400 text-gray-950' : 'bg-emerald-400 text-gray-950'
            }`}>
              {actionTag}
            </span>
            <p className="text-xs text-white/95 line-clamp-2 font-medium">
              {advisoryText}
            </p>
          </div>

          <AudioReadButton
            id={`weather-${selectedLocation.id}`}
            text={audioSummary}
            label={t.listen}
            className="bg-amber-400 hover:bg-amber-300 text-gray-950 font-black shadow-md flex-shrink-0"
          />
        </div>

      </div>
    </section>
  );
};
