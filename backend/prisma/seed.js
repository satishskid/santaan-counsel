import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create demo clinic
  const clinic = await prisma.clinic.create({
    data: {
      name: 'Santaan Demo Clinic',
      domain: 'demo',
      licenseKey: 'DEMO-LICENSE-KEY',
      licenseExpiresAt: new Date('2027-12-31'),
      settings: {
        timezone: 'Asia/Kolkata',
        defaultLanguage: 'hindi_english',
      },
    },
  });

  console.log('✅ Created demo clinic');

  // Create users
  const admin = await prisma.user.create({
    data: {
      clinicId: clinic.id,
      username: 'admin',
      passwordHash: '$2a$10$BE5sqYsD1f1XsQzTIHvXQeOKUPIKNM5rRiVyi3Wk6dvKkJr8jYx5W', // password: admin123
      role: 'admin',
      assignedToName: 'Admin User',
      assignedDate: new Date(),
    },
  });

  const doctor = await prisma.user.create({
    data: {
      clinicId: clinic.id,
      username: 'doctor1',
      passwordHash: '$2a$10$BE5sqYsD1f1XsQzTIHvXQeOKUPIKNM5rRiVyi3Wk6dvKkJr8jYx5W', // password: admin123
      role: 'doctor',
      assignedToName: 'Dr. Rekha Sharma',
      assignedDate: new Date(),
    },
  });

  const nurse = await prisma.user.create({
    data: {
      clinicId: clinic.id,
      username: 'nurse1',
      passwordHash: '$2a$10$BE5sqYsD1f1XsQzTIHvXQeOKUPIKNM5rRiVyi3Wk6dvKkJr8jYx5W', // password: admin123
      role: 'nurse',
      assignedToName: 'Anjali Singh',
      assignedDate: new Date(),
    },
  });

  const embryologist = await prisma.user.create({
    data: {
      clinicId: clinic.id,
      username: 'embryo1',
      passwordHash: '$2a$10$BE5sqYsD1f1XsQzTIHvXQeOKUPIKNM5rRiVyi3Wk6dvKkJr8jYx5W', // password: admin123
      role: 'embryologist',
      assignedToName: 'Dr. Suresh Kumar',
      assignedDate: new Date(),
    },
  });

  console.log('✅ Created demo users');

  // Seed acronyms
  const acronyms = [
    { acronym: 'E2', expansion: 'Estradiol (hormone indicating follicle development)', unit: 'pg/mL', normalRangeMin: 200, normalRangeMax: 600, category: 'hormone' },
    { acronym: 'AMH', expansion: 'Anti-Müllerian Hormone (ovarian reserve marker)', unit: 'ng/mL', normalRangeMin: 1.0, normalRangeMax: 4.0, category: 'hormone' },
    { acronym: 'AFC', expansion: 'Antral Follicle Count (number of resting follicles)', unit: 'count', normalRangeMin: 5, normalRangeMax: 15, category: 'measurement' },
    { acronym: 'FSH', expansion: 'Follicle Stimulating Hormone', unit: 'mIU/mL', normalRangeMin: 3, normalRangeMax: 10, category: 'hormone' },
    { acronym: 'LH', expansion: 'Luteinizing Hormone', unit: 'mIU/mL', normalRangeMin: 1, normalRangeMax: 12, category: 'hormone' },
    { acronym: 'ICSI', expansion: 'Intracytoplasmic Sperm Injection (single sperm injected into egg)', unit: null, normalRangeMin: null, normalRangeMax: null, category: 'procedure' },
    { acronym: 'MII', expansion: 'Metaphase II (mature egg ready for fertilization)', unit: null, normalRangeMin: null, normalRangeMax: null, category: 'embryology' },
    { acronym: 'GV', expansion: 'Germinal Vesicle (immature egg)', unit: null, normalRangeMin: null, normalRangeMax: null, category: 'embryology' },
    { acronym: 'MI', expansion: 'Metaphase I (partially mature egg)', unit: null, normalRangeMin: null, normalRangeMax: null, category: 'embryology' },
    { acronym: 'TE', expansion: 'Trophectoderm (outer cell layer of blastocyst)', unit: null, normalRangeMin: null, normalRangeMax: null, category: 'embryology' },
    { acronym: 'ICM', expansion: 'Inner Cell Mass (forms the baby)', unit: null, normalRangeMin: null, normalRangeMax: null, category: 'embryology' },
    { acronym: '2PN', expansion: 'Two Pronuclei (normal fertilization indicator)', unit: null, normalRangeMin: null, normalRangeMax: null, category: 'embryology' },
    { acronym: '3PN', expansion: 'Three Pronuclei (abnormal fertilization)', unit: null, normalRangeMin: null, normalRangeMax: null, category: 'embryology' },
    { acronym: 'hCG', expansion: 'Human Chorionic Gonadotropin (pregnancy hormone)', unit: 'mIU/mL', normalRangeMin: null, normalRangeMax: null, category: 'hormone' },
    { acronym: 'FET', expansion: 'Frozen Embryo Transfer', unit: null, normalRangeMin: null, normalRangeMax: null, category: 'procedure' },
    { acronym: 'PGT-A', expansion: 'Preimplantation Genetic Testing for Aneuploidy', unit: null, normalRangeMin: null, normalRangeMax: null, category: 'procedure' },
  ];

  await prisma.acronymDictionary.createMany({
    data: acronyms.map(a => ({ ...a, clinicId: null })),
  });

  console.log('✅ Seeded acronym dictionary');

  // Seed templates
  const templates = [
    {
      name: 'Welcome - Initial Consultation',
      eventType: 'initial_consultation',
      category: 'message',
      language: 'hindi_english',
      content: 'Namaste {{patient_name}} ji! 🙏\n\nSantaan में आपका स्वागत है। Aaj aapki consultation Dr. {{doctor_name}} ke saath hui. Aapki journey ab shuru ho rahi hai aur hum har kadam par aapke saath hain.\n\nNext steps:\n{{next_steps}}\n\nKoi bhi sawaal ho toh please reply karein! 💚',
      talkingPoints: ['Welcome patient warmly', 'Explain clinic process', 'Set expectations for timeline', 'Answer initial questions', 'Emphasize support availability'],
      suggestedVisuals: [],
      triggerConditions: { eventType: 'initial_consultation' },
    },
    {
      name: 'Scan Results - Day 5 Monitoring',
      eventType: 'monitoring_scan_day5',
      category: 'message',
      language: 'hindi_english',
      content: '{{patient_name}} ji, aaj aapka scan bahut achha tha! ✨\n\nFollicles achhe se badh rahe hain:\n- Left ovary: {{follicles_left}} follicles (largest {{max_left}}mm)\n- Right ovary: {{follicles_right}} follicles (largest {{max_right}}mm)\n\n{{#if dose_change}}Ek chhoti si adjustment: {{medication_name}} ab {{new_dose}} hogi (pehle {{old_dose}} thi). Yeh normal hai taaki best results aaye.{{/if}}\n\nNext scan: {{next_scan_date}} at {{next_scan_time}}\n\nQuestions? Reply kariye! 💚',
      talkingPoints: ['Scan results are positive - follicles growing well', 'Explain current sizes and target (18-20mm)', 'If dose changed, emphasize it\'s normal optimization', 'Confirm next appointment', 'Ask if patient has any concerns'],
      suggestedVisuals: ['follicle_growth_chart', 'timeline_progress'],
      triggerConditions: { eventType: 'monitoring_scan_day5' },
    },
    {
      name: 'Fertilization Report - Day 1',
      eventType: 'fertilization_day1_report',
      category: 'message',
      language: 'hindi_english',
      content: '{{patient_name}} ji, good news! 🎉\n\nAaj ka fertilization report:\n- Total eggs: {{total_eggs}}\n- Mature eggs (MII): {{mature_eggs}}\n- Fertilized normally (2PN): {{fertilized}}/{{mature_eggs}}\n\nSaare {{fertilized}} embryos achhe se develop ho rahe hain. Hum Day 3 par inhe phir check karenge aur aapko update denge.\n\nYeh bahut achhi progress hai! 💚',
      talkingPoints: ['Congratulate on fertilization', 'Explain what 2PN means (normal fertilization)', 'Set expectations for Day 3 update', 'Reassure patient', 'Invite questions'],
      suggestedVisuals: ['fertilization_process', 'embryo_timeline'],
      triggerConditions: { eventType: 'fertilization_day1_report' },
    },
    {
      name: 'Embryo Transfer - Pre-procedure',
      eventType: 'embryo_transfer_prep',
      category: 'message',
      language: 'hindi_english',
      content: '{{patient_name}} ji,\n\nKal aapka embryo transfer hai! 🌟\n\nImportant instructions:\n✅ Light breakfast le sakte hain\n✅ Water peete rahein (bladder full hona chahiye)\n✅ Comfortable kapde pehne\n✅ {{partner_name}} ke saath aa sakte hain\n\nTime: {{transfer_time}}\nProcedure duration: 15-20 minutes only\n\nGhabraiye mat, yeh bilkul painless hai! See you tomorrow! 💚',
      talkingPoints: ['Confirm appointment time', 'Explain procedure briefly', 'Reassure it\'s painless', 'Confirm companion allowed', 'Address any last-minute concerns'],
      suggestedVisuals: ['transfer_procedure', 'dos_and_donts'],
      triggerConditions: { eventType: 'embryo_transfer_prep' },
    },
  ];

  await prisma.template.createMany({
    data: templates,
  });

  console.log('✅ Seeded message templates');

  // Create a demo patient with timeline
  const patient = await prisma.patient.create({
    data: {
      clinicId: clinic.id,
      mrNumber: 'SAN-2026-001',
      firstName: 'Priya',
      lastName: 'Sharma',
      age: 32,
      phone: '+91-9876543210',
      amh: 2.5,
      bmi: 23.5,
      preferredLanguage: 'hindi_english',
      detailPreference: 'high',
      visualLearner: true,
      baselineAnxiety: 6,
      currentAnxiety: 5,
    },
  });

  const cycle = await prisma.treatmentCycle.create({
    data: {
      patientId: patient.id,
      cycleNumber: 1,
      protocol: 'antagonist_protocol',
      startDate: new Date('2026-02-01'),
      status: 'active',
      currentPhase: 'stimulation',
      cycleDay: 5,
    },
  });

  await prisma.timelineEvent.create({
    data: {
      patientId: patient.id,
      cycleId: cycle.id,
      eventType: 'initial_consultation',
      eventDate: new Date('2026-01-28'),
      createdBy: doctor.id,
      staffRole: 'doctor',
      summaryText: 'Initial consultation completed. Patient counseled about IVF process.',
      patientRecordText: 'Patient presented with 2 years of primary infertility. AMH: 2.5 ng/mL, AFC: 8. Antagonist protocol recommended.',
      searchableText: 'Initial consultation IVF counseling',
    },
  });

  await prisma.timelineEvent.create({
    data: {
      patientId: patient.id,
      cycleId: cycle.id,
      eventType: 'monitoring_scan_day5',
      eventDate: new Date('2026-02-05'),
      cycleDay: 5,
      createdBy: nurse.id,
      staffRole: 'nurse',
      clinicalData: {
        e2: 450,
        follicles_left: 4,
        follicles_right: 3,
        max_left: 11,
        max_right: 12,
        lining_thickness: 8,
      },
      reactionData: {
        understanding: 'well',
        emotional_response: 'positive',
        anxiety_before: 6,
        anxiety_after: 4,
        visual_helped: true,
      },
      summaryText: 'Day 5 scan shows good follicular development',
      patientRecordText: 'Estradiol: 450 pg/mL. AFC: Left 4 (max 11mm), Right 3 (max 12mm). Endometrium: 8mm trilaminar. Patient counseled, anxiety reduced.',
      searchableText: 'monitoring scan follicle development estradiol',
    },
  });

  console.log('✅ Created demo patient with timeline');

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📋 Demo Login Credentials:');
  console.log('   Admin: admin@demo / password: admin123');
  console.log('   Doctor: doctor1@demo / password: admin123');
  console.log('   Nurse: nurse1@demo / password: admin123');
  console.log('   Embryologist: embryo1@demo / password: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
