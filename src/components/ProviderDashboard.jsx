import React, { useState } from 'react';
import { 
  Tractor, 
  PlusCircle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star, 
  User, 
  MapPin, 
  ToggleLeft, 
  ToggleRight,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PROVIDER_SEED_REQUESTS } from '../data/seedData';

export const ProviderDashboard = () => {
  const { 
    language, 
    t, 
    showToast, 
    currentUser, 
    addMachineToProfile, 
    toggleMachineStatusInProfile,
    switchUserMode 
  } = useLanguage();

  const [requests, setRequests] = useState(PROVIDER_SEED_REQUESTS);
  
  // Use machines from currentUser if available, else default
  const defaultInitialMachines = [
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
      status: 'busy',
      jobsDone: 76,
      rating: 4.8
    }
  ];

  const machines = (currentUser?.machines && currentUser.machines.length > 0) 
    ? currentUser.machines 
    : defaultInitialMachines;

  const [showAddMachineModal, setShowAddMachineModal] = useState(false);
  const [newMachineName, setNewMachineName] = useState('');
  const [newMachineRate, setNewMachineRate] = useState(900);
  const [newMachineUnitKey, setNewMachineUnitKey] = useState('hourUnit');

  const handleApprove = (reqId) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'approved' } : r))
    );
    showToast(t.requestApprovedToast, 'success');
  };

  const handleReject = (reqId) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'rejected' } : r))
    );
    showToast(t.requestDeclinedToast, 'info');
  };

  const toggleMachineStatus = (machineId) => {
    if (toggleMachineStatusInProfile && currentUser) {
      toggleMachineStatusInProfile(machineId);
    } else {
      showToast(t.statusUpdatedToast, 'success');
    }
  };

  const handleAddMachine = (e) => {
    e.preventDefault();
    const created = {
      id: `m-${Date.now()}`,
      name: newMachineName,
      rate: Number(newMachineRate) || 900,
      unitKey: newMachineUnitKey,
      status: 'available',
      jobsDone: 0,
      rating: 5.0
    };
    if (addMachineToProfile && currentUser) {
      addMachineToProfile(created);
    }
    setShowAddMachineModal(false);
    setNewMachineName('');
  };

  const getUnitDisplay = (unitKey) => {
    return t[unitKey] || t.hourUnit;
  };

  return (
    <div className="space-y-6 my-6">
      
      {/* Provider Header Banner */}
      <div className="bg-gradient-to-r from-soil-900 via-stone-900 to-agri-950 text-white rounded-3xl p-5 sm:p-7 shadow-farmer-lg relative overflow-hidden border border-soil-700/50">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-harvest-500 text-gray-950 uppercase tracking-wide">
                🚜 {t.providerHeader}
              </span>
              {currentUser && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/15 text-soil-100 border border-white/20">
                  {currentUser.isProviderEnabled ? t.dualModeBadge : t.registeredFarmer}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight">
              {currentUser?.name 
                ? `${currentUser.name} — ${currentUser.businessName || t.registeredProvider}` 
                : t.providerWelcome}
            </h2>
            <p className="text-xs sm:text-sm text-soil-200 mt-1">
              {t.providerSubtitle}
            </p>
          </div>

          <button
            onClick={() => setShowAddMachineModal(true)}
            className="flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-emerald-600 to-agri-700 hover:from-emerald-700 hover:to-agri-800 text-white rounded-2xl font-black text-sm shadow-lg active:scale-95 transition-all whitespace-nowrap"
          >
            <PlusCircle className="w-5 h-5" />
            <span>{t.addMachine}</span>
          </button>
        </div>

        {/* 3 Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 pt-5 border-t border-soil-700/60">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <span className="text-xs text-soil-200 block font-semibold">{t.monthlyEarnings}</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 mt-0.5">
              ₹42,500
            </div>
            <span className="text-[11px] text-emerald-300 font-semibold mt-1 block">
              {t.monthlyGrowth}
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <span className="text-xs text-soil-200 block font-semibold">{t.activeJobs}</span>
            <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
              4
            </div>
            <span className="text-[11px] text-soil-200 font-semibold mt-1 block">
              {t.activeJobsDetail}
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <span className="text-xs text-soil-200 block font-semibold">{t.ratingAvg}</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-0.5 flex items-center gap-1">
              <span>4.9</span>
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-[11px] text-soil-200 font-semibold mt-1 block">
              {t.farmersSatisfied}
            </span>
          </div>
        </div>
      </div>

      {/* Pending Farmer Booking Requests */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-farmer space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>{t.pendingRequests}</span>
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              {t.pendingRequestsSubtitle}
            </p>
          </div>
          <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
            {requests.filter((r) => r.status === 'pending').length} {t.pendingBadgeText}
          </span>
        </div>

        <div className="space-y-3">
          {requests.map((req) => {
            const farmerName = typeof req.farmerName === 'object' ? (req.farmerName[language] || req.farmerName.mr) : req.farmerName;
            const farmerVillage = typeof req.farmerVillage === 'object' ? (req.farmerVillage[language] || req.farmerVillage.mr) : req.farmerVillage;
            const serviceTitle = typeof req.serviceTitle === 'object' ? (req.serviceTitle[language] || req.serviceTitle.mr) : req.serviceTitle;
            const date = typeof req.date === 'object' ? (req.date[language] || req.date.mr) : req.date;
            const duration = typeof req.duration === 'object' ? (req.duration[language] || req.duration.mr) : req.duration;
            const notes = typeof req.notes === 'object' ? (req.notes[language] || req.notes.mr) : req.notes;

            return (
              <div
                key={req.id}
                className={`p-4 rounded-2xl border transition-all ${
                  req.status === 'approved'
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : req.status === 'rejected'
                    ? 'bg-gray-50 border-gray-200 opacity-60'
                    : 'bg-white border-gray-200 hover:border-amber-400 shadow-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  
                  {/* Farmer Info */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-agri-100 text-agri-800 flex items-center justify-center font-bold flex-shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm sm:text-base text-gray-900">
                          {farmerName}
                        </h4>
                        <span className="text-xs text-gray-500 flex items-center gap-1 font-semibold">
                          <MapPin className="w-3 h-3 text-gray-400" /> {farmerVillage}
                        </span>
                      </div>
                      
                      <p className="text-xs font-semibold text-agri-800 mt-0.5">
                        {t.demandText} <strong>{serviceTitle}</strong> ({duration}) • {t.dateTag} {date}
                      </p>

                      <p className="text-[11px] text-gray-500 italic mt-0.5">
                        {t.notesTag} "{notes}"
                      </p>
                    </div>
                  </div>

                  {/* Amount & Actions */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-xs text-gray-400 block font-semibold">{t.rentAmountTag}</span>
                      <span className="text-base sm:text-lg font-black text-gray-900">
                        ₹{req.totalAmount}
                      </span>
                    </div>

                    {req.status === 'pending' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApprove(req.id)}
                          className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                        >
                          {t.approve}
                        </button>
                        <button
                          onClick={() => handleReject(req.id)}
                          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all"
                        >
                          {t.reject}
                        </button>
                      </div>
                    ) : req.status === 'approved' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                        <CheckCircle className="w-3.5 h-3.5" /> {t.approvedStatus}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                        <XCircle className="w-3.5 h-3.5" /> {t.rejectedStatus}
                      </span>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Machinery Inventory & Availability Toggle */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-farmer space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-gray-900 flex items-center gap-2">
              <Tractor className="w-4 h-4 text-agri-800" />
              <span>{t.myInventory}</span>
            </h3>
            <p className="text-xs text-gray-500 font-medium">
              {t.manageAvailabilitySubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {machines.map((mach) => (
            <div
              key={mach.id}
              className="p-4 rounded-2xl border border-gray-200 bg-gray-50/70 hover:bg-white flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-extrabold text-sm sm:text-base text-gray-900">
                    {mach.name}
                  </h4>
                  <span className="font-extrabold text-agri-900 text-sm bg-agri-100 px-2.5 py-0.5 rounded-lg whitespace-nowrap">
                    ₹{mach.rate} {getUnitDisplay(mach.unitKey)}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                  <span>{t.completedJobsTag} {mach.jobsDone}</span>
                  <span>•</span>
                  <span>{t.ratingTag} ⭐ {mach.rating}</span>
                </div>
              </div>

              {/* Status Switcher */}
              <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  mach.status === 'available'
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}>
                  {mach.status === 'available' ? `● ${t.statusAvailable}` : `● ${t.statusBusy}`}
                </span>

                <button
                  type="button"
                  onClick={() => toggleMachineStatus(mach.id)}
                  className="text-xs font-bold text-gray-700 hover:text-agri-900 flex items-center gap-1.5"
                >
                  <span>{t.changeStatusBtn}</span>
                  {mach.status === 'available' ? (
                    <ToggleRight className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-amber-600" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Machine Modal */}
      {showAddMachineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-agri-800 to-agri-950 text-white p-4 sm:p-5 flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-extrabold text-white">
                {t.addMachineModalTitle}
              </h3>
              <button
                onClick={() => setShowAddMachineModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMachine} className="p-4 sm:p-6 space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  {t.machineNameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={newMachineName}
                  onChange={(e) => setNewMachineName(e.target.value)}
                  placeholder={t.machineNamePlaceholder}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-agri-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {t.rentalRateLabel}
                  </label>
                  <input
                    type="number"
                    required
                    value={newMachineRate}
                    onChange={(e) => setNewMachineRate(Number(e.target.value))}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-agri-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    {t.unitLabel}
                  </label>
                  <select
                    value={newMachineUnitKey}
                    onChange={(e) => setNewMachineUnitKey(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-agri-600 focus:outline-none"
                  >
                    <option value="hourUnit">{t.hourUnit}</option>
                    <option value="acreUnit">{t.acreUnit}</option>
                    <option value="dayUnit">{t.dayUnit}</option>
                    <option value="kmUnit">{t.kmUnit}</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-agri-800 to-agri-950 text-white rounded-2xl font-black text-sm shadow-farmer active:scale-98 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <CheckCircle className="w-5 h-5 text-emerald-300" />
                <span>{t.completeListingBtn}</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
