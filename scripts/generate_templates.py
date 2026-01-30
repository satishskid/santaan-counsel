#!/usr/bin/env python3
"""
Template Generation Pipeline: Groq + Claude

Groq: Bulk generation (100 templates/minute, ultra-cheap)
Claude: Medical accuracy + emotional intelligence review
"""

import os
import json
from groq import Groq
from anthropic import Anthropic

# Initialize clients
groq_client = Groq(api_key=os.environ.get("GROQ_API_KEY"))
claude_client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# Master template schema from existing templates
TEMPLATE_SCHEMA = {
    "eventName": "string",
    "channel": "whatsapp|sms|verbal",
    "language": "english|hinglish",
    "greeting": "personalized opening",
    "context": "situation summary",
    "explanation": "medical details with accuracy",
    "next_steps": "actionable instructions",
    "reassurance": "emotional support",
    "call_to_action": "immediate action needed",
    "contact_info": "doctor/clinic contact"
}

# Event types to generate (remaining ~650 templates)
REMAINING_EVENTS = [
    # IUI pathway (20 templates)
    {"event": "IUI Consultation", "variants": 3},
    {"event": "IUI Day 1 Preparation", "variants": 2},
    {"event": "IUI Follicle Tracking", "variants": 3},
    {"event": "IUI Trigger Timing", "variants": 2},
    {"event": "IUI Procedure Instructions", "variants": 3},
    {"event": "IUI Post-Procedure Care", "variants": 2},
    {"event": "IUI Beta Result Positive", "variants": 3},
    {"event": "IUI Beta Result Negative", "variants": 2},
    
    # PGT-A pathway (25 templates)
    {"event": "PGT-A Consultation", "variants": 3},
    {"event": "Embryo Biopsy Day 5", "variants": 3},
    {"event": "PGT-A Results - All Normal", "variants": 3},
    {"event": "PGT-A Results - All Abnormal", "variants": 3},
    {"event": "PGT-A Results - Mixed", "variants": 3},
    {"event": "PGT-A Mosaic Embryo Discussion", "variants": 2},
    {"event": "PGT-A Cost vs Benefit", "variants": 2},
    {"event": "Sex Selection Ethics", "variants": 2},
    {"event": "Single Euploid Transfer", "variants": 2},
    {"event": "No Euploid Embryos - Next Steps", "variants": 2},
    
    # Complications (30 templates)
    {"event": "Severe OHSS - Hospitalization", "variants": 3},
    {"event": "OHSS Resolution Timeline", "variants": 2},
    {"event": "Empty Follicle Syndrome", "variants": 3},
    {"event": "Total Fertilization Failure", "variants": 3},
    {"event": "Embryo Arrest Day 3", "variants": 3},
    {"event": "Vanishing Twin Syndrome", "variants": 3},
    {"event": "Ectopic Pregnancy Suspected", "variants": 3},
    {"event": "Biochemical Pregnancy", "variants": 3},
    {"event": "Blighted Ovum Diagnosis", "variants": 2},
    {"event": "Miscarriage Management Options", "variants": 3},
    {"event": "Recurrent Implantation Failure", "variants": 2},
    
    # Counseling/Emotional (25 templates)
    {"event": "First Consult Anxiety Management", "variants": 3},
    {"event": "Financial Stress Counseling", "variants": 3},
    {"event": "Relationship Strain Support", "variants": 3},
    {"event": "Family Pressure Coping", "variants": 3},
    {"event": "TWW (Two Week Wait) Anxiety", "variants": 3},
    {"event": "Post-Negative Grief Support", "variants": 3},
    {"event": "Pregnancy After Loss Anxiety", "variants": 2},
    {"event": "Donor Conception Acceptance", "variants": 3},
    {"event": "When to Stop Treatment", "variants": 2},
    
    # Administrative/Process (20 templates)
    {"event": "Financial Counseling Initial", "variants": 2},
    {"event": "Insurance Coverage Check", "variants": 2},
    {"event": "Payment Plan Options", "variants": 2},
    {"event": "Medication Ordering Instructions", "variants": 3},
    {"event": "Appointment Reminder - Monitoring", "variants": 2},
    {"event": "Lab Results Ready for Pickup", "variants": 2},
    {"event": "Prescription Renewal Needed", "variants": 2},
    {"event": "Medical Records Request", "variants": 2},
    {"event": "Second Opinion Coordination", "variants": 2},
    {"event": "Clinic Change/Transfer Care", "variants": 1},
]


def generate_with_groq(event_name, variant_count, existing_examples):
    """Use Groq for fast bulk generation"""
    
    prompt = f"""You are an IVF communication expert. Generate {variant_count} template variants for event: "{event_name}"

CRITICAL REQUIREMENTS:
1. Medical accuracy (IVF terminology, protocols, timelines)
2. Empathetic tone (patients are anxious, vulnerable)
3. Cultural sensitivity (Indian context, Hindi/English mix)
4. Personalization variables: {{{{patient_name}}}}, {{{{doctor_name}}}}, etc.

CHANNELS & LANGUAGES:
- WhatsApp English: Conversational, emojis 📊🌟, warm
- WhatsApp Hinglish: Mix Hindi/English naturally, local phrases
- SMS English: Concise, max 160 chars, essential info only
- Verbal English: Include [PAUSE], [EMPATHY], [GENTLE TONE] markers for nurses

TEMPLATE STRUCTURE (7 components):
1. greeting: Personalized opening (Hi {{{{patient_name}}}}!)
2. context: Current situation summary
3. explanation: Medical details with accuracy
4. next_steps: Clear actionable instructions
5. reassurance: Emotional support, reduce anxiety
6. call_to_action: What to do immediately
7. contact_info: Dr. {{{{doctor_name}}}} | {{{{clinic_phone}}}}

EXAMPLE TEMPLATES:
{json.dumps(existing_examples, indent=2)}

Generate {variant_count} unique variants covering different channels/languages/scenarios.
Output ONLY valid JSON array - no markdown, no explanation."""

    response = groq_client.chat.completions.create(
        model="llama-3.1-70b-versatile",  # Fast + capable
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=4000,
        top_p=0.9
    )
    
    return response.choices[0].message.content


def validate_with_claude(generated_templates, event_name):
    """Use Claude for medical accuracy + emotional intelligence review"""
    
    prompt = f"""Review these IVF communication templates for event "{event_name}".

VALIDATION CHECKLIST:
✅ Medical Accuracy: Correct IVF terminology, protocols, timelines, success rates
✅ Emotional Intelligence: Appropriate empathy, anxiety reduction, hope without false promises
✅ Cultural Sensitivity: Respectful of Indian family dynamics, religious concerns
✅ Clarity: Instructions are actionable, jargon explained
✅ Safety: No medical advice that could harm (e.g., "stop medications" without doctor)

TEMPLATES TO REVIEW:
{json.dumps(generated_templates, indent=2)}

RESPOND IN JSON:
{{
  "approved": [<templates that pass all checks>],
  "rejected": [
    {{
      "template": <template object>,
      "issues": ["issue 1", "issue 2"],
      "suggested_fix": "specific correction"
    }}
  ],
  "overall_quality_score": <1-10>
}}

Be strict on medical accuracy. Be generous on style variations."""

    response = claude_client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=8000,
        messages=[{"role": "user", "content": prompt}]
    )
    
    return json.loads(response.content[0].text)


def iterative_refinement(event_name, variant_count, max_iterations=3):
    """Groq generates → Claude validates → Groq refines"""
    
    # Load existing templates as examples
    existing_examples = []
    for file in ["templates_core.json", "templates_fet.json", "templates_egg_freezing.json", "templates_donor.json"]:
        try:
            with open(f"backend/prisma/seeds/{file}", "r") as f:
                existing_examples.extend(json.load(f)[:2])  # 2 examples per file
        except:
            pass
    
    approved_templates = []
    
    for iteration in range(max_iterations):
        print(f"  Iteration {iteration + 1}: Groq generating...")
        
        # Groq generates
        raw_output = generate_with_groq(event_name, variant_count, existing_examples[:3])
        
        try:
            generated = json.loads(raw_output)
        except json.JSONDecodeError:
            # Extract JSON from markdown if needed
            import re
            json_match = re.search(r'\[.*\]', raw_output, re.DOTALL)
            if json_match:
                generated = json.loads(json_match.group(0))
            else:
                print(f"  ❌ JSON parse error, retrying...")
                continue
        
        print(f"  Claude validating {len(generated)} templates...")
        
        # Claude validates
        validation = validate_with_claude(generated, event_name)
        
        approved_templates.extend(validation["approved"])
        
        print(f"  ✅ Approved: {len(validation['approved'])}, Rejected: {len(validation['rejected'])}, Quality: {validation['overall_quality_score']}/10")
        
        # Stop if we have enough good templates
        if len(approved_templates) >= variant_count and validation["overall_quality_score"] >= 8:
            break
        
        # If rejected templates, use them as negative examples for next iteration
        if validation["rejected"]:
            existing_examples.append({
                "avoid_these_issues": [r["issues"] for r in validation["rejected"][:2]]
            })
    
    return approved_templates[:variant_count]


def main():
    """Generate remaining ~650 templates"""
    
    print("🚀 Template Generation Pipeline: Groq (speed) + Claude (quality)\n")
    
    all_templates = []
    
    for category in REMAINING_EVENTS:
        event_name = category["event"]
        variant_count = category["variants"]
        
        print(f"📝 Generating: {event_name} ({variant_count} variants)")
        
        templates = iterative_refinement(event_name, variant_count)
        
        all_templates.extend(templates)
        
        print(f"✅ Completed: {len(templates)} templates\n")
    
    # Save to file
    output_file = "backend/prisma/seeds/templates_generated_batch.json"
    with open(output_file, "w") as f:
        json.dump(all_templates, f, indent=2)
    
    print(f"🎉 COMPLETE! Generated {len(all_templates)} templates")
    print(f"💾 Saved to: {output_file}")
    print(f"📊 Progress: {66 + len(all_templates)}/720 ({int((66 + len(all_templates))/720*100)}%)")


if __name__ == "__main__":
    main()
