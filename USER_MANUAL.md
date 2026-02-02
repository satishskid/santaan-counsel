# Santaan IVF Platform - User Manual

**Version:** 1.0  
**Last Updated:** February 2026

---

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [User Roles](#user-roles)
4. [Login & Authentication](#login--authentication)
5. [Dashboard Overview](#dashboard-overview)
6. [Patient Management](#patient-management)
7. [Timeline System](#timeline-system)
8. [Clinical Logging](#clinical-logging)
9. [Templates](#templates)
10. [Protocols](#protocols)
11. [Acronym Expansion](#acronym-expansion)
12. [Best Practices](#best-practices)
13. [Troubleshooting](#troubleshooting)

---

## Introduction

### What is Santaan?

Santaan is a comprehensive IVF clinic management platform designed to transform patient care through **timeline-driven documentation** and **staff-mediated communication**. Every patient journey becomes a living document where clinical events, communications, and reactions are captured chronologically.

### Core Philosophy

- **Events → Templates → Communication → Reaction Capture → Timeline Update**
- Staff augmentation, not replacement
- Clinical acronyms expand to full medical records
- Multi-tenant clinic support
- Role-based access control

### Key Features

✅ **Timeline-Based Patient Journey Tracking**  
✅ **810+ Pre-built Communication Templates** (English & Odia)  
✅ **7 IVF Treatment Protocols**  
✅ **Medical Acronym Expansion**  
✅ **Multi-channel Communication** (WhatsApp, SMS, Verbal)  
✅ **Patient Reaction & Anxiety Tracking**  
✅ **Visual Asset Library**  
✅ **Action Queue Management**  
✅ **Performance Analytics**

---

## Getting Started

### System Requirements

- **Browser:** Chrome, Firefox, Safari, or Edge (latest version)
- **Internet:** Stable internet connection
- **Screen:** Minimum 1280x720 resolution

### First-Time Login

1. Open your browser and navigate to the Santaan platform URL
2. You'll see the login page with three fields:
   - **Username:** Your assigned username (e.g., `nurse1`, `doctor1`, `admin`)
   - **Clinic Domain:** Your clinic's domain (e.g., `demo`)
   - **Password:** Your secure password

3. Enter your credentials and click **Login**
4. You'll be redirected to your personalized dashboard

### Demo Credentials

For testing purposes:
- **Username:** `admin`
- **Clinic Domain:** `demo`
- **Password:** `admin123`

---

## User Roles

Santaan supports six distinct user roles, each with specific responsibilities:

### 1. **Clinic Admin** 🔑
**Full Access**
- User management (create, edit, deactivate users)
- View all patient records
- Generate clinic-wide reports
- Manage clinic settings
- Access performance dashboards

**Typical Tasks:**
- Onboarding new staff
- Reviewing clinic metrics
- Managing permissions
- Data export and compliance

---

### 2. **Doctor** 👨‍⚔️
**Clinical Oversight**
- Review and approve treatment plans
- Make clinical entries
- Prescribe protocols
- Review all patient timelines
- Supervise nursing staff entries

**Typical Tasks:**
- Initial patient consultation
- Protocol selection (Antagonist, Long Protocol, etc.)
- Treatment plan adjustments
- Critical decision documentation

---

### 3. **Nurse** 👩‍⚕️
**Frontline Care**
- Create timeline events
- Log clinical observations
- Send patient communications
- Capture patient reactions
- Record vital signs and symptoms

**Typical Tasks:**
- Daily patient check-ins
- Medication administration logging
- Pre-procedure preparations
- Post-procedure follow-ups
- Anxiety assessment

---

### 4. **Counselor** 💙
**Emotional Support**
- Track patient emotional state
- Record counseling sessions
- Monitor anxiety levels
- Document patient concerns
- Provide emotional support notes

**Typical Tasks:**
- Initial counseling sessions
- Pre-treatment anxiety management
- Failure/negative result counseling
- Success/pregnancy support

---

### 5. **Embryologist** 🔬
**Lab Management**
- Record egg retrieval counts
- Document embryo development
- Log fertilization results
- Track embryo grading
- Report embryo transfer details

**Typical Tasks:**
- Daily embryo development updates
- Fertilization reports
- Embryo quality assessments
- Freezing/thawing documentation

---

### 6. **Receptionist** 📋
**Patient Interactions**
- Schedule appointments
- Register walk-in patients
- Log patient calls
- Update contact information
- Manage patient check-ins

**Typical Tasks:**
- Appointment booking
- Patient registration
- Phone call logging
- Payment recording

---

## Login & Authentication

### Logging In

1. Navigate to the login page
2. Enter your **Username** (case-sensitive)
3. Enter your **Clinic Domain**
4. Enter your **Password**
5. Click **Login**

### Security Features

- **JWT Tokens:** Secure session management
- **Auto-logout:** Sessions expire after 7 days of inactivity
- **Role-based Access:** You only see what you're authorized to access
- **Audit Trail:** All actions are logged for compliance

### Forgot Password?

Contact your clinic administrator to reset your password.

---

## Dashboard Overview

After logging in, you'll see your personalized dashboard with:

### Patient List
- All patients assigned to your clinic
- Quick search by name, ID, or phone
- Filter by treatment status
- Sort by last activity, creation date

### Quick Stats
- Total active patients
- Pending actions
- Today's appointments

### Recent Activity
- Latest timeline events
- Recent patient communications
- Pending follow-ups

---

## Patient Management

### Viewing Patients

**Search:**
- Use the search bar to find patients by:
  - Name (partial matching)
  - Patient ID
  - Phone number
  - Email address

**Filter:**
- Active vs. Inactive
- Treatment stage
- Last visit date

### Patient Details

Click on any patient to view:
- **Personal Information:** Name, age, contact details
- **Medical History:** Previous treatments, allergies
- **Current Treatment:** Active protocol, cycle day
- **Timeline:** Complete chronological history

### Creating Walk-in Patients

For unregistered patients:

1. Click **+ New Walk-in Patient**
2. Enter minimal details:
   - Name
   - Phone number
   - Chief complaint
3. Click **Create**
4. Patient gets temporary ID
5. Can be converted to full registration later

---

## Timeline System

**The heart of Santaan** - every patient's journey in chronological order.

### Timeline View

The timeline shows three main columns:

#### **Left Column: Patient Profile**
- Photo and basic info
- Current treatment cycle
- Contact information
- Quick stats

#### **Middle Column: Timeline Events**
- Chronological list of all events
- Color-coded by type:
  - 🔵 Clinical events (blue)
  - 🟢 Communications (green)
  - 🟡 Lab results (yellow)
  - 🔴 Critical alerts (red)

#### **Right Column: Clinical Logging**
- Event type selector
- Template chooser
- Communication channel
- Reaction capture
- Note field

### Timeline Event Types

1. **Initial Consultation** - First visit
2. **Protocol Start** - Treatment begins
3. **Medication** - Drug administration
4. **Scan/Test** - Ultrasounds, blood tests
5. **Egg Retrieval** - OPU procedure
6. **Fertilization** - Lab results
7. **Embryo Transfer** - ET procedure
8. **Pregnancy Test** - Beta HCG
9. **Follow-up** - Post-treatment check

---

## Clinical Logging

### Creating a Timeline Event

1. **Select Patient** from dashboard
2. **Click "Add Event"** in the timeline
3. **Choose Event Type** (dropdown)
4. **Select Template** (optional but recommended)
5. **Choose Communication Channel:**
   - 📱 WhatsApp
   - 💬 SMS
   - 🗣️ Verbal (in-person)
6. **Capture Patient Reaction** (emoji + anxiety level)
7. **Add Clinical Notes** (free text)
8. **Click "Save"**

### Using Templates

Templates are pre-written messages that:
- Ensure consistent communication
- Include medical details automatically
- Available in multiple languages
- Track effectiveness metrics

**Example Flow:**
```
Event: Egg Retrieval
↓
Template: "Egg Retrieval Results - English"
↓
Personalized: "Hi [Name], we successfully retrieved [X] eggs today..."
↓
Channel: WhatsApp
↓
Reaction: 😊 Happy (Anxiety: 3/10)
```

### Reaction Capture

After every communication, capture the patient's:

**Emotional Reaction:**
- 😊 Happy/Relieved
- 😟 Anxious/Worried
- 😢 Sad/Disappointed
- 😐 Neutral/Calm
- 😕 Confused

**Anxiety Level:** 0-10 scale
- 0-3: Low
- 4-6: Moderate
- 7-10: High

**Understanding:** Did they understand?
- ✅ Understood clearly
- ⚠️ Partial understanding
- ❌ Needs re-explanation

---

## Templates

### Template System

Santaan includes **810 pre-built templates** covering:
- All IVF treatment stages
- Multiple languages (English, Odia)
- Different communication styles
- Success and failure scenarios

### Template Categories

1. **Consultation** - Initial meetings
2. **Investigation** - Test results
3. **Protocol** - Treatment plans
4. **Medication** - Drug instructions
5. **Procedure** - Pre/post procedure
6. **Results** - Lab findings
7. **Follow-up** - Check-ins
8. **Emergency** - Urgent situations

### Using Templates

**Step 1:** Select event type  
**Step 2:** Filter templates by:
- Event type (auto-filtered)
- Language
- Patient history

**Step 3:** Preview template  
**Step 4:** Personalize with patient data:
- `[Name]` → Patient name
- `[Date]` → Appointment date
- `[Count]` → Egg count, embryo count, etc.

**Step 5:** Send via chosen channel

### Template Variables

Templates support automatic substitution:
- `[PatientName]` - Full name
- `[DoctorName]` - Treating doctor
- `[Date]` - Event date
- `[Time]` - Event time
- `[EggCount]` - Retrieved eggs
- `[EmbryoCount]` - Embryos created
- `[NextDate]` - Follow-up date

---

## Protocols

### IVF Treatment Protocols

Santaan includes 7 standard protocols:

#### 1. **Antagonist Protocol**
- Most common
- Shorter duration (10-12 days)
- Uses GnRH antagonist
- Better for PCOS patients

#### 2. **Long Protocol**
- Gold standard
- 4-6 weeks duration
- Uses GnRH agonist
- Better control

#### 3. **Short Protocol**
- 2-3 weeks
- Flare effect
- For poor responders

#### 4. **Natural Cycle**
- No stimulation
- Single egg
- Minimal medication

#### 5. **Mild Stimulation**
- Low dose drugs
- 2-7 eggs target
- Reduced side effects

#### 6. **Freeze-All**
- No fresh transfer
- All embryos frozen
- Better for OHSS risk

#### 7. **FET (Frozen Embryo Transfer)**
- Using frozen embryos
- Natural or medicated cycle
- Better success rates

### Applying Protocols

1. **Doctor selects protocol** based on:
   - Patient age
   - AMH levels
   - Previous response
   - Medical history

2. **System generates action series:**
   - Medication schedule
   - Scan appointments
   - Blood test dates
   - Procedure timings

3. **Automatic reminders** sent to:
   - Patient (via WhatsApp/SMS)
   - Staff (via action queue)

---

## Acronym Expansion

### Medical Acronyms Made Simple

Santaan automatically expands **16 common IVF acronyms** to full medical records.

### Supported Acronyms

| Acronym | Full Form | Description |
|---------|-----------|-------------|
| **IVF** | In Vitro Fertilization | Assisted reproductive technology |
| **ICSI** | Intracytoplasmic Sperm Injection | Sperm directly into egg |
| **FSH** | Follicle Stimulating Hormone | Hormone for egg development |
| **LH** | Luteinizing Hormone | Triggers ovulation |
| **HCG** | Human Chorionic Gonadotropin | Pregnancy hormone |
| **AMH** | Anti-Müllerian Hormone | Ovarian reserve marker |
| **AFC** | Antral Follicle Count | Egg count indicator |
| **ET** | Embryo Transfer | Embryo placement |
| **OPU** | Ovum Pick Up | Egg retrieval |
| **PCOS** | Polycystic Ovary Syndrome | Hormonal disorder |
| **OHSS** | Ovarian Hyperstimulation Syndrome | Stimulation complication |
| **GnRH** | Gonadotropin-Releasing Hormone | Hormone regulator |
| **E2** | Estradiol | Estrogen level |
| **P4** | Progesterone | Pregnancy support hormone |
| **FET** | Frozen Embryo Transfer | Frozen embryo use |
| **PGT** | Preimplantation Genetic Testing | Embryo genetic screening |

### How It Works

When typing clinical notes:
```
Type: "Patient has high FSH"
Auto-expands: "Patient has high FSH (Follicle Stimulating Hormone)"

Type: "ICSI performed"
Auto-expands: "ICSI (Intracytoplasmic Sperm Injection) performed"
```

---

## Best Practices

### For All Staff

✅ **Log immediately** - Don't delay timeline entries  
✅ **Capture reactions** - Every communication gets a reaction  
✅ **Use templates** - Consistency improves outcomes  
✅ **Be thorough** - Better over-documented than under  
✅ **Check understanding** - Verify patient comprehension  

### For Doctors

✅ **Review daily** - Check timeline events from team  
✅ **Document decisions** - Why you chose a protocol  
✅ **Use acronyms** - System expands them automatically  
✅ **Template approval** - Review before major communications  

### For Nurses

✅ **Visual aids** - Attach diagrams when explaining  
✅ **Anxiety tracking** - Monitor trends over time  
✅ **Pre-fill templates** - Personalize before sending  
✅ **Follow protocols** - Use system-generated action lists  

### For Counselors

✅ **Session notes** - Document every counseling interaction  
✅ **Trend analysis** - Watch for anxiety spikes  
✅ **Proactive outreach** - Contact before critical events  
✅ **Resource sharing** - Use visual asset library  

### For Embryologists

✅ **Daily updates** - Log embryo development daily  
✅ **Photo documentation** - Attach embryo images  
✅ **Quality scoring** - Use standardized grading  
✅ **Timing precision** - Record exact times for procedures  

---

## Troubleshooting

### Common Issues

#### "Cannot Login"
- ✓ Check username spelling (case-sensitive)
- ✓ Verify clinic domain
- ✓ Ensure Caps Lock is off
- ✓ Contact admin for password reset

#### "Patient Not Found"
- ✓ Check search spelling
- ✓ Try partial name search
- ✓ Search by phone number
- ✓ Verify patient is in your clinic

#### "Template Not Loading"
- ✓ Refresh the page
- ✓ Check internet connection
- ✓ Clear browser cache
- ✓ Try different browser

#### "Timeline Event Not Saving"
- ✓ Check all required fields filled
- ✓ Verify internet connection
- ✓ Check file size if attaching images
- ✓ Try again in a few minutes

### Browser Issues

**Clear Cache:**
- Chrome: `Ctrl+Shift+Delete` (Windows) / `Cmd+Shift+Delete` (Mac)
- Firefox: `Ctrl+Shift+Delete`
- Safari: `Cmd+Option+E`

**Recommended Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Getting Help

**Contact Your Clinic Administrator:**
- Technical issues
- Permission problems
- Feature requests
- Training needs

**Emergency Support:**
- Critical system failures
- Data access issues
- Security concerns

---

## Performance Tips

### Faster Workflows

1. **Keyboard Shortcuts** (coming soon)
2. **Favorite Templates** - Star frequently used templates
3. **Quick Patient Search** - Use patient ID for instant lookup
4. **Bulk Actions** - Select multiple patients for group communications
5. **Dashboard Customization** - Arrange widgets for your workflow

### Mobile Access

Santaan is **mobile-responsive**:
- Works on tablets and phones
- Touch-optimized interface
- Offline mode (coming soon)

### Data Export

Clinic admins can export:
- Patient timelines (PDF)
- Treatment summaries
- Analytics reports
- Compliance documents

---

## Appendix

### Glossary

**Timeline:** Chronological record of all patient interactions  
**Event:** A specific occurrence in patient treatment  
**Template:** Pre-written communication message  
**Protocol:** Standardized treatment plan  
**Reaction:** Patient's emotional/physical response  
**Action Queue:** List of pending tasks  

### Support Resources

- **User Guide Videos:** [Coming Soon]
- **FAQ Database:** [Coming Soon]
- **Training Sessions:** Contact your admin
- **Feature Updates:** Check dashboard notifications

---

## Version History

**v1.0 - February 2026**
- Initial release
- 810 templates (English & Odia)
- 7 treatment protocols
- 16 acronym expansions
- Full timeline system
- Multi-role support

---

**Need Help?** Contact your clinic administrator or refer to this manual.

**Santaan IVF Platform** - Transforming IVF Care Through Better Documentation
