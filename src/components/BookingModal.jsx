import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Phone, 
  User, 
  MapPin, 
  ShieldCheck, 
  FileText,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const BookingModal = ({ service, onClose, onBookingSuccess }) => {
  const { language, t, addFarmerBooking } = useLanguage();

  const [dateOption, setDateOption] = useState('tomorrow');
  const [customDate, setCustomDate] = useState('2026-09-30');
  const [duration, setDuration] = useState(3); // 3 hours or 3 acres
  const [needDriver, setNeedDriver] = useState(service.hasDriver);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState(null);

  if (!service) return null;

  const title = service.title[language] || service.title.mr;
  const ownerName = service.ownerName[language] || service.ownerName.mr;
  const village = service.village[language] || service.village.mr;
  const unit = service.unit[language] || service.unit.mr;

  const estimatedTotal = service.rate * duration;

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingId = `KSH-${Math.floor(1000 + Math.random() * 9000)}`;
    const selectedDateLabel = 
      dateOption === 'today'
        ? t.todayLabel
        : dateOption === 'tomorrow'
        ? t.tomorrowLabel
        : customDate;

    setTimeout(() => {
      const newBooking = {
        id: bookingId,
        serviceId: service.id,
        serviceTitle: title,
        ownerName: ownerName,
        phone: service.phone,
        village: village,
        rate: service.rate,
        unit: unit,
        duration: duration,
        date: selectedDateLabel,
        total: estimatedTotal,
        hasDriver: needDriver,
        notes: notes || 'Standard field work',
        createdAt: new Date().toLocaleTimeString(),
        status: 'Confirmed'
      };

      addFarmerBooking(newBooking);
      setReceipt(newBooking);
      setIsSubmitting(false);

      if (onBookingSuccess) {
        onBookingSuccess(newBooking);
      }
    }, 600);
  };

  const smsText = t.smsAlertSample
    .replace('{title}', receipt?.serviceTitle || title)
    .replace('{total}', receipt?.total || estimatedTotal);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-agri-100 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-agri-800 to-agri-950 text-white p-4 sm:p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-700/60 text-emerald-200 border border-emerald-500/30">
              {receipt ? t.bookingReceipt : t.bookingSummary}
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-white mt-1 line-clamp-1">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* If Receipt is Generated */}
          {receipt ? (
            <div className="space-y-4 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-gray-900">
                  {t.bookingSuccess}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {t.bookingOwnerNotified}
                </p>
              </div>

              {/* Receipt Box */}
              <div className="bg-agri-50/80 rounded-2xl p-4 text-left border border-agri-200 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-agri-200">
                  <span className="text-gray-500 font-medium">{t.bookingCode}</span>
                  <span className="font-extrabold text-agri-950 font-mono text-sm bg-emerald-200/70 px-2 py-0.5 rounded">
                    {receipt.id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">{t.equipmentOwner}</span>
                  <span className="font-bold text-gray-900">{receipt.ownerName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">{t.dateLabel}</span>
                  <span className="font-bold text-gray-900">{receipt.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">{t.durationLabel}</span>
                  <span className="font-bold text-gray-900">{receipt.duration} {receipt.unit}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-agri-200 text-sm">
                  <span className="font-bold text-gray-800">{t.totalEstimated}:</span>
                  <span className="font-extrabold text-agri-900 text-base">₹{receipt.total}</span>
                </div>
              </div>

              {/* Simulated SMS Alert */}
              <div className="bg-amber-50 rounded-xl p-3 text-left border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">{t.smsAlertTitle}</strong>
                  <span>"{smsText}"</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <a
                  href={`tel:${service.phone}`}
                  className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.callOwner}</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold transition-colors"
                >
                  {t.close}
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleConfirm} className="space-y-4">
              
              {/* Owner Info Bar */}
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200/80 flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-agri-100 text-agri-800 flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-gray-900">{ownerName}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-gray-500 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" /> {village}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="block text-xs text-gray-500">{t.mandiPrice}</span>
                  <span className="font-extrabold text-agri-800 text-sm sm:text-base">
                    ₹{service.rate} <span className="text-xs font-normal text-gray-500">{unit}</span>
                  </span>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  <Calendar className="w-3.5 h-3.5 inline mr-1 text-agri-700" />
                  {t.selectDate}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDateOption('today')}
                    className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                      dateOption === 'today'
                        ? 'bg-agri-800 text-white border-agri-900 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {t.todayLabel}
                  </button>

                  <button
                    type="button"
                    onClick={() => setDateOption('tomorrow')}
                    className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                      dateOption === 'tomorrow'
                        ? 'bg-agri-800 text-white border-agri-900 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {t.tomorrowLabel}
                  </button>

                  <button
                    type="button"
                    onClick={() => setDateOption('custom')}
                    className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                      dateOption === 'custom'
                        ? 'bg-agri-800 text-white border-agri-900 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {t.pickDateLabel}
                  </button>
                </div>

                {dateOption === 'custom' && (
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="mt-2 w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-agri-600 focus:outline-none"
                  />
                )}
              </div>

              {/* Quantity / Duration Stepper */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  <Clock className="w-3.5 h-3.5 inline mr-1 text-agri-700" />
                  {t.durationHours} ({unit})
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setDuration((prev) => Math.max(1, prev - 1))}
                    className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 text-xl font-bold flex items-center justify-center transition-colors"
                  >
                    -
                  </button>

                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl py-2 px-4 text-center">
                    <span className="text-xl font-extrabold text-agri-950">{duration}</span>
                    <span className="text-xs text-gray-500 font-medium block">{unit}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDuration((prev) => prev + 1)}
                    className="w-11 h-11 rounded-xl bg-agri-100 hover:bg-agri-200 text-agri-900 text-xl font-bold flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Driver / Operator Toggle */}
              {service.hasDriver && (
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-emerald-950 block">
                        {t.needDriver}
                      </span>
                      <span className="text-[11px] text-emerald-800">
                        {t.operatorIncluded}
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={needDriver}
                    onChange={(e) => setNeedDriver(e.target.checked)}
                    className="w-5 h-5 text-agri-700 rounded accent-agri-700 focus:ring-agri-500"
                  />
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  <FileText className="w-3.5 h-3.5 inline mr-1 text-agri-700" />
                  {t.specialNotes}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.notesPlaceholder}
                  rows={2}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-agri-600 focus:outline-none"
                />
              </div>

              {/* Price Calculation Card */}
              <div className="bg-soil-50 p-3.5 rounded-2xl border border-soil-200 space-y-1.5 text-xs sm:text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>{t.rateCalc} ({duration} × ₹{service.rate}):</span>
                  <span>₹{service.rate * duration}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>{t.freePlatformFee}</span>
                  <span>₹०</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-soil-200">
                  <span className="font-extrabold text-gray-900">{t.totalEstimated}:</span>
                  <span className="font-black text-agri-900 text-lg sm:text-xl">
                    ₹{estimatedTotal}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-agri-700 to-agri-900 hover:from-agri-800 hover:to-agri-950 text-white rounded-2xl font-extrabold text-sm sm:text-base shadow-farmer active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t.submittingBooking}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                    <span>{t.confirmBooking} (₹{estimatedTotal})</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
