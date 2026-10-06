import React, { useState } from 'react';
import { 
  Wrench, 
  Plus, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  RotateCcw, 
  Image as ImageIcon, 
  X, 
  User, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';
import { Complaint, ComplaintCategory, ComplaintPriority } from '../../types/community';

export const ResidentComplaints: React.FC = () => {
  const { 
    complaints, 
    raiseComplaint, 
    reopenComplaint, 
    updateComplaintStatus, 
    t, 
    residentUser,
    language 
  } = useCommunity();

  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Complaint | null>(null);
  const [reopenReason, setReopenReason] = useState('');
  const [showReopenInput, setShowReopenInput] = useState(false);

  // Form
  const [category, setCategory] = useState<ComplaintCategory>('Plumbing');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<ComplaintPriority>('Medium');
  const [attachedPhoto, setAttachedPhoto] = useState<string | undefined>(undefined);

  const myComplaints = complaints.filter(c => c.flatNumber === residentUser.flatNumber);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    raiseComplaint({
      category,
      title,
      description,
      priority,
      imageUrl: attachedPhoto
    });

    setTitle('');
    setDescription('');
    setAttachedPhoto(undefined);
    setShowModal(false);
  };

  const handleSimulatePhoto = () => {
    setAttachedPhoto('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80');
  };

  const handleReopen = (ticketId: string) => {
    if (!reopenReason.trim()) return;
    reopenComplaint(ticketId, reopenReason);
    setReopenReason('');
    setShowReopenInput(false);
    setSelectedTicket(null);
  };

  const handleCloseTicket = (ticketId: string) => {
    updateComplaintStatus(ticketId, 'Closed', undefined, 'Closed by resident.');
    setSelectedTicket(null);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            {t('complaintsTitle')}
          </h2>
          <p className="text-xs text-slate-500">
            {language === 'ta' ? 'தடையில்லா பராமரிப்பு மற்றும் சேவை டிக்கெட்டுகள்' : 'Trackable ticketing with technician dispatch & SLA tracking'}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>{t('fileNewComplaint')}</span>
        </button>
      </div>

      {/* Tickets List */}
      <div className="space-y-3">
        {myComplaints.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400">
            <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-500 opacity-80" />
            <p className="text-xs font-semibold text-slate-700">No active maintenance complaints</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Everything in Flat A-402 is running smoothly.</p>
          </div>
        ) : (
          myComplaints.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedTicket(item)}
              className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs cursor-pointer hover:border-slate-300 transition space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-500 font-bold">
                      {item.ticketNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">
                    {item.title}
                  </h4>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.priority === 'Emergency'
                      ? 'bg-rose-100 text-rose-800'
                      : item.priority === 'High'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {item.priority}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === 'Resolved' || item.status === 'Closed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 line-clamp-2">
                {item.description}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.createdAt}
                </span>
                {item.assignedStaffName && (
                  <span className="flex items-center gap-1 text-slate-700 font-medium truncate max-w-[160px]">
                    <User className="w-3 h-3 text-emerald-600" />
                    {item.assignedStaffName}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Ticket Detail & Reopen Drawer */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-500">
                  {selectedTicket.ticketNumber} · {selectedTicket.category}
                </span>
                <h3 className="font-bold text-sm text-slate-900 mt-0.5">{selectedTicket.title}</h3>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-500 block mb-0.5">Description:</span>
                <p className="text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                  {selectedTicket.description}
                </p>
              </div>

              {selectedTicket.imageUrl && (
                <div>
                  <span className="font-bold text-slate-500 block mb-1">Attached Inspection Photo:</span>
                  <img
                    src={selectedTicket.imageUrl}
                    alt="Complaint attachment"
                    className="w-full h-36 object-cover rounded-xl border border-slate-200"
                  />
                </div>
              )}

              {/* Status progression bar */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                <span className="font-bold text-slate-500 block text-[11px]">Workflow Status:</span>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-700">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">1. Submitted</span>
                  <span>➔</span>
                  <span className={`px-2 py-0.5 rounded ${selectedTicket.assignedStaffName ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200'}`}>
                    2. Assigned
                  </span>
                  <span>➔</span>
                  <span className={`px-2 py-0.5 rounded ${selectedTicket.status === 'In Progress' || selectedTicket.status === 'Resolved' || selectedTicket.status === 'Closed' ? 'bg-blue-100 text-blue-800' : 'bg-slate-200'}`}>
                    3. Work
                  </span>
                  <span>➔</span>
                  <span className={`px-2 py-0.5 rounded ${selectedTicket.status === 'Resolved' || selectedTicket.status === 'Closed' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200'}`}>
                    4. Done
                  </span>
                </div>
              </div>

              {selectedTicket.staffNotes && (
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl space-y-0.5">
                  <span className="font-bold text-blue-900 block text-[11px]">Technician Remarks:</span>
                  <p className="text-blue-800 leading-relaxed">{selectedTicket.staffNotes}</p>
                </div>
              )}

              {selectedTicket.reopenReason && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-0.5">
                  <span className="font-bold text-amber-900 block text-[11px]">Reopen Note from Resident:</span>
                  <p className="text-amber-800 leading-relaxed">{selectedTicket.reopenReason}</p>
                </div>
              )}

              {/* Action Buttons for Resolved Tickets */}
              {selectedTicket.status === 'Resolved' && (
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  {!showReopenInput ? (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setShowReopenInput(true)}
                        className="py-2.5 px-3 rounded-xl border border-amber-300 text-amber-800 bg-amber-50 hover:bg-amber-100 font-bold transition flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{t('reopenTicket')}</span>
                      </button>
                      <button
                        onClick={() => handleCloseTicket(selectedTicket.id)}
                        className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{t('closeTicket')}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={reopenReason}
                        onChange={e => setReopenReason(e.target.value)}
                        placeholder="State why issue is not resolved..."
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowReopenInput(false)}
                          className="flex-1 py-2 rounded-xl border border-slate-200 font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleReopen(selectedTicket.id)}
                          className="flex-1 py-2 rounded-xl bg-amber-600 text-white font-bold"
                        >
                          Confirm Reopen
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Complaint Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">{t('fileNewComplaint')}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 pt-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">{t('categoryLabel')}</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as ComplaintCategory)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Plumbing">Plumbing & Water Leakage</option>
                  <option value="Electrical">Electrical & Power Socket</option>
                  <option value="Lift">Passenger Lift & Elevator</option>
                  <option value="Water">Water Pressure / STP Supply</option>
                  <option value="Cleaning">Housekeeping & Garbage</option>
                  <option value="Security">Security & Intercom</option>
                  <option value="Parking">Basement Parking Dispute</option>
                  <option value="Other">Other Community Issue</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Issue Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Master bathroom sink drain clogged"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">{t('descriptionLabel')} *</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Provide exact details for maintenance technician..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">{t('priorityLabel')}</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['Low', 'Medium', 'High', 'Emergency'] as const).map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`py-1.5 rounded-lg font-semibold text-[11px] border transition ${
                        priority === p
                          ? p === 'Emergency'
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Upload Simulator */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">{t('photoUpload')}</label>
                {attachedPhoto ? (
                  <div className="relative rounded-xl overflow-hidden border border-slate-200">
                    <img src={attachedPhoto} alt="Preview" className="w-full h-24 object-cover" />
                    <button
                      type="button"
                      onClick={() => setAttachedPhoto(undefined)}
                      className="absolute top-1.5 right-1.5 p-1 bg-black/70 text-white rounded-full"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSimulatePhoto}
                    className="w-full py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-emerald-500 hover:text-emerald-700 flex items-center justify-center gap-1.5 font-medium transition"
                  >
                    <ImageIcon className="w-4 h-4 text-slate-400" />
                    <span>Attach Evidence Photo</span>
                  </button>
                )}
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs transition"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
