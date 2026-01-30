#!/bin/bash

echo "🏥 Santaan IVF Platform - Quick Start"
echo "====================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

echo "✅ Node.js $(node --version) detected"
echo ""

# Check if backend/.env exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  backend/.env not found!"
    echo ""
    echo "Please create backend/.env with your Neon database URL:"
    echo ""
    echo "  cp backend/.env.example backend/.env"
    echo ""
    echo "Then edit backend/.env and add your Neon connection string:"
    echo "  DATABASE_URL=\"postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require\""
    echo ""
    echo "Get your Neon database at: https://neon.tech (FREE)"
    echo ""
    exit 1
fi

echo "✅ backend/.env found"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo ""

if [ ! -d "node_modules" ]; then
    echo "  → Root dependencies..."
    npm install --silent
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "  → Frontend dependencies..."
    cd frontend && npm install --silent && cd ..
fi

if [ ! -d "backend/node_modules" ]; then
    echo "  → Backend dependencies..."
    cd backend && npm install --silent && cd ..
fi

echo ""
echo "✅ Dependencies installed"
echo ""

# Run migrations
echo "🗄️  Setting up database..."
cd backend

# Check if migrations have been run
if npx prisma migrate status | grep -q "Database schema is up to date"; then
    echo "✅ Database already migrated"
else
    echo "  → Running migrations..."
    npx prisma migrate deploy
    echo "✅ Migrations complete"
fi

# Check if data is seeded
PATIENT_COUNT=$(npx prisma db execute --stdin <<< "SELECT COUNT(*) FROM Patient;" 2>/dev/null | grep -o '[0-9]\+' | head -1)

if [ "$PATIENT_COUNT" -gt 0 ] 2>/dev/null; then
    echo "✅ Database already seeded ($PATIENT_COUNT patients found)"
else
    echo "  → Seeding demo data..."
    npx prisma db seed
    echo "✅ Demo data created"
fi

cd ..
echo ""

# Create frontend .env if missing
if [ ! -f "frontend/.env" ]; then
    echo "VITE_API_URL=http://localhost:3000/api" > frontend/.env
    echo "✅ Created frontend/.env"
fi

echo ""
echo "✨ Setup complete! Starting development servers..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Frontend: http://localhost:5173"
echo "  Backend:  http://localhost:3000"
echo ""
echo "  Login:    admin@demo.clinic"
echo "  Password: admin123"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Press Ctrl+C to stop servers"
echo ""

# Start development servers
npm run dev
