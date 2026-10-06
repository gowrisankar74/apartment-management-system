import React, { useState } from 'react';
import { X, AlertTriangle, Phone, Flame, HeartPulse, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';
import { EmergencySOSAlert } from '../../types/community';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SosModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { community, triggerSOS, activeSosAlarm, resolveSOS, role, language } = useCommunity();
  const [selectedType, setSelectedType] = useState<EmergencySOSAlert['emergencyType']>('Medical');
  const [triggered, setTriggered] = useState(false);
  const [resolutionNote, setResolutionNote] = useState('');

  if (!isOpen) return null;

  const handleTrigger = () => {
    triggerSOS(selectedType);
    setTriggered(true);
  };

  const handleResolve = () => {
    if (activeSosAlarm) {
      resolveSOS(activeSosAlarm.id, resolutionNote || 'Resolved on-site by Gate security officer');
      onClose();
    }
  };

  const emergencyContacts = [
    { name: 'Ambulance & Paramedics', number: community.emergencyAmbulance, icon: <HeartPulse className="w-4 h-4 text-rose-500" /> },
    { name: 'Fire Force Brigade', number: community.emergencyFire, icon: <Flame className="w-4 h-4 text-amber-500" /> },
    { name: 'Police Helpline', number: community.emergencyPolice, icon: <ShieldAlert className="w-4 h-4 text-blue-500" /> },
    { name: 'Main Gate 1 Intercom', number: community.gateContact, icon: <Phone className="w-4 h-4 text-emerald-500" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border-2 border-red-500">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight">
                {language === 'ta' ? 'அவசர SOS உதவி மையம்' : 'Emergency SOS Response'}
              </h3>
              <p className="text-xs text-red-100">
                {community.name}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Active Alarm State */}
          {activeSosAlarm && activeSosAlarm.status === 'Active Alert' ? (
            <div className="p-4 bg-red-50 rounded-2xl border border-red-200 text-center space-y-3">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto animate-ping">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h4 className="font-black text-red-700 text-base">
                ACTIVE {activeSosAlarm.emergencyType.toUpperCase()} DISTRESS ALARM
              </h4>
              <p className="text-xs text-red-600">
                Alarm triggered for Flat {activeSosAlarm.flatNumber}. Gate 1 security guards and association administrators have been alerted.
              </p>

              {role === 'security' || role === 'admin' ? (
                <div className="pt-2 space-y-2">
                  <input
                    type="text"
                    value={resolutionNote}
                    onChange={e => setResolutionNote(e.target.value)}
                    placeholder="Enter resolution notes (e.g. Officer dispatched to Flat A-402)..."
                    className="w-full text-xs p-2.5 rounded-xl border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    onClick={handleResolve}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition"
                  >
                    Mark Alarm Resolved
                  </button>
                </div>
              ) : (
                <p className="text-[11px] text-slate-500 font-medium">
                  Stay calm. Security guard is en route to your flat.
                </p>
              )}
            </div>
          ) : (
            <>
              {/* Emergency Trigger Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Select Nature of Distress:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Medical', 'Fire', 'Security Alarm', 'General SOS'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition text-left flex items-center justify-between ${
                        selectedType === type
                          ? 'bg-red-50 border-red-500 text-red-700 font-bold ring-1 ring-red-400'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{type}</span>
                      {selectedType === type && <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Big Distress Trigger Button */}
              <button
                onClick={handleTrigger}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-black text-sm tracking-wide shadow-lg shadow-red-600/30 hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-5 h-5" />
                <span>BROADCAST INSTANT SOS ALARM</span>
              </button>

              {/* 1-Tap Speed Dial Direct Numbers */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  One-Tap Emergency Speed Dials
                </h4>
                <div className="space-y-1.5">
                  {emergencyContacts.map((c, i) => (
                    <a
                      key={i}
                      href={`tel:${c.number}`}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition text-xs"
                    >
                      <div className="flex items-center gap-2 text-slate-800 font-medium">
                        {c.icon}
                        <span>{c.name}</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {c.number}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
