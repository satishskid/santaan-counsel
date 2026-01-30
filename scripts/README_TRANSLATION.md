# Template Translation Guide

## Using Google Gemini for Odia Translation

### Prerequisites

1. **Get Google AI Studio API Key**
   - Visit: https://aistudio.google.com/app/apikey
   - Create new API key
   - Copy the key

2. **Install Dependencies**
   ```bash
   cd /Users/spr/santaan\ teleprompt
   source .venv/bin/activate
   pip install google-generativeai
   ```

3. **Set API Key**
   ```bash
   export GOOGLE_API_KEY="your-api-key-here"
   ```

### Translation Workflow

#### Phase 1: Priority Templates (100 templates)

```bash
# Translate priority batch (15-20 minutes)
python scripts/translate_templates_gemma.py
```

**Output:** `backend/prisma/seeds/templates_priority_odia_phase1.json`

**What gets translated:**
- Core IVF journey (stimulation → retrieval → transfer → beta)
- Critical safety warnings (OHSS, bleeding, infection)
- FET essentials (lining checks, progesterone, thaw)
- Common FAQs (injection instructions, myths, lifestyle)
- Emotional support (anxiety, grief, counseling)

#### Phase 2: Full Translation (Remaining 550 templates)

Modify script to translate all:

```python
# In translate_templates_gemma.py, replace filter_priority_templates with:
def filter_remaining_templates(templates: List[Dict]) -> List[Dict]:
    """Get all non-priority templates"""
    already_done = set(PRIORITY_TEMPLATES)
    remaining = []
    
    for template in templates:
        if template['eventName'] not in already_done:
            if template['language'] == 'hinglish':
                remaining.append(template)
            elif template['language'] == 'english' and template['eventName'] not in [t['eventName'] for t in remaining]:
                remaining.append(template)
    
    return remaining
```

**Estimated time:** ~12-15 hours total (can run overnight or in chunks)

### Quality Assurance

#### 1. Manual Review Checklist

Review sample translations with Odia medical professional:

- [ ] Medical terminology accuracy (IVF, OHSS, Blastocyst, etc.)
- [ ] Variable placeholders preserved (`{{patient_name}}`, etc.)
- [ ] Cultural appropriateness (respectful tone, family context)
- [ ] Grammar and readability
- [ ] Emotional warmth maintained

#### 2. Automated Validation

```python
# Run validation script
python scripts/validate_odia_translations.py
```

Checks:
- All required fields present
- Variable placeholders match original
- No empty translations
- Character encoding correct (UTF-8)

#### 3. A/B Testing

Before full rollout:
1. Deploy Odia templates for 10 pilot patients
2. Collect feedback via counselor interviews
3. Iterate based on comprehension and emotional response

### Cost Estimation

**Using Gemini 1.5 Flash:**
- Free tier: 15 requests/minute, 1500/day
- Pricing (if exceeded): $0.075 per 1M input tokens, $0.30 per 1M output

**For 650 templates:**
- Input tokens: ~650 templates × 300 tokens avg = 195K tokens
- Output tokens: ~650 templates × 300 tokens avg = 195K tokens
- **Total cost:** ~$0.015 + $0.06 = **$0.075** (less than 10 cents!)

**Free tier is sufficient** - will take ~45 minutes with rate limiting.

### Integration with Database

Once translations validated:

```javascript
// backend/prisma/seed.js
const odiaTemplates = JSON.parse(
  fs.readFileSync('seeds/templates_priority_odia_phase1.json', 'utf-8')
);

await prisma.template.createMany({
  data: [...englishTemplates, ...hinglishTemplates, ...odiaTemplates],
  skipDuplicates: true
});
```

### Sample Odia Template Output

```json
{
  "eventName": "Stimulation Start",
  "channel": "whatsapp",
  "language": "odia",
  "greeting": "ନମସ୍କାର {{patient_name}} 💉",
  "context": "ଆଜି ଠାରୁ ଆପଣଙ୍କ IVF ଯାତ୍ରା ଆରମ୍ଭ!",
  "explanation": "ଆଜି ରାତିରୁ ଇଞ୍ଜେକ୍ସନ୍ ଆରମ୍ଭ କରନ୍ତୁ। ଏହା ଆପଣଙ୍କ ଅଣ୍ଡାଶୟକୁ ଅଧିକ ଅଣ୍ଡା ବୃଦ୍ଧି କରିବାକୁ ସାହାଯ୍ୟ କରେ।",
  "next_steps": "ପ୍ରତିଦିନ ସମାନ ସମୟରେ ଇଞ୍ଜେକ୍ସନ୍ ନିଅନ୍ତୁ। Day 5 ରେ ସ୍କାନ୍ ପାଇଁ ଆସନ୍ତୁ।",
  "reassurance": "ଆପଣ ଏହା କରିପାରିବେ! ଆମେ ପ୍ରତି ପଦକ୍ଷେପରେ ଆପଣଙ୍କ ସହିତ ଅଛୁ।",
  "call_to_action": "କୌଣସି ସନ୍ଦେହ ଥିଲେ କଲ୍ କରନ୍ତୁ।",
  "contact_info": "Dr. {{doctor_name}} | {{clinic_phone}}"
}
```

### Alternative: Hybrid Approach

For maximum quality, combine AI + Human:

1. **AI Translation (Gemini):** Fast first pass for all 650 templates
2. **Medical Expert Review:** Odia-speaking fertility doctor reviews 100 priority
3. **Patient Testing:** A/B test with 20 patients
4. **Iterative Refinement:** Fix issues found in testing
5. **Batch Deployment:** Roll out in phases

### Monitoring Post-Deployment

Track metrics:
- **Message comprehension rate** (counselor feedback)
- **Response rate** (do patients reply/confirm?)
- **Error reports** (mistranslations flagged)
- **Patient satisfaction** (post-treatment surveys)

### Future Languages

Same workflow can extend to:
- **Bengali** (বাংলা) - 10% of IVF patients
- **Telugu** (తెలుగు) - Southern states
- **Tamil** (தமிழ்) - Tamil Nadu
- **Marathi** (मराठी) - Maharashtra

---

## Quick Start

```bash
# 1. Set up environment
export GOOGLE_API_KEY="your-key"
source .venv/bin/activate

# 2. Run Phase 1 translation
python scripts/translate_templates_gemma.py

# 3. Review output
cat backend/prisma/seeds/templates_priority_odia_phase1.json

# 4. Commit to git
git add backend/prisma/seeds/templates_priority_odia_phase1.json
git commit -m "Add Phase 1 Odia translations (100 priority templates)"
git push origin main
```

**Questions?** Review logs and check translations for quality before deployment.
