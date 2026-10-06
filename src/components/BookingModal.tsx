import React, { useState } from 'react';
import { 
  X, ShieldCheck, Clock, MapPin, AlertCircle, 
  Check, ArrowRight, Wrench, Calendar, Zap 
} from 'lucide-react';
import { Technician, ServiceCategory, Booking } from '../types';
import { TechAvatar } from './TechAvatar';

interface BookingModalProps {
  technician: Technician;
  category: ServiceCategory;
  userLocation: { address: string; neighborhood: string; city: string; zip: string; name: string; phone: string };
  onClose: () => void;
  onConfirmBooking: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  technician,
  category,
  userLocation,
  onClose,
  onConfirmBooking,
}) => {
  const [selectedIssue, setSelectedIssue] = useState<string>(category.commonIssues[0] || 'System diagnostic');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [urgency, setUrgency] = useState<'immediate' | 'scheduled'>('immediate');
  const [scheduledWindow, setScheduledWindow] = useState<string>('Today: 2:00 PM – 4:00 PM');
  
  // Location inputs
  const [address, setAddress] = useState<string>(userLocation.address);
  const [unit, setUnit] = useState<string>('Apt 4B');
  const [gateCode, setGateCode] = useState<string>('#4921');
  const [phone, setPhone] = useState<string>(userLocation.phone);
  const [customerName, setCustomerName] = useState<string>(userLocation.name);

  // Error feedback
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim() || !phone.trim() || !customerName.trim()) {
      setError('Please provide address, name, and contact phone.');
      return;
    }

    const now = new Date();
    const newBooking: Booking = {
      id: `FP-${Math.floor(100000 + Math.random() * 900000)}`,
      technicianId: technician.id,
      technicianName: technician.name,
      technicianBusiness: technician.businessName,
      technicianAvatarSeed: technician.avatarSeed,
      technicianPhone: technician.phone,
      category: category.id,
      categoryName: category.name,
      issueType: selectedIssue,
      issueDescription: customNotes.trim() ? customNotes.trim() : selectedIssue,
      urgency,
      scheduledTimeWindow: urgency === 'scheduled' ? scheduledWindow : undefined,
      customerName,
      customerPhone: phone,
      customerAddress: `${address}, ${userLocation.city}`,
      customerUnit: unit,
      customerGateCode: gateCode,
      status: 'PENDING_ACCEPTANCE',
      createdAt: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      checklist: [
        {
          id: 'step-1',
          label: 'System Diagnostic & Inspection',
          description: 'Multimeter load test, refrigerant pressure gauges & airflow check',
          completed: false,
        },
        {
          id: 'step-2',
          label: 'Customer Work Order Authorization',
          description: 'Review diagnosis & transparent part estimate before repair',
          completed: false,
        },
        {
          id: 'step-3',
          label: 'Part Replacement & Component Service',
          description: 'Install OEM dual-run capacitor & clear condensate trap',
          completed: false,
        },
        {
          id: 'step-4',
          label: 'System Run Test & Delta-T Temperature Drop',
          description: 'Verify 18-20° delta across return and supply air registers',
          completed: false,
        },
      ],
      pricing: {
        diagnosticFee: technician.diagnosticFee,
        diagnosticWaived: true, // Waived upon completion of repair
        repairLabor: technician.hourlyRate,
        partsUsed: [
          { name: '45+5 MFD 440V Round Dual-Run OEM Capacitor', price: 65 },
          { name: 'Condensate Line Nitrogen Flush & Biocide Tablet', price: 20 },
        ],
        tax: 9.49,
        subtotal: technician.hourlyRate + 85,
        total: technician.hourlyRate + 85 + 9.49,
      },
      technicianCurrentLocation: {
        x: technician.mapCoordinates.x,
        y: technician.mapCoordinates.y,
      },
    };

    onConfirmBooking(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TechAvatar
              seed={technician.avatarSeed}
              name={technician.name}
              size="md"
              isAvailable={true}
            />
            <div>
              <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                Direct Booking Request
              </div>
              <h2 className="text-base font-bold text-white">
                Dispatch {technician.name}
              </h2>
              <div className="text-xs text-slate-400 font-mono-numbers">
                {technician.businessName} · ~{technician.etaMinutes} min arrival
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Booking Form Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. Issue Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              1. What issue are you experiencing?
            </label>
            <div className="space-y-1.5">
              {category.commonIssues.map((issue, idx) => (
                <label
                  key={idx}
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                    selectedIssue === issue
                      ? 'bg-blue-50/80 border-blue-500 font-semibold text-blue-950'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="issue"
                    value={issue}
                    checked={selectedIssue === issue}
                    onChange={() => setSelectedIssue(issue)}
                    className="accent-blue-600 w-3.5 h-3.5"
                  />
                  <span>{issue}</span>
                </label>
              ))}
            </div>

            <div className="mt-2.5">
              <textarea
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Optional: Any specific symptoms (e.g., unit making grinding noise, started 2 hours ago, brand name)?"
                rows={2}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* 2. Dispatch Speed */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              2. When do you need this?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setUrgency('immediate')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  urgency === 'immediate'
                    ? 'bg-blue-50/80 border-blue-500 ring-1 ring-blue-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-blue-950">
                  <Zap className="w-3.5 h-3.5 text-blue-600" />
                  <span>Immediate Dispatch</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-1 font-mono-numbers">
                  Arrives in ~{technician.etaMinutes} mins
                </div>
              </button>

              <button
                type="button"
                onClick={() => setUrgency('scheduled')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  urgency === 'scheduled'
                    ? 'bg-blue-50/80 border-blue-500 ring-1 ring-blue-500/20'
                    : 'bg-slate-50 border-slate-200 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                  <Calendar className="w-3.5 h-3.5 text-slate-600" />
                  <span>Schedule Window</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Pick a preferred arrival slot
                </div>
              </button>
            </div>

            {urgency === 'scheduled' && (
              <div className="mt-2.5">
                <select
                  value={scheduledWindow}
                  onChange={(e) => setScheduledWindow(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
                >
                  <option value="Today: 2:00 PM – 4:00 PM">Today: 2:00 PM – 4:00 PM</option>
                  <option value="Today: 5:00 PM – 7:00 PM">Today: 5:00 PM – 7:00 PM</option>
                  <option value="Tomorrow: 8:00 AM – 10:00 AM">Tomorrow: 8:00 AM – 10:00 AM</option>
                  <option value="Tomorrow: 1:00 PM – 3:00 PM">Tomorrow: 1:00 PM – 3:00 PM</option>
                </select>
              </div>
            )}
          </div>

          {/* 3. Address & Access */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              3. Service Location & Access
            </label>
            <div className="space-y-2">
              <div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street Address"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="Apt / Suite / Unit #"
                  className="text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                />
                <input
                  type="text"
                  value={gateCode}
                  onChange={(e) => setGateCode(e.target.value)}
                  placeholder="Gate / Callbox Code"
                  className="text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your Full Name"
                  className="text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contact Phone Number"
                  className="text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900 font-mono-numbers"
                />
              </div>
            </div>
          </div>

          {/* 4. Escrow & Transparent Pricing Guarantee */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center justify-between text-slate-700 font-medium">
              <span>Diagnostic Hold Authorization:</span>
              <span className="font-bold text-slate-900 font-mono-numbers">${technician.diagnosticFee}.00</span>
            </div>
            <div className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Diagnostic fee is 100% credited toward repair labor upon work approval.</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500">
              No money is transferred until the technician finishes work and you authorize payment.
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm & Dispatch {technician.name.split(' ')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              Free cancellation prior to technician dispatch arrival
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
