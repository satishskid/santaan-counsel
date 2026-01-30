# Santaan IVF Platform - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Prerequisites
Make sure you have installed:
- Docker Desktop (includes Docker Compose)
- Git

### Step 2: Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd santaan-teleprompt

# Run the automated setup script
./setup.sh
```

The script will:
- ✅ Create `.env` file with secure credentials
- ✅ Start PostgreSQL database
- ✅ Start backend API server
- ✅ Start frontend web server
- ✅ Run database migrations
- ✅ Seed demo data

### Step 3: Access the Application

Open your browser and go to: **http://localhost**

Login with demo credentials:
- **Username**: `admin`
- **Clinic Domain**: `demo`
- **Password**: `admin123`

## 🎯 What You'll See

### Dashboard
- Active patient count
- Recent patients list
- Quick stats

### Demo Data Included
- ✅ 1 demo patient (Priya Sharma)
- ✅ 2 timeline events
- ✅ 4 staff users (admin, doctor, nurse, embryologist)
- ✅ 16+ medical acronyms
- ✅ 4 message templates

## 👥 Demo User Accounts

| Username | Role | Password |
|----------|------|----------|
| `admin@demo` | Clinic Admin | `admin123` |
| `doctor1@demo` | Doctor | `admin123` |
| `nurse1@demo` | Nurse | `admin123` |
| `embryo1@demo` | Embryologist | `admin123` |

## 🔧 Manual Setup (Alternative)

If you prefer manual setup:

```bash
# 1. Create environment file
cp .env.example .env

# 2. Edit .env and set secure passwords
nano .env

# 3. Start services
docker-compose up -d

# 4. Wait 10 seconds for DB to initialize
sleep 10

# 5. Run migrations
docker-compose exec backend npx prisma migrate deploy

# 6. Seed database
docker-compose exec backend npm run prisma:seed
```

## 🛑 Stopping the Application

```bash
# Stop all services
docker-compose down

# Stop and remove all data (⚠️ Warning: Deletes database)
docker-compose down -v
```

## 📊 Useful Commands

```bash
# View logs
docker-compose logs -f

# View backend logs only
docker-compose logs -f backend

# Restart a service
docker-compose restart backend

# Access database directly
docker-compose exec postgres psql -U santaan_user -d santaan

# Generate Prisma client (after schema changes)
docker-compose exec backend npx prisma generate
```

## 🔍 Troubleshooting

### Port Already in Use
If you get "port already in use" errors:

```bash
# Check what's using port 80
sudo lsof -i :80

# Check what's using port 3000
lsof -i :3000

# Check what's using port 5432
lsof -i :5432
```

Stop the conflicting service or change ports in `docker-compose.yml`.

### Database Connection Error
```bash
# Check if database is healthy
docker-compose ps

# Restart database
docker-compose restart postgres

# View database logs
docker-compose logs postgres
```

### Frontend Not Loading
```bash
# Rebuild frontend container
docker-compose up -d --build frontend

# Check frontend logs
docker-compose logs frontend
```

## 📚 Next Steps

1. **Explore the Dashboard**: Navigate through the demo patient timeline
2. **Add a Patient**: Try creating a new patient
3. **Add Timeline Event**: Add a consultation or scan event
4. **Try Acronym Expansion**: Use clinical shorthand in event entry
5. **Review Code**: Check out the backend and frontend code structure

## 💡 Development Mode

For active development with hot reload:

### Backend (Terminal 1)
```bash
cd backend
npm install
cp .env.example .env
# Edit DATABASE_URL to point to Docker PostgreSQL
npm run dev
```

### Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
# Access at http://localhost:5173
```

### Database (Docker)
```bash
docker-compose up postgres -d
```

## 🎓 Learn More

- Read the [full README](README.md) for detailed documentation
- Check the [PRD](.github/copilot-instructions.md) for product requirements
- Explore the [database schema](backend/prisma/schema.prisma)
- Review the [API routes](backend/src/routes/)

## 🆘 Getting Help

- Check existing [GitHub Issues](../../issues)
- Create a new issue for bugs or feature requests
- Review the comprehensive README for detailed information

---

**Happy building! 🚀**
