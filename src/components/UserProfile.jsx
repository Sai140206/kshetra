import React, { useState, useEffect } from 'react';
import { 
  User, 
  Phone, 
  MapPin, 
  Sprout, 
  Tractor, 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  Edit3, 
  Save, 
  X, 
  PlusCircle, 
  Trash2, 
  RefreshCw, 
  Star, 
  Layers, 
  Calendar, 
  ChevronRight, 
  Sparkles, 
  AlertCircle, 
  Briefcase, 
  Droplets, 
  Sun, 
  Truck,
  TrendingUp,
  Award,
  Check,
  ToggleLeft,
  ToggleRight,
  LogOut,
  Smartphone
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LOCATIONS } from '../data/seedData';
import { AudioReadButton } from './AudioReadButton';

// Avatar choices representing diverse agricultural personas
const AVATAR_OPTIONS = [
  { id: '👨‍🌾', label: { en: 'Farmer', mr: 'शेतकरी', hi: 'किसान' } },
  { id: '🚜', label: { en: 'Tractor Owner', mr: 'ट्रॅक्टर मालक', hi: 'ट्रैक्टर मालिक' } },
  { id: '🌾', label: { en: 'Harvester Pro', mr: 'हार्वेस्टर तज्ज्ञ', hi: 'हार्वेस्टर एक्सपर्ट' } },
  { id: '🚛', label: { en: 'Transporter', mr: 'मालवाहतूकदार', hi: 'वाहन चालक' } },
  { id: '🔧', label: { en: 'Gram Mechanic', mr: 'ग्राम मेकॅनिक', hi: 'ग्राम मिस्त्री' } },
  { id: '🚁', label: { en: 'Drone Pilot', mr: 'ड्रोन पायलट', hi: 'ड्रोन पायलट' } },
  { id: '👩‍🌾', label: { en: 'Woman Farmer', mr: 'महिला शेतकरी', hi: 'महिला किसान' } },
  { id: '💧', label: { en: 'Drip Expert', mr: 'सिंचन सल्लागार', hi: 'सिंचाई विशेषज्ञ' } },
];

export const UserProfile = ({ onClose, isPage = false, onNavigateTab }) => {
  const { 
    language, 
    t, 
    currentUser, 
    loginUser, 
    logoutUser, 
    updateUserProfile,
    switchUserMode,
    addMachineToProfile,
    removeMachineFromProfile,
    toggleMachineStatusInProfile,
    farmerBookings,
    selectedLocation,
    setSelectedLocation,
    role,
    setRole,
    showToast
  } = useLanguage();

  // If no user is logged in, provide an option to load demo or sign in
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(currentUser?.activeMode || role || 'farmer'); // 'farmer' | 'provider'

  // Edit form state
  const [editName, setEditName] = useState('');
  const [editMobile, setEditMobile] = useState('');
  const [editWhatsapp, setEditWhatsapp] = useState('');
  const [editAvatar, setEditAvatar] = useState('👨‍🌾');
  const [editLocationId, setEditLocationId] = useState('');
  const [editBio, setEditBio] = useState('');

  // Farmer specific fields
  const [editLandAcre, setEditLandAcre] = useState('');
  const [editPrimaryCrop, setEditPrimaryCrop] = useState('');
  const [editFarmingType, setEditFarmingType] = useState('');
  const [editIrrigationType, setEditIrrigationType] = useState('');

  // Service Provider specific fields
  const [editIsProviderEnabled, setEditIsProviderEnabled] = useState(true);
  const [editBusinessName, setEditBusinessName] = useState('');
  const [editOperatingRadiusKm, setEditOperatingRadiusKm] = useState(25);
  const [editExperienceYears, setEditExperienceYears] = useState(5);
  const [editMechanicSosOptIn, setEditMechanicSosOptIn] = useState(false);
  const [editMachines, setEditMachines] = useState([]);

  // Sub-modal state for adding a machine
  const [showAddMachineModal, setShowAddMachineModal] = useState(false);
  const [newMachineName, setNewMachineName] = useState('');
  const [newMachineRate, setNewMachineRate] = useState(850);
  const [newMachineUnitKey, setNewMachineUnitKey] = useState('hourUnit');

  // Sync edit form with current user whenever editing starts
  const populateForm = (user) => {
    if (!user) return;
    setEditName(user.name || '');
    setEditMobile(user.mobile || '');
    setEditWhatsapp(user.whatsapp || user.mobile || '');
    setEditAvatar(user.avatar || '👨‍🌾');
    setEditLocationId(user.location?.id || selectedLocation?.id || 'shirur');
    setEditBio(user.bio || '');

    setEditLandAcre(user.landAcre || '4.0');
    setEditPrimaryCrop(user.primaryCrop || 'कांदा व ऊस (Onion & Sugarcane)');
    setEditFarmingType(user.farmingType || 'बागायती व सेंद्रिय शेती (Irrigated & Organic)');
    setEditIrrigationType(user.irrigationType || 'ठिबक सिंचन + विहीर (Drip & Well)');

    setEditIsProviderEnabled(user.isProviderEnabled !== undefined ? user.isProviderEnabled : true);
    setEditBusinessName(user.businessName || 'पाटील कृषी अवजार सेवा केंद्र');
    setEditOperatingRadiusKm(user.operatingRadiusKm || 25);
    setEditExperienceYears(user.experienceYears || 6);
    setEditMechanicSosOptIn(!!user.mechanicSosOptIn);
    setEditMachines(user.machines || []);
  };

  useEffect(() => {
    if (currentUser) {
      populateForm(currentUser);
      if (currentUser.activeMode) {
        setActiveTab(currentUser.activeMode);
      }
    }
  }, [currentUser]);

  // Handle Mode Switch (Farmer <-> Service Provider)
  const handleModeChange = (targetMode) => {
    setActiveTab(targetMode);
    switchUserMode(targetMode);
  };

  // Quick Demo Login for Guests
  const handleQuickDemoLogin = () => {
    const loc = LOCATIONS.find((l) => l.id === selectedLocation.id) || LOCATIONS[0];
    const demoUser = {
      id: 'KSH-9822',
      name: language === 'mr' ? 'रमेश ज्ञानोबा पाटील' : language === 'hi' ? 'रमेश ज्ञानोबा पाटिल' : 'Ramesh Gyanoba Patil',
      mobile: '9822012345',
      whatsapp: '9822012345',
      avatar: '👨‍🌾',
      bio: language === 'mr' 
        ? 'शिरूर परिसरातील प्रगतीशील शेतकरी व महिंद्रा ५७५ ट्रॅक्टर मालक' 
        : language === 'hi'
        ? 'शिरूर के प्रगतिशील किसान व महिंद्रा 575 ट्रैक्टर मालिक'
        : 'Progressive farmer & Mahindra 575 tractor owner in Shirur',
      location: loc,
      activeMode: 'farmer',
      role: 'farmer',
      isProviderEnabled: true,
      landAcre: '4.5',
      primaryCrop: language === 'mr' ? 'कांदा, ऊस व सोयाबीन' : language === 'hi' ? 'प्याज, गन्ना व सोयाबीन' : 'Onion, Sugarcane & Soybean',
      farmingType: language === 'mr' ? 'बागायती व सेंद्रिय शेती' : language === 'hi' ? 'सिंचित व जैविक खेती' : 'Irrigated & Organic',
      irrigationType: language === 'mr' ? 'ठिबक सिंचन व विहीर' : language === 'hi' ? 'ड्रिप सिंचाई व कुआं' : 'Drip & Well',
      businessName: language === 'mr' ? 'पाटील कृषी अवजार व ट्रॅक्टर सेवा केंद्र' : language === 'hi' ? 'पाटिल कृषि उपकरण व ट्रैक्टर सेवा केंद्र' : 'Patil Agri Machinery & Hiring Center',
      operatingRadiusKm: 25,
      experienceYears: 7,
      mechanicSosOptIn: true,
      machines: [
        {
          id: 'm-1',
          name: 'Mahindra 575 DI (45 HP) + 7ft Rotavator',
          rate: 850,
          unitKey: 'hourUnit',
          status: 'available',
          jobsDone: 38,
          rating: 4.9
        },
        {
          id: 'm-2',
          name: 'Bolero Maxi Truck (1.8 Ton APMC Cargo)',
          rate: 22,
          unitKey: 'kmUnit',
          status: 'available',
          jobsDone: 76,
          rating: 4.8
        }
      ],
      joinedDate: '2026-02-15',
      isVerified: true
    };
    loginUser(demoUser);
  };

  // Handle Save Profile
  const handleSaveProfile = (e) => {
    e?.preventDefault();
    if (!editName.trim()) {
      alert(language === 'mr' ? 'कृपया पूर्ण नाव टाका' : language === 'hi' ? 'कृपया पूरा नाम दर्ज करें' : 'Please enter full name');
      return;
    }
    if (!editMobile || editMobile.length < 10) {
      alert(language === 'mr' ? 'कृपया वैध १०-अंकी मोबाईल नंबर टाका' : language === 'hi' ? 'कृपया सही 10-अंकीय मोबाइल नंबर दर्ज करें' : 'Please enter valid 10-digit mobile number');
      return;
    }

    const loc = LOCATIONS.find((l) => l.id === editLocationId) || selectedLocation;
    setSelectedLocation(loc);

    const updated = {
      name: editName.trim(),
      mobile: editMobile.trim(),
      whatsapp: editWhatsapp.trim() || editMobile.trim(),
      avatar: editAvatar,
      location: loc,
      bio: editBio.trim(),
      landAcre: editLandAcre || '2.0',
      primaryCrop: editPrimaryCrop || 'कांदा / Onion',
      farmingType: editFarmingType,
      irrigationType: editIrrigationType,
      isProviderEnabled: editIsProviderEnabled,
      businessName: editBusinessName.trim() || 'कृषी सेवा केंद्र',
      operatingRadiusKm: Number(editOperatingRadiusKm) || 20,
      experienceYears: Number(editExperienceYears) || 5,
      mechanicSosOptIn: editMechanicSosOptIn,
      machines: editMachines
    };

    updateUserProfile(updated);
    setIsEditing(false);
  };

  // Handle Adding Machine from modal
  const handleAddMachineSubmit = (e) => {
    e.preventDefault();
    if (!newMachineName.trim()) {
      alert(language === 'mr' ? 'कृपया अवजाराचे नाव टाका' : 'Please enter machine name');
      return;
    }
    const created = {
      id: `m-${Date.now()}`,
      name: newMachineName.trim(),
      rate: Number(newMachineRate) || 850,
      unitKey: newMachineUnitKey,
      status: 'available',
      jobsDone: 0,
      rating: 5.0
    };

    if (isEditing) {
      setEditMachines([created, ...editMachines]);
    } else {
      addMachineToProfile(created);
    }

    setNewMachineName('');
    setShowAddMachineModal(false);
  };

  // Handle Machine Delete
  const handleDeleteMachine = (mId) => {
    if (isEditing) {
      setEditMachines(editMachines.filter((m) => m.id !== mId));
    } else {
      removeMachineFromProfile(mId);
    }
  };

  // Location display
  const currentLoc = currentUser?.location || selectedLocation;
  const locName = currentLoc?.name?.[language] || currentLoc?.name?.mr || 'महाराष्ट्र';

  // Guest State View
  if (!currentUser) {
    return (
      <div className={isPage ? 'w-full max-w-3xl mx-auto py-6' : 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in'}>
        <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-emerald-200 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-agri-950 via-emerald-950 to-agri-900 text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-harvest-600 text-gray-950 flex items-center justify-center font-black text-2xl shadow-md">
                🌾
              </div>
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-700/60 text-emerald-200 border border-emerald-500/30">
                  {t.guestUser}
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">
                  {t.profileTitle}
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

          <div className="p-6 space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-3xl shadow-inner">
              🌱
            </div>
            <h4 className="text-base sm:text-lg font-extrabold text-gray-900">
              {language === 'mr'
                ? 'एकाच प्रोफाईलमध्ये शेतकरी व सेवा प्रदाता सुविधा'
                : language === 'hi'
                ? 'एक ही प्रोफ़ाइल में किसान व सेवा प्रदाता दोनों सुविधाएं'
                : 'Unified Farmer & Service Provider Profile'}
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              {language === 'mr'
                ? 'क्षेत्र ॲपमध्ये शेतकरी स्वतःची शेती व्यवस्थापित करू शकतो आणि आपल्याकडील ट्रॅक्टर, अवजारे किंवा मालवाहू पिकअप भाड्याने देऊन अतिरिक्त उत्पन्नही मिळवू शकतो.'
                : language === 'hi'
                ? 'क्षेत्र ऐप में किसान अपनी खेती की जरूरतें पूरी कर सकता है और अपने ट्रैक्टर, रोटावेटर या लोडिंग वाहन को किराए पर देकर कमाई भी कर सकता है।'
                : 'Seamlessly switch between farming operations and renting out your machinery or agricultural transport to nearby farmers.'}
            </p>

            <div className="pt-3 flex flex-col sm:flex-row gap-2.5 justify-center">
              <button
                onClick={handleQuickDemoLogin}
                className="w-full sm:w-auto px-5 py-3 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-agri-700 hover:from-emerald-700 hover:to-agri-800 text-white shadow-farmer flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{language === 'mr' ? '१-क्लिक चाचणी प्रोफाईल उघडा (रमेश पाटील)' : language === 'hi' ? '1-क्लिक टेस्ट प्रोफ़ाइल खोलें (रमेश पाटिल)' : 'Load Demo Dual Profile (Ramesh Patil)'}</span>
              </button>

              {onClose && (
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  {t.close}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active machines to display
  const displayMachines = isEditing ? editMachines : (currentUser.machines || []);
  const isProviderActive = currentUser.isProviderEnabled !== false;

  return (
    <div className={isPage ? 'w-full max-w-4xl mx-auto py-4 sm:py-6' : 'fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in overflow-y-auto'}>
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-emerald-200 overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* TOP PROFILE HERO BANNER */}
        <div className="bg-gradient-to-r from-agri-950 via-emerald-950 to-soil-950 text-white p-4 sm:p-6 relative overflow-hidden flex-shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-start justify-between gap-3 relative z-10">
            {/* Avatar & User Details */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="relative group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-harvest-500 to-amber-600 text-gray-950 flex items-center justify-center font-black text-2xl sm:text-3xl shadow-lg border-2 border-white/20 flex-shrink-0">
                  {isEditing ? editAvatar : (currentUser.avatar || '👨‍🌾')}
                </div>
                {isEditing && (
                  <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full text-[10px] shadow">
                    <Edit3 className="w-3 h-3" />
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 flex items-center gap-1">
                    <Sprout className="w-3 h-3" />
                    <span>{t.dualModeBadge}</span>
                  </span>
                  <span className="text-[10px] font-mono font-bold text-amber-300 bg-black/30 px-2 py-0.5 rounded-full border border-amber-400/30">
                    ID: {currentUser.id}
                  </span>
                </div>

                <h2 className="text-lg sm:text-2xl font-black text-white mt-1 flex items-center gap-1.5 tracking-tight">
                  <span>{currentUser.name}</span>
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
                </h2>

                <div className="flex items-center gap-3 text-xs text-soil-200 mt-0.5 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>+91 {currentUser.mobile}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{locName}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Top Right Action (Edit Toggle / Close) */}
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 transition-all shadow-sm active:scale-95"
                  title={t.editProfile}
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">{t.editProfile}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    populateForm(currentUser);
                    setIsEditing(false);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 transition-all"
                >
                  <X className="w-3.5 h-3.5 text-rose-300" />
                  <span className="hidden sm:inline">{t.cancelEdit}</span>
                </button>
              )}

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  title={t.close}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* DUAL MODE ACTIVE SWITCHER BAR */}
          <div className="mt-4 pt-3 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-soil-200 uppercase tracking-wide">
                {t.activeMode}:
              </span>
              <span className={`text-xs font-black px-2.5 py-0.5 rounded-lg flex items-center gap-1.5 shadow-sm ${
                currentUser.activeMode === 'farmer' 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-harvest-500 text-gray-950'
              }`}>
                {currentUser.activeMode === 'farmer' ? '🌾 ' + t.modeFarmerName : '🚜 ' + t.modeProviderName}
              </span>
            </div>

            {/* Interactive Mode Toggle Segment */}
            <div className="flex items-center bg-black/40 p-1 rounded-2xl border border-white/20 shadow-inner">
              <button
                type="button"
                onClick={() => handleModeChange('farmer')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                  currentUser.activeMode === 'farmer'
                    ? 'bg-gradient-to-r from-emerald-600 to-agri-700 text-white shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>🌾</span>
                <span>{t.modeFarmerName}</span>
                {currentUser.activeMode === 'farmer' && (
                  <Check className="w-3.5 h-3.5 text-emerald-200" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleModeChange('provider')}
                className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                  currentUser.activeMode === 'provider'
                    ? 'bg-gradient-to-r from-amber-500 to-harvest-600 text-gray-950 shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>🚜</span>
                <span>{t.modeProviderName}</span>
                {currentUser.activeMode === 'provider' && (
                  <Check className="w-3.5 h-3.5 text-gray-950" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* BODY CONTAINER (SCROLLABLE) */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 flex-1">
          
          {/* ================= EDIT MODE FORM ================= */}
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="space-y-6 animate-in fade-in">
              
              {/* Avatar Selector */}
              <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-200 space-y-2">
                <label className="block text-xs font-extrabold text-agri-950 uppercase tracking-wide">
                  🎨 {t.avatarLabel}
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {AVATAR_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setEditAvatar(opt.id)}
                      className={`p-2 rounded-xl text-2xl flex flex-col items-center justify-center transition-all ${
                        editAvatar === opt.id
                          ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400 scale-105'
                          : 'bg-white hover:bg-emerald-100/70 border border-emerald-200 text-gray-800'
                      }`}
                      title={opt.label[language] || opt.label.mr}
                    >
                      <span>{opt.id}</span>
                      <span className="text-[9px] font-bold truncate max-w-full mt-0.5">
                        {opt.label[language] || opt.label.mr}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 1: Personal & Contact Information */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm space-y-3">
                <h3 className="text-sm font-black text-gray-900 flex items-center gap-2 pb-2 border-b border-gray-100">
                  <User className="w-4 h-4 text-emerald-700" />
                  <span>{t.personalSection}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {t.fullName} *
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                      placeholder={t.enterFullName}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {t.mobileNumber} *
                    </label>
                    <input
                      type="tel"
                      value={editMobile}
                      onChange={(e) => setEditMobile(e.target.value)}
                      maxLength={10}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                      placeholder={t.enterMobile}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {t.alternateMobile}
                    </label>
                    <input
                      type="tel"
                      value={editWhatsapp}
                      onChange={(e) => setEditWhatsapp(e.target.value)}
                      maxLength={10}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                      placeholder="WhatsApp / 10-digit"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {t.villageHub}
                    </label>
                    <select
                      value={editLocationId}
                      onChange={(e) => setEditLocationId(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                    >
                      {LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.id}>
                          {loc.name[language] || loc.name.mr} ({loc.district[language] || loc.district.mr})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {t.bioTagline}
                    </label>
                    <input
                      type="text"
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                      placeholder={t.bioPlaceholder}
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Farmer Profile Details */}
              <div className="bg-gradient-to-br from-emerald-50/70 to-teal-50/40 rounded-2xl p-4 sm:p-5 border border-emerald-200 shadow-sm space-y-3">
                <h3 className="text-sm font-black text-emerald-950 flex items-center gap-2 pb-2 border-b border-emerald-200">
                  <Sprout className="w-4 h-4 text-emerald-700" />
                  <span>{t.farmingSection}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      {t.landSize}
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={editLandAcre}
                      onChange={(e) => setEditLandAcre(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-emerald-300 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="e.g. 4.5"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      {t.primaryCrop}
                    </label>
                    <input
                      type="text"
                      value={editPrimaryCrop}
                      onChange={(e) => setEditPrimaryCrop(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-emerald-300 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="उदा. कांदा, ऊस, डाळिंब"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      {t.farmingType}
                    </label>
                    <input
                      type="text"
                      value={editFarmingType}
                      onChange={(e) => setEditFarmingType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-emerald-300 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="उदा. बागायती व सेंद्रिय शेती"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      {t.irrigationSource}
                    </label>
                    <input
                      type="text"
                      value={editIrrigationType}
                      onChange={(e) => setEditIrrigationType(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-emerald-300 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="उदा. ठिबक सिंचन + विहीर"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Service Provider & Machinery Details */}
              <div className="bg-gradient-to-br from-harvest-50/70 to-amber-50/50 rounded-2xl p-4 sm:p-5 border border-harvest-200 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-harvest-200 flex-wrap gap-2">
                  <h3 className="text-sm font-black text-harvest-950 flex items-center gap-2">
                    <Tractor className="w-4 h-4 text-harvest-700" />
                    <span>{t.providerSection}</span>
                  </h3>

                  {/* Toggle Provider Mode On/Off for this Profile */}
                  <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1 rounded-xl border border-harvest-300 shadow-sm text-xs font-extrabold text-gray-900">
                    <input
                      type="checkbox"
                      checked={editIsProviderEnabled}
                      onChange={(e) => setEditIsProviderEnabled(e.target.checked)}
                      className="w-4 h-4 accent-harvest-600 rounded cursor-pointer"
                    />
                    <span>{editIsProviderEnabled ? t.providerActive : t.providerInactive}</span>
                  </label>
                </div>

                {editIsProviderEnabled && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1">
                          {t.businessName}
                        </label>
                        <input
                          type="text"
                          value={editBusinessName}
                          onChange={(e) => setEditBusinessName(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-harvest-300 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-harvest-500 outline-none"
                          placeholder={t.businessPlaceholder}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1">
                          {t.operatingRadius}
                        </label>
                        <input
                          type="number"
                          min="5"
                          max="100"
                          value={editOperatingRadiusKm}
                          onChange={(e) => setEditOperatingRadiusKm(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-harvest-300 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-harvest-500 outline-none"
                          placeholder="25"
                        />
                      </div>
                    </div>

                    {/* SOS Mechanic Emergency Alert Checkbox */}
                    <label className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50/80 border border-rose-200 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={editMechanicSosOptIn}
                        onChange={(e) => setEditMechanicSosOptIn(e.target.checked)}
                        className="mt-0.5 w-4 h-4 accent-rose-600 rounded cursor-pointer"
                      />
                      <div>
                        <strong className="text-rose-950 block font-bold">{t.sosMechanicOptIn}</strong>
                        <span className="text-rose-800/80 text-[11px] block">{t.sosMechanicDesc}</span>
                      </div>
                    </label>

                    {/* Machinery List in Edit Mode */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-gray-800 uppercase tracking-wide">
                          🚜 {t.myMachinesTitle} ({editMachines.length})
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowAddMachineModal(true)}
                          className="px-2.5 py-1 bg-harvest-600 hover:bg-harvest-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>{t.addMachineBtn}</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {editMachines.map((m) => (
                          <div key={m.id} className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between gap-2 shadow-sm text-xs">
                            <div>
                              <strong className="text-gray-900 block font-extrabold">{m.name}</strong>
                              <span className="text-emerald-700 font-bold">
                                ₹{m.rate} / {t[m.unitKey] || m.unitKey}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteMachine(m.id)}
                              className="text-rose-600 hover:text-rose-800 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                              title={t.removeMachine}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}

                        {editMachines.length === 0 && (
                          <div className="p-3 text-center text-xs text-gray-500 bg-white/60 rounded-xl border border-dashed border-gray-300">
                            {t.noMachinesYet}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Save & Cancel Footer Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    populateForm(currentUser);
                    setIsEditing(false);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                >
                  {t.cancelEdit}
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-emerald-600 to-agri-700 hover:from-emerald-700 hover:to-agri-800 text-white shadow-farmer flex items-center gap-2 transition-all active:scale-95"
                >
                  <Save className="w-4 h-4 text-emerald-200" />
                  <span>{t.saveProfile}</span>
                </button>
              </div>

            </form>
          ) : (
            /* ================= VIEW MODE ================= */
            <div className="space-y-5 animate-in fade-in">
              
              {/* Bio / Tagline */}
              {currentUser.bio && (
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-xs sm:text-sm text-gray-700 italic flex items-start gap-2">
                  <span className="text-emerald-700 font-serif text-lg leading-none">“</span>
                  <p className="flex-1 font-medium">{currentUser.bio}</p>
                  <AudioReadButton text={currentUser.bio} id="profile-bio" />
                </div>
              )}

              {/* OVERVIEW STATS CARDS (DYNAMIC TO ACTIVE MODE) */}
              {currentUser.activeMode === 'farmer' ? (
                /* Farmer Mode Stats */
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                    <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wide block">
                      {t.landSize}
                    </span>
                    <div className="text-lg sm:text-xl font-black text-agri-950 mt-0.5">
                      {currentUser.landAcre || '4.0'} <span className="text-xs font-semibold text-gray-600">{language === 'mr' ? 'एकर' : language === 'hi' ? 'एकड़' : 'Acres'}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                    <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wide block">
                      {t.primaryCrop}
                    </span>
                    <div className="text-xs sm:text-sm font-black text-agri-950 mt-1 truncate" title={currentUser.primaryCrop}>
                      {currentUser.primaryCrop || 'कांदा व ऊस'}
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                    <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wide block">
                      {t.myActiveBookings}
                    </span>
                    <div className="text-lg sm:text-xl font-black text-emerald-800 mt-0.5">
                      {farmerBookings.length}
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                    <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wide block">
                      {language === 'mr' ? 'हंगाम' : language === 'hi' ? 'सीजन' : 'Season'}
                    </span>
                    <div className="text-xs sm:text-sm font-black text-agri-950 mt-1">
                      {language === 'mr' ? 'रब्बी २०२६' : language === 'hi' ? 'रबी 2026' : 'Rabi 2026'}
                    </div>
                  </div>
                </div>
              ) : (
                /* Service Provider Mode Stats */
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl">
                    <span className="text-[10px] font-black uppercase text-amber-900 tracking-wide block">
                      {t.myInventory.split('&')[0]}
                    </span>
                    <div className="text-lg sm:text-xl font-black text-harvest-950 mt-0.5">
                      {displayMachines.length} <span className="text-xs font-semibold text-gray-600">{language === 'mr' ? 'यंत्रे' : language === 'hi' ? 'मशीनें' : 'Machines'}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl">
                    <span className="text-[10px] font-black uppercase text-amber-900 tracking-wide block">
                      {t.ratingAvg}
                    </span>
                    <div className="text-lg sm:text-xl font-black text-amber-700 mt-0.5 flex items-center gap-1">
                      <span>4.9</span>
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl">
                    <span className="text-[10px] font-black uppercase text-amber-900 tracking-wide block">
                      {t.monthlyEarnings}
                    </span>
                    <div className="text-lg sm:text-xl font-black text-emerald-800 mt-0.5">
                      ₹42,500
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl">
                    <span className="text-[10px] font-black uppercase text-amber-900 tracking-wide block">
                      {t.operatingRadius}
                    </span>
                    <div className="text-lg sm:text-xl font-black text-gray-900 mt-0.5">
                      {currentUser.operatingRadiusKm || 25} <span className="text-xs font-semibold text-gray-600">KM</span>
                    </div>
                  </div>
                </div>
              )}

              {/* PROMINENT CALL TO ACTION IF PROVIDER NOT ENABLED */}
              {!currentUser.isProviderEnabled && (
                <div className="bg-gradient-to-r from-harvest-50 via-amber-50 to-orange-50 border border-harvest-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-harvest-200 text-harvest-900">
                      🌟 {language === 'mr' ? 'अतिरिक्त उत्पन्न संधी' : language === 'hi' ? 'अतिरिक्त आय अवसर' : 'Extra Rental Income'}
                    </span>
                    <h4 className="text-sm font-extrabold text-gray-950 mt-1">
                      {t.enableProviderPrompt}
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {language === 'mr'
                        ? 'आपल्याकडील ट्रॅक्टर, रोटाव्हेटर, हार्वेस्टर किंवा मालवाहू पिकअप भाड्याने देऊन महिन्याला ₹२५,०००+ कमवा.'
                        : language === 'hi'
                        ? 'अपने ट्रैक्टर, रोटावेटर या लोडिंग वाहन को स्थानीय किसानों को किराए पर देकर अतिरिक्त कमाई करें।'
                        : 'List your equipment on Kshetra to get verified booking requests from nearby farmers.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      updateUserProfile({ isProviderEnabled: true, activeMode: 'provider' });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-harvest-600 hover:bg-harvest-700 text-white font-black text-xs shadow-md whitespace-nowrap transition-all active:scale-95"
                  >
                    {t.enableProviderBtn}
                  </button>
                </div>
              )}

              {/* CARD 1: FARMER PROFILE DETAILS */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-emerald-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                      🌾
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-gray-900">
                        {t.farmingSection}
                      </h3>
                      <span className="text-[10px] text-gray-500 font-semibold">
                        {language === 'mr' ? 'शेतजमीन व सिंचन माहिती' : language === 'hi' ? 'कृषि भूमि व सिंचाई विवरण' : 'Landholding & irrigation records'}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                    {t.registeredFarmer}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
                  <div className="p-2.5 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 block text-[11px] font-semibold">{t.landSize}:</span>
                    <strong className="text-gray-900 text-sm">
                      {currentUser.landAcre || '4.5'} {language === 'mr' ? 'एकर' : language === 'hi' ? 'एकड़' : 'Acres'}
                    </strong>
                  </div>

                  <div className="p-2.5 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 block text-[11px] font-semibold">{t.primaryCrop}:</span>
                    <strong className="text-gray-900 text-sm">
                      {currentUser.primaryCrop || 'कांदा व ऊस'}
                    </strong>
                  </div>

                  <div className="p-2.5 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 block text-[11px] font-semibold">{t.farmingType}:</span>
                    <strong className="text-gray-900 text-sm">
                      {currentUser.farmingType || (language === 'mr' ? 'बागायती व सेंद्रिय शेती' : 'Irrigated & Organic')}
                    </strong>
                  </div>

                  <div className="p-2.5 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 block text-[11px] font-semibold">{t.irrigationSource}:</span>
                    <strong className="text-gray-900 text-sm">
                      {currentUser.irrigationType || (language === 'mr' ? 'ठिबक सिंचन + विहीर' : 'Drip & Well')}
                    </strong>
                  </div>
                </div>
              </div>

              {/* CARD 2: SERVICE PROVIDER & MACHINERY DETAILS */}
              {currentUser.isProviderEnabled && (
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-harvest-200 shadow-sm space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
                        🚜
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-gray-900">
                          {currentUser.businessName || t.providerSection}
                        </h3>
                        <span className="text-[10px] text-gray-500 font-semibold">
                          {t.operatingRadius}: {currentUser.operatingRadiusKm || 25} KM • {currentUser.experienceYears || 6} {language === 'mr' ? 'वर्षे अनुभव' : 'Yrs Exp'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setShowAddMachineModal(true)}
                        className="px-2.5 py-1 bg-harvest-600 hover:bg-harvest-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>{t.addMachineBtn}</span>
                      </button>
                    </div>
                  </div>

                  {/* Registered Machinery Cards */}
                  <div className="space-y-2.5">
                    {displayMachines.map((m) => (
                      <div 
                        key={m.id}
                        className="p-3 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-sm"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-harvest-100 text-harvest-900 flex items-center justify-center text-lg flex-shrink-0">
                            🚜
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-xs sm:text-sm text-gray-900">{m.name}</h4>
                              <span className={`text-[10px] font-black px-2 py-0.2 rounded-full border ${
                                m.status === 'available'
                                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                  : 'bg-amber-100 text-amber-900 border-amber-300'
                              }`}>
                                {m.status === 'available' ? t.statusAvailable : t.statusBusy}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 font-medium mt-0.5 flex items-center gap-3">
                              <span className="font-bold text-emerald-800">
                                ₹{m.rate} / {t[m.unitKey] || m.unitKey}
                              </span>
                              <span>•</span>
                              <span>{t.completedJobsTag} {m.jobsDone}</span>
                              <span>•</span>
                              <span className="flex items-center gap-0.5 text-amber-700 font-bold">
                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                {m.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Toggle Status Action */}
                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => toggleMachineStatusInProfile(m.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                              m.status === 'available'
                                ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                                : 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100'
                            }`}
                          >
                            {m.status === 'available' 
                              ? (language === 'mr' ? 'शेतात कार्यरत करा' : 'Mark Busy') 
                              : (language === 'mr' ? 'भाड्यासाठी उपलब्ध करा' : 'Mark Available')}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteMachine(m.id)}
                            className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                            title={t.removeMachine}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {displayMachines.length === 0 && (
                      <div className="p-4 text-center text-xs text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                        {t.noMachinesYet}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* QUICK NAVIGATION SHORTCUTS */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  {onNavigateTab && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          onNavigateTab('services');
                          if (onClose) onClose();
                        }}
                        className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>{language === 'mr' ? 'यंत्रे व अवजारे शोधा' : 'Browse Machinery'}</span>
                      </button>

                      {currentUser.isProviderEnabled && (
                        <button
                          type="button"
                          onClick={() => {
                            onNavigateTab('provider');
                            if (onClose) onClose();
                          }}
                          className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <Tractor className="w-3.5 h-3.5" />
                          <span>{t.navProvider}</span>
                        </button>
                      )}
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    logoutUser();
                    if (onClose) onClose();
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1.5 transition-colors ml-auto"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-600" />
                  <span>{t.logout}</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* SUB-MODAL: ADD NEW MACHINE */}
        {showAddMachineModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl p-5 sm:p-6 w-full max-w-md shadow-2xl border border-harvest-200 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h4 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <Tractor className="w-5 h-5 text-harvest-600" />
                  <span>{t.addMachineModalTitle}</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddMachineModal(false)}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddMachineSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {t.machineNameLabel} *
                  </label>
                  <input
                    type="text"
                    value={newMachineName}
                    onChange={(e) => setNewMachineName(e.target.value)}
                    placeholder={t.machineNamePlaceholder}
                    required
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-harvest-500 focus:bg-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {t.rentalRateLabel}
                    </label>
                    <input
                      type="number"
                      value={newMachineRate}
                      onChange={(e) => setNewMachineRate(e.target.value)}
                      required
                      min="1"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-harvest-500 focus:bg-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {t.unitLabel}
                    </label>
                    <select
                      value={newMachineUnitKey}
                      onChange={(e) => setNewMachineUnitKey(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-harvest-500 focus:bg-white outline-none"
                    >
                      <option value="hourUnit">{t.hourUnit}</option>
                      <option value="acreUnit">{t.acreUnit}</option>
                      <option value="dayUnit">{t.dayUnit}</option>
                      <option value="kmUnit">{t.kmUnit}</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddMachineModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200"
                  >
                    {t.close}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-black text-white bg-harvest-600 hover:bg-harvest-700 shadow-md"
                  >
                    {t.completeListingBtn}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
