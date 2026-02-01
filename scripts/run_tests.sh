#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔍 Checking if backend and frontend are running...${NC}"

# Check backend
if curl -s http://localhost:3000/health > /dev/null 2>&1; then
  echo -e "${GREEN}✅ Backend is running on port 3000${NC}"
else
  echo -e "${RED}❌ Backend is NOT running on port 3000${NC}"
  echo -e "${YELLOW}Please start backend: cd backend && npm start${NC}"
  exit 1
fi

# Check frontend
if curl -s http://localhost:5173 > /dev/null 2>&1; then
  echo -e "${GREEN}✅ Frontend is running on port 5173${NC}"
else
  echo -e "${RED}❌ Frontend is NOT running on port 5173${NC}"
  echo -e "${YELLOW}Please start frontend: cd frontend && npm run dev${NC}"
  exit 1
fi

echo -e "${GREEN}🎯 Both servers are up! Running Playwright tests...${NC}"
echo ""

# Run Playwright tests
npx playwright test "$@"

exit_code=$?

if [ $exit_code -eq 0 ]; then
  echo -e "${GREEN}✅ All tests passed!${NC}"
else
  echo -e "${RED}❌ Some tests failed. Check the HTML report:${NC}"
  echo -e "${YELLOW}npx playwright show-report${NC}"
fi

exit $exit_code
