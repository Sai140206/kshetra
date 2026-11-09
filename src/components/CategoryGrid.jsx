import React from 'react';
import { 
  Tractor, 
  Users, 
  Truck, 
  Warehouse, 
  Wrench, 
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES } from '../data/seedData';

const iconMap = {
  Tractor,
  Users,
  Truck,
  Warehouse,
  Wrench
};

export const CategoryGrid = ({ onSelectCategory, activeCategory, setActiveTab }) => {
  const { language, t } = useLanguage();

  const handleCardClick = (catId) => {
    if (catId === 'pooling') {
      setActiveTab('pooling');
    } else if (catId === 'sos') {
      setActiveTab('sos');
    } else {
      onSelectCategory(catId);
      setActiveTab('services');
    }
  };

  return (
    <section className="my-4">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <h2 className="text-base sm:text-lg font-black text-agri-950 flex items-center gap-1.5">
          <span>🌾</span>
          <span>{t.categoryHeading}</span>
        </h2>

        <button
          onClick={() => {
            onSelectCategory('all');
            setActiveTab('services');
          }}
          className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
        >
          <span>{t.viewAllBtn}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
        {CATEGORIES.map((cat) => {
          const IconComponent = iconMap[cat.icon] || Tractor;
          const isSelected = activeCategory === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => handleCardClick(cat.id)}
              className={`cursor-pointer rounded-2xl p-3 border transition-all duration-150 shadow-sm hover:shadow-farmer hover:-translate-y-0.5 bg-white flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-600 ring-2 ring-emerald-500/20'
                  : 'border-gray-200 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1.5">
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${cat.bgLight}`}>
                  {cat.badge[language] || cat.badge.mr}
                </span>
                <span className="text-[10px] font-bold text-gray-400">
                  {cat.count}+
                </span>
              </div>

              <div className="my-1">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shadow-sm`}>
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-gray-900 leading-tight">
                  {cat.title[language] || cat.title.mr}
                </h3>
                <p className="text-[10px] text-gray-500 line-clamp-1 mt-0.5 font-medium">
                  {cat.subtitle[language] || cat.subtitle.mr}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
