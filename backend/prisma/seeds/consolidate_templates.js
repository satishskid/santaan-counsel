import fs from 'fs';
import path from 'path';

// English template files
const englishFiles = [
  'templates_core.json',
  'templates_core_ivf_batch1.json',
  'templates_iui.json',
  'templates_iui_complete_batch.json',
  'templates_iui_final.json',
  'templates_fet.json',
  'templates_fet_complete_batch.json',
  'templates_egg_freezing.json',
  'templates_egg_freezing_complete_batch.json',
  'templates_donor.json',
  'templates_donor_conception_complete_batch.json',
  'templates_advanced_maternal_age_batch.json',
  'templates_pgta_complications_batch2.json',
  'templates_counseling_administrative_batch3.json',
  'templates_male_factor_rpl_batch.json',
  'templates_special_conditions_batch.json',
  'templates_practical_operations_batch.json',
  'templates_final_practical_batch.json',
  'templates_ultimate_farewell_batch.json',
  'templates_mixed_batch1.json'
];

// Odia template files
const odiaFiles = [
  'odia/all_odia_templates_priority.json',
  'odia/templates_core_ivf_batch1_odia.json',
  'odia/templates_counseling_administrative_batch3_odia.json',
  'odia/templates_fet_complete_batch_odia.json',
  'odia/templates_odia_counseling.json',
  'odia/templates_odia_donor.json',
  'odia/templates_odia_pgta.json',
  'odia/templates_practical_operations_batch_odia.json'
];

console.log('=== Consolidating English Templates ===');
let allEnglish = [];

englishFiles.forEach(file => {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const templates = Array.isArray(data) ? data : (data.templates || []);
    allEnglish = allEnglish.concat(templates);
    console.log(`✓ ${file}: ${templates.length} templates`);
  } catch (err) {
    console.log(`✗ ${file}: ${err.message}`);
  }
});

console.log(`\nTotal English templates: ${allEnglish.length}`);
fs.writeFileSync('templates_english_master.json', JSON.stringify(allEnglish, null, 2));
console.log('✓ Saved to templates_english_master.json\n');

console.log('=== Consolidating Odia Templates ===');
let allOdia = [];

odiaFiles.forEach(file => {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const templates = Array.isArray(data) ? data : (data.templates || []);
    allOdia = allOdia.concat(templates);
    console.log(`✓ ${file}: ${templates.length} templates`);
  } catch (err) {
    console.log(`✗ ${file}: ${err.message}`);
  }
});

console.log(`\nTotal Odia templates: ${allOdia.length}`);
fs.writeFileSync('templates_odia_master.json', JSON.stringify(allOdia, null, 2));
console.log('✓ Saved to templates_odia_master.json\n');

console.log('=== Summary ===');
console.log(`English: ${allEnglish.length}`);
console.log(`Odia: ${allOdia.length}`);
console.log(`Total: ${allEnglish.length + allOdia.length}`);
