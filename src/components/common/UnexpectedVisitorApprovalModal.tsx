import React from 'react';
import { ShieldAlert, CheckCircle, XCircle, Phone, Car, Clock } from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';

export const UnexpectedVisitorApprovalModal: React.FC = () => {
  const { activeUnexpectedVisitor, respondUnexpectedVisitor, language } = useCommunity();

  if (!activeUnexpectedVisitor || activeUnexpectedVisitor.status !== 'waiting_approval') {
    return null;
  }

  const handleAllow = () => {
    respondUnexpectedVisitor(activeUnexpectedVisitor.id, true);
  };

  const handleDeny = () => {
    respondUnexpectedVisitor(activeUnexpectedVisitor.id, false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border-2 border-emerald-500 animate-in zoom-in-95 duration-150">
        {/* Urgent Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 text-center relative">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-2 text-white shadow-inner">
            <ShieldAlert className="w-6 h-6 animate-bounce" />
          </div>
          <h3 className="font-bold text-base">
            {language === 'ta' ? 'வாயில் 1 அனுமதி கோரிக்கை' : 'Gate 1 Visitor Approval'}
          </h3>
          <p className="text-xs text-emerald-100">
            {language === 'ta' ? 'அனுமதிக்க அல்லது மறுக்க தேர்வு செய்க' : 'Security is holding this visitor at Main Gate'}
          </p>
        </div>

        {/* Visitor Card */}
        <div className="p-5 space-y-4">
          <div className="text-center">
            <h4 className="font-bold text-slate-900 text-lg leading-tight">
              {activeUnexpectedVisitor.visitorName}
            </h4>
            <div className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Purpose: {activeUnexpectedVisitor.purpose}
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2 text-xs border border-slate-100">
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                Phone:
              </span>
              <span className="font-mono font-medium text-slate-800">{activeUnexpectedVisitor.visitorPhone}</span>
            </div>
            {activeUnexpectedVisitor.vehicleNumber && (
              <div className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-slate-400" />
                  Vehicle:
                </span>
                <span className="font-mono font-medium text-slate-800">{activeUnexpectedVisitor.vehicleNumber}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Time:
              </span>
              <span className="font-medium text-slate-800">Just now at Gate 1</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 text-center leading-normal">
            {language === 'ta'
              ? 'அனுமதித்தால் மட்டுமே காவலர் இவரை வீட்டிற்குள் அனுமதிப்பார்.'
              : 'Tapping Allow will instantly clear the visitor through Gate 1 turnstiles.'}
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleDeny}
              className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition active:scale-95"
            >
              <XCircle className="w-4 h-4" />
              <span>{language === 'ta' ? 'மறுக்கவும்' : 'Deny Entry'}</span>
            </button>
            <button
              onClick={handleAllow}
              className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition active:scale-95"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{language === 'ta' ? 'அனுமதிக்கவும்' : 'Allow Entry'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
