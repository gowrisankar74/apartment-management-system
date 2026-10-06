import React, { useState } from 'react';
import { 
  Building, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  X, 
  Plus, 
  Sparkles, 
  Activity, 
  Waves, 
  Dumbbell,
  Receipt,
  XCircle
} from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';
import { Facility, FacilityBooking } from '../../types/community';

export const ResidentFacilities: React.FC = () => {
  const { 
    facilities, 
    facilityBookings, 
    bookFacility, 
    cancelBooking, 
    t, 
    residentUser,
    language 
  } = useCommunity();

  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [guestCount, setGuestCount] = useState(2);
  const [confirmedBooking, setConfirmedBooking] = useState<FacilityBooking | null>(null);

  const myBookings = facilityBookings.filter(b => b.flatNumber === residentUser.flatNumber);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-5 h-5 text-emerald-600" />;
      case 'Waves':
        return <Waves className="w-5 h-5 text-blue-600" />;
      case 'Dumbbell':
        return <Dumbbell className="w-5 h-5 text-amber-600" />;
      case 'Building':
      default:
        return <Building className="w-5 h-5 text-purple-600" />;
    }
  };

  const handleStartBooking = (fac: Facility) => {
    setSelectedFacility(fac);
    setSelectedSlot(fac.slots[0] || '');
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFacility || !selectedSlot) return;

    const res = bookFacility({
      facilityId: selectedFacility.id,
      date: selectedDate,
      timeSlot: selectedSlot,
      guestsCount: guestCount
    });

    if (res) {
      setConfirmedBooking(res);
      setSelectedFacility(null);
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          {t('facilitiesTitle')}
        </h2>
        <p className="text-xs text-slate-500">
          {language === 'ta' ? 'அனைத்து கிளப்ஹவுஸ் மற்றும் விளையாட்டு மைதான முன்பதிவுகள்' : 'Exclusive community amenities with slot reservation & digital passes'}
        </p>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {facilities.map(fac => (
          <div
            key={fac.id}
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:border-slate-300 transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  {getIcon(fac.iconName)}
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-900">
                    {language === 'ta' ? fac.tamilName : fac.name}
                  </h3>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{fac.openHours}</span>
                  </div>
                </div>
              </div>
              <span className="text-xs font-extrabold font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                {fac.hourlyFee === 0 ? 'FREE' : `₹${fac.hourlyFee}/hr`}
              </span>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
              {fac.description}
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-medium">
                Max {fac.maxBookingHours} hrs · Cap: {fac.capacity}
              </span>
              <button
                onClick={() => handleStartBooking(fac)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition"
              >
                {t('bookSlot')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* My Active Bookings Section */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          {t('myBookings')} ({myBookings.length})
        </h3>
        <div className="space-y-2">
          {myBookings.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
              No active amenity reservations
            </div>
          ) : (
            myBookings.map(b => (
              <div
                key={b.id}
                className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900">{b.facilityName}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {b.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span>{b.date}</span>
                    <span>·</span>
                    <span className="font-mono font-medium">{b.timeSlot}</span>
                    <span>·</span>
                    <span className="font-mono text-emerald-700">Ref: {b.receiptNumber}</span>
                  </div>
                </div>

                {b.status === 'Confirmed' && (
                  <button
                    onClick={() => cancelBooking(b.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                    title="Cancel Booking"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Booking Drawer Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Amenity Booking</span>
                <h3 className="font-bold text-sm text-slate-900 mt-0.5">{selectedFacility.name}</h3>
              </div>
              <button onClick={() => setSelectedFacility(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmReservation} className="space-y-3 pt-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Select Date</label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">{t('availableSlots')}</label>
                <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-slate-100">
                  {selectedFacility.slots.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2 rounded-lg font-mono text-[11px] font-semibold border text-center transition ${
                        selectedSlot === slot
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Number of Guests / Players</label>
                <input
                  type="number"
                  min={1}
                  max={selectedFacility.capacity}
                  value={guestCount}
                  onChange={e => setGuestCount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Fee Summary */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600">Total Slot Fee:</span>
                <span className="font-bold text-slate-900 font-mono text-sm">
                  {selectedFacility.hourlyFee === 0 ? 'FREE (Community Included)' : `₹${selectedFacility.hourlyFee}`}
                </span>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedFacility(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition"
                >
                  Confirm & Reserve
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmed Booking Toast Card */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Booking Confirmed!</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {confirmedBooking.facilityName}
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-700 space-y-1">
              <div><strong>Date:</strong> {confirmedBooking.date}</div>
              <div><strong>Slot:</strong> {confirmedBooking.timeSlot}</div>
              <div><strong>Pass Ref:</strong> <span className="font-mono font-bold text-emerald-700">{confirmedBooking.receiptNumber}</span></div>
            </div>

            <button
              onClick={() => setConfirmedBooking(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Great, Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
