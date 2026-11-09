import React, { useState, useMemo, useEffect } from 'react';
import { 
  TrendingUp, 
  MapPin, 
  Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MANDI_CROPS, LOCATION_DISTANCES } from '../data/seedData';
import { AudioReadButton } from './AudioReadButton';

export const MandiArbitrage = ({ initialCropId = 'onion' }) => {
  const { language, t, selectedLocation } = useLanguage();

  const [selectedCropId, setSelectedCropId] = useState(initialCropId || 'onion');
  const [quantity, setQuantity] = useState(40); // quintals
  const [fuelCostPerKm, setFuelCostPerKm] = useState(20); // ₹/km

  useEffect(() => {
    if (initialCropId) {
      setSelectedCropId(initialCropId);
    }
  }, [initialCropId]);

  const selectedCrop = useMemo(() => {
    return MANDI_CROPS.find((c) => c.id === selectedCropId) || MANDI_CROPS[0];
  }, [selectedCropId]);

  // Dynamic distance & profit calculation relative to selectedLocation
  const calculatedMandis = useMemo(() => {
    const locDistMap = LOCATION_DISTANCES[selectedLocation.id] || LOCATION_DISTANCES.shirur;

    const list = selectedCrop.mandis.map((mandi) => {
      const actualDistanceKm = locDistMap[mandi.id] || mandi.baseKm;
      const grossRevenue = mandi.price * quantity;
      const freightCost = Math.round(actualDistanceKm * fuelCostPerKm * 1.4);
      const loadingCost = Math.round(selectedCrop.avgLoadingFee * quantity);
      const cessCost = Math.round((grossRevenue * mandi.cessPercent) / 100);
      const totalDeductions = freightCost + loadingCost + cessCost;

      const netProfit = grossRevenue - totalDeductions;
      const netPerQuintal = Math.round(netProfit / quantity);

      const mandiDisplayName = typeof mandi.name === 'object'
        ? (mandi.name[language] || mandi.name.mr)
        : mandi.name;

      return {
        ...mandi,
        displayName: mandiDisplayName,
        distanceKm: actualDistanceKm,
        grossRevenue,
        freightCost,
        loadingCost,
        cessCost,
        totalDeductions,
        netProfit,
        netPerQuintal
      };
    });

    list.sort((a, b) => b.netProfit - a.netProfit);
    const highestProfit = list[0].netProfit;

    return list.map((item, idx) => ({
      ...item,
      isBestDeal: idx === 0,
      profitDiff: idx === 0 ? 0 : highestProfit - item.netProfit
    }));
  }, [selectedCrop, quantity, fuelCostPerKm, selectedLocation, language]);

  const bestDeal = calculatedMandis[0];

  const audioSummary = language === 'mr'
    ? `${selectedLocation.name.mr} मधून ${selectedCrop.name.mr} साठी सर्वात जास्त निव्वळ नफा ${bestDeal.displayName} येथे मिळेल. डिझेल व हमाली वजा जाता प्रत्यक्ष हातात ${bestDeal.netProfit.toLocaleString('en-IN')} रुपये मिळतील.`
    : language === 'hi'
    ? `${selectedLocation.name.hi} से ${selectedCrop.name.hi} हेतु सबसे अधिक शुद्ध मुनाफा ${bestDeal.displayName} में मिलेगा। हाथ में ${bestDeal.netProfit.toLocaleString('en-IN')} रुपये बचेंगे।`
    : `From ${selectedLocation.name.en}, highest net in-hand cash for ${selectedCrop.name.en} is at ${bestDeal.displayName}. Net take home is ${bestDeal.netProfit.toLocaleString('en-IN')} rupees.`;

  return (
    <div className="space-y-4 my-4">
      
      {/* Sleek Top Banner */}
      <div className="bg-gradient-to-r from-harvest-800 to-soil-950 text-white rounded-3xl p-4 sm:p-5 shadow-sm border border-harvest-600/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-400 text-gray-950 uppercase">
              📊 {t.arbitrageTitle}
            </span>
            <span className="text-xs text-amber-200 font-semibold flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-300" />
              <span>{t.distanceFromHub} {selectedLocation.name[language] || selectedLocation.name.mr}</span>
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
            {t.arbitrageTitle}
          </h2>
          <p className="text-xs text-harvest-100 mt-0.5">
            {t.arbitrageDesc}
          </p>
        </div>

        <AudioReadButton
          id={`arbitrage-${selectedLocation.id}`}
          text={audioSummary}
          label={t.listen}
          className="bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-black shadow-md flex-shrink-0"
        />
      </div>

      {/* Interactive Controls Strip */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm space-y-3">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Crop Selector */}
          <div>
            <label className="block text-[11px] font-extrabold text-gray-600 uppercase mb-1.5">
              🌾 {t.selectCrop}
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {MANDI_CROPS.map((crop) => (
                <button
                  key={crop.id}
                  onClick={() => {
                    setSelectedCropId(crop.id);
                    setQuantity(crop.defaultQty);
                  }}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                    selectedCropId === crop.id
                      ? 'bg-harvest-600 text-white border-harvest-700 shadow-sm'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span className="truncate block">{crop.name[language] || crop.name.mr}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-extrabold text-gray-600 uppercase">
                ⚖️ {t.cropQuantity}
              </label>
              <span className="text-xs font-black text-harvest-800 bg-harvest-100 px-2 py-0.5 rounded-lg">
                {quantity} {selectedCrop.unitName[language] || selectedCrop.unitName.mr}
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              step="5"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-harvest-600"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-1">
              <span>5 {selectedCrop.unitName[language] || selectedCrop.unitName.mr}</span>
              <span>50 {selectedCrop.unitName[language] || selectedCrop.unitName.mr}</span>
              <span>150 {selectedCrop.unitName[language] || selectedCrop.unitName.mr}</span>
            </div>
          </div>

          {/* Vehicle Freight Rate */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-extrabold text-gray-600 uppercase">
                ⛽ {t.transportCost}
              </label>
              <span className="text-xs font-black text-blue-900 bg-blue-100 px-2 py-0.5 rounded-lg">
                ₹{fuelCostPerKm}/{t.km}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {[
                { label: language === 'mr' ? 'पिकअप ₹१८' : language === 'hi' ? 'पिकअप ₹18' : 'Pickup ₹18', rate: 18 },
                { label: language === 'mr' ? 'टेम्पो ₹२२' : language === 'hi' ? 'टेम्पो ₹22' : 'Tempo ₹22', rate: 22 },
                { label: language === 'mr' ? 'ट्रक ₹२८' : language === 'hi' ? 'ट्रक ₹28' : 'Truck ₹28', rate: 28 }
              ].map((v) => (
                <button
                  key={v.rate}
                  onClick={() => setFuelCostPerKm(v.rate)}
                  className={`py-1.5 text-[10px] sm:text-[11px] font-bold rounded-lg border transition-colors ${
                    fuelCostPerKm === v.rate
                      ? 'bg-blue-800 text-white border-blue-900'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {calculatedMandis.map((mandi) => {
          return (
            <div
              key={mandi.id}
              className={`rounded-2xl p-4 border transition-all shadow-sm flex flex-col justify-between relative ${
                mandi.isBestDeal
                  ? 'bg-gradient-to-b from-white to-emerald-50/50 border-2 border-emerald-600 ring-2 ring-emerald-500/20 shadow-farmer'
                  : 'bg-white border-gray-200'
              }`}
            >
              {mandi.isBestDeal && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-700 text-white px-3 py-0.5 rounded-full text-[10px] font-black shadow-sm flex items-center gap-1 whitespace-nowrap">
                  <Award className="w-3 h-3 text-amber-300" />
                  <span>{t.bestDealBadge}</span>
                </div>
              )}

              <div>
                <div className="flex items-start justify-between gap-1 mb-2 mt-0.5">
                  <h3 className="font-extrabold text-sm sm:text-base text-gray-900 line-clamp-1">
                    {mandi.displayName}
                  </h3>
                  <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md flex-shrink-0">
                    {mandi.distanceKm} {t.km}
                  </span>
                </div>

                {/* Quoted Price */}
                <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-200 flex justify-between items-center text-xs mb-2.5">
                  <span className="text-gray-600 font-bold">{t.mandiPrice}:</span>
                  <span className="font-black text-gray-950 text-base">₹{mandi.price}{t.perQuintal}</span>
                </div>

                {/* Deduction Math */}
                <div className="space-y-1 text-[11px] text-gray-600">
                  <div className="flex justify-between">
                    <span>{t.grossRevenue}:</span>
                    <span className="font-bold text-gray-900">₹{mandi.grossRevenue.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-rose-700 font-medium">
                    <span>{t.transportCost} ({mandi.distanceKm} {t.km}):</span>
                    <span>-₹{mandi.freightCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-rose-700 font-medium">
                    <span>{t.loadingCost} ({mandi.cessPercent}%):</span>
                    <span>-₹{(mandi.loadingCost + mandi.cessCost).toLocaleString('en-IN')}</span>
                  </div>
                </div>

              </div>

              {/* Net In-Hand Cash Box */}
              <div className="mt-3 pt-2.5 border-t border-gray-200">
                <div className={`p-2.5 rounded-xl border ${
                  mandi.isBestDeal ? 'bg-emerald-100/90 border-emerald-300' : 'bg-gray-100 border-gray-200'
                }`}>
                  <span className="text-[10px] font-extrabold text-gray-600 block uppercase">
                    {t.netCashInHand}:
                  </span>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className={`text-xl font-black ${mandi.isBestDeal ? 'text-emerald-950' : 'text-gray-900'}`}>
                      ₹{mandi.netProfit.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] font-bold text-gray-600">
                      (₹{mandi.netPerQuintal}{t.perQuintal})
                    </span>
                  </div>
                </div>

                {!mandi.isBestDeal && (
                  <div className="text-center mt-1.5">
                    <span className="text-[10px] font-bold text-rose-600">
                      ⚠️ ₹{mandi.profitDiff.toLocaleString('en-IN')} {t.lossVsBest}
                    </span>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
