import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Phone, 
  ShieldCheck, 
  CheckCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SERVICE_LISTINGS } from '../data/seedData';
import { AudioReadButton } from './AudioReadButton';
import { BookingModal } from './BookingModal';

export const ServiceListings = ({ 
  activeCategory, 
  onSelectCategory,
  voiceSearchQuery = '',
  onClearVoiceSearch
}) => {
  const { language, t, selectedLocation } = useLanguage();

  const [searchQuery, setSearchQuery] = useState(voiceSearchQuery || '');
  const [sortBy, setSortBy] = useState('rating');
  const [filterOnlyLocal, setFilterOnlyLocal] = useState(true);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState(null);

  useEffect(() => {
    if (voiceSearchQuery) {
      setSearchQuery(voiceSearchQuery);
    }
  }, [voiceSearchQuery]);

  const categoriesList = [
    { id: 'all', label: { en: 'All', mr: 'सर्व', hi: 'सभी' } },
    { id: 'equipment', label: { en: '🚜 Equipment', mr: '🚜 अवजारे', hi: '🚜 उपकरण' } },
    { id: 'labour', label: { en: '👥 Labour', mr: '👥 मजूर', hi: '👥 मजदूर' } },
    { id: 'pooling', label: { en: '🚚 Transport', mr: '🚚 वाहतूक', hi: '🚚 परिवहन' } },
    { id: 'storage', label: { en: '🏬 Storage', mr: '🏬 शितगृह', hi: '🏬 गोदाम' } },
  ];

  const currentDistrict = typeof selectedLocation.district === 'object'
    ? (selectedLocation.district[language] || selectedLocation.district.mr)
    : selectedLocation.district;

  const currentLocationName = selectedLocation.name[language] || selectedLocation.name.mr;

  // Filtering based on location + category + search query
  const filteredListings = useMemo(() => {
    return SERVICE_LISTINGS.filter((item) => {
      // Location filter: if active, show matching location
      if (filterOnlyLocal && item.locationId && item.locationId !== selectedLocation.id) {
        return false;
      }

      // Category match
      if (activeCategory && activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Search match across all fields and languages
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const titleEn = item.title.en?.toLowerCase() || '';
        const titleMr = item.title.mr?.toLowerCase() || '';
        const titleHi = item.title.hi?.toLowerCase() || '';
        const ownerEn = item.ownerName.en?.toLowerCase() || '';
        const ownerMr = item.ownerName.mr?.toLowerCase() || '';
        const ownerHi = item.ownerName.hi?.toLowerCase() || '';
        const villageEn = item.village.en?.toLowerCase() || '';
        const villageMr = item.village.mr?.toLowerCase() || '';
        const villageHi = item.village.hi?.toLowerCase() || '';
        const category = item.category?.toLowerCase() || '';
        const featuresText = [
          ...(item.features?.en || []),
          ...(item.features?.mr || []),
          ...(item.features?.hi || [])
        ].join(' ').toLowerCase();

        const matches = 
          titleEn.includes(q) ||
          titleMr.includes(q) ||
          titleHi.includes(q) ||
          ownerEn.includes(q) ||
          ownerMr.includes(q) ||
          ownerHi.includes(q) ||
          villageEn.includes(q) ||
          villageMr.includes(q) ||
          villageHi.includes(q) ||
          category.includes(q) ||
          featuresText.includes(q);

        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_asc') return a.rate - b.rate;
      return 0;
    });
  }, [selectedLocation, filterOnlyLocal, activeCategory, searchQuery, sortBy]);

  const resultsHeaderLabel = 
    language === 'mr'
      ? `${currentLocationName} मध्ये ${filteredListings.length} सेवा उपलब्ध`
      : language === 'hi'
      ? `${currentLocationName} में ${filteredListings.length} सेवाएं उपलब्ध`
      : `${filteredListings.length} services available in ${currentLocationName}`;

  return (
    <div className="space-y-4 my-4">
      
      {/* Search & Location Filter Strip */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-200 shadow-sm space-y-3">
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!e.target.value && onClearVoiceSearch) onClearVoiceSearch();
              }}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-emerald-600 focus:bg-white focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  if (onClearVoiceSearch) onClearVoiceSearch();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 font-bold text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Location Toggle Pill: Local vs All */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <button
              onClick={() => setFilterOnlyLocal(!filterOnlyLocal)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1 ${
                filterOnlyLocal
                  ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                  : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>
                {filterOnlyLocal
                  ? `${t.onlyDistrict} ${currentDistrict}`
                  : t.allRegions}
              </span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-1.5 px-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none"
            >
              <option value="rating">⭐ {t.sortRating}</option>
              <option value="price_asc">₹ {t.sortPriceLow}</option>
            </select>
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all touch-target ${
                (activeCategory === cat.id || (!activeCategory && cat.id === 'all'))
                  ? 'bg-agri-900 text-white shadow-sm'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {cat.label[language] || cat.label.mr}
            </button>
          ))}
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1 text-xs">
        <span className="font-extrabold text-agri-950 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>{resultsHeaderLabel}</span>
        </span>
        {filteredListings.length === 0 && (
          <button
            onClick={() => setFilterOnlyLocal(false)}
            className="text-emerald-800 font-bold underline"
          >
            {t.viewOtherRegions}
          </button>
        )}
      </div>

      {/* Visual Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredListings.map((item) => {
          const title = item.title[language] || item.title.mr;
          const ownerName = item.ownerName[language] || item.ownerName.mr;
          const village = item.village[language] || item.village.mr;
          const unit = item.unit[language] || item.unit.mr;
          const features = item.features[language] || item.features.mr;
          const audio = item.audioText[language] || item.audioText.mr;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-farmer hover:border-emerald-400 transition-all flex flex-col justify-between"
            >
              <div>
                
                {/* Top Row: Verification + Rating + Audio */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    {item.verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">
                        <ShieldCheck className="w-3 h-3 text-emerald-700" />
                        <span>{t.verifiedService}</span>
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                    </span>
                  </div>

                  <AudioReadButton
                    id={item.id}
                    text={audio}
                    label={t.listen}
                  />
                </div>

                {/* Title & Price Header */}
                <div className="flex items-start justify-between gap-2 my-1">
                  <div>
                    <h3 className="font-extrabold text-base text-gray-900 leading-snug line-clamp-1">
                      {title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold mt-0.5">
                      <span>{ownerName}</span>
                      <span className="text-gray-300">•</span>
                      <span className="flex items-center gap-1 text-emerald-800">
                        <MapPin className="w-3 h-3" /> {village}
                      </span>
                    </div>
                  </div>

                  {/* Price Tag */}
                  <div className="text-right flex-shrink-0 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                    <span className="text-lg font-black text-emerald-950">₹{item.rate}</span>
                    <span className="text-[10px] font-bold text-emerald-800 block -mt-1">{unit}</span>
                  </div>
                </div>

                {/* Compact Feature Chips */}
                <div className="flex flex-wrap gap-1.5 my-2.5">
                  {features.slice(0, 3).map((feat, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-50 text-gray-700 border border-gray-200"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-2.5 border-t border-gray-100 flex items-center gap-2">
                <a
                  href={`tel:${item.phone}`}
                  className="px-3 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-800 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t.callOwner}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedServiceForBooking(item)}
                  className="flex-1 py-2 px-3 bg-agri-900 hover:bg-agri-950 text-white rounded-xl text-xs font-extrabold shadow-sm active:scale-98 transition-all flex items-center justify-center gap-1"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{t.bookNow}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Booking Sheet Modal */}
      {selectedServiceForBooking && (
        <BookingModal
          service={selectedServiceForBooking}
          onClose={() => setSelectedServiceForBooking(null)}
        />
      )}

    </div>
  );
};
