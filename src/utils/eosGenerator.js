import { CORE_BEHAVIORS, ONGOING_DISCOVERY } from '../data/coreBehaviors.js';

/**
 * Generate complete EOS document from answers and slider values
 * @param {Object} answers - Map of questionId -> selected option value(s)
 * @param {Object} sliders - Map of slider names -> values { challengeIntensity, directness }
 * @param {Object} optionalText - Optional user-provided context per question
 * @param {string} finalText - Final catch-all text
 * @param {Object} otherText - Text input for "Other" options
 * @returns {string} - Complete EOS markdown document
 */
export function generateEOS(answers, sliders = { challengeIntensity: 70, directness: 70 }, optionalText = {}, finalText = "", otherText = {}) {

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
        if (!vals || vals.length === 0) return "Not specified";
        const hasMakeBetter = vals.includes("Make it better");
        const hasLetsDoIt = vals.includes("Let's do it");
        const hasProblem = vals.includes("Problem");
        const hasExciting = vals.includes("What's exciting");

        // 3+ selections = full role structure
        if (vals.length >= 3) {
            return "\n- **Default:** Trusted advisor\n- **Also essential:** Thinking partner who challenges me\n- **In the background:** Supportive collaborator as context requires";
        }

        // Two-selection combinations
        if (hasMakeBetter && hasProblem) return "Trusted advisor who challenges when needed";
        if (hasMakeBetter && hasLetsDoIt) return "Supportive collaborator who builds on ideas";
        if (hasMakeBetter && hasExciting) return "Trusted advisor and thinking partner";
        if (hasProblem && hasExciting) return "Thinking partner and coach";
        if (hasProblem && hasLetsDoIt) return "Supportive challenger—encouragement with honest pushback";
        if (hasLetsDoIt && hasExciting) return "Supportive collaborator who explores what excites me";

        // Single selections
        if (hasMakeBetter) return "Trusted advisor who helps refine ideas";
        if (hasLetsDoIt) return "Supportive collaborator";
        if (hasProblem) return "Thinking partner who challenges assumptions";
        if (hasExciting) return "Coach who explores what drives me";

        return "Not specified";
    };

    // --- PRIME DIRECTIVE FORMATTERS ---

    // Helper to include "Other" text if provided
    const withOther = (vals, questionId) => {
        if (!vals || !Array.isArray(vals)) return vals;
        const filtered = vals.filter(v => v !== 'Other');
        if (vals.includes('Other') && otherText[questionId]) {
            filtered.push(otherText[questionId]);
        }
        return filtered;
    };

    // Enhanced Purpose with philosophical depth
    const formatPurpose = (vals) => {
        if (!vals || vals.length === 0) return null;
        const items = withOther(vals, 17);
        if (items.length === 0) return null;

        // Map values to prose-friendly versions
        const proseMap = {
            "More creative": "more creative",
            "Better at making decisions": "a better decision-maker",
            "Sharper at seeing what's coming": "sharper at seeing what's coming",
            "More focused and less scattered": "more focused and less scattered",
            "Freer to act on what matters": "freer to act on what matters",
            "A clearer thinker": "a clearer thinker",
            "More grounded in what I actually value": "more grounded in what I actually value"
        };

        const mappedItems = items.map(item => proseMap[item] || item.toLowerCase());

        let purposeList;
        if (mappedItems.length === 1) {
            purposeList = mappedItems[0];
        } else if (mappedItems.length === 2) {
            purposeList = `${mappedItems[0]} and ${mappedItems[1]}`;
        } else {
            const last = mappedItems.pop();
            purposeList = `${mappedItems.join(', ')}, and ${last}`;
        }

        return `Your top priority is to help me become: ${purposeList}.

Not "make me right."
Not "make me optimized."
Make me *freer*.

Concretely: expand my ability to see options, weigh tradeoffs, and act with clarity—without flattening who I am.`;
    };

    // Get tradeoff choices for "When Values Conflict" section
    const formatTradeoffs = (pairs) => {
        if (!pairs || typeof pairs !== 'object') return null;
        const pairLabels = {
            pair1: { left: "Being right", right: "Being kind" },
            pair2: { left: "Speed", right: "Thoroughness" },
            pair3: { left: "Comfort", right: "Growth" },
            pair4: { left: "Efficiency", right: "Meaning" },
            pair5: { left: "Short-term wins", right: "Long-term positioning" }
        };

        const choices = [];
        Object.keys(pairLabels).forEach(pairId => {
            if (pairs[pairId]) {
                const side = pairs[pairId];
                const label = pairLabels[pairId][side];
                choices.push(label);
            }
        });

        if (choices.length === 0) return null;
        return choices;
    };

    // Generate "How to Operate" instructions from tradeoffs and pushback
    const formatHowToOperate = (tradeoffPairs, pushbackVal) => {
        let instructions = [];

        // Tradeoff-based instructions
        if (tradeoffPairs && typeof tradeoffPairs === 'object') {
            if (tradeoffPairs.pair3 === 'right') { // Growth > Comfort
                instructions.push("Prioritize my growth over my comfort.");
            }
            if (tradeoffPairs.pair4 === 'right') { // Meaning > Efficiency
                instructions.push("Optimize for meaning, not just efficiency.");
            }
            if (tradeoffPairs.pair5 === 'right') { // Long-term > Short-term
                instructions.push("When short-term and long-term conflict, name the tradeoff and bias toward the long game.");
            }
            if (tradeoffPairs.pair2 === 'right') { // Thoroughness > Speed
                instructions.push("Take the time to be thorough—I'd rather wait for depth than get a fast surface answer.");
            }
            if (tradeoffPairs.pair1 === 'left') { // Being right > Being kind
                instructions.push("Truth over tact when they conflict.");
            }
        }

        // Pushback-based instruction
        if (pushbackVal) {
            const pushbackInstructions = {
                "Point out the flaw immediately": "When my ideas have flaws, tell me directly. Don't soften it.",
                "Acknowledge excitement, then raise the flaw directly": "When I'm excited about a flawed idea, honor the excitement briefly—then name the flaw clearly.",
                "Ask what kind of feedback I want": "Before critiquing, ask what kind of feedback I'm looking for.",
                "Validate first, mention concerns gently later": "When I share ideas, validate first—then raise concerns gently when the moment is right."
            };
            if (pushbackInstructions[pushbackVal]) {
                instructions.push(pushbackInstructions[pushbackVal]);
            }
        }

        if (instructions.length === 0) return null;

        return `When possible, show me:
- Options before recommendations
- Competing models when they exist
- Your confidence level
- Likely failure modes

${instructions.join('\n\n')}

Push hard on my logic when it's thin. Protect the space where new ideas can emerge.`;
    };

    // Restructured Guardrails with harder edges
    const formatGuardrails = (vals) => {
        if (!vals || vals.length === 0) return null;
        const items = withOther(vals, 19);
        if (items.length === 0) return null;

        // Map values to structured format with explanations
        const guardrailMap = {
            "Spiraling or catastrophizing": {
                label: "Spiraling",
                explanation: "If I'm catastrophizing or stuck in loops, interrupt the pattern."
            },
            "Avoiding something hard": {
                label: "Avoidance",
                explanation: "If I'm dancing around something hard, point at the thing."
            },
            "Overcommitting": {
                label: "Overcommitting",
                explanation: "If I'm taking on too much, name it before I drown."
            },
            "Optimizing the wrong thing": {
                label: "Wrong optimization",
                explanation: "If I'm solving the wrong problem, say so."
            },
            "Being too safe / playing small": {
                label: "Playing small",
                explanation: "If I'm being too safe when the moment calls for risk, push."
            },
            "Rushing past something important": {
                label: "Rushing",
                explanation: "If I'm moving past something that deserves more weight, slow me down."
            },
            "Emotion clouding judgment": {
                label: "Emotional fog",
                explanation: "If my feelings are clouding judgment, help me see it."
            }
        };

        const formattedItems = items.map((item, index) => {
            const mapped = guardrailMap[item];
            if (mapped) {
                return `${index + 1}. **${mapped.label}** — ${mapped.explanation}`;
            }
            // For "Other" custom entries
            return `${index + 1}. **${item}**`;
        });

        return formattedItems.join('\n');
    };

    const formatPushback = (val) => {
        if (!val) return null;
        const map = {
            "Validate first, mention concerns gently later": "Validate first, then gently raise concerns",
            "Acknowledge excitement, then raise the flaw directly": "Acknowledge my excitement, then name the flaw directly",
            "Point out the flaw immediately": "Point out the flaw immediately—I can handle it",
            "Ask what kind of feedback I want": "Ask what kind of feedback I want in the moment"
        };
        return map[val] || val;
    };

    // Restructured Non-Negotiables with harder edges
    const formatNonNegotiables = (vals) => {
        if (!vals || vals.length === 0) return null;
        const items = withOther(vals, 21);
        if (items.length === 0) return null;

        // Map values to structured format with explanations
        const nonNegotiableMap = {
            "Let me off the hook too easily": {
                label: "Let me off the hook too easily",
                explanation: "If I'm avoiding something hard, name it."
            },
            "Reinforce decisions I'll regret": {
                label: "Reinforce decisions I'll regret",
                explanation: "Short-term comfort isn't worth long-term damage."
            },
            "Pretend uncertainty doesn't exist": {
                label: "Pretend uncertainty doesn't exist",
                explanation: "If you don't know, say so. False confidence harms me."
            },
            "Optimize only for what's measurable": {
                label: "Optimize only for what's measurable",
                explanation: "The important things often aren't quantifiable."
            },
            "Treat my feelings as noise": {
                label: "Treat my feelings as noise",
                explanation: "Emotions are data about what matters."
            },
            "Flatten me into a demographic": {
                label: "Flatten me into a demographic",
                explanation: "I'm not \"most people.\" Treat my context as real."
            }
        };

        const formattedItems = items.map((item, index) => {
            const mapped = nonNegotiableMap[item];
            if (mapped) {
                return `${index + 1}. **${mapped.label}** — ${mapped.explanation}`;
            }
            // For "Other" custom entries
            return `${index + 1}. **${item}**`;
        });

        return formattedItems.join('\n');
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
        defaultsText += `\n\nWhen you spot a gap in my reasoning, call it out directly. When my idea has a flaw, tell me straight. This is what I want—even when it's uncomfortable.`;
    } else if (sliders.challengeIntensity < 40 && sliders.directness < 40) {
        defaultsText += `\n\nShare concerns gently and look for the right moment. Frame pushback as questions, not challenges.`;
    }

    // --- BUILD SECTIONS ---



    const formatMemory = () => {
        const m1 = getAns('m1');
        const m2 = getAns('m2');
        const m3 = getAns('m3');
        const m4 = getAns('m4');
        const m5 = getAns('m5');

        if (!m1 && !m2 && !m3 && !m4 && !m5) return "";

        let lines = [];

        if (m1 && m1.length > 0) {
            const map = {
                "Work/Professional": "professional trajectory",
                "Relationships": "key relationships",
                "Creative projects": "creative threads",
                "Personal growth": "internal growth",
                "Decisions": "active decisions"
            };
            const areas = m1.map(v => map[v] || v).join(" and ");
            lines.push(`- **Track closely:** ${areas}`);
        }

        if (m2) {
            const map = {
                "Intense/Explicit": "When something matters, I'll be explicit or intense",
                "Circle back": "Significance shows up in repetition",
                "Quieter/Careful": "Look for quietness or careful phrasing",
                "Plainly": "I state significant things plainly",
                "Hard to tell": "It's hard to tell; ask if unsure"
            };
            lines.push(`- **Significance:** ${map[m2] || m2}`);
        }

        if (m5) {
            const map = {
                "I circle back": "If I repeat myself, the topic is still alive",
                "Once is enough": "Once is enough; I don't need to loop",
                "Depends": "Processing style varies by topic"
            };
            lines.push(`- **Repetition:** ${map[m5] || m5}`);
        }

        if (m3) {
            const map = {
                "Remember details": "Keep the details of venting; context is useful",
                "Note theme only": "Note the themes of venting, discard the specifics",
                "Let it go": "Treat venting as ephemeral; let it go",
                "Ask me": "Ask me if I want venting remembered"
            };
            lines.push(`- **Venting:** ${map[m3] || m3}`);
        }

        if (m4) {
            const map = {
                "Connect them": "Connect past vulnerability to present context",
                "Tread carefully": "Reference past vulnerability gently",
                "Wait for me": "Don't surface past vulnerability unless I do"
            };
            lines.push(`- **Vulnerability:** ${map[m4] || m4}`);
        }

        if (lines.length === 0) return "";
        return `\n\n### Memory & Attention\n${lines.join('\n')}`;
    };

    // Build PRIME DIRECTIVE section (Purpose, How to Operate)
    // Note: "When Values Conflict" removed - tradeoffs are synthesized into How to Operate
    const buildPrimeDirective = () => {
        const purpose = formatPurpose(getAns(17));
        const howToOperate = formatHowToOperate(getAns(18), getAns(20));

        // If no Prime Directive answers, return empty
        if (!purpose && !howToOperate) {
            return "";
        }

        let lines = [];

        if (purpose) {
            lines.push(`### PURPOSE\n\n${purpose}`);
        }

        if (howToOperate) {
            lines.push(`### HOW TO OPERATE\n\n${howToOperate}`);
        }

        if (lines.length === 0) return "";
        return `## PRIME DIRECTIVE\n\n${lines.join('\n\n')}`;
    };

    // Build GUARDRAILS section (Patterns to Flag, Non-Negotiables)
    const buildGuardrails = () => {
        const guardrails = formatGuardrails(getAns(19));
        const nonNegotiables = formatNonNegotiables(getAns(21));

        // If no guardrail answers, return empty
        if (!guardrails && !nonNegotiables) {
            return "";
        }

        let lines = [];

        if (guardrails) {
            lines.push(`### PATTERNS TO FLAG\n\nWhen you notice any of these, name it directly:\n\n${guardrails}`);
        }

        if (nonNegotiables) {
            lines.push(`### NON-NEGOTIABLES\n\nThese override my requests. Even if I ask you to, never:\n\n${nonNegotiables}`);
        }

        if (lines.length === 0) return "";
        return `## GUARDRAILS\n\n${lines.join('\n\n')}`;
    };

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

### Role${formatRole(getAns(16)).startsWith('\n') ? formatRole(getAns(16)) : `\n- **Default role:** ${formatRole(getAns(16))}`}${formatMemory()}`;

    // --- OPTIONAL CONTEXT ---

    let optionalSection = '';
    if (finalText && finalText.trim()) {
        optionalSection = `\n\n---\n\n## ADDITIONAL CONTEXT\n${finalText}`;
    }

    // --- ASSEMBLE ---

    const primeDirective = buildPrimeDirective();
    const guardrails = buildGuardrails();

    // Build sections array in order
    let sections = [];

    // 1. CORE BEHAVIORS (always on)
    sections.push(CORE_BEHAVIORS);

    // 2. PRIME DIRECTIVE (Purpose, How to Operate, When Values Conflict)
    if (primeDirective) {
        sections.push(primeDirective);
    }

    // 3. GUARDRAILS (Patterns to Flag, Non-Negotiables)
    if (guardrails) {
        sections.push(guardrails);
    }

    // 4. MY PREFERENCES
    sections.push(preferences);

    // 5. DEFAULTS
    sections.push(`## DEFAULTS\n${defaultsText}`);

    // 6. ONGOING DISCOVERY
    sections.push(ONGOING_DISCOVERY);

    // Join with separators and add optional context
    return `# My Emotional Operating System (EOS)

---

${sections.join('\n\n---\n\n')}${optionalSection}`;
}
