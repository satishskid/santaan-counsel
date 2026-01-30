# How to Generate Templates and Submit

## Step 1: Choose Your AI Tool

### Option A: Groq (Fastest, Free/Cheap)
- Go to: https://console.groq.com/
- Sign up for free account
- Get API key OR use playground
- Model: `llama-3.3-70b-versatile` or `llama-3.1-70b-versatile`
- **Advantage:** Extremely fast, good quality
- **Limitation:** Rate limits on free tier (generate in batches)

### Option B: Claude (Best Quality)
- Go to: https://claude.ai
- Use Claude 3.5 Sonnet or Claude 3 Opus
- **Advantage:** Excellent medical accuracy, empathy
- **Limitation:** Slower, may have usage limits

### Option C: ChatGPT (Balanced)
- Go to: https://chat.openai.com
- Use GPT-4 or GPT-4 Turbo
- **Advantage:** Good quality, reliable
- **Limitation:** Token limits, may need multiple sessions

---

## Step 2: Generate Templates

1. **Copy the entire prompt** from `PROMPT_FOR_TEMPLATE_GENERATION.md`

2. **Paste into your chosen AI tool**

3. **Add this instruction at the end:**
   ```
   Generate ALL templates for: [CHOOSE ONE CATEGORY]
   - PGT-A Pathway (25 templates)
   - Complications (30 templates)  
   - Counseling/Emotional Support (25 templates)
   - Administrative/Process (20 templates)
   
   Output as pure JSON array (no markdown, no explanation).
   ```

4. **Wait for generation** (may take 1-3 minutes)

5. **Copy the JSON output**

---

## Step 3: Validate JSON

Before submitting, validate your JSON:

### Quick Check (online):
- Go to: https://jsonlint.com/
- Paste your JSON
- Click "Validate JSON"
- Fix any errors

### Command Line Check (if you have Python):
```bash
python3 -m json.tool your_templates.json > validated.json
```

If no errors, JSON is valid!

---

## Step 4: Save Templates

Create separate files for each category:

```
backend/prisma/seeds/templates_pgta.json          (25 templates)
backend/prisma/seeds/templates_complications.json (30 templates)
backend/prisma/seeds/templates_counseling.json    (25 templates)
backend/prisma/seeds/templates_administrative.json (20 templates)
```

---

## Step 5: Submit to Me

### Option A: Upload Files
1. Create a ZIP file with all JSON files
2. Upload to file sharing service (Google Drive, Dropbox, WeTransfer)
3. Share link with me
4. I'll integrate into the project

### Option B: Paste Directly
For smaller batches (< 30 templates):
1. Just paste the JSON in our chat
2. Say "Here are [X] templates for [Category]"
3. I'll save and integrate

### Option C: GitHub (if you have access)
1. Fork the repository
2. Add templates to `backend/prisma/seeds/`
3. Create pull request
4. I'll review and merge

---

## Step 6: Quality Check (I'll do this)

When you submit, I will:
- ✅ Validate JSON syntax
- ✅ Check all 7 components present
- ✅ Verify medical accuracy (terminology, protocols, timelines)
- ✅ Review empathy markers for sensitive topics
- ✅ Check personalization variables used correctly
- ✅ Integrate into seed.js
- ✅ Test in UI
- ✅ Commit to GitHub

---

## Tips for Best Results:

### For Medical Accuracy:
- If unsure about protocols, ask the AI to cite sources
- Compare against existing templates for consistency
- Flag anything that seems medically questionable

### For Better Quality:
- Generate in smaller batches (10-15 templates at a time)
- Review each template manually before submitting
- Fix obvious errors (typos, wrong variable names)

### For Faster Processing:
- Keep templates in separate files by category
- Use consistent formatting (2-space indentation)
- Validate JSON before submitting

---

## What to Do If AI Generates Bad Templates:

### Regenerate with more specific instructions:
```
The last batch had issues with:
- Medical accuracy (wrong timelines)
- Too casual tone (needs more empathy for negative results)
- Missing personalization variables

Please regenerate with:
- Correct IVF protocols (cite if unsure)
- Empathetic tone for sensitive news
- More {{variable}} usage
```

### Or ask for specific fixes:
```
For template #5 "Total Fertilization Failure":
- Add more empathy markers in verbal version
- Explain what fertilization failure means
- Offer next steps (ICSI, donor eggs)
```

---

## Estimated Time:

- **Per category (25 templates):** 5-10 minutes generation
- **Validation:** 2-3 minutes
- **Total for all 4 categories:** 30-45 minutes

You could complete ALL remaining 634 templates in ~2 hours!

---

## Questions?

Just ask in chat:
- "How do I format Hinglish templates?"
- "What's the correct terminology for [medical term]?"
- "Can you review this batch before I submit?"

Let's generate! 🚀
