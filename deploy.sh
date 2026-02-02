#!/bin/bash

# Santaan IVF Platform - Production Deployment Script
# This script deploys the application using Docker Compose

set -e  # Exit on error

echo "🚀 Santaan IVF Platform - Production Deployment"
echo "================================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found${NC}"
    echo "Please create .env file from .env.example:"
    echo "  cp .env.example .env"
    echo "Then edit .env with your production values"
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: Docker is not running${NC}"
    echo "Please start Docker and try again"
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Error: docker-compose not found${NC}"
    echo "Please install Docker Compose"
    exit 1
fi

echo -e "${YELLOW}📋 Pre-deployment Checklist:${NC}"
echo "  ✓ .env file exists"
echo "  ✓ Docker is running"
echo "  ✓ docker-compose is available"
echo ""

# Source environment variables
set -a
source .env
set +a

# Validate critical environment variables
if [ -z "$DB_PASSWORD" ]; then
    echo -e "${RED}❌ Error: DB_PASSWORD not set in .env${NC}"
    exit 1
fi

if [ -z "$JWT_SECRET" ]; then
    echo -e "${RED}❌ Error: JWT_SECRET not set in .env${NC}"
    exit 1
fi

if [ ${#JWT_SECRET} -lt 32 ]; then
    echo -e "${RED}❌ Error: JWT_SECRET must be at least 32 characters${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Environment variables validated${NC}"
echo ""

# Pull latest changes (if in git repo)
if [ -d .git ]; then
    echo -e "${YELLOW}📥 Pulling latest changes...${NC}"
    git pull origin main || echo "Warning: Could not pull latest changes"
    echo ""
fi

# Stop existing containers
echo -e "${YELLOW}🛑 Stopping existing containers...${NC}"
docker-compose down
echo ""

# Build images
echo -e "${YELLOW}🔨 Building Docker images...${NC}"
docker-compose build --no-cache
echo ""

# Start services
echo -e "${YELLOW}🚀 Starting services...${NC}"
docker-compose up -d
echo ""

# Wait for services to be healthy
echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
sleep 5

# Check if database is ready
echo "Checking database..."
docker-compose exec -T postgres pg_isready -U santaan_user || {
    echo -e "${RED}❌ Database is not ready${NC}"
    exit 1
}
echo -e "${GREEN}✅ Database is ready${NC}"

# Run database migrations
echo -e "${YELLOW}📊 Running database migrations...${NC}"
docker-compose exec -T backend npx prisma migrate deploy
echo ""

# Seed database (optional - comment out if not needed)
echo -e "${YELLOW}🌱 Seeding database...${NC}"
docker-compose exec -T backend npm run prisma:seed || echo "Warning: Seed failed or already seeded"
echo ""

# Check backend health
echo "Checking backend API..."
max_attempts=30
attempt=0
while [ $attempt -lt $max_attempts ]; do
    if curl -sf http://localhost:3000/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend API is healthy${NC}"
        break
    fi
    attempt=$((attempt + 1))
    echo "Waiting for backend... ($attempt/$max_attempts)"
    sleep 2
done

if [ $attempt -eq $max_attempts ]; then
    echo -e "${RED}❌ Backend API health check failed${NC}"
    echo "Check logs: docker-compose logs backend"
    exit 1
fi

# Check frontend
echo "Checking frontend..."
if curl -sf http://localhost > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend is accessible${NC}"
else
    echo -e "${YELLOW}⚠️  Frontend may take a few more seconds to start${NC}"
fi

echo ""
echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo "📊 Service Status:"
docker-compose ps
echo ""
echo "🌐 Access your application:"
echo "   Frontend: http://localhost"
echo "   Backend API: http://localhost:3000"
echo "   Health Check: http://localhost:3000/health"
echo ""
echo "📝 Useful Commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"
echo "   View backend logs: docker-compose logs -f backend"
echo "   View frontend logs: docker-compose logs -f frontend"
echo "   View database logs: docker-compose logs -f postgres"
echo ""
echo "🔐 Default Credentials:"
echo "   Username: admin"
echo "   Domain: demo"
echo "   Password: admin123"
echo ""
echo -e "${YELLOW}⚠️  Remember to:${NC}"
echo "   1. Change default admin password"
echo "   2. Set up SSL/TLS for production"
echo "   3. Configure backup strategy"
echo "   4. Set up monitoring"
echo ""
