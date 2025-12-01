# EOS v2 Implementation Guide

## Overview

EOS v2 is a complete rebuild of the Emotional Operating System generator. It uses a two-layer architecture:

1. **The Substrate Layer** (invisible) — Seven fundamental emotional variables inferred from answers
2. **The Quiz Layer** (visible) — 20 vivid, oblique questions that probe the substrates

## Architecture

### Core Components

#### 1. Questions (`src/data/questionsV2.js`)
- 20 personality-test style questions
- Each option maps to one or more substrates
- Questions feel personal and vivid, not clinical

#### 2. Substrate Inference (`src/utils/substrateInference.js`)
- Takes quiz answers and tallies votes for each substrate
- Determines dominant value for each of 7 dimensions
- Handles ties by defaulting to 'mixed'

#### 3. EOS Generation (`src/utils/eosGenerator.js`)
- Template-based system
- Selects appropriate narrative snippets based on substrate profile
- Generates warm, human behavioral narrative
- 7 sections: How to Begin, Communication Style, What Energizes Me, What Motivates Me, When Things Get Hard, How to Challenge Me, Ongoing Discovery

#### 4. Updated Components
- **Quiz.jsx** — Uses new questionsV2
- **Results.jsx** — Infers substrates and generates EOS
- **airtable.js** — Stores substrate data

## The Seven Substrates

```javascript
{
  threat: 'fight' | 'flight' | 'freeze' | 'fawn' | 'secure',
  drive: 'mastery' | 'agency' | 'connection' | 'security',
  energy: 'intellectual' | 'creative' | 'competitive' | 'exploratory',
  selfConcept: 'guilt' | 'shame' | 'mixed' | 'secure',
  processing: 'external' | 'internal' | 'mixed' | 'visual' | 'reset',
  agencyOrientation: 'driver' | 'collaborator' | 'passenger' | 'independent',
  uncertainty: 'curious' | 'cautious' | 'controlling' | 'anxious' | 'avoidant'
}
```

### Substrate Descriptions

**threat** — How you respond to challenge, criticism, or conflict
- **fight**: Direct engagement, argue through it
- **flight**: Strategic withdrawal, create distance
- **freeze**: Processing pause, go quiet
- **fawn**: Harmony-seeking, smooth things over
- **secure**: Grounded, curious response

**drive** — What fundamentally motivates you
- **mastery**: Getting better, skill-building
- **agency**: Making things happen, creating change
- **connection**: Being part of something, feeling seen
- **security**: Building things that last, stability

**energy** — Where your flow states live
- **intellectual**: Understanding deeply, cracking puzzles
- **creative**: Making things, combining ideas
- **competitive**: Achieving goals, clear stakes
- **exploratory**: Wandering, discovering

**selfConcept** — How failure affects your self-view
- **guilt**: "What went wrong?" (action-focused)
- **shame**: "What's wrong with me?" (identity-focused)
- **mixed**: Context-dependent
- **secure**: Failure doesn't define you

**processing** — How you think through things
- **external**: Talk to think, process out loud
- **internal**: Think to talk, need quiet time
- **mixed**: Flexible, depends on context
- **visual**: Write/sketch to understand
- **reset**: Action-based processing

**agencyOrientation** — How you prefer to work with others
- **driver**: Self-directed, want options
- **collaborator**: Partnership-oriented, think together
- **passenger**: Guidance-seeking, tell me what to do
- **independent**: Solo-oriented, sync up when ready

**uncertainty** — How you handle the unknown
- **curious**: Opportunity-focused, exciting
- **cautious**: Risk-aware, due diligence
- **controlling**: Planning-oriented, map it out
- **anxious**: Worry-prone, stomach clenches
- **avoidant**: Delay-oriented, wait until forced

## Question Mapping

| Substrate | Questions |
|-----------|-----------|
| threat | 1, 6, 12, 18 |
| drive | 3, 9, 10, 12, 13, 14, 17 |
| energy | 4, 11, 17, 19 |
| selfConcept | 7, 14 |
| processing | 2, 9, 13, 15, 17 |
| agencyOrientation | 5, 13, 20 |
| uncertainty | 8, 15, 16 |

## Airtable Schema

Add these fields to your Airtable base:

### Substrate Fields (Single Select)

**substrate_threat**
- Options: `fight`, `flight`, `freeze`, `fawn`, `secure`, `mixed`

**substrate_drive**
- Options: `mastery`, `agency`, `connection`, `security`, `mixed`

**substrate_energy**
- Options: `intellectual`, `creative`, `competitive`, `exploratory`, `mixed`

**substrate_self_concept**
- Options: `guilt`, `shame`, `mixed`, `secure`

**substrate_processing**
- Options: `external`, `internal`, `mixed`, `visual`, `reset`

**substrate_agency_orientation**
- Options: `driver`, `collaborator`, `passenger`, `independent`, `mixed`

**substrate_uncertainty**
- Options: `curious`, `cautious`, `controlling`, `anxious`, `avoidant`, `mixed`

### Existing Fields (Keep These)

- **Email** (Single line text)
- **Status** (Single select: Started, Completed)
- **Started At** (Date)
- **Completed At** (Date)
- **Answers** (Long text) — JSON of all answers
- **Optional Details** (Long text) — JSON of optional text
- **EOS Result** (Long text) — Full generated EOS

## How It Works

### 1. User Takes Quiz
- 20 questions, each with 4-5 options
- Each option has substrate mappings
- Optional text field for additional context

### 2. Substrate Inference
```javascript
// Example: User answers question 1 with option 'e'
{
  id: 1,
  selectedValue: "curious_correction",
  substrates: { threat: 'secure' }
}

// This adds 1 vote to threat='secure'
// After all 20 questions, tally votes for each substrate
// Highest vote count wins
```

### 3. EOS Generation
```javascript
// For each section, select templates based on profile
if (profile.threat === 'freeze') {
  // Use freeze-specific template
  "When I'm challenged or something lands hard, I might go quiet..."
}
```

### 4. Output
- Warm, human document
- User pastes into any AI
- AI reads it and shows up differently

## Testing the Implementation

### 1. Run the Dev Server
```bash
npm run dev
```

### 2. Take the Quiz
- Answer all 20 questions
- Add optional context (optional)
- Generate EOS

### 3. Verify Output
- Check that EOS has 7 sections
- Verify narrative matches your answers
- Ensure it feels warm and human, not clinical

### 4. Check Airtable
- Verify substrate fields are populated
- Check that values match expected profile
- Confirm EOS Result is stored

## Example Output

For a user with:
- threat: freeze
- drive: mastery
- energy: creative
- selfConcept: shame
- processing: internal
- agencyOrientation: collaborator
- uncertainty: cautious

The EOS will include:
- "Start slow and spacious..." (How to Begin)
- "I think before I talk..." (Communication Style)
- "I come alive when I'm making things..." (What Energizes Me)
- "I'm motivated by getting better..." (What Motivates Me)
- "When I'm challenged... I might go quiet..." (When Things Get Hard)
- "I want to understand the risks..." (How to Challenge Me)
- Ongoing Discovery section (same for all)

## Deployment Checklist

- [x] Create questionsV2.js with 20 new questions
- [x] Build substrate inference logic
- [x] Build EOS generation from templates
- [x] Update Quiz component to use new questions
- [x] Update Results component with inference + generation
- [x] Update Airtable integration for substrate storage
- [ ] Add substrate fields to Airtable base
- [ ] Test complete flow: quiz → inference → generation → storage
- [ ] Review generated outputs for natural flow
- [ ] Deploy to production

## Next Steps

1. **Add Airtable Fields**: Log into Airtable and add the 7 substrate fields as Single Select fields with the options listed above

2. **Test the Flow**: Take the quiz yourself and verify:
   - Questions display correctly
   - Substrate inference works
   - EOS output is warm and human
   - Airtable stores substrate data

3. **Review Output Quality**: Read several generated EOS documents to ensure they:
   - Feel personal and specific
   - Don't sound clinical or diagnostic
   - Flow naturally between sections
   - Make the user feel seen

4. **Deploy**: Once verified, deploy to production

## Troubleshooting

### Questions not showing
- Check that Quiz.jsx imports `questionsV2`
- Verify questionsV2.js exports correctly

### Substrate inference errors
- Check that all options have `substrates` property
- Verify substrate values match expected types

### EOS generation issues
- Check that all substrate values are handled in templates
- Verify profile object has all 7 substrates

### Airtable errors
- Ensure field names match exactly (case-sensitive)
- Verify all substrate values are in Airtable options
- Check that API key and base ID are correct

## Philosophy

The user takes a quiz that feels personal and delightful. We infer their emotional substrate. We generate a behavioral narrative that helps any AI understand them. They paste it anywhere and the AI just... works better. Shows up differently. Gets them.

That's the wow moment. That's what we built.
