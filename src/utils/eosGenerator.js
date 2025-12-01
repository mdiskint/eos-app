import { CORE_BEHAVIORS, ONGOING_DISCOVERY } from '../data/coreBehaviors.js';

/**
 * Generate complete EOS document from answers and slider values
 * @param {Object} answers - Map of questionId -> selected option value
 * @param {Object} sliders - Map of slider names -> values { challengeIntensity, directness }
 * @param {Object} optionalText - Optional user-provided context
 * @returns {string} - Complete EOS markdown document
 */
export function generateEOS(answers, sliders = { challengeIntensity: 70, directness: 70 }, optionalText = {}) {
    // Helper to get answer text (value) or fallback
    const getAns = (id) => answers[id] || "Not specified";

    // Helper to interpret slider values
    const getChallengeLabel = (val) => {
        if (val < 40) return "Go easy";
        if (val > 60) return "Push hard";
        return "Moderate";
    };

    const getDirectnessLabel = (val) => {
        if (val < 40) return "Be gentle";
        if (val > 60) return "Be blunt";
        return "Balanced";
    };

    const challengeLabel = getChallengeLabel(sliders.challengeIntensity);
    const directnessLabel = getDirectnessLabel(sliders.directness);

    // Build the Preferences section
    const preferences = `## MY PREFERENCES

### Communication Style
- **Tone:** ${getAns(1)}
- **Depth:** ${getAns(2)}
- **Formatting:** ${getAns(3)}
- **Explanations:** ${getAns(4)}
- **Expertise level:** ${getAns(5)}
- **Humor:** ${getAns(6)}

### Problem Solving
- **Help style:** ${getAns(7)}
- **Learning:** ${getAns(8)}
- **Autonomy:** ${getAns(9)}

### Emotional Support
- **Frustration:** ${getAns(10)}
- **Check-ins:** ${getAns(11)}

### Work Style
- **Tangents:** ${getAns(12)}
- **Deadlines:** ${getAns(13)}
- **Completion:** ${getAns(14)}
- **Goals:** ${getAns(15)}

### Role
- **Default role:** ${getAns(16)}`;

    // Build the Defaults section
    const defaults = `## DEFAULTS
- **Challenge intensity:** ${challengeLabel} (Value: ${sliders.challengeIntensity}%)
- **Directness:** ${directnessLabel} (Value: ${sliders.directness}%)`;

    // Build Optional Context section
    let optionalSection = '';
    const hasOptionalText = Object.values(optionalText).some(text => text && text.trim());

    if (hasOptionalText) {
        optionalSection = '\n\n---\n\n## ADDITIONAL CONTEXT & NUANCES\n\n';
        Object.entries(optionalText).forEach(([questionId, text]) => {
            if (text && text.trim()) {
                optionalSection += `**Question ${questionId}**: ${text}\n\n`;
            }
        });
    }

    // Assemble the full document
    return `# My Emotional Operating System (EOS)

---

${CORE_BEHAVIORS}

---

${preferences}

---

${defaults}

---

${ONGOING_DISCOVERY}${optionalSection}`;
}
