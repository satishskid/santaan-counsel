#!/usr/bin/env python3
"""
Translate English/Hinglish templates to Odia using Google Gemini API
Optimized for medical/fertility terminology preservation
"""

import json
import os
import time
from pathlib import Path
from typing import Dict, List
import google.generativeai as genai

# Configuration
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')  # Set in .env
SEEDS_DIR = Path(__file__).parent.parent / 'backend' / 'prisma' / 'seeds'
OUTPUT_DIR = SEEDS_DIR / 'odia'
BATCH_SIZE = 10  # Process 10 templates at a time to avoid rate limits

# Medical terminology to preserve (don't translate these)
PRESERVE_TERMS = [
    'IVF', 'ICSI', 'FET', 'PGT-A', 'OHSS', 'AMH', 'FSH', 'HCG', 'TSH',
    'DuoStim', 'ERA', 'TESA', 'Lupron', 'Gonal-F', 'Menopur', 'Cetrotide',
    'Progynova', 'Endometrin', 'Crinone', 'PCPNDT', 'ART Act', 'DNA',
    'RPL', 'APLA', 'NK cells', 'G-CSF', 'PRP', 'CoQ10', 'DHEA',
    'Zymot', 'Microfluidics', 'Embryologist', 'Blastocyst'
]

def init_gemini():
    """Initialize Gemini API"""
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY not found in environment variables")
    
    genai.configure(api_key=GEMINI_API_KEY)
    # Use gemini-2.5-flash (1.5 is deprecated)
    model = genai.GenerativeModel('gemini-2.5-flash')
    return model

def create_translation_prompt(template: Dict) -> str:
    """Create contextual prompt for medical translation"""
    
    preserve_list = ", ".join(PRESERVE_TERMS)
    
    prompt = f"""You are a professional medical translator specializing in fertility/IVF terminology.
Translate the following fertility clinic communication template from English to Odia (ଓଡ଼ିଆ).

CRITICAL INSTRUCTIONS:
1. Maintain medical accuracy - fertility/IVF terms are sensitive
2. DO NOT translate these medical terms: {preserve_list}
3. Keep variable placeholders EXACTLY as-is: {{{{patient_name}}}}, {{{{doctor_name}}}}, {{{{clinic_phone}}}}, etc.
4. Preserve cultural sensitivity and empathetic tone
5. Use natural, conversational Odia that patients can easily understand
6. Keep the structure: greeting, context, explanation, next_steps, reassurance, call_to_action, contact_info

EVENT: {template['eventName']}
CHANNEL: {template['channel']} (WhatsApp/SMS/Verbal)
ORIGINAL LANGUAGE: {template['language']}

TEMPLATE TO TRANSLATE:
---
greeting: {template['greeting']}
context: {template['context']}
explanation: {template['explanation']}
next_steps: {template['next_steps']}
reassurance: {template['reassurance']}
call_to_action: {template['call_to_action']}
contact_info: {template['contact_info']}
---

Return ONLY a valid JSON object with this exact structure (no markdown, no extra text):
{{
  "greeting": "Odia translation here",
  "context": "Odia translation here",
  "explanation": "Odia translation here",
  "next_steps": "Odia translation here",
  "reassurance": "Odia translation here",
  "call_to_action": "Odia translation here",
  "contact_info": "Odia translation here"
}}"""
    
    return prompt

def translate_template(model, template: Dict) -> Dict:
    """Translate a single template to Odia"""
    
    prompt = create_translation_prompt(template)
    
    try:
        response = model.generate_content(prompt)
        translation_text = response.text.strip()
        
        # Remove markdown code blocks if present
        if translation_text.startswith('```json'):
            translation_text = translation_text.replace('```json', '').replace('```', '').strip()
        elif translation_text.startswith('```'):
            translation_text = translation_text.replace('```', '').strip()
        
        translated_fields = json.loads(translation_text)
        
        # Create Odia template
        odia_template = {
            "eventName": template["eventName"],  # Keep English for consistency
            "channel": template["channel"],
            "language": "odia",
            "greeting": translated_fields["greeting"],
            "context": translated_fields["context"],
            "explanation": translated_fields["explanation"],
            "next_steps": translated_fields["next_steps"],
            "reassurance": translated_fields["reassurance"],
            "call_to_action": translated_fields["call_to_action"],
            "contact_info": translated_fields["contact_info"]
        }
        
        return odia_template
        
    except json.JSONDecodeError as e:
        print(f"⚠️  JSON parsing error for {template['eventName']}: {e}")
        print(f"Response was: {response.text[:200]}...")
        return None
    except Exception as e:
        print(f"⚠️  Translation error for {template['eventName']}: {e}")
        return None

def translate_batch_file(model, input_file: Path, priority_only: bool = False) -> List[Dict]:
    """Translate all templates in a file"""
    
    print(f"\n📄 Processing: {input_file.name}")
    
    with open(input_file, 'r', encoding='utf-8') as f:
        templates = json.load(f)
    
    # Priority filter: only translate WhatsApp/Verbal templates for now
    if priority_only:
        templates = [t for t in templates if t['channel'] in ['whatsapp', 'verbal']]
    
    print(f"   Found {len(templates)} templates to translate")
    
    odia_templates = []
    
    for i, template in enumerate(templates, 1):
        print(f"   [{i}/{len(templates)}] Translating: {template['eventName'][:50]}...")
        
        odia_template = translate_template(model, template)
        
        if odia_template:
            odia_templates.append(odia_template)
            print(f"   ✅ Success")
        else:
            print(f"   ❌ Failed - skipping")
        
        # Rate limiting: 15 requests per minute for Gemini free tier
        if i % BATCH_SIZE == 0 and i < len(templates):
            print(f"   ⏸️  Rate limit pause (15 sec)...")
            time.sleep(15)
        else:
            time.sleep(1)  # Small delay between requests
    
    return odia_templates

def main():
    """Main translation workflow"""
    
    print("=" * 70)
    print("🌐 ODIA TRANSLATION AUTOMATION")
    print("   Using Google Gemini API for Medical-Grade Translations")
    print("=" * 70)
    
    # Initialize Gemini
    print("\n🔧 Initializing Gemini API...")
    model = init_gemini()
    print("✅ API initialized")
    
    # Create output directory
    OUTPUT_DIR.mkdir(exist_ok=True)
    print(f"📁 Output directory: {OUTPUT_DIR}")
    
    # Priority files to translate first
    PRIORITY_FILES = [
        'templates_core_ivf_batch1.json',
        'templates_practical_operations_batch.json',
        'templates_fet_complete_batch.json',
        'templates_counseling_administrative_batch3.json'
    ]
    
    print(f"\n📋 Processing {len(PRIORITY_FILES)} priority files first...")
    
    all_odia_templates = []
    
    for filename in PRIORITY_FILES:
        file_path = SEEDS_DIR / filename
        
        if not file_path.exists():
            print(f"⚠️  File not found: {filename}")
            continue
        
        odia_batch = translate_batch_file(model, file_path, priority_only=True)
        all_odia_templates.extend(odia_batch)
        
        # Save individual batch
        output_file = OUTPUT_DIR / filename.replace('.json', '_odia.json')
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(odia_batch, f, ensure_ascii=False, indent=2)
        
        print(f"   💾 Saved {len(odia_batch)} templates to {output_file.name}")
    
    # Save combined file
    combined_file = OUTPUT_DIR / 'all_odia_templates_priority.json'
    with open(combined_file, 'w', encoding='utf-8') as f:
        json.dump(all_odia_templates, f, ensure_ascii=False, indent=2)
    
    print("\n" + "=" * 70)
    print(f"✅ TRANSLATION COMPLETE!")
    print(f"   Total Odia templates created: {len(all_odia_templates)}")
    print(f"   Combined file: {combined_file}")
    print("=" * 70)
    
    # Summary
    print("\n📊 NEXT STEPS:")
    print("1. Review translated templates for medical accuracy")
    print("2. Validate with native Odia speaker (medical background)")
    print("3. Run validation script: python scripts/validate_odia.py")
    print("4. Remaining files can be translated in next batch")

if __name__ == '__main__':
    main()
