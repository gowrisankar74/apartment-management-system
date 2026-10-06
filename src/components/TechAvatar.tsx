import React from 'react';

interface TechAvatarProps {
  seed: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  category?: string;
  statusBadge?: boolean;
  isAvailable?: boolean;
}

export const TechAvatar: React.FC<TechAvatarProps> = ({
  seed,
  name,
  size = 'md',
  statusBadge = false,
  isAvailable = true,
}) => {
  // Deterministic color palette & style based on seed
  const sizeClasses = {
    sm: 'w-9 h-9 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-20 h-20 text-lg',
  }[size];

  const badgeSize = {
    sm: 'w-2.5 h-2.5 bottom-0 right-0 border',
    md: 'w-3.5 h-3.5 bottom-0 right-0 border-2',
    lg: 'w-4 h-4 bottom-0.5 right-0.5 border-2',
    xl: 'w-5 h-5 bottom-1 right-1 border-2',
  }[size];

  // Specific initials
  const initials = name
    .split(' ')
    .map(p => p[0])
    .join('')
    .slice(0, 2);

  // Distinctive rich themes for technicians
  const getTheme = () => {
    if (seed.includes('marcus')) {
      return {
        bg: 'from-blue-600 to-slate-800',
        accent: '#38bdf8',
        role: 'HVAC Lead',
      };
    }
    if (seed.includes('elena')) {
      return {
        bg: 'from-teal-600 to-emerald-900',
        accent: '#34d399',
        role: 'CoolTech',
      };
    }
    if (seed.includes('carlos')) {
      return {
        bg: 'from-amber-600 to-stone-900',
        accent: '#fbbf24',
        role: 'Master Tech',
      };
    }
    if (seed.includes('david')) {
      return {
        bg: 'from-indigo-600 to-slate-900',
        accent: '#818cf8',
        role: 'HVAC Pro',
      };
    }
    if (seed.includes('frankie')) {
      return {
        bg: 'from-cyan-700 to-sky-950',
        accent: '#38bdf8',
        role: 'Hydro Plumb',
      };
    }
    if (seed.includes('samantha')) {
      return {
        bg: 'from-violet-700 to-slate-950',
        accent: '#c084fc',
        role: 'Master Elec',
      };
    }
    return {
      bg: 'from-slate-700 to-slate-900',
      accent: '#94a3b8',
      role: 'Pro',
    };
  };

  const theme = getTheme();

  return (
    <div className="relative inline-block shrink-0 select-none">
      <div
        className={`${sizeClasses} rounded-xl bg-gradient-to-br ${theme.bg} shadow-sm border border-white/20 flex flex-col items-center justify-center text-white font-semibold overflow-hidden relative group`}
        title={name}
      >
        {/* Subtle technician uniform stitch watermark & collar SVG */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 100 C20 70, 35 60, 50 60 C65 60, 80 70, 80 100 Z" fill="white" />
          <circle cx="50" cy="35" r="18" fill="white" />
          <path d="M45 55 L50 65 L55 55" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>

        <span className="relative z-10 tracking-tight font-bold drop-shadow-xs">{initials}</span>
      </div>

      {statusBadge && (
        <span
          className={`absolute ${badgeSize} rounded-full ${
            isAvailable ? 'bg-emerald-500' : 'bg-amber-500'
          } border-white shadow-xs`}
          title={isAvailable ? 'Available Now' : 'Busy - Next slot soon'}
        />
      )}
    </div>
  );
};
