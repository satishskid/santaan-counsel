import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

// Function to transform template from JSON to Prisma schema
function transformTemplate(template, defaultLanguage = 'English') {
  // Combine all message components into content
  const content = [
    template.greeting || '',
    template.context || '',
    template.explanation || '',
    template.next_steps || '',
    template.reassurance || '',
    template.call_to_action || '',
    template.contact_info || ''
  ].filter(part => part).join('\n\n');

  // Normalize language field - handle 'english', 'hinglish', 'odia', etc.
  let language = template.language || defaultLanguage;
  if (language.toLowerCase() === 'english' || language.toLowerCase() === 'hinglish') {
    language = 'English';
  } else if (language.toLowerCase() === 'odia') {
    language = 'Odia';
  }

  return {
    name: template.eventName || 'Unnamed Event',
    eventType: template.eventName || 'general',
    category: template.category || 'General',
    language: language,
    content: content || template.content || '',
    talkingPoints: template.talking_points || template.talkingPoints || [],
    triggerConditions: template.trigger_conditions || template.triggerConditions || {},
    suggestedVisuals: template.suggested_visuals || template.suggestedVisuals || [],
    timesUsed: 0,
    isActive: true
  };
}

async function importTemplates() {
  try {
    console.log('🚀 Starting template import...\n');

    // Import English templates
    console.log('=== Importing English Templates ===');
    const englishData = JSON.parse(
      fs.readFileSync('templates_english_master.json', 'utf8')
    );
    
    let englishCount = 0;
    for (const template of englishData) {
      const transformed = transformTemplate(template, 'English');
      await prisma.template.create({
        data: transformed
      });
      englishCount++;
      if (englishCount % 50 === 0) {
        console.log(`✓ Imported ${englishCount} English templates...`);
      }
    }
    console.log(`✅ Imported ${englishCount} English templates total\n`);

    // Import Odia templates
    console.log('=== Importing Odia Templates ===');
    const odiaData = JSON.parse(
      fs.readFileSync('templates_odia_master.json', 'utf8')
    );
    
    let odiaCount = 0;
    for (const template of odiaData) {
      const transformed = transformTemplate(template, 'Odia');
      await prisma.template.create({
        data: transformed
      });
      odiaCount++;
      if (odiaCount % 10 === 0) {
        console.log(`✓ Imported ${odiaCount} Odia templates...`);
      }
    }
    console.log(`✅ Imported ${odiaCount} Odia templates total\n`);

    // Final summary
    console.log('=== Import Complete ===');
    const totalInDb = await prisma.template.count();
    console.log(`📊 Total templates in database: ${totalInDb}`);
    
    // Breakdown by language
    const englishInDb = await prisma.template.count({ where: { language: 'English' } });
    const odiaInDb = await prisma.template.count({ where: { language: 'Odia' } });
    console.log(`   - English: ${englishInDb}`);
    console.log(`   - Odia: ${odiaInDb}`);

    // Breakdown by category
    const categories = await prisma.template.groupBy({
      by: ['category'],
      _count: true
    });
    console.log('\n📁 Templates by category:');
    categories.forEach(cat => {
      console.log(`   - ${cat.category}: ${cat._count}`);
    });

  } catch (error) {
    console.error('❌ Error importing templates:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

importTemplates();
