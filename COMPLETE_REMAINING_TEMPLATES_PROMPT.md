# Complete Remaining Templates Generation Prompt

**Copy this entire prompt into Groq/Claude/ChatGPT to generate ALL remaining 620 templates**

---

You are an expert IVF clinic communication specialist. Generate **620 message templates** across all remaining categories.

## YOUR TASK

Generate templates for Indian IVF clinics with:
- ✅ Medical accuracy (IVF protocols, terminology, success rates)
- 💚 Empathy (especially for sensitive news)
- 🇮🇳 Cultural sensitivity (Indian context, Hinglish)
- 📱 Multi-channel (WhatsApp, SMS, Verbal scripts)

---

## TEMPLATE STRUCTURE (ALL 7 COMPONENTS REQUIRED)

```json
{
  "eventName": "Exact event name from list below",
  "channel": "whatsapp" | "sms" | "verbal",
  "language": "english" | "hinglish",
  "greeting": "Personalized opening with {{patient_name}}",
  "context": "Current situation summary",
  "explanation": "Medical details with IVF terminology",
  "next_steps": "Clear actionable instructions",
  "reassurance": "Emotional support without false hope",
  "call_to_action": "Immediate action required",
  "contact_info": "Dr. {{doctor_name}} | {{clinic_phone}}"
}
```

---

## PERSONALIZATION VARIABLES

Use `{{variable_name}}` syntax:

**Patient**: {{patient_name}}, {{patient_age}}, {{partner_name}}  
**Clinical**: {{follicle_count}}, {{e2_level}}, {{lining_thickness}}, {{amh_value}}, {{beta_value}}, {{embryo_grade}}, {{fertilization_rate}}, {{mature_eggs}}, {{total_eggs}}  
**Medications**: {{medication}}, {{dose}}, {{route}}  
**Dates**: {{cycle_day}}, {{transfer_date}}, {{beta_date}}, {{next_scan_date}}  
**Staff**: {{doctor_name}}, {{nurse_name}}, {{clinic_phone}}

---

## CRITICAL REQUIREMENTS

### Medical Accuracy ✅
- **2PN** = normal fertilization, **MII** = mature egg
- **Trigger shot**: 34-40 hours before retrieval/IUI
- **Beta test**: 14 days post-transfer (not 7)
- **Success rates**: IVF 40-60% (age-dependent), IUI 10-20%, PGT-A improves 10-15%
- **Medications**: Gonal-F, Menopur, Lupron, Ovidrel, Crinone, Endometrin

### Emotional Intelligence 💚
- **Verbal scripts** for sensitive news: [PAUSE], [EMPATHY], [GENTLE TONE]
- Celebratory but cautious for positives ("Early pregnancy is fragile")
- Acknowledge grief without false hope ("Many succeed on 2nd/3rd attempt")

### Cultural Sensitivity 🇮🇳
- Financial stress (₹1.5-2L per IVF cycle)
- Family pressure ("Khush khabri kab sunaoge?")
- Hinglish code-switching ("Aapka beta positive hai! You're pregnant!")

### Channel Formatting
- **WhatsApp**: Conversational, emojis (📊💚🎉👶), short paragraphs
- **SMS**: <160 chars ideal, essential info only, no emojis
- **Verbal**: Phone scripts with [PAUSE], [EMPATHY], natural speech

---

## ALL REMAINING TEMPLATES TO GENERATE (620 total)

### 1. PGT-A Pathway (22 remaining)

**Already completed (3)**: All Normal Embryos (WA), All Abnormal Embryos (Verbal), Cost-Benefit (WA Hinglish)

**Generate these 22:**

1. **PGT-A Consultation and Decision Making** (2 variants)
   - WhatsApp Hinglish: Explain what PGT-A is, who benefits (age 35+, recurrent miscarriage), cost ₹15-20k/embryo
   - Verbal English: Detailed consultation script with pros/cons

2. **Embryo Biopsy Day 5 Procedure** (2 variants)
   - WhatsApp English: What to expect, embryologist will remove 5-7 cells, embryos frozen while testing
   - Verbal English: Pre-procedure explanation with timing (Day 5/6 blastocyst stage)

3. **PGT-A Results - All Normal Embryos** (2 more variants)
   - Verbal English: Celebratory call script with [WARM TONE]
   - WhatsApp Hinglish: "Sabhi {{embryo_count}} embryos NORMAL hain! 🎉"

4. **PGT-A Results - All Abnormal Embryos** (2 more variants)
   - WhatsApp English: Gentle message offering follow-up consult
   - Hinglish Verbal: Sensitive script with cultural reassurance

5. **PGT-A Results - Mixed Normal/Abnormal** (2 variants)
   - WhatsApp English: "Good news: {{normal_count}} normal embryos out of {{total_count}}"
   - Verbal English: Explain which to transfer first (best grade normal)

6. **Mosaic Embryo Discussion** (2 variants)
   - WhatsApp English: Explain mosaicism (mix of normal/abnormal cells), 30-40% success if transferred
   - Verbal English: Decision-making script - transfer vs discard vs donate to research

7. **Sex Selection Ethics and Legality** (2 variants)
   - Verbal English: India law prohibits sex selection, PGT-A reports don't reveal sex, legal consequences
   - WhatsApp English: Gentle reminder of PCPNDT Act, clinic policy

8. **Single Euploid Transfer Strategy** (2 variants)
   - WhatsApp English: Why transfer one at a time (avoid twins, maximize each embryo's chance)
   - Verbal English: Discuss timeline if first fails

9. **No Euploid Embryos - Next Steps** (2 variants)
   - Verbal English: Devastating news script [EMPATHY], options: repeat cycle with different protocol, donor eggs
   - WhatsApp English: Follow-up after verbal call, schedule consult

10. **PGT-A Cost-Benefit Analysis** (2 more variants)
    - SMS English: "PGT-A testing ₹15-20k/embryo. Reduces miscarriage risk, increases success. Call to discuss."
    - Verbal English: Detailed financial counseling comparing cumulative costs with/without PGT-A

---

### 2. Complications (26 remaining)

**Already completed (4)**: Severe OHSS (Verbal), Total Fertilization Failure (Verbal), Empty Follicle (WA Hinglish), Ectopic Pregnancy (Verbal)

**Generate these 26:**

1. **Severe OHSS - Hospitalization Required** (2 more variants)
   - WhatsApp English: Pre-admission checklist, what to pack, duration 2-4 days
   - SMS Hinglish: "URGENT: Hospital admission needed for OHSS. Dr calling soon."

2. **OHSS Resolution Timeline and Care** (2 variants)
   - WhatsApp English: Day-by-day recovery expectations, when symptoms improve, fluid intake goals
   - Verbal English: Post-discharge instructions, when to return to ER

3. **Empty Follicle Syndrome** (2 more variants)
   - Verbal English: Explaining rare occurrence (1-2%), likely trigger injection issue, plan for next cycle
   - SMS English: "Retrieval complete. Dr needs to discuss findings. Please call."

4. **Total Fertilization Failure - Zero Embryos** (2 more variants)
   - WhatsApp English: Follow-up after verbal call, offer counseling session
   - WhatsApp Hinglish: Gentle message with hope for next cycle

5. **Embryo Arrest at Day 3** (2 variants)
   - WhatsApp English: Explain embryos stopped dividing Day 3, won't reach blastocyst, cycle cancelled
   - Verbal English: Sensitive call [EMPATHY], discuss egg/sperm quality testing

6. **No Blastocysts Formed** (2 variants)
   - Verbal English: All embryos arrested before Day 5, devastating news script
   - WhatsApp English: Follow-up offering lab review meeting

7. **Vanishing Twin Syndrome** (3 variants)
   - WhatsApp English: "One twin stopped developing. Other twin healthy with heartbeat {{heartbeat_bpm}} bpm."
   - Verbal English: Sensitive script, common in IVF (20-30%), surviving twin usually fine
   - WhatsApp Hinglish: Reassurance that remaining baby is strong

8. **Ectopic Pregnancy Suspected** (2 more variants)
   - WhatsApp English: Post-treatment follow-up, Methotrexate side effects, when to retest hCG
   - SMS English: "Urgent: Ectopic suspected. Come to clinic NOW. Do not eat/drink."

9. **Biochemical Pregnancy Explanation** (2 variants)
   - WhatsApp English: Beta was positive but dropped, early miscarriage before ultrasound could see
   - Verbal English: Explain it's a positive sign (implantation happened), 50% succeed next transfer

10. **Blighted Ovum Diagnosis** (2 variants)
    - Verbal English: [GENTLE] Gestational sac empty, no embryo developed, options: wait/medication/D&C
    - WhatsApp English: Follow-up after consult, scheduling D&C or monitoring

11. **Miscarriage Management Options** (3 variants)
    - Verbal English: Detailed script explaining 3 options - expectant, medical, surgical
    - WhatsApp English: Decision aid with pros/cons of each option
    - WhatsApp Hinglish: Sensitive message offering support, "Hum aapke saath hain"

12. **Recurrent Implantation Failure Investigation** (3 variants)
    - WhatsApp English: After 3 failed transfers, testing plan - ERA, hysteroscopy, immune panel
    - Verbal English: Consultation script explaining each test, costs ₹50-80k
    - WhatsApp Hinglish: "3 transfers fail huye. Hum investigate karenge kyu."

---

### 3. Counseling/Emotional Support (21 remaining)

**Already completed (4)**: TWW Anxiety (WA Hinglish), Post-Negative Grief (Verbal), Family Pressure (WA Hinglish), Stop Treatment (Verbal)

**Generate these 21:**

1. **First Consultation Anxiety Management** (3 variants)
   - WhatsApp English: Pre-consultation prep, what to bring, questions to ask
   - Verbal English: Phone intake screening anxiety levels, offer counselor connect
   - WhatsApp Hinglish: "Pehli baar aa rahe ho? Tension mat lo, hum guide karenge."

2. **Financial Stress Counseling** (2 more variants)
   - WhatsApp English: EMI options, 0% interest medical loans, budget-friendly protocols
   - WhatsApp Hinglish: "Paisa ki chinta? Humse baat karo. Payment plans available."

3. **Relationship Strain Support** (3 variants)
   - Verbal English: Couples counseling script, IVF stress on marriage, intimacy issues
   - WhatsApp English: Resources for partners, support groups for couples
   - WhatsApp Hinglish: "Treatment mein partner ka support bohot zaroori hai."

4. **Family Pressure Coping Strategies** (2 more variants)
   - Verbal English: Counselor script on setting boundaries with in-laws
   - SMS English: "Struggling with family pressure? Counselor available. Call to book."

5. **Two Week Wait Anxiety Management** (2 more variants)
   - Verbal English: Counselor check-in call mid-TWW, symptom-spotting discussion
   - SMS Hinglish: "TWW mein ho? Ghar pe test mat karo. Beta test {{beta_date}} ko."

6. **Post-Negative Beta Grief Support** (2 more variants)
   - WhatsApp English: Week-after check-in, support group invitation, online resources
   - WhatsApp Hinglish: "Ek hafta ho gaya. Kaise feel kar rahe ho? Counselor se baat karein?"

7. **Pregnancy After Loss Anxiety** (2 variants)
   - Verbal English: First trimester anxiety management after previous miscarriage
   - WhatsApp English: Weekly reassurance messages, milestone celebrations (8 weeks, 12 weeks)

8. **Donor Conception Emotional Acceptance** (3 variants)
   - Verbal English: Initial donor discussion script, grief of genetic link loss
   - WhatsApp English: Donor selection process, success rates 60-70%, feel like "real parent"
   - WhatsApp Hinglish: "Donor egg se bhi aap hi maa banogi. Genetic link se zyada important hai carry karna."

9. **When to Stop Treatment Discussion** (1 more variant)
   - WhatsApp English: Follow-up after verbal consult, resources for child-free living, adoption info

---

### 4. Administrative/Process (17 remaining)

**Already completed (3)**: Financial Stress (Verbal), Medication Ordering (WA), Appointment Reminder (SMS Hinglish)

**Generate these 17:**

1. **Financial Counseling Initial Consult** (1 more variant)
   - WhatsApp English: Welcome message with cost breakdown PDF, insurance verification steps

2. **Insurance Coverage Verification** (2 variants)
   - WhatsApp English: Which insurers cover IVF (usually none in India), TPA process
   - SMS English: "Insurance verified. Coverage: ₹{{amount}}. Balance ₹{{balance}} due by {{date}}."

3. **Payment Plan Options Explanation** (2 variants)
   - WhatsApp English: EMI calculator, 6/9/12 month options, credit requirements
   - Verbal English: Finance manager script explaining interest rates, approval process

4. **Medication Ordering and Delivery Instructions** (2 more variants)
   - SMS English: "Meds needed: {{medication}} {{dose}}. Order now for Day 2 start."
   - WhatsApp Hinglish: "Injections mangwao. Cold chain hai - fridge mein rakhna (freezer NAHI)."

5. **Monitoring Appointment Reminder** (1 more variant)
   - WhatsApp English: "Scan tomorrow {{time}}. Come with full bladder. Bring injection log."

6. **Lab Results Ready for Pickup** (1 variant)
   - SMS English: "Lab reports ready. Pickup Mon-Sat 9am-6pm. Bring ID."

7. **Prescription Renewal Needed** (2 variants)
   - WhatsApp English: "Progesterone running low? We'll send refill prescription. WhatsApp your pharmacy."
   - SMS Hinglish: "Davai khatam? Renewal ke liye clinic call karo."

8. **Medical Records Request Process** (1 variant)
   - WhatsApp English: How to request records (form + ID + ₹500 fee), 7-day processing

9. **Second Opinion Coordination** (2 variants)
   - WhatsApp English: "We support second opinions! Records transfer process explained."
   - Verbal English: Doctor script encouraging informed decisions, no judgment

10. **Clinic Transfer Care Instructions** (2 variants)
    - WhatsApp English: Moving to another city? How to transfer frozen embryos, paperwork needed
    - Verbal English: Exit counseling script, well-wishes, door always open

11. **Missed Appointment Follow-up** (1 variant)
    - SMS Hinglish: "Aaj ka appointment miss ho gaya. Reschedule ke liye reply 'YES'."

---

### 5. EXPANDED PATHWAYS (534 templates)

Now generate **expanded variants** for all existing complete pathways:

#### 5A. Core IVF Events - EXPANDED (72 new templates)

**Already have**: 18 core templates (monitoring, fertilization, beta, OHSS, cancellation, heartbeat)

**Generate 72 MORE variants:**

1. **Monitoring Scan Series** (15 templates)
   - Day 3 Baseline (WA EN, WA HI, Verbal EN)
   - Day 5 Scan (WA EN, WA HI, SMS EN) - "{{follicle_count}} follicles growing well"
   - Day 8 Scan (WA EN, WA HI, Verbal EN) - Follicle sizes, E2 levels
   - Day 10 Pre-Trigger (WA EN, SMS HI, Verbal EN) - Almost ready, trigger likely in 1-2 days
   - Trigger Shot Instructions (WA EN, WA HI, SMS EN) - CRITICAL timing 34-40 hours before retrieval

2. **Fertilization Reports** (12 templates)
   - Day 1 Fertilization Report (WA EN, WA HI, Verbal EN) - "{{fertilized_count}} out of {{mature_eggs}} fertilized normally (2PN)"
   - Day 3 Embryo Update (WA EN, WA HI, SMS EN) - Embryo grades, cell counts (6-8 cells ideal)
   - Day 5 Blastocyst Report (WA EN, WA HI, Verbal EN) - Blastocyst grading (5AA, 4BB, etc.), which to transfer
   - Poor Fertilization (WA EN, Verbal EN, WA HI) - Less than 50% fertilized, discuss ICSI quality

3. **Beta hCG Results** (12 templates)
   - Positive Beta - Low hCG (Verbal EN, WA EN, WA HI) - Positive but below expected, cautious optimism
   - Positive Beta - High hCG (WA EN, WA HI, SMS EN) - Possible twins! "Beta {{beta_value}} - VERY strong!"
   - Negative Beta - Low-Responder Patient (Verbal EN, WA HI) - Extra sensitive, discuss donor eggs
   - Repeat Beta - Good Doubling (WA EN, WA HI, SMS EN) - "Beta doubled perfectly! {{first_beta}} → {{second_beta}}"
   - Repeat Beta - Slow Rise (Verbal EN, WA EN) - Rising but not doubling, possible ectopic/miscarriage

4. **OHSS Prevention & Early Stages** (9 templates)
   - OHSS Risk Warning (WA EN, WA HI, SMS EN) - High E2, many follicles, cancel/freeze all discussion
   - Mild OHSS Home Care (WA EN, WA HI, Verbal EN) - Fluid intake, protein, when to call
   - Moderate OHSS Monitoring (WA EN, Verbal EN, SMS HI) - Daily weight, urine output tracking

5. **Cycle Cancellation Reasons** (12 templates)
   - Low Response Cancellation (Verbal EN, WA EN, WA HI) - Less than 3 follicles, waste of money to continue
   - High OHSS Risk Cancellation (Verbal EN, WA EN, WA HI) - E2 >5000, safety first
   - Lead Follicle Too Advanced (WA EN, Verbal EN) - One follicle too big, others too small
   - Luteinized Unruptured Follicle (Verbal EN, WA HI) - Progesterone rose early, cycle cancelled

6. **Heartbeat Ultrasound** (12 templates)
   - First Heartbeat Detected (WA EN, WA HI, Verbal EN) - 6 weeks, {{heartbeat_bpm}} bpm, CELEBRATE!
   - Twin Heartbeats (WA EN, WA HI, Verbal EN) - Two heartbeats, identical vs fraternal
   - No Heartbeat at 6 Weeks (Verbal EN, WA EN) - [GENTLE] May be too early, repeat in 5 days
   - Strong Heartbeat 8 Weeks (WA EN, SMS HI) - Graduation from fertility clinic! OB referral

---

#### 5B. FET Pathway - EXPANDED (72 new templates)

**Already have**: 18 FET templates (lining checks, progesterone, thaw, ERA)

**Generate 72 MORE variants:**

1. **Lining Check Series** (18 templates)
   - Day 8 Lining Check (WA EN, WA HI, Verbal EN) - Target 7mm+, trilaminar pattern
   - Day 10 Lining Check (WA EN, WA HI, SMS EN) - {{lining_thickness}}mm, ready for transfer?
   - Day 12 Final Lining (WA EN, WA HI, Verbal EN) - Perfect {{lining_thickness}}mm, transfer scheduled!
   - Thin Lining Problem (Verbal EN, WA EN, WA HI) - Less than 6mm, options: wait/cancel/ERA test
   - Thick Lining >15mm (Verbal EN, WA EN) - Rule out polyp/hyperplasia, may need biopsy
   - Homogeneous Lining (Verbal EN, WA HI) - Not ideal pattern, but transfer possible if >8mm

2. **Progesterone Protocol Instructions** (12 templates)
   - Crinone Gel Instructions (WA EN, WA HI, SMS EN) - Vaginal gel, white discharge normal
   - Endometrin Tablet Instructions (WA EN, WA HI) - Insert vaginally 3x/day, use pad
   - Progesterone Injection Instructions (WA EN, Verbal EN, WA HI) - IM injection technique, rotate sites
   - Combined Progesterone Protocol (WA EN, WA HI) - Injection + vaginal, both critical!

3. **Embryo Thaw Outcomes** (15 templates)
   - Perfect Thaw Survival (WA EN, WA HI, SMS EN) - "Embryo thawed perfectly! 100% intact. Transfer in 2 hours."
   - Partial Survival Thaw (WA EN, Verbal EN) - Some cells damaged but embryo re-expanding
   - Complete Thaw Failure (Verbal EN, WA EN, WA HI) - [EMPATHY] Embryo did not survive thaw (10% risk)
   - Hatching Blastocyst Thaw (WA EN, SMS HI) - Embryo hatching from shell - excellent sign!
   - Multiple Embryo Thaw (Verbal EN, WA EN) - Thawed 2 embryos, will transfer best quality one

4. **ERA Testing** (9 templates)
   - ERA Test Explained (WA EN, Verbal EN, WA HI) - Endometrial receptivity, timing test, costs ₹30-40k
   - ERA Biopsy Day (WA EN, SMS EN) - Similar to Pap smear, mild cramp, results in 10 days
   - ERA Results - Receptive (WA EN, WA HI, SMS EN) - Perfect timing! Transfer on progesterone Day 5
   - ERA Results - Pre-Receptive (Verbal EN, WA EN) - Need 24h more progesterone before transfer
   - ERA Results - Post-Receptive (Verbal EN, WA EN) - Transfer 24h earlier than standard

5. **Transfer Day Experience** (18 templates)
   - Pre-Transfer Instructions (WA EN, WA HI, SMS EN) - Full bladder, arrive 30 min early, bring partner
   - Transfer Procedure Done (WA EN, WA HI, Verbal EN) - "Embryo placed perfectly! Saw white flash on ultrasound."
   - Post-Transfer Rest (WA EN, SMS HI) - Bed rest 30 min, then normal activity (not strict bed rest!)
   - Post-Transfer Bleeding (WA EN, Verbal EN) - Light spotting from catheter normal, heavy = call
   - Post-Transfer Cramping (WA EN, WA HI) - Mild cramping normal, severe = call immediately
   - Difficult Transfer (Verbal EN, WA EN) - Catheter had to be repositioned, still successful

---

#### 5C. Egg Freezing - EXPANDED (60 new templates)

**Already have**: 15 egg freezing templates (consultation, AMH, retrieval, thaw cycles)

**Generate 60 MORE variants:**

1. **Age-Based Counseling** (15 templates)
   - Age 25-30 Freezing (WA EN, Verbal EN, WA HI) - Ideal age, excellent quality expected
   - Age 31-35 Freezing (WA EN, Verbal EN, WA HI) - Good age, aim for 15-20 eggs total
   - Age 36-38 Freezing (Verbal EN, WA EN, WA HI) - May need 2 cycles, quality declining
   - Age 39-42 Freezing (Verbal EN, WA EN, WA HI) - Realistic expectations, PGT-A recommended
   - Age 43+ Freezing (Verbal EN, WA EN) - Very low success, consider donor eggs instead

2. **AMH-Based Predictions** (12 templates)
   - High AMH >3 (WA EN, WA HI, SMS EN) - Excellent reserve! Expect 15-20 eggs
   - Normal AMH 1.5-3 (WA EN, WA HI) - Good reserve, 8-12 eggs likely
   - Low AMH 0.5-1.5 (WA EN, Verbal EN) - Diminished reserve, may need 2 cycles
   - Very Low AMH <0.5 (Verbal EN, WA EN) - Poor prognosis, consider freezing embryos with partner/donor sperm
   - High AMH + PCOS (WA EN, Verbal EN, WA HI) - Risk OHSS, gentle stimulation protocol

3. **Retrieval Outcomes** (15 templates)
   - Excellent Retrieval 15-20 eggs (WA EN, WA HI, SMS EN) - "Amazing result! {{total_eggs}} eggs frozen."
   - Good Retrieval 10-14 eggs (WA EN, WA HI) - Solid banking, may consider second cycle in future
   - Fair Retrieval 5-9 eggs (WA EN, Verbal EN) - Decent but recommend second cycle
   - Poor Retrieval 1-4 eggs (Verbal EN, WA EN, WA HI) - [EMPATHY] Lower than expected, discuss next steps
   - Maturity Breakdown (WA EN, WA HI) - "{{mature_eggs}} MII (mature) out of {{total_eggs}}. Only MII frozen."

4. **Usage Planning** (9 templates)
   - Annual Storage Renewal (WA EN, SMS EN) - "Egg storage renewal due. ₹10k/year. Renew by {{date}}."
   - Moving Eggs to IVF (WA EN, Verbal EN, WA HI) - Ready to use? Thaw-fertilization process explained
   - Partner Selection (Verbal EN, WA EN) - Have partner now? Thaw eggs, fertilize, transfer fresh
   - Donor Sperm with Frozen Eggs (Verbal EN, WA EN, WA HI) - Single woman/lesbian couple using frozen eggs

5. **Thaw Cycles for Frozen Eggs** (9 templates)
   - Egg Thaw Survival Rate (WA EN, Verbal EN) - "{{survived_eggs}} out of {{thawed_eggs}} survived ({{survival_rate}}%)"
   - Post-Thaw Fertilization (WA EN, WA HI) - Fertilized with {{partner_name}}'s sperm via ICSI
   - Thaw-Fertilization-Transfer Timeline (WA EN, Verbal EN) - 5-6 day process from thaw to transfer
   - Embryo Outcome from Frozen Eggs (WA EN, WA HI, SMS EN) - "Made {{blastocyst_count}} blastocysts!"

---

#### 5D. Donor Cycles - EXPANDED (60 new templates)

**Already have**: 15 donor templates (introduction, selection, fresh/frozen, legal, LGBTQ+)

**Generate 60 MORE variants:**

1. **Egg Donor Selection** (18 templates)
   - Donor Database Access (WA EN, Verbal EN, WA HI) - How to browse donors, photos, education, family history
   - Donor Matching Service (WA EN, Verbal EN) - We'll match based on your features, blood type, education
   - Fresh Donor Cycle (Verbal EN, WA EN, WA HI) - Timeline 2-3 months, sync your cycle with donor
   - Frozen Donor Eggs (WA EN, WA HI, SMS EN) - Faster (1 month), guaranteed {{egg_count}} eggs
   - Known Donor - Sister/Friend (Verbal EN, WA EN, WA HI) - Legal requirements, psychological screening mandatory
   - International Donor (WA EN, Verbal EN) - Import frozen eggs from USA/Europe, costs ₹2-3L

2. **Sperm Donor Selection** (12 templates)
   - Sperm Donor Database (WA EN, Verbal EN, WA HI) - Browse by education, ethnicity, height, eye color
   - Fresh vs Frozen Sperm (WA EN, SMS EN) - Frozen tested for 6 months (STD quarantine), equally effective
   - Known Sperm Donor (Verbal EN, WA EN) - Friend/relative, legal contract required, no parental rights
   - LGBT Couples - Sperm Selection (WA EN, Verbal EN, WA HI) - Two moms selecting sperm donor

3. **Embryo Donation** (9 templates)
   - Embryo Adoption Explained (Verbal EN, WA EN, WA HI) - Donated embryos from other couples, low cost ₹50k
   - Embryo Donor Anonymity (WA EN, Verbal EN) - Donor info limited, photos not available
   - Embryo Donation Success Rates (WA EN, WA HI, SMS EN) - Similar to own eggs IVF, 40-50%

4. **Surrogacy** (12 templates)
   - Altruistic Surrogacy Only (Verbal EN, WA EN, WA HI) - India law: only relative can be surrogate, no commercial
   - Surrogate Screening Process (WA EN, Verbal EN) - Medical, psychological, legal clearance needed
   - Synchronizing with Surrogate (WA EN, SMS HI) - Prep her lining while creating your embryos
   - Surrogate Pregnancy Updates (WA EN, WA HI) - Weekly updates during TWW, beta results

5. **Legal & Psychological** (9 templates)
   - Donor Anonymity Laws (Verbal EN, WA EN) - Donor identity never revealed, child cannot trace at 18
   - Parental Rights Contract (Verbal EN, WA EN) - Legal paperwork, both partners sign, donor relinquishes
   - Disclosure to Child (Verbal EN, WA EN, WA HI) - Should you tell child? Psychologist counseling
   - Grief of Genetic Link (Verbal EN, WA EN) - Mourning own genetics, accepting donor gametes

---

#### 5E. IUI Pathway - EXPANDED (60 new templates)

**Already have**: 20 IUI templates (consultation, cycle, tracking, trigger, procedure, TWW, beta)

**Generate 60 MORE variants:**

1. **IUI Candidacy** (12 templates)
   - IUI vs IVF Decision (WA EN, Verbal EN, WA HI) - When IUI appropriate: age <35, open tubes, normal sperm
   - Male Factor Mild (WA EN, Verbal EN) - Low count 10-15M, IUI can work with washing
   - Male Factor Severe (Verbal EN, WA EN) - Count <5M, recommend IVF with ICSI
   - Unexplained Infertility (WA EN, WA HI, Verbal EN) - Try 3-4 IUI before IVF
   - PCOS with IUI (WA EN, Verbal EN) - Letrozole stimulation safer than Gonal-F for PCOS

2. **Stimulation Protocols** (15 templates)
   - Natural Cycle IUI (WA EN, WA HI, Verbal EN) - No medications, monitor natural ovulation
   - Clomid IUI (WA EN, WA HI, SMS EN) - Oral pills Day 3-7, expect 1-2 follicles
   - Letrozole IUI (WA EN, WA HI) - Femara 2.5-5mg, thinner lining than Clomid
   - Gonadotropin IUI (WA EN, Verbal EN, WA HI) - Injectable FSH, more expensive but better control
   - Combination IUI (WA EN, Verbal EN) - Clomid + low-dose FSH for poor responders

3. **Follicle Monitoring** (15 templates)
   - Day 10 Scan - Too Small (WA EN, WA HI, Verbal EN) - Follicles only {{size}}mm, continue meds 2 more days
   - Day 12 Scan - Perfect (WA EN, WA HI, SMS EN) - "Lead follicle {{size}}mm! Trigger tonight!"
   - Day 14 Scan - Already Ovulated (WA EN, Verbal EN) - [EMPATHY] LH surge happened early, cycle cancelled
   - Multiple Follicles Risk (Verbal EN, WA EN, WA HI) - 4+ follicles, high risk twins/triplets, cancel?
   - Single Dominant Follicle (WA EN, SMS HI) - Ideal! One {{size}}mm follicle, low risk multiples

4. **Procedure Day** (9 templates)
   - Semen Collection Instructions (WA EN, SMS EN) - Abstinence 2-5 days, fresh sample day of IUI
   - Semen Analysis Results (WA EN, Verbal EN, WA HI) - Post-wash {{count}}M sperm, {{motility}}% motile
   - Poor Semen Sample Day-of (Verbal EN, WA EN) - [EMPATHY] Count low despite wash, IVF recommended
   - IUI Procedure Experience (WA EN, WA HI) - Painless, 5 min, catheter through cervix, mild cramp
   - Post-IUI Spotting (WA EN, SMS HI) - Light bleeding from catheter normal

5. **TWW and Results** (9 templates)
   - IUI Beta Positive (WA EN, WA HI, Verbal EN) - Success! {{beta_value}} hCG, continue progesterone
   - IUI Beta Negative - First Cycle (WA EN, Verbal EN, WA HI) - Try again? 15-20% success per cycle
   - IUI Beta Negative - Third Cycle (Verbal EN, WA EN) - Time to move to IVF? Cumulative IUI success plateaus after 3-4
   - IUI Twins Detected (WA EN, WA HI, Verbal EN) - Two gestational sacs! Fraternal twins from 2 eggs

---

#### 5F. Additional Specialized Topics (150 templates)

1. **Male Factor Infertility** (30 templates)
   - Azoospermia Diagnosis (Verbal EN, WA EN, WA HI) - No sperm in ejaculate, TESA/TESE options
   - Varicocele Treatment (WA EN, Verbal EN) - Surgery to improve sperm, 3-6 months recovery
   - Sperm DNA Fragmentation (WA EN, Verbal EN, WA HI) - High fragmentation, antioxidants/ICSI recommended
   - Low Morphology (WA EN, SMS EN) - Less than 4% normal shape, ICSI required
   - Retrograde Ejaculation (Verbal EN, WA EN) - Sperm in urine, collection techniques
   - Genetic Sperm Issues (Verbal EN, WA EN, WA HI) - Y chromosome deletion, donor sperm discussion

2. **Recurrent Pregnancy Loss** (30 templates)
   - RPL Investigation Panel (WA EN, Verbal EN, WA HI) - Thrombophilia, karyotype, uterine imaging
   - Antiphospholipid Syndrome (WA EN, Verbal EN) - Blood thinners during pregnancy, Lovenox/Aspirin
   - Balanced Translocation (Verbal EN, WA EN) - Genetic carrier, PGT-SR testing for embryos
   - Uterine Septum (WA EN, Verbal EN, WA HI) - Hysteroscopic surgery to remove septum
   - Asherman's Syndrome (Verbal EN, WA EN) - Uterine scarring, hysteroscopy + estrogen therapy
   - Immune Disorders (WA EN, Verbal EN) - NK cells, intralipid infusions (controversial)

3. **Advanced Maternal Age (AMA)** (30 templates)
   - Age 40-42 Counseling (Verbal EN, WA EN, WA HI) - Realistic expectations, 10-20% success per cycle
   - Age 43-45 Counseling (Verbal EN, WA EN) - <5% success own eggs, strong donor egg recommendation
   - Age 45+ Counseling (Verbal EN, WA EN) - Medical risks, pregnancy complications, donor eggs only
   - Low Reserve Protocols (WA EN, Verbal EN, WA HI) - High-dose FSH, DHEA supplements, double stim
   - Poor Embryo Quality (Verbal EN, WA EN) - Age-related chromosomal errors, PGT-A critical
   - Menopause Transition (Verbal EN, WA EN) - FSH >25, irregular periods, egg freezing urgent

4. **Endometriosis & Adenomyosis** (30 templates)
   - Endometriosis Impact on Fertility (WA EN, Verbal EN, WA HI) - Decreased reserve, inflammation
   - Laparoscopy Before IVF (Verbal EN, WA EN) - Surgery to remove endometriomas, 3 months healing
   - Lupron Depot for Endometriosis (WA EN, Verbal EN) - 3-month suppression before FET
   - Adenomyosis Diagnosis (Verbal EN, WA EN, WA HI) - Uterine thickening, lower implantation rates
   - GnRH Agonist Protocol (WA EN, Verbal EN) - 2-3 months suppression to shrink adenomyosis

5. **Polycystic Ovary Syndrome (PCOS)** (30 templates)
   - PCOS Diagnosis (WA EN, Verbal EN, WA HI) - Rotterdam criteria, insulin resistance
   - Metformin for PCOS (WA EN, SMS EN) - Improve insulin sensitivity, better egg quality
   - Inositol Supplements (WA EN, WA HI) - Myo-inositol 2g/day, improve ovulation
   - OHSS Risk PCOS (Verbal EN, WA EN) - High risk, freeze-all strategy
   - Letrozole vs Clomid PCOS (WA EN, Verbal EN) - Letrozole preferred, thinner lining with Clomid

---

## OUTPUT FORMAT

Generate ONE massive JSON array with all 620 templates:

```json
[
  {
    "eventName": "Event Name",
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
  ... (619 more templates)
]
```

**IMPORTANT:**
- Output ONLY valid JSON - no markdown code blocks, no explanations
- Each template must have ALL 7 components
- Use exact event names from lists above
- Mix channels (WhatsApp/SMS/Verbal) and languages (English/Hinglish)
- Sensitive topics = Verbal channel with [EMPATHY] markers

---

## GENERATION STRATEGY

**Recommended approach:**

1. **Generate in category batches** (easier to manage):
   - Generate PGT-A (22 templates)
   - Generate Complications (26 templates)
   - Generate Counseling (21 templates)
   - Generate Administrative (17 templates)
   - Generate Core Expanded (72 templates)
   - Generate FET Expanded (72 templates)
   - Generate Egg Freezing Expanded (60 templates)
   - Generate Donor Expanded (60 templates)
   - Generate IUI Expanded (60 templates)
   - Generate Specialized (150 templates)

2. **Save incrementally** - After each batch, save to separate JSON file

3. **Validate each batch** - Use jsonlint.com or `python3 -m json.tool`

4. **Combine at the end** - Merge all batches into one file

---

**TOTAL: 620 templates to generate**

Ready? Start with **PGT-A Pathway (22 templates)** first!
