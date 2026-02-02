# 🚀 Deploy Santaan to Render (Free Tier)

**Total Cost**: $0/month  
**Database**: Free PostgreSQL (90 days, then upgrade to $7/month)  
**Services**: Auto-sleep after 15 min (wakes in ~30 seconds on request)  
**Deployment Time**: ~10 minutes

---

## ✅ Pre-Deployment Checklist

- [ ] GitHub account with repository access
- [ ] Render account (sign up at [render.com](https://render.com))
- [ ] Repository pushed to GitHub (already done: `satishskid/santaan-counsel`)

---

## 🎯 One-Click Deploy (Recommended)

### Step 1: Deploy via Blueprint

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com

2. **Create New Blueprint**
   - Click "New" → "Blueprint"
   - Connect GitHub account if not already connected
   - Select repository: `satishskid/santaan-counsel`
   - Branch: `main`

3. **Render Auto-Detects `render.yaml`**
   - File already exists in repository
   - Defines 3 services: Database, Backend, Frontend
   - All environment variables auto-configured

4. **Click "Apply"**
   - Render creates all services automatically
   - Database provisioned first
   - Backend connects to database
   - Frontend connects to backend

5. **Wait for Deployment** (~10 minutes)
   - Database: ~2 minutes
   - Backend: ~5 minutes (migrations + seeding)
   - Frontend: ~3 minutes (build + deploy)

6. **Access Application**
   - Frontend URL: `https://santaan-frontend.onrender.com`
   - Backend API: `https://santaan-backend.onrender.com`
   - Login: `admin` / `demo` / `admin123`

---

## 🔧 Manual Deploy (Alternative)

If blueprint doesn't work, deploy services individually:

### Step 1: Create Database

1. **Dashboard → New → PostgreSQL**
   - Name: `santaan-db`
   - Database: `santaan_db`
   - User: `santaan`
   - Region: `Oregon (US West)`
   - Plan: `Free`
   - Click "Create Database"

2. **Copy Internal Database URL**
   - Format: `postgresql://user:pass@host:5432/db?sslmode=require`
   - Save for backend configuration

### Step 2: Deploy Backend

1. **Dashboard → New → Web Service**
   - Connect repository: `satishskid/santaan-counsel`
   - Name: `santaan-backend`
   - Region: `Oregon (US West)`
   - Branch: `main`
   - Root Directory: _(leave empty)_
   - Runtime: `Node`
   - Build Command:
     ```bash
     cd backend && npm install && npx prisma generate
     ```
   - Start Command:
     ```bash
     cd backend && npx prisma migrate deploy && npx prisma db seed && npm start
     ```
   - Plan: `Free`

2. **Environment Variables**
   - `NODE_ENV` = `production`
   - `PORT` = `3000`
   - `DATABASE_URL` = _(paste Internal Database URL from Step 1)_
   - `JWT_SECRET` = _(generate random 32+ char string)_
   - `CORS_ORIGIN` = `https://santaan-frontend.onrender.com` _(update after frontend deploy)_

3. **Advanced Settings**
   - Health Check Path: `/api/health`
   - Auto-Deploy: `Yes`

4. **Click "Create Web Service"**
   - Wait ~5 minutes for deployment
   - Check logs for "Server running on port 3000"

### Step 3: Deploy Frontend

1. **Dashboard → New → Static Site**
   - Connect repository: `satishskid/santaan-counsel`
   - Name: `santaan-frontend`
   - Branch: `main`
   - Root Directory: _(leave empty)_
   - Build Command:
     ```bash
     cd frontend && npm install && VITE_API_URL=https://santaan-backend.onrender.com npm run build
     ```
   - Publish Directory: `frontend/dist`
   - Plan: `Free`

2. **Environment Variables**
   - `VITE_API_URL` = `https://santaan-backend.onrender.com`

3. **Click "Create Static Site"**
   - Wait ~3 minutes for build
   - Site available at `https://santaan-frontend.onrender.com`

### Step 4: Update Backend CORS

1. **Go to Backend Service Settings**
   - Environment → Edit `CORS_ORIGIN`
   - Set to: `https://santaan-frontend.onrender.com`
   - Click "Save Changes"
   - Service auto-redeploys

---

## ✅ Verification

### Test Backend API

```bash
curl https://santaan-backend.onrender.com/api/health
```

**Expected Response**:
```json
{
  "status": "ok",
  "timestamp": "2026-02-02T12:34:56.789Z",
  "database": "connected",
  "uptime": 123.456
}
```

### Test Authentication

```bash
curl -X POST https://santaan-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","clinicDomain":"demo","password":"admin123"}'
```

**Expected**: JWT token returned

### Test Frontend

1. Visit `https://santaan-frontend.onrender.com`
2. Login with: `admin` / `demo` / `admin123`
3. Dashboard should load with patient list
4. Navigate to Templates page (should show 810 templates)

---

## 🔥 Important: Free Tier Limitations

### Database
- ✅ **Free for 90 days**
- ⚠️ **Expires after 90 days** → Upgrade to $7/month or migrate data
- 📊 **1 GB storage limit**
- 🔄 **No automatic backups** (manual backups recommended)

### Backend Service
- ✅ **750 hours/month free** (31.25 days = unlimited)
- 😴 **Sleeps after 15 minutes of inactivity**
- ⏰ **Wakes in ~30 seconds on first request**
- 💾 **512 MB RAM limit**
- 🚫 **No persistent disk** (use database for storage)

### Frontend (Static Site)
- ✅ **100% free forever**
- 🚀 **Served from global CDN**
- ⚡ **No sleep** (always available)
- 📦 **100 GB bandwidth/month**

### Workarounds for Sleep

**Option 1: Keep-Alive Service (External)**
```bash
# Use cron-job.org or UptimeRobot (free)
# Ping every 14 minutes:
curl https://santaan-backend.onrender.com/api/health
```

**Option 2: Upgrade to Paid ($7/month)**
- No sleep
- 2 GB RAM
- Faster response times

---

## 🔄 Auto-Deploy on Git Push

Render automatically deploys when you push to `main` branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

**Deployment Process**:
1. Render detects push
2. Runs build commands
3. Runs database migrations
4. Deploys new version
5. Zero downtime (blue-green deployment)

---

## 🗄️ Database Backups (Critical for Free Tier)

### Manual Backup

1. **Get Database Credentials**
   - Dashboard → Database → Connection Details
   - Copy `External Database URL`

2. **Run pg_dump**
   ```bash
   pg_dump "postgresql://user:pass@host:5432/db?sslmode=require" > backup.sql
   ```

3. **Compress Backup**
   ```bash
   gzip backup.sql
   # Creates: backup.sql.gz
   ```

### Restore from Backup

```bash
gunzip -c backup.sql.gz | psql "postgresql://user:pass@host:5432/db?sslmode=require"
```

### Schedule Backups (Recommended)

**Option 1: Local Cron Job**
```bash
# Add to crontab (every day at 2 AM)
0 2 * * * pg_dump "postgresql://..." | gzip > ~/santaan-backups/backup-$(date +\%Y\%m\%d).sql.gz
```

**Option 2: Render Cron Job ($7/month)**
- Create cron job service on Render
- Runs backup script daily
- Uploads to S3/Google Cloud Storage

---

## 📊 Monitoring

### Render Dashboard
- View logs in real-time
- Monitor CPU/RAM usage
- Track deployment history
- View HTTP request metrics

### Health Check Endpoint
```bash
# Check service status
curl https://santaan-backend.onrender.com/api/health

# Check templates count
curl https://santaan-backend.onrender.com/api/templates/all | jq 'length'
# Expected: 810
```

### Email Alerts
- Render sends email on deploy failures
- Configure in: Settings → Notifications

---

## 🔐 Security Best Practices

### Environment Variables
- ✅ Never commit `.env` to Git
- ✅ Use Render's secret environment variables
- ✅ Rotate JWT_SECRET monthly
- ✅ Use strong database passwords (auto-generated by Render)

### CORS Configuration
- ✅ Set `CORS_ORIGIN` to exact frontend URL
- ❌ Never use `*` in production
- ✅ Update when changing frontend domain

### Database Access
- ✅ Use Internal Database URL for backend (faster)
- ✅ Use External Database URL only for backups
- ❌ Never expose database URL publicly

---

## 🚨 Troubleshooting

### Backend Won't Start

**Check Logs**:
```
Dashboard → santaan-backend → Logs
```

**Common Issues**:
- `DATABASE_URL` not set → Add in environment variables
- Migration failed → Check database connection
- Port conflict → Ensure `PORT=3000` in env vars

**Fix**: Redeploy with correct environment variables

### Frontend Shows 404

**Check Build Logs**:
```
Dashboard → santaan-frontend → Logs
```

**Common Issues**:
- Build failed → Check `package.json` scripts
- Wrong publish directory → Should be `frontend/dist`
- Missing `VITE_API_URL` → Add in environment variables

**Fix**: Update build command and redeploy

### API Calls Fail (CORS Error)

**Check Browser Console**:
```
Access to fetch at 'https://santaan-backend.onrender.com/api/...' 
from origin 'https://santaan-frontend.onrender.com' has been blocked by CORS
```

**Fix**:
1. Update backend `CORS_ORIGIN` environment variable
2. Set to: `https://santaan-frontend.onrender.com`
3. Save and wait for redeploy

### Database Connection Timeout

**Check Database Status**:
```
Dashboard → santaan-db → Status
```

**Common Issues**:
- Database suspended (free tier expired) → Upgrade to paid
- Connection limit reached → Restart database
- Wrong connection string → Verify `DATABASE_URL`

**Fix**: Restart database service

### Slow First Request (~30 seconds)

**This is normal on free tier**:
- Service sleeps after 15 min inactivity
- First request wakes service (~30 seconds)
- Subsequent requests fast (<100ms)

**Solutions**:
1. Use keep-alive service (cron-job.org)
2. Upgrade to paid plan ($7/month - no sleep)
3. Add loading message: "Waking up server, please wait..."

---

## 💰 Cost Estimation

### Free Tier (First 90 Days)
- Database: **$0** (then $7/month)
- Backend: **$0** (with auto-sleep)
- Frontend: **$0** (forever free)
- **Total**: **$0/month**

### After 90 Days (Keep Free Tier)
- Migrate database to external provider (Neon, Supabase) → **$0-5/month**
- Backend: **$0** (keep auto-sleep)
- Frontend: **$0**
- **Total**: **$0-5/month**

### Recommended Production Setup
- Database: **$7/month** (Render PostgreSQL, no expiry)
- Backend: **$7/month** (no sleep, faster)
- Frontend: **$0** (static site always free)
- **Total**: **$14/month**

---

## 🎯 Next Steps After Deployment

1. **Test All Features**
   - Login with all demo users
   - Create patient
   - Add timeline events
   - Test templates (810 loaded)
   - Test protocols (7 active)
   - Test acronym expansion (16 acronyms)

2. **Set Up Backups**
   - Schedule daily database backups
   - Store in Google Drive / Dropbox
   - Test restore procedure

3. **Configure Custom Domain** (Optional)
   - Register domain (Namecheap, Google Domains)
   - Add to Render settings
   - Automatic SSL via Let's Encrypt
   - Update `CORS_ORIGIN` in backend

4. **Monitor Performance**
   - Check logs daily for first week
   - Monitor response times
   - Track error rates
   - Adjust resources if needed

5. **Plan for Database Expiry**
   - Set calendar reminder for Day 80
   - Option A: Upgrade to $7/month Render PostgreSQL
   - Option B: Migrate to Neon/Supabase (free tier)
   - Export backup before migration

---

## 📞 Support

- **Render Docs**: https://render.com/docs
- **Render Community**: https://community.render.com
- **Project Issues**: https://github.com/satishskid/santaan-counsel/issues
- **Deployment Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for other platforms

---

## ✅ Deployment Checklist

Before marking complete:

- [ ] Blueprint deployed successfully (or manual deploy complete)
- [ ] Database shows "Available" status
- [ ] Backend health check returns `{"status":"ok"}`
- [ ] Frontend loads at `https://santaan-frontend.onrender.com`
- [ ] Login works with `admin/demo/admin123`
- [ ] Dashboard shows patient list
- [ ] Templates page shows 810 templates
- [ ] Protocols page shows 7 protocols
- [ ] Can create and view timeline events
- [ ] Database backup tested and working
- [ ] Custom domain configured (if applicable)
- [ ] Calendar reminder set for database expiry (Day 80)

**Status**: 🟢 **READY TO DEPLOY**

---

**Last Updated**: February 2026  
**Repository**: https://github.com/satishskid/santaan-counsel  
**Deployment Method**: Render Blueprint (render.yaml)
