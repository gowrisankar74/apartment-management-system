import React, { useState } from 'react';
import { 
  ShieldCheck, Star, MapPin, Clock, CheckCircle2, Phone, 
  DollarSign, Power, AlertCircle, ArrowRight, UserCheck 
} from 'lucide-react';
import { Technician, Booking } from '../types';
import { TechAvatar } from './TechAvatar';

interface TechnicianPortalViewProps {
  technician: Technician;
  activeBooking: Booking | null;
  onUpdateBookingStatus: (booking: Booking) => void;
  onSwitchToCustomer: () => void;
}

export const TechnicianPortalView: React.FC<TechnicianPortalViewProps> = ({
  technician,
  activeBooking,
  onUpdateBookingStatus,
  onSwitchToCustomer,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Top Pro Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <TechAvatar
              seed={technician.avatarSeed}
              name={technician.name}
              size="lg"
              statusBadge={true}
              isAvailable={isOnline}
            />

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{technician.name}</h2>
                <span className="text-xs bg-blue-600 px-2 py-0.5 rounded font-medium">
                  Dispatch Console
                </span>
              </div>
              <p className="text-xs text-slate-300">{technician.businessName}</p>
              <div className="text-xs text-slate-400 mt-1 font-mono-numbers">
                Lic: {technician.licenseNumber} · {technician.rating.toFixed(2)} ⭐ ({technician.totalReviews} reviews)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isOnline
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <Power className="w-4 h-4" />
              <span>{isOnline ? 'Online & Accepting Jobs' : 'Offline (Paused)'}</span>
            </button>

            <button
              onClick={onSwitchToCustomer}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium cursor-pointer"
            >
              Switch to Customer View
            </button>
          </div>
        </div>

        {/* Pro Metrics Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800 text-xs font-mono-numbers">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-slate-400">Today's Earnings</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">$385.00</div>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-slate-400">Response Rate</div>
            <div className="text-lg font-bold text-white mt-0.5">99.4%</div>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-slate-400">Avg Arrival Time</div>
            <div className="text-lg font-bold text-white mt-0.5">18.2 min</div>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-slate-400">Customer Rating</div>
            <div className="text-lg font-bold text-amber-400 mt-0.5">{technician.rating.toFixed(2)} ★</div>
          </div>
        </div>
      </div>

      {/* Active Job Dispatch Panel */}
      {activeBooking ? (
        <div className="bg-white rounded-2xl border border-blue-200 shadow-md p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono-numbers">
                Active Assigned Work Order #{activeBooking.id}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">{activeBooking.issueType}</h3>
              <p className="text-xs text-slate-500">
                Customer: {activeBooking.customerName} · {activeBooking.customerPhone}
              </p>
            </div>

            <div className="text-right font-mono-numbers">
              <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded-md">
                Status: {activeBooking.status.replace('_', ' ')}
              </span>
              <div className="text-sm font-bold text-slate-900 mt-1">
                Total: ${activeBooking.pricing.total.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">Address:</span> {activeBooking.customerAddress}
                {activeBooking.customerUnit && ` (${activeBooking.customerUnit})`}
                {activeBooking.customerGateCode && (
                  <span className="text-blue-700 ml-2 font-mono font-semibold">
                    Gate: {activeBooking.customerGateCode}
                  </span>
                )}
              </div>
            </div>

            <a
              href={`tel:${activeBooking.customerPhone}`}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-medium flex items-center gap-1 shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Customer</span>
            </a>
          </div>

          {/* Technician Action Buttons based on status */}
          <div className="mt-6 flex flex-wrap gap-2">
            {activeBooking.status === 'PENDING_ACCEPTANCE' && (
              <button
                onClick={() =>
                  onUpdateBookingStatus({
                    ...activeBooking,
                    status: 'ACCEPTED',
                    acceptedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  })
                }
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Accept Customer Job
              </button>
            )}

            {activeBooking.status === 'ACCEPTED' && (
              <button
                onClick={() =>
                  onUpdateBookingStatus({
                    ...activeBooking,
                    status: 'EN_ROUTE',
                    enRouteAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  })
                }
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Mark En Route to Customer
              </button>
            )}

            {activeBooking.status === 'EN_ROUTE' && (
              <button
                onClick={() =>
                  onUpdateBookingStatus({
                    ...activeBooking,
                    status: 'ARRIVED',
                    arrivedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  })
                }
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Confirm Arrival on Site
              </button>
            )}

            {(activeBooking.status === 'ARRIVED' || activeBooking.status === 'IN_PROGRESS') && (
              <button
                onClick={() =>
                  onUpdateBookingStatus({
                    ...activeBooking,
                    status: 'COMPLETED',
                    completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    checklist: activeBooking.checklist.map((c) => ({ ...c, completed: true })),
                  })
                }
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Complete Diagnostic & Service (Issue Bill)
              </button>
            )}

            {activeBooking.status === 'COMPLETED' && (
              <div className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>Invoice sent to customer. Awaiting payment authorization...</span>
              </div>
            )}

            {activeBooking.status === 'PAID' && (
              <div className="text-xs text-emerald-700 flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Payment cleared ($ {activeBooking.pricing.total.toFixed(2)} + Tip received). Escrow released.</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-600">
          <UserCheck className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h4 className="font-bold text-slate-900 text-sm">No Active Booking in Queue</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            You are online and transmitting your live location to nearby homeowners searching for HVAC and local repairs.
          </p>
        </div>
      )}
    </div>
  );
};
