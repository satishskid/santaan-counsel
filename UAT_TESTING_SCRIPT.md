# 🧪 Santaan IVF Platform - UAT Testing Script

**Version**: 1.0  
**Platform URL**: https://santaan-frontend.onrender.com  
**Test Date**: _____________  
**Tester Name**: _____________

---

## 📋 Pre-Test Setup

**What You Need:**
- Computer with internet browser (Chrome, Safari, Firefox, or Edge)
- This testing script
- 15-30 minutes of uninterrupted time

**Test Credentials:**

| Role | Username | Domain | Password |
|------|----------|--------|----------|
| Admin | `admin` | `demo` | `admin123` |
| Doctor | `doctor1` | `demo` | `admin123` |
| Nurse | `nurse1` | `demo` | `admin123` |
| Embryologist | `embryo1` | `demo` | `admin123` |

---

## 🔐 Test 1: Login & Authentication

### 1.1 Basic Login
**Steps:**
1. Open browser and go to: `https://santaan-frontend.onrender.com`
2. You should see the login page with "Santaan" heading
3. Enter:
   - Username: `admin`
   - Clinic Domain: `demo`
   - Password: `admin123`
4. Click **Login** button

**Expected Result:**
- ✅ Login succeeds and redirects to Dashboard
- ✅ You see patient list on the screen
- ✅ Top right shows "Admin User" name

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

### 1.2 Invalid Login
**Steps:**
1. Logout (top right corner)
2. Try logging in with wrong password: `wrongpassword`

**Expected Result:**
- ✅ Login fails with error message
- ✅ Stays on login page

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

### 1.3 Session Persistence
**Steps:**
1. Login successfully as `admin`
2. Refresh the browser page (F5 or Cmd+R)

**Expected Result:**
- ✅ Still logged in (doesn't go back to login page)
- ✅ Dashboard loads without re-entering credentials

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

## 👥 Test 2: Dashboard & Patient List

### 2.1 View Patient List
**Steps:**
1. Login as `admin`
2. Observe the dashboard page

**Expected Result:**
- ✅ See list of patients with names
- ✅ Each patient shows basic info (age, AMH, cycle info)
- ✅ Search bar at top is visible

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

### 2.2 Search Patients
**Steps:**
1. Click the search bar at top
2. Type "Priya" (partial name)
3. Observe search results

**Expected Result:**
- ✅ Search suggestions appear as you type
- ✅ Clicking a suggestion navigates to that patient

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

### 2.3 Quick Patient Registration
**Steps:**
1. From dashboard, click **"+ Walk-in Registration"** button
2. Fill in form:
   - First Name: `TestPatient`
   - Last Name: `UAT`
   - Age: `32`
   - Phone: `9876543210`
   - AMH: `2.5`
3. Click **Register**

**Expected Result:**
- ✅ Form submits successfully
- ✅ Redirects to new patient's timeline page
- ✅ Shows "TestPatient UAT" at top

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

## 📊 Test 3: Patient Timeline View

### 3.1 Open Patient Timeline
**Steps:**
1. From dashboard, click on any patient name (e.g., "Priya Sharma")
2. Observe the timeline view

**Expected Result:**
- ✅ Patient name and details shown at top
- ✅ Timeline events displayed chronologically
- ✅ Three-column layout: Timeline | Clinical Logging | Actions

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

### 3.2 View Event Details
**Steps:**
1. In the timeline column (left), click on any event
2. Read the event details

**Expected Result:**
- ✅ Event shows date, type, and description
- ✅ Clinical notes visible if available
- ✅ Event can be expanded/collapsed

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

### 3.3 Timeline Navigation
**Steps:**
1. Scroll through the timeline
2. Look for different event types (consultation, scan, retrieval, etc.)

**Expected Result:**
- ✅ Events are in chronological order (newest first)
- ✅ Different event types have different visual indicators
- ✅ Smooth scrolling

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

## 📝 Test 4: Clinical Logging

### 4.1 Add Clinical Note
**Steps:**
1. In patient timeline, go to middle column "Clinical Logging"
2. You should see colored chips for different findings
3. Click on chips to select them (e.g., "Good Quality", "Mature")
4. In the text area, type: `Patient responding well to treatment`
5. Click **Save Clinical Entry**

**Expected Result:**
- ✅ Selected chips are highlighted
- ✅ Note saves successfully
- ✅ Timeline updates with new clinical entry
- ✅ Entry shows selected categories and note

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

### 4.2 Acronym Expansion
**Steps:**
1. In clinical logging, type: `ET scheduled. E2 levels good. AFC 12.`
2. Observe the text

**Expected Result:**
- ✅ Acronyms automatically expand to full medical terms
- ✅ "ET" → "Embryo Transfer"
- ✅ "E2" → "Estradiol"
- ✅ "AFC" → "Antral Follicle Count"

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

## 💬 Test 5: Communication Templates

### 5.1 View Templates
**Steps:**
1. Navigate to any patient timeline
2. In the right column, find "Templates" section
3. Observe available templates

**Expected Result:**
- ✅ Templates are organized by event type
- ✅ Multiple language options visible (English, Hinglish, Odia)
- ✅ Templates show talking points

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

### 5.2 Use Communication Template
**Steps:**
1. Select an event type (e.g., "Follicular Scan")
2. Choose a template in English
3. Click to expand template
4. Review the content

**Expected Result:**
- ✅ Template shows greeting, context, explanation
- ✅ Talking points are clear and organized
- ✅ Language is patient-friendly

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

### 5.3 Multi-Language Templates
**Steps:**
1. Select same event type
2. Switch to "Hinglish" or "Odia" language
3. Compare with English version

**Expected Result:**
- ✅ Same content in different language
- ✅ Cultural adaptations visible
- ✅ Maintains medical accuracy

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

## 📋 Test 6: Action Queue

### 6.1 View Actions
**Steps:**
1. In patient timeline, check right column "Actions" section
2. Observe pending actions

**Expected Result:**
- ✅ Actions listed with priority
- ✅ Each action shows: type, assigned staff, due date
- ✅ Can filter by status (pending/completed)

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

### 6.2 Complete Action
**Steps:**
1. Find any pending action
2. Click "Mark Complete" or similar button
3. Observe the change

**Expected Result:**
- ✅ Action moves to completed status
- ✅ Visual indicator changes (checkmark, color change)
- ✅ Timestamp of completion recorded

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

## 🔬 Test 7: Protocol Management

### 7.1 View Protocols
**Steps:**
1. From main navigation, go to "Protocols" section
2. Browse available protocols

**Expected Result:**
- ✅ List of IVF protocols displayed
- ✅ Each protocol shows: name, type, medication schedule
- ✅ Can view protocol details

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

### 7.2 Generate Protocol Schedule
**Steps:**
1. Select a protocol (e.g., "Long Agonist Protocol")
2. Click "Generate Schedule"
3. Enter patient details if prompted
4. Review generated schedule

**Expected Result:**
- ✅ Schedule generated with day-by-day medications
- ✅ Dosages and timings specified
- ✅ Can export or save schedule

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

## 👨‍⚕️ Test 8: Role-Based Access

### 8.1 Doctor Role
**Steps:**
1. Logout from admin account
2. Login as Doctor (`doctor1` / `demo` / `admin123`)
3. Navigate through dashboard

**Expected Result:**
- ✅ Can view all patients
- ✅ Can add clinical notes
- ✅ Can modify treatment plans
- ✅ Cannot access admin settings

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

### 8.2 Nurse Role
**Steps:**
1. Logout and login as Nurse (`nurse1` / `demo` / `admin123`)
2. Try to access patient timeline
3. Try to add clinical entry

**Expected Result:**
- ✅ Can view patient timelines
- ✅ Can add clinical notes
- ✅ Can send communications
- ✅ Cannot modify major clinical decisions

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

### 8.3 Embryologist Role
**Steps:**
1. Login as Embryologist (`embryo1` / `demo` / `admin123`)
2. Navigate to patient timeline
3. Look for embryology-specific features

**Expected Result:**
- ✅ Can add embryo development notes
- ✅ Can record lab results
- ✅ Can track embryo quality
- ✅ Cannot access non-lab clinical data

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

## 🔍 Test 9: Data Validation

### 9.1 Form Validation
**Steps:**
1. Try to register new patient with:
   - Age: `150` (invalid)
   - Phone: `abc` (invalid)
   - AMH: `-5` (invalid)

**Expected Result:**
- ✅ Form shows validation errors
- ✅ Cannot submit with invalid data
- ✅ Error messages are clear and helpful

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

### 9.2 Required Fields
**Steps:**
1. Try to save clinical note without:
   - Selecting any event type
   - Entering any text

**Expected Result:**
- ✅ System prevents empty submissions
- ✅ Highlights required fields
- ✅ Clear error message shown

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

## 📱 Test 10: Responsive Design

### 10.1 Desktop View
**Steps:**
1. Use application on full-screen desktop browser
2. Navigate through all pages

**Expected Result:**
- ✅ Three-column layout displays properly
- ✅ All text readable
- ✅ No horizontal scrolling needed

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

### 10.2 Tablet View
**Steps:**
1. Resize browser to tablet width (~800px)
2. Navigate through pages

**Expected Result:**
- ✅ Layout adapts to smaller screen
- ✅ Navigation remains accessible
- ✅ Content remains readable

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

## 🚀 Test 11: Performance

### 11.1 Page Load Speed
**Steps:**
1. Clear browser cache
2. Login and navigate to dashboard
3. Observe loading time

**Expected Result:**
- ✅ Login completes within 2-3 seconds
- ✅ Dashboard loads within 2-3 seconds
- ✅ Patient timeline loads within 2-3 seconds

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

### 11.2 Large Data Sets
**Steps:**
1. Navigate to patient with many timeline events
2. Scroll through entire timeline
3. Observe performance

**Expected Result:**
- ✅ Smooth scrolling
- ✅ No lag or freezing
- ✅ Events load progressively if needed

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

## 🔒 Test 12: Security

### 12.1 Auto-Logout
**Steps:**
1. Login to system
2. Leave browser idle for 30 minutes
3. Try to navigate

**Expected Result:**
- ✅ Session expires after inactivity
- ✅ Redirects to login page
- ✅ Shows "session expired" message

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

### 12.2 Direct URL Access
**Steps:**
1. Logout from system
2. Try to access: `https://santaan-frontend.onrender.com/patients/1`
3. Without logging in

**Expected Result:**
- ✅ Automatically redirects to login
- ✅ Cannot access patient data without authentication
- ✅ After login, can access the URL

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

## 🐛 Test 13: Error Handling

### 13.1 Network Error
**Steps:**
1. While logged in, turn off WiFi/network
2. Try to perform an action (add note, search patient)
3. Observe behavior

**Expected Result:**
- ✅ Shows clear error message
- ✅ Doesn't crash or freeze
- ✅ Recovers when network restored

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

### 13.2 Invalid Data Entry
**Steps:**
1. Try to enter special characters in patient name: `@#$%`
2. Try to save

**Expected Result:**
- ✅ System validates input
- ✅ Shows helpful error message
- ✅ Prevents invalid data entry

**Status**: ⬜ Pass  ⬜ Fail  
**Notes**: _______________________________________________

---

## 📊 Test Summary

**Total Tests**: 30+  
**Passed**: _____  
**Failed**: _____  
**Blocked**: _____  

---

## ✅ Critical Issues Found

| Test # | Issue Description | Severity | Screenshot |
|--------|------------------|----------|------------|
| | | ⬜ Critical ⬜ High ⬜ Medium ⬜ Low | |
| | | ⬜ Critical ⬜ High ⬜ Medium ⬜ Low | |
| | | ⬜ Critical ⬜ High ⬜ Medium ⬜ Low | |

---

## 💡 Suggestions & Feedback

**What worked well:**
_________________________________________________________________
_________________________________________________________________

**What could be improved:**
_________________________________________________________________
_________________________________________________________________

**Features you'd like to see:**
_________________________________________________________________
_________________________________________________________________

---

## 📝 Tester Sign-Off

**Tester Name**: _______________________  
**Date**: _______________________  
**Signature**: _______________________

**Overall Assessment**: ⬜ Ready for Production  ⬜ Needs Minor Fixes  ⬜ Needs Major Fixes

---

## 📞 Support Contact

If you encounter any issues during testing:
- **Email**: [Your support email]
- **Phone**: [Your support number]
- **Documentation**: Check README.md in project repository

---

**End of UAT Testing Script**
