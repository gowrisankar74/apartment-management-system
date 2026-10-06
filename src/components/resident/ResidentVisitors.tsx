import React, { useState } from 'react';
import { 
  UserPlus, 
  QrCode, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Share2, 
  Plus, 
  X, 
  Phone, 
  Car, 
  ShieldCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';
import { VisitorPass } from '../../types/community';

export const ResidentVisitors: React.FC = () => {
  const { 
    visitorPasses, 
    createVisitorPass, 
    respondUnexpectedVisitor, 
    t, 
    language,
    residentUser
  } = useCommunity();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPassForQR, setSelectedPassForQR] = useState<VisitorPass | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState<VisitorPass['purpose']>('Guest');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeWindow, setTimeWindow] = useState('17:00 - 20:00');
  const [vehicle, setVehicle] = useState('');

  const myPasses = visitorPasses.filter(p => p.flatNumber === residentUser.flatNumber);
  const pendingApprovals = myPasses.filter(p => p.status === 'waiting_approval');
  const activePasses = myPasses.filter(p => p.status !== 'waiting_approval');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPass = createVisitorPass({
      visitorName: name,
      visitorPhone: phone || '+91 98000 00000',
      purpose,
      scheduledDate: date,
      scheduledTimeWindow: timeWindow,
      vehicleNumber: vehicle
    });

    setName('');
    setPhone('');
    setVehicle('');
    setShowCreateModal(false);
    setSelectedPassForQR(newPass);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Header with New Pass CTA */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            {t('visitorTitle')}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'ta' ? 'பாதுகாப்பான டிஜிட்டல் பாஸ்கள் மற்றும் அனுமதி' : 'Pre-approved digital passes & instant gate clearance'}
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>{t('createPass')}</span>
        </button>
      </div>

      {/* Pending Unexpected Gate Approvals */}
      {pendingApprovals.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Gate Approvals Requiring Immediate Action ({pendingApprovals.length})</span>
          </h3>
          {pendingApprovals.map(pass => (
            <div
              key={pass.id}
              className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 rounded-2xl border-2 border-emerald-500 shadow-md space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-300">
                    At Gate 1 Now
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 mt-1">
                    {pass.visitorName}
                  </h4>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Purpose: <strong className="text-slate-800">{pass.purpose}</strong> · Phone: {pass.visitorPhone}
                  </div>
                  {pass.vehicleNumber && (
                    <div className="text-xs text-slate-500 font-mono mt-0.5">
                      Vehicle: {pass.vehicleNumber}
                    </div>
                  )}
                </div>
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-emerald-200">
                <button
                  onClick={() => respondUnexpectedVisitor(pass.id, false)}
                  className="flex-1 py-2 px-3 rounded-xl bg-white border border-rose-300 text-rose-700 text-xs font-bold hover:bg-rose-50 transition"
                >
                  {t('deny')}
                </button>
                <button
                  onClick={() => respondUnexpectedVisitor(pass.id, true)}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-xs transition"
                >
                  {t('allow')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List of Active Passes */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          {t('activePasses')} ({activePasses.length})
        </h3>
        <div className="space-y-2.5">
          {activePasses.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 text-slate-400">
              <UserPlus className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-xs font-medium">No active visitor passes</p>
            </div>
          ) : (
            activePasses.map(pass => (
              <div
                key={pass.id}
                className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{pass.visitorName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {pass.purpose}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {pass.scheduledDate}
                    </span>
                    <span>·</span>
                    <span className="font-mono">{pass.scheduledTimeWindow}</span>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-700 font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Pass Code: {pass.passCode}</span>
                    {pass.checkInTime && <span className="text-slate-500">(In: {pass.checkInTime})</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPassForQR(pass)}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                    title="View QR Code"
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                    pass.status === 'checked_in'
                      ? 'bg-blue-100 text-blue-800'
                      : pass.status === 'checked_out'
                      ? 'bg-slate-100 text-slate-600'
                      : pass.status === 'approved' || pass.status === 'pre_approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {pass.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create Pass Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">{t('createPass')}</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 pt-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">{t('visitorName')} *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Suresh Kumar"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">{t('visitorPhone')}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 98400 11223"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">{t('visitorPurpose')}</label>
                  <select
                    value={purpose}
                    onChange={e => setPurpose(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Guest">Guest / Friend</option>
                    <option value="Delivery">Delivery Executive</option>
                    <option value="Cab">Ola / Uber Cab</option>
                    <option value="Maintenance">Service / Repair</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Vehicle Plate (Opt)</label>
                  <input
                    type="text"
                    value={vehicle}
                    onChange={e => setVehicle(e.target.value)}
                    placeholder="TN-09-AB-1234"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">{t('visitorDate')}</label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">{t('visitorTime')}</label>
                  <input
                    type="text"
                    value={timeWindow}
                    onChange={e => setTimeWindow(e.target.value)}
                    placeholder="18:00 - 21:00"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition"
                >
                  Generate Pass
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Presentation Modal */}
      {selectedPassForQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700">Digital Gate Pass</span>
              <button onClick={() => setSelectedPassForQR(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated QR Code SVG Canvas */}
            <div className="p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 inline-block mx-auto">
              <div className="w-44 h-44 bg-white p-2 border border-slate-200 rounded-xl flex flex-col items-center justify-center relative shadow-inner">
                {/* SVG QR Code Pattern */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                  {/* Top-left locator */}
                  <rect x="5" y="5" width="25" height="25" />
                  <rect x="10" y="10" width="15" height="15" fill="white" />
                  <rect x="13" y="13" width="9" height="9" />

                  {/* Top-right locator */}
                  <rect x="70" y="5" width="25" height="25" />
                  <rect x="75" y="10" width="15" height="15" fill="white" />
                  <rect x="78" y="13" width="9" height="9" />

                  {/* Bottom-left locator */}
                  <rect x="5" y="70" width="25" height="25" />
                  <rect x="10" y="75" width="15" height="15" fill="white" />
                  <rect x="13" y="78" width="9" height="9" />

                  {/* Random QR bits */}
                  <rect x="35" y="10" width="8" height="8" />
                  <rect x="50" y="15" width="8" height="8" />
                  <rect x="35" y="30" width="8" height="8" />
                  <rect x="45" y="35" width="12" height="6" />
                  <rect x="60" y="45" width="8" height="8" />
                  <rect x="25" y="50" width="8" height="8" />
                  <rect x="40" y="60" width="14" height="8" />
                  <rect x="65" y="70" width="8" height="8" />
                  <rect x="80" y="60" width="12" height="8" />
                  <rect x="75" y="40" width="8" height="8" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-emerald-600 text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded shadow">
                    {selectedPassForQR.passCode}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xl font-black font-mono tracking-wider text-slate-900">
                {selectedPassForQR.passCode}
              </div>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{selectedPassForQR.visitorName}</p>
              <p className="text-[11px] text-slate-500">
                Flat A-402 · {selectedPassForQR.scheduledDate} ({selectedPassForQR.scheduledTimeWindow})
              </p>
            </div>

            <p className="text-[11px] text-slate-500">
              Visitor can present this QR code or 6-digit code at Gate 1 turnstile for contactless entry.
            </p>

            <button
              onClick={() => setSelectedPassForQR(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
