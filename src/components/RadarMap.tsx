import React, { useState } from 'react';
import { MapPin, Navigation, Star, Clock, ShieldCheck, ArrowRight, X } from 'lucide-react';
import { Technician } from '../types';
import { TechAvatar } from './TechAvatar';

interface RadarMapProps {
  technicians: Technician[];
  userLocation: { address: string; neighborhood: string; city: string };
  onSelectTechnician: (tech: Technician) => void;
  onBookTechnician: (tech: Technician) => void;
}

export const RadarMap: React.FC<RadarMapProps> = ({
  technicians,
  userLocation,
  onSelectTechnician,
  onBookTechnician,
}) => {
  const [selectedTech, setSelectedTech] = useState<Technician | null>(technicians[0] || null);

  // User coordinate is center (50, 50)
  const userX = 50;
  const userY = 50;

  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative text-white">
      {/* Top Map Control Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <h3 className="font-bold text-white text-base">Live Technician Radar</h3>
            <span className="text-xs text-slate-400">· Austin Metro Zone</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time GPS dispatch coordinates updated every 30 seconds
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono-numbers">
          <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-slate-200">
              {technicians.filter((t) => t.availabilityStatus === 'available_now').length} Available Now
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700/60">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="text-slate-200">
              {technicians.filter((t) => t.availabilityStatus !== 'available_now').length} On Job
            </span>
          </div>
        </div>
      </div>

      {/* Radar Canvas / Interactive SVG Graphic */}
      <div className="relative w-full h-[440px] sm:h-[480px] bg-slate-950 overflow-hidden select-none">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Concentric radar range rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[180px] h-[180px] rounded-full border border-cyan-500/20 flex items-center justify-center">
            <span className="text-[10px] text-cyan-400/40 font-mono-numbers -translate-y-20">
              1.0 Mile Radius
            </span>
          </div>
          <div className="absolute w-[320px] h-[320px] rounded-full border border-cyan-500/15 flex items-center justify-center">
            <span className="text-[10px] text-cyan-400/30 font-mono-numbers -translate-y-36">
              2.5 Mile Radius
            </span>
          </div>
          <div className="absolute w-[460px] h-[460px] rounded-full border border-cyan-500/10"></div>

          {/* Sweeping radar scanner line */}
          <div
            className="absolute w-[240px] h-[240px] rounded-full border-r border-t border-cyan-400/40 pointer-events-none opacity-40 animate-spin"
            style={{ animationDuration: '8s' }}
          />
        </div>

        {/* Street landmark labels */}
        <div className="absolute inset-0 pointer-events-none text-[11px] font-mono text-slate-600/70">
          <span className="absolute top-8 left-12">I-35 Expressway Corridor</span>
          <span className="absolute bottom-10 left-16">Lady Bird Lake / S Congress</span>
          <span className="absolute top-12 right-16">UT Austin / East MLK</span>
          <span className="absolute bottom-14 right-12">Riverside Dr Hub</span>
        </div>

        {/* User Location Pin (Center) */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
          style={{ left: `${userX}%`, top: `${userY}%` }}
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white shadow-lg shadow-blue-500/40">
              <Navigation className="w-4 h-4 text-white fill-white rotate-45" />
            </div>
            <span className="absolute -inset-1 rounded-full border border-blue-400 animate-ping opacity-60"></span>
          </div>
          <div className="mt-1 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[10px] text-blue-300 font-bold whitespace-nowrap shadow-md">
            Your Service Location
          </div>
        </div>

        {/* Technician Pins on Radar */}
        {technicians.map((tech) => {
          const isSelected = selectedTech?.id === tech.id;
          const isAvail = tech.availabilityStatus === 'available_now';

          return (
            <div
              key={tech.id}
              onClick={() => setSelectedTech(tech)}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group transition-transform hover:scale-110"
              style={{
                left: `${tech.mapCoordinates.x}%`,
                top: `${tech.mapCoordinates.y}%`,
              }}
            >
              <div className="relative flex flex-col items-center">
                {/* Visual pulse ring */}
                {isAvail && (
                  <span className="absolute -inset-2 rounded-full border border-emerald-400 animate-ping opacity-40 pointer-events-none"></span>
                )}

                {/* Tech Pin Bubble */}
                <div
                  className={`p-1 rounded-xl transition-all shadow-lg flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-105'
                      : isAvail
                      ? 'bg-slate-900/95 border border-emerald-500 text-white hover:border-white'
                      : 'bg-slate-900/95 border border-amber-500/80 text-white hover:border-white'
                  }`}
                >
                  <TechAvatar seed={tech.avatarSeed} name={tech.name} size="sm" isAvailable={isAvail} />
                  <div className="pr-1.5 text-left hidden sm:block">
                    <div className="text-[11px] font-bold leading-tight whitespace-nowrap">
                      {tech.name.split(' ')[0]}
                    </div>
                    <div className="text-[9px] text-slate-300 font-mono-numbers">
                      {tech.distanceMiles}mi · {tech.etaMinutes}m
                    </div>
                  </div>
                </div>

                {/* Tiny badge pointer */}
                <div
                  className={`w-2 h-2 rotate-45 -mt-1 ${
                    isSelected ? 'bg-blue-600' : 'bg-slate-900'
                  }`}
                />
              </div>
            </div>
          );
        })}

        {/* Selected Technician Floating Detail Overlay in Radar */}
        {selectedTech && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-40 bg-slate-900/95 backdrop-blur-md rounded-xl p-4 border border-slate-700 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <TechAvatar
                  seed={selectedTech.avatarSeed}
                  name={selectedTech.name}
                  size="md"
                  statusBadge={true}
                  isAvailable={selectedTech.availabilityStatus === 'available_now'}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-sm">{selectedTech.name}</h4>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                      {selectedTech.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{selectedTech.businessName}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-300 font-mono-numbers">
                    <span className="flex items-center text-amber-400 font-semibold gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {selectedTech.rating}
                    </span>
                    <span className="text-slate-500">·</span>
                    <span>{selectedTech.totalReviews} reviews</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-emerald-400 font-semibold">{selectedTech.distanceMiles} mi away</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedTech(null)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
                aria-label="Close technician preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400">Diagnostic Fee: </span>
                <span className="font-bold text-white font-mono-numbers">${selectedTech.diagnosticFee}</span>
                <span className="text-slate-400 text-[10px] ml-1">(Waived w/ repair)</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 font-mono-numbers font-medium">
                <Clock className="w-3.5 h-3.5" />
                ETA: ~{selectedTech.etaMinutes} min
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => onSelectTechnician(selectedTech)}
                className="flex-1 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Full Profile
              </button>
              <button
                onClick={() => onBookTechnician(selectedTech)}
                className="flex-1 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
              >
                <span>Book This Tech</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
