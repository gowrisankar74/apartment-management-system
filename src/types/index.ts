export type ServiceCategoryType = 
  | 'ac-repair' 
  | 'plumbing' 
  | 'electrical' 
  | 'appliance' 
  | 'handyman';

export interface ServiceCategory {
  id: ServiceCategoryType;
  name: string;
  shortName: string;
  tagline: string;
  iconName: string;
  startingPrice: number;
  avgDuration: string;
  commonIssues: string[];
}

export type AvailabilityStatus = 'available_now' | 'busy_slot_in_30m' | 'on_call' | 'offline';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  serviceType: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Technician {
  id: string;
  name: string;
  businessName: string;
  serviceCategory: ServiceCategoryType;
  rating: number;
  totalReviews: number;
  distanceMiles: number;
  etaMinutes: number;
  availabilityStatus: AvailabilityStatus;
  hourlyRate: number;
  diagnosticFee: number;
  emergencyFee: number;
  specialties: string[];
  certifications: string[];
  licenseNumber: string;
  insuredAmount: string;
  yearsExperience: number;
  completedJobsCount: number;
  responseTimeSeconds: number;
  bio: string;
  phone: string;
  badge: string;
  avatarSeed: string; // for high-res SVG avatar generation
  mapCoordinates: {
    x: number; // 0-100% relative coordinates on map
    y: number; // 0-100% relative coordinates on map
  };
  reviews: Review[];
}

export type BookingStatus = 
  | 'PENDING_ACCEPTANCE'
  | 'ACCEPTED'
  | 'EN_ROUTE'
  | 'ARRIVED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'PAYMENT_PENDING'
  | 'PAID'
  | 'RATED';

export interface ServiceChecklistStep {
  id: string;
  label: string;
  description: string;
  completed: boolean;
  timestamp?: string;
}

export interface PaymentInfo {
  method: 'card' | 'apple_pay' | 'google_pay' | 'cash';
  cardLast4?: string;
  cardBrand?: string;
  transactionId: string;
  amount: number;
  tipAmount: number;
  totalPaid: number;
  paidAt: string;
  status: 'succeeded';
}

export interface Booking {
  id: string;
  technicianId: string;
  technicianName: string;
  technicianBusiness: string;
  technicianAvatarSeed: string;
  technicianPhone: string;
  category: ServiceCategoryType;
  categoryName: string;
  issueType: string;
  issueDescription: string;
  urgency: 'immediate' | 'scheduled';
  scheduledTimeWindow?: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerUnit?: string;
  customerGateCode?: string;
  status: BookingStatus;
  createdAt: string;
  acceptedAt?: string;
  enRouteAt?: string;
  arrivedAt?: string;
  completedAt?: string;
  paidAt?: string;
  checklist: ServiceChecklistStep[];
  pricing: {
    diagnosticFee: number;
    diagnosticWaived: boolean;
    repairLabor: number;
    partsUsed: { name: string; price: number }[];
    tax: number;
    subtotal: number;
    total: number;
  };
  technicianCurrentLocation?: {
    x: number; // relative coordinate moving towards customer
    y: number;
  };
  paymentInfo?: PaymentInfo;
  review?: {
    rating: number;
    comment: string;
    compliments: string[];
    tipAmount: number;
    createdAt: string;
  };
}
