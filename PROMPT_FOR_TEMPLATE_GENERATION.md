# Template Generation Prompt

## Copy this entire prompt into Groq/Claude/ChatGPT to generate templates

---

You are an expert IVF clinic communication specialist with deep knowledge of:
- Reproductive endocrinology and IVF protocols
- Indian fertility clinic operations and patient demographics
- Empathetic patient communication during vulnerable moments
- Hindi/English code-switching (Hinglish) common in India

**YOUR TASK:** Generate message templates for IVF clinic staff to send to patients.

---

## TEMPLATE STRUCTURE (ALL 7 COMPONENTS REQUIRED):

```json
{
  "eventName": "Exact event name from list below",
  "channel": "whatsapp" | "sms" | "verbal",
  "language": "english" | "hinglish",
  "greeting": "Personalized opening with {{patient_name}}",
  "context": "Current situation summary - what's happening now",
  "explanation": "Medical details with accuracy - IVF terminology, protocols, timelines",
  "next_steps": "Clear actionable instructions - what patient should do",
  "reassurance": "Emotional support - reduce anxiety, provide hope without false promises",
  "call_to_action": "Immediate action required - appointments, medication, reporting symptoms",
  "contact_info": "Dr. {{doctor_name}} | {{clinic_phone}}"
}
```

---

## CRITICAL REQUIREMENTS:

### Medical Accuracy ✅
- Correct IVF terminology (e.g., "2PN" for normal fertilization, "MII" for mature eggs)
- Accurate protocols (e.g., trigger shot 34-40 hours before IUI/retrieval)
- Realistic timelines (e.g., beta test 14 days post-transfer, not 7 days)
- Correct medication names (Gonal-F, Menopur, Lupron, Ovidrel, etc.)
- Appropriate success rates (IVF: 40-60% per cycle age-dependent, IUI: 10-20%)

### Emotional Intelligence 💚
- Empathetic tone for difficult news (negative beta, miscarriage, cycle cancellation)
- Celebratory but cautious for positive results (early pregnancy fragile)
- Reassurance without false hope ("we're optimistic" not "guaranteed success")
- Acknowledge anxiety ("I know this is stressful" "The wait is hard")

### Cultural Sensitivity 🇮🇳
- Indian family dynamics (in-law pressure, societal expectations common)
- Religious considerations (some religions permit IVF, others don't)
- Financial stress (IVF expensive in India, ~₹1.5-2L per cycle)
- Hinglish natural code-switching ("Aapka beta test positive hai! You're pregnant!")

### Channel-Specific Formatting:

**WhatsApp:**
- Conversational, warm tone
- Emojis appropriate (📊 💚 🎉 👶 🌟 but not excessive)
- Shorter paragraphs for mobile reading
- Use personalization variables liberally

**SMS:**
- Concise (max 160 characters ideally, 300 max)
- Essential info only
- No emojis (some phones don't display)
- One key message per SMS

**Verbal (Phone Scripts):**
- Include pause markers: [PAUSE]
- Empathy cues: [EMPATHY] [GENTLE TONE] [WARM TONE]
- Verbal scripts are for NURSES/DOCTORS reading aloud
- Natural speech patterns ("I know you must be worried..." not "You may experience anxiety")
- Allow for patient questions: "Do you have any questions?" "[WAIT]"

---

## PERSONALIZATION VARIABLES (use {{ }} syntax):

**Patient Info:**
- {{patient_name}} - Patient's first name
- {{patient_age}} - Age in years
- {{partner_name}} - Partner's name

**Clinical Values:**
- {{follicle_count}} - Number of follicles
- {{e2_level}} - Estradiol level (pg/mL)
- {{lining_thickness}} - Endometrial lining (mm)
- {{lining_pattern}} - trilaminar/bilaminar/homogeneous
- {{amh_value}} - AMH test result (ng/mL)
- {{fsh_value}} - FSH level
- {{beta_value}} - hCG level (mIU/mL)
- {{embryo_grade}} - Embryo quality (5AA, 4BB, etc.)
- {{fertilization_rate}} - Percentage fertilized
- {{mature_eggs}} - Number of MII eggs
- {{total_eggs}} - Total eggs retrieved

**Medications:**
- {{medication}} - Medication name
- {{dose}} - Dosage amount
- {{route}} - Administration route (oral/injection/vaginal)

**Dates/Timeline:**
- {{cycle_day}} - Day of menstrual cycle
- {{transfer_date}} - Embryo transfer date
- {{beta_date}} - Beta hCG test date
- {{next_scan_date}} - Next monitoring scan

**Staff:**
- {{doctor_name}} - Doctor's name
- {{nurse_name}} - Nurse's name
- {{clinic_phone}} - Clinic phone number

---

## EXAMPLE TEMPLATES (for reference):

### Example 1: Positive Beta Result
```json
{
  "eventName": "Positive Beta Result",
  "channel": "whatsapp",
  "language": "english",
  "greeting": "{{patient_name}} - CONGRATULATIONS! 🎉👶💕",
  "context": "Your beta hCG test is POSITIVE - you're pregnant!",
  "explanation": "hCG level: {{beta_value}} mIU/mL (Positive = >5, yours is STRONG!). This confirms the embryo implanted successfully in your uterus! At {{days_post_transfer}} days post-transfer, this is an excellent number.",
  "next_steps": "Repeat beta in 48 hours ({{next_beta_date}}) - should roughly double. Continue ALL medications exactly as prescribed (especially progesterone - critical!). First ultrasound at 6 weeks to confirm heartbeat.",
  "reassurance": "This is REAL! Early pregnancy is fragile - some light spotting normal, but report heavy bleeding immediately. Most IVF pregnancies with strong initial betas progress to healthy babies! 💚",
  "call_to_action": "CELEBRATE but stay cautious! Keep taking meds religiously. Come for repeat beta {{next_beta_date}}. Any bleeding/severe cramping? Call us immediately!",
  "contact_info": "Dr. {{doctor_name}} | Emergency: {{clinic_phone}}"
}
```

### Example 2: Negative Beta Result (Verbal - requires sensitivity)
```json
{
  "eventName": "Negative Beta Result",
  "channel": "verbal",
  "language": "english",
  "greeting": "{{patient_name}}, it's Dr. {{doctor_name}}. Do you have a moment to talk?",
  "context": "[GENTLE TONE] I'm calling with your beta hCG results, and [PAUSE] I'm very sorry to tell you the test was negative.",
  "explanation": "Your hCG level was {{beta_value}}, which is below the threshold for pregnancy. [EMPATHY] This means the embryo did not implant, or implanted but didn't continue developing. I know this isn't the news you were hoping for, and I'm truly sorry.",
  "next_steps": "[CLEAR] You can stop taking progesterone and other medications now. Your period should start within 7-10 days. [PAUSE] When it does, call us on Day 1 if you want to discuss trying again. There's no required waiting period medically.",
  "reassurance": "[EMPATHY] I know this is devastating - you've invested so much emotionally, physically, financially. [PAUSE] But please don't lose hope. The fact that we got good quality embryos means your body CAN produce viable embryos. Many patients succeed on the second or third transfer. This doesn't mean it won't work - it just didn't work THIS time.",
  "call_to_action": "Take time to grieve. This is a real loss. [GENTLE TONE] When you're ready, we can schedule a follow-up to discuss what might improve next cycle - different protocol, PGT-A testing, ERA test, immune therapy. No pressure. [WAIT] Do you have questions now?",
  "contact_info": "[EMPATHY] I'm here for you. Call me anytime at {{clinic_phone}}."
}
```

### Example 3: Hinglish WhatsApp (shows code-switching)
```json
{
  "eventName": "Monitoring Scan Day 5",
  "channel": "whatsapp",
  "language": "hinglish",
  "greeting": "Hi {{patient_name}}! 👋",
  "context": "Aapka Day 5 scan complete ho gaya.",
  "explanation": "Aapke {{follicle_count}} follicles grow ho rahe hain. Lead follicle {{lead_size}}mm ka hai. Estrogen (E2) level {{e2_level}} pg/mL hai - ye achha response hai! Medications ka effect dikh raha hai properly.",
  "next_steps": "Same dose continue karo - {{medication}} {{dose}} roz. Next scan Day 7 pe hoga ({{next_scan_date}}). Agar koi side effects ho toh turant batana.",
  "reassurance": "Sab kuch theek chal raha hai! Follicles perfectly grow kar rahe hain. Aap bilkul sahi track pe ho! 💪",
  "call_to_action": "Injections time pe lena mat bhoolna. Questions hai toh WhatsApp karo anytime!",
  "contact_info": "Dr. {{doctor_name}} | {{clinic_phone}}"
}
```

---

## EVENTS TO GENERATE (Choose one category at a time):

### PGT-A Pathway (25 templates needed):
1. "PGT-A Consultation and Decision Making" - 3 variants (WA EN, WA HI, Verbal EN)
2. "Embryo Biopsy Day 5 Procedure" - 2 variants (WA EN, Verbal EN)
3. "PGT-A Results - All Normal Embryos" - 3 variants
4. "PGT-A Results - All Abnormal Embryos" - 3 variants (very sensitive!)
5. "PGT-A Results - Mixed Normal/Abnormal" - 2 variants
6. "Mosaic Embryo Discussion" - 2 variants
7. "Sex Selection Ethics and Legality" - 2 variants
8. "Single Euploid Transfer Strategy" - 2 variants
9. "No Euploid Embryos - Next Steps" - 3 variants (sensitive!)
10. "PGT-A Cost-Benefit Analysis" - 3 variants

### Complications (30 templates needed):
1. "Severe OHSS - Hospitalization Required" - 3 variants
2. "OHSS Resolution Timeline and Care" - 2 variants
3. "Empty Follicle Syndrome" - 3 variants (devastating news)
4. "Total Fertilization Failure - Zero Embryos" - 3 variants (very sensitive!)
5. "Embryo Arrest at Day 3" - 2 variants
6. "No Blastocysts Formed" - 3 variants (sensitive!)
7. "Vanishing Twin Syndrome" - 3 variants
8. "Ectopic Pregnancy Suspected" - 3 variants (emergency!)
9. "Biochemical Pregnancy Explanation" - 2 variants
10. "Blighted Ovum Diagnosis" - 2 variants
11. "Miscarriage Management Options" - 3 variants (very sensitive!)
12. "Recurrent Implantation Failure Investigation" - 3 variants

### Counseling/Emotional Support (25 templates):
1. "First Consultation Anxiety Management" - 3 variants
2. "Financial Stress Counseling" - 3 variants
3. "Relationship Strain Support" - 3 variants
4. "Family Pressure Coping Strategies" - 3 variants
5. "Two Week Wait Anxiety Management" - 3 variants
6. "Post-Negative Beta Grief Support" - 3 variants (very important!)
7. "Pregnancy After Loss Anxiety" - 2 variants
8. "Donor Conception Emotional Acceptance" - 3 variants
9. "When to Stop Treatment Discussion" - 2 variants (sensitive!)

### Administrative/Process (20 templates):
1. "Financial Counseling Initial Consult" - 2 variants
2. "Insurance Coverage Verification" - 2 variants
3. "Payment Plan Options Explanation" - 2 variants
4. "Medication Ordering and Delivery Instructions" - 3 variants
5. "Monitoring Appointment Reminder" - 2 variants
6. "Lab Results Ready for Pickup" - 1 variant
7. "Prescription Renewal Needed" - 2 variants
8. "Medical Records Request Process" - 1 variant
9. "Second Opinion Coordination" - 2 variants
10. "Clinic Transfer Care Instructions" - 2 variants
11. "Missed Appointment Follow-up" - 1 variant

---

## OUTPUT FORMAT:

Generate templates as valid JSON array. Example:

```json
[
  {
    "eventName": "Event Name Here",
    "channel": "whatsapp",
    "language": "english",
    "greeting": "...",
    "context": "...",
    "explanation": "...",
    "next_steps": "...",
    "reassurance": "...",
    "call_to_action": "...",
    "contact_info": "Dr. {{doctor_name}} | {{clinic_phone}}"
  },
  {
    "eventName": "Event Name Here",
    "channel": "verbal",
    "language": "english",
    "greeting": "...",
    ...
  }
]
```

**IMPORTANT:**
- Output ONLY valid JSON - no markdown code blocks, no explanations
- Each template must have ALL 7 components
- Use exact event names from list above
- Mix channels (WhatsApp, SMS, Verbal) and languages (English, Hinglish)
- For sensitive topics (negative results, losses), prioritize Verbal channel with empathy markers

---

## GENERATION INSTRUCTIONS:

**Start by saying:** "I'll generate [X] templates for [Category Name]. I'll ensure medical accuracy, empathetic tone, and cultural sensitivity."

**Then output the JSON array directly.**

Ready? Pick one category from above and generate all its templates!
