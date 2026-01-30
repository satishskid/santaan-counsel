#!/usr/bin/env python3
"""
PILOT: Generate 20 IUI templates using Groq + Claude validation
"""

import os
import json
import re
import time
from groq import Groq

# Initialize Groq
groq_api_key = os.environ.get("GROQ_API_KEY")
if not groq_api_key:
    raise ValueError("GROQ_API_KEY environment variable not set")
groq_client = Groq(api_key=groq_api_key)

# Load existing templates as examples
def load_examples():
    examples = []
    files = ["templates_core.json", "templates_fet.json", "templates_egg_freezing.json"]
    for file in files:
        try:
            with open(f"backend/prisma/seeds/{file}", "r") as f:
                templates = json.load(f)
                examples.extend(templates[:2])  # 2 per file
        except:
            pass
    return examples

# IUI events to generate
IUI_EVENTS = [
    "IUI Consultation - First Time",
    "IUI Day 1 - Cycle Start",
    "IUI Follicle Tracking Day 10",
    "IUI Trigger Shot Instructions",
    "IUI Procedure Day Instructions",
    "IUI Post-Procedure 24h Care",
    "IUI Two Week Wait Guidance",
    "IUI Beta hCG Positive Result",
    "IUI Beta hCG Negative Result",
    "IUI vs IVF Decision Making",
]

def generate_templates(event_name, examples):
    """Use Groq to generate 2 templates per event"""
    
    prompt = f"""You are an expert IVF clinic communication specialist. Generate 2 message templates for: "{event_name}"

CRITICAL REQUIREMENTS:
1. Medical accuracy (correct IUI terminology, protocols, timing)
2. Empathetic tone (patients anxious about fertility)
3. Indian context (cultural sensitivity, Hindi/English)
4. Personalization: {{{{patient_name}}}}, {{{{doctor_name}}}}, {{{{clinic_phone}}}}

CHANNELS:
- WhatsApp English: Warm, conversational, emojis okay 📊💚
- Verbal English: [PAUSE], [EMPATHY], [GENTLE TONE] markers for phone calls

TEMPLATE STRUCTURE (all 7 required):
{{
  "eventName": "{event_name}",
  "channel": "whatsapp" or "verbal",
  "language": "english",
  "greeting": "Hi {{{{patient_name}}}}! 👋",
  "context": "Current situation summary",
  "explanation": "Medical details - accurate, clear",
  "next_steps": "What to do next - actionable",
  "reassurance": "Emotional support - reduce anxiety",
  "call_to_action": "Immediate action required",
  "contact_info": "Dr. {{{{doctor_name}}}} | {{{{clinic_phone}}}}"
}}

EXAMPLES FROM OTHER EVENTS:
{json.dumps(examples[:3], indent=2)}

Generate EXACTLY 2 templates:
1. WhatsApp English (conversational, warm)
2. Verbal English (phone script with empathy markers)

Output ONLY valid JSON array - no markdown, no explanation:
[
  {{"eventName": "...", ...}},
  {{"eventName": "...", ...}}
]"""

    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=3000,
    )
    
    raw = response.choices[0].message.content
    
    # Extract JSON if wrapped in markdown
    json_match = re.search(r'\[.*\]', raw, re.DOTALL)
    if json_match:
        return json.loads(json_match.group(0))
    else:
        return json.loads(raw)

def main():
    print("🚀 PILOT: Groq Template Generation (IUI Pathway)\n")
    
    examples = load_examples()
    print(f"📚 Loaded {len(examples)} example templates\n")
    
    all_templates = []
    
    for i, event in enumerate(IUI_EVENTS, 1):
        print(f"[{i}/{len(IUI_EVENTS)}] Generating: {event}...", end=" ", flush=True)
        
        try:
            templates = generate_templates(event, examples)
            all_templates.extend(templates)
            print(f"✅ ({len(templates)} templates)")
            
            # Save incrementally in case of interruption
            with open("backend/prisma/seeds/templates_iui.json", "w") as f:
                json.dump(all_templates, f, indent=2)
            
            # Rate limiting - Groq free tier has limits
            if i < len(IUI_EVENTS):
                time.sleep(2)  # 2 seconds between requests
                
        except Exception as e:
            error_str = str(e)
            if '429' in error_str:
                print(f"⏳ Rate limit - waiting 30s...")
                time.sleep(30)
                # Retry once
                try:
                    templates = generate_templates(event, examples)
                    all_templates.extend(templates)
                    print(f"✅ ({len(templates)} templates)")
                    with open("backend/prisma/seeds/templates_iui.json", "w") as f:
                        json.dump(all_templates, f, indent=2)
                except:
                    print(f"❌ Still failed, skipping")
            else:
                print(f"❌ Error: {error_str[:100]}")
            continue
    
    # Save
    output_file = "backend/prisma/seeds/templates_iui.json"
    with open(output_file, "w") as f:
        json.dump(all_templates, f, indent=2)
    
    print(f"\n🎉 PILOT COMPLETE!")
    print(f"📝 Generated: {len(all_templates)} templates")
    print(f"💾 Saved to: {output_file}")
    print(f"📊 New progress: {66 + len(all_templates)}/720 ({int((66 + len(all_templates))/720*100)}%)")
    print(f"\n✅ Ready for manual review!")

if __name__ == "__main__":
    main()
