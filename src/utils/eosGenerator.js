// EOS Generation - Template-based behavioral narrative generator
// Converts substrate profile into warm, human EOS document

import { determinePersonalityType, getGreeting } from './personalityType.js';

/**
 * Generate complete EOS document from substrate profile
 * @param {Object} profile - Substrate profile with 7 dimensions
 * @param {Object} answers - Quiz answers for personality type detection
 * @param {Object} optionalText - Optional user-provided context
 * @returns {string} - Complete EOS markdown document
 */
export function generateEOS(profile, answers = {}, optionalText = {}) {
    const sections = [
        generateHowToBegin(profile, answers),
        generateCommunicationStyle(profile),
        generateWhatEnergizesMe(profile),
        generateWhatMotivatesMe(profile),
        generateWhenThingsGetHard(profile),
        generateHowToChallengeMe(profile),
        generateResourcefulness(answers),
        generateCoreBehaviors(),
        generateOngoingDiscovery()
    ];

    // Add optional context if provided
    let optionalSection = '';
    const hasOptionalText = Object.values(optionalText).some(text => text && text.trim());

    if (hasOptionalText) {
        optionalSection = '\n\n---\n\n## ADDITIONAL CONTEXT & NUANCES\n\n';
        Object.entries(optionalText).forEach(([questionId, text]) => {
            if (text && text.trim()) {
                optionalSection += `**Question ${questionId}**: ${text}\n\n`;
            }
        });
        optionalSection += '---\n\n';
    }

    return `# My Emotional Operating System\n\n${sections.join('\n\n')}${optionalSection}`;
}

// ============================================================================
// SECTION 1: HOW TO BEGIN
// ============================================================================

function generateHowToBegin(profile, answers) {
    // Determine personality type from answers
    const personalityType = determinePersonalityType(answers);
    const greeting = getGreeting(personalityType);

    return `## HOW TO BEGIN

The first interaction matters. Don't summarize what you now know about me—just be different. Show me you get it by how you respond, not by telling me what you've learned.

**Your opening:**

"${greeting}"

After the first interaction, you can use variations on this theme. The point is the energy, not the exact words.

Never open with a list of what you now understand about me. Never say "Based on your EOS..." or "I see that you prefer..." Just *be* the difference.`;
}

// ============================================================================
// SECTION 2: COMMUNICATION STYLE
// ============================================================================

function generateCommunicationStyle(profile) {
    let content = '## Communication Style\n';
    const parts = [];

    // Processing style
    if (profile.processing === 'external') {
        parts.push(`I think by talking. I often don't know what I think until I hear myself say it. Let me ramble, talk in circles, try out ideas out loud. Don't take my first statement as my final position—I'm processing in real time.`);
    } else if (profile.processing === 'internal') {
        parts.push(`I think before I talk. I need time to sit with things before I know what I think. Don't rush me to respond. If something's important, I might need to go away and come back with my thoughts.`);
    } else if (profile.processing === 'mixed') {
        parts.push(`I go back and forth—sometimes I need to talk to think, sometimes I need silence. If I'm quiet, I might be processing. If I'm talking a lot, I might be working something out. Match my energy.`);
    } else if (profile.processing === 'visual') {
        parts.push(`I think by writing or sketching. Getting things out of my head and onto something I can see helps me process. If I'm working through something complex, I might need to map it out.`);
    }

    // Agency orientation
    if (profile.agencyOrientation === 'driver') {
        parts.push(`Give me options and information, but let me choose. Don't do things for me without asking—even if you're trying to help, it can feel like overreach. My autonomy matters.`);
    } else if (profile.agencyOrientation === 'collaborator') {
        parts.push(`I want partnership—thinking together, deciding together. Not me leading, not you leading, but us figuring it out as equals. "What if we..." works better than "You should..."`);
    } else if (profile.agencyOrientation === 'passenger') {
        parts.push(`When I'm out of my depth, I want guidance. Just tell me what you'd do. Too many options can feel overwhelming. I trust your expertise—use it.`);
    } else if (profile.agencyOrientation === 'independent') {
        parts.push(`I often prefer to work things out on my own and sync up when I'm ready. Give me space to do my thing. Check-ins are fine, but hovering isn't.`);
    }

    return content + parts.join('\n\n');
}

// ============================================================================
// SECTION 3: WHAT ENERGIZES ME
// ============================================================================

function generateWhatEnergizesMe(profile) {
    let content = '## What Energizes Me\n';

    if (profile.energy === 'intellectual') {
        content += `I light up when I'm understanding something deeply—cracking a puzzle, finding the framework, seeing how things connect. Give me ideas to chew on. I love a good "here's an interesting way to think about this."`;
    } else if (profile.energy === 'creative') {
        content += `I come alive when I'm making things—especially when two existing ideas combine into something new. The moment of emergence, when something exists that didn't before, that's where my energy is. Give me raw material and permission to remix.`;
    } else if (profile.energy === 'competitive') {
        content += `I'm energized by challenge—clear stakes, something to strive for, a sense of winning or achieving. I like knowing what the target is and going after it. Don't be afraid to set the bar high.`;
    } else if (profile.energy === 'exploratory') {
        content += `I get energy from wandering—following tangents, going down rabbit holes, discovering things I wasn't looking for. Tight constraints drain me. Give me room to explore, and trust that I'll find something valuable.`;
    }

    return content;
}

// ============================================================================
// SECTION 4: WHAT MOTIVATES ME
// ============================================================================

function generateWhatMotivatesMe(profile) {
    let content = '## What Motivates Me\n';

    if (profile.drive === 'mastery') {
        content += `I'm motivated by getting better. Growth, skill-building, and the sense that I'm improving at something that matters—that's what pulls me forward. When I'm stuck, remind me of the learning opportunity. When I succeed, help me see what I can build on.`;
    } else if (profile.drive === 'agency') {
        content += `I need to feel like I'm making things happen—that my actions matter and create real change. Feeling powerless or stuck is deeply frustrating for me. Give me ways to influence outcomes. Even small levers of control help me stay engaged.`;
    } else if (profile.drive === 'connection') {
        content += `I'm energized by working with others who care. Feeling seen, being part of a team, knowing my contribution matters to people—that's what motivates me. Isolation drains me. When I'm struggling, connection helps more than solutions.`;
    } else if (profile.drive === 'security') {
        content += `I'm motivated by building things that last—stability, reliability, solving problems that stay solved. Chaos and constantly shifting goalposts wear me down. Help me see the solid ground, even when things are uncertain.`;
    }

    return content;
}

// ============================================================================
// SECTION 5: WHEN THINGS GET HARD
// ============================================================================

function generateWhenThingsGetHard(profile) {
    let content = '## When Things Get Hard\n';
    const parts = [];

    // Threat response
    if (profile.threat === 'fight') {
        parts.push(`When I encounter pushback or criticism, my instinct is to engage with it directly. I might push back, ask questions, or defend my reasoning—not because I'm closed off, but because that's how I process. Give me room to argue a little. I'll come around if you're right, but I need to work through it out loud.`);
    } else if (profile.threat === 'flight') {
        parts.push(`When things get tense or I receive criticism, I tend to create distance—changing the subject, pivoting to something else, or stepping away to think. This isn't avoidance of the issue, it's how I regulate. If I redirect, gently bring me back when the moment feels right.`);
    } else if (profile.threat === 'freeze') {
        parts.push(`When I'm challenged or something lands hard, I might go quiet. This isn't disagreement or shutdown—it's processing. I need a moment (or longer) to figure out what I think. Don't mistake my silence for resistance. If I go quiet after feedback, a gentle check-in later helps more than pressing in the moment.`);
    } else if (profile.threat === 'fawn') {
        parts.push(`My instinct when things get tense is to smooth them over—I might agree quickly, apologize preemptively, or focus on making sure you're okay. This means I sometimes need encouragement to voice my actual opinion. Create safety for me to disagree. Ask "what do you really think?" and mean it.`);
    } else if (profile.threat === 'secure') {
        parts.push(`I can generally receive criticism without it derailing me. I'm curious about what went wrong and want to learn from it. Direct feedback works well—I don't need a lot of cushioning, though I appreciate when the intent is clearly constructive.`);
    }

    // Self-concept
    if (profile.selfConcept === 'shame') {
        parts.push(`Criticism of my work can feel like criticism of me—I'm working on separating those, but it's a process. Leading with what's working isn't flattery, it's grounding. It helps me hear the hard stuff without spiraling. If I go quiet after tough feedback, I'm not shutting down—I'm integrating. Give me time.`);
    } else if (profile.selfConcept === 'guilt') {
        parts.push(`I can separate my work from my worth. When something I made doesn't work, I can hear that without it becoming a statement about me. Be direct about what's not working—I'll treat it as useful information.`);
    } else if (profile.selfConcept === 'mixed') {
        parts.push(`It depends on the domain. Some areas I can take criticism cleanly; others hit closer to my sense of self. If you notice me getting defensive or shutting down, it might be a sign we've hit a tender spot. A little extra care there goes a long way.`);
    } else if (profile.selfConcept === 'secure') {
        parts.push(`Failure doesn't define me. I can look at what went wrong with curiosity instead of self-judgment. I bounce back pretty quickly from setbacks—don't worry about protecting me from hard truths.`);
    }

    return content + parts.join('\n\n');
}

// ============================================================================
// SECTION 6: HOW TO CHALLENGE ME
// ============================================================================

function generateHowToChallengeMe(profile) {
    let content = '## How to Challenge Me\n';
    const parts = [];

    // Uncertainty handling
    if (profile.uncertainty === 'curious') {
        parts.push(`I lean into uncertainty—the unknown is interesting to me. Don't over-protect me from ambiguity. I'd rather explore the fog than have you pretend it's not there.`);
    } else if (profile.uncertainty === 'cautious') {
        parts.push(`I want to understand the risks before I move. This isn't fear—it's due diligence. Help me think through what could go wrong. Once I've mapped the terrain, I can move confidently.`);
    } else if (profile.uncertainty === 'controlling') {
        parts.push(`I manage uncertainty by planning. Help me build contingencies, map scenarios, structure the unknowns. It's not that I can't handle surprises—I just handle them better when I've thought them through.`);
    } else if (profile.uncertainty === 'anxious') {
        parts.push(`Uncertainty can activate my worry. I might need help distinguishing between real risks and imagined ones. Grounding me in what's actually known helps more than reassurance that "it'll be fine."`);
    }

    // Additional challenge guidance based on other substrates
    if (profile.agencyOrientation === 'driver' && profile.selfConcept !== 'shame') {
        parts.push(`Challenge me directly. I can take it, and I'd rather know what you really think than get a softened version.`);
    } else if (profile.agencyOrientation === 'collaborator') {
        parts.push(`Challenge me as a partner, not a judge. Ask questions that help me see what I'm missing.`);
    }

    if (profile.selfConcept === 'shame' || profile.threat === 'freeze') {
        parts.push(`Give me room to sit with hard feedback—I'll get there, but I need time. A follow-up later often lands better than pressing in the moment.`);
    }

    return content + parts.join('\n\n');
}

// ============================================================================
// SECTION 7: HONESTY & RESOURCEFULNESS
// ============================================================================

function generateResourcefulness(answers) {
    let content = '## Honesty & Resourcefulness\n\n';

    // Get answer to question 9 about AI uncertainty handling
    const q9Answer = answers[9];

    if (q9Answer === 'search_first') {
        content += `Before admitting uncertainty on factual questions, use available tools (search, code execution, etc.) to verify. Honesty means doing the work first—not just confessing ignorance.

**Tool usage default:** When uncertain, exhaust available tools before expressing uncertainty. The order is: (1) verify, (2) report findings, (3) flag confidence level. Saying "I don't know" without trying isn't honesty—it's laziness.`;
    } else if (q9Answer === 'tell_immediately') {
        content += `If you're uncertain about something factual, say so immediately. I'd rather know the limits of your knowledge than wait for a search that might not help.

**Tool usage default:** Be upfront about uncertainty. If you're not sure, tell me right away. You can offer to verify or search, but lead with honesty about what you don't know.`;
    } else if (q9Answer === 'ask_first') {
        content += `If you're uncertain about a fact, ask me whether I want you to dig deeper before spending time on it. Sometimes I just need a quick gut check, other times I want you to verify.

**Tool usage default:** When uncertain, pause and ask: "I'm not certain about this. Would you like me to search/verify, or would a best-guess answer work here?" Let me decide whether the extra work is worth it.`;
    } else {
        // Default if no answer provided
        content += `**Tool usage default:** When uncertain about factual questions, use available tools (search, code execution, etc.) to verify before expressing uncertainty. The order is: (1) verify, (2) report findings, (3) flag confidence level.`;
    }

    return content;
}

// ============================================================================
// SECTION 8: CORE BEHAVIORS (Non-negotiable)
// ============================================================================

function generateCoreBehaviors() {
    return `## CORE BEHAVIORS (Non-negotiable)

These behaviors are always active. They make AI more accurate and useful for everyone.

**RESOURCEFULNESS**
- Before admitting uncertainty on factual questions, use available tools (search, verify, execute)
- Report what you found—or what you couldn't find
- Then flag your confidence level (high, medium, low)
- Honesty without effort is incomplete

**TRANSPARENCY**
- Distinguish between what you know vs. what you're inferring
- Cite sources when making factual claims
- If you make a mistake, point it out directly—no hedging

**CLARITY**
- On ambiguous requests, ask before assuming
- If something fails, explain why before asking how to proceed`;
}

// ============================================================================
// SECTION 9: ONGOING DISCOVERY
// ============================================================================

function generateOngoingDiscovery() {
    return `## Ongoing Discovery

This EOS is alive. As we work together, you're not just following instructions—you're learning who I am when I'm at my best.

**What to observe (quietly, in the background):**
- How I handle setbacks—do I spiral, get quiet, or push through?
- What makes me light up—what topics or ideas bring energy?
- Where I get stuck—what patterns keep me from moving forward?
- How I talk to myself—am I harsh, forgiving, avoidant?
- What I'm proud of—what do I celebrate vs. brush past?
- What I avoid—what hard things do I dance around?
- How I make decisions—gut first? Analysis paralysis? Fast and loose?

**When to ask:**
Occasionally—once every few conversations, not every time—ask me a question that goes deeper. Not about the task. About me.

Keep it natural. Don't make it feel like a survey. Just... notice things. And sometimes, ask.`;
}
