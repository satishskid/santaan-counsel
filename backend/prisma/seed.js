import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Get or create demo clinic
  let clinic = await prisma.clinic.findUnique({
    where: { domain: 'demo' }
  });

  if (!clinic) {
    clinic = await prisma.clinic.create({
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
  } else {
    console.log('✅ Using existing demo clinic');
  }

  // Check if users already exist
  const existingUsers = await prisma.user.count({ where: { clinicId: clinic.id } });
  
  if (existingUsers === 0) {
    // Create users
    await prisma.user.create({
      data: {
        clinicId: clinic.id,
        username: 'admin',
        passwordHash: '$2a$10$BE5sqYsD1f1XsQzTIHvXQeOKUPIKNM5rRiVyi3Wk6dvKkJr8jYx5W', // password: admin123
        role: 'admin',
        assignedToName: 'Admin User',
        assignedDate: new Date(),
      },
    });

    await prisma.user.create({
      data: {
        clinicId: clinic.id,
        username: 'doctor1',
        passwordHash: '$2a$10$BE5sqYsD1f1XsQzTIHvXQeOKUPIKNM5rRiVyi3Wk6dvKkJr8jYx5W', // password: admin123
        role: 'doctor',
        assignedToName: 'Dr. Rekha Sharma',
        assignedDate: new Date(),
      },
    });

    await prisma.user.create({
      data: {
        clinicId: clinic.id,
        username: 'nurse1',
        passwordHash: '$2a$10$BE5sqYsD1f1XsQzTIHvXQeOKUPIKNM5rRiVyi3Wk6dvKkJr8jYx5W', // password: admin123
        role: 'nurse',
        assignedToName: 'Anjali Singh',
        assignedDate: new Date(),
      },
    });

    await prisma.user.create({
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
  } else {
    console.log('✅ Using existing demo users');
  }

  // Seed acronyms
  const existingAcronyms = await prisma.acronymDictionary.count();
  
  if (existingAcronyms === 0) {
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
  } else {
    console.log('✅ Using existing acronym dictionary');
  }

  // Seed templates from JSON files
  const existingTemplates = await prisma.template.count();
  
  if (existingTemplates === 0) {
    console.log('📚 Loading templates from JSON files...');
    
    const seedsDir = path.join(__dirname, 'seeds');
    
    // Check if seeds directory exists
    if (fs.existsSync(seedsDir)) {
      const templateFiles = fs.readdirSync(seedsDir)
        .filter(file => file.startsWith('templates_') && file.endsWith('.json') && !file.includes('odia'));
      
      let allTemplates = [];
      
      for (const file of templateFiles) {
        const filePath = path.join(seedsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Skip empty files
        if (!fileContent || fileContent.trim().length === 0) {
          console.log(`⚠️  Skipping empty file: ${file}`);
          continue;
        }
        
        let templates;
        try {
          templates = JSON.parse(fileContent);
        } catch (error) {
          console.log(`⚠️  Skipping invalid JSON in ${file}: ${error.message}`);
          continue;
        }
        
        // Skip if templates is empty array
        if (!Array.isArray(templates) || templates.length === 0) {
          console.log(`⚠️  Skipping empty template array in: ${file}`);
          continue;
        }
        
        // Transform JSON template format to Prisma schema format
        const transformedTemplates = templates
          .filter(t => t.language === 'english' || t.language === 'hinglish') // English-only for now
          .map(template => ({
            clinicId: clinic.id,
            name: template.eventName,
            eventType: template.eventName.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
            category: 'communication',
            language: template.language,
            content: [
              template.greeting,
              template.context,
              template.explanation,
              template.next_steps,
              template.reassurance,
          template.call_to_action,
          template.contact_info
        ].filter(Boolean).join('\n\n'),
        talkingPoints: [
          template.context,
          template.explanation,
          template.reassurance
        ].filter(Boolean),
        suggestedVisuals: [],
        triggerConditions: {
          eventType: template.eventName,
          channel: template.channel
        },
      }));
      
      allTemplates.push(...transformedTemplates);
    }
    
    console.log(`📊 Found ${allTemplates.length} English templates across ${templateFiles.length} files`);
    
    // Insert templates in batches to avoid memory issues
    const batchSize = 50;
    for (let i = 0; i < allTemplates.length; i += batchSize) {
      const batch = allTemplates.slice(i, i + batchSize);
      await prisma.template.createMany({
        data: batch,
        skipDuplicates: true,
      });
      console.log(`   ✅ Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allTemplates.length / batchSize)}`);
    }

    console.log('✅ Seeded message templates');
    } else {
      console.log('⚠️  Seeds directory not found, skipping template seeding');
    }
  } else {
    console.log('✅ Using existing templates');
  }

  // Create a demo patient with timeline
  const existingPatients = await prisma.patient.count();
  
  if (existingPatients === 0) {
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
  } else {
    console.log('✅ Using existing demo patients');
  }

  console.log('\n🎉 Seed completed successfully!');
  console.log('\n📋 Demo Login Credentials:');
  console.log('   Admin: admin@demo / password: admin123');
  console.log('   Doctor: doctor1@demo / password: admin123');
  console.log('   Nurse: nurse1@demo / password: admin123');
  console.log('   Embryologist: embryo1@demo / password: admin123');

  // Seed protocols
  const PROTOCOLS = (await import('../src/config/protocols.js')).PROTOCOLS;
  
  const existingProtocols = await prisma.protocol.count();
  
  if (existingProtocols === 0) {
    for (const protocol of PROTOCOLS) {
      await prisma.protocol.create({
        data: {
          name: protocol.name,
          category: protocol.category,
          duration: protocol.duration,
          color: protocol.color,
          schedule: protocol.schedule,
          isActive: true,
        },
      });
    }
    
    console.log(`✅ Seeded ${PROTOCOLS.length} protocol templates`);
  } else {
    console.log(`✅ Using existing ${existingProtocols} protocols`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
