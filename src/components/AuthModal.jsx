import React, { useState, useEffect } from 'react';
import { 
  User, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  X, 
  ArrowRight, 
  KeyRound, 
  Smartphone, 
  MapPin, 
  Sprout, 
  Tractor, 
  Clock, 
  RefreshCw,
  LogOut,
  Layers,
  Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LOCATIONS } from '../data/seedData';
import { AudioReadButton } from './AudioReadButton';

export const AuthModal = ({ isOpen = true, onClose, onAuthSuccess, isPage = false }) => {
  const { 
    language, 
    t, 
    currentUser, 
    loginUser, 
    logoutUser, 
    role, 
    setRole, 
    selectedLocation, 
    setSelectedLocation,
    farmerBookings 
  } = useLanguage();

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [loginMethod, setLoginMethod] = useState('otp'); // 'otp' | 'pin'
  
  // Login Form State
  const [mobile, setMobile] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  
  // OTP Flow State
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [simulatedSmsBanner, setSimulatedSmsBanner] = useState('');

  // Sign Up Form State
  const [signupName, setSignupName] = useState('');
  const [signupMobile, setSignupMobile] = useState('');
  const [signupRole, setSignupRole] = useState('farmer'); // 'farmer' | 'provider'
  const [signupLocationId, setSignupLocationId] = useState(selectedLocation.id);
  const [signupLandAcre, setSignupLandAcre] = useState('3.5');
  const [signupCrop, setSignupCrop] = useState(language === 'mr' ? 'कांदा व ऊस' : language === 'hi' ? 'प्याज व गन्ना' : 'Onion & Sugarcane');
  const [signupPin, setSignupPin] = useState('');
  const [signupShowPin, setSignupShowPin] = useState(false);

  // Countdown timer for OTP
  useEffect(() => {
    let interval = null;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  if (!isOpen && !isPage) return null;

  // Handle Send OTP
  const handleSendOtp = (e) => {
    e?.preventDefault();
    if (!mobile || mobile.length < 10) {
      alert(language === 'mr' ? 'कृपया वैध १० अंकी मोबाईल नंबर टाका' : language === 'hi' ? 'कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें' : 'Please enter valid 10-digit mobile number');
      return;
    }
    setOtpSent(true);
    setOtpTimer(45);
    setOtpValue('');
    const sms = language === 'mr'
      ? `[KSHETRA SMS] आपला एकवेळचा लॉगिन पासवर्ड (OTP) १२३४ (1234) आहे. कोणाशीही शेअर करू नका.`
      : language === 'hi'
      ? `[KSHETRA SMS] आपका वन-टाइम लॉगिन पासवर्ड (OTP) 1234 है। किसी से साझा न करें।`
      : `[KSHETRA SMS] Your one-time login OTP is 1234. Do not share with anyone.`;
    setSimulatedSmsBanner(sms);
  };

  // Auto-fill demo OTP
  const handleFillDemoOtp = () => {
    setOtpValue('1234');
  };

  // Handle Login Submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginMethod === 'otp') {
      if (otpValue !== '1234') {
        alert(language === 'mr' ? 'अवैध OTP! चाचणीसाठी १२३४ (1234) वापरा.' : language === 'hi' ? 'अमान्य OTP! टेस्ट के लिए 1234 दर्ज करें।' : 'Invalid OTP! Please use 1234 for testing.');
        return;
      }
    } else {
      if (!pin || pin.length < 4) {
        alert(language === 'mr' ? 'कृपया ४-अंकी किसान पिन टाका' : language === 'hi' ? 'कृपया 4-अंकीय किसान पिन दर्ज करें' : 'Please enter 4-digit Kisan PIN');
        return;
      }
    }

    const loc = LOCATIONS.find((l) => l.id === selectedLocation.id) || LOCATIONS[0];
    const user = {
      id: `usr-${mobile.slice(-4) || '9876'}`,
      name: mobile === '9822054123' 
        ? (language === 'mr' ? 'ज्ञानेश्वर जाधव' : language === 'hi' ? 'ज्ञानेश्वर जाधव' : 'Dnyaneshwar Jadhav')
        : (language === 'mr' ? 'रमेश ज्ञानोबा पाटील' : language === 'hi' ? 'रमेश ज्ञानोबा पाटिल' : 'Ramesh Gyanoba Patil'),
      mobile: mobile || '9822012345',
      role: mobile === '9822054123' ? 'provider' : 'farmer',
      location: loc,
      landAcre: mobile === '9822054123' ? '7.0' : '4.0',
      primaryCrop: mobile === '9822054123' ? 'Sugarcane & Soybean' : 'Onion & Sugarcane',
      joinedDate: '2026-03-15',
      isVerified: true
    };

    loginUser(user);
    if (onAuthSuccess) onAuthSuccess(user);
    if (onClose) onClose();
  };

  // Handle Quick Demo Login
  const handleDemoLogin = (profileType) => {
    let demoUser = null;
    if (profileType === 'farmer') {
      const loc = LOCATIONS.find((l) => l.id === 'shirur') || LOCATIONS[0];
      setSelectedLocation(loc);
      demoUser = {
        id: 'usr-9822',
        name: language === 'mr' ? 'रमेश पाटील' : language === 'hi' ? 'रमेश पाटिल' : 'Ramesh Patil',
        mobile: '9822012345',
        role: 'farmer',
        location: loc,
        landAcre: '4.5',
        primaryCrop: language === 'mr' ? 'कांदा व ऊस' : language === 'hi' ? 'प्याज व गन्ना' : 'Onion & Sugarcane',
        joinedDate: '2026-02-10',
        isVerified: true
      };
    } else {
      const loc = LOCATIONS.find((l) => l.id === 'shirur') || LOCATIONS[0];
      setSelectedLocation(loc);
      demoUser = {
        id: 'usr-5412',
        name: language === 'mr' ? 'ज्ञानेश्वर जाधव' : language === 'hi' ? 'ज्ञानेश्वर जाधव' : 'Dnyaneshwar Jadhav',
        mobile: '9822054123',
        role: 'provider',
        location: loc,
        landAcre: '8.0',
        primaryCrop: language === 'mr' ? 'सोयाबीन व कापूस' : language === 'hi' ? 'सोयाबीन व कपास' : 'Soybean & Cotton',
        joinedDate: '2026-01-20',
        isVerified: true,
        machinesOwned: 2
      };
    }

    loginUser(demoUser);
    if (onAuthSuccess) onAuthSuccess(demoUser);
    if (onClose) onClose();
  };

  // Handle Sign Up Submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupName.trim()) {
      alert(language === 'mr' ? 'कृपया आपले पूर्ण नाव टाका' : language === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें' : 'Please enter full name');
      return;
    }
    if (!signupMobile || signupMobile.length < 10) {
      alert(language === 'mr' ? 'कृपया १०-अंकी मोबाईल नंबर टाका' : language === 'hi' ? 'कृपया 10-अंकीय मोबाइल नंबर दर्ज करें' : 'Please enter 10-digit mobile number');
      return;
    }

    const loc = LOCATIONS.find((l) => l.id === signupLocationId) || selectedLocation;
    setSelectedLocation(loc);

    const newUser = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: signupName.trim(),
      mobile: signupMobile,
      role: signupRole,
      location: loc,
      landAcre: signupLandAcre || '2.0',
      primaryCrop: signupCrop || 'कांदा / Onion',
      joinedDate: '2026-09-30',
      isVerified: true
    };

    loginUser(newUser);
    if (onAuthSuccess) onAuthSuccess(newUser);
    if (onClose) onClose();
  };

  // Content for when already logged in
  if (currentUser) {
    const locName = currentUser.location?.name?.[language] || currentUser.location?.name?.mr || selectedLocation.name[language] || selectedLocation.name.mr;
    const isFarmerRole = currentUser.role === 'farmer';

    return (
      <div className={isPage ? 'w-full max-w-2xl mx-auto py-6' : 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in'}>
        <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-emerald-200 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-agri-900 to-emerald-950 text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-harvest-600 text-gray-950 flex items-center justify-center font-black text-xl shadow-md">
                {currentUser.name ? currentUser.name.charAt(0) : '🌾'}
              </div>
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-700/60 text-emerald-200 border border-emerald-500/30">
                  {isFarmerRole ? t.registeredFarmer : t.registeredProvider}
                </span>
                <h3 className="text-lg font-black text-white mt-0.5 flex items-center gap-1.5">
                  <span>{currentUser.name}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </h3>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Profile Card Body */}
          <div className="p-5 sm:p-6 space-y-4">
            {/* Digital Kisan Card */}
            <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white rounded-2xl p-4 border border-emerald-300 shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 text-right">
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded-full border border-emerald-300">
                  ID: {currentUser.id}
                </span>
              </div>

              <div className="text-xs space-y-2 text-gray-700">
                <div className="flex items-center gap-2 text-agri-950 font-bold text-sm">
                  <User className="w-4 h-4 text-emerald-700" />
                  <span>{currentUser.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span className="font-semibold text-gray-900">+91 {currentUser.mobile}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span className="font-semibold">{locName}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200/80 text-xs">
                  <div>
                    <span className="text-gray-500 block text-[11px]">{t.landSize}:</span>
                    <strong className="text-gray-900">{currentUser.landAcre} {language === 'mr' ? 'एकर' : language === 'hi' ? 'एकड़' : 'Acres'}</strong>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[11px]">{t.primaryCrop}:</span>
                    <strong className="text-gray-900">{currentUser.primaryCrop}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="block text-[11px] text-gray-500 font-bold uppercase">{t.activeBookingsAlert.split(':')[0]}</span>
                <span className="text-xl font-black text-emerald-800">{farmerBookings.length}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="block text-[11px] text-gray-500 font-bold uppercase">{t.roleFarmer}</span>
                <span className="text-xs font-black text-gray-800 mt-1 block">
                  {currentUser.role === 'farmer' ? (language === 'mr' ? 'शेतकरी' : language === 'hi' ? 'किसान' : 'Farmer') : (language === 'mr' ? 'यंत्रमालक' : language === 'hi' ? 'मशीन मालिक' : 'Owner')}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  const nextRole = currentUser.role === 'farmer' ? 'provider' : 'farmer';
                  const updated = { ...currentUser, role: nextRole };
                  loginUser(updated);
                  setRole(nextRole);
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center justify-center gap-2 transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-emerald-700" />
                <span>{t.switchRole}: {currentUser.role === 'farmer' ? t.roleProvider : t.roleFarmer}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  logoutUser();
                  if (onClose) onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4 text-rose-600" />
                <span>{t.logout}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const modalContainerClasses = isPage
    ? 'w-full max-w-xl mx-auto my-4'
    : 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in';

  return (
    <div className={modalContainerClasses}>
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-emerald-200 overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Agri Header */}
        <div className="bg-gradient-to-r from-agri-900 via-emerald-950 to-teal-950 text-white p-4 sm:p-5 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-harvest-600 text-gray-950 flex items-center justify-center font-black shadow-md flex-shrink-0">
                <Sprout className="w-6 h-6 text-gray-950" />
              </div>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-white flex items-center gap-1.5">
                  <span>{authMode === 'login' ? t.welcomeBack : t.createAccount}</span>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </h3>
                <p className="text-[11px] text-emerald-200 font-medium">
                  {authMode === 'login' ? t.loginSubtitle : t.signupSubtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <AudioReadButton
                id="auth-helper-audio"
                text={t.authAudioIntro}
                label={t.listen}
                className="bg-amber-400 hover:bg-amber-300 text-gray-950 font-black shadow-sm text-xs py-1 px-2.5"
              />
              {onClose && !isPage && (
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Segmented Auth Mode Switcher */}
          <div className="mt-4 grid grid-cols-2 bg-black/30 p-1 rounded-2xl border border-white/15">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setOtpSent(false);
              }}
              className={`py-2 text-xs sm:text-sm font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'login'
                  ? 'bg-amber-400 text-gray-950 shadow-md'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{t.login}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setOtpSent(false);
              }}
              className={`py-2 text-xs sm:text-sm font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'signup'
                  ? 'bg-amber-400 text-gray-950 shadow-md'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{t.signup}</span>
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* Simulated SMS Alert Banner when OTP is sent */}
          {otpSent && simulatedSmsBanner && (
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3 text-xs text-amber-950 animate-in slide-in-from-top-2 shadow-sm space-y-1.5">
              <div className="flex items-center justify-between font-bold text-amber-900">
                <span className="flex items-center gap-1">
                  <Smartphone className="w-4 h-4 text-amber-700" />
                  <span>{language === 'mr' ? 'प्राप्त झालेला SMS (चाचणी संदेश):' : language === 'hi' ? 'प्राप्त SMS (टेस्ट मैसेज):' : 'Received SMS (Test Simulation):'}</span>
                </span>
                <span className="bg-amber-200 text-amber-950 px-1.5 py-0.5 rounded text-[10px] font-mono">
                  OTP: 1234
                </span>
              </div>
              <p className="font-semibold text-gray-800 italic">"{simulatedSmsBanner}"</p>
              <button
                type="button"
                onClick={handleFillDemoOtp}
                className="w-full py-1.5 bg-amber-400 hover:bg-amber-500 text-gray-950 rounded-xl font-black text-xs transition-colors flex items-center justify-center gap-1 shadow-sm mt-1"
              >
                <span>⚡ {t.fillDemoOtp}</span>
              </button>
            </div>
          )}

          {/* ================= LOGIN MODE ================= */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Method Toggle: OTP vs Kisan PIN */}
              <div className="flex items-center justify-center gap-2 p-1 bg-gray-100 rounded-2xl border border-gray-200 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('otp');
                    setOtpSent(false);
                  }}
                  className={`flex-1 py-1.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1 ${
                    loginMethod === 'otp'
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{t.loginWithOtp}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('pin')}
                  className={`flex-1 py-1.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1 ${
                    loginMethod === 'pin'
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t.loginWithPin}</span>
                </button>
              </div>

              {/* Mobile Number Field */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  📞 {t.mobileNumber}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-500 text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="98220 12345"
                    required
                    className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-2xl text-sm font-bold text-gray-900 tracking-wider focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* METHOD 1: OTP FLOW */}
              {loginMethod === 'otp' && (
                <div>
                  {!otpSent ? (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="w-full py-3 bg-gradient-to-r from-emerald-700 to-agri-900 hover:from-emerald-800 hover:to-agri-950 text-white rounded-2xl font-black text-sm shadow-farmer active:scale-98 transition-all flex items-center justify-center gap-2"
                    >
                      <span>{t.sendOtp}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="space-y-3 pt-1">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-xs font-bold text-gray-700 uppercase">
                            🔑 {t.enterOtp}
                          </label>
                          <span className="text-[11px] font-bold text-emerald-800">
                            {t.otpSentTo} {mobile}
                          </span>
                        </div>
                        <input
                          type="text"
                          maxLength={4}
                          value={otpValue}
                          onChange={(e) => setOtpValue(e.target.value.replace(/[^0-9]/g, ''))}
                          placeholder="• • • •"
                          autoFocus
                          required
                          className="w-full py-2.5 text-center text-xl font-mono font-black tracking-widest bg-emerald-50/50 border-2 border-emerald-400 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        {otpTimer > 0 ? (
                          <span className="text-gray-500 font-semibold flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{t.resendOtp} {otpTimer}s</span>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            className="font-bold text-emerald-800 hover:underline"
                          >
                            {t.resendNow}
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="text-gray-500 hover:text-gray-700 text-xs"
                        >
                          {language === 'mr' ? 'नंबर बदला' : language === 'hi' ? 'नंबर बदलें' : 'Change Number'}
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-agri-900 hover:from-emerald-700 hover:to-agri-950 text-white rounded-2xl font-black text-sm sm:text-base shadow-farmer active:scale-98 transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5 text-amber-300" />
                        <span>{t.verifyAndLogin}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* METHOD 2: KISAN PIN FLOW */}
              {loginMethod === 'pin' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      🔒 {t.kisanPin}
                    </label>
                    <div className="relative">
                      <input
                        type={showPin ? 'text' : 'password'}
                        maxLength={6}
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="••••"
                        required
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-2xl text-sm font-bold text-gray-900 tracking-widest focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPin(!showPin)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-1.5 text-gray-600 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-emerald-700 focus:ring-0" />
                      <span>{t.rememberMe}</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setLoginMethod('otp')}
                      className="text-emerald-800 font-bold hover:underline"
                    >
                      {t.forgotPin} {t.resetPin}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-agri-900 hover:from-emerald-700 hover:to-agri-950 text-white rounded-2xl font-black text-sm sm:text-base shadow-farmer active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5 text-amber-300" />
                    <span>{t.login}</span>
                  </button>
                </div>
              )}

              {/* Quick 1-Click Demo Logins */}
              <div className="pt-3 border-t border-gray-200">
                <span className="block text-[11px] font-extrabold text-gray-500 uppercase tracking-wider mb-2 text-center">
                  ⚡ {t.quickDemoLogin}:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('farmer')}
                    className="p-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 text-left transition-all group"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <span>🌾</span>
                      <span className="truncate">{language === 'mr' ? 'रमेश पाटील' : language === 'hi' ? 'रमेश पाटिल' : 'Ramesh Patil'}</span>
                    </div>
                    <span className="text-[10px] text-emerald-800 block mt-0.5">
                      {language === 'mr' ? 'शेतकरी (शिरूर, ४ एकर)' : language === 'hi' ? 'किसान (शिरूर, 4 एकड़)' : 'Farmer (Shirur, 4 Ac)'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin('provider')}
                    className="p-2.5 rounded-2xl bg-harvest-50 hover:bg-harvest-100 text-harvest-950 border border-harvest-300 text-left transition-all group"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <span>🚜</span>
                      <span className="truncate">{language === 'mr' ? 'ज्ञानेश्वर जाधव' : language === 'hi' ? 'ज्ञानेश्वर जाधव' : 'D. Jadhav'}</span>
                    </div>
                    <span className="text-[10px] text-harvest-800 block mt-0.5">
                      {language === 'mr' ? 'यंत्रमालक (ट्रॅक्टर/रोटाव्हेटर)' : language === 'hi' ? 'मशीन मालिक (ट्रैक्टर)' : 'Owner (Tractor/CHC)'}
                    </span>
                  </button>
                </div>
              </div>

            </form>
          )}

          {/* ================= SIGN UP MODE ================= */}
          {authMode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  👤 {t.fullName}
                </label>
                <input
                  type="text"
                  required
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder={t.enterFullName}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-2xl text-xs sm:text-sm font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  📞 {t.mobileNumber}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-500 text-xs sm:text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    value={signupMobile}
                    onChange={(e) => setSignupMobile(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="98220 12345"
                    className="w-full pl-11 pr-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-2xl text-xs sm:text-sm font-bold text-gray-900 tracking-wider focus:bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Role Selection Cards */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  🌾 {t.selectRole}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div
                    onClick={() => setSignupRole('farmer')}
                    className={`cursor-pointer p-3 rounded-2xl border transition-all ${
                      signupRole === 'farmer'
                        ? 'bg-emerald-100/70 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-950 font-bold'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-extrabold mb-1">
                      <span>🌾</span>
                      <span>{t.roleFarmer}</span>
                    </div>
                    <p className="text-[10px] text-gray-600 font-normal line-clamp-2">
                      {t.roleFarmerDesc}
                    </p>
                  </div>

                  <div
                    onClick={() => setSignupRole('provider')}
                    className={`cursor-pointer p-3 rounded-2xl border transition-all ${
                      signupRole === 'provider'
                        ? 'bg-harvest-100/70 border-harvest-500 ring-2 ring-harvest-500/20 text-harvest-950 font-bold'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-extrabold mb-1">
                      <span>🚜</span>
                      <span>{t.roleProvider}</span>
                    </div>
                    <p className="text-[10px] text-gray-600 font-normal line-clamp-2">
                      {t.roleProviderDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Village / Hub Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    📍 {t.villageHub}
                  </label>
                  <select
                    value={signupLocationId}
                    onChange={(e) => setSignupLocationId(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-2xl text-xs font-bold text-gray-900 focus:outline-none"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name[language] || loc.name.mr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    🌱 {t.landSize}
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={signupLandAcre}
                    onChange={(e) => setSignupLandAcre(e.target.value)}
                    placeholder="3.5"
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-2xl text-xs font-bold text-gray-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Primary Crop */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  🌾 {t.primaryCrop}
                </label>
                <input
                  type="text"
                  value={signupCrop}
                  onChange={(e) => setSignupCrop(e.target.value)}
                  placeholder={language === 'mr' ? 'कांदा, ऊस, कापूस' : language === 'hi' ? 'प्याज, गन्ना, कपास' : 'Onion, Sugarcane, Cotton'}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-2xl text-xs sm:text-sm font-bold text-gray-900 focus:outline-none"
                />
              </div>

              {/* Set 4-Digit Secret PIN */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  🔒 {t.kisanPin}
                </label>
                <div className="relative">
                  <input
                    type={signupShowPin ? 'text' : 'password'}
                    maxLength={4}
                    value={signupPin}
                    onChange={(e) => setSignupPin(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="1234"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-2xl text-xs sm:text-sm font-bold text-gray-900 tracking-widest focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setSignupShowPin(!signupShowPin)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {signupShowPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Guarantee Pill */}
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{t.safeAndSecure}</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-agri-900 hover:from-emerald-700 hover:to-agri-950 text-white rounded-2xl font-black text-sm sm:text-base shadow-farmer active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 text-amber-300" />
                <span>{t.createAccount}</span>
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
