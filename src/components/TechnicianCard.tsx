import React from 'react';
import { Star, ShieldCheck, Clock, MapPin, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { Technician } from '../types';
import { TechAvatar } from './TechAvatar';

interface TechnicianCardProps {
  technician: Technician;
  onSelect: (tech: Technician) => void;
  onBook: (tech: Technician) => void;
}

export const TechnicianCard: React.FC<TechnicianCardProps> = ({
  technician,
  onSelect,
  onBook,
}) => {
  const isAvailableNow = technician.availabilityStatus === 'available_now';
  const latestReview = technician.reviews[0];

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 transition-all shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden group">
      <div className="p-5">
        {/* Header row: Tech avatar, identity, and live status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3.5">
            <TechAvatar
              seed={technician.avatarSeed}
              name={technician.name}
              size="lg"
              statusBadge={true}
              isAvailable={isAvailableNow}
            />

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                  {technician.name}
                </h3>
                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {technician.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">{technician.businessName}</p>

              {/* Star rating & completed jobs */}
              <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-600 font-mono-numbers">
                <div className="flex items-center text-amber-500 font-semibold gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{technician.rating.toFixed(2)}</span>
                </div>
                <span className="text-slate-300">·</span>
                <span className="text-slate-600 font-medium">({technician.totalReviews} reviews)</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500">{technician.completedJobsCount} jobs done</span>
              </div>
            </div>
          </div>

          {/* Pricing snapshot */}
          <div className="text-right shrink-0">
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Diagnostic</div>
            <div className="text-lg font-bold text-slate-900 font-mono-numbers">
              ${technician.diagnosticFee}
            </div>
            <div className="text-[11px] text-emerald-600 font-medium">waived w/ repair</div>
          </div>
        </div>

        {/* Live availability & distance banner */}
        <div className="mt-4 p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs font-mono-numbers">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isAvailableNow ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span className={`font-semibold ${isAvailableNow ? 'text-emerald-800' : 'text-amber-800'}`}>
              {isAvailableNow ? 'Available Right Now' : 'Next slot in ~35 min'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-600">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {technician.distanceMiles} mi away
            </span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-1 text-slate-700 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              ~{technician.etaMinutes} min arrival
            </span>
          </div>
        </div>

        {/* Credentials & Trust markers */}
        <div className="mt-3.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600">
          <div className="flex items-center gap-1 text-slate-700 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Lic: {technician.licenseNumber}</span>
          </div>
          <span className="text-slate-300">·</span>
          <div className="flex items-center gap-1 text-slate-700">
            <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{technician.certifications[0]}</span>
          </div>
          <span className="text-slate-300">·</span>
          <div className="flex items-center gap-1 text-slate-500">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{technician.yearsExperience} yrs exp</span>
          </div>
        </div>

        {/* Specialties tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {technician.specialties.slice(0, 3).map((spec, i) => (
            <span
              key={i}
              className="text-[11px] font-medium text-slate-600 bg-slate-100/80 px-2 py-0.5 rounded-md"
            >
              {spec}
            </span>
          ))}
          {technician.specialties.length > 3 && (
            <span className="text-[11px] text-slate-400 px-1 py-0.5 font-medium">
              +{technician.specialties.length - 3} more
            </span>
          )}
        </div>

        {/* Snippet of latest verified review */}
        {latestReview && (
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 italic line-clamp-2">
            "{latestReview.text}"
            <span className="not-italic text-slate-400 ml-1 text-[11px] font-medium font-mono-numbers">
              — {latestReview.author} ({latestReview.date})
            </span>
          </div>
        )}
      </div>

      {/* Card action footer */}
      <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-3">
        <button
          onClick={() => onSelect(technician)}
          className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer py-1.5 px-2"
        >
          View Reviews & Bio
        </button>

        <button
          onClick={() => onBook(technician)}
          className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:gap-2"
        >
          <span>Book Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
