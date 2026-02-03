# Acronym Bulk Import - Quick Start Guide

## Overview
The bulk import endpoint allows administrators to populate the acronym dictionary with multiple medical acronyms in a single API call.

## Endpoint Details
- **URL**: `POST /api/acronyms/admin/bulk-import`
- **Authentication**: Required (Bearer token)
- **Content-Type**: `application/json`

## Usage

### Step 1: Login and Get Token
```bash
curl -X POST https://santaan-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "domain": "demo",
    "password": "admin123"
  }'
```

Save the `token` from the response.

### Step 2: Import Acronyms
```bash
curl -X POST https://santaan-backend.onrender.com/api/acronyms/admin/bulk-import \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d @backend/data/ivf-acronyms.json
```

Replace `YOUR_TOKEN_HERE` with the token from Step 1.

### Alternative: Using the Provided Data
The file `backend/data/ivf-acronyms.json` contains 16 standard IVF acronyms:
- ET (Embryo Transfer)
- E2 (Estradiol)
- AFC (Antral Follicle Count)
- AMH (Anti-Müllerian Hormone)
- FSH (Follicle Stimulating Hormone)
- LH (Luteinizing Hormone)
- hCG (Human Chorionic Gonadotropin)
- ICSI (Intracytoplasmic Sperm Injection)
- IVF (In Vitro Fertilization)
- FET (Frozen Embryo Transfer)
- MII (Metaphase II)
- GV (Germinal Vesicle)
- 2PN (Two Pronuclei)
- 3PN (Three Pronuclei)
- PGT-A (Preimplantation Genetic Testing)
- PCOS (Polycystic Ovary Syndrome)

## Request Body Format
```json
{
  "acronyms": [
    {
      "acronym": "ET",
      "expansion": "Embryo Transfer",
      "unit": null,
      "normalRangeMin": null,
      "normalRangeMax": null,
      "category": "procedure"
    }
  ]
}
```

### Required Fields
- `acronym`: The short code (e.g., "ET")
- `expansion`: Full meaning (e.g., "Embryo Transfer")

### Optional Fields
- `unit`: Measurement unit (e.g., "pg/mL", "count")
- `normalRangeMin`: Lower bound of normal range
- `normalRangeMax`: Upper bound of normal range
- `category`: Classification (hormone, procedure, embryology, measurement, diagnosis, general)

## Response Format

### Success Response
```json
{
  "success": true,
  "imported": 16,
  "skipped": 0,
  "total": 16,
  "message": "Successfully imported 16 acronyms. Skipped 0 duplicates."
}
```

### Error Response (Validation)
```json
{
  "error": "Validation errors",
  "details": [
    "Item 3: Missing required fields (acronym, expansion)"
  ]
}
```

### Error Response (Invalid Input)
```json
{
  "error": "Invalid input. Expected array of acronyms."
}
```

## Features
- ✅ **Duplicate Detection**: Automatically skips acronyms that already exist
- ✅ **Validation**: Checks for required fields before import
- ✅ **Batch Processing**: Import multiple acronyms in one request
- ✅ **Audit Trail**: Returns count of imported vs skipped items
- ✅ **Error Handling**: Clear error messages for troubleshooting

## Testing the Import

After import, verify acronyms are available:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  https://santaan-backend.onrender.com/api/acronyms
```

## Common Use Cases

### 1. Initial Setup (All Standard IVF Acronyms)
Use the provided `ivf-acronyms.json` file to populate all 16 standard acronyms at once.

### 2. Add Custom Clinic Acronyms
Create a custom JSON file with clinic-specific acronyms:
```json
{
  "acronyms": [
    {
      "acronym": "OHSS",
      "expansion": "Ovarian Hyperstimulation Syndrome",
      "category": "diagnosis"
    }
  ]
}
```

### 3. Update Existing Acronyms
The endpoint skips duplicates, so re-importing won't create duplicates. To update, delete the old acronym first or use the regular PATCH endpoint.

## Security Notes
- Requires authentication (admin login)
- All imported acronyms are marked as global (clinicId: null)
- All imported acronyms are active by default (isActive: true)

## Troubleshooting

**Issue**: "No token provided"
- **Solution**: Include the Authorization header with valid token

**Issue**: "Invalid input"
- **Solution**: Ensure JSON body has `acronyms` array at root level

**Issue**: All acronyms skipped (imported: 0)
- **Solution**: Acronyms already exist in database. This is expected behavior.

**Issue**: Validation errors
- **Solution**: Check that each acronym has required fields (acronym, expansion)

## Production Deployment
After deploying this feature to production:
1. Login as admin
2. Run the bulk import command with the provided JSON file
3. Verify acronyms appear in the system
4. Test acronym expansion in clinical logging

## Next Steps
After successful import, the acronym expansion feature will automatically work in:
- Clinical logging notes
- Timeline event descriptions
- Template generation
- Text expansion API (`POST /api/acronyms/expand`)
