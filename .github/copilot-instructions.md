# Santaan IVF Platform - Development Guidelines

## Project Overview
Timeline-driven IVF clinic management system where every patient journey is a living document with staff-mediated communication at every milestone.

## Tech Stack
- **Frontend**: React 18 + Vite + Tailwind CSS + shadcn/ui + Zustand
- **Backend**: Node.js 20 + Express.js + JavaScript
- **Database**: PostgreSQL 15 + Prisma ORM
- **Deployment**: Docker + Docker Compose

## Core Principles
1. **Events → Templates → Communication → Reaction Capture → Timeline Update**
2. Simple, proven technologies over complex ones
3. Staff augmentation, not replacement
4. Clinical acronyms expand to full medical records
5. Multi-tenant clinic support with role-based access

## User Roles
- **Clinic Admin**: Full access, user management, reports
- **Doctor**: Clinical entries, treatment plans, oversight
- **Nurse**: Clinical entries, communication, reactions
- **Counselor**: Emotional tracking, counseling notes
- **Embryologist**: Lab results, embryo updates
- **Receptionist**: Patient interactions, scheduling

## Database Design
- PostgreSQL with JSONB for flexible clinical data
- Prisma ORM for type-safe database access
- Timeline events as core data structure
- Template system for communication
- Acronym dictionary for medical shorthand expansion

## Coding Standards
- Use async/await for all database operations
- Keep API routes RESTful and simple
- Validate all inputs with Joi
- Use JWT for stateless authentication
- Keep frontend components small and focused
- Use Zustand for state management (avoid Redux complexity)

## Development Workflow
- Use Docker for consistent environments
- Database migrations via Prisma
- Seed data includes templates, acronyms, and event types
- Test with dummy patient timelines

## Key Features
1. **Timeline System**: Chronological patient journey tracking
2. **Template Engine**: Pre-built messages for WhatsApp/SMS/verbal
3. **Acronym Expander**: Clinical shorthand → Full medical records
4. **Reaction Capture**: Track patient understanding and anxiety
5. **Visual Assets**: Diagrams and guides for patient education
6. **Action Queue**: Staff task management
7. **Performance Dashboard**: Clinic metrics and quality tracking

## Security & Compliance
- HIPAA-equivalent data protection
- Encryption at rest and in transit
- Daily automated backups
- Audit trail for all patient data access

## Deployment Target
- Single Docker Compose file deployment
- Works on AWS Lightsail, DigitalOcean, or Railway.app
- $12-50/month hosting cost
- Let's Encrypt SSL automation
