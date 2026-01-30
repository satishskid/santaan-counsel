import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  console.log('📚 Loading templates from JSON files...');
  
  // Get the demo clinic
  const clinic = await prisma.clinic.findUnique({
    where: { domain: 'demo' }
  });

  if (!clinic) {
    console.error('❌ Demo clinic not found. Run: npm run prisma:seed first');
    process.exit(1);
  }

  // Load template files
  const seedsDir = path.join(__dirname, 'seeds');
  const templateFiles = fs.readdirSync(seedsDir)
    .filter(file => file.startsWith('templates_') && file.endsWith('.json') && !file.includes('odia'));
  
  console.log(`📊 Found ${templateFiles.length} template files`);
  
  let allTemplates = [];
  
  for (const file of templateFiles) {
    try {
      const filePath = path.join(seedsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const templates = JSON.parse(fileContent);
      
      // Transform JSON template format to Prisma schema format
      const transformedTemplates = templates
        .filter(t => t.language === 'english' || t.language === 'hinglish') // English-only for now
        .map(template => ({
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
      console.log(`   ✅ Loaded ${transformedTemplates.length} templates from ${file}`);
    } catch (error) {
      console.log(`   ⚠️  Skipped ${file}: ${error.message}`);
    }
  }
  
  console.log(`\n📊 Total: ${allTemplates.length} English templates`);
  
  // Delete existing templates to avoid duplicates
  const deleted = await prisma.template.deleteMany({});
  console.log(`🗑️  Deleted ${deleted.count} existing templates`);
  
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

  console.log('\n🎉 Template seeding complete!');
  console.log(`   📝 Total templates in database: ${allTemplates.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Template seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
