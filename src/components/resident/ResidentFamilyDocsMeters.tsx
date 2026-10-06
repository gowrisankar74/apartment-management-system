import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  Gauge, 
  Download, 
  Eye, 
  Plus, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  Zap, 
  Droplet 
} from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';
import { SocietyDocument } from '../../types/community';

export const ResidentFamilyDocsMeters: React.FC = () => {
  const { 
    familyMembers, 
    documents, 
    utilityMeters, 
    addUtilityReading, 
    residentUser, 
    language 
  } = useCommunity();

  const [activeSubTab, setActiveSubTab] = useState<'family' | 'docs' | 'meters'>('family');

  // Meter Reading Modal
  const [showMeterModal, setShowMeterModal] = useState(false);
  const [meterType, setMeterType] = useState<'Electricity' | 'Water Meter'>('Electricity');
  const [currReading, setCurrReading] = useState<number>(13100);

  // Document Preview Modal
  const [previewDoc, setPreviewDoc] = useState<SocietyDocument | null>(null);

  const handleLogMeter = (e: React.FormEvent) => {
    e.preventDefault();
    addUtilityReading({
      utilityType: meterType,
      currentReading: Number(currReading),
      previousReading: meterType === 'Electricity' ? 12820 : 4260,
      ratePerUnit: meterType === 'Electricity' ? 6.5 : 4.0
    });
    setShowMeterModal(false);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Subtab Selector */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('family')}
          className={`flex-1 py-2 rounded-xl transition ${
            activeSubTab === 'family' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          Family Access (15)
        </button>
        <button
          onClick={() => setActiveSubTab('docs')}
          className={`flex-1 py-2 rounded-xl transition ${
            activeSubTab === 'docs' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          Digital Vault (16)
        </button>
        <button
          onClick={() => setActiveSubTab('meters')}
          className={`flex-1 py-2 rounded-xl transition ${
            activeSubTab === 'meters' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          Utility Meters (20)
        </button>
      </div>

      {/* Feature 15: Family Management */}
      {activeSubTab === 'family' && (
        <div className="space-y-3">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
            Authorized family members for Flat <strong>{residentUser.flatNumber}</strong> with granular role-based actions.
          </div>

          <div className="space-y-2.5">
            {familyMembers.map(member => (
              <div
                key={member.id}
                className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{member.name}</h4>
                    <span className="text-[11px] text-slate-500 font-medium">{member.relationship} · {member.phone}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Active Member
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Permitted Actions:
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    <span className={`px-2 py-0.5 rounded-md font-semibold ${member.permissions.payments ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-400'}`}>
                      Payments {member.permissions.payments ? '✓' : '✗'}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md font-semibold ${member.permissions.visitorApproval ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-400'}`}>
                      Visitor Passes {member.permissions.visitorApproval ? '✓' : '✗'}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md font-semibold ${member.permissions.facilityBooking ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-400'}`}>
                      Amenity Bookings {member.permissions.facilityBooking ? '✓' : '✗'}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md font-semibold ${member.permissions.complaints ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-400'}`}>
                      File Complaints {member.permissions.complaints ? '✓' : '✗'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feature 16: Digital Documents Vault */}
      {activeSubTab === 'docs' && (
        <div className="space-y-3">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
            Secure official document repository including bylaws, meeting minutes, and legal NOC forms.
          </div>

          <div className="space-y-2.5">
            {documents.map(doc => (
              <div
                key={doc.id}
                className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 leading-tight">{doc.title}</h4>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                      <span className="font-mono">{doc.fileType}</span>
                      <span>·</span>
                      <span>{doc.fileSize}</span>
                      <span>·</span>
                      <span>Uploaded {doc.uploadedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                    title="Preview Document"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => alert(`Downloading verified copy of ${doc.title}`)}
                    className="p-2 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feature 20: Utility Meter Tracking */}
      {activeSubTab === 'meters' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">Track monthly power & water consumption</span>
            <button
              onClick={() => setShowMeterModal(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Reading</span>
            </button>
          </div>

          <div className="space-y-3">
            {utilityMeters.map(m => (
              <div
                key={m.id}
                className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl ${m.utilityType === 'Electricity' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                      {m.utilityType === 'Electricity' ? <Zap className="w-4 h-4" /> : <Droplet className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{m.utilityType}</h4>
                      <p className="text-[10px] text-slate-500 font-mono">Meter #{m.meterNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-extrabold font-mono text-emerald-700">
                      ₹{m.estimatedCost.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-400">Estimated</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-xs border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Prev:</span>
                    <span className="font-mono font-semibold">{m.previousReading}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Current:</span>
                    <span className="font-mono font-semibold">{m.currentReading}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Units Used:</span>
                    <span className="font-mono font-bold text-slate-900">{m.unitsConsumed} Units</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                  <span>Billing Period: {m.billingMonth}</span>
                  <span>Rate: ₹{m.ratePerUnit}/unit</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meter Log Modal */}
      {showMeterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Record Sub-Meter Reading</h3>
              <button onClick={() => setShowMeterModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleLogMeter} className="space-y-3 pt-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Utility Type</label>
                <select
                  value={meterType}
                  onChange={e => setMeterType(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Electricity">Electricity Meter (TNEB)</option>
                  <option value="Water Meter">Piped Drinking Water Meter</option>
                </select>
              </div>
              <div>
                <label className="font-semibold block mb-1">Current Dial Reading *</label>
                <input
                  type="number"
                  required
                  value={currReading}
                  onChange={e => setCurrReading(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-bold"
              >
                Save Reading & Compute
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Doc Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">{previewDoc.title}</h3>
              <button onClick={() => setPreviewDoc(null)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Official Association Record</span>
              </div>
              <p>
                This document is digitally stamped and published by the Grand Palms Managing Committee for flat owners and residents.
              </p>
              <div className="font-mono text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                Category: {previewDoc.category} · File Size: {previewDoc.fileSize}
              </div>
            </div>
            <button
              onClick={() => setPreviewDoc(null)}
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs"
            >
              Close Document
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
