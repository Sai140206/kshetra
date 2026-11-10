import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Header } from './components/Header';
import { WeatherAdvisory } from './components/WeatherAdvisory';
import { CategoryGrid } from './components/CategoryGrid';
import { ServiceListings } from './components/ServiceListings';
import { SahaKisanPooling } from './components/SahaKisanPooling';
import { MandiArbitrage } from './components/MandiArbitrage';
import { GramMechanicSOS } from './components/GramMechanicSOS';
import { ProviderDashboard } from './components/ProviderDashboard';
import { VaniVoiceModal } from './components/VaniVoiceModal';
import { AuthModal } from './components/AuthModal';
import { 
  Truck, 
  TrendingUp, 
  Wrench, 
  ChevronRight, 
  ArrowRight, 
  Mic 
} from 'lucide-react';

const MainAppContent = () => {
  const { language, t, toastMessage, farmerBookings, selectedLocation } = useLanguage();

  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [showBookingsDrawer, setShowBookingsDrawer] = useState(false);
  const [voiceSearchQuery, setVoiceSearchQuery] = useState('');
  const [voiceCropId, setVoiceCropId] = useState('onion');
  const [voiceIssue, setVoiceIssue] = useState('tractor_engine');

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  // Handle voice command selection
  const handleSelectVoiceAction = (targetTab, filterOrQuery) => {
    setActiveTab(targetTab);
    if (targetTab === 'services') {
      setVoiceSearchQuery(filterOrQuery || '');
      setActiveCategory('all');
    } else if (targetTab === 'arbitrage') {
      if (['onion', 'soybean', 'cotton', 'wheat'].includes(filterOrQuery)) {
        setVoiceCropId(filterOrQuery);
      }
    } else if (targetTab === 'sos') {
      if (['tractor_engine', 'borewell_pump', 'harvester_cutter', 'sprayer_drone'].includes(filterOrQuery)) {
        setVoiceIssue(filterOrQuery);
      }
    }
  };

  const currentDistrict = typeof selectedLocation.district === 'object'
    ? (selectedLocation.district[language] || selectedLocation.district.mr)
    : selectedLocation.district;

  return (
    <div className="min-h-screen bg-[#F8FAF6] text-gray-900 flex flex-col antialiased">
      
      {/* Sticky Header with Language Switcher */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setIsVoiceModalOpen={setIsVoiceModalOpen} 
        setIsAuthModalOpen={setIsAuthModalOpen}
        openAuthModal={openAuthModal}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-3 sm:py-4">
        
        {/* Quick Farmer Bookings Indicator */}
        {farmerBookings.length > 0 && (
          <div className="mb-3 bg-emerald-50 border border-emerald-300 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between shadow-sm animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
              <span className="text-xs sm:text-sm font-bold text-emerald-950">
                {t.activeBookingsAlert.replace('{count}', farmerBookings.length)}
              </span>
            </div>
            <button
              onClick={() => setShowBookingsDrawer(!showBookingsDrawer)}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline flex items-center gap-1"
            >
              <span>{showBookingsDrawer ? t.hideBtn : t.viewBtn}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Farmer Bookings Expanded Drawer */}
        {showBookingsDrawer && farmerBookings.length > 0 && (
          <div className="mb-4 bg-white border border-emerald-200 rounded-2xl p-3 sm:p-4 shadow-sm space-y-2">
            <h4 className="font-extrabold text-sm text-gray-900">
              {t.myActiveBookings}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {farmerBookings.map((b) => (
                <div key={b.id} className="p-2.5 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-emerald-950 truncate">{b.serviceTitle}</span>
                    <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1 py-0.2 rounded font-mono">
                      {b.id}
                    </span>
                  </div>
                  <div className="text-gray-600 font-medium">{t.selectDate}: {b.date} • {b.duration} {b.unit}</div>
                  <div className="flex justify-between items-center pt-1 border-t border-emerald-200 font-bold">
                    <span>{t.costLabel}: ₹{b.total}</span>
                    <a href={`tel:${b.phone}`} className="text-emerald-800 hover:underline">
                      {t.callOwner} 📞
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 1: HOME DASHBOARD */}
        {activeTab === 'home' && (
          <div className="space-y-4">
            
            {/* Weather & Actionable Advisory Widget (Location Aware) */}
            <WeatherAdvisory />

            {/* Quick Category Grid */}
            <CategoryGrid 
              activeCategory={activeCategory}
              onSelectCategory={(catId) => setActiveCategory(catId)}
              setActiveTab={setActiveTab}
            />

            {/* 3 Sleek Compact Spotlight Cards (Low Text Density, High Visual Contrast) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              
              {/* Card 1: Saha-Kisan Pooling */}
              <div 
                onClick={() => setActiveTab('pooling')}
                className="cursor-pointer bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-4 shadow-sm hover:shadow-farmer transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/40">
                      {t.sharedFreight}
                    </span>
                    <span className="text-xs font-black text-amber-300">
                      {t.save50}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-white group-hover:text-blue-200 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-400" />
                    <span>{language === 'mr' ? 'सह-किसान वाटणी' : language === 'hi' ? 'सह-किसान साझा' : 'Saha-Kisan Pooling'}</span>
                  </h3>
                  <p className="text-xs text-blue-100/90 mt-1 line-clamp-1 font-semibold">
                    {language === 'mr'
                      ? `${currentDistrict} परिसरातील शेतकऱ्यांसोबत टेम्पो व ट्रक शेअर करा.`
                      : language === 'hi'
                      ? `${currentDistrict} के किसानों के साथ वाहन साझा करें।`
                      : `Share transport with farmers in ${currentDistrict}.`}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold text-blue-300 group-hover:text-white">
                  <span>{language === 'mr' ? 'सक्रिय गट पहा' : language === 'hi' ? 'सक्रिय समूह देखें' : 'View Pools'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 2: Smart Mandi Arbitrage */}
              <div 
                onClick={() => setActiveTab('arbitrage')}
                className="cursor-pointer bg-gradient-to-br from-harvest-800 to-soil-950 text-white rounded-2xl p-4 shadow-sm hover:shadow-farmer transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-200 border border-amber-400/40">
                      {language === 'mr' ? 'निव्वळ नफा तुलना' : language === 'hi' ? 'शुद्ध मुनाफा तुलना' : 'Net-Profit'}
                    </span>
                    <span className="text-xs font-black text-emerald-300">
                      {language === 'mr' ? 'सर्वोत्तम सौदा' : language === 'hi' ? 'सर्वोत्तम सौदा' : 'Best Deal'}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-white group-hover:text-amber-200 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <span>{t.arbitrageTitle.split(':')[0]}</span>
                  </h3>
                  <p className="text-xs text-amber-100/90 mt-1 line-clamp-1 font-semibold">
                    {language === 'mr'
                      ? 'डिझेल व हमाली वजा जाता हातात प्रत्यक्ष नफा जाणा.'
                      : language === 'hi'
                      ? 'डीजल व भाड़ा काटकर हाथ में शुद्ध मुनाफा देखें।'
                      : 'Calculate true take-home cash after deductions.'}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-300 group-hover:text-white">
                  <span>{language === 'mr' ? 'नफा तपासा' : language === 'hi' ? 'मुनाफा जांचें' : 'Calculate Profit'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 3: Gram-Mechanic SOS */}
              <div 
                onClick={() => setActiveTab('sos')}
                className="cursor-pointer bg-gradient-to-br from-rose-900 to-red-950 text-white rounded-2xl p-4 shadow-sm hover:shadow-farmer transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/40">
                      {t.minFieldDispatch}
                    </span>
                    <span className="text-xs font-black text-white flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      ETA 15 {t.minute}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-white group-hover:text-rose-200 flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-rose-400" />
                    <span>{t.sosTitle}</span>
                  </h3>
                  <p className="text-xs text-rose-100/90 mt-1 line-clamp-1 font-semibold">
                    {language === 'mr'
                      ? 'शेतात ट्रॅक्टर किंवा मोटर बंद पडल्यास १-टॅपमध्ये मेकॅनिक बोलवा.'
                      : language === 'hi'
                      ? 'खेत में ट्रैक्टर या मोटर खराब होने पर 1-टैप में मिस्त्री बुलाएं।'
                      : '1-Tap to dispatch verified mobile mechanics to your field.'}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold text-rose-300 group-hover:text-white">
                  <span>{language === 'mr' ? 'बीकन सुरू करा' : language === 'hi' ? 'बीकन सक्रिय करें' : 'Start Beacon'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>

            {/* Location-Specific Listings */}
            <div className="pt-2">
              <ServiceListings 
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                voiceSearchQuery={voiceSearchQuery}
                onClearVoiceSearch={() => setVoiceSearchQuery('')}
              />
            </div>

          </div>
        )}

        {/* TAB 2: ALL SERVICES & MACHINERY */}
        {activeTab === 'services' && (
          <ServiceListings 
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            voiceSearchQuery={voiceSearchQuery}
            onClearVoiceSearch={() => setVoiceSearchQuery('')}
          />
        )}

        {/* TAB 3: SAHA-KISAN POOLING */}
        {activeTab === 'pooling' && (
          <SahaKisanPooling />
        )}

        {/* TAB 4: MANDI ARBITRAGE CALCULATOR */}
        {activeTab === 'arbitrage' && (
          <MandiArbitrage initialCropId={voiceCropId} />
        )}

        {/* TAB 5: GRAM-MECHANIC SOS */}
        {activeTab === 'sos' && (
          <GramMechanicSOS initialIssue={voiceIssue} />
        )}

        {/* TAB 6: SERVICE PROVIDER / EQUIPMENT OWNER PORTAL */}
        {activeTab === 'provider' && (
          <ProviderDashboard />
        )}

        {/* TAB 7: LOGIN / SIGNUP / PROFILE */}
        {activeTab === 'auth' && (
          <AuthModal isPage={true} onAuthSuccess={() => setActiveTab('home')} />
        )}

      </main>

      {/* Floating Vani-AI Mic Button for Mobile Easy Thumb Access */}
      <button
        onClick={() => setIsVoiceModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-agri-800 text-white shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center border-2 border-white/60"
        title={t.vaniVoiceTitle}
      >
        <Mic className="w-7 h-7 text-amber-300" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping" />
      </button>

      {/* Floating Vani-AI Voice Modal */}
      <VaniVoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onSelectVoiceAction={handleSelectVoiceAction}
      />

      {/* Popup Auth Modal (Triggered from anywhere) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={() => setIsAuthModalOpen(false)}
      />

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5">
          <div className="px-4 py-2.5 rounded-2xl shadow-xl bg-gray-900 text-white text-xs sm:text-sm font-bold flex items-center gap-2 border border-gray-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{toastMessage.message}</span>
          </div>
        </div>
      )}

      {/* Compact Clean Footer */}
      <footer className="bg-agri-950 text-white border-t border-agri-900 mt-10 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-agri-300">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
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

export default function App() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}
