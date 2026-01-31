#!/usr/bin/env node
/**
 * Odia Template Importer
 * Converts Odia JSON templates to database format and inserts them
 * 
 * Usage: node import_odia_templates.js
 */

import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

/**
 * Transform Odia JSON template to Prisma schema format
 */
function transformOdiaTemplate(template) {
  return {
    name: template.eventName,
    eventType: template.eventName.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
    category: template.category || 'communication',
    language: 'odia',
    
    // Combine all 7 components into single content field
    content: [
      `ନମସ୍କାର (Greeting): ${template.greeting}`,
      `ପ୍ରସଙ୍ଗ (Context): ${template.context}`,
      `ବ୍ୟାଖ୍ୟା (Explanation): ${template.explanation}`,
      `ପରବର୍ତ୍ତୀ ପଦକ୍ଷେପ (Next Steps): ${template.next_steps}`,
      `ଆଶ୍ୱାସନା (Reassurance): ${template.reassurance}`,
      `କାର୍ଯ୍ୟ ଆହ୍ୱାନ (Call to Action): ${template.call_to_action}`,
      `ସମ୍ପର୍କ (Contact): ${template.contact_info}`
    ].filter(Boolean).join('\n\n'),
    
    // Talking points for staff training
    talkingPoints: [
      template.context,
      template.explanation,
      template.reassurance
    ].filter(Boolean),
    
    // Trigger conditions for auto-suggestions
    triggerConditions: {
      eventType: template.eventName,
      channel: template.channel,
      language: 'odia'
    },
    
    // Visual suggestions (empty array for now)
    suggestedVisuals: [],
    
    // Metadata - only fields that exist in schema
    timesUsed: 0,
    isActive: true
  };
}

/**
 * Main import function
 */
async function importOdiaTemplates() {
  console.log('🇮🇳 Starting Odia Template Import...\n');
  
  try {
    // 1. Get demo clinic (or create if needed)
    let clinic = await prisma.clinic.findUnique({
      where: { domain: 'demo' }
    });
    
    if (!clinic) {
      console.log('⚠️  Demo clinic not found. Creating...');
      clinic = await prisma.clinic.create({
        data: {
          name: 'Santaan IVF Demo Clinic',
          domain: 'demo',
          phone: '+91-9876543210',
          email: 'demo@santaan.health'
        }
      });
      console.log('✅ Demo clinic created\n');
    }
    
    // 2. Load Odia template files
    const seedsDir = path.join(__dirname);
    const odiaDir = path.join(seedsDir, 'odia');
    
    // Check if odia directory exists
    if (!fs.existsSync(odiaDir)) {
      console.log('⚠️  No odia/ directory found!');
      console.log('📁 Creating odia/ directory...\n');
      fs.mkdirSync(odiaDir, { recursive: true });
    }
    
    const odiaFiles = fs.readdirSync(odiaDir)
      .filter(file => file.endsWith('.json') && file.includes('template'))
      .map(file => path.join('odia', file));
    
    if (odiaFiles.length === 0) {
      console.log('⚠️  No Odia template files found!');
      console.log('📁 Expected files: templates_odia_part1.json, templates_odia_part2.json, etc.');
      console.log('📍 Location: backend/prisma/seeds/\n');
      return;
    }
    
    console.log(`📚 Found ${odiaFiles.length} Odia template file(s):\n`);
    odiaFiles.forEach(file => console.log(`   - ${file}`));
    console.log();
    
    // 3. Process each file
    let totalTemplates = 0;
    let insertedTemplates = 0;
    
    for (const file of odiaFiles) {
      try {
        const filePath = path.join(seedsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const templates = JSON.parse(fileContent);
        
        console.log(`\n📖 Processing ${file}...`);
        console.log(`   Found ${templates.length} templates`);
        
        totalTemplates += templates.length;
        
        // Transform and insert in batches
        const batchSize = 50;
        for (let i = 0; i < templates.length; i += batchSize) {
          const batch = templates.slice(i, i + batchSize);
          const transformedBatch = batch.map(t => transformOdiaTemplate(t, clinic.id));
          
          const result = await prisma.template.createMany({
            data: transformedBatch,
            skipDuplicates: true
          });
          
          insertedTemplates += result.count;
          
          console.log(`   ✅ Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(templates.length / batchSize)} (${result.count} templates)`);
        }
        
      } catch (error) {
        console.error(`   ❌ Error processing ${file}:`, error.message);
      }
    }
    
    // 4. Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Import Summary:');
    console.log('='.repeat(60));
    console.log(`📝 Total templates found:     ${totalTemplates}`);
    console.log(`✅ Successfully inserted:     ${insertedTemplates}`);
    console.log(`⏭️  Skipped (duplicates):     ${totalTemplates - insertedTemplates}`);
    console.log('='.repeat(60));
    
    // 5. Verification
    const odiaCount = await prisma.template.count({
      where: { language: 'odia' }
    });
    
    console.log(`\n🔍 Database verification: ${odiaCount} Odia templates now available`);
    
    // 6. Category breakdown
    const categories = await prisma.template.groupBy({
      by: ['category'],
      where: { language: 'odia' },
      _count: true
    });
    
    console.log('\n📂 Templates by category:');
    categories.forEach(cat => {
      console.log(`   ${cat.category}: ${cat._count} templates`);
    });
    
    console.log('\n🎉 Odia template import complete!\n');
    
  } catch (error) {
    console.error('❌ Import failed:', error);
    throw error;
  }
}

// Run import
importOdiaTemplates()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
