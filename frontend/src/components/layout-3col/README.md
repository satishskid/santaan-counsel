# 3-Column Clinical Workflow UI - Complete Implementation

## 🎯 Layout Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         TOP NAVIGATION                            │
│  ← Dashboard    |    Dr. Name | Doctor | Logout                  │
└──────────────────────────────────────────────────────────────────┘
┌────────────────┬──────────────────────────┬─────────────────────┐
│ LEFT (25%)     │ MIDDLE (40%)             │ RIGHT (35%)         │
│ Patient        │ Clinical Logging         │ Actions &           │
│ Profile        │ (SOAP Notes)             │ Templates           │
│ & Journey      │                          │                     │
│                │                          │                     │
│ • Header       │ • Meta-Prompt Chips      │ • Event Card        │
│ • Cycle Story  │ • SOAP Sections          │ • Templates         │
│ • Visit History│   - Subjective           │ • Action Buttons    │
│ • TODAY Card   │   - Objective*           │ • Reaction Capture  │
│ • Upcoming     │   - Assessment*          │ • Action Log        │
│                │   - Plan                 │                     │
│                │ • Generate Event         │                     │
└────────────────┴──────────────────────────┴─────────────────────┘
```

## 📋 Column Details

### LEFT: Patient Profile & Journey (25%)

**Purpose**: Single-glance patient overview + complete journey visualization

**Components**:
1. **Patient Header** (Prominent Summary)
   - Name, MR#, Age
   - Attempts count
   - Trying since duration
   - Primary diagnosis
   - AMH, AFC, Partner age

2. **Current Cycle Story**
   - Narrative paragraph
   - Cycle #, Day, Phase
   - Protocol
   - Progress summary

3. **Visit History** (Vertical Timeline)
   - Vertical bar with dots
   - 🔥 indicator for significant events (OPU, Transfer, Trigger, Baseline)
   - Click to expand visit summary
   - Chronological from recent to old

4. **CURRENT/NOW Card** (Highlighted)
   - Blue border
   - Today's events
   - Real-time status

5. **Important Future Events**
   - Next 3 upcoming events
   - Date + cycle day

**Interaction**: Scroll to view full history, click visits to see summaries

---

### MIDDLE: Clinical Logging (40%)

**Purpose**: Doctor/Nurse/Embryologist clinical note entry with SOAP format

**Components**:
1. **SOAP Section Tabs**
   - Subjective
   - Objective* (required)
   - Assessment* (required)
   - Plan

2. **Meta-Prompt Chips** (Context-aware by section)
   ```
   Subjective: 😊 Feeling Good | 😰 Anxious | 🤕 Pain | 💊 Meds | ❓ Questions
   Objective: 🔬 Normal Scan | 📊 Good Response | ⚠️ Slow | 💉 Blood | 🥚 Eggs
   Assessment: ✅ On Track | 📈 Good | ⏸️ Wait | 🔄 Adjust | 🎯 Trigger Ready
   Plan: 📅 Next Scan | 💉 Trigger | 🏥 OPU | 🧬 Embryo | 📞 Follow-up
   ```

3. **Chip Click Behavior**:
   - Clicks chip → Adds text to active section
   - Text is pre-formatted for quick entry
   - User can edit after adding

4. **Text Areas**:
   - Monospace font for clinical data
   - Multi-line input
   - Manual typing allowed

5. **Generate Event Button**:
   - Creates timeline event from SOAP note
   - Triggers action generation in right column
   - Auto-clears form after save

**Workflow**: Select section → Click chips → Edit if needed → Generate Event

---

### RIGHT: Actions & Templates (35%)

**Purpose**: Communication execution + reaction capture

**Components**:
1. **Event Card**
   - Event type (e.g., "MONITORING SCAN")
   - Timestamp
   - Auto-populated from middle column

2. **Communication Templates** (Event-specific)
   - Template name, language, channel
   - Preview/Collapse button
   - Full message text with patient name pre-filled
   - Copy to Clipboard button

3. **Action Buttons** (Per Template)
   ```
   Grid layout 2x2:
   ┌─────────────┬─────────────┐
   │ Verbally    │ Called      │
   │ Conveyed    │             │
   ├─────────────┼─────────────┤
   │ WhatsApped  │ SMS         │
   └─────────────┴─────────────┘
   ```
   - Color-coded: Verbal (green), Call (blue), WhatsApp (green), SMS (orange)

4. **Reaction Capture Modal**:
   - Triggered after action button click
   - 6 emoji reactions:
     ```
     😊 Happy    😌 Relieved   😟 Worried
     😰 Anxious  🤔 Confused   👍 Understood
     ```
   - Click emoji → Saves action + reaction
   - Closes modal automatically

5. **Completed Actions Log**:
   - Shows all actions taken for this event
   - Action type + reaction emoji
   - Chronological order

**Workflow**: Preview template → Copy/Click action → Select patient reaction → Logged

---

## 🔄 Data Flow

```
MIDDLE COLUMN                    RIGHT COLUMN
    │                                │
    ▼                                │
[Doctor clicks chips]               │
    │                                │
    ▼                                │
[SOAP note built]                   │
    │                                │
    ▼                                │
[Generate Event & Actions] ─────────►[Event appears]
                                     │
                                     ▼
                                [Templates fetched]
                                     │
                                     ▼
                                [Staff clicks action]
                                     │
                                     ▼
                                [Reaction modal opens]
                                     │
                                     ▼
                                [Emoji selected]
                                     │
                                     ▼
                                [Action + Reaction saved]
                                     │
                                     ▼
                                [Appears in Action Log]
```

## 🎨 Design System

**Colors**:
- Canvas: `#FAFAF8`
- Surface: `#FFFFFF`
- Text: `#1A1A1A`
- Accent: `#2D6FDB` (blue)
- Success: `#2E7D5F` (green)
- Warning: `#C17D4A` (orange)

**Typography**:
- System fonts
- 15px base size
- 1.6 line height

**Spacing**:
- 8px base unit
- Cards: 16-24px padding

## 🚀 Usage

### Access Routes
- **3-Column (Current)**: `http://localhost:5173/patients/:id`
- **2-Column (Previous)**: `http://localhost:5173/patients-v2/:id`
- **Original**: `http://localhost:5173/patients-old/:id`

### Example Workflow

1. **Doctor logs in** → Opens patient timeline
2. **LEFT**: Sees patient is on Day 7, 2nd attempt, anxious mood
3. **MIDDLE**: 
   - Clicks "Objective" tab
   - Clicks "🔬 Normal Scan" chip
   - Edits to add specific values: "E2: 520 pg/mL"
   - Clicks "Assessment" tab
   - Clicks "📈 Good Progress" chip
   - Clicks "Generate Event & Actions"
4. **RIGHT**:
   - Event "MONITORING SCAN" appears
   - 3 templates shown (WhatsApp Hindi, Verbal, Email)
   - Doctor previews WhatsApp template
   - Clicks "Copy to Clipboard"
   - Sends via WhatsApp manually
   - Clicks "WhatsApped" button
   - Modal asks: "How did patient respond?"
   - Clicks "😊 Happy" emoji
   - Action logged with reaction

## 📁 File Structure

```
frontend/src/
├── pages/
│   └── PatientView3Col.jsx          # Main 3-column container
├── components/layout-3col/
│   ├── LeftColumn_PatientProfile.jsx   # Patient overview & journey
│   ├── MiddleColumn_ClinicalLogging.jsx # SOAP notes with chips
│   └── RightColumn_Actions.jsx         # Templates & reactions
└── styles/
    └── claude-theme.css             # Minimal design system
```

## 🔧 Key Features

### ✅ Implemented
- [x] 3-column responsive layout (25-40-35)
- [x] Patient header with prominent stats
- [x] Current cycle narrative paragraph
- [x] Vertical timeline with visit dots
- [x] Significant event indicators (🔥)
- [x] Click to expand visit summaries
- [x] TODAY card with blue border
- [x] Upcoming events list
- [x] SOAP note sections with tabs
- [x] Meta-prompt chips (context-aware)
- [x] Chip click adds formatted text
- [x] Generate event from SOAP note
- [x] Event-specific templates display
- [x] Copy to clipboard for templates
- [x] 4 action buttons per template
- [x] Emoji reaction capture modal
- [x] Action + reaction logging
- [x] Completed actions timeline

### 🔜 Future Enhancements
- [ ] WhatsApp direct send integration
- [ ] SMS API integration
- [ ] Voice note recording
- [ ] Template editing before send
- [ ] Multi-language template switching
- [ ] AI-powered SOAP note suggestions
- [ ] Real-time collaboration (multiple staff)
- [ ] Print/export patient timeline
- [ ] Mobile responsive design

## 🎯 User Roles & Usage

| Role | Primary Column | Use Case |
|------|---------------|----------|
| Doctor | Middle | Log clinical findings, make assessments |
| Nurse | Middle + Right | Log vitals, execute communication |
| Embryologist | Middle | Log lab results (fertilization, embryo) |
| Counselor | Right | Send emotional support messages |
| Receptionist | Right | Confirm appointments, send reminders |

## 📊 Performance

- Lazy loads templates on mount
- Event creation triggers right column update
- No unnecessary re-renders
- Optimized for 100+ timeline events

## 🐛 Troubleshooting

**Templates not showing?**
- Check backend running: `lsof -ti:3000`
- Verify templates exist: `curl http://localhost:3000/api/templates/all`

**Actions not saving?**
- Check network tab for POST errors
- Verify `/api/actions` endpoint exists

**Reaction modal not closing?**
- Click outside modal or select emoji
- Check console for errors

---

**Status**: ✅ Complete 3-Column Implementation
**Access**: http://localhost:5173/patients/1
