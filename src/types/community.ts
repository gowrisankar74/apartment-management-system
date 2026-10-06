export type UserRole = 'resident' | 'security' | 'admin' | 'staff';

export type Language = 'en' | 'ta';

export interface CommunityInfo {
  id: string;
  name: string;
  tamilName: string;
  city: string;
  totalFlats: number;
  totalBlocks: number;
  establishedYear: number;
  gateContact: string;
  officeContact: string;
  emergencyAmbulance: string;
  emergencyFire: string;
  emergencyPolice: string;
}

export interface ResidentUser {
  id: string;
  name: string;
  flatId: string;
  block: string;
  flatNumber: string;
  role: 'owner' | 'tenant' | 'family';
  phone: string;
  email: string;
  avatar: string;
  permissions: {
    canPayBills: boolean;
    canApproveVisitors: boolean;
    canBookFacilities: boolean;
    canRaiseComplaints: boolean;
    canManageFamily: boolean;
  };
}

export interface SecurityUser {
  id: string;
  name: string;
  badgeNumber: string;
  gateAssigned: string;
  shift: string;
  phone: string;
}

export interface AdminUser {
  id: string;
  name: string;
  designation: string;
  phone: string;
  email: string;
}

export interface StaffUser {
  id: string;
  name: string;
  specialization: string;
  phone: string;
  activeJobsCount: number;
}

export interface Flat {
  id: string;
  block: string;
  flatNumber: string;
  floor: number;
  bhk: string;
  sqft: number;
  primaryResident: string;
  residentType: 'Owner Occupied' | 'Tenant' | 'Vacant';
  phone: string;
  parkingSlots: string[];
  vehicles: string[];
  maintenanceStatus: 'Paid' | 'Pending' | 'Overdue';
}

export interface MaintenanceBill {
  id: string;
  flatId: string;
  flatNumber: string;
  month: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  breakdown: {
    security: number;
    cleaning: number;
    water: number;
    commonElectricity: number;
    liftAMC: number;
    sinkingFund: number;
    penalty: number;
  };
  paidAt?: string;
  transactionId?: string;
  paymentMethod?: string;
  receiptNumber?: string;
}

export interface VisitorPass {
  id: string;
  passCode: string; // e.g. GP-8421
  flatId: string;
  flatNumber: string;
  hostName: string;
  visitorName: string;
  visitorPhone: string;
  purpose: 'Personal' | 'Delivery' | 'Cab' | 'Maintenance' | 'Guest';
  visitorType: 'expected' | 'unexpected';
  status: 'pre_approved' | 'waiting_approval' | 'approved' | 'denied' | 'checked_in' | 'checked_out';
  scheduledDate: string;
  scheduledTimeWindow: string;
  vehicleNumber?: string;
  checkInTime?: string;
  checkOutTime?: string;
  guardNotes?: string;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  vehicleType: 'Car' | 'Bike' | 'EV Car' | 'EV Two-Wheeler';
  makeModel: string;
  ownerName: string;
  flatId: string;
  flatNumber: string;
  parkingSlot: string;
  status: 'Inside' | 'Outside';
  lastGateActivity: string;
  isVisitorVehicle?: boolean;
}

export interface ParkingSlot {
  id: string; // e.g. B1-014
  level: string; // Basement 1, Basement 2, Open Ground
  type: 'Car' | 'Two-Wheeler' | 'EV Charging Bay';
  assignedFlatNumber: string;
  isOccupied: boolean;
  currentVehiclePlate?: string;
  hasConflictReport?: boolean;
  conflictNotes?: string;
}

export type ComplaintCategory = 
  | 'Plumbing' 
  | 'Electrical' 
  | 'Lift' 
  | 'Water' 
  | 'Cleaning' 
  | 'Security' 
  | 'Parking' 
  | 'Other';

export type ComplaintPriority = 'Low' | 'Medium' | 'High' | 'Emergency';

export type ComplaintStatus = 
  | 'Submitted' 
  | 'Assigned' 
  | 'In Progress' 
  | 'Resolved' 
  | 'Closed';

export interface Complaint {
  id: string;
  ticketNumber: string; // e.g. TKT-2026-104
  flatId: string;
  flatNumber: string;
  residentName: string;
  residentPhone: string;
  category: ComplaintCategory;
  title: string;
  description: string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  imageUrl?: string;
  assignedStaffId?: string;
  assignedStaffName?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  staffNotes?: string;
  resolutionRemark?: string;
  reopenReason?: string;
}

export interface Facility {
  id: string;
  name: string;
  tamilName: string;
  description: string;
  openHours: string;
  hourlyFee: number;
  maxBookingHours: number;
  capacity: number;
  iconName: string;
  rules: string[];
  slots: string[];
}

export interface FacilityBooking {
  id: string;
  facilityId: string;
  facilityName: string;
  flatId: string;
  flatNumber: string;
  residentName: string;
  residentPhone: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  feePaid: number;
  status: 'Confirmed' | 'Cancelled' | 'Completed';
  bookedAt: string;
  receiptNumber: string;
}

export interface Announcement {
  id: string;
  title: string;
  tamilTitle?: string;
  content: string;
  tamilContent?: string;
  category: 'Emergency' | 'Maintenance' | 'General' | 'Security' | 'Events';
  priority: 'urgent' | 'pinned' | 'normal';
  author: string;
  targetBlocks: string; // "All" or "Block A, B"
  publishedAt: string;
  expiresAt: string;
  isRead?: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  tamilText?: string;
  votes: number;
}

export interface CommunityPoll {
  id: string;
  question: string;
  tamilQuestion?: string;
  description: string;
  options: PollOption[];
  totalVotes: number;
  votedUserIds: string[];
  endDate: string;
  isActive: boolean;
}

export interface CommunityEvent {
  id: string;
  title: string;
  tamilTitle?: string;
  description: string;
  category: 'Festival' | 'Sports' | 'Meeting' | 'Cultural';
  date: string;
  time: string;
  location: string;
  organizer: string;
  rsvps: string[]; // flatIds or resident names
  hasRsvpd: boolean;
}

export interface DeliveryPackage {
  id: string;
  flatId: string;
  flatNumber: string;
  residentName: string;
  residentPhone: string;
  courierCompany: string; // Amazon, Flipkart, BlueDart, Swiggy, Zomato, India Post
  trackingNumber: string;
  receivedAt: string;
  pickupOtp: string;
  status: 'Waiting at Gate' | 'Collected by Resident';
  collectedAt?: string;
  guardName: string;
}

export interface LocalVendor {
  id: string;
  name: string;
  trade: 'Electrician' | 'Plumber' | 'AC Service' | 'Carpenter' | 'Painter' | 'Deep Cleaning' | 'Pest Control';
  phone: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  yearsInCommunity: number;
  availableDays: string;
}

export interface MarketplaceListing {
  id: string;
  title: string;
  category: 'Furniture' | 'Electronics' | 'Appliances' | 'Cycles & Fitness' | 'Kids & Toys' | 'Books & Others';
  price: number;
  condition: 'Like New' | 'Gently Used' | 'Good';
  description: string;
  sellerFlat: string;
  sellerName: string;
  sellerPhone: string;
  status: 'Available' | 'Sold';
  postedAt: string;
  imageUrl?: string;
}

export interface EmergencySOSAlert {
  id: string;
  flatNumber: string;
  residentName: string;
  residentPhone: string;
  emergencyType: 'Medical' | 'Fire' | 'Security Alarm' | 'General SOS';
  triggeredAt: string;
  status: 'Active Alert' | 'Security Dispatched' | 'Resolved';
  guardResponder?: string;
  resolutionNotes?: string;
}

export interface FamilyMember {
  id: string;
  flatId: string;
  name: string;
  relationship: 'Spouse' | 'Parent' | 'Child' | 'Tenant' | 'Guest';
  phone: string;
  permissions: {
    payments: boolean;
    visitorApproval: boolean;
    facilityBooking: boolean;
    complaints: boolean;
  };
}

export interface SocietyDocument {
  id: string;
  title: string;
  category: 'Bylaws' | 'AGM Minutes' | 'Audit Report' | 'NOC Templates' | 'Fire & Lift Safety';
  fileType: 'PDF' | 'DOCX';
  fileSize: string;
  uploadedAt: string;
  targetAudience: string;
}

export interface UtilityReading {
  id: string;
  flatNumber: string;
  utilityType: 'Electricity' | 'Water Meter';
  meterNumber: string;
  previousReading: number;
  currentReading: number;
  unitsConsumed: number;
  ratePerUnit: number;
  estimatedCost: number;
  billingMonth: string;
  readingDate: string;
}

export interface LostFoundItem {
  id: string;
  type: 'Lost' | 'Found';
  title: string;
  category: 'Keys' | 'Wallet/Card' | 'Electronics' | 'Jewellery' | 'Clothing' | 'Other';
  description: string;
  location: string;
  reportedDate: string;
  reportedBy: string;
  contactPhone: string;
  status: 'Open' | 'Resolved';
}

export interface PetRecord {
  id: string;
  flatNumber: string;
  petName: string;
  species: 'Dog' | 'Cat' | 'Bird' | 'Other';
  breed: string;
  age: string;
  vaccinated: boolean;
  vaccineDueDate: string;
  ownerName: string;
  ownerPhone: string;
  microchipId?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actorRole: string;
  actorName: string;
  action: string;
  details: string;
}

export interface AppNotification {
  id: string;
  title: string;
  tamilTitle?: string;
  message: string;
  tamilMessage?: string;
  type: 'visitor' | 'delivery' | 'bill' | 'complaint' | 'announcement' | 'emergency';
  timestamp: string;
  read: boolean;
  targetRole?: UserRole;
  targetFlat?: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  actionQuickLink?: string;
}
