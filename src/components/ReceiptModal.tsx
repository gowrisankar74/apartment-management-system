import React from 'react';
import { X, Printer, ShieldCheck, CheckCircle2, Download, FileText } from 'lucide-react';
import { Booking } from '../types';

interface ReceiptModalProps {
  booking: Booking;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ booking, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const payment = booking.paymentInfo;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-base font-bold text-white">Official Service Receipt</h2>
              <div className="text-xs text-slate-400 font-mono-numbers">
                Invoice #{booking.id} · Paid
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title="Print Receipt"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close receipt"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Status Badge Banner */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Payment Completed & Escrow Cleared</span>
            </div>
            <span className="text-xs font-mono-numbers text-emerald-800">
              {payment?.paidAt || 'Today'}
            </span>
          </div>

          {/* Meta Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                Customer Details
              </div>
              <div className="font-bold text-slate-900 mt-0.5">{booking.customerName}</div>
              <div className="text-slate-600">{booking.customerAddress}</div>
              <div className="text-slate-600 font-mono-numbers">{booking.customerPhone}</div>
            </div>

            <div>
              <div className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                Certified Service Provider
              </div>
              <div className="font-bold text-slate-900 mt-0.5">{booking.technicianName}</div>
              <div className="text-slate-600">{booking.technicianBusiness}</div>
              <div className="text-slate-600 font-mono-numbers">{booking.technicianPhone}</div>
            </div>
          </div>

          {/* Service Details */}
          <div className="pt-2 border-t border-slate-200">
            <div className="text-slate-400 uppercase tracking-wider text-[10px] font-bold mb-1">
              Service Provided
            </div>
            <div className="text-xs font-bold text-slate-900">{booking.categoryName}</div>
            <div className="text-xs text-slate-600 mt-0.5">{booking.issueType}</div>
          </div>

          {/* Itemized Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 text-[11px] font-bold text-slate-600 flex justify-between uppercase">
              <span>Item Description</span>
              <span>Amount</span>
            </div>

            <div className="p-4 space-y-2 text-xs font-mono-numbers">
              <div className="flex justify-between text-slate-700">
                <span>Diagnostic & System Load Check</span>
                <span>${booking.pricing.diagnosticFee}.00</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Diagnostic Waiver Credit</span>
                <span>-${booking.pricing.diagnosticFee}.00</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>HVAC Field Labor</span>
                <span>${booking.pricing.repairLabor}.00</span>
              </div>
              {booking.pricing.partsUsed.map((part, i) => (
                <div key={i} className="flex justify-between text-slate-700">
                  <span>{part.name}</span>
                  <span>${part.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-slate-700">
                <span>Sales Tax (State / Local)</span>
                <span>${booking.pricing.tax.toFixed(2)}</span>
              </div>

              {payment && payment.tipAmount > 0 && (
                <div className="flex justify-between text-blue-700 font-medium pt-1 border-t border-slate-200">
                  <span>Technician Tip</span>
                  <span>+${payment.tipAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between pt-2 border-t-2 border-slate-900 text-sm font-bold text-slate-900">
                <span>Total Paid:</span>
                <span>${(payment?.totalPaid || booking.pricing.total).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Transaction Details */}
          <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 font-mono-numbers">
            <div className="flex justify-between py-0.5">
              <span>Payment Method:</span>
              <span className="font-semibold text-slate-900 uppercase">
                {payment?.method || 'Credit Card'} · Ending {payment?.cardLast4 || '4242'}
              </span>
            </div>
            <div className="flex justify-between py-0.5">
              <span>Transaction Ref:</span>
              <span className="font-semibold text-slate-900">
                {payment?.transactionId || 'TXN-9492104'}
              </span>
            </div>
            <div className="flex justify-between py-0.5">
              <span>Escrow Security:</span>
              <span className="text-emerald-700 font-semibold">256-bit TLS Verified</span>
            </div>
          </div>

          {/* 90-Day Warranty Seal */}
          <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-blue-700 shrink-0" />
            <div className="text-xs text-blue-950">
              <span className="font-bold">90-Day FixPulse Guarantee Active:</span>
              <div className="text-[11px] text-slate-600 mt-0.5">
                All parts and technician labor for this repair are covered through December 2026.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF / Print</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
