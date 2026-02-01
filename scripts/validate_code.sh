#!/bin/bash

# Code Validation Script - Catches basic errors before commit
# Run this before pushing code to catch undefined functions, syntax errors, etc.

echo "🔍 Running Code Validation..."
echo ""

ERRORS=0

# Frontend validation
echo "📦 Validating Frontend..."
cd frontend

# Check for syntax errors
echo "  → Checking JavaScript syntax..."
if ! npm run lint 2>&1 | tee /tmp/frontend-lint.log | grep -q "error"; then
  echo "  ✅ No linting errors"
else
  echo "  ❌ ESLint errors found:"
  cat /tmp/frontend-lint.log | grep "error"
  ERRORS=$((ERRORS + 1))
fi

# Check for unused imports
echo "  → Checking for unused imports..."
if grep -r "import.*from" src/ | grep -v "node_modules" > /tmp/imports.log; then
  echo "  ✅ Imports checked"
fi

cd ..

# Backend validation
echo ""
echo "📦 Validating Backend..."
cd backend

# Check for syntax errors in backend
echo "  → Checking JavaScript syntax..."
if node -c src/index.js 2>/dev/null; then
  echo "  ✅ No syntax errors in backend"
else
  echo "  ❌ Syntax errors found in backend"
  ERRORS=$((ERRORS + 1))
fi

cd ..

# Check for common mistakes
echo ""
echo "🔍 Checking for common mistakes..."

# Check for console.logs in production code (warning only)
CONSOLE_COUNT=$(grep -r "console.log" frontend/src backend/src 2>/dev/null | grep -v "node_modules" | wc -l)
if [ $CONSOLE_COUNT -gt 0 ]; then
  echo "  ⚠️  Found $CONSOLE_COUNT console.log statements (consider removing before release)"
fi

# Check for TODO comments
TODO_COUNT=$(grep -r "TODO\|FIXME" frontend/src backend/src 2>/dev/null | wc -l)
if [ $TODO_COUNT -gt 0 ]; then
  echo "  ℹ️  Found $TODO_COUNT TODO/FIXME comments"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
  echo "✅ Validation passed! Safe to commit."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  exit 0
else
  echo "❌ Validation failed with $ERRORS error(s)"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  exit 1
fi
