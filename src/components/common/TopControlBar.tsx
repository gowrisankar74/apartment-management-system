import React, { useState } from 'react';
import { 
  Building2, 
  Smartphone, 
  Monitor, 
  Languages, 
  Bell, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle2,
  User,
  Shield,
  Briefcase,
  Wrench,
  X
} from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';
import { UserRole } from '../../types/community';

interface Props {
  onOpenNotifications: () => void;
  onOpenSos: () => void;
}

export const TopControlBar: React.FC<Props> = ({ onOpenNotifications, onOpenSos }) => {
  const { 
    role, 
    setRole, 
    language, 
    setLanguage, 
    t, 
    viewMode, 
    setViewMode, 
    notifications, 
    resetToDemo,
    activeSosAlarm
  } = useCommunity();

  const [showResetNotice, setShowResetNotice] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const rolesList: { id: UserRole; label: string; sub: string; icon: React.ReactNode }[] = [
    { 
      id: 'resident', 
      label: 'Resident', 
      sub: 'Flat A-402', 
      icon: <User className="w-4 h-4 text-emerald-600" /> 
    },
    { 
      id: 'security', 
      label: 'Security Guard', 
      sub: 'Gate 1', 
      icon: <Shield className="w-4 h-4 text-amber-600" /> 
    },
    { 
      id: 'admin', 
      label: 'Admin Panel', 
      sub: 'Association Suite', 
      icon: <Briefcase className="w-4 h-4 text-blue-600" /> 
    },
    { 
      id: 'staff', 
      label: 'Maintenance Staff', 
      sub: 'Work Orders', 
      icon: <Wrench className="w-4 h-4 text-purple-600" /> 
    }
  ];

  const handleReset = () => {
    resetToDemo();
    setShowResetNotice(true);
    setTimeout(() => setShowResetNotice(false), 3000);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Reset Confirmation Toast */}
      {showResetNotice && (
        <div className="bg-emerald-600 text-white text-xs py-1.5 px-4 flex items-center justify-between text-center font-medium">
          <div className="flex items-center gap-2 mx-auto">
            <CheckCircle2 className="w-4 h-4" />
            <span>{t('resetSuccess')}</span>
          </div>
          <button onClick={() => setShowResetNotice(false)} className="text-white/80 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Active SOS Banner if any */}
      {activeSosAlarm && activeSosAlarm.status === 'Active Alert' && (
        <div className="bg-red-600 text-white text-xs py-2 px-4 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-white" />
            <span className="font-bold">EMERGENCY SOS:</span>
            <span>{activeSosAlarm.emergencyType} alarm active at Flat {activeSosAlarm.flatNumber}!</span>
          </div>
          <button 
            onClick={onOpenSos}
            className="bg-white text-red-700 px-2.5 py-0.5 rounded font-bold text-xs hover:bg-red-50"
          >
            Respond Now
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Community Identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white">
                {language === 'ta' ? 'கிராண்ட் பாம்ஸ் குடியிருப்பு' : 'Grand Palms Residences'}
              </span>
              <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                128 Flats · 4 Blocks
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              {language === 'ta' ? '24-அம்ச சமுதாய இயங்குதளம்' : '24-Feature Community Living OS'}
            </div>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          {rolesList.map(item => {
            const isActive = role === item.id;
            const isSecurity = item.id === 'security';
            return (
              <button
                key={item.id}
                onClick={() => setRole(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive 
                    ? isSecurity
                      ? 'bg-amber-950/80 text-amber-300 shadow-md ring-1 ring-amber-500/70 font-bold border border-amber-500/30'
                      : 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700 font-semibold' 
                    : isSecurity
                    ? 'text-amber-400/80 hover:text-amber-200 hover:bg-amber-950/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
                <span className="text-[10px] text-slate-400 hidden md:inline">({item.sub})</span>
              </button>
            );
          })}
        </div>

        {/* Utility Controls */}
        <div className="flex items-center gap-2">
          {/* Mobile vs Desktop View Toggle (Only relevant for Resident, Security & Staff) */}
          {role !== 'admin' && (
            <button
              onClick={() => setViewMode(viewMode === 'mobile' ? 'full' : 'mobile')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
              title="Toggle mobile device frame vs full-width responsive view"
            >
              {viewMode === 'mobile' ? (
                <>
                  <Monitor className="w-3.5 h-3.5 text-blue-400" />
                  <span className="hidden md:inline">{t('viewFull')}</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden md:inline">{t('viewMobile')}</span>
                </>
              )}
            </button>
          )}

          {/* Bilingual Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50 border border-emerald-800/60 transition"
            title="Switch Language: English / தமிழ்"
          >
            <Languages className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
            title="Open Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Reset Demo Data */}
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-amber-400 hover:bg-slate-700 transition"
            title={t('resetDemo')}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
