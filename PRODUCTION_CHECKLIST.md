# Santaan IVF Platform - Production Checklist

## Pre-Deployment

### Code & Configuration
- [ ] All code committed to git
- [ ] All tests passing (27/27 E2E tests)
- [ ] `.env` file created with production values
- [ ] `DB_PASSWORD` is strong (min 16 characters)
- [ ] `JWT_SECRET` is random (min 32 characters)
- [ ] Default admin password documented to be changed
- [ ] All sensitive data in `.env`, not hardcoded

### Infrastructure
- [ ] Server provisioned (min 2GB RAM)
- [ ] Docker installed
- [ ] Docker Compose installed
- [ ] Ports 80, 443, 22 accessible
- [ ] Firewall configured (block unnecessary ports)
- [ ] SSH keys configured
- [ ] Non-root user created with sudo access

### Domain & SSL
- [ ] Domain DNS configured (A record pointing to server)
- [ ] SSL certificate obtained (Let's Encrypt recommended)
- [ ] HTTPS configured in nginx
- [ ] HTTP → HTTPS redirect enabled

---

## Deployment

### Initial Deployment
- [ ] Repository cloned
- [ ] `.env` configured
- [ ] `deploy.sh` executed successfully
- [ ] All services started (postgres, backend, frontend)
- [ ] Database migrations completed
- [ ] Initial data seeded
- [ ] Health checks passing

### Verification
- [ ] Frontend accessible at http://your-domain.com
- [ ] Backend API accessible at http://your-domain.com/api
- [ ] Can login with admin credentials
- [ ] Can create test patient
- [ ] Can add timeline event
- [ ] Templates loading (810 templates)
- [ ] Protocols loading (7 protocols)
- [ ] Acronyms loading (16 acronyms)

---

## Post-Deployment

### Security
- [ ] Default admin password changed
- [ ] New admin user created with strong password
- [ ] SSH password authentication disabled
- [ ] fail2ban installed and configured
- [ ] Firewall rules verified
- [ ] SSL/TLS working correctly
- [ ] Security headers configured
- [ ] Database not exposed to public internet

### Backups
- [ ] Backup directory created (`/backups`)
- [ ] `backup.sh` script tested
- [ ] Automated daily backups configured (cron job)
- [ ] Backup retention policy set (default: 30 days)
- [ ] Restore procedure tested
- [ ] Offsite backup configured (S3, Dropbox, etc.)

### Monitoring
- [ ] Uptime monitoring configured (UptimeRobot, Pingdom, etc.)
- [ ] Alert email configured
- [ ] Log rotation configured
- [ ] Disk space alerts set up
- [ ] Resource monitoring enabled (CPU, RAM, Disk)

### Documentation
- [ ] Server credentials documented (securely!)
- [ ] Deployment date recorded
- [ ] Initial admin credentials documented
- [ ] Backup location documented
- [ ] Recovery procedures documented
- [ ] Team members trained

### Performance
- [ ] HTTPS enabled
- [ ] Gzip compression verified
- [ ] Static asset caching verified
- [ ] CDN configured (optional)
- [ ] Database connection pool configured
- [ ] API response times acceptable (<500ms)

---

## Regular Maintenance

### Daily
- [ ] Check service health (`./health-check.sh`)
- [ ] Review error logs
- [ ] Verify backups completed

### Weekly
- [ ] Test backup restore
- [ ] Review disk space
- [ ] Check for security updates
- [ ] Review user activity logs

### Monthly
- [ ] Update Docker images
- [ ] Review and rotate logs
- [ ] Security audit
- [ ] Performance review
- [ ] Backup verification

---

## Troubleshooting Checklist

### Services Not Starting
- [ ] Check Docker is running: `docker info`
- [ ] Check disk space: `df -h`
- [ ] Check logs: `docker-compose logs`
- [ ] Verify `.env` file exists and is correct
- [ ] Check port conflicts: `lsof -i :80,3000,5432`

### Database Issues
- [ ] Verify postgres container running: `docker-compose ps postgres`
- [ ] Check database logs: `docker-compose logs postgres`
- [ ] Test connection: `docker-compose exec postgres pg_isready -U santaan_user`
- [ ] Check DATABASE_URL in `.env`

### Frontend Not Loading
- [ ] Check nginx logs: `docker-compose logs frontend`
- [ ] Verify nginx config: `docker-compose exec frontend cat /etc/nginx/conf.d/default.conf`
- [ ] Check frontend build: `docker-compose logs frontend | grep build`
- [ ] Test direct access: `curl http://localhost`

### API Errors
- [ ] Check backend logs: `docker-compose logs backend`
- [ ] Verify environment variables: `docker-compose exec backend env | grep -E '(DATABASE|JWT|CORS)'`
- [ ] Test health endpoint: `curl http://localhost:3000/health`
- [ ] Check database connection
- [ ] Verify JWT_SECRET is set

### Login Issues
- [ ] Verify database is seeded: `docker-compose logs backend | grep seed`
- [ ] Check CORS configuration
- [ ] Test login API directly: `curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"username":"admin","clinicDomain":"demo","password":"admin123"}'`
- [ ] Check browser console for errors

---

## Emergency Procedures

### Complete System Failure
1. Check server is responding: `ping your-server-ip`
2. SSH into server
3. Check Docker: `docker info`
4. Check all services: `docker-compose ps`
5. Review logs: `docker-compose logs --tail=100`
6. Restart services: `docker-compose restart`
7. If needed, full redeploy: `./deploy.sh`

### Database Corruption
1. Stop all services: `docker-compose down`
2. Restore latest backup:
   ```bash
   gunzip < /backups/db_YYYYMMDD_HHMMSS.dump.gz | \
   docker-compose exec -T postgres pg_restore -U santaan_user -d santaan --clean
   ```
3. Restart services: `docker-compose up -d`
4. Verify data integrity

### Data Loss
1. Stop services immediately
2. Don't restart until backup is restored
3. Restore from most recent backup
4. Verify data completeness
5. Document what was lost
6. Review backup strategy

---

## Security Incident Response

### Suspected Breach
1. Immediately change all passwords
2. Rotate JWT_SECRET (will logout all users)
3. Review access logs
4. Check for unauthorized users
5. Review recent timeline events
6. Update all dependencies
7. Consider restoring from backup if compromised

### DDoS Attack
1. Enable rate limiting in nginx
2. Use cloudflare or similar DDoS protection
3. Block offending IPs in firewall
4. Scale up resources if needed

---

## Contact Information

### Technical Support
- **GitHub Issues**: https://github.com/satishskid/santaan-counsel/issues
- **Documentation**: See USER_MANUAL.md and DEPLOYMENT.md
- **Emergency**: Contact system administrator

### Service Providers
- **Hosting Provider**: ___________________
- **Domain Registrar**: ___________________
- **Backup Storage**: ___________________
- **SSL Provider**: Let's Encrypt (auto-renew)

---

## Sign-Off

Deployment completed by: ___________________  
Date: ___________________  
Server IP: ___________________  
Domain: ___________________  
Initial Admin Password Changed: [ ] Yes [ ] No  
Backups Verified: [ ] Yes [ ] No  
Monitoring Configured: [ ] Yes [ ] No  

---

**Remember**: This checklist should be reviewed and updated regularly as the platform evolves.
