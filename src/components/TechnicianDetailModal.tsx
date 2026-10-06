import React, { useState } from 'react';
import { 
  X, Star, ShieldCheck, Award, CheckCircle2, Clock, MapPin, 
  ThumbsUp, Calendar, ArrowRight, Shield, Wrench
} from 'lucide-react';
import { Technician } from '../types';
import { TechAvatar } from './TechAvatar';

interface TechnicianDetailModalProps {
  technician: Technician;
  onClose: () => void;
  onBook: (tech: Technician) => void;
}

export const TechnicianDetailModal: React.FC<TechnicianDetailModalProps> = ({
  technician,
  onClose,
  onBook,
}) => {
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    technician.reviews.forEach((r) => {
      map[r.id] = r.helpfulCount;
    });
    return map;
  });

  const [upvoted, setUpvoted] = useState<Record<string, boolean>>({});

  const handleHelpful = (reviewId: string) => {
    if (upvoted[reviewId]) return;
    setUpvoted((prev) => ({ ...prev, [reviewId]: true }));
    setHelpfulCounts((prev) => ({ ...prev, [reviewId]: (prev[reviewId] || 0) + 1 }));
  };

  const isAvailable = technician.availabilityStatus === 'available_now';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Top Header */}
        <div className="relative bg-slate-900 text-white p-6 pb-7">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <TechAvatar
              seed={technician.avatarSeed}
              name={technician.name}
              size="xl"
              statusBadge={true}
              isAvailable={isAvailable}
            />

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-white">{technician.name}</h2>
                <span className="text-xs bg-blue-600/80 text-white px-2.5 py-0.5 rounded font-medium">
                  {technician.badge}
                </span>
                <span className="text-xs text-slate-300 font-mono-numbers">
                  Lic #{technician.licenseNumber}
                </span>
              </div>

              <p className="text-sm text-slate-300 mt-0.5">{technician.businessName}</p>

              <div className="flex items-center gap-3 mt-2 text-xs text-slate-300 font-mono-numbers">
                <div className="flex items-center text-amber-400 font-semibold gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{technician.rating.toFixed(2)}</span>
                </div>
                <span>·</span>
                <span>{technician.totalReviews} verified reviews</span>
                <span>·</span>
                <span>{technician.completedJobsCount} completed jobs</span>
              </div>
            </div>
          </div>

          {/* Quick status bar */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono-numbers text-slate-300 gap-2">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span className="font-semibold text-white">
                {isAvailable ? 'Available Right Now' : 'Occupied · Next slot in ~35m'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                {technician.distanceMiles} miles away
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                ~{technician.etaMinutes} min arrival
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Transparent Pricing Matrix */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Transparent Pricing & Guarantees
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500">Diagnostic Fee</div>
                <div className="text-xl font-bold text-slate-900 font-mono-numbers mt-0.5">
                  ${technician.diagnosticFee}
                </div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1">
                  Waived with any repair work
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500">Standard Labor Rate</div>
                <div className="text-xl font-bold text-slate-900 font-mono-numbers mt-0.5">
                  ${technician.hourlyRate}<span className="text-xs text-slate-500 font-normal">/hr</span>
                </div>
                <div className="text-[11px] text-slate-600 font-medium mt-1">
                  Itemized before work begins
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500">Warranty Protection</div>
                <div className="text-base font-bold text-slate-900 mt-1">
                  90-Day Parts & Labor
                </div>
                <div className="text-[11px] text-blue-600 font-medium mt-1">
                  FixPulse Escrow Guarantee
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Specialties */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Professional Background
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">{technician.bio}</p>

            <div className="mt-3">
              <div className="text-xs font-semibold text-slate-600 mb-2">Core Specialties & Systems:</div>
              <div className="flex flex-wrap gap-2">
                {technician.specialties.map((spec, i) => (
                  <span
                    key={i}
                    className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Verification & Safety Credentials */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-950 mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              Verified FixPulse Credentials
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">Background Checked & Screened</span>
                  <div className="text-slate-500 text-[11px]">Identity & criminal background verified</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">Commercial Insurance</span>
                  <div className="text-slate-500 text-[11px]">{technician.insuredAmount}</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">Certifications</span>
                  <div className="text-slate-500 text-[11px]">{technician.certifications.join(' · ')}</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">Experience</span>
                  <div className="text-slate-500 text-[11px]">{technician.yearsExperience} years active field practice</div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Verified Customer Reviews ({technician.reviews.length})
              </h4>
              <div className="flex items-center gap-1 text-xs text-amber-500 font-bold font-mono-numbers">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{technician.rating.toFixed(2)} out of 5</span>
              </div>
            </div>

            <div className="space-y-3">
              {technician.reviews.map((rev) => (
                <div key={rev.id} className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 text-xs">{rev.author}</span>
                      <span className="text-slate-400 text-xs">·</span>
                      <span className="text-[11px] text-emerald-700 font-medium">Verified Service</span>
                    </div>
                    <div className="flex items-center text-amber-400 gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200 fill-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 mt-0.5 font-mono-numbers">
                    {rev.serviceType} · {rev.date}
                  </div>

                  <p className="text-xs text-slate-700 mt-2 leading-relaxed">{rev.text}</p>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Did this review help?</span>
                    <button
                      onClick={() => handleHelpful(rev.id)}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded cursor-pointer transition-colors ${
                        upvoted[rev.id]
                          ? 'text-blue-600 bg-blue-50 font-semibold'
                          : 'hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span className="font-mono-numbers">{helpfulCounts[rev.id]} helpful</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom CTA */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-500">Diagnostic with {technician.name.split(' ')[0]}</div>
            <div className="text-sm font-bold text-slate-900 font-mono-numbers">
              ${technician.diagnosticFee} <span className="text-xs text-emerald-600 font-medium">(waived w/ repair)</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => onBook(technician)}
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>Proceed to Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
