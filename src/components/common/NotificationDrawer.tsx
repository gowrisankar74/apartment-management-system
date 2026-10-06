import React, { useState } from 'react';
import { X, Bell, CheckCheck, ShieldAlert, Package, UserCheck, FileText, Megaphone } from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';
import { AppNotification } from '../../types/community';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead, language } = useCommunity();
  const [filter, setFilter] = useState<'all' | 'unread' | 'visitor' | 'delivery'>('all');

  if (!isOpen) return null;

  const filtered = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'visitor') return n.type === 'visitor';
    if (filter === 'delivery') return n.type === 'delivery';
    return true;
  });

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'visitor':
        return <UserCheck className="w-4 h-4 text-emerald-600" />;
      case 'delivery':
        return <Package className="w-4 h-4 text-blue-600" />;
      case 'emergency':
        return <ShieldAlert className="w-4 h-4 text-red-600" />;
      case 'bill':
        return <FileText className="w-4 h-4 text-amber-600" />;
      case 'announcement':
      default:
        return <Megaphone className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-base">
                  {language === 'ta' ? 'அறிவிப்பு மையம்' : 'Notification Center'}
                </h2>
                <p className="text-xs text-slate-500">
                  {language === 'ta' ? 'அனைத்து வாயில் மற்றும் சங்க எச்சரிக்கைகள்' : 'Real-time gate and society updates'}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Bar */}
          <div className="p-3 border-b border-slate-100 flex items-center justify-between gap-1 text-xs">
            <div className="flex items-center gap-1">
              {(['all', 'unread', 'visitor', 'delivery'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-2.5 py-1 rounded-md font-medium capitalize transition ${
                    filter === tab
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              onClick={markAllNotificationsRead}
              className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-medium px-2 py-1 rounded hover:bg-emerald-50"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Read all</span>
            </button>
          </div>

          {/* Notification List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-medium">No notifications in this category</p>
              </div>
            ) : (
              filtered.map(item => (
                <div
                  key={item.id}
                  onClick={() => markNotificationRead(item.id)}
                  className={`p-3 rounded-xl transition cursor-pointer mb-1 ${
                    !item.read ? 'bg-emerald-50/60 border border-emerald-100/80' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-xs shrink-0 mt-0.5">
                      {getIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="font-semibold text-xs text-slate-900 truncate">
                          {language === 'ta' && item.tamilTitle ? item.tamilTitle : item.title}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 tabular-nums">
                          {item.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {language === 'ta' && item.tamilMessage ? item.tamilMessage : item.message}
                      </p>
                    </div>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-2" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
