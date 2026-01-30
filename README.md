# Santaan IVF Platform

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/santaan-ivf)

> Timeline-driven IVF clinic management system where every patient journey is a living document with staff-mediated communication at every milestone.

## 🌟 Overview

Santaan is a comprehensive IVF clinic management platform designed to streamline patient care through:

- **Timeline-Driven Patient Journeys**: Every patient interaction is a chronological event
- **Staff Augmentation**: Templates guide communication, not replace human touch
- **Acronym Expansion**: Clinical shorthand automatically converts to full medical records
- **Reaction Capture**: Track patient understanding and anxiety at every step
- **Multi-Tenant Support**: Serve multiple clinics from one installation
- **Role-Based Access**: Doctor, Nurse, Embryologist, Counselor, Receptionist roles

## 🎯 Core Principle

**Events → Templates → Communication → Reaction Capture → Timeline Update**

## ⚡ One-Click Deploy (Recommended)

Deploy to Netlify + Neon (FREE tier available):

1. **Get Neon Database** (Free serverless Postgres)
   - Sign up at [neon.tech](https://neon.tech)
   - Create database → Copy connection string

2. **Click Deploy Button** (above)
   - Connect GitHub repository
   - Add `DATABASE_URL` in Netlify environment variables
   - Add `JWT_SECRET` (any random string)
   - Deploy automatically builds and launches

3. **Initialize Database**
   - Visit: `https://your-site.netlify.app/.netlify/functions/migrate`
   - This runs migrations and seeds demo data

4. **Login**
   - Email: `admin@demo.clinic`
   - Password: `admin123`

📚 **Full deploy guide**: [DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md)

---

## 🖥️ Local Development

### Quick Start (Recommended)

```bash
# 1. Clone repository
git clone <repository-url>
cd santaan-teleprompt

# 2. Get Neon database connection string from neon.tech

# 3. Create backend/.env
cp backend/.env.example backend/.env
# Edit backend/.env and add your DATABASE_URL

# 4. Run setup script
./start.sh
```

The script will:
- ✅ Install all dependencies
- ✅ Run database migrations
- ✅ Seed demo data
- ✅ Start frontend (http://localhost:5173) and backend (http://localhost:3000)

**Default Login:**
- Email: `admin@demo.clinic`
- Password: `admin123`
```

### Demo Credentials

```
Username: admin
Clinic Domain: demo
Password: admin123

Other demo users:
- doctor1@demo / admin123
- nurse1@demo / admin123
- embryo1@demo / admin123
```

## 📋 Tech Stack

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: Joi

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Routing**: React Router v6

### Deployment
- **Containerization**: Docker + Docker Compose
- **Web Server**: Nginx (for frontend)
- **Database**: PostgreSQL (containerized)

## 🏗️ Project Structure

```
santaan-teleprompt/
├── backend/
│   ├── src/
│   │   ├── config/          # Database, environment config
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── routes/          # API route definitions
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic (acronym expander, etc.)
│   │   └── index.js         # Express app entry point
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── seed.js          # Seed data (templates, acronyms)
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Zustand stores
│   │   ├── utils/           # API client, helpers
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── Dockerfile
│   ├── nginx.conf           # Nginx configuration
│   └── package.json
├── docker-compose.yml       # Multi-service orchestration
├── .env.example             # Environment variables template
└── README.md
```

## 🔑 Key Features

### 1. Timeline System
Every patient has a chronological timeline of events:
- Consultations
- Scans and monitoring
- Medication changes
- Lab results
- Procedures (retrieval, transfer)
- Patient interactions
- Counseling sessions

### 2. Template Engine
Pre-built message templates for:
- WhatsApp/SMS messages
- In-person talking points
- Phone call scripts
- Visual aid suggestions

### 3. Acronym Expander
Clinicians enter shorthand:
```
E2: 450, AFC L4R3, Gonal-F 225→250
```

System expands to:
```
Estradiol Level: 450 pg/mL (Normal range: 200-600)
Antral Follicle Count: Left ovary 4, Right ovary 3
Medication adjustment: Gonal-F increased from 225 IU to 250 IU
```

### 4. Reaction Capture
Track patient responses:
- Understanding level (well/partial/confused)
- Emotional response (positive/neutral/anxious)
- Anxiety before/after (1-10 scale)
- Visual aid effectiveness

### 5. Role-Based Access

| Role | Permissions |
|------|-------------|
| **Admin** | Full system access, user management, reports |
| **Doctor** | Clinical entries, treatment plans, oversight |
| **Nurse** | Clinical entries, communication, reactions |
| **Embryologist** | Lab results, embryo updates |
| **Counselor** | Emotional tracking, counseling notes |
| **Receptionist** | Patient interactions, scheduling |

## 🗄️ Database Schema

### Core Tables

- **clinics**: Multi-tenant clinic management
- **users**: Staff accounts with role-based permissions
- **patients**: Patient demographics and preferences
- **treatment_cycles**: IVF cycle tracking
- **timeline_events**: Core event log (heart of the system)
- **templates**: Pre-built communication templates
- **visual_assets**: Educational diagrams and guides
- **acronym_dictionary**: Medical shorthand expansion
- **action_queue**: Staff task management
- **clinic_performance**: Daily metrics rollup

See [backend/prisma/schema.prisma](backend/prisma/schema.prisma) for complete schema.

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/login          - Staff login
GET    /api/auth/me             - Get current user
POST   /api/auth/change-password - Change password
```

### Patients
```
GET    /api/patients            - List patients
POST   /api/patients            - Create patient
GET    /api/patients/:id        - Get patient details
PUT    /api/patients/:id        - Update patient
GET    /api/patients/:id/timeline - Get timeline
```

### Timeline Events
```
GET    /api/timeline/:patientId           - Get timeline
POST   /api/timeline/:patientId/events    - Add event
GET    /api/timeline/events/:eventId      - Get event
PUT    /api/timeline/events/:eventId      - Update event
DELETE /api/timeline/events/:eventId      - Delete event
```

### Acronyms
```
GET    /api/acronyms            - List acronyms
POST   /api/acronyms/expand     - Expand shorthand
```

## 🚀 Development

### Backend Development

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Seed database
npm run prisma:seed

# Start development server
npm run dev
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild containers
docker-compose up -d --build

# Run database migrations
docker-compose exec backend npx prisma migrate deploy

# Seed database
docker-compose exec backend npm run prisma:seed

# Access database
docker-compose exec postgres psql -U santaan_user -d santaan
```

## 📊 Seeded Data

The seed script creates:

- ✅ Demo clinic (`domain: demo`)
- ✅ 4 demo users (admin, doctor, nurse, embryologist)
- ✅ 16+ medical acronyms (E2, AMH, AFC, ICSI, 2PN, etc.)
- ✅ 4 message templates (welcome, scan results, fertilization, transfer)
- ✅ 1 demo patient with timeline events

## 🔐 Security

- JWT-based authentication
- Password hashing with bcrypt
- Role-based authorization
- CORS configuration
- Input validation with Joi
- SQL injection protection (Prisma ORM)

## 📈 Deployment Options

### Option 1: AWS Lightsail
```bash
# On Lightsail instance
git clone <repo>
cd santaan-teleprompt
docker-compose up -d
```

### Option 2: DigitalOcean Droplet
```bash
# On droplet
git clone <repo>
cd santaan-teleprompt
docker-compose up -d
```

### Option 3: Railway.app
- Connect GitHub repo
- Railway auto-detects Docker
- Add environment variables
- Deploy

## 🛠️ Configuration

### Environment Variables

Create `.env` file in project root:

```env
# Database
DB_PASSWORD=your-secure-password

# JWT
JWT_SECRET=your-super-secret-key

# CORS (optional, for development)
CORS_ORIGIN=http://localhost:5173
```

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

For questions or support, please open an issue on GitHub.

## 🎯 Roadmap

- [ ] Template management UI
- [ ] Visual asset library UI
- [ ] Complete patient timeline view
- [ ] Action queue dashboard
- [ ] Performance analytics dashboard
- [ ] WhatsApp integration
- [ ] SMS integration
- [ ] PDF report generation
- [ ] Mobile-responsive improvements
- [ ] Multi-language support

---

**Built with ❤️ for IVF clinics**
