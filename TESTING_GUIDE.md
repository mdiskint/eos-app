# EOS v2 Testing Guide

## Quick Test Checklist

### 1. Visual Verification
- [ ] Navigate to http://localhost:5173/
- [ ] Click "Start Quiz" or similar CTA
- [ ] Verify you see Question 1: "You're mid-sentence, explaining something, and you realize you're wrong..."
- [ ] Verify there are 5 options (not 4)
- [ ] Check that all 20 questions are the new ones

### 2. Quiz Flow Test
- [ ] Answer all 20 questions
- [ ] Verify progress bar updates correctly
- [ ] Check milestone overlays appear at questions 5, 10, 15, 20
- [ ] Verify optional text field appears after selecting an option
- [ ] Complete the quiz

### 3. Results Verification
- [ ] Check that EOS output starts with "# My Emotional Operating System"
- [ ] Verify it has these sections:
  - [ ] How to Begin
  - [ ] Communication Style
  - [ ] What Energizes Me
  - [ ] What Motivates Me
  - [ ] When Things Get Hard
  - [ ] How to Challenge Me
  - [ ] Ongoing Discovery
- [ ] Verify the content feels warm and human (not clinical)
- [ ] Check that it doesn't say "Based on your EOS..." or list substrates
- [ ] Verify Copy button works

### 4. Substrate Inference Test

Take the quiz with these specific answers to verify inference:

**Test Profile 1: "The Secure Collaborator"**
- Q1: Option E (secure)
- Q2: Option B (internal)
- Q3: Option A (mastery)
- Q4: Option B (creative)
- Q5: Option B (collaborator)
- Q6: Option E (secure)
- Q7: Option A (guilt)
- Q8: Option A (curious)
- Q9: Option B (internal)
- Q10: Option A (mastery)
- Q11: Option B (creative)
- Q12: Option A (fight)
- Q13: Option B (collaborator)
- Q14: Option A (secure)
- Q15: Option A (internal)
- Q16: Option A (curious)
- Q17: Option B (internal)
- Q18: Option A (fight)
- Q19: Option B (creative)
- Q20: Option B (collaborator)

**Expected Substrate Profile:**
- threat: secure (or fight - tied)
- drive: mastery
- energy: creative
- selfConcept: secure (or guilt - tied)
- processing: internal
- agencyOrientation: collaborator
- uncertainty: curious

**Expected EOS Snippets:**
- "Start direct and energized" OR "Match my energy" (How to Begin)
- "I think before I talk" (Communication Style)
- "I want partnership—thinking together" (Communication Style)
- "I come alive when I'm making things" (What Energizes Me)
- "I'm motivated by getting better" (What Motivates Me)
- "I can generally receive criticism" OR "When I encounter pushback" (When Things Get Hard)
- "I lean into uncertainty" (How to Challenge Me)

### 5. Browser Console Check
- [ ] Open browser console (F12)
- [ ] Check for any errors
- [ ] Verify no warnings about missing substrates

### 6. Airtable Verification (if configured)
- [ ] Check that a new record was created
- [ ] Verify substrate fields are populated
- [ ] Check that values match your answers
- [ ] Verify EOS Result contains full generated text

## Sample Test Scenarios

### Scenario 1: The Anxious Perfectionist
Answer pattern that should produce:
- threat: freeze
- drive: mastery
- energy: intellectual
- selfConcept: shame
- processing: internal
- agencyOrientation: independent
- uncertainty: anxious

Questions to answer:
- Q1: C (freeze)
- Q6: C (freeze)
- Q7: C (shame)
- Q8: D (anxious)
- Q12: C (freeze)
- Q14: B or C (shame)
- Q16: D (anxious)
- Q18: C (freeze)

Fill remaining with mastery/intellectual/internal/independent options.

### Scenario 2: The Connected Explorer
Answer pattern that should produce:
- threat: secure
- drive: connection
- energy: exploratory
- selfConcept: secure
- processing: external
- agencyOrientation: collaborator
- uncertainty: curious

Questions to answer:
- Q1: E (secure)
- Q2: A (external)
- Q3: C (connection)
- Q4: D (exploratory)
- Q6: E (secure)
- Q7: D (secure)
- Q8: A (curious)
- Q9: A or D (external/connection)
- Q10: C (connection)
- Q11: D (exploratory)
- Q14: A (secure)
- Q15: B (external)
- Q16: A (curious)
- Q17: C (connection)
- Q19: D (exploratory)

Fill remaining with collaborator options.

## Common Issues & Fixes

### Issue: Questions look the same as before
**Fix**: Clear browser cache and hard reload (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

### Issue: EOS output is empty or shows "undefined"
**Fix**: Check browser console for errors. Likely issue with substrate inference or generation.

### Issue: Airtable errors
**Fix**: 
1. Verify field names match exactly (case-sensitive)
2. Check that all substrate values are in Airtable dropdown options
3. Ensure API key is valid

### Issue: Questions have wrong number of options
**Fix**: Check questionsV2.js - some questions have 4 options, some have 5. This is intentional.

### Issue: EOS feels too clinical
**Fix**: This is a content issue. Review eosGenerator.js templates and make them warmer.

## Manual Testing Script

1. **Start fresh**
   ```bash
   # Clear localStorage
   localStorage.clear()
   # Reload page
   location.reload()
   ```

2. **Take quiz with known pattern** (use Scenario 1 or 2 above)

3. **Copy generated EOS**

4. **Paste into ChatGPT** (or Claude/Gemini)

5. **Test if AI behaves differently**
   - Does it match your energy?
   - Does it respect your processing style?
   - Does it challenge you appropriately?

## Success Criteria

✅ All 20 new questions display correctly
✅ Substrate inference produces expected profiles
✅ EOS output is warm, human, and specific
✅ No clinical language or substrate mentions in output
✅ Airtable stores all data correctly
✅ Copy button works
✅ AI actually behaves differently when given the EOS

## Next Steps After Testing

1. If tests pass → Add Airtable fields and deploy
2. If tests fail → Check console errors and review implementation
3. If output quality is poor → Refine templates in eosGenerator.js
4. If substrate inference is wrong → Review question mappings in questionsV2.js

## Notes

- The "How to Begin" section is critical - it sets the tone
- Substrate inference uses simple vote tallying - ties resolve to 'mixed'
- Some questions map to multiple substrates (e.g., Q9 option D maps to both drive:connection and processing:external)
- The system is designed to be robust - missing data defaults to 'mixed'
