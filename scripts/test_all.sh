#!/bin/bash

echo "🧪 Santaan IVF Platform - Comprehensive Test Suite"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if backend is running
echo -n "Checking backend... "
if curl -s http://localhost:3000/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Running${NC}"
else
    echo -e "${RED}✗ Not running${NC}"
    echo "Starting backend..."
    cd backend && npm start &
    BACKEND_PID=$!
    sleep 5
fi

# Check if frontend is running
echo -n "Checking frontend... "
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Running${NC}"
else
    echo -e "${RED}✗ Not running${NC}"
    echo "Starting frontend..."
    cd frontend && npm run dev &
    FRONTEND_PID=$!
    sleep 5
fi

echo ""
echo "🏃 Running E2E tests with Playwright..."
echo ""

# Run Playwright tests
npx playwright test --reporter=list

TEST_EXIT_CODE=$?

echo ""
if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✅ All tests passed!${NC}"
else
    echo -e "${RED}❌ Some tests failed${NC}"
    echo ""
    echo "📊 View detailed report:"
    echo "   npx playwright show-report"
fi

echo ""
echo "📸 Screenshots and videos saved in:"
echo "   test-results/"
echo ""

exit $TEST_EXIT_CODE
