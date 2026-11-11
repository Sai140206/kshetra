import React, { useState } from 'react';
import { 
  Sprout, 
  MapPin, 
  PhoneCall, 
  ArrowRight, 
  ShieldCheck, 
  Tractor, 
  Truck, 
  TrendingUp, 
  Wrench,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AuthModal } from './AuthModal';
import { LOCATIONS } from '../data/seedData';

export const AuthGateway = ({ onSkip, onAuthSuccess }) => {
  const { 
    language, 
    setLanguage, 
    t, 
    selectedLocation, 
    setSelectedLocation 
  } = useLanguage();

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'

  const languages = [
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'en', label: 'English' }
  ];

  const currentDistrict = typeof selectedLocation.district === 'object'
    ? (selectedLocation.district[language] || selectedLocation.district.mr)
    : selectedLocation.district;

  return (
    <div className="min-h-screen bg-[#F5F8F2] text-gray-900 flex flex-col antialiased selection:bg-emerald-200">
      
      {/* Top Utility Helpline Bar */}
      <div className="bg-agri-950 text-white text-xs px-3 sm:px-6 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-[11px] sm:text-xs">
            🌱 {t.appTitle} — {t.appSubtitle}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <a 
            href="tel:18001801551" 
            className="flex items-center gap-1.5 bg-harvest-600 hover:bg-harvest-700 text-white px-2.5 py-0.5 rounded-full font-bold text-[11px] transition-colors shadow-sm"
          >
            <PhoneCall className="w-3 h-3" />
            <span>1800-180-1551</span>
            <span className="hidden sm:inline font-normal opacity-90">({t.tollFreeLabel})</span>
          </a>
        </div>
      </div>

      {/* Main Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-agri-800 to-agri-950 flex items-center justify-center text-white shadow-farmer flex-shrink-0">
              <Sprout className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl sm:text-2xl text-agri-950 tracking-tight">
                  {language === 'mr' ? 'क्षेत्र' : language === 'hi' ? 'क्षेत्र' : 'KSHETRA'}
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 uppercase">
                  {currentDistrict}
                </span>
              </div>
            </div>
          </div>

          {/* Right Controls: Language Switcher & Skip Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-300 shadow-inner">
              {languages.map((item) => (
                <button
                  key={item.code}
                  onClick={() => setLanguage(item.code)}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                    language === item.code
                      ? 'bg-emerald-800 text-white shadow-sm ring-1 ring-emerald-600'
                      : 'text-gray-700 hover:text-emerald-950 hover:bg-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Prominent Header Skip Button */}
            {onSkip && (
              <button
                type="button"
                onClick={onSkip}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-farmer active:scale-95 transition-all border border-emerald-500"
                title={t.skipForNow}
              >
                <span>{t.skip}</span>
                <ArrowRight className="w-4 h-4 text-amber-300 animate-pulse" />
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-8 flex flex-col items-center">
        
        {/* Welcome Tagline */}
        <div className="text-center max-w-2xl mb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-950 text-xs font-extrabold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.welcomeToPlatform || t.appSubtitle}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 tracking-tight">
            {language === 'mr'
              ? 'डिजिटल शेतकरी मंचावर आपले स्वागत आहे'
              : language === 'hi'
              ? 'डिजिटल किसान मंच में आपका स्वागत है'
              : 'Welcome to KSHETRA Farmer Platform'}
          </h1>

          <p className="text-xs sm:text-sm text-gray-600 font-medium max-w-xl mx-auto">
            {language === 'mr'
              ? 'आपल्या परिसरातील सर्व ट्रॅक्टर, कृषी अवजारे, सामायिक वाहतूक, बाजारभाव व २४x७ मिस्त्री सेवा.'
              : language === 'hi'
              ? 'अपने क्षेत्र के सभी ट्रैक्टर, कृषि यंत्र, साझा ढुलाई, मंडी भाव और 24x7 मिस्त्री सेवा।'
              : 'Connecting farmers with tractors, shared freight, net-profit mandi rates, and field SOS mechanics.'}
          </p>

          {/* Quick Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className="px-2.5 py-1 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold flex items-center gap-1 shadow-2xs">
              <Tractor className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'mr' ? 'अवजारे भाडे' : language === 'hi' ? 'यंत्र किराया' : 'Machinery'}</span>
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold flex items-center gap-1 shadow-2xs">
              <Truck className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'mr' ? 'गट वाहतूक' : language === 'hi' ? 'साझा परिवहन' : 'Freight Pooling'}</span>
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold flex items-center gap-1 shadow-2xs">
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'mr' ? 'थेट बाजारभाव' : language === 'hi' ? 'मंडी मुनाफा' : 'Mandi Rates'}</span>
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold flex items-center gap-1 shadow-2xs">
              <Wrench className="w-3.5 h-3.5 text-rose-600" />
              <span>{language === 'mr' ? 'मिस्त्री SOS' : language === 'hi' ? 'मिस्त्री SOS' : 'Mechanic SOS'}</span>
            </span>
          </div>
        </div>

        {/* Auth Card embedded in Page mode */}
        <div className="w-full max-w-lg mb-6">
          <AuthModal
            isOpen={true}
            isPage={true}
            initialMode={authMode}
            onSkip={onSkip}
            onAuthSuccess={onAuthSuccess}
          />
        </div>

        {/* Secondary Guest Exploration Banner */}
        {onSkip && (
          <div className="w-full max-w-lg bg-gradient-to-r from-emerald-100/70 via-teal-50 to-emerald-100/70 border border-emerald-300 rounded-3xl p-4 sm:p-5 shadow-sm text-center space-y-2.5 mb-8">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <h4 className="font-extrabold text-sm sm:text-base text-emerald-950">
                {language === 'mr' 
                  ? 'लॉगिन न करता थेट ॲप तपासायचे आहे का?' 
                  : language === 'hi'
                  ? 'बिना लॉगिन सीधे ऐप देखना चाहते हैं?'
                  : 'Want to explore the app first without logging in?'}
              </h4>
            </div>

            <p className="text-xs text-gray-600 font-medium">
              {t.skipSubtitle}
            </p>

            <button
              type="button"
              onClick={onSkip}
              className="w-full py-3 px-4 bg-white hover:bg-emerald-50 text-emerald-950 font-black text-xs sm:text-sm rounded-2xl border-2 border-emerald-600 shadow-sm flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <span>{t.continueAsGuest}</span>
              <ChevronRight className="w-4 h-4 text-emerald-700" />
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-agri-950 text-white border-t border-agri-900 py-5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-agri-300">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              🌱
            </div>
            <span className="font-extrabold text-sm text-white">
              {language === 'mr' ? 'क्षेत्र KSHETRA' : language === 'hi' ? 'क्षेत्र KSHETRA' : 'KSHETRA'}
            </span>
            <span className="text-white/40">•</span>
            <span>{selectedLocation.name[language] || selectedLocation.name.mr}</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a href="tel:18001801551" className="text-amber-400 font-bold hover:underline">
              📞 1800-180-1551 ({t.tollFreeLabel})
            </a>
            <span className="text-white/30">•</span>
            <span>© 2026 KSHETRA. {t.allRightsReserved}</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
