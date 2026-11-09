import React, { useState, useMemo, useEffect } from 'react';
import { 
  PhoneCall, 
  MapPin, 
  Clock, 
  Radio, 
  Share2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { GRAM_MECHANICS } from '../data/seedData';
import { AudioReadButton } from './AudioReadButton';

export const GramMechanicSOS = ({ initialIssue = 'tractor_engine' }) => {
  const { language, t, selectedLocation, showToast } = useLanguage();

  const [beaconActive, setBeaconActive] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(initialIssue || 'tractor_engine');

  useEffect(() => {
    if (initialIssue) {
      setSelectedIssue(initialIssue);
    }
  }, [initialIssue]);

  const breakdownIssues = [
    { 
      id: 'tractor_engine', 
      icon: '🚜', 
      label: { en: 'Tractor Clutch / Engine', mr: 'ट्रॅक्टर क्लच / इंजिन', hi: 'ट्रैक्टर क्लच / इंजन' } 
    },
    { 
      id: 'borewell_pump', 
      icon: '💧', 
      label: { en: 'Borewell Pump / Starter', mr: 'बोअरवेल मोटर / स्टार्टर', hi: 'बोरवेल मोटर / स्टार्टर' } 
    },
    { 
      id: 'harvester_cutter', 
      icon: '🌾', 
      label: { en: 'Harvester Cutter / Belt', mr: 'हार्वेस्टर कटर / बेल्ट', hi: 'हार्वेस्टर कटर / बेल्ट' } 
    },
    { 
      id: 'tyre_puncture', 
      icon: '🛞', 
      label: { en: 'Rear Big Tyre Puncture', mr: 'मागील मोठा टायर पंक्चर', hi: 'पिछला बड़ा टायर पंक्चर' } 
    },
  ];

  const currentDistrict = typeof selectedLocation.district === 'object'
    ? (selectedLocation.district[language] || selectedLocation.district.mr)
    : selectedLocation.district;

  // Filter mechanics for current selected location
  const localMechanics = useMemo(() => {
    const list = GRAM_MECHANICS.filter((m) => m.locationId === selectedLocation.id);
    return list.length > 0 ? list : GRAM_MECHANICS.slice(0, 2);
  }, [selectedLocation]);

  const handleTriggerBeacon = () => {
    setBeaconActive(true);
    showToast(t.sosBeaconSentMsg.replace('{district}', currentDistrict), 'success');
  };

  const generateWhatsAppUrl = (mech) => {
    const issueObj = breakdownIssues.find((i) => i.id === selectedIssue);
    const issueText = issueObj ? (issueObj.label[language] || issueObj.label.mr) : 'Breakdown';
    const text = encodeURIComponent(
      `🚨 *KSHETRA SOS Emergency Breakdown* 🚨\n\n` +
      `Location: ${selectedLocation.name.en} (${selectedLocation.name.mr})\n` +
      `GPS: ${selectedLocation.coords}\n` +
      `Issue: ${issueText}\n` +
      `Please dispatch mobile repair van immediately.`
    );
    return `https://wa.me/${mech.phone.replace(/[^0-9]/g, '')}?text=${text}`;
  };

  const nearestMechName = localMechanics[0]?.name[language] || localMechanics[0]?.name.mr;
  const audioSos = language === 'mr'
    ? `${selectedLocation.name.mr} परिसरासाठी ग्राम-मेकॅनिक सेवा. जवळचे मेकॅनिक ${nearestMechName} अवघ्या ${localMechanics[0]?.etaMinutes} मिनिटांत शेतात पोहोचू शकतात.`
    : language === 'hi'
    ? `${selectedLocation.name.hi} के लिए ग्राम-मिस्त्री सेवा। सबसे नजदीकी मिस्त्री ${nearestMechName} मात्र ${localMechanics[0]?.etaMinutes} मिनट में पहुंच सकते हैं।`
    : `Gram-Mechanic emergency service in ${selectedLocation.name.en}. Nearest is ${nearestMechName}, ETA ${localMechanics[0]?.etaMinutes} minutes.`;

  return (
    <div className="space-y-4 my-4">
      
      {/* Sleek Top Banner */}
      <div className="bg-gradient-to-r from-rose-900 to-soil-950 text-white rounded-3xl p-4 sm:p-5 shadow-sm border border-rose-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              {t.minFieldDispatch}
            </span>
            <span className="text-xs text-rose-200 font-semibold flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{selectedLocation.name[language] || selectedLocation.name.mr}</span>
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
            {t.sosTitle}
          </h2>
          <p className="text-xs text-rose-100 mt-0.5">
            {t.sosSubtitle}
          </p>
        </div>

        <AudioReadButton
          id={`sos-${selectedLocation.id}`}
          text={audioSos}
          label={t.listen}
          className="bg-white hover:bg-gray-100 text-rose-950 font-black shadow-md flex-shrink-0"
        />
      </div>

      {/* Breakdown Issue Pills */}
      <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-sm space-y-2">
        <label className="block text-[11px] font-extrabold text-gray-600 uppercase">
          🚨 {t.breakdownSelector}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {breakdownIssues.map((issue) => (
            <button
              key={issue.id}
              onClick={() => setSelectedIssue(issue.id)}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                selectedIssue === issue.id
                  ? 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-400/20 shadow-sm'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">{issue.icon}</span>
              <span className="truncate">{issue.label[language] || issue.label.mr}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive SOS Beacon Button */}
      <div className="bg-gradient-to-b from-rose-50 to-white rounded-2xl p-5 border border-rose-200 text-center shadow-sm">
        <div className="relative inline-block my-1">
          {beaconActive && (
            <>
              <span className="absolute -inset-3 rounded-full bg-rose-400/40 animate-ping" />
              <span className="absolute -inset-6 rounded-full bg-rose-300/20 animate-pulse" />
            </>
          )}

          <button
            type="button"
            onClick={handleTriggerBeacon}
            className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center text-white font-black shadow-xl transition-all active:scale-95 ${
              beaconActive
                ? 'bg-gradient-to-br from-rose-600 to-red-800 ring-8 ring-rose-500/30 animate-pulse'
                : 'bg-gradient-to-br from-rose-600 via-rose-700 to-red-800 hover:scale-105'
            }`}
          >
            <Radio className={`w-8 h-8 ${beaconActive ? 'animate-bounce' : ''}`} />
            <span className="text-[10px] uppercase tracking-wider mt-1">
              {beaconActive ? t.beaconActiveStatus : t.pressSOS}
            </span>
          </button>
        </div>

        <div className="mt-2">
          <span className="text-xs font-bold text-gray-900 block">
            {beaconActive ? t.beaconActive : t.dispatchBeacon}
          </span>
          <span className="text-[11px] text-gray-500 font-mono mt-0.5 block">
            📍 {selectedLocation.coords} ({selectedLocation.name[language] || selectedLocation.name.mr})
          </span>
        </div>
      </div>

      {/* Local Verified Mechanics Grid */}
      <div className="space-y-2.5">
        <span className="text-xs font-extrabold text-gray-900 block px-1">
          {t.mechanicsNearby} {currentDistrict}:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {localMechanics.map((mech) => {
            const name = mech.name[language] || mech.name.mr;
            const owner = typeof mech.owner === 'object' ? (mech.owner[language] || mech.owner.mr) : mech.owner;
            const village = typeof mech.village === 'object' ? (mech.village[language] || mech.village.mr) : mech.village;
            const specs = Array.isArray(mech.specializations)
              ? mech.specializations
              : (mech.specializations[language] || mech.specializations.mr);

            return (
              <div
                key={mech.id}
                className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:border-rose-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="bg-rose-100 text-rose-900 font-extrabold text-[10px] px-2 py-0.5 rounded-lg border border-rose-200 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-600" />
                      {mech.distanceKm} {t.km}
                    </span>
                    <span className="bg-amber-100 text-amber-900 font-extrabold text-[10px] px-2 py-0.5 rounded-lg border border-amber-200 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-700" />
                      {t.eta}: {mech.etaMinutes} {t.minute}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm sm:text-base text-gray-900 line-clamp-1">
                    {name}
                  </h4>
                  <p className="text-xs text-gray-500 font-semibold mt-0.5">
                    {owner} • {village}
                  </p>

                  <div className="flex flex-wrap gap-1 my-2">
                    {specs.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-gray-50 text-gray-700 border border-gray-200"
                      >
                        🔧 {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
                  <a
                    href={`tel:${mech.phone}`}
                    className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{t.callDirect}</span>
                  </a>

                  <a
                    href={generateWhatsAppUrl(mech)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{t.whatsapp}</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
