# Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/santaan-ivf)

## Prerequisites

1. **Neon Database** (Free serverless Postgres)
   - Sign up at [neon.tech](https://neon.tech)
   - Create a new database
   - Copy the connection string

2. **Netlify Account** (Free)
   - Sign up at [netlify.com](https://netlify.com)

## One-Click Deploy Steps

### Step 1: Set Up Neon Database

```bash
# 1. Go to https://neon.tech and create account
# 2. Create new project: "santaan-ivf"
# 3. Copy connection string (looks like):
postgresql://user:password@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### Step 2: Deploy to Netlify

Click the deploy button above or:

1. Fork this repository to your GitHub
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub and select your fork
5. **Build settings** (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
   - Functions directory: `netlify/functions`

### Step 3: Configure Environment Variables

In Netlify dashboard → Site settings → Environment variables:

```bash
# Database
DATABASE_URL=postgresql://user:password@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# Auth
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# App
NODE_ENV=production
```

### Step 4: Initialize Database

After first deploy:

1. Go to Netlify Functions logs
2. Find the URL: `https://your-site.netlify.app/.netlify/functions/migrate`
3. Visit that URL to run migrations and seed data

**Default Login Credentials:**
- Email: `admin@demo.clinic`
- Password: `admin123`

---

## Local Development with Neon

```bash
# 1. Clone repository
git clone https://github.com/YOUR_USERNAME/santaan-ivf.git
cd santaan-ivf

# 2. Install dependencies
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# 3. Create .env file in backend/
cp backend/.env.example backend/.env

# 4. Add your Neon connection string to backend/.env
DATABASE_URL="postgresql://user:password@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# 5. Run database migrations
cd backend
npx prisma migrate deploy
npx prisma db seed

# 6. Start development servers
npm run dev
```

Frontend runs on: http://localhost:5173  
Backend runs on: http://localhost:3000

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Netlify Hosting                           │
├─────────────────────────────────────────────────────────────────┤
│  Frontend (React SPA)          │  Serverless Functions (API)    │
│  /frontend/dist                │  /netlify/functions            │
│  - React + Vite                │  - Express.js adapters         │
│  - Tailwind CSS                │  - REST API endpoints          │
│  - Zustand state               │  - JWT authentication          │
└────────────────────────────────┴────────────────────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │   Neon Database          │
                    │   (Serverless Postgres)  │
                    │   - Auto-scaling         │
                    │   - 0.5GB free tier      │
                    └──────────────────────────┘
```

---

## Features Available After Deploy

✅ **Authentication** - JWT-based login  
✅ **Patient Management** - CRUD operations  
✅ **Timeline Events** - Track clinical + psychological journey  
✅ **Acronym Expansion** - Medical shorthand → Full records  
✅ **Reaction Capture** - Patient understanding & anxiety tracking  
✅ **Template System** - Pre-built communication templates  
✅ **Action Recommendations** - Context-aware next steps  

---

## Cost Estimate

- **Netlify**: FREE (100GB bandwidth, 300 build minutes/month)
- **Neon**: FREE (0.5GB storage, 3 projects)
- **Total**: $0/month for MVP

---

## Support

For deployment issues:
1. Check Netlify deploy logs
2. Verify environment variables are set
3. Ensure Neon database is accessible
4. Check `.netlify/functions` logs for API errors

---

## Security Notes

🔒 **Before Production:**
1. Change JWT_SECRET to a strong random value
2. Enable Netlify's form spam protection
3. Set up Neon IP allowlist if needed
4. Add rate limiting to API functions
5. Enable HTTPS redirect (auto in Netlify)
