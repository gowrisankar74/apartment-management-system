# Apartment Community Platform (24-Feature Living OS)

A unified digital ecosystem for gated communities and modern apartment complexes, providing specialized role-based experiences for **Residents**, **Gate Security Guards**, **Association Administrators**, and **Maintenance Staff**, covering all 24 features from the specification with full English & Tamil bilingual support.

## User Review & Critical Decisions

> [!IMPORTANT]
> The platform is architected around 4 distinct role-based interfaces sharing a unified, real-time relational state store:
> 1. **Resident Mobile App**: Fast, thumb-friendly mobile experience with instant access to visitor approvals, maintenance bills, complaints, bookings, SOS, deliveries, and community life.
> 2. **Security Gate Tablet**: High-contrast, minimal-typing gate station with instant QR/code pass lookup, unexpected visitor clearance, courier package intake, and vehicle logs.
> 3. **Association Admin Web Panel**: High-density desktop workspace featuring operational KPIs, flat & resident directory, billing collection ledger, staff dispatch, and analytics reports.
> 4. **Maintenance Staff Portal**: Streamlined field ticket interface for technicians to view assigned tickets, update work notes, and resolve work orders.

- **Confirmed Scope**: All 24 core features implemented with active event handlers, realistic Indian gated community seed data ("Grand Palms Residences", 4 Blocks: Amber, Beryl, Coral, Emerald), and live English & Tamil (தமிழ்) language switching.
- **Interactive Role Switcher**: A top persona bar lets reviewers effortlessly toggle between Resident (Priya & Karthik - Flat A-402), Security Guard (Gate 1 - Officer Raman), Association Admin (President Sundaram), and Maintenance Staff (Electrician Murugan) to test end-to-end multi-role workflows.

---

## 1. Overview & Core Concept

- **What It Does**: Digitizes end-to-end community operations, replacing fragmented WhatsApp groups, paper registers, and manual billing. Connects gate security directly with resident phones for sub-second visitor approvals, automates maintenance collections with downloadable receipts, organizes complaint resolution with SLA tracking, and fosters community engagement through polls, marketplace, and events.
- **Target Audience / Personas**:
  - *Residents & Tenants*: Manage home bills, pre-approve guests, track couriers, book tennis/clubhouse slots, and trigger instant SOS.
  - *Security Guards*: Record gate movements with large touch targets, verify digital passes, and notify residents of unexpected visitors.
  - *Association Admins & Treasurers*: Track dues, audit gate traffic, manage vendor contracts, and broadcast emergency circulars.
  - *Maintenance Technicians*: Receive assigned work orders, inspect photos, upload completion remarks, and resolve tickets.
- **Key Value**: 100% auditable gate security, zero lost delivery packages, transparent society finances with itemized breakdowns, and measurable maintenance SLAs.

---

## 2. User Experience & Visual Design

### Key Role-Based Flows & Verification Journeys

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       MULTI-PERSONA INTERACTIVE WORKFLOWS                    │
└─────────────────────────────────────────────────────────────────────────────┘
  [ Resident App ]               [ Security Gate ]              [ Admin Panel ]
         │                              │                              │
  1. Creates Guest Pass ───────────────>│ 2. Scans / Verifies Pass     │
         │                              │    Records Entry Timestamp   │
         │                              │                              │
  3. Receives Unexpected <──────────────│ 4. Logs Unexpected Guest     │
     Approval (Allow/Deny)              │    Awaits One-Tap Clearance  │
         │                              │                              │
  5. Gets Delivery Alert <──────────────│ 6. Logs Courier Package      │
     (Marks Collected)                  │                              │
         │                                                             │
  7. Files Plumbing Ticket ───────────────────────────────────────────>│ 8. Assigns Staff
         │                                                             │    (SLA Tracking)
         ▼                                                             ▼
  9. Maintenance Staff updates to In-Progress ➔ Resolves ➔ Resident closes/reopens
```

### Visual Identity & Theme
- **Color Palette (60-30-10 Rule)**:
  - *Canvas (60%)*: Clean neutral slate (`#f8fafc` light, `#090d16` dark mode) with subtle warm undertones for high readability.
  - *Structural Surfaces (30%)*: Card containers with hairline 1px borders (`#e2e8f0` / `#1e293b`), elevated floating headers with backdrop blur (`backdrop-blur-md bg-white/90`).
  - *Accents (10%)*: Deep Emerald (`#059669`) for authorized gate clearance and verified bills, Royal Navy (`#1e40af`) for admin operations, Amber (`#d97706`) for pending actions, and Coral Red (`#dc2626`) reserved strictly for SOS emergency alarms.
- **Typography & Formatting**:
  - Display & Headings: *Plus Jakarta Sans* with tight letter tracking (`tracking-tight`) and balanced headlines.
  - Data & Currencies: *JetBrains Mono* with `tabular-nums` for INR currency amounts (`₹4,850`), flat numbers (`A-402`), vehicle plates (`TN-09-CB-4821`), and gate timestamps.
  - Zero-Pill Discipline: Metadata separated by clean typographic bullets (`·`) and subtle hair dividers instead of cluttered pill badge sandwiches.
- **Bilingual Interface**:
  - Full instantaneous language toggle between **English** and **Tamil (தமிழ்)** across all navigation labels, quick actions, billing terms, and notifications.

---

## 3. Key Product Decisions & Trade-Offs

- **Unified Reactive State with Local Storage & In-Memory Synchronization**:
  - *Chosen Approach*: Single source of truth managing all 24 entities (Flats, Bills, Passes, Complaints, Bookings, Deliveries, Vehicles, Polls, Marketplace, Lost & Found, Pets, Meter Readings, SOS Alarms, Audit Logs) initialized with rich seed data.
  - *Why*: Enables immediate multi-device simulation—when Security logs a delivery or visitor, the Resident view immediately reflects the incoming approval or notification without network latency.
- **Adaptive Viewport Modes (Mobile Frame vs. Full Web Workspace)**:
  - *Chosen Approach*: Resident and Security apps render within an ergonomic mobile smartphone/tablet viewport frame (with responsive breakout toggle), while the Admin Panel renders as an expansive multi-column SaaS desktop workspace.
  - *Why*: Reflects the authentic real-world usage patterns specified in the requirements (mobile-first for guards and residents; desktop dashboard for society management).
- **Rule-Based AI Assistant Context**:
  - *Chosen Approach*: AI Assistant provides immediate context-aware responses (dues, facility rules, complaints, gate policies) tailored to the authenticated resident's flat data, with optional Gemini API integration via `@google/genai` when keys are configured.
  - *Why*: Guarantees instant sub-100ms answers offline while maintaining resident data privacy boundaries.

---

## 4. Technical Architecture & Data Strategy

### System Architecture & Component Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          APARTMENT OS CONTROL BAR                           │
│  [Community: Grand Palms] ─ [Persona Switcher] ─ [Language: EN/தமிழ்] ─ [Mode] │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        ▼                              ▼                              ▼
┌───────────────────────┐  ┌───────────────────────┐  ┌───────────────────────┐
│     RESIDENT APP      │  │     SECURITY APP      │  │      ADMIN PANEL      │
│  (Mobile Ergonomic)   │  │  (High-Touch Gate)    │  │ (Multi-Column Web)    │
├───────────────────────┤  ├───────────────────────┤  ├───────────────────────┤
│ • 1. Home Dashboard   │  │ • 19. Gate Console    │  │ • 18. Admin Overview  │
│ • 2. Maintenance Dues │  │ • 3. Scan & Pass Check│  │ • Flat & Resident DB  │
│ • 3. Visitor Passes   │  │ • Unexpected Visitors │  │ • Bill Generation     │
│ • 4. My Vehicles      │  │ • 11. Courier Intake  │  │ • Staff Dispatching   │
│ • 5. Parking Slot     │  │ • 4. Vehicle Gate Log │  │ • Facility Blackouts  │
│ • 6. Complaints & Fix │  │ • Resident Directory  │  │ • Announcement Pub    │
│ • 7. Facility Booking │  │ • Emergency Intercom  │  │ • 23. Reports & CSV   │
│ • 8. Announcements    │  └───────────────────────┘  │ • Audit Log Trail    │
│ • 9. Polls & Voting   │                             └───────────────────────┘
│ • 10. Community Events│
│ • 11. My Deliveries   │                             ┌───────────────────────┐
│ • 12. Local Services  │                             │   MAINTENANCE STAFF   │
│ • 13. Marketplace     │                             ├───────────────────────┤
│ • 14. SOS Trigger     │                             │ • Assigned Work Orders│
│ • 15. Family Access   │                             │ • Photo Inspection    │
│ • 16. Documents Vault │                             │ • Work Notes & Status │
│ • 17. AI Assistant    │                             └───────────────────────┘
│ • 20. Meter Readings  │
│ • 21. Lost & Found    │
│ • 22. Pet Registry    │
│ • 24. Notification Ctr│
└───────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        COMMUNITY CENTRAL DATA STORE                         │
│  Residents · Flats · Bills · Payments · Visitors · Passes · Complaints     │
│  Facilities · Bookings · Notices · Polls · Events · Vendors · Market Items  │
│  Deliveries · Meters · Pets · Lost&Found · SOS Events · Audit Logs · Locale │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 24 Core Features Matrix & Verification Checklist

1. **Resident Home Dashboard**: Quick greeting, flat badge (`A-402`), unpaid dues indicator, pending approvals banner, parcel notification, quick action buttons.
2. **Maintenance & Payments**: Detailed breakdown (Security, Water, Common Power, Lift AMC, Sinking Fund), one-click test payment with instant digital receipt generator.
3. **Visitor Management**: Generate digital QR pass, specify date/time/purpose, security scan & unexpected visitor allow/deny push modal.
4. **Vehicle Management**: Register cars, bikes, EVs with slot linkage and gate entry/exit logging.
5. **Parking Management**: Slot registry (Basement 1/2), allocated flat, EV charging bay status, report blocked slot.
6. **Complaint & Maintenance**: Category selection, priority badge, photo upload simulator, assignment to staff, resolution workflow and resident reopen option.
7. **Facility Booking**: Clubhouse, Swimming Pool, Badminton Court, Gym, Party Hall with slot availability, rules, and instant reservation.
8. **Announcements**: Broadcast circulars categorized by Emergency, Maintenance, or General, pin notice to top, unread tracking.
9. **Polls & Voting**: Community voting (e.g. "Install Solar Panels in Block C"), vote tally, percentage bars, duplicate vote protection.
10. **Events & RSVP**: Festival celebrations, AGM meetings, sports tournament with participant headcount and 1-click RSVP.
11. **Deliveries & Packages**: Guard logs courier (Amazon, BlueDart, Swiggy) with parcel OTP; resident marks collected.
12. **Trusted Local Services**: Vetted electricians, plumbers, painters, AC techs with direct call/request buttons.
13. **Community Marketplace**: Resident classifieds (sofa, bicycle, books, baby stroller) with seller contact and "Mark as Sold".
14. **Emergency / SOS**: Prominent red SOS drawer with 1-tap alerts to Security Gate, Ambulance (`108`), Fire (`101`), Police (`100`), logging timestamped emergency alerts.
15. **Family & Tenant Management**: Add spouse, children, tenant accounts with permissions (e.g. view only, payment authority).
16. **Digital Documents Vault**: Society bylaws, AGM minutes, NOC forms, fire safety certificates with preview and download.
17. **AI Apartment Assistant**: Natural language Q&A grounded in apartment rules, dues, and timings.
18. **Admin Operations Dashboard**: High-level KPI cards (Total Flats, Occupancy Rate, Total Collection, Open Tickets, Gate Footfall), financial charts, and quick actions.
19. **Security Gate Dashboard**: High-contrast, big-button interface for rapid 5-second gate processing of visitors and deliveries.
20. **Utility Meter Tracking**: Electricity and water sub-meter logging, previous vs current units, automatic tariff calculation and usage graphs.
21. **Lost & Found**: Board for reporting misplaced keys, wallets, or found items with claim verification.
22. **Pet Registry**: Community pet directory with breed, photo, vaccination status, and lost pet broadcast.
23. **Reports & Analytics**: Collection summaries, complaint aging SLA reports, gate traffic trends, with CSV export.
24. **Notifications Center**: Centralized inbox for gate requests, billing alerts, society notices, and delivery updates with unread counts.
