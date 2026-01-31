# Santaan IVF - Cockpit Dashboard UX Plan V2
**Date:** January 31, 2026  
**Status:** UPDATED with User Feedback

---

## 🎯 Corrected Core Vision

Staff workflow is **ACTION-CENTRIC**, not patient-centric:

1. Staff opens app → **See TODAY'S TASKS/ACTIONS** (not just patient list)
2. Actions organized by patient, but focus is on **what needs to be done**
3. Patient may be in clinic OR at home - **timeline continues regardless**
4. Each action has **schedule intelligence** (one-time or series with protocol)
5. Doctor clicks chip → **Auto-generates treatment plan with schedule** → Staff can edit
6. Patient calls outside hours → **Search patient → See context → Address**
7. Doctor sees **overall dashboard** while staff work

---

## 🔑 Key Corrections from User Feedback

### 1. ✅ Patient List = TASK VIEW
**Not just a list of patients, but a TODO list organized by actions**

**Before (Wrong):**
```
Patient List
- Priya Sharma (3 pending actions)
- Anita Patel (1 pending action)
```

**After (Correct):**
```
TODAY'S ACTIONS (12 pending)
┌─ URGENT (Walk-in/Scheduled Today)
│  • Priya Sharma - Monitoring Scan + 2 actions
│  • Reema Singh - Trigger Shot Instructions + 1 action
│
┌─ PENDING COMMUNICATION (Remote)
│  • Anita Patel - Day 3 Injection Reminder
│  • Kavita Desai - Payment Follow-up
│
┌─ SCHEDULED FOR TODAY
│  • Preeti Joshi - Consent Discussion
│  • Sunita Rao - Embryo Update Call
```

### 2. ✅ Actions Have SCHEDULES (Not Just One-time)
**Treatment protocols auto-generate scheduled action series**

**Example: Doctor clicks "Start Antagonist Protocol" chip**
```
Auto-generates:
Day 1: 💉 Gonal-F 150 IU injection
  └─ 📱 WhatsApp: "Start injection tonight at 9 PM"
  
Day 2: 💉 Continue Gonal-F
  └─ 📱 WhatsApp: "How are you feeling? Any side effects?"
  
Day 3: 💉 Continue Gonal-F
  └─ 📱 WhatsApp: "Reminder: Injection tonight"
  
Day 5: 🏥 Monitoring Scan
  └─ 📞 Call: "Come for scan tomorrow morning"
  
Day 7: 🏥 Monitoring Scan
  └─ 📱 WhatsApp: "Scan scheduled for 9 AM"
  
Day 9: 💉 Add Ganirelix (antagonist)
  └─ 🗣️ Verbal: "Starting second injection today"
  
Day 10: 🏥 Trigger Shot
  └─ 📞 Call: "Take trigger shot EXACTLY at 10 PM"

[Staff can edit schedule before confirming]
```

### 3. ✅ Walk-in Registration
**Patient shows up unannounced → Quick registration → Jump to documentation**

```
[+ New Walk-in Patient] button
  ↓
Quick form: Name, Age, Phone, Reason for visit
  ↓
Auto-create timeline with "First Consultation" event
  ↓
Jump to cockpit → Document → Generate actions
```

### 4. ✅ Search for Phone Calls (Outside Hours)
**Patient calls at 11 PM → Staff searches → Sees full context**

```
[🔍 Search Patient]
  ↓
"Priya" → Shows: Priya Sharma (Day 10, Trigger phase)
  ↓
See timeline: Last scan showed 14-18mm follicles
See pending actions: Trigger shot scheduled for tonight 10 PM
See last communication: "Take trigger at 10 PM sharp" (Today 5 PM)
  ↓
Staff can answer: "Yes, take the shot now if you missed 10 PM"
  ↓
Log new action: 📞 Call - "Patient called at 11 PM, confused about timing"
```

### 5. ✅ Remote Action Management
**Timeline continues whether patient is in clinic or not**

**In-clinic actions:**
- Monitoring scan (patient present)
- Blood draw (patient present)
- Counseling session (patient present)
- OPU/Transfer (patient present)

**Remote actions:**
- WhatsApp injection reminders (patient at home)
- Call for scan scheduling (patient at home)
- Payment reminders (patient at home)
- Emotional check-ins (patient at home)

**Staff can execute BOTH types from same task view**

### 6. ✅ Doctor Dashboard (Overview)
**While staff work, doctor sees analytics**

```
Doctor view:
- 12 patients in active treatment
- 5 patients scheduled today
- 3 urgent actions pending
- Mood distribution: 60% stable
- Template confusion: opu_prep needs revision
- Success rate: 45% (last 3 months)

[Drill down into any patient if needed]
```

---

## 🏗️ Updated UX Architecture

### View 1: TASK VIEW (Entry Point)
**Purpose:** Staff opens app → See what needs to be done TODAY

```
┌─────────────────────────────────────────────────────────────────────┐
│ SANTAAN IVF - Dr. Sharma | Nurse | Logout          [+ Walk-in]     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  🔍 [Search patient...]                    📊 Dashboard (Doctor only)│
│                                                                       │
│  📋 MY TASKS FOR TODAY - Friday, Jan 31, 2026                        │
│                                                                       │
│  ┌─ 🚨 URGENT (3) ────────────────────────────────────────────────┐ │
│  │ • Priya Sharma - Trigger Shot Instructions (Overdue 30 min) 🔴│ │
│  │ • Reema Singh - Monitoring Scan (Patient waiting) 🔴          │ │
│  │ • Kavita Desai - Payment Follow-up (Due today) 🟡            │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─ 🏥 IN-CLINIC TODAY (2) ───────────────────────────────────────┐ │
│  │ • Anita Patel - Embryo Transfer (Scheduled 11 AM)              │ │
│  │   └─ Actions: Pre-transfer check (2), Consent (1), Transfer (3)│ │
│  │                                                                  │ │
│  │ • Sunita Rao - Baseline Scan (Scheduled 2 PM)                  │ │
│  │   └─ Actions: Scan (2), Protocol selection (1)                 │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─ 📱 REMOTE ACTIONS (7) ────────────────────────────────────────┐ │
│  │ • Preeti Joshi - Day 3 Injection Reminder (9 PM scheduled)     │ │
│  │ • Meera Shah - Scan Results WhatsApp (Pending)                 │ │
│  │ • Neha Gupta - Emotional Check-in Call (Scheduled 4 PM)        │ │
│  │ • Rina Patel - Payment Reminder (Due today)                    │ │
│  │ [+ 3 more...]                                                   │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ┌─ ✅ COMPLETED TODAY (4) ──────────────────────────────────────┐ │
│  │ • Sita Reddy - Monitoring Scan ✅ (9:30 AM)                     │ │
│  │ • Lata Verma - WhatsApp Reminder ✅ (10:00 AM)                  │ │
│  │ [+ 2 more...]                                                   │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

**Key Features:**
- **Grouped by urgency**: Urgent → In-clinic → Remote → Completed
- **Color-coded**: 🔴 Red (overdue), 🟡 Yellow (due today), ⚪ White (scheduled)
- **Click any task** → Opens cockpit view for that patient
- **Search bar** → For phone calls/walk-ins
- **[+ Walk-in]** button → Quick registration
- **Dashboard link** → Doctor analytics (role-based)

---

### View 2: COCKPIT VIEW (Updated)
**Purpose:** Address patient's timeline and today's actions

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ← Back to Tasks              PRIYA SHARMA | 32F | Day 10 | Cycle #2     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  📍 TIMELINE (Left 25%) ────┬──── 📝 DOCUMENT (Mid 40%) ──┬── ⚡ TODAY  │
│                             │                              │   (Right 35%)│
│  🔵 TODAY - Day 10          │  [Only shown when          │              │
│  Monitoring Scan            │   documenting]              │  URGENT TASKS│
│  └─ Click to document       │                              │  🔴 Trigger  │
│                             │  Event: Monitoring Scan     │     Shot Instr│
│  Day 9 ✅                   │                              │     (Overdue)│
│  Monitoring Scan            │  Chips (Doctor):            │     📞 CALL  │
│  "Follicles 14-18mm..."     │  [14mm] [18mm] [E2 rising] │     Template │
│  Actions: 2/2 done          │                              │     ready... │
│                             │  Chips (Nurse):             │              │
│  Day 7 ✅                   │  [BP 120/80] [Injected]     │  SCHEDULED   │
│  Monitoring Scan            │                              │  🏥 OPU Prep │
│  "Follicles growing..."     │  Note auto-builds:          │     (In 2 days)│
│  Actions: 3/3 done          │  "Follicles 14-18mm, E2..." │     📱 WhatsApp│
│                             │                              │     💬 SMS   │
│  Day 1 ✅                   │  🗓️ SCHEDULE ACTIONS:       │              │
│  Start Protocol             │  [Now] [Tonight 9 PM]       │  COMPLETED ✅ │
│  "Antagonist 150 IU"        │  [Tomorrow] [Series...]     │  Morning scan│
│  → Generated 10 actions     │                              │  WhatsApp msg│
│  Actions: 10/10 done        │  [Generate Actions]         │              │
└─────────────────────────────────────────────────────────────────────────┘
```

**NEW ELEMENTS:**

#### Schedule Action Chips (in Documentation Panel)
When doctor clicks "Start Antagonist Protocol" chip:
```
🗓️ SCHEDULE ACTIONS:

○ Execute Now (Verbal explanation in clinic)
○ Tonight 9 PM (First injection)
○ Tomorrow (Follow-up message)
○ Series (Auto-schedule 10 days) ← Click this

[If "Series" selected, shows editable schedule:]

Day 1: 💉 Injection + 📱 WhatsApp (9 PM)
Day 2: 📱 Check-in (10 AM) 
Day 3: 💉 Injection + 📱 Reminder (9 PM)
Day 5: 🏥 Scan (9 AM) + 📞 Call (Day before)
...
[Edit schedule] [Confirm & Generate]
```

#### Walk-in Registration Flow
```
[+ Walk-in Patient] button clicked
  ↓
Quick Form Modal:
┌──────────────────────────────┐
│ NEW PATIENT REGISTRATION     │
├──────────────────────────────┤
│ Name: [____________]         │
│ Age:  [__]                   │
│ Phone: [__________]          │
│ Reason: [First consult ▼]   │
│                              │
│ [Cancel]  [Register & Open] │
└──────────────────────────────┘
  ↓
Auto-creates patient record
Auto-creates timeline with "First Consultation" event
Opens cockpit view
Doctor can start documenting immediately
```

#### Search for Context (Phone Calls)
```
[🔍 Search: "Priya"]
  ↓
Dropdown results:
┌─────────────────────────────────────┐
│ Priya Sharma - Day 10, Trigger      │
│ Last: Monitoring scan (Today 9 AM)  │
│ Pending: Trigger shot (Tonight)     │
│                                     │
│ Priya Patel - Day 3, Baseline       │
│ Last: Consultation (2 days ago)     │
│ Pending: Start injections           │
└─────────────────────────────────────┘
  ↓
Click → Opens cockpit with full context
Staff can see:
- What was discussed last
- What patient should be doing now
- What questions they might have
  ↓
Log phone call as new action:
📞 Call - "Patient called with question about timing"
Reaction: 👍 Understood after clarification
```

---

## 🔄 Updated Complete User Flows

### Flow 1: Staff Starts Day
1. Staff logs in (Doctor/Nurse/Embryologist/Counselor/Receptionist)
2. Lands on **TASK VIEW**
3. Sees:
   - 3 URGENT tasks (overdue/waiting)
   - 2 IN-CLINIC patients scheduled today
   - 7 REMOTE actions (WhatsApp/calls to make)
   - 4 COMPLETED tasks already done
4. Decides which task to tackle first (urgent → scheduled → remote)

### Flow 2: Walk-in Patient Arrives
1. Patient walks in unannounced
2. Receptionist clicks **[+ Walk-in]**
3. Fills quick form (30 seconds)
4. Patient record created, timeline started
5. Doctor opens cockpit view
6. Documents consultation with chips
7. Clicks "Start Antagonist Protocol" chip
8. **NEW:** Schedule action series dialog appears
9. Reviews auto-generated 10-day schedule
10. Edits Day 5 scan time (9 AM → 10 AM)
11. Clicks **[Confirm & Generate]**
12. 10 actions created (mix of in-clinic and remote)
13. Closes cockpit → Returns to task view
14. Sees new actions added to "Remote Actions" section

### Flow 3: Execute In-Clinic Task
1. Staff clicks "Priya Sharma - Trigger Shot Instructions (Overdue)"
2. Cockpit opens
3. Timeline shows: Last scan was today morning
4. Right panel shows: **URGENT: Trigger Shot Instructions (📞 Call template ready)**
5. Staff clicks **[📞 CALL]** button
6. Template appears: "Take trigger shot EXACTLY at 10 PM tonight. Set 3 alarms..."
7. Staff reads template to patient (or shows on phone)
8. Clicks **[Mark as Conveyed]**
9. Reaction modal: "How did patient respond?"
10. Selects: 👍 **Understood**
11. Action marked complete
12. Returns to task view
13. Task moved to "Completed Today" section

### Flow 4: Execute Remote Task
1. Staff clicks "Preeti Joshi - Day 3 Injection Reminder (9 PM scheduled)"
2. Cockpit opens
3. Timeline shows: Started protocol on Day 1
4. Right panel shows: **📱 WhatsApp - "Reminder: injection tonight"**
5. Staff clicks **[📱 WhatsApp]** button
6. Template appears with patient name: "Hi Preeti, gentle reminder..."
7. Staff copies template
8. Opens WhatsApp on phone
9. Sends message to Preeti
10. Returns to app
11. Clicks **[Mark as Sent]**
12. (Later) Patient replies "Done ✅"
13. Staff clicks **[📱 WhatsApp]** action again
14. Reaction modal appears
15. Selects: 😊 **Happy**
16. Action marked complete with reaction

### Flow 5: Patient Calls Outside Hours (11 PM)
1. Patient calls: "I forgot to take trigger shot at 10 PM!"
2. Staff opens app (on phone/laptop)
3. Clicks **[🔍 Search]**
4. Types "Priya"
5. Sees: **Priya Sharma - Day 10, Trigger phase**
6. Clicks → Cockpit opens
7. Sees timeline:
   - Today: Monitoring scan (follicles ready)
   - Pending: Trigger shot at 10 PM
8. Sees action: **Trigger Shot Instructions (Completed 5 PM with 👍 Understood)**
9. Staff knows context immediately
10. Advises: "Take it now, we can still proceed with OPU"
11. Creates new action: **📞 Call - "Emergency call: Missed trigger shot"**
12. Adds note: "Patient called 11 PM, advised to take immediately"
13. Reaction: 😰 **Anxious** (for analytics)
14. Saves
15. Returns to task view

### Flow 6: Doctor Checks Dashboard
1. Doctor clicks **[📊 Dashboard]** (role-restricted)
2. Sees analytics:
   - 12 active patients
   - 5 scheduled today (3 done, 2 pending)
   - Task completion: 33% (8/24 actions done)
   - Mood distribution: 60% stable, 30% anxious, 10% confused
   - Template confusion: "trigger_shot_instructions" has 80% confusion rate
3. Clicks on "trigger_shot_instructions" bar
4. Sees list of patients who were confused
5. Realizes Odia translation is unclear
6. Makes note to revise template
7. Drills down into specific patient (Priya)
8. Opens cockpit view
9. Reviews timeline
10. Adds doctor's note if needed
11. Returns to dashboard

---

## 📊 Updated Data Model

### Action Object (Enhanced with Schedule)
```javascript
{
  id: "action_123",
  patientId: "pat_001",
  eventId: "evt_456", // Parent event that created this action
  
  // Action details
  actionType: "whatsapp", // whatsapp, call, verbal, sms
  templateId: "tmpl_injection_reminder",
  messageTemplate: "Hi {{name}}, reminder to take injection at {{time}}",
  
  // Schedule (NEW)
  scheduledFor: "2026-01-31T21:00:00Z", // When to execute
  scheduleType: "one_time", // one_time, recurring, series
  seriesId: "series_789", // If part of protocol series
  seriesDay: 3, // Day 3 of series
  
  // Execution
  status: "pending", // pending, completed, skipped, overdue
  executedAt: null,
  executedBy: null,
  
  // Reaction
  reaction: null, // 😊, 👍, 😰, 🤔, 😐, 😡
  reactionLabel: null,
  reactionNote: null,
  
  // Metadata
  createdAt: "2026-01-29T10:00:00Z",
  updatedAt: "2026-01-29T10:00:00Z"
}
```

### Series Object (NEW)
```javascript
{
  id: "series_789",
  patientId: "pat_001",
  eventId: "evt_456", // "Start Antagonist Protocol" event
  
  protocol: "antagonist_150iu", // Protocol template used
  startDate: "2026-01-29",
  endDate: "2026-02-08",
  
  actions: [
    {
      day: 1,
      actionType: "whatsapp",
      scheduledTime: "21:00",
      templateId: "tmpl_injection_start"
    },
    {
      day: 2,
      actionType: "whatsapp",
      scheduledTime: "10:00",
      templateId: "tmpl_injection_checkin"
    },
    // ... 8 more actions
  ],
  
  status: "active", // active, completed, cancelled
  completedActions: 3,
  totalActions: 10,
  
  // Can be edited before confirmation
  isEditable: false, // false once confirmed
  confirmedAt: "2026-01-29T10:05:00Z"
}
```

### Protocol Template (NEW)
```javascript
{
  id: "protocol_antagonist",
  name: "Antagonist Protocol (150 IU)",
  category: "ovarian_stimulation",
  
  chip: {
    emoji: "💉",
    label: "Start Antagonist 150 IU",
    text: "Started Antagonist protocol with 150 IU Gonal-F daily"
  },
  
  schedule: [
    {
      day: 1,
      events: [
        {
          type: "medication",
          name: "Gonal-F 150 IU",
          time: "21:00",
          actions: [
            {
              actionType: "whatsapp",
              templateId: "tmpl_injection_start",
              scheduledTime: "20:00" // 1 hour before
            }
          ]
        }
      ]
    },
    {
      day: 2,
      events: [
        {
          type: "medication",
          name: "Gonal-F 150 IU",
          time: "21:00",
          actions: [
            {
              actionType: "whatsapp",
              templateId: "tmpl_injection_checkin",
              scheduledTime: "10:00"
            }
          ]
        }
      ]
    },
    {
      day: 5,
      events: [
        {
          type: "appointment",
          name: "Monitoring Scan",
          time: "09:00",
          actions: [
            {
              actionType: "call",
              templateId: "tmpl_scan_reminder",
              scheduledTime: "17:00" // Day before
            }
          ]
        },
        {
          type: "medication",
          name: "Gonal-F 150 IU",
          time: "21:00",
          actions: []
        }
      ]
    },
    // ... more days
  ]
}
```

---

## 🚀 Updated Implementation Phases

### Phase 1: Task View (PRIORITY)
- [ ] Create task view page (entry point)
- [ ] Fetch all pending actions for logged-in user
- [ ] Group actions by: Urgent, In-clinic, Remote, Completed
- [ ] Color-code by priority (red, yellow, white)
- [ ] Add search bar for patient lookup
- [ ] Add [+ Walk-in] button
- [ ] Routing: /tasks (default landing page)

### Phase 2: Walk-in Registration
- [ ] Create quick registration modal
- [ ] Form fields: Name, Age, Phone, Reason
- [ ] Auto-create patient record
- [ ] Auto-create timeline with first event
- [ ] Redirect to cockpit view after registration

### Phase 3: Schedule Intelligence
- [ ] Create protocol template system
- [ ] Build schedule action UI (chips for time selection)
- [ ] Create series preview/edit dialog
- [ ] Generate multiple scheduled actions from protocol
- [ ] Store series metadata with actions

### Phase 4: Search & Context
- [ ] Implement patient search (autocomplete)
- [ ] Show search results with context (last event, pending actions)
- [ ] Quick open cockpit from search
- [ ] Log phone calls as actions

### Phase 5: Remote Action Management
- [ ] Distinguish in-clinic vs remote actions
- [ ] Add "Mark as Sent" functionality for WhatsApp/SMS
- [ ] Add delayed reaction capture (capture later when patient responds)
- [ ] Background sync for action status

### Phase 6: Dashboard Analytics (Doctor Only)
- [ ] Create analytics view (separate page)
- [ ] Mood distribution chart
- [ ] Template confusion scores
- [ ] Task completion metrics
- [ ] Drill-down into patients from dashboard
- [ ] Role-based access (only doctors see dashboard)

### Phase 7: Scheduled Action Execution
- [ ] Cron job or scheduler to flag overdue actions
- [ ] Push notifications for scheduled actions (optional)
- [ ] Bulk action execution (e.g., "Send all WhatsApp reminders")
- [ ] Snooze/reschedule functionality

---

## ❓ Questions for Confirmation

### 1. Protocol Intelligence
Q: Should we have pre-built protocols (Antagonist, Agonist, Natural) or let doctors create custom ones?  
A: _[Awaiting answer]_

### 2. Action Scheduling UI
Q: When doctor clicks protocol chip, should schedule editor appear immediately or after note completion?  
A: _[Awaiting answer]_

### 3. Walk-in Priority
Q: Should walk-ins automatically jump to top of task list or go to "In-clinic" section?  
A: _[Awaiting answer]_

### 4. Search Scope
Q: Should search show all patients or only active/recent ones?  
A: _[Awaiting answer]_

### 5. Remote vs In-clinic
Q: Should remote actions be in separate view or mixed with in-clinic?  
A: _[Current plan: Separate sections in same view]_

### 6. Dashboard Access
Q: Should all roles see basic dashboard or only doctor sees analytics?  
A: _[Current plan: Doctor-only analytics, staff see only their tasks]_

### 7. Series Editing
Q: Once protocol series is confirmed, can it be edited or only individual actions can be skipped?  
A: _[Awaiting answer]_

---

## 📋 Next Steps

1. ✅ **Confirm this updated plan** addresses your workflow
2. ❓ **Answer 7 questions** above
3. 🎯 **Prioritize phases** - which to build first?
4. 📝 **Create wireframes** if needed (optional)
5. 💻 **Start Phase 1** - Task View (entry point)

---

**Status:** ⏸️ AWAITING CONFIRMATION - Ready to build once approved
