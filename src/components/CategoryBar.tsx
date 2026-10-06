import React from 'react';
import { Wind, Droplets, Zap, Wrench, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { ServiceCategory, ServiceCategoryType } from '../types';

interface CategoryBarProps {
  categories: ServiceCategory[];
  selectedCategory: ServiceCategoryType;
  onSelectCategory: (id: ServiceCategoryType) => void;
  userLocation: { address: string; neighborhood: string; city: string };
  onAddressClick?: () => void;
  activeProsCount: number;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  userLocation,
  activeProsCount,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Wind':
        return <Wind className="w-5 h-5" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5" />;
      default:
        return <Wrench className="w-5 h-5" />;
    }
  };

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory) || categories[0];

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Location & Real-time network telemetry */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-medium text-slate-900">{userLocation.neighborhood}</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">{userLocation.address}, {userLocation.city}</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 font-mono-numbers">
            <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {activeProsCount} Verified Techs Available
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Avg Arrival: 18-25 min
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Escrow Protection
            </span>
          </div>
        </div>

        {/* Category selector row */}
        <div className="pt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Service Trade
            </h2>
            <span className="text-xs text-slate-400">
              {categories.length} trades available in your zone
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((cat) => {
              const isSelected = cat.id === selectedCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex flex-col text-left p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-1 ring-blue-500/20'
                      : 'bg-slate-50/60 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      {getIcon(cat.iconName)}
                    </div>
                    {cat.id === 'ac-repair' && (
                      <span className="text-[10px] font-semibold text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded">
                        High Demand
                      </span>
                    )}
                  </div>
                  <span className={`text-sm font-bold ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                    {cat.shortName}
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5 font-mono-numbers">
                    From ${cat.startingPrice} diag.
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Highlighted Banner for Selected Category (e.g. AC Repair) */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-slate-900 to-blue-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                Active Category
              </span>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-xs text-slate-300">EPA & TDLR Licensed HVAC</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              {activeCategoryObj.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5 max-w-2xl">
              {activeCategoryObj.tagline}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-xs px-3.5 py-2 rounded-lg border border-white/10 text-xs text-slate-200">
              <div className="text-[10px] uppercase tracking-wider text-slate-400">Diagnosis Guarantee</div>
              <div className="font-semibold text-white">Fee Waived with Any Repair</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
