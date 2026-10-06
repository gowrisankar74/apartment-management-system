import React from 'react';
import { 
  Package, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Truck, 
  QrCode,
  Key
} from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';

export const ResidentDeliveries: React.FC = () => {
  const { deliveries, collectDelivery, t, residentUser, language } = useCommunity();

  const myDeliveries = deliveries.filter(d => d.flatNumber === residentUser.flatNumber);
  const waitingAtGate = myDeliveries.filter(d => d.status === 'Waiting at Gate');
  const pastDeliveries = myDeliveries.filter(d => d.status !== 'Waiting at Gate');

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          {t('deliveriesTitle')}
        </h2>
        <p className="text-xs text-slate-500">
          {language === 'ta' ? 'பாதுகாப்பான பார்சல் மற்றும் கொரியர் கண்காணிப்பு' : 'Gate security courier intake with secure OTP verification'}
        </p>
      </div>

      {/* Waiting at Gate Section */}
      <div>
        <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Package className="w-3.5 h-3.5" />
          <span>Waiting at Gate 1 ({waitingAtGate.length})</span>
        </h3>

        <div className="space-y-3">
          {waitingAtGate.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-500 opacity-60" />
              <p className="font-semibold text-slate-700">No pending parcels at gate</p>
              <p className="text-[11px] text-slate-400 mt-0.5">All packages have been collected.</p>
            </div>
          ) : (
            waitingAtGate.map(item => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-2xl border-2 border-emerald-500 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{item.courierCompany}</h4>
                      <p className="text-[11px] text-slate-500 font-mono">
                        Tracking: {item.trackingNumber}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    At Gate 1
                  </span>
                </div>

                {/* Secure OTP Card */}
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 block">
                      {t('pickupOtpPrompt')}
                    </span>
                    <span className="text-2xl font-black font-mono tracking-widest text-emerald-900 mt-0.5 block">
                      {item.pickupOtp}
                    </span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-emerald-200 text-emerald-700">
                    <Key className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Received: {item.receivedAt}
                  </span>
                  <button
                    onClick={() => collectDelivery(item.id)}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-xs transition"
                  >
                    {t('markCollected')}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Past Deliveries History */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Collected Package History ({pastDeliveries.length})
        </h3>
        <div className="space-y-2">
          {pastDeliveries.map(item => (
            <div
              key={item.id}
              className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">{item.courierCompany}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{item.trackingNumber}</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Collected
                </span>
                <span className="text-[10px] text-slate-400 block">{item.collectedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
