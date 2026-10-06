import React from 'react';
import { X, CheckCircle2, Printer, Download, Building, ShieldCheck } from 'lucide-react';
import { MaintenanceBill } from '../../types/community';
import { useCommunity } from '../../context/CommunityContext';

interface Props {
  bill: MaintenanceBill | null;
  onClose: () => void;
}

export const DigitalReceiptModal: React.FC<Props> = ({ bill, onClose }) => {
  const { community } = useCommunity();

  if (!bill) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Receipt Header Bar */}
        <div className="bg-emerald-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Building className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">{community.name}</h3>
              <p className="text-xs text-emerald-200">Official Society Maintenance Receipt</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Receipt Content */}
        <div className="p-6 space-y-5 text-slate-800 printable-area">
          {/* Status Badge & Receipt Number */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>PAYMENT CONFIRMED</span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Receipt #{bill.receiptNumber || 'RCPT-GP-2026-10-402'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">Date Paid</div>
              <div className="text-xs font-semibold text-slate-800 font-mono">
                {bill.paidAt || 'Just now'}
              </div>
            </div>
          </div>

          {/* Unit & Payer Details */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <div>
              <span className="text-slate-500">Flat / Unit:</span>
              <div className="font-bold text-slate-900 mt-0.5 font-mono text-sm">{bill.flatNumber} (Block A)</div>
            </div>
            <div>
              <span className="text-slate-500">Billing Month:</span>
              <div className="font-bold text-slate-900 mt-0.5">{bill.month}</div>
            </div>
            <div>
              <span className="text-slate-500">Transaction ID:</span>
              <div className="font-mono text-slate-700 mt-0.5 truncate">{bill.transactionId || 'TXN-HDFC-99124'}</div>
            </div>
            <div>
              <span className="text-slate-500">Payment Mode:</span>
              <div className="font-medium text-slate-700 mt-0.5">{bill.paymentMethod || 'UPI Checkout'}</div>
            </div>
          </div>

          {/* Line Item Breakdown */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Itemized Breakdown</h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600 py-1 border-b border-slate-100">
                <span>Security & Gate Guarding</span>
                <span className="font-mono tabular-nums font-medium">₹{bill.breakdown.security}</span>
              </div>
              <div className="flex justify-between text-slate-600 py-1 border-b border-slate-100">
                <span>Common Housekeeping & Waste Clearance</span>
                <span className="font-mono tabular-nums font-medium">₹{bill.breakdown.cleaning}</span>
              </div>
              <div className="flex justify-between text-slate-600 py-1 border-b border-slate-100">
                <span>Water Supply & Reverse Osmosis STP</span>
                <span className="font-mono tabular-nums font-medium">₹{bill.breakdown.water}</span>
              </div>
              <div className="flex justify-between text-slate-600 py-1 border-b border-slate-100">
                <span>Common Area Power & Generator Fuel</span>
                <span className="font-mono tabular-nums font-medium">₹{bill.breakdown.commonElectricity}</span>
              </div>
              <div className="flex justify-between text-slate-600 py-1 border-b border-slate-100">
                <span>Otis Elevator AMC & Safety Inspection</span>
                <span className="font-mono tabular-nums font-medium">₹{bill.breakdown.liftAMC}</span>
              </div>
              <div className="flex justify-between text-slate-600 py-1 border-b border-slate-100">
                <span>Society Reserve Sinking Fund</span>
                <span className="font-mono tabular-nums font-medium">₹{bill.breakdown.sinkingFund}</span>
              </div>
              {bill.breakdown.penalty > 0 && (
                <div className="flex justify-between text-amber-600 py-1 border-b border-slate-100 font-medium">
                  <span>Late Fee Penalty</span>
                  <span className="font-mono tabular-nums font-medium">+₹{bill.breakdown.penalty}</span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-3 text-sm font-bold text-slate-900 border-t-2 border-slate-800 mt-2">
              <span>Total Amount Paid</span>
              <span className="font-mono text-base text-emerald-700">₹{bill.amount.toLocaleString()}</span>
            </div>
          </div>

          {/* Verification Stamp */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs text-emerald-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="font-bold">Digitally Certified & Audited</div>
                <div className="text-[11px] text-emerald-700">Registered with TN Apartment Ownership Act</div>
              </div>
            </div>
            <div className="text-right text-[11px] font-mono text-emerald-600">
              SECRETARY APPROVED
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg transition"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
