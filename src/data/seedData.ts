import {
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

export const initialCommunity: CommunityInfo = {
  id: 'grand-palms-01',
  name: 'Grand Palms Residences',
  tamilName: 'கிராண்ட் பாம்ஸ் குடியிருப்பு',
  city: 'Chennai / OMR Tech Corridor',
  totalFlats: 128,
  totalBlocks: 4,
  establishedYear: 2021,
  gateContact: '+91 98401 22334',
  officeContact: '+91 94440 99881',
  emergencyAmbulance: '108',
  emergencyFire: '101',
  emergencyPolice: '100'
};

export const initialResidentUser: ResidentUser = {
  id: 'res-402',
  name: 'Priya & Karthik Sharma',
  flatId: 'flat-a-402',
  block: 'Block A (Amber)',
  flatNumber: 'A-402',
  role: 'owner',
  phone: '+91 98840 54321',
  email: 'priya.sharma@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  permissions: {
    canPayBills: true,
    canApproveVisitors: true,
    canBookFacilities: true,
    canRaiseComplaints: true,
    canManageFamily: true
  }
};

export const initialSecurityUser: SecurityUser = {
  id: 'sec-08',
  name: 'Officer Raman Pillai',
  badgeNumber: 'GP-SEC-08',
  gateAssigned: 'Main Gate 1',
  shift: 'Day Shift (06:00 - 18:00)',
  phone: '+91 98401 22334'
};

export const initialAdminUser: AdminUser = {
  id: 'admin-01',
  name: 'Sundaram Krishnan',
  designation: 'Association President & Managing Trustee',
  phone: '+91 94440 99881',
  email: 'president@grandpalms.org'
};

export const initialStaffUser: StaffUser = {
  id: 'staff-03',
  name: 'Murugan K.',
  specialization: 'Senior Electrical & Plumbing Technician',
  phone: '+91 97910 11223',
  activeJobsCount: 2
};

export const initialFlats: Flat[] = [
  {
    id: 'flat-a-402',
    block: 'Block A (Amber)',
    flatNumber: 'A-402',
    floor: 4,
    bhk: '3 BHK',
    sqft: 1850,
    primaryResident: 'Priya & Karthik Sharma',
    residentType: 'Owner Occupied',
    phone: '+91 98840 54321',
    parkingSlots: ['B1-014', 'B1-015'],
    vehicles: ['TN-09-CB-4821', 'TN-09-DE-1049'],
    maintenanceStatus: 'Pending'
  },
  {
    id: 'flat-a-101',
    block: 'Block A (Amber)',
    flatNumber: 'A-101',
    floor: 1,
    bhk: '2 BHK',
    sqft: 1320,
    primaryResident: 'Rajesh & Meera Nair',
    residentType: 'Owner Occupied',
    phone: '+91 98410 77889',
    parkingSlots: ['B1-002'],
    vehicles: ['TN-07-AL-3312'],
    maintenanceStatus: 'Paid'
  },
  {
    id: 'flat-b-203',
    block: 'Block B (Beryl)',
    flatNumber: 'B-203',
    floor: 2,
    bhk: '3 BHK',
    sqft: 1780,
    primaryResident: 'Dr. Anand Swaminathan',
    residentType: 'Owner Occupied',
    phone: '+91 94441 66554',
    parkingSlots: ['B1-028'],
    vehicles: ['TN-10-QZ-9901'],
    maintenanceStatus: 'Paid'
  },
  {
    id: 'flat-c-305',
    block: 'Block C (Coral)',
    flatNumber: 'C-305',
    floor: 3,
    bhk: '3 BHK',
    sqft: 1820,
    primaryResident: 'Vikram & Ananya Sen',
    residentType: 'Tenant',
    phone: '+91 99620 44556',
    parkingSlots: ['B2-011'],
    vehicles: ['TN-22-KJ-4512'],
    maintenanceStatus: 'Overdue'
  },
  {
    id: 'flat-d-102',
    block: 'Block D (Emerald)',
    flatNumber: 'D-102',
    floor: 1,
    bhk: '4 BHK Duplex',
    sqft: 2450,
    primaryResident: 'Venkatesh Raghavan',
    residentType: 'Owner Occupied',
    phone: '+91 98408 12345',
    parkingSlots: ['B2-045', 'B2-046'],
    vehicles: ['TN-01-BH-7788'],
    maintenanceStatus: 'Paid'
  }
];

export const initialBills: MaintenanceBill[] = [
  {
    id: 'bill-oct-2026-402',
    flatId: 'flat-a-402',
    flatNumber: 'A-402',
    month: 'October 2026',
    dueDate: '2026-10-15',
    amount: 4850,
    status: 'Pending',
    breakdown: {
      security: 1200,
      cleaning: 800,
      water: 650,
      commonElectricity: 950,
      liftAMC: 550,
      sinkingFund: 700,
      penalty: 0
    }
  },
  {
    id: 'bill-sep-2026-402',
    flatId: 'flat-a-402',
    flatNumber: 'A-402',
    month: 'September 2026',
    dueDate: '2026-09-15',
    amount: 4850,
    status: 'Paid',
    breakdown: {
      security: 1200,
      cleaning: 800,
      water: 650,
      commonElectricity: 950,
      liftAMC: 550,
      sinkingFund: 700,
      penalty: 0
    },
    paidAt: '2026-09-12 11:24 AM',
    transactionId: 'TXN-HDFC-99482710',
    paymentMethod: 'UPI / Google Pay',
    receiptNumber: 'RCPT-GP-2026-09-0402'
  },
  {
    id: 'bill-aug-2026-402',
    flatId: 'flat-a-402',
    flatNumber: 'A-402',
    month: 'August 2026',
    dueDate: '2026-08-15',
    amount: 4850,
    status: 'Paid',
    breakdown: {
      security: 1200,
      cleaning: 800,
      water: 650,
      commonElectricity: 950,
      liftAMC: 550,
      sinkingFund: 700,
      penalty: 0
    },
    paidAt: '2026-08-10 04:15 PM',
    transactionId: 'TXN-ICICI-88129034',
    paymentMethod: 'Net Banking',
    receiptNumber: 'RCPT-GP-2026-08-0402'
  },
  {
    id: 'bill-oct-2026-305',
    flatId: 'flat-c-305',
    flatNumber: 'C-305',
    month: 'October 2026',
    dueDate: '2026-10-05',
    amount: 5150,
    status: 'Overdue',
    breakdown: {
      security: 1200,
      cleaning: 800,
      water: 650,
      commonElectricity: 950,
      liftAMC: 550,
      sinkingFund: 700,
      penalty: 300
    }
  }
];

export const initialVisitorPasses: VisitorPass[] = [
  {
    id: 'pass-01',
    passCode: 'GP-8421',
    flatId: 'flat-a-402',
    flatNumber: 'A-402',
    hostName: 'Priya Sharma',
    visitorName: 'Suresh Kumar',
    visitorPhone: '+91 98403 99112',
    purpose: 'Guest',
    visitorType: 'expected',
    status: 'pre_approved',
    scheduledDate: '2026-10-06',
    scheduledTimeWindow: '18:00 - 21:00',
    vehicleNumber: 'TN-02-AK-7788',
    createdAt: '2026-10-06 09:30 AM'
  },
  {
    id: 'pass-02',
    passCode: 'GP-3319',
    flatId: 'flat-a-402',
    flatNumber: 'A-402',
    hostName: 'Karthik Sharma',
    visitorName: 'Gowtham (Urban Company AC)',
    visitorPhone: '+91 99401 55667',
    purpose: 'Maintenance',
    visitorType: 'expected',
    status: 'checked_in',
    scheduledDate: '2026-10-06',
    scheduledTimeWindow: '11:00 - 13:00',
    checkInTime: '2026-10-06 11:15 AM',
    guardNotes: 'Entry verified with tools bag',
    createdAt: '2026-10-06 08:00 AM'
  },
  {
    id: 'pass-03',
    passCode: 'GP-9022',
    flatId: 'flat-a-402',
    flatNumber: 'A-402',
    hostName: 'Priya Sharma',
    visitorName: 'Manoj (Delivery Executive - Blinkit)',
    visitorPhone: '+91 91760 33445',
    purpose: 'Delivery',
    visitorType: 'unexpected',
    status: 'waiting_approval',
    scheduledDate: '2026-10-06',
    scheduledTimeWindow: 'Now (At Gate 1)',
    vehicleNumber: 'TN-09-EV-3301',
    guardNotes: 'Blinkit grocery parcel for Flat A-402 at Gate 1',
    createdAt: '2026-10-06 11:25 AM'
  }
];

export const initialVehicles: Vehicle[] = [
  {
    id: 'veh-01',
    plateNumber: 'TN-09-CB-4821',
    vehicleType: 'Car',
    makeModel: 'Hyundai Creta (White)',
    ownerName: 'Karthik Sharma',
    flatId: 'flat-a-402',
    flatNumber: 'A-402',
    parkingSlot: 'B1-014',
    status: 'Inside',
    lastGateActivity: 'Entered Gate 1 at 09:15 AM today'
  },
  {
    id: 'veh-02',
    plateNumber: 'TN-09-DE-1049',
    vehicleType: 'EV Two-Wheeler',
    makeModel: 'Ather 450X (Space Grey)',
    ownerName: 'Priya Sharma',
    flatId: 'flat-a-402',
    flatNumber: 'A-402',
    parkingSlot: 'B1-015',
    status: 'Inside',
    lastGateActivity: 'Parked in Basement 1'
  },
  {
    id: 'veh-03',
    plateNumber: 'TN-10-QZ-9901',
    vehicleType: 'Car',
    makeModel: 'Honda City (Silver)',
    ownerName: 'Dr. Anand Swaminathan',
    flatId: 'flat-b-203',
    flatNumber: 'B-203',
    parkingSlot: 'B1-028',
    status: 'Outside',
    lastGateActivity: 'Exited Gate 2 at 08:30 AM today'
  }
];

export const initialParkingSlots: ParkingSlot[] = [
  {
    id: 'B1-014',
    level: 'Basement 1',
    type: 'Car',
    assignedFlatNumber: 'A-402',
    isOccupied: true,
    currentVehiclePlate: 'TN-09-CB-4821'
  },
  {
    id: 'B1-015',
    level: 'Basement 1',
    type: 'EV Charging Bay',
    assignedFlatNumber: 'A-402',
    isOccupied: true,
    currentVehiclePlate: 'TN-09-DE-1049'
  },
  {
    id: 'B1-028',
    level: 'Basement 1',
    type: 'Car',
    assignedFlatNumber: 'B-203',
    isOccupied: false
  },
  {
    id: 'B2-011',
    level: 'Basement 2',
    type: 'Car',
    assignedFlatNumber: 'C-305',
    isOccupied: true,
    currentVehiclePlate: 'TN-22-KJ-4512'
  },
  {
    id: 'VIS-01',
    level: 'Ground Bay',
    type: 'Car',
    assignedFlatNumber: 'Visitor Bay',
    isOccupied: false
  }
];

export const initialComplaints: Complaint[] = [
  {
    id: 'cmp-104',
    ticketNumber: 'TKT-2026-104',
    flatId: 'flat-a-402',
    flatNumber: 'A-402',
    residentName: 'Priya Sharma',
    residentPhone: '+91 98840 54321',
    category: 'Plumbing',
    title: 'Water valve seepage under master bathroom basin',
    description: 'Minor continuous leakage under the sink counter since yesterday evening. Needs washer replacement.',
    priority: 'High',
    status: 'In Progress',
    assignedStaffId: 'staff-03',
    assignedStaffName: 'Murugan K. (Senior Tech)',
    staffNotes: 'Inspected washer fitting. Sourcing replacement brass coupling from stores.',
    createdAt: '2026-10-05 06:40 PM',
    updatedAt: '2026-10-06 09:10 AM'
  },
  {
    id: 'cmp-098',
    ticketNumber: 'TKT-2026-098',
    flatId: 'flat-a-402',
    flatNumber: 'A-402',
    residentName: 'Karthik Sharma',
    residentPhone: '+91 98840 54321',
    category: 'Electrical',
    title: 'Corridor motion sensor light flickering',
    description: '4th floor lift lobby ceiling light sensor turns off too quickly.',
    priority: 'Medium',
    status: 'Resolved',
    assignedStaffId: 'staff-03',
    assignedStaffName: 'Murugan K.',
    staffNotes: 'Replaced PIR motion sensor module with calibrated 90-second delay.',
    resolutionRemark: 'Completed and tested with resident.',
    resolvedAt: '2026-10-04 03:30 PM',
    createdAt: '2026-10-03 10:15 AM',
    updatedAt: '2026-10-04 03:30 PM'
  },
  {
    id: 'cmp-102',
    ticketNumber: 'TKT-2026-102',
    flatId: 'flat-b-203',
    flatNumber: 'B-203',
    residentName: 'Dr. Anand Swaminathan',
    residentPhone: '+91 94441 66554',
    category: 'Lift',
    title: 'Block B Passenger Lift #2 floor indicator unlit',
    description: '7-segment floor display inside lift car is blank during transit.',
    priority: 'Emergency',
    status: 'Assigned',
    assignedStaffId: 'staff-03',
    assignedStaffName: 'Murugan K.',
    createdAt: '2026-10-06 07:20 AM',
    updatedAt: '2026-10-06 08:00 AM'
  }
];

export const initialFacilities: Facility[] = [
  {
    id: 'fac-clubhouse',
    name: 'Clubhouse Banquet & Party Hall',
    tamilName: 'சமுதாய அரங்கம் & விருந்து கூடம்',
    description: 'Air-conditioned multi-purpose banquet hall with stage, AV sound system, and pantry for celebrations and family gatherings.',
    openHours: '09:00 AM - 11:00 PM',
    hourlyFee: 1500,
    maxBookingHours: 6,
    capacity: 120,
    iconName: 'Building',
    rules: [
      'No loud music beyond 10:00 PM as per community peace guidelines',
      'Refundable cleaning deposit ₹2,000 applicable',
      'Pantry waste must be segregated into wet/dry bins'
    ],
    slots: ['09:00 - 13:00', '14:00 - 18:00', '18:30 - 22:30']
  },
  {
    id: 'fac-badminton',
    name: 'Indoor Synthetic Badminton Court',
    tamilName: 'உள்ளரங்கு பேட்மிண்டன் மைதானம்',
    description: 'Double wooden sprung synthetic flooring court with Yonex tournament net and professional LED high-bay illumination.',
    openHours: '06:00 AM - 10:00 PM',
    hourlyFee: 200,
    maxBookingHours: 2,
    capacity: 4,
    iconName: 'Activity',
    rules: [
      'Strictly non-marking gum-sole sports shoes required',
      'Maximum 4 players on court at any given time',
      'Cancel at least 2 hours prior for slot credit'
    ],
    slots: ['06:00 - 07:00', '07:00 - 08:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00']
  },
  {
    id: 'fac-pool',
    name: 'Infinity Lap Swimming Pool',
    tamilName: 'நீச்சல் குளம்',
    description: '25m semi-covered temperature-moderated ozonated lap pool with dedicated toddler splash area and poolside loungers.',
    openHours: '06:00 AM - 09:30 PM (Mondays Closed for Maintenance)',
    hourlyFee: 0,
    maxBookingHours: 1,
    capacity: 25,
    iconName: 'Waves',
    rules: [
      'Proper nylon/lycra swimwear and swimming caps mandatory',
      'Children under 12 must be accompanied by an adult swimmer',
      'Shower mandatory before stepping into the pool'
    ],
    slots: ['06:30 - 07:30', '07:30 - 08:30', '16:30 - 17:30', '17:30 - 18:30', '18:30 - 19:30']
  },
  {
    id: 'fac-gym',
    name: 'Olympic Wellness Fitness Gym',
    tamilName: 'உடற்பயிற்சி கூடம் (Gym)',
    description: 'Technogym cardio treadmills, cross-trainers, multi-station cable machines, free-weights rack, and stretch studio.',
    openHours: '05:30 AM - 10:30 PM',
    hourlyFee: 0,
    maxBookingHours: 2,
    capacity: 30,
    iconName: 'Dumbbell',
    rules: [
      'Carry individual sweat towel and clean gym sneakers',
      'Re-rack all dumbbells and plates after set completion',
      'Sanitize machine handles after usage'
    ],
    slots: ['06:00 - 07:30', '07:30 - 09:00', '17:00 - 18:30', '18:30 - 20:00', '20:00 - 21:30']
  }
];

export const initialBookings: FacilityBooking[] = [
  {
    id: 'bk-2026-881',
    facilityId: 'fac-badminton',
    facilityName: 'Indoor Synthetic Badminton Court',
    flatId: 'flat-a-402',
    flatNumber: 'A-402',
    residentName: 'Karthik Sharma',
    residentPhone: '+91 98840 54321',
    date: '2026-10-07',
    timeSlot: '19:00 - 20:00',
    guestsCount: 2,
    feePaid: 200,
    status: 'Confirmed',
    bookedAt: '2026-10-05 08:12 PM',
    receiptNumber: 'BK-RCPT-8812'
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: 'not-01',
    title: 'Scheduled Water Tank Cleaning & Sump Maintenance - Block A & B',
    tamilTitle: 'பிளாக் A & B மேல்நிலை நீர்த்தேக்க தொட்டி பராமரிப்பு அறிவிப்பு',
    content: 'Please note that overhead water sumps will undergo bi-monthly automated ultrasonic chlorination on Thursday, 08 Oct, from 10:00 AM to 02:00 PM. Water supply will resume normally by 02:30 PM. Kindly store sufficient water.',
    tamilContent: 'வியாழக்கிழமை (08 அக்) காலை 10:00 முதல் மதியம் 02:00 வரை நீர் தொட்டி சுத்தம் செய்யப்படும். தேவையான தண்ணீரை முன்கூட்டியே சேமித்துக்கொள்ளவும்.',
    category: 'Maintenance',
    priority: 'pinned',
    author: 'Sundaram Krishnan (President)',
    targetBlocks: 'All Blocks',
    publishedAt: '2026-10-05',
    expiresAt: '2026-10-09',
    isRead: false
  },
  {
    id: 'not-02',
    title: 'Diwali & Deepavali Grand Community Gala - Cultural Night & Food Stalls',
    tamilTitle: 'தீபாவளி திருநாள் சமுதாய கொண்டாட்டம் & கலை நிகழ்ச்சிகள்',
    content: 'Grand Palms Association invites all resident families to the annual Deepavali festivities on Saturday, 24 Oct, at Central Lawn. Program includes kids fancy dress, classical dance, live music band, and authentic regional buffet stalls.',
    tamilContent: 'அனைத்து குடியிருப்பாளர்களும் அக்டோபர் 24 சனிக்கிழமை அன்று மத்திய புல்வெளியில் நடைபெறும் தீபாவளி கலை நிகழ்ச்சிகளில் கலந்துகொள்ள அழைக்கப்படுகிறார்கள்.',
    category: 'Events',
    priority: 'normal',
    author: 'Cultural Committee',
    targetBlocks: 'All Blocks',
    publishedAt: '2026-10-04',
    expiresAt: '2026-10-25',
    isRead: true
  },
  {
    id: 'not-03',
    title: 'EV Charging Bay Etiquette & Parking Code Notice',
    tamilTitle: 'மின்சார வாகன சார்ஜிங் பயன்பாட்டு நெறிமுறை',
    content: 'Residents utilizing common EV fast-chargers in Basement 1 are requested to shift vehicles within 45 minutes after 100% full charge notification to allow waiting residents access.',
    tamilContent: 'பேஸ்மென்ட் 1-ல் உள்ள பொது EV சார்ஜிங் மையத்தில் வாகனம் முழு சார்ஜ் ஆனதும் 45 நிமிடங்களுக்குள் வாகனத்தை அகற்றவும்.',
    category: 'General',
    priority: 'normal',
    author: 'Estate Manager',
    targetBlocks: 'All Blocks',
    publishedAt: '2026-10-02',
    expiresAt: '2026-10-31',
    isRead: true
  }
];

export const initialPolls: CommunityPoll[] = [
  {
    id: 'poll-01',
    question: 'Should the association invest Society Sinking Reserves into a 50kW Rooftop Solar Grid to reduce common electricity bills?',
    tamilQuestion: 'பொது மின்சார செலவைக் குறைக்க 50kW கூரை சோலார் அமைப்பை நிறுவலாமா?',
    description: 'Estimated investment ₹28 Lakhs with 3.5 year ROI payback and 62% reduction in corridor and lift power bills.',
    options: [
      { id: 'opt-1', text: 'Yes, proceed with Solar Grid immediately', tamilText: 'ஆம், சோலார் திட்டம் அமைக்கலாம்', votes: 47 },
      { id: 'opt-2', text: 'Yes, but review 3 vendor quotations first', tamilText: 'ஆம், ஆனால் கூடுதல் ஒப்பந்தங்களை ஆய்வு செய்க', votes: 21 },
      { id: 'opt-3', text: 'No, reserve funds for elevator overhaul', tamilText: 'இல்லை, லிப்ட் நிதிக்கு சேமிக்கவும்', votes: 6 }
    ],
    totalVotes: 74,
    votedUserIds: ['res-402'],
    endDate: '2026-10-20',
    isActive: true
  },
  {
    id: 'poll-02',
    question: 'Proposed clubhouse weekend timing extension from 10:00 PM to 11:30 PM for indoor table tennis and library',
    tamilQuestion: 'வார இறுதி நாட்களில் கிளப்ஹவுஸ் நேரத்தை இரவு 11:30 வரை நீட்டிக்கலாமா?',
    description: 'Applicable strictly for indoor board games and library reading zone without music.',
    options: [
      { id: 'p2-opt-1', text: 'Approve extension to 11:30 PM', tamilText: 'நேர நீட்டிப்பை அங்கீகரிக்கவும்', votes: 35 },
      { id: 'p2-opt-2', text: 'Keep current 10:00 PM timing', tamilText: 'தற்போதைய 10:00 மணி நேரமே சிறந்தது', votes: 29 }
    ],
    totalVotes: 64,
    votedUserIds: [],
    endDate: '2026-10-18',
    isActive: true
  }
];

export const initialEvents: CommunityEvent[] = [
  {
    id: 'evt-01',
    title: 'Grand Diwali Mela & Dandiya Evening',
    tamilTitle: 'தீபாவளி திருவிழா & தாண்டியா நடன மாலை',
    description: 'Exciting games, live chaat and sweets counters, rangoli contest for kids and families, followed by acoustic musical performances.',
    category: 'Festival',
    date: '2026-10-24',
    time: '06:00 PM - 10:00 PM',
    location: 'Central Amphitheatre & Party Lawn',
    organizer: 'Grand Palms Cultural Committee',
    rsvps: ['A-402 (Sharma Family)', 'B-203 (Swaminathan)', 'A-101 (Nair)', 'D-102 (Raghavan)'],
    hasRsvpd: true
  },
  {
    id: 'evt-02',
    title: 'Inter-Block Badminton Premier League 2026',
    tamilTitle: 'பிளாக்குகளுக்கு இடையேயான பேட்மிண்டன் போட்டி',
    description: 'Men’s, Women’s and Mixed Doubles matches. Refreshments and trophy felicitation ceremony on final evening.',
    category: 'Sports',
    date: '2026-10-17',
    time: '08:00 AM - 01:00 PM',
    location: 'Indoor Badminton Court 1 & 2',
    organizer: 'Sports & Wellness Council',
    rsvps: ['A-402 (Sharma Family)', 'C-305 (Sen)'],
    hasRsvpd: true
  },
  {
    id: 'evt-03',
    title: 'Annual General Body Meeting (AGM 2026)',
    tamilTitle: 'வருடாந்திர பொதுக்குழுக் கூட்டம் (AGM)',
    description: 'Presentation of audited financial accounts for FY 25-26, election of managing committee representatives, and budget approval.',
    category: 'Meeting',
    date: '2026-11-01',
    time: '10:00 AM - 01:00 PM',
    location: 'Clubhouse Banquet Hall',
    organizer: 'Managing Committee',
    rsvps: ['A-402 (Sharma Family)'],
    hasRsvpd: false
  }
];

export const initialDeliveries: DeliveryPackage[] = [
  {
    id: 'del-01',
    flatId: 'flat-a-402',
    flatNumber: 'A-402',
    residentName: 'Priya Sharma',
    residentPhone: '+91 98840 54321',
    courierCompany: 'Amazon Prime',
    trackingNumber: 'IN-AMZ-99482103',
    receivedAt: 'Today, 10:20 AM',
    pickupOtp: '5842',
    status: 'Waiting at Gate',
    guardName: 'Officer Raman Pillai'
  },
  {
    id: 'del-02',
    flatId: 'flat-a-402',
    flatNumber: 'A-402',
    residentName: 'Karthik Sharma',
    residentPhone: '+91 98840 54321',
    courierCompany: 'BlueDart Courier',
    trackingNumber: 'BL-9810245',
    receivedAt: 'Yesterday, 04:15 PM',
    pickupOtp: '3109',
    status: 'Collected by Resident',
    collectedAt: 'Yesterday, 07:10 PM',
    guardName: 'Officer Raman Pillai'
  },
  {
    id: 'del-03',
    flatId: 'flat-b-203',
    flatNumber: 'B-203',
    residentName: 'Dr. Anand Swaminathan',
    residentPhone: '+91 94441 66554',
    courierCompany: 'Flipkart Logistics',
    trackingNumber: 'FK-7729104',
    receivedAt: 'Today, 11:05 AM',
    pickupOtp: '8921',
    status: 'Waiting at Gate',
    guardName: 'Officer Raman Pillai'
  }
];

export const initialVendors: LocalVendor[] = [
  {
    id: 'v-01',
    name: 'Senthil Kumaran',
    trade: 'Electrician',
    phone: '+91 98402 77112',
    rating: 4.9,
    reviewCount: 38,
    verified: true,
    yearsInCommunity: 4,
    availableDays: 'Mon - Sat (09:00 - 19:00)'
  },
  {
    id: 'v-02',
    name: 'Gopalakrishnan V.',
    trade: 'Plumber',
    phone: '+91 94448 33221',
    rating: 4.8,
    reviewCount: 42,
    verified: true,
    yearsInCommunity: 3,
    availableDays: 'Everyday (24/7 on-call)'
  },
  {
    id: 'v-03',
    name: 'CoolTech HVAC Solutions',
    trade: 'AC Service',
    phone: '+91 97910 88990',
    rating: 4.7,
    reviewCount: 29,
    verified: true,
    yearsInCommunity: 2,
    availableDays: 'Mon - Sun (08:30 - 20:00)'
  },
  {
    id: 'v-04',
    name: 'Master Woodcraft (Babu)',
    trade: 'Carpenter',
    phone: '+91 91761 44552',
    rating: 4.9,
    reviewCount: 22,
    verified: true,
    yearsInCommunity: 5,
    availableDays: 'Mon - Sat'
  }
];

export const initialMarketplace: MarketplaceListing[] = [
  {
    id: 'mkt-01',
    title: 'Solid Teak Wood Ergonomic Study Desk with Drawers',
    category: 'Furniture',
    price: 6500,
    condition: 'Like New',
    description: 'Barely used 4-foot solid teak wood desk with 3 lockable drawers and wire grommet. Moving out sale.',
    sellerFlat: 'Flat B-203',
    sellerName: 'Dr. Anand Swaminathan',
    sellerPhone: '+91 94441 66554',
    status: 'Available',
    postedAt: '2 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'mkt-02',
    title: 'Decathlon Triban Hybrid Geared Bicycle (Adult Medium)',
    category: 'Cycles & Fitness',
    price: 9200,
    condition: 'Gently Used',
    description: 'Serviced 21-speed hybrid bicycle with BTwin helmet, water bottle holder, and gel saddle cushion.',
    sellerFlat: 'Flat A-101',
    sellerName: 'Rajesh Nair',
    sellerPhone: '+91 98410 77889',
    status: 'Available',
    postedAt: '4 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'mkt-03',
    title: 'Chicco Lightweight Foldable Baby Stroller & Pram',
    category: 'Kids & Toys',
    price: 3800,
    condition: 'Good',
    description: 'Sturdy multi-recline stroller with sun canopy and under-seat storage basket. Clean and sanitized.',
    sellerFlat: 'Flat C-305',
    sellerName: 'Ananya Sen',
    sellerPhone: '+91 99620 44556',
    status: 'Sold',
    postedAt: '1 week ago'
  }
];

export const initialSOSAlerts: EmergencySOSAlert[] = [
  {
    id: 'sos-01',
    flatNumber: 'A-402',
    residentName: 'Priya Sharma',
    residentPhone: '+91 98840 54321',
    emergencyType: 'Medical',
    triggeredAt: '2026-09-18 02:14 AM',
    status: 'Resolved',
    guardResponder: 'Officer Raman Pillai (Gate 1)',
    resolutionNotes: 'Ambulance 108 summoned and escorted to Block A elevator; resident family accompanied to Apollo Hospital.'
  }
];

export const initialFamilyMembers: FamilyMember[] = [
  {
    id: 'fam-01',
    flatId: 'flat-a-402',
    name: 'Karthik Sharma',
    relationship: 'Spouse',
    phone: '+91 98840 54320',
    permissions: {
      payments: true,
      visitorApproval: true,
      facilityBooking: true,
      complaints: true
    }
  },
  {
    id: 'fam-02',
    flatId: 'flat-a-402',
    name: 'Aarav Sharma (14 yrs)',
    relationship: 'Child',
    phone: '+91 98840 54325',
    permissions: {
      payments: false,
      visitorApproval: false,
      facilityBooking: true,
      complaints: false
    }
  },
  {
    id: 'fam-03',
    flatId: 'flat-a-402',
    name: 'Savitri Sharma',
    relationship: 'Parent',
    phone: '+91 98840 54328',
    permissions: {
      payments: false,
      visitorApproval: true,
      facilityBooking: false,
      complaints: false
    }
  }
];

export const initialDocuments: SocietyDocument[] = [
  {
    id: 'doc-01',
    title: 'Grand Palms Association Bye-Laws & Community Rulebook 2026',
    category: 'Bylaws',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    uploadedAt: '2026-01-15',
    targetAudience: 'All Residents & Owners'
  },
  {
    id: 'doc-02',
    title: 'Minutes of Annual General Meeting (AGM 2025) & Resolution Record',
    category: 'AGM Minutes',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    uploadedAt: '2025-11-20',
    targetAudience: 'Registered Flat Owners'
  },
  {
    id: 'doc-03',
    title: 'Tamil Nadu Fire Safety & Otis Elevator Compliance Certificate',
    category: 'Fire & Lift Safety',
    fileType: 'PDF',
    fileSize: '850 KB',
    uploadedAt: '2026-03-10',
    targetAudience: 'Public'
  },
  {
    id: 'doc-04',
    title: 'Tenant Police Verification & No-Objection Certificate (NOC) Template',
    category: 'NOC Templates',
    fileType: 'DOCX',
    fileSize: '320 KB',
    uploadedAt: '2026-04-01',
    targetAudience: 'Owners & Property Managers'
  }
];

export const initialMeters: UtilityReading[] = [
  {
    id: 'met-01',
    flatNumber: 'A-402',
    utilityType: 'Electricity',
    meterNumber: 'TNEB-094-1182',
    previousReading: 12450,
    currentReading: 12820,
    unitsConsumed: 370,
    ratePerUnit: 6.5,
    estimatedCost: 2405,
    billingMonth: 'September 2026',
    readingDate: '2026-10-01'
  },
  {
    id: 'met-02',
    flatNumber: 'A-402',
    utilityType: 'Water Meter',
    meterNumber: 'WM-BLKA-0402',
    previousReading: 4120,
    currentReading: 4260,
    unitsConsumed: 140,
    ratePerUnit: 4.0,
    estimatedCost: 560,
    billingMonth: 'September 2026',
    readingDate: '2026-10-01'
  }
];

export const initialLostFound: LostFoundItem[] = [
  {
    id: 'lf-01',
    type: 'Found',
    title: 'Hyundai Smart Car Remote Key with Black Leather Fob',
    category: 'Keys',
    description: 'Found near Children Play Park bench around 06:30 PM yesterday.',
    location: 'Children Play Area, Block C Garden',
    reportedDate: '2026-10-05',
    reportedBy: 'Security Gate 1',
    contactPhone: '+91 98401 22334',
    status: 'Open'
  },
  {
    id: 'lf-02',
    type: 'Lost',
    title: 'Blue Milton Stainless Steel Kids School Flask',
    category: 'Other',
    description: 'Lost on Saturday morning near the Badminton court grandstand.',
    location: 'Badminton Court 1',
    reportedDate: '2026-10-04',
    reportedBy: 'Meera Nair (Flat A-101)',
    contactPhone: '+91 98410 77889',
    status: 'Resolved'
  }
];

export const initialPets: PetRecord[] = [
  {
    id: 'pet-01',
    flatNumber: 'A-402',
    petName: 'Leo',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '3 Years',
    vaccinated: true,
    vaccineDueDate: '2027-02-14',
    ownerName: 'Priya Sharma',
    ownerPhone: '+91 98840 54321',
    microchipId: '98109811234901'
  },
  {
    id: 'pet-02',
    flatNumber: 'B-203',
    petName: 'Bella',
    species: 'Cat',
    breed: 'Persian Longhair',
    age: '2 Years',
    vaccinated: true,
    vaccineDueDate: '2026-12-05',
    ownerName: 'Dr. Anand Swaminathan',
    ownerPhone: '+91 94441 66554'
  }
];

export const initialAuditLogs: AuditLogItem[] = [
  {
    id: 'log-01',
    timestamp: '2026-10-06 11:25 AM',
    actorRole: 'Security Guard',
    actorName: 'Officer Raman Pillai',
    action: 'Unexpected Visitor Request Dispatched',
    details: 'Prompted Flat A-402 for delivery rider Manoj (Blinkit) clearance at Gate 1'
  },
  {
    id: 'log-02',
    timestamp: '2026-10-06 10:20 AM',
    actorRole: 'Security Guard',
    actorName: 'Officer Raman Pillai',
    action: 'Package Intake Logged',
    details: 'Amazon parcel received for Flat A-402, OTP generated: 5842'
  },
  {
    id: 'log-03',
    timestamp: '2026-10-06 09:10 AM',
    actorRole: 'Maintenance Staff',
    actorName: 'Murugan K.',
    action: 'Work Order Updated',
    details: 'Updated TKT-2026-104 (Plumbing leak) to In Progress with inspection notes'
  },
  {
    id: 'log-04',
    timestamp: '2026-10-05 10:00 AM',
    actorRole: 'Association Admin',
    actorName: 'Sundaram Krishnan',
    action: 'Announcement Broadcasted',
    details: 'Published water sump cleaning circular for Blocks A & B'
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'notif-01',
    title: 'Unexpected Visitor at Gate 1',
    tamilTitle: 'வாயில் 1-ல் புதிய பார்வையாளர்',
    message: 'Manoj (Blinkit Delivery) is at Gate 1 requesting clearance to enter Flat A-402.',
    tamilMessage: 'மனோஜ் (பிளிங்கிட் டெலிவரி) வாயில் 1-ல் அனுமதி கேட்கிறார்.',
    type: 'visitor',
    timestamp: 'Just now (11:25 AM)',
    read: false,
    targetRole: 'resident',
    targetFlat: 'A-402'
  },
  {
    id: 'notif-02',
    title: 'Package Arrived at Gate 1',
    tamilTitle: 'பார்சல் வாயிலில் பெறப்பட்டது',
    message: 'Amazon Prime package arrived. Share OTP 5842 with security to collect.',
    tamilMessage: 'அமேசான் பார்சல் வந்துள்ளது. பெறும்போது OTP 5842 கூறவும்.',
    type: 'delivery',
    timestamp: '1 hour ago (10:20 AM)',
    read: false,
    targetRole: 'resident',
    targetFlat: 'A-402'
  },
  {
    id: 'notif-03',
    title: 'Maintenance Dues Pending',
    tamilTitle: 'பராமரிப்பு கட்டணம் நிலுவையில் உள்ளது',
    message: 'October 2026 maintenance bill of ₹4,850 is due by 15 Oct 2026.',
    tamilMessage: 'அக்டோபர் மாத கட்டணம் ₹4,850 அக்டோபர் 15-க்குள் செலுத்தப்பட வேண்டும்.',
    type: 'bill',
    timestamp: 'Yesterday',
    read: true,
    targetRole: 'resident',
    targetFlat: 'A-402'
  }
];
