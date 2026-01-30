# Template Generation Strategy: Groq + Claude Pipeline

## Problem
- **Current**: 66/720 templates (9% complete)
- **Manual creation**: Too slow for 654 remaining templates
- **Need**: Speed + Quality

## Solution: Two-Tier AI Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   INPUT: Event Types                    │
│  (IUI, PGT-A, Complications, Counseling, Administrative)│
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │   GROQ (Speed Layer)  │
         │  llama-3.1-70b        │
         │  - Ultra fast         │
         │  - Bulk generation    │
         │  - $0.05/1M tokens    │
         │  - 100 templates/min  │
         └───────────┬───────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │  CLAUDE (Quality)     │
         │  Sonnet 4             │
         │  - Medical accuracy   │
         │  - Empathy check      │
         │  - Cultural nuance    │
         │  - Approve/Reject     │
         └───────────┬───────────┘
                     │
                     ▼
              ┌──────────┐
              │ Rejected │──────┐
              └──────────┘      │
                     │          │
                     │          │ Feedback loop
                     │          │ (2-3 iterations)
                     ▼          │
              ┌──────────┐      │
              │ Approved │◄─────┘
              └─────┬────┘
                    │
                    ▼
         ┌──────────────────────┐
         │  JSON Template Files │
         │  Auto-commit to Git  │
         └──────────────────────┘
```

## Economics

### **Option 1: Pure Claude** (current approach)
- Speed: ~10 templates/hour (manual)
- Cost: $3/1M input, $15/1M output
- Time to 654 templates: **65 hours**
- Cost: ~$50-100

### **Option 2: Groq + Claude** (recommended)
- Groq generates: 100 templates/hour @ $0.05/1M
- Claude validates: 100 templates/hour @ $3/1M
- Time to 654 templates: **7 hours** (10x faster!)
- Cost: ~$10-20 (5x cheaper!)

## Implementation Steps

### **Phase 1: Setup (10 minutes)**
```bash
# Install dependencies
pip install groq anthropic

# Set API keys
export GROQ_API_KEY="your_groq_key"
export ANTHROPIC_API_KEY="your_claude_key"

# Run generator
python scripts/generate_templates.py
```

### **Phase 2: Execution** (automated)
1. **Groq generates** 3-5 variants per event
2. **Claude validates** for medical accuracy, empathy, cultural fit
3. **Auto-retry** rejected templates with feedback
4. **Save** approved templates to JSON
5. **Commit** to Git automatically

### **Phase 3: Human Review** (30 minutes)
- Spot-check 10% random sample
- Test in UI with demo patients
- Embryologist review for lab terminology
- RE (doctor) review for clinical accuracy

## Advantages

✅ **Speed**: 10x faster (7 hours vs 65 hours)  
✅ **Cost**: 5x cheaper ($10 vs $50)  
✅ **Quality**: Claude ensures medical accuracy  
✅ **Scale**: Generate 1000s of variants easily  
✅ **Consistency**: Groq maintains style/structure  
✅ **Iteration**: Auto-refinement loop

## Alternative: Just Groq?

**Why NOT Groq-only:**
- Medical accuracy critical (one error = patient harm)
- Empathy nuance (Groq can be mechanical)
- Cultural sensitivity (requires human-like judgment)
- Liability risk (wrong dosage, timeline, advice)

**Claude's role:** Safety net + quality gate

## Next Actions

**Option A**: Run the pipeline script (generates all 654 templates in 7 hours)  
**Option B**: Pilot with 50 templates first (1 hour, validate approach)  
**Option C**: I (Claude) continue manually but use Groq for channel/language variants

**Recommendation:** **Option B** (pilot 50 templates)
- Test IUI pathway (20 templates)
- Test PGT-A pathway (25 templates)
- Validate quality before scaling to 654

Ready to run pilot? 🚀
