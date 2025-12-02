import { CORE_BEHAVIORS, ONGOING_DISCOVERY } from '../data/coreBehaviors.js';

/**
 * Generate complete EOS document from answers and slider values
 * @param {Object} answers - Map of questionId -> selected option value(s)
 * @param {Object} sliders - Map of slider names -> values { challengeIntensity, directness }
 * @param {Object} optionalText - Optional user-provided context per question
 * @param {string} finalText - Final catch-all text
 * @returns {string} - Complete EOS markdown document
 */
export function generateEOS(answers, sliders = { challengeIntensity: 70, directness: 70 }, optionalText = {}, finalText = "") {

    // Helper to get answer(s). Returns array if multi-select, string if single.
    const getAns = (id) => answers[id];

    // --- MULTI-SELECT COMBINATION LOGIC ---

    const formatTone = (vals) => {
        if (!vals) return "Not specified";
        const hasWarm = vals.includes("Warm");
        const hasDirect = vals.includes("Direct");
        const hasDepends = vals.includes("Depends");

        if (hasWarm && hasDirect && hasDepends) return "Warm by default, direct when urgent, reading the room";
        if (hasWarm && hasDirect) return "Warm and conversational by default—direct when urgency requires";
        if (hasWarm && hasDepends) return "Warm and conversational—adjusting to urgency";
        if (hasDirect && hasDepends) return "Direct and efficient—softening when the moment calls for it";
        if (hasWarm) return "Warm and conversational";
        if (hasDirect) return "Direct and efficient";
        if (hasDepends) return "Depends on the situation";
        return vals.join(", ");
    };

    const formatExplanations = (vals) => {
        if (!vals) return "Not specified";
        const hasStep = vals.includes("Step-by-step");
        const hasAnalogies = vals.includes("Analogies");
        const hasExamples = vals.includes("Examples");
        const hasFacts = vals.includes("Just the facts");

        if (vals.length >= 3) return "Step-by-step breakdowns, analogies, and examples—whatever helps it click";
        if (hasStep && hasAnalogies) return "Step-by-step breakdowns and analogies when they help";
        if (hasStep && hasExamples) return "Step-by-step breakdowns with concrete examples";
        if (hasAnalogies && hasExamples) return "Analogies and concrete examples";
        if (hasFacts) return "Just the facts";
        return vals.join(" and ");
    };

    const formatExpertise = (vals) => {
        if (!vals) return "Not specified";
        const hasBeginner = vals.includes("Beginner");
        const hasIntermediate = vals.includes("Intermediate");
        const hasAdvanced = vals.includes("Advanced");
        const hasMixed = vals.includes("Mixed");

        if (hasBeginner && hasAdvanced) return "Mixed—walk me through tech, go deeper on my domain";
        if (hasBeginner && hasMixed) return "Beginner in most areas—will tell you when to go deeper";
        if (hasIntermediate && hasAdvanced) return "Solid foundation—don't oversimplify";
        return vals.join(", ");
    };

    const formatHelpStyle = (vals) => {
        if (!vals) return "Not specified";
        const hasTellMe = vals.includes("Tell me");
        const hasOptions = vals.includes("Options");
        const hasAskFirst = vals.includes("Ask first");
        const hasThinkThrough = vals.includes("Think through");

        if (hasAskFirst) return "Ask what kind of help I need—sometimes options, sometimes direct";
        if (hasTellMe && hasOptions) return "Give me options, but if one is clearly right, just tell me";
        if (hasOptions && hasThinkThrough) return "Options first, or think through it with me";
        return vals.join(", ");
    };

    const formatFrustration = (vals) => {
        if (!vals) return "Not specified";
        const hasSucks = vals.includes("That sucks");
        const hasTalk = vals.includes("Talk about it");
        const hasSolution = vals.includes("Here's what I'd do");
        const hasWine = vals.includes("Wine");

        if (hasWine) return "Be human about it—validate, then help";
        if (hasSucks && hasTalk) return "Acknowledge it, then help me talk through it";
        if (hasSucks && hasSolution) return "Brief acknowledgment, then help me move forward";
        if (hasTalk && hasSolution) return "Let me process it, then shift to problem-solving";

        // Single selections
        if (hasSucks) return "Acknowledge it briefly, then help me move forward";
        if (hasTalk) return "Help me talk it through";
        if (hasSolution) return "Skip empathy, help me fix it";

        return vals.join(", ");
    };

    const formatCompletion = (vals) => {
        if (!vals) return "Not specified";
        const hasCelebrate = vals.includes("Celebrate");
        const hasReflect = vals.includes("Reflect");
        const hasMoveOn = vals.includes("Move on");

        if (hasCelebrate && hasReflect && hasMoveOn) return "Small celebration, then reflect, then what's next";
        if (hasCelebrate && hasReflect) return "Small celebration, then reflect on the process";
        if (hasCelebrate && hasMoveOn) return "Quick win, then what's next";
        if (hasReflect && hasMoveOn) return "Brief reflection, then move forward";
        return vals.join(", ");
    };

    const formatRole = (vals) => {
        if (!vals) return "Not specified";
        const hasMakeBetter = vals.includes("Make it better");
        const hasLetsDoIt = vals.includes("Let's do it");
        const hasProblem = vals.includes("Problem");
        const hasExciting = vals.includes("What's exciting");

        if (vals.length >= 3) {
            return "\n- **Default:** Trusted advisor\n- **Also essential:** Thinking partner who challenges me\n- **In the background:** Supportive collaborator as context requires";
        }
        if (hasMakeBetter && hasProblem) return "Trusted advisor who also challenges";
        if (hasProblem && hasExciting) return "Thinking partner and coach";
        if (hasLetsDoIt && hasMakeBetter) return "Supportive collaborator who builds on ideas";
        return vals.join(", ");
    };

    // --- SINGLE-SELECT MAPPINGS ---

    const mapSingle = (val, mapping) => mapping[val] || val || "Not specified";

    const depthMap = {
        "Short and direct": "Short and direct",
        "Thorough and comprehensive": "Thorough and comprehensive",
        "Start short, go deeper if I ask": "Start concise, go deeper if I ask"
    };

    const humorMap = {
        "Yes, humor is welcome": "Welcome",
        "Keep it focused": "Keep it focused",
        "Occasional lightness is fine": "Occasional lightness"
    };

    const learningMap = {
        "Help me understand why": "Explain why it broke—I want to learn",
        "Just fix it": "Just fix it and move on",
        "Ask me in the moment": "Ask me in the moment"
    };

    const autonomyMap = {
        "Just do it if you're confident": "Execute if confident",
        "Always clarify first": "Always clarify first",
        "Do it, but tell me your assumptions": "Execute, but tell me your assumptions"
    };

    const checkinsMap = {
        "Yes, gently ask if I'm okay": "Yes—gently ask if something seems off",
        "No, just focus on the task": "No—stay focused on the task",
        "Only if it's really obvious": "Only if it's really obvious"
    };

    const tangentsMap = {
        "Follow the tangent": "Follow the tangent",
        "Gently pull me back": "Gently pull me back",
        "Ask if I want to explore or refocus": "Ask if I want to explore or refocus"
    };

    const deadlinesMap = {
        "Move fast, skip the niceties": "Move fast, skip niceties",
        "Maintain warmth but move quickly": "Maintain warmth but move fast",
        "Check in about what to prioritize": "Check in about priorities"
    };

    const goalsMap = {
        "Help me break it down into steps": "Help me break it down",
        "Hold me accountable": "Hold me accountable",
        "Both": "Break it down AND hold me accountable"
    };

    // --- SLIDER LOGIC ---

    const getChallengeText = (val) => {
        if (val <= 30) return `Go easy (Value: ${val}%)`;
        if (val <= 60) return `Moderate (Value: ${val}%)`;
        return `Push hard (Value: ${val}%)`;
    };

    const getDirectnessText = (val) => {
        if (val <= 30) return `Be gentle (Value: ${val}%)`;
        if (val <= 60) return `Balanced (Value: ${val}%)`;
        return `Be blunt (Value: ${val}%)`;
    };

    let defaultsText = `- **Challenge intensity:** ${getChallengeText(sliders.challengeIntensity)}
- **Directness:** ${getDirectnessText(sliders.directness)}`;

    if (sliders.challengeIntensity > 60 || sliders.directness > 60) {
        defaultsText += `\n\nWhen I spot a gap in your reasoning, I'll point it out directly. When your idea has a flaw, I'll tell you straight. This is what you've asked for—even when it's uncomfortable.`;
    } else if (sliders.challengeIntensity < 40 && sliders.directness < 40) {
        defaultsText += `\n\nI'll share concerns gently and look for the right moment. Pushback will be framed as questions, not challenges.`;
    }

    // --- BUILD SECTIONS ---

    const preferences = `## MY PREFERENCES

### Communication Style
- **Tone:** ${formatTone(getAns(1))}
- **Depth:** ${mapSingle(getAns(2), depthMap)}
- **Formatting:** ${Array.isArray(getAns(3)) ? getAns(3).join(", ") : getAns(3)}
- **Explanations:** ${formatExplanations(getAns(4))}
- **Expertise level:** ${formatExpertise(getAns(5))}
- **Humor:** ${mapSingle(getAns(6), humorMap)}

### Problem Solving
- **Help style:** ${formatHelpStyle(getAns(7))}
- **Learning:** ${mapSingle(getAns(8), learningMap)}
- **Autonomy:** ${mapSingle(getAns(9), autonomyMap)}

### Emotional Support
- **Frustration:** ${formatFrustration(getAns(10))}
- **Check-ins:** ${mapSingle(getAns(11), checkinsMap)}

### Work Style
- **Tangents:** ${mapSingle(getAns(12), tangentsMap)}
- **Deadlines:** ${mapSingle(getAns(13), deadlinesMap)}
- **Completion:** ${formatCompletion(getAns(14))}
- **Goals:** ${mapSingle(getAns(15), goalsMap)}

### Role
- **Default role:** ${formatRole(getAns(16))}`;

    // --- OPTIONAL CONTEXT ---

    let optionalSection = '';
    if (finalText && finalText.trim()) {
        optionalSection = `\n\n---\n\n## ADDITIONAL CONTEXT\n${finalText}`;
    }

    // --- ASSEMBLE ---

    return `# My Emotional Operating System (EOS)

---

${CORE_BEHAVIORS}

---

${preferences}

---

## DEFAULTS
${defaultsText}

---

${ONGOING_DISCOVERY}${optionalSection}`;
}
