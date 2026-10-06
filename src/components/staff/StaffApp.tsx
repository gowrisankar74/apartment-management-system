import React, { useState } from 'react';
import { 
  Wrench, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  User, 
  Phone, 
  FileText, 
  Check, 
  ChevronRight,
  Shield,
  X
} from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';
import { Complaint, ComplaintStatus } from '../../types/community';

export const StaffApp: React.FC = () => {
  const { staffUser, complaints, updateComplaintStatus, language } = useCommunity();
  const [selectedTicket, setSelectedTicket] = useState<Complaint | null>(null);
  const [techNotes, setTechNotes] = useState('');
  const [statusToSet, setStatusToSet] = useState<ComplaintStatus>('In Progress');

  // Filter complaints assigned to this staff or open unassigned tickets
  const myJobs = complaints.filter(c => c.assignedStaffId === staffUser.id || !c.assignedStaffId);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;

    updateComplaintStatus(
      selectedTicket.id, 
      statusToSet, 
      techNotes || undefined, 
      statusToSet === 'Resolved' ? (techNotes || 'Work completed on-site') : undefined
    );
    setSelectedTicket(null);
    setTechNotes('');
  };

  return (
    <div className="space-y-4 pb-20 max-w-xl mx-auto">
      {/* Staff Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-purple-950 text-white p-4.5 rounded-3xl shadow-sm space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight">Maintenance Technician Portal</h2>
            <p className="text-xs text-slate-300">{staffUser.name} · {staffUser.specialization}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
          <span className="text-slate-300">Active Work Orders:</span>
          <span className="font-mono font-bold text-emerald-400 bg-white/10 px-2 py-0.5 rounded">
            {myJobs.filter(j => j.status !== 'Resolved' && j.status !== 'Closed').length} Pending
          </span>
        </div>
      </div>

      {/* Work Orders List */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Assigned Service Tickets ({myJobs.length})
        </h3>

        {myJobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-60" />
            <p className="font-bold text-slate-700">All work orders completed!</p>
          </div>
        ) : (
          myJobs.map(job => (
            <div
              key={job.id}
              onClick={() => {
                setSelectedTicket(job);
                setStatusToSet(job.status === 'Submitted' || job.status === 'Assigned' ? 'In Progress' : 'Resolved');
                setTechNotes(job.staffNotes || '');
              }}
              className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs cursor-pointer hover:border-slate-300 transition space-y-2"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-900">
                      Flat {job.flatNumber}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {job.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-800 mt-1 line-clamp-1">{job.title}</h4>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    job.priority === 'Emergency'
                      ? 'bg-rose-100 text-rose-800'
                      : job.priority === 'High'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {job.priority}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    job.status === 'Resolved' || job.status === 'Closed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : job.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {job.status}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                {job.description}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Resident: {job.residentName} ({job.residentPhone})</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  Update <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Ticket Status Update Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-purple-700 font-mono">
                  {selectedTicket.ticketNumber} · Flat {selectedTicket.flatNumber}
                </span>
                <h3 className="font-bold text-sm text-slate-900 mt-0.5">{selectedTicket.title}</h3>
              </div>
              <button onClick={() => setSelectedTicket(null)}><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Set Work Status</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStatusToSet('In Progress')}
                    className={`py-2 rounded-xl font-bold border transition ${
                      statusToSet === 'In Progress' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusToSet('Resolved')}
                    className={`py-2 rounded-xl font-bold border transition ${
                      statusToSet === 'Resolved' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Technician Remarks & Materials Used</label>
                <textarea
                  rows={3}
                  value={techNotes}
                  onChange={e => setTechNotes(e.target.value)}
                  placeholder="e.g. Replaced leaking valve washer with new brass fitting. Tested water pressure."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-xs transition"
                >
                  Update Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
