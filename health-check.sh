#!/bin/bash

# Health Check Script
# Verifies all services are running correctly

set -e

echo "🏥 Santaan Platform - Health Check"
echo "==================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

check_service() {
    local service=$1
    local url=$2
    local name=$3
    
    if curl -sf "$url" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ $name${NC}"
        return 0
    else
        echo -e "${RED}❌ $name${NC}"
        return 1
    fi
}

# Check Docker services
echo "📦 Docker Services:"
docker-compose ps
echo ""

# Check Backend API
echo "🔍 Service Health Checks:"
check_service "backend" "http://localhost:3000/health" "Backend API"

# Check Frontend
check_service "frontend" "http://localhost" "Frontend"

# Check Database
echo -n "Database: "
if docker-compose exec -T postgres pg_isready -U santaan_user > /dev/null 2>&1; then
    echo -e "${GREEN}✅ PostgreSQL${NC}"
else
    echo -e "${RED}❌ PostgreSQL${NC}"
fi

echo ""

# Check API endpoints with authentication
echo "🔐 API Endpoints (requires auth):"

# Get token
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","clinicDomain":"demo","password":"admin123"}' \
  | jq -r '.token' 2>/dev/null)

if [ -n "$TOKEN" ] && [ "$TOKEN" != "null" ]; then
    echo -e "${GREEN}✅ Authentication${NC}"
    
    # Check templates
    TEMPLATE_COUNT=$(curl -s -H "Authorization: Bearer $TOKEN" http://localhost:3000/api/templates/all | jq 'length' 2>/dev/null)
    if [ "$TEMPLATE_COUNT" = "810" ]; then
        echo -e "${GREEN}✅ Templates API (810 templates)${NC}"
    else
        echo -e "${YELLOW}⚠️  Templates API ($TEMPLATE_COUNT templates)${NC}"
    fi
    
    # Check protocols
    PROTOCOL_COUNT=$(curl -s -H "Authorization: Bearer $TOKEN" http://localhost:3000/api/protocols | jq 'length' 2>/dev/null)
    if [ "$PROTOCOL_COUNT" = "7" ]; then
        echo -e "${GREEN}✅ Protocols API (7 protocols)${NC}"
    else
        echo -e "${YELLOW}⚠️  Protocols API ($PROTOCOL_COUNT protocols)${NC}"
    fi
    
    # Check acronyms
    ACRONYM_COUNT=$(curl -s -H "Authorization: Bearer $TOKEN" http://localhost:3000/api/acronyms | jq 'length' 2>/dev/null)
    if [ "$ACRONYM_COUNT" = "16" ]; then
        echo -e "${GREEN}✅ Acronyms API (16 acronyms)${NC}"
    else
        echo -e "${YELLOW}⚠️  Acronyms API ($ACRONYM_COUNT acronyms)${NC}"
    fi
else
    echo -e "${RED}❌ Authentication failed${NC}"
fi

echo ""

# Check disk space
echo "💾 Disk Usage:"
df -h | grep -E '(Filesystem|/$|/var/lib/docker)' || df -h /

echo ""

# Check Docker resource usage
echo "📊 Container Resource Usage:"
docker stats --no-stream

echo ""
echo -e "${GREEN}==================================="
echo "Health check complete!"
echo "===================================${NC}"
