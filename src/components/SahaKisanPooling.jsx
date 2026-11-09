import React, { useState, useMemo } from 'react';
import { 
  Truck, 
  Users, 
  MapPin, 
  Clock, 
  TrendingDown, 
  PlusCircle, 
  ArrowRight, 
  X,
  Package
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SAHA_KISAN_POOLS } from '../data/seedData';
import { AudioReadButton } from './AudioReadButton';

export const SahaKisanPooling = () => {
  const { language, t, selectedLocation, showToast } = useLanguage();

  const [pools, setPools] = useState(SAHA_KISAN_POOLS);
  const [filterOnlyLocal, setFilterOnlyLocal] = useState(true);
  const [selectedPoolForJoin, setSelectedPoolForJoin] = useState(null);
  const [joinQuantity, setJoinQuantity] = useState(5);
  const [joinPickupPoint, setJoinPickupPoint] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New pool state
  const [newTitle, setNewTitle] = useState('');
  const [newCrop, setNewCrop] = useState('');
  const [newDest, setNewDest] = useState('');
  const [newCap, setNewCap] = useState(50);
  const [newMyShare, setNewMyShare] = useState(15);
  const [newDate, setNewDate] = useState('');

  const currentDistrict = typeof selectedLocation.district === 'object'
    ? (selectedLocation.district[language] || selectedLocation.district.mr)
    : selectedLocation.district;

  const visiblePools = useMemo(() => {
    return pools.filter((p) => {
      if (filterOnlyLocal && p.locationId && p.locationId !== selectedLocation.id) {
        return false;
      }
      return true;
    });
  }, [pools, filterOnlyLocal, selectedLocation]);

  const handleJoinPool = (e) => {
    e.preventDefault();
    if (!selectedPoolForJoin) return;

    setPools((prev) =>
      prev.map((p) => {
        if (p.id === selectedPoolForJoin.id) {
          const booked = p.bookedCapacity + Number(joinQuantity);
          return {
            ...p,
            bookedCapacity: booked,
            availableCapacity: Math.max(0, p.totalCapacity - booked),
            participants: p.participants + 1
          };
        }
        return p;
      })
    );

    const saved = joinQuantity * selectedPoolForJoin.savingsPerQuintal;
    showToast(t.slotReservedMsg.replace('{saved}', saved), 'success');
    setSelectedPoolForJoin(null);
  };

  const handleCreatePool = (e) => {
    e.preventDefault();
    const destName = newDest || (language === 'mr' ? 'पुणे मार्केट यार्ड' : language === 'hi' ? 'पुणे मंडी' : 'Pune APMC');
    const cropName = newCrop || (language === 'mr' ? 'कांदा' : language === 'hi' ? 'प्याज' : 'Onion');
    const dateLabel = newDate || (language === 'mr' ? 'उद्या सकाळी' : language === 'hi' ? 'कल सुबह' : 'Tomorrow');

    const created = {
      id: `pool-${Date.now()}`,
      locationId: selectedLocation.id,
      type: 'transport',
      title: {
        en: newTitle || `${destName} Farmer Group`,
        mr: newTitle || `${destName} शेतकरी गट`,
        hi: newTitle || `${destName} किसान समूह`
      },
      crop: { en: cropName, mr: cropName, hi: cropName },
      route: {
        from: { en: selectedLocation.name.en, mr: selectedLocation.name.mr, hi: selectedLocation.name.hi },
        to: { en: destName, mr: destName, hi: destName },
        distanceKm: 70
      },
      totalCapacity: Number(newCap),
      bookedCapacity: Number(newMyShare),
      availableCapacity: Number(newCap) - Number(newMyShare),
      initiator: {
        name: { en: 'You (Organizer)', mr: 'आपण स्वतः', hi: 'आप (आयोजक)' },
        village: { en: selectedLocation.name.en, mr: selectedLocation.name.mr, hi: selectedLocation.name.hi },
        bookedAmt: { en: `${newMyShare} Quintals`, mr: `${newMyShare} क्विंटल`, hi: `${newMyShare} क्विंटल` }
      },
      departureTime: { en: dateLabel, mr: dateLabel, hi: dateLabel },
      costPerQuintal: 45,
      soloCostPerQuintal: 75,
      savingsPerQuintal: 30,
      participants: 1
    };

    setPools([created, ...pools]);
    setShowCreateModal(false);
    showToast(t.poolCreatedMsg, 'success');
  };

  return (
    <div className="space-y-4 my-4">
      
      {/* Sleek Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-4 sm:p-5 shadow-sm border border-blue-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-gray-950 uppercase">
              ⭐ {t.activePoolsTitle.split(':')[0]}
            </span>
            <span className="text-xs text-blue-200 font-semibold">
              {t.save50}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
            {t.activePoolsTitle}
          </h2>
          <p className="text-xs text-blue-100 mt-0.5">
            {t.activePoolsDesc}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterOnlyLocal(!filterOnlyLocal)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1 ${
              filterOnlyLocal
                ? 'bg-blue-600 text-white border-blue-400'
                : 'bg-white/10 text-blue-200 border-white/20 hover:bg-white/20'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{filterOnlyLocal ? `${t.onlyDistrict} ${currentDistrict}` : t.allRegions}</span>
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-harvest-600 text-white rounded-xl font-extrabold text-xs shadow-md active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.createPool}</span>
          </button>
        </div>
      </div>

      {/* Active Pooling Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {visiblePools.map((pool) => {
          const title = pool.title[language] || pool.title.mr;
          const crop = pool.crop[language] || pool.crop.mr;
          const departure = pool.departureTime[language] || pool.departureTime.mr;
          const fromName = pool.route.from[language] || pool.route.from.mr;
          const toName = pool.route.to[language] || pool.route.to.mr;
          const percentageFilled = Math.min(100, Math.round((pool.bookedCapacity / pool.totalCapacity) * 100));

          const audioSpeech = `${title}. ${crop}. ${fromName} to ${toName}. ${pool.costPerQuintal} rupees. Save ${pool.savingsPerQuintal} rupees.`;

          return (
            <div
              key={pool.id}
              className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-farmer hover:border-blue-400 transition-all flex flex-col justify-between"
            >
              <div>
                
                {/* Header Tag + Audio */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                    {pool.type === 'transport' ? t.sharedFreight : t.sharedMachine}
                  </span>

                  <AudioReadButton
                    id={`pool-${pool.id}`}
                    text={audioSpeech}
                    label={t.listen}
                  />
                </div>

                <h3 className="font-extrabold text-base text-gray-900 leading-snug line-clamp-1">
                  {title}
                </h3>
                
                <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold mt-0.5">
                  <Package className="w-3.5 h-3.5 text-amber-600" />
                  <span>{crop}</span>
                </div>

                {/* Route Strip */}
                <div className="bg-gray-50 rounded-xl p-2.5 my-2.5 border border-gray-200 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-gray-800">
                    <span className="truncate max-w-[120px]">{fromName}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span className="truncate max-w-[120px] text-emerald-800">{toName}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1 border-t border-gray-200">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" /> {departure}
                    </span>
                    <span>{pool.route.distanceKm} {t.km}</span>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="my-2 space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-600">{t.capacityFilled}:</span>
                    <span className="text-blue-950 font-black">
                      {pool.bookedCapacity}/{pool.totalCapacity} ({percentageFilled}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden border border-gray-200">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all"
                      style={{ width: `${percentageFilled}%` }}
                    />
                  </div>
                </div>

                {/* Savings Callout */}
                <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200 my-2 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-amber-800 font-semibold block">{t.groupRate}:</span>
                    <span className="text-base font-black text-amber-950">₹{pool.costPerQuintal}</span>
                    <span className="text-gray-400 line-through text-[11px] ml-1.5">₹{pool.soloCostPerQuintal}</span>
                  </div>
                  <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    {t.savings}: ₹{pool.savingsPerQuintal}
                  </span>
                </div>

              </div>

              {/* Join Button */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-gray-500 font-semibold">
                  {pool.participants} {t.farmersJoined}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedPoolForJoin(pool);
                    setJoinQuantity(Math.min(5, pool.availableCapacity));
                  }}
                  disabled={pool.availableCapacity <= 0}
                  className="px-3.5 py-1.5 bg-blue-800 hover:bg-blue-900 text-white rounded-xl font-bold text-xs shadow-sm active:scale-95 transition-all flex items-center gap-1"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{pool.availableCapacity > 0 ? t.takeSlot : t.poolFull}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Join Pool Modal */}
      {selectedPoolForJoin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-300">
                  {t.joinGroupTitle}
                </span>
                <h4 className="font-extrabold text-sm text-white line-clamp-1">
                  {selectedPoolForJoin.title[language] || selectedPoolForJoin.title.mr}
                </h4>
              </div>
              <button onClick={() => setSelectedPoolForJoin(null)} className="text-white/80 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleJoinPool} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {t.yourQuantityMax.replace('{cap}', selectedPoolForJoin.availableCapacity)}:
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setJoinQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 rounded-xl bg-gray-100 font-black text-sm"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={selectedPoolForJoin.availableCapacity}
                    value={joinQuantity}
                    onChange={(e) => setJoinQuantity(Math.min(selectedPoolForJoin.availableCapacity, Math.max(1, Number(e.target.value))))}
                    className="flex-1 py-1.5 text-center font-black text-lg bg-blue-50 border border-blue-200 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setJoinQuantity((q) => Math.min(selectedPoolForJoin.availableCapacity, q + 1))}
                    className="w-9 h-9 rounded-xl bg-blue-100 font-black text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {t.pickupLandmarkLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t.pickupPlaceholder}
                  value={joinPickupPoint}
                  onChange={(e) => setJoinPickupPoint(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-300 rounded-xl font-medium focus:outline-none"
                />
              </div>

              <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-xs flex justify-between items-center font-bold">
                <span>{t.costLabel}: ₹{joinQuantity * selectedPoolForJoin.costPerQuintal}</span>
                <span className="text-emerald-800">{t.savings}: ₹{joinQuantity * selectedPoolForJoin.savingsPerQuintal}</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-800 hover:bg-blue-900 text-white rounded-xl font-black text-xs shadow-md"
              >
                {t.confirmSlotBtn}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create New Pool Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-agri-950 text-white p-4 flex items-center justify-between">
              <h4 className="font-extrabold text-sm">
                {t.createPool}
              </h4>
              <button onClick={() => setShowCreateModal(false)} className="text-white/80 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePool} className="p-4 space-y-2.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-0.5">
                  {t.groupTitleLabel}
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={t.groupTitlePlaceholder}
                  className="w-full p-2 bg-gray-50 border border-gray-300 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-0.5">{t.selectCrop}:</label>
                  <input
                    type="text"
                    required
                    value={newCrop}
                    onChange={(e) => setNewCrop(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-0.5">
                    {t.destinationMandiLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={newDest}
                    onChange={(e) => setNewDest(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-300 rounded-xl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-gray-700 mb-0.5">
                    {t.totalCapacityQt}
                  </label>
                  <input
                    type="number"
                    min="10"
                    value={newCap}
                    onChange={(e) => setNewCap(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-0.5">
                    {t.myLoadQt}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newMyShare}
                    onChange={(e) => setNewMyShare(e.target.value)}
                    className="w-full p-2 bg-gray-50 border border-gray-300 rounded-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-agri-900 text-white rounded-xl font-black text-xs shadow-md mt-1"
              >
                {t.publishGroupBtn}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
