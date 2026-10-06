import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  User, 
  Building2, 
  HelpCircle, 
  Calendar, 
  CreditCard, 
  Wrench, 
  Clock 
} from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';
import { AIChatMessage } from '../../types/community';

export const ResidentAiAssistant: React.FC = () => {
  const { 
    residentUser, 
    bills, 
    complaints, 
    facilities, 
    securityUser, 
    language, 
    t 
  } = useCommunity();

  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: language === 'ta'
        ? `வணக்கம் ${residentUser.name.split(' ')[0]}! நான் கிராண்ட் பாம்ஸ் குடியிருப்பு AI உதவியாளர். மாதாந்திர கட்டணம், புகார்கள், கிளப்ஹவுஸ் நேரம் அல்லது வாயில் விதிகள் பற்றி என்னிடம் கேளுங்கள்.`
        : `Hello ${residentUser.name.split(' ')[0]}! I am your Grand Palms Apartment AI Assistant. I can answer questions about your maintenance bill, active complaints, facility timings, or community bylaws.`,
      timestamp: '11:00 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickPrompts = [
    'When is my maintenance due?',
    'Do I have any pending complaints?',
    'What are the swimming pool timings?',
    'Is the clubhouse open on weekends?',
    'How do I report water leakage?',
    'Who is on gate security duty today?'
  ];

  const handleSend = (query?: string) => {
    const textToSend = (query || inputText).trim();
    if (!textToSend) return;

    const userMsg: AIChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Generate accurate contextual reply
    setTimeout(() => {
      let reply = '';
      const q = textToSend.toLowerCase();

      if (q.includes('maintenance') || q.includes('due') || q.includes('bill') || q.includes('pay')) {
        const curBill = bills.find(b => b.flatNumber === residentUser.flatNumber && b.status !== 'Paid') || bills[0];
        if (curBill.status === 'Paid') {
          reply = `Your ${curBill.month} maintenance bill of ₹${curBill.amount} has already been paid on ${curBill.paidAt}. Receipt: ${curBill.receiptNumber}.`;
        } else {
          reply = `Your ${curBill.month} maintenance bill is ₹${curBill.amount.toLocaleString()} and is due by ${curBill.dueDate}. Breakdown includes: Security (₹${curBill.breakdown.security}), Power (₹${curBill.breakdown.commonElectricity}), Water (₹${curBill.breakdown.water}), and Sinking Fund (₹${curBill.breakdown.sinkingFund}).`;
        }
      } else if (q.includes('complaint') || q.includes('ticket') || q.includes('leak') || q.includes('plumb')) {
        const active = complaints.filter(c => c.flatNumber === residentUser.flatNumber);
        if (active.length > 0) {
          reply = `You have ${active.length} complaint(s) on file: #${active[0].ticketNumber} regarding "${active[0].title}" is currently "${active[0].status}". Assigned staff: ${active[0].assignedStaffName || 'Under dispatch'}.`;
        } else {
          reply = `You have no active maintenance complaints right now for Flat ${residentUser.flatNumber}. You can raise a new ticket anytime under the Complaints tab.`;
        }
      } else if (q.includes('pool') || q.includes('swim')) {
        const pool = facilities.find(f => f.id === 'fac-pool');
        reply = `The Infinity Lap Swimming Pool is open from ${pool?.openHours || '06:00 AM - 09:30 PM'}. Mondays are closed for chemical backwash and water ozonation. Proper nylon swimwear and swimming caps are mandatory.`;
      } else if (q.includes('clubhouse') || q.includes('party')) {
        const club = facilities.find(f => f.id === 'fac-clubhouse');
        reply = `The Clubhouse Banquet & Party Hall is open from ${club?.openHours || '09:00 AM - 11:00 PM'}. The reservation fee is ₹${club?.hourlyFee}/hour. Loud music must cease after 10:00 PM as per society peace guidelines.`;
      } else if (q.includes('security') || q.includes('gate') || q.includes('guard')) {
        reply = `${securityUser.name} (${securityUser.badgeNumber}) is currently on active duty at ${securityUser.gateAssigned} (${securityUser.shift}). Intercom speed dial: +91 98401 22334.`;
      } else if (q.includes('visitor') || q.includes('pass') || q.includes('guest')) {
        reply = `To invite guests, go to the Visitors tab and tap "Create Expected Pass". This generates a 6-digit code and digital QR pass that clears Gate 1 turnstiles in under 5 seconds.`;
      } else {
        reply = `Grand Palms Residences rules note: Doorstep wet/dry waste collection is done daily between 08:30 AM - 09:30 AM. EV common charging bays are located in Basement 1. Emergency intercom is reachable at speed-dial 108/100.`;
      }

      const botMsg: AIChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 400);
  };

  return (
    <div className="space-y-4 pb-20 flex flex-col h-[75vh]">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600 text-white rounded-lg">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            {t('aiTitle')}
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          {t('aiSubtitle')}
        </p>
      </div>

      {/* Quick Prompts Carousel */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 whitespace-nowrap hover:bg-slate-50 hover:border-slate-300 font-medium transition shadow-2xs"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-3 p-3 bg-white rounded-2xl border border-slate-200">
        {messages.map(m => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
              m.sender === 'user' ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white'
            }`}>
              {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            </div>
            <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
              m.sender === 'user'
                ? 'bg-slate-900 text-white rounded-tr-none'
                : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-none'
            }`}>
              <p>{m.text}</p>
              <span className={`text-[9px] block mt-1 ${m.sender === 'user' ? 'text-slate-300' : 'text-slate-400'}`}>
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder={t('aiInputPlaceholder')}
          className="flex-1 text-xs px-2 py-1.5 focus:outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputText.trim()}
          className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
