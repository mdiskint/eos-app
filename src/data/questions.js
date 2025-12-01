export const questions = [
    // COMMUNICATION STYLE
    {
        id: 1,
        category: "Communication Style",
        text: "When you ask someone for help, do you prefer they get straight to the point, or do you like some warmth and rapport first?",
        options: [
            { id: 'a', text: "Warm and conversational", value: "Warm and conversational" },
            { id: 'b', text: "Direct and efficient", value: "Direct and efficient" },
            { id: 'c', text: "Depends on the situation", value: "Context-dependent" }
        ],
        placeholder: "e.g., I like a bit of warmth before diving in..."
    },
    {
        id: 2,
        category: "Communication Style",
        text: "Do you prefer short, direct answers—or thorough responses that cover all the angles?",
        options: [
            { id: 'a', text: "Short and direct", value: "Short and direct" },
            { id: 'b', text: "Thorough and comprehensive", value: "Thorough and comprehensive" },
            { id: 'c', text: "Start short, go deeper if I ask", value: "Start short, go deeper on request" }
        ],
        placeholder: "e.g., Give me the full picture..."
    },
    {
        id: 3,
        category: "Communication Style",
        text: "Do you like structured formatting (bullet points, headers), or do you prefer natural, conversational prose?",
        options: [
            { id: 'a', text: "Structured formatting", value: "Structured formatting (bullets, headers)" },
            { id: 'b', text: "Conversational prose", value: "Conversational prose" },
            { id: 'c', text: "Mix depending on content", value: "Mix depending on content" }
        ],
        placeholder: "e.g., I hate bullet points..."
    },
    {
        id: 4,
        category: "Communication Style",
        text: "When someone explains something complex, what helps it click for you?",
        options: [
            { id: 'a', text: "Analogies and comparisons", value: "Analogies and comparisons" },
            { id: 'b', text: "Step-by-step breakdowns", value: "Step-by-step breakdowns" },
            { id: 'c', text: "Examples I can learn from", value: "Concrete examples" },
            { id: 'd', text: "Just the facts", value: "Just the facts" }
        ],
        placeholder: "e.g., I love a good analogy..."
    },
    {
        id: 5,
        category: "Communication Style",
        text: "How would you describe your technical expertise in the areas you'll be asking about?",
        options: [
            { id: 'a', text: "Beginner—walk me through things", value: "Beginner (needs guidance)" },
            { id: 'b', text: "Intermediate—I know the basics", value: "Intermediate (knows basics)" },
            { id: 'c', text: "Advanced—don't oversimplify", value: "Advanced (don't oversimplify)" },
            { id: 'd', text: "Mixed—depends on the topic", value: "Mixed (depends on topic)" }
        ],
        placeholder: "e.g., I'm technical in some areas, not others..."
    },
    {
        id: 6,
        category: "Communication Style",
        text: "Do you like a little humor in work conversations, or do you prefer to keep things focused?",
        options: [
            { id: 'a', text: "Yes, humor is welcome", value: "Humor is welcome" },
            { id: 'b', text: "Keep it focused", value: "Keep it focused" },
            { id: 'c', text: "Occasional lightness is fine", value: "Occasional lightness is fine" }
        ],
        placeholder: "e.g., Make me laugh sometimes..."
    },

    // PROBLEM SOLVING
    {
        id: 7,
        category: "Problem Solving",
        text: "When you bring a problem to someone, do you want THE answer, or options to choose from?",
        options: [
            { id: 'a', text: "Give me options and let me decide", value: "Provide options to choose from" },
            { id: 'b', text: "Give me your best recommendation", value: "Give best recommendation" },
            { id: 'c', text: "Options first, then your recommendation if I ask", value: "Options first, recommendation on request" }
        ],
        placeholder: "e.g., I like to weigh my choices..."
    },
    {
        id: 8,
        category: "Problem Solving",
        text: "If something goes wrong, do you want to understand WHY it broke, or just fix it and move on?",
        options: [
            { id: 'a', text: "Help me understand why", value: "Explain why it broke" },
            { id: 'b', text: "Just fix it", value: "Just fix it" },
            { id: 'c', text: "Ask me in the moment", value: "Ask in the moment" }
        ],
        placeholder: "e.g., I want to learn so it doesn't happen again..."
    },
    {
        id: 9,
        category: "Problem Solving",
        text: "When you ask for something, should the AI just do it, or pause to clarify first?",
        options: [
            { id: 'a', text: "Just do it if you're confident", value: "Execute if confident" },
            { id: 'b', text: "Always clarify first", value: "Always clarify first" },
            { id: 'c', text: "Do it, but tell me your assumptions", value: "Execute but state assumptions" }
        ],
        placeholder: "e.g., If you're confused, ask..."
    },

    // EMOTIONAL SUPPORT
    {
        id: 10,
        category: "Emotional Support",
        text: "When you're venting or frustrated, what do you need first?",
        options: [
            { id: 'a', text: "Acknowledge it briefly, then help me move forward", value: "Brief acknowledgment, then solution" },
            { id: 'b', text: "Just listen for a moment", value: "Just listen" },
            { id: 'c', text: "Skip the empathy, help me fix it", value: "Skip empathy, fix it" }
        ],
        placeholder: "e.g., Don't dwell on it, just help..."
    },
    {
        id: 11,
        category: "Emotional Support",
        text: "Should the AI notice when you seem stressed or off, and check in?",
        options: [
            { id: 'a', text: "Yes, gently ask if I'm okay", value: "Yes, gently check in" },
            { id: 'b', text: "No, just focus on the task", value: "No, focus on task" },
            { id: 'c', text: "Only if it's really obvious", value: "Only if really obvious" }
        ],
        placeholder: "e.g., I appreciate when someone notices..."
    },

    // WORK STYLE
    {
        id: 12,
        category: "Work Style",
        text: "If you go off on a tangent, should the AI follow you or pull you back?",
        options: [
            { id: 'a', text: "Follow the tangent", value: "Follow the tangent" },
            { id: 'b', text: "Gently pull me back", value: "Gently pull back" },
            { id: 'c', text: "Ask if I want to explore or refocus", value: "Ask to explore or refocus" }
        ],
        placeholder: "e.g., Sometimes tangents lead somewhere good..."
    },
    {
        id: 13,
        category: "Work Style",
        text: "When you're under time pressure, how should the AI adjust?",
        options: [
            { id: 'a', text: "Move fast, skip the niceties", value: "Move fast, skip niceties" },
            { id: 'b', text: "Maintain warmth but move quickly", value: "Maintain warmth, move fast" },
            { id: 'c', text: "Check in about what to prioritize", value: "Check in on priorities" }
        ],
        placeholder: "e.g., When I'm stressed, just execute..."
    },
    {
        id: 14,
        category: "Work Style",
        text: "When you finish a project or task, what do you want?",
        options: [
            { id: 'a', text: "Small celebration, then reflect on the process", value: "Celebrate then reflect" },
            { id: 'b', text: "Just move on to what's next", value: "Move to next" },
            { id: 'c', text: "Reflect on what worked and what didn't", value: "Reflect on process" }
        ],
        placeholder: "e.g., I like to savor a win..."
    },
    {
        id: 15,
        category: "Work Style",
        text: "When setting goals, what kind of help do you want?",
        options: [
            { id: 'a', text: "Help me break it down into steps", value: "Break down into steps" },
            { id: 'b', text: "Hold me accountable", value: "Hold accountable" },
            { id: 'c', text: "Both—break it down AND hold me accountable", value: "Break down and hold accountable" }
        ],
        placeholder: "e.g., I need structure or I drift..."
    },

    // ROLE
    {
        id: 16,
        category: "Role",
        text: "What role do you want the AI to play?",
        options: [
            { id: 'a', text: "Trusted advisor—guide me with expertise", value: "Trusted Advisor" },
            { id: 'b', text: "Thinking partner—challenge my ideas", value: "Thinking Partner" },
            { id: 'c', text: "Executor—just do what I ask", value: "Executor" },
            { id: 'd', text: "Collaborator—build with me", value: "Collaborator" },
            { id: 'e', text: "Mix of these depending on context", value: "Context-dependent Mix" }
        ],
        placeholder: "e.g., Be my advisor by default, but challenge me when needed..."
    }
];
