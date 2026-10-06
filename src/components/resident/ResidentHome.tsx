import React from 'react';
import { 
  CreditCard, 
  UserPlus, 
  AlertCircle, 
  Calendar, 
  Package, 
  Clock, 
  ChevronRight, 
  Megaphone, 
  ShieldAlert, 
  CheckCircle2,
  Wrench,
  Sparkles,
  MapPin
} from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';

interface Props {
  onNavigate: (tab: string) => void;
  onOpenSos: () => void;
}

export const ResidentHome: React.FC<Props> = ({ onNavigate, onOpenSos }) => {
  const { 
    residentUser, 
    bills, 
    complaints, 
    visitorPasses, 
    deliveries, 
    facilityBookings, 
    announcements,
    t,
    language,
    setViewingReceipt
  } = useCommunity();

  const currentBill = bills.find(b => b.flatNumber === residentUser.flatNumber && b.status !== 'Paid') || bills[0];
  const pendingVisitor = visitorPasses.find(p => p.status === 'waiting_approval');
  const gateDeliveriesCount = deliveries.filter(d => d.status === 'Waiting at Gate').length;
  const activeComplaints = complaints.filter(c => c.flatNumber === residentUser.flatNumber && c.status !== 'Closed');
  const upcomingBooking = facilityBookings.find(b => b.status === 'Confirmed');
  const pinnedNotice = announcements.find(a => a.priority === 'pinned') || announcements[0];

  return (
    <div className="space-y-4 pb-20">
      {/* Resident Greeting Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white p-5 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>{residentUser.block} · {residentUser.flatNumber}</span>
            </div>
            <span className="text-[11px] font-mono bg-white/10 px-2 py-0.5 rounded-full text-slate-300">
              Grand Palms OS
            </span>
          </div>

          <h2 className="text-xl font-extrabold tracking-tight mt-1.5">
            {t('greeting')} {residentUser.name.split(' ')[0]}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            {language === 'ta' ? 'அனைத்து சேவைகளும் விரல் நுனியில்' : 'All community services active & updated'}
          </p>

          {/* Quick Action Badges */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-white/10">
            <button
              onClick={() => onNavigate('bills')}
              className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5 hover:bg-white/15 transition text-center"
            >
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-medium text-slate-200">Pay</span>
            </button>
            <button
              onClick={() => onNavigate('visitors')}
              className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5 hover:bg-white/15 transition text-center"
            >
              <UserPlus className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-medium text-slate-200">Visitor</span>
            </button>
            <button
              onClick={() => onNavigate('complaints')}
              className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5 hover:bg-white/15 transition text-center"
            >
              <Wrench className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-medium text-slate-200">Help</span>
            </button>
            <button
              onClick={onOpenSos}
              className="flex flex-col items-center gap-1 p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 transition text-center"
            >
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span className="text-[10px] font-bold text-rose-300">SOS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Urgent Pending Visitor Approval Banner if any */}
      {pendingVisitor && (
        <div 
          onClick={() => onNavigate('visitors')}
          className="p-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl shadow-md flex items-center justify-between cursor-pointer animate-pulse"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight">
                {language === 'ta' ? 'புதிய பார்வையாளர் அனுமதி தேவை!' : 'Gate Approval Pending!'}
              </div>
              <div className="text-[11px] text-emerald-100">
                {pendingVisitor.visitorName} ({pendingVisitor.purpose}) at Gate 1
              </div>
            </div>
          </div>
          <span className="text-xs bg-white text-emerald-800 font-bold px-2.5 py-1 rounded-lg">
            Review
          </span>
        </div>
      )}

      {/* Maintenance Bill Card (Feature 2) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
              ₹
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800">{t('duesTitle')}</h3>
              <p className="text-[11px] text-slate-500">{currentBill.month}</p>
            </div>
          </div>
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
            currentBill.status === 'Paid' 
              ? 'bg-emerald-100 text-emerald-800' 
              : currentBill.status === 'Overdue' 
              ? 'bg-rose-100 text-rose-800' 
              : 'bg-amber-100 text-amber-800'
          }`}>
            {currentBill.status}
          </span>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              ₹{currentBill.amount.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {currentBill.status === 'Paid' ? (
                <span className="text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Paid on {currentBill.paidAt}
                </span>
              ) : (
                `${t('dueOn')} ${currentBill.dueDate}`
              )}
            </div>
          </div>

          {currentBill.status === 'Paid' ? (
            <button
              onClick={() => setViewingReceipt(currentBill)}
              className="text-xs text-emerald-700 font-semibold hover:underline"
            >
              {t('downloadReceipt')}
            </button>
          ) : (
            <button
              onClick={() => onNavigate('bills')}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition"
            >
              {t('payNow')}
            </button>
          )}
        </div>
      </div>

      {/* Grid of Status Widgets */}
      <div className="grid grid-cols-2 gap-3">
        {/* Gate Deliveries (Feature 11) */}
        <div 
          onClick={() => onNavigate('deliveries')}
          className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs cursor-pointer hover:border-slate-300 transition"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-2 bg-blue-50 text-blue-700 rounded-xl">
              <Package className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold font-mono text-slate-900">
              {gateDeliveriesCount}
            </span>
          </div>
          <div className="text-xs font-bold text-slate-800">{t('gateDeliveries')}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {gateDeliveriesCount > 0 ? 'Collect with OTP' : 'No parcels'}
          </div>
        </div>

        {/* Active Complaints (Feature 6) */}
        <div 
          onClick={() => onNavigate('complaints')}
          className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs cursor-pointer hover:border-slate-300 transition"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-2 bg-amber-50 text-amber-700 rounded-xl">
              <AlertCircle className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold font-mono text-slate-900">
              {activeComplaints.length}
            </span>
          </div>
          <div className="text-xs font-bold text-slate-800">{t('openTickets')}</div>
          <div className="text-[11px] text-slate-500 mt-0.5 truncate">
            {activeComplaints.length > 0 ? activeComplaints[0].category : 'All clear'}
          </div>
        </div>
      </div>

      {/* Upcoming Facility Booking Card (Feature 7) */}
      {upcomingBooking && (
        <div 
          onClick={() => onNavigate('facilities')}
          className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs cursor-pointer hover:border-slate-300 transition"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-purple-50 text-purple-700 rounded-xl">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-purple-700 font-bold uppercase tracking-wider">
                  Upcoming Booking
                </span>
                <h4 className="text-xs font-bold text-slate-900">
                  {upcomingBooking.facilityName}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                  <span>{upcomingBooking.date}</span>
                  <span>·</span>
                  <span className="font-mono">{upcomingBooking.timeSlot}</span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      )}

      {/* Pinned Announcement Notice (Feature 8) */}
      {pinnedNotice && (
        <div 
          onClick={() => onNavigate('community')}
          className="bg-amber-50/70 border border-amber-200 p-3.5 rounded-2xl cursor-pointer hover:bg-amber-50 transition"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-800 uppercase tracking-wide">
              <Megaphone className="w-3.5 h-3.5" />
              <span>{pinnedNotice.priority === 'pinned' ? t('pinned') : t('latestNotice')}</span>
            </div>
            <span className="text-[10px] text-amber-700 font-medium">{pinnedNotice.publishedAt}</span>
          </div>
          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
            {language === 'ta' && pinnedNotice.tamilTitle ? pinnedNotice.tamilTitle : pinnedNotice.title}
          </h4>
          <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 leading-relaxed">
            {language === 'ta' && pinnedNotice.tamilContent ? pinnedNotice.tamilContent : pinnedNotice.content}
          </p>
        </div>
      )}

      {/* AI Assistant Callout (Feature 17) */}
      <div 
        onClick={() => onNavigate('assistant')}
        className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">
              {language === 'ta' ? 'குடியிருப்பு AI உதவியாளர்' : 'Apartment AI Concierge'}
            </div>
            <div className="text-[11px] text-slate-600">
              {language === 'ta' ? 'விதிகளை கேளுங்கள், பராமரிப்பு சரிபார்க்கவும்' : 'Ask about rules, dues, timings & trash guidelines'}
            </div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-blue-500" />
      </div>
    </div>
  );
};
