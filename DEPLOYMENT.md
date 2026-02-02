# Santaan IVF Platform - Deployment Guide

## Quick Deployment (5 Minutes)

### Prerequisites
- Docker & Docker Compose installed
- 2GB+ RAM available
- Ports 80, 3000, 5432 available

### Step 1: Clone Repository
```bash
git clone https://github.com/satishskid/santaan-counsel.git
cd santaan-counsel
```

### Step 2: Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your values
nano .env  # or use your favorite editor
```

**Required Variables:**
- `DB_PASSWORD`: Secure database password (min 16 chars)
- `JWT_SECRET`: Random string for JWT signing (min 32 chars)

### Step 3: Deploy
```bash
# Make deploy script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

The script will:
1. ✅ Validate environment variables
2. 🔨 Build Docker images
3. 🚀 Start all services
4. 📊 Run database migrations
5. 🌱 Seed initial data
6. ✅ Verify health checks

### Step 4: Access Application
- **Frontend**: http://localhost
- **API**: http://localhost:3000
- **Health**: http://localhost:3000/health

**Default Credentials:**
- Username: `admin`
- Domain: `demo`
- Password: `admin123`

⚠️ **Change default password immediately in production!**

---

## Deployment Platforms

### AWS Lightsail ($12-20/month)

1. **Create Instance**
   - Choose "OS Only" → Ubuntu 22.04
   - Select plan: 2GB RAM / 1 vCPU
   - Enable ports: 80, 443, 22

2. **Connect via SSH**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Docker**
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker ubuntu
   newgrp docker
   
   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

4. **Deploy Application**
   ```bash
   git clone https://github.com/satishskid/santaan-counsel.git
   cd santaan-counsel
   cp .env.example .env
   nano .env  # Set your values
   chmod +x deploy.sh
   ./deploy.sh
   ```

5. **Set Up SSL (Optional but Recommended)**
   ```bash
   # Install Certbot
   sudo apt update
   sudo apt install -y certbot
   
   # Get SSL certificate
   sudo certbot certonly --standalone -d your-domain.com
   
   # Update docker-compose.yml to use SSL
   # Add volumes for SSL certs and update nginx config
   ```

---

### DigitalOcean Droplet ($12-24/month)

1. **Create Droplet**
   - Choose Ubuntu 22.04
   - Basic Plan: 2GB RAM / 1 vCPU
   - Add SSH key

2. **Same steps as AWS Lightsail** (steps 2-5 above)

---

### Railway.app (Free tier available, ~$20/month for production)

1. **Connect Repository**
   - Sign up at railway.app
   - Click "New Project" → "Deploy from GitHub repo"
   - Select `santaan-counsel` repository

2. **Configure Services**
   Railway auto-detects docker-compose.yml. Add environment variables:
   - `DB_PASSWORD`: Your secure password
   - `JWT_SECRET`: Your JWT secret
   - `DATABASE_URL`: Railway provides this automatically

3. **Deploy**
   - Railway automatically builds and deploys
   - Get public URL from Railway dashboard

---

### Render.com ($25-50/month)

1. **Create Blueprint**
   - New → Blueprint
   - Connect GitHub repository

2. **Configure Services**
   ```yaml
   # render.yaml (create this file)
   services:
     - type: web
       name: santaan-frontend
       env: docker
       dockerfilePath: ./frontend/Dockerfile
       
     - type: web
       name: santaan-backend
       env: docker
       dockerfilePath: ./backend/Dockerfile
       envVars:
         - key: DATABASE_URL
           fromDatabase:
             name: santaan-db
             property: connectionString
         - key: JWT_SECRET
           generateValue: true
   
   databases:
     - name: santaan-db
       databaseName: santaan
       user: santaan_user
   ```

3. **Deploy**
   - Render auto-deploys on git push
   - Get URLs from Render dashboard

---

## Manual Docker Deployment

### On Any Linux Server

```bash
# 1. Install Docker & Docker Compose (see AWS Lightsail steps)

# 2. Clone and configure
git clone https://github.com/satishskid/santaan-counsel.git
cd santaan-counsel
cp .env.example .env
nano .env

# 3. Deploy
chmod +x deploy.sh
./deploy.sh

# 4. Set up reverse proxy (optional)
sudo apt install nginx
sudo nano /etc/nginx/sites-available/santaan

# Add:
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /api {
        proxy_pass http://localhost:3000;
    }
}

sudo ln -s /etc/nginx/sites-available/santaan /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Environment Variables Reference

### Required
```bash
DB_PASSWORD=your-secure-password-min-16-chars
JWT_SECRET=your-jwt-secret-min-32-chars-random-string
```

### Optional
```bash
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Custom Domain
DOMAIN=your-domain.com

# Node Environment
NODE_ENV=production
```

---

## Post-Deployment Checklist

### Security
- [ ] Change default admin password
- [ ] Set strong DB_PASSWORD (min 16 characters)
- [ ] Set random JWT_SECRET (min 32 characters)
- [ ] Enable SSL/TLS certificates
- [ ] Configure firewall (allow only 80, 443, 22)
- [ ] Set up fail2ban for SSH protection

### Backups
- [ ] Configure automated database backups
- [ ] Set up volume snapshots
- [ ] Test restore procedure
- [ ] Document backup schedule

### Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure log aggregation
- [ ] Set up alerts for errors
- [ ] Monitor disk space usage

### Performance
- [ ] Enable HTTPS/HTTP2
- [ ] Configure CDN for static assets (optional)
- [ ] Set up database connection pooling
- [ ] Monitor API response times

### Documentation
- [ ] Document deployment date
- [ ] Record server credentials (securely!)
- [ ] Note any custom configurations
- [ ] Create runbook for common tasks

---

## Useful Commands

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Last 100 lines
docker-compose logs --tail=100 backend
```

### Service Management
```bash
# Stop all services
docker-compose down

# Restart specific service
docker-compose restart backend

# Rebuild and restart
docker-compose up -d --build backend

# Check status
docker-compose ps
```

### Database Management
```bash
# Access database
docker-compose exec postgres psql -U santaan_user -d santaan

# Backup database
docker-compose exec postgres pg_dump -U santaan_user santaan > backup.sql

# Restore database
docker-compose exec -T postgres psql -U santaan_user santaan < backup.sql

# Run migrations
docker-compose exec backend npx prisma migrate deploy

# Seed data
docker-compose exec backend npm run prisma:seed
```

### System Health
```bash
# Check backend health
curl http://localhost:3000/health

# Check frontend
curl http://localhost

# Check database connection
docker-compose exec postgres pg_isready -U santaan_user

# View resource usage
docker stats
```

### Updates
```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Run migrations
docker-compose exec backend npx prisma migrate deploy
```

---

## Troubleshooting

### Services won't start
```bash
# Check logs
docker-compose logs

# Check if ports are in use
lsof -i :80
lsof -i :3000
lsof -i :5432

# Restart Docker
sudo systemctl restart docker
```

### Database connection issues
```bash
# Check database is running
docker-compose ps postgres

# Check database logs
docker-compose logs postgres

# Test connection
docker-compose exec postgres pg_isready -U santaan_user
```

### Frontend not loading
```bash
# Check nginx config
docker-compose exec frontend cat /etc/nginx/conf.d/default.conf

# Check frontend logs
docker-compose logs frontend

# Rebuild frontend
docker-compose up -d --build frontend
```

### Out of disk space
```bash
# Clean up Docker
docker system prune -a --volumes

# Check disk usage
df -h
docker system df
```

---

## Scaling

### Horizontal Scaling
To handle more traffic, run multiple backend instances:

```yaml
# docker-compose.yml
services:
  backend:
    # ... existing config ...
    deploy:
      replicas: 3  # Run 3 backend instances
```

### Vertical Scaling
Allocate more resources to containers:

```yaml
services:
  backend:
    # ... existing config ...
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
```

---

## Backup Strategy

### Automated Daily Backups
```bash
# Create backup script
cat > backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker-compose exec -T postgres pg_dump -U santaan_user santaan | gzip > /backups/santaan_$DATE.sql.gz
# Keep only last 30 days
find /backups -name "santaan_*.sql.gz" -mtime +30 -delete
EOF

chmod +x backup.sh

# Add to crontab (runs daily at 2 AM)
crontab -e
# Add: 0 2 * * * /path/to/backup.sh
```

---

## Cost Estimates

| Platform | Monthly Cost | Notes |
|----------|-------------|-------|
| AWS Lightsail | $12-20 | 2GB RAM instance |
| DigitalOcean | $12-24 | Basic Droplet |
| Railway.app | $0-20 | Free tier available, $20 for production |
| Render.com | $25-50 | Includes managed database |
| VPS (Hetzner) | $5-10 | Europe-based, best value |

---

## Support

- **Documentation**: See [USER_MANUAL.md](USER_MANUAL.md)
- **Issues**: GitHub Issues
- **Email**: Contact your clinic administrator

---

**Santaan IVF Platform** - Ready for production deployment! 🚀
