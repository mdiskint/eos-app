# Airtable Schema Setup for EOS v2

## Quick Setup Instructions

### 1. Navigate to Your Airtable Base
Open your EOS Airtable base where quiz responses are stored.

### 2. Add These 7 New Fields

Click the **+** button to add a new field, then configure each as follows:

---

#### Field 1: substrate_threat
- **Field Type**: Single select
- **Field Name**: `substrate_threat`
- **Options**:
  - fight
  - flight
  - freeze
  - fawn
  - secure
  - mixed

**Color Suggestions**: 
- fight: Red
- flight: Yellow
- freeze: Blue
- fawn: Purple
- secure: Green
- mixed: Gray

---

#### Field 2: substrate_drive
- **Field Type**: Single select
- **Field Name**: `substrate_drive`
- **Options**:
  - mastery
  - agency
  - connection
  - security
  - mixed

**Color Suggestions**:
- mastery: Orange
- agency: Red
- connection: Pink
- security: Blue
- mixed: Gray

---

#### Field 3: substrate_energy
- **Field Type**: Single select
- **Field Name**: `substrate_energy`
- **Options**:
  - intellectual
  - creative
  - competitive
  - exploratory
  - mixed

**Color Suggestions**:
- intellectual: Purple
- creative: Yellow
- competitive: Red
- exploratory: Green
- mixed: Gray

---

#### Field 4: substrate_self_concept
- **Field Type**: Single select
- **Field Name**: `substrate_self_concept`
- **Options**:
  - guilt
  - shame
  - mixed
  - secure

**Color Suggestions**:
- guilt: Orange
- shame: Red
- mixed: Gray
- secure: Green

---

#### Field 5: substrate_processing
- **Field Type**: Single select
- **Field Name**: `substrate_processing`
- **Options**:
  - external
  - internal
  - mixed
  - visual
  - reset

**Color Suggestions**:
- external: Blue
- internal: Purple
- mixed: Gray
- visual: Yellow
- reset: Green

---

#### Field 6: substrate_agency_orientation
- **Field Type**: Single select
- **Field Name**: `substrate_agency_orientation`
- **Options**:
  - driver
  - collaborator
  - passenger
  - independent
  - mixed

**Color Suggestions**:
- driver: Red
- collaborator: Blue
- passenger: Yellow
- independent: Green
- mixed: Gray

---

#### Field 7: substrate_uncertainty
- **Field Type**: Single select
- **Field Name**: `substrate_uncertainty`
- **Options**:
  - curious
  - cautious
  - controlling
  - anxious
  - avoidant
  - mixed

**Color Suggestions**:
- curious: Green
- cautious: Yellow
- controlling: Orange
- anxious: Red
- avoidant: Purple
- mixed: Gray

---

## Verification Checklist

After adding all fields:

- [ ] All 7 substrate fields are created
- [ ] Field names match exactly (including underscores)
- [ ] All options are spelled correctly (lowercase)
- [ ] Each field includes the "mixed" option
- [ ] Field type is "Single select" for all

## Existing Fields (Keep These)

Make sure these fields still exist:

- **Email** (Single line text)
- **Status** (Single select: Started, Completed)
- **Started At** (Date)
- **Completed At** (Date)
- **Answers** (Long text)
- **Optional Details** (Long text)
- **EOS Result** (Long text)

## Testing the Integration

1. Take the quiz on your local dev server
2. Complete all 20 questions
3. Check Airtable - you should see:
   - A new record with Status = "Completed"
   - All 7 substrate fields populated
   - EOS Result contains the full generated text

## Troubleshooting

### Error: "Field not found"
- Check that field names match exactly (case-sensitive)
- Verify there are no extra spaces in field names

### Error: "Invalid value"
- Check that all substrate values in the code match Airtable options
- Verify options are lowercase
- Ensure "mixed" option exists for all fields

### Substrate fields are empty
- Check browser console for errors
- Verify substrate inference is working (check Results.jsx)
- Ensure completeQuizSession is receiving the profile parameter

## Analytics Views

Once data starts flowing, create these views for insights:

### View 1: Threat Response Distribution
- Group by: substrate_threat
- Shows how users respond to challenge

### View 2: Drive Patterns
- Group by: substrate_drive
- Shows what motivates users

### View 3: Energy Types
- Group by: substrate_energy
- Shows where users find flow

### View 4: Complete Profiles
- Show all substrate fields
- Filter by Status = "Completed"
- Useful for seeing full emotional profiles

## Data Export

To export substrate data for analysis:

1. Click "..." menu in top right
2. Select "Download CSV"
3. Choose which fields to include
4. Use for analysis in Excel, Google Sheets, or Python

## Privacy Note

Substrate data is sensitive psychological information. Ensure:
- Airtable base has appropriate access controls
- Data is not shared publicly
- Users are informed about data collection
- Compliance with privacy regulations (GDPR, etc.)

## Next Steps

After setup:
1. Test the integration (see TESTING_GUIDE.md)
2. Verify data is flowing correctly
3. Create analytics views
4. Monitor for any errors
5. Deploy to production

## Support

If you encounter issues:
1. Check the browser console for errors
2. Review the implementation guide (EOS_V2_IMPLEMENTATION.md)
3. Verify field names and options match exactly
4. Test with a simple profile first
