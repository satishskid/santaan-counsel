# Santaan IVF Platform - Complete Feature Review & Workflows

## 🎯 **CORE PHILOSOPHY**
**Events → Templates → Communication → Reaction Capture → Timeline Update**

Every patient interaction follows this flow:
1. Clinical event occurs (scan, consultation, OPU, etc.)
2. Staff selects pre-built template for that event
3. Communication happens (verbal, WhatsApp, SMS, call)
4. Patient's emotional reaction captured (emoji)
5. Timeline automatically updated with full context

---

## 🔐 **1. AUTHENTICATION & SESSION**

### Login Workflow
```
User visits / → Redirects to /login
  ↓
Enter credentials (admin@demo.clinic / admin123)
  ↓
Backend validates JWT → Returns user object
  ↓
Zustand stores auth state → Navigates to /dashboard
  ↓
Protected routes check isAuthenticated before rendering
```

**What We Have:**
- ✅ JWT-based stateless authentication
- ✅ Role-based user system (Admin, Doctor, Nurse, Embryologist, Counselor, Receptionist)
- ✅ Persistent login (survives page reload via localStorage)
- ✅ Protected route wrapper
- ✅ Logout functionality

**Test Cases:**
1. Login with valid credentials → Should reach dashboard
2. Login with invalid credentials → Should show error
3. Access /patients/1 without auth → Should redirect to /login
4. Reload page after login → Should stay authenticated
5. Logout → Should clear session and redirect to login

---

## 👥 **2. PATIENT MANAGEMENT**

### Dashboard View
```
Dashboard loads → Fetches GET /patients?limit=10
  ↓
Displays patient cards with:
  - Name, MR#, age
  - Current cycle status
  - Primary diagnosis
  ↓
Click patient → Navigate to /patients/:id
```

### Patient Search
```
Type in search box (autocomplete component)
  ↓
Debounced API call: GET /patients/search?query=Priya
  ↓
Returns matching patients
  ↓
Select patient → Navigate to patient view
```

### Walk-in Registration
```
Click "Walk-in" button → Modal opens
  ↓
Fill minimal form:
  - Name
  - Phone
  - Age (optional)
  ↓
POST /patients/walkin
  ↓
Creates patient → Navigates to /patients/:newId
```

**What We Have:**
- ✅ Patient list with pagination
- ✅ Patient search with autocomplete
- ✅ Quick walk-in registration modal
- ✅ Patient profile view
- ✅ Patient update capability

**Test Cases:**
1. Dashboard shows list of patients
2. Search for "Priya" → Shows matching results
3. Create walk-in patient → Should create and navigate
4. Click on patient → Should open 3-column view

---

## 📊 **3. THE 3-COLUMN CLINICAL INTERFACE** (Main Innovation)

### Layout Structure
```
┌─────────────────────────────────────────────────────────┐
│  ← Dashboard    User: Dr. Sharma (doctor)    Logout     │
├────────┬──────────────────────────┬────────────────────┤
│ LEFT   │      MIDDLE              │       RIGHT        │
│ 25%    │      50%                 │       25%          │
│        │                          │                    │
│ PATIENT│   CLINICAL LOGGING       │   ACTIONS          │
│ PROFILE│   (Event-driven)         │   (Templates)      │
│        │                          │                    │
│ • Name │   [Event Type Dropdown]  │  📱 WhatsApp      │
│ • Age  │   👨‍⚕️ Consultation        │  📞 Called        │
│ • MR#  │                          │  💬 Verbally      │
│        │   [Clinical Chips]       │  📧 SMS           │
│ • AMH  │   📋 History Taken       │                    │
│ • AFC  │   🔍 Examination Done    │  [Template Text]  │
│        │   💊 Protocol Decided    │                    │
│ Timeline│                          │  [Reactions]      │
│ Events │   [Free Text Note]       │  😊 😌 😟 😰      │
│ ↓      │   "Discussed PCOS..."    │                    │
└────────┴──────────────────────────┴────────────────────┘
```

### Workflow: Logging a Consultation Event
```
1. Doctor opens patient view
   ↓
2. LEFT column shows patient summary
   - Priya Sharma, 32yrs, MR# P-0001
   - AMH: 2.8, AFC: 12
   - Timeline of previous visits
   ↓
3. MIDDLE column: Select "👨‍⚕️ Consultation" from dropdown
   ↓
4. Chips appear based on event + role:
   - Doctor sees: History Taken, Examination Done, Protocol Decided
   - Counselor sees: Procedure Explained, Cost Discussed
   ↓
5. Click chips to build note:
   ✅ History Taken
   ✅ Examination Done
   ✅ Protocol Decided: Antagonist 150
   ↓
6. Add free text: "Patient very anxious about egg count. Reassured."
   ↓
7. RIGHT column: Select communication channel
   - Click "💬 Verbally Conveyed"
   ↓
8. Template auto-populates based on event:
   "Hello Priya, based on today's consultation, we recommend
    starting Antagonist 150 IU protocol..."
   ↓
9. Copy template (or send via WhatsApp when integrated)
   ↓
10. Capture reaction: Click 😟 (Worried)
   ↓
11. Click "Save to Timeline"
   ↓
12. Event saved to database:
   - eventType: 'consultation'
   - clinicalNotes: "📋 History Taken. 🔍 Examination Done..."
   - communicationChannel: 'verbal'
   - patientReaction: 'worried'
   - staffId: current doctor
   - timestamp: now
   ↓
13. Timeline refreshes → Event appears in LEFT column
```

**What We Have:**
- ✅ 3-column responsive layout
- ✅ Event type dropdown (14 types)
- ✅ Role-based chips (Doctor, Nurse, Embryologist, Counselor)
- ✅ Event-specific chips (Consultation has different chips than OPU)
- ✅ Free text note area
- ✅ Communication channel selection (4 types)
- ✅ Template auto-fill based on event
- ✅ Emoji reaction capture (6 emotions)
- ✅ Timeline event creation
- ✅ Real-time timeline update

**Test Cases:**
1. Select "Baseline Scan" → Should show scan-specific chips
2. Click protocol chip → Should show protocol schedule editor
3. Select WhatsApp → Template should populate
4. Click emoji → Should highlight selection
5. Save event → Should appear in timeline immediately
6. Different user roles see different chips for same event

---

## 💬 **4. TEMPLATE SYSTEM** (810 Templates)

### Template Selection & Rendering
```
Event Type Selected: "embryo_transfer"
  ↓
Filter templates: GET /templates?eventType=embryo_transfer&language=English
  ↓
Returns ~15 templates for ET:
  - Pre-transfer preparation (WhatsApp)
  - Transfer day instructions (Verbal)
  - Post-transfer care (WhatsApp)
  - Beta test reminder (SMS)
  ↓
Template selected → Renders with variables:
  "Hi {{patient_name}}, your transfer is scheduled for {{date}}..."
  ↓
Variables filled:
  patient_name → "Priya"
  date → "15th Feb"
  doctor_name → "Dr. Sharma"
  ↓
Final: "Hi Priya, your transfer is scheduled for 15th Feb..."
```

### Template Structure
```json
{
  "id": "uuid",
  "name": "Embryo Transfer Day Instructions",
  "eventType": "embryo_transfer",
  "category": "General",
  "language": "English",
  "channel": "whatsapp",
  "content": "Hi {{patient_name}}! 🌱\n\nYour embryo transfer is TODAY at {{time}}.\n\n✅ Come with full bladder\n✅ Partner can accompany\n✅ Bring consent form\n\nDr. {{doctor_name}} | {{clinic_phone}}",
  "suggestedVisuals": ["uterus_diagram.png", "embryo_grade.jpg"],
  "talkingPoints": ["Explain bed rest", "Beta test date"],
  "isActive": true
}
```

**What We Have:**
- ✅ 748 English templates (across 14 event types)
- ✅ 62 Odia templates (Counseling, Donor, PGT-A)
- ✅ Multi-channel (WhatsApp, SMS, Verbal, Call)
- ✅ Variable substitution system
- ✅ Template CRUD API
- ✅ Template rendering API
- ✅ Category organization

**Test Cases:**
1. GET /templates/all → Should return 810 templates
2. Filter by eventType → Should return relevant templates
3. Filter by language=Odia → Should return 62 templates
4. Render template with variables → Should substitute correctly
5. Create custom template → Should save and appear in list

---

## 🧬 **5. PROTOCOL SYSTEM** (Action Series Generation)

### Protocol Workflow
```
Doctor clicks "🟣 Start Antagonist 150" chip
  ↓
Modal opens: ProtocolScheduleEditor
  ↓
Shows 10-day schedule:
  Day 1: Gonal-F 150 IU at 21:00 (WhatsApp reminder at 20:00)
  Day 2: Gonal-F 150 IU at 21:00
  ...
  Day 6: Add Cetrotide 0.25mg
  Day 9: Trigger shot at 22:00
  Day 11: OPU at 09:00
  ↓
Doctor can:
  - Edit injection times
  - Skip days (with reason)
  - Adjust dosages
  ↓
Click "Generate Series"
  ↓
POST /protocols/:id/generate {patientId, startDate}
  ↓
Creates action_series record with 30+ scheduled actions:
  [
    {day: 1, time: "20:00", type: "whatsapp", template: "injection_reminder"},
    {day: 1, time: "21:00", type: "medication", name: "Gonal-F 150 IU"},
    ...
  ]
  ↓
Actions appear in patient's Action Queue
  ↓
Nurse can execute or skip each action
```

**What We Have:**
- ✅ 4 pre-defined protocols (Antagonist 150, Antagonist 225, Long Agonist, Natural Cycle)
- ✅ Day-by-day medication schedules
- ✅ Inline schedule editor (drag times, skip days)
- ✅ Action series generation API
- ✅ Skip action with reason tracking
- ✅ Update series schedule API
- ✅ Protocol integration with timeline chips

**Test Cases:**
1. Click protocol chip → Schedule editor appears
2. Edit injection time → Should update
3. Skip Day 3 with reason → Should mark skipped
4. Generate series → Should create 30+ actions
5. Fetch series by ID → Should return full schedule
6. Update series → Should persist changes

---

## 🔤 **6. ACRONYM EXPANSION**

### Acronym Workflow
```
Staff types in notes: "Pt needs IVF with ICSI and PGT-A"
  ↓
On blur or button click:
  POST /acronyms/expand {text: "..."}
  ↓
Backend expands:
  IVF → In Vitro Fertilization
  ICSI → Intracytoplasmic Sperm Injection
  PGT-A → Preimplantation Genetic Testing for Aneuploidy
  ↓
Returns: "Patient needs In Vitro Fertilization with
         Intracytoplasmic Sperm Injection and Preimplantation
         Genetic Testing for Aneuploidy"
```

**What We Have:**
- ✅ Acronym dictionary (100+ medical acronyms)
- ✅ Expansion API endpoint
- ✅ Case-insensitive matching
- ✅ Multiple acronym expansion in one text

**Test Cases:**
1. Expand "IVF" → "In Vitro Fertilization"
2. Expand "FSH" → "Follicle Stimulating Hormone"
3. Expand mixed case "ivf" → Should still expand
4. Expand multiple in text → All should expand

---

## 🗄️ **7. DATABASE & API**

### Data Models
```
User
├─ id, email, password (hashed), firstName, lastName
├─ role (ENUM: admin, doctor, nurse, etc.)
├─ clinicId (multi-tenant support)
└─ Relations: TimelineEvents, ActionQueues

Patient
├─ id, mrNumber, firstName, lastName, phone, email, age
├─ amh, afc, primaryDiagnosis, previousCycles
├─ clinicId
└─ Relations: Cycles, TimelineEvents

TimelineEvent
├─ id, patientId, eventType, eventDate, staffId
├─ clinicalNotes (chips + free text)
├─ communicationChannel, templateUsed
├─ patientReaction, anxietyLevel
└─ Relations: Patient, Staff

Template
├─ id, name, eventType, category, language, channel
├─ content (with {{variables}})
├─ suggestedVisuals[], talkingPoints[]
├─ timesUsed, avgAnxietyReduction
└─ isActive

Protocol
├─ id, name, category, duration, color
└─ schedule[] (day-by-day actions)

ActionSeries
├─ id, protocolId, patientId, startDate, status
└─ Relations: ActionQueues[]

ActionQueue
├─ id, seriesId, day, scheduledFor, actionType
├─ actionIcon, actionLocation, templateKey
├─ isCompleted, isSkipped, skipReason
└─ Relations: ActionSeries
```

### API Endpoints (28 total)
```
Authentication
  POST   /auth/login
  GET    /auth/me
  POST   /auth/change-password

Patients
  GET    /patients
  GET    /patients/search?query=
  POST   /patients
  POST   /patients/walkin
  GET    /patients/:id
  PUT    /patients/:id
  GET    /patients/:id/timeline

Timeline
  GET    /timeline/:patientId
  POST   /timeline/:patientId/events
  GET    /timeline/events/:eventId
  PUT    /timeline/events/:eventId
  DELETE /timeline/events/:eventId

Templates
  GET    /templates?eventType=&language=
  GET    /templates/all
  POST   /templates/render
  POST   /templates
  PUT    /templates/:id

Protocols
  GET    /protocols
  GET    /protocols/:id
  POST   /protocols/:id/generate
  GET    /protocols/series/:id
  PUT    /protocols/series/:id
  POST   /protocols/series/:seriesId/skip/:actionId

Acronyms
  GET    /acronyms
  POST   /acronyms/expand
```

**What We Have:**
- ✅ PostgreSQL with Prisma ORM
- ✅ Neon cloud database (serverless)
- ✅ Database migrations
- ✅ Seed data (3 users, 2 patients, 810 templates, 4 protocols, 100+ acronyms)
- ✅ JSONB fields for flexible data
- ✅ Multi-tenant isolation by clinicId
- ✅ Foreign key relationships
- ✅ Joi validation on all POST/PUT
- ✅ Error handling middleware
- ✅ Winston logging

**Test Cases:**
1. Create patient → Should return patient object
2. Get timeline → Should return events sorted by date
3. Create event with invalid data → Should return 400 error
4. Update non-existent event → Should return 404
5. Database query with invalid clinicId → Should return empty array

---

## 📱 **8. FRONTEND TECH STACK**

**What We Have:**
- ✅ React 18 with hooks
- ✅ Vite for build & dev server
- ✅ React Router v6 (client-side routing)
- ✅ Zustand for state management (auth, patient)
- ✅ Tailwind CSS + custom Claude-inspired theme
- ✅ Lucide React icons
- ✅ Axios for API calls
- ✅ Date-fns for date formatting
- ✅ Component isolation (pages vs components)

---

## 🚀 **WHAT'S ACTUALLY WORKING (Summary)**

### Fully Functional
1. **Login/Logout** - JWT auth with role-based access
2. **Dashboard** - Patient list, search, walk-in registration
3. **3-Column Patient View** - Left (Profile), Middle (Clinical Logging), Right (Actions)
4. **Event-Driven Workflow** - 14 event types with role-specific chips
5. **Template System** - 810 templates with variable substitution
6. **Protocol System** - 4 protocols with action series generation
7. **Timeline** - Real-time event stream with full context
8. **Acronym Expansion** - Medical terminology auto-expansion
9. **Database** - PostgreSQL with all migrations and seeds
10. **API** - 28 RESTful endpoints with validation

### Partially Implemented
1. **WhatsApp Integration** - Template ready, needs Business API connection
2. **SMS Integration** - Template ready, needs Twilio/similar
3. **Email Notifications** - Infrastructure exists, needs configuration
4. **File Upload** - Endpoint exists, UI not integrated
5. **Analytics Dashboard** - Data tracked, visualization pending

### Not Yet Built
1. Unit/E2E tests
2. API documentation (Swagger)
3. Rate limiting
4. CI/CD pipeline
5. Performance monitoring
6. Backup automation

---

## ✅ **COMMITMENTS FOR RELEASE v1.0**

**What we're shipping:**
- ✅ Complete clinical workflow (Events → Templates → Communication)
- ✅ 810 production-ready templates (748 EN, 62 Odia)
- ✅ 3-column interface for efficient logging
- ✅ Protocol-driven medication schedules
- ✅ Timeline-based patient journey tracking
- ✅ Role-based access control
- ✅ Multi-language support
- ✅ Acronym auto-expansion
- ✅ Docker deployment ready
- ✅ Neon cloud database

**Known limitations (documented):**
- No automated tests yet (manual QA only)
- WhatsApp/SMS not integrated (templates ready)
- No API documentation
- Analytics dashboard placeholder

**Post-v1.0 roadmap:**
- v1.1: E2E test suite + WhatsApp integration
- v1.2: SMS integration + analytics
- v1.3: Mobile app + offline support
