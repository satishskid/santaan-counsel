# ⚡ Quick Reference - Deploy & Run

## 🚀 Deploy to Production (10 minutes)

### Step 1: Get Database (2 min)
```
→ Go to https://neon.tech
→ Sign up (FREE)
→ Create project: "santaan-ivf"
→ Copy connection string
```

### Step 2: Deploy (3 min)
```
→ Push code to GitHub
→ Go to https://netlify.com
→ Click "Add new site"
→ Import from GitHub
→ Select repository
→ Click "Deploy"
```

### Step 3: Configure (2 min)
```
In Netlify Dashboard:
→ Site settings → Environment variables
→ Add: DATABASE_URL = <your neon connection string>
→ Add: JWT_SECRET = <any random string>
→ Save & Redeploy
```

### Step 4: Initialize (1 min)
```
→ Visit: https://your-site.netlify.app/.netlify/functions/migrate
→ Wait for "success: true"
```

### Step 5: Login (1 min)
```
→ Visit: https://your-site.netlify.app
→ Email: admin@demo.clinic
→ Password: admin123
→ Click patient → See timeline!
```

**Total Cost: $0/month** (FREE tier)

---

## 🖥️ Run Locally (5 minutes)

### Quick Start
```bash
# 1. Get Neon database URL from neon.tech

# 2. Create backend/.env
echo 'DATABASE_URL="postgresql://..."' > backend/.env
echo 'JWT_SECRET="my-secret-key"' >> backend/.env

# 3. Run
./start.sh

# Opens:
# → Frontend: http://localhost:5173
# → Backend: http://localhost:3000

# 4. Login
# → Email: admin@demo.clinic
# → Password: admin123
```

---

## 📁 Key Files Reference

### Configuration Files
```
netlify.toml              ← Netlify config
package.json              ← Build scripts
backend/.env              ← Database + secrets
backend/prisma/schema.prisma  ← 11-table schema
```

### API Endpoints
```
POST /api/auth/login              ← Login
GET  /api/patients                ← List patients
GET  /api/patients/:id            ← Patient details
GET  /api/timeline/patient/:id    ← Timeline events
POST /api/timeline/events         ← Create event
POST /api/acronyms/expand         ← Expand acronyms
GET  /api/templates?eventType=X   ← Get templates
```

### Frontend Routes
```
/login                    ← Login page
/dashboard                ← Patient list
/patients/:id             ← Timeline view (main screen)
```

### Serverless Functions
```
/.netlify/functions/api       ← All API routes
/.netlify/functions/migrate   ← Database setup
```

---

## 🎨 UI Components

### Main Screen Layout
```
┌─────────────────────────────────┬──────────────────┐
│  Timeline (Left 8 cols)         │  Actions (Right) │
│  ├─ Event 1                     │  Alert Card      │
│  │  ├─ Clinical data            │  Quick Context   │
│  │  └─ Reaction                 │  Recommendations │
│  ├─ Event 2                     │  Templates       │
│  └─ Event 3                     │                  │
└─────────────────────────────────┴──────────────────┘
```

### Key Components
```javascript
<PatientView />           ← Main container
  <TimelineView />        ← Timeline display (tree)
    <EventCard />         ← Individual events
  <ActionPanel />         ← Situation + actions
  <AddEventModal />       ← 2-step event creation
```

---

## 📊 Demo Data

**Clinic:**
- Demo IVF Clinic

**Users:**
- admin@demo.clinic / admin123
- doctor@demo.clinic / doctor123
- nurse1@demo.clinic / nurse123

**Patient:**
- Priya Sharma (MR-2026-001)
- Cycle #1, Day 7, monitoring phase
- 3 timeline events

**Templates:**
- 15+ pre-built messages

**Acronyms:**
- 50+ medical terms (E2, AFC, FSH, etc.)

---

## 🔧 Common Commands

### Local Development
```bash
./start.sh                    # Start everything
npm run dev                   # Start dev servers
npm run build:all             # Build for production
```

### Database
```bash
cd backend
npx prisma migrate dev        # Create migration
npx prisma migrate deploy     # Apply migrations
npx prisma db seed            # Seed demo data
npx prisma studio             # Open DB viewer
```

### Deployment
```bash
git push origin main          # Auto-deploys on Netlify
```

---

## 🐛 Troubleshooting

### "Database connection failed"
```
✓ Check DATABASE_URL in .env or Netlify
✓ Verify Neon database is running
✓ Check connection string format
```

### "Login not working"
```
✓ Check JWT_SECRET is set
✓ Clear browser cache/cookies
✓ Check browser console for errors
```

### "Timeline not loading"
```
✓ Run /migrate endpoint
✓ Check browser network tab
✓ Verify API_URL in frontend/.env
```

### "Build failed on Netlify"
```
✓ Check build logs in Netlify dashboard
✓ Verify all environment variables set
✓ Check package.json scripts
```

---

## 📚 Documentation

- **UI Walkthrough**: [docs/UI_WALKTHROUGH.md](./docs/UI_WALKTHROUGH.md)
- **UX Design**: [docs/UX_REDESIGN.md](./docs/UX_REDESIGN.md)
- **Deployment**: [DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md)
- **Architecture**: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- **Summary**: [DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md)

---

## ✅ What Works

- ✅ Login/logout (JWT auth)
- ✅ Patient dashboard
- ✅ Timeline view (tree structure)
- ✅ Add events (2-step modal)
- ✅ Acronym expansion
- ✅ Reaction capture
- ✅ Action recommendations
- ✅ Template suggestions
- ✅ Role-based access

---

## 🎯 Next Steps

**Deploy Production:**
1. Get Neon database
2. Deploy to Netlify
3. Configure environment
4. Initialize database
5. Test & launch

**Or Test Locally:**
1. Get Neon database
2. Create backend/.env
3. Run ./start.sh
4. Test at localhost:5173

---

## 💡 Key Features

**For Medical Staff:**
- See complete patient journey in 2 seconds
- System tells you what needs attention
- Acronyms auto-expand
- Reaction tracking

**For Clinic:**
- $0/month deployment
- Single-click setup
- No server management
- Auto-scaling

---

**Choose your path:**
- 🚀 [Deploy Now](./DEPLOY_NETLIFY.md)
- 🖥️ [Test Locally](./start.sh)
- 📖 [Read Docs](./docs/)

**Need help?** Check troubleshooting section above or review full documentation.
