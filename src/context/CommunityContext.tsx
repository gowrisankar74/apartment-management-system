import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserRole,
  Language,
  CommunityInfo,
  ResidentUser,
  SecurityUser,
  AdminUser,
  StaffUser,
  Flat,
  MaintenanceBill,
  VisitorPass,
  Vehicle,
  ParkingSlot,
  Complaint,
  ComplaintStatus,
  Facility,
  FacilityBooking,
  Announcement,
  CommunityPoll,
  CommunityEvent,
  DeliveryPackage,
  LocalVendor,
  MarketplaceListing,
  EmergencySOSAlert,
  FamilyMember,
  SocietyDocument,
  UtilityReading,
  LostFoundItem,
  PetRecord,
  AuditLogItem,
  AppNotification
} from '../types/community';
import {
  initialCommunity,
  initialResidentUser,
  initialSecurityUser,
  initialAdminUser,
  initialStaffUser,
  initialFlats,
  initialBills,
  initialVisitorPasses,
  initialVehicles,
  initialParkingSlots,
  initialComplaints,
  initialFacilities,
  initialBookings,
  initialAnnouncements,
  initialPolls,
  initialEvents,
  initialDeliveries,
  initialVendors,
  initialMarketplace,
  initialSOSAlerts,
  initialFamilyMembers,
  initialDocuments,
  initialMeters,
  initialLostFound,
  initialPets,
  initialAuditLogs,
  initialNotifications
} from '../data/seedData';
import { getTranslation } from '../i18n/translations';

interface CommunityContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: any) => string;
  viewMode: 'mobile' | 'full';
  setViewMode: (mode: 'mobile' | 'full') => void;

  community: CommunityInfo;
  residentUser: ResidentUser;
  securityUser: SecurityUser;
  adminUser: AdminUser;
  staffUser: StaffUser;

  flats: Flat[];
  bills: MaintenanceBill[];
  visitorPasses: VisitorPass[];
  vehicles: Vehicle[];
  parkingSlots: ParkingSlot[];
  complaints: Complaint[];
  facilities: Facility[];
  facilityBookings: FacilityBooking[];
  announcements: Announcement[];
  polls: CommunityPoll[];
  events: CommunityEvent[];
  deliveries: DeliveryPackage[];
  vendors: LocalVendor[];
  marketplace: MarketplaceListing[];
  sosAlerts: EmergencySOSAlert[];
  familyMembers: FamilyMember[];
  documents: SocietyDocument[];
  utilityMeters: UtilityReading[];
  lostFound: LostFoundItem[];
  pets: PetRecord[];
  auditLogs: AuditLogItem[];
  notifications: AppNotification[];

  // Interactive Action Triggers
  activeUnexpectedVisitor: VisitorPass | null;
  setActiveUnexpectedVisitor: (pass: VisitorPass | null) => void;
  activeSosAlarm: EmergencySOSAlert | null;
  setActiveSosAlarm: (alert: EmergencySOSAlert | null) => void;
  viewingReceipt: MaintenanceBill | null;
  setViewingReceipt: (bill: MaintenanceBill | null) => void;

  // Actions
  payBill: (billId: string, method?: string) => void;
  createVisitorPass: (pass: Partial<VisitorPass>) => VisitorPass;
  respondUnexpectedVisitor: (passId: string, allow: boolean) => void;
  securityScanPass: (passCode: string) => VisitorPass | undefined;
  securityLogEntry: (passId: string, notes?: string) => void;
  securityLogExit: (passId: string) => void;
  securityLogUnexpectedVisitor: (data: {
    visitorName: string;
    visitorPhone: string;
    flatNumber: string;
    purpose: VisitorPass['purpose'];
    vehicleNumber?: string;
  }) => VisitorPass;
  securityLogDelivery: (pkg: {
    flatNumber: string;
    courierCompany: string;
    trackingNumber: string;
  }) => void;
  collectDelivery: (deliveryId: string) => void;
  raiseComplaint: (data: {
    category: Complaint['category'];
    title: string;
    description: string;
    priority: Complaint['priority'];
    imageUrl?: string;
  }) => Complaint;
  assignComplaintStaff: (complaintId: string, staffId: string) => void;
  updateComplaintStatus: (complaintId: string, status: ComplaintStatus, notes?: string, resolution?: string) => void;
  reopenComplaint: (complaintId: string, reason: string) => void;
  bookFacility: (data: {
    facilityId: string;
    date: string;
    timeSlot: string;
    guestsCount: number;
  }) => FacilityBooking | null;
  cancelBooking: (bookingId: string) => void;
  votePoll: (pollId: string, optionId: string) => void;
  toggleEventRsvp: (eventId: string) => void;
  triggerSOS: (emergencyType: EmergencySOSAlert['emergencyType']) => void;
  resolveSOS: (alertId: string, notes: string) => void;
  postMarketplaceItem: (item: Partial<MarketplaceListing>) => void;
  markMarketplaceSold: (itemId: string) => void;
  postLostFound: (item: Partial<LostFoundItem>) => void;
  resolveLostFound: (itemId: string) => void;
  addPet: (pet: Partial<PetRecord>) => void;
  addUtilityReading: (reading: Partial<UtilityReading>) => void;
  publishAnnouncement: (announcement: Partial<Announcement>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  resetToDemo: () => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

const STORAGE_PREFIX = 'apt_community_v1_';

export const CommunityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states with localStorage fallback
  const getStored = <T,>(key: string, defaultVal: T): T => {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      return item ? JSON.parse(item) : defaultVal;
    } catch {
      return defaultVal;
    }
  };

  const [role, setRoleState] = useState<UserRole>(() => getStored('role', 'resident'));
  const [language, setLanguageState] = useState<Language>(() => getStored('lang', 'en'));
  const [viewMode, setViewModeState] = useState<'mobile' | 'full'>(() => getStored('viewMode', 'mobile'));

  const [bills, setBills] = useState<MaintenanceBill[]>(() => getStored('bills', initialBills));
  const [visitorPasses, setVisitorPasses] = useState<VisitorPass[]>(() => getStored('visitors', initialVisitorPasses));
  const [flats, setFlats] = useState<Flat[]>(() => getStored('flats', initialFlats));
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => getStored('vehicles', initialVehicles));
  const [parkingSlots, setParkingSlots] = useState<ParkingSlot[]>(() => getStored('parking', initialParkingSlots));
  const [complaints, setComplaints] = useState<Complaint[]>(() => getStored('complaints', initialComplaints));
  const [facilities] = useState<Facility[]>(initialFacilities);
  const [facilityBookings, setFacilityBookings] = useState<FacilityBooking[]>(() => getStored('bookings', initialBookings));
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => getStored('announcements', initialAnnouncements));
  const [polls, setPolls] = useState<CommunityPoll[]>(() => getStored('polls', initialPolls));
  const [events, setEvents] = useState<CommunityEvent[]>(() => getStored('events', initialEvents));
  const [deliveries, setDeliveries] = useState<DeliveryPackage[]>(() => getStored('deliveries', initialDeliveries));
  const [vendors] = useState<LocalVendor[]>(initialVendors);
  const [marketplace, setMarketplace] = useState<MarketplaceListing[]>(() => getStored('marketplace', initialMarketplace));
  const [sosAlerts, setSosAlerts] = useState<EmergencySOSAlert[]>(() => getStored('sos', initialSOSAlerts));
  const [familyMembers] = useState<FamilyMember[]>(initialFamilyMembers);
  const [documents] = useState<SocietyDocument[]>(initialDocuments);
  const [utilityMeters, setUtilityMeters] = useState<UtilityReading[]>(() => getStored('meters', initialMeters));
  const [lostFound, setLostFound] = useState<LostFoundItem[]>(() => getStored('lostfound', initialLostFound));
  const [pets, setPets] = useState<PetRecord[]>(() => getStored('pets', initialPets));
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => getStored('logs', initialAuditLogs));
  const [notifications, setNotifications] = useState<AppNotification[]>(() => getStored('notifs', initialNotifications));

  // Interactive modals / curtains
  const [activeUnexpectedVisitor, setActiveUnexpectedVisitor] = useState<VisitorPass | null>(() => {
    // Check if there is already a waiting approval pass
    return initialVisitorPasses.find(p => p.status === 'waiting_approval') || null;
  });
  const [activeSosAlarm, setActiveSosAlarm] = useState<EmergencySOSAlert | null>(null);
  const [viewingReceipt, setViewingReceipt] = useState<MaintenanceBill | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PREFIX + 'role', JSON.stringify(role));
      localStorage.setItem(STORAGE_PREFIX + 'lang', JSON.stringify(language));
      localStorage.setItem(STORAGE_PREFIX + 'viewMode', JSON.stringify(viewMode));
      localStorage.setItem(STORAGE_PREFIX + 'bills', JSON.stringify(bills));
      localStorage.setItem(STORAGE_PREFIX + 'visitors', JSON.stringify(visitorPasses));
      localStorage.setItem(STORAGE_PREFIX + 'complaints', JSON.stringify(complaints));
      localStorage.setItem(STORAGE_PREFIX + 'bookings', JSON.stringify(facilityBookings));
      localStorage.setItem(STORAGE_PREFIX + 'polls', JSON.stringify(polls));
      localStorage.setItem(STORAGE_PREFIX + 'events', JSON.stringify(events));
      localStorage.setItem(STORAGE_PREFIX + 'deliveries', JSON.stringify(deliveries));
      localStorage.setItem(STORAGE_PREFIX + 'marketplace', JSON.stringify(marketplace));
      localStorage.setItem(STORAGE_PREFIX + 'sos', JSON.stringify(sosAlerts));
      localStorage.setItem(STORAGE_PREFIX + 'lostfound', JSON.stringify(lostFound));
      localStorage.setItem(STORAGE_PREFIX + 'pets', JSON.stringify(pets));
      localStorage.setItem(STORAGE_PREFIX + 'meters', JSON.stringify(utilityMeters));
      localStorage.setItem(STORAGE_PREFIX + 'logs', JSON.stringify(auditLogs));
      localStorage.setItem(STORAGE_PREFIX + 'notifs', JSON.stringify(notifications));
      localStorage.setItem(STORAGE_PREFIX + 'flats', JSON.stringify(flats));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [
    role, language, viewMode, bills, visitorPasses, complaints, facilityBookings,
    polls, events, deliveries, marketplace, sosAlerts, lostFound, pets,
    utilityMeters, auditLogs, notifications, flats
  ]);

  const setRole = (newRole: UserRole) => setRoleState(newRole);
  const setLanguage = (newLang: Language) => setLanguageState(newLang);
  const setViewMode = (newMode: 'mobile' | 'full') => setViewModeState(newMode);

  const t = (key: any): string => getTranslation(language, key);

  // Helper to append audit log
  const logAction = (actorRole: string, actorName: string, action: string, details: string) => {
    const newLog: AuditLogItem = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' today',
      actorRole,
      actorName,
      action,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Helper to append notification
  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: 'notif-' + Date.now(),
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // 1. Pay Bill
  const payBill = (billId: string, method = 'UPI / Google Pay') => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const receiptNum = `RCPT-GP-2026-10-${Math.floor(1000 + Math.random() * 9000)}`;
    const txnId = `TXN-HDFC-${Math.floor(10000000 + Math.random() * 90000000)}`;

    let paidBillItem: MaintenanceBill | null = null;

    setBills(prev => prev.map(b => {
      if (b.id === billId) {
        paidBillItem = {
          ...b,
          status: 'Paid',
          paidAt: formattedDate,
          paymentMethod: method,
          receiptNumber: receiptNum,
          transactionId: txnId
        };
        return paidBillItem;
      }
      return b;
    }));

    // Update flat status
    setFlats(prev => prev.map(f => f.flatNumber === 'A-402' ? { ...f, maintenanceStatus: 'Paid' } : f));

    // Log action
    logAction('Resident', initialResidentUser.name, 'Maintenance Bill Paid', `Paid ₹4,850 via ${method} (Receipt: ${receiptNum})`);

    // Add notification
    addNotification({
      title: 'Maintenance Payment Successful',
      tamilTitle: 'பராமரிப்பு கட்டணம் வெற்றிகரமாக செலுத்தப்பட்டது',
      message: `₹4,850 received for Flat A-402. Receipt: ${receiptNum}`,
      tamilMessage: `வீடு A-402-க்கான ₹4,850 பெறப்பட்டது. ரசீது: ${receiptNum}`,
      type: 'bill',
      targetRole: 'resident',
      targetFlat: 'A-402'
    });

    // Confetti celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (paidBillItem) {
      setViewingReceipt(paidBillItem);
    }
  };

  // 2. Create Expected Visitor Pass
  const createVisitorPass = (passData: Partial<VisitorPass>): VisitorPass => {
    const code = `GP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPass: VisitorPass = {
      id: 'pass-' + Date.now(),
      passCode: code,
      flatId: initialResidentUser.flatId,
      flatNumber: initialResidentUser.flatNumber,
      hostName: initialResidentUser.name,
      visitorName: passData.visitorName || 'Guest',
      visitorPhone: passData.visitorPhone || '+91 98000 00000',
      purpose: passData.purpose || 'Guest',
      visitorType: 'expected',
      status: 'pre_approved',
      scheduledDate: passData.scheduledDate || new Date().toISOString().split('T')[0],
      scheduledTimeWindow: passData.scheduledTimeWindow || '14:00 - 18:00',
      vehicleNumber: passData.vehicleNumber || '',
      createdAt: 'Just now'
    };

    setVisitorPasses(prev => [newPass, ...prev]);
    logAction('Resident', initialResidentUser.name, 'Visitor Pass Generated', `Generated pass ${code} for ${newPass.visitorName}`);

    addNotification({
      title: `Pass Created: ${code}`,
      tamilTitle: `பாஸ் உருவாக்கப்பட்டது: ${code}`,
      message: `Pre-approved guest pass ready for ${newPass.visitorName}. Share code or QR.`,
      tamilMessage: `${newPass.visitorName} வருகைக்கான பாஸ் தயார். குறியீட்டை பகிரவும்.`,
      type: 'visitor',
      targetRole: 'resident',
      targetFlat: 'A-402'
    });

    return newPass;
  };

  // 3. Respond Unexpected Visitor (Allow / Deny)
  const respondUnexpectedVisitor = (passId: string, allow: boolean) => {
    setVisitorPasses(prev => prev.map(p => {
      if (p.id === passId) {
        return {
          ...p,
          status: allow ? 'approved' : 'denied'
        };
      }
      return p;
    }));

    const pass = visitorPasses.find(p => p.id === passId);
    const guestName = pass ? pass.visitorName : 'Visitor';

    logAction('Resident', initialResidentUser.name, allow ? 'Visitor Allowed' : 'Visitor Denied', `${allow ? 'Permitted' : 'Rejected'} gate entry for ${guestName}`);

    addNotification({
      title: allow ? 'Gate Clearance Granted' : 'Visitor Denied',
      tamilTitle: allow ? 'வாயில் அனுமதி வழங்கப்பட்டது' : 'பார்வையாளர் மறுக்கப்பட்டார்',
      message: `${guestName} entry request was ${allow ? 'APPROVED' : 'DENIED'} by resident.`,
      tamilMessage: `${guestName} நுழைவு கோரிக்கை ${allow ? 'அனுமதிக்கப்பட்டது' : 'மறுக்கப்பட்டது'}.`,
      type: 'visitor',
      targetRole: 'security'
    });

    setActiveUnexpectedVisitor(null);
  };

  // 4. Security Pass Lookup
  const securityScanPass = (passCode: string) => {
    const cleanCode = passCode.trim().toUpperCase();
    return visitorPasses.find(p => p.passCode.toUpperCase() === cleanCode);
  };

  // 5. Security Log Entry
  const securityLogEntry = (passId: string, notes?: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' today';
    setVisitorPasses(prev => prev.map(p => {
      if (p.id === passId) {
        return {
          ...p,
          status: 'checked_in',
          checkInTime: timeStr,
          guardNotes: notes || p.guardNotes || 'Verified at Gate 1'
        };
      }
      return p;
    }));

    const pass = visitorPasses.find(p => p.id === passId);
    if (pass) {
      logAction('Security Guard', initialSecurityUser.name, 'Visitor Checked In', `${pass.visitorName} checked in for Flat ${pass.flatNumber}`);
      addNotification({
        title: `${pass.visitorName} Entered Gate 1`,
        tamilTitle: `${pass.visitorName} வாயில் 1 வழியாக நுழைந்தார்`,
        message: `Your visitor ${pass.visitorName} has cleared security and is heading to Flat ${pass.flatNumber}.`,
        tamilMessage: `உங்கள் விருந்தினர் ${pass.visitorName} வாயில் பாதுகாப்பை கடந்து வருகிறார்.`,
        type: 'visitor',
        targetRole: 'resident',
        targetFlat: pass.flatNumber
      });
    }
  };

  // 6. Security Log Exit
  const securityLogExit = (passId: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' today';
    setVisitorPasses(prev => prev.map(p => {
      if (p.id === passId) {
        return {
          ...p,
          status: 'checked_out',
          checkOutTime: timeStr
        };
      }
      return p;
    }));

    const pass = visitorPasses.find(p => p.id === passId);
    if (pass) {
      logAction('Security Guard', initialSecurityUser.name, 'Visitor Checked Out', `${pass.visitorName} exited Gate 1 at ${timeStr}`);
    }
  };

  // 7. Security Log Unexpected Visitor
  const securityLogUnexpectedVisitor = (data: {
    visitorName: string;
    visitorPhone: string;
    flatNumber: string;
    purpose: VisitorPass['purpose'];
    vehicleNumber?: string;
  }): VisitorPass => {
    const code = `GP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPass: VisitorPass = {
      id: 'pass-' + Date.now(),
      passCode: code,
      flatId: 'flat-' + data.flatNumber.toLowerCase(),
      flatNumber: data.flatNumber,
      hostName: 'Flat ' + data.flatNumber,
      visitorName: data.visitorName,
      visitorPhone: data.visitorPhone,
      purpose: data.purpose,
      visitorType: 'unexpected',
      status: 'waiting_approval',
      scheduledDate: new Date().toISOString().split('T')[0],
      scheduledTimeWindow: 'Now (At Gate 1)',
      vehicleNumber: data.vehicleNumber,
      guardNotes: `Waiting at Gate 1 for resident approval`,
      createdAt: 'Just now'
    };

    setVisitorPasses(prev => [newPass, ...prev]);
    setActiveUnexpectedVisitor(newPass);

    logAction('Security Guard', initialSecurityUser.name, 'Unexpected Visitor Clearance Requested', `Prompted Flat ${data.flatNumber} for ${data.visitorName}`);

    addNotification({
      title: `Approval Request: ${data.visitorName}`,
      tamilTitle: `அனுமதி கோரிக்கை: ${data.visitorName}`,
      message: `${data.visitorName} (${data.purpose}) is at Gate 1 requesting entry to Flat ${data.flatNumber}.`,
      tamilMessage: `${data.visitorName} வாயில் 1-ல் வீடு ${data.flatNumber}-க்கு அனுமதி கோருகிறார்.`,
      type: 'visitor',
      targetRole: 'resident',
      targetFlat: data.flatNumber
    });

    return newPass;
  };

  // 8. Security Log Delivery
  const securityLogDelivery = (pkg: {
    flatNumber: string;
    courierCompany: string;
    trackingNumber: string;
  }) => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const newDel: DeliveryPackage = {
      id: 'del-' + Date.now(),
      flatId: 'flat-' + pkg.flatNumber.toLowerCase(),
      flatNumber: pkg.flatNumber,
      residentName: pkg.flatNumber === 'A-402' ? 'Priya Sharma' : 'Resident',
      residentPhone: '+91 98840 54321',
      courierCompany: pkg.courierCompany,
      trackingNumber: pkg.trackingNumber || `IN-${Math.floor(100000 + Math.random() * 900000)}`,
      receivedAt: 'Just now (' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')',
      pickupOtp: otp,
      status: 'Waiting at Gate',
      guardName: initialSecurityUser.name
    };

    setDeliveries(prev => [newDel, ...prev]);

    logAction('Security Guard', initialSecurityUser.name, 'Courier Intake Logged', `${pkg.courierCompany} parcel logged for Flat ${pkg.flatNumber} (OTP: ${otp})`);

    addNotification({
      title: `Package Received: ${pkg.courierCompany}`,
      tamilTitle: `பார்சல் பெறப்பட்டது: ${pkg.courierCompany}`,
      message: `Parcel for Flat ${pkg.flatNumber} arrived at Gate 1. Collect using OTP ${otp}.`,
      tamilMessage: `வீடு ${pkg.flatNumber}-க்கான பார்சல் வந்துள்ளது. பெறும்போது OTP ${otp} கூறவும்.`,
      type: 'delivery',
      targetRole: 'resident',
      targetFlat: pkg.flatNumber
    });
  };

  // 9. Collect Delivery
  const collectDelivery = (deliveryId: string) => {
    const timeStr = 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setDeliveries(prev => prev.map(d => {
      if (d.id === deliveryId) {
        return {
          ...d,
          status: 'Collected by Resident',
          collectedAt: timeStr
        };
      }
      return d;
    }));

    logAction('Resident', initialResidentUser.name, 'Package Collected', `Verified OTP and collected parcel from Gate 1`);
  };

  // 10. Raise Complaint
  const raiseComplaint = (data: {
    category: Complaint['category'];
    title: string;
    description: string;
    priority: Complaint['priority'];
    imageUrl?: string;
  }): Complaint => {
    const ticketNum = `TKT-2026-${Math.floor(100 + Math.random() * 900)}`;
    const nowStr = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newComplaint: Complaint = {
      id: 'cmp-' + Date.now(),
      ticketNumber: ticketNum,
      flatId: initialResidentUser.flatId,
      flatNumber: initialResidentUser.flatNumber,
      residentName: initialResidentUser.name,
      residentPhone: initialResidentUser.phone,
      category: data.category,
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: 'Submitted',
      imageUrl: data.imageUrl,
      createdAt: nowStr,
      updatedAt: nowStr
    };

    setComplaints(prev => [newComplaint, ...prev]);
    logAction('Resident', initialResidentUser.name, 'Service Ticket Filed', `Raised ${data.category} complaint #${ticketNum} (${data.priority} priority)`);

    addNotification({
      title: `Complaint Raised #${ticketNum}`,
      tamilTitle: `புதிய புகார் பதிவு #${ticketNum}`,
      message: `${data.category}: ${data.title} submitted to association desk.`,
      tamilMessage: `${data.category}: ${data.title} சங்க சேவை மேசைக்கு அனுப்பப்பட்டது.`,
      type: 'complaint',
      targetRole: 'admin'
    });

    return newComplaint;
  };

  // 11. Assign Complaint Staff
  const assignComplaintStaff = (complaintId: string, staffId: string) => {
    const staff = initialStaffUser; // Murugan K
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          status: 'Assigned',
          assignedStaffId: staffId,
          assignedStaffName: staff.name + ' (' + staff.specialization + ')',
          updatedAt: 'Just now'
        };
      }
      return c;
    }));

    logAction('Admin', initialAdminUser.name, 'Ticket Assigned to Staff', `Assigned complaint to ${staff.name}`);
  };

  // 12. Update Complaint Status (Staff / Admin)
  const updateComplaintStatus = (complaintId: string, status: ComplaintStatus, notes?: string, resolution?: string) => {
    const nowStr = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          status,
          staffNotes: notes || c.staffNotes,
          resolutionRemark: resolution || c.resolutionRemark,
          resolvedAt: status === 'Resolved' || status === 'Closed' ? nowStr : c.resolvedAt,
          updatedAt: nowStr
        };
      }
      return c;
    }));

    logAction('Staff', initialStaffUser.name, 'Ticket Status Updated', `Marked complaint as ${status}`);

    const c = complaints.find(comp => comp.id === complaintId);
    if (c) {
      addNotification({
        title: `Ticket #${c.ticketNumber} ${status}`,
        tamilTitle: `புகார் #${c.ticketNumber} ${status}`,
        message: `Your complaint regarding "${c.title}" is now ${status}.`,
        tamilMessage: `"${c.title}" தொடர்பான உங்கள் புகார் நிலை: ${status}.`,
        type: 'complaint',
        targetRole: 'resident',
        targetFlat: c.flatNumber
      });
    }
  };

  // 13. Reopen Complaint
  const reopenComplaint = (complaintId: string, reason: string) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          status: 'In Progress',
          reopenReason: reason,
          updatedAt: 'Just now'
        };
      }
      return c;
    }));

    logAction('Resident', initialResidentUser.name, 'Complaint Reopened', `Reopened complaint: ${reason}`);
  };

  // 14. Book Facility
  const bookFacility = (data: {
    facilityId: string;
    date: string;
    timeSlot: string;
    guestsCount: number;
  }): FacilityBooking | null => {
    const fac = facilities.find(f => f.id === data.facilityId);
    if (!fac) return null;

    const receiptNum = `BK-RCPT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: FacilityBooking = {
      id: 'bk-' + Date.now(),
      facilityId: fac.id,
      facilityName: fac.name,
      flatId: initialResidentUser.flatId,
      flatNumber: initialResidentUser.flatNumber,
      residentName: initialResidentUser.name,
      residentPhone: initialResidentUser.phone,
      date: data.date,
      timeSlot: data.timeSlot,
      guestsCount: data.guestsCount,
      feePaid: fac.hourlyFee,
      status: 'Confirmed',
      bookedAt: 'Just now',
      receiptNumber: receiptNum
    };

    setFacilityBookings(prev => [newBooking, ...prev]);

    logAction('Resident', initialResidentUser.name, 'Facility Reserved', `Booked ${fac.name} for ${data.date} (${data.timeSlot})`);

    addNotification({
      title: `Booking Confirmed: ${fac.name}`,
      tamilTitle: `முன்பதிவு உறுதி செய்யப்பட்டது: ${fac.tamilName}`,
      message: `Slot ${data.timeSlot} on ${data.date} confirmed. Receipt: ${receiptNum}.`,
      tamilMessage: `${data.date} அன்று ${data.timeSlot} முன்பதிவு செய்யப்பட்டது.`,
      type: 'announcement',
      targetRole: 'resident',
      targetFlat: 'A-402'
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setFacilityBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b));
    logAction('Resident', initialResidentUser.name, 'Booking Cancelled', `Cancelled facility reservation`);
  };

  // 15. Vote in Poll
  const votePoll = (pollId: string, optionId: string) => {
    setPolls(prev => prev.map(p => {
      if (p.id === pollId) {
        if (p.votedUserIds.includes(initialResidentUser.id)) return p;
        return {
          ...p,
          totalVotes: p.totalVotes + 1,
          votedUserIds: [...p.votedUserIds, initialResidentUser.id],
          options: p.options.map(opt => opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt)
        };
      }
      return p;
    }));

    logAction('Resident', initialResidentUser.name, 'Poll Vote Cast', `Voted in society poll`);
  };

  // 16. Event RSVP
  const toggleEventRsvp = (eventId: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        const hasRsvpd = !e.hasRsvpd;
        const myTag = `${initialResidentUser.flatNumber} (${initialResidentUser.name.split(' ')[0]})`;
        return {
          ...e,
          hasRsvpd,
          rsvps: hasRsvpd ? [...e.rsvps, myTag] : e.rsvps.filter(r => !r.includes(initialResidentUser.flatNumber))
        };
      }
      return e;
    }));
  };

  // 17. Trigger Emergency SOS
  const triggerSOS = (emergencyType: EmergencySOSAlert['emergencyType']) => {
    const newAlert: EmergencySOSAlert = {
      id: 'sos-' + Date.now(),
      flatNumber: initialResidentUser.flatNumber,
      residentName: initialResidentUser.name,
      residentPhone: initialResidentUser.phone,
      emergencyType,
      triggeredAt: 'Just now (' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')',
      status: 'Active Alert'
    };

    setSosAlerts(prev => [newAlert, ...prev]);
    setActiveSosAlarm(newAlert);

    logAction('Resident', initialResidentUser.name, 'EMERGENCY SOS BROADCASTED', `Triggered ${emergencyType} alarm for Flat ${initialResidentUser.flatNumber}!`);

    addNotification({
      title: `EMERGENCY SOS: Flat ${initialResidentUser.flatNumber}`,
      tamilTitle: `அவசர SOS: வீடு ${initialResidentUser.flatNumber}`,
      message: `${emergencyType} emergency reported at Flat ${initialResidentUser.flatNumber}. Security dispatched!`,
      tamilMessage: `வீடு ${initialResidentUser.flatNumber}-ல் ${emergencyType} அவசர எச்சரிக்கை!`,
      type: 'emergency'
    });
  };

  const resolveSOS = (alertId: string, notes: string) => {
    setSosAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return {
          ...a,
          status: 'Resolved',
          guardResponder: initialSecurityUser.name,
          resolutionNotes: notes
        };
      }
      return a;
    }));

    setActiveSosAlarm(null);
    logAction('Security Guard', initialSecurityUser.name, 'Emergency SOS Resolved', notes);
  };

  // 18. Marketplace actions
  const postMarketplaceItem = (item: Partial<MarketplaceListing>) => {
    const newItem: MarketplaceListing = {
      id: 'mkt-' + Date.now(),
      title: item.title || 'Item for Sale',
      category: item.category || 'Furniture',
      price: item.price || 1000,
      condition: item.condition || 'Gently Used',
      description: item.description || '',
      sellerFlat: initialResidentUser.flatNumber,
      sellerName: initialResidentUser.name,
      sellerPhone: initialResidentUser.phone,
      status: 'Available',
      postedAt: 'Just now',
      imageUrl: item.imageUrl
    };
    setMarketplace(prev => [newItem, ...prev]);
    logAction('Resident', initialResidentUser.name, 'Marketplace Listing Created', `Posted "${newItem.title}" for ₹${newItem.price}`);
  };

  const markMarketplaceSold = (itemId: string) => {
    setMarketplace(prev => prev.map(m => m.id === itemId ? { ...m, status: 'Sold' } : m));
  };

  // 19. Lost & Found
  const postLostFound = (item: Partial<LostFoundItem>) => {
    const newItem: LostFoundItem = {
      id: 'lf-' + Date.now(),
      type: item.type || 'Found',
      title: item.title || 'Item',
      category: item.category || 'Other',
      description: item.description || '',
      location: item.location || 'Community Premises',
      reportedDate: 'Today',
      reportedBy: `${initialResidentUser.name} (${initialResidentUser.flatNumber})`,
      contactPhone: initialResidentUser.phone,
      status: 'Open'
    };
    setLostFound(prev => [newItem, ...prev]);
    logAction('Resident', initialResidentUser.name, 'Lost & Found Posted', `Reported ${newItem.type}: ${newItem.title}`);
  };

  const resolveLostFound = (itemId: string) => {
    setLostFound(prev => prev.map(item => item.id === itemId ? { ...item, status: 'Resolved' } : item));
  };

  // 20. Pets
  const addPet = (pet: Partial<PetRecord>) => {
    const newPet: PetRecord = {
      id: 'pet-' + Date.now(),
      flatNumber: initialResidentUser.flatNumber,
      petName: pet.petName || 'Pet',
      species: pet.species || 'Dog',
      breed: pet.breed || 'Mixed',
      age: pet.age || '1 Year',
      vaccinated: pet.vaccinated ?? true,
      vaccineDueDate: pet.vaccineDueDate || '2027-01-01',
      ownerName: initialResidentUser.name,
      ownerPhone: initialResidentUser.phone,
      microchipId: pet.microchipId
    };
    setPets(prev => [newPet, ...prev]);
    logAction('Resident', initialResidentUser.name, 'Pet Registered', `Registered ${newPet.petName} (${newPet.breed})`);
  };

  // 21. Utility Meter Reading
  const addUtilityReading = (reading: Partial<UtilityReading>) => {
    const prev = reading.previousReading || 12820;
    const curr = reading.currentReading || 13100;
    const units = Math.max(0, curr - prev);
    const rate = reading.ratePerUnit || 6.5;
    const newReading: UtilityReading = {
      id: 'met-' + Date.now(),
      flatNumber: initialResidentUser.flatNumber,
      utilityType: reading.utilityType || 'Electricity',
      meterNumber: reading.meterNumber || 'TNEB-094-1182',
      previousReading: prev,
      currentReading: curr,
      unitsConsumed: units,
      ratePerUnit: rate,
      estimatedCost: Math.round(units * rate),
      billingMonth: 'October 2026',
      readingDate: 'Today'
    };
    setUtilityMeters(prev => [newReading, ...prev]);
    logAction('Resident', initialResidentUser.name, 'Utility Meter Logged', `Logged ${units} units for ${newReading.utilityType}`);
  };

  // 22. Publish Announcement
  const publishAnnouncement = (ann: Partial<Announcement>) => {
    const newAnn: Announcement = {
      id: 'not-' + Date.now(),
      title: ann.title || 'Notice',
      tamilTitle: ann.tamilTitle,
      content: ann.content || '',
      tamilContent: ann.tamilContent,
      category: ann.category || 'General',
      priority: ann.priority || 'normal',
      author: initialAdminUser.name,
      targetBlocks: ann.targetBlocks || 'All Blocks',
      publishedAt: 'Today',
      expiresAt: '2026-10-31',
      isRead: false
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    logAction('Admin', initialAdminUser.name, 'Notice Published', `Broadcasted: ${newAnn.title}`);
    addNotification({
      title: `Notice: ${newAnn.title}`,
      tamilTitle: `அறிவிப்பு: ${newAnn.tamilTitle || newAnn.title}`,
      message: newAnn.content.slice(0, 80) + '...',
      tamilMessage: (newAnn.tamilContent || newAnn.content).slice(0, 80) + '...',
      type: 'announcement'
    });
  };

  // 23. Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Reset to Demo Data
  const resetToDemo = () => {
    localStorage.clear();
    setRoleState('resident');
    setLanguageState('en');
    setViewModeState('mobile');
    setBills(initialBills);
    setVisitorPasses(initialVisitorPasses);
    setFlats(initialFlats);
    setVehicles(initialVehicles);
    setParkingSlots(initialParkingSlots);
    setComplaints(initialComplaints);
    setFacilityBookings(initialBookings);
    setAnnouncements(initialAnnouncements);
    setPolls(initialPolls);
    setEvents(initialEvents);
    setDeliveries(initialDeliveries);
    setMarketplace(initialMarketplace);
    setSosAlerts(initialSOSAlerts);
    setLostFound(initialLostFound);
    setPets(initialPets);
    setUtilityMeters(initialMeters);
    setAuditLogs(initialAuditLogs);
    setNotifications(initialNotifications);
    setActiveUnexpectedVisitor(initialVisitorPasses.find(p => p.status === 'waiting_approval') || null);
    setActiveSosAlarm(null);
    setViewingReceipt(null);
  };

  return (
    <CommunityContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        t,
        viewMode,
        setViewMode,
        community: initialCommunity,
        residentUser: initialResidentUser,
        securityUser: initialSecurityUser,
        adminUser: initialAdminUser,
        staffUser: initialStaffUser,
        flats,
        bills,
        visitorPasses,
        vehicles,
        parkingSlots,
        complaints,
        facilities,
        facilityBookings,
        announcements,
        polls,
        events,
        deliveries,
        vendors,
        marketplace,
        sosAlerts,
        familyMembers,
        documents,
        utilityMeters,
        lostFound,
        pets,
        auditLogs,
        notifications,
        activeUnexpectedVisitor,
        setActiveUnexpectedVisitor,
        activeSosAlarm,
        setActiveSosAlarm,
        viewingReceipt,
        setViewingReceipt,
        payBill,
        createVisitorPass,
        respondUnexpectedVisitor,
        securityScanPass,
        securityLogEntry,
        securityLogExit,
        securityLogUnexpectedVisitor,
        securityLogDelivery,
        collectDelivery,
        raiseComplaint,
        assignComplaintStaff,
        updateComplaintStatus,
        reopenComplaint,
        bookFacility,
        cancelBooking,
        votePoll,
        toggleEventRsvp,
        triggerSOS,
        resolveSOS,
        postMarketplaceItem,
        markMarketplaceSold,
        postLostFound,
        resolveLostFound,
        addPet,
        addUtilityReading,
        publishAnnouncement,
        markNotificationRead,
        markAllNotificationsRead,
        resetToDemo
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
};
