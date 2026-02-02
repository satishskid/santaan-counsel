# 🚀 Quick Deploy to Render (Free Tier)

**Time**: 10 minutes | **Cost**: $0/month (90 days)

## One-Click Deploy

### Option 1: Blueprint Deploy (Easiest)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/satishskid/santaan-counsel)

1. Click button above
2. Connect GitHub account
3. Fill in:
   - `CORS_ORIGIN`: Your frontend URL (e.g., `https://santaan-frontend.onrender.com`)
   - `VITE_API_URL`: Your backend URL (e.g., `https://santaan-backend.onrender.com`)
4. Click "Apply"
5. Wait ~10 minutes

**Access**: `https://santaan-frontend.onrender.com`  
**Login**: `admin` / `demo` / `admin123`

---

### Option 2: Manual Deploy

#### Step 1: Create Database (2 min)

```
Dashboard → New → PostgreSQL
- Name: santaan-db
- Database: santaan_db  
- Region: Oregon
- Plan: Free
→ Create Database
```

Copy **Internal Database URL**

#### Step 2: Deploy Backend (5 min)

```
Dashboard → New → Web Service
- Repo: satishskid/santaan-counsel
- Name: santaan-backend
- Region: Oregon
- Runtime: Node
- Build: cd backend && npm ci && npx prisma generate
- Start: cd backend && npx prisma migrate deploy && npx prisma db seed && npm start
- Plan: Free
```

**Environment Variables**:
```
NODE_ENV=production
PORT=10000
DATABASE_URL=<paste Internal Database URL>
JWT_SECRET=<generate 32+ random chars>
CORS_ORIGIN=https://santaan-frontend.onrender.com
```

**Advanced**:
- Health Check Path: `/api/health`
- Auto-Deploy: Yes

#### Step 3: Deploy Frontend (3 min)

```
Dashboard → New → Static Site
- Repo: satishskid/santaan-counsel
- Name: santaan-frontend
- Build: cd frontend && npm ci && npm run build
- Publish: frontend/dist
- Plan: Free
```

**Environment Variables**:
```
VITE_API_URL=https://santaan-backend.onrender.com
```

#### Step 4: Update CORS

Go back to backend → Environment → Update:
```
CORS_ORIGIN=https://santaan-frontend.onrender.com
```

---

## ✅ Verify Deployment

```bash
# Test backend
curl https://santaan-backend.onrender.com/api/health

# Test login
curl -X POST https://santaan-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","clinicDomain":"demo","password":"admin123"}'

# Visit frontend
open https://santaan-frontend.onrender.com
```

---

## ⚠️ Free Tier Notes

- **Database**: Free for 90 days, then $7/month
- **Backend**: Sleeps after 15 min (wakes in ~30 sec)
- **Frontend**: Free forever, no sleep
- **First request**: Slow (~30 sec wake-up)
- **Subsequent**: Fast (<100ms)

**Tip**: Use [cron-job.org](https://cron-job.org) to ping `/api/health` every 14 min to prevent sleep.

---

## 📊 What Gets Deployed

- ✅ PostgreSQL Database
- ✅ 810 Communication Templates (English & Odia)
- ✅ 7 Treatment Protocols
- ✅ 16 Medical Acronyms
- ✅ 6 Demo Users (Admin, Doctor, Nurse, Embryologist, Counselor, Receptionist)
- ✅ JWT Authentication
- ✅ Timeline System
- ✅ React Frontend with Tailwind UI

---

## 🔧 Post-Deploy

1. **Set Calendar Reminder**: Day 80 (database expiry warning)
2. **Schedule Backups**: Use `pg_dump` weekly
3. **Monitor Logs**: Check for errors first week
4. **Custom Domain** (optional): Settings → Custom Domain → Add

---

## 📞 Need Help?

- Full Guide: [RENDER_DEPLOY.md](./RENDER_DEPLOY.md)
- Troubleshooting: [RENDER_DEPLOY.md#troubleshooting](./RENDER_DEPLOY.md#troubleshooting)
- Issues: https://github.com/satishskid/santaan-counsel/issues

---

**Repository**: https://github.com/satishskid/santaan-counsel  
**Status**: ✅ Ready to Deploy
