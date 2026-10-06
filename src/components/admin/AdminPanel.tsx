import React, { useState } from 'react';
import { 
  Briefcase, 
  Building, 
  CreditCard, 
  Wrench, 
  UserCheck, 
  Megaphone, 
  FileText, 
  BarChart3, 
  History, 
  Plus, 
  Search, 
  Download, 
  Users, 
  ShieldCheck, 
  Car, 
  AlertTriangle,
  CheckCircle2,
  X,
  Phone,
  Calendar
} from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';
import { Complaint, Announcement } from '../../types/community';

export const AdminPanel: React.FC = () => {
  const { 
    community, 
    flats, 
    bills, 
    complaints, 
    visitorPasses, 
    deliveries, 
    announcements, 
    publishAnnouncement,
    assignComplaintStaff, 
    auditLogs, 
    adminUser,
    staffUser,
    t, 
    language 
  } = useCommunity();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'flats' | 'billing' | 'complaints' | 'notices' | 'reports' | 'logs'>('overview');

  // Announcement modal
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<Announcement['category']>('General');
  const [noticePriority, setNoticePriority] = useState<Announcement['priority']>('normal');

  // Staff Assignment modal
  const [assignTicketId, setAssignTicketId] = useState<string | null>(null);

  // Search filter
  const [searchTerm, setSearchTerm] = useState('');

  // Computations for KPIs
  const totalFlats = community.totalFlats;
  const occupiedFlats = flats.filter(f => f.residentType !== 'Vacant').length;
  const totalPaidAmount = bills.filter(b => b.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
  const totalPendingAmount = bills.filter(b => b.status !== 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
  const openComplaintsCount = complaints.filter(c => c.status !== 'Resolved' && c.status !== 'Closed').length;
  const todayVisitorsCount = visitorPasses.length + 8;

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim()) return;
    publishAnnouncement({
      title: noticeTitle,
      content: noticeContent,
      category: noticeCategory,
      priority: noticePriority
    });
    setNoticeTitle('');
    setNoticeContent('');
    setShowNoticeModal(false);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Flat,Resident,Month,Amount,Status\n" +
      bills.map(b => `${b.flatNumber},${b.flatId},${b.month},${b.amount},${b.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `GrandPalms_Collections_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Admin Suite Header */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold tracking-tight">
                {t('adminTitle')}
              </h1>
              <span className="text-[11px] font-mono bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-500/30">
                FY 2026-27 Active
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Managing Trustee: {adminUser.name} · {community.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNoticeModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
          >
            <Megaphone className="w-4 h-4" />
            <span>Publish Notice</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
        {[
          { id: 'overview', label: '18. Overview Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'flats', label: 'Flats & Residents', icon: <Building className="w-4 h-4" /> },
          { id: 'billing', label: '2. Billing & Dues', icon: <CreditCard className="w-4 h-4" /> },
          { id: 'complaints', label: '6. Maintenance Dispatch', icon: <Wrench className="w-4 h-4" /> },
          { id: 'notices', label: '8. Circulars & Notices', icon: <Megaphone className="w-4 h-4" /> },
          { id: 'reports', label: '23. Reports & Analytics', icon: <FileText className="w-4 h-4" /> },
          { id: 'logs', label: 'Security & Audit Trail', icon: <History className="w-4 h-4" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl whitespace-nowrap transition ${
              activeAdminTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 1. OVERVIEW DASHBOARD (Feature 18) */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          {/* Top KPI Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">{t('statTotalFlats')}</span>
              <span className="text-xl font-extrabold text-slate-900 font-mono mt-1 block">{totalFlats}</span>
              <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 block">4 Blocks</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">{t('statOccupancy')}</span>
              <span className="text-xl font-extrabold text-slate-900 font-mono mt-1 block">89%</span>
              <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">114 Occupied</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">{t('statCollection')}</span>
              <span className="text-xl font-extrabold text-emerald-700 font-mono mt-1 block">₹{totalPaidAmount.toLocaleString()}</span>
              <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 block">Received this month</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">{t('statPendingBills')}</span>
              <span className="text-xl font-extrabold text-rose-600 font-mono mt-1 block">₹{totalPendingAmount.toLocaleString()}</span>
              <span className="text-[10px] text-rose-500 font-semibold mt-0.5 block">Pending payment</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">{t('statOpenComplaints')}</span>
              <span className="text-xl font-extrabold text-amber-600 font-mono mt-1 block">{openComplaintsCount}</span>
              <span className="text-[10px] text-amber-600 font-semibold mt-0.5 block">Assigned to staff</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">{t('statGateTraffic')}</span>
              <span className="text-xl font-extrabold text-blue-600 font-mono mt-1 block">{todayVisitorsCount}</span>
              <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">Entries logged</span>
            </div>
          </div>

          {/* Operational Charts & Split Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Maintenance Collections Ledger */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">October 2026 Collections Pulse</h3>
                  <p className="text-xs text-slate-500">Live collection rate across Blocks A, B, C, D</p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  88.2% Collected
                </span>
              </div>

              {/* Visual Multi-segment Progress Bar */}
              <div className="space-y-1.5">
                <div className="h-3 rounded-full bg-slate-100 flex overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: '74%' }} title="Paid On Time" />
                  <div className="bg-amber-400 h-full" style={{ width: '18%' }} title="Pending" />
                  <div className="bg-rose-500 h-full" style={{ width: '8%' }} title="Overdue" />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Paid (₹{totalPaidAmount.toLocaleString()})</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Pending</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> Overdue</span>
                </div>
              </div>

              {/* Recent Transactions List */}
              <div className="divide-y divide-slate-100 text-xs">
                {bills.map(b => (
                  <div key={b.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800">Flat {b.flatNumber}</span>
                      <span className="text-slate-400 text-[11px] ml-2 font-mono">{b.month}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">₹{b.amount}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        b.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Complaints SLA Aging */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Service Tickets SLA Monitor</h3>
                  <p className="text-xs text-slate-500">Current work orders in pipeline</p>
                </div>
                <button
                  onClick={() => setActiveAdminTab('complaints')}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  Manage All
                </button>
              </div>

              <div className="space-y-2.5">
                {complaints.map(c => (
                  <div key={c.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-700">{c.ticketNumber}</span>
                        <span className="font-bold text-slate-900">{c.category} · Flat {c.flatNumber}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        c.priority === 'Emergency' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {c.priority}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 truncate">{c.title}</p>
                    <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                      <span>Staff: {c.assignedStaffName || 'Unassigned'}</span>
                      <span className="font-semibold text-slate-700">{c.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. FLATS & RESIDENTS DIRECTORY */}
      {activeAdminTab === 'flats' && (
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900">Flats & Unit Roster</h3>
              <p className="text-xs text-slate-500">128 registered society flats across Amber, Beryl, Coral & Emerald blocks</p>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Filter flat number or resident name..."
                className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-y border-slate-100">
                <tr>
                  <th className="py-3 px-3">Flat #</th>
                  <th className="py-3 px-3">Block / Type</th>
                  <th className="py-3 px-3">Primary Resident</th>
                  <th className="py-3 px-3">Phone</th>
                  <th className="py-3 px-3">Parking Slots</th>
                  <th className="py-3 px-3">Dues Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {flats
                  .filter(f => f.flatNumber.toLowerCase().includes(searchTerm.toLowerCase()) || f.primaryResident.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(f => (
                    <tr key={f.id} className="hover:bg-slate-50/60">
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">{f.flatNumber}</td>
                      <td className="py-3 px-3 text-slate-600">{f.block} · {f.bhk} ({f.sqft} sqft)</td>
                      <td className="py-3 px-3 font-semibold text-slate-800">{f.primaryResident}</td>
                      <td className="py-3 px-3 font-mono text-slate-600">{f.phone}</td>
                      <td className="py-3 px-3 font-mono text-slate-600">{f.parkingSlots.join(', ')}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          f.maintenanceStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {f.maintenanceStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. BILLING & COLLECTIONS (Feature 2) */}
      {activeAdminTab === 'billing' && (
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">Maintenance Billing Ledger</h3>
              <p className="text-xs text-slate-500">Automated collection tracking and digital receipts</p>
            </div>
            <button
              onClick={() => alert('New batch bill run scheduled for November 2026.')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Generate Batch Bills</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-y border-slate-100">
                <tr>
                  <th className="py-3 px-3">Flat</th>
                  <th className="py-3 px-3">Period</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Breakdown</th>
                  <th className="py-3 px-3">Due Date</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Transaction / Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {bills.map(b => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-slate-900">{b.flatNumber}</td>
                    <td className="py-3 px-3 font-sans text-slate-700">{b.month}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">₹{b.amount.toLocaleString()}</td>
                    <td className="py-3 px-3 text-[11px] font-sans text-slate-500">
                      Security ₹{b.breakdown.security} · Power ₹{b.breakdown.commonElectricity} · Water ₹{b.breakdown.water}
                    </td>
                    <td className="py-3 px-3 text-slate-600">{b.dueDate}</td>
                    <td className="py-3 px-3 font-sans">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        b.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500 text-[11px]">
                      {b.receiptNumber || 'Pending payment'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. COMPLAINT DISPATCH & TICKETS (Feature 6) */}
      {activeAdminTab === 'complaints' && (
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">Maintenance Service Desk & SLA Dispatch</h3>
            <p className="text-xs text-slate-500">Assign maintenance staff and manage service aging</p>
          </div>

          <div className="space-y-3">
            {complaints.map(c => (
              <div key={c.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono font-bold text-slate-500">{c.ticketNumber} · Flat {c.flatNumber}</span>
                    <h4 className="font-bold text-sm text-slate-900 mt-0.5">{c.title}</h4>
                    <p className="text-[11px] text-slate-600 mt-1">{c.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      c.priority === 'Emergency' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {c.priority}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                      {c.status}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500">
                    Assigned: <strong className="text-slate-800">{c.assignedStaffName || 'None'}</strong>
                  </span>

                  {!c.assignedStaffName && (
                    <button
                      onClick={() => assignComplaintStaff(c.id, staffUser.id)}
                      className="px-3 py-1 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition"
                    >
                      Assign to Murugan K. (Senior Tech)
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. ANNOUNCEMENTS & CIRCULARS (Feature 8) */}
      {activeAdminTab === 'notices' && (
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">Official Society Circulars</h3>
              <p className="text-xs text-slate-500">Official broadcast notifications pushed to all resident phones</p>
            </div>
            <button
              onClick={() => setShowNoticeModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Announcement</span>
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map(ann => (
              <div key={ann.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800 text-[10px]">
                    {ann.category}
                  </span>
                  <span className="text-slate-400 text-[11px] font-mono">{ann.publishedAt}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{ann.title}</h4>
                <p className="text-slate-600 leading-relaxed text-[11px]">{ann.content}</p>
                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200">
                  Author: {ann.author} · Target: {ann.targetBlocks}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. REPORTS & ANALYTICS (Feature 23) */}
      {activeAdminTab === 'reports' && (
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">Association Operations & Financial Reports</h3>
              <p className="text-xs text-slate-500">Auditable exports for General Body Meetings (AGM)</p>
            </div>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Complete CSV</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Maintenance Ledger</span>
              <div className="text-lg font-bold font-mono text-slate-900">₹{totalPaidAmount.toLocaleString()}</div>
              <p className="text-[11px] text-slate-500">100% auditable digital collection receipts</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Average Ticket SLA</span>
              <div className="text-lg font-bold font-mono text-emerald-700">3.4 Hours</div>
              <p className="text-[11px] text-slate-500">From submission to technician resolution</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Gate Security Audits</span>
              <div className="text-lg font-bold font-mono text-blue-700">100% Pass Logged</div>
              <p className="text-[11px] text-slate-500">Zero unverified visitor clearances</p>
            </div>
          </div>
        </div>
      )}

      {/* 7. AUDIT TRAIL */}
      {activeAdminTab === 'logs' && (
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">Security & Administrative Audit Logs</h3>
            <p className="text-xs text-slate-500">Immutable chronological log of all gate clearances, payments, and dispatches</p>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {auditLogs.map(log => (
              <div key={log.id} className="py-3 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{log.action}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {log.actorRole}: {log.actorName}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">{log.details}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Notice Modal */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Broadcast Association Circular</h3>
              <button onClick={() => setShowNoticeModal(false)}><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handlePublishNotice} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Announcement Title *</label>
                <input
                  required
                  value={noticeTitle}
                  onChange={e => setNoticeTitle(e.target.value)}
                  placeholder="e.g. Scheduled Lift AMC Maintenance on Sunday"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Category</label>
                  <select
                    value={noticeCategory}
                    onChange={e => setNoticeCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="General">General</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Emergency">Emergency Alert</option>
                    <option value="Security">Security</option>
                    <option value="Events">Community Events</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Priority</label>
                  <select
                    value={noticePriority}
                    onChange={e => setNoticePriority(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="normal">Normal</option>
                    <option value="pinned">Pin to Dashboard Top</option>
                    <option value="urgent">Urgent Alert</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Notice Body / Message *</label>
                <textarea
                  required
                  rows={4}
                  value={noticeContent}
                  onChange={e => setNoticeContent(e.target.value)}
                  placeholder="Provide instructions and timings for residents..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowNoticeModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xs"
                >
                  Publish & Alert Residents
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
