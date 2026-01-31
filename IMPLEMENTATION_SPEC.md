# Santaan IVF - Implementation Specification
**Date:** January 31, 2026  
**Status:** FINAL SPEC - Ready for Implementation

---

## ✅ Confirmed Design Decisions

1. **Pre-built Protocols**: Comprehensive library (Antagonist, Agonist, Natural, Long, Short, etc.)
2. **Schedule Editor**: Appears IMMEDIATELY when protocol chip clicked, inline expandable (not modal)
3. **Walk-ins**: Go to regular task stream, staff addresses based on priority
4. **Search Scope**: Active patients only
5. **Dashboard**: Doctor-admin only (role-restricted)
6. **Series Editing**: YES - can edit after confirmation (missed dose, reactions, customization)
7. **Protocol Chips**: Color/icon coded to distinguish from regular chips
8. **Schedule Patterns**: "every week", "alternate day", "on 3rd day of ovulation" etc.
9. **Action Stream**: Timeline-based organization (chronological)
10. **Reactions**: Emoji-based (👍, 🤔, 😰, 😊, 😐, ⚠️)
11. **Search/Walk-in**: Buttons in Patient Directory (right sidebar)

---

## 🎯 Core Philosophy

> **"Easy chip-based record keeping → Timeline (git-kind) source of truth → Proactive patient communication"**

- Staff clicks chips → Record created
- Record generates scheduled actions automatically
- Timeline continues whether patient in clinic or at home
- Every event communicates proactively to patient
- Easy to edit/customize on-the-go (missed dose, reaction, doctor override)

---

## 📋 Feature Specifications

### Feature 1: Protocol Chips with Color/Icon Coding

#### Visual Design
```
PLAN Section (in Clinical Shorthand):
┌────────────────────────────────────────┐
│ PLAN                                   │
├────────────────────────────────────────┤
│ 🟣 Antagonist 150 IU    [Protocol]    │ ← Purple for protocols
│ 🟣 Agonist Long         [Protocol]    │
│ 🟣 Natural Cycle        [Protocol]    │
│ 🟡 OPU Prep            [Single]       │ ← Yellow for single events
│ 🟡 ET Plan             [Single]       │
│ 🟡 Call                [Single]       │
└────────────────────────────────────────┘
```

#### Chip Metadata
```javascript
{
  emoji: "💉",
  label: "Antagonist 150 IU",
  text: "Started Antagonist protocol with 150 IU Gonal-F daily",
  
  // NEW: Protocol flag
  isProtocol: true,
  protocolId: "protocol_antagonist_150",
  
  // NEW: Visual coding
  color: "#9333EA", // Purple
  icon: "🟣",
  badge: "Protocol"
}
```

#### Comprehensive Protocol Library
```javascript
PROTOCOLS = [
  // Stimulation Protocols
  {
    id: "protocol_antagonist_150",
    name: "Antagonist 150 IU",
    category: "ovarian_stimulation",
    duration: 10,
    color: "#9333EA"
  },
  {
    id: "protocol_antagonist_225",
    name: "Antagonist 225 IU",
    category: "ovarian_stimulation",
    duration: 10,
    color: "#9333EA"
  },
  {
    id: "protocol_agonist_long",
    name: "Agonist Long Protocol",
    category: "ovarian_stimulation",
    duration: 21,
    color: "#9333EA"
  },
  {
    id: "protocol_agonist_short",
    name: "Agonist Short Protocol",
    category: "ovarian_stimulation",
    duration: 14,
    color: "#9333EA"
  },
  {
    id: "protocol_natural",
    name: "Natural Cycle",
    category: "ovarian_stimulation",
    duration: 14,
    color: "#9333EA"
  },
  {
    id: "protocol_mild_stim",
    name: "Mild Stimulation",
    category: "ovarian_stimulation",
    duration: 12,
    color: "#9333EA"
  },
  
  // Post-transfer Protocols
  {
    id: "protocol_luteal_support",
    name: "Luteal Phase Support",
    category: "post_transfer",
    duration: 14,
    color: "#059669"
  },
  
  // Monitoring Protocols
  {
    id: "protocol_monitoring_std",
    name: "Standard Monitoring",
    category: "monitoring",
    duration: 10,
    color: "#0891B2"
  }
];
```

---

### Feature 2: Seamless Schedule Expansion (Not Modal)

#### User Flow
1. Doctor clicks protocol chip: **"🟣 Antagonist 150 IU"**
2. Schedule editor expands INLINE (below chip section, pushes Log Event button down)
3. Shows editable schedule with timestamp patterns
4. Doctor reviews, edits if needed, confirms
5. Schedule collapses, actions generated, Log Event button returns

#### Schedule Editor UI (Inline Expansion)
```
┌─────────────────────────────────────────────────────────────┐
│ PLAN                                                        │
├─────────────────────────────────────────────────────────────┤
│ 🟣 Antagonist 150 IU [Protocol] ✓ Selected                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 📅 PROTOCOL SCHEDULE - Antagonist 150 IU (10 days)         │
├─────────────────────────────────────────────────────────────┤
│ Pattern: Daily injections + Monitoring every 3 days        │
│                                                             │
│ Day 1 (Today):                                              │
│ • 💉 Gonal-F 150 IU               [9:00 PM] [Edit]         │
│ • 📱 WhatsApp: Injection reminder [8:00 PM] [Edit]         │
│                                                             │
│ Day 2 (Feb 1):                                              │
│ • 💉 Gonal-F 150 IU               [9:00 PM] [Edit]         │
│ • 📱 WhatsApp: Check-in           [10:00 AM] [Edit]        │
│                                                             │
│ Day 3 (Feb 2):                                              │
│ • 💉 Gonal-F 150 IU               [9:00 PM] [Edit]         │
│ • 🏥 Monitoring Scan              [9:00 AM] [Edit]         │
│ • 📞 Call: Scan reminder          [Feb 1, 5:00 PM] [Edit]  │
│                                                             │
│ [+ Add Day] [+ Add Action]                                 │
│                                                             │
│ Day 5, Day 7, Day 9: Same pattern...                       │
│ [Expand All ▼]                                              │
│                                                             │
│ [Cancel] [Customize Schedule] [Confirm & Generate Actions] │
└─────────────────────────────────────────────────────────────┘
```

#### Schedule Pattern Templates
```javascript
SCHEDULE_PATTERNS = {
  daily: {
    label: "Daily",
    cron: "0 0 * * *",
    example: "Every day at specified time"
  },
  alternate_day: {
    label: "Alternate Day",
    cron: "0 0 */2 * *",
    example: "Every other day"
  },
  weekly: {
    label: "Weekly",
    cron: "0 0 * * 0",
    example: "Every 7 days"
  },
  twice_weekly: {
    label: "Twice Weekly",
    cron: "0 0 * * 0,3",
    example: "Every Monday and Thursday"
  },
  every_3_days: {
    label: "Every 3 Days",
    cron: "0 0 */3 * *",
    example: "Monitoring scans"
  },
  ovulation_day_3: {
    label: "On 3rd Day of Ovulation",
    type: "relative",
    offset: 3,
    baseEvent: "ovulation_detection"
  },
  transfer_day_plus_14: {
    label: "14 Days Post-Transfer",
    type: "relative",
    offset: 14,
    baseEvent: "embryo_transfer"
  }
};
```

#### Inline Edit Time
```
Click [Edit] next to any action:
┌─────────────────────────────────┐
│ Edit Time:                      │
│ [9] : [00] [PM ▼]              │
│ [Cancel] [Save]                 │
└─────────────────────────────────┘

Or click [Customize Schedule]:
- Change pattern: Daily → Alternate Day
- Skip specific days
- Add extra actions
- Change medication dose
```

---

### Feature 3: Patient Directory Enhancements

#### Add Search + Walk-in Buttons
```
┌─────────────────────────────────────┐
│ Patient Directory                   │
├─────────────────────────────────────┤
│ 🔍 [Search active patients...]     │ ← NEW
│ [+ Walk-in Patient]                 │ ← NEW
├─────────────────────────────────────┤
│ Priya Sharma                        │
│ MR-2023-001           1 Tasks       │
│                                     │
│ Anjali Das                          │
│ MR-2023-002           1 Tasks       │
│                                     │
│ Sunita Mohanty                      │
│ MR-2023-003           0 Tasks       │
└─────────────────────────────────────┘
```

#### Search Autocomplete (Active Patients Only)
```
User types: "Anj"

┌─────────────────────────────────────┐
│ Anjali Das (MR-2023-002)            │
│ 🔴 Anxious | Day 5 | 1 pending      │
│ Last: Injection Gonal-F (Today)     │
├─────────────────────────────────────┤
│ Anjali Patel (MR-2023-015)          │
│ 🟢 Stable | Day 3 | 0 pending       │
│ Last: Baseline scan (Yesterday)     │
└─────────────────────────────────────┘

Click → Open cockpit view
```

#### Walk-in Registration Modal
```
┌──────────────────────────────────┐
│ NEW WALK-IN PATIENT              │
├──────────────────────────────────┤
│ Name: [____________________]     │
│ Age:  [__]  Gender: [F ▼]       │
│ Phone: [__________]              │
│ Email: [____________________]    │
│ Reason: [First Consult ▼]       │
│                                  │
│ [Cancel]  [Register & Open]     │
└──────────────────────────────────┘

After click:
1. Create patient record
2. Create timeline with "First Consultation" event
3. Open cockpit view
4. Doctor starts documenting
5. Patient appears in Action Stream (not at top, regular priority)
```

---

### Feature 4: Emoji Reactions (Replace Text Buttons)

#### Current (Text):
```
[Understood] [Confused] [Escalate]
```

#### New (Emoji):
```
┌────────────────────────────────────────┐
│ How did patient respond?               │
├────────────────────────────────────────┤
│ 👍 Understood    🤔 Confused           │
│ 😊 Happy         😰 Anxious            │
│ 😐 Neutral       ⚠️ Escalate           │
└────────────────────────────────────────┘
```

#### Reaction Mapping
```javascript
REACTIONS = [
  { emoji: "👍", label: "Understood", mood: "stable" },
  { emoji: "🤔", label: "Confused", mood: "confused" },
  { emoji: "😊", label: "Happy", mood: "stable" },
  { emoji: "😰", label: "Anxious", mood: "anxious" },
  { emoji: "😐", label: "Neutral", mood: "neutral" },
  { emoji: "⚠️", label: "Escalate", mood: "urgent" }
];
```

---

### Feature 5: Timeline-Based Action Stream

#### Organization Logic
```
Actions sorted by:
1. Time (earliest first)
2. Priority (URGENT flag overrides time)
3. Patient name (alphabetical within same time)

Grouping:
- ATTENTION NEEDED (red bar) - Overdue or marked urgent
- UP NEXT TODAY (clock icon) - Scheduled within next 2 hours
- TOMORROW & BEYOND (calendar icon) - Future scheduled
```

#### Timeline Display
```
Action Stream
┌──────────────────────────────────────────────┐
│ 🚨 ATTENTION NEEDED                          │
├──────────────────────────────────────────────┤
│ 08:47 AM  📞 Urgent Follow-up          🔴   │
│ Anjali Das (MR-2023-002)                     │
│ "Call patient to check injection status."    │
├──────────────────────────────────────────────┤
│                                              │
│ ⏰ UP NEXT TODAY                             │
├──────────────────────────────────────────────┤
│ 09:47 AM  🏥 Routine Check-in          ⚪   │
│ Priya Sharma (MR-2023-001)                   │
│ "Patient arriving for scan."                 │
├──────────────────────────────────────────────┤
│ 11:47 AM  👁️ Follicular Scan           ⚪   │
│ Sunita Mohanty (MR-2023-003)                 │
│ "Please come to clinic for scan."            │
├──────────────────────────────────────────────┤
│                                              │
│ 📅 TOMORROW & BEYOND                         │
├──────────────────────────────────────────────┤
│ Feb 1, 9:00 AM  💉 Injection Reminder  ⚪   │
│ Anjali Das (MR-2023-002)                     │
│ "Continue Gonal-F 150 IU at 9 PM."          │
└──────────────────────────────────────────────┘
```

---

### Feature 6: Series Editing After Confirmation

#### Philosophy
> **"Easy to customize on-the-go - patient missed dose, reaction happened, doctor needs to adjust"**

#### Edit Points
1. **In Projected Path** - Before actions execute
2. **In Tasks Tab** - While actions pending
3. **In Timeline** - After actions complete (add notes)

#### Projected Path with Edit
```
PROJECTED PATH
┌─────────────────────────────────────────┐
│ FEB 1  PLAN                             │
│ Antagonist Protocol (8/10 days left)    │
│ [View Schedule ▼] [Edit ✏️]            │
└─────────────────────────────────────────┘

Click [Edit]:
┌─────────────────────────────────────────┐
│ EDIT PROTOCOL SCHEDULE                  │
├─────────────────────────────────────────┤
│ ✅ Day 1: Completed (Injection + SMS)   │
│                                         │
│ Day 2 (Tomorrow):                       │
│ • 💉 Gonal-F 150 IU    [9:00 PM]       │
│   [Skip] [Change dose] [Change time]   │
│ • 📱 WhatsApp         [10:00 AM]       │
│   [Skip] [Edit message]                │
│                                         │
│ Day 3:                                  │
│ • 💉 Gonal-F 150 IU    [9:00 PM]       │
│ • 🏥 Monitoring Scan  [9:00 AM]        │
│   [Skip] [Reschedule]                  │
│                                         │
│ [+ Add Extra Day] [+ Note]             │
│ [Cancel] [Save Changes]                │
└─────────────────────────────────────────┘
```

#### Common Edit Scenarios

**Scenario 1: Patient Missed Dose**
```
Staff sees: "Patient called, forgot 9 PM injection"
Action:
1. Find Day 2 in schedule
2. Click [Skip] on missed injection
3. Click [+ Note]: "Missed due to forgot, advised to take now"
4. Add makeup action: "💉 Makeup dose (11 PM)"
5. Save
```

**Scenario 2: Side Effect / Reaction**
```
Patient: "Heavy bleeding after injection"
Action:
1. Find Day 3 in schedule
2. Click [Change dose]: 150 IU → 100 IU
3. Click [+ Note]: "Reduced dose due to ovarian hyperstimulation"
4. Add extra action: "📞 Call: Check bleeding tomorrow"
5. Save
```

**Scenario 3: Doctor Override**
```
Scan shows: "Follicles ready early"
Action:
1. Find Day 7 scan in schedule
2. Click [Reschedule]: Move to Day 5
3. Skip Day 7, Day 9 injections
4. Add: "💉 Trigger shot (Day 5, 10 PM)"
5. Add: "🏥 OPU (Day 7, 9 AM)"
6. Save
```

---

## 🗄️ Database Schema Updates

### New Tables

#### Protocols Table
```sql
CREATE TABLE protocols (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- ovarian_stimulation, post_transfer, monitoring
  duration INTEGER NOT NULL, -- days
  color TEXT, -- hex color for UI
  schedule JSONB NOT NULL, -- Full schedule template
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Series Table (Protocol Instances)
```sql
CREATE TABLE action_series (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL REFERENCES patients(id),
  protocol_id TEXT NOT NULL REFERENCES protocols(id),
  event_id TEXT REFERENCES timeline_events(id), -- Event that created series
  
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT NOT NULL, -- active, completed, cancelled
  
  original_schedule JSONB NOT NULL, -- Original protocol schedule
  current_schedule JSONB NOT NULL, -- May be edited
  
  completed_actions INTEGER DEFAULT 0,
  total_actions INTEGER NOT NULL,
  
  edits JSONB, -- Track all edits made
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Update Actions Table
```sql
ALTER TABLE actions ADD COLUMN series_id TEXT REFERENCES action_series(id);
ALTER TABLE actions ADD COLUMN series_day INTEGER;
ALTER TABLE actions ADD COLUMN scheduled_for TIMESTAMP;
ALTER TABLE actions ADD COLUMN action_location TEXT; -- in_clinic, remote
ALTER TABLE actions ADD COLUMN action_icon TEXT;
ALTER TABLE actions ADD COLUMN is_skipped BOOLEAN DEFAULT FALSE;
ALTER TABLE actions ADD COLUMN skip_reason TEXT;
```

---

## 🎨 UI Component Breakdown

### New Components Needed

#### 1. ProtocolScheduleEditor.jsx
**Purpose:** Inline expandable schedule editor

**Props:**
- `protocol`: Protocol object
- `startDate`: When protocol starts
- `onConfirm`: (schedule) => void
- `onCancel`: () => void

**Features:**
- Shows full schedule by day
- Inline time editing
- Add/skip actions
- Pattern templates dropdown
- Expand/collapse days

---

#### 2. PatientSearchAutocomplete.jsx
**Purpose:** Search active patients

**Props:**
- `onSelect`: (patient) => void
- `placeholder`: string

**Features:**
- Search by name, MR number
- Show only active patients
- Show context (mood, day, pending tasks)
- Keyboard navigation (↑↓ Enter)

---

#### 3. WalkinRegistrationModal.jsx
**Purpose:** Quick patient registration

**Props:**
- `onRegister`: (patient) => void
- `onCancel`: () => void

**Features:**
- Minimal fields (name, age, phone)
- Quick validation
- Auto-open cockpit after registration

---

#### 4. SeriesEditDialog.jsx
**Purpose:** Edit protocol series after confirmation

**Props:**
- `series`: Series object with schedule
- `onSave`: (updatedSchedule) => void
- `onCancel`: () => void

**Features:**
- Show completed actions (grayed out)
- Edit pending actions
- Skip actions with reason
- Add extra actions
- Change dose/time
- Track edit history

---

#### 5. EmojiReactionPicker.jsx
**Purpose:** Replace text buttons with emoji grid

**Props:**
- `reactions`: Array of reaction objects
- `onSelect`: (reaction) => void

**Features:**
- 2x3 grid of emoji buttons
- Show emoji + label on hover
- Keyboard shortcuts (1-6)

---

## 🚀 Implementation Phases

### Phase 1: Protocol Infrastructure (Backend)
**Duration:** 2-3 hours

**Tasks:**
- [ ] Create `protocols` table migration
- [ ] Create `action_series` table migration
- [ ] Update `actions` table with new columns
- [ ] Create seed data with 8 comprehensive protocols
- [ ] Create API endpoints:
  - `GET /api/protocols` - List all protocols
  - `GET /api/protocols/:id` - Get protocol details
  - `POST /api/protocols/:id/generate` - Generate action series
  - `GET /api/series/:id` - Get series details
  - `PUT /api/series/:id` - Edit series
  - `POST /api/series/:id/skip-action` - Skip specific action

---

### Phase 2: Protocol Chips + Schedule Editor (Frontend)
**Duration:** 4-5 hours

**Tasks:**
- [ ] Add protocol flag to chip metadata
- [ ] Color-code protocol chips (purple 🟣)
- [ ] Create `ProtocolScheduleEditor.jsx` component
- [ ] Wire up inline expansion (not modal)
- [ ] Implement time editing
- [ ] Add pattern templates
- [ ] Connect to backend to generate series
- [ ] Show generated actions in Projected Path

---

### Phase 3: Search + Walk-in (Frontend)
**Duration:** 2-3 hours

**Tasks:**
- [ ] Add search bar to Patient Directory
- [ ] Create `PatientSearchAutocomplete.jsx`
- [ ] Filter active patients only
- [ ] Show patient context in results
- [ ] Add [+ Walk-in] button
- [ ] Create `WalkinRegistrationModal.jsx`
- [ ] Wire up patient creation
- [ ] Auto-open cockpit after registration

---

### Phase 4: Emoji Reactions (Frontend)
**Duration:** 1-2 hours

**Tasks:**
- [ ] Create `EmojiReactionPicker.jsx`
- [ ] Replace text buttons with emoji grid
- [ ] Update reaction capture modal
- [ ] Update action completion to save emoji
- [ ] Update analytics to use emoji reactions

---

### Phase 5: Series Editing (Frontend + Backend)
**Duration:** 3-4 hours

**Tasks:**
- [ ] Create `SeriesEditDialog.jsx`
- [ ] Add [Edit] button to Projected Path
- [ ] Show editable schedule
- [ ] Implement skip action with reason
- [ ] Implement change dose/time
- [ ] Implement add extra action
- [ ] Track edit history
- [ ] Update backend to save edits

---

### Phase 6: Timeline-Based Action Stream (Frontend)
**Duration:** 2 hours

**Tasks:**
- [ ] Update Action Stream sorting (time-based)
- [ ] Add grouping (Urgent, Up Next, Future)
- [ ] Add action icons (📞, 📱, 🏥, 💉)
- [ ] Color-code by priority

---

### Phase 7: Dashboard Role Restriction (Backend + Frontend)
**Duration:** 1 hour

**Tasks:**
- [ ] Add role check to dashboard route
- [ ] Hide dashboard link for non-admin
- [ ] Show "Access Denied" for non-admin
- [ ] Update navigation menu

---

## 📊 Protocol Templates (Seed Data)

### Protocol 1: Antagonist 150 IU
```javascript
{
  id: "protocol_antagonist_150",
  name: "Antagonist 150 IU",
  category: "ovarian_stimulation",
  duration: 10,
  color: "#9333EA",
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
              type: "whatsapp",
              template: "injection_start",
              time: "20:00",
              message: "Hi {{name}}, start Gonal-F 150 IU injection tonight at 9 PM."
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
              type: "whatsapp",
              template: "injection_checkin",
              time: "10:00",
              message: "How are you feeling? Any side effects?"
            }
          ]
        }
      ]
    },
    {
      day: 3,
      events: [
        {
          type: "medication",
          name: "Gonal-F 150 IU",
          time: "21:00",
          actions: []
        },
        {
          type: "appointment",
          name: "Monitoring Scan",
          time: "09:00",
          actions: [
            {
              type: "call",
              template: "scan_reminder",
              time: "17:00", // Day before
              relativeDay: -1,
              message: "Please come for monitoring scan tomorrow at 9 AM."
            }
          ]
        }
      ]
    },
    // Days 4-10 similar pattern...
  ]
}
```

### Protocol 2: Agonist Long Protocol
```javascript
{
  id: "protocol_agonist_long",
  name: "Agonist Long Protocol",
  category: "ovarian_stimulation",
  duration: 21,
  schedule: [
    {
      day: 1,
      label: "Day 21 of previous cycle - Start Lupron",
      events: [
        {
          type: "medication",
          name: "Lupron 0.5 mg",
          time: "21:00",
          actions: [
            {
              type: "whatsapp",
              template: "lupron_start",
              time: "20:00"
            }
          ]
        }
      ]
    },
    // 14 days of Lupron...
    {
      day: 14,
      label: "Day 2 of cycle - Check suppression",
      events: [
        {
          type: "appointment",
          name: "Baseline Scan + E2",
          time: "09:00"
        },
        {
          type: "medication",
          name: "Lupron 0.5 mg",
          time: "21:00"
        }
      ]
    },
    {
      day: 15,
      label: "Day 3 - Start Gonal-F",
      events: [
        {
          type: "medication",
          name: "Gonal-F 225 IU",
          time: "21:00"
        },
        {
          type: "medication",
          name: "Lupron 0.5 mg",
          time: "09:00"
        }
      ]
    }
    // Continue until trigger...
  ]
}
```

---

## ✅ Acceptance Criteria

### Protocol System
- [ ] Doctor can click protocol chip
- [ ] Schedule editor expands inline (not modal)
- [ ] Shows 10-day schedule with all actions
- [ ] Can edit individual action times
- [ ] Can change pattern (daily → alternate day)
- [ ] Confirms and generates all actions
- [ ] Actions appear in Projected Path
- [ ] Actions appear in Action Stream with correct times

### Search + Walk-in
- [ ] Search bar visible in Patient Directory
- [ ] Search shows only active patients
- [ ] Search shows patient context (mood, day, tasks)
- [ ] Walk-in button visible
- [ ] Walk-in modal opens
- [ ] Patient created and timeline initialized
- [ ] Cockpit opens after registration
- [ ] Patient appears in Action Stream (regular priority, not top)

### Emoji Reactions
- [ ] Reaction buttons show emoji + label
- [ ] 6 reactions available (👍, 🤔, 😊, 😰, 😐, ⚠️)
- [ ] Emoji saved with action
- [ ] Analytics use emoji reactions for mood distribution

### Series Editing
- [ ] Can edit series from Projected Path
- [ ] Can skip actions with reason
- [ ] Can change dose/time
- [ ] Can add extra actions
- [ ] Edits tracked in history
- [ ] Updated schedule saved
- [ ] Action Stream updates with changes

### Timeline Organization
- [ ] Actions sorted by time (earliest first)
- [ ] Urgent actions grouped at top
- [ ] Up Next (2 hours) grouped second
- [ ] Future actions grouped third
- [ ] Action icons show type (📞, 📱, 🏥, 💉)

### Dashboard Access
- [ ] Dashboard visible only to doctor/admin
- [ ] Non-admin see "Access Denied"
- [ ] Dashboard link hidden for non-admin

---

## 🎯 Success Metrics

1. **Protocol Usage**: 80% of stimulation events use pre-built protocols
2. **Customization Rate**: 30% of series edited (shows flexibility)
3. **Search Usage**: 15+ searches per day (phone calls, walk-ins)
4. **Walk-in Registration**: <60 seconds from button to documentation
5. **Reaction Capture**: 90% of actions have emoji reaction logged
6. **Time Savings**: 5 minutes saved per patient (vs manual scheduling)

---

**Status:** ✅ READY FOR IMPLEMENTATION

**Start with:** Phase 1 (Protocol Infrastructure) → Phase 2 (Schedule Editor)
