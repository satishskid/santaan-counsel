# Odia Templates Storage Strategy

## Senior Architect Recommendation

### ✅ Recommended Approach: Split by Category

Split your 200+ Odia templates into **5 JSON files** by category:

```
backend/prisma/seeds/
├── templates_odia_pgta.json         (~40 templates - PGT-A Testing)
├── templates_odia_counseling.json   (~60 templates - Counseling)
├── templates_odia_monitoring.json   (~40 templates - Cycle Monitoring)
├── templates_odia_fet.json          (~40 templates - FET Protocol)
└── templates_odia_egg_freezing.json (~30 templates - Egg Freezing)
```

### Why Split Files?

1. **Maintainability**: Easier to update one category vs. 200-line file
2. **Team Collaboration**: Different staff own different protocols
3. **Performance**: Faster file loading/parsing
4. **Git Conflicts**: Reduced merge conflicts
5. **Versioning**: Category-specific version control

### JSON Structure Per File

```json
[
  {
    "eventName": "PGT-A Results Explanation",
    "category": "pgta",
    "subcategory": "results",
    "channel": "whatsapp",
    "language": "odia",
    "greeting": "ନମସ୍କାର {{patient_name}}! ଡାକ୍ତର {{doctor_name}} ଏଠାରେ।",
    "context": "ଆପଣଙ୍କର PGT-A ପରୀକ୍ଷା ଫଳାଫଳ ଆସିଛି...",
    "explanation": "PGT-A (Preimplantation Genetic Testing...",
    "next_steps": "ଆଗାମୀ ପଦକ୍ଷେପ:\n1. ଆପଣଙ୍କ ଭ୍ରୁଣ ରିପୋର୍ଟ ସମୀକ୍ଷା...",
    "reassurance": "ଏହି ପ୍ରକ୍ରିୟା ସମ୍ପୂର୍ଣ୍ଣ ନିରାପଦ...",
    "call_to_action": "ଦୟାକରି ଆସନ୍ତାକାଲି 10AM ରେ କ୍ଲିନିକକୁ ଆସନ୍ତୁ...",
    "contact_info": "କୌଣସି ପ୍ରଶ୍ନ? କଲ କରନ୍ତୁ: {{clinic_phone}}"
  }
]
```

### Variables Supported

- `{{patient_name}}` - Patient's first name
- `{{doctor_name}}` - Treating physician
- `{{clinic_name}}` - Clinic name
- `{{clinic_phone}}` - Clinic phone
- `{{date}}` - Appointment date
- `{{time}}` - Appointment time
- `{{test_results}}` - Lab results
- `{{embryo_count}}` - Number of embryos
- `{{next_visit}}` - Next appointment

### Required Fields

```javascript
{
  eventName: string,      // e.g., "PGT-A Results Explanation"
  category: string,       // pgta | counseling | monitoring | fet | egg_freezing
  subcategory?: string,   // Optional: results | appointment | medication
  channel: string,        // whatsapp | sms | verbal
  language: "odia",       // Fixed for these templates
  
  // The 7 Core Components:
  greeting: string,
  context: string,
  explanation: string,
  next_steps: string,
  reassurance: string,
  call_to_action: string,
  contact_info: string
}
```

## Implementation Steps

### Step 1: Create JSON Files

Save your 200+ templates into 5 JSON files as shown above.

### Step 2: Run Import Script

```bash
cd backend
node prisma/seeds/import_odia_templates.js
```

This will:
- ✅ Load all `templates_odia_*.json` files
- ✅ Transform to Prisma schema format
- ✅ Insert in batches of 50
- ✅ Skip duplicates
- ✅ Show import summary

### Step 3: Verify Database

```bash
# Check total Odia templates
npx prisma studio

# Or via API
curl http://localhost:3000/api/templates?language=odia
```

### Step 4: Update Frontend (If Needed)

Your EventBubble component already supports language badges. No changes needed!

```jsx
// Existing code in EventBubble.jsx already handles:
<Badge variant="outline" className={languageColors[template.language]}>
  {template.language === 'odia' ? 'ଓଡ଼ିଆ' : template.language}
</Badge>
```

## Alternative: Single File Approach

If you prefer ONE file:

```
templates_odia_all.json  (~200 templates in single array)
```

**Pros**: Single file to manage  
**Cons**: Large file (slower edits), harder to maintain

## Database Schema Compatibility

Your existing Prisma schema already supports Odia:

```prisma
model Template {
  id          String   @id @default(uuid())
  clinicId    String
  name        String
  eventType   String
  category    String
  language    String   // ✅ 'english' | 'hinglish' | 'odia'
  channel     String   // ✅ 'whatsapp' | 'sms' | 'verbal'
  content     String   @db.Text
  talkingPoints Json?
  triggerConditions Json?
  usageCount  Int      @default(0)
  isActive    Boolean  @default(true)
  
  clinic      Clinic   @relation(fields: [clinicId], references: [id])
  @@index([language, eventType])
}
```

No migration needed! ✅

## API Endpoints Ready

```javascript
// Get all Odia templates
GET /api/templates?language=odia

// Get Odia template for specific event
GET /api/templates?eventType=pgta_results&language=odia

// Render with patient variables
POST /api/templates/render
{
  "templateId": "...",
  "variables": {
    "patient_name": "Priya",
    "doctor_name": "Dr. Sharma"
  }
}
```

## Validation Script

```bash
# Use existing validator
python scripts/validate_odia.py templates_odia_pgta.json
```

## Rollback Plan

If anything breaks:

```bash
# Delete all Odia templates
npx prisma studio
# Filter: language = 'odia'
# Delete all

# Or via SQL
npx prisma db execute --stdin <<< "DELETE FROM Template WHERE language = 'odia';"
```

## Summary

✅ **Store in PostgreSQL** (consistent with existing architecture)  
✅ **Split into 5 category files** (maintainability)  
✅ **Use import script** (automated, validated)  
✅ **No schema changes** (existing structure supports Odia)  
✅ **API already works** (just filter by language=odia)  
✅ **Frontend ready** (language badge system)

**Estimated Time**: 1 hour to organize + import all 200 templates

---

## Next Actions

1. **Create the 5 JSON files** with your templates
2. **Run `node prisma/seeds/import_odia_templates.js`**
3. **Test via API** `/api/templates?language=odia`
4. **Verify in frontend** EventBubble component

Need help organizing your 200+ templates into the 5 files? I can help you split them by category!
