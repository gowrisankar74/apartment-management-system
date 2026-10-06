import React, { useState } from 'react';
import { 
  X, Lock, ShieldCheck, CreditCard, Check, AlertCircle, 
  ArrowRight, Sparkles, Building, Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Booking, PaymentInfo } from '../types';

interface PaymentDrawerProps {
  booking: Booking;
  onClose: () => void;
  onPaymentSuccess: (paymentInfo: PaymentInfo) => void;
}

export const PaymentDrawer: React.FC<PaymentDrawerProps> = ({
  booking,
  onClose,
  onPaymentSuccess,
}) => {
  const [method, setMethod] = useState<'card' | 'apple_pay' | 'google_pay' | 'cash'>('card');
  const [tipOption, setTipOption] = useState<number>(15);
  const [customTip, setCustomTip] = useState<string>('');
  
  // Card form state
  const [cardNumber, setCardNumber] = useState<string>('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvv, setCardCvv] = useState<string>('842');
  const [cardZip, setCardZip] = useState<string>('78701');
  const [cardHolder, setCardHolder] = useState<string>(booking.customerName || 'Alex Morgan');

  // Processing state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStage, setProcessingStage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const calculatedTip = tipOption === -1 ? (parseFloat(customTip) || 0) : tipOption;
  const grandTotal = booking.pricing.total + calculatedTip;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2, 4)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (method === 'card') {
      const cleanNum = cardNumber.replace(/\s/g, '');
      if (cleanNum.length < 15) {
        setError('Please enter a valid 16-digit card number.');
        return;
      }
      if (!cardExpiry.includes('/') || cardCvv.length < 3) {
        setError('Please enter valid expiration date and CVV.');
        return;
      }
    }

    setIsProcessing(true);
    setProcessingStage('Encrypting payment token via 256-bit TLS...');

    setTimeout(() => {
      setProcessingStage('Authorizing with issuing bank...');
    }, 1000);

    setTimeout(() => {
      setProcessingStage('Clearing escrow & generating receipt...');
    }, 2000);

    setTimeout(() => {
      setIsProcessing(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (err) {
        // Fallback gracefully
      }

      const paymentInfo: PaymentInfo = {
        method,
        cardLast4: method === 'card' ? cardNumber.slice(-4) : '4242',
        cardBrand: 'Visa',
        transactionId: `TXN-${Date.now().toString(36).toUpperCase()}`,
        amount: booking.pricing.total,
        tipAmount: calculatedTip,
        totalPaid: grandTotal,
        paidAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'succeeded',
      };

      onPaymentSuccess(paymentInfo);
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              <span>FixPulse Secure Checkout</span>
            </div>
            <h2 className="text-base font-bold text-white mt-0.5">
              Service Completion & Payment
            </h2>
            <div className="text-xs text-slate-400 font-mono-numbers">
              {booking.categoryName} · {booking.technicianName}
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-50"
            aria-label="Close payment"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePay} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Itemized Invoice Box */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
              Itemized Invoice Summary
            </h4>

            <div className="space-y-2 text-xs font-mono-numbers">
              <div className="flex justify-between text-slate-600">
                <span>Diagnostic & Field Inspection</span>
                <span>${booking.pricing.diagnosticFee}.00</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Diagnostic Credit (Work completed)</span>
                <span>-${booking.pricing.diagnosticFee}.00</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>HVAC Labor & Certified Technician Rate</span>
                <span>${booking.pricing.repairLabor}.00</span>
              </div>
              {booking.pricing.partsUsed.map((part, i) => (
                <div key={i} className="flex justify-between text-slate-600">
                  <span className="truncate pr-2">{part.name}</span>
                  <span className="shrink-0">${part.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-slate-600">
                <span>Taxes & Environmental Compliance</span>
                <span>${booking.pricing.tax.toFixed(2)}</span>
              </div>

              {calculatedTip > 0 && (
                <div className="flex justify-between text-blue-700 font-semibold pt-1 border-t border-slate-200/60">
                  <span>Technician Tip ({booking.technicianName.split(' ')[0]})</span>
                  <span>+${calculatedTip.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between pt-2 border-t border-slate-300 text-sm font-bold text-slate-900">
                <span>Final Total Due:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Technician Tip Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Tip for {booking.technicianName.split(' ')[0]} (100% goes to tech)
              </label>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[0, 10, 15, 20].map((tip) => (
                <button
                  key={tip}
                  type="button"
                  onClick={() => {
                    setTipOption(tip);
                    setCustomTip('');
                  }}
                  className={`py-2 px-1 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer font-mono-numbers ${
                    tipOption === tip
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {tip === 0 ? 'No Tip' : `$${tip}`}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Select Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMethod('card')}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  method === 'card'
                    ? 'bg-blue-50/80 border-blue-500 font-bold text-blue-950'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-5 h-5 mb-1 text-blue-600" />
                <span className="text-xs">Credit/Debit</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('apple_pay')}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  method === 'apple_pay'
                    ? 'bg-blue-50/80 border-blue-500 font-bold text-blue-950'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-5 h-5 mb-1 text-slate-800" />
                <span className="text-xs">Apple / G-Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('cash')}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  method === 'cash'
                    ? 'bg-blue-50/80 border-blue-500 font-bold text-blue-950'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Building className="w-5 h-5 mb-1 text-slate-800" />
                <span className="text-xs">Cash on Site</span>
              </button>
            </div>
          </div>

          {/* Card Inputs Form */}
          {method === 'card' && (
            <div className="space-y-3 p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Card Number (Pre-filled test card ready)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="4242 4242 4242 4242"
                    className="w-full text-xs font-mono-numbers p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                    VISA
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 font-mono-numbers">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Expires
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    CVV / CVC
                  </label>
                  <input
                    type="text"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.slice(0, 4))}
                    placeholder="842"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Postal ZIP
                  </label>
                  <input
                    type="text"
                    value={cardZip}
                    onChange={(e) => setCardZip(e.target.value)}
                    placeholder="78701"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="Full Name as on card"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
                />
              </div>
            </div>
          )}

          {method === 'apple_pay' && (
            <div className="p-4 rounded-xl bg-slate-900 text-white text-center">
              <Smartphone className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
              <div className="text-xs font-bold">1-Click Express Pay</div>
              <p className="text-[11px] text-slate-300 mt-1">
                Touch ID / Face ID biometric authorization with your default card ending in •••• 4242
              </p>
            </div>
          )}

          {method === 'cash' && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <div className="font-bold mb-1">Pay Cash Directly to Technician</div>
              <p className="text-[11px] text-amber-800">
                You will hand ${grandTotal.toFixed(2)} cash directly to {booking.technicianName}. FixPulse warranty remains 100% active.
              </p>
            </div>
          )}

          {/* Security & Escrow Guarantee Footer */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>256-bit TLS Encrypted. Direct escrow release to licensed technician upon payment authorization.</span>
          </div>

          {/* Processing Animation */}
          {isProcessing ? (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center animate-pulse">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <div className="text-xs font-bold text-blue-900">Processing Secure Transaction...</div>
              <div className="text-[11px] text-blue-700 mt-1 font-mono-numbers">{processingStage}</div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Authorize & Pay ${grandTotal.toFixed(2)}</span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
