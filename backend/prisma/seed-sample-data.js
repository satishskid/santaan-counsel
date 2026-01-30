import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding comprehensive sample patient data...');

  // Get demo clinic and users
  const clinic = await prisma.clinic.findUnique({ where: { domain: 'demo' } });
  const doctor = await prisma.user.findFirst({ where: { username: 'doctor1' } });

  if (!clinic || !doctor) {
    throw new Error('❌ Demo clinic or doctor not found. Run main seed first!');
  }

  console.log('✅ Found clinic and doctor');

  // Delete existing sample data to allow re-seeding
  await prisma.timelineEvent.deleteMany({
    where: { patient: { mrNumber: { startsWith: 'MR2026' } } }
  });
  await prisma.treatmentCycle.deleteMany({
    where: { patient: { mrNumber: { startsWith: 'MR2026' } } }
  });
  await prisma.patient.deleteMany({
    where: { mrNumber: { startsWith: 'MR2026' } }
  });
  console.log('✅ Cleaned up existing sample data');

  // Create diverse patient profiles
  const patients = await Promise.all([
    // Patient 1: Active IVF cycle - Day 10 stimulation
    prisma.patient.create({
      data: {
        clinicId: clinic.id,
        mrNumber: 'MR2026001',
        firstName: 'Priya',
        lastName: 'Sharma',
        age: 32,
        phone: '+91 98765 43210',
        email: 'priya.sharma@email.com',
        amh: 2.8,
        previousCycles: 0,
        visualLearner: true,
        baselineAnxiety: 7,
        currentAnxiety: 5,
      },
    }),
    
    // Patient 2: Fertilization day - awaiting embryo report
    prisma.patient.create({
      data: {
        clinicId: clinic.id,
        mrNumber: 'MR2026002',
        firstName: 'Sneha',
        lastName: 'Patel',
        age: 28,
        phone: '+91 98765 43211',
        email: 'sneha.patel@email.com',
        amh: 6.2,
        previousCycles: 0,
        baselineAnxiety: 7,
        currentAnxiety: 6,
        anxietyTriggers: ['OHSS risk'],
      },
    }),

    // Patient 3: Day 5 - embryo transfer prep
    prisma.patient.create({
      data: {
        clinicId: clinic.id,
        mrNumber: 'MR2026003',
        firstName: 'Anita',
        lastName: 'Desai',
        age: 35,
        phone: '+91 98765 43212',
        email: 'anita.desai@email.com',
        amh: 0.8,
        previousCycles: 2,
        baselineAnxiety: 9,
        currentAnxiety: 8,
        anxietyTriggers: ['egg count', 'previous failures'],
      },
    }),

    // Patient 4: Anxious patient - needs extra counseling
    prisma.patient.create({
      data: {
        clinicId: clinic.id,
        mrNumber: 'MR2026004',
        firstName: 'Kavita',
        lastName: 'Reddy',
        age: 30,
        phone: '+91 98765 43213',
        email: 'kavita.reddy@email.com',
        amh: 3.5,
        previousCycles: 1,
        visualLearner: true,
        baselineAnxiety: 9,
        currentAnxiety: 9,
        anxietyTriggers: ['miscarriage', 'failure', 'pregnancy loss'],
      },
    }),

    // Patient 5: FET cycle preparation
    prisma.patient.create({
      data: {
        clinicId: clinic.id,
        mrNumber: 'MR2026005',
        firstName: 'Meera',
        lastName: 'Singh',
        age: 33,
        phone: '+91 98765 43214',
        email: 'meera.singh@email.com',
        amh: 2.2,
        previousCycles: 1,
        baselineAnxiety: 4,
        currentAnxiety: 3,
      },
    }),
  ]);

  console.log(`✅ Created ${patients.length} sample patients`);

  // Create treatment cycles for each patient
  const cycle1 = await prisma.treatmentCycle.create({
    data: {
      patientId: patients[0].id,
      cycleNumber: 1,
      protocol: 'Antagonist',
      startDate: new Date('2026-01-20'),
      status: 'active',
      cycleDay: 10,
    },
  });

  const cycle2 = await prisma.treatmentCycle.create({
    data: {
      patientId: patients[1].id,
      cycleNumber: 1,
      protocol: 'Antagonist',
      startDate: new Date('2026-01-15'),
      status: 'active',
      cycleDay: 15,
    },
  });

  const cycle3 = await prisma.treatmentCycle.create({
    data: {
      patientId: patients[2].id,
      cycleNumber: 3,
      protocol: 'Long Agonist',
      startDate: new Date('2026-01-10'),
      status: 'active',
      cycleDay: 20,
    },
  });

  const cycle4 = await prisma.treatmentCycle.create({
    data: {
      patientId: patients[3].id,
      cycleNumber: 1,
      protocol: 'Mini-IVF',
      startDate: new Date('2026-01-25'),
      status: 'active',
      cycleDay: 5,
    },
  });

  const cycle5 = await prisma.treatmentCycle.create({
    data: {
      patientId: patients[4].id,
      cycleNumber: 2,
      protocol: 'FET - Hormone Replacement',
      startDate: new Date('2026-01-22'),
      status: 'active',
      cycleDay: 8,
    },
  });

  console.log('✅ Created treatment cycles');

  // Create comprehensive timeline events for Patient 1 (Priya - Day 10 stim)
  await prisma.timelineEvent.createMany({
    data: [
      {
        patientId: patients[0].id,
        cycleId: cycle1.id,
        eventType: 'initial_consultation',
        createdBy: doctor.id,
        staffRole: 'doctor',
        cycleDay: 0,
        clinicalData: { amh: 2.8, afc: 12, bmi: 23.5 },
        patientRecordText: 'AMH: 2.8 ng/mL (Anti-Müllerian Hormone), AFC: 12 follicles (Antral Follicle Count), BMI: 23.5',
        summaryText: 'Initial Consultation: AMH 2.8, AFC 12 - Good ovarian reserve',
        reactionData: { understanding: 'clear', emotional_response: 'hopeful', anxiety_before: 7, anxiety_after: 5 },
        eventDate: new Date('2026-01-20T10:00:00'),
      },
      {
        patientId: patients[0].id,
        cycleId: cycle1.id,
        eventType: 'baseline_scan',
        createdBy: doctor.id,
        staffRole: 'doctor',
        cycleDay: 2,
        clinicalData: { e2: 45, p4: 0.3, afc: 11 },
        patientRecordText: 'E2: 45 pg/mL (Estradiol), P4: 0.3 ng/mL (Progesterone), AFC: 11 follicles, Endometrium: 4mm',
        summaryText: 'Baseline Scan: E2 45, 11 follicles, ready to start',
        reactionData: { understanding: 'clear', emotional_response: 'excited', anxiety_before: 6, anxiety_after: 4 },
        eventDate: new Date('2026-01-22T09:30:00'),
      },
      {
        patientId: patients[0].id,
        cycleId: cycle1.id,
        eventType: 'medication_start',
        createdBy: doctor.id,
        staffRole: 'doctor',
        cycleDay: 3,
        clinicalData: { medication: 'FSH 150 IU', dosage: '150 IU daily' },
        patientRecordText: 'FSH (Follicle Stimulating Hormone): 150 IU daily, subcutaneous injection',
        summaryText: 'Medication started: FSH 150 IU daily',
        reactionData: { understanding: 'clear', emotional_response: 'calm', anxiety_before: 5, anxiety_after: 4, visual_helped: true },
        eventDate: new Date('2026-01-23T11:00:00'),
      },
      {
        patientId: patients[0].id,
        cycleId: cycle1.id,
        eventType: 'monitoring_scan_day5',
        createdBy: doctor.id,
        staffRole: 'doctor',
        cycleDay: 5,
        clinicalData: { e2: 280, p4: 0.5, lead_follicle: 10 },
        patientRecordText: 'E2: 280 pg/mL, P4: 0.5 ng/mL, 6 follicles 8-10mm range, Lead follicle: 10mm, Lining: 6mm',
        summaryText: 'Day 5 Scan: E2 280, 6 follicles growing well',
        reactionData: { understanding: 'clear', emotional_response: 'hopeful', anxiety_before: 6, anxiety_after: 5 },
        eventDate: new Date('2026-01-25T09:00:00'),
      },
      {
        patientId: patients[0].id,
        cycleId: cycle1.id,
        eventType: 'monitoring_scan_day7',
        createdBy: doctor.id,
        staffRole: 'doctor',
        cycleDay: 7,
        clinicalData: { e2: 520, p4: 0.6, lead_follicle: 14 },
        patientRecordText: 'E2: 520 pg/mL, P4: 0.6 ng/mL, 7 follicles 12-14mm, Lead: 14mm, Lining: 7mm trilaminar',
        summaryText: 'Day 7 Scan: E2 520, 7 follicles, good progression',
        reactionData: { understanding: 'clear', emotional_response: 'excited', anxiety_before: 5, anxiety_after: 3 },
        eventDate: new Date('2026-01-27T09:30:00'),
      },
    ],
  });

  // Patient 2 (Sneha - PCOS, high responder) - Fertilization stage
  await prisma.timelineEvent.createMany({
    data: [
      {
        patientId: patients[1].id,
        cycleId: cycle2.id,
        eventType: 'baseline_scan',
        createdBy: doctor.id,
        staffRole: 'doctor',
        cycleDay: 2,
        clinicalData: { e2: 38, afc: 22 },
        patientRecordText: 'E2: 38 pg/mL, AFC: 22 follicles (high - PCOS), Endometrium: 3mm',
        summaryText: 'Baseline: 22 follicles - High responder, OHSS prevention protocol',
        reactionData: { understanding: 'partial', emotional_response: 'worried', anxiety_before: 7, anxiety_after: 6, notes: 'Concerned about OHSS risk' },
        eventDate: new Date('2026-01-17T10:00:00'),
      },
      {
        patientId: patients[1].id,
        cycleId: cycle2.id,
        eventType: 'dose_adjustment',
        createdBy: doctor.id,
        staffRole: 'doctor',
        cycleDay: 7,
        clinicalData: { e2: 1800, adjustment: 'reduced' },
        patientRecordText: 'E2: 1800 pg/mL (HIGH - OHSS risk), Dose reduced by 50% to prevent OHSS (Ovarian Hyperstimulation Syndrome)',
        summaryText: 'Dose reduced - E2 1800, OHSS prevention',
        reactionData: { understanding: 'clear', emotional_response: 'anxious', anxiety_before: 8, anxiety_after: 7, visual_helped: true },
        eventDate: new Date('2026-01-22T09:00:00'),
      },
      {
        patientId: patients[1].id,
        cycleId: cycle2.id,
        eventType: 'fertilization_day1_report',
        createdBy: doctor.id,
        staffRole: 'doctor',
        cycleDay: 15,
        clinicalData: { eggs: 18, mii: 15, fertilized: 12 },
        patientRecordText: '18 eggs retrieved, 15 MII (Metaphase II - mature eggs), 12 fertilized (2PN - two pronuclei), ICSI (Intracytoplasmic Sperm Injection) done',
        summaryText: 'Fertilization: 12/15 mature eggs fertilized (80%)',
        reactionData: { understanding: 'clear', emotional_response: 'excited', anxiety_before: 8, anxiety_after: 4 },
        eventDate: new Date('2026-01-30T11:00:00'),
      },
    ],
  });

  // Patient 3 (Anita - DOR, poor responder) - Embryo transfer prep
  await prisma.timelineEvent.createMany({
    data: [
      {
        patientId: patients[2].id,
        cycleId: cycle3.id,
        eventType: 'baseline_scan',
        createdBy: doctor.id,
        staffRole: 'doctor',
        cycleDay: 1,
        clinicalData: { e2: 52, afc: 4 },
        patientRecordText: 'E2: 52 pg/mL, AFC: 4 follicles (low - DOR - Diminished Ovarian Reserve)',
        summaryText: 'Baseline: 4 follicles - Low reserve, modified protocol',
        reactionData: { understanding: 'partial', emotional_response: 'worried', anxiety_before: 9, anxiety_after: 8, notes: 'Very anxious about egg count' },
        eventDate: new Date('2026-01-11T10:00:00'),
      },
      {
        patientId: patients[2].id,
        cycleId: cycle3.id,
        eventType: 'fertilization_day1_report',
        createdBy: doctor.id,
        staffRole: 'doctor',
        cycleDay: 14,
        clinicalData: { eggs: 4, mii: 3, fertilized: 2 },
        patientRecordText: '4 eggs retrieved, 3 MII (mature), 2 fertilized (2PN), ICSI done',
        summaryText: 'Fertilization: 2/3 mature eggs fertilized',
        reactionData: { understanding: 'clear', emotional_response: 'anxious', anxiety_before: 9, anxiety_after: 7 },
        eventDate: new Date('2026-01-24T12:00:00'),
      },
      {
        patientId: patients[2].id,
        cycleId: cycle3.id,
        eventType: 'embryo_development_day3',
        createdBy: doctor.id,
        staffRole: 'doctor',
        cycleDay: 17,
        clinicalData: { embryos: 2, quality: 'good' },
        patientRecordText: 'Day 3: Embryo 1 - 8-cell grade A, Embryo 2 - 7-cell grade B. Both developing well',
        summaryText: 'Day 3: 2 embryos, excellent quality (8-cell A, 7-cell B)',
        reactionData: { understanding: 'clear', emotional_response: 'hopeful', anxiety_before: 7, anxiety_after: 5, visual_helped: true },
        eventDate: new Date('2026-01-27T11:00:00'),
      },
      {
        patientId: patients[2].id,
        cycleId: cycle3.id,
        eventType: 'embryo_development_day5',
        createdBy: doctor.id,
        staffRole: 'doctor',
        cycleDay: 19,
        clinicalData: { blastocysts: 1, frozen: 0 },
        patientRecordText: 'Day 5: 1 blastocyst 4AB (excellent quality), 1 embryo arrested. Transfer planned for tomorrow',
        summaryText: 'Day 5: 1 excellent blastocyst 4AB ready for transfer',
        reactionData: { understanding: 'clear', emotional_response: 'calm', anxiety_before: 6, anxiety_after: 4 },
        eventDate: new Date('2026-01-29T10:00:00'),
      },
    ],
  });

  // Patient 4 (Kavita - RPL, high anxiety)
  await prisma.timelineEvent.createMany({
    data: [
      {
        patientId: patients[3].id,
        cycleId: cycle4.id,
        eventType: 'initial_consultation',
        createdBy: doctor.id,
        staffRole: 'doctor',
        cycleDay: 0,
        clinicalData: { amh: 3.5, history: 'RPL' },
        patientRecordText: 'AMH: 3.5 ng/mL, RPL history (Recurrent Pregnancy Loss - 2 miscarriages), Male factor: oligospermia',
        summaryText: 'Initial consultation: RPL history, ICSI recommended',
        reactionData: { understanding: 'confused', emotional_response: 'worried', anxiety_before: 9, anxiety_after: 9, notes: 'Very emotional, needs extra support' },
        eventDate: new Date('2026-01-25T14:00:00'),
      },
      {
        patientId: patients[3].id,
        cycleId: cycle4.id,
        eventType: 'counseling_session',
        createdBy: doctor.id,
        staffRole: 'doctor',
        cycleDay: 2,
        clinicalData: { session_type: 'emotional_support' },
        patientRecordText: 'Counseling session: Discussed RPL, grief processing, IVF expectations, PGT-A (Preimplantation Genetic Testing) option',
        summaryText: 'Counseling: RPL grief, PGT-A discussion, emotional support',
        reactionData: { understanding: 'clear', emotional_response: 'calm', anxiety_before: 9, anxiety_after: 6, visual_helped: true, notes: 'Much better after counseling' },
        eventDate: new Date('2026-01-27T15:00:00'),
      },
    ],
  });

  // Patient 5 (Meera - FET cycle)
  await prisma.timelineEvent.createMany({
    data: [
      {
        patientId: patients[4].id,
        cycleId: cycle5.id,
        eventType: 'baseline_scan',
        createdBy: doctor.id,
        staffRole: 'doctor',
        cycleDay: 1,
        clinicalData: { e2: 42, lining: 3 },
        patientRecordText: 'FET (Frozen Embryo Transfer) baseline: E2: 42 pg/mL, Lining: 3mm',
        summaryText: 'FET Baseline: Starting hormone replacement',
        reactionData: { understanding: 'clear', emotional_response: 'calm', anxiety_before: 4, anxiety_after: 3 },
        eventDate: new Date('2026-01-23T09:00:00'),
      },
      {
        patientId: patients[4].id,
        cycleId: cycle5.id,
        eventType: 'monitoring_scan_day7',
        createdBy: doctor.id,
        staffRole: 'doctor',
        cycleDay: 7,
        clinicalData: { e2: 250, lining: 7 },
        patientRecordText: 'E2: 250 pg/mL, Lining: 7mm trilaminar pattern (good for transfer)',
        summaryText: 'Day 7: Lining 7mm, on track for transfer',
        reactionData: { understanding: 'clear', emotional_response: 'hopeful', anxiety_before: 5, anxiety_after: 4 },
        eventDate: new Date('2026-01-29T09:30:00'),
      },
    ],
  });

  console.log('✅ Created comprehensive timeline events for all patients');

  const totalEvents = await prisma.timelineEvent.count();
  console.log(`📊 Total events in database: ${totalEvents}`);

  console.log('\n🎉 Sample data seeding complete!\n');
  console.log('📋 Summary:');
  console.log(`   • ${patients.length} patients with diverse scenarios`);
  console.log('   • 5 active treatment cycles');
  console.log(`   • ${totalEvents} timeline events`);
  console.log('\n👥 Patient Profiles:');
  console.log('   1. Priya (32) - Active stim Day 10, normal responder');
  console.log('   2. Sneha (28) - PCOS/high responder, fertilization stage');
  console.log('   3. Anita (35) - DOR/poor responder, embryo transfer prep');
  console.log('   4. Kavita (30) - RPL history, high anxiety, early cycle');
  console.log('   5. Meera (33) - FET cycle, frozen embryos');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding sample data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
