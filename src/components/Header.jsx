import React, { useState } from 'react';
import { 
  Sprout, 
  MapPin, 
  UserCheck, 
  PhoneCall, 
  Mic, 
  ChevronDown, 
  Wrench, 
  Truck, 
  TrendingUp, 
  Layers,
  Check,
  User,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LOCATIONS } from '../data/seedData';

export const Header = ({ activeTab, setActiveTab, setIsVoiceModalOpen, setIsAuthModalOpen, openAuthModal }) => {
  const { 
    language, 
    setLanguage, 
    t, 
    role, 
    setRole, 
    selectedLocation, 
    setSelectedLocation,
    currentUser,
    logoutUser
  } = useLanguage();
  
  const [showLocationMenu, setShowLocationMenu] = useState(false);

  const languages = [
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'en', label: 'English' }
  ];

  const currentDistrict = typeof selectedLocation.district === 'object'
    ? (selectedLocation.district[language] || selectedLocation.district.mr)
    : selectedLocation.district;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      {/* Top Helpline Bar */}
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

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo & Platform Name */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-agri-800 to-agri-950 flex items-center justify-center text-white shadow-farmer group-hover:scale-105 transition-transform flex-shrink-0">
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

          {/* Location Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLocationMenu(!showLocationMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 rounded-xl border border-emerald-300 text-xs sm:text-sm font-bold transition-all shadow-sm"
            >
              <MapPin className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span className="truncate max-w-[90px] sm:max-w-[130px]">
                {selectedLocation.name[language] || selectedLocation.name.mr}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-700" />
            </button>

            {showLocationMenu && (
              <div className="absolute right-0 sm:left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-emerald-200 py-2 z-50 animate-in fade-in">
                <div className="px-3 py-1 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">
                  📍 {t.changeLocation}
                </div>
                {LOCATIONS.map((loc) => {
                  const isSelected = selectedLocation.id === loc.id;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => {
                        setSelectedLocation(loc);
                        setShowLocationMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs sm:text-sm font-medium hover:bg-emerald-50 flex items-center justify-between transition-colors ${
                        isSelected ? 'bg-emerald-100/70 text-emerald-950 font-bold' : 'text-gray-700'
                      }`}
                    >
                      <div>
                        <span className="block font-bold">{loc.name[language] || loc.name.mr}</span>
                        <span className="text-[10px] text-gray-500">
                          {loc.primaryCrops[language] || loc.primaryCrops.mr}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Vani-AI Voice Trigger */}
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-700 to-agri-900 hover:from-emerald-800 hover:to-agri-950 text-white rounded-xl font-bold text-xs sm:text-sm shadow-farmer active:scale-95 transition-all"
            title={t.vaniVoiceTitle}
          >
            <div className="relative">
              <Mic className="w-4 h-4 text-amber-300" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping" />
            </div>
            <span className="hidden sm:inline">{language === 'en' ? 'Vani-AI' : 'वाणी-AI'}</span>
            <span className="sm:hidden">{t.voiceSearchTitle}</span>
          </button>

          {/* Improved Prominent Language Switcher */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-300 shadow-inner">
            {languages.map((item) => (
              <button
                key={item.code}
                onClick={() => setLanguage(item.code)}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-black transition-all ${
                  language === item.code
                    ? 'bg-emerald-800 text-white shadow-sm ring-1 ring-emerald-600'
                    : 'text-gray-700 hover:text-emerald-950 hover:bg-gray-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* User Auth Section */}
          <div className="flex items-center">
            {currentUser ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => openAuthModal ? openAuthModal('profile') : (setIsAuthModalOpen ? setIsAuthModalOpen(true) : setActiveTab('auth'))}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 hover:from-emerald-200 hover:to-teal-200 text-emerald-950 rounded-xl border border-emerald-300 text-xs sm:text-sm font-bold shadow-sm transition-all"
                  title={`${currentUser.name} (${currentUser.role === 'farmer' ? t.roleFarmer : t.roleProvider})`}
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px] font-black shadow-inner">
                    {currentUser.name ? currentUser.name.charAt(0) : '🌾'}
                  </div>
                  <span className="truncate max-w-[75px] sm:max-w-[110px]">{currentUser.name}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                </button>

                <button
                  onClick={logoutUser}
                  className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-900 rounded-xl border border-rose-200 text-xs font-bold transition-all shadow-sm active:scale-95"
                  title={t.logout}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.logout}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openAuthModal ? openAuthModal('login') : (setIsAuthModalOpen ? setIsAuthModalOpen(true) : setActiveTab('auth'))}
                  className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-emerald-700 to-agri-900 hover:from-emerald-800 hover:to-agri-950 text-white rounded-xl text-xs sm:text-sm font-black shadow-sm active:scale-95 transition-all"
                  title={t.login}
                >
                  <User className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t.login}</span>
                </button>

                <button
                  onClick={() => openAuthModal ? openAuthModal('signup') : (setIsAuthModalOpen ? setIsAuthModalOpen(true) : setActiveTab('auth'))}
                  className="hidden xs:flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-gray-950 rounded-xl text-xs sm:text-sm font-black shadow-sm active:scale-95 transition-all border border-amber-500"
                  title={t.signup}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-gray-950" />
                  <span>{t.register || t.signup}</span>
                </button>
              </div>
            )}
          </div>

          {/* Role Switcher */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => {
                const next = role === 'farmer' ? 'provider' : 'farmer';
                setRole(next);
                setActiveTab(next === 'provider' ? 'provider' : 'home');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs border transition-all ${
                role === 'farmer'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 hover:bg-emerald-100'
                  : 'bg-harvest-50 border-harvest-400 text-harvest-950 hover:bg-harvest-100'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{role === 'farmer' ? t.roleFarmer : t.roleProvider}</span>
            </button>
          </div>

        </div>

        {/* Navigation Tabs */}
        <nav className="mt-2.5 pt-2 border-t border-gray-100 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors touch-target ${
              activeTab === 'home'
                ? 'bg-agri-900 text-white shadow-sm'
                : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-950'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>{t.navHome}</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors touch-target ${
              activeTab === 'services'
                ? 'bg-agri-900 text-white shadow-sm'
                : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-950'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t.navServices}</span>
          </button>

          <button
            onClick={() => setActiveTab('pooling')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors touch-target ${
              activeTab === 'pooling'
                ? 'bg-blue-800 text-white shadow-sm'
                : 'text-blue-900 bg-blue-50/70 hover:bg-blue-100'
            }`}
          >
            <Truck className="w-4 h-4 text-blue-600" />
            <span>{t.navPooling}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400 text-gray-950 font-black">
              {t.save50}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('arbitrage')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors touch-target ${
              activeTab === 'arbitrage'
                ? 'bg-harvest-800 text-white shadow-sm'
                : 'text-harvest-900 bg-harvest-50/80 hover:bg-harvest-100'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-harvest-600" />
            <span>{t.navArbitrage}</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-600 text-white font-black">
              {language === 'mr' ? 'नफा' : language === 'hi' ? 'मुनाफा' : 'ROI'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('sos')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors touch-target ${
              activeTab === 'sos'
                ? 'bg-rose-700 text-white shadow-sm'
                : 'text-rose-700 bg-rose-50/80 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <Wrench className="w-4 h-4 text-rose-600" />
            <span>{t.navSos}</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          </button>

          <button
            onClick={() => setActiveTab('provider')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors touch-target ml-auto ${
              activeTab === 'provider'
                ? 'bg-stone-800 text-white shadow-sm'
                : 'text-stone-800 bg-stone-100 hover:bg-stone-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{t.navProvider}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
