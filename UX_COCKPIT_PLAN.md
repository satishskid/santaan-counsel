# Santaan IVF - Cockpit Dashboard UX Plan
**Date:** January 31, 2026  
**Status:** PLANNING - Review Before Implementation

---

## 🎯 Core Vision

**"Timeline is Everything"** - A single-page cockpit where staff can:
1. See patient list
2. Click patient → Enter cockpit view
3. Document using chips → Creates timeline record (single paragraph)
4. Timeline record generates actions (one-time or series)
5. Execute actions (verbal/WhatsApp/call) with templated messages
6. Capture patient reactions
7. See real-time analytics (mood, confusion, task completion)

---

## 📊 Current State Analysis

### What We Have ✅
- **3-column layout**: Patient profile (left) + Clinical logging (middle) + Actions (right)
- **Event-driven architecture**: 14 event types, 5 roles, 100+ chips
- **Real-time action generation**: Chip click → Action card → Template display
- **Timeline system**: All events saved chronologically
- **Template engine**: Pre-built messages for WhatsApp/SMS/verbal/call
- **Reaction capture**: 6 emoji reactions
- **Role-based chips**: Doctor, nurse, embryologist, counselor, receptionist

### What's Missing ❌
- **Patient list view**: No entry point to select patients
- **Cockpit dashboard layout**: Current 3-column is clinical, not "cockpit"
- **Real-time analytics dashboard**: No mood tracking, confusion scores, task completion metrics
- **At-a-glance patient status**: No quick view of active cases, pending actions
- **Task queue**: No view of what needs to be done across all patients
- **Summary dashboard**: No visualization like attached image

---

## 🏗️ Proposed UX Architecture

### Level 1: Dashboard View (NEW)
**Purpose:** Staff logs in → Sees overview of all patients + analytics

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────┐
│ SANTAAN IVF CLINIC                    Dr. Sharma | Logout           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  📊 ANALYTICS DASHBOARD                                              │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐          │
│  │ 👥 Active   │ ✅ Tasks     │ 📨 Pending  │ ⚠️ Confusion│          │
│  │ Cases: 3    │ Done: 0%    │ Actions: 12 │ Rate: 5/tpl │          │
│  └─────────────┴─────────────┴─────────────┴─────────────┘          │
│                                                                       │
│  ┌───────────────────────┬───────────────────────────────────────┐  │
│  │ Patient Mood Dist.    │ Template Confusion Score              │  │
│  │ 🔴 Anxious: 25%       │ opu_prep    ████████████ 90%          │  │
│  │ 🟡 Confused: 30%      │ trigger     █████████ 75%             │  │
│  │ 🟢 Stable: 45%        │ scan        ██████ 60%                │  │
│  │                       │ general     ████ 45%                  │  │
│  └───────────────────────┴───────────────────────────────────────┘  │
│                                                                       │
│  📋 PATIENT LIST                                                     │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │ Name         Age  Status      Next Event      Mood  Actions  │    │
│  ├─────────────────────────────────────────────────────────────┤    │
│  │ Priya Sharma  32  Day 10      Trigger Shot    😊    3 ⚡     │◄── Click
│  │ Anita Patel   28  Embryo Day  Transfer Ready  😰    1 ⚡     │    │
│  │ Reema Singh   35  Baseline    Scan Tomorrow   😐    5 ⚡     │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

**Key Elements:**
- **Top metrics**: Active cases, task completion %, pending actions, confusion rate
- **Mood distribution chart**: Visual breakdown (anxious/confused/stable)
- **Confusion score chart**: Which templates need revision (Odia script issue)
- **Patient list table**: Sortable, filterable, color-coded by urgency
- **Action indicators**: ⚡ count shows pending actions

---

### Level 2: Cockpit View (REDESIGN)
**Purpose:** Click patient → Single-page cockpit to manage everything

**Current Problem:** 3-column layout feels like traditional EMR, not a cockpit

**Proposed Cockpit Layout:**
```
┌─────────────────────────────────────────────────────────────────────────┐
│ ← Back to Dashboard              PRIYA SHARMA | 32F | Cycle #2          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  🧑 PATIENT QUICK VIEW                                                   │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │ Day 10 of Cycle #2 | AMH: 2.8 | AFC: 12 | Current: Trigger Phase│    │
│  │ Mood: 😊 Happy | Last Contact: Today 9:30 AM (WhatsApp)         │    │
│  │ Story: Started on Day 1 with 150 IU Gonal-F. Responded well...  │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                           │
│  📍 TIMELINE (Vertical, Left Side) ────┬──── ⚡ ACTIONS (Right Side)    │
│  ┌────────────────────────────────────┐│┌──────────────────────────┐   │
│  │ 🔵 TODAY                           ││││ PENDING ACTIONS (3)      │   │
│  │ Monitoring Scan                    ││││                          │   │
│  │ Click to document →                ││││ 💉 Trigger Shot Tonight  │   │
│  │                                    ││││ ├─ 📱 WhatsApp: Time msg │   │
│  │ Day 9 (Yesterday)                  ││││ ├─ 📞 Call: Confirm     │   │
│  │ Monitoring Scan                    ││││ └─ 🗣️ Verbal: Explain   │   │
│  │ "Follicles 14-18mm, E2 rising..."  ││││                          │   │
│  │ Actions: 2/2 completed ✅          ││││ 🏥 OPU Scheduled 2 days  │   │
│  │                                    ││││ ├─ 📱 WhatsApp: NPO msg │   │
│  │ Day 7                              ││││ └─ 🗣️ Verbal: Prep     │   │
│  │ Monitoring Scan                    ││││                          │   │
│  │ "Follicles growing evenly..."      ││││ 💰 Payment Due           │   │
│  │ Actions: 3/3 completed ✅          ││││ └─ 📱 Message: Reminder │   │
│  └────────────────────────────────────┘│└──────────────────────────┘   │
│                                         │                                │
│  📝 DOCUMENT NOW (Middle, Expandable)  │                                │
│  ┌────────────────────────────────────┐│                                │
│  │ Event: [Monitoring Scan ▼]         ││  ← Click TODAY event to open   │
│  │                                    ││                                │
│  │ CHIPS (Role-based):                ││                                │
│  │ Doctor: [14mm follicle] [18mm] ... ││                                │
│  │ Nurse: [BP 120/80] [Injected]...   ││                                │
│  │                                    ││                                │
│  │ Note: "Follicles 14-18mm, E2..."   ││  ← Builds as chips clicked     │
│  │                                    ││                                │
│  │ [Complete → Generate Actions]      ││  ← Creates actions in right     │
│  └────────────────────────────────────┘│                                │
└─────────────────────────────────────────────────────────────────────────┘
```

**Key Redesign Concepts:**

1. **Timeline on LEFT** (not center):
   - Vertical chronological view
   - TODAY at top (blue highlight)
   - Click any event to expand and see details
   - Click TODAY to document new event
   - Shows action completion status (2/2 ✅)

2. **Actions on RIGHT** (always visible):
   - PENDING actions at top (urgent)
   - Each action shows communication channel
   - Click action → Execute → Capture reaction
   - Real-time updates as actions completed

3. **Documentation in MIDDLE** (expandable):
   - Only appears when documenting
   - Chips organized by role
   - Note builds as paragraph
   - Complete → Generates actions → Appear in right panel

4. **Patient header at TOP**:
   - Quick stats (cycle day, AMH, AFC, phase)
   - Current mood (last captured reaction)
   - Last contact info
   - Brief story/context

---

## 🔄 Complete User Flow

### Flow 1: Staff Logs In
1. **Login screen** → Dashboard view
2. See analytics: 3 active cases, 0% tasks done, 12 pending actions
3. See mood distribution: 45% stable, 30% confused, 25% anxious
4. See confusion scores: opu_prep templates need fixing

### Flow 2: Select Patient
1. Click "Priya Sharma" from patient list
2. Cockpit view opens
3. See timeline on left (TODAY at top, history below)
4. See 3 pending actions on right (trigger shot, OPU prep, payment)
5. See patient header (Day 10, Cycle #2, mood 😊)

### Flow 3: Document Event
1. Click TODAY card in timeline
2. Documentation panel expands in middle
3. Event type auto-detected (Monitoring Scan) or manually selected
4. Staff clicks chips (role-based):
   - Doctor: "14mm follicle" + "18mm follicle" + "E2 rising"
   - Nurse: "Vitals stable" + "Injection given"
5. Note builds: "Follicles 14-18mm, E2 rising, vitals stable, injection given"
6. Click "Complete → Generate Actions"
7. Actions appear in right panel immediately:
   - 📱 WhatsApp: "Hi Priya, your scan looks great! Follicles are ready..."
   - 🗣️ Verbal: "Everything is on track, we'll trigger tonight"
   - 📞 Call: "We need you to take the trigger shot at 10 PM sharp"

### Flow 4: Execute Action
1. Staff clicks "📱 WhatsApp" action
2. Template appears with patient name pre-filled
3. Staff reviews, edits if needed
4. Clicks "Send" (or "Mark as Sent")
5. Reaction capture modal: "How did patient respond?"
6. Staff clicks 😊 "Happy" or 😰 "Anxious" etc.
7. Action marked complete (1/3 done)
8. Timeline updated automatically

### Flow 5: Series Actions (Injection Protocol)
1. Doctor creates event: "Start Gonal-F 150 IU"
2. System generates SERIES of actions:
   - Day 1: 📱 "Start injection tonight"
   - Day 2: 📱 "Continue injection, any side effects?"
   - Day 3: 📱 "Reminder: injection tonight"
   - Day 4: 🏥 "Come for scan tomorrow"
3. Each action has its own template
4. Staff executes one by one over days
5. Each completion updates timeline

### Flow 6: Return to Dashboard
1. Click "← Back to Dashboard"
2. See updated metrics:
   - Task completion: 33% (4/12 actions done)
   - Priya's mood: 😊 Happy
   - Pending actions: 8 remaining
3. See next patient with pending actions highlighted

---

## 📐 Detailed Component Breakdown

### 1. Dashboard View Components

#### A. Analytics Cards
- **Active Cases**: Count of patients with active cycles
- **Task Completion**: % of pending actions completed today
- **Pending Actions**: Total actions waiting across all patients
- **Confusion Rate**: Avg patient confusion per template (from reactions)

#### B. Mood Distribution Chart
- Pie/donut chart
- Data from latest reaction for each patient
- Colors: 🟢 Green (stable), 🟡 Yellow (confused), 🔴 Red (anxious)
- Click slice → Filter patient list by mood

#### C. Template Confusion Score Chart
- Horizontal bar chart
- Shows which event types have high confusion rates
- Data from reaction tracking (😰 anxious, 🤔 confused reactions)
- Helps identify which templates need Odia script revision
- Click bar → See list of confused patients for that event type

#### D. Patient List Table
- Columns: Name, Age, Status (cycle day), Next Event, Mood (emoji), Pending Actions (⚡ count)
- Sortable by any column
- Color-coded rows:
  - Red: Urgent actions (>5 pending or overdue)
  - Yellow: Moderate (2-4 pending)
  - Green: On track (<2 pending)
- Search/filter by name, status, mood
- Click row → Open cockpit view

---

### 2. Cockpit View Components

#### A. Patient Header (Top Bar)
```
Priya Sharma | 32F | Cycle #2 | Day 10
AMH: 2.8 | AFC: 12 | Diagnosis: PCOS
Current Phase: Trigger
Last Contact: Today 9:30 AM via WhatsApp
Current Mood: 😊 Happy
Story: Started on Day 1 with 150 IU Gonal-F, responded well, 12 follicles growing...
```

#### B. Timeline (Left Column - 30% width)
- **TODAY card** (blue border, prominent):
  - "Monitoring Scan" or current event
  - "Click to document" if not yet documented
  - "3 actions pending" if actions exist
  
- **Past events** (chronological, newest to oldest):
  - Date/cycle day
  - Event type with emoji
  - Summary (first 100 chars of note)
  - Action completion status (2/2 ✅ or 1/3 ⚡)
  - Click to expand full details
  
- **Upcoming events** (grayed out):
  - "Trigger Shot - Tonight"
  - "OPU - In 2 days"
  - "Transfer - In 7 days"

#### C. Documentation Panel (Middle - 40% width, expandable)
- Only visible when "Document Now" is active
- Otherwise collapsed/hidden

**When Active:**
- Event type selector (dropdown or auto-detected)
- Role-based chip sections (expand/collapse by role)
- Clinical note textarea (auto-populated as chips clicked)
- "Complete → Generate Actions" button (shows count: "Will generate 3 actions")
- "Clear" button to reset

#### D. Actions Panel (Right Column - 30% width)
- Always visible
- Two sections:

**PENDING ACTIONS:**
- Grouped by patient/event
- Each action shows:
  - Event context: "Monitoring Scan - Today"
  - Action type: 📱/📞/🗣️/💬
  - Template preview (first line)
  - Click → Expands to full template
  - Action buttons: [Send/Execute] [Skip] [Edit]
  - After execution → Reaction capture modal

**COMPLETED ACTIONS (Log):**
- Collapsible history
- Shows: Event, Action type, Reaction emoji, Timestamp
- Click to view full details

---

## 🎨 Visual Design Principles

### Colors (Claude-inspired minimal)
- **Canvas**: #FAFAF8 (off-white)
- **Text**: #1A1A1A (near-black)
- **Accent**: #2D6FDB (blue for active/today)
- **Success**: #10B981 (green for completed)
- **Warning**: #F59E0B (yellow for pending)
- **Danger**: #EF4444 (red for urgent)
- **Mood colors**:
  - Happy: #10B981 (green)
  - Calm: #3B82F6 (blue)
  - Understood: #8B5CF6 (purple)
  - Confused: #F59E0B (yellow)
  - Anxious: #EF4444 (red)
  - Neutral: #6B7280 (gray)

### Typography
- **Headers**: 16px bold, tracking-wide
- **Body**: 15px regular, line-height 1.6
- **Small**: 13px for meta info
- **Mono**: For timestamps, IDs

### Spacing
- **Tight**: 4px for inline elements
- **Normal**: 8px for component spacing
- **Loose**: 16px for section breaks
- **XL**: 24px for major divisions

### Animations
- **Smooth transitions**: 200ms ease-in-out
- **New action card**: Slide in from right
- **Completed action**: Fade out with ✅ checkmark
- **Mood change**: Pulse animation on emoji

---

## 📊 Data Flow Architecture

### Timeline → Events → Actions → Reactions Flow

```
TIMELINE RECORD
├─ Event Type: "monitoring_scan"
├─ Event Date: 2026-01-31 09:30
├─ Cycle Day: 10
├─ Note: "Follicles 14-18mm, E2 rising, vitals stable"
└─ Generated Actions: [
    ├─ Action 1: WhatsApp - "Scan results message"
    │   ├─ Template ID: tmpl_scan_good_progress
    │   ├─ Status: Completed
    │   └─ Reaction: 😊 Happy
    ├─ Action 2: Verbal - "Next steps explanation"
    │   ├─ Template ID: tmpl_trigger_preparation
    │   ├─ Status: Completed
    │   └─ Reaction: 👍 Understood
    └─ Action 3: Call - "Trigger shot timing"
        ├─ Template ID: tmpl_trigger_instructions
        ├─ Status: Pending
        └─ Reaction: null
   ]
```

### Real-time Analytics Calculation

**Mood Distribution:**
- Query: Get latest reaction for each active patient
- Group by reaction emoji
- Calculate percentages
- Update every time reaction is captured

**Confusion Score:**
- Query: Get all reactions by event type in last 30 days
- Count confused (😰, 🤔) vs total reactions
- Calculate percentage per event type
- Rank by highest confusion first

**Task Completion:**
- Query: Get all actions generated today
- Count completed vs total
- Calculate percentage
- Update real-time as actions completed

---

## 🚀 Implementation Phases

### Phase 1: Dashboard View (NEW)
- [ ] Create patient list table component
- [ ] Create analytics cards component
- [ ] Create mood distribution chart
- [ ] Create confusion score chart
- [ ] Wire up real-time data fetching
- [ ] Add routing: /dashboard → patient list

### Phase 2: Cockpit Layout Redesign
- [ ] Restructure to left-middle-right with new purposes
- [ ] Move timeline to left (30%)
- [ ] Move actions to right (30%)
- [ ] Make documentation middle (40%, expandable)
- [ ] Add patient header component
- [ ] Implement collapse/expand for documentation panel

### Phase 3: Timeline Component Enhancement
- [ ] Add TODAY card with prominent styling
- [ ] Add action completion indicators (2/2 ✅)
- [ ] Add click-to-expand for past events
- [ ] Add upcoming events section (grayed out)
- [ ] Add auto-scroll to TODAY

### Phase 4: Actions Panel Redesign
- [ ] Split into PENDING and COMPLETED sections
- [ ] Group pending actions by urgency
- [ ] Add expand/collapse for action details
- [ ] Improve reaction capture modal
- [ ] Add skip/defer functionality
- [ ] Add action history log

### Phase 5: Series Actions
- [ ] Implement recurring action generation
- [ ] Add frequency/schedule metadata to actions
- [ ] Create action queue management
- [ ] Add snooze/reschedule functionality
- [ ] Add bulk action execution (e.g., "Send all WhatsApp")

### Phase 6: Real-time Analytics
- [ ] Set up WebSocket or polling for real-time updates
- [ ] Implement mood distribution calculation
- [ ] Implement confusion score calculation
- [ ] Implement task completion percentage
- [ ] Add dashboard auto-refresh

### Phase 7: Polish & UX Refinements
- [ ] Add animations (slide-in, fade-out)
- [ ] Add keyboard shortcuts (J/K for navigation)
- [ ] Add bulk operations (select multiple actions)
- [ ] Add print/export timeline
- [ ] Add search across all patients
- [ ] Add notifications for urgent actions

---

## ❓ Open Questions for Review

### 1. Dashboard vs Cockpit
- Should dashboard be separate page or integrated into cockpit?
- Should staff see dashboard first or jump to first patient with pending actions?

### 2. Timeline Visualization
- Vertical list (current proposal) or horizontal with dots (previous design)?
- Should timeline show ALL events or just significant ones?
- How to handle dense timelines (20+ events in a cycle)?

### 3. Actions Panel
- Should pending actions be grouped by event or by urgency/channel?
- Should there be a "quick send all WhatsApp" button?
- Should actions auto-expire after certain time?

### 4. Series Actions
- Should injection reminders be auto-generated or manually created?
- Should staff confirm each day's injection or mark in advance?
- How to handle skipped doses or side effects?

### 5. Real-time Updates
- Use WebSockets for live updates or poll every N seconds?
- Should other staff see when someone is documenting same patient?
- Should there be collaborative editing or locks?

### 6. Mobile Responsiveness
- Should cockpit work on tablets/phones or desktop-only?
- Should there be a mobile-specific view for field staff?

### 7. Role-based Views
- Should receptionist see different dashboard than doctor?
- Should embryologist only see lab-related actions?
- Should counselor have mood-focused dashboard?

---

## 📋 Next Steps

1. **Review this plan** with team/user
2. **Answer open questions** together
3. **Prioritize phases** - which to build first?
4. **Create visual mockups** (Figma/wireframes) if needed
5. **Get sign-off** before coding
6. **Start Phase 1** (Dashboard View)

---

**Status:** ⏸️ AWAITING REVIEW - DO NOT CODE YET
