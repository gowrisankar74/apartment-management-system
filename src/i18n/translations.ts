import { Language } from '../types/community';

export const translations = {
  en: {
    // Top Bar & Controls
    communityTitle: 'Grand Palms Residences',
    personaResident: 'Resident (Flat A-402)',
    personaSecurity: 'Security Guard (Gate 1)',
    personaAdmin: 'Association Admin',
    personaStaff: 'Maintenance Staff',
    roleLabel: 'Active Role',
    langToggle: 'தமிழ்',
    viewMobile: 'Mobile View',
    viewFull: 'Desktop View',
    notifications: 'Notifications',
    resetDemo: 'Reset Demo Data',
    resetSuccess: 'Demo data has been reset to initial state.',

    // Common Verbs & Status
    allow: 'Allow Entry',
    deny: 'Deny',
    payNow: 'Pay Now',
    paid: 'Paid',
    pending: 'Pending',
    overdue: 'Overdue',
    approved: 'Approved',
    denied: 'Denied',
    waitingApproval: 'Waiting Approval',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
    submitted: 'Submitted',
    cancel: 'Cancel',
    confirm: 'Confirm',
    search: 'Search...',
    viewDetails: 'View Details',
    downloadReceipt: 'Download Receipt',
    save: 'Save',
    back: 'Back',
    all: 'All',

    // Resident Navigation
    navHome: 'Home',
    navBills: 'Bills',
    navVisitors: 'Visitors',
    navComplaints: 'Complaints',
    navFacilities: 'Facilities',
    navCommunity: 'Community',
    navDeliveries: 'Deliveries',
    navVehicles: 'Parking',
    navAssistant: 'AI Help',
    navMore: 'More',

    // Resident Dashboard (Feature 1)
    greeting: 'Welcome back,',
    flatSubtitle: 'Block A · 4th Floor · Flat 402',
    duesTitle: 'Monthly Maintenance',
    dueOn: 'Due by',
    viewBreakdown: 'View Breakdown',
    quickActions: 'Quick Actions',
    actionPay: 'Pay Maintenance',
    actionVisitor: 'Invite Visitor',
    actionComplaint: 'Raise Complaint',
    actionBook: 'Book Facility',
    actionEmergency: 'Emergency SOS',
    openTickets: 'Active Complaints',
    pendingVisitors: 'Pending Approvals',
    gateDeliveries: 'Parcels at Gate',
    upcomingEvents: 'Upcoming Community Events',
    latestNotice: 'Association Circular',

    // Maintenance & Billing (Feature 2)
    billingTitle: 'Maintenance & Utility Dues',
    billDetails: 'Bill Item Breakdown',
    securityFee: 'Security & Guarding',
    cleaningFee: 'Housekeeping & Waste',
    waterFee: 'Water Supply & Treatment',
    commonPowerFee: 'Common Area Electricity',
    liftAMCFee: 'Elevator Maintenance AMC',
    sinkingFundFee: 'Society Sinking Reserve',
    penalties: 'Late Fee / Penalties',
    totalPayable: 'Total Payable',
    paymentHistory: 'Past Payment History',
    paymentMethod: 'Test UPI / Card Checkout',
    receiptGenerated: 'Official Payment Receipt',

    // Visitor Management (Feature 3)
    visitorTitle: 'Visitor Pass Management',
    createPass: 'Create Expected Pass',
    visitorName: 'Visitor Full Name',
    visitorPhone: 'Visitor Mobile Number',
    visitorPurpose: 'Purpose of Visit',
    visitorDate: 'Expected Date',
    visitorTime: 'Arrival Time Window',
    activePasses: 'Active Expected Passes',
    unexpectedAlertTitle: 'Unexpected Visitor at Gate 1',
    unexpectedAlertDesc: 'is requesting clearance to enter Flat A-402.',

    // Security Gate Dashboard (Feature 19)
    gateTitle: 'Main Gate 1 Security Station',
    officerBadge: 'Duty Officer Raman Pillai · Badge #GP-08',
    passLookup: 'Verify Digital Pass Code',
    enterPassPlaceholder: 'Enter pass code (e.g. GP-8421)...',
    logUnexpectedVisitor: 'Log Unexpected Visitor',
    logDeliveryCourier: 'Record Delivery Package',
    logVehicleMovement: 'Gate Vehicle Entry / Exit',
    directoryLookup: 'Resident Intercom Directory',
    emergencyGateSiren: 'Gate Emergency Alarm',

    // Complaints & Maintenance (Feature 6)
    complaintsTitle: 'Community Service Desk',
    fileNewComplaint: 'New Service Request',
    categoryLabel: 'Issue Category',
    priorityLabel: 'Priority Level',
    descriptionLabel: 'Issue Description',
    photoUpload: 'Attach Photo / Video',
    reopenTicket: 'Reopen Complaint',
    closeTicket: 'Confirm & Close Ticket',

    // Facility Booking (Feature 7)
    facilitiesTitle: 'Apartment Amenities & Bookings',
    availableSlots: 'Available Time Slots',
    bookSlot: 'Reserve This Slot',
    myBookings: 'My Active Reservations',
    bookingFee: 'Reservation Fee',

    // Community Announcements (Feature 8)
    noticesTitle: 'Official Society Announcements',
    pinned: 'PINNED NOTICE',
    emergencyNotice: 'EMERGENCY ALERT',

    // Polls & Voting (Feature 9)
    pollsTitle: 'Community Voting & Polls',
    castVote: 'Cast Your Vote',
    alreadyVoted: 'You have voted on this poll',

    // Deliveries (Feature 11)
    deliveriesTitle: 'Package & Parcel Tracker',
    pickupOtpPrompt: 'Share this OTP with Guard at Gate:',
    markCollected: 'Mark as Collected',

    // SOS Emergency (Feature 14)
    sosTitle: 'Emergency SOS Protocol',
    sosPrompt: 'Press and hold to broadcast instant distress alarm to Gate Security and Association Administrators.',
    sosAmbulance: 'Ambulance (108)',
    sosPolice: 'Police Control (100)',
    sosFire: 'Fire Force (101)',
    sosSecurity: 'Main Gate Intercom',

    // AI Apartment Assistant (Feature 17)
    aiTitle: 'Apartment AI Assistant',
    aiSubtitle: 'Instant answers for society rules, bills, facility timings & maintenance',
    aiInputPlaceholder: 'Ask about maintenance due, gym hours, visitor rules...',

    // Admin Dashboard (Feature 18)
    adminTitle: 'Grand Palms Association Management Suite',
    statTotalFlats: 'Total Flats',
    statOccupancy: 'Occupied Units',
    statCollection: 'Total Collections',
    statPendingBills: 'Unpaid Dues',
    statOpenComplaints: 'Open Complaints',
    statGateTraffic: 'Today Visitors',
  },

  ta: {
    // Top Bar & Controls
    communityTitle: 'கிராண்ட் பாம்ஸ் குடியிருப்பு',
    personaResident: 'குடியிருப்பாளர் (வீடு A-402)',
    personaSecurity: 'பாதுகாப்புக் காவலர் (வாயில் 1)',
    personaAdmin: 'சங்க நிர்வாகி (தலைவர்)',
    personaStaff: 'பராமரிப்பு பணியாளர்',
    roleLabel: 'செயலில் உள்ள பங்கு',
    langToggle: 'English',
    viewMobile: 'மொபைல் காட்சி',
    viewFull: 'டெஸ்க்டாப் காட்சி',
    notifications: 'அறிவிப்புகள்',
    resetDemo: 'தரவை மீட்டமைக்க',
    resetSuccess: 'அனைத்து விவரங்களும் ஆரம்ப நிலைக்கு மீட்டமைக்கப்பட்டன.',

    // Common Verbs & Status
    allow: 'அனுமதிக்கவும்',
    deny: 'மறுக்கவும்',
    payNow: 'கட்டணம் செலுத்தவும்',
    paid: 'செலுத்தப்பட்டது',
    pending: 'நிலுவையில்',
    overdue: 'தாமதமானது',
    approved: 'அனுமதிக்கப்பட்டது',
    denied: 'மறுக்கப்பட்டது',
    waitingApproval: 'அனுமதிக்கு காத்திருக்கிறது',
    inProgress: 'பணி நடக்கிறது',
    resolved: 'தீர்க்கப்பட்டது',
    closed: 'முடிக்கப்பட்டது',
    submitted: 'சமர்ப்பிக்கப்பட்டது',
    cancel: 'ரத்து செய்',
    confirm: 'உறுதி செய்',
    search: 'தேடுக...',
    viewDetails: 'விவரங்களைப் பார்க்க',
    downloadReceipt: 'ரசீது பதிவிறக்கம்',
    save: 'சேமிக்க',
    back: 'பின்செல்க',
    all: 'அனைத்தும்',

    // Resident Navigation
    navHome: 'முகப்பு',
    navBills: 'பராமரிப்பு',
    navVisitors: 'பார்வையாளர்',
    navComplaints: 'புகார்கள்',
    navFacilities: 'வசதிகள்',
    navCommunity: 'சமூகம்',
    navDeliveries: 'பார்சல்கள்',
    navVehicles: 'பார்க்கிங்',
    navAssistant: 'AI உதவி',
    navMore: 'மேலும்',

    // Resident Dashboard (Feature 1)
    greeting: 'வணக்கம்,',
    flatSubtitle: 'பிளாக் A · 4-வது தளம் · வீடு 402',
    duesTitle: 'மாதாந்திர பராமரிப்பு கட்டணம்',
    dueOn: 'கடைசி தேதி',
    viewBreakdown: 'விவரங்கள் பார்க்க',
    quickActions: 'விரைவு செயல்கள்',
    actionPay: 'கட்டணம் செலுத்த',
    actionVisitor: 'பார்வையாளர் பாஸ்',
    actionComplaint: 'புகார் அளிக்க',
    actionBook: 'வசதி முன்பதிவு',
    actionEmergency: 'அவசர உதவி SOS',
    openTickets: 'நிலுவை புகார்கள்',
    pendingVisitors: 'அனுமதி கோரிக்கைகள்',
    gateDeliveries: 'வாயிலில் உள்ள பார்சல்கள்',
    upcomingEvents: 'வரவிருக்கும் நிகழ்வுகள்',
    latestNotice: 'சங்க அறிவிப்பு',

    // Maintenance & Billing (Feature 2)
    billingTitle: 'பராமரிப்பு & பயன்பாட்டுக் கட்டணம்',
    billDetails: 'கட்டண விவரப் பட்டியல்',
    securityFee: 'பாதுகாப்பு & காவலாளி',
    cleaningFee: 'தூய்மைப் பணி & குப்பை',
    waterFee: 'குடிநீர் விநியோகம்',
    commonPowerFee: 'பொது மின்சாரம்',
    liftAMCFee: 'மின்தூக்கி (Lift) பராமரிப்பு',
    sinkingFundFee: 'சங்க சேம நிதி',
    penalties: 'தாமதக் கட்டணம்',
    totalPayable: 'செலுத்த வேண்டிய தொகை',
    paymentHistory: 'முந்தைய செலுத்துதல் வரலாறு',
    paymentMethod: 'UPI / அட்டை வழி செலுத்துதல்',
    receiptGenerated: 'அதிகாரப்பூர்வ ரசீது',

    // Visitor Management (Feature 3)
    visitorTitle: 'பார்வையாளர் அனுமதி மேலாண்மை',
    createPass: 'புதிய பாஸ் உருவாக்குக',
    visitorName: 'பார்வையாளர் பெயர்',
    visitorPhone: 'தொலைபேசி எண்',
    visitorPurpose: 'வருகையின் நோக்கம்',
    visitorDate: 'எதிர்பார்க்கப்படும் தேதி',
    visitorTime: 'வருகை நேரம்',
    activePasses: 'செயலில் உள்ள பாஸ்கள்',
    unexpectedAlertTitle: 'வாயில் 1-ல் புதிய பார்வையாளர்',
    unexpectedAlertDesc: 'வீடு A-402-க்குள் நுழைய அனுமதி கேட்கிறார்.',

    // Security Gate Dashboard (Feature 19)
    gateTitle: 'முக்கிய நுழைவு வாயில் 1 நிலையம்',
    officerBadge: 'காவல் அதிகாரி ராமன் பிள்ளை · பேட்ஜ் #GP-08',
    passLookup: 'டிஜிட்டல் பாஸ் சரிபார்க்கவும்',
    enterPassPlaceholder: 'பாஸ் குறியீடு உள்ளிடவும் (எ.கா: GP-8421)...',
    logUnexpectedVisitor: 'புதிய பார்வையாளர் பதிவு',
    logDeliveryCourier: 'டெலிவரி பார்சல் பதிவு',
    logVehicleMovement: 'வாகன நுழைவு / வெளியேறுதல்',
    directoryLookup: 'குடியிருப்பாளர் தொலைபேசி பட்டியல்',
    emergencyGateSiren: 'அவசர வாயில் சைரன்',

    // Complaints & Maintenance (Feature 6)
    complaintsTitle: 'சேவை உதவி மையம்',
    fileNewComplaint: 'புதிய சேவை கோரிக்கை',
    categoryLabel: 'பிரச்சனை வகை',
    priorityLabel: 'முன்னுரிமை நிலை',
    descriptionLabel: 'விளக்கம்',
    photoUpload: 'புகைப்படம் இணைக்கவும்',
    reopenTicket: 'மீண்டும் புகாரை திறக்கவும்',
    closeTicket: 'புகாரை முடிக்கவும்',

    // Facility Booking (Feature 7)
    facilitiesTitle: 'குடியிருப்பு வசதிகள் & முன்பதிவு',
    availableSlots: 'கிடைக்கும் நேரங்கள்',
    bookSlot: 'இந்த நேரத்தை முன்பதிவு செய்',
    myBookings: 'எனது முன்பதிவுகள்',
    bookingFee: 'முன்பதிவு கட்டணம்',

    // Community Announcements (Feature 8)
    noticesTitle: 'அதிகாரப்பூர்வ சங்க அறிவிப்புகள்',
    pinned: 'முக்கிய அறிவிப்பு',
    emergencyNotice: 'அவசர அறிவிப்பு',

    // Polls & Voting (Feature 9)
    pollsTitle: 'குடியிருப்பாளர் கருத்துக்கணிப்பு',
    castVote: 'வாக்களிக்கவும்',
    alreadyVoted: 'நீங்கள் ஏற்கனவே வாக்களித்துவிட்டீர்கள்',

    // Deliveries (Feature 11)
    deliveriesTitle: 'பார்சல் மற்றும் கொரியர் கண்காணிப்பு',
    pickupOtpPrompt: 'வாயிலில் காவலாளியிடம் இந்த OTP கூறவும்:',
    markCollected: 'பெறப்பட்டது என உறுதிசெய்',

    // SOS Emergency (Feature 14)
    sosTitle: 'அவசர கால SOS நெறிமுறை',
    sosPrompt: 'வாயில் பாதுகாப்பு மற்றும் சங்க நிர்வாகிகளுக்கு உடனடி எச்சரிக்கை அனுப்ப அழுத்தவும்.',
    sosAmbulance: 'ஆம்புலன்ஸ் (108)',
    sosPolice: 'காவல்துறை (100)',
    sosFire: 'தீயணைப்பு துறை (101)',
    sosSecurity: 'முக்கிய வாயில் தொடர்பு',

    // AI Apartment Assistant (Feature 17)
    aiTitle: 'குடியிருப்பு AI உதவியாளர்',
    aiSubtitle: 'சங்க விதிகள், கட்டணங்கள், வசதிகள் பற்றி உடனடி தகவல்',
    aiInputPlaceholder: 'கட்டண நிலுவை, உடற்பயிற்சி கூடம் நேரம் பற்றி கேளுங்கள்...',

    // Admin Dashboard (Feature 18)
    adminTitle: 'கிராண்ட் பாம்ஸ் குடியிருப்பு சங்க மேலாண்மை',
    statTotalFlats: 'மொத்த வீடுகள்',
    statOccupancy: 'குடியேறிய வீடுகள்',
    statCollection: 'வசூலிக்கப்பட்ட தொகை',
    statPendingBills: 'நிலுவை கட்டணங்கள்',
    statOpenComplaints: 'நிலுவை புகார்கள்',
    statGateTraffic: 'இன்றைய பார்வையாளர்கள்',
  }
};

export const getTranslation = (lang: Language, key: keyof typeof translations['en']): string => {
  return translations[lang][key] || translations['en'][key] || key;
};
