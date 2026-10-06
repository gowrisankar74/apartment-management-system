import React, { useState } from 'react';
import { CommunityProvider, useCommunity } from './context/CommunityContext';
import { TopControlBar } from './components/common/TopControlBar';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { DigitalReceiptModal } from './components/common/DigitalReceiptModal';
import { UnexpectedVisitorApprovalModal } from './components/common/UnexpectedVisitorApprovalModal';
import { SosModal } from './components/common/SosModal';
import { ResidentApp } from './components/resident/ResidentApp';
import { SecurityApp } from './components/security/SecurityApp';
import { AdminPanel } from './components/admin/AdminPanel';
import { StaffApp } from './components/staff/StaffApp';
import { Wifi, Battery, Signal } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { 
    role, 
    viewMode, 
    viewingReceipt, 
    setViewingReceipt 
  } = useCommunity();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSosOpen, setIsSosOpen] = useState(false);

  const renderActiveRoleView = () => {
    switch (role) {
      case 'admin':
        return <AdminPanel />;
      case 'security':
        return <SecurityApp onOpenSos={() => setIsSosOpen(true)} />;
      case 'staff':
        return <StaffApp />;
      case 'resident':
      default:
        return <ResidentApp onOpenSos={() => setIsSosOpen(true)} />;
    }
  };

  const isMobileWrapped = role !== 'admin' && viewMode === 'mobile';

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Universal Top Control & Role Switcher Bar */}
      <TopControlBar
        onOpenNotifications={() => setIsNotifOpen(true)}
        onOpenSos={() => setIsSosOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start p-0 sm:py-6 sm:px-4">
        {isMobileWrapped ? (
          /* Realistic Smartphone Frame (390px viewport, notch, speaker & home indicator) */
          <div className="w-full max-w-[412px] bg-white border-0 sm:border-[10px] sm:border-slate-800 sm:rounded-[50px] shadow-2xl overflow-hidden flex flex-col min-h-screen sm:min-h-[844px] sm:max-h-[890px] relative">
            {/* Phone Notch & Status Bar */}
            <div className="bg-slate-900 text-white px-6 pt-3 pb-2 flex items-center justify-between text-xs select-none shrink-0 z-30">
              <span className="font-mono font-bold text-xs tracking-tight">09:41</span>
              {/* Dynamic Island / Speaker Pill */}
              <div className="w-20 h-4 bg-black rounded-full mx-auto" />
              <div className="flex items-center gap-1.5 text-slate-300">
                <Signal className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            {/* Scrollable Viewport within Device */}
            <div className="flex-1 overflow-y-auto bg-slate-50 relative">
              {renderActiveRoleView()}
            </div>

            {/* iOS Home Indicator Bar */}
            <div className="h-4 bg-white flex items-center justify-center shrink-0 z-40">
              <div className="w-32 h-1 bg-slate-300 rounded-full" />
            </div>
          </div>
        ) : (
          /* Full-width Responsive Screen (Admin Panel or Full View) */
          <div className="w-full max-w-7xl flex-1 bg-slate-50 min-h-screen sm:rounded-3xl shadow-xl overflow-hidden">
            {renderActiveRoleView()}
          </div>
        )}
      </main>

      {/* Global Modals & Notifications */}
      <NotificationDrawer 
        isOpen={isNotifOpen} 
        onClose={() => setIsNotifOpen(false)} 
      />

      <DigitalReceiptModal 
        bill={viewingReceipt} 
        onClose={() => setViewingReceipt(null)} 
      />

      {/* Instant Unexpected Visitor Clearance Prompt (Pops up for resident) */}
      {role === 'resident' && <UnexpectedVisitorApprovalModal />}

      {/* High-priority Emergency SOS Modal */}
      <SosModal 
        isOpen={isSosOpen} 
        onClose={() => setIsSosOpen(false)} 
      />
    </div>
  );
};

export default function App() {
  return (
    <CommunityProvider>
      <MainAppContent />
    </CommunityProvider>
  );
}
