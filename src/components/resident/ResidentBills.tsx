import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ShieldCheck, 
  ChevronRight, 
  Receipt,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';
import { MaintenanceBill } from '../../types/community';

export const ResidentBills: React.FC = () => {
  const { bills, payBill, setViewingReceipt, t, residentUser, language } = useCommunity();
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const currentBill = bills.find(b => b.flatNumber === residentUser.flatNumber && b.status !== 'Paid') || bills[0];
  const pastBills = bills.filter(b => b.id !== currentBill.id);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      payBill(currentBill.id, selectedMethod === 'upi' ? 'UPI / Google Pay' : selectedMethod === 'card' ? 'HDFC Credit Card' : 'Net Banking');
      setIsProcessing(false);
    }, 700);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Title */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          {t('billingTitle')}
        </h2>
        <p className="text-xs text-slate-500">
          {language === 'ta' ? 'அனைத்து சங்க மாதாந்திர கட்டண விவரங்கள்' : 'Itemized society dues & automated digital collection'}
        </p>
      </div>

      {/* Active Monthly Bill Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
              {currentBill.month} Bill
            </span>
            <h3 className="text-lg font-extrabold font-mono tabular-nums mt-0.5">
              ₹{currentBill.amount.toLocaleString()}
            </h3>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            currentBill.status === 'Paid'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : currentBill.status === 'Overdue'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
          }`}>
            {currentBill.status}
          </span>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
            <span>Due Date:</span>
            <span className="font-semibold text-slate-800">{currentBill.dueDate}</span>
          </div>

          {/* Breakdown */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {t('billDetails')}
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>{t('securityFee')}</span>
                <span className="font-mono tabular-nums font-medium">₹{currentBill.breakdown.security}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t('cleaningFee')}</span>
                <span className="font-mono tabular-nums font-medium">₹{currentBill.breakdown.cleaning}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t('waterFee')}</span>
                <span className="font-mono tabular-nums font-medium">₹{currentBill.breakdown.water}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t('commonPowerFee')}</span>
                <span className="font-mono tabular-nums font-medium">₹{currentBill.breakdown.commonElectricity}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t('liftAMCFee')}</span>
                <span className="font-mono tabular-nums font-medium">₹{currentBill.breakdown.liftAMC}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t('sinkingFundFee')}</span>
                <span className="font-mono tabular-nums font-medium">₹{currentBill.breakdown.sinkingFund}</span>
              </div>
              {currentBill.breakdown.penalty > 0 && (
                <div className="flex justify-between text-rose-600 font-medium">
                  <span>{t('penalties')}</span>
                  <span className="font-mono tabular-nums font-medium">+₹{currentBill.breakdown.penalty}</span>
                </div>
              )}
            </div>
          </div>

          {/* If already paid */}
          {currentBill.status === 'Paid' ? (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs text-emerald-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Paid via {currentBill.paymentMethod}</span>
              </div>
              <button
                onClick={() => setViewingReceipt(currentBill)}
                className="font-bold underline text-emerald-700 hover:text-emerald-900"
              >
                View Receipt
              </button>
            </div>
          ) : (
            /* Payment Selector & CTA */
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Select Payment Method:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedMethod('upi')}
                  className={`p-2 rounded-xl text-xs font-semibold border text-center transition ${
                    selectedMethod === 'upi'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-400'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 mx-auto mb-1 text-emerald-600" />
                  UPI / GPay
                </button>
                <button
                  onClick={() => setSelectedMethod('card')}
                  className={`p-2 rounded-xl text-xs font-semibold border text-center transition ${
                    selectedMethod === 'card'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-400'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5 mx-auto mb-1 text-blue-600" />
                  Card
                </button>
                <button
                  onClick={() => setSelectedMethod('netbanking')}
                  className={`p-2 rounded-xl text-xs font-semibold border text-center transition ${
                    selectedMethod === 'netbanking'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-400'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 mx-auto mb-1 text-purple-600" />
                  NetBanking
                </button>
              </div>

              <button
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wide shadow-md shadow-emerald-600/20 active:scale-[0.98] transition flex items-center justify-center gap-1.5"
              >
                {isProcessing ? (
                  <span>Processing Test Payment...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Pay ₹{currentBill.amount.toLocaleString()} Now</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Payment History */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          {t('paymentHistory')}
        </h3>
        <div className="space-y-2">
          {pastBills.map(b => (
            <div
              key={b.id}
              onClick={() => setViewingReceipt(b)}
              className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between cursor-pointer hover:border-slate-300 transition"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{b.month} Maintenance</div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {b.paidAt || 'Paid on time'} · {b.receiptNumber || 'RCPT-GP-0402'}
                  </div>
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                <div>
                  <div className="text-xs font-bold text-slate-900 font-mono">₹{b.amount}</div>
                  <span className="text-[10px] text-emerald-600 font-medium font-mono">Paid</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
