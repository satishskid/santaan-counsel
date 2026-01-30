"""
Template Translation Script using Google TranslateGemma
Translates fertility clinic templates from English/Hinglish to Odia
"""

import json
import os
from pathlib import Path
from typing import List, Dict
import time

# Install: pip install google-generativeai
import google.generativeai as genai

# Configure Gemini API
GOOGLE_API_KEY = os.environ.get('GOOGLE_API_KEY')
if not GOOGLE_API_KEY:
    raise ValueError("Please set GOOGLE_API_KEY environment variable")

genai.configure(api_key=GOOGLE_API_KEY)

# Use Gemini 1.5 Flash for translation (fast + accurate)
model = genai.GenerativeModel('gemini-1.5-flash')

# Priority templates to translate first (100 most critical)
PRIORITY_TEMPLATES = [
    # Core IVF (30)
    "Stimulation Start",
    "Day 5 Scan",
    "Trigger Shot Tonight",
    "Egg Retrieval Day Instructions",
    "Fertilization Report",
    "Day 3 Embryo Update",
    "Day 5 Blastocyst",
    "Embryo Transfer Today",
    "Post-Transfer Care",
    "Beta Test Reminder",
    "Beta Positive",
    "Beta Negative",
    "Heartbeat Scan Positive",
    "Miscarriage Support",
    
    # Critical Safety (15)
    "OHSS Warning Signs",
    "Emergency Bleeding",
    "Severe Pain Post-Pickup",
    "Infection Symptoms",
    "Ectopic Suspicion",
    
    # FET Core (12)
    "Lining Check Day 8",
    "Lining Check Day 12",
    "Thin Lining Protocol",
    "Progesterone Start",
    "Embryo Thaw Perfect",
    "Embryo Thaw Partial Damage",
    
    # Common FAQs (20)
    "Injection Site Bruising",
    "Common Myth: Stairs",
    "Common Myth: Papaya/Pineapple",
    "Bed Rest Myth Final",
    "Travel Restrictions",
    "Sexual Activity Guidelines",
    "Constipation Relief",
    
    # Emotional Support (15)
    "First Consultation Anxiety",
    "Two Week Wait Anxiety",
    "Grief After Negative Result",
    "Financial Stress Counseling",
    
    # Instructions (8)
    "Gonal-F Pen Instructions",
    "Menopur Mixing Instructions",
    "Cetrotide/Orgalutran Timing",
    "Trigger Shot Instructions",
]


def translate_to_odia(text: str, context: str = "") -> str:
    """
    Translate text to Odia using Gemini
    
    Args:
        text: English/Hinglish text to translate
        context: Medical context to improve accuracy
    
    Returns:
        Odia translation
    """
    prompt = f"""You are a medical translator specializing in fertility/IVF terminology.
Translate the following text to Odia (ଓଡ଼ିଆ).

CRITICAL RULES:
1. Keep medical terms accurate (IVF, OHSS, Embryo, etc. - keep English or use proper Odia medical terms)
2. Preserve variable placeholders EXACTLY as is: {{{{patient_name}}}}, {{{{doctor_name}}}}, {{{{clinic_phone}}}}, etc.
3. Use warm, empathetic tone suitable for anxious patients
4. Keep it conversational and culturally appropriate for Odisha
5. If translating Hinglish, capture the colloquial warmth in Odia

Context: {context}

Text to translate:
{text}

Odia translation:"""

    try:
        response = model.generate_content(prompt)
        translation = response.text.strip()
        
        # Verify placeholders preserved
        import re
        original_vars = set(re.findall(r'\{\{[^}]+\}\}', text))
        translated_vars = set(re.findall(r'\{\{[^}]+\}\}', translation))
        
        if original_vars != translated_vars:
            print(f"⚠️  Warning: Variable mismatch in translation")
            print(f"   Original: {original_vars}")
            print(f"   Translated: {translated_vars}")
        
        return translation
    
    except Exception as e:
        print(f"❌ Translation error: {e}")
        return ""


def translate_template(template: Dict) -> Dict:
    """
    Translate a single template to Odia
    
    Args:
        template: Original template dict (English/Hinglish)
    
    Returns:
        Odia template dict
    """
    context = f"Medical Event: {template['eventName']}, Channel: {template['channel']}"
    
    print(f"\n📝 Translating: {template['eventName']} ({template['language']})")
    
    odia_template = {
        "eventName": template["eventName"],  # Keep event name in English for DB indexing
        "channel": template["channel"],
        "language": "odia",
        "greeting": translate_to_odia(template["greeting"], context),
        "context": translate_to_odia(template["context"], context),
        "explanation": translate_to_odia(template["explanation"], context),
        "next_steps": translate_to_odia(template["next_steps"], context),
        "reassurance": translate_to_odia(template["reassurance"], context),
        "call_to_action": translate_to_odia(template["call_to_action"], context),
        "contact_info": translate_to_odia(template["contact_info"], context),
    }
    
    # Small delay to respect API rate limits
    time.sleep(1)
    
    return odia_template


def load_all_templates() -> List[Dict]:
    """Load all template JSON files"""
    seeds_dir = Path(__file__).parent.parent / "backend" / "prisma" / "seeds"
    all_templates = []
    
    for file in seeds_dir.glob("templates_*.json"):
        with open(file, 'r', encoding='utf-8') as f:
            templates = json.load(f)
            all_templates.extend(templates)
    
    return all_templates


def filter_priority_templates(templates: List[Dict]) -> List[Dict]:
    """Filter only priority templates for initial translation"""
    priority = []
    
    for template in templates:
        if template['eventName'] in PRIORITY_TEMPLATES:
            # Prefer Hinglish versions (more culturally close to Odia)
            if template['language'] == 'hinglish':
                priority.append(template)
            # If no Hinglish, take English
            elif template['language'] == 'english' and template['eventName'] not in [t['eventName'] for t in priority]:
                priority.append(template)
    
    return priority


def translate_batch(templates: List[Dict], output_file: str):
    """
    Translate a batch of templates and save to file
    
    Args:
        templates: List of template dicts to translate
        output_file: Output JSON file path
    """
    odia_templates = []
    total = len(templates)
    
    print(f"\n🌐 Starting translation of {total} templates to Odia...")
    print(f"⏱️  Estimated time: {total * 1.5 / 60:.1f} minutes\n")
    
    for i, template in enumerate(templates, 1):
        print(f"[{i}/{total}] ", end="")
        
        try:
            odia_template = translate_template(template)
            odia_templates.append(odia_template)
            print(f"✅ Done")
        
        except Exception as e:
            print(f"❌ Failed: {e}")
            continue
    
    # Save to file
    output_path = Path(__file__).parent.parent / "backend" / "prisma" / "seeds" / output_file
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(odia_templates, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Saved {len(odia_templates)} Odia templates to {output_file}")
    print(f"📊 Success rate: {len(odia_templates)}/{total} ({len(odia_templates)/total*100:.1f}%)")


def main():
    """Main translation workflow"""
    print("🇮🇳 Fertility Clinic Template Translation: English/Hinglish → Odia")
    print("=" * 70)
    
    # Load all templates
    all_templates = load_all_templates()
    print(f"📚 Loaded {len(all_templates)} total templates")
    
    # Filter priority templates
    priority_templates = filter_priority_templates(all_templates)
    print(f"🎯 Filtered {len(priority_templates)} priority templates for Phase 1")
    
    # Translate priority batch
    translate_batch(
        priority_templates,
        "templates_priority_odia_phase1.json"
    )
    
    print("\n" + "=" * 70)
    print("✅ Phase 1 Translation Complete!")
    print("\n📋 Next Steps:")
    print("1. Review translations with native Odia medical professional")
    print("2. Test with Odia-speaking patients")
    print("3. Run Phase 2 for remaining 550 templates")
    print("4. Update Prisma seed script to include Odia templates")


if __name__ == "__main__":
    main()
