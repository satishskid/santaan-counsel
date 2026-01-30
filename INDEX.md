# 📚 Santaan IVF Platform - Documentation Index

Welcome to the **Santaan IVF Platform** documentation! This file serves as your complete guide to all available documentation.

## 🚀 Getting Started

### New to the Project? Start Here:
1. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** ⭐ **START HERE**
   - Complete project overview
   - What's been built
   - Quick start instructions
   - Key features implemented

2. **[QUICKSTART.md](QUICKSTART.md)** ⏱️ **5-Minute Setup**
   - Fastest way to get running
   - Step-by-step setup
   - Demo credentials
   - Common troubleshooting

3. **[README.md](README.md)** 📖 **Complete Documentation**
   - Full project documentation
   - Technology stack details
   - API endpoint reference
   - Development workflow

## 🏗️ Understanding the System

### Architecture & Design
4. **[ARCHITECTURE.md](ARCHITECTURE.md)** 🏗️ **System Architecture**
   - Component diagrams
   - Data flow visualization
   - Technology stack breakdown
   - Docker network setup
   - Security layers

5. **[FILE_LIST.md](FILE_LIST.md)** 📁 **Complete File Listing**
   - All 43+ files explained
   - Directory structure
   - File statistics
   - Key files to know

### Database
6. **[backend/prisma/schema.prisma](backend/prisma/schema.prisma)** 🗄️ **Database Schema**
   - 11 tables defined
   - Relationships mapped
   - Indexes configured
   - Multi-tenant structure

7. **[backend/prisma/seed.js](backend/prisma/seed.js)** 🌱 **Seed Data**
   - Demo clinic
   - 4 staff users
   - 16+ acronyms
   - 4 message templates
   - 1 demo patient with timeline

## 👨‍💻 Development

### Planning & Tasks
8. **[TODO.md](TODO.md)** ✅ **Development Checklist**
   - What's completed
   - What's next
   - Feature roadmap
   - Priority order

9. **[SETUP_COMPLETE.md](SETUP_COMPLETE.md)** 🎯 **Setup Details**
   - What has been created
   - Development workflow
   - Debugging tips
   - Next steps

### Contributing
10. **[CONTRIBUTING.md](CONTRIBUTING.md)** 🤝 **Contribution Guide**
    - How to contribute
    - Commit message format
    - Code style guidelines
    - PR checklist

## 🔧 Configuration

### Environment Setup
11. **[.env.example](.env.example)** ⚙️ **Environment Variables**
    - Database password
    - JWT secret
    - CORS configuration

12. **[docker-compose.yml](docker-compose.yml)** 🐳 **Container Orchestration**
    - 3 services defined
    - Network configuration
    - Volume mapping

### Automation
13. **[setup.sh](setup.sh)** 🤖 **Setup Script**
    - Automated installation
    - Credential generation
    - Database initialization

## 📦 Code Reference

### Backend API
14. **[backend/src/index.js](backend/src/index.js)** 🖥️ **API Server Entry**
    - Express app setup
    - Middleware stack
    - Route mounting

15. **Backend Controllers**
    - [auth.controller.js](backend/src/controllers/auth.controller.js) - Login, authentication
    - [patients.controller.js](backend/src/controllers/patients.controller.js) - Patient CRUD
    - [timeline.controller.js](backend/src/controllers/timeline.controller.js) - Timeline events

16. **Backend Services**
    - [acronymExpander.service.js](backend/src/services/acronymExpander.service.js) - Clinical shorthand expansion

### Frontend React App
17. **[frontend/src/App.jsx](frontend/src/App.jsx)** 🎨 **Frontend Entry**
    - React Router setup
    - Protected routes
    - App layout

18. **Frontend Pages**
    - [Login.jsx](frontend/src/pages/Login.jsx) - Login page
    - [Dashboard.jsx](frontend/src/pages/Dashboard.jsx) - Dashboard

19. **State Management**
    - [authStore.js](frontend/src/store/authStore.js) - Authentication state
    - [patientStore.js](frontend/src/store/patientStore.js) - Patient state

## 📜 Legal & Licensing

20. **[LICENSE](LICENSE)** ⚖️ **MIT License**
    - Open source
    - Free to use
    - Attribution required

## 📊 Quick Reference Tables

### Documentation by Purpose

| Purpose | Document | Time to Read |
|---------|----------|--------------|
| **First time setup** | QUICKSTART.md | 5 minutes |
| **Understand project** | PROJECT_SUMMARY.md | 10 minutes |
| **Learn architecture** | ARCHITECTURE.md | 15 minutes |
| **Start developing** | TODO.md | 5 minutes |
| **Contribute code** | CONTRIBUTING.md | 10 minutes |
| **Full reference** | README.md | 20 minutes |

### Documentation by Role

| Role | Recommended Reading |
|------|---------------------|
| **New Developer** | PROJECT_SUMMARY → QUICKSTART → ARCHITECTURE → TODO |
| **Contributor** | CONTRIBUTING → TODO → ARCHITECTURE |
| **DevOps Engineer** | docker-compose.yml → setup.sh → ARCHITECTURE |
| **Product Manager** | PROJECT_SUMMARY → TODO → README |
| **Designer** | ARCHITECTURE (Component Hierarchy) → Dashboard.jsx |

### File Organization

| Category | Files | Location |
|----------|-------|----------|
| **Documentation** | 10 files | Root directory |
| **Backend Code** | 14 files | backend/src/ |
| **Frontend Code** | 5 files | frontend/src/ |
| **Configuration** | 11 files | Various |
| **Database** | 2 files | backend/prisma/ |

## 🎯 Common Tasks - Quick Links

### Setup & Installation
```bash
# Quick setup
./setup.sh

# Manual setup
See: QUICKSTART.md → Manual Setup section
```

### Development
```bash
# Backend development
See: SETUP_COMPLETE.md → Backend Development section

# Frontend development
See: SETUP_COMPLETE.md → Frontend Development section
```

### Database
```bash
# Create migration
See: CONTRIBUTING.md → Database Changes section

# Seed database
See: backend/prisma/seed.js
```

### Deployment
```bash
# Docker deployment
See: ARCHITECTURE.md → Docker Container Network section
```

## 🔍 Search Tips

### Finding Information

**To find API endpoints:**
- Check: README.md → API Endpoints section
- Or: backend/src/routes/*.routes.js

**To understand data structure:**
- Check: backend/prisma/schema.prisma
- Or: ARCHITECTURE.md → Data Flow Diagram

**To see what's implemented:**
- Check: TODO.md → Completed section
- Or: PROJECT_SUMMARY.md → What Works Now

**To learn how to contribute:**
- Check: CONTRIBUTING.md
- Or: TODO.md → To Be Implemented

## 📞 Getting Help

1. **Check these docs first** (you're in the right place!)
2. **Search closed GitHub issues**
3. **Review code comments** (well-documented)
4. **Ask in discussions** (GitHub Discussions)
5. **Create an issue** (with details)

## 🎓 Learning Path

### Beginner (Day 1)
1. Read PROJECT_SUMMARY.md
2. Run setup.sh
3. Explore demo patient in dashboard
4. Review ARCHITECTURE.md

### Intermediate (Week 1)
1. Review TODO.md checklist
2. Study backend/prisma/schema.prisma
3. Understand acronym expansion flow
4. Make first contribution

### Advanced (Month 1)
1. Build a complete feature from TODO.md
2. Add tests
3. Document your work
4. Submit PR

## 🌟 Key Concepts

### Must Understand
1. **Timeline Events** = Core of the system
2. **Acronym Expansion** = Clinical shorthand → Full records
3. **Multi-Tenancy** = One system, many clinics
4. **Role-Based Access** = Different permissions per role
5. **Templates** = Guide staff communication

### Core Principle
**Events → Templates → Communication → Reaction Capture → Timeline Update**

## 📈 Project Status

✅ **Foundation Complete** (100%)
- Backend API: Fully functional
- Frontend UI: Login + Dashboard working
- Database: Schema defined, seeded
- Docker: Ready for deployment
- Documentation: Comprehensive

🚧 **Next Phase** (0%)
- Patient timeline UI
- Event creation forms
- Template system UI
- Action queue dashboard

See **TODO.md** for complete roadmap.

## 🎉 You're All Set!

You now have a complete map of the Santaan IVF Platform documentation. Start with **PROJECT_SUMMARY.md** and work your way through based on your role and needs.

**Happy coding! 🚀**

---

*Last Updated: January 30, 2026*
*Total Documentation Files: 20*
*Total Code Files: 23*
*Status: Ready for Development ✅*
