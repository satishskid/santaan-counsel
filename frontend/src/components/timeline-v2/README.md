# Conversational Timeline UI - Implementation Guide

## 🎯 Overview
Claude-inspired conversational timeline interface for Santaan IVF platform. Focuses on easy scanning, copy-ready templates, and staff efficiency.

## 📦 New Components Created

### 1. **PatientViewV2.jsx** 
Main patient view with 2-column layout (20% sidebar + 80% timeline)
- **Route**: `/patients/:id` (replaced old PatientView)
- **Old Route**: `/patients-old/:id` (backup)

### 2. **ConversationalTimeline.jsx**
Main timeline container with chat-style event bubbles
- Fetches templates for each event type
- Handles inline event editor
- Empty state messaging

### 3. **EventBubble.jsx**
Individual event display in chat-bubble style
- Metadata bar: Date, cycle day, mood emoji, anxiety change
- Clinical data: Bulleted list
- Templates: Embedded with Copy/Preview/Send buttons
- Expandable template preview

### 4. **InlineEventEditor.jsx**
Inline event creation form (replaces modal popup)
- No modal interruptions
- Full event type selection
- Clinical data, summary, reactions
- Saves to API and refreshes timeline

### 5. **PatientSidebar.jsx**
Left sidebar with patient overview
- Patient info & MR number
- Current cycle stats
- Auto-detected stage
- Next actions widget
- Quick add buttons (Scan, Call, Counseling)
- Patient stats (AMH, previous cycles, baseline anxiety)

### 6. **claude-theme.css**
Minimal color theme and typography system
- Variables for colors, spacing, typography
- Utility classes for cards, buttons, text
- Custom scrollbar styling

## 🎨 Design System

### Colors
- **Canvas**: `#FAFAF8` - Background
- **Surface**: `#FFFFFF` - Cards
- **Text**: `#1A1A1A` - Primary
- **Accent**: `#2D6FDB` - Action blue (only accent color)

### Typography
- **Font**: System fonts (-apple-system, Segoe UI, Inter)
- **Base Size**: 15px (0.9375rem)
- **Line Height**: 1.6
- **Weights**: 400 (normal), 500 (medium), 600 (semibold)

### Spacing
- 8px base unit system
- `--space-4` = 1rem = 16px (most common)

## 🔧 How It Works

### Data Flow
```
Timeline (source of truth) 
  → Events (EventBubble)
    → Templates (embedded with patient name)
      → Actions (Copy/Edit/Send)
        → Reactions (captured in form)
```

### Template System
1. Templates fetched from `/api/templates/all`
2. Grouped by event type
3. Displayed in each EventBubble
4. Patient name auto-filled: "Hi Priya! 😊"
5. Copy button uses clipboard API
6. Preview expands template text
7. Send button (future: WhatsApp/SMS integration)

### Inline Editing
1. Click "Add Event" in header or sidebar quick actions
2. InlineEventEditor appears at top of timeline
3. Border highlighted in blue
4. Form auto-focuses
5. Save creates event via API
6. Timeline refreshes automatically
7. No modal popup interruption

## 📱 Responsive Design
- Sidebar: 3 columns on desktop
- Timeline: 9 columns on desktop
- Mobile: Stack sidebar on top (future enhancement)

## 🚀 Usage

### Access New UI
```
http://localhost:5173/patients/1
```

### Access Old UI (Backup)
```
http://localhost:5173/patients-old/1
```

### Quick Add Event from Sidebar
```jsx
<PatientSidebar 
  patient={patient}
  activeCycle={activeCycle}
  onAddEvent={(type) => handleAddEvent(type)}
/>
```

### Copy Template to Clipboard
```jsx
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};
```

## 🎯 Key Features

### ✅ Implemented
- [x] 2-column conversational layout
- [x] Claude-inspired minimal theme
- [x] Event bubbles with metadata
- [x] Embedded templates with copy buttons
- [x] Inline event editor (no modal)
- [x] Patient sidebar with overview
- [x] Auto-stage detection
- [x] Quick action buttons
- [x] Mood emoji indicators
- [x] Anxiety tracking (before → after)
- [x] Template preview/expand
- [x] Copy to clipboard

### 🔜 Future Enhancements
- [ ] WhatsApp/SMS integration for Send button
- [ ] Template editing before send
- [ ] Reaction logging after send
- [ ] Real-time updates (WebSocket)
- [ ] Mobile responsive design
- [ ] Timeline filtering by event type
- [ ] Export timeline as PDF
- [ ] Search/filter templates
- [ ] Multi-language template switching
- [ ] Voice notes attachment

## 📝 Files Modified
- `frontend/src/App.jsx` - Added PatientViewV2 route
- Created `frontend/src/pages/PatientViewV2.jsx`
- Created `frontend/src/components/timeline-v2/` directory
- Created `frontend/src/styles/claude-theme.css`

## 🎨 Screenshots
Visit http://localhost:5173/patients/1 to see:
- Minimal grayscale + blue accent theme
- Chat-style event bubbles
- Copy-ready templates with patient name
- Sidebar with auto-stage detection
- Inline event editing (no modal)

## 🐛 Troubleshooting

### Templates not showing?
- Check backend running: `lsof -ti:3000`
- Check templates exist: `curl http://localhost:3000/api/templates/all`

### Styles not applied?
- Verify `claude-theme.css` imported in `PatientViewV2.jsx`
- Check browser console for CSS errors

### Events not saving?
- Check network tab for API errors
- Verify patient ID exists
- Check backend logs

## 📚 Resources
- [UI_UX_REDESIGN_PROPOSAL.md](../UI_UX_REDESIGN_PROPOSAL.md) - Original design document
- [Copilot Instructions](../.github/copilot-instructions.md) - Project guidelines

---

**Status**: ✅ Phase 1 Complete - Foundation, Theme, and Core Components
**Next**: Test with real patient data and refine template display
