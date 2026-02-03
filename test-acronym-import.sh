#!/bin/bash

# Santaan IVF Platform - Acronym Import Test Script
# This script tests the bulk acronym import endpoint

echo "🧪 Testing Acronym Bulk Import Endpoint"
echo "========================================"
echo ""

# Step 1: Login and get token
echo "📝 Step 1: Authenticating as admin..."
LOGIN_RESPONSE=$(curl -s -X POST https://santaan-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "clinicDomain": "demo",
    "password": "admin123"
  }')

TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')

if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
  echo "❌ Login failed!"
  echo "Response: $LOGIN_RESPONSE"
  exit 1
fi

echo "✅ Login successful! Token acquired."
echo ""

# Step 2: Import acronyms
echo "📤 Step 2: Importing 16 IVF acronyms..."
IMPORT_RESPONSE=$(curl -s -X POST https://santaan-backend.onrender.com/api/acronyms/admin/bulk-import \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d @backend/data/ivf-acronyms.json)

echo "Response:"
echo $IMPORT_RESPONSE | jq '.'
echo ""

# Step 3: Verify acronyms were imported
echo "🔍 Step 3: Verifying acronyms in database..."
ACRONYMS_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" \
  https://santaan-backend.onrender.com/api/acronyms)

ACRONYM_COUNT=$(echo $ACRONYMS_RESPONSE | jq 'length')

echo "Total acronyms in database: $ACRONYM_COUNT"
echo ""

# Step 4: Test acronym expansion
echo "🧬 Step 4: Testing acronym expansion..."
EXPAND_RESPONSE=$(curl -s -X POST https://santaan-backend.onrender.com/api/acronyms/expand \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "text": "Patient scheduled for ET. E2 levels good. AFC count is 12."
  }')

echo "Original: Patient scheduled for ET. E2 levels good. AFC count is 12."
echo "Expanded:"
echo $EXPAND_RESPONSE | jq -r '.expanded'
echo ""

# Summary
echo "✅ Import Test Complete!"
echo "========================"
echo ""
echo "Next Steps:"
echo "1. Login to https://santaan-frontend.onrender.com"
echo "2. Navigate to any patient timeline"
echo "3. In Clinical Logging, type: 'ET scheduled. E2 levels good. AFC 12.'"
echo "4. Acronyms should auto-expand to full terms"
echo ""
echo "Expected expansions:"
echo "  ET  → Embryo Transfer"
echo "  E2  → Estradiol (hormone indicating follicle development)"
echo "  AFC → Antral Follicle Count (number of resting follicles)"
