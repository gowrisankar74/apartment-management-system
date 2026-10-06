import React, { useState } from 'react';
import { 
  Home, 
  CreditCard, 
  UserCheck, 
  Wrench, 
  Building, 
  Users, 
  Package, 
  Car, 
  Sparkles, 
  MoreHorizontal,
  ShieldAlert
} from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';
import { ResidentHome } from './ResidentHome';
import { ResidentBills } from './ResidentBills';
import { ResidentVisitors } from './ResidentVisitors';
import { ResidentComplaints } from './ResidentComplaints';
import { ResidentFacilities } from './ResidentFacilities';
import { ResidentDeliveries } from './ResidentDeliveries';
import { ResidentCommunity } from './ResidentCommunity';
import { ResidentVehiclesParking } from './ResidentVehiclesParking';
import { ResidentAiAssistant } from './ResidentAiAssistant';
import { ResidentFamilyDocsMeters } from './ResidentFamilyDocsMeters';

interface Props {
  onOpenSos: () => void;
}

export const ResidentApp: React.FC<Props> = ({ onOpenSos }) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const { residentUser, deliveries, visitorPasses, t, language } = useCommunity();

  const pendingVisitorCount = visitorPasses.filter(p => p.status === 'waiting_approval').length;
  const gateDeliveriesCount = deliveries.filter(d => d.status === 'Waiting at Gate').length;

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <ResidentHome onNavigate={setActiveTab} onOpenSos={onOpenSos} />;
      case 'bills':
        return <ResidentBills />;
      case 'visitors':
        return <ResidentVisitors />;
      case 'complaints':
        return <ResidentComplaints />;
      case 'facilities':
        return <ResidentFacilities />;
      case 'deliveries':
        return <ResidentDeliveries />;
      case 'community':
        return <ResidentCommunity />;
      case 'parking':
        return <ResidentVehiclesParking />;
      case 'assistant':
        return <ResidentAiAssistant />;
      case 'more':
        return <ResidentFamilyDocsMeters />;
      default:
        return <ResidentHome onNavigate={setActiveTab} onOpenSos={onOpenSos} />;
    }
  };

  const navItems = [
    { id: 'home', label: t('navHome'), icon: <Home className="w-5 h-5" /> },
    { id: 'bills', label: t('navBills'), icon: <CreditCard className="w-5 h-5" /> },
    { 
      id: 'visitors', 
      label: t('navVisitors'), 
      icon: <UserCheck className="w-5 h-5" />,
      badge: pendingVisitorCount > 0 ? pendingVisitorCount : undefined
    },
    { id: 'complaints', label: t('navComplaints'), icon: <Wrench className="w-5 h-5" /> },
    { id: 'facilities', label: t('navFacilities'), icon: <Building className="w-5 h-5" /> },
    { id: 'community', label: t('navCommunity'), icon: <Users className="w-5 h-5" /> },
    { 
      id: 'deliveries', 
      label: t('navDeliveries'), 
      icon: <Package className="w-5 h-5" />,
      badge: gateDeliveriesCount > 0 ? gateDeliveriesCount : undefined
    },
    { id: 'parking', label: t('navVehicles'), icon: <Car className="w-5 h-5" /> },
    { id: 'assistant', label: t('navAssistant'), icon: <Sparkles className="w-5 h-5" /> },
    { id: 'more', label: t('navMore'), icon: <MoreHorizontal className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col min-h-full bg-slate-50 relative">
      {/* Scrollable Viewport */}
      <div className="flex-1 p-3 sm:p-4 max-w-xl mx-auto w-full">
        {renderContent()}
      </div>

      {/* Ergonomic Bottom Tab Navigation */}
      <nav 
        aria-label="Resident Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg"
      >
        <div className="max-w-xl mx-auto flex items-center justify-between px-1 py-1.5 overflow-x-auto scrollbar-none">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center justify-center min-w-[54px] min-h-[46px] px-1 py-1 rounded-xl transition ${
                  isActive
                    ? 'text-emerald-700 font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <div className="relative">
                  {item.icon}
                  {item.badge && (
                    <span className="absolute -top-1 -right-2 bg-rose-500 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-[52px]">
                  {item.label}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
