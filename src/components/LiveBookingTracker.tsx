import React, { useState, useEffect } from 'react';
import { 
  Phone, MessageSquare, ShieldCheck, Clock, MapPin, 
  CheckCircle2, AlertCircle, ChevronRight, Play, FastForward, 
  CreditCard, Star, FileText, Check, Navigation, Sparkles, X
} from 'lucide-react';
import { Booking, BookingStatus, Technician } from '../types';
import { TechAvatar } from './TechAvatar';

interface LiveBookingTrackerProps {
  booking: Booking;
  technician: Technician;
  onUpdateBooking: (updated: Booking) => void;
  onOpenPayment: () => void;
  onOpenRating: () => void;
  onOpenReceipt: () => void;
  onCloseTracker: () => void;
}

export const LiveBookingTracker: React.FC<LiveBookingTrackerProps> = ({
  booking,
  technician,
  onUpdateBooking,
  onOpenPayment,
  onOpenRating,
  onOpenReceipt,
  onCloseTracker,
}) => {
  const [activeTab, setActiveTab] = useState<'status' | 'chat' | 'breakdown'>('status');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'tech' | 'user'; text: string; time: string }>>([
    {
      sender: 'tech',
      text: `Hello ${booking.customerName}! I'm packing up the diagnostic gauges and OEM capacitors. Heading your way shortly!`,
      time: 'Just now',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [etaRemaining, setEtaRemaining] = useState<number>(technician.etaMinutes);
  const [autoSimulate, setAutoSimulate] = useState<boolean>(true);

  // Auto progression simulation timers
  useEffect(() => {
    if (!autoSimulate) return;

    let timer: NodeJS.Timeout;

    if (booking.status === 'PENDING_ACCEPTANCE') {
      // Tech accepts in 3 seconds
      timer = setTimeout(() => {
        const updated: Booking = {
          ...booking,
          status: 'ACCEPTED',
          acceptedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        onUpdateBooking(updated);
      }, 3000);
    } else if (booking.status === 'ACCEPTED') {
      // En route in 4 seconds
      timer = setTimeout(() => {
        const updated: Booking = {
          ...booking,
          status: 'EN_ROUTE',
          enRouteAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        onUpdateBooking(updated);
      }, 4000);
    } else if (booking.status === 'EN_ROUTE') {
      // Countdown ETA and simulate arrival in 8 seconds
      timer = setTimeout(() => {
        const updated: Booking = {
          ...booking,
          status: 'ARRIVED',
          arrivedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        onUpdateBooking(updated);
      }, 8000);
    }

    return () => clearTimeout(timer);
  }, [booking.status, autoSimulate]);

  // Handle step completion manually or automatically
  const handleToggleChecklist = (stepId: string) => {
    const updatedChecklist = booking.checklist.map((step) =>
      step.id === stepId ? { ...step, completed: !step.completed } : step
    );
    const allDone = updatedChecklist.every((s) => s.completed);

    const updated: Booking = {
      ...booking,
      checklist: updatedChecklist,
      status: allDone ? 'COMPLETED' : 'IN_PROGRESS',
      completedAt: allDone
        ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : booking.completedAt,
    };
    onUpdateBooking(updated);
  };

  // Fast forward simulation actions for instant testing
  const fastForwardTo = (status: BookingStatus) => {
    let updated: Booking = { ...booking, status };
    if (status === 'ACCEPTED') {
      updated.acceptedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (status === 'EN_ROUTE') {
      updated.enRouteAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (status === 'ARRIVED') {
      updated.arrivedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      updated.status = 'ARRIVED';
    }
    if (status === 'IN_PROGRESS') {
      updated.checklist = booking.checklist.map((c, i) =>
        i < 2 ? { ...c, completed: true } : c
      );
    }
    if (status === 'COMPLETED') {
      updated.checklist = booking.checklist.map((c) => ({ ...c, completed: true }));
      updated.completedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    onUpdateBooking(updated);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: chatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    // Simulated tech response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'tech',
          text: `Got it! I am right around the corner. Look for the white FixPulse HVAC service truck.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  // State text and styling
  const getStatusBadge = () => {
    switch (booking.status) {
      case 'PENDING_ACCEPTANCE':
        return {
          title: 'Request Sent to Technician',
          subtitle: `${technician.name} is reviewing job details...`,
          color: 'bg-amber-500',
        };
      case 'ACCEPTED':
        return {
          title: 'Booking Confirmed!',
          subtitle: `${technician.name} accepted and is preparing tools.`,
          color: 'bg-blue-600',
        };
      case 'EN_ROUTE':
        return {
          title: 'Technician En Route',
          subtitle: `Driving to ${booking.customerAddress} · ETA ~${etaRemaining} min`,
          color: 'bg-indigo-600',
        };
      case 'ARRIVED':
        return {
          title: 'Technician On Site',
          subtitle: `${technician.name} has arrived at your address.`,
          color: 'bg-emerald-600',
        };
      case 'IN_PROGRESS':
        return {
          title: 'Repair In Progress',
          subtitle: 'Active system diagnosis, coil test & capacitor repair.',
          color: 'bg-blue-600',
        };
      case 'COMPLETED':
        return {
          title: 'Service Completed & Tested!',
          subtitle: 'Repair finished with verified temperature drop. Ready for payment.',
          color: 'bg-emerald-600',
        };
      case 'PAID':
        return {
          title: 'Payment Confirmed',
          subtitle: 'Transaction cleared. 90-day warranty active.',
          color: 'bg-emerald-700',
        };
      case 'RATED':
        return {
          title: 'Service Completed & Reviewed',
          subtitle: 'Thank you for your feedback!',
          color: 'bg-slate-900',
        };
      default:
        return { title: 'Active Booking', subtitle: '', color: 'bg-blue-600' };
    }
  };

  const statusInfo = getStatusBadge();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden text-slate-900">
      {/* Simulation Controls Banner for quick interactive testing */}
      <div className="bg-slate-900 text-white px-4 py-2.5 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-cyan-200">Interactive Dispatch Simulator:</span>
          <span className="text-slate-400">Step through live states or let auto-run</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setAutoSimulate(!autoSimulate)}
            className={`px-2.5 py-1 rounded text-[11px] font-medium border cursor-pointer ${
              autoSimulate
                ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            {autoSimulate ? '● Auto-Simulation ON' : '○ Auto-Simulation OFF'}
          </button>

          <span className="text-slate-700">|</span>

          {booking.status === 'PENDING_ACCEPTANCE' && (
            <button
              onClick={() => fastForwardTo('ACCEPTED')}
              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-semibold cursor-pointer"
            >
              Simulate: Accept
            </button>
          )}

          {booking.status === 'ACCEPTED' && (
            <button
              onClick={() => fastForwardTo('EN_ROUTE')}
              className="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-semibold cursor-pointer"
            >
              Simulate: En Route
            </button>
          )}

          {booking.status === 'EN_ROUTE' && (
            <button
              onClick={() => fastForwardTo('ARRIVED')}
              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold cursor-pointer"
            >
              Simulate: Arrived
            </button>
          )}

          {(booking.status === 'ARRIVED' || booking.status === 'IN_PROGRESS') && (
            <button
              onClick={() => fastForwardTo('COMPLETED')}
              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold cursor-pointer"
            >
              Simulate: Finish Repair
            </button>
          )}

          {booking.status === 'COMPLETED' && (
            <button
              onClick={onOpenPayment}
              className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded text-[11px] font-bold cursor-pointer"
            >
              Proceed to Secure Payment
            </button>
          )}

          {booking.status === 'PAID' && (
            <button
              onClick={onOpenRating}
              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-[11px] font-bold cursor-pointer"
            >
              Proceed to Rating
            </button>
          )}
        </div>
      </div>

      {/* Main Header with Booking ID and Close */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono-numbers">
              Booking #{booking.id}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500">{booking.categoryName}</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-0.5">{booking.issueType}</h2>
        </div>

        <button
          onClick={onCloseTracker}
          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
          title="Minimize Tracker"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Status Hero Card */}
      <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-950 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <TechAvatar
              seed={technician.avatarSeed}
              name={technician.name}
              size="lg"
              statusBadge={true}
              isAvailable={true}
            />

            <div>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${statusInfo.color} animate-ping`}></span>
                <span className="text-xs uppercase tracking-wider font-bold text-cyan-300">
                  {booking.status.replace('_', ' ')}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-0.5">{statusInfo.title}</h3>
              <p className="text-xs text-slate-300 mt-0.5">{statusInfo.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${technician.phone}`}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call Tech</span>
            </a>
            <button
              onClick={() => setActiveTab('chat')}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Chat</span>
            </button>
          </div>
        </div>

        {/* Live Step Progression Pipeline */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {/* Step 1: Request & Acceptance */}
            <div
              className={`p-2 rounded-lg ${
                ['ACCEPTED', 'EN_ROUTE', 'ARRIVED', 'IN_PROGRESS', 'COMPLETED', 'PAID', 'RATED'].includes(
                  booking.status
                )
                  ? 'bg-blue-900/60 text-blue-200 border border-blue-500/30'
                  : 'bg-slate-800/60 text-slate-400'
              }`}
            >
              <div className="font-bold">1. Accepted</div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {booking.acceptedAt || 'In review'}
              </div>
            </div>

            {/* Step 2: En Route / Arrived */}
            <div
              className={`p-2 rounded-lg ${
                ['EN_ROUTE', 'ARRIVED', 'IN_PROGRESS', 'COMPLETED', 'PAID', 'RATED'].includes(booking.status)
                  ? 'bg-blue-900/60 text-blue-200 border border-blue-500/30'
                  : 'bg-slate-800/60 text-slate-400'
              }`}
            >
              <div className="font-bold">2. En Route</div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {booking.arrivedAt ? 'Arrived' : '~18m ETA'}
              </div>
            </div>

            {/* Step 3: Repairing & Checklist */}
            <div
              className={`p-2 rounded-lg ${
                ['IN_PROGRESS', 'COMPLETED', 'PAID', 'RATED'].includes(booking.status)
                  ? 'bg-blue-900/60 text-blue-200 border border-blue-500/30'
                  : 'bg-slate-800/60 text-slate-400'
              }`}
            >
              <div className="font-bold">3. Service In Progress</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Diagnostics & Fix</div>
            </div>

            {/* Step 4: Payment & Warranty */}
            <div
              className={`p-2 rounded-lg ${
                ['COMPLETED', 'PAID', 'RATED'].includes(booking.status)
                  ? 'bg-emerald-950/80 text-emerald-200 border border-emerald-500/40'
                  : 'bg-slate-800/60 text-slate-400'
              }`}
            >
              <div className="font-bold">4. Checkout & Rating</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">
                {booking.status === 'PAID' || booking.status === 'RATED' ? 'Paid & Protected' : 'Ready'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50 px-6">
        <button
          onClick={() => setActiveTab('status')}
          className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
            activeTab === 'status'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Live Status & Work Order
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-colors flex items-center gap-1.5 ${
            activeTab === 'chat'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Direct Dispatch Chat</span>
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
        </button>
        <button
          onClick={() => setActiveTab('breakdown')}
          className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
            activeTab === 'breakdown'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Pricing Breakdown & Guarantee
        </button>
      </div>

      {/* Tab 1: Live Status & Work Order Checklist */}
      {activeTab === 'status' && (
        <div className="p-6 space-y-6">
          {/* Live Simulated Map if en route */}
          {booking.status === 'EN_ROUTE' && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-white relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 rotate-45 text-cyan-400" />
                  Live GPS En Route Tracking
                </span>
                <span className="text-xs font-mono-numbers text-slate-400">Austin Downtown Route</span>
              </div>
              <div className="h-28 bg-slate-900 rounded-lg relative flex items-center justify-between px-8 border border-slate-800">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                    VAN
                  </div>
                  <span className="text-[10px] text-slate-300 mt-1">Marcus</span>
                </div>

                {/* Animated dash line */}
                <div className="flex-1 mx-4 h-0.5 border-t-2 border-dashed border-cyan-400/60 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-slate-950 px-2 text-[10px] text-cyan-300 font-mono-numbers">
                    0.8 mi away (~{etaRemaining}m)
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shadow-md">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-slate-300 mt-1">Your Home</span>
                </div>
              </div>
            </div>
          )}

          {/* Service Checklist & Progress */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Technician Service Checklist
                </h4>
                <p className="text-xs text-slate-600">
                  Real-time inspection and repair milestones verified on-site
                </p>
              </div>

              {booking.status !== 'COMPLETED' && booking.status !== 'PAID' && (
                <button
                  onClick={() => fastForwardTo('COMPLETED')}
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer underline"
                >
                  Mark All Complete
                </button>
              )}
            </div>

            <div className="space-y-2.5">
              {booking.checklist.map((step) => (
                <div
                  key={step.id}
                  onClick={() => handleToggleChecklist(step.id)}
                  className={`p-3.5 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                    step.completed
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                      step.completed
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${step.completed ? 'text-emerald-950 line-through' : 'text-slate-900'}`}>
                        {step.label}
                      </span>
                      {step.completed && (
                        <span className="text-[10px] text-emerald-700 font-semibold">Verified</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Action Prompts */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-slate-700">Service Location</div>
              <div className="text-sm font-bold text-slate-900">
                {booking.customerAddress} {booking.customerUnit ? `(${booking.customerUnit})` : ''}
              </div>
              <div className="text-xs text-slate-500">Contact: {booking.customerPhone}</div>
            </div>

            <div className="flex items-center gap-2">
              {booking.status === 'COMPLETED' && (
                <button
                  onClick={onOpenPayment}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer animate-pulse"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Proceed to Payment (${booking.pricing.total.toFixed(2)})</span>
                </button>
              )}

              {booking.status === 'PAID' && (
                <div className="flex gap-2">
                  <button
                    onClick={onOpenReceipt}
                    className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:text-slate-900 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Receipt</span>
                  </button>
                  <button
                    onClick={onOpenRating}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Star className="w-3.5 h-3.5 fill-white" />
                    <span>Rate Technician</span>
                  </button>
                </div>
              )}

              {booking.status === 'RATED' && (
                <button
                  onClick={onOpenReceipt}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Invoice & Warranty Certificate</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Direct Chat */}
      {activeTab === 'chat' && (
        <div className="p-6">
          <div className="h-64 overflow-y-auto space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-xs sm:max-w-md p-3 rounded-xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 font-mono-numbers">
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="mt-3 flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={`Message ${technician.name}...`}
              className="flex-1 text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Pricing Breakdown & Guarantee */}
      {activeTab === 'breakdown' && (
        <div className="p-6 space-y-4">
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/70">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
              Itemized Work Order Estimate
            </h4>

            <div className="space-y-2 text-xs font-mono-numbers">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-600">Initial Diagnostic & System Inspection</span>
                <span className="text-slate-800 font-semibold">${booking.pricing.diagnosticFee}.00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60 text-emerald-700">
                <span>Diagnostic Fee Waiver (Credited against labor)</span>
                <span>-${booking.pricing.diagnosticFee}.00</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-600">HVAC Field Labor & Coil Service</span>
                <span className="text-slate-800 font-semibold">${booking.pricing.repairLabor}.00</span>
              </div>
              {booking.pricing.partsUsed.map((part, i) => (
                <div key={i} className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-600">{part.name}</span>
                  <span className="text-slate-800 font-semibold">${part.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-600">State / Local Municipal Sales Tax</span>
                <span className="text-slate-800 font-semibold">${booking.pricing.tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between pt-2 text-sm font-bold text-slate-900">
                <span>Total Authorized Amount:</span>
                <span>${booking.pricing.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-950">
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              FixPulse 100% Satisfaction & 90-Day Parts Guarantee
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              All installed OEM parts and technician labor are backed by our 90-day guarantee. If your AC system experiences the same issue within 90 days, technician return visit and re-servicing is completely free.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
