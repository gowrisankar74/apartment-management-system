import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  QrCode, 
  UserPlus, 
  Package, 
  Car, 
  Phone, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  ArrowDownLeft, 
  ArrowUpRight,
  UserCheck,
  Building,
  Key,
  ScanLine,
  Camera
} from 'lucide-react';
import { useCommunity } from '../../context/CommunityContext';
import { VisitorPass } from '../../types/community';

interface Props {
  onOpenSos: () => void;
}

export const SecurityApp: React.FC<Props> = ({ onOpenSos }) => {
  const { 
    securityUser, 
    visitorPasses, 
    securityScanPass, 
    securityLogEntry, 
    securityLogExit, 
    securityLogUnexpectedVisitor, 
    securityLogDelivery, 
    flats, 
    deliveries, 
    vehicles,
    t, 
    language 
  } = useCommunity();

  const [activeTab, setActiveTab] = useState<'pass_lookup' | 'unexpected' | 'delivery' | 'vehicles' | 'directory'>('pass_lookup');

  // 1. Pass Lookup state
  const [passInput, setPassInput] = useState('GP-8421');
  const [scannedPass, setScannedPass] = useState<VisitorPass | null>(null);
  const [lookupFeedback, setLookupFeedback] = useState<string | null>(null);
  const [isScanningQR, setIsScanningQR] = useState(false);
  const [scanLaserActive, setScanLaserActive] = useState(false);
  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null);

  const handleSimulateQRScan = (codeToScan?: string) => {
    // Pick an active expected or checked-in visitor pass from database
    const availableCodes = visitorPasses.map(p => p.passCode);
    const chosenCode = codeToScan || (availableCodes.length > 0 ? availableCodes[0] : 'GP-8421');

    setIsScanningQR(true);
    setScanLaserActive(true);
    setLookupFeedback(null);

    // Optical viewfinder camera simulation sequence
    setTimeout(() => {
      setPassInput(chosenCode);
      setLastScannedCode(chosenCode);
      setScanLaserActive(false);

      const pass = securityScanPass(chosenCode);
      if (pass) {
        setScannedPass(pass);
        setLookupFeedback(`Scanned QR Pass "${chosenCode}" successfully! Verified for ${pass.visitorName}.`);
      } else {
        setLookupFeedback(`Scanned code "${chosenCode}" does not match active records.`);
      }

      // Automatically collapse scanner view after confirmation
      setTimeout(() => {
        setIsScanningQR(false);
      }, 750);
    }, 850);
  };

  // 2. Unexpected Visitor state
  const [unexName, setUnexName] = useState('');
  const [unexPhone, setUnexPhone] = useState('');
  const [unexFlat, setUnexFlat] = useState('A-402');
  const [unexPurpose, setUnexPurpose] = useState<VisitorPass['purpose']>('Delivery');
  const [unexVehicle, setUnexVehicle] = useState('');
  const [unexSubmitted, setUnexSubmitted] = useState(false);

  // 3. Delivery Package state
  const [delFlat, setDelFlat] = useState('A-402');
  const [delCompany, setDelCompany] = useState('Amazon Prime');
  const [delTracking, setDelTracking] = useState('');
  const [delSuccess, setDelSuccess] = useState(false);

  // 4. Directory Search state
  const [dirSearch, setDirSearch] = useState('');

  // 5. Vehicle Search state
  const [vehSearch, setVehSearch] = useState('');

  const handleLookup = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLookupFeedback(null);
    const pass = securityScanPass(passInput);
    if (pass) {
      setScannedPass(pass);
    } else {
      setScannedPass(null);
      setLookupFeedback(`No pass found for code "${passInput}". Please check the 6-character code.`);
    }
  };

  const handleRecordEntry = (passId: string) => {
    securityLogEntry(passId);
    setScannedPass(null);
    setLookupFeedback('Gate entry recorded successfully. Visitor cleared!');
  };

  const handleRecordExit = (passId: string) => {
    securityLogExit(passId);
    setScannedPass(null);
    setLookupFeedback('Visitor exit recorded successfully.');
  };

  const handleSendUnexpectedRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unexName.trim()) return;

    securityLogUnexpectedVisitor({
      visitorName: unexName,
      visitorPhone: unexPhone || '+91 91760 00000',
      flatNumber: unexFlat,
      purpose: unexPurpose,
      vehicleNumber: unexVehicle
    });

    setUnexSubmitted(true);
    setTimeout(() => {
      setUnexSubmitted(false);
      setUnexName('');
      setUnexPhone('');
      setUnexVehicle('');
    }, 2500);
  };

  const handleRecordDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    securityLogDelivery({
      flatNumber: delFlat,
      courierCompany: delCompany,
      trackingNumber: delTracking || `IN-DEL-${Math.floor(100000 + Math.random() * 900000)}`
    });

    setDelSuccess(true);
    setTimeout(() => {
      setDelSuccess(false);
      setDelTracking('');
    }, 2500);
  };

  const filteredFlats = flats.filter(f => 
    f.flatNumber.toLowerCase().includes(dirSearch.toLowerCase()) ||
    f.primaryResident.toLowerCase().includes(dirSearch.toLowerCase()) ||
    f.block.toLowerCase().includes(dirSearch.toLowerCase())
  );

  const filteredVehicles = vehicles.filter(v => 
    v.plateNumber.toLowerCase().includes(vehSearch.toLowerCase()) ||
    v.ownerName.toLowerCase().includes(vehSearch.toLowerCase()) ||
    v.flatNumber.toLowerCase().includes(vehSearch.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-20 max-w-xl mx-auto">
      {/* Officer Station Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white p-4.5 rounded-3xl shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight">{t('gateTitle')}</h2>
              <p className="text-[11px] text-slate-300">{securityUser.name} · {securityUser.badgeNumber}</p>
            </div>
          </div>
          <button
            onClick={onOpenSos}
            className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 animate-pulse"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Gate Siren</span>
          </button>
        </div>

        {/* Real-time Counts */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
          <div className="bg-white/5 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block">Today Visitors</span>
            <span className="text-sm font-extrabold font-mono text-emerald-400">
              {visitorPasses.filter(p => p.status === 'checked_in' || p.status === 'checked_out').length + 8}
            </span>
          </div>
          <div className="bg-white/5 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block">Gate Parcels</span>
            <span className="text-sm font-extrabold font-mono text-blue-400">
              {deliveries.filter(d => d.status === 'Waiting at Gate').length}
            </span>
          </div>
          <div className="bg-white/5 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block">Vehicles Inside</span>
            <span className="text-sm font-extrabold font-mono text-amber-400">
              {vehicles.filter(v => v.status === 'Inside').length}
            </span>
          </div>
        </div>
      </div>

      {/* Big Operational Navigation Tabs */}
      <div className="grid grid-cols-5 gap-1.5 bg-slate-200/80 p-1.5 rounded-2xl text-xs font-semibold">
        {[
          { id: 'pass_lookup', label: 'Pass Check', icon: <QrCode className="w-4 h-4" /> },
          { id: 'unexpected', label: 'New Guest', icon: <UserPlus className="w-4 h-4" /> },
          { id: 'delivery', label: 'Delivery', icon: <Package className="w-4 h-4" /> },
          { id: 'vehicles', label: 'Vehicles', icon: <Car className="w-4 h-4" /> },
          { id: 'directory', label: 'Directory', icon: <Phone className="w-4 h-4" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition min-h-[50px] ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white/70 text-slate-700 hover:bg-white'
            }`}
          >
            {tab.icon}
            <span className="text-[10px] mt-1 tracking-tight truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 1. PASS LOOKUP & QR SCAN */}
      {activeTab === 'pass_lookup' && (
        <div id="pass_lookup" className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900">{t('passLookup')}</h3>
            <p className="text-xs text-slate-500">Scan QR or enter 6-character visitor code</p>
          </div>

          <form onSubmit={handleLookup} className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={passInput}
                onChange={e => setPassInput(e.target.value.toUpperCase())}
                placeholder={t('enterPassPlaceholder')}
                className="w-full pl-3.5 pr-22 py-3 rounded-xl border border-slate-300 font-mono text-sm tracking-wider uppercase font-bold focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              />
              <button
                type="button"
                onClick={() => handleSimulateQRScan()}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-2xs"
                title="Scan QR Code"
                aria-label="Scan QR Code"
              >
                <ScanLine className="w-3.5 h-3.5 text-emerald-600" />
                <span>Scan</span>
              </button>
            </div>

            <button
              type="submit"
              className="px-4 py-3 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800 transition active:scale-95 shrink-0"
            >
              Verify
            </button>
          </form>

          {/* Simulated Optical Viewfinder Camera Scanner */}
          {isScanningQR && (
            <div className="p-4 bg-slate-950 text-white rounded-2xl border-2 border-emerald-500 shadow-xl space-y-3 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Camera className="w-4 h-4 animate-pulse" />
                  <span>Optical Gate QR Scanner Active</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsScanningQR(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>

              {/* Viewfinder simulation with laser line */}
              <div className="relative w-44 h-44 mx-auto bg-slate-900 rounded-2xl border-2 border-dashed border-emerald-400/80 p-2 flex flex-col items-center justify-center overflow-hidden shadow-inner">
                {/* Viewfinder corner brackets */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />

                {/* Sweeping Laser Line */}
                {scanLaserActive && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#34d399] animate-bounce top-1/3" />
                )}

                <QrCode className="w-20 h-20 text-slate-600 opacity-60" />
                <span className="text-[10px] font-mono text-emerald-400 mt-2 font-semibold">
                  {scanLaserActive ? 'ALIGNING QR PASS...' : `SCANNED: ${lastScannedCode}`}
                </span>
              </div>

              <div className="text-center text-xs text-slate-300">
                {scanLaserActive ? (
                  <span className="text-emerald-300 font-medium animate-pulse">
                    Scanning visitor's mobile QR pass...
                  </span>
                ) : (
                  <span className="text-emerald-400 font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Captured code {lastScannedCode}! Populating pass field...
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Quick pass shortcuts for testing */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Quick test codes:</span>
            {['GP-8421', 'GP-3319', 'GP-9022'].map(code => (
              <button
                key={code}
                onClick={() => { setPassInput(code); const p = securityScanPass(code); if (p) setScannedPass(p); }}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-mono text-[11px] text-slate-800 font-bold"
              >
                {code}
              </button>
            ))}
          </div>

          {lookupFeedback && (
            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-200">
              {lookupFeedback}
            </div>
          )}

          {/* Scanned Pass Details */}
          {scannedPass && (
            <div className="p-4 bg-emerald-50/70 border-2 border-emerald-500 rounded-2xl space-y-3 animate-in zoom-in-95">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-300">
                    PASS VERIFIED
                  </span>
                  <h4 className="font-bold text-base text-slate-900 mt-1">
                    {scannedPass.visitorName}
                  </h4>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Destination: <strong className="text-slate-900">Flat {scannedPass.flatNumber}</strong> ({scannedPass.hostName})
                  </div>
                </div>
                <span className="text-sm font-mono font-black text-emerald-900 bg-white px-2.5 py-1 rounded-xl border border-emerald-200">
                  {scannedPass.passCode}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-white p-2.5 rounded-xl border border-emerald-100">
                <div><strong>Purpose:</strong> {scannedPass.purpose}</div>
                <div><strong>Phone:</strong> {scannedPass.visitorPhone}</div>
                {scannedPass.vehicleNumber && <div><strong>Vehicle:</strong> {scannedPass.vehicleNumber}</div>}
                <div><strong>Status:</strong> <span className="font-semibold text-emerald-700">{scannedPass.status}</span></div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleRecordEntry(scannedPass.id)}
                  className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
                >
                  <ArrowDownLeft className="w-4 h-4" />
                  <span>Record Entry (Check-In)</span>
                </button>
                <button
                  onClick={() => handleRecordExit(scannedPass.id)}
                  className="py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Record Exit (Check-Out)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. UNEXPECTED VISITOR INTAKE */}
      {activeTab === 'unexpected' && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900">{t('logUnexpectedVisitor')}</h3>
            <p className="text-xs text-slate-500">Sends instant popup approval to resident's device</p>
          </div>

          {unexSubmitted ? (
            <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-sm text-slate-900">Request Sent to Resident!</h4>
              <p className="text-xs text-slate-600">
                Holding visitor at Gate 1 turnstile. Waiting for resident tap on mobile...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendUnexpectedRequest} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Target Flat Number *</label>
                  <select
                    value={unexFlat}
                    onChange={e => setUnexFlat(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold bg-white text-sm"
                  >
                    {flats.map(f => (
                      <option key={f.id} value={f.flatNumber}>{f.flatNumber} ({f.primaryResident.split(' ')[0]})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Visit Purpose</label>
                  <select
                    value={unexPurpose}
                    onChange={e => setUnexPurpose(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Delivery">Delivery Executive</option>
                    <option value="Cab">Ola / Uber Cab</option>
                    <option value="Maintenance">Service / Repair</option>
                    <option value="Guest">Personal Guest</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Visitor Full Name *</label>
                <input
                  required
                  type="text"
                  value={unexName}
                  onChange={e => setUnexName(e.target.value)}
                  placeholder="e.g. Ramesh (Zomato Rider)"
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    value={unexPhone}
                    onChange={e => setUnexPhone(e.target.value)}
                    placeholder="+91 98000 11223"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Vehicle Plate (Opt)</label>
                  <input
                    type="text"
                    value={unexVehicle}
                    onChange={e => setUnexVehicle(e.target.value)}
                    placeholder="TN-09-EV-3311"
                    className="w-full p-2.5 rounded-xl border border-slate-200 uppercase"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition"
              >
                Dispatch Clearance Request to Resident Phone
              </button>
            </form>
          )}
        </div>
      )}

      {/* 3. COURIER PACKAGE INTAKE */}
      {activeTab === 'delivery' && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-sm text-slate-900">{t('logDeliveryCourier')}</h3>
            <p className="text-xs text-slate-500">Generates OTP and notifies resident to collect</p>
          </div>

          {delSuccess ? (
            <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-sm text-slate-900">Package Logged at Gate 1!</h4>
              <p className="text-xs text-slate-600">
                Resident notified with security pickup OTP.
              </p>
            </div>
          ) : (
            <form onSubmit={handleRecordDelivery} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Destination Flat *</label>
                  <select
                    value={delFlat}
                    onChange={e => setDelFlat(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-bold bg-white"
                  >
                    {flats.map(f => (
                      <option key={f.id} value={f.flatNumber}>{f.flatNumber}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Courier Company</label>
                  <select
                    value={delCompany}
                    onChange={e => setDelCompany(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Amazon Prime">Amazon Prime</option>
                    <option value="Flipkart Logistics">Flipkart</option>
                    <option value="BlueDart Courier">BlueDart</option>
                    <option value="Delhivery">Delhivery</option>
                    <option value="Swiggy Instamart">Swiggy Instamart</option>
                    <option value="Zomato">Zomato</option>
                    <option value="India Post">India Post SpeedPost</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Tracking Number / AWB</label>
                <input
                  type="text"
                  value={delTracking}
                  onChange={e => setDelTracking(e.target.value)}
                  placeholder="e.g. IN-AMZ-994821"
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition"
              >
                Log Parcel & Send Resident OTP
              </button>
            </form>
          )}
        </div>
      )}

      {/* 4. VEHICLE MOVEMENT CHECK */}
      {activeTab === 'vehicles' && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">{t('logVehicleMovement')}</h3>
              <p className="text-xs text-slate-500">Instant registration plate verification</p>
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={vehSearch}
              onChange={e => setVehSearch(e.target.value)}
              placeholder="Search vehicle plate (e.g. TN-09)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-mono uppercase"
            />
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto">
            {filteredVehicles.map(veh => (
              <div
                key={veh.id}
                className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs hover:bg-slate-50"
              >
                <div>
                  <span className="font-mono font-bold text-slate-900 text-sm">{veh.plateNumber}</span>
                  <div className="text-[11px] text-slate-600">{veh.makeModel} · Flat {veh.flatNumber}</div>
                  <div className="text-[10px] text-slate-400">Owner: {veh.ownerName} · Bay: {veh.parkingSlot}</div>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  veh.status === 'Inside' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {veh.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. RESIDENT DIRECTORY LOOKUP */}
      {activeTab === 'directory' && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900">{t('directoryLookup')}</h3>
            <p className="text-xs text-slate-500">Quick flat intercom contact list</p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={dirSearch}
              onChange={e => setDirSearch(e.target.value)}
              placeholder="Search by Flat or Resident Name..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto">
            {filteredFlats.map(flat => (
              <div
                key={flat.id}
                className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs hover:bg-slate-50"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900 text-sm">{flat.flatNumber}</span>
                    <span className="text-[10px] text-slate-500">{flat.block}</span>
                  </div>
                  <div className="font-semibold text-slate-700 mt-0.5">{flat.primaryResident}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{flat.phone}</div>
                </div>

                <a
                  href={`tel:${flat.phone}`}
                  className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition"
                  title="Intercom Dial"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
