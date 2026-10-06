import React, { useState } from 'react';
import { 
  Car, 
  Bike, 
  Zap, 
  MapPin, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  X,
  ShieldCheck,
  Search
} from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';
import { Vehicle } from '../../types/community';

export const ResidentVehiclesParking: React.FC = () => {
  const { vehicles, parkingSlots, residentUser, t, language } = useCommunity();
  const [showReportModal, setShowReportModal] = useState(false);
  const [conflictSlot, setConflictSlot] = useState('B1-014');
  const [conflictNote, setConflictNote] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  const myVehicles = vehicles.filter(v => v.flatNumber === residentUser.flatNumber);
  const mySlots = parkingSlots.filter(s => s.assignedFlatNumber === residentUser.flatNumber);

  const handleReportConflict = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setShowReportModal(false);
      setConflictNote('');
    }, 2000);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          Vehicle & Parking Management
        </h2>
        <p className="text-xs text-slate-500">
          {language === 'ta' ? 'வாகனங்கள் மற்றும் பார்க்கிங் இட ஒதுக்கீடு' : 'Allocated bays, EV charging ports & gate clearance'}
        </p>
      </div>

      {/* Allocated Parking Slots (Feature 5) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Allocated Parking Slots ({mySlots.length})
          </h3>
          <button
            onClick={() => setShowReportModal(true)}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Report Blocked Slot</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {mySlots.map(slot => (
            <div
              key={slot.id}
              className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold font-mono text-slate-900">
                  {slot.id}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  slot.type.includes('EV')
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {slot.type}
                </span>
              </div>
              <div className="text-[11px] text-slate-500">{slot.level}</div>
              <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 pt-1 border-t border-slate-100">
                <CheckCircle2 className="w-3 h-3" />
                <span>Reserved for Flat {slot.assignedFlatNumber}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Registered Vehicles (Feature 4) */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Registered Vehicles ({myVehicles.length})
        </h3>

        <div className="space-y-2.5">
          {myVehicles.map(veh => (
            <div
              key={veh.id}
              className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-700">
                  {veh.vehicleType.includes('EV') ? (
                    <Zap className="w-5 h-5 text-emerald-600" />
                  ) : veh.vehicleType === 'Car' ? (
                    <Car className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Bike className="w-5 h-5 text-amber-600" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-extrabold font-mono text-slate-900">
                    {veh.plateNumber}
                  </div>
                  <div className="text-xs text-slate-700 font-medium">{veh.makeModel}</div>
                  <div className="text-[10px] text-slate-500">
                    Assigned Slot: <strong className="font-mono text-slate-700">{veh.parkingSlot}</strong>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  veh.status === 'Inside' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {veh.status}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">{veh.lastGateActivity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Conflict Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Report Parking Conflict</h3>
              <button onClick={() => setShowReportModal(false)}><X className="w-5 h-5" /></button>
            </div>

            {reportSuccess ? (
              <div className="py-6 text-center text-xs space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <p className="font-bold text-slate-800">Alert Dispatched to Main Gate Security</p>
                <p className="text-slate-500 text-[11px]">Officer Raman will inspect slot {conflictSlot} immediately.</p>
              </div>
            ) : (
              <form onSubmit={handleReportConflict} className="space-y-3 pt-3 text-xs">
                <div>
                  <label className="font-semibold block mb-1">Affected Parking Slot</label>
                  <select
                    value={conflictSlot}
                    onChange={e => setConflictSlot(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    {mySlots.map(s => (
                      <option key={s.id} value={s.id}>{s.id} ({s.level})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Issue Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={conflictNote}
                    onChange={e => setConflictNote(e.target.value)}
                    placeholder="e.g. Unknown silver Honda car parked blocking my bay..."
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-rose-600 text-white rounded-xl font-bold shadow-xs hover:bg-rose-700 transition"
                >
                  Alert Security Gate
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
