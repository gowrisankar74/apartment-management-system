import React from 'react';
import { ServiceCategoryType } from '../types';

interface TopNavProps {
  currentCategory: ServiceCategoryType;
  onSelectCategory: (cat: ServiceCategoryType) => void;
  activeBookingCount: number;
  onOpenActiveBooking: () => void;
  personaMode: 'customer' | 'technician';
  onTogglePersona: () => void;
  activeView: 'home' | 'radar' | 'portal';
  setActiveView: (view: 'home' | 'radar' | 'portal') => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentCategory,
  onSelectCategory,
  activeBookingCount,
  onOpenActiveBooking,
  personaMode,
  onTogglePersona,
  activeView,
  setActiveView,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Strict 1-row, 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            setActiveView('home');
          }}
          className="text-left font-bold tracking-tight text-slate-900 text-xl flex items-center gap-2 group cursor-pointer"
        >
          <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm group-hover:bg-blue-700 transition-colors shadow-xs">
            FP
          </span>
          <span className="font-extrabold text-slate-900 text-lg">FixPulse</span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => {
              onSelectCategory('ac-repair');
              setActiveView('home');
            }}
            className={`transition-colors hover:text-slate-900 cursor-pointer ${
              activeView === 'home' && currentCategory === 'ac-repair'
                ? 'text-blue-600 font-semibold'
                : ''
            }`}
          >
            AC Repair & Cooling
          </button>
          <button
            onClick={() => {
              setActiveView('home');
            }}
            className={`transition-colors hover:text-slate-900 cursor-pointer ${
              activeView === 'home' && currentCategory !== 'ac-repair'
                ? 'text-blue-600 font-semibold'
                : ''
            }`}
          >
            All Services
          </button>
          <button
            onClick={() => setActiveView('radar')}
            className={`transition-colors hover:text-slate-900 cursor-pointer flex items-center gap-1.5 ${
              activeView === 'radar' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Nearby Radar
          </button>
          <button
            onClick={() => setActiveView('portal')}
            className={`transition-colors hover:text-slate-900 cursor-pointer ${
              activeView === 'portal' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Technician Dispatch
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {activeBookingCount > 0 && (
            <button
              onClick={onOpenActiveBooking}
              className="px-3.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 cursor-pointer shadow-xs whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
              <span>Active Job ({activeBookingCount})</span>
            </button>
          )}

          <button
            onClick={onTogglePersona}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border cursor-pointer whitespace-nowrap ${
              personaMode === 'technician'
                ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
            title="Toggle between Customer experience and Technician dispatch console"
          >
            {personaMode === 'technician' ? 'View as Customer' : 'Pro Portal Mode'}
          </button>
        </div>
      </div>
    </header>
  );
};
