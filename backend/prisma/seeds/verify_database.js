import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyTemplates() {
  try {
    console.log('📊 Database Verification Report\n');
    console.log('=' .repeat(50));

    // Total count
    const total = await prisma.template.count();
    console.log(`\n✅ Total templates in database: ${total}`);

    // By language
    console.log('\n📝 Templates by Language:');
    const languages = await prisma.template.groupBy({
      by: ['language'],
      _count: true
    });
    languages.forEach(lang => {
      console.log(`   ${lang.language || '(null)'}: ${lang._count}`);
    });

    // By category
    console.log('\n📁 Templates by Category:');
    const categories = await prisma.template.groupBy({
      by: ['category'],
      _count: true
    });
    categories.sort((a, b) => b._count - a._count);
    categories.forEach(cat => {
      console.log(`   ${cat.category}: ${cat._count}`);
    });

    // Sample templates
    console.log('\n🔍 Sample Templates:');
    const samples = await prisma.template.findMany({
      take: 5,
      select: {
        id: true,
        name: true,
        language: true,
        category: true,
        content: true
      }
    });
    
    samples.forEach((t, i) => {
      console.log(`\n${i + 1}. ${t.name}`);
      console.log(`   Language: ${t.language || '(not set)'}`);
      console.log(`   Category: ${t.category}`);
      console.log(`   Content preview: ${t.content.substring(0, 100)}...`);
    });

    // Check for Odia content
    console.log('\n🔍 Searching for Odia content...');
    const odiaTemplates = await prisma.template.findMany({
      where: {
        OR: [
          { language: 'Odia' },
          { content: { contains: 'ଧନ୍ୟବାଦ' } },
          { content: { contains: 'ସ୍ଵାଗତମ' } }
        ]
      },
      take: 3
    });
    
    if (odiaTemplates.length > 0) {
      console.log(`   Found ${odiaTemplates.length} templates with Odia content:`);
      odiaTemplates.forEach(t => {
        console.log(`   - ${t.name} (ID: ${t.id})`);
      });
    } else {
      console.log('   ⚠️  No Odia language templates found');
    }

    // Templates with null/empty language
    const noLanguage = await prisma.template.count({
      where: {
        OR: [
          { language: null },
          { language: '' }
        ]
      }
    });
    
    if (noLanguage > 0) {
      console.log(`\n⚠️  ${noLanguage} templates have null/empty language field`);
    }

    console.log('\n' + '='.repeat(50));
    console.log('✅ Verification complete!\n');

  } catch (error) {
    console.error('❌ Error during verification:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyTemplates();
